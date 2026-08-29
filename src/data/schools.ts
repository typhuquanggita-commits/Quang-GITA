import type { School, Strand } from '@/types';

export const STRANDS: Strand[] = [
  {
    id: 'dai-so',
    name: 'Đại số & Giải tích sơ cấp',
    short: 'Đại số',
    color: '#4f46e5',
    description:
      'Biến đổi căn thức, phương trình – hệ phương trình, hàm số bậc hai, định lí Viète, phương trình vô tỉ, đa thức.',
  },
  {
    id: 'so-hoc',
    name: 'Số học',
    short: 'Số học',
    color: '#0891b2',
    description:
      'Chia hết, số nguyên tố, đồng dư, phương trình nghiệm nguyên, ước – bội, phần nguyên. Mạch “đinh” của đề chuyên.',
  },
  {
    id: 'hinh-hoc',
    name: 'Hình học phẳng',
    short: 'Hình học',
    color: '#db2777',
    description:
      'Đường tròn, tứ giác nội tiếp, hệ thức lượng, đồng dạng, phương tích, thẳng hàng – đồng quy, quỹ tích – điểm cố định.',
  },
  {
    id: 'to-hop',
    name: 'Tổ hợp & Rời rạc',
    short: 'Tổ hợp',
    color: '#7c3aed',
    description:
      'Đếm, nguyên lí Dirichlet, bất biến – đơn biến, cực hạn, tô màu, trò chơi. Câu “chốt” phân loại thí sinh chuyên.',
  },
  {
    id: 'bat-dang-thuc',
    name: 'Bất đẳng thức & Cực trị',
    short: 'BĐT',
    color: '#ea580c',
    description:
      'AM–GM, Cauchy–Schwarz, dồn biến, SOS, đánh giá từng biến, cực trị đại số và cực trị hình học.',
  },
  {
    id: 'thuc-te',
    name: 'Toán thực tế & Ứng dụng',
    short: 'Thực tế',
    color: '#059669',
    description:
      'Giải bài toán bằng cách lập phương trình/hệ, hình không gian (trụ – nón – cầu), thống kê – xác suất theo CT GDPT 2018.',
  },
  {
    id: 'giai-tich',
    name: 'Giải tích & Hàm số',
    short: 'Giải tích',
    color: '#2563eb',
    description:
      'Hàm số và đồ thị, lượng giác, dãy số – cấp số, giới hạn, đạo hàm, mũ – logarit, nguyên hàm – tích phân. Mạch chiếm tỉ trọng lớn nhất trong đề thi tốt nghiệp THPT.',
  },
  {
    id: 'hinh-khong-gian',
    name: 'Hình học không gian',
    short: 'HH không gian',
    color: '#9333ea',
    description:
      'Quan hệ song song – vuông góc, góc và khoảng cách, thể tích khối đa diện, khối tròn xoay.',
  },
  {
    id: 'toa-do',
    name: 'Phương pháp toạ độ',
    short: 'Toạ độ',
    color: '#0d9488',
    description:
      'Vectơ, toạ độ trong mặt phẳng (đường thẳng, đường tròn, ba đường conic) và toạ độ trong không gian Oxyz.',
  },
  {
    id: 'xac-suat',
    name: 'Thống kê & Xác suất',
    short: 'TK–XS',
    color: '#e11d48',
    description:
      'Đại số tổ hợp, nhị thức Newton, mẫu số liệu ghép nhóm, phương sai – độ lệch chuẩn, xác suất có điều kiện.',
  },
];

export const strandById = (id: string) => STRANDS.find((s) => s.id === id)!;

export const SCHOOLS: School[] = [
  {
    id: 'hanoi-chung',
    name: 'Kỳ thi tuyển sinh lớp 10 THPT công lập Hà Nội',
    shortName: 'Vào 10 Hà Nội',
    track: 'thpt',
    org: 'Sở GD&ĐT Hà Nội',
    admissionNote:
      'Thi 3 môn Toán – Ngữ văn – Ngoại ngữ. Điểm xét tuyển = (Toán + Văn) × 2 + Ngoại ngữ + điểm ưu tiên. Toán và Văn hệ số 2 nên mỗi 0,25 điểm Toán có giá trị gấp đôi.',
    rounds: ['Một vòng thi chung toàn thành phố'],
    mathPapers: [
      {
        name: 'Toán (đề chung)',
        minutes: 90,
        scale: '10,0 điểm',
        note: '100% tự luận, thường gồm 5 bài lớn. Đề bám sát chuẩn kiến thức, độ khó tăng dần, phân hoá ở ý cuối Bài IV và Bài V.',
      },
    ],
    styleTags: ['Tự luận 100%', 'Ổn định cấu trúc', 'Phân hoá cuối đề', 'Áp lực thời gian'],
    signature: [
      'Bài I rút gọn biểu thức chứa căn – gần như năm nào cũng có, 2,0 điểm “chắc ăn”.',
      'Bài II giải bài toán bằng cách lập phương trình/hệ + một ý hình không gian thực tế.',
      'Bài IV hình tròn 3–4 ý, ý cuối là chốt chặn 9 điểm.',
      'Bài V 0,5 điểm bất đẳng thức/cực trị – quyết định điểm 10.',
    ],
    benchmark:
      'Điểm chuẩn nhóm trường top (Kim Liên, Yên Hoà, Việt Đức, Thăng Long, Lê Quý Đôn – Hà Đông…) nhiều năm dao động 40–43/50, tương đương trung bình 8,0–8,6 mỗi môn. Muốn an toàn, Toán cần 9,0+.',
    competitiveness: 4,
    officialUrl: 'https://hanoi.edu.vn',
    color: '#0f766e',
  },
  {
    id: 'khtn',
    name: 'THPT Chuyên Khoa học Tự nhiên (ĐHQG Hà Nội)',
    shortName: 'Chuyên KHTN',
    track: 'chuyen',
    org: 'Trường ĐH Khoa học Tự nhiên – ĐHQGHN',
    admissionNote:
      'Thi riêng, độc lập với kỳ thi của Sở. Xét tuyển theo tổng điểm các bài thi vòng 2 (môn chuyên nhân hệ số), sau khi đã đạt điều kiện vòng 1.',
    rounds: [
      'Vòng 1 (điều kiện): Toán vòng 1 + Ngữ văn – lấy ngưỡng để vào vòng 2',
      'Vòng 2 (chuyên): Toán vòng 2 – đề chuyên, quyết định đỗ/trượt',
    ],
    mathPapers: [
      {
        name: 'Toán vòng 1',
        minutes: 120,
        scale: '10,0 điểm',
        note: 'Kiến thức THCS nâng cao, 4–5 bài. Khó hơn đề vào 10 công lập rõ rệt nhưng chưa “chuyên sâu”. Đây là cửa ải loại phần lớn thí sinh.',
      },
      {
        name: 'Toán vòng 2 (chuyên)',
        minutes: 150,
        scale: '10,0 điểm',
        note: 'Đề chuyên đúng nghĩa: 4–5 bài, mỗi bài 1–2 ý. Trọng tâm Số học – Tổ hợp – Hình học, phong cách ngắn gọn nhưng ý tưởng sâu.',
      },
    ],
    styleTags: ['Số học nặng', 'Tổ hợp sáng tạo', 'Đề ngắn – ý sâu', 'Ít mẹo, nhiều tư duy'],
    signature: [
      'Số học xuất hiện gần như 100% các năm: chia hết, số nguyên tố, phương trình nghiệm nguyên, đồng dư.',
      'Tổ hợp (Dirichlet, bất biến, cực hạn, tô màu) thường là bài chốt – ít học sinh làm trọn vẹn.',
      'Hình học thiên về tỉ số, đường tròn, thẳng hàng – đồng quy, ít khi dùng công cụ “nặng”.',
      'Bất đẳng thức xuất hiện nhưng thường ở dạng đánh giá kết hợp, không phải BĐT thuần kỹ thuật.',
    ],
    benchmark:
      'Tỉ lệ chọi chuyên Toán KHTN thường 1/6 – 1/10. Điểm chuẩn (theo công thức có hệ số) tương đương mức làm được ~6,5–7,5/10 đề vòng 2 – tức phải trọn vẹn 3 bài đầu và ăn điểm phần của bài chốt.',
    competitiveness: 5,
    officialUrl: 'https://hus.vnu.edu.vn',
    color: '#4338ca',
  },
  {
    id: 'ams',
    name: 'THPT Chuyên Hà Nội – Amsterdam',
    shortName: 'Chuyên Ams',
    track: 'chuyen',
    org: 'Sở GD&ĐT Hà Nội',
    admissionNote:
      'Thí sinh thi 3 môn chung của thành phố (Toán, Văn, Ngoại ngữ) rồi thi thêm môn chuyên. Điểm xét = tổng 3 môn chung + điểm môn chuyên × 2, và phải đạt điều kiện không có bài thi nào dưới ngưỡng quy định.',
    rounds: ['Ba môn thi chung toàn thành phố', 'Bài thi môn chuyên Toán'],
    mathPapers: [
      {
        name: 'Toán chuyên',
        minutes: 150,
        scale: '10,0 điểm',
        note: 'Thường 5 bài: Đại số – Số học – Bất đẳng thức/cực trị – Hình học (3 ý) – Tổ hợp. Đề cân đối, trình bày đẹp, phân hoá mượt.',
      },
    ],
    styleTags: ['Cân đối 5 mạch', 'Hình học 3 điểm', 'Chuẩn mực', 'Phân hoá mượt'],
    signature: [
      'Bài hình 3,0 điểm với 3 ý tăng dần: nội tiếp → hệ thức/tỉ số → điểm cố định hoặc cực trị.',
      'Một bài số học “vừa sức” nhưng cần trình bày chặt (chia hết, nghiệm nguyên).',
      'Một bài bất đẳng thức có điểm rơi không đối xứng hoặc cần dồn biến nhẹ.',
      'Bài tổ hợp cuối 1,0 điểm mang tính chọn lọc, thường dùng Dirichlet hoặc đếm khéo.',
    ],
    benchmark:
      'Chuyên Toán Ams là lớp chuyên cạnh tranh nhất Hà Nội, tỉ lệ chọi cao và điểm chuẩn thuộc nhóm cao nhất khối chuyên của Sở. Cần đồng thời điểm 3 môn chung tốt (Toán chung ≥ 9) và Toán chuyên ≥ 7.',
    competitiveness: 5,
    officialUrl: 'https://hn-ams.edu.vn',
    color: '#b91c1c',
  },
  {
    id: 'cva',
    name: 'THPT Chu Văn An (hệ chuyên)',
    shortName: 'Chuyên Chu Văn An',
    track: 'chuyen',
    org: 'Sở GD&ĐT Hà Nội',
    admissionNote:
      'Dùng chung đề thi môn chuyên với các trường chuyên của Sở (cùng đề Toán chuyên với Ams, Nguyễn Huệ, Sơn Tây). Thí sinh được đăng ký nguyện vọng chuyên theo quy định của Sở.',
    rounds: ['Ba môn thi chung toàn thành phố', 'Bài thi môn chuyên Toán (đề chung khối chuyên của Sở)'],
    mathPapers: [
      {
        name: 'Toán chuyên',
        minutes: 150,
        scale: '10,0 điểm',
        note: 'Cùng đề với Chuyên Ams. Khác biệt nằm ở điểm chuẩn từng trường, không nằm ở đề thi.',
      },
    ],
    styleTags: ['Đề chung khối chuyên Sở', 'Điểm chuẩn dễ thở hơn Ams', 'Cơ hội nguyện vọng 2'],
    signature: [
      'Chiến lược ôn tập giống hệt Chuyên Ams vì chung một đề.',
      'Ngưỡng đỗ thấp hơn Ams, phù hợp làm nguyện vọng an toàn cho học sinh nhóm Bứt phá – Chuyên sâu.',
      'Điểm 3 môn chung vẫn chiếm tỉ trọng lớn ⇒ không được bỏ bê đề chung.',
    ],
    benchmark:
      'Điểm chuẩn chuyên Toán Chu Văn An thường thấp hơn Ams vài điểm (theo thang có hệ số), là “vùng đệm” hợp lý cho thí sinh đạt Toán chuyên 5,5–7,0.',
    competitiveness: 4,
    officialUrl: 'https://chuvanan.edu.vn',
    color: '#1d4ed8',
  },
  {
    id: 'ntt',
    name: 'THCS & THPT Nguyễn Tất Thành (ĐHSP Hà Nội)',
    shortName: 'Nguyễn Tất Thành',
    track: 'chuyen',
    org: 'Trường ĐH Sư phạm Hà Nội',
    admissionNote:
      'Trường tổ chức kỳ thi tuyển sinh riêng vào lớp 10 với đề thi do trường ra (thường gồm Toán, Ngữ văn, Tiếng Anh). Đề Toán ở mức nâng cao, không “chuyên sâu” như KHTN nhưng khó hơn hẳn đề vào 10 công lập.',
    rounds: ['Một kỳ thi riêng của trường (Toán – Văn – Tiếng Anh)'],
    mathPapers: [
      {
        name: 'Toán (đề riêng của trường)',
        minutes: 90,
        scale: '10,0 điểm',
        note: 'Cấu trúc gần với đề vào 10 nhưng nâng độ khó ở 2 ý cuối; đôi khi có câu số học hoặc bất đẳng thức nhẹ.',
      },
    ],
    styleTags: ['Đề riêng', 'Nâng cao vừa', 'Cầu nối THPT ↔ chuyên'],
    signature: [
      'Nền tảng đề vào 10 + 1–2 ý nâng cao ⇒ ôn theo Luồng THPT rồi bổ sung module nâng cao.',
      'Yêu cầu tốc độ và độ chính xác cao vì thời gian ngắn.',
      'Là lựa chọn nguyện vọng an toàn rất tốt cho học sinh luyện chuyên.',
    ],
    benchmark:
      'Tỉ lệ chọi cao do chỉ tiêu hạn chế. Thực tế cần Toán ≥ 8,0 cùng hai môn còn lại khá đều.',
    competitiveness: 4,
    officialUrl: 'https://nguyentatthanh.edu.vn',
    color: '#7c3aed',
  },
  {
    id: 'sp',
    name: 'THPT Chuyên ĐH Sư phạm Hà Nội',
    shortName: 'Chuyên Sư phạm',
    track: 'chuyen',
    org: 'Trường ĐH Sư phạm Hà Nội',
    admissionNote:
      'Kỳ thi riêng, thường gồm Toán (điều kiện), Ngữ văn và Toán chuyên. Là lựa chọn song song rất phổ biến với KHTN vì lịch thi và phong cách đề gần nhau.',
    rounds: ['Bài thi các môn điều kiện', 'Bài thi môn chuyên Toán'],
    mathPapers: [
      {
        name: 'Toán (điều kiện)',
        minutes: 90,
        scale: '10,0 điểm',
        note: 'Mức nâng cao, kiểm tra nền tảng và tốc độ.',
      },
      {
        name: 'Toán chuyên',
        minutes: 120,
        scale: '10,0 điểm',
        note: 'Đề chuyên với 4–5 bài, phong cách gần KHTN nhưng thường “mềm” hơn ở tổ hợp và nặng hơn ở đại số.',
      },
    ],
    styleTags: ['Đại số mạnh', 'Song song với KHTN', 'Đề đẹp – trình bày rõ'],
    signature: [
      'Đại số (phương trình, hệ, đa thức) thường chiếm tỉ trọng lớn hơn so với KHTN.',
      'Hình học có xu hướng “kinh điển”, nhiều bài về đường tròn và tỉ số.',
      'Rất hợp làm nguyện vọng song song cho học sinh theo Luồng Chuyên.',
    ],
    benchmark:
      'Cùng nhóm cạnh tranh với KHTN; nhiều thí sinh thi cả hai. Mức an toàn: làm trọn 3 bài đầu đề chuyên.',
    competitiveness: 5,
    officialUrl: 'https://hnue.edu.vn',
    color: '#059669',
  },
  {
    id: 'tn-thpt',
    name: 'Kỳ thi tốt nghiệp THPT — môn Toán',
    shortName: 'Tốt nghiệp THPT',
    track: 'thpt-qg',
    org: 'Bộ GD&ĐT',
    admissionNote:
      'Kết quả vừa dùng để xét tốt nghiệp vừa là căn cứ xét tuyển đại học của phần lớn các trường. Với các ngành top, điểm Toán 9+ gần như là điều kiện cần.',
    rounds: ['Một kỳ thi chung toàn quốc'],
    mathPapers: [
      {
        name: 'Toán',
        minutes: 90,
        scale: '10,0 điểm',
        note: 'Theo định dạng từ 2025: Phần I trắc nghiệm nhiều lựa chọn (12 câu, 3,0 điểm) — Phần II trắc nghiệm đúng/sai (4 câu, mỗi câu 4 ý, 4,0 điểm) — Phần III trả lời ngắn (6 câu, 3,0 điểm).',
      },
    ],
    styleTags: ['3 phần', 'Đúng/Sai phân hoá mạnh', 'Trả lời ngắn', 'Áp lực 90 phút'],
    signature: [
      'Phần II (đúng/sai) là nơi mất điểm nhiều nhất: sai 1 ý trong 4 ý đã tụt từ 1,0 xuống 0,5 điểm.',
      'Phần III (trả lời ngắn) không có phương án để loại trừ — buộc phải tính đúng tuyệt đối.',
      'Các mạch chiếm tỉ trọng lớn: ứng dụng đạo hàm, nguyên hàm – tích phân, toạ độ Oxyz, xác suất – thống kê.',
      'Bài toán thực tế và mô hình hoá xuất hiện dày hơn so với định dạng cũ.',
    ],
    benchmark:
      'Điểm 9,0+ môn Toán thường nằm trong nhóm vài phần trăm thí sinh cao nhất. Muốn chắc 9+, cần đúng gần trọn Phần I và Phần III, đồng thời ăn ít nhất 3/4 số điểm Phần II.',
    competitiveness: 5,
    officialUrl: 'https://moet.gov.vn',
    color: '#1d4ed8',
  },
  {
    id: 'tong-ket',
    name: 'Mục tiêu Top 1 tổng kết môn Toán lớp 10 – 11 – 12',
    shortName: 'Top 1 tổng kết',
    track: 'thpt-qg',
    org: 'Trường THPT đang theo học',
    admissionNote:
      'Điểm tổng kết = trung bình các bài kiểm tra thường xuyên, giữa kỳ (hệ số 2) và cuối kỳ (hệ số 3). Đây là nền tảng cho học bạ, xét tuyển sớm và học sinh giỏi.',
    rounds: ['Kiểm tra thường xuyên', 'Giữa kỳ', 'Cuối kỳ'],
    mathPapers: [
      {
        name: 'Kiểm tra giữa kỳ / cuối kỳ',
        minutes: 90,
        scale: '10,0 điểm',
        note: 'Bám sát ma trận đề của tổ chuyên môn từng trường; thường gồm trắc nghiệm + tự luận.',
      },
    ],
    styleTags: ['Đều đặn', 'Bám sát SGK', 'Điểm số tích luỹ'],
    signature: [
      'Điểm tổng kết là kết quả của thói quen, không phải của một lần bứt phá.',
      'Bài kiểm tra thường xuyên (hệ số 1) hay bị xem nhẹ nhưng lại kéo trung bình xuống rõ rệt.',
      'Nắm chắc ma trận đề của trường: giáo viên thường ra đề bám theo bài tập đã chữa.',
    ],
    benchmark:
      'Top 1 tổng kết môn Toán thường cần trung bình từ 9,5 trở lên — nghĩa là gần như không được có bài kiểm tra nào dưới 9.',
    competitiveness: 4,
    officialUrl: 'https://moet.gov.vn',
    color: '#c2410c',
  },
  {
    id: 'hsa',
    name: 'Đánh giá năng lực HSA — ĐHQG Hà Nội',
    shortName: 'ĐGNL HSA',
    track: 'thpt-qg',
    org: 'ĐHQG Hà Nội',
    admissionNote:
      'Bài thi tổng hợp gồm phần Toán học & Xử lí số liệu, Ngôn ngữ – Văn học, và phần Khoa học/Tiếng Anh. Nhiều trường top dùng kết quả này để xét tuyển.',
    rounds: ['Nhiều đợt thi trong năm, được lấy điểm cao nhất'],
    mathPapers: [
      {
        name: 'Phần Toán học và Xử lí số liệu',
        minutes: 75,
        scale: '50 câu',
        note: 'Trắc nghiệm và điền đáp án, tốc độ rất cao — trung bình khoảng 1,5 phút/câu.',
      },
    ],
    styleTags: ['Tốc độ cao', 'Suy luận – số liệu', 'Nhiều đợt thi'],
    signature: [
      'Yếu tố quyết định là tốc độ xử lý, không phải độ khó của từng câu.',
      'Cần luyện đọc biểu đồ, bảng số liệu và ước lượng nhanh.',
      'Máy tính cầm tay dùng thành thạo tiết kiệm rất nhiều thời gian.',
    ],
    benchmark: 'Nhóm ngành cạnh tranh cao thường lấy từ 100+/150 điểm tổng bài thi.',
    competitiveness: 4,
    officialUrl: 'https://khaothi.vnu.edu.vn',
    color: '#7c3aed',
  },
  {
    id: 'tsa',
    name: 'Đánh giá tư duy TSA — ĐH Bách khoa Hà Nội',
    shortName: 'ĐGTD TSA',
    track: 'thpt-qg',
    org: 'ĐH Bách khoa Hà Nội',
    admissionNote:
      'Gồm ba phần: Tư duy Toán học, Tư duy Đọc hiểu và Tư duy Khoa học/Giải quyết vấn đề. Được nhiều trường kỹ thuật sử dụng để xét tuyển.',
    rounds: ['Nhiều đợt thi trong năm'],
    mathPapers: [
      {
        name: 'Phần Tư duy Toán học',
        minutes: 60,
        scale: '40 câu',
        note: 'Nhấn mạnh tư duy định lượng, mô hình hoá và giải quyết vấn đề hơn là kỹ thuật tính toán.',
      },
    ],
    styleTags: ['Tư duy định lượng', 'Mô hình hoá', 'Ít mẹo tính'],
    signature: [
      'Câu hỏi thường gắn với tình huống thực tế, cần dịch bài toán ra ngôn ngữ toán học.',
      'Không nặng biến đổi phức tạp nhưng đòi hỏi đọc hiểu chính xác.',
      'Luyện tư duy này giúp cả kỳ thi tốt nghiệp lẫn HSA.',
    ],
    benchmark: 'Các ngành hot của Bách khoa thường yêu cầu từ 70+/100 điểm TSA.',
    competitiveness: 4,
    officialUrl: 'https://tsa.hust.edu.vn',
    color: '#059669',
  },
];

export const schoolById = (id: string) => SCHOOLS.find((s) => s.id === id)!;
export const schoolsByTrack = (track: string) => SCHOOLS.filter((s) => s.track === track);
