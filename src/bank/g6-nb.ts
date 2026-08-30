import type { Template } from '@/types';
import { gcd, lcm, mcOptions } from '@/lib/rng';
import { mcFrom, tfFrom, type Claim, type McItem } from './kit';

/* MATHGITA — KHỐI 6: LỚP NHẬN BIẾT & THÔNG HIỂU MỞ RỘNG
 * Mỗi mã đề cần 4–6 câu nhận biết. Trước đây số khuôn ở mức này quá ít nên
 * cùng một kiểu câu lặp lại nhiều lần giữa 100 mã đề. Các khuôn dưới đây rút
 * ngẫu nhiên từ ngân hàng mệnh đề đã biên soạn theo chương trình KNTT, nên
 * mỗi lần sinh cho một câu hỏi khác nhau cả về nội dung lẫn con số. */

/* ------------------------------ TẬP HỢP – SỐ TỰ NHIÊN ------------------------------ */

const MC_TAP_HOP: McItem[] = [
  {
    q: 'Cách viết nào sau đây **đúng**?',
    a: '$5\\in\\N$', w: ['$5\\subset\\N$', '$\\{5\\}\\in\\N$', '$-5\\in\\N$'],
    why: 'Ký hiệu $\\in$ nối **phần tử** với tập hợp; $\\subset$ nối **tập hợp** với tập hợp.',
    trap: 'Viết $5\\subset\\N$ là sai vì $5$ là phần tử chứ không phải tập hợp.',
  },
  {
    q: 'Tập hợp $A=\\{x\\in\\N\\;|\\;3<x\\le7\\}$ có bao nhiêu phần tử?',
    a: '$4$', w: ['$3$', '$5$', '$6$'],
    why: '$A=\\{4;5;6;7\\}$ — dấu $<$ loại $3$, dấu $\\le$ giữ lại $7$.',
    trap: 'Nhầm $\\le$ thành $<$ sẽ mất phần tử $7$.',
  },
  {
    q: 'Số phần tử của tập hợp các số tự nhiên từ $12$ đến $60$ là:',
    a: '$49$', w: ['$48$', '$50$', '$47$'],
    why: 'Số phần tử $=(60-12):1+1=49$ — nhớ **cộng 1** ở cuối.',
    trap: 'Chỉ lấy $60-12=48$ là quên đếm chính số đầu dãy.',
  },
  {
    q: 'Trong hệ La Mã, số $\\text{XIV}$ có giá trị là:',
    a: '$14$', w: ['$16$', '$4$', '$24$'],
    why: '$\\text{X}=10$, $\\text{IV}=4$ nên $\\text{XIV}=10+4=14$.',
  },
  {
    q: 'Trong số $470\\,052$, chữ số $7$ có giá trị bằng:',
    a: '$70\\,000$', w: ['$7$', '$7\\,000$', '$700\\,000$'],
    why: 'Chữ số $7$ đứng ở hàng chục nghìn nên có giá trị $7\\cdot10\\,000=70\\,000$.',
    trap: 'Nhầm "chữ số" (là $7$) với "giá trị của chữ số" (là $70\\,000$).',
  },
  {
    q: 'Kết quả của phép tính $2^{3}\\cdot2^{4}$ là:',
    a: '$2^{7}$', w: ['$2^{12}$', '$4^{7}$', '$2^{1}$'],
    why: 'Nhân hai luỹ thừa cùng cơ số thì **giữ cơ số, cộng số mũ**: $2^{3+4}=2^{7}$.',
    trap: 'Nhân số mũ ($2^{12}$) hoặc nhân cả cơ số ($4^{7}$) đều sai.',
  },
  {
    q: 'Giá trị của $5^{0}+5^{1}$ là:',
    a: '$6$', w: ['$5$', '$10$', '$0$'],
    why: 'Mọi số khác $0$ luỹ thừa $0$ đều bằng $1$, nên $5^{0}+5^{1}=1+5=6$.',
    trap: 'Viết $5^{0}=0$ là lỗi rất phổ biến.',
  },
  {
    q: 'Trong phép chia có dư $a=b\\cdot q+r$, điều kiện của số dư $r$ là:',
    a: '$0\\le r<b$', w: ['$0<r<b$', '$0\\le r\\le b$', '$r<b$'],
    why: 'Số dư luôn không âm và luôn **nhỏ hơn** số chia.',
  },
];

const MC_CHIA_HET: McItem[] = [
  {
    q: 'Số nào sau đây chia hết cho cả $2$ và $5$?',
    a: '$1\\,230$', w: ['$1\\,235$', '$1\\,232$', '$1\\,203$'],
    why: 'Chia hết cho cả $2$ và $5$ thì chữ số tận cùng phải là $0$.',
  },
  {
    q: 'Số $\\ov{34x}$ chia hết cho $9$ khi $x$ bằng:',
    a: '$2$', w: ['$0$', '$5$', '$8$'],
    why: 'Tổng các chữ số $3+4+x=7+x$ phải chia hết cho $9$, nên $x=2$.',
    trap: 'Xét chữ số tận cùng thay vì tổng các chữ số — dấu hiệu của $9$ dùng **tổng**.',
  },
  {
    q: 'Trong các số sau, số nào là **hợp số**?',
    a: '$91$', w: ['$89$', '$97$', '$83$'],
    why: '$91=7\\cdot13$ nên là hợp số; $83$, $89$, $97$ đều là số nguyên tố.',
    trap: '$91$ trông giống số nguyên tố nhưng chia hết cho $7$ — luôn thử chia tới $\\s{n}$.',
  },
  {
    q: 'Phân tích $60$ ra thừa số nguyên tố ta được:',
    a: '$2^{2}\\cdot3\\cdot5$', w: ['$2\\cdot3\\cdot10$', '$4\\cdot15$', '$2^{2}\\cdot15$'],
    why: 'Phân tích ra thừa số nguyên tố thì mọi thừa số đều phải là **số nguyên tố**.',
    trap: '$10$, $15$, $4$ đều là hợp số nên các cách viết kia chưa phải phân tích ra thừa số nguyên tố.',
  },
  {
    q: 'Khẳng định nào sau đây **sai**?',
    a: '$1$ là số nguyên tố', w: ['$2$ là số nguyên tố chẵn duy nhất', '$0$ chia hết cho mọi số khác $0$', 'Mọi số nguyên tố lớn hơn $2$ đều lẻ'],
    why: '$1$ chỉ có **một** ước là chính nó, nên không phải số nguyên tố cũng không phải hợp số.',
  },
  {
    q: 'Nếu $a\\;\\vdots\\;m$ và $b\\;\\vdots\\;m$ thì:',
    a: '$(a+b)\\;\\vdots\\;m$', w: ['$(a+b)$ không chia hết cho $m$', '$(a\\cdot b)\\;\\vdots\\;m^{2}$ là điều kiện cần', '$\\f{a}{b}\\;\\vdots\\;m$'],
    why: 'Tính chất chia hết của một tổng: hai số hạng cùng chia hết cho $m$ thì tổng chia hết cho $m$.',
  },
];

const MC_PHAN_SO: McItem[] = [
  {
    q: 'Phân số nào sau đây **bằng** $\\f{3}{4}$?',
    a: '$\\f{15}{20}$', w: ['$\\f{6}{9}$', '$\\f{4}{3}$', '$\\f{7}{8}$'],
    why: '$\\f{15}{20}=\\f{15:5}{20:5}=\\f{3}{4}$.',
  },
  {
    q: 'Kết quả rút gọn của $\\f{18}{24}$ là:',
    a: '$\\f{3}{4}$', w: ['$\\f{9}{12}$', '$\\f{6}{8}$', '$\\f{2}{3}$'],
    why: 'ƯCLN$(18;24)=6$ nên $\\f{18}{24}=\\f{3}{4}$ — đây mới là dạng **tối giản**.',
    trap: '$\\f{9}{12}$ và $\\f{6}{8}$ tuy bằng $\\f{3}{4}$ nhưng **chưa tối giản**.',
  },
  {
    q: 'Số đối của $-\\f{5}{7}$ là:',
    a: '$\\f{5}{7}$', w: ['$-\\f{7}{5}$', '$\\f{7}{5}$', '$-\\f{5}{7}$'],
    why: 'Số đối chỉ **đổi dấu**; số nghịch đảo mới là lật ngược tử và mẫu.',
    trap: 'Nhầm số đối với số nghịch đảo là lỗi hay gặp nhất ở dạng này.',
  },
  {
    q: 'Hỗn số $3\\f{2}{5}$ viết dưới dạng phân số là:',
    a: '$\\f{17}{5}$', w: ['$\\f{11}{5}$', '$\\f{6}{5}$', '$\\f{32}{5}$'],
    why: '$3\\f{2}{5}=\\f{3\\cdot5+2}{5}=\\f{17}{5}$.',
  },
  {
    q: '$25\\%$ của $80$ bằng:',
    a: '$20$', w: ['$25$', '$32$', '$16$'],
    why: '$25\\%=\\f{1}{4}$ nên $25\\%$ của $80$ là $80:4=20$.',
  },
  {
    q: 'Số thập phân $0{,}125$ viết dưới dạng phân số tối giản là:',
    a: '$\\f{1}{8}$', w: ['$\\f{125}{100}$', '$\\f{1}{4}$', '$\\f{125}{1000}$'],
    why: '$0{,}125=\\f{125}{1000}=\\f{1}{8}$ sau khi rút gọn cho $125$.',
  },
];

const MC_HINH_HOC: McItem[] = [
  {
    q: 'Hình nào sau đây có **bốn trục đối xứng**?',
    a: 'Hình vuông', w: ['Hình chữ nhật', 'Hình thoi', 'Hình bình hành'],
    why: 'Hình vuông có 2 trục qua trung điểm các cạnh và 2 trục là đường chéo.',
    trap: 'Hình chữ nhật và hình thoi mỗi hình chỉ có $2$ trục; hình bình hành **không có** trục đối xứng.',
  },
  {
    q: 'Hình nào sau đây **không** có tâm đối xứng?',
    a: 'Tam giác đều', w: ['Hình vuông', 'Hình chữ nhật', 'Hình lục giác đều'],
    why: 'Tam giác đều có $3$ trục đối xứng nhưng **không** có tâm đối xứng.',
  },
  {
    q: 'Công thức tính diện tích hình thoi có hai đường chéo $d_1$, $d_2$ là:',
    a: '$S=\\f{d_1\\cdot d_2}{2}$', w: ['$S=d_1\\cdot d_2$', '$S=\\f{d_1+d_2}{2}$', '$S=2d_1d_2$'],
    why: 'Diện tích hình thoi bằng **nửa tích hai đường chéo**.',
  },
  {
    q: 'Hình thang cân có tính chất nào sau đây?',
    a: 'Hai đường chéo bằng nhau', w: ['Bốn cạnh bằng nhau', 'Hai đường chéo vuông góc', 'Bốn góc bằng nhau'],
    why: 'Hình thang cân có hai cạnh bên bằng nhau và hai đường chéo bằng nhau.',
  },
  {
    q: 'Chu vi hình chữ nhật có chiều dài $a$, chiều rộng $b$ là:',
    a: '$2(a+b)$', w: ['$a+b$', '$a\\cdot b$', '$a+b+ab$'],
    why: 'Chu vi bằng tổng bốn cạnh $=a+b+a+b=2(a+b)$.',
    trap: 'Nhầm chu vi với diện tích $a\\cdot b$.',
  },
];

/* ------------------------------- CÁC KHUÔN ------------------------------- */

export const BANK_G6_NB: Template[] = [
  {
    id: 'g6.nb-tap-hop-mo-rong', topicId: 'g6-t1', grade: 6, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Tập hợp, số tự nhiên và luỹ thừa',
    build: (r) => mcFrom(r, MC_TAP_HOP, {
      thinking: [
        'Nhóm câu này kiểm tra **ký hiệu** và **quy tắc** — đọc kỹ từng ký hiệu trước khi tính.',
        'Với bài đếm phần tử của dãy cách đều: số phần tử $=(\\text{cuối}-\\text{đầu}):\\text{khoảng cách}+1$.',
      ],
    }),
  },
  {
    id: 'g6.nb-chia-het-mo-rong', topicId: 'g6-t2', grade: 6, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Chia hết, số nguyên tố và phân tích thừa số',
    build: (r) => mcFrom(r, MC_CHIA_HET, {
      thinking: [
        'Dấu hiệu chia hết cho $2$ và $5$ nhìn **chữ số tận cùng**; cho $3$ và $9$ nhìn **tổng các chữ số**.',
        'Muốn biết một số có phải số nguyên tố không, chỉ cần thử chia cho các số nguyên tố không vượt quá $\\s{n}$.',
      ],
    }),
  },
  {
    id: 'g6.nb-phan-so-mo-rong', topicId: 'g6-t4', grade: 6, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Phân số, hỗn số, số thập phân và phần trăm',
    build: (r) => mcFrom(r, MC_PHAN_SO, {
      thinking: [
        'Hai phân số bằng nhau khi rút gọn về cùng một dạng **tối giản** — luôn rút gọn trước khi so sánh.',
        'Phân biệt rõ **số đối** (đổi dấu) với **số nghịch đảo** (lật tử – mẫu).',
      ],
    }),
  },
  {
    id: 'g6.nb-hinh-hoc-mo-rong', topicId: 'g6-t5', grade: 6, level: 'NB', kind: 'MC',
    strand: 'HINH_HOC', tag: 'Hình phẳng, đối xứng và công thức chu vi – diện tích',
    build: (r) => mcFrom(r, MC_HINH_HOC, {
      thinking: [
        'Ghi nhớ theo bảng: hình vuông $4$ trục đối xứng, hình chữ nhật và hình thoi $2$ trục, hình bình hành $0$ trục.',
        'Tâm đối xứng và trục đối xứng là hai khái niệm khác nhau — một hình có thể có cái này mà không có cái kia.',
      ],
    }),
  },

  /* ------------------------- CÂU ĐÚNG / SAI ------------------------- */
  {
    id: 'g6.tf-so-tu-nhien', topicId: 'g6-t1', grade: 6, level: 'TH', kind: 'TF',
    strand: 'SO_DAI_SO', tag: 'Đúng/Sai — số tự nhiên và luỹ thừa',
    build: (r) => {
      const a = r.int(2, 6);
      // b != 2 để $b+2$ và $b\\cdot2$ không trùng nhau, tránh hai mệnh đề đối lập cùng nội dung.
      const b = r.int(3, 5);
      const pool: Claim[] = [
        { t: `$${a}^{${b}}\\cdot${a}^{2}=${a}^{${b + 2}}$`, ok: true, why: 'nhân luỹ thừa cùng cơ số thì cộng số mũ.' },
        { t: `$${a}^{${b}}\\cdot${a}^{2}=${a}^{${b * 2}}$`, ok: false, why: `phải **cộng** số mũ ($${b}+2=${b + 2}$) chứ không nhân.` },
        { t: `$(${a}^{${b}})^{2}=${a}^{${b * 2}}$`, ok: true, why: 'luỹ thừa của luỹ thừa thì nhân số mũ.' },
        { t: `$${a}^{0}=1$`, ok: true, why: 'mọi số khác $0$ nâng lên mũ $0$ đều bằng $1$.' },
        { t: `$${a}^{0}=0$`, ok: false, why: `đúng phải là $${a}^{0}=1$.` },
        { t: '$0$ là số tự nhiên nhỏ nhất', ok: true, why: 'tập $\\N=\\{0;1;2;3;\\dots\\}$ bắt đầu từ $0$.' },
        { t: 'Có số tự nhiên lớn nhất', ok: false, why: 'tập số tự nhiên là vô hạn, không có phần tử lớn nhất.' },
        { t: `$${a}+${b}\\cdot2=(${a}+${b})\\cdot2$`, ok: false, why: 'phải thực hiện nhân trước cộng sau, hai vế không bằng nhau.' },
      ];
      return tfFrom(r, pool, {
        thinking: [
          'Ba quy tắc luỹ thừa phải thuộc: nhân cùng cơ số → **cộng** mũ; chia cùng cơ số → **trừ** mũ; luỹ thừa của luỹ thừa → **nhân** mũ.',
          'Với thứ tự phép tính: luỹ thừa → nhân chia → cộng trừ; trong ngoặc làm trước.',
        ],
        pitfall: 'Nhầm "cộng số mũ" thành "nhân số mũ" khi nhân hai luỹ thừa cùng cơ số.',
      });
    },
  },
  {
    id: 'g6.tf-uoc-boi', topicId: 'g6-t2', grade: 6, level: 'TH', kind: 'TF',
    strand: 'SO_DAI_SO', tag: 'Đúng/Sai — ước, bội, ƯCLN và BCNN',
    build: (r) => {
      const a = r.int(4, 20), b = r.int(4, 20);
      const d = gcd(a, b), m = lcm(a, b);
      const pool: Claim[] = [
        { t: `ƯCLN$(${a};${b})=${d}$`, ok: true, why: `phân tích ra thừa số nguyên tố rồi lấy các thừa số chung với số mũ nhỏ nhất, được $${d}$.` },
        { t: `BCNN$(${a};${b})=${m}$`, ok: true, why: `lấy các thừa số chung và riêng với số mũ lớn nhất, được $${m}$.` },
        { t: `ƯCLN$(${a};${b})\\cdot$BCNN$(${a};${b})=${a}\\cdot${b}$`, ok: true, why: `đây là tính chất luôn đúng: $${d}\\cdot${m}=${a * b}$.` },
        { t: `BCNN$(${a};${b})=${a * b}$ với mọi $a$, $b$`, ok: a * b === m, why: a * b === m ? `đúng trong trường hợp này vì $${a}$ và $${b}$ nguyên tố cùng nhau.` : `chỉ đúng khi hai số **nguyên tố cùng nhau**; ở đây BCNN $=${m}\\ne${a * b}$.` },
        { t: 'Mọi số tự nhiên khác $0$ đều là ước của chính nó', ok: true, why: '$n:n=1$ nên $n$ luôn là ước của $n$.' },
        { t: 'Số $0$ là ước của mọi số tự nhiên', ok: false, why: 'không thể chia cho $0$; đúng phải là "$0$ là **bội** của mọi số khác $0$".' },
        { t: 'Nếu hai số nguyên tố cùng nhau thì ƯCLN của chúng bằng $1$', ok: true, why: 'đó chính là định nghĩa của hai số nguyên tố cùng nhau.' },
        { t: 'Hai số chẵn bất kỳ luôn nguyên tố cùng nhau', ok: false, why: 'hai số chẵn luôn có ước chung là $2$ nên ƯCLN $\\ge2$.' },
      ];
      return tfFrom(r, pool, {
        thinking: [
          'ƯCLN lấy thừa số **chung**, số mũ **nhỏ nhất**; BCNN lấy thừa số **chung và riêng**, số mũ **lớn nhất**.',
          'Tính chất luôn đúng và rất hay dùng để kiểm tra: ƯCLN$(a;b)\\cdot$BCNN$(a;b)=a\\cdot b$.',
        ],
        pitfall: 'Kết luận "BCNN bằng tích hai số" — điều đó chỉ đúng khi hai số nguyên tố cùng nhau.',
      });
    },
  },
  {
    id: 'g6.tf-so-nguyen', topicId: 'g6-t3', grade: 6, level: 'TH', kind: 'TF',
    strand: 'SO_DAI_SO', tag: 'Đúng/Sai — số nguyên và quy tắc dấu',
    build: (r) => {
      const a = r.int(2, 15), b = r.int(2, 15);
      const pool: Claim[] = [
        { t: `$(-${a})+(-${b})=-${a + b}$`, ok: true, why: 'cộng hai số nguyên âm: cộng phần số tự nhiên rồi đặt dấu trừ.' },
        { t: `$(-${a})\\cdot(-${b})=${a * b}$`, ok: true, why: 'tích hai số âm là một số dương.' },
        { t: `$(-${a})\\cdot(-${b})=-${a * b}$`, ok: false, why: `âm nhân âm ra **dương**, kết quả đúng là $${a * b}$.` },
        { t: `$-${a}-(-${b})=-${a}+${b}$`, ok: true, why: 'trừ một số âm bằng cộng số đối của nó.' },
        { t: `$|-${a}|=${a}$`, ok: true, why: 'giá trị tuyệt đối luôn không âm.' },
        { t: `$|-${a}|=-${a}$`, ok: false, why: `giá trị tuyệt đối không thể âm; đúng là $|-${a}|=${a}$.` },
        { t: 'Mọi số nguyên âm đều nhỏ hơn mọi số nguyên dương', ok: true, why: 'trên trục số, số âm nằm bên trái $0$ còn số dương nằm bên phải.' },
        { t: `Nếu $|x|=${a}$ thì $x=${a}$`, ok: false, why: `còn thiếu nghiệm $x=-${a}$ — phương trình chứa giá trị tuyệt đối luôn có hai trường hợp.` },
      ];
      return tfFrom(r, pool, {
        thinking: [
          'Quy tắc dấu khi nhân chia: **cùng dấu ra dương, khác dấu ra âm**.',
          'Trừ một số bằng cộng với **số đối** của nó — quy tắc này giúp mọi phép trừ trở thành phép cộng.',
        ],
        pitfall: 'Từ $|x|=a$ chỉ lấy $x=a$ mà quên $x=-a$.',
      });
    },
  },
  {
    id: 'g6.tf-hinh-hoc', topicId: 'g6-t5', grade: 6, level: 'TH', kind: 'TF',
    strand: 'HINH_HOC', tag: 'Đúng/Sai — hình phẳng và tính đối xứng',
    build: (r) => {
      const pool: Claim[] = [
        { t: 'Hình vuông có $4$ trục đối xứng', ok: true, why: '$2$ trục qua trung điểm các cạnh đối và $2$ trục là hai đường chéo.' },
        { t: 'Hình chữ nhật có $4$ trục đối xứng', ok: false, why: 'hình chữ nhật chỉ có $2$ trục (qua trung điểm hai cạnh đối); hai đường chéo **không** phải trục đối xứng.' },
        { t: 'Hình bình hành có tâm đối xứng là giao điểm hai đường chéo', ok: true, why: 'đây là tính chất đặc trưng của hình bình hành.' },
        { t: 'Hình thang cân có hai đường chéo bằng nhau', ok: true, why: 'đó là một dấu hiệu nhận biết hình thang cân.' },
        { t: 'Tam giác đều có tâm đối xứng', ok: false, why: 'tam giác đều có $3$ trục đối xứng nhưng **không** có tâm đối xứng.' },
        { t: 'Hình thoi có hai đường chéo vuông góc với nhau', ok: true, why: 'hai đường chéo hình thoi vuông góc và cắt nhau tại trung điểm mỗi đường.' },
        { t: 'Diện tích hình thoi bằng tích hai đường chéo', ok: false, why: 'phải là **nửa** tích hai đường chéo: $S=\\f{d_1d_2}{2}$.' },
        { t: 'Hình lục giác đều có $6$ trục đối xứng', ok: true, why: '$3$ trục qua hai đỉnh đối và $3$ trục qua trung điểm hai cạnh đối.' },
      ];
      return tfFrom(r, pool, {
        thinking: [
          'Vẽ nhanh hình ra nháp rồi thử gấp đôi theo từng đường — đường nào gấp trùng khít thì đó là trục đối xứng.',
          'Tâm đối xứng: quay hình $180\\deg$ quanh điểm đó mà hình trùng với chính nó.',
        ],
        pitfall: 'Cho rằng đường chéo hình chữ nhật là trục đối xứng — gấp theo đường chéo thì hai nửa **không** trùng nhau.',
      });
    },
  },
  {
    id: 'g6.tf-phan-so', topicId: 'g6-t4', grade: 6, level: 'TH', kind: 'TF',
    strand: 'SO_DAI_SO', tag: 'Đúng/Sai — phân số và số thập phân',
    build: (r) => {
      const k = r.int(2, 9);
      const n = r.int(1, 8), d = n + r.int(1, 6);
      const pool: Claim[] = [
        { t: `$\\f{${n}}{${d}}=\\f{${n * k}}{${d * k}}$`, ok: true, why: `nhân cả tử và mẫu với cùng số $${k}\\ne0$ thì phân số không đổi.` },
        { t: `$\\f{${n}}{${d}}=\\f{${n + k}}{${d + k}}$`, ok: false, why: 'chỉ được **nhân/chia** cả tử và mẫu cùng một số, không được cộng.' },
        { t: `$\\f{${n}}{${d}}<1$`, ok: n < d, why: n < d ? `tử nhỏ hơn mẫu nên phân số nhỏ hơn $1$.` : `tử không nhỏ hơn mẫu nên phân số $\\ge1$.` },
        { t: 'Muốn cộng hai phân số khác mẫu, ta cộng tử với tử và mẫu với mẫu', ok: false, why: 'phải **quy đồng mẫu** rồi mới cộng tử, giữ nguyên mẫu chung.' },
        { t: 'Muốn chia cho một phân số, ta nhân với nghịch đảo của nó', ok: true, why: '$\\f{a}{b}:\\f{c}{d}=\\f{a}{b}\\cdot\\f{d}{c}$ (với $c\\ne0$).' },
        { t: `$0{,}5=\\f{1}{2}$`, ok: true, why: `$0{,}5=\\f{5}{10}=\\f{1}{2}$.` },
        { t: 'Hai phân số có cùng tử thì phân số nào có mẫu lớn hơn sẽ lớn hơn', ok: false, why: 'ngược lại: cùng tử dương thì **mẫu càng lớn phân số càng nhỏ**.' },
        { t: `$-\\f{${n}}{${d}}=\\f{-${n}}{${d}}=\\f{${n}}{-${d}}$`, ok: true, why: 'dấu trừ có thể đặt ở tử, ở mẫu hoặc trước phân số — giá trị không đổi.' },
      ];
      return tfFrom(r, pool, {
        thinking: [
          'Tính chất cơ bản: nhân (hoặc chia) **cả tử và mẫu** cho cùng một số khác $0$ thì phân số không đổi — cộng thì không được.',
          'So sánh cùng tử dương: mẫu lớn hơn thì phân số nhỏ hơn (chia cho nhiều phần hơn).',
        ],
        pitfall: 'Cộng cùng một số vào tử và mẫu rồi nghĩ phân số không đổi.',
      });
    },
  },

  /* ------------------------- THÔNG HIỂU BỔ SUNG ------------------------- */
  {
    id: 'g6.th-thu-tu-phep-tinh', topicId: 'g6-t1', grade: 6, level: 'TH', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Thứ tự thực hiện phép tính',
    build: (r) => {
      const a = r.int(2, 9), b = r.int(2, 6), c = r.int(2, 9);
      const dung = a + b * c;
      const sai = [(a + b) * c, a + b + c, a * b + c];
      const uniq = [...new Set(sai)].filter((v) => v !== dung).slice(0, 3);
      while (uniq.length < 3) uniq.push(dung + uniq.length + 1);
      const [options, answer] = mcOptions(r, `$${dung}$`, uniq.map((v) => `$${v}$`));
      return {
        stem: `Giá trị của biểu thức $${a}+${b}\\cdot${c}$ là:`,
        options, answer,
        thinking: [
          'Thứ tự thực hiện: **luỹ thừa → nhân chia → cộng trừ**; có ngoặc thì làm trong ngoặc trước.',
          'Ở biểu thức này không có ngoặc nên phải nhân trước, cộng sau.',
        ],
        solution: [
          `$${a}+${b}\\cdot${c}=${a}+${b * c}=${dung}$.`,
        ],
        pitfall: `Cộng trước rồi nhân sẽ ra $${(a + b) * c}$ — sai vì bỏ qua thứ tự phép tính.`,
      };
    },
  },
  {
    id: 'g6.th-uoc-chung-thuc-te', topicId: 'g6-t2', grade: 6, level: 'TH', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Bài toán thực tế về ƯCLN và BCNN',
    build: (r) => {
      const laUCLN = r.bool();
      const k = r.int(3, 12);
      const a = k * r.int(2, 7), b = k * r.int(2, 7);
      if (laUCLN) {
        const d = gcd(a, b);
        const [options, answer] = mcOptions(r, `$${d}$`, [`$${lcm(a, b)}$`, `$${a + b}$`, `$${Math.max(2, Math.floor(d / 2))}$`].filter((x) => x !== `$${d}$`).slice(0, 3) as string[]);
        return {
          stem: `Cô giáo có $${a}$ bút chì và $${b}$ quyển vở, muốn chia đều vào các phần quà sao cho **không thừa** món nào. Hỏi chia được nhiều nhất bao nhiêu phần quà?`,
          options, answer,
          thinking: [
            'Từ khoá "**chia đều**, không thừa, **nhiều nhất**" → bài toán **ƯCLN**.',
            'Từ khoá "cùng lúc, lặp lại, **ít nhất**" mới là bài toán BCNN — phải phân biệt rõ hai nhóm từ khoá này.',
          ],
          solution: [
            `Số phần quà phải là ước chung của $${a}$ và $${b}$, và ta cần giá trị **lớn nhất**.`,
            `Vậy số phần quà nhiều nhất là ƯCLN$(${a};${b})=${d}$.`,
          ],
          pitfall: 'Đọc lướt rồi dùng BCNN — hãy khoanh từ khoá "nhiều nhất" (ƯCLN) hay "ít nhất" (BCNN) trước khi tính.',
        };
      }
      const m = lcm(a, b);
      const [options, answer] = mcOptions(r, `$${m}$`, [`$${gcd(a, b)}$`, `$${a * b}$`, `$${a + b}$`].filter((x) => x !== `$${m}$`).slice(0, 3) as string[]);
      return {
        stem: `Hai xe buýt cùng xuất phát từ bến lúc $6$ giờ. Xe thứ nhất cứ $${a}$ phút lại quay về bến một lần, xe thứ hai cứ $${b}$ phút một lần. Hỏi sau ít nhất bao nhiêu phút thì hai xe **cùng** về bến?`,
        options, answer,
        thinking: [
          'Từ khoá "**cùng lúc**, lặp lại, **ít nhất**" → bài toán **BCNN**.',
          'Thời điểm hai xe cùng về bến là bội chung của hai chu kỳ; ta cần bội chung **nhỏ nhất**.',
        ],
        solution: [
          `Thời gian cần tìm là bội chung nhỏ nhất của $${a}$ và $${b}$.`,
          `BCNN$(${a};${b})=${m}$ (phút).`,
        ],
        pitfall: `Lấy tích $${a}\\cdot${b}=${a * b}$ làm đáp án — tích chỉ **là một** bội chung, chưa chắc là nhỏ nhất.`,
      };
    },
  },
];
