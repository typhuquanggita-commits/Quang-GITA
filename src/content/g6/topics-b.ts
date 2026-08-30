import type { Topic } from '@/types';

/* MATHGITA — CHUYÊN ĐỀ TOÁN 6 (phần 2): Số nguyên, Phân số, Số thập phân,
   Hình học trực quan, Hình học phẳng, Thống kê & Xác suất. */

export const G6_TOPICS_B: Topic[] = [
  {
    id: 'g6-t3',
    grade: 6, term: 'HK1', strand: 'SO_DAI_SO', order: 3,
    name: 'Số nguyên — Quy tắc dấu',
    summary: 'Tập hợp số nguyên, thứ tự trên trục số, bốn phép tính với số nguyên, quy tắc dấu ngoặc, bội và ước của số nguyên.',
    outcomes: [
      'Nhận biết số nguyên âm, biểu diễn số nguyên trên trục số, so sánh hai số nguyên.',
      'Thực hiện thành thạo cộng, trừ, nhân, chia số nguyên và vận dụng quy tắc dấu.',
      'Vận dụng quy tắc dấu ngoặc, quy tắc chuyển vế để tính hợp lí và tìm $x$.',
      'Giải bài toán thực tiễn có số âm: nhiệt độ, độ cao, thu – chi.',
    ],
    theory: [
      {
        heading: '1. Tập hợp số nguyên và thứ tự',
        body: ['$\\Z=\\{\\dots;-3;-2;-1;0;1;2;3;\\dots\\}$ gồm số nguyên âm, số 0 và số nguyên dương.'],
        formulas: [
          'Trên trục số nằm ngang, số bên **trái** luôn **nhỏ hơn** số bên phải.',
          'Mọi số nguyên âm đều nhỏ hơn 0 và nhỏ hơn mọi số nguyên dương.',
          '$\\abs{a}$ là khoảng cách từ điểm $a$ tới điểm 0 trên trục số, luôn $\\ge 0$.',
        ],
        caution: ['$-10<-2$ vì càng “âm sâu” càng nhỏ — đây là lỗi so sánh phổ biến nhất.'],
      },
      {
        heading: '2. Cộng, trừ số nguyên',
        body: ['Chỉ cần nhớ hai trường hợp: cùng dấu và khác dấu.'],
        formulas: [
          'Cùng dấu: cộng hai giá trị tuyệt đối, giữ nguyên dấu chung.',
          'Khác dấu: lấy giá trị tuyệt đối lớn trừ giá trị tuyệt đối nhỏ, dấu theo số có giá trị tuyệt đối lớn hơn.',
          '$a-b=a+(-b)$',
          '$a+(-a)=0$ (hai số đối nhau)',
        ],
      },
      {
        heading: '3. Nhân, chia số nguyên — quy tắc dấu',
        body: ['Quy tắc dấu là công cụ dùng suốt từ lớp 6 đến lớp 12.'],
        formulas: [
          '$(+)\\cdot(+)=(+)$ ; $(-)\\cdot(-)=(+)$',
          '$(+)\\cdot(-)=(-)$ ; $(-)\\cdot(+)=(-)$',
          'Tích có **chẵn** thừa số âm thì mang dấu dương; có **lẻ** thừa số âm thì mang dấu âm.',
        ],
        caution: ['$(-2)^{4}=16$ nhưng $-2^{4}=-16$ — dấu ngoặc quyết định tất cả.'],
      },
      {
        heading: '4. Quy tắc dấu ngoặc và chuyển vế',
        body: [],
        formulas: [
          'Bỏ ngoặc đằng trước có dấu “$+$”: giữ nguyên dấu mọi số hạng.',
          'Bỏ ngoặc đằng trước có dấu “$-$”: **đổi dấu** mọi số hạng bên trong.',
          'Chuyển một số hạng từ vế này sang vế kia thì phải **đổi dấu** số hạng đó.',
        ],
      },
    ],
    decode: [
      { signal: 'Có nhiều dấu ngoặc lồng và dấu trừ đứng trước ngoặc', action: 'Bỏ ngoặc theo quy tắc dấu, đổi dấu toàn bộ số hạng bên trong.', why: 'Sót một dấu là sai cả bài — nên bỏ ngoặc từng lớp một.' },
      { signal: 'Tổng có nhiều số đối nhau', action: 'Nhóm các cặp đối nhau cho triệt tiêu trước.', why: 'Đề luôn cài sẵn cặp $a$ và $-a$ để rút ngắn phép tính.' },
      { signal: 'Đề nói “giảm”, “lỗ”, “dưới mực nước biển”, “trước Công nguyên”', action: 'Biểu diễn bằng số nguyên âm.', why: 'Dịch đúng ngôn ngữ thực tế sang số âm là nửa lời giải.' },
      { signal: 'Tích nhiều thừa số âm', action: 'Đếm số thừa số âm: chẵn → dương, lẻ → âm; sau đó nhân các giá trị tuyệt đối.', why: 'Tách riêng dấu và độ lớn giúp không sai dấu.' },
    ],
    mindmap: {
      root: 'SỐ NGUYÊN',
      branches: [
        { title: 'Tập hợp $\\Z$', items: ['Số âm, 0, số dương', 'Trục số', 'Số đối', 'Giá trị tuyệt đối'] },
        { title: 'Cộng — Trừ', items: ['Cùng dấu / khác dấu', '$a-b=a+(-b)$', 'Tính chất giao hoán, kết hợp'] },
        { title: 'Nhân — Chia', items: ['Quy tắc dấu', 'Đếm thừa số âm', 'Lũy thừa số âm'] },
        { title: 'Quy tắc', items: ['Dấu ngoặc', 'Chuyển vế', 'Tìm $x$'] },
        { title: 'Ứng dụng', items: ['Nhiệt độ', 'Độ cao', 'Thu – chi, lãi – lỗ'] },
      ],
    },
    practiceSkills: [
      { title: 'Kỹ năng tách dấu và độ lớn', detail: ['Bước 1: xác định dấu của kết quả.', 'Bước 2: tính với các giá trị tuyệt đối.', 'Bước 3: ghép dấu vào kết quả.'] },
      { title: 'Kỹ năng tính hợp lí với số nguyên', detail: ['Nhóm số đối nhau trước.', 'Nhóm số cùng dấu lại rồi cộng một lần.', 'Đưa về dạng $a(b+c)$ khi có thừa số chung.'] },
    ],
    types: [
      {
        id: 'g6-t3-d1', name: 'Dạng 1. So sánh và sắp thứ tự số nguyên', level: 'NB',
        method: ['Đưa về cùng dạng, dùng trục số hoặc quy tắc: âm < 0 < dương.', 'Với hai số âm: số nào có giá trị tuyệt đối lớn hơn thì nhỏ hơn.'],
        pitfalls: ['So sánh hai số âm theo độ lớn giá trị tuyệt đối.'],
        worked: [{
          prompt: 'Sắp xếp theo thứ tự tăng dần: $-7;\\ 3;\\ 0;\\ -12;\\ 5;\\ -1$.',
          thinking: ['Tách nhóm âm và nhóm dương. Trong nhóm âm, giá trị tuyệt đối càng lớn thì số càng nhỏ.'],
          solution: ['Nhóm âm: $-12;-7;-1$ (vì $12>7>1$).', 'Sau đó là 0, rồi nhóm dương: $3;5$.', 'Kết quả: $-12<-7<-1<0<3<5$.'],
        }],
      },
      {
        id: 'g6-t3-d2', name: 'Dạng 2. Tính hợp lí biểu thức số nguyên', level: 'TH',
        method: ['Bỏ ngoặc đúng quy tắc dấu.', 'Nhóm cặp số đối và nhóm số cùng dấu.', 'Cộng một lần cho mỗi nhóm.'],
        pitfalls: ['Quên đổi dấu khi bỏ ngoặc có dấu trừ phía trước.'],
        worked: [{
          prompt: 'Tính hợp lí: $A=(-125)+118+(-75)+82$.',
          thinking: ['$-125$ và $-75$ cùng dấu, cộng lại tròn trăm. $118+82=200$ cũng tròn trăm.'],
          solution: ['$A=[(-125)+(-75)]+(118+82)$', '$A=(-200)+200=0$.'],
        }],
      },
      {
        id: 'g6-t3-d3', name: 'Dạng 3. Tìm x với số nguyên', level: 'TH',
        method: ['Thu gọn hai vế.', 'Chuyển vế đổi dấu để đưa ẩn về một vế.', 'Chia hệ số, kết luận và thử lại.'],
        pitfalls: ['Chuyển vế mà quên đổi dấu.', 'Chia cho số âm mà giữ nguyên dấu.'],
        worked: [{
          prompt: 'Tìm $x\\in\\Z$: $-3x+15=-2x-4$.',
          thinking: ['Đưa các hạng tử chứa $x$ về vế trái, hằng số về vế phải.'],
          solution: ['$-3x+2x=-4-15$', '$-x=-19$', '$x=19$.', 'Thử lại: $-3\\cdot19+15=-42$ và $-2\\cdot19-4=-42$ (đúng).'],
        }],
      },
      {
        id: 'g6-t3-d4', name: 'Dạng 4. Bài toán thực tế với số âm', level: 'VD',
        method: ['Chọn chiều dương, quy ước dấu cho từng đại lượng.', 'Lập biểu thức theo trình tự thời gian/sự kiện.', 'Tính và trả lời bằng ngôn ngữ thực tế.'],
        worked: [{
          prompt: 'Nhiệt độ ở Sa Pa lúc 6 giờ là $-3\\deg C$, đến 12 giờ tăng thêm $7\\deg C$, đến 22 giờ lại giảm $5\\deg C$. Tính nhiệt độ lúc 22 giờ.',
          thinking: ['“Tăng” là cộng, “giảm” là trừ. Cứ đi theo dòng thời gian.'],
          solution: ['Lúc 12 giờ: $-3+7=4\\ (\\deg C)$.', 'Lúc 22 giờ: $4-5=-1\\ (\\deg C)$.', 'Vậy lúc 22 giờ nhiệt độ là $-1\\deg C$.'],
        }],
      },
      {
        id: 'g6-t3-d5', name: 'Dạng 5. Vận dụng cao — tìm x nguyên để biểu thức nhận giá trị nguyên', level: 'VDC',
        method: ['Tách biểu thức thành phần nguyên cộng phần phân.', 'Điều kiện: mẫu là **ước** của tử còn lại.', 'Liệt kê ước, giải từng trường hợp, đối chiếu điều kiện.'],
        worked: [{
          prompt: 'Tìm các số nguyên $x$ để $A=\\f{2x+7}{x+1}$ nhận giá trị nguyên.',
          thinking: [
            'Tử và mẫu cùng bậc nhất → tách tử theo mẫu để lộ phần dư.',
            '$2x+7=2(x+1)+5$.',
          ],
          solution: [
            'Điều kiện: $x\\ne-1$.',
            '$A=\\f{2(x+1)+5}{x+1}=2+\\f{5}{x+1}$.',
            '$A\\in\\Z\\Leftrightarrow (x+1)$ là ước của 5 $\\Rightarrow x+1\\in\\{-5;-1;1;5\\}$.',
            '$x\\in\\{-6;-2;0;4\\}$ (đều thoả $x\\ne-1$).',
            'Vậy $x\\in\\{-6;-2;0;4\\}$.',
          ],
          remark: 'Kỹ thuật “tách phần nguyên” dùng lại rất nhiều ở lớp 8, lớp 9 khi rút gọn phân thức.',
        }],
      },
    ],
    bank: ['g6.so-nguyen-ss', 'g6.so-nguyen-tinh', 'g6.so-nguyen-timx', 'g6.so-nguyen-tt'],
  },

  {
    id: 'g6-t4',
    grade: 6, term: 'HK2', strand: 'SO_DAI_SO', order: 4,
    name: 'Phân số — Các phép tính và hai bài toán cơ bản',
    summary: 'Phân số với tử và mẫu nguyên, rút gọn, quy đồng, bốn phép tính, hỗn số và hai bài toán cơ bản về phân số.',
    outcomes: [
      'Rút gọn, quy đồng, so sánh phân số.',
      'Thực hiện thành thạo bốn phép tính với phân số, tính hợp lí.',
      'Tìm giá trị phân số của một số cho trước và tìm một số biết giá trị phân số của nó.',
      'Giải bài toán thực tiễn liên quan đến phân số.',
    ],
    theory: [
      {
        heading: '1. Phân số bằng nhau — rút gọn — quy đồng',
        body: ['Phân số $\\f{a}{b}$ với $a,b\\in\\Z$, $b\\ne0$.'],
        formulas: [
          '$\\f{a}{b}=\\f{c}{d}\\Leftrightarrow ad=bc$',
          '$\\f{a}{b}=\\f{a\\cdot m}{b\\cdot m}$ ($m\\ne0$) và $\\f{a}{b}=\\f{a:n}{b:n}$ ($n$ là ước chung)',
          'Rút gọn tối giản: chia cả tử và mẫu cho ƯCLN$(\\abs{a},\\abs{b})$',
          'Mẫu chung nên chọn: BCNN của các mẫu',
        ],
        caution: ['Chỉ được rút gọn theo **thừa số chung**, không rút gọn theo số hạng.'],
      },
      {
        heading: '2. Bốn phép tính với phân số',
        body: [],
        formulas: [
          '$\\f{a}{m}+\\f{b}{m}=\\f{a+b}{m}$ (cùng mẫu)',
          '$\\f{a}{b}\\cdot\\f{c}{d}=\\f{ac}{bd}$',
          '$\\f{a}{b}:\\f{c}{d}=\\f{a}{b}\\cdot\\f{d}{c}$ ($c\\ne0$)',
          'Số đối: $-\\f{a}{b}$ ; Số nghịch đảo: $\\f{b}{a}$ ($a\\ne0$)',
        ],
        caution: ['Chia phân số là **nhân với nghịch đảo**, không phải nghịch đảo cả hai.'],
      },
      {
        heading: '3. Hai bài toán cơ bản về phân số',
        body: ['Đây là hai công thức trụ cột, chi phối phần lớn bài toán thực tế lớp 6.'],
        formulas: [
          'Tìm giá trị phân số của một số: $\\f{m}{n}$ của $a$ là $a\\cdot\\f{m}{n}$',
          'Tìm một số biết giá trị phân số của nó: nếu $\\f{m}{n}$ của $x$ bằng $b$ thì $x=b:\\f{m}{n}$',
          'Tỉ số phần trăm của $a$ và $b$: $\\f{a}{b}\\cdot100\\percent$',
        ],
        caution: ['Đọc kỹ: “của” → nhân; “biết … bằng” → chia. Nhầm hai chiều này là mất trọn điểm.'],
      },
    ],
    decode: [
      { signal: 'Đề có chữ “của” giữa phân số và một số', action: 'Nhân: $a\\cdot\\f{m}{n}$.', why: 'Đây là bài toán tìm giá trị phân số của một số.' },
      { signal: 'Đề cho “… bằng 24 quyển” và hỏi tổng số ban đầu', action: 'Chia: $x=b:\\f{m}{n}$.', why: 'Đây là bài toán tìm một số biết giá trị phân số của nó.' },
      { signal: 'Tổng nhiều phân số có mẫu dạng $n(n+1)$', action: 'Tách $\\f{1}{n(n+1)}=\\f{1}{n}-\\f{1}{n+1}$ rồi khử liên tiếp.', why: 'Kỹ thuật sai phân biến tổng dài thành hiệu hai số hạng đầu – cuối.' },
      { signal: 'Biểu thức có thừa số chung ở nhiều hạng tử', action: 'Đặt nhân tử chung rồi tính trong ngoặc.', why: 'Rút ngắn phép tính, hạn chế quy đồng mẫu lớn.' },
    ],
    mindmap: {
      root: 'PHÂN SỐ',
      branches: [
        { title: 'Khái niệm', items: ['$\\f{a}{b}$, $b\\ne0$', 'Phân số bằng nhau', 'Rút gọn tối giản', 'Hỗn số'] },
        { title: 'So sánh', items: ['Quy đồng mẫu', 'Quy đồng tử', 'So với 1', 'Dùng phân số trung gian'] },
        { title: 'Phép tính', items: ['Cộng, trừ cùng/khác mẫu', 'Nhân, chia', 'Tính chất giao hoán, kết hợp, phân phối'] },
        { title: 'Hai bài toán cơ bản', items: ['Giá trị phân số của một số', 'Tìm số biết giá trị phân số', 'Tỉ số phần trăm'] },
        { title: 'Nâng cao', items: ['Tổng sai phân', 'So sánh phân số lớn', 'Bài toán chuyển động, công việc'] },
      ],
    },
    practiceSkills: [
      { title: 'Kỹ năng tính hợp lí với phân số', detail: ['Ưu tiên rút gọn trước khi nhân.', 'Nhóm các phân số có cùng mẫu.', 'Đặt nhân tử chung khi thấy phân số lặp lại.'] },
      { title: 'Kỹ năng vẽ sơ đồ đoạn thẳng', detail: ['Vẽ tổng thể là một đoạn, chia theo mẫu số.', 'Đánh dấu phần đã biết và phần cần tìm.', 'Từ sơ đồ đọc ra phép tính.'] },
    ],
    types: [
      {
        id: 'g6-t4-d1', name: 'Dạng 1. Rút gọn và so sánh phân số', level: 'NB',
        method: ['Rút gọn về tối giản.', 'Quy đồng mẫu (hoặc tử) rồi so sánh.', 'Với phân số âm: nhớ so sánh ngược.'],
        pitfalls: ['So sánh hai phân số âm theo độ lớn.'],
        worked: [{
          prompt: 'So sánh $\\f{-7}{12}$ và $\\f{-5}{9}$.',
          thinking: ['Quy đồng mẫu: BCNN$(12;9)=36$.'],
          solution: ['$\\f{-7}{12}=\\f{-21}{36}$; $\\f{-5}{9}=\\f{-20}{36}$.', 'Vì $-21<-20$ nên $\\f{-7}{12}<\\f{-5}{9}$.'],
        }],
      },
      {
        id: 'g6-t4-d2', name: 'Dạng 2. Thực hiện phép tính, tính hợp lí', level: 'TH',
        method: ['Rút gọn từng phân số.', 'Nhóm hạng tử cùng mẫu hoặc có nhân tử chung.', 'Áp dụng tính chất phân phối.'],
        worked: [{
          prompt: 'Tính hợp lí: $A=\\f{5}{9}\\cdot\\f{7}{13}+\\f{5}{9}\\cdot\\f{9}{13}-\\f{5}{9}\\cdot\\f{3}{13}$.',
          thinking: ['Cả ba hạng tử đều có $\\f{5}{9}$ → đặt nhân tử chung.'],
          solution: [
            '$A=\\f{5}{9}\\left(\\f{7}{13}+\\f{9}{13}-\\f{3}{13}\\right)$',
            '$A=\\f{5}{9}\\cdot\\f{13}{13}=\\f{5}{9}$.',
          ],
        }],
      },
      {
        id: 'g6-t4-d3', name: 'Dạng 3. Hai bài toán cơ bản về phân số', level: 'VD',
        method: ['Xác định “số đã biết” là toàn thể hay là một phần.', 'Toàn thể đã biết → nhân; toàn thể chưa biết → chia.', 'Vẽ sơ đồ đoạn thẳng nếu bài nhiều bước.'],
        pitfalls: ['Nhầm chiều nhân/chia.', 'Quên rằng phần còn lại được tính trên phần **chưa đọc**, không phải trên tổng.'],
        worked: [{
          prompt: 'Một quyển sách, ngày đầu An đọc $\\f{2}{5}$ số trang, ngày thứ hai đọc $\\f{1}{3}$ số trang **còn lại**, ngày thứ ba đọc nốt 60 trang. Hỏi quyển sách có bao nhiêu trang?',
          thinking: [
            'Chú ý cụm “số trang còn lại” — mốc so sánh của ngày hai là phần chưa đọc, không phải cả quyển.',
            'Ta đi ngược từ 60 trang cuối cùng.',
          ],
          solution: [
            'Sau ngày đầu, phần còn lại là $1-\\f{2}{5}=\\f{3}{5}$ quyển sách.',
            'Ngày hai đọc $\\f{1}{3}$ của phần còn lại, tức $\\f{1}{3}\\cdot\\f{3}{5}=\\f{1}{5}$ quyển sách.',
            'Ngày ba đọc: $1-\\f{2}{5}-\\f{1}{5}=\\f{2}{5}$ quyển sách, ứng với 60 trang.',
            'Số trang quyển sách: $60:\\f{2}{5}=60\\cdot\\f{5}{2}=150$ (trang).',
            'Vậy quyển sách có **150 trang**.',
          ],
          remark: 'Bẫy “còn lại” xuất hiện gần như chắc chắn trong đề cuối kỳ lớp 6 — luôn quy mọi phân số về cùng một mốc là cả quyển.',
        }],
      },
      {
        id: 'g6-t4-d4', name: 'Dạng 4. Vận dụng cao — tổng dãy phân số có quy luật', level: 'VDC',
        method: ['Tìm quy luật mẫu số.', 'Tách theo công thức sai phân $\\f{k}{n(n+k)}=\\f{1}{n}-\\f{1}{n+k}$.', 'Khử liên tiếp, chỉ còn số hạng đầu và cuối.'],
        worked: [{
          prompt: 'Tính $S=\\f{1}{2\\cdot3}+\\f{1}{3\\cdot4}+\\f{1}{4\\cdot5}+\\dots+\\f{1}{49\\cdot50}$.',
          thinking: ['Mẫu có dạng $n(n+1)$ → dùng $\\f{1}{n(n+1)}=\\f{1}{n}-\\f{1}{n+1}$.'],
          solution: [
            '$S=\\left(\\f{1}{2}-\\f{1}{3}\\right)+\\left(\\f{1}{3}-\\f{1}{4}\\right)+\\dots+\\left(\\f{1}{49}-\\f{1}{50}\\right)$',
            'Các số hạng giữa triệt tiêu từng đôi một.',
            '$S=\\f{1}{2}-\\f{1}{50}=\\f{25}{50}-\\f{1}{50}=\\f{24}{50}=\\f{12}{25}$.',
          ],
        }],
      },
    ],
    bank: ['g6.phan-so-rutgon', 'g6.phan-so-tinh', 'g6.phan-so-bt', 'g6.phan-so-day'],
  },

  {
    id: 'g6-t5',
    grade: 6, term: 'HK2', strand: 'SO_DAI_SO', order: 5,
    name: 'Số thập phân — Tỉ số và Tỉ số phần trăm',
    summary: 'Số thập phân âm, các phép tính, làm tròn và ước lượng, tỉ số, tỉ số phần trăm và bài toán thực tế.',
    outcomes: [
      'Thực hiện bốn phép tính với số thập phân (kể cả số âm), tính hợp lí.',
      'Làm tròn số và ước lượng kết quả trong tình huống thực tế.',
      'Tính tỉ số, tỉ số phần trăm; giải ba bài toán cơ bản về tỉ số phần trăm.',
    ],
    theory: [
      {
        heading: '1. Số thập phân và làm tròn',
        body: ['Số thập phân âm có mọi quy tắc dấu giống số nguyên.'],
        formulas: [
          'Làm tròn đến hàng nào thì xét chữ số **liền sau** hàng đó: $\\ge5$ thì tăng, $<5$ thì giữ nguyên.',
          'Làm tròn đến $n$ chữ số thập phân: xét chữ số thứ $n+1$.',
        ],
        caution: ['Chỉ làm tròn ở **bước cuối cùng**; làm tròn giữa chừng sẽ tích luỹ sai số.'],
      },
      {
        heading: '2. Tỉ số và tỉ số phần trăm',
        body: [],
        formulas: [
          'Tỉ số của $a$ và $b$ ($b\\ne0$) là $\\f{a}{b}$ hay $a:b$',
          'Tỉ số phần trăm của $a$ và $b$: $\\f{a}{b}\\cdot100\\percent$',
          'Tìm $m\\percent$ của $a$: $a\\cdot\\f{m}{100}$',
          'Tìm $a$ biết $m\\percent$ của $a$ bằng $b$: $a=b:\\f{m}{100}$',
        ],
      },
      {
        heading: '3. Bài toán tăng – giảm phần trăm',
        body: ['Xuất hiện dày đặc trong đề thi và trong đời sống (giảm giá, lãi suất).'],
        formulas: [
          'Giá sau khi giảm $m\\percent$: $A(1-\\f{m}{100})$',
          'Giá sau khi tăng $m\\percent$: $A(1+\\f{m}{100})$',
          'Giảm liên tiếp $m\\percent$ rồi $n\\percent$: $A(1-\\f{m}{100})(1-\\f{n}{100})$',
        ],
        caution: ['Giảm 20% rồi giảm tiếp 10% **không** bằng giảm 30%, vì mốc so sánh đã thay đổi.'],
      },
    ],
    decode: [
      { signal: 'Đề hỏi “chiếm bao nhiêu phần trăm”', action: 'Lấy phần chia cho tổng rồi nhân 100%.', why: 'Đây là bài toán tính tỉ số phần trăm.' },
      { signal: 'Đề cho giá sau giảm và hỏi giá gốc', action: 'Chia cho $(1-\\f{m}{100})$.', why: 'Giá gốc là toàn thể chưa biết → phép chia.' },
      { signal: 'Giảm giá hai lần liên tiếp', action: 'Nhân hai hệ số, không cộng hai phần trăm.', why: 'Lần giảm thứ hai tính trên giá đã giảm.' },
      { signal: 'Đề yêu cầu “làm tròn đến hàng phần trăm”', action: 'Giữ 2 chữ số thập phân, xét chữ số thứ ba.', why: 'Sai vị trí làm tròn là mất điểm dù tính đúng.' },
    ],
    mindmap: {
      root: 'SỐ THẬP PHÂN — TỈ SỐ PHẦN TRĂM',
      branches: [
        { title: 'Số thập phân', items: ['Số thập phân âm', 'Bốn phép tính', 'Tính hợp lí', 'Chuyển đổi phân số ↔ thập phân'] },
        { title: 'Làm tròn', items: ['Quy tắc xét chữ số liền sau', 'Làm tròn ở bước cuối', 'Ước lượng kết quả'] },
        { title: 'Tỉ số', items: ['$a:b$', 'Tỉ số phần trăm', 'Tỉ lệ bản đồ'] },
        { title: '3 bài toán %', items: ['Tìm $m\\percent$ của $a$', 'Tìm $a$ biết $m\\percent$', 'Tính tỉ số %'] },
        { title: 'Thực tế', items: ['Giảm giá', 'Lãi suất', 'Thuế VAT', 'Tăng trưởng'] },
      ],
    },
    types: [
      {
        id: 'g6-t5-d1', name: 'Dạng 1. Phép tính với số thập phân, làm tròn', level: 'NB',
        method: ['Đặt tính thẳng hàng dấu phẩy.', 'Áp dụng quy tắc dấu như số nguyên.', 'Làm tròn ở bước cuối cùng theo yêu cầu.'],
        worked: [{
          prompt: 'Tính $(-3{,}75)+8{,}2-1{,}45$ rồi làm tròn kết quả đến hàng phần mười.',
          thinking: ['Cộng trừ lần lượt từ trái sang phải.'],
          solution: ['$(-3{,}75)+8{,}2=4{,}45$.', '$4{,}45-1{,}45=3$.', 'Kết quả là $3$; làm tròn đến hàng phần mười vẫn là $3{,}0$.'],
        }],
      },
      {
        id: 'g6-t5-d2', name: 'Dạng 2. Ba bài toán cơ bản về tỉ số phần trăm', level: 'TH',
        method: ['Xác định rõ đâu là toàn thể (100%), đâu là phần.', 'Toàn thể đã biết → nhân; toàn thể chưa biết → chia.'],
        worked: [{
          prompt: 'Lớp 6A có 40 học sinh, trong đó có 14 học sinh giỏi. Tính tỉ số phần trăm học sinh giỏi của lớp.',
          thinking: ['Toàn thể là 40, phần là 14 → lấy phần chia toàn thể.'],
          solution: ['Tỉ số phần trăm $=\\f{14}{40}\\cdot100\\percent=35\\percent$.', 'Vậy học sinh giỏi chiếm $35\\percent$ số học sinh cả lớp.'],
        }],
      },
      {
        id: 'g6-t5-d3', name: 'Dạng 3. Bài toán giảm giá – lãi suất', level: 'VD',
        method: ['Viết hệ số nhân cho mỗi lần tăng/giảm.', 'Nhân liên tiếp các hệ số.', 'So sánh với yêu cầu của đề.'],
        pitfalls: ['Cộng dồn phần trăm của hai lần giảm liên tiếp.'],
        worked: [{
          prompt: 'Một chiếc áo giá niêm yết 500 000 đồng, được giảm 20%, sau đó cửa hàng giảm thêm 10% trên giá đã giảm. Tính giá cuối cùng và cho biết tổng cộng đã giảm bao nhiêu phần trăm so với giá niêm yết.',
          thinking: ['Hai lần giảm liên tiếp → nhân hai hệ số $0{,}8$ và $0{,}9$.'],
          solution: [
            'Giá sau lần giảm thứ nhất: $500\\,000\\cdot(1-0{,}2)=400\\,000$ (đồng).',
            'Giá sau lần giảm thứ hai: $400\\,000\\cdot(1-0{,}1)=360\\,000$ (đồng).',
            'Tỉ số so với giá gốc: $\\f{360\\,000}{500\\,000}=0{,}72=72\\percent$.',
            'Vậy giá cuối là **360 000 đồng**, tổng cộng giảm $100\\percent-72\\percent=28\\percent$ (không phải 30%).',
          ],
          remark: 'Kết quả 28% chứ không phải 30% chính là điểm phân loại của dạng bài này.',
        }],
      },
    ],
    bank: ['g6.thap-phan', 'g6.phan-tram', 'g6.giam-gia'],
  },

  {
    id: 'g6-t6',
    grade: 6, term: 'HK1', strand: 'HINH_HOC', order: 6,
    name: 'Hình học trực quan — Chu vi và Diện tích',
    summary: 'Tam giác đều, hình vuông, lục giác đều, hình chữ nhật, hình thoi, hình bình hành, hình thang cân: nhận biết, tính chu vi và diện tích.',
    outcomes: [
      'Nhận biết và mô tả các yếu tố của tam giác đều, hình vuông, lục giác đều.',
      'Mô tả và vẽ được hình chữ nhật, hình thoi, hình bình hành, hình thang cân.',
      'Tính chu vi, diện tích các hình đã học và giải bài toán thực tiễn.',
    ],
    theory: [
      {
        heading: '1. Công thức chu vi — diện tích cần thuộc',
        body: ['Bảng công thức này là “vũ khí” của toàn bộ chương hình lớp 6.'],
        formulas: [
          'Hình vuông cạnh $a$: $C=4a$ ; $S=a^{2}$',
          'Hình chữ nhật: $C=2(a+b)$ ; $S=ab$',
          'Hình bình hành: $C=2(a+b)$ ; $S=a\\cdot h$ (đáy nhân chiều cao)',
          'Hình thoi cạnh $a$, hai đường chéo $m,n$: $C=4a$ ; $S=\\f{1}{2}mn$',
          'Hình thang: $S=\\f{(a+b)\\cdot h}{2}$',
          'Tam giác: $S=\\f{1}{2}a\\cdot h$',
          'Lục giác đều cạnh $a$: $C=6a$ (ghép từ 6 tam giác đều cạnh $a$)',
        ],
        caution: ['Chiều cao phải **vuông góc** với đáy tương ứng — nhiều bạn lấy nhầm cạnh bên làm chiều cao.'],
      },
      {
        heading: '2. Dấu hiệu nhận biết nhanh',
        body: [],
        formulas: [
          'Hình vuông = hình chữ nhật có 4 cạnh bằng nhau = hình thoi có 4 góc vuông',
          'Hình thoi: 4 cạnh bằng nhau, hai đường chéo vuông góc và cắt nhau tại trung điểm mỗi đường',
          'Hình bình hành: hai cặp cạnh đối song song và bằng nhau, hai đường chéo cắt nhau tại trung điểm',
          'Hình thang cân: hai cạnh bên bằng nhau, hai đường chéo bằng nhau, hai góc kề một đáy bằng nhau',
        ],
      },
    ],
    decode: [
      { signal: 'Đề cho hai đường chéo của một hình', action: 'Nghĩ ngay tới hình thoi: $S=\\f{1}{2}mn$.', why: 'Chỉ hình thoi (và hình vuông) mới có công thức diện tích theo hai đường chéo.' },
      { signal: 'Đề cho “nền nhà”, “mảnh vườn”, “viên gạch”', action: 'Bài toán diện tích; chú ý đổi đơn vị về cùng một loại.', why: 'Sai đơn vị là lỗi mất điểm số 1 trong bài toán thực tế.' },
      { signal: 'Đề hỏi “cần bao nhiêu mét hàng rào”', action: 'Bài toán chu vi, nhớ trừ phần cổng nếu đề có nói.', why: 'Hàng rào chạy quanh mép → chu vi.' },
      { signal: 'Hình phức tạp, ghép nhiều hình', action: 'Chia nhỏ thành hình cơ bản hoặc lấy hình lớn trừ hình khoét.', why: 'Diện tích có tính cộng — mọi hình phức tạp đều quy về hình cơ bản.' },
    ],
    mindmap: {
      root: 'HÌNH HỌC TRỰC QUAN LỚP 6',
      branches: [
        { title: 'Hình đều', items: ['Tam giác đều', 'Hình vuông', 'Lục giác đều'] },
        { title: 'Tứ giác đặc biệt', items: ['Hình chữ nhật', 'Hình thoi', 'Hình bình hành', 'Hình thang cân'] },
        { title: 'Chu vi', items: ['$C=4a$', '$C=2(a+b)$', 'Đường bao ngoài'] },
        { title: 'Diện tích', items: ['$S=ab$', '$S=a\\cdot h$', '$S=\\f{1}{2}mn$', '$S=\\f{(a+b)h}{2}$'] },
        { title: 'Thực tế', items: ['Lát gạch', 'Sơn tường', 'Rào vườn', 'Đổi đơn vị đo'] },
      ],
    },
    practiceSkills: [
      { title: 'Kỹ năng chia hình', detail: ['Kẻ thêm đường để tách thành hình chữ nhật + tam giác.', 'Hoặc bù thành hình lớn rồi trừ phần thừa.', 'Ghi rõ số đo trên hình trước khi tính.'] },
      { title: 'Kỹ năng đổi đơn vị', detail: ['$1\\,m=100\\,cm$ nhưng $1\\,m^{2}=10\\,000\\,cm^{2}$.', 'Đổi hết về cùng đơn vị **trước** khi thay vào công thức.'] },
    ],
    types: [
      {
        id: 'g6-t6-d1', name: 'Dạng 1. Nhận biết hình và tính chất', level: 'NB',
        method: ['Đối chiếu với dấu hiệu nhận biết.', 'Kiểm tra lần lượt: cạnh, góc, đường chéo.'],
        worked: [{
          prompt: 'Hình thoi $ABCD$ có $AC=8\\,cm$, $BD=6\\,cm$. Tính diện tích hình thoi.',
          thinking: ['Có hai đường chéo → dùng công thức $S=\\f{1}{2}mn$.'],
          solution: ['$S=\\f{1}{2}\\cdot AC\\cdot BD=\\f{1}{2}\\cdot8\\cdot6=24\\ (cm^{2})$.'],
        }],
      },
      {
        id: 'g6-t6-d2', name: 'Dạng 2. Tính chu vi, diện tích hình cơ bản', level: 'TH',
        method: ['Xác định hình, ghi công thức tương ứng.', 'Đổi đơn vị (nếu cần) rồi thay số.', 'Ghi đủ đơn vị trong kết quả.'],
        worked: [{
          prompt: 'Một mảnh vườn hình chữ nhật có chiều dài $18\\,m$, chiều rộng bằng $\\f{2}{3}$ chiều dài. Tính chu vi và diện tích mảnh vườn.',
          thinking: ['Tìm chiều rộng trước, sau đó áp công thức.'],
          solution: [
            'Chiều rộng: $18\\cdot\\f{2}{3}=12\\ (m)$.',
            'Chu vi: $C=2(18+12)=60\\ (m)$.',
            'Diện tích: $S=18\\cdot12=216\\ (m^{2})$.',
          ],
        }],
      },
      {
        id: 'g6-t6-d3', name: 'Dạng 3. Bài toán thực tế ghép hình', level: 'VD',
        method: ['Vẽ lại hình, ghi số đo.', 'Chia hoặc bù hình.', 'Tính từng phần rồi cộng/trừ.', 'Trả lời theo đúng câu hỏi (số viên gạch, số tiền…).'],
        worked: [{
          prompt: 'Nền một căn phòng hình chữ nhật dài $6\\,m$, rộng $4{,}5\\,m$. Người ta lát bằng gạch hình vuông cạnh $30\\,cm$. Hỏi cần bao nhiêu viên gạch?',
          thinking: [
            'Đơn vị khác nhau: phòng tính bằng mét, gạch tính bằng xăng-ti-mét → phải đổi.',
            'Số viên gạch = diện tích nền : diện tích một viên.',
          ],
          solution: [
            'Đổi $30\\,cm=0{,}3\\,m$.',
            'Diện tích nền: $6\\cdot4{,}5=27\\ (m^{2})$.',
            'Diện tích một viên gạch: $0{,}3\\cdot0{,}3=0{,}09\\ (m^{2})$.',
            'Số viên gạch: $27:0{,}09=300$ (viên).',
            'Vậy cần **300 viên gạch**.',
          ],
          remark: 'Luôn đổi đơn vị trước khi chia — đây là bẫy đơn vị kinh điển của lớp 6.',
        }],
      },
    ],
    bank: ['g6.hinh-nhan-biet', 'g6.chu-vi-dien-tich', 'g6.hinh-thuc-te'],
  },

  {
    id: 'g6-t7',
    grade: 6, term: 'HK2', strand: 'HINH_HOC', order: 7,
    name: 'Hình học phẳng — Điểm, Đường thẳng, Đoạn thẳng, Góc',
    summary: 'Điểm, đường thẳng, ba điểm thẳng hàng, tia, đoạn thẳng, trung điểm, góc và số đo góc.',
    outcomes: [
      'Nhận biết điểm thuộc/không thuộc đường thẳng, ba điểm thẳng hàng, điểm nằm giữa.',
      'Nhận biết tia, đoạn thẳng, độ dài đoạn thẳng, trung điểm của đoạn thẳng.',
      'Nhận biết góc, đo góc, phân loại góc và tính số đo góc.',
    ],
    theory: [
      {
        heading: '1. Điểm, đường thẳng, tia, đoạn thẳng',
        body: [],
        formulas: [
          'Qua hai điểm phân biệt có **một và chỉ một** đường thẳng.',
          'Nếu điểm $M$ nằm giữa $A$ và $B$ thì $AM+MB=AB$.',
          'Ngược lại, nếu $AM+MB=AB$ thì $M$ nằm giữa $A$ và $B$.',
          '$M$ là trung điểm của $AB$ $\\Leftrightarrow$ $M$ nằm giữa $A$, $B$ và $MA=MB=\\f{AB}{2}$.',
        ],
        caution: ['Hai tia đối nhau phải **chung gốc** và tạo thành một đường thẳng.'],
      },
      {
        heading: '2. Góc và số đo góc',
        body: [],
        formulas: [
          'Góc nhọn: $0\\deg<\\alpha<90\\deg$ ; Góc vuông: $\\alpha=90\\deg$',
          'Góc tù: $90\\deg<\\alpha<180\\deg$ ; Góc bẹt: $\\alpha=180\\deg$',
          'Nếu tia $Oy$ nằm giữa hai tia $Ox$, $Oz$ thì $\\angle xOy+\\angle yOz=\\angle xOz$.',
        ],
      },
    ],
    decode: [
      { signal: 'Đề cho $AM+MB=AB$', action: 'Kết luận $M$ nằm giữa $A$ và $B$.', why: 'Đây là dấu hiệu duy nhất để chứng minh điểm nằm giữa ở lớp 6.' },
      { signal: 'Đề hỏi “chứng minh $M$ là trung điểm”', action: 'Chứng minh đủ hai ý: $M$ nằm giữa và $MA=MB$.', why: 'Thiếu một ý là mất nửa số điểm.' },
      { signal: 'Ba điểm trên cùng một tia, cho hai độ dài', action: 'So sánh độ dài để xác định điểm nào nằm giữa, rồi dùng hệ thức cộng đoạn thẳng.', why: 'Trên cùng một tia, điểm gần gốc hơn thì nằm giữa.' },
      { signal: 'Tia $Oy$ nằm giữa $Ox$ và $Oz$', action: 'Dùng $\\angle xOy+\\angle yOz=\\angle xOz$.', why: 'Đây là hệ thức cộng góc, song song với hệ thức cộng đoạn thẳng.' },
    ],
    mindmap: {
      root: 'HÌNH HỌC PHẲNG LỚP 6',
      branches: [
        { title: 'Điểm — Đường thẳng', items: ['$\\in$ / $\\notin$', 'Ba điểm thẳng hàng', 'Điểm nằm giữa'] },
        { title: 'Tia — Đoạn thẳng', items: ['Tia, hai tia đối nhau', 'Độ dài đoạn thẳng', '$AM+MB=AB$'] },
        { title: 'Trung điểm', items: ['Định nghĩa 2 ý', '$MA=MB=\\f{AB}{2}$', 'Cách vẽ'] },
        { title: 'Góc', items: ['Đỉnh, cạnh', 'Đo góc bằng thước đo độ', 'Nhọn – vuông – tù – bẹt', 'Cộng góc'] },
      ],
    },
    types: [
      {
        id: 'g6-t7-d1', name: 'Dạng 1. Tính độ dài đoạn thẳng', level: 'TH',
        method: ['Vẽ hình đúng tỉ lệ.', 'Xác định điểm nằm giữa (so sánh độ dài trên cùng một tia).', 'Áp dụng $AM+MB=AB$.'],
        pitfalls: ['Không lập luận điểm nằm giữa mà dùng luôn hệ thức cộng.'],
        worked: [{
          prompt: 'Trên tia $Ox$ lấy hai điểm $A$, $B$ sao cho $OA=3\\,cm$, $OB=7\\,cm$. Tính $AB$.',
          thinking: ['Hai điểm cùng thuộc tia $Ox$; $OA<OB$ nên $A$ nằm giữa $O$ và $B$.'],
          solution: [
            'Vì $A$, $B$ cùng thuộc tia $Ox$ và $OA<OB$ ($3<7$) nên điểm $A$ nằm giữa $O$ và $B$.',
            'Do đó $OA+AB=OB$.',
            '$AB=OB-OA=7-3=4\\ (cm)$.',
          ],
        }],
      },
      {
        id: 'g6-t7-d2', name: 'Dạng 2. Chứng minh trung điểm', level: 'VD',
        method: ['Chứng minh điểm nằm giữa.', 'Chứng minh hai đoạn bằng nhau.', 'Kết luận theo định nghĩa.'],
        worked: [{
          prompt: 'Trên tia $Ox$ lấy $A$, $B$ với $OA=4\\,cm$, $OB=8\\,cm$. Chứng minh $A$ là trung điểm của $OB$.',
          thinking: ['Cần đủ hai ý: $A$ nằm giữa $O$, $B$ và $AO=AB$.'],
          solution: [
            'Vì $A$, $B$ cùng thuộc tia $Ox$ và $OA<OB$ nên $A$ nằm giữa $O$ và $B$. (1)',
            'Khi đó $OA+AB=OB\\Rightarrow AB=8-4=4\\ (cm)$.',
            'Suy ra $OA=AB=4\\,cm$. (2)',
            'Từ (1) và (2), $A$ là trung điểm của đoạn thẳng $OB$.',
          ],
        }],
      },
      {
        id: 'g6-t7-d3', name: 'Dạng 3. Tính số đo góc', level: 'VD',
        method: ['Xác định tia nằm giữa.', 'Dùng hệ thức cộng góc.', 'Với tia phân giác: chia đôi số đo.'],
        worked: [{
          prompt: 'Cho $\\angle xOz=110\\deg$, tia $Oy$ nằm giữa hai tia $Ox$, $Oz$ và $\\angle xOy=45\\deg$. Tính $\\angle yOz$.',
          thinking: ['Tia $Oy$ nằm giữa → dùng hệ thức cộng góc.'],
          solution: ['Vì $Oy$ nằm giữa $Ox$ và $Oz$ nên $\\angle xOy+\\angle yOz=\\angle xOz$.', '$\\angle yOz=110\\deg-45\\deg=65\\deg$.'],
        }],
      },
    ],
    bank: ['g6.doan-thang', 'g6.trung-diem', 'g6.goc'],
  },

  {
    id: 'g6-t8',
    grade: 6, term: 'HK2', strand: 'THONG_KE_XS', order: 8,
    name: 'Thống kê và Xác suất thực nghiệm',
    summary: 'Thu thập, phân loại và biểu diễn dữ liệu bằng bảng, biểu đồ tranh, biểu đồ cột; xác suất thực nghiệm.',
    outcomes: [
      'Thu thập, phân loại dữ liệu; nhận biết tính hợp lí của dữ liệu.',
      'Đọc và mô tả dữ liệu từ bảng thống kê, biểu đồ tranh, biểu đồ cột, biểu đồ cột kép.',
      'Tính xác suất thực nghiệm của một sự kiện trong trò chơi đơn giản.',
    ],
    theory: [
      {
        heading: '1. Thu thập và biểu diễn dữ liệu',
        body: ['Dữ liệu gồm hai loại: dữ liệu **số** (định lượng) và dữ liệu **không phải số** (định tính).'],
        formulas: [
          'Bảng thống kê: cột đối tượng — cột số liệu',
          'Biểu đồ tranh: mỗi biểu tượng ứng với một số lượng cố định',
          'Biểu đồ cột: chiều cao cột tỉ lệ với số liệu',
          'Biểu đồ cột kép: so sánh hai bộ dữ liệu trên cùng một trục',
        ],
        caution: ['Luôn đọc chú thích “mỗi biểu tượng ứng với …” trước khi tính.'],
      },
      {
        heading: '2. Xác suất thực nghiệm',
        body: ['Xác suất thực nghiệm phản ánh kết quả **đã quan sát được**, khác với xác suất lí thuyết.'],
        formulas: [
          'Xác suất thực nghiệm của sự kiện $A$ $=\\f{\\text{Số lần A xảy ra}}{\\text{Tổng số lần thực hiện}}$',
          'Giá trị luôn thuộc đoạn từ 0 đến 1.',
        ],
        caution: ['Số lần thực hiện càng lớn thì xác suất thực nghiệm càng gần xác suất lí thuyết.'],
      },
    ],
    decode: [
      { signal: 'Đề cho biểu đồ tranh', action: 'Nhân số biểu tượng với giá trị quy ước ở chú thích.', why: 'Bỏ qua chú thích là sai toàn bộ số liệu.' },
      { signal: 'Đề hỏi “xác suất thực nghiệm”', action: 'Lấy số lần xảy ra chia tổng số lần thực hiện.', why: 'Đây là định nghĩa trực tiếp, không cần suy luận thêm.' },
      { signal: 'Đề hỏi “chiếm bao nhiêu phần trăm”', action: 'Chuyển tỉ số sang phần trăm.', why: 'Nối chuyên đề Thống kê với chuyên đề Tỉ số phần trăm.' },
    ],
    mindmap: {
      root: 'THỐNG KÊ & XÁC SUẤT LỚP 6',
      branches: [
        { title: 'Dữ liệu', items: ['Định tính / định lượng', 'Thu thập', 'Tính hợp lí của dữ liệu'] },
        { title: 'Biểu diễn', items: ['Bảng thống kê', 'Biểu đồ tranh', 'Biểu đồ cột', 'Biểu đồ cột kép'] },
        { title: 'Phân tích', items: ['Đọc số liệu lớn nhất, nhỏ nhất', 'So sánh', 'Tính tổng, trung bình'] },
        { title: 'Xác suất', items: ['Sự kiện', 'Xác suất thực nghiệm', 'Trò chơi tung đồng xu, gieo xúc xắc'] },
      ],
    },
    types: [
      {
        id: 'g6-t8-d1', name: 'Dạng 1. Đọc và phân tích biểu đồ', level: 'NB',
        method: ['Đọc tiêu đề và chú thích.', 'Xác định trục và đơn vị.', 'Trả lời đúng câu hỏi, kèm đơn vị.'],
        worked: [{
          prompt: 'Biểu đồ cột cho biết số học sinh yêu thích các môn thể thao của lớp 6A: Bóng đá 15, Cầu lông 8, Bóng rổ 10, Bơi 7. Môn nào được yêu thích nhất và chiếm bao nhiêu phần trăm số học sinh cả lớp?',
          thinking: ['Tìm cột cao nhất, sau đó tính tổng để lấy tỉ số phần trăm.'],
          solution: [
            'Môn được yêu thích nhất là Bóng đá (15 học sinh).',
            'Tổng số học sinh: $15+8+10+7=40$.',
            'Tỉ lệ: $\\f{15}{40}\\cdot100\\percent=37{,}5\\percent$.',
          ],
        }],
      },
      {
        id: 'g6-t8-d2', name: 'Dạng 2. Tính xác suất thực nghiệm', level: 'TH',
        method: ['Đếm số lần sự kiện xảy ra.', 'Đếm tổng số lần thực hiện.', 'Lập tỉ số và rút gọn.'],
        worked: [{
          prompt: 'Gieo một con xúc xắc 50 lần, mặt 6 chấm xuất hiện 9 lần. Tính xác suất thực nghiệm của sự kiện “gieo được mặt 6 chấm”.',
          thinking: ['Áp dụng trực tiếp định nghĩa.'],
          solution: ['Xác suất thực nghiệm $=\\f{9}{50}=0{,}18=18\\percent$.'],
        }],
      },
    ],
    bank: ['g6.thong-ke', 'g6.xac-suat'],
  },
];
