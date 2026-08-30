# NHẬT KÝ KIỂM TOÁN & KIỂM SOÁT NỘI BỘ
### Ghi vết – rà soát – phát hiện bất thường · chốt chặn cuối của hệ phân quyền

> **Nguyên tắc gốc GITA365:** *"Mọi thao tác nhạy cảm phải lưu người thao tác, thời gian, lý do và dữ liệu trước/sau."*
> KNS365 nâng cấp thành nhật ký **chỉ-thêm (append-only)**: ghi được, đọc được, **không ai sửa hay xoá được — kể cả Super Admin**.

---

## PHẦN A. CẤU TRÚC MỘT BẢN GHI NHẬT KÝ

```
 ┌──────────────────────────────────────────────────────────────────────────┐
 │ id            mã bản ghi, tăng dần, không tái sử dụng                    │
 │ thoi_diem     ngày giờ chính xác đến giây (múi giờ VN)                   │
 │ nguoi_thao_tac  mã tài khoản + vai đang dùng tại thời điểm đó            │
 │ hanh_dong     mã hành động (xem/tạo/sửa/xoá/phát hành/cấp quyền/…)       │
 │ doi_tuong     loại + mã bản ghi bị tác động (KHÔNG chứa nội dung D4)     │
 │ muc_du_lieu   D1 · D2 · D3 · D4                                          │
 │ ly_do         bắt buộc với mọi hành động 🔶 🔑 và mọi truy cập D4         │
 │ truoc / sau   giá trị trước và sau khi sửa (băm nếu là dữ liệu nhạy cảm) │
 │ ket_qua       thành công / bị từ chối vì thiếu quyền                     │
 │ nguon         thiết bị · địa chỉ mạng · phiên làm việc                   │
 └──────────────────────────────────────────────────────────────────────────┘
```

> ⚠️ **Nhật ký ghi *việc gì đã xảy ra*, không ghi *nội dung nhạy cảm*.** Log của một ca D4 ghi *"TV-03 đã đọc hồ sơ ca #1187, lý do: chuẩn bị phiên tư vấn"* — **không bao giờ chép lại lời kể của trẻ vào log**.

---

## PHẦN B. DANH MỤC HÀNH ĐỘNG BẮT BUỘC GHI VẾT

| Nhóm | Hành động | Cảnh báo tự động gửi cho ai |
|---|---|---|
| **Quyền** | Cấp / thu hồi / đổi vai · đổi chính sách phân quyền | GDĐH + SADM còn lại |
| **Quyền** | Đăng nhập thất bại ≥5 lần · đăng nhập từ thiết bị lạ | Chủ tài khoản + ADM-HT |
| **D4** | **Mọi lượt đọc, tạo, sửa hồ sơ bảo vệ trẻ em / ghi chú tâm lý** | **TV trưởng — ngay lập tức** |
| **D4** | Mở hộp thư kín *(ghi tên 2 người cùng mở)* | TV trưởng + QLHV |
| **D4** | Đóng ca · chuyển tuyến 111/công an/y tế | TV trưởng + GDĐH |
| **D3** | Xem hồ sơ HS **không thuộc phân công** *(mọi lần, kể cả bị từ chối)* | QLHV |
| **D3** | Sửa điểm/rubric **đã chốt** · sửa bài đã khoá | QLHV + TRN chấm gốc |
| **D3** | Xuất dữ liệu hàng loạt · tải file có định danh | GDĐH + SADM |
| **D3** | Xoá dữ liệu học sinh | GDĐH + SADM *(4 mắt)* |
| **Vận hành** | Kích hoạt lộ trình · phát hành báo cáo · phát hành chứng nhận Cấp Độ | Lưu vết, không cảnh báo |
| **Vận hành** | Gia hạn nhiệm vụ *(lưu **cả hạn cũ và hạn mới** — chuẩn GITA365)* | Lưu vết |
| **Hệ thống** | **Break-glass** *(mở phiên, hết phiên)* | **GDĐH + TV trưởng + SADM — tức thì** |
| **Hệ thống** | Phục hồi sao lưu · thay đổi cấu hình bảo mật · tích hợp bên thứ ba | GDĐH |
| **Nội dung** | Xuất bản / gỡ nội dung chương trình *(kèm số phiên bản)* | ADM-SP + QLHV |

---

## PHẦN C. 12 DẤU HIỆU BẤT THƯỜNG *(hệ thống tự phát hiện)*

| # | Dấu hiệu | Vì sao đáng ngờ | Xử lý |
|:--:|---|---|---|
| 1 | Một người xem **nhiều hồ sơ HS ngoài phân công** trong thời gian ngắn | Dò quét dữ liệu | Khoá tạm + QLHV xác minh trong 24h |
| 2 | Truy cập D4 **ngoài giờ làm việc** mà không có ca đang mở | Không có lý do nghiệp vụ | TV trưởng xác minh ngay |
| 3 | **Break-glass** ≥2 lần trong 30 ngày bởi cùng một người | Lạm dụng cơ chế khẩn cấp | GDĐH rà soát toàn bộ |
| 4 | Sửa điểm đã chốt **sát thời điểm phát hành** báo cáo / công nhận Cấp Độ | Can thiệp kết quả | QLHV + TRN gốc đối chiếu |
| 5 | Một tài khoản đăng nhập từ **nhiều nơi cùng lúc** | Chia sẻ tài khoản hoặc bị chiếm | Huỷ toàn bộ phiên · đổi mật khẩu |
| 6 | **Xuất dữ liệu** lớn bất thường so với thói quen của vai đó | Rò rỉ hàng loạt | Chặn trước, hỏi sau |
| 7 | Nhân sự **đã nghỉ việc** còn thao tác | Thu hồi quyền sót | Khoá ngay + rà soát toàn danh sách |
| 8 | Nhiều `PSM` có **chữ ký người chứng trùng nhau** | Gian lận minh chứng | QLHV kiểm tra, xử lý theo luật đạo đức |
| 9 | Một HS **liên tục dùng quyền pass** trong các chuyên đề an toàn/cảm xúc | Có thể là dấu hiệu cần hỗ trợ | **Không kỷ luật.** TRN báo TV để quan tâm nhẹ nhàng |
| 10 | HS **không nêu được người tin cậy nào ở nhà** | Dấu hiệu nguy cơ | TRN báo GVCN + TV trong 24h |
| 11 | Một nhân sự **nhắn tin riêng** với HS *(phát hiện qua báo cáo hoặc rà soát)* | Vi phạm L-01 — mức nghiêm trọng nhất | **Tạm dừng tiếp xúc HS ngay** · kênh độc lập xác minh |
| 12 | Phân bố **tầng năng lực HS lệch theo hoàn cảnh kinh tế** | Tiêu chí lên tầng đang bất công | Sửa tiêu chí, không sửa học sinh |

---

## PHẦN D. LỊCH RÀ SOÁT ĐỊNH KỲ

| Chu kỳ | Nội dung rà soát | Ai làm | Kết quả |
|:--:|---|---|---|
| **Hằng ngày** | Cảnh báo D4 · break-glass · đăng nhập bất thường | ADM-HT *(tự động)* + TV trưởng | Xử lý ngay hoặc ghi "đã xem" |
| **Hằng tuần** | Hộp thư kín *(sổ mở hộp)* · danh sách HS cần chú ý · `PSM` bất thường | QLHV + TV | Danh sách việc phải làm |
| **Hằng tháng** | Truy cập ngoài phân công · sửa điểm đã chốt · xuất dữ liệu | QLHV | Biên bản gửi GDĐH |
| **Mỗi 90 ngày** | **Rà toàn bộ danh sách vai và quyền** · tài khoản không hoạt động · CVN hết hạn | SADM + GDĐH *(4 mắt)* | Biên bản rà quyền |
| **Mỗi học kỳ** | Phân bố tầng năng lực đối chiếu hoàn cảnh HS · công bằng tiêu chí | QLHV + GDĐH | Đề xuất sửa tiêu chí nếu lệch |
| **Hằng năm** | Kiểm thử xâm nhập · diễn tập ứng phó sự cố · huấn luyện lại toàn bộ nhân sự · kiểm tra phục hồi sao lưu | ADM-HT + GDĐH | Báo cáo an toàn thông tin năm |

---

## PHẦN E. CHỈ SỐ HIỆU LỰC KIỂM SOÁT *(báo cáo cho GDĐH mỗi quý)*

| Chỉ số | Ngưỡng tốt | Ngưỡng báo động |
|---|:--:|:--:|
| Tỷ lệ tài khoản có xác thực 2 lớp *(vai bắt buộc)* | **100%** | <100% |
| Số lần break-glass / quý | ≤1 | ≥3 |
| Tỷ lệ break-glass được hậu kiểm trong 24h | **100%** | <100% |
| Thời gian thu hồi quyền khi nghỉ việc | ≤24h | >72h |
| Tỷ lệ hoạt động có ảnh/dữ liệu **có phiếu đồng ý đầy đủ** | **100%** | <98% |
| Tỷ lệ báo cáo hé lộ được chuyển TV trong 24h | **100%** | <100% |
| Số truy cập hồ sơ ngoài phân công chưa giải trình | **0** | ≥1 |
| Tỷ lệ nhân sự đã ký cam kết & huấn luyện trong 12 tháng | **100%** | <95% |
| Số sự cố dữ liệu chưa thông báo đúng hạn | **0** | ≥1 |

> **Nguyên tắc đọc chỉ số:** con số **0 sự cố** không đương nhiên là tốt — có thể là **chưa phát hiện được**. Vì vậy luôn đọc kèm chỉ số *"số cảnh báo đã được xử lý"*: một hệ thống khoẻ là hệ thống **có cảnh báo và xử lý được cảnh báo**, không phải hệ thống im lặng.

---

## PHẦN F. MẪU BIÊN BẢN RÀ QUYỀN 90 NGÀY

```
 BIÊN BẢN RÀ SOÁT PHÂN QUYỀN — Kỳ: ……/…… · Ngày: ………………
 Người thực hiện: ……………… (SADM)   Người đồng kiểm: ……………… (GDĐH)
 ┌────┬──────────────┬────────┬──────────────┬───────────┬──────────────┐
 │ TT │ Tài khoản    │  Vai   │ Lần hoạt     │ Còn đúng  │ Xử lý        │
 │    │              │        │ động cuối    │ nhu cầu?  │              │
 ├────┼──────────────┼────────┼──────────────┼───────────┼──────────────┤
 │    │              │        │              │  ☐ Có ☐ Không │ ☐ giữ ☐ hạ ☐ thu hồi │
 └────┴──────────────┴────────┴──────────────┴───────────┴──────────────┘
 Tổng tài khoản: ……  · Thu hồi: ……  · Hạ quyền: ……  · Khoá do không dùng: ……
 Cặp vai bị kiêm nhiệm sai *(theo Phần D của 01-RBAC)*: ………………………………
 Kết luận: ☐ Đạt   ☐ Cần khắc phục — hạn: ………………
 Chữ ký SADM: ……………………      Chữ ký GDĐH: ……………………
```

---

*Tài liệu thuộc bộ **KNS365 – Hệ GEN VIỆT** · đồng bộ chuẩn **GITA365** · Học viện GITA.*
