/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {Method} from '../types';

/* ==========================================================================
   THƯ VIỆN PHƯƠNG PHÁP — 28 phương pháp mạnh nhất thế giới, đã sàng lọc
   Tiêu chí đưa vào: (1) có cơ sở nghiên cứu, (2) người Việt tự làm được,
   (3) đo lường được kết quả trong ≤ 8 tuần.
   ========================================================================== */

export const METHODS: Method[] = [
  {
    id: 'ci',
    name: 'Comprehensible Input (i+1)',
    vnName: 'Đầu vào dễ hiểu',
    origin: 'Stephen Krashen, 1982',
    evidence:
      'Nền tảng của gần như mọi chương trình tiếp thu ngôn ngữ hiện đại; được xác nhận lại bởi các nghiên cứu về đọc mở rộng (Nation, 2015).',
    what:
      'Học ngôn ngữ xảy ra khi bạn HIỂU thông điệp ở mức hơi cao hơn trình độ hiện tại một bậc — không phải khi bạn phân tích ngữ pháp.',
    how: [
      'Chọn tài liệu bạn hiểu 90–98% mà không cần tra từ điển.',
      'Ưu tiên nội dung có hình ảnh / bối cảnh rõ ràng để đoán nghĩa.',
      'Nếu phải tra quá 5 từ mỗi trang → tài liệu quá khó, hạ một bậc ngay.',
      'Nếu không gặp từ mới nào trong 3 trang → quá dễ, nâng một bậc.',
      'Đo bằng giờ, không bằng bài: mục tiêu là tích luỹ 1.800 giờ.',
    ],
    bestFor: ['listening', 'reading', 'vocabulary', 'grammar'],
    phases: ['Y1Q1', 'Y1Q2', 'Y1Q3', 'Y1Q4', 'Y2Q1', 'Y2Q2'],
    costMinutes: 30,
    power: 5,
    pitfall:
      'Chọn tài liệu "trông ngầu" thay vì tài liệu vừa sức. Đây là sai lầm giết chết 80% người tự học trong 90 ngày đầu.',
  },
  {
    id: 'srs',
    name: 'Spaced Repetition (FSRS/Anki)',
    vnName: 'Lặp lại giãn cách',
    origin: 'Ebbinghaus 1885 → Leitner 1972 → thuật toán FSRS 2023',
    evidence:
      'Hiệu ứng giãn cách là một trong những phát hiện vững chắc nhất của tâm lý học nhận thức (Cepeda et al., 2006 — phân tích tổng hợp 254 nghiên cứu).',
    what:
      'Ôn lại đúng vào thời điểm bạn sắp quên. Mỗi lần nhớ lại thành công, khoảng cách ôn tiếp theo giãn ra theo cấp số nhân.',
    how: [
      'Cài Anki (miễn phí trên máy tính/Android), bật thuật toán FSRS.',
      'Mỗi thẻ chỉ chứa MỘT thông tin. Không nhồi 5 nghĩa vào 1 thẻ.',
      'Mặt trước: câu ví dụ có khoét lỗ. Mặt sau: từ + phát âm + hình ảnh.',
      'Giới hạn 20 thẻ mới/ngày ở năm 1, 30 thẻ ở năm 2–3.',
      'Ôn 7 ngày/tuần. Bỏ 3 ngày là dồn 3 lần khối lượng — cạm bẫy chết người.',
    ],
    bestFor: ['vocabulary', 'grammar'],
    phases: ['Y1Q1', 'Y1Q2', 'Y1Q3', 'Y1Q4', 'Y2Q1', 'Y2Q2', 'Y2Q3', 'Y2Q4', 'Y3Q1', 'Y3Q2'],
    costMinutes: 15,
    power: 5,
    pitfall:
      'Tải bộ thẻ 10.000 từ của người khác về. Thẻ do CHÍNH BẠN tạo từ tài liệu BẠN đã đọc mới có ngữ cảnh để nhớ.',
  },
  {
    id: 'shadowing',
    name: 'Shadowing',
    vnName: 'Nói đuổi',
    origin: 'Alexander Arguelles',
    evidence:
      'Được dùng chuẩn trong đào tạo phiên dịch cabin; cải thiện đo được về nhận diện âm vị và độ trôi chảy sau 6–8 tuần.',
    what:
      'Nghe và nói đuổi theo bản gốc với độ trễ ~0,5–1 giây, bắt chước cả nhịp điệu, ngữ điệu lẫn cảm xúc.',
    how: [
      'Chọn đoạn 60–90 giây, tốc độ tự nhiên, có transcript.',
      'Vòng 1: nghe không nhìn chữ, nắm ý.',
      'Vòng 2: nghe + nhìn transcript, đánh dấu chỗ nối âm và trọng âm.',
      'Vòng 3–6: nói đuổi, KHÔNG dừng băng dù bị tụt lại.',
      'Vòng 7: tự thu âm, nghe lại, so sánh với bản gốc, ghi 1 lỗi để sửa.',
    ],
    bestFor: ['pronunciation', 'speaking', 'listening'],
    phases: ['Y1Q2', 'Y1Q3', 'Y1Q4', 'Y2Q1', 'Y2Q2', 'Y2Q3'],
    costMinutes: 15,
    power: 5,
    pitfall:
      'Đọc to theo transcript thay vì nói đuổi bằng tai. Làm vậy là luyện đọc, không phải luyện âm.',
  },
  {
    id: 'dictation',
    name: 'Bottom-up Dictation',
    vnName: 'Chép chính tả từng âm',
    origin: 'Ann Cook — American Accent Training; Field (2008) về nghe từ dưới lên',
    evidence:
      'Giải quyết đúng điểm nghẽn của người Việt: nghe được nghĩa nhưng không nghe được ÂM (mất âm cuối, nối âm, âm yếu).',
    what:
      'Chép lại từng chữ một đoạn ngắn, lặp cho tới khi khớp 100% transcript, rồi phân tích chính xác vì sao mình nghe hụt.',
    how: [
      'Lấy đoạn 30–45 giây (BBC 6 Minute English, ESLPod, Cambridge Listening).',
      'Nghe từng câu, chép lại. Được tua lại tối đa 5 lần/câu.',
      'Đối chiếu transcript, tô đỏ mọi chỗ sai.',
      'Phân loại lỗi: (a) không biết từ, (b) biết từ nhưng không nhận ra âm, (c) nối âm/nuốt âm.',
      'Lỗi loại (b) và (c) → đưa vào buổi shadowing hôm sau.',
    ],
    bestFor: ['listening', 'pronunciation'],
    phases: ['Y1Q2', 'Y1Q3', 'Y1Q4', 'Y2Q1', 'Y2Q2'],
    costMinutes: 20,
    power: 5,
    pitfall:
      'Chép cả bài 10 phút → nản và bỏ. 45 giây làm kỹ giá trị hơn 10 phút làm ẩu.',
  },
  {
    id: 'lexical',
    name: 'The Lexical Approach',
    vnName: 'Học theo cụm, không học từ lẻ',
    origin: 'Michael Lewis, 1993',
    evidence:
      'Người bản ngữ nói bằng các khối đúc sẵn (chunks) chiếm 50–80% lời nói tự nhiên (Erman & Warren, 2000).',
    what:
      'Đơn vị học không phải là "từ" mà là "cụm đi liền" — collocation, cụm cố định, khung câu.',
    how: [
      'Không ghi "research (n): nghiên cứu". Ghi "conduct research into the causes of…".',
      'Mỗi từ mới phải nhặt kèm 2–3 bạn đồng hành của nó.',
      'Dùng ozdic.com và Oxford Collocations Dictionary để kiểm tra cụm chuẩn.',
      'Xây "ngân hàng khung câu" theo chủ đề IELTS: 15 khung/chủ đề.',
      'Kiểm tra: nếu Google cụm đó ra < 100.000 kết quả → có thể không tự nhiên.',
    ],
    bestFor: ['vocabulary', 'speaking', 'writing'],
    phases: ['Y1Q4', 'Y2Q1', 'Y2Q2', 'Y2Q3', 'Y2Q4', 'Y3Q1', 'Y3Q2'],
    costMinutes: 15,
    power: 5,
    pitfall:
      'Học từ "khủng" đơn lẻ (ubiquitous, plethora) rồi ghép sai cụm → giám khảo trừ điểm ngay ở tiêu chí Lexical Resource.',
  },
  {
    id: 'extensive',
    name: 'Extensive Reading & Listening',
    vnName: 'Đọc / nghe mở rộng',
    origin: 'Day & Bamford; Paul Nation',
    evidence:
      'Nation: cần gặp một từ 12–20 lần trong ngữ cảnh khác nhau để nắm chắc. Chỉ đọc/nghe nhiều mới tạo đủ số lần gặp đó.',
    what:
      'Tiêu thụ khối lượng LỚN nội dung DỄ, đọc/nghe để thưởng thức, không dừng lại tra từ.',
    how: [
      'Năm 1: truyện phân cấp (Graded Readers) — Oxford Bookworms cấp 1→4.',
      'Năm 2: tiểu thuyết YA thật + podcast 20 phút/ngày.',
      'Năm 3: The Economist, Aeon, Nature podcast, sách phi hư cấu.',
      'Quy tắc: gặp từ mới → đoán, đi tiếp. Chỉ tra nếu nó chặn hiểu cả đoạn.',
      'Mục tiêu năm 1: đọc 500.000 từ. Năm 2: 1 triệu. Năm 3: 1,5 triệu.',
    ],
    bestFor: ['reading', 'listening', 'vocabulary'],
    phases: ['Y1Q2', 'Y1Q3', 'Y1Q4', 'Y2Q1', 'Y2Q2', 'Y2Q3', 'Y2Q4', 'Y3Q1'],
    costMinutes: 25,
    power: 5,
    pitfall:
      'Biến đọc mở rộng thành đọc chuyên sâu (dừng tra mọi từ) → tốc độ sụp, hết vui, bỏ sau 2 tuần.',
  },
  {
    id: 'narrow',
    name: 'Narrow Input',
    vnName: 'Nạp hẹp — cày sâu một chủ đề',
    origin: 'Krashen (narrow reading/listening)',
    evidence:
      'Ở trong cùng một chủ đề/tác giả, từ vựng lặp lại dày đặc → tốc độ hiểu tăng vọt và từ mới tự ghim mà không cần học thuộc.',
    what:
      'Thay vì mỗi ngày một chủ đề mới, hãy ở lì trong một chủ đề suốt 1–2 tuần cho tới khi nó thành "sân nhà".',
    how: [
      'Chọn 1 chủ đề IELTS (Education, Environment, Technology…).',
      'Trong 10 ngày: chỉ đọc/nghe về chủ đề đó từ 6–8 nguồn khác nhau.',
      'Ngày 11: viết 1 bài Task 2 và nói 1 bài Part 3 về chủ đề đó, không chuẩn bị.',
      'So sánh với bài viết cùng chủ đề trước 3 tháng để thấy tiến bộ.',
    ],
    bestFor: ['vocabulary', 'reading', 'listening', 'speaking'],
    phases: ['Y2Q2', 'Y2Q3', 'Y2Q4', 'Y3Q1', 'Y3Q2'],
    costMinutes: 30,
    power: 4,
    pitfall: 'Nhảy chủ đề mỗi ngày vì "cho đỡ chán" → không chủ đề nào đủ sâu để nói được 2 phút.',
  },
  {
    id: 'retrieval',
    name: 'Active Recall',
    vnName: 'Truy hồi chủ động',
    origin: 'Roediger & Karpicke, 2006',
    evidence:
      'Nhóm tự kiểm tra nhớ hơn nhóm đọc lại ~50% sau một tuần, dù nhóm đọc lại tự tin hơn.',
    what:
      'Ép não lôi thông tin ra khỏi trí nhớ thay vì nhận diện lại nó trên trang giấy.',
    how: [
      'Sau mỗi bài đọc: gập sách, viết lại 5 ý chính bằng tiếng Anh.',
      'Sau mỗi video: kể lại nội dung trong 60 giây, không xem lại.',
      'Che cột nghĩa, tự nhớ trước khi lật.',
      'Cuối tuần: "brain dump" toàn bộ cụm từ nhớ được của tuần, rồi đối chiếu sổ.',
    ],
    bestFor: ['vocabulary', 'reading', 'speaking'],
    phases: ['Y1Q2', 'Y1Q3', 'Y1Q4', 'Y2Q1', 'Y2Q2', 'Y2Q3', 'Y3Q1'],
    costMinutes: 10,
    power: 5,
    pitfall: 'Nhầm "đọc lại thấy quen" với "nhớ được". Cảm giác quen thuộc là ảo giác thành thạo.',
  },
  {
    id: 'deliberate',
    name: 'Deliberate Practice',
    vnName: 'Luyện tập có chủ đích',
    origin: 'K. Anders Ericsson',
    evidence:
      'Phân biệt chuyên gia với người nghiệp dư không phải số giờ, mà là chất lượng giờ: có mục tiêu hẹp, phản hồi tức thì, ra khỏi vùng thoải mái.',
    what:
      'Mỗi buổi luyện chỉ tấn công MỘT điểm yếu cụ thể, có tiêu chí thành công rõ ràng và phản hồi ngay.',
    how: [
      'Trước buổi: viết 1 câu "Hôm nay tôi sửa …" (VD: âm /θ/ ở cuối từ).',
      'Trong buổi: chỉ làm việc đó, ghi âm/ghi lại để có bằng chứng.',
      'Sau buổi: chấm mình 1–5 và ghi 1 điều sẽ làm khác lần sau.',
      'Mỗi 2 tuần đổi mục tiêu hẹp, dựa trên Sổ Lỗi.',
    ],
    bestFor: ['speaking', 'writing', 'pronunciation'],
    phases: ['Y1Q3', 'Y1Q4', 'Y2Q1', 'Y2Q2', 'Y2Q3', 'Y2Q4', 'Y3Q1', 'Y3Q2', 'Y3Q3'],
    costMinutes: 25,
    power: 5,
    pitfall: 'Làm đề liên tục mà không phân tích lỗi = lặp lại điểm yếu 100 lần, không phải luyện tập.',
  },
  {
    id: 'errorlog',
    name: 'Error Log & Correction Loop',
    vnName: 'Sổ lỗi & vòng sửa',
    origin: 'Thực hành chuẩn trong ngôn ngữ học ứng dụng; chống "hoá thạch" lỗi (Selinker)',
    evidence:
      'Lỗi không được sửa trong 6–12 tháng sẽ trở thành tự động hoá, sau đó cần gấp nhiều lần công sức để gỡ.',
    what:
      'Một cuốn sổ duy nhất ghi mọi lỗi lặp lại, phân loại và có lịch tấn công từng lỗi.',
    how: [
      'Mỗi bài viết/bài nói được sửa → trích lỗi vào sổ, không chép cả bài.',
      'Cột: Lỗi sai | Câu đúng | Loại lỗi | Số lần tái phạm.',
      'Lỗi tái phạm ≥ 3 lần → biến thành thẻ Anki + mục tiêu Deliberate Practice tuần sau.',
      'Chủ Nhật: đọc lại toàn bộ sổ trong 10 phút.',
    ],
    bestFor: ['writing', 'speaking', 'grammar'],
    phases: ['Y1Q3', 'Y1Q4', 'Y2Q1', 'Y2Q2', 'Y2Q3', 'Y2Q4', 'Y3Q1', 'Y3Q2', 'Y3Q3', 'Y3Q4'],
    costMinutes: 10,
    power: 5,
    pitfall: 'Có sổ nhưng không bao giờ đọc lại. Sổ lỗi không được ôn chỉ là nghĩa trang giấy.',
  },
  {
    id: 'freewriting',
    name: 'Timed Freewriting',
    vnName: 'Viết tự do bấm giờ',
    origin: 'Peter Elbow; kết hợp nguyên lý tự động hoá (Segalowitz)',
    evidence:
      'Tăng tốc độ truy xuất ngôn ngữ; phá bỏ nỗi sợ trang trắng — nguyên nhân số 1 khiến thí sinh không viết đủ 250 từ trong 40 phút.',
    what: 'Viết liên tục trong X phút, không dừng, không sửa, không tra từ điển.',
    how: [
      'Năm 1: 5 phút/ngày, chủ đề đời thường. Chấp nhận sai.',
      'Năm 2: 10 phút/ngày, chủ đề IELTS.',
      'Năm 3: 15 phút, sau đó dành 10 phút tự sửa bằng checklist.',
      'Đếm số từ mỗi ngày, vẽ đường tốc độ. Mục tiêu: 250 từ/25 phút vào năm 3.',
    ],
    bestFor: ['writing'],
    phases: ['Y1Q3', 'Y1Q4', 'Y2Q1', 'Y2Q2', 'Y2Q3', 'Y3Q1'],
    costMinutes: 10,
    power: 4,
    pitfall: 'Vừa viết vừa sửa → não chuyển chế độ liên tục, tốc độ không bao giờ tăng.',
  },
  {
    id: 'selftalk',
    name: 'Structured Self-Talk',
    vnName: 'Tự nói có cấu trúc',
    origin: 'Kỹ thuật cốt lõi của cộng đồng polyglot',
    evidence:
      'Giải bài toán lớn nhất của người Việt: không có bạn nói tiếng Anh. Tự nói tạo hàng trăm giờ output gần như miễn phí.',
    what: 'Nói một mình có chủ đề, có bấm giờ, có ghi âm — không phải lẩm bẩm vô định.',
    how: [
      'Sáng: mô tả kế hoạch trong ngày (2 phút).',
      'Trưa: bình luận một tin bạn vừa đọc (2 phút).',
      'Tối: kể lại ngày hôm nay + 1 điều học được (3 phút).',
      'Mỗi tuần thu âm 1 lần, nghe lại, ghi 3 lỗi vào Sổ Lỗi.',
      'Bí quyết: nói với "khán giả tưởng tượng" cụ thể để giọng tự nhiên hơn.',
    ],
    bestFor: ['speaking'],
    phases: ['Y1Q2', 'Y1Q3', 'Y1Q4', 'Y2Q1', 'Y2Q2', 'Y2Q3', 'Y2Q4', 'Y3Q1'],
    costMinutes: 10,
    power: 4,
    pitfall: 'Chỉ nói những gì đã nói được → không mở rộng vùng ngôn ngữ. Phải cố ép chủ đề khó.',
  },
  {
    id: 'feynman',
    name: 'Feynman Technique',
    vnName: 'Kỹ thuật Feynman',
    origin: 'Richard Feynman',
    evidence:
      'Dạy lại là hình thức truy hồi mạnh nhất; lộ ngay lỗ hổng mà đọc lại không bao giờ lộ.',
    what: 'Giải thích một khái niệm bằng tiếng Anh đơn giản như đang nói với đứa trẻ 12 tuổi.',
    how: [
      'Chọn 1 khái niệm bạn vừa học (ngữ pháp, chủ đề, ý tưởng).',
      'Giải thích to bằng tiếng Anh, không dùng thuật ngữ.',
      'Chỗ nào ấp úng → đó chính là chỗ chưa hiểu. Quay lại nguồn.',
      'Lặp cho tới khi trôi chảy trong 90 giây.',
    ],
    bestFor: ['speaking', 'grammar'],
    phases: ['Y1Q4', 'Y2Q1', 'Y2Q2', 'Y3Q1'],
    costMinutes: 10,
    power: 4,
    pitfall: 'Dùng lại đúng câu chữ của sách → đó là đọc thuộc, không phải hiểu.',
  },
  {
    id: 'interleave',
    name: 'Interleaving & Desirable Difficulty',
    vnName: 'Đan xen & khó khăn có lợi',
    origin: 'Robert Bjork',
    evidence:
      'Trộn nhiều loại bài trong một buổi cho kết quả kém hơn lúc luyện nhưng nhớ tốt hơn nhiều khi kiểm tra thật.',
    what: 'Đừng luyện khối (100 câu cùng dạng). Hãy trộn dạng bài, trộn kỹ năng, trộn chủ đề.',
    how: [
      'Một buổi Reading: trộn 3 dạng câu hỏi thay vì cày 1 dạng.',
      'Một tuần: không có 2 ngày liên tiếp cùng cấu trúc buổi học.',
      'Chấp nhận cảm giác "hôm nay làm tệ hơn" — đó là dấu hiệu đang học sâu.',
    ],
    bestFor: ['reading', 'listening', 'grammar'],
    phases: ['Y2Q3', 'Y2Q4', 'Y3Q1', 'Y3Q2', 'Y3Q3'],
    costMinutes: 0,
    power: 4,
    pitfall: 'Bỏ cuộc vì thấy điểm luyện tập tụt. Điểm luyện tập không phải điểm thi.',
  },
  {
    id: 'tblt',
    name: 'Task-Based Language Teaching',
    vnName: 'Học qua nhiệm vụ thật',
    origin: 'Prabhu; Willis & Willis',
    evidence:
      'Ngôn ngữ dùng để hoàn thành một việc thật được ghi nhớ và tự động hoá tốt hơn ngôn ngữ học để trả bài.',
    what: 'Đặt một nhiệm vụ có kết quả thật, tiếng Anh chỉ là công cụ để hoàn thành nó.',
    how: [
      'Năm 1: đặt món ăn, hỏi đường, viết caption Instagram tiếng Anh.',
      'Năm 2: viết review sản phẩm trên Amazon, tranh luận trên Reddit, làm hướng dẫn viên ảo.',
      'Năm 3: thuyết trình 10 phút, viết bài blog 1.200 từ, phỏng vấn thử bằng tiếng Anh.',
      'Nguyên tắc: nhiệm vụ phải có người thật đọc/nghe kết quả.',
    ],
    bestFor: ['speaking', 'writing'],
    phases: ['Y1Q4', 'Y2Q1', 'Y2Q2', 'Y2Q3', 'Y2Q4', 'Y3Q1'],
    costMinutes: 30,
    power: 4,
    pitfall: 'Nhiệm vụ giả (viết cho không ai đọc) → mất áp lực chất lượng, mất luôn động lực.',
  },
  {
    id: 'goldlist',
    name: 'The Goldlist Method',
    vnName: 'Phương pháp Danh sách Vàng',
    origin: 'David James (Huliganov)',
    evidence:
      'Khai thác trí nhớ dài hạn thụ động; phù hợp người ghét Anki nhưng vẫn cần hệ thống ôn.',
    what:
      'Viết tay 25 mục vào sổ, để yên 2 tuần, quay lại chỉ giữ những mục KHÔNG nhớ được, lặp lại chu kỳ.',
    how: [
      'Ngày 1: viết tay 25 cụm từ + nghĩa vào sổ (Headlist).',
      'Sau ≥ 14 ngày: đọc lại, gạch những cụm đã nhớ, chép 17 cụm còn lại sang trang mới.',
      'Lặp: 25 → 17 → 12 → 8 → 5.',
      'Bắt buộc viết TAY và không cố học thuộc lúc viết.',
    ],
    bestFor: ['vocabulary'],
    phases: ['Y1Q1', 'Y1Q2'],
    costMinutes: 20,
    power: 3,
    pitfall: 'Quay lại sớm hơn 14 ngày → chỉ đo trí nhớ ngắn hạn, phương pháp mất tác dụng.',
  },
  {
    id: 'sentence-mining',
    name: 'Sentence Mining',
    vnName: 'Đãi câu',
    origin: 'Cộng đồng Refold / AJATT',
    evidence:
      'Học cả câu giữ được ngữ pháp, collocation và ngữ cảnh trong cùng một đơn vị nhớ.',
    what:
      'Trích những câu "i+1" (chỉ chứa đúng 1 điểm chưa biết) từ nội dung bạn đang xem/đọc, biến thành thẻ.',
    how: [
      'Đang xem phim/đọc sách → gặp câu chỉ có 1 từ/cấu trúc lạ → chụp lại.',
      'Tạo thẻ khoét lỗ: "The policy was met with fierce ___." → opposition.',
      'Mặt sau: câu đầy đủ + audio gốc + nghĩa cụm.',
      'Chỉ tuyển 5–10 câu/ngày. Chất lượng hơn số lượng.',
    ],
    bestFor: ['vocabulary', 'grammar', 'reading'],
    phases: ['Y1Q4', 'Y2Q1', 'Y2Q2', 'Y2Q3', 'Y2Q4', 'Y3Q1'],
    costMinutes: 15,
    power: 5,
    pitfall: 'Tuyển câu có 4 từ mới → không phải i+1, thẻ sẽ luôn "leech" và làm nản Anki.',
  },
  {
    id: 'chorusing',
    name: 'Chorusing / Mimicry',
    vnName: 'Đồng thanh & nhại giọng',
    origin: 'Idahosa Ness (The Mimic Method); Olle Kjellin',
    evidence:
      'Lặp một câu duy nhất hàng trăm lần với độ chính xác âm học cao tạo "khuôn miệng" mới nhanh hơn luyện dàn trải.',
    what: 'Lặp 1 câu ngắn 50–100 lần cùng bản gốc cho tới khi hai giọng chồng khít lên nhau.',
    how: [
      'Chọn 1 câu 5–8 từ có ngữ điệu đẹp.',
      'Nghe 10 lần chỉ để cảm nhạc điệu, chưa nói.',
      'Nói cùng lúc với bản gốc (không trễ) 30–50 lần.',
      'Thu âm, chồng sóng âm, chỉnh chỗ lệch trọng âm.',
    ],
    bestFor: ['pronunciation', 'speaking'],
    phases: ['Y1Q2', 'Y1Q3', 'Y2Q1'],
    costMinutes: 10,
    power: 4,
    pitfall: 'Đổi câu liên tục → không câu nào đạt chuẩn. Ở lì 1 câu cả tuần mới ra kết quả.',
  },
  {
    id: 'band-descriptors',
    name: 'Band Descriptor Reverse-Engineering',
    vnName: 'Giải mã ngược tiêu chí chấm',
    origin: 'IELTS Public Band Descriptors (Cambridge/IDP)',
    evidence:
      'Giám khảo chấm theo 4 tiêu chí cố định. Không biết tiêu chí là thi mù — nỗ lực sai chỗ.',
    what:
      'Học thuộc và diễn giải 4 tiêu chí Writing/Speaking, rồi tự chấm mọi bài của mình theo đúng ngôn ngữ giám khảo.',
    how: [
      'In bảng mô tả Band 6/7/8/9 cho Writing Task 2 và Speaking.',
      'Với mỗi tiêu chí, viết 1 câu "Band 8 nghĩa là tôi phải…".',
      'Sau mỗi bài, tự chấm 4 tiêu chí và ghi lý do bằng ngôn ngữ tiêu chí.',
      'So sánh điểm tự chấm với điểm giáo viên → hiệu chỉnh cảm nhận.',
    ],
    bestFor: ['writing', 'speaking'],
    phases: ['Y2Q4', 'Y3Q1', 'Y3Q2', 'Y3Q3', 'Y3Q4'],
    costMinutes: 20,
    power: 5,
    pitfall:
      'Nghĩ Band 8 = từ khó + câu dài. Thật ra Band 8 = chính xác, nhất quán, tự nhiên và trả lời đúng câu hỏi.',
  },
  {
    id: 'model-deconstruct',
    name: 'Model Answer Deconstruction',
    vnName: 'Mổ xẻ bài mẫu',
    origin: 'Kỹ thuật copywork cổ điển (Benjamin Franklin) áp dụng cho IELTS',
    evidence:
      'Franklin học viết bằng cách tóm ý bài hay, viết lại từ đầu rồi so sánh với bản gốc — mô hình học từ khoảng cách.',
    what: 'Không đọc bài mẫu để thán phục. Hãy tái tạo nó rồi đo khoảng cách.',
    how: [
      'Đọc 1 bài mẫu Band 9, ghi lại dàn ý bằng 8 gạch đầu dòng.',
      'Cất bài mẫu 24 giờ.',
      'Từ dàn ý, tự viết lại bài của mình trong 40 phút.',
      'So sánh câu-với-câu: bản gốc chọn từ gì, nối ý ra sao, mình thua ở đâu.',
      'Trích 10 cụm hay nhất vào Anki.',
    ],
    bestFor: ['writing'],
    phases: ['Y2Q4', 'Y3Q1', 'Y3Q2', 'Y3Q3'],
    costMinutes: 45,
    power: 5,
    pitfall: 'Học thuộc bài mẫu để chép vào phòng thi → giám khảo nhận ra ngay và trừ nặng.',
  },
  {
    id: 'timed-mock',
    name: 'Full Mock under Exam Conditions',
    vnName: 'Thi thử đúng điều kiện phòng thi',
    origin: 'Nguyên lý đặc trưng chuyển giao (transfer-appropriate processing)',
    evidence:
      'Kỹ năng thể hiện tốt nhất trong điều kiện giống lúc luyện. Luyện thoải mái, thi áp lực → sụt 0,5–1,0 band.',
    what: 'Làm trọn bộ 4 kỹ năng liên tục, đúng giờ, không tạm dừng, không tra cứu.',
    how: [
      'Sáng thứ Bảy, 9:00–11:45, điện thoại ở phòng khác.',
      'Thứ tự chuẩn: Listening → Reading → Writing → Speaking.',
      'Dùng đề Cambridge IELTS thật (quyển 14–20).',
      'Chấm ngay trong ngày, phân tích lỗi trong 24 giờ.',
      'Tần suất: 1 lần/tháng ở năm 3, 1 lần/quý ở năm 2.',
    ],
    bestFor: ['listening', 'reading', 'writing', 'speaking'],
    phases: ['Y2Q4', 'Y3Q1', 'Y3Q2', 'Y3Q3', 'Y3Q4'],
    costMinutes: 165,
    power: 5,
    pitfall:
      'Làm đề lẻ từng kỹ năng rồi tưởng sẵn sàng. Vấn đề thật của Band 8 là sức bền 3 tiếng liên tục.',
  },
  {
    id: 'atomic',
    name: 'Atomic Habits — 4 quy luật',
    vnName: 'Thói quen nguyên tử',
    origin: 'James Clear, 2018',
    evidence:
      'Thay đổi hành vi bền vững đến từ thiết kế môi trường và bản sắc, không từ động lực.',
    what: 'Làm cho hành vi HIỂN NHIÊN, HẤP DẪN, DỄ DÀNG và THOẢ MÃN.',
    how: [
      'Hiển nhiên: tai nghe + sách để sẵn trên bàn từ tối hôm trước.',
      'Hấp dẫn: chỉ được uống cà phê ngon khi đang nghe podcast tiếng Anh.',
      'Dễ dàng: phiên bản 2 phút — "mở Anki lên" là đã tính hoàn thành.',
      'Thoả mãn: tô đen ô lịch. Không bao giờ để trống 2 ô liên tiếp.',
    ],
    bestFor: ['mindset'],
    phases: ['Y1Q1', 'Y1Q2', 'Y2Q1', 'Y3Q1'],
    costMinutes: 0,
    power: 5,
    pitfall: 'Đặt mục tiêu 3 tiếng/ngày ở tuần 1 → sụp ở tuần 3. Bắt đầu nhỏ đến mức buồn cười.',
  },
  {
    id: 'implementation',
    name: 'Implementation Intentions',
    vnName: 'Ý định thực thi',
    origin: 'Peter Gollwitzer, 1999',
    evidence:
      'Công thức "Khi X thì tôi sẽ Y tại Z" tăng tỉ lệ thực hiện hành vi lên 2–3 lần so với ý định chung chung.',
    what: 'Không nói "tôi sẽ học nhiều hơn". Hãy chốt chính xác KHI NÀO, Ở ĐÂU, LÀM GÌ.',
    how: [
      'Viết: "Lúc 6:15 sáng, tại bàn bếp, tôi sẽ shadowing 15 phút."',
      'Kèm kế hoạch dự phòng: "Nếu ngủ quên, tôi sẽ shadowing lúc 21:00 trong phòng."',
      'Dán tờ giấy này ở nơi nhìn thấy mỗi sáng.',
    ],
    bestFor: ['mindset'],
    phases: ['Y1Q1', 'Y1Q2', 'Y1Q3'],
    costMinutes: 0,
    power: 4,
    pitfall: 'Không có kế hoạch B → một ngày lỡ sẽ kéo theo cả tuần lỡ.',
  },
  {
    id: 'woop',
    name: 'WOOP / Mental Contrasting',
    vnName: 'WOOP — đối chiếu tinh thần',
    origin: 'Gabriele Oettingen',
    evidence:
      'Chỉ tưởng tượng thành công làm giảm nỗ lực. Tưởng tượng thành công RỒI đối diện chướng ngại mới tăng hành động.',
    what: 'Wish → Outcome → Obstacle → Plan. Bốn bước, 5 phút, làm mỗi đầu tuần.',
    how: [
      'Wish: mục tiêu tuần này (cụ thể, khả thi, hơi thách thức).',
      'Outcome: hình dung cảm giác đạt được, thật sống động, 60 giây.',
      'Obstacle: chướng ngại THẬT bên trong bạn (lười, sợ sai, mệt sau giờ làm).',
      'Plan: "Nếu [chướng ngại] xảy ra, tôi sẽ [hành động cụ thể]."',
    ],
    bestFor: ['mindset'],
    phases: ['Y1Q1', 'Y1Q3', 'Y2Q1', 'Y2Q3', 'Y3Q1', 'Y3Q3'],
    costMinutes: 5,
    power: 4,
    pitfall: 'Chỉ làm 2 bước đầu (mơ mộng) → giảm động lực thay vì tăng.',
  },
  {
    id: 'growth',
    name: 'Growth Mindset',
    vnName: 'Tư duy phát triển',
    origin: 'Carol Dweck',
    evidence:
      'Người tin năng lực có thể phát triển kiên trì hơn khi gặp thất bại và cải thiện nhanh hơn về lâu dài.',
    what: 'Chuyển từ "tôi không có năng khiếu ngoại ngữ" sang "tôi chưa luyện đủ đúng cách".',
    how: [
      'Thêm chữ "CHƯA" vào mọi câu tự phán xét: "Tôi chưa nói trôi chảy."',
      'Khen quá trình, không khen kết quả: "Hôm nay tôi giữ được chuỗi 40 ngày."',
      'Coi mỗi lỗi sai là dữ liệu, ghi vào Sổ Lỗi thay vì tự trách.',
    ],
    bestFor: ['mindset'],
    phases: ['Y1Q1', 'Y1Q2', 'Y2Q2', 'Y3Q2'],
    costMinutes: 0,
    power: 4,
    pitfall: '"Tư duy phát triển giả": nói câu tích cực nhưng vẫn né mọi thứ khó.',
  },
  {
    id: 'deepwork',
    name: 'Deep Work + Pomodoro',
    vnName: 'Làm việc sâu',
    origin: 'Cal Newport; Francesco Cirillo',
    evidence:
      'Chuyển đổi ngữ cảnh để lại "dư âm chú ý" làm giảm mạnh hiệu suất; 45 phút không gián đoạn hơn hẳn 90 phút bị cắt vụn.',
    what: 'Khối 25–50 phút không thông báo, không điện thoại, một mục tiêu duy nhất.',
    how: [
      'Điện thoại ở phòng khác — không phải úp xuống bàn.',
      'Một tab trình duyệt duy nhất. Dùng chế độ chặn web.',
      'Ghi mục tiêu buổi lên giấy trước khi bấm giờ.',
      'Nghỉ 5 phút KHÔNG dùng màn hình.',
    ],
    bestFor: ['mindset'],
    phases: ['Y1Q2', 'Y2Q1', 'Y3Q1'],
    costMinutes: 0,
    power: 4,
    pitfall: 'Vừa học vừa mở mạng xã hội → 60 phút danh nghĩa chỉ còn ~20 phút thật.',
  },
  {
    id: 'sdt',
    name: 'Self-Determination Theory',
    vnName: 'Thuyết tự quyết — nhiên liệu động lực',
    origin: 'Deci & Ryan',
    evidence:
      'Động lực bền cần đủ 3 nhu cầu: Tự chủ, Năng lực, Kết nối. Thiếu một là hệ thống rò rỉ năng lượng.',
    what: 'Thiết kế hành trình để bạn luôn được chọn, luôn thấy mình giỏi lên, luôn có đồng đội.',
    how: [
      'Tự chủ: mỗi tuần bạn tự chọn 30% nội dung theo sở thích cá nhân.',
      'Năng lực: luôn có 1 bài dễ hơn trình độ để cảm thấy làm chủ.',
      'Kết nối: ít nhất 2 buổi Club/tuần có người biết tên bạn.',
    ],
    bestFor: ['mindset'],
    phases: ['Y1Q1', 'Y1Q4', 'Y2Q2', 'Y3Q1'],
    costMinutes: 0,
    power: 4,
    pitfall: 'Học toàn tài liệu do người khác ép → hết Tự chủ, bỏ cuộc dù lộ trình rất hay.',
  },
  {
    id: 'noticing',
    name: 'The Noticing Hypothesis',
    vnName: 'Giả thuyết chú ý',
    origin: 'Richard Schmidt, 1990',
    evidence:
      'Đầu vào chỉ trở thành "cái được nạp" khi người học CHÚ Ý một cách có ý thức tới đặc điểm ngôn ngữ đó.',
    what: 'Thêm một lớp "săn tìm" có chủ đích lên trên hoạt động nghe/đọc bình thường.',
    how: [
      'Trước khi đọc/nghe: chọn 1 mục tiêu săn (VD: mọi mệnh đề quan hệ).',
      'Trong lúc đọc/nghe: đánh dấu mỗi lần gặp mục tiêu đó.',
      'Sau đó: viết 3 câu của riêng bạn dùng đúng cấu trúc vừa săn.',
      'Đổi mục tiêu săn mỗi tuần theo lỗi trong Sổ Lỗi.',
    ],
    bestFor: ['grammar', 'reading', 'listening'],
    phases: ['Y1Q4', 'Y2Q1', 'Y2Q2', 'Y2Q3', 'Y3Q1'],
    costMinutes: 5,
    power: 4,
    pitfall: 'Săn 5 mục tiêu cùng lúc → không thấy gì cả. Mỗi tuần đúng 1 mục tiêu.',
  },
];

export const METHOD_BY_ID = Object.fromEntries(METHODS.map((m) => [m.id, m]));
