import type { ItemGenerator } from './generators';

/**
 * Bộ sinh đề cho ba chuyên đề được bổ sung sau đợt khảo sát bối cảnh tài liệu.
 *
 * Ba chuyên đề này nằm trong bộ chuẩn mà thị trường đã coi là bắt buộc cho kỳ
 * thi vào lớp 10, nhưng MATH365 còn thiếu: hệ thức lượng trong tam giác vuông
 * và tỉ số lượng giác, Viète với biểu thức không đối xứng, và bài toán thực tế
 * liên quan cực trị.
 */

/** Bộ ba Pythagore [cạnh góc vuông b, cạnh góc vuông c, cạnh huyền a]. */
const PYTHAGOREAN: [number, number, number][] = [
  [3, 4, 5],
  [6, 8, 10],
  [5, 12, 13],
  [9, 12, 15],
  [8, 15, 17],
  [12, 16, 20],
  [7, 24, 25],
  [10, 24, 26],
  [20, 21, 29],
  [15, 20, 25],
];

/** Góc đặc biệt kèm giá trị tang chính xác dạng chữ. */
const NICE_ANGLES: { deg: number; tanText: string; tan: number }[] = [
  { deg: 30, tanText: '1/√3', tan: 1 / Math.sqrt(3) },
  { deg: 45, tanText: '1', tan: 1 },
  { deg: 60, tanText: '√3', tan: Math.sqrt(3) },
];

const round1 = (x: number) => Math.round(x * 10) / 10;

export const GENERATORS_GAP: ItemGenerator[] = [
  /* ============ HỆ THỨC LƯỢNG TRONG TAM GIÁC VUÔNG ============ */
  {
    id: 'g-htl-hinh-chieu',
    name: 'Hệ thức cạnh góc vuông và hình chiếu',
    topicId: 'hh-he-thuc-luong',
    strand: 'hinh-hoc',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 1,
    skill: 'Chọn đúng hệ thức theo dữ kiện',
    build: (r) => {
      const [b, c, a] = r.pick(PYTHAGOREAN);
      /* Hình chiếu của cạnh b trên cạnh huyền: b′ = b²/a. */
      const bp = (b * b) / a;
      return {
        prompt: `Tam giác ABC vuông tại A có cạnh huyền BC = ${a} cm và cạnh góc vuông AC = ${b} cm. Gọi H là chân đường cao hạ từ A xuống BC. Tính độ dài hình chiếu HC của AC trên BC.`,
        correct: `${round1(bp)} cm`,
        wrongs: [`${round1(a - bp)} cm`, `${round1(b * b / c)} cm`, `${round1(b / 2)} cm`],
        steps: [
          'Áp dụng hệ thức lượng: bình phương một cạnh góc vuông bằng tích của cạnh huyền với hình chiếu của cạnh ấy trên cạnh huyền.',
          `Với cạnh góc vuông AC và hình chiếu HC: AC² = BC · HC.`,
          `Do đó HC = AC² / BC = ${b}² / ${a} = ${b * b} / ${a} = ${round1(bp)} cm.`,
          'Lưu ý chọn đúng hình chiếu: HC ứng với AC, còn HB mới ứng với AB.',
        ],
      };
    },
  },
  {
    id: 'g-htl-duong-cao',
    name: 'Đường cao ứng với cạnh huyền',
    topicId: 'hh-he-thuc-luong',
    strand: 'hinh-hoc',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 1,
    skill: 'Dùng hệ thức tích hai cạnh góc vuông',
    build: (r) => {
      const [b, c, a] = r.pick(PYTHAGOREAN);
      const h = (b * c) / a;
      return {
        prompt: `Tam giác ABC vuông tại A có AB = ${c} cm và AC = ${b} cm. Tính độ dài đường cao AH hạ từ A xuống cạnh huyền BC.`,
        correct: `${round1(h)} cm`,
        wrongs: [`${round1((b + c) / 2)} cm`, `${round1(a / 2)} cm`, `${round1(b * c / (b + c))} cm`],
        steps: [
          `Cạnh huyền: BC = √(AB² + AC²) = √(${c}² + ${b}²) = ${a} cm.`,
          'Áp dụng hệ thức: tích hai cạnh góc vuông bằng tích cạnh huyền với đường cao, tức AB · AC = BC · AH.',
          `Do đó AH = AB · AC / BC = ${c} · ${b} / ${a} = ${b * c} / ${a} = ${round1(h)} cm.`,
          'Cách này nhanh hơn tính diện tích hai lần và ít sai số hơn.',
        ],
      };
    },
  },
  {
    id: 'g-htl-thuc-te-do-cao',
    name: 'Bài toán thực tế đo chiều cao bằng góc nâng',
    topicId: 'hh-he-thuc-luong',
    strand: 'hinh-hoc',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 2,
    skill: 'Mô hình hoá tình huống thực tế thành tam giác vuông',
    build: (r) => {
      const { deg, tanText, tan } = r.pick(NICE_ANGLES);
      const d = r.pick([12, 15, 18, 20, 24, 30]);
      const eye = r.pick([1.4, 1.5, 1.6]);
      const h = round1(d * tan + eye);
      const noEye = round1(d * tan);
      return {
        prompt: `Một người đứng cách chân cột cờ ${d} m nhìn lên đỉnh cột với góc nâng ${deg}°. Biết mắt người đó cách mặt đất ${eye} m. Tính chiều cao cột cờ, làm tròn đến hàng phần mười.`,
        correct: `${h} m`,
        wrongs: [`${noEye} m`, `${round1(d / tan + eye)} m`, `${round1(d * tan - eye)} m`],
        steps: [
          'Dựng tam giác vuông có cạnh ngang là khoảng cách từ người tới chân cột, cạnh đứng là phần cột nằm cao hơn tầm mắt.',
          `Phần cột cao hơn tầm mắt: x = ${d} · tan${deg}° = ${d} · ${tanText} ≈ ${noEye} m.`,
          `Chiều cao cột cờ bằng phần trên cộng chiều cao tầm mắt: ${noEye} + ${eye} = ${h} m.`,
          'Bước cộng chiều cao tầm mắt là bước bị quên nhiều nhất của dạng này.',
        ],
      };
    },
  },
  {
    id: 'g-htl-ti-so-luong-giac',
    name: 'Tính giá trị lượng giác còn lại',
    topicId: 'hh-he-thuc-luong',
    strand: 'hinh-hoc',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 2,
    skill: 'Dùng hằng đẳng thức lượng giác cơ bản',
    build: (r) => {
      const [b, c, a] = r.pick(PYTHAGOREAN);
      /* Góc nhọn α có sin α = b/a; suy ra cos α = c/a và tan α = b/c. */
      return {
        prompt: `Cho góc nhọn α có sin α = ${b}/${a}. Tính tan α.`,
        correct: `${b}/${c}`,
        wrongs: [`${c}/${b}`, `${b}/${a}`, `${c}/${a}`],
        steps: [
          `Từ sin²α + cos²α = 1 ta có cos²α = 1 − (${b}/${a})² = ${a * a - b * b}/${a * a}.`,
          `Vì α là góc nhọn nên cos α > 0, do đó cos α = ${c}/${a}.`,
          `tan α = sin α / cos α = (${b}/${a}) : (${c}/${a}) = ${b}/${c}.`,
          'Mẹo nhanh: dựng tam giác vuông có cạnh đối bằng tử, cạnh huyền bằng mẫu, rồi đọc trực tiếp.',
        ],
      };
    },
  },

  /* ============ VIÈTE VỚI BIỂU THỨC KHÔNG ĐỐI XỨNG ============ */
  {
    id: 'g-viete-nhan-dang',
    name: 'Nhận dạng hệ thức đối xứng hay không đối xứng',
    topicId: 'ds-viete-khong-doi-xung',
    strand: 'dai-so',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 2,
    skill: 'Phân loại hệ thức trước khi chọn kỹ thuật',
    build: (r) => {
      const cases: { expr: string; sym: boolean }[] = [
        { expr: 'x₁² + x₂²', sym: true },
        { expr: 'x₁ − 2x₂', sym: false },
        { expr: '1/x₁ + 1/x₂', sym: true },
        { expr: 'x₁³ + x₂³', sym: true },
        { expr: '3x₁ + 2x₂ = 7', sym: false },
        { expr: 'x₁ = 3x₂', sym: false },
        { expr: '(x₁ − x₂)²', sym: true },
        { expr: 'x₁² − x₂', sym: false },
      ];
      const pick = r.pick(cases);
      const correct = pick.sym
        ? 'Đối xứng — xử lý được bằng tổng S và tích P'
        : 'Không đối xứng — phải kết hợp với chính phương trình hoặc lập hệ';
      const wrongs = pick.sym
        ? [
            'Không đối xứng — phải kết hợp với chính phương trình hoặc lập hệ',
            'Không xác định được nếu chưa biết hệ số của phương trình',
            'Chỉ dùng được khi hai nghiệm cùng dấu',
          ]
        : [
            'Đối xứng — xử lý được bằng tổng S và tích P',
            'Không xác định được nếu chưa biết hệ số của phương trình',
            'Chỉ dùng được khi hai nghiệm trái dấu',
          ];
      return {
        prompt: `Phương trình bậc hai có hai nghiệm x₁, x₂. Hệ thức ${pick.expr} thuộc loại nào?`,
        correct,
        wrongs,
        steps: [
          'Phép thử: đổi chỗ x₁ và x₂ trong hệ thức.',
          pick.sym
            ? `Với ${pick.expr}, sau khi đổi chỗ hệ thức vẫn giữ nguyên, nên đây là hệ thức đối xứng.`
            : `Với ${pick.expr}, sau khi đổi chỗ hệ thức đổi khác, nên đây là hệ thức không đối xứng.`,
          pick.sym
            ? 'Hệ thức đối xứng luôn viết lại được theo S = x₁ + x₂ và P = x₁x₂.'
            : 'Hệ thức không đối xứng không viết được theo S và P; phải lập hệ với S, hoặc dùng chính phương trình để hạ bậc.',
          'Phân loại đúng ngay từ đầu tiết kiệm được rất nhiều thời gian đi sai hướng.',
        ],
      };
    },
  },
  {
    id: 'g-viete-ti-le-nghiem',
    name: 'Hệ thức dạng một nghiệm gấp k lần nghiệm kia',
    topicId: 'ds-viete-khong-doi-xung',
    strand: 'dai-so',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 3,
    skill: 'Thế hệ thức không đối xứng vào tổng và tích',
    build: (r) => {
      const k = r.pick([2, 3, 4]);
      const t = r.int(1, 5); // x₂ = t, x₁ = k·t
      const S = (k + 1) * t;
      const P = k * t * t;
      return {
        prompt: `Phương trình x² − ${S}x + m = 0 có hai nghiệm x₁, x₂ thoả mãn x₁ = ${k}x₂. Tìm m.`,
        correct: `m = ${P}`,
        wrongs: [`m = ${S}`, `m = ${k * S}`, `m = ${t}`],
        steps: [
          `Theo định lí Viète: x₁ + x₂ = ${S} và x₁x₂ = m.`,
          `Thay x₁ = ${k}x₂ vào tổng: ${k}x₂ + x₂ = ${S}, tức ${k + 1}x₂ = ${S}, nên x₂ = ${t}.`,
          `Suy ra x₁ = ${k} · ${t} = ${k * t}.`,
          `Do đó m = x₁x₂ = ${k * t} · ${t} = ${P}.`,
          `Kiểm tra điều kiện có hai nghiệm: Δ = ${S}² − 4·${P} = ${S * S - 4 * P} > 0 ✓.`,
        ],
      };
    },
  },
  {
    id: 'g-viete-ha-bac',
    name: 'Hạ bậc nghiệm bằng chính phương trình',
    topicId: 'ds-viete-khong-doi-xung',
    strand: 'dai-so',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 4,
    skill: 'Dùng phương trình để giảm bậc biểu thức',
    build: (r) => {
      const b = r.int(2, 6);
      const c = r.int(1, 5);
      /* x₁ là nghiệm của x² − bx + c = 0 nên x₁² = b·x₁ − c. */
      return {
        prompt: `Cho x₁ là một nghiệm của phương trình x² − ${b}x + ${c} = 0. Biểu thức x₁² viết lại được thành dạng nào?`,
        correct: `${b}x₁ − ${c}`,
        wrongs: [`${b}x₁ + ${c}`, `−${b}x₁ + ${c}`, `${c}x₁ − ${b}`],
        steps: [
          `Vì x₁ là nghiệm nên thay vào phương trình ta có x₁² − ${b}x₁ + ${c} = 0.`,
          `Chuyển vế: x₁² = ${b}x₁ − ${c}.`,
          'Kỹ thuật này gọi là hạ bậc: mọi luỹ thừa bậc từ hai trở lên của nghiệm đều đưa được về bậc nhất.',
          `Ví dụ áp dụng: x₁³ = x₁ · x₁² = x₁(${b}x₁ − ${c}) = ${b}x₁² − ${c}x₁, rồi lại thay x₁² một lần nữa.`,
        ],
      };
    },
  },
  {
    id: 'g-viete-he-bac-nhat',
    name: 'Lập hệ từ hệ thức bậc nhất không đối xứng',
    topicId: 'ds-viete-khong-doi-xung',
    strand: 'dai-so',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 4,
    skill: 'Kết hợp hệ thức đề cho với tổng hai nghiệm',
    build: (r) => {
      const x1 = r.int(2, 6);
      const x2 = r.int(1, x1 - 1);
      const S = x1 + x2;
      const P = x1 * x2;
      const a = r.int(2, 3);
      const rhs = a * x1 - x2;
      return {
        prompt: `Phương trình x² − ${S}x + m = 0 có hai nghiệm x₁, x₂ thoả mãn ${a}x₁ − x₂ = ${rhs}. Tìm m.`,
        correct: `m = ${P}`,
        wrongs: [`m = ${S}`, `m = ${rhs}`, `m = ${x1}`],
        steps: [
          `Theo Viète: x₁ + x₂ = ${S}.  (1)`,
          `Hệ thức đề cho: ${a}x₁ − x₂ = ${rhs}.  (2)`,
          `Cộng (1) và (2): ${a + 1}x₁ = ${S + rhs}, suy ra x₁ = ${x1}.`,
          `Thay vào (1): x₂ = ${S} − ${x1} = ${x2}.`,
          `Do đó m = x₁x₂ = ${x1} · ${x2} = ${P}.`,
          `Đối chiếu điều kiện: Δ = ${S}² − 4·${P} = ${S * S - 4 * P} > 0 ✓.`,
        ],
      };
    },
  },

  /* ============ BÀI TOÁN THỰC TẾ LIÊN QUAN CỰC TRỊ ============ */
  {
    id: 'g-cuc-tri-hang-rao',
    name: 'Tối ưu hàng rào với diện tích cho trước',
    topicId: 'tt-cuc-tri-thuc-te',
    strand: 'thuc-te',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 3,
    skill: 'Rút về một biến rồi dùng bất đẳng thức',
    build: (r) => {
      const half = r.pick([8, 10, 12, 15, 18, 20]);
      const S = 2 * half * half; // diện tích để nghiệm đẹp: y = half, x = 2·half
      const minFence = 4 * half;
      return {
        prompt: `Một mảnh vườn hình chữ nhật có diện tích ${S} m². Một cạnh dựa vào bức tường có sẵn nên không phải rào. Hỏi chiều dài nhỏ nhất của hàng rào cần dùng là bao nhiêu mét?`,
        correct: `${minFence} m`,
        wrongs: [`${2 * minFence} m`, `${minFence + half} m`, `${3 * half} m`],
        steps: [
          'Gọi x là cạnh song song với tường, y là cạnh vuông góc với tường, x > 0 và y > 0.',
          `Ràng buộc diện tích: xy = ${S}, suy ra x = ${S}/y.`,
          `Hàng rào gồm một cạnh x và hai cạnh y nên L = x + 2y = ${S}/y + 2y.`,
          `Áp dụng bất đẳng thức AM–GM: ${S}/y + 2y ≥ 2√(${S}/y · 2y) = 2√${2 * S} = ${minFence}.`,
          `Dấu bằng khi ${S}/y = 2y, tức y = ${half} m và x = ${2 * half} m.`,
          `Vậy chiều dài nhỏ nhất của hàng rào là ${minFence} m.`,
        ],
      };
    },
  },
  {
    id: 'g-cuc-tri-tong-khong-doi',
    name: 'Diện tích lớn nhất khi chu vi cho trước',
    topicId: 'tt-cuc-tri-thuc-te',
    strand: 'thuc-te',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 2,
    skill: 'Tổng không đổi thì tích lớn nhất khi hai số bằng nhau',
    build: (r) => {
      const half = r.pick([10, 12, 14, 16, 20, 24]);
      const P = 4 * half;
      const maxS = half * half;
      return {
        prompt: `Với ${P} m hàng rào, người ta rào một mảnh đất hình chữ nhật. Diện tích lớn nhất có thể rào được là bao nhiêu?`,
        correct: `${maxS} m²`,
        wrongs: [`${2 * maxS} m²`, `${Math.round(maxS / 2)} m²`, `${P} m²`],
        steps: [
          `Gọi hai kích thước là x và y, x > 0, y > 0. Chu vi ${P} m nên 2(x + y) = ${P}, tức x + y = ${2 * half}.`,
          'Diện tích S = xy. Tổng x + y không đổi nên tích xy lớn nhất khi x = y.',
          `Theo AM–GM: xy ≤ (x + y)²/4 = ${2 * half}²/4 = ${maxS}.`,
          `Dấu bằng khi x = y = ${half} m, tức mảnh đất là hình vuông.`,
          `Vậy diện tích lớn nhất là ${maxS} m².`,
        ],
      };
    },
  },
  {
    id: 'g-cuc-tri-doc-de',
    name: 'Đọc vị chi tiết làm đổi mô hình',
    topicId: 'tt-cuc-tri-thuc-te',
    strand: 'thuc-te',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 3,
    skill: 'Xác định đúng đại lượng cần tối ưu',
    build: (r) => {
      const cases: { q: string; correct: string; wrongs: string[] }[] = [
        {
          q: 'Đề nói “một cạnh dựa vào bức tường có sẵn nên không phải rào”. Biểu thức hàng rào là gì?',
          correct: 'x + 2y, với x là cạnh song song với tường',
          wrongs: ['2x + 2y như chu vi thông thường', '2x + y', 'x + y'],
        },
        {
          q: 'Đề nói “làm một chiếc hộp không nắp”. Diện tích vật liệu gồm những mặt nào?',
          correct: 'Một mặt đáy và bốn mặt bên',
          wrongs: ['Hai mặt đáy và bốn mặt bên', 'Bốn mặt bên', 'Một mặt đáy và hai mặt bên'],
        },
        {
          q: 'Đề hỏi “chi phí nhỏ nhất” trong khi đã tìm được kích thước tối ưu. Bước tiếp theo là gì?',
          correct: 'Thay kích thước vào biểu thức chi phí rồi mới kết luận',
          wrongs: ['Kết luận luôn bằng kích thước vừa tìm được', 'Tính chu vi rồi kết luận', 'Tính diện tích rồi kết luận'],
        },
        {
          q: 'Sau khi dùng bất đẳng thức và tìm được giá trị nhỏ nhất, bước bắt buộc còn lại là gì?',
          correct: 'Kiểm tra dấu bằng có xảy ra trong miền giá trị thực tế của biến không',
          wrongs: ['Bình phương hai vế để kiểm tra', 'Vẽ đồ thị minh hoạ', 'Đổi sang đơn vị khác rồi tính lại'],
        },
        {
          q: 'Với biểu thức dạng x + k/x và x > 0, giá trị nhỏ nhất bằng bao nhiêu?',
          correct: '2√k, đạt được khi x = √k',
          wrongs: ['k, đạt được khi x = k', '√k, đạt được khi x = k', 'k/2, đạt được khi x = 2'],
        },
      ];
      const pick = r.pick(cases);
      return {
        prompt: pick.q,
        correct: pick.correct,
        wrongs: pick.wrongs,
        steps: [
          'Dạng bài thực tế mất điểm chủ yếu ở khâu đọc đề, không phải khâu tính toán.',
          'Quy trình bốn bước: đặt ẩn kèm điều kiện, viết ràng buộc, rút về một biến, tối ưu.',
          'Trước khi tính, hãy vẽ hình phác và tô đậm đúng phần thực sự phải tính.',
          'Trước khi kết luận, đọc lại câu hỏi cuối cùng của đề để trả lời đúng thứ được hỏi.',
        ],
      };
    },
  },
];
