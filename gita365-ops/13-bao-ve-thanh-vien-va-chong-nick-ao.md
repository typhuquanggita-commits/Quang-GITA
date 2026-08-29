# 13 — BẢO VỆ THÀNH VIÊN, CHỐNG NICK ẢO & CHỐNG SĂN KHÁCH

> Cộng đồng càng lớn càng hấp dẫn kẻ khai thác. Khi nhóm vượt 10.000 người, sẽ có người vào
> **không phải để học mà để lấy danh sách khách hàng của anh**. Hệ phòng thủ này phải được
> dựng **trước** khi nhóm nổi tiếng, không phải sau khi bị mất người.

## 13.1. Bốn loại đối tượng cần chặn

| Loại | Nhận dạng | Mục đích của họ | Mức nguy hiểm |
|---|---|---|---|
| **Nick ảo / nick rác** | Tài khoản mới, ít bạn, ảnh lấy trên mạng, không lịch sử | Tăng số, spam, dò đường | Trung bình |
| **Nick đi săn** | Tài khoản thật, có vẻ bình thường, **vào là xem danh sách thành viên rồi nhắn tin hàng loạt** | Lấy khách của anh để bán hàng/tuyển hệ thống | **Rất cao** |
| **Phần mềm quét nhóm** | Không thấy được trực tiếp; dấu hiệu là thành viên đồng loạt bị nhắn tin lạ sau khi vào nhóm | Xuất danh sách thành viên, tự động kết bạn/nhắn tin | **Rất cao** |
| **Đối thủ trá hình** | Tài khoản hoạt động tốt, dần dần chèn nội dung/lời mời của bên khác | Chuyển hướng cộng đồng | Cao |

---

## 13.2. Bảy lớp phòng thủ

```
LỚP 1  Cấu hình nhóm      → nhóm Riêng tư + Ẩn, ẩn tối đa bề mặt tấn công
LỚP 2  Cổng vào           → 4 câu hỏi + tự động từ chối + chấm điểm rủi ro
LỚP 3  Vùng đệm           → 7 ngày quản chế người mới
LỚP 4  Giám sát chủ động  → tài khoản mồi, tuần tra danh sách thành viên
LỚP 5  Kênh tố giác       → thành viên báo cáo bị nhắn tin làm phiền trong 1 chạm
LỚP 6  Chế tài            → chặn vĩnh viễn + ghi sổ đen + báo cáo nền tảng
LỚP 7  Chủ quyền dữ liệu  → chuyển tài sản khỏi Facebook, giảm thiệt hại nếu mất nhóm
```

---

## 13.3. LỚP 1–2: Cấu hình và cổng vào

**Cấu hình bắt buộc:**

| Thiết lập | Giá trị | Vì sao |
|---|---|---|
| Quyền riêng tư nhóm | **G1: Riêng tư · G2: Công khai (bằng cơ chế chuyển đổi)** — xem `17.2` | Nhóm chuyển đổi giữ kín toàn bộ nội dung cũ **và khóa danh sách thành viên chỉ admin/mod thấy** — chặn đúng phần mềm quét nhóm, đồng thời mở được tìm kiếm |
| Hiển thị | **Cả hai nhóm: Hiển thị.** Không dùng chế độ Ẩn | Chế độ Ẩn không bảo vệ thêm gì so với Riêng tư, nhưng lấy đi toàn bộ khả năng được tìm thấy (`17.2`) |
| Ai được duyệt thành viên | Chỉ quản trị viên & người kiểm duyệt được chỉ định | Chặn cửa hậu |
| Ai được thêm thành viên | **Tắt tính năng thành viên tự thêm người** — mọi người phải qua cổng | Đây là lỗ hổng số 1 để nick ảo tràn vào |
| Duyệt bài | Bật cho tất cả thành viên mới; bật vĩnh viễn với người từng vi phạm | |
| Lọc từ khóa | Bật, danh sách ở 13.5 | |
| Trợ lý quản trị | Bật tất cả quy tắc tự động ở 13.4 | |
| Cảnh báo xung đột | Bật | |

**Bốn câu hỏi duyệt (thêm câu 4 so với `02.5`):**
4. *Ai giới thiệu bạn vào nhóm, hoặc bạn biết nhóm qua đâu?* (bắt buộc trả lời)

**Bảng chấm điểm rủi ro khi duyệt** — cộng điểm, từ 4 điểm trở lên thì **không duyệt**:

| Dấu hiệu | Điểm |
|---|---|
| Tài khoản dưới 30 ngày tuổi | +2 |
| Dưới 50 bạn bè hoặc ẩn hoàn toàn danh sách bạn | +1 |
| Không có ảnh đại diện thật / ảnh lấy trên mạng | +2 |
| Không có bài đăng cá nhân nào trong 6 tháng | +1 |
| Trả lời câu hỏi bằng một chữ, sao chép, hoặc bỏ trống | +3 |
| Tên tài khoản chứa từ khóa bán hàng ("Shop", "Mỹ phẩm", "Bảo hiểm", "Sỉ lẻ"…) | +3 |
| Trang cá nhân toàn nội dung bán hàng / tuyển cộng tác viên / đa cấp | +4 |
| Không có bạn chung nào với bất kỳ thành viên nào | +1 |
| Đang là thành viên của nhiều nhóm bán hàng cùng lĩnh vực | +2 |
| Có tên trong **sổ đen** của GITA365 | +10 |

*Ghi chú vận hành:* ở quy mô lớn, 3 dấu hiệu đầu do Trợ lý quản trị tự lọc; phần còn lại do
đội kiểm duyệt và đại sứ xử lý theo tỉ lệ **1 người kiểm duyệt / 2.000 thành viên**.

---

## 13.4. Quy tắc Trợ lý quản trị cần bật (tự động 24/7)

| Quy tắc | Cấu hình |
|---|---|
| Từ chối yêu cầu tham gia | nếu tài khoản < 30 ngày tuổi |
| Từ chối yêu cầu tham gia | nếu không trả lời hết câu hỏi |
| Từ chối yêu cầu tham gia | nếu câu trả lời chứa từ khóa cấm |
| Từ chối yêu cầu tham gia | nếu từng bị mời khỏi nhóm |
| Tạm dừng đăng bài | với thành viên mới trong 7 ngày đầu |
| Ẩn bình luận | chứa từ khóa cấm (13.5) hoặc số điện thoại/liên kết ngoài |
| Ẩn bài | có chứa liên kết ngoài danh sách cho phép |
| Cảnh báo quản trị viên | khi một bài có tốc độ bình luận bất thường |
| Hạn chế thành viên | tự động sau 3 lần bị ẩn nội dung |

---

## 13.5. Danh sách từ khóa lọc (khởi điểm — cần bổ sung theo thực tế)

**Nhóm bán hàng/tuyển dụng:** ib giá, inbox giá, giá sỉ, sỉ lẻ, chốt đơn, freeship, cod,
tuyển ctv, tuyển cộng tác viên, việc nhẹ lương cao, làm việc tại nhà, thu nhập thụ động,
hoa hồng, nhị phân, hệ thống tuyến dưới, kèo, sàn, đầu tư sinh lời, x2 tài khoản, chốt kèo.

**Nhóm tài chính rủi ro:** vay nhanh, vay không thế chấp, đáo hạn, bank, đổi tiền, crypto,
forex, lãi suất cao, ủy thác đầu tư.

**Nhóm lôi kéo riêng tư:** kết bạn zalo nhé, sđt em là, add mình, nhắn riêng em bán, tư vấn miễn phí ib.

**Nhóm rủi ro trẻ em:** (danh sách riêng, quản trị viên tự cấu hình) mọi từ ngữ mô tả trẻ em
theo hướng ngoại hình/thân thể.

> Lưu ý: lọc từ khóa gây "báo động giả" (ví dụ ai đó nói "em vay tiền mua sách cho con").
> Vì vậy đặt chế độ **ẩn chờ duyệt**, không xóa thẳng, và kiểm duyệt viên xem lại trong 4 giờ.

---

## 13.6. LỚP 3: Vùng đệm 7 ngày cho người mới

| Ngày | Quyền của thành viên mới |
|---|---|
| 1–3 | Chỉ đọc và bình luận. Không đăng bài. Không được gắn thẻ hàng loạt. |
| 4–7 | Được đăng bài nhưng phải qua duyệt. |
| Sau 7 ngày + ≥1 bình luận có nội dung | Trở thành thành viên đầy đủ |
| Không tương tác sau 30 ngày | Giữ nguyên trạng thái quản chế (không nâng quyền) |

Ý nghĩa: kẻ đi săn cần **tốc độ**. Vùng đệm 7 ngày làm chi phí tấn công tăng gấp nhiều lần,
và phần lớn sẽ bỏ đi tìm nhóm dễ hơn.

---

## 13.7. LỚP 4: Giám sát chủ động

**1. Tài khoản mồi (honeypot) — kỹ thuật hiệu quả nhất để bắt phần mềm quét nhóm:**
- Tạo 3–5 tài khoản thành viên "mồi" do đội ngũ kiểm soát, có hồ sơ trông như thành viên thật,
  **không bao giờ dùng cho việc gì khác** và không kết bạn với ai ngoài nhóm.
- Đặt tên/thông tin có dấu hiệu nhận dạng riêng cho từng nhóm (ví dụ mồi ở G1 khác mồi ở G2).
- **Bất kỳ tin nhắn chào hàng nào gửi tới tài khoản mồi = bằng chứng có người/phần mềm đang
  quét danh sách thành viên.** Truy ngược: tài khoản mồi mới xuất hiện trong nhóm nào, thời điểm nào
  → khoanh vùng những thành viên vào nhóm trong cùng khoảng thời gian → điều tra.

**2. Tuần tra định kỳ (hằng tuần, 20 phút):**
- Lọc danh sách thành viên theo "mới tham gia", rà 20 tài khoản gần nhất theo bảng điểm 13.3.
- Rà những người **chưa từng bình luận nhưng hoạt động liên tục** (dấu hiệu người quan sát để săn).
- Kiểm tra mục "thành viên bị báo cáo" và nhật ký hoạt động của nhóm.

**3. Chỉ dấu cảnh báo sớm:**
| Dấu hiệu | Ý nghĩa |
|---|---|
| Nhiều thành viên cùng báo bị nhắn tin lạ trong một tuần | Đang có đợt quét danh sách |
| Số yêu cầu tham gia tăng đột biến từ tài khoản mới lập | Bị nhắm mục tiêu |
| Một người thả cảm xúc/xem hàng loạt bài nhưng không bao giờ bình luận | Có thể là người đi săn |
| Nhiều tài khoản mới có cùng kiểu tên, cùng ảnh bìa | Trại nick |

---

## 13.8. LỚP 5: Kênh tố giác một chạm

- Ghim vĩnh viễn một bài: **"Bị người lạ trong nhóm nhắn tin bán hàng? Báo cho ban quản trị ở đây."**
  kèm biểu mẫu 3 trường: ảnh chụp màn hình, liên kết tài khoản, thời điểm.
- Cam kết công khai: **xử lý trong 4 giờ, người báo cáo được giữ kín danh tính**.
- Mỗi tháng đăng một bản tin ngắn: "Tháng này ban quản trị đã chặn [x] tài khoản đi săn nhờ
  [y] báo cáo của anh chị." → biến thành viên thành lớp phòng thủ dày nhất và tăng niềm tin.

---

## 13.9. LỚP 6: Chế tài

| Hành vi | Xử lý | Cảnh báo trước? |
|---|---|---|
| Nhắn tin riêng chào bán cho thành viên | **Chặn vĩnh viễn** + ghi sổ đen | Không |
| Dùng phần mềm/công cụ quét danh sách thành viên | **Chặn vĩnh viễn** + báo cáo nền tảng | Không |
| Đăng nội dung tuyển hệ thống/đa cấp | Chặn vĩnh viễn | Không |
| Sao chép, tải, phát tán ảnh của gia đình khác | **Chặn vĩnh viễn** + yêu cầu gỡ | Không |
| Tài khoản giả mạo danh tính | Chặn vĩnh viễn | Không |
| Chèn liên kết ngoài lần đầu | Gỡ bài + nhắc riêng | Có |
| Lệch chủ đề, quên quy tắc | Nhắc nhở | Có |

**Sổ đen** (Sheet `SO_DEN`): `link_tai_khoan | ten | ngay | ly_do | bang_chung | nguoi_xu_ly | nhom`.
Dùng chung cho toàn cụm nhóm — bị chặn ở một nhóm là bị chặn ở tất cả.

---

## 13.10. LỚP 7: Chủ quyền dữ liệu — điều quan trọng nhất về dài hạn

**Cập nhật 11/2025 — đã có một cách chặn thật sự:** khi một nhóm **chuyển từ riêng tư sang
công khai** bằng cơ chế mới của Facebook, **danh sách thành viên chỉ còn quản trị viên và người
kiểm duyệt xem được**. Đây là biện pháp mạnh nhất hiện có để chống quét danh sách — và nghịch lý
là nó đến từ việc *công khai* nhóm, không phải từ việc đóng kín. Chi tiết và điều kiện đi kèm ở `17.2`.

**Với nhóm vẫn để riêng tư (G1):** không có cách nào chặn tuyệt đối việc một thành viên hợp lệ
ghi lại tên những người khác. Facebook cho phép mọi thành viên xem danh sách thành viên trong
nhóm riêng tư, và không có công cụ nào của nền tảng chặn được điều đó. Mọi lời quảng cáo
"chặn 100% phần mềm quét nhóm" đều là nói quá.

**Vì vậy chiến lược đúng không phải là "xây tường cao hơn" mà là "làm cho danh sách trở nên vô giá trị
với kẻ trộm, và chuyển tài sản thật sang nơi mình sở hữu":**

| Biện pháp | Tác dụng |
|---|---|
| Chuyển thành viên hoạt động sang **web app GITA365 / Zalo OA / danh sách thư** | Đây mới là tài sản của anh; mất nhóm Facebook cũng không mất cộng đồng |
| Giá trị nằm ở **quan hệ và nghi thức**, không nằm ở danh sách tên | Kẻ trộm lấy được tên nhưng không lấy được lòng tin — người bị nhắn tin lạ sẽ báo cáo, không mua |
| Công khai với thành viên rằng ban quản trị không bao giờ nhắn tin bán hàng đột ngột | Người lạ mạo danh sẽ bị nhận ra ngay |
| Không cho phép đăng số điện thoại, Zalo công khai trong nhóm | Giảm dữ liệu để thu hoạch |
| Đóng dấu chìm ảnh/tài liệu do GITA sản xuất | Chống dùng lại nội dung |
| Nhóm càng lớn càng phải chia nhỏ theo cụm (12.5) | Một nhóm bị xâm nhập không kéo sập cả hệ |

---

## 13.11. Cam kết bảo vệ khách hàng của GITA365 (đăng công khai & ghim)

> **CAM KẾT BẢO VỆ THÀNH VIÊN**
> 1. Chúng tôi **không bán, không cho, không trao đổi** thông tin của anh chị cho bất kỳ ai.
> 2. Ban quản trị **không bao giờ** nhắn tin đòi chuyển tiền, xin mã OTP, hay mời đầu tư.
>    Mọi tin nhắn như vậy là mạo danh — xin báo ngay cho chúng tôi.
> 3. Câu chuyện anh chị chia sẻ trong nhóm **chỉ ở lại trong nhóm**. Nếu chúng tôi muốn dùng
>    làm bài viết, chúng tôi sẽ **hỏi trước và để anh chị duyệt**.
> 4. Ảnh của gia đình và trẻ em **không được dùng cho quảng cáo** nếu không có sự đồng ý riêng bằng văn bản.
> 5. Anh chị có quyền yêu cầu chúng tôi **xóa toàn bộ thông tin** của mình bất cứ lúc nào,
>    và chúng tôi thực hiện trong vòng 7 ngày.
> 6. Bị làm phiền bởi người bán hàng trong nhóm? Báo cho chúng tôi — **xử lý trong 4 giờ,
>    danh tính người báo được giữ kín**.
> 7. Chúng tôi không dùng tài khoản ảo, không mua tương tác, không thuê người bình luận.
>    Mọi con người anh chị gặp trong nhóm này đều là người thật.

---

## 13.12. Quy trình kiểm toán an toàn hằng tháng (60 phút)

1. Lấy mẫu ngẫu nhiên 50 thành viên → chấm theo bảng 13.3 → tính **tỉ lệ nick ảo lọt cổng** (mục tiêu <2%).
2. Kiểm tra hộp thư của toàn bộ tài khoản mồi → thống kê số vụ chào hàng.
3. Rà nhật ký kiểm duyệt: số bài bị ẩn, số người bị chặn, thời gian xử lý trung bình.
4. Rà các báo cáo từ thành viên: đã xử lý hết chưa, có vụ nào quá 4 giờ không.
5. Cập nhật danh sách từ khóa lọc theo chiêu thức mới.
6. Cập nhật sổ đen và đồng bộ sang toàn bộ nhóm vệ tinh.
7. Viết 5 dòng báo cáo an toàn cho ban điều hành + 1 bản tin ngắn cho cộng đồng.
