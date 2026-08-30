import type { Topic } from '@/types';

/* MATHGITA — CHUYÊN ĐỀ TOÁN 8 (Chương trình GDPT 2018) */

export const G8_TOPICS: Topic[] = [
  {
    id: 'g8-t1', grade: 8, term: 'HK1', strand: 'SO_DAI_SO', order: 1,
    name: 'Đa thức — Hằng đẳng thức — Phân tích thành nhân tử',
    summary: 'Đơn thức, đa thức nhiều biến, bảy hằng đẳng thức đáng nhớ và các phương pháp phân tích đa thức thành nhân tử.',
    outcomes: [
      'Thực hiện phép cộng, trừ, nhân, chia đa thức nhiều biến.',
      'Vận dụng thành thạo bảy hằng đẳng thức đáng nhớ theo cả hai chiều.',
      'Phân tích đa thức thành nhân tử bằng nhiều phương pháp phối hợp.',
    ],
    theory: [
      {
        heading: '1. Bảy hằng đẳng thức đáng nhớ',
        body: ['Đây là bộ công cụ quan trọng nhất của Đại số THCS, phải thuộc theo **cả hai chiều**.'],
        formulas: [
          '$(A+B)^{2}=A^{2}+2AB+B^{2}$',
          '$(A-B)^{2}=A^{2}-2AB+B^{2}$',
          '$A^{2}-B^{2}=(A-B)(A+B)$',
          '$(A+B)^{3}=A^{3}+3A^{2}B+3AB^{2}+B^{3}$',
          '$(A-B)^{3}=A^{3}-3A^{2}B+3AB^{2}-B^{3}$',
          '$A^{3}+B^{3}=(A+B)(A^{2}-AB+B^{2})$',
          '$A^{3}-B^{3}=(A-B)(A^{2}+AB+B^{2})$',
        ],
        caution: [
          '$A^{2}+B^{2}$ **không** phân tích được trên tập số thực.',
          'Phân biệt $A^{2}-AB+B^{2}$ (bình phương thiếu) với $(A-B)^{2}=A^{2}-2AB+B^{2}$.',
        ],
      },
      {
        heading: '2. Bốn phương pháp phân tích thành nhân tử',
        body: ['Thứ tự ưu tiên khi gặp một đa thức bất kỳ:'],
        formulas: [
          '**Bước 1**: Đặt nhân tử chung (luôn thử đầu tiên).',
          '**Bước 2**: Dùng hằng đẳng thức.',
          '**Bước 3**: Nhóm hạng tử (thường nhóm 2–2 hoặc 3–1).',
          '**Bước 4**: Tách hạng tử / thêm bớt hạng tử.',
        ],
        caution: ['Phân tích phải **triệt để**: mỗi nhân tử thu được đều không phân tích thêm được nữa.'],
      },
      {
        heading: '3. Kỹ thuật tách hạng tử cho tam thức bậc hai',
        body: ['Với $ax^{2}+bx+c$: tìm hai số có tích $a\\cdot c$ và tổng $b$, rồi tách $bx$ thành hai hạng tử.'],
        formulas: [
          'Ví dụ $x^{2}-5x+6$: tìm hai số tích $6$, tổng $-5$ là $-2$ và $-3$.',
          '$x^{2}-5x+6=x^{2}-2x-3x+6=x(x-2)-3(x-2)=(x-2)(x-3)$',
        ],
      },
    ],
    decode: [
      { signal: 'Đa thức có 2 hạng tử', action: 'Thử ngay $A^{2}-B^{2}$, $A^{3}\\pm B^{3}$ hoặc đặt nhân tử chung.', why: 'Hai hạng tử chỉ có ba khả năng đó.' },
      { signal: 'Đa thức có 3 hạng tử', action: 'Thử $(A\\pm B)^{2}$; nếu không được thì tách hạng tử giữa.', why: 'Ba hạng tử là dấu hiệu của bình phương một tổng/hiệu hoặc tam thức bậc hai.' },
      { signal: 'Đa thức có 4 hạng tử', action: 'Nhóm 2–2 hoặc 3–1 (nhóm 3 để tạo hằng đẳng thức).', why: 'Nhóm 3–1 thường dẫn tới $A^{2}-B^{2}$.' },
      { signal: 'Bài toán tính giá trị biểu thức có số “lẻ”', action: 'Phân tích thành nhân tử trước rồi mới thay số.', why: 'Đề luôn cài để sau khi phân tích, số xấu bị triệt tiêu.' },
      { signal: 'Chứng minh chia hết cho $n$', action: 'Phân tích thành tích có chứa thừa số $n$.', why: 'Chia hết ⟺ tách được thừa số tương ứng.' },
      { signal: 'Tìm GTNN/GTLN của tam thức bậc hai', action: 'Đưa về dạng $(x+m)^{2}+k$ (hoàn thành bình phương).', why: '$(x+m)^{2}\\ge0$ cho ngay giá trị chặn.' },
    ],
    mindmap: {
      root: 'ĐA THỨC — HẰNG ĐẲNG THỨC — NHÂN TỬ',
      branches: [
        { title: 'Đơn thức, đa thức', items: ['Thu gọn, bậc', 'Cộng, trừ, nhân', 'Chia đơn thức, đa thức'] },
        { title: '7 hằng đẳng thức', items: ['Bình phương tổng, hiệu', 'Hiệu hai bình phương', 'Lập phương tổng, hiệu', 'Tổng, hiệu hai lập phương'] },
        { title: 'Phân tích nhân tử', items: ['Đặt nhân tử chung', 'Hằng đẳng thức', 'Nhóm hạng tử', 'Tách, thêm bớt'] },
        { title: 'Ứng dụng', items: ['Tính nhanh giá trị', 'Tìm $x$', 'Chứng minh chia hết', 'Cực trị'] },
      ],
    },
    practiceSkills: [
      {
        title: 'Quy trình phân tích nhân tử “không bao giờ bí”',
        detail: [
          '1. Có nhân tử chung không? → Đặt ra ngoài.',
          '2. Đếm số hạng tử: 2 → hằng đẳng thức hiệu/tổng; 3 → bình phương hoặc tách; 4 trở lên → nhóm.',
          '3. Sau mỗi bước, kiểm tra từng nhân tử còn phân tích được nữa không.',
          '4. Nhân ngược lại để kiểm tra kết quả.',
        ],
      },
      {
        title: 'Kỹ năng hoàn thành bình phương',
        detail: [
          '$x^{2}+bx=\\left(x+\\f{b}{2}\\right)^{2}-\\f{b^{2}}{4}$.',
          'Luôn lấy nửa hệ số của $x$ rồi bình phương để bù trừ.',
          'Dùng cho bài tìm GTNN, GTLN và giải phương trình bậc hai ở lớp 9.',
        ],
      },
    ],
    types: [
      {
        id: 'g8-t1-d1', name: 'Dạng 1. Khai triển và rút gọn bằng hằng đẳng thức', level: 'NB',
        method: ['Nhận dạng $A$, $B$.', 'Áp dụng đúng công thức.', 'Thu gọn kết quả.'],
        worked: [{
          prompt: 'Rút gọn $M=(2x+3)^{2}-(2x-3)^{2}$.',
          thinking: ['Có dạng $A^{2}-B^{2}$ với $A=2x+3$, $B=2x-3$ → dùng luôn hiệu hai bình phương, nhanh hơn khai triển.'],
          solution: [
            '$M=[(2x+3)-(2x-3)]\\cdot[(2x+3)+(2x-3)]$',
            '$M=6\\cdot4x=24x$.',
          ],
          remark: 'Nhìn ra $A^{2}-B^{2}$ giúp rút ngắn từ 6 dòng khai triển xuống còn 2 dòng.',
        }],
      },
      {
        id: 'g8-t1-d2', name: 'Dạng 2. Phân tích đa thức thành nhân tử', level: 'TH',
        method: ['Đặt nhân tử chung → hằng đẳng thức → nhóm → tách.', 'Kiểm tra phân tích đã triệt để chưa.'],
        pitfalls: ['Dừng lại khi chưa phân tích hết.', 'Nhóm sai dấu khi đặt dấu trừ ra ngoài.'],
        worked: [{
          prompt: 'Phân tích thành nhân tử: $A=x^{2}-2xy+y^{2}-9$.',
          thinking: [
            'Bốn hạng tử. Ba hạng tử đầu tạo thành $(x-y)^{2}$ → nhóm 3–1.',
            'Sau khi nhóm ta có hiệu hai bình phương.',
          ],
          solution: [
            '$A=(x^{2}-2xy+y^{2})-9=(x-y)^{2}-3^{2}$',
            '$A=(x-y-3)(x-y+3)$.',
          ],
        }],
      },
      {
        id: 'g8-t1-d3', name: 'Dạng 3. Tìm x bằng phân tích nhân tử', level: 'VD',
        method: ['Chuyển hết về một vế, vế kia bằng 0.', 'Phân tích vế trái thành nhân tử.', 'Cho từng nhân tử bằng 0.'],
        pitfalls: ['Chia hai vế cho biểu thức chứa $x$ (làm mất nghiệm).'],
        worked: [{
          prompt: 'Tìm $x$: $x^{3}-4x=0$.',
          thinking: ['Không được chia hai vế cho $x$ vì sẽ mất nghiệm $x=0$. Phải phân tích thành nhân tử.'],
          solution: [
            '$x(x^{2}-4)=0$',
            '$x(x-2)(x+2)=0$',
            '$x=0$ hoặc $x=2$ hoặc $x=-2$.',
            'Vậy $x\\in\\{0;2;-2\\}$.',
          ],
        }],
      },
      {
        id: 'g8-t1-d4', name: 'Dạng 4. Vận dụng cao — cực trị và chứng minh', level: 'VDC',
        method: ['Hoàn thành bình phương để chặn.', 'Với chứng minh chia hết: phân tích ra thừa số tương ứng.', 'Chỉ rõ dấu bằng xảy ra khi nào.'],
        worked: [{
          prompt: 'Tìm giá trị nhỏ nhất của $P=x^{2}-6x+13$.',
          thinking: ['Hoàn thành bình phương: nửa hệ số của $x$ là $-3$, bình phương là 9.'],
          solution: [
            '$P=x^{2}-6x+9+4=(x-3)^{2}+4$.',
            'Vì $(x-3)^{2}\\ge0$ với mọi $x$ nên $P\\ge4$.',
            'Dấu “=” xảy ra khi $x-3=0\\Leftrightarrow x=3$.',
            'Vậy $P_{\\min}=4$ khi $x=3$.',
          ],
        }, {
          prompt: 'Chứng minh $n^{3}-n$ chia hết cho 6 với mọi số nguyên $n$.',
          thinking: ['Phân tích thành tích ba số nguyên liên tiếp — trong ba số liên tiếp luôn có một bội của 2 và một bội của 3.'],
          solution: [
            '$n^{3}-n=n(n^{2}-1)=n(n-1)(n+1)=(n-1)n(n+1)$.',
            'Đây là tích ba số nguyên liên tiếp.',
            'Trong ba số nguyên liên tiếp luôn có ít nhất một số chia hết cho 2 và một số chia hết cho 3.',
            'Vì ƯCLN$(2;3)=1$ nên tích chia hết cho $2\\cdot3=6$.',
            'Vậy $n^{3}-n\;\\vdots\;6$ với mọi $n\\in\\Z$.',
          ],
        }],
      },
    ],
    bank: ['g8.hang-dang-thuc', 'g8.nhan-tu', 'g8.timx-nhantu', 'g8.cuc-tri'],
  },

  {
    id: 'g8-t2', grade: 8, term: 'HK1', strand: 'SO_DAI_SO', order: 2,
    name: 'Phân thức đại số',
    summary: 'Phân thức, điều kiện xác định, rút gọn, quy đồng và bốn phép tính với phân thức.',
    outcomes: [
      'Tìm điều kiện xác định của phân thức.',
      'Rút gọn phân thức, quy đồng mẫu nhiều phân thức.',
      'Thực hiện cộng, trừ, nhân, chia phân thức và rút gọn biểu thức tổng hợp.',
    ],
    theory: [
      {
        heading: '1. Phân thức và điều kiện xác định',
        body: [],
        formulas: [
          'Phân thức $\\f{A}{B}$ với $A,B$ là đa thức, $B\\ne0$.',
          '**Điều kiện xác định**: mẫu thức khác 0.',
          '$\\f{A}{B}=\\f{C}{D}\\Leftrightarrow AD=BC$',
          'Rút gọn: $\\f{A\\cdot M}{B\\cdot M}=\\f{A}{B}$ ($M\\ne0$)',
        ],
        caution: ['Luôn viết điều kiện xác định **trước** khi rút gọn — thiếu là mất điểm.'],
      },
      {
        heading: '2. Các phép tính',
        body: [],
        formulas: [
          'Cộng, trừ: quy đồng mẫu (mẫu chung là BCNN của các mẫu sau khi phân tích thành nhân tử).',
          '$\\f{A}{B}\\cdot\\f{C}{D}=\\f{AC}{BD}$ ; $\\f{A}{B}:\\f{C}{D}=\\f{A}{B}\\cdot\\f{D}{C}$',
          'Phân thức đối: $-\\f{A}{B}=\\f{-A}{B}=\\f{A}{-B}$',
        ],
      },
    ],
    decode: [
      { signal: 'Bài “rút gọn biểu thức” nhiều phân thức', action: 'Phân tích mọi mẫu thành nhân tử trước, rồi mới tìm mẫu chung.', why: 'Chưa phân tích thì không thấy được mẫu chung nhỏ nhất.' },
      { signal: 'Đề hỏi “tìm $x$ để biểu thức nhận giá trị nguyên”', action: 'Rút gọn rồi tách phần nguyên, cho mẫu là ước của tử còn lại.', why: 'Kỹ thuật tách phần nguyên như ở lớp 6.' },
      { signal: 'Đề hỏi “tìm $x$ để $P>0$ / $P<0$”', action: 'Rút gọn rồi xét dấu tử và mẫu.', why: 'Dấu của thương phụ thuộc dấu của tử và mẫu.' },
      { signal: 'Có $\\f{1}{x}-\\f{1}{x+1}$ dạng liên tiếp', action: 'Dùng kỹ thuật sai phân để khử.', why: 'Tổng dài triệt tiêu về hai số hạng đầu – cuối.' },
    ],
    mindmap: {
      root: 'PHÂN THỨC ĐẠI SỐ',
      branches: [
        { title: 'Khái niệm', items: ['$\\f{A}{B}$, $B\\ne0$', 'Điều kiện xác định', 'Hai phân thức bằng nhau'] },
        { title: 'Biến đổi', items: ['Rút gọn', 'Quy đồng mẫu', 'Đổi dấu'] },
        { title: 'Phép tính', items: ['Cộng, trừ', 'Nhân, chia', 'Rút gọn biểu thức tổng hợp'] },
        { title: 'Bài toán phụ', items: ['Tính giá trị tại $x=a$', 'Tìm $x$ để $P$ nguyên', 'Xét dấu $P$', 'Tìm GTNN, GTLN'] },
      ],
    },
    types: [
      {
        id: 'g8-t2-d1', name: 'Dạng 1. Điều kiện xác định và rút gọn', level: 'TH',
        method: ['Phân tích tử và mẫu thành nhân tử.', 'Đặt điều kiện mẫu khác 0.', 'Rút gọn nhân tử chung.'],
        worked: [{
          prompt: 'Cho $P=\\f{x^{2}-4}{x^{2}+2x}$. Tìm điều kiện xác định và rút gọn $P$.',
          thinking: ['Phân tích cả tử và mẫu để lộ nhân tử chung.'],
          solution: [
            '$x^{2}-4=(x-2)(x+2)$; $x^{2}+2x=x(x+2)$.',
            'Điều kiện: $x(x+2)\\ne0\\Leftrightarrow x\\ne0$ và $x\\ne-2$.',
            '$P=\\f{(x-2)(x+2)}{x(x+2)}=\\f{x-2}{x}$.',
          ],
        }],
      },
      {
        id: 'g8-t2-d2', name: 'Dạng 2. Cộng, trừ, nhân, chia phân thức', level: 'VD',
        method: ['Phân tích mẫu.', 'Tìm mẫu thức chung.', 'Quy đồng và thu gọn tử.', 'Rút gọn kết quả.'],
        worked: [{
          prompt: 'Rút gọn $Q=\\f{1}{x-2}+\\f{1}{x+2}-\\f{4}{x^{2}-4}$ (với $x\\ne\\pm2$).',
          thinking: ['$x^{2}-4=(x-2)(x+2)$ chính là mẫu chung.'],
          solution: [
            'Mẫu chung: $(x-2)(x+2)$.',
            '$Q=\\f{(x+2)+(x-2)-4}{(x-2)(x+2)}=\\f{2x-4}{(x-2)(x+2)}$',
            '$Q=\\f{2(x-2)}{(x-2)(x+2)}=\\f{2}{x+2}$.',
          ],
        }],
      },
      {
        id: 'g8-t2-d3', name: 'Dạng 3. Vận dụng cao — bài toán phụ sau khi rút gọn', level: 'VDC',
        method: ['Rút gọn về dạng đơn giản nhất.', 'Tách phần nguyên nếu tìm giá trị nguyên.', 'Đối chiếu điều kiện xác định trước khi kết luận.'],
        pitfalls: ['Quên loại các giá trị vi phạm điều kiện xác định.'],
        worked: [{
          prompt: 'Cho $P=\\f{x-2}{x}$ (với $x\\ne0$). Tìm các số nguyên $x$ để $P$ nhận giá trị nguyên.',
          thinking: ['Tách $\\f{x-2}{x}=1-\\f{2}{x}$ để lộ điều kiện chia hết.'],
          solution: [
            '$P=1-\\f{2}{x}$.',
            '$P\\in\\Z\\Leftrightarrow \\f{2}{x}\\in\\Z\\Leftrightarrow x$ là ước của 2.',
            '$x\\in\\{-2;-1;1;2\\}$ (đều thoả $x\\ne0$).',
            'Vậy $x\\in\\{-2;-1;1;2\\}$.',
          ],
        }],
      },
    ],
    bank: ['g8.phan-thuc-rutgon', 'g8.phan-thuc-tinh', 'g8.phan-thuc-vdc'],
  },

  {
    id: 'g8-t3', grade: 8, term: 'HK2', strand: 'SO_DAI_SO', order: 3,
    name: 'Phương trình bậc nhất một ẩn và Giải bài toán bằng cách lập phương trình',
    summary: 'Phương trình bậc nhất một ẩn, phương trình đưa được về bậc nhất, và quy trình giải bài toán thực tế bằng cách lập phương trình.',
    outcomes: [
      'Giải thành thạo phương trình bậc nhất một ẩn và phương trình đưa được về dạng đó.',
      'Lập được phương trình từ tình huống thực tế và giải, đối chiếu điều kiện.',
    ],
    theory: [
      {
        heading: '1. Phương trình bậc nhất một ẩn',
        body: [],
        formulas: [
          'Dạng: $ax+b=0$ ($a\\ne0$), nghiệm duy nhất $x=-\\f{b}{a}$',
          'Quy tắc chuyển vế: chuyển một hạng tử sang vế kia và **đổi dấu**',
          'Quy tắc nhân/chia: nhân hoặc chia hai vế cho cùng một số **khác 0**',
        ],
        caution: ['Nếu $a=0$: $b=0$ thì phương trình có vô số nghiệm; $b\\ne0$ thì vô nghiệm.'],
      },
      {
        heading: '2. Sáu bước giải bài toán bằng cách lập phương trình',
        body: ['Đây là quy trình chuẩn, viết đủ mới trọn điểm.'],
        formulas: [
          '1. Gọi ẩn, đặt **đơn vị** và **điều kiện** cho ẩn.',
          '2. Biểu diễn các đại lượng chưa biết khác theo ẩn.',
          '3. Lập phương trình dựa vào mối quan hệ trong đề.',
          '4. Giải phương trình.',
          '5. **Đối chiếu điều kiện**, loại nghiệm không hợp lệ.',
          '6. Kết luận có đơn vị.',
        ],
      },
      {
        heading: '3. Ba mô hình bài toán thường gặp',
        body: [],
        formulas: [
          'Chuyển động: $s=v\\cdot t$ ; xuôi dòng $v+v_{n}$, ngược dòng $v-v_{n}$',
          'Năng suất – công việc: coi công việc là 1, năng suất $=\\f{1}{t}$',
          'Toán phần trăm – tỉ lệ: giá sau $=$ giá trước $\\cdot(1\\pm\\f{m}{100})$',
        ],
      },
    ],
    decode: [
      { signal: 'Đề cho quãng đường không đổi, hai vận tốc khác nhau', action: 'Lập phương trình theo thời gian: $\\f{s}{v_1}-\\f{s}{v_2}=\\Delta t$.', why: 'Đại lượng chung (quãng đường) là cầu nối giữa hai tình huống.' },
      { signal: 'Đề nói “làm chung xong trong $t$ giờ”', action: 'Cộng năng suất: $\\f{1}{t_1}+\\f{1}{t_2}=\\f{1}{t}$.', why: 'Năng suất có tính cộng, thời gian thì không.' },
      { signal: 'Bài toán ca nô/thuyền trên sông', action: 'Vận tốc xuôi $=v+v_n$, ngược $=v-v_n$.', why: 'Dòng nước cộng/trừ trực tiếp vào vận tốc thực.' },
      { signal: 'Đề cho “nếu thêm/bớt … thì …”', action: 'Viết hai biểu thức cho hai tình huống rồi đặt bằng nhau theo dữ kiện.', why: 'Cấu trúc “nếu… thì…” chính là phương trình.' },
      { signal: 'Bài toán về số có hai chữ số', action: 'Đặt số là $\\ov{ab}=10a+b$ với $1\\le a\\le9$, $0\\le b\\le9$.', why: 'Chuyển ngôn ngữ chữ số sang biểu thức đại số.' },
    ],
    mindmap: {
      root: 'PHƯƠNG TRÌNH BẬC NHẤT',
      branches: [
        { title: 'Lý thuyết', items: ['$ax+b=0$', 'Quy tắc chuyển vế', 'Quy tắc nhân', 'Biện luận khi $a=0$'] },
        { title: 'Kỹ thuật giải', items: ['Quy đồng khử mẫu', 'Bỏ ngoặc', 'Chuyển vế thu gọn', 'Chia hệ số'] },
        { title: '6 bước lập PT', items: ['Gọi ẩn + điều kiện', 'Biểu diễn đại lượng', 'Lập PT', 'Giải', 'Đối chiếu', 'Kết luận'] },
        { title: 'Mô hình', items: ['Chuyển động $s=vt$', 'Năng suất $\\f{1}{t}$', 'Phần trăm', 'Số có hai chữ số'] },
      ],
    },
    practiceSkills: [
      {
        title: 'Kỹ năng lập bảng dữ kiện',
        detail: [
          'Kẻ bảng 3 cột: Đại lượng | Tình huống 1 | Tình huống 2.',
          'Điền các ô đã biết, ô chứa ẩn, ô biểu diễn theo ẩn.',
          'Dòng nào có dữ kiện so sánh chính là nơi lập phương trình.',
        ],
      },
    ],
    types: [
      {
        id: 'g8-t3-d1', name: 'Dạng 1. Giải phương trình đưa về bậc nhất', level: 'TH',
        method: ['Quy đồng, khử mẫu.', 'Bỏ ngoặc.', 'Chuyển vế, thu gọn.', 'Chia hệ số và kết luận.'],
        worked: [{
          prompt: 'Giải phương trình $\\f{2x-1}{3}-\\f{x+2}{4}=1$.',
          thinking: ['Mẫu chung là 12 → nhân cả hai vế với 12 để khử mẫu.'],
          solution: [
            'Nhân hai vế với 12: $4(2x-1)-3(x+2)=12$.',
            '$8x-4-3x-6=12$',
            '$5x=22\\Rightarrow x=\\f{22}{5}$.',
            'Vậy phương trình có nghiệm $x=\\f{22}{5}$.',
          ],
        }],
      },
      {
        id: 'g8-t3-d2', name: 'Dạng 2. Bài toán chuyển động', level: 'VD',
        method: ['Lập bảng $s$, $v$, $t$ cho từng chặng.', 'Dùng $t=\\f{s}{v}$.', 'Lập phương trình theo dữ kiện chênh lệch.'],
        worked: [{
          prompt: 'Một ô tô đi từ A đến B với vận tốc $50\\,km/h$, lúc về đi với vận tốc $60\\,km/h$ nên thời gian về ít hơn thời gian đi 30 phút. Tính quãng đường AB.',
          thinking: [
            'Quãng đường là đại lượng chung → gọi nó là ẩn.',
            'Đổi 30 phút $=0{,}5$ giờ.',
          ],
          solution: [
            'Gọi quãng đường AB là $x$ (km, $x>0$).',
            'Thời gian đi: $\\f{x}{50}$ (giờ). Thời gian về: $\\f{x}{60}$ (giờ).',
            'Theo đề: $\\f{x}{50}-\\f{x}{60}=\\f{1}{2}$.',
            'Nhân hai vế với 300: $6x-5x=150\\Rightarrow x=150$.',
            '$x=150>0$ thoả điều kiện.',
            'Vậy quãng đường AB dài **150 km**.',
          ],
        }],
      },
      {
        id: 'g8-t3-d3', name: 'Dạng 3. Bài toán năng suất — làm chung, làm riêng', level: 'VDC',
        method: ['Coi toàn bộ công việc là 1.', 'Năng suất mỗi giờ $=\\f{1}{\\text{thời gian}}$.', 'Cộng năng suất khi làm chung.'],
        worked: [{
          prompt: 'Hai người cùng làm chung một công việc thì sau 6 giờ xong. Nếu người thứ nhất làm một mình thì mất 10 giờ. Hỏi người thứ hai làm một mình thì bao lâu xong công việc?',
          thinking: [
            'Không cộng được thời gian, phải cộng **năng suất**.',
            'Năng suất chung $=$ năng suất người 1 $+$ năng suất người 2.',
          ],
          solution: [
            'Gọi thời gian người thứ hai làm một mình là $x$ (giờ, $x>0$).',
            'Trong 1 giờ: người 1 làm được $\\f{1}{10}$ công việc, người 2 làm được $\\f{1}{x}$ công việc.',
            'Làm chung trong 1 giờ được $\\f{1}{6}$ công việc, nên $\\f{1}{10}+\\f{1}{x}=\\f{1}{6}$.',
            '$\\f{1}{x}=\\f{1}{6}-\\f{1}{10}=\\f{5-3}{30}=\\f{2}{30}=\\f{1}{15}$.',
            '$x=15$ (thoả điều kiện $x>0$).',
            'Vậy người thứ hai làm một mình mất **15 giờ**.',
          ],
          remark: 'Nguyên tắc bất di bất dịch: cộng năng suất, không bao giờ cộng thời gian.',
        }],
      },
    ],
    bank: ['g8.pt-bac-nhat', 'g8.lap-pt-chuyen-dong', 'g8.lap-pt-nang-suat'],
  },

  {
    id: 'g8-t4', grade: 8, term: 'HK2', strand: 'SO_DAI_SO', order: 4,
    name: 'Hàm số bậc nhất và Đồ thị',
    summary: 'Hàm số, mặt phẳng toạ độ, hàm số bậc nhất $y=ax+b$, đồ thị và hệ số góc.',
    outcomes: [
      'Nhận biết hàm số, tính giá trị của hàm số.',
      'Vẽ đồ thị hàm số bậc nhất, xác định hệ số góc.',
      'Xét vị trí tương đối của hai đường thẳng; giải bài toán thực tiễn.',
    ],
    theory: [
      {
        heading: 'Hàm số bậc nhất $y=ax+b$ ($a\\ne0$)',
        body: [],
        formulas: [
          'Đồ thị là một **đường thẳng** cắt trục tung tại điểm $(0;b)$ và cắt trục hoành tại $\\left(-\\f{b}{a};0\\right)$.',
          '$a$ là **hệ số góc**: $a>0$ thì hàm số đồng biến (đường thẳng đi lên); $a<0$ thì nghịch biến (đi xuống).',
          'Hai đường thẳng $y=ax+b$ và $y=a\'x+b\'$: song song $\\Leftrightarrow a=a\'$ và $b\\ne b\'$; cắt nhau $\\Leftrightarrow a\\ne a\'$; trùng nhau $\\Leftrightarrow a=a\'$, $b=b\'$.',
          'Điểm $M(x_0;y_0)$ thuộc đồ thị $\\Leftrightarrow y_0=ax_0+b$.',
        ],
      },
    ],
    decode: [
      { signal: 'Đề cho đồ thị đi qua hai điểm', action: 'Thay toạ độ vào $y=ax+b$ để lập hệ hai phương trình.', why: 'Hai điểm xác định duy nhất một đường thẳng.' },
      { signal: 'Đề nói “song song với đường thẳng $y=2x+1$”', action: 'Lấy $a=2$, rồi dùng điều kiện còn lại để tìm $b$ (nhớ $b\\ne1$).', why: 'Song song ⟺ cùng hệ số góc, khác tung độ gốc.' },
      { signal: 'Đề hỏi giao điểm hai đường thẳng', action: 'Giải phương trình hoành độ giao điểm $ax+b=a\'x+b\'$.', why: 'Giao điểm là điểm chung của hai đồ thị.' },
      { signal: 'Bài toán thực tế có “phí cố định + phí theo đơn vị”', action: 'Mô hình hoá bằng $y=ax+b$ với $b$ là phí cố định.', why: 'Đây là mô hình tuyến tính điển hình.' },
    ],
    mindmap: {
      root: 'HÀM SỐ BẬC NHẤT',
      branches: [
        { title: 'Hàm số', items: ['Khái niệm', 'Giá trị $f(x_0)$', 'Mặt phẳng toạ độ'] },
        { title: '$y=ax+b$', items: ['$a\\ne0$', 'Đồng biến / nghịch biến', 'Hệ số góc $a$', 'Tung độ gốc $b$'] },
        { title: 'Đồ thị', items: ['Đường thẳng', 'Vẽ qua 2 điểm', 'Giao với hai trục'] },
        { title: 'Vị trí tương đối', items: ['Song song', 'Cắt nhau', 'Trùng nhau', 'Vuông góc: $aa\'=-1$'] },
      ],
    },
    types: [
      {
        id: 'g8-t4-d1', name: 'Dạng 1. Xác định hàm số bậc nhất', level: 'TH',
        method: ['Thay toạ độ điểm vào công thức.', 'Giải hệ tìm $a$, $b$.', 'Kết luận công thức hàm số.'],
        worked: [{
          prompt: 'Xác định hàm số $y=ax+b$ biết đồ thị đi qua hai điểm $A(1;5)$ và $B(-2;-4)$.',
          thinking: ['Thay lần lượt hai điểm để có hệ hai phương trình.'],
          solution: [
            'Thay $A(1;5)$: $a+b=5$. (1)',
            'Thay $B(-2;-4)$: $-2a+b=-4$. (2)',
            'Lấy (1) trừ (2): $3a=9\\Rightarrow a=3$; thay vào (1): $b=2$.',
            'Vậy $y=3x+2$.',
          ],
        }],
      },
      {
        id: 'g8-t4-d2', name: 'Dạng 2. Vị trí tương đối và bài toán tham số', level: 'VD',
        method: ['So sánh hệ số góc.', 'Áp dụng điều kiện song song / cắt / trùng.', 'Đối chiếu điều kiện $a\\ne0$.'],
        worked: [{
          prompt: 'Tìm $m$ để đường thẳng $y=(m-1)x+3$ song song với đường thẳng $y=2x-5$.',
          thinking: ['Song song ⟺ hệ số góc bằng nhau và tung độ gốc khác nhau.'],
          solution: [
            'Điều kiện hàm số bậc nhất: $m-1\\ne0\\Leftrightarrow m\\ne1$.',
            'Song song: $m-1=2\\Rightarrow m=3$; đồng thời $3\\ne-5$ (thoả).',
            'Vậy $m=3$.',
          ],
        }],
      },
    ],
    bank: ['g8.ham-so-bac-nhat', 'g8.do-thi'],
  },

  {
    id: 'g8-t5', grade: 8, term: 'HK1', strand: 'HINH_HOC', order: 5,
    name: 'Tứ giác — Các hình đặc biệt',
    summary: 'Tứ giác, hình thang cân, hình bình hành, hình chữ nhật, hình thoi, hình vuông: tính chất và dấu hiệu nhận biết.',
    outcomes: [
      'Nhận biết và vận dụng tính chất, dấu hiệu nhận biết các tứ giác đặc biệt.',
      'Chứng minh một tứ giác là hình bình hành, hình chữ nhật, hình thoi, hình vuông.',
    ],
    theory: [
      {
        heading: '1. Sơ đồ quan hệ giữa các tứ giác',
        body: ['Nắm sơ đồ này thì mọi bài chứng minh đều có đường đi rõ ràng.'],
        formulas: [
          'Tứ giác $\\to$ Hình thang $\\to$ Hình thang cân',
          'Tứ giác $\\to$ Hình bình hành $\\to$ Hình chữ nhật $\\to$ Hình vuông',
          'Hình bình hành $\\to$ Hình thoi $\\to$ Hình vuông',
          'Hình vuông $=$ Hình chữ nhật $+$ hai cạnh kề bằng nhau $=$ Hình thoi $+$ một góc vuông',
        ],
      },
      {
        heading: '2. Dấu hiệu nhận biết (thuộc lòng)',
        body: [],
        formulas: [
          '**Hình bình hành**: 2 cặp cạnh đối song song; hoặc 2 cặp cạnh đối bằng nhau; hoặc 1 cặp cạnh đối vừa song song vừa bằng nhau; hoặc 2 cặp góc đối bằng nhau; hoặc 2 đường chéo cắt nhau tại trung điểm mỗi đường.',
          '**Hình chữ nhật**: hình bình hành có 1 góc vuông; hoặc có 2 đường chéo bằng nhau; hoặc tứ giác có 3 góc vuông.',
          '**Hình thoi**: hình bình hành có 2 cạnh kề bằng nhau; hoặc 2 đường chéo vuông góc; hoặc 1 đường chéo là phân giác của một góc; hoặc tứ giác có 4 cạnh bằng nhau.',
          '**Hình vuông**: hình chữ nhật có 2 cạnh kề bằng nhau (hoặc 2 đường chéo vuông góc); hoặc hình thoi có 1 góc vuông (hoặc 2 đường chéo bằng nhau).',
        ],
        caution: ['Trong tam giác vuông, đường trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền — dấu hiệu này rất hay dùng.'],
      },
    ],
    decode: [
      { signal: 'Đề cho hai trung điểm của hai cạnh đối', action: 'Nghĩ tới đường trung bình hoặc hình bình hành (1 cặp cạnh song song và bằng nhau).', why: 'Trung điểm là nguồn sinh ra cặp cạnh song song – bằng nhau.' },
      { signal: 'Đề cho “lấy $E$ đối xứng với $D$ qua $M$”', action: 'Suy ra $M$ là trung điểm $DE$ → hai đường chéo cắt nhau tại trung điểm → hình bình hành.', why: 'Đối xứng tâm chính là dấu hiệu hình bình hành.' },
      { signal: 'Có tam giác vuông và trung điểm cạnh huyền', action: 'Dùng trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền.', why: 'Cho ngay ba đoạn bằng nhau, rất mạnh khi chứng minh.' },
      { signal: 'Đề hỏi “tìm điều kiện để tứ giác là hình vuông”', action: 'Chứng minh nó là hình chữ nhật (hoặc hình thoi) trước, rồi thêm một điều kiện.', why: 'Đi từng nấc theo sơ đồ quan hệ thì không bao giờ thiếu ý.' },
    ],
    mindmap: {
      root: 'TỨ GIÁC ĐẶC BIỆT',
      branches: [
        { title: 'Hình thang', items: ['2 cạnh đối song song', 'Hình thang cân: 2 góc đáy bằng nhau', 'Đường trung bình'] },
        { title: 'Hình bình hành', items: ['5 dấu hiệu', 'Cạnh đối, góc đối bằng nhau', 'Đường chéo cắt nhau tại trung điểm'] },
        { title: 'Hình chữ nhật', items: ['HBH + 1 góc vuông', '2 đường chéo bằng nhau', 'Trung tuyến cạnh huyền'] },
        { title: 'Hình thoi', items: ['HBH + 2 cạnh kề bằng nhau', '2 đường chéo vuông góc', 'Đường chéo là phân giác'] },
        { title: 'Hình vuông', items: ['HCN + 2 cạnh kề bằng nhau', 'Hình thoi + 1 góc vuông', 'Đủ mọi tính chất'] },
      ],
    },
    practiceSkills: [
      {
        title: 'Chiến thuật “leo thang” khi chứng minh tứ giác đặc biệt',
        detail: [
          'Luôn chứng minh hình bình hành trước (dễ nhất, nhiều dấu hiệu nhất).',
          'Thêm một điều kiện góc vuông → hình chữ nhật; thêm hai cạnh kề bằng nhau → hình thoi.',
          'Có cả hai → hình vuông.',
          'Không nhảy cóc: nhảy thẳng lên hình vuông thường thiếu lập luận.',
        ],
      },
    ],
    types: [
      {
        id: 'g8-t5-d1', name: 'Dạng 1. Chứng minh tứ giác là hình bình hành', level: 'VD',
        method: ['Chọn dấu hiệu phù hợp với dữ kiện đề cho.', 'Chứng minh đầy đủ hai ý của dấu hiệu.', 'Kết luận.'],
        worked: [{
          prompt: 'Cho tam giác $ABC$, gọi $M$ là trung điểm $BC$. Trên tia đối của tia $MA$ lấy điểm $D$ sao cho $MD=MA$. Chứng minh tứ giác $ABDC$ là hình bình hành.',
          thinking: ['$M$ là trung điểm của cả $BC$ và $AD$ → hai đường chéo cắt nhau tại trung điểm mỗi đường.'],
          solution: [
            'Xét tứ giác $ABDC$ có hai đường chéo là $AD$ và $BC$ cắt nhau tại $M$.',
            '$M$ là trung điểm $BC$ (giả thiết).',
            '$M$ là trung điểm $AD$ (vì $D$ thuộc tia đối của $MA$ và $MD=MA$).',
            'Vậy $ABDC$ là hình bình hành (hai đường chéo cắt nhau tại trung điểm mỗi đường).',
          ],
        }],
      },
      {
        id: 'g8-t5-d2', name: 'Dạng 2. Chứng minh hình chữ nhật, hình thoi, hình vuông', level: 'VDC',
        method: ['Leo thang: hình bình hành → thêm điều kiện.', 'Tìm điều kiện để trở thành hình vuông.'],
        worked: [{
          prompt: 'Cho tam giác $ABC$ vuông tại $A$, $M$ là trung điểm $BC$. Gọi $D$, $E$ lần lượt là chân đường vuông góc hạ từ $M$ xuống $AB$, $AC$. Chứng minh tứ giác $ADME$ là hình chữ nhật.',
          thinking: ['Tứ giác có ba góc vuông là hình chữ nhật — đây là dấu hiệu ngắn nhất ở đây.'],
          solution: [
            'Xét tứ giác $ADME$ có: $\\angle DAE=90\\deg$ (vì $\\tri ABC$ vuông tại $A$).',
            '$\\angle ADM=90\\deg$ (vì $MD\\perp AB$).',
            '$\\angle AEM=90\\deg$ (vì $ME\\perp AC$).',
            'Tứ giác có ba góc vuông nên $ADME$ là hình chữ nhật.',
          ],
          remark: 'Nếu đề hỏi thêm “điều kiện để $ADME$ là hình vuông” thì trả lời: khi $AB=AC$, tức $\\tri ABC$ vuông cân tại $A$.',
        }],
      },
    ],
    bank: ['g8.tu-giac', 'g8.hbh', 'g8.hcn-hthoi-hvuong'],
  },

  {
    id: 'g8-t6', grade: 8, term: 'HK2', strand: 'HINH_HOC', order: 6,
    name: 'Định lí Thalès — Tam giác đồng dạng',
    summary: 'Định lí Thalès, đường trung bình, tính chất đường phân giác, các trường hợp đồng dạng của tam giác và ứng dụng.',
    outcomes: [
      'Vận dụng định lí Thalès, Thalès đảo và hệ quả.',
      'Vận dụng tính chất đường phân giác trong tam giác.',
      'Chứng minh hai tam giác đồng dạng và vận dụng để tính độ dài, chứng minh hệ thức.',
    ],
    theory: [
      {
        heading: '1. Định lí Thalès và hệ quả',
        body: [],
        formulas: [
          '**Thuận**: Nếu $MN\\para BC$ ($M\\in AB$, $N\\in AC$) thì $\\f{AM}{MB}=\\f{AN}{NC}$ và $\\f{AM}{AB}=\\f{AN}{AC}$.',
          '**Đảo**: Nếu $\\f{AM}{MB}=\\f{AN}{NC}$ thì $MN\\para BC$.',
          '**Hệ quả**: Nếu $MN\\para BC$ thì $\\f{AM}{AB}=\\f{AN}{AC}=\\f{MN}{BC}$.',
          'Đường trung bình: nối trung điểm hai cạnh, song song với cạnh thứ ba và bằng nửa cạnh ấy.',
          'Tính chất đường phân giác: $AD$ là phân giác $\\angle A$ của $\\tri ABC$ thì $\\f{DB}{DC}=\\f{AB}{AC}$.',
        ],
      },
      {
        heading: '2. Ba trường hợp đồng dạng của tam giác',
        body: [],
        formulas: [
          '**c.c.c**: ba cặp cạnh tương ứng tỉ lệ.',
          '**c.g.c**: hai cặp cạnh tỉ lệ và góc xen giữa bằng nhau.',
          '**g.g**: hai cặp góc bằng nhau (dùng nhiều nhất).',
          'Tam giác vuông: một cặp góc nhọn bằng nhau; hoặc hai cạnh góc vuông tỉ lệ; hoặc cạnh huyền và một cạnh góc vuông tỉ lệ.',
          'Tỉ số đồng dạng $k$: tỉ số chu vi $=k$, tỉ số diện tích $=k^{2}$.',
        ],
        caution: ['Viết đúng thứ tự đỉnh tương ứng khi ký hiệu $\\tri ABC\\sim\\tri A\'B\'C\'$ — sai thứ tự là sai tỉ lệ.'],
      },
    ],
    decode: [
      { signal: 'Hình có đường thẳng song song với một cạnh tam giác', action: 'Dùng ngay định lí Thalès hoặc hệ quả để lập tỉ số.', why: 'Song song sinh ra tỉ lệ đoạn thẳng.' },
      { signal: 'Đề cho phân giác trong tam giác', action: 'Dùng $\\f{DB}{DC}=\\f{AB}{AC}$.', why: 'Đây là công cụ duy nhất chuyển phân giác thành tỉ số độ dài.' },
      { signal: 'Đề yêu cầu chứng minh hệ thức dạng $AB\\cdot AC=AD\\cdot AE$', action: 'Đưa về tỉ số $\\f{AB}{AD}=\\f{AE}{AC}$ rồi tìm hai tam giác đồng dạng chứa các cạnh đó.', why: 'Tích chéo ⟺ tỉ lệ ⟺ đồng dạng.' },
      { signal: 'Có hai tam giác chung một góc', action: 'Chỉ cần thêm một cặp góc bằng nhau là đủ (g.g).', why: 'g.g là trường hợp nhẹ điều kiện nhất, ưu tiên dùng.' },
      { signal: 'Đề hỏi tỉ số diện tích', action: 'Bình phương tỉ số đồng dạng.', why: 'Diện tích tỉ lệ với bình phương độ dài.' },
    ],
    mindmap: {
      root: 'THALÈS — TAM GIÁC ĐỒNG DẠNG',
      branches: [
        { title: 'Thalès', items: ['Thuận, đảo, hệ quả', 'Đường trung bình', 'Chia đoạn thẳng tỉ lệ'] },
        { title: 'Phân giác', items: ['$\\f{DB}{DC}=\\f{AB}{AC}$', 'Phân giác trong, ngoài'] },
        { title: 'Đồng dạng', items: ['c.c.c', 'c.g.c', 'g.g', 'Tam giác vuông'] },
        { title: 'Tỉ số', items: ['Cạnh: $k$', 'Chu vi: $k$', 'Diện tích: $k^{2}$', 'Đường cao, trung tuyến: $k$'] },
        { title: 'Ứng dụng', items: ['Đo chiều cao gián tiếp', 'Chứng minh hệ thức', 'Tính độ dài'] },
      ],
    },
    practiceSkills: [
      {
        title: 'Kỹ năng “truy ngược” từ hệ thức cần chứng minh',
        detail: [
          'Viết hệ thức cần chứng minh dưới dạng tỉ lệ: $AB\\cdot AC=AD\\cdot AE\\Leftrightarrow\\f{AB}{AD}=\\f{AE}{AC}$.',
          'Đọc tỉ lệ để đoán hai tam giác: tử số cho tam giác thứ nhất, mẫu số cho tam giác thứ hai.',
          'Kiểm tra chúng có chung góc nào không → dùng g.g.',
        ],
      },
    ],
    types: [
      {
        id: 'g8-t6-d1', name: 'Dạng 1. Tính độ dài bằng định lí Thalès', level: 'TH',
        method: ['Xác định cặp đường song song.', 'Lập tỉ số đúng thứ tự.', 'Giải tỉ lệ thức.'],
        worked: [{
          prompt: 'Tam giác $ABC$ có $MN\\para BC$, $M\\in AB$, $N\\in AC$. Biết $AM=4$, $MB=6$, $AN=5$. Tính $NC$.',
          thinking: ['$MN\\para BC$ → dùng Thalès: $\\f{AM}{MB}=\\f{AN}{NC}$.'],
          solution: [
            'Vì $MN\\para BC$ nên theo định lí Thalès: $\\f{AM}{MB}=\\f{AN}{NC}$.',
            '$\\f{4}{6}=\\f{5}{NC}\\Rightarrow NC=\\f{5\\cdot6}{4}=7{,}5$.',
          ],
        }],
      },
      {
        id: 'g8-t6-d2', name: 'Dạng 2. Chứng minh hai tam giác đồng dạng', level: 'VD',
        method: ['Tìm góc chung / góc bằng nhau.', 'Chỉ ra cặp góc thứ hai.', 'Kết luận theo g.g rồi suy ra tỉ lệ cạnh.'],
        worked: [{
          prompt: 'Cho tam giác $ABC$ vuông tại $A$, đường cao $AH$. Chứng minh $\\tri ABH\\sim\\tri CBA$ và suy ra $AB^{2}=BH\\cdot BC$.',
          thinking: ['Hai tam giác có chung góc $B$ và cùng có một góc vuông → g.g.'],
          solution: [
            'Xét $\\tri ABH$ và $\\tri CBA$ có:',
            '$\\angle B$ chung; $\\angle AHB=\\angle CAB=90\\deg$.',
            'Do đó $\\tri ABH\\sim\\tri CBA$ (g.g).',
            'Suy ra $\\f{AB}{CB}=\\f{BH}{BA}$, tức $AB^{2}=BH\\cdot BC$.',
          ],
          remark: 'Đây chính là hệ thức lượng trong tam giác vuông sẽ học kỹ ở lớp 9 — chứng minh bằng đồng dạng.',
        }],
      },
      {
        id: 'g8-t6-d3', name: 'Dạng 3. Vận dụng cao — tỉ số diện tích, bài toán thực tế', level: 'VDC',
        method: ['Chứng minh đồng dạng, tìm tỉ số $k$.', 'Tỉ số diện tích $=k^{2}$.', 'Với bài thực tế: mô hình hoá bằng hai tam giác đồng dạng.'],
        worked: [{
          prompt: 'Một cái cây có bóng trên mặt đất dài $6\\,m$. Cùng lúc đó, một cọc cao $1{,}5\\,m$ có bóng dài $0{,}9\\,m$. Tính chiều cao của cây.',
          thinking: ['Tia nắng song song → hai tam giác vuông đồng dạng (g.g).'],
          solution: [
            'Gọi chiều cao cây là $h$ (m, $h>0$).',
            'Hai tam giác vuông tạo bởi cây – bóng cây và cọc – bóng cọc đồng dạng (vì tia nắng song song nên hai góc nhọn bằng nhau).',
            '$\\f{h}{6}=\\f{1{,}5}{0{,}9}\\Rightarrow h=\\f{6\\cdot1{,}5}{0{,}9}=10$.',
            'Vậy cây cao **10 m**.',
          ],
        }],
      },
    ],
    bank: ['g8.thales', 'g8.dong-dang', 'g8.dong-dang-vdc'],
  },

  {
    id: 'g8-t7', grade: 8, term: 'HK1', strand: 'HINH_HOC', order: 7,
    name: 'Định lí Pythagore và Hình khối',
    summary: 'Định lí Pythagore thuận, đảo và ứng dụng; hình chóp tam giác đều, hình chóp tứ giác đều.',
    outcomes: [
      'Vận dụng định lí Pythagore để tính độ dài và nhận biết tam giác vuông.',
      'Mô tả và tính diện tích xung quanh, thể tích hình chóp đều.',
    ],
    theory: [
      {
        heading: 'Công thức trọng tâm',
        body: [],
        formulas: [
          'Pythagore thuận: $\\tri ABC$ vuông tại $A$ thì $BC^{2}=AB^{2}+AC^{2}$',
          'Pythagore đảo: nếu $BC^{2}=AB^{2}+AC^{2}$ thì $\\tri ABC$ vuông tại $A$',
          'Bộ ba Pythagore hay gặp: $(3;4;5)$, $(6;8;10)$, $(5;12;13)$, $(8;15;17)$, $(7;24;25)$',
          'Hình chóp đều: $S_{xq}=p\\cdot d$ ($p$ là nửa chu vi đáy, $d$ là trung đoạn) ; $V=\\f{1}{3}S_{\\text{đáy}}\\cdot h$',
        ],
        caution: ['Cạnh huyền luôn là cạnh **lớn nhất** — kiểm tra điều này trước khi áp dụng Pythagore đảo.'],
      },
    ],
    decode: [
      { signal: 'Tam giác vuông và biết hai cạnh', action: 'Pythagore để tìm cạnh còn lại.', why: 'Công cụ trực tiếp nhất.' },
      { signal: 'Đề cho ba độ dài, hỏi có vuông không', action: 'Pythagore đảo với cạnh lớn nhất.', why: 'Chỉ cần kiểm tra một đẳng thức.' },
      { signal: 'Bài toán thang dựa tường, đường chéo sân', action: 'Vẽ tam giác vuông rồi áp Pythagore.', why: 'Mô hình thực tế quy về tam giác vuông.' },
      { signal: 'Hình chóp có trung đoạn', action: 'Dùng $S_{xq}=p\\cdot d$; không nhầm trung đoạn với chiều cao chóp.', why: 'Trung đoạn nằm trên mặt bên, chiều cao nằm bên trong khối.' },
    ],
    mindmap: {
      root: 'PYTHAGORE — HÌNH CHÓP ĐỀU',
      branches: [
        { title: 'Pythagore', items: ['Thuận', 'Đảo', 'Bộ ba Pythagore', 'Đường chéo hình chữ nhật'] },
        { title: 'Ứng dụng', items: ['Thang dựa tường', 'Đường chéo sân', 'Khoảng cách hai điểm'] },
        { title: 'Hình chóp đều', items: ['Đáy đều, mặt bên là tam giác cân', 'Trung đoạn $d$', '$S_{xq}=p\\cdot d$', '$V=\\f{1}{3}Sh$'] },
      ],
    },
    types: [
      {
        id: 'g8-t7-d1', name: 'Dạng 1. Tính độ dài bằng Pythagore', level: 'TH',
        method: ['Xác định tam giác vuông và cạnh huyền.', 'Áp dụng công thức.', 'Lấy căn bậc hai số học.'],
        worked: [{
          prompt: 'Một cái thang dài $5\\,m$ dựa vào tường, chân thang cách chân tường $3\\,m$. Hỏi thang chạm tường ở độ cao bao nhiêu?',
          thinking: ['Thang là cạnh huyền, khoảng cách chân thang – chân tường và độ cao là hai cạnh góc vuông.'],
          solution: [
            'Gọi độ cao cần tìm là $h$ (m, $h>0$).',
            'Theo định lí Pythagore: $h^{2}+3^{2}=5^{2}\\Rightarrow h^{2}=25-9=16$.',
            '$h=4$ (m).',
          ],
        }],
      },
      {
        id: 'g8-t7-d2', name: 'Dạng 2. Hình chóp đều', level: 'VD',
        method: ['Xác định diện tích đáy, chu vi đáy.', 'Áp dụng $S_{xq}=p\\cdot d$ và $V=\\f{1}{3}S_{\\text{đáy}}h$.'],
        worked: [{
          prompt: 'Hình chóp tứ giác đều có cạnh đáy $6\\,cm$, trung đoạn $5\\,cm$, chiều cao $4\\,cm$. Tính diện tích xung quanh và thể tích.',
          thinking: ['Nửa chu vi đáy $p=\\f{4\\cdot6}{2}=12$; diện tích đáy là hình vuông cạnh 6.'],
          solution: [
            '$S_{xq}=p\\cdot d=12\\cdot5=60\\ (cm^{2})$.',
            '$S_{\\text{đáy}}=6^{2}=36\\ (cm^{2})$.',
            '$V=\\f{1}{3}\\cdot36\\cdot4=48\\ (cm^{3})$.',
          ],
        }],
      },
    ],
    bank: ['g8.pythagore', 'g8.hinh-chop'],
  },

  {
    id: 'g8-t8', grade: 8, term: 'HK1', strand: 'THONG_KE_XS', order: 8,
    name: 'Thống kê và Xác suất',
    summary: 'Thu thập, phân loại, biểu diễn và phân tích dữ liệu; xác suất lí thuyết và xác suất thực nghiệm.',
    outcomes: [
      'Lựa chọn biểu đồ phù hợp, phát hiện dữ liệu không hợp lí.',
      'Tính xác suất lí thuyết của biến cố trong mô hình đồng khả năng.',
      'So sánh xác suất thực nghiệm và xác suất lí thuyết.',
    ],
    theory: [
      {
        heading: 'Xác suất lí thuyết và thực nghiệm',
        body: [],
        formulas: [
          'Xác suất lí thuyết: $P(A)=\\f{\\text{số kết quả thuận lợi}}{\\text{số kết quả có thể}}$ (mô hình đồng khả năng)',
          'Xác suất thực nghiệm: $\\f{\\text{số lần A xảy ra}}{\\text{số lần thực hiện}}$',
          'Khi số lần thực hiện đủ lớn, xác suất thực nghiệm xấp xỉ xác suất lí thuyết.',
        ],
      },
    ],
    decode: [
      { signal: 'Đề mô tả một phép thử có các kết quả “như nhau”', action: 'Dùng xác suất lí thuyết.', why: 'Điều kiện đồng khả năng cho phép đếm trực tiếp.' },
      { signal: 'Đề cho bảng kết quả sau nhiều lần thử', action: 'Dùng xác suất thực nghiệm.', why: 'Dữ liệu quan sát được là căn cứ duy nhất.' },
      { signal: 'Đề hỏi “ước lượng số lần xảy ra trong $n$ lần”', action: 'Lấy $n\\cdot P(A)$.', why: 'Tần số kỳ vọng bằng số lần nhân xác suất.' },
    ],
    mindmap: {
      root: 'THỐNG KÊ & XÁC SUẤT LỚP 8',
      branches: [
        { title: 'Dữ liệu', items: ['Thu thập, phân loại', 'Dữ liệu không hợp lí', 'Chọn biểu đồ phù hợp'] },
        { title: 'Biểu đồ', items: ['Cột, cột kép', 'Đoạn thẳng', 'Hình quạt tròn'] },
        { title: 'Xác suất', items: ['Lí thuyết $\\f{m}{k}$', 'Thực nghiệm', 'Mối liên hệ khi $n$ lớn'] },
      ],
    },
    types: [
      {
        id: 'g8-t8-d1', name: 'Dạng 1. Tính xác suất lí thuyết', level: 'TH',
        method: ['Đếm số kết quả có thể.', 'Đếm số kết quả thuận lợi.', 'Lập tỉ số.'],
        worked: [{
          prompt: 'Một hộp có 5 bi đỏ, 3 bi xanh, 2 bi vàng. Lấy ngẫu nhiên 1 viên. Tính xác suất lấy được bi không phải màu đỏ.',
          thinking: ['Tổng số bi là 10; bi không đỏ gồm xanh và vàng.'],
          solution: [
            'Tổng số bi: $5+3+2=10$.',
            'Số bi không đỏ: $3+2=5$.',
            '$P=\\f{5}{10}=\\f{1}{2}$.',
          ],
        }],
      },
    ],
    bank: ['g8.thong-ke', 'g8.xac-suat'],
  },
];
