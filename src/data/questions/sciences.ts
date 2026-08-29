import { buildQuestions, type QuestionDraft } from './helpers';

const physics: QuestionDraft[] = [
  {
    id: 's.phy.1',
    topicId: 'science.physics.mechanics',
    difficulty: 2,
    stem: 'Một vật rơi tự do không vận tốc đầu từ độ cao 80 m. Lấy g = 10 m/s². Thời gian rơi đến khi chạm đất là:',
    choices: ['4 s', '8 s', '2 s', '16 s'],
    answer: 'A',
    explanation:
      'Rơi tự do không vận tốc đầu: h = ½gt², suy ra t = √(2h/g) = √(2 × 80/10) = √16 = 4 s. Thời gian rơi chỉ phụ thuộc độ cao, không phụ thuộc khối lượng vật.',
    traps: { B: 'Dùng nhầm h = gt² (quên hệ số ½).' },
    skills: ['rơi tự do'],
  },
  {
    id: 's.phy.2',
    topicId: 'science.physics.mechanics',
    difficulty: 1,
    stem: 'Một vật khối lượng 2 kg chịu tác dụng của hợp lực 6 N. Gia tốc của vật bằng:',
    choices: ['3 m/s²', '12 m/s²', '0,33 m/s²', '8 m/s²'],
    answer: 'A',
    explanation:
      'Định luật II Newton: gia tốc tỉ lệ thuận với hợp lực và tỉ lệ nghịch với khối lượng, a = F/m = 6/2 = 3 m/s², cùng hướng với hợp lực.',
    skills: ['định luật Newton'],
  },
  {
    id: 's.phy.3',
    topicId: 'science.physics.mechanics',
    difficulty: 2,
    stem: 'Động năng của vật khối lượng 2 kg chuyển động với vận tốc 5 m/s bằng:',
    choices: ['25 J', '50 J', '10 J', '12,5 J'],
    answer: 'A',
    explanation:
      'Động năng W_đ = ½mv² = ½ × 2 × 5² = 25 J. Lưu ý động năng tỉ lệ với BÌNH PHƯƠNG vận tốc: vận tốc tăng gấp đôi thì động năng tăng gấp bốn.',
    traps: { B: 'Quên hệ số ½.' },
    skills: ['động năng'],
  },
  {
    id: 's.phy.4',
    topicId: 'science.physics.mechanics',
    difficulty: 2,
    stem: 'Một lực 20 N kéo vật dịch chuyển 5 m theo đúng phương và chiều của lực. Công của lực bằng bao nhiêu jun?',
    answer: '100',
    explanation:
      'Công của lực không đổi: A = F·s·cosα. Lực cùng phương cùng chiều với dịch chuyển nên α = 0, cosα = 1, do đó A = 20 × 5 = 100 J.',
    skills: ['công cơ học'],
  },
  {
    id: 's.phy.5',
    topicId: 'science.physics.oscillation',
    difficulty: 2,
    stem: 'Con lắc lò xo có độ cứng k = 100 N/m gắn vật nặng m = 1 kg. Tần số góc của dao động bằng:',
    choices: ['10 rad/s', '100 rad/s', '1 rad/s', '2π rad/s'],
    answer: 'A',
    explanation:
      'Tần số góc của con lắc lò xo chỉ phụ thuộc độ cứng và khối lượng: ω = √(k/m) = √(100/1) = 10 rad/s. Từ đó suy ra chu kì T = 2π/ω ≈ 0,63 s.',
    skills: ['dao động điều hòa'],
  },
  {
    id: 's.phy.6',
    topicId: 'science.physics.oscillation',
    difficulty: 2,
    stem: 'Một sóng cơ có tần số 50 Hz truyền với tốc độ 200 m/s. Bước sóng bằng:',
    choices: ['4 m', '10 000 m', '0,25 m', '2,5 m'],
    answer: 'A',
    explanation:
      'Bước sóng là quãng đường sóng truyền được trong một chu kì: λ = v·T = v/f = 200/50 = 4 m. Nhớ quan hệ nghịch: cùng một tốc độ, tần số càng cao thì bước sóng càng ngắn.',
    traps: { B: 'Nhân v × f thay vì chia.' },
    skills: ['sóng cơ'],
  },
  {
    id: 's.phy.7',
    topicId: 'science.physics.oscillation',
    difficulty: 3,
    stem: 'Một vật dao động điều hòa với phương trình x = 5cos(4πt) cm (t tính bằng giây). Chu kì dao động bằng:',
    choices: ['0,5 s', '2 s', '4 s', '0,25 s'],
    answer: 'A',
    explanation:
      'Đối chiếu với dạng chuẩn x = Acos(ωt + φ) thì ω = 4π rad/s, nên chu kì T = 2π/ω = 2π/(4π) = 0,5 s và tần số f = 1/T = 2 Hz.',
    skills: ['phương trình dao động'],
  },
  {
    id: 's.phy.8',
    topicId: 'science.physics.electricity',
    difficulty: 2,
    stem: 'Hai điện trở R₁ = 6 Ω và R₂ = 3 Ω mắc nối tiếp vào hiệu điện thế 18 V. Cường độ dòng điện qua mạch bằng:',
    choices: ['2 A', '3 A', '9 A', '1 A'],
    answer: 'A',
    explanation:
      'Mắc nối tiếp thì điện trở cộng lại: R = 6 + 3 = 9 Ω. Áp dụng định luật Ohm cho toàn mạch: I = U/R = 18/9 = 2 A, và dòng điện này như nhau qua cả hai điện trở.',
    skills: ['định luật Ohm'],
  },
  {
    id: 's.phy.9',
    topicId: 'science.physics.electricity',
    difficulty: 3,
    stem: 'Hai điện trở R₁ = 6 Ω và R₂ = 3 Ω mắc song song. Điện trở tương đương bằng:',
    choices: ['2 Ω', '9 Ω', '4,5 Ω', '18 Ω'],
    answer: 'A',
    explanation: '1/R = 1/6 + 1/3 = 1/2 ⟹ R = 2 Ω. Lưu ý điện trở tương đương khi song song luôn nhỏ hơn điện trở nhỏ nhất.',
    traps: { B: 'Cộng như mắc nối tiếp.' },
    skills: ['mạch song song'],
  },
  {
    id: 's.phy.10',
    topicId: 'science.physics.modern',
    difficulty: 2,
    stem: 'Hạt nhân ²³⁸₉₂U có bao nhiêu nơtron?',
    choices: ['146', '92', '238', '330'],
    answer: 'A',
    explanation:
      'Số khối A đếm cả proton lẫn nơtron, còn Z là số proton. Vậy số nơtron N = A − Z = 238 − 92 = 146.',
    traps: { B: 'Nhầm số nơtron với số proton (Z).' },
    skills: ['cấu tạo hạt nhân'],
  },
];

const chemistry: QuestionDraft[] = [
  {
    id: 's.che.1',
    topicId: 'science.chemistry.general',
    difficulty: 1,
    stem: 'Nguyên tử của nguyên tố có số hiệu nguyên tử Z = 17 chứa bao nhiêu proton?',
    choices: ['17', '18', '35', '7'],
    answer: 'A',
    explanation: 'Số hiệu nguyên tử Z chính là số proton trong hạt nhân, ở đây Z = 17 (nguyên tố clo).',
    skills: ['cấu tạo nguyên tử'],
  },
  {
    id: 's.che.2',
    topicId: 'science.chemistry.general',
    difficulty: 2,
    stem: 'Khối lượng của 0,5 mol NaOH (M = 40 g/mol) là:',
    choices: ['20 g', '80 g', '40 g', '0,0125 g'],
    answer: 'A',
    explanation:
      'Khối lượng bằng số mol nhân khối lượng mol: m = n × M = 0,5 × 40 = 20 g. Đây là công thức nền của mọi bài toán tính theo phương trình hóa học.',
    skills: ['tính theo mol'],
  },
  {
    id: 's.che.3',
    topicId: 'science.chemistry.general',
    difficulty: 3,
    stem: 'Dung dịch HCl có nồng độ 0,01 M. Giá trị pH của dung dịch bằng bao nhiêu?',
    answer: '2',
    explanation: 'HCl là axit mạnh, phân li hoàn toàn nên [H⁺] = 0,01 = 10⁻² M ⟹ pH = −log(10⁻²) = 2.',
    skills: ['pH', 'axit mạnh'],
  },
  {
    id: 's.che.4',
    topicId: 'science.chemistry.inorganic',
    difficulty: 2,
    stem: 'Kim loại nào sau đây tác dụng được với dung dịch HCl loãng giải phóng khí H₂?',
    choices: ['Zn', 'Cu', 'Ag', 'Au'],
    answer: 'A',
    explanation:
      'Chỉ kim loại đứng trước hiđro trong dãy hoạt động hóa học mới đẩy được H₂ ra khỏi axit loãng. Cu, Ag, Au đều đứng sau H.',
    skills: ['dãy hoạt động hóa học'],
  },
  {
    id: 's.che.5',
    topicId: 'science.chemistry.inorganic',
    difficulty: 3,
    stem: 'Cần bao nhiêu ml dung dịch HCl 2 M để trung hòa vừa đủ 100 ml dung dịch NaOH 1 M?',
    choices: ['50 ml', '200 ml', '100 ml', '25 ml'],
    answer: 'A',
    explanation:
      'n(NaOH) = 0,1 × 1 = 0,1 mol. Phản ứng NaOH + HCl → NaCl + H₂O theo tỉ lệ 1 : 1 nên n(HCl) = 0,1 mol ⟹ V = 0,1/2 = 0,05 L = 50 ml.',
    traps: { B: 'Nhân thay vì chia cho nồng độ.' },
    skills: ['phản ứng trung hòa'],
  },
  {
    id: 's.che.6',
    topicId: 'science.chemistry.inorganic',
    difficulty: 2,
    stem: 'Khí nào sau đây là nguyên nhân chính gây mưa axit?',
    choices: ['SO₂', 'CO₂', 'N₂', 'O₂'],
    answer: 'A',
    explanation:
      'SO₂ (cùng với NOₓ) bị oxi hóa trong khí quyển tạo H₂SO₄ gây mưa axit. CO₂ chỉ làm nước mưa hơi axit tự nhiên (pH ≈ 5,6) và chủ yếu gây hiệu ứng nhà kính.',
    traps: { B: 'Nhầm khí gây hiệu ứng nhà kính với khí gây mưa axit.' },
    skills: ['hóa học môi trường'],
  },
  {
    id: 's.che.7',
    topicId: 'science.chemistry.organic',
    difficulty: 1,
    stem: 'Công thức phân tử của etanol (ancol etylic) là:',
    choices: ['C₂H₆O', 'CH₄O', 'C₂H₄O₂', 'C₃H₈O'],
    answer: 'A',
    explanation: 'Etanol C₂H₅OH có công thức phân tử C₂H₆O.',
    traps: { C: 'C₂H₄O₂ là axit axetic.' },
    skills: ['công thức phân tử'],
  },
  {
    id: 's.che.8',
    topicId: 'science.chemistry.organic',
    difficulty: 2,
    stem: 'Phản ứng đặc trưng của anken là:',
    choices: ['phản ứng cộng', 'phản ứng thế', 'phản ứng tách', 'phản ứng trùng ngưng'],
    answer: 'A',
    explanation:
      'Anken có liên kết đôi C=C kém bền, dễ mở ra để cộng thêm nguyên tử/nhóm nguyên tử. Phản ứng thế mới là đặc trưng của ankan.',
    skills: ['hiđrocacbon không no'],
  },
  {
    id: 's.che.9',
    topicId: 'science.chemistry.organic',
    difficulty: 3,
    stem: 'Đốt cháy hoàn toàn 0,2 mol C₂H₆ thu được bao nhiêu mol CO₂?',
    answer: '0,4',
    accepted: ['0.4', '0,40'],
    explanation:
      'Phương trình: 2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O. Mỗi mol C₂H₆ cho 2 mol CO₂ (bảo toàn nguyên tố cacbon) ⟹ 0,2 × 2 = 0,4 mol.',
    skills: ['phản ứng cháy', 'bảo toàn nguyên tố'],
  },
  {
    id: 's.che.10',
    topicId: 'science.chemistry.organic',
    difficulty: 4,
    stem: 'Cho 0,1 mol glucozơ tham gia phản ứng tráng bạc hoàn toàn. Khối lượng Ag thu được (Ag = 108) là:',
    choices: ['21,6 g', '10,8 g', '43,2 g', '32,4 g'],
    answer: 'A',
    explanation:
      'Glucozơ có nhóm –CHO nên mỗi mol cho 2 mol Ag ⟹ n(Ag) = 0,2 mol ⟹ m = 0,2 × 108 = 21,6 g.',
    traps: { B: 'Dùng tỉ lệ 1 : 1 thay vì 1 : 2.' },
    skills: ['phản ứng tráng bạc', 'cacbohiđrat'],
  },
];

const history: QuestionDraft[] = [
  {
    id: 's.his.1',
    topicId: 'science.history.vietnam',
    difficulty: 1,
    stem: 'Đảng Cộng sản Việt Nam ra đời vào thời gian nào?',
    choices: ['Đầu năm 1930', 'Năm 1925', 'Năm 1941', 'Năm 1945'],
    answer: 'A',
    explanation:
      'Hội nghị hợp nhất ba tổ chức cộng sản do Nguyễn Ái Quốc chủ trì diễn ra đầu năm 1930; ngày 3/2/1930 được lấy làm ngày thành lập Đảng.',
    traps: { B: '1925 là năm thành lập Hội Việt Nam Cách mạng Thanh niên.' },
    skills: ['mốc thời gian'],
  },
  {
    id: 's.his.2',
    topicId: 'science.history.vietnam',
    difficulty: 1,
    stem: 'Bản Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa được đọc vào ngày nào?',
    choices: ['2/9/1945', '19/8/1945', '6/1/1946', '30/4/1975'],
    answer: 'A',
    explanation:
      'Ngày 2/9/1945 tại Quảng trường Ba Đình, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập. Ngày 19/8/1945 là ngày khởi nghĩa giành chính quyền ở Hà Nội.',
    skills: ['Cách mạng tháng Tám'],
  },
  {
    id: 's.his.3',
    topicId: 'science.history.vietnam',
    difficulty: 2,
    stem: 'Thắng lợi của chiến dịch Điện Biên Phủ (1954) trực tiếp dẫn đến sự kiện nào?',
    choices: [
      'Việc kí kết Hiệp định Genève về Đông Dương.',
      'Việc kí kết Hiệp định Paris về Việt Nam.',
      'Sự sụp đổ hoàn toàn của chính quyền Sài Gòn.',
      'Việc Việt Nam gia nhập Liên hợp quốc.',
    ],
    answer: 'A',
    explanation:
      'Chiến thắng Điện Biên Phủ (7/5/1954) đã đập tan ý chí xâm lược của thực dân Pháp, buộc Pháp kí Hiệp định Genève (21/7/1954).',
    traps: { B: 'Hiệp định Paris (1973) gắn với kháng chiến chống Mĩ.' },
    skills: ['kháng chiến chống Pháp', 'quan hệ nhân quả'],
  },
  {
    id: 's.his.4',
    topicId: 'science.history.vietnam',
    difficulty: 2,
    stem: 'Đường lối Đổi mới ở Việt Nam được chính thức đề ra tại đại hội nào của Đảng?',
    choices: ['Đại hội VI (12/1986)', 'Đại hội V (1982)', 'Đại hội VII (1991)', 'Đại hội IV (1976)'],
    answer: 'A',
    explanation:
      'Đại hội đại biểu toàn quốc lần thứ VI (tháng 12/1986) đề ra đường lối Đổi mới toàn diện, trọng tâm là đổi mới kinh tế.',
    skills: ['thời kì Đổi mới'],
  },
  {
    id: 's.his.5',
    topicId: 'science.history.vietnam',
    difficulty: 2,
    stem: 'Cuộc Tổng tiến công và nổi dậy mùa Xuân 1975 kết thúc bằng chiến dịch nào?',
    choices: ['Chiến dịch Hồ Chí Minh', 'Chiến dịch Tây Nguyên', 'Chiến dịch Huế — Đà Nẵng', 'Chiến dịch Đường 9 — Nam Lào'],
    answer: 'A',
    explanation:
      'Ba chiến dịch lớn nối tiếp nhau là Tây Nguyên, Huế — Đà Nẵng và cuối cùng là Chiến dịch Hồ Chí Minh, kết thúc ngày 30/4/1975.',
    skills: ['Đại thắng mùa Xuân 1975'],
  },
  {
    id: 's.his.6',
    topicId: 'science.history.world',
    difficulty: 1,
    stem: 'Tổ chức Liên hợp quốc được thành lập vào năm nào?',
    choices: ['1945', '1919', '1955', '1991'],
    answer: 'A',
    explanation:
      'Hiến chương Liên hợp quốc được thông qua tại Hội nghị San Francisco và có hiệu lực từ 24/10/1945.',
    traps: { B: '1919 là năm thành lập Hội Quốc liên — tổ chức tiền thân nhưng khác biệt.' },
    skills: ['tổ chức quốc tế'],
  },
  {
    id: 's.his.7',
    topicId: 'science.history.world',
    difficulty: 2,
    stem: 'Sự kiện nào đánh dấu trật tự thế giới hai cực Ianta hoàn toàn tan rã?',
    choices: [
      'Liên Xô tan rã (1991).',
      'Bức tường Berlin sụp đổ (1989).',
      'Chiến tranh vùng Vịnh (1991).',
      'Hội nghị Ianta (1945).',
    ],
    answer: 'A',
    explanation:
      'Sự sụp đổ của Liên Xô cuối năm 1991 làm biến mất một trong hai cực, chấm dứt hoàn toàn trật tự hai cực. Sự kiện năm 1989 chỉ là bước ngoặt trên đường đi tới đó.',
    skills: ['trật tự thế giới', 'Chiến tranh lạnh'],
  },
  {
    id: 's.his.8',
    topicId: 'science.history.world',
    difficulty: 2,
    stem: 'Việt Nam chính thức gia nhập ASEAN vào năm nào?',
    choices: ['1995', '1967', '1986', '2007'],
    answer: 'A',
    explanation:
      'ASEAN thành lập ngày 8/8/1967 tại Bangkok với 5 nước sáng lập; Việt Nam trở thành thành viên thứ bảy vào tháng 7/1995.',
    traps: { D: '2007 là năm Việt Nam gia nhập WTO.' },
    skills: ['hội nhập khu vực'],
  },
];

const geography: QuestionDraft[] = [
  {
    id: 's.geo.1',
    topicId: 'science.geography.nature',
    difficulty: 1,
    stem: 'Khí hậu Việt Nam mang đặc điểm cơ bản nào?',
    choices: [
      'Nhiệt đới ẩm gió mùa.',
      'Ôn đới lục địa.',
      'Cận nhiệt khô hạn.',
      'Xích đạo ẩm quanh năm.',
    ],
    answer: 'A',
    explanation:
      'Vị trí trong vùng nội chí tuyến, giáp Biển Đông và nằm trong khu vực hoạt động của gió mùa châu Á quy định tính chất nhiệt đới ẩm gió mùa.',
    skills: ['khí hậu Việt Nam'],
  },
  {
    id: 's.geo.2',
    topicId: 'science.geography.nature',
    difficulty: 2,
    stem: 'Gió mùa Đông Bắc gây ra mùa đông lạnh chủ yếu ở khu vực nào của nước ta?',
    choices: [
      'Miền Bắc, ranh giới ảnh hưởng giảm dần về phía nam.',
      'Toàn bộ lãnh thổ với cường độ như nhau.',
      'Chỉ riêng Tây Nguyên.',
      'Chỉ riêng Nam Bộ.',
    ],
    answer: 'A',
    explanation:
      'Khối khí lạnh từ phương bắc bị biến tính và suy yếu dần khi di chuyển xuống nam, đến dãy Bạch Mã thì hầu như bị chặn lại.',
    skills: ['gió mùa'],
  },
  {
    id: 's.geo.3',
    topicId: 'science.geography.nature',
    difficulty: 3,
    stem: 'Đặc điểm nào sau đây KHÔNG đúng với địa hình Việt Nam?',
    choices: [
      'Đồi núi chiếm khoảng 1/4 diện tích lãnh thổ.',
      'Địa hình thấp dần từ tây bắc xuống đông nam.',
      'Đồi núi thấp dưới 1000 m chiếm ưu thế.',
      'Địa hình chịu tác động mạnh của con người.',
    ],
    answer: 'A',
    explanation:
      'Đồi núi chiếm khoảng 3/4 diện tích lãnh thổ, đồng bằng chỉ khoảng 1/4. Ba phương án còn lại đều là đặc điểm đúng.',
    skills: ['địa hình', 'câu hỏi phủ định'],
  },
  {
    id: 's.geo.4',
    topicId: 'science.geography.economy',
    difficulty: 1,
    stem: 'Vùng nào là vựa lúa lớn nhất Việt Nam?',
    choices: [
      'Đồng bằng sông Cửu Long',
      'Đồng bằng sông Hồng',
      'Duyên hải Nam Trung Bộ',
      'Tây Nguyên',
    ],
    answer: 'A',
    explanation:
      'Đồng bằng sông Cửu Long dẫn đầu cả nước về cả diện tích gieo trồng lẫn sản lượng lúa nhờ đất phù sa màu mỡ và nguồn nước dồi dào.',
    skills: ['nông nghiệp'],
  },
  {
    id: 's.geo.5',
    topicId: 'science.geography.economy',
    difficulty: 2,
    stem: 'Cây công nghiệp lâu năm quan trọng nhất của Tây Nguyên là:',
    choices: ['Cà phê', 'Cao su', 'Chè', 'Hồ tiêu'],
    answer: 'A',
    explanation:
      'Đất badan rộng lớn cùng khí hậu cận xích đạo có mùa khô rõ rệt rất thuận lợi cho cà phê — cây chiếm tỉ trọng lớn nhất trong cơ cấu cây công nghiệp lâu năm của vùng.',
    traps: { B: 'Cao su tập trung chủ yếu ở Đông Nam Bộ.' },
    skills: ['vùng kinh tế'],
  },
  {
    id: 's.geo.6',
    topicId: 'science.geography.data',
    difficulty: 2,
    stem: 'Để thể hiện cơ cấu giá trị xuất khẩu theo nhóm hàng của một năm, dạng biểu đồ thích hợp nhất là:',
    choices: ['Biểu đồ tròn', 'Biểu đồ đường', 'Biểu đồ cột ghép', 'Biểu đồ kết hợp cột và đường'],
    answer: 'A',
    explanation:
      'Từ khóa "cơ cấu" + một mốc thời gian ⟹ biểu đồ tròn. Nếu từ hai đến ba năm thì dùng nhiều hình tròn, từ bốn năm trở lên dùng biểu đồ miền.',
    skills: ['nhận dạng biểu đồ'],
  },
  {
    id: 's.geo.7',
    topicId: 'science.geography.data',
    difficulty: 3,
    stem: 'Để so sánh tốc độ tăng trưởng của nhiều đối tượng có đơn vị khác nhau trong giai đoạn 2010 — 2024, dạng biểu đồ thích hợp nhất là:',
    choices: [
      'Biểu đồ đường (sau khi quy về số liệu tương đối, năm gốc = 100%).',
      'Biểu đồ tròn.',
      'Biểu đồ miền.',
      'Biểu đồ cột chồng.',
    ],
    answer: 'A',
    explanation:
      'Từ khóa "tốc độ tăng trưởng" qua nhiều năm ⟹ biểu đồ đường. Vì các đối tượng khác đơn vị nên phải xử lí số liệu về dạng chỉ số với năm đầu bằng 100%.',
    traps: { C: 'Biểu đồ miền dùng cho sự chuyển dịch cơ cấu, không phải tốc độ tăng trưởng.' },
    skills: ['xử lí số liệu', 'nhận dạng biểu đồ'],
  },
  {
    id: 's.geo.8',
    topicId: 'science.geography.data',
    difficulty: 3,
    stem: 'Tổng giá trị sản xuất của một vùng là 250 nghìn tỉ đồng, trong đó ngành công nghiệp đạt 75 nghìn tỉ đồng. Tỉ trọng của công nghiệp là bao nhiêu phần trăm?',
    answer: '30',
    explanation:
      'Tỉ trọng của một thành phần bằng giá trị thành phần chia cho tổng thể rồi nhân 100%: 75/250 × 100% = 30%.',
    skills: ['tính tỉ trọng'],
  },
];

export const physicsQuestions = buildQuestions('science', 'physics', physics);
export const chemistryQuestions = buildQuestions('science', 'chemistry', chemistry);
export const historyQuestions = buildQuestions('science', 'history', history);
export const geographyQuestions = buildQuestions('science', 'geography', geography);
