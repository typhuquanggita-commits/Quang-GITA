# KIẾN TRÚC PHÂN QUYỀN KNS365 · **RBAC-GITA**
### Hệ vai trò – quyền hạn – tách bạch trách nhiệm · đồng bộ chuẩn **GITA365**

> **Nguyên tắc gốc (kế thừa GITA365 – Quy trình vận hành 4 tác nhân, v1.0):**
> *"Hệ thống vận hành theo nguyên tắc phân quyền rõ ràng: User thực hiện hành trình; Coach phụ trách chuyên môn; Admin kiểm soát vận hành; Chế độ Phụ huynh chỉ xem dữ liệu tổng quan."*
> KNS365 **mở rộng** mô hình 4 tác nhân đó thành **11 vai** để phục vụ môi trường trường học có trẻ em, đồng thời **giữ nguyên** mọi ràng buộc gốc của GITA365.

---

## PHẦN A. 6 NGUYÊN TẮC BẤT BIẾN

| # | Nguyên tắc | Hệ quả thiết kế |
|:--:|---|---|
| **1** | **Đặc quyền tối thiểu** *(least privilege)* | Mỗi vai chỉ có đúng quyền cần để làm việc của mình. Không có vai nào "được xem tất cho tiện" |
| **2** | **Chức vụ cao ≠ quyền dữ liệu cao** | **Giám đốc điều hành và Super Admin KHÔNG mặc định đọc được hồ sơ cá nhân học sinh.** Cấp cao có quyền **quản trị hệ thống và xem số liệu tổng hợp**, không có quyền xem đời tư của một đứa trẻ |
| **3** | **Tách bạch trách nhiệm** *(separation of duties)* | Người **làm chuyên môn** ≠ người **phê duyệt**. Người **cấp quyền** ≠ người **dùng quyền**. Người **vận hành hệ thống** ≠ người **đọc nội dung** |
| **4** | **Không có kênh riêng tư người lớn – trẻ em** | Mọi liên lạc GV/Coach ↔ HS dưới 16 tuổi phải qua **kênh có người lớn thứ hai hoặc phụ huynh**. Đây là **quy tắc phủ quyết**, cao hơn mọi tiện lợi vận hành |
| **5** | **Mọi thao tác nhạy cảm đều để lại dấu vết** | Ghi **ai – lúc nào – lý do – dữ liệu trước/sau** *(kế thừa nguyên văn quy tắc GITA365 mục 8)* |
| **6** | **Phá niêm phong phải trả giá** | Truy cập khẩn cấp *(break-glass)* luôn được, nhưng **luôn tự động cảnh báo 2 người khác và bị hậu kiểm trong 24h** |

---

## PHẦN B. BẢN ĐỒ 11 VAI

```
                        ┌──────────────────────────────────────────┐
   TẦNG QUẢN TRỊ        │  SADM  Super Admin  ·  ADM-HT  Hệ thống  │  ← quản trị nền
   (không đọc đời tư)    │  ADM-SP Admin sản phẩm · GDĐH Giám đốc   │     & số liệu tổng hợp
                        └────────────────────┬─────────────────────┘
                                             │ cấp quyền / phê duyệt / báo cáo
                        ┌────────────────────┴─────────────────────┐
   TẦNG VẬN HÀNH        │  QLHV  Quản lý học viên  (Admin nghiệp   │  ← điều phối, phê duyệt
                        │        vụ theo chuẩn GITA365)            │     ngoại lệ, phát hành
                        └────────────────────┬─────────────────────┘
                                             │ phân công
       ┌─────────────────────────┬───────────┴───────────┬────────────────────────┐
   ┌───┴────┐              ┌─────┴─────┐           ┌─────┴─────┐            ┌─────┴─────┐
   │  TRN   │ HLV đứng lớp │   COACH   │ 1:1 dài   │    TV     │ tâm lý &   │    CVN    │ cố vấn
   │  (GV)  │              │           │ hạn       │           │ bảo vệ trẻ │           │ chuyên môn
   └───┬────┘              └─────┬─────┘           └─────┬─────┘            └───────────┘
       │ ACT  trợ giảng          │                       │ ← DUY NHẤT được mở hồ sơ
       │ (quyền hẹp hơn TRN)     │                       │   bảo vệ trẻ em
       └─────────────┬───────────┴───────────────────────┘
                     │ dạy · huấn luyện · đánh giá
              ┌──────┴──────┐        ┌───────────────────────────────┐
              │     HS      │◀──────▶│  PH  Chế độ Phụ huynh         │
              │ 5 tầng NL   │        │  (CHỈ ĐỌC, trên tài khoản HS) │
              └─────────────┘        └───────────────────────────────┘
```

| Mã | Vai | Đối chiếu GITA365 | Trách nhiệm chính | **Tuyệt đối không** |
|---|---|---|---|---|
| **HS** | Học sinh | *User* | Học, luyện, nộp minh chứng, tự đánh giá | Không sửa bài đã nộp, không sửa KPI/lộ trình |
| **PH** | Phụ huynh *(chế độ chỉ đọc)* | *Chế độ Phụ huynh* | Xem tiến độ, KPI, báo cáo **đã phát hành**; ký `PSM` | Không thao tác thay HS; không xem ghi chú nội bộ, không xem dữ liệu HS khác |
| **TRN** | Huấn luyện viên / Giáo viên đứng lớp | *(mở rộng)* | Dạy 2 buổi × 180′, chấm rubric, quan sát, viết phản hồi | Không tự phát hành báo cáo; không mở hồ sơ bảo vệ trẻ em; không nhắn riêng HS |
| **ACT** | Trợ giảng *(Action Team)* | *(mở rộng)* | Hỗ trợ trạm, bấm giờ, quan sát, nhập liệu thô | Không chấm rubric chính thức; không sửa dữ liệu đã khoá; không tiếp xúc riêng HS |
| **COACH** | Coach phát triển 1:1 | *Coach* | Đọc Assessment, lập lộ trình, đánh giá minh chứng, báo cáo 90 ngày | Không xử lý thanh toán, **không tự kích hoạt lộ trình**, không phát hành chứng nhận, không sửa điểm Assessment |
| **TV** | Tư vấn – Tâm lý học đường & Bảo vệ trẻ em | *(mở rộng — bắt buộc với KNS365)* | **Vai duy nhất** mở/ghi hồ sơ bảo vệ trẻ em; tư vấn tâm lý; quyết định chuyển tuyến | Không dạy lớp mà mình đang thụ lý ca; không chia sẻ nội dung ca cho bất kỳ vai nào ngoài quy trình |
| **CVN** | Cố vấn chuyên môn *(ngoài trường)* | *(mở rộng)* | Cố vấn nội dung, hội đồng bảo vệ dự án, thẩm định chuyên môn | **Không truy cập dữ liệu cá nhân HS**; chỉ nhận dữ liệu đã ẩn danh |
| **QLHV** | Quản lý học viên *(Admin nghiệp vụ)* | *Admin* | Phân công Coach/TRN, kích hoạt lộ trình, duyệt ngoại lệ, **phát hành** báo cáo, liên hệ phụ huynh | **Không tư vấn, không sửa Assessment, không chấm minh chứng thay Coach** |
| **ADM-SP** | Admin sản phẩm *(nội dung – chương trình)* | *(mở rộng)* | Biên tập & xuất bản 288 chuyên đề, kho phiếu, giáo trình online, phiên bản nội dung | **Không truy cập dữ liệu học sinh** dưới bất kỳ hình thức nào |
| **ADM-HT** | Admin hệ thống *(kỹ thuật – hạ tầng)* | *(mở rộng)* | Hạ tầng, sao lưu, phục hồi, giám sát, bảo mật kỹ thuật | **Không đọc nội dung nghiệp vụ.** Truy cập dữ liệu chỉ qua **break-glass** có phê duyệt |
| **SADM** | Super Admin | *(mở rộng)* | Cấp/thu hồi vai, cấu hình chính sách quyền, quản trị vòng đời tài khoản | **Không tự cấp quyền cho chính mình** *(4 mắt)*; **không đọc hồ sơ bảo vệ trẻ em**; không sửa nhật ký kiểm toán |
| **GDĐH** | Giám đốc điều hành | *(mở rộng)* | Xem **số liệu tổng hợp** toàn hệ, KPI, chất lượng, quyết định chiến lược | **Không xem hồ sơ cá nhân HS**; muốn xem ca cụ thể phải qua quy trình yêu cầu có lý do & phê duyệt của TV |

> ⚠️ **Điểm khác biệt quan trọng nhất so với hệ thống thông thường:**
> Ở đa số phần mềm giáo dục, `Super Admin` và `Giám đốc` xem được mọi thứ. **KNS365 cấm điều đó.**
> Lý do: hồ sơ ở đây chứa lời một đứa trẻ 7 tuổi kể về chuyện xảy ra với em. **Càng ít người đọc được, đứa trẻ càng an toàn.**

---

## PHẦN C. MA TRẬN QUYỀN CHI TIẾT

**Chú giải:** ✅ Toàn quyền · ✍️ Tạo/sửa trong phạm vi được phân công · 👁 Chỉ đọc · 📊 Chỉ đọc **số liệu tổng hợp/ẩn danh** · 🔶 Cần phê duyệt của vai khác · 🔑 Chỉ qua **break-glass** có phê duyệt + cảnh báo · 🔒 Không có quyền

### C1. Hồ sơ & tài khoản

| Hành động | HS | PH | TRN | ACT | COACH | TV | CVN | QLHV | ADM-SP | ADM-HT | SADM | GDĐH |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Xem hồ sơ của chính mình | ✅ | 👁 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Xem hồ sơ HS **được phân công** | 🔒 | 👁 | 👁 | 👁 | 👁 | 👁 | 🔒 | 👁 | 🔒 | 🔑 | 🔒 | 🔒 |
| Xem hồ sơ HS **không được phân công** | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 | 🔶 | 🔒 | 🔶 | 🔒 | 🔑 | 🔒 | 🔒 |
| Tạo tài khoản HS | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 | ✍️ | 🔒 | 🔒 | ✅ | 🔒 |
| **Cấp / thu hồi vai** | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 | 🔶 | 🔒 | 🔒 | ✅ *(4 mắt)* | 🔶 |
| Khoá / mở khoá tài khoản | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 | 🔶 | 🔒 | 🔶 | ✅ | 🔒 |
| Xoá tài khoản & dữ liệu *(theo yêu cầu PH)* | 🔒 | 🔶 | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 | 🔶 | 🔒 | 🔶 | ✅ *(4 mắt)* | 🔒 |

### C2. Học tập – đánh giá

| Hành động | HS | PH | TRN | ACT | COACH | TV | CVN | QLHV | ADM-SP | ADM-HT | SADM | GDĐH |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Làm bài / nộp minh chứng | ✅ | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 |
| **Sửa bài đã nộp** | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 | 🔶 | 🔒 | 🔒 | 🔒 | 🔒 |
| Nhập quan sát lớp *(dữ liệu thô)* | 🔒 | 🔒 | ✍️ | ✍️ | 🔒 | 🔒 | 🔒 | 👁 | 🔒 | 🔒 | 🔒 | 🔒 |
| **Chấm rubric chính thức** | 🔒 | 🔒 | ✅ | 🔒 | ✅ | 🔒 | 🔒 | 👁 | 🔒 | 🔒 | 🔒 | 🔒 |
| Sửa điểm rubric đã chốt | 🔒 | 🔒 | 🔶 | 🔒 | 🔶 | 🔒 | 🔒 | ✅ | 🔒 | 🔒 | 🔒 | 🔒 |
| Tự đánh giá / đánh giá đồng đẳng | ✅ | 🔒 | 👁 | 👁 | 👁 | 🔒 | 🔒 | 👁 | 🔒 | 🔒 | 🔒 | 🔒 |
| Lập lộ trình cá nhân | 🔒 | 🔒 | 🔒 | 🔒 | ✍️ | 🔒 | 🔒 | 🔶 | 🔒 | 🔒 | 🔒 | 🔒 |
| **Kích hoạt lộ trình** | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 | ✅ | 🔒 | 🔒 | 🔒 | 🔒 |
| Gia hạn nhiệm vụ ≤7 ngày, lần đầu | 🔒 | 🔒 | ✅ | 🔒 | ✅ | 🔒 | 🔒 | 👁 | 🔒 | 🔒 | 🔒 | 🔒 |
| Gia hạn lần 2 / >7 ngày / vượt chu kỳ | 🔒 | 🔒 | 🔶 | 🔒 | 🔶 | 🔒 | 🔒 | ✅ | 🔒 | 🔒 | 🔒 | 🔒 |
| Đổi mục tiêu / KPI / cấu trúc chu kỳ | 🔒 | 🔒 | 🔶 | 🔒 | 🔶 | 🔒 | 🔒 | ✅ | 🔒 | 🔒 | 🔒 | 🔒 |
| **Phát hành** báo cáo 90 ngày | 🔒 | 🔒 | 🔒 | 🔒 | 🔶 | 🔒 | 🔒 | ✅ | 🔒 | 🔒 | 🔒 | 🔒 |
| Xem báo cáo **sau khi phát hành** | 👁 | 👁 | 👁 | 🔒 | 👁 | 👁 | 🔒 | 👁 | 🔒 | 🔒 | 🔒 | 📊 |
| Phát hành Hộ chiếu GITA / chứng nhận đai | 🔒 | 🔒 | 🔶 | 🔒 | 🔶 | 🔒 | 🔒 | ✅ | 🔒 | 🔒 | 🔒 | 🔒 |

### C3. Dữ liệu nhạy cảm & bảo vệ trẻ em ← **vùng nghiêm ngặt nhất**

| Hành động | HS | PH | TRN | ACT | COACH | TV | CVN | QLHV | ADM-SP | ADM-HT | SADM | GDĐH |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| **Mở hộp thư kín** *(2 người cùng mở)* | 🔒 | 🔒 | ✅ | 🔒 | 🔒 | ✅ | 🔒 | ✅ | 🔒 | 🔒 | 🔒 | 🔒 |
| **Tạo** báo cáo hé lộ *(ghi nguyên văn)* | 🔒 | 🔒 | ✍️ | ✍️ | ✍️ | ✍️ | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 |
| **Đọc nội dung** hồ sơ bảo vệ trẻ em | 🔒 | 🔶 | 🔒 | 🔒 | 🔒 | ✅ | 🔒 | 🔒 | 🔒 | 🔑 | 🔒 | 🔒 |
| Biết **có tồn tại** một ca *(không thấy nội dung)* | 🔒 | 🔒 | 👁 | 🔒 | 👁 | ✅ | 🔒 | 👁 | 🔒 | 🔒 | 🔒 | 📊 |
| Quyết định **chuyển tuyến** *(111 / công an / y tế)* | 🔒 | 🔒 | 🔶 | 🔒 | 🔶 | ✅ | 🔒 | 🔶 | 🔒 | 🔒 | 🔒 | 🔒 |
| Đóng ca | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 | ✅ *(2 chữ ký)* | 🔒 | 🔶 | 🔒 | 🔒 | 🔒 | 🔒 |
| Ghi chú tâm lý cá nhân | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 | ✅ | 🔒 | 🔒 | 🔒 | 🔑 | 🔒 | 🔒 |
| Xem ảnh/video có mặt HS | 🔒 | 👁 *(con mình)* | ✍️ | 🔒 | 👁 | 👁 | 🔒 | ✍️ | 🔒 | 🔑 | 🔒 | 🔒 |

> 🚨 **Quy tắc đặc biệt của vùng C3:**
> ① Khi hồ sơ liên quan tới **người trong gia đình HS**, hệ thống **tự động ẩn ca khỏi chế độ Phụ huynh** — kể cả PH ruột. Chỉ TV được quyết định thời điểm và cách thông báo.
> ② Khi người bị nghi ngờ **là một nhân sự trong hệ thống**, ca được chuyển thẳng lên **kênh độc lập** *(TV trưởng + đại diện nhà trường)*, **bỏ qua toàn bộ tuyến quản lý thông thường**.
> ③ Mọi lượt đọc trong C3 đều **ghi log và gửi cảnh báo cho TV trưởng ngay lập tức**.

### C4. Nội dung chương trình & hệ thống

| Hành động | TRN | COACH | QLHV | ADM-SP | ADM-HT | SADM | GDĐH |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Xem giáo án / kịch bản / kho phiếu | ✅ | ✅ | ✅ | ✅ | 👁 | 👁 | 👁 |
| **Sửa & xuất bản** nội dung 288 chuyên đề | 🔶 *(đề xuất)* | 🔶 | 🔶 | ✅ | 🔒 | 🔒 | 🔶 |
| Gỡ nội dung khỏi lưu hành | 🔒 | 🔒 | 🔶 | ✅ | 🔒 | 🔶 | ✅ |
| Cấu hình quy tắc phân quyền | 🔒 | 🔒 | 🔒 | 🔒 | 🔶 | ✅ | 🔶 |
| Hạ tầng, sao lưu, phục hồi | 🔒 | 🔒 | 🔒 | 🔒 | ✅ | 🔶 | 🔒 |
| **Xem nhật ký kiểm toán** | 🔒 | 🔒 | 👁 *(phạm vi mình)* | 🔒 | 👁 | 👁 | 👁 |
| **Sửa/xoá nhật ký kiểm toán** | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 |
| Xem KPI toàn hệ *(ẩn danh)* | 📊 *(lớp mình)* | 📊 | 📊 | 🔒 | 🔒 | 📊 | ✅ |
| Xuất dữ liệu hàng loạt | 🔒 | 🔒 | 🔶 | 🔒 | 🔶 | 🔶 | 🔶 |

> ⚠️ **Không vai nào — kể cả Super Admin — được sửa hoặc xoá nhật ký kiểm toán.** Nhật ký ghi **chỉ-thêm** *(append-only)*. Đây là chốt chặn cuối cùng của toàn hệ.

---

## PHẦN D. TÁCH BẠCH TRÁCH NHIỆM · CÁC CẶP KHÔNG ĐƯỢC KIÊM

| Cặp vai | Vì sao cấm kiêm | Ngoại lệ |
|---|---|---|
| **COACH + QLHV** | Người lập lộ trình không được tự kích hoạt lộ trình của chính mình *(nguyên tắc GITA365)* | Không có |
| **TRN + TV cho cùng một HS** | Người dạy không được là người thụ lý ca bảo vệ trẻ em của chính HS đó | Không có |
| **SADM + GDĐH** | Người cấp quyền không được là người duyệt việc cấp quyền cho chính mình | Cơ sở <20 nhân sự: bắt buộc **2 SADM**, mọi thao tác cần **4 mắt** |
| **ADM-HT + ADM-SP** | Người vận hành hạ tầng không được đồng thời quyết định nội dung xuất bản | Có thể kiêm ở giai đoạn thí điểm, nhưng **phải bật cảnh báo 4 mắt** |
| **ADM-HT + bất kỳ vai đọc dữ liệu HS** | Quyền kỹ thuật + quyền nghiệp vụ = quyền tuyệt đối, không ai kiểm soát được | Không có |
| **Người chấm + người phê duyệt điểm** | Chống sửa điểm khép kín | Không có |

**Quy tắc 4 mắt** *(bắt buộc với 6 hành động)*: cấp/thu hồi vai · xoá dữ liệu HS · break-glass · đóng ca bảo vệ trẻ em · phát hành chứng nhận đai · xuất dữ liệu hàng loạt.

---

## PHẦN E. VÒNG ĐỜI TÀI KHOẢN & XÁC THỰC

| Giai đoạn | Quy định |
|---|---|
| **Cấp tài khoản** | Chỉ QLHV đề nghị → SADM cấp. Mọi tài khoản phải gắn **một người có thật, một số điện thoại, một email**. **Cấm tài khoản dùng chung giữa nhiều nhân sự** |
| **HS dưới 16 tuổi** | Tài khoản **bắt buộc liên kết phụ huynh**; PH dùng **chế độ Phụ huynh trên cùng tài khoản** *(chuẩn GITA365)*; không thu thập dữ liệu ngoài phạm vi học tập |
| **Xác thực** | Nhân sự: mật khẩu mạnh + **xác thực 2 lớp bắt buộc** với TV, QLHV, ADM-HT, ADM-SP, SADM, GDĐH. HS tiểu học: mã lớp + mã cá nhân, không yêu cầu email |
| **Phiên làm việc** | Nhân sự tự động đăng xuất sau **30 phút** không thao tác; vai C3 *(TV)* sau **10 phút**. Thiết bị dùng chung ở lớp: đăng xuất khi hết buổi |
| **Nghỉ việc / chuyển vai** | Thu hồi quyền **trong 24 giờ**; bàn giao hồ sơ đang thụ lý **có biên bản**; ca C3 do TV trưởng phân công lại |
| **Rà soát định kỳ** | **Mỗi 90 ngày** SADM + GDĐH rà toàn bộ danh sách vai; tài khoản không dùng 90 ngày → tự khoá |
| **Tài khoản CVN ngoài trường** | Có **hạn dùng cố định** theo hợp đồng; hết hạn tự vô hiệu; chỉ nhận dữ liệu đã ẩn danh |

---

## PHẦN F. QUY TRÌNH PHÊ DUYỆT & LEO THANG

```
  Yêu cầu vượt quyền
        │
        ▼
  ┌─────────────────┐   trong quyền?   ┌──────────────────────────┐
  │  Người thực thi │ ────── có ─────▶ │ Tự làm + ghi log + lý do │
  │  (TRN/COACH)    │                  └──────────────────────────┘
  └────────┬────────┘
           │ không
           ▼
  ┌─────────────────┐   ┌────────────────────────────────────────┐
  │  QLHV duyệt     │──▶│ Ngoại lệ vận hành: gia hạn, đổi KPI,   │
  │  (Admin nghiệp  │   │ đổi Coach, Recovery Sprint, sửa điểm    │
  │   vụ)           │   └────────────────────────────────────────┘
  └────────┬────────┘
           │ liên quan an toàn / đời tư trẻ em?
           ▼
  ┌─────────────────┐   ┌────────────────────────────────────────┐
  │  TV quyết định  │──▶│ Ca C3 · chuyển tuyến · 111 · công an   │
  │  (không ai      │   │ ⚠️ KHÔNG đi qua SADM/GDĐH               │
  │   được lật)     │   └────────────────────────────────────────┘
  └────────┬────────┘
           │ liên quan quyền hệ thống / chính sách?
           ▼
  ┌─────────────────┐   ┌────────────────────────────────────────┐
  │  SADM + GDĐH    │──▶│ Cấp vai · đổi chính sách quyền · xoá   │
  │  (4 mắt)        │   │ dữ liệu · xuất dữ liệu hàng loạt       │
  └─────────────────┘   └────────────────────────────────────────┘
```

**SLA phê duyệt:** ngoại lệ vận hành **≤24h** · yêu cầu C3 **≤2h trong giờ hành chính, ≤12h ngoài giờ** · break-glass **hậu kiểm trong 24h**.

---

## PHẦN G. BREAK-GLASS *(truy cập khẩn cấp)*

| Bước | Quy định |
|:--:|---|
| **1. Điều kiện** | Chỉ khi: có nguy cơ tức thời cho an toàn HS · sự cố hệ thống làm mất dữ liệu · yêu cầu hợp pháp của cơ quan chức năng **có văn bản** |
| **2. Người kích hoạt** | ADM-HT hoặc SADM, **bắt buộc nhập lý do bằng văn bản** trước khi vào |
| **3. Cảnh báo tức thì** | Hệ thống gửi thông báo ngay cho **GDĐH + TV trưởng** *(và cho SADM còn lại)* |
| **4. Giới hạn** | Phiên break-glass **tối đa 60 phút**, chỉ mở đúng phạm vi đã khai, tự hết hạn |
| **5. Hậu kiểm** | Trong **24 giờ**: GDĐH + TV trưởng đọc log, kết luận **hợp lệ / không hợp lệ**, ghi biên bản |
| **6. Hậu quả** | Break-glass không hợp lệ = **vi phạm kỷ luật lao động**, thu hồi quyền ngay, xem xét chấm dứt hợp đồng |

---

## PHẦN H. ĐỐI CHIẾU BẮT BUỘC VỚI GITA365

| Quy tắc gốc GITA365 | Trạng thái trong KNS365 |
|---|---|
| Coach chỉ xem User được phân công | ✅ Giữ nguyên · mở rộng cho TRN và ACT |
| Coach không sửa câu trả lời/điểm Assessment | ✅ Giữ nguyên |
| Lộ trình chỉ hiển thị sau khi Admin kích hoạt; bản đã kích hoạt không ghi đè | ✅ Giữ nguyên · QLHV giữ vai Admin |
| Coach tự gia hạn 1 nhiệm vụ / 1 lần / ≤7 ngày / không vượt chu kỳ 90 ngày | ✅ Giữ nguyên nguyên văn |
| Thay đổi mục tiêu, KPI, cấu trúc, Recovery Sprint phải Admin phê duyệt | ✅ Giữ nguyên |
| Báo cáo chỉ hiển thị sau khi Admin phát hành | ✅ Giữ nguyên |
| Một User chỉ có một yêu cầu tư vấn đang hoạt động | ✅ Giữ nguyên |
| Chế độ Phụ huynh dùng chung tài khoản, hoàn toàn chỉ đọc | ✅ Giữ nguyên · **bổ sung**: tự ẩn ca C3 khi liên quan người trong gia đình |
| Mọi thao tác nhạy cảm lưu người – thời gian – lý do – dữ liệu trước/sau | ✅ Giữ nguyên · **nâng cấp** thành nhật ký chỉ-thêm |
| Admin không tư vấn, không đánh giá minh chứng thay Coach | ✅ Giữ nguyên |
| *(GITA365 dùng Zalo cho Coach liên hệ User)* | ⚠️ **SỬA ĐỔI BẮT BUỘC với người học dưới 16 tuổi** — xem `03-CHINH-SACH-BAO-MAT-DU-LIEU.md`, mục *Lỗ hổng L-01* |

---

*Tài liệu thuộc bộ **KNS365 – Hệ GEN VIỆT** · đồng bộ chuẩn **GITA365** · Học viện GITA.*
