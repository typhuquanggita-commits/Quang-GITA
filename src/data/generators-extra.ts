import { frac, vnNum } from '@/lib/rng';
import { BLUEPRINTS } from './blueprints';
import type { ItemGenerator } from './generators';

/**
 * Bộ sinh đề bổ sung cho các chuyên đề còn thiếu — sau file này, 100% chuyên đề
 * của cả các luồng đều dựng được bộ phiếu đầy đủ.
 */

/** [R, độ dài dây, khoảng cách từ tâm tới dây] — đã kiểm chứng R² = d² + (a/2)². */
const CHORDS: [number, number, number][] = [
  [5, 6, 4],
  [5, 8, 3],
  [13, 10, 12],
  [13, 24, 5],
  [10, 12, 8],
  [25, 14, 24],
  [25, 30, 20],
  [17, 16, 15],
  [15, 18, 12],
  [20, 24, 16],
];

/** Tình huống trình bày & barem — mỗi mục là một quy tắc chấm có thật. */
const BAREM_CASES: { q: string; correct: string; wrongs: string[] }[] = [
  {
    q: 'Trong bài “giải bài toán bằng cách lập phương trình”, bước nào được barem tính điểm riêng và bị bỏ quên nhiều nhất?',
    correct: 'Đặt ẩn kèm đơn vị và điều kiện của ẩn',
    wrongs: [
      'Vẽ hình minh hoạ cho tình huống',
      'Đánh số thứ tự cho từng phương trình',
      'Ghi lại toàn bộ đề bài trước khi giải',
    ],
  },
  {
    q: 'Với bài rút gọn biểu thức chứa căn, dòng đầu tiên của lời giải bắt buộc phải là gì?',
    correct: 'Điều kiện xác định của biểu thức',
    wrongs: ['Quy đồng mẫu thức', 'Đặt ẩn phụ t = √x', 'Kết luận giá trị rút gọn'],
  },
  {
    q: 'Sau khi giải xong một phương trình chứa căn, bước bắt buộc trước khi kết luận là gì?',
    correct: 'Đối chiếu nghiệm với điều kiện xác định và loại nghiệm ngoại lai',
    wrongs: [
      'Bình phương lại hai vế để kiểm tra',
      'Vẽ đồ thị để minh hoạ nghiệm',
      'Đổi biến về ẩn phụ một lần nữa',
    ],
  },
  {
    q: 'Trong bài hình học, câu dẫn nào giúp giám khảo tìm thấy điểm thành phần nhanh nhất?',
    correct: '“Xét tam giác … và tam giác …” trước khi lập tỉ số',
    wrongs: [
      '“Dễ thấy rằng …” rồi ghi luôn kết quả',
      '“Theo hình vẽ ta có …” mà không nêu căn cứ',
      '“Tương tự như trên …” cho mọi bước còn lại',
    ],
  },
  {
    q: 'Hết giờ mà một ý còn dang dở, cách xử lý nào giữ được nhiều điểm nhất?',
    correct: 'Viết ra hướng làm và các kết quả trung gian đã chứng minh được',
    wrongs: [
      'Bỏ trống hoàn toàn cho sạch bài',
      'Chép lại đề bài của ý đó',
      'Ghi một đáp số phỏng đoán mà không có lập luận',
    ],
  },
  {
    q: 'Vẽ hình cho bài hình học nên làm thế nào?',
    correct: 'Vẽ bằng bút chì, đúng tỉ lệ, ghi giả thiết trực tiếp lên hình',
    wrongs: [
      'Vẽ ngay bằng bút mực cho nét đậm, dễ nhìn',
      'Vẽ nhỏ ở góc giấy để tiết kiệm chỗ',
      'Chỉ vẽ phác, các số liệu để riêng ở phần lời giải',
    ],
  },
  {
    q: 'Trong bài toán tham số dùng định lí Viète, bước hay bị quên nhất là gì?',
    correct: 'Đối chiếu giá trị tham số tìm được với điều kiện Δ > 0',
    wrongs: [
      'Tính lại tổng và tích hai nghiệm lần thứ hai',
      'Vẽ parabol tương ứng để minh hoạ',
      'Giải trực tiếp ra hai nghiệm theo tham số',
    ],
  },
  {
    q: 'Với bài toán thực tế, phần cuối lời giải bắt buộc phải có gì?',
    correct: 'Câu kết luận có đơn vị và trả lời đúng câu hỏi của đề',
    wrongs: [
      'Bảng tổng hợp các đại lượng đã dùng',
      'Phần thử lại bằng máy tính cầm tay',
      'Ghi chú về công thức đã áp dụng',
    ],
  },
];

export const GENERATORS_EXTRA: ItemGenerator[] = [
  /* ============ HÌNH HỌC: ĐẠI LƯỢNG KHÔNG ĐỔI & CỰC TRỊ ============ */
  {
    id: 'g-khong-doi-tiep-tuyen',
    name: 'Đại lượng không đổi trong mô hình hai tiếp tuyến',
    topicId: 'hh-cuc-tri-co-dinh',
    strand: 'hinh-hoc',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 4,
    skill: 'Chứng minh một tích không phụ thuộc vị trí điểm chạy',
    build: (r) => {
      const R = r.int(2, 12);
      return {
        prompt: `Cho nửa đường tròn (O; ${R} cm) đường kính AB. Điểm M thay đổi trên nửa đường tròn (M khác A và B). Tiếp tuyến tại M cắt tiếp tuyến tại A ở C và cắt tiếp tuyến tại B ở D. Tính tích AC · BD.`,
        correct: `${R * R} cm²`,
        wrongs: [`${2 * R} cm²`, `${4 * R * R} cm²`, 'Phụ thuộc vào vị trí của M'],
        steps: [
          'Theo tính chất hai tiếp tuyến cắt nhau: CA = CM và OC là phân giác của góc AOM; DB = DM và OD là phân giác của góc BOM.',
          'Góc AOM và góc BOM kề bù nên hai tia phân giác vuông góc: OC ⊥ OD, tức tam giác COD vuông tại O.',
          'CD là tiếp tuyến tại M nên OM ⊥ CD, tức OM là đường cao của tam giác vuông COD.',
          `Hệ thức đường cao: OM² = CM · MD, mà CM = CA, MD = DB và OM = ${R}.`,
          `Vậy AC · BD = ${R}² = ${R * R} cm², không đổi khi M thay đổi.`,
        ],
      };
    },
  },
  {
    id: 'g-khoang-cach-day',
    name: 'Khoảng cách từ tâm đến dây cung',
    topicId: 'hh-cuc-tri-co-dinh',
    strand: 'hinh-hoc',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 3,
    skill: 'Dùng quan hệ đường kính – dây cung',
    build: (r) => {
      const [R, a, d] = r.pick(CHORDS);
      return {
        prompt: `Cho đường tròn (O; ${R} cm) và dây AB = ${a} cm. Tính khoảng cách từ tâm O đến dây AB.`,
        correct: `${d} cm`,
        wrongs: [`${a / 2} cm`, `${R - a / 2} cm`, `${R - d} cm`],
        steps: [
          'Kẻ OH ⊥ AB tại H. Đường kính vuông góc với dây thì đi qua trung điểm của dây, nên H là trung điểm AB.',
          `Do đó HA = ${a}/2 = ${a / 2} cm.`,
          `Tam giác OHA vuông tại H: OH² = OA² − HA² = ${R}² − ${a / 2}² = ${R * R - (a / 2) * (a / 2)}.`,
          `Vậy OH = ${d} cm.`,
        ],
      };
    },
  },

  /* ============ SỐ HỌC: PHẦN NGUYÊN ============ */
  {
    id: 'g-phan-nguyen-dem',
    name: 'Phần nguyên trong bài toán đếm bội',
    topicId: 'sh-phan-nguyen',
    strand: 'so-hoc',
    tracks: ['chuyen'],
    level: 3,
    skill: 'Dùng [N/k] để đếm số bội',
    build: (r) => {
      const N = r.int(60, 999);
      const k = r.int(3, 12);
      const c = Math.floor(N / k);
      return {
        prompt: `Có bao nhiêu số nguyên dương không vượt quá ${N} và chia hết cho ${k}?`,
        correct: `${c}`,
        wrongs: [`${c + 1}`, `${Math.floor(N / (k + 1))}`, `${N - c}`],
        steps: [
          `Các số cần đếm có dạng ${k}·q với q nguyên dương và ${k}q ≤ ${N}.`,
          `Suy ra q ≤ ${N}/${k}, tức q nhận các giá trị từ 1 đến [${N}/${k}].`,
          `[${N}/${k}] = ${c}, nên có đúng ${c} số thoả mãn.`,
        ],
      };
    },
  },
  {
    id: 'g-so-mu-giai-thua',
    name: 'Số chữ số 0 tận cùng của n!',
    topicId: 'sh-phan-nguyen',
    strand: 'so-hoc',
    tracks: ['chuyen'],
    level: 4,
    skill: 'Công thức Legendre với phần nguyên',
    build: (r) => {
      const n = r.pick([10, 15, 20, 25, 30, 40, 50, 60, 75, 100, 120, 150, 200]);
      const a = Math.floor(n / 5);
      const b = Math.floor(n / 25);
      const c = Math.floor(n / 125);
      const zeros = a + b + c;
      return {
        prompt: `Số ${n}! (giai thừa của ${n}) tận cùng bằng bao nhiêu chữ số 0?`,
        correct: `${zeros}`,
        wrongs: [`${a}`, `${zeros + 1}`, `${Math.floor(n / 10)}`],
        steps: [
          'Mỗi chữ số 0 tận cùng ứng với một thừa số 10 = 2 × 5. Trong n! số thừa số 2 luôn nhiều hơn số thừa số 5, nên chỉ cần đếm số thừa số 5.',
          `Số thừa số 5 trong ${n}! bằng [${n}/5] + [${n}/25] + [${n}/125] + …`,
          `= ${a} + ${b} + ${c} = ${zeros}.`,
          `Vậy ${n}! có ${zeros} chữ số 0 ở tận cùng.`,
        ],
      };
    },
  },

  /* ============ HÌNH HỌC: TỈ SỐ – THẲNG HÀNG – ĐỒNG QUY ============ */
  {
    id: 'g-menelaus-ti-so',
    name: 'Tính tỉ số bằng định lí Menelaus',
    topicId: 'hh-ti-so-dong-quy',
    strand: 'hinh-hoc',
    tracks: ['chuyen'],
    level: 5,
    skill: 'Áp dụng Menelaus cho tam giác và cát tuyến',
    build: (r) => {
      const m = r.int(1, 4);
      const n = r.int(1, 4);
      const p = r.int(1, 3);
      const q = r.int(1, 3);
      const num = p * m;
      const den = q * (m + n);
      return {
        prompt: `Cho tam giác ABC. Điểm D thuộc cạnh BC sao cho BD/DC = ${frac(m, n)}. Điểm E thuộc đoạn AD sao cho AE/ED = ${frac(p, q)}. Đường thẳng BE cắt cạnh AC tại F. Tính tỉ số AF/FC.`,
        correct: frac(num, den),
        wrongs: [frac(m, n), frac(p, q), frac(den, num)],
        steps: [
          'Áp dụng định lí Menelaus cho tam giác ADC với cát tuyến đi qua E ∈ AD, B ∈ đường thẳng DC và F ∈ CA:',
          '(AE/ED) · (DB/BC) · (CF/FA) = 1.',
          `Từ BD/DC = ${frac(m, n)}, đặt BD = ${m}, DC = ${n} thì BC = ${m + n}, nên DB/BC = ${frac(m, m + n)}.`,
          `Thay vào: ${frac(p, q)} · ${frac(m, m + n)} · (CF/FA) = 1 ⇒ CF/FA = ${frac(den, num)}.`,
          `Vậy AF/FC = ${frac(num, den)}.`,
        ],
      };
    },
  },
  {
    id: 'g-ti-so-dien-tich',
    name: 'Chuyển tỉ số độ dài sang tỉ số diện tích',
    topicId: 'hh-ti-so-dong-quy',
    strand: 'hinh-hoc',
    tracks: ['chuyen'],
    level: 4,
    skill: 'Hai tam giác chung đường cao thì tỉ số diện tích bằng tỉ số đáy',
    build: (r) => {
      const m = r.int(1, 5);
      const n = r.int(1, 5);
      return {
        prompt: `Cho tam giác ABC và điểm M thuộc cạnh BC sao cho BM/MC = ${frac(m, n)}. Tính tỉ số diện tích S(ABM)/S(ABC).`,
        correct: frac(m, m + n),
        wrongs: [frac(m, n), frac(n, m + n), frac(m + n, m)],
        steps: [
          'Hai tam giác ABM và ABC có chung đường cao hạ từ A xuống đường thẳng BC.',
          'Do đó tỉ số diện tích bằng tỉ số hai cạnh đáy: S(ABM)/S(ABC) = BM/BC.',
          `Từ BM/MC = ${frac(m, n)}, đặt BM = ${m}, MC = ${n} thì BC = ${m + n}.`,
          `Vậy S(ABM)/S(ABC) = ${frac(m, m + n)}.`,
        ],
      };
    },
  },

  /* ============ TỔ HỢP: CỰC HẠN & PHẢN CHỨNG ============ */
  {
    id: 'g-cuc-han-tong',
    name: 'Nguyên lí cực hạn: giá trị nhỏ nhất của cấu hình',
    topicId: 'th-cuc-han',
    strand: 'to-hop',
    tracks: ['chuyen'],
    level: 4,
    skill: 'Xét cấu hình nhỏ nhất có thể',
    build: (r) => {
      const n = r.int(5, 30);
      const s = (n * (n + 1)) / 2;
      return {
        prompt: `Cho ${n} số nguyên dương đôi một khác nhau. Tổng nhỏ nhất có thể của ${n} số đó bằng bao nhiêu?`,
        correct: `${s}`,
        wrongs: [`${n * n}`, `${(n * (n - 1)) / 2}`, `${n * (n + 1)}`],
        steps: [
          `Vì ${n} số nguyên dương đôi một khác nhau nên khi sắp xếp tăng dần a₁ < a₂ < … < a_${n}, ta có a₁ ≥ 1, a₂ ≥ 2, …, a_${n} ≥ ${n}.`,
          `Do đó tổng ≥ 1 + 2 + … + ${n} = ${n}·${n + 1}/2 = ${s}.`,
          `Dấu bằng đạt được với bộ số 1; 2; …; ${n}, nên tổng nhỏ nhất là ${s}.`,
        ],
      };
    },
  },
  {
    id: 'g-dirichlet-hieu-chia-het',
    name: 'Dirichlet với các lớp đồng dư',
    topicId: 'th-cuc-han',
    strand: 'to-hop',
    tracks: ['chuyen'],
    level: 4,
    skill: 'Dùng lớp số dư làm “chuồng”',
    build: (r) => {
      const k = r.int(4, 15);
      return {
        prompt: `Cần chọn ít nhất bao nhiêu số nguyên để chắc chắn tồn tại hai số trong đó có hiệu chia hết cho ${k}?`,
        correct: `${k + 1}`,
        wrongs: [`${k}`, `${k + 2}`, `${2 * k}`],
        steps: [
          `Khi chia cho ${k}, mỗi số nguyên rơi vào đúng một trong ${k} lớp số dư: 0, 1, …, ${k - 1}.`,
          `Coi ${k} lớp số dư là “chuồng”. Nếu chọn ${k + 1} số thì theo nguyên lí Dirichlet có hai số cùng một lớp số dư.`,
          `Hai số cùng số dư khi chia cho ${k} thì hiệu của chúng chia hết cho ${k}.`,
          `Với ${k} số thì chưa chắc: có thể chọn mỗi lớp đúng một số. Vậy con số nhỏ nhất cần tìm là ${k + 1}.`,
        ],
      };
    },
  },

  /* ============ KỸ NĂNG PHÒNG THI ============ */
  {
    id: 'g-barem-trinh-bay',
    name: 'Quy tắc trình bày & ăn điểm barem',
    topicId: 'ky-nang-trinh-bay',
    strand: 'dai-so',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 1,
    skill: 'Trình bày đúng chuẩn chấm',
    build: (r) => {
      const c = r.pick(BAREM_CASES);
      return {
        prompt: c.q,
        correct: c.correct,
        wrongs: c.wrongs,
        steps: [
          `Đáp án đúng: ${c.correct}.`,
          'Barem chấm thi tự luận cho điểm theo từng bước có căn cứ, không chỉ theo đáp số cuối cùng.',
          'Cùng một lời giải, trình bày đúng chuẩn có thể hơn 0,5 đến 1,0 điểm so với trình bày tuỳ tiện — đây là phần “lấy điểm” rẻ nhất của cả kỳ ôn thi.',
        ],
      };
    },
  },
  {
    id: 'g-chien-thuat-thoi-gian',
    name: 'Phân bổ thời gian và điểm số theo cấu trúc đề',
    topicId: 'ky-nang-quan-ly-thoi-gian',
    strand: 'dai-so',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 1,
    skill: 'Nắm ma trận đề để phân bổ thời gian',
    build: (r) => {
      const bp = r.pick(BLUEPRINTS.filter((b) => b.parts.length >= 4));
      const idx = r.int(0, bp.parts.length - 1);
      const part = bp.parts[idx];
      const askMinutes = r.bool();
      const otherMinutes = bp.parts
        .filter((_, i) => i !== idx)
        .map((p) => `${p.minutes} phút`);
      const otherPoints = bp.parts
        .filter((_, i) => i !== idx)
        .map((p) => `${vnNum(p.points, 1)} điểm`);
      return {
        prompt: askMinutes
          ? `Theo ma trận đề “${bp.title}” (${bp.minutes} phút), phần ${part.label} — ${part.content} — nên được phân bổ khoảng bao nhiêu phút?`
          : `Theo ma trận đề “${bp.title}”, phần ${part.label} — ${part.content} — chiếm bao nhiêu điểm?`,
        correct: askMinutes ? `${part.minutes} phút` : `${vnNum(part.points, 1)} điểm`,
        wrongs: askMinutes ? otherMinutes : otherPoints,
        steps: [
          `Đề “${bp.title}” có tổng thời gian ${bp.minutes} phút và thang ${bp.totalPoints} điểm.`,
          `Phần ${part.label} chiếm ${vnNum(part.points, 1)} điểm, tương ứng khoảng ${part.minutes} phút.`,
          `Nguyên tắc phân bổ: thời gian dành cho một phần nên tỉ lệ với số điểm của phần đó. Phần ${part.label} chiếm ${Math.round((part.points / bp.totalPoints) * 100)}% tổng điểm.`,
          'Biết trước ma trận đề giúp bạn không sa lầy vào phần ít điểm và không bỏ sót phần nhiều điểm.',
        ],
      };
    },
  },

  /* ============ HÌNH KHÔNG GIAN LỚP 11 ============ */
  {
    id: 'gq-the-tich-chop',
    name: 'Thể tích khối chóp',
    topicId: 'q11-hinh-khong-gian',
    strand: 'hinh-khong-gian',
    tracks: ['thpt-qg', 'chinh-khoa'],
    level: 2,
    skill: 'Áp dụng công thức V = (1/3)·S·h',
    build: (r) => {
      const B = 3 * r.int(2, 20);
      const h = r.int(3, 15);
      const V = (B * h) / 3;
      return {
        prompt: `Cho khối chóp có diện tích đáy bằng ${B} cm² và chiều cao bằng ${h} cm. Tính thể tích khối chóp.`,
        correct: `${V} cm³`,
        wrongs: [`${B * h} cm³`, `${(B * h) / 2} cm³`, `${V * 3} cm³`],
        steps: [
          'Công thức thể tích khối chóp: V = (1/3) · S_đáy · h.',
          `V = (1/3) · ${B} · ${h} = ${V} (cm³).`,
          'Lưu ý: quên hệ số 1/3 là lỗi mất điểm phổ biến nhất của chương này — công thức của khối lăng trụ mới là S·h.',
        ],
      };
    },
  },
  {
    id: 'gq-goc-duong-mat',
    name: 'Góc giữa đường thẳng và mặt phẳng',
    topicId: 'q11-hinh-khong-gian',
    strand: 'hinh-khong-gian',
    tracks: ['thpt-qg', 'chinh-khoa'],
    level: 4,
    skill: 'Xác định hình chiếu vuông góc rồi tính góc',
    build: (r) => {
      const a = r.int(1, 6);
      const kind = r.int(0, 2);
      const side = `${a}`;
      const sa = kind === 1 ? `${a}√3` : side;
      const ab = kind === 2 ? `${a}√3` : side;
      const deg = kind === 0 ? 45 : kind === 1 ? 60 : 30;
      const tanText = kind === 0 ? '1' : kind === 1 ? '√3' : '1/√3';
      return {
        prompt: `Cho hình chóp S.ABCD có đáy ABCD là hình vuông cạnh ${ab}, cạnh bên SA vuông góc với mặt phẳng đáy và SA = ${sa}. Tính góc giữa đường thẳng SB và mặt phẳng (ABCD).`,
        correct: `${deg}°`,
        wrongs: ['90°', `${deg === 45 ? 60 : 45}°`, `${deg === 30 ? 60 : 30}°`],
        steps: [
          'Vì SA ⊥ (ABCD) nên A chính là hình chiếu vuông góc của S lên mặt phẳng đáy.',
          'Do đó hình chiếu của đường thẳng SB lên (ABCD) là AB, và góc cần tìm là góc SBA.',
          'Tam giác SAB vuông tại A nên tan(góc SBA) = SA/AB.',
          `tan(góc SBA) = ${sa}/${ab} = ${tanText}, suy ra góc SBA = ${deg}°.`,
        ],
      };
    },
  },

  /* ============ ĐIỂM TỔNG KẾT ============ */
  {
    id: 'gq-diem-tong-ket',
    name: 'Tính điểm trung bình môn học kỳ',
    topicId: 'q-top1-tong-ket',
    strand: 'dai-so',
    tracks: ['thpt-qg', 'chinh-khoa'],
    level: 1,
    skill: 'Áp dụng đúng hệ số của từng loại điểm',
    build: (r) => {
      const k = r.int(3, 5);
      const tx = Array.from({ length: k }, () => r.int(7, 10));
      const gk = r.int(6, 10);
      const ck = r.int(6, 10);
      const sum = tx.reduce((a, b) => a + b, 0);
      const value = (sum + 2 * gk + 3 * ck) / (k + 5);
      const naive = (sum + gk + ck) / (k + 2);
      return {
        prompt: `Một học sinh có ${k} điểm đánh giá thường xuyên là ${tx.join('; ')}, điểm giữa kỳ là ${gk} và điểm cuối kỳ là ${ck}. Biết điểm thường xuyên tính hệ số 1, giữa kỳ hệ số 2, cuối kỳ hệ số 3. Tính điểm trung bình môn học kỳ (làm tròn đến chữ số thập phân thứ nhất).`,
        correct: vnNum(value, 1),
        wrongs: [vnNum(naive, 1), vnNum(value + 0.5, 1), vnNum((sum + gk + ck) / (k + 5), 1)],
        steps: [
          'Công thức: ĐTB = (tổng điểm thường xuyên + 2 × điểm giữa kỳ + 3 × điểm cuối kỳ) / (số điểm thường xuyên + 5).',
          `Tổng điểm thường xuyên: ${tx.join(' + ')} = ${sum}.`,
          `Tử số: ${sum} + 2·${gk} + 3·${ck} = ${sum + 2 * gk + 3 * ck}.`,
          `Mẫu số: ${k} + 5 = ${k + 5}.`,
          `ĐTB = ${sum + 2 * gk + 3 * ck}/${k + 5} ≈ ${vnNum(value, 1)}.`,
          'Nhận xét chiến lược: mẫu số luôn cộng thêm 5 vì giữa kỳ và cuối kỳ đã “chiếm chỗ” 5 đơn vị hệ số. Vì vậy điểm cuối kỳ có sức nặng lớn nhất, nhưng các điểm hệ số 1 lại là phần dễ giữ cao nhất.',
        ],
      };
    },
  },
];

export const EXTRA_COUNT = GENERATORS_EXTRA.length;
