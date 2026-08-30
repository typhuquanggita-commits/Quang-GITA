/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · KHO TƯ VẤN VÀ ĐƯỜNG VÀO
   BIÊN SOẠN MỚI — chưa có trong kho gốc ở mức chi tiết.
   Cần Hội đồng Chuyên môn duyệt.

   Kho này không rút từ một tài liệu nguồn duy nhất. Nó được biên
   soạn mới để lấp một chỗ mỏng: nhóm 08 của hệ chỉ có mạch tư vấn
   ở mức tóm lược, trong khi đây là chỗ tiếp xúc đầu tiên với một
   gia đình — mỏng ở đây thì mọi thứ đi sau đều lệch.

   Kho bám hai nguyên tắc đã có sẵn của hệ và không được rời khỏi:
   mọi cam kết đều kèm *ngưỡng* và *khoản đền*; mọi gói đều có mục
   *không phù hợp với ai*. Vì vậy phần dài nhất và quan trọng nhất
   ở đây là phần khuyên gia đình đi nơi khác.

   Không lặp lại: mười hai phản đối ở kho GIÁ TRỊ, bảy câu hỏi bàn
   ăn và bốn kịch bản gọi ở kho CẦM TAY, mười hai cam kết dịch vụ
   ở kho TRẢI NGHIỆM, sáu bước đường vào ở kho CỘNG ĐỒNG.
   Kho này nối vào chúng, không viết lại chúng.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ── 1 · Mạch tư vấn — bảy chặng ─────────────────────────────
     Từ lần chạm đầu tới lúc gia đình quyết. Không chặng nào được
     bỏ và không chặng nào được đảo. Rút ngắn mạch này là cách
     chắc chắn nhất để ba tháng sau cả hai bên cùng thất vọng.
     `nam` ở đây là khoảng thời gian của chặng, không phải tuổi. */
  G.DV_MACH = [
    { ma: 'C0', t: 'CHẠM ĐẦU · người ta nghe tên', nam: '1–8 tuần trước cuộc gọi', mau: '#A8801F',
      hoi: 'Gia đình đã nghe tên hệ từ một người quen, nhưng chưa nói chuyện với ai bên trong.',
      lam: ['Người kể phải là một gia đình đang học hoặc một đại sứ — không phải tờ rơi. Người kể nói tên con mình và một việc con mình đã làm.',
            'Gửi một thứ dùng được ngay mà không phải mua gì: bộ bảy câu hỏi bàn ăn, hoặc một chuyên đề ngắn.',
            'Không xin số điện thoại ở lần chạm này. Để gia đình tự tìm tới.',
            'Ghi lại ba dòng: ai giới thiệu, ngày nào, và câu gia đình hỏi đầu tiên.'],
      dich: ['Một cái tên gắn với một câu chuyện có thật, không gắn với một lời quảng cáo',
             'Một thứ gia đình dùng được ngay trong tuần này, kể cả khi họ không bao giờ quay lại'],
      cong: 'Ở chặng này gia đình chưa có nhu cầu, họ mới có sự tò mò. Nhu cầu chỉ hiện ra khi trong nhà có một chuyện đủ khó.',
      rui: 'Ép chuyển sang bán ngay khi vừa có sự tò mò. Gia đình sẽ lịch sự rút lui, và người giới thiệu mất mặt với họ.' },

    { ma: 'C1', t: 'GỌI ĐẦU · mười lăm phút trên điện thoại', nam: 'Trong 4 giờ làm việc kể từ khi gia đình để lại số', mau: '#185AB4',
      hoi: 'Việc duy nhất của cuộc gọi này là xếp một cuộc hẹn. Không phải bán, và cũng không phải tư vấn.',
      lam: ['Gọi, không nhắn. Gọi trong 4 giờ làm việc — gọi sau một ngày thì tỉ lệ hẹn được rơi khoảng một nửa.',
            'Hỏi đúng ba câu: cháu bao nhiêu tuổi, chuyện gì làm anh chị gọi hôm nay, và ai trong nhà cùng quyết việc này.',
            'Nói rõ buổi gặp đầu dài bao lâu, có mất phí không, và những ai sẽ ngồi trong phòng.',
            'Nói trước một câu: hôm gặp mình chưa bàn tới gói nào cả.',
            'Nếu đứa trẻ không đi được thì dời hẹn. Không gặp gia đình mà thiếu đứa trẻ.'],
      dich: ['Một cuộc hẹn có ngày giờ, có đủ mặt người cùng quyết trong nhà, và có đứa trẻ',
             'Ba dòng ghi lại: tuổi con, chuyện làm họ gọi hôm nay, ai cùng quyết'],
      cong: 'Câu “chuyện gì làm anh chị gọi hôm nay” quan trọng hơn mọi câu khác. Người ta gọi vì một chuyện vừa xảy ra, không vì một nhu cầu chung chung.',
      rui: 'Tư vấn luôn trên điện thoại. Mười lăm phút nghe kể qua máy đủ để mình tưởng mình đã hiểu — đó là ảo giác nguy hiểm nhất của nghề này.' },

    { ma: 'C2', t: 'GẶP ĐẦU · chín mươi phút, ba bên cùng ngồi', nam: 'Một buổi, trong vòng 7 ngày kể từ cuộc gọi', mau: '#0B7350',
      hoi: 'Lần đầu gia đình, đứa trẻ và người tư vấn cùng ngồi trong một phòng.',
      lam: ['Nghe 70, nói 30. Ghi nguyên văn ba câu đắt nhất của phụ huynh và ba câu của cháu.',
            'Hỏi cháu trước khi hỏi bố mẹ, dù chỉ ba câu ngắn. Thứ tự này nói với cháu rằng cháu là người trong cuộc.',
            'Gặp riêng cháu mười lăm phút, ở nơi mở, nhìn thấy được.',
            'Dịch mọi tính từ thành hành vi quan sát được, ngay trước mặt cả nhà.',
            'Nói rõ một điều hệ không làm được, trước khi nói điều hệ làm được.',
            'Không tự mở phần học phí. Gia đình hỏi thẳng thì đưa bảng đầy đủ, công khai, không mặc cả.'],
      dich: ['Vấn đề được nói bằng hành vi có giờ, có chỗ, có số lần — không còn bằng tính từ',
             'Một bản đọc ca một trang, gia đình cầm về dù không học tiếp',
             'Một việc nhỏ gia đình làm được trong bảy ngày mà không phải mua gì'],
      cong: 'Đây là điểm chạm quyết định nhất của cả hành trình. Gia đình quyết trong buổi này, dù họ chưa nói ra và dù họ ký ở buổi khác.',
      rui: 'Kết luận sớm. Sau bốn mươi phút nghe, người tư vấn đã thấy một mô hình quen và bắt đầu kê đơn. Mô hình quen là kẻ thù lớn nhất của ca này.' },

    { ma: 'C3', t: 'ĐO · bộ test và bảy ngày quan sát', nam: '7–10 ngày', mau: '#5140B4',
      hoi: 'Chuyển từ lời kể sang dữ liệu. Chặng này không chữa gì cả.',
      lam: ['Học viên và phụ huynh làm hai bản riêng: không ngồi cạnh nhau, không bàn trước, không sửa cho nhau.',
            'Bảy ngày quan sát: gia đình ghi ba dòng mỗi tối, ghi thế nào để nguyên thế ấy.',
            'Đánh dấu chỗ hai bản lệch nhau nhiều nhất — đó là chỗ đáng nói nhất.',
            'Người tư vấn gọi một lần vào ngày thứ ba, hỏi đúng một câu về cháu rồi im lặng chờ.',
            'Không can thiệp gì trong bảy ngày này. Can thiệp là làm hỏng số nền.'],
      dich: ['Số nền trung thực, có trước mọi tác động',
             'Bảng lệch giữa bản của con và bản của bố mẹ',
             'Bảy dòng nhật ký do chính gia đình viết, bằng chữ của họ'],
      cong: 'Bảy ngày này có hai việc: tạo số nền, và cho gia đình thấy hệ này làm việc bằng cách nào trước khi họ trả một đồng nào cho chu kỳ.',
      rui: 'Gia đình sốt ruột và đòi bắt đầu ngay. Bỏ chặng đo là bỏ luôn khả năng chứng minh về sau rằng cháu đã đổi — và bỏ luôn cơ sở để xét bảo đảm chín mươi ngày.' },

    { ma: 'C4', t: 'ĐỌC · buổi định hướng cùng cả nhà', nam: 'Một buổi 60 phút, sau chặng đo 3–5 ngày', mau: '#185AB4',
      hoi: 'Trình bày bản đồ. Chưa trình bày gói.',
      lam: ['Cả nhà cùng dự, kể cả người chưa từng tới. Cháu ngồi cùng, không ngồi ngoài hành lang.',
            'Đọc theo đúng thứ tự: chỗ mạnh trước, chỗ nghẽn sau, chỗ chưa đủ dữ liệu để nói sau cùng. Mục cuối là mục bắt buộc.',
            'Đưa hai đường đi, không đưa một: một đường có hệ, một đường gia đình tự làm ở nhà. Nói cả cái giá của từng đường.',
            'Nói rõ điều hệ không nhận làm cho ca này, và trường hợp nào thì nên đi nơi khác.',
            'Để gia đình về nghĩ ít nhất một đêm. Không chốt trong buổi.'],
      dich: ['Gia đình nhìn thấy nhà mình trong tấm bản đồ, không nhìn thấy một bảng giá',
             'Hai đường đi và cái giá của mỗi đường',
             'Ba điều gia đình sẽ đổi, do chính gia đình nói ra và viết tay'],
      cong: 'Phần lớn phụ huynh chưa từng nghe ai nói về con mình bằng dữ liệu mà không kèm phán xét. Buổi này thường là lần đầu tiên.',
      rui: 'Biến buổi đọc bản đồ thành buổi giới thiệu gói. Làm thế một lần thì mọi câu mình đã nói trước đó bị đọc lại thành lời chào hàng.' },

    { ma: 'C5', t: 'THỬ · tuần thử ba buổi thật', nam: '7 ngày · 3 buổi', mau: '#9E470D',
      hoi: 'Cháu ngồi trong tổ thật, học đúng thứ cháu sẽ học, với đúng người sẽ kèm cháu.',
      lam: ['Không dàn dựng buổi trải nghiệm riêng. Cháu vào một tổ đang chạy.',
            'Người kèm trong tuần thử phải là người sẽ kèm cháu về sau. Đổi người là đổi cả cơ sở để gia đình quyết định.',
            'Ba tin nhắn ba dòng sau mỗi buổi: làm được gì, vướng gì, nhà giúp gì.',
            'Sau buổi thứ ba, hỏi cháu — không hỏi bố mẹ: chỗ nào ở đây em thấy khó chịu nhất. Rồi im lặng chờ.',
            'Hoàn 100% nếu gia đình thấy không hợp, không hỏi lý do, xử trong 3 ngày làm việc; quá hạn thì cộng thêm 10%.'],
      dich: ['Cháu biết mình sắp bước vào cái gì, không phải đoán',
             'Gia đình có ba mẩu bằng chứng để quyết, thay vì có một cảm giác',
             'Câu trả lời thật của cháu, ghi nguyên văn vào hồ sơ'],
      cong: 'Tuần thử có thu phí. Thu phí không phải để lấy tiền — thứ miễn phí thì cháu không đi đủ ba buổi, và phải đủ ba buổi mới biết được gì.',
      rui: 'Xếp cháu vào tổ dễ nhất, buổi hay nhất, người kèm giỏi nhất. Gia đình nhận ra khác biệt ở tuần thứ tư và mất lòng tin vào toàn bộ những gì đã nghe.' },

    { ma: 'C6', t: 'QUYẾT · gia đình chọn, hoặc không chọn', nam: '3–7 ngày sau buổi thử cuối', mau: '#BE0E16',
      hoi: 'Gia đình quyết. Người tư vấn im lặng nhiều hơn nói.',
      lam: ['Gửi một bản tóm tắt một trang: đã đo được gì, đề nghị gì, không nhận làm gì, đền gì nếu hệ sai.',
            'Hỏi thẳng đúng một câu: điều gì đang làm anh chị chưa quyết được.',
            'Nếu người cùng quyết trong nhà chưa gặp thì hẹn riêng hai mươi phút với đúng người ấy. Không nhờ người đang ngồi về nói giúp.',
            'Nếu gia đình nói chưa thì ghi ngày hẹn lại sau ba tuần và dừng đúng ở chỗ đó, trong danh dự.',
            'Không gọi quá hai lần sau khi gia đình đã nói chưa. Không gửi kèm bảng giá vào lần gọi ấy.'],
      dich: ['Một quyết định của gia đình, không phải một chữ ký lấy được',
             'Hồ sơ nhập hệ đủ mục, hoặc một cuộc hẹn lại có ngày cụ thể'],
      cong: 'Một gia đình nói “chưa” trong danh dự thường quay lại trong vòng một năm. Một gia đình bị ép nói “rồi” thường rời đi trong ba tháng và kể lại chuyện ấy với người khác.',
      rui: 'Hạn chót giả và ưu đãi sắp hết. Thủ thuật này chốt thêm được vài ca và giết chết nguồn tiến cử — nguồn duy nhất mà đầu tư vào không bao giờ lỗ.' }
  ];

  /* ── 2 · Ba mươi hai câu hỏi người tư vấn hỏi gia đình ────────
     Bốn nhóm: hiểu đứa trẻ · hiểu gia đình · hiểu kỳ vọng · thử
     ranh giới. Không hỏi hết trong một buổi. Chọn theo ca.
     Ô 4 là dấu hiệu gia đình hợp với hệ; ô 5 là dấu hiệu nên
     khuyên đi nơi khác — ô 5 mới là ô làm nên giá trị của bảng. */
  G.DV_CAU_HOI = [
    ['A1', 'Anh chị kể em nghe một ngày thường của cháu, từ lúc dậy tới lúc ngủ.',
     'Có giờ giấc cụ thể hay chỉ có tính từ. Có bao nhiêu khoảng thời gian không người lớn nào biết cháu đang làm gì.',
     'Kể được bằng giờ và bằng việc. Tự nhận ra vài khoảng trống mà trước nay chưa để ý.',
     'Không ai trong nhà kể nổi một ngày của cháu, và buổi tối không có người lớn nào ở nhà. Ca này cần một chỗ có người lớn thật trước khi cần một hệ rèn.'],
    ['A2', 'Việc gì cháu làm mà không cần ai nhắc?',
     'Có hay không một việc tự khởi. Chỉ cần một việc, kể cả việc người lớn cho là vô ích.',
     'Có ít nhất một việc, kể cả việc chơi. Đó là chỗ bám đầu tiên của cả phác đồ.',
     'Không một việc nào, kể cả việc chơi, kéo dài đã nhiều tháng, kèm mất hứng thú với thứ cháu từng thích. Đây là dấu hiệu cần khám chuyên khoa trước, không phải cần huấn luyện.'],
    ['A3', 'Lần gần nhất cháu tự quyết một việc là việc gì?',
     'Cháu còn được quyết gì không, và ai đang quyết hộ cháu.',
     'Có một việc, dù nhỏ. Bố mẹ kể được mà không kèm lời chê quyết định ấy.',
     'Mọi việc của cháu do người lớn quyết và gia đình không định đổi điều đó. Hệ này rèn tự quyết; không có chỗ cho tự quyết thì hệ không làm được gì.'],
    ['A4', 'Ở trường cháu thân với ai, giờ ra chơi cháu ngồi với ai?',
     'Có tên bạn hay không có tên nào. Bố mẹ biết chắc hay đang đoán.',
     'Có tên, dù chỉ một hai bạn. Có tên là có chỗ để rèn phần đội nhóm.',
     'Cháu bị cô lập kéo dài, có dấu hiệu bị bắt nạt hoặc sợ tới trường. Việc đầu tiên là làm việc với nhà trường và chuyên môn tâm lý, không phải ghi danh một chương trình.'],
    ['A5', 'Cháu bực nhất khi nào, và lúc bực thì cháu làm gì?',
     'Kiểu phản ứng: rút vào trong, cãi lại, hay bùng ra. Và có ai bị đau không.',
     'Mô tả được cơn bực bằng hành vi, và cơn ấy dừng lại được trong ngày.',
     'Có hành vi làm đau chính mình hoặc làm đau người khác. Chuyển tuyến ngay trong buổi, không nhận, không hẹn lại để cân nhắc.'],
    ['A6', 'Cháu đã bao giờ làm xong một việc kéo dài hơn một tháng chưa?',
     'Có bằng chứng về sức bền hay không. Nếu có thì việc ấy do ai chọn.',
     'Có một việc, và việc ấy do chính cháu chọn. Đây là bằng chứng cháu bền được khi được chọn.',
     'Gia đình không nhớ nổi việc nào và cũng không muốn cùng tìm — họ chỉ muốn nghe một kết luận. Chưa đủ mức hợp tác để bắt đầu.'],
    ['A7', 'Cháu có biết hôm nay mình tới đây để làm gì không? — hỏi trước mặt cháu và để cháu tự trả lời',
     'Cháu được nói trước hay bị đưa tới. Câu của cháu và câu của bố mẹ có khớp nhau không.',
     'Cháu biết, dù cháu không thích. Biết mà không thích vẫn tốt hơn nhiều so với không biết gì.',
     'Cháu bị nói dối để đưa tới đây. Dừng buổi tư vấn, nói thẳng với gia đình, hẹn lại sau khi cháu được nói thật.'],
    ['A8', 'Nếu được đổi một thứ ở nhà mình, em đổi gì? — hỏi riêng cháu',
     'Cháu có dám nói không, và điều cháu nói có nằm trong tầm gia đình sửa được không.',
     'Cháu nói ra được một điều cụ thể. Điều ấy rất thường là chìa khoá của cả ca.',
     'Cháu kể một chuyện có dấu hiệu mất an toàn trong nhà. Việc của mình là báo theo quy trình bảo vệ trẻ em, không phải tư vấn một khoá học.'],

    ['B1', 'Trong nhà, ai sẽ là người ngồi cùng cháu mỗi tuần?',
     'Có tên một người thật hay không. Người ấy có mặt trong buổi này không.',
     'Có tên, và người ấy đang ngồi đây. Đây là điều kiện gần như quyết định kết quả chín mươi ngày.',
     'Không ai nhận, và gia đình muốn gửi hẳn cháu cho hệ. Hệ này không nhận vai trò thay cha mẹ — nói thẳng ngay trong buổi đầu.'],
    ['B2', 'Hai anh chị có đang thống nhất về việc này không?',
     'Ai đang muốn, ai đang chiều theo. Một người nói suốt, một người im suốt.',
     'Cả hai nói được lý do của mình, kể cả khi hai lý do khác nhau.',
     'Một người phản đối rõ và người kia định làm sau lưng. Vào hệ trong tình trạng ấy là đặt đứa trẻ vào giữa hai người lớn — nên dừng.'],
    ['B3', 'Khi cháu làm sai, ở nhà xử thế nào?',
     'Có luật hay tuỳ cơn. Hình phạt là gì, và ai là người ra hình phạt.',
     'Có một cách xử tương đối ổn định, và bố mẹ dám kể cả phần mình xử chưa hay.',
     'Xử bằng đòn roi, bỏ đói hoặc bỏ mặc, và gia đình cho đó là bình thường. Không nhận cho tới khi phần này đổi; có dấu hiệu bạo hành thì báo theo quy trình.'],
    ['B4', 'Một tuần nhà mình ăn cơm cùng nhau được mấy bữa?',
     'Số bữa thật và ai thường vắng. Đây là chỉ số rẻ nhất về thời gian chung của cả nhà.',
     'Từ ba bữa trở lên, hoặc dưới ba nhưng gia đình sẵn sàng dịch lịch để có thêm.',
     'Không bữa nào, và không ai định đổi. Phần việc nhà hằng tuần của hệ sẽ không có chỗ để chạy.'],
    ['B5', 'Ở nhà ai là người cháu chịu nghe nhất?',
     'Người có ảnh hưởng thật — thường không phải người đang nói nhiều nhất trong buổi này.',
     'Có một người, và người ấy sẵn sàng dự ít nhất một buổi.',
     'Người cháu nghe nhất lại là người phản đối việc này. Thuyết phục vòng qua người khác chỉ tạo thêm xung đột trong nhà.'],
    ['B6', 'Nhà mình đã cho cháu học ở đâu rồi, và vì sao dừng?',
     'Lịch sử các lần đã thử. Lý do dừng nói về gia đình nhiều hơn nói về nơi cũ.',
     'Kể được lý do cụ thể, không kèm lời chỉ trích toàn bộ ngành.',
     'Đã đổi bốn năm nơi trong hai năm, mỗi nơi vài tuần. Vào đây rất có thể chỉ là lần thứ sáu — phải nói điều đó ra trước khi nhận.'],
    ['B7', 'Nếu ba tháng nữa chưa thấy gì thay đổi, nhà mình sẽ làm gì?',
     'Họ có kế hoạch cho tình huống xấu không, hay chỉ có kỳ vọng.',
     'Trả lời được, và câu trả lời bao gồm cả phần việc gia đình phải làm.',
     'Câu trả lời là đổi ngay sang nơi khác. Ca này chưa sẵn sàng cho một chu kỳ chín mươi ngày.'],
    ['B8', 'Trong nhà có chuyện gì đang xảy ra mà cháu bị ảnh hưởng không?',
     'Bệnh tật, mất mát, ly thân, chuyển nhà, mất việc. Hỏi nhẹ, hỏi một lần, không đào.',
     'Gia đình nói được, và chuyện ấy đã qua giai đoạn cấp.',
     'Nhà đang trong biến cố cấp: tang, ly hôn đang tranh chấp, người thân bệnh nặng. Khuyên hoãn ba tới sáu tháng và giữ liên lạc, không ghi danh.'],

    ['C1', 'Ba tháng nữa, anh chị muốn nhìn thấy điều gì khác đi trong nhà?',
     'Kỳ vọng nói bằng hành vi hay bằng tính từ. Có đo được không.',
     'Nói được một hành vi cụ thể: cháu tự dậy đúng giờ, bớt một trận cãi mỗi tuần.',
     'Kỳ vọng là điểm số tăng trong ba tháng. Hệ này không dạy môn học — nói thẳng và giới thiệu sang nơi dạy đúng môn ấy.'],
    ['C2', 'Anh chị đo bằng gì thì biết là được?',
     'Họ có chấp nhận một thước đo không, hay chỉ tin cảm giác từng tuần.',
     'Chấp nhận một thước đo cụ thể và chịu ghi lại hằng tuần.',
     'Không chấp nhận thước đo nào và sẽ đánh giá bằng cảm giác. Không có cách nào làm họ hài lòng, và cũng không có cách nào bảo vệ đội kèm.'],
    ['C3', 'Điều gì làm anh chị lo nhất khi nghĩ tới việc cho cháu tham gia?',
     'Nỗi lo thật thường không phải học phí. Thường là sợ cháu bị so sánh hoặc thêm áp lực.',
     'Nói được nỗi lo, và chịu bàn về cách xử nỗi lo ấy.',
     'Nỗi lo là cháu sẽ cãi lại nhiều hơn khi biết tự quyết. Nếu gia đình muốn con vâng lời chứ không muốn con tự quyết thì hệ này đi ngược mong muốn của họ.'],
    ['C4', 'Nếu cháu tiến chậm hơn các bạn cùng tổ, anh chị sẽ thấy thế nào?',
     'Mức chịu đựng của gia đình với nhịp riêng của con mình.',
     'Trả lời được rằng mình sẽ so con với chính con. Chấp nhận được nhịp chậm.',
     'Gia đình sẽ ép cháu bằng mọi giá cho bằng bạn. Ca này sẽ tạo ra một tổn thương mới trên nền tổn thương cũ.'],
    ['C5', 'Anh chị mong cháu học được điều gì mà ở trường không dạy?',
     'Họ có nhìn ra một khoảng trống thật không, hay chỉ muốn cháu bận rộn hơn.',
     'Nêu được một khoảng trống cụ thể: nhận việc, giữ lời, đứng lên sau khi hỏng.',
     'Mục tiêu là lấp kín lịch của cháu vì cháu đang ở nhà một mình. Đây là nhu cầu trông trẻ, và nên gọi đúng tên như vậy.'],
    ['C6', 'Mỗi tuần nhà mình dành được bao nhiêu thời gian cho việc này?',
     'Con số giờ thật, gồm cả giờ của bố mẹ chứ không chỉ giờ của cháu.',
     'Có ít nhất một buổi cho cháu và ba mươi phút cho người lớn mỗi tuần.',
     'Gia đình chỉ đưa đón và không có phút nào tham gia. Kết quả chín mươi ngày phụ thuộc phần việc nhà; không có phần ấy thì đừng bán chu kỳ.'],
    ['C7', 'Nếu tuần thứ ba cháu nói cháu không muốn học nữa, anh chị sẽ làm gì?',
     'Ai thật sự quyết trong nhà này, và họ định xử thế nào với chuyện gần như chắc chắn sẽ xảy ra.',
     'Trả lời rằng sẽ hỏi cháu vì sao và cùng bàn với đội kèm trước khi quyết.',
     'Trả lời rằng sẽ ép cháu đi vì đã đóng tiền rồi. Học phí trở thành lý do ép — đó là cách làm hỏng một đứa trẻ nhanh nhất.'],
    ['C8', 'Anh chị mong đội kèm báo lại theo cách nào, bao lâu một lần?',
     'Kỳ vọng về mật độ liên lạc. Đây là nguồn phàn nàn phổ biến nhất về sau.',
     'Chấp nhận ba dòng sau mỗi buổi và một thư tuần. Không đòi báo cáo mỗi ngày.',
     'Đòi được nhắn bất kỳ giờ nào và phải trả lời tức thì. Cam kết của hệ là 4 giờ làm việc; hứa hơn thế là hứa một thứ sẽ vỡ.'],

    ['D1', 'Có điều gì anh chị mong ở đây mà em nghĩ mình không làm được — em nói trước được không?',
     'Phản ứng khi bị nói không. Đây là phép thử rẻ nhất về mức hợp tác về sau.',
     'Gia đình cảm ơn vì được nói trước, và hỏi thêm về giới hạn ấy.',
     'Gia đình khó chịu vì mình không nhận hết. Ca này sẽ phàn nàn ở mọi giới hạn về sau, và giới hạn thì hệ có nhiều.'],
    ['D2', 'Nếu em nói ca này nên đi nơi khác thì anh chị nghĩ sao?',
     'Họ tới để tìm giải pháp, hay tới để tìm một lời xác nhận cho quyết định đã có.',
     'Hỏi lại: nơi nào và vì sao. Đó là gia đình đặt con lên trước.',
     'Trả lời rằng đã đi nhiều nơi rồi, ở đây phải nhận. Áp lực này không mất đi sau khi ký, nó chỉ chuyển sang đội kèm.'],
    ['D3', 'Anh chị có sẵn sàng để cháu thất bại một lần trong tổ không?',
     'Mức chịu đựng với thất bại có kiểm soát — nguyên liệu chính của cả phương pháp.',
     'Đồng ý, và hỏi thêm ai sẽ đỡ cháu sau lần thất bại ấy.',
     'Yêu cầu bảo đảm cháu luôn được khen và không bao giờ bị chê. Đó là một chương trình khác, không phải chương trình này.'],
    ['D4', 'Nếu cháu nói với em một điều cháu chưa muốn kể với anh chị, em giữ kín trong giới hạn an toàn — anh chị đồng ý chứ?',
     'Gia đình có cho con một khoảng riêng không, và họ hiểu giới hạn an toàn tới đâu.',
     'Đồng ý và hỏi giới hạn an toàn gồm những gì. Hỏi được câu ấy là gia đình đã hiểu việc.',
     'Yêu cầu được nghe lại mọi câu cháu nói. Không nhận điều kiện ấy — cháu sẽ không nói gì thật, và cả hệ mất chỗ đứng.'],
    ['D5', 'Anh chị có định nhắc lại chuyện học phí trước mặt cháu không?',
     'Học phí có bị dùng làm đòn bẩy với đứa trẻ hay không.',
     'Nhận ra vấn đề ngay và đồng ý không nhắc trước mặt cháu.',
     'Cho rằng cháu phải biết bố mẹ tốn bao nhiêu để mà cố. Món nợ ấy đè lên cháu suốt chu kỳ và làm hỏng mọi kết quả đo được.'],
    ['D6', 'Ở đây cháu lên bậc bằng bằng chứng, không bằng số buổi và không bằng học phí. Anh chị thấy sao?',
     'Phản ứng với luật tiền không mua bậc — luật trùm lên toàn hệ.',
     'Thấy hợp lý, và hỏi tiếp bằng chứng gồm những gì.',
     'Vẫn hỏi có cách nào cho cháu lên nhanh hơn không, sau khi đã nghe giải thích một lần. Nên dừng ở đây.'],
    ['D7', 'Có ai trong nhà từng nói việc này là lãng phí tiền không?',
     'Sự phản đối ngầm trong nhà — thứ sẽ nổ ra vào khoảng tuần thứ bảy.',
     'Nói ra được, và đồng ý mời người ấy dự một buổi cháu báo công.',
     'Giấu chuyện này với người ấy và định giấu tiếp. Vào hệ bằng một bí mật trong nhà là vào bằng một nền móng nứt.'],
    ['D8', 'Nếu em xin anh chị đổi một thói quen của người lớn trong nhà, anh chị đổi được không?',
     'Ai chịu đổi. Phần lớn tiến bộ chín mươi ngày đến từ chỗ này chứ không từ đứa trẻ.',
     'Hỏi lại là đổi cái gì, và nhận thử một tháng.',
     'Khẳng định người lớn không có gì phải đổi, chỉ đứa trẻ cần sửa. Hệ không chữa được một đứa trẻ trong một vòng lặp không đổi.']
  ];

  /* ── 3 · Khi nào nên khuyên gia đình đi nơi khác ──────────────
     Phần giá trị nhất của cả kho. Một hệ nhận mọi người là một hệ
     không có chuẩn. Mười hai trường hợp dưới đây không phải là
     danh sách từ chối — nó là danh sách chuyển đúng chỗ. */
  G.DV_KHONG_HOP = [
    { t: 'Khủng hoảng cấp · có nguy cơ với thân thể', mau: '#BE0E16',
      dh: 'Có hành vi tự làm đau, có ý định kết thúc, có bạo lực gây thương tích, hoặc cháu đang bỏ nhà đi.',
      can: 'Cấp cứu và chuyên khoa tâm thần nhi, ngay hôm nay. Không phải một chương trình rèn luyện.',
      lam: 'Dừng buổi tư vấn tại chỗ. Đưa số đường dây và tên cơ sở công lập gần nhất, gọi cùng gia đình nếu họ đồng ý. Ghi biên bản và báo quản lý chuyên môn trong ngày.',
      bay: 'Nhận vì thương, rồi giữ ca vài tuần cho tới khi tình hình rõ hơn. Mỗi tuần giữ là một tuần lấy mất của việc điều trị đúng.' },

    { t: 'Nghi ngờ rối loạn cần chẩn đoán y khoa', mau: '#BE0E16',
      dh: 'Dấu hiệu kéo dài trên sáu tháng và xuất hiện ở nhiều môi trường: mất tập trung nặng, khó đọc, khó nói, lo âu tới mức không tới trường được.',
      can: 'Một chẩn đoán từ người có chuyên môn và có giấy phép. Chưa có chẩn đoán thì mọi phác đồ đều là đoán.',
      lam: 'Nói thẳng rằng hệ không chẩn đoán và không được phép chẩn đoán. Đề nghị khám trước, giữ liên lạc, nhận lại sau khi có kết luận và có phần đồng hành phù hợp.',
      bay: 'Dùng từ của y khoa trong bản đọc ca. Một chữ viết ra bởi người không có giấy phép có thể đi theo đứa trẻ nhiều năm.' },

    { t: 'Gia đình đang trong biến cố cấp', mau: '#5140B4',
      dh: 'Tang trong nhà, ly hôn đang tranh chấp quyền nuôi, người thân bệnh nặng, vừa mất việc, vừa chuyển chỗ ở.',
      can: 'Thời gian và sự yên. Không phải một cam kết chín mươi ngày kèm việc nhà mỗi tuần.',
      lam: 'Khuyên hoãn ba tới sáu tháng. Gửi bộ bảy câu hỏi bàn ăn để gia đình dùng miễn phí. Hẹn gọi lại đúng một lần sau ba tháng.',
      bay: 'Nhận vì gia đình đang yếu và dễ đồng ý. Đây là lúc dễ bán nhất, và cũng là lúc bán sai gây hại nhiều nhất.' },

    { t: 'Gia đình đang tìm chỗ trông con', mau: '#A8801F',
      dh: 'Câu hỏi đầu tiên là mấy giờ tới mấy giờ, có ăn trưa không, có đưa đón không. Không có câu nào về cháu.',
      can: 'Một chỗ trông trẻ có người lớn, có bữa ăn, có giờ giấc. Đó là nhu cầu chính đáng và nên gọi đúng tên.',
      lam: 'Nói rõ hệ này không trông trẻ: có mặt vài giờ mỗi tuần và giao việc về nhà. Giới thiệu sang đúng loại dịch vụ, không kèm bình phẩm gì về nhu cầu của họ.',
      bay: 'Nhận rồi sáu tuần sau nghe câu “sao con vẫn phải làm việc ở nhà”. Đó là lỗi của người đã nhận, không phải của gia đình.' },

    { t: 'Chỉ một người trong nhà đồng ý', mau: '#185AB4',
      dh: 'Người kia không tới, không nghe máy, hoặc đã nói không. Người đang ngồi định làm mà không cho người kia biết.',
      can: 'Một cuộc nói chuyện trong nhà trước, không phải một hợp đồng.',
      lam: 'Đề nghị một buổi hai mươi phút với đúng người chưa đồng ý, hoặc mời họ dự một buổi cháu báo công. Không được thì dừng và hẹn lại.',
      bay: 'Ký với người đang ngồi cho xong việc. Ba tháng sau đứa trẻ đứng giữa hai người lớn, và hệ trở thành lý do của một trận cãi.' },

    { t: 'Gia đình đòi cam kết kết quả', mau: '#BE0E16',
      dh: 'Yêu cầu ghi vào hợp đồng rằng cháu sẽ tự giác, sẽ tăng điểm, sẽ hết nhút nhát.',
      can: 'Một chỗ dám nói không — để họ biết chỗ nào dám nói có.',
      lam: 'Đưa bảng cam kết dịch vụ: hệ chỉ cam kết những gì hệ làm — thời gian trả lời, sĩ số, người kèm đã kiểm định, hoàn phí, học lại. Không cam kết tính cách của một con người.',
      bay: 'Hứa mềm để giữ ca: “chắc chắn cháu sẽ khác”. Câu ấy sẽ được nhắc lại nguyên văn vào ngày thứ chín mươi.' },

    { t: 'Đứa trẻ bị đưa tới, không được nói trước', mau: '#9E470D',
      dh: 'Cháu không biết mình tới đâu, hoặc được nói là đi chơi. Cháu ngồi im, không nhìn ai, hoặc bỏ ra ngoài.',
      can: 'Được nói thật, và được từ chối một lần.',
      lam: 'Dừng phần tư vấn, nói với gia đình rằng buổi này không tiếp tục hôm nay. Hẹn lại sau khi cháu được nói thật và tự đồng ý tới nghe một lần.',
      bay: 'Tiếp tục vì gia đình đã đi xa tới đây. Ép ở buổi đầu thì mọi buổi sau đều bắt đầu từ mức âm.' },

    { t: 'Đã đổi năm sáu nơi trong hai năm', mau: '#5140B4',
      dh: 'Lịch sử toàn những lần bắt đầu ngắn. Mỗi nơi cũ đều bị kể là kém, và không lần nào là lỗi của nhà.',
      can: 'Nhìn lại vì sao các lần trước đứt, trước khi bắt đầu thêm một lần nữa.',
      lam: 'Nói thẳng nhận xét ấy ra. Chỉ nhận nếu gia đình đồng ý đi trọn một chu kỳ và đồng ý ghi lại lý do nếu dừng giữa chừng.',
      bay: 'Mừng vì có ca mới. Ca này rời đi ở tuần thứ năm và mang theo một câu chuyện xấu về mình.' },

    { t: 'Kỳ vọng chính là điểm số', mau: '#A8801F',
      dh: 'Mọi câu hỏi đều quay về thi cử và thứ hạng. Hỏi bao lâu thì điểm lên.',
      can: 'Một nơi dạy đúng môn ấy, và dạy tốt.',
      lam: 'Nói rõ hệ không dạy môn học và không hứa điểm. Nếu gia đình vẫn muốn thì chỉ nhận song song với việc học chính, và ghi vào hồ sơ rằng mục tiêu điểm số không thuộc phạm vi.',
      bay: 'Nói lấp lửng rằng học cái này rồi điểm cũng lên. Câu ấy đúng ở một số ca và sẽ bị đòi ở mọi ca.' },

    { t: 'Người lớn trong nhà không định đổi gì', mau: '#0B7350',
      dh: 'Câu nói lặp lại: chỉ cần sửa cháu, nhà thì vẫn thế. Từ chối mọi phần việc của phụ huynh.',
      can: 'Hiểu rằng phần lớn tiến bộ chín mươi ngày đến từ chỗ người lớn đổi trước.',
      lam: 'Nói ra bằng con số: phần việc nhà chiếm phần lớn kết quả, và bảo đảm chín mươi ngày không xét được nếu phần ấy trống. Đề nghị thử một tháng phần của phụ huynh trước, chưa ghi danh cho cháu.',
      bay: 'Nhận rồi tự nhủ sẽ thuyết phục dần. Chín mươi ngày sau, hệ nhận toàn bộ trách nhiệm cho một vòng lặp mà nó không được phép chạm vào.' },

    { t: 'Gia đình vượt khả năng chi trả', mau: '#185AB4',
      dh: 'Hỏi trả góp nhiều kỳ, hỏi vay, hoặc nói sẽ phải bán một thứ trong nhà.',
      can: 'Không phải một khoản giảm giá riêng. Cần một con đường giữ được lòng tự trọng.',
      lam: 'Giới thiệu quỹ học bổng có quy trình và có hội đồng. Trong lúc chờ, gửi phần dùng được miễn phí. Không giảm giá riêng và không gợi ý vay mượn.',
      bay: 'Giảm giá riêng để chốt. Việc ấy làm hỏng giá cho mọi gia đình khác, và biến ơn huệ thành một món nợ tình cảm.' },

    { t: 'Ca vượt năng lực của cơ sở đang có', mau: '#9E470D',
      dh: 'Cháu cần hỗ trợ đặc thù mà cơ sở không có người đủ chuyên môn, hoặc không còn chỗ trong tổ đúng lứa.',
      can: 'Một nơi có đúng người, hoặc một lịch hẹn thật khi có chỗ.',
      lam: 'Nói rõ mình thiếu gì. Đề nghị chuyển sang cơ sở khác trong hệ nếu có, hoặc ra ngoài hệ. Ghi vào sổ để bổ sung năng lực còn thiếu.',
      bay: 'Nhận trước rồi tính sau vì sợ mất ca. Nhận rồi trả về là tổn thương lần thứ hai, và nặng hơn lần đầu.' }
  ];

  /* ── 4 · Buổi gặp đầu tiên — chín mươi phút, mười tám mốc ─────
     Bản chi tiết dùng để đào tạo người tư vấn mới. Người đã làm
     quen tay vẫn phải giữ đúng bốn mốc: hỏi cháu trước, gặp riêng
     cháu, nói điều hệ không làm được, và chốt một việc nhỏ. */
  G.DV_BUOI_DAU = [
    { p: '00–03', m: 'Đón ở cửa, xếp chỗ ngồi. Cháu ngồi ngang hàng với người lớn, không ngồi lệch ra một góc.',
      ai: 'Người tư vấn, không nhờ lễ tân', y: 'Chỗ ngồi là câu đầu tiên mình nói với đứa trẻ, và mình nói nó trước khi kịp mở miệng.' },
    { p: '03–08', m: 'Mở và giao ước: buổi này để làm gì, và KHÔNG để làm gì. Nói rõ hôm nay chưa bàn tới gói nào.',
      ai: 'Người tư vấn', y: 'Câu “hôm nay mình chưa bàn tới gói nào cả” hạ toàn bộ hàng phòng thủ của cả nhà trong ba mươi giây.' },
    { p: '08–12', m: 'Hỏi cháu ba câu ngắn trước khi hỏi bố mẹ: em có biết hôm nay tới đây làm gì không, em thích làm gì nhất, và ai đưa em tới.',
      ai: 'Người tư vấn hỏi, cháu trả lời', y: 'Thứ tự này nói với cháu rằng cháu là người trong cuộc chứ không phải một hồ sơ đang được bàn.' },
    { p: '12–24', m: 'Nghe phụ huynh kể, không ngắt lời một lần nào. Ghi nguyên văn ba câu đắt nhất, trong ngoặc kép.',
      ai: 'Phụ huynh nói, người tư vấn ghi', y: 'Nghe 70 nói 30. Người tư vấn nói quá bốn mươi phần trăm thời lượng là buổi đã hỏng, dù nội dung có đúng.' },
    { p: '24–30', m: 'Dựng lại một ngày thường của cháu bằng giờ: dậy lúc mấy giờ, về nhà lúc mấy giờ, ngồi vào bàn lúc mấy giờ, ngủ lúc mấy giờ.',
      ai: 'Cả nhà cùng dựng', y: 'Khoảng thời gian không ai biết cháu làm gì thường là chỗ chứa cả vấn đề lẫn lời giải.' },
    { p: '30–36', m: 'Hỏi lịch sử: đã học ở đâu, vì sao dừng, cái gì làm anh chị thất vọng nhất.',
      ai: 'Người tư vấn', y: 'Lý do dừng ở nơi cũ dự báo lý do dừng ở đây. Nghe kỹ chỗ này tiết kiệm được ba tháng.' },
    { p: '36–44', m: 'Gặp riêng cháu tám phút, ở nơi mở và nhìn thấy được. Bố mẹ ngồi chờ trong tầm mắt.',
      ai: 'Người tư vấn và cháu', y: 'Cháu nói trước mặt bố mẹ thường khác cháu nói riêng. Nơi kín thì tuyệt đối không — đây là luật đỏ, không có ngoại lệ.' },
    { p: '44–48', m: 'Cháu làm mười một ô bản đồ của mình, người lớn không nhìn vào giấy.',
      ai: 'Cháu tự viết', y: 'Chữ của chính cháu là thứ được đọc lại nhiều nhất ở ngày thứ chín mươi.' },
    { p: '48–56', m: 'Dịch tính từ thành hành vi, ngay trước mặt cả nhà: “lười” thành “ngồi vào bàn lúc mấy giờ, đứng dậy mấy lần trong bốn mươi phút”.',
      ai: 'Người tư vấn dẫn, cả nhà cùng làm', y: 'Đây là khoảnh khắc gia đình lần đầu nhìn thấy sự thật mà không cãi nhau. Bỏ mốc này thì cả buổi chỉ còn là một cuộc than thở.' },
    { p: '56–62', m: 'Vẽ bốn cửa G · I · T · A lên giấy trước mặt họ, đặt từng dữ kiện vừa nghe vào đúng cửa.',
      ai: 'Người tư vấn vẽ tay, không chiếu slide', y: 'Vẽ tay chậm hơn và vì thế gia đình theo kịp. Slide làm người ta gật đầu mà không hiểu.' },
    { p: '62–66', m: 'Chỉ ra cửa nào mình CHƯA đủ dữ liệu để nói, và nói rõ vì sao chưa.',
      ai: 'Người tư vấn', y: 'Nói chỗ mình chưa biết tạo ra nhiều lòng tin hơn nói chỗ mình biết. Đây là mốc bị bỏ nhiều nhất và đắt nhất.' },
    { p: '66–70', m: 'Nói một điều hệ không làm được cho ca này, trước khi nói điều hệ làm được.',
      ai: 'Người tư vấn', y: 'Buổi tư vấn nào không có câu “chỗ này bọn em không làm” là buổi tư vấn chưa trung thực.' },
    { p: '70–74', m: 'Bốn câu thử ranh giới: ai ngồi cùng cháu mỗi tuần, ai chưa đồng ý trong nhà, có nhắc học phí trước mặt cháu không, và người lớn đổi được gì.',
      ai: 'Người tư vấn', y: 'Bốn câu này lọc ra gần hết những ca sẽ hỏng ở tuần thứ bảy. Hỏi ở đây rẻ hơn nhiều so với biết ở tháng thứ ba.' },
    { p: '74–78', m: 'Đưa hai đường đi: một đường có hệ, một đường gia đình tự làm ở nhà. Nói cả cái giá của từng đường.',
      ai: 'Người tư vấn', y: 'Đưa một đường là bán. Đưa hai đường là tư vấn. Gia đình cảm nhận được khác biệt ấy dù không gọi tên được.' },
    { p: '78–82', m: 'Bước tiếp theo: bộ test hai bản riêng và bảy ngày quan sát. Nói rõ bảy ngày ấy chưa chữa gì cả.',
      ai: 'Người tư vấn', y: 'Gia đình phải hiểu vì sao mình đo trước khi làm, nếu không họ sẽ thấy bảy ngày ấy là mất thời gian.' },
    { p: '82–86', m: 'Nhận câu hỏi của gia đình. Câu nào chưa trả lời được thì ghi lại và hẹn ngày trả lời.',
      ai: 'Cả nhà hỏi', y: 'Một câu “em chưa biết, thứ Năm em trả lời anh chị” đáng giá hơn mười câu trả lời trôi chảy mà mơ hồ.' },
    { p: '86–90', m: 'Chốt đúng một việc nhỏ làm ngay tối nay, không cần mua gì. Nếu gia đình chưa sẵn sàng thì dừng trong danh dự, hẹn lại sau ba tuần.',
      ai: 'Gia đình tự chọn việc, người tư vấn ghi lại', y: 'Ép một gia đình chưa sẵn sàng là mất họ vĩnh viễn. Để họ về với một việc làm được là giữ được cửa.' },
    { p: 'Trong 24 giờ sau buổi', m: 'Gửi bản đọc ca một trang. Bản gốc thuộc về gia đình kể cả khi họ không học tiếp.',
      ai: 'Người tư vấn viết, quản lý chuyên môn đọc lại trước khi gửi', y: 'Đây là thứ có giá trị độc lập mà gia đình cầm về. Gửi muộn hơn hai ngày thì nó mất gần hết sức nặng.' }
  ];

  /* ── 5 · Mười kịch bản trả lời câu khó ────────────────────────
     Khác với mười hai phản đối ở kho GIÁ TRỊ: đó là những câu
     gia đình dùng để từ chối; đây là những câu gia đình hỏi khi
     họ đang thật sự cân nhắc. Trả lời sai ở đây mất ca mà không
     ai biết vì sao mất. */
  G.DV_TRA_LOI = [
    { ma: 'TL-01', t: '“Bao lâu thì thấy kết quả?”', mau: '#185AB4',
      khi: 'Gần như luôn xuất hiện ở buổi gặp đầu, thường vào hai mươi phút cuối.',
      ai: 'Người tư vấn đã ngồi nghe, không phải người phụ trách tuyển sinh',
      mo: '“Câu này em phải trả lời bằng ba mốc, chứ không bằng một con số ạ.”',
      giua: ['Mốc 7 ngày: chưa có thay đổi ở cháu. Cái có được là số nền, và một việc nhỏ trong nhà đã đổi.',
             'Mốc 30 ngày: thường thấy được một hành vi nhỏ đổi — và thấy rõ nhất ở người lớn, vì phần đổi trước nằm ở người lớn.',
             'Mốc 90 ngày: có bảng đối chiếu cháu với chính cháu ngày đầu, từng trục một, kèm bằng chứng có người ngoài ký.',
             'Nói luôn phần không hứa được: nhích bao nhiêu mức thì không hứa, vì nó phụ thuộc cả phần việc ở nhà.'],
      ket: '“Em không hứa cháu sẽ thế nào. Em hứa tới ngày thứ chín mươi anh chị có một bảng để nhìn — và nếu đi đủ buổi mà không nhích mức nào thì học lại miễn phí.”',
      cam: 'Không nói “nhiều cháu chỉ sau một tháng đã khác hẳn”. Không lấy một ca đẹp làm mốc chung cho mọi ca.' },

    { ma: 'TL-02', t: '“Con tôi có gì đặc biệt không?”', mau: '#5140B4',
      khi: 'Sau khi đọc bản đồ, hoặc ngay sau buổi test. Câu này thường mang theo một hy vọng lớn.',
      ai: 'Người đã đọc dữ liệu của cháu, không phải người chưa từng gặp cháu',
      mo: '“Em trả lời thật, và câu trả lời của em có hai phần ạ.”',
      giua: ['Phần một: nói một điều cụ thể mình đã quan sát được ở cháu, có ngày, có việc. Không nói chung chung.',
             'Phần hai: nói rõ đó mới là một *giả thuyết*, cần chín mươi ngày mới biết chắc.',
             'Đưa mục “chưa đủ dữ liệu để nói” trong bản đọc ca, và giải thích vì sao mục ấy bắt buộc phải có.',
             'Nếu gia đình muốn nghe những từ như năng khiếu đặc biệt: nói thẳng rằng mình không dùng những từ ấy, và vì sao không dùng.'],
      ket: '“Cháu có một chỗ đáng theo. Em chưa gọi nó là tài năng, vì gọi sớm thì cháu phải sống với cái tên ấy trước khi kịp lớn.”',
      cam: 'Không dán nhãn tài năng ở buổi đầu. Nhãn tốt cũng là nhãn, và nhãn nào cũng khoá một đứa trẻ lại.' },

    { ma: 'TL-03', t: '“Chỗ kia cũng có chương trình y hệt. Khác gì?”', mau: '#0B7350',
      khi: 'Khi gia đình đã đi xem hai ba nơi và đang đặt các bảng nội dung cạnh nhau.',
      ai: 'Người tư vấn — và chỉ được nói về chỗ mình',
      mo: '“Nội dung thì nhiều nơi giống nhau thật ạ. Em xin nói ba chỗ khác, và anh chị kiểm được cả ba.”',
      giua: ['Một: mỗi việc cháu làm phải có người ngoài hệ ký xác nhận mới được tính. Không có chữ ký thì không vào hộ chiếu, không lên bậc.',
             'Hai: người kèm cháu phải đạt ngưỡng dự giờ trong chín mươi ngày gần nhất, và anh chị xem được biên bản ấy.',
             'Ba: có bảng cam kết dịch vụ ghi rõ đền gì khi hệ sai, và có sổ phàn nàn đọc lại trong họp tháng.',
             'Gia đình hỏi nơi kia có mấy thứ đó không: “Em không biết, và em không nên nói thay họ. Anh chị hỏi họ đúng ba câu ấy ạ.”'],
      ket: '“Anh chị đi hỏi nơi kia ba câu đó rồi hãy quyết. Chọn nơi nào em cũng thấy ổn, miễn là chọn xong thì đi hết một chu kỳ.”',
      cam: 'Không nêu tên nơi khác. Không nói nơi khác thiếu gì. Chê một nơi là tự xếp mình vào cùng loại với nơi ấy.' },

    { ma: 'TL-04', t: '“Tôi bận lắm. Tôi có nhất thiết phải tham gia không?”', mau: '#A8801F',
      khi: 'Thường ở buổi định hướng, đúng lúc nghe tới phần việc nhà hằng tuần.',
      ai: 'Người tư vấn, nói trực tiếp với người bận — không nói qua người kia',
      mo: '“Em nói con số trước rồi mình bàn ạ.”',
      giua: ['Phần bắt buộc của phụ huynh là ba mươi phút mỗi tuần: đọc thư tuần, làm một việc nhà được giao, và trả lời ba dòng.',
             'Phần không bắt buộc: đưa đón, dự buổi, vào nhóm. Những thứ ấy tốt nhưng không phải điều kiện.',
             'Nói thật phần khó: nếu ba mươi phút ấy không có thì kết quả chín mươi ngày tụt rõ, và bảo đảm chín mươi ngày cũng không xét được.',
             'Đề nghị chia việc: người bận nhận phần đọc thư tuần, người kia nhận phần việc nhà. Cần có tên một người thật.'],
      ket: '“Anh chị cho em tên một người trong nhà nhận ba mươi phút ấy. Có tên là đủ để bắt đầu.”',
      cam: 'Không nói “anh chị cứ gửi cháu ở đây”. Không nhận ca khi không có tên người nào trong nhà đứng ra.' },

    { ma: 'TL-05', t: '“Con tôi nói con không đi.”', mau: '#BE0E16',
      khi: 'Trước buổi gặp đầu, hoặc vào giữa tuần thử.',
      ai: 'Coach sẽ kèm cháu — gọi cho cháu, không gọi cho bố mẹ',
      mo: '“Chào em. Thầy gọi cho em chứ không gọi cho bố mẹ. Thầy hỏi thật một câu thôi.”',
      giua: ['“Em không muốn đi vì chỗ này, hay vì đang có chuyện gì khác?” — rồi im lặng, chờ đủ lâu.',
             'Nghe hết. Không giải thích, không bênh vực chỗ mình, không nhắc một chữ nào tới học phí.',
             'Nói với cháu quyền mà cháu có: tới nghe một buổi rồi được từ chối, và không ai ép.',
             'Nói riêng với bố mẹ: nếu cháu vẫn không muốn thì hoãn — và hoãn không phải là thua.'],
      ket: '“Em tới đúng một buổi, nghe xong rồi em nói không cũng được. Thầy giữ đúng lời đó.”',
      cam: 'Không nhờ bố mẹ thuyết phục con. Không nhận một đứa trẻ bị ép, kể cả khi gia đình đã trả tiền.' },

    { ma: 'TL-06', t: '“Nếu con tôi không hợp với người kèm thì sao?”', mau: '#185AB4',
      khi: 'Buổi định hướng, hoặc tuần thứ hai của chu kỳ.',
      ai: 'Quản lý chuyên môn — không phải Coach đang bị nhắc tới',
      mo: '“Chuyện này có thật, và có đường xử sẵn ạ.”',
      giua: ['Gia đình được đổi người kèm một lần trong chu kỳ, không cần nêu lý do, không mất thêm phí.',
             'Có một số điện thoại tới thẳng quản lý chuyên môn, không đi qua Coach đang kèm.',
             'Người bị phàn nàn không phải người xử phàn nàn. Đây là luật của hệ, không phải thiện chí của ai.',
             'Nói luôn phần bất lợi: đổi người thì mất khoảng hai tuần để người mới đọc lại hồ sơ và quen cháu.'],
      ket: '“Anh chị không phải chịu đựng ai cả. Em chỉ xin hai tuần để người mới bắt nhịp.”',
      cam: 'Không bênh đồng nghiệp trước mặt gia đình. Không hỏi “cháu có nói chuyện này với ai khác không”.' },

    { ma: 'TL-07', t: '“Bên mình có bao nhiêu cháu đã thành công?”', mau: '#5140B4',
      khi: 'Từ phụ huynh làm nghề cần số, hoặc từ người đã bị hứa hẹn nhiều lần.',
      ai: 'Người tư vấn — chỉ được nói con số mà hệ thật sự đo và công bố',
      mo: '“Em xin trả lời bằng thứ em đo được, và nói rõ thứ em không đo được ạ.”',
      giua: ['Thứ hệ đo: tỉ lệ đi buổi, tỉ lệ ở lại sau chu kỳ đầu, số bằng chứng có chữ ký người ngoài, số ca qua từng cổng bậc.',
             'Thứ hệ không đo được: “thành công” của một đời người. Không ai đo được điều đó trong chín mươi ngày — ai nói đo được thì nên hỏi lại họ đo bằng gì.',
             'Đưa thứ kiểm được: một cuốn hộ chiếu đã che tên, sổ phàn nàn, và bảng cam kết dịch vụ có mục đền.',
             'Gia đình muốn nói chuyện với một nhà đang học: xếp được, nhưng phải hỏi ý nhà kia trước, và không chọn giúp ca đẹp nhất.'],
      ket: '“Em không có một con số thành công. Em có bằng chứng của từng cháu, và anh chị được xem một cuốn thật.”',
      cam: 'Không bịa tỉ lệ. Không lấy con số của một khoá lẻ để nói cho cả hệ. Không nói “gần như cháu nào cũng”.' },

    { ma: 'TL-08', t: '“Con tôi có bị so sánh với các bạn trong tổ không?”', mau: '#0B7350',
      khi: 'Từ phụ huynh có con từng bị xếp hạng và từng bị tổn thương vì việc đó.',
      ai: 'Coach kèm',
      mo: '“Không ạ. Và em nói cho anh chị cách kiểm điều đó.”',
      giua: ['Mọi so sánh trong hệ là cháu với chính cháu chín mươi ngày trước. Bảng đối chiếu không bao giờ có tên cháu khác.',
             'Cổng phụ huynh không có bảng xếp hạng, không có điểm trung bình lớp, không có thứ tự.',
             'Bậc là ngưỡng chứ không phải thứ hạng: nhiều cháu cùng đạt một bậc là chuyện bình thường và không ai xếp trên ai.',
             'Nói phần thật: trong tổ các cháu vẫn nhìn nhau và tự so. Việc của Coach là biến chỗ đó thành chỗ học hỏi, không giả vờ nó không tồn tại.'],
      ket: '“Nếu anh chị thấy một dòng nào xếp hạng cháu với cháu khác, anh chị gửi cho em. Hệ phải cải chính bằng văn bản tới mọi phụ huynh đã nhận dòng đó.”',
      cam: 'Không hứa rằng trẻ con sẽ không tự so với nhau. Hứa thứ mình không kiểm soát được là hứa hỏng.' },

    { ma: 'TL-09', t: '“Học xong cháu được bằng gì, có dùng xét tuyển được không?”', mau: '#9E470D',
      khi: 'Từ gia đình đang nhìn tới hồ sơ du học hoặc hồ sơ xét tuyển.',
      ai: 'Người tư vấn',
      mo: '“Em nói rõ để anh chị không kỳ vọng nhầm ạ.”',
      giua: ['Hộ chiếu năng lực không phải văn bằng nhà nước và không thay thế bất cứ chứng chỉ nào.',
             'Thứ có giá trị là hồ sơ bằng chứng: việc cháu đã làm, có ngày, có người ngoài ký, có sản phẩm xem được.',
             'Hồ sơ ấy thuộc về cháu. Cháu rời hệ thì mang theo bản đầy đủ, không phải xin.',
             'Nếu gia đình cần một chứng chỉ cho một hồ sơ cụ thể: nói rõ hệ không cấp thứ đó, và họ nên tìm đúng nơi cấp.'],
      ket: '“Cái cháu cầm về là bằng chứng, không phải tấm bằng. Người xét hồ sơ đọc bằng chứng kỹ hơn anh chị nghĩ.”',
      cam: 'Không gợi ý rằng hộ chiếu có giá trị xét tuyển. Không đặt tên giấy tờ nội bộ na ná tên một loại văn bằng.' },

    { ma: 'TL-10', t: '“Nếu giữa chừng nhà tôi muốn dừng thì sao?”', mau: '#A8801F',
      khi: 'Buổi định hướng — thường là câu cuối cùng trước khi gia đình quyết.',
      ai: 'Người tư vấn',
      mo: '“Anh chị dừng lúc nào cũng được. Em nói luôn phần tiền và phần hồ sơ ạ.”',
      giua: ['Trong tuần thử: hoàn 100%, không hỏi lý do, xử trong ba ngày làm việc; quá hạn thì cộng thêm 10%.',
             'Sau đó: phần đã học thì không hoàn, phần chưa dùng thì hoàn đủ, không trừ phí thủ tục.',
             'Hộ chiếu và bằng chứng là của cháu. Bậc đã đạt giữ nguyên, quay lại lúc nào cũng được và không phải học lại.',
             'Trước khi dừng, hệ xin đúng một buổi để hỏi vì sao, và ghi nguyên văn câu trả lời vào sổ.'],
      ket: '“Dừng ở đây thì cháu không mất gì cả. Em chỉ xin một câu trả lời thật để bọn em sửa.”',
      cam: 'Không mời tái tục kèm ưu đãi. Không gọi làm phiền quá hai lần trong một năm sau khi gia đình đã dừng.' }
  ];

  /* ── 6 · Hồ sơ nhập hệ — mười lăm mục ────────────────────────
     Thiếu một mục ở ngày thứ mười hai còn sửa được. Thiếu ở ngày
     đi trại thì không sửa được nữa. Ô cuối trả lời câu hỏi duy
     nhất đáng hỏi về giấy tờ: tờ này dùng vào việc gì. */
  G.DV_HO_SO_VAO = [
    ['HS-01', 'Phiếu thông tin gia đình và người liên hệ chính', 'Phụ huynh', 'Bắt buộc',
     'Xác định ai nhận thư tuần, ai được đón cháu, gọi ai trước khi có việc'],
    ['HS-02', 'Phiếu sức khoẻ: dị ứng, thuốc đang dùng, bệnh mạn tính, số điện thoại bác sĩ', 'Phụ huynh', 'Bắt buộc',
     'Xử trí khi có sự cố, và là điều kiện để cháu tham gia hoạt động ngoài cơ sở'],
    ['HS-03', 'Đồng thuận tham gia của chính học viên, có chữ ký của cháu', 'Học viên tự ký', 'Bắt buộc',
     'Không nhận một đứa trẻ chưa tự đồng ý — đây là tờ quan trọng nhất trong cả tập'],
    ['HS-04', 'Đồng thuận hình ảnh, có mục rút lại bất cứ lúc nào', 'Phụ huynh và học viên cùng ký', 'Tuỳ chọn',
     'Không có chữ ký thì không một tấm ảnh nào của cháu được dùng; rút thì gỡ trong 48 giờ'],
    ['HS-05', 'Phiếu người cùng quyết trong nhà: ai đồng ý, ai chưa đồng ý', 'Phụ huynh', 'Bắt buộc',
     'Ngăn việc ký với một người rồi ba tháng sau vỡ ra trong nhà'],
    ['HS-06', 'Bản đọc ca một trang từ buổi gặp đầu', 'Người tư vấn viết, quản lý chuyên môn đọc lại', 'Bắt buộc',
     'Gia đình giữ bản gốc, hệ giữ bản sao; là mốc để đối chiếu ở ngày thứ chín mươi'],
    ['HS-07', 'Kết quả bộ test nhận diện, hai bản riêng của cháu và của bố mẹ', 'Học viên và phụ huynh làm riêng', 'Bắt buộc',
     'Số nền cho mười hai trục, và bảng lệch giữa hai bản — chỗ lệch nhiều nhất là chỗ đáng nói nhất'],
    ['HS-08', 'Nhật ký bảy ngày quan sát, ba dòng mỗi tối', 'Gia đình tự ghi', 'Bắt buộc',
     'Dữ liệu thật có trước mọi can thiệp; không có nó thì không xét được bảo đảm chín mươi ngày'],
    ['HS-09', 'Bản thoả thuận ba bên: hệ · gia đình · học viên', 'Ba bên cùng ký, cháu ký sau cùng', 'Bắt buộc',
     'Ghi rõ việc mỗi bên nhận làm, và ghi rõ việc hệ không nhận làm'],
    ['HS-10', 'Bảng cam kết dịch vụ có mục ngưỡng và khoản đền', 'Hệ giao, gia đình ký đã nhận', 'Bắt buộc',
     'Gia đình biết đòi gì khi hệ sai, thay vì phải đoán hoặc phải nhờ vả'],
    ['HS-11', 'Phiếu mục tiêu chín mươi ngày: ba điều gia đình sẽ đổi', 'Phụ huynh viết tay', 'Bắt buộc',
     'Chữ của chính họ, mở ra đọc lại ở ngày thứ chín mươi — đây là phiếu bị bỏ qua nhiều nhất và tiếc nhất'],
    ['HS-12', 'Phiếu ghi điều hệ không nhận làm cho ca này', 'Người tư vấn viết, gia đình ký đã đọc', 'Bắt buộc',
     'Chặn kỳ vọng ngoài phạm vi ngay từ ngày đầu, thay vì tranh luận ở tháng thứ ba'],
    ['HS-13', 'Bản sao giấy khai sinh hoặc giấy tờ tuỳ thân của cháu', 'Phụ huynh', 'Bắt buộc',
     'Xác định đúng tuổi để xếp bậc và xếp tổ; sai tuổi là sai toàn bộ phác đồ'],
    ['HS-14', 'Kết luận chuyên khoa nếu cháu đang được theo dõi hoặc điều trị', 'Cơ sở y tế cấp, gia đình cung cấp', 'Bắt buộc nếu có',
     'Để hệ biết mình đứng ở đâu, và để tuyệt đối không làm thay phần điều trị'],
    ['HS-15', 'Phiếu ghi ai đã giới thiệu gia đình tới', 'Phụ huynh', 'Tuỳ chọn',
     'Đếm đúng nguồn tiến cử, và để cảm ơn đúng người đã đem tên mình ra bảo lãnh']
  ];

  /* ── 7 · Ba mươi ngày đầu của một gia đình mới ────────────────
     Chu kỳ 90 ngày hỏng hay không được quyết trong 30 ngày này.
     Nguyên tắc trùm: ba mươi ngày đầu chỉ làm MỘT trục, và phần
     đổi trước nằm ở người lớn. */
  G.DV_BA_MUOI_NGAY = [
    { p: 'Ngày 0', m: 'Lễ nhập hệ. Trao hộ chiếu bằng hai tay trước mặt cả tổ, cháu tự đọc lời cam kết trang đầu. Chụp ảnh chân dung, in ngay, ghi ngày ở góc.',
      ai: 'Coach kèm và ban điều hành chi hội', y: 'Ngày này quyết định chín mươi ngày sau nhiều hơn mọi buổi tư vấn cộng lại.' },
    { p: 'Ngày 1', m: 'Ba dòng gửi gia đình: hôm qua cháu làm được gì, tên bạn cùng tổ của cháu, và một việc nhỏ cho tối nay.',
      ai: 'Coach kèm', y: 'Liên lạc đầu tiên phải tới trước khi gia đình kịp thắc mắc. Chậm một ngày ở đây tốn ba tuần về sau.' },
    { p: 'Ngày 2', m: 'Ghép tổ và ghép bạn đỡ đầu: một thành viên cũ nhận nhiệm vụ ngồi cạnh cháu trong bốn tuần.',
      ai: 'Đội trưởng chi hội', y: 'Trẻ rời hệ sớm gần như luôn vì không có ai để ngồi cùng, chứ không vì nội dung.' },
    { p: 'Ngày 3', m: 'Gọi cho phụ huynh, hỏi đúng một câu: về nhà cháu nói gì về buổi đầu. Rồi im lặng chờ.',
      ai: 'Coach kèm — gọi, không nhắn', y: 'Câu cháu nói ở nhà là dữ liệu thật nhất về buổi học, thật hơn mọi biên bản.' },
    { p: 'Ngày 5', m: 'Chốt MỘT trục duy nhất cho ba mươi ngày đầu, viết ra giấy, dán ở nhà. Không hai trục, không ba.',
      ai: 'Coach kèm cùng gia đình', y: 'Ba mươi ngày đầu là hạ tải và làm một việc. Làm nhiều việc cùng lúc là cách hỏng chắc chắn nhất.' },
    { p: 'Ngày 7', m: 'Buổi đọc lại số nền cùng cháu: cho cháu xem chính bản test của mình, giải thích, không chấm điểm.',
      ai: 'Coach kèm', y: 'Cháu thấy mình được đọc đúng chứ không bị chấm. Đây là lúc cháu quyết có hợp tác hay không.' },
    { p: 'Ngày 8–9', m: 'Việc đầu tiên có người ngoài ký: một việc nhỏ làm cho một người thật ngoài gia đình.',
      ai: 'Cháu tự làm, tự xin chữ ký', y: 'Việc xin chữ ký chính là bài rèn. Phiếu chỉ là cái cớ để cháu phải mở lời với một người lạ.' },
    { p: 'Ngày 10', m: 'Thư tuần thứ hai. Bắt buộc có tên cháu trong mọi câu, và ít nhất một việc có ngày cụ thể.',
      ai: 'Coach kèm', y: 'Thư không có việc cụ thể là thư mẫu, và phụ huynh nhận ra ngay từ lá thứ hai chứ không đợi tới lá thứ mười.' },
    { p: 'Ngày 12', m: 'Rà hồ sơ: đủ mười lăm mục chưa, đồng thuận hình ảnh còn hiệu lực không, phiếu sức khoẻ có gì mới không.',
      ai: 'Ban điều hành chi hội', y: 'Hồ sơ thiếu ở ngày mười hai còn sửa được. Thiếu vào ngày đi trại thì không sửa được nữa.' },
    { p: 'Ngày 14', m: 'Gặp riêng cháu mười lăm phút, nơi mở: chỗ nào ở đây em thấy khó chịu nhất. Rồi im lặng đếm tới bảy.',
      ai: 'Coach kèm', y: 'Hỏi trước khi cháu kịp chán. Chán mà nói ra được thì chưa phải là chán tới mức bỏ đi.' },
    { p: 'Ngày 16', m: 'Mời đích danh người cùng quyết trong nhà chưa từng tới, dự một buổi cháu báo công. Không kèm bảng giá.',
      ai: 'Người tư vấn', y: 'Người chưa từng tới là người sẽ phản đối vào tuần thứ bảy. Mời họ sớm rẻ hơn thuyết phục họ muộn.' },
    { p: 'Ngày 18', m: 'Kiểm phần việc của phụ huynh: ba mươi phút mỗi tuần có chạy không, và ai đang thật sự làm.',
      ai: 'Quản lý chuyên môn, không phải Coach kèm', y: 'Đây là biến số lớn nhất của kết quả chín mươi ngày, và cũng là biến hay bị bỏ kiểm nhất.' },
    { p: 'Ngày 21', m: 'Tuần thứ ba: gọi trước khi gia đình kịp phàn nàn. Nói thẳng rằng hết hào hứng là chuyện của mọi chu kỳ.',
      ai: 'Coach kèm', y: 'Tuần ba là tuần rơi. Gọi trước thì giữ được gia đình; gọi sau thì chỉ còn dập lửa.' },
    { p: 'Ngày 24', m: 'Cháu nhận một ghế nhỏ trong tổ: thư ký buổi, giữ giờ, hoặc đón bạn mới.',
      ai: 'Đội trưởng chi hội', y: 'Nhận việc là cách nhanh nhất để một đứa trẻ thấy mình thuộc về chỗ này.' },
    { p: 'Ngày 27', m: 'Dự giờ người kèm ca này một lần, có biên bản theo chuẩn hai mươi điểm.',
      ai: 'Trưởng nhóm Coach', y: 'Kiểm chất lượng khi ca còn mới, không đợi tới lúc đã có phàn nàn mới đi dự.' },
    { p: 'Ngày 30', m: 'Buổi ba mươi ngày cùng cả nhà: đối chiếu với số nền, mở lại ba điều gia đình đã viết tay, quyết đi tiếp hay dừng.',
      ai: 'Coach kèm và người tư vấn cùng ngồi', y: 'Cửa dừng đầu tiên. Có một cửa dừng thật thì việc ở lại mới là một lựa chọn, không phải một quán tính.' }
  ];

  /* ── 8 · Hai mươi luật tư vấn ────────────────────────────────
     Luật, không phải khuyến nghị. Vi phạm được ghi vào hồ sơ nghề
     của người tư vấn, giống như vi phạm chuẩn dự giờ của Coach. */
  G.DV_LUAT = [
    'Không hứa kết quả. Hệ chỉ cam kết những gì hệ làm: thời gian trả lời, sĩ số lớp, người kèm đã kiểm định, hoàn phí, học lại. Tính cách của một con người không nằm trong danh sách ấy.',
    'Không so sánh với nơi khác bằng cách hạ thấp họ. Không nêu tên, không kể chuyện xấu, không ám chỉ. Nói ba thứ chỗ mình có và kiểm được, rồi để gia đình đi hỏi nơi kia đúng ba câu ấy.',
    '*Không tư vấn khi chưa gặp đứa trẻ.* Nghe bố mẹ kể qua điện thoại đủ để mình tưởng mình đã hiểu — đó là ảo giác nguy hiểm nhất của nghề này. Chưa gặp cháu thì dời hẹn, không kết luận.',
    'Không nhận gia đình chỉ vì họ trả được tiền. Khả năng chi trả không phải một tiêu chí nhận ca. Nhận sai người thì mất cả tiền lẫn danh dự, và đứa trẻ chịu phần thiệt lớn nhất.',
    'Nói rõ điều hệ không làm được, và nói trước khi nói điều hệ làm được. Buổi tư vấn nào không có câu “chỗ này bọn em không làm” là buổi tư vấn chưa trung thực.',
    'Mọi cam kết nói ra phải kèm *ngưỡng* và *khoản đền*. Không có ngưỡng thì không kiểm được; không có khoản đền thì không ai chịu trách nhiệm.',
    'Không chốt trong buổi gặp đầu. Gia đình về nghĩ ít nhất một đêm. Chữ ký lấy được trong cơn xúc động là chữ ký sẽ bị hối tiếc.',
    'Không giảm giá riêng lẻ để chốt. Ai không đủ khả năng thì đi qua quỹ học bổng có quy trình và có hội đồng — cách ấy giữ được lòng tự trọng cho gia đình.',
    'Không dùng hạn chót giả, không nói ưu đãi sắp hết, không nói còn hai chỗ. Thủ thuật này chốt thêm vài ca và giết chết nguồn tiến cử.',
    'Không bàn học phí trước mặt đứa trẻ, và không để gia đình dùng học phí làm lý do ép con. Món nợ ấy đè lên cháu suốt cả chu kỳ.',
    'Không dùng từ của y khoa hay tâm lý lâm sàng trong bất cứ giấy tờ nào. Chỉ ghi hành vi quan sát được, có giờ, có chỗ, có số lần.',
    'Gặp riêng đứa trẻ ở nơi mở, nhìn thấy được, không bao giờ trong phòng kín. Đây là luật đỏ: không có ngoại lệ và không có mức phạt trung gian.',
    'Người tư vấn không nhận thù lao theo số ca chốt. Ai được trả theo số ca chốt thì sớm muộn cũng nhận một ca đáng lẽ nên khuyên đi nơi khác.',
    'Gia đình nói chưa thì dừng trong danh dự: ghi ngày hẹn lại sau ba tuần, không gọi quá hai lần, không gửi kèm bảng giá.',
    'Không nhận ca vượt năng lực chuyên môn của cơ sở. Nhận rồi trả về là tổn thương lần thứ hai, và nặng hơn lần đầu.',
    'Ghi nguyên văn lời phụ huynh và lời cháu, trong ngoặc kép. Không diễn giải lại cho hay hơn — diễn giải là chỗ sai lệch bắt đầu.',
    'Bản đọc ca và kết quả test thuộc về gia đình, kể cả khi họ không học. Không đòi lại, không giữ làm điều kiện, không tính phí.',
    'Mỗi quý, người tư vấn phải kể được ít nhất *ba ca mình đã khuyên đi nơi khác* và lý do từng ca. Quý nào không có ca nào là quý đáng rà lại, không phải quý tốt.',
    'Buổi gặp đầu không có phần bán hàng. Gia đình hỏi thẳng về học phí thì đưa bảng đầy đủ, công khai, không mặc cả — nhưng không tự mình mở phần ấy ra.',
    'Chuyển tuyến đúng lúc là một kết quả tốt, không phải một ca thất bại. Người tư vấn chuyển tuyến đúng được ghi nhận ngang với người chốt được ca.'
  ];

})(window.GV = window.GV || {});
