# KIẾN TRÚC GÓI DỊCH VỤ KNS365
### Ba kênh phân phối · 9 gói sản phẩm · cấu trúc chi phí · điểm hoà vốn theo sĩ số · chính sách hỗ trợ học phí

> **Vì sao phân hệ này tồn tại:** 16 phân hệ trước trả lời câu hỏi *"dạy cái gì, dạy thế nào, chứng minh bằng gì"*. Không phân hệ nào trả lời câu hỏi *"bán cho ai, đóng gói ra sao, ở sĩ số nào thì không lỗ"*. Thiếu tầng này, một chương trình tốt vẫn chết vì vận hành dưới điểm hoà vốn hoặc vì nhận lớp quá đông để bù lỗ — mà **nhận lớp quá đông chính là cách nhanh nhất phá huỷ chất lượng đã dựng ở 16 phân hệ kia**.
>
> ⚠️ **Tài liệu này không chứa một con số tiền nào.** Học viện chưa có dữ liệu khảo sát thị trường; đưa ra con số lúc này là **bịa**. Thay vào đó tài liệu cung cấp **cấu trúc chi phí**, **danh mục biến số cần điền**, **cách khảo sát từng biến**, và **công thức hoà vốn** để Học viện tự tính khi có số thật. Mọi ô cần dữ liệu thật đều ghi `<cần khảo sát>`.

---

## PHẦN A. BA KÊNH — BẢN ĐỒ PHÂN PHỐI

```
                          HỌC VIỆN GITA · KNS365
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        ▼                           ▼                           ▼
 ┌───────────────┐         ┌────────────────┐         ┌──────────────────┐
 │ ① TRONG       │         │ ② TRUNG TÂM    │         │ ③ TRẠI HUẤN      │
 │   TRƯỜNG      │         │    / CLB       │         │    LUYỆN         │
 │ hợp đồng với  │         │ phụ huynh ghi  │         │ 1–5 ngày tập     │
 │ nhà trường    │         │ danh trực tiếp │         │ trung, theo mùa  │
 ├───────────────┤         ├────────────────┤         ├──────────────────┤
 │ chiều SÂU     │         │ chiều BỀN      │         │ chiều BỨT PHÁ    │
 │ phủ rộng      │         │ giữ nhịp tuần  │         │ tạo bước ngoặt   │
 │ chu kỳ bán dài│         │ chu kỳ bán ngắn│         │ chu kỳ bán mùa vụ│
 └───────┬───────┘         └───────┬────────┘         └────────┬─────────┘
         │                         │                           │
         └─────────────────────────┼───────────────────────────┘
                                   ▼
                  ┌────────────────────────────────────┐
                  │  MỘT HỌC SINH — MỘT HỒ SƠ DUY NHẤT │
                  │  Hộ chiếu GITA · Hồ sơ tài năng    │
                  │  Pin 10 Cấp Độ · thang sâu B1–B4   │
                  └────────────────────────────────────┘
```

> 🔑 **Quy tắc hợp nhất kênh:** một học sinh có thể đi qua cả ba kênh trong một năm, nhưng **chỉ có một hồ sơ**. Trại không cấp Pin riêng, CLB không cấp Pin riêng — mọi bằng chứng đổ về cùng Hộ chiếu GITA và cùng thang **B1–B4**. Kênh là **đường bán**, không phải hệ đánh giá song song.

### A1. So sánh ba kênh

| Hạng mục | ① Trong trường | ② Trung tâm / CLB | ③ Trại huấn luyện |
|---|---|---|---|
| **Ai trả tiền** | Nhà trường *(PA1)* hoặc phụ huynh qua trường *(PA2)* | Phụ huynh trả trực tiếp | Phụ huynh trả trực tiếp |
| **Ai quyết định mua** | Ban Giám hiệu | Phụ huynh | Phụ huynh, con có tiếng nói |
| **Chu kỳ bán** | 2–6 tháng, có mùa *(tháng 4–8)* | 1–4 tuần | 3–8 tuần trước trại |
| **Đơn vị bán** | Khối / trường | Lớp / học sinh | Suất trại |
| **Rủi ro chính** | Mất một hợp đồng = mất nhiều lớp cùng lúc | Sĩ số lẻ tẻ, khó đủ lớp | Chi phí cố định cao, huỷ trại là lỗ nặng |
| **Đòn bẩy mạnh nhất** | Báo cáo nhà trường 4 trang *(`14/02`)* | 12 khoảnh khắc WOW *(`13/01`)* | Cam kết 90 ngày nối vào chương trình thường kỳ |
| **Điểm yếu phải phòng** | Bị coi là "môn phụ", bị cắt giờ | Phụ huynh rời trong im lặng | Cảm xúc bốc hơi sau 2 tuần nếu không nối |
| **Vai chủ trì bán** | GDĐH + QLHV | QLHV | QLHV, có CVN thẩm định nội dung |

---

## PHẦN B. ĐẶC TẢ 9 GÓI SẢN PHẨM

> **Quy ước đọc:** *Số buổi* tính theo đơn vị buổi **180 phút** đã chốt tại `01-CHUONG-TRINH-KHUNG/PHUONG-AN-HOP-NHAT-24-CUM-180-PHUT.md` — 1 cụm chuyên đề = 2 buổi. *Nhân sự* theo định biên `09-VAN-HANH-TRIEN-KHAI/SO-TAY-TRIEN-KHAI.md` Phần C và phân quyền `11-PHAN-QUYEN-BAO-MAT/01`.

### B1. Kênh ① — TRONG TRƯỜNG *(hợp đồng nhà trường)*

| Hạng mục | `TR-PILOT` **Thí điểm một khối** | `TR-CORE` **Chuẩn năm học** | `TR-FULL` **Toàn trường có đo lường** |
|---|---|---|---|
| **Đối tượng** | 1 khối được BGH chọn, thường L1 · L4 · L6 | 1–3 khối, đủ năm học | Toàn trường hoặc ≥4 khối |
| **Số buổi** | **8 buổi** *(4 cụm chuyên đề)* | **48 buổi/khối/năm** *(24 cụm)* | 48 buổi/khối/năm + 6 buổi Học viện Phụ huynh |
| **Thời lượng** | 180′/buổi · 1 học kỳ | 180′/buổi · cả năm học | 180′/buổi · cả năm học |
| **Sĩ số** | Theo lớp nhà trường, **trần 32** | Trần **32**, khuyến nghị 24–28 | Trần **32**, khuyến nghị 24–28 |
| **Nhân sự bắt buộc** | 1 TRN + ACT theo tỷ lệ + QLHV dùng chung | 1 TRN/lớp + ACT theo tỷ lệ + 1 QLHV/khối + CVN/cụm 3–5 lớp | Như `TR-CORE` + **TV thường trực tại cơ sở** + CVN kiểm định 2 lần/năm |
| **Sản phẩm giao cho gia đình** | Bộ Đón Nhập · Hộ chiếu GITA · 4 báo cáo sau chuyên đề · 1 báo cáo cuối thí điểm | Bộ Đón Nhập · Hộ chiếu · 24 báo cáo sau chuyên đề · **2 báo cáo phụ huynh 1 trang** · Phiên Nhìn Lại cuối năm · hồ sơ công nhận Cấp Độ nếu đủ minh chứng | Toàn bộ `TR-CORE` + **Hồ sơ tài năng** · quyền dự Học viện Phụ huynh · bản sao dữ liệu của con khi kết thúc |
| **Sản phẩm giao cho nhà trường** | Báo cáo thí điểm 4 trang rút gọn | Báo cáo tháng 1 trang × 9 + **báo cáo nhà trường 4 trang** cuối năm | Như trên + **báo cáo hội đồng chuyên môn 8 trang** + bảng 3 dạng lỗi học tập phổ biến theo khối |
| **Điều kiện chất lượng tối thiểu** | Đủ **sàn 9 điều kiện** *(Phần C)*; ≥1 buổi mẫu đạt GITA-QC ≥78/98 trước ngày khai giảng | Sàn 9 điều kiện; **≥90% buổi đạt GITA-QC ≥78**; 100% HS có ≥1 lượt chạm cá nhân hoá/tháng | Sàn 9 điều kiện; **≥95% buổi đạt ≥78**; ≥1 lớp đạt ≥88 để công nhận lớp chuẩn; đo nền–cuối đủ 3 bài đo hành vi |
| **Không bán gói này khi** | Trường chưa cho phép **đủ 180′ liền mạch** hoặc chưa có phòng đủ diện tích hoạt động | Chưa đủ TRN bậc 2 cho 100% lớp | Chưa có TV tại cơ sở hoặc chưa ký được điều khoản dữ liệu trẻ em |

> ⚠️ **Cảnh báo trung thực về `TR-PILOT`:** 8 buổi **không đủ** để kết luận về tác động. Với gói này, Học viện chỉ được báo cáo **tầng 1–2 của khung bằng chứng** *(phản ứng và học được)*, **không được nói "chương trình đã cải thiện…"**. Nói rõ điều này với BGH ngay từ buổi đầu — nó là lý do để trường ký tiếp gói năm, chứ không phải điểm yếu cần giấu.

### B2. Kênh ② — TRUNG TÂM / CLB *(phụ huynh ghi danh trực tiếp)*

| Hạng mục | `TT-KY` **Khoá học kỳ** | `TT-NAM` **Khoá năm** | `TT-COACH` **Đồng hành 1:1** |
|---|---|---|---|
| **Đối tượng** | HS L1–L12, học lần đầu, gia đình muốn thử một chặng | HS đã qua `TT-KY` hoặc gia đình cam kết cả năm | HS từ L6 có mũi nhọn đã được định vị, hoặc HS cần lộ trình riêng |
| **Số buổi** | **24 buổi** *(12 cụm)* | **48 buổi** *(24 cụm)* | **6 phiên 1:1** trong 90 ngày + 1 phiên với gia đình |
| **Thời lượng** | 180′/buổi · 1 học kỳ | 180′/buổi · cả năm | 60′/phiên |
| **Sĩ số** | **16–24**, trần 24 | **16–24**, trần 24 | 1 |
| **Nhân sự bắt buộc** | 1 TRN + ACT theo tỷ lệ + QLHV | 1 TRN + ACT theo tỷ lệ + QLHV + CVN dự giờ ≥1 lần/HLV/tháng | 1 **COACH** + QLHV kích hoạt lộ trình + TV sẵn sàng chuyển tuyến |
| **Sản phẩm giao cho gia đình** | Bộ Đón Nhập · Hộ chiếu · 12 báo cáo sau chuyên đề · 1 báo cáo phụ huynh 1 trang | Toàn bộ `TT-KY` nhân đôi + **Phiên Nhìn Lại 20 phút** + hồ sơ công nhận Cấp Độ | **Báo cáo 90 ngày** · lộ trình cá nhân · bằng chứng minh chứng đã chấm |
| **Điều kiện chất lượng tối thiểu** | Sàn 9 điều kiện; TRN bậc 2 trở lên; 100% HS được phản hồi 1-1-1 mỗi buổi | Như `TT-KY` + tỷ lệ gia hạn nội bộ được theo dõi công khai trong đội | **COACH không tự kích hoạt lộ trình** *(quy tắc RBAC)*; **không mở kênh riêng 1-1 với HS dưới 16 tuổi** — mọi phiên phải có người lớn thứ hai hoặc phụ huynh |
| **Không bán gói này khi** | Sĩ số ghi danh dưới ngưỡng hoà vốn mà chưa có quyết định bù lỗ có thời hạn của GDĐH | Chưa xếp được TRN cố định cho cả năm — **đổi TRN giữa năm là nguyên nhân rời bỏ hàng đầu** | Học sinh đang trong hồ sơ bảo vệ trẻ em do TV thụ lý |

> 💡 **Vì sao trần sĩ số kênh ② là 24 chứ không phải 32:** phụ huynh trả tiền trực tiếp mua **mật độ chú ý**. Ở kênh ①, trần 32 là do cấu trúc lớp của nhà trường, và phải bù lại bằng số ACT. Ở kênh ②, sĩ số 32 làm mất chính điều mà gia đình đã trả tiền để có.

### B3. Kênh ③ — TRẠI HUẤN LUYỆN

| Hạng mục | `TRAI-1N` **Ngày Bứt Phá** | `TRAI-3N` **GEN ALPHA** | `TRAI-5N` **LEADER BOOM** |
|---|---|---|---|
| **Đối tượng** | HS L3–L9, kể cả chưa học KNS365 | HS L4–L9 | HS L8–L12, ưu tiên Cấp Độ 4 trở lên |
| **Số buổi** | 1 ngày, không lưu trú | **3 ngày 2 đêm** | **5 ngày 4 đêm** |
| **Thời lượng** | 6 giờ hoạt động | ~24 giờ hoạt động | ~40 giờ hoạt động |
| **Sĩ số** | Trần **40**, chia Squad 5–6 | Trần **60**, chia Team | Trần **60**, chia Team |
| **Nhân sự bắt buộc** | 1 TRN chính + 1 TRN phụ + **1 ACT/10 HS** + 1 QLHV + y tế trực | 1 TRN chính + 2 TRN + **1 ACT/8 HS** + QLHV + **TV** + y tế trực 24/24 | Như `TRAI-3N` + **CVN** duyệt kịch bản + 1 TRN bậc 3 làm trưởng trại |
| **Sản phẩm giao cho gia đình** | Ảnh/video khoảnh khắc *(có phiếu đồng ý)* · **Cam kết 90 ngày** của con · thư ngỏ hướng dẫn gia đình giữ nhịp | Toàn bộ `TRAI-1N` + hồ sơ bứt phá dán vào Hộ chiếu + báo cáo trại 1 trang | Toàn bộ `TRAI-3N` + **hồ sơ lãnh đạo** *(vai đã đảm nhiệm, quyết định đã ra, khủng hoảng đã vượt)* |
| **Điều kiện chất lượng tối thiểu** | Biên bản kiểm tra an toàn địa điểm trước 48h; danh sách liên lạc khẩn cấp 100% HS; phương án y tế | Như trên + **TV có mặt trọn trại**; ≥1 người lớn cùng giới cho mỗi nhóm ngủ; kịch bản được CVN duyệt | Như trên + diễn tập tình huống khẩn cấp trước trại; **kịch bản có điểm dừng an toàn cho mọi hoạt động cường độ cao** |
| **Quy tắc nối bắt buộc** | Mở bằng rà soát Đích năm trong Hộ chiếu · đóng bằng **Cam kết 90 ngày** chuyển vào chương trình thường kỳ **ngay tuần kế tiếp** | Như trên | Như trên, và Cam kết 90 ngày được COACH hoặc TRN theo dõi có mốc |
| **Không bán gói này khi** | Chưa đủ tỷ lệ ACT, hoặc địa điểm chưa có biên bản an toàn | Chưa có TV cam kết trực trọn trại | Chưa có trưởng trại bậc 3 |

> 🔴 **Điều tuyệt đối không làm ở kênh ③:** không dùng cường độ cao, thiếu ngủ, sỉ nhục hay áp lực đám đông để tạo "bước ngoặt cảm xúc". Cơ chế của chiều BỨT PHÁ trong hệ GITA là **vượt vùng an toàn có kiểm soát** — mọi hoạt động phải có **điểm dừng an toàn** và quyền "pass" vẫn còn nguyên hiệu lực trong trại. Vi phạm điều này là vi phạm nhóm A của GITA-QC, có **quyền phủ quyết**.

---

## PHẦN C. SÀN CHẤT LƯỢNG — 9 ĐIỀU KIỆN ÁP CHO MỌI GÓI

> Đây là **điều kiện mở gói**, không phải mục tiêu phấn đấu. Thiếu bất kỳ điều nào: **hoãn khai giảng**, không mở lớp để giữ doanh thu.

| # | Điều kiện | Kiểm bằng | Ai xác nhận |
|:--:|---|---|---|
| **1** | 100% người đứng lớp có chứng nhận **TRN bậc 2** trở lên; trợ giảng có **bậc 1** | Hồ sơ nhân sự | QLHV |
| **2** | 100% nhân sự đã ký **cam kết bảo mật & bảo vệ trẻ em** trước ngày đứng lớp đầu tiên | Bản ký | QLHV |
| **3** | Đủ **tỷ lệ ACT**: ≥1/10–12 HS lớp thường · ≥1/10 HS hoạt động thể chất · ≥1/8 HS thực địa và trại | Bảng phân công | TRN |
| **4** | Có **TV** *(tư vấn – tâm lý & bảo vệ trẻ em)* sẵn sàng trong giờ hoạt động, có số gọi được ngay | Lịch trực | QLHV |
| **5** | Có **phiếu đồng ý theo mục đích** cho hình ảnh, video, dữ liệu — tách bạch *gửi phụ huynh* và *dùng truyền thông* | Hồ sơ phiếu | QLHV |
| **6** | Phòng đủ diện tích cho hoạt động di chuyển; biên bản kiểm tra an toàn trước mỗi buổi | Biên bản | ACT |
| **7** | Đủ **bộ kit** cho các cụm chuyên đề sẽ dạy trong 4 tuần tới | Biên bản kiểm kê | QLHV |
| **8** | Lịch cho phép **180 phút liền mạch** *(hoặc điểm cắt 90′ đã được duyệt)* | Thời khoá biểu đã ký | GDĐH |
| **9** | ≥1 **buổi mẫu đạt GITA-QC ≥78/98** với chính đội ngũ sẽ dạy | Phiếu `PDG-QC` | CVN |

> 💡 **Điều kiện 9 là điều kiện tốn kém nhất và cũng là điều kiện phải giữ chặt nhất.** Một buổi mẫu chưa đạt mà vẫn khai giảng thì toàn bộ chi phí sửa sai về sau lớn hơn nhiều lần chi phí hoãn hai tuần.

---

## PHẦN D. KHUNG ĐỊNH GIÁ — **CẤU TRÚC CHI PHÍ, KHÔNG PHẢI BẢNG GIÁ**

> ⚠️ **Vì sao tài liệu này không ghi giá:** giá phụ thuộc vào ba nhóm dữ liệu mà Học viện **chưa có**: ① mặt bằng chi phí nhân sự tại từng địa bàn ② mức chi trả thực tế của phụ huynh theo phân khúc ③ cấu trúc chia sẻ doanh thu mà nhà trường chấp nhận. Điền một con số bịa vào đây sẽ **lan vào hợp đồng, vào hồ sơ chào trường, vào tính hoà vốn** — và mọi quyết định phía sau đều sai theo. Cách đúng là: **khảo sát trước, điền sau, giữ nguyên công thức**.

### D1. Năm nhóm chi phí

| Nhóm | Cấu phần | Loại | Ghi chú vận hành |
|---|---|:--:|---|
| **① NHÂN SỰ** | Thù lao TRN đứng lớp · thù lao ACT · phần công QLHV phân bổ theo lớp · giờ CVN dự giờ & kiểm định · giờ TV trực · giờ COACH *(chỉ gói `TT-COACH`)* · **giờ soạn và giờ chấm** · giờ tập huấn và sinh hoạt chuyên môn | **Cố định theo lớp**, nhảy bậc theo số ACT | ⚠️ Đây là nhóm hay bị tính thiếu nhất. **Giờ chấm rubric, giờ viết báo cáo 48h, giờ gọi phụ huynh, 15 phút tự chăm sóc sau chuyên đề nhạy cảm — đều là giờ làm có trả công.** Tính thiếu phần này là nguyên nhân gốc của kiệt sức đội ngũ |
| **② HỌC LIỆU** | Bản quyền & khấu hao biên soạn 288 chuyên đề · in giáo án, kịch bản, kho phiếu · Hộ chiếu GITA · phiếu KNS 5 lớp chiều sâu · giáo trình online *(hạ tầng, lưu trữ, băng thông, audio)* · cập nhật hằng năm mạch M7 | Hỗn hợp: khấu hao **cố định**, bản in **biến đổi/HS** | Chi phí biên soạn đã bỏ ra là **chi phí chìm** — nhưng khấu hao và **chi phí cập nhật hằng năm** thì phải nằm trong giá, nếu không bộ tài liệu sẽ lạc hậu mà không ai trả tiền để sửa |
| **③ VẬT TƯ** | Bộ kit lớp học theo mạch · vật tư tiêu hao mỗi buổi · Bảng Chuỗi Ngày A3 · phong bì thư gửi tương lai · **Pin và chứng nhận Cấp Độ** · vật tư sự kiện *(Đấu trường, Ngày Hội Tài Năng, Lễ Công Nhận)* · bảo hiểm và y tế | Phần lớn **biến đổi/HS**; kit dùng chung là cố định | `05-KHO-CONG-CU-DUNG-CU` ghi ~60% dụng cụ tự làm hoặc tái chế — đây là đòn bẩy giảm chi phí thật, nhưng **giờ công tự làm vẫn là chi phí**, phải tính vào nhóm ① |
| **④ QUẢN LÝ** | Thuê phòng hoặc chia sẻ doanh thu với nhà trường · điện nước, vệ sinh · nền tảng GITA365 *(tài khoản, lưu trữ, sao lưu, bảo mật)* · chi phí SADM và ADM-HT vận hành hệ · kế toán, thuế, pháp lý, cấp phép địa phương · marketing và tuyển sinh · chi phí bán hàng của kênh ① *(thời gian gặp trường, hồ sơ chào)* | Cố định theo kỳ | Kênh ① có thêm **chia sẻ doanh thu với nhà trường** — đây thường là khoản lớn thứ hai sau nhân sự |
| **⑤ DỰ PHÒNG** | Học sinh dừng giữa chừng và hoàn phí theo thoả thuận · huỷ buổi do thời tiết, dịch bệnh, sự kiện nhà trường · thay TRN đột xuất · **quỹ hỗ trợ học phí** *(Phần G)* · dự phòng sự cố và bảo hiểm trách nhiệm · trượt giá vật tư | Tỷ lệ % trên tổng ①–④ | Không có nhóm ⑤ thì mọi biến động nhỏ đều ăn thẳng vào chất lượng — và chỗ bị cắt đầu tiên luôn là ACT, tức là **cắt đúng vào an toàn** |

### D2. Ba nguyên tắc định giá của Học viện GITA

| # | Nguyên tắc | Hệ quả |
|:--:|---|---|
| **1** | **Giá phải nuôi được sàn chất lượng ở Phần C** | Nếu mức giá thị trường chấp nhận không nuôi nổi tỷ lệ ACT và giờ chấm, thì **không hạ chuẩn — đổi gói hoặc không mở kênh đó tại địa bàn đó** |
| **2** | **Không giảm giá bằng cách giảm người** | Mọi phương án tối ưu chi phí phải đi qua vật tư, học liệu, quản lý — **không đi qua nhóm ①** phần định biên an toàn |
| **3** | **Giá công khai, chiết khấu có quy tắc** | Không có "giá riêng cho người hỏi kỹ". Chiết khấu chỉ theo bảng quy tắc công bố *(số lượng, thời điểm ghi danh, anh chị em)* và chính sách hỗ trợ ở Phần G |

---

## PHẦN E. CÁC BIẾN SỐ ĐỊNH GIÁ — BẢNG ĐỂ HỌC VIỆN TỰ ĐIỀN

> Điền xong bảng này là có đủ đầu vào cho công thức hoà vốn ở Phần F. **Mỗi ô trống phải có nguồn dữ liệu, không được ước lượng bằng cảm tính.**

### E1. Biến chi phí

| Ký hiệu | Biến | Đơn vị | Giá trị | Cách khảo sát |
|:--:|---|---|:--:|---|
| `c_TRN` | Thù lao TRN cho trọn gói *(gồm giờ dạy + giờ soạn + giờ chấm)* | đ/lớp/gói | `<cần khảo sát>` | Khảo sát mức chi trả HLV kỹ năng sống tại 3 địa bàn mục tiêu; đối chiếu bảng lương giáo viên hợp đồng của 5 trường tư và 3 trung tâm; hỏi chính 10 HLV bậc 2 hiện có về mức chấp nhận được |
| `c_ACT` | Thù lao 1 ACT cho trọn gói | đ/người/gói | `<cần khảo sát>` | Như trên, nhóm trợ giảng / sinh viên sư phạm năm 3–4 |
| `c_QLHV` | Phần công QLHV phân bổ cho 1 lớp | đ/lớp/gói | `<cần khảo sát>` | Lấy tổng chi phí QLHV/tháng ÷ số lớp phụ trách thực tế; đo bằng **nhật ký thời gian 2 tuần** của QLHV hiện tại |
| `c_CVN` | Giờ CVN dự giờ, kiểm định, kèm cặp | đ/lớp/gói | `<cần khảo sát>` | Số lần dự giờ theo `09/F` × đơn giá giờ cố vấn khảo sát tại thị trường |
| `c_TV` | Giờ TV trực và thụ lý | đ/cơ sở/tháng | `<cần khảo sát>` | Khảo sát mức chi trả cán bộ tâm lý học đường tại địa bàn; đối chiếu quy định biên chế của nhà trường |
| `c_room` | Thuê phòng hoặc chia sẻ doanh thu cho nhà trường | đ hoặc % doanh thu | `<cần khảo sát>` | Hỏi thẳng 5–7 trường trong buổi làm việc BGH *(xem `02-HO-SO-CHAO-TRUONG` Phần B, câu hỏi 3)*; ghi lại dải giá trị, không lấy một mẫu |
| `c_kit` | Bộ kit dùng chung cho 1 lớp/năm | đ/lớp/năm | `<cần khảo sát>` | Lập giỏ hàng thật từ `05-KHO-CONG-CU-DUNG-CU`, báo giá 3 nhà cung cấp, tách riêng phần tự làm |
| `c_hs` | Vật tư + học liệu **riêng cho mỗi học sinh** | đ/HS/gói | `<cần khảo sát>` | Cộng thực chi: Bộ Đón Nhập, Hộ chiếu, phiếu in, Bảng Chuỗi Ngày, phong bì, Pin, chứng nhận, bảo hiểm |
| `c_sys` | Nền tảng GITA365 phân bổ trên đầu học sinh | đ/HS/năm | `<cần khảo sát>` | Tổng chi phí hạ tầng + lưu trữ + vận hành ADM-HT ÷ số học sinh hoạt động |
| `c_mkt` | Chi phí tuyển sinh trên một học sinh mới | đ/HS mới | `<cần khảo sát>` | Đo thật trong 1 kỳ: tổng chi marketing và giờ tư vấn ÷ số HS ghi danh mới. **Tách riêng HS đến từ giới thiệu — nhóm này có chi phí gần bằng 0** |
| `p_dp` | Tỷ lệ dự phòng | % trên tổng ①–④ | `<cần khảo sát>` | Lấy từ lịch sử: tỷ lệ buổi phải dời, tỷ lệ HS dừng giữa chừng, tỷ lệ hoàn phí trong 2 kỳ gần nhất. Chưa có lịch sử thì đặt tạm và **rà lại sau mỗi kỳ** |

### E2. Biến doanh thu và thị trường

| Ký hiệu | Biến | Đơn vị | Giá trị | Cách khảo sát |
|:--:|---|---|:--:|---|
| `P` | Học phí niêm yết trọn gói trên 1 học sinh | đ/HS/gói | `<cần khảo sát>` | Không suy từ chi phí. Khảo sát **mức chấp nhận** bằng phỏng vấn sâu 20–30 phụ huynh đúng phân khúc + đối chiếu mặt bằng công bố của các chương trình cùng thời lượng tại địa bàn |
| `r` | Tỷ lệ chia sẻ doanh thu cho nhà trường / đối tác | % | `<cần khảo sát>` | Hỏi trực tiếp trong vòng đàm phán; ghi dải, không ghi một số |
| `d` | Tỷ lệ hỗ trợ học phí bình quân toàn lớp | % | `<cần khảo sát>` | Tính từ chính sách Phần G sau khi chạy 1 kỳ |
| `u` | Tỷ lệ thu thực trên doanh thu ghi danh *(sau hoàn phí, nợ phí)* | % | `<cần khảo sát>` | Sổ thu chi 2 kỳ gần nhất |
| `n` | Sĩ số thực học | HS/lớp | Theo gói | Điểm danh thực, **không lấy số ghi danh** |
| `n_max` | Trần sĩ số theo chất lượng | HS/lớp | 32 *(kênh ①)* · 24 *(kênh ②)* | Đã chốt ở Phần B |
| `k` | Số HS tối đa mỗi ACT phụ trách | HS/ACT | 10–12 *(lớp thường)* · 10 *(thể chất)* · 8 *(thực địa, trại)* | Ràng buộc an toàn, **không được nới để giảm chi phí** |
| `g` | Tỷ lệ gia hạn năm sau | % | Ngưỡng tốt ≥80% *(`13/02`)* | Đếm thật cuối mỗi năm |
| `f` | Tỷ lệ HS đến từ giới thiệu | % | Ngưỡng tốt ≥40% *(`13/02`)* | Ô "nguồn biết đến" trong Phiếu Tư Vấn |

> ⚠️ **Một cảnh báo về biến `P`:** không định giá bằng cách lấy chi phí cộng biên lợi nhuận mong muốn. Cách đó cho ra con số mà thị trường có thể không trả. Trình tự đúng: **khảo sát mức chấp nhận → kiểm tra xem mức đó có nuôi nổi sàn chất lượng Phần C không → nếu không, đổi gói hoặc đổi phân khúc, không hạ chuẩn**.

---

## PHẦN F. ĐIỂM HOÀ VỐN THEO SĨ SỐ — **CÔNG THỨC**

### F1. Ba đại lượng gốc

```
  DOANH THU THỰC TRÊN MỖI HỌC SINH
  ────────────────────────────────
      P_net  =  P × (1 − r) × (1 − d) × u


  CHI PHÍ BIẾN ĐỔI TRÊN MỖI HỌC SINH
  ──────────────────────────────────
      c_var  =  c_hs + c_sys + c_mkt


  CHI PHÍ CỐ ĐỊNH CỦA MỘT LỚP (chưa gồm ACT)
  ──────────────────────────────────────────
      CF₀    =  c_TRN + c_QLHV + c_CVN + c_TV* + c_room + c_kit

      (*) c_TV phân bổ theo số lớp của cơ sở
```

### F2. Chi phí cố định là **hàm bậc thang**, không phải đường thẳng

Số ACT bắt buộc phụ thuộc sĩ số theo ràng buộc an toàn `k`:

```
      A(n) = ⌈ n / k ⌉          (làm tròn LÊN — không được làm tròn xuống)

      CF(n) = CF₀ + A(n) × c_ACT
```

```
  CF(n)
    ▲
    │                                        ┌────────  4 ACT
    │                            ┌───────────┘
    │                ┌───────────┘                      3 ACT
    │    ┌───────────┘                                  2 ACT
    │────┘                                              1 ACT
    │
    └────┬──────────┬───────────┬───────────┬──────────▶  n
        12         24          36          48
              ↑ mỗi lần vượt bội số của k, chi phí nhảy một bậc
```

> 🔑 **Hệ quả quan trọng nhất của hình này:** **lớp 25 học sinh có thể lỗ hơn lớp 24 học sinh.** Thêm 1 em làm phát sinh nguyên một suất ACT. Vì vậy **sĩ số mục tiêu nên đặt sát ngay dưới một mốc bậc thang**, không đặt vừa vượt qua nó.

### F3. Công thức điểm hoà vốn

```
  Điều kiện hoà vốn:      n × (P_net − c_var)  =  CF₀ + ⌈n/k⌉ × c_ACT

  Giải theo từng bậc ACT. Với bậc có A ACT (tức n nằm trong khoảng
  (A−1)·k < n ≤ A·k ):

                    CF₀ + A × c_ACT
        n_BE(A)  =  ─────────────────
                     P_net − c_var

  Nghiệm hợp lệ khi và chỉ khi   (A−1)·k  <  n_BE(A)  ≤  A·k
  Duyệt A = 1, 2, 3… lấy nghiệm hợp lệ đầu tiên → đó là điểm hoà vốn thật.

  Nếu không bậc nào cho nghiệm hợp lệ  →  gói KHÔNG hoà vốn được
  ở mọi sĩ số trong trần chất lượng n_max. Phải đổi P, đổi cấu trúc
  gói, hoặc không mở gói. KHÔNG được nới k.
```

### F4. Ba kiểm tra bắt buộc sau khi tính ra `n_BE`

| # | Kiểm tra | Công thức | Ý nghĩa |
|:--:|---|---|---|
| **1** | **Có nằm trong trần chất lượng không** | `n_BE ≤ n_max` | Nếu `n_BE` lớn hơn trần thì gói này chỉ hoà vốn khi phá chuẩn — tức là **không hoà vốn được** |
| **2** | **Biên an toàn sĩ số** | `n_muctieu ≥ n_BE × (1 + m)` với `m ≥ 20%` | Bù cho HS dừng giữa chừng, vắng kéo dài, chuyển trường. `m` lấy từ tỷ lệ rời bỏ thật của kỳ trước |
| **3** | **Khoảng cách tới bậc ACT kế tiếp** | `n_muctieu ≤ A × k` | Nếu `n_muctieu` chỉ nhỉnh hơn một mốc bậc thang, hoặc **giảm mục tiêu về sát dưới mốc**, hoặc chấp nhận thêm ACT và tính lại |

### F5. Điểm hoà vốn khác nhau thế nào giữa ba kênh

| | ① Trong trường | ② Trung tâm / CLB | ③ Trại |
|---|---|---|---|
| **Đặc điểm chi phí** | `c_room` thường thay bằng `r` *(chia doanh thu)* → `CF₀` nhỏ hơn nhưng `P_net` mỏng hơn | `c_room` và `c_mkt` đều thật và đáng kể | **`c_var` rất lớn** *(ăn, ở, di chuyển, bảo hiểm)*; `CF₀` cũng lớn *(thuê địa điểm trọn gói)* |
| **Hình dạng hoà vốn** | `n_BE` thường thấp, nhưng **rủi ro nằm ở mất cả hợp đồng**, không ở sĩ số | `n_BE` nhạy với `c_mkt` — kéo tỷ lệ giới thiệu `f` lên là cách hạ `n_BE` hiệu quả nhất | `n_BE` **cao và dốc**; huỷ trại sát ngày là kịch bản lỗ nặng nhất của cả mô hình |
| **Đòn bẩy đúng để hạ `n_BE`** | Ký gói nhiều khối cùng lúc để chia `c_QLHV`, `c_CVN`, `c_TV` | Tăng `f` *(giới thiệu)* và `g` *(gia hạn)* — cả hai đều hạ `c_mkt` | Đặt **mốc chốt sĩ số tối thiểu** trước ngày trại một khoảng đủ để huỷ mà không mất cọc |
| **Đòn bẩy CẤM dùng** | Nới sĩ số vượt `n_max`, cắt ACT | Gộp hai lớp thành một để đủ sĩ số | Giảm tỷ lệ ACT hoặc bỏ TV để đủ chỗ cho thêm học sinh |

### F6. Bốn sai lầm hay gặp khi tính hoà vốn

| # | Sai lầm | Vì sao sai |
|:--:|---|---|
| **1** | Lấy **số ghi danh** thay cho **sĩ số thực học** | Chênh lệch giữa hai con số này chính là phần lỗ không nhìn thấy |
| **2** | Quên **giờ soạn, giờ chấm, giờ gọi phụ huynh** trong `c_TRN` | Đây là 30–50% khối lượng công việc thật của một TRN. Bỏ qua nó là đang tính hoà vốn cho một công việc không tồn tại |
| **3** | Làm tròn **xuống** số ACT | Làm tròn xuống là **vi phạm ràng buộc an toàn**, không phải tối ưu chi phí |
| **4** | Tính hoà vốn theo **năm đầu** rồi giữ nguyên cho các năm sau | Năm sau `c_mkt` giảm mạnh nhờ gia hạn và giới thiệu, nhưng `c_kit` và chi phí cập nhật học liệu lại phát sinh. Phải tính lại mỗi năm |

---

## PHẦN G. CHÍNH SÁCH HỖ TRỢ HỌC PHÍ

> **Nguyên tắc gốc:** hỗ trợ học phí là **cam kết giáo dục**, không phải công cụ bán hàng. Vì vậy nó có **tiêu chí viết ra được**, **xét kín**, và **không bao giờ công bố danh sách người nhận**.
> Chính sách này là bản thi công của cam kết đã nêu ở `13-TRAI-NGHIEM-DICH-VU/02` Phần E — *"quỹ hỗ trợ có tiêu chí rõ ràng, xét kín, không công bố danh sách"*.

### G1. Ba mức hỗ trợ

| Mức | Tên | Phạm vi | Dành cho |
|:--:|---|---|---|
| **H1** | **Đồng hành một phần** | Miễn một phần học phí gói đang học | Gia đình gặp khó khăn tạm thời *(mất việc, bệnh, biến cố)* — hỗ trợ theo **học kỳ**, xét lại mỗi kỳ |
| **H2** | **Đồng hành phần lớn** | Miễn phần lớn học phí, gia đình giữ một phần đóng góp tượng trưng | Hoàn cảnh khó khăn kéo dài, có xác nhận của nhà trường hoặc địa phương |
| **H3** | **Suất toàn phần** | Miễn toàn bộ học phí và học liệu | Trẻ mồ côi, khuyết tật, hoàn cảnh đặc biệt theo xác nhận chính thức; hoặc trường hợp do **TV** đề xuất vì lý do bảo vệ trẻ em |

> 💡 **Vì sao H2 vẫn giữ một phần đóng góp:** để phần tham gia của gia đình còn nguyên. Kinh nghiệm chung của ngành cho thấy phần đóng góp dù nhỏ vẫn giữ được cam kết đưa đón và ký `PSM`. Riêng **H3 miễn hoàn toàn** — vì với các hoàn cảnh đó, mọi rào cản đều là rào cản thật.

### G2. Tiêu chí xét — bảng chấm

| Nhóm tiêu chí | Nội dung | Trọng số | Minh chứng chấp nhận |
|---|---|:--:|---|
| **Hoàn cảnh kinh tế gia đình** | Thu nhập, số người phụ thuộc, biến cố trong 12 tháng | Cao nhất | Xác nhận của UBND phường/xã, nhà trường, hoặc thư trình bày của gia đình có chữ ký |
| **Nhu cầu giáo dục của trẻ** | Trẻ có nhu cầu rõ ràng mà chương trình đáp ứng được | Cao | Ghi chú của TRN, hoặc đề xuất của TV / giáo viên chủ nhiệm |
| **Cam kết tham gia của gia đình** | Đưa đón được, sẵn sàng ký `PSM`, tham gia Học viện Phụ huynh | Trung bình | Phiếu cam kết đơn giản 1 trang |
| **Mức độ khẩn** | Trường hợp do TV đề xuất vì lý do bảo vệ trẻ em | **Ưu tiên tuyệt đối** | Đề xuất của TV — **không cần qua bước xét thông thường** |

> ❌ **Không dùng làm tiêu chí:** kết quả học tập · thành tích thi cử · khả năng "làm hình ảnh đẹp cho chương trình" · quan hệ với nhà trường hay với nhân sự Học viện.
> Lý do: hỗ trợ dựa trên thành tích biến quỹ thành học bổng khuyến tài — đó là việc khác, và nó loại đúng những em cần nhất.

### G3. Quy trình xét — 5 bước, **kín**

```
 ① NHẬN ĐỀ NGHỊ                   ② HỘI ĐỒNG XÉT             ③ QUYẾT ĐỊNH
   Gia đình tự đề nghị,     ──▶     3 người: GDĐH ·    ──▶     Ghi biên bản,
   hoặc TRN/TV/QLHV đề xuất         QLHV · TV                  lưu hồ sơ kín
   qua kênh kín của QLHV            (bỏ phiếu, không            (dữ liệu D3)
                                     ai quyết một mình)
                                          │
        ⑤ RÀ SOÁT MỖI KỲ          ◀───────┴────────▶     ④ BÁO KẾT QUẢ
   Xét lại H1, H2; H3 giữ                              QLHV báo **riêng**
   nguyên đến hết cấp học                              cho gia đình, không
                                                       qua nhóm chung
```

| Bước | Ai làm | Hạn | Ghi chú bắt buộc |
|:--:|---|:--:|---|
| **①** | QLHV tiếp nhận | Trong ngày | Không hỏi thêm chi tiết đời tư ngoài phần gia đình tự nêu |
| **②** | Hội đồng 3 người: **GDĐH · QLHV · TV** | ≤ 7 ngày | **Quy tắc 4 mắt** — không ai tự quyết. TRN dạy trực tiếp em đó **không** ngồi hội đồng |
| **③** | Hội đồng ghi biên bản | Cùng phiên | Hồ sơ xếp loại **D3**, lưu theo chính sách `11/03` |
| **④** | QLHV báo riêng cho gia đình | ≤ 2 ngày sau quyết định | **Gọi điện, không nhắn nhóm.** Câu chuẩn ở G5 |
| **⑤** | QLHV rà soát | Mỗi học kỳ | Gia đình có quyền đề nghị dừng hỗ trợ khi đã ổn định — ghi nhận, không hỏi lý do |

### G4. Bảy quy tắc bảo vệ phẩm giá

| # | Quy tắc |
|:--:|---|
| **1** | **Không công bố danh sách** người được hỗ trợ, dưới bất kỳ hình thức nào — kể cả nội bộ đội ngũ |
| **2** | **TRN đứng lớp không được biết** em nào đang nhận hỗ trợ, trừ khi TV thấy cần cho việc chăm sóc và có ghi nhận lý do |
| **3** | **Không đánh dấu** trên Hộ chiếu, phiếu, danh sách lớp, hay hệ thống theo cách người khác nhìn thấy |
| **4** | **Không dùng làm nội dung truyền thông** — không ảnh, không câu chuyện, không "gương điển hình", kể cả khi gia đình đồng ý |
| **5** | **Không đổi hỗ trợ lấy nghĩa vụ**: không yêu cầu gia đình giới thiệu người khác, viết cảm nhận, hay xuất hiện ở sự kiện |
| **6** | Em được hỗ trợ **hưởng đúng mọi thứ** như các bạn: Bộ Đón Nhập, Pin, Hộ chiếu, báo cáo, quyền dự lễ — **không có bản rút gọn** |
| **7** | Nếu gia đình dừng hỗ trợ hoặc rời chương trình, **hồ sơ được bàn giao đầy đủ** như mọi trường hợp khác |

### G5. Ngân sách quỹ và cách nói

- Ngân sách quỹ mỗi năm bằng **`q`% doanh thu học phí thực thu**, với `q` do **GDĐH** chốt trước năm học và ghi trong dự toán. Giá trị `q`: `<cần khảo sát>` — xác định sau khi có 1 kỳ dữ liệu về số đề nghị thực tế và mức hỗ trợ bình quân `d`.
- Quỹ nằm trong **nhóm chi phí ⑤ Dự phòng** ở Phần D — nghĩa là nó **đã được tính vào giá**, không phải khoản phát sinh xin duyệt từng lần.
- 🎤 **Câu QLHV nói khi báo kết quả:** *"Bên em có phương án đồng hành cho trường hợp của gia đình mình. Việc này chỉ có ba người bên em biết, và sẽ không ai khác biết — kể cả thầy cô đứng lớp của con. Anh/chị không cần nói với ai, và con cũng không cần biết."*
- 🎤 **Câu nói khi phải từ chối:** *"Lần này bên em chưa sắp xếp được ạ, và em nói thật là vì số suất có hạn chứ không phải vì hồ sơ của gia đình mình. Em xin giữ đề nghị này lại cho kỳ sau, và em sẽ chủ động gọi lại cho anh/chị."*

---

## PHẦN H. TÁM ĐIỀU KHÔNG LÀM VỀ GIÁ VÀ GÓI

| # | Không làm | Vì sao |
|:--:|---|---|
| **1** | Không tạo **khan hiếm giả** *("chỉ còn 2 suất")* nếu không đúng sự thật | Đã cấm ở `13/02` — và một lần bị phát hiện là mất toàn bộ uy tín đã dựng |
| **2** | Không **hạ giá bằng cách hạ chuẩn** *(cắt ACT, nới sĩ số, bỏ TV)* | Chuẩn ở Phần C là điều kiện an toàn, không phải cấu hình tuỳ chọn |
| **3** | Không **so sánh giá bằng cách hạ thấp đơn vị khác** | Giọng thương hiệu: nói phần khác biệt của mình, không nói phần kém của người |
| **4** | Không **hứa kết quả** để biện minh cho mức giá | Học viện cam kết **quy trình và bằng chứng**, không cam kết kết quả — `13/02` Phần A2 |
| **5** | Không bán **gói dài hơn năng lực giữ chất lượng** *(ví dụ gói 3 năm khi chưa đủ TRN cho năm thứ hai)* | Bán trước rồi tuyển người sau là con đường ngắn nhất tới lớp chưa đạt chuẩn |
| **6** | Không dùng **hoa hồng tiền mặt** cho phụ huynh giới thiệu | Đã chốt ở `13/03` Phần B — cách bán phải khớp với điều mình dạy |
| **7** | Không **gộp lớp** để đủ hoà vốn khi việc gộp vượt trần sĩ số hoặc trộn hai khối cách nhau quá xa | Chương trình xoắn ốc theo khối; gộp khối làm hỏng thiết kế độ khó |
| **8** | Không nhận hợp đồng mà **chưa chốt được 180 phút liền mạch** *(hoặc điểm cắt 90′ đã duyệt)* | Đây là điều kiện kỹ thuật của toàn bộ khuôn 24 cụm — thiếu nó thì chương trình giao không đúng thứ đã bán |

---

## PHẦN I. VIỆC PHẢI LÀM TIẾP — DANH SÁCH KHẢO SÁT

| # | Việc | Ai chủ trì | Kết quả cần có | Ưu tiên |
|:--:|---|---|---|:--:|
| 1 | Khảo sát chi phí nhân sự tại 3 địa bàn mục tiêu | GDĐH | Dải giá trị `c_TRN`, `c_ACT`, `c_TV` | 🔴 |
| 2 | Nhật ký thời gian 2 tuần của QLHV và TRN hiện có | QLHV | Số giờ thật cho mỗi lớp → `c_QLHV`, phần giờ soạn/chấm của `c_TRN` | 🔴 |
| 3 | Lập giỏ hàng kit thật, báo giá 3 nhà cung cấp | QLHV | `c_kit`, `c_hs` | 🔴 |
| 4 | Phỏng vấn sâu 20–30 phụ huynh đúng phân khúc về mức chấp nhận | QLHV + GDĐH | Dải `P` theo từng gói | 🔴 |
| 5 | Hỏi 5–7 trường về cấu trúc chia sẻ doanh thu | GDĐH | Dải `r` | 🟠 |
| 6 | Đo chi phí tuyển sinh thực trong 1 kỳ, tách nhóm giới thiệu | QLHV | `c_mkt`, `f` | 🟠 |
| 7 | Chốt `q`% ngân sách quỹ hỗ trợ | GDĐH | Con số ghi trong dự toán năm | 🟠 |
| 8 | Chạy công thức Phần F cho cả 9 gói, đánh dấu gói không hoà vốn được | GDĐH | Bảng `n_BE` và `n_muctieu` từng gói | 🟡 |
| 9 | Rà lại toàn bộ sau mỗi năm học | GDĐH + QLHV | Phiên bản 2 của bảng biến số | 🟡 |

> ⚠️ **Một mâu thuẫn nội bộ cần chốt:** `13-TRAI-NGHIEM-DICH-VU/02` *(phản đối #3)* nói *"sĩ số tối đa 32 với 1 huấn luyện viên và 2 trợ giảng"*, trong khi `09-VAN-HANH-TRIEN-KHAI/SO-TAY-TRIEN-KHAI.md` Phần C quy định **≥1 ACT/10–12 HS** — tức 32 học sinh cần **3 ACT**.
> **Tài liệu này lấy tỷ lệ ACT làm chuẩn**, vì đó là ràng buộc an toàn. Đề nghị sửa lại câu ở `13/02` cho khớp: hoặc ghi *"32 học sinh với 1 TRN và 3 ACT"*, hoặc ghi *"24 học sinh với 1 TRN và 2 ACT"*. **Không được để hai con số khác nhau tồn tại song song trong tài liệu đối ngoại** — phụ huynh và nhà trường sẽ đọc thấy cả hai.

---

*Tài liệu thuộc bộ **KNS365 – Hệ GEN VIỆT** · Học viện GITA.*
