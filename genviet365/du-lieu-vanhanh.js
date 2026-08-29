/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · KHO VẬN HÀNH
   Lịch năm · sổ tay từng vai · sổ tay ba môi trường · cổng nghiệm thu ·
   báo cáo · biểu mẫu · an toàn và đạo đức · năm đầu tiên.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var GV = window.GV || {};
window.GV = GV;

/* ══════════ LỊCH NĂM CHI HỘI — 52 TUẦN ══════════
   Bốn quý, mỗi quý 13 tuần: 11 buổi thường, 1 sự kiện, 1 buổi tổng kết.
   Lịch này là lịch chung toàn quốc — chi hội không tự đổi mốc, để liên
   chi hội chấm chéo được và để mọi nơi cùng nhịp.                      */
GV.LICH_NAM = [
  { q: 'QUÝ I', tuan: 'T1–T13', chu: 'KHỞI ĐỘNG VÀ NHẬN GHẾ', mau: '#185AB4',
    moc: [
      { t: 'T1', v: 'Khai mùa · bầu và bàn giao ban điều hành · công bố KPI từng ghế' },
      { t: 'T2–T4', v: 'Khoá nền đợt 1 cho thành viên thử · chốt mũi nhọn của người mới' },
      { t: 'T5', v: 'NGÀY MỞ CỬA — mỗi thành viên dẫn ít nhất một khách' },
      { t: 'T6–T8', v: 'Vòng ghế nóng đợt 1 · lập tổ mũi nhọn cho năm' },
      { t: 'T9', v: 'THI VÒNG 45 GIÂY cấp chi hội — hai em nhất nhì đi thi vùng' },
      { t: 'T10–T12', v: 'Dự án phụng sự quý I · chuẩn bị nghiệm thu' },
      { t: 'T13', v: 'Tổng kết quý · công bố bảng số quý · vinh danh' }
    ]},
  { q: 'QUÝ II', tuan: 'T14–T26', chu: 'ĐI SÂU VÀ RA NGOÀI', mau: '#5140B4',
    moc: [
      { t: 'T14–T17', v: 'Khoá nền đợt 2 · cặp đôi rèn chéo tổ' },
      { t: 'T18', v: 'NGÀY MỞ CỬA · mời phụ huynh dự trọn một buổi' },
      { t: 'T19–T21', v: 'Vòng ghế nóng đợt 2 · dự án tổ mũi nhọn' },
      { t: 'T22', v: 'GIAO LƯU LIÊN CHI HỘI — chấm chéo chuẩn giữa các chi hội trong vùng' },
      { t: 'T23–T25', v: 'Trại hè: tuyển chọn, chuẩn bị, giao nhiệm vụ tiền trại' },
      { t: 'T26', v: 'Tổng kết nửa năm · BẦU LẠI BAN ĐIỀU HÀNH · bàn giao ghế' }
    ]},
  { q: 'QUÝ III', tuan: 'T27–T39', chu: 'TRẠI VÀ NĂM HỌC MỚI', mau: '#0B6675',
    moc: [
      { t: 'T27–T28', v: 'TRẠI HÈ (Gen Alpha hoặc Leader Boom) · 21 ngày hậu trại bắt đầu ngay' },
      { t: 'T29–T31', v: 'Hậu trại: cam kết trại thành cam kết công khai trước chi hội' },
      { t: 'T32', v: 'Tổng kết hậu trại · xét lên vòng, lên bậc cho em giữ được cam kết' },
      { t: 'T33–T35', v: 'Vào năm học: nhận vai trong lớp (M1) · đăng ký hoạt động trường (M2)' },
      { t: 'T36', v: 'NGÀY MỞ CỬA đầu năm học — đợt tuyển thành viên lớn nhất trong năm' },
      { t: 'T37–T38', v: 'Khoá nền đợt 3 · ghép cặp đôi rèn cho người mới' },
      { t: 'T39', v: 'Tổng kết quý · rà mũi nhọn: em nào cần đổi mũi thì đổi bây giờ' }
    ]},
  { q: 'QUÝ IV', tuan: 'T40–T52', chu: 'CỐNG HIẾN VÀ TỔNG KẾT', mau: '#0B7350',
    moc: [
      { t: 'T40–T43', v: 'Dự án phụng sự lớn nhất trong năm · toàn chi hội cùng một dự án' },
      { t: 'T44', v: 'Ngày hội gia đình — ba mẹ và con cùng dự, con dẫn chương trình' },
      { t: 'T45–T47', v: 'Bảo vệ hồ sơ bậc: em nào đủ bằng chứng thì bảo vệ trước hội đồng' },
      { t: 'T48', v: 'ĐẠI HỘI VÙNG — vinh danh, thi đấu, công bố chi hội mới' },
      { t: 'T49–T51', v: 'Chuẩn bị mùa sau · viết sổ ghế · chốt kế hoạch năm tới' },
      { t: 'T52', v: 'ĐẠI HỘI GEN VIỆT — công nhận bậc 5–6, công bố chỉ số toàn hệ' }
    ]}
];

/* ══════════ SỔ TAY TỪNG VAI ══════════ */
GV.SO_TAY = [
  { v: 'HỌC VIÊN', mau: '#185AB4',
    tuan: ['Ba việc lõi mỗi ngày · một dòng nhật ký',
           'Một cặp đôi rèn 30 phút với một bạn khác',
           'Dự chi hội đầy đủ 90 phút · nộp bảng số đúng hạn',
           'Làm việc của vai mình trong lớp (M1)'],
    thang: ['Một lần đứng trước đám đông quá ba phút',
            'Một việc cho cộng đồng, dù nhỏ',
            'Đọc lại mục tiêu 90 ngày và tự chấm'],
    khong: ['Không nhờ người lớn viết hộ bản đồ, mục tiêu hay nhật ký',
            'Không sửa số trên bảng số, dù chỉ một cột',
            'Không nhận hai mũi nhọn cùng lúc'],
    do: 'Mức hỗ trợ còn cần · số thư biết ơn nhận được · bằng chứng ở hai môi trường' },
  { v: 'PHỤ HUYNH', mau: '#0B7350',
    tuan: ['Ghi Parent Log: quan sát hành vi, không ghi nhận xét tính cách',
           'Hội đồng gia đình 30 phút, con nói trước, ba mẹ nói sau',
           'Giữ khung giờ và không gian đã thống nhất',
           'Đưa đón đúng giờ chi hội — đúng giờ của ba mẹ dạy nhiều hơn lời khuyên'],
    thang: ['Một buổi trao đổi với Coach, mang số liệu chứ không mang cảm giác',
            'Một lần khen đúng việc, có tên việc cụ thể',
            'Rà lại: tháng này mình đã nhắc bao nhiêu lần, có giảm không'],
    khong: ['Không làm hộ, không nhắc quá số lần đã thống nhất',
            'Không đem con ra so với con nhà khác, kể cả khi khen',
            'Không hứa thưởng cho bậc — bậc không mua được, kể cả bằng phần thưởng'],
    do: 'Số lần nhắc giảm được · Parent Log đủ và thật · con có tìm đến ba mẹ khi khó không' },
  { v: 'COACH', mau: '#5140B4',
    tuan: ['Đọc dữ liệu trước buổi, không đọc trong buổi',
           'Một buổi kèm mỗi ca theo nhịp tầng · ghi biên bản trong 24 giờ',
           'Rà danh sách ca băng CAM và ĐỎ'],
    thang: ['Chấm lại mức hỗ trợ từng ca — mục tiêu là giảm, không phải giữ',
            'Một buổi phản biện với Trưởng nhóm Coach',
            'Đóng góp một ca đã nghiệm thu vào kho'],
    khong: ['Không giữ ca vì doanh thu khi ca cần chuyển chuyên môn',
            'Không nói thay học viên trong buổi bảo vệ hồ sơ',
            'Không gặp riêng học viên ở nơi kín — xem mục An toàn'],
    do: 'Đường cong hỗ trợ của các ca mình phụ trách · điểm nghiệm thu · tỷ lệ ca qua cổng lần đầu' },
  { v: 'ĐỘI TRƯỞNG CLB', mau: '#BE0E16',
    tuan: ['Chuẩn bị và chạy đúng kịch bản 90 phút',
           'Công bố bảng số trong 24 giờ',
           'Chạm mọi thành viên băng ĐỎ trong 48 giờ'],
    thang: ['Một ngày mở cửa hoặc một hoạt động ngoài',
            'Rà danh sách thành viên sắp hết hạn gia hạn',
            'Báo cáo chi hội lên liên chi hội vùng'],
    khong: ['Không sửa kịch bản 90 phút — chỉ Hội đồng Gen Việt được sửa',
            'Không giữ lại thành viên đã hai kỳ liền không đạt chuẩn vì nể',
            'Không để một ghế trống quá một tuần'],
    do: 'Tỷ lệ có mặt · buổi họp đúng 90 phút · số khách · số thành viên lên vòng' },
  { v: 'MENTOR (bậc 5)', mau: '#0B6675',
    tuan: ['Một buổi với mỗi em mình kèm · ghi biên bản',
           'Hỏi nhiều hơn khuyên — giữ tỷ lệ 70/30',
           'Dự chi hội với tư cách người dẫn, không phải thành viên'],
    thang: ['Một buổi phản biện với Coach bảo trợ',
            'Rà bằng chứng của từng em: đủ để qua cổng chưa, thiếu gì',
            'Viết lại một phần phác đồ dựa trên ca thật'],
    khong: ['Không nhận quá ba ca cùng lúc trong hai năm đầu',
            'Không tự quyết chuyển tầng hay chuyển chuyên môn — báo Coach',
            'Không dùng vị trí Mentor để xây quan hệ riêng ngoài hệ'],
    do: 'Số người bậc dưới qua cổng dưới sự dẫn dắt của mình · điểm nghiệm thu của họ' },
  { v: 'TRƯỞNG TRẠI', mau: '#A8801F',
    tuan: ['Trong mùa trại: rà an toàn mỗi ngày trước khi bắt đầu chương trình',
           'Họp đội ngũ 20 phút cuối mỗi ngày, gỡ ngay việc chưa ổn'],
    thang: ['Ngoài mùa trại: đọc lại nguyện vọng phụ huynh kỳ trước, sửa thiết kế',
            'Đào tạo đội ngũ dẫn trại · diễn tập tình huống khẩn'],
    khong: ['Không tổ chức trại mà không có kế hoạch 21 ngày hậu trại',
            'Không nhồi ba điểm chạm cảm xúc mạnh vào một đêm',
            'Không công bố hình ảnh em nào khi chưa có phép của gia đình'],
    do: 'Tỷ lệ em giữ được cam kết sau 21 ngày — không phải mức độ vui trong trại' }
];

/* ══════════ SỔ TAY BA MÔI TRƯỜNG ══════════ */
GV.SO_TAY_MT = [
  { m: 'M1', t: 'LỚP HỌC', mau: '#185AB4',
    n: 'Em nhận một vai thật và chịu trách nhiệm thật trong tổ chức lớp.',
    viec: [
      { t: 'Nhận vai', v: 'Lớp trưởng, tổ trưởng, phụ trách học tập, phụ trách phong trào, hoặc người kèm một bạn. Vai phải có việc cụ thể và có người cần mình' },
      { t: 'Một việc lặp hằng tuần', v: 'Ví dụ: điều hành 10 phút đầu giờ, giữ sổ đầu bài, tổ chức một buổi ôn nhóm' },
      { t: 'Một cải thiện có số', v: 'Chọn một chỉ số của lớp hoặc của tổ và nâng nó lên: tỷ lệ nộp bài, giờ vào lớp, điểm trung bình của bạn mình kèm' },
      { t: 'Một lần đứng lên', v: 'Trình bày trước lớp hoặc trước trường, không đọc giấy' }
    ],
    xn: 'Giáo viên chủ nhiệm ký xác nhận vào phiếu M1 mỗi học kỳ',
    bay: 'Bẫy thường gặp: em nhận vai để có thành tích ghi hồ sơ, rồi không làm. Chi hội phải hỏi số, không hỏi chức danh.' },
  { m: 'M3', t: 'GIA ĐÌNH', mau: '#0B7350',
    n: 'Nơi nhịp được giữ mỗi ngày. Không có M3 thì ba môi trường kia đều tan.',
    viec: [
      { t: 'Nhịp ngày', v: 'Ba việc lõi · một dòng nhật ký · giờ ngủ cố định. Ba mẹ giữ khung, không giữ tay' },
      { t: 'Hội đồng gia đình 30 phút mỗi tuần', v: 'Con nói trước 10 phút · ba mẹ nói sau 10 phút · 10 phút chốt việc tuần tới. Có biên bản một trang, con ghi' },
      { t: 'Một việc nhà trọn vẹn', v: 'Một việc con chịu trách nhiệm từ đầu tới cuối, không ai làm hộ, kể cả khi con quên' },
      { t: 'Parent Log', v: 'Ba mẹ ghi hành vi quan sát được, không ghi tính từ. "Ngồi vào bàn lúc 19:40, đứng dậy ba lần" — không phải "hôm nay lười"' },
      { t: 'Bản đồ 5–20 năm', v: 'Cả nhà cùng viết mỗi năm một lần, mỗi người một bản, rồi đọc cho nhau nghe' }
    ],
    xn: 'Parent Log nộp theo tháng · Coach đối chiếu với dữ liệu của em',
    bay: 'Bẫy thường gặp: ba mẹ chuyển từ nhắc học sang nhắc làm nhiệm vụ Gen Việt. Cùng một hành vi kiểm soát, chỉ đổi nội dung — và kết quả cũng y hệt.' },
  { m: 'M4', t: 'XÃ HỘI', mau: '#BE0E16',
    n: 'Nơi năng lực bị kiểm bởi thực tế chứ không bởi người chấm.',
    viec: [
      { t: 'Chọn một nhu cầu thật', v: 'Đi hỏi, đừng ngồi nghĩ. Một nhu cầu thật luôn có tên một người cụ thể đang cần' },
      { t: 'Làm nhỏ trước', v: 'Phiên bản đầu phục vụ được 5 người là đủ. Dự án đầu tiên mà nhắm 500 người thì thường phục vụ 0' },
      { t: 'Đo bằng người thụ hưởng', v: 'Không đo bằng số giờ bỏ ra, không đo bằng ảnh chụp. Đo bằng: ai được lợi, lợi gì, họ nói gì' },
      { t: 'Giao lại', v: 'Dự án tốt là dự án chạy tiếp được khi em rút. Bàn giao cho khoá sau là một phần của nghiệm thu' }
    ],
    xn: 'Nơi nhận xác nhận bằng văn bản · Trưởng ban Phụng sự tổng hợp vào hộ chiếu',
    bay: 'Bẫy thường gặp: thiện nguyện chụp ảnh. Nhận biết bằng một câu hỏi: sau khi đoàn về, có gì còn lại không?' }
];

/* ══════════ CỔNG NGHIỆM THU 100 ĐIỂM ══════════ */
GV.CONG = {
  luat: [
    'Ngưỡng đạt là 85/100. Dưới 85 không phải là trượt em ấy — là chưa đủ bằng chứng, và chu kỳ sau đi tiếp từ đúng chỗ thiếu.',
    'Người chấm không được là người dạy. Assessor độc lập chấm; Coach ngồi nghe, không nói thay.',
    'Học viên trình bày. Từ bậc 2 trở lên, người lớn không được trình bày hộ dù chỉ một phần.',
    'Không có bằng chứng thì không có điểm. Lời kể hay, thái độ tốt, sự chăm chỉ đều không quy ra điểm được.'
  ],
  bang: [
    { t: 'Dữ liệu', d: 15, n: 'Đủ, liên tục, không sửa. Nhật ký, bảng số, Parent Log khớp nhau' },
    { t: 'Cơ chế', d: 15, n: 'Em nói được vì sao mình tiến bộ, chỉ ra đúng đòn bẩy đã dùng' },
    { t: 'Năng lực', d: 20, n: 'Mức trên thang 5 của các trục trọng tâm, có bài kiểm chuyển bối cảnh' },
    { t: 'Tự chủ', d: 20, n: 'Mức hỗ trợ đã giảm bao nhiêu mà kết quả vẫn giữ — cột nặng nhất cùng Năng lực' },
    { t: 'Bằng chứng thực tiễn', d: 20, n: 'Sản phẩm và xác nhận từ ít nhất hai môi trường; từ bậc 3 bắt buộc có M4' },
    { t: 'Phẩm chất', d: 10, n: 'Đức · Dũng · Trí · Chủ · Chí — chấm bằng hành vi có người chứng, không bằng ấn tượng' }
  ],
  quyet: [
    { d: '≥ 92', q: 'ĐẠT XUẤT SẮC — lên bậc, và được đề cử làm bài mẫu đào tạo' },
    { d: '85–91', q: 'ĐẠT — lên bậc, ghi rõ hai điểm cần củng cố ở bậc sau' },
    { d: '70–84', q: 'CHƯA ĐỦ — giữ bậc, mở một chu kỳ 90 ngày nhắm đúng cột thiếu điểm' },
    { d: '< 70', q: 'ĐỌC LẠI TỪ ĐẦU — quay về lớp cơ chế, đọc lại ma trận 8 × 8. Có thể là chọn sai đòn bẩy từ đầu chu kỳ' }
  ]
};

/* ══════════ BÁO CÁO ══════════ */
GV.BAO_CAO = [
  { c: 'TUẦN', ai: 'Thư ký chi hội', gui: 'Toàn chi hội + phụ huynh', han: 'Trong 24 giờ sau buổi họp',
    gom: 'Bảng số 7 cột từng thành viên · băng màu · ba người dẫn đầu · danh sách ĐỎ · việc tuần tới' },
  { c: 'THÁNG', ai: 'Coach', gui: 'Gia đình', han: 'Ngày 5 tháng sau',
    gom: 'Mức hỗ trợ · tiến độ trục trọng tâm · Parent Log đối chiếu · một việc gia đình cần đổi' },
  { c: 'QUÝ', ai: 'Đội trưởng CLB + Coach vùng', gui: 'Liên chi hội vùng', han: 'Tuần cuối quý',
    gom: 'Chỉ số chi hội · số lên vòng, lên bậc · khách và thành viên mới · dự án phụng sự · kết quả chấm chéo' },
  { c: 'NĂM', ai: 'Phân tích dữ liệu', gui: 'Hội đồng Gen Việt + công bố', han: 'Trước đại hội 30 ngày',
    gom: 'Bảy chỉ số hệ thống · hệ số tự tái tạo · độ bền chuẩn giữa vùng · tỷ lệ giữ 5 năm · tác động cộng đồng' }
];

/* ══════════ BỘ BIỂU MẪU ══════════ */
GV.BIEU_MAU = [
  { m: 'BM-01', t: 'Đơn xin vào chi hội', ai: 'Khách mời → Ban Thành viên',
    truong: 'Họ tên · năm sinh · trường lớp · người dẫn tới · vì sao muốn vào · mũi nhọn muốn thử · cam kết của phụ huynh · chữ ký hai bên' },
  { m: 'BM-02', t: 'Phiếu bảng số tuần', ai: 'Thành viên tự ghi → Thư ký',
    truong: '7 cột C · Đ · T · G · K · B · P · một dòng tự nhận xét · băng màu tự xếp' },
  { m: 'BM-03', t: 'Phiếu cặp đôi rèn', ai: 'Hai thành viên',
    truong: 'Ngày giờ · hai tên · ba câu hỏi đã hỏi · ba điều học được về bạn · một việc sẽ giúp bạn' },
  { m: 'BM-04', t: 'Thư biết ơn', ai: 'Người nhận giá trị → người trao',
    truong: 'Gửi ai · việc cụ thể bạn đã làm · nó giúp mình thế nào · ký tên. Không viết chung chung' },
  { m: 'BM-05', t: 'Phiếu trao cơ hội', ai: 'Người trao → người nhận + Thư ký',
    truong: 'Loại cơ hội · mô tả · vì sao hợp với bạn · bạn cần làm gì tiếp · kết quả (ghi sau 2 tuần)' },
  { m: 'BM-06', t: 'Biên bản buổi sinh hoạt', ai: 'Thư ký',
    truong: 'Ngày · sĩ số · khách · người ghế nóng · cơ hội đã trao · cam kết tuần tới · giờ kết thúc thật' },
  { m: 'BM-07', t: 'Phiếu ghế nóng', ai: 'Người trình bày',
    truong: 'Mũi nhọn · điều đang làm · điều đang mắc · ba câu hỏi muốn chi hội trả lời · phản biện nhận được' },
  { m: 'BM-08', t: 'Phiếu xác nhận giờ phụng sự', ai: 'Nơi nhận → Trưởng ban Phụng sự',
    truong: 'Tên em · việc đã làm · số giờ · người thụ hưởng · nhận xét của nơi nhận · chữ ký và dấu nếu có' },
  { m: 'BM-09', t: 'Phiếu môi trường M1 — lớp học', ai: 'Giáo viên chủ nhiệm',
    truong: 'Vai em nhận · việc lặp hằng tuần · chỉ số đã cải thiện · nhận xét · chữ ký mỗi học kỳ' },
  { m: 'BM-10', t: 'Parent Log', ai: 'Phụ huynh → Coach',
    truong: 'Ngày · hành vi quan sát được (giờ bắt đầu, kéo dài, bỏ dở ở đâu) · số lần nhắc · không ghi tính từ' },
  { m: 'BM-11', t: 'Biên bản hội đồng gia đình', ai: 'Học viên ghi',
    truong: 'Con nói gì · ba mẹ nói gì · một điều gia đình sẽ đổi tuần này · chữ ký cả nhà' },
  { m: 'BM-12', t: 'Hồ sơ cổng nghiệm thu', ai: 'Học viên dựng → Assessor chấm',
    truong: 'Dữ liệu chu kỳ · cơ chế · bằng chứng năng lực · bằng chứng hai môi trường · bảng 100 điểm · quyết định' },
  { m: 'BM-13', t: 'Sổ ghế ban điều hành', ai: 'Người giữ ghế → người kế nhiệm',
    truong: 'Việc theo tuần · số liệu các nhiệm kỳ trước · ba cái bẫy của ghế · ba điều người sau nên biết' },
  { m: 'BM-14', t: 'Phiếu chuyển tuyến', ai: 'Coach → Quản lý chuyên môn',
    truong: 'Dấu hiệu quan sát được · ngày phát hiện · đã báo ai · nơi chuyển tới · xác nhận gia đình đã được thông báo' }
];

/* ══════════ AN TOÀN VÀ ĐẠO ĐỨC ══════════
   Phần này không được rút gọn cho vừa trang. Một hệ thống làm việc với
   trẻ em mà phần này mỏng thì mọi phần khác đều không có giá trị.      */
GV.AN_TOAN = {
  luat: [
    { t: 'Không bao giờ một người lớn ở riêng với một trẻ trong không gian kín',
      n: 'Buổi kèm 1-1 diễn ra ở nơi có kính, có cửa mở, hoặc có người thứ ba trong tầm nhìn. Trực tuyến thì phụ huynh có quyền vào bất cứ lúc nào và buổi học được ghi lại.' },
    { t: 'Mọi liên lạc đi qua kênh chính thức',
      n: 'Không nhắn tin riêng giữa người lớn và học viên ngoài nhóm hoặc kênh có phụ huynh. Ai vi phạm, dừng công việc ngay trong khi rà soát.' },
    { t: 'Hình ảnh chỉ được dùng khi có phép bằng văn bản',
      n: 'Phép ghi rõ dùng ở đâu, trong bao lâu, và gia đình rút phép được bất cứ lúc nào. Không đăng ảnh kèm thông tin định vị được trường lớp.' },
    { t: 'Ranh giới chuyên môn',
      n: 'Gen Việt là hệ huấn luyện phát triển, không phải nơi trị liệu tâm lý. Gặp dấu hiệu ở danh sách dưới là chuyển tuyến trong 24 giờ — không thương lượng, không giữ ca vì doanh thu, không chờ hết gói.' },
    { t: 'Không kỷ luật bằng làm nhục',
      n: 'Gọi tên người ở băng ĐỎ là để chi hội giúp. Không phạt trước đám đông, không so sánh giữa các em, không dùng biệt danh chế giễu.' },
    { t: 'Trẻ có quyền nói không',
      n: 'Với thử thách thể chất, với việc đứng trước đám đông, với việc chia sẻ chuyện riêng. Một em nói không được ghi nhận, không bị trừ điểm, và được hỏi lại sau.' },
    { t: 'Dữ liệu của trẻ thuộc về gia đình',
      n: 'Gia đình xem được toàn bộ hồ sơ, xuất được bản sao, và yêu cầu xoá được. Yêu cầu xoá phải được thực hiện trong 30 ngày, kể cả khi đang trong hợp đồng.' }
  ],
  dau: [
    'Nói tới việc tự làm đau mình hoặc không muốn sống nữa — dù nói đùa',
    'Dấu vết thương tích không giải thích được, hoặc giải thích thay đổi qua các lần hỏi',
    'Dấu hiệu bị bạo hành, xâm hại hoặc bỏ bê trong gia đình',
    'Rối loạn ăn uống, ngủ hoặc lo âu kéo dài trên bốn tuần và tăng nặng',
    'Rút khỏi mọi quan hệ, ngừng nói trong nhiều tuần',
    'Sử dụng chất gây nghiện',
    'Bị bắt nạt kéo dài, đặc biệt là bắt nạt trên mạng'
  ],
  quy: [
    { b: '1', v: 'Ghi lại nguyên văn điều em nói và điều mình quan sát được. Không diễn giải, không suy đoán nguyên nhân.' },
    { b: '2', v: 'Báo Quản lý chuyên môn trong 24 giờ bằng phiếu BM-14. Không tự xử lý, không tự trấn an gia đình.' },
    { b: '3', v: 'Quản lý chuyên môn liên hệ gia đình và giới thiệu tới chuyên môn phù hợp: bác sĩ, nhà tâm lý lâm sàng, hoặc cơ quan bảo vệ trẻ em.' },
    { b: '4', v: 'Gen Việt giữ vai hỗ trợ, không giữ vai điều trị. Ca vẫn được đồng hành ở phần phát triển, dưới hướng dẫn của chuyên môn kia.' },
    { b: '5', v: 'Nếu nghi ngờ nguy hiểm tức thời, gọi cơ quan chức năng ngay, rồi mới báo trong hệ.' }
  ]
};

/* ══════════ NĂM ĐẦU TIÊN — BỐN QUÝ ══════════ */
GV.NAM_DAU = [
  { q: 'QUÝ 1', chu: 'Khoá chuẩn', mau: '#185AB4',
    viec: ['Hoàn tất 90 ngày đầu: Sổ Chuẩn v1, bảng chuẩn năng lực, kho đã đánh mã',
           'Hộ chiếu nhân tài v1 chạy được, xuất JSON và PDF',
           'Xếp bậc toàn bộ học viên hiện có'],
    so: ['1 Sổ Chuẩn', '30 hộ chiếu mẫu', '100% học viên có bậc hoặc ghi rõ chưa đủ dữ liệu'] },
  { q: 'QUÝ 2', chu: 'Chi hội mẫu', mau: '#5140B4',
    viec: ['Dựng MỘT chi hội chạy đúng kịch bản 90 phút trong 12 tuần liền',
           'Quay lại toàn bộ 12 buổi làm tài liệu đào tạo',
           'Chạy khoá nền 8 buổi hai đợt · dựng sổ ghế cho bảy ghế'],
    so: ['1 chi hội 24 thành viên', '12 buổi đúng chuẩn', '7 sổ ghế mở'] },
  { q: 'QUÝ 3', chu: 'Trại và bốn môi trường', mau: '#0B6675',
    viec: ['Một kỳ trại theo chuẩn mới, có đủ 21 ngày hậu trại',
           'Ký hợp tác với 3 trường để chạy M1 và M2 có xác nhận',
           'Chạy 20 hồ sơ M3 đầy đủ Parent Log'],
    so: ['1 trại · tỷ lệ giữ cam kết sau 21 ngày ≥ 60%', '3 trường', '20 Parent Log liên tục'] },
  { q: 'QUÝ 4', chu: 'Cổng và chi hội thứ hai', mau: '#0B7350',
    viec: ['Chạy cổng nghiệm thu bậc 2 cho lứa đầu, Assessor độc lập chấm',
           'Chi hội mẫu mở chi hội thứ hai theo đúng quy trình 5 bước',
           'Đại hội đầu tiên · công bố bảy chỉ số hệ thống lần đầu'],
    so: ['≥ 15 em qua cổng bậc 2', '2 chi hội', '1 báo cáo chỉ số công khai'] }
];
