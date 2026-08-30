# 23 · TÀI CHÍNH KHOÁ — QUY TRÌNH CHI TIẾT

> 🔧 **BẢN TÁC NGHIỆP.** Đây là bản người vận hành dùng — khi khác với bản tóm tắt,
> **bản này là bản đúng**. Bản tóm tắt: [`10-tai-chinh.md`](10-tai-chinh.md) — Khung tài chính khoá.

> **Quy ước về số liệu trong tài liệu này.** Tài liệu **không ghi con số tiền tuyệt đối**, vì giá
> địa điểm, ngày công chuyên môn và giá thực phẩm thay đổi theo thời điểm và theo địa phương —
> một con số in cứng sẽ sai trong vòng một năm và người đọc vẫn dùng nó. Thay vào đó, mọi khoản
> được viết bằng **công thức**, **tỉ lệ phần trăm** và **mốc tương đối**.
>
> Đơn vị quy chiếu duy nhất: **`ĐG` = học phí một học viên ở gói chuẩn** (gói có bao gồm 90 ngày).
> Mọi chi phí trong tài liệu này được quy về bội số của `ĐG`.
> **Đây là khung để đội tài chính điền số thật** trước mỗi khoá, không phải bảng giá.

---

## 0. Vấn đề gốc mà tài liệu này sửa

Khi rà soát cơ cấu chi phí của Học viện, phát hiện quan trọng nhất là:

> **Bảng chi hiện hành phản ánh chi phí của một sự kiện 7 ngày, trong khi sản phẩm bán ra là
> một chương trình 365 ngày.** Đây là gốc của mọi lệch lạc về giá.

Năm nhóm chi phí bị thiếu hoàn toàn hoặc thiếu một phần:

| # | Khoản thiếu | Bản chất | Hậu quả nếu tiếp tục thiếu |
|---|---|---|---|
| 1 | **Bảo hiểm** tai nạn cho học viên và nhân sự | Điều kiện bắt buộc để khai giảng (cổng C4) | Một sự cố duy nhất có thể lớn hơn lợi nhuận nhiều khoá cộng lại |
| 2 | **Nhân viên y tế trực 24/7** | Điều kiện tối thiểu của trại lưu trú cho trẻ em | Không đạt chuẩn `A1`; xử lý y tế phụ thuộc may rủi |
| 3 | **Cứu hộ có chứng chỉ** | Bắt buộc khi có hoạt động dưới nước | Rủi ro không thể phục hồi |
| 4 | **Chuyên viên tâm lý** | Sàng lọc và can thiệp mức 1–2 | Ca cần chuyển chuyên môn không được phát hiện kịp |
| 5 | **Chi phí Coach sau trại (90 ngày)** | Chi phí của **sản phẩm chính**, không phải hậu mãi | Chương trình 365 ngày bị trợ cấp bằng lợi nhuận trại; và sẽ bị cắt khi bận |

Tài liệu này đưa cả năm nhóm vào cấu trúc chi phí, và đưa chúng vào **giá**.

---

## 1. Cấu trúc chi phí đầy đủ một khoá

### 1.1 Quy ước cách tính

| Ký hiệu | Nghĩa |
|---|---|
| `ĐG` | Học phí một học viên ở gói chuẩn (đã bao gồm 90 ngày) |
| `N` | Sĩ số thực của khoá |
| `F` | Tổng chi phí **cố định theo khoá** — không đổi khi thêm/bớt một học viên |
| `v` | Chi phí **biến đổi trên mỗi học viên** |
| `s` | Chi phí **bậc thang** — cố định trong một khoảng sĩ số, nhảy bậc khi vượt ngưỡng |
| `NC` | Ngày công chuyên môn — đơn giá do đội tài chính khảo giá địa phương |

**Ba cách tính chi phí, phải ghi rõ cho từng dòng:**

| Cách tính | Ký hiệu | Đặc điểm | Ví dụ |
|---|---|---|---|
| Theo khoá | `F` | Chi một lần, không phụ thuộc sĩ số | Vận chuyển theo số xe, thiết kế học liệu, tập huấn D-5 |
| Theo đầu học viên | `v` | Nhân thẳng với `N` | Đồng phục, in ấn, ăn uống theo suất, bảo hiểm học viên |
| Theo bậc sĩ số | `s` | Nhảy bậc tại ngưỡng tỉ lệ nhân sự | ACT (1/8–10 HV), số phòng, số xe |

> **Lỗi phổ biến nhất trong dự toán:** xếp chi phí bậc thang vào nhóm cố định. Khi sĩ số vượt
> ngưỡng 1 ACT / 8–10 học viên, chi phí nhảy một bậc trong khi doanh thu chỉ tăng một `ĐG` —
> và biên lợi nhuận tụt đúng ở chỗ tưởng là đang tăng quy mô.

### 1.2 Nhóm A — Nhân sự chuyên môn

| Dòng chi | Cách tính | Bậc / định mức | Ghi chú |
|---|---|---|---|
| Trainer trưởng | `F` | 1 người/khoá | Ngày công cao nhất trong bảng; tính cả ngày tập huấn D-5 |
| Trainer | `s` | Theo số lớp/khối hoạt động | Tính `NC × (số ngày trại + 1 ngày D-5)` |
| ACT | `s` | **1 ACT / 8–10 HV; nhóm 9–11 tuổi: 1/8** | Đây là dòng nhảy bậc rõ nhất; xem §1.3 về tỉ lệ |
| Coach 90 ngày | `v` | Xem §2 — **không được để trống** | Chi phí lớn nhất bị bỏ quên |
| Giáo viên buổi ôn luyện | `F` hoặc `s` | 4 buổi × 120 phút (tuần 2, 5, 8, 12) | Tính theo lớp, không theo đầu học viên |
| Tư vấn chuyên môn (định vị, Bản đồ) | `v` | Theo số hồ sơ phải dựng | Phỏng vấn D-20 + Bản đồ Nhận diện D7 + Bản đồ Cơ chế D28 |
| Tập huấn đội ngũ D-5 | `F` | ≥ 1 ngày công cho toàn đội | **Không được cắt** khi lịch gấp |

### 1.3 Nhóm B — Bốn vị trí chuyên trách bắt buộc theo chuẩn `A1`

Chuẩn `A1` yêu cầu **4 vị trí chuyên trách, không kiêm nhiệm**. "Không kiêm nhiệm" nghĩa là người
giữ vị trí này **không đồng thời** là Trainer hay ACT phụ trách nhóm — vì đúng lúc cần họ nhất là lúc
họ đang bận với nhóm của mình.

| Vị trí | Cách tính | Định mức tối thiểu | Vì sao không kiêm nhiệm được |
|---|---|---|---|
| **Cán bộ Bảo vệ trẻ em** | `F` | 1 người, có mặt toàn thời gian D1→D7 + trực đường dây trong 90 ngày | Người tiếp nhận trình báo không được là người có thể bị trình báo |
| **Chuyên viên tâm lý** | `F` | `NC × (số ngày trại + 1 ngày D-5)`; cộng gói giờ tư vấn dự phòng trong 90 ngày | Sàng lọc và can thiệp mức 1–2 cần chuyên môn được cấp phép, không phải kỹ năng Trainer |
| **Nhân viên y tế trực 24/7** | `F` | Đủ để phủ 24 giờ × số ngày trại — thực tế là **2 người luân ca**, không phải 1 | Một người không trực được 24/7 trong 7 ngày; ghi 1 người trong dự toán là dự toán sai |
| **Cứu hộ có chứng chỉ** | `s` | Theo **số điểm nước đồng thời** và số ngày có hoạt động nước; tối thiểu 1 cứu hộ/điểm nước | Chứng chỉ là điều kiện pháp lý, không thay bằng người biết bơi |

**Công thức nhóm B:**

```
CP_A1 = NC_bảo_vệ_trẻ_em × ngày
      + NC_tâm_lý × (ngày trại + 1) + gói giờ tư vấn 90 ngày
      + NC_y_tế × ngày trại × 2 ca
      + NC_cứu_hộ × số điểm nước × số ngày có hoạt động nước
```

> **Mốc tham chiếu để kiểm tra dự toán:** nhóm B thường chiếm **khoảng 4–8% tổng chi phí khoá**.
> Nếu dự toán cho ra dưới 3%, gần như chắc chắn có vị trí đang bị ghi kiêm nhiệm hoặc bị ghi
> thiếu ca trực. Nếu bằng 0 — dự toán **không được duyệt**, đây là điều kiện của cổng C1.

### 1.4 Nhóm C → I — Các nhóm còn lại

| Nhóm | Dòng chi | Cách tính | Mốc tham chiếu (% tổng chi) | Ghi chú vận hành |
|---|---|---|---|---|
| **C · Địa điểm** | Thuê trọn gói / thuê riêng phòng ở, phòng hội trường, sân bãi | `F` + `s` theo bậc phòng | **Cảnh báo khi > 55–60%** | Đàm phán **bậc giá theo sĩ số**, không lấy giá trọn gói cứng — để rủi ro sĩ số thấp không dồn hết về Học viện |
| **D · Ăn uống** | Suất ăn chính, phụ, nước, bổ sung dinh dưỡng | `v` theo suất × số ngày | Theo khảo giá | Bắt buộc có hợp đồng nêu **nguồn gốc thực phẩm và lưu mẫu**; xem §7 |
| **E · Hậu cần** | Công cụ dụng cụ, văn phòng phẩm, thiết bị âm thanh, cúp và phần thưởng, tiệc tổng kết | `F` phần lớn; đồng phục là `v` | 5–10% | Tách rõ khoản dùng lại được nhiều khoá (khấu hao) khỏi khoản tiêu hao |
| **F · Di chuyển** | Xe đưa đón, xe dự phòng, xe cấp cứu chờ (nếu địa điểm xa cơ sở y tế) | `s` theo số xe | 2–5% | **Xe dự phòng là dòng riêng**, không gộp vào xe chính |
| **G · Học liệu** | Thiết kế và cập nhật (`F`) · in ấn theo đầu học viên (`v`) · nền tảng số (`v`, xem §2) | Hỗn hợp | 3–6% | Chi phí thiết kế phân bổ cho nhiều khoá, không dồn hết vào khoá đầu |
| **H · Bảo hiểm** | Bảo hiểm tai nạn học viên (`v`) · bảo hiểm nhân sự (`F`) · bảo hiểm trách nhiệm của đơn vị tổ chức (`F`) | Hỗn hợp | 1–3% | Ba loại khác nhau, **không được gộp thành một dòng**; xem §7 |
| **I · Dự phòng** | Dự phòng vận hành · dự phòng y tế · dự phòng biến động giá | % của (A→H) | **≥ 8–10%** | Là dòng chi, không phải phần thừa; xem §7 |

### 1.5 Bảng phân bổ tham chiếu — dùng để kiểm tra dự toán, không dùng để đặt số

| Nhóm | Khoảng tham chiếu (% tổng chi khoá) | Đọc dấu hiệu bất thường |
|---|---|---|
| A · Nhân sự chuyên môn (gồm Coach 90 ngày) | 22 – 32% | Dưới 20% → nhiều khả năng Coach 90 ngày chưa được tính |
| B · Bốn vị trí chuyên trách `A1` | 4 – 8% | Bằng 0 hoặc dưới 3% → có vị trí bị kiêm nhiệm |
| C · Địa điểm | 40 – 55% | Trên 60% → mất đòn bẩy đàm phán, biên lợi nhuận không cứu được bằng chỗ khác |
| D · Ăn uống | Nằm trong C nếu trọn gói; nếu tách: 10 – 18% | Cắt xuống dưới khoảng này là cắt vào an toàn thực phẩm |
| E · Hậu cần | 5 – 10% | Trên 12% → thường do phần thưởng và tiệc phình |
| F · Di chuyển | 2 – 5% | Thiếu dòng xe dự phòng là dấu hiệu dự toán chưa hoàn chỉnh |
| G · Học liệu và nền tảng | 3 – 6% | |
| H · Bảo hiểm | 1 – 3% | Bằng 0 → **không được mở khoá** |
| I · Dự phòng | 8 – 10% | Dưới 5% → khoá đầu tiên phát sinh là vỡ dự toán |

---

## 2. Chi phí sau trại — nhóm thường bị bỏ quên

### 2.1 Bốn dòng chi của giai đoạn 90 ngày

| Dòng | Nội dung | Cách tính | Ghi chú |
|---|---|---|---|
| **Coach đồng hành 90 ngày** | 2 check-in/tuần × 10' · 1 Review tuần 45' · đánh giá tháng 60' × 3 | `v` — tính theo **giờ chuyên môn trên đầu học viên** | Dòng lớn nhất; xem §2.2 |
| **Nền tảng số** | Nhật ký, bảng KPI, hồ sơ học viên, nhắc lịch | `v` theo tài khoản hoạt động × 4 tháng, cộng `F` phí duy trì | Tính theo **thời gian sử dụng thật**, không theo lần mua |
| **Báo cáo 90 ngày (D118)** | Tổng hợp KPI, dựng 3 trang, buổi trả kết quả với gia đình | `v` — 2–3 giờ chuyên môn/hồ sơ | Bao gồm cả giờ của Trainer trưởng duyệt |
| **Bốn buổi ôn luyện** | Tuần 2, 5, 8, 12 · 120 phút/buổi | `F` hoặc `s` theo lớp | Cộng chi phí phòng hoặc nền tảng họp trực tuyến |

### 2.2 Phép tính phải làm một lần cho hết tranh cãi

Ước lượng giờ chuyên môn trực tiếp trên đầu một học viên:

| Giai đoạn | Cách tính | Giờ chuyên môn/học viên |
|---|---|---|
| **7 ngày trại** | Giờ ACT có mặt trong ngày ÷ số học viên mỗi ACT, × số ngày | ≈ 10 – 12 giờ |
| **90 ngày sau trại** | (2 × 10' + 45') × 13 tuần + 60' × 3 tháng + 2,5 giờ báo cáo | ≈ 19 – 21 giờ |

> **Giai đoạn 90 ngày tiêu tốn nhiều giờ chuyên môn trên đầu học viên hơn cả tuần trại.**
> Nếu dự toán chỉ có dòng chi cho 7 ngày, dự toán đó đang bỏ sót **hơn một nửa** khối lượng
> chuyên môn thật của sản phẩm.

### 2.3 Hệ quả nếu không tính vào giá

> **Nếu chi phí sau trại không nằm trong giá, thì chương trình 365 ngày đang được trợ cấp bằng
> lợi nhuận của trại 7 ngày. Điều đó không bền — và nó hỏng theo một cách rất dự đoán được.**

Chuỗi nhân quả, theo đúng thứ tự nó xảy ra:

| Bước | Hiện tượng | Vì sao tất yếu |
|---|---|---|
| 1 | 90 ngày được gọi là "hậu mãi", không có dòng doanh thu riêng | Vì giá chỉ được xây trên chi phí 7 ngày |
| 2 | Coach vừa phải chạy 90 ngày của khoá trước, vừa phải phục vụ khoá tiếp theo | Khoá tiếp theo có doanh thu, 90 ngày thì không |
| 3 | Khi lịch va nhau, việc bị lùi luôn là 90 ngày | Đây là quyết định hợp lý về mặt kinh tế của mọi cá nhân trong hệ thống |
| 4 | Review tuần thưa dần, cảnh báo Vàng phát hiện muộn, tỉ lệ rơi rụng tăng | Cơ chế phát hiện tụt phụ thuộc vào nhịp gặp |
| 5 | Dữ liệu mức 3 tại D118 không đủ để công bố | Không có dữ liệu thì không chứng minh được sản phẩm |
| 6 | Chương trình quay về bán trại 7 ngày | Vì đó là phần duy nhất còn tự nuôi được |

**Đây là lý do phổ biến nhất khiến chương trình "sau trại" chết dần ở mọi hệ thống**, dù không ai
phản đối rằng nó quan trọng. Cách chặn duy nhất là **kinh tế**, không phải lời kêu gọi:
giai đoạn 90 ngày phải có doanh thu gắn với nó.

---

## 3. Điểm hoà vốn

### 3.1 Công thức

```
Sĩ số hoà vốn  N₀ = F ÷ (ĐG − v)

Trong đó:
  F  = tổng chi phí cố định theo khoá (nhóm A phần cố định + B + C + E + F + G + H phần cố định + I)
  v  = chi phí biến đổi mỗi học viên (đồng phục, in ấn, ăn theo suất, bảo hiểm HV,
       Coach 90 ngày, nền tảng số, báo cáo D118)
  ĐG = học phí gói chuẩn

Lợi nhuận gộp  LN(N) = N × (ĐG − v) − F
Biên lợi nhuận gộp    = LN(N) ÷ (N × ĐG)
```

> **Chi phí Coach 90 ngày, nền tảng số và báo cáo D118 nằm ở `v`, không nằm ở `F`.** Đây là điểm
> hay bị làm sai. Chúng tăng theo từng học viên, nên xếp nhầm vào `F` sẽ làm điểm hoà vốn trông
> thấp hơn thực tế và dẫn tới quyết định mở khoá ở sĩ số lỗ.

### 3.2 Hai kịch bản quy mô — tính đầy đủ

Mọi số dưới đây quy về `ĐG`. **Đội tài chính thay `F` và `v` bằng số khảo giá thật của khoá.**

| Thông số | **Kịch bản A · quy mô nhỏ** (địa điểm hạng vừa, mục tiêu 45 HV) | **Kịch bản B · quy mô lớn** (địa điểm hạng lớn, mục tiêu 70 HV) |
|---|---|---|
| `F` (cố định) | **34 ĐG** | **46 ĐG** |
| `v` (biến đổi/HV) | **0,05 ĐG** | **0,055 ĐG** |
| Biên đóng góp `(ĐG − v)` | 0,95 ĐG | 0,945 ĐG |
| **Sĩ số hoà vốn `N₀`** | 34 ÷ 0,95 = 35,8 → **36 HV** | 46 ÷ 0,945 = 48,7 → **49 HV** |
| Sĩ số mục tiêu | 45 HV | 70 HV |
| Doanh thu tại mục tiêu | 45,0 ĐG | 70,0 ĐG |
| Chi phí tại mục tiêu | 34 + 2,25 = 36,25 ĐG | 46 + 3,85 = 49,85 ĐG |
| **Lợi nhuận gộp tại mục tiêu** | **8,75 ĐG** | **20,15 ĐG** |
| **Biên lợi nhuận gộp** | **19,4%** | **28,8%** |
| Khoảng cách an toàn (mục tiêu − hoà vốn) | 9 HV = **20% sĩ số mục tiêu** | 21 HV = **30% sĩ số mục tiêu** |

**Đọc hai kịch bản:**

| Nhận định | Giải thích |
|---|---|
| Kịch bản B có biên tốt hơn nhưng **rủi ro tuyệt đối lớn hơn** | `F` cao hơn 12 ĐG; nếu khoá không chạy, khoản mất là khoản đã đặt cọc địa điểm |
| Kịch bản A có khoảng cách an toàn mỏng — chỉ 20% | Tuyển thiếu 20% là **về đúng điểm hoà vốn**, không còn gì để chia |
| Vùng sĩ số 36–48 là **vùng nguy hiểm của kịch bản B** | Đủ đông để phải thuê địa điểm lớn, chưa đủ đông để hoà vốn ở địa điểm đó |
| Không chạy kịch bản B nếu số ghi danh có đặt cọc tại D-30 chưa đạt 70% mục tiêu | Đây là điều kiện của cổng C2 |

### 3.3 Độ nhạy — điều gì xảy ra khi tuyển thiếu

| Mức hụt tuyển sinh | **Kịch bản A** (mục tiêu 45) | | **Kịch bản B** (mục tiêu 70) | |
|---|---|---|---|---|
| | Sĩ số | Lợi nhuận gộp / biên | Sĩ số | Lợi nhuận gộp / biên |
| Đạt mục tiêu | 45 | 8,75 ĐG · **19,4%** | 70 | 20,15 ĐG · **28,8%** |
| **Thiếu 10%** | 40 | 4,00 ĐG · **10,0%** | 63 | 13,54 ĐG · **21,5%** |
| **Thiếu 20%** | 36 | 0,20 ĐG · **0,6%** | 56 | 6,92 ĐG · **12,4%** |
| **Thiếu 30%** | 31 | −4,55 ĐG · **−14,7%** | 49 | 0,30 ĐG · **0,6%** |
| **Thiếu 40%** | 27 | −8,35 ĐG · **−30,9%** | 42 | −7,69 ĐG · **−18,3%** |

> **Đây là con số phải nhớ:** doanh thu giảm **20%** làm lợi nhuận gộp giảm **66% (kịch bản B)**
> đến **98% (kịch bản A)**. Nguyên nhân là đòn bẩy hoạt động — phần lớn chi phí là cố định,
> nên mỗi học viên thiếu đi lấy mất gần trọn một `ĐG` khỏi lợi nhuận.

**Bốn phản ứng đúng khi dự báo tuyển thiếu ≥ 20% (kiểm tại cổng C2, D-20):**

| Thứ tự | Phản ứng | Vì sao theo thứ tự này |
|---|---|---|
| 1 | **Hạ bậc địa điểm** hoặc kích hoạt điều khoản bậc giá theo sĩ số | Tấn công thẳng vào 40–55% chi phí; không đụng tới an toàn |
| 2 | **Gộp khoá** với khoá kế tiếp, hoãn có hoàn cọc cho gia đình | Giữ nguyên chuẩn, chỉ dời thời gian |
| 3 | **Cắt nhóm E** — phần thưởng, cúp, tiệc tổng kết, đồng phục hạng cao | Ảnh hưởng trải nghiệm, không ảnh hưởng an toàn hay chuyên môn |
| 4 | **Hoãn khoá** | Lỗ tiền đặt cọc còn hơn chạy một khoá dưới chuẩn |
| ❌ | **Không bao giờ:** cắt nhóm B, cắt tỉ lệ ACT, cắt bảo hiểm, cắt dự phòng | Xem §7 |

---

## 4. Nguyên tắc định giá

### 4.1 Định giá theo chi phí thật cộng biên, không theo đối thủ

| ❌ Cách sai | Hậu quả | ✅ Cách đúng |
|---|---|---|
| Nhìn giá của trại khác rồi đặt thấp hơn 10% | Không biết cơ cấu chi phí của họ. Rất có thể họ đang thiếu đúng 5 khoản ở §0 — và mình đang lấy một cơ cấu thiếu an toàn làm chuẩn | Dựng giá sàn từ chi phí thật của **mình**, rồi mới đối chiếu thị trường để hiểu vị thế |
| Đặt giá theo "cảm giác phụ huynh chịu được" | Giá không liên hệ gì với chi phí; lỗ được phát hiện sau khi đã bán xong | Kiểm khả năng chi trả **sau khi** đã có giá sàn; nếu thị trường không chịu nổi giá sàn thì vấn đề nằm ở mô hình, không ở giá |
| Giảm giá để lấp sĩ số | Mỗi `ĐG` giảm phải bù bằng ~1 học viên mới; và giảm giá kéo giá của mọi khoá sau | Giữ giá, tăng giá trị gói, hoặc hoãn khoá |

**Công thức giá sàn:**

```
Giá sàn = ( F/N_mục_tiêu + v ) ÷ ( 1 − m − k )

  m = biên lợi nhuận mục tiêu (khuyến nghị ≥ 20% sau khi đã tính đủ 5 khoản ở §0)
  k = tỉ lệ chi phí bán hàng và chiết khấu bình quân (marketing, hoa hồng giới thiệu,
      học bổng, chương trình ưu đãi sớm)

Điều kiện bắt buộc: N_mục_tiêu dùng trong công thức phải là sĩ số THẬN TRỌNG,
không phải sĩ số kỳ vọng tốt nhất. Khuyến nghị lấy N_mục_tiêu = 110% × N₀.
```

> **Lỗi làm hỏng giá nhiều nhất:** chia `F` cho sĩ số tối đa của địa điểm. Giá ra rất đẹp,
> và chỉ đúng trong đúng một trường hợp — khoá tuyển đầy. Mọi khoá không đầy đều lỗ theo thiết kế.

### 4.2 Giá phải bao gồm phần 90 ngày

> **90 ngày không được bán như tuỳ chọn thêm.** Gói chuẩn = 7 ngày trại + 21 ngày giải mã +
> 90 ngày đồng hành. Học viên vào chương trình là vào cả ba.

| Lý do | Giải thích |
|---|---|
| **Chuyên môn** | 7 ngày tạo đột phá nhận thức; 90 ngày tạo thay đổi hành vi. Bán riêng 7 ngày là bán một nửa cơ chế và thu tiền như một sản phẩm hoàn chỉnh |
| **Đo lường** | Không có 90 ngày thì không có dữ liệu mức 3. Không có dữ liệu mức 3 thì không có bằng chứng hiệu quả — chỉ còn khảo sát hài lòng |
| **Kinh tế** | Khi 90 ngày là tuỳ chọn, tỉ lệ mua thấp, chi phí trên đầu học viên còn lại cao, và giai đoạn đó luôn bị xem là gánh nặng |
| **Hành vi tổ chức** | Cái gì có doanh thu thì được ưu tiên. Đây là quy luật, không phải vấn đề thái độ đội ngũ |

**Cơ cấu gói được phép bán:**

| Gói | Nội dung | Quy tắc |
|---|---|---|
| **Gói chuẩn** | Trại 7 ngày + Giải mã 21 ngày + Đồng hành 90 ngày + Báo cáo D118 | **Gói mặc định.** Mọi báo giá bắt đầu từ đây |
| **Gói năm** | Trọn Tầng 1 → Tầng 4 (365 ngày) + Review định kỳ + Portfolio | Nâng cấp từ gói chuẩn, có mức ưu đãi khi mua trước D-30 |
| **Gói rút gọn (7+21 ngày)** | Chỉ khi có **lý do được ghi văn bản** (gia đình chuyển nơi ở, lịch không cho phép) | Không quảng cáo · không đặt cạnh gói chuẩn như hai lựa chọn ngang nhau · Giám đốc chuyên môn duyệt từng ca |

### 4.3 Chiết khấu — quy tắc

| Loại | Được phép | Giới hạn |
|---|---|---|
| Ưu đãi ghi danh sớm (trước D-60) | ✅ | ≤ 8% `ĐG`, đổi lấy dòng tiền sớm và giảm rủi ro sĩ số |
| Anh chị em cùng gia đình | ✅ | Áp cho học viên thứ hai trở đi |
| Học bổng theo hoàn cảnh | ✅ | Có hội đồng xét, có hồ sơ, **hạch toán riêng** như chi phí xã hội, không giấu trong giảm giá |
| Học bổng thưởng hoàn thành 90 ngày | ✅ | **Trích lập dự phòng ở khoá phát sinh cam kết**, ghi giảm doanh thu ở khoá sử dụng |
| Giảm giá phút chót để lấp sĩ số | ❌ | Phá giá của mọi khoá sau và của mọi gia đình đã mua đúng giá |
| Tổng chiết khấu một khoá | — | **≤ 12% doanh thu gộp**. Vượt ngưỡng phải được Giám đốc duyệt bằng văn bản |

---

## 5. Chính sách thu, hoàn phí, hoãn khoá

### 5.1 Lịch thu

| Mốc | Khoản thu | Tỉ lệ | Ghi chú |
|---|---|---|---|
| Khi ghi danh | Đặt chỗ | 30% `ĐG` | Xác lập suất; là cơ sở tính sĩ số ở cổng C2 |
| D-30 | Đợt 2 | 40% `ĐG` | Trước thời điểm Học viện đặt cọc nhà cung cấp |
| D-10 | Đợt cuối | 30% `ĐG` | **Thu đủ trước khai giảng** — không nhận học viên còn nợ vào trại |
| D+7 (nếu mua bổ sung gói năm) | Chênh lệch gói | Theo bảng giá | |

### 5.2 Bảng hoàn phí theo mốc thời gian

| Thời điểm gia đình báo dừng | Tỉ lệ hoàn | Lý do của mức này |
|---|---|---|
| Trước **D-45** | **100%** | Học viện chưa phát sinh cam kết với nhà cung cấp |
| **D-45 → D-31** | **80%** | Đã phát sinh chi phí tuyển sinh và chuẩn bị |
| **D-30 → D-16** | **50%** | Đã đặt cọc địa điểm, xe, in ấn theo sĩ số đã chốt |
| **D-15 → D-1** | **20%** | Suất ăn, phòng, đồng phục, học liệu đã đặt theo tên |
| Sau khai giảng, vì lý do cá nhân | **0% tiền trại**; phần 90 ngày chưa dùng được **bảo lưu 12 tháng** | Chi phí trại đã phát sinh; chi phí Coach thì chưa |
| **Học viện huỷ hoặc hoãn khoá** | **100%**, hoặc chuyển khoá sau kèm ưu đãi | Rủi ro tổ chức thuộc về Học viện, không thuộc về gia đình |
| Học viên phải rời trại vì **lý do y tế** | Hoàn phần chưa sử dụng theo ngày + **bảo lưu toàn bộ phần 90 ngày** | Không để gia đình chịu thiệt vì sự cố sức khoẻ |
| Học viên rời trại vì **vi phạm quy tắc an toàn nghiêm trọng** | Theo quy chế riêng, có hội đồng | Quyết định chuyên môn, không phải quyết định tài chính |

### 5.3 Hoãn khoá và bảo lưu

| Trường hợp | Quy định |
|---|---|
| Gia đình xin hoãn sang khoá sau | Được **1 lần**, báo trước ≥ 15 ngày, giữ nguyên giá đã đóng; hoãn lần 2 áp dụng bảng hoàn phí |
| Bảo lưu phần 90 ngày | Tối đa **12 tháng**; khi kích hoạt phải có Coach được phân công bằng văn bản |
| Học viện hoãn khoá | Thông báo chậm nhất tại cổng C2 (D-20); gia đình chọn hoàn 100% hoặc chuyển khoá kèm ưu đãi |

> **Nguyên tắc minh bạch:** bảng ở §5.2 phải được **in trong hợp đồng và gửi trước khi thu tiền
> đặt chỗ**, không để ở phụ lục và không viết bằng chữ nhỏ. Một chính sách hoàn phí rõ ràng
> làm giảm tỉ lệ tranh chấp nhiều hơn bất kỳ nỗ lực thuyết phục nào sau khi đã xảy ra chuyện.

---

## 6. Kiểm soát chi trong khoá

### 6.1 Ai duyệt chi gì

| Loại chi | Người duyệt | Hạn mức | Chứng từ bắt buộc |
|---|---|---|---|
| Chi trong dự toán, đúng dòng | Quản trại | Đến **0,05 ĐG**/lần | Hoá đơn hoặc phiếu chi có chữ ký người nhận |
| Chi trong dự toán, vượt hạn mức trên | Quản trại + Kế toán xác nhận | Đến **0,2 ĐG**/lần | Hoá đơn + ghi rõ dòng dự toán |
| **Phát sinh ngoài dự toán** | Giám đốc duyệt (được duyệt qua tin nhắn, bổ sung văn bản trong 24 giờ) | Trong **quỹ dự phòng** đã lập | Phiếu đề nghị + lý do + ảnh chứng từ |
| **Chi y tế khẩn cấp** | **Không cần duyệt trước** — thực hiện ngay, báo cáo trong 12 giờ | Không hạn mức | Hồ sơ y tế + chứng từ |
| Chi ảnh hưởng an toàn (thuê thêm cứu hộ, thuê xe cấp cứu chờ, đổi nhà cung cấp thực phẩm) | Trainer trưởng đề xuất, Giám đốc duyệt | Ưu tiên tuyệt đối trong dự phòng | Biên bản lý do |

> **Ngoại lệ y tế khẩn cấp là ngoại lệ có chủ ý.** Một quy trình duyệt chi làm chậm xử lý y tế
> là một quy trình sai. Người giữ quỹ tại trại được thông báo rõ điều này trước khi khoá bắt đầu.

### 6.2 Quy tắc quỹ tại trại

| Quy tắc | Nội dung |
|---|---|
| **Một người giữ quỹ** | Quản trại. Không chia quỹ cho nhiều người để "cho tiện" |
| **Sổ quỹ ghi hằng ngày** | Cuối mỗi ngày chốt số dư, chụp ảnh sổ gửi Kế toán |
| **Không chi tiền mặt cho khoản có thể chuyển khoản** | Giảm thất thoát và giảm tranh cãi khi quyết toán |
| **Không ứng tiền cá nhân của nhân sự** | Nếu buộc phải ứng, lập phiếu ngay trong ngày, hoàn trong 48 giờ sau khoá |
| **Tách quỹ khoá khỏi quỹ thưởng học viên** | Hai sổ riêng; quỹ thưởng có cơ chế trích lập riêng |
| **Đối chiếu giữa khoá** | Cuối D4, Kế toán đối chiếu thực chi so với dự toán và cảnh báo nếu lệch > 10% |

### 6.3 Xử lý phát sinh

| Tình huống phát sinh | Xử lý tài chính |
|---|---|
| Sĩ số thực tăng so với chốt | Kiểm **tỉ lệ ACT trước**, chi phí sau. Nếu vượt 1/8–1/10, tuyển bổ sung ACT là chi bắt buộc |
| Thời tiết buộc đổi hoạt động | Dùng dự phòng vận hành; ghi biên bản đổi kế hoạch |
| Sự cố y tế cần chuyển viện | Dự phòng y tế; chi trước, đối chiếu bảo hiểm sau |
| Nhà cung cấp thực phẩm không đạt kiểm tra | Đổi ngay, chấp nhận chi phí cao hơn; **không đàm phán tiếp với nhà cung cấp đã trượt** |
| Hỏng thiết bị | Thuê thay thế trong dự phòng; ghi vào bài học để bổ sung dòng khấu hao khoá sau |
| Dự phòng đã dùng hết trước D5 | Giám đốc vào cuộc; mọi chi tiếp theo cần duyệt từng khoản |

---

## 7. Năm khoản không bao giờ được cắt

> Khi sĩ số thiếu và ai đó bắt đầu tìm chỗ cắt, năm khoản dưới đây **không nằm trong danh sách
> có thể bàn**. Cắt bất kỳ khoản nào trong số này không phải là tiết kiệm chi phí —
> **đó là chuyển rủi ro từ bảng cân đối kế toán sang thân thể của một đứa trẻ.**

| # | Khoản | Vì sao cắt khoản này là cắt vào an toàn | Ngưỡng tối thiểu tuyệt đối |
|---|---|---|---|
| 1 | **Bảo hiểm** (học viên · nhân sự · trách nhiệm đơn vị tổ chức) | Chi phí bảo hiểm nhỏ so với rủi ro nó che. Một sự cố không được bảo hiểm có thể vượt lợi nhuận của nhiều khoá; và gia đình phải tự gánh phần lẽ ra Học viện gánh | Đủ ba loại, hiệu lực bao trọn D1→D7 cộng ngày di chuyển. **Không có bảo hiểm thì không khai giảng** — cổng C4 |
| 2 | **Bốn vị trí chuyên trách `A1`** | Cắt bằng cách cho kiêm nhiệm. Nhưng đúng lúc cần chuyên viên tâm lý là lúc Trainer đang dẫn hoạt động; đúng lúc cần cứu hộ là lúc ACT đang trông nhóm mình. Kiêm nhiệm nghĩa là **không có** | 4 vị trí, không kiêm nhiệm, y tế đủ 2 ca phủ 24/7, cứu hộ đủ theo số điểm nước |
| 3 | **Tỉ lệ nhân sự trên học viên** | Tỉ lệ 1 ACT / 8–10 HV (1/8 với nhóm 9–11 tuổi) là điều kiện của cả an toàn lẫn chất lượng dữ liệu. Nới tỉ lệ để tiết kiệm làm hỏng đồng thời hai thứ: khả năng trông trẻ và khả năng quan sát để chấm rubric | Không nới tỉ lệ trong bất kỳ tình huống nào. Sĩ số vượt → **tuyển thêm ACT hoặc không nhận thêm học viên** |
| 4 | **Thực phẩm an toàn** | Đây là khoản dễ cắt nhất vì hậu quả không hiện ra ngay và nhà cung cấp rẻ hơn luôn có sẵn. Một vụ ngộ độc tập thể ở trại lưu trú trẻ em là sự cố không phục hồi được — cả về sức khoẻ lẫn về khả năng tồn tại của thương hiệu | Hợp đồng có nguồn gốc thực phẩm · lưu mẫu đủ thời gian quy định · bếp được kiểm tra trước D-1 · có phương án cho học viên dị ứng |
| 5 | **Dự phòng y tế và dự phòng vận hành** | Dự phòng bị coi là "phần chưa tiêu" nên bị cắt đầu tiên. Nhưng dự phòng chính là **khả năng phản ứng**: xe chuyển viện, thuốc bổ sung, thuê thay thế khi hỏng. Cắt dự phòng là chọn cách xử lý sự cố bằng ứng tiền cá nhân giữa đêm | ≥ 8–10% tổng chi (A→H), trong đó phần dự phòng y tế được tách riêng và **không dùng cho việc khác** |

**Ba dấu hiệu cảnh báo đội tài chính phải báo lên ngay:**

| ⬜ | Dấu hiệu |
|---|---|
| ⬜ | Dự toán có dòng của 5 khoản trên nhưng số tiền bằng 0 hoặc bỏ trống |
| ⬜ | Có đề xuất "gộp" một trong bốn vị trí `A1` vào vai trò khác để tiết kiệm |
| ⬜ | Dự phòng bị chuyển sang bù cho khoản khác trước ngày D1 |

---

## 8. Báo cáo tài chính sau khoá

### 8.1 Mẫu báo cáo

| Phần | Nội dung | Người lập |
|---|---|---|
| 1 | **Tóm tắt**: sĩ số chốt / sĩ số thực · doanh thu · tổng chi · lợi nhuận gộp · biên | Kế toán |
| 2 | **So sánh dự toán – thực chi theo 9 nhóm A→I**, kèm cột chênh lệch tuyệt đối và % | Kế toán |
| 3 | **Phân tích chênh lệch**: mọi nhóm lệch > ±10% phải có dòng giải thích cơ chế | Kế toán + Quản trại |
| 4 | **Kiểm điểm hoà vốn**: `N₀` dự tính so với `N₀` tính lại theo chi phí thực | Kế toán |
| 5 | **Chi phí trên đầu học viên**, so với 3 khoá gần nhất | Kế toán |
| 6 | **Trạng thái 5 khoản không được cắt**: đủ / thiếu / thay đổi so với dự toán | Trainer trưởng ký xác nhận |
| 7 | **Chi phí sau trại đã bố trí**: quỹ Coach 90 ngày, nền tảng, báo cáo D118 — **đã khoá riêng chưa** | Kế toán + Giám đốc |
| 8 | **Dự phòng**: đã lập bao nhiêu · dùng bao nhiêu · dùng vào việc gì | Quản trại |
| 9 | **Trích lập quỹ thưởng 90 ngày** = (số HV vào Tầng 3) × mức thưởng × tỉ lệ hoàn thành dự kiến | Kế toán |
| 10 | **Ba bài học tài chính** cho khoá sau, mỗi bài kèm việc cụ thể và người chịu trách nhiệm | Kế toán + Giám đốc |

### 8.2 Ai đọc, dùng để làm gì

| Người đọc | Dùng để |
|---|---|
| **Giám đốc** | Quyết định giá và quy mô khoá sau; duyệt hạ bậc hoặc đổi địa điểm |
| **Kế toán** | Cập nhật `F` và `v` cho dự toán khoá sau bằng số thực, không bằng số cũ |
| **Trainer trưởng** | Kiểm rằng chuẩn chuyên môn và chuẩn `A1` không bị đánh đổi lấy chi phí |
| **Quản trại** | Sửa quy trình chi tại hiện trường ở khoá sau |
| **Đơn vị nhận quyền** (nếu có) | Đối chiếu kinh tế đơn vị và tính phí bản quyền theo doanh thu ghi nhận trên nền tảng |

### 8.3 Mốc thời gian

| Mốc | Việc |
|---|---|
| D+3 | Quyết toán quỹ tại trại; Quản trại bàn giao sổ và chứng từ |
| D+10 | Quyết toán khoá: thực chi so với dự toán, phân tích chênh lệch |
| D+15 | Báo cáo tài chính khoá trình Ban lãnh đạo; **khoá riêng quỹ Coach 90 ngày** |
| D+20 | Cập nhật `F`, `v`, `N₀` vào mẫu dự toán cho khoá kế tiếp |
| D+120 | Đối chiếu chi phí sau trại thực tế với phần đã trích; điều chỉnh `v` cho các khoá sau |

> **Chỉ số cần trung thực nhất trong báo cáo này là chi phí sau trại thực tế.** Nếu quyết toán
> D+120 cho thấy chi phí Coach 90 ngày thấp hơn nhiều so với phần đã trích, câu hỏi đúng
> **không phải** "vậy là tiết kiệm được" mà là "**giai đoạn 90 ngày có được chạy đủ không**".
> Đối chiếu ngay với tỉ lệ duy trì đến hết Tầng 3 và tỉ lệ hồ sơ có đủ dữ liệu KPI tại D118.

---

## 9. Liên kết

- Khung tài chính khoá: [`10-tai-chinh.md`](10-tai-chinh.md)
- Tài chính nhượng quyền và kinh tế đơn vị: [`../nhuong-quyen-leader-boom/07-tai-chinh.md`](../nhuong-quyen-leader-boom/07-tai-chinh.md)
- Chuẩn vận hành `A1`–`A10`: [`../nhuong-quyen-leader-boom/05-chuan-van-hanh.md`](../nhuong-quyen-leader-boom/05-chuan-van-hanh.md)
- Nhân sự và tỉ lệ ACT: [`../leader-boom-365/10-nhan-su-van-hanh.md`](../leader-boom-365/10-nhan-su-van-hanh.md)
- Y tế và an toàn: [`09-y-te-an-toan.md`](09-y-te-an-toan.md) · [`18-y-te-an-toan-chi-tiet.md`](18-y-te-an-toan-chi-tiet.md)
- Hệ thống 90 ngày (nguồn của chi phí sau trại): [`13-he-thong-90-ngay.md`](13-he-thong-90-ngay.md)
- Chuẩn bị D-90 → D-1 và các cổng C1–C4: [`04-chuan-bi-D90-D1.md`](04-chuan-bi-D90-D1.md) · [`20-chuan-bi-chi-tiet.md`](20-chuan-bi-chi-tiet.md)
- Tuyển sinh và dự báo sĩ số: [`03-tuyen-sinh.md`](03-tuyen-sinh.md) · [`19-tuyen-sinh-chi-tiet.md`](19-tuyen-sinh-chi-tiet.md)
- Đo lường hiệu quả: [`../leader-boom-365/17-do-luong-hieu-qua-chi-tiet.md`](../leader-boom-365/17-do-luong-hieu-qua-chi-tiet.md)
