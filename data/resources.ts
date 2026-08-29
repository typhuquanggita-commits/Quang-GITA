/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {Resource} from '../types';

/* ==========================================================================
   THƯ VIỆN TÀI LIỆU — đã sàng lọc, có vị trí rõ ràng trong lộ trình
   tier: 'core'    = xương sống, không có thì hệ thống gãy
         'support' = tăng tốc, nên có
         'optional'= dùng khi hợp gu, bỏ được
   ========================================================================== */

export const RESOURCES: Resource[] = [
  /* ---------------------- CÔNG CỤ XƯƠNG SỐNG ---------------------------- */
  {
    id: 'r-anki',
    name: 'Anki (bật thuật toán FSRS)',
    kind: 'app',
    author: 'Damien Elmes — apps.ankiweb.net',
    level: ['Pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1'],
    skills: ['vocabulary', 'grammar'],
    why:
      'Công cụ duy nhất trong danh sách này đi cùng bạn cả 36 tháng. Không có SRS, bạn sẽ quên 60–70% từ đã học trong vòng một tháng.',
    howToUse:
      'Miễn phí trên máy tính và Android (bản iOS trả phí). Bật FSRS trong Deck Options. Giới hạn 20 thẻ mới/ngày ở năm 1. Chỉ tạo thẻ từ nội dung CHÍNH BẠN đã đọc/nghe — không tải deck 10.000 từ của người khác.',
    free: true,
    tier: 'core',
  },
  {
    id: 'r-oxford-learners',
    name: "Oxford Learner's Dictionaries",
    kind: 'website',
    author: 'Oxford University Press — oxfordlearnersdictionaries.com',
    level: ['A2', 'B1', 'B2', 'C1'],
    skills: ['vocabulary', 'pronunciation'],
    why:
      'Từ điển Anh–Anh dành riêng cho người học: định nghĩa dùng vốn từ giới hạn 3.000 từ nên bạn hiểu được ngay từ trình độ A2. Có audio Anh–Mỹ, mức độ thông dụng (Oxford 3000/5000) và ví dụ chuẩn.',
    howToUse:
      'Từ tháng 10 trở đi, đây là từ điển DUY NHẤT bạn dùng. Mỗi lần tra: đọc định nghĩa tiếng Anh → nghe cả 2 giọng → chép 1 ví dụ vào Anki, không chép nghĩa tiếng Việt.',
    free: true,
    tier: 'core',
  },
  {
    id: 'r-ozdic',
    name: 'ozdic.com — Từ điển Collocation',
    kind: 'website',
    author: 'Dựa trên Oxford Collocations Dictionary',
    level: ['B1', 'B2', 'C1'],
    skills: ['vocabulary', 'writing', 'speaking'],
    why:
      'Vũ khí bí mật của tiêu chí Lexical Resource. Cho bạn biết từ nào ĐI VỚI từ nào — thứ quyết định bài viết nghe tự nhiên hay gượng ép.',
    howToUse:
      'Mỗi từ mới quan trọng: tra ozdic, chọn 2–3 collocation thông dụng nhất, đưa vào Anki dưới dạng CỤM chứ không phải từ lẻ. Ví dụ: không học "impact", học "have a profound impact on".',
    free: true,
    tier: 'core',
  },
  {
    id: 'r-cambridge-ielts',
    name: 'Bộ Cambridge IELTS 14–20',
    kind: 'exam',
    author: 'Cambridge University Press',
    level: ['B1', 'B2', 'C1'],
    skills: ['listening', 'reading', 'writing', 'speaking'],
    why:
      'Đề THẬT do chính đơn vị ra đề xuất bản. Mọi bộ đề khác trên thị trường chỉ là phỏng đoán. Độ khó và cách đánh bẫy của Cambridge không sách nào mô phỏng chính xác được.',
    howToUse:
      'KHÔNG động vào trước tháng 22. Dùng quyển 14–16 để luyện, giữ nguyên quyển 19–20 làm đề thi thử cuối. Mỗi đề chỉ làm MỘT lần, đúng điều kiện phòng thi, và phải phân tích lỗi trong 24 giờ.',
    free: false,
    tier: 'core',
  },
  {
    id: 'r-band-descriptors',
    name: 'IELTS Public Band Descriptors',
    kind: 'website',
    author: 'IELTS Partners (ielts.org) — bản PDF miễn phí',
    level: ['B2', 'C1'],
    skills: ['writing', 'speaking'],
    why:
      'Tài liệu quan trọng nhất mà 90% thí sinh chưa từng đọc. Đây chính là bảng chấm giám khảo cầm trên tay. Không đọc nó là thi mù.',
    howToUse:
      'In ra, dán lên tường. Với mỗi tiêu chí, viết lại bằng lời của bạn: "Band 8 nghĩa là tôi phải…". Tự chấm mọi bài của mình theo đúng 4 tiêu chí này, không chấm bằng cảm tính.',
    free: true,
    tier: 'core',
  },

  /* ---------------- NỀN TẢNG HỌC CÓ CẤU TRÚC (năm 1) -------------------- */
  {
    id: 'r-britishcouncil',
    name: 'British Council LearnEnglish',
    kind: 'website',
    author: 'British Council — learnenglish.britishcouncil.org',
    level: ['A1', 'A2', 'B1', 'B2', 'C1'],
    skills: ['listening', 'reading', 'writing', 'speaking', 'grammar'],
    why:
      'Kho học liệu miễn phí chuẩn mực nhất hiện có, phân cấp rõ theo CEFR từ A1 đến C1. Cùng nhà với đơn vị đồng sở hữu IELTS nên văn phong và chủ đề rất sát kỳ thi.',
    howToUse:
      'Năm 1: đi tuần tự mục Skills theo đúng cấp độ của bạn, mỗi ngày 1 bài — có audio, transcript và bài tập kiểm tra hiểu. Năm 2–3: chuyển sang mục Business English và General English C1 để nạp ngôn ngữ trang trọng.',
    free: true,
    tier: 'core',
  },
  {
    id: 'r-duolingo',
    name: 'Duolingo',
    kind: 'app',
    author: 'Duolingo Inc. — duolingo.com',
    level: ['Pre-A1', 'A1', 'A2'],
    skills: ['vocabulary', 'grammar'],
    why:
      'Giá trị thật của Duolingo không phải dạy tiếng Anh — mà là tạo CHUỖI NGÀY. Ba tháng đầu, việc quan trọng nhất là không đứt ngày nào, và Duolingo làm điều đó tốt hơn bất kỳ công cụ nào.',
    howToUse:
      'Chỉ dùng ở tháng 1–6, tối đa 10 phút/ngày, như một mỏ neo thói quen. Đừng bao giờ coi Duolingo là chương trình học chính — nó không đưa bạn quá A2. Từ tháng 7 trở đi thì bỏ hẳn.',
    free: true,
    tier: 'support',
  },
  {
    id: 'r-busuu',
    name: 'Busuu',
    kind: 'app',
    author: 'Busuu Ltd. — busuu.com',
    level: ['A1', 'A2', 'B1', 'B2'],
    skills: ['speaking', 'writing', 'grammar', 'vocabulary'],
    why:
      'Ưu điểm giết chết đối thủ: bài viết và bài nói của bạn được NGƯỜI BẢN NGỮ THẬT trong cộng đồng sửa miễn phí. Đây là vòng phản hồi (Luật số 4) mà người tự học ở Việt Nam gần như không có.',
    howToUse:
      'Tháng 4–15: mỗi tuần nộp 2 bài viết và 1 bài nói vào cộng đồng để được sửa. Đổi lại, hãy sửa bài tiếng Việt cho người khác — có đi có lại thì bài bạn được sửa nhanh hơn. Mọi lỗi được sửa đều phải vào Sổ Lỗi.',
    free: true,
    tier: 'support',
  },
  {
    id: 'r-english-online-at',
    name: 'English Online (english-online.at)',
    kind: 'website',
    author: 'Cộng đồng giáo viên Áo',
    level: ['A2', 'B1', 'B2'],
    skills: ['grammar', 'reading', 'vocabulary'],
    why:
      'Trang ngữ pháp và bài đọc miễn phí, không quảng cáo, giải thích cực gọn. Hợp với người ghét sách ngữ pháp dày cộp.',
    howToUse:
      'Dùng như sách tra cứu ngữ pháp nhanh trong năm 1–2, không học tuần tự. Khi Sổ Lỗi báo bạn hay sai điểm nào, vào đây đọc đúng mục đó trong 10 phút rồi làm bài tập.',
    free: true,
    tier: 'optional',
  },
  {
    id: 'r-reading-ecb',
    name: 'Into the Book — Chiến lược đọc hiểu',
    kind: 'website',
    author: 'Wisconsin ECB — reading.ecb.org',
    level: ['A2', 'B1'],
    skills: ['reading'],
    why:
      'Dạy 8 CHIẾN LƯỢC đọc hiểu (kích hoạt kiến thức nền, suy luận, đặt câu hỏi, hình dung, tóm tắt…) chứ không dạy từ vựng. Đây chính là bộ kỹ năng quyết định điểm Reading — và hầu như không ai luyện nó một cách có ý thức.',
    howToUse:
      'Tháng 7–12: mỗi tuần học 1 chiến lược, rồi áp dụng có ý thức vào Graded Reader tuần đó. Giao diện dành cho trẻ em nhưng nội dung chiến lược thì áp dụng thẳng cho IELTS Reading.',
    free: true,
    tier: 'support',
  },

  /* ------------------------ NGHE & PHÁT ÂM ------------------------------ */
  {
    id: 'r-spotlight',
    name: 'Spotlight English',
    kind: 'podcast',
    author: 'spotlightenglish.com',
    level: ['A1', 'A2', 'B1'],
    skills: ['listening', 'vocabulary'],
    why:
      'Nói chậm, rõ, dùng vốn từ giới hạn ~1.500 từ nhưng nội dung dành cho NGƯỜI LỚN (khoa học, xã hội, con người). Giải đúng bài toán của người mới: tài liệu đủ dễ để hiểu mà không trẻ con đến mức chán.',
    howToUse:
      'Tháng 1–9: mỗi ngày 1 bài (~15 phút). Vòng 1 nghe không transcript, vòng 2 nghe kèm transcript, vòng 3 chép chính tả 45 giây khó nhất. Có sẵn transcript miễn phí cho mọi bài.',
    free: true,
    tier: 'core',
  },
  {
    id: 'r-bbc6min',
    name: 'BBC Learning English — 6 Minute English',
    kind: 'podcast',
    author: 'BBC',
    level: ['A2', 'B1', 'B2'],
    skills: ['listening', 'vocabulary'],
    why:
      'Chuẩn vàng cho luyện nghe giọng Anh–Anh: đúng 6 phút, có transcript đầy đủ, mỗi tập dạy 5–6 từ vựng trong ngữ cảnh hội thoại thật.',
    howToUse:
      'Tháng 4–18, mỗi ngày 1 tập. Đây cũng là nguồn chép chính tả tốt nhất: chọn 45 giây bất kỳ, chép, đối chiếu transcript, phân loại lỗi nghe.',
    free: true,
    tier: 'core',
  },
  {
    id: 'r-voa',
    name: 'VOA Learning English',
    kind: 'website',
    author: 'Voice of America — learningenglish.voanews.com',
    level: ['A2', 'B1'],
    skills: ['listening', 'reading', 'vocabulary'],
    why:
      'Tin thật, đọc chậm hơn tốc độ thường khoảng một phần ba, dùng vốn từ giới hạn 1.500 từ. Giải đúng bài toán của giai đoạn A2–B1: nội dung người lớn quan tâm mà vẫn nằm trong vùng hiểu được.',
    howToUse:
      'Tháng 4–12: mỗi ngày một bài. Có sẵn transcript và bản audio cho từng bài. Nghe vòng một không nhìn chữ, vòng hai nhìn transcript, vòng ba chép chính tả 45 giây khó nhất.',
    free: true,
    tier: 'support',
  },
  {
    id: 'r-bbc-sounds',
    name: 'BBC Learning English — Pronunciation (bảng âm tương tác)',
    kind: 'channel',
    author: 'BBC',
    level: ['Pre-A1', 'A1', 'A2'],
    skills: ['pronunciation'],
    why:
      'Video quay cận miệng cho từng âm trong 44 âm IPA. Bạn NHÌN được vị trí lưỡi và môi — thứ mà nghe không bao giờ dạy được.',
    howToUse:
      'Tháng 1–3: mỗi ngày 15 phút, đi hết bảng âm trong 6 tuần, rồi lặp lại lần 2 tập trung vào các âm tiếng Việt không có: /θ/ /ð/ /ʒ/ /æ/ /ɜː/ và mọi phụ âm cuối.',
    free: true,
    tier: 'core',
  },
  {
    id: 'r-elsa',
    name: 'ELSA Speak',
    kind: 'app',
    author: 'ELSA Corp (do người Việt sáng lập)',
    level: ['Pre-A1', 'A1', 'A2', 'B1'],
    skills: ['pronunciation'],
    why:
      'Nhận diện giọng nói được huấn luyện riêng trên lỗi phát âm của người Việt. Chấm điểm từng âm vị và chỉ đúng chỗ bạn sai — thay thế được giáo viên phát âm ở giai đoạn đầu.',
    howToUse:
      'Tháng 1–12, 10 phút/ngày. Không cần bản trả phí trong 3 tháng đầu. Đây là công cụ ĐO — hãy ghi điểm mỗi tuần vào bảng KPI để thấy đường tiến bộ.',
    free: false,
    tier: 'support',
  },
  {
    id: 'r-rachel-english',
    name: "Rachel's English",
    kind: 'channel',
    author: 'Rachel Smith (YouTube)',
    level: ['A2', 'B1', 'B2'],
    skills: ['pronunciation', 'listening'],
    why:
      'Dạy chính xác những gì làm người Việt nghe hụt: nối âm, nuốt âm, âm yếu /ə/, nhịp trọng âm. Có phân tích sóng âm chậm từng phần.',
    howToUse:
      'Tháng 4–12: series "Ben Franklin Exercise" là bài tập shadowing tốt nhất trên Internet — cô ấy mổ xẻ từng âm của một đoạn hội thoại thật.',
    free: true,
    tier: 'support',
  },
  {
    id: 'r-youglish',
    name: 'YouGlish',
    kind: 'tool',
    author: 'youglish.com',
    level: ['A2', 'B1', 'B2', 'C1'],
    skills: ['pronunciation', 'vocabulary'],
    why:
      'Gõ một từ hoặc cụm bất kỳ, nó trả về hàng trăm đoạn video người thật đang nói từ đó trong ngữ cảnh thật. Lọc được theo giọng Anh/Mỹ/Úc.',
    howToUse:
      'Dùng mỗi khi phân vân "cụm này người ta có nói thật không". Dưới 20 kết quả → cụm đó không tự nhiên, đừng dùng trong bài thi.',
    free: true,
    tier: 'support',
  },
  {
    id: 'r-esl-pod',
    name: 'ESLPod / Culips',
    kind: 'podcast',
    author: 'Jeff McQuillan & cộng sự',
    level: ['A2', 'B1'],
    skills: ['listening', 'vocabulary'],
    why:
      'Xây dựng đúng theo lý thuyết đầu vào dễ hiểu của Krashen: mỗi tập có phần hội thoại chậm, phần giải thích, rồi phần hội thoại tốc độ thật.',
    howToUse: 'Tháng 4–15, dùng làm nội dung nghe khi đi đường — nghe thụ động, không cần ghi chép.',
    free: true,
    tier: 'support',
  },

  /* --------------------------- ĐỌC MỞ RỘNG ------------------------------ */
  {
    id: 'r-oxford-bookworms',
    name: 'Oxford Bookworms / Penguin Readers (truyện phân cấp)',
    kind: 'series',
    author: 'Oxford University Press',
    level: ['A1', 'A2', 'B1'],
    skills: ['reading', 'vocabulary'],
    why:
      'Cách duy nhất để đọc 500.000 từ trong năm 1 mà không bỏ cuộc. Từ vựng được kiểm soát chặt theo cấp độ, nên bạn luôn ở vùng i+1.',
    howToUse:
      'Bắt đầu cấp 1 (400 từ) — kể cả khi bạn thấy nó "quá dễ", đó chính là điểm mấu chốt. Đọc 8 quyển ở quý 2, 10 quyển ở quý 3. Quy tắc: không tra từ điển, đoán và đi tiếp. Nhiều quyển có audio để nghe–đọc song song.',
    free: false,
    tier: 'core',
  },
  {
    id: 'r-vocabsushi',
    name: 'VocabSushi',
    kind: 'website',
    author: 'vocabsushi.com',
    level: ['B1', 'B2'],
    skills: ['vocabulary', 'reading'],
    why:
      'Dạy từ vựng bằng CÂU THẬT trích từ tin tức trong ngày, không phải danh sách từ khô khan. Đúng tinh thần "đãi câu" (sentence mining) nhưng có sẵn.',
    howToUse:
      'Tháng 13–21: mỗi ngày lấy 5 câu, chuyển thẳng vào Anki dưới dạng thẻ khoét lỗ. Vì là câu từ báo chí nên văn phong rất sát Reading học thuật của IELTS.',
    free: true,
    tier: 'optional',
  },
  {
    id: 'r-netflix-lln',
    name: 'Language Reactor (phụ đề kép cho Netflix/YouTube)',
    kind: 'tool',
    author: 'Tiện ích mở rộng Chrome',
    level: ['A2', 'B1', 'B2'],
    skills: ['listening', 'vocabulary'],
    why:
      'Hiện đồng thời phụ đề Anh–Việt, tua lại từng câu bằng một phím, lưu câu vào Anki chỉ với một cú nhấp. Biến việc xem phim thành công cụ đãi câu.',
    howToUse:
      'Tháng 10–24. Kỷ luật bắt buộc: che phụ đề Việt, chỉ mở khi thật sự bí. Mỗi tập phim chỉ tuyển 5–10 câu i+1, đừng tham.',
    free: true,
    tier: 'support',
  },
  {
    id: 'r-aeon',
    name: 'Aeon Essays / BBC Future',
    kind: 'website',
    author: 'aeon.co',
    level: ['B2', 'C1'],
    skills: ['reading', 'vocabulary'],
    why:
      'Bài luận dài về triết học, khoa học, xã hội — đúng thể loại lập luận mà Writing Task 2 đòi hỏi. Đọc nhiều ở đây thì ý tưởng cho bài thi không bao giờ cạn.',
    howToUse: 'Tháng 16–30: 1 bài/ngày. Sau mỗi bài, viết 3 câu tóm tắt lập luận chính bằng lời của bạn.',
    free: true,
    tier: 'support',
  },
  {
    id: 'r-guardian',
    name: 'The Guardian — Long Read',
    kind: 'website',
    author: 'The Guardian',
    level: ['B2', 'C1'],
    skills: ['reading'],
    why: 'Văn phong báo chí Anh chuẩn mực, miễn phí hoàn toàn, chủ đề xã hội trùng khớp với ngân hàng đề IELTS.',
    howToUse: 'Tháng 16–36: 1 bài/ngày, dùng làm nguồn nạp hẹp cho chủ đề đang cày trong tuần.',
    free: true,
    tier: 'support',
  },
  {
    id: 'r-economist',
    name: 'The Economist / Nature Briefing',
    kind: 'website',
    author: 'The Economist Group',
    level: ['C1'],
    skills: ['reading', 'vocabulary'],
    why:
      'Mật độ ngôn ngữ học thuật cao nhất trong báo chí đại chúng. Đọc quen The Economist thì Reading của IELTS trở nên dễ thở.',
    howToUse: 'Tháng 19–36: 20 phút/ngày. Mỗi bài trích 5 cụm học thuật vào Anki.',
    free: false,
    tier: 'support',
  },
  {
    id: 'r-awl',
    name: 'Academic Word List (570 word families)',
    kind: 'book',
    author: 'Averil Coxhead, 2000',
    level: ['B1', 'B2', 'C1'],
    skills: ['vocabulary', 'writing', 'reading'],
    why:
      '570 nhóm từ này bao phủ khoảng 10% mọi văn bản học thuật. Đây là danh sách từ vựng có tỉ lệ hiệu quả trên công sức cao nhất cho IELTS Academic.',
    howToUse:
      'Tháng 16–21: mỗi tuần 25 từ. KHÔNG học bằng cách đọc danh sách — với mỗi từ, tìm 1 câu thật (VocabSushi/The Economist), tra collocation trên ozdic, rồi tạo thẻ Anki từ chính câu đó.',
    free: true,
    tier: 'core',
  },
  {
    id: 'r-academic-phrasebank',
    name: 'Manchester Academic Phrasebank',
    kind: 'website',
    author: 'Đại học Manchester',
    level: ['B2', 'C1'],
    skills: ['writing'],
    why:
      'Ngân hàng khung câu học thuật phân loại theo CHỨC NĂNG (nêu lập trường, so sánh, nhượng bộ, kết luận). Chính là "bộ xương" ngôn ngữ của bài Task 2 Band 8.',
    howToUse:
      'Tháng 19–30: mỗi tuần lấy 10 khung câu theo một chức năng, ép dùng trong bài viết tuần đó cho tới khi thành phản xạ.',
    free: true,
    tier: 'core',
  },

  /* ------------------------ NÓI VỚI NGƯỜI THẬT -------------------------- */
  {
    id: 'r-italki',
    name: 'italki — gia sư 1-1',
    kind: 'website',
    author: 'italki.com',
    level: ['A2', 'B1', 'B2', 'C1'],
    skills: ['speaking'],
    why:
      'Khoản đầu tư có tỉ suất sinh lời cao nhất trong toàn bộ hành trình. Community Tutor chỉ 5–10 USD/giờ. Không có phản hồi từ người thật, mọi lỗi nói của bạn sẽ hoá thạch.',
    howToUse:
      'Bắt đầu từ tháng 7, đừng đợi "giỏi hơn đã". Năm 1: 1 buổi/tuần với Community Tutor. Năm 2: 2 buổi/tuần. Năm 3: 1 buổi Professional Teacher chấm theo tiêu chí IELTS + 1 buổi luyện trôi chảy. Luôn yêu cầu gia sư gửi danh sách lỗi sau buổi học.',
    free: false,
    tier: 'core',
  },
  {
    id: 'r-cambly',
    name: 'Cambly',
    kind: 'app',
    author: 'cambly.com',
    level: ['A1', 'A2', 'B1'],
    skills: ['speaking'],
    why:
      'Bấm là nói ngay với người bản ngữ, không cần đặt lịch trước — phù hợp cho những buổi đầu tiên khi bạn còn sợ và hay tìm cớ hoãn.',
    howToUse:
      'Tháng 7–12: buổi 15 phút, 3 lần/tuần. Mỗi buổi tự thu âm và nghe lại. Đắt hơn italki nên chỉ dùng để phá rào cản tâm lý ban đầu.',
    free: false,
    tier: 'optional',
  },
  {
    id: 'r-hellotalk',
    name: 'HelloTalk / Tandem',
    kind: 'app',
    author: 'HelloTalk',
    level: ['A2', 'B1', 'B2'],
    skills: ['speaking', 'writing'],
    why:
      'Trao đổi ngôn ngữ miễn phí: bạn dạy tiếng Việt, họ sửa tiếng Anh. Có sẵn nút sửa lỗi ngay trong khung chat.',
    howToUse:
      'Tháng 7–24: mỗi ngày 1 tin nhắn thoại 60 giây gửi cho bạn trao đổi. Mẹo lọc: tìm người đang HỌC tiếng Việt nghiêm túc, không phải người tìm bạn tán gẫu.',
    free: true,
    tier: 'support',
  },

  /* ------------------ CHẤM CHỮA WRITING & LUYỆN THI --------------------- */
  {
    id: 'r-lexibot',
    name: 'Lexibot — Chấm chữa IELTS Writing miễn phí',
    kind: 'tool',
    author: 'lexibot.me (có giao diện tiếng Việt)',
    level: ['B1', 'B2', 'C1'],
    skills: ['writing'],
    why:
      'Giải bài toán lớn nhất của người tự học Writing: phản hồi tức thì và miễn phí. Chấm theo 4 tiêu chí IELTS và chỉ ra lỗi cụ thể — cho phép bạn viết mỗi ngày thay vì mỗi tuần.',
    howToUse:
      'Từ tháng 16: nộp bài ngay sau khi viết để có phản hồi trong 1 phút. QUY TẮC BẮT BUỘC: dùng AI cho vòng sửa hằng ngày, nhưng mỗi tuần vẫn phải có 1 bài do NGƯỜI THẬT chấm — AI hiện vẫn chấm rộng tay và bỏ sót lỗi mạch ý. Mọi lỗi AI chỉ ra đều phải vào Sổ Lỗi.',
    free: true,
    tier: 'support',
  },
  {
    id: 'r-write-and-improve',
    name: 'Cambridge Write & Improve',
    kind: 'tool',
    author: 'Cambridge English',
    level: ['A2', 'B1', 'B2', 'C1'],
    skills: ['writing'],
    why:
      'Chấm tự động do chính Cambridge xây dựng, trả về mức CEFR và đánh dấu lỗi theo câu. Đáng tin hơn phần lớn công cụ chấm khác vì huấn luyện trên kho bài thi thật.',
    howToUse: 'Tháng 10–30: nộp mọi bài viết. Theo dõi đường CEFR đi lên qua từng tháng như một chỉ số KPI.',
    free: true,
    tier: 'core',
  },
  {
    id: 'r-examenglish',
    name: 'Exam English',
    kind: 'website',
    author: 'examenglish.com',
    level: ['A2', 'B1', 'B2', 'C1'],
    skills: ['listening', 'reading', 'grammar'],
    why:
      'Đề luyện miễn phí cho IELTS, TOEFL, Cambridge và bài kiểm tra xếp cấp CEFR. Hữu ích nhất ở chỗ nó cho bạn ĐO cấp độ mà không tốn tiền thi thử.',
    howToUse:
      'Cuối mỗi quý: làm bài kiểm tra xếp cấp CEFR để xác nhận đã đạt cổng thoát của cột mốc chưa. Năm 3: dùng làm nguồn đề bổ sung khi đã hết bộ Cambridge.',
    free: true,
    tier: 'support',
  },
  {
    id: 'r-test-english',
    name: 'Test-English.com',
    kind: 'website',
    author: 'test-english.com',
    level: ['A1', 'A2', 'B1', 'B2'],
    skills: ['grammar', 'reading', 'listening'],
    why:
      'Bài tập ngữ pháp phân theo cấp độ CEFR, có giải thích sau mỗi câu. Là cách nhanh nhất để vá một lỗ hổng ngữ pháp cụ thể.',
    howToUse: 'Dùng theo nhu cầu: khi Sổ Lỗi cho thấy bạn hay sai điểm nào, vào làm đúng bộ đề đó trong 20 phút.',
    free: true,
    tier: 'support',
  },
  {
    id: 'r-simon',
    name: 'ielts-simon.com',
    kind: 'website',
    author: 'Simon (cựu giám khảo IELTS)',
    level: ['B2', 'C1'],
    skills: ['writing', 'speaking'],
    why:
      'Cựu giám khảo, viết bài mẫu bằng ngôn ngữ đơn giản đến bất ngờ — bằng chứng sống rằng Band 9 là RÕ RÀNG chứ không phải HOA MỸ. Kho lưu trữ miễn phí có giá trị hơn phần lớn khoá học trả tiền.',
    howToUse:
      'Tháng 19–36: mỗi tuần mổ xẻ 1 bài mẫu theo phương pháp Franklin (ghi dàn ý → cất bài đi 24 giờ → tự viết lại → so sánh).',
    free: true,
    tier: 'core',
  },
  {
    id: 'r-ielts-liz',
    name: 'IELTS Liz',
    kind: 'website',
    author: 'Liz (cựu giáo viên IELTS)',
    level: ['B1', 'B2', 'C1'],
    skills: ['listening', 'reading', 'writing', 'speaking'],
    why: 'Kho chiến thuật làm bài theo từng dạng câu hỏi, giải thích rõ ràng và hoàn toàn miễn phí.',
    howToUse: 'Tháng 22–24: đi hết phần chiến thuật Listening và Reading, mỗi ngày 1 dạng câu hỏi.',
    free: true,
    tier: 'support',
  },
  {
    id: 'r-pauline-cullen',
    name: 'The Key to IELTS Vocabulary — Pauline Cullen',
    kind: 'book',
    author: 'Pauline Cullen (cựu tác giả đề Cambridge)',
    level: ['B2', 'C1'],
    skills: ['vocabulary', 'writing'],
    why:
      'Viết bởi người từng tham gia soạn đề Cambridge. Dạy từ vựng ĐÚNG cho IELTS, và quan trọng hơn — chỉ ra những từ khiến thí sinh MẤT điểm vì dùng sai ngữ cảnh.',
    howToUse: 'Tháng 16–27: mỗi tuần 1 chương. Đây là liều thuốc giải cho thói quen "học từ khủng để loè giám khảo".',
    free: false,
    tier: 'core',
  },
  {
    id: 'r-grammar-in-use',
    name: 'English Grammar in Use — Raymond Murphy',
    kind: 'book',
    author: 'Cambridge University Press',
    level: ['A2', 'B1', 'B2'],
    skills: ['grammar'],
    why:
      'Sách ngữ pháp bán chạy nhất thế giới vì đúng một lý do: mỗi điểm ngữ pháp gói gọn trong 2 trang — trái giải thích, phải bài tập.',
    howToUse:
      'KHÔNG học từ đầu đến cuối. Dùng như từ điển: Sổ Lỗi báo sai chỗ nào thì lật đúng unit đó, đọc 10 phút, làm bài tập, quay lại viết.',
    free: false,
    tier: 'support',
  },
  {
    id: 'r-engvid',
    name: 'engVid',
    kind: 'channel',
    author: 'Nhiều giáo viên bản ngữ',
    level: ['A2', 'B1', 'B2'],
    skills: ['grammar', 'vocabulary'],
    why: 'Hơn 2.000 bài giảng video miễn phí, mỗi bài 10–15 phút, có bài kiểm tra ngay sau đó.',
    howToUse: 'Dùng để vá lỗ hổng theo nhu cầu, không xem tuần tự. Xem xong phải làm quiz, nếu không thì chỉ là giải trí.',
    free: true,
    tier: 'optional',
  },

  /* -------------------- NGUỒN TIẾNG VIỆT HỖ TRỢ ------------------------- */
  {
    id: 'r-langmaster',
    name: 'Học Tiếng Anh Langmaster (YouTube)',
    kind: 'channel',
    author: 'Langmaster',
    level: ['Pre-A1', 'A1', 'A2'],
    skills: ['pronunciation', 'vocabulary', 'grammar'],
    why:
      'Ở tháng 1–4, việc được giải thích bằng TIẾNG VIỆT có giá trị rất thật: nó ngăn bạn bỏ cuộc vì không hiểu nổi lời hướng dẫn. Có video phát âm theo giọng bản ngữ, từ vựng theo chủ đề và mẹo phản xạ, tất cả đều có phụ đề.',
    howToUse:
      'Chỉ dùng ở tháng 1–6, tối đa 15 phút/ngày và chỉ để HIỂU QUY TẮC (phát âm, cấu trúc câu). Việc tiếp thu ngôn ngữ vẫn phải đến từ nguồn tiếng Anh. Từ tháng 7 thì cắt hẳn nguồn giảng bằng tiếng Việt — đây là nguyên tắc bắt buộc.',
    free: true,
    tier: 'support',
  },
  {
    id: 'r-ielts-fighter',
    name: 'IELTS Fighter',
    kind: 'website',
    author: 'ielts-fighter.com',
    level: ['B1', 'B2', 'C1'],
    skills: ['listening', 'reading', 'writing', 'speaking'],
    why:
      'Hệ thống trung tâm IELTS lớn ở Việt Nam, có kho tài liệu và đề thi thử miễn phí, cùng lớp chấm chữa Writing/Speaking bằng tiếng Việt.',
    howToUse:
      'Dùng ở năm 3 cho đúng hai việc: (1) tải đề thi thử bổ sung khi đã hết bộ Cambridge, (2) mua một khoá chấm chữa Writing/Speaking ngắn hạn ở tháng 25–30 nếu bạn cần người Việt giải thích lỗi. Lưu ý: đây là dịch vụ thương mại — hãy đối chiếu học phí và xem bài mẫu trước khi đăng ký, và đừng để một khoá học thay thế 5 luật của hệ thống.',
    free: false,
    tier: 'optional',
  },
  {
    id: 'r-refold',
    name: 'Refold — Hướng dẫn tiếp thu ngôn ngữ',
    kind: 'website',
    author: 'Cộng đồng Refold (refold.la)',
    level: ['A2', 'B1', 'B2'],
    skills: ['listening', 'reading', 'vocabulary'],
    why:
      'Bản hướng dẫn chi tiết nhất hiện có về "đãi câu" và học qua đắm chìm. Miễn phí và không bán khoá học.',
    howToUse: 'Đọc Stage 2 ở tháng 10 để nắm kỹ thuật đãi câu. Đọc một lần rồi thực hành — đừng sa vào đọc hướng dẫn thay vì học.',
    free: true,
    tier: 'optional',
  },
  {
    id: 'r-grammarly',
    name: 'Grammarly (bản miễn phí)',
    kind: 'tool',
    author: 'Grammarly Inc.',
    level: ['A2', 'B1', 'B2'],
    skills: ['writing'],
    why: 'Bắt lỗi chính tả, mạo từ, số ít/số nhiều tức thì — đúng nhóm "lỗi nhỏ mà đắt" ở Band 7–8.',
    howToUse:
      'Tháng 7–24. Quy tắc quan trọng: TỰ SỬA TRƯỚC, bật Grammarly SAU. Nếu bật ngay từ đầu, bạn sẽ không bao giờ tự nhận ra lỗi của mình.',
    free: true,
    tier: 'support',
  },
  {
    id: 'r-tedtalks',
    name: 'TED Talks + TED-Ed',
    kind: 'channel',
    author: 'TED',
    level: ['B1', 'B2', 'C1'],
    skills: ['listening', 'speaking'],
    why:
      'Có transcript tương tác, đa dạng giọng (Anh, Mỹ, Úc, Ấn, châu Phi) — đúng phổ giọng bạn sẽ gặp trong IELTS Listening.',
    howToUse:
      'Tháng 13–36: 1 talk/ngày. Sau mỗi talk, tóm tắt 60 giây bằng miệng. Từ tháng 28, chọn riêng talk có giọng khó để luyện.',
    free: true,
    tier: 'support',
  },
  {
    id: 'r-6minute-vocab',
    name: 'BBC — The English We Speak / Learning English Vocabulary',
    kind: 'podcast',
    author: 'BBC',
    level: ['B1', 'B2'],
    skills: ['vocabulary', 'speaking'],
    why: 'Mỗi tập 3 phút, dạy một cụm tự nhiên mà người bản ngữ dùng thật — chống lại thói quen nói bằng "tiếng Anh sách giáo khoa".',
    howToUse: 'Tháng 13–24: 1 tập/ngày, ép dùng cụm đó trong buổi tự nói cùng ngày.',
    free: true,
    tier: 'optional',
  },
  {
    id: 'r-dreaming-english',
    name: 'Comprehensible Input English (Dreaming English / ALG)',
    kind: 'channel',
    author: 'Cộng đồng CI trên YouTube',
    level: ['Pre-A1', 'A1', 'A2'],
    skills: ['listening'],
    why:
      'Video dạy hoàn toàn bằng tiếng Anh nhưng dùng hình vẽ và cử chỉ để bạn hiểu ngay từ ngày đầu — không cần dịch một chữ nào. Đây là cách gần nhất với cách trẻ em học tiếng mẹ đẻ.',
    howToUse:
      'Tháng 1–6: 30 phút/ngày, bắt đầu từ playlist Super Beginner. Nguyên tắc: không tra từ, không dịch. Chỉ xem và hiểu qua bối cảnh.',
    free: true,
    tier: 'core',
  },
];

export const RESOURCE_BY_ID = Object.fromEntries(RESOURCES.map((r) => [r.id, r]));
