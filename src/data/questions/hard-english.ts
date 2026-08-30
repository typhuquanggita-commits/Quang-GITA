import { buildQuestions, type QuestionDraft } from './helpers';

/**
 * KHO CAU KHO VA CAU PHAN LOAI — DUONG THI TIENG ANH VA PHAN BO SUNG
 *
 * Gom hai nhom:
 *  - Cau muc 4-5 cho ba chuyen de Tieng Anh.
 *  - Cac cau phan loai con thieu cua vai chu de khoa hoc, de moi chu de deu
 *    du hai cau muc 5 nhu chuan da dat ra.
 *
 * Cau kho cua Tieng Anh khong phai cau co tu vung hiem, ma cau ma ba phuong
 * an nhieu deu DUNG NGU PHAP va chi sai o mot chi tiet ve nghia hoac ve
 * pham vi ket hop.
 */

const english: QuestionDraft[] = [
  {
    id: 'e.gra.h1',
    topicId: 'science.english.grammar',
    difficulty: 4,
    stem: 'Choose the correct option: "Hardly ___ the station when the train left."',
    choices: ['had we reached', 'we had reached', 'did we reach', 'we reached'],
    answer: 'A',
    explanation:
      'Câu bắt đầu bằng trạng từ phủ định "Hardly" nên bắt buộc đảo ngữ: trợ động từ đứng trước chủ ngữ. Cấu trúc cố định là "Hardly had + S + V3 ... when + quá khứ đơn", diễn tả hai hành động nối tiếp rất sát nhau trong quá khứ.',
    traps: {
      B: 'Đúng thì nhưng không đảo ngữ — sai vì câu mở đầu bằng trạng từ phủ định.',
      C: 'Đảo ngữ đúng nhưng sai thì; vế "hardly" phải dùng quá khứ hoàn thành.',
    },
    skills: ['đảo ngữ', 'quá khứ hoàn thành'],
  },
  {
    id: 'e.gra.h2',
    topicId: 'science.english.grammar',
    difficulty: 4,
    stem: 'Choose the correct option: "If she ___ harder last year, she would be in a better position now."',
    choices: ['had studied', 'studied', 'would study', 'has studied'],
    answer: 'A',
    explanation:
      'Đây là câu điều kiện hỗn hợp: mệnh đề if nói về quá khứ (last year) nên dùng quá khứ hoàn thành, còn mệnh đề chính nói về hiện tại (now) nên dùng "would + V". Dấu hiệu nhận ra là hai mốc thời gian khác nhau trong cùng một câu.',
    traps: {
      B: 'Loại 2 thuần túy, chỉ đúng nếu cả hai vế cùng nói về hiện tại.',
      D: 'Hiện tại hoàn thành không dùng được trong mệnh đề if của câu điều kiện.',
    },
    skills: ['câu điều kiện hỗn hợp', 'mốc thời gian'],
  },
  {
    id: 'e.gra.h3',
    topicId: 'science.english.grammar',
    difficulty: 4,
    stem: 'Choose the correct option: "The report, ___ was submitted last week, contains several errors."',
    choices: ['which', 'that', 'what', 'who'],
    answer: 'A',
    explanation:
      'Dấu phẩy trước chỗ trống báo hiệu mệnh đề quan hệ không xác định, và trong loại mệnh đề này không được dùng "that". Danh từ đứng trước là "the report" chỉ vật nên chọn "which".',
    traps: {
      B: '"That" không bao giờ dùng trong mệnh đề quan hệ không xác định có dấu phẩy.',
      C: '"What" không phải đại từ quan hệ, nó không thay thế cho một danh từ đứng trước.',
    },
    skills: ['mệnh đề quan hệ không xác định', 'dấu phẩy'],
  },
  {
    id: 'e.gra.h4',
    topicId: 'science.english.grammar',
    difficulty: 5,
    stem: 'Choose the sentence that is grammatically correct.',
    choices: [
      'Not until he apologised did she agree to meet him again.',
      'Not until he apologised she agreed to meet him again.',
      'Not until he had apologised she did agree to meet him again.',
      'Not until did he apologise she agreed to meet him again.',
    ],
    answer: 'A',
    explanation:
      'Cấu trúc "Not until + mệnh đề + đảo ngữ ở mệnh đề chính". Điểm bẫy là đảo ngữ chỉ áp dụng cho MỆNH ĐỀ CHÍNH, còn mệnh đề sau "not until" giữ trật tự bình thường. Phương án A làm đúng cả hai vế.',
    traps: {
      B: 'Thiếu đảo ngữ ở mệnh đề chính.',
      D: 'Đảo ngữ nhầm sang mệnh đề sau "not until" thay vì mệnh đề chính.',
    },
    skills: ['đảo ngữ với not until', 'vị trí mệnh đề'],
  },
  {
    id: 'e.gra.h5',
    topicId: 'science.english.grammar',
    difficulty: 5,
    stem: 'Choose the option that best completes: "___ the heavy traffic, we still managed to arrive on time."',
    choices: ['Despite', 'Although', 'Because of', 'However'],
    answer: 'A',
    explanation:
      '"Despite" là giới từ nên theo sau là cụm danh từ "the heavy traffic". "Although" là liên từ nên phải theo sau bởi một mệnh đề có chủ ngữ và động từ. "Because of" đúng ngữ pháp nhưng sai logic vì hai vế mang quan hệ tương phản, không phải nhân quả.',
    traps: {
      B: 'Đúng nghĩa tương phản nhưng sai ngữ pháp vì sau nó phải là mệnh đề, không phải cụm danh từ.',
      C: 'Đúng ngữ pháp nhưng sai quan hệ logic giữa hai vế.',
    },
    skills: ['giới từ và liên từ tương phản', 'phân biệt despite và although'],
  },
  {
    id: 'e.voc.h1',
    topicId: 'science.english.vocabulary',
    difficulty: 4,
    stem: 'Choose the word closest in meaning to the underlined word: "The new policy had a profound impact on rural communities."',
    choices: ['far-reaching', 'temporary', 'unclear', 'minor'],
    answer: 'A',
    explanation:
      '"Profound" nghĩa là sâu sắc, có ảnh hưởng lớn và lan rộng. "Far-reaching" mang đúng nghĩa đó khi đi kèm "impact". Hai phương án "minor" và "temporary" mang nghĩa ngược lại, còn "unclear" nói về sự rõ ràng chứ không nói về mức độ.',
    traps: {
      D: 'Trái nghĩa với từ được gạch chân, đây là loại nhiễu hay gặp nhất ở câu đồng nghĩa.',
    },
    skills: ['từ đồng nghĩa', 'đọc nghĩa theo ngữ cảnh'],
  },
  {
    id: 'e.voc.h2',
    topicId: 'science.english.vocabulary',
    difficulty: 4,
    stem: 'Choose the correct option: "She ___ a strong interest in environmental issues since childhood."',
    choices: ['has taken', 'has made', 'has done', 'has got'],
    answer: 'A',
    explanation:
      '"Take an interest in something" là collocation cố định nghĩa là quan tâm tới điều gì. Ba động từ còn lại đều là động từ rất phổ biến nhưng không kết hợp được với "interest" theo nghĩa này.',
    traps: {
      B: '"Make" đi với "a decision", "an effort", "progress" nhưng không đi với "an interest".',
    },
    skills: ['collocation', 'động từ kết hợp'],
  },
  {
    id: 'e.voc.h3',
    topicId: 'science.english.vocabulary',
    difficulty: 4,
    stem: 'Choose the word that best completes the sentence: "The evidence was not ___ enough to convict him."',
    choices: ['conclusive', 'concluded', 'conclusion', 'conclusively'],
    answer: 'A',
    explanation:
      'Sau động từ "to be" và trước "enough" cần một tính từ. "Conclusive" là tính từ nghĩa là có tính quyết định, thuyết phục. "Concluded" là phân từ, "conclusion" là danh từ và "conclusively" là trạng từ, cả ba đều sai từ loại ở vị trí này.',
    traps: {
      D: 'Trạng từ không bổ nghĩa cho "to be" theo cách này; vị trí sau "was" cần tính từ.',
    },
    skills: ['họ từ', 'vị trí tính từ'],
  },
  {
    id: 'e.voc.h4',
    topicId: 'science.english.vocabulary',
    difficulty: 5,
    stem: 'Choose the option closest in meaning to: "The manager turned down the proposal."',
    choices: ['rejected', 'reduced', 'reversed', 'delayed'],
    answer: 'A',
    explanation:
      '"Turn down" là cụm động từ có hai nghĩa: vặn nhỏ âm lượng, và từ chối. Tân ngữ ở đây là "the proposal" nên nghĩa đúng là từ chối. Phương án "reduced" ứng với nghĩa còn lại của cụm này và chính là bẫy được cài sẵn.',
    traps: {
      B: 'Đúng với nghĩa "vặn nhỏ" của cụm động từ, nhưng không hợp với tân ngữ "proposal".',
    },
    skills: ['cụm động từ', 'chọn nghĩa theo tân ngữ'],
  },
  {
    id: 'e.voc.h5',
    topicId: 'science.english.vocabulary',
    difficulty: 5,
    stem: 'Choose the option that does NOT collocate naturally with the noun "attention".',
    choices: ['make attention', 'pay attention', 'draw attention', 'attract attention'],
    answer: 'A',
    explanation:
      'Ba cụm "pay attention", "draw attention" và "attract attention" đều là collocation chuẩn. "Make attention" không tồn tại trong tiếng Anh, dù về nghĩa nó nghe hợp lý với người học quen dịch "làm" thành "make".',
    traps: {
      C: '"Draw attention" hoàn toàn chuẩn, nghĩa là thu hút sự chú ý.',
    },
    skills: ['collocation', 'danh từ đi với động từ nào'],
  },
  {
    id: 'e.rea.h1',
    topicId: 'science.english.reading',
    difficulty: 4,
    stem: 'Read: "While remote work reduces commuting time, it also blurs the line between professional and personal life. Many employees report working longer hours than before." What is the author\'s attitude towards remote work?',
    choices: ['Balanced — noting both a benefit and a drawback', 'Entirely positive', 'Entirely negative', 'Indifferent'],
    answer: 'A',
    explanation:
      'Câu đầu nêu một lợi ích là giảm thời gian đi lại; câu sau nêu một bất lợi là ranh giới công việc và đời sống bị mờ đi. Từ nối "while" ở đầu báo hiệu ngay cấu trúc hai mặt. Tác giả không nghiêng hẳn về bên nào.',
    traps: {
      C: 'Chỉ đọc vế sau và bỏ mất lợi ích được nêu ở vế đầu.',
      D: '"Indifferent" nghĩa là thờ ơ, không quan tâm — tác giả rõ ràng có đánh giá.',
    },
    skills: ['thái độ tác giả', 'văn bản hai mặt'],
  },
  {
    id: 'e.rea.h2',
    topicId: 'science.english.reading',
    difficulty: 4,
    stem: 'Read: "The city introduced a bike-sharing scheme in 2019. Within two years, bicycle trips had tripled, though car ownership remained unchanged." Which conclusion is best supported?',
    choices: [
      'More people cycled, but not necessarily instead of driving',
      'The scheme eliminated car use in the city',
      'Car ownership fell sharply after 2019',
      'The scheme was a failure',
    ],
    answer: 'A',
    explanation:
      'Đoạn văn cho biết số chuyến đi bằng xe đạp tăng gấp ba nhưng số ô tô sở hữu không đổi. Vì vậy chỉ kết luận được rằng việc đi xe đạp tăng lên, còn không có căn cứ nào nói người dân đã bỏ ô tô để chuyển sang xe đạp.',
    traps: {
      C: 'Trái hẳn với dữ kiện "remained unchanged".',
      D: 'Số chuyến đi tăng gấp ba là dấu hiệu thành công, không phải thất bại.',
    },
    skills: ['suy luận có căn cứ', 'phân biệt tương quan và nhân quả'],
  },
  {
    id: 'e.rea.h3',
    topicId: 'science.english.reading',
    difficulty: 5,
    stem: 'Read: "Critics argue that standardised tests measure test-taking skills rather than genuine ability. Supporters counter that no alternative has proved more reliable at scale." What does the word "counter" mean in this context?',
    choices: ['respond with an opposing argument', 'count carefully', 'a flat surface in a kitchen', 'agree completely'],
    answer: 'A',
    explanation:
      'Câu trước nêu quan điểm của phe phản đối, câu sau nêu quan điểm của phe ủng hộ, nên "counter" ở đây là động từ nghĩa là phản bác lại. Hai phương án "count carefully" và "kitchen surface" là các nghĩa khác của từ này nhưng không hợp ngữ cảnh tranh luận.',
    traps: {
      D: 'Trái hẳn với vai trò của từ trong một cuộc tranh luận hai phía.',
      C: 'Là nghĩa danh từ của "counter", sai từ loại lẫn ngữ cảnh.',
    },
    skills: ['từ đa nghĩa', 'đoán nghĩa theo ngữ cảnh'],
  },
  {
    id: 'e.rea.h4',
    topicId: 'science.english.reading',
    difficulty: 5,
    stem: 'Read: "Although the museum doubled its opening hours, total visitor numbers rose by only four per cent." What does this most strongly suggest?',
    choices: [
      'Opening hours were not the main factor limiting visits',
      'The museum should close earlier',
      'Visitors dislike the museum',
      'The museum lost money',
    ],
    answer: 'A',
    explanation:
      'Nếu giờ mở cửa là rào cản chính thì tăng gấp đôi giờ đã phải làm lượng khách tăng mạnh. Mức tăng chỉ 4% cho thấy nguyên nhân hạn chế lượng khách nằm ở chỗ khác — có thể là giá vé, vị trí hoặc nội dung trưng bày. Đoạn văn không đủ căn cứ để nói cụ thể là gì.',
    traps: {
      C: 'Lượng khách vẫn tăng chứ không giảm, nên không suy ra được sự không thích.',
      D: 'Đoạn văn không nói gì về tài chính.',
    },
    skills: ['suy luận từ dữ kiện phản trực giác', 'xác định nguyên nhân'],
  },
];

const extra: QuestionDraft[] = [
  {
    id: 's.phy.h11',
    topicId: 'science.physics.mechanics',
    difficulty: 5,
    stem: 'Một người kéo một thùng hàng trên sàn ngang bằng một lực hợp với phương ngang góc 60°, độ lớn 100 N. Thùng đi được 5 m theo phương ngang. Công của lực kéo bằng bao nhiêu?',
    choices: ['250 J', '500 J', '433 J', '0 J'],
    answer: 'A',
    explanation:
      'Công của lực bằng F × s × cos α, với α là góc giữa lực và hướng dịch chuyển. Ở đây A = 100 × 5 × cos60° = 100 × 5 × 0,5 = 250 J. Chỉ thành phần lực theo phương chuyển động mới sinh công.',
    traps: {
      B: 'Bỏ qua hệ số cos, lấy thẳng F × s.',
      C: 'Dùng sin60° thay cho cos60° — nhầm thành phần vuông góc với thành phần cùng phương.',
    },
    skills: ['công của lực', 'thành phần lực'],
  },
  {
    id: 's.phy.h12',
    topicId: 'science.physics.oscillation',
    difficulty: 5,
    stem: 'Hai nguồn sóng kết hợp cùng pha cách nhau 12 cm, bước sóng 4 cm. Số điểm dao động với biên độ cực đại trên đoạn thẳng nối hai nguồn là bao nhiêu?',
    choices: ['5', '7', '6', '3'],
    answer: 'A',
    explanation:
      'Điều kiện cực đại là hiệu đường đi bằng k lần bước sóng, với −AB/λ < k < AB/λ, tức −3 < k < 3. Các giá trị nguyên thỏa mãn là k = −2, −1, 0, 1, 2, cho 5 điểm. Hai đầu ứng với k = ±3 là chính vị trí hai nguồn nên không tính.',
    traps: {
      B: 'Tính cả hai vị trí nguồn k = ±3, trong khi tại nguồn không xét dao động giao thoa.',
      C: 'Quên vị trí trung điểm ứng với k = 0.',
    },
    skills: ['giao thoa sóng', 'đếm cực đại'],
  },
  {
    id: 's.phy.h13',
    topicId: 'science.physics.electricity',
    difficulty: 5,
    stem: 'Một nguồn điện có suất điện động 12 V và điện trở trong 1 Ω, mắc với điện trở ngoài R. Với giá trị nào của R thì công suất tiêu thụ ở mạch ngoài đạt cực đại?',
    choices: ['R = 1 Ω', 'R = 0 Ω', 'R = 12 Ω', 'R càng lớn càng tốt'],
    answer: 'A',
    explanation:
      'Công suất mạch ngoài P = E²R/(R + r)². Khảo sát cho thấy P đạt cực đại khi R = r, tức R = 1 Ω. Đây là định lý truyền công suất cực đại: mạch ngoài nhận nhiều công suất nhất khi điện trở của nó bằng điện trở trong của nguồn.',
    traps: {
      D: 'R rất lớn làm dòng rất nhỏ nên công suất giảm về 0, không phải càng lớn càng tốt.',
      B: 'R = 0 cho dòng cực đại nhưng công suất mạch ngoài bằng 0 vì không có điện trở tiêu thụ.',
    },
    skills: ['công suất cực đại', 'điện trở trong'],
  },
  {
    id: 's.phy.h14',
    topicId: 'science.physics.modern',
    difficulty: 5,
    stem: 'Vì sao phản ứng nhiệt hạch toả năng lượng lớn hơn phản ứng phân hạch tính trên mỗi đơn vị khối lượng nhiên liệu?',
    choices: [
      'Vì độ hụt khối trên mỗi nuclôn trong nhiệt hạch lớn hơn',
      'Vì nhiệt hạch cần nhiệt độ cao hơn',
      'Vì nhiệt hạch dùng nguyên liệu rẻ hơn',
      'Vì nhiệt hạch không tạo chất thải phóng xạ',
    ],
    answer: 'A',
    explanation:
      'Năng lượng toả ra đến từ độ hụt khối theo hệ thức E = Δm·c². Trong phản ứng nhiệt hạch, năng lượng liên kết riêng tăng nhiều hơn so với phân hạch, nên tính trên mỗi nuclôn thì năng lượng toả ra lớn hơn. Ba phương án còn lại đều là đặc điểm có thật của nhiệt hạch nhưng không giải thích được năng lượng.',
    traps: {
      B: 'Nhiệt độ cao là ĐIỀU KIỆN để phản ứng xảy ra, không phải nguyên nhân toả nhiều năng lượng.',
      D: 'Đúng về mặt môi trường nhưng không liên quan tới lượng năng lượng.',
    },
    skills: ['nhiệt hạch và phân hạch', 'độ hụt khối'],
  },
  {
    id: 's.che.h10',
    topicId: 'science.chemistry.general',
    difficulty: 5,
    stem: 'Cho phản ứng thuận nghịch N₂ + 3H₂ ⇌ 2NH₃ toả nhiệt. Biện pháp nào làm tăng hiệu suất tạo NH₃?',
    choices: [
      'Tăng áp suất và giảm nhiệt độ',
      'Tăng cả áp suất lẫn nhiệt độ',
      'Giảm áp suất và tăng nhiệt độ',
      'Giảm cả áp suất lẫn nhiệt độ',
    ],
    answer: 'A',
    explanation:
      'Theo nguyên lý chuyển dịch cân bằng, tăng áp suất đẩy cân bằng về phía có ít phân tử khí hơn — vế phải có 2 phân tử so với 4 ở vế trái, nên tăng áp suất có lợi. Phản ứng toả nhiệt nên giảm nhiệt độ cũng đẩy cân bằng theo chiều thuận.',
    traps: {
      B: 'Tăng nhiệt độ đẩy cân bằng theo chiều thu nhiệt, tức chiều nghịch, làm giảm hiệu suất.',
      C: 'Sai cả hai yếu tố.',
    },
    skills: ['chuyển dịch cân bằng', 'nguyên lý Le Chatelier'],
  },
  {
    id: 's.che.h11',
    topicId: 'science.chemistry.inorganic',
    difficulty: 5,
    stem: 'Sục khí CO₂ từ từ tới dư vào dung dịch Ca(OH)₂. Hiện tượng đầy đủ quan sát được là gì?',
    choices: [
      'Xuất hiện kết tủa trắng, sau đó kết tủa tan dần cho dung dịch trong suốt',
      'Chỉ xuất hiện kết tủa trắng bền',
      'Không có hiện tượng',
      'Có khí thoát ra',
    ],
    answer: 'A',
    explanation:
      'Ban đầu CO₂ tạo kết tủa CaCO₃ màu trắng. Khi CO₂ dư, kết tủa tiếp tục phản ứng tạo muối tan Ca(HCO₃)₂ nên dung dịch trở lại trong suốt. Hiện tượng hai giai đoạn này giải thích luôn sự hình thành thạch nhũ trong hang động.',
    traps: {
      B: 'Bỏ qua giai đoạn hai khi CO₂ dư — đây là phần phân loại của câu hỏi.',
    },
    skills: ['phản ứng CO₂ với kiềm', 'muối axit'],
  },
  {
    id: 's.his.h7',
    topicId: 'science.history.vietnam',
    difficulty: 4,
    stem: 'Vì sao chiến thắng Điện Biên Phủ được coi là chiến thắng có ý nghĩa quốc tế?',
    choices: [
      'Vì nó cổ vũ mạnh mẽ phong trào giải phóng dân tộc ở châu Á, châu Phi và Mỹ Latinh',
      'Vì nó diễn ra ở nhiều nước cùng lúc',
      'Vì nó có sự tham gia trực tiếp của quân đội nhiều nước',
      'Vì nó được Liên hợp quốc công nhận',
    ],
    answer: 'A',
    explanation:
      'Đây là lần đầu tiên một dân tộc thuộc địa đánh bại một cường quốc thực dân bằng quân sự, chứng minh rằng điều đó là làm được. Sự kiện trở thành nguồn cổ vũ cho phong trào giải phóng dân tộc trên khắp ba châu lục trong những thập niên sau.',
    traps: {
      C: 'Chiến dịch do quân dân Việt Nam thực hiện.',
    },
    skills: ['Điện Biên Phủ', 'ý nghĩa quốc tế'],
  },
  {
    id: 's.his.h8',
    topicId: 'science.history.vietnam',
    difficulty: 5,
    stem: 'Bài học kinh nghiệm xuyên suốt được rút ra từ thắng lợi của cả hai cuộc kháng chiến chống Pháp và chống Mỹ là gì?',
    choices: [
      'Phát huy sức mạnh của khối đại đoàn kết toàn dân kết hợp với sức mạnh thời đại',
      'Chỉ dựa vào viện trợ từ bên ngoài',
      'Tránh mọi cuộc đàm phán ngoại giao',
      'Chỉ sử dụng đấu tranh quân sự',
    ],
    answer: 'A',
    explanation:
      'Cả hai cuộc kháng chiến đều thắng lợi nhờ huy động được toàn dân, đồng thời tranh thủ được sự ủng hộ quốc tế và kết hợp đấu tranh trên cả ba mặt trận quân sự, chính trị và ngoại giao. Đây là bài học được nêu nhất quán trong tổng kết cả hai giai đoạn.',
    traps: {
      D: 'Cả hai cuộc kháng chiến đều kết hợp quân sự với chính trị và ngoại giao, tiêu biểu là Hiệp định Genève và Hiệp định Paris.',
    },
    skills: ['bài học lịch sử', 'tổng kết hai cuộc kháng chiến'],
  },
  {
    id: 's.his.h9',
    topicId: 'science.history.world',
    difficulty: 4,
    stem: 'Tổ chức ASEAN ra đời năm 1967 trong bối cảnh nào?',
    choices: [
      'Nhiều nước Đông Nam Á vừa giành độc lập và cần hợp tác để phát triển, hạn chế ảnh hưởng từ bên ngoài',
      'Chiến tranh thế giới thứ hai vừa kết thúc',
      'Liên Xô vừa tan rã',
      'Trật tự đa cực đã hình thành',
    ],
    answer: 'A',
    explanation:
      'Giữa thập niên 1960, phần lớn các nước trong khu vực đã giành được độc lập nhưng còn khó khăn về kinh tế và chịu sức ép từ các nước lớn trong bối cảnh Chiến tranh lạnh. Nhu cầu liên kết để phát triển và giữ ổn định khu vực dẫn tới sự ra đời của ASEAN.',
    traps: {
      C: 'Liên Xô tan rã năm 1991, sau khi ASEAN đã hoạt động hơn hai mươi năm.',
    },
    skills: ['ASEAN', 'bối cảnh thành lập'],
  },
  {
    id: 's.his.h10',
    topicId: 'science.history.world',
    difficulty: 5,
    stem: 'Vì sao Nhật Bản đạt được sự phát triển thần kỳ về kinh tế trong giai đoạn 1952 – 1973 dù thiếu tài nguyên?',
    choices: [
      'Nhờ đầu tư mạnh cho khoa học công nghệ và giáo dục, cùng chi phí quốc phòng rất thấp',
      'Nhờ khai thác thuộc địa',
      'Nhờ có trữ lượng dầu mỏ lớn',
      'Nhờ dân số ít nên dễ quản lý',
    ],
    answer: 'A',
    explanation:
      'Nhật Bản gần như không có tài nguyên, nên nguồn lực phát triển đến từ con người và công nghệ: đầu tư lớn cho giáo dục, mua và cải tiến công nghệ nước ngoài, cùng với việc hiến pháp hạn chế quân bị giúp dồn ngân sách cho kinh tế.',
    traps: {
      B: 'Nhật Bản mất toàn bộ thuộc địa sau năm 1945.',
      D: 'Dân số Nhật Bản thuộc nhóm đông trong khu vực.',
    },
    skills: ['Nhật Bản sau chiến tranh', 'nhân tố phát triển'],
  },
  {
    id: 's.geo.h10',
    topicId: 'science.geography.nature',
    difficulty: 4,
    stem: 'Vì sao Biển Đông làm cho thiên nhiên Việt Nam khác hẳn với các nước cùng vĩ độ ở Tây Á và Bắc Phi?',
    choices: [
      'Vì Biển Đông cung cấp nguồn ẩm dồi dào, làm khí hậu điều hòa và mang tính ẩm rõ rệt',
      'Vì Biển Đông làm nhiệt độ giảm mạnh',
      'Vì Biển Đông ngăn gió mùa',
      'Vì Biển Đông cung cấp khoáng sản',
    ],
    answer: 'A',
    explanation:
      'Các nước cùng vĩ độ ở Tây Á và Bắc Phi phần lớn là hoang mạc. Biển Đông là nguồn cung cấp ẩm cho các khối khí đi qua trước khi vào đất liền, nên thay vì khô hạn, nước ta có lượng mưa lớn và độ ẩm cao.',
    traps: {
      C: 'Biển Đông làm gió mùa mang thêm ẩm chứ không ngăn gió mùa.',
    },
    skills: ['vai trò Biển Đông', 'so sánh cùng vĩ độ'],
  },
  {
    id: 's.geo.h11',
    topicId: 'science.geography.nature',
    difficulty: 5,
    stem: 'Vì sao tính chất nhiệt đới ẩm gió mùa lại vừa là thế mạnh vừa là trở ngại cho sản xuất nông nghiệp nước ta?',
    choices: [
      'Vì nó cho phép thâm canh và tăng vụ, nhưng đồng thời gây thiên tai và tạo điều kiện cho sâu bệnh phát triển',
      'Vì nó chỉ có lợi cho cây công nghiệp',
      'Vì nó làm đất luôn khô cằn',
      'Vì nó ngăn cản việc trồng lúa',
    ],
    answer: 'A',
    explanation:
      'Nền nhiệt cao và ẩm lớn cho phép cây trồng sinh trưởng quanh năm, tăng vụ và đa dạng cơ cấu cây trồng. Nhưng cũng chính điều kiện đó gây bão, lũ, hạn hán theo mùa và làm sâu bệnh phát triển mạnh, nên tính mùa vụ và phòng chống thiên tai trở thành yêu cầu thường trực.',
    traps: {
      C: 'Ẩm cao chứ không khô cằn; xói mòn mới là vấn đề của đất ở vùng dốc.',
    },
    skills: ['thiên nhiên nhiệt đới ẩm gió mùa', 'tác động hai mặt'],
  },
  {
    id: 's.geo.h12',
    topicId: 'science.geography.economy',
    difficulty: 5,
    stem: 'Vì sao quá trình đô thị hóa ở nước ta được đánh giá là còn nhiều bất cập dù tỉ lệ dân thành thị tăng?',
    choices: [
      'Vì đô thị hóa diễn ra nhanh hơn tốc độ phát triển hạ tầng và tạo việc làm ở đô thị',
      'Vì tỉ lệ dân thành thị đang giảm',
      'Vì các đô thị đều nằm ở miền núi',
      'Vì đô thị hóa không liên quan tới kinh tế',
    ],
    answer: 'A',
    explanation:
      'Dân số đô thị tăng nhanh chủ yếu do di cư từ nông thôn, trong khi hạ tầng giao thông, nhà ở, cấp thoát nước và khả năng tạo việc làm không theo kịp. Hệ quả là quá tải hạ tầng, ô nhiễm và áp lực xã hội ở các đô thị lớn.',
    traps: {
      B: 'Tỉ lệ dân thành thị đang tăng, đó chính là dữ kiện đề nêu.',
    },
    skills: ['đô thị hóa', 'đánh giá quá trình'],
  },
  {
    id: 's.geo.h13',
    topicId: 'science.geography.data',
    difficulty: 5,
    stem: 'Một biểu đồ miền thể hiện cơ cấu ba ngành qua sáu năm. Nhận xét nào KHÔNG đọc được từ dạng biểu đồ này?',
    choices: [
      'Giá trị tuyệt đối của từng ngành ở mỗi năm',
      'Xu hướng thay đổi tỉ trọng của từng ngành',
      'Ngành nào chiếm tỉ trọng lớn nhất ở mỗi năm',
      'Tổng tỉ trọng ba ngành luôn bằng 100%',
    ],
    answer: 'A',
    explanation:
      'Biểu đồ miền chỉ thể hiện cơ cấu, tức tỉ lệ phần trăm của mỗi thành phần trong tổng. Nó không mang thông tin về quy mô tuyệt đối: hai năm có cùng cơ cấu vẫn có thể có tổng giá trị chênh nhau rất nhiều.',
    traps: {
      B: 'Đây chính là thế mạnh của biểu đồ miền, nên đọc được.',
    },
    skills: ['giới hạn của biểu đồ miền', 'cơ cấu và quy mô'],
  },
];

export const HARD_ENGLISH = [
  ...buildQuestions('science', 'english', english),
  ...buildQuestions(
    'science',
    'physics',
    extra.filter((q) => q.topicId.startsWith('science.physics')),
  ),
  ...buildQuestions(
    'science',
    'chemistry',
    extra.filter((q) => q.topicId.startsWith('science.chemistry')),
  ),
  ...buildQuestions(
    'science',
    'history',
    extra.filter((q) => q.topicId.startsWith('science.history')),
  ),
  ...buildQuestions(
    'science',
    'geography',
    extra.filter((q) => q.topicId.startsWith('science.geography')),
  ),
];
