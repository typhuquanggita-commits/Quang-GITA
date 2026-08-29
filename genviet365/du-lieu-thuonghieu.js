/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · BỘ NHẬN DIỆN THƯƠNG HIỆU
   Nhận diện không phải cái logo. Nhận diện là thứ khiến người ta
   nhận ra mình khi chưa nhìn thấy tên — trong một câu nói, một
   cách trao huy hiệu, một khoảng trắng trên trang giấy.
   Kho này giữ phần quy định được. Phần không quy định được nằm ở
   tập 6, và đó mới là phần khó giữ.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ── 1 · Nền tảng thương hiệu ──────────────────────────────── */
  G.TH_NEN = [
    { t: 'Lý do tồn tại', n: 'Người Việt chưa bao giờ thiếu người giỏi. Cái thiếu là một hệ chịu trách nhiệm về ba mươi năm tiếp theo của những người giỏi ấy.',
      vi: 'Đây là câu phải đúng cả khi không ai trả tiền cho nó.' },
    { t: 'Sứ mệnh', n: 'Nâng tầm trí tuệ vàng Việt Nam — bằng cách rèn ra những đứa trẻ *dám nhận việc*, và ghi lại bằng chứng cho điều đó.',
      vi: 'Sứ mệnh kế thừa nguyên văn từ Học viện GITA. Không viết lại.' },
    { t: 'Tầm nhìn 2056', n: 'Một mạng lưới nhân tài Việt *tự tái tạo*: người được rèn quay lại rèn người tiếp theo, và hệ thống sống lâu hơn người dựng ra nó.',
      vi: 'Đo bằng hệ số tự tái tạo, không đo bằng số học viên.' },
    { t: 'Định vị — một câu', n: 'GEN VIỆT 365 là **hệ điều hành phát triển con người** cho lứa tuổi 9–18: nơi trẻ lên bậc bằng việc đã làm, không bằng số buổi đã học.',
      vi: 'Câu này phải nói được trong mười giây, và phải kiểm chứng được ngay bằng cuốn hộ chiếu.' },
    { t: 'Lời hứa thương hiệu', n: 'Mọi thứ chúng tôi nói về con anh chị đều có bằng chứng, và bằng chứng ấy có chữ ký của một người ngoài.',
      vi: 'Lời hứa duy nhất. Thêm lời hứa thứ hai là làm loãng lời hứa thứ nhất.' },
    { t: 'Tính cách', n: '*Nghiêm cẩn* · *ấm* · *thẳng* · *bền* · *khiêm*.',
      vi: 'Phản đề — thứ tuyệt đối không phải mình: hào nhoáng, hứa nhiều, doạ nạt, nôn nóng, kể công.' }
  ];

  G.TH_KHAC_BIET = [
    { t: 'Hộ chiếu nhân tài', n: 'Một hồ sơ năng lực mười hai trục đi theo con ba mươi năm, thuộc về con chứ không thuộc về học viện.',
      vi: 'Sao chép được hình thức. Không sao chép được ba mươi năm dữ liệu.' },
    { t: 'Bằng chứng có chữ ký người ngoài', n: 'Không có chữ ký của người ngoài hệ thì việc ấy không được tính, không vào hộ chiếu, không lên bậc.',
      vi: 'Đây là điều khiến hệ không trôi thành phong trào. Cũng là điều khiến hệ chậm — và chậm là tính năng.' },
    { t: 'Cam kết có mức đền', n: 'Mười hai cam kết dịch vụ, mỗi cam kết ghi rõ đền gì khi không giữ được, và đền tự động.',
      vi: 'Đối thủ chép được bảng cam kết. Chép mức đền thì phải chịu chi phí thật.' },
    { t: 'Sổ ghi lỗi công khai', n: 'Hệ ghi lại cái sai của chính mình, đọc trong họp tháng và trong ngoại kiểm.',
      vi: 'Thứ ai cũng làm được thì không tạo ra niềm tin. Đây là thứ rất ít nơi dám làm.' }
  ];

  /* ── 2 · Kiến trúc thương hiệu ───────────────────────────────
     Mô hình thương hiệu mẹ bảo chứng: GITA đứng sau, Gen Việt 365
     đứng trước. Sản phẩm con mang tên riêng, ghi kèm dòng bảo chứng. */
  G.TH_KIEN_TRUC = [
    { ma: 'T0', t: 'HỌC VIỆN GITA', mau: '#0E1826', tang: 'Thương hiệu mẹ',
      n: 'Chủ thể pháp lý, chủ sở hữu mọi quyền. Xuất hiện ở dòng bảo chứng, không cạnh tranh chỗ với thương hiệu con.',
      vd: 'Ký tên trên hợp đồng, giấy phép, bằng cấp.' },
    { ma: 'T1', t: 'GITA 365', mau: '#5140B4', tang: 'Hệ giải pháp',
      n: 'Hệ giải pháp năm tầng cho gia đình. Anh em ngang hàng với Gen Việt 365, dùng chung kho và chung bảng phân quyền.',
      vd: 'Tư vấn, phác đồ, xử lý ca.' },
    { ma: 'T2', t: 'GEN VIỆT 365', mau: '#185AB4', tang: 'Hệ huấn luyện',
      n: 'Thương hiệu chủ lực đối với công chúng. Mọi truyền thông về huấn luyện nhân tài đi qua tên này.',
      vd: 'Chi hội, trại, lộ trình sáu bậc.' },
    { ma: 'T3', t: 'Sản phẩm mang tên riêng', mau: '#0B6675', tang: 'Sản phẩm',
      n: 'GEN ALPHA · LEADER BOOM · CHI HỘI GEN VIỆT · HỘ CHIẾU NHÂN TÀI · THƯ VIỆN GEN VIỆT.',
      vd: 'Mỗi tên đứng riêng được, luôn kèm dòng “thuộc hệ GEN VIỆT 365”.' },
    { ma: 'T4', t: 'Chi hội địa phương', mau: '#0B7350', tang: 'Đơn vị',
      n: 'CHI HỘI GEN VIỆT + tên địa phương, ví dụ *Chi hội Gen Việt Cầu Giấy*.',
      vd: 'Được cầm con dấu chi hội. Không được đổi dấu hiệu, không được thêm khẩu hiệu riêng.' }
  ];

  G.TH_LUAT_TEN = [
    'Tên *GEN VIỆT* chỉ gắn vào thứ đi qua **cổng nghiệm thu** của hệ. Một khoá học chưa qua cổng thì không được mang tên này.',
    'Viết đủ dấu, đủ hoa: **GEN VIỆT 365**. Không viết *Gen Viet*, *GENVIET*, *Gen Việt365*.',
    'Số *365* không tách rời khi đứng làm tên hệ. Tách ra chỉ được dùng trong văn nói.',
    'Chi hội đặt tên theo địa danh hành chính, không theo tên người và không theo tên trường.',
    'Không đặt tên sản phẩm mới bằng tiếng nước ngoài nếu chưa có bản tiếng Việt tương đương được duyệt.',
    'Mọi tên mới phải được **tra cứu nhãn hiệu** trước khi dùng công khai, kể cả tên nội bộ — vì tên nội bộ luôn rò ra ngoài.',
    'Đối tác và nhượng quyền không được ghép tên mình vào tên hệ. Họ đứng ở dòng “đơn vị triển khai”.'
  ];

  /* ── 3 · Dấu hiệu — ẤN GEN VIỆT ────────────────────────────── */
  G.TH_AN_Y_NIEM = [
    { t: 'Vì sao là một con dấu', n: 'Ấn triện là vật chứng nhận của người Việt suốt nghìn năm: đóng dấu nghĩa là *tôi chịu trách nhiệm về điều này*. Hệ này sống bằng bằng chứng có người xác nhận — nên dấu hiệu của nó phải là một con dấu.',
      vi: 'Hệ vốn đã có “con dấu chi hội” là hiện vật. Dấu hiệu và hiện vật là một, không phải hai thứ rời nhau.' },
    { t: 'Chữ V', n: 'Hai nét chụm ở đáy, mở lên trên: chữ V của *Việt*, và hình một mầm đang tách vỏ vươn lên.',
      vi: 'Đáy chụm — mọi người bắt đầu từ cùng một điểm. Trên mở — mỗi người đi một hướng.' },
    { t: 'Nét trái liền', n: 'Nét bên trái không đứt: **bảy nguyên lý bất biến**, phần không đổi trong ba mươi năm.',
      vi: 'Nét này luôn dày hơn và luôn liền. Vẽ đứt là vẽ sai.' },
    { t: 'Sáu chấm bên phải', n: 'Nét bên phải là **sáu bậc nhân tài** B1 → B6, đi lên từng chấm một, có khoảng cách giữa các chấm.',
      vi: 'Khoảng cách là phần quan trọng nhất: lên bậc phải có quãng, không liên tục, không tự động.' },
    { t: 'Khung vuông', n: 'Bốn cạnh khép kín: cam kết, ranh giới, và luật an toàn. Bo góc nhẹ để đọc được ở cỡ nhỏ.',
      vi: 'Không bao giờ mở khung. Khung hở là dấu hiệu bị dùng sai.' },
    { t: 'Mực son', n: 'Bản nghi lễ — con dấu thật, bằng bậc, trang đầu hộ chiếu — đóng bằng **đỏ son**. Bản thường ngày dùng **lam GITA**.',
      vi: 'Đỏ son chỉ dùng cho thứ có chữ ký và có trách nhiệm. Dùng đỏ son cho tờ rơi là làm mòn nó.' }
  ];

  G.TH_AN_BIEN_THE = [
    { ma: 'A', t: 'Ấn đơn', n: 'Chỉ dấu hiệu, không chữ.', dung: 'Huy hiệu, con dấu, thêu áo, ảnh đại diện, dấu nước, favicon.', toi: '16 px · 6 mm' },
    { ma: 'B', t: 'Khoá ngang', n: 'Ấn bên trái, tên hai dòng bên phải.', dung: 'Giấy tiêu đề, chữ ký thư điện tử, biển hiệu, phông nền.', toi: '120 px · 30 mm' },
    { ma: 'C', t: 'Khoá dọc', n: 'Ấn trên, tên dưới, canh giữa.', dung: 'Bìa ấn phẩm, cờ tổ, áo, khung vuông trên mạng xã hội.', toi: '90 px · 24 mm' },
    { ma: 'D', t: 'Bản đảo', n: 'Ấn trắng trên nền màu đặc.', dung: 'Nền ảnh, nền lam, nền đỏ son, bao bì.', toi: '20 px · 8 mm' },
    { ma: 'E', t: 'Bản một nét', n: 'Một màu, không sắc độ, nét đều.', dung: 'Dập nổi kim loại, khắc gỗ, in một màu, fax và bản sao đen trắng.', toi: '20 px · 8 mm' }
  ];

  G.TH_AN_LUAT = [
    'Vùng an toàn quanh ấn = **một phần tư cạnh khung**. Không đặt chữ, ảnh hay đường kẻ nào vào vùng ấy.',
    'Cỡ nhỏ nhất: **16 px** trên màn hình, **6 mm** khi in. Nhỏ hơn thì sáu chấm dính vào nhau và ý nghĩa mất.',
    'Ấn luôn đứng thẳng. Không xoay, kể cả 15 độ cho “sinh động”.',
    'Ấn dùng **một màu duy nhất** mỗi lần. Không tô mỗi chấm một màu, không đổ bóng, không chuyển sắc.',
    'Không kéo giãn theo một chiều. Khoá tỉ lệ, luôn luôn.',
    'Không đặt ấn lên ảnh nhiều chi tiết. Cần đặt lên ảnh thì dùng bản đảo trên một khối màu đặc.',
    'Không ghép ấn với dấu hiệu của đối tác trong cùng một khối. Hai dấu hiệu cách nhau ít nhất hai vùng an toàn và có một đường kẻ mảnh phân cách.',
    'Không vẽ lại ấn bằng tay hay bằng phông chữ khác. Chỉ dùng tệp gốc trong bộ bàn giao.',
    '*Không bao giờ đóng dấu lên mặt người.* Đây là luật đạo đức, không phải luật thẩm mỹ.',
    'Không dùng bản đỏ son cho quảng cáo hay khuyến mại. Đỏ son dành cho thứ có chữ ký và có trách nhiệm — dùng tràn thì mòn.'
  ];

  G.TH_AN_SAI = [
    ['Xoay nghiêng', 'Ấn triện đóng nghiêng là ấn đóng hỏng. Ý nghĩa “chịu trách nhiệm” mất theo.'],
    ['Đổi màu từng chấm', 'Sáu chấm là sáu bậc của MỘT con đường, không phải sáu thứ khác nhau.'],
    ['Nối sáu chấm thành nét liền', 'Xoá mất điều quan trọng nhất: lên bậc phải có quãng.'],
    ['Vẽ nét trái đứt', 'Nét trái là bảy nguyên lý bất biến. Đứt nghĩa là nguyên lý đổi được.'],
    ['Bỏ khung, chỉ lấy chữ V', 'Không còn là con dấu. Còn lại một chữ V mà ai cũng có.'],
    ['Đổ bóng, làm nổi khối', 'Con dấu là vật phẳng. Đổ bóng làm nó thành một nút bấm.'],
    ['Kéo giãn theo một chiều', 'Khung vuông thành chữ nhật, sáu chấm lệch nhịp. Luôn khoá tỉ lệ.'],
    ['Đặt lên nền nhiều chi tiết', 'Không đọc được thì không còn là dấu hiệu. Cần đặt lên ảnh thì dùng bản đảo trên một khối màu đặc.']
  ];

  /* ── 4 · Màu ────────────────────────────────────────────────
     Bảng màu kế thừa nguyên vẹn nhận diện Học viện GITA. Mọi mã
     màu chữ đều đã qua bộ kiểm tương phản WCAG AA ở cả hai chế độ. */
  G.TH_MAU = [
    { t: 'Lam GITA', hex: '#185AB4', rgb: '24 · 90 · 180', cmyk: '87 · 60 · 0 · 6', pantone: 'gần 2145 C',
      vai: 'Màu chủ. Dấu hiệu bản thường ngày, tiêu đề, đường dẫn.', tp: '5.70 : 1', mau: '#185AB4' },
    { t: 'Đỏ son', hex: '#BE0E16', rgb: '190 · 14 · 22', cmyk: '13 · 100 · 100 · 4', pantone: 'gần 186 C',
      vai: 'Màu nghi lễ. Con dấu thật, bằng bậc, trang đầu hộ chiếu, mức đền trong bảng cam kết.', tp: '5.52 : 1', mau: '#BE0E16' },
    { t: 'Tím trí', hex: '#5140B4', rgb: '81 · 64 · 180', cmyk: '77 · 76 · 0 · 6', pantone: 'gần 2725 C',
      vai: 'Huấn luyện và tri thức. Nhóm giáo trình, chuyên đề, GITA 365.', tp: '6.28 : 1', mau: '#5140B4' },
    { t: 'Lục lam', hex: '#0B6675', rgb: '11 · 102 · 117', cmyk: '91 · 40 · 33 · 20', pantone: 'gần 315 C',
      vai: 'Chi hội và cộng đồng. Nơi có nhiều người cùng làm.', tp: '5.62 : 1', mau: '#0B6675' },
    { t: 'Lục bằng chứng', hex: '#0B7350', rgb: '11 · 115 · 80', cmyk: '87 · 30 · 79 · 19', pantone: 'gần 342 C',
      vai: 'Đạt, xác nhận, băng XANH. Chỉ dùng khi đã có bằng chứng.', tp: '5.03 : 1', mau: '#0B7350' },
    { t: 'Vàng chí', hex: '#8A6006', rgb: '138 · 96 · 6', cmyk: '25 · 50 · 100 · 25', pantone: 'gần 111 C',
      vai: 'Cảnh báo sớm, băng VÀNG, giới hạn phải nói rõ.', tp: '4.80 : 1', mau: '#8A6006' },
    { t: 'Cam chú ý', hex: '#9E470D', rgb: '158 · 71 · 13', cmyk: '20 · 75 · 100 · 12', pantone: 'gần 1595 C',
      vai: 'Băng CAM, việc phải xử trong tuần.', tp: '5.28 : 1', mau: '#9E470D' },
    { t: 'Mực', hex: '#0E1826', rgb: '14 · 24 · 38', cmyk: '90 · 75 · 55 · 70', pantone: 'gần 5255 C',
      vai: 'Chữ chính, Học viện GITA, bản một nét.', tp: '15.31 : 1', mau: '#0E1826' },
    { t: 'Nền lệch lam', hex: '#EAEEF3', rgb: '234 · 238 · 243', cmyk: '6 · 3 · 2 · 0', pantone: 'gần 656 C',
      vai: 'Nền. Xám lệch lam, cố ý không phải xám trung tính, để sáu màu trên đứng không chói.', tp: 'nền', mau: '#EAEEF3' }
  ];

  G.TH_MAU_LUAT = [
    'Tỉ lệ **60 · 30 · 10**: 60 nền, 30 mực, 10 màu nhấn. Một trang dùng quá hai màu nhấn là một trang mất trật tự.',
    'Mọi mã màu **đi vào chữ** phải đạt tương phản ≥ **4.5 : 1** trên nền của chính chế độ ấy. Bộ kiểm phát hành chặn nếu không đạt — ở cả chế độ sáng và tối.',
    'Màu không bao giờ là **thông tin duy nhất**. Băng màu luôn kèm chữ; biểu đồ luôn kèm nhãn. Khoảng 8% nam giới không phân biệt được đỏ và lục.',
    'Đỏ son chỉ dùng cho thứ có chữ ký và có trách nhiệm — không dùng cho khuyến mại, không dùng cho tờ rơi.',
    'Lục bằng chứng chỉ dùng khi thật sự đã có bằng chứng. Dùng lục cho thứ chưa đạt là nói dối bằng màu.',
    'Mã Pantone trong bảng là **gần đúng** — trước khi in số lượng lớn phải chạy bản thử màu và duyệt bằng mắt trên đúng chất liệu.'
  ];

  /* ── 5 · Chữ ────────────────────────────────────────────────── */
  G.TH_CHU = [
    { t: 'Playfair Display', vai: 'Chữ tít', can: '600 · 600 nghiêng',
      n: 'Serif có độ tương phản nét cao, dáng cổ điển. Dùng cho tên hệ, tiêu đề màn, tên chân dung trong Thư viện.',
      vi: 'Chỉ dùng từ 20 px trở lên. Dưới cỡ đó nét mảnh biến mất và dấu tiếng Việt bị bết.' },
    { t: 'Be Vietnam Pro', vai: 'Chữ chạy', can: '400 · 500 · 600 · 700 · 400 nghiêng',
      n: 'Sans-serif do người Việt thiết kế, **dấu tiếng Việt được vẽ riêng chứ không chắp vá**. Dùng cho toàn bộ chữ đọc.',
      vi: 'Đây là lý do chọn nó thay vì một phông quốc tế: dấu mũ, dấu móc và dấu thanh chồng nhau đúng cách ở mọi cỡ.' },
    { t: 'IBM Plex Mono', vai: 'Chữ mã', can: '400 · 500',
      n: 'Đều nét. Dùng cho mã màn, mã bậc, số liệu trong bảng, nhãn nhỏ chữ hoa.',
      vi: 'Số trong bảng luôn dùng chữ số đều bề ngang, để cột số thẳng hàng.' },
    { t: 'Bộ thay thế', vai: 'Khi không có phông', can: 'hệ thống',
      n: 'Georgia → Times New Roman cho tít; hệ thống (system-ui, Segoe UI) cho chữ chạy; SFMono → Menlo cho mã.',
      vi: '**Bắt buộc phải kiểm**: trang phải đọc được đầy đủ khi phông ngoài bị chặn — điều xảy ra thật ở Trung Quốc và trong nhiều mạng nội bộ. Bộ kiểm dựng thử với phông bị chặn.' }
  ];

  G.TH_THANG_CHU = [
    ['Tên hệ trong khoá', 'Playfair Display 600', '28 – 40 px', 'Giãn chữ −0.015em'],
    ['Tiêu đề màn (h1)', 'Playfair Display 600', '25 – 35 px co giãn', 'Một h1 mỗi màn, không hơn'],
    ['Tiêu đề mục (h3)', 'Be Vietnam Pro 600', '17 – 21 px', 'Giãn chữ −0.01em'],
    ['Chữ đọc', 'Be Vietnam Pro 400', '13.5 – 15 px', 'Dòng cao 1.6 · bề ngang tối đa 66 ký tự'],
    ['Nhãn nhỏ', 'IBM Plex Mono 400 hoa', '9.5 – 11 px', 'Giãn chữ +0.13em'],
    ['Số trong bảng', 'IBM Plex Mono 400', '12 – 13 px', 'Chữ số đều bề ngang']
  ];

  /* ── 6 · Hình ảnh ───────────────────────────────────────────── */
  G.TH_HINH_DAO_DUC = [
    'Không đăng ảnh trẻ khi chưa có **đồng thuận văn bản** của phụ huynh. Rút đồng thuận thì gỡ trong 48 giờ.',
    'Không chụp trẻ đang khóc, đang bị phê bình, hoặc trong tình trạng dễ tổn thương — kể cả khi ảnh “đắt”.',
    'Không dùng ảnh trẻ kèm chữ gợi lòng thương hại. Hệ này nuôi lòng tự trọng, không xin lòng thương.',
    'Không ghi tên đầy đủ và trường lớp của trẻ dưới ảnh. Tên gọi và bậc là đủ.',
    'Không đóng dấu hiệu lên mặt người.',
    'Ảnh trẻ được lưu riêng, có hạn giữ, và xoá theo yêu cầu như mọi dữ liệu khác.'
  ];

  G.TH_HINH_THAM_MY = [
    { t: 'Chụp việc, không chụp mặt', n: 'Ảnh trọng tâm là *bàn tay đang làm*, *bảng đang viết*, *nhóm đang bàn* — không phải hàng người xếp thẳng cười vào ống kính.',
      vi: 'Ảnh xếp hàng cười là ảnh của mọi trung tâm. Ảnh việc đang làm là ảnh của mình.' },
    { t: 'Ánh sáng thật', n: 'Ánh sáng tự nhiên, không đèn phòng chụp, không lọc màu. Chấp nhận ảnh hơi tối còn hơn ảnh giả.',
      vi: 'Gia đình phân biệt được ảnh dàn dựng nhanh hơn mình tưởng.' },
    { t: 'Bối cảnh thật', n: 'Lớp học thật, sân trường thật, bàn ăn nhà thật. Không thuê phòng đẹp để chụp.',
      vi: 'Bốn môi trường M1–M4 là bối cảnh của thương hiệu này. Không có bối cảnh thứ năm.' },
    { t: 'Không dùng ảnh mua sẵn có trẻ em', n: 'Tuyệt đối không dùng ảnh kho có mặt trẻ nước ngoài minh hoạ cho học viên Việt Nam.',
      vi: 'Ảnh kho chỉ dùng cho nền trừu tượng, hoạ tiết, phong cảnh — không dùng cho người.' }
  ];

  G.TH_HOA_TIET = [
    { t: 'Vạch nhịp 365', n: 'Một hàng vạch mảnh đều nhau, thưa dần ở hai đầu — nhịp của một năm.', vi: 'Dùng làm đường phân cách, gáy sách, mép danh thiếp. Không dùng làm nền kín trang.' },
    { t: 'Lưới hộ chiếu', n: 'Lưới 12 cột × 5 hàng rất mảnh, đục thủng — mười hai trục, năm mức.', vi: 'Dùng làm dấu nước trên giấy tiêu đề và trang lót hộ chiếu, độ đậm không quá 8%.' },
    { t: 'Sáu chấm', n: 'Sáu chấm ăn theo dấu hiệu, xếp chéo lên.', vi: 'Dùng làm dấu kết bài, dấu phân đoạn, hoạ tiết mép trang.' }
  ];

  /* ── 7 · Giọng ─────────────────────────────────────────────── */
  G.TH_GIONG = [
    { so: '1', t: 'Nói bằng việc, không bằng tính từ', n: 'Thay “chương trình chất lượng cao” bằng “mỗi việc phải có chữ ký của một người ngoài”.', v: 'Tính từ ai cũng dùng được. Việc thì phải làm mới nói được.' },
    { so: '2', t: 'Nói con số khi có, im lặng khi không', n: 'Có mẫu thì nêu mẫu. Không có thì nói “chúng tôi chưa đo được điều này”.', v: 'Một lần nói quá là mất quyền được tin ở mọi lần sau.' },
    { so: '3', t: 'Nói cái mình không làm được', n: 'Mỗi gói đều có mục *không phù hợp với ai*. Mỗi bảo đảm đều ghi giới hạn.', v: 'Người ta tin một nơi dám nói giới hạn hơn một nơi nói mình làm được tất.' },
    { so: '4', t: 'Gọi tên người, không gọi tên hệ thống', n: 'Thay “hệ thống có sai sót” bằng “buổi thứ tư anh Nam đã không gọi lại, đó là lỗi của anh Nam và của tôi”.', v: 'Bị động cách là chỗ trú của người không muốn chịu trách nhiệm.' },
    { so: '5', t: 'Không so với người khác', n: 'Không chê nơi khác, không so con này với con kia, không xếp hạng gia đình.', v: 'Chê nơi khác làm mình thành cùng loại với nơi mình chê.' }
  ];

  G.TH_GIONG_BANG = [
    ['Chương trình đào tạo kỹ năng sống hàng đầu', 'Trẻ lên bậc bằng việc đã làm, không bằng số buổi đã học'],
    ['Cam kết chất lượng', 'Mười hai cam kết, mỗi cam kết ghi rõ đền gì khi chúng tôi không giữ được'],
    ['Đội ngũ giàu kinh nghiệm', 'Người dạy con anh chị đạt ≥16/20 chuẩn dự giờ trong 90 ngày gần nhất — anh chị được xem hồ sơ'],
    ['Con sẽ tự tin, năng động', 'Sau 90 ngày con nhích ít nhất một mức ở ít nhất một trục, có bằng chứng. Không thì học lại miễn phí'],
    ['Phụ huynh rất hài lòng', 'Chỉ số tiến cử thuần kỳ gần nhất: … trên mẫu … người'],
    ['Ưu đãi đặc biệt hôm nay', 'Giá công khai, không mặc cả. Gia đình khó khăn đi qua quỹ học bổng có quy trình'],
    ['Bé nhà mình chưa ngoan', 'Cháu đang ở mức 2 trục Chủ. Việc tuần này là …'],
    ['Chúng tôi rất tiếc nếu quý phụ huynh cảm thấy…', 'Chúng tôi đã sai ở buổi thứ tư. Người chịu trách nhiệm là …, và đây là việc đã sửa']
  ];

  /* ── 8 · Ứng dụng ──────────────────────────────────────────── */
  G.TH_UNG_DUNG = [
    ['Con dấu chi hội', 'Ấn đơn (A) · đỏ son', 'Đường kính 32 mm, khắc chìm', 'Số hiệu chi hội khắc quanh vành'],
    ['Hộ chiếu nhân tài — bìa', 'Ấn đơn (A) dập nổi · bìa mực', 'A6 · 105 × 148 mm, bìa cứng', 'Ấn dập nổi không mực, sờ thấy được'],
    ['Hộ chiếu — trang đầu', 'Ấn đơn (A) · đỏ son', 'Đóng dấu thật, không in sẵn', 'Chữ ký tay của Coach và của con'],
    ['Huy hiệu bậc', 'Ấn đơn (A) · kim loại', '18 mm, men màu theo bậc', 'Kim loại, không nhựa — thứ nặng tay thì được giữ'],
    ['Thẻ chi hội', 'Khoá ngang (B) · lam', '54 × 86 mm', 'Số hiệu chi hội và số thứ tự thành viên'],
    ['Bằng bậc', 'Ấn đơn (A) đỏ son + khoá dọc (C)', 'A4 dọc, giấy 250 gsm', 'Ghi VIỆC con đã làm, không chỉ ghi bậc'],
    ['Giấy tiêu đề', 'Khoá ngang (B) · lam', 'A4, dấu nước lưới hộ chiếu 8%', 'Chân trang có dòng bảo chứng Học viện GITA'],
    ['Danh thiếp', 'Ấn đơn (A) mặt sau · khoá ngang mặt trước', '54 × 86 mm', 'Mép in vạch nhịp 365'],
    ['Cờ tổ mũi nhọn', 'Khoá dọc (C) · một màu', '60 × 90 cm', 'Tổ tự may hoặc tự vẽ — hệ không phát sẵn'],
    ['Biển hiệu cơ sở', 'Khoá ngang (B) · lam trên nền sáng', 'Cao tối thiểu 40 cm', 'Không đèn nhấp nháy, không hiệu ứng'],
    ['Đồng phục', 'Ấn đơn (A) thêu ngực trái', 'Cao 45 mm', 'Một màu, chỉ cùng tông vải hoặc lam'],
    ['Phông nền sự kiện', 'Khoá ngang (B) · bản đảo (D)', 'Ấn cao ≥ 1/8 chiều cao phông', 'Không xếp logo nhà tài trợ chen vào vùng an toàn'],
    ['Chữ ký thư điện tử', 'Khoá ngang (B)', 'Ấn 40 px', 'Không ảnh nền, không khẩu hiệu, không câu danh ngôn'],
    ['Trang chiếu và tài liệu số', 'Ấn đơn (A) góc dưới', '24 px', 'Slide đầu dùng khoá dọc (C), các slide sau chỉ dùng ấn đơn'],
    ['Hộp kỷ vật', 'Ấn đơn (A) dập nổi', 'Nắp hộp, 40 mm', 'Không in tên năm — năm ghi bằng thẻ bên trong'],
    ['Ảnh đại diện mạng xã hội', 'Ấn đơn (A) hoặc bản đảo (D)', '400 × 400 px', 'Ấn chiếm 60% khung, canh giữa tuyệt đối']
  ];

  G.TH_TEP = [
    ['Ấn — véc-tơ', 'SVG · AI · EPS · PDF', '5 biến thể × 3 màu (lam · đỏ son · mực) + bản đảo'],
    ['Ấn — ảnh điểm', 'PNG nền trong', '5 cỡ: 16 · 32 · 64 · 256 · 1024 px'],
    ['Ấn — bản in', 'PDF/X-1a', 'CMYK và Pantone, có vạch cắt và vùng tràn lề 3 mm'],
    ['Ấn — chế tác', 'DXF · STL', 'Cho khắc dấu, dập kim loại, thêu (tệp thêu DST)'],
    ['Bảng màu', 'ASE · ACO · bảng HEX/RGB/CMYK', 'Kèm bản thử màu đã duyệt trên giấy 250 gsm'],
    ['Phông chữ', 'Giấy phép và tệp', 'Ba bộ, giấy phép mở — kiểm lại điều khoản trước khi nhúng vào sản phẩm bán'],
    ['Mẫu ấn phẩm', 'INDD · DOCX · PPTX', 'Giấy tiêu đề, danh thiếp, bằng, trang chiếu, thư tuần'],
    ['Sổ tay nhận diện', 'PDF', 'Chính tài liệu này, bản in được, có số hiệu bản và ngày ban hành']
  ];

  G.TH_LUAT_GIU = [
    'Một người chịu trách nhiệm gác nhận diện — **Admin sản phẩm (R05)**. Không ai khác được duyệt ấn phẩm mang dấu hiệu.',
    'Mọi tệp mang dấu hiệu đi ra ngoài phải qua một lần duyệt, kể cả tệp của chi hội và của đối tác.',
    'Chi hội và đối tác **không được** tự tạo biến thể mới, không được thêm khẩu hiệu riêng, không được đổi màu.',
    'Sổ tay này có **số hiệu bản và ngày ban hành**. Bản cũ hết hiệu lực khi bản mới ban hành, và bản cũ được lưu chứ không xoá.',
    'Đề nghị đổi nhận diện phải nêu *vấn đề* trước, không nêu *phương án* trước. Chán không phải là một vấn đề.',
    'Rà nhận diện mỗi năm một lần, cùng dịp ngoại kiểm. Ghi lại chỗ nào bị dùng sai và vì sao.',
    'Phát hiện bên ngoài dùng trái phép thì ghi lại bằng chứng ngay — ảnh chụp màn hình có ngày, địa chỉ, và bản lưu — rồi mới liên hệ.'
  ];

})(window.GV = window.GV || {});
