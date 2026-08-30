import { buildQuestions, type QuestionDraft } from './helpers';

/**
 * KHO CAU KHO VA CAU PHAN LOAI — PHAN 3, CAC CHU DE KHOA HOC
 *
 * Cung mot nguyen tac voi hai phan truoc: cau kho khong phai cau tinh dai
 * hon, ma cau co THEM MOT BUOC ma nguoi lam de bo qua. Voi cac chu de khoa
 * hoc, buoc do thuong la mot trong ba viec:
 *
 *  - Kiem tra dieu kien ap dung truoc khi dung cong thuc.
 *  - Xac dinh chat hoac dai luong nao la thu quyet dinh ket qua.
 *  - Doc ra rang buoc an trong de bai, thu khong duoc noi thang.
 */

const physics: QuestionDraft[] = [
  {
    id: 's.phy.h1',
    topicId: 'science.physics.mechanics',
    difficulty: 4,
    stem: 'Một vật khối lượng 2 kg chuyển động với vận tốc 6 m/s va chạm mềm với vật 4 kg đang đứng yên. Vận tốc của hai vật sau va chạm là bao nhiêu?',
    choices: ['2 m/s', '3 m/s', '6 m/s', '1,5 m/s'],
    answer: 'A',
    explanation:
      'Va chạm mềm nghĩa là hai vật dính vào nhau sau va chạm. Áp dụng bảo toàn động lượng: 2 × 6 + 4 × 0 = (2 + 4)v, suy ra v = 12/6 = 2 m/s. Động năng không bảo toàn trong va chạm mềm nên không dùng được bảo toàn cơ năng ở đây.',
    traps: {
      B: 'Lấy trung bình cộng vận tốc hai vật — bỏ qua chênh lệch khối lượng.',
      D: 'Chia động lượng cho khối lượng vật lớn thay vì cho tổng khối lượng.',
    },
    skills: ['bảo toàn động lượng', 'va chạm mềm'],
  },
  {
    id: 's.phy.h2',
    topicId: 'science.physics.mechanics',
    difficulty: 4,
    stem: 'Một ô tô đang chạy 20 m/s thì hãm phanh, chuyển động chậm dần đều và dừng sau 4 giây. Quãng đường ô tô đi được từ lúc hãm phanh tới lúc dừng là bao nhiêu?',
    choices: ['40 m', '80 m', '20 m', '50 m'],
    answer: 'A',
    explanation:
      'Gia tốc a = (0 − 20)/4 = −5 m/s². Quãng đường tính theo công thức s = (v₀² − v²)/(2|a|) = 400/10 = 40 m. Có thể kiểm nhanh bằng vận tốc trung bình: (20 + 0)/2 × 4 = 40 m.',
    traps: {
      B: 'Lấy vận tốc đầu nhân thời gian — chỉ đúng cho chuyển động đều, không đúng cho chậm dần.',
      C: 'Nhầm quãng đường với vận tốc đầu.',
    },
    skills: ['chuyển động chậm dần đều', 'quãng đường'],
  },
  {
    id: 's.phy.h3',
    topicId: 'science.physics.mechanics',
    difficulty: 5,
    stem: 'Hai vật có khối lượng khác nhau được thả rơi tự do cùng lúc từ cùng độ cao trong chân không. Nhận định nào đúng?',
    choices: [
      'Hai vật chạm đất cùng lúc và cùng vận tốc, nhưng động năng khác nhau',
      'Vật nặng hơn chạm đất trước',
      'Hai vật chạm đất cùng lúc với cùng động năng',
      'Vật nhẹ hơn có gia tốc lớn hơn',
    ],
    answer: 'A',
    explanation:
      'Trong chân không mọi vật rơi với cùng gia tốc g nên thời gian rơi và vận tốc chạm đất giống nhau, không phụ thuộc khối lượng. Nhưng động năng bằng ½mv², mà m khác nhau, nên động năng khi chạm đất khác nhau.',
    traps: {
      C: 'Cùng vận tốc không kéo theo cùng động năng, vì động năng còn phụ thuộc khối lượng.',
      B: 'Đúng trong không khí do lực cản, nhưng đề nói rõ là chân không.',
    },
    skills: ['rơi tự do', 'động năng'],
  },
  {
    id: 's.phy.h4',
    topicId: 'science.physics.oscillation',
    difficulty: 4,
    stem: 'Một con lắc lò xo dao động điều hòa với biên độ A. Tại vị trí nào thì động năng bằng thế năng?',
    choices: ['x = ±A√2/2', 'x = ±A/2', 'x = 0', 'x = ±A'],
    answer: 'A',
    explanation:
      'Động năng bằng thế năng nghĩa là mỗi phần bằng nửa cơ năng: ½kx² = ½ · ½kA², suy ra x² = A²/2, tức x = ±A/√2 = ±A√2/2.',
    traps: {
      B: 'Chia đôi li độ thay vì chia đôi năng lượng — năng lượng tỉ lệ với bình phương li độ.',
      C: 'Ở vị trí cân bằng thế năng bằng 0, không bằng động năng.',
    },
    skills: ['năng lượng dao động', 'li độ'],
  },
  {
    id: 's.phy.h5',
    topicId: 'science.physics.oscillation',
    difficulty: 4,
    stem: 'Một sóng cơ có tần số 50 Hz truyền trong môi trường với tốc độ 200 m/s. Khoảng cách giữa hai điểm gần nhau nhất dao động ngược pha trên phương truyền sóng là bao nhiêu?',
    choices: ['2 m', '4 m', '1 m', '8 m'],
    answer: 'A',
    explanation:
      'Bước sóng λ = v/f = 200/50 = 4 m. Hai điểm ngược pha gần nhau nhất cách nhau nửa bước sóng, tức 2 m.',
    traps: {
      B: 'Lấy trọn bước sóng — đó là khoảng cách giữa hai điểm CÙNG pha gần nhau nhất.',
      C: 'Lấy một phần tư bước sóng, ứng với hai điểm vuông pha.',
    },
    skills: ['bước sóng', 'độ lệch pha'],
  },
  {
    id: 's.phy.h6',
    topicId: 'science.physics.oscillation',
    difficulty: 5,
    stem: 'Một con lắc đơn dao động điều hòa trên Trái Đất với chu kỳ T. Nếu đưa con lắc lên Mặt Trăng nơi gia tốc trọng trường bằng 1/6 Trái Đất thì chu kỳ mới bằng bao nhiêu?',
    choices: ['T√6', 'T/6', '6T', 'T/√6'],
    answer: 'A',
    explanation:
      'Chu kỳ con lắc đơn T = 2π√(ℓ/g), tỉ lệ nghịch với căn bậc hai của g. Khi g giảm 6 lần thì T tăng √6 lần, tức chu kỳ mới bằng T√6 ≈ 2,45T.',
    traps: {
      C: 'Nhân thẳng 6 — quên rằng g nằm dưới dấu căn nên chỉ ảnh hưởng theo căn bậc hai.',
      D: 'Đảo chiều quan hệ: g giảm thì chu kỳ phải tăng, không giảm.',
    },
    skills: ['con lắc đơn', 'phụ thuộc gia tốc trọng trường'],
  },
  {
    id: 's.phy.h7',
    topicId: 'science.physics.electricity',
    difficulty: 4,
    stem: 'Một bếp điện có ghi 220 V – 1000 W hoạt động đúng định mức trong 2 giờ. Điện năng tiêu thụ là bao nhiêu kWh?',
    choices: ['2 kWh', '2000 kWh', '0,5 kWh', '440 kWh'],
    answer: 'A',
    explanation:
      'Điện năng bằng công suất nhân thời gian: A = 1 kW × 2 h = 2 kWh. Điểm mấu chốt là đổi 1000 W sang 1 kW trước khi nhân, vì đơn vị đề hỏi là kWh.',
    traps: {
      B: 'Nhân 1000 W với 2 h mà quên đổi sang kW.',
      D: 'Nhân nhầm với hiệu điện thế.',
    },
    skills: ['điện năng tiêu thụ', 'đổi đơn vị'],
  },
  {
    id: 's.phy.h8',
    topicId: 'science.physics.electricity',
    difficulty: 5,
    stem: 'Hai bóng đèn có điện trở lần lượt 10 Ω và 20 Ω được mắc NỐI TIẾP vào nguồn. Bóng nào sáng hơn?',
    choices: [
      'Bóng 20 Ω, vì cùng dòng điện nên bóng có điện trở lớn hơn tiêu thụ công suất lớn hơn',
      'Bóng 10 Ω, vì điện trở nhỏ hơn nên dòng qua nó lớn hơn',
      'Hai bóng sáng như nhau',
      'Không xác định được nếu chưa biết hiệu điện thế nguồn',
    ],
    answer: 'A',
    explanation:
      'Nối tiếp nghĩa là cùng cường độ dòng điện. Công suất P = I²R, mà I giống nhau nên bóng có R lớn hơn sẽ tiêu thụ công suất lớn hơn và sáng hơn. Kết luận này không phụ thuộc hiệu điện thế nguồn.',
    traps: {
      B: 'Nối tiếp thì dòng qua hai bóng bằng nhau; điện trở nhỏ không làm dòng riêng lớn hơn.',
      D: 'Việc so sánh chỉ cần biết cách mắc, không cần biết giá trị nguồn.',
    },
    skills: ['mạch nối tiếp', 'công suất tiêu thụ'],
  },
  {
    id: 's.phy.h9',
    topicId: 'science.physics.modern',
    difficulty: 4,
    stem: 'Chu kỳ bán rã của một chất phóng xạ là 8 ngày. Sau 24 ngày, khối lượng chất còn lại bằng bao nhiêu phần khối lượng ban đầu?',
    choices: ['1/8', '1/3', '1/24', '3/8'],
    answer: 'A',
    explanation:
      '24 ngày là 3 chu kỳ bán rã. Sau mỗi chu kỳ khối lượng còn một nửa, nên sau ba chu kỳ còn (1/2)³ = 1/8 khối lượng ban đầu.',
    traps: {
      B: 'Chia thời gian cho số chu kỳ thay vì lũy thừa một nửa.',
      C: 'Lấy nghịch đảo của tổng số ngày.',
    },
    skills: ['chu kỳ bán rã', 'phóng xạ'],
  },
  {
    id: 's.phy.h10',
    topicId: 'science.physics.modern',
    difficulty: 5,
    stem: 'Vì sao hiện tượng quang điện chứng tỏ ánh sáng có tính chất hạt mà thuyết sóng không giải thích được?',
    choices: [
      'Vì quang điện phụ thuộc bước sóng chứ không phụ thuộc cường độ, trong khi thuyết sóng dự đoán ngược lại',
      'Vì ánh sáng truyền theo đường thẳng',
      'Vì ánh sáng có thể giao thoa',
      'Vì electron mang điện tích âm',
    ],
    answer: 'A',
    explanation:
      'Theo thuyết sóng, tăng cường độ là tăng năng lượng nên đủ mạnh thì phải bứt được electron với mọi bước sóng. Thực nghiệm cho thấy ánh sáng bước sóng dài dù rất mạnh cũng không gây quang điện, còn ánh sáng bước sóng ngắn dù rất yếu vẫn gây được. Điều đó chỉ giải thích được nếu năng lượng đến theo từng hạt photon với ε = hc/λ.',
    traps: {
      C: 'Giao thoa là bằng chứng cho tính chất SÓNG, đi ngược lại câu hỏi.',
    },
    skills: ['thuyết lượng tử ánh sáng', 'lưỡng tính sóng hạt'],
  },
];

const chemistry: QuestionDraft[] = [
  {
    id: 's.che.h1',
    topicId: 'science.chemistry.general',
    difficulty: 4,
    stem: 'Trộn 100 ml dung dịch HCl 0,2M với 100 ml dung dịch NaOH 0,3M. Dung dịch sau phản ứng có môi trường gì?',
    choices: ['Bazơ, vì NaOH còn dư', 'Trung tính', 'Axit, vì HCl còn dư', 'Không xác định được'],
    answer: 'A',
    explanation:
      'n(HCl) = 0,02 mol, n(NaOH) = 0,03 mol. Phản ứng trung hòa theo tỉ lệ 1 : 1 nên HCl hết, NaOH còn dư 0,01 mol. Dung dịch dư bazơ nên có môi trường bazơ, làm quỳ tím hóa xanh.',
    traps: {
      B: 'Thấy hai thể tích bằng nhau nên nghĩ vừa đủ, mà quên so sánh số mol.',
      C: 'Đảo chiều so sánh số mol.',
    },
    skills: ['phản ứng trung hòa', 'chất dư'],
  },
  {
    id: 's.che.h2',
    topicId: 'science.chemistry.general',
    difficulty: 4,
    stem: 'Cho 2,4 gam Mg tan hoàn toàn trong dung dịch HCl dư. Thể tích khí H₂ thu được ở điều kiện tiêu chuẩn là bao nhiêu? Biết Mg = 24.',
    choices: ['2,24 lít', '1,12 lít', '4,48 lít', '22,4 lít'],
    answer: 'A',
    explanation:
      'n(Mg) = 2,4/24 = 0,1 mol. Phương trình Mg + 2HCl → MgCl₂ + H₂ cho tỉ lệ Mg : H₂ là 1 : 1, nên n(H₂) = 0,1 mol. Thể tích ở điều kiện tiêu chuẩn bằng 0,1 × 22,4 = 2,24 lít. Vì HCl dư nên Mg là chất quyết định.',
    traps: {
      B: 'Chia đôi vì nhầm tỉ lệ Mg : H₂ là 2 : 1 — hệ số 2 là của HCl, không phải của H₂.',
      C: 'Nhân đôi theo hệ số của HCl.',
    },
    skills: ['tính theo phương trình', 'thể tích khí'],
  },
  {
    id: 's.che.h3',
    topicId: 'science.chemistry.general',
    difficulty: 5,
    stem: 'Dung dịch X có pH = 3, dung dịch Y có pH = 5. Nồng độ ion H⁺ của X gấp bao nhiêu lần của Y?',
    choices: ['100 lần', '2 lần', '10 lần', '1000 lần'],
    answer: 'A',
    explanation:
      'pH = −log[H⁺] nên [H⁺] của X là 10⁻³ M và của Y là 10⁻⁵ M. Tỉ số bằng 10⁻³/10⁻⁵ = 10² = 100 lần. Chênh lệch một đơn vị pH ứng với chênh lệch mười lần nồng độ.',
    traps: {
      B: 'Lấy hiệu hai giá trị pH là 5 − 3 = 2 rồi coi đó là số lần.',
      C: 'Chỉ tính cho chênh lệch một đơn vị pH.',
    },
    skills: ['pH', 'thang logarit'],
  },
  {
    id: 's.che.h4',
    topicId: 'science.chemistry.inorganic',
    difficulty: 4,
    stem: 'Cho hỗn hợp Fe và Cu vào dung dịch HCl dư. Hiện tượng quan sát được là gì?',
    choices: [
      'Có khí thoát ra và còn chất rắn màu đỏ không tan',
      'Cả hai kim loại đều tan hết, có khí thoát ra',
      'Không có hiện tượng gì',
      'Có kết tủa màu xanh xuất hiện',
    ],
    answer: 'A',
    explanation:
      'Fe đứng trước H trong dãy hoạt động nên tan trong HCl và giải phóng H₂. Cu đứng sau H nên không phản ứng, còn lại ở dạng chất rắn màu đỏ. Đây cũng là cách tách Cu ra khỏi hỗn hợp.',
    traps: {
      B: 'Áp dụng quy tắc kim loại tác dụng axit cho cả hai mà không kiểm vị trí so với H.',
      D: 'Kết tủa xanh là của Cu(OH)₂, cần môi trường bazơ chứ không phải axit.',
    },
    skills: ['dãy hoạt động hóa học', 'tách kim loại'],
  },
  {
    id: 's.che.h5',
    topicId: 'science.chemistry.inorganic',
    difficulty: 4,
    stem: 'Nhỏ từ từ dung dịch NaOH vào dung dịch AlCl₃ cho đến dư. Hiện tượng đầy đủ là gì?',
    choices: [
      'Xuất hiện kết tủa trắng, sau đó kết tủa tan dần khi NaOH dư',
      'Chỉ xuất hiện kết tủa trắng và không tan',
      'Không có hiện tượng gì',
      'Có khí không màu thoát ra',
    ],
    answer: 'A',
    explanation:
      'Ban đầu NaOH tạo kết tủa Al(OH)₃ màu trắng. Vì Al(OH)₃ là hiđroxit lưỡng tính nên khi NaOH dư nó tiếp tục tan tạo NaAlO₂. Hiện tượng hai giai đoạn này là dấu hiệu nhận biết đặc trưng của muối nhôm.',
    traps: {
      B: 'Bỏ qua tính lưỡng tính của Al(OH)₃ — đây là điểm phân biệt nhôm với sắt hay magie.',
    },
    skills: ['hiđroxit lưỡng tính', 'nhận biết ion nhôm'],
  },
  {
    id: 's.che.h6',
    topicId: 'science.chemistry.inorganic',
    difficulty: 5,
    stem: 'Ngâm một lá Zn vào dung dịch CuSO₄. Sau một thời gian lấy lá kẽm ra, khối lượng lá kim loại thay đổi thế nào? Biết Zn = 65, Cu = 64.',
    choices: [
      'Giảm, vì mỗi mol Zn tan đi chỉ được thay bằng một mol Cu nhẹ hơn',
      'Tăng, vì có đồng bám vào',
      'Không đổi',
      'Không xác định được nếu chưa biết nồng độ dung dịch',
    ],
    answer: 'A',
    explanation:
      'Phản ứng Zn + CuSO₄ → ZnSO₄ + Cu theo tỉ lệ 1 : 1. Cứ mỗi mol phản ứng, lá kim loại mất 65 g Zn và nhận về 64 g Cu, tức giảm 1 g. Việc thấy đồng bám vào rất dễ gây cảm giác khối lượng tăng, nhưng phải so cả hai chiều.',
    traps: {
      B: 'Chỉ nhìn phần kim loại bám vào mà quên phần kẽm đã tan ra.',
      D: 'Chiều thay đổi được quyết định bởi khối lượng mol, không phụ thuộc nồng độ.',
    },
    skills: ['phản ứng kim loại với muối', 'thay đổi khối lượng lá kim loại'],
  },
  {
    id: 's.che.h7',
    topicId: 'science.chemistry.organic',
    difficulty: 4,
    stem: 'Chất nào sau đây vừa tác dụng được với dung dịch NaOH, vừa tác dụng được với Na giải phóng khí H₂?',
    choices: ['CH₃COOH', 'C₂H₅OH', 'CH₄', 'CH₃COOC₂H₅'],
    answer: 'A',
    explanation:
      'Axit cacboxylic có nhóm –COOH nên vừa mang tính axit tác dụng với NaOH, vừa có hiđro linh động tác dụng với Na tạo H₂. Ancol chỉ tác dụng với Na chứ không tác dụng với NaOH; este tác dụng với NaOH nhưng không tác dụng với Na.',
    traps: {
      B: 'Ancol tác dụng được với Na nhưng không tác dụng với NaOH.',
      D: 'Este phản ứng thủy phân với NaOH nhưng không có hiđro linh động cho phản ứng với Na.',
    },
    skills: ['nhóm chức', 'tính chất axit cacboxylic'],
  },
  {
    id: 's.che.h8',
    topicId: 'science.chemistry.organic',
    difficulty: 5,
    stem: 'Đốt cháy hoàn toàn một hiđrocacbon X thu được số mol CO₂ bằng số mol H₂O. Kết luận nào đúng về X?',
    choices: [
      'X là anken hoặc xicloankan, có công thức chung CₙH₂ₙ',
      'X chắc chắn là ankan',
      'X chắc chắn là ankin',
      'X là benzen',
    ],
    answer: 'A',
    explanation:
      'Với CₙH₂ₙ, đốt cháy cho n mol CO₂ và n mol H₂O nên tỉ lệ bằng 1. Ankan CₙH₂ₙ₊₂ cho số mol H₂O lớn hơn CO₂; ankin CₙH₂ₙ₋₂ cho số mol H₂O nhỏ hơn CO₂. Vì công thức CₙH₂ₙ ứng với cả anken lẫn xicloankan nên không kết luận được cụ thể là loại nào.',
    traps: {
      B: 'Ankan luôn cho n(H₂O) > n(CO₂), khác với dữ kiện đề cho.',
      C: 'Ankin cho n(H₂O) < n(CO₂).',
    },
    skills: ['đốt cháy hiđrocacbon', 'công thức tổng quát'],
  },
  {
    id: 's.che.h9',
    topicId: 'science.chemistry.organic',
    difficulty: 5,
    stem: 'Cho 0,1 mol este đơn chức X tác dụng vừa đủ với 100 ml dung dịch NaOH 1M. Nhận định nào đúng?',
    choices: [
      'Tỉ lệ mol este và NaOH là 1 : 1, phù hợp với este đơn chức thông thường',
      'X là este hai chức',
      'X là este của phenol',
      'Phản ứng chưa hoàn toàn',
    ],
    answer: 'A',
    explanation:
      'n(NaOH) = 0,1 mol, bằng đúng n(este), nên tỉ lệ là 1 : 1 — đúng với một este đơn chức của ancol thủy phân trong môi trường kiềm. Este của phenol cần tỉ lệ 1 : 2 vì phenol tạo thêm muối, còn este hai chức cũng cần 1 : 2.',
    traps: {
      C: 'Este của phenol tiêu tốn 2 mol NaOH cho mỗi mol este, không khớp dữ kiện.',
      B: 'Este hai chức cũng cần tỉ lệ 1 : 2.',
    },
    skills: ['thủy phân este', 'xác định số nhóm chức'],
  },
];

const biology: QuestionDraft[] = [
  {
    id: 's.bio.h1',
    topicId: 'science.biology.cell',
    difficulty: 5,
    stem: 'Một tế bào sinh dục sơ khai 2n = 12 nguyên phân 3 lần rồi toàn bộ tế bào con bước vào giảm phân. Số giao tử được tạo ra là bao nhiêu, nếu đó là tế bào sinh tinh?',
    choices: ['32', '8', '16', '64'],
    answer: 'A',
    explanation:
      'Sau 3 lần nguyên phân có 2³ = 8 tế bào. Mỗi tế bào sinh tinh giảm phân cho 4 tinh trùng, nên tổng số giao tử là 8 × 4 = 32.',
    traps: {
      B: 'Dừng ở số tế bào sau nguyên phân, quên bước giảm phân.',
      C: 'Nhân với 2 thay vì 4 — mỗi tế bào sinh tinh cho bốn tinh trùng, không phải hai.',
    },
    skills: ['nguyên phân và giảm phân', 'tạo giao tử'],
  },
  {
    id: 's.bio.h2',
    topicId: 'science.biology.genetics',
    difficulty: 4,
    stem: 'Bố có nhóm máu A, mẹ có nhóm máu B, con có nhóm máu O. Kiểu gen của bố mẹ là gì?',
    choices: [
      'Bố I^A I^O và mẹ I^B I^O',
      'Bố I^A I^A và mẹ I^B I^B',
      'Bố I^A I^B và mẹ I^O I^O',
      'Không thể xảy ra trường hợp này',
    ],
    answer: 'A',
    explanation:
      'Con nhóm O có kiểu gen I^O I^O nên nhận một alen I^O từ mỗi bên. Vậy cả bố lẫn mẹ đều phải mang alen I^O ở dạng dị hợp: bố là I^A I^O và mẹ là I^B I^O.',
    traps: {
      B: 'Bố mẹ đồng hợp không thể cho alen I^O nên không thể sinh con nhóm O.',
      D: 'Trường hợp này hoàn toàn có thể xảy ra khi bố mẹ đều dị hợp.',
    },
    skills: ['di truyền nhóm máu', 'suy kiểu gen từ đời con'],
  },
  {
    id: 's.bio.h3',
    topicId: 'science.biology.genetics',
    difficulty: 5,
    stem: 'Ở một loài, phép lai giữa hai cơ thể dị hợp hai cặp gen cho đời con có tỉ lệ kiểu hình 9 : 7. Kết luận nào đúng về quy luật di truyền chi phối?',
    choices: [
      'Tương tác gen kiểu bổ sung, cần cả hai gen trội cùng có mặt mới cho kiểu hình trội',
      'Phân li độc lập thông thường',
      'Liên kết gen hoàn toàn',
      'Di truyền liên kết giới tính',
    ],
    answer: 'A',
    explanation:
      'Tỉ lệ 9 : 7 là biến dạng của 9 : 3 : 3 : 1, trong đó ba nhóm 3 : 3 : 1 gộp thành một kiểu hình duy nhất. Điều đó xảy ra khi chỉ kiểu gen có đồng thời cả A- và B- mới cho kiểu hình trội, còn thiếu một trong hai đều cho cùng một kiểu hình lặn — đó là tương tác bổ sung.',
    traps: {
      B: 'Phân li độc lập thuần túy cho bốn nhóm kiểu hình 9 : 3 : 3 : 1, không phải hai nhóm.',
      C: 'Liên kết hoàn toàn cho tỉ lệ 3 : 1 hoặc 1 : 2 : 1 tùy kiểu gen.',
    },
    skills: ['tương tác gen', 'đọc tỉ lệ kiểu hình'],
  },
  {
    id: 's.bio.h4',
    topicId: 'science.biology.organism',
    difficulty: 5,
    stem: 'Trong một hệ sinh thái, nếu loại bỏ hoàn toàn sinh vật phân giải thì hậu quả trực tiếp nào xảy ra?',
    choices: [
      'Chu trình vật chất bị đứt, chất hữu cơ tích tụ và chất vô cơ không được trả lại cho môi trường',
      'Dòng năng lượng bị đảo chiều',
      'Sinh vật sản xuất tăng mạnh vì không còn cạnh tranh',
      'Không ảnh hưởng gì vì phân giải không nằm trong chuỗi thức ăn',
    ],
    answer: 'A',
    explanation:
      'Sinh vật phân giải khép vòng tuần hoàn vật chất bằng cách chuyển chất hữu cơ trong xác sinh vật thành chất vô cơ cho sinh vật sản xuất dùng lại. Mất khâu này thì chất hữu cơ tích tụ còn nguồn dinh dưỡng vô cơ cạn dần, kéo theo sinh vật sản xuất suy giảm.',
    traps: {
      B: 'Dòng năng lượng luôn một chiều và không đảo được; chỉ chu trình vật chất là tuần hoàn.',
      C: 'Ngược lại, sinh vật sản xuất sẽ thiếu chất khoáng.',
    },
    skills: ['chu trình vật chất', 'vai trò sinh vật phân giải'],
  },
];

const history: QuestionDraft[] = [
  {
    id: 's.his.h1',
    topicId: 'science.history.vietnam',
    difficulty: 4,
    stem: 'Điểm giống nhau cơ bản giữa Cách mạng tháng Tám 1945 và cuộc Tổng tiến công mùa Xuân 1975 là gì?',
    choices: [
      'Đều nổ ra khi thời cơ chín muồi và giành thắng lợi trong thời gian ngắn',
      'Đều có sự giúp đỡ trực tiếp của quân đội nước ngoài',
      'Đều diễn ra khi kẻ thù còn nguyên vẹn lực lượng',
      'Đều kết thúc bằng một hiệp định quốc tế',
    ],
    answer: 'A',
    explanation:
      'Cả hai sự kiện đều là kết quả của quá trình chuẩn bị lâu dài, và đều được phát động khi thời cơ xuất hiện, nhờ đó thắng lợi đến rất nhanh. Cách mạng tháng Tám diễn ra trong khoảng hai tuần, còn Tổng tiến công 1975 hoàn thành trong chưa đầy hai tháng.',
    traps: {
      D: 'Cách mạng tháng Tám không kết thúc bằng hiệp định; năm 1975 cũng vậy, hiệp định Paris ký trước đó hai năm.',
      C: 'Cả hai đều nổ ra khi kẻ thù đã suy yếu rõ rệt.',
    },
    skills: ['so sánh sự kiện lịch sử', 'thời cơ cách mạng'],
  },
  {
    id: 's.his.h2',
    topicId: 'science.history.vietnam',
    difficulty: 4,
    stem: 'Ý nghĩa quan trọng nhất của Hiệp định Paris năm 1973 đối với cuộc kháng chiến chống Mỹ là gì?',
    choices: [
      'Buộc Mỹ rút hết quân, tạo so sánh lực lượng có lợi cho việc giải phóng miền Nam',
      'Chấm dứt hoàn toàn chiến tranh trên cả nước',
      'Thống nhất đất nước về mặt nhà nước',
      'Khôi phục hoàn toàn kinh tế miền Bắc',
    ],
    answer: 'A',
    explanation:
      'Hiệp định buộc Mỹ và đồng minh rút hết quân khỏi miền Nam trong khi lực lượng cách mạng vẫn được giữ tại chỗ. Thay đổi cán cân đó là tiền đề trực tiếp cho cuộc Tổng tiến công năm 1975.',
    traps: {
      B: 'Chiến sự ở miền Nam vẫn tiếp diễn sau hiệp định, chỉ có quân Mỹ rút đi.',
      C: 'Thống nhất về mặt nhà nước diễn ra năm 1976, sau khi đất nước đã hoàn toàn giải phóng.',
    },
    skills: ['Hiệp định Paris', 'ý nghĩa lịch sử'],
  },
  {
    id: 's.his.h3',
    topicId: 'science.history.vietnam',
    difficulty: 5,
    stem: 'Vì sao nói đường lối Đổi mới năm 1986 là một quá trình chứ không phải một sự kiện đơn lẻ?',
    choices: [
      'Vì nó được chuẩn bị bằng các bước thử nghiệm từ trước và tiếp tục được bổ sung qua nhiều kỳ đại hội sau đó',
      'Vì nó chỉ được công bố mà chưa từng thực hiện',
      'Vì nó chỉ liên quan tới lĩnh vực nông nghiệp',
      'Vì nó do nước ngoài đề xuất',
    ],
    answer: 'A',
    explanation:
      'Trước năm 1986 đã có những bước tìm tòi từ thực tiễn ở cơ sở như khoán sản phẩm trong nông nghiệp. Đại hội VI chính thức hóa đường lối, nhưng nội dung tiếp tục được bổ sung và cụ thể hóa qua các kỳ đại hội sau, nên đây là một quá trình có trước và có sau.',
    traps: {
      C: 'Đổi mới diễn ra toàn diện, trọng tâm là kinh tế nhưng không giới hạn ở nông nghiệp.',
    },
    skills: ['công cuộc Đổi mới', 'tư duy quá trình'],
  },
  {
    id: 's.his.h4',
    topicId: 'science.history.world',
    difficulty: 4,
    stem: 'Nguyên nhân sâu xa dẫn tới sự sụp đổ của trật tự hai cực Ianta là gì?',
    choices: [
      'Sự suy yếu về kinh tế của một cực và sự vươn lên của các trung tâm kinh tế mới',
      'Một cuộc chiến tranh trực tiếp giữa hai siêu cường',
      'Sự can thiệp của Liên hợp quốc',
      'Sự ra đời của Liên minh châu Âu',
    ],
    answer: 'A',
    explanation:
      'Trật tự hai cực dựa trên thế cân bằng giữa hai siêu cường. Khi kinh tế Liên Xô suy yếu và các trung tâm như Tây Âu, Nhật Bản vươn lên, nền tảng của thế cân bằng đó mất đi. Hai siêu cường chưa từng đánh nhau trực tiếp.',
    traps: {
      B: 'Chiến tranh lạnh có tên gọi như vậy chính vì không có xung đột quân sự trực tiếp giữa hai bên.',
    },
    skills: ['trật tự hai cực', 'nguyên nhân sâu xa'],
  },
  {
    id: 's.his.h5',
    topicId: 'science.history.world',
    difficulty: 4,
    stem: 'Điểm khác biệt cơ bản giữa xu thế toàn cầu hóa hiện nay với quá trình mở rộng giao thương của các thế kỷ trước là gì?',
    choices: [
      'Sự phụ thuộc lẫn nhau sâu sắc giữa các nền kinh tế và tốc độ lan truyền tức thời nhờ công nghệ',
      'Chỉ có các nước phát triển tham gia',
      'Không liên quan tới thương mại',
      'Hoàn toàn do các tổ chức quốc tế điều hành',
    ],
    answer: 'A',
    explanation:
      'Giao thương đã có từ lâu, nhưng toàn cầu hóa hiện nay khác về chất: các nền kinh tế gắn kết tới mức một biến động ở nơi này lan sang nơi khác gần như tức thời, nhờ hạ tầng thông tin và tài chính do cách mạng khoa học công nghệ tạo ra.',
    traps: {
      B: 'Toàn cầu hóa cuốn theo cả các nước đang phát triển, đó chính là nguồn của cả cơ hội lẫn thách thức.',
    },
    skills: ['toàn cầu hóa', 'so sánh lịch sử'],
  },
  {
    id: 's.his.h6',
    topicId: 'science.history.world',
    difficulty: 5,
    stem: 'Vì sao nói cuộc cách mạng khoa học công nghệ vừa là cơ hội vừa là thách thức đối với các nước đang phát triển?',
    choices: [
      'Vì nó cho phép đi tắt đón đầu, nhưng đồng thời làm khoảng cách với nước đi trước rộng ra nếu không bắt kịp',
      'Vì nó chỉ mang lại lợi ích cho nước giàu',
      'Vì nó làm giảm nhu cầu lao động ở mọi ngành',
      'Vì nó buộc các nước phải từ bỏ nông nghiệp',
    ],
    answer: 'A',
    explanation:
      'Công nghệ có thể được tiếp nhận mà không cần lặp lại toàn bộ chặng đường của nước đi trước, đó là cơ hội đi tắt. Nhưng chính tốc độ phát triển nhanh khiến nước nào không theo kịp sẽ bị bỏ xa hơn trước, nên cùng một nhân tố tạo ra cả hai mặt.',
    traps: {
      B: 'Nếu chỉ có lợi cho nước giàu thì đã không còn là cơ hội, mâu thuẫn với vế đầu của câu hỏi.',
    },
    skills: ['cách mạng khoa học công nghệ', 'tác động hai mặt'],
  },
];

const geography: QuestionDraft[] = [
  {
    id: 's.geo.h1',
    topicId: 'science.geography.nature',
    difficulty: 4,
    stem: 'Vì sao miền Trung nước ta có mùa mưa lệch về thu đông, khác với miền Bắc và miền Nam?',
    choices: [
      'Vì dãy Trường Sơn chắn gió mùa đông bắc đã đi qua biển, gây mưa lớn ở sườn đông vào cuối năm',
      'Vì miền Trung nằm gần xích đạo hơn',
      'Vì miền Trung không chịu ảnh hưởng của gió mùa',
      'Vì miền Trung có địa hình thấp hơn hai miền còn lại',
    ],
    answer: 'A',
    explanation:
      'Gió mùa đông bắc khi thổi qua Biển Đông được cung cấp ẩm, gặp dãy Trường Sơn chắn ngang thì bị đẩy lên cao và gây mưa lớn ở sườn đông vào các tháng cuối năm. Cùng lúc đó, hai miền còn lại đang trong mùa khô.',
    traps: {
      B: 'Vĩ độ không giải thích được sự lệch pha mùa mưa; miền Nam gần xích đạo hơn mà mùa mưa lại vào hè thu.',
      C: 'Miền Trung chịu ảnh hưởng gió mùa rõ rệt, đó chính là nguyên nhân.',
    },
    skills: ['phân hóa khí hậu', 'địa hình chắn gió'],
  },
  {
    id: 's.geo.h2',
    topicId: 'science.geography.nature',
    difficulty: 4,
    stem: 'Đặc điểm nào của địa hình Việt Nam gây ra quá trình xâm thực mạnh ở miền núi và bồi tụ nhanh ở đồng bằng?',
    choices: [
      'Địa hình dốc kết hợp với lượng mưa lớn tập trung theo mùa',
      'Địa hình chủ yếu là đồng bằng thấp',
      'Địa hình được nâng lên đồng đều trên cả nước',
      'Địa hình không bị chia cắt',
    ],
    answer: 'A',
    explanation:
      'Nước chảy trên sườn dốc có động năng lớn nên bào mòn mạnh; mưa lớn tập trung vào mùa mưa làm quá trình này diễn ra dữ dội. Vật liệu bị bào mòn được sông chuyển xuống hạ lưu, gây bồi tụ nhanh ở các đồng bằng châu thổ.',
    traps: {
      D: 'Địa hình nước ta bị chia cắt mạnh, và chính sự chia cắt làm tăng độ dốc.',
    },
    skills: ['xâm thực và bồi tụ', 'quan hệ địa hình khí hậu'],
  },
  {
    id: 's.geo.h3',
    topicId: 'science.geography.nature',
    difficulty: 5,
    stem: 'Vì sao cùng nằm trong vành đai nội chí tuyến nhưng khí hậu Việt Nam ẩm ướt còn Bắc Phi lại khô hạn?',
    choices: [
      'Vì Việt Nam nằm trong khu vực gió mùa và giáp Biển Đông, còn Bắc Phi nằm trong vùng áp cao cận chí tuyến',
      'Vì Việt Nam có vĩ độ thấp hơn nhiều',
      'Vì Việt Nam có diện tích nhỏ hơn',
      'Vì Bắc Phi không có sông ngòi',
    ],
    answer: 'A',
    explanation:
      'Vĩ độ chỉ quyết định nền nhiệt, không quyết định lượng mưa. Việt Nam nằm trong khu vực hoạt động của gió mùa và tiếp giáp Biển Đông nên nhận được nguồn ẩm dồi dào. Bắc Phi nằm dưới vùng áp cao cận chí tuyến với luồng không khí đi xuống, ngăn cản sự hình thành mây và mưa.',
    traps: {
      B: 'Chênh lệch vĩ độ giữa hai khu vực không lớn và không giải thích được chênh lệch lượng mưa.',
      D: 'Thiếu sông ngòi là hệ quả của khô hạn, không phải nguyên nhân.',
    },
    skills: ['hoàn lưu khí quyển', 'so sánh khí hậu'],
  },
  {
    id: 's.geo.h4',
    topicId: 'science.geography.economy',
    difficulty: 4,
    stem: 'Vì sao Đông Nam Bộ trở thành vùng có giá trị sản xuất công nghiệp lớn nhất cả nước?',
    choices: [
      'Vì hội tụ vị trí thuận lợi, hạ tầng tốt, lao động kỹ thuật cao và thu hút đầu tư nước ngoài mạnh',
      'Vì có diện tích lớn nhất cả nước',
      'Vì có trữ lượng than đá lớn nhất',
      'Vì có khí hậu mát mẻ quanh năm',
    ],
    answer: 'A',
    explanation:
      'Thế mạnh công nghiệp của vùng không đến từ tài nguyên mà từ tổ hợp các điều kiện kinh tế xã hội: vị trí đầu mối giao thông, hạ tầng và cảng biển phát triển, nguồn lao động có trình độ, cùng chính sách thu hút vốn đầu tư nước ngoài.',
    traps: {
      C: 'Than đá tập trung ở Quảng Ninh thuộc Trung du miền núi Bắc Bộ.',
      B: 'Đông Nam Bộ không phải vùng có diện tích lớn nhất.',
    },
    skills: ['vùng kinh tế', 'nhân tố kinh tế xã hội'],
  },
  {
    id: 's.geo.h5',
    topicId: 'science.geography.economy',
    difficulty: 4,
    stem: 'Cơ cấu dân số vàng mang lại thuận lợi lớn nhất nào cho phát triển kinh tế?',
    choices: [
      'Tỉ lệ người trong độ tuổi lao động cao, gánh nặng phụ thuộc thấp',
      'Tổng dân số tăng nhanh',
      'Tuổi thọ trung bình tăng',
      'Tỉ lệ dân thành thị tăng',
    ],
    answer: 'A',
    explanation:
      'Cơ cấu dân số vàng nghĩa là số người trong độ tuổi lao động gấp đôi trở lên số người phụ thuộc. Nhờ vậy xã hội có nhiều người tạo ra của cải hơn so với số người cần được nuôi, tạo dư địa để tích lũy và đầu tư.',
    traps: {
      C: 'Tuổi thọ tăng thuộc về chất lượng dân số, và nếu kéo dài sẽ dẫn tới già hóa chứ không phải dân số vàng.',
    },
    skills: ['cơ cấu dân số', 'dân số vàng'],
  },
  {
    id: 's.geo.h6',
    topicId: 'science.geography.economy',
    difficulty: 5,
    stem: 'Vì sao chuyển dịch cơ cấu kinh tế theo hướng tăng tỉ trọng dịch vụ được xem là dấu hiệu của nền kinh tế phát triển hơn?',
    choices: [
      'Vì dịch vụ tạo giá trị gia tăng cao trên mỗi đơn vị lao động và phản ánh nhu cầu xã hội đã vượt mức cơ bản',
      'Vì dịch vụ không cần vốn đầu tư',
      'Vì dịch vụ không chịu ảnh hưởng của thiên tai',
      'Vì dịch vụ sử dụng ít lao động nhất',
    ],
    answer: 'A',
    explanation:
      'Khi thu nhập tăng, nhu cầu chuyển từ hàng hóa cơ bản sang các dịch vụ như y tế, giáo dục, tài chính, du lịch. Đồng thời các ngành dịch vụ hiện đại tạo ra giá trị gia tăng cao trên mỗi lao động, nên tỉ trọng dịch vụ tăng phản ánh trình độ phát triển của nền kinh tế.',
    traps: {
      B: 'Nhiều ngành dịch vụ hiện đại đòi hỏi vốn và công nghệ rất lớn.',
    },
    skills: ['chuyển dịch cơ cấu', 'trình độ phát triển kinh tế'],
  },
  {
    id: 's.geo.h7',
    topicId: 'science.geography.data',
    difficulty: 4,
    stem: 'Cho bảng số liệu về diện tích và sản lượng lúa qua nhiều năm, đề yêu cầu thể hiện tốc độ tăng trưởng của hai đại lượng này. Biểu đồ thích hợp nhất là gì?',
    choices: [
      'Biểu đồ đường, sau khi quy về chỉ số với năm gốc bằng 100%',
      'Biểu đồ tròn',
      'Biểu đồ miền',
      'Biểu đồ cột ghép giữ nguyên đơn vị gốc',
    ],
    answer: 'A',
    explanation:
      'Từ khóa "tốc độ tăng trưởng" chỉ định biểu đồ đường. Vì diện tích tính bằng nghìn hecta còn sản lượng tính bằng nghìn tấn nên phải quy về chỉ số phần trăm với năm đầu bằng 100% mới vẽ chung một hệ trục được.',
    traps: {
      D: 'Giữ nguyên hai đơn vị khác nhau thì hai đường không so sánh được với nhau.',
      C: 'Biểu đồ miền dùng cho cơ cấu, không dùng cho tốc độ.',
    },
    skills: ['chọn dạng biểu đồ', 'quy về chỉ số'],
  },
  {
    id: 's.geo.h8',
    topicId: 'science.geography.data',
    difficulty: 4,
    stem: 'Một bảng số liệu cho thấy tỉ trọng ngành công nghiệp trong GDP giảm nhưng giá trị tuyệt đối của ngành này lại tăng. Nhận xét nào đúng?',
    choices: [
      'Công nghiệp vẫn tăng trưởng nhưng chậm hơn tốc độ tăng chung của nền kinh tế',
      'Công nghiệp đang suy thoái',
      'Số liệu trong bảng có mâu thuẫn',
      'Nền kinh tế đang thu hẹp',
    ],
    answer: 'A',
    explanation:
      'Tỉ trọng là phần của một ngành trong tổng, còn giá trị tuyệt đối là quy mô của riêng ngành đó. Nếu tổng tăng nhanh hơn ngành thì phần của ngành nhỏ đi dù bản thân nó vẫn lớn lên. Hai chỉ số này hoàn toàn có thể đi ngược chiều nhau.',
    traps: {
      C: 'Đây là mô hình số liệu rất phổ biến, không hề mâu thuẫn.',
      B: 'Suy thoái đòi hỏi giá trị tuyệt đối giảm, trái với dữ kiện.',
    },
    skills: ['giá trị tuyệt đối và tương đối', 'đọc bảng số liệu'],
  },
  {
    id: 's.geo.h9',
    topicId: 'science.geography.data',
    difficulty: 5,
    stem: 'Năm 2015 sản lượng một ngành là 200 nghìn tấn, năm 2020 là 260 nghìn tấn, năm 2023 là 286 nghìn tấn. Nhận xét nào chính xác nhất về tốc độ tăng?',
    choices: [
      'Sản lượng tăng liên tục nhưng tốc độ tăng giai đoạn sau chậm hơn giai đoạn trước',
      'Sản lượng tăng đều với cùng tốc độ',
      'Tốc độ tăng giai đoạn sau nhanh hơn',
      'Sản lượng giảm ở giai đoạn cuối',
    ],
    answer: 'A',
    explanation:
      'Giai đoạn 2015–2020 tăng 60 nghìn tấn trên nền 200, tức 30%. Giai đoạn 2020–2023 tăng 26 nghìn tấn trên nền 260, tức 10%. Sản lượng vẫn tăng ở cả hai giai đoạn nhưng tốc độ tương đối đã chậm lại rõ rệt.',
    traps: {
      C: 'Nhìn vào số tấn tăng thêm mà không quy về phần trăm trên nền tương ứng.',
      B: 'Hai mức tăng tương đối là 30% và 10%, không thể coi là đều.',
    },
    skills: ['tốc độ tăng trưởng', 'so sánh giai đoạn'],
  },
];

export const HARD_SCIENCES = [
  ...buildQuestions('science', 'physics', physics),
  ...buildQuestions('science', 'chemistry', chemistry),
  ...buildQuestions('science', 'biology', biology),
  ...buildQuestions('science', 'history', history),
  ...buildQuestions('science', 'geography', geography),
];
