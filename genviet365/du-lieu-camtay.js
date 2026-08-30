/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · CẦM LÊN DÙNG ĐƯỢC
   Mười tám nhóm trước MÔ TẢ hệ thống. Nhóm này GIAO ra thứ dùng
   được sáng mai: bảy câu hỏi in ra đưa phụ huynh, một giáo án chạy
   được từng phút, bốn kịch bản gọi điện, năm lá thư mẫu, ba cuốn
   sổ của học viên, bộ câu hỏi phỏng vấn, và bảng chấm chi tiết.

   Vì sao có nhóm này: rà lại toàn hệ thì thấy chín thứ được HỨA
   nhiều lần mà chưa bao giờ được viết ra. Một hệ hứa mà không giao
   thì chính nó vi phạm điều nó dạy. Nhóm này trả những món nợ ấy.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ── 1 · Bộ bảy câu hỏi bàn ăn ───────────────────────────────
     Thứ gửi cho gia đình ở chặng C0, trước khi bán bất cứ thứ gì.
     Phải có giá trị độc lập: dùng được cả khi họ không bao giờ mua. */
  G.CT_BAY_CAU = [
    { so: '1', t: 'Hôm nay có việc gì con làm mà con thấy khó?',
      n: 'Hỏi việc khó, không hỏi “hôm nay thế nào”. Câu “hôm nay thế nào” chỉ nhận được “bình thường” — nó không có chỗ để bám.',
      v: 'Con kể được một việc cụ thể, có giờ có chỗ.',
      k: 'Đừng an ủi ngay. Đừng nói “có gì đâu mà khó”.' },
    { so: '2', t: 'Hôm nay có ai làm điều gì tử tế với con không?',
      n: 'Rèn con để ý điều tốt của người khác. Trẻ nhớ điều khó chịu dễ hơn nhớ điều tử tế, và phải tập mới nhớ được.',
      v: 'Con kể được tên một người và một việc.',
      k: 'Đừng gợi ý hộ. Con nghĩ không ra thì để mai hỏi lại.' },
    { so: '3', t: 'Con giúp được ai việc gì chưa?',
      n: '*Câu quan trọng nhất trong bảy câu.* Nó đổi hành vi nhanh hơn mọi lời dặn, vì tuần sau con muốn có gì để trả lời.',
      v: 'Sau vài tuần, con bắt đầu chủ động tìm việc để giúp.',
      k: 'Đừng khen to. Gật đầu và hỏi thêm một câu về việc ấy là đủ.' },
    { so: '4', t: 'Có việc gì con định làm mà chưa làm được?',
      n: 'Đưa chuyện dở dang ra ánh sáng mà không kết tội. Chưa làm được khác với lười — câu hỏi này giữ đúng khoảng cách ấy.',
      v: 'Con nói ra được mà không thu mình lại.',
      k: 'Đừng hỏi “vì sao chưa làm”. Câu đó biến câu hỏi thành lời trách.' },
    { so: '5', t: 'Nếu mai được làm lại một việc hôm nay, con làm khác chỗ nào?',
      n: 'Rèn nhìn lại mà không tự dằn vặt. Đây là hạt giống của trục *Phục hồi*.',
      v: 'Con chỉ ra được một chỗ cụ thể, không nói “con làm tốt hơn”.',
      k: 'Đừng thêm “đấy, mẹ đã bảo rồi”. Một câu ấy làm hỏng cả bảy câu.' },
    { so: '6', t: 'Con thấy bố mẹ hôm nay thế nào?',
      n: 'Đảo chiều. Trẻ hầu như không bao giờ được hỏi câu này, và nó dạy con rằng người lớn cũng có một ngày để kể.',
      v: 'Con nhận xét thật, kể cả nhận xét không dễ nghe.',
      k: 'Đừng cãi lại nhận xét của con. Nghe và cảm ơn.' },
    { so: '7', t: 'Ngày mai con mong nhất việc gì?',
      n: 'Kết bữa ăn bằng hướng đi tới, không bằng hướng nhìn lại. Con đi ngủ với một việc để chờ.',
      v: 'Con có một việc để mong, dù rất nhỏ.',
      k: 'Đừng biến câu trả lời thành lời hứa của bố mẹ.' }
  ];

  G.CT_BAY_LUAT = [
    '*Mỗi bữa chỉ hỏi MỘT câu.* Hỏi cả bảy là hỏi cung, không phải bữa ăn.',
    'Hỏi xong thì **im lặng đếm tới bảy**. Phần lớn người lớn chịu không nổi bốn giây im lặng, và chính bốn giây ấy là chỗ trẻ bắt đầu nói thật.',
    'Không sửa câu trả lời. Không bình luận. Không rút ra bài học.',
    'Không hỏi lúc con đang bực hoặc đang đói. Đợi bữa sau.',
    'Người lớn **trả lời trước** nếu con ngại — kể một việc khó của mình trong ngày, thật, không tô vẽ.',
    'Con nói “con không biết” thì nhận: “ừ, mai con nghĩ ra thì kể mẹ nghe.” Không ép.',
    'Làm đều bốn tuần rồi hãy đánh giá. Ba bữa đầu thường nhạt — đó là bình thường.'
  ];

  /* ── 2 · Bản đọc ca một trang ────────────────────────────────
     Thứ gia đình cầm về sau buổi tư vấn đầu, dù không mua gì. */
  G.CT_DOC_CA = [
    { t: '1 · Em là ai', n: 'Ba dòng. Tên, tuổi, lớp, và *một điều riêng* mà chỉ người đã ngồi nghe mới biết.',
      vi: 'Ví dụ: “Minh, 11 tuổi, lớp 6. Vẽ truyện tranh từ năm lớp 3, có một quyển 40 trang chưa ai đọc.”' },
    { t: '2 · Điều gia đình lo nhất', n: 'Ghi nguyên văn lời phụ huynh, trong ngoặc kép. Không diễn giải lại cho hay hơn.',
      vi: 'Ví dụ: “Cháu không tự giác, cái gì cũng phải nhắc, mà nhắc thì cáu.”' },
    { t: '3 · Điều em tự nói', n: 'Nguyên văn lời con, trong ngoặc kép. Nếu con không nói gì thì ghi “em chưa nói gì” — đó cũng là dữ liệu.',
      vi: 'Ví dụ: “Con không thích bị so với anh con.”' },
    { t: '4 · Đọc được gì', n: 'Bốn trụ G · I · T · A, mỗi trụ một dòng, ghi mức ước lượng và bằng chứng dựa vào đâu.',
      vi: 'Ví dụ: “I · Nội lực — mức 2. Bỏ dở ba việc trong tháng, nhưng quyển truyện 40 trang cho thấy bền được khi tự chọn.”' },
    { t: '5 · Mũi nhọn có thể có', n: 'Một, tối đa hai. Ghi kèm chữ *có thể* — đây là giả thuyết, chưa phải kết luận.',
      vi: 'Ví dụ: “Có thể là kể chuyện bằng hình. Cần 90 ngày để biết chắc.”' },
    { t: '6 · Một việc làm trong bảy ngày', n: 'Việc nhỏ, gia đình làm được ngay, không cần mua gì. *Đây là dòng có giá trị nhất trong cả trang.*',
      vi: 'Ví dụ: “Mỗi tối hỏi một câu trong bộ bảy câu hỏi bàn ăn. Không nhắc chuyện học.”' },
    { t: '7 · Điều chưa đủ dữ liệu để nói', n: 'Bắt buộc phải có. Trang nào không có mục này là trang đã kết luận vượt quá thứ mình biết.',
      vi: 'Ví dụ: “Chưa biết cháu ứng xử thế nào khi làm việc nhóm — chưa quan sát được lần nào.”' }
  ];

  G.CT_DOC_CA_LUAT = [
    '*Một trang. Đúng một trang.* Dài hơn là người ta không đọc, và cũng là dấu hiệu mình đang lấp chỗ chưa biết bằng chữ.',
    'Không chẩn đoán. Không dùng từ của y khoa hay tâm lý lâm sàng — không “tăng động”, không “rối loạn”, không “trầm cảm”.',
    'Không dán nhãn tính cách. Ghi *hành vi quan sát được*, không ghi “cháu lười”, “cháu bướng”.',
    'Mục 7 là mục bắt buộc và không được để trống.',
    'Gia đình giữ bản gốc. Hệ giữ bản sao. Không mua gì thì bản gốc vẫn là của họ.',
    'Người viết ký tên. Bản đọc ca không có tên người viết là bản không ai chịu trách nhiệm.'
  ];

  /* ── 3 · Giáo án buổi 1 khoá nền · 90 phút ───────────────────
     Chạy được từng phút. Chỗ nào cần nói đúng lời thì ghi nguyên văn. */
  G.CT_GIAO_AN = [
    { p: '00–05', t: 'Đón từng người ở cửa', ai: 'Coach',
      n: 'Đứng ở cửa, bắt tay hoặc chạm vai từng em, gọi đúng tên và nói một chi tiết riêng đã học thuộc trước.',
      loi: '“Chào Minh. Thầy nghe nói em có quyển truyện 40 trang — hôm nay mang theo không?”',
      hong: 'Coach ngồi sẵn trong phòng và chỉ ngẩng lên. Buổi đã hỏng từ phút đầu.' },
    { p: '05–15', t: 'Vòng mở — mỗi người một câu', ai: 'Cả nhóm',
      n: 'Ngồi vòng tròn, không bàn. Mỗi em nói: tên, và một việc em làm được mà người ở đây chưa biết. Coach nói cuối cùng, không nói đầu.',
      loi: '“Không cần việc to. Việc nhỏ mà thật thì hơn việc to mà kể lại.”',
      hong: 'Có em không nói được và bị bỏ qua. Phải quay lại em ấy cuối vòng, hỏi một câu dễ hơn.' },
    { p: '15–25', t: 'Đưa mười điều luật', ai: 'Coach',
      n: 'Phát bản in. Đọc to từng điều, dừng ở điều 3 và điều 7 — hai điều hay bị vi phạm nhất — và hỏi “điều này nghĩa là gì?”',
      loi: '“Luật ở đây không phải để phạt. Luật ở đây là để em biết mình trông chờ được điều gì ở người khác.”',
      hong: 'Đọc một lèo cho xong. Không em nào nhớ được điều nào.' },
    { p: '25–40', t: 'Ba tình huống vi phạm — cả nhóm cùng xử', ai: 'Cả nhóm',
      n: 'Ba tình huống có thật, đã ẩn tên. Chia ba nhóm nhỏ, mỗi nhóm bàn một tình huống 5 phút rồi trình bày cách xử.',
      loi: '“Nhóm em xử thế nào? Và người bị xử sẽ thấy thế nào?” — luôn hỏi vế thứ hai.',
      hong: 'Coach nói ra đáp án đúng. Việc của Coach ở đây là ghi lại, không phải phán.' },
    { p: '40–50', t: 'Giải lao có việc', ai: 'Tự do',
      n: 'Mười phút. Không phát điện thoại. Trên bàn để sẵn giấy bút và một câu hỏi viết to trên bảng.',
      loi: 'Câu trên bảng: “Nếu chi hội này thiếu một người như em thì thiếu mất cái gì?”',
      hong: 'Giải lao thành mười phút chết. Câu hỏi trên bảng chính là thứ giữ nhịp.' },
    { p: '50–65', t: 'Trao huy hiệu và thẻ tên', ai: 'Coach + cả nhóm',
      n: 'Gọi từng em lên. Gài huy hiệu lên áo, không đưa vào tay. Cả nhóm vỗ tay. Em nhận nói một câu: “Em vào đây để…”',
      loi: '“Câu này em nói hôm nay, và ba tháng nữa thầy sẽ đọc lại cho em nghe.” — và phải nhớ làm thật.',
      hong: 'Phát hàng loạt cuối buổi cho nhanh. Nghi thức mất thì hiện vật cũng mất theo.' },
    { p: '65–80', t: 'Việc về nhà — giao cụ thể', ai: 'Coach',
      n: 'Mỗi em viết ra giấy: sẽ kể cho ai ở nhà nghe, kể lúc nào, và xin gia đình một câu cam kết ủng hộ. Ghi tên người sẽ kể.',
      loi: '“Không phải kể cho cả nhà. Chọn *một người*. Ai khó kể nhất thì chọn người ấy.”',
      hong: 'Giao chung chung “về kể cho gia đình nghe”. Không ai làm.' },
    { p: '80–88', t: 'Vòng đóng — một câu mỗi người', ai: 'Cả nhóm',
      n: 'Đứng dậy, vòng tròn. Mỗi em một câu: điều em nhớ nhất buổi hôm nay. Coach nói cuối, nhắc lại tên ba em và điều họ vừa nói.',
      loi: '“Thầy nhớ Minh nói… , Lan nói… , Hùng nói…” — nhớ được tên và lời là thứ giữ người ở lại.',
      hong: 'Kết bằng “thôi hôm nay tới đây nhé, tuần sau gặp lại”.' },
    { p: '88–90', t: 'Tiễn ra cửa', ai: 'Coach',
      n: 'Đứng ở cửa như lúc đón. Nói riêng với ít nhất hai em một câu cụ thể về việc em ấy làm trong buổi.',
      loi: '“Lúc nãy em bênh bạn trong tình huống 2. Thầy có thấy.”',
      hong: 'Ngồi lại dọn phòng và để các em tự ra về.' }
  ];

  G.CT_GIAO_AN_DUNG = [
    'Bản in mười điều luật, một bản cho mỗi em',
    'Huy hiệu B1 và thẻ tên, đã ghi sẵn tên từng em bằng tay',
    'Ba tình huống vi phạm in ra, đã ẩn tên thật',
    'Giấy A5 và bút cho phần việc về nhà',
    'Bảng và bút viết bảng cho câu hỏi giờ giải lao',
    'Danh sách chi tiết riêng của từng em — Coach học thuộc TRƯỚC buổi, không mang theo đọc'
  ];

  /* ── 4 · Bốn kịch bản gọi điện ─────────────────────────────── */
  G.CT_KICH_BAN = [
    { ma: 'GĐ-1', t: 'Gọi lại sau buổi tư vấn đầu', khi: 'Đúng bảy ngày sau, không sớm hơn', ai: 'Người đã ngồi nghe', mau: '#185AB4',
      mo: '“Chào chị. Em gọi hỏi thăm về việc nhỏ hôm trước mình bàn — chị thử chưa ạ?”',
      giua: ['Nghe họ kể. Không ngắt, không chốt.',
             'Hỏi đúng một câu về *con*: “Cháu phản ứng thế nào ạ?”',
             'Nếu họ chưa làm: “Vâng, tuần bận thì bình thường ạ. Chị thử một bữa thôi cũng được.”'],
      ket: '“Em không hỏi gì thêm đâu ạ. Khi nào chị muốn bàn tiếp thì gọi em.”',
      cam: 'Không hỏi “anh chị quyết chưa ạ”. Không nhắc học phí. Không nói “ưu đãi sắp hết”.' },

    { ma: 'GĐ-2', t: 'Gọi khi con vắng không báo', khi: 'Trong 24 giờ', ai: 'Coach kèm, không phải lễ tân', mau: '#0B6675',
      mo: '“Chào chị, em là… Hôm nay không thấy cháu, em gọi hỏi cháu có ổn không ạ?”',
      giua: ['Hỏi sức khoẻ TRƯỚC, hỏi lý do SAU. Thứ tự này quan trọng hơn người ta tưởng.',
             'Nếu con ổn: xin nói chuyện trực tiếp với con một phút.',
             'Với con: “Hôm nay vắng em, tổ thiếu người ở phần…” — nói con thiếu chỗ nào, không hỏi vì sao vắng.'],
      ket: '“Tuần sau tổ vẫn giữ chỗ cho em nhé.”',
      cam: 'Không nhắc nội quy. Không nói “vắng nhiều sẽ không theo kịp”. Không nhắn tin thay cho gọi.' },

    { ma: 'GĐ-3', t: 'Gọi tuần 3 — trước khi phụ huynh kịp phàn nàn', khi: 'Tuần thứ ba của chu kỳ', ai: 'Coach kèm', mau: '#A8801F',
      mo: '“Chào chị. Tuần này là tuần thứ ba — tuần khó nhất của mọi chu kỳ, nên em chủ động gọi trước.”',
      giua: ['Nói thẳng: hết hào hứng, chưa thấy kết quả. Đây là chỗ mọi gia đình đều đi qua.',
             'Kể *một việc cụ thể* con đã làm trong ba tuần, có ngày.',
             'Hỏi: “Ở nhà chị thấy chỗ nào chưa ổn ạ?” rồi im lặng chờ.'],
      ket: '“Tuần 6 em sẽ gửi bảng đối chiếu con với chính con ngày đầu. Lúc đó mình nhìn số.”',
      cam: 'Không hứa kết quả. Không nói “cháu tiến bộ lắm” nếu không có việc cụ thể để kể.' },

    { ma: 'GĐ-4', t: 'Gọi khi con muốn nghỉ', khi: 'Ngay khi có dấu hiệu, không đợi đơn', ai: 'Coach — gọi CHO CON trước', mau: '#BE0E16',
      mo: '“Chào em. Thầy gọi cho em, không gọi cho bố mẹ. Thầy hỏi thật một câu thôi.”',
      giua: ['“Chỗ nào ở đây làm em thấy khó chịu nhất?” — rồi **im lặng**, chờ đủ lâu.',
             'Nghe hết. Không giải thích, không bênh vực chỗ mình.',
             'Đối chiếu với sáu lý do đã biết. Chọn đúng lý do rồi mới nói tiếp.'],
      ket: '“Thầy sẽ sửa đúng chỗ đó. Em cho thầy hai tuần, rồi em quyết.”',
      cam: 'Không nói tới học phí. Không hứa giảm giá. Không nhờ bố mẹ thuyết phục con.' }
  ];

  G.CT_GOI_LUAT = [
    'Gọi, không nhắn. Việc nào nhắn tin được thì không cần kịch bản.',
    'Người gọi phải là người **có mặt trong câu chuyện** — người đã ngồi nghe, người đang kèm. Không phải tổng đài.',
    'Chuẩn bị trước *một chi tiết riêng* về con, và nói nó trong ba mươi giây đầu.',
    'Sau mỗi câu hỏi, **im lặng đếm tới bảy**. Người lớn hay lấp chỗ trống bằng lời của chính mình.',
    'Ghi lại sau cuộc gọi: ngày giờ, ai nghe máy, một câu nguyên văn của họ. Ba dòng, không hơn.',
    'Không gọi sau 20 giờ, không gọi giờ ăn, không gọi khi mình đang bực.'
  ];

  /* ── 5 · Năm lá thư mẫu ──────────────────────────────────── */
  G.CT_THU = [
    { ma: 'T-1', t: 'Thư tuần gửi phụ huynh', khi: 'Trước 20 giờ Chủ nhật, mỗi tuần con có học', mau: '#185AB4',
      cau: ['*Dòng 1 — việc con làm được:* tên con + việc cụ thể + ngày. Không tính từ.',
            '*Dòng 2 — chỗ con vướng:* mô tả hành vi, không mô tả tính cách.',
            '*Dòng 3 — tuần tới nhà giúp gì:* một việc, làm được ngay, không cần mua gì.'],
      vd: 'Chị ơi,\nThứ Tư Minh nhận ghế thư ký buổi, ghi biên bản đủ cả bảy cột và nộp đúng giờ — lần đầu em ấy làm việc này.\nChỗ vướng: em ấy chưa dám hỏi lại khi nghe không rõ, nên có hai dòng ghi sai.\nTuần tới ở nhà, khi Minh nghe không rõ mà đoán bừa, chị thử hỏi lại “con nghe được tới đâu?” thay vì nhắc lại cả câu.\nEm Nam.',
      cam: 'Không có tên con trong mọi câu là thư hỏng. Không quá chín dòng. Không gửi thư mẫu điền tên.' },

    { ma: 'T-2', t: 'Thư tay của Coach — đêm cuối trại', khi: 'Viết tay trong đêm cuối, con mở lúc về nhà', mau: '#A8801F',
      cau: ['Một *khoảnh khắc* Coach đã thấy, mà con tưởng không ai thấy.',
            'Một điều Coach tin con sẽ làm được, nói cụ thể, không nói chung.',
            'Một câu để con đọc lại khi khó — viết ngắn, để con nhớ được.'],
      vd: 'Minh,\nĐêm thứ hai, lúc cả tổ đã ngủ, thầy thấy em ngồi sửa lại cái bảng bị gãy chân. Không ai bảo em, và em cũng không kể với ai.\nThầy tin trong ba năm nữa em sẽ là người mà tổ tìm đến khi có việc hỏng.\nKhi nào em thấy mình không giỏi bằng ai, nhớ cái bảng đêm ấy.\nThầy Nam.',
      cam: 'Tuyệt đối không in. Chữ xấu vẫn hơn chữ máy. Không viết cùng một nội dung cho hai em.' },

    { ma: 'T-3', t: 'Thư xin lỗi khi hệ sai', khi: 'Trong 48 giờ kể từ khi xác định mình sai', mau: '#BE0E16',
      cau: ['Nói *mình đã sai gì*, có tên người, có ngày. Không dùng bị động cách.',
            'Không có chữ “nhưng”, không có “nếu quý phụ huynh cảm thấy”.',
            'Việc đã sửa + ngày + ai kiểm. Rồi mới tới lời xin lỗi thứ hai và thứ bù.'],
      vd: 'Chị ơi,\nBuổi thứ tư ngày 12, anh Nam đã không gọi lại cho chị như đã hứa. Đó là lỗi của anh Nam, và của em vì em không kiểm.\nEm đã làm: từ tuần này mọi cuộc gọi hứa với gia đình được ghi vào sổ và em rà mỗi thứ Sáu.\nEm xin lỗi chị. Cháu được một buổi kèm riêng, em đã xếp lịch thứ Bảy này, chị không phải trả thêm gì.\nEm Hoa, Quản lý chuyên môn.',
      cam: 'Không giải thích hoàn cảnh. Không kể mình bận. Không để người bị phàn nàn tự viết thư này.' },

    { ma: 'T-4', t: 'Thư mời người quyết trong nhà tới dự', khi: 'Khi phụ huynh nói “để bàn với nhà đã”', mau: '#0B6675',
      cau: ['Mời *đích danh* người chưa từng tới, không mời chung.',
            'Mời tới xem **con báo công**, không mời họp phụ huynh.',
            'Ghi rõ: bao lâu, làm gì, và không có phần bán hàng nào.'],
      vd: 'Kính gửi anh Tuấn,\nThứ Bảy này 15h, Minh sẽ trình bày trước tổ về việc em ấy làm trong ba tháng. Mỗi cháu nói mười phút, người lớn ngồi dưới nghe.\nEm mời riêng anh, vì Minh có nhắc tới anh khi nói về việc sửa đồ.\nBuổi này không có phần giới thiệu chương trình, không có phần học phí. Anh nghe xong rồi về.\nEm Nam.',
      cam: 'Không nhờ người đang ngồi “về nói giúp”. Không gửi kèm bảng giá.' },

    { ma: 'T-5', t: 'Thư chia tay khi gia đình dừng', khi: 'Trong tuần cuối, trước khi trao hộ chiếu', mau: '#5140B4',
      cau: ['Cảm ơn có *tên con và một việc cụ thể*. Không phải thư mẫu.',
            'Nói rõ: hộ chiếu là của con, bậc đã đạt giữ nguyên, quay lại lúc nào cũng được.',
            'Hỏi đúng một câu: “nếu được sửa một thứ ở đây, anh chị sửa gì?” — và ghi nguyên văn câu trả lời.'],
      vd: 'Chị ơi,\nCảm ơn chị đã cho Minh đi cùng chín tháng qua. Việc em ấy sửa cái bảng gãy ở trại, không ai bảo, là việc bọn em còn kể lại cho khoá sau.\nHộ chiếu này là của Minh, không phải của bọn em. Bậc B2 em ấy đã đạt thì giữ nguyên, quay lại lúc nào cũng được và không phải học lại.\nEm xin hỏi chị một câu thôi: nếu được sửa một thứ ở chỗ em, chị sửa gì ạ? Chị trả lời thế nào em cũng ghi lại đúng như vậy.\nEm Nam.',
      cam: 'Không mời tái tục. Không kèm ưu đãi quay lại. Không gọi làm phiền quá hai lần một năm sau đó.' }
  ];

  /* ── 6 · Ba cuốn sổ của học viên ─────────────────────────── */
  G.CT_BAN_DO_11 = [
    ['1', 'Tên em, và một điều em muốn người khác biết về mình', 'Mở đầu bằng quyền tự giới thiệu, không bằng lời người lớn giới thiệu'],
    ['2', 'Việc em làm tốt nhất', 'Bắt đầu từ chỗ mạnh. Trẻ nào cũng có, chỉ là chưa ai hỏi'],
    ['3', 'Việc em thấy khó nhất', 'Đặt ngay sau ô 2 để khó không bị đọc thành kém'],
    ['4', 'Người em phục nhất, và vì sao', 'Lộ ra giá trị con thật sự coi trọng — thường khác điều bố mẹ nghĩ'],
    ['5', 'Điều làm em vui nhất tuần qua', 'Neo vào tuần cụ thể, không hỏi chung chung'],
    ['6', 'Điều làm em bực nhất tuần qua', 'Chỗ này Coach đọc kỹ nhất trong cả bản đồ'],
    ['7', 'Một việc em muốn làm được trong 90 ngày', 'Đây là hạt của Goal Map. Phải là việc của em, không phải của bố mẹ'],
    ['8', 'Ai sẽ biết khi em làm được việc đó', 'Có người trông vào thì việc mới thật'],
    ['9', 'Việc nhỏ nhất em làm được ngay ngày mai', 'Bước đầu tiên phải nhỏ tới mức không thể lỡ'],
    ['10', 'Thứ dễ làm em bỏ cuộc nhất', 'Biết trước chỗ mình sẽ vấp là một nửa của việc không vấp'],
    ['11', 'Câu em tự nói với mình khi muốn bỏ cuộc', 'Con tự viết. Người lớn không được sửa câu này, dù nó vụng']
  ];

  G.CT_GOAL_MAP = [
    { t: 'Mục tiêu 90 ngày', n: 'Một câu, có động từ và có con số. “Học giỏi hơn” không phải mục tiêu.', vi: 'Ví dụ: “Vẽ xong và in được một quyển truyện 12 trang cho em gái.”' },
    { t: 'Vì sao của em', n: 'Lý do của chính em, viết bằng chữ của em. Nếu lý do là “vì bố mẹ muốn” thì dừng lại và làm lại ô này.', vi: 'Coach kiểm bằng một câu: “Nếu bố mẹ không biết em làm việc này, em còn làm không?”' },
    { t: 'Ba việc mỗi tuần', n: 'Ba việc, không hơn. Ghi thứ mấy làm, làm bao lâu.', vi: 'Quá ba việc là bảo đảm không làm được việc nào.' },
    { t: 'Ai kiểm', n: 'Tên một người cụ thể, và cách người ấy kiểm. Không ghi “bố mẹ”.', vi: 'Ví dụ: “Chị Lan hỏi mỗi tối Chủ nhật, xem đủ ba trang chưa.”' },
    { t: 'Bằng chứng sẽ có', n: 'Thứ nhìn thấy được khi xong. Ảnh, sản phẩm, chữ ký người nhận.', vi: 'Không có bằng chứng thì không tính, ở mọi bậc.' },
    { t: 'Ngày rà lại', n: 'Ngày 21 · 45 · 90. Ghi sẵn ba ngày ấy vào lịch ngay hôm viết.', vi: 'Ngày rà không ghi sẵn là ngày rà không bao giờ tới.' }
  ];

  G.CT_SO_PHUC_HOI = [
    { t: 'Chuyện gì đã xảy ra', n: 'Ghi việc, không ghi cảm giác. Ngày, giờ, ở đâu, có ai.', vi: 'Càng cụ thể thì đọc lại sau ba tháng càng dùng được.' },
    { t: 'Lúc đó trong đầu em nghĩ gì', n: 'Nguyên văn câu em tự nói với mình. Kể cả câu xấu.', vi: 'Đây là ô có giá trị nhất. Câu ta tự nói lúc vấp thường lặp lại y hệt ở lần vấp sau.' },
    { t: 'Em đã làm gì', n: 'Việc em làm ngay sau đó, kể cả bỏ đi, kể cả im lặng.', vi: 'Không phán xét, chỉ ghi.' },
    { t: 'Bao lâu thì em quay lại', n: 'Số giờ hoặc số ngày. *Đây là con số Coach theo dõi* — trục I6 đo chính con số này.', vi: 'Mục đích không phải là không vấp. Mục đích là quay lại nhanh hơn lần trước.' },
    { t: 'Lần sau em làm khác chỗ nào', n: 'Một chỗ thôi. Cụ thể, làm được.', vi: 'Ghi ba chỗ nghĩa là không ghi chỗ nào.' }
  ];

  G.CT_SO_LUAT = [
    'Ghi trong **24 giờ**. Để lâu thì câu mình tự nói lúc ấy đã bị viết lại thành câu dễ nghe hơn.',
    'Không ghi khi đang bực. Đợi hết bực rồi ghi, nhưng đừng để quá một ngày.',
    '*Người lớn không đọc sổ phục hồi trừ khi con cho đọc.* Đây là luật, và giữ được luật này thì sổ mới thật.',
    'Coach chỉ hỏi **một con số**: lần này bao lâu thì em quay lại? Không hỏi nội dung.',
    'Bản đồ 11 ô viết lại mỗi 90 ngày, giữ cả bản cũ. Đọc hai bản cạnh nhau là bằng chứng mạnh nhất của cả chu kỳ.',
    'Goal Map do con viết. Người lớn hỏi được, gợi được, nhưng không cầm bút.'
  ];

  /* ── 7 · Bộ câu hỏi phỏng vấn Coach ───────────────────────── */
  G.CT_PHONG_VAN = [
    ['Kể một lần anh chị dạy một đứa trẻ mà thất bại.', 'Có nhìn thấy phần lỗi của mình không', 'Kể được ca cụ thể, nhận phần của mình, nói được đã đổi gì sau đó', 'Đổ cho trẻ, cho gia đình, cho hoàn cảnh. Hoặc nói chưa từng thất bại'],
    ['Một đứa trẻ nói “con ghét cô”. Anh chị làm gì trong ba mươi giây đầu?', 'Phản xạ đầu tiên khi bị tấn công', 'Không phản ứng ngay, hỏi lại, hoặc để đó và tìm lúc riêng', 'Giải thích ngay, dỗ ngay, hoặc dùng quyền lực'],
    ['Phụ huynh nhắn lúc 22 giờ, giọng gay gắt. Anh chị làm gì?', 'Ranh giới và cách xử khi bị dồn', 'Không trả lời gấp trong lúc nóng, trả lời sáng hôm sau, gọi chứ không nhắn', 'Trả lời ngay bằng tin nhắn dài, hoặc phớt lờ luôn'],
    ['Kể một việc anh chị bền được trên một năm mà không ai bắt.', 'Trục Chủ và trục Chí của chính người dạy', 'Việc cụ thể, có bằng chứng, không liên quan tới nghề cũng được', 'Không kể được việc nào, hoặc kể việc do công ty yêu cầu'],
    ['Có em học rất chậm, cả tổ phải chờ. Anh chị xử thế nào?', 'Có coi tổ quan trọng hơn một người không, và ngược lại', 'Có phương án cụ thể giữ được cả hai, hoặc thừa nhận phải chọn và nói rõ vì sao', 'Bỏ em ấy lại, hoặc hy sinh cả tổ, mà không thấy đây là một lựa chọn khó'],
    ['Anh chị hiểu “không có bằng chứng thì không có điểm” nghĩa là gì?', 'Có chịu được sự khắt khe của hệ không', 'Nói được vì sao luật này bảo vệ chính đứa trẻ', 'Cho rằng như vậy là cứng nhắc, thiếu tình người'],
    ['Nếu tôi nói anh chị không được khen trẻ chung chung nữa, anh chị thấy sao?', 'Khả năng bỏ thói quen nghề đã ăn sâu', 'Hỏi lại để hiểu, thử nghĩ cách khen bằng việc cụ thể', 'Phản ứng phòng vệ, hoặc đồng ý quá nhanh mà không hiểu'],
    ['Kể một lần anh chị nhận sai với một đứa trẻ.', 'Trục Đức và trục Dũng', 'Có ca thật, có nói ra lời xin lỗi, kể được phản ứng của trẻ', 'Không có ca nào, hoặc coi việc xin lỗi trẻ là mất uy'],
    ['Ba tháng nữa, làm sao tôi biết anh chị đang làm tốt?', 'Có tự đặt ra thước đo được không', 'Nêu được chỉ số quan sát được, không nêu cảm nhận', 'Trả lời bằng “em sẽ cố gắng hết sức”'],
    ['Việc gì trong nghề này anh chị nghĩ mình sẽ không làm được?', 'Sự trung thực và khả năng tự biết giới hạn', 'Nói thật một điểm yếu cụ thể, và cách bù', 'Nói “không có gì”, hoặc nói một điểm yếu giả như “em quá cầu toàn”'],
    ['Anh chị sẽ ở một mình trong phòng kín với một đứa trẻ chứ?', 'Hiểu biết về ranh giới an toàn', 'Nói ngay là không, và biết vì sao', 'Thấy câu hỏi này lạ, hoặc cho rằng “mình đàng hoàng thì không sao”'],
    ['Nếu chúng tôi không nhận anh chị, anh chị muốn biết lý do gì nhất?', 'Cách người ấy đón nhận từ chối', 'Hỏi một câu cụ thể để học, giữ thái độ điềm tĩnh', 'Không quan tâm, hoặc phản ứng gay gắt']
  ];

  G.CT_PV_LUAT = [
    'Hai người phỏng vấn, một người hỏi một người ghi. Không phỏng vấn một mình.',
    'Ghi **nguyên văn** câu trả lời ở ba câu quan trọng nhất — câu 1, câu 8, câu 11. Không ghi cảm nhận.',
    'Câu 11 là câu loại thẳng: trả lời sai câu này thì dừng, không xét tiếp, dù mọi câu khác đều tốt.',
    'Sau phỏng vấn là **một buổi dạy thử có trẻ thật**, dự giờ theo chuẩn bảy cột. Không có buổi này thì không nhận.',
    'Lý lịch tư pháp phải có **trước** buổi dạy thử, không phải trước ngày ký hợp đồng.',
    'Không hỏi về tình trạng hôn nhân, dự định sinh con, tôn giáo, quê quán. Không liên quan và không được hỏi.'
  ];

  /* ── 8 · Bảng chấm cổng nghiệm thu chi tiết ─────────────────
     Sáu cột của cổng 100 điểm, mở ra thành thang chấm từng mức. */
  G.CT_CHAM = [
    { t: 'Dữ liệu', d: 15, mau: '#185AB4',
      muc: [['0–4', 'Thiếu quãng dài, hoặc có dấu hiệu ghi bù về sau'],
            ['5–9', 'Có nhưng đứt quãng; nhật ký và bảng số không khớp nhau'],
            ['10–12', 'Đủ và liên tục; còn một hai chỗ lệch nhỏ giải thích được'],
            ['13–15', 'Đủ, liên tục, ba nguồn khớp nhau: nhật ký · bảng số · Parent Log']] },
    { t: 'Cơ chế', d: 15, mau: '#5140B4',
      muc: [['0–4', 'Không nói được vì sao mình tiến bộ; quy cho may mắn hoặc cho người khác'],
            ['5–9', 'Nói được nhưng chung chung: “con chăm hơn”, “con quyết tâm”'],
            ['10–12', 'Chỉ ra được đòn bẩy đã dùng, nhưng chưa nối được với kết quả'],
            ['13–15', 'Chỉ đúng đòn bẩy, nối được với số liệu, và nói được nếu bỏ đòn bẩy ấy thì mất gì']] },
    { t: 'Năng lực', d: 20, mau: '#0B7350',
      muc: [['0–6', 'Không nhích mức nào ở trục trọng tâm'],
            ['7–12', 'Nhích một mức nhưng chỉ trong bối cảnh đã quen'],
            ['13–16', 'Nhích một mức và giữ được ở bài kiểm 24 giờ'],
            ['17–20', 'Nhích và **chuyển được sang bối cảnh mới** chưa từng luyện']] },
    { t: 'Tự chủ', d: 20, mau: '#0B6675',
      muc: [['0–6', 'Mức hỗ trợ không giảm, hoặc giảm thì kết quả tụt theo'],
            ['7–12', 'Hỗ trợ giảm một bậc, kết quả giữ trong thời gian ngắn'],
            ['13–16', 'Hỗ trợ giảm một bậc, kết quả giữ suốt ba tuần liền'],
            ['17–20', 'Hỗ trợ giảm từ hai bậc trở lên; em tự phát hiện và tự sửa khi chệch nhịp']] },
    { t: 'Bằng chứng thực tiễn', d: 20, mau: '#A8801F',
      muc: [['0–6', 'Chỉ có sản phẩm trong nội bộ hệ, không ai ngoài xác nhận'],
            ['7–12', 'Có xác nhận từ một môi trường'],
            ['13–16', 'Có xác nhận từ hai môi trường, có chữ ký người ngoài'],
            ['17–20', 'Hai môi trường trở lên, trong đó có M4 xã hội; người nhận nêu được tác động cụ thể']] },
    { t: 'Phẩm chất', d: 10, mau: '#BE0E16',
      muc: [['0–3', 'Chỉ có ấn tượng của người lớn, không có hành vi nào được chứng'],
            ['4–6', 'Một hai hành vi được chứng, rải rác'],
            ['7–8', 'Có hành vi được chứng ở ít nhất ba trong năm phẩm chất'],
            ['9–10', 'Đủ năm phẩm chất, mỗi phẩm chất ít nhất một hành vi có người ngoài chứng']] }
  ];

  G.CT_CHAM_LUAT = [
    'Chấm theo **bằng chứng đưa ra**, không theo hiểu biết của người chấm về em ấy. Assessor có thể chưa từng gặp em — đó là tính năng.',
    'Không có bằng chứng cho một mức thì lấy mức thấp hơn. Không “cho thêm vì em ấy cố gắng”.',
    'Hai cột nặng nhất là **Năng lực** và **Tự chủ**, mỗi cột 20 điểm. Một hồ sơ đẹp mà hai cột này thấp thì không đạt, và đó là đúng.',
    'Chấm xong nói riêng với gia đình *trước*, công bố sau.',
    'Dưới 85 không gọi là trượt. Gọi tên đúng cột thiếu điểm, và có ngay lịch làm lại.',
    'Người chấm ghi **một câu lý do cho mỗi cột**. Bảng điểm không có lý do là bảng điểm không dùng lại được ở chu kỳ sau.'
  ];

})(window.GV = window.GV || {});
