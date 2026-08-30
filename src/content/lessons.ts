import type { Grade, Term } from '@/types';

/* =====================================================================
   MATHGITA — GIÁO ÁN THEO BUỔI (số hoá từ bộ giáo án gốc của GITA)
   Cấu trúc vận hành thật của trung tâm:
        CHƯƠNG → BUỔI (S1, S2, …) → PHIẾU CƠ BẢN + PHIẾU NÂNG CAO
   Mỗi buổi gắn với chuyên đề tương ứng trong Web App để học sinh
   mở đúng phần lý thuyết – dạng bài – luyện tập của buổi đó.
   ===================================================================== */

export interface Lesson {
  /** Mã buổi theo giáo án GITA: S1, S2, "S1+S2"… */
  code: string;
  title: string;
  /** Chuyên đề tương ứng trong Web App */
  topicId: string;
  goals: string[];
  /** Nội dung phiếu cơ bản (lớp CB) */
  basic: string[];
  /** Nội dung phiếu nâng cao (lớp NC / CLC) */
  advanced: string[];
}

export interface Chapter {
  id: string;
  grade: Grade;
  roman: string;
  name: string;
  term: Term;
  lessons: Lesson[];
  /** Buổi ôn tập tổng kết chương */
  review?: string[];
}

/* ============================== KHỐI 6 ============================== */

const G6: Chapter[] = [
  {
    id: 'c6-1', grade: 6, roman: 'I', name: 'SỐ TỰ NHIÊN', term: 'HK1',
    review: ['Ôn tập tập hợp các số tự nhiên (S1–S6)', 'Ôn tập quan hệ chia hết (S7–S13)'],
    lessons: [
      {
        code: 'S1+S2', title: 'Tập hợp — Tập hợp các số tự nhiên', topicId: 'g6-t1',
        goals: ['Dùng đúng ký hiệu $\\in$, $\\notin$', 'Viết tập hợp bằng hai cách', 'Đọc và viết số La Mã'],
        basic: [
          'Ký hiệu tập hợp, phần tử; điền $\\in$ / $\\notin$',
          'Viết tập hợp bằng cách liệt kê phần tử',
          'Viết tập hợp bằng cách nêu tính chất đặc trưng',
          'Tập hợp $\\N$ và $\\Nstar$; cấu tạo số',
          'Số La Mã: đọc, viết, quy tắc cộng – trừ ký hiệu',
        ],
        advanced: [
          'Tập hợp con, tập hợp rỗng',
          'Tìm các số tự nhiên thoả nhiều điều kiện đồng thời',
          'Viết tập hợp số có ba chữ số theo điều kiện tổng chữ số',
          'Bài toán di chuyển một que diêm với số La Mã',
        ],
      },
      {
        code: 'S3+S4', title: 'Cộng, trừ, nhân, chia số tự nhiên', topicId: 'g6-t1',
        goals: ['Thành thạo bốn phép tính', 'Tính nhanh bằng tính chất', 'Thứ tự thực hiện phép tính'],
        basic: [
          'Tính chất giao hoán, kết hợp, phân phối',
          'Tính nhanh bằng cách nhóm số tròn',
          'Thứ tự thực hiện phép tính có ngoặc',
          'Tìm $x$ dạng cơ bản',
        ],
        advanced: [
          'Tính nhanh với biểu thức nhiều tầng ngoặc',
          'Tính tổng dãy số cách đều',
          'Tìm $x$ có nhiều lớp phép tính',
          'Bài toán thực tế về phép chia có dư',
        ],
      },
      {
        code: 'S5+S6', title: 'Lũy thừa với số mũ tự nhiên', topicId: 'g6-t1',
        goals: ['Hiểu bản chất lũy thừa', 'Nhân, chia lũy thừa cùng cơ số', 'So sánh lũy thừa'],
        basic: [
          'Định nghĩa $a^{n}$, cơ số và số mũ',
          '$a^{m}\\cdot a^{n}=a^{m+n}$ ; $a^{m}:a^{n}=a^{m-n}$',
          'Viết gọn tích thành lũy thừa; số chính phương',
          'Thứ tự thực hiện phép tính có lũy thừa',
        ],
        advanced: [
          'So sánh hai lũy thừa lớn (đưa về cùng cơ số hoặc cùng số mũ)',
          'Tìm $x$ trong đẳng thức chứa lũy thừa',
          'Tính tổng các lũy thừa liên tiếp bằng kỹ thuật nhân – trừ',
          'Tìm chữ số tận cùng của một lũy thừa',
        ],
      },
      {
        code: 'S7', title: 'Quan hệ chia hết và tính chất', topicId: 'g6-t2',
        goals: ['Hiểu quan hệ chia hết', 'Vận dụng tính chất chia hết của tổng, hiệu'],
        basic: ['Định nghĩa $a\;\\vdots\;b$; ước và bội', 'Tính chất chia hết của tổng, hiệu', 'Xét tính chia hết không cần tính tổng'],
        advanced: ['Chứng minh biểu thức chia hết cho một số', 'Tìm $n$ để biểu thức chia hết', 'Kỹ thuật tách hạng tử để xét chia hết'],
      },
      {
        code: 'S8', title: 'Dấu hiệu chia hết cho 2 và cho 5', topicId: 'g6-t2',
        goals: ['Thuộc dấu hiệu chia hết cho 2, 5', 'Tìm chữ số chưa biết'],
        basic: ['Dấu hiệu chia hết cho 2, cho 5, cho cả 2 và 5', 'Tìm chữ số tận cùng thoả điều kiện', 'Lập số từ các chữ số cho trước'],
        advanced: ['Số vừa chia hết cho 2 vừa chia hết cho 5 trong một khoảng', 'Bài toán lập số có điều kiện kép'],
      },
      {
        code: 'S9', title: 'Dấu hiệu chia hết cho 3 và cho 9', topicId: 'g6-t2',
        goals: ['Thuộc dấu hiệu chia hết cho 3, 9', 'Tìm chữ số bằng cách xét tổng chữ số'],
        basic: ['Dấu hiệu chia hết cho 3, cho 9', 'Tìm chữ số $*$ trong số $\\ov{a*b}$', 'Xét tính chia hết của tổng nhiều số'],
        advanced: ['Tìm đồng thời hai chữ số chưa biết', 'Số chia hết cho cả 2, 3, 5, 9', 'Chứng minh chia hết dựa vào tổng chữ số'],
      },
      {
        code: 'S10+S11', title: 'Số nguyên tố, hợp số — Phân tích một số ra thừa số nguyên tố', topicId: 'g6-t2',
        goals: ['Phân biệt số nguyên tố và hợp số', 'Phân tích ra thừa số nguyên tố', 'Đếm số ước'],
        basic: ['Định nghĩa số nguyên tố, hợp số', 'Bảng số nguyên tố nhỏ hơn 100', 'Phân tích ra thừa số nguyên tố theo cột dọc', 'Tìm tập hợp các ước của một số'],
        advanced: ['Đếm số ước bằng công thức $(a_1+1)(a_2+1)\\cdots$', 'Chứng minh một số là hợp số', 'Tìm số nguyên tố thoả điều kiện cho trước'],
      },
      {
        code: 'S12', title: 'Ước chung — Ước chung lớn nhất', topicId: 'g6-t2',
        goals: ['Tìm ƯC, ƯCLN', 'Giải bài toán thực tế về chia đều'],
        basic: ['Tìm ước của từng số rồi tìm ước chung', 'Viết tập hợp ƯC của hai, ba số', 'Tìm ƯCLN bằng phân tích ra thừa số nguyên tố', 'Bài toán chia nhóm, chia phần quà'],
        advanced: [
          'Bài toán chia đều có phần dư: “130 chia $a$ dư 10 và 172 chia $a$ dư 12”',
          'Tìm ƯC của hai biểu thức chứa $n$ (ví dụ $n+3$ và $2n+5$)',
          'Tìm số tự nhiên lớn nhất thoả nhiều điều kiện chia hết',
        ],
      },
      {
        code: 'S13', title: 'Bội chung — Bội chung nhỏ nhất', topicId: 'g6-t2',
        goals: ['Tìm BC, BCNN', 'Giải bài toán thực tế về chu kỳ lặp lại'],
        basic: ['Tìm bội của một số; viết tập hợp BC', 'Tìm BCNN bằng phân tích ra thừa số nguyên tố', 'Bài toán xếp hàng, gặp lại'],
        advanced: ['Bài toán BCNN có phần dư (xếp hàng đều thừa $r$)', 'Liên hệ ƯCLN · BCNN = tích hai số', 'Bài toán chu kỳ ba đối tượng'],
      },
    ],
  },
  {
    id: 'c6-2', grade: 6, roman: 'II', name: 'SỐ NGUYÊN', term: 'HK1',
    review: ['Quy tắc dấu ngoặc', 'Ôn tập số nguyên'],
    lessons: [
      {
        code: 'S1', title: 'Tập hợp các số nguyên', topicId: 'g6-t3',
        goals: ['Nhận biết số nguyên âm', 'Biểu diễn và so sánh trên trục số'],
        basic: ['Tập hợp $\\Z$; số nguyên âm trong thực tế', 'Biểu diễn trên trục số', 'So sánh hai số nguyên', 'Số đối, giá trị tuyệt đối'],
        advanced: ['Sắp thứ tự nhiều số nguyên', 'Tìm số nguyên thoả điều kiện về giá trị tuyệt đối', 'Bài toán nhiệt độ, độ cao, năm trước Công nguyên'],
      },
      {
        code: 'S2+S3', title: 'Cộng, trừ số nguyên', topicId: 'g6-t3',
        goals: ['Cộng, trừ thành thạo', 'Tính hợp lí bằng cách nhóm'],
        basic: ['Cộng hai số nguyên cùng dấu, khác dấu', 'Phép trừ $a-b=a+(-b)$', 'Tính chất giao hoán, kết hợp'],
        advanced: ['Tính hợp lí biểu thức dài', 'Tìm $x$ với số nguyên', 'Bài toán thực tế thu – chi, lãi – lỗ'],
      },
      {
        code: 'S4', title: 'Phép nhân số nguyên', topicId: 'g6-t3',
        goals: ['Nắm quy tắc dấu', 'Tính nhanh bằng tính chất phân phối'],
        basic: ['Quy tắc dấu khi nhân', 'Tính chất của phép nhân', 'Lũy thừa của số nguyên âm'],
        advanced: ['Tích nhiều thừa số âm', 'So sánh tích với 0 không cần tính', 'Tính hợp lí bằng đặt nhân tử chung'],
      },
      {
        code: 'S5', title: 'Phép chia số nguyên — Ước và bội của số nguyên', topicId: 'g6-t3',
        goals: ['Chia hết trong $\\Z$', 'Tìm ước và bội của số nguyên'],
        basic: ['Quy tắc dấu khi chia', 'Ước và bội của một số nguyên', 'Tìm $x$ trong đẳng thức chia hết'],
        advanced: ['Tìm $x$ nguyên để phân thức nhận giá trị nguyên', 'Chứng minh chia hết trong $\\Z$', 'Tìm cặp số nguyên thoả tích cho trước'],
      },
    ],
  },
  {
    id: 'c6-3', grade: 6, roman: 'III', name: 'HÌNH HỌC TRỰC QUAN', term: 'HK1',
    lessons: [
      {
        code: 'S1', title: 'Tam giác đều, hình vuông, lục giác đều', topicId: 'g6-t6',
        goals: ['Nhận biết và mô tả các hình đều', 'Tính chu vi'],
        basic: ['Yếu tố của tam giác đều, hình vuông, lục giác đều', 'Vẽ hình bằng thước và compa', 'Chu vi các hình đều'],
        advanced: ['Ghép hình từ tam giác đều', 'Bài toán đếm hình', 'Tính chu vi hình ghép'],
      },
      {
        code: 'S2', title: 'Hình chữ nhật, hình thoi, hình bình hành, hình thang cân', topicId: 'g6-t6',
        goals: ['Nhận biết bốn tứ giác đặc biệt', 'Nắm dấu hiệu qua cạnh, góc, đường chéo'],
        basic: ['Yếu tố và tính chất từng hình', 'Vẽ hình theo số đo cho trước', 'Nhận dạng hình qua dấu hiệu'],
        advanced: ['Phân biệt các hình dễ nhầm', 'Bài toán về đường chéo', 'Hình có trục đối xứng, tâm đối xứng'],
      },
      {
        code: 'S3', title: 'Chu vi và diện tích các hình', topicId: 'g6-t6',
        goals: ['Thuộc bảng công thức', 'Giải bài toán thực tế'],
        basic: ['Công thức chu vi, diện tích của sáu hình đã học', 'Đổi đơn vị đo độ dài và diện tích', 'Bài toán mảnh vườn, nền nhà'],
        advanced: ['Diện tích hình ghép: chia hình hoặc bù hình', 'Bài toán lát gạch, sơn tường có bẫy đơn vị', 'Bài toán tối ưu chi phí'],
      },
    ],
  },
  {
    id: 'c6-4', grade: 6, roman: 'IV', name: 'MỘT SỐ YẾU TỐ THỐNG KÊ VÀ XÁC SUẤT', term: 'HK2',
    lessons: [
      {
        code: 'S1', title: 'Thu thập và biểu diễn dữ liệu', topicId: 'g6-t8',
        goals: ['Phân loại dữ liệu', 'Đọc bảng và biểu đồ'],
        basic: ['Dữ liệu định tính và định lượng', 'Bảng thống kê', 'Biểu đồ tranh, biểu đồ cột'],
        advanced: ['Phát hiện dữ liệu không hợp lí', 'Biểu đồ cột kép', 'Viết nhận xét có dẫn chứng số liệu'],
      },
      {
        code: 'S2', title: 'Xác suất thực nghiệm', topicId: 'g6-t8',
        goals: ['Nhận biết sự kiện', 'Tính xác suất thực nghiệm'],
        basic: ['Sự kiện trong trò chơi đơn giản', 'Công thức xác suất thực nghiệm', 'Tung đồng xu, gieo xúc xắc'],
        advanced: ['So sánh xác suất thực nghiệm khi số lần thử tăng', 'Bài toán rút thẻ nhiều điều kiện'],
      },
    ],
  },
  {
    id: 'c6-5', grade: 6, roman: 'V', name: 'PHÂN SỐ VÀ SỐ THẬP PHÂN', term: 'HK2',
    review: ['Nâng cao về phân số'],
    lessons: [
      {
        code: 'S1', title: 'Phân số — Rút gọn, quy đồng, so sánh', topicId: 'g6-t4',
        goals: ['Rút gọn về tối giản', 'Quy đồng và so sánh'],
        basic: ['Phân số với tử và mẫu nguyên', 'Hai phân số bằng nhau', 'Rút gọn, quy đồng mẫu', 'So sánh phân số'],
        advanced: ['So sánh phân số bằng phân số trung gian', 'So sánh phần bù với 1', 'Tìm phân số nằm giữa hai phân số'],
      },
      {
        code: 'S2', title: 'Các phép tính với phân số', topicId: 'g6-t4',
        goals: ['Bốn phép tính thành thạo', 'Tính hợp lí'],
        basic: ['Cộng, trừ cùng mẫu và khác mẫu', 'Nhân, chia phân số', 'Số đối, số nghịch đảo', 'Hỗn số'],
        advanced: ['Tính hợp lí bằng đặt nhân tử chung', 'Tổng dãy phân số có quy luật (sai phân)', 'Tìm $x$ với phân số'],
      },
      {
        code: 'S3', title: 'Hai bài toán cơ bản về phân số', topicId: 'g6-t4',
        goals: ['Phân biệt hai chiều nhân / chia', 'Giải bài toán thực tế'],
        basic: ['Tìm giá trị phân số của một số', 'Tìm một số biết giá trị phân số của nó', 'Bài toán đơn giản một bước'],
        advanced: ['Bẫy “phần còn lại” nhiều tầng', 'Bài toán ba giai đoạn', 'Vẽ sơ đồ đoạn thẳng để phân tích'],
      },
      {
        code: 'S4', title: 'Số thập phân — Tỉ số và tỉ số phần trăm', topicId: 'g6-t5',
        goals: ['Bốn phép tính với số thập phân', 'Ba bài toán phần trăm'],
        basic: ['Số thập phân âm; bốn phép tính', 'Làm tròn và ước lượng', 'Tỉ số, tỉ số phần trăm'],
        advanced: ['Bài toán giảm giá liên tiếp', 'Lãi suất, thuế VAT', 'Bài toán tăng – giảm nhiều giai đoạn'],
      },
    ],
  },
  {
    id: 'c6-6', grade: 6, roman: 'VI', name: 'HÌNH HỌC PHẲNG', term: 'HK2',
    review: ['Ôn tập hình học phẳng — phần trắc nghiệm', 'Ôn tập hình học phẳng — phần tự luận'],
    lessons: [
      {
        code: 'S1', title: 'Điểm, đường thẳng, tia', topicId: 'g6-t7',
        goals: ['Nhận biết điểm thuộc đường thẳng', 'Ba điểm thẳng hàng, tia'],
        basic: ['Điểm, đường thẳng; ký hiệu $\\in$, $\\notin$', 'Ba điểm thẳng hàng, điểm nằm giữa', 'Tia, hai tia đối nhau'],
        advanced: ['Đếm số đường thẳng qua $n$ điểm', 'Bài toán về số giao điểm', 'Chứng minh ba điểm thẳng hàng'],
      },
      {
        code: 'S2', title: 'Đoạn thẳng, độ dài, trung điểm của đoạn thẳng', topicId: 'g6-t7',
        goals: ['Hệ thức cộng đoạn thẳng', 'Chứng minh trung điểm'],
        basic: ['Đoạn thẳng và độ dài', '$AM+MB=AB$ khi $M$ nằm giữa', 'Trung điểm: hai điều kiện'],
        advanced: ['Bài toán nhiều điểm trên một tia', 'Chứng minh trung điểm qua nhiều bước', 'Tính độ dài dựa vào tỉ lệ'],
      },
      {
        code: 'S3', title: 'Góc, số đo góc', topicId: 'g6-t7',
        goals: ['Đo và vẽ góc', 'Hệ thức cộng góc'],
        basic: ['Góc, đỉnh, cạnh; đo góc bằng thước đo độ', 'Phân loại góc: nhọn, vuông, tù, bẹt', 'Hệ thức cộng góc'],
        advanced: ['Tia phân giác và bài toán tính góc', 'Bài toán nhiều tia chung gốc', 'Đếm số góc tạo bởi $n$ tia'],
      },
    ],
  },
];

/* ============================== KHỐI 7 ============================== */

const G7: Chapter[] = [
  {
    id: 'c7-1', grade: 7, roman: 'I', name: 'SỐ HỮU TỈ', term: 'HK1',
    lessons: [
      { code: 'S1', title: 'Tập hợp số hữu tỉ', topicId: 'g7-t1',
        goals: ['Nhận biết số hữu tỉ', 'Biểu diễn và so sánh'],
        basic: ['Số hữu tỉ, biểu diễn trên trục số', 'So sánh hai số hữu tỉ', 'Số đối'],
        advanced: ['So sánh bằng phân số trung gian', 'Tìm số hữu tỉ thoả điều kiện'] },
      { code: 'S2+S3', title: 'Các phép tính với số hữu tỉ', topicId: 'g7-t1',
        goals: ['Bốn phép tính', 'Tính hợp lí'],
        basic: ['Cộng, trừ, nhân, chia số hữu tỉ', 'Quy tắc chuyển vế', 'Thứ tự thực hiện phép tính'],
        advanced: ['Tính hợp lí biểu thức dài', 'Tìm $x$ nhiều lớp', 'Tổng dãy có quy luật'] },
      { code: 'S4', title: 'Lũy thừa của một số hữu tỉ', topicId: 'g7-t1',
        goals: ['Nắm các quy tắc lũy thừa'],
        basic: ['$x^{m}x^{n}$, $x^{m}:x^{n}$, $(x^{m})^{n}$', '$(xy)^{n}$ và $\\left(\\f{x}{y}\\right)^{n}$'],
        advanced: ['So sánh hai lũy thừa lớn', 'Tìm $x$ trong đẳng thức lũy thừa', 'Tính tổng lũy thừa'] },
    ],
  },
  {
    id: 'c7-2', grade: 7, roman: 'II', name: 'SỐ THỰC', term: 'HK1',
    lessons: [
      { code: 'S1', title: 'Số vô tỉ — Căn bậc hai số học', topicId: 'g7-t1',
        goals: ['Phân biệt số hữu tỉ và vô tỉ', 'Tính căn bậc hai số học'],
        basic: ['Số thập phân vô hạn không tuần hoàn', 'Căn bậc hai số học', 'Tập hợp $\\R$'],
        advanced: ['Chứng minh một số là vô tỉ', 'So sánh biểu thức chứa căn', 'Ước lượng giá trị căn'] },
      { code: 'S2', title: 'Giá trị tuyệt đối — Làm tròn và ước lượng', topicId: 'g7-t1',
        goals: ['Định nghĩa hai nhánh', 'Làm tròn theo yêu cầu'],
        basic: ['$\\abs{x}$ và tính chất', 'Phương trình $\\abs{A}=a$', 'Làm tròn, ước lượng'],
        advanced: ['Phương trình chứa nhiều dấu giá trị tuyệt đối', 'Tìm GTNN của biểu thức chứa $\\abs{\\ }$', 'Bất đẳng thức $\\abs{a}+\\abs{b}\\ge\\abs{a+b}$'] },
    ],
  },
  {
    id: 'c7-3', grade: 7, roman: 'III', name: 'HÌNH HỌC TRỰC QUAN', term: 'HK1',
    lessons: [
      { code: 'S1', title: 'Hình hộp chữ nhật — Hình lập phương', topicId: 'g7-t6',
        goals: ['Mô tả các yếu tố', 'Tính diện tích, thể tích'],
        basic: ['Đỉnh, cạnh, mặt, đường chéo', '$S_{xq}$, $S_{tp}$, $V$'],
        advanced: ['Bài toán bể nước, thùng carton', 'Bẫy đổi đơn vị lít'] },
      { code: 'S2', title: 'Lăng trụ đứng tam giác, tứ giác', topicId: 'g7-t6',
        goals: ['Nhận biết lăng trụ đứng', 'Tính diện tích xung quanh và thể tích'],
        basic: ['Yếu tố của lăng trụ đứng', '$S_{xq}=C\\cdot h$ ; $V=S\\cdot h$'],
        advanced: ['Bài toán lều trại, máng nước', 'Vật thể ghép nhiều khối'] },
    ],
  },
  {
    id: 'c7-4', grade: 7, roman: 'IV', name: 'GÓC — ĐƯỜNG THẲNG SONG SONG', term: 'HK1',
    lessons: [
      { code: 'S1', title: 'Góc đối đỉnh — Hai đường thẳng vuông góc', topicId: 'g7-t4',
        goals: ['Tính chất góc đối đỉnh', 'Đường trung trực'],
        basic: ['Hai góc kề bù, hai góc đối đỉnh', 'Hai đường thẳng vuông góc', 'Đường trung trực của đoạn thẳng'],
        advanced: ['Bài toán tính góc nhiều bước', 'Chứng minh vuông góc'] },
      { code: 'S2', title: 'Hai đường thẳng song song — Tiên đề Euclid', topicId: 'g7-t4',
        goals: ['Phân biệt dấu hiệu và tính chất', 'Vận dụng tiên đề Euclid'],
        basic: ['Các cặp góc so le trong, đồng vị, trong cùng phía', 'Dấu hiệu nhận biết hai đường song song', 'Tính chất hai đường song song'],
        advanced: ['Kỹ thuật kẻ đường phụ song song', 'Chứng minh song song qua trung gian', 'Bài toán tính góc có điểm gãy'] },
      { code: 'S3', title: 'Định lí — Chứng minh định lí', topicId: 'g7-t4',
        goals: ['Viết giả thiết – kết luận', 'Trình bày một chứng minh'],
        basic: ['Cấu trúc “Nếu … thì …”', 'Viết GT/KL bằng ký hiệu'],
        advanced: ['Chứng minh định lí về quan hệ vuông góc – song song'] },
    ],
  },
  {
    id: 'c7-5', grade: 7, roman: 'V', name: 'MỘT SỐ YẾU TỐ THỐNG KÊ VÀ XÁC SUẤT', term: 'HK1',
    lessons: [
      { code: 'S1', title: 'Thu thập, phân loại và biểu diễn dữ liệu', topicId: 'g7-t7',
        goals: ['Chọn biểu đồ phù hợp'],
        basic: ['Bảng thống kê', 'Biểu đồ đoạn thẳng', 'Biểu đồ hình quạt tròn'],
        advanced: ['Phân tích và nhận xét số liệu', 'Phát hiện dữ liệu không đại diện'] },
      { code: 'S2', title: 'Biến cố và xác suất của biến cố', topicId: 'g7-t7',
        goals: ['Phân loại biến cố', 'Tính xác suất'],
        basic: ['Biến cố chắc chắn, không thể, ngẫu nhiên', '$P(A)=\\f{m}{k}$'],
        advanced: ['Bài toán rút thẻ, gieo xúc xắc nhiều điều kiện', 'Dùng biến cố đối'] },
    ],
  },
  {
    id: 'c7-6', grade: 7, roman: 'VI', name: 'BIỂU THỨC ĐẠI SỐ — TỈ LỆ THỨC', term: 'HK2',
    lessons: [
      { code: 'S1', title: 'Tỉ lệ thức — Dãy tỉ số bằng nhau', topicId: 'g7-t2',
        goals: ['Tính chất tỉ lệ thức', 'Tính chất dãy tỉ số bằng nhau'],
        basic: ['Tích chéo $ad=bc$', 'Dãy tỉ số bằng nhau với tổng, hiệu', 'Tìm $x$, $y$'],
        advanced: ['Dãy tỉ số có hệ số', 'Điều kiện là tích: đặt tham số $t$', 'Chia tỉ lệ nhiều tầng'] },
      { code: 'S2', title: 'Đại lượng tỉ lệ thuận, tỉ lệ nghịch', topicId: 'g7-t2',
        goals: ['Phân biệt hai loại tỉ lệ', 'Giải bài toán thực tế'],
        basic: ['$y=kx$ và $xy=a$', 'Bảng giá trị tương ứng', 'Bài toán chia phần'],
        advanced: ['Bài toán người – việc – thời gian', 'Chia tỉ lệ nghịch', 'Bài toán chuyển động'] },
      { code: 'S3', title: 'Biểu thức đại số — Đa thức một biến', topicId: 'g7-t3',
        goals: ['Thu gọn, sắp xếp, xác định bậc'],
        basic: ['Giá trị của biểu thức', 'Đơn thức, đa thức một biến', 'Thu gọn và sắp xếp'],
        advanced: ['Xác định hệ số theo điều kiện', 'Bài toán về bậc của đa thức'] },
      { code: 'S4', title: 'Phép tính với đa thức một biến — Nghiệm của đa thức', topicId: 'g7-t3',
        goals: ['Cộng, trừ, nhân, chia đa thức', 'Tìm nghiệm'],
        basic: ['Cộng, trừ theo cột', 'Nhân đa thức', 'Nghiệm của đa thức bậc nhất'],
        advanced: ['Chia đa thức có dư', 'Định lí Bézout: tìm tham số', 'Chứng minh đa thức vô nghiệm'] },
    ],
  },
  {
    id: 'c7-7', grade: 7, roman: 'VII', name: 'TAM GIÁC', term: 'HK2',
    review: ['Ôn tập các trường hợp bằng nhau trong tam giác'],
    lessons: [
      { code: 'S1', title: 'Tổng ba góc trong một tam giác', topicId: 'g7-t5',
        goals: ['Định lí tổng ba góc', 'Góc ngoài của tam giác'],
        basic: ['Tổng ba góc bằng $180\\deg$', 'Góc ngoài bằng tổng hai góc trong không kề', 'Tam giác vuông: hai góc nhọn phụ nhau'],
        advanced: ['Bài toán tính góc nhiều bước', 'Tam giác có góc theo tỉ lệ', 'Chứng minh quan hệ giữa các góc'] },
      { code: 'S2', title: 'Hai tam giác bằng nhau — Trường hợp c.c.c', topicId: 'g7-t5',
        goals: ['Ký hiệu hai tam giác bằng nhau', 'Chứng minh theo c.c.c'],
        basic: ['Định nghĩa hai tam giác bằng nhau', 'Trường hợp c.c.c', 'Suy ra cạnh và góc tương ứng'],
        advanced: ['Chứng minh hai đoạn thẳng, hai góc bằng nhau qua c.c.c', 'Bài toán có trung điểm'] },
      { code: 'S3', title: 'Trường hợp c.g.c và g.c.g', topicId: 'g7-t5',
        goals: ['Chọn đúng trường hợp bằng nhau'],
        basic: ['Trường hợp c.g.c (góc xen giữa)', 'Trường hợp g.c.g (cạnh xen giữa)', 'Quy trình 4 bước trình bày'],
        advanced: ['Bài toán có tia đối, góc đối đỉnh', 'Chứng minh song song từ hai tam giác bằng nhau', 'Ghép nhiều bước chứng minh'] },
      { code: 'S4', title: 'Các trường hợp bằng nhau của tam giác vuông', topicId: 'g7-t5',
        goals: ['Bốn trường hợp riêng của tam giác vuông'],
        basic: ['Hai cạnh góc vuông', 'Cạnh góc vuông – góc nhọn kề', 'Cạnh huyền – góc nhọn', 'Cạnh huyền – cạnh góc vuông'],
        advanced: ['Bài toán có đường cao, đường phân giác', 'Chứng minh cách đều'] },
      { code: 'S5', title: 'Tam giác cân — Đường trung trực', topicId: 'g7-t5',
        goals: ['Tính chất tam giác cân, đều', 'Tính chất đường trung trực'],
        basic: ['Tam giác cân: hai cạnh bên, hai góc đáy', 'Tam giác đều', 'Đường trung trực và tính chất cách đều'],
        advanced: ['Bốn đường trùng nhau trong tam giác cân', 'Chứng minh tam giác cân qua nhiều bước', 'Bài toán về tia đối và góc kề bù'] },
    ],
  },
  {
    id: 'c7-8', grade: 7, roman: 'VIII', name: 'QUAN HỆ GIỮA CÁC YẾU TỐ TRONG TAM GIÁC', term: 'HK2',
    lessons: [
      { code: 'S1', title: 'Quan hệ giữa góc và cạnh đối diện — Bất đẳng thức tam giác', topicId: 'g7-t5',
        goals: ['So sánh cạnh và góc', 'Vận dụng bất đẳng thức tam giác'],
        basic: ['Góc lớn hơn đối diện cạnh lớn hơn', '$\\abs{b-c}<a<b+c$', 'Xét ba độ dài có lập thành tam giác'],
        advanced: ['Tìm miền giá trị của cạnh thứ ba', 'Bài toán chu vi tam giác cân có điều kiện', 'Chứng minh bất đẳng thức về độ dài'] },
      { code: 'S2', title: 'Đường vuông góc và đường xiên', topicId: 'g7-t5',
        goals: ['So sánh đường vuông góc và đường xiên'],
        basic: ['Đường vuông góc ngắn nhất', 'Quan hệ giữa đường xiên và hình chiếu'],
        advanced: ['Bài toán cực trị khoảng cách', 'Chứng minh bất đẳng thức hình học'] },
      { code: 'S3', title: 'Các đường đồng quy trong tam giác', topicId: 'g7-t5',
        goals: ['Bốn điểm đặc biệt của tam giác'],
        basic: ['Trung tuyến – trọng tâm ($\\f{2}{3}$)', 'Phân giác – tâm nội tiếp', 'Trung trực – tâm ngoại tiếp', 'Đường cao – trực tâm'],
        advanced: ['Bài toán tính độ dài qua trọng tâm', 'Chứng minh ba điểm thẳng hàng', 'Bài toán tổng hợp nhiều đường đồng quy'] },
    ],
  },
];

/* ============================== KHỐI 8 ============================== */

const G8: Chapter[] = [
  {
    id: 'c8-1', grade: 8, roman: 'I', name: 'ĐA THỨC', term: 'HK1',
    lessons: [
      { code: 'S1', title: 'Đơn thức — Đa thức nhiều biến', topicId: 'g8-t1',
        goals: ['Thu gọn, xác định bậc'],
        basic: ['Đơn thức, đơn thức đồng dạng', 'Đa thức nhiều biến, thu gọn, bậc', 'Giá trị của đa thức'],
        advanced: ['Xác định hệ số theo điều kiện', 'Bài toán về bậc của tích, tổng'] },
      { code: 'S2', title: 'Cộng, trừ, nhân, chia đa thức', topicId: 'g8-t1',
        goals: ['Bốn phép tính với đa thức'],
        basic: ['Cộng, trừ đa thức', 'Nhân đơn thức với đa thức, đa thức với đa thức', 'Chia đa thức cho đơn thức'],
        advanced: ['Chứng minh biểu thức không phụ thuộc biến', 'Rút gọn rồi tính giá trị', 'Chia đa thức một biến có dư'] },
    ],
  },
  {
    id: 'c8-2', grade: 8, roman: 'II', name: 'HẰNG ĐẲNG THỨC ĐÁNG NHỚ', term: 'HK1',
    lessons: [
      { code: 'S1', title: 'Hằng đẳng thức 1, 2, 3', topicId: 'g8-t1',
        goals: ['Thuộc và dùng theo hai chiều'],
        basic: ['$(A+B)^{2}$, $(A-B)^{2}$, $A^{2}-B^{2}$', 'Khai triển và rút gọn', 'Tính nhanh giá trị số'],
        advanced: ['Chứng minh đẳng thức', 'Tìm GTNN, GTLN bằng hoàn thành bình phương', 'Chứng minh biểu thức luôn dương'] },
      { code: 'S2', title: 'Hằng đẳng thức 4, 5, 6, 7', topicId: 'g8-t1',
        goals: ['Lập phương và tổng, hiệu hai lập phương'],
        basic: ['$(A\\pm B)^{3}$', '$A^{3}\\pm B^{3}$', 'Khai triển, rút gọn'],
        advanced: ['Rút gọn biểu thức bậc ba phức tạp', 'Chứng minh chia hết', 'Bài toán về $a^{3}+b^{3}+c^{3}-3abc$'] },
      { code: 'S3+S4', title: 'Phân tích đa thức thành nhân tử', topicId: 'g8-t1',
        goals: ['Bốn phương pháp và phối hợp'],
        basic: ['Đặt nhân tử chung', 'Dùng hằng đẳng thức', 'Nhóm hạng tử', 'Tìm $x$ bằng phân tích nhân tử'],
        advanced: ['Tách hạng tử khi $a\\ne1$', 'Thêm bớt hạng tử (Sophie Germain)', 'Đặt ẩn phụ', 'Chứng minh chia hết bằng phân tích'] },
    ],
  },
  {
    id: 'c8-3', grade: 8, roman: 'III', name: 'TỨ GIÁC', term: 'HK1',
    lessons: [
      { code: 'S1', title: 'Tứ giác — Hình thang cân', topicId: 'g8-t5',
        goals: ['Tổng bốn góc, hình thang cân'],
        basic: ['Tổng bốn góc bằng $360\\deg$', 'Hình thang, hình thang cân và dấu hiệu'],
        advanced: ['Bài toán tính góc trong tứ giác', 'Chứng minh hình thang cân'] },
      { code: 'S2', title: 'Hình bình hành', topicId: 'g8-t5',
        goals: ['Năm dấu hiệu nhận biết'],
        basic: ['Tính chất về cạnh, góc, đường chéo', 'Năm dấu hiệu nhận biết'],
        advanced: ['Chứng minh hình bình hành qua đối xứng tâm', 'Bài toán có trung điểm và tia đối'] },
      { code: 'S3', title: 'Hình chữ nhật, hình thoi, hình vuông', topicId: 'g8-t5',
        goals: ['Sơ đồ quan hệ và chiến thuật leo thang'],
        basic: ['Dấu hiệu nhận biết ba hình', 'Trung tuyến ứng với cạnh huyền', 'Đường trung bình'],
        advanced: ['Tìm điều kiện để tứ giác là hình đặc biệt', 'Bài toán tổng hợp nhiều ý', 'Chứng minh ba điểm thẳng hàng'] },
    ],
  },
  {
    id: 'c8-4', grade: 8, roman: 'IV', name: 'ĐỊNH LÍ THALÈS', term: 'HK2',
    lessons: [
      { code: 'S1', title: 'Định lí Thalès — Thalès đảo và hệ quả', topicId: 'g8-t6',
        goals: ['Ba dạng của định lí Thalès'],
        basic: ['Định lí thuận: $\\f{AM}{MB}=\\f{AN}{NC}$', 'Định lí đảo', 'Hệ quả: $\\f{AM}{AB}=\\f{MN}{BC}$'],
        advanced: ['Chia đoạn thẳng theo tỉ lệ cho trước', 'Chứng minh song song bằng Thalès đảo', 'Bài toán có nhiều đường song song'] },
      { code: 'S2', title: 'Đường trung bình — Tính chất đường phân giác', topicId: 'g8-t6',
        goals: ['Đường trung bình tam giác, hình thang', 'Tính chất phân giác'],
        basic: ['Đường trung bình của tam giác, hình thang', '$\\f{DB}{DC}=\\f{AB}{AC}$'],
        advanced: ['Bài toán tính độ dài qua phân giác', 'Kết hợp phân giác với dãy tỉ số bằng nhau'] },
    ],
  },
  {
    id: 'c8-5', grade: 8, roman: 'VI', name: 'PHÂN THỨC ĐẠI SỐ', term: 'HK1',
    lessons: [
      { code: 'S1', title: 'Phân thức — Rút gọn, quy đồng', topicId: 'g8-t2',
        goals: ['Điều kiện xác định và rút gọn'],
        basic: ['Điều kiện xác định', 'Hai phân thức bằng nhau', 'Rút gọn, quy đồng mẫu'],
        advanced: ['Rút gọn phân thức có mẫu bậc cao', 'Chứng minh phân thức không đổi'] },
      { code: 'S2+S3', title: 'Các phép tính với phân thức', topicId: 'g8-t2',
        goals: ['Bốn phép tính và biểu thức tổng hợp'],
        basic: ['Cộng, trừ, nhân, chia phân thức', 'Rút gọn biểu thức hai tầng'],
        advanced: ['Quy trình 5 bước cho biểu thức nhiều tầng', 'Tìm $x$ để $P$ nguyên', 'Xét dấu $P$, tìm cực trị'] },
    ],
  },
  {
    id: 'c8-6', grade: 8, roman: 'VII', name: 'PHƯƠNG TRÌNH BẬC NHẤT MỘT ẨN', term: 'HK2',
    lessons: [
      { code: 'S1', title: 'Phương trình bậc nhất một ẩn', topicId: 'g8-t3',
        goals: ['Giải phương trình đưa được về bậc nhất'],
        basic: ['$ax+b=0$; quy tắc chuyển vế, quy tắc nhân', 'Quy đồng khử mẫu', 'Phương trình tích'],
        advanced: ['Phương trình chứa ẩn ở mẫu và điều kiện xác định', 'Phương trình chứa tham số', 'Phương trình chứa dấu giá trị tuyệt đối'] },
      { code: 'S2+S3', title: 'Giải bài toán bằng cách lập phương trình', topicId: 'g8-t3',
        goals: ['Sáu bước chuẩn', 'Ba mô hình bài toán'],
        basic: ['Sáu bước giải', 'Bài toán về số, về tuổi', 'Bài toán chuyển động cơ bản'],
        advanced: ['Bài toán năng suất (làm chung – làm riêng)', 'Bài toán ca nô xuôi ngược dòng', 'Bài toán phần trăm sản lượng'] },
      { code: 'S4', title: 'Hàm số bậc nhất và đồ thị', topicId: 'g8-t4',
        goals: ['Vẽ đồ thị, xác định hệ số góc'],
        basic: ['Mặt phẳng toạ độ', '$y=ax+b$, hệ số góc', 'Vẽ đồ thị qua hai điểm'],
        advanced: ['Xác định hàm số qua hai điểm', 'Vị trí tương đối hai đường thẳng', 'Bài toán tham số về đường thẳng'] },
    ],
  },
  {
    id: 'c8-7', grade: 8, roman: 'VIII', name: 'XÁC SUẤT CỦA BIẾN CỐ', term: 'HK1',
    lessons: [
      { code: 'S1', title: 'Dữ liệu và biểu đồ', topicId: 'g8-t8',
        goals: ['Chọn và đọc biểu đồ phù hợp'],
        basic: ['Thu thập, phân loại dữ liệu', 'Biểu đồ cột, cột kép, đoạn thẳng, quạt tròn'],
        advanced: ['Phát hiện dữ liệu không hợp lí', 'Phân tích số liệu và viết nhận xét'] },
      { code: 'S2', title: 'Xác suất lí thuyết và xác suất thực nghiệm', topicId: 'g8-t8',
        goals: ['Phân biệt hai loại xác suất'],
        basic: ['$P(A)=\\f{m}{k}$ trong mô hình đồng khả năng', 'Xác suất thực nghiệm'],
        advanced: ['Ước lượng tần số: $n\\cdot P(A)$', 'Phép thử hai giai đoạn, sơ đồ cây'] },
    ],
  },
  {
    id: 'c8-8', grade: 8, roman: 'IX', name: 'TAM GIÁC ĐỒNG DẠNG', term: 'HK2',
    lessons: [
      { code: 'S1', title: 'Hai tam giác đồng dạng — Ba trường hợp', topicId: 'g8-t6',
        goals: ['Chứng minh đồng dạng theo c.c.c, c.g.c, g.g'],
        basic: ['Định nghĩa và tỉ số đồng dạng', 'Ba trường hợp đồng dạng', 'Trường hợp đồng dạng của tam giác vuông'],
        advanced: ['Chuỗi đồng dạng bắc cầu', 'Chứng minh hệ thức tích', 'Tỉ số chu vi, tỉ số diện tích $k^{2}$'] },
      { code: 'S2', title: 'Ứng dụng của tam giác đồng dạng', topicId: 'g8-t6',
        goals: ['Đo gián tiếp, giải bài toán thực tế'],
        basic: ['Đo chiều cao, khoảng cách gián tiếp', 'Bài toán bóng nắng'],
        advanced: ['Bài toán tỉ số diện tích với điểm chia cạnh', 'Cực trị hình học'] },
      { code: 'S3', title: 'Định lí Pythagore — Hình chóp đều', topicId: 'g8-t7',
        goals: ['Pythagore thuận, đảo; hình chóp đều'],
        basic: ['$a^{2}=b^{2}+c^{2}$; bộ ba Pythagore', 'Pythagore đảo', 'Hình chóp tam giác đều, tứ giác đều'],
        advanced: ['Bài toán thang dựa tường, đường chéo', '$S_{xq}=p\\cdot d$; $V=\\f{1}{3}Sh$', 'Vật thể ghép nhiều khối'] },
    ],
  },
];

/* ============================== KHỐI 9 ============================== */

const G9: Chapter[] = [
  {
    id: 'c9-1', grade: 9, roman: 'I', name: 'PHƯƠNG TRÌNH VÀ HỆ HAI PHƯƠNG TRÌNH BẬC NHẤT HAI ẨN', term: 'HK1',
    lessons: [
      { code: 'S1', title: 'Phương trình và hệ hai phương trình bậc nhất hai ẩn', topicId: 'g9-t1',
        goals: ['Giải hệ bằng hai phương pháp'],
        basic: ['Nghiệm của phương trình bậc nhất hai ẩn', 'Phương pháp thế', 'Phương pháp cộng đại số'],
        advanced: ['Hệ có ẩn ở mẫu — đặt ẩn phụ', 'Hệ chứa tham số: biện luận số nghiệm', 'Hệ đối xứng đơn giản'] },
      { code: 'S2+S3', title: 'Giải bài toán bằng cách lập hệ phương trình', topicId: 'g9-t1',
        goals: ['Sáu bước chuẩn với hai ẩn'],
        basic: ['Bài toán về số, về tuổi', 'Bài toán chuyển động', 'Bài toán năng suất cơ bản'],
        advanced: ['Bài toán hai vòi nước', 'Bài toán ca nô xuôi ngược dòng', 'Bài toán phần trăm hai đại lượng'] },
    ],
  },
  {
    id: 'c9-2', grade: 9, roman: 'II', name: 'CĂN BẬC HAI VÀ CĂN BẬC BA', term: 'HK1',
    lessons: [
      { code: 'S1', title: 'Căn bậc hai — Căn thức bậc hai', topicId: 'g9-t2',
        goals: ['Điều kiện xác định', 'Hằng đẳng thức $\\s{A^{2}}=\\abs{A}$'],
        basic: ['Căn bậc hai số học; điều kiện có nghĩa', '$\\s{A^{2}}=\\abs{A}$', 'Căn bậc ba'],
        advanced: ['Điều kiện xác định phức tạp (kết hợp mẫu)', 'Rút gọn biểu thức có dấu giá trị tuyệt đối'] },
      { code: 'S2', title: 'Các phép biến đổi căn thức', topicId: 'g9-t2',
        goals: ['Đưa ra/vào dấu căn, khử mẫu, trục căn thức'],
        basic: ['$\\s{A^{2}B}=\\abs{A}\\s{B}$', 'Khử mẫu của biểu thức lấy căn', 'Trục căn thức ở mẫu'],
        advanced: ['Biểu thức liên hợp', 'Rút gọn căn kép $\\s{a\\pm2\\s{b}}$', 'So sánh biểu thức chứa căn'] },
      { code: 'S3+S4', title: 'Rút gọn biểu thức chứa căn và bài toán phụ', topicId: 'g9-t2',
        goals: ['Quy trình 5 bước — câu 1 của đề thi vào 10'],
        basic: ['Đặt $t=\\s{x}$, phân tích mẫu', 'Quy đồng và thu gọn', 'Tính giá trị tại $x=a$'],
        advanced: ['Tìm $x$ để $P$ nguyên', 'So sánh $P$ với một số', 'Tìm GTNN, GTLN của $P$', 'Giải phương trình chứa căn'] },
    ],
  },
  {
    id: 'c9-3', grade: 9, roman: 'III', name: 'BẤT ĐẲNG THỨC VÀ BẤT PHƯƠNG TRÌNH', term: 'HK1',
    lessons: [
      { code: 'S1', title: 'Bất đẳng thức — Bất phương trình bậc nhất một ẩn', topicId: 'g9-t4',
        goals: ['Tính chất bất đẳng thức', 'Giải bất phương trình'],
        basic: ['Tính chất cộng, nhân với số dương/âm', 'Giải bất phương trình bậc nhất', 'Biểu diễn tập nghiệm'],
        advanced: ['Bất phương trình có tham số', 'Tìm nghiệm nguyên', 'Chứng minh bất đẳng thức đơn giản'] },
    ],
  },
  {
    id: 'c9-4', grade: 9, roman: 'IV', name: 'HỆ THỨC LƯỢNG TRONG TAM GIÁC VUÔNG', term: 'HK1',
    lessons: [
      { code: 'S1', title: 'Hệ thức về cạnh và đường cao', topicId: 'g9-t5',
        goals: ['Năm hệ thức lượng'],
        basic: ['$b^{2}=ab\'$, $c^{2}=ac\'$', '$h^{2}=b\'c\'$, $ah=bc$', '$\\f{1}{h^{2}}=\\f{1}{b^{2}}+\\f{1}{c^{2}}$'],
        advanced: ['Bài toán tổng hợp nhiều hệ thức', 'Chứng minh hệ thức bằng đồng dạng'] },
      { code: 'S2', title: 'Tỉ số lượng giác của góc nhọn', topicId: 'g9-t5',
        goals: ['sin, cos, tan, cot và quan hệ'],
        basic: ['Định nghĩa bốn tỉ số', 'Góc phụ nhau', 'Giá trị đặc biệt $30\\deg$, $45\\deg$, $60\\deg$'],
        advanced: ['$\\sin^{2}+\\cos^{2}=1$ và các hệ quả', 'Rút gọn biểu thức lượng giác', 'So sánh tỉ số lượng giác'] },
      { code: 'S3', title: 'Giải tam giác vuông và ứng dụng thực tế', topicId: 'g9-t5',
        goals: ['Giải tam giác vuông', 'Bài toán đo đạc'],
        basic: ['Biết hai cạnh; biết một cạnh một góc', 'Tính đủ các cạnh và góc'],
        advanced: ['Bài toán góc nâng, góc hạ', 'Đo chiều cao toà nhà, cột cờ', 'Bài toán độ dốc'] },
    ],
  },
  {
    id: 'c9-5', grade: 9, roman: 'V', name: 'ĐƯỜNG TRÒN', term: 'HK1',
    lessons: [
      { code: 'S1', title: 'Đường tròn — Dây và đường kính', topicId: 'g9-t6',
        goals: ['Quan hệ đường kính và dây'],
        basic: ['Xác định đường tròn', 'Đường kính vuông góc với dây', 'Dây và khoảng cách tới tâm'],
        advanced: ['Bài toán tính độ dài dây', 'Chứng minh ba điểm cùng thuộc một đường tròn'] },
      { code: 'S2', title: 'Tiếp tuyến của đường tròn', topicId: 'g9-t6',
        goals: ['Tính chất tiếp tuyến; hai tiếp tuyến cắt nhau'],
        basic: ['Vị trí tương đối đường thẳng – đường tròn', 'Tiếp tuyến vuông góc bán kính', 'Hai tiếp tuyến cắt nhau'],
        advanced: ['Bài toán tính độ dài tiếp tuyến', 'Đường tròn nội tiếp tam giác', 'Tiếp tuyến chung của hai đường tròn'] },
      { code: 'S3+S4', title: 'Góc với đường tròn — Tứ giác nội tiếp', topicId: 'g9-t6',
        goals: ['Các loại góc; chứng minh tứ giác nội tiếp'],
        basic: ['Góc ở tâm, góc nội tiếp', 'Góc tạo bởi tiếp tuyến và dây cung', 'Dấu hiệu tứ giác nội tiếp'],
        advanced: ['Góc có đỉnh trong / ngoài đường tròn', 'Hệ thức phương tích $MT^{2}=MA\\cdot MB$', 'Câu hình 4 ý theo cấu trúc thi vào 10'] },
      { code: 'S5', title: 'Độ dài cung — Diện tích hình quạt — Đa giác đều', topicId: 'g9-t6',
        goals: ['Công thức cung và quạt tròn'],
        basic: ['$l=\\f{\\pi Rn}{180}$', '$S_{quat}=\\f{\\pi R^{2}n}{360}$', 'Đa giác đều nội tiếp'],
        advanced: ['Diện tích hình viên phân, hình vành khăn', 'Bài toán thực tế về cung tròn'] },
    ],
  },
  {
    id: 'c9-6', grade: 9, roman: 'VI', name: 'HÀM SỐ y = ax² VÀ PHƯƠNG TRÌNH BẬC HAI', term: 'HK2',
    lessons: [
      { code: 'S1', title: 'Hàm số $y=ax^{2}$ và đồ thị', topicId: 'g9-t3',
        goals: ['Vẽ parabol, xác định tính chất'],
        basic: ['Tính chất hàm số $y=ax^{2}$', 'Bảng giá trị và vẽ đồ thị', 'Điểm thuộc đồ thị'],
        advanced: ['Tìm $a$ khi biết điểm thuộc đồ thị', 'Bài toán về giao điểm với đường thẳng'] },
      { code: 'S2', title: 'Phương trình bậc hai một ẩn', topicId: 'g9-t3',
        goals: ['Công thức nghiệm và nhẩm nghiệm'],
        basic: ['$\\Delta=b^{2}-4ac$; công thức nghiệm', 'Công thức nghiệm thu gọn', 'Nhẩm nghiệm khi $a\\pm b+c=0$'],
        advanced: ['Phương trình trùng phương', 'Phương trình quy về bậc hai (đặt ẩn phụ)', 'Phương trình chứa tham số'] },
      { code: 'S3+S4', title: 'Hệ thức Viète và ứng dụng', topicId: 'g9-t3',
        goals: ['Quy trình 3 bước cho câu phân loại'],
        basic: ['$S=-\\f{b}{a}$, $P=\\f{c}{a}$', 'Tính biểu thức đối xứng', 'Tìm hai số biết tổng và tích'],
        advanced: ['Điều kiện về dấu và vị trí nghiệm', 'Hệ thức không đối xứng ($x_1=kx_2$)', 'Hệ thức độc lập với tham số', 'Tương giao parabol – đường thẳng'] },
    ],
  },
  {
    id: 'c9-7', grade: 9, roman: 'VII', name: 'HÌNH TRỤ — HÌNH NÓN — HÌNH CẦU', term: 'HK2',
    lessons: [
      { code: 'S1', title: 'Hình trụ, hình nón, hình cầu', topicId: 'g9-t7',
        goals: ['Công thức diện tích và thể tích'],
        basic: ['Hình trụ: $S_{xq}=2\\pi rh$, $V=\\pi r^{2}h$', 'Hình nón: $S_{xq}=\\pi rl$, $V=\\f{1}{3}\\pi r^{2}h$', 'Hình cầu: $S=4\\pi R^{2}$, $V=\\f{4}{3}\\pi R^{3}$'],
        advanced: ['$l^{2}=r^{2}+h^{2}$; mặt cắt qua trục', 'Vật thể ghép nhiều khối', 'Bài toán thực tế về bể chứa, phễu'] },
    ],
  },
  {
    id: 'c9-8', grade: 9, roman: 'VIII', name: 'THỐNG KÊ VÀ XÁC SUẤT', term: 'HK1',
    lessons: [
      { code: 'S1', title: 'Bảng tần số, tần số tương đối và biểu đồ', topicId: 'g9-t8',
        goals: ['Lập bảng tần số và vẽ biểu đồ'],
        basic: ['Tần số, tần số tương đối', 'Bảng ghép nhóm', 'Biểu đồ tần số tương đối'],
        advanced: ['Phân tích và so sánh hai mẫu số liệu', 'Nhận xét xu hướng'] },
      { code: 'S2', title: 'Phép thử ngẫu nhiên và xác suất', topicId: 'g9-t8',
        goals: ['Không gian mẫu, xác suất biến cố'],
        basic: ['Phép thử, kết quả có thể', '$P(A)=\\f{m}{k}$'],
        advanced: ['Phép thử hai giai đoạn, sơ đồ cây', 'Dùng biến cố đối', 'Bài toán gieo hai xúc xắc'] },
    ],
  },
  {
    id: 'c9-9', grade: 9, roman: 'IX', name: 'TỔNG ÔN THI TUYỂN SINH VÀO LỚP 10', term: 'HK2',
    review: ['Bộ đề luyện thi 100 đề khối 9', 'Đề thi thử theo cấu trúc Sở GD&ĐT'],
    lessons: [
      { code: 'CĐ1', title: 'Chuyên đề 1 — Rút gọn và tính giá trị biểu thức', topicId: 'g9-t2',
        goals: ['Lấy trọn điểm câu 1 (2,0 điểm)'],
        basic: ['Rút gọn biểu thức chứa căn', 'Tính giá trị tại $x=a$'],
        advanced: ['Tìm $x$ để $P$ nguyên, $P>0$, $P<k$', 'Tìm GTNN, GTLN của $P$'] },
      { code: 'CĐ2', title: 'Chuyên đề 2 — Hệ phương trình bậc nhất hai ẩn', topicId: 'g9-t1',
        goals: ['Giải hệ và biện luận'],
        basic: ['Giải hệ bằng thế và cộng đại số', 'Hệ có ẩn phụ'],
        advanced: ['Hệ chứa tham số', 'Hệ đối xứng'] },
      { code: 'CĐ3', title: 'Chuyên đề 3 — Phương trình bậc hai và hệ thức Viète', topicId: 'g9-t3',
        goals: ['Lấy trọn điểm câu phân loại'],
        basic: ['Giải phương trình bậc hai', 'Tính biểu thức đối xứng'],
        advanced: ['Bài toán tham số ba bước', 'Tương giao parabol – đường thẳng'] },
      { code: 'CĐ4', title: 'Chuyên đề 4 — Giải bài toán bằng cách lập phương trình, hệ phương trình', topicId: 'g9-t1',
        goals: ['Trình bày đủ sáu bước'],
        basic: ['Bài toán chuyển động, năng suất', 'Bài toán về số'],
        advanced: ['Bài toán hai vòi nước, xuôi ngược dòng', 'Bài toán phần trăm, hình học'] },
      { code: 'CĐ5', title: 'Chuyên đề 5 — Hình học tổng hợp (câu 4 thi vào 10)', topicId: 'g9-t6',
        goals: ['Làm trọn vẹn 3 ý đầu, thử sức ý d'],
        basic: ['Chứng minh tứ giác nội tiếp', 'Chứng minh hệ thức, tam giác đồng dạng'],
        advanced: ['Tính độ dài, diện tích', 'Điểm cố định, quỹ tích, cực trị hình học'] },
    ],
  },
];

export const ALL_CHAPTERS: Chapter[] = [...G6, ...G7, ...G8, ...G9];

export const chaptersOfGrade = (g: Grade): Chapter[] => ALL_CHAPTERS.filter((c) => c.grade === g);

export const lessonsOfTopic = (topicId: string): { chapter: Chapter; lesson: Lesson }[] =>
  ALL_CHAPTERS.flatMap((c) => c.lessons.filter((l) => l.topicId === topicId).map((l) => ({ chapter: c, lesson: l })));

/** Khẩu hiệu in ở cuối mọi phiếu bài tập của GITA. */
export const GITA_SLOGAN = 'TÔI TỰ TIN CHINH PHỤC 10 ĐIỂM TOÁN, TÔI YÊU TOÁN';
export const GITA_FULL_NAME = 'HỌC VIỆN PHÁT TRIỂN TOÀN CẦU — GITA';
