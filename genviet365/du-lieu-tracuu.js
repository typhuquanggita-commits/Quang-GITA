/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · TRA CỨU
   Hai mươi nhóm và hơn một trăm ba mươi màn thì không ai đọc hết
   theo thứ tự. Nhóm này là bộ máy tra: từ điển thuật ngữ có bản
   tiếng Anh cho hồ sơ quốc tế, chỉ mục sinh tự động từ chính kho,
   Sổ Chuẩn ghi mọi lần đổi chuẩn, và bản đồ toàn hệ kèm đường đọc
   riêng cho từng vai.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ── 1 · Từ điển thuật ngữ ───────────────────────────────────
     Cột tiếng Anh KHÔNG phải bản dịch marketing. Nó là bản giải
     nghĩa để dùng trong hồ sơ quốc tế và khi làm việc với đối tác
     nước ngoài. Tên riêng của hệ thì giữ nguyên tiếng Việt. */
  G.TC_TU_DIEN = [
    { n: 'A', ds: [
      ['Ấn Gen Việt', 'Dấu hiệu của hệ: khung vuông kiểu ấn triện, nét trái liền là bảy nguyên lý, sáu chấm có quãng là sáu bậc.', 'Gen Viet Seal *(giữ nguyên tên)*', 'Nhóm 17'],
      ['Assessor', 'Người chấm cổng nghiệm thu. Bắt buộc không phải người kèm em ấy.', 'Assessor · independent examiner', 'Nhóm 07']
    ]},
    { n: 'B', ds: [
      ['Bậc (B1–B6)', 'Sáu chặng trưởng thành: Hạt · Mầm · Thân · Trụ · Người dẫn · Kiến trúc sư. Lên bậc bằng bằng chứng, không bằng thời gian.', 'Tier · developmental stage', 'Nhóm 01'],
      ['Bản đọc ca', 'Bản một trang gia đình cầm về sau buổi tư vấn đầu, dù không mua gì.', 'One-page case read', 'Nhóm 19'],
      ['Bản đồ cá nhân 11 ô', 'Bản tự hoạ của học viên bậc 1, viết lại mỗi 90 ngày, giữ cả bản cũ.', 'Eleven-box self map', 'Nhóm 19'],
      ['Bản cắt', 'Bản phát hành chỉ đóng gói phần nội dung một vai có quyền; kho gốc không nằm trong tệp.', 'Scoped build', 'Nhóm 11'],
      ['Băng màu', 'Bốn mức tình trạng ngay lúc này: XANH · VÀNG · CAM · ĐỎ.', 'Status band', 'Nhóm 07'],
      ['Bảng số bảy cột', 'Bảng ghi của chi hội mỗi tuần: C · Đ · T · G · K · B · P.', 'Seven-column weekly scoreboard', 'Nhóm 04']
    ]},
    { n: 'C', ds: [
      ['Cầm tay', 'Nhóm 19 — phần giao ra thứ dùng được ngay, khác với phần mô tả hệ thống.', 'Ready-to-use kit', 'Nhóm 19'],
      ['Cam kết dịch vụ', 'Mười hai lời hứa có ngưỡng đo được và có mức đền khi không giữ được.', 'Service commitments with remedies', 'Nhóm 14'],
      ['Chi hội', 'Đơn vị sinh hoạt hằng tuần, mượn khung chiều sâu của mô hình BNI. Có ban điều hành, có nhiệm kỳ, có con dấu.', 'Chapter *(giữ nguyên “chi hội” trong tài liệu chính thức)*', 'Nhóm 04'],
      ['Cổng nghiệm thu', 'Bài kiểm 100 điểm sáu cột cuối mỗi chu kỳ 90 ngày, ngưỡng đạt 85.', 'Advancement gate', 'Nhóm 07'],
      ['Chu kỳ 90 ngày', 'Đơn vị thời gian cơ bản của việc rèn. Bốn chu kỳ là một năm.', 'Ninety-day cycle', 'Nhóm 02']
    ]},
    { n: 'G', ds: [
      ['G–I–T–A', 'Bốn trụ: Goal · Inspirits · Talent · Action & Academy. Mỗi trụ ba trục, tổng mười hai.', 'The four pillars', 'Nhóm 01'],
      ['Ghế', 'Vị trí trong ban điều hành chi hội, có nhiệm kỳ sáu tháng và có sổ bàn giao.', 'Board seat', 'Nhóm 04'],
      ['Goal Map', 'Bản kế hoạch 90 ngày do chính học viên viết. Người lớn hỏi được, không cầm bút.', 'Goal Map *(giữ nguyên)*', 'Nhóm 19']
    ]},
    { n: 'H', ds: [
      ['Hộ chiếu nhân tài', 'Hồ sơ năng lực mười hai trục đi theo một người ba mươi năm. **Thuộc về người ấy, không thuộc về học viện.**', 'Talent Passport', 'Nhóm 01'],
      ['Hội đồng Chuẩn', 'Cơ quan duy nhất được đổi bảy nguyên lý ở lớp L0, và mỗi lần đổi phải ghi lý do vào Sổ Chuẩn.', 'Standards Council', 'Nhóm 20']
    ]},
    { n: 'L', ds: [
      ['Lớp L0–L6', 'Bảy lớp kiến trúc xếp theo tốc độ đổi. L0 đổi chậm nhất, L6 nhanh nhất.', 'Architecture layers by rate of change', 'Nhóm 01'],
      ['Lõi bất biến', 'Bảy thứ không bên nhượng quyền hay đối tác nào được sửa.', 'Immutable core', 'Nhóm 15']
    ]},
    { n: 'M', ds: [
      ['M1 – M4', 'Bốn môi trường thực tiễn: lớp học · hoạt động trường · gia đình · xã hội.', 'The four practice environments', 'Nhóm 05'],
      ['Mô thức Việt', 'Mười hai lối nghĩ rút ra từ 45 chân dung trong Thư viện. Đứng trên 100 chiến lược: mô thức chọn hướng, chiến lược để đi.', 'Vietnamese thinking patterns', 'Nhóm 13'],
      ['Mũi nhọn', 'Tài năng nổi trội được xác định ở bậc 3 và luyện sâu từ đó.', 'Spearhead talent', 'Nhóm 01'],
      ['Mức hỗ trợ 0–5', 'Lượng giúp đỡ một người còn cần. **Đường cong giảm dần của nó là chỉ số quan trọng nhất của hệ.**', 'Support level', 'Nhóm 03']
    ]},
    { n: 'N', ds: [
      ['Nhịp 365', 'Đồng hồ của hệ: bảy chu kỳ lồng nhau từ ngày tới năm.', 'The 365 rhythm', 'Nhóm 02'],
      ['Nghiệm thu', 'Xác nhận bằng chứng đủ để lên bậc. Người nghiệm thu khác người kèm, luôn luôn.', 'Assessment', 'Nhóm 07']
    ]},
    { n: 'P', ds: [
      ['Phẩm chất', 'Năm phẩm chất Gen Việt: Đức · Dũng · Trí · Chủ · Chí. Ánh xạ được sang năm phẩm chất Chương trình GDPT 2018.', 'Character qualities', 'Nhóm 01'],
      ['Phục hồi', 'Trục I6 — đo bằng *thời gian quay lại sau vấp*, không đo bằng số lần vấp.', 'Recovery', 'Nhóm 01']
    ]},
    { n: 'S', ds: [
      ['Sổ Chuẩn', 'Sổ ghi mọi lần đổi chuẩn: đổi gì, vì sao, ai duyệt, ngày nào. Không xoá dòng nào.', 'Standards register', 'Nhóm 20'],
      ['Sổ ghi lỗi công khai', 'Sổ ghi cái sai của chính hệ, đọc trong họp tháng và trong ngoại kiểm.', 'Public error log', 'Nhóm 16'],
      ['Sổ phục hồi', 'Sổ riêng của học viên, ghi mỗi lần vấp. **Người lớn không đọc trừ khi con cho đọc.**', 'Recovery journal', 'Nhóm 19']
    ]},
    { n: 'T', ds: [
      ['Tầng hiển thị', 'Mười ba mức phân quyền nội dung. Bậc càng nhỏ càng nhiều quyền.', 'Visibility tier', 'Nhóm 11'],
      ['Theo dõi dọc', 'Đo lại cùng một khoá ở sáu mốc trong ba mươi năm, khép vòng 2056.', 'Longitudinal follow-up', 'Nhóm 16'],
      ['Thư viện Gen Việt', 'Bộ sách sáu quyển, 45 chân dung người Việt xuất sắc, 12 mô thức tư duy.', 'The Gen Viet Library', 'Nhóm 13'],
      ['Tổ mũi nhọn', 'Nhóm nhỏ theo lĩnh vực trong chi hội, nơi mũi nhọn được mài.', 'Spearhead squad', 'Nhóm 04'],
      ['Trục (12 trục)', 'Mười hai chiều đo năng lực, mỗi chiều năm mức. Ánh xạ được sang năng lực Chương trình GDPT 2018.', 'Competency axes', 'Nhóm 01']
    ]},
    { n: 'V', ds: [
      ['Vòng V0–V5', 'Sáu mức chiều sâu tham gia chi hội, từ khách mời tới cố vấn.', 'Depth rings', 'Nhóm 04'],
      ['Vùng an toàn', 'Khoảng trống bắt buộc quanh dấu hiệu: một phần tư cạnh khung.', 'Clear space', 'Nhóm 17']
    ]}
  ];

  G.TC_TU_LUAT = [
    'Tên riêng của hệ **không dịch**: hộ chiếu nhân tài, chi hội, Ấn Gen Việt, Thư viện Gen Việt. Giữ nguyên và kèm một dòng giải nghĩa.',
    'Cột tiếng Anh là bản **giải nghĩa cho hồ sơ**, không phải tên thương hiệu. Không dùng nó làm tên sản phẩm ở thị trường nước ngoài trước khi tra cứu nhãn hiệu.',
    'Khi làm việc với nhà trường và cơ quan quản lý thì dùng **ngôn ngữ chuẩn quốc gia** — xem bảng ánh xạ ở nhóm 18, không dùng thuật ngữ riêng.',
    'Thuật ngữ mới chỉ được đưa vào từ điển sau khi đã dùng ổn định ba tháng. Đặt tên rồi bỏ là cách nhanh nhất làm loãng ngôn ngữ chung.',
    'Một khái niệm — một tên. Thấy hai tên cho cùng một thứ thì chọn một và sửa hết, không để song song.'
  ];

  /* ── 2 · Sổ Chuẩn ────────────────────────────────────────────
     Được nhắc tám lần khắp hệ mà chưa từng được định nghĩa. Đây là
     món nợ thứ chín, và là món quan trọng nhất: không có sổ này
     thì bảy nguyên lý bất biến chỉ bất biến trên lời nói. */
  G.TC_SO_CHUAN_LA = [
    { t: 'Sổ Chuẩn là gì', n: 'Sổ ghi **mọi lần chuẩn của hệ bị đổi**: đổi gì, vì sao, ai đề nghị, ai duyệt, ngày nào, và điều gì đã được thử trước khi quyết.',
      vi: 'Không phải nhật ký công việc. Chỉ ghi những thứ thuộc lớp L0 và L1 — nguyên lý, hộ chiếu, cổng nghiệm thu, luật an toàn, lõi bất biến.' },
    { t: 'Ai được ghi', n: 'Chỉ Hội đồng Chuẩn. Một dòng vào sổ cần **hai chữ ký**: người đề nghị và người duyệt, và hai người ấy không được là một.',
      vi: 'Người đề nghị có thể là bất kỳ ai trong hệ, kể cả học viên bậc 5 trở lên.' },
    { t: 'Không xoá dòng nào', n: 'Sổ chỉ thêm, không sửa, không xoá. Đổi lại một quyết định cũ thì ghi **dòng mới** trỏ về dòng cũ.',
      vi: 'Lịch sử của một chuẩn quan trọng ngang chính chuẩn ấy. Ba mươi năm sau, người ta cần biết vì sao chứ không chỉ biết là gì.' },
    { t: 'Điều bắt buộc phải có', n: 'Mục *“đã thử gì trước khi quyết”*. Không có mục này thì không được ghi vào sổ.',
      vi: 'Đây là hàng rào chống việc đổi chuẩn theo cảm giác. Chán không phải là lý do; số liệu mới là lý do.' },
    { t: 'Đọc khi nào', n: 'Đọc lại toàn bộ sổ mỗi năm một lần, trong buổi ngoại kiểm. Và đọc bắt buộc trước mỗi lần đề nghị đổi chuẩn mới.',
      vi: 'Phần lớn đề nghị đổi chuẩn là đề nghị đã từng bị bác. Đọc sổ trước thì tiết kiệm được một cuộc họp.' },
    { t: 'Ai được xem', n: 'Toàn đội ngũ, hội đồng ngoại kiểm, và học viên từ bậc 5. Đối tác và bên nhượng quyền xem bản đầy đủ.',
      vi: 'Bên nhượng quyền phải biết vì sao lõi bất biến là bất biến — biết lý do thì mới giữ được.' }
  ];

  G.TC_SO_CHUAN_COT = [
    ['Số hiệu', 'SC-năm-số thứ tự, ví dụ SC-2026-004', 'Không dùng lại số đã cấp'],
    ['Ngày', 'Ngày duyệt, không phải ngày đề nghị', 'Ghi cả ngày đề nghị ở cột ghi chú'],
    ['Lớp', 'L0 hoặc L1 — chỉ hai lớp này vào sổ', 'Đổi ở L2 trở lên thì ghi biên bản họp thường, không vào sổ'],
    ['Đổi gì', 'Nguyên văn phần cũ và phần mới, đặt cạnh nhau', 'Không tóm tắt. Ghi đủ để đọc lại sau hai mươi năm vẫn hiểu'],
    ['Vì sao', 'Vấn đề gặp phải, có số liệu', '“Để hợp thời” không phải một lý do'],
    ['Đã thử gì trước khi quyết', '**Cột bắt buộc.** Thử ở đâu, bao lâu, kết quả ra sao', 'Không có cột này thì dòng không được ghi'],
    ['Ai đề nghị · ai duyệt', 'Hai tên khác nhau, hai chữ ký', 'Một người không được vừa đề nghị vừa duyệt'],
    ['Trỏ về dòng nào', 'Số hiệu dòng cũ nếu đây là lần đổi lại', 'Để lần theo được cả chuỗi quyết định']
  ];

  G.TC_SO_CHUAN_MAU = [
    ['SC-2026-001', 'L0', 'Chốt bảy nguyên lý bất biến, bản 1.0', 'Khởi lập hệ', 'Kế thừa và rút gọn từ hệ giải pháp GITA 365 đã chạy trên gia đình thật', '—'],
    ['SC-2026-002', 'L1', 'Cấu trúc hộ chiếu: 12 trục × 5 mức, và nguyên tắc hộ chiếu thuộc về học viên', 'Cần một trục dọc xuyên bảy lớp, không mất khi đóng ca', 'Đối chiếu với khung 8 × 8 đã dùng trong kho chuyên môn', '—'],
    ['SC-2026-003', 'L1', 'Ngưỡng đạt cổng nghiệm thu: 85/100', 'Cần một ngưỡng đủ chặt để bằng chứng có nghĩa, đủ rộng để không loại người đang tiến', 'Chấm thử trên hồ sơ mẫu ở ba mức 80 · 85 · 90', '—'],
    ['SC-2026-004', 'L0', 'Bổ sung luật: người chấm không được là người kèm', 'Phát hiện một kỳ nghiệm thu có Coach chấm chính học viên mình kèm', 'Chấm lại toàn bộ 11 hồ sơ bởi người ngoài; lệch trung bình 6 điểm', '—'],
    ['SC-2026-005', 'L1', 'Hai màn cam kết dịch vụ và ba lớp bảo đảm mở tới tầng học viên', 'Một lời hứa mà người được hứa không đọc được thì không phải lời hứa', 'Rà lại toàn bộ bảng phân quyền, không thấy rủi ro lộ dữ liệu nào', '—']
  ];

  /* ── 3 · Bản đồ toàn hệ và đường đọc ─────────────────────── */
  G.TC_BAN_DO = [
    { t: 'Phần LÕI — hệ này là gì', mau: '#185AB4', nhom: 'Nhóm 01 · 02 · 03',
      n: 'Nguyên lý, kiến trúc bảy lớp, hộ chiếu, sáu bậc, khung năng lực, nhịp 365, và kho nghề để đọc một ca.',
      vi: 'Đổi chậm nhất. Đọc một lần rồi quay lại khi cần, không đọc lại hằng tuần.' },
    { t: 'Phần CHẠY — hệ này vận hành thế nào', mau: '#0B6675', nhom: 'Nhóm 04 · 05 · 06 · 07',
      n: 'Chi hội, bốn môi trường, ngôn ngữ và nghi lễ, cách đo và nghiệm thu.',
      vi: 'Phần đọc hằng tuần. Coach và đội trưởng chi hội sống trong bốn nhóm này.' },
    { t: 'Phần NGƯỜI — ai làm gì', mau: '#0B7350', nhom: 'Nhóm 08 · 09 · 11',
      n: 'Đường vào của gia đình, nghề Coach, vai trò, tài chính, an toàn, phân quyền.',
      vi: 'Đọc khi nhận vai mới, và đọc lại mỗi khi hệ có người mới.' },
    { t: 'Phần CẢM — gia đình cảm thấy gì', mau: '#5140B4', nhom: 'Nhóm 14 · 15 · 16',
      n: 'Hành trình 365 ngày, cam kết có mức đền, gói và bảo đảm, bằng chứng và bảo vệ trẻ.',
      vi: 'Phần quyết định gia đình ở lại hay đi. Đọc trước khi làm bất cứ việc gì chạm tới phụ huynh.' },
    { t: 'Phần CHẤT — lấy gì nuôi chí', mau: '#BE0E16', nhom: 'Nhóm 13',
      n: 'Thư viện Gen Việt: sáu quyển, 45 chân dung, 12 mô thức tư duy.',
      vi: 'Dùng hằng tuần trong bảy phút Hạt giống tri thức. Không đọc hết một lần.' },
    { t: 'Phần MẶT — hệ này trông thế nào', mau: '#A8801F', nhom: 'Nhóm 17 · 18',
      n: 'Nhận diện thương hiệu, Ấn Gen Việt, bản quyền, ánh xạ chuẩn quốc gia, lộ trình toàn cầu.',
      vi: 'Đọc khi làm bất cứ thứ gì đi ra ngoài: ấn phẩm, hồ sơ, hợp đồng.' },
    { t: 'Phần TAY — cầm lên dùng được', mau: '#0E1826', nhom: 'Nhóm 19 · 20',
      n: 'Bảy câu hỏi bàn ăn, giáo án từng phút, kịch bản gọi, thư mẫu, ba cuốn sổ, câu hỏi phỏng vấn, bảng chấm chi tiết, từ điển, Sổ Chuẩn.',
      vi: '**Nếu chỉ có mười phút thì đọc nhóm 19.** Đây là phần dùng được sáng mai.' },
    { t: 'Phần ĐI — từ hôm nay tới 2056', mau: '#7A8CA3', nhom: 'Nhóm 10 · 12',
      n: 'Xương sống dữ liệu, chín mươi ngày đầu, năm đầu tiên, sáu chặng ba mươi năm.',
      vi: 'Đọc cuối, nhưng làm đầu tiên.' }
  ];

  G.TC_DUONG_DOC = [
    ['Người mới nghe lần đầu', '01 → 19 → 14', 'Ba mươi phút. Hiểu hệ là gì, thấy thứ dùng được ngay, biết mình sẽ được đối xử thế nào'],
    ['Phụ huynh', '14 → 05 → 07 → 13', 'Cam kết và cổng phụ huynh trước, rồi tới nơi con thật sự được rèn, rồi cách đo, rồi bộ sách'],
    ['Học viên mới', '01 → 04 → 19 → 13', 'Hệ là gì, chi hội của em thế nào, ba cuốn sổ của em, và bộ sách'],
    ['Coach mới', '19 → 03 → 09 → 06 → 07', 'Cầm giáo án và kịch bản trước, rồi mới tới kho nghề. Ngược lại là học lý thuyết trước khi biết đứng lớp'],
    ['Đội trưởng chi hội', '04 → 06 → 07 → 14', 'Kịch bản 90 phút, ngôn ngữ, bảng số, rồi tới khoảnh khắc quyết định'],
    ['Người tư vấn', '08 → 14 → 15 → 19', 'Đường vào, hành trình cảm xúc, gói và phản đối, rồi bản đọc ca và kịch bản gọi'],
    ['Quản lý chuyên môn', '03 → 07 → 09 → 16 → 20', 'Kho nghề, nghiệm thu, đội ngũ, kiểm định, và Sổ Chuẩn'],
    ['Giám đốc điều hành', '12 → 15 → 16 → 18 → 20', 'Lộ trình, kinh tế, bằng chứng, bản quyền, và Sổ Chuẩn'],
    ['Đối tác nhà trường', '05 → 18 → 16 → 15', 'Bốn môi trường, ánh xạ chuẩn quốc gia, bảo vệ trẻ, rồi mới tới mô hình hợp tác'],
    ['Hội đồng thẩm định đề án', '18 → 01 → 16 → 12', 'Ánh xạ chuẩn trước tiên, rồi kiến trúc, rồi bằng chứng tác động, rồi lộ trình']
  ];

})(window.GV = window.GV || {});
