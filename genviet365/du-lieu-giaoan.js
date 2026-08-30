/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT · KHO GIÁO ÁN
   Kho này KHÔNG do bản dựng nghĩ ra. Nó rút từ năm tài liệu gốc
   trong thư mục GEN VIỆT của Học viện GITA, đọc ngày 30.08.2026:
   "PHẦN 0.doc", "PHẦN 0 CHI TIẾT.doc", "CHUYÊN ĐỀ GV2.doc",
   "🧭 CHUYÊN ĐỀ GV7.doc", "CHUYÊN ĐỀ lớp 2.doc".

   CHƯA LẤY ĐƯỢC: "GA LỚP 2 GITA - HN.docx" (121 MB) và
   "GA LỚP 3 GITA - HN.docx" (91 MB). Cả hai trả về nội dung rỗng
   qua công cụ Drive vì tệp quá lớn (ảnh chèn). Không có dòng nào
   trong kho này lấy từ hai tệp đó, cũng không có dòng nào bịa ra
   để thế chỗ chúng.

   Khoảng trống được lấp: hệ thống trước đây có đúng MỘT giáo án
   mẫu (buổi 1 khoá nền, khoá CT_GIAO_AN). Kho này đưa vào khung
   buổi chuẩn của chương trình, 73 chuyên đề có mã thật, 32 hoạt
   động rèn luyện lấy nguyên từ kịch bản, 20 khẩu quyết và công
   thức, khung 16 tuần một học kỳ CLB và 14 biểu mẫu bắt buộc.

   HAI CHỖ ĐÃ SUY RA, KHÔNG PHẢI NGUYÊN VĂN:
   1. Cột mốc phút trong GA_KHUNG_BUOI và GA_KHUNG_TIET là cộng
      dồn từ cột "Thời lượng gợi ý" của nguồn — nguồn chỉ ghi độ
      dài từng khối, không ghi mốc.
   2. Hai trường "Lời người dạy nói" và "Dấu hiệu buổi đang hỏng"
      được rút từ cột "Tiêu chí quan sát" và mục "Lưu ý vận hành"
      của chính các bảng tiến trình, viết lại thành câu nói và câu
      cảnh báo cho khớp dạng khối giaoan.

   MỘT SẠN CỦA NGUỒN, GIỮ NGUYÊN VÀ GHI RA: mã chuyên đề bậc phổ
   thông bị trùng giữa hai tệp. "PHẦN 0.doc" gán mã GV2.02 cho
   chuyên đề "Hệ thống tự học Gen Việt", trong khi chính danh mục
   ở đầu tệp đó và cả "PHẦN 0 CHI TIẾT.doc" gán GV2.02 cho
   "Thiết kế một ngày Gen Việt". Tương tự, các chuyên đề số 5–11
   trong "PHẦN 0.doc" mang mã GV3.01, GV3.02, GV4.01, GV4.02,
   GV5.01, GV5.02, GV6.01 — không khớp nhóm mô-đun trong danh mục
   (GV3 là Di sản, GV4 là Kỹ năng học, GV5 là Giao tiếp). Kho này
   giữ nguyên mã như nguồn ghi và đánh dấu chỗ trùng, không tự ý
   đánh lại số.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ── 1 · Phần mở đầu chương trình ────────────────────────────
     Rút từ "PHẦN 0.doc" và "PHẦN 0 CHI TIẾT.doc". Đây là thứ
     người dạy phải đọc trước khi mở bất kỳ giáo án nào, vì mọi
     chuyên đề đều tham chiếu về bốn tầng thời gian và năm trụ. */
  G.GA_PHAN_0 = [
    { m: 'PHẦN 0', t: 'Master Gen Việt 1000 năm là gì',
      v: [ 'Không phải một chương trình, mà một kiến trúc dài hạn',
        'Nối di sản Nhân Tài Việt ngàn năm với 100 năm độc lập 1945–2045',
        'Và với bản đồ 30 năm phát triển cá nhân của mỗi người Gen Việt, 10–40 tuổi',
        'Chạy bằng kỷ luật và agenda kiểu BNI, tư duy hệ thống Thụy Điển – Đức – Hàn',
        'Giữ bản sắc bản lĩnh – trí tuệ – nhân ái của người Việt' ] },
    { m: 'PHẦN I', t: 'Tuyên ngôn — bốn phẩm chất dòng Nhân Tài Gen Việt',
      v: [ 'Vững gốc: hiểu di sản, yêu nước, có hệ giá trị rõ',
        'Sáng trí: tinh thông tri thức, công nghệ, tư duy toàn cầu',
        'Cứng bản lĩnh: chịu được áp lực, dám dấn thân, dám chịu trách nhiệm',
        'Giàu nhân ái: làm ăn tử tế, tôn trọng con người, phục vụ cộng đồng',
        'Ba lời cam kết: với Tổ tiên và Di sản, với Đất nước 1945–2045, với Chính mình' ] },
    { m: 'PHẦN II', t: 'Bốn tầng thời gian',
      v: [ 'Tầng 1000 năm — di sản, hiền tài, khoa bảng, trí thức, doanh nhân',
        'Tầng 100 năm — 1945–2045, cột mốc 2045 là điểm hội tụ của Đề án',
        'Tầng 30 năm — bản đồ cá nhân 10–40 tuổi, chia bốn chặng',
        'Tầng vận hành — 1 năm, 90 ngày, 1 tuần',
        'Người 15 tuổi năm 2026 sẽ 34 tuổi năm 2045: đợt sóng Gen Việt đầu tiên' ] },
    { m: 'PHẦN III', t: 'Năm trụ cột',
      v: [ 'Trụ 1 — Bản lĩnh và hệ giá trị: Yêu nước, Trách nhiệm, Chính trực, Kiên trì, Hợp tác, Sáng tạo, Phụng sự',
        'Trụ 2 — Sáu nhóm năng lực cốt lõi, mỗi năng lực có thang bậc Nhận thức → Thói quen → Kỹ năng → Tư duy → Nội lực → Phẩm chất',
        'Trụ 3 — Di sản: Ngân hàng Trí Tuệ, 1000 Gương Nhân Tài, Mạng lưới Mentor, Học phần Di Sản',
        'Trụ 4 — Hệ sinh thái Giáo dục – CLB – Khởi nghiệp, mô hình BNI cộng Startup Club',
        'Trụ 5 — Dữ liệu, công nghệ, quản trị hệ: portfolio 30 năm, dashboard CLB, Gen Việt Index' ] },
    { m: 'PHẦN IV', t: 'Đề án quốc gia đến 2045 — con số mục tiêu',
      v: [ 'Ít nhất 20.000 CLB Gen Việt ở phổ thông và đại học',
        'Ít nhất 1.000.000 thanh niên đi qua hệ thống, có portfolio rõ ràng',
        'Ít nhất 100.000 dự án khởi nghiệp, trong đó 10.000 doanh nghiệp thành lập',
        'Giai đoạn 1 (2026–2030): xây nền và thí điểm',
        'Giai đoạn 2 (2031–2040): mở rộng và quốc tế hoá',
        'Giai đoạn 3 (2041–2045): tích hợp và dâng hiến mốc 100 năm' ] },
    { m: 'PHẦN V', t: 'Bốn chặng của bản đồ 30 năm cá nhân',
      v: [ 'Chặng 1 (10–15 tuổi) Thức tỉnh: tự nhận thức, tự hào nguồn cội, thói quen nền tảng',
        'Chặng 2 (16–20) Khai mở và Rèn lửa: tầm nhìn, dám nói dám thử, năng lực cốt lõi',
        'Chặng 3 (21–30) Dấn thân và Lập nghiệp: xây ba loại vốn tri thức – quan hệ – tài chính',
        'Chặng 4 (31–40) Kiến tạo và Khai sáng: từ người nhận sang người cho' ] },
    { m: 'PHẦN VI', t: 'CLB Gen Việt — máy vận hành của chương trình',
      v: [ 'Ban Cố vấn người lớn: đại diện Ban Giám hiệu hoặc Tổ HĐTN, giáo viên phụ trách',
        'Ban Lãnh đạo Học sinh: Chủ nhiệm, hai Phó chủ nhiệm, Trưởng Ban Nội dung, Sự kiện, Truyền thông – Công nghệ',
        'Tần suất: 1 buổi mỗi tuần, 60–90 phút, trong 15–16 tuần một học kỳ',
        'Mỗi buổi phải có ba trục: giá trị Gen Việt, năng lực cụ thể, cam kết và sản phẩm nhỏ',
        'Bậc tiếp theo: CLB Gen Việt Doanh nhân tại đại học, agenda kiểu BNI có pitch và referrals' ] },
    { m: 'MÃ SỐ', t: 'Cách đọc mã chuyên đề',
      v: [ 'Bậc phổ thông dùng mã hai cấp GVx.yy — x là nhóm mô-đun 1 đến 10, yy là số thứ tự trong nhóm',
        'GV1 Tôi là ai · GV2 Thói quen và kỷ luật · GV3 Di sản · GV4 Kỹ năng học và tư duy · GV5 Giao tiếp',
        'GV6 Năng lực số · GV7 Dự án cộng đồng · GV8 Kinh doanh nhỏ · GV9 Hướng nghiệp · GV10 Tổng kết năm',
        'Bậc tiểu học dùng mã ba cấp GVk.n.ss — k là khối lớp, n là nhóm, ss là số thứ tự',
        'Ví dụ GV2.1.07 là khối 2, nhóm 1 Văn hoá – Phẩm chất, chuyên đề thứ bảy',
        'Cảnh báo: bộ mã bậc phổ thông có chỗ trùng giữa hai tệp nguồn — GV2.02 được gán cho hai chuyên đề khác nhau, và bảy chuyên đề trong Cẩm nang mang mã không khớp nhóm mô-đun của danh mục' ] },
    { m: 'BỘ HỒ SƠ', t: 'Một chuyên đề chuẩn gồm những phần nào',
      v: [ 'I — Bảng thông tin khung: cụm năng lực, mã, đối tượng, thời lượng, giá trị gắn kết, mục tiêu tổng quát',
        'II — Bảng mục tiêu ba trục Nhận thức – Kỹ năng – Thái độ, mỗi trục có tiêu chí đo được',
        'III — Bảng tiến trình từng pha: mục tiêu, kịch bản, phương pháp, thời lượng, học liệu, tiêu chí quan sát',
        'IV — Bộ công cụ triển khai: thẻ, poster, phiếu cam kết, nhật ký, bộ thẻ tình huống',
        'V — Rubric bốn mức, thường 4–5 tiêu chí, chuẩn đạt từ Mức 3 trở lên',
        'VI — Tài liệu và dụng cụ kèm theo, VII — Thông điệp huấn luyện một đến hai câu' ] }
  ];

  /* ── 2 · Khung chuẩn một buổi CLB Gen Việt 90 phút ───────────
     Nguyên văn năm khối lấy từ "PHẦN 0.doc", Cẩm nang một học kỳ,
     PHẦN IV mục 4.1 "Mẫu Agenda 90 phút". Mốc phút là cộng dồn từ
     cột thời lượng gợi ý (10–15, 5–10, 50–60, 10–15, 5–10). */
  G.GA_KHUNG_BUOI = [
    { p: '−05', t: 'Chuẩn bị trước giờ — Ban Nội dung họp nhanh', ai: 'Ban Nội dung + Giáo viên',
      n: 'Kiểm tra máy chiếu, loa, học liệu in đủ theo sĩ số, xếp bàn theo nhóm. Nguồn gọi đây là pha 0 và ghi thời lượng là dấu gạch — nghĩa là làm xong trước khi học sinh vào.',
      loi: 'Không nói gì với học sinh ở pha này. Việc của pha này là để pha 1 không mất một giây nào cho kỹ thuật.',
      hong: 'Học sinh đã ngồi mà còn đang dán thẻ lên bảng, thử chuông, đếm phiếu.' },
    { p: '00–10', t: 'Khối 1 — Khởi động và Bản tin Gen Việt', ai: 'MC + Ban Truyền thông',
      n: 'Điểm danh, một trò chơi hoặc ice-breaker nhanh, rồi bản tin tích cực trong tuần: một câu chuyện đẹp có thật trong lớp, trong trường hoặc ngoài xã hội.',
      loi: '“Tuần này ai thấy một việc tử tế trong trường? Kể ngắn thôi, một câu.”',
      hong: 'Bản tin biến thành thông báo hành chính. Không ai kể được một câu chuyện thật nào.' },
    { p: '10–15', t: 'Khối 2 — Khung giá trị và mục tiêu buổi', ai: 'Ban Nội dung / Giáo viên',
      n: 'Nhắc lại một đến hai giá trị Gen Việt gắn với chuyên đề hôm nay — Trách nhiệm, Chính trực, Kiên trì — rồi nói mục tiêu buổi bằng một câu.',
      loi: '“Hôm nay chúng ta rèn một giá trị: Chính trực. Cuối buổi mỗi người phải cầm về được một thứ.”',
      hong: 'Đọc cả bảy giá trị. Học sinh không nhớ được giá trị nào là của buổi này.' },
    { p: '15–65', t: 'Khối 3 — Hoạt động lõi của chuyên đề', ai: 'Ban Nội dung + Mentor + GVCN',
      n: 'Phần duy nhất thay nội dung theo từng chuyên đề. Cấu trúc cố định: mini-talk 10–15 phút, hoạt động nhóm, rồi làm ra sản phẩm. Bốn khối còn lại giữ nguyên cho mọi buổi.',
      loi: '“Phần này các em làm, thầy cô chỉ đi vòng. Hỏi khi cần, đừng chờ được gọi.”',
      hong: 'Mini-talk chiếm quá 20 phút. Hoạt động nhóm bị cắt còn 15 phút và không nhóm nào ra được sản phẩm.' },
    { p: '65–75', t: 'Khối 4 — Kết nối, cam kết, giao nhiệm vụ về nhà', ai: 'MC + Ban Lãnh đạo CLB',
      n: 'Mỗi học sinh ghi một cam kết nhỏ, đo được, làm trong tuần. Mỗi nhóm ghi sản phẩm cần hoàn thành tiếp. Cam kết viết ra giấy, không nói miệng.',
      loi: '“Viết một việc em sẽ làm trước buổi sau. Việc nhỏ mà làm được, hơn việc to mà nói cho hay.”',
      hong: 'Cam kết viết chung chung kiểu “em sẽ cố gắng hơn”. Không đo được thì buổi sau không kiểm được.' },
    { p: '75–80', t: 'Khối 5 — Đánh giá nhanh và truyền thông', ai: 'Ban Truyền thông + Giáo viên',
      n: 'Feedback nhanh bằng phiếu một đến ba câu, bảng, hoặc mã QR. Chụp hình sản phẩm. Chốt lại thông điệp chính của buổi bằng một câu.',
      loi: '“Một câu thôi: hôm nay em mang về được gì?”',
      hong: 'Không thu được phiếu nào. Buổi sau không có dữ liệu để biết khối 3 có ăn hay không.' }
  ];

  /* ── 3 · Khung chuẩn hai tiết tiểu học 2 × 45 phút ───────────
     Rút từ "CHUYÊN ĐỀ lớp 2.doc" và "CHUYÊN ĐỀ GV2.doc". Mười ba
     chuyên đề lớp 2 đọc được đều dùng đúng khung này, chỉ thay
     câu chuyện, khẩu quyết và bộ thẻ tình huống. */
  G.GA_KHUNG_TIET = [
    { p: 'T1 −05', t: 'Pha 0 — Chuẩn bị trước giờ học', ai: 'Giáo viên',
      n: 'Dán thẻ khẩu quyết lên bảng, thử chuông 15 giây, xếp chỗ đóng vai, phát phiếu theo hàng để tránh chen. Nguồn ghi 3–5 phút.',
      loi: 'Chốt luật ba chữ trước khi bắt đầu: viết ngắn — việc nhỏ — đo được.',
      hong: 'Mất hơn 45 giây để lớp yên. Phiếu phát thiếu, có em ngồi không.' },
    { p: 'T1 00–08', t: 'Pha 1 — Khởi động bằng đối chiếu hai mẫu', ai: 'Cả lớp',
      n: 'Giáo viên đọc hoặc diễn hai đến ba mẫu: một mẫu sai, một mẫu dài dòng, một mẫu chuẩn. Học sinh giơ thẻ CHUẨN / CHƯA CHUẨN. Hỏi lại: thiếu ý nào?',
      loi: '“Muốn cô giúp nhanh thì phải nói đủ ý. Bạn nào chỉ được thiếu ý nào?”',
      hong: 'Học sinh giơ thẻ theo bạn bên cạnh. Không em nào nói được thiếu ý gì.' },
    { p: 'T1 08–18', t: 'Pha 2 — Câu chuyện bài học', ai: 'Giáo viên',
      n: 'Kể một câu chuyện ngắn năm phút có nhân vật lớp 2, rồi ba câu hỏi gợi mở. Ví dụ trong nguồn: Chiếc bút bị gãy, Chiếc cúp rỗng, Bạn mới vào lớp, Chiếc tem dán trên trán, Chiếc thang 1 bậc, Cánh cửa 3 khoá.',
      loi: '“Bạn ấy giấu thì ai buồn? Bạn ấy nói thật thì được gì? Lần sau con làm sao?”',
      hong: 'Câu chuyện bị kể thành lời răn dạy. Học sinh ngồi im, không trả lời được câu hỏi nào.' },
    { p: 'T1 18–30', t: 'Pha 3 — Bài học trọng tâm: dạy khẩu quyết', ai: 'Giáo viên + cả lớp',
      n: 'Giới thiệu khẩu quyết của chuyên đề bằng thẻ lớn có icon, đọc đồng thanh theo nhịp vỗ tay, làm ký hiệu tay, rồi giáo viên làm mẫu ba ví dụ. Nguồn gọi kỹ thuật này là nhịp hoá và Call and Response.',
      loi: '“Đọc theo cô, vỗ tay theo nhịp. Ba chữ thôi, ai cũng thuộc được.”',
      hong: 'Giáo viên giảng nghĩa khẩu quyết quá ba phút. Học sinh nghe nhưng không đọc lại được.' },
    { p: 'T1 30–42', t: 'Pha 4 — Thực hành có bấm giờ', ai: 'Từng học sinh',
      n: 'Bốc thẻ tình huống, nói trong 15 giây, chuông kêu là dừng. Giáo viên sửa theo đúng một nguyên tắc: thiếu ý nào thì chỉ thẻ ý đó, học sinh nói lại một lần.',
      loi: '“Con nói lại câu vừa rồi, thêm chỗ này thôi. Một chỗ.”',
      hong: 'Giáo viên sửa hai ba lỗi một lượt. Học sinh rối, im, hoặc khóc.' },
    { p: 'T1 42–45', t: 'Pha 5 — Cam kết và vinh danh mini', ai: 'Cả lớp',
      n: 'Ký phiếu cam kết 7 ngày, chọn một buddy nhắc nhau, nhận sticker. Cả lớp vỗ tay. Một học sinh nói một câu khen đúng hành vi cho bạn.',
      loi: '“Khen việc bạn làm, đừng khen chung chung. Bạn làm gì mà con thấy đáng khen?”',
      hong: 'Vinh danh vài em giỏi sẵn. Nguồn yêu cầu vinh danh theo minh chứng thật, không theo nói hay.' },
    { p: 'T2 00–08', t: 'Pha 1 — Ôn luyện bằng quiz 12 tình huống', ai: 'Cả lớp',
      n: 'Giáo viên đọc 12 câu, học sinh giơ thẻ ĐÚNG / SAI, một đến hai em giải thích một câu. Chốt lại ba lỗi phổ biến nhất của chuyên đề.',
      loi: '“Bạn nào giải thích giúp cô câu số 7? Sai vì thiếu bước nào?”',
      hong: 'Dưới 80% chọn đúng mà vẫn đi tiếp. Nguồn đặt ngưỡng ≥80% mới sang pha 2.' },
    { p: 'T2 08–18', t: 'Pha 2 — Kỹ năng trọng tâm', ai: 'Giáo viên + cặp đôi',
      n: 'Giáo viên làm mẫu hai tình huống, học sinh chỉ ra các bước. Sau đó luyện theo cặp: bạn A kể tình huống, bạn B nói theo khẩu quyết. Đổi vai.',
      loi: '“Bạn A kể, bạn B nói ba bước. Xong đổi. Không ai ngồi không.”',
      hong: 'Một em trong cặp làm hết, em kia chỉ ngồi nghe.' },
    { p: 'T2 18–36', t: 'Pha 3 — Trạm thực chiến', ai: 'Nhóm nhỏ',
      n: 'Bốn đến năm trạm, mỗi trạm 3–4 phút, mỗi học sinh ít nhất hai lượt. Mỗi trạm có cài sẵn một nhiễu — bạn trêu, bạn đòi làm thay, bạn chen — để học sinh phải xử lý thật.',
      loi: '“Trạm này có bạn chen vào. Con làm gì? Nói ra, đừng chỉ nghĩ.”',
      hong: 'Trạm thành chỗ chơi. Không có nhiễu thì học sinh chỉ diễn lại mẫu đã thuộc.' },
    { p: 'T2 36–42', t: 'Pha 4 — Chuẩn hoá văn hoá lớp', ai: 'Cả lớp',
      n: 'Đồng kiến tạo 5 quy ước lớp: ngắn, dễ nhớ, do chính học sinh soạn, viết lên giấy A0, dán góc lớp. Nguồn nhấn mạnh cảm giác “đây là bộ luật do chính mình tạo ra”.',
      loi: '“Năm điều thôi. Điều nào cả lớp làm được thì mới ghi.”',
      hong: 'Giáo viên phát sẵn bộ quy ước in ra. Học sinh không nhận là của mình, tuần sau không ai nhắc.' },
    { p: 'T2 42–45', t: 'Pha 5 — Vinh danh và giao nhiệm vụ 7 ngày', ai: 'MC lớp + Giáo viên',
      n: 'Phát nhật ký tick 7 ngày. Mỗi em nói một câu mở đầu bằng “Con sẽ…”. Thu nhật ký sau 7 ngày, tuyên dương tiến bộ, không phạt em bỏ ngày.',
      loi: '“Từ một lần lên bốn lần cũng là tiến bộ. Cô đếm số lần, không đếm lỗi.”',
      hong: 'Nhật ký phát ra rồi không thu. Chuyên đề dừng ở lớp, không đi vào tuần.' }
  ];

  /* ── 4 · Các buổi lấy được từ nguồn ──────────────────────────
     64 chuyên đề có mã thật. Mười ba chuyên đề tiểu học lớp 2 lấy
     từ "CHUYÊN ĐỀ lớp 2.doc" và "CHUYÊN ĐỀ GV2.doc"; nhóm GV1 và
     GV2 phổ thông từ "PHẦN 0 CHI TIẾT.doc"; nhóm GV7–GV10 từ
     "🧭 CHUYÊN ĐỀ GV7.doc"; các chuyên đề CD2–CD13 từ "PHẦN 0.doc". */
  G.GA_BUOI = [
    ['GV2.1.01', 'Lớp 2', 'Đúng giờ – đúng hẹn: đến sớm 5 phút', 'Bỏ chuỗi muộn → vội → quên đồ → lo → học kém; thuộc khẩu quyết Sớm 5 – Đủ 3 – Sẵn 1', 'Trò Trễ 30 giây – Mất 3 phút; chuyện Chiếc đồng hồ Uy tín; Bản đồ rủi ro 5 phút; thi 60 giây sẵn sàng', 'Kế hoạch 1 tuần với 3 mốc giờ chốt (báo thức, rời nhà, vào lớp) + nhật ký 7 ngày'],
    ['GV2.1.02', 'Lớp 2', 'Xin phép – báo cáo chuyên nghiệp trong 15 giây', 'Nói đủ ba ý VIỆC – LÝ DO – ĐỀ NGHỊ, bỏ nói trống không, kể lan man, nói dối đổ lỗi', 'Nói trúng – nói vòng; Xếp đúng 3 mảnh; Chuông 15 giây; 5 trạm thực hành; bộ 20 thẻ tình huống', '5 quy ước xin phép – báo cáo lớp em + phiếu cam kết mỗi ngày 3 lần nói chuẩn'],
    ['GV2.1.03', 'Lớp 2', 'Trung thực khi khó: dám nói con chưa làm được', 'Thay giấu lỗi bằng ba bước NHẬN – HỎI – LÀM LẠI; nói thật để được giúp đúng', 'Chuyện Chiếc bút bị gãy và Chiếc cặp bí mật; Chuông trung thực; quiz 12 câu; 5 trạm', 'Quy ước lớp trung thực 5 điều + kế hoạch sửa 2 bước + nhật ký Con đã nói thật'],
    ['GV2.1.04', 'Lớp 2', 'Tự trọng – học thật, làm thật', 'Không quay cóp, không nhờ làm hộ, dám chịu điểm thật; ba chuẩn TỰ LÀM – NÓI THẬT – SỬA THẬT', 'Trò Bài của ai; chuyện Chiếc cúp rỗng; bảng hai cột Giúp học / Làm hộ; 5 trạm thực chiến', '5 điều lớp em: mắt nhìn bài con, tay làm bài con, miệng im lặng, không đưa không nhận, không biết thì giơ tay'],
    ['GV2.1.05', 'Lớp 2', 'Tôn trọng khác biệt vẫn chơi đẹp', 'Phân biệt đùa vui – trêu chọc – bắt nạt; ba chuẩn NHÌN ĐIỂM MẠNH – NÓI TỬ TẾ – CHƠI CÔNG BẰNG', 'Trò Ai cũng khác và Giống và khác; chuyện Bạn Rùa và bạn Thỏ; Đổi câu nói; 5 trạm', '5 quy ước: không trêu, không gắn nhãn, mời bạn cùng chơi, chờ bạn 10 giây, thấy trêu thì nói dừng lại'],
    ['GV2.1.06', 'Lớp 2', 'Lời nói nâng đỡ: chuyển chê thành góp ý', 'Bốn KHÔNG ba CÓ và công thức Khen 1 – Góp 1 – Cách 1; nói về việc, không nói về người', 'Trò Lời nói bông hoa hay mũi gai; chuyện Chiếc tem dán trên trán; Đèn xanh đèn đỏ 12 câu; mini project kịch 60–90 giây', 'Quy ước giao tiếp nâng đỡ 5 điều + bảng câu nói mẫu treo lớp + clip nhóm'],
    ['GV2.1.07', 'Lớp 2', 'Văn hoá dùng đồ chung', 'Khẩu quyết 5B: Báo – Bảo quản – Bàn giao – Biết ơn – Báo lỗi; làm hỏng thì báo ngay, không kệ', 'Trò Đồ nào của ai; chuyện Cây bút của lớp mình; 30 giây mượn – 30 giây trả; trạm role-play có sự cố', '5 quy ước + checklist thủ kho: nơi cất, cách mượn, thời hạn trả, kiểm tra đồ, báo lỗi'],
    ['GV2.1.08', 'Lớp 2', 'Văn hoá xếp hàng – chờ lượt', 'Khẩu quyết 4 KHÔNG – 3 CÓ; ba bước xử lý khi bị chen: nhắc tử tế 10 giây, giữ vị trí, nhờ trưởng hàng', 'Trò Hàng nào nhanh hơn; Chen 10 giây – mất 2 phút; Hàng êm 60 giây; trạm căn-tin, nhà vệ sinh, lấy nước, lên xe', '5 quy ước xếp hàng + checklist trưởng hàng (nhắc khoảng cách, nhắc giọng, sắp hàng, báo GV)'],
    ['GV2.1.09', 'Lớp 2', 'Tử tế với bạn yếu hoặc nhút nhát', 'Khẩu quyết 3T – 2 KHÔNG – 1 BƯỚC: gợi ý một bước để bạn tự làm, không làm thay, không trêu', 'Trò Cười cho vui; chuyện Bạn Minh không dám giơ tay và Chiếc thang 1 bậc; game A/B Giúp đúng hay làm thay; 4 trạm', '5 quy ước: không cười khi bạn sai, khen nỗ lực, giúp 1 bước, không gắn nhãn, ai trêu phải nói lời sửa'],
    ['GV2.1.10', 'Lớp 2', '7 giá trị Gen Việt bằng ngôn ngữ lớp 2', 'Mỗi giá trị ra một hành động một tuần, có minh chứng đo được; chuẩn NÓI 1 – LÀM 1 – CHỨNG 1', 'Trò Đúng giá trị nào; chuyện 7 bạn – 7 lựa chọn; ghép bộ ba Giá trị – Hành động – Minh chứng, trình bày 20 giây', 'Hộ chiếu 7 tuần, mỗi tuần một trang, có tick – kể một câu – đưa minh chứng'],
    ['GV2.2.01', 'Lớp 2', 'Bắt đầu 2 phút — chống trì hoãn', 'Quy trình bốn bước MỞ – LÀM 1 – TICK – THỞ trong 2 phút; kẹt thì xin gợi ý một bước, không xin làm hộ', 'Trò Não lười nói gì; chuyện 2 phút cứu bạn Minh; drill theo timer; game Bắt đầu nhanh – thắng trước', 'Checklist mini dán vở bốn ô MỞ – LÀM 1 – TICK – THỞ + nhật ký 7 ngày'],
    ['GV2.2.02', 'Lớp 2', 'Lịch tuần 3 khung học', 'Ba slot cố định 10–15 phút mỗi ngày, ngắn – đều – thật; tiêu chí slot bền 4C', 'Trò Đồng hồ học tập; chuyện Não thích đều; guided practice khoanh giờ; Mỗi slot 1 việc nhỏ theo chuẩn 3Đ', 'Phiếu lịch tuần 7 ngày × 3 slot, đủ 21 slot, mỗi slot một việc có số lượng'],
    ['GV2.2.04', 'Lớp 2', 'Chống ngại khó', 'Khẩu quyết THỬ 3 – CHIA 3 – XIN 1 BƯỚC; phân biệt khó với chưa biết cách', 'Trò Khó = não lớn; chuyện Cánh cửa 3 khoá; giơ thẻ 1/2/3 theo nhịp; game Mở khoá bài khó', 'Phiếu chia bài thành ba bước (hiểu yêu cầu – làm phần nhỏ – kiểm và hoàn thiện) + nhật ký 7 ngày'],
    ['GV2.2.05', 'Lớp 2', '15 phút đọc đều', 'Khẩu quyết ĐỌC 15 – NHỚ 3 – CHỌN 1; kể lại ba ý và chọn một câu hay mỗi ngày', 'Đọc 5 phút mô phỏng có dò ngón tay và khoanh 3 từ khoá; Kể 3 ý – chuyền bóng; Săn câu hay', 'Hộ chiếu đọc: mỗi ngày ba ý và một câu hay, duy trì tối thiểu 5 trên 7 ngày'],
    ['GV1.01', 'THCS 8–9, THPT 10', 'Chân dung Gen Việt trong kỷ nguyên vươn mình', 'Khơi tự hào và trách nhiệm, định hình phẩm chất cốt lõi cần rèn từ bây giờ', 'Mini-talk chân dung; thảo luận nhóm; vẽ poster nhóm', 'Poster Chân dung Gen Việt trong mắt chúng em + tuyên ngôn cá nhân 3–5 câu'],
    ['GV1.02', 'HS 9–18, ba tầng', 'Hiểu mình qua ống kính tính cách và năng lực', 'Nhận diện nét tính cách nổi trội và vùng mạnh – vùng cần rèn; tôn trọng khác biệt', 'Phiếu tự đánh giá ngắn; bốn nhóm thiên hướng; nối vào lộ trình cá nhân', 'Bản tự nhận diện: kiểu người dễ toả sáng trong dạng việc gì'],
    ['GV1.03', 'HS 9–18, ba tầng', 'Bản đồ giá trị cá nhân và 7 giá trị Gen Việt', 'Gọi tên giá trị sống của mình, so với 7 giá trị Gen Việt, xây bộ nguyên tắc đỏ', 'Câu chuyện và tình huống; chọn 3–5 giá trị ưu tiên; viết nguyên tắc không thoả hiệp', 'Bộ nguyên tắc đỏ cá nhân — vài nguyên tắc dùng khi đứng trước cám dỗ và áp lực'],
    ['GV1.04', 'HS 9–18, ba tầng', 'Câu chuyện đời tôi: gia đình – nhà trường – Tổ quốc', 'Xâu chuỗi mốc đời, người ảnh hưởng, bối cảnh xã hội; nối chuyện cá nhân với chuyện lớn', 'Tiết 1 Gốc rễ và những người đã nâng đỡ tôi; tiết 2 Tôi trong câu chuyện Tổ quốc', 'Bản viết ngắn Câu chuyện đời tôi – Gen Việt 1.0'],
    ['GV1.05', 'HS 9–18, ba tầng', 'Cảm xúc và bản ngã: tôi không chỉ là điểm số', 'Tách tôi là ai khỏi kết quả tôi đạt được; nhận diện bản ngã tổn thương', 'Tiết 1 cảm xúc quanh điểm số và kỳ vọng; tiết 2 kỹ năng ứng phó khen – chê', 'Bộ kỹ năng quản lý cảm xúc và tự trọng lành mạnh của cá nhân'],
    ['GV1.06', 'HS 9–18, ba tầng', 'Gen Việt và bản sắc Việt trong thế giới toàn cầu', 'Tự hào Việt Nam lành mạnh, không cực đoan; hiểu công dân toàn cầu ở mức phù hợp tuổi', 'Tiết 1 Tôi là người Việt; tiết 2 Người Việt trong thế giới toàn cầu', 'Bản ghi: em giữ gì của gốc, em mở gì ra thế giới'],
    ['GV1.07', 'HS 9–18, ba tầng', 'Từ nạn nhân sang chủ động', 'Nhận diện câu nói nạn nhân; mô hình ba vùng Kiểm soát – Ảnh hưởng – Ngoài tầm tay', 'Đổi câu hỏi từ “Tại…” sang “Mình làm được gì với điều mình đang có”', 'Danh sách việc nằm trong vùng kiểm soát của em và một hành động chọn ngay'],
    ['GV1.08', 'HS 9–18, ba tầng', 'Thiết kế phiên bản Tôi 1.0 – 2.0 – 3.0', 'Vẽ ba mốc hiện tại, sau một năm, sau năm năm; chọn điểm nâng cấp quan trọng nhất', 'Tiết 1 soi gương và gọi tên Tôi 1.0; tiết 2 thiết kế Tôi 2.0 và 3.0', 'Hai đến ba điểm nâng cấp Gen Việt gắn hành động thực tế'],
    ['GV1.09', 'THCS và THPT', 'Tuyên ngôn cá nhân Gen Việt', 'Viết 10–15 câu theo ba trục: tôi tin gì, tôi không chấp nhận điều gì, tôi sẽ sống thế nào', 'Tiết 1 tuyên ngôn cá nhân là gì; tiết 2 viết và hoàn thiện bản của mình', 'Bản Tuyên ngôn Gen Việt cá nhân, nối với 7 giá trị và bản đồ 3–5–10 năm'],
    ['GV1.10', 'THCS, THPT; tiểu học bản rút gọn', 'Ngày hội Tôi là Gen Việt — triển lãm chân dung', 'Đứng lên xưng danh: đây là câu chuyện, giá trị, hành trình của tôi', 'Ba pha: chuẩn bị 2–4 tuần, ngày hội nửa ngày đến một ngày, tổng kết và lưu trữ', 'Sản phẩm triển lãm cá nhân: poster, clip hoặc infographic + bài nói'],
    ['GV2.01', 'HS 9–18', 'Thói quen tạo nên số phận: khoa học của 1% mỗi ngày', 'Hiểu quy luật tích luỹ và vòng lặp gợi nhớ – hành động – phần thưởng', 'Mini-talk 1%; soi thói quen đang kéo lên hay kéo xuống; thiết kế một thói quen 1%', 'Thử nghiệm 30 ngày 1% Gen Việt có bảng theo dõi'],
    ['GV2.02', 'HS 9–18', 'Thiết kế một ngày Gen Việt: giờ ngủ, giờ học, giờ sống', 'Phân biệt thời gian chất lượng với thời gian bị rò rỉ; mô hình Deep – Shallow – Waste', 'Soi 24 giờ hiện tại; thiết kế lại một ngày; thử nghiệm 1–2 tuần', 'Bản thiết kế một ngày Gen Việt gắn mục tiêu cá nhân và thói quen 1%'],
    ['GV2.03', 'HS 9–18 và SV năm 1–2', 'Kỹ năng hoàn thành việc đã nhận', 'Quy trình bốn bước: cam kết rõ – phân nhỏ – bám tiến độ – xử lý trì hoãn', 'Thực hành trên một nhiệm vụ thật: bài tập, dự án, việc nhà; theo dõi 1–2 tuần', 'Một nhiệm vụ thật được chia nhỏ có deadline từng phần và hoàn thành'],
    ['GV2.10', 'THCS – THPT, lý tưởng khối 8–11', '90 ngày tái thiết thói quen Gen Việt', 'Chọn 2–3 thói quen lõi theo ba nhóm Thân – Trí – Giá trị và giữ đủ 90 ngày', 'Một buổi khởi động 90 phút cộng ba buổi check-in 30 phút sau tuần 3, 6 và 9–10', 'Kế hoạch 90 ngày + Habit Tracker 90 ngày + nhóm đồng hành 4–5 người có lịch check-in'],
    ['GV6.04', 'THCS 7–9, THPT 10–11', 'An ninh mạng cơ bản và an toàn số cho học sinh', 'Nhận diện bốn nhóm rủi ro: lừa đảo tài chính, lấy cắp thông tin, bắt nạt mạng, xâm hại và phát tán', 'Trò Đoán tình huống nguy hiểm; mini-talk bốn nhóm rủi ro; xây và hợp nhất checklist; dọn dẹp dấu chân số ngay tại chỗ', 'Bộ 10 nguyên tắc An toàn số Gen Việt của khối + hai việc mỗi em làm ngay + danh sách người tin cậy'],
    ['GV2.02 (trùng mã)', 'THCS 8–9, THPT 10–11', 'Hệ thống tự học Gen Việt: từ kế hoạch đến thực thi', 'Tự học là hệ thống năm mảnh ghép: mục tiêu – giờ vàng – ca học – hệ nhắc – kiểm lại', 'Trò Một buổi tối của tôi; xác định giờ vàng và ba môn ưu tiên; thiết kế bản đồ 7 ngày; thiết kế ca học 45–60 phút', 'Bản đồ tự học 7 ngày Gen Việt + phiếu ca học 45–60 phút cho một môn cụ thể'],
    ['GV3.01', 'THCS 8–9, THPT 10–11', 'Giao tiếp và hợp tác đa dạng — làm việc nhóm kiểu Gen Việt', 'Nhận diện điểm mạnh và điểm dễ gây xung đột của bản thân khi làm nhóm', 'Thử thách Tháp Gen Việt hoặc Cầu giấy Gen Việt 25 phút; Mổ xẻ nhóm mình; xây bộ quy ước', 'Bộ quy ước làm việc nhóm Gen Việt 6–10 nguyên tắc dùng cho lớp và CLB'],
    ['GV3.02', 'THCS 8–9, THPT 10–11', 'Tư duy phản biện và tư duy hệ thống', 'Phân biệt phản ứng cảm xúc, tư duy phản biện và tư duy hệ thống', 'Trò Tin này thật hay giả; tự thiết kế bộ 5 câu hỏi; vẽ sơ đồ nguyên nhân – hệ quả', 'Bộ 5 câu hỏi Tư duy phản biện Gen Việt + một sơ đồ hệ thống cho vấn đề thật'],
    ['GV4.01', 'THCS 8–9, THPT 10–11', 'Giải quyết vấn đề và sáng tạo ứng dụng', 'Quy trình năm bước: nhận diện vấn đề đúng, hiểu nguyên nhân, đề xuất nhiều phương án, chọn khả thi, thử nghiệm nhỏ', 'Trò Vấn đề hay triệu chứng; chọn vấn đề thật quanh mình; Canvas 5 bước 30 phút; Mini-pitch 3 phút', 'Phiếu Canvas 5 bước cho một vấn đề cụ thể + mini-pitch 3 phút của nhóm'],
    ['GV4.02', 'THCS 8–9, THPT 10–11', 'Lãnh đạo bản thân và dự án nhỏ 4 tuần', 'Lãnh đạo bản thân không phải chức vụ mà là khả năng tự dẫn dắt mình và cùng người khác về đích', 'Workshop 90 phút thiết kế dự án; 4 tuần triển khai; một buổi báo cáo 45–60 phút', 'Project Canvas dự án nhỏ 4 tuần + kế hoạch phân vai + báo cáo ngắn sau 4 tuần'],
    ['GV5.01', 'THCS 8–9, THPT 10–11', 'Năng lực số và công dân số Gen Việt', 'Phân biệt dùng công nghệ để giải trí với dùng để học tập và phát triển', 'Trò 24 giờ của em offline hay online; phân tích tình huống rủi ro; xây bộ quy tắc', 'Bản đồ 24 giờ online + Bộ quy tắc Công dân số Gen Việt 8–12 điều'],
    ['GV5.02', 'THCS 8–9, THPT 10–12', 'Công cụ số cho tự học và quản trị dự án cá nhân', 'Hệ thống ba lớp: lịch cá nhân, bảng việc cần làm, không gian ghi chép và theo dõi', 'Trò Em đang quản lý việc học bằng gì; thiết kế bảng tự học; chia sẻ hệ công cụ tối giản', 'Bảng Tự học Gen Việt 2–4 tuần + Bảng Quản trị dự án cá nhân nhỏ'],
    ['GV6.01', 'THCS 8–9, THPT 10–12', 'Định hướng nghề nghiệp và bản đồ 20 năm', 'Nghề là hành trình 10–20 năm gắn năng lực – giá trị – đóng góp, không phải ngành để thi', 'Trò Tương lai của em dài bao nhiêu năm; mini-talk Nghề – Việc làm – Sứ mệnh ba vòng tròn; vẽ bản đồ 30 phút', 'Phiếu Chân dung nghề Gen Việt + Bản đồ 20 năm bốn chặng × 5 năm'],
    ['GV6.02', 'THPT 10–12 và SV năm 1–3', 'Khám phá nghề qua mentor và job shadowing', 'Chạm nghề thật, chuyển tò mò nghề thành hiểu nghề rồi thành bài học cho bản đồ 20 năm', 'Ba pha: chuẩn bị 60–90 phút, trải nghiệm 1–2 buổi 3–4 giờ tại doanh nghiệp, phản tư 60–90 phút', 'Phiếu quan sát và câu hỏi + báo cáo trải nghiệm nghề 1–2 trang + bản cập nhật bản đồ 20 năm'],
    ['GV6.03', 'HS lớp 11–12, SV năm 1–2', 'Hồ sơ nghề Gen Việt và kế hoạch 5 năm đầu đời', 'Nhìn rõ các bước trung gian 6 – 12 – 18 tháng, tránh mơ hồ hoặc vỡ mộng khi ra đời', 'Hai buổi 90 phút: buổi 1 xây hồ sơ nghề, buổi 2 thiết kế kế hoạch 5 năm 18–23/25 tuổi', 'Hồ sơ nghề Gen Việt (CV 1–2 trang + trang Story) + Kế hoạch 5 năm đầu đời trên A3'],
    ['GV7.02', 'THCS – THPT, CLB Gen Việt', 'Khảo sát nhu cầu cộng đồng quanh trường', 'Lắng nghe – quan sát – phân tích nhu cầu thật, thay vì làm theo cảm tính', 'Ba bước QUAN SÁT – LẮNG NGHE – PHÂN TÍCH; mô phỏng phỏng vấn; một tuần khảo sát 5–10 người; công cụ 5 Why', 'Báo cáo khảo sát cộng đồng Gen Việt của nhóm + phiếu quan sát cá nhân, làm đầu vào cho GV7.03'],
    ['GV7.03', 'THPT, CLB Gen Việt', 'Thiết kế dự án cộng đồng 4–12 tuần', 'Năm thành phần dự án Gen Việt bền vững; nguyên tắc 3C Clear goal – Consistent team – Continuous feedback', 'Workshop chuyển ý tưởng thành khung dự án; lập kế hoạch hành động 4–12 tuần; trình bày 5 phút', 'Bản thiết kế dự án 4–12 tuần được thầy cô hoặc mentor phê duyệt để triển khai thật'],
    ['GV7.04', 'THCS – THPT, nhóm môi trường', 'Dự án Môi trường và Hành tinh xanh', 'Bốn chiều phụng sự hành tinh: rác, cây, năng lượng, nước', 'Trò Nếu trái đất biết nói; brainstorm vấn đề quanh trường; lên kế hoạch 4–8 tuần; ký cam kết Tôi – Gen Việt Xanh', 'Một dự án xanh thực tế + báo cáo tác động gồm ảnh, video, nhật ký'],
    ['GV7.05', 'THPT, SV CLB Gen Việt', 'Dự án giáo dục và hỗ trợ bạn nhỏ khó khăn', 'Mô hình ba tầng: Giúp đỡ cảm tính → Đồng hành mentor nhỏ → Giáo dục kỹ năng và giá trị', 'Chân dung bạn nhỏ nhóm em muốn giúp; thiết kế chương trình kèm học; thuyết trình Dự án Tôi đồng hành', 'Dự án giáo dục cộng đồng + video phản tư Tôi đã học được gì khi dạy người khác'],
    ['GV7.06', 'THCS – THPT, CLB Văn hoá', 'Dự án Văn hoá – Di sản địa phương', 'Bốn dạng dự án: ngày hội văn hoá, triển lãm di sản, sân khấu hoá, tour di sản', 'Trò Bản đồ di sản Việt Nam; chọn di sản địa phương; thu tư liệu và phỏng vấn nghệ nhân', 'Dự án văn hoá – di sản: poster, clip, triển lãm, sân khấu hoặc mini-tour'],
    ['GV7.07', 'THPT, SV CLB Gen Việt', 'Làm việc với chính quyền và tổ chức xã hội', 'Bốn trục phối hợp: nhà trường, Đoàn – Hội – CLB, chính quyền địa phương, tổ chức xã hội và doanh nghiệp', 'Bản đồ đối tác của nhóm; viết công văn xin phép; giả lập buổi họp xin phép có giáo viên đóng vai đại diện', 'Bộ hồ sơ Đề xuất dự án: công văn – kế hoạch – báo cáo sau hoạt động'],
    ['GV7.08', 'THPT, SV CLB Gen Việt', 'Truyền thông cho dự án cộng đồng', 'Ba giai đoạn truyền thông: trước – trong – sau dự án; kể chân thật, không thổi phồng', 'Phân tích câu chuyện thật; viết kịch bản nội dung; sản xuất trong 2–4 tuần', 'Một video, bài viết hoặc poster Câu chuyện Gen Việt từ dự án thật'],
    ['GV7.09', 'THPT, SV CLB Gen Việt', 'Đo lường tác động và học từ dự án', 'Bốn cấp độ đo lường tác động Gen Việt, bắt đầu từ số lượng rồi tới thay đổi hành vi', 'Tổng hợp dữ liệu 1–2 tuần; vòng phản tư nhóm; trình bày tại tổng kết CLB', 'Báo cáo tác động dự án Gen Việt + một vòng phản tư nhóm'],
    ['GV7.10', 'THPT, SV CLB Gen Việt', 'Sổ tay dự án cộng đồng của trường', 'Biến trải nghiệm thành tài sản tri thức và cảm hứng kế thừa cho khoá sau', 'Biên soạn 2–4 tuần theo cấu trúc ba phần; trình bày sản phẩm sổ tay', 'Sổ tay ba phần Hành trình – Tác động – Bài học kế thừa, lưu tại thư viện trường'],
    ['GV8.01', 'THCS – THPT 12–18', 'Tinh thần doanh nhân Gen Việt ở tuổi học trò', 'Bốn chân dung doanh nhân Gen Việt: dám nghĩ, dám làm, dám chịu trách nhiệm, tạo giá trị cho người khác', 'Hai buổi 45–60 phút cộng 2–3 tuần thực hành mini project', 'Bản ý tưởng tạo giá trị dạng poster hoặc canvas của nhóm'],
    ['GV8.02', 'THCS – THPT', 'Tìm ý tưởng từ cuộc sống quanh mình', 'Bốn nguồn gốc của ý tưởng Gen Việt; ý tưởng thật đến từ nhu cầu thật', 'Hai buổi cộng 1–2 tuần quan sát thực tế và phỏng vấn người dùng thật', 'Bản đồ ý tưởng Gen Việt + ba ý tưởng khởi điểm từ đời sống thật'],
    ['GV8.03', 'THCS – THPT', 'Khách hàng là ai, họ cần gì', 'Ba nguyên tắc vàng khi hiểu khách hàng; phỏng vấn – lắng nghe – phân tích nhu cầu', 'Hai buổi cộng một tuần thực hành phỏng vấn khách hàng thật', 'Bản đồ khách hàng và nhu cầu Gen Việt (Customer Empathy Map)'],
    ['GV8.04', 'THCS – THPT', 'Sản phẩm và giá trị khác biệt', 'Bốn lớp giá trị khác biệt Gen Việt; vì sao người ta chọn mình chứ không chọn cái giống hệt đám đông', 'Hai buổi cộng 2–3 tuần thử nghiệm sản phẩm hoặc dịch vụ nhỏ', 'Bản Giá trị khác biệt và điểm nổi bật của sản phẩm, làm cơ sở cho bản mẫu thử'],
    ['GV8.05', 'THCS – THPT', 'Chi phí – giá bán – lợi nhuận', 'Ba khối tài chính cơ bản của một Gen Việt startup; tài chính lành mạnh là điều kiện, không phải phần phụ', 'Hai buổi cộng một tuần thử tính giá trên mô hình mini', 'Bảng kế hoạch tài chính mini: chi phí – giá – lợi nhuận cho dự án nhóm'],
    ['GV8.06', 'THCS – THPT', 'Kênh bán hàng: trực tiếp, online, qua người quen', 'Ba kênh bán hàng Gen Việt; dám thử và dám điều chỉnh theo phản ứng thị trường', 'Hai buổi cộng 1–2 tuần thực hành bán hàng thực tế', 'Báo cáo thực hành bán hàng, ghi nhận ba phản hồi khách hàng thật'],
    ['GV8.07', 'THCS – THPT', 'Đạo đức trong kinh doanh nhỏ', 'Bốn trụ cột đạo đức kinh doanh Gen Việt; niềm tin xây từ từng sản phẩm nhỏ', 'Hai buổi 45–60 phút, phân tích ranh giới đúng – sai qua tình huống', 'Bộ quy tắc đạo đức kinh doanh Gen Việt của nhóm'],
    ['GV8.08', 'THCS 8–9 mô phỏng, THPT 10–12 thực tế', 'Làm việc theo nhóm trong dự án kinh doanh', 'Bốn trục làm việc nhóm hiệu quả; chia lợi nhuận công bằng và xử lý mâu thuẫn', 'Hai buổi 45–60 phút, thực hành phân công và xử lý bất công', 'Bộ quy tắc làm việc nhóm Gen Việt + bảng phân công minh bạch'],
    ['GV8.09', 'THPT 15–18', 'Báo cáo dự án kinh doanh và câu chuyện học được', 'Ba trục báo cáo Gen Việt: số liệu, câu chuyện thật, bài học nhân cách', 'Hai buổi cộng một tuần chuẩn bị báo cáo thực tế', 'Báo cáo nhóm viết và trình bày + Câu chuyện học được của từng cá nhân'],
    ['GV8.10', 'THPT 15–18 đã làm xong dự án', 'Từ dự án nhỏ đến ước mơ khởi nghiệp tương lai', 'Bốn bậc phát triển khởi nghiệp Gen Việt; nối trải nghiệm nhỏ với nghề nghiệp dài hạn', 'Hai buổi 45–60 phút, viết và chia sẻ trước lớp', 'Bản đồ Ước mơ khởi nghiệp Gen Việt + bài chia sẻ Nếu 5 năm nữa em khởi nghiệp'],
    ['GV9.01', 'THPT 10–12', 'Thế giới nghề nghiệp đang thay đổi thế nào', 'Ba chuyển động nghề nghiệp toàn cầu; nghề đang mất đi và nghề đang trỗi dậy', 'Hai tiết 45–60 phút, làm nhóm và trưng bày trong lớp', 'Bản đồ nghề nghiệp tương lai Gen Việt + danh sách kỹ năng bền vững cá nhân'],
    ['GV9.02', 'THPT 15–18, mở rộng SV năm 1–2', 'Bốn trục chọn nghề: năng lực – đam mê – nhu cầu xã hội – giá trị', 'Đánh giá bản thân và ngành theo bốn tiêu chí Thích – Giỏi – Cần – Đúng', 'Hai tiết 45–60 phút, tự chấm theo bốn trục rồi đối chiếu', 'Bản đồ chọn nghề cá nhân + kế hoạch phát triển năng lực theo hướng đã chọn'],
    ['GV9.03', 'THPT 10–12', 'Khám phá bản thân qua trải nghiệm, không chỉ qua test', 'Bốn bước khám phá bản thân Gen Việt: làm – va – nghĩ – sửa', 'Hai tiết cộng một tuần thực hành trải nghiệm nhỏ', 'Nhật ký trải nghiệm bản thân + kế hoạch trải nghiệm nghề trong một tháng'],
    ['GV9.04', 'THPT 10–12', 'Bản đồ ngành học: STEM – Kinh tế – Xã hội – Nghệ thuật – Dịch vụ', 'Nhìn thấy rừng ngành thay vì vài ngành hot; năm miền lớn của bản đồ ngành', 'Hai tiết 45–60 phút, làm nhóm rồi làm cá nhân', 'Bản đồ ngành học Gen Việt A3 + hồ sơ ngành yêu thích'],
    ['GV9.05', 'THPT 15–18, SV năm 1–2', 'Nghề trong kỷ nguyên số và kinh tế xanh', 'Hai chiều nghề tương lai Gen Việt: chuyển đổi số và bền vững', 'Hai tiết 45–60 phút, phân tích xu hướng và tự định vị', 'Bản đồ nghề tương lai + cam kết phát triển bản thân vì tương lai xanh và số'],
    ['GV9.06', 'THPT 10–12, SV năm 1–2', 'Học gì ở THPT và đại học để không thất nghiệp tương lai', 'Năm năng lực bất biến Gen Việt — nhóm năng lực không bị thay thế trong mọi ngành', 'Hai tiết 45–60 phút, soi từng năng lực và lên lộ trình', 'Bản đồ năng lực cá nhân + kế hoạch Học suốt đời Gen Việt'],
    ['GV9.07', 'THPT 15–18, SV CLB', 'Gặp gỡ người thật – nghề thật', 'Từ người truyền cảm hứng đến người định hướng; rèn phỏng vấn – quan sát – phản tư', 'Hai tiết chuẩn bị và gặp gỡ, cộng một buổi thực tế 90–120 phút', 'Nhật ký nghề thật + báo cáo cảm nhận và định hướng cá nhân'],
    ['GV9.08', 'HS lớp 11–12, SV năm 1–2', 'Thiết kế năm gap year trong đầu', 'Ba mô hình gap year Gen Việt cho người không thể nghỉ hẳn một năm', 'Hai tiết 45–60 phút cộng 1–2 tuần trải nghiệm cá nhân', 'Kế hoạch Gap Year trong đầu + nhật ký trải nghiệm nghề'],
    ['GV9.09', 'THPT 15–18, SV năm 1–2', 'Viết thư gửi chính mình 25 tuổi', 'Hành trình nội tâm ba gặp; tạo một cam kết nội tâm cho hành trình phát triển', 'Hai tiết 45–60 phút, viết tay và niêm phong hoặc lưu bản mềm', 'Một lá thư Gửi tôi 25 tuổi, lưu trong hồ sơ hướng nghiệp'],
    ['GV10.01', 'THCS – THPT, 40 HS mỗi lớp', 'Ôn lại hành trình 1 năm Gen Việt', 'Ba vòng phản tư hành trình: nhìn lại tư duy – hành động – cảm xúc đã đổi thế nào', 'Hai tiết 45–60 phút, vẽ bản đồ hành trình rồi viết thư', 'Bản đồ hành trình 1 năm + Thư gửi Gen Việt của tôi'],
    ['GV10.02', 'THCS – THPT, nhất là lớp 9–12', 'Cập nhật hồ sơ Gen Việt Profile và portfolio', 'Hệ thống hoá một năm học tập và phụng sự thành hồ sơ năng lực thực thụ', 'Hai tiết cộng một tuần hoàn thiện hồ sơ', 'Hồ sơ Gen Việt Profile + Portfolio hình ảnh và dự án cá nhân'],
    ['GV10.03', 'THCS – THPT, mở rộng SV', 'Đo lại 6 năng lực cốt lõi và 7 giá trị Gen Việt', 'Tự chấm và mentor chấm, so với đầu năm để thấy tiến trình thật', 'Hai tiết cộng một tuần mentor phản hồi cá nhân', 'Phiếu tự chấm năng lực và giá trị Gen Việt, có đối chiếu đầu năm'],
    ['GV10.04', 'THCS – THPT, thành viên CLB', 'Chia sẻ câu chuyện Gen Việt của tôi năm nay', 'Công thức kể chuyện Gen Việt; chọn một khoảnh khắc hoặc một dự án tiêu biểu', 'Hai tiết cộng một buổi showcase tuỳ trường', 'Một bài viết hoặc video hoặc audio ngắn Câu chuyện Gen Việt của tôi'],
    ['GV10.05', 'Toàn khối hoặc thành viên CLB', 'Vinh danh Gen Việt theo nhiều hạng mục', 'Ai cũng được công nhận bằng nỗ lực và hành trình, không chỉ bằng thành tích học tập', 'Một buổi chính thức 90–120 phút, Lễ Vinh danh và Tri ân Gen Việt', 'Lễ vinh danh sáu hạng mục + album và video tổng kết'],
    ['GV10.06', 'Ban Chủ nhiệm, Ban Cốt lõi, Mentor CLB', 'Đánh giá CLB theo bộ tiêu chuẩn Gen Việt', 'Tự đánh giá theo năm trụ cột năng lực tổ chức, rồi nhận phản hồi từ mentor và nhà trường', 'Một buổi họp nội bộ 90 phút cộng một buổi phản hồi của trường hoặc trung tâm', 'Bản tự đánh giá CLB + kế hoạch cải thiện cho năm tới']
  ];

  /* ── 5 · Ngân hàng hoạt động và trò chơi ─────────────────────
     Lấy nguyên tên và cách chơi từ cột "Nội dung – Hoạt động" của
     các bảng tiến trình trong bốn tệp đọc được. Thời lượng là
     thời lượng ghi trong chính bảng đó. */
  G.GA_HOAT_DONG = [
    ['Chuông 15 giây', 'Lớp 2', '12 phút', 'Mỗi em bốc một thẻ tình huống và nói xong trước khi chuông kêu. Giáo viên sửa bằng cách chỉ thẻ ý còn thiếu, em nói lại đúng một lần.', 'Phản xạ nói đủ ba ý VIỆC – LÝ DO – ĐỀ NGHỊ trong 15 giây, bỏ nói trống không'],
    ['Xếp đúng 3 mảnh', 'Lớp 2', '10 phút', 'Nhóm 4–5 em nhận 9–12 thẻ rời, mỗi thẻ là một mảnh việc, lý do hoặc đề nghị. Nhiệm vụ: ghép thành ba câu chuẩn.', 'Nhận ra cấu trúc câu bằng thao tác tay, không bằng nghe giảng'],
    ['Nói trúng – nói vòng', 'Lớp 2', '8 phút', 'Giáo viên đọc ba câu về cùng một việc: một câu trống không, một câu kể dài, một câu chuẩn đủ ba ý. Học sinh giơ thẻ CHUẨN / CHƯA CHUẨN.', 'Nghe ra khác biệt giữa nói vòng và nói trúng'],
    ['Trạm thực chiến 5 trạm', 'Lớp 2', '17–18 phút', 'Năm trạm, mỗi trạm 3–4 phút, mỗi em ít nhất hai lượt. Mỗi trạm cài sẵn một nhiễu: bạn trêu, bạn đòi làm thay, bạn chen.', 'Chuyển khẩu quyết thành phản xạ trong tình huống có sức ép thật'],
    ['Quiz 12 tình huống giơ thẻ', 'Lớp 2', '8 phút', 'Giáo viên đọc 12 câu, cả lớp giơ thẻ ĐÚNG / SAI, một đến hai em giải thích một câu. Chốt ba lỗi phổ biến của chuyên đề.', 'Đo nhanh mức hiểu; ngưỡng đi tiếp là 80% chọn đúng'],
    ['Đèn xanh – đèn đỏ', 'Lớp 2', '12 phút', 'Mười hai câu nói có thật trong lớp. Học sinh giơ đèn xanh nếu là lời nâng đỡ, đèn đỏ nếu là chê hoặc gắn nhãn, rồi giải thích ngắn.', 'Nhận diện câu nói làm bạn đau, phân biệt nói về việc với nói về người'],
    ['60 giây sẵn sàng', 'Lớp 2', '10 phút', 'Thi theo nhóm ba bước: Check đồ (vở, bút, thước, sách đúng tiết), Check bàn (bàn sạch, ghế ngay, sách mở trang), Check não (đọc mục tiêu 10 giây hoặc hít thở ba nhịp).', 'Vào nhịp học không cần ai nhắc; bỏ cảnh lục cặp hỏi mượn bút đầu tiết'],
    ['Bản đồ rủi ro 5 phút', 'Lớp 2', 'Trong pha bài học 15 phút', 'Học sinh liệt kê mọi rủi ro khiến mình trễ — kẹt xe, đi vệ sinh, quên vở, bạn rủ nói chuyện, mua đồ ăn — rồi gán cho mỗi rủi ro một giải pháp.', 'Dự phòng thay vì đổ lỗi hoàn cảnh'],
    ['Hàng nào nhanh hơn', 'Lớp 2', '8 phút', 'Chia hai hàng cùng nhiệm vụ. Một hàng được phép chen và thúc, một hàng giữ 4 KHÔNG – 3 CÓ. Bấm giờ cả hai và so.', 'Thấy bằng số rằng chen 10 giây làm cả hàng mất 2 phút'],
    ['Đồ nào của ai', 'Lớp 2', '8 phút', 'Bày một rổ đồ và ba cột phân loại. Học sinh phân loại nhanh: đồ cá nhân, đồ chung của lớp, đồ đang mượn.', 'Điều kiện đầu tiên của khẩu quyết 5B: biết đồ này của ai trước khi cầm'],
    ['Giúp đúng hay làm thay', 'Lớp 2', '12 phút', 'Game A/B: mỗi tình huống có hai cách phản ứng, học sinh chọn A hoặc B rồi giải thích một câu.', 'Vạch ranh giới giữa gợi ý một bước và làm hộ'],
    ['Bắt đầu nhanh – thắng trước', 'Lớp 2', '12 phút', 'Nhiều vòng ngắn. Mỗi vòng học sinh phải làm đúng một dòng rồi tick. Đổi nội dung mỗi vòng, giữ yên lặng, nhóm trưởng báo số tick.', 'Chống trì hoãn bằng quy trình 2 phút MỞ – LÀM 1 – TICK – THỞ'],
    ['Kể 3 ý – chuyền bóng', 'Lớp 2', '13 phút', 'Nhóm ngồi vòng. Mỗi bạn nói một ý rồi chuyền bóng cho bạn kế. Không chen ngang. Nhóm ghi ba ý cuối cùng lên phiếu.', 'Khẩu quyết ĐỌC 15 – NHỚ 3 – CHỌN 1; kể lại không lan man'],
    ['Săn câu hay', 'Lớp 2', '5 phút', 'Mỗi em đưa ra một câu hay đã chọn trong bài đọc. Cả lớp vote, người vote phải nêu một lý do.', 'Chọn được câu ngắn – rõ – có ý nghĩa, không chọn theo cảm tính'],
    ['Mở khoá bài khó', 'Lớp 2', 'Trạm 3–4 phút', 'Học sinh gặp một bài khó thật. Giơ thẻ 1, 2 hoặc 3 tương ứng ba lần thử: tự thử 30–60 giây, đổi cách hoặc nhìn ví dụ, xin gợi ý một bước.', 'Khẩu quyết THỬ 3 – CHIA 3 – XIN 1 BƯỚC; xin gợi ý chứ không xin đáp án'],
    ['Giá trị – Hành động – Minh chứng', 'Lớp 2', '15 phút', 'Học sinh ghép bộ ba thẻ: một giá trị, một hành động của tuần, một loại minh chứng. Trình bày bộ ba trong 20 giây.', 'Chuẩn NÓI 1 – LÀM 1 – CHỨNG 1: giá trị phải ra hành vi và có minh chứng'],
    ['30 giây mượn – 30 giây trả', 'Lớp 2', '10 phút', 'Cặp đôi diễn hai lượt: một lượt mượn đúng năm bước 5B, một lượt trả kèm câu cảm ơn. Có cài sự cố để phải dùng Báo lỗi.', 'Phản xạ Báo – Bảo quản – Bàn giao – Biết ơn – Báo lỗi'],
    ['Hàng êm 60 giây', 'Lớp 2', '10 phút', 'Cả lớp xếp một hàng và giữ đủ 60 giây không chen, không thúc, không ồn, không cắt ngang, có vị trí và khoảng cách.', 'Chuẩn xếp hàng 4 KHÔNG – 3 CÓ trở thành mặc định'],
    ['Đoán tình huống nguy hiểm', 'THCS 7–9, THPT 10–11', '15 phút', 'Chia 4–6 nhóm. Chiếu bốn đến năm tình huống thật: tin nhắn trúng thưởng, người quen nhắn xin tiền gấp, người lạ xin ảnh riêng tư, comment body-shaming. Mỗi nhóm giơ bảng AN TOÀN / NGUY HIỂM / CẦN HỎI THÊM.', 'Nhận ra nhiều thứ mình từng gặp hằng ngày là nguy hiểm'],
    ['Tháp Gen Việt hoặc Cầu giấy Gen Việt', 'THCS 8–9, THPT 10–11', '25 phút', 'Thử thách xây dựng theo nhóm với nhiệm vụ rõ, thời gian đếm ngược và tài nguyên hạn chế.', 'Trải nghiệm áp lực teamwork thật, làm nguyên liệu cho pha mổ xẻ ngay sau đó'],
    ['Mổ xẻ nhóm mình', 'THCS 8–9, THPT 10–11', '15 phút', 'Ngay sau thử thách, nhóm tự phân tích cách mình đã giao tiếp và hợp tác: chỗ nào mạnh, chỗ nào kẹt, ai đã im lặng.', 'Rút bài học từ hành vi vừa xảy ra, không từ lý thuyết'],
    ['Tin này thật hay giả', 'THCS 8–9, THPT 10–11', '10–15 phút', 'Đưa vài mẩu tin và để học sinh kết luận nhanh, rồi cho biết sự thật.', 'Cho học sinh nếm chính sự vội vã kết luận của mình trước khi học tư duy phản biện'],
    ['Vấn đề hay triệu chứng', 'THCS 8–9, THPT 10–11', '10–15 phút', 'Đưa một loạt phát biểu về vấn đề trong lớp và trường; học sinh phân loại đâu là triệu chứng, đâu là vấn đề gốc.', 'Bước một của quy trình năm bước: nhận diện vấn đề đúng'],
    ['Canvas 5 bước giải quyết vấn đề', 'THCS 8–9, THPT 10–11', '30 phút', 'Nhóm chọn một vấn đề thật trong lớp hoặc CLB và điền phiếu canvas theo năm bước từ nhận diện tới thử nghiệm nhỏ.', 'Biến thảo luận thành một trang có thể đưa cho người khác đọc'],
    ['Mini-pitch 3 phút', 'THCS 8–9, THPT 10–11', '15–20 phút', 'Mỗi nhóm trình bày trong ba phút: vấn đề, ý tưởng, kế hoạch hành động. Lớp phản hồi.', 'Trình bày mạch lạc dưới sức ép thời gian'],
    ['Bản đồ 24 giờ online', 'THCS 8–9, THPT 10–11', '20 phút', 'Học sinh tô khung giờ mình ở trên mạng trong một ngày, rồi phân loại nội dung: học, giải trí, kết nối, tiêu cực.', 'Nhìn thấy tỉ lệ thật thay vì cảm giác'],
    ['Một ngày của tôi — dòng thời gian 24 giờ', 'THCS – THPT', '10–15 phút', 'Phát phiếu A4 vẽ dòng thời gian 24 giờ. Học sinh tô màu từng khung: học, ngủ, giải trí, mạng xã hội, việc nhà. Hỏi: nếu em là huấn luyện viên của chính mình, em sửa gì?', 'Tự tìm ra lỗ rò thời gian, không bị người lớn chỉ ra'],
    ['Habit Tracker 90 ngày', 'THCS – THPT khối 8–11', '25 phút', 'Học sinh tự thiết kế bảng: cột là ngày 1 đến 90, hàng là hai đến ba thói quen. Trang trí logo và một câu quote cá nhân, dán tường.', 'Làm cho tiến trình 90 ngày nhìn thấy được mỗi ngày'],
    ['Nếu em là trưởng khu phố', 'THCS – THPT', '8–10 phút', 'Mỗi em viết ba vấn đề quanh trường mà mình muốn thay đổi, rồi chia sẻ nhóm.', 'Kích hoạt quan sát trước khi dạy kỹ năng khảo sát'],
    ['5 Why', 'THCS – THPT', '12–15 phút', 'Nhóm lấy một vấn đề đã khảo sát và hỏi vì sao năm lần liên tiếp cho tới khi chạm nguyên nhân gốc.', 'Chọn vấn đề gốc thay vì xử lý triệu chứng'],
    ['Giả lập buổi họp xin phép', 'THPT, SV', '10–12 phút', 'Giáo viên đóng vai đại diện UBND hoặc Đoàn phường. Mỗi nhóm cử hai em trình bày dự án và nhận phản hồi ngay.', 'Tác phong và ngôn ngữ khi làm việc với chính quyền'],
    ['Bản đồ di sản Việt Nam', 'THCS – THPT', '10–12 phút', 'Học sinh nối tên di sản với tỉnh thành và loại di sản — vật thể, phi vật thể, di sản sống.', 'Mở rộng vốn di sản trước khi chọn đề tài dự án văn hoá']
  ];

  /* ── 6 · Khẩu quyết — thứ học sinh phải thuộc ────────────────
     Nguyên văn từ dòng "Chuẩn Gen Việt lớp 2" và "Chuẩn lớp 2"
     trong "CHUYÊN ĐỀ lớp 2.doc", cộng ba công thức bậc phổ thông
     trong "PHẦN 0.doc" và "CHUYÊN ĐỀ GV2.doc". */
  G.GA_KHAU_QUYET = [
    { t: 'Sớm 5 – Đủ 3 – Sẵn 1', n: 'Sớm 5 phút. Đủ ba thứ: đồ dùng, tâm thế, vị trí. Sẵn một việc: bắt đầu học ngay.', vi: 'GV2.1.01 · Đúng giờ – đúng hẹn' },
    { t: 'VIỆC – LÝ DO – ĐỀ NGHỊ', n: 'Câu khung lớp 2: *Thưa cô, con… vì… Con xin… ạ.* Nói trong 10–15 giây, một câu một hơi thở.', vi: 'GV2.1.02 · Xin phép – báo cáo 15 giây' },
    { t: 'NHẬN – HỎI – LÀM LẠI', n: 'NHẬN: con chưa làm được hoặc con làm sai. HỎI: cô chỉ con cách làm được không ạ. LÀM LẠI: con xin làm lại hoặc xin thêm 5 phút.', vi: 'GV2.1.03 · Trung thực khi khó' },
    { t: 'NÓI THẬT – NÓI RÕ – XIN SỬA', n: 'Câu *con chưa làm được* là câu của người dũng cảm, không phải câu của người yếu.', vi: 'GV2.1.03 · Poster treo lớp' },
    { t: 'TỰ LÀM – NÓI THẬT – SỬA THẬT', n: 'Bài của con, sức của con, tiến bộ của con. Sai là dữ liệu để sửa, không phải bằng chứng để xấu hổ.', vi: 'GV2.1.04 · Tự trọng – học thật làm thật' },
    { t: 'NHÌN ĐIỂM MẠNH – NÓI TỬ TẾ – CHƠI CÔNG BẰNG', n: 'Không gắn nhãn, không so sánh, không chọc giọng. Khác nhau vẫn là bạn — chơi đẹp mới là giỏi.', vi: 'GV2.1.05 · Tôn trọng khác biệt' },
    { t: 'NÓI TỬ TẾ – NÓI CỤ THỂ – NÓI KÈM CÁCH SỬA', n: 'Chê là nói về người. Góp ý là nói về việc. Đó là toàn bộ khác biệt.', vi: 'GV2.1.06 · Lời nói nâng đỡ' },
    { t: 'Khen 1 – Góp 1 – Cách 1', n: 'Khen một điểm thật, góp một việc cụ thể, gợi một bước sửa làm được ngay. Có thể thêm: *Mình cùng làm nhé.*', vi: 'GV2.1.06 · Công thức K1–G1–C1' },
    { t: '4 KHÔNG – 3 CÓ (lời nói)', n: 'Bốn KHÔNG: không gắn nhãn, không mỉa mai, không so sánh, không nói *bạn luôn luôn*. Ba CÓ: có nói về việc cụ thể, có một cách sửa, có giọng tử tế.', vi: 'GV2.1.06 · Quy tắc vàng' },
    { t: '5B — Báo, Bảo quản, Bàn giao, Biết ơn, Báo lỗi', n: 'Báo là xin phép. Bàn giao là trả đúng chỗ. Báo lỗi là khi làm hỏng hoặc mất thì nói ngay, không kệ.', vi: 'GV2.1.07 · Văn hoá dùng đồ chung' },
    { t: '4 KHÔNG – 3 CÓ (xếp hàng)', n: 'Bốn KHÔNG: không chen, không thúc, không ồn, không cắt ngang. Ba CÓ: có vị trí, có khoảng cách, có lời nói lịch sự.', vi: 'GV2.1.08 · Văn hoá xếp hàng' },
    { t: '3T – 2 KHÔNG – 1 BƯỚC', n: 'Ba T: Tử tế, Tôn trọng, Tạo cơ hội. Hai KHÔNG: không trêu, không làm thay. Một BƯỚC: gợi ý đúng một bước để bạn tự làm phần còn lại.', vi: 'GV2.1.09 · Tử tế với bạn yếu hoặc nhút nhát' },
    { t: 'NÓI 1 – LÀM 1 – CHỨNG 1', n: 'Nói một câu, làm một việc, có một minh chứng. Vinh danh theo minh chứng thật, không theo nói hay.', vi: 'GV2.1.10 · 7 giá trị Gen Việt lớp 2' },
    { t: 'MỞ – LÀM 1 – TICK – THỞ', n: 'Mở đúng vở đúng trang 10–15 giây, làm một dòng 60–80 giây, tick 5 giây, thở và chốt một câu *con đã bắt đầu* 10 giây.', vi: 'GV2.2.01 · Bắt đầu 2 phút' },
    { t: '3 slot – ngắn – đều – thật', n: 'Ba slot cố định mỗi ngày, mỗi slot 10–15 phút, mỗi slot đúng một việc nhỏ đo được. Tiêu chí slot bền: Cố định, dễ làm, có người nhắc, cách giờ ngủ hợp lý.', vi: 'GV2.2.02 · Lịch tuần 3 khung học' },
    { t: 'THỬ 3 – CHIA 3 – XIN 1 BƯỚC', n: 'Thử ba lần: tự thử 30–60 giây, đổi cách hoặc nhìn ví dụ, xin gợi ý một bước. Chia ba bước: hiểu yêu cầu, làm phần nhỏ, kiểm và hoàn thiện.', vi: 'GV2.2.04 · Chống ngại khó' },
    { t: 'ĐỌC 15 – NHỚ 3 – CHỌN 1', n: 'Đọc 15 phút, nhớ ba ý (ai, ở đâu, chuyện gì — hoặc mở đầu, diễn biến, kết thúc), chọn một câu hay ghi vào hộ chiếu đọc.', vi: 'GV2.2.05 · 15 phút đọc đều' },
    { t: 'Năm mảnh ghép tự học', n: 'Mục tiêu rõ, khung giờ vàng cá nhân, ca học tập trung 45–60 phút, hệ thống nhắc và theo dõi, kiểm lại và điều chỉnh mỗi tuần.', vi: 'GV2.02 trùng mã · Hệ thống tự học Gen Việt' },
    { t: 'Ca học 45–60 phút bốn nhịp', n: 'Khởi động 5 phút xem lại mục tiêu và tắt xao nhãng. Tập trung 25–30 phút một đơn vị kiến thức. Củng cố 10–15 phút. Kết 5 phút tự chấm ca học và ghi một dòng rút kinh nghiệm.', vi: 'GV2.02 trùng mã · ca học Gen Việt' },
    { t: '3C — Clear goal, Consistent team, Continuous feedback', n: 'Ba điều kiện để một dự án cộng đồng không chết yểu, dạy ở buổi 2 của chuyên đề thiết kế dự án.', vi: 'GV7.03 · Thiết kế dự án cộng đồng 4–12 tuần' }
  ];

  /* ── 7 · Khung 16 tuần một học kỳ CLB ────────────────────────
     Nguyên văn bảng 3.1 trong Cẩm nang, "PHẦN 0.doc". */
  G.GA_HOC_KY = [
    ['Tuần 1', 'Khởi động học kỳ và khảo sát hiện trạng', 'Tự nhận thức, bức tranh xuất phát', 'Phiếu baseline: thói quen học, thời gian, thói quen số, làm việc nhóm'],
    ['Tuần 2', 'Tự học và quản trị bản thân', 'Tự học, kỷ luật cá nhân', 'Phiếu tự nhận thức, cam kết một thay đổi nhỏ'],
    ['Tuần 3', 'Quản lý thời gian và kế hoạch 2–4 tuần', 'Quản lý thời gian, lập kế hoạch', 'Bảng kế hoạch 2–4 tuần cho cả học và đời sống'],
    ['Tuần 4', 'Tư duy phản biện và tư duy hệ thống', 'Tư duy phản biện, tư duy hệ thống', 'Sơ đồ hoặc logic cho một vấn đề thực tế'],
    ['Tuần 5', 'Giao tiếp và hợp tác nhóm', 'Giao tiếp, hợp tác, phân vai', 'Bộ quy ước nhóm Gen Việt'],
    ['Tuần 6', 'Giải quyết vấn đề và phác thảo dự án CLB', 'Giải quyết vấn đề, thiết kế dự án', 'Ý tưởng dự án CLB xử lý một vấn đề thật'],
    ['Tuần 7', 'Lãnh đạo bản thân và dự án nhỏ 4 tuần', 'Lãnh đạo bản thân, cam kết hành động', 'Project Canvas 4 tuần, phân vai nhóm'],
    ['Tuần 8', 'Triển khai dự án — follow-up lần 1', 'Duy trì hành động, điều chỉnh', 'Nhật ký dự án tuần 1, tinh chỉnh bước tiếp'],
    ['Tuần 9', 'Năng lực số và công dân số Gen Việt', 'Năng lực số, an toàn và trách nhiệm', 'Bản đồ 24 giờ online; Bộ quy tắc Công dân số Gen Việt'],
    ['Tuần 10', 'Triển khai dự án — follow-up lần 2', 'Đo tiến độ, xử lý trở ngại', 'Nhật ký dự án tuần 3, điều chỉnh bước cuối'],
    ['Tuần 11', 'Công cụ số cho tự học và dự án cá nhân', 'Năng lực số ứng dụng, hệ thống cá nhân', 'Bảng Tự học 2–4 tuần; Bảng Dự án cá nhân; hệ công cụ tối giản'],
    ['Tuần 12', 'Tổng kết dự án nhỏ — báo cáo và phản tư', 'Đánh giá dự án, rút kinh nghiệm', 'Báo cáo dự án dạng poster hoặc slide; phiếu phản tư cá nhân và nhóm'],
    ['Tuần 13', 'Củng cố: Hành động – Số – Gen Việt', 'Kết nối tám chuyên đề thành một câu chuyện', 'Profile Gen Việt học kỳ: em đã thay đổi gì'],
    ['Tuần 14–15', 'Tuần dự phòng, mở rộng, khách mời', 'Linh hoạt theo trường và CLB', 'Toạ đàm, workshop, tham quan, mentoring'],
    ['Tuần 16', 'Tổng kết học kỳ và đặt bước tiếp theo', 'Tự đánh giá, định hướng học kỳ tới', 'Phiếu đánh giá cuối kỳ và cam kết Next Step Gen Việt']
  ];

  /* ── 8 · Mười bốn biểu mẫu bắt buộc của một học kỳ ───────────
     Nguyên văn bảng 5.1 "Danh mục biểu mẫu cốt lõi", "PHẦN 0.doc".
     Không có bộ này thì học kỳ không để lại minh chứng nào. */
  G.GA_BIEU_MAU = [
    ['BM-01', 'Phiếu khảo sát xuất phát điểm Gen Việt', 'Tuần 1', 'Nắm baseline thói quen học, thời gian, số, nhóm — làm đối chiếu cuối kỳ'],
    ['BM-02', 'Phiếu tự nhận thức Tự học và Quản trị bản thân', 'Tuần 2', 'Soi lại cách học, xác định một đến hai thói quen cần đổi'],
    ['BM-03', 'Bảng kế hoạch 2–4 tuần cho học và đời sống', 'Tuần 3', 'Học sinh lên kế hoạch, gắn với chuyên đề 3 và 4'],
    ['BM-04', 'Phiếu hoạt động Tư duy phản biện và hệ thống', 'Tuần 4', 'Luyện phân tích một vấn đề thực tế'],
    ['BM-05', 'Bộ quy ước nhóm Gen Việt', 'Tuần 5', 'Chuẩn hoá cách làm việc nhóm trong CLB'],
    ['BM-06', 'Mẫu khung Dự án CLB Gen Việt — phần ý tưởng', 'Tuần 6', 'Ghi lại vấn đề, mục tiêu, ý tưởng giải pháp'],
    ['BM-07', 'Project Canvas dự án nhỏ 4 tuần', 'Tuần 7', 'Khung đầy đủ: mục tiêu, bước, vai, chỉ số'],
    ['BM-08', 'Nhật ký dự án tuần', 'Tuần 8 và 10', 'Theo dõi tiến độ, khó khăn, điều chỉnh'],
    ['BM-09', 'Phiếu Bản đồ 24 giờ online', 'Tuần 9', 'Nhìn lại thói quen online, phân loại nội dung'],
    ['BM-10', 'Poster Bộ quy tắc Công dân số Gen Việt', 'Tuần 9', 'Chuẩn hành vi số của lớp và CLB'],
    ['BM-11', 'Bảng Tự học 2–4 tuần Gen Việt', 'Tuần 10–11', 'Hệ thống hoá lộ trình tự học ngắn hạn'],
    ['BM-12', 'Bảng Dự án cá nhân 4 tuần', 'Tuần 11', 'Hành trình cá nhân: sức khoẻ, kỹ năng, học tập'],
    ['BM-13', 'Phiếu phản tư cá nhân và nhóm về dự án', 'Tuần 12', 'Đánh giá lại quá trình và bài học rút ra'],
    ['BM-14', 'Phiếu đánh giá cuối kỳ và cam kết next step', 'Tuần 16', 'Đo kết quả và nối sang học kỳ sau']
  ];

  /* ── 9 · Nguyên tắc dạy một buổi Gen Việt ────────────────────
     Rút từ mục "Nguyên tắc", "Lưu ý vận hành" và cột "Lưu ý vận
     hành" trong bảng công cụ của cả năm tệp đọc được. */
  G.GA_LUAT = [
    'Mỗi buổi phải có đủ ba trục: giá trị Gen Việt 5–10 phút, năng lực cụ thể ở hoạt động chính, và cam kết cùng sản phẩm nhỏ. Thiếu trục thứ ba thì buổi chỉ là hoạt động vui.',
    'Ưu tiên luyện nhiều, giảng ít. Mỗi hoạt động chốt không quá 20 giây. Mini-talk không quá 15 phút.',
    'Sửa đúng một ý mỗi lần. Học sinh nói thiếu ý nào thì chỉ thẻ ý đó, cho nói lại một lần. Không sửa hai ba lỗi trong một lượt.',
    'Không trách phạt kiểu mắng mỏ. Ưu tiên phản hồi, coaching, đồng hành. Trọng tâm là *được sửa*, không phải *bị phạt*.',
    'Luật lớp phải công bố trước khi luyện: không trêu bạn nói sai, không trêu bạn nói thật.',
    'Không bêu tên thật, không kể chuyện cá nhân nhạy cảm. Góp ý hành vi, không gắn nhãn người.',
    'Vinh danh theo minh chứng thật, không theo nói hay. Từ một lần lên bốn lần cũng là tiến bộ và cũng đáng khen.',
    'Quy ước lớp phải do chính học sinh đồng kiến tạo — năm điều ngắn, dễ nhớ, dán góc lớp. Không phát bộ quy ước in sẵn.',
    'Mỗi buổi kết thúc bằng một cam kết đo được và một nhật ký 7 ngày. Nhật ký phát ra thì phải thu lại, nếu không chuyên đề dừng ở lớp.',
    'Cam kết phải cụ thể. Câu *em sẽ cố gắng hơn* không đo được nên buổi sau không kiểm được.',
    'Timebox mọi hoạt động bằng chuông hoặc timer. Chuông kêu là dừng, kể cả khi đang nói dở.',
    'Không ai đứng một mình. Trước khi kết buổi, mọi học sinh phải vào nhóm hoặc có buddy.',
    'Học liệu phải đúng độ tuổi. Không dùng ví dụ quá đen tối, không dùng nội dung giật gân, kể cả khi chủ đề là rủi ro trên mạng.',
    'Trạm thực hành phải cài nhiễu — bạn trêu, bạn đòi làm thay, bạn chen — nếu không học sinh chỉ diễn lại mẫu đã thuộc.',
    'Trường thiếu thiết bị số thì giữ nguyên tư duy và cấu trúc, chỉ thay công cụ số bằng công cụ giấy: lịch treo tường, bảng Kanban giấy, một cuốn Gen Việt Notebook.',
    'Mỗi chuyên đề phải chốt bằng sản phẩm tối thiểu cầm về được. Nguồn liệt kê sản phẩm này ngay ở bảng thông tin khung, trước cả kịch bản.',
    'Ngưỡng đi tiếp phải kiểm trước khi sang pha sau. Nguồn đặt ngưỡng 70% ở tiết 1 và 80% ở tiết 2 cho phần nhận diện đúng sai.',
    'Ban Cố vấn duyệt kế hoạch học kỳ và các hoạt động lớn; Ban Lãnh đạo Học sinh lên kế hoạch từng buổi và thu dữ liệu lên dashboard. Hai việc này không đổi vai.'
  ];

  /* ── 10 · Dấu hiệu một buổi đang hỏng ────────────────────────
     Gom từ cột "Tiêu chí quan sát" khi tiêu chí không đạt, và từ
     các lỗi thường gặp mà nguồn liệt kê để giáo viên đi sửa. */
  G.GA_HONG = [
    'Học sinh giơ thẻ theo bạn bên cạnh, không em nào nói được thiếu ý gì.',
    'Câu chuyện bài học bị kể thành lời răn dạy. Cả lớp im, không trả lời được ba câu hỏi gợi mở.',
    'Giáo viên giảng nghĩa khẩu quyết quá ba phút. Học sinh nghe xong không đọc lại được.',
    'Mini-talk chiếm quá 20 phút, hoạt động nhóm bị cắt còn 15 phút, không nhóm nào ra được sản phẩm.',
    'Trong cặp luyện, một em làm hết, em kia chỉ ngồi nghe.',
    'Trạm thực hành thành chỗ chơi vì không cài nhiễu.',
    'Cam kết viết chung chung kiểu *em sẽ cố gắng hơn*, không có số, không có ngày.',
    'Quy ước lớp là bản in sẵn của giáo viên. Tuần sau không ai nhắc tới.',
    'Vinh danh rơi vào vài em vốn đã giỏi, không dựa trên minh chứng của tuần.',
    'Bản tin Gen Việt đầu buổi biến thành thông báo hành chính.',
    'Nhật ký 7 ngày phát ra rồi không thu, chuyên đề dừng lại ở trong lớp.',
    'Dưới 80% chọn đúng ở quiz ôn luyện mà vẫn đi tiếp sang pha thực hành.',
    'Giáo viên sửa hai ba lỗi một lượt, học sinh rối rồi im hoặc khóc.',
    'Học sinh đã ngồi mà người dạy còn đang dán thẻ, thử chuông, đếm phiếu.',
    'Không thu được phiếu feedback nào, nên buổi sau không có dữ liệu để biết hoạt động lõi có ăn hay không.'
  ];

})(window.GV = window.GV || {});
