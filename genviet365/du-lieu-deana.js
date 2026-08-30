/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT · BỘ HỒ SƠ ĐỀ ÁN THÀNH LẬP CLB
   Kho này KHÔNG do bản dựng nghĩ ra. Nó rút từ hai tài liệu gốc
   "ƯƠM MẦM GEN VIỆT.docx" (đề án thành lập CLB) và "Bộ Đề Tài
   Nghiên Cứu Ứng Dụng Gen Việt.docx" trong thư mục GEN VIỆT của
   Học viện GITA, đọc ngày 30.08.2026.

   Khoảng trống được lấp: hệ đang có phần "mở chi hội" nói chung
   chung. Kho này là BỘ HỒ SƠ THẬT — đúng thứ tự mục, đúng bảng
   RACI, đúng KPI hai năm, đúng sáu mẫu biểu và đúng dòng chữ ký.

   BA CHỖ ĐÃ SUY RA, KHÔNG CÓ SẴN TRONG NGUỒN — ghi rõ để không
   ai nhầm là nguyên văn:
   · Mã BM-1 → BM-6 ở G.DA_BIEU_MAU là mã tôi đặt, theo đúng thứ
     tự 1→6 mà nguồn đã đánh cho sáu mẫu biểu. Nguồn không đặt mã.
   · Cột "khi nào nộp" ở G.DA_BIEU_MAU suy từ vị trí mẫu biểu
     trong quy trình mà nguồn mô tả, không phải câu chữ của nguồn.
   · G.DA_TAM_LY là bảng 5 của tài liệu nghiên cứu, đưa vào đây vì
     nó là phần cơ sở khoa học mà bộ đề tài hiện có chưa giữ.

   VỀ CĂN CỨ PHÁP LÝ — đọc kỹ trước khi trình:
   Hai tài liệu gốc chỉ nêu ĐÚNG BỐN văn bản, và KHÔNG văn bản nào
   được dẫn kèm điều khoản. Kho này chép đúng bốn văn bản đó và
   không thêm bất kỳ văn bản nào khác. Chỗ nguồn không có số hiệu
   thì ghi thẳng là nguồn không có.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ── 1 · Cấu trúc một bộ đề án — đúng thứ tự mục của nguồn ── */
  G.DA_CAU_TRUC = [
    { m: 'I', t: 'Mục đích thành lập',
      v: [
        'Tạo môi trường giúp học sinh "Định hướng — Rèn luyện — Tỏa sáng tài năng".',
        'Giúp học sinh học kỹ năng sống, kỹ năng lãnh đạo, sáng tạo và làm việc nhóm.',
        'Góp phần nâng cao hình ảnh và chất lượng giáo dục của nhà trường.',
        'Ba dòng. Nguồn không viết dài hơn — và đó là điểm mạnh: hiệu trưởng đọc hết trong mười giây.'
      ]},
    { m: 'II', t: 'Tên gọi — sứ mệnh — tầm nhìn',
      v: [
        'Tên: Club Nhân Tài Việt (Gen Việt Club).',
        'Sứ mệnh: *Ươm Mầm Gen Việt*.',
        'Tầm nhìn: *Gen Việt Thắp Sáng Vươn Mình*.',
        'Giá trị cốt lõi: Rèn Luyện — Hun Đúc — Trưởng Thành — Tài Năng Việt.',
        'Văn hoá Club: Khám Phá — Học Hỏi — Trải Nghiệm — Hoàn Thiện — Tỏa Sáng.',
        'Đơn vị phối hợp ghi ngay trang bìa: Học viện GITA và CLB Văn hoá Nghệ thuật Tài năng trẻ Đoàn Thị Điểm.'
      ]},
    { m: 'III', t: 'Cơ cấu tổ chức và phân công vai trò',
      v: [
        'Sáu bộ phận, mỗi bộ phận ghi rõ ba cột: nhiệm vụ chính — hoạt động cụ thể — kết quả đầu ra.',
        'Kết quả đầu ra phải là con số hoặc hiện vật, không phải tính từ. Xem G.DA_TO_CHUC.',
        'Bảng RACI chín hoạt động, sáu vai. Xem G.DA_RACI.',
        'Bảng mối liên kết phối hợp có cột *tần suất liên hệ* — đây là chỗ Sở đọc kỹ.',
        'Bảng KPI hai năm, tám chỉ tiêu mỗi năm, chia bốn quý. Xem G.DA_KPI.'
      ]},
    { m: 'IV', t: 'Kế hoạch hoạt động 12 tháng',
      v: [
        'Mục tiêu tổng quát gắn với mô hình 5S: Sạch — Sắp xếp — Sẵn sàng — Sáng tạo — Sẻ chia.',
        'Bốn giai đoạn theo quý, mỗi giai đoạn có bảng hoạt động và một khối "chiến lược vận hành".',
        'Bảng giải pháp tối ưu hoá sáu mảng, mỗi mảng ghi kết quả kỳ vọng.',
        'Lộ trình 1–3 năm: 200 học sinh → 400 → 600; 10 dự án → 20 → 40.',
        'Nguồn lực và kinh phí: nhà trường, Học viện GITA, thành viên CLB, doanh nghiệp.',
        'Bảng tiến độ chi tiết 12 tháng — mỗi tháng một hoạt động, một sản phẩm, một đơn vị phụ trách.'
      ]},
    { m: 'V', t: 'Triển khai hoạt động CLB',
      v: [
        'Lễ ra mắt: 60–90 phút, năm vai tổ chức, kịch bản sáu bước, checklist chuẩn bị bốn nhóm.',
        'Sinh hoạt định kỳ: 2 buổi/tháng vào tuần 2 và 4, mỗi buổi 60–75 phút, cấu trúc bốn phần 5–30–25–10 phút.',
        'Lễ kết nạp thành viên chính thức sau 1–2 tháng, ba tiêu chuẩn xét.',
        'Sự kiện toàn trường: Gen Việt Day, Gen Việt Awards, Gen Việt Camp — kế hoạch sáu bước.',
        'Giải trong trường: chu trình năm bước từ công bố thể lệ đến báo cáo tổng kết.',
        'Kết nối liên trường qua GITA — bốn bước.',
        'Kêu gọi tài trợ: quy trình năm bước và ba nguyên tắc minh bạch — đúng mục đích — vinh danh.',
        'Tổng kết và đánh giá hiệu quả: năm tiêu chí, mỗi tiêu chí có phương pháp đo và người phụ trách.'
      ]},
    { m: 'VI', t: 'Lộ trình 90 ngày bứt phá',
      v: [
        '90 ngày chia 12 tuần, bốn giai đoạn: Thức tỉnh (T1–2) — Rèn thói quen (T3–6) — Tư duy và kỹ năng sống (T7–9) — Hành động và lan toả (T10–12).',
        'Bốn trụ cột huấn luyện: thói quen, tư duy phát triển, kỹ năng sống, tinh thần và khát vọng.',
        'Văn hoá 5S bản 90 ngày: Sạch — Sắp xếp — Sẵn sàng — Sâu sắc — Sáng tạo, mỗi chữ có cách đo riêng.',
        'Năm chỉ số đo được sau 90 ngày, từ 90% duy trì 4/5S xuống 60% tiến bộ teamwork.',
        'Ba danh hiệu vinh danh: Tự Lập — Kiên Trì — Truyền Cảm Hứng.'
      ]},
    { m: 'PL', t: 'Phụ lục — bộ mẫu biểu hành chính',
      v: [
        'Sáu mẫu biểu, nguồn đánh số 1 đến 6, đặt giữa mục VI và mục VII.',
        'Nguồn tự gọi đây là "bộ công cụ hành chính 5 sao" — mục đích là chuẩn hoá hồ sơ theo quy định trường học và dễ nhân rộng.',
        'Chi tiết ai ký, nộp cho ai: xem G.DA_BIEU_MAU.'
      ]},
    { m: 'VII', t: 'Cam kết triển khai',
      v: [
        'Tuân thủ quy định của Bộ GD&ĐT, theo Nghị định 79/2017/NĐ-CP.',
        'Có hướng dẫn, giám sát và cố vấn chuyên môn của giáo viên và Học viện GITA.',
        'Đảm bảo an toàn, ý nghĩa, *không thương mại hoá*.',
        'Báo cáo định kỳ minh bạch cho Ban Giám hiệu và đối tác.'
      ]},
    { m: 'VIII', t: 'Đề nghị phê duyệt',
      v: [
        'Đề nghị một: phê duyệt thành lập CLB Nhân Tài Việt — Gen Việt Club.',
        'Đề nghị hai: cho phép triển khai thí điểm năm học 2025–2026.',
        'Đề nghị ba: phối hợp cùng Học viện GITA để đào tạo, huấn luyện và đánh giá định kỳ.',
        'Ba dòng chữ ký khép hồ sơ: người lập đề án · Hiệu trưởng nhà trường · đại diện Học viện GITA.'
      ]}
  ];

  /* ── 2 · Căn cứ pháp lý — chỉ bốn văn bản, đúng như nguồn ─── */
  G.DA_CAN_CU = [
    ['Văn bản', 'Số hiệu như nguồn ghi', 'Nội dung được viện dẫn', 'Dùng để chứng minh điều gì'],
    ['Nghị định của Chính phủ', 'Nghị định 79/2017/NĐ-CP',
      'Nguồn dẫn ở mục VII Cam kết triển khai, không kèm điều khoản: "Tất cả hoạt động tuân thủ quy định của Bộ GD&ĐT, theo Nghị định 79/2017/NĐ-CP".',
      'Chứng minh CLB hoạt động trong hành lang pháp lý, không phải nhóm tự phát.'],
    ['Nghị quyết Trung ương', 'Nghị quyết 29-NQ/TW',
      'Nguồn dẫn ở phần mở đầu bộ đề tài, không kèm điều khoản: đổi mới căn bản giáo dục, phát triển phẩm chất và năng lực.',
      'Chứng minh mô hình CLB đi cùng chủ trương đổi mới giáo dục toàn diện.'],
    ['Nghị quyết Trung ương', 'Nghị quyết 71-NQ/TW (2025)',
      'Nguồn dẫn về đột phá giáo dục, chuyển đổi số, năng lực số, học tập suốt đời. Không kèm điều khoản.',
      'Là căn cứ chính của đề tài GV-R8 — kết nối chính sách vĩ mô với mô hình CLB tại chỗ.'],
    ['Chiến lược ngành', 'Nguồn viết "Chiến lược phát triển giáo dục 2030–2045", không nêu số hiệu',
      'Nguồn dẫn kèm Nghị quyết 71-NQ/TW: giáo dục toàn diện, phát triển phẩm chất — năng lực, chuyển đổi số.',
      'Dùng ở phần ứng dụng của GV-R1 và GV-R8 làm báo cáo minh chứng.'],
    ['Quy định ngành', 'Nguồn viết "quy định của Bộ GD&ĐT", không nêu số hiệu',
      'Đi kèm Nghị định 79/2017/NĐ-CP trong cùng một câu cam kết.',
      'Phải tra và điền số hiệu trước khi trình Sở — để trống là điểm trừ nặng.']
  ];

  /* ── 3 · Cơ cấu tổ chức đề xuất ────────────────────────────
     Sáu bộ phận trong CLB, rồi năm đầu mối phối hợp bên ngoài.
     Dòng phối hợp ghi tần suất liên hệ ở cột cuối, đúng như nguồn. */
  G.DA_TO_CHUC = [
    ['Bộ phận', 'Thành phần theo đề án', 'Nhiệm vụ chính', 'Kết quả đầu ra đo được'],
    ['Cố vấn chuyên môn', 'Đại diện Ban Giám hiệu, chuyên gia Học viện GITA, thành viên CLB Văn hoá Nghệ thuật Tài năng trẻ Đoàn Thị Điểm',
      'Định hướng chiến lược · đảm bảo chất lượng huấn luyện · kết nối mentor · chấm chọn và vinh danh cuối kỳ',
      'Bản kế hoạch được phê duyệt · hồ sơ chuyên môn · 05 mentor mỗi quý · báo cáo tổng kết chất lượng'],
    ['Chủ nhiệm CLB', 'Giáo viên được Ban Giám hiệu phân công trực tiếp phụ trách, có cố vấn GITA và CLB Đoàn Thị Điểm đi cùng',
      'Điều hành sinh hoạt định kỳ · làm cầu nối CLB — Ban Giám hiệu — GITA · huấn luyện kỹ năng · theo dõi và đề xuất vinh danh',
      '12 buổi sinh hoạt mỗi năm · báo cáo tháng và quý · 6 chuyên đề rèn luyện mỗi năm · danh sách đề cử và bảng điểm CLB'],
    ['Phó chủ nhiệm CLB', '1–2 học sinh tiêu biểu được bầu chọn từ CLB',
      'Quản lý thành viên và phân công nhóm trưởng · điều phối sinh hoạt và dẫn chương trình · tổng hợp bảng điểm 5S · lo hậu cần sự kiện',
      'Danh sách nhóm và phân công · 4 buổi sinh hoạt do học sinh chủ trì · bảng tổng hợp kết quả tháng · 2 sự kiện mỗi học kỳ'],
    ['Ban Học Tập — Sáng tạo', 'Học sinh thành viên, có mentor chuyên môn đi kèm',
      'Rèn phương pháp học chủ động · tổ chức cuộc thi và dự án học tập · phát triển sản phẩm sáng tạo cá nhân · mời mentor STEAM',
      '100% thành viên có kế hoạch cá nhân · 10 sản phẩm mỗi năm · bộ sưu tập sản phẩm học tập · 3 buổi mentoring mỗi học kỳ'],
    ['Ban Kỹ Năng — Lãnh đạo', 'Học sinh thành viên, phối hợp GITA Trainer',
      'Huấn luyện kỹ năng mềm · điều phối chương trình 90 ngày · phát triển tinh thần tự lập · mời diễn giả và doanh nhân trẻ',
      '4 workshop mỗi năm · 200 học sinh hoàn thành 90 ngày · 5 dự án nhóm hoàn thiện · 3 buổi talk thực tế mỗi năm'],
    ['Ban Truyền thông — Sự kiện', 'Học sinh thành viên phụ trách hình ảnh và tổ chức',
      'Xây bộ nhận diện · truyền thông trong và ngoài trường · tổ chức sự kiện lớn · hợp tác đối ngoại',
      'Bộ nhận diện Gen Việt Club · 2 bài mỗi tháng và 1 video recap mỗi quý · 3 sự kiện lớn mỗi năm · 5 đơn vị đồng hành'],
    ['Phối hợp · Ban Giám hiệu', 'Nhà trường', 'Cố vấn và phê duyệt kế hoạch', 'Tần suất liên hệ: hàng tháng'],
    ['Phối hợp · GITA Academy', 'Học viện GITA', 'Huấn luyện, cử mentor, cấp tài liệu', 'Tần suất liên hệ: hàng tuần'],
    ['Phối hợp · CLB Đoàn Thị Điểm', 'CLB Văn hoá Nghệ thuật Tài năng trẻ Đoàn Thị Điểm', 'Đồng tổ chức sự kiện và truyền thông', 'Tần suất liên hệ: mỗi học kỳ'],
    ['Phối hợp · Phụ huynh', 'Gia đình thành viên', 'Đồng hành và hỗ trợ học sinh', 'Tần suất liên hệ: hàng ngày'],
    ['Phối hợp · Học sinh thành viên', 'Toàn thể thành viên CLB', 'Thực hiện, phản hồi, sáng tạo', 'Tần suất liên hệ: hằng ngày']
  ];

  /* ── 4 · Bảng RACI — chín hoạt động, sáu vai ────────────────
     R thực hiện · A chịu trách nhiệm cuối · C được tham vấn ·
     I được thông báo. Chép nguyên bảng của đề án. */
  G.DA_RACI = [
    ['Hoạt động / quy trình', 'Cố vấn chuyên môn', 'Chủ nhiệm CLB', 'Phó chủ nhiệm', 'Ban Học Tập', 'Ban Kỹ Năng', 'Ban Truyền thông'],
    ['Xây dựng kế hoạch năm', 'A', 'R', 'C', 'C', 'C', 'I'],
    ['Tổ chức sinh hoạt định kỳ', 'C', 'A/R', 'R', 'C', 'C', 'I'],
    ['Huấn luyện kỹ năng, workshop', 'C', 'A', 'R', 'C', 'R', 'I'],
    ['Dự án học tập — sáng tạo', 'C', 'C', 'R', 'A/R', 'I', 'I'],
    ['Chương trình 90 ngày rèn luyện', 'C', 'A', 'R', 'I', 'R', 'I'],
    ['Quản lý và đánh giá thành viên', 'C', 'A/R', 'R', 'C', 'C', 'I'],
    ['Tổ chức sự kiện lớn (Gen Việt Day, Awards)', 'C', 'A', 'R', 'C', 'C', 'R'],
    ['Báo cáo tổng kết và khen thưởng', 'A', 'R', 'C', 'I', 'I', 'I'],
    ['Truyền thông — đối ngoại', 'C', 'I', 'C', 'I', 'I', 'A/R']
  ];

  /* ── 5 · KPI hai năm ───────────────────────────────────────
     Chủ đề quý năm 1: Khởi động · Rèn luyện · Lan tỏa · Tổng kết.
     Chủ đề quý năm 2: Mở rộng · Chuyên sâu · Hội nhập · Vinh danh.
     Mục tiêu tổng năm 1: 200 thành viên, 10 dự án, 3 sự kiện lớn.
     Mục tiêu tổng năm 2: đạt chuẩn "Mô hình Gen Việt cấp quốc gia". */
  G.DA_KPI = [
    ['Năm', 'Chỉ tiêu KPI', 'Quý I', 'Quý II', 'Quý III', 'Quý IV', 'Đơn vị phụ trách'],
    ['Năm 1', 'Thành viên tham gia CLB', '100 học sinh đăng ký', '150 học sinh duy trì hoạt động', '180 học sinh tham gia dự án', '200 học sinh được ghi nhận', 'Ban Chủ nhiệm + Ban Kỹ năng'],
    ['Năm 1', 'Hoạt động định kỳ CLB', '3 buổi ra mắt — định hướng', '4 buổi rèn luyện kỹ năng', '4 workshop truyền cảm hứng', '3 sự kiện lớn: Day, Awards, Camp', 'Chủ nhiệm CLB + Ban Sự kiện'],
    ['Năm 1', 'Hoàn thành chương trình 90 ngày', '30% học sinh tham gia', '60% học sinh duy trì', '80% học sinh hoàn thành', '90% học sinh nhận chứng nhận', 'Ban Kỹ năng — Lãnh đạo'],
    ['Năm 1', 'Sản phẩm học tập — sáng tạo', '5 ý tưởng học tập mới', '10 dự án nhóm', '15 sản phẩm sáng tạo', '20 sản phẩm được trưng bày', 'Ban Học tập — Sáng tạo'],
    ['Năm 1', 'Văn hoá 5S trong trường', '3 lớp thí điểm', '50% CLB thực hành', '80% duy trì ổn định', '100% học sinh có thói quen 5S', 'Ban Kỹ năng + GITA Mentor'],
    ['Năm 1', 'Truyền thông — lan toả hình ảnh', '3 bài đăng mỗi quý', '6 bài đăng + 1 video recap', '10 bài đăng mỗi quý', '15 bài đăng + 1 video tổng kết', 'Ban Truyền thông'],
    ['Năm 1', 'Hợp tác — đối ngoại', '2 mentor khách mời', '3 doanh nghiệp đồng hành', '5 mentor + 2 doanh nghiệp mới', '8 đối tác lâu dài', 'Cố vấn chuyên môn + Ban Sự kiện'],
    ['Năm 1', 'Báo cáo và đánh giá CLB', 'Báo cáo khởi động Q1', 'Báo cáo rèn luyện Q2', 'Báo cáo lan toả Q3', 'Báo cáo tổng kết Q4', 'Chủ nhiệm CLB + Cố vấn'],
    ['Năm 2', 'Thành viên CLB toàn trường', '250 học sinh', '300 học sinh', '350 học sinh', '400 học sinh', 'Ban Chủ nhiệm + Ban Giám hiệu'],
    ['Năm 2', 'Dự án sáng tạo — học tập', '10 dự án nhóm', '15 dự án liên ban', '20 dự án cấp trường', '25 dự án lan toả liên trường', 'Ban Học tập — Sáng tạo'],
    ['Năm 2', 'Chương trình 90 ngày phiên bản 2.0', '150 học sinh đăng ký', '200 học sinh rèn luyện', '250 học sinh hoàn thành', '300 học sinh nhận chứng chỉ', 'Ban Kỹ năng + Mentor GITA'],
    ['Năm 2', 'Kỹ năng và tư duy Gen Việt', '3 workshop cấp trường', '4 lớp kỹ năng chuyên sâu', '5 buổi talk với doanh nghiệp', '1 hội thảo Gen Việt Summit', 'Ban Kỹ năng + Cố vấn chuyên môn'],
    ['Năm 2', 'Sự kiện lớn và truyền thông', 'Gen Việt Launch 2.0', 'Gen Việt Camp mùa hè', 'Gen Việt Talent Show', 'Gen Việt Awards toàn trường', 'Ban Truyền thông — Sự kiện'],
    ['Năm 2', 'Hợp tác và đối ngoại', '3 đối tác ngoài trường', '5 mentor và chuyên gia', '8 tổ chức đồng hành', '10 đối tác bền vững', 'Cố vấn chuyên môn + GITA Academy'],
    ['Năm 2', 'Đánh giá và công nhận học sinh', '50 học sinh đạt danh hiệu Gen Việt', '100 học sinh đạt danh hiệu 5S', '150 học sinh đạt thành tích xuất sắc', '200 học sinh ghi danh Sổ vàng Gen Việt', 'Ban Chủ nhiệm + Ban Giám hiệu'],
    ['Năm 2', 'Mạng lưới CLB Gen Việt liên trường', 'Khởi động 2 CLB mới', '5 CLB hoạt động liên kết', '10 CLB trong hệ thống', '15 CLB toàn quốc', 'GITA Academy + CLB đầu mối']
  ];

  /* ── 6 · Kế hoạch 12 tháng — bốn quý ────────────────────────
     Mỗi mốc ghép hoạt động của tháng với sản phẩm đầu ra mà
     bảng tiến độ chi tiết của đề án đòi. */
  G.DA_KE_HOACH_12 = [
    { q: 'QUÝ I', chu: 'KHỞI ĐỘNG', tuan: 'Tháng 1 – 3', mau: '#185AB4',
      moc: [
        { t: 'Tháng 1', v: 'Thành lập và ra mắt Gen Việt Club · công bố Ban chủ nhiệm → 01 lễ ra mắt, 100+ học sinh đăng ký, bộ nhận diện CLB' },
        { t: 'Tháng 2', v: 'Workshop "Khám phá tài năng Việt" · nhận diện năng lực và giá trị cá nhân → 100 bản Hồ sơ Gen Việt cá nhân, 10 câu chuyện tiêu biểu' },
        { t: 'Tháng 3', v: 'Mini Challenge "Tôi là người Gen Việt" · rèn tự tin và kỹ năng trình bày → 20 video ngắn, 5 gương mặt nổi bật' },
        { t: 'Xuyên quý', v: 'Mini challenge "Rèn luyện 21 ngày" — chấm điểm 5S cá nhân hàng ngày → danh sách học sinh đạt chứng nhận 21 ngày' },
        { t: 'Chiến lược', v: 'Hình thành nhóm nòng cốt: Ban chủ nhiệm, Ban kỹ năng, Ban truyền thông. Phối hợp GITA tổ chức *ít nhất 2 workshop mở* để thu hút học sinh' }
      ]},
    { q: 'QUÝ II', chu: 'RÈN LUYỆN VÀ PHÁT TRIỂN', tuan: 'Tháng 4 – 6', mau: '#0B7350',
      moc: [
        { t: 'Tháng 4', v: 'Khoá "Gen Việt Leader" 3 buổi · lãnh đạo, teamwork, quản lý thời gian → 03 buổi huấn luyện, 10 nhóm hoạt động thực tế' },
        { t: 'Tháng 5', v: 'Dự án "Tôi vì cộng đồng" · dự án xã hội nhỏ trong trường lớp → 10 dự án nhỏ hoàn thành, 01 báo cáo tổng hợp' },
        { t: 'Tháng 6', v: 'Cuộc thi "Ý tưởng sáng tạo học đường" → 10 ý tưởng, 3 ý tưởng ươm mầm, *1 ý tưởng triển khai thật*' },
        { t: 'Xuyên quý', v: 'Chuỗi "Gen Việt Skills" — sáu kỹ năng trọng tâm: giao tiếp, lãnh đạo, thuyết trình, teamwork, sáng tạo, cảm xúc → sổ kỹ năng cá nhân' },
        { t: 'Chiến lược', v: 'Phân nhóm mentor hỗ trợ từng kỹ năng. Áp dụng "học qua hành" — mỗi học sinh tạo một sản phẩm thật' }
      ]},
    { q: 'QUÝ III', chu: 'LAN TỎA VÀ GHI NHẬN', tuan: 'Tháng 7 – 9', mau: '#A8801F',
      moc: [
        { t: 'Tháng 7', v: 'Trại hè "Gen Việt Camp" 2–3 ngày · kỹ năng sống, đồng đội, tự lập → 01 trại hè 100 học sinh, 05 nhóm xuất sắc' },
        { t: 'Tháng 8', v: 'Chương trình "Talk — Tour — Task" · kết nối doanh nghiệp, mentor, đại học → 2 chuyến tham quan thực tế, 5 mentor đồng hành' },
        { t: 'Tháng 9', v: 'Ngày hội "Gen Việt Day" · trình diễn sản phẩm và tôn vinh thành viên → 01 sự kiện lớn toàn trường, 10 tiết mục showcase' },
        { t: 'Xuyên quý', v: 'Tham quan học tập gắn lý thuyết với thực tế → báo cáo học tập thực tế; clip "Mentor Gen Việt"' },
        { t: 'Chiến lược', v: 'Hợp tác doanh nghiệp và đại học qua GITA. Lập đội "Truyền thông học sinh" để lan toả câu chuyện Gen Việt' }
      ]},
    { q: 'QUÝ IV', chu: 'TỔNG KẾT VÀ TÔN VINH', tuan: 'Tháng 10 – 12', mau: '#BE0E16',
      moc: [
        { t: 'Tháng 10', v: 'Cuộc thi "Gen Việt Talent Show" · năng khiếu nghệ thuật và sáng tạo → 15 tiết mục trình diễn, 05 giải thưởng' },
        { t: 'Tháng 11', v: 'Toạ đàm "Người Thắp Sáng Gen Việt" · học sinh, phụ huynh, cựu thành viên → 1 buổi giao lưu, 3 bài phát biểu' },
        { t: 'Tháng 12', v: 'Lễ tổng kết và trao giải "Gen Việt Awards" → 20 giải thưởng, 01 Sổ vàng Gen Việt, kế hoạch năm sau' },
        { t: 'Xuyên quý', v: 'Xuất bản "Sổ vàng Gen Việt" · báo cáo tổng kết trình Ban Giám hiệu và GITA → bộ hồ sơ tổng kết năm học' },
        { t: 'Chiến lược', v: 'Tổng hợp dữ liệu KPI, báo cáo bằng hình ảnh, video và minh chứng. Mời phụ huynh, doanh nghiệp, mentor dự lễ trao giải' }
      ]}
  ];

  /* ── 7 · Bộ mẫu biểu hành chính kèm đề án ───────────────────
     Mã BM-1 → BM-6 là mã tôi đặt theo thứ tự 1→6 của nguồn.
     Cột "khi nào nộp" suy từ vị trí mẫu biểu trong quy trình. */
  G.DA_BIEU_MAU = [
    ['Mã', 'Tên biểu mẫu', 'Ai ký', 'Nộp cho ai', 'Khi nào'],
    ['BM-1', 'Biên bản thành lập / sinh hoạt / cuộc họp CLB',
      'Người ghi biên bản ký, Chủ nhiệm CLB ký',
      'Ban Giám hiệu xác nhận',
      'Ngay sau lễ thành lập, và sau mỗi buổi sinh hoạt định kỳ — 2 buổi mỗi tháng'],
    ['BM-2', 'Đơn đăng ký tham gia CLB Gen Việt',
      'Học sinh ký cam kết thực hiện nội quy và văn hoá 5S',
      'Giáo viên phụ trách phê duyệt',
      'Tại lễ ra mắt và các đợt tuyển thành viên; kèm mục tiêu cá nhân 90 ngày đầu'],
    ['BM-3', 'Kế hoạch tổ chức hoạt động CLB',
      'Người lập kế hoạch ký',
      'Ban Giám hiệu phê duyệt',
      'Trước mỗi hoạt động — phải có đủ mục tiêu, chương trình chi tiết, phân công nhân sự, kinh phí dự kiến, sản phẩm đầu ra'],
    ['BM-4', 'Báo cáo đánh giá KPI hàng quý',
      'Người lập báo cáo ký',
      'Chủ nhiệm CLB và Cố vấn chuyên môn phê duyệt',
      'Cuối mỗi quý — ghi mục tiêu đề ra, kết quả thực tế, tỷ lệ hoàn thành phần trăm và đánh giá'],
    ['BM-5', 'Thư ngỏ kêu gọi tài trợ',
      'TM. Ban Chủ nhiệm CLB — Chủ nhiệm CLB ký, ghi rõ điện thoại và email',
      'Đơn vị hoặc cá nhân tài trợ; trình Ban Giám hiệu duyệt trước khi gửi',
      'Bước 1 của quy trình tài trợ năm bước, trước khi trình Ban Giám hiệu ở bước 2'],
    ['BM-6', 'Báo cáo tổng kết hoạt động năm học',
      'Chủ nhiệm CLB và Cố vấn chuyên môn ký',
      'Hiệu trưởng phê duyệt',
      'Cuối năm học, tháng 12 — kèm tổng kết KPI và đề xuất phát triển năm sau']
  ];

  /* ── 8 · Khung thiết kế nghiên cứu và mười đề tài GV-R ──────
     ĐỌC KỸ: nguồn chỉ dựng thiết kế đầy đủ cho BA đề tài —
     GV-R1, GV-R2, GV-R6 (bảng 4 "ba đề tài chủ lực"). Bảy đề tài
     còn lại nguồn chỉ cho tên, mục tiêu và sản phẩm — những thứ
     đã nằm ở GV.TY_KN_DE_TAI. Kho này KHÔNG bịa giả thuyết cho
     bảy đề tài đó; dòng cuối nói thẳng chỗ trống ấy. */
  G.DA_NGHIEN_CUU = [
    ['Mã', 'Giả thuyết / câu hỏi nghiên cứu', 'Biến số', 'Nhóm đối chứng', 'Công cụ đo', 'Thời gian', 'Sản phẩm'],
    ['GV-R1',
      'Câu hỏi: mô hình 15 giai đoạn có giúp học sinh 12–15 phát triển toàn diện Thân–Tâm–Trí–Văn–Thể–Mĩ và kỹ năng thế kỷ 21 không? Giả thuyết: học sinh đi đủ các giai đoạn tiến bộ hơn nhóm không tham gia về kỷ luật, tự tin, kết quả học tập và tham gia xã hội.',
      'Độc lập: mức độ đi trọn 15 giai đoạn. Phụ thuộc: kỷ luật, tự tin, kết quả học tập, mức tham gia xã hội.',
      'Nhóm không tham gia CLB, cùng trường cùng khối. Đo trước và sau.',
      'Rubric 15 giai đoạn · bảng tự đánh giá · phiếu giáo viên · form phụ huynh · hồ sơ CLB · quan sát sự kiện · điểm học.',
      '9–12 tháng, đo trước và sau.',
      'Bộ rubric và Sổ tay Tầm nhìn cá nhân Gen Việt; hồ sơ minh chứng thực hiện Nghị quyết 71-NQ/TW và Chiến lược 2030–2045.'],
    ['GV-R2',
      'Câu hỏi: khi thiết kế đủ bốn yếu tố — thái độ chuẩn, lộ trình rõ, cố vấn, nỗ lực có giám sát — học sinh có cải thiện rõ rệt kỷ luật và kết quả học tập không?',
      'Độc lập: bốn yếu tố, chấm có/không và mức độ. Phụ thuộc: đi học đúng giờ, hoàn thành nhiệm vụ CLB, điểm trung bình, số buổi tự học, hành vi tích cực.',
      'Một nhóm nhận gói bốn yếu tố chuẩn Gen Việt, một nhóm sinh hoạt bình thường. Đây là *thử nghiệm can thiệp*, không chỉ so sánh mô tả.',
      'Thang chấm bốn yếu tố · sổ điểm danh · điểm trung bình môn · log tự học · ghi nhận hành vi.',
      'Đo tại mốc 3 tháng, 6 tháng và 9 tháng.',
      'Gói 4Y Gen Việt làm chuẩn mentoring và quản lý thành viên; chương trình tập huấn cho giáo viên chủ nhiệm và Đoàn — Đội.'],
    ['GV-R6',
      'Câu hỏi: CLB Gen Việt có thể trở thành môi trường nâng năng lực số, tư duy phản biện và đạo đức số cho học sinh THCS như thế nào?',
      'Độc lập: học phần tìm kiếm thông tin sạch, dùng AI hỗ trợ học, bảo mật, ứng xử mạng, sản xuất nội dung tích cực. Phụ thuộc: hiểu biết an toàn số, kỹ năng dùng AI, thái độ với thông tin giả, hành vi online.',
      'Nguồn mô tả thiết kế đo trước — sau trên cùng nhóm; nếu muốn kết luận nhân quả phải tự bổ sung nhóm đối chứng theo khung dùng chung.',
      'Bài đo hiểu biết an toàn số · bài đo kỹ năng dùng AI · thang thái độ với thông tin giả · nhật ký hành vi online.',
      'Đo trước và sau chu kỳ học phần; khung chung đòi tối thiểu 6–12 tháng.',
      'Bộ chuẩn "Công dân số Gen Việt" và học phần AI an toàn, nhân rộng được toàn trường hoặc toàn huyện.'],
    ['GV-R3 · R4 · R5 · R7 · R8 · R9 · R10',
      'CHỖ TRỐNG CỦA NGUỒN: bảy đề tài này chỉ có tên, mục tiêu và sản phẩm — không có giả thuyết riêng. Người viết đề án phải tự đặt giả thuyết trước khi trình hội đồng.',
      'Chỉ số đầu ra dùng chung: cải thiện kỷ luật, mức tham gia CLB, điểm học, kỹ năng thuyết trình và làm nhóm; tỷ lệ nhận vai trò; số hoạt động lan toả và dự án phụng sự.',
      'Khung dùng chung: học sinh 12–15 tuổi trong CLB, đối chứng là nhóm không tham gia ở cùng trường cùng khối nếu có.',
      'Bộ form GV-01 → GV-10 · rubric 15 giai đoạn · thang bốn yếu tố, ba giai đoạn, bảy bước · bảng RAG · dashboard học tập · hồ sơ dự án.',
      'Tối thiểu 6–12 tháng — đủ để đo cả ba giai đoạn làm, làm đúng, duy trì làm đúng.',
      'Xem cột sản phẩm ứng dụng của từng mã ở GV.TY_KN_DE_TAI. Phạm vi: 1–3 trường thí điểm rồi mở rộng 5–10 trường.']
  ];

  /* ── 9 · Cơ sở tâm lý lứa tuổi 12–15 ────────────────────────
     Bảng 5 của tài liệu nghiên cứu. Đây là phần trả lời câu hỏi
     "vì sao mô hình này có cơ sở" mà hội đồng luôn hỏi, và là
     phần bộ đề tài hiện có chưa giữ. */
  G.DA_TAM_LY = [
    ['Đặc điểm tuổi 12–15', 'Cách Gen Việt tận dụng', 'Lợi thế cho nghiên cứu'],
    ['Tìm kiếm bản sắc, dễ bị ảnh hưởng bởi nhóm',
      'Tạo bản sắc tích cực: 15 giai đoạn, Đại sứ, Leader, các ban chức năng',
      'Đo rõ được sự dịch chuyển từ *vô định* sang *có vai trò và mục tiêu*'],
    ['Nhạy với công bằng và sự ghi nhận',
      'Hệ thống vinh danh, Đại sứ, ban điều hành, pipeline rõ ràng',
      'Mở ra đề tài về động lực, self-efficacy và sense of belonging'],
    ['Bắt đầu tư duy trừu tượng',
      'Bảy bước, bốn yếu tố, ba giai đoạn — giải thích được bằng logic, các em hiểu',
      'Nghiên cứu về năng lực tự điều chỉnh và meta-cognition'],
    ['Dễ dao động cảm xúc',
      'Có Trái Tim Việt, mentor, buddy và hoạt động nhóm',
      'Đánh giá tác động hỗ trợ tâm lý tích cực, đo mức giảm hành vi lệch chuẩn'],
    ['Tiếp xúc mạnh với công nghệ',
      'Học phần năng lực số, AI, truyền thông và sáng tạo nội dung',
      'Đo năng lực số và đạo đức số trước — sau khi tham gia CLB']
  ];

  /* ── 10 · Luật viết và bảo vệ một đề án ─────────────────────── */
  G.DA_LUAT = [
    'Viết đúng tám mục theo thứ tự nguồn. Hiệu trưởng đọc mục I và mục VIII trước, phần giữa đọc sau. Mục I phải gói trong ba dòng.',
    'Mọi ô ở cột "kết quả đầu ra" phải là *con số hoặc hiện vật*. "Nâng cao chất lượng" không phải kết quả đầu ra. "12 buổi sinh hoạt mỗi năm" mới là.',
    'Tra và điền số hiệu trước khi trình Sở. Nguồn chỉ nêu bốn văn bản — Nghị định 79/2017/NĐ-CP, Nghị quyết 29-NQ/TW, Nghị quyết 71-NQ/TW (2025), Chiến lược phát triển giáo dục 2030–2045 — và *không văn bản nào có điều khoản đi kèm*. Người thẩm định sẽ hỏi điều nào cho phép lập CLB trong trường. Không có câu trả lời là hồ sơ trả về.',
    'Không thêm văn bản pháp lý mà mình chưa mở ra đọc. Trích sai số hiệu nguy hiểm hơn là trích ít.',
    'Bảng RACI chỉ đúng khi mỗi dòng có *đúng một chữ A*. Dòng có hai chữ A là dòng chưa ai chịu trách nhiệm. Kiểm lại chín dòng trước khi in.',
    'KPI phải chia được theo quý. Chỉ tiêu chỉ có con số cuối năm là chỉ tiêu không quản trị được — hết quý III mới biết hỏng thì đã muộn.',
    'Đưa cột "tần suất liên hệ" vào bảng phối hợp. Ban Giám hiệu hàng tháng, GITA hàng tuần, CLB bạn mỗi học kỳ. Đây là chỗ chứng minh CLB có nhịp vận hành thật, không phải sơ đồ trên giấy.',
    'Kèm đủ sáu mẫu biểu vào phụ lục. Một đề án không có biểu mẫu là một lời hứa; có biểu mẫu là một hệ thống chạy được ngay tuần sau.',
    'Mỗi mẫu biểu phải ghi rõ ba thứ: ai ký, nộp cho ai, khi nào. Thiếu một trong ba thì biểu mẫu đó sẽ không ai dùng.',
    'Ghi thẳng cam kết *không thương mại hoá* và *báo cáo định kỳ minh bạch*. Đây là hai câu gỡ nghi ngại lớn nhất khi có đơn vị ngoài trường tham gia.',
    'Nguyên tắc tài trợ phải viết đủ ba vế: minh bạch có chứng từ · đúng mục đích phục vụ học sinh · vinh danh công khai. Thiếu vế chứng từ là chỗ dễ vỡ nhất.',
    'Xin phạm vi vừa sức: một năm thí điểm, 1–3 trường. Xin rộng ngay từ đầu là dấu hiệu thiếu thực tế, và hội đồng đọc ra ngay.',
    'Với phần nghiên cứu: đề tài không có nhóm đối chứng thì mọi con số chỉ là mô tả, không phải bằng chứng. Nguồn chỉ dựng đối chứng đầy đủ cho GV-R1 và GV-R2.',
    'Không lấy giả thuyết của GV-R1 lắp cho đề tài khác. Bảy trong mười đề tài chưa có giả thuyết riêng — phải tự đặt, và đặt trước khi thu số liệu chứ không phải sau.',
    'Đề án dài không thắng. Đề án có bảng thắng. Mọi thứ định lượng được thì đưa vào bảng, phần văn xuôi chỉ giữ mục đích và cam kết.',
    'Ba dòng chữ ký cuối phải đủ: người lập đề án · Hiệu trưởng nhà trường · đại diện Học viện GITA. Thiếu dòng thứ ba thì đề án mất phần đối tác chuyên môn — cũng là mất phần thuyết phục nhất.'
  ];

})(window.GV = window.GV || {});
