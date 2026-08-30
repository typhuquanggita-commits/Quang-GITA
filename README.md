# HSA365

**Nền tảng luyện thi Đánh giá năng lực HSA (ĐHQGHN) theo lộ trình cá nhân hóa.**

Bám đúng cấu trúc bài thi HSA: **150 câu / 195 phút / thang 150 điểm**, chia ba phần
Tư duy định lượng (Toán, 50 câu / 75 phút), Tư duy định tính (Ngôn ngữ — Văn học,
50 câu / 60 phút) và phần tự chọn Khoa học hoặc Tiếng Anh (50 câu / 60 phút).
Theo dạng thức chính thức áp dụng từ 2026, chọn Khoa học nghĩa là chọn **đúng ba
trong năm chủ đề** — Vật lý, Hóa học, Sinh học, Lịch sử, Địa lý — mỗi chủ đề 16–17
câu, và mỗi chủ đề Lý, Hóa, Sinh có ít nhất một câu điền đáp án.

> **Về mốc điểm.** HSA chấm trên thang **150**, nên không tồn tại mốc 1400 điểm.
> Mục tiêu mặc định của ứng dụng đặt ở **140/150** — mức tương ứng nhóm dẫn đầu phổ
> điểm. Bạn đổi được con số này trong **Cài đặt → Mục tiêu thi**.

---

## Có gì trong này

| Khối | Nội dung |
|---|---|
| **Mô thức GITA** | Bốn trụ cột Goal — Inspirits — Talent — Action, ba nhịp áp dụng, năm tầng hấp thu, năm cấp chuyên môn, năm cấp độ hành động 20/80, mười hai thói quen, ba môi trường |
| **Chương trình học** | **2.000 phiếu luyện** và **2.000 nhiệm vụ**, 6 loại phiếu cho mỗi chuyên đề, 6 cấp độ, 3 giai đoạn, phân bổ theo đúng tỉ trọng đề thi |
| **Tài liệu đi kèm** | Mỗi phiếu có một **phiếu lời giải + bảng phân tích chuyên sâu** riêng; mỗi chuyên đề có một **phiếu hướng dẫn ôn chắc** |
| **Dòng chảy học tập** | Làm từng chặng → chấm → báo kết quả → nhận xét → giải pháp → định hướng → xét lên cấp |
| **Thi thử** | Đề mô phỏng full 3 phần và theo từng phần, đồng hồ riêng cho mỗi phần, chấm và quy đổi về thang 150 |
| **Sổ tay lỗi sai** | Ôn tập ngắt quãng (SM-2 hiệu chỉnh) cho câu sai, câu đoán trúng và câu làm quá chậm |
| **Hồ sơ học viên** | Lưu nguyên vẹn từng lượt làm, phân loại lỗi kiến thức / kỹ năng / chiến thuật, sinh lộ trình cá nhân hóa |
| **Phân tích năng lực** | Mô hình Rasch (IRT 1 tham số), điểm dự báo, chỉ số sẵn sàng 5 trụ cột, hiệu chuẩn mức tự tin |
| **Lộ trình** | Giai đoạn theo ngày thi, mốc theo tuần, thứ tự ưu tiên chuyên đề |
| **Phân quyền** | 10 vai trò × cấp bậc, 30 quyền, tách đặc quyền theo nguyên tắc tối thiểu, cộng cổng mở tính năng theo cấp độ học viên |
| **Gia sư AI** | Tùy chọn (Gemini): giảng lại cách khác, gợi ý không lộ đáp án, ra câu tương tự, tư vấn kế hoạch tuần |
| **Tài liệu bổ trợ** | 11 tài liệu trong `docs/GITA/`, phân theo vai trò và theo tầng, dùng chung nguồn dữ liệu với sản phẩm |

Chạy hoàn toàn phía trình duyệt, **không cần máy chủ**, có **PWA ngoại tuyến**, dữ liệu
học tập nằm trên máy người dùng và xuất/nhập được bằng JSON.

---

## Chạy thử

```bash
npm install
npm run dev          # http://localhost:3000
```

Các lệnh khác:

```bash
npm run verify       # typecheck + toàn bộ test + build
npm run test         # 300 bài test
npm run build        # dựng bản phát hành vào dist/
npm run preview      # xem thử bản đã dựng
npm run catalogue    # xuất 2000 phiếu + 2000 nhiệm vụ + 33 phiếu hướng dẫn ra catalogue/*.csv
```

**Gia sư AI (tùy chọn).** Ứng dụng chạy đầy đủ khi không có khóa API. Muốn bật, đặt
khóa Gemini trong **Cài đặt → Gia sư AI**, hoặc tạo tệp `.env.local`:

```
GEMINI_API_KEY=...
```

> Khóa nằm ở phía trình duyệt nên chỉ phù hợp khi dùng cá nhân. Triển khai cho nhiều
> người học thì phải đặt một máy chủ trung gian giữ khóa.

**Triển khai dưới thư mục con** (ví dụ GitHub Pages): đặt `APP_BASE=/ten-repo/` khi
build. Ứng dụng dùng định tuyến bằng hash nên không cần cấu hình rewrite phía máy chủ.

---

## Mô thức huấn luyện GITA

GITA là bốn **trụ cột** nâng đỡ lẫn nhau, không phải bốn bước nối tiếp. Thiếu bất
kỳ trụ nào thì ba trụ còn lại đều sụp.

| | Trụ cột | Câu hỏi nó trả lời | HSA365 đo bằng |
|---|---|---|---|
| **G** | **Goal** — hệ thống mục tiêu, kết quả xuất sắc, đích đến | Đích của tôi là gì, và tôi biết mình đã tới bằng cách nào? | Đã đặt mục tiêu, ngày thi, bản đồ năng lực, và mục tiêu có nối xuống việc hôm nay |
| **I** | **Inspirits** — động lực, khát khao, nội lực, niềm tin, bản lĩnh | Điều gì kéo tôi ngồi vào bàn ngày thứ 40, khi cảm hứng đã hết? | Chuỗi ngày, tỉ lệ giữ thói quen, tỉ lệ không bỏ dở, mức tự tin khai báo trung thực |
| **T** | **Talent** — tài năng, điểm mạnh, tư duy xuất sắc, tốc độ, tập trung | Đâu là thế mạnh riêng của tôi, và tôi mài nó sắc đến đâu? | Cấp tuyến mạnh nhất, số tuyến vượt trội, tốc độ so với chuẩn, số câu sa lầy |
| **A** | **Action / Academy** — quyết đoán, kiên trì, tối ưu, thói quen thành công, 20/80, đội nhóm | Hôm nay tôi làm gì, và 20% việc nào tạo ra 80% kết quả? | Khối lượng luyện, độ tập trung vào vùng 20/80, ôn đúng hạn, cấp độ hành động |

Hầu hết sản phẩm luyện thi chỉ đo trụ **Action** — số câu, số giờ, chuỗi ngày.
HSA365 đo cả bốn và hiển thị **trụ nào đang trống**: người chăm chỉ mà không tiến
bộ thường không thiếu nỗ lực, họ thiếu một trong ba trụ còn lại.

**Vùng 20/80 được tính, không được hô.** Hệ thống xếp chuyên đề theo *số điểm có
thể lấy lại* = trọng số trong đề × khoảng còn thiếu, cắt ở ngưỡng tích lũy 80%, rồi
đối chiếu với hành vi thật 14 ngày qua để cho biết công sức có rơi đúng chỗ không.

**Hai trục phân tầng, không bao giờ trộn lẫn:** H1–H5 cho người học (suy ra từ
hành vi, không phải tự khai), P1–P5 cho tư vấn viên — giáo viên — coach (công nhận
bằng bằng chứng, không phải thâm niên).

Toàn bộ mô thức được định nghĩa **một lần** trong
[`src/data/gita.ts`](src/data/gita.ts). Màn hình **Mô thức GITA** in ra chính dữ
liệu đó, các tài liệu trong [`docs/GITA/`](docs/GITA/) diễn giải chính cấu trúc
đó, và `tests/gita.test.ts` canh giữ tính toàn vẹn của nó — nên tài liệu, giao
diện và hành vi không bao giờ lệch nhau.

📘 Bắt đầu từ [`docs/GITA/00-KHUNG-GITA.md`](docs/GITA/00-KHUNG-GITA.md).

---

## Chương trình 2.000 phiếu luyện

Bộ phiếu **không được gõ tay** thành 2000 tệp rời rạc — cách đó không kiểm tra được
tính nhất quán và sẽ lệch ngay khi khung chương trình thay đổi. Mỗi phiếu được **sinh
ra từ một đặc tả**: `(chuyên đề × cấp độ × dạng phiếu)`. Ba tính chất được bảo đảm
bằng xây dựng và có bài test canh giữ:

1. **Đúng 2.000 phiếu** — phân bổ bằng phương pháp số dư lớn nhất (Hare) trên 198 ô
   (33 chuyên đề × 6 cấp độ).
2. **Đúng tỉ trọng đề thật** — số phiếu của một chuyên đề tỉ lệ thuận với tỉ trọng
   xuất hiện của chuyên đề đó trong đề thi, nên thời gian học đi đúng chỗ.
3. **Tái lập được** — không dùng `Math.random` ở bất kỳ đâu; cùng một mã phiếu luôn
   cho ra đúng một bộ câu hỏi, trên mọi máy và mọi lần mở.

Chi tiết: [`docs/CHUONG-TRINH.md`](docs/CHUONG-TRINH.md).

### Sáu loại phiếu của mỗi chuyên đề

| Mã | Loại phiếu | Trả lời câu hỏi |
|---|---|---|
| **LT** | Phiếu lý thuyết | Tôi có nắm đúng khái niệm và công thức không? |
| **DB** | Phiếu dạng bài & đọc vị | Nhìn đề là biết ngay đây là dạng gì chưa? |
| **KN** | Phiếu kỹ năng & phương pháp | Tôi có làm gọn và đúng quy trình không? |
| **NC** | Phiếu luyện nâng cao | Tôi xử lý được câu nhiều bước và có bẫy không? |
| **OT** | Phiếu ôn thi | Trộn mọi dạng, tôi còn nhận ra được không? |
| **PT** | Phiếu thi | Dưới áp lực thời gian thật, tôi được bao nhiêu? |

Bỏ qua bước **DB** là lý do phổ biến nhất khiến người học "hiểu bài mà không làm
được": họ biết cách giải nhưng không nhận ra khi nào thì dùng cách nào.

Mỗi phiếu đi kèm hai tài liệu riêng:

```
PL-TOA-STA-L3-004   Phiếu luyện     — bài để làm
LG-TOA-STA-L3-004   Phiếu lời giải  — lời giải đầy đủ + bảng phân tích chuyên sâu
HD-TOA-STA          Phiếu hướng dẫn — một phiếu ôn chắc cho cả chuyên đề
```

### Đề cương 32 tuần — cả chặng đường trông như thế nào

Lộ trình hằng ngày trả lời *"hôm nay làm gì"*. Đề cương trả lời câu khác hẳn: **cả chặng
đường trông như thế nào**. Thiếu câu thứ hai, người học sống trong một chuỗi việc vặt không
có hình dáng — trạng thái khiến người ta bỏ cuộc dù vẫn đang tiến bộ.

Ba giai đoạn, 32 tuần, 7 cột mốc. Mỗi tuần có mục tiêu viết ở dạng **kết quả quan sát được**
và một cách **tự kiểm là một việc làm được**, không phải một cảm giác. Mỗi giai đoạn nêu rõ
**cái bẫy đặc trưng** của nó — ví dụ giai đoạn Nền tảng: *nôn nóng luyện đề khi nền chưa đủ,
cho ra một chuỗi điểm thấp lặp lại và bào mòn động lực nhanh hơn bất cứ thứ gì.*

Đây cũng là thứ **gia đình đọc được**: một phụ huynh không đọc nổi bảng năng lực Rasch nhưng
đọc được một bảng 32 tuần, và đó là thứ họ cần để tin rằng có một kế hoạch thật.

### Kỳ thi cấp chứng chỉ HSA365

Một học viên ôn tám tháng vẫn có thể không biết mình đang ở đâu. Điểm các buổi luyện lên
xuống thất thường, và câu hỏi *"mình có ổn không"* không có câu trả lời nào ngoài cảm giác —
nên nhiều người bước vào phòng thi thật lần đầu với đúng một thứ: hy vọng.

Kỳ sát hạch này biến cảm giác thành **bằng chứng**. Nó khác một bài thi thử ở ba điểm, và cả
ba đều có chủ đích:

1. **Có quy chế** — làm một lần, không dừng giữa chừng. Chính sự không thể làm lại tạo ra áp
   lực giống phòng thi thật, và áp lực đó cần được tập trước.
2. **Có bậc** — Đồng · Bạc · Vàng · Kim cương. Một con số nói *"bạn được 97 điểm"*; một bậc
   nói *"bạn đang ở đâu và cần gì để lên tiếp"*.
3. **Có văn bản** — chứng chỉ in được, có mã tra cứu. Một tờ giấy cầm được làm thay đổi cách
   một người 17 tuổi nói về bản thân, và sự tự tin đó đi theo họ vào phòng thi.

Điểm quan trọng nhất của barem: **mỗi bậc yêu cầu cả tổng điểm lẫn điểm sàn từng phần.**
Một người 45/50 Toán nhưng 18/50 Văn có tổng 108 điểm trông đẹp — nhưng sẽ thất bại ở đề
thật, vì đề thật không cho bỏ qua một phần. *(Có test canh giữ đúng trường hợp này.)*

Và chứng chỉ **in thẳng dòng tuyên bố giới hạn** lên chính nó: đây là chứng chỉ của HSA365,
không phải của ĐHQGHN, không có giá trị xét tuyển. Một tờ giấy nói quá về chính nó sẽ làm
hỏng niềm tin vào mọi thứ còn lại.

### Cửa vào: bài kiểm tra định vị

36 câu, 12 mỗi phần thi, **chọn thích ứng**: sau mỗi câu hệ thống ước lượng lại năng lực
rồi chọn câu tiếp theo có độ khó gần năng lực đó nhất. Một câu quá dễ hay quá khó gần như
không mang thông tin gì — ai cũng đúng, hoặc ai cũng sai — nên 12 câu cho ra sai số tương
đương một đề cố định dài gấp đôi.

Kết quả gieo **cấp độ khởi điểm cho cả 33 tuyến**, mức thành thạo ban đầu, điểm dự báo và
đưa mọi câu sai thẳng vào sổ tay lỗi sai. Không có bước này thì mọi người học đều xuất
phát từ cùng một điểm mặc định — nghĩa là người mới, người cần giúp nhất, lại nhận được
ít hướng dẫn nhất.

Hai giới hạn được tuyên bố thẳng trên màn hình thay vì giấu đi: bài này định vị ở mức
**phần thi, không phải từng chuyên đề** (12 câu không đủ định vị 10 chuyên đề riêng biệt),
và nó chỉ xếp tới **tối đa cấp 4** — cấp cao hơn phải chứng minh bằng phiếu thật.

### Lộ trình cá nhân hóa — ngân sách giờ và phân bổ theo lợi ích biên

Bài định vị nói *"bạn đang ở đâu"*. Lộ trình trả lời hai câu tiếp theo: **giờ học tiếp
theo nên đặt vào đâu**, và **với nhịp này thì trong 6 tháng đến 1 năm bạn chạm được bao
nhiêu điểm**.

Mô hình dựng trên ba nguyên tắc:

1. **Mọi con số đều truy ngược được.** Điểm dự báo đi qua đúng một chuỗi: độ thành thạo →
   năng lực θ → tỉ lệ đúng kỳ vọng trên phân bố độ khó chuẩn → điểm trên thang 50 mỗi
   phần. Không có hệ số tùy ý nào được thêm vào giữa chuỗi đó. Cùng một chuỗi này được
   dùng ở bảng tổng quan và ở bài định vị, có test khóa lại để ba nơi không bao giờ lệch.

2. **Phân bổ giờ theo lợi ích biên, không theo cảm tính.** Đường học tập bão hòa —
   `mastery(h) = trần − (trần − nay)·e^(−h/τ)` với τ ≈ 11 giờ mỗi chuyên đề — nên mỗi giờ
   thêm vào một chuyên đề cho ít điểm hơn giờ trước. Thuật toán đặt từng giờ vào chuyên đề
   đang cho **nhiều điểm nhất cho chính giờ đó**. Hệ quả đáng chú ý: chuyên đề yếu nhất
   không phải lúc nào cũng là chỗ đáng đầu tư nhất — chuyên đề có trọng số lớn trong đề và
   còn nhiều dư địa mới là.

3. **Nói thẳng khi mục tiêu không khả thi.** Nếu quỹ thời gian còn lại không đủ chạm mục
   tiêu, hệ thống nói ra và đưa hai lựa chọn có thật: tăng nhịp lên bao nhiêu giờ mỗi
   tuần, hoặc điểm cao nhất quỹ này thực sự cho phép. Một lộ trình hứa hẹn điều không xảy
   ra là một lộ trình có hại — người học chỉ phát hiện sự thật vào đúng ngày thi.

Ví dụ với một người mới bắt đầu (điểm nền 83,9):

| Nhịp | 6 tháng | 8 tháng | 12 tháng |
|---|---|---|---|
| 30 câu/ngày (9,1 h/tuần) | 117 | 121 | **131** |
| 50 câu/ngày (15,2 h/tuần) | 127 | 131 | **139** |

Một lưu ý về mục tiêu: HSA chấm trên **thang 150**, nên "1400 điểm" không tồn tại — mục
tiêu tinh hoa tương đương là **140/150**. Nhưng điểm cao nhất các mùa gần đây nằm trong
khoảng **125–135**, nên hệ thống gắn nhãn cảnh báo cho mọi mục tiêu trên 135 thay vì im
lặng nhận lời.

Một lần chạy phân bổ tới trần rồi ghi lại đường điểm theo số giờ, nên ba con số — điểm với
nhịp hiện tại, trần của quỹ, nhịp tối thiểu cần có — luôn nhất quán vì đến từ cùng một lần
chạy. Lợi ích biên tính trong thời gian hằng số, vì điểm một phần chỉ phụ thuộc độ thành
thạo trung bình có trọng số của phần đó.

### Đề mẫu trọn vẹn kèm barem

Hệ thống vẫn sinh được đề thi thử từ ma trận — nhưng **ma trận không phải đề**. Một ma trận
nói "35 câu trắc nghiệm, 15 câu điền, độ khó phân bố thế này"; một đề mẫu là một **văn bản
cụ thể**: có mã số, thứ tự câu cố định, có đáp án và có barem — thứ giáo viên in ra phát
cho cả lớp, và hai người đọc thì thấy đúng một nội dung.

**Năm đề mẫu chính thức**, mỗi tổ hợp phần 3 một đề, mỗi đề **150 câu / 195 phút /
thang 150 điểm**. Bốn chế độ xem, và thứ tự của chúng có chủ ý — *Đề thi* đứng trước *Đáp
án*, vì một tài liệu mở ra là thấy đáp án thì không còn là đề thi nữa:

| Chế độ | Nội dung |
|---|---|
| **Đề thi** | Không có đáp án. In ra là làm được. |
| **Ma trận** | Số câu mỗi chuyên đề theo từng mức độ khó |
| **Đáp án & barem** | Bảng tra nhanh + luật chấm + thang xếp loại |
| **Lời giải** | Đầy đủ, kèm bẫy từng phương án và đọc vị dạng bài |

Barem không chỉ liệt kê luật mà **nêu hệ quả của từng luật** — vì luật chấm quyết định
chiến thuật làm bài: *không trừ điểm câu sai* nghĩa là bỏ trống không bao giờ lợi hơn đoán;
*mọi câu đều 1 điểm* nghĩa là quỳ ở một câu khó để mất ba câu dễ là lỗ nặng.

Đề vẫn **sinh từ đặc tả** chứ không gõ tay 750 câu, cùng lý do với 2.000 phiếu: gõ tay thì
không kiểm được tính nhất quán với ma trận. Nhưng mỗi mã đề dùng một **hạt giống cố định**,
nên cùng một mã luôn cho ra đúng một đề trên mọi máy, và thêm câu vào ngân hàng không làm
xáo trộn đề đã phát.

### Kho bí kíp — tầng sâu của bộ giải đề

Bộ kiến thức trả lời *"phải ôn lại cái gì"*. Kho bí kíp trả lời ba câu hỏi khó hơn nhiều:

1. **Đọc vị** — nhìn vào đâu trên đề là biết ngay đây là dạng nào?
2. **Phương pháp** — dạng này giải bằng đường lối gì, và **vì sao** là đường đó?
3. **Bước giải** — làm gì trước, làm gì sau, và mỗi bước **để làm gì**?

Kèm theo là mẹo xử lý nhanh và sai lầm đặc trưng của riêng từng dạng.

| | |
|---|---|
| 33 chuyên đề | mỗi chuyên đề một "câu hỏi lớn" |
| **99 dạng bài** | mỗi dạng có phương pháp riêng |
| **212 dấu hiệu đọc vị** | đều là thứ **nhìn thấy được trên đề** |
| **396 bước giải** | mỗi bước nói được nó để làm gì |
| **99 bí kíp** | kèm điều kiện "dùng khi nào" |

Vì sao tách thành một tầng riêng: lời giải của *một* câu chỉ dạy được câu đó. Người học
đọc xong gật gù "hiểu rồi", hôm sau gặp câu tương tự vẫn tắc — vì thứ họ thiếu không phải
phép biến đổi mà là **cái nhìn đầu tiên**: đề này thuộc dạng gì. Đó là thứ giáo viên giỏi
có sau vài nghìn đề, và gần như không bao giờ được viết ra.

Và vì **cả 2.000 phiếu đều soạn bộ giải đề từ đây**, viết một lần là 2.000 phiếu cùng sâu
— thay vì vài phiếu được viết tay kỹ lưỡng còn lại thì sơ sài.

Có test canh giữ chất lượng chứ không chỉ canh số lượng: mỗi bước giải **bắt buộc** nói
được mục đích (một bước không giải thích được mục đích là một bước học thuộc, và học thuộc
thì quên ngay trong phòng thi); mỗi dấu hiệu đọc vị phải đủ cụ thể; mỗi bí kíp phải nói rõ
lúc nào thì dùng.

### Hệ bài giảng — tầng giữa BIẾT và LÀM ĐƯỢC

Phiếu kiến thức nói *"phải nắm gì"*. Kho bí kíp nói *"gặp dạng này thì làm thế nào"*.
Giữa chúng còn một khoảng trống mà hầu hết tài liệu trên thị trường cũng bỏ: **nhìn một
người làm mẫu từ đầu đến cuối**, có con số cụ thể, có cả chỗ họ dừng lại để cân nhắc.

Mỗi chuyên đề có một bài giảng bốn phần:

1. **Vì sao chuyên đề này đáng học** — nói bằng số câu trong đề, không bằng lời động viên.
2. **Mạch kiến thức** — các ý theo đúng thứ tự dạy, mỗi ý kèm một câu tự kiểm có đáp án.
3. **Ví dụ mẫu giải từng bước** — mỗi bước có **việc làm** và **lý do làm bước đó**.
4. **Một lời giải SAI, mổ tận nơi** — trình bày đầy đủ như thật, đánh dấu đúng bước nó rẽ
   nhầm, giải thích vì sao lỗi đó dễ mắc, rồi sửa lại từ bước đó.

| | |
|---|---|
| 33 bài giảng | phủ hết mọi chuyên đề |
| **66 ví dụ mẫu** | giải từng bước, có số cụ thể |
| **238 bước giải** | mỗi bước nói được nó để làm gì |
| **99 ý kiến thức** | mỗi ý có câu tự kiểm kèm đáp án |
| **33 lời giải sai** | được mổ tới đúng bước rẽ nhầm |

Phần thứ tư là phần hiếm gặp nhất trong tài liệu luyện thi và có giá trị sư phạm cao nhất.
Một cảnh báo trừu tượng kiểu "chú ý đừng cộng phần trăm" trôi qua đầu người học không để
lại gì. Nhưng khi họ đọc một lời giải sai trông hoàn toàn hợp lý, thấy nó cho ra một con số
tròn trịa khớp với một phương án trong đề, rồi mới thấy chỗ nó gãy — đó là lúc họ nhận ra
**lỗi của chính mình**.

Trên màn hình, câu tự kiểm và phần chẩn đoán lỗi đều gập lại, phải bấm mới mở: người học
tự trả lời trước khi thấy đáp án thì mới biết mình có thật sự hiểu. Bước sai được tô đỏ
ngay tại chỗ, vì nếu để cả lời giải sai hiện phẳng như nhau thì có nguy cơ nhớ nhầm nó
thành lời giải đúng.

### Ngân hàng câu hỏi

Phiếu chỉ tốt bằng ngân hàng câu hỏi đứng sau nó. Hiện có **572 câu** trải đều 33
chuyên đề, mỗi chuyên đề **tối thiểu 15 câu** — đúng bằng số câu của một phiếu cấp 6,
nên không phiếu nào phải lặp câu để đủ số. Mọi câu đều kèm lời giải, và câu có phương
án nhiễu đáng chú ý thì kèm luôn chú thích bẫy.

Độ phủ được tính bằng `bankCoverage()` và **hiển thị thẳng trên giao diện**: khi một
chuyên đề chưa đủ câu, hệ thống báo cho người học biết thay vì âm thầm dùng lại câu cũ.

### Dòng chảy một phiếu

```
Giao nhiệm vụ  →  Chặng 1 Khởi động  →  Chặng 2 Rèn luyện  →  Chặng 3 Bứt tốc
                                                                     ↓
      Xét lên cấp  ←  Định hướng  ←  Giải pháp  ←  Nhận xét  ←  Chấm & báo kết quả
```

| Ngưỡng | Giá trị | Ý nghĩa |
|---|---|---|
| Hoàn thành | 70% | Phiếu được tính là xong |
| Thành thạo | 85% (90% với phiếu vượt ải) **và** không quá giờ | Được cộng vào điều kiện lên cấp |
| Lên cấp | Thành thạo ≥ 3 phiếu **và** vượt ải của cấp | Lên cấp trên tuyến chuyên đề đó |
| Lên giai đoạn | **KPI ≥ 90%** **và** phủ ≥ 60% số phiếu của giai đoạn | Được xét chuyển giai đoạn |

Mỗi chuyên đề là một **tuyến riêng** và lên cấp độc lập — một bạn mạnh Toán yếu Văn
học ở hai tốc độ khác nhau thay vì bị kéo về cùng một nhịp.

---

## Không gian làm việc — và bài toán không có máy chủ

Một ma trận 30 quyền mà chỉ 6 quyền điều khiển được thứ gì thì 24 quyền còn lại chỉ tồn
tại trên giấy. Một "Coach GITA" đăng nhập vào sẽ thấy đúng ứng dụng của học viên.

Nhưng làm cho chúng tồn tại thật vấp ngay một ràng buộc: **HSA365 không có máy chủ** — dữ
liệu học tập nằm trong trình duyệt của chính người học. Vậy làm sao giáo viên nhìn được cả
lớp?

Lời giải không phải là dựng một máy chủ tạm bợ, mà là dùng chính thứ đã có: **tệp xuất của
học viên là định dạng trao đổi**. Nó đã được đánh phiên bản, đã có bước di trú, và đã được
chuẩn hóa chặt khi nhập. Học viên gửi tệp, giáo viên nạp vào, và có ngay một bảng lớp thật.

Đánh đổi được **nói thẳng trên giao diện** thay vì giấu đi:

| | |
|---|---|
| ✓ | Không cần máy chủ, không cần tài khoản; dữ liệu không rời khỏi máy ai trừ khi chính người học gửi đi |
| ✓ | Chạy được hoàn toàn khi mất mạng |
| ✗ | Bảng lớp là **ảnh chụp tại thời điểm xuất**, không phải trực tuyến |
| ✗ | Giáo viên phải chủ động xin tệp; không tự động đồng bộ |

Khi triển khai có máy chủ, tầng này **không phải viết lại**: chỉ đổi nguồn của `loadSnapshot`
từ tệp sang API, mọi phép tính bên dưới giữ nguyên.

Bốn khu vực, mở theo đúng quyền của vai trò: **Bảng lớp** · **Xét duyệt** (lên cấp, chuyển
giai đoạn) · **Giao nhiệm vụ** (sinh gói phiếu theo 20/80, xuất CSV) · **Báo cáo** (lớp và
chất lượng ngân hàng).

Hai nguyên tắc được test canh giữ:

- **Bảng lớp xếp theo ai cần chú ý trước, không xếp theo điểm.** Bảng xếp theo điểm khiến
  người ở giữa bảng không bao giờ được nhìn tới — mà đó chính là nhóm cứu được nhiều nhất.
- **Mọi cảnh báo phải kèm một việc cụ thể.** Một bảng lớp chỉ tô đỏ các ô "yếu", "chậm" thì
  giáo viên đọc xong vẫn không biết làm gì, và sẽ ngừng đọc nó sau vài tuần.

## Báo cáo gia đình

Người trả tiền cho một chương trình luyện thi thường không phải người học — và trước màn
hình này, họ không có cách nào nhìn thấy bất cứ điều gì.

Báo cáo cố ý **không phải một bản phân tích rút gọn**. Phụ huynh không đọc bảng năng lực
Rasch, và không nên bắt họ đọc. Họ cần ba câu trả lời:

1. Con tôi đang ở đâu so với mục tiêu?
2. Có đang tiến lên không?
3. **Tôi giúp được gì mà không phải giỏi Toán?**

Câu thứ ba quan trọng nhất và gần như luôn bị bỏ qua. Một báo cáo chỉ trả lời hai câu đầu
sẽ biến phụ huynh thành người giám sát điểm số — vai trò làm hỏng động lực nhanh hơn bất kỳ
điều gì khác. Nên ba việc ở cuối báo cáo đều **không đòi hỏi kiến thức chuyên môn**, và có
test canh giữ đúng điều đó.

---

## Phân quyền

Ba tầng quyết định một người làm được gì: **vai trò** → **cấp bậc** → (riêng học viên)
**cấp độ học**. Quyền cộng dồn theo bậc, nên lên bậc chỉ thêm quyền chứ không bao giờ
mất quyền đã có — điều này được một bài test canh giữ.

Mười vai trò chia làm hai họ. **Họ chuyên môn** đứng trực tiếp với người học:

| Vai trò | Bậc | Tóm tắt |
|---|---|---|
| Học viên | 3 | Tính năng mở dần theo cấp độ: cấp 3 mở thi thử theo phần và Gia sư AI, cấp 5 mở đề full, cấp 6 mở nhảy cấp |
| Trợ giảng | 2 | Theo sát một lớp, nhận xét bài làm; bậc 2 được giao nhiệm vụ |
| Giáo viên | 3 | Giao nhiệm vụ, duyệt lên cấp, biên soạn câu hỏi; bậc 3 duyệt chuyển giai đoạn, quản lý lớp và dẫn buổi huấn luyện |
| Coach GITA | 3 | Mục tiêu, động lực, thói quen, kỷ luật hành động; bậc 2 kê lộ trình cá nhân, bậc 3 duyệt lên cấp |
| Tư vấn | 2 | Đọc hồ sơ năng lực và đề xuất lộ trình cho gia đình; bậc 2 lập đề xuất và xem báo cáo toàn hệ thống |
| Chủ nhiệm chuyên môn | 2 | Thẩm định nội dung, theo dõi mọi lớp; bậc 2 sửa khung chương trình và phát hành |

**Họ vận hành** lo hệ thống, và được tách ra theo nguyên tắc đặc quyền tối thiểu:

| Vai trò | Bậc | Có | Cố ý **không** có |
|---|---|---|---|
| Admin sản phẩm | 2 | Nội dung, khung chương trình, phát hành | Tạo tài khoản, cấu hình phân quyền |
| Admin hệ thống | 2 | Tài khoản, nhật ký, ma trận phân quyền | Sửa nội dung, duyệt tiến độ |
| Giám đốc điều hành | 1 | Mọi báo cáo và nhật ký, **chỉ đọc** | Mọi quyền ghi |
| Super Admin | 1 | Toàn quyền, gồm thao tác nguy hiểm | — |

Gộp bốn vai này thành một "quản trị viên" là cách nhanh nhất để tạo ra một tài khoản mà
khi bị chiếm đoạt thì mất tất cả. Tách ra thì **người giữ chìa khóa không đồng thời là
người chấm bài**, và **người sửa nội dung không tự cấp được quyền cho mình**. Bốn bất
biến này đều có test canh giữ.

Màn hình **Phân quyền** in ra đúng ma trận mà mã nguồn đang dùng, nên tài liệu không
bao giờ lệch khỏi hành vi thật. Chi tiết: [`docs/PHAN-QUYEN.md`](docs/PHAN-QUYEN.md).

> **Cảnh báo triển khai.** Đây là lớp kiểm soát *phía người dùng*: nó quyết định giao
> diện hiện gì và chặn thao tác nhầm lẫn, nhưng **không phải ranh giới bảo mật**. Khi
> chạy thật, mọi quyền phải được kiểm tra lại trên máy chủ — danh mục quyền trong
> `src/data/roles.ts` chính là hợp đồng để máy chủ hiện thực hóa.

---

## Kiến trúc

```
src/
  config.ts              Cấu trúc đề thi, thang điểm, hằng số toàn cục
  types.ts               Mô hình dữ liệu lõi
  data/                  Nội dung: chuyên đề, ngữ liệu, ngân hàng câu hỏi,
                         khung chương trình, bộ sinh phiếu và nhiệm vụ,
                         mô thức GITA, phân quyền
  lib/                   Máy tính thuần: Rasch, chấm điểm, SRS, tiến độ, lộ trình,
                         GITA & 20/80, phân quyền, lưu trữ, định tuyến, AI
  store/                 Reducer + context, mọi thay đổi trạng thái đi qua đây
  components/            Hệ thống thiết kế, biểu đồ SVG tự vẽ, khung ứng dụng
  features/              Từng màn hình
tests/                   300 bài test cho toàn bộ tầng lib, data và giao diện
```

Nguyên tắc: **mọi quy tắc nghiệp vụ nằm trong `lib/` dưới dạng hàm thuần** — chấm
điểm, chẩn đoán, kê đơn, xét lên cấp, kiểm tra quyền. Giao diện chỉ hiển thị kết quả.
Nhờ vậy mọi kết luận đều kiểm chứng được bằng test thay vì phải bấm thử trên màn hình.

Chi tiết: [`docs/KIEN-TRUC.md`](docs/KIEN-TRUC.md).

### Hệ thống tài liệu

| Thư mục | Nội dung |
|---|---|
| [`docs/GITA/`](docs/GITA/) | 11 tài liệu về mô thức: khung, tầng hấp thu, cấp chuyên môn, ba môi trường, thói quen, quy trình vận hành, nhận diện, tiêu chuẩn chất lượng, đội nhóm |
| [`docs/SEO.md`](docs/SEO.md) | Vì sao định tuyến hash chặn đứng SEO, kết xuất tĩnh, chọn lọc chỉ mục và danh sách việc sau triển khai |
| [`docs/HOC-PHI.md`](docs/HOC-PHI.md) | Khảo sát thị trường, định giá bốn gói, cam kết kết quả và kịch bản cho người tư vấn |
| [`docs/NHAN-DIEN.md`](docs/NHAN-DIEN.md) | Bộ nhận diện HSA365 · GITA: dấu hiệu, bảng màu, hệ chữ, hệ tài liệu, bản in |
| [`docs/CHUONG-TRINH.md`](docs/CHUONG-TRINH.md) | Cách sinh 2.000 phiếu và quy tắc tiến độ |
| [`docs/PHAN-QUYEN.md`](docs/PHAN-QUYEN.md) | Ba tầng quyết định quyền và ranh giới bảo mật |
| [`docs/KIEN-TRUC.md`](docs/KIEN-TRUC.md) | Quyết định kỹ thuật và lý do đằng sau |

---

## Chất lượng

- **TypeScript nghiêm ngặt** — bật `strict`, `noUncheckedIndexedAccess`,
  `exactOptionalPropertyTypes`, `noUnusedLocals`. Không có `any` trong mã sản phẩm.
- **300 bài test** phủ chấm điểm, chuẩn hóa đáp án, mô hình Rasch, ôn tập ngắt quãng,
  di trú dữ liệu, phân quyền, tiến độ, tính toàn vẹn ngân hàng câu hỏi và khung
  chương trình, mô thức GITA và quy tắc 20/80, cộng với test giao diện đầu-cuối.
- **Không có màn hình trắng** — `ErrorBoundary` ở gốc bắt mọi lỗi hiển thị và đưa ra
  ba đường thoát theo đúng thứ tự: tải dữ liệu về máy, tải lại trang, rồi mới đến đặt
  lại dữ liệu. Với một ứng dụng giữ toàn bộ tiến độ trong trình duyệt, đây là khác biệt
  giữa "một lỗi nhỏ" và "mất sạch tiến độ".
- **Bảo mật ở những chỗ client vẫn phải làm đúng** — khóa Gemini bị loại khỏi tệp
  xuất; tệp nhập vào bị chuẩn hóa vai trò, cấp bậc, giai đoạn và cài đặt; đổi vai trò
  không để lại cấp bậc cũ; trang khai báo CSP ghim mọi kết nối ra ngoài về đúng
  endpoint Gemini; nội dung đề bài được khử HTML rồi mới mở lại đúng danh sách thẻ
  định dạng cho phép. Xem
  [`docs/PHAN-QUYEN.md`](docs/PHAN-QUYEN.md).
- **Kiểm tra nội dung** — một câu hỏi sai đáp án gây hại hơn mọi lỗi kỹ thuật khác,
  nên nó bị chặn ngay ở tầng test: đáp án phải nằm trong phương án, phương án không
  trùng nhau, lời giải đủ dài, bẫy không được chú thích cho đáp án đúng.
- **Khả năng truy cập** — điều hướng bàn phím đầy đủ, viền tiêu điểm rõ trên cả hai
  chế độ màu, vùng mốc và nhãn ARIA, `aria-live` cho đồng hồ sắp hết giờ, tôn trọng
  `prefers-reduced-motion`, chỉnh cỡ chữ, liên kết bỏ qua điều hướng.
- **Biểu đồ** — tự vẽ bằng SVG, không thư viện. Bảng màu phân loại đã được kiểm định
  cho cả chế độ sáng lẫn tối và cho người mù màu (deutan/protan/tritan); màu không
  bao giờ là kênh thông tin duy nhất — luôn kèm nhãn trực tiếp và bảng số liệu.
- **Dữ liệu** — lưu trữ có đánh phiên bản kèm hàm di trú, nên nâng cấp ứng dụng không
  bao giờ làm mất tiến độ; xuất/nhập JSON để người học sở hữu dữ liệu của mình.
- **Ngoại tuyến** — service worker precache toàn bộ vỏ ứng dụng: mất mạng giữa bài thi
  195 phút không làm mất bài.

## Quy ước mã nguồn

- Toàn bộ **nội dung hiển thị cho người dùng** viết tiếng Việt có dấu đầy đủ.
- **Chú thích trong mã** viết tiếng Việt không dấu (ASCII) để tránh lệ thuộc bảng mã
  khi diff, grep và xem log trên các môi trường khác nhau.
- Chú thích giải thích **vì sao**, không mô tả lại mã đã tự nói rõ.

## Giấy phép

Mã nguồn phát hành theo giấy phép MIT. Ngữ liệu đọc hiểu trong `src/data/passages.ts`
được biên soạn riêng cho HSA365.
