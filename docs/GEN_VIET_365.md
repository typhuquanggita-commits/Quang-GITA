# GEN VIỆT 365 · HỆ THỐNG HUẤN LUYỆN NHÂN TÀI

**Bản thiết kế kiến trúc · Tầm nhìn 30 năm 2026 – 2056**
Học viện GITA · Sứ mệnh: *Nâng tầm trí tuệ vàng Việt Nam*

> Đích cuối: một mạng lưới nhân tài Việt **tự tái tạo** — người được rèn quay lại rèn
> người tiếp theo, và hệ thống sống lâu hơn người dựng ra nó.

**Tập 1 — kiến trúc.** Bộ tài liệu gồm mười sáu tập, kèm một bảng kê tác phẩm sinh tự động:
- Tập 2 — [`GEN_VIET_365_VAN_HANH.md`](GEN_VIET_365_VAN_HANH.md): giáo trình, lịch năm,
  sổ tay từng vai, cổng nghiệm thu, biểu mẫu, mô hình dữ liệu, an toàn.
- Tập 3 — [`GEN_VIET_365_CHUYEN_MON.md`](GEN_VIET_365_CHUYEN_MON.md): ma trận 8 × 8,
  quy trình 10 bước, 11 nhóm giải pháp, 100 chiến lược, tư vấn, ngôn ngữ, nghề Coach.

- Tập 4 — [`GEN_VIET_365_PHAN_QUYEN.md`](GEN_VIET_365_PHAN_QUYEN.md): 17 vai, 14 tầng
  hiển thị, hai trục phân quyền, và ba lớp phòng thủ.
- Tập 5 — [`GEN_VIET_365_THU_VIEN.md`](GEN_VIET_365_THU_VIEN.md): thư viện Gen Việt —
  6 quyển, 45 chân dung, 12 mô thức tư duy Việt.
- Tập 6 — [`GEN_VIET_365_TRAI_NGHIEM.md`](GEN_VIET_365_TRAI_NGHIEM.md): trải nghiệm của
  gia đình, cam kết dịch vụ có mức đền, gói và bảo đảm, đo tác động, bảo vệ trẻ em.
- Tập 7 — [`GEN_VIET_365_THUONG_HIEU.md`](GEN_VIET_365_THUONG_HIEU.md): bộ nhận diện
  thương hiệu, bản quyền, ánh xạ chuẩn quốc gia và lộ trình toàn cầu.
- Tập 8 — [`GEN_VIET_365_CAM_TAY.md`](GEN_VIET_365_CAM_TAY.md): phần cầm lên dùng được
- Tập 9 — [`GEN_VIET_365_NHUONG_QUYEN.md`](GEN_VIET_365_NHUONG_QUYEN.md): bộ hồ sơ nhượng quyền
- Tập 10 — [`GEN_VIET_365_TIM_THAY.md`](GEN_VIET_365_TIM_THAY.md): tìm thấy được và đáng tin
- Tập 11 — [`GEN_VIET_365_CHUYEN_DE.md`](GEN_VIET_365_CHUYEN_DE.md): chuyên đề và giáo án — 850 chuyên đề
- Tập 12 — [`GEN_VIET_365_CAP_DO.md`](GEN_VIET_365_CAP_DO.md): hệ mười cấp độ và 52 tuần
- Tập 13 — [`GEN_VIET_365_VAN_HANH_CHI_TIET.md`](GEN_VIET_365_VAN_HANH_CHI_TIET.md): cẩm nang vận hành chi tiết
- Tập 14 — [`GEN_VIET_365_MASTER_TRAI.md`](GEN_VIET_365_MASTER_TRAI.md): sách Master, trại và học viện VIP
- Tập 15 — [`GEN_VIET_365_DE_AN.md`](GEN_VIET_365_DE_AN.md): đề án thành lập và bộ trình bày
- Tập 16 — [`GEN_VIET_365_THAM_CHIEU.md`](GEN_VIET_365_THAM_CHIEU.md): tham chiếu mô hình chi hội
- Phụ lục — [`GEN_VIET_365_BANG_KE_TAC_PHAM.md`](GEN_VIET_365_BANG_KE_TAC_PHAM.md): bảng kê tác phẩm cho hồ sơ quyền tác giả (sinh tự động)
  ngay, và bộ tra cứu. **Nếu chỉ đọc được một tập thì đọc tập này.**

Bản trực quan đầy đủ (49 nhóm · 300 màn): mở `genviet365/index.html`.
Gộp thành một tệp để gửi đi: `node genviet365/dong-goi-artifact.cjs`.

---

## 0. Vì sao cần hệ thứ hai

Học viện đã có GITA 365 — một hệ giải pháp năm tầng, chạy được trên gia đình thật, có
ma trận 8 × 8, có 11 nhóm giải pháp, có chuẩn nghiệm thu 100 điểm. Hệ ấy rất chặt ở
việc **xử lý ca**: nhận diện → giải mã → kiến tạo → chuyển hoá → bứt phá, rồi đóng ca.

Cái còn thiếu là hệ chịu trách nhiệm về **mười, hai mươi, ba mươi năm tiếp theo** của
những em giỏi nhất đã đi qua đó. Một em bậc T5 hoàn thành xuất sắc, hồ sơ đẹp, rồi
rời hệ thống ở tuổi mười tám — đó là thất bại của một tầm nhìn ba mươi năm, dù là
thành công trọn vẹn của một ca.

GEN VIỆT 365 là hệ chịu trách nhiệm phần đó.

| Trục so sánh | GITA 365 — hệ giải pháp | GEN VIỆT 365 — hệ huấn luyện |
|---|---|---|
| Đơn vị công việc | Một ca — một gia đình, một vấn đề | Một con người — theo suốt các bậc |
| Câu hỏi trung tâm | Vấn đề gì · vì sao · làm thế nào | Em này lớn tới đâu, và ai rèn tiếp |
| Chiều thời gian | 7 → 21 → 90 → 365 ngày | 365 ngày × nhiều năm, tới 30 năm |
| Kết thúc khi | Nghiệm thu đạt, ca đóng | Không đóng — chuyển bậc, hoặc trở thành người rèn |
| Đầu ra | Hồ sơ chuyển hoá · Master Portfolio | Hộ chiếu nhân tài · người dẫn thế hệ sau |
| Sở hữu dữ liệu | Hồ sơ gia đình | Hồ sơ cá nhân, đi theo người, không theo gói |

Hai hệ dùng **chung kho, chung bảng phân quyền, chung mô thức G–I–T–A**. Chúng chỉ
khác nhau ở đơn vị công việc: một bên đóng ca, một bên không bao giờ đóng.

---

## 1. Bảy nguyên lý bất biến (lớp L0)

Lớp đổi chậm nhất. Ba mươi năm tới, mọi thứ khác được phép đổi; bảy điều này chỉ đổi
bởi Hội đồng Chuẩn, và mỗi lần đổi phải ghi lý do vào Sổ Chuẩn.

1. **Nâng theo bằng chứng, không theo thời gian.** Ở lâu không phải lý do lên bậc.
   *Đây là điều bảo vệ hệ thống khỏi lạm phát danh hiệu — thứ giết mọi hệ đào tạo
   sau khoảng năm thứ mười.*
2. **Mọi can thiệp đều nhắm tới việc tự xoá mình.** Chỉ số quan trọng nhất của một
   chặng không phải kết quả, mà là mức hỗ trợ đã giảm được bao nhiêu mà kết quả vẫn giữ.
3. **Đọc đủ tám lớp trước khi chạm vào bất cứ thứ gì.** Biểu hiện → khoảng cách → cơ
   chế → đòn bẩy → thử nghiệm → kiến tạo → chuyển hoá → bứt phá.
4. **Một chính · hai hỗ trợ · một dự phòng.** Mỗi chu kỳ chỉ một đòn bẩy chính.
5. **Gia đình là nôi · nhà trường là sân khấu · cộng đồng là trường luyện.** Không tách
   trẻ khỏi nôi để rèn.
6. **Không có nhân tài một mùa.** Mỗi kỳ tích phải để lại một năng lực chuyển giao được.
7. **Hệ thống phải sống lâu hơn người dựng nó.** Điều gì chỉ nằm trong đầu một người
   thì chưa phải là chuẩn — đó là thói quen cá nhân.

---

## 2. Bảy lớp kiến trúc

Xếp theo **tốc độ đổi**. Nguyên tắc duy nhất giữ cho hệ ba mươi năm không rối:
*lớp đổi nhanh được phép phụ thuộc lớp đổi chậm, không bao giờ ngược lại.*

| Lớp | Tên | Tốc độ đổi | Giữ gì | Người giữ |
|---|---|---|---|---|
| **L0** | LÕI BẤT BIẾN | 1 lần / 10 năm | Sứ mệnh · 7 nguyên lý · định nghĩa nhân tài · ranh giới đạo đức | Hội đồng Chuẩn |
| **L1** | CHUẨN | 1 lần / 2–3 năm | 4 trụ × 12 trục · 6 bậc · thang 5 mức · cổng nghiệm thu · hệ mã hoá | QLCM + Hội đồng |
| **L2** | KHO | Bồi đắp liên tục | 1.000 kịch bản · 220 phác đồ · 42 mô thức · 550 tình huống · 100 chiến lược · 6 quyển sách · bộ test | Ban biên soạn |
| **L3** | HUẤN LUYỆN | Theo nhịp 365 | 5 hình thái · nhịp ngày→365 · lộ trình từng bậc · thiết kế trại và CLB | Coach · Mentor · Trưởng trại |
| **L4** | VẬN HÀNH | Rà 1 lần / quý | 20 vai · quy trình 10 bước · luật làm việc · tài chính · học bổng | Giám đốc · Admin |
| **L5** | CỘNG ĐỒNG | Đổi theo mùa | Gia đình · CLB Gen Việt · 4 cấp đại sứ · trại · cựu học viên · đối tác | Ban cộng đồng |
| **L6** | QUẢN TRỊ & KẾ THỪA | Rà 1 lần / năm | Hội đồng Chuẩn · sổ phiên bản · kho IP · đạo đức · chuyển giao thế hệ | Hội đồng · Super Admin |

**L2 chỉ lớn lên bằng ca thật đã nghiệm thu.** Không nhận nội dung chưa từng chạy trên
một gia đình. Đây là điều phân biệt một kho nghề với một thư viện mẹo.

### Trục dọc xuyên bảy lớp — Hộ chiếu nhân tài

Một người — một hồ sơ — suốt ba mươi năm. Không thuộc về gói dịch vụ, không mất khi
ca đóng, không phải làm lại khi đổi Coach hay đổi vùng.

| Trường | Nội dung |
|---|---|
| Định danh | `GV-<năm vào>-<vùng>-<số>` · không đổi trọn đời |
| Bậc và ngày đạt | Từng bậc kèm ngày qua cổng và tên người nghiệm thu |
| Bản đồ 12 trục | Mức 1–5 từng trục, chụp lại mỗi 90 ngày — xem được cả đường đi |
| Mức hỗ trợ | Đường cong hỗ trợ giảm dần qua các năm |
| Bằng chứng | Sản phẩm · dự án · giải · phản hồi người dùng thật · nhật ký |
| Người đã rèn em ấy | Chuỗi Coach và Mentor qua các năm |
| **Người em ấy đã rèn** | Từ bậc 5 trở lên — trường đo sự tự tái tạo của hệ thống |
| Quyền của người sở hữu | Xem toàn bộ · xuất bản sao · yêu cầu xoá |

---

## 3. Sáu bậc nhân tài

Bậc không lên theo tuổi và không lên theo thời gian ở lại. Bậc lên theo bằng chứng,
và bằng chứng ở mỗi bậc là một loại khác nhau.

| Bậc | Tên | Tuổi | Đích | Bằng chứng | Tối thiểu |
|---|---|---|---|---|---|
| **B1** | HẠT | 7–10 | Nhận diện đúng · thắp được lửa · một thói quen tự chọn giữ 21 ngày | Bản đồ cá nhân 11 ô · nhật ký 21 ngày | 3–6 tháng |
| **B2** | MẦM | 11–13 | Tự quản nền: kế hoạch · kỷ luật · phương pháp học · phục hồi | 4 chu kỳ 21 ngày liên tiếp đạt cổng · số lần nhắc giảm ≥ 60% | 12 tháng |
| **B3** | THÂN | 14–16 | Tự điều hành · một tài năng luyện sâu · dự án có người dùng thật | Sản phẩm hoàn chỉnh có phản hồi ngoài gia đình | 18 tháng |
| **B4** | TRỤ | 17–19 | Tự lập · định hướng nghề có căn cứ · portfolio · dẫn nhóm nhỏ | Nhóm do em dẫn đạt mục tiêu · portfolio nghề | 24 tháng |
| **B5** | NGƯỜI DẪN | 20–25 | Trở thành Mentor trong hệ | ≥ 3 người bậc dưới qua cổng dưới sự dẫn dắt của em | 36 tháng |
| **B6** | KIẾN TRÚC SƯ | 25+ | Giữ chuẩn · đào tạo người dẫn · mở vùng mới | Một vùng chạy đúng chuẩn 24 tháng khi em không có mặt hằng ngày | — |

**Điểm gập của toàn bộ kiến trúc nằm ở bậc 5.** Từ bậc này trở đi, sản phẩm của hệ
thống trở thành lực lượng của chính hệ thống. Đó là lý do một tầm nhìn ba mươi năm
khả thi: không phải vì tuyển được nhiều hơn, mà vì mỗi người bậc 5 rèn được người
tiếp theo.

---

## 4. Khung năng lực: 4 trụ × 12 trục × 5 mức (lớp L1)

Mười hai trục lấy nguyên từ hệ KPI nâng cao Tầng 5 của GITA 365, xếp lại dưới bốn trụ
G–I–T–A để nhìn một dòng là biết nó thuộc miền nào.

| Trụ | Trục | Đo gì | Bằng chứng | Chu kỳ |
|---|---|---|---|---|
| **G** Mục tiêu | 1 · Mục tiêu | Quyền sở hữu mục tiêu | Goal Map do chính em viết | 21 / 90 ngày |
| | 10 · Định hướng nghề | Độ rõ của đường đi | Trải nghiệm nghề có ghi chép | 90 ngày |
| | 12 · Tạo giá trị | Tác động lên người khác | Phản hồi người dùng thật | 180 / 360 ngày |
| **I** Nội lực | 3 · Kỷ luật | Độ bền của nhịp | Nhật ký · tỷ lệ giữ nhịp | Tuần |
| | 6 · Phục hồi | Thời gian quay lại sau vấp | Sổ phục hồi | Theo sự kiện |
| | 7 · Tự chủ | Mức hỗ trợ còn cần | Quan sát nhiều bối cảnh | Tháng |
| **T** Tài năng | 4 · Năng lực học | Nhớ bền và chuyển giao | Bài kiểm 24 giờ · bài chuyển bối cảnh | 21 ngày |
| | 5 · Hiệu suất | Sản lượng và chất lượng | Sản phẩm · giờ tập trung sâu | Tuần |
| | 8 · Tài năng | Độ khác biệt | Thành tích trong thử thách khó | 90 ngày |
| **A** Hành động | 2 · Tự quản | Lập kế hoạch và thực thi | Độ chính xác của kế hoạch | Tuần |
| | 9 · Lãnh đạo | Trách nhiệm với nhóm | Kết quả nhóm · phản hồi đồng đội | Theo dự án |
| | 11 · Dự án | Đưa việc tới đích | Cột mốc · sản phẩm bàn giao | Tuần |

### Thang năm mức — dùng chung cho cả mười hai trục

| Mức | Trạng thái | Quyền điều hành | Mức hỗ trợ | Bằng chứng |
|---|---|---|---|---|
| 1 | Biết | Coach | Cao | Nói lại được |
| 2 | Làm được | Coach + học viên | Trung bình | Làm xong một lần có hướng dẫn |
| 3 | Ổn định | Học viên phần lớn | Thấp | Xu hướng giữ nhiều tuần |
| 4 | Tự điều chỉnh | Học viên | Khi được yêu cầu | Chuyển được sang bối cảnh khác |
| 5 | Tự nâng chuẩn | Học viên | Cố vấn chiến lược | Tạo ra giá trị cho người khác |

### Cổng định lượng

| Bậc | Đòi hỏi tối thiểu | Điều kiện trục chính |
|---|---|---|
| B1 | ≥ mức 2 ở 3 trục bất kỳ | Không bắt buộc trụ chính |
| B2 | ≥ mức 3 ở 6 / 12 trục | Trụ I và trụ A ≥ mức 3 |
| B3 | ≥ mức 3 ở 9 / 12 trục | Một trục thuộc trụ T đạt mức 4 |
| B4 | ≥ mức 4 ở 8 / 12 trục | Trục 9 và trục 10 ≥ mức 4 |
| B5 | ≥ mức 4 ở 12 / 12 trục | Trục trụ chính mức 5 · ≥ 3 người bậc dưới qua cổng |
| B6 | Không đo bằng trục | Độ bền của chuẩn ở vùng phụ trách |

Bảng này là thứ khiến hệ thống **chấm được bởi người thứ ba** — điều kiện cần để chuẩn
không loãng khi mở ra mười vùng.

---

## 5. Năm phẩm chất Gen Việt

Đích của con người mà hệ thống muốn tạo ra, viết bằng năm chữ. Mỗi phẩm chất phải có
**chỗ rèn cụ thể hằng tuần** và một **cách đo** — nếu không thì nó chỉ là khẩu hiệu.

| | Phẩm chất | Nghĩa | Rèn ở đâu | Đo bằng gì |
|---|---|---|---|---|
| **ĐỨC** | PHẨM CHẤT | Trung thực · biết ơn · tôn trọng · giữ lời hứa · nhận trách nhiệm thay vì tìm lý do | Luật chi hội · thư biết ơn hằng tuần · giờ phụng sự · báo số thật kể cả khi số xấu | Số thư biết ơn **nhận được** từ người khác |
| **DŨNG** | BẢN LĨNH | Dám đứng lên nói · dám nhận việc khó · dám sai và đứng dậy · không bỏ giữa chừng | Vòng 45 giây trước cả chi hội · ghế nóng 10 phút · đón khách · nhận ghế ban điều hành | Số lần đứng trước đám đông trong 90 ngày · thời gian quay lại sau một lần trượt |
| **TRÍ** | TRÍ TUỆ | Học sâu · nghĩ độc lập · phản biện có căn cứ · biết mình chưa biết gì | Hạt giống tri thức 7 phút · cặp đôi rèn hằng tuần · dự án có người dùng thật | Bài chuyển bối cảnh · chất lượng **câu hỏi** em đặt ra |
| **CHỦ** | LÀM CHỦ | Làm chủ thời gian · cảm xúc · việc học · và tương lai của chính mình | Bảng số tuần tự ghi · nhịp rèn tại gia đình · nhiệm kỳ ban điều hành 6 tháng | Mức hỗ trợ còn cần · số lần người lớn phải nhắc |
| **CHÍ** | HOÀI BÃO | Ước mơ đủ lớn để đáng đánh đổi · đích dài hơn một kỳ thi · muốn để lại gì đó | Bản đồ 5–20 năm · dự án phụng sự · đại hội Gen Việt cuối năm | Mục tiêu có sống qua ba lần vấp không · tác động lên người ngoài gia đình |

Năm phẩm chất **không phải trục thứ mười ba**. Chúng là cách đọc mười hai trục theo
chiều đạo đức: một em đạt mức 5 cả mười hai trục mà thiếu Đức thì hệ thống đã tạo ra
một người giỏi nguy hiểm, không phải một nhân tài.

---

## 6. Nhịp 365 — đồng hồ của hệ thống (lớp L3)

| Chu kỳ | Việc | Ai chốt | Đầu ra |
|---|---|---|---|
| **Ngày** | 3 việc lõi: một việc nền · một việc luyện · một dòng nhật ký | Học viên | Dữ liệu thô |
| **Tuần** | Một vòng phản tư 20 phút · một con số cập nhật | Học viên + phụ huynh | Xu hướng tuần |
| **21 ngày** | Một nhịp PDCA · một cổng nhỏ · **một quyền mới được trao** | Coach | Một thay đổi được giữ |
| **90 ngày** | 4 nhịp 21 ngày + 6 ngày nghiệm thu · một sản phẩm bàn giao | Coach + Assessor | Một năng lực đạt mức mới |
| **365 ngày** | 4 chu kỳ 90 ngày + 5 ngày Hội nghị Phát triển | Hội đồng nghiệm thu | Bản đồ 12 trục mới · mức hỗ trợ mới |
| **5 năm** | Xét chuyển bậc lớn · vẽ lại bản đồ 5–20 năm | Hội đồng Chuẩn | Bậc mới trong hộ chiếu |
| **30 năm** | 6 chặng · 3 lần chuyển giao thế hệ người dẫn | Toàn hệ | Một mạng lưới tự tái tạo |

Năm ngày cuối mỗi năm — **Hội nghị Phát triển Gia đình** — là nghi lễ quan trọng nhất:
học viên bảo vệ hồ sơ, phụ huynh trình bày thay đổi của *chính mình*, Coach nghiệm thu
hệ thống chứ không nghiệm thu điểm số.

---

## 7. Năm hình thái huấn luyện (lớp L3)

Không thay nhau — **chồng lên nhau**. Một học viên bậc 3 thường nằm trong bốn hình thái
cùng lúc. Gia đình không phải hình thái thứ sáu; nó là môi trường bao trùm cả năm.

| Mã | Hình thái | Nhịp | Mạnh ở | Yếu ở | Bậc |
|---|---|---|---|---|---|
| H1 | **Kèm 1-1** | Tuần / hai tuần | Chiều sâu — chỗ duy nhất gỡ được nút thắt riêng | Đắt · dễ tạo phụ thuộc | B1 B2 B4 B5 |
| H2 | **Lớp & khoá** | Khoá 8–12 buổi | Chuẩn hoá phần nền, chi phí thấp | Không chạm cơ chế riêng | B1 B2 B3 |
| H3 | **Trại** | 2–3 lần / năm | Nén trải nghiệm, tạo bước ngoặt cảm xúc | Tan trong 3 tuần nếu nhà không giữ nhịp | B1 → B4 |
| H4 | **CLB Gen Việt** | Hằng tuần, quanh năm | Rèn bền nhất: tác phong · ngôn ngữ · trách nhiệm · sân khấu | Loãng nhanh nếu thiếu người giữ chuẩn | B2 → B5 |
| H5 | **Dự án & cố vấn** | 90–180 ngày | Chỗ duy nhất năng lực bị kiểm bởi thực tế | Đòi mạng lưới cố vấn thật | B3 → B6 |

**Câu lạc bộ Gen Việt là xương sống, không phải hoạt động phụ.** Trại tạo bước ngoặt,
kèm 1-1 gỡ nút thắt, nhưng thứ giữ người qua các chu kỳ và tạo chỗ cho bậc 5 thực tập
dẫn dắt là nhịp tuần của câu lạc bộ — với bộ quy chuẩn trang phục, nhận diện và giao
tiếp đã có sẵn.

---

## 8. Chi hội Gen Việt — mô hình chiều sâu (lớp L5)

Câu lạc bộ **không phải sinh hoạt ngoại khoá**. Nó là đơn vị vận hành nhỏ nhất của cả
hệ thống, và được tổ chức theo khung đã chứng minh được độ bền qua bốn mươi năm:
khung chi hội của BNI, dịch toàn bộ sang mục đích rèn người trẻ.

### Vì sao mượn khung BNI

BNI giữ được hàng chục nghìn chi hội chạy cùng một chuẩn suốt hơn bốn mươi năm nhờ
bốn thứ: **một kịch bản buổi họp không đổi · một bảng số đo được hằng tuần · ghế lãnh
đạo luân phiên bắt buộc · một ban thành viên dám mời người ra.** Bốn thứ ấy đúng là
bốn thứ một hệ huấn luyện ba mươi năm cần.

> **Điều KHÔNG lấy: động cơ kinh tế.** Ở BNI người ta đến để có khách hàng. Ở Gen Việt
> em đến để trở thành người mà mình muốn trở thành — nên mọi chỗ BNI đo tiền, Gen Việt
> đo bằng chứng trưởng thành: thay lời giới thiệu khách hàng bằng **trao cơ hội**, thay
> doanh thu bằng **giờ phụng sự**, thay hợp đồng bằng **bằng chứng năng lực**.

### Chuẩn chi hội

| Điểm chốt | Chuẩn |
|---|---|
| Đơn vị | **CHI HỘI** — 24 đến 36 thành viên, cùng khu vực |
| Nhịp | Sinh hoạt hằng tuần · **90 phút** · quanh năm, không nghỉ hè |
| Một mũi nhọn một người | Mỗi hướng chuyên môn chỉ một thành viên giữ — để ai cũng có sân riêng và chi hội có đủ mũi |
| Nhiệm kỳ | 6 tháng · luân phiên · mọi thành viên phải qua ít nhất một ghế trước khi xét bậc 4 |
| Gác cổng | Ban Thành viên xét đơn vào, xét gia hạn 6 tháng, và **có quyền mời ra** |

### Sáu vòng chiều sâu

| Vòng | Tên | Điều kiện | Được gì | Bậc |
|---|---|---|---|---|
| V0 | Khách mời | Được một thành viên dẫn tới | Dự tối đa 2 buổi, nghe và hỏi | — |
| V1 | Thành viên thử | Đơn được Ban Thành viên duyệt · 60 ngày thử | Vào vòng 45 giây · một cặp đôi rèn mỗi tuần · phải xong khoá nền | B1 |
| V2 | Thành viên chính thức | Xong khoá nền · mũi nhọn được công nhận · bảng số 8 tuần liền không ĐỎ | Có phiếu bầu · nhận ghế nóng · dẫn khách | B2 |
| V3 | Cốt cán | Dẫn một tổ mũi nhọn hoặc một tiểu ban trọn 6 tháng | Đề cử người mới · chấm sơ bộ đơn vào | B3 |
| V4 | Ban điều hành | Được chi hội bầu · nhiệm kỳ 6 tháng, tối đa 2 nhiệm kỳ liền | Điều hành chi hội · chịu KPI của ghế mình | B3–B4 |
| V5 | Cố vấn chi hội | Đã qua ban điều hành · được Liên chi hội công nhận | Kèm chi hội mới · ngồi hội đồng vùng | B4–B5 |

Vòng và bậc là **hai thang khác nhau nhưng khớp vào nhau**: vòng đo vị trí của em trong
cộng đồng, bậc đo năng lực của em trong hộ chiếu. Không được lấy vòng thay cho bậc.

### Kịch bản buổi sinh hoạt — 90 phút, không đổi

| Phút | Mục | Ai | Ý đồ |
|---|---|---|---|
| 00–05 | Mở đầu và tuyên ngôn | Chủ tịch | Cả chi hội đứng đọc. Lặp lại là cách một giá trị đi từ tai vào người |
| 05–12 | Hạt giống tri thức | Trưởng ban Đào tạo | Bảy phút, đúng một kỹ năng, có việc làm ngay trong tuần |
| 12–32 | **Vòng 45 giây** | Toàn bộ thành viên | "Em là ai · mũi nhọn của em · tuần này em cần gì." Đứng, nhìn thẳng, không cầm giấy |
| 32–42 | **Ghế nóng** | Một thành viên, luân phiên | Mười phút trình bày sâu rồi nhận phản biện. Mỗi em ~2 lần/năm |
| 42–52 | Khách mời | Ban Đón khách | Khách tự giới thiệu, chi hội hỏi |
| 52–70 | **Vòng trao** | Toàn bộ | Trao cơ hội · lời biết ơn có tên cụ thể · kết quả cặp đôi rèn. Mỗi lời trao phải kèm việc đã làm |
| 70–80 | Bảng số và vinh danh | Thư ký | Số thật, không sửa. Gọi tên người băng ĐỎ — để giúp, không để phạt |
| 80–88 | Cam kết tuần tới | Toàn bộ | Một câu công khai. Tuần sau mở đầu bằng chính câu ấy |
| 88–90 | Chốt | Chủ tịch | Kết thúc đúng phút 90 — đúng giờ là bài học đầu tiên chi hội dạy |

**Ban điều hành không được phép sửa kịch bản.** Chỉ Hội đồng Gen Việt sửa, và mỗi lần
sửa áp cho toàn quốc. Đây là thứ khiến một chi hội ở Hà Nội và một chi hội ở Sơn La
chạy giống nhau.

### Bảng số tuần — bảy cột

| Cột | Đo gì | Luật |
|---|---|---|
| **C** Có mặt | Có · vắng có phép · vắng không phép · có người thay | Vắng không phép 3 lần / 6 tháng thì mất ghế. Được cử người thay: bạn, anh chị hoặc phụ huynh dự và trình bày thay |
| **Đ** Đúng giờ | Số phút muộn | Muộn lấy thời gian của hai mươi tư người khác |
| **T** Trao cơ hội | Số lượt trao trong tuần | Một cuộc thi, một suất học, một người nên quen, một việc bạn làm được |
| **G** Gặp riêng | Số cặp đôi rèn đã thực hiện | Mỗi tuần một bạn khác, 30 phút, có phiếu ghi. Tình bạn thật hình thành ở đây, không phải ở buổi họp |
| **K** Khách mời | Số khách dẫn tới | Không có khách thì sau một năm chi hội thành câu lạc bộ khép kín |
| **B** Biết ơn | Số thư biết ơn **nhận được** | Cột quan trọng nhất, và là cột duy nhất em không tự ghi được cho mình |
| **P** Phụng sự | Số giờ đóng góp cộng đồng | Có xác nhận của nơi nhận. Vào thẳng hộ chiếu nhân tài |

Bảng số xếp mỗi thành viên vào một trong bốn băng **XANH · VÀNG · CAM · ĐỎ** — cùng bốn
băng hệ thống đã dùng cho gia đình.

### Bảy ghế ban điều hành — nhiệm kỳ 6 tháng

| Ghế | Làm gì | KPI của ghế |
|---|---|---|
| Chủ tịch | Giữ kịch bản và giữ giờ · chủ trì · đại diện chi hội | Buổi họp kết thúc đúng 90 phút · có mặt ≥ 90% |
| Phó chủ tịch | Giữ bảng số · theo dõi thành viên CAM và ĐỎ | Mọi thành viên ĐỎ được chạm trong 48 giờ |
| Thư ký – Thủ quỹ | Biên bản · công bố bảng số · giữ quỹ | Bảng số công bố trong 24 giờ |
| Trưởng ban Thành viên | Xét đơn vào · xét gia hạn · xử vi phạm | Không giữ lại thành viên đã hai kỳ liền không đạt chuẩn |
| Trưởng ban Đào tạo | Hạt giống tri thức · khoá nền · ghép cặp đôi rèn | 100% thành viên thử xong khoá nền trong 60 ngày |
| Trưởng ban Đón khách | Mời và đón khách · ngày mở cửa hằng tháng | ≥ 2 khách mỗi buổi · ≥ 1 khách thành thành viên mỗi quý |
| Trưởng ban Phụng sự | Dự án cống hiến · xác nhận giờ phụng sự | ≥ 1 dự án cộng đồng mỗi quý có người thụ hưởng thật |

**Mọi thành viên phải qua ít nhất một ghế trước khi được xét bậc 4.**

### Tổ mũi nhọn

Bốn đến sáu thành viên có hướng bổ trợ nhau, gặp riêng hai tuần một lần và cùng nhận
một dự án. *Tổ là nơi mũi nhọn được mài; chi hội là nơi nó được thử.*

Truyền thông · Khoa học – Công nghệ · Kinh doanh – Khởi nghiệp · Nghệ thuật · Thể chất · Xã hội

### Mười điều luật chi hội

1. **Cho đi trước.** Mỗi tuần trao đi ít nhất một thứ có ích cho một người cụ thể.
2. **Có mặt.** Vắng phải báo trước và cử người thay. Ba lần vắng không phép trong sáu tháng thì mất ghế.
3. **Đúng giờ.** Đến trước năm phút. Buổi họp bắt đầu và kết thúc đúng phút.
4. **Trang phục và nhận diện** đúng bộ quy chuẩn CLB: áo có cổ, giày, huy hiệu, thẻ tên ngực trái.
5. **Nói có căn cứ.** Không nói xấu người vắng mặt, không chỉ trích cá nhân, phản biện vào việc.
6. **Số thật.** Bảng số tự ghi và tự chịu trách nhiệm. Khai gian một lần là mất tư cách thành viên.
7. **Giữ lời hứa.** Cam kết công khai tuần trước phải được báo cáo tuần sau, kể cả khi chưa làm được.
8. **Một mũi nhọn một người.** Không tranh sân của bạn; muốn đổi mũi thì xin Ban Thành viên.
9. **Không dùng chi hội** để bán hàng, xin tiền hay vận động cho việc riêng của người lớn.
10. **Ra khỏi chi hội trong danh dự:** báo trước một tháng, bàn giao việc, và vẫn được mời dự đại hội năm.

### Ba tầng tổ chức

| Tầng | Quy mô | Nhịp | Làm gì |
|---|---|---|---|
| **CHI HỘI** | 24–36 thành viên | Hằng tuần | Rèn hằng tuần · bảng số · cặp đôi rèn · dự án nhỏ |
| **LIÊN CHI HỘI VÙNG** | 5–15 chi hội | Hằng quý | Chấm chéo chuẩn · thi đấu vùng · đào tạo ban điều hành · mở chi hội mới |
| **HỘI ĐỒNG GEN VIỆT** | Toàn quốc | Hằng năm | Đại hội · vinh danh · công nhận bậc 5–6 · sửa chuẩn · công bố chỉ số toàn hệ |

### Mở một chi hội mới

1. 12 thành viên sáng lập, trong đó ít nhất 4 người đã ở V2 trở lên tại chi hội mẹ
2. Một cố vấn V5 bảo trợ và một Coach của Học viện đỡ đầu
3. Chạy thử 8 tuần theo đúng kịch bản 90 phút, có bảng số đầy đủ
4. Đủ 20 thành viên và 8 tuần liền không có tuần nào cả chi hội ở băng ĐỎ
5. Liên chi hội vùng nghiệm thu và trao huy hiệu chi hội chính thức

> **Chi hội mở chi hội — không phải Học viện mở chi hội.** Đây là cơ chế nhân bản duy
> nhất giữ được chuẩn, vì người đi mở đã sống trong chuẩn ấy nhiều năm.

---

## 9. Bốn môi trường thực tiễn

**Chi hội là nơi RÈN. Bốn môi trường dưới đây là nơi THI.** Chi hội không được tự cấp
bằng chứng cho chính mình — mọi cổng bậc đều đòi bằng chứng từ ít nhất hai môi trường.

### M1 · LỚP HỌC
Em nhận một vai thật trong tổ chức lớp: lớp trưởng, tổ trưởng, phụ trách học tập, phụ
trách phong trào, người kèm bạn yếu.
**Làm gì:** điều hành một sinh hoạt lớp · dựng một góc học tập · tổ chức một buổi ôn
nhóm · kèm một bạn tiến bộ có số liệu.
**Ai xác nhận:** giáo viên chủ nhiệm · **Trục:** A2 Tự quản · A9 Lãnh đạo · T4 Năng lực học
*Lớp học là tổ chức đầu tiên trong đời một đứa trẻ. Ai điều hành được một tổ ba mươi
bạn cùng tuổi thì đã học xong bài lãnh đạo khó nhất.*

### M2 · HOẠT ĐỘNG TRONG TRƯỜNG
Kỹ năng sống, câu lạc bộ trường, sự kiện, sân khấu, cuộc thi.
**Làm gì:** dẫn một chuyên đề kỹ năng sống · dựng một tiết mục · tổ chức một cuộc thi
nhỏ · đại diện trường đi thi.
**Ai xác nhận:** tổng phụ trách hoặc ban giám hiệu · **Trục:** I3 Kỷ luật · T8 Tài năng · T5 Hiệu suất
*Trường học là sân khấu thể hiện xuất sắc. Vai của Học viện không phải kéo em ra khỏi
trường, mà giúp em toả sáng ngay tại đó.*

### M3 · GIA ĐÌNH
Nôi nuôi dưỡng. Nơi nhịp được giữ mỗi ngày.
**Làm gì:** nhịp rèn hằng ngày · hội đồng gia đình hằng tuần · một việc nhà có trách
nhiệm trọn vẹn · sổ nhật ký · bản đồ 5–20 năm cả nhà cùng viết.
**Ai xác nhận:** phụ huynh ghi Parent Log · Coach đối chiếu · **Trục:** I7 Tự chủ · I6 Phục hồi · G1 Mục tiêu
*Trại tạo bước ngoặt, chi hội giữ nhịp tuần, nhưng chỉ gia đình giữ được nhịp ngày.
Thiếu M3, ba môi trường kia đều tan.*

### M4 · XÃ HỘI
Nơi năng lực bị kiểm bởi thực tế chứ không bởi người chấm.
**Làm gì:** một dự án cộng đồng có người thụ hưởng thật · giờ phụng sự có xác nhận ·
sản phẩm có người dùng ngoài gia đình.
**Ai xác nhận:** nơi nhận · Trưởng ban Phụng sự tổng hợp · **Trục:** G12 Tạo giá trị · A11 Dự án · A9 Lãnh đạo
*Đây là môi trường phân biệt một học sinh giỏi với một người trẻ có ích. Từ bậc 3 trở
lên, không có bằng chứng M4 thì không qua cổng.*

### Vòng bảy ngày của một thành viên

| Ngày | Việc |
|---|---|
| Thứ Hai | Nhận việc tuần từ cam kết đã nói trước chi hội · ghi vào sổ |
| Thứ Ba → Thứ Sáu | Thực thi ở M1 và M2: vai trong lớp, hoạt động trường · nhịp ngày ở M3 |
| Giữa tuần | Một cặp đôi rèn 30 phút với một bạn khác trong chi hội · có phiếu ghi |
| Thứ Bảy | Việc M4: dự án phụng sự hoặc dự án tổ mũi nhọn |
| Chủ Nhật | Sinh hoạt chi hội 90 phút · sau đó hội đồng gia đình 30 phút |

Bảy ngày ấy là thứ biến toàn bộ kiến trúc phía trên thành đời sống thật của một đứa trẻ.
**Nếu một tuần không chạy được thì ba mươi năm cũng không chạy được** — nên đây là đơn
vị phải thử trước tiên, trước khi bàn tới vùng, tới quy mô, tới quốc gia.

---

## 10. Hệ đo

### Bốn băng — tình trạng một nhà ngay lúc này

| Băng | Nghĩa | Làm gì | Nhịp chạm |
|---|---|---|---|
| 🟢 XANH | Tự chạy đúng nhịp | Giữ nguyên, giảm tiếp mức hỗ trợ | Hằng tháng |
| 🟡 VÀNG | Nhịp lung lay, kết quả còn giữ | Sửa một biến, không sửa nhiều | Hằng tuần |
| 🟠 CAM | Trượt cổng một lần, hỗ trợ phải tăng lại | Quay lại lớp cơ chế, đọc lại 8 × 8 | Hai lần / tuần |
| 🔴 ĐỎ | Trượt hai cổng liên tiếp hoặc có dấu hiệu an toàn | Coach trưởng vào ca, cân nhắc chuyển chuyên môn | Trong 48 giờ |

Băng **độc lập với bậc**: một nhà bậc 4 vẫn có thể ở ĐỎ, một nhà bậc 1 vẫn có thể XANH.

### Bảy chỉ số của hệ thống

| Chỉ số | Vì sao đo | Đơn vị |
|---|---|---|
| Số nhân tài bậc 3 trở lên | Sản lượng thật, không phải số đăng ký | người / năm |
| **Hệ số tự tái tạo** | Một người bậc 5 đưa được bao nhiêu người lên bậc 3 mỗi năm. < 1,0 thì phải dựa vào tuyển mới; > 2,0 thì hệ tự lớn | lần |
| Đường cong hỗ trợ | Mức hỗ trợ giảm bao nhiêu % sau mỗi 365 ngày mà kết quả không tụt | % / năm |
| Tỷ lệ giữ 5 năm | Bao nhiêu % người vào bậc 1 còn trong hệ ở năm thứ năm | % |
| Độ bền chuẩn giữa các vùng | Chênh điểm nghiệm thu cùng một cổng. Quá 15 điểm là chuẩn đang loãng | điểm |
| Tỷ lệ kỳ tích có năng lực chuyển giao | Phanh chống bệnh thành tích | % |
| Tác động cộng đồng | Số người ngoài hệ hưởng lợi từ dự án học viên | người / năm |

> *Không nâng cấp theo thời gian; nâng theo bằng chứng năng lực.*
> — GITA Tầng 4, nguyên tắc gốc, giữ nguyên cho toàn bộ sáu bậc.

---

## 11. Mã hoá và dữ liệu (lớp L2)

Một mã phải **đọc được bằng mắt, không cần tra bảng**. Đây là thứ giữ cho một kho ba
mươi năm không biến thành đống tài liệu vô danh.

| Mã mẫu | Là gì | Đọc thế nào |
|---|---|---|
| `GV-2026-HN-000123` | Hộ chiếu nhân tài | Hệ · năm vào · vùng · số. Không đổi trọn đời |
| `GV.B3.T.08` | Một ô năng lực | Bậc 3 · trụ T · trục 8. Mọi phác đồ, bài test, tiêu chí đều treo vào một ô như thế |
| `PD.220.T4.CAM` | Một phiếu làm việc | Phác đồ 220 · tầng 4 · băng CAM |
| `KB.1000.H4` | Một kịch bản | Kịch bản 1000 · dùng trong hình thái 4 |
| `CG.B2.90.03` | Một cổng nghiệm thu | Cổng lên bậc 2 · chu kỳ 90 ngày · lần 3 |
| `DA.2029.B4.017` | Một dự án | Dự án 2029 · học viên bậc 4 · số 17 |

### Ghép chứ không lưu

Ba trục nhân nhau — 220 vấn đề × 5 tầng × 4 băng — ra **4.400 phiếu làm việc**. Hệ
thống KHÔNG lưu 4.400 bản ghi; nó lưu bốn lớp rồi ghép lúc hiển thị.

> Sửa một chuẩn thì 4.400 phiếu cùng đúng. Viết tay 4.400 bản thì sửa một chuẩn phải
> sửa 4.400 chỗ — và đến năm thứ ba sẽ không ai dám sửa nữa.

Nguyên tắc này áp cho **mọi** ma trận trong ba mươi năm tới.

### Ba tầng lưu trữ

| Tầng | Giữ gì | Mất được không |
|---|---|---|
| Trên thiết bị | Trạng thái đang dùng, nhật ký chưa gửi, bản nháp | Mất được |
| Sổ dữ liệu của hệ | Hồ sơ, KPI, cổng, minh chứng, tài chính | Sao lưu hằng ngày, giữ 12 bản |
| Kho ba mươi năm | Hộ chiếu đã đóng chu kỳ, bản in PDF có chữ ký nghiệm thu | Bất biến — chỉ thêm, không sửa |

### Lộ trình công nghệ ba chặng

| Chặng | Làm gì | Điều kiện bắt buộc |
|---|---|---|
| **2026–2028** Chạy trên nền đã có | Apps Script phục vụ thẳng · kho mã hoá AES-256-GCM theo tầng · PWA · Google Sheet làm sổ | Hộ chiếu phải xuất ra được JSON + PDF **ngay từ ngày đầu** — nếu không, dữ liệu bị khoá vào nền tảng |
| **2029–2033** Dịch vụ riêng | Tên miền · máy chủ riêng · CSDL quan hệ · đồng bộ ngoại tuyến | Chạy song song ít nhất 12 tháng. Không có "ngày cắt băng" |
| **2034+** Nền tảng mở | API cho trường và doanh nghiệp · chuẩn công bố công khai | **Mở chuẩn, không mở kho.** Ai dùng chuẩn phải qua nghiệm thu của Hội đồng |

---

## 12. Vận hành (lớp L4)

Mười lăm vai của hệ thống hiện tại giữ nguyên. **Năm vai mới** thuộc phần mà một hệ
huấn luyện nhân tài cần mà hệ xử lý ca không cần:

- **Hội đồng Chuẩn** — giữ L0 và L1, công nhận bậc 5–6, phê chuẩn mọi thay đổi chuẩn
- **Mentor học viên (bậc 5)** — người của chính hệ, quay lại kèm bậc dưới; đây là cửa tự tái tạo
- **Cố vấn chuyên môn ngoài** — người trong nghề thật, dẫn dự án bậc 3–4
- **Trưởng trại** — thiết kế và giữ chuẩn cho mỗi kỳ trại
- **Đội trưởng CLB Gen Việt** — giữ nhịp tuần và bộ quy chuẩn câu lạc bộ

### Tài chính: một luật không thương lượng

> **Tiền mua dịch vụ đồng hành. Tiền không mua bậc.**

Ngày nào một gia đình trả thêm tiền để con lên bậc nhanh hơn, ngày đó hộ chiếu nhân
tài mất giá trị — và mất **vĩnh viễn**, vì không có cách nào chứng minh ngược lại với
các khoá trước.

| Dòng tiền | Vai trò | Tỷ trọng mục tiêu |
|---|---|---|
| Năm tầng dịch vụ GITA 365 | Dòng chính · nuôi bộ máy chuyên môn | ≈ 60% |
| Trại và khoá học | Cửa vào rộng · tuyển chọn tự nhiên | ≈ 20% |
| Câu lạc bộ và phí thành viên | Dòng đều · giữ người giữa các chu kỳ | ≈ 10% |
| Hợp tác trường học, doanh nghiệp | Mở từ chặng 3 · nuôi mảng dự án | ≈ 10% |

**Quỹ Nhân tài Gen Việt** — trích cố định **5% doanh thu toàn hệ**, không phụ thuộc lãi
lỗ năm đó, dùng cho học bổng toàn phần cho học viên bậc 2–3 có bằng chứng năng lực
nhưng gia đình không đủ khả năng chi trả. Xét bởi Hội đồng Chuẩn, **không** xét bởi bộ
phận kinh doanh.

*Một hệ huấn luyện nhân tài chỉ tuyển được người trả nổi học phí thì trong ba mươi năm
sẽ bỏ lỡ phần lớn nhân tài của đất nước. Trích 5% là cách rẻ nhất để điều đó không xảy ra.*

---

## 13. Bảy rủi ro và phanh (lớp L6)

Một tầm nhìn ba mươi năm không chết vì thiếu ý tưởng. Nó chết vì bảy thứ dưới đây.

| Rủi ro | Dấu hiệu | Phanh |
|---|---|---|
| Phụ thuộc người sáng lập | Mọi quyết định chuẩn phải chờ một người | Từ năm thứ ba, Hội đồng Chuẩn ≥ 3 người, người sáng lập giữ **một** phiếu. Mỗi năm ít nhất một chuẩn được sửa mà người sáng lập không tham gia soạn |
| Pha loãng chuẩn khi mở rộng | Điểm nghiệm thu chênh giữa các vùng | Assessor chấm chéo vùng. Chênh > 15 điểm thì **dừng mở vùng mới** |
| Bệnh thành tích quay lại từ cửa sau | Nhiều giải, ít năng lực chuyển giao | Chỉ số "kỳ tích có năng lực chuyển giao" báo cáo quý. Dưới 70% thì đóng băng công bố thành tích |
| Mất dữ liệu hoặc tài sản trí tuệ | Kho một nơi, một người giữ khoá | Kho mã hoá, khoá tách khỏi kho, ba bản sao ba nơi, **một bản in giấy của L0–L1 cất két** |
| Vượt ranh giới chuyên môn | Ca có dấu hiệu tâm lý lâm sàng, bạo hành, nguy cơ tự hại | Danh sách dấu hiệu chuyển tuyến in trong **mọi** phác đồ. Chuyển trong 24 giờ, không thương lượng, không giữ ca vì doanh thu |
| Lệ thuộc một dòng tiền | > 70% doanh thu từ một dòng | Vượt ngưỡng hai quý liên tiếp thì kế hoạch năm sau phải có dòng thứ hai |
| Khoá cứng vào một nền tảng | Không xuất được dữ liệu dạng mở | Mỗi quý xuất toàn bộ hộ chiếu ra JSON + PDF và mở thử trên máy không có hệ thống |

---

## 14. Ba mươi năm, sáu chặng

Mỗi chặng có một câu hỏi trung tâm và một cổng. **Không qua cổng thì không sang chặng
sau — kể cả khi lịch đã tới.**

### C1 · 2026–2030 · DỰNG LÕI
*Chuẩn đã đủ chặt để người thứ ba dạy lại chưa?*
- Khoá L0 và L1 · lập Hội đồng Chuẩn 3 người
- Đưa toàn bộ kho hiện có vào hệ mã hoá mới
- Chạy hộ chiếu nhân tài cho toàn bộ học viên đang có
- Chuẩn hoá một trại và một câu lạc bộ làm bản mẫu

**Đích:** 1.000 gia đình · 100 người bậc 3 · 10 người bậc 5
**Cổng:** một Coach mới, chỉ đọc tài liệu, dẫn được một ca bậc 2 qua cổng với điểm ≥ 85
**Rủi ro chính:** vội mở rộng khi chuẩn chưa viết xong

### C2 · 2031–2035 · NHÂN BẢN
*Hệ đã tự tạo được người dẫn chưa, hay vẫn phải tuyển từ ngoài?*
- Khoá đào tạo Mentor cho bậc 5 · nghiệm thu bởi Assessor độc lập
- Mở 10 vùng, mỗi vùng một CLB và một đội Coach tại chỗ
- Chuyển sang dịch vụ riêng, chạy song song 12 tháng
- **Lần chuyển giao thế hệ người dẫn thứ nhất**

**Đích:** 10.000 gia đình · hệ số tự tái tạo ≥ 1,0 · 50 người bậc 5
**Cổng:** quá nửa số người lên bậc 3 trong năm được dẫn bởi người của chính hệ
**Rủi ro chính:** chuẩn loãng giữa các vùng — rủi ro lớn nhất của cả chặng

### C3 · 2036–2040 · VÀO TRƯỜNG
*Chuẩn Gen Việt có sống được bên ngoài Học viện không?*
- Hợp tác nhà trường: đưa khung 12 trục vào hoạt động ngoại khoá
- Mạng lưới cố vấn doanh nghiệp cho dự án bậc 3–4
- Công bố công khai chuẩn năng lực · giữ kho đóng · API cho đối tác

**Đích:** 100 trường đối tác · 1.000 người bậc 4 · chuẩn được một hội nghề nghiệp công nhận
**Cổng:** một trường không có Coach của Học viện vẫn chấm được cổng bậc 2 đúng chuẩn
**Rủi ro chính:** mở chuẩn kéo theo mở kho

### C4 · 2041–2045 · MẠNG LƯỚI QUỐC GIA
*Người giỏi ở tỉnh xa có cơ hội ngang người ở thành phố không?*
- Quỹ Nhân tài mở rộng: học bổng toàn phần cho vùng khó
- Đồng bộ ngoại tuyến cho nơi mạng yếu
- Cựu học viên bậc 5–6 mở vùng mới · **chuyển giao thế hệ thứ hai**

**Đích:** 40 tỉnh thành · hệ số tự tái tạo ≥ 2,0 · tỷ lệ giữ 5 năm ≥ 50%
**Cổng:** ba vùng khó khăn nhất có điểm nghiệm thu trong biên 15 điểm so với vùng mạnh nhất
**Rủi ro chính:** mở rộng nhanh hơn tốc độ đào tạo người dẫn

### C5 · 2046–2050 · RA KHU VỰC
*Mô hình này dịch được sang nền văn hoá khác không?*
- Dịch chuẩn và kho sang ngôn ngữ thứ hai, thứ ba
- Cấp phép mô hình cho đối tác khu vực, kèm nghiệm thu bắt buộc
- Nghiên cứu theo chiều dọc: theo dõi khoá đầu tiên đã hai mươi năm

**Đích:** 3 quốc gia · một công trình nghiên cứu 20 năm được công bố
**Cổng:** một đối tác nước ngoài đạt chuẩn nghiệm thu mà không cần người Việt có mặt
**Rủi ro chính:** đem mô hình đi mà bỏ lại nguyên lý 5 — tách trẻ khỏi nôi gia đình

### C6 · 2051–2056 · TỰ VẬN HÀNH
*Hệ chạy được khi người dựng nó không còn điều hành hằng ngày chứ?*
- Hội đồng Chuẩn hoàn toàn là người trưởng thành từ hệ
- Người sáng lập rút về vai cố vấn, giữ một phiếu
- Quỹ tự nuôi được phần chuẩn và nghiên cứu · **chuyển giao thế hệ thứ ba**

**Đích:** khoá đầu tiên ở bậc 6 và đang dẫn hệ · hệ chạy 24 tháng liên tục không cần
người sáng lập ra quyết định chuẩn
**Cổng:** cổng cuối cùng, và là cổng duy nhất mà người sáng lập **không được chấm**
**Rủi ro chính:** chuyển giao muộn — phải bắt đầu từ chặng 2, không phải chặng 6

---

## 15. Chín mươi ngày đầu tiên

Không phần nào cần thêm người, thêm tiền hay thêm phần mềm. Toàn bộ chạy được bằng
đội ngũ và hệ thống hiện có. **Thứ tự là bắt buộc.**

| Mốc | Việc | Ai | Đầu ra |
|---|---|---|---|
| Tuần 1–2 | Khoá L0: viết ra bảy nguyên lý và định nghĩa nhân tài, ký, cất một bản giấy | Người sáng lập | Sổ Chuẩn v1 |
| Tuần 3–4 | Khoá L1: bảng 4 trụ × 12 trục · 6 bậc · thang 5 mức · điều kiện từng cổng | QLCM | Bảng chuẩn năng lực v1 |
| Tuần 5–6 | Đổi mã toàn bộ kho sang hệ mã mới | Ban biên soạn | Kho đã đánh mã |
| Tuần 7–8 | Dựng hộ chiếu nhân tài v1 · xuất thử JSON và PDF · mở trên máy sạch | Admin hệ thống | 30 hộ chiếu mẫu |
| Tuần 9–10 | Xếp bậc cho toàn bộ học viên đang có. Chưa đủ bằng chứng thì để trống, **không đoán** | Coach + Assessor | Bản đồ bậc hiện tại |
| Tuần 11–12 | Chạy thử một cổng bậc 2 đúng chuẩn mới, quay lại toàn bộ làm bài mẫu đào tạo | Toàn đội | Băng ghi cổng mẫu |
| Ngày 85–90 | Hội nghị chuẩn lần đầu: soi chỗ chuẩn chưa chặt, chốt việc quý sau | Hội đồng Chuẩn | Sổ Chuẩn v1.1 |

Đánh mã kho trước khi khoá bảng chuẩn thì phải đánh lại lần hai; xếp bậc trước khi có
cổng mẫu thì mỗi Coach xếp một kiểu, và bản đồ bậc đầu tiên sẽ sai ngay từ ngày lập ra.

---

## Nguồn

Phần nội dung chuyên môn được rút trọn vẹn từ kho tài liệu sẵn có của Học viện. Thứ
duy nhất mượn từ bên ngoài là **khung tổ chức chi hội của BNI** — mượn cấu trúc vận
hành, không mượn động cơ kinh tế (xem mục 8).

| Tài liệu | Phần được dùng |
|---|---|
| HỆ THỐNG GIẢI PHÁP GITA 365 | Ma trận 8 × 8 · 11 nhóm giải pháp · năm tầng T1–T5 · chuẩn 100 điểm |
| HỆ THỐNG GIẢI PHÁP VÀ MÃ HOÁ GITA 365 | Sơ đồ vận hành tổng thể · ma trận logic 5 tầng · 100 chiến lược · 12 trục KPI · thang 5 mức |
| NÔI NUÔI DƯỠNG NHÂN TÀI (6 quyển) | Triết lý gia đình là nôi · G-PDCA · nguyên tắc 6C · hành trình 90 / 365 ngày |
| HỆ THỐNG COACH PH GITA 365 NGÀY (2 phần) | Dịch chuyển phụ huynh từ người quản con sang đối tác phát triển |
| 550 TÌNH HUỐNG 5 TẦNG GITA 365 | Kho tình huống thật phân theo tầng |
| GITA Tầng 4 · Tầng 5 — 220 vấn đề | 4 chu kỳ 90 ngày · bốn cổng N90–N360 · nguyên tắc nâng theo bằng chứng |
| BỘ QUY CHUẨN CLB GEN VIỆT | Chuẩn trang phục · nhận diện · ngôn ngữ và giao tiếp |
| TRẠI GEN ALPHA · TRẠI LEADER BOOM | Dữ liệu đăng ký và nguyện vọng phụ huynh — cơ sở thiết kế hình thái trại |
| Mã nguồn GITA 365 v8.0 | 15 vai · phân quyền · 9 tầng hiển thị · ghép-không-lưu · kho mã hoá AES-256-GCM |
| *Khung chi hội BNI* (nguồn ngoài) | Kịch bản họp cố định · bảng số hằng tuần · ghế luân phiên · ban thành viên gác chuẩn · chi hội mở chi hội |

**Chưa đọc được:** thư mục Drive `1m9VQM4bWzS67kRdUehUernmw49wFsWkU` (đường dẫn `/u/2/`)
không mở được bằng tài khoản `typhuquanggita@gmail.com` đang kết nối. Nếu thư mục ấy
chứa tài liệu khác với danh sách trên, cần chia sẻ lại để bổ sung vào bản thiết kế.

---

*Học viện GITA · Trương Nhật Quang · 08.5555.4688 — Bản 1.0*
