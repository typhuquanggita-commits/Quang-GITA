# HSA365

**Nền tảng luyện thi Đánh giá năng lực HSA (ĐHQGHN) theo lộ trình cá nhân hóa.**

Bám đúng cấu trúc bài thi HSA: **150 câu / 195 phút / thang 150 điểm**, chia ba phần
Tư duy định lượng (Toán, 50 câu / 75 phút), Tư duy định tính (Ngôn ngữ — Văn học,
50 câu / 60 phút) và phần tự chọn Khoa học hoặc Tiếng Anh (50 câu / 60 phút).

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
npm run test         # 222 bài test
npm run build        # dựng bản phát hành vào dist/
npm run preview      # xem thử bản đã dựng
npm run catalogue    # xuất 2000 phiếu + 2000 nhiệm vụ + 30 phiếu hướng dẫn ra catalogue/*.csv
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

1. **Đúng 2.000 phiếu** — phân bổ bằng phương pháp số dư lớn nhất (Hare) trên 180 ô
   (30 chuyên đề × 6 cấp độ).
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

### Cửa vào: bài kiểm tra định vị

36 câu, 12 mỗi phần thi, **chọn thích ứng**: sau mỗi câu hệ thống ước lượng lại năng lực
rồi chọn câu tiếp theo có độ khó gần năng lực đó nhất. Một câu quá dễ hay quá khó gần như
không mang thông tin gì — ai cũng đúng, hoặc ai cũng sai — nên 12 câu cho ra sai số tương
đương một đề cố định dài gấp đôi.

Kết quả gieo **cấp độ khởi điểm cho cả 30 tuyến**, mức thành thạo ban đầu, điểm dự báo và
đưa mọi câu sai thẳng vào sổ tay lỗi sai. Không có bước này thì mọi người học đều xuất
phát từ cùng một điểm mặc định — nghĩa là người mới, người cần giúp nhất, lại nhận được
ít hướng dẫn nhất.

Hai giới hạn được tuyên bố thẳng trên màn hình thay vì giấu đi: bài này định vị ở mức
**phần thi, không phải từng chuyên đề** (12 câu không đủ định vị 10 chuyên đề riêng biệt),
và nó chỉ xếp tới **tối đa cấp 4** — cấp cao hơn phải chứng minh bằng phiếu thật.

### Kho bí kíp — tầng sâu của bộ giải đề

Bộ kiến thức trả lời *"phải ôn lại cái gì"*. Kho bí kíp trả lời ba câu hỏi khó hơn nhiều:

1. **Đọc vị** — nhìn vào đâu trên đề là biết ngay đây là dạng nào?
2. **Phương pháp** — dạng này giải bằng đường lối gì, và **vì sao** là đường đó?
3. **Bước giải** — làm gì trước, làm gì sau, và mỗi bước **để làm gì**?

Kèm theo là mẹo xử lý nhanh và sai lầm đặc trưng của riêng từng dạng.

| | |
|---|---|
| 30 chuyên đề | mỗi chuyên đề một "câu hỏi lớn" |
| **90 dạng bài** | mỗi dạng có phương pháp riêng |
| **194 dấu hiệu đọc vị** | đều là thứ **nhìn thấy được trên đề** |
| **362 bước giải** | mỗi bước nói được nó để làm gì |
| **90 bí kíp** | kèm điều kiện "dùng khi nào" |

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

### Ngân hàng câu hỏi

Phiếu chỉ tốt bằng ngân hàng câu hỏi đứng sau nó. Hiện có **455 câu** trải đều 30
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
tests/                   222 bài test cho toàn bộ tầng lib, data và giao diện
```

Nguyên tắc: **mọi quy tắc nghiệp vụ nằm trong `lib/` dưới dạng hàm thuần** — chấm
điểm, chẩn đoán, kê đơn, xét lên cấp, kiểm tra quyền. Giao diện chỉ hiển thị kết quả.
Nhờ vậy mọi kết luận đều kiểm chứng được bằng test thay vì phải bấm thử trên màn hình.

Chi tiết: [`docs/KIEN-TRUC.md`](docs/KIEN-TRUC.md).

### Hệ thống tài liệu

| Thư mục | Nội dung |
|---|---|
| [`docs/GITA/`](docs/GITA/) | 11 tài liệu về mô thức: khung, tầng hấp thu, cấp chuyên môn, ba môi trường, thói quen, quy trình vận hành, nhận diện, tiêu chuẩn chất lượng, đội nhóm |
| [`docs/NHAN-DIEN.md`](docs/NHAN-DIEN.md) | Bộ nhận diện HSA365 · GITA: dấu hiệu, bảng màu, hệ chữ, hệ tài liệu, bản in |
| [`docs/CHUONG-TRINH.md`](docs/CHUONG-TRINH.md) | Cách sinh 2.000 phiếu và quy tắc tiến độ |
| [`docs/PHAN-QUYEN.md`](docs/PHAN-QUYEN.md) | Ba tầng quyết định quyền và ranh giới bảo mật |
| [`docs/KIEN-TRUC.md`](docs/KIEN-TRUC.md) | Quyết định kỹ thuật và lý do đằng sau |

---

## Chất lượng

- **TypeScript nghiêm ngặt** — bật `strict`, `noUncheckedIndexedAccess`,
  `exactOptionalPropertyTypes`, `noUnusedLocals`. Không có `any` trong mã sản phẩm.
- **222 bài test** phủ chấm điểm, chuẩn hóa đáp án, mô hình Rasch, ôn tập ngắt quãng,
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
