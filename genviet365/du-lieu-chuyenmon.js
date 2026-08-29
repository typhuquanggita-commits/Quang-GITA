/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · KHO CHUYÊN MÔN
   Ma trận 8 × 8 · quy trình 10 bước · 11 nhóm giải pháp · thư viện
   100 chiến lược · thang mức hỗ trợ · cơ chế xử lý tự động theo KPI.
   Toàn bộ phần này kế thừa nguyên vẹn từ Hệ thống giải pháp GITA 365;
   Gen Việt không viết lại, chỉ nối vào sáu bậc và bốn môi trường.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var GV = window.GV || {};
window.GV = GV;

/* ══════════ MA TRẬN 8 × 8 — ĐỌC MỘT CA ══════════
   Buộc người vận hành nhìn một ca theo cùng một trình tự, tránh ba sai
   lầm: thấy biểu hiện rồi kết luận nguyên nhân; thấy vấn đề rồi lập tức
   chọn giải pháp; chỉ nhìn học viên mà bỏ qua mục tiêu, nội lực, năng
   lực và môi trường đang tương tác với nhau.                          */
GV.MA_TRAN = [
  { l: '1. Biểu hiện', g: 'Em đang muốn gì?', i: 'Muốn hay không muốn ở mức nào?',
    t: 'Làm được gì?', a: 'Thực tế đang làm gì?',
    dl: 'Tần suất · thời lượng · bối cảnh', vai: 'Không kết luận sớm', ra: 'Bản đồ biểu hiện' },
  { l: '2. Khoảng cách', g: 'Đích cách hiện tại bao xa?', i: 'Có đủ lý do để thay đổi?',
    t: 'Thiếu năng lực nào?', a: 'Hành động thiếu ở đâu?',
    dl: 'Hiện tại – mục tiêu', vai: 'Làm rõ khoảng cách', ra: 'Khoảng cách phát triển' },
  { l: '3. Cơ chế', g: 'Mục tiêu có thực sự thuộc em?', i: 'Niềm tin, cảm xúc nào chi phối?',
    t: 'Điểm nghẽn kỹ năng nào?', a: 'Yếu tố nào đang duy trì?',
    dl: 'Đa nguồn: HS – PH – hành vi', vai: 'Lập giả thuyết', ra: 'Bản đồ cơ chế' },
  { l: '4. Đòn bẩy', g: 'Mục tiêu nào ưu tiên?', i: 'Nội lực nào cần kích hoạt?',
    t: 'Năng lực nào tạo hiệu ứng lớn?', a: 'Biến môi trường nào cần đổi?',
    dl: 'So sánh tác động', vai: 'Chọn ÍT đòn bẩy', ra: 'Phác đồ ưu tiên' },
  { l: '5. Thử nghiệm', g: 'Đích thử nghiệm là gì?', i: 'Em có quyền chọn gì?',
    t: 'Kỹ năng nào được thử?', a: 'Hành động tối thiểu nào?',
    dl: 'Trước – trong – sau', vai: 'Thiết kế phép thử', ra: 'Dữ liệu kiểm chứng' },
  { l: '6. Kiến tạo', g: 'Em tự đặt đích tới đâu?', i: 'Niềm tin mới có bằng chứng?',
    t: 'Làm được ổn định chưa?', a: 'Có tự thực hiện không?',
    dl: 'KPI 21 – 90 ngày', vai: 'Huấn luyện năng lực', ra: 'Năng lực mới' },
  { l: '7. Chuyển hoá', g: 'Có tự nâng mục tiêu?', i: 'Có phục hồi khi thất bại?',
    t: 'Có chuyển giao năng lực?', a: 'Có tự điều hành hệ thống?',
    dl: '90 – 365 ngày', vai: 'Giảm hỗ trợ', ra: 'Tự chủ – tự lập' },
  { l: '8. Bứt phá', g: 'Đích lớn tiếp theo là gì?', i: 'Khát vọng gắn giá trị nào?',
    t: 'Điểm mạnh nào thành tài năng?', a: 'Tạo sản phẩm, giá trị gì?',
    dl: 'Thành tựu thật', vai: 'Phản biện – giữ chuẩn', ra: 'Kỳ tích mới' }
];

/* ══════════ QUY TRÌNH 10 BƯỚC XỬ LÝ MỘT CA ══════════ */
GV.MUOI_BUOC = [
  { b: 1, t: 'Chuẩn hoá ngôn ngữ vấn đề',
    n: 'Không dùng "lười", "không ngoan", "thiếu ý thức" làm kết luận. Chuyển thành hành vi quan sát được: bắt đầu lúc nào, kéo dài bao lâu, bỏ dở ở đâu, ai đang nhắc.' },
  { b: 2, t: 'Thu dữ liệu đa nguồn',
    n: 'Ít nhất từ học viên, phụ huynh, hành vi thực tế và kết quả. Một nguồn duy nhất luôn cho ra một câu chuyện đẹp và sai.' },
  { b: 3, t: 'Lập bản đồ G – I – T – A',
    n: 'Xác định điểm nghẽn chính và các yếu tố liên đới. Bốn cửa đọc, không bỏ cửa nào — kể cả khi vấn đề "rõ ràng" nằm ở một cửa.' },
  { b: 4, t: 'Lập giả thuyết',
    n: 'Không kết luận nguyên nhân tuyệt đối. Chỉ lập giả thuyết có bằng chứng, và ghi cả bằng chứng phản bác.' },
  { b: 5, t: 'Chọn đòn bẩy',
    n: 'Ưu tiên biến nào có khả năng tạo hiệu ứng dây chuyền. Một đòn bẩy đúng thay được năm giải pháp đúng nửa vời.' },
  { b: 6, t: 'Chọn chiến lược theo mô hình 1–2–1',
    n: 'Một chiến lược chính, hai hỗ trợ, một dự phòng. Dùng quá nhiều giải pháp là cách che lấp việc chưa xác định đúng cơ chế.' },
  { b: 7, t: 'Chọn tầng dịch vụ và bậc',
    n: 'Dựa trên độ sâu của vấn đề và mức phát triển cần đạt — không dựa trên khả năng chi trả, và không đốt giai đoạn.' },
  { b: 8, t: 'Đo KPI',
    n: 'Không chỉ đo kết quả. Đo tự chủ, phục hồi, ổn định và chuyển giao — bốn thứ quyết định kết quả có bền hay không.' },
  { b: 9, t: 'Cổng quyết định',
    n: 'Giữ – sửa – nâng – quay lại – chuyển chuyên môn. Năm cửa, và cửa cuối cùng không bao giờ được bỏ qua vì doanh thu.' },
  { b: 10, t: 'Tái thiết kế vòng phát triển',
    n: 'Mỗi vòng kết thúc bằng một baseline mới ở chuẩn cao hơn. Không có "xong ca" — chỉ có "sang vòng".' }
];

/* ══════════ MƯỜI MỘT NHÓM GIẢI PHÁP ══════════ */
GV.NHOM_GP = [
  { m: '13.1', t: 'Điều chỉnh môi trường', truc: 'A2 · A11',
    n: 'Môi trường không phải phông nền của hành vi — nó là một phần của cơ chế tạo hành vi.',
    vi: 'Đích không phải "môi trường đã được sắp xếp", mà là "học viên biết kiến tạo môi trường phục vụ mục tiêu". Sai lầm thường gặp: biến điều chỉnh môi trường thành sự kiểm soát của phụ huynh.' },
  { m: '13.2', t: 'Thay đổi hành vi', truc: 'A2 · I3',
    n: 'Đi ngược chuỗi kích hoạt → hành vi → hệ quả, thay chức năng của hành vi cũ bằng một hành vi khác cùng chức năng.',
    vi: 'Sai lầm thường gặp: cấm hành vi cũ mà không cho hành vi thay thế. Cấm không tạo ra năng lực, chỉ tạo ra sự giấu giếm.' },
  { m: '13.3', t: 'Xây thói quen', truc: 'I3 · A2',
    n: 'Tín hiệu cố định · thói quen tối thiểu · nối chuỗi · không bỏ hai lần · hai mức chuẩn.',
    vi: 'Sai lầm thường gặp: đặt ngưỡng quá cao ngày đầu. Một thói quen hai phút giữ được ba tuần đáng giá hơn một thói quen ba mươi phút giữ được bốn ngày.' },
  { m: '13.4', t: 'Phát triển năng lực học tập', truc: 'T4',
    n: 'Đi ngược chuỗi: tiếp nhận → chú ý → hiểu → mã hoá → ghi nhớ → truy hồi → vận dụng → tự kiểm → điều chỉnh chiến lược.',
    vi: 'Điểm số là kết quả cuối của chuỗi. Chữa điểm số mà không tìm ra mắt xích nghẽn là chữa triệu chứng.' },
  { m: '13.5', t: 'Phát triển tự quản trị', truc: 'A2 · I7',
    n: 'Top 3 · kế hoạch tuần · time audit · định nghĩa "xong" · đóng vòng cuối ngày · thang quyết định.',
    vi: 'Đích là một hệ điều hành cá nhân chạy được, không phải một cuốn sổ kế hoạch đẹp.' },
  { m: '13.6', t: 'Động lực và mục tiêu', truc: 'G1 · I7',
    n: 'Audit quyền sở hữu mục tiêu · thang "vì sao" · thành công nhỏ · phản hồi bằng bằng chứng · bản đồ tương lai.',
    vi: 'Sai lầm thường gặp: cố tăng động lực khi mục tiêu vẫn là của người lớn. Không có động lực nào bền cho một đích không thuộc về mình.' },
  { m: '13.7', t: 'Giải pháp dành cho phụ huynh', truc: 'M3',
    n: 'Nhật ký nhắc · hỏi thay lệnh · không dán nhãn · chuyển quyền quyết định · hợp đồng gia đình · rút dần.',
    vi: 'Nhóm giải pháp bị bỏ qua nhiều nhất và có đòn bẩy lớn nhất. Rất nhiều ca không đổi được vì đang chữa đứa trẻ trong một vòng lặp gia đình không đổi.' },
  { m: '13.8', t: 'Nâng hiệu suất', truc: 'T5',
    n: 'Kế hoạch theo đầu ra · phiên làm việc sâu · khớp việc với năng lượng · giảm chuyển đổi chú ý.',
    vi: 'Chỉ dùng khi nhịp đã ổn. Nâng hiệu suất trên một nền chưa có kỷ luật là cách làm cháy một đứa trẻ.' },
  { m: '13.9', t: 'Phát triển tài năng', truc: 'T8',
    n: 'Bằng chứng điểm mạnh · thử thách tài năng · luyện có chủ đích · cố vấn ngoài · dự án tài năng · sân chơi.',
    vi: 'Điểm mạnh phải được chứng minh bằng thành tích trong thử thách khó, không bằng lời khen của gia đình.' },
  { m: '13.10', t: 'Định hướng nghề nghiệp', truc: 'G10',
    n: 'Giả thuyết nghề · phỏng vấn người trong nghề · mô phỏng công việc · bản đồ khoảng cách năng lực.',
    vi: 'Không bắt đầu bằng trắc nghiệm hướng nghiệp. Bắt đầu bằng ba lần chạm vào nghề thật.' },
  { m: '13.11', t: 'Dự án, lãnh đạo, hồ sơ năng lực', truc: 'A9 · A11 · G12',
    n: 'Dự án nhỏ 21 ngày · luân phiên vai lãnh đạo · nhật ký quyết định · dự án tác động · câu chuyện portfolio.',
    vi: 'Nhóm duy nhất tạo ra bằng chứng mà người ngoài hệ đọc được. Từ bậc 3 trở lên, đây là nhóm bắt buộc.' }
];

/* ══════════ THƯ VIỆN 100 CHIẾN LƯỢC ══════════
   Mười nhóm × mười chiến lược. Mỗi chiến lược trong kho đầy đủ có tám
   trường: tên · vấn đề · cơ chế · GITA · quy trình · vai phụ huynh ·
   KPI · cổng quyết định. Bảng dưới đây rút gọn còn bốn trường để nhìn
   được toàn cảnh; bản đầy đủ nằm trong kho nghề.                      */
GV.CHIEN_LUOC = [
  { nhom: 'NHÓM 1 · MÔI TRƯỜNG', mau: '#185AB4', ds: [
    [1, 'Giảm ma sát hành vi đúng', 'Dễ bắt đầu hơn', 'A', 'Thời gian vào việc'],
    [2, 'Tăng ma sát nhiễu', 'Hành vi xấu khó tiếp cận', 'A', 'Số lần bị ngắt'],
    [3, 'Vùng học chức năng', 'Gắn không gian với hành vi', 'A', 'Giờ tập trung'],
    [4, 'Khung giờ theo năng lượng', 'Tối ưu trạng thái', 'A/T', 'Sản lượng mỗi giờ'],
    [5, 'Bảo vệ phiên tập trung', 'Giảm chuyển đổi chú ý', 'A', 'Phút làm việc sâu'],
    [6, 'Chuẩn hoá setup', 'Giảm quyết định vi mô', 'A', 'Thời gian chuẩn bị'],
    [7, 'Audit môi trường số', 'Giảm phân mảnh', 'A', 'Số lần kiểm điện thoại'],
    [8, 'Nhóm học hỗ trợ', 'Tận dụng chuẩn xã hội', 'A/I', 'Mức tham gia'],
    [9, 'Vùng phục hồi', 'Tạo reset', 'I/A', 'Chất lượng phục hồi'],
    [10, 'Tự thiết kế môi trường', 'Chuyển quyền', 'A/T', '% tự chuẩn bị']
  ]},
  { nhom: 'NHÓM 2 · HÀNH VI', mau: '#5140B4', ds: [
    [11, 'ABC hành vi', 'Nhìn kích hoạt – hành vi – hệ quả', 'A', 'Có nhận ra mô thức'],
    [12, 'Hành vi thay thế', 'Thay chức năng hành vi cũ', 'T/A', 'Tỷ lệ dùng hành vi mới'],
    [13, 'Nếu – thì', 'Nối tình huống và hành động', 'G/A', 'Tỷ lệ bắt đầu'],
    [14, 'Bắt đầu 5 phút', 'Hạ năng lượng kích hoạt', 'A', 'Độ trễ vào việc'],
    [15, 'Giới hạn việc đang mở', 'Giảm phân tán', 'A', 'Tỷ lệ hoàn thành'],
    [16, 'Tự ghi hành vi', 'Tăng nhận thức', 'I/A', 'Mức tự nhận biết'],
    [17, 'Phản hồi bằng dữ liệu', 'Giảm phòng vệ', 'I', 'Mức tiếp nhận'],
    [18, 'Giảm hỗ trợ dần', 'Phá phụ thuộc', 'A', 'Mức hỗ trợ'],
    [19, 'Reset', 'Ngăn vòng bỏ cuộc', 'I/A', 'Thời gian quay lại'],
    [20, 'Stress-test', 'Kiểm chuyển giao', 'T/A', 'Số bối cảnh đạt']
  ]},
  { nhom: 'NHÓM 3 · THÓI QUEN', mau: '#0B6675', ds: [
    [21, 'Thói quen tối thiểu', 'Giảm ngưỡng', 'A', 'Độ đều'],
    [22, 'Tín hiệu cố định', 'Tạo cue', 'A', 'Tỷ lệ cue chạy'],
    [23, 'Nối chuỗi', 'Tận dụng nếp có sẵn', 'A', 'Tỷ lệ hoàn thành'],
    [24, 'Không bỏ hai lần', 'Phục hồi nhanh', 'I/A', 'Thời gian quay lại'],
    [25, 'Hai mức chuẩn', 'Giảm cầu toàn', 'I/A', 'Tỷ lệ giữ nhịp'],
    [26, 'Bảng tiến bộ', 'Tạo phản hồi', 'I', 'Đường xu hướng'],
    [27, 'Review tuần', 'Tạo PDCA', 'T/A', 'Số điều chỉnh'],
    [28, 'Nâng tải', 'Tăng năng lực', 'T', 'Mức tăng trưởng'],
    [29, 'Bản sắc', 'Nội hoá', 'I', 'Quyền sở hữu'],
    [30, 'Hệ thói quen', 'Tích hợp', 'G/A', 'Độ tuân thủ hệ']
  ]},
  { nhom: 'NHÓM 4 · NĂNG LỰC HỌC', mau: '#0B7350', ds: [
    [31, 'Truy hồi', 'Tăng nhớ', 'T', 'Recall sau 24 giờ'],
    [32, 'Ôn giãn cách', 'Tăng lưu giữ', 'T', 'Độ bền trí nhớ'],
    [33, 'Tự giải thích', 'Tăng hiểu', 'T', 'Mức hiểu sâu'],
    [34, 'Sơ đồ hoá', 'Tạo cấu trúc', 'T', 'Chất lượng cấu trúc'],
    [35, 'Phân loại lỗi', 'Học từ lỗi', 'T', 'Lỗi lặp lại'],
    [36, 'Nói to quá trình nghĩ', 'Lộ chiến lược', 'T', 'Chất lượng chiến lược'],
    [37, 'Kiểm trước khi học', 'Tăng chú ý', 'T', 'Mức tăng sau bài'],
    [38, 'Trộn dạng bài', 'Tăng chuyển giao', 'T', 'Điểm bài chuyển bối cảnh'],
    [39, 'Tự thiết kế phiên học', 'Tăng tự học', 'T/A', 'Mức hỗ trợ'],
    [40, 'Review cách học', 'Siêu nhận thức', 'T', 'Số điều chỉnh cách học']
  ]},
  { nhom: 'NHÓM 5 · TỰ QUẢN TRỊ', mau: '#BE0E16', ds: [
    [41, 'Top 3', 'Giảm quá tải', 'G/T', 'Độ rõ ưu tiên'],
    [42, 'Kế hoạch tuần', 'Tạo tầm nhìn ngắn', 'G/A', 'Độ chính xác kế hoạch'],
    [43, 'Time audit', 'Tăng nhận thức thời gian', 'T', 'Sai số ước lượng'],
    [44, 'Định nghĩa "xong"', 'Rõ chuẩn', 'G/T', 'Tỷ lệ hoàn thành thật'],
    [45, 'Đóng vòng cuối ngày', 'Đóng việc dở', 'A', 'Số việc treo'],
    [46, 'Tự phản tư ba câu', 'Phản tư', 'T/I', 'Tỷ lệ phản tư'],
    [47, 'Thang quyết định', 'Trao quyền', 'G/T', 'Quyền sở hữu'],
    [48, 'Kế hoạch phục hồi', 'Tăng phục hồi', 'I/T', 'Thời gian quay lại'],
    [49, 'Bảng số cá nhân', 'Tích hợp dữ liệu', 'G/T/A', 'Tần suất cập nhật'],
    [50, 'Hệ tự quản trị', 'Tạo hệ thống', 'GITA', 'Mức hỗ trợ']
  ]},
  { nhom: 'NHÓM 6 · ĐỘNG LỰC VÀ MỤC TIÊU', mau: '#185AB4', ds: [
    [51, 'Audit quyền sở hữu', 'Mục tiêu của ai', 'G/I', 'Mức sở hữu'],
    [52, 'Thang "vì sao"', 'Tăng ý nghĩa', 'G/I', 'Độ sâu ý nghĩa'],
    [53, 'Thành công nhỏ', 'Tạo tự hiệu quả', 'I/T', 'Số lần thành công'],
    [54, 'Phản hồi bằng bằng chứng', 'Xây niềm tin có căn cứ', 'I', 'Mức tự hiệu quả'],
    [55, 'Bản thân tương lai', 'Kết nối tương lai', 'G/I', 'Độ rõ đích'],
    [56, 'Kiến trúc lựa chọn', 'Tăng tự chủ', 'G/I', 'Quyền sở hữu'],
    [57, 'Cân độ khó', 'Tránh quá khó hoặc quá dễ', 'I/T', 'Mức gắn kết'],
    [58, 'Mổ xẻ thất bại', 'Học từ thất bại', 'I/T', 'Chất lượng phục hồi'],
    [59, 'Phản chiếu tiến bộ', 'Tạo đà', 'I', 'Đường xu hướng'],
    [60, 'Làm mới mục tiêu', 'Cập nhật đích', 'G', 'Mức bám mục tiêu']
  ]},
  { nhom: 'NHÓM 7 · PHỤ HUYNH', mau: '#0B7350', ds: [
    [61, 'Nhật ký nhắc', 'Nhận diện kiểm soát', 'A', 'Số lần nhắc'],
    [62, 'Hỏi thay lệnh', 'Tăng quyền sở hữu', 'I/A', 'Chất lượng đối thoại'],
    [63, 'Không dán nhãn', 'Giảm đe doạ bản sắc', 'I', 'Số nhãn đã dùng'],
    [64, 'Chuyển quyền quyết định', 'Giảm phụ thuộc', 'G/A', 'Số quyết định con tự ra'],
    [65, 'Hợp đồng gia đình', 'Rõ ranh giới', 'A', 'Mức tuân thủ hai chiều'],
    [66, 'Tạm dừng xung đột', 'Giảm leo thang', 'I/A', 'Thời gian hạ nhiệt'],
    [67, 'Phụ huynh tự phản tư', 'PH tự thay đổi', 'I/A', 'Mức thay đổi của PH'],
    [68, 'Cấp nguồn lực, không cứu hộ', 'Không làm thay', 'A', 'Số lần làm hộ'],
    [69, 'Hội đồng gia đình', 'Tăng đồng thuận', 'G/A', 'Chất lượng buổi họp'],
    [70, 'Rút dần vai quản', 'Giảm quản vi mô', 'A', 'Mức hỗ trợ']
  ]},
  { nhom: 'NHÓM 8 · HIỆU SUẤT', mau: '#5140B4', ds: [
    [71, 'Kế hoạch theo đầu ra', 'Đo sản phẩm, không đo giờ', 'G/A', 'Đầu ra mỗi tuần'],
    [72, 'Làm việc sâu', 'Tăng chất lượng chú ý', 'A', 'Phút làm việc sâu'],
    [73, 'Khớp việc với năng lượng', 'Tối ưu trạng thái', 'T/A', 'Sản lượng mỗi giờ'],
    [74, 'Chia nhỏ tới mức làm được', 'Giảm ngưỡng khởi động', 'T', 'Tỷ lệ bắt đầu'],
    [75, 'Một việc một lúc', 'Giảm chi phí chuyển đổi', 'A', 'Tỷ lệ hoàn thành'],
    [76, 'Chuẩn chất lượng tối thiểu', 'Chống cầu toàn', 'T/I', 'Thời gian mỗi sản phẩm'],
    [77, 'Nhịp làm – nghỉ', 'Giữ sức bền', 'I/A', 'Chất lượng cuối phiên'],
    [78, 'Đo và cắt việc vô ích', 'Quy tắc 20/80', 'T', 'Tỷ lệ việc tạo kết quả'],
    [79, 'Chuẩn bị trước phiên', 'Giảm ma sát', 'A', 'Thời gian vào việc'],
    [80, 'Hệ hiệu suất cá nhân', 'Tích hợp', 'GITA', 'Đầu ra ổn định']
  ]},
  { nhom: 'NHÓM 9 · TÀI NĂNG', mau: '#0B6675', ds: [
    [81, 'Bằng chứng điểm mạnh', 'Chứng minh, không phỏng đoán', 'T', 'Hiệu suất trong việc mạnh'],
    [82, 'Thử thách tài năng', 'Kiểm tiềm năng', 'T/I', 'Mức tăng trưởng'],
    [83, 'Luyện có chủ đích', 'Nâng mastery', 'T', 'Mức tăng kỹ năng'],
    [84, 'Phản hồi từ cố vấn ngoài', 'Chuẩn ngoài', 'T', 'Chất lượng theo chuẩn nghề'],
    [85, 'Dự án tài năng', 'Biến năng lực thành sản phẩm', 'T/A', 'Sản phẩm bàn giao'],
    [86, 'Ra sân chơi', 'Kiểm chuẩn', 'T/I', 'Kết quả thi đấu'],
    [87, 'Điểm mạnh đặc trưng', 'Tích hợp khác biệt', 'T/G', 'Hồ sơ khác biệt'],
    [88, 'Hệ sinh thái tài năng', 'Tạo môi trường', 'A', 'Số lần được tiếp xúc chuẩn cao'],
    [89, 'Sức bền tài năng', 'Bền trong khó', 'I/T', 'Mức kiên trì'],
    [90, 'Lộ trình tài năng', 'Tạo đường dài', 'G/T', 'Cột mốc 12–36 tháng']
  ]},
  { nhom: 'NHÓM 10 · NGHỀ · DỰ ÁN · LÃNH ĐẠO · PORTFOLIO', mau: '#A8801F', ds: [
    [91, 'Giả thuyết nghề', 'Ba tới năm hướng', 'G/T', 'Độ rõ định hướng'],
    [92, 'Phỏng vấn người trong nghề', 'Dữ liệu thật', 'T/A', 'Số hiểu biết thu được'],
    [93, 'Mô phỏng công việc', 'Kiểm mức phù hợp', 'T/A', 'Mức phù hợp'],
    [94, 'Bản đồ khoảng cách', 'Biết thiếu gì', 'G/T', 'Điểm khoảng cách'],
    [95, 'Dự án nhỏ 21 ngày', 'Kiểm thực thi', 'G/T/A', 'Cột mốc đạt'],
    [96, 'Luân phiên vai lãnh đạo', 'Kiểm lãnh đạo', 'T/A', 'Kết quả nhóm'],
    [97, 'Nhật ký quyết định', 'Nâng chất lượng quyết định', 'G/I/T', 'Chất lượng phán đoán'],
    [98, 'Dự án tác động', 'Tạo giá trị', 'G/T/A', 'Số người thụ hưởng'],
    [99, 'Câu chuyện portfolio', 'Chứng minh năng lực', 'G/T', 'Chất lượng hồ sơ'],
    [100, 'Kiến trúc ba năm', 'Tạo hướng dài hạn', 'GITA', 'Cột mốc dài hạn']
  ]}
];

GV.CHON_CL = {
  t: 'Nguyên tắc chọn chiến lược — 1 · 2 · 1',
  n: 'Một ca không dùng cả thư viện. Một chiến lược lõi → hai chiến lược hỗ trợ → một chiến lược dự phòng.',
  vi: 'Ví dụ: ca "trì hoãn" không mặc định dùng mười kỹ thuật. Nếu dữ liệu cho thấy nguyên nhân chính là khó khởi động, dùng #14 làm lõi; #41 và #61 hỗ trợ; #11 làm dự phòng nếu hành vi vẫn không đổi. Dùng quá nhiều giải pháp là cách che lấp việc chưa xác định đúng cơ chế.'
};

/* ══════════ THANG MỨC HỖ TRỢ ══════════ */
GV.THANG_HT = [
  { m: 5, t: 'Người lớn điều hành gần như toàn bộ', vd: 'Lập kế hoạch hộ, nhắc, kiểm từng việc' },
  { m: 4, t: 'Hỗ trợ thường xuyên', vd: 'Nhắc nhiều lần mỗi ngày' },
  { m: 3, t: 'Hỗ trợ định kỳ', vd: 'Rà cùng nhau mỗi ngày một lần' },
  { m: 2, t: 'Chỉ hỗ trợ khi lệch', vd: 'Rà cùng nhau mỗi tuần' },
  { m: 1, t: 'Học viên chủ động tìm hỗ trợ', vd: 'Coach và phụ huynh có mặt theo nhu cầu của em' },
  { m: 0, t: 'Học viên tự vận hành', vd: 'Không cần can thiệp trực tiếp cho nhiệm vụ ở mức này' }
];
GV.THANG_HT_LUAT = 'Mục tiêu không phải lúc nào cũng là mức 0. Mức hỗ trợ phải phù hợp tuổi, độ khó và bối cảnh. Điều cần nhìn là *xu hướng*: hỗ trợ có giảm trong khi chất lượng không giảm hay không. Một em bậc 4 nhận việc mới hoàn toàn có thể quay lại mức 3 trong ba tuần đầu — đó là bình thường, không phải thụt lùi.';

/* ══════════ CƠ CHẾ XỬ LÝ TỰ ĐỘNG THEO KPI ══════════
   Một hệ quy mô lớn không thể phụ thuộc vào trí nhớ từng Coach. Tám
   tín hiệu dưới đây tự kích hoạt một hành động, không chờ ai nhớ ra. */
GV.TU_DONG = [
  { th: 'KPI giảm nhẹ', muc: 'VÀNG', he: 'Yêu cầu tự phản tư', hs: 'Tự phân tích', ph: 'Chưa can thiệp', co: 'Theo dõi' },
  { th: 'Giảm hai tuần liên tiếp', muc: 'CAM', he: 'Mở review ca', hs: 'Phân tích cùng Coach', ph: 'Cung cấp dữ liệu', co: 'Đổi chiến lược' },
  { th: 'Mức hỗ trợ tăng trở lại', muc: 'CAM', he: 'Mở review gia đình', hs: 'Nêu khó khăn', ph: 'Tự rà lại mình', co: 'Coach phụ huynh' },
  { th: 'Hành vi cũ tăng', muc: 'CAM', he: 'Phân tích kích hoạt', hs: 'Ghi nhật ký', ph: 'Không phạt', co: 'Tìm gốc' },
  { th: 'Chững lại kéo dài', muc: 'CAM', he: 'Review chiến lược', hs: 'Trình bằng chứng', ph: '—', co: 'Đổi đòn bẩy' },
  { th: 'Dự án chậm mốc', muc: 'CAM', he: 'Sprint phục hồi', hs: 'Lập lại kế hoạch', ph: 'Không cứu hộ', co: 'Coach dự án' },
  { th: 'Xung đột gia đình tăng', muc: 'CAM', he: 'Kích hoạt quy ước gia đình', hs: 'Tạm dừng', ph: 'Tạm dừng', co: 'Điều phối' },
  { th: 'Vượt phạm vi chuyên môn', muc: 'ĐỎ', he: 'Chuyển tuyến trong 24 giờ', hs: 'Dừng phần liên quan', ph: 'Phối hợp', co: 'KHÔNG xử lý vượt phạm vi' }
];
