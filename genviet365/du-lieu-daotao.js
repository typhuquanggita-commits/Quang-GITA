/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · KHO ĐÀO TẠO
   Lộ trình từng bậc · khoá nền · 24 chuyên đề · trại · bộ test ·
   đào tạo ban điều hành. Dữ liệu thuần, không có hàm.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var GV = window.GV || {};
window.GV = GV;

/* ══════════ LỘ TRÌNH TỪNG BẬC ══════════
   Mỗi bậc chia thành các chu kỳ 90 ngày. Chu kỳ là đơn vị nhỏ nhất có
   cổng; bậc là đơn vị có hồ sơ. Không chu kỳ nào được kéo dài quá 90 ngày
   để "chờ em ấy sẵn sàng" — chưa đạt thì đóng chu kỳ, ghi nhận thật, mở
   chu kỳ mới với cùng đích. Kéo dài vô hạn là cách giấu một thất bại.   */
GV.LO_TRINH = [
  { bac: 'B1', t: 'HẠT', tong: '2 chu kỳ · 3–6 tháng', mau: '#185AB4',
    ck: [
      { n: 'CK1', t: 'Nhìn thấy mình', ngay: 'N1–90',
        viec: ['Bộ test nhận diện đầu vào · đọc kết quả cùng phụ huynh',
               'Bản đồ cá nhân 11 ô — em tự viết, người lớn không viết hộ',
               'Nhật ký ngày: ba dòng, không quá năm phút',
               'Dự chi hội với tư cách thành viên thử · khoá nền 8 buổi'],
        ra: 'Bản đồ cá nhân v1 · 60 ngày nhật ký · một mũi nhọn tạm chọn',
        cong: 'Em nói được bằng lời của mình: em thích gì, em giỏi gì, em muốn thử gì' },
      { n: 'CK2', t: 'Giữ được một việc', ngay: 'N91–180',
        viec: ['Chọn đúng MỘT thói quen và giữ 21 ngày × 3 vòng',
               'Vòng 45 giây mỗi tuần trước chi hội',
               'Một việc nhà có trách nhiệm trọn vẹn (M3)',
               'Một lần đứng trước lớp hoặc trước chi hội quá ba phút'],
        ra: 'Một thói quen sống được không cần nhắc · ba lần đứng trước đám đông',
        cong: 'Ba tuần liên tiếp giữ được thói quen khi người lớn không nhắc' }
    ]},
  { bac: 'B2', t: 'MẦM', tong: '4 chu kỳ · 12 tháng', mau: '#5140B4',
    ck: [
      { n: 'CK1', t: 'Nền nếp', ngay: 'N1–90',
        viec: ['Khung giờ cố định · vùng học chức năng · audit môi trường số',
               'Kế hoạch tuần tự lập, tự chấm độ chính xác',
               'Cặp đôi rèn mỗi tuần một bạn khác'],
        ra: 'Nhịp ngày ổn định · độ chính xác kế hoạch ≥ 60%',
        cong: 'Số lần phụ huynh phải nhắc giảm ≥ 40% so với đầu chu kỳ' },
      { n: 'CK2', t: 'Phương pháp', ngay: 'N91–180',
        viec: ['Truy hồi cách quãng · ghi chú chủ động · tự kiểm sau học',
               'Một môn khó nhất được chọn làm nơi thử phương pháp',
               'Nhận một vai trong tổ chức lớp (M1)'],
        ra: 'Một bộ phương pháp học dùng được · recall sau 24 giờ tăng rõ',
        cong: 'Em dạy lại được phương pháp ấy cho một bạn và bạn dùng được' },
      { n: 'CK3', t: 'Tự chạy', ngay: 'N181–270',
        viec: ['Coach giảm từ tuần/buổi xuống hai tuần/buổi',
               'Em tự cập nhật bảng số, tự báo cáo tuần trước chi hội',
               'Một lần vấp có ghi sổ phục hồi'],
        ra: 'Tự vận hành ba tuần liên tục · thời gian quay lại sau vấp < 3 ngày',
        cong: 'Kết quả không tụt khi mức hỗ trợ giảm một nấc' },
      { n: 'CK4', t: 'Chuyển giao', ngay: 'N271–360',
        viec: ['Mang nhịp sang một bối cảnh khác: trại, kỳ nghỉ, đợt thi',
               'Kèm một bạn V1 mới vào theo mẫu cặp đôi rèn',
               'Hồ sơ bậc 2: 12 tháng dữ liệu, không tô vẽ'],
        ra: 'Hồ sơ bậc 2 đầy đủ · một bạn được em kèm có tiến bộ ghi được',
        cong: 'Cổng bậc 2 — 100 điểm, ngưỡng đạt 85' }
    ]},
  { bac: 'B3', t: 'THÂN', tong: '6 chu kỳ · 18 tháng', mau: '#0B6675',
    ck: [
      { n: 'CK1', t: 'Chọn mũi nhọn', ngay: 'N1–90',
        viec: ['Thử ba hướng, mỗi hướng 30 ngày, có sản phẩm nhỏ',
               'Vào một tổ mũi nhọn · gặp riêng tổ hai tuần một lần',
               'Ghế nóng lần đầu'],
        ra: 'Một mũi nhọn được chi hội công nhận · ba sản phẩm thử',
        cong: 'Em giải thích được vì sao chọn mũi này, bằng bằng chứng chứ không bằng cảm giác' },
      { n: 'CK2', t: 'Luyện sâu', ngay: 'N91–180',
        viec: ['10 giờ luyện có chủ đích mỗi tuần trong mũi nhọn',
               'Một cố vấn chuyên môn ngoài nhận kèm',
               'Đo hiệu suất: giờ tập trung sâu, sản lượng, chất lượng'],
        ra: 'Một tác phẩm/sản phẩm ở mức người ngoài nhận xét được',
        cong: 'Cố vấn ngoài xác nhận em đã qua mức nghiệp dư' },
      { n: 'CK3', t: 'Dự án đầu tiên', ngay: 'N181–270',
        viec: ['Một dự án có người dùng thật, không phải bài tập',
               'Tự lập cột mốc, tự chịu deadline',
               'Dẫn một nhóm 2–4 bạn'],
        ra: 'Sản phẩm bàn giao · ít nhất 5 người dùng ngoài gia đình',
        cong: 'Có phản hồi thật của người dùng, kể cả phản hồi xấu' },
      { n: 'CK4', t: 'Ra ngoài', ngay: 'N271–360',
        viec: ['Một cuộc thi, một sân khấu hoặc một sự kiện ngoài trường',
               'Dẫn một chuyên đề kỹ năng sống trong trường (M2)',
               'Nhận ghế tiểu ban trong chi hội'],
        ra: 'Một lần bị chấm bởi người lạ · một lần dạy lại cho người khác',
        cong: 'Em đứng vững khi bị đánh giá bởi người không quen biết em' },
      { n: 'CK5', t: 'Dự án thứ hai', ngay: 'N361–450',
        viec: ['Dự án khó hơn, có phần em chưa biết làm khi bắt đầu',
               'Một dự án phụng sự cộng đồng (M4)',
               'Chấm chéo với một bạn cùng tổ'],
        ra: 'Sản phẩm thứ hai · giờ phụng sự có xác nhận',
        cong: 'Năng lực từ dự án 1 được chuyển sang dự án 2 — nói ra được chuyển cái gì' },
      { n: 'CK6', t: 'Bảo vệ', ngay: 'N451–540',
        viec: ['Dựng hồ sơ năng lực 18 tháng',
               'Bảo vệ trước hội đồng: học viên trình bày, Coach không nói thay',
               'Thiết kế đích bậc 4'],
        ra: 'Hồ sơ bậc 3 · kế hoạch bậc 4',
        cong: 'Cổng bậc 3 — bắt buộc có bằng chứng từ ít nhất hai môi trường, trong đó có M4' }
    ]},
  { bac: 'B4', t: 'TRỤ', tong: '4 giai đoạn · 24 tháng', mau: '#0B7350',
    ck: [
      { n: 'GĐ1', t: 'Dẫn nhóm', ngay: 'Tháng 1–6',
        viec: ['Nhận một ghế ban điều hành chi hội trọn nhiệm kỳ',
               'Dẫn một tổ mũi nhọn hoặc một dự án 5+ người',
               'Học cách giao việc và cách chịu trách nhiệm khi người khác trượt'],
        ra: 'KPI của ghế đạt · phản hồi 360 từ nhóm',
        cong: 'Người trong nhóm xác nhận em dẫn được — không chỉ em tự nhận' },
      { n: 'GĐ2', t: 'Hiểu nghề', ngay: 'Tháng 7–12',
        viec: ['Ba lần trải nghiệm nghề thật: quan sát · làm thử · phỏng vấn người trong nghề',
               'Bản đồ nghề: mình – nghề – khoảng cách',
               'Một sản phẩm mang chuẩn nghề, không phải chuẩn học sinh'],
        ra: 'Career Map có căn cứ · một sản phẩm chuẩn nghề',
        cong: 'Em nói được nghề ấy đòi gì mà em còn thiếu, cụ thể tới từng năng lực' },
      { n: 'GĐ3', t: 'Portfolio', ngay: 'Tháng 13–18',
        viec: ['Dựng hồ sơ năng lực dùng được cho tuyển sinh, học bổng, việc làm',
               'Một dự án dài 6 tháng có tác động đo được',
               'Kèm một em bậc 2 đi qua một chu kỳ'],
        ra: 'Portfolio · một em bậc 2 tiến bộ có số liệu',
        cong: 'Một người ngoài hệ đọc portfolio và hiểu em làm được gì trong 3 phút' },
      { n: 'GĐ4', t: 'Đứng một mình', ngay: 'Tháng 19–24',
        viec: ['Coach chuyển hẳn sang vai phản biện chiến lược, mỗi tháng một buổi',
               'Em tự thiết kế chu kỳ của chính mình và tự chấm',
               'Một quyết định lớn do em tự chịu trách nhiệm'],
        ra: 'Hồ sơ bậc 4 · bản đồ 5–20 năm bản của riêng em',
        cong: 'Cổng bậc 4 — 12 trục ≥ mức 4 ở 8 trục, trục 9 và 10 đạt mức 4' }
    ]},
  { bac: 'B5', t: 'NGƯỜI DẪN', tong: '4 chặng · 36 tháng', mau: '#BE0E16',
    ck: [
      { n: 'CH1', t: 'Học nghề dẫn', ngay: 'Tháng 1–9',
        viec: ['Khoá Mentor: mô thức G–I–T–A · ma trận 8×8 · quy trình 10 bước · ranh giới chuyên môn',
               'Ngồi dự 20 buổi của Coach có nghề, ghi biên bản quan sát',
               'Học cách hỏi thay vì cách khuyên'],
        ra: 'Chứng nhận hoàn thành khoá Mentor · 20 biên bản quan sát',
        cong: 'Bài kiểm đọc ca: cho một hồ sơ, em chỉ đúng điểm nghẽn và nói được vì sao' },
      { n: 'CH2', t: 'Ca đầu tiên', ngay: 'Tháng 10–18',
        viec: ['Kèm một em bậc 1–2, có Coach ngồi cùng và gỡ băng sau mỗi buổi',
               'Viết phác đồ đầu tiên của chính mình',
               'Nhận phản biện từ Assessor'],
        ra: 'Một ca hoàn chỉnh có hồ sơ · một phác đồ được duyệt vào kho',
        cong: 'Ca ấy qua cổng, và Assessor xác nhận là nhờ cách dẫn chứ không nhờ may' },
      { n: 'CH3', t: 'Ba ca song song', ngay: 'Tháng 19–30',
        viec: ['Kèm ba em cùng lúc, ba loại vấn đề khác nhau',
               'Tự quản lịch, tự giữ chuẩn, tự báo cáo',
               'Bắt đầu dạy lại trong khoá nền của chi hội'],
        ra: 'Ba hồ sơ ca · điểm nghiệm thu trung bình ≥ 85',
        cong: '≥ 3 người bậc dưới qua cổng dưới sự dẫn dắt của em, Assessor độc lập xác nhận' },
      { n: 'CH4', t: 'Nghiệm thu người dẫn', ngay: 'Tháng 31–36',
        viec: ['Bảo vệ ba ca trước Quản lý chuyên môn',
               'Đóng góp ít nhất một mục mới vào kho (kịch bản, phác đồ hoặc chuyên đề)',
               'Nhận bảo trợ mở chi hội mới hoặc nhận ghế cố vấn V5'],
        ra: 'Công nhận bậc 5 · tên vào danh sách người dẫn của hệ',
        cong: 'Hội đồng Chuẩn bỏ phiếu' }
    ]},
  { bac: 'B6', t: 'KIẾN TRÚC SƯ', tong: 'Nhiệm kỳ 5 năm, có tái nghiệm thu', mau: '#A8801F',
    ck: [
      { n: 'NK', t: 'Một nhiệm kỳ', ngay: '5 năm',
        viec: ['Phụ trách một vùng hoặc một nhánh chuyên môn',
               'Đào tạo ít nhất 5 người bậc 5 mới',
               'Viết hoặc sửa ít nhất một phần chuẩn, có ghi vào Sổ Chuẩn',
               'Ngồi Hội đồng Chuẩn, một phiếu ngang mọi phiếu khác'],
        ra: 'Vùng chạy đúng chuẩn · 5 người dẫn mới · một phần chuẩn được nâng',
        cong: 'Tái nghiệm thu: vùng vẫn chạy đúng chuẩn trong 24 tháng khi em không có mặt hằng ngày' }
    ]}
];

/* ══════════ KHOÁ NỀN — 8 BUỔI TRONG 60 NGÀY ══════════
   Bắt buộc với mọi thành viên thử V1. Không xong khoá nền thì không lên
   V2, bất kể em ấy dễ thương tới đâu. Mỗi buổi 60 phút, dạy bởi Trưởng
   ban Đào tạo hoặc một thành viên V3 trở lên.                          */
GV.KHOA_NEN = [
  { b: 1, t: 'Luật và văn hoá chi hội', dich: 'Hiểu mình vừa bước vào đâu và luật ở đây là gì',
    lop: 'Đọc 10 điều luật · kể ba tình huống vi phạm và cùng xử · nhận huy hiệu và thẻ tên',
    nha: 'Kể lại cho gia đình nghe chi hội là gì, xin gia đình một câu cam kết ủng hộ',
    kiem: 'Nói lại được 10 điều luật bằng lời của mình' },
  { b: 2, t: 'Vòng 45 giây', dich: 'Dựng được bài giới thiệu bản thân đứng trước đám đông',
    lop: 'Cấu trúc ba nhịp: em là ai · mũi nhọn · tuần này cần gì. Tập 5 lượt, quay lại xem',
    nha: 'Tập trước gương 10 lần, quay một video gửi Trưởng ban Đào tạo',
    kiem: 'Đứng nói 45 giây không cầm giấy, mắt nhìn người nghe' },
  { b: 3, t: 'Bản đồ cá nhân và mũi nhọn', dich: 'Biết mình mạnh ở đâu và chọn hướng để mài',
    lop: 'Bản đồ 11 ô · đọc kết quả test đầu vào · liệt kê 10 việc mình từng làm tốt',
    nha: 'Hỏi ba người khác nhau: "theo anh/chị, em giỏi nhất việc gì?" — ghi nguyên văn',
    kiem: 'Nêu được một mũi nhọn tạm chọn kèm ba bằng chứng' },
  { b: 4, t: 'Mục tiêu và cam kết công khai', dich: 'Biết cách đặt đích của chính mình, không phải đích người lớn giao',
    lop: 'Phân biệt mục tiêu của em và kỳ vọng của người lớn · viết một mục tiêu 90 ngày',
    nha: 'Ngồi với ba mẹ 30 phút, thống nhất mục tiêu ấy, cả hai bên ký',
    kiem: 'Mục tiêu viết bằng hành vi quan sát được, có mốc và có cách đo' },
  { b: 5, t: 'Bảng số — ghi số thật', dich: 'Tự ghi bảy cột và hiểu vì sao khai gian là mất tư cách',
    lop: 'Điền thử bảng số một tuần giả định · xếp băng · đọc bảng của người khác',
    nha: 'Ghi bảng số thật của tuần đầu tiên',
    kiem: 'Bảng số nộp đúng hạn, có cột nào bằng không thì ghi không, không tô' },
  { b: 6, t: 'Cặp đôi rèn', dich: 'Biết cách hỏi và cách nghe, không phải cách khoe',
    lop: 'Bộ 12 câu hỏi mở · luật 70/30 (nghe 70, nói 30) · làm mẫu một cặp trước lớp',
    nha: 'Thực hiện một cặp đôi rèn 30 phút, nộp phiếu ghi',
    kiem: 'Phiếu ghi có ít nhất ba điều em học được về bạn mà trước đó không biết' },
  { b: 7, t: 'Trao cơ hội và thư biết ơn', dich: 'Hiểu "cho đi trước" là một việc cụ thể, không phải khẩu hiệu',
    lop: 'Bốn loại cơ hội trao được · cách viết thư biết ơn có tên và có việc cụ thể',
    nha: 'Trao một cơ hội thật cho một bạn trong chi hội và viết một thư biết ơn',
    kiem: 'Người nhận xác nhận cơ hội ấy có ích thật' },
  { b: 8, t: 'Nhịp tuần và hội đồng gia đình', dich: 'Khớp chi hội vào đời sống thật của cả tuần',
    lop: 'Vòng bảy ngày · cách chạy hội đồng gia đình 30 phút · bốn môi trường',
    nha: 'Chạy hội đồng gia đình lần đầu, có biên bản một trang',
    kiem: 'Phụ huynh xác nhận đã họp và ghi một điều gia đình sẽ đổi' }
];

/* ══════════ 24 CHUYÊN ĐỀ HẠT GIỐNG TRI THỨC ══════════
   Bảy phút mỗi buổi sinh hoạt. Một năm 48 tuần thì chạy hai vòng, vòng
   sau sâu hơn vòng trước. Mỗi chuyên đề PHẢI kèm một việc làm được ngay
   trong tuần — bảy phút giảng đạo lý là bảy phút bị mất.               */
GV.CHUYEN_DE = [
  { nhom: 'Làm chủ bản thân', mau: '#5140B4', ds: [
    { t: 'Ba việc lõi của một ngày', lam: 'Tối nay viết ba việc cho ngày mai, không hơn' },
    { t: 'Khung giờ theo năng lượng', lam: 'Đo năng lượng bốn khung giờ trong bảy ngày' },
    { t: 'Tạo ma sát với thứ gây nhiễu', lam: 'Chuyển điện thoại ra khỏi tầm mắt khi học, đo số lần với tay' },
    { t: 'Vấp rồi quay lại trong 24 giờ', lam: 'Viết trước một kế hoạch phục hồi cho lần vấp tới' },
    { t: 'Nói không mà không mất bạn', lam: 'Từ chối một lời rủ không hợp mục tiêu, ghi lại cảm giác' },
    { t: 'Thân thể là công cụ đầu tiên', lam: 'Ngủ đủ bảy ngày liền, ghi giờ ngủ và giờ dậy' }
  ]},
  { nhom: 'Học tập', mau: '#185AB4', ds: [
    { t: 'Truy hồi thay vì đọc lại', lam: 'Sau mỗi bài, gấp sách và viết lại những gì nhớ' },
    { t: 'Cách quãng — vì sao nhớ 24 giờ là ảo', lam: 'Kiểm lại bài hôm nay sau 1 ngày, 3 ngày, 7 ngày' },
    { t: 'Ghi chú chủ động', lam: 'Chuyển một trang vở thành năm câu hỏi' },
    { t: 'Học một thứ để dạy lại', lam: 'Dạy lại một khái niệm cho một bạn trong tuần' },
    { t: 'Sai ở đâu — đọc lỗi thay vì đọc điểm', lam: 'Lập bảng lỗi của bài kiểm gần nhất, phân theo loại' },
    { t: 'Chuyển bối cảnh', lam: 'Dùng một phương pháp của môn này sang môn khác, ghi kết quả' }
  ]},
  { nhom: 'Giao tiếp và lãnh đạo', mau: '#0B7350', ds: [
    { t: 'Nghe 70 nói 30', lam: 'Một cuộc nói chuyện chỉ hỏi, không kể về mình' },
    { t: 'Nói một ý trong 45 giây', lam: 'Rút một bài trình bày 5 phút xuống 45 giây' },
    { t: 'Xin lỗi và cảm ơn đúng cách', lam: 'Viết một lời cảm ơn có tên và có việc cụ thể' },
    { t: 'Giao việc mà không làm hộ', lam: 'Giao một việc trong nhóm, không nhận lại làm thay' },
    { t: 'Phản biện vào việc, không vào người', lam: 'Góp ý một bạn theo công thức: việc – tác động – đề nghị' },
    { t: 'Đứng ra chịu khi nhóm trượt', lam: 'Báo cáo một việc nhóm chưa xong, không đổ lỗi' }
  ]},
  { nhom: 'Tư duy và tương lai', mau: '#BE0E16', ds: [
    { t: 'Hỏi năm lần "vì sao"', lam: 'Đào một vấn đề của mình xuống năm tầng' },
    { t: 'Phân biệt sự thật và ý kiến', lam: 'Tách một bài đăng mạng xã hội thành hai cột' },
    { t: 'Quy tắc 20/80 trong việc học', lam: 'Tìm 20% nội dung tạo 80% điểm của một môn' },
    { t: 'Tiền: kiếm, giữ, và cho', lam: 'Ghi chi tiêu bảy ngày, không sửa số' },
    { t: 'Một nghề trông ra sao từ bên trong', lam: 'Phỏng vấn 20 phút một người đang làm nghề em thích' },
    { t: 'Mình muốn để lại gì', lam: 'Viết một trang: 20 năm nữa em muốn ai nhớ em vì điều gì' }
  ]}
];

/* ══════════ THIẾT KẾ TRẠI ══════════ */
GV.TRAI = {
  ly: [
    'Trại không phải kỳ nghỉ có học. Trại là một nhịp nén: ba tới bảy ngày để tạo một bước ngoặt mà nhịp tuần thường không tạo nổi.',
    'Bước ngoặt cảm xúc tan trong khoảng ba tuần nếu không có nhịp giữ ở nhà. Vì vậy mỗi trại BẮT BUỘC kèm 21 ngày hậu trại — không có phần này thì không tổ chức trại.',
    'Nguyện vọng phụ huynh gửi khi đăng ký (kỷ luật · tự giác · mục tiêu · tự tin · biết ơn) là dữ liệu đầu vào của thiết kế, không phải lời chào xã giao. Mỗi kỳ trại đọc lại toàn bộ nguyện vọng trước khi chốt kịch bản.'
  ],
  ds: [
    { t: 'TRẠI GEN ALPHA', ngay: '3 ngày 2 đêm', ai: 'B1–B2 · 10–14 tuổi', quy: '40–60 em',
      dich: 'Thắp lửa và mở bậc: em nhìn thấy một phiên bản khác của chính mình và tin nó có thật',
      truc: 'I Nội lực · A Hành động',
      khoanh: ['Đêm 1 — vòng tròn kể thật: điều em chưa từng nói với ba mẹ',
               'Sáng 2 — thử thách vượt giới hạn thể chất có kiểm soát',
               'Chiều 2 — em dạy lại một điều cho nhóm nhỏ',
               'Tối 2 — thư gửi ba mẹ, ba mẹ đọc trong lễ bế mạc',
               'Sáng 3 — cam kết 21 ngày, viết và ký trước cả trại',
               'Lễ tốt nghiệp — ba mẹ có mặt, em trình bày, không ai trình bày hộ'] },
    { t: 'TRẠI LEADER BOOM', ngay: '5 ngày 4 đêm', ai: 'B3–B4 · 14–18 tuổi', quy: '30–50 em',
      dich: 'Rèn người dẫn: nhận trách nhiệm thật, dẫn nhóm thật, chịu kết quả thật',
      truc: 'T Tài năng · A Lãnh đạo · G Định hướng',
      khoanh: ['Ngày 1 — chia đội, bầu đội trưởng, giao ngân sách và nguồn lực có hạn',
               'Ngày 2 — dự án 48 giờ có người thụ hưởng thật ngoài trại',
               'Ngày 3 — khủng hoảng cài sẵn: mất một nguồn lực, đội phải xoay',
               'Ngày 4 — bảo vệ dự án trước hội đồng có người ngoài',
               'Ngày 4 tối — phản hồi 360 trong đội, nói thẳng, có người điều phối',
               'Ngày 5 — bản đồ 5 năm và cam kết bậc kế tiếp'] }
  ],
  ngay: [
    { p: '05:30–07:00', m: 'Dậy · vận động · vệ sinh khu ở', y: 'Kỷ luật bắt đầu từ chiếc giường được gấp' },
    { p: '07:00–08:00', m: 'Ăn sáng · vòng tròn buổi sáng', y: 'Mỗi đội nói một câu về đích của ngày' },
    { p: '08:00–11:30', m: 'Khối chính buổi sáng — học và luyện', y: 'Khối nặng nhất đặt vào giờ năng lượng cao nhất' },
    { p: '11:30–13:30', m: 'Ăn trưa · nghỉ', y: 'Nghỉ thật, không nhồi thêm hoạt động' },
    { p: '13:30–17:00', m: 'Khối trải nghiệm — thử thách, dự án, ngoài trời', y: 'Nơi năng lực bị kiểm bằng việc thật' },
    { p: '17:00–19:00', m: 'Thể thao · ăn tối', y: 'Cơ thể mệt đúng cách thì đêm mới lắng' },
    { p: '19:00–21:00', m: 'Đêm chủ đề — phần cảm xúc mạnh nhất trong ngày', y: 'Chỉ một điểm chạm mỗi đêm, không dồn ba' },
    { p: '21:00–22:00', m: 'Nhật ký · vòng tròn đội · ngủ', y: 'Viết trước khi ngủ là cách giữ lại thứ vừa xảy ra' }
  ],
  hau: [
    { n: 'Ngày 1–3', v: 'Coach gọi từng nhà. Không hỏi "trại vui không" mà hỏi "em đã làm được gì trong cam kết"' },
    { n: 'Ngày 4–21', v: 'Chi hội nhận em vào nhịp tuần. Cam kết trại thành cam kết công khai trước chi hội' },
    { n: 'Ngày 21', v: 'Buổi tổng kết hậu trại: em nào giữ được cam kết thì lên bậc hoặc lên vòng; em nào không thì được đọc lại nguyên nhân, không bị chê' },
    { n: 'Ngày 22 trở đi', v: 'Nếu 21 ngày không chạy, ghi vào hồ sơ thiết kế trại kỳ sau — lỗi thuộc về thiết kế, không thuộc về đứa trẻ' }
  ]
};

/* ══════════ BỘ TEST NHẬN DIỆN ĐẦU VÀO ══════════
   Năm bộ, mỗi bộ 30 câu, thang 1–5. Không dùng để dán nhãn. Dùng để có
   một baseline trung thực và để chọn đúng câu hỏi cho buổi đầu tiên.   */
GV.BO_TEST = {
  luat: [
    'Không có câu trả lời đúng hay sai. Có câu trả lời thật và câu trả lời để làm vừa lòng người lớn — bộ test chỉ hữu ích khi rơi vào loại thứ nhất.',
    'Học viên và phụ huynh làm hai bản riêng. Chỗ hai bản lệch nhau nhiều nhất chính là chỗ đáng nói nhất trong buổi tư vấn.',
    'Kết quả không bao giờ được đọc trước mặt em dưới dạng phán xét. Đọc dưới dạng bản đồ: "đây là chỗ em đang mạnh, đây là chỗ mình sẽ đi cùng nhau."'
  ],
  ds: [
    { m: 'T1', t: 'Chân dung G–I–T–A', do: 'Mục tiêu có thuộc về em không · nội lực · năng lực tự đánh giá · môi trường', ra: 'Bản đồ bốn trụ, chỉ ra trụ yếu nhất' },
    { m: 'T2', t: 'Thói quen và nhịp sống', do: 'Giờ giấc · thiết bị · vào việc mất bao lâu · số lần bị nhắc', ra: 'Baseline nhịp ngày, dùng làm mốc so ở cổng 90 ngày' },
    { m: 'T3', t: 'Phương pháp học', do: 'Cách ghi nhớ · cách ôn · cách xử lý bài khó · tự kiểm', ra: 'Điểm nghẽn trong chuỗi tiếp nhận → vận dụng' },
    { m: 'T4', t: 'Quan hệ gia đình', do: 'Mức kiểm soát · ngôn ngữ hằng ngày · xung đột · niềm tin hai chiều', ra: 'Vòng lặp gia đình đang duy trì vấn đề' },
    { m: 'T5', t: 'Ước mơ và định hướng', do: 'Có đích dài không · đích của ai · biết gì về nghề mình thích', ra: 'Độ rõ của G, và khoảng cách giữa mơ và biết' }
  ],
  doc: [
    { d: 'Cả năm bộ đều thấp', y: 'Chưa đủ dữ liệu hoặc em không muốn trả lời thật. Đừng kết luận — làm lại sau 7 ngày quan sát' },
    { d: 'T1 cao, T2 thấp', y: 'Biết mình muốn gì nhưng chưa có hệ vận hành. Vào ngay trục A2 Tự quản' },
    { d: 'T2 cao, T5 thấp', y: 'Ngoan và đều nhưng đang chạy theo đích của người khác. Rủi ro tắt lửa ở tuổi 16' },
    { d: 'T3 thấp, điểm số cao', y: 'Đang gồng bằng thời gian. Sẽ vỡ khi khối lượng tăng' },
    { d: 'T4 lệch mạnh giữa hai bản', y: 'Vấn đề nằm ở quan hệ chứ không ở việc học. Vào 13.7 trước, đừng vào phương pháp' }
  ]
};

/* ══════════ ĐÀO TẠO BAN ĐIỀU HÀNH ══════════ */
GV.DAO_TAO_BDH = {
  n: 'Mỗi nhiệm kỳ 6 tháng có ba mốc đào tạo bắt buộc. Một ghế được trao mà không có ba mốc này thì chi hội đang giao việc chứ không đang rèn người.',
  ds: [
    { m: 'Trước nhiệm kỳ · 2 buổi', t: 'Nhận ghế',
      v: ['Buổi 1 — người tiền nhiệm bàn giao: sổ ghế, số liệu, ba việc đang dở, ba cái bẫy của ghế này',
          'Buổi 2 — Liên chi hội vùng đào tạo chung cho ban điều hành mới của mọi chi hội trong vùng',
          'Ký nhận KPI của ghế, công bố trước chi hội'] },
    { m: 'Giữa nhiệm kỳ · tháng 3', t: 'Chấm giữa kỳ',
      v: ['Cố vấn V5 dự một buổi sinh hoạt và chấm theo bảng 20 điểm',
          'Ban điều hành tự chấm, so hai bảng, chỗ lệch nhiều nhất là chỗ phải sửa',
          'Sửa ngay trong tháng 4, không để tới cuối kỳ'] },
    { m: 'Cuối nhiệm kỳ · tháng 6', t: 'Bàn giao',
      v: ['Báo cáo KPI của ghế trước chi hội, số thật',
          'Viết một trang "ba điều người sau nên biết" — vào sổ ghế',
          'Bầu và bàn giao trong cùng một buổi, không để trống ghế quá một tuần'] }
  ],
  soGhe: 'Mỗi ghế có một SỔ GHẾ đi từ nhiệm kỳ này sang nhiệm kỳ khác: việc phải làm theo tuần, số liệu các kỳ trước, danh sách bẫy đã gặp. Sau ba nhiệm kỳ, sổ ghế trở thành tài liệu đào tạo tốt hơn bất cứ thứ gì Học viện viết ra.'
};
