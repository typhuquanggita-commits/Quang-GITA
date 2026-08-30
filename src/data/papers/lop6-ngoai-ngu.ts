import type { ExamPaper } from '@/types';

/**
 * ĐỀ MẪU 09 — Toán, bài đánh giá năng lực vào lớp 6 THCS Ngoại ngữ.
 * Bám sát ma trận bp-lop6-ngoai-ngu: 45 phút · thang 10 · 3 phần · 16 câu.
 *
 * Đề do MATH365 biên soạn theo đặc điểm được ghi nhận của kỳ thi (nhẹ tính
 * toán, nặng đọc hiểu và suy luận). KHÔNG phải đề thật, cũng không phải cấu
 * trúc chính thức được trường công bố.
 */
export const PAPER_LOP6_NN_01: ExamPaper = {
  id: 'dm-lop6-nn-01',
  code: 'M365-L6-NN-01',
  blueprintId: 'bp-lop6-ngoai-ngu',
  schoolId: 'lop6-ngoai-ngu',
  track: 'lop6',
  title: 'Đề mẫu 09 · Toán đánh giá năng lực vào lớp 6 THCS Ngoại ngữ',
  subtitle: '45 phút · thang điểm 10 · 7 câu đọc hiểu, 5 câu lời văn, 4 câu suy luận',
  minutes: 45,
  totalPoints: 10,
  fidelity: [
    'Đúng ba phần và đúng tỉ trọng điểm của ma trận: 3,5 – 3,5 – 3,0.',
    'Tỉ trọng nghiêng về đọc hiểu và suy luận đúng như đặc điểm của kỳ thi này: không có câu nào chỉ để kiểm tra kỹ năng tính toán thuần tuý.',
    'Mọi câu đều nằm trong chương trình tiểu học; không dùng công cụ của cấp hai.',
    'Tổng thời gian đề nghị cho các câu là 41 phút, chừa 4 phút đọc đề và soát bài.',
    'KHÔNG sao chép đề của trường. Cấu trúc thật do trường công bố lại theo từng năm.',
  ],
  parts: [
    {
      label: 'Phần I · Đọc hiểu & tính toán cơ bản',
      points: 3.5,
      note: '7 câu trắc nghiệm, mỗi câu 0,5 điểm.',
      items: [
        {
          id: 'nn-1-1',
          label: 'Phần I · Câu 1',
          points: 0.5,
          minutes: 2,
          strand: 'thuc-te',
          level: 2,
          format: 'trac-nghiem',
          topicIds: ['l6-doc-hieu-du-lieu'],
          statement:
            'Bảng ghi số sách quyên góp của bốn lớp: 5A 32 quyển, 5B 28 quyển, 5C 35 quyển, 5D 25 quyển. Hỏi lớp 5C quyên góp nhiều hơn mức trung bình của bốn lớp bao nhiêu quyển?',
          choices: ['3 quyển', '5 quyển', '7 quyển', '10 quyển'],
          correctIndex: 1,
          answer: '5 quyển',
          solution: [
            'Tổng số sách: 32 + 28 + 35 + 25 = 120 quyển.',
            'Trung bình mỗi lớp: 120 : 4 = 30 quyển.',
            'Lớp 5C nhiều hơn mức trung bình: 35 − 30 = 5 quyển.',
          ],
          barem: [{ item: 'Tính đúng trung bình 30 quyển và hiệu 5 quyển', point: 0.5 }],
          analysis: {
            dang: 'Đọc bảng số liệu và so sánh với trung bình cộng',
            knowledge: ['Trung bình cộng.', 'So sánh hai số.'],
            docVi: [
              'Có bảng số liệu và câu hỏi so sánh một giá trị với mức trung bình.',
              'Câu hỏi có hai bước: tính trung bình rồi mới trừ.',
            ],
            method: [
              'Đọc câu hỏi trước để biết cần hai bước.',
              'Cộng đủ bốn số, chia cho 4.',
              'Lấy giá trị của lớp được hỏi trừ mức trung bình.',
            ],
            traps: [
              'Phương án 10 quyển là bẫy lấy hiệu số lớn nhất và nhỏ nhất.',
              'Trả lời luôn mức trung bình 30 quyển.',
              'Đếm sót một lớp nên chia cho 3.',
            ],
            tips: [
              'Kiểm tra: trung bình phải nằm giữa 25 và 35.',
              'Bài hai bước thì viết cả hai bước ra nháp, đừng nhẩm hết trong đầu.',
            ],
            transfer: 'Dạng đọc hiểu dữ liệu chiếm tỉ trọng lớn nhất ở phần đầu của đề này.',
          },
        },
        {
          id: 'nn-1-2',
          label: 'Phần I · Câu 2',
          points: 0.5,
          minutes: 2,
          strand: 'so-hoc',
          level: 1,
          format: 'trac-nghiem',
          topicIds: ['l6-phan-so-thap-phan'],
          statement: 'Kết quả của phép tính 5/6 − 3/8 là:',
          choices: ['2/2', '11/24', '2/24', '1/3'],
          correctIndex: 1,
          answer: '11/24',
          solution: [
            'Mẫu chung nhỏ nhất của 6 và 8 là 24.',
            '5/6 = 20/24 và 3/8 = 9/24.',
            'Trừ hai tử: 20 − 9 = 11, được 11/24.',
          ],
          barem: [{ item: 'Quy đồng đúng và trừ đúng, kết quả 11/24', point: 0.5 }],
          analysis: {
            dang: 'Trừ hai phân số khác mẫu',
            knowledge: ['Bội chung nhỏ nhất.', 'Quy tắc trừ phân số cùng mẫu.'],
            docVi: ['Chỉ có phép tính, không lời văn — câu lấy điểm.'],
            method: [
              'Tìm mẫu chung nhỏ nhất (24, không phải 48).',
              'Quy đồng cả tử lẫn mẫu.',
              'Trừ tử, giữ mẫu, rồi rút gọn.',
            ],
            traps: [
              'Phương án 2/2 là bẫy trừ tử với tử và mẫu với mẫu.',
              'Phương án 2/24 là bẫy trừ tử nhưng giữ nguyên mẫu chưa quy đồng.',
            ],
            tips: [
              'Ước lượng: 5/6 gần 0,83 và 3/8 gần 0,38, hiệu phải khoảng 0,45 — chỉ 11/24 hợp lý.',
            ],
            transfer: 'Kỹ năng nền nằm bên trong mọi câu có lời văn ở Phần II.',
          },
        },
        {
          id: 'nn-1-3',
          label: 'Phần I · Câu 3',
          points: 0.5,
          minutes: 2,
          strand: 'so-hoc',
          level: 2,
          format: 'trac-nghiem',
          topicIds: ['l6-phan-so-thap-phan'],
          statement: 'Kết quả của phép tính 12,6 : 0,4 là:',
          choices: ['3,15', '31,5', '315', '5,04'],
          correctIndex: 1,
          answer: '31,5',
          solution: [
            'Nhân cả số bị chia và số chia với 10 để số chia thành số tự nhiên: 126 : 4.',
            '126 : 4 = 31,5.',
            'Kiểm tra: 31,5 × 0,4 = 12,6 ✓.',
          ],
          barem: [{ item: 'Chia đúng, kết quả 31,5', point: 0.5 }],
          analysis: {
            dang: 'Chia một số thập phân cho một số thập phân',
            knowledge: [
              'Nhân cả hai số với cùng một luỹ thừa của 10 thì thương không đổi.',
              'Chia số thập phân cho số tự nhiên.',
            ],
            docVi: ['Số chia là số thập phân — dấu hiệu phải dời dấu phẩy trước khi chia.'],
            method: [
              'Đếm số chữ số thập phân của số chia (ở đây là 1).',
              'Dời dấu phẩy của cả hai số sang phải đúng bấy nhiêu chữ số.',
              'Thực hiện phép chia, rồi thử lại bằng phép nhân.',
            ],
            traps: [
              'Phương án 3,15 và 315 là bẫy dời dấu phẩy sai số chữ số.',
              'Phương án 5,04 là bẫy nhân thay vì chia.',
            ],
            tips: [
              'Ước lượng trước: chia cho số nhỏ hơn 1 thì kết quả phải lớn hơn số bị chia — loại ngay 3,15 và 5,04.',
            ],
            transfer: 'Phép chia này xuất hiện trong hầu hết bài chuyển động có vận tốc lẻ.',
          },
        },
        {
          id: 'nn-1-4',
          label: 'Phần I · Câu 4',
          points: 0.5,
          minutes: 2,
          strand: 'so-hoc',
          level: 2,
          format: 'trac-nghiem',
          topicIds: ['l6-ti-so-phan-tram'],
          statement:
            'Lớp 5A có 40 học sinh, trong đó có 15 học sinh giỏi. Số học sinh giỏi chiếm bao nhiêu phần trăm số học sinh cả lớp?',
          choices: ['15%', '25%', '37,5%', '60%'],
          correctIndex: 2,
          answer: '37,5%',
          solution: [
            'Tỉ số phần trăm của 15 so với 40: 15 : 40 = 0,375.',
            'Đổi sang phần trăm: 0,375 × 100 = 37,5%.',
          ],
          barem: [{ item: 'Tính đúng tỉ số phần trăm là 37,5%', point: 0.5 }],
          analysis: {
            dang: 'Tìm tỉ số phần trăm của hai số',
            knowledge: ['Tỉ số phần trăm của a so với b bằng a : b × 100%.'],
            docVi: ['Câu hỏi có chữ "chiếm bao nhiêu phần trăm".', 'Đề cho phần và tổng.'],
            method: [
              'Xác định số nào là phần, số nào là tổng.',
              'Lấy phần chia cho tổng.',
              'Nhân 100 và thêm dấu %.',
            ],
            traps: [
              'Phương án 60% là bẫy đảo thứ tự, lấy 40 : 15 hoặc lấy phần còn lại.',
              'Phương án 15% là bẫy chép lại số học sinh giỏi.',
            ],
            tips: [
              'Ước lượng: 15 nhỏ hơn một nửa của 40 nên kết quả phải nhỏ hơn 50%.',
            ],
            transfer: 'Dạng gần như chắc chắn có mặt, thường nằm ở nhóm câu dễ.',
          },
        },
        {
          id: 'nn-1-5',
          label: 'Phần I · Câu 5',
          points: 0.5,
          minutes: 2,
          strand: 'so-hoc',
          level: 2,
          format: 'trac-nghiem',
          topicIds: ['l6-ti-so-phan-tram', 'l6-phan-so-thap-phan'],
          statement: 'Trong các số sau, số nào lớn nhất: 0,7 ; 3/5 ; 65% ; 0,68?',
          choices: ['0,7', '3/5', '65%', '0,68'],
          correctIndex: 0,
          answer: '0,7',
          solution: [
            'Đưa tất cả về cùng một dạng, chọn dạng phần trăm cho dễ so sánh.',
            '0,7 = 70%; 3/5 = 0,6 = 60%; 65% giữ nguyên; 0,68 = 68%.',
            'So sánh 70%, 60%, 65%, 68% thì 70% là lớn nhất, tức 0,7.',
          ],
          barem: [{ item: 'Đưa về cùng dạng và chọn đúng 0,7', point: 0.5 }],
          analysis: {
            dang: 'So sánh số ở ba dạng khác nhau',
            knowledge: [
              'Chuyển qua lại giữa phân số, số thập phân và tỉ số phần trăm.',
            ],
            docVi: ['Các số trong đề được viết ở nhiều dạng khác nhau — dấu hiệu phải quy về một dạng.'],
            method: [
              'Chọn một dạng chung, thường là phần trăm.',
              'Đổi từng số về dạng đó.',
              'So sánh rồi trả lời bằng đúng cách viết trong đề.',
            ],
            traps: [
              'So sánh trực tiếp mà không đổi dạng, thấy 65 lớn hơn 0,7 nên chọn 65%.',
              'Đổi 3/5 nhầm thành 0,35.',
            ],
            tips: [
              'Đổi phân số sang thập phân bằng cách chia tử cho mẫu, làm một lần rồi so hết.',
            ],
            transfer: 'Kỹ năng nền cho mọi câu tỉ số phần trăm ở Phần II.',
          },
        },
        {
          id: 'nn-1-6',
          label: 'Phần I · Câu 6',
          points: 0.5,
          minutes: 2,
          strand: 'hinh-hoc',
          level: 2,
          format: 'trac-nghiem',
          topicIds: ['l6-hinh-hoc-tieu-hoc'],
          statement: 'Một bánh xe hình tròn có bán kính 5 dm. Chu vi của bánh xe đó là:',
          choices: ['15,7 dm', '31,4 dm', '78,5 dm', '10 dm'],
          correctIndex: 1,
          answer: '31,4 dm',
          solution: [
            'Đường kính bằng hai lần bán kính: 5 × 2 = 10 dm.',
            'Chu vi hình tròn: 10 × 3,14 = 31,4 dm.',
          ],
          barem: [{ item: 'Tính đúng chu vi là 31,4 dm', point: 0.5 }],
          analysis: {
            dang: 'Chu vi hình tròn',
            knowledge: ['C = d × 3,14 = r × 2 × 3,14.', 'Phân biệt chu vi với diện tích.'],
            docVi: ['Đề cho bán kính và hỏi chu vi.', 'Đơn vị đáp án là dm, không phải dm².'],
            method: [
              'Đổi bán kính sang đường kính.',
              'Nhân đường kính với 3,14.',
              'Ghi đơn vị độ dài.',
            ],
            traps: [
              'Phương án 15,7 dm là bẫy nhân bán kính với 3,14 mà quên nhân 2.',
              'Phương án 78,5 dm là bẫy tính diện tích (5 × 5 × 3,14).',
            ],
            tips: [
              'Nhớ theo đơn vị: chu vi ra dm, diện tích ra dm² — nhìn đơn vị của phương án là loại được nửa số bẫy.',
            ],
            transfer: 'Câu hình học cơ bản, thường là câu lấy điểm chắc chắn của đề.',
          },
        },
        {
          id: 'nn-1-7',
          label: 'Phần I · Câu 7',
          points: 0.5,
          minutes: 2,
          strand: 'hinh-hoc',
          level: 2,
          format: 'trac-nghiem',
          topicIds: ['l6-hinh-hoc-tieu-hoc'],
          statement: 'Một bể chứa có thể tích 2,5 m³. Bể đó chứa đầy được bao nhiêu lít nước?',
          choices: ['25 lít', '250 lít', '2500 lít', '25 000 lít'],
          correctIndex: 2,
          answer: '2500 lít',
          solution: [
            '1 m³ = 1000 dm³ và 1 dm³ = 1 lít.',
            'Do đó 1 m³ = 1000 lít.',
            '2,5 m³ = 2,5 × 1000 = 2500 lít.',
          ],
          barem: [{ item: 'Đổi đúng đơn vị, kết quả 2500 lít', point: 0.5 }],
          analysis: {
            dang: 'Đổi đơn vị thể tích sang dung tích',
            knowledge: ['1 m³ = 1000 dm³.', '1 dm³ = 1 lít.'],
            docVi: ['Đề cho thể tích ở m³ và hỏi số lít.'],
            method: [
              'Ghi lại hai quan hệ đổi đơn vị.',
              'Ghép lại: 1 m³ = 1000 lít.',
              'Nhân và ghi đơn vị lít.',
            ],
            traps: [
              'Đổi thiếu một bậc, nhân 100 thay vì 1000.',
              'Nhầm 1 m³ = 100 dm³.',
            ],
            tips: [
              'Đơn vị thể tích nhảy 1000 lần mỗi bậc, khác đơn vị diện tích nhảy 100 lần.',
            ],
            transfer:
              'Câu đổi đơn vị luôn có mặt và luôn là câu mất điểm oan nếu học vẹt bảng đơn vị.',
          },
        },
      ],
    },
    {
      label: 'Phần II · Toán có lời văn nhiều bước',
      points: 3.5,
      note: '5 câu trả lời ngắn, mỗi câu 0,7 điểm. Chỉ ghi đáp số kèm đơn vị.',
      items: [
        {
          id: 'nn-2-1',
          label: 'Phần II · Câu 1',
          points: 0.7,
          minutes: 3,
          strand: 'thuc-te',
          level: 2,
          format: 'tra-loi-ngan',
          topicIds: ['l6-toan-chuyen-dong'],
          statement:
            'Một người đi xe đạp từ A lúc 7 giờ với vận tốc 15 km/giờ và đến B lúc 9 giờ 30 phút. Tính quãng đường AB.',
          answer: '37,5 km',
          solution: [
            'Thời gian đi: từ 7 giờ đến 9 giờ 30 phút là 2 giờ 30 phút.',
            'Đổi sang giờ: 2 giờ 30 phút = 2,5 giờ.',
            'Quãng đường: 15 × 2,5 = 37,5 km.',
          ],
          barem: [
            { item: 'Tính đúng thời gian đi là 2 giờ 30 phút', point: 0.25 },
            { item: 'Đổi đúng sang 2,5 giờ', point: 0.25 },
            { item: 'Đáp số 37,5 km, có đơn vị', point: 0.2 },
          ],
          analysis: {
            dang: 'Tính quãng đường từ thời điểm xuất phát và thời điểm đến',
            knowledge: ['s = v × t.', 'Đổi phút sang giờ dưới dạng số thập phân.'],
            docVi: [
              'Đề cho hai mốc thời gian chứ không cho thẳng khoảng thời gian.',
              'Vận tốc theo giờ nên thời gian cũng phải quy về giờ.',
            ],
            method: [
              'Lấy thời điểm đến trừ thời điểm xuất phát.',
              'Đổi kết quả sang giờ dạng thập phân.',
              'Nhân với vận tốc.',
            ],
            traps: [
              'Lấy 2 giờ 30 phút thành 2,3 giờ.',
              'Quên trừ mà lấy luôn 9,5 giờ nhân vận tốc.',
              'Trả lời thiếu đơn vị km.',
            ],
            tips: [
              '30 phút là 0,5 giờ; 15 phút là 0,25 giờ; 45 phút là 0,75 giờ — thuộc ba mốc này là đủ dùng.',
            ],
            transfer: 'Biến thể phổ biến nhất của bài chuyển động trong đề đọc hiểu.',
          },
        },
        {
          id: 'nn-2-2',
          label: 'Phần II · Câu 2',
          points: 0.7,
          minutes: 3,
          strand: 'thuc-te',
          level: 3,
          format: 'tra-loi-ngan',
          topicIds: ['l6-doc-hieu-du-lieu'],
          statement:
            'Ba người thợ làm xong một công việc trong 8 ngày. Hỏi bốn người thợ có cùng năng suất như thế làm xong công việc đó trong bao nhiêu ngày?',
          answer: '6 ngày',
          solution: [
            'Tổng khối lượng công việc quy ra công thợ: 3 × 8 = 24 (ngày công).',
            'Với 4 người, số ngày cần: 24 : 4 = 6 ngày.',
            'Kiểm tra hợp lý: nhiều người hơn thì ít ngày hơn ✓.',
          ],
          barem: [
            { item: 'Quy được về 24 ngày công', point: 0.25 },
            { item: 'Chia đúng cho 4 người', point: 0.25 },
            { item: 'Đáp số 6 ngày, có đơn vị', point: 0.2 },
          ],
          analysis: {
            dang: 'Đại lượng tỉ lệ nghịch',
            knowledge: [
              'Nhiều người hơn thì ít thời gian hơn — quan hệ tỉ lệ nghịch.',
              'Phương pháp quy về đơn vị (ngày công).',
            ],
            docVi: [
              'Hai đại lượng thay đổi ngược chiều nhau.',
              'Từ khoá "cùng năng suất" cho phép quy về đơn vị.',
            ],
            method: [
              'Tính tổng khối lượng công việc theo số người nhân số ngày.',
              'Chia cho số người mới.',
              'Kiểm tra chiều thay đổi có hợp lý không.',
            ],
            traps: [
              'Áp dụng tỉ lệ thuận, lấy 8 × 4 : 3 và ra hơn 10 ngày.',
              'Không kiểm tra chiều, nhận kết quả lớn hơn 8 ngày.',
            ],
            tips: [
              'Luôn tự hỏi: kết quả phải lớn hơn hay nhỏ hơn số ban đầu? Câu hỏi này chặn được gần hết lỗi tỉ lệ.',
            ],
            transfer:
              'Dạng tỉ lệ nghịch xuất hiện đều ở phần lời văn của các bài đánh giá năng lực.',
          },
        },
        {
          id: 'nn-2-3',
          label: 'Phần II · Câu 3',
          points: 0.7,
          minutes: 3,
          strand: 'dai-so',
          level: 3,
          format: 'tra-loi-ngan',
          topicIds: ['l6-toan-tinh-nguoc'],
          statement:
            'Một cửa hàng bán 1/4 số vải, rồi bán tiếp 30 m nữa thì còn lại 45 m vải. Hỏi lúc đầu cửa hàng có bao nhiêu mét vải?',
          answer: '100 m',
          solution: [
            'Đi ngược từ cuối: trước khi bán 30 m, cửa hàng còn 45 + 30 = 75 m.',
            '75 m chính là phần còn lại sau khi đã bán 1/4, tức bằng 3/4 số vải ban đầu.',
            'Số vải ban đầu: 75 : 3 × 4 = 100 m.',
            'Thử lại: bán 1/4 của 100 là 25 m, còn 75 m; bán tiếp 30 m còn 45 m ✓.',
          ],
          barem: [
            { item: 'Tính được 45 + 30 = 75 m', point: 0.25 },
            { item: 'Nhận ra 75 m ứng với 3/4 số vải ban đầu', point: 0.25 },
            { item: 'Đáp số 100 m, có đơn vị', point: 0.2 },
          ],
          analysis: {
            dang: 'Tính ngược kết hợp phân số',
            knowledge: [
              'Phép tính ngược.',
              'Tìm một số khi biết phân số của nó.',
            ],
            docVi: [
              'Đề cho kết quả cuối và hỏi số ban đầu.',
              'Có xen kẽ một phân số và một số cụ thể — phải xử lý số cụ thể trước.',
            ],
            method: [
              'Đi ngược từ kết quả cuối, cộng lại phần đã bán bằng số cụ thể.',
              'Xác định phần vừa tìm được ứng với phân số nào của tổng.',
              'Tìm tổng bằng cách chia cho tử rồi nhân mẫu.',
              'Thử lại theo chiều xuôi.',
            ],
            traps: [
              'Lấy 45 : 3 × 4 mà quên cộng 30 m trước.',
              'Nghĩ 75 m ứng với 1/4 thay vì 3/4.',
              'Trả lời 75 m, tức dừng ở bước trung gian.',
            ],
            tips: [
              'Nguyên tắc bất di bất dịch của tính ngược: xử lý phép cuối cùng trước.',
              'Bài này thử lại chỉ mất 15 giây và bắt được mọi lỗi.',
            ],
            transfer:
              'Câu phân hoá điển hình của phần lời văn: dễ nhìn ra hướng, dễ sai ở thứ tự bước.',
          },
        },
        {
          id: 'nn-2-4',
          label: 'Phần II · Câu 4',
          points: 0.7,
          minutes: 3,
          strand: 'thuc-te',
          level: 3,
          format: 'tra-loi-ngan',
          topicIds: ['l6-ti-so-phan-tram'],
          statement:
            'Một chiếc cặp giá 500 000 đồng được giảm giá 10%. Sau đó cửa hàng giảm tiếp 20% so với giá vừa giảm. Hỏi giá cuối cùng của chiếc cặp là bao nhiêu?',
          answer: '360 000 đồng',
          solution: [
            'Sau lần giảm thứ nhất: 500 000 × 90 : 100 = 450 000 đồng.',
            'Lần giảm thứ hai tính trên giá 450 000 đồng, không phải trên giá gốc.',
            'Giá cuối: 450 000 × 80 : 100 = 360 000 đồng.',
          ],
          barem: [
            { item: 'Tính đúng giá sau lần giảm thứ nhất là 450 000 đồng', point: 0.25 },
            { item: 'Lấy 20% của 450 000 chứ không phải của 500 000', point: 0.25 },
            { item: 'Đáp số 360 000 đồng, có đơn vị', point: 0.2 },
          ],
          analysis: {
            dang: 'Giảm giá liên tiếp',
            knowledge: [
              'Tìm giá trị phần trăm của một số.',
              'Mốc 100% thay đổi sau mỗi lần giảm.',
            ],
            docVi: [
              'Có hai lần thay đổi giá.',
              'Cụm "so với giá vừa giảm" là chi tiết quyết định.',
            ],
            method: [
              'Chia bài thành hai bước theo thứ tự trong đề.',
              'Mỗi bước nhân thẳng với phần trăm còn lại.',
              'Không cộng trừ hai số phần trăm.',
            ],
            traps: [
              'Cộng 10% + 20% = 30% rồi lấy 500 000 × 70 : 100 = 350 000 — sai.',
              'Lấy 20% của giá gốc ở bước hai.',
              'Dừng ở 450 000 đồng.',
            ],
            tips: [
              'Nhân thẳng với 90% rồi 80% chỉ mất hai phép tính và không có chỗ để sai dấu.',
              'Giá cuối bằng 72% giá gốc — nhớ con số này để kiểm tra nhanh.',
            ],
            transfer:
              'Dạng đời thực nhất của toàn đề, và cũng là chỗ phân biệt học sinh hiểu bản chất với học sinh học vẹt.',
          },
        },
        {
          id: 'nn-2-5',
          label: 'Phần II · Câu 5',
          points: 0.7,
          minutes: 3,
          strand: 'thuc-te',
          level: 3,
          format: 'tra-loi-ngan',
          topicIds: ['l6-doc-hieu-du-lieu'],
          statement:
            'Trung bình cộng của bốn số là 25. Biết ba số đầu lần lượt là 18; 24; 30. Tìm số thứ tư.',
          answer: '28',
          solution: [
            'Tổng của bốn số: 25 × 4 = 100.',
            'Tổng ba số đầu: 18 + 24 + 30 = 72.',
            'Số thứ tư: 100 − 72 = 28.',
            'Thử lại: (18 + 24 + 30 + 28) : 4 = 100 : 4 = 25 ✓.',
          ],
          barem: [
            { item: 'Tính đúng tổng bốn số là 100', point: 0.25 },
            { item: 'Tính đúng tổng ba số đầu là 72', point: 0.25 },
            { item: 'Đáp số 28', point: 0.2 },
          ],
          analysis: {
            dang: 'Trung bình cộng theo chiều ngược',
            knowledge: ['Tổng = trung bình × số các số.'],
            docVi: [
              'Đề cho trung bình cộng và thiếu một số hạng.',
              'Đây là bài trung bình cộng đi ngược, không phải đi xuôi.',
            ],
            method: [
              'Nhân trung bình với số các số để ra tổng.',
              'Cộng các số đã biết.',
              'Lấy tổng trừ đi phần đã biết.',
              'Thử lại bằng cách tính trung bình.',
            ],
            traps: [
              'Lấy trung bình trừ đi trung bình của ba số đầu.',
              'Nhân trung bình với 3 thay vì 4.',
              'Không thử lại nên không phát hiện lỗi cộng.',
            ],
            tips: [
              'Ước lượng: ba số đầu trung bình là 24, thấp hơn 25, nên số thứ tư phải lớn hơn 25.',
            ],
            transfer:
              'Biến thể ngược của câu trung bình cộng ở Phần I — cùng công thức, khác chiều tư duy.',
          },
        },
      ],
    },
    {
      label: 'Phần III · Suy luận & quy luật',
      points: 3,
      note: '4 câu, mỗi câu 0,75 điểm. Trình bày ngắn gọn cách suy luận.',
      items: [
        {
          id: 'nn-3-1',
          label: 'Phần III · Câu 1',
          points: 0.75,
          minutes: 3,
          strand: 'to-hop',
          level: 3,
          format: 'tu-luan',
          topicIds: ['l6-suy-luan-logic'],
          statement:
            'Bốn bạn An, Bảo, Chi, Dung mỗi bạn thích đúng một loại quả khác nhau trong bốn loại: cam, táo, nho, lê. Biết rằng: Bảo thích cam; An thích nho; Chi không thích táo. Hỏi mỗi bạn thích loại quả nào?',
          answer: 'An – nho; Bảo – cam; Chi – lê; Dung – táo',
          solution: [
            'Kẻ bảng 4 hàng (bốn bạn) × 4 cột (bốn loại quả).',
            'Bảo thích cam: đánh ✓ ô Bảo – cam, loại cả hàng Bảo và cột cam.',
            'An thích nho: đánh ✓ ô An – nho, loại cả hàng An và cột nho.',
            'Còn lại Chi và Dung với hai loại quả táo và lê.',
            'Chi không thích táo nên Chi thích lê, và Dung thích táo.',
            'Kết luận: An – nho; Bảo – cam; Chi – lê; Dung – táo.',
          ],
          barem: [
            { item: 'Lập bảng hoặc trình bày lập luận có hệ thống', point: 0.25 },
            { item: 'Dùng đúng hai dữ kiện khẳng định để loại hàng và cột', point: 0.25 },
            { item: 'Kết luận đúng và đầy đủ cho cả bốn bạn', point: 0.25 },
          ],
          analysis: {
            dang: 'Suy luận logic bằng bảng đúng/sai',
            knowledge: ['Nguyên tắc: mỗi hàng và mỗi cột chỉ có đúng một dấu ✓.'],
            docVi: [
              'Số người bằng số thuộc tính.',
              'Dữ kiện gồm cả khẳng định và phủ định.',
            ],
            method: [
              'Kẻ bảng ra nháp.',
              'Xử lý các dữ kiện khẳng định trước.',
              'Dùng dữ kiện phủ định để chốt phần còn lại.',
              'Kiểm tra đã dùng hết dữ kiện chưa.',
            ],
            traps: [
              'Đọc "Chi không thích táo" thành "Chi thích táo".',
              'Chỉ trả lời cho một bạn trong khi đề hỏi "mỗi bạn".',
              'Suy luận trong đầu rồi quên một nhánh.',
            ],
            tips: [
              'Bảng 4 × 4 chỉ mất 15 giây để kẻ nhưng tiết kiệm vài phút.',
              'Ở tự luận, viết vài dòng lập luận — barem chấm theo bước.',
            ],
            transfer: 'Câu suy luận là phần tạo khác biệt của đề đánh giá năng lực.',
          },
        },
        {
          id: 'nn-3-2',
          label: 'Phần III · Câu 2',
          points: 0.75,
          minutes: 3,
          strand: 'to-hop',
          level: 3,
          format: 'tu-luan',
          topicIds: ['l6-day-so-quy-luat'],
          statement: 'Cho dãy số 1; 4; 9; 16; 25; … Tìm số hạng thứ 12 của dãy và giải thích quy luật.',
          answer: '144',
          solution: [
            'Hiệu giữa các số hạng liên tiếp là 3; 5; 7; 9; … không phải hằng số, nên đây không phải dãy cách đều.',
            'Quan sát lại: 1 = 1 × 1; 4 = 2 × 2; 9 = 3 × 3; 16 = 4 × 4; 25 = 5 × 5.',
            'Quy luật: số hạng thứ n bằng n × n.',
            'Số hạng thứ 12: 12 × 12 = 144.',
          ],
          barem: [
            { item: 'Chỉ ra dãy không cách đều bằng cách xét hiệu', point: 0.25 },
            { item: 'Phát biểu đúng quy luật số hạng thứ n bằng n × n', point: 0.25 },
            { item: 'Tính đúng số hạng thứ 12 là 144', point: 0.25 },
          ],
          analysis: {
            dang: 'Dãy số theo quy luật nhân (dãy số chính phương)',
            knowledge: [
              'Xét hiệu để kiểm tra dãy cách đều.',
              'Nhận dạng tích của một số với chính nó.',
            ],
            docVi: [
              'Hiệu giữa các số hạng tăng dần đều — dấu hiệu của dãy quy luật hai tầng.',
              'Các số đều là kết quả của một phép nhân quen thuộc.',
            ],
            method: [
              'Xét hiệu trước; nếu hiệu không đều thì xét hiệu của hiệu.',
              'Thử viết mỗi số dưới dạng tích hoặc tổng quen thuộc.',
              'Phát biểu quy luật theo vị trí n.',
              'Thử lại với một số hạng đã biết.',
            ],
            traps: [
              'Cố áp công thức dãy cách đều và ra kết quả sai.',
              'Kết luận quy luật chỉ sau khi nhìn hai số hạng đầu.',
              'Chỉ ghi đáp số mà không giải thích quy luật, mất điểm trình bày.',
            ],
            tips: [
              'Hiệu của hiệu bằng một hằng số (ở đây là 2) là dấu hiệu chắc chắn của dãy chính phương.',
              'Thử lại: n = 5 cho 25 ✓ trước khi thay n = 12.',
            ],
            transfer:
              'Dạng quy luật hai tầng là bước nâng của câu dãy cách đều, hay xuất hiện ở nhóm trường tốp đầu.',
          },
        },
        {
          id: 'nn-3-3',
          label: 'Phần III · Câu 3',
          points: 0.75,
          minutes: 3,
          strand: 'to-hop',
          level: 4,
          format: 'tu-luan',
          topicIds: ['l6-day-so-quy-luat'],
          statement:
            'Một hình chữ nhật lớn được chia thành lưới 3 × 4 ô vuông nhỏ bằng nhau. Hỏi trong hình có tất cả bao nhiêu hình chữ nhật (kể cả hình vuông và hình chữ nhật lớn)?',
          answer: '60 hình',
          solution: [
            'Lưới 3 × 4 ô được tạo bởi 4 đường kẻ ngang và 5 đường kẻ dọc.',
            'Mỗi hình chữ nhật được xác định bởi đúng 2 đường ngang và 2 đường dọc.',
            'Số cách chọn 2 trong 4 đường ngang: 4 × 3 : 2 = 6.',
            'Số cách chọn 2 trong 5 đường dọc: 5 × 4 : 2 = 10.',
            'Tổng số hình chữ nhật: 6 × 10 = 60 hình.',
          ],
          barem: [
            { item: 'Đếm đúng số đường kẻ ngang và dọc', point: 0.25 },
            { item: 'Tính đúng số cách chọn 2 đường ở mỗi chiều', point: 0.25 },
            { item: 'Nhân ra kết quả 60 hình', point: 0.25 },
          ],
          analysis: {
            dang: 'Đếm hình chữ nhật trong lưới ô vuông',
            knowledge: [
              'Mỗi hình chữ nhật tương ứng một cặp đường ngang và một cặp đường dọc.',
              'Số cách chọn 2 trong k đường bằng k × (k − 1) : 2.',
            ],
            docVi: [
              'Hình chia lưới đều.',
              'Câu hỏi có chữ "kể cả" — nghĩa là phải đếm cả hình ghép.',
            ],
            method: [
              'Đếm số đường kẻ mỗi chiều (số ô cộng 1).',
              'Tính số cách chọn 2 đường ở mỗi chiều.',
              'Nhân hai kết quả.',
            ],
            traps: [
              'Chỉ đếm 12 ô nhỏ.',
              'Nhầm số ô với số đường kẻ.',
              'Đếm tay và bỏ sót hình ghép từ nhiều ô.',
            ],
            tips: [
              'Chuyển bài đếm hình thành bài đếm cách chọn đường — đây là bước tư duy quyết định.',
              'Kiểm tra: kết quả phải lớn hơn nhiều so với số ô nhỏ.',
            ],
            transfer:
              'Câu khó của nhóm đếm hình, thường nằm cuối đề và tạo khác biệt giữa các thí sinh giỏi.',
          },
        },
        {
          id: 'nn-3-4',
          label: 'Phần III · Câu 4',
          points: 0.75,
          minutes: 3,
          strand: 'to-hop',
          level: 4,
          format: 'tu-luan',
          topicIds: ['l6-suy-luan-logic'],
          statement:
            'Có 9 đồng xu giống hệt nhau, trong đó có đúng một đồng nhẹ hơn các đồng còn lại. Với một chiếc cân thăng bằng hai đĩa và không dùng quả cân, cần cân ít nhất bao nhiêu lần để chắc chắn tìm ra đồng xu nhẹ? Trình bày cách cân.',
          answer: '2 lần',
          solution: [
            'Mỗi lần cân cho ba kết quả: đĩa trái nhẹ hơn, đĩa phải nhẹ hơn, hoặc hai đĩa bằng nhau. Vì vậy chia ba nhóm, không chia đôi.',
            'Lần 1: chia 9 đồng thành ba nhóm, mỗi nhóm 3 đồng. Đặt nhóm A và nhóm B lên hai đĩa.',
            'Nếu A nhẹ hơn thì đồng nhẹ ở nhóm A; nếu B nhẹ hơn thì ở nhóm B; nếu cân bằng thì ở nhóm C.',
            'Lần 2: lấy nhóm 3 đồng vừa xác định, đặt 1 đồng lên mỗi đĩa, giữ lại 1 đồng.',
            'Nếu một đĩa nhẹ hơn thì đó là đồng cần tìm; nếu cân bằng thì đồng giữ lại là đồng nhẹ.',
            'Vậy chỉ cần 2 lần cân là chắc chắn tìm ra.',
          ],
          barem: [
            { item: 'Nêu được nguyên tắc chia ba nhóm thay vì chia đôi', point: 0.25 },
            { item: 'Trình bày đúng lần cân thứ nhất và cả ba khả năng', point: 0.25 },
            { item: 'Trình bày đúng lần cân thứ hai và kết luận 2 lần', point: 0.25 },
          ],
          analysis: {
            dang: 'Bài toán cân đĩa tìm vật khác biệt',
            knowledge: [
              'Mỗi lần cân cho ba kết quả nên phân biệt được tối đa 3ⁿ vật sau n lần.',
              'Chiến lược chia ba nhóm gần bằng nhau.',
            ],
            docVi: [
              'Có cân thăng bằng hai đĩa và không có quả cân.',
              'Câu hỏi có chữ "ít nhất" và "chắc chắn" — phải xét trường hợp xấu nhất.',
            ],
            method: [
              'Chia thành ba nhóm gần bằng nhau.',
              'Cân hai nhóm, dùng cả kết quả "cân bằng" như một thông tin.',
              'Lặp lại với nhóm đã xác định.',
              'Đếm số lần cân trong trường hợp xấu nhất.',
            ],
            traps: [
              'Chia đôi theo phản xạ, cần tới 3 lần cân.',
              'Trả lời số lần cân trong trường hợp may mắn.',
              'Chỉ ghi đáp số mà không trình bày cách cân, mất 0,5 điểm trình bày.',
            ],
            tips: [
              'Ghi nhớ mốc: 1 lần cho 3 vật, 2 lần cho 9, 3 lần cho 27.',
              'Đề hỏi "trình bày cách cân" thì phải viết ra cả ba khả năng của lần cân đầu.',
            ],
            transfer:
              'Câu khó nhất của nhóm suy luận; không phải đề nào cũng có, nhưng có thì thường là câu chốt.',
          },
        },
      ],
    },
  ],
  gradingNotes: [
    'Phần I chấm theo phương án chọn, không cho điểm từng phần.',
    'Phần II chỉ chấm đáp số; đáp số thiếu đơn vị bị trừ 0,2 điểm của câu đó.',
    'Phần III chấm theo bước lập luận: học sinh chỉ ghi đáp số đúng mà không trình bày cách làm chỉ được mốc điểm cuối cùng.',
    'Học sinh có cách giải khác đúng vẫn cho điểm tối đa theo các mốc tương ứng của barem.',
    'Với câu cân đĩa, bắt buộc nêu đủ ba khả năng của lần cân thứ nhất mới được trọn mốc điểm tương ứng.',
  ],
  timePlan: [
    { phase: 'Đọc lướt toàn đề', minutes: '0–2', action: 'Đếm số câu mỗi phần, xem câu nào có bảng biểu dài.' },
    { phase: 'Phần I', minutes: '2–16', action: 'Làm nhanh, ước lượng để loại phương án.' },
    { phase: 'Phần II', minutes: '16–31', action: 'Gạch chân dữ kiện, viết sơ đồ bước trước khi tính.' },
    { phase: 'Phần III', minutes: '31–43', action: 'Kẻ bảng cho câu suy luận; viết lập luận, không chỉ đáp số.' },
    { phase: 'Soát', minutes: '43–45', action: 'Đọc lại câu hỏi từng bài, kiểm tra đơn vị và đại lượng trả lời.' },
  ],
  scoreBands: [
    {
      band: 'Dưới 5,0',
      meaning: 'Chưa vững kỹ năng đọc dữ liệu và bốn phép tính; luyện đề dày lúc này sẽ phản tác dụng.',
      next: 'Quay về Giai đoạn 1: mỗi ngày 10 phút tính nhẩm và 2 bài đọc bảng số liệu.',
    },
    {
      band: '5,0 – 6,5',
      meaning: 'Làm được Phần I nhưng đuối ở Phần II vì đọc đề vội hoặc nhầm thứ tự bước.',
      next: 'Giai đoạn 2: mỗi bài lời văn bắt buộc viết sơ đồ bước ra nháp trước khi tính.',
    },
    {
      band: '6,5 – 8,0',
      meaning: 'Hai phần đầu đã chắc, còn bỏ trống hoặc làm dở câu suy luận.',
      next: 'Giai đoạn 3: mỗi tuần 5 bài bảng đúng/sai, 3 bài dãy số quy luật, 2 bài đếm hình.',
    },
    {
      band: 'Trên 8,0',
      meaning: 'Nền tốt. Khoảng cách còn lại là tốc độ đọc và độ chặt của phần trình bày.',
      next: 'Giai đoạn 4: hai đề tính giờ mỗi tuần, luân phiên hai định dạng trường khác nhau, chấm theo barem thật.',
    },
  ],
};
