/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · KHO TRẢI NGHIỆM VÀ CAM KẾT
   Phần trả lời một câu hỏi mà kiến trúc không trả lời được: khi đứng
   ở phía gia đình nhìn vào, hệ này CẢM THẤY như thế nào.
   Nguyên tắc của cả kho: mỗi lời hứa phải đo được, và không giữ được
   thì phải có thứ đền — tự động, không đợi người ta đòi.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ── 1 · Hành trình 365 ngày của một gia đình ────────────────
     Không phải phễu bán hàng. Đây là bản đồ CẢM XÚC: mỗi chặng
     phụ huynh đang nghĩ gì, sợ gì, và hệ đặt cái gì vào tay họ. */
  G.TN_HANH_TRINH = [
    { ma: 'C0', t: 'Nghe tên lần đầu', khi: 'Ngày −30 → 0', mau: '#7A8CA3',
      nghi: '“Lại một khoá kỹ năng sống nữa.”',
      so: 'Mất tiền thì tiếc, mất thời gian của con thì tiếc hơn.',
      lam: ['Không mời chào. Gửi một thứ dùng được ngay mà không cần mua gì: bộ *bảy câu hỏi bàn ăn*, hai trang.',
            'Người gửi là một phụ huynh đang học, không phải nhân viên tuyển sinh.',
            'Im lặng bảy ngày sau khi gửi. Không nhắn nhắc.'],
      vat: 'Bộ bảy câu hỏi bàn ăn (bản in hoặc PDF hai trang)',
      roi: 'Mở một lần rồi thôi. Không hỏi lại câu nào.',
      cuu: 'Một tin nhắn hỏi về *con họ*, không nhắc gì tới khoá: “Hôm nọ chị thử câu số 3 chưa, cháu trả lời sao ạ?”' },

    { ma: 'C1', t: 'Buổi tư vấn đầu tiên', khi: 'Ngày 0 · 60 phút', mau: '#5140B4',
      nghi: '“Xem thử họ nói gì, chắc lại bán hàng.”',
      so: 'Bị chê con. Bị dồn vào thế phải quyết ngay hôm nay.',
      lam: ['Bốn mươi phút đầu chỉ nghe. Người tư vấn không được nói quá ba câu liên tiếp.',
            'Không có bảng giá trên bàn trong 40 phút đầu.',
            'Kết buổi bằng *một việc nhỏ làm trong bảy ngày* — không kết bằng tiền.'],
      vat: 'Bản đọc ca một trang — thứ gia đình mang về được dù không mua gì',
      roi: '“Để em bàn với gia đình đã” mà không có lịch hẹn lại.',
      cuu: 'Không gọi đòi câu trả lời. Bảy ngày sau nhắn hỏi *kết quả việc nhỏ*, và chỉ hỏi việc ấy.' },

    { ma: 'C2', t: 'Tuần thử', khi: 'Ngày 1 → 7', mau: '#0B6675',
      nghi: '“Để xem con có thích không đã.”',
      so: 'Con đi một buổi rồi đòi nghỉ, mình lại mang tiếng ép con.',
      lam: ['Buổi đầu: Coach gọi đúng tên con và một chi tiết riêng của con trong 30 giây đầu.',
            'Sau mỗi buổi, phụ huynh nhận một tin nhắn *ba dòng*: con làm được gì, con vướng gì, tuần này nhà giúp gì.',
            'Cuối tuần thử: gia đình được hoàn 100% nếu thấy không hợp — không hỏi lý do.'],
      vat: 'Ba tin nhắn ba dòng, và một video 45 giây con nói về việc con làm',
      roi: 'Con đi hai buổi, buổi thứ ba viện cớ. Phụ huynh nhắn giờ giấc chứ không nhắn về con.',
      cuu: 'Coach gọi cho *con*, không gọi cho phụ huynh. Hỏi đúng một câu: “Chỗ nào làm em thấy chán nhất?” rồi sửa đúng chỗ đó.' },

    { ma: 'C3', t: 'Lễ nhập hệ', khi: 'Ngày 8', mau: '#185AB4',
      nghi: '“Được, thử một chu kỳ xem sao.”',
      so: 'Đóng tiền xong thì thái độ đổi.',
      lam: ['Nghi thức trao hộ chiếu trước mặt cả tổ — không phát ở bàn lễ tân.',
            'Con tự đọc to lời cam kết của mình, không ai đọc hộ.',
            'Phụ huynh ký vào trang đầu hộ chiếu, dưới chữ ký của con.'],
      vat: 'Hộ chiếu nhân tài bìa cứng · huy hiệu B1 · ảnh chân dung ngày nhập hệ',
      roi: 'Không có gì rơi ở chặng này nếu nghi thức làm đúng. Rơi là do bỏ nghi thức cho nhanh.',
      cuu: 'Đã bỏ nghi thức thì làm bù trong tuần, đừng bỏ luôn. Trao muộn vẫn hơn không trao.' },

    { ma: 'C4', t: 'Chu kỳ đầu', khi: 'Ngày 9 → 90', mau: '#0B7350',
      nghi: '“Xem có gì đổi thật không.”',
      so: 'Ba tháng trôi qua mà chẳng thấy khác gì.',
      lam: ['Tuần 3 là tuần nguy hiểm nhất — hết hào hứng, chưa thấy kết quả. Coach chủ động gọi *trước khi* phụ huynh phàn nàn.',
            'Tuần 6: gửi bảng so sánh con với chính con ngày đầu, có bằng chứng cụ thể, không có lời khen chung chung.',
            'Tuần 10: con được giao một việc thật ở lớp hoặc ở nhà, có người ngoài xác nhận.'],
      vat: 'Thư tuần · bảng đối chiếu tuần 6 · phiếu xác nhận việc thật của người ngoài',
      roi: 'Ba tuần liền phụ huynh không kể lại được việc gì con làm.',
      cuu: 'Hạ nhịp: bỏ bớt nội dung, dồn vào một trục duy nhất cho tới khi có một thắng lợi nhìn thấy được.' },

    { ma: 'C5', t: 'Cổng nghiệm thu đầu tiên', khi: 'Ngày 90', mau: '#BE0E16',
      nghi: '“Con mình có qua không?”',
      so: 'Con trượt trước mặt mọi người.',
      lam: ['Kết quả cổng được nói riêng với gia đình *trước*, công bố sau.',
            'Không đạt không gọi là trượt: gọi là *chưa đủ bằng chứng ở trục nào*, và có ngay lịch làm lại.',
            'Ai đạt thì lên bậc trong buổi lễ có mặt phụ huynh.'],
      vat: 'Bảng điểm sáu cột · trang hộ chiếu được đóng dấu · huy hiệu bậc mới',
      roi: 'Không đạt và im lặng ba ngày. Gia đình tự suy diễn.',
      cuu: 'Trong 24 giờ phải có cuộc gọi nói rõ: thiếu gì, vì sao thiếu, làm gì trong 30 ngày tới, ai kèm.' },

    { ma: 'C6', t: 'Trại và bậc hai', khi: 'Ngày 91 → 180', mau: '#A8801F',
      nghi: '“Giờ thì tin rồi.”',
      so: 'An toàn của con khi đi trại xa nhà.',
      lam: ['Trước trại: gửi bộ hồ sơ an toàn đầy đủ, kèm số điện thoại người chịu trách nhiệm từng ca trực.',
            'Trong trại: ảnh nhóm mỗi tối, không ảnh riêng từng cháu tràn lan.',
            'Sau trại: 21 ngày hậu trại có việc cụ thể — trại không được là ba ngày cảm xúc rồi tắt.'],
      vat: 'Hồ sơ an toàn trại · thư tay Coach viết tay trong đêm cuối trại · sổ 21 ngày',
      roi: 'Hết trại, hai tuần sau mọi thứ trở lại như cũ.',
      cuu: 'Ngày thứ 22 phải có một buổi báo công trước chi hội. Không có buổi này thì trại chỉ là một kỳ nghỉ.' },

    { ma: 'C7', t: 'Con bắt đầu dẫn người khác', khi: 'Ngày 181 → 300', mau: '#0B6675',
      nghi: '“Con mình khác thật rồi.”',
      so: 'Con ôm việc quá nhiều, ảnh hưởng học chính khoá.',
      lam: ['Giao ghế trong ban điều hành chi hội, có nhiệm kỳ và có bàn giao.',
            'Kèm một em nhỏ hơn — đây là bước biến người học thành người dạy.',
            'Rà điểm số ở trường mỗi tháng; tụt hai kỳ liên tiếp thì giảm việc, không giảm bậc.'],
      vat: 'Sổ ghế · phiếu kèm cặp có chữ ký của em được kèm',
      roi: 'Con nhận ghế rồi không làm, hoặc làm mà không ai xác nhận.',
      cuu: 'Rút ghế trong êm thấm, không công bố. Cho làm lại sau một chu kỳ.' },

    { ma: 'C8', t: 'Tổng kết năm và tái cam kết', khi: 'Ngày 301 → 365', mau: '#185AB4',
      nghi: '“Năm sau có đi tiếp không?”',
      so: 'Học phí năm sau. Và con lớn lên thì có còn hợp không.',
      lam: ['Hộp kỷ vật một năm: mọi bằng chứng con đã tạo ra, đóng thành hộp, trao tận tay.',
            'Buổi *con báo cáo với bố mẹ* — con nói, người lớn nghe, Coach chỉ ngồi dưới.',
            'Bảng lộ trình năm sau đưa ra trước khi nói tới học phí năm sau.'],
      vat: 'Hộp kỷ vật một năm · bằng bậc · thư của Coach gửi con đọc năm 18 tuổi',
      roi: 'Nhận hộp kỷ vật xong là hết. Không đăng ký tiếp, cũng không nói gì.',
      cuu: 'Không gọi mời tái tục. Mời tham gia *một việc*: dẫn một buổi cho khoá mới. Người còn được cần đến thì còn ở lại.' }
  ];

  /* ── 2 · Mười hai khoảnh khắc quyết định ─────────────────────
     Cả năm cảm nhận của một gia đình được quyết định ở khoảng
     mười hai điểm. Làm đúng mười hai điểm này thì phần còn lại
     được tha thứ; làm sai thì phần còn lại không cứu nổi. */
  G.TN_KHOANH_KHAC = [
    { so: '01', t: 'Cuộc gọi lại đầu tiên',
      thuong: 'Hai đến ba ngày sau. Người gọi là tổng đài, đọc kịch bản.',
      minh: 'Trong 4 giờ làm việc. Người gọi là chính người đã ngồi nghe, và mở đầu bằng một chi tiết về con mà chỉ họ mới biết.',
      do: 'Giờ giữa lúc để lại số và lúc chuông đổ · ai gọi' },
    { so: '02', t: 'Ba mươi giây đầu buổi học đầu tiên',
      thuong: 'Điểm danh theo danh sách.',
      minh: 'Gọi đúng tên con và nói một chi tiết riêng của con. Coach đã học thuộc trước khi con bước vào.',
      do: 'Hỏi con sau buổi: “Cô/thầy có biết gì về em không?”' },
    { so: '03', t: 'Lần đầu con làm sai trước lớp',
      thuong: 'Sửa ngay tại chỗ, trước mặt các bạn.',
      minh: 'Không sửa trước lớp. Ghi lại, nói riêng sau buổi, và cho con làm lại trong buổi kế tiếp.',
      do: 'Dự giờ — đếm số lần sửa công khai một cá nhân' },
    { so: '04', t: 'Lần đầu con thất bại một việc thật',
      thuong: 'An ủi cho qua, hoặc lảng sang việc khác.',
      minh: 'Ngồi lại tách *việc hỏng* khỏi *người làm*, rồi giao lại đúng việc ấy trong 14 ngày. Thất bại chưa được làm lại thì chỉ là thất bại.',
      do: 'Tỉ lệ việc hỏng được giao lại trong 14 ngày' },
    { so: '05', t: 'Lần đầu con nói “con không muốn đi nữa”',
      thuong: 'Phụ huynh ép, hoặc trung tâm gọi thuyết phục phụ huynh.',
      minh: 'Coach nói chuyện với *con*, không qua phụ huynh. Tìm lý do thật trong sáu lý do đã biết, rồi sửa đúng lý do đó.',
      do: 'Số ca gọi con trước khi gọi phụ huynh' },
    { so: '06', t: 'Lần đầu phụ huynh phàn nàn',
      thuong: 'Giải thích, biện hộ, đổ cho hiểu lầm.',
      minh: 'Năm phút đầu không giải thích một câu nào. Nhận trách nhiệm bằng tên người cụ thể, không bằng “hệ thống có sai sót”.',
      do: 'Ghi âm/biên bản — đếm số câu giải thích trong 5 phút đầu' },
    { so: '07', t: 'Ngày con lên bậc',
      thuong: 'Phát bằng cuối buổi, ai nấy ra về.',
      minh: 'Nghi thức có mặt phụ huynh. Người trao là người đã kèm con, không phải người có chức vụ cao nhất.',
      do: 'Tỉ lệ buổi lên bậc có phụ huynh dự' },
    { so: '08', t: 'Con vắng không báo',
      thuong: 'Tin nhắn tự động điểm danh.',
      minh: 'Coach gọi trong 24 giờ, hỏi con có ổn không — hỏi sức khoẻ trước, hỏi lý do sau.',
      do: 'Giờ giữa buổi vắng và cuộc gọi · nội dung câu hỏi đầu tiên' },
    { so: '09', t: 'Ngày cả tổ thua một cuộc thi',
      thuong: 'Không nhắc tới nữa.',
      minh: 'Buổi mổ xẻ trong 7 ngày: đội trưởng chủ trì, Coach ngồi dưới. Rút ra một luật mới cho tổ.',
      do: 'Số luật tổ sinh ra từ thất bại, ghi trong sổ ghế' },
    { so: '10', t: 'Lần đầu con giúp được một người ngoài',
      thuong: 'Không ai biết.',
      minh: 'Việc được ghi vào hộ chiếu có chữ ký người nhận. Đây là dòng có giá trị nhất trong cả cuốn.',
      do: 'Số dòng có chữ ký người ngoài trên mỗi hộ chiếu' },
    { so: '11', t: 'Gia đình quyết định dừng',
      thuong: 'Gọi níu kéo, chào giảm giá.',
      minh: 'Không giảm giá để giữ. Trao hộ chiếu bản đầy đủ, thư cảm ơn, và nói rõ cửa luôn mở. Không gọi làm phiền quá hai lần một năm sau đó.',
      do: 'Tỉ lệ gia đình đã dừng vẫn giới thiệu người mới' },
    { so: '12', t: 'Năm năm sau, con quay lại',
      thuong: 'Không có khoảnh khắc này vì không ai giữ liên lạc.',
      minh: 'Hệ chủ động mời về mỗi năm một lần vào lễ tổng kết. Người đã qua B3 dự chi hội miễn phí trọn đời.',
      do: 'Số cựu thành viên dự lễ tổng kết hằng năm' }
  ];

  /* ── 3 · Mười hai cam kết dịch vụ ────────────────────────────
     Hứa ít mà giữ được. Và điều làm nên khác biệt không phải lời
     hứa — mà là thứ đền khi không giữ được, đền TỰ ĐỘNG, không
     đợi gia đình đòi. Người ta nhớ cách mình xử lúc mình sai. */
  G.TN_CAM_KET = [
    { ma: 'K01', hua: 'Trả lời tin nhắn của phụ huynh', do: 'Giờ từ lúc nhận tới lúc trả lời có nội dung',
      nguong: 'Trong 4 giờ làm việc · không quá 12 giờ',
      den: 'Coach gọi trực tiếp xin lỗi, và một buổi kèm riêng cho con — tự động, không cần đòi' },
    { ma: 'K02', hua: 'Thư tuần về con', do: 'Ngày giờ gửi',
      nguong: 'Trước 20 giờ Chủ nhật, mỗi tuần con có học',
      den: 'Trễ hai tuần liên tiếp thì miễn học phí tuần đó' },
    { ma: 'K03', hua: 'Sĩ số lớp', do: 'Điểm danh thực tế',
      nguong: 'Không quá 12 học viên một lớp · không quá 8 với B1',
      den: 'Hoàn phần chênh cho toàn lớp, không đợi ai hỏi' },
    { ma: 'K04', hua: 'Con vắng thì có người gọi', do: 'Giờ giữa buổi vắng và cuộc gọi',
      nguong: 'Trong 24 giờ · người gọi là Coach, không phải tin nhắn tự động',
      den: 'Buổi bù miễn phí' },
    { ma: 'K05', hua: 'Người dạy con đã qua kiểm định', do: 'Hồ sơ K1–K7 và biên bản dự giờ gần nhất',
      nguong: 'Đạt ≥16/20 chuẩn dự giờ trong 90 ngày gần nhất · có lý lịch tư pháp',
      den: 'Đổi Coach ngay trong tuần, và hoàn phí các buổi đã học với người chưa đạt' },
    { ma: 'K06', hua: 'Không so sánh con với con nhà khác', do: 'Rà soát toàn bộ thư tuần và cổng phụ huynh',
      nguong: 'Không một dòng nào xếp hạng giữa các cháu — mọi so sánh là với chính con 90 ngày trước',
      den: 'Cải chính bằng văn bản tới toàn bộ phụ huynh nhận được nội dung đó' },
    { ma: 'K07', hua: 'Bảy ngày thử không rủi ro', do: 'Đơn hoàn phí',
      nguong: 'Hoàn 100% trong tuần thử, không hỏi lý do, xử trong 3 ngày làm việc',
      den: 'Quá 3 ngày thì cộng thêm 10% giá trị hoàn' },
    { ma: 'K08', hua: 'Chín mươi ngày có nhích', do: 'Đối chiếu hộ chiếu đầu và cuối chu kỳ',
      nguong: 'Đi ≥85% buổi và làm đủ việc nhà mà không nhích một mức nào ở bất kỳ trục nào',
      den: 'Học lại nguyên chu kỳ miễn phí, đổi Coach nếu gia đình muốn' },
    { ma: 'K09', hua: 'An toàn khi kèm riêng', do: 'Sổ ca kèm riêng · ảnh bố trí phòng',
      nguong: 'Không bao giờ một người lớn với một trẻ trong phòng kín. Cửa mở hoặc có kính, luôn luôn',
      den: 'Đây là luật đỏ. Vi phạm là chấm dứt hợp đồng lao động, không có mức phạt trung gian' },
    { ma: 'K10', hua: 'Hình ảnh của con', do: 'Sổ đồng thuận hình ảnh',
      nguong: 'Không đăng ảnh con nếu chưa có đồng thuận văn bản. Rút đồng thuận thì gỡ trong 48 giờ',
      den: 'Gỡ ngay, và thư xin lỗi từ người đứng đầu' },
    { ma: 'K11', hua: 'Dữ liệu của con', do: 'Nhật ký truy cập',
      nguong: 'Chỉ Coach đang kèm và quản lý chuyên môn xem được hộ chiếu. Phụ huynh xin bản sao thì có trong 7 ngày',
      den: 'Báo cáo đầy đủ ai đã xem gì, và khoá quyền người vi phạm' },
    { ma: 'K12', hua: 'Phàn nàn không rơi vào im lặng', do: 'Sổ phàn nàn công khai trong nội bộ',
      nguong: 'Mọi phàn nàn được ghi, có người chịu trách nhiệm, và được đọc lại trong họp tháng',
      den: 'Phàn nàn nào quá 14 ngày chưa xử thì tự động đưa lên giám đốc điều hành' }
  ];

  /* ── 4 · Cổng phụ huynh ──────────────────────────────────── */
  G.TN_CONG_PH = [
    { t: 'Bảng “con hôm nay”', n: 'Ba dòng sau mỗi buổi: làm được gì · vướng gì · nhà giúp gì.', vi: 'Gửi trong 2 giờ sau buổi. Ba dòng, không dài hơn — dài hơn thì không ai đọc.' },
    { t: 'Thư tuần', n: 'Một trang: bằng chứng tuần này, trục đang tập trung, việc tuần tới.', vi: 'Trước 20 giờ Chủ nhật. Có tên con trong mọi câu, không có câu chung chung.' },
    { t: 'Hộ chiếu số', n: 'Toàn bộ mức từng trục, mọi bằng chứng, mọi chữ ký người ngoài.', vi: 'Phụ huynh xem được mọi lúc. Không có phần nào bị giấu.' },
    { t: 'Video 45 giây', n: 'Con tự nói về việc con làm, mỗi tháng một lần.', vi: 'Con quay, không phải người lớn quay con. Giọng con là bằng chứng mạnh nhất.' },
    { t: 'Bảng đối chiếu 90 ngày', n: 'So con với chính con ba tháng trước, từng trục một.', vi: 'Đây là màn hình quan trọng nhất của cả cổng. Không bao giờ có tên cháu khác trên đó.' },
    { t: 'Lịch và hồ sơ an toàn', n: 'Lịch buổi, lịch trại, người trực từng ca và số điện thoại.', vi: 'Trước mỗi hoạt động ngoài cơ sở, hồ sơ phải mở được bằng một lần bấm.' },
    { t: 'Đường dây nói thẳng', n: 'Một số điện thoại tới quản lý chuyên môn, không qua Coach đang kèm.', vi: 'Người bị phàn nàn không được là người nhận phàn nàn. Đây là lý do đường này tồn tại.' }
  ];

  G.TN_LUAT_PH = [
    'Không bao giờ xếp hạng con với con của gia đình khác — *mọi so sánh là so với chính con 90 ngày trước*.',
    'Không gửi lời khen chung chung. Mỗi câu khen phải kèm một việc cụ thể và một ngày cụ thể.',
    'Không báo tin xấu bằng tin nhắn. Tin xấu thì gọi, và gọi trước khi phụ huynh nghe từ nguồn khác.',
    'Không nhắn tin riêng với học viên dưới 16 tuổi ngoài nhóm có phụ huynh.',
    'Phụ huynh có quyền xin bản sao toàn bộ dữ liệu của con, và có quyền yêu cầu xoá khi rời hệ.',
    'Thứ gì Coach không dám cho phụ huynh đọc thì không được ghi vào hồ sơ.'
  ];

  /* ── 5 · Mười bốn hiện vật ───────────────────────────────────
     Vật cầm được. Giá vốn mỗi thứ vài chục nghìn; giá trị cảm xúc
     gấp trăm lần — nhưng chỉ khi trao đúng cách. Phát hàng loạt
     cuối buổi là cách chắc chắn nhất để giết một hiện vật. */
  G.TN_HIEN_VAT = [
    { t: 'Hộ chiếu nhân tài', khi: 'Lễ nhập hệ', ai: 'Coach kèm trực tiếp', cach: 'Trao hai tay trước mặt cả tổ, con tự đọc lời cam kết trang đầu', vi: 'Cuốn sổ này đi theo con tới 2056. Mọi thứ khác có thể thay, cuốn này không.' },
    { t: 'Huy hiệu bậc', khi: 'Mỗi lần qua cổng nghiệm thu', ai: 'Người đã kèm con, không phải người chức vụ cao nhất', cach: 'Gài lên áo con, không đưa vào tay', vi: 'Kim loại, không phải nhựa. Thứ nặng tay thì được giữ lại.' },
    { t: 'Thẻ chi hội', khi: 'Ngày vào vòng V1', ai: 'Đội trưởng chi hội', cach: 'Con ký tên vào sổ chi hội rồi mới nhận thẻ', vi: 'Có số hiệu chi hội và số thứ tự thành viên. Số nhỏ là niềm tự hào.' },
    { t: 'Sổ tay 90 ngày', khi: 'Đầu mỗi chu kỳ', ai: 'Coach', cach: 'Trang đầu Coach viết tay một câu riêng cho con', vi: 'Câu viết tay ấy là thứ được đọc lại nhiều nhất trong cả cuốn sổ.' },
    { t: 'Thư tay của Coach', khi: 'Đêm cuối trại · cuối năm', ai: 'Coach', cach: 'Viết tay, phong bì dán, con mở lúc về nhà', vi: 'Tuyệt đối không in. Chữ xấu vẫn hơn chữ máy.' },
    { t: 'Ảnh chân dung ngày nhập hệ', khi: 'Lễ nhập hệ', ai: 'Ban điều hành', cach: 'Chụp riêng từng cháu, in ngay, ghi ngày ở góc', vi: 'Ba năm sau đặt cạnh ảnh mới là bằng chứng không cãi được.' },
    { t: 'Bằng bậc', khi: 'Lễ tổng kết năm', ai: 'Người đứng đầu học viện', cach: 'Đọc to việc con đã làm trước khi trao — không đọc tên suông', vi: 'Bằng ghi *việc*, không chỉ ghi bậc.' },
    { t: 'Cờ tổ mũi nhọn', khi: 'Khi tổ hoàn thành dự án đầu tiên', ai: 'Cả chi hội', cach: 'Tổ tự may hoặc tự vẽ, hệ không phát sẵn', vi: 'Thứ mình tự làm thì mình giữ. Thứ được phát thì để đâu quên đó.' },
    { t: 'Con dấu chi hội', khi: 'Khi chi hội đủ điều kiện độc lập', ai: 'Học viện', cach: 'Bàn giao có biên bản', vi: 'Dấu đóng lên hộ chiếu thành viên. Chi hội có dấu là chi hội có danh dự để giữ.' },
    { t: 'Hộp kỷ vật một năm', khi: 'Lễ tổng kết năm', ai: 'Coach và phụ huynh cùng trao', cach: 'Đóng hộp trước mặt con, kể lại từng thứ trong hộp', vi: 'Mọi bằng chứng con tạo ra trong năm, kể cả thứ hỏng. Cái hỏng cũng vào hộp.' },
    { t: 'Sách Gen Việt bản bỏ túi', khi: 'Khi con qua B2', ai: 'Coach', cach: 'Giao kèm một chân dung được đánh dấu sẵn — chân dung hợp với con', vi: 'Không phát cả bộ. Phát một quyển, đánh dấu một trang.' },
    { t: 'Vòng tay năm phẩm chất', khi: 'Sau trại', ai: 'Bạn cùng tổ, không phải người lớn', cach: 'Các bạn trong tổ tự trao cho nhau, nói lý do', vi: 'Được bạn công nhận nặng hơn được thầy công nhận.' },
    { t: 'Phiếu “tôi đã giúp”', khi: 'Bất cứ lúc nào con giúp được người ngoài', ai: 'Người được giúp ký', cach: 'Con tự xin chữ ký — không ai xin hộ', vi: 'Việc xin chữ ký chính là bài rèn. Phiếu chỉ là cái cớ.' },
    { t: 'Thẻ cảm ơn để con gửi đi', khi: 'Phát đầu mỗi chu kỳ, mười thẻ', ai: 'Con tự dùng', cach: 'Con viết và gửi cho ai con muốn cảm ơn, trong hoặc ngoài hệ', vi: 'Hệ đếm số thẻ *đã gửi*, không đếm số thẻ đã phát.' }
  ];

  /* ── 6 · Phục hồi dịch vụ ────────────────────────────────────
     Nghịch lý ai làm dịch vụ cũng biết mà ít ai dám sống theo:
     gia đình từng phàn nàn và được xử tử tế trung thành hơn gia
     đình chưa bao giờ phàn nàn. Phàn nàn là quà, với điều kiện
     mình xử nó như quà. */
  G.TN_PHUC_HOI = [
    { b: '1', t: 'Nghe hết, không ngắt', ai: 'Người nhận phàn nàn', n: 'Năm phút đầu không giải thích một câu nào. Không “nhưng”, không “thực ra”, không “chắc là hiểu lầm”.', ra: 'Người phàn nàn nói hết được điều họ muốn nói' },
    { b: '2', t: 'Nhận trách nhiệm bằng tên cụ thể', ai: 'Quản lý chuyên môn', n: 'Không nói “hệ thống có sai sót”. Nói “buổi thứ tư anh Nam đã không gọi lại cho chị, đó là lỗi của anh Nam và của tôi vì tôi không kiểm.”', ra: 'Một câu nhận lỗi có tên người, không có bị động cách' },
    { b: '3', t: 'Sửa trong 48 giờ và nói rõ sửa gì', ai: 'Người chịu trách nhiệm được nêu tên', n: 'Không hứa “sẽ rút kinh nghiệm”. Nói việc cụ thể, ngày cụ thể, và ai kiểm.', ra: 'Tin nhắn báo đã sửa xong, kèm bằng chứng' },
    { b: '4', t: 'Bù đắp vượt mong đợi', ai: 'Giám đốc điều hành duyệt', n: 'Bù nhiều hơn mức gia đình mất. Bù ít hơn thì thà đừng bù — nó nhắc lại vết thương mà không chữa được.', ra: 'Thứ bù được trao, không phải được hứa' },
    { b: '5', t: 'Quay lại sau 14 ngày', ai: 'Quản lý chuyên môn', n: 'Gọi hỏi đã ổn chưa. Đây là bước hầu hết nơi khác bỏ, và là bước quyết định gia đình có kể lại chuyện này theo hướng tốt hay xấu.', ra: 'Ghi vào sổ phàn nàn: đã đóng, hoặc mở lại' }
  ];

  G.TN_PHAN_NAN = [
    ['Coach không gọi lại', 'Quản lý chuyên môn', '24 giờ', 'Một buổi kèm riêng miễn phí'],
    ['Con đi về nói không vui', 'Coach kèm + quản lý cùng ngồi', '48 giờ', 'Đổi tổ hoặc đổi Coach nếu gia đình muốn'],
    ['Không thấy con tiến bộ', 'Quản lý chuyên môn', '7 ngày', 'Buổi đọc hộ chiếu cùng phụ huynh, có bằng chứng từng trục'],
    ['Học phí và giá trị không tương xứng', 'Giám đốc điều hành', '7 ngày', 'Bảng chồng giá trị chi tiết; nếu vẫn không thuyết phục thì hoàn phần chưa dùng'],
    ['Con bị bạn trong tổ trêu', 'Coach + đội trưởng chi hội', 'Ngay trong buổi', 'Xử theo luật chi hội, báo lại cả hai gia đình trong 24 giờ'],
    ['Coach nói câu làm con tổn thương', 'Quản lý chuyên môn, KHÔNG phải Coach ấy', '24 giờ', 'Coach xin lỗi trực tiếp con; ghi vào hồ sơ nghề; dự giờ bắt buộc 4 tuần'],
    ['Lộ thông tin hoặc hình ảnh của con', 'Giám đốc điều hành + admin hệ thống', '48 giờ', 'Gỡ, báo cáo ai đã xem gì, thư xin lỗi của người đứng đầu'],
    ['Nghi ngờ mất an toàn thân thể', 'Giám đốc điều hành, báo ngay', 'Tức thì', 'Đình chỉ người liên quan trong lúc điều tra — đình chỉ trước, điều tra sau']
  ];

  G.TN_LUAT_PN = [
    '*Người bị phàn nàn không được là người xử lý phàn nàn.* Đây là luật, không phải khuyến nghị.',
    'Mọi phàn nàn được ghi vào sổ, kể cả phàn nàn nói miệng ngoài hành lang.',
    'Sổ phàn nàn được đọc trong họp tháng. Tháng nào không có phàn nàn nào là tháng đáng nghi, không phải tháng tốt.',
    'Phàn nàn quá 14 ngày chưa đóng thì tự động lên giám đốc điều hành.',
    'Không bao giờ tranh cãi ai đúng ai sai trong 5 phút đầu. Ai đúng là việc tính sau.',
    'Bù ít hơn mức mất thì thà đừng bù.'
  ];

  /* ── 7 · Khi con muốn nghỉ ───────────────────────────────────
     Lý do được nói gần như không bao giờ là lý do thật. */
  G.TN_NGHI = [
    { t: '“Con bận học quá”', mau: '#185AB4',
      dh: 'Con không thấy mình giỏi lên. Bận là cái cớ dễ được người lớn chấp nhận nhất.',
      can: 'Hỏi con: “Việc gần nhất em thấy mình làm tốt ở đây là việc gì?” Không kể ra được trong 10 giây thì đúng là lý do này.',
      lam: 'Dồn toàn bộ vào một trục duy nhất trong 30 ngày cho tới khi có một thắng lợi nhìn thấy được. Bỏ hết phần còn lại.',
      bay: 'Đừng giảm buổi. Giảm buổi làm con càng xa, càng không thấy mình giỏi lên.' },
    { t: '“Con không hợp với các bạn”', mau: '#5140B4',
      dh: 'Con không có một người bạn thân trong tổ. Cô đơn trong đám đông là lý do rời đi phổ biến nhất ở tuổi 11–14.',
      can: 'Hỏi: “Nếu hôm nay em không đến, ai sẽ hỏi em đâu?” Không có tên nào là đúng lý do này.',
      lam: 'Ghép cặp: giao con một việc phải làm chung với đúng một bạn trong 4 tuần. Không giao việc nhóm đông.',
      bay: 'Đừng đổi tổ ngay. Đổi tổ khi chưa có bạn thì tổ mới cũng vậy.' },
    { t: '“Con thấy chán”', mau: '#0B6675',
      dh: 'Nội dung dưới ngưỡng của con. Con đã ở mức 3 mà lớp đang dạy mức 2.',
      can: 'Đối chiếu hộ chiếu với nội dung đang dạy. Lệch một mức trở lên là đúng.',
      lam: 'Giao ghế hoặc giao kèm một em nhỏ hơn. Người chán vì dễ thì chữa bằng trách nhiệm, không chữa bằng trò chơi.',
      bay: 'Đừng thêm hoạt động vui. Vui thêm thì chán chậm hơn, không hết chán.' },
    { t: '“Bố mẹ con bảo nghỉ”', mau: '#0B7350',
      dh: 'Phụ huynh không thấy bằng chứng. Thường là người không đưa đón — người ở xa cuộc chơi.',
      can: 'Hỏi ai trong nhà là người quyết. Nếu người quyết chưa từng dự buổi nào thì đúng.',
      lam: 'Mời đúng người ấy dự một buổi báo công của con. Không mời họp phụ huynh — mời xem con nói.',
      bay: 'Đừng thuyết phục qua người đưa đón. Người đưa đón đã tin rồi.' },
    { t: '“Nhà con khó khăn”', mau: '#A8801F',
      dh: 'Có thể là thật, có thể là cách nói lịch sự cho “không đáng tiền”.',
      can: 'Hỏi thẳng và tử tế: “Nếu học phí không phải vấn đề thì anh chị có cho cháu đi tiếp không?” Câu trả lời phân biệt hai trường hợp.',
      lam: 'Thật sự khó khăn → quỹ học bổng, có quy trình, không phải giảm giá riêng lẻ. Không đáng tiền → đây là ca của bảng chồng giá trị và bảo đảm 90 ngày.',
      bay: '*Không bao giờ giữ người bằng giảm giá.* Giảm giá để giữ là tự thừa nhận giá trị không đủ — và người ở lại vì giá rẻ sẽ đi khi có chỗ rẻ hơn.' },
    { t: 'Không nói gì, chỉ vắng dần', mau: '#BE0E16',
      dh: 'Nguy nhất trong sáu loại. Vắng dần là đã quyết rồi, chỉ chưa tiện nói.',
      can: 'Ba buổi vắng trong bốn tuần là báo động đỏ, không đợi tới buổi thứ tư.',
      lam: 'Gọi cho *con* trước, không gọi phụ huynh. Hỏi đúng một câu: “Chỗ nào ở đây làm em thấy khó chịu nhất?” rồi im lặng chờ.',
      bay: 'Đừng nhắn tin. Vắng dần thì tin nhắn không được đọc.' }
  ];

  G.TN_RA_DI = [
    'Gia đình rời hệ được trao *hộ chiếu bản đầy đủ* — mọi bằng chứng con đã tạo ra, đóng dấu, không giữ lại gì.',
    'Một thư cảm ơn có tên con và một việc cụ thể con đã làm được. Không phải thư mẫu.',
    'Nói rõ: quay lại lúc nào cũng được, giữ nguyên bậc đã đạt, không phải học lại từ đầu.',
    'Không gọi làm phiền quá hai lần một năm sau đó. Một lần mời lễ tổng kết, một lần chúc Tết.',
    'Hỏi *một câu duy nhất* trước khi chia tay: “Nếu được sửa một thứ ở đây, anh chị sửa gì?” — và ghi nguyên văn vào sổ.',
    'Người đã qua B3 giữ quyền dự chi hội miễn phí trọn đời, kể cả khi đã rời hệ.'
  ];

  /* ── 8 · Đo cảm nhận ─────────────────────────────────────────
     Không đo bằng câu “anh chị hài lòng chứ ạ”. Câu ấy chỉ đo
     được mức lịch sự của người được hỏi. */
  G.TN_DO_CAM = [
    { mau: '#0B7350', b: 'Chỉ số tiến cử', n: 'Hai câu, hai lần một năm: “0–10, anh chị giới thiệu chỗ này cho bạn thân chứ?” và “Vì sao lại là số đó?”',
      lam: 'Dưới 40 điểm thuần thì dừng mọi hoạt động tuyển sinh mới cho tới khi sửa xong', cham: '2 lần/năm · tháng 6 và tháng 12' },
    { mau: '#185AB4', b: 'Câu hỏi hỏi con', n: 'Hỏi trẻ, không hỏi phụ huynh: “Tuần này ở đây có việc gì em kể lại cho bố mẹ không?”',
      lam: 'Ba tuần liền không kể được việc gì thì hệ đang nhạt với con đó — vào quy trình cứu ngay', cham: 'Hằng tuần, hỏi ngẫu nhiên 5 cháu' },
    { mau: '#5140B4', b: 'Chỉ số kể lại', n: 'Bao nhiêu phần trăm phụ huynh kể được *cụ thể* một việc con làm tuần qua, không cần nhắc',
      lam: 'Dưới 50% thì thư tuần đang viết sai — viết chung chung, không có tên và ngày', cham: 'Hằng tháng, hỏi 10 gia đình' },
    { mau: '#0B6675', b: 'Chỉ số tự đến', n: 'Bao nhiêu phần trăm buổi con tự chuẩn bị đồ và tự nhắc giờ, không cần người lớn nhắc',
      lam: 'Dưới 60% ở B2 trở lên là dấu hiệu con đang đi vì bố mẹ, không đi vì mình', cham: 'Hằng tháng, phụ huynh tự ghi' },
    { mau: '#A8801F', b: 'Tỉ lệ đại sứ tự nhiên', n: 'Bao nhiêu phần trăm gia đình giới thiệu ít nhất một người trong 12 tháng, không có thưởng gì',
      lam: 'Dưới 25% thì đừng tăng quảng cáo — chất lượng chưa đủ để người ta đem tên mình ra bảo lãnh', cham: 'Hằng quý' },
    { mau: '#BE0E16', b: 'Tỉ lệ rời hệ trong im lặng', n: 'Bao nhiêu phần trăm gia đình dừng mà chưa từng phàn nàn câu nào',
      lam: 'Trên 60% là hệ đang không có kênh nói thẳng — người ta không phàn nàn vì không tin phàn nàn có tác dụng', cham: 'Hằng quý' }
  ];

})(window.GV = window.GV || {});
