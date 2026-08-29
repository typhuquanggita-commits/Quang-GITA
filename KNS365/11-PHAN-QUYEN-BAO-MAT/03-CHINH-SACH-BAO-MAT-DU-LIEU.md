# CHÍNH SÁCH BẢO MẬT & BẢO VỆ DỮ LIỆU KNS365
### Sổ đăng ký lỗ hổng đã bịt · phân loại dữ liệu · vòng đời · ứng phó sự cố

> **Bối cảnh rủi ro đặc thù:** KNS365 xử lý dữ liệu của **trẻ em từ 6 tuổi**, trong đó có loại dữ liệu nhạy cảm nhất có thể tồn tại trong một hệ giáo dục: **lời kể của một đứa trẻ về việc em bị làm hại**. Một rò rỉ ở đây không gây thiệt hại tài chính — nó gây tổn thương cho một con người và có thể đẩy em vào nguy hiểm thật.
> Vì vậy chuẩn bảo mật của KNS365 đặt cao hơn chuẩn thông thường của phần mềm giáo dục.

---

## PHẦN A. SỔ ĐĂNG KÝ LỖ HỔNG ĐÃ RÀ SOÁT VÀ BỊT

> Đây là kết quả rà soát toàn bộ thiết kế chương trình KNS365 *(11 phân hệ, 288 chuyên đề, hệ giáo trình online, quy trình vận hành)*. Mỗi lỗ hổng đều có **biện pháp bắt buộc**, không phải khuyến nghị.

| Mã | Lỗ hổng | Rủi ro | **Biện pháp bắt buộc** | Áp dụng tại |
|:--:|---|---|---|---|
| **L-01** | **Kênh nhắn tin 1-1 giữa người lớn và trẻ em** *(kế thừa từ mô hình Coach–User qua Zalo của GITA365)* | Đây là **con đường phổ biến nhất của xâm hại có chủ đích**: người lớn tạo quan hệ riêng, tạo bí mật, cô lập trẻ khỏi phụ huynh | ⛔ **Cấm tuyệt đối với người học <16 tuổi.** Mọi liên lạc qua **nhóm có ≥2 người lớn hoặc có phụ huynh**; nội dung lưu trong hệ thống; ≥16 tuổi vẫn phải dùng kênh có ghi nhận, không dùng tài khoản cá nhân của nhân sự | `01-RBAC` NT4 · `07-HE-GEN-VIET` · Cẩm nang GV |
| **L-02** | **Hộp thư kín** — ai giữ chìa khoá, ai đọc | Nội dung tố giác có thể bị chính người bị tố giác đọc trước | **Hai người cùng mở** *(TRN + QLHV, hoặc TRN + TV)*, ghi sổ mở hộp. Nếu nội dung liên quan một nhân sự → **chuyển thẳng TV trưởng, bỏ qua tuyến quản lý** | Kịch bản `K01-M2-01` · Cẩm nang GV |
| **L-03** | **Sổ tay HLV ghi lời trẻ hé lộ** | Sổ giấy không khoá, để trên bàn giáo viên, ai cũng đọc được | Ghi vào **biểu mẫu báo cáo hé lộ riêng**, nộp trong 24h, cất **tủ có khoá** hoặc hồ sơ số có phân quyền C3. **Cấm ghi vào sổ soạn bài, sổ điểm, nhóm chat** | Giáo án `K01-M2-01` · `04-NHAT-KY` |
| **L-04** | **Phiếu Sứ Mệnh chứa "Bàn Tay Tin Cậy"** *(tên & quan hệ 5 người lớn quanh trẻ)* | Bản đồ quan hệ của một đứa trẻ — công cụ lý tưởng cho kẻ có ý đồ | Phiếu **không dán tường, không chụp đăng nhóm phụ huynh**; lưu trong hồ sơ HS phân quyền; bản giấy thu về cuối buổi | Giáo án `K01-M2-01` · `06-KHO-PHIEU` |
| **L-05** | **Ảnh/video học sinh** *(SHOWCASE, video 45″ gửi phụ huynh)* | Phát tán ngoài ý muốn; dùng cho mục đích khác mục đích đã xin phép | **Một phiếu đồng ý cho một mục đích.** Đồng ý gửi phụ huynh ≠ đồng ý đăng truyền thông. Gửi qua kênh của hệ thống, **không qua tài khoản cá nhân**; xoá bản gốc trên thiết bị HLV sau khi nộp | Toàn bộ giáo án · `10-GIAO-TRINH-ONLINE` |
| **L-06** | **Hình ảnh người thụ hưởng trong dự án tác động** | "Đạo đức hình ảnh": dùng hình ảnh khó khăn của người yếu thế để gây quỹ | Cấm chụp nhận diện trẻ em/người bệnh/người khó khăn; cấm đăng tên thật; **từ chối tài trợ có điều kiện quay cận mặt trẻ em** | Giáo án `K11-M8-01` quy tắc 4 & 7 |
| **L-07** | **Học sinh giữ tiền mặt và tài khoản quỹ** | Mất mát, tranh chấp, và nguy cơ HS bị lợi dụng | Tồn quỹ tiền mặt ≤500.000đ *(≤200.000đ với A-3)*; **tài khoản đứng tên người lớn**; chi >100.000đ cần 2 chữ ký; sổ quỹ công khai hằng tuần | Giáo án `K11-M8-01` quy tắc 6 |
| **L-08** | **Dữ liệu khảo sát người thụ hưởng** | Thu thập thông tin cá nhân người dân, không ai quản | Thu thập **tối thiểu cần thiết**; lưu **ẩn danh**; chỉ đội trưởng + HLV truy cập; **xoá dữ liệu thô sau khi bàn giao** | Giáo án `K11-M8-01` quy tắc 3 & 8 |
| **L-09** | **Điểm chẩn đoán & bản đồ khoảng cách** *(dữ liệu học lực chi tiết)* | Lộ ra ngoài gây kỳ thị, áp lực, so sánh | Không đọc điểm cá nhân trước lớp; dữ liệu 20/80 dùng trong lớp phải **ẩn danh**; bản in thu về cuối buổi | Giáo án `K06-M1-02`, `K09-M6-01` |
| **L-10** | **Tài khoản dùng chung / thiết bị dùng chung ở lớp** | Không truy được ai đã thao tác; HS đăng nhập nhầm hồ sơ bạn | **Cấm tài khoản dùng chung cho nhân sự.** Thiết bị lớp: đăng xuất bắt buộc cuối buổi; phiên HS trên máy chung tự hết sau 15 phút | `01-RBAC` Phần E |
| **L-11** | **CVN / khách mời ngoài trường** | Người ngoài tiếp cận dữ liệu và trẻ em mà không qua kiểm tra | CVN nhận **dữ liệu đã ẩn danh**; tài khoản có **hạn dùng theo hợp đồng**; khách mời **không bao giờ ở một mình với HS**; có cam kết bảo mật ký trước | `01-RBAC` · `K11-M8-01` |
| **L-12** | **Xuất dữ liệu hàng loạt** *(báo cáo, Portfolio, xét tuyển)* | Một lần xuất sai = lộ toàn bộ hồ sơ khoá học | Cần **4 mắt** + ghi lý do; file xuất **có watermark và hạn hiệu lực**; mặc định ẩn danh, chỉ định danh khi có căn cứ | `01-RBAC` C4 |
| **L-13** | **Quyền của người đã nghỉ việc** | Tài khoản cũ vẫn đọc được hồ sơ trẻ | Thu hồi **trong 24h**; rà soát toàn hệ **mỗi 90 ngày**; tài khoản không dùng 90 ngày tự khoá | `01-RBAC` Phần E |
| **L-14** | **Người bị nghi ngờ là nhân sự trong hệ thống** | Quy trình báo cáo thông thường đi qua đúng người đang bị nghi ngờ | **Kênh độc lập bắt buộc:** TV trưởng + đại diện nhà trường, bỏ qua tuyến quản lý; người bị nghi **tạm dừng tiếp xúc HS** trong thời gian xác minh | `01-RBAC` C3 quy tắc ② |
| **L-15** | **Cấp cao xem được mọi thứ** | Quyền tuyệt đối không ai kiểm soát; rủi ro lạm dụng lớn nhất nằm ở đây | **SADM và GDĐH không đọc hồ sơ C3.** ADM-HT chỉ vào bằng **break-glass** có cảnh báo. Nhật ký **chỉ-thêm**, không ai xoá được | `01-RBAC` NT2 · Phần G |
| **L-16** | **Nguồn tài liệu ngoài chưa xác thực** *(thư mục Drive dùng chung)* | Nhận nhầm tài liệu, hoặc phát tán nội dung nội bộ ra ngoài | Chỉ dùng nguồn có **chủ sở hữu xác định và quyền truy cập rõ ràng**; ghi nguồn trong tài liệu; **không đưa dữ liệu HS lên kho dùng chung không phân quyền** | `07-HE-GEN-VIET` Phần H |

---

## PHẦN B. PHÂN LOẠI DỮ LIỆU 4 MỨC

| Mức | Tên | Ví dụ | Ai đọc được | Lưu trữ |
|:--:|---|---|---|---|
| **D1** | **Công khai** | Khung chương trình, mô tả chuyên đề, tài liệu giới thiệu | Mọi người | Không hạn chế |
| **D2** | **Nội bộ** | Giáo án, kịch bản, kho phiếu, rubric, số liệu tổng hợp ẩn danh | Nhân sự có vai | Kho nội bộ có đăng nhập |
| **D3** | **Cá nhân học sinh** | Điểm, rubric, quan sát, `PSM`, Portfolio, ảnh/video, hồ sơ gia đình | Vai **được phân công** cho HS đó + PH của chính HS đó | Mã hoá khi lưu & khi truyền · phân quyền hàng |
| **D4** | **Nhạy cảm đặc biệt** | Báo cáo hé lộ, hồ sơ bảo vệ trẻ em, ghi chú tâm lý, thông tin sức khoẻ tâm thần, nội dung hộp thư kín | **Chỉ TV** *(+ PH theo quyết định của TV)* | Khu vực lưu trữ tách biệt · mã hoá riêng · mọi lượt đọc đều cảnh báo |

> **Quy tắc nâng mức:** khi một dữ liệu D3 có nhắc tới nghi ngờ xâm hại/bạo lực/sức khoẻ tâm thần, nó **tự động trở thành D4** kể từ thời điểm đó, kể cả khi nó nằm trong một phiếu học tập bình thường.

---

## PHẦN C. VÒNG ĐỜI DỮ LIỆU

| Giai đoạn | Quy định |
|---|---|
| **Thu thập** | **Tối thiểu cần thiết.** Mỗi trường dữ liệu phải trả lời được: *"Không có nó thì việc gì hỏng?"* Không hỏi nghề nghiệp/thu nhập phụ huynh nếu không phục vụ hỗ trợ cụ thể |
| **Đồng ý** | Phiếu đồng ý **theo từng mục đích**, ghi rõ: dữ liệu gì – dùng làm gì – ai xem – lưu bao lâu – cách rút lại đồng ý. **Rút đồng ý có hiệu lực ngay**, không cần lý do |
| **Lưu trữ** | D3/D4 mã hoá khi lưu và khi truyền. Bản giấy: **tủ có khoá**, sổ mượn–trả. Sao lưu **có mã hoá**, kiểm tra phục hồi **mỗi quý** |
| **Sử dụng** | Chỉ đúng mục đích đã xin phép. Dùng cho nghiên cứu/truyền thông **phải ẩn danh và xin đồng ý riêng** |
| **Chia sẻ** | Với bên thứ ba: hợp đồng bảo mật + phạm vi tối thiểu + hạn dùng. **Không bao giờ chia sẻ D4 ra ngoài trừ cơ quan chức năng có thẩm quyền** |
| **Lưu giữ** | D3: trong thời gian học + **2 năm**. D4: theo quy định pháp luật về bảo vệ trẻ em *(giữ đủ lâu để bảo vệ trẻ, không giữ lâu hơn mức cần)*. Ảnh/video: **1 năm** trừ khi có đồng ý riêng |
| **Xoá** | Xoá **an toàn, có biên bản**; xoá cả bản sao lưu theo chu kỳ. PH yêu cầu xoá → thực hiện trong **30 ngày**, trừ phần luật buộc phải giữ *(nêu rõ phần nào và vì sao)* |

---

## PHẦN D. NỀN TẢNG ONLINE — YÊU CẦU BẢO MẬT BẮT BUỘC

| Nhóm | Yêu cầu |
|---|---|
| **Xác thực** | 2 lớp bắt buộc với TV/QLHV/ADM-HT/ADM-SP/SADM/GDĐH · chống dò mật khẩu · khoá tạm sau 5 lần sai · không gửi mật khẩu qua tin nhắn |
| **Phiên** | Hết hạn 30′ *(TV: 10′)* · huỷ toàn bộ phiên khi đổi mật khẩu hoặc thu hồi vai · hiển thị "các thiết bị đang đăng nhập" cho người dùng |
| **Phân quyền** | Kiểm tra quyền **ở phía máy chủ cho từng bản ghi**, không chỉ ẩn nút trên giao diện · mặc định **từ chối** khi không khớp quy tắc |
| **Dữ liệu** | Mã hoá đường truyền · mã hoá D3/D4 khi lưu · tách riêng kho D4 · không đưa dữ liệu thật vào môi trường thử nghiệm |
| **Trẻ em** | ⛔ Không bảng xếp hạng công khai · ⛔ không cơ chế gây nghiện *(chuỗi ép buộc, đếm ngược tạo lo âu, phần thưởng ngẫu nhiên)* · ⛔ không quảng cáo · ⛔ không theo dõi hành vi ngoài phạm vi học tập · ✅ nút **"Cần trợ giúp"** hiện ở mọi màn hình, dẫn tới HLV và **tổng đài 111** |
| **Nội dung do HS tạo** | Kiểm duyệt trước khi hiển thị cho người khác · không cho tải lên ảnh có mặt người khác nếu chưa có đồng ý · công cụ báo cáo nội dung xấu ngay trên màn hình |
| **Nhà cung cấp** | Rà soát bên thứ ba trước khi tích hợp · yêu cầu cam kết bảo vệ dữ liệu trẻ em bằng văn bản · biết **dữ liệu đặt ở đâu** |
| **Kiểm thử** | Rà soát bảo mật trước mỗi bản phát hành lớn · kiểm thử xâm nhập **≥1 lần/năm** · sửa lỗi nghiêm trọng **trong 7 ngày** |

---

## PHẦN E. ỨNG PHÓ SỰ CỐ *(4 giờ đầu quyết định mọi thứ)*

```
 PHÁT HIỆN ──▶ CHẶN ──▶ ĐÁNH GIÁ ──▶ THÔNG BÁO ──▶ KHẮC PHỤC ──▶ HỌC LẠI
   0-15'       15-60'     1-4h          4-72h         ≤7 ngày      ≤30 ngày
```

| Bước | Việc phải làm | Ai |
|:--:|---|---|
| **1. Phát hiện** *(0–15′)* | Bất kỳ ai nghi ngờ đều **phải báo ngay**, không cần chắc chắn. Báo muộn nghiêm trọng hơn báo nhầm | Tất cả |
| **2. Chặn** *(15–60′)* | Khoá tài khoản liên quan · ngắt chia sẻ · giữ nguyên hiện trạng log *(không xoá gì)* | ADM-HT |
| **3. Đánh giá** *(1–4h)* | Dữ liệu nào · bao nhiêu người · mức D mấy · **có nguy cơ an toàn cho HS không** | SADM + TV + GDĐH |
| **4. Thông báo** *(4–72h)* | **Nếu có nguy cơ an toàn cho trẻ → báo phụ huynh và cơ quan chức năng NGAY, không chờ điều tra xong.** Sự cố D3/D4: thông báo PH liên quan trong 72h, nói rõ chuyện gì – ảnh hưởng gì – đã làm gì – PH nên làm gì | GDĐH |
| **5. Khắc phục** *(≤7 ngày)* | Vá lỗi · thu hồi dữ liệu lộ nếu có thể · hỗ trợ người bị ảnh hưởng *(kể cả hỗ trợ tâm lý)* | SADM + ADM-HT + TV |
| **6. Học lại** *(≤30 ngày)* | Biên bản **không quy trách nhiệm cá nhân trước, tìm lỗi hệ thống trước** · cập nhật chính sách · huấn luyện lại · bổ sung vào sổ đăng ký lỗ hổng này | GDĐH |

> ⚠️ **Không bao giờ che giấu sự cố để giữ hình ảnh chương trình.** Một chương trình dạy trẻ nói thật mà giấu sự cố thì đã tự phá bỏ nền tảng của chính nó.

---

## PHẦN F. TRÁCH NHIỆM & CAM KẾT

| Vai | Cam kết bảo mật bắt buộc |
|---|---|
| **Mọi nhân sự** | Ký **Cam kết bảo mật & bảo vệ trẻ em** trước ngày đứng lớp đầu tiên · huấn luyện lại **mỗi năm** · vi phạm L-01 hoặc L-14 = **thu hồi quyền ngay lập tức** |
| **TV** | Giữ bí mật ca tuyệt đối · chỉ chia sẻ theo quy trình bảo vệ trẻ em · lưu hồ sơ đúng khu vực D4 |
| **QLHV** | Rà soát quyền mỗi 90 ngày · kiểm tra phiếu đồng ý trước mọi hoạt động có ảnh/dữ liệu |
| **ADM-HT** | Không đọc nội dung nghiệp vụ · kiểm tra phục hồi sao lưu mỗi quý · giữ nhật ký chỉ-thêm |
| **SADM** | Không tự cấp quyền cho mình · mọi thao tác 4 mắt · báo cáo quyền cho GDĐH mỗi quý |
| **GDĐH** | Chịu trách nhiệm cuối cùng về thông báo sự cố · **không yêu cầu cấp dưới mở hồ sơ D4** ngoài quy trình |

> **Đường dây nóng:** Tổng đài Quốc gia Bảo vệ Trẻ em **111** *(miễn phí, 24/7)* · cán bộ tâm lý nhà trường · công an phường/xã.

> ⚠️ **Lưu ý pháp lý:** chính sách này được xây dựng theo tinh thần **Luật Trẻ em 2016**, **Luật An ninh mạng 2018**, **Luật Bảo vệ dữ liệu cá nhân** và các quy định hiện hành về bảo vệ trẻ em trên môi trường mạng. **Đơn vị triển khai phải rà soát hiệu lực văn bản tại thời điểm áp dụng** và điều chỉnh cho phù hợp; tài liệu này không thay thế tư vấn pháp lý.

---

*Tài liệu thuộc bộ **KNS365 – Hệ GEN VIỆT** · đồng bộ chuẩn **GITA365** · Học viện GITA.*
