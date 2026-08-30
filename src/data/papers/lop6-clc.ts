import type { ExamPaper } from '@/types';

/**
 * ĐỀ MẪU 08 — Toán, bài đánh giá năng lực vào lớp 6 trường THCS chất lượng cao.
 * Bám sát ma trận bp-lop6-clc: 45 phút · thang 10 · 3 phần · 15 câu.
 *
 * Đây là đề do MATH365 biên soạn theo mặt bằng chung của kỳ thi, KHÔNG phải đề
 * thi thật của bất kỳ trường nào và không phải cấu trúc chính thức được công bố.
 */
export const PAPER_LOP6_CLC_01: ExamPaper = {
  id: 'dm-lop6-clc-01',
  code: 'M365-L6-CLC-01',
  blueprintId: 'bp-lop6-clc',
  schoolId: 'lop6-cau-giay',
  track: 'lop6',
  title: 'Đề mẫu 08 · Toán đánh giá năng lực vào lớp 6 chất lượng cao',
  subtitle: '45 phút · thang điểm 10 · 8 câu trắc nghiệm, 4 câu trả lời ngắn, 3 câu tự luận',
  minutes: 45,
  totalPoints: 10,
  fidelity: [
    'Đúng ba phần và đúng tỉ trọng điểm của ma trận: 4,0 – 3,0 – 3,0.',
    'Đúng số câu mỗi phần: 8 câu trắc nghiệm 0,5 điểm, 4 câu trả lời ngắn 0,75 điểm, 3 câu tự luận 1,0 điểm.',
    'Toàn bộ kiến thức nằm trong chương trình tiểu học, không dùng bất kỳ công cụ nào của cấp hai.',
    'Độ khó tăng dần trong từng phần; nhóm câu phân hoá nằm ở Phần III đúng như đề thật.',
    'Tổng thời gian đề nghị cho các câu là 43 phút, chừa 2 phút đọc đề và soát bài.',
    'KHÔNG sao chép đề của bất kỳ trường nào. Cấu trúc thật do từng trường công bố lại theo năm — hãy đối chiếu trước khi dùng.',
  ],
  parts: [
    {
      label: 'Phần I · Trắc nghiệm',
      points: 4,
      note: '8 câu, mỗi câu 0,5 điểm. Chọn một phương án đúng. Trung bình dưới 2 phút mỗi câu.',
      items: [
        {
          id: 'l6-1-1',
          label: 'Phần I · Câu 1',
          points: 0.5,
          minutes: 2,
          strand: 'so-hoc',
          level: 1,
          format: 'trac-nghiem',
          topicIds: ['l6-phan-so-thap-phan'],
          statement: 'Kết quả của phép tính 3/4 + 5/6 là phân số nào?',
          choices: ['8/10', '19/24', '19/12', '15/24'],
          correctIndex: 2,
          answer: '19/12',
          solution: [
            'Mẫu số chung nhỏ nhất của 4 và 6 là 12.',
            '3/4 = 9/12 và 5/6 = 10/12.',
            'Cộng hai tử số: 9 + 10 = 19, được 19/12.',
            '19/12 đã tối giản vì 19 là số nguyên tố và không chia hết cho 12.',
          ],
          barem: [{ item: 'Quy đồng đúng và cộng đúng tử số, kết quả 19/12', point: 0.5 }],
          analysis: {
            dang: 'Cộng hai phân số khác mẫu',
            knowledge: [
              'Quy đồng mẫu số bằng bội chung nhỏ nhất.',
              'Quy tắc cộng phân số cùng mẫu.',
              'Rút gọn phân số.',
            ],
            docVi: [
              'Chỉ có phép tính, không có lời văn — đây là câu lấy điểm.',
              'Hai mẫu số nhỏ và có bội chung nhỏ hơn tích của chúng.',
            ],
            method: [
              'Tìm mẫu chung nhỏ nhất (12, không phải 24).',
              'Quy đồng cả tử lẫn mẫu theo cùng thừa số phụ.',
              'Cộng tử, giữ nguyên mẫu.',
              'Rút gọn nếu được.',
            ],
            traps: [
              'Phương án 8/10 là bẫy cộng tử với tử, mẫu với mẫu.',
              'Phương án 19/24 là bẫy lấy mẫu chung bằng 4 × 6 nhưng quên nhân tử tương ứng.',
            ],
            tips: [
              'Với hai mẫu nhỏ, nhẩm bội chung nhỏ nhất nhanh hơn nhân chéo.',
              'Kiểm tra hợp lý: 3/4 và 5/6 đều gần 1, tổng phải lớn hơn 1 — loại ngay 8/10 và 19/24.',
            ],
            transfer:
              'Kỹ năng nền nằm bên trong hầu hết các câu có lời văn ở Phần II và Phần III.',
          },
        },
        {
          id: 'l6-1-2',
          label: 'Phần I · Câu 2',
          points: 0.5,
          minutes: 2,
          strand: 'so-hoc',
          level: 2,
          format: 'trac-nghiem',
          topicIds: ['l6-phan-so-thap-phan'],
          statement: 'Tính nhanh: 12,5 × 37 + 12,5 × 63.',
          choices: ['1250', '125', '12500', '1237,5'],
          correctIndex: 0,
          answer: '1250',
          solution: [
            'Hai tích có chung thừa số 12,5 nên đặt thừa số chung ra ngoài.',
            '12,5 × 37 + 12,5 × 63 = 12,5 × (37 + 63).',
            '37 + 63 = 100.',
            'Vậy kết quả là 12,5 × 100 = 1250.',
          ],
          barem: [{ item: 'Đặt được thừa số chung và tính ra 1250', point: 0.5 }],
          analysis: {
            dang: 'Tính nhanh bằng cách đặt thừa số chung',
            knowledge: [
              'Tính chất phân phối của phép nhân với phép cộng.',
              'Nhân số thập phân với 100.',
            ],
            docVi: [
              'Có chữ "tính nhanh" trong đề.',
              'Hai số hạng có chung một thừa số, và hai số còn lại cộng thành số tròn trăm.',
            ],
            method: [
              'Quan sát toàn biểu thức trước khi tính bất kỳ phép nào.',
              'Đặt thừa số chung ra ngoài ngoặc.',
              'Tính trong ngoặc trước, rồi nhân một lần duy nhất.',
            ],
            traps: [
              'Nhân ra từng tích rồi cộng — lâu và dễ sai.',
              'Phương án 125 và 12500 là bẫy đặt sai dấu phẩy khi nhân với 100.',
            ],
            tips: [
              'Nhìn thấy hai số cộng lại tròn trăm là dấu hiệu chắc chắn của bài tính nhanh.',
              'Nhân với 100 thì dịch dấu phẩy sang phải 2 chữ số.',
            ],
            transfer: 'Kỹ thuật tiết kiệm thời gian, giúp dành phút cho Phần III.',
          },
        },
        {
          id: 'l6-1-3',
          label: 'Phần I · Câu 3',
          points: 0.5,
          minutes: 2,
          strand: 'so-hoc',
          level: 2,
          format: 'trac-nghiem',
          topicIds: ['l6-ti-so-phan-tram'],
          statement:
            'Một chiếc áo có giá niêm yết 350 000 đồng, cửa hàng giảm giá 20%. Hỏi giá chiếc áo sau khi giảm là bao nhiêu?',
          choices: ['70 000 đồng', '280 000 đồng', '330 000 đồng', '420 000 đồng'],
          correctIndex: 1,
          answer: '280 000 đồng',
          solution: [
            'Số tiền được giảm: 350 000 × 20 : 100 = 70 000 đồng.',
            'Giá sau khi giảm: 350 000 − 70 000 = 280 000 đồng.',
            'Cách nhanh hơn: giá sau giảm bằng 80% giá cũ, tức 350 000 × 80 : 100 = 280 000 đồng.',
          ],
          barem: [{ item: 'Tính đúng giá sau giảm là 280 000 đồng', point: 0.5 }],
          analysis: {
            dang: 'Giảm giá theo tỉ số phần trăm',
            knowledge: [
              'Tìm giá trị phần trăm của một số.',
              'Quan hệ giữa phần đã giảm và phần còn lại (100% = phần giảm + phần còn lại).',
            ],
            docVi: [
              'Có một số tiền gốc và một tỉ lệ phần trăm.',
              'Câu hỏi là "sau khi giảm", tức hỏi phần còn lại chứ không hỏi phần giảm.',
            ],
            method: [
              'Xác định 20% là 20% của giá niêm yết.',
              'Tính số tiền giảm rồi lấy giá gốc trừ đi; hoặc tính thẳng 80% giá gốc.',
              'Đọc lại câu hỏi trước khi chọn phương án.',
            ],
            traps: [
              'Phương án 70 000 đồng là bẫy trả lời số tiền được giảm.',
              'Phương án 330 000 đồng là bẫy lấy 350 000 − 20.',
              'Phương án 420 000 đồng là bẫy cộng thay vì trừ.',
            ],
            tips: [
              'Dùng cách 80% để chỉ mất một phép tính.',
              'Ước lượng: giảm 20% thì giá còn khoảng bốn phần năm, tức khoảng 280 000 — loại ngay ba phương án còn lại.',
            ],
            transfer:
              'Dạng gần như chắc chắn có mặt trong đề vào 6, thường nằm ở nhóm câu dễ.',
          },
        },
        {
          id: 'l6-1-4',
          label: 'Phần I · Câu 4',
          points: 0.5,
          minutes: 2,
          strand: 'hinh-hoc',
          level: 2,
          format: 'trac-nghiem',
          topicIds: ['l6-hinh-hoc-tieu-hoc'],
          statement:
            'Một tấm bìa hình chữ nhật có chiều dài 18 cm, chiều rộng 12 cm. Người ta cắt bỏ ở một góc một hình vuông cạnh 5 cm. Tính diện tích phần bìa còn lại.',
          choices: ['216 cm²', '191 cm²', '211 cm²', '241 cm²'],
          correctIndex: 1,
          answer: '191 cm²',
          solution: [
            'Diện tích tấm bìa ban đầu: 18 × 12 = 216 cm².',
            'Diện tích hình vuông bị cắt: 5 × 5 = 25 cm².',
            'Diện tích phần còn lại: 216 − 25 = 191 cm².',
          ],
          barem: [{ item: 'Tính đúng diện tích phần còn lại là 191 cm²', point: 0.5 }],
          analysis: {
            dang: 'Diện tích hình ghép — lấy hình lớn trừ phần bị cắt',
            knowledge: [
              'Diện tích hình chữ nhật, diện tích hình vuông.',
              'Đơn vị đo diện tích.',
            ],
            docVi: [
              'Có chữ "cắt bỏ", "phần còn lại" — dấu hiệu của phép trừ diện tích.',
              'Phần bị cắt là một hình cơ bản, không cần chia nhỏ thêm.',
            ],
            method: [
              'Tính diện tích hình lớn.',
              'Tính diện tích phần bị cắt.',
              'Trừ hai diện tích, ghi đơn vị cm².',
            ],
            traps: [
              'Phương án 216 cm² là bẫy quên trừ phần bị cắt.',
              'Phương án 211 cm² là bẫy trừ độ dài cạnh (216 − 5) thay vì trừ diện tích.',
              'Phương án 241 cm² là bẫy cộng thay vì trừ.',
            ],
            tips: [
              'Vẽ nhanh hình ra nháp và tô phần bị cắt — mất 10 giây nhưng loại được mọi nhầm lẫn.',
              'Kiểm tra đơn vị: diện tích luôn là cm², không phải cm.',
            ],
            transfer:
              'Mô hình "lấy hình lớn trừ phần thừa" dùng lại được ở câu hình học tự luận Phần III.',
          },
        },
        {
          id: 'l6-1-5',
          label: 'Phần I · Câu 5',
          points: 0.5,
          minutes: 2,
          strand: 'thuc-te',
          level: 2,
          format: 'trac-nghiem',
          topicIds: ['l6-doc-hieu-du-lieu'],
          statement:
            'Bảng ghi số vé xem phim bán được trong 4 ngày: Thứ Hai 45 vé, Thứ Ba 52 vé, Thứ Tư 61 vé, Thứ Năm 62 vé. Hỏi trung bình mỗi ngày rạp bán được bao nhiêu vé?',
          choices: ['220 vé', '55 vé', '73 vé', '17 vé'],
          correctIndex: 1,
          answer: '55 vé',
          solution: [
            'Tổng số vé 4 ngày: 45 + 52 + 61 + 62 = 220 vé.',
            'Số ngày là 4.',
            'Trung bình mỗi ngày: 220 : 4 = 55 vé.',
          ],
          barem: [{ item: 'Tính đúng trung bình mỗi ngày là 55 vé', point: 0.5 }],
          analysis: {
            dang: 'Đọc bảng số liệu và tính trung bình cộng',
            knowledge: ['Trung bình cộng của nhiều số.', 'Đọc số liệu theo dòng và cột.'],
            docVi: [
              'Có bảng hoặc danh sách số liệu.',
              'Câu hỏi có chữ "trung bình mỗi ngày".',
            ],
            method: [
              'Đọc câu hỏi trước, rồi mới đọc bảng.',
              'Cộng đủ tất cả các số liệu, đếm lại số cột.',
              'Chia cho đúng số ngày.',
            ],
            traps: [
              'Phương án 220 vé là bẫy trả lời tổng thay vì trung bình.',
              'Phương án 73 vé là bẫy chia cho 3 vì đếm sót một ngày.',
              'Phương án 17 vé là bẫy lấy hiệu số lớn nhất và nhỏ nhất.',
            ],
            tips: [
              'Kiểm tra hợp lý: trung bình phải nằm giữa 45 và 62.',
              'Dùng ngón tay dò từng cột để không bỏ sót.',
            ],
            transfer:
              'Nhóm câu đọc hiểu dữ liệu đang tăng dần trong các bài đánh giá năng lực.',
          },
        },
        {
          id: 'l6-1-6',
          label: 'Phần I · Câu 6',
          points: 0.5,
          minutes: 2,
          strand: 'hinh-hoc',
          level: 3,
          format: 'trac-nghiem',
          topicIds: ['l6-hinh-hoc-tieu-hoc'],
          statement:
            'Một bể nước dạng hình hộp chữ nhật không nắp có chiều dài 20 dm, chiều rộng 10 dm, chiều cao 8 dm. Người ta quét sơn toàn bộ mặt trong của bể. Tính diện tích cần quét sơn.',
          choices: ['480 dm²', '680 dm²', '880 dm²', '1600 dm²'],
          correctIndex: 1,
          answer: '680 dm²',
          solution: [
            'Bể không nắp nên chỉ quét bốn mặt xung quanh và một mặt đáy.',
            'Chu vi đáy: (20 + 10) × 2 = 60 dm.',
            'Diện tích xung quanh: 60 × 8 = 480 dm².',
            'Diện tích đáy: 20 × 10 = 200 dm².',
            'Diện tích cần quét sơn: 480 + 200 = 680 dm².',
          ],
          barem: [{ item: 'Tính đúng diện tích quét sơn là 680 dm²', point: 0.5 }],
          analysis: {
            dang: 'Diện tích xung quanh và đáy của hình hộp không nắp',
            knowledge: [
              'Diện tích xung quanh = chu vi đáy × chiều cao.',
              'Diện tích đáy hình chữ nhật.',
              'Phân biệt diện tích với thể tích.',
            ],
            docVi: [
              'Cụm từ "không nắp" là chi tiết quyết định của cả câu.',
              '"Quét sơn" là dấu hiệu tính diện tích, không phải thể tích.',
            ],
            method: [
              'Gạch chân chữ "không nắp" và đếm xem phải tính mấy mặt.',
              'Tính chu vi đáy trước.',
              'Tính diện tích xung quanh, rồi cộng một mặt đáy.',
            ],
            traps: [
              'Phương án 880 dm² là bẫy tính cả nắp.',
              'Phương án 480 dm² là bẫy quên mặt đáy.',
              'Phương án 1600 dm² là bẫy tính thể tích thay vì diện tích.',
            ],
            tips: [
              'Đọc đề là nói ngay "phải tính 5 mặt" trước khi viết công thức.',
              'Ghi đơn vị dm² ngay từ dòng đầu để không lẫn với dm³.',
            ],
            transfer:
              'Điểm rơi của dạng này luôn nằm ở chi tiết cấu trúc, không ở phép tính.',
          },
        },
        {
          id: 'l6-1-7',
          label: 'Phần I · Câu 7',
          points: 0.5,
          minutes: 2,
          strand: 'to-hop',
          level: 3,
          format: 'trac-nghiem',
          topicIds: ['l6-day-so-quy-luat'],
          statement: 'Cho dãy số 5; 9; 13; 17; … Hỏi số hạng thứ 25 của dãy là số nào?',
          choices: ['100', '101', '105', '97'],
          correctIndex: 1,
          answer: '101',
          solution: [
            'Mỗi số hơn số liền trước 4 đơn vị, nên đây là dãy cách đều với khoảng cách 4.',
            'Từ số hạng thứ nhất đến số hạng thứ 25 phải cộng thêm 4 tất cả 25 − 1 = 24 lần.',
            'Số hạng thứ 25 = 5 + 24 × 4 = 5 + 96 = 101.',
          ],
          barem: [{ item: 'Tính đúng số hạng thứ 25 là 101', point: 0.5 }],
          analysis: {
            dang: 'Số hạng thứ n của dãy cách đều',
            knowledge: [
              'Nhận biết dãy cách đều qua hiệu hai số hạng liên tiếp.',
              'Công thức số hạng thứ n = số đầu + (n − 1) × khoảng cách.',
            ],
            docVi: [
              'Dãy cho vài số hạng đầu rồi có dấu ba chấm.',
              'Hiệu giữa các số hạng liên tiếp luôn bằng nhau.',
            ],
            method: [
              'Tính hiệu để xác nhận dãy cách đều.',
              'Áp dụng công thức, nhớ trừ 1.',
              'Thử lại công thức với số hạng thứ 2 hoặc thứ 3 đã biết.',
            ],
            traps: [
              'Phương án 105 là bẫy quên trừ 1, tính thành 5 + 25 × 4.',
              'Phương án 97 là bẫy trừ 2 thay vì trừ 1.',
              'Phương án 100 là bẫy lấy 25 × 4.',
            ],
            tips: [
              'Thử với n = 2: 5 + 1 × 4 = 9 ✓ — công thức đúng thì mới thay n = 25.',
              'Với dãy cách đều, đáp án luôn có cùng "phần dư" khi chia cho khoảng cách.',
            ],
            transfer:
              'Nền của câu tính tổng dãy ở Phần III, nơi cần thêm công thức số số hạng.',
          },
        },
        {
          id: 'l6-1-8',
          label: 'Phần I · Câu 8',
          points: 0.5,
          minutes: 2,
          strand: 'dai-so',
          level: 2,
          format: 'trac-nghiem',
          topicIds: ['l6-toan-tinh-nguoc'],
          statement:
            'Một số đem nhân với 4, rồi trừ đi 7 thì được 45. Tìm số đó.',
          choices: ['13', '52', '9,5', '208'],
          correctIndex: 0,
          answer: '13',
          solution: [
            'Đi ngược từ kết quả về đầu.',
            'Đề trừ đi 7 được 45, nên trước khi trừ số đó là 45 + 7 = 52.',
            'Đề nhân với 4 được 52, nên số ban đầu là 52 : 4 = 13.',
            'Thử lại theo chiều xuôi: 13 × 4 = 52; 52 − 7 = 45 ✓.',
          ],
          barem: [{ item: 'Tính ngược đúng và tìm được số 13', point: 0.5 }],
          analysis: {
            dang: 'Tìm số ban đầu bằng cách tính ngược',
            knowledge: [
              'Phép tính ngược: nhân ↔ chia, cộng ↔ trừ.',
              'Thứ tự thực hiện phép tính.',
            ],
            docVi: [
              'Đề mô tả một chuỗi phép tính rồi cho kết quả cuối.',
              'Từ khoá: "một số", "đem nhân", "rồi trừ", "thì được".',
            ],
            method: [
              'Viết lại chuỗi phép tính theo thứ tự trong đề.',
              'Đi ngược từ kết quả, mỗi bước làm phép ngược lại.',
              'Thử lại theo chiều xuôi.',
            ],
            traps: [
              'Phương án 52 là bẫy dừng lại ở bước trung gian.',
              'Phương án 9,5 là bẫy làm đúng chiều xuôi ((45 − 7) : 4).',
              'Phương án 208 là bẫy nhân thay vì chia ở bước cuối.',
            ],
            tips: [
              'Xử lý phép cuối cùng trước — đây là quy tắc chắc chắn của tính ngược.',
              'Luôn dành 10 giây thử lại; câu này thử lại rất nhanh.',
            ],
            transfer:
              'Là cách thay cho giải phương trình ở bậc tiểu học, dùng lại ở Phần II.',
          },
        },
      ],
    },
    {
      label: 'Phần II · Trả lời ngắn',
      points: 3,
      note: '4 câu, mỗi câu 0,75 điểm. Chỉ ghi đáp số kèm đơn vị, không cần trình bày lời giải.',
      items: [
        {
          id: 'l6-2-1',
          label: 'Phần II · Câu 1',
          points: 0.75,
          minutes: 3,
          strand: 'thuc-te',
          level: 2,
          format: 'tra-loi-ngan',
          topicIds: ['l6-toan-chuyen-dong'],
          statement:
            'Hai thành phố A và B cách nhau 210 km. Cùng một lúc, một xe máy đi từ A với vận tốc 40 km/giờ và một ô tô đi từ B với vận tốc 30 km/giờ, hai xe đi ngược chiều để gặp nhau. Hỏi sau bao lâu hai xe gặp nhau?',
          answer: '3 giờ',
          solution: [
            'Vẽ sơ đồ đoạn thẳng với hai mũi tên hướng vào nhau.',
            'Vì đi ngược chiều nên mỗi giờ khoảng cách giữa hai xe giảm 40 + 30 = 70 km.',
            'Thời gian gặp nhau: 210 : 70 = 3 giờ.',
            'Kiểm tra: xe máy đi 40 × 3 = 120 km, ô tô đi 30 × 3 = 90 km, cộng lại đúng 210 km ✓.',
          ],
          barem: [
            { item: 'Tính đúng tổng vận tốc 70 km/giờ', point: 0.25 },
            { item: 'Lập đúng phép chia 210 : 70', point: 0.25 },
            { item: 'Đáp số 3 giờ, có đơn vị', point: 0.25 },
          ],
          analysis: {
            dang: 'Chuyển động ngược chiều gặp nhau',
            knowledge: [
              'Quan hệ s = v × t.',
              'Ngược chiều thì cộng vận tốc.',
            ],
            docVi: [
              '"Cùng một lúc" và "đi ngược chiều" là hai từ khoá quyết định.',
              'Đề cho khoảng cách ban đầu và hai vận tốc.',
            ],
            method: [
              'Vẽ sơ đồ hai mũi tên hướng vào nhau.',
              'Cộng hai vận tốc.',
              'Chia quãng đường cho tổng vận tốc.',
              'Kiểm tra bằng tổng hai quãng đường đi được.',
            ],
            traps: [
              'Trừ vận tốc vì nhớ nhầm sang dạng đuổi kịp.',
              'Trả lời "lúc mấy giờ" trong khi đề hỏi "sau bao lâu", hoặc ngược lại.',
              'Quên đơn vị giờ.',
            ],
            tips: [
              'Sơ đồ mũi tên là cách nhớ chắc nhất, chắc hơn học thuộc công thức.',
              'Ở phần trả lời ngắn không có phương án để loại trừ, nên bắt buộc thử lại.',
            ],
            transfer:
              'Một trong ba mô hình chuyển động chuẩn, xuất hiện đều trong đề vào 6.',
          },
        },
        {
          id: 'l6-2-2',
          label: 'Phần II · Câu 2',
          points: 0.75,
          minutes: 3,
          strand: 'thuc-te',
          level: 3,
          format: 'tra-loi-ngan',
          topicIds: ['l6-toan-chuyen-dong'],
          statement:
            'Một xe máy đi với vận tốc 40 km/giờ. Khi xe máy đã đi được 30 km thì một ô tô xuất phát từ cùng điểm, đi cùng chiều với vận tốc 60 km/giờ. Hỏi sau bao lâu ô tô đuổi kịp xe máy?',
          answer: '1,5 giờ (tức 1 giờ 30 phút)',
          solution: [
            'Vẽ sơ đồ hai mũi tên cùng hướng, ô tô ở phía sau xe máy 30 km.',
            'Vì đi cùng chiều nên mỗi giờ ô tô rút ngắn được 60 − 40 = 20 km.',
            'Thời gian đuổi kịp: 30 : 20 = 1,5 giờ.',
            'Kiểm tra: trong 1,5 giờ ô tô đi 90 km; xe máy đi thêm 60 km, cộng với 30 km đi trước là 90 km ✓.',
          ],
          barem: [
            { item: 'Tính đúng hiệu vận tốc 20 km/giờ', point: 0.25 },
            { item: 'Lập đúng phép chia 30 : 20', point: 0.25 },
            { item: 'Đáp số 1,5 giờ hoặc 1 giờ 30 phút, có đơn vị', point: 0.25 },
          ],
          analysis: {
            dang: 'Chuyển động cùng chiều đuổi kịp',
            knowledge: ['Quan hệ s = v × t.', 'Cùng chiều thì trừ vận tốc.'],
            docVi: [
              '"Cùng chiều" và "đã đi được 30 km" cho biết khoảng cách ban đầu.',
              'Xe xuất phát sau phải có vận tốc lớn hơn thì mới đuổi kịp.',
            ],
            method: [
              'Vẽ sơ đồ hai mũi tên cùng hướng.',
              'Xác định khoảng cách ban đầu giữa hai xe.',
              'Tính hiệu vận tốc.',
              'Chia khoảng cách cho hiệu vận tốc.',
            ],
            traps: [
              'Cộng vận tốc vì nhớ nhầm sang dạng gặp nhau.',
              'Chia cho vận tốc ô tô thay vì cho hiệu vận tốc.',
              'Ghi 1,5 giờ nhưng đọc nhầm thành 1 giờ 50 phút.',
            ],
            tips: [
              'Nhớ theo sơ đồ: hai mũi tên hướng vào nhau thì cộng, cùng hướng thì trừ.',
              '0,5 giờ là 30 phút, không phải 50 phút.',
            ],
            transfer:
              'Câu chuyển động khó hơn một bậc, thường nằm ở nửa sau của đề.',
          },
        },
        {
          id: 'l6-2-3',
          label: 'Phần II · Câu 3',
          points: 0.75,
          minutes: 3,
          strand: 'thuc-te',
          level: 3,
          format: 'tra-loi-ngan',
          topicIds: ['l6-toan-chuyen-dong'],
          statement:
            'Một ca nô đi xuôi dòng với vận tốc 27 km/giờ và đi ngược dòng với vận tốc 21 km/giờ. Tính vận tốc của dòng nước.',
          answer: '3 km/giờ',
          solution: [
            'Vận tốc xuôi dòng = vận tốc thực + vận tốc dòng nước.',
            'Vận tốc ngược dòng = vận tốc thực − vận tốc dòng nước.',
            'Lấy hiệu: 27 − 21 = 6, và hiệu này bằng 2 lần vận tốc dòng nước.',
            'Vận tốc dòng nước: 6 : 2 = 3 km/giờ.',
            'Kiểm tra: vận tốc thực = (27 + 21) : 2 = 24 km/giờ; 24 + 3 = 27 ✓ và 24 − 3 = 21 ✓.',
          ],
          barem: [
            { item: 'Viết đúng hai quan hệ xuôi dòng và ngược dòng', point: 0.25 },
            { item: 'Lấy hiệu và chia đôi', point: 0.25 },
            { item: 'Đáp số 3 km/giờ, có đơn vị', point: 0.25 },
          ],
          analysis: {
            dang: 'Chuyển động trên dòng nước',
            knowledge: [
              'v xuôi = v thực + v dòng; v ngược = v thực − v dòng.',
              'Bài toán tổng – hiệu.',
            ],
            docVi: [
              'Có ca nô, thuyền, bè và các từ xuôi dòng, ngược dòng.',
              'Đề cho hai vận tốc, hỏi một trong hai thành phần.',
            ],
            method: [
              'Ghi hai quan hệ nền ra nháp trước khi nhìn số.',
              'Hiệu hai vận tốc = 2 lần vận tốc dòng nước.',
              'Tổng hai vận tốc = 2 lần vận tốc thực.',
              'Chia đôi để lấy đại lượng đề hỏi.',
            ],
            traps: [
              'Lấy tổng chia đôi rồi trả lời là vận tốc dòng nước (ra 24, sai).',
              'Quên chia đôi sau khi lấy hiệu (ra 6, sai).',
              'Dùng vận tốc thực để tính quãng đường xuôi dòng ở các câu tiếp theo.',
            ],
            tips: [
              'Nhớ: hiệu cho dòng nước, tổng cho ca nô.',
              'Luôn thử lại bằng cách cộng và trừ để xem có ra đúng hai vận tốc đề cho không.',
            ],
            transfer:
              'Mô hình chuyển động thứ ba; thường chỉ một câu nhưng gần như đề nào cũng có.',
          },
        },
        {
          id: 'l6-2-4',
          label: 'Phần II · Câu 4',
          points: 0.75,
          minutes: 3,
          strand: 'thuc-te',
          level: 3,
          format: 'tra-loi-ngan',
          topicIds: ['l6-doc-hieu-du-lieu', 'l6-phan-so-thap-phan'],
          statement:
            'Một cửa hàng có 360 kg gạo. Ngày đầu bán được 2/5 số gạo, ngày thứ hai bán được 1/3 số gạo còn lại sau ngày đầu. Hỏi sau hai ngày cửa hàng còn lại bao nhiêu ki-lô-gam gạo?',
          answer: '144 kg',
          solution: [
            'Ngày đầu bán: 360 × 2 : 5 = 144 kg.',
            'Sau ngày đầu còn lại: 360 − 144 = 216 kg.',
            'Ngày thứ hai bán 1/3 của 216 kg (không phải của 360 kg): 216 : 3 = 72 kg.',
            'Sau hai ngày còn lại: 216 − 72 = 144 kg.',
          ],
          barem: [
            { item: 'Tính đúng số gạo còn lại sau ngày đầu là 216 kg', point: 0.25 },
            { item: 'Lấy 1/3 của 216 kg chứ không phải của 360 kg', point: 0.25 },
            { item: 'Đáp số 144 kg, có đơn vị', point: 0.25 },
          ],
          analysis: {
            dang: 'Toán có lời văn nhiều bước với phân số của số còn lại',
            knowledge: [
              'Tìm phân số của một số.',
              'Phân biệt "của tổng" và "của số còn lại".',
            ],
            docVi: [
              'Cụm từ "số gạo còn lại" là chi tiết quyết định của cả bài.',
              'Có từ hai mốc thời gian trở lên.',
            ],
            method: [
              'Chia bài thành từng bước theo trình tự thời gian.',
              'Ở mỗi bước, hỏi "phân số này là của số nào".',
              'Ghi kết quả trung gian ra nháp.',
              'Đọc lại câu hỏi trước khi ghi đáp số.',
            ],
            traps: [
              'Lấy 1/3 của 360 kg thay vì của 216 kg.',
              'Cộng thẳng 2/5 + 1/3 rồi trừ một lần, ra 96 kg — sai vì hai phân số tính trên hai số khác nhau.',
              'Dừng ở 216 kg, tức trả lời số còn lại sau ngày đầu.',
            ],
            tips: [
              'Gạch chân chữ "còn lại" ngay khi đọc đề.',
              'Trùng hợp thú vị của bài này: số gạo bán ngày đầu và số gạo còn lại cuối cùng đều là 144 kg — đừng để điều đó làm bạn nghĩ mình chép nhầm.',
            ],
            transfer:
              'Dạng chiếm nhiều điểm nhất của đề vào 6, và cũng mất điểm oan nhiều nhất.',
          },
        },
      ],
    },
    {
      label: 'Phần III · Tự luận',
      points: 3,
      note: '3 câu, mỗi câu 1,0 điểm. Trình bày lời giải có câu trả lời đầy đủ.',
      items: [
        {
          id: 'l6-3-1',
          label: 'Phần III · Câu 1',
          points: 1,
          minutes: 5,
          strand: 'dai-so',
          level: 3,
          format: 'tu-luan',
          topicIds: ['l6-toan-tinh-nguoc'],
          statement:
            'Hai lớp 5A và 5B góp được tất cả 240 quyển vở tặng bạn vùng lũ. Số vở của lớp 5A bằng 3/5 số vở của lớp 5B. Hỏi mỗi lớp góp được bao nhiêu quyển vở?',
          answer: 'Lớp 5A: 90 quyển; lớp 5B: 150 quyển',
          solution: [
            'Vẽ sơ đồ: lớp 5A là 3 phần bằng nhau, lớp 5B là 5 phần như thế.',
            'Tổng số phần bằng nhau: 3 + 5 = 8 (phần).',
            'Giá trị một phần: 240 : 8 = 30 (quyển).',
            'Số vở lớp 5A: 30 × 3 = 90 (quyển).',
            'Số vở lớp 5B: 240 − 90 = 150 (quyển).',
            'Đáp số: lớp 5A 90 quyển, lớp 5B 150 quyển.',
          ],
          barem: [
            { item: 'Vẽ sơ đồ hoặc nêu đúng số phần của mỗi lớp', point: 0.25 },
            { item: 'Tính đúng tổng số phần và giá trị một phần', point: 0.25 },
            { item: 'Tính đúng số vở của cả hai lớp', point: 0.25 },
            { item: 'Trình bày có câu lời giải và ghi đáp số đầy đủ', point: 0.25 },
          ],
          analysis: {
            dang: 'Bài toán tổng và tỉ số',
            knowledge: [
              'Sơ đồ đoạn thẳng.',
              'Tìm giá trị một phần từ tổng và tổng số phần.',
            ],
            docVi: [
              'Đề cho tổng của hai đại lượng.',
              'Đề cho tỉ số giữa chúng dưới dạng phân số hoặc "gấp mấy lần".',
            ],
            method: [
              'Vẽ sơ đồ đoạn thẳng cho hai đại lượng.',
              'Tính tổng số phần.',
              'Tính giá trị một phần.',
              'Nhân ra từng đại lượng, thử lại bằng tổng.',
            ],
            traps: [
              'Trả lời giá trị một phần (30) thay vì số vở của lớp.',
              'Vẽ sơ đồ ngược: gán 5 phần cho lớp 5A.',
              'Chỉ tính một lớp trong khi đề hỏi cả hai.',
              'Thiếu câu lời giải nên bị trừ điểm trình bày.',
            ],
            tips: [
              'Ở tự luận tiểu học, mỗi phép tính phải có một câu lời giải đi kèm.',
              'Cộng hai kết quả để tự kiểm tra trước khi ghi đáp số.',
            ],
            transfer:
              'Nhóm bài toán điển hình lớp 4 – 5, gần như luôn có mặt dưới một lớp vỏ tình huống mới.',
          },
        },
        {
          id: 'l6-3-2',
          label: 'Phần III · Câu 2',
          points: 1,
          minutes: 5,
          strand: 'to-hop',
          level: 4,
          format: 'tu-luan',
          topicIds: ['l6-day-so-quy-luat'],
          statement: 'Tính tổng của dãy số: 2 + 5 + 8 + 11 + … + 101.',
          answer: '1751',
          solution: [
            'Mỗi số hơn số liền trước 3 đơn vị nên đây là dãy cách đều với khoảng cách 3.',
            'Số số hạng: (101 − 2) : 3 + 1 = 99 : 3 + 1 = 33 + 1 = 34 (số hạng).',
            'Tổng của dãy cách đều: (số đầu + số cuối) × số số hạng : 2.',
            'Tổng = (2 + 101) × 34 : 2 = 103 × 17 = 1751.',
            'Đáp số: 1751.',
          ],
          barem: [
            { item: 'Nhận ra dãy cách đều và nêu đúng khoảng cách 3', point: 0.25 },
            { item: 'Tính đúng số số hạng là 34', point: 0.25 },
            { item: 'Viết đúng công thức tính tổng dãy cách đều', point: 0.25 },
            { item: 'Tính đúng tổng 1751 và ghi đáp số', point: 0.25 },
          ],
          analysis: {
            dang: 'Tổng của dãy số cách đều',
            knowledge: [
              'Số số hạng = (số cuối − số đầu) : khoảng cách + 1.',
              'Tổng = (số đầu + số cuối) × số số hạng : 2.',
            ],
            docVi: [
              'Dãy cho số đầu, vài số hạng và số cuối, ở giữa là dấu ba chấm.',
              'Hiệu giữa các số hạng liên tiếp không đổi.',
            ],
            method: [
              'Tính hiệu để xác nhận dãy cách đều.',
              'Tính số số hạng — nhớ cộng 1.',
              'Áp dụng công thức tổng.',
              'Ước lượng để kiểm tra: tổng phải xấp xỉ số hạng trung bình nhân số số hạng.',
            ],
            traps: [
              'Quên cộng 1 khi đếm số số hạng, ra 33 và tổng sai.',
              'Nhân (2 + 101) với 34 rồi quên chia 2.',
              'Kết luận khoảng cách sai vì chỉ nhìn hai số hạng đầu.',
            ],
            tips: [
              'Kiểm tra nhanh: số hạng trung bình là (2 + 101) : 2 = 51,5; nhân 34 được 1751 ✓.',
              'Ghi rõ hai công thức ra nháp trước khi thay số.',
            ],
            transfer:
              'Câu quen thuộc của nhóm quy luật; làm nhanh được sẽ dành thời gian cho câu suy luận cuối.',
          },
        },
        {
          id: 'l6-3-3',
          label: 'Phần III · Câu 3',
          points: 1,
          minutes: 5,
          strand: 'to-hop',
          level: 4,
          format: 'tu-luan',
          topicIds: ['l6-suy-luan-logic'],
          statement:
            'Bốn bạn An, Bình, Chi, Dũng mỗi bạn thích đúng một môn khác nhau trong bốn môn: bóng đá, cờ vua, vẽ tranh, bơi lội. Biết rằng: Bình thích cờ vua; Chi thích bơi lội; An không thích vẽ tranh. Hỏi mỗi bạn thích môn nào?',
          answer: 'An thích bóng đá; Bình thích cờ vua; Chi thích bơi lội; Dũng thích vẽ tranh',
          solution: [
            'Kẻ bảng 4 hàng (bốn bạn) × 4 cột (bốn môn).',
            'Từ dữ kiện "Bình thích cờ vua": đánh ✓ vào ô Bình – cờ vua, loại cả hàng Bình và cả cột cờ vua.',
            'Từ dữ kiện "Chi thích bơi lội": đánh ✓ vào ô Chi – bơi lội, loại cả hàng Chi và cả cột bơi lội.',
            'Sau hai bước trên, An và Dũng chỉ còn hai môn là bóng đá và vẽ tranh.',
            'Từ dữ kiện "An không thích vẽ tranh": loại ô An – vẽ tranh, nên An thích bóng đá.',
            'Môn còn lại là vẽ tranh, thuộc về Dũng.',
            'Đáp số: An – bóng đá; Bình – cờ vua; Chi – bơi lội; Dũng – vẽ tranh.',
          ],
          barem: [
            { item: 'Lập được bảng hoặc trình bày lập luận có hệ thống', point: 0.25 },
            { item: 'Dùng đúng hai dữ kiện khẳng định để loại hàng và cột', point: 0.25 },
            { item: 'Dùng đúng dữ kiện phủ định để xác định An thích bóng đá', point: 0.25 },
            { item: 'Kết luận đầy đủ cho cả bốn bạn', point: 0.25 },
          ],
          analysis: {
            dang: 'Suy luận logic bằng bảng đúng/sai',
            knowledge: [
              'Nguyên tắc bảng: mỗi hàng và mỗi cột chỉ có đúng một dấu ✓.',
              'Phép loại trừ có ghi chép.',
            ],
            docVi: [
              'Có một nhóm người và một nhóm thuộc tính, số lượng bằng nhau.',
              'Dữ kiện gồm cả câu khẳng định và câu phủ định.',
            ],
            method: [
              'Kẻ bảng ra nháp, không suy luận trong đầu.',
              'Bắt đầu từ dữ kiện chắc chắn nhất, không nhất thiết là dữ kiện đầu tiên.',
              'Mỗi khẳng định: đánh ✓ rồi loại cả hàng và cả cột.',
              'Mỗi phủ định: đánh ✗ vào đúng một ô.',
              'Kiểm tra đã dùng hết dữ kiện chưa trước khi kết luận.',
            ],
            traps: [
              'Đọc "An không thích vẽ tranh" thành "An thích vẽ tranh".',
              'Kết luận cho một bạn rồi quên trả lời cả bốn bạn — đề hỏi "mỗi bạn".',
              'Tốn quá nhiều thời gian vì không kẻ bảng.',
            ],
            tips: [
              'Bảng 4 × 4 chỉ mất 15 giây để kẻ nhưng tiết kiệm vài phút suy luận.',
              'Ở tự luận, hãy viết ra vài dòng lập luận chứ không chỉ ghi đáp số — barem chấm theo bước.',
            ],
            transfer:
              'Câu phân hoá đặc trưng của đề đánh giá năng lực: không cần kiến thức mới, chỉ cần cách nghĩ có hệ thống.',
          },
        },
      ],
    },
  ],
  gradingNotes: [
    'Phần I chấm theo phương án chọn, không cho điểm từng phần.',
    'Phần II chỉ chấm đáp số, nhưng đáp số thiếu đơn vị bị trừ 0,25 điểm của câu đó.',
    'Phần III bắt buộc có câu lời giải cho mỗi phép tính theo chuẩn trình bày tiểu học; thiếu câu lời giải trừ 0,25 điểm.',
    'Học sinh có cách giải khác đúng vẫn cho điểm tối đa theo các mốc tương ứng của barem.',
    'Không trừ điểm vì trình bày tắt ở Phần II, vì phần này chỉ yêu cầu đáp số.',
  ],
  timePlan: [
    { phase: 'Đọc lướt toàn đề', minutes: '0–2', action: 'Xem có bao nhiêu câu, câu nào dài nhất, ước lượng thứ tự làm.' },
    { phase: 'Phần I', minutes: '2–18', action: 'Làm nhanh; câu nào quá 2 phút thì khoanh lại, bỏ qua.' },
    { phase: 'Phần II', minutes: '18–30', action: 'Vẽ sơ đồ cho mọi bài chuyển động; thử lại từng đáp số.' },
    { phase: 'Phần III', minutes: '30–42', action: 'Trình bày đủ câu lời giải; câu suy luận kẻ bảng ra nháp.' },
    { phase: 'Quay lại & soát', minutes: '42–45', action: 'Làm nốt câu đã khoanh, đọc lại câu hỏi của từng bài, kiểm tra đơn vị.' },
  ],
  scoreBands: [
    {
      band: 'Dưới 5,0',
      meaning: 'Nền bốn phép tính và đọc đề chưa vững, chưa nên luyện đề dày.',
      next: 'Quay về Giai đoạn 1: phân số, số thập phân, tỉ số phần trăm; mỗi buổi 20 phút tính nhẩm.',
    },
    {
      band: '5,0 – 6,5',
      meaning: 'Làm được câu cơ bản, mất điểm ở Phần II vì đọc đề vội hoặc quên thử lại.',
      next: 'Tập trung Giai đoạn 2: ba mô hình chuyển động và toán tính ngược; lập sổ tay lỗi.',
    },
    {
      band: '6,5 – 8,0',
      meaning: 'Đã chắc hai phần đầu, còn để mất điểm ở nhóm câu suy luận và quy luật.',
      next: 'Vào Giai đoạn 3: mỗi tuần 5 bài bảng đúng/sai và 5 bài dãy số, ưu tiên tốc độ kẻ bảng.',
    },
    {
      band: 'Trên 8,0',
      meaning: 'Nền tốt. Khoảng cách còn lại là tốc độ và độ chính xác dưới áp lực thời gian.',
      next: 'Giai đoạn 4: mỗi tuần hai đề tính giờ đủ 45 phút, chấm theo barem thật, ghi lại mọi câu sai.',
    },
  ],
};
