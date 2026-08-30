/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · HỆ THỐNG HUẤN LUYỆN NHÂN TÀI — TẦM NHÌN 30 NĂM
   Lõi dữ liệu. Toàn bộ kiến trúc nằm ở tệp này; giao diện chỉ dựng lại.
   Kế thừa nguyên vẹn: mô thức G–I–T–A, năm tầng T1–T5, 12 trục KPI,
   thang 5 mức trưởng thành, bốn băng XANH–VÀNG–CAM–ĐỎ của GITA 365.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var GV = window.GV || {};
window.GV = GV;

GV.META = {
  ten: 'GEN VIỆT 365',
  phu: 'Hệ thống huấn luyện nhân tài',
  ban: '1.0',
  tam: '2026 – 2056',
  suMenh: 'Nâng tầm trí tuệ vàng Việt Nam.',
  hocVien: 'Học viện GITA · Trương Nhật Quang · 08.5555.4688',
  motCau: 'Một mạng lưới nhân tài Việt tự tái tạo: người được rèn quay lại rèn người tiếp theo — và hệ thống sống lâu hơn người dựng ra nó.'
};

/* ══════════ ĐỊNH VỊ — GEN VIỆT 365 khác GITA 365 ở đâu ══════════
   Hai hệ không thay nhau. GITA 365 xử lý CA: một gia đình, một vấn đề,
   năm tầng, có điểm kết thúc. GEN VIỆT 365 nuôi NGƯỜI: một đời người,
   sáu bậc, ba mươi năm, không có điểm kết thúc — chỉ có bậc kế tiếp. */
GV.DINH_VI = {
  cauHoi: 'Vì sao phải có hệ thứ hai, khi GITA 365 đã đủ chặt?',
  ly: 'Vì hai hệ trả lời hai câu hỏi khác nhau. Một hệ giỏi chữa và kiến tạo cho từng nhà vẫn có thể để mất người giỏi sau khi ca đóng — bởi không ai chịu trách nhiệm về mười năm tiếp theo của em ấy. GEN VIỆT 365 là hệ chịu trách nhiệm phần đó.',
  bang: [
    { truc: 'Đơn vị công việc', gita: 'Một ca — một gia đình, một vấn đề', gv: 'Một con người — theo suốt các bậc' },
    { truc: 'Câu hỏi trung tâm', gita: 'Vấn đề gì · vì sao · làm thế nào', gv: 'Em này có thể lớn tới đâu, và ai rèn tiếp' },
    { truc: 'Chiều thời gian', gita: '7 → 21 → 90 → 365 ngày', gv: '365 ngày × nhiều năm, tới 30 năm' },
    { truc: 'Kết thúc khi', gita: 'Nghiệm thu đạt, ca đóng', gv: 'Không đóng. Chuyển bậc, hoặc trở thành người rèn' },
    { truc: 'Đầu ra', gita: 'Hồ sơ chuyển hoá · Master Portfolio', gv: 'Hộ chiếu nhân tài · người dẫn thế hệ sau' },
    { truc: 'Sở hữu dữ liệu', gita: 'Hồ sơ gia đình', gv: 'Hồ sơ cá nhân, đi theo người, không theo gói' },
    { truc: 'Quan hệ', gita: 'GEN VIỆT 365 dùng toàn bộ kho giải pháp của GITA 365 làm tầng công cụ', gv: 'GITA 365 dùng GEN VIỆT 365 làm nơi người giỏi đi tiếp sau khi ca đóng' }
  ]
};

/* ══════════ BẢY NGUYÊN LÝ BẤT BIẾN ══════════
   Lớp đổi chậm nhất. Ba mươi năm tới, mọi thứ khác được phép đổi;
   bảy điều này chỉ được đổi bởi Hội đồng Chuẩn, và mỗi lần đổi phải
   ghi lại lý do trong Sổ Chuẩn. */
GV.NGUYEN_LY = [
  { so: 1, t: 'Nâng theo bằng chứng, không theo thời gian',
    n: 'Ở lâu không phải là lý do lên bậc. Cổng nào cũng đòi bằng chứng quan sát được: sản phẩm, số liệu, hành vi lặp lại trong nhiều bối cảnh.',
    v: 'Đây là điều bảo vệ hệ thống khỏi lạm phát danh hiệu — thứ giết mọi hệ đào tạo sau khoảng năm thứ mười.' },
  { so: 2, t: 'Mọi can thiệp đều nhắm tới việc tự xoá mình',
    n: 'Coach giỏi là Coach ngày càng ít phải có mặt. Chỉ số quan trọng nhất của một chặng không phải kết quả, mà là mức hỗ trợ đã giảm được bao nhiêu mà kết quả vẫn giữ.',
    v: 'Không có nguyên lý này, hệ thống lớn lên bằng cách giữ người phụ thuộc — và sẽ sụp khi người sáng lập dừng lại.' },
  { so: 3, t: 'Đọc đủ tám lớp trước khi chạm vào bất cứ thứ gì',
    n: 'Biểu hiện → khoảng cách → cơ chế → đòn bẩy → thử nghiệm → kiến tạo → chuyển hoá → bứt phá. Không kết luận nguyên nhân từ biểu hiện, không chọn giải pháp từ vấn đề.',
    v: 'Ma trận 8 × 8 của GITA giữ nguyên vẹn, áp cho cả huấn luyện nhân tài chứ không riêng xử lý ca.' },
  { so: 4, t: 'Một chính · hai hỗ trợ · một dự phòng',
    n: 'Mỗi chu kỳ chỉ một đòn bẩy chính. Làm mười thứ cùng lúc là cách chắc chắn nhất để không biết thứ nào đã có tác dụng.',
    v: 'Ít đòn bẩy thì đo được nhân quả; đo được nhân quả thì kho chiến lược mới giàu lên theo thời gian.' },
  { so: 5, t: 'Gia đình là nôi · nhà trường là sân khấu · cộng đồng là trường luyện',
    n: 'Không tách trẻ khỏi nôi để rèn. Mọi năng lực dựng trong hệ thống phải quay về sống được trong ba môi trường ấy, nếu không thì chỉ là biểu diễn.',
    v: 'Trại và câu lạc bộ tạo bước ngoặt; gia đình giữ nhịp. Thiếu vế sau, bước ngoặt tan trong ba tuần.' },
  { so: 6, t: 'Không có nhân tài một mùa',
    n: 'Mỗi kỳ tích phải để lại một năng lực chuyển giao được sang bối cảnh khác. Một giải thưởng không kèm năng lực chuyển giao thì tính là chưa nghiệm thu.',
    v: 'Đây là ranh giới giữa phát triển tài năng và bệnh thành tích.' },
  { so: 7, t: 'Hệ thống phải sống lâu hơn người dựng nó',
    n: 'Mọi chuẩn phải viết được, dạy được, kiểm được bởi người thứ ba. Điều gì chỉ nằm trong đầu một người thì chưa phải là chuẩn — đó là thói quen cá nhân.',
    v: 'Nguyên lý này là điều kiện cần của mọi tầm nhìn dài hơn một đời người.' }
];

/* ══════════ BẢY LỚP KIẾN TRÚC ══════════
   Xếp theo tốc độ đổi: lớp trên cùng đổi chậm nhất, lớp dưới đổi nhanh
   nhất. Nguyên tắc kiến trúc: lớp nhanh được phép phụ thuộc lớp chậm,
   KHÔNG bao giờ ngược lại. Vi phạm chiều phụ thuộc này là cách một hệ
   thống ba mươi năm chết ở năm thứ tám. */
GV.LOP = [
  { ma: 'L0', t: 'LÕI BẤT BIẾN', toc: 'Đổi 1 lần / 10 năm',
    giu: 'Sứ mệnh · 7 nguyên lý · định nghĩa nhân tài · ranh giới đạo đức',
    ai: 'Hội đồng Chuẩn',
    chi: 'Mọi tranh cãi không giải được ở lớp dưới đều leo lên đây, và câu trả lời phải nằm sẵn ở đây từ trước.' },
  { ma: 'L1', t: 'CHUẨN', toc: 'Đổi 1 lần / 2–3 năm',
    giu: 'Khung năng lực 4 trụ × 12 trục · 6 bậc nhân tài · thang 5 mức · bộ cổng nghiệm thu · hệ mã hoá',
    ai: 'Quản lý chuyên môn + Hội đồng Chuẩn',
    chi: 'Lớp này là hợp đồng giữa mọi bộ phận. Kho, huấn luyện, vận hành và phần mềm đều đọc chung một bảng ở đây.' },
  { ma: 'L2', t: 'KHO', toc: 'Bồi đắp liên tục',
    giu: '1.000 kịch bản · 220 phác đồ · 42 mô thức · 550 tình huống 5 tầng · 100 chiến lược · 6 quyển Nôi Nuôi Dưỡng Nhân Tài · bộ test 25 × 30 câu',
    ai: 'Ban biên soạn · mọi vai được gửi lên, R01–R02 duyệt',
    chi: 'Kho chỉ lớn lên bằng ca thật đã nghiệm thu. Không nhận nội dung chưa từng chạy trên một gia đình.' },
  { ma: 'L3', t: 'HUẤN LUYỆN', toc: 'Chạy theo nhịp 365',
    giu: '5 hình thái · nhịp ngày–tuần–21–90–365 · lộ trình từng bậc · thiết kế trại và câu lạc bộ',
    ai: 'Coach · Giáo viên · Mentor · Trưởng trại · Đội trưởng CLB',
    chi: 'Nơi duy nhất người học thật sự chạm vào hệ thống. Mọi lớp trên tồn tại để lớp này chạy đúng.' },
  { ma: 'L4', t: 'VẬN HÀNH', toc: 'Rà 1 lần / quý',
    giu: '20 vai · quy trình 10 bước xử lý ca · luật làm việc với gia đình · nhịp dịch vụ · tài chính · học bổng',
    ai: 'Giám đốc · Admin hệ thống',
    chi: 'Lớp này biến chuẩn thành lịch, thành người, thành tiền. Chuẩn không có lớp này thì chỉ là tài liệu đẹp.' },
  { ma: 'L5', t: 'CỘNG ĐỒNG', toc: 'Đổi theo mùa',
    giu: 'Gia đình · CLB Gen Việt · 4 cấp đại sứ · trại hè · cựu học viên · trường học và doanh nghiệp đối tác',
    ai: 'Ban cộng đồng · đại sứ · cựu học viên bậc 5',
    chi: 'Lớp tạo ra lực kéo: người ở lại vì cộng đồng, không vì hợp đồng.' },
  { ma: 'L6', t: 'QUẢN TRỊ & KẾ THỪA', toc: 'Rà 1 lần / năm',
    giu: 'Hội đồng Chuẩn · sổ phiên bản · kho tài sản trí tuệ · đạo đức và an toàn trẻ em · kế hoạch chuyển giao thế hệ',
    ai: 'Hội đồng Chuẩn · Super Admin',
    chi: 'Lớp mà hầu hết tổ chức bỏ qua trong mười năm đầu, rồi trả giá ở năm thứ mười lăm.' }
];

/* Trục dọc xuyên bảy lớp */
GV.TRUC_DOC = {
  t: 'HỘ CHIẾU NHÂN TÀI',
  n: 'Một người — một hồ sơ — suốt ba mươi năm. Không thuộc về gói dịch vụ, không mất khi ca đóng, không phải làm lại khi đổi Coach hay đổi vùng.',
  truong: [
    { k: 'Định danh', v: 'GV-<năm vào>-<vùng>-<số> · không đổi trọn đời' },
    { k: 'Bậc và ngày đạt', v: 'Từng bậc kèm ngày qua cổng và tên người nghiệm thu' },
    { k: 'Bản đồ 12 trục', v: 'Mức 1–5 từng trục, chụp lại mỗi 90 ngày — xem được cả đường đi, không chỉ điểm hiện tại' },
    { k: 'Mức hỗ trợ', v: 'Đường cong hỗ trợ giảm dần qua các năm — chỉ số quan trọng nhất của hệ' },
    { k: 'Bằng chứng', v: 'Sản phẩm · dự án · giải · phản hồi người dùng thật · nhật ký' },
    { k: 'Người đã rèn em ấy', v: 'Chuỗi Coach và Mentor qua các năm — để truy được nguồn của chất lượng' },
    { k: 'Người em ấy đã rèn', v: 'Từ bậc 5 trở lên. Đây là trường đo sự tự tái tạo của hệ thống' },
    { k: 'Quyền của người sở hữu', v: 'Xem toàn bộ · xuất bản sao · yêu cầu xoá — kể cả khi đang là học viên' }
  ]
};

/* ══════════ SÁU BẬC NHÂN TÀI ══════════ */
GV.BAC = [
  { ma: 'B1', t: 'HẠT', tuoi: '7–10 tuổi · hoặc mọi người mới vào', mau: '#185AB4',
    hoi: 'Em là ai, và điều gì làm em sáng lên?',
    dich: 'Nhận diện đúng · thắp được lửa · có một thói quen tự chọn giữ được 21 ngày',
    truc: 'G1 Mục tiêu · I1 Kỷ luật nền · T1 Năng lực học',
    bang: 'Bản đồ cá nhân 11 ô · nhật ký 21 ngày · một việc làm được mà trước đó chưa làm được',
    cong: 'Nói được bằng lời của mình: em muốn gì, vì sao, và bước tiếp theo là gì',
    toi: '3–6 tháng', ai: 'Phụ huynh dẫn · Coach nhận diện' },
  { ma: 'B2', t: 'MẦM', tuoi: '11–13 tuổi', mau: '#5140B4',
    hoi: 'Em có tự chạy được một ngày của mình không?',
    dich: 'Tự quản nền: kế hoạch · kỷ luật · phương pháp học · phục hồi sau thất bại',
    truc: 'A2 Tự quản · I3 Kỷ luật · I6 Phục hồi · T4 Năng lực học',
    bang: 'Bốn chu kỳ 21 ngày liên tiếp đạt cổng · số lần phụ huynh phải nhắc giảm ≥ 60%',
    cong: 'Ba tuần liền tự vận hành mà không có người lớn đứng cạnh, kết quả không tụt',
    toi: '12 tháng', ai: 'Coach dẫn · phụ huynh giữ nhịp · CLB rèn hằng tuần' },
  { ma: 'B3', t: 'THÂN', tuoi: '14–16 tuổi', mau: '#0B6675',
    hoi: 'Điểm mạnh nào của em đáng đầu tư thành tài năng thật?',
    dich: 'Tự điều hành · một tài năng nổi trội được xác định và luyện sâu · một dự án đầu tiên có người dùng thật',
    truc: 'T8 Tài năng · T5 Hiệu suất · A11 Dự án · G10 Định hướng',
    bang: 'Một sản phẩm hoàn chỉnh có phản hồi từ người ngoài gia đình · hồ sơ năng lực 90 ngày × 4',
    cong: 'Bảo vệ được dự án trước hội đồng, và chỉ ra được năng lực nào đã chuyển sang việc khác',
    toi: '18 tháng', ai: 'Coach phản biện · Mentor chuyên môn · CLB làm sân khấu' },
  { ma: 'B4', t: 'TRỤ', tuoi: '17–19 tuổi', mau: '#0B7350',
    hoi: 'Em đứng được một mình tới đâu, và em dẫn được ai?',
    dich: 'Tự lập · định hướng nghề có căn cứ · portfolio · dẫn được một nhóm nhỏ tới kết quả',
    truc: 'A9 Lãnh đạo · G10 Nghề nghiệp · G12 Tạo giá trị · I7 Tự chủ',
    bang: 'Một nhóm do em dẫn đạt mục tiêu · portfolio nghề · hai bối cảnh ngoài trường học',
    cong: 'Người trong nhóm xác nhận em dẫn được — không chỉ em tự nhận',
    toi: '24 tháng', ai: 'Cố vấn phát triển · doanh nghiệp đối tác · Coach chiến lược' },
  { ma: 'B5', t: 'NGƯỜI DẪN', tuoi: '20–25 tuổi', mau: '#BE0E16',
    hoi: 'Em rèn được người khác tới bậc nào?',
    dich: 'Trở thành Mentor trong hệ: kèm được bậc dưới đi qua ít nhất một cổng lớn, đúng chuẩn, có hồ sơ',
    truc: 'Toàn bộ 12 trục ≥ mức 4 · riêng trục trụ chính đạt mức 5',
    bang: 'Ít nhất 3 người bậc dưới qua cổng dưới sự dẫn dắt của em, được Assessor độc lập xác nhận',
    cong: 'Chất lượng người em rèn ra — không phải thành tích của chính em',
    toi: '36 tháng', ai: 'Quản lý chuyên môn nghiệm thu · Hội đồng Chuẩn công nhận' },
  { ma: 'B6', t: 'KIẾN TRÚC SƯ', tuoi: '25 tuổi trở lên', mau: '#A8801F',
    hoi: 'Em giữ được chuẩn khi không còn ai giữ hộ chứ?',
    dich: 'Giữ chuẩn · đào tạo người dẫn · mở vùng mới · viết được phần kho mà trước đó chưa ai viết',
    truc: 'Không đo bằng 12 trục nữa. Đo bằng số người dẫn mà em tạo ra và độ bền của chuẩn ở vùng em phụ trách',
    bang: 'Một vùng hoặc một nhánh chuyên môn chạy đúng chuẩn trong 24 tháng khi em không có mặt hằng ngày',
    cong: 'Hội đồng Chuẩn bỏ phiếu · nhiệm kỳ 5 năm, có tái nghiệm thu',
    toi: 'Không giới hạn', ai: 'Hội đồng Chuẩn' }
];

/* ══════════ KHUNG NĂNG LỰC: 4 TRỤ × 3 TRỤC = 12 ══════════
   Mười hai trục lấy nguyên từ hệ KPI nâng cao Tầng 5 của GITA 365,
   nhưng được xếp lại dưới bốn trụ G–I–T–A để một người nhìn bảng là
   biết trục ấy thuộc miền nào — thay vì học thuộc mười hai dòng rời. */
GV.TRU = [
  { k: 'G', t: 'Goal — Hệ thống mục tiêu', mau: '#185AB4',
    hoi: 'Em đang đi đâu, và đích ấy có phải của em không?',
    truc: [
      { so: 1, t: 'Mục tiêu', do: 'Quyền sở hữu mục tiêu', bang: 'Goal Map do chính em viết', ky: '21 / 90 ngày' },
      { so: 10, t: 'Định hướng nghề', do: 'Độ rõ của đường đi', bang: 'Trải nghiệm nghề có ghi chép', ky: '90 ngày' },
      { so: 12, t: 'Tạo giá trị', do: 'Tác động lên người khác', bang: 'Phản hồi của người dùng thật', ky: '180 / 360 ngày' }
    ]},
  { k: 'I', t: 'Inspirits — Nội lực', mau: '#5140B4',
    hoi: 'Điều gì giữ em đi tiếp khi việc trở nên khó?',
    truc: [
      { so: 3, t: 'Kỷ luật', do: 'Độ bền của nhịp', bang: 'Nhật ký · tỷ lệ giữ nhịp', ky: 'Tuần' },
      { so: 6, t: 'Phục hồi', do: 'Thời gian quay lại sau vấp', bang: 'Sổ phục hồi', ky: 'Theo sự kiện' },
      { so: 7, t: 'Tự chủ', do: 'Mức hỗ trợ còn cần', bang: 'Quan sát nhiều bối cảnh', ky: 'Tháng' }
    ]},
  { k: 'T', t: 'Talent — Hệ thống tài năng', mau: '#0B7350',
    hoi: 'Em làm được gì mà người khác chưa làm được như thế?',
    truc: [
      { so: 4, t: 'Năng lực học', do: 'Nhớ bền và chuyển giao', bang: 'Bài kiểm 24 giờ · bài chuyển bối cảnh', ky: '21 ngày' },
      { so: 5, t: 'Hiệu suất', do: 'Sản lượng và chất lượng', bang: 'Sản phẩm thật · giờ tập trung sâu', ky: 'Tuần' },
      { so: 8, t: 'Tài năng', do: 'Độ khác biệt', bang: 'Thành tích trong thử thách khó', ky: '90 ngày' }
    ]},
  { k: 'A', t: 'Action & Academy — Hành động và môi trường', mau: '#BE0E16',
    hoi: 'Hệ thống quanh em đang nâng em lên hay kéo em xuống?',
    truc: [
      { so: 2, t: 'Tự quản', do: 'Lập kế hoạch và thực thi', bang: 'Độ chính xác của kế hoạch', ky: 'Tuần' },
      { so: 9, t: 'Lãnh đạo', do: 'Trách nhiệm với nhóm', bang: 'Kết quả nhóm · phản hồi đồng đội', ky: 'Theo dự án' },
      { so: 11, t: 'Dự án', do: 'Năng lực đưa việc tới đích', bang: 'Cột mốc · sản phẩm bàn giao', ky: 'Tuần' }
    ]}
];

/* Thang 5 mức trưởng thành — dùng chung cho cả 12 trục */
GV.MUC = [
  { m: 1, t: 'Biết', quyen: 'Coach điều hành', ho: 'Cao', bang: 'Nói lại được' },
  { m: 2, t: 'Làm được', quyen: 'Coach cùng học viên', ho: 'Trung bình', bang: 'Làm xong một lần có hướng dẫn' },
  { m: 3, t: 'Ổn định', quyen: 'Học viên phần lớn', ho: 'Thấp', bang: 'Đường xu hướng giữ được nhiều tuần' },
  { m: 4, t: 'Tự điều chỉnh', quyen: 'Học viên', ho: 'Khi được yêu cầu', bang: 'Chuyển được sang bối cảnh khác' },
  { m: 5, t: 'Tự nâng chuẩn', quyen: 'Học viên', ho: 'Cố vấn chiến lược', bang: 'Tạo ra giá trị cho người khác' }
];

/* Bậc đòi hỏi hồ sơ mức nào — cổng định lượng, không cảm tính */
GV.BAC_MUC = [
  { bac: 'B1', doi: '≥ mức 2 ở 3 trục bất kỳ', chinh: 'Không bắt buộc trụ chính' },
  { bac: 'B2', doi: '≥ mức 3 ở 6 / 12 trục', chinh: 'Trụ I và trụ A ≥ mức 3' },
  { bac: 'B3', doi: '≥ mức 3 ở 9 / 12 trục', chinh: 'Một trục thuộc trụ T đạt mức 4' },
  { bac: 'B4', doi: '≥ mức 4 ở 8 / 12 trục', chinh: 'Trục 9 Lãnh đạo và trục 10 Nghề nghiệp ≥ mức 4' },
  { bac: 'B5', doi: '≥ mức 4 ở 12 / 12 trục', chinh: 'Trục trụ chính đạt mức 5 · và ≥ 3 người bậc dưới qua cổng' },
  { bac: 'B6', doi: 'Không đo bằng trục', chinh: 'Đo bằng độ bền của chuẩn ở vùng phụ trách' }
];

/* ══════════ NHỊP 365 — ĐỒNG HỒ CỦA HỆ THỐNG ══════════ */
GV.NHIP = [
  { chu: 'NGÀY', viec: '3 việc lõi: một việc nền · một việc luyện · một dòng nhật ký',
    ai: 'Học viên', ra: 'Dữ liệu thô', vi: 'Không có dữ liệu ngày thì mọi phân tích phía sau là phỏng đoán.' },
  { chu: 'TUẦN', viec: 'Một vòng phản tư 20 phút · một con số được cập nhật',
    ai: 'Học viên + phụ huynh', ra: 'Xu hướng tuần', vi: 'Tuần là đơn vị nhỏ nhất mà xu hướng bắt đầu hiện ra.' },
  { chu: '21 NGÀY', viec: 'Một nhịp PDCA · một cổng nhỏ · một quyền mới được trao',
    ai: 'Coach chốt', ra: 'Một thay đổi được giữ', vi: 'Mỗi 21 ngày trao thêm một quyền và một trách nhiệm — đây là cơ chế động lực gốc của hệ.' },
  { chu: '90 NGÀY', viec: 'Bốn nhịp 21 ngày + 6 ngày nghiệm thu · một sản phẩm bàn giao',
    ai: 'Coach + Assessor', ra: 'Một năng lực đạt mức mới', vi: 'Chu kỳ đủ dài để năng lực ổn định, đủ ngắn để sửa hướng khi sai.' },
  { chu: '365 NGÀY', viec: '4 chu kỳ 90 ngày + 5 ngày Hội nghị Phát triển: học viên bảo vệ hồ sơ, phụ huynh trình bày thay đổi của chính mình',
    ai: 'Hội đồng nghiệm thu', ra: 'Bản đồ 12 trục mới · mức hỗ trợ mới', vi: 'Năm ngày cuối là nghi lễ quan trọng nhất trong năm — nơi cả nhà nhìn thấy mình đã đi được bao xa.' },
  { chu: '5 NĂM', viec: 'Xét chuyển bậc lớn · vẽ lại bản đồ 5–20 năm · đổi vai trong cộng đồng',
    ai: 'Hội đồng Chuẩn', ra: 'Bậc mới trong hộ chiếu', vi: 'Bậc không lên hằng năm. Lên bậc là việc của nhiều năm, và phải đáng.' },
  { chu: '30 NĂM', viec: 'Sáu chặng năm năm · ba lần chuyển giao thế hệ người dẫn',
    ai: 'Toàn hệ', ra: 'Một mạng lưới tự tái tạo', vi: 'Đích cuối: hệ chạy đúng chuẩn khi người sáng lập không còn điều hành hằng ngày.' }
];

/* ══════════ NĂM HÌNH THÁI HUẤN LUYỆN ══════════
   Không thay nhau — chồng lên nhau. Một học viên bậc 3 đồng thời nằm
   trong bốn hình thái. Gia đình không phải hình thái thứ sáu: nó là
   môi trường bao trùm cả năm. */
GV.HINH_THAI = [
  { ma: 'H1', t: 'KÈM 1-1', nhip: 'Tuần hoặc hai tuần một buổi',
    manh: 'Chiều sâu — chỗ duy nhất gỡ được nút thắt riêng của một người',
    yeu: 'Đắt, không nhân bản được, dễ tạo phụ thuộc',
    dung: 'Bậc 1–2 khi cơ chế còn chưa rõ · bậc 4–5 khi cần phản biện chiến lược',
    bac: 'B1 · B2 · B4 · B5' },
  { ma: 'H2', t: 'LỚP & KHOÁ', nhip: 'Theo khoá 8–12 buổi',
    manh: 'Chuẩn hoá phần nền, chi phí trên đầu người thấp',
    yeu: 'Không chạm được cơ chế riêng của từng em',
    dung: 'Dạy công cụ nền: phương pháp học, quản trị thời gian, tư duy, ngôn ngữ',
    bac: 'B1 · B2 · B3' },
  { ma: 'H3', t: 'TRẠI', nhip: '2–3 lần / năm · mỗi lần 3–7 ngày',
    manh: 'Nén trải nghiệm, tạo bước ngoặt cảm xúc mà lớp học không tạo nổi',
    yeu: 'Bước ngoặt tan trong ba tuần nếu không có nhịp giữ ở nhà',
    dung: 'Mở bậc mới · gắn kết cộng đồng · thử thách vượt giới hạn (Gen Alpha, Leader Boom)',
    bac: 'B1 → B4' },
  { ma: 'H4', t: 'CÂU LẠC BỘ GEN VIỆT', nhip: 'Hằng tuần, quanh năm',
    manh: 'Nơi rèn bền nhất: tác phong, ngôn ngữ, trách nhiệm, sân khấu thể hiện — có bộ quy chuẩn riêng về trang phục, nhận diện và giao tiếp',
    yeu: 'Chất lượng phụ thuộc đội trưởng; loãng rất nhanh nếu không có chuẩn và người giữ chuẩn',
    dung: 'Xương sống của hệ: giữ người giữa các chu kỳ, và là nơi bậc 5 thực tập dẫn dắt',
    bac: 'B2 → B5' },
  { ma: 'H5', t: 'DỰ ÁN & CỐ VẤN', nhip: 'Theo dự án, 90–180 ngày',
    manh: 'Chỗ duy nhất năng lực bị kiểm bởi thực tế chứ không bởi người chấm',
    yeu: 'Đòi mạng lưới cố vấn và đối tác thật — không tự có trong hai năm đầu',
    dung: 'Bằng chứng cho cổng bậc 3 trở lên · cửa vào doanh nghiệp và nghề nghiệp',
    bac: 'B3 · B4 · B5 · B6' }
];

/* ══════════ HỆ ĐO ══════════ */
GV.BANG_MAU = [
  { b: 'XANH', mau: '#0B7350', n: 'Tự chạy đúng nhịp', lam: 'Giữ nguyên, giảm tiếp mức hỗ trợ', cham: 'Hằng tháng' },
  { b: 'VÀNG', mau: '#B8860B', n: 'Nhịp lung lay, kết quả còn giữ', lam: 'Sửa một biến, không sửa nhiều', cham: 'Hằng tuần' },
  { b: 'CAM', mau: '#C25A17', n: 'Trượt cổng một lần, hỗ trợ phải tăng lại', lam: 'Quay lại lớp cơ chế, đọc lại 8 × 8', cham: 'Hai lần / tuần' },
  { b: 'ĐỎ', mau: '#BE0E16', n: 'Trượt hai cổng liên tiếp hoặc có dấu hiệu an toàn', lam: 'Coach trưởng vào ca, cân nhắc chuyển chuyên môn', cham: 'Trong 48 giờ' }
];

GV.KPI_HE = [
  { t: 'Số nhân tài bậc 3 trở lên', vi: 'Đây là sản lượng thật của hệ, không phải số học viên đăng ký.', dv: 'người / năm' },
  { t: 'Hệ số tự tái tạo', vi: 'Trung bình một người bậc 5 đưa được bao nhiêu người lên bậc 3 mỗi năm. Dưới 1,0 thì hệ phải dựa vào tuyển mới; trên 2,0 thì hệ tự lớn.', dv: 'lần' },
  { t: 'Đường cong hỗ trợ', vi: 'Mức hỗ trợ trung bình giảm bao nhiêu phần trăm sau mỗi 365 ngày, với kết quả không tụt.', dv: '% / năm' },
  { t: 'Tỷ lệ giữ 5 năm', vi: 'Bao nhiêu phần trăm người vào ở bậc 1 còn trong hệ ở năm thứ năm. Đo sức sống của cộng đồng, không đo doanh thu.', dv: '%' },
  { t: 'Độ bền chuẩn giữa các vùng', vi: 'Chênh lệch điểm nghiệm thu cùng một cổng giữa vùng cao nhất và vùng thấp nhất. Chênh quá 15 điểm là chuẩn đang loãng.', dv: 'điểm' },
  { t: 'Tỷ lệ kỳ tích có năng lực chuyển giao', vi: 'Bao nhiêu phần trăm thành tích kèm được một năng lực dùng lại được ở việc khác. Đây là phanh chống bệnh thành tích.', dv: '%' },
  { t: 'Tác động cộng đồng', vi: 'Số người ngoài hệ được hưởng lợi từ dự án của học viên.', dv: 'người / năm' }
];

/* ══════════ HỆ MÃ HOÁ ══════════
   Một mã đọc được bằng mắt, không cần tra bảng. Đây là thứ giữ cho kho
   ba mươi năm không thành đống tài liệu vô danh. */
GV.MA_HOA = [
  { ma: 'GV-2026-HN-000123', la: 'Hộ chiếu nhân tài', gt: 'Hệ · năm vào · vùng · số thứ tự. Không đổi trọn đời, kể cả khi đổi vùng.' },
  { ma: 'GV.B3.T.08', la: 'Một ô năng lực', gt: 'Bậc 3 · trụ T · trục 8 Tài năng. Mọi phác đồ, bài test và tiêu chí nghiệm thu đều treo vào một ô như thế này.' },
  { ma: 'PD.220.T4.CAM', la: 'Một phiếu làm việc', gt: 'Phác đồ số 220 · ở tầng 4 · cho gia đình băng CAM. Không lưu sẵn — ghép lúc hiển thị từ bốn lớp dữ liệu.' },
  { ma: 'KB.1000.H4', la: 'Một kịch bản', gt: 'Kịch bản số 1000 · dùng trong hình thái 4 (câu lạc bộ).' },
  { ma: 'CG.B2.90.03', la: 'Một cổng nghiệm thu', gt: 'Cổng lên bậc 2 · chu kỳ 90 ngày · lần thứ 3.' },
  { ma: 'DA.2029.B4.017', la: 'Một dự án', gt: 'Dự án năm 2029 · của học viên bậc 4 · số 17. Truy được ra sản phẩm và người dùng thật.' }
];

GV.GHEP_KHONG_LUU = {
  t: 'Ghép chứ không lưu',
  n: 'Ba trục nhân nhau — 220 vấn đề × 5 tầng × 4 băng — ra 4.400 phiếu làm việc. Hệ thống KHÔNG lưu 4.400 bản ghi. Nó lưu bốn lớp rồi ghép lúc hiển thị.',
  vi: 'Sửa một chuẩn thì 4.400 phiếu cùng đúng. Viết tay 4.400 bản thì sửa một chuẩn phải sửa 4.400 chỗ — và đến năm thứ ba sẽ không ai dám sửa nữa. Nguyên tắc này áp cho mọi ma trận trong ba mươi năm tới.'
};

/* ══════════ DỮ LIỆU & CÔNG NGHỆ ══════════ */
GV.CONG_NGHE = [
  { chang: 'Chặng 1 · 2026–2028', ten: 'Chạy trên nền đã có',
    lam: 'Apps Script phục vụ thẳng · kho mã hoá AES-256-GCM theo tầng · PWA cài được · Google Sheet làm sổ dữ liệu',
    duoc: 'Không thuê hạ tầng, không lộ mã, dựng trong ngày, đủ cho vài nghìn hồ sơ',
    han: 'Chậm khi mở lần đầu, khó mở API cho đối tác',
    phai: 'Hộ chiếu nhân tài phải xuất ra được dạng mở (JSON + PDF) ngay từ ngày đầu — nếu không, dữ liệu bị khoá vào nền tảng.' },
  { chang: 'Chặng 2 · 2029–2033', ten: 'Dịch vụ riêng',
    lam: 'Tên miền riêng · máy chủ riêng · cơ sở dữ liệu quan hệ cho hộ chiếu · đồng bộ ngoại tuyến cho vùng xa',
    duoc: 'Mở cho hàng chục nghìn hồ sơ, báo cáo toàn hệ theo thời gian thực',
    han: 'Bắt đầu có chi phí vận hành và nghĩa vụ bảo mật thật',
    phai: 'Chuyển đổi phải chạy song song ít nhất 12 tháng. Không có "ngày cắt băng".' },
  { chang: 'Chặng 3 · 2034 trở đi', ten: 'Nền tảng mở',
    lam: 'API cho trường học và doanh nghiệp đối tác · chuẩn năng lực công bố công khai · kho đóng vẫn đóng',
    duoc: 'Chuẩn Gen Việt được nơi khác dùng — đây là cách một chuẩn sống lâu hơn tổ chức tạo ra nó',
    han: 'Rủi ro pha loãng chuẩn tăng mạnh',
    phai: 'Mở chuẩn, không mở kho. Ai dùng chuẩn phải qua nghiệm thu của Hội đồng.' }
];

GV.LUU_BA_TANG = [
  { t: 'Trên thiết bị', gi: 'Trạng thái đang dùng, nhật ký chưa gửi, bản nháp', mat: 'Mất được — chỉ là bản đang làm dở' },
  { t: 'Sổ dữ liệu của hệ', gi: 'Hồ sơ, KPI, cổng, minh chứng, tài chính', mat: 'Sao lưu hằng ngày, giữ 12 bản' },
  { t: 'Kho ba mươi năm', gi: 'Hộ chiếu nhân tài đã đóng chu kỳ, bản in PDF có chữ ký nghiệm thu', mat: 'Bất biến. Chỉ thêm, không sửa, không xoá — trừ khi người sở hữu yêu cầu xoá' }
];

/* ══════════ VAI TRÒ ══════════ */


/* ══════════ TÀI CHÍNH BỀN VỮNG ══════════ */
GV.TAI_CHINH = {
  luat: 'Tiền mua dịch vụ đồng hành. Tiền không mua bậc.',
  vi: 'Ngày nào một gia đình trả thêm tiền để con lên bậc nhanh hơn, ngày đó hộ chiếu nhân tài mất giá trị — và mất giá trị vĩnh viễn, vì không có cách nào chứng minh ngược lại với các khoá trước. Đây là ranh giới không thương lượng.',
  dong: [
    { t: 'Năm tầng dịch vụ GITA 365', vai: 'Dòng chính · nuôi bộ máy chuyên môn', ty: '≈ 60%' },
    { t: 'Trại và khoá học', vai: 'Cửa vào rộng · tuyển chọn tự nhiên', ty: '≈ 20%' },
    { t: 'Câu lạc bộ và phí thành viên', vai: 'Dòng đều · giữ người giữa các chu kỳ', ty: '≈ 10%' },
    { t: 'Hợp tác trường học và doanh nghiệp', vai: 'Mở từ chặng 3 · nuôi mảng dự án', ty: '≈ 10%' }
  ],
  quy: {
    t: 'Quỹ Nhân tài Gen Việt',
    n: 'Trích cố định 5% doanh thu toàn hệ, không phụ thuộc lãi lỗ năm đó.',
    dung: 'Học bổng toàn phần cho học viên bậc 2–3 có bằng chứng năng lực nhưng gia đình không đủ khả năng chi trả. Xét bởi Hội đồng Chuẩn, không xét bởi bộ phận kinh doanh.',
    vi: 'Một hệ huấn luyện nhân tài chỉ tuyển được người trả nổi học phí thì trong ba mươi năm sẽ bỏ lỡ phần lớn nhân tài của đất nước. Trích 5% là cách rẻ nhất để điều đó không xảy ra.'
  }
};

/* ══════════ BẢY RỦI RO VÀ PHANH ══════════ */
GV.RUI_RO = [
  { t: 'Phụ thuộc người sáng lập', dau: 'Mọi quyết định chuẩn đều phải chờ một người',
    phanh: 'Từ năm thứ ba, Hội đồng Chuẩn có ba thành viên trở lên và người sáng lập chỉ giữ một phiếu. Mỗi năm phải có ít nhất một chuẩn được sửa mà người sáng lập không tham gia soạn.' },
  { t: 'Pha loãng chuẩn khi mở rộng', dau: 'Điểm nghiệm thu cùng một cổng chênh nhau giữa các vùng',
    phanh: 'Assessor chấm chéo vùng. Chênh quá 15 điểm thì dừng mở vùng mới cho tới khi khép lại.' },
  { t: 'Bệnh thành tích quay lại từ cửa sau', dau: 'Nhiều giải thưởng, ít năng lực chuyển giao',
    phanh: 'Chỉ số "kỳ tích có năng lực chuyển giao" là KPI bắt buộc báo cáo quý. Dưới 70% thì đóng băng việc công bố thành tích.' },
  { t: 'Mất dữ liệu hoặc tài sản trí tuệ', dau: 'Kho nằm ở một nơi, một người giữ khoá',
    phanh: 'Kho mã hoá, khoá tách khỏi kho, ba bản sao ở ba nơi, và một bản in giấy của L0–L1 cất ở két.' },
  { t: 'Vượt ranh giới chuyên môn', dau: 'Coach xử lý ca có dấu hiệu tâm lý lâm sàng, bạo hành hoặc nguy cơ tự hại',
    phanh: 'Danh sách dấu hiệu chuyển tuyến in trong mọi phác đồ. Gặp dấu hiệu là chuyển chuyên môn trong 24 giờ, không thương lượng, không giữ ca vì doanh thu.' },
  { t: 'Lệ thuộc một dòng tiền', dau: 'Trên 70% doanh thu từ một dòng',
    phanh: 'Ngưỡng cảnh báo 70%. Vượt ngưỡng hai quý liên tiếp thì kế hoạch năm sau phải có dòng thứ hai.' },
  { t: 'Khoá cứng vào một nền tảng công nghệ', dau: 'Không xuất được dữ liệu ra dạng mở',
    phanh: 'Mỗi quý chạy một lần xuất toàn bộ hộ chiếu ra JSON + PDF và mở thử trên máy không có hệ thống. Không mở được thì coi như hỏng.' }
];

/* ══════════ SÁU CHẶNG · BA MƯƠI NĂM ══════════ */
GV.CHANG = [
  { ma: 'C1', nam: '2026–2030', t: 'DỰNG LÕI', mau: '#185AB4',
    hoi: 'Chuẩn đã đủ chặt để người thứ ba dạy lại chưa?',
    lam: ['Khoá L0 và L1 · lập Hội đồng Chuẩn 3 người',
          'Đưa toàn bộ kho hiện có vào hệ mã hoá mới: 1.000 kịch bản · 220 phác đồ · 42 mô thức · 550 tình huống',
          'Chạy hộ chiếu nhân tài cho toàn bộ học viên đang có',
          'Chuẩn hoá một trại và một câu lạc bộ làm bản mẫu để nhân bản'],
    dich: ['1.000 gia đình trong hệ', '100 người đạt bậc 3', '10 người đạt bậc 5'],
    cong: 'Một Coach mới, chỉ đọc tài liệu, dẫn được một ca bậc 2 qua cổng với điểm nghiệm thu ≥ 85.',
    rui: 'Vội mở rộng khi chuẩn chưa viết xong.' },
  { ma: 'C2', nam: '2031–2035', t: 'NHÂN BẢN', mau: '#5140B4',
    hoi: 'Hệ đã tự tạo được người dẫn chưa, hay vẫn phải tuyển từ ngoài?',
    lam: ['Khoá đào tạo Mentor cho bậc 5 · nghiệm thu bởi Assessor độc lập',
          'Mở 10 vùng, mỗi vùng một câu lạc bộ và một đội Coach tại chỗ',
          'Chuyển hệ sang dịch vụ riêng, chạy song song 12 tháng',
          'Lần chuyển giao thế hệ người dẫn thứ nhất'],
    dich: ['10.000 gia đình', 'Hệ số tự tái tạo ≥ 1,0', '50 người bậc 5'],
    cong: 'Quá nửa số người lên bậc 3 trong năm được dẫn bởi người của chính hệ.',
    rui: 'Chuẩn loãng giữa các vùng — đây là rủi ro lớn nhất của cả chặng.' },
  { ma: 'C3', nam: '2036–2040', t: 'VÀO TRƯỜNG', mau: '#0B6675',
    hoi: 'Chuẩn Gen Việt có sống được bên ngoài Học viện không?',
    lam: ['Hợp tác nhà trường: đưa khung 12 trục vào hoạt động ngoại khoá',
          'Mạng lưới cố vấn doanh nghiệp cho dự án bậc 3–4',
          'Công bố công khai chuẩn năng lực · giữ kho đóng',
          'API cho đối tác'],
    dich: ['100 trường đối tác', '1.000 người bậc 4', 'Chuẩn được một hội nghề nghiệp công nhận'],
    cong: 'Một trường không có Coach của Học viện vẫn chấm được cổng bậc 2 đúng chuẩn.',
    rui: 'Mở chuẩn kéo theo mở kho — mất tài sản trí tuệ.' },
  { ma: 'C4', nam: '2041–2045', t: 'MẠNG LƯỚI QUỐC GIA', mau: '#0B7350',
    hoi: 'Người giỏi ở tỉnh xa có cơ hội ngang người ở thành phố không?',
    lam: ['Quỹ Nhân tài mở rộng: học bổng toàn phần cho vùng khó',
          'Đồng bộ ngoại tuyến cho nơi mạng yếu',
          'Cựu học viên bậc 5–6 mở vùng mới',
          'Lần chuyển giao thế hệ thứ hai'],
    dich: ['Có mặt ở 40 tỉnh thành', 'Hệ số tự tái tạo ≥ 2,0', 'Tỷ lệ giữ 5 năm ≥ 50%'],
    cong: 'Ba vùng khó khăn nhất có điểm nghiệm thu nằm trong biên 15 điểm so với vùng mạnh nhất.',
    rui: 'Mở rộng nhanh hơn tốc độ đào tạo người dẫn.' },
  { ma: 'C5', nam: '2046–2050', t: 'RA KHU VỰC', mau: '#BE0E16',
    hoi: 'Mô hình này dịch được sang nền văn hoá khác không?',
    lam: ['Dịch chuẩn và kho sang ngôn ngữ thứ hai, thứ ba',
          'Cấp phép mô hình cho đối tác khu vực, kèm nghiệm thu bắt buộc',
          'Nghiên cứu dài hạn: theo dõi khoá đầu tiên đã hai mươi năm',
          'Công bố kết quả nghiên cứu'],
    dich: ['3 quốc gia', 'Một công trình nghiên cứu theo chiều dọc 20 năm được công bố'],
    cong: 'Một đối tác nước ngoài đạt chuẩn nghiệm thu mà không cần người Việt có mặt.',
    rui: 'Đem mô hình đi mà bỏ lại nguyên lý 5 — tách trẻ khỏi nôi gia đình.' },
  { ma: 'C6', nam: '2051–2056', t: 'TỰ VẬN HÀNH', mau: '#A8801F',
    hoi: 'Hệ chạy được khi người dựng nó không còn điều hành hằng ngày chứ?',
    lam: ['Hội đồng Chuẩn hoàn toàn là người trưởng thành từ hệ',
          'Người sáng lập rút về vai cố vấn, giữ một phiếu',
          'Quỹ tự nuôi được phần chuẩn và nghiên cứu',
          'Lần chuyển giao thế hệ thứ ba'],
    dich: ['Khoá đầu tiên đã ở bậc 6 và đang dẫn hệ', 'Hệ chạy 24 tháng liên tục không cần người sáng lập ra quyết định chuẩn'],
    cong: 'Đây là cổng cuối cùng, và là cổng duy nhất mà người sáng lập không được chấm.',
    rui: 'Chuyển giao muộn — bắt đầu ở chặng 6 thì đã quá muộn, phải bắt đầu từ chặng 2.' }
];

/* ══════════ 90 NGÀY ĐẦU TIÊN ══════════ */
GV.NGAY_90 = [
  { tuan: 'Tuần 1–2', viec: 'Khoá L0: viết ra bảy nguyên lý và định nghĩa nhân tài của Học viện, ký, cất một bản giấy.', ai: 'Người sáng lập', ra: 'Sổ Chuẩn v1' },
  { tuan: 'Tuần 3–4', viec: 'Khoá L1: bảng 4 trụ × 12 trục · 6 bậc · thang 5 mức · điều kiện từng cổng.', ai: 'Quản lý chuyên môn', ra: 'Bảng chuẩn năng lực v1' },
  { tuan: 'Tuần 5–6', viec: 'Đổi mã toàn bộ kho sang hệ mã mới. Mọi phác đồ, kịch bản, tình huống treo vào đúng ô GV.Bx.T.yy.', ai: 'Ban biên soạn', ra: 'Kho đã đánh mã' },
  { tuan: 'Tuần 7–8', viec: 'Dựng hộ chiếu nhân tài v1 trên nền hiện có · xuất thử JSON và PDF · mở trên máy sạch.', ai: 'Admin hệ thống', ra: '30 hộ chiếu mẫu chạy được' },
  { tuan: 'Tuần 9–10', viec: 'Xếp bậc cho toàn bộ học viên đang có. Ai chưa đủ bằng chứng thì để trống, không đoán.', ai: 'Coach + Assessor', ra: 'Bản đồ bậc hiện tại của cả hệ' },
  { tuan: 'Tuần 11–12', viec: 'Chạy thử một cổng bậc 2 đúng chuẩn mới, quay lại toàn bộ, dùng làm bài mẫu đào tạo.', ai: 'Toàn đội', ra: 'Băng ghi cổng mẫu + biên bản' },
  { tuan: 'Ngày 85–90', viec: 'Hội nghị chuẩn lần đầu: soi chỗ chuẩn chưa chặt, ghi vào Sổ Chuẩn, chốt việc quý sau.', ai: 'Hội đồng Chuẩn', ra: 'Sổ Chuẩn v1.1 + kế hoạch quý' }
];

/* ══════════ NGUỒN ══════════ */
GV.NGUON = [
  { t: 'HỆ THỐNG GIẢI PHÁP GITA 365', l: 'Ma trận 8 × 8 · 11 nhóm giải pháp · năm tầng T1–T5 · chuẩn nghiệm thu 100 điểm' },
  { t: 'HỆ THỐNG GIẢI PHÁP VÀ MÃ HOÁ GITA 365', l: 'Sơ đồ vận hành tổng thể · ma trận logic 5 tầng · thư viện 100 chiến lược · 12 trục KPI · thang 5 mức' },
  { t: 'NÔI NUÔI DƯỠNG NHÂN TÀI (6 quyển)', l: 'Triết lý gia đình là nôi · 10 chương · quy trình G-PDCA · nguyên tắc 6C · hành trình 90 / 365 ngày' },
  { t: 'HỆ THỐNG COACH PH GITA 365 NGÀY (2 phần)', l: 'Vai trò phụ huynh · dịch chuyển từ người quản con sang đối tác phát triển' },
  { t: '550 TÌNH HUỐNG 5 TẦNG GITA 365', l: 'Kho tình huống thật, phân theo tầng' },
  { t: 'GITA Tầng 4 · Tầng 5 — 220 vấn đề', l: 'Kiến trúc 4 chu kỳ 90 ngày · bốn cổng N90–N360 · nguyên tắc nâng theo bằng chứng' },
  { t: 'BỘ QUY CHUẨN CLB GEN VIỆT', l: 'Chuẩn trang phục · nhận diện · ngôn ngữ và giao tiếp của câu lạc bộ' },
  { t: 'TRẠI GEN ALPHA · TRẠI LEADER BOOM', l: 'Dữ liệu đăng ký và nguyện vọng phụ huynh — cơ sở thiết kế hình thái trại' },
  { t: 'Mã nguồn GITA 365 v8.0', l: '15 vai · bảng phân quyền · 9 tầng hiển thị · kiến trúc ghép-không-lưu · kho mã hoá AES-256-GCM' },
  { t: 'Khung chi hội BNI (nguồn ngoài duy nhất)', l: 'Kịch bản họp cố định · bảng số hằng tuần · ghế lãnh đạo luân phiên · ban thành viên gác chuẩn · chi hội mở chi hội. Mượn cấu trúc, không mượn động cơ kinh tế' }
];

/* ══════════ NĂM PHẨM CHẤT GEN VIỆT ══════════
   Đích của con người mà hệ thống muốn tạo ra, viết bằng năm chữ. Mỗi phẩm
   chất phải có chỗ rèn cụ thể hằng tuần — nếu không thì nó là khẩu hiệu. */
GV.PHAM_CHAT = [
  { k: 'ĐỨC', t: 'PHẨM CHẤT', tru: 'I', mau: '#0B7350',
    n: 'Trung thực · biết ơn · tôn trọng · giữ lời hứa · nhận trách nhiệm thay vì tìm lý do.',
    ren: 'Luật chi hội · thư biết ơn hằng tuần · giờ phụng sự · báo số thật kể cả khi số xấu',
    do: 'Số thư biết ơn nhận được từ người khác — không phải lời tự nhận' },
  { k: 'DŨNG', t: 'BẢN LĨNH', tru: 'I', mau: '#BE0E16',
    n: 'Dám đứng lên nói · dám nhận việc khó · dám sai và đứng dậy · không bỏ giữa chừng.',
    ren: 'Vòng 45 giây trước cả chi hội · ghế nóng 10 phút · đón khách · nhận ghế ban điều hành',
    do: 'Số lần đứng trước đám đông trong 90 ngày · thời gian quay lại sau một lần trượt' },
  { k: 'TRÍ', t: 'TRÍ TUỆ', tru: 'T', mau: '#185AB4',
    n: 'Học sâu · nghĩ độc lập · phản biện có căn cứ · biết mình chưa biết gì.',
    ren: 'Hạt giống tri thức 7 phút · cặp đôi rèn hằng tuần · dự án có người dùng thật',
    do: 'Bài chuyển bối cảnh · chất lượng câu hỏi em đặt ra, không phải câu trả lời em thuộc' },
  { k: 'CHỦ', t: 'LÀM CHỦ', tru: 'A', mau: '#5140B4',
    n: 'Làm chủ thời gian · cảm xúc · việc học · và tương lai của chính mình.',
    ren: 'Bảng số tuần tự ghi · nhịp rèn tại gia đình · nhiệm kỳ ban điều hành 6 tháng',
    do: 'Mức hỗ trợ còn cần · số lần người lớn phải nhắc' },
  { k: 'CHÍ', t: 'HOÀI BÃO', tru: 'G', mau: '#A8801F',
    n: 'Ước mơ đủ lớn để đáng đánh đổi · đích dài hơn một kỳ thi · muốn để lại gì đó cho người khác.',
    ren: 'Bản đồ 5–20 năm · dự án phụng sự · đại hội Gen Việt cuối năm',
    do: 'Mục tiêu có sống qua ba lần vấp không · tác động lên người ngoài gia đình' }
];

/* ══════════ CHI HỘI GEN VIỆT — MÔ HÌNH VẬN HÀNH ══════════
   Mượn khung tổ chức của BNI: đơn vị nhỏ, gặp hằng tuần, kịch bản cố định,
   đo được từng tuần, ghế lãnh đạo luân phiên, ban thành viên gác chuẩn,
   chi hội mở chi hội. Dịch toàn bộ sang mục đích rèn người trẻ: thay lời
   giới thiệu khách hàng bằng trao cơ hội, thay doanh thu bằng phụng sự,
   thay hợp đồng bằng bằng chứng năng lực.                                */
GV.CLB = {
  goc: {
    t: 'Vì sao mượn khung BNI',
    n: 'BNI giữ được hàng chục nghìn chi hội chạy cùng một chuẩn suốt hơn bốn mươi năm nhờ bốn thứ: một kịch bản buổi họp không đổi, một bảng số đo được hằng tuần, ghế lãnh đạo luân phiên bắt buộc, và một ban thành viên dám mời người ra. Bốn thứ ấy đúng là bốn thứ một hệ huấn luyện ba mươi năm cần.',
    khac: 'Điều KHÔNG lấy: động cơ kinh tế. Ở BNI người ta đến để có khách hàng. Ở Gen Việt em đến để trở thành người mà mình muốn trở thành — nên mọi chỗ BNI đo tiền, Gen Việt đo bằng chứng trưởng thành.'
  },
  quyMo: [
    { c: 'Đơn vị', v: 'CHI HỘI — 24 đến 36 thành viên, cùng khu vực' },
    { c: 'Nhịp', v: 'Sinh hoạt hằng tuần · 90 phút · quanh năm, không nghỉ hè' },
    { c: 'Một mũi nhọn một người', v: 'Mỗi hướng chuyên môn chỉ một thành viên giữ. Không hai em cùng nhận một mũi — để ai cũng có sân riêng và chi hội có đủ mũi' },
    { c: 'Nhiệm kỳ', v: '6 tháng · luân phiên · mọi thành viên phải qua ít nhất một ghế trước khi xét bậc 4' },
    { c: 'Gác cổng', v: 'Ban Thành viên xét đơn vào, xét gia hạn 6 tháng, và có quyền mời ra' }
  ],
  vong: [
    { v: 'V0', t: 'Khách mời', dk: 'Được một thành viên dẫn tới', duoc: 'Dự tối đa 2 buổi, nghe và hỏi', bac: '—' },
    { v: 'V1', t: 'Thành viên thử', dk: 'Đơn được Ban Thành viên duyệt · 60 ngày thử', duoc: 'Vào vòng 45 giây · một cặp đôi rèn mỗi tuần · phải xong khoá nền', bac: 'B1' },
    { v: 'V2', t: 'Thành viên chính thức', dk: 'Xong khoá nền · mũi nhọn được công nhận · bảng số 8 tuần liền không ĐỎ', duoc: 'Có phiếu bầu · nhận ghế nóng · dẫn khách', bac: 'B2' },
    { v: 'V3', t: 'Cốt cán', dk: 'Dẫn một tổ mũi nhọn hoặc một tiểu ban trọn 6 tháng', duoc: 'Đề cử người mới · chấm sơ bộ đơn vào', bac: 'B3' },
    { v: 'V4', t: 'Ban điều hành', dk: 'Được chi hội bầu · nhiệm kỳ 6 tháng, tối đa 2 nhiệm kỳ liền', duoc: 'Điều hành chi hội · chịu KPI của ghế mình', bac: 'B3–B4' },
    { v: 'V5', t: 'Cố vấn chi hội', dk: 'Đã qua ban điều hành · được Liên chi hội công nhận', duoc: 'Kèm chi hội mới · ngồi hội đồng vùng · không còn phiếu trong chi hội cũ', bac: 'B4–B5' }
  ],
  kichBan: [
    { p: '00–05', m: 'Mở đầu và tuyên ngôn', ai: 'Chủ tịch', y: 'Cả chi hội đứng đọc tuyên ngôn. Mỗi tuần một câu — lặp lại là cách một giá trị đi từ tai vào người.' },
    { p: '05–12', m: 'Hạt giống tri thức', ai: 'Trưởng ban Đào tạo hoặc một thành viên', y: 'Bảy phút, đúng một kỹ năng, có việc làm ngay trong tuần. Không giảng đạo lý.' },
    { p: '12–32', m: 'Vòng 45 giây', ai: 'Toàn bộ thành viên', y: '"Em là ai · mũi nhọn của em · tuần này em cần gì." Đứng, nhìn thẳng, không cầm giấy. Đây là bài rèn bản lĩnh đều đặn nhất trong cả hệ.' },
    { p: '32–42', m: 'Ghế nóng', ai: 'Một thành viên, luân phiên', y: 'Mười phút trình bày sâu về mũi nhọn hoặc dự án, rồi nhận phản biện. Mỗi em tới lượt khoảng hai lần một năm — và chuẩn bị cho nó mất nhiều tuần.' },
    { p: '42–52', m: 'Khách mời', ai: 'Ban Đón khách', y: 'Khách tự giới thiệu, chi hội hỏi. Thành viên dẫn khách chịu trách nhiệm đón, xếp chỗ, giải thích luật.' },
    { p: '52–70', m: 'Vòng trao', ai: 'Toàn bộ', y: 'Trao cơ hội · nói lời biết ơn có tên cụ thể · báo kết quả cặp đôi rèn tuần trước. Không ai được trao suông: mỗi lời trao phải kèm việc đã làm.' },
    { p: '70–80', m: 'Bảng số và vinh danh', ai: 'Thư ký', y: 'Chiếu bảng số bảy cột của cả chi hội. Số thật, không sửa. Vinh danh ba người dẫn đầu và gọi tên người đang ở băng ĐỎ — gọi để giúp, không để phạt.' },
    { p: '80–88', m: 'Cam kết tuần tới', ai: 'Toàn bộ', y: 'Mỗi em nói một câu cam kết công khai. Tuần sau mở đầu vòng trao bằng chính câu ấy.' },
    { p: '88–90', m: 'Chốt', ai: 'Chủ tịch', y: 'Một câu chốt, một tràng vỗ tay, một tấm ảnh. Kết thúc đúng phút thứ 90 — đúng giờ là bài học đầu tiên chi hội dạy.' }
  ],
  bangSo: [
    { c: 'C', t: 'Có mặt', d: 'Có · vắng có phép · vắng không phép · có người thay', n: 'Vắng không phép 3 lần trong 6 tháng thì mất ghế. Được cử người thay: bạn, anh chị hoặc phụ huynh dự và trình bày thay.' },
    { c: 'Đ', t: 'Đúng giờ', d: 'Số phút muộn', n: 'Muộn không phải lỗi nhỏ — nó lấy thời gian của hai mươi tư người khác.' },
    { c: 'T', t: 'Trao cơ hội', d: 'Số lượt trao trong tuần', n: 'Một cuộc thi, một suất học, một người nên quen, một việc bạn làm được. Trao đúng người, không trao cho đủ số.' },
    { c: 'G', t: 'Gặp riêng', d: 'Số cặp đôi rèn đã thực hiện', n: 'Mỗi tuần một bạn khác nhau, 30 phút, có phiếu ghi lại. Đây là nơi tình bạn thật hình thành, không phải ở buổi họp.' },
    { c: 'K', t: 'Khách mời', d: 'Số khách dẫn tới', n: 'Chi hội sống bằng người mới. Không có khách thì sau một năm chi hội thành câu lạc bộ khép kín.' },
    { c: 'B', t: 'Biết ơn', d: 'Số thư biết ơn NHẬN được từ bạn khác', n: 'Cột quan trọng nhất, và là cột duy nhất em không tự ghi được cho mình. Nó đo giá trị thật em đã trao.' },
    { c: 'P', t: 'Phụng sự', d: 'Số giờ đóng góp cho cộng đồng', n: 'Có xác nhận của nơi nhận. Giờ phụng sự vào thẳng hộ chiếu nhân tài.' }
  ],
  ban: [
    { g: 'Chủ tịch', l: 'Giữ kịch bản và giữ giờ · chủ trì buổi họp · đại diện chi hội', kpi: 'Buổi họp kết thúc đúng 90 phút · tỷ lệ có mặt ≥ 90%' },
    { g: 'Phó chủ tịch', l: 'Giữ bảng số · theo dõi thành viên băng CAM và ĐỎ', kpi: 'Mọi thành viên ĐỎ được chạm trong 48 giờ' },
    { g: 'Thư ký – Thủ quỹ', l: 'Ghi biên bản · công bố bảng số · giữ quỹ chi hội', kpi: 'Bảng số công bố trong 24 giờ sau buổi họp' },
    { g: 'Trưởng ban Thành viên', l: 'Xét đơn vào · xét gia hạn 6 tháng · xử vi phạm luật', kpi: 'Không giữ lại thành viên đã hai kỳ liền không đạt chuẩn' },
    { g: 'Trưởng ban Đào tạo', l: 'Hạt giống tri thức · khoá nền cho thành viên thử · ghép cặp đôi rèn', kpi: '100% thành viên thử xong khoá nền trong 60 ngày' },
    { g: 'Trưởng ban Đón khách', l: 'Mời và đón khách · ngày mở cửa hằng tháng', kpi: '≥ 2 khách mỗi buổi · ≥ 1 khách thành thành viên mỗi quý' },
    { g: 'Trưởng ban Phụng sự', l: 'Tổ chức dự án cống hiến · xác nhận giờ phụng sự', kpi: '≥ 1 dự án cộng đồng mỗi quý có người thụ hưởng thật' }
  ],
  to: {
    t: 'Tổ mũi nhọn',
    n: 'Bốn đến sáu thành viên có hướng bổ trợ nhau, gặp riêng hai tuần một lần và cùng nhận một dự án. Tổ là nơi mũi nhọn của từng em được mài; chi hội là nơi nó được thử.',
    ds: ['Tổ Truyền thông — viết · ảnh · dựng phim · dẫn chương trình',
         'Tổ Khoa học – Công nghệ — lập trình · thí nghiệm · thi học thuật',
         'Tổ Kinh doanh – Khởi nghiệp — bán hàng · quản lý tiền · dự án nhỏ',
         'Tổ Nghệ thuật — âm nhạc · hội hoạ · sân khấu',
         'Tổ Thể chất — thể thao · sức bền · kỷ luật thân thể',
         'Tổ Xã hội — thiện nguyện · môi trường · cộng đồng']
  },
  luat: [
    'Cho đi trước. Mỗi tuần trao đi ít nhất một thứ có ích cho một người cụ thể.',
    'Có mặt. Vắng phải báo trước và cử người thay. Ba lần vắng không phép trong sáu tháng thì mất ghế.',
    'Đúng giờ. Đến trước năm phút. Buổi họp bắt đầu và kết thúc đúng phút.',
    'Trang phục và nhận diện đúng bộ quy chuẩn CLB: áo có cổ, giày, huy hiệu, thẻ tên ngực trái.',
    'Nói có căn cứ. Không nói xấu người vắng mặt, không chỉ trích cá nhân, phản biện vào việc.',
    'Số thật. Bảng số tự ghi và tự chịu trách nhiệm. Khai gian một lần là mất tư cách thành viên.',
    'Giữ lời hứa. Cam kết công khai tuần trước phải được báo cáo tuần sau, kể cả khi chưa làm được.',
    'Một mũi nhọn một người. Không tranh sân của bạn; muốn đổi mũi thì xin Ban Thành viên.',
    'Không dùng chi hội để bán hàng, xin tiền hay vận động cho việc riêng của người lớn.',
    'Ra khỏi chi hội trong danh dự: báo trước một tháng, bàn giao việc, và vẫn được mời dự đại hội năm.'
  ],
  baTang: [
    { t: 'CHI HỘI', qm: '24–36 thành viên', nhip: 'Hằng tuần', lam: 'Rèn hằng tuần · bảng số · cặp đôi rèn · dự án nhỏ' },
    { t: 'LIÊN CHI HỘI VÙNG', qm: '5–15 chi hội', nhip: 'Hằng quý', lam: 'Chấm chéo chuẩn giữa các chi hội · thi đấu vùng · đào tạo ban điều hành · mở chi hội mới' },
    { t: 'HỘI ĐỒNG GEN VIỆT', qm: 'Toàn quốc', nhip: 'Hằng năm', lam: 'Đại hội · vinh danh · công nhận bậc 5–6 · sửa chuẩn chi hội · công bố chỉ số toàn hệ' }
  ],
  moMoi: {
    t: 'Mở một chi hội mới',
    b: ['12 thành viên sáng lập, trong đó ít nhất 4 người đã ở V2 trở lên tại chi hội mẹ',
        'Một cố vấn V5 bảo trợ và một Coach của Học viện đỡ đầu',
        'Chạy thử 8 tuần theo đúng kịch bản 90 phút, có bảng số đầy đủ',
        'Đủ 20 thành viên và 8 tuần liền không có tuần nào cả chi hội ở băng ĐỎ',
        'Liên chi hội vùng nghiệm thu và trao huy hiệu chi hội chính thức'],
    n: 'Chi hội mở chi hội — không phải Học viện mở chi hội. Đây là cơ chế nhân bản duy nhất giữ được chuẩn, vì người đi mở đã sống trong chuẩn ấy nhiều năm.'
  }
};

/* ══════════ BỐN MÔI TRƯỜNG THỰC TIỄN ══════════
   Chi hội là nơi RÈN. Bốn môi trường dưới đây là nơi THI. Không có bằng
   chứng ở môi trường thật thì không qua cổng: chi hội không được tự cấp
   bằng chứng cho chính mình.                                             */
GV.MOI_TRUONG = [
  { ma: 'M1', t: 'LỚP HỌC', mau: '#185AB4',
    n: 'Em nhận một vai thật trong tổ chức lớp: lớp trưởng, tổ trưởng, phụ trách học tập, phụ trách phong trào, người kèm bạn yếu.',
    lam: 'Điều hành một sinh hoạt lớp · dựng một góc học tập · tổ chức một buổi ôn nhóm · kèm một bạn tiến bộ có số liệu',
    xn: 'Giáo viên chủ nhiệm xác nhận',
    truc: 'A2 Tự quản · A9 Lãnh đạo · T4 Năng lực học',
    vi: 'Lớp học là tổ chức đầu tiên trong đời một đứa trẻ. Ai điều hành được một tổ ba mươi bạn cùng tuổi thì đã học xong bài lãnh đạo khó nhất.' },
  { ma: 'M2', t: 'HOẠT ĐỘNG TRONG TRƯỜNG', mau: '#5140B4',
    n: 'Kỹ năng sống, câu lạc bộ trường, sự kiện, sân khấu, cuộc thi — nơi em bước ra khỏi bàn học.',
    lam: 'Dẫn một chuyên đề kỹ năng sống · dựng một tiết mục · tổ chức một cuộc thi nhỏ · đại diện trường đi thi',
    xn: 'Tổng phụ trách hoặc ban giám hiệu xác nhận',
    truc: 'I3 Kỷ luật · T8 Tài năng · T5 Hiệu suất',
    vi: 'Trường học là sân khấu thể hiện xuất sắc. Vai của Học viện không phải kéo em ra khỏi trường, mà giúp em toả sáng ngay tại đó.' },
  { ma: 'M3', t: 'GIA ĐÌNH', mau: '#0B7350',
    n: 'Nôi nuôi dưỡng. Nơi nhịp được giữ mỗi ngày và là nơi mọi thay đổi sống hoặc chết.',
    lam: 'Nhịp rèn hằng ngày · hội đồng gia đình hằng tuần · một việc nhà có trách nhiệm trọn vẹn · sổ nhật ký · bản đồ 5–20 năm cả nhà cùng viết',
    xn: 'Phụ huynh ghi Parent Log · Coach đối chiếu',
    truc: 'I7 Tự chủ · I6 Phục hồi · G1 Mục tiêu',
    vi: 'Trại tạo bước ngoặt, chi hội giữ nhịp tuần, nhưng chỉ gia đình giữ được nhịp ngày. Thiếu M3, ba môi trường kia đều tan.' },
  { ma: 'M4', t: 'XÃ HỘI', mau: '#BE0E16',
    n: 'Nơi năng lực bị kiểm bởi thực tế chứ không bởi người chấm: dự án phụng sự, cống hiến, tác động đo được.',
    lam: 'Một dự án cộng đồng có người thụ hưởng thật · giờ phụng sự có xác nhận · sản phẩm có người dùng ngoài gia đình',
    xn: 'Nơi nhận xác nhận · Trưởng ban Phụng sự tổng hợp',
    truc: 'G12 Tạo giá trị · A11 Dự án · A9 Lãnh đạo',
    vi: 'Đây là môi trường phân biệt một học sinh giỏi với một người trẻ có ích. Từ bậc 3 trở lên, không có bằng chứng M4 thì không qua cổng.' }
];

/* Vòng bảy ngày của một thành viên — nơi bốn môi trường và chi hội khớp vào nhau */
GV.TUAN = [
  { ng: 'Thứ Hai', v: 'Nhận việc tuần từ cam kết đã nói trước chi hội · ghi vào sổ' },
  { ng: 'Thứ Ba → Thứ Sáu', v: 'Thực thi ở M1 và M2: vai trong lớp, hoạt động trường · nhịp ngày ở M3' },
  { ng: 'Giữa tuần', v: 'Một cặp đôi rèn 30 phút với một bạn khác trong chi hội · có phiếu ghi' },
  { ng: 'Thứ Bảy', v: 'Việc M4: dự án phụng sự hoặc dự án tổ mũi nhọn' },
  { ng: 'Chủ Nhật', v: 'Sinh hoạt chi hội 90 phút · sau đó hội đồng gia đình 30 phút, cả nhà nhìn lại tuần' }
];

