# 16 · NỀN TẢNG SỐ — ĐẶC TẢ CHỨC NĂNG


> 🔧 **BẢN TÁC NGHIỆP.** Đây là bản người vận hành dùng — khi khác với bản tóm tắt,
> **bản này là bản đúng**. Bản tóm tắt: [`08-nen-tang-so-va-ai.md`](08-nen-tang-so-va-ai.md) — Kiến trúc nền tảng số và nguyên tắc dùng AI.

> [`08-nen-tang-so-va-ai.md`](08-nen-tang-so-va-ai.md) nêu kiến trúc và ranh giới. Tài liệu này là
> **đặc tả đưa cho đội phát triển**: mỗi nhóm chức năng làm gì, ai dùng, dữ liệu vào ra, mức nhạy cảm,
> luồng nghiệp vụ theo bước, và thứ tự xây. Người đọc đích: kỹ sư phần mềm, quản lý sản phẩm,
> Giám đốc chương trình. Người ký nghiệm thu từng giai đoạn: Giám đốc điều hành.

**Vì sao tài liệu này tồn tại.** Nền tảng số là **điều kiện tiên quyết số 5** trong sáu điều kiện
Học viện phải có trước khi nhượng quyền (xem [`../nhuong-quyen-leader-boom/README.md`](../nhuong-quyen-leader-boom/README.md) §4).
Lý do thẳng: khi có 20 đơn vị ở 20 tỉnh, **không có nền tảng thì không kiểm soát được chất lượng từ xa**.
Học viện sẽ không biết đơn vị Nghệ An có bàn giao Bản đồ Nhận diện trong 7 ngày hay không, không biết
đơn vị Cần Thơ có chấm năng lực đủ bốn nguồn hay chấm bằng cảm nhận, và không biết học viên nào đã
14 ngày không ghi nhật ký. Kiểm định tại chỗ mỗi khoá một lần (chuẩn NQ-08) phát hiện được sai lệch
**sau khi nó đã xảy ra**; nền tảng phát hiện **trong lúc nó đang xảy ra**. Đó là toàn bộ giá trị.

---

## 1. Sáu bài toán nền tảng phải giải

Đây là danh sách đóng. Chức năng nào không phục vụ một trong sáu việc dưới đây thì **không đưa vào
phạm vi giai đoạn 1 và 2**.

| # | Bài toán | Hiện trạng khi làm bằng giấy và bảng tính | Nền tảng phải làm được gì | Đo bằng gì |
|---|---|---|---|---|
| **1** | **Lưu hồ sơ học viên tập trung** | Hồ sơ nằm rải ở sổ Coach, file Excel của từng đơn vị, ảnh trong điện thoại nhân sự. Coach nghỉ việc là mất hồ sơ | Một hồ sơ duy nhất cho mỗi mã học viên `LB____-____-______`, theo suốt từ tuyển sinh tới D365, chuyển Coach không mất dữ liệu | 100% học viên đang theo có hồ sơ trên nền tảng; **0 hồ sơ lưu ngoài hệ thống** (chuẩn D3) |
| **2** | **Thu nhật ký 6 dòng hằng ngày** | Nhật ký giấy `BM-05`, thu vào cuối tuần, ghi bù từ trí nhớ, không đếm được ngày trống | Nhập trong 3 phút trên điện thoại, **khoá chỉnh sửa ngày cũ**, đếm được chuỗi ngày trống theo thời gian thực | Tỷ lệ ngày có nhật ký / tổng số ngày, tính theo từng học viên và từng đơn vị |
| **3** | **Tính 7 KPI tự động** | Coach tính tay mỗi tuần, mỗi người tính một kiểu, không so sánh được giữa các chu kỳ | Tính tự động từ nhật ký và phiếu quan sát, **luôn kèm mức hỗ trợ H0–H4**, công thức giống nhau ở mọi đơn vị | Thời gian Coach dùng để tính KPI tuần: mục tiêu **về 0 phút** |
| **4** | **Chấm 18 năng lực theo rubric** | Chấm bằng cảm nhận, một nguồn, không có bằng chứng kèm | Màn hình chấm buộc chọn ô rubric 18×5, **buộc gắn tối thiểu 2 nguồn dữ liệu**, tự cảnh báo khi lệch ≥ 2 bậc giữa tự chấm và Coach chấm | % ô chấm có đủ bằng chứng gắn kèm; mục tiêu **100%** |
| **5** | **Cảnh báo Vàng / Cam / Đỏ** | Coach phát hiện học viên bỏ cuộc sau 3 tuần, khi đã muộn | Máy quét hằng đêm, sinh cảnh báo theo luật, **giao việc có hạn cho người cụ thể**, đếm thời gian tới khi đóng | Thời gian trung bình từ khi sinh cảnh báo tới khi có hành động; mục tiêu **Cam ≤ 24 giờ, Đỏ ≤ 4 giờ** |
| **6** | **Kiểm soát chất lượng đa đơn vị từ xa** | Học viện chỉ biết chất lượng đơn vị khi đi kiểm định | Bảng điều khiển theo đơn vị: tỷ lệ bàn giao đúng hạn, tỷ lệ hồ sơ đạt chuẩn, tỷ lệ cảnh báo quá hạn, **so sánh 20 đơn vị trên cùng một thước** | Đủ dữ liệu ký được 7 cổng kiểm soát của mọi đơn vị mà không cần có mặt |

> **Nguyên tắc phạm vi.** Sáu bài toán trên là *bài toán vận hành*, không phải bài toán chuyên môn.
> Nền tảng **không làm chuyên môn thay người** — nó làm cho công việc chuyên môn của người trở nên
> nhìn thấy được, đo được và nhắc được đúng hạn.

---

## 2. Bảy nhóm chức năng

Ký hiệu vai trò dùng thống nhất với ma trận quyền:
`ST` học viên · `PA` phụ huynh · `TE` giáo viên · `CO` Coach · `HC` Coach trưởng · `AD` Tư vấn ·
`CN` tham vấn tâm lý · `SP` chuyên gia · `CS` Cán bộ BVTE · `PD` admin sản phẩm · `SA` admin hệ thống ·
`SU` super admin · `ED` giám đốc điều hành.

Mức nhạy cảm dùng đúng thang tại [`../an-toan-va-phan-quyen/03-phan-loai-du-lieu.md`](../an-toan-va-phan-quyen/03-phan-loai-du-lieu.md):
**P0** công khai · **P1** nội bộ · **P2** bảo mật (dữ liệu cá nhân trẻ em) · **P3** nhạy cảm đặc biệt.

### 2.1 Nhóm A · Hồ sơ học viên

| Mục | Nội dung |
|---|---|
| **Chức năng làm gì** | Tạo và giữ một hồ sơ duy nhất theo mã `LB____-____-______`; ghép mọi dữ liệu khác vào mã này; giữ lịch sử chuyển Coach, chuyển tầng, chuyển gói; giữ trạng thái đồng ý theo từng mục đích |
| **Ai dùng** | `ST` (hồ sơ của mình) · `PA` (hồ sơ con) · `CO`/`AD` (ca được phân công) · `HC` (đội mình) · `TE` (lớp mình, chỉ phần N04 và N08) · `SU` (siêu dữ liệu, **không đọc nội dung chuyên môn**) |
| **Dữ liệu vào** | Hồ sơ tuyển sinh `BM-01` · khai báo y tế `BM-04` · phiếu đồng ý theo mục đích · phân công Coach · gói dịch vụ đang dùng |
| **Dữ liệu ra** | Trang hồ sơ 1 màn hình · dòng thời gian hành trình 365 ngày · thẻ tóm tắt cho màn hình Coach · tệp xuất toàn bộ dữ liệu khi gia đình yêu cầu (hạn 15 ngày) |
| **Mức nhạy cảm** | **P2** cho toàn bộ nhóm. **Riêng trường khai báo y tế, dị ứng, thuốc đang dùng: P3**, tách kho, mã hoá khoá riêng, `SU` không giữ khoá |

### 2.2 Nhóm B · Nhật ký và KPI

| Mục | Nội dung |
|---|---|
| **Chức năng làm gì** | Thu nhật ký 6 dòng của học viên và 2 dòng của phụ huynh mỗi tối; khoá sửa dữ liệu ngày cũ; tính 7 KPI theo công thức cố định; vẽ đường tiến bộ theo tuần; đếm chuỗi và `recovery time` |
| **Ai dùng** | `ST` ghi và xem của mình · `PA` ghi 2 dòng và xem KPI của con · `CO`/`AD` xem ca được phân công · `HC` xem đội · `ED` chỉ xem tổng hợp ẩn danh (`R:agg`) |
| **Dữ liệu vào** | 6 dòng học viên: giờ ngủ–giờ dậy · giờ bắt đầu nhiệm vụ chính · số lần bị nhắc · 3 thói quen ✓/✗ · một việc làm tốt · một việc sẽ thử khác. 2 dòng phụ huynh: số lần đã nhắc · một quan sát hành vi. Bổ sung: phiếu quan sát ngày `BM-07` từ ACT trong trại |
| **Dữ liệu ra** | 7 KPI kèm mức hỗ trợ H0–H4 · biểu đồ tuần · chuỗi ngày trống · **tín hiệu đầu vào cho máy cảnh báo** · khối 4 của `BM-09` điền sẵn |
| **Mức nhạy cảm** | **P2**. Dòng 5 và 6 (phản tư) chịu chế độ riêng tư của học viên từ 12 tuổi: phụ huynh **chỉ thấy xu hướng và KPI, không thấy nguyên văn**. Nội dung bị gắn cờ an toàn **tự động nâng lên P3** và thu hồi mọi quyền đang có |

**Bảy KPI và công thức bắt buộc cài đúng:**

| KPI | Công thức | Ngưỡng tốt | Nguồn |
|---|---|---|---|
| `start rate` | Số ngày bắt đầu nhiệm vụ chính đúng khung giờ đã hẹn / số ngày trong kỳ | **≥ 80%** | Dòng 2 |
| `completion rate` | Tổng số ✓ thói quen / (3 × số ngày trong kỳ) | **≥ 75%** | Dòng 4 |
| `reminder rate` | Trung bình số lần nhắc mỗi ngày. **Ghi hai con số song song** — học viên đếm và phụ huynh đếm, không lấy trung bình cộng | Giảm **≥ 50%** so với baseline | Dòng 3 học viên + dòng 1 phụ huynh |
| `consistency` | Chuỗi ngày liên tiếp dài nhất có đủ 3 thói quen ✓ | **≥ 14 ngày** | Dòng 4 |
| **`recovery time`** | Số ngày từ ngày đứt chuỗi tới ngày đầu tiên làm lại đủ. **KPI quan trọng nhất** | **≤ 3 ngày** | Dòng 4 |
| `autonomy index` | Số nhiệm vụ học viên tự khởi xướng / tổng nhiệm vụ trong kỳ | Tăng theo chu kỳ | `BM-07`, ghi nhận Coach |
| `sleep consistency` | Số ngày giờ ngủ lệch ≤ 30 phút so với ngày trước / số ngày trong kỳ | **≥ 80%** | Dòng 1 |

> **Ràng buộc kỹ thuật bắt buộc:** không hiển thị bất kỳ KPI nào mà không hiển thị **mức hỗ trợ H0–H4**
> ở cùng màn hình. `start rate` 90% ở mức H3 và ở mức H0 là hai tình huống khác hẳn nhau; hiển thị
> con số trần là hiển thị sai. Đây là yêu cầu giao diện, không phải khuyến nghị.

### 2.3 Nhóm C · Đánh giá năng lực

| Mục | Nội dung |
|---|---|
| **Chức năng làm gì** | Màn hình chấm 18 năng lực × 5 cấp theo rubric `11-rubric-hanh-vi-18x5.md`; buộc gắn bằng chứng; đối chiếu bốn nguồn; tự phát hiện mâu thuẫn; sinh hồ sơ năng lực và đường tiến bộ |
| **Ai dùng** | `ST` tự chấm `BM-02` · `PA` chấm `BM-03` · `CO`/`AD` chấm chính thức · `HC` duyệt và nghiệm thu cấp · `TE` chỉ chấm phần liên quan môn mình dạy · `SP` xem ca được chuyển |
| **Dữ liệu vào** | `BM-02` tự đánh giá · `BM-03` gia đình · dữ liệu hành vi (`BM-07`, `BM-11`, nhật ký) · bằng chứng kết quả (ảnh sản phẩm, bài làm, biên bản, xác nhận bên thứ ba) |
| **Dữ liệu ra** | Bảng chấm 18 ô kèm cấp L1–L5, mức hỗ trợ, và bốn thuộc tính (ổn định · khái quát · thích nghi · tự chủ) · danh sách ô có mâu thuẫn nguồn · phiếu nghiệm thu cấp `BM-12` · dữ liệu cho khối 5 và 7 của `BM-09` |
| **Mức nhạy cảm** | **P2** |

**Bốn ràng buộc phải cài cứng trong màn hình chấm — không phải nhắc nhở, mà là chặn lưu:**

| # | Ràng buộc | Hệ thống xử lý thế nào |
|---|---|---|
| 1 | Không kết luận từ một nguồn | Ô chấm chưa gắn **≥ 2 nguồn** thì nút Lưu bị vô hiệu hoá |
| 2 | Thiếu một trong bốn thuộc tính thì hạ về `L2` | Hệ thống **tự hạ cấp và ghi rõ thuộc tính còn thiếu**, Coach không ghi đè được, chỉ bổ sung bằng chứng |
| 3 | Khi các nguồn mâu thuẫn: ghi lại mâu thuẫn, **lấy mức thấp hơn** | Hệ thống mặc định lấy mức thấp hơn, gắn cờ "cần giải mã ở T2", đưa vào khối 7 `BM-09` |
| 4 | Học viên tự chấm lệch ≥ 2 bậc so với Coach | Gắn cờ "cần đối chiếu"; đây là **dữ liệu chuyên môn có giá trị**, không phải lỗi của học viên |

### 2.4 Nhóm D · Cảnh báo và can thiệp

| Mục | Nội dung |
|---|---|
| **Chức năng làm gì** | Quét dữ liệu hằng đêm theo bộ luật; sinh cảnh báo ba mức; **giao việc cho người cụ thể kèm hạn**; theo dõi tới khi đóng; leo thang khi quá hạn |
| **Ai dùng** | `CO` nhận và xử lý · `HC` giám sát đội và nhận leo thang · `AD` xem ca của mình · `CS` xem toàn tổ chức với cảnh báo an toàn · `ST`/`PA` **chỉ thấy cảnh báo liên quan trực tiếp tới mình, không thấy nhãn màu** |
| **Dữ liệu vào** | Chuỗi ngày trống nhật ký · xu hướng `reminder rate` · trạng thái nghiệm thu cấp · hạn bàn giao hồ sơ · số buổi Review gia đình vắng · **danh sách từ khoá an toàn** |
| **Dữ liệu ra** | Thẻ cảnh báo có: mức màu, học viên, lý do sinh, người được giao, hạn xử lý, trạng thái · hàng đợi việc của Coach · báo cáo cảnh báo quá hạn theo đơn vị |
| **Mức nhạy cảm** | **P2**. Cảnh báo sinh từ **từ khoá an toàn: P3** — chuyển thẳng `CN` và `CS`, thu hồi quyền đọc của `CO`, `PA`, `HC` với bản ghi gốc |

**Mười luật tự động — bản đặc tả để lập trình:**

| # | Điều kiện kích hoạt | Mức | Hành động hệ thống | Người nhận | Hạn xử lý |
|---|---|---|---|---|---|
| 1 | Nhật ký trống **3 ngày** liên tiếp, học viên đang ở T3 | **Vàng** | Thông báo trong ứng dụng | `CO` | 72 giờ |
| 2 | Nhật ký trống **7 ngày** | **Cam** | Sinh việc "gọi cho gia đình" | `CO` | **24 giờ** |
| 3 | Nhật ký trống **14 ngày** | **Đỏ** | Thông báo `HC`, tự đặt lịch họp 3 bên | `CO` + `HC` | **4 giờ** để phản hồi |
| 4 | `reminder rate` tăng 2 tuần liên tiếp | **Vàng** | Gợi ý rà lại quy mô thói quen | `CO` | 7 ngày |
| 5 | KPI đạt ngưỡng nghiệm thu cấp | — | Sinh phiếu `BM-12` ở trạng thái nháp | `CO` → `HC` duyệt | 7 ngày |
| 6 | Đến mốc D7 / D28 / D118 / D365 | — | Sinh khung báo cáo, nhắc hạn bàn giao | `CO` | Theo mốc |
| 7 | `BM-09` quá **7 ngày** chưa bàn giao | **Đỏ** | Cảnh báo vi phạm **chuẩn C1**, khoá nút đóng khoá | `AD` + `HC` + Giám đốc chương trình | **Ngay** |
| 8 | Tự chấm lệch ≥ 2 bậc so với Coach | — | Gắn cờ "cần đối chiếu" | `CO` | Buổi Review kế |
| 9 | Gia đình vắng 2 buổi Review liên tiếp | **Cam** | Gợi ý rà lại cam kết đồng hành | `CO` | 7 ngày |
| 10 | Xuất hiện từ khoá thuộc **danh sách an toàn** | **Đỏ** | Nâng bản ghi lên P3 · thu hồi quyền đang có · thông báo `CN` và `CS` | `CN` + `CS` | **Ngay** |

> **Luật 10 phải cài đúng một điều này:** hệ thống **chỉ báo cho người**, tuyệt đối **không tự nhắn
> bất cứ điều gì cho học viên**. Không tự động trả lời, không tự động hiện đường dây nóng, không tự
> động gửi tin an ủi. Một tin nhắn máy sinh trong tình huống an toàn có thể làm học viên ngừng ghi
> nhật ký — và mất luôn kênh duy nhất còn lại. Người liên hệ, máy chỉ gọi người.

### 2.5 Nhóm E · Quản trị khoá

| Mục | Nội dung |
|---|---|
| **Chức năng làm gì** | Quản lý một khoá trại từ D-90 tới D+30: danh sách học viên, phân công nhân sự, bảng kiểm 7 cổng kiểm soát, thu và duyệt hồ sơ, đóng khoá |
| **Ai dùng** | Giám đốc chương trình · Trainer trưởng (`HC`) · Quản trại · `AD` · `CO` · Kế toán (chỉ phần quyết toán) |
| **Dữ liệu vào** | Danh sách tuyển sinh · hồ sơ y tế đủ/thiếu · trạng thái tập huấn nhân sự · bảng kiểm từng cổng · phiếu quan sát ngày · biên bản Review |
| **Dữ liệu ra** | Bảng trạng thái 7 cổng C1–C7 với người ký và ngày ký · **danh sách học viên chưa bàn giao `BM-09`** · báo cáo khoá · danh sách thay đổi cho khoá sau |
| **Mức nhạy cảm** | **P1** cho cấu hình khoá và bảng cổng · **P2** cho mọi danh sách có tên học viên |

**Quy tắc chặn:** nút "Đóng khoá" bị vô hiệu hoá khi còn bất kỳ điều kiện nào chưa đạt:
danh sách chưa bàn giao `BM-09` **chưa về 0** · còn cổng chưa có chữ ký · còn sự cố tồn đọng chưa đóng.
Đây là cách chuẩn C1 và C4 được thực thi bằng phần mềm thay vì bằng lời nhắc.

### 2.6 Nhóm F · Cổng phụ huynh

| Mục | Nội dung |
|---|---|
| **Chức năng làm gì** | Một nơi duy nhất để gia đình: ghi 2 dòng nhật ký đồng hành, xem KPI và xu hướng của con, đọc báo cáo theo mốc, xem lịch Review, nhắn Coach, quản lý đồng ý và rút đồng ý |
| **Ai dùng** | `PA` là người dùng chính. `CO` xem nhật ký đồng hành để chuẩn bị Review. `ST` **đọc được nhật ký đồng hành của cha mẹ viết về mình** — đây là chủ ý thiết kế, quan hệ đồng hành phải hai chiều |
| **Dữ liệu vào** | 2 dòng nhật ký/ngày · `BM-03` đánh giá của gia đình · xác nhận thói quen · phản hồi sau Review · thao tác đồng ý và rút đồng ý |
| **Dữ liệu ra** | Bảng KPI của con kèm mức hỗ trợ · báo cáo D7/D28/D118/D365 · Bản đồ Nhận diện và Bản đồ Cơ chế (xuất được) · 3 việc làm trong tuần này · lịch và thông tin Coach |
| **Mức nhạy cảm** | **P2** |

**Ba ranh giới hiển thị phải cài cứng ở cổng phụ huynh:**

| Ranh giới | Cụ thể |
|---|---|
| **Không hiển thị nguyên văn phản tư** khi học viên từ 12 tuổi đã bật chế độ riêng tư | Chỉ hiển thị xu hướng và KPI. Điều này **được nói rõ với cả hai bên từ đầu, không giấu** |
| **Không hiển thị nội dung phân tích cảm xúc do AI tóm tắt** | Chỉ `CO` thấy. Lý do: bản tóm tắt máy về cảm xúc của con, đọc bởi cha mẹ, không có người giải thích, là rủi ro tổn thương lớn hơn giá trị thông tin |
| **Không xếp hạng, không nêu vị trí trong nhóm, không dùng điểm trung bình lớp** | Đơn vị tiến bộ duy nhất là **khoảng cách so với chính học viên đó ở lần chấm trước** |

### 2.7 Nhóm G · Quản trị đa đơn vị

| Mục | Nội dung |
|---|---|
| **Chức năng làm gì** | Tách dữ liệu theo đơn vị nhượng quyền; đo chất lượng từng đơn vị trên cùng một thước; phát hiện đơn vị lệch chuẩn trước khi đi kiểm định; quản lý phiên bản tài liệu chuyển giao |
| **Ai dùng** | `ED` giám đốc điều hành · Ban kiểm định Học viện · Giám đốc chương trình của từng đơn vị (chỉ thấy đơn vị mình) |
| **Dữ liệu vào** | Toàn bộ dữ liệu vận hành của các đơn vị, **đã tách theo mã đơn vị** |
| **Dữ liệu ra** | Bảng điều khiển chất lượng đa đơn vị · danh sách vi phạm chuẩn theo nhóm A/B/C/D · hồ sơ chuẩn bị kiểm định · báo cáo cho hợp đồng nhượng quyền |
| **Mức nhạy cảm** | **P1** khi ở dạng tổng hợp ẩn danh (ngưỡng k ≥ 10) · **P2** khi truy xuống tới học viên cụ thể |

**Chín chỉ số bảng điều khiển đa đơn vị** — đây là thứ Học viện nhìn hằng tuần:

| # | Chỉ số | Ngưỡng đạt | Chuẩn tương ứng |
|---|---|---|---|
| 1 | Tỷ lệ bàn giao `BM-09` đúng hạn 7 ngày | **100%** | C1 |
| 2 | Tỷ lệ học viên có Review ngày 7 tối thiểu 30 phút | **100%** | C2 |
| 3 | Tỷ lệ ô chấm năng lực có đủ ≥ 2 nguồn | **100%** | B5 |
| 4 | Tỷ lệ hồ sơ bị trả lại khi Trainer trưởng soát 20% | ≤ 10% | Kiểm soát chất lượng `BM-09` |
| 5 | Tỷ lệ ngày có nhật ký của học viên đang ở T3 | ≥ 80% | Bài toán 2 |
| 6 | Số cảnh báo Cam/Đỏ quá hạn xử lý | **0** | Nhóm D |
| 7 | Tỷ lệ dữ liệu học viên nhập vào nền tảng | **100%** | D3 |
| 8 | Số cổng kiểm soát thiếu chữ ký | **0** | C4 |
| 9 | Số học viên trên mỗi Coach | **≤ 12** | Phân công |

> **Bất biến tách dữ liệu:** một đơn vị nhượng quyền **không đọc được dữ liệu học viên của đơn vị khác**,
> kể cả ở dạng danh sách tên. Học viện đọc được toàn bộ để kiểm định. Khi chấm dứt hợp đồng, học viên
> đang dở lộ trình được bàn giao trước mọi việc khác (chuẩn NQ-10) — nền tảng phải có chức năng
> **chuyển ca hàng loạt sang đơn vị hoặc Coach khác, giữ nguyên toàn bộ lịch sử**.

---

## 3. Ba luồng nghiệp vụ chính

### 3.1 Luồng 1 · Học viên ghi nhật ký tối → tính KPI → sinh cảnh báo

| Bước | Ai / cái gì | Việc | Ràng buộc |
|---|---|---|---|
| 1 | Hệ thống | 20:30 gửi nhắc ghi nhật ký tới `ST` | Nội dung nhắc là mẫu cố định đã duyệt chuyên môn, **không do máy tự sinh câu chữ** |
| 2 | `ST` | Mở màn hình 6 dòng, điền trong 3 phút | Màn hình chỉ có 6 trường, **không thêm trường nào khác** |
| 3 | Hệ thống | Ghi bản ghi kèm dấu thời gian thực | **Không cho ghi bù quá 1 ngày.** Ngày cũ chỉ đánh dấu "không ghi được — lý do", không điền nội dung |
| 4 | `PA` | Ghi 2 dòng của mình, độc lập | **Không hiển thị phần của con trước khi phụ huynh ghi xong.** Hai bên đếm cùng một hiện tượng nhưng không được thống nhất trước |
| 5 | Hệ thống | 23:30 quét: tính lại 7 KPI cho học viên có dữ liệu mới | Ghi kèm mức hỗ trợ H0–H4 lấy từ ghi nhận gần nhất; **không có mức hỗ trợ thì KPI hiển thị dạng "chưa đủ điều kiện so sánh"** |
| 6 | Hệ thống | Quét chuỗi ngày trống và xu hướng, đối chiếu 10 luật | Chạy trên toàn bộ học viên đang hoạt động, mọi đơn vị |
| 7 | Hệ thống | Sinh cảnh báo nếu khớp luật: gán mức màu, người nhận, hạn | Một học viên có nhiều luật khớp thì **lấy mức cao nhất**, gộp thành một thẻ |
| 8 | Hệ thống | Quét dòng 5 và 6 theo **danh sách từ khoá an toàn** | Khớp thì **nâng bản ghi lên P3, thu hồi quyền đọc đang có, báo `CN` và `CS`, không báo `CO` và `PA`** |
| 9 | `CO` | 8:00 sáng mở hàng đợi việc, xử lý theo hạn | Đóng cảnh báo phải **ghi việc đã làm**, không đóng trống |
| 10 | Hệ thống | Đếm cảnh báo quá hạn, leo thang lên `HC` | Quá hạn Cam 24 giờ hoặc Đỏ 4 giờ thì tự leo thang, **không cần ai bấm** |

> **Điều luồng này cố ý không làm:** hệ thống **không tự nhắn cho học viên khi thấy chuỗi đứt**.
> Việc "vì sao con dừng" là câu hỏi của Coach trong một cuộc gọi, không phải của một thông báo đẩy.
> Máy đếm, người hỏi.

### 3.2 Luồng 2 · Coach chấm năng lực có đối chiếu bốn nguồn

| Bước | Ai / cái gì | Việc | Ràng buộc |
|---|---|---|---|
| 1 | Hệ thống | Mở kỳ chấm theo mốc (D7 / D28 / D118 / D365), gửi `BM-02` cho `ST` và `BM-03` cho `PA` | Hai bên chấm **trước** khi thấy kết quả của nhau |
| 2 | `ST` | Tự chấm 18 năng lực | Câu hỏi dùng bản theo tuổi (9–11 · 12–14 · 15–18) |
| 3 | `PA` | Chấm bản gia đình | Không thấy bản của con cho tới khi cả hai nộp |
| 4 | Hệ thống | Gom nguồn 3 (dữ liệu hành vi: `BM-07`, `BM-11`, nhật ký) và nguồn 4 (bằng chứng kết quả đã gắn) | Bằng chứng phải có **ngày và tình huống**, không nhận bằng chứng không có mốc thời gian |
| 5 | Hệ thống | Mở màn hình chấm cho `CO`: mỗi năng lực hiện **4 cột nguồn cạnh nhau** và ô rubric 18×5 | Coach thấy hết bốn nguồn cùng lúc — đây là điểm mấu chốt của thiết kế màn hình |
| 6 | `CO` | Chọn cấp L1–L5 cho từng năng lực, gắn tối thiểu 2 nguồn làm căn cứ | **Chưa gắn đủ 2 nguồn thì không lưu được ô đó** |
| 7 | `CO` | Đánh dấu bốn thuộc tính: ổn định · khái quát · thích nghi · tự chủ | Thiếu bất kỳ thuộc tính nào, hệ thống **tự hạ về `L2`** và ghi rõ thuộc tính còn thiếu |
| 8 | `CO` | Ghi mức hỗ trợ đang cần cho từng ô | Bốn nhãn: cần hướng dẫn từng bước · cần nhắc định kỳ · hỗ trợ khi có sự cố · tự chủ |
| 9 | Hệ thống | Đối chiếu tự chấm và Coach chấm | Lệch ≥ 2 bậc: gắn cờ "cần đối chiếu", đưa vào nội dung buổi Review kế tiếp |
| 10 | Hệ thống | Đối chiếu bốn nguồn với nhau | Mâu thuẫn: **lấy mức thấp hơn**, ghi lại mâu thuẫn nguyên trạng, đẩy vào khối 7 `BM-09` — vùng cần giải mã ở T2 |
| 11 | `HC` | Duyệt bảng chấm; nghiệm thu cấp nếu đủ điều kiện | Nghiệm thu cấp là **quyết định có chữ ký người**, hệ thống chỉ sinh phiếu `BM-12` ở trạng thái nháp |
| 12 | Hệ thống | Cập nhật hồ sơ năng lực, vẽ lại đường tiến bộ | So với **chính học viên đó** ở lần chấm trước, không so với ai khác |

### 3.3 Luồng 3 · Bàn giao Bản đồ Nhận diện tới gia đình trong 7 ngày

| Bước | Mốc | Ai | Việc trên nền tảng | Ràng buộc hệ thống |
|---|---|---|---|---|
| 1 | D7 tối | `HC` (ACT trưởng) | Chốt dữ liệu thô: 7 phiếu `BM-07`, nhật ký, `BM-02`, `BM-03` đã gom theo mã học viên | Sau khi chốt, **khoá sửa dữ liệu quan sát**; sửa sau phải có lý do và để lại dấu vết |
| 2 | D+0 | Hệ thống | Sinh **bản nháp `BM-09`** cho từng học viên: khối 4 KPI điền sẵn, khối 2 gợi ý các biểu hiện lặp ≥ 3 ngày | Máy chỉ điền **số và trích dẫn dữ liệu**, tuyệt đối không sinh câu nhận định |
| 3 | D+1 → D+3 | `AD` + `CO` | Viết khối 1, 3, 5, 6, 7; bổ sung khối 2 | Hệ thống **chặn lưu** khi: khối 2 có dòng chỉ 1 nguồn · khối 4 trống mức hỗ trợ · khối 5 có dưới 3 tín hiệu · khối 5 có tín hiệu không kèm bằng chứng ngày–tình huống |
| 4 | D+1 → D+3 | Hệ thống | Quét **danh sách từ cấm** trên toàn văn bản | Bắt các từ: lười · hư · kém · dốt · chậm · cá biệt · vô kỷ luật · tăng động · rối loạn · và mọi cụm "nguyên nhân là". Bắt được thì **cảnh báo tại chỗ, không tự sửa** |
| 5 | D+3 | `AD` | Hoàn tất bảng soát 6 điều cấm | **Còn ô trống thì không chuyển sang trạng thái Chờ duyệt** |
| 6 | D+3 | `HC` (Trainer trưởng) | Duyệt và ký điện tử | Hệ thống **chọn ngẫu nhiên 20% hồ sơ** đưa vào diện soát bắt buộc; trả lại kèm lý do theo 5 tiêu chí trả lại |
| 7 | D+3 | Giám đốc chương trình | Phân công Coach 90 ngày | Hệ thống **chặn phân công vượt 12 học viên/Coach** |
| 8 | D+5 → D+7 | `CO` | Đặt lịch Review 30 phút với từng gia đình; ghi biên bản trên nền tảng | Biên bản thiếu mục "3 việc gia đình làm trong tuần này" thì **không đóng được buổi Review** |
| 9 | D+7 | Hệ thống | Đẩy `BM-09` bản đã duyệt vào cổng phụ huynh, đánh dấu Đã bàn giao khi gia đình mở | "Đã gửi" **không phải** "đã bàn giao". Bàn giao = đã gửi **và** đã có biên bản Review |
| 10 | D+7 | `AD` + `CO` | Ký **cổng C6** — quyết định hướng chuyển tầng bằng văn bản | Bốn hướng: A vào T2 · B kéo dài baseline · C đổi ưu tiên Case · D chuyển chuyên môn |
| 11 | Quá D+7 | Hệ thống | Sinh cảnh báo **Đỏ** cho mọi hồ sơ chưa bàn giao — vi phạm **chuẩn C1** | Danh sách này hiển thị trên bảng điều khiển đa đơn vị của Học viện, **không tắt được** |

---

## 4. Phân quyền theo 13 vai trò

Nguồn chuẩn duy nhất là [`../an-toan-va-phan-quyen/02-ma-tran-quyen.md`](../an-toan-va-phan-quyen/02-ma-tran-quyen.md).
Bảng dưới đây **không thay thế ma trận** — nó dịch ma trận thành **màn hình** để đội phát triển dựng
điều hướng. Khi hai tài liệu khác nhau, ma trận là bản đúng.

| # | Mã | Vai trò | Màn hình thấy được | Màn hình không có |
|---|---|---|---|---|
| 1 | `ST` | Học viên | Nhiệm vụ hôm nay · Nhật ký 6 dòng · KPI của mình · Thói quen · Portfolio · Nhật ký đồng hành của cha mẹ viết về mình | Hồ sơ học viên khác · Bảng chấm của Coach trước khi công bố · Cảnh báo màu |
| 2 | `PA` | Phụ huynh | Cổng phụ huynh đầy đủ · KPI của con · Báo cáo theo mốc · `BM-09`, `BM-10` · Lịch Review · Quản lý đồng ý | **Nguyên văn phản tư khi con từ 12 tuổi bật riêng tư** · Phân tích cảm xúc của AI · Hồ sơ tham vấn · Hồ sơ học viên khác |
| 3 | `TE` | Giáo viên | Lớp mình dạy · Dữ liệu buổi học · Kết quả và năng lực **giới hạn ở nhóm N04 và N08** · Thư viện phác đồ N04, N08 | Toàn bộ hồ sơ học viên · Hồ sơ y tế · Hồ sơ tham vấn · Nhật ký phản tư |
| 4 | `CO` | Coach | Hàng đợi việc · Ca được phân công (≤ 12) · Nhật ký, KPI, chấm năng lực · Cảnh báo của ca mình · Biên bản Review · Trợ lý AI của Coach | Ca không được phân công · Hồ sơ tham vấn · Hồ sơ y tế · Báo cáo BVTE · Nhật ký kiểm toán |
| 5 | `HC` | Coach trưởng / Trainer trưởng | Toàn bộ ca của đội mình · Hàng đợi duyệt · Soát ngẫu nhiên 20% hồ sơ · Nghiệm thu cấp · Bảng cổng khoá | Ca ngoài đội · Hồ sơ tham vấn · Báo cáo BVTE |
| 6 | `AD` | Chuyên viên tư vấn | Ca được phân công · Dữ liệu bốn nguồn · Màn hình dựng `BM-09` và `BM-10` · Cổng C6 · Thư viện 220 phác đồ | Can thiệp hằng ngày · Sửa dữ liệu gốc quan sát · Hồ sơ tham vấn |
| 7 | `CN` | Chuyên viên tham vấn tâm lý | **Khu vực hồ sơ tham vấn riêng** · Phản tư đã gắn cờ an toàn · Ca được chuyển tới | Không có quyền trên dữ liệu vận hành thường ngày ngoài ca của mình |
| 8 | `SP` | Chuyên gia | Ca được chuyển tới, kèm hồ sơ bàn giao · Màn hình khuyến nghị chuyên sâu | Toàn bộ dữ liệu ngoài ca được chuyển |
| 9 | `CS` | Cán bộ bảo vệ trẻ em | **Khu vực báo cáo BVTE riêng** · Cảnh báo an toàn toàn tổ chức · Nhật ký kiểm toán · Phê duyệt an toàn hoạt động mới | Nội dung hồ sơ tham vấn tâm lý · Dữ liệu chuyên môn không liên quan an toàn |
| 10 | `PD` | Admin sản phẩm | Cấu hình gói và giá · Biểu mẫu trắng · Thư viện phác đồ (đọc) · Thống kê ẩn danh | **Toàn bộ dữ liệu học viên có định danh** |
| 11 | `SA` | Admin hệ thống | Cấu hình hạ tầng · Nhật ký kiểm toán (đọc, không sửa, không xoá) · Sao lưu | **Toàn bộ nội dung chuyên môn.** Trường nội dung mã hoá tầng ứng dụng, `SA` không giữ khoá |
| 12 | `SU` | Super admin | Tài khoản · Siêu dữ liệu hồ sơ (trạng thái, khoá tài khoản) · Đề xuất gán vai trò | **Toàn bộ Nhóm D dữ liệu P3 — đây là chủ ý thiết kế, không phải thiếu sót.** Không đọc nội dung chuyên môn |
| 13 | `ED` | Giám đốc điều hành | Bảng điều khiển đa đơn vị · Thống kê tổng hợp ẩn danh · Phê duyệt gán vai trò (bốn mắt) · Nhật ký kiểm toán | Đọc thường ngày nội dung hồ sơ từng học viên. Truy cập P3 chỉ qua **break-glass có phê duyệt và có thông báo** |

**Ba quy tắc kỹ thuật của tầng phân quyền:**

| # | Quy tắc | Cài đặt |
|---|---|---|
| 1 | **Mặc định từ chối** | Ô trống trong ma trận nghĩa là không có quyền. Không có quyền suy diễn từ vai trò cấp trên |
| 2 | **Quyền = vai trò × phạm vi × trạng thái đồng ý × legal hold** | Trạng thái đồng ý là **điều kiện kiểm tra trong hàm `can()`**, không phải ghi chú trong hồ sơ. Rút đồng ý phải làm đổi kết quả `can()` **ngay lập tức** |
| 3 | **Ghi nhật ký mọi lần đọc dữ liệu P2 và P3** | Nhật ký chỉ ghi thêm, không sửa, không xoá, lưu tách kho, giữ 5 năm. Truy cập P3 còn **gửi thông báo cho chủ sở hữu dữ liệu hoặc người giám hộ** |

---

## 5. Bảo vệ dữ liệu trẻ em

Căn cứ tham chiếu: **Nghị định 13/2023/NĐ-CP** về bảo vệ dữ liệu cá nhân; **Luật Trẻ em 2016** và
**Nghị định 56/2017/NĐ-CP** về quyền bí mật đời sống riêng tư của trẻ em. Bộ phận pháp chế rà hiệu lực
tại thời điểm áp dụng.

| Nghĩa vụ | Nền tảng phải cài gì | Kiểm chứng bằng gì |
|---|---|---|
| **Đồng ý của cha mẹ hoặc người giám hộ** | Biểu mẫu `BM-04` số hoá với **ô đồng ý riêng cho từng mục đích**, không có ô "đồng ý tất cả". Sáu mục đích tách riêng: nhóm phụ huynh kín · trang chính thức · tài liệu truyền thông · tài liệu đào tạo nội bộ · ghi hình phục vụ đánh giá năng lực · dùng hồ sơ ẩn danh làm ví dụ chuyên môn | Mọi thao tác đọc hoặc xuất dữ liệu có kiểm tra ô đồng ý tương ứng |
| **Ý kiến của chính học viên từ 12 tuổi** | Hai lựa chọn riêng: (a) chế độ riêng tư cho nhật ký phản tư, (b) dùng hình ảnh cá nhân. **Khi hai bên khác ý, hệ thống lấy phương án bảo vệ quyền riêng tư cao hơn** | Kiểm thử: đặt phụ huynh đồng ý và học viên từ chối, kết quả `can()` phải là từ chối |
| **Mục đích rõ ràng, thu thập tối thiểu** | Mỗi trường dữ liệu trong lược đồ phải khai báo được nó phục vụ nhóm `N01`–`N11` nào hoặc năng lực `NL-01`–`NL-18` nào. **Trường không khai báo được thì xoá khỏi biểu mẫu** | Rà lược đồ mỗi quý |
| **Thời hạn lưu** | Cài đúng bảng thời hạn (§5 của TL 03 bộ An toàn): y tế 3 năm · hồ sơ năng lực và `BM-09` suốt hành trình + 3 năm · phiếu quan sát ACT 2 năm · nhật ký và phản tư suốt hành trình + 1 năm · báo cáo BVTE tối thiểu 5 năm · nhật ký kiểm toán 5 năm | **Tác vụ tự động rà hằng tháng**, sinh danh sách bản ghi tới hạn |
| **Quyền rút đồng ý** | Nút rút đồng ý ngay trong cổng phụ huynh, theo từng mục đích. Rút đồng ý hình ảnh: **gỡ nội dung trong 7 ngày**. Sửa dữ liệu sai: 7 ngày. Xuất toàn bộ dữ liệu: 15 ngày, định dạng đọc được | Đếm thời gian thực hiện từng yêu cầu, hiển thị trên bảng điều khiển tuân thủ |
| **Nhật ký truy cập** | Ghi mọi lần đọc P2 và P3: ai, lúc nào, bản ghi nào, từ thiết bị nào. Append-only, kho riêng | Gia đình có quyền yêu cầu xem nhật ký truy cập hồ sơ của con |
| **Xoá khi hết mục đích** | Hết hạn thì **xoá hoặc ẩn danh hoá, không giữ "để dành"**. Ẩn danh theo đúng §6 TL 03: bỏ định danh trực tiếp · khái quát hoá định danh gián tiếp · **ngưỡng k ≥ 10** · loại chi tiết đặc thù · duyệt hai người | Tác vụ rà hằng tháng + báo cáo quý |
| **Lưu giữ pháp lý** | Khi hồ sơ liên quan sự việc đang xử lý, **khoá khỏi mọi thao tác xoá và xuất** cho tới khi gỡ lệnh giữ | Là bước kiểm tra trong hàm phân quyền, không phải quy trình thủ công |
| **Sự cố dữ liệu** | Quy trình phát hiện, đánh giá phạm vi, thông báo gia đình bị ảnh hưởng, khắc phục | Diễn tập tối thiểu 1 lần/năm |

### 5.1 Dữ liệu KHÔNG bao giờ rời nền tảng

Đây là danh sách cấm tuyệt đối. Không có ngoại lệ theo yêu cầu nghiệp vụ, không có ngoại lệ để tiện việc.

| Loại dữ liệu | Cấm điều gì | Vì sao |
|---|---|---|
| **Hồ sơ tham vấn tâm lý** (P3) | Không xuất, không sao chép sang bất kỳ hệ thống nào, không đưa vào báo cáo, không đưa vào sao lưu chung — **sao lưu riêng, khoá riêng** | Vượt phạm vi giáo dục; danh sách trắng rất hẹp |
| **Báo cáo lo ngại bảo vệ trẻ em** (P3) | Lưu **tách kho hoàn toàn**. Không xuất ngoài quy trình pháp lý | Rò rỉ gây hại nghiêm trọng, không đảo ngược |
| **Khai báo y tế, dị ứng, thuốc, tiền sử bệnh** (P3) | Không đưa vào `BM-09`, không đưa vào báo cáo gửi gia đình về năng lực, không dùng để giải thích kết quả học tập | Nhầm lẫn dữ liệu y tế với dữ liệu giáo dục là gốc của việc dán nhãn |
| **Nội dung phản tư đã gắn cờ an toàn** (P3) | Tự động nâng mức, thu hồi mọi quyền đang có, chỉ `CN` và `CS` đọc được | Quy tắc nâng mức tự động, §2 TL 03 |
| **Bất kỳ dữ liệu học viên nào** | **Không dùng để huấn luyện mô hình AI bên ngoài.** Không gửi sang dịch vụ bên thứ ba không nằm trong hợp đồng xử lý dữ liệu đã ký | Bảo vệ dữ liệu trẻ em; nghĩa vụ với bên xử lý dữ liệu theo NĐ 13/2023 |
| **Ảnh và video học viên** | Chỉ dùng trong phạm vi và thời hạn đã đồng ý. Rút đồng ý là gỡ trong 7 ngày, kể cả bản đã in | Chuẩn C5 |
| **Danh sách tên học viên** | Không xuất hàng loạt. Xuất một hồ sơ cho gia đình là quyền; xuất 200 hồ sơ là **sự cố dữ liệu** | Yêu cầu kỹ thuật P2: không xuất hàng loạt |

---

## 6. Nguyên tắc dùng AI trong nền tảng

Bốn nguyên tắc nền, đặt trước mọi tính năng cụ thể:

> **Một.** AI chạy **dưới danh tính và quyền của người đang truy vấn**. AI **không có tài khoản riêng,
> không có quyền riêng, không có phạm vi riêng**. Coach hỏi trợ lý về một học viên ngoài danh sách được
> phân công thì trợ lý trả về đúng thứ Coach đó được thấy: không có gì.
>
> **Hai.** AI **không được kết luận chẩn đoán** — không y khoa, không tâm lý, không "kiểu người".
>
> **Ba.** AI **không thay Coach ra quyết định cổng cấp**. Nghiệm thu cấp, chuyển tầng, chuyển chuyên môn
> là quyết định có chữ ký người.
>
> **Bốn.** **Mọi gợi ý của AI phải có người chịu trách nhiệm ký** trước khi trở thành hành động hoặc
> trước khi tới tay gia đình. Không có gợi ý nào tự động trở thành quyết định vì "không ai phản đối".

### 6.1 Cài đặt kỹ thuật của nguyên tắc thứ nhất

Đây là phần hay bị làm sai nhất, nên viết rõ ràng cho đội phát triển:

| Yêu cầu | Cài đặt đúng | Cài đặt sai thường gặp |
|---|---|---|
| Phạm vi truy vấn | Mọi truy vấn của AI đi qua **cùng một hàm `can()`** mà giao diện người dùng đi qua | Cho AI một tài khoản dịch vụ đọc được toàn bộ cơ sở dữ liệu rồi "lọc kết quả sau" |
| Dữ liệu P3 | AI **không truy cập được** hồ sơ tham vấn, báo cáo BVTE, hồ sơ y tế — kể cả khi người truy vấn có quyền | Coi P3 như P2 vì "người này dù sao cũng đọc được" |
| Nhật ký | Mọi truy vấn AI ghi vào nhật ký kiểm toán **dưới tên người truy vấn**, kèm dấu hiệu là truy vấn AI | Không ghi, hoặc ghi dưới tên hệ thống |
| Chế độ riêng tư | Phản tư đã bật riêng tư: AI **được đọc để phát hiện tín hiệu an toàn**, nhưng **không được đưa nguyên văn hoặc bản tóm tắt vào bất kỳ đầu ra nào cho phụ huynh** | Tóm tắt cảm xúc rồi hiển thị ở cổng phụ huynh |

### 6.2 Bốn việc AI làm được tốt

| # | Việc | Vì sao AI phù hợp | Ai ký chịu trách nhiệm |
|---|---|---|---|
| **1** | **Tổng hợp dữ liệu tuần và chuẩn bị khung buổi Review** | Việc đọc 7 ngày nhật ký, 7 phiếu quan sát và 4 nguồn chấm để rút ra "tuần này có gì đổi" là việc tốn 40 phút của Coach và không đòi hỏi phán đoán chuyên môn | `CO` |
| **2** | **Chỉ ra chỗ mâu thuẫn giữa bốn nguồn** | AI giỏi ở việc *phát hiện chỗ không khớp* và kém ở việc *giải thích vì sao không khớp*. Dùng đúng nửa đầu là dùng đúng | `AD` |
| **3** | **So baseline với mục tiêu và nêu vùng chênh lớn** | Phép so số học có quy tắc rõ, khối lượng lớn, lặp lại ở mọi học viên | `AD` |
| **4** | **Sinh bản nháp báo cáo theo mốc và bản nháp khối 4 của `BM-09`** | Điền số và trích dẫn dữ liệu có nguồn — không phải viết nhận định | **`CO` viết lại và `HC` duyệt trước khi gửi.** Không bao giờ gửi bản nháp máy sinh |

**Ba ràng buộc chung cho cả bốn việc:** mọi đầu ra AI phải **dẫn được nguồn dữ liệu cụ thể** (ngày,
biểu mẫu, dòng) · phải hiển thị kèm nhãn "bản nháp do máy sinh, chưa có người duyệt" cho tới khi được ký ·
và phải ghi lại **người đã chấp nhận hay bác bỏ**.

### 6.3 Bốn việc AI không được làm

| # | Ranh giới | Vì sao | Hệ thống chặn thế nào |
|---|---|---|---|
| **1** | **Không kết luận nguyên nhân của một ca, không kết luận chẩn đoán y khoa hay tâm lý** | Nguyên nhân thuộc Tầng 2, cần bằng chứng ủng hộ **và** bằng chứng phản bác — đó là việc của con người. Chẩn đoán vượt phạm vi chương trình | Lọc đầu ra: chặn mọi cụm "nguyên nhân là", "học viên bị", và mọi từ trong danh mục chẩn đoán |
| **2** | **Không tạo nhãn về học viên** — "kiểu người", "tính cách", "nhóm hành vi" | Vi phạm nguyên tắc không dán nhãn, và nhãn máy sinh lan rất nhanh vì nghe gọn gàng | Danh sách từ cấm áp dụng cho cả đầu ra AI, giống như với văn bản người viết |
| **3** | **Không quyết định cổng cấp, cổng chuyển tầng, cổng chuyển chuyên môn** | Đây là quyết định có hậu quả với một đứa trẻ và phải có người chịu trách nhiệm bằng chữ ký | Màn hình nghiệm thu **không có nút "áp dụng đề xuất AI"**; AI chỉ hiện ở cột tham khảo |
| **4** | **Không gửi bất kỳ nội dung nào tới học viên hoặc phụ huynh khi chưa có người duyệt**, trong các tình huống: đánh giá năng lực · phản hồi về vấn đề · nội dung liên quan cảm xúc, an toàn, sức khoẻ | Rủi ro tổn thương và rủi ro sai chuyên môn. Đặc biệt: tình huống an toàn thì **máy chỉ báo cho người, không nhắn cho trẻ** | Kênh gửi ra ngoài đi qua hàng đợi duyệt bắt buộc; không có đường tắt kỹ thuật |

### 6.4 Kiểm soát sai lệch

| Cơ chế | Nội dung | Chu kỳ |
|---|---|---|
| **Nhật ký đề xuất** | Mọi đề xuất AI ghi lại kèm việc người đã chấp nhận hay bác bỏ và lý do | Liên tục |
| **Rà soát mẫu** | Chuyên môn rà **30 đề xuất ngẫu nhiên** để đo tỷ lệ chính xác | Mỗi quý |
| **Ngưỡng dừng** | Tỷ lệ bị bác bỏ vượt **40%** ở một chức năng thì **tắt chức năng đó** và hiệu chỉnh lại | Tự động kích hoạt |
| **Rà thiên lệch** | Kiểm tra đầu ra có khác nhau theo giới tính, vùng miền, gói dịch vụ hay không | Mỗi 6 tháng |

---

## 7. Lộ trình xây dựng — ba giai đoạn

> **Sai lầm phải tránh:** làm trợ lý AI trước khi có dữ liệu sạch. AI vận hành trên dữ liệu thưa và
> không nhất quán sẽ tạo ra đề xuất **nghe rất hợp lý nhưng sai** — nguy hiểm hơn là không có AI.

### 7.1 Giai đoạn 1 · Tối thiểu chạy được

| Mục | Nội dung |
|---|---|
| **Mục tiêu** | Một khoá trại chạy trọn vẹn trên nền tảng, không cần bảng tính song song |
| **Phạm vi** | Hồ sơ học viên (nhóm A) · Nhật ký 6 dòng và 2 dòng (nhóm B, phần thu) · Tính 7 KPI (nhóm B, phần tính) · Màn hình chấm 18 năng lực có ràng buộc bốn nguồn (nhóm C) · Sinh bản nháp `BM-09` và bảng theo dõi bàn giao (nhóm E, phần tối thiểu) |
| **Không làm ở giai đoạn này** | Cảnh báo tự động · Cổng phụ huynh đầy đủ · Trợ lý AI · Bảng điều khiển đa đơn vị |
| **Vì sao thứ tự này** | Ba việc thu dữ liệu — nhật ký, phiếu quan sát, KPI tuần — là **80% giá trị** của cả nền tảng. Mọi thứ phía sau đều là hàm của dữ liệu này. Xây cảnh báo trên dữ liệu chưa có là xây trên không |
| **Tiêu chí nghiệm thu** | Một khoá đầy đủ: ≥ 90% ngày có nhật ký · 100% học viên có `BM-09` sinh từ nền tảng · Coach không dùng bảng tính riêng cho bất kỳ việc gì · thời gian tính KPI tuần = 0 phút |

### 7.2 Giai đoạn 2 · Đủ dùng

| Mục | Nội dung |
|---|---|
| **Mục tiêu** | Một Coach theo được 12 học viên mà không bỏ sót ai; gia đình có một nơi duy nhất để làm mọi việc |
| **Phạm vi** | Toàn bộ nhóm D cảnh báo và can thiệp (10 luật) · Toàn bộ nhóm F cổng phụ huynh · Nhóm E quản trị khoá đầy đủ với 7 cổng và chữ ký điện tử · Sinh báo cáo theo mốc D7/D28/D118/D365 · Quản lý đồng ý và rút đồng ý theo mục đích |
| **Không làm ở giai đoạn này** | Trợ lý AI ngoài phần điền số tự động · Bảng điều khiển đa đơn vị |
| **Vì sao thứ tự này** | Cảnh báo chỉ có nghĩa khi dữ liệu đã đủ dày để luật không báo động giả liên tục. Cổng phụ huynh chỉ có nghĩa khi đã có KPI và báo cáo để hiển thị. Xây hai thứ này trước giai đoạn 1 sẽ tạo ra một cổng đẹp nhưng trống |
| **Tiêu chí nghiệm thu** | 0 cảnh báo Cam/Đỏ quá hạn trong 2 chu kỳ 90 ngày liên tiếp · ≥ 70% gia đình dùng cổng phụ huynh hằng tuần · 7 cổng của một khoá đủ chữ ký điện tử, không có bản giấy song song |

### 7.3 Giai đoạn 3 · Đủ nhượng quyền

| Mục | Nội dung |
|---|---|
| **Mục tiêu** | Học viện kiểm soát được chất lượng của 20 đơn vị ở 20 tỉnh **mà không cần có mặt** |
| **Phạm vi** | Nhóm G quản trị đa đơn vị: tách dữ liệu theo đơn vị · bảng điều khiển 9 chỉ số · hồ sơ chuẩn bị kiểm định · chuyển ca hàng loạt khi chấm dứt hợp đồng · Trợ lý AI theo §6 với đủ bốn tầng phê duyệt · Nhật ký kiểm toán đầy đủ và cơ chế break-glass |
| **Vì sao thứ tự này** | Không thể so sánh 20 đơn vị trên cùng một thước khi thước chưa ổn định. Ba tiêu chí phải đạt trước khi mở giai đoạn này: công thức KPI **không đổi trong 2 chu kỳ liên tiếp** · tỷ lệ hồ sơ bị trả lại **≤ 10%** · dữ liệu nhật ký đủ dày để luật cảnh báo có tỷ lệ báo động giả **dưới 10%**. Trợ lý AI đặt ở cuối cùng vì lý do đã nêu ở đầu mục 7 |
| **Tiêu chí nghiệm thu** | Ban kiểm định ký được cổng C1–C7 của một đơn vị **chỉ bằng dữ liệu trên nền tảng** · phát hiện được đơn vị lệch chuẩn **trước** kỳ kiểm định tại chỗ · tỷ lệ đề xuất AI bị bác bỏ dưới 40% ở mọi chức năng đang bật |

---

## 8. Tám điều nền tảng KHÔNG làm

Nêu thẳng để tránh kỳ vọng sai — với đội phát triển, với ban lãnh đạo và với đối tác nhượng quyền.

| # | Nền tảng không làm | Vì sao | Ai làm việc đó |
|---|---|---|---|
| **1** | **Không chẩn đoán, không kết luận nguyên nhân** | Nguyên nhân là giả thuyết cần kiểm chứng qua 21 ngày của Tầng 2, không phải kết quả của một phép tính | `AD` + `CO` ở Tầng 2; chuyên gia khi vượt phạm vi |
| **2** | **Không xếp hạng học viên, không cho điểm tổng, không so sánh giữa các học viên** | Đơn vị tiến bộ duy nhất là khoảng cách so với chính học viên đó ở lần chấm trước | — |
| **3** | **Không thay thế buổi Review với gia đình** | Bản đồ Nhận diện gửi qua ứng dụng mà không có người ngồi giải thích là văn bản, không phải bàn giao. "Đã gửi" không phải "đã bàn giao" | `CO`, 30 phút, trực tiếp hoặc gọi video |
| **4** | **Không tự nhắn cho học viên trong tình huống liên quan an toàn** | Một tin nhắn máy sinh có thể làm học viên đóng kênh liên lạc cuối cùng | `CN` và `CS`, bằng con người |
| **5** | **Không thay quyết định của Coach ở các cổng nghiệm thu và chuyển tầng** | Quyết định có hậu quả với một đứa trẻ phải có người ký tên chịu trách nhiệm | `CO` + `AD` + `HC` theo bốn tầng phê duyệt |
| **6** | **Không hứa kết quả, không hiển thị dự báo kiểu "sau 30 ngày con sẽ đạt L4"** | Vi phạm nguyên tắc không hứa vượt bốn cam kết chuẩn 7/21/90/365 ngày (chuẩn C3, NQ-09) | — |
| **7** | **Không thay thế đào tạo Trainer** | Nền tảng làm cho công việc nhìn thấy được; nó không dạy được người ta chấm rubric đúng. Một Coach chưa được đào tạo sẽ chấm sai nhanh hơn và đồng loạt hơn khi có phần mềm | Bộ đào tạo đội ngũ — điều kiện tiên quyết số 4 |
| **8** | **Không lưu, không xử lý dữ liệu ngoài mục đích đã khai báo** | Thu thập tối thiểu và đúng mục đích là nghĩa vụ pháp lý, không phải lựa chọn sản phẩm | Rà lược đồ mỗi quý, bộ phận pháp chế |

> **Câu để nói với đối tác nhượng quyền:** nền tảng không làm cho chất lượng chuyên môn tốt lên.
> Nó làm cho **chất lượng kém không giấu được nữa**. Đó là lý do nó là điều kiện tiên quyết —
> và cũng là lý do nó chỉ có giá trị khi đi cùng điều kiện số 4, đội ngũ đào tạo Trainer.

---

## Liên kết

- Bản tóm tắt của tài liệu này: [`08-nen-tang-so-va-ai.md`](08-nen-tang-so-va-ai.md)
- Phân loại dữ liệu P0–P3, đồng ý, thời hạn lưu: [`../an-toan-va-phan-quyen/03-phan-loai-du-lieu.md`](../an-toan-va-phan-quyen/03-phan-loai-du-lieu.md)
- Ma trận quyền 13 vai trò: [`../an-toan-va-phan-quyen/02-ma-tran-quyen.md`](../an-toan-va-phan-quyen/02-ma-tran-quyen.md)
- Mô hình phân quyền và các bất biến: [`../an-toan-va-phan-quyen/01-mo-hinh-phan-quyen.md`](../an-toan-va-phan-quyen/01-mo-hinh-phan-quyen.md)
- Kiểm soát an ninh: [`../an-toan-va-phan-quyen/04-kiem-soat-an-ninh.md`](../an-toan-va-phan-quyen/04-kiem-soat-an-ninh.md)
- Triển khai kỹ thuật: [`../an-toan-va-phan-quyen/05-trien-khai-ky-thuat.md`](../an-toan-va-phan-quyen/05-trien-khai-ky-thuat.md)
- Rubric hành vi 18×5 — thước chấm năng lực: [`11-rubric-hanh-vi-18x5.md`](11-rubric-hanh-vi-18x5.md)
- 20 biểu mẫu đầy đủ, gồm `BM-05` và `BM-09`: [`12-bieu-mau-day-du.md`](12-bieu-mau-day-du.md)
- Quản trị chất lượng và bộ KPI toàn hệ: [`10-quan-tri-chat-luong.md`](10-quan-tri-chat-luong.md)
- Hồ sơ sau trại — quy trình chi tiết: [`../he-thong-huan-luyen-gita/22-ho-so-sau-trai-chi-tiet.md`](../he-thong-huan-luyen-gita/22-ho-so-sau-trai-chi-tiet.md)
- Sáu điều kiện tiên quyết nhượng quyền: [`../nhuong-quyen-leader-boom/README.md`](../nhuong-quyen-leader-boom/README.md)
- 24 chuẩn vận hành nhượng quyền: [`../nhuong-quyen-leader-boom/05-chuan-van-hanh.md`](../nhuong-quyen-leader-boom/05-chuan-van-hanh.md)
