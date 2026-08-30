# 29 — TUÂN THỦ PHÁP LÝ VÀ BẢO VỆ DỮ LIỆU

> ⚠️ **Đây là tài liệu vận hành, không phải tư vấn pháp lý.** Nội dung tổng hợp từ hiểu biết chung về quy định Việt Nam
> tại thời điểm soạn thảo. Trước khi nhóm vượt **10.000 thành viên** hoặc trước khi thu bất kỳ dữ liệu cá nhân nào
> ngoài Facebook, **phải có luật sư rà soát lại toàn bộ chương này**. Mọi điều khoản, số hiệu văn bản và thời hạn
> nêu dưới đây phải được đối chiếu với văn bản gốc còn hiệu lực trước khi áp dụng.

---

## 29.1 · Ba nghĩa vụ pháp lý của một quản trị viên nhóm Facebook tại Việt Nam

**1 · Nghĩa vụ gỡ nội dung vi phạm.**
Theo **Nghị định 147/2024/NĐ-CP** (quản lý, cung cấp, sử dụng dịch vụ Internet và thông tin trên mạng, hiệu lực từ 25/12/2024), người quản lý nhóm/trang trên mạng xã hội có trách nhiệm phối hợp gỡ bỏ nội dung vi phạm:
- **Trong 24 giờ** kể từ khi nhận yêu cầu của cơ quan có thẩm quyền.
- **Trong 48 giờ** đối với khiếu nại hợp lệ của người dùng.

**2 · Nghĩa vụ bảo vệ trẻ em.** Nội dung xâm hại, bóc lột, hoặc gây nguy hiểm cho trẻ em phải được gỡ ngay và báo cơ quan chức năng. Xem `24.3`.

**3 · Nghĩa vụ với dữ liệu cá nhân.** Việt Nam đã ban hành khung pháp lý riêng về bảo vệ dữ liệu cá nhân (Nghị định 13/2023/NĐ-CP và các văn bản kế tiếp). Nguyên tắc chi phối: **thu thập tối thiểu, có sự đồng ý, dùng đúng mục đích, xóa khi hết mục đích.**

**Cách GITA365 xử lý nghĩa vụ 3 — bằng thiết kế, không bằng quy trình:**
> Hệ thống này được thiết kế để **không thu thập dữ liệu cá nhân nào ngoài phạm vi Facebook**.
> Sáu trang tài nguyên ở `tai-nguyen/` **không có biểu mẫu, không có máy chủ, không lưu gì**. Trang Thư viện Gia Đình sinh ra
> phiếu đăng ký Mã gia đình **ngay trên máy người dùng** và họ tự dán vào bình luận nhóm.
> Đây là quyết định kiến trúc có chủ đích: nơi nào không giữ dữ liệu thì nơi đó không có nghĩa vụ bảo vệ dữ liệu, không có rủi ro rò rỉ, và không cần đăng ký xử lý dữ liệu.

**Nghĩa vụ chỉ phát sinh khi** hệ thống bắt đầu thu email/số điện thoại qua web app GITA365. Trước ngày đó, mọi việc ở 29.4 phải hoàn tất.

---

## 29.2 · Sổ nghĩa vụ — làm gì, khi nào, ghi ở đâu

| Nghĩa vụ | Thời hạn | Ghi ở đâu | Người chịu trách nhiệm |
|---|---|---|---|
| Gỡ nội dung theo yêu cầu cơ quan có thẩm quyền | 24 giờ | sheet `NHAT_KY_GO` | Admin |
| Xử lý khiếu nại người dùng về nội dung | 48 giờ | sheet `NHAT_KY_GO` | Admin |
| Gỡ nội dung xâm hại trẻ em | Ngay | `NHAT_KY_GO` + `SO_DEN` | Bất kỳ mod nào phát hiện |
| Lưu bằng chứng trước khi gỡ | Trước mọi thao tác gỡ | Thư mục theo ngày | Người xử lý |
| Rà soát nội dung ghim và mô tả nhóm | Mỗi quý | `SO_CA` | Admin |
| Kiểm toán danh sách người có quyền | Mỗi quý | `SO_CA` | Admin |
| Rà soát chương này với luật sư | Trước mốc 10.000 TV | `SO_CA` | Admin |

**Mẫu ghi `NHAT_KY_GO`** — mỗi dòng phải có đủ: ngày giờ nhận yêu cầu · nguồn yêu cầu · nội dung bị yêu cầu gỡ (đường dẫn + ảnh chụp) · căn cứ · ngày giờ thực hiện · người thực hiện · đã thông báo cho tác giả nội dung chưa.

---

## 29.3 · Chương trình trao thưởng — điều kiện hợp lệ

Áp cho mọi cuộc thi, thử thách có giải, bảng thi đua gia đình (`16`, `07`).

**Theo chính sách Meta:**
- ❌ Không được yêu cầu chia sẻ về trang cá nhân để dự thi.
- ❌ Không được yêu cầu gắn thẻ bạn bè để dự thi.
- ❌ Không được tổ chức từ trang cá nhân (phải từ Trang hoặc Nhóm).
- ✅ Được yêu cầu bình luận, đăng bài trong nhóm, tham gia hoạt động.
- ✅ **Bắt buộc** có tuyên bố miễn trừ: chương trình không do Meta tài trợ, chứng thực, hay quản lý; và người dự thi không cung cấp thông tin cho Meta.

**Theo pháp luật Việt Nam** — quy định về khuyến mại có ngưỡng và thủ tục thông báo/đăng ký với cơ quan quản lý tùy hình thức và giá trị giải thưởng. **Hai luật cứng của GITA365 để đứng an toàn dưới ngưỡng:**
1. **Giải thưởng không phải tiền mặt và không quy đổi được ra tiền.** Chỉ là: suất học, kỷ niệm chương, buổi trò chuyện riêng, tên trong kỷ yếu.
2. **Không có yếu tố may rủi.** Mọi giải đều dựa trên **tiêu chí công bố trước và chấm được** (chuyên cần 40% · lan tỏa 30% · chuyển hóa 30%). Không bốc thăm, không quay số, không "random một bạn may mắn".

Nếu có ngày muốn trao giải bằng tiền hoặc bằng bốc thăm — **dừng lại và hỏi luật sư trước**, đó là loại chương trình khác hẳn về mặt pháp lý.

**Thể lệ phải có đủ 8 mục** (mẫu đầy đủ ở `16`): tên chương trình · thời gian · đối tượng · cách tham gia · tiêu chí chấm · giải thưởng · cách trao · tuyên bố miễn trừ Meta + điều khoản sử dụng hình ảnh/câu chuyện người thắng.

---

## 29.4 · Việc phải làm trước khi web app thu dữ liệu

*Danh mục này chỉ có hiệu lực khi bắt đầu thu email/số điện thoại. Trước đó không cần làm gì.*

- [ ] **Chính sách quyền riêng tư** đăng công khai, tiếng Việt, nói rõ: thu gì · để làm gì · giữ bao lâu · chia sẻ cho ai · người dùng có quyền gì · liên hệ ai để xóa
- [ ] **Ô đồng ý riêng biệt**, không đánh dấu sẵn, tách bạch giữa "tạo tài khoản học" và "nhận thông tin về khóa học"
- [ ] **Đường xóa tài khoản và dữ liệu** hoạt động được, tối đa 30 ngày kể từ khi yêu cầu
- [ ] **Thu tối thiểu**: không xin ngày sinh, giới tính, thu nhập, thông tin về con nếu không dùng đến
- [ ] **Không thu dữ liệu trẻ em dưới 16 tuổi** — nếu buộc phải, cần cơ chế xác nhận của cha mẹ, và điều này nên tránh hoàn toàn
- [ ] **Mã hóa khi truyền (HTTPS) và khi lưu** với mọi thông tin định danh
- [ ] **Nhật ký truy cập**: ai xem dữ liệu thành viên, lúc nào
- [ ] **Quy trình khi rò rỉ**: ai báo cho ai trong bao lâu, thông báo cho người bị ảnh hưởng thế nào
- [ ] **Hợp đồng với nhà cung cấp** (hosting, email, phân tích) có điều khoản bảo vệ dữ liệu
- [ ] **Luật sư rà soát toàn bộ** trước khi mở cho người dùng thật

---

## 29.5 · Bản quyền và hình ảnh

**Nội dung do thành viên viết** thuộc về thành viên (`21` Điều 2). Nhóm chỉ được dùng lại khi có đồng ý bằng chữ, nêu rõ bốn điều: đăng ở đâu · có để tên không · có sửa chi tiết không · người viết rút lại được bất cứ lúc nào (`23`/B3).

**Ảnh:**
- Không dùng ảnh tìm được trên mạng cho bài đăng. Chỉ dùng: ảnh tự chụp · ảnh thành viên gửi có xin phép · ảnh từ kho miễn phí bản quyền (ghi rõ nguồn trong `20`).
- **Không đăng ảnh trẻ em rõ mặt**, kể cả khi cha mẹ đồng ý (`21` Điều 5). Đây là quy tắc nội bộ chặt hơn luật — có chủ đích.
- Ảnh có người lớn khác trong khung: phải xin phép người đó, không chỉ người gửi ảnh.

**Nội dung do GITA365 tạo:** kho nội dung, phác đồ, tài liệu trong `gita365-ops/` là tài sản của GITA365. Mod và đại sứ được dùng để vận hành, **không được** mang sang cộng đồng khác hay dùng cho mục đích riêng sau khi rời vai.

**Trích dẫn nguồn ngoài:** khi dẫn nghiên cứu, số liệu, hay câu nói của người khác — ghi rõ nguồn. Nội dung không gốc bị Facebook hạ hiển thị (`15`), và trích sai nguồn làm mất uy tín nhanh hơn mọi thứ khác.

---

## 29.6 · Ranh giới trách nhiệm — điều nhóm không làm

Cần ghi rõ trong bài ghim, vì nó bảo vệ cả thành viên lẫn người vận hành:

> **Nhóm này không thay thế:**
> · bác sĩ, chuyên gia tâm lý, chuyên gia trị liệu
> · luật sư
> · chuyên gia tài chính
> · giáo viên chuyên biệt của con anh/chị
>
> Ở đây mọi người chia sẻ **kinh nghiệm của nhà mình**, không phải lời khuyên chuyên môn.
> Việc gì liên quan tới sức khỏe, pháp luật, tiền bạc — anh/chị hỏi người có chuyên môn.

Mod trả lời các câu hỏi loại này bằng `23`/F6, **luôn luôn**, kể cả khi biết câu trả lời. Đây không phải né tránh — đó là ranh giới bảo vệ người hỏi.

---

## 29.7 · Danh mục kiểm tra quý

Chạy vào ngày đầu mỗi quý, mất khoảng 60 phút, ghi kết quả vào `SO_CA`.

- [ ] Mô tả nhóm và tên nhóm không chứa từ có thể gây hiểu nhầm (`15` phần đặt tên theo Nghị định 147)
- [ ] Bài ghim ranh giới trách nhiệm (29.6) còn đúng vị trí
- [ ] Bài ghim "Người của nhóm là ai" khớp danh sách quyền thực tế
- [ ] `NHAT_KY_GO` không có dòng nào quá hạn
- [ ] Không có chương trình trao thưởng nào đang chạy mà thiếu tuyên bố miễn trừ Meta
- [ ] Không có giải thưởng bằng tiền mặt hoặc có yếu tố may rủi
- [ ] Số hotline ở `24.18` còn hoạt động (gọi thử)
- [ ] Kiểm toán quyền: mọi tài khoản admin/mod đều có trong `SO_CA`
- [ ] Không có ứng dụng bên thứ ba nào còn quyền truy cập nhóm
- [ ] Xác thực hai lớp còn bật trên mọi tài khoản có quyền
- [ ] Đã diễn tập một kịch bản khủng hoảng trong quý (`24.17`)
- [ ] Web app chưa thu dữ liệu, hoặc đã hoàn tất toàn bộ 29.4

---

## 29.8 · Hồ sơ cần lưu

| Hồ sơ | Lưu ở đâu | Giữ bao lâu |
|---|---|---|
| Yêu cầu gỡ nội dung + văn bản gốc | Thư mục pháp lý theo năm | 5 năm |
| Ảnh chụp nội dung vi phạm trước khi gỡ | Thư mục theo ngày | 2 năm |
| Đồng ý dùng câu chuyện/hình ảnh của thành viên | Thư mục đồng ý, theo tên | Đến khi người đó rút lại + 1 năm |
| Thể lệ + kết quả các chương trình trao thưởng | Thư mục chương trình | 3 năm |
| `SO_CA`, `SO_DEN`, `NHAT_KY_GO` | `data/so-van-hanh-gita365.xlsx` | Vô thời hạn |
| Quyết định bổ nhiệm/miễn nhiệm mod | `SO_CA` | Vô thời hạn |

**Nguyên tắc lưu:** lưu **bằng chứng về quyết định của mình**, không lưu **dữ liệu cá nhân của thành viên**. Hai thứ này khác nhau: cái đầu bảo vệ mình, cái sau tạo ra rủi ro cho mình.
