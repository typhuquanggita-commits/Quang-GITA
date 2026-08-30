import type { Topic } from '@/types';

/* =====================================================================
   MATHGITA — CHUYÊN ĐỀ TOÁN 6 (Chương trình GDPT 2018)
   Chuẩn biên soạn GITA: Lý thuyết → Sơ đồ đọc vị → Dạng bài → Kỹ năng
   → Sơ đồ tư duy → Vận dụng / Vận dụng cao.
   ===================================================================== */

export const G6_TOPICS_A: Topic[] = [
  /* ================================================================= */
  {
    id: 'g6-t1',
    grade: 6, term: 'HK1', strand: 'SO_DAI_SO', order: 1,
    name: 'Tập hợp — Số tự nhiên & Lũy thừa',
    summary: 'Ngôn ngữ tập hợp, hệ thập phân, bốn phép tính, lũy thừa với số mũ tự nhiên và thứ tự thực hiện phép tính.',
    outcomes: [
      'Sử dụng được ký hiệu tập hợp: $\\in$, $\\notin$, cách liệt kê và cách chỉ ra tính chất đặc trưng.',
      'Thực hiện thành thạo bốn phép tính trên tập số tự nhiên, vận dụng tính chất để tính nhanh.',
      'Hiểu và tính được lũy thừa với số mũ tự nhiên; nhân, chia hai lũy thừa cùng cơ số.',
      'Thực hiện đúng thứ tự phép tính trong biểu thức có ngoặc và lũy thừa.',
    ],
    theory: [
      {
        heading: '1. Tập hợp và phần tử',
        body: [
          'Tập hợp là một nhóm các đối tượng được xác định rõ ràng. Mỗi đối tượng trong tập hợp gọi là một **phần tử**.',
          'Có hai cách viết tập hợp: **liệt kê** các phần tử, hoặc **chỉ ra tính chất đặc trưng** của phần tử.',
        ],
        formulas: [
          '$A=\\{0;1;2;3;4\\}$  (cách liệt kê)',
          '$A=\\{x\\in\\N\\mid x<5\\}$  (cách nêu tính chất đặc trưng)',
          '$3\\in A$ ; $7\\notin A$',
        ],
        caution: [
          'Trong tập hợp, mỗi phần tử **chỉ liệt kê một lần** và **không kể thứ tự**.',
          'Dùng dấu chấm phẩy “;” để ngăn cách các phần tử là số, tránh nhầm với dấu phẩy thập phân.',
          'Phân biệt $\\N=\\{0;1;2;\\dots\\}$ và $\\Nstar=\\{1;2;3;\\dots\\}$ — sai lầm phổ biến là quên số 0.',
        ],
        examples: [
          {
            prompt: 'Viết tập hợp $B$ các số tự nhiên lớn hơn 4 và không vượt quá 9 bằng hai cách.',
            solve: [
              '“Không vượt quá 9” nghĩa là $\\le 9$ (bao gồm cả 9).',
              'Cách liệt kê: $B=\\{5;6;7;8;9\\}$.',
              'Cách nêu tính chất: $B=\\{x\\in\\N\\mid 4<x\\le 9\\}$.',
            ],
          },
        ],
      },
      {
        heading: '2. Bốn phép tính và tính chất tính nhanh',
        body: [
          'Nắm chắc tính chất giao hoán, kết hợp, phân phối là chìa khoá để **tính nhanh** thay vì tính thẳng.',
        ],
        formulas: [
          '$a+b=b+a$ ; $(a+b)+c=a+(b+c)$',
          '$a\\cdot b=b\\cdot a$ ; $(a\\cdot b)\\cdot c=a\\cdot(b\\cdot c)$',
          '$a(b+c)=ab+ac$ ; $a(b-c)=ab-ac$',
          '$a+0=a$ ; $a\\cdot 1=a$ ; $a\\cdot 0=0$',
        ],
        caution: ['Phép trừ và phép chia **không** giao hoán, **không** kết hợp.'],
        examples: [
          {
            prompt: 'Tính nhanh $37\\cdot 25+63\\cdot 25$.',
            solve: [
              'Thấy thừa số chung 25 → dùng tính chất phân phối theo chiều ngược lại.',
              '$37\\cdot25+63\\cdot25=25(37+63)=25\\cdot100=2500$.',
            ],
          },
        ],
      },
      {
        heading: '3. Lũy thừa với số mũ tự nhiên',
        body: [
          'Lũy thừa là cách viết gọn của phép nhân nhiều thừa số bằng nhau.',
        ],
        formulas: [
          '$a^{n}=\\underbrace{a\\cdot a\\cdots a}$ ($n$ thừa số $a$), với $n\\in\\Nstar$',
          '$a^{m}\\cdot a^{n}=a^{m+n}$',
          '$a^{m}:a^{n}=a^{m-n}$ (với $a\\ne0$, $m\\ge n$)',
          '$a^{1}=a$ ; $a^{0}=1$ (với $a\\ne0$)',
        ],
        caution: [
          'Nhân hai lũy thừa **cùng cơ số** thì **cộng** số mũ — rất nhiều bạn nhầm thành nhân số mũ.',
          '$2^{3}\\ne 2\\cdot3$. Phải hiểu $2^{3}=2\\cdot2\\cdot2=8$.',
          '$3^{2}\\cdot 3^{2}=3^{4}=81$, không phải $9^{4}$.',
        ],
      },
      {
        heading: '4. Thứ tự thực hiện phép tính',
        body: [
          'Quy tắc bất di bất dịch, áp dụng cho mọi biểu thức số ở mọi cấp học.',
        ],
        formulas: [
          'Có ngoặc: $(\;)\\to[\;]\\to\\{\;\\}$',
          'Không ngoặc: Lũy thừa $\\to$ Nhân, chia $\\to$ Cộng, trừ',
          'Cùng mức ưu tiên: thực hiện **từ trái sang phải**',
        ],
        caution: ['$100-40:2$ phải bằng $100-20=80$, không phải $60:2=30$.'],
      },
    ],
    decode: [
      { signal: 'Đề có cụm “tính nhanh”, “tính hợp lí”', action: 'Tìm cặp số tròn chục/tròn trăm hoặc thừa số chung để nhóm, dùng tính chất phân phối.', why: 'Đề đã cài sẵn cấu trúc đẹp; tính thẳng là rơi vào bẫy mất thời gian.' },
      { signal: 'Xuất hiện lũy thừa cùng cơ số nhân/chia nhau', action: 'Cộng hoặc trừ số mũ, không khai triển ra số.', why: 'Giữ dạng lũy thừa giúp rút gọn nhanh và tránh sai số học.' },
      { signal: 'Biểu thức nhiều tầng ngoặc', action: 'Giải từ ngoặc trong cùng ra ngoài: $(\;)\\to[\;]\\to\\{\;\\}$.', why: 'Sai thứ tự là sai toàn bộ, dù mỗi bước tính đều đúng.' },
      { signal: 'Đề cho “tập hợp các số tự nhiên thoả mãn…”', action: 'Dịch điều kiện thành bất đẳng thức rồi liệt kê, kiểm tra kỹ hai đầu mút.', why: '“Nhỏ hơn” khác “không vượt quá”; sai một đầu mút là mất trọn điểm.' },
      { signal: 'Tìm $x$ dạng $a\\pm x=b$ hoặc $a\\cdot x=b$', action: 'Dùng quy tắc tìm thành phần chưa biết, làm ngược từ ngoài vào trong.', why: 'Biểu thức là một dây chuyền phép tính; gỡ theo chiều ngược mới đúng.' },
    ],
    mindmap: {
      root: 'TẬP HỢP — SỐ TỰ NHIÊN — LŨY THỪA',
      branches: [
        { title: 'Tập hợp', items: ['Ký hiệu $\\in$, $\\notin$', 'Liệt kê / nêu tính chất', 'Số phần tử', '$\\N$ và $\\Nstar$'] },
        { title: 'Bốn phép tính', items: ['Giao hoán, kết hợp', 'Phân phối $a(b+c)$', 'Tính nhanh bằng nhóm số tròn', 'Phép trừ, chia có điều kiện'] },
        { title: 'Lũy thừa', items: ['$a^{n}$ nghĩa là gì', '$a^{m}a^{n}=a^{m+n}$', '$a^{m}:a^{n}=a^{m-n}$', 'Số chính phương, lập phương'] },
        { title: 'Thứ tự phép tính', items: ['Ngoặc trước', 'Lũy thừa', 'Nhân chia', 'Cộng trừ, trái sang phải'] },
        { title: 'Ứng dụng', items: ['Tìm $x$', 'Bài toán thực tế đếm số', 'So sánh lũy thừa', 'Tính giá trị biểu thức'] },
      ],
    },
    practiceSkills: [
      {
        title: 'Kỹ năng tính nhanh — “nhìn thấy số tròn”',
        detail: [
          'Quét cả biểu thức trước khi đặt bút: tìm cặp cộng lại thành 10, 100, 1000.',
          'Tìm thừa số chung để đưa về dạng $a(b+c)$.',
          'Với phép nhân: tách $25\\cdot4=100$, $125\\cdot8=1000$, $50\\cdot2=100$.',
        ],
      },
      {
        title: 'Kỹ năng trình bày bài “Tìm x”',
        detail: [
          'Xác định $x$ đang nằm ở vị trí nào (số hạng, thừa số, số bị trừ…).',
          'Mỗi dòng gỡ đúng một lớp, luôn viết dấu “=” thẳng cột.',
          'Kết luận: “Vậy $x=\\dots$” và thử lại vào đề.',
        ],
      },
    ],
    types: [
      {
        id: 'g6-t1-d1', name: 'Dạng 1. Viết tập hợp, xác định phần tử', level: 'NB',
        method: [
          'Đọc kỹ điều kiện, dịch sang bất đẳng thức số học.',
          'Liệt kê lần lượt các số tự nhiên thoả mãn, kiểm tra kỹ hai đầu mút.',
          'Trình bày theo yêu cầu: liệt kê hoặc nêu tính chất đặc trưng.',
        ],
        pitfalls: ['Quên số 0 khi tập hợp bắt đầu từ $\\N$.', 'Nhầm “nhỏ hơn” với “không lớn hơn”.'],
        worked: [
          {
            prompt: 'Cho $A=\\{x\\in\\N\\mid 12\\le x<17\\}$. Viết $A$ bằng cách liệt kê và tính tổng các phần tử của $A$.',
            thinking: [
              'Dấu $\\le$ ở bên trái: **lấy** 12. Dấu $<$ ở bên phải: **không lấy** 17.',
              'Vậy các số chạy từ 12 đến 16.',
            ],
            solution: [
              '$A=\\{12;13;14;15;16\\}$.',
              'Tổng $=12+13+14+15+16=(12+16)+(13+15)+14=28+28+14=70$.',
            ],
            remark: 'Nhóm hai đầu vào giữa là kỹ thuật tính tổng dãy số cách đều — sẽ dùng lại rất nhiều.',
          },
        ],
      },
      {
        id: 'g6-t1-d2', name: 'Dạng 2. Tính nhanh, tính hợp lí', level: 'TH',
        method: [
          'Quan sát toàn biểu thức để phát hiện thừa số chung hoặc cặp số tròn.',
          'Dùng tính chất giao hoán – kết hợp để nhóm lại.',
          'Áp dụng $a(b+c)=ab+ac$ theo chiều thuận hoặc ngược.',
        ],
        skills: ['Nhận diện cặp bù 10/100', 'Đặt nhân tử chung'],
        pitfalls: ['Đổi chỗ số hạng mà quên mang theo dấu trừ.'],
        worked: [
          {
            prompt: 'Tính hợp lí: $A=125\\cdot 8\\cdot 17 + 125\\cdot 8\\cdot 83$.',
            thinking: [
              'Hai hạng tử đều có $125\\cdot8$ → đặt làm nhân tử chung.',
              '$125\\cdot8=1000$ và $17+83=100$ — đề đã cài sẵn số tròn.',
            ],
            solution: [
              '$A=125\\cdot8\\cdot(17+83)$',
              '$A=1000\\cdot100=100\\,000$.',
            ],
          },
        ],
      },
      {
        id: 'g6-t1-d3', name: 'Dạng 3. Lũy thừa — nhân, chia, so sánh', level: 'TH',
        method: [
          'Đưa các lũy thừa về **cùng cơ số** (hoặc cùng số mũ) rồi mới so sánh/rút gọn.',
          'Áp dụng $a^{m}\\cdot a^{n}=a^{m+n}$, $a^{m}:a^{n}=a^{m-n}$.',
          'Khi so sánh: cùng cơ số thì so số mũ; cùng số mũ thì so cơ số.',
        ],
        pitfalls: ['Nhân số mũ khi nhân hai lũy thừa.', 'Viết $a^{m}+a^{n}=a^{m+n}$ — hoàn toàn sai, phép cộng không có quy tắc này.'],
        worked: [
          {
            prompt: 'So sánh $2^{30}$ và $3^{20}$.',
            thinking: [
              'Khác cơ số, khác số mũ → tìm số mũ chung. Ước chung lớn nhất của 30 và 20 là 10.',
              'Viết $2^{30}=(2^{3})^{10}$ và $3^{20}=(3^{2})^{10}$ để đưa về cùng số mũ 10.',
            ],
            solution: [
              '$2^{30}=(2^{3})^{10}=8^{10}$.',
              '$3^{20}=(3^{2})^{10}=9^{10}$.',
              'Vì $8<9$ nên $8^{10}<9^{10}$, suy ra $2^{30}<3^{20}$.',
            ],
            remark: 'Chiến thuật “đưa về cùng số mũ” là công cụ chính khi so sánh lũy thừa lớn.',
          },
        ],
      },
      {
        id: 'g6-t1-d4', name: 'Dạng 4. Thực hiện phép tính có ngoặc và lũy thừa', level: 'TH',
        method: [
          'Đánh dấu thứ tự các bước ngay trên nháp: ngoặc trong → ngoặc ngoài → lũy thừa → nhân chia → cộng trừ.',
          'Mỗi dòng chỉ thực hiện một loại phép tính để dễ soát lỗi.',
          'Nếu ra kết quả “xấu” (chia không hết) thì dừng lại rà ngược từng bước, đừng làm liều.',
        ],
        pitfalls: [
          'Bỏ qua ngoặc vuông / ngoặc nhọn.',
          'Tính nhân trước khi tính lũy thừa.',
          'Tính $100-40:2$ thành $60:2=30$ (đúng phải là $100-20=80$).',
        ],
        worked: [
          {
            prompt: 'Tính $B=120-\{[3^{3}+(4^{2}+2)]:5\}$.',
            thinking: [
              'Ngoặc tròn trong cùng trước: $4^{2}+2$. Trong ngoặc tròn lại có lũy thừa nên tính $4^{2}$ trước.',
              'Sau đó tới ngoặc vuông, rồi phép chia trong ngoặc nhọn, cuối cùng mới trừ.',
            ],
            solution: [
              '$4^{2}+2=16+2=18$.',
              '$[3^{3}+18]=27+18=45$.',
              '$\{45:5\}=9$.',
              '$B=120-9=111$.',
            ],
            remark: 'Viết mỗi dòng một lớp ngoặc — cách trình bày này giúp giám khảo thấy rõ quy trình và giúp em tự soát lỗi nhanh.',
          },
          {
            prompt: 'Tính $C=5\cdot 2^{4}-18:3^{2}+7$.',
            thinking: ['Không có ngoặc → ưu tiên lũy thừa, rồi nhân chia, cuối cùng cộng trừ từ trái sang phải.'],
            solution: [
              'Lũy thừa: $2^{4}=16$; $3^{2}=9$.',
              'Nhân chia: $5\cdot16=80$; $18:9=2$.',
              'Cộng trừ: $C=80-2+7=85$.',
            ],
          },
        ],
      },
      {
        id: 'g6-t1-d5', name: 'Dạng 5. Tìm x trong biểu thức nhiều lớp', level: 'VD',
        method: [
          'Xác định $x$ nằm trong lớp nào, gỡ từ lớp ngoài cùng vào trong.',
          'Mỗi bước dùng đúng một quy tắc tìm thành phần chưa biết.',
          'Thử lại nghiệm vào đề.',
        ],
        pitfalls: ['Gỡ nhầm thứ tự (gỡ trong ra ngoài).', 'Quên điều kiện $x\\in\\N$ khi kết luận.'],
        worked: [
          {
            prompt: 'Tìm số tự nhiên $x$, biết $2\\cdot(3^{x}+5)=64$.',
            thinking: [
              '$x$ nằm sâu nhất, bên ngoài lần lượt là “+5” rồi “nhân 2”.',
              'Gỡ ngược: chia 2 trước, rồi trừ 5, cuối cùng đưa về so sánh lũy thừa cùng cơ số.',
            ],
            solution: [
              '$3^{x}+5=64:2=32$.',
              '$3^{x}=32-5=27$.',
              '$27=3^{3}$ nên $3^{x}=3^{3}\\Rightarrow x=3$.',
              'Thử lại: $2(3^{3}+5)=2(27+5)=2\\cdot32=64$ (đúng). Vậy $x=3$.',
            ],
          },
        ],
      },
      {
        id: 'g6-t1-d6', name: 'Dạng 6. Vận dụng cao — so sánh và tính tổng lũy thừa', level: 'VDC',
        method: [
          'Với tổng $S=1+a+a^{2}+\\dots+a^{n}$: nhân hai vế với $a$ rồi trừ theo vế để triệt tiêu.',
          'Với so sánh: đưa về cùng cơ số/số mũ hoặc chặn giữa bằng một số trung gian.',
        ],
        pitfalls: ['Trừ theo vế nhưng viết lệch số hạng, dẫn tới triệt tiêu sai.'],
        worked: [
          {
            prompt: 'Tính $S=1+3+3^{2}+3^{3}+\\dots+3^{10}$.',
            thinking: [
              'Đây là tổng các lũy thừa liên tiếp cùng cơ số 3 → dùng kỹ thuật nhân cơ số rồi trừ.',
            ],
            solution: [
              '$3S=3+3^{2}+3^{3}+\\dots+3^{11}$.',
              '$3S-S=3^{11}-1$ (mọi số hạng ở giữa triệt tiêu).',
              '$2S=3^{11}-1\\Rightarrow S=\\f{3^{11}-1}{2}$.',
              'Với $3^{11}=177\\,147$ ta được $S=\\f{177146}{2}=88\\,573$.',
            ],
            remark: 'Kỹ thuật “nhân cơ số rồi trừ theo vế” là chìa khoá cho mọi tổng lũy thừa — dùng lại suốt tới lớp 9.',
          },
        ],
      },
    ],
    bank: ['g6.tap-hop', 'g6.tinh-nhanh', 'g6.luy-thua', 'g6.thu-tu-phep-tinh', 'g6.tim-x'],
  },

  /* ================================================================= */
  {
    id: 'g6-t2',
    grade: 6, term: 'HK1', strand: 'SO_DAI_SO', order: 2,
    name: 'Tính chia hết — Số nguyên tố — ƯCLN & BCNN',
    summary: 'Quan hệ chia hết, dấu hiệu chia hết cho 2, 3, 5, 9; phân tích ra thừa số nguyên tố; ƯCLN, BCNN và các bài toán thực tế.',
    outcomes: [
      'Nhận biết quan hệ chia hết, tính chất chia hết của một tổng, một hiệu.',
      'Vận dụng dấu hiệu chia hết cho 2, 5, 9, 3 để xét và tìm chữ số chưa biết.',
      'Phân tích một số ra thừa số nguyên tố, tìm ƯCLN và BCNN.',
      'Giải bài toán thực tiễn dẫn tới ƯCLN, BCNN.',
    ],
    theory: [
      {
        heading: '1. Quan hệ chia hết và tính chất',
        body: ['Với $a,b\\in\\N$, $b\\ne0$: nếu có số tự nhiên $q$ sao cho $a=bq$ thì ta nói $a$ chia hết cho $b$.'],
        formulas: [
          '$a\;\\vdots\;b$ đọc là “$a$ chia hết cho $b$”',
          'Nếu $a\;\\vdots\;m$ và $b\;\\vdots\;m$ thì $(a+b)\;\\vdots\;m$ và $(a-b)\;\\vdots\;m$',
          'Nếu $a\;\\vdots\;m$ và $b$ không chia hết cho $m$ thì $(a+b)$ **không** chia hết cho $m$',
        ],
        caution: ['Tính chất chỉ đúng khi **mọi** số hạng cùng xét với một số chia $m$.'],
      },
      {
        heading: '2. Dấu hiệu chia hết',
        body: ['Đây là bộ công cụ kiểm tra nhanh, bắt buộc thuộc lòng.'],
        formulas: [
          'Chia hết cho 2: chữ số tận cùng là $0;2;4;6;8$',
          'Chia hết cho 5: chữ số tận cùng là $0$ hoặc $5$',
          'Chia hết cho 9: **tổng các chữ số** chia hết cho 9',
          'Chia hết cho 3: **tổng các chữ số** chia hết cho 3',
          'Chia hết cho 4: hai chữ số tận cùng tạo thành số chia hết cho 4',
          'Chia hết cho 25: hai chữ số tận cùng là $00;25;50;75$',
        ],
        caution: ['Số chia hết cho 9 thì chắc chắn chia hết cho 3, nhưng điều ngược lại không đúng.'],
      },
      {
        heading: '3. Số nguyên tố — Hợp số — Phân tích ra thừa số nguyên tố',
        body: [
          'Số nguyên tố là số tự nhiên lớn hơn 1, chỉ có **hai** ước là 1 và chính nó.',
          'Hợp số là số tự nhiên lớn hơn 1 có **nhiều hơn hai** ước.',
        ],
        formulas: [
          'Các số nguyên tố nhỏ hơn 30: $2;3;5;7;11;13;17;19;23;29$',
          'Dạng phân tích: $n=p_1^{a_1}\\cdot p_2^{a_2}\\cdots p_k^{a_k}$',
          'Số ước của $n$: $(a_1+1)(a_2+1)\\cdots(a_k+1)$',
        ],
        caution: ['Số 0 và số 1 **không** là số nguyên tố, cũng **không** là hợp số.', '2 là số nguyên tố chẵn duy nhất.'],
      },
      {
        heading: '4. ƯCLN và BCNN',
        body: ['Quy trình ba bước thống nhất: phân tích ra thừa số nguyên tố → chọn thừa số → nhân lại.'],
        formulas: [
          'ƯCLN: chọn thừa số nguyên tố **chung**, mỗi thừa số lấy số mũ **nhỏ nhất**',
          'BCNN: chọn thừa số nguyên tố **chung và riêng**, mỗi thừa số lấy số mũ **lớn nhất**',
          '$\\text{ƯCLN}(a,b)\\cdot\\text{BCNN}(a,b)=a\\cdot b$',
          'Hai số nguyên tố cùng nhau $\\Leftrightarrow$ ƯCLN$(a,b)=1$',
        ],
        caution: ['Nhớ mẹo: **Ư**CLN — **Ư**t (chung, mũ nhỏ); **B**CNN — **B**ự (chung + riêng, mũ lớn).'],
      },
    ],
    decode: [
      { signal: 'Đề hỏi “chia đều”, “chia thành các phần bằng nhau nhiều nhất”', action: 'Bài toán ƯCLN.', why: 'Số phần lớn nhất mà mọi nhóm đều chia hết chính là ước chung lớn nhất.' },
      { signal: 'Đề hỏi “cùng lúc lặp lại”, “ít nhất bao nhiêu để cả hai cùng…”', action: 'Bài toán BCNN.', why: 'Thời điểm chung gần nhất là bội chung nhỏ nhất của các chu kỳ.' },
      { signal: 'Đề cho “xếp hàng 4, hàng 6 đều dư 1”', action: 'Đặt $n-1$ là bội chung, tìm BCNN rồi cộng lại phần dư.', why: 'Trừ đi phần dư để đưa về bài toán chia hết chuẩn.' },
      { signal: 'Xuất hiện dấu $*$ trong số $\\ov{a*b}$', action: 'Dùng dấu hiệu chia hết, xét tổng chữ số hoặc chữ số tận cùng.', why: 'Dấu hiệu chia hết biến bài tìm chữ số thành bài giải điều kiện đơn giản.' },
      { signal: 'Hỏi “số đó có bao nhiêu ước”', action: 'Phân tích ra thừa số nguyên tố rồi nhân các (số mũ + 1).', why: 'Mỗi ước tương ứng một cách chọn số mũ cho từng thừa số nguyên tố.' },
    ],
    mindmap: {
      root: 'TÍNH CHIA HẾT — SỐ NGUYÊN TỐ — ƯCLN, BCNN',
      branches: [
        { title: 'Chia hết', items: ['Định nghĩa $a\;\\vdots\;b$', 'Tính chất tổng, hiệu', 'Ước và bội'] },
        { title: 'Dấu hiệu', items: ['Cho 2, 5: chữ số cuối', 'Cho 3, 9: tổng chữ số', 'Cho 4, 25: hai chữ số cuối'] },
        { title: 'Số nguyên tố', items: ['Định nghĩa', 'Bảng nguyên tố < 100', 'Phân tích ra thừa số nguyên tố', 'Đếm số ước'] },
        { title: 'ƯCLN', items: ['Chung — mũ nhỏ', 'Nguyên tố cùng nhau', 'Bài toán chia đều'] },
        { title: 'BCNN', items: ['Chung & riêng — mũ lớn', 'Bài toán gặp lại', 'ƯCLN·BCNN = tích'] },
      ],
    },
    practiceSkills: [
      {
        title: 'Kỹ năng phân tích ra thừa số nguyên tố nhanh',
        detail: [
          'Chia lần lượt cho 2, 3, 5, 7, 11… theo cột dọc, dừng khi thương bằng 1.',
          'Chỉ cần thử ước nguyên tố tới $\\s{n}$.',
          'Viết kết quả dưới dạng lũy thừa, sắp cơ số tăng dần.',
        ],
      },
      {
        title: 'Kỹ năng đọc đề bài toán thực tế ƯCLN/BCNN',
        detail: [
          'Gạch chân từ khoá: “nhiều nhất/lớn nhất” → ƯCLN; “ít nhất/nhỏ nhất, cùng lúc” → BCNN.',
          'Đặt ẩn rõ ràng: gọi $n$ là số… ($n\\in\\Nstar$).',
          'Luôn viết câu kết luận đủ đơn vị.',
        ],
      },
    ],
    types: [
      {
        id: 'g6-t2-d1', name: 'Dạng 1. Xét tính chia hết của một tổng, hiệu', level: 'NB',
        method: ['Xét từng số hạng có chia hết cho $m$ không.', 'Áp dụng tính chất chia hết của tổng/hiệu.', 'Kết luận rõ ràng.'],
        pitfalls: ['Kết luận “không chia hết” khi có hai số hạng cùng không chia hết — trường hợp này phải cộng phần dư rồi mới kết luận.'],
        worked: [
          {
            prompt: 'Không tính tổng, xét xem $A=48+120+27$ có chia hết cho 6 không.',
            thinking: ['Xét từng số hạng với số chia 6.', '48 và 120 chia hết cho 6; 27 thì không.'],
            solution: [
              '$48\;\\vdots\;6$ và $120\;\\vdots\;6$.',
              '$27$ không chia hết cho 6 (vì $27=6\\cdot4+3$).',
              'Tổng của một số chia hết cho 6 với một số không chia hết cho 6 thì **không** chia hết cho 6.',
              'Vậy $A$ không chia hết cho 6.',
            ],
          },
        ],
      },
      {
        id: 'g6-t2-d2', name: 'Dạng 2. Tìm chữ số chưa biết theo dấu hiệu chia hết', level: 'TH',
        method: [
          'Xác định dấu hiệu tương ứng với số chia.',
          'Với 2, 5: xét chữ số tận cùng. Với 3, 9: lập điều kiện cho tổng các chữ số.',
          'Giới hạn ẩn là chữ số $0\\le *\\le 9$, liệt kê các giá trị thoả mãn.',
        ],
        pitfalls: ['Quên điều kiện chữ số đầu tiên khác 0.', 'Chỉ tìm một giá trị rồi dừng, trong khi đề có nhiều đáp số.'],
        worked: [
          {
            prompt: 'Tìm chữ số $a$ để số $\\ov{3a52}$ chia hết cho 9.',
            thinking: ['Chia hết cho 9 → dùng tổng các chữ số.', 'Tổng là $3+a+5+2=a+10$.'],
            solution: [
              'Số chia hết cho 9 $\\Leftrightarrow (a+10)\;\\vdots\;9$.',
              'Vì $0\\le a\\le9$ nên $10\\le a+10\\le19$; trong khoảng này chỉ có $18\;\\vdots\;9$.',
              '$a+10=18\\Rightarrow a=8$.',
              'Vậy $a=8$, số cần tìm là $3852$.',
            ],
            remark: 'Luôn chặn miền giá trị của tổng trước — đó là cách loại nhanh các trường hợp thừa.',
          },
        ],
      },
      {
        id: 'g6-t2-d3', name: 'Dạng 3. Phân tích ra thừa số nguyên tố, đếm ước', level: 'TH',
        method: ['Chia dần cho các số nguyên tố tăng dần.', 'Viết dạng lũy thừa.', 'Số ước $=(a_1+1)(a_2+1)\\cdots$'],
        pitfalls: ['Bỏ sót thừa số nguyên tố lớn còn lại ở bước cuối.'],
        worked: [
          {
            prompt: 'Phân tích 360 ra thừa số nguyên tố và cho biết 360 có bao nhiêu ước.',
            thinking: ['360 chẵn → chia 2 liên tiếp; sau đó chia 3; cuối cùng còn 5.'],
            solution: [
              '$360:2=180$; $180:2=90$; $90:2=45$; $45:3=15$; $15:3=5$; $5:5=1$.',
              'Vậy $360=2^{3}\\cdot3^{2}\\cdot5$.',
              'Số ước $=(3+1)(2+1)(1+1)=4\\cdot3\\cdot2=24$ ước.',
            ],
          },
        ],
      },
      {
        id: 'g6-t2-d4', name: 'Dạng 4. Bài toán thực tế về ƯCLN', level: 'VD',
        method: [
          'Gọi ẩn là số phần/số nhóm cần tìm.',
          'Nhận ra ẩn là **ước chung** của các số đã cho, yêu cầu “nhiều nhất” → ƯCLN.',
          'Tính ƯCLN rồi trả lời đủ ý phụ (mỗi phần có bao nhiêu…).',
        ],
        pitfalls: ['Nhầm sang BCNN vì không đọc kỹ từ khoá.'],
        worked: [
          {
            prompt: 'Cô giáo có 48 quyển vở, 60 chiếc bút và 72 cục tẩy, muốn chia đều vào các phần quà. Hỏi chia được nhiều nhất bao nhiêu phần quà? Mỗi phần có bao nhiêu vở?',
            thinking: [
              '“Chia đều” cho cả ba loại → số phần quà là **ước chung** của 48, 60, 72.',
              '“Nhiều nhất” → lấy ƯCLN.',
            ],
            solution: [
              '$48=2^{4}\\cdot3$; $60=2^{2}\\cdot3\\cdot5$; $72=2^{3}\\cdot3^{2}$.',
              'Thừa số nguyên tố chung: 2 (mũ nhỏ nhất là 2) và 3 (mũ nhỏ nhất là 1).',
              'ƯCLN$(48;60;72)=2^{2}\\cdot3=12$.',
              'Vậy chia được nhiều nhất **12 phần quà**; mỗi phần có $48:12=4$ quyển vở, $60:12=5$ bút, $72:12=6$ cục tẩy.',
            ],
          },
        ],
      },
      {
        id: 'g6-t2-d5', name: 'Dạng 5. Bài toán thực tế về BCNN (có dư)', level: 'VD',
        method: [
          'Nếu chia đều không dư: ẩn là bội chung → BCNN.',
          'Nếu “đều dư $r$”: xét $n-r$ là bội chung, tìm BCNN rồi cộng $r$.',
          'Đối chiếu điều kiện chặn của đề để chọn nghiệm.',
        ],
        pitfalls: ['Quên cộng lại phần dư.', 'Quên đối chiếu khoảng giá trị đề cho.'],
        worked: [
          {
            prompt: 'Số học sinh khối 6 khi xếp hàng 12, hàng 15, hàng 18 đều thừa 5 em. Biết số học sinh trong khoảng từ 300 đến 400. Tính số học sinh.',
            thinking: [
              '“Đều thừa 5” → nếu bớt đi 5 em thì chia hết cho cả 12, 15, 18.',
              'Đặt $n$ là số học sinh, khi đó $n-5$ là bội chung của 12, 15, 18.',
            ],
            solution: [
              'Gọi $n$ là số học sinh khối 6 ($n\\in\\Nstar$, $300\\le n\\le400$).',
              'Theo đề: $(n-5)\;\\vdots\;12$, $(n-5)\;\\vdots\;15$, $(n-5)\;\\vdots\;18$ nên $n-5\\in$ BC$(12;15;18)$.',
              '$12=2^{2}\\cdot3$; $15=3\\cdot5$; $18=2\\cdot3^{2}$ $\\Rightarrow$ BCNN $=2^{2}\\cdot3^{2}\\cdot5=180$.',
              'BC$(12;15;18)=\\{0;180;360;540;\\dots\\}$, suy ra $n\\in\\{5;185;365;545;\\dots\\}$.',
              'Đối chiếu $300\\le n\\le400$ ta được $n=365$.',
              'Vậy khối 6 có **365 học sinh**.',
            ],
          },
        ],
      },
      {
        id: 'g6-t2-d6', name: 'Dạng 6. Vận dụng cao — chứng minh chia hết, hai số nguyên tố cùng nhau', level: 'VDC',
        method: [
          'Đặt $d=$ ƯCLN của hai biểu thức, suy ra mỗi biểu thức chia hết cho $d$.',
          'Tổ hợp tuyến tính hai biểu thức để triệt tiêu ẩn, thu được một hằng số chia hết cho $d$.',
          'Chặn $d$ và kết luận.',
        ],
        pitfalls: ['Chọn hệ số tổ hợp chưa triệt tiêu hết ẩn.'],
        worked: [
          {
            prompt: 'Chứng minh với mọi số tự nhiên $n$, hai số $2n+3$ và $3n+4$ là hai số nguyên tố cùng nhau.',
            thinking: [
              'Muốn chứng minh nguyên tố cùng nhau tức là chứng minh ƯCLN của chúng bằng 1.',
              'Đặt $d$ là ước chung, tìm cách khử $n$: nhân chéo hệ số $3$ và $2$.',
            ],
            solution: [
              'Gọi $d=$ ƯCLN$(2n+3;\\,3n+4)$, $d\\in\\Nstar$.',
              'Khi đó $(2n+3)\;\\vdots\;d$ và $(3n+4)\;\\vdots\;d$.',
              'Suy ra $3(2n+3)\;\\vdots\;d$ và $2(3n+4)\;\\vdots\;d$, tức $(6n+9)\;\\vdots\;d$ và $(6n+8)\;\\vdots\;d$.',
              'Hiệu: $(6n+9)-(6n+8)=1\;\\vdots\;d\\Rightarrow d=1$.',
              'Vậy $2n+3$ và $3n+4$ nguyên tố cùng nhau với mọi $n\\in\\N$.',
            ],
            remark: 'Kỹ thuật “khử ẩn bằng tổ hợp tuyến tính” là mẫu chuẩn cho mọi bài chứng minh nguyên tố cùng nhau.',
          },
        ],
      },
    ],
    bank: ['g6.chia-het', 'g6.dau-hieu', 'g6.nguyen-to', 'g6.ucln', 'g6.bcnn'],
  },
];
