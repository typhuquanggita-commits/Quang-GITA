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
    id: 'lop6-cau-giay',
    name: 'THCS Cầu Giấy (và nhóm trường THCS chất lượng cao Hà Nội)',
    shortName: 'Vào 6 CLC',
    track: 'lop6',
    org: 'Phòng GD&ĐT quận / Sở GD&ĐT Hà Nội',
    admissionNote:
      'Nhóm trường THCS chất lượng cao công lập (Cầu Giấy, Thanh Xuân, Nam Từ Liêm, Lê Lợi…) tuyển sinh bằng bài kiểm tra đánh giá năng lực, thường gồm phần Toán và phần Tiếng Việt – Tiếng Anh, kết hợp với hồ sơ học bạ tiểu học. Phương án tuyển sinh do từng trường công bố lại mỗi năm — phải đối chiếu thông báo chính thức của năm dự thi trước khi lên kế hoạch.',
    rounds: ['Xét hồ sơ học bạ (sơ tuyển ở một số trường)', 'Bài kiểm tra đánh giá năng lực'],
    mathPapers: [
      {
        name: 'Phần Toán trong bài đánh giá năng lực',
        minutes: 45,
        scale: '10,0 điểm (quy đổi theo phương án từng trường)',
        note: 'Kết hợp trắc nghiệm và tự luận ngắn. Nội dung nằm trong chương trình tiểu học nhưng cách hỏi xoay và có yếu tố suy luận.',
      },
    ],
    styleTags: ['Đánh giá năng lực', 'Trắc nghiệm + tự luận ngắn', 'Suy luận nhiều hơn tính toán', 'Áp lực thời gian cao'],
    signature: [
      'Toán chuyển động, toán tỉ số phần trăm và toán tính ngược xuất hiện gần như chắc chắn.',
      'Một đến hai câu suy luận logic hoặc dãy số quy luật, không cần công thức nhưng cần cách nghĩ.',
      'Hình học tiểu học hỏi diện tích – chu vi qua hình ghép, ít khi hỏi công thức trực tiếp.',
      'Đề ngắn nhưng thời gian rất chặt: trung bình dưới 3 phút một câu.',
    ],
    benchmark:
      'Tỉ lệ chọi ở các trường THCS chất lượng cao Hà Nội nhiều năm ở mức cao, có trường trên 1 chọi 5. Không có “điểm chuẩn” công bố ổn định như thi vào 10, nên mục tiêu hợp lý là làm đúng gần trọn phần Toán chứ không phải nhắm một con số điểm.',
    competitiveness: 5,
    officialUrl: 'https://hanoi.edu.vn',
    color: '#c2410c',
  },
  {
    id: 'lop6-ngoai-ngu',
    name: 'THCS Ngoại ngữ (Trường ĐH Ngoại ngữ – ĐHQGHN)',
    shortName: 'Vào 6 Ngoại ngữ',
    track: 'lop6',
    org: 'Trường Đại học Ngoại ngữ – ĐHQG Hà Nội',
    admissionNote:
      'Tuyển sinh bằng bài đánh giá năng lực riêng của trường, trong đó Toán nằm trong phần đánh giá năng lực tư duy khoa học tự nhiên. Đề công bố theo từng năm; phải đọc thông báo tuyển sinh chính thức của trường cho năm dự thi.',
    rounds: ['Đăng ký và sơ tuyển hồ sơ', 'Bài đánh giá năng lực'],
    mathPapers: [
      {
        name: 'Phần Toán trong bài đánh giá năng lực',
        minutes: 45,
        scale: 'Theo thang quy đổi của trường',
        note: 'Thiên về suy luận, đọc hiểu dữ liệu và toán có lời văn nhiều bước hơn là tính toán thuần tuý.',
      },
    ],
    styleTags: ['Đánh giá năng lực', 'Đọc hiểu dữ liệu', 'Toán có lời văn nhiều bước', 'Cạnh tranh rất cao'],
    signature: [
      'Toán có lời văn dài, dữ kiện gài trong câu chữ — đọc sai đề là mất câu.',
      'Bảng biểu, biểu đồ đơn giản cần đọc số rồi mới tính.',
      'Suy luận logic dạng bảng đúng/sai xuất hiện thường xuyên.',
      'Ít câu nặng tính toán, nhiều câu nặng cách nghĩ.',
    ],
    benchmark:
      'Là một trong những kỳ tuyển sinh lớp 6 cạnh tranh nhất Hà Nội. Không có điểm chuẩn ổn định giữa các năm, nên hãy lấy tiêu chí “làm đúng và kịp giờ” làm mục tiêu thay vì một mốc điểm.',
    competitiveness: 5,
    officialUrl: 'https://ulis.vnu.edu.vn',
    color: '#7c2d12',
  },
  {
    id: 'ck-thcs',
    name: 'Kiểm tra định kỳ môn Toán — THCS (lớp 6 đến lớp 9)',
    shortName: 'Chính khoá THCS',
    track: 'chinh-khoa',
    org: 'Trường THCS · theo Thông tư 22/2021/TT-BGDĐT',
    admissionNote:
      'Không phải kỳ thi tuyển sinh. Đây là hệ thống đánh giá thường xuyên và định kỳ trong năm học: điểm đánh giá thường xuyên (hệ số 1), điểm giữa kỳ (hệ số 2) và điểm cuối kỳ (hệ số 3). Điểm trung bình môn quyết định xếp loại học lực và hồ sơ học bạ.',
    rounds: ['Đánh giá thường xuyên', 'Kiểm tra giữa kỳ', 'Kiểm tra cuối kỳ'],
    mathPapers: [
      {
        name: 'Kiểm tra giữa kỳ',
        minutes: 60,
        scale: '10,0 điểm',
        note: 'Thường 30–40% trắc nghiệm và 60–70% tự luận, ma trận theo bốn mức: nhận biết, thông hiểu, vận dụng, vận dụng cao.',
      },
      {
        name: 'Kiểm tra cuối kỳ',
        minutes: 90,
        scale: '10,0 điểm',
        note: 'Phạm vi rộng hơn, phủ toàn bộ nội dung của học kỳ; tỉ trọng câu vận dụng cao lớn hơn bài giữa kỳ.',
      },
    ],
    styleTags: ['Bám sát sách giáo khoa', 'Ma trận bốn mức độ', 'Đề do trường ra', 'Trọng số hệ số 1-2-3'],
    signature: [
      'Đề do chính giáo viên bộ môn hoặc tổ chuyên môn của trường ra, nên bám rất sát nội dung đã dạy trên lớp.',
      'Nhóm câu nhận biết và thông hiểu chiếm khoảng 70% số điểm — đây là phần không được phép mất.',
      'Hai câu cuối là vận dụng và vận dụng cao, quyết định khoảng cách giữa 8 điểm và 10 điểm.',
      'Điểm hệ số 1 tích luỹ suốt kỳ và ảnh hưởng tới điểm tổng kết nhiều hơn học sinh thường nghĩ.',
    ],
    benchmark:
      'Để đạt điểm tổng kết môn từ 9,0, thông thường cần điểm hệ số 1 gần tuyệt đối và cả hai bài định kỳ đều từ 8,5 trở lên. Trọng số cụ thể theo Thông tư 22: ĐTB môn = (tổng điểm thường xuyên + 2 × giữa kỳ + 3 × cuối kỳ) / (số điểm thường xuyên + 5).',
    competitiveness: 3,
    officialUrl: 'https://moet.gov.vn',
    color: '#0d9488',
  },
  {
    id: 'ck-thpt',
    name: 'Kiểm tra định kỳ môn Toán — THPT (lớp 10 đến lớp 12)',
    shortName: 'Chính khoá THPT',
    track: 'chinh-khoa',
    org: 'Trường THPT · theo Thông tư 22/2021/TT-BGDĐT',
    admissionNote:
      'Không phải kỳ thi tuyển sinh. Điểm trung bình môn Toán ba năm THPT vào học bạ, ảnh hưởng trực tiếp tới xét học bạ, xét học sinh giỏi và hồ sơ xét tuyển sớm của nhiều trường đại học.',
    rounds: ['Đánh giá thường xuyên', 'Kiểm tra giữa kỳ', 'Kiểm tra cuối kỳ'],
    mathPapers: [
      {
        name: 'Kiểm tra giữa kỳ',
        minutes: 60,
        scale: '10,0 điểm',
        note: 'Nhiều trường đã chuyển sang định dạng ba phần giống đề tốt nghiệp: nhiều lựa chọn, đúng/sai, trả lời ngắn.',
      },
      {
        name: 'Kiểm tra cuối kỳ',
        minutes: 90,
        scale: '10,0 điểm',
        note: 'Phủ toàn bộ học kỳ; với lớp 12 thường được ra theo đúng cấu trúc đề tốt nghiệp để học sinh làm quen sớm.',
      },
    ],
    styleTags: ['Ba phần như đề tốt nghiệp', 'Ma trận bốn mức độ', 'Vào học bạ', 'Xét tuyển sớm'],
    signature: [
      'Từ lớp 10, nhiều trường ra đề theo đúng ba phần của đề tốt nghiệp — luyện sớm là lợi thế kép.',
      'Phần trả lời ngắn không có phương án để loại trừ, nên rủi ro cao và cần quy trình kiểm tra chéo.',
      'Câu vận dụng cao thường rơi vào hàm số, tích phân, hình không gian hoặc xác suất tuỳ khối lớp.',
      'Điểm học bạ ba năm là một kênh xét tuyển đại học thật, không phải chỉ là con số trong sổ.',
    ],
    benchmark:
      'Mục tiêu thực tế của luồng này là điểm tổng kết môn Toán từ 9,0 mỗi kỳ. Công thức theo Thông tư 22 giống bậc THCS, nên vẫn phải giữ điểm hệ số 1 gần tuyệt đối.',
    competitiveness: 3,
    officialUrl: 'https://moet.gov.vn',
    color: '#1B4F9C',
  },
  {
    id: 'sat',
    name: 'SAT — phần Toán (College Board)',
    shortName: 'SAT Math',
    track: 'thpt-qg',
    org: 'College Board (Hoa Kỳ)',
    admissionNote:
      'Chứng chỉ quốc tế, được nhiều trường đại học Việt Nam dùng trong phương thức xét tuyển kết hợp và là yêu cầu phổ biến khi nộp hồ sơ du học Mỹ. Bài thi hiện ở dạng số hoá và thích ứng theo module. Điều kiện và mức điểm quy đổi do từng trường công bố lại theo năm — phải đọc đề án tuyển sinh của trường mục tiêu.',
    rounds: ['Đăng ký theo đợt thi của College Board', 'Thi trên máy tại điểm thi được uỷ quyền'],
    mathPapers: [
      {
        name: 'Math section (2 module)',
        minutes: 70,
        scale: '200 – 800 điểm cho phần Toán',
        note: 'Khoảng 44 câu, phần lớn là trắc nghiệm bốn phương án, một phần là câu điền đáp số. Được dùng máy tính cho toàn bộ phần Toán.',
      },
    ],
    styleTags: ['Đề tiếng Anh', 'Thi trên máy', 'Thích ứng theo module', 'Nặng đọc hiểu dữ liệu'],
    signature: [
      'Đề bằng tiếng Anh: rào cản đầu tiên là đọc hiểu đề, không phải kiến thức Toán.',
      'Tỉ trọng lớn dành cho đại số, phân tích dữ liệu và giải quyết vấn đề — nhẹ hình học hơn đề Việt Nam.',
      'Nhiều câu gắn với bối cảnh thực tế và bảng biểu, đòi hỏi đọc số rồi mới tính.',
      'Module thứ hai thay đổi độ khó theo kết quả module thứ nhất.',
    ],
    benchmark:
      'Kiến thức Toán của SAT nằm gọn trong chương trình phổ thông Việt Nam và thường được đánh giá là nhẹ hơn đề tốt nghiệp về độ khó kỹ thuật. Khó khăn thật nằm ở tiếng Anh, ở tốc độ và ở dạng câu đọc hiểu dữ liệu.',
    competitiveness: 3,
    officialUrl: 'https://satsuite.collegeboard.org',
    color: '#0f766e',
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
