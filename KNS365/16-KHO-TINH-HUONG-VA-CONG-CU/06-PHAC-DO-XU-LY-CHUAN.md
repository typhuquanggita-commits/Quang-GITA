# PHÁC ĐỒ XỬ LÝ CHUẨN — 12 TÌNH HUỐNG BẮT BUỘC
### Sơ đồ khối · mốc thời gian · điểm quyết định · người chịu trách nhiệm từng bước · biểu mẫu · điểm dừng an toàn

> **Vì sao cần phác đồ chứ không chỉ cần hướng dẫn.**
> Ở tình huống 🔴, người lớn không thiếu thiện chí — người lớn thiếu **thứ tự**. Trong mười phút đầu, ai cũng biết phải "xử lý", nhưng không ai chắc việc nào trước, việc nào sau, ai gọi cho ai, và lúc nào thì mình phải dừng lại.
> Tài liệu này biến từng tình huống thành **một sơ đồ khối có mốc thời gian** — đọc trong 30 giây là biết bước kế tiếp của mình là gì và **điểm dừng của mình ở đâu**.
>
> 📎 Kho tình huống: [`01-KHO-100-TINH-HUONG-SU-PHAM.md`](01-KHO-100-TINH-HUONG-SU-PHAM.md)
> 📎 Quy trình 5 bước gốc: [`08-CAM-NANG/CAM-NANG-GIAO-VIEN.md`](../08-CAM-NANG/CAM-NANG-GIAO-VIEN.md) mục 7.3
> 📎 Phân quyền & bảo mật: [`11-PHAN-QUYEN-BAO-MAT/`](../11-PHAN-QUYEN-BAO-MAT/)

---

## PHẦN A. CÁCH ĐỌC MỘT PHÁC ĐỒ

### A1. Ký hiệu dùng chung

```
 ┌────────────────┐     Khối HÀNH ĐỘNG — một việc phải làm, có mốc giờ
 │  ① TÊN BƯỚC    │     Tên vai ghi ở mép phải khối = người chịu trách
 │    0 – 15′     │     nhiệm chính của bước đó
 └────────────────┘

 ╔════════════════╗     ĐIỂM QUYẾT ĐỊNH — câu hỏi nhị phân, luôn có hai
 ║  Câu hỏi …?    ║     nhánh CÓ / KHÔNG, không có nhánh "để xem sau"
 ╚════════════════╝

 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓      ĐIỂM DỪNG AN TOÀN — HLV dừng ở đây, việc tiếp
 ▓ DỪNG · CHUYỂN ▓      theo thuộc vai khác. Đi quá điểm này là vượt
 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓      ranh giới nghề nghiệp.

 ⚡ KÍCH HOẠT           Điều kiện làm phác đồ bắt đầu chạy
 ⏱ MỐC                 Hạn tính từ thời điểm kích hoạt
 📄 BM-xx               Biểu mẫu bắt buộc đi kèm
 ☎ 111                 Tổng đài Quốc gia Bảo vệ Trẻ em, miễn phí, 24/7
```

### A2. Ba mức độ và quyền xử lý

| Mức | Nghĩa | Ai xử lý | Hạn |
|:--:|---|---|:--:|
| 🟢 **Xanh** | Trong tầm sư phạm thường ngày | **TRN** / GVCN tại chỗ | Ngay |
| 🟡 **Vàng** | Cần phối hợp và theo dõi | **TRN + QLHV + GVCN**, báo phụ huynh | ≤24h |
| 🔴 **Đỏ** | Chạm an toàn thân thể, sức khoẻ tâm thần, xâm hại, pháp luật | **Chuyển TV ngay** · ☎ **111** | Ngay lập tức |

### A3. Vai trong hệ — dùng đúng mã, không dùng tên gọi tự chế

| Mã | Vai | Vị trí trong phác đồ |
|:--:|---|---|
| **TRN** | Huấn luyện viên đứng lớp | Người phát hiện, người ghi nhận, người chuyển tuyến |
| **ACT** | Trợ giảng | Giữ lớp, giữ hiện trường, bấm giờ, người lớn thứ hai |
| **QLHV** | Quản lý học viên | Điều phối, liên hệ phụ huynh, phát hành báo cáo |
| **COACH** | Coach phát triển 1:1 | Đồng hành dài hạn sau khi ca đã ổn |
| **TV** | Cán bộ tâm lý & bảo vệ trẻ em | **Vai duy nhất** mở hồ sơ bảo vệ trẻ em (D4) |
| **CVN** | Cố vấn chuyên môn ngoài trường | Chỉ nhận dữ liệu ẩn danh; không ở một mình với HS |
| **ADM-SP** | Admin sản phẩm – nội dung | Gỡ, sửa, thu hồi học liệu; không chạm dữ liệu HS |
| **ADM-HT** | Admin hệ thống – kỹ thuật | Khoá tài khoản, chặn chia sẻ, giữ log |
| **SADM** | Super Admin | Thu hồi vai, đánh giá phạm vi sự cố |
| **GDĐH** | Giám đốc điều hành | Chịu trách nhiệm cuối cùng về thông báo ra ngoài |

### A4. Bốn luật bất biến — áp cho cả 12 phác đồ

| # | Luật |
|:--:|---|
| **1** | **HLV không điều tra, không đối chất, không kết luận.** Nghe, ghi nguyên văn, giữ an toàn, chuyển đúng người. |
| **2** | **Không xử lý một mình ở mức 🔴.** Luôn có người lớn thứ hai biết việc đang xảy ra. |
| **3** | **Không hứa giữ bí mật.** Câu chuẩn: *"Cô sẽ không kể cho ai không cần biết. Nhưng nếu chuyện này khiến em không an toàn, cô có trách nhiệm tìm người giúp em."* |
| **4** | **Báo muộn nghiêm trọng hơn báo nhầm.** Nghi ngờ là đủ để báo; không cần chắc chắn. |

> ☎ **Số phải lưu sẵn trong máy trước khi đứng lớp:** Bảo vệ trẻ em **111** · Cấp cứu **115** · Công an **113** · Cứu hoả **114** · **TV** trực · **QLHV** trực.

### A5. Bảng tra nhanh 12 phác đồ

| Mã | Tình huống | Mức | Người chịu trách nhiệm chính | Hạn khởi động | Biểu mẫu |
|:--:|---|:--:|---|:--:|---|
| `PĐ-01` | Trẻ hé lộ chuyện không an toàn | 🔴 | TRN → **TV** | Ngay | `BM-01` |
| `PĐ-02` | Người bị tố giác là nhân sự trong hệ thống | 🔴 | **TV trưởng** *(kênh độc lập)* | Ngay | `BM-01`, `BM-02` |
| `PĐ-03` | Tai nạn / thương tích trong buổi học | 🔴🟡 | TRN → QLHV | Ngay | `BM-03` |
| `PĐ-04` | Khủng hoảng tâm lý cấp tính | 🔴 | TRN → **TV** | Ngay | `BM-04` |
| `PĐ-05` | Bạo lực học đường giữa học sinh | 🔴🟡 | TRN → QLHV → TV | Ngay | `BM-05` |
| `PĐ-06` | Bắt nạt mạng | 🟡🔴 | TRN → QLHV → TV | ≤24h | `BM-06` |
| `PĐ-07` | Khiếu nại của phụ huynh *(LEAD)* | 🟡 | QLHV | ≤24h tiếp nhận | `BM-07` |
| `PĐ-08` | Lộ dữ liệu học sinh | 🔴 | ADM-HT → SADM → GDĐH | 0–15′ | `BM-08` |
| `PĐ-09` | Vắng / bỏ học bất thường | 🟡 | TRN → QLHV | ≤24h | `BM-09` |
| `PĐ-10` | Xung đột phụ huynh – huấn luyện viên | 🟡 | QLHV | ≤24h | `BM-10` |
| `PĐ-11` | Sự cố trong hoạt động thực địa | 🔴 | Trưởng đoàn *(TRN)* | Ngay | `BM-11` |
| `PĐ-12` | Học sinh muốn dừng chương trình | 🟢🟡 | TRN → QLHV | ≤72h | `BM-12` |

---

# PHẦN B. MƯỜI HAI PHÁC ĐỒ

---

## `PĐ-01` · TRẺ HÉ LỘ CHUYỆN KHÔNG AN TOÀN

| Mục | Nội dung |
|---|---|
| **Mức độ** | 🔴 Đỏ |
| **⚡ Điều kiện kích hoạt** | Trẻ kể trực tiếp · trẻ viết trong phiếu hoặc hộp thư kín · trẻ kể qua bạn · HLV quan sát thấy dấu hiệu ở nhóm thể chất / cảm xúc – hành vi / quan hệ |
| **Người chịu trách nhiệm chính** | **TRN** *(15 phút đầu)* → **TV** *(toàn bộ phần còn lại)* |
| **Hạn** | Ghi nhận ngay · báo **trong ngày**, không quá 24 giờ |
| **📄 Biểu mẫu** | `BM-01` Báo cáo hé lộ · `BM-13` Nhật ký chỉ-thêm |
| **▓ Điểm dừng an toàn** | Ngay sau khi bàn giao `BM-01` cho **TV**. HLV **không** liên hệ người bị nghi ngờ, **không** hỏi thêm trẻ, **không** thông báo cho phụ huynh trước khi TV quyết định |

```
┌──────────────────────────────────────────────────────────────────────┐
│  PĐ-01 · TRẺ HÉ LỘ CHUYỆN KHÔNG AN TOÀN                       🔴     │
├──────────────────────────────────────────────────────────────────────┤
│  ⚡ KÍCH HOẠT: trẻ nói ra, viết ra, hoặc bạn quan sát thấy dấu hiệu   │
│                                                                      │
│      ┌────────────────────────────────────────────┐                  │
│      │ ① GHI NHẬN                    ⏱ 0 – 15′    │   TRN            │
│      │   Nghe hết, không cắt lời.                 │                  │
│      │   Ghi NGUYÊN VĂN lời trẻ, có ngày giờ.     │                  │
│      │   KHÔNG suy diễn, KHÔNG thêm nhận định.    │                  │
│      │   Nói câu giới hạn bí mật (luật 3).        │                  │
│      └─────────────────────┬──────────────────────┘                  │
│                            ▼                                         │
│      ╔════════════════════════════════════════════╗                  │
│      ║ QUYẾT ĐỊNH 1                               ║                  │
│      ║ Trẻ có đang ở trong nguy hiểm NGAY LÚC NÀY?║                  │
│      ╚════════════════════════════════════════════╝                  │
│           │ CÓ                              │ KHÔNG                  │
│           ▼                                 ▼                        │
│  ┌────────────────────────┐     ┌────────────────────────┐           │
│  │ ② GIỮ AN TOÀN NGAY     │     │ ② GIỮ AN TOÀN THƯỜNG   │           │
│  │   ⏱ 0 – 30′     TRN+ACT│     │   ⏱ 0 – 30′     TRN    │           │
│  │  Không để trẻ một mình.│     │  Giữ trẻ trong tầm     │           │
│  │  Gọi ☎ 111 · 113 · 115 │     │  quan sát. Không tách  │           │
│  │  theo tình huống.      │     │  trẻ khỏi lớp một cách │           │
│  │  Báo TV + QLHV bằng    │     │  gây chú ý.            │           │
│  │  cuộc gọi, không nhắn. │     │                        │           │
│  └───────────┬────────────┘     └───────────┬────────────┘           │
│              └──────────────┬───────────────┘                        │
│                             ▼                                        │
│      ┌────────────────────────────────────────────┐                  │
│      │ ③ KHÔNG TỰ ĐIỀU TRA           ⏱ liên tục   │   TRN / ACT      │
│      │   Không hỏi dồn. Không đối chất.           │                  │
│      │   Không liên hệ người bị nghi ngờ.         │                  │
│      │   Không hứa giữ bí mật.                    │                  │
│      │   Không kể cho đồng nghiệp không liên quan.│                  │
│      └─────────────────────┬──────────────────────┘                  │
│                            ▼                                         │
│      ┌────────────────────────────────────────────┐                  │
│      │ ④ BÁO CÁO ĐÚNG NGƯỜI          ⏱ ≤ 24 giờ   │   TRN → TV       │
│      │   Điền 📄 BM-01, nộp bản giấy trực tiếp.    │                  │
│      │   Cất tủ khoá / hồ sơ số phân quyền.       │                  │
│      │   CẤM ghi vào sổ soạn bài, sổ điểm,        │                  │
│      │   nhóm chat, ảnh chụp điện thoại.          │                  │
│      └─────────────────────┬──────────────────────┘                  │
│                            ▼                                         │
│      ╔════════════════════════════════════════════╗                  │
│      ║ QUYẾT ĐỊNH 2                               ║                  │
│      ║ Người bị nói tới có phải NHÂN SỰ trong hệ? ║                  │
│      ╚════════════════════════════════════════════╝                  │
│           │ CÓ                              │ KHÔNG                  │
│           ▼                                 ▼                        │
│  ┌────────────────────────┐     ┌────────────────────────┐           │
│  │  ➜ CHUYỂN SANG `PĐ-02` │     │ ⑤ ĐỒNG HÀNH & THEO DÕI │           │
│  │  Kênh độc lập, bỏ qua  │     │   ⏱ 30 ngày            │           │
│  │  tuyến quản lý (L-14)  │     │   TV chủ trì · TRN giữ │           │
│  └────────────────────────┘     │   vai chỗ dựa an toàn  │           │
│                                 └───────────┬────────────┘           │
│                                             ▼                        │
│              ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                    │
│              ▓  ĐIỂM DỪNG AN TOÀN CỦA HLV                ▓           │
│              ▓  Hồ sơ thuộc TV. HLV chỉ tiếp tục là      ▓           │
│              ▓  người lớn tin cậy trong lớp, và tự       ▓           │
│              ▓  chăm sóc bản thân sau ca này.            ▓           │
│              ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                    │
│                                                                      │
│  ☎ 111 · miễn phí · 24/7                                             │
│  HLV KHÔNG ĐIỀU TRA, KHÔNG ĐỐI CHẤT, KHÔNG KẾT LUẬN.                 │
└──────────────────────────────────────────────────────────────────────┘
```

| Bước | ⏱ Mốc | Ai chịu trách nhiệm | Việc phải làm | 📄 Biểu mẫu |
|:--:|:--:|:--:|---|:--:|
| ① Ghi nhận | 0–15′ | **TRN** | Nghe hết, ghi nguyên văn có ngày giờ, nói câu giới hạn bí mật | `BM-01` |
| ② Giữ an toàn | 0–30′ | **TRN + ACT** | Không để trẻ một mình nếu có nguy cơ; gọi 111/113/115 khi cần | — |
| ③ Không tự điều tra | Liên tục | **TRN** | Không hỏi dồn, không đối chất, không liên hệ người bị nghi ngờ | — |
| ④ Báo cáo | ≤24h | **TRN → TV** | Nộp `BM-01` trực tiếp, cất tủ khoá hoặc hồ sơ số phân quyền C3 | `BM-01` |
| ⑤ Đồng hành | ≤30 ngày | **TV** chủ trì, **QLHV** điều phối | Kế hoạch hỗ trợ, liên hệ gia đình theo quyết định của TV | `BM-13` |

**Điểm quyết định**

| # | Câu hỏi | CÓ → | KHÔNG → |
|:--:|---|---|---|
| 1 | Trẻ có đang ở trong nguy hiểm ngay lúc này? | Không để trẻ một mình · gọi **111/113/115** · báo **TV + QLHV** bằng cuộc gọi | Giữ trẻ trong tầm quan sát, sang bước ③ |
| 2 | Người bị nói tới có phải nhân sự trong hệ thống? | Chuyển ngay sang **`PĐ-02`** *(kênh độc lập, lỗ hổng `L-14`)* | TV thụ lý theo quy trình bảo vệ trẻ em của nhà trường |

**Ba câu HLV nói — và ba câu tuyệt đối không nói**

| ✅ Nói | ⛔ Không nói |
|---|---|
| *"Cô tin em. Cảm ơn em đã nói với cô."* | *"Có thật không? Em có chắc không?"* |
| *"Chuyện này không phải lỗi của em."* | *"Sao em không nói sớm hơn?"* |
| *"Cô sẽ không kể cho ai không cần biết. Nhưng nếu chuyện này khiến em không an toàn, cô có trách nhiệm tìm người giúp em."* | *"Cô hứa sẽ không nói với ai cả."* |

---

## `PĐ-02` · NGHI NGỜ NGƯỜI BỊ TỐ GIÁC LÀ NHÂN SỰ TRONG HỆ THỐNG

| Mục | Nội dung |
|---|---|
| **Mức độ** | 🔴 Đỏ · **mức nghiêm trọng nhất của toàn hệ** |
| **⚡ Điều kiện kích hoạt** | Lời trẻ, thư trong hộp thư kín, phản ánh của phụ huynh hoặc đồng nghiệp chỉ tới **một người đang giữ vai trong hệ** *(TRN, ACT, COACH, CVN, QLHV, nhân viên hỗ trợ, tình nguyện viên)* |
| **Người chịu trách nhiệm chính** | **TV trưởng** + **đại diện nhà trường** — **bỏ qua tuyến quản lý thông thường** |
| **Hạn** | Ngay lập tức; tạm dừng tiếp xúc học sinh **trong 24 giờ** |
| **📄 Biểu mẫu** | `BM-01` Báo cáo hé lộ · `BM-02` Sổ mở hộp thư kín · `BM-13` Nhật ký chỉ-thêm |
| **▓ Điểm dừng an toàn** | Người phát hiện dừng ngay sau khi gửi báo cáo qua kênh độc lập. **Không** báo cho quản lý trực tiếp của người bị nghi, **không** báo cho chính người bị nghi, **không** bàn với đồng nghiệp |

> 🔴 **Lỗ hổng `L-14`:** quy trình báo cáo thông thường đi **xuyên qua đúng người đang bị nghi ngờ**. Vì vậy phác đồ này có một kênh riêng và nó là kênh **duy nhất** được dùng.

```
┌──────────────────────────────────────────────────────────────────────┐
│  PĐ-02 · NGƯỜI BỊ TỐ GIÁC LÀ NHÂN SỰ TRONG HỆ                 🔴     │
├──────────────────────────────────────────────────────────────────────┤
│  ⚡ KÍCH HOẠT: lời tố giác / phản ánh chỉ tới một người giữ vai      │
│                                                                      │
│      ┌────────────────────────────────────────────┐                  │
│      │ ① DỪNG TUYẾN THÔNG THƯỜNG     ⏱ 0 – 15′    │  Người phát hiện │
│      │   KHÔNG báo quản lý trực tiếp của người    │                  │
│      │   bị nghi. KHÔNG báo người bị nghi.        │                  │
│      │   KHÔNG bàn với đồng nghiệp.               │                  │
│      └─────────────────────┬──────────────────────┘                  │
│                            ▼                                         │
│      ┌────────────────────────────────────────────┐                  │
│      │ ② GỬI QUA KÊNH ĐỘC LẬP        ⏱ 0 – 60′    │  → TV trưởng     │
│      │   Người nhận: TV trưởng  +  đại diện       │  + nhà trường    │
│      │   nhà trường. Hai người, cùng lúc.         │                  │
│      │   Nội dung: 📄 BM-01 nguyên văn, không     │                  │
│      │   thêm suy đoán.                           │                  │
│      └─────────────────────┬──────────────────────┘                  │
│                            ▼                                         │
│      ╔════════════════════════════════════════════╗                  │
│      ║ QUYẾT ĐỊNH 1                               ║                  │
│      ║ Nguồn tin đến từ HỘP THƯ KÍN?              ║                  │
│      ╚════════════════════════════════════════════╝                  │
│           │ CÓ                              │ KHÔNG                  │
│           ▼                                 ▼                        │
│  ┌────────────────────────┐     ┌────────────────────────┐           │
│  │ Mở hộp phải có ĐỦ HAI  │     │ Ghi nguồn tin, thời    │           │
│  │ NGƯỜI (TRN+QLHV hoặc   │     │ điểm, người tiếp nhận  │           │
│  │ TRN+TV), ghi 📄 BM-02.  │     │ vào 📄 BM-13.           │           │
│  │ Nếu nội dung chỉ tới   │     └───────────┬────────────┘           │
│  │ một nhân sự → chuyển   │                 │                        │
│  │ THẲNG TV trưởng (L-02) │                 │                        │
│  └───────────┬────────────┘                 │                        │
│              └──────────────┬───────────────┘                        │
│                             ▼                                        │
│      ┌────────────────────────────────────────────┐                  │
│      │ ③ TẠM DỪNG TIẾP XÚC HỌC SINH  ⏱ ≤ 24 giờ   │  SADM + GDĐH     │
│      │   Người bị nghi tạm dừng mọi tiếp xúc HS   │                  │
│      │   trong thời gian xác minh.                │                  │
│      │   SADM thu hồi quyền truy cập dữ liệu HS.  │                  │
│      │   ĐÂY LÀ BIỆN PHÁP BẢO VỆ, KHÔNG PHẢI      │                  │
│      │   KẾT LUẬN VỀ NGƯỜI ĐÓ.                    │                  │
│      └─────────────────────┬──────────────────────┘                  │
│                            ▼                                         │
│      ┌────────────────────────────────────────────┐                  │
│      │ ④ BẢO VỆ TRẺ TRƯỚC            ⏱ ≤ 24 giờ   │  TV trưởng       │
│      │   Bảo đảm trẻ không phải gặp lại người bị  │                  │
│      │   nghi. Bố trí người lớn tin cậy khác.     │                  │
│      │   Gọi ☎ 111 để được hướng dẫn chuyên môn.  │                  │
│      │   Báo cơ quan chức năng khi có căn cứ.     │                  │
│      └─────────────────────┬──────────────────────┘                  │
│                            ▼                                         │
│      ┌────────────────────────────────────────────┐                  │
│      │ ⑤ XÁC MINH ĐỘC LẬP            ⏱ theo luật  │  Cơ quan có      │
│      │   Do cơ quan chức năng và hội đồng bảo vệ  │  thẩm quyền      │
│      │   trẻ em của nhà trường thực hiện.         │                  │
│      │   Hệ thống KHÔNG tự điều tra nội bộ thay   │                  │
│      │   cơ quan chức năng.                       │                  │
│      └─────────────────────┬──────────────────────┘                  │
│                            ▼                                         │
│      ┌────────────────────────────────────────────┐                  │
│      │ ⑥ KẾT THÚC & HỌC LẠI          ⏱ ≤ 30 ngày  │  GDĐH            │
│      │   Biên bản: tìm lỗi hệ thống trước, không  │                  │
│      │   quy trách nhiệm cá nhân trước.           │                  │
│      │   Cập nhật sổ đăng ký lỗ hổng.             │                  │
│      │   Không che giấu để giữ hình ảnh.          │                  │
│      └─────────────────────┬──────────────────────┘                  │
│                            ▼                                         │
│              ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                    │
│              ▓  ĐIỂM DỪNG CỦA NGƯỜI PHÁT HIỆN            ▓           │
│              ▓  Ngay sau bước ②. Mọi việc còn lại thuộc  ▓           │
│              ▓  TV trưởng và cơ quan có thẩm quyền.      ▓           │
│              ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                    │
│                                                                      │
│  ☎ 111 · miễn phí · 24/7                                             │
│  HLV KHÔNG ĐIỀU TRA, KHÔNG ĐỐI CHẤT, KHÔNG KẾT LUẬN.                 │
└──────────────────────────────────────────────────────────────────────┘
```

| Bước | ⏱ Mốc | Ai chịu trách nhiệm | Việc phải làm | 📄 Biểu mẫu |
|:--:|:--:|:--:|---|:--:|
| ① Dừng tuyến thông thường | 0–15′ | Người phát hiện *(TRN/ACT/QLHV/PH)* | Không báo quản lý trực tiếp của người bị nghi, không bàn với đồng nghiệp | — |
| ② Kênh độc lập | 0–60′ | Người phát hiện → **TV trưởng + đại diện nhà trường** | Gửi `BM-01` nguyên văn tới hai người nhận cùng lúc | `BM-01` |
| ③ Tạm dừng tiếp xúc | ≤24h | **SADM** *(quyền)* + **GDĐH** *(quyết định)* | Người bị nghi tạm dừng tiếp xúc HS; thu hồi quyền truy cập dữ liệu | `BM-13` |
| ④ Bảo vệ trẻ | ≤24h | **TV trưởng** | Bảo đảm trẻ không gặp lại người bị nghi; gọi **111**; báo cơ quan chức năng khi có căn cứ | `BM-01` |
| ⑤ Xác minh độc lập | Theo luật | Cơ quan có thẩm quyền + hội đồng nhà trường | Hệ thống không tự điều tra thay cơ quan chức năng | — |
| ⑥ Kết thúc & học lại | ≤30 ngày | **GDĐH** | Biên bản, cập nhật sổ lỗ hổng, huấn luyện lại | `BM-13` |

**Điểm quyết định**

| # | Câu hỏi | CÓ → | KHÔNG → |
|:--:|---|---|---|
| 1 | Nguồn tin đến từ hộp thư kín? | Mở hộp phải **đủ hai người**, ghi `BM-02`; nội dung chỉ tới nhân sự thì chuyển thẳng **TV trưởng** *(lỗ hổng `L-02`)* | Ghi nguồn tin và thời điểm tiếp nhận vào `BM-13` |
| 2 | Có căn cứ cho thấy trẻ đang bị nguy hiểm? | Báo cơ quan chức năng **ngay**, không chờ xác minh xong | Vẫn giữ biện pháp tạm dừng tiếp xúc trong thời gian xác minh |

> ⚠️ **Tạm dừng tiếp xúc không phải là kết luận có tội.** Đây là biện pháp bảo vệ cả trẻ lẫn người bị nghi — nó ngăn tình huống xấu đi và ngăn cả việc quy kết oan trong lúc chưa có kết luận.

---

## `PĐ-03` · TAI NẠN / THƯƠNG TÍCH TRONG BUỔI HỌC

| Mục | Nội dung |
|---|---|
| **Mức độ** | 🔴 với chấn thương đầu – cổ – xương – bất tỉnh – chảy máu nhiều · 🟡 với xây xát nhẹ |
| **⚡ Điều kiện kích hoạt** | Học sinh ngã, va chạm, bỏng, hóc, dị ứng, ngất, chảy máu, đau bất thường trong giờ học hoặc giờ chuyển tiếp |
| **Người chịu trách nhiệm chính** | **TRN** *(hiện trường)* → **QLHV** *(liên hệ gia đình, hồ sơ)* |
| **Hạn** | Sơ cứu ngay · báo phụ huynh **trong 60 phút** · biên bản **trong 24 giờ** |
| **📄 Biểu mẫu** | `BM-03` Biên bản tai nạn – thương tích |
| **▓ Điểm dừng an toàn** | HLV dừng ở sơ cứu cơ bản và bàn giao cho y tế. **Không** tự chẩn đoán, **không** cho uống thuốc, **không** nắn – kéo – di chuyển nghi ngờ gãy xương hoặc chấn thương cột sống |

```
┌──────────────────────────────────────────────────────────────────────┐
│  PĐ-03 · TAI NẠN / THƯƠNG TÍCH TRONG BUỔI HỌC              🔴 / 🟡   │
├──────────────────────────────────────────────────────────────────────┤
│  ⚡ KÍCH HOẠT: có học sinh bị thương hoặc có dấu hiệu bất thường      │
│                                                                      │
│      ┌────────────────────────────────────────────┐                  │
│      │ ① CHẶN NGUỒN NGUY HIỂM        ⏱ 0 – 60″    │   TRN + ACT      │
│      │   Dừng toàn bộ hoạt động.                  │                  │
│      │   Đưa các HS khác ra khu vực an toàn.      │                  │
│      │   ACT giữ lớp — TRN tới chỗ HS bị thương.  │                  │
│      └─────────────────────┬──────────────────────┘                  │
│                            ▼                                         │
│      ╔════════════════════════════════════════════╗                  │
│      ║ QUYẾT ĐỊNH 1 · CÓ DẤU HIỆU NGUY HIỂM?      ║                  │
│      ║ bất tỉnh · khó thở · chảy máu nhiều · nghi ║                  │
│      ║ gãy xương · chấn thương đầu/cổ · co giật   ║                  │
│      ╚════════════════════════════════════════════╝                  │
│           │ CÓ                              │ KHÔNG                  │
│           ▼                                 ▼                        │
│  ┌────────────────────────┐     ┌────────────────────────┐           │
│  │ ② GỌI ☎ 115 NGAY       │     │ ② SƠ CỨU CƠ BẢN        │           │
│  │   ⏱ 0 – 3′      TRN    │     │   ⏱ 0 – 10′     TRN    │           │
│  │  KHÔNG di chuyển nạn   │     │  Rửa, sát trùng, băng, │           │
│  │  nhân nghi chấn thương │     │  chườm lạnh.           │           │
│  │  cột sống/đầu/cổ.      │     │  KHÔNG cho uống thuốc. │           │
│  │  Giữ đường thở.        │     │  Theo dõi 30 phút.     │           │
│  │  Cử ACT ra đón xe.     │     │                        │           │
│  └───────────┬────────────┘     └───────────┬────────────┘           │
│              └──────────────┬───────────────┘                        │
│                             ▼                                        │
│      ┌────────────────────────────────────────────┐                  │
│      │ ③ BÁO GIA ĐÌNH & NHÀ TRƯỜNG   ⏱ ≤ 60′      │   QLHV           │
│      │   Gọi điện, KHÔNG nhắn tin.                │                  │
│      │   Nói: chuyện gì · con đang ở đâu · ai ở   │                  │
│      │   cùng con · việc đã làm · việc tiếp theo. │                  │
│      │   Không phỏng đoán mức độ thương tích.     │                  │
│      └─────────────────────┬──────────────────────┘                  │
│                            ▼                                         │
│      ┌────────────────────────────────────────────┐                  │
│      │ ④ GIỮ HIỆN TRƯỜNG & GHI NHẬN  ⏱ ≤ 2 giờ    │   TRN + ACT      │
│      │   Giữ nguyên hiện trạng dụng cụ liên quan. │                  │
│      │   Ghi 📄 BM-03: thời điểm, vị trí, việc     │                  │
│      │   đang làm, người chứng kiến, việc đã xử   │                  │
│      │   lý. Ghi sự việc — không ghi quy kết.     │                  │
│      └─────────────────────┬──────────────────────┘                  │
│                            ▼                                         │
│      ╔════════════════════════════════════════════╗                  │
│      ║ QUYẾT ĐỊNH 2                               ║                  │
│      ║ Thương tích có dấu hiệu KHÔNG do tai nạn?  ║                  │
│      ║ (vết thương lặp lại, lời kể không khớp,    ║                  │
│      ║  trẻ né tránh khi được hỏi)                ║                  │
│      ╚════════════════════════════════════════════╝                  │
│           │ CÓ                              │ KHÔNG                  │
│           ▼                                 ▼                        │
│  ┌────────────────────────┐     ┌────────────────────────┐           │
│  │  ➜ CHUYỂN SANG `PĐ-01` │     │ ⑤ KHẮC PHỤC NGUYÊN NHÂN│           │
│  │  Không hỏi truy trẻ.   │     │   ⏱ ≤ 7 ngày    QLHV   │           │
│  │  Ghi nguyên văn, báo   │     │  Sửa dụng cụ, đổi bố   │           │
│  │  TV. ☎ 111.            │     │  trí, chỉnh tỷ lệ      │           │
│  └────────────────────────┘     │  ACT/HS, tập huấn lại. │           │
│                                 └───────────┬────────────┘           │
│                                             ▼                        │
│              ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                    │
│              ▓  ĐIỂM DỪNG AN TOÀN CỦA HLV                ▓           │
│              ▓  Sơ cứu cơ bản rồi bàn giao y tế. Không   ▓           │
│              ▓  chẩn đoán, không cho thuốc, không hứa    ▓           │
│              ▓  với gia đình về mức độ thương tích.      ▓           │
│              ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                    │
│                                                                      │
│  ☎ 115 cấp cứu · ☎ 114 cứu hoả · ☎ 113 công an · ☎ 111 trẻ em        │
│  HLV KHÔNG ĐIỀU TRA, KHÔNG ĐỐI CHẤT, KHÔNG KẾT LUẬN.                 │
└──────────────────────────────────────────────────────────────────────┘
```

| Bước | ⏱ Mốc | Ai chịu trách nhiệm | Việc phải làm | 📄 Biểu mẫu |
|:--:|:--:|:--:|---|:--:|
| ① Chặn nguồn nguy hiểm | 0–60 giây | **TRN + ACT** | Dừng hoạt động, đưa HS khác ra khu vực an toàn, ACT giữ lớp | — |
| ② Sơ cứu / gọi 115 | 0–3′ hoặc 0–10′ | **TRN** | Theo nhánh quyết định 1; không di chuyển nạn nhân nghi chấn thương cột sống | — |
| ③ Báo gia đình | ≤60′ | **QLHV** | Gọi điện, nêu sự việc và việc đã làm, không phỏng đoán mức độ | — |
| ④ Ghi nhận | ≤2h | **TRN + ACT** | Lập `BM-03`, giữ hiện trạng dụng cụ, ghi tên người chứng kiến | `BM-03` |
| ⑤ Khắc phục nguyên nhân | ≤7 ngày | **QLHV** | Sửa dụng cụ, đổi bố trí, chỉnh tỷ lệ ACT/HS, tập huấn lại | `BM-03` |

**Điểm quyết định**

| # | Câu hỏi | CÓ → | KHÔNG → |
|:--:|---|---|---|
| 1 | Có dấu hiệu nguy hiểm *(bất tỉnh, khó thở, chảy máu nhiều, nghi gãy xương, chấn thương đầu/cổ, co giật)*? | Gọi **115** ngay, giữ nguyên tư thế, cử **ACT** ra đón xe | Sơ cứu cơ bản, theo dõi 30 phút, báo gia đình |
| 2 | Thương tích có dấu hiệu **không do tai nạn**? | Chuyển sang **`PĐ-01`**, không hỏi truy trẻ, báo **TV**, ☎ **111** | Chuyển sang bước ⑤ khắc phục nguyên nhân |

---
