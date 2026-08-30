import type { SectionId } from '../types';

/**
 * HE BAI GIANG
 *
 * Tang con thieu giua BIET va LAM DUOC.
 *
 * He thong da co ba tang: phieu kien thuc noi "phai nam gi", kho bi kip noi
 * "gap dang nay thi lam the nao", ngan hang cau hoi cho cho luyen. Nhung giua
 * chung con mot khoang trong ma hau het tai lieu tren thi truong cung bo:
 * NHIN MOT NGUOI LAM MAU TU DAU DEN CUOI, co con so cu the, co ca cho ho dung
 * lai de can nhac.
 *
 * Moi bai giang gom bon phan, va thu tu bon phan nay la co chu dich:
 *
 *  1. `hook` — vi sao chuyen de nay dang hoc. Noi bang so cau trong de, khong
 *     bang loi dong vien.
 *  2. `build` — mach kien thuc theo dung thu tu day, moi buoc kem mot cau tu
 *     kiem tra loi duoc ngay. Hoc sinh biet minh hong o dau truoc khi lam bai.
 *  3. `examples` — vi du mau giai tung buoc. Moi buoc co viec lam va LY DO,
 *     vi mot loi giai chi co phep tinh la mot loi giai khong hoc duoc gi.
 *  4. `wrongTurn` — mot loi giai SAI duoc trinh bay day du, kem dung cho no
 *     re nham. Day la phan hiem gap nhat trong tai lieu luyen thi, va la phan
 *     co gia tri su pham cao nhat: hoc sinh nhan ra loi cua chinh minh trong
 *     do thay vi nghe canh bao truu tuong.
 */

export interface LessonStep {
  /** Viec lam o buoc nay, viet o menh lenh thuc. */
  do: string;
  /** Vi sao lam buoc nay. Khong co ly do thi buoc do la buoc hoc thuoc. */
  why: string;
  /** Ket qua cu the cua buoc, co con so. */
  result?: string;
}

export interface WorkedExample {
  id: string;
  /** Dang bai nay tuong ung ma nao trong kho bi kip. */
  patternId?: string;
  title: string;
  /** De bai day du, doc mot minh van hieu. */
  problem: string;
  steps: readonly LessonStep[];
  answer: string;
  /** Dieu rut ra duoc, ap dung cho ca dang bai chu khong rieng bai nay. */
  takeaway: string;
}

export interface BuildBlock {
  /** Y phai nam, viet thanh mot cau khang dinh. */
  idea: string;
  /** Giai thich ngan, tra loi "vi sao lai the". */
  explain: string;
  /** Cau tu kiem tra duoc ngay, co dap an. */
  check: string;
  checkAnswer: string;
}

export interface WrongTurn {
  /** De bai cua loi giai sai. */
  problem: string;
  /** Loi giai sai, trinh bay day du nhu that. */
  attempt: readonly string[];
  /** Buoc thu may bat dau sai (1-based). */
  brokeAtStep: number;
  /** Sai o cho nao va vi sao nguoi hoc de sa vao do. */
  diagnosis: string;
  /** Cach lam dung tu buoc do tro di. */
  fix: string;
}

export interface Lesson {
  topicId: string;
  section: SectionId;
  /** Vi sao chuyen de nay dang hoc — noi bang so cau trong de. */
  hook: string;
  /** Thoi luong hoc mot lan, tinh bang phut. */
  minutes: number;
  build: readonly BuildBlock[];
  examples: readonly WorkedExample[];
  wrongTurn: WrongTurn;
}

export const LESSONS: readonly Lesson[] = [
  /* ══ TOÁN HỌC ══════════════════════════════════════════════════════ */
  {
    topicId: 'quantitative.arithmetic',
    section: 'quantitative',
    minutes: 35,
    hook: 'Số học và phần trăm chiếm khoảng 6–8 câu phần Toán, và gần như toàn bộ nằm ở mức nhận biết đến vận dụng. Đây là nhóm câu đắt nhất trên mỗi phút bỏ ra: mất một câu ở đây là mất đúng số điểm như mất một câu phân loại, trong khi thời gian chỉ bằng một phần ba.',
    build: [
      {
        idea: 'Mọi con số phần trăm đều phải gắn với một mẫu số cụ thể.',
        explain:
          'Câu "tăng 20%" chưa nói được gì cho tới khi biết tăng so với cái gì. Đề thi khai thác đúng chỗ này bằng cách đổi mẫu số giữa hai câu liên tiếp mà không nói ra.',
        check: 'Giá 100 nghìn tăng 20% rồi giảm 20%. Giá cuối là bao nhiêu?',
        checkAnswer: '96 nghìn — vì lần giảm lấy mẫu số là 120 chứ không phải 100.',
      },
      {
        idea: 'Hai lần thay đổi liên tiếp là phép NHÂN hệ số, không phải phép cộng phần trăm.',
        explain:
          'Tăng a% rồi tăng b% cho hệ số (1 + a/100)(1 + b/100). Cộng a với b chỉ đúng khi một trong hai bằng 0, nên nó luôn là một đáp án sai được cài sẵn.',
        check: 'Tăng 10% rồi tăng 10% thì tổng cộng tăng bao nhiêu phần trăm?',
        checkAnswer: '21% — vì 1,1 × 1,1 = 1,21, không phải 20%.',
      },
      {
        idea: 'Bài năng suất quy về "làm được bao nhiêu phần công việc trong một đơn vị thời gian".',
        explain:
          'Thời gian không cộng được nhưng năng suất thì cộng được. Đổi sang năng suất là bước biến một bài không cộng được thành một bài cộng được.',
        check: 'A làm xong trong 6 giờ, B trong 3 giờ. Làm chung mất bao lâu?',
        checkAnswer: '2 giờ — năng suất chung 1/6 + 1/3 = 1/2, nên thời gian là 2.',
      },
    ],
    examples: [
      {
        id: 'ex.ari.chain',
        patternId: 'ari.chain',
        title: 'Thay đổi liên tiếp qua nhiều lần',
        problem:
          'Một mặt hàng được tăng giá 25%, sau đó giảm giá 20%, rồi lại tăng 10%. So với giá ban đầu, giá cuối cùng thay đổi bao nhiêu phần trăm?',
        steps: [
          {
            do: 'Đổi mỗi lần thay đổi thành một hệ số nhân.',
            why: 'Hệ số nhân là dạng duy nhất ghép được nhiều lần thay đổi lại với nhau; phần trăm thì không.',
            result: 'Tăng 25% → 1,25 · Giảm 20% → 0,80 · Tăng 10% → 1,10',
          },
          {
            do: 'Nhân ba hệ số lại.',
            why: 'Mỗi lần thay đổi lấy kết quả của lần trước làm mẫu số, nên phép ghép là phép nhân.',
            result: '1,25 × 0,80 × 1,10 = 1,10',
          },
          {
            do: 'Đọc hệ số cuối thành phần trăm thay đổi.',
            why: 'Hệ số 1,10 nghĩa là giá cuối bằng 110% giá đầu, tức tăng 10%.',
            result: 'Tăng 10% so với giá ban đầu',
          },
        ],
        answer: 'Giá cuối tăng 10% so với giá ban đầu.',
        takeaway:
          'Cộng dồn phần trăm (25 − 20 + 10 = 15%) là bẫy được cài sẵn trong mọi đề dạng này. Chỉ cần đổi sang hệ số là bẫy tự vô hiệu.',
      },
      {
        id: 'ex.ari.work',
        title: 'Bài năng suất có người vào giữa chừng',
        problem:
          'Một bể nước có hai vòi. Vòi A chảy đầy bể trong 4 giờ, vòi B trong 6 giờ. Mở vòi A trước 1 giờ rồi mở thêm vòi B. Hỏi sau bao lâu nữa thì bể đầy?',
        steps: [
          {
            do: 'Đổi mỗi vòi sang năng suất theo phần bể mỗi giờ.',
            why: 'Năng suất cộng được, còn thời gian thì không — đây là bước làm bài toán giải được.',
            result: 'A: 1/4 bể/giờ · B: 1/6 bể/giờ',
          },
          {
            do: 'Tính phần bể đã có sau 1 giờ vòi A chảy một mình.',
            why: 'Phải trừ phần đã làm ra khỏi công việc trước khi tính giai đoạn hai.',
            result: '1 × 1/4 = 1/4 bể. Còn lại 3/4 bể.',
          },
          {
            do: 'Cộng năng suất hai vòi cho giai đoạn chảy chung.',
            why: 'Hai vòi chảy cùng lúc thì phần bể mỗi giờ là tổng của hai năng suất.',
            result: '1/4 + 1/6 = 5/12 bể/giờ',
          },
          {
            do: 'Chia phần việc còn lại cho năng suất chung.',
            why: 'Thời gian bằng khối lượng công việc chia cho tốc độ làm.',
            result: '(3/4) ÷ (5/12) = 9/5 = 1,8 giờ',
          },
        ],
        answer: 'Sau 1,8 giờ (1 giờ 48 phút) nữa thì bể đầy.',
        takeaway:
          'Bài năng suất nhiều giai đoạn luôn giải được bằng đúng ba việc: đổi sang năng suất, trừ phần đã làm, chia phần còn lại cho năng suất mới.',
      },
    ],
    wrongTurn: {
      problem: 'Một sản phẩm giảm giá 30%, sau đó giảm tiếp 20%. Tổng cộng đã giảm bao nhiêu phần trăm?',
      attempt: [
        'Lần một giảm 30%, lần hai giảm 20%.',
        'Tổng mức giảm = 30% + 20% = 50%.',
        'Vậy sản phẩm đã giảm 50% so với giá ban đầu.',
      ],
      brokeAtStep: 2,
      diagnosis:
        'Bước 2 cộng hai phần trăm với nhau, tức ngầm giả định hai lần giảm dùng chung một mẫu số. Thực tế lần giảm thứ hai lấy mẫu số là giá SAU lần giảm thứ nhất, đã nhỏ đi 30%. Lời giải sai này hấp dẫn vì nó cho ra một con số tròn trịa và khớp với một phương án trong đề — đó chính là cách đề được thiết kế.',
      fix: 'Từ bước 2: đổi sang hệ số và nhân. 0,70 × 0,80 = 0,56, tức giá còn 56% giá gốc, đã giảm 44% chứ không phải 50%.',
    },
  },
  {
    topicId: 'quantitative.algebra',
    section: 'quantitative',
    minutes: 40,
    hook: 'Hàm số và phương trình chiếm khoảng 8–10 câu phần Toán, trải đủ từ nhận biết đến phân loại. Đây là chuyên đề có nhiều câu vận dụng cao nhất, nên nó quyết định phần lớn khoảng cách giữa nhóm 40 điểm và nhóm 46 điểm ở phần thi này.',
    build: [
      {
        idea: 'Bậc và dấu của hệ số cao nhất quyết định hình dáng đồ thị trước mọi tính toán.',
        explain:
          'Nhìn ra hình dáng trước giúp loại ngay các phương án vô lý về số nghiệm hay chiều biến thiên, thường loại được hai phương án chỉ trong năm giây.',
        check: 'Hàm bậc ba có hệ số a < 0 thì khi x tiến ra vô cùng dương, y đi về đâu?',
        checkAnswer: 'Về âm vô cùng — nhánh phải đi xuống.',
      },
      {
        idea: 'Điều kiện xác định phải viết ra trước khi biến đổi, không phải kiểm tra ở cuối.',
        explain:
          'Bình phương hai vế hay nhân chéo đều có thể sinh nghiệm ngoại lai. Ghi điều kiện từ đầu biến việc loại nghiệm thành một bước cơ học thay vì một việc dễ quên.',
        check: 'Phương trình √(x − 2) = x − 4 có điều kiện gì?',
        checkAnswer: 'x ≥ 2 và x − 4 ≥ 0, tức x ≥ 4.',
      },
      {
        idea: 'Bài có tham số m luôn quy về: cô lập m rồi đọc đồ thị.',
        explain:
          'Đưa về dạng m = f(x) biến câu hỏi "tìm m để có n nghiệm" thành "đường thẳng ngang cắt đồ thị f mấy lần" — một câu hỏi nhìn là thấy.',
        check: 'Để m = x² có đúng hai nghiệm thì m phải thỏa mãn gì?',
        checkAnswer: 'm > 0 — đường ngang cắt parabol tại hai điểm.',
      },
    ],
    examples: [
      {
        id: 'ex.alg.param',
        patternId: 'alg.param',
        title: 'Tìm tham số để phương trình có đúng ba nghiệm',
        problem:
          'Tìm tất cả giá trị của tham số m để phương trình x³ − 3x + m = 0 có đúng ba nghiệm phân biệt.',
        steps: [
          {
            do: 'Cô lập tham số m về một vế.',
            why: 'Tách m ra biến bài toán tham số thành bài toán giao điểm, vốn đọc được bằng mắt trên bảng biến thiên.',
            result: 'm = −x³ + 3x, đặt f(x) = −x³ + 3x',
          },
          {
            do: 'Lập bảng biến thiên của f bằng cách xét dấu đạo hàm.',
            why: 'Bảng biến thiên cho biết các giá trị cực trị, tức các mốc mà số giao điểm thay đổi.',
            result: "f'(x) = −3x² + 3 = 0 ⟹ x = ±1. f(−1) = −2, f(1) = 2",
          },
          {
            do: 'Đếm số giao điểm của đường thẳng y = m với đồ thị f.',
            why: 'Mỗi giao điểm là một nghiệm, nên "ba nghiệm phân biệt" chính là "cắt tại ba điểm".',
            result: 'Cắt ba điểm khi m nằm nghiêm ngặt giữa hai giá trị cực trị',
          },
          {
            do: 'Viết kết luận theo đúng dấu bất đẳng thức chặt.',
            why: 'Tại đúng giá trị cực trị chỉ còn hai nghiệm vì một nghiệm là nghiệm kép, nên phải loại hai đầu mút.',
            result: '−2 < m < 2',
          },
        ],
        answer: 'm ∈ (−2; 2).',
        takeaway:
          'Mọi bài "tìm m để có n nghiệm" đều giải được bằng cùng ba việc: cô lập m, lập bảng biến thiên, đếm giao điểm. Không cần giải phương trình bậc ba lần nào.',
      },
      {
        id: 'ex.alg.radical',
        patternId: 'alg.radical',
        title: 'Phương trình chứa căn và bẫy nghiệm ngoại lai',
        problem: 'Giải phương trình √(x + 5) = x − 1 trên tập số thực, nêu rõ điều kiện xác định.',
        steps: [
          {
            do: 'Viết điều kiện xác định và điều kiện dấu của vế phải.',
            why: 'Vế trái là căn nên không âm; vậy vế phải cũng phải không âm, nếu không phương trình vô nghiệm ngay.',
            result: 'x + 5 ≥ 0 và x − 1 ≥ 0 ⟹ x ≥ 1',
          },
          {
            do: 'Bình phương hai vế.',
            why: 'Cả hai vế đều không âm trong miền điều kiện, nên bình phương là phép biến đổi tương đương ở đây.',
            result: 'x + 5 = x² − 2x + 1',
          },
          {
            do: 'Đưa về phương trình bậc hai và giải.',
            why: 'Bậc hai có công thức nghiệm, không cần đoán.',
            result: 'x² − 3x − 4 = 0 ⟹ x = 4 hoặc x = −1',
          },
          {
            do: 'Đối chiếu hai nghiệm với điều kiện x ≥ 1.',
            why: 'Bình phương có thể sinh nghiệm không thỏa phương trình gốc; đối chiếu là bước bắt lại chúng.',
            result: 'x = 4 nhận, x = −1 loại',
          },
        ],
        answer: 'Phương trình có nghiệm duy nhất x = 4.',
        takeaway:
          'Điều kiện của phương trình chứa căn có hai vế: biểu thức dưới căn không âm, và vế còn lại cũng không âm. Bỏ vế thứ hai là cách mất điểm phổ biến nhất ở dạng này.',
      },
    ],
    wrongTurn: {
      problem: 'Giải phương trình (x² − 4)/(x − 2) = 0 và cho biết phương trình có bao nhiêu nghiệm.',
      attempt: [
        'Phân tử bằng 0: x² − 4 = 0.',
        'Suy ra x = 2 hoặc x = −2.',
        'Vậy phương trình có hai nghiệm x = 2 và x = −2.',
      ],
      brokeAtStep: 1,
      diagnosis:
        'Bước 1 đặt tử bằng 0 mà chưa hề viết điều kiện xác định của phân thức. Mẫu số x − 2 buộc x ≠ 2, nên x = 2 không phải nghiệm dù nó làm tử bằng 0. Lời giải sai này rất khó tự phát hiện vì mọi phép biến đổi đều đúng — chỉ có một điều kiện bị bỏ quên ngay từ dòng đầu, và đề luôn cài sẵn phương án "hai nghiệm" để đón.',
      fix: 'Viết điều kiện x ≠ 2 trước khi làm gì khác. Sau đó giải tử bằng 0 rồi loại x = 2. Đáp án đúng là x = −2, phương trình chỉ có một nghiệm.',
    },
  },
  {
    topicId: 'quantitative.sequence',
    section: 'quantitative',
    minutes: 30,
    hook: 'Dãy số và cấp số chiếm khoảng 3–4 câu phần Toán và hầu như luôn nằm ở mức nhận biết đến vận dụng. Đổi lại số câu ít, đây là chuyên đề học nhanh nhất trong cả phần Toán: chỉ hai công thức là phủ gần hết đề.',
    build: [
      {
        idea: 'Phân biệt cấp số cộng với cấp số nhân bằng phép thử hiệu và thương.',
        explain:
          'Lấy hai số liên tiếp trừ nhau; nếu ra hằng số thì là cấp số cộng. Chia nhau; nếu ra hằng số thì là cấp số nhân. Chỉ mất năm giây và loại hẳn khả năng dùng nhầm công thức.',
        check: 'Dãy 3, 6, 12, 24 là cấp số gì, công sai hay công bội bằng bao nhiêu?',
        checkAnswer: 'Cấp số nhân, công bội q = 2.',
      },
      {
        idea: 'Số hạng tổng quát là chìa khóa của mọi câu hỏi về một số hạng bất kỳ.',
        explain:
          'Có công thức tổng quát thì không cần liệt kê tới số hạng đề hỏi. Đề thường hỏi số hạng thứ 50 hoặc thứ 100 chính là để loại người liệt kê tay.',
        check: 'Cấp số cộng có u₁ = 5, d = 3. Số hạng thứ 20 bằng bao nhiêu?',
        checkAnswer: 'u₂₀ = 5 + 19 × 3 = 62.',
      },
      {
        idea: 'Chỉ số trong công thức luôn là n − 1, không phải n.',
        explain:
          'Từ số hạng đầu tới số hạng thứ n có đúng n − 1 bước nhảy. Nhầm chỗ này làm lệch đúng một công sai, và đề luôn để sẵn phương án cho lỗi đó.',
        check: 'Từ u₁ đến u₇ có bao nhiêu lần cộng công sai?',
        checkAnswer: '6 lần, nên u₇ = u₁ + 6d.',
      },
    ],
    examples: [
      {
        id: 'ex.seq.identify',
        patternId: 'seq.identify',
        title: 'Nhận dạng cấp số và tìm số hạng xa',
        problem:
          'Cho dãy số 7, 11, 15, 19, … Hãy xác định loại cấp số, viết số hạng tổng quát và tính tổng 25 số hạng đầu tiên.',
        steps: [
          {
            do: 'Lấy hiệu hai số hạng liên tiếp để thử cấp số cộng.',
            why: 'Hiệu không đổi là dấu hiệu duy nhất và đủ để kết luận cấp số cộng.',
            result: '11 − 7 = 4; 15 − 11 = 4; 19 − 15 = 4 ⟹ cấp số cộng, d = 4',
          },
          {
            do: 'Viết số hạng tổng quát theo u₁ và d.',
            why: 'Công thức tổng quát trả lời được mọi câu hỏi về số hạng bất kỳ mà không phải liệt kê.',
            result: 'uₙ = 7 + (n − 1) × 4 = 4n + 3',
          },
          {
            do: 'Tính số hạng thứ 25 để dùng cho công thức tổng.',
            why: 'Công thức tổng cấp số cộng cần cả số hạng đầu lẫn số hạng cuối.',
            result: 'u₂₅ = 4 × 25 + 3 = 103',
          },
          {
            do: 'Áp dụng công thức tổng Sₙ = n(u₁ + uₙ)/2.',
            why: 'Công thức này là cách viết gọn của mẹo ghép cặp đầu với cuối, nên luôn đúng với cấp số cộng.',
            result: 'S₂₅ = 25 × (7 + 103)/2 = 25 × 55 = 1375',
          },
        ],
        answer: 'Cấp số cộng với d = 4, uₙ = 4n + 3, và S₂₅ = 1375.',
        takeaway:
          'Ba bước cố định cho mọi bài cấp số cộng: thử hiệu, viết tổng quát, thay vào công thức tổng. Không bước nào cần nhớ thêm gì ngoài hai công thức.',
      },
      {
        id: 'ex.seq.growth',
        patternId: 'seq.growth',
        title: 'Bài tăng trưởng thực tế quy về cấp số nhân',
        problem:
          'Một khoản tiền gửi 100 triệu đồng với lãi suất 6% một năm, lãi nhập gốc. Sau bao nhiêu năm thì số tiền vượt 150 triệu đồng?',
        steps: [
          {
            do: 'Nhận ra lãi nhập gốc nghĩa là mỗi năm nhân với cùng một hệ số.',
            why: 'Nhân cùng một hệ số qua mỗi kỳ chính là định nghĩa của cấp số nhân, nên dùng được công thức của nó.',
            result: 'q = 1,06 và uₙ = 100 × 1,06ⁿ (triệu đồng sau n năm)',
          },
          {
            do: 'Lập bất phương trình theo yêu cầu của đề.',
            why: 'Câu hỏi "sau bao nhiêu năm thì vượt" là một bất phương trình chứ không phải phương trình.',
            result: '100 × 1,06ⁿ > 150 ⟺ 1,06ⁿ > 1,5',
          },
          {
            do: 'Lấy logarit hai vế để đưa n xuống.',
            why: 'Logarit là công cụ duy nhất kéo được số mũ xuống thành thừa số; cơ số 1,06 > 1 nên chiều bất đẳng thức giữ nguyên.',
            result: 'n > log(1,5)/log(1,06) ≈ 6,96',
          },
          {
            do: 'Làm tròn lên vì n phải là số năm nguyên.',
            why: 'Sau 6 năm chưa vượt mốc, nên năm đầu tiên thỏa mãn là năm thứ 7.',
            result: 'n = 7',
          },
        ],
        answer: 'Sau 7 năm thì số tiền vượt 150 triệu đồng.',
        takeaway:
          'Bài lãi kép, tăng dân số hay khấu hao đều là cùng một bài cấp số nhân khoác áo khác nhau. Nhận ra hệ số nhân cố định là xong nửa bài.',
      },
    ],
    wrongTurn: {
      problem: 'Cấp số cộng có u₁ = 2 và công sai d = 5. Tính số hạng thứ 10.',
      attempt: ['Công thức số hạng tổng quát: uₙ = u₁ + n·d.', 'Thay số: u₁₀ = 2 + 10 × 5 = 52.', 'Vậy u₁₀ = 52.'],
      brokeAtStep: 1,
      diagnosis:
        'Bước 1 viết công thức thành u₁ + n·d thay vì u₁ + (n − 1)·d. Gốc của lỗi là hình dung sai: từ số hạng đầu tới số hạng thứ 10 chỉ có 9 bước nhảy, không phải 10 — số hạng đầu không cần bước nhảy nào để đến chính nó. Kết quả lệch đúng một công sai, và 52 luôn là một trong bốn phương án.',
      fix: 'Dùng đúng u₁₀ = u₁ + 9d = 2 + 45 = 47. Cách tự kiểm nhanh: thử với n = 1, công thức phải trả về đúng u₁.',
    },
  },
  {
    topicId: 'quantitative.geometry',
    section: 'quantitative',
    minutes: 40,
    hook: 'Hình học phẳng và không gian chiếm khoảng 5–6 câu phần Toán. Đây là chuyên đề mà một hình vẽ đúng tỉ lệ tiết kiệm được nhiều thời gian hơn bất kỳ công thức nào: rất nhiều câu chỉ cần nhìn hình là loại được hai phương án.',
    build: [
      {
        idea: 'Vẽ hình trước, gán số sau — kể cả khi đề đã cho sẵn hình.',
        explain:
          'Hình tự vẽ buộc bạn phải đọc hết dữ kiện, và mỗi dữ kiện được ghi thẳng lên hình sẽ không bị bỏ sót. Đề cố ý giấu một dữ kiện trong câu chữ chính là để bắt người không vẽ.',
        check: 'Khi đề nói "hình chóp đều", dữ kiện ẩn nào phải ghi ngay lên hình?',
        checkAnswer: 'Chân đường cao trùng tâm đáy, và các cạnh bên bằng nhau.',
      },
      {
        idea: 'Tỉ số đồng dạng k làm diện tích đổi theo k² và thể tích đổi theo k³.',
        explain:
          'Diện tích là hai chiều, thể tích là ba chiều, nên tỉ số phải được nâng lũy thừa tương ứng. Dùng thẳng k cho diện tích là lỗi phổ biến nhất của chuyên đề này.',
        check: 'Hai hình đồng dạng tỉ số 1:3 thì thể tích hơn kém nhau bao nhiêu lần?',
        checkAnswer: '27 lần, vì 3³ = 27.',
      },
      {
        idea: 'Bài không gian luôn quy về một tam giác vuông nào đó trong hình.',
        explain:
          'Khoảng cách, góc và chiều cao trong không gian đều đo được nếu tìm ra tam giác vuông chứa nó. Việc khó duy nhất là tìm đúng tam giác, phần còn lại chỉ là Pytago hoặc lượng giác.',
        check: 'Muốn tính chiều cao hình chóp đều, nên xét tam giác vuông nào?',
        checkAnswer: 'Tam giác tạo bởi chiều cao, bán kính đường tròn ngoại tiếp đáy và cạnh bên.',
      },
    ],
    examples: [
      {
        id: 'ex.geo.solid',
        patternId: 'geo.solid',
        title: 'Thể tích khối chóp đều',
        problem:
          'Cho hình chóp tứ giác đều S.ABCD có cạnh đáy bằng 6 cm và cạnh bên bằng 5 cm. Tính thể tích khối chóp.',
        steps: [
          {
            do: 'Vẽ hình và xác định chân đường cao.',
            why: 'Chóp đều có chân đường cao trùng tâm đáy — đây là dữ kiện ẩn quyết định cả bài, không ghi ra thì không tính được gì.',
            result: 'Chân đường cao là O, giao hai đường chéo hình vuông ABCD',
          },
          {
            do: 'Tính nửa đường chéo đáy để có cạnh góc vuông thứ nhất.',
            why: 'OA là khoảng cách từ tâm đáy tới đỉnh đáy, cũng là một cạnh của tam giác vuông chứa chiều cao.',
            result: 'AC = 6√2 nên OA = 3√2',
          },
          {
            do: 'Dùng Pytago trong tam giác vuông SOA để tìm chiều cao.',
            why: 'SA là cạnh huyền đã biết, OA vừa tính được, nên SO suy ra trực tiếp.',
            result: 'SO = √(5² − (3√2)²) = √(25 − 18) = √7',
          },
          {
            do: 'Áp dụng công thức thể tích khối chóp.',
            why: 'Thể tích chóp bằng một phần ba tích diện tích đáy với chiều cao, với mọi loại đáy.',
            result: 'V = (1/3) × 36 × √7 = 12√7 cm³',
          },
        ],
        answer: 'Thể tích khối chóp bằng 12√7 ≈ 31,7 cm³.',
        takeaway:
          'Mọi bài chóp đều đi qua đúng ba bước: xác định chân đường cao, tìm tam giác vuông chứa chiều cao, rồi thay vào công thức. Cạnh bên không bao giờ là chiều cao.',
      },
      {
        id: 'ex.geo.similar',
        patternId: 'geo.similar',
        title: 'Tỉ số đồng dạng và diện tích',
        problem:
          'Tam giác ABC có đường thẳng MN song song với BC, M thuộc AB và N thuộc AC, với AM/AB = 2/5. Tính tỉ số diện tích tam giác AMN so với diện tích tam giác ABC.',
        steps: [
          {
            do: 'Chỉ ra hai tam giác đồng dạng và tỉ số đồng dạng.',
            why: 'MN song song BC cho hai góc bằng nhau, nên hai tam giác đồng dạng theo trường hợp góc — góc.',
            result: '△AMN ∽ △ABC với tỉ số k = AM/AB = 2/5',
          },
          {
            do: 'Nhớ lại quan hệ giữa tỉ số đồng dạng và tỉ số diện tích.',
            why: 'Diện tích là đại lượng hai chiều, nên nó đổi theo bình phương của tỉ số dài.',
            result: 'S(AMN)/S(ABC) = k²',
          },
          {
            do: 'Thay số và rút gọn.',
            why: 'Đến đây bài chỉ còn là một phép bình phương phân số.',
            result: '(2/5)² = 4/25',
          },
        ],
        answer: 'Tỉ số diện tích bằng 4/25.',
        takeaway:
          'Đề dạng này luôn để sẵn phương án 2/5 cho người dùng thẳng tỉ số dài. Chỉ cần nhớ "dài thì k, diện tích thì k², thể tích thì k³" là không bao giờ sa vào.',
      },
    ],
    wrongTurn: {
      problem:
        'Hình chóp tam giác đều có cạnh đáy 6 cm, cạnh bên 6 cm. Một học sinh tính thể tích như sau, hãy tìm chỗ sai.',
      attempt: [
        'Diện tích đáy là tam giác đều cạnh 6: S = 6² √3/4 = 9√3.',
        'Chiều cao chóp chính là cạnh bên, bằng 6 cm.',
        'Thể tích V = (1/3) × 9√3 × 6 = 18√3 cm³.',
      ],
      brokeAtStep: 2,
      diagnosis:
        'Bước 2 lấy cạnh bên làm chiều cao. Cạnh bên đi từ đỉnh xuống một ĐỈNH của đáy, còn chiều cao đi từ đỉnh xuống TÂM đáy theo phương vuông góc — hai đoạn khác nhau, và cạnh bên luôn dài hơn. Lỗi này sinh ra từ việc không vẽ hình: khi chỉ đọc chữ, "cạnh bên 6 cm" và "chiều cao" dễ bị gộp làm một.',
      fix: 'Từ bước 2: tính bán kính đường tròn ngoại tiếp đáy R = 6/√3 = 2√3, rồi Pytago cho chiều cao h = √(6² − (2√3)²) = √24 = 2√6. Thể tích đúng là (1/3) × 9√3 × 2√6 = 6√18 = 18√2 cm³.',
    },
  },
  {
    topicId: 'quantitative.coordinate',
    section: 'quantitative',
    minutes: 35,
    hook: 'Hình học tọa độ chiếm khoảng 4–5 câu phần Toán và là chuyên đề dễ ăn điểm nhất trong nhóm hình học: mọi câu đều quy về thay số vào công thức, không đòi hỏi nhìn ra đường phụ như hình học thuần túy.',
    build: [
      {
        idea: 'Vectơ pháp tuyến và vectơ chỉ phương chỉ khác nhau ở việc đổi chỗ và đổi dấu.',
        explain:
          'Đường thẳng có vectơ chỉ phương (a; b) thì vectơ pháp tuyến là (−b; a). Nhớ một cặp là suy ra cặp kia, không cần học thuộc hai công thức phương trình.',
        check: 'Đường thẳng có vectơ chỉ phương (3; −2) thì vectơ pháp tuyến là gì?',
        checkAnswer: '(2; 3) — đổi chỗ rồi đổi dấu một thành phần.',
      },
      {
        idea: 'Phương trình đường tròn luôn đọc ra được tâm và bán kính bằng cách đưa về dạng chính tắc.',
        explain:
          'Dạng x² + y² − 2ax − 2by + c = 0 có tâm (a; b) và bán kính √(a² + b² − c). Điều kiện để là đường tròn thật là biểu thức dưới căn phải dương.',
        check: 'x² + y² − 4x + 2y − 4 = 0 có tâm và bán kính bằng bao nhiêu?',
        checkAnswer: 'Tâm (2; −1), bán kính √(4 + 1 + 4) = 3.',
      },
      {
        idea: 'Khoảng cách từ điểm tới đường thẳng là công cụ giải quyết mọi câu về tiếp xúc.',
        explain:
          'Đường thẳng tiếp xúc đường tròn khi và chỉ khi khoảng cách từ tâm tới nó bằng bán kính. Một đẳng thức duy nhất thay cho việc giải hệ.',
        check: 'Điều kiện để đường thẳng d cắt đường tròn tại hai điểm là gì?',
        checkAnswer: 'Khoảng cách từ tâm tới d nhỏ hơn bán kính.',
      },
    ],
    examples: [
      {
        id: 'ex.coo.circle',
        patternId: 'coo.circle',
        title: 'Viết phương trình tiếp tuyến của đường tròn',
        problem:
          'Cho đường tròn (C): x² + y² − 4x + 2y − 4 = 0. Viết phương trình tiếp tuyến của (C) tại điểm A(5; −1) nằm trên đường tròn.',
        steps: [
          {
            do: 'Đưa phương trình về dạng chính tắc để đọc tâm và bán kính.',
            why: 'Tâm là dữ kiện bắt buộc của mọi bài tiếp tuyến; không có tâm thì không xác định được phương của tiếp tuyến.',
            result: '(x − 2)² + (y + 1)² = 9 ⟹ tâm I(2; −1), R = 3',
          },
          {
            do: 'Kiểm tra A có nằm trên đường tròn không.',
            why: 'Công thức tiếp tuyến tại một điểm chỉ dùng được khi điểm đó thuộc đường tròn; nếu nằm ngoài thì bài toán khác hẳn.',
            result: '(5 − 2)² + (−1 + 1)² = 9 = R² ⟹ A thuộc (C)',
          },
          {
            do: 'Lấy vectơ IA làm vectơ pháp tuyến của tiếp tuyến.',
            why: 'Tiếp tuyến tại A vuông góc với bán kính IA, nên IA chính là pháp tuyến của nó.',
            result: 'IA = (3; 0)',
          },
          {
            do: 'Viết phương trình đường thẳng qua A với pháp tuyến vừa tìm.',
            why: 'Một điểm và một vectơ pháp tuyến xác định duy nhất một đường thẳng.',
            result: '3(x − 5) + 0(y + 1) = 0 ⟺ x = 5',
          },
        ],
        answer: 'Tiếp tuyến có phương trình x = 5.',
        takeaway:
          'Tiếp tuyến tại một điểm trên đường tròn luôn giải được bằng đúng một ý: bán kính nối tâm với điểm đó chính là vectơ pháp tuyến của tiếp tuyến.',
      },
      {
        id: 'ex.coo.line',
        patternId: 'coo.line',
        title: 'Khoảng cách và vị trí tương đối',
        problem:
          'Cho đường thẳng d: 3x − 4y + 5 = 0 và đường tròn (C) tâm I(1; 2) bán kính R = 2. Xét vị trí tương đối của d và (C).',
        steps: [
          {
            do: 'Áp dụng công thức khoảng cách từ điểm tới đường thẳng.',
            why: 'Vị trí tương đối giữa đường thẳng và đường tròn được quyết định hoàn toàn bởi khoảng cách này so với bán kính.',
            result: 'd(I, d) = |3×1 − 4×2 + 5| / √(3² + 4²) = |0| / 5 = 0',
          },
          {
            do: 'So sánh khoảng cách vừa tính với bán kính.',
            why: 'Nhỏ hơn R là cắt tại hai điểm, bằng R là tiếp xúc, lớn hơn R là không cắt.',
            result: '0 < 2 ⟹ đường thẳng cắt đường tròn tại hai điểm',
          },
          {
            do: 'Đọc thêm ý nghĩa của khoảng cách bằng 0.',
            why: 'Khoảng cách bằng 0 nghĩa là tâm nằm ngay trên đường thẳng, nên dây cung ở đây chính là đường kính.',
            result: 'd đi qua tâm I, cắt (C) theo một đường kính dài 4',
          },
        ],
        answer: 'Đường thẳng d cắt đường tròn tại hai điểm, và dây cung chính là đường kính dài 4.',
        takeaway:
          'Một phép tính khoảng cách trả lời trọn vẹn câu hỏi vị trí tương đối. Giải hệ phương trình để tìm giao điểm chỉ cần khi đề hỏi tọa độ cụ thể.',
      },
    ],
    wrongTurn: {
      problem: 'Tính khoảng cách từ điểm M(2; 3) đến đường thẳng d: 3x − 4y + 1 = 0.',
      attempt: [
        'Thay tọa độ M vào vế trái: 3 × 2 − 4 × 3 + 1 = 6 − 12 + 1 = −5.',
        'Vậy khoảng cách bằng −5.',
        'Kết luận: d(M, d) = −5.',
      ],
      brokeAtStep: 2,
      diagnosis:
        'Bước 2 bỏ cả dấu giá trị tuyệt đối lẫn phép chia cho độ dài vectơ pháp tuyến. Kết quả là một khoảng cách âm — điều không tồn tại về mặt hình học. Lỗi này xảy ra khi công thức được nhớ dưới dạng "thay tọa độ vào phương trình" thay vì nhớ trọn công thức, và nó bộc lộ ngay nếu người làm dừng lại tự hỏi kết quả có hợp lý không.',
      fix: 'Từ bước 2: lấy trị tuyệt đối rồi chia cho √(3² + (−4)²) = 5. Khoảng cách đúng là |−5|/5 = 1. Quy tắc tự kiểm: khoảng cách luôn là số không âm.',
    },
  },
  {
    topicId: 'quantitative.calculus',
    section: 'quantitative',
    minutes: 45,
    hook: 'Đạo hàm, tích phân và khảo sát hàm số chiếm khoảng 8–9 câu phần Toán và tập trung nhiều câu vận dụng cao nhất. Đây là chuyên đề nặng nhất về thời gian học, nhưng cũng là chuyên đề mà công cụ ít nhất: gần như mọi câu đều bắt đầu bằng việc lấy đạo hàm rồi xét dấu.',
    build: [
      {
        idea: 'Dấu của đạo hàm quyết định chiều biến thiên, và chỉ có vậy.',
        explain:
          'Đạo hàm dương thì hàm tăng, âm thì giảm. Mọi câu về đồng biến, nghịch biến, cực trị hay giá trị lớn nhất đều là các cách hỏi khác nhau về đúng một bảng xét dấu.',
        check: "Hàm số có f'(x) > 0 trên khoảng (1; 5) thì f đồng biến hay nghịch biến trên đó?",
        checkAnswer: 'Đồng biến trên (1; 5).',
      },
      {
        idea: 'Cực trị chỉ xuất hiện tại điểm đạo hàm ĐỔI DẤU, không phải tại mọi điểm đạo hàm bằng 0.',
        explain:
          'Hàm y = x³ có đạo hàm bằng 0 tại x = 0 nhưng không có cực trị vì đạo hàm không đổi dấu qua đó. Đề rất hay dùng nghiệm kép để bẫy đúng chỗ này.',
        check: 'Hàm y = x³ có bao nhiêu điểm cực trị?',
        checkAnswer: 'Không có điểm cực trị nào.',
      },
      {
        idea: 'Tích phân xác định là diện tích có dấu, nên phần dưới trục hoành mang dấu âm.',
        explain:
          'Khi đề hỏi DIỆN TÍCH hình phẳng chứ không hỏi giá trị tích phân, phải lấy trị tuyệt đối của hàm hoặc chia đoạn theo nghiệm. Bỏ qua bước này là lỗi kinh điển.',
        check: 'Tích phân của hàm âm trên một đoạn cho ra số dương hay âm?',
        checkAnswer: 'Số âm, dù diện tích hình phẳng vẫn dương.',
      },
    ],
    examples: [
      {
        id: 'ex.cal.mono',
        patternId: 'cal.mono',
        title: 'Tìm khoảng đồng biến của hàm số',
        problem: 'Tìm các khoảng đồng biến của hàm số y = x³ − 3x² − 9x + 1 trên tập số thực.',
        steps: [
          {
            do: 'Tính đạo hàm của hàm số.',
            why: 'Chiều biến thiên hoàn toàn do dấu đạo hàm quyết định, nên đây là bước bắt buộc đầu tiên.',
            result: "y' = 3x² − 6x − 9",
          },
          {
            do: 'Giải phương trình đạo hàm bằng 0 để tìm các mốc.',
            why: 'Các nghiệm này chia trục số thành những khoảng mà trên mỗi khoảng dấu đạo hàm không đổi.',
            result: '3x² − 6x − 9 = 0 ⟺ x² − 2x − 3 = 0 ⟹ x = −1 hoặc x = 3',
          },
          {
            do: 'Xét dấu đạo hàm trên từng khoảng.',
            why: 'Tam thức bậc hai có hệ số a > 0 nên mang dấu dương ngoài hai nghiệm và âm ở giữa.',
            result: "y' > 0 trên (−∞; −1) và (3; +∞); y' < 0 trên (−1; 3)",
          },
          {
            do: 'Đọc kết luận từ bảng dấu.',
            why: 'Đạo hàm dương ứng với đồng biến, nên hai khoảng ngoài chính là đáp án.',
            result: 'Hàm đồng biến trên (−∞; −1) và (3; +∞)',
          },
        ],
        answer: 'Hàm số đồng biến trên (−∞; −1) và trên (3; +∞).',
        takeaway:
          'Cả chuyên đề khảo sát hàm số quy về bốn bước cố định: đạo hàm, tìm nghiệm, xét dấu, đọc kết luận. Đổi câu hỏi chỉ đổi bước cuối.',
      },
      {
        id: 'ex.cal.integral',
        patternId: 'cal.integral',
        title: 'Diện tích hình phẳng giới hạn bởi hai đồ thị',
        problem:
          'Tính diện tích hình phẳng giới hạn bởi parabol y = x² và đường thẳng y = x + 2.',
        steps: [
          {
            do: 'Tìm hoành độ giao điểm bằng cách cho hai hàm bằng nhau.',
            why: 'Giao điểm chính là cận của tích phân; không có cận thì không tính được diện tích.',
            result: 'x² = x + 2 ⟺ x² − x − 2 = 0 ⟹ x = −1 và x = 2',
          },
          {
            do: 'Xác định hàm nào nằm trên trong đoạn giữa hai giao điểm.',
            why: 'Diện tích là tích phân của hiệu (hàm trên trừ hàm dưới); đảo thứ tự cho ra số âm.',
            result: 'Tại x = 0: đường thẳng cho 2, parabol cho 0 ⟹ đường thẳng nằm trên',
          },
          {
            do: 'Lập tích phân của hiệu hai hàm trên đoạn cận.',
            why: 'Hiệu hai hàm cho chiều cao của dải mỏng tại mỗi hoành độ, tích phân cộng dồn các dải đó.',
            result: 'S = ∫ từ −1 đến 2 của (x + 2 − x²) dx',
          },
          {
            do: 'Tính nguyên hàm rồi thay cận.',
            why: 'Nguyên hàm biến bài toán diện tích thành một phép trừ hai giá trị.',
            result: '[x²/2 + 2x − x³/3] từ −1 đến 2 = (2 + 4 − 8/3) − (1/2 − 2 + 1/3) = 9/2',
          },
        ],
        answer: 'Diện tích hình phẳng bằng 9/2 = 4,5 đơn vị diện tích.',
        takeaway:
          'Diện tích giữa hai đồ thị luôn là tích phân của (trên − dưới) giữa hai giao điểm. Xác định hàm nào nằm trên là bước duy nhất cần suy nghĩ, phần còn lại là thủ tục.',
      },
    ],
    wrongTurn: {
      problem: 'Tìm số điểm cực trị của hàm số y = x⁴ − 2x² + 1 bằng cách xét đạo hàm.',
      attempt: [
        "Tính đạo hàm: y' = 4x³ − 4x.",
        "Giải y' = 0: 4x(x² − 1) = 0 ⟹ x = 0, x = 1, x = −1. Có ba nghiệm.",
        'Vậy hàm số có ba điểm cực trị.',
      ],
      brokeAtStep: 3,
      diagnosis:
        'Bước 3 đánh đồng "số nghiệm của đạo hàm" với "số điểm cực trị". Ở bài này kết luận tình cờ đúng, nhưng lập luận thì sai và sẽ đổ ngay ở bài khác: hàm y = x³ có một nghiệm đạo hàm mà không có cực trị nào, còn hàm y = x⁴ có một nghiệm và có đúng một cực trị. Điều quyết định là đạo hàm có ĐỔI DẤU qua nghiệm hay không, chứ không phải nghiệm có tồn tại hay không.',
      fix: 'Từ bước 3: lập bảng xét dấu đạo hàm và kiểm tra dấu đổi qua từng nghiệm. Ở bài này cả ba nghiệm đều là nghiệm đơn nên đạo hàm đổi dấu qua cả ba, kết luận ba cực trị là đúng — nhưng phải đi qua bảng dấu mới được phép kết luận.',
    },
  },
  {
    topicId: 'quantitative.exponential',
    section: 'quantitative',
    minutes: 35,
    hook: 'Mũ và logarit chiếm khoảng 5–6 câu phần Toán, phần lớn ở mức thông hiểu và vận dụng. Chuyên đề này có đặc điểm hiếm: chỉ cần thuộc đúng bốn tính chất logarit là làm được gần hết, nên tỉ lệ điểm trên thời gian học rất cao.',
    build: [
      {
        idea: 'Logarit biến phép nhân thành phép cộng và phép lũy thừa thành phép nhân.',
        explain:
          'Đó là toàn bộ lý do logarit tồn tại. Mọi tính chất log(ab) = log a + log b và log(aⁿ) = n·log a chỉ là hai câu này viết bằng ký hiệu.',
        check: 'log₂(8 × 4) bằng bao nhiêu?',
        checkAnswer: 'log₂8 + log₂4 = 3 + 2 = 5.',
      },
      {
        idea: 'Điều kiện của logarit phải viết trước khi biến đổi: cơ số dương khác 1, biểu thức trong log dương.',
        explain:
          'Các phép biến đổi logarit có thể mở rộng tập xác định và sinh nghiệm ngoại lai. Ghi điều kiện từ đầu biến việc loại nghiệm thành thao tác cơ học.',
        check: 'Phương trình log(x − 3) = 1 có điều kiện gì?',
        checkAnswer: 'x − 3 > 0, tức x > 3.',
      },
      {
        idea: 'Bất phương trình mũ và logarit đổi chiều khi cơ số nằm giữa 0 và 1.',
        explain:
          'Hàm mũ với cơ số nhỏ hơn 1 là hàm nghịch biến, nên bỏ mũ hoặc bỏ log ở hai vế sẽ làm bất đẳng thức đảo chiều. Đây là bẫy được cài trong hầu hết câu bất phương trình.',
        check: 'Từ (1/2)ˣ > (1/2)³ suy ra điều gì về x?',
        checkAnswer: 'x < 3 — chiều đảo lại vì cơ số nhỏ hơn 1.',
      },
    ],
    examples: [
      {
        id: 'ex.exp.samebase',
        patternId: 'exp.samebase',
        title: 'Đưa về cùng cơ số',
        problem: 'Giải phương trình 4ˣ⁺¹ = 8²ˣ⁻¹ trên tập số thực bằng cách đưa hai vế về cùng cơ số.',
        steps: [
          {
            do: 'Viết cả hai vế theo cùng một cơ số nguyên tố.',
            why: 'Chỉ khi hai vế cùng cơ số mới được phép so sánh trực tiếp số mũ; đây là bước biến bài toán mũ thành bài toán bậc nhất.',
            result: '4 = 2² và 8 = 2³ ⟹ 2^(2(x+1)) = 2^(3(2x−1))',
          },
          {
            do: 'Cho hai số mũ bằng nhau.',
            why: 'Hàm mũ cơ số 2 là hàm đơn điệu nên hai lũy thừa bằng nhau khi và chỉ khi hai số mũ bằng nhau.',
            result: '2(x + 1) = 3(2x − 1)',
          },
          {
            do: 'Giải phương trình bậc nhất thu được.',
            why: 'Đến đây bài toán mũ đã biến mất hoàn toàn, chỉ còn đại số cơ bản.',
            result: '2x + 2 = 6x − 3 ⟹ 4x = 5 ⟹ x = 5/4',
          },
        ],
        answer: 'Phương trình có nghiệm duy nhất x = 5/4.',
        takeaway:
          'Gặp phương trình mũ, việc đầu tiên luôn là thử đưa về cùng cơ số. Chỉ khi không đưa được mới cần tới logarit hoặc đặt ẩn phụ.',
      },
      {
        id: 'ex.exp.log',
        patternId: 'exp.log',
        title: 'Phương trình logarit và nghiệm ngoại lai',
        problem: 'Giải phương trình log₂(x) + log₂(x − 2) = 3, nêu rõ điều kiện xác định và đối chiếu nghiệm.',
        steps: [
          {
            do: 'Viết điều kiện xác định cho cả hai logarit.',
            why: 'Biểu thức trong mỗi log phải dương; điều kiện chặt hơn trong hai điều kiện là điều kiện thật của bài.',
            result: 'x > 0 và x − 2 > 0 ⟹ x > 2',
          },
          {
            do: 'Gộp hai logarit cùng cơ số thành một.',
            why: 'Tổng hai logarit cùng cơ số bằng logarit của tích — chính là tính chất biến nhân thành cộng, dùng ngược lại.',
            result: 'log₂(x(x − 2)) = 3',
          },
          {
            do: 'Bỏ logarit bằng định nghĩa.',
            why: 'log₂A = 3 nghĩa là A = 2³; đây là cách duy nhất thoát khỏi ký hiệu logarit.',
            result: 'x(x − 2) = 8 ⟺ x² − 2x − 8 = 0',
          },
          {
            do: 'Giải bậc hai rồi đối chiếu điều kiện x > 2.',
            why: 'Phép gộp logarit ở bước 2 đã mở rộng tập xác định, nên bắt buộc phải đối chiếu lại.',
            result: 'x = 4 hoặc x = −2; loại x = −2 vì không thỏa x > 2',
          },
        ],
        answer: 'Phương trình có nghiệm duy nhất x = 4.',
        takeaway:
          'Gộp logarit là phép biến đổi làm rộng tập xác định, nên bước đối chiếu điều kiện không bao giờ được bỏ. Đề luôn cài một nghiệm ngoại lai đẹp mắt để đón người quên.',
      },
    ],
    wrongTurn: {
      problem: 'Giải bất phương trình (1/3)^(2x) < (1/3)^(x+3) và tìm tập nghiệm.',
      attempt: [
        'Hai vế cùng cơ số 1/3.',
        'Bỏ cơ số, giữ nguyên chiều: 2x < x + 3.',
        'Suy ra x < 3. Tập nghiệm là (−∞; 3).',
      ],
      brokeAtStep: 2,
      diagnosis:
        'Bước 2 giữ nguyên chiều bất đẳng thức khi bỏ cơ số 1/3. Cơ số nằm giữa 0 và 1 nên hàm mũ nghịch biến: lũy thừa nhỏ hơn tương ứng với số mũ LỚN hơn, nên chiều phải đảo. Lỗi này gần như không tự phát hiện được vì phép biến đổi trông hoàn toàn hợp lý, và nó cho ra một tập nghiệm sạch đẹp — đúng thứ khiến người làm yên tâm đi tiếp.',
      fix: 'Từ bước 2: đảo chiều thành 2x > x + 3, suy ra x > 3. Tập nghiệm đúng là (3; +∞). Quy tắc tự kiểm: thử một giá trị cụ thể, ví dụ x = 4, vào bất phương trình gốc.',
    },
  },
  {
    topicId: 'quantitative.combinatorics',
    section: 'quantitative',
    minutes: 40,
    hook: 'Tổ hợp và xác suất chiếm khoảng 4–5 câu phần Toán nhưng đóng góp nhiều câu phân loại hơn tỉ lệ đó. Đây cũng là chuyên đề mà một câu hỏi sai ngay từ bước đọc đề sẽ cho ra đáp án hoàn toàn sai mà vẫn khớp một phương án.',
    build: [
      {
        idea: 'Chỉnh hợp có phân biệt thứ tự, tổ hợp thì không — và đề luôn nói rõ điều này bằng một từ.',
        explain:
          'Xếp chỗ, xếp hạng, bầu ra chủ tịch và thư ký là chỉnh hợp. Chọn một nhóm, lấy ra mấy người, chọn mấy món là tổ hợp. Đọc ra từ khóa đó là chọn đúng công thức.',
        check: 'Chọn 3 học sinh từ 10 em để lập một đội thì dùng công thức nào?',
        checkAnswer: 'Tổ hợp C(10, 3), vì đội không phân biệt thứ tự.',
      },
      {
        idea: 'Bài có chữ "ít nhất" hoặc "có ít nhất một" gần như luôn dễ hơn khi tính phần bù.',
        explain:
          'Tính trực tiếp phải cộng nhiều trường hợp, còn phần bù chỉ có một trường hợp: "không có cái nào". Lấy 1 trừ đi là xong.',
        check: 'Xác suất có ít nhất một mặt ngửa khi tung 3 đồng xu bằng bao nhiêu?',
        checkAnswer: '1 − (1/2)³ = 7/8.',
      },
      {
        idea: 'Xác suất luôn là một tỉ số, nên mẫu số phải được xác định trước tử số.',
        explain:
          'Nhiều lời giải sai vì đếm tử số theo một cách và mẫu số theo cách khác — ví dụ tử có phân biệt thứ tự còn mẫu thì không. Định nghĩa không gian mẫu trước là cách chặn lỗi đó.',
        check: 'Rút 2 lá từ bộ 52 lá, không gian mẫu có bao nhiêu phần tử?',
        checkAnswer: 'C(52, 2) = 1326 nếu không phân biệt thứ tự rút.',
      },
    ],
    examples: [
      {
        id: 'ex.com.complement',
        patternId: 'com.complement',
        title: 'Dùng phần bù cho bài "ít nhất"',
        problem:
          'Một hộp có 6 bi đỏ và 4 bi xanh. Lấy ngẫu nhiên 3 bi. Tính xác suất lấy được ít nhất một bi xanh.',
        steps: [
          {
            do: 'Xác định không gian mẫu.',
            why: 'Lấy một nhóm 3 bi không phân biệt thứ tự nên mẫu số là một tổ hợp, và mọi phép đếm sau phải nhất quán với lựa chọn này.',
            result: 'n(Ω) = C(10, 3) = 120',
          },
          {
            do: 'Nhận ra biến cố đối là "không có bi xanh nào".',
            why: 'Biến cố "ít nhất một" có ba trường hợp con, còn biến cố đối chỉ có một — đếm một lần thay vì ba lần.',
            result: 'Biến cố đối: cả 3 bi đều đỏ',
          },
          {
            do: 'Đếm số cách của biến cố đối.',
            why: 'Chọn 3 bi từ riêng 6 bi đỏ, vẫn là tổ hợp để nhất quán với không gian mẫu.',
            result: 'C(6, 3) = 20',
          },
          {
            do: 'Lấy 1 trừ đi xác suất của biến cố đối.',
            why: 'Hai biến cố đối nhau có tổng xác suất bằng 1, đây là toàn bộ cơ sở của phương pháp phần bù.',
            result: '1 − 20/120 = 1 − 1/6 = 5/6',
          },
        ],
        answer: 'Xác suất lấy được ít nhất một bi xanh bằng 5/6.',
        takeaway:
          'Thấy chữ "ít nhất" thì phản xạ đầu tiên là tính phần bù. Cách này biến ba phép đếm thành một, và giảm luôn cơ hội sót trường hợp.',
      },
      {
        id: 'ex.com.choose',
        patternId: 'com.choose',
        title: 'Đếm có ràng buộc',
        problem:
          'Một lớp có 20 học sinh, trong đó có 8 nữ. Cần chọn một ban cán sự gồm 4 người sao cho có đúng 2 nữ. Hỏi có bao nhiêu cách chọn?',
        steps: [
          {
            do: 'Tách ràng buộc thành các nhóm chọn độc lập.',
            why: 'Ràng buộc "đúng 2 nữ" cố định luôn số nam phải chọn, nên bài toán tách thành hai phép chọn riêng.',
            result: 'Chọn 2 nữ từ 8, và chọn 2 nam từ 12',
          },
          {
            do: 'Đếm số cách cho từng nhóm bằng tổ hợp.',
            why: 'Ban cán sự không phân biệt thứ tự trong bài này, nên cả hai nhóm đều dùng tổ hợp.',
            result: 'C(8, 2) = 28 và C(12, 2) = 66',
          },
          {
            do: 'Nhân hai kết quả với nhau.',
            why: 'Hai lựa chọn độc lập thực hiện nối tiếp thì số cách nhân với nhau, theo quy tắc nhân.',
            result: '28 × 66 = 1848',
          },
        ],
        answer: 'Có 1848 cách chọn ban cán sự thỏa mãn yêu cầu.',
        takeaway:
          'Ràng buộc kiểu "đúng k người thuộc nhóm A" luôn tách được thành các phép chọn độc lập rồi nhân lại. Cộng thay vì nhân là lỗi hay gặp nhất ở dạng này.',
      },
    ],
    wrongTurn: {
      problem:
        'Từ 5 chữ số 1, 2, 3, 4, 5, lập được bao nhiêu số tự nhiên có 3 chữ số đôi một khác nhau?',
      attempt: [
        'Chọn 3 chữ số từ 5 chữ số đã cho.',
        'Số cách chọn là C(5, 3) = 10.',
        'Vậy lập được 10 số.',
      ],
      brokeAtStep: 2,
      diagnosis:
        'Bước 2 dùng tổ hợp, tức coi ba chữ số được chọn là một nhóm không phân biệt thứ tự. Nhưng 123 và 321 là hai SỐ khác nhau, nên thứ tự ở đây có ý nghĩa và phải dùng chỉnh hợp. Từ khóa nhận ra là chữ "số tự nhiên" — vị trí của mỗi chữ số quyết định giá trị, khác hẳn với việc lập một nhóm.',
      fix: 'Từ bước 2: dùng chỉnh hợp A(5, 3) = 5 × 4 × 3 = 60. Cách tự kiểm nhanh: liệt kê thử với ba chữ số 1, 2, 3 sẽ thấy có 6 số chứ không phải 1.',
    },
  },
  {
    topicId: 'quantitative.statistics',
    section: 'quantitative',
    minutes: 30,
    hook: 'Thống kê và xử lý số liệu chiếm khoảng 4–5 câu phần Toán, và phần lớn chỉ đòi hỏi đọc đúng bảng rồi tính đúng công thức. Đây là nhóm câu nên lấy trọn: mất một câu ở đây thường không phải vì không biết, mà vì đọc lướt tiêu đề bảng.',
    build: [
      {
        idea: 'Trung bình, trung vị và mốt trả lời ba câu hỏi khác nhau, không thay thế nhau được.',
        explain:
          'Trung bình chịu ảnh hưởng của giá trị cực đoan, trung vị thì không, còn mốt nói về giá trị hay gặp nhất. Đề chọn chỉ số nào là đã ngầm nói về tính chất nào của dữ liệu.',
        check: 'Dãy lương có vài người thu nhập rất cao thì nên dùng chỉ số nào để mô tả mức phổ biến?',
        checkAnswer: 'Trung vị, vì trung bình bị kéo lệch bởi giá trị cực đoan.',
      },
      {
        idea: 'Phương sai và độ lệch chuẩn đo mức phân tán, không đo mức cao thấp.',
        explain:
          'Hai tập số có cùng trung bình vẫn có thể phân tán rất khác nhau. Độ lệch chuẩn nhỏ nghĩa là dữ liệu bám sát trung bình, tức ổn định hơn.',
        check: 'Hai lớp cùng điểm trung bình 7, lớp A có độ lệch chuẩn 0,5 và lớp B là 2,0. Lớp nào đồng đều hơn?',
        checkAnswer: 'Lớp A, vì độ lệch chuẩn nhỏ hơn.',
      },
      {
        idea: 'Với bảng tần số, trung bình phải tính có trọng số, không lấy trung bình của các giá trị.',
        explain:
          'Mỗi giá trị xuất hiện với tần số riêng nên phải nhân giá trị với tần số rồi chia cho tổng tần số. Lấy trung bình cộng của cột giá trị là bỏ mất toàn bộ thông tin tần số.',
        check: 'Điểm 8 có 10 học sinh, điểm 6 có 30 học sinh. Trung bình bằng bao nhiêu?',
        checkAnswer: '(8×10 + 6×30)/40 = 260/40 = 6,5.',
      },
    ],
    examples: [
      {
        id: 'ex.sta.center',
        patternId: 'sta.center',
        title: 'Trung bình có trọng số từ bảng tần số',
        problem:
          'Điểm kiểm tra của một lớp được cho trong bảng: điểm 5 có 4 học sinh, điểm 6 có 10 học sinh, điểm 7 có 12 học sinh, điểm 8 có 9 học sinh, điểm 9 có 5 học sinh. Tính điểm trung bình của lớp.',
        steps: [
          {
            do: 'Tính tổng tần số để có mẫu số.',
            why: 'Mẫu số của trung bình là tổng số quan sát, không phải số dòng trong bảng.',
            result: '4 + 10 + 12 + 9 + 5 = 40 học sinh',
          },
          {
            do: 'Nhân mỗi giá trị với tần số của nó rồi cộng lại.',
            why: 'Mỗi giá trị đóng góp vào tổng đúng bằng số lần nó xuất hiện; đây chính là ý nghĩa của trọng số.',
            result: '5×4 + 6×10 + 7×12 + 8×9 + 9×5 = 20 + 60 + 84 + 72 + 45 = 281',
          },
          {
            do: 'Chia tổng có trọng số cho tổng tần số.',
            why: 'Trung bình là tổng chia cho số quan sát, và cả hai đại lượng vừa được tính đúng ở hai bước trên.',
            result: '281 / 40 = 7,025',
          },
        ],
        answer: 'Điểm trung bình của lớp là 7,025.',
        takeaway:
          'Lấy trung bình cộng của cột điểm (5+6+7+8+9)/5 = 7 cho ra một con số trông rất hợp lý và luôn nằm trong bốn phương án. Tần số là thứ phân biệt lời giải đúng với lời giải trông đúng.',
      },
      {
        id: 'ex.sta.read',
        patternId: 'sta.read',
        title: 'Đọc bảng số liệu và so sánh tốc độ tăng',
        problem:
          'Sản lượng của một nhà máy năm 2020 là 500 tấn, năm 2023 là 650 tấn. Sản lượng của nhà máy khác cùng kỳ tăng từ 1200 tấn lên 1500 tấn. Nhà máy nào tăng nhanh hơn?',
        steps: [
          {
            do: 'Nhận ra câu hỏi hỏi về tốc độ tăng chứ không phải mức tăng.',
            why: 'Mức tăng là hiệu tuyệt đối, tốc độ tăng là tỉ lệ tương đối — hai câu trả lời có thể ngược nhau hoàn toàn.',
            result: 'Phải so sánh phần trăm tăng, không so sánh số tấn tăng thêm',
          },
          {
            do: 'Tính mức tăng tương đối của nhà máy thứ nhất.',
            why: 'Mức tăng tương đối lấy chính giá trị đầu kỳ làm mẫu số, nên hai nhà máy được quy về cùng một thang so sánh.',
            result: '(650 − 500)/500 = 150/500 = 30%',
          },
          {
            do: 'Tính mức tăng tương đối của nhà máy thứ hai.',
            why: 'Cùng một công thức áp cho cả hai đối tượng thì kết quả mới so sánh được.',
            result: '(1500 − 1200)/1200 = 300/1200 = 25%',
          },
          {
            do: 'So sánh hai tỉ lệ vừa tính.',
            why: 'Hai con số nay cùng đơn vị phần trăm nên đặt cạnh nhau là đọc ra ngay.',
            result: '30% > 25%',
          },
        ],
        answer: 'Nhà máy thứ nhất tăng nhanh hơn, dù số tấn tăng thêm chỉ bằng một nửa nhà máy thứ hai.',
        takeaway:
          'Nhà máy thứ hai tăng thêm 300 tấn so với 150 tấn, nên trực giác nói nó tăng nhanh hơn. Đề dạng này sống bằng đúng khoảng cách giữa mức tăng tuyệt đối và tốc độ tăng.',
      },
    ],
    wrongTurn: {
      problem:
        'Một bảng tần số ghi: giá trị 2 xuất hiện 1 lần, giá trị 4 xuất hiện 1 lần, giá trị 10 xuất hiện 8 lần. Tính giá trị trung bình.',
      attempt: [
        'Các giá trị trong bảng là 2, 4 và 10.',
        'Trung bình = (2 + 4 + 10)/3 = 16/3 ≈ 5,33.',
        'Vậy giá trị trung bình xấp xỉ 5,33.',
      ],
      brokeAtStep: 2,
      diagnosis:
        'Bước 2 lấy trung bình cộng của ba giá trị khác nhau, tức coi mỗi giá trị xuất hiện đúng một lần. Bảng nói rõ giá trị 10 xuất hiện tới 8 lần, chiếm 80% dữ liệu, nên trung bình thật phải nằm gần 10 chứ không thể là 5,33. Cách tự phát hiện lỗi này không cần công thức: nếu phần lớn số liệu là 10 mà trung bình lại nhỏ hơn 6 thì kết quả vô lý.',
      fix: 'Từ bước 2: nhân giá trị với tần số. (2×1 + 4×1 + 10×8)/10 = 86/10 = 8,6 — một con số nằm đúng chỗ nó phải nằm, gần 10.',
    },
  },
  /* ══ NGỮ VĂN — NGÔN NGỮ ════════════════════════════════════════════ */
  {
    topicId: 'qualitative.reading',
    section: 'qualitative',
    minutes: 40,
    hook: 'Đọc hiểu văn bản chiếm khoảng 18–20 câu phần Ngữ văn, tức nhiều nhất trong cả ba phần thi ở mức chuyên đề đơn lẻ. Điểm đặc biệt: đáp án luôn nằm sẵn trong văn bản, nên đây là chuyên đề duy nhất không đòi hỏi thuộc lòng bất cứ thứ gì.',
    build: [
      {
        idea: 'Ý chính của đoạn thường nằm ở câu đầu hoặc câu cuối, và các câu giữa chỉ minh họa cho nó.',
        explain:
          'Văn bản nghị luận tiếng Việt hầu hết theo lối diễn dịch hoặc quy nạp. Xác định được câu chủ đề thì ba phương án còn lại thường chỉ là chi tiết phụ được nâng lên thành ý chính.',
        check: 'Một phương án nêu đúng một chi tiết trong bài nhưng không bao trùm cả đoạn thì có phải ý chính không?',
        checkAnswer: 'Không — đúng nhưng quá hẹp, đây là loại nhiễu phổ biến nhất.',
      },
      {
        idea: 'Câu hỏi suy luận vẫn phải có căn cứ trong văn bản, không được dựa vào hiểu biết bên ngoài.',
        explain:
          'Suy luận nghĩa là ghép hai chi tiết có sẵn để rút ra điều tác giả chưa nói thẳng. Nếu phải mượn kiến thức ngoài bài mới ra đáp án thì đó là phương án sai.',
        check: 'Phương án nghe rất đúng nhưng không có căn cứ nào trong bài thì chọn hay loại?',
        checkAnswer: 'Loại — đúng ngoài đời không đồng nghĩa với đúng theo văn bản.',
      },
      {
        idea: 'Thái độ của tác giả lộ ra qua từ ngữ đánh giá, không qua nội dung sự việc.',
        explain:
          'Cùng một sự việc có thể được kể bằng giọng tán thành, phê phán hay trung lập. Các tính từ và trạng từ mang sắc thái là nơi thái độ hiện ra rõ nhất.',
        check: 'Tác giả dùng liên tiếp các từ "đáng tiếc", "lẽ ra" thì thái độ là gì?',
        checkAnswer: 'Phê phán hoặc tiếc nuối, không phải trung lập.',
      },
    ],
    examples: [
      {
        id: 'ex.rea.main',
        patternId: 'rea.main',
        title: 'Tìm ý chính của đoạn văn',
        problem:
          'Đoạn văn: "Đọc sách không phải để biết nhiều. Nhiều người đọc hàng trăm cuốn mỗi năm mà cách nghĩ vẫn y nguyên. Đọc sách là để có thêm một cách nhìn khác với cách nhìn mình đang có. Một cuốn sách làm bạn nghĩ khác đi đáng giá hơn trăm cuốn chỉ làm bạn gật đầu." Hãy xác định ý chính của đoạn.',
        steps: [
          {
            do: 'Đọc câu đầu và câu cuối trước, vì câu chủ đề thường nằm ở một trong hai chỗ đó.',
            why: 'Đoạn nghị luận thường mở bằng luận điểm hoặc chốt lại bằng luận điểm; đọc hai đầu tiết kiệm được thời gian đọc kỹ phần giữa.',
            result: 'Câu đầu phủ định một quan niệm; câu cuối khẳng định một tiêu chí giá trị',
          },
          {
            do: 'Tìm câu nêu điều tác giả KHẲNG ĐỊNH, không phải điều tác giả bác bỏ.',
            why: 'Câu mở đầu ở đây là phản đề, dùng để dọn đường; ý chính luôn nằm ở phần khẳng định.',
            result: 'Câu thứ ba: "Đọc sách là để có thêm một cách nhìn khác"',
          },
          {
            do: 'Kiểm tra câu vừa chọn có bao trùm được cả bốn câu không.',
            why: 'Ý chính phải giải thích được vì sao mỗi câu còn lại có mặt trong đoạn; nếu có câu nằm ngoài thì chọn chưa đúng.',
            result: 'Câu 1 phản đề, câu 2 dẫn chứng, câu 4 hệ quả — cả ba đều phục vụ câu 3',
          },
          {
            do: 'Loại các phương án đúng nhưng quá hẹp.',
            why: 'Phương án nêu một chi tiết có thật trong bài là loại nhiễu được dùng nhiều nhất ở dạng câu này.',
            result: 'Loại phương án nói riêng về "nhiều người đọc trăm cuốn mà không đổi"',
          },
        ],
        answer: 'Ý chính: giá trị của việc đọc nằm ở chỗ thay đổi cách nghĩ, không nằm ở số lượng sách đọc được.',
        takeaway:
          'Câu mở đầu mang tính phản đề rất hay bị nhầm thành ý chính. Hỏi "tác giả khẳng định điều gì" thay vì "tác giả nói gì" là loại được ngay bẫy đó.',
      },
      {
        id: 'ex.rea.infer',
        patternId: 'rea.infer',
        title: 'Câu hỏi suy luận có căn cứ',
        problem:
          'Văn bản viết: "Thư viện của làng mở cửa suốt mười năm. Ba năm gần đây, số người mượn sách giảm còn một phần tư, nhưng số giờ mọi người ngồi lại trong phòng đọc thì tăng gấp đôi." Có thể suy ra điều gì về vai trò của thư viện?',
        steps: [
          {
            do: 'Tách các dữ kiện được nêu thẳng trong văn bản.',
            why: 'Suy luận chỉ được phép ghép các dữ kiện có sẵn; liệt kê ra trước giúp không lẫn với hiểu biết bên ngoài.',
            result: 'Mượn sách giảm mạnh · thời gian ngồi lại tăng gấp đôi',
          },
          {
            do: 'Ghép hai dữ kiện để tìm điều chúng cùng chỉ về.',
            why: 'Suy luận là rút ra điều tác giả chưa nói thẳng nhưng các chi tiết đã cùng hướng tới.',
            result: 'Người ta vẫn tới thư viện, nhưng để làm việc khác chứ không phải để mượn sách',
          },
          {
            do: 'Kiểm tra kết luận có vượt quá dữ kiện không.',
            why: 'Phương án đi quá xa dữ kiện là loại nhiễu tinh vi nhất; nó đúng về logic đời thường nhưng không có căn cứ trong bài.',
            result: 'Không kết luận được lý do cụ thể, chỉ kết luận được vai trò đã đổi',
          },
        ],
        answer:
          'Thư viện đã chuyển vai trò từ nơi mượn sách sang nơi để ngồi lại đọc và làm việc — kết luận này có đủ căn cứ, còn nguyên nhân cụ thể thì văn bản chưa cho biết.',
        takeaway:
          'Ranh giới giữa suy luận đúng và suy diễn quá đà là câu hỏi: "chi tiết nào trong bài cho phép tôi nói câu này?" Không trả lời được thì đó là suy diễn.',
      },
    ],
    wrongTurn: {
      problem:
        'Đoạn văn nói: "Nhiều người trẻ hiện nay chọn về quê khởi nghiệp. Họ mang theo kiến thức học được ở thành phố." Câu hỏi: Ý chính của đoạn là gì?',
      attempt: [
        'Đoạn có nhắc tới thành phố và việc học ở đó.',
        'Ngoài đời, học ở thành phố thì cơ hội tốt hơn ở quê.',
        'Vậy ý chính là: nên học ở thành phố để có cơ hội tốt.',
      ],
      brokeAtStep: 2,
      diagnosis:
        'Bước 2 kéo một hiểu biết ngoài văn bản vào làm căn cứ. Đoạn văn không hề so sánh cơ hội giữa thành phố và nông thôn, cũng không đưa ra lời khuyên nào. Đây là lỗi nguy hiểm nhất của phần đọc hiểu vì kết luận nghe rất hợp lý — và chính sự hợp lý đó khiến người làm không dừng lại kiểm tra xem câu nào trong bài đã nói điều ấy.',
      fix: 'Từ bước 2: chỉ dùng chi tiết trong bài. Hai câu đều nói về việc người trẻ về quê khởi nghiệp và mang theo kiến thức, nên ý chính là xu hướng người trẻ về quê khởi nghiệp với vốn kiến thức tích lũy được. Quy tắc: mỗi kết luận phải chỉ ra được câu nào trong bài chống đỡ nó.',
    },
  },
  {
    topicId: 'qualitative.literature',
    section: 'qualitative',
    minutes: 40,
    hook: 'Tác giả, tác phẩm và giai đoạn văn học chiếm khoảng 8–10 câu phần Ngữ văn. Khác với đọc hiểu, nhóm câu này đòi hỏi thuộc — nhưng thuộc theo cụm giai đoạn thì nhẹ hơn thuộc theo từng tác phẩm rời rạc rất nhiều.',
    build: [
      {
        idea: 'Nhớ tác phẩm theo GIAI ĐOẠN sẽ nhẹ hơn nhớ theo từng tác giả rời.',
        explain:
          'Mỗi giai đoạn có một mối quan tâm chung, nên biết giai đoạn là đoán được đề tài và giọng điệu. Ba mốc lớn: trước 1945, 1945–1975, và sau 1975.',
        check: 'Tác phẩm viết về người lính và tinh thần tập thể nhiều khả năng thuộc giai đoạn nào?',
        checkAnswer: 'Giai đoạn 1945–1975.',
      },
      {
        idea: 'Mỗi tác giả lớn gắn với một dấu ấn phong cách nhận ra được ngay.',
        explain:
          'Nam Cao viết về nhân phẩm bị bào mòn, Nguyễn Tuân đi tìm cái đẹp tài hoa, Tô Hoài tả cảnh sinh hoạt tỉ mỉ. Một câu đặc trưng cho mỗi tác giả là đủ để nhận diện.',
        check: 'Trích đoạn tả thiên nhiên bằng nhiều từ Hán Việt trang trọng, thiên về cái đẹp tài hoa gợi tới ai?',
        checkAnswer: 'Nguyễn Tuân.',
      },
      {
        idea: 'Hoàn cảnh sáng tác giải thích nội dung, nên nhớ hoàn cảnh là nhớ luôn chủ đề.',
        explain:
          'Tác phẩm ra đời trong kháng chiến thường viết về lòng yêu nước và tinh thần tập thể; tác phẩm sau đổi mới nghiêng về số phận cá nhân. Nhớ mốc là suy ra được chủ đề.',
        check: 'Tác phẩm viết năm 1948 giữa cuộc kháng chiến chống Pháp thường mang chủ đề gì?',
        checkAnswer: 'Lòng yêu nước, tình quân dân, tinh thần kháng chiến.',
      },
    ],
    examples: [
      {
        id: 'ex.lit.context',
        patternId: 'lit.context',
        title: 'Xác định giai đoạn từ đặc điểm nội dung',
        problem:
          'Một tác phẩm văn xuôi viết về người nông dân miền núi được giải phóng khỏi ách áp bức, giọng văn hào sảng, kết thúc mở ra tương lai tươi sáng. Hãy xác định giai đoạn văn học và nêu căn cứ.',
        steps: [
          {
            do: 'Đọc ra ba tín hiệu về nội dung và giọng điệu.',
            why: 'Giai đoạn văn học được nhận ra qua mối quan tâm chung, và mối quan tâm đó lộ ra ở đề tài cùng giọng điệu.',
            result: 'Đề tài giải phóng · giọng hào sảng · kết thúc lạc quan',
          },
          {
            do: 'Đối chiếu ba tín hiệu với đặc trưng từng giai đoạn.',
            why: 'Mỗi giai đoạn có một bộ đặc trưng riêng, nên việc đối chiếu thường chỉ để lại một khả năng.',
            result:
              'Trước 1945 thiên về bi kịch cá nhân; sau 1975 thiên về số phận riêng và giọng trầm; 1945–1975 khớp cả ba tín hiệu',
          },
          {
            do: 'Kiểm tra bằng một tín hiệu ngược lại để chắc chắn.',
            why: 'Nếu tác phẩm mang cả đặc trưng của giai đoạn khác thì kết luận cần xét lại.',
            result: 'Không có dấu hiệu bi quan hay hoài nghi đặc trưng của giai đoạn sau đổi mới',
          },
        ],
        answer:
          'Tác phẩm thuộc giai đoạn 1945–1975, căn cứ ở đề tài giải phóng, cảm hứng sử thi và kết thúc hướng về tương lai.',
        takeaway:
          'Không cần nhớ tên tác phẩm vẫn xác định được giai đoạn, vì giai đoạn được nhận ra qua đề tài và giọng điệu. Đây là cách gỡ điểm khi gặp một tác phẩm chưa từng học kỹ.',
      },
      {
        id: 'ex.lit.device',
        patternId: 'lit.device',
        title: 'Nhận diện phong cách tác giả từ trích đoạn',
        problem:
          'Trích đoạn miêu tả một người lái đò vượt thác với hàng loạt động từ mạnh, ví von dòng sông như một đối thủ có tính cách, ngôn ngữ giàu chất tạo hình và có màu sắc điện ảnh. Đoạn này gợi tới phong cách của tác giả nào?',
        steps: [
          {
            do: 'Liệt kê các dấu hiệu ngôn ngữ nổi bật của đoạn.',
            why: 'Phong cách là tổng hợp các lựa chọn ngôn ngữ lặp lại, nên phải nhìn vào chữ chứ không nhìn vào nội dung.',
            result: 'Động từ mạnh dồn dập · nhân hóa thiên nhiên thành đối thủ · chất tạo hình đậm',
          },
          {
            do: 'Đối chiếu với dấu ấn riêng của từng tác giả đã học.',
            why: 'Mỗi tác giả lớn có một dấu ấn ổn định, nên bảng đối chiếu thường chỉ để lại một cái tên.',
            result:
              'Nam Cao thiên về nội tâm và nhân phẩm; Tô Hoài tả sinh hoạt tỉ mỉ; Nguyễn Tuân đi tìm cái đẹp tài hoa và chất tạo hình',
          },
          {
            do: 'Chốt tác giả và nêu tác phẩm tương ứng nếu nhận ra.',
            why: 'Câu hỏi thường hỏi tiếp về tác phẩm, nên nối luôn hai dữ kiện lại tiết kiệm được một lần suy nghĩ.',
            result: 'Nguyễn Tuân, tùy bút Người lái đò Sông Đà',
          },
        ],
        answer: 'Đoạn trích mang phong cách Nguyễn Tuân, gắn với tùy bút Người lái đò Sông Đà.',
        takeaway:
          'Nhận diện phong cách đi từ CHỮ chứ không từ nội dung: cùng một câu chuyện, mỗi tác giả kể bằng một hệ thống ngôn ngữ khác nhau, và hệ thống đó mới là dấu vân tay.',
      },
    ],
    wrongTurn: {
      problem:
        'Một câu hỏi yêu cầu xác định hoàn cảnh sáng tác của tác phẩm viết về nạn đói năm 1945 và khát vọng sống của người nghèo.',
      attempt: [
        'Tác phẩm nói về nạn đói năm 1945.',
        'Vậy tác phẩm phải được sáng tác trong năm 1945, ngay lúc nạn đói diễn ra.',
        'Kết luận: hoàn cảnh sáng tác là năm 1945.',
      ],
      brokeAtStep: 2,
      diagnosis:
        'Bước 2 đồng nhất thời gian ĐƯỢC KỂ trong tác phẩm với thời gian SÁNG TÁC tác phẩm. Hai mốc này thường khác nhau, và khoảng cách giữa chúng chính là điều đề muốn kiểm tra: nhiều tác phẩm viết về nạn đói được sáng tác sau đó nhiều năm, khi tác giả đã có độ lùi để nhìn lại. Nhầm lẫn này kéo theo cả kết luận sai về chủ đề, vì chủ đề phụ thuộc hoàn cảnh sáng tác chứ không phụ thuộc thời gian câu chuyện.',
      fix: 'Từ bước 2: tách rõ hai mốc — thời gian của câu chuyện và thời gian tác giả cầm bút. Khi ôn, ghi hoàn cảnh sáng tác thành một dòng riêng bên cạnh tóm tắt nội dung, đừng gộp chung.',
    },
  },
  {
    topicId: 'qualitative.grammar',
    section: 'qualitative',
    minutes: 30,
    hook: 'Ngữ pháp và lỗi sai trong câu chiếm khoảng 6–8 câu phần Ngữ văn, hầu hết ở mức nhận biết và thông hiểu. Đây là nhóm câu làm nhanh nhất trong cả phần thi: mỗi câu nên xong trong 30 giây, và thời gian tiết kiệm được dồn cho đọc hiểu.',
    build: [
      {
        idea: 'Câu đủ nghĩa phải có cả chủ ngữ lẫn vị ngữ; thiếu một trong hai là câu sai.',
        explain:
          'Lỗi phổ biến nhất là câu chỉ có thành phần trạng ngữ dài rồi kết thúc, khiến người đọc tưởng đã đủ ý. Rút gọn câu về nòng cốt là cách phát hiện nhanh nhất.',
        check: '"Qua tác phẩm cho ta thấy số phận người nông dân." sai ở đâu?',
        checkAnswer: 'Thiếu chủ ngữ — "qua tác phẩm" chỉ là trạng ngữ.',
      },
      {
        idea: 'Quan hệ từ phải khớp với quan hệ logic thật giữa hai vế.',
        explain:
          '"Vì… nên" chỉ nguyên nhân, "tuy… nhưng" chỉ tương phản, "nếu… thì" chỉ điều kiện. Dùng nhầm cặp làm câu vô lý về nghĩa dù đúng về hình thức.',
        check: '"Tuy trời mưa nên tôi ở nhà." sai ở đâu?',
        checkAnswer: 'Dùng lẫn hai cặp; quan hệ ở đây là nguyên nhân nên phải là "Vì… nên".',
      },
      {
        idea: 'Đại từ và từ thay thế phải trỏ rõ về một đối tượng duy nhất.',
        explain:
          'Khi trong câu có hai danh từ cùng giống, một đại từ đứng sau sẽ mơ hồ. Câu mơ hồ về sở chỉ là câu sai, dù đọc lên vẫn xuôi tai.',
        check: '"Nam nói với Bình rằng cậu ấy đã sai." mơ hồ ở chỗ nào?',
        checkAnswer: '"Cậu ấy" có thể là Nam hoặc Bình.',
      },
    ],
    examples: [
      {
        id: 'ex.gra.structure',
        patternId: 'gra.structure',
        title: 'Phát hiện câu thiếu thành phần nòng cốt',
        problem:
          'Xác định lỗi trong câu sau và sửa lại: "Với những trang viết chân thực về đời sống người lao động nghèo trước Cách mạng tháng Tám."',
        steps: [
          {
            do: 'Rút câu về nòng cốt bằng cách bỏ hết các thành phần phụ.',
            why: 'Trạng ngữ dài che mất việc câu chưa có nòng cốt; bỏ chúng đi thì lỗi lộ ra ngay.',
            result: 'Bỏ "Với những trang viết…" thì không còn lại gì',
          },
          {
            do: 'Kiểm tra sự có mặt của chủ ngữ và vị ngữ.',
            why: 'Một câu hoàn chỉnh bắt buộc có hai thành phần này; thiếu bất kỳ thành phần nào là câu chưa trọn ý.',
            result: 'Không có chủ ngữ, cũng không có vị ngữ',
          },
          {
            do: 'Bổ sung thành phần còn thiếu sao cho giữ nguyên ý định của người viết.',
            why: 'Sửa lỗi ngữ pháp không được làm đổi nội dung; chỉ thêm phần tối thiểu để câu đủ nghĩa.',
            result: 'Thêm chủ ngữ và vị ngữ vào sau trạng ngữ',
          },
        ],
        answer:
          'Câu thiếu cả chủ ngữ lẫn vị ngữ. Sửa: "Với những trang viết chân thực về đời sống người lao động nghèo trước Cách mạng tháng Tám, Nam Cao đã dựng nên một bức tranh xã hội đầy ám ảnh."',
        takeaway:
          'Mẹo nhanh nhất cho dạng câu này: che hết phần đứng trước dấu phẩy đầu tiên rồi đọc phần còn lại. Không đứng vững một mình thì câu thiếu nòng cốt.',
      },
      {
        id: 'ex.gra.logic',
        patternId: 'gra.logic',
        title: 'Quan hệ từ dùng sai làm hỏng logic câu',
        problem:
          'Câu sau mắc lỗi gì và nên sửa thế nào: "Tuy anh ấy học rất chăm chỉ nên kết quả thi rất cao."',
        steps: [
          {
            do: 'Xác định quan hệ logic thật giữa hai vế.',
            why: 'Quan hệ từ chỉ là nhãn dán; phải đọc ra quan hệ thật trước rồi mới chọn được nhãn đúng.',
            result: 'Học chăm chỉ dẫn tới kết quả cao — đây là quan hệ nguyên nhân, kết quả',
          },
          {
            do: 'Đối chiếu quan hệ đó với cặp quan hệ từ đang dùng.',
            why: '"Tuy… nhưng" biểu thị tương phản, tức hai vế phải trái ngược kỳ vọng của nhau.',
            result: 'Hai vế thuận chiều nhau, nên "tuy" hoàn toàn không phù hợp',
          },
          {
            do: 'Thay bằng cặp quan hệ từ khớp với quan hệ logic.',
            why: 'Sửa quan hệ từ là đủ; nội dung hai vế vốn không có vấn đề gì.',
            result: 'Dùng cặp "Vì… nên"',
          },
        ],
        answer:
          'Câu dùng lẫn hai cặp quan hệ từ. Sửa: "Vì anh ấy học rất chăm chỉ nên kết quả thi rất cao."',
        takeaway:
          'Đọc thầm hai vế và tự hỏi "vế sau là kết quả hay là điều trái với kỳ vọng?" là chọn đúng cặp quan hệ từ mà không cần nhớ danh sách.',
      },
    ],
    wrongTurn: {
      problem:
        'Xác định câu đúng ngữ pháp trong hai câu: (A) "Qua bài thơ đã cho thấy tình yêu quê hương của tác giả." và (B) "Bài thơ đã cho thấy tình yêu quê hương của tác giả."',
      attempt: [
        'Câu A nghe trang trọng hơn và có thêm từ "qua" nên diễn đạt mượt hơn.',
        'Câu B thì cụt và đơn giản.',
        'Vậy câu A đúng ngữ pháp hơn câu B.',
      ],
      brokeAtStep: 1,
      diagnosis:
        'Bước 1 lấy cảm giác "nghe trang trọng" làm tiêu chí đánh giá ngữ pháp. Chữ "qua" ở đầu câu A biến cả cụm "bài thơ" thành trạng ngữ, khiến câu mất chủ ngữ và chỉ còn vị ngữ đứng một mình. Đây là lỗi sai xuất hiện nhiều nhất trong bài làm của học sinh chính vì nó nghe êm tai hơn câu đúng — sự trang trọng giả tạo đến từ chính thành phần đang làm hỏng câu.',
      fix: 'Từ bước 1: bỏ tiêu chí cảm giác, dùng phép thử nòng cốt. Hỏi "ai/cái gì đã cho thấy?" — câu B trả lời được là "bài thơ", câu A không trả lời được. Câu B mới là câu đúng.',
    },
  },
  {
    topicId: 'qualitative.vocabulary',
    section: 'qualitative',
    minutes: 30,
    hook: 'Từ vựng và nghĩa của từ chiếm khoảng 6–7 câu phần Ngữ văn. Không thể học thuộc hết từ tiếng Việt, nhưng có thể học cách đọc nghĩa từ ngữ cảnh — và ngữ cảnh trong đề thi luôn đủ để xác định nghĩa mà không cần từ điển.',
    build: [
      {
        idea: 'Nghĩa của từ trong câu do ngữ cảnh quyết định, không do nghĩa quen thuộc nhất quyết định.',
        explain:
          'Nhiều từ tiếng Việt đa nghĩa, và đề luôn chọn nghĩa ít gặp hơn để phân loại. Đọc cả câu trước khi chọn là cách duy nhất tránh được.',
        check: 'Từ "chín" trong "suy nghĩ đã chín" mang nghĩa gì?',
        checkAnswer: 'Đã đủ độ, đã kỹ càng — nghĩa chuyển, không phải nghĩa nấu chín.',
      },
      {
        idea: 'Từ Hán Việt trang trọng hơn từ thuần Việt cùng nghĩa, và sắc thái đó là điều đề hỏi.',
        explain:
          '"Phụ nữ" và "đàn bà" cùng chỉ một đối tượng nhưng khác sắc thái. Chọn từ trong văn bản trang trọng phải theo sắc thái, không chỉ theo nghĩa gốc.',
        check: 'Trong văn bản hành chính nên dùng "hy sinh" hay "chết"?',
        checkAnswer: '"Hy sinh" — trang trọng và phù hợp sắc thái.',
      },
      {
        idea: 'Từ đồng nghĩa hiếm khi thay thế được nhau ở mọi ngữ cảnh.',
        explain:
          'Đồng nghĩa nghĩa là gần nghĩa, không phải trùng nghĩa. Mỗi từ có phạm vi kết hợp riêng, và đề khai thác đúng chỗ hai từ không thay được cho nhau.',
        check: 'Có nói "ăn cơm ngon miệng" và "ăn cơm ngon mồm" như nhau được không?',
        checkAnswer: 'Không — hai từ khác sắc thái và phạm vi sử dụng.',
      },
    ],
    examples: [
      {
        id: 'ex.voc.context',
        patternId: 'voc.context',
        title: 'Xác định nghĩa của từ trong ngữ cảnh',
        problem:
          'Trong câu "Ông là cây đại thụ của nền văn học nước nhà", từ "cây đại thụ" được dùng với nghĩa gì?',
        steps: [
          {
            do: 'Đọc nghĩa đen của cụm từ trước.',
            why: 'Nghĩa chuyển bao giờ cũng bắt nguồn từ nghĩa đen, nên hiểu nghĩa đen là có sẵn manh mối.',
            result: 'Cây to, sống lâu năm, vững chãi',
          },
          {
            do: 'Kiểm tra nghĩa đen có hợp với chủ ngữ trong câu không.',
            why: 'Chủ ngữ là "ông" — một con người, nên nghĩa đen không dùng được và chắc chắn đây là nghĩa chuyển.',
            result: 'Không hợp; phải là nghĩa chuyển',
          },
          {
            do: 'Chuyển đặc điểm của nghĩa đen sang lĩnh vực mà câu đang nói tới.',
            why: 'Ẩn dụ hoạt động bằng cách mượn đặc điểm; giữ đặc điểm và đổi lĩnh vực là ra nghĩa chuyển.',
            result: 'To lớn và lâu năm trong cây → có vị thế lớn và cống hiến lâu dài trong văn học',
          },
        ],
        answer: 'Chỉ người có vị thế lớn, uy tín và cống hiến lâu dài cho nền văn học.',
        takeaway:
          'Quy trình đọc nghĩa chuyển luôn là: hiểu nghĩa đen, thấy nghĩa đen không hợp, rồi mượn đặc điểm của nó sang lĩnh vực của câu. Không cần đoán mò.',
      },
      {
        id: 'ex.voc.pair',
        patternId: 'voc.pair',
        title: 'Chọn từ đúng sắc thái',
        problem:
          'Chọn từ thích hợp điền vào chỗ trống trong câu văn trang trọng: "Nhà trường xin gửi lời … sâu sắc tới gia đình các em học sinh." với các lựa chọn: cảm ơn, cám ơn, biết ơn, tri ân.',
        steps: [
          {
            do: 'Xác định sắc thái mà ngữ cảnh đòi hỏi.',
            why: 'Câu mở đầu bằng "Nhà trường xin gửi lời" nên đây là văn bản trang trọng, sắc thái phải tương xứng.',
            result: 'Cần từ mang sắc thái trang trọng',
          },
          {
            do: 'Loại các từ đúng nghĩa nhưng lệch sắc thái.',
            why: 'Cả bốn từ đều liên quan tới lòng biết ơn; điều phân biệt chúng là mức trang trọng và phạm vi kết hợp.',
            result: '"Cám ơn" khẩu ngữ hơn; "biết ơn" thường không đi với "gửi lời"',
          },
          {
            do: 'Kiểm tra khả năng kết hợp của các từ còn lại với cụm "gửi lời".',
            why: 'Đồng nghĩa không đồng nghĩa với thay thế được; phạm vi kết hợp mới quyết định.',
            result: '"Gửi lời tri ân" và "gửi lời cảm ơn" đều dùng được; "tri ân" trang trọng hơn',
          },
        ],
        answer: 'Chọn "tri ân" — đúng nghĩa, đúng sắc thái trang trọng và kết hợp được với "gửi lời".',
        takeaway:
          'Câu chọn từ hiếm khi có phương án sai nghĩa. Chúng sai ở sắc thái hoặc ở khả năng kết hợp, nên phải đọc cả câu chứ không chỉ nhìn từ.',
      },
    ],
    wrongTurn: {
      problem: 'Giải nghĩa từ "ăn" trong câu "Xe này ăn xăng lắm" và cho biết đó là nghĩa gì.',
      attempt: [
        '"Ăn" nghĩa là đưa thức ăn vào miệng và nuốt.',
        'Vậy câu này nói xe đưa xăng vào và nuốt.',
        'Đây là nghĩa gốc của từ "ăn".',
      ],
      brokeAtStep: 1,
      diagnosis:
        'Bước 1 lấy nghĩa quen thuộc nhất của từ mà không kiểm tra nó có hợp với chủ ngữ hay không. Chủ ngữ là "xe" — một vật vô tri, nên nghĩa gốc không thể áp dụng. Đây là lỗi phổ biến vì bộ não tự động truy xuất nghĩa hay gặp nhất, và chỉ có thao tác đối chiếu với chủ ngữ mới chặn được phản xạ đó. Đề thi luôn chọn đúng những từ có nghĩa gốc quen thuộc để dựng bẫy này.',
      fix: 'Từ bước 1: sau khi lấy nghĩa gốc, đối chiếu ngay với chủ ngữ. Xe không ăn được, nên đây là nghĩa chuyển: "ăn" ở đây nghĩa là tiêu thụ, hao tốn. Câu nói xe tiêu thụ nhiều xăng.',
    },
  },
  {
    topicId: 'qualitative.rhetoric',
    section: 'qualitative',
    minutes: 30,
    hook: 'Biện pháp tu từ và phong cách chiếm khoảng 5–6 câu phần Ngữ văn. Câu hỏi hiếm khi dừng ở "đây là biện pháp gì" mà luôn hỏi thêm "để làm gì" — nên nhớ tên biện pháp là chưa đủ, phải nói được tác dụng.',
    build: [
      {
        idea: 'So sánh có từ so sánh, ẩn dụ thì không — đó là dấu hiệu phân biệt duy nhất cần nhớ.',
        explain:
          '"Đẹp như hoa" là so sánh vì có chữ "như". "Bông hoa của lớp" là ẩn dụ vì đã gọi thẳng người là hoa. Hoán dụ thì lấy một bộ phận gọi thay cho toàn thể.',
        check: '"Áo nâu cùng với áo xanh" dùng biện pháp gì?',
        checkAnswer: 'Hoán dụ — lấy trang phục gọi thay cho tầng lớp người mặc.',
      },
      {
        idea: 'Câu hỏi luôn đi tiếp tới TÁC DỤNG, nên phải trả lời được biện pháp đó làm gì cho câu văn.',
        explain:
          'Tác dụng thường thuộc ba nhóm: làm hình ảnh cụ thể hơn, làm nhịp điệu mạnh hơn, hoặc nhấn mạnh một ý. Chọn đúng nhóm là đủ điểm.',
        check: 'Điệp ngữ thường có tác dụng gì?',
        checkAnswer: 'Nhấn mạnh ý và tạo nhịp điệu cho câu.',
      },
      {
        idea: 'Nhận diện phong cách ngôn ngữ dựa vào mục đích giao tiếp của văn bản.',
        explain:
          'Báo chí đưa tin, khoa học trình bày tri thức, hành chính điều hành công việc, nghệ thuật gợi cảm xúc. Hỏi văn bản này viết ra để làm gì là ra phong cách.',
        check: 'Văn bản có số hiệu, ngày tháng, chữ ký thuộc phong cách nào?',
        checkAnswer: 'Phong cách hành chính — công vụ.',
      },
    ],
    examples: [
      {
        id: 'ex.rhe.identify',
        patternId: 'rhe.identify',
        title: 'Gọi tên biện pháp và nêu tác dụng',
        problem:
          'Chỉ ra biện pháp tu từ và nêu tác dụng trong câu thơ: "Ngày ngày mặt trời đi qua trên lăng / Thấy một mặt trời trong lăng rất đỏ."',
        steps: [
          {
            do: 'Đối chiếu hai lần xuất hiện của cùng một hình ảnh.',
            why: 'Một từ lặp lại với hai nghĩa khác nhau là dấu hiệu của ẩn dụ, không phải điệp ngữ đơn thuần.',
            result: '"Mặt trời" thứ nhất là thiên thể thật; "mặt trời" thứ hai chỉ Bác Hồ',
          },
          {
            do: 'Kiểm tra có từ so sánh hay không để phân biệt ẩn dụ với so sánh.',
            why: 'Đây là dấu hiệu phân biệt duy nhất và tuyệt đối giữa hai biện pháp này.',
            result: 'Không có "như", "tựa", "là" — nên đây là ẩn dụ',
          },
          {
            do: 'Nêu tác dụng bằng cách hỏi ẩn dụ này mượn đặc điểm gì.',
            why: 'Tác dụng của ẩn dụ luôn nằm ở đặc điểm được mượn từ vật này sang vật kia.',
            result: 'Mượn sự vĩnh cửu và nguồn sáng của mặt trời để nói về tầm vóc của Bác',
          },
          {
            do: 'Viết câu trả lời gồm cả tên biện pháp lẫn tác dụng.',
            why: 'Câu hỏi dạng này luôn chấm cả hai vế; chỉ gọi tên biện pháp là mất một nửa số điểm.',
            result: 'Ẩn dụ, tác dụng ca ngợi và bất tử hóa hình tượng',
          },
        ],
        answer:
          'Biện pháp ẩn dụ: "mặt trời trong lăng" chỉ Bác Hồ, mượn sự vĩnh cửu và nguồn sáng của mặt trời để ca ngợi tầm vóc và sự bất tử của Người.',
        takeaway:
          'Công thức trả lời cố định: gọi tên biện pháp, chỉ ra nó nằm ở đâu, rồi nói nó mượn đặc điểm gì để làm gì. Ba vế này phủ hết mọi câu hỏi tu từ.',
      },
      {
        id: 'ex.rhe.style',
        patternId: 'rhe.style',
        title: 'Nhận diện phong cách ngôn ngữ',
        problem:
          'Một đoạn văn có các số liệu thống kê, trích dẫn nguồn, thuật ngữ chuyên môn và không dùng từ ngữ biểu cảm. Đoạn này thuộc phong cách ngôn ngữ nào?',
        steps: [
          {
            do: 'Liệt kê các đặc điểm hình thức quan sát được.',
            why: 'Phong cách được nhận diện qua đặc điểm hình thức lặp lại, chứ không qua chủ đề của văn bản.',
            result: 'Số liệu · trích nguồn · thuật ngữ · không biểu cảm',
          },
          {
            do: 'Hỏi văn bản này viết ra nhằm mục đích gì.',
            why: 'Mỗi phong cách gắn với một mục đích giao tiếp riêng, nên câu hỏi này thu hẹp nhanh nhất.',
            result: 'Trình bày tri thức một cách chính xác, khách quan',
          },
          {
            do: 'Loại các phong cách có mục đích khác.',
            why: 'Đối chiếu từng phong cách với mục đích vừa xác định thường chỉ để lại một khả năng.',
            result:
              'Không phải báo chí vì không đưa tin thời sự; không phải nghệ thuật vì không gợi cảm xúc; không phải hành chính vì không có thể thức công vụ',
          },
        ],
        answer: 'Đoạn văn thuộc phong cách ngôn ngữ khoa học.',
        takeaway:
          'Một câu hỏi duy nhất — "văn bản này viết ra để làm gì?" — giải được hầu hết câu nhận diện phong cách, nhanh hơn nhiều so với dò danh sách đặc điểm.',
      },
    ],
    wrongTurn: {
      problem: 'Chỉ ra biện pháp tu từ trong câu: "Cô ấy đẹp như một đóa hoa."',
      attempt: [
        'Câu này ví cô ấy với đóa hoa.',
        'Ví một người với một vật thì đó là ẩn dụ.',
        'Vậy biện pháp tu từ ở đây là ẩn dụ.',
      ],
      brokeAtStep: 2,
      diagnosis:
        'Bước 2 gọi tên biện pháp dựa vào việc "có ví von" mà bỏ qua dấu hiệu hình thức quyết định. So sánh và ẩn dụ đều ví vật này với vật kia; điều phân biệt chúng là sự có mặt của từ so sánh. Câu này có chữ "như" nên là so sánh. Ẩn dụ là khi từ so sánh bị lược đi và vật này được gọi thẳng bằng tên vật kia, ví dụ "Cô ấy là đóa hoa của lớp".',
      fix: 'Từ bước 2: tìm từ so sánh trước khi gọi tên. Có "như", "tựa", "giống", "bao nhiêu… bấy nhiêu" thì là so sánh; không có mà vẫn ví von thì mới là ẩn dụ.',
    },
  },
  {
    topicId: 'qualitative.logic',
    section: 'qualitative',
    minutes: 35,
    hook: 'Suy luận ngôn ngữ chiếm khoảng 6–8 câu phần Ngữ văn và là nhóm câu ít liên quan tới văn học nhất: nó kiểm tra khả năng lập luận. Đây là chuyên đề công bằng nhất với người học vì không đòi hỏi thuộc gì cả, chỉ đòi hỏi làm đúng quy trình.',
    build: [
      {
        idea: 'Một suy luận đúng phải đúng với MỌI trường hợp, nên chỉ cần một phản ví dụ là bác bỏ được.',
        explain:
          'Không cần chứng minh phương án sai là sai ở mọi mặt; chỉ cần dựng được một tình huống mà tiền đề đúng nhưng kết luận sai là đủ loại.',
        check: 'Từ "mọi A là B" có suy ra "mọi B là A" không?',
        checkAnswer: 'Không — mọi con mèo là động vật, nhưng không phải mọi động vật là mèo.',
      },
      {
        idea: 'Bài xếp thứ tự nên vẽ ra một trục và điền dần các ràng buộc chắc chắn trước.',
        explain:
          'Ràng buộc dạng "A đứng ngay trước B" cố định hơn ràng buộc dạng "A đứng trước B". Điền cái chắc chắn trước thì các khả năng còn lại thu hẹp rất nhanh.',
        check: 'Trong ba ràng buộc, nên dùng cái nào trước: "A trước B", "C ngay sau A", "D không đứng cuối"?',
        checkAnswer: '"C ngay sau A" — chặt nhất nên thu hẹp nhiều nhất.',
      },
      {
        idea: 'Điều kiện cần và điều kiện đủ không thay thế nhau được.',
        explain:
          '"Nếu P thì Q" cho biết P đủ để có Q, nhưng không cho biết Q chỉ xảy ra khi có P. Đảo ngược mệnh đề là lỗi logic phổ biến nhất trong cả chuyên đề.',
        check: 'Từ "nếu trời mưa thì đường ướt" và "đường ướt" có suy ra "trời mưa" không?',
        checkAnswer: 'Không — đường có thể ướt vì xe tưới nước.',
      },
    ],
    examples: [
      {
        id: 'ex.log.valid',
        patternId: 'log.valid',
        title: 'Kiểm tra tính đúng đắn của một suy luận',
        problem:
          'Cho hai tiền đề: "Tất cả học sinh giỏi đều chăm chỉ" và "Nam chăm chỉ". Có thể kết luận "Nam là học sinh giỏi" không? Hãy giải thích.',
        steps: [
          {
            do: 'Viết lại tiền đề dưới dạng quan hệ bao hàm giữa hai tập hợp.',
            why: 'Chuyển ngôn ngữ sang tập hợp làm hiện ra chiều của quan hệ, vốn là chỗ mọi lỗi logic phát sinh.',
            result: 'Tập học sinh giỏi nằm TRONG tập người chăm chỉ',
          },
          {
            do: 'Xác định tiền đề thứ hai đặt Nam vào tập nào.',
            why: 'Kết luận chỉ hợp lệ nếu vị trí của Nam bị xác định duy nhất bởi các tiền đề.',
            result: 'Nam thuộc tập người chăm chỉ — tập lớn hơn',
          },
          {
            do: 'Kiểm tra tập lớn có buộc phải nằm trong tập nhỏ không.',
            why: 'Quan hệ bao hàm chỉ đi một chiều; thuộc tập lớn không suy ra thuộc tập con.',
            result: 'Không — người chăm chỉ có thể không phải học sinh giỏi',
          },
          {
            do: 'Dựng một phản ví dụ cụ thể để chốt lại.',
            why: 'Một phản ví dụ là đủ và là cách nhanh nhất để bác bỏ một suy luận.',
            result: 'Nam chăm chỉ nhưng học lực trung bình — hai tiền đề vẫn đúng, kết luận sai',
          },
        ],
        answer: 'Không thể kết luận. Đây là lỗi khẳng định hệ quả — suy ngược chiều của quan hệ bao hàm.',
        takeaway:
          'Vẽ hai vòng tròn lồng nhau là cách nhanh nhất kiểm tra mọi suy luận dạng "tất cả A là B". Chiều mũi tên chỉ đi một hướng, và đề luôn hỏi theo hướng ngược lại.',
      },
      {
        id: 'ex.log.arrange',
        patternId: 'log.arrange',
        title: 'Bài xếp thứ tự có ràng buộc',
        problem:
          'Năm người A, B, C, D, E xếp thành hàng dọc. Biết: B đứng ngay sau A; C đứng đầu hàng; D đứng sau B nhưng không đứng cuối. Hãy xác định thứ tự của cả hàng.',
        steps: [
          {
            do: 'Vẽ năm ô trống và điền ràng buộc chắc chắn nhất trước.',
            why: 'Ràng buộc cố định một vị trí cụ thể thu hẹp không gian nhiều hơn mọi ràng buộc tương đối.',
            result: 'C ở vị trí 1: [C][ ][ ][ ][ ]',
          },
          {
            do: 'Điền tiếp ràng buộc dạng cặp liền kề.',
            why: 'Cặp "ngay sau" là một khối không tách rời được, nên nó chỉ có vài chỗ đặt.',
            result: 'Khối AB chỉ đặt được ở vị trí 2–3, 3–4 hoặc 4–5',
          },
          {
            do: 'Dùng ràng buộc còn lại để loại các khả năng.',
            why: 'D phải đứng sau B và không được cuối, nên B không thể ở quá sát cuối hàng.',
            result: 'Nếu AB ở 4–5 thì không còn chỗ cho D sau B; nếu AB ở 3–4 thì D phải ở 5, trái điều kiện',
          },
          {
            do: 'Chốt vị trí còn lại cho người cuối cùng.',
            why: 'Khi bốn vị trí đã xác định, người còn lại chỉ có duy nhất một chỗ.',
            result: 'AB ở 2–3, D ở 4, E ở 5',
          },
        ],
        answer: 'Thứ tự hàng là C, A, B, D, E.',
        takeaway:
          'Thứ tự dùng ràng buộc quyết định bài này mất một phút hay năm phút: vị trí cố định trước, cặp liền kề sau, ràng buộc tương đối cuối cùng.',
      },
    ],
    wrongTurn: {
      problem:
        'Tiền đề: "Nếu học sinh nghỉ học thì điểm số giảm." Biết điểm số của Lan đã giảm. Có thể kết luận gì về việc Lan nghỉ học?',
      attempt: [
        'Tiền đề nói nghỉ học dẫn tới điểm giảm.',
        'Điểm của Lan đã giảm, tức là hệ quả đã xảy ra.',
        'Vậy Lan đã nghỉ học.',
      ],
      brokeAtStep: 3,
      diagnosis:
        'Bước 3 đi ngược chiều của mệnh đề kéo theo: từ "P thì Q" và "có Q" suy ra "có P". Đây là lỗi khẳng định hệ quả. Mệnh đề gốc chỉ nói nghỉ học là MỘT nguyên nhân đủ để điểm giảm, không nói đó là nguyên nhân duy nhất — điểm có thể giảm vì đề khó hơn, vì Lan ốm, vì nhiều lý do khác. Lỗi này khó nhận ra vì trong đời sống, ta thường suy ngược như vậy và thường đúng; chỉ trong logic hình thức nó mới bị bác bỏ tuyệt đối.',
      fix: 'Từ bước 3: chiều duy nhất được phép đi là từ P sang Q, hoặc từ "không có Q" sang "không có P". Ở đây chỉ kết luận được rằng chưa xác định được Lan có nghỉ học hay không.',
    },
  },
  /* ══ KHOA HỌC — VẬT LÝ ═════════════════════════════════════════════ */
  {
    topicId: 'science.physics.mechanics',
    section: 'science',
    minutes: 40,
    hook: 'Cơ học chiếm khoảng 5 câu trong 16–17 câu của chủ đề Vật lý. Đây là nền của cả chủ đề: bảo toàn năng lượng và định luật Newton học ở đây sẽ dùng lại trong dao động, trong điện và cả trong hạt nhân.',
    build: [
      {
        idea: 'Vẽ hình và đánh dấu mọi lực trước khi viết bất kỳ phương trình nào.',
        explain:
          'Định luật Newton nói về TỔNG các lực, nên sót một lực là sai toàn bài. Hình vẽ có mũi tên là cách duy nhất kiểm soát được việc không sót.',
        check: 'Vật trượt trên mặt phẳng nghiêng có mấy lực tác dụng?',
        checkAnswer: 'Ba: trọng lực, phản lực pháp tuyến và lực ma sát.',
      },
      {
        idea: 'Bài nào hỏi vận tốc hoặc độ cao mà không hỏi thời gian thì nên dùng bảo toàn năng lượng.',
        explain:
          'Bảo toàn năng lượng bỏ qua toàn bộ quá trình ở giữa, chỉ so sánh đầu và cuối. Nó biến một bài động lực học nhiều bước thành một phương trình.',
        check: 'Vật rơi từ độ cao h, tính vận tốc chạm đất — nên dùng công cụ nào?',
        checkAnswer: 'Bảo toàn năng lượng: v = √(2gh).',
      },
      {
        idea: 'Gia tốc là đại lượng nối động học với động lực học.',
        explain:
          'Biết lực thì tính được gia tốc qua F = ma; biết gia tốc thì tính được quãng đường và vận tốc qua công thức động học. Gia tốc là bản lề giữa hai nửa của cơ học.',
        check: 'Lực 10 N tác dụng lên vật 2 kg thì gia tốc bằng bao nhiêu?',
        checkAnswer: 'a = F/m = 5 m/s².',
      },
    ],
    examples: [
      {
        id: 'ex.phy.energy',
        patternId: 'phy.energy',
        title: 'Bảo toàn năng lượng trên mặt phẳng nghiêng',
        problem:
          'Một vật khối lượng 2 kg trượt không ma sát từ đỉnh một mặt phẳng nghiêng cao 5 m. Tính vận tốc của vật ở chân dốc. Lấy g = 10 m/s².',
        steps: [
          {
            do: 'Kiểm tra điều kiện áp dụng bảo toàn cơ năng.',
            why: 'Cơ năng chỉ bảo toàn khi không có ma sát hay lực cản; đề nói rõ không ma sát nên dùng được.',
            result: 'Không ma sát ⟹ cơ năng bảo toàn',
          },
          {
            do: 'Viết cơ năng tại đỉnh và tại chân dốc.',
            why: 'Bảo toàn nghĩa là hai giá trị này bằng nhau, nên chỉ cần viết ra là có ngay phương trình.',
            result: 'Đỉnh: mgh + 0 · Chân dốc: 0 + ½mv²',
          },
          {
            do: 'Cho hai cơ năng bằng nhau và rút gọn khối lượng.',
            why: 'Khối lượng có mặt ở cả hai vế nên triệt tiêu — kết quả không phụ thuộc vật nặng hay nhẹ.',
            result: 'gh = ½v² ⟹ v = √(2gh)',
          },
          {
            do: 'Thay số vào công thức vừa rút ra.',
            why: 'Rút gọn bằng chữ trước rồi mới thay số giúp phát hiện sớm nếu công thức sai đơn vị.',
            result: 'v = √(2 × 10 × 5) = √100 = 10 m/s',
          },
        ],
        answer: 'Vận tốc của vật ở chân dốc là 10 m/s.',
        takeaway:
          'Khối lượng triệt tiêu trong mọi bài rơi và trượt không ma sát. Đề cho khối lượng chỉ để thử xem thí sinh có nhận ra nó thừa hay không.',
      },
      {
        id: 'ex.phy.newton',
        patternId: 'phy.newton',
        title: 'Định luật Newton với lực ma sát',
        problem:
          'Một vật 5 kg nằm trên mặt sàn ngang, bị kéo bởi lực 20 N theo phương ngang. Hệ số ma sát trượt giữa vật và sàn là 0,2. Tính gia tốc của vật. Lấy g = 10 m/s².',
        steps: [
          {
            do: 'Vẽ hình và liệt kê đủ bốn lực tác dụng lên vật.',
            why: 'Bỏ sót lực ma sát hoặc phản lực là lỗi làm hỏng cả bài; hình vẽ buộc phải kể hết.',
            result: 'Lực kéo F · trọng lực P · phản lực N · lực ma sát Fms',
          },
          {
            do: 'Chiếu lên phương thẳng đứng để tìm phản lực pháp tuyến.',
            why: 'Lực ma sát tỉ lệ với phản lực, nên phải có N trước khi tính được ma sát.',
            result: 'Vật không chuyển động theo phương đứng ⟹ N = P = mg = 50 N',
          },
          {
            do: 'Tính độ lớn lực ma sát trượt.',
            why: 'Ma sát trượt luôn bằng hệ số nhân phản lực, và luôn ngược chiều chuyển động.',
            result: 'Fms = 0,2 × 50 = 10 N',
          },
          {
            do: 'Chiếu lên phương ngang và áp dụng định luật II Newton.',
            why: 'Gia tốc do TỔNG lực theo phương chuyển động gây ra, không phải do riêng lực kéo.',
            result: 'a = (20 − 10)/5 = 2 m/s²',
          },
        ],
        answer: 'Vật chuyển động với gia tốc 2 m/s² theo hướng của lực kéo.',
        takeaway:
          'Đề luôn để sẵn phương án 4 m/s² cho người lấy thẳng lực kéo chia khối lượng. Bước chiếu lên phương đứng để tìm N mới là bước phân loại.',
      },
    ],
    wrongTurn: {
      problem:
        'Một vật 3 kg được kéo bởi lực 30 N trên mặt sàn có ma sát, lực ma sát 6 N. Tính gia tốc của vật.',
      attempt: [
        'Vật chịu lực kéo 30 N.',
        'Áp dụng định luật II Newton: a = F/m = 30/3 = 10 m/s².',
        'Vậy gia tốc bằng 10 m/s².',
      ],
      brokeAtStep: 2,
      diagnosis:
        'Bước 2 thay F trong công thức bằng riêng lực kéo, trong khi F trong định luật II Newton là HỢP LỰC của tất cả các lực theo phương chuyển động. Lực ma sát 6 N ngược chiều nên phải trừ đi. Lỗi này rất khó tự bắt vì công thức được viết đúng và phép chia cũng đúng — chỉ có ý nghĩa của ký hiệu F bị hiểu sai, và đề luôn cài sẵn phương án ứng với cách hiểu đó.',
      fix: 'Từ bước 2: tính hợp lực trước, F = 30 − 6 = 24 N, rồi mới chia cho khối lượng. Gia tốc đúng là 24/3 = 8 m/s². Quy tắc: F trong F = ma luôn có nghĩa là tổng vectơ các lực.',
    },
  },
  {
    topicId: 'science.physics.oscillation',
    section: 'science',
    minutes: 40,
    hook: 'Dao động và sóng chiếm khoảng 4–5 câu của chủ đề Vật lý và là nhóm câu có nhiều công thức nhất. Bù lại, gần như mọi công thức đều xoay quanh một đại lượng duy nhất là tần số góc, nên nắm được nó là nắm được cả chuyên đề.',
    build: [
      {
        idea: 'Tần số góc ω là trung tâm; chu kỳ, tần số và mọi công thức khác đều suy ra từ nó.',
        explain:
          'T = 2π/ω và f = ω/2π. Với con lắc lò xo ω = √(k/m), với con lắc đơn ω = √(g/ℓ). Nhớ ω là suy ra được toàn bộ phần còn lại.',
        check: 'Con lắc lò xo có k = 100 N/m, m = 1 kg thì ω bằng bao nhiêu?',
        checkAnswer: 'ω = √(100/1) = 10 rad/s.',
      },
      {
        idea: 'Chu kỳ con lắc đơn không phụ thuộc khối lượng, chỉ phụ thuộc chiều dài và gia tốc trọng trường.',
        explain:
          'Đây là kết quả phản trực giác nhất của chuyên đề và vì thế được hỏi nhiều nhất. Khối lượng có mặt ở cả lực kéo về lẫn quán tính nên triệt tiêu.',
        check: 'Treo thêm vật nặng gấp đôi vào con lắc đơn thì chu kỳ đổi thế nào?',
        checkAnswer: 'Không đổi.',
      },
      {
        idea: 'Trong dao động điều hòa, động năng và thế năng đổi chỗ cho nhau nhưng tổng luôn không đổi.',
        explain:
          'Ở vị trí biên thế năng cực đại còn động năng bằng 0; ở vị trí cân bằng thì ngược lại. Cơ năng bằng đúng giá trị cực đại của một trong hai.',
        check: 'Ở vị trí cân bằng, vận tốc của vật dao động điều hòa như thế nào?',
        checkAnswer: 'Cực đại, bằng ωA.',
      },
    ],
    examples: [
      {
        id: 'ex.osc.period',
        patternId: 'osc.period',
        title: 'Chu kỳ con lắc lò xo và ảnh hưởng của khối lượng',
        problem:
          'Con lắc lò xo có độ cứng k = 40 N/m gắn vật nặng m = 0,1 kg. Tính chu kỳ dao động, và cho biết chu kỳ đổi thế nào nếu thay bằng vật nặng gấp bốn lần.',
        steps: [
          {
            do: 'Tính tần số góc từ độ cứng và khối lượng.',
            why: 'ω là đại lượng gốc; có ω thì mọi đại lượng khác chỉ còn là phép thay số.',
            result: 'ω = √(k/m) = √(40/0,1) = √400 = 20 rad/s',
          },
          {
            do: 'Đổi tần số góc sang chu kỳ.',
            why: 'Chu kỳ là thời gian một dao động toàn phần, liên hệ với ω qua T = 2π/ω.',
            result: 'T = 2π/20 ≈ 0,314 s',
          },
          {
            do: 'Xét quan hệ giữa chu kỳ và khối lượng để trả lời phần hai.',
            why: 'T tỉ lệ với căn bậc hai của m, nên tăng m gấp 4 chỉ làm T tăng gấp 2 chứ không phải gấp 4.',
            result: 'T tỉ lệ với √m ⟹ m tăng 4 lần thì T tăng 2 lần',
          },
        ],
        answer: 'Chu kỳ ban đầu khoảng 0,314 s; với vật nặng gấp bốn lần, chu kỳ tăng gấp đôi thành khoảng 0,628 s.',
        takeaway:
          'Mọi câu hỏi "đại lượng này tăng gấp n lần thì kia đổi thế nào" đều giải bằng cách đọc số mũ trong công thức, không cần tính lại từ đầu.',
      },
      {
        id: 'ex.osc.energy',
        patternId: 'osc.energy',
        title: 'Năng lượng trong dao động điều hòa',
        problem:
          'Một vật dao động điều hòa với biên độ A = 5 cm và tần số góc ω = 10 rad/s, khối lượng 0,2 kg. Tính vận tốc của vật khi nó ở vị trí có li độ x = 3 cm.',
        steps: [
          {
            do: 'Viết cơ năng của dao động theo biên độ.',
            why: 'Cơ năng là hằng số của cả dao động, nên nó là chiếc neo để so sánh mọi vị trí với nhau.',
            result: 'W = ½mω²A²',
          },
          {
            do: 'Viết cơ năng tại vị trí có li độ x, gồm cả động năng và thế năng.',
            why: 'Tại một vị trí bất kỳ, năng lượng chia thành hai phần, và tổng vẫn bằng cơ năng.',
            result: '½mv² + ½mω²x² = ½mω²A²',
          },
          {
            do: 'Rút gọn khối lượng và giải ra vận tốc.',
            why: 'Khối lượng có ở mọi số hạng nên triệt tiêu — vận tốc không phụ thuộc vật nặng nhẹ.',
            result: 'v = ω√(A² − x²)',
          },
          {
            do: 'Thay số với đơn vị thống nhất.',
            why: 'Biên độ và li độ đang tính bằng xentimét nên kết quả cũng ra xentimét trên giây.',
            result: 'v = 10 × √(25 − 9) = 10 × 4 = 40 cm/s',
          },
        ],
        answer: 'Vận tốc của vật tại li độ 3 cm là 40 cm/s.',
        takeaway:
          'Công thức v = ω√(A² − x²) không cần học thuộc: nó rơi ra từ bảo toàn năng lượng trong hai dòng. Dựng lại được thì không bao giờ nhớ nhầm dấu.',
      },
    ],
    wrongTurn: {
      problem:
        'Con lắc đơn dài 1 m dao động với chu kỳ T. Nếu thay quả nặng bằng quả nặng có khối lượng gấp đôi thì chu kỳ mới bằng bao nhiêu?',
      attempt: [
        'Chu kỳ dao động phụ thuộc khối lượng của vật nặng.',
        'Khối lượng tăng gấp đôi nên vật dao động chậm hơn.',
        'Chu kỳ mới bằng √2 lần chu kỳ cũ.',
      ],
      brokeAtStep: 1,
      diagnosis:
        'Bước 1 giả định chu kỳ con lắc ĐƠN phụ thuộc khối lượng, có lẽ do nhớ nhầm sang công thức con lắc lò xo T = 2π√(m/k), nơi khối lượng thật sự có mặt. Với con lắc đơn thì T = 2π√(ℓ/g) — hoàn toàn không có m. Lý do vật lý: khối lượng vừa làm tăng lực kéo về vừa làm tăng quán tính, hai tác dụng triệt tiêu nhau chính xác. Đây là kết quả phản trực giác nên nó được hỏi rất nhiều.',
      fix: 'Từ bước 1: nhớ đúng công thức T = 2π√(ℓ/g) cho con lắc đơn. Chu kỳ không đổi khi thay quả nặng. Cách phân biệt hai công thức: lò xo có k nên phải có m đi kèm; con lắc đơn có g nên đi kèm chiều dài ℓ.',
    },
  },
  {
    topicId: 'science.physics.electricity',
    section: 'science',
    minutes: 40,
    hook: 'Điện và từ chiếm khoảng 4–5 câu của chủ đề Vật lý. Phần lớn là bài mạch điện, và mạch điện là dạng bài có quy trình rõ ràng nhất trong cả chủ đề: rút gọn mạch, tính dòng tổng, rồi lần ngược ra từng nhánh.',
    build: [
      {
        idea: 'Mạch nối tiếp có cùng dòng điện; mạch song song có cùng hiệu điện thế.',
        explain:
          'Đây là hai câu duy nhất cần nhớ để phân tích mọi mạch. Xác định sai kiểu mắc là sai từ dòng đầu tiên và không có cách nào sửa ở các bước sau.',
        check: 'Hai điện trở mắc song song thì đại lượng nào bằng nhau?',
        checkAnswer: 'Hiệu điện thế trên hai điện trở bằng nhau.',
      },
      {
        idea: 'Điện trở tương đương của mạch song song luôn NHỎ HƠN điện trở nhỏ nhất trong mạch.',
        explain:
          'Thêm một đường cho dòng đi qua thì tổng trở giảm. Quy tắc này là phép tự kiểm tra nhanh: ra kết quả lớn hơn là chắc chắn sai.',
        check: 'Hai điện trở 6 Ω và 3 Ω mắc song song cho điện trở tương đương bao nhiêu?',
        checkAnswer: '2 Ω — nhỏ hơn cả 3 Ω.',
      },
      {
        idea: 'Công suất có ba công thức tương đương, chọn công thức nào là tùy dữ kiện đề cho.',
        explain:
          'P = UI = I²R = U²/R. Chọn đúng công thức tiết kiệm được một bước trung gian, và tránh được sai số làm tròn tích lũy.',
        check: 'Biết I và R, nên dùng công thức công suất nào?',
        checkAnswer: 'P = I²R — dùng thẳng dữ kiện đã có.',
      },
    ],
    examples: [
      {
        id: 'ex.ele.circuit',
        patternId: 'ele.circuit',
        title: 'Phân tích mạch hỗn hợp',
        problem:
          'Cho mạch điện: R₁ = 4 Ω mắc nối tiếp với cụm gồm R₂ = 6 Ω song song R₃ = 3 Ω. Hiệu điện thế nguồn U = 12 V. Tính cường độ dòng điện qua R₂.',
        steps: [
          {
            do: 'Rút gọn cụm song song trước.',
            why: 'Phải quy mạch về dạng đơn giản nhất mới tính được dòng tổng, và cụm song song là phần rút gọn được ngay.',
            result: 'R₂₃ = (6 × 3)/(6 + 3) = 2 Ω, nhỏ hơn cả 3 Ω nên hợp lý',
          },
          {
            do: 'Tính điện trở tương đương của cả mạch.',
            why: 'R₁ nối tiếp với cụm vừa rút gọn nên cộng thẳng hai giá trị.',
            result: 'R = 4 + 2 = 6 Ω',
          },
          {
            do: 'Tính dòng điện tổng chạy qua mạch chính.',
            why: 'Định luật Ôm cho cả mạch cho dòng tổng, và dòng này cũng chính là dòng qua R₁ vì nó nối tiếp.',
            result: 'I = U/R = 12/6 = 2 A',
          },
          {
            do: 'Tìm hiệu điện thế trên cụm song song rồi suy ra dòng qua R₂.',
            why: 'Hai nhánh song song có cùng hiệu điện thế, nên biết U của cụm là tính được dòng từng nhánh.',
            result: 'U₂₃ = I × R₂₃ = 2 × 2 = 4 V ⟹ I₂ = 4/6 ≈ 0,67 A',
          },
        ],
        answer: 'Cường độ dòng điện qua R₂ khoảng 0,67 A.',
        takeaway:
          'Quy trình cố định cho mọi mạch hỗn hợp: rút gọn từ trong ra ngoài, tính dòng tổng, rồi lần ngược từ ngoài vào trong. Không bao giờ tính nhánh trước khi có dòng tổng.',
      },
      {
        id: 'ex.ele.power',
        patternId: 'ele.power',
        title: 'Chọn công thức công suất theo dữ kiện',
        problem:
          'Một bóng đèn ghi 220 V – 100 W được mắc vào nguồn 110 V. Tính công suất thực tế của đèn, coi điện trở của đèn không đổi.',
        steps: [
          {
            do: 'Tính điện trở của đèn từ thông số định mức.',
            why: 'Thông số ghi trên đèn là cặp hiệu điện thế và công suất ở chế độ định mức, từ đó suy ra điện trở.',
            result: 'R = U²/P = 220²/100 = 484 Ω',
          },
          {
            do: 'Nhận ra điện trở không đổi khi đổi nguồn.',
            why: 'Đề nói rõ điều này; nếu không có giả thiết đó thì bài không giải được vì điện trở đèn phụ thuộc nhiệt độ.',
            result: 'R vẫn là 484 Ω ở nguồn 110 V',
          },
          {
            do: 'Chọn công thức công suất khớp với dữ kiện đang có.',
            why: 'Đã có U mới và R nên P = U²/R dùng thẳng được, không cần tính dòng trung gian.',
            result: 'P = 110²/484 = 12100/484 = 25 W',
          },
        ],
        answer: 'Công suất thực tế của đèn là 25 W, tức chỉ bằng một phần tư công suất định mức.',
        takeaway:
          'Hiệu điện thế giảm một nửa làm công suất giảm bốn lần, vì công suất tỉ lệ với bình phương hiệu điện thế. Đề luôn để sẵn phương án 50 W cho người nghĩ theo tỉ lệ thuận.',
      },
    ],
    wrongTurn: {
      problem: 'Tính điện trở tương đương của hai điện trở R₁ = 6 Ω và R₂ = 3 Ω mắc song song.',
      attempt: [
        'Công thức mạch song song: 1/R = 1/R₁ + 1/R₂.',
        'Thay số: 1/R = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2.',
        'Vậy R = 1/2 = 0,5 Ω.',
      ],
      brokeAtStep: 3,
      diagnosis:
        'Bước 3 lấy luôn giá trị vừa tính làm điện trở, quên rằng vế trái là 1/R chứ không phải R. Phải nghịch đảo một lần nữa mới ra R = 2 Ω. Lỗi này xuất hiện nhiều vì hai bước đầu hoàn toàn đúng và con số 1/2 trông đã như một đáp án hoàn chỉnh. Điều đáng nói là nó tự phát hiện được: 0,5 Ω nhỏ hơn cả hai điện trở thành phần rất nhiều, trong khi quy tắc nói kết quả phải nằm giữa 0 và giá trị nhỏ nhất — ở đây là gần 3 Ω hơn.',
      fix: 'Từ bước 3: nghịch đảo kết quả, R = 2 Ω. Với đúng hai điện trở song song, dùng thẳng R = R₁R₂/(R₁+R₂) = 18/9 = 2 Ω để bỏ hẳn bước dễ quên này.',
    },
  },
  {
    topicId: 'science.physics.modern',
    section: 'science',
    minutes: 35,
    hook: 'Lượng tử và hạt nhân chiếm khoảng 3 câu của chủ đề Vật lý, phần lớn ở mức nhận biết và thông hiểu. Đây là chuyên đề ít công thức nhất trong chủ đề, nên nó là chỗ gỡ điểm tốt nếu nắm chắc vài quan hệ cơ bản.',
    build: [
      {
        idea: 'Năng lượng photon tỉ lệ NGHỊCH với bước sóng.',
        explain:
          'ε = hc/λ. Ánh sáng tím bước sóng ngắn nên năng lượng lớn; ánh sáng đỏ bước sóng dài nên năng lượng nhỏ. Nhầm chiều quan hệ này làm sai gần hết câu quang lượng tử.',
        check: 'Ánh sáng nào mang năng lượng photon lớn hơn: đỏ hay tím?',
        checkAnswer: 'Tím — bước sóng ngắn hơn nên năng lượng lớn hơn.',
      },
      {
        idea: 'Hiện tượng quang điện chỉ xảy ra khi bước sóng nhỏ hơn giới hạn quang điện.',
        explain:
          'Tăng cường độ sáng không giúp gì nếu bước sóng quá dài — mỗi photon vẫn không đủ năng lượng bứt electron. Đây là điểm khác biệt căn bản với vật lý cổ điển.',
        check: 'Chiếu ánh sáng có λ lớn hơn λ₀ với cường độ rất mạnh thì có quang điện không?',
        checkAnswer: 'Không — cường độ không thay thế được năng lượng từng photon.',
      },
      {
        idea: 'Trong phản ứng hạt nhân, số khối A và điện tích Z đều được bảo toàn.',
        explain:
          'Hai định luật bảo toàn này đủ để xác định hạt còn thiếu trong mọi phương trình phản ứng, mà không cần nhớ tên phản ứng.',
        check: 'Phản ứng phóng xạ alpha làm số khối thay đổi thế nào?',
        checkAnswer: 'Giảm 4 đơn vị, và điện tích giảm 2.',
      },
    ],
    examples: [
      {
        id: 'ex.mod.nuclear',
        patternId: 'mod.nuclear',
        title: 'Xác định hạt thiếu trong phản ứng hạt nhân',
        problem:
          'Trong phản ứng hạt nhân: ²³⁸U₉₂ → ²³⁴Th₉₀ + X. Hãy xác định hạt X và cho biết đây là loại phóng xạ nào.',
        steps: [
          {
            do: 'Áp dụng bảo toàn số khối A cho hai vế.',
            why: 'Tổng số nuclôn không đổi qua phản ứng, nên số khối của X suy ra bằng một phép trừ.',
            result: 'A(X) = 238 − 234 = 4',
          },
          {
            do: 'Áp dụng bảo toàn điện tích Z.',
            why: 'Tổng điện tích cũng bảo toàn, và hai định luật này đủ để nhận diện hạt.',
            result: 'Z(X) = 92 − 90 = 2',
          },
          {
            do: 'Đối chiếu cặp (A, Z) vừa tìm với các hạt đã biết.',
            why: 'Mỗi cặp số khối và điện tích ứng với đúng một loại hạt, nên bước này cho kết quả duy nhất.',
            result: '(4; 2) chính là hạt nhân heli, tức hạt alpha',
          },
          {
            do: 'Gọi tên loại phóng xạ theo hạt phát ra.',
            why: 'Tên phóng xạ được đặt theo hạt được phát ra, nên nhận ra hạt là biết luôn tên.',
            result: 'Phóng xạ alpha',
          },
        ],
        answer: 'X là hạt alpha (⁴He₂), và đây là phóng xạ alpha.',
        takeaway:
          'Không cần thuộc bảng các loại phóng xạ: hai định luật bảo toàn A và Z tự dẫn ra hạt thiếu trong mọi phản ứng, kể cả phản ứng chưa từng gặp.',
      },
      {
        id: 'ex.mod.photon',
        patternId: 'mod.photon',
        title: 'Điều kiện xảy ra hiện tượng quang điện',
        problem:
          'Một kim loại có giới hạn quang điện λ₀ = 0,5 μm. Chiếu vào nó lần lượt hai chùm sáng: chùm A có bước sóng 0,4 μm cường độ yếu, chùm B có bước sóng 0,6 μm cường độ rất mạnh. Chùm nào gây ra hiện tượng quang điện?',
        steps: [
          {
            do: 'Nhắc lại điều kiện xảy ra quang điện.',
            why: 'Điều kiện chỉ liên quan tới bước sóng, không liên quan tới cường độ — đây là điểm cả bài xoay quanh.',
            result: 'Quang điện xảy ra khi λ ≤ λ₀',
          },
          {
            do: 'So sánh bước sóng của từng chùm với giới hạn quang điện.',
            why: 'Mỗi chùm được xét độc lập, và chỉ một phép so sánh là đủ kết luận.',
            result: 'Chùm A: 0,4 < 0,5 ⟹ thỏa · Chùm B: 0,6 > 0,5 ⟹ không thỏa',
          },
          {
            do: 'Giải thích vì sao cường độ mạnh của chùm B không cứu được.',
            why: 'Cường độ chỉ làm tăng SỐ photon, không làm tăng năng lượng của từng photon.',
            result: 'Mỗi photon của B vẫn không đủ năng lượng bứt electron, dù có rất nhiều photon',
          },
        ],
        answer:
          'Chỉ chùm A gây ra hiện tượng quang điện, dù cường độ của nó yếu hơn chùm B rất nhiều.',
        takeaway:
          'Quang điện là hiện tượng "một photon đối một electron", nên nó phụ thuộc chất lượng từng photon chứ không phụ thuộc số lượng. Đây chính là điều vật lý cổ điển không giải thích được.',
      },
    ],
    wrongTurn: {
      problem:
        'So sánh năng lượng photon của ánh sáng đỏ (λ ≈ 0,7 μm) và ánh sáng tím (λ ≈ 0,4 μm).',
      attempt: [
        'Năng lượng photon tính theo công thức ε = hc/λ.',
        'Ánh sáng đỏ có bước sóng lớn hơn.',
        'Bước sóng lớn hơn thì năng lượng lớn hơn, nên photon ánh sáng đỏ mang năng lượng lớn hơn.',
      ],
      brokeAtStep: 3,
      diagnosis:
        'Bước 3 đọc quan hệ trong công thức thành tỉ lệ thuận, trong khi λ nằm ở MẪU SỐ nên quan hệ là tỉ lệ nghịch. Bước sóng càng lớn thì năng lượng càng nhỏ. Lỗi này gần như luôn xuất phát từ việc nhớ công thức mà không đọc vị trí của từng đại lượng trong đó, và nó kéo theo hàng loạt kết luận sai về quang điện — vì tia tử ngoại bước sóng ngắn mới là tia gây quang điện mạnh, không phải tia hồng ngoại.',
      fix: 'Từ bước 3: đại lượng ở mẫu số thì tỉ lệ nghịch. Photon ánh sáng tím mang năng lượng lớn hơn. Cách nhớ bằng hiện tượng: tia tử ngoại làm cháy da còn ánh sáng đỏ thì không — năng lượng nằm ở phía bước sóng ngắn.',
    },
  },
  /* ══ KHOA HỌC — HÓA HỌC ════════════════════════════════════════════ */
  {
    topicId: 'science.chemistry.general',
    section: 'science',
    minutes: 40,
    hook: 'Hóa đại cương chiếm khoảng 5 câu của chủ đề Hóa học và là nền của hai chuyên đề còn lại: mol, nồng độ và cân bằng phản ứng học ở đây sẽ dùng lại trong mọi bài vô cơ và hữu cơ. Bỏ qua chuyên đề này là kéo theo cả chủ đề.',
    build: [
      {
        idea: 'Mol là đơn vị duy nhất nói chuyện được với phương trình hóa học.',
        explain:
          'Hệ số cân bằng là tỉ lệ MOL, không phải tỉ lệ khối lượng hay thể tích. Vì vậy mọi bài tính đều phải đi qua mol, kể cả khi đề cho và hỏi bằng gam.',
        check: 'Đề cho 5,6 g Fe. Việc đầu tiên phải làm là gì?',
        checkAnswer: 'Đổi ra mol: n = 5,6/56 = 0,1 mol.',
      },
      {
        idea: 'Ba công thức tính mol phủ hết mọi cách đề có thể cho dữ kiện.',
        explain:
          'n = m/M cho chất rắn, n = V/22,4 cho khí ở điều kiện tiêu chuẩn, n = C·V cho dung dịch. Đọc ra đề đang cho kiểu nào là chọn được ngay công thức.',
        check: 'Đề cho 200 ml dung dịch HCl 0,5 M thì số mol HCl bằng bao nhiêu?',
        checkAnswer: 'n = 0,5 × 0,2 = 0,1 mol.',
      },
      {
        idea: 'Khi đề cho lượng của cả hai chất tham gia, phải xác định chất nào hết trước.',
        explain:
          'Chất hết trước quyết định lượng sản phẩm; chất dư không đóng góp gì. Bỏ qua bước này là lỗi làm sai nhiều bài nhất của chuyên đề.',
        check: 'Cách nhanh nhất tìm chất hết trước là gì?',
        checkAnswer: 'Chia số mol mỗi chất cho hệ số của nó; thương nhỏ nhất là chất hết trước.',
      },
    ],
    examples: [
      {
        id: 'ex.che.mole',
        patternId: 'che.mole',
        title: 'Tính theo phương trình khi cả hai chất đều có lượng cho trước',
        problem:
          'Cho 5,6 g Fe tác dụng với 200 ml dung dịch HCl 1M. Tính thể tích khí H₂ thu được ở điều kiện tiêu chuẩn. Biết Fe = 56.',
        steps: [
          {
            do: 'Viết và cân bằng phương trình phản ứng.',
            why: 'Hệ số cân bằng chính là tỉ lệ mol; không có phương trình đúng thì mọi phép tính sau đều vô nghĩa.',
            result: 'Fe + 2HCl → FeCl₂ + H₂',
          },
          {
            do: 'Đổi cả hai dữ kiện ra mol.',
            why: 'Một chất cho bằng gam, một chất cho bằng dung dịch — phải quy về cùng đơn vị mol mới so sánh được.',
            result: 'n(Fe) = 5,6/56 = 0,1 mol · n(HCl) = 1 × 0,2 = 0,2 mol',
          },
          {
            do: 'Chia số mol mỗi chất cho hệ số của nó để tìm chất hết trước.',
            why: 'Thương nhỏ nhất chỉ ra chất bị tiêu thụ hết đầu tiên, và chính nó quyết định lượng sản phẩm.',
            result: 'Fe: 0,1/1 = 0,1 · HCl: 0,2/2 = 0,1 ⟹ hai chất vừa đủ, không dư chất nào',
          },
          {
            do: 'Tính mol H₂ theo tỉ lệ rồi đổi ra thể tích.',
            why: 'Tỉ lệ Fe : H₂ là 1 : 1, và khí ở điều kiện tiêu chuẩn quy đổi qua 22,4 lít mỗi mol.',
            result: 'n(H₂) = 0,1 mol ⟹ V = 0,1 × 22,4 = 2,24 lít',
          },
        ],
        answer: 'Thể tích khí H₂ thu được là 2,24 lít ở điều kiện tiêu chuẩn.',
        takeaway:
          'Bước chia cho hệ số phải làm ngay cả khi kết quả là "vừa đủ". Bỏ bước đó nghĩa là may mắn chứ không phải giải đúng, và lần sau đề sẽ cho dư một chất.',
      },
      {
        id: 'ex.che.solution',
        patternId: 'che.solution',
        title: 'Pha loãng và trộn dung dịch',
        problem:
          'Trộn 100 ml dung dịch NaOH 2M với 300 ml dung dịch NaOH 1M. Tính nồng độ mol của dung dịch thu được, coi thể tích cộng được.',
        steps: [
          {
            do: 'Tính số mol chất tan trong từng dung dịch.',
            why: 'Số mol là đại lượng cộng được khi trộn, còn nồng độ thì không — đây là bước làm bài toán giải được.',
            result: 'n₁ = 2 × 0,1 = 0,2 mol · n₂ = 1 × 0,3 = 0,3 mol',
          },
          {
            do: 'Cộng số mol và cộng thể tích.',
            why: 'Cả hai đại lượng này đều mang tính cộng dồn, khác hẳn với nồng độ vốn là một tỉ số.',
            result: 'n = 0,5 mol · V = 0,4 lít',
          },
          {
            do: 'Chia mol tổng cho thể tích tổng.',
            why: 'Nồng độ mol theo định nghĩa là số mol chất tan trên một lít dung dịch.',
            result: 'C = 0,5/0,4 = 1,25 M',
          },
          {
            do: 'Kiểm tra kết quả có nằm giữa hai nồng độ ban đầu không.',
            why: 'Trộn hai dung dịch luôn cho nồng độ nằm giữa; ra ngoài khoảng đó là chắc chắn sai.',
            result: '1 < 1,25 < 2 ⟹ hợp lý',
          },
        ],
        answer: 'Dung dịch thu được có nồng độ 1,25 M.',
        takeaway:
          'Lấy trung bình cộng hai nồng độ cho 1,5 M — sai vì hai dung dịch có thể tích khác nhau. Nồng độ chỉ trung bình được khi thể tích bằng nhau.',
      },
    ],
    wrongTurn: {
      problem:
        'Cho 0,2 mol Zn tác dụng với 0,2 mol HCl theo phản ứng Zn + 2HCl → ZnCl₂ + H₂. Tính số mol H₂ thu được.',
      attempt: [
        'Hai chất có số mol bằng nhau, đều là 0,2 mol.',
        'Vậy chúng phản ứng vừa đủ với nhau.',
        'Tỉ lệ Zn : H₂ là 1 : 1 nên n(H₂) = 0,2 mol.',
      ],
      brokeAtStep: 2,
      diagnosis:
        'Bước 2 kết luận "vừa đủ" chỉ vì hai số mol bằng nhau, mà bỏ qua hệ số cân bằng. Phương trình cần 2 mol HCl cho mỗi mol Zn, nên 0,2 mol Zn đòi hỏi tới 0,4 mol HCl — chỉ có 0,2 mol nên HCl hết trước và Zn còn dư một nửa. Lỗi này rất phổ biến vì hai con số bằng nhau tạo cảm giác cân đối, trong khi cái quyết định là tỉ lệ với hệ số chứ không phải giá trị tuyệt đối.',
      fix: 'Từ bước 2: chia mỗi số mol cho hệ số của nó. Zn: 0,2/1 = 0,2; HCl: 0,2/2 = 0,1. HCl có thương nhỏ hơn nên hết trước, và n(H₂) = 0,2/2 = 0,1 mol.',
    },
  },
  {
    topicId: 'science.chemistry.inorganic',
    section: 'science',
    minutes: 35,
    hook: 'Hóa vô cơ chiếm khoảng 5–6 câu của chủ đề Hóa học, phần lớn ở mức nhận biết và thông hiểu. Đây là chuyên đề nặng về thuộc lòng nhất, nhưng lượng phải thuộc thì có giới hạn rõ ràng: dãy hoạt động kim loại cộng vài quy tắc phản ứng.',
    build: [
      {
        idea: 'Dãy hoạt động hóa học quyết định kim loại nào phản ứng được với gì.',
        explain:
          'Chỉ kim loại đứng trước H mới đẩy được H₂ khỏi axit loãng; kim loại mạnh hơn đẩy được kim loại yếu hơn ra khỏi muối. Một dãy giải được phần lớn câu vô cơ.',
        check: 'Cu có phản ứng với dung dịch HCl loãng không?',
        checkAnswer: 'Không — Cu đứng sau H trong dãy hoạt động.',
      },
      {
        idea: 'Oxit chia thành bốn nhóm và mỗi nhóm có một bộ phản ứng riêng.',
        explain:
          'Oxit bazơ tác dụng axit, oxit axit tác dụng bazơ, oxit lưỡng tính tác dụng cả hai, oxit trung tính không tác dụng với cả hai. Phân loại đúng là biết ngay phản ứng nào xảy ra.',
        check: 'Al₂O₃ thuộc loại oxit nào?',
        checkAnswer: 'Oxit lưỡng tính — tác dụng được cả với axit và bazơ mạnh.',
      },
      {
        idea: 'Nhận biết chất dựa vào dấu hiệu quan sát được, không dựa vào phản ứng có xảy ra hay không.',
        explain:
          'Thuốc thử tốt phải cho hiện tượng nhìn thấy: kết tủa, đổi màu, sủi khí. Phản ứng không có dấu hiệu thì vô dụng cho việc nhận biết dù nó vẫn xảy ra.',
        check: 'Thuốc thử nào nhận biết được ion sunfat trong dung dịch?',
        checkAnswer: 'Dung dịch BaCl₂ — cho kết tủa trắng BaSO₄ không tan trong axit.',
      },
    ],
    examples: [
      {
        id: 'ex.ino.metal',
        patternId: 'ino.metal',
        title: 'Dự đoán phản ứng dựa vào dãy hoạt động',
        problem:
          'Cho các kim loại Mg, Cu, Zn, Ag. Kim loại nào tác dụng được với dung dịch HCl loãng, và kim loại nào đẩy được Cu ra khỏi dung dịch CuSO₄?',
        steps: [
          {
            do: 'Viết lại vị trí bốn kim loại trong dãy hoạt động.',
            why: 'Toàn bộ câu trả lời nằm trong thứ tự này, nên viết ra là đã giải được nửa bài.',
            result: 'Mg … Zn … (H) … Cu … Ag',
          },
          {
            do: 'Áp dụng quy tắc với axit: chỉ kim loại trước H mới đẩy được H₂.',
            why: 'Kim loại sau H yếu hơn hiđro nên không khử được ion H⁺ thành khí.',
            result: 'Mg và Zn tác dụng được với HCl loãng; Cu và Ag thì không',
          },
          {
            do: 'Áp dụng quy tắc với muối: kim loại mạnh hơn đẩy kim loại yếu hơn.',
            why: 'Phản ứng chỉ xảy ra theo chiều kim loại mạnh chiếm chỗ kim loại yếu trong muối.',
            result: 'Mg và Zn đứng trước Cu nên đẩy được Cu; Ag đứng sau nên không',
          },
        ],
        answer:
          'Mg và Zn tác dụng được với HCl loãng và cũng là hai kim loại đẩy được Cu ra khỏi dung dịch CuSO₄. Cu và Ag không làm được cả hai việc.',
        takeaway:
          'Một dãy hoạt động trả lời được cả hai loại câu hỏi. Mốc H chia dãy làm hai nửa cho câu axit, còn vị trí tương đối giữa hai kim loại giải quyết câu muối.',
      },
      {
        id: 'ex.ino.identify',
        patternId: 'ino.identify',
        title: 'Chọn thuốc thử nhận biết',
        problem:
          'Có ba dung dịch không màu đựng riêng biệt: NaCl, Na₂SO₄ và NaOH. Hãy nêu cách nhận biết ba dung dịch chỉ bằng hai thuốc thử.',
        steps: [
          {
            do: 'Tìm chất có tính chất khác hẳn hai chất còn lại.',
            why: 'Tách được một chất ra trước sẽ giảm bài toán từ ba xuống hai, đơn giản hơn nhiều.',
            result: 'NaOH là bazơ, hai chất kia là muối trung tính',
          },
          {
            do: 'Dùng quỳ tím để tách NaOH ra.',
            why: 'Quỳ tím cho dấu hiệu quan sát được ngay và chỉ NaOH làm nó hóa xanh.',
            result: 'Quỳ hóa xanh ⟹ NaOH; hai mẫu còn lại quỳ không đổi màu',
          },
          {
            do: 'Chọn thuốc thử phân biệt hai muối còn lại dựa vào gốc axit.',
            why: 'Hai muối cùng cation Na⁺ nên chỉ có thể phân biệt qua anion Cl⁻ và SO₄²⁻.',
            result: 'Dùng BaCl₂: chỉ Na₂SO₄ cho kết tủa trắng BaSO₄',
          },
          {
            do: 'Chốt lại quy trình theo thứ tự thực hiện.',
            why: 'Câu trả lời của dạng bài này là một quy trình, nên phải trình bày theo đúng trình tự làm.',
            result: 'Quỳ tím trước, BaCl₂ sau',
          },
        ],
        answer:
          'Dùng quỳ tím nhận ra NaOH (hóa xanh); hai mẫu còn lại thử với BaCl₂, mẫu cho kết tủa trắng là Na₂SO₄, mẫu không hiện tượng là NaCl.',
        takeaway:
          'Bài nhận biết luôn giải theo chiến lược chia đôi: tìm tính chất tách được nhiều mẫu nhất trước, rồi mới đi vào chi tiết. Thử ngẫu nhiên từng cặp là cách tốn thuốc thử nhất.',
      },
    ],
    wrongTurn: {
      problem: 'Cho Cu vào dung dịch HCl loãng. Viết phương trình phản ứng xảy ra.',
      attempt: [
        'Cu là kim loại, HCl là axit.',
        'Kim loại tác dụng với axit tạo muối và giải phóng khí hiđro.',
        'Phương trình: Cu + 2HCl → CuCl₂ + H₂↑.',
      ],
      brokeAtStep: 2,
      diagnosis:
        'Bước 2 áp dụng quy tắc "kim loại tác dụng với axit" như một quy tắc phổ quát, trong khi nó chỉ đúng với kim loại đứng TRƯỚC hiđro trong dãy hoạt động. Cu đứng sau H nên không khử được ion H⁺, và phản ứng không xảy ra. Lời giải sai này trông rất chuẩn về hình thức — phương trình cân bằng đúng, sản phẩm hợp lý — nên nó chỉ bị phát hiện nếu người làm có thói quen kiểm tra vị trí kim loại trước khi viết phương trình.',
      fix: 'Từ bước 2: kiểm tra vị trí kim loại so với H trước. Cu đứng sau H nên không có phản ứng. Cu chỉ tan trong axit có tính oxi hóa mạnh như HNO₃ hoặc H₂SO₄ đặc nóng, và khi đó sản phẩm khí không phải H₂.',
    },
  },
  {
    topicId: 'science.chemistry.organic',
    section: 'science',
    minutes: 40,
    hook: 'Hóa hữu cơ chiếm khoảng 6 câu của chủ đề Hóa học, nhiều nhất trong ba chuyên đề. Điểm mấu chốt: hóa hữu cơ không phải học thuộc từng chất mà học theo NHÓM CHỨC — nhận ra nhóm chức là biết ngay chất đó phản ứng với gì.',
    build: [
      {
        idea: 'Nhóm chức quyết định tính chất hóa học, mạch cacbon chỉ quyết định tính chất vật lý.',
        explain:
          'Mọi ancol đều tác dụng với Na, mọi axit cacboxylic đều làm quỳ hóa đỏ, bất kể mạch dài ngắn. Nhận ra nhóm chức là biết trọn bộ phản ứng của chất.',
        check: 'Chất có nhóm –COOH thì phản ứng được với những gì?',
        checkAnswer: 'Với bazơ, với kim loại trước H, với ancol tạo este, và làm quỳ hóa đỏ.',
      },
      {
        idea: 'Phản ứng este hóa là phản ứng thuận nghịch giữa axit và ancol.',
        explain:
          'Axit cộng ancol cho este và nước, có xúc tác axit đặc. Vì thuận nghịch nên hiệu suất không bao giờ đạt 100%, và đề rất hay hỏi về hiệu suất.',
        check: 'Sản phẩm của phản ứng giữa CH₃COOH và C₂H₅OH là gì?',
        checkAnswer: 'Este CH₃COOC₂H₅ và nước.',
      },
      {
        idea: 'Phản ứng cộng chỉ xảy ra ở liên kết bội, phản ứng thế xảy ra ở liên kết đơn.',
        explain:
          'Anken và ankin có liên kết đôi hoặc ba nên tham gia phản ứng cộng và làm mất màu nước brom. Ankan chỉ có liên kết đơn nên chỉ tham gia phản ứng thế.',
        check: 'Chất nào làm mất màu dung dịch nước brom: etan hay etilen?',
        checkAnswer: 'Etilen — có liên kết đôi nên tham gia phản ứng cộng.',
      },
    ],
    examples: [
      {
        id: 'ex.org.group',
        patternId: 'org.group',
        title: 'Từ nhóm chức suy ra tính chất',
        problem:
          'Cho ba chất: C₂H₅OH, CH₃COOH và CH₄. Chất nào tác dụng được với Na, chất nào làm quỳ tím hóa đỏ, và chất nào không phản ứng với cả hai?',
        steps: [
          {
            do: 'Xác định nhóm chức của từng chất.',
            why: 'Tính chất hóa học do nhóm chức quyết định, nên đây luôn là bước đầu tiên của mọi bài hữu cơ.',
            result: 'C₂H₅OH có nhóm –OH · CH₃COOH có nhóm –COOH · CH₄ không có nhóm chức',
          },
          {
            do: 'Tra tính chất đặc trưng của từng nhóm chức.',
            why: 'Mỗi nhóm chức có một bộ phản ứng cố định, dùng chung cho mọi chất mang nhóm đó.',
            result: '–OH tác dụng Na · –COOH tác dụng Na, bazơ và làm quỳ hóa đỏ',
          },
          {
            do: 'Đối chiếu với từng câu hỏi của đề.',
            why: 'Đề hỏi ba việc khác nhau, mỗi việc ứng với một tính chất vừa liệt kê.',
            result:
              'Tác dụng Na: cả C₂H₅OH và CH₃COOH · Làm quỳ đỏ: chỉ CH₃COOH · Không phản ứng gì: CH₄',
          },
        ],
        answer:
          'C₂H₅OH và CH₃COOH đều tác dụng với Na; chỉ CH₃COOH làm quỳ tím hóa đỏ; CH₄ không phản ứng với cả hai.',
        takeaway:
          'Ancol và axit đều tác dụng với Na vì cùng có hiđro linh động, nhưng chỉ axit đủ mạnh để làm đổi màu quỳ. Đó là điểm phân biệt hai nhóm chức này.',
      },
      {
        id: 'ex.org.ester',
        patternId: 'org.ester',
        title: 'Phản ứng este hóa có hiệu suất',
        problem:
          'Đun 0,1 mol CH₃COOH với 0,1 mol C₂H₅OH có H₂SO₄ đặc làm xúc tác, hiệu suất phản ứng đạt 60%. Tính khối lượng este thu được. Biết CH₃COOC₂H₅ có M = 88.',
        steps: [
          {
            do: 'Viết phương trình phản ứng este hóa.',
            why: 'Tỉ lệ mol lấy từ hệ số phương trình, và ở đây tỉ lệ là 1 : 1 : 1.',
            result: 'CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O',
          },
          {
            do: 'Xác định chất hết trước theo lý thuyết.',
            why: 'Hiệu suất được tính trên lượng sản phẩm lý thuyết, nên phải có con số lý thuyết trước.',
            result: 'Hai chất bằng nhau và tỉ lệ 1 : 1 ⟹ lý thuyết thu 0,1 mol este',
          },
          {
            do: 'Nhân lượng lý thuyết với hiệu suất.',
            why: 'Hiệu suất là phần trăm của lượng lý thuyết thực sự chuyển thành sản phẩm.',
            result: 'n(este thực tế) = 0,1 × 0,6 = 0,06 mol',
          },
          {
            do: 'Đổi số mol este ra khối lượng.',
            why: 'Đề hỏi khối lượng nên bước cuối là nhân với khối lượng mol.',
            result: 'm = 0,06 × 88 = 5,28 g',
          },
        ],
        answer: 'Khối lượng este thu được là 5,28 g.',
        takeaway:
          'Bài có hiệu suất luôn đi hai nhịp: tính lượng lý thuyết trước, rồi mới nhân hiệu suất. Nhân hiệu suất vào dữ kiện đầu vào ngay từ đầu sẽ cho kết quả khác và sai.',
      },
    ],
    wrongTurn: {
      problem:
        'Cho biết chất nào làm mất màu dung dịch nước brom: C₂H₆ hay C₂H₄? Giải thích lựa chọn.',
      attempt: [
        'C₂H₆ có nhiều nguyên tử hiđro hơn C₂H₄.',
        'Nhiều hiđro hơn nghĩa là hoạt động hóa học mạnh hơn.',
        'Vậy C₂H₆ làm mất màu nước brom.',
      ],
      brokeAtStep: 2,
      diagnosis:
        'Bước 2 lấy số lượng nguyên tử hiđro làm thước đo khả năng phản ứng, một tiêu chí hoàn toàn không liên quan. Điều quyết định là LOẠI LIÊN KẾT: C₂H₄ có liên kết đôi nên tham gia phản ứng cộng và làm mất màu brom, còn C₂H₆ chỉ có liên kết đơn nên chỉ phản ứng thế trong điều kiện chiếu sáng. Thực tế, ít hiđro hơn ở đây lại chính là dấu hiệu của liên kết bội — nghĩa là lập luận không những sai tiêu chí mà còn đi ngược đúng chiều.',
      fix: 'Từ bước 2: đếm liên kết bội thay vì đếm hiđro. Công thức C₂H₄ ứng với anken có một liên kết đôi, nên chính C₂H₄ làm mất màu nước brom. Mẹo nhận ra nhanh: so công thức với ankan tương ứng CₙH₂ₙ₊₂; thiếu hai hiđro là có một liên kết bội.',
    },
  },
  /* ══ KHOA HỌC — SINH HỌC ═══════════════════════════════════════════ */
  {
    topicId: 'science.biology.cell',
    section: 'science',
    minutes: 35,
    hook: 'Sinh học tế bào chiếm khoảng 5 câu của chủ đề Sinh học. Đây là chuyên đề có nhiều câu nhận biết nhất trong chủ đề, nên nó là chỗ lấy điểm chắc: một bảng sáu dòng tên bào quan và chức năng đã phủ được phần lớn nhóm câu dễ.',
    build: [
      {
        idea: 'Cấu trúc quyết định chức năng, nên biết bào quan có gì là biết nó làm được gì.',
        explain:
          'Ti thể có màng trong gấp nếp để tăng diện tích cho chuỗi chuyền electron; lizôxôm có màng dày để giữ enzim thủy phân không rò ra tế bào chất. Mỗi đặc điểm cấu trúc phục vụ một chức năng.',
        check: 'Vì sao màng trong ti thể lại gấp nếp nhiều?',
        checkAnswer: 'Để tăng diện tích chứa các phức hệ của chuỗi chuyền electron.',
      },
      {
        idea: 'Mọi câu vận chuyển qua màng chỉ hỏi hai điều: xuôi hay ngược gradien, và có tốn ATP không.',
        explain:
          'Xuôi gradien và không tốn ATP là thụ động; ngược gradien và tốn ATP là chủ động. Việc có dùng prôtêin màng hay không thì không phân biệt được hai loại.',
        check: 'Khuếch tán tăng cường cần prôtêin kênh — vậy nó là chủ động hay thụ động?',
        checkAnswer: 'Thụ động, vì vẫn đi xuôi gradien và không tốn ATP.',
      },
      {
        idea: 'Nguyên phân giữ nguyên bộ nhiễm sắc thể, giảm phân chia đôi bộ nhiễm sắc thể.',
        explain:
          'Nguyên phân có một lần nhân đôi và một lần phân chia; giảm phân có một lần nhân đôi nhưng hai lần phân chia. Đó là toàn bộ lý do bộ nhiễm sắc thể giảm một nửa.',
        check: 'Vì sao giảm phân làm bộ nhiễm sắc thể giảm một nửa?',
        checkAnswer: 'Vì có hai lần phân chia nhưng chỉ một lần nhân đôi ADN.',
      },
    ],
    examples: [
      {
        id: 'ex.bio.mitosis',
        patternId: 'bio.mitosis',
        title: 'Tính nguyên liệu môi trường cung cấp cho nguyên phân',
        problem:
          'Một tế bào có bộ nhiễm sắc thể 2n = 8 trải qua 4 lần nguyên phân liên tiếp. Tính tổng số nhiễm sắc thể đơn mà môi trường nội bào phải cung cấp.',
        steps: [
          {
            do: 'Tính số tế bào con sau bốn lần phân chia.',
            why: 'Mỗi lần nguyên phân nhân đôi số tế bào, nên sau k lần có 2^k tế bào.',
            result: '2⁴ = 16 tế bào con',
          },
          {
            do: 'Xác định phần nhiễm sắc thể thực sự do môi trường cung cấp.',
            why: 'Tế bào mẹ đã mang sẵn một bộ nhiễm sắc thể; môi trường chỉ cung cấp cho phần tăng thêm.',
            result: 'Số bộ tăng thêm = 16 − 1 = 15 bộ',
          },
          {
            do: 'Nhân số bộ tăng thêm với số nhiễm sắc thể mỗi bộ.',
            why: 'Mỗi bộ có 2n = 8 nhiễm sắc thể đơn, nên đây là phép nhân cuối cùng.',
            result: '15 × 8 = 120 nhiễm sắc thể đơn',
          },
          {
            do: 'Kiểm tra bằng cách so với tổng số nhiễm sắc thể trong tất cả tế bào con.',
            why: 'Tổng trong 16 tế bào là 128; hiệu 128 − 120 = 8 đúng bằng bộ ban đầu, nên kết quả nhất quán.',
            result: '128 − 120 = 8 = 2n ⟹ hợp lý',
          },
        ],
        answer: 'Môi trường nội bào phải cung cấp 120 nhiễm sắc thể đơn.',
        takeaway:
          'Công thức là (2^k − 1) × 2n chứ không phải 2^k × 2n. Bước kiểm tra ở cuối — hiệu phải đúng bằng một bộ — bắt được lỗi này ngay mà không cần nhớ công thức.',
      },
      {
        id: 'ex.bio.transport',
        patternId: 'bio.transport',
        title: 'Phân biệt vận chuyển chủ động và thụ động',
        problem:
          'Tế bào rễ cây hút ion khoáng từ đất, dù nồng độ ion trong tế bào đã cao hơn trong đất. Hãy cho biết đây là kiểu vận chuyển nào và giải thích.',
        steps: [
          {
            do: 'Xác định chiều di chuyển so với gradien nồng độ.',
            why: 'Chiều đi là dấu hiệu bản chất phân biệt hai kiểu vận chuyển, phải xác định trước mọi thứ khác.',
            result: 'Ion đi từ nơi nồng độ thấp (đất) vào nơi nồng độ cao (tế bào) — ngược gradien',
          },
          {
            do: 'Suy ra yêu cầu về năng lượng.',
            why: 'Đi ngược gradien không thể tự xảy ra, nên bắt buộc phải có nguồn năng lượng đẩy.',
            result: 'Phải tiêu tốn ATP',
          },
          {
            do: 'Gọi tên kiểu vận chuyển theo hai dấu hiệu vừa xác định.',
            why: 'Hai dấu hiệu ngược gradien và tốn ATP cùng chỉ về đúng một kiểu duy nhất.',
            result: 'Vận chuyển chủ động qua bơm prôtêin trên màng',
          },
        ],
        answer:
          'Đây là vận chuyển chủ động: ion đi ngược chiều gradien nồng độ nhờ bơm prôtêin và tiêu tốn ATP.',
        takeaway:
          'Câu hỏi này luôn giải được bằng đúng một phép so sánh nồng độ trong với ngoài. Việc có prôtêin tham gia hay không hoàn toàn không giúp phân biệt.',
      },
    ],
    wrongTurn: {
      problem:
        'Một tế bào 2n = 10 đang ở kì giữa của nguyên phân. Tính số crômatit có trong tế bào lúc đó.',
      attempt: [
        'Tế bào có 2n = 10 nhiễm sắc thể.',
        'Kì giữa là lúc nhiễm sắc thể xếp thành hàng ở mặt phẳng xích đạo.',
        'Số crômatit bằng số nhiễm sắc thể, tức 10 crômatit.',
      ],
      brokeAtStep: 3,
      diagnosis:
        'Bước 3 đồng nhất số crômatit với số nhiễm sắc thể. Ở kì giữa, ADN đã nhân đôi từ kì trung gian nhưng tâm động chưa tách, nên mỗi nhiễm sắc thể đang ở dạng KÉP gồm hai crômatit dính nhau. Số crômatit vì thế gấp đôi số nhiễm sắc thể. Lỗi này đến từ việc nhớ các kì phân bào như một chuỗi tên gọi mà không gắn với trạng thái vật chất của nhiễm sắc thể ở từng kì.',
      fix: 'Từ bước 3: kiểm tra tâm động đã tách chưa. Chưa tách thì nhiễm sắc thể còn kép, số crômatit = 2 × 10 = 20. Từ kì sau trở đi tâm động tách, nhiễm sắc thể thành đơn và số crômatit bằng 0.',
    },
  },
  {
    topicId: 'science.biology.genetics',
    section: 'science',
    minutes: 45,
    hook: 'Di truyền học chiếm khoảng 6–7 câu của chủ đề Sinh học, nhiều nhất trong ba chuyên đề, và tập trung phần lớn câu vận dụng cao. Đây là chuyên đề quyết định điểm chủ đề Sinh học, nhưng bù lại nó có quy trình rõ ràng nhất: mọi bài lai đều đi qua đúng bốn tầng.',
    build: [
      {
        idea: 'Nguyên tắc bổ sung A–T và G–X là gốc của mọi phép tính trên ADN.',
        explain:
          'Từ hai đẳng thức A = T, G = X suy ra %A + %G = 50%. Chỉ cần một dữ kiện phần trăm là tính được cả bốn loại nuclêôtit, rồi mọi đại lượng khác chỉ còn là thay số.',
        check: 'Gen có A chiếm 30% thì G chiếm bao nhiêu phần trăm?',
        checkAnswer: 'G chiếm 20%, vì %A + %G = 50%.',
      },
      {
        idea: 'Bài lai luôn đi một chiều: kiểu gen bố mẹ → giao tử → tổ hợp → kiểu hình.',
        explain:
          'Nhảy bước nào cũng cho ra một tỉ lệ trông hợp lý và sai. Viết đủ bốn tầng ra giấy tốn hai mươi giây và loại bỏ gần hết rủi ro.',
        check: 'Cơ thể Aa cho những loại giao tử nào với tỉ lệ ra sao?',
        checkAnswer: 'Hai loại A và a, mỗi loại 50%.',
      },
      {
        idea: 'Các cặp gen phân li độc lập thì tính riêng từng cặp rồi NHÂN kết quả.',
        explain:
          'Xác suất của các sự kiện độc lập được nhân với nhau. Cách này nhanh hơn kẻ bảng 16 ô và ít sai hơn nhiều khi số cặp gen tăng lên.',
        check: 'AaBb × AaBb cho tỉ lệ kiểu hình bao nhiêu nếu trội hoàn toàn?',
        checkAnswer: '(3:1) × (3:1) = 9 : 3 : 3 : 1.',
      },
    ],
    examples: [
      {
        id: 'ex.bio.population',
        patternId: 'bio.population',
        title: 'Bài quần thể cân bằng di truyền',
        problem:
          'Một quần thể ở trạng thái cân bằng di truyền có 16% cá thể mang kiểu hình lặn. Tính tần số hai alen và tỉ lệ cá thể dị hợp trong quần thể.',
        steps: [
          {
            do: 'Nhận ra tỉ lệ kiểu hình lặn chính là q².',
            why: 'Chỉ kiểu gen đồng hợp lặn mới biểu hiện kiểu hình lặn, nên số liệu đề cho tương ứng trực tiếp với q².',
            result: 'q² = 0,16',
          },
          {
            do: 'Khai căn để có tần số alen lặn.',
            why: 'Đây là bước bị bỏ qua nhiều nhất; lấy thẳng 0,16 làm tần số alen là sai toàn bộ các câu sau.',
            result: 'q = √0,16 = 0,4',
          },
          {
            do: 'Tính tần số alen trội từ điều kiện tổng bằng 1.',
            why: 'Hai alen chiếm trọn vốn gen của locut nên tần số của chúng luôn cộng lại bằng 1.',
            result: 'p = 1 − 0,4 = 0,6',
          },
          {
            do: 'Tính tỉ lệ dị hợp bằng công thức 2pq.',
            why: 'Hệ số 2 vì có hai cách tạo thể dị hợp: alen trội từ bố hoặc từ mẹ.',
            result: '2 × 0,6 × 0,4 = 0,48 tức 48%',
          },
        ],
        answer: 'Tần số alen trội p = 0,6 và alen lặn q = 0,4; tỉ lệ cá thể dị hợp là 48%.',
        takeaway:
          'Hai chỗ mất điểm cố định của dạng bài này: quên khai căn ở bước 2, và quên hệ số 2 ở bước 4. Kiểm tra nhanh bằng cách cộng p² + 2pq + q² xem có bằng 1 không.',
      },
      {
        id: 'ex.bio.cross',
        patternId: 'bio.cross',
        title: 'Lai hai cặp tính trạng phân li độc lập',
        problem:
          'Ở đậu Hà Lan, alen A quy định hạt vàng trội hoàn toàn so với a quy định hạt xanh; alen B quy định vỏ trơn trội hoàn toàn so với b quy định vỏ nhăn. Hai cặp gen phân li độc lập. Cho cây AaBb tự thụ phấn, tính tỉ lệ cây hạt vàng vỏ nhăn ở đời con.',
        steps: [
          {
            do: 'Tách bài toán thành hai phép lai một cặp tính trạng.',
            why: 'Phân li độc lập cho phép xét riêng từng cặp; đây là điều làm bài toán nhẹ đi rất nhiều.',
            result: 'Cặp 1: Aa × Aa · Cặp 2: Bb × Bb',
          },
          {
            do: 'Tính tỉ lệ kiểu hình mong muốn cho từng cặp riêng.',
            why: 'Mỗi phép lai dị hợp tự thụ cho tỉ lệ 3 trội : 1 lặn, một kết quả quen thuộc dùng lại được.',
            result: 'Hạt vàng (A-): 3/4 · Vỏ nhăn (bb): 1/4',
          },
          {
            do: 'Nhân hai xác suất với nhau.',
            why: 'Hai cặp gen độc lập nên xác suất đồng thời xảy ra bằng tích hai xác suất riêng.',
            result: '3/4 × 1/4 = 3/16',
          },
          {
            do: 'Đối chiếu với tỉ lệ tổng quát 9 : 3 : 3 : 1 để kiểm tra.',
            why: 'Nhóm A-bb đúng bằng 3 phần trong tổng 16 phần, khớp với kết quả vừa tính.',
            result: '3/16 ⟹ nhất quán',
          },
        ],
        answer: 'Tỉ lệ cây hạt vàng vỏ nhăn ở đời con là 3/16.',
        takeaway:
          'Nhân xác suất từng cặp nhanh hơn kẻ bảng nhiều, và càng nhiều cặp gen thì lợi thế càng lớn. Bảng 16 ô chỉ nên dùng để kiểm tra lại kết quả.',
      },
    ],
    wrongTurn: {
      problem:
        'Một quần thể cân bằng di truyền có 9% cá thể mang kiểu hình lặn. Tính tần số alen lặn của quần thể.',
      attempt: [
        'Kiểu hình lặn chiếm 9% quần thể.',
        'Kiểu hình lặn do alen lặn quy định.',
        'Vậy tần số alen lặn là 0,09.',
      ],
      brokeAtStep: 3,
      diagnosis:
        'Bước 3 lấy thẳng tỉ lệ KIỂU HÌNH lặn làm tần số ALEN lặn. Hai đại lượng này khác nhau: tỉ lệ kiểu hình lặn là q², còn tần số alen là q, nên phải khai căn. Lỗi này đặc biệt khó tự phát hiện vì cả hai đều là số nhỏ hơn 1 và đều liên quan tới tính trạng lặn — không có gì trong con số 0,09 gợi rằng nó chưa phải kết quả cuối. Hệ quả là mọi phép tính sau đó, kể cả tỉ lệ dị hợp, đều lệch.',
      fix: 'Từ bước 3: q² = 0,09 nên q = √0,09 = 0,3. Cách tự kiểm: tính ngược p² + 2pq + q² với p = 0,7 và q = 0,3, tổng phải đúng bằng 1.',
    },
  },
  {
    topicId: 'science.biology.organism',
    section: 'science',
    minutes: 40,
    hook: 'Sinh học cơ thể và tiến hóa chiếm khoảng 5 câu của chủ đề Sinh học. Chuyên đề này ít công thức nhất nhưng nhiều cơ chế nhất, nên cách học hiệu quả là hiểu một nguyên lý chung rồi suy ra các trường hợp, thay vì học thuộc từng cơ chế rời.',
    build: [
      {
        idea: 'Mọi cơ chế điều hòa nội môi đều là vòng ngược âm tính: lệch đi thì cơ thể kéo ngược lại.',
        explain:
          'Bộ phận tiếp nhận phát hiện sai lệch, bộ phận điều khiển phát tín hiệu, bộ phận thực hiện kéo chỉ số về mức chuẩn. Biết hướng lệch là suy ra được toàn bộ chuỗi phản ứng.',
        check: 'Đường huyết tăng cao thì cơ thể tiết hoocmôn nào?',
        checkAnswer: 'Insulin — để đưa glucôzơ vào tế bào và hạ đường huyết.',
      },
      {
        idea: 'Mỗi đặc điểm thích nghi trả lời một sức ép cụ thể của môi trường.',
        explain:
          'Hỏi "đặc điểm này giải quyết vấn đề gì" là ra đáp án mà không cần thuộc ví dụ. Túi khí của chim giải quyết nhu cầu oxi khi bay; con đường C₄ giải quyết hô hấp sáng khi trời nóng.',
        check: 'Lá biến thành gai ở cây xương rồng giải quyết vấn đề gì?',
        checkAnswer: 'Giảm thoát hơi nước trong môi trường khô hạn.',
      },
      {
        idea: 'Chọn lọc tự nhiên định hướng tiến hóa; đột biến chỉ cung cấp nguyên liệu.',
        explain:
          'Đột biến xảy ra vô hướng và ngẫu nhiên. Chỉ chọn lọc tự nhiên mới giữ lại cái thích nghi và loại bỏ cái kém thích nghi, nên chỉ nó quy định chiều của tiến hóa.',
        check: 'Nhân tố nào tác động mạnh nhất ở quần thể có kích thước nhỏ?',
        checkAnswer: 'Các yếu tố ngẫu nhiên, tức biến động di truyền.',
      },
    ],
    examples: [
      {
        id: 'ex.bio.homeostasis',
        patternId: 'bio.homeostasis',
        title: 'Truy chuỗi điều hòa nội môi',
        problem:
          'Sau khi vận động mạnh và ra nhiều mồ hôi, áp suất thẩm thấu của máu tăng lên. Hãy mô tả cơ chế cơ thể đưa áp suất thẩm thấu trở về mức bình thường.',
        steps: [
          {
            do: 'Ghi rõ chỉ số đang lệch và hướng lệch.',
            why: 'Toàn bộ chuỗi phản ứng của cơ thể chỉ nhằm đảo ngược đúng hướng lệch này, nên xác định nó là xác định luôn chiều của mọi bước sau.',
            result: 'Áp suất thẩm thấu máu TĂNG do mất nước',
          },
          {
            do: 'Xác định bộ phận tiếp nhận và tín hiệu được phát ra.',
            why: 'Vòng điều hòa luôn bắt đầu bằng một bộ phận cảm nhận sai lệch rồi phát tín hiệu.',
            result: 'Vùng dưới đồi nhận biết và kích thích tuyến yên tiết ADH',
          },
          {
            do: 'Truy tới cơ quan đích và tác động cụ thể.',
            why: 'Phương án nhiễu thường đúng tên hoocmôn nhưng sai cơ quan đích hoặc sai chiều tác động.',
            result: 'ADH làm ống góp của thận tăng tái hấp thu nước',
          },
          {
            do: 'Kiểm tra kết quả có kéo chỉ số về mức chuẩn không.',
            why: 'Nếu kết luận làm chỉ số lệch thêm thì chắc chắn đã chọn nhầm chiều ở đâu đó.',
            result: 'Giữ nước lại ⟹ máu loãng ra ⟹ áp suất thẩm thấu giảm về bình thường',
          },
        ],
        answer:
          'Vùng dưới đồi phát hiện áp suất thẩm thấu tăng, kích thích tuyến yên tiết ADH; ADH làm thận tăng tái hấp thu nước, nước tiểu cô đặc lại và áp suất thẩm thấu máu trở về mức bình thường. Đồng thời trung khu khát được kích thích gây cảm giác khát.',
        takeaway:
          'Bước kiểm tra cuối cùng là công cụ mạnh nhất của chuyên đề: nếu chuỗi bạn mô tả làm chỉ số lệch thêm thay vì kéo về, chắc chắn có một mắt xích bị đảo chiều.',
      },
      {
        id: 'ex.bio.ecosystem',
        patternId: 'bio.ecosystem',
        title: 'Dòng năng lượng qua các bậc dinh dưỡng',
        problem:
          'Trong một hệ sinh thái, sinh vật sản xuất tích lũy được 10⁶ kcal. Biết hiệu suất sinh thái giữa các bậc dinh dưỡng liên tiếp đều bằng 10%. Tính năng lượng tích lũy ở bậc dinh dưỡng thứ tư.',
        steps: [
          {
            do: 'Đánh số các bậc dinh dưỡng, bắt đầu từ sinh vật sản xuất là bậc 1.',
            why: 'Đếm nhầm bậc đầu tiên làm lệch kết quả đúng một bậc mười, và đề luôn có sẵn phương án ứng với lỗi đó.',
            result: 'Bậc 1: sinh vật sản xuất, 10⁶ kcal',
          },
          {
            do: 'Đếm số lần chuyển bậc để tới bậc đề hỏi.',
            why: 'Số lần nhân hiệu suất bằng số lần CHUYỂN bậc, tức số thứ tự bậc đích trừ đi 1.',
            result: 'Từ bậc 1 tới bậc 4 có 3 lần chuyển',
          },
          {
            do: 'Nhân năng lượng ban đầu với hiệu suất đúng số lần vừa đếm.',
            why: 'Mỗi lần chuyển bậc chỉ giữ lại 10%, nên ba lần chuyển ứng với nhân 0,1 ba lần.',
            result: '10⁶ × 0,1³ = 10⁶ × 10⁻³ = 10³ kcal',
          },
        ],
        answer: 'Năng lượng tích lũy ở bậc dinh dưỡng thứ tư là 10³ = 1000 kcal.',
        takeaway:
          'Đếm bậc trên đầu ngón tay trước khi bấm máy. Sai một bậc làm kết quả lệch mười lần, và cả hai đáp án lệch đều nằm sẵn trong bốn phương án.',
      },
    ],
    wrongTurn: {
      problem:
        'Giải thích vì sao quần thể có kích thước nhỏ dễ mất đi một alen hơn quần thể lớn, và nhân tố nào chịu trách nhiệm.',
      attempt: [
        'Quần thể nhỏ có ít cá thể nên ít đột biến hơn.',
        'Ít đột biến nghĩa là ít alen mới được tạo ra.',
        'Vậy chọn lọc tự nhiên là nhân tố làm mất alen ở quần thể nhỏ.',
      ],
      brokeAtStep: 3,
      diagnosis:
        'Bước 3 quy trách nhiệm cho chọn lọc tự nhiên, trong khi cơ chế thật ở đây là các yếu tố ngẫu nhiên. Chọn lọc tự nhiên loại bỏ alen dựa trên giá trị thích nghi — tức có hướng và có lý do. Ở quần thể nhỏ, một alen có thể biến mất hoàn toàn do một biến cố tình cờ như bão hay dịch bệnh, không liên quan gì tới việc nó tốt hay xấu. Điều phân biệt hai nhân tố là CÓ HƯỚNG hay VÔ HƯỚNG, và cụm từ "kích thước quần thể nhỏ" trong đề chính là tín hiệu chỉ thẳng tới các yếu tố ngẫu nhiên.',
      fix: 'Từ bước 3: nhận ra cụm "quần thể có kích thước nhỏ" là dấu hiệu của các yếu tố ngẫu nhiên. Quần thể càng nhỏ thì sai lệch ngẫu nhiên giữa các thế hệ càng lớn, nên một alen dễ biến mất hoặc trở nên phổ biến mà không phụ thuộc giá trị thích nghi của nó.',
    },
  },
  /* ══ KHOA HỌC — LỊCH SỬ ════════════════════════════════════════════ */
  {
    topicId: 'science.history.vietnam',
    section: 'science',
    minutes: 40,
    hook: 'Lịch sử Việt Nam chiếm khoảng 10 câu trong 16–17 câu của chủ đề Lịch sử. Đề hiện nay hiếm khi hỏi thuộc lòng ngày tháng; câu hỏi thường là "vì sao", "ý nghĩa lớn nhất là gì" — nên học theo chuỗi nhân quả hiệu quả hơn học theo mốc rời rạc.',
    build: [
      {
        idea: 'Mỗi sự kiện lớn nằm trong một chuỗi: bối cảnh dẫn tới nó, và nó dẫn tới hệ quả gì.',
        explain:
          'Nhớ ba mắt xích liền nhau nhẹ hơn nhớ ba mốc rời, vì mỗi mắt xích gợi ra mắt xích kế tiếp. Câu hỏi "vì sao" và "ý nghĩa" đều là hỏi về hai đầu của chuỗi.',
        check: 'Bối cảnh trực tiếp dẫn tới Cách mạng tháng Tám 1945 là gì?',
        checkAnswer: 'Nhật đầu hàng Đồng minh tạo ra khoảng trống quyền lực ở Đông Dương.',
      },
      {
        idea: 'Câu hỏi "ý nghĩa lớn nhất" luôn chọn hệ quả có tầm ảnh hưởng rộng và lâu dài nhất.',
        explain:
          'Bốn phương án thường đều là hệ quả có thật, khác nhau ở tầm vóc. Hệ quả làm thay đổi cục diện hoặc mở ra một giai đoạn mới luôn thắng hệ quả cục bộ.',
        check: 'Giữa "tiêu diệt sinh lực địch" và "buộc địch ký hiệp định", đâu là ý nghĩa lớn hơn?',
        checkAnswer: 'Buộc địch ký hiệp định — làm thay đổi cục diện chiến tranh.',
      },
      {
        idea: 'Mốc thời gian nên nhớ theo cụm giai đoạn, không nhớ rời từng năm.',
        explain:
          '1930 thành lập Đảng, 1945 giành chính quyền, 1954 kết thúc chống Pháp, 1975 thống nhất đất nước, 1986 đổi mới. Năm mốc này là khung để treo mọi sự kiện khác vào.',
        check: 'Chiến thắng Điện Biên Phủ thuộc giai đoạn nào?',
        checkAnswer: 'Giai đoạn kháng chiến chống Pháp, kết thúc năm 1954.',
      },
    ],
    examples: [
      {
        id: 'ex.his.meaning',
        patternId: 'his.meaning',
        title: 'Chọn ý nghĩa lớn nhất trong bốn hệ quả đều đúng',
        problem:
          'Chiến thắng Điện Biên Phủ năm 1954 có nhiều ý nghĩa. Trong các ý nghĩa sau, đâu là ý nghĩa lớn nhất: (A) tiêu diệt được tập đoàn cứ điểm mạnh nhất của Pháp; (B) buộc Pháp ký Hiệp định Giơnevơ, chấm dứt chiến tranh xâm lược Đông Dương; (C) nâng cao uy tín quân đội ta; (D) giải phóng vùng Tây Bắc?',
        steps: [
          {
            do: 'Kiểm tra xem các phương án có phương án nào sai sự thật không.',
            why: 'Ở dạng câu này thường cả bốn đều đúng, nên không loại được bằng tính đúng sai; phải chuyển sang so tầm vóc.',
            result: 'Cả bốn đều là hệ quả có thật của chiến thắng',
          },
          {
            do: 'Xếp bốn hệ quả theo phạm vi ảnh hưởng.',
            why: 'Ý nghĩa lớn nhất là ý nghĩa có phạm vi rộng nhất và tác động lâu dài nhất.',
            result: 'A và D là quân sự, cục bộ · C là tinh thần · B là chính trị, tầm quốc tế',
          },
          {
            do: 'Kiểm tra hệ quả nào mở ra một giai đoạn mới của lịch sử.',
            why: 'Sự kiện chấm dứt một giai đoạn và mở ra giai đoạn khác luôn có tầm vóc lớn nhất.',
            result: 'Hiệp định Giơnevơ kết thúc chín năm kháng chiến chống Pháp',
          },
        ],
        answer: 'Phương án B — buộc Pháp ký Hiệp định Giơnevơ, chấm dứt chiến tranh xâm lược Đông Dương.',
        takeaway:
          'Với câu "ý nghĩa lớn nhất", đừng tìm phương án đúng vì cả bốn thường đều đúng. Tìm phương án có phạm vi rộng nhất, và ưu tiên phương án mở ra một giai đoạn mới.',
      },
      {
        id: 'ex.his.cause',
        patternId: 'his.cause',
        title: 'Phân biệt nguyên nhân trực tiếp với nguyên nhân sâu xa',
        problem:
          'Hãy phân biệt nguyên nhân sâu xa và nguyên nhân trực tiếp dẫn tới thắng lợi của Cách mạng tháng Tám năm 1945.',
        steps: [
          {
            do: 'Tách hai loại nguyên nhân bằng tiêu chí thời gian và tính tất yếu.',
            why: 'Nguyên nhân sâu xa tích lũy lâu dài và mang tính quyết định; nguyên nhân trực tiếp là sự kiện châm ngòi ngay trước đó.',
            result: 'Sâu xa nằm ở quá trình chuẩn bị; trực tiếp nằm ở thời điểm bùng nổ',
          },
          {
            do: 'Chỉ ra quá trình tích lũy lâu dài.',
            why: 'Không có quá trình chuẩn bị thì thời cơ đến cũng không có lực lượng để nắm lấy.',
            result:
              'Mười lăm năm Đảng lãnh đạo, ba cuộc tập dượt 1930–1931, 1936–1939, 1939–1945; lực lượng chính trị và vũ trang đã sẵn sàng',
          },
          {
            do: 'Chỉ ra sự kiện tạo ra thời cơ.',
            why: 'Nguyên nhân trực tiếp là điều kiện khách quan xuất hiện đúng lúc lực lượng đã chuẩn bị xong.',
            result: 'Nhật đầu hàng Đồng minh tháng 8-1945, quân Nhật ở Đông Dương hoang mang, quân Đồng minh chưa vào',
          },
          {
            do: 'Nêu quan hệ giữa hai loại nguyên nhân.',
            why: 'Câu hỏi dạng này chấm cả phần liên hệ, không chỉ chấm phần liệt kê.',
            result: 'Chuẩn bị lâu dài là điều kiện đủ; thời cơ khách quan là điều kiện cần',
          },
        ],
        answer:
          'Nguyên nhân sâu xa là quá trình chuẩn bị lực lượng suốt mười lăm năm dưới sự lãnh đạo của Đảng; nguyên nhân trực tiếp là việc Nhật đầu hàng Đồng minh tạo ra thời cơ ngàn năm có một. Thiếu một trong hai thì cách mạng không thể thắng lợi nhanh và ít đổ máu như vậy.',
        takeaway:
          'Mọi câu hỏi nguyên nhân đều tách được theo trục thời gian: cái tích lũy lâu dài và cái châm ngòi tức thì. Chỉ nêu một trong hai là mất một nửa số điểm.',
      },
    ],
    wrongTurn: {
      problem:
        'Câu hỏi: "Nguyên nhân quyết định thắng lợi của Cách mạng tháng Tám năm 1945 là gì?" Một học sinh trả lời như sau.',
      attempt: [
        'Tháng 8-1945 Nhật đầu hàng Đồng minh.',
        'Đây là sự kiện xảy ra ngay trước cách mạng nên nó là nguyên nhân quan trọng nhất.',
        'Vậy nguyên nhân quyết định là việc Nhật đầu hàng Đồng minh.',
      ],
      brokeAtStep: 2,
      diagnosis:
        'Bước 2 lấy tiêu chí "xảy ra gần nhất về thời gian" làm tiêu chí "quan trọng nhất". Nhật đầu hàng là nguyên nhân KHÁCH QUAN tạo ra thời cơ, nhưng thời cơ chỉ có giá trị khi có lực lượng sẵn sàng nắm lấy — nhiều nước Đông Nam Á cùng gặp khoảng trống quyền lực đó mà không giành được chính quyền. Nguyên nhân quyết định phải là nhân tố CHỦ QUAN: sự lãnh đạo của Đảng và quá trình chuẩn bị lực lượng suốt mười lăm năm.',
      fix: 'Từ bước 2: phân biệt nguyên nhân khách quan với nguyên nhân chủ quan, và nhớ rằng câu hỏi "quyết định" luôn nhắm tới nhân tố chủ quan. Đáp án đúng là sự lãnh đạo đúng đắn của Đảng cùng quá trình chuẩn bị lực lượng lâu dài.',
    },
  },
  {
    topicId: 'science.history.world',
    section: 'science',
    minutes: 35,
    hook: 'Lịch sử thế giới chiếm khoảng 6–7 câu của chủ đề Lịch sử. Phần này ít đòi hỏi chi tiết hơn lịch sử Việt Nam nhưng đòi hỏi nhìn ra XU THẾ — câu hỏi thường về trật tự thế giới, xu hướng toàn cầu hóa và quan hệ giữa các cường quốc.',
    build: [
      {
        idea: 'Trật tự thế giới sau 1945 chia làm hai giai đoạn rõ rệt, lấy mốc 1991.',
        explain:
          'Trước 1991 là trật tự hai cực Ianta với Mỹ và Liên Xô đối đầu; sau 1991 là trật tự đa cực đang hình thành. Định vị được sự kiện thuộc giai đoạn nào là hiểu được bối cảnh của nó.',
        check: 'Chiến tranh lạnh kết thúc năm nào và bằng sự kiện gì?',
        checkAnswer: 'Năm 1989 hai bên tuyên bố chấm dứt; Liên Xô tan rã năm 1991 chấm dứt trật tự hai cực.',
      },
      {
        idea: 'Cách mạng khoa học công nghệ là động lực nằm sau hầu hết biến chuyển kinh tế thế giới.',
        explain:
          'Nó tạo ra toàn cầu hóa, làm thay đổi cơ cấu kinh tế các nước và làm xuất hiện các trung tâm kinh tế mới. Nhiều câu hỏi về nguyên nhân sâu xa quy về nhân tố này.',
        check: 'Xu thế toàn cầu hóa bắt nguồn từ đâu?',
        checkAnswer: 'Từ cuộc cách mạng khoa học công nghệ, đặc biệt là công nghệ thông tin.',
      },
      {
        idea: 'Các tổ chức khu vực ra đời đều nhằm giải quyết một vấn đề chung cụ thể.',
        explain:
          'ASEAN ra đời để giữ hòa bình và hợp tác khu vực; EU để liên kết kinh tế rồi tiến tới chính trị. Nhớ mục đích thành lập là suy ra được vai trò và hoạt động.',
        check: 'ASEAN thành lập năm nào và với mục tiêu ban đầu là gì?',
        checkAnswer: 'Năm 1967, nhằm hợp tác phát triển kinh tế và giữ ổn định khu vực.',
      },
    ],
    examples: [
      {
        id: 'ex.wor.order',
        patternId: 'wor.order',
        title: 'Đọc sự kiện theo trật tự thế giới đương thời',
        problem:
          'Vì sao sau năm 1991, quan hệ quốc tế chuyển từ đối đầu sang đối thoại và hợp tác? Hãy nêu các nguyên nhân chính.',
        steps: [
          {
            do: 'Định vị mốc 1991 trong sơ đồ trật tự thế giới.',
            why: 'Mọi giải thích về giai đoạn này đều bắt đầu từ việc trật tự hai cực chấm dứt.',
            result: 'Liên Xô tan rã ⟹ trật tự hai cực Ianta sụp đổ',
          },
          {
            do: 'Chỉ ra hệ quả trực tiếp lên quan hệ giữa các nước lớn.',
            why: 'Không còn hai cực đối đầu thì cơ sở của Chiến tranh lạnh cũng không còn.',
            result: 'Không còn hai khối đối lập về ý thức hệ và quân sự',
          },
          {
            do: 'Chỉ ra động lực mới đẩy các nước xích lại.',
            why: 'Sự thay đổi không chỉ do mất đi cái cũ mà còn do xuất hiện lợi ích chung mới.',
            result:
              'Kinh tế trở thành trọng tâm sức mạnh quốc gia; toàn cầu hóa làm các nền kinh tế phụ thuộc nhau',
          },
          {
            do: 'Bổ sung các vấn đề toàn cầu buộc phải hợp tác.',
            why: 'Đây là nhóm nguyên nhân thường bị bỏ sót nhưng luôn có trong đáp án đầy đủ.',
            result: 'Khủng bố, dịch bệnh, biến đổi khí hậu — không nước nào giải quyết một mình được',
          },
        ],
        answer:
          'Vì trật tự hai cực sụp đổ nên cơ sở của đối đầu ý thức hệ không còn; đồng thời kinh tế trở thành trọng tâm cạnh tranh, toàn cầu hóa làm các nền kinh tế phụ thuộc lẫn nhau, và các vấn đề toàn cầu buộc các nước phải hợp tác.',
        takeaway:
          'Câu hỏi về xu thế quốc tế luôn có ba lớp nguyên nhân: cái cũ mất đi, cái mới xuất hiện, và sức ép chung buộc phải hợp tác. Nêu đủ ba lớp là câu trả lời trọn vẹn.',
      },
      {
        id: 'ex.wor.trend',
        patternId: 'wor.trend',
        title: 'Nhận diện tác động hai mặt của một xu thế',
        problem:
          'Toàn cầu hóa tác động thế nào tới các nước đang phát triển? Hãy nêu cả cơ hội và thách thức.',
        steps: [
          {
            do: 'Nhận ra câu hỏi yêu cầu cả hai mặt, không chỉ một mặt.',
            why: 'Đề dùng chữ "tác động" chứ không dùng "lợi ích", nên trả lời một chiều là mất nửa số điểm.',
            result: 'Phải nêu cả cơ hội lẫn thách thức',
          },
          {
            do: 'Liệt kê cơ hội theo các nguồn lực mà toàn cầu hóa mang lại.',
            why: 'Cơ hội của nước đang phát triển chủ yếu nằm ở việc tiếp cận được thứ trước đây không có.',
            result: 'Tiếp cận vốn, công nghệ, thị trường; rút ngắn khoảng cách phát triển',
          },
          {
            do: 'Liệt kê thách thức theo các rủi ro mà sự mở cửa tạo ra.',
            why: 'Mở cửa vừa mang cơ hội vào vừa mang cạnh tranh và biến động vào cùng lúc.',
            result:
              'Cạnh tranh gay gắt, nguy cơ tụt hậu, phụ thuộc kinh tế bên ngoài, nguy cơ mai một bản sắc văn hóa',
          },
          {
            do: 'Nêu kết luận về thái độ ứng xử.',
            why: 'Câu hỏi dạng này thường chấm thêm phần nhận định, không dừng ở liệt kê.',
            result: 'Toàn cầu hóa là xu thế khách quan; vấn đề là chủ động hội nhập chứ không phải chấp nhận hay từ chối',
          },
        ],
        answer:
          'Toàn cầu hóa mở ra cơ hội tiếp cận vốn, công nghệ và thị trường để rút ngắn khoảng cách phát triển; đồng thời đặt ra thách thức về cạnh tranh gay gắt, nguy cơ phụ thuộc kinh tế và mai một bản sắc văn hóa. Vì đây là xu thế khách quan nên vấn đề đặt ra là chủ động hội nhập.',
        takeaway:
          'Bất kỳ câu hỏi nào về "tác động" của một xu thế đều phải trả lời hai mặt. Trả lời một chiều là dấu hiệu rõ nhất của bài làm chưa đọc kỹ đề.',
      },
    ],
    wrongTurn: {
      problem: 'Chiến tranh lạnh kết thúc vào năm nào? Hãy nêu căn cứ cho câu trả lời.',
      attempt: [
        'Liên Xô tan rã năm 1991.',
        'Chiến tranh lạnh là cuộc đối đầu giữa Mỹ và Liên Xô.',
        'Vậy Chiến tranh lạnh kết thúc năm 1991 khi Liên Xô tan rã.',
      ],
      brokeAtStep: 3,
      diagnosis:
        'Bước 3 gộp hai sự kiện khác nhau thành một. Chiến tranh lạnh chấm dứt năm 1989 khi lãnh đạo Mỹ và Liên Xô cùng tuyên bố chấm dứt tại cuộc gặp Manta; còn năm 1991 là mốc Liên Xô tan rã, chấm dứt trật tự hai cực Ianta. Hai mốc cách nhau hai năm và ứng với hai sự kiện có nội dung khác nhau, nên câu hỏi hỏi mốc nào phải trả lời đúng mốc ấy. Lỗi gộp mốc này rất phổ biến vì hai sự kiện liên quan chặt chẽ và thường được kể liền nhau.',
      fix: 'Từ bước 3: tách rõ hai mốc khi ôn — 1989 chấm dứt Chiến tranh lạnh, 1991 chấm dứt trật tự hai cực. Đọc kỹ đề hỏi mốc nào rồi mới trả lời.',
    },
  },
  /* ══ KHOA HỌC — ĐỊA LÝ ═════════════════════════════════════════════ */
  {
    topicId: 'science.geography.nature',
    section: 'science',
    minutes: 35,
    hook: 'Địa lý tự nhiên chiếm khoảng 5–6 câu của chủ đề Địa lý. Toàn bộ chuyên đề dựng trên một chuỗi nhân quả duy nhất: vị trí địa lý quy định khí hậu, khí hậu quy định sông ngòi, đất và sinh vật. Nắm chuỗi đó là suy ra được hầu hết đáp án.',
    build: [
      {
        idea: 'Vị trí địa lý là nguyên nhân gốc của mọi đặc điểm tự nhiên nước ta.',
        explain:
          'Nằm trong vùng nội chí tuyến nên nền nhiệt cao; giáp Biển Đông nên ẩm; nằm trong khu vực gió mùa châu Á nên có mùa. Ba đặc điểm khí hậu lớn đều truy được về vị trí.',
        check: 'Vì sao khí hậu nước ta có tính chất nhiệt đới?',
        checkAnswer: 'Vì nằm hoàn toàn trong vùng nội chí tuyến bán cầu Bắc.',
      },
      {
        idea: 'Gió mùa mùa đông và gió mùa mùa hạ tạo ra sự phân hóa lớn nhất của khí hậu Việt Nam.',
        explain:
          'Gió mùa đông bắc làm miền Bắc có mùa đông lạnh, còn miền Nam thì không. Đây là nguồn gốc của gần như mọi câu hỏi so sánh Bắc — Nam.',
        check: 'Vì sao miền Nam không có mùa đông lạnh như miền Bắc?',
        checkAnswer: 'Vì gió mùa đông bắc bị suy yếu và chặn lại bởi dãy Bạch Mã.',
      },
      {
        idea: 'Địa hình ba phần tư là đồi núi nhưng chủ yếu là đồi núi thấp.',
        explain:
          'Đồi núi chiếm ba phần tư diện tích, nhưng núi cao trên 2000 m chỉ chiếm khoảng 1%. Nhớ cả hai vế mới trả lời đúng các câu về đặc điểm địa hình.',
        check: 'Đồi núi chiếm bao nhiêu phần diện tích lãnh thổ và độ cao chủ yếu ra sao?',
        checkAnswer: 'Ba phần tư diện tích, chủ yếu là đồi núi thấp dưới 1000 m.',
      },
    ],
    examples: [
      {
        id: 'ex.nat.monsoon',
        patternId: 'nat.monsoon',
        title: 'Giải thích sự phân hóa khí hậu Bắc — Nam',
        problem:
          'Giải thích vì sao miền Bắc nước ta có mùa đông lạnh với hai đến ba tháng nhiệt độ dưới 18°C, trong khi miền Nam nóng quanh năm.',
        steps: [
          {
            do: 'Xác định nhân tố khí hậu gây ra sự khác biệt.',
            why: 'Cả hai miền cùng nằm trong vùng nội chí tuyến nên vĩ độ không giải thích hết được; phải tìm nhân tố khác.',
            result: 'Gió mùa đông bắc từ áp cao Xibia',
          },
          {
            do: 'Mô tả đường đi và tác động của khối khí lạnh.',
            why: 'Hiểu đường đi là hiểu vì sao tác động giảm dần theo hướng nam.',
            result: 'Tràn xuống miền Bắc theo hướng đông bắc, mang không khí lạnh khô đầu mùa và lạnh ẩm cuối mùa',
          },
          {
            do: 'Chỉ ra rào cản địa hình làm khối khí suy yếu.',
            why: 'Dãy núi chắn ngang là nguyên nhân trực tiếp khiến ảnh hưởng không xuống tới miền Nam.',
            result: 'Dãy Bạch Mã ở vĩ tuyến 16°B chặn gió mùa đông bắc',
          },
          {
            do: 'Kết luận theo chuỗi nhân quả đầy đủ.',
            why: 'Câu hỏi "vì sao" chấm theo chuỗi lập luận, không chấm theo việc gọi tên nhân tố.',
            result: 'Gió mùa đông bắc + rào chắn Bạch Mã ⟹ mùa đông lạnh chỉ ở miền Bắc',
          },
        ],
        answer:
          'Miền Bắc chịu tác động trực tiếp của gió mùa đông bắc từ áp cao Xibia nên có mùa đông lạnh; khối khí này suy yếu dần về phía nam và bị dãy Bạch Mã chặn lại, nên miền Nam nóng quanh năm với hai mùa mưa và khô rõ rệt.',
        takeaway:
          'Mọi câu hỏi phân hóa khí hậu Việt Nam đều giải bằng cùng một cặp nhân tố: gió mùa và địa hình chắn gió. Nêu đủ cả hai mới thành một lời giải thích trọn vẹn.',
      },
      {
        id: 'ex.nat.explain',
        patternId: 'nat.explain',
        title: 'Truy chuỗi nhân quả từ khí hậu sang sông ngòi',
        problem:
          'Giải thích vì sao sông ngòi nước ta có lượng nước lớn, nhiều phù sa và có chế độ nước theo mùa.',
        steps: [
          {
            do: 'Truy đặc điểm thứ nhất về nguồn cấp nước.',
            why: 'Lượng nước của sông phụ thuộc trực tiếp lượng mưa trên lưu vực, nên bắt đầu từ khí hậu.',
            result: 'Mưa nhiều, trung bình 1500–2000 mm mỗi năm ⟹ sông nhiều nước',
          },
          {
            do: 'Truy đặc điểm thứ hai về nguồn phù sa.',
            why: 'Phù sa sinh ra từ quá trình xâm thực, mà xâm thực mạnh cần cả địa hình dốc lẫn mưa lớn.',
            result: 'Địa hình đồi núi dốc cộng mưa lớn tập trung ⟹ xâm thực mạnh ⟹ nhiều phù sa',
          },
          {
            do: 'Truy đặc điểm thứ ba về nhịp mùa.',
            why: 'Chế độ nước sông lặp lại nhịp của chế độ mưa, vì nguồn cấp nước chính là mưa.',
            result: 'Khí hậu có mùa mưa và mùa khô ⟹ sông có mùa lũ và mùa cạn',
          },
        ],
        answer:
          'Cả ba đặc điểm đều bắt nguồn từ khí hậu nhiệt đới ẩm gió mùa kết hợp địa hình đồi núi dốc: mưa nhiều cho lượng nước lớn, mưa lớn trên địa hình dốc gây xâm thực mạnh cho nhiều phù sa, và mùa mưa — mùa khô tạo ra mùa lũ — mùa cạn.',
        takeaway:
          'Chuỗi vị trí → khí hậu → sông ngòi, đất, sinh vật giải được phần lớn câu "vì sao" của địa lý tự nhiên. Học chuỗi nhẹ hơn học thuộc từng đặc điểm rời.',
      },
    ],
    wrongTurn: {
      problem: 'Giải thích vì sao nước ta có lượng mưa lớn, trung bình 1500–2000 mm mỗi năm.',
      attempt: [
        'Nước ta nằm trong vùng nội chí tuyến nên nhiệt độ cao.',
        'Nhiệt độ cao làm nước bốc hơi nhiều.',
        'Vậy nguyên nhân mưa nhiều là do nằm trong vùng nội chí tuyến.',
      ],
      brokeAtStep: 3,
      diagnosis:
        'Bước 3 dừng ở nhân tố vĩ độ và bỏ mất nguồn ẩm. Nhiều vùng khác cũng nằm trong nội chí tuyến nhưng lại là hoang mạc — Xahara là ví dụ rõ nhất — nên nội chí tuyến một mình không giải thích được mưa nhiều. Nhân tố còn thiếu là Biển Đông cùng gió mùa mang hơi ẩm vào đất liền. Đây là lỗi lập luận thiếu mắt xích, và cách tự phát hiện là hỏi ngược: nếu nguyên nhân này đủ, tại sao nơi khác cùng điều kiện lại khác kết quả?',
      fix: 'Từ bước 3: bổ sung nguồn ẩm vào chuỗi. Nước ta giáp Biển Đông và nằm trong khu vực gió mùa, các khối khí đi qua biển mang theo lượng ẩm lớn vào đất liền. Nhiệt độ cao cộng nguồn ẩm dồi dào mới cho lượng mưa lớn.',
    },
  },
  {
    topicId: 'science.geography.economy',
    section: 'science',
    minutes: 35,
    hook: 'Địa lý kinh tế — xã hội chiếm khoảng 6–7 câu của chủ đề Địa lý, nhiều nhất trong ba chuyên đề. Câu hỏi thường xoay quanh thế mạnh của từng vùng và sự chuyển dịch cơ cấu kinh tế — hai chủ đề có logic rõ ràng chứ không đòi hỏi thuộc số liệu.',
    build: [
      {
        idea: 'Thế mạnh của một vùng bắt nguồn từ điều kiện tự nhiên và vị trí của vùng đó.',
        explain:
          'Tây Nguyên có đất badan và khí hậu cận xích đạo nên mạnh về cây công nghiệp lâu năm; Đồng bằng sông Cửu Long có đất phù sa và mạng lưới sông nên mạnh về lúa và thủy sản. Nhớ điều kiện là suy ra thế mạnh.',
        check: 'Vì sao Tây Nguyên là vùng trồng cà phê lớn nhất cả nước?',
        checkAnswer: 'Có diện tích đất badan lớn và khí hậu cận xích đạo phân hai mùa rõ rệt.',
      },
      {
        idea: 'Chuyển dịch cơ cấu kinh tế đi theo hướng giảm nông nghiệp, tăng công nghiệp và dịch vụ.',
        explain:
          'Đây là hướng chung của mọi nền kinh tế đang công nghiệp hóa. Biết hướng chung thì đọc bảng số liệu chỉ còn là xác nhận, không phải suy đoán.',
        check: 'Tỉ trọng khu vực nông — lâm — ngư trong GDP nước ta đang tăng hay giảm?',
        checkAnswer: 'Giảm, phù hợp hướng công nghiệp hóa.',
      },
      {
        idea: 'Dân số đông vừa là thế mạnh về lao động vừa là sức ép về việc làm và tài nguyên.',
        explain:
          'Câu hỏi về dân số hầu như luôn hỏi hai mặt. Trả lời một chiều — chỉ nói thuận lợi hoặc chỉ nói khó khăn — là mất một nửa số điểm.',
        check: 'Cơ cấu dân số vàng mang lại thuận lợi gì và sức ép gì?',
        checkAnswer: 'Nguồn lao động dồi dào, nhưng sức ép lớn về tạo việc làm.',
      },
    ],
    examples: [
      {
        id: 'ex.eco.strength',
        patternId: 'eco.strength',
        title: 'Suy thế mạnh của vùng từ điều kiện tự nhiên',
        problem:
          'Phân tích các điều kiện thuận lợi để Đồng bằng sông Cửu Long trở thành vùng sản xuất lương thực và thủy sản lớn nhất cả nước.',
        steps: [
          {
            do: 'Liệt kê điều kiện tự nhiên nổi bật của vùng.',
            why: 'Thế mạnh kinh tế của một vùng luôn truy được về điều kiện tự nhiên và vị trí, nên đây là điểm xuất phát.',
            result: 'Đồng bằng rộng nhất nước · đất phù sa màu mỡ · khí hậu cận xích đạo nóng ẩm quanh năm · mạng lưới sông ngòi kênh rạch dày đặc',
          },
          {
            do: 'Nối từng điều kiện với một thế mạnh cụ thể.',
            why: 'Liệt kê điều kiện mà không nối với kết quả là bỏ dở lập luận, và đề chấm chính phần nối này.',
            result:
              'Đất và khí hậu ⟹ trồng lúa quanh năm nhiều vụ · sông ngòi và bờ biển dài ⟹ nuôi trồng và đánh bắt thủy sản',
          },
          {
            do: 'Bổ sung điều kiện kinh tế — xã hội.',
            why: 'Điều kiện tự nhiên là tiềm năng, còn lao động và thị trường mới biến tiềm năng thành sản lượng thật.',
            result: 'Người dân giàu kinh nghiệm sản xuất, thị trường xuất khẩu rộng',
          },
          {
            do: 'Nêu thêm hạn chế để câu trả lời cân bằng.',
            why: 'Câu hỏi phân tích thường chấm cả phần nhận định về khó khăn, không chỉ phần thuận lợi.',
            result: 'Mùa khô thiếu nước ngọt, xâm nhập mặn, đất phèn đất mặn chiếm diện tích lớn',
          },
        ],
        answer:
          'Vùng có đồng bằng rộng, đất phù sa màu mỡ, khí hậu cận xích đạo và mạng lưới sông ngòi dày đặc nên thuận lợi cho lúa nhiều vụ và thủy sản; cộng thêm kinh nghiệm sản xuất của người dân và thị trường xuất khẩu. Hạn chế chính là thiếu nước ngọt mùa khô, xâm nhập mặn và diện tích đất phèn, đất mặn lớn.',
        takeaway:
          'Công thức trả lời cố định cho câu thế mạnh vùng: điều kiện tự nhiên, nối sang thế mạnh, bổ sung điều kiện kinh tế xã hội, rồi nêu hạn chế. Bốn phần này phủ hết thang điểm.',
      },
      {
        id: 'ex.eco.shift',
        patternId: 'eco.shift',
        title: 'Đọc chuyển dịch cơ cấu từ bảng số liệu',
        problem:
          'Cho biết tỉ trọng khu vực nông — lâm — ngư trong GDP giảm từ 24% xuống 14%, khu vực công nghiệp — xây dựng tăng từ 36% lên 38%, khu vực dịch vụ tăng từ 40% lên 48%. Nhận xét về chuyển dịch cơ cấu kinh tế.',
        steps: [
          {
            do: 'Tính mức thay đổi tỉ trọng của từng khu vực.',
            why: 'Nhận xét phải dựa trên con số cụ thể; nói "giảm" mà không nói giảm bao nhiêu là nhận xét chưa đủ.',
            result: 'Nông nghiệp giảm 10 điểm phần trăm · công nghiệp tăng 2 · dịch vụ tăng 8',
          },
          {
            do: 'Xác định xu hướng chung của cả ba khu vực.',
            why: 'Ba con số riêng lẻ chỉ có ý nghĩa khi đặt vào một xu hướng chung.',
            result: 'Giảm nông nghiệp, tăng công nghiệp và dịch vụ',
          },
          {
            do: 'Chỉ ra khu vực chuyển dịch mạnh nhất.',
            why: 'Đề thường hỏi tiếp về khu vực nào tăng nhanh nhất, nên nêu luôn tiết kiệm một bước.',
            result: 'Dịch vụ tăng mạnh nhất trong hai khu vực tăng, với 8 điểm phần trăm',
          },
          {
            do: 'Kết luận theo hướng phát triển chung của nền kinh tế.',
            why: 'Nhận xét trọn vẹn phải nối số liệu với ý nghĩa kinh tế, không dừng ở mô tả.',
            result: 'Chuyển dịch đúng hướng công nghiệp hóa, hiện đại hóa',
          },
        ],
        answer:
          'Cơ cấu kinh tế chuyển dịch theo hướng giảm tỉ trọng nông — lâm — ngư (giảm 10 điểm phần trăm), tăng tỉ trọng công nghiệp — xây dựng và dịch vụ, trong đó dịch vụ tăng mạnh nhất. Đây là chuyển dịch đúng hướng công nghiệp hóa, hiện đại hóa.',
        takeaway:
          'Nhận xét bảng số liệu luôn gồm bốn phần: số liệu cụ thể, xu hướng chung, cái nổi bật nhất, và ý nghĩa. Thiếu phần ý nghĩa là nhận xét dừng ở mức mô tả.',
      },
    ],
    wrongTurn: {
      problem:
        'Bảng số liệu cho thấy sản lượng lúa của một vùng tăng từ 20 triệu tấn lên 22 triệu tấn, còn tỉ trọng của vùng trong sản lượng cả nước giảm từ 55% xuống 52%. Nhận xét nào đúng?',
      attempt: [
        'Sản lượng lúa của vùng tăng thêm 2 triệu tấn.',
        'Nhưng tỉ trọng lại giảm, hai điều này mâu thuẫn nhau.',
        'Vậy bảng số liệu có sai sót.',
      ],
      brokeAtStep: 2,
      diagnosis:
        'Bước 2 coi sản lượng tăng và tỉ trọng giảm là mâu thuẫn. Thực ra hai chỉ số này hoàn toàn có thể cùng xảy ra: sản lượng là con số tuyệt đối của riêng vùng, còn tỉ trọng là phần của vùng trong tổng cả nước. Nếu cả nước tăng nhanh hơn vùng thì phần của vùng nhỏ đi dù bản thân nó vẫn tăng. Đây là mô hình số liệu được dùng rất nhiều trong đề vì nó phân biệt được người đọc bảng cẩn thận với người đọc lướt.',
      fix: 'Từ bước 2: tách rõ giá trị tuyệt đối và giá trị tương đối. Nhận xét đúng là sản lượng lúa của vùng vẫn tăng nhưng tăng chậm hơn tốc độ chung của cả nước, nên tỉ trọng giảm.',
    },
  },
  {
    topicId: 'science.geography.data',
    section: 'science',
    minutes: 30,
    hook: 'Bảng số liệu, biểu đồ và Atlat chiếm khoảng 5 câu của chủ đề Địa lý và là nhóm câu ăn điểm chắc nhất: đáp án nằm sẵn trong bảng hoặc trong Atlat, không cần thuộc gì. Điều duy nhất cần là đọc đúng từ khóa của đề.',
    build: [
      {
        idea: 'Từ khóa trong đề quyết định dạng biểu đồ, không phải cảm nhận về số liệu.',
        explain:
          '"Cơ cấu" một năm dùng tròn, nhiều năm dùng miền; "tốc độ tăng trưởng" dùng đường; "so sánh quy mô" dùng cột. Đọc từ khóa là ra ngay dạng, không cần cân nhắc.',
        check: 'Đề yêu cầu thể hiện tốc độ tăng trưởng qua 10 năm thì vẽ biểu đồ gì?',
        checkAnswer: 'Biểu đồ đường, với năm gốc quy về 100%.',
      },
      {
        idea: 'Số liệu khác đơn vị phải quy về dạng tương đối trước khi so sánh tốc độ.',
        explain:
          'Không so sánh trực tiếp được tấn với hecta hay tỉ đồng. Quy về chỉ số với năm gốc bằng 100% đưa mọi đại lượng về cùng một thang.',
        check: 'Muốn so tốc độ tăng của hai đại lượng khác đơn vị, phải làm gì trước?',
        checkAnswer: 'Quy về chỉ số phần trăm với năm đầu tiên bằng 100%.',
      },
      {
        idea: 'Tỉ trọng luôn là thành phần chia cho tổng, nên phải xác định tổng trước.',
        explain:
          'Nhiều lỗi tính tỉ trọng đến từ việc lấy nhầm mẫu số — chia cho một thành phần khác thay vì chia cho tổng. Ghi rõ tổng ra trước khi chia là cách chặn lỗi đó.',
        check: 'Ngành A đạt 30 trong tổng 120 thì tỉ trọng bằng bao nhiêu?',
        checkAnswer: '30/120 = 25%.',
      },
    ],
    examples: [
      {
        id: 'ex.dat.chart',
        patternId: 'dat.chart',
        title: 'Chọn dạng biểu đồ theo từ khóa của đề',
        problem:
          'Cho bảng số liệu về cơ cấu giá trị sản xuất công nghiệp phân theo ba nhóm ngành trong bốn năm 2010, 2015, 2020, 2023. Đề yêu cầu vẽ biểu đồ thể hiện sự chuyển dịch cơ cấu. Nên chọn dạng biểu đồ nào?',
        steps: [
          {
            do: 'Gạch chân từ khóa chỉ dạng trong yêu cầu của đề.',
            why: 'Dạng biểu đồ do từ khóa quyết định; đọc lướt qua từ khóa là mất điểm ở câu vốn rất dễ.',
            result: 'Từ khóa: "cơ cấu" và "chuyển dịch"',
          },
          {
            do: 'Đếm số mốc thời gian trong bảng.',
            why: 'Cùng từ khóa "cơ cấu" nhưng số năm khác nhau cho ra hai dạng biểu đồ khác nhau.',
            result: 'Bốn năm',
          },
          {
            do: 'Đối chiếu cặp (từ khóa, số năm) với quy tắc chọn dạng.',
            why: 'Quy tắc là cố định nên bước này cho kết quả duy nhất, không cần cân nhắc thẩm mỹ.',
            result: '"Cơ cấu" với từ 4 năm trở lên ⟹ biểu đồ miền',
          },
          {
            do: 'Kiểm tra tổng các thành phần mỗi năm có bằng 100% không.',
            why: 'Biểu đồ miền chỉ dùng được cho số liệu đã ở dạng phần trăm; nếu là số tuyệt đối phải xử lý trước.',
            result: 'Nếu bảng cho số tuyệt đối thì phải tính tỉ trọng trước khi vẽ',
          },
        ],
        answer: 'Chọn biểu đồ miền, sau khi đã quy số liệu về dạng tỉ trọng phần trăm nếu bảng cho số tuyệt đối.',
        takeaway:
          'Bảng quy tắc chọn dạng chỉ có bốn dòng và không có ngoại lệ. Học thuộc bốn dòng đó là lấy trọn nhóm câu nhận dạng biểu đồ trong khoảng 30 giây mỗi câu.',
      },
      {
        id: 'ex.dat.calc',
        patternId: 'dat.calc',
        title: 'Tính tốc độ tăng trưởng với năm gốc',
        problem:
          'Sản lượng điện của một nước là 100 tỉ kWh năm 2015 và 160 tỉ kWh năm 2023; sản lượng than là 40 triệu tấn năm 2015 và 52 triệu tấn năm 2023. Đại lượng nào tăng nhanh hơn?',
        steps: [
          {
            do: 'Nhận ra hai đại lượng khác đơn vị nên không so sánh trực tiếp được.',
            why: 'Tỉ kWh và triệu tấn là hai thang khác nhau; so hiệu tuyệt đối giữa chúng là vô nghĩa.',
            result: 'Phải quy về chỉ số tương đối',
          },
          {
            do: 'Quy năm gốc 2015 về 100% cho cả hai đại lượng.',
            why: 'Đưa cả hai về cùng một điểm xuất phát là cách duy nhất so sánh được tốc độ.',
            result: 'Điện 2015 = 100% · Than 2015 = 100%',
          },
          {
            do: 'Tính chỉ số của năm 2023 cho từng đại lượng.',
            why: 'Chỉ số bằng giá trị năm đó chia giá trị năm gốc rồi nhân 100.',
            result: 'Điện: 160/100 × 100 = 160% · Than: 52/40 × 100 = 130%',
          },
          {
            do: 'So sánh hai chỉ số vừa tính.',
            why: 'Hai con số nay cùng thang phần trăm nên đặt cạnh nhau là đọc ra ngay.',
            result: '160% > 130%',
          },
        ],
        answer: 'Sản lượng điện tăng nhanh hơn: tăng 60% so với 30% của than trong cùng giai đoạn.',
        takeaway:
          'Quy về năm gốc 100% là thao tác bắt buộc cho mọi câu so sánh tốc độ. Nó cũng là cách vẽ đúng biểu đồ đường khi các đại lượng khác đơn vị.',
      },
    ],
    wrongTurn: {
      problem:
        'Đề cho bảng số liệu về cơ cấu lao động theo ba khu vực kinh tế trong năm năm và yêu cầu vẽ biểu đồ thể hiện tốc độ tăng trưởng số lao động. Chọn dạng biểu đồ nào?',
      attempt: [
        'Bảng cho số liệu về cơ cấu.',
        'Từ khóa "cơ cấu" với năm năm thì vẽ biểu đồ miền.',
        'Vậy chọn biểu đồ miền.',
      ],
      brokeAtStep: 2,
      diagnosis:
        'Bước 2 lấy từ khóa trong phần MÔ TẢ BẢNG thay vì từ khóa trong phần YÊU CẦU của đề. Bảng nói về cơ cấu, nhưng đề yêu cầu thể hiện tốc độ tăng trưởng — và dạng biểu đồ phải theo yêu cầu chứ không theo bảng. Đây là bẫy được cài rất thường xuyên vì nó chỉ khác nhau ở một chỗ đọc, và người làm vội gần như luôn sa vào. Biểu đồ miền thể hiện cơ cấu, không thể hiện được tốc độ.',
      fix: 'Từ bước 2: gạch chân riêng cụm từ đứng sau chữ "thể hiện" trong yêu cầu của đề. Ở đây là "tốc độ tăng trưởng", nên phải vẽ biểu đồ đường với năm gốc bằng 100%.',
    },
  },
  /* ══ KHOA HỌC — TIẾNG ANH ══════════════════════════════════════════ */
  {
    topicId: 'science.english.grammar',
    section: 'science',
    minutes: 35,
    hook: 'Grammar & Structure chiếm khoảng 17 câu nếu bạn chọn đường Tiếng Anh cho phần 3. Điểm mạnh của nhóm câu này: mỗi câu đều có một DẤU HIỆU nhìn thấy được trong đề, nên nó là nhóm câu làm nhanh nhất — mục tiêu 25 giây mỗi câu.',
    build: [
      {
        idea: 'Trạng từ chỉ thời gian trong câu quyết định thì, không phải cảm giác về nghĩa.',
        explain:
          '"Yesterday", "last week" đi với quá khứ đơn; "since", "for", "already" đi với hiện tại hoàn thành; "now", "at the moment" đi với hiện tại tiếp diễn. Tìm trạng từ trước khi chọn.',
        check: 'Câu có "since 2010" thì dùng thì gì?',
        checkAnswer: 'Hiện tại hoàn thành — have/has + V3.',
      },
      {
        idea: 'Mệnh đề quan hệ chọn who, which hay that theo danh từ đứng ngay trước nó.',
        explain:
          'Người dùng "who", vật dùng "which", cả hai dùng được "that" trừ trong mệnh đề không xác định có dấu phẩy. Nhìn danh từ liền trước là chọn được ngay.',
        check: 'Câu "The book ___ I bought is expensive" điền gì?',
        checkAnswer: '"which" hoặc "that" — danh từ đứng trước là vật.',
      },
      {
        idea: 'Câu điều kiện chia ba loại theo mức độ có thật, và mỗi loại có một cặp thì cố định.',
        explain:
          'Loại 1 có thật ở hiện tại hoặc tương lai; loại 2 giả định trái hiện tại; loại 3 giả định trái quá khứ. Nhận ra loại nào là biết luôn cặp thì phải dùng.',
        check: '"If I ___ you, I would tell the truth" điền gì?',
        checkAnswer: '"were" — câu điều kiện loại 2.',
      },
    ],
    examples: [
      {
        id: 'ex.egr.tense',
        patternId: 'egr.tense',
        title: 'Chọn thì bằng dấu hiệu thời gian',
        problem:
          'Chọn đáp án đúng: "She ___ in this company since she graduated from university." với các lựa chọn: A. works, B. worked, C. has worked, D. is working.',
        steps: [
          {
            do: 'Quét câu tìm trạng từ hoặc cụm chỉ thời gian.',
            why: 'Thì được quyết định bởi dấu hiệu thời gian trong câu, nên đây là việc phải làm trước khi đọc các phương án.',
            result: 'Tìm thấy "since she graduated"',
          },
          {
            do: 'Nhớ lại thì đi kèm với dấu hiệu vừa tìm được.',
            why: 'Mỗi dấu hiệu gắn với một thì cố định; đây là quan hệ một đối một, không có ngoại lệ trong đề thi.',
            result: '"since" đi với hiện tại hoàn thành',
          },
          {
            do: 'Đối chiếu với bốn phương án và chọn dạng đúng.',
            why: 'Ba phương án còn lại đều là thì khác nên loại thẳng, không cần cân nhắc nghĩa.',
            result: 'C. has worked là hiện tại hoàn thành',
          },
          {
            do: 'Kiểm tra nghĩa của câu hoàn chỉnh có hợp lý không.',
            why: 'Bước kiểm tra cuối bắt được các trường hợp hiếm khi dấu hiệu bị dùng với nghĩa khác.',
            result: 'Hành động bắt đầu trong quá khứ và kéo dài tới hiện tại ⟹ hợp lý',
          },
        ],
        answer: 'Đáp án C — has worked.',
        takeaway:
          'Bảng dấu hiệu thời gian chỉ khoảng mười dòng và giải được gần hết câu chia thì. Đọc dấu hiệu trước, đọc phương án sau — làm ngược lại là mất gấp đôi thời gian.',
      },
      {
        id: 'ex.egr.clause',
        patternId: 'egr.clause',
        title: 'Chọn đại từ quan hệ',
        problem:
          'Chọn đáp án đúng: "The scientist ___ discovered this vaccine received a Nobel Prize." với các lựa chọn: A. which, B. who, C. whom, D. whose.',
        steps: [
          {
            do: 'Xác định danh từ đứng ngay trước chỗ trống.',
            why: 'Đại từ quan hệ luôn thay thế cho danh từ liền trước nó, nên danh từ đó quyết định lựa chọn.',
            result: '"The scientist" — chỉ người',
          },
          {
            do: 'Loại các đại từ dành cho vật.',
            why: 'Danh từ chỉ người thì không dùng "which"; bước này loại được ngay một phương án.',
            result: 'Loại A',
          },
          {
            do: 'Xác định đại từ đóng vai chủ ngữ hay tân ngữ trong mệnh đề.',
            why: '"Who" làm chủ ngữ, "whom" làm tân ngữ; nhìn xem sau chỗ trống là động từ hay chủ ngữ mới.',
            result: 'Sau chỗ trống là động từ "discovered" ⟹ đại từ làm chủ ngữ',
          },
          {
            do: 'Loại nốt "whose" bằng ý nghĩa sở hữu.',
            why: '"Whose" chỉ dùng khi có quan hệ sở hữu, và sau nó phải là một danh từ chứ không phải động từ.',
            result: 'Chọn B. who',
          },
        ],
        answer: 'Đáp án B — who.',
        takeaway:
          'Hai câu hỏi giải quyết mọi câu mệnh đề quan hệ: danh từ trước là người hay vật, và sau chỗ trống là động từ hay chủ ngữ mới. Không cần nhớ thêm quy tắc nào.',
      },
    ],
    wrongTurn: {
      problem:
        'Chọn đáp án đúng: "I ___ him last week." với các lựa chọn: A. have met, B. met, C. meet, D. will meet.',
      attempt: [
        'Việc gặp đã xảy ra và có liên quan tới hiện tại.',
        'Hiện tại hoàn thành dùng cho hành động đã xảy ra, nên chọn A. have met.',
        'Đáp án là A.',
      ],
      brokeAtStep: 2,
      diagnosis:
        'Bước 2 chọn thì dựa trên cảm nhận về nghĩa mà bỏ qua trạng từ "last week" nằm ngay trong câu. Hiện tại hoàn thành không bao giờ đi với một mốc thời gian quá khứ xác định — đây là quy tắc tuyệt đối, không phụ thuộc việc hành động có liên quan tới hiện tại hay không. Lỗi này xuất hiện rất nhiều vì cách diễn giải "đã xảy ra và còn liên quan" nghe rất thuyết phục, trong khi dấu hiệu hình thức mới là thứ quyết định.',
      fix: 'Từ bước 2: quét trạng từ thời gian trước khi cân nhắc nghĩa. "Last week" là mốc quá khứ xác định nên bắt buộc dùng quá khứ đơn. Đáp án đúng là B. met.',
    },
  },
  {
    topicId: 'science.english.vocabulary',
    section: 'science',
    minutes: 35,
    hook: 'Vocabulary & Collocation chiếm khoảng 15 câu nếu bạn chọn đường Tiếng Anh. Đây là nhóm câu phụ thuộc vốn từ nhiều nhất, nhưng vẫn có quy luật: phần lớn câu kiểm tra COLLOCATION và họ từ, hai thứ học được theo cụm chứ không phải học từng từ rời.',
    build: [
      {
        idea: 'Collocation là các từ quen đi với nhau, và không suy ra được từ nghĩa.',
        explain:
          'Người Anh nói "make a decision" chứ không nói "do a decision", dù cả hai đều nghĩa là làm. Phải học theo cụm; suy luận từ nghĩa gần như luôn dẫn tới phương án sai.',
        check: 'Đi với "a mistake" là "make" hay "do"?',
        checkAnswer: '"Make a mistake".',
      },
      {
        idea: 'Vị trí của từ trong câu quyết định nó phải ở dạng nào của họ từ.',
        explain:
          'Sau mạo từ và tính từ là danh từ; trước danh từ là tính từ; sau động từ thường là trạng từ. Nhìn vị trí là biết dạng cần điền mà chưa cần hiểu nghĩa.',
        check: 'Chỗ trống trong "He works very ___" cần từ loại gì?',
        checkAnswer: 'Trạng từ, ví dụ "hard".',
      },
      {
        idea: 'Từ đồng nghĩa trong đề luôn khác nhau ở sắc thái hoặc phạm vi kết hợp.',
        explain:
          'Cả bốn phương án thường cùng nghĩa gốc; điều phân biệt là từ nào đi được với các từ xung quanh trong chính câu đó. Vì vậy phải đọc cả câu, không chỉ nhìn chỗ trống.',
        check: 'Nên dùng "heavy rain" hay "strong rain"?',
        checkAnswer: '"Heavy rain" — collocation cố định.',
      },
    ],
    examples: [
      {
        id: 'ex.evo.wordform',
        patternId: 'evo.wordform',
        title: 'Chọn dạng từ theo vị trí trong câu',
        problem:
          'Chọn đáp án đúng: "His ___ to solve the problem impressed everyone." với các lựa chọn: A. able, B. ability, C. ably, D. enable.',
        steps: [
          {
            do: 'Xác định từ loại cần điền dựa vào vị trí chỗ trống.',
            why: 'Sau tính từ sở hữu "his" bắt buộc là một danh từ; vị trí quyết định trước cả nghĩa.',
            result: 'Cần một danh từ',
          },
          {
            do: 'Phân loại bốn phương án theo từ loại.',
            why: 'Phân loại xong thường chỉ còn một phương án đúng loại, không cần cân nhắc nghĩa.',
            result: 'able là tính từ · ability là danh từ · ably là trạng từ · enable là động từ',
          },
          {
            do: 'Chọn phương án đúng từ loại và kiểm tra lại toàn câu.',
            why: 'Kiểm tra cả câu bắt được trường hợp hiếm khi có hai phương án cùng từ loại.',
            result: '"His ability to solve the problem impressed everyone" — đúng ngữ pháp và nghĩa',
          },
        ],
        answer: 'Đáp án B — ability.',
        takeaway:
          'Câu chọn dạng từ giải được mà không cần biết nghĩa của từ gốc: chỉ cần đọc vị trí. Đây là nhóm câu nên làm trong 20 giây.',
      },
      {
        id: 'ex.evo.collocation',
        patternId: 'evo.collocation',
        title: 'Chọn từ theo collocation',
        problem:
          'Chọn đáp án đúng: "The heavy rain caused ___ damage to the crops." với các lựa chọn: A. strong, B. severe, C. powerful, D. mighty.',
        steps: [
          {
            do: 'Nhận ra bốn phương án đều gần nghĩa nhau.',
            why: 'Khi cả bốn cùng nghĩa gốc thì câu đang kiểm tra collocation chứ không kiểm tra nghĩa.',
            result: 'Cả bốn đều mang nghĩa mạnh, dữ dội',
          },
          {
            do: 'Xác định danh từ mà từ cần điền phải bổ nghĩa.',
            why: 'Collocation là quan hệ giữa hai từ cụ thể, nên phải khóa được danh từ đi kèm.',
            result: 'Danh từ là "damage"',
          },
          {
            do: 'Nhớ lại cụm quen dùng với danh từ đó.',
            why: 'Collocation không suy ra được; phải nhớ theo cụm đã gặp trong bài đọc hoặc bài nghe.',
            result: '"Severe damage" là cụm cố định; "strong damage" không được dùng',
          },
        ],
        answer: 'Đáp án B — severe.',
        takeaway:
          'Khi bốn phương án cùng nghĩa, đề đang hỏi collocation. Cách ôn hiệu quả là ghi từ mới theo cụm hai ba từ, không ghi từ đơn lẻ.',
      },
    ],
    wrongTurn: {
      problem:
        'Chọn đáp án đúng: "She ___ a lot of progress in English this year." với các lựa chọn: A. did, B. made, C. took, D. got.',
      attempt: [
        '"Progress" nghĩa là tiến bộ, và tiến bộ là việc mình làm được.',
        '"Do" nghĩa là làm, nên "did progress" là hợp lý nhất.',
        'Đáp án là A. did.',
      ],
      brokeAtStep: 2,
      diagnosis:
        'Bước 2 dịch nghĩa từng từ sang tiếng Việt rồi ghép lại, một cách làm luôn thất bại với câu collocation. Trong tiếng Anh, "progress" đi cố định với "make", giống như "make a decision" và "make an effort" — không có lý do ngữ nghĩa nào giải thích được, đó thuần túy là thói quen ngôn ngữ. Cách dịch nghĩa rồi ghép nghe rất hợp lý với người học Việt Nam và chính vì thế nó là bẫy hiệu quả nhất của nhóm câu này.',
      fix: 'Từ bước 2: nhận ra đây là câu collocation nên phải nhớ theo cụm chứ không dịch. Đáp án đúng là B. made — "make progress". Khi ôn, ghi luôn cả cụm "make progress" vào sổ từ thay vì ghi riêng "progress".',
    },
  },
  {
    topicId: 'science.english.reading',
    section: 'science',
    minutes: 40,
    hook: 'Reading Comprehension chiếm khoảng 18 câu nếu bạn chọn đường Tiếng Anh — nhóm câu lớn nhất của cả phần 3. Đáp án luôn nằm trong bài đọc, nên vấn đề không phải là biết hay không biết mà là tìm đúng chỗ trong thời gian có hạn.',
    build: [
      {
        idea: 'Đọc câu hỏi trước, đọc bài sau — trừ câu hỏi về ý chính.',
        explain:
          'Biết trước cần tìm gì thì mắt quét bài có mục tiêu, nhanh hơn nhiều so với đọc kỹ toàn bài rồi mới xem hỏi gì. Riêng câu ý chính thì cần cảm nhận cả bài nên để làm sau cùng.',
        check: 'Với bài đọc có 5 câu hỏi, nên làm câu ý chính vào lúc nào?',
        checkAnswer: 'Sau cùng, khi đã đọc bài qua các câu chi tiết.',
      },
      {
        idea: 'Câu hỏi chi tiết luôn có một câu trong bài trả lời trực tiếp cho nó.',
        explain:
          'Nhiệm vụ là định vị câu đó, không phải suy luận. Từ khóa trong câu hỏi — tên riêng, con số, thuật ngữ — là chìa khóa để quét nhanh.',
        check: 'Từ khóa nào dễ quét nhất trong bài đọc?',
        checkAnswer: 'Tên riêng, con số và từ viết hoa — chúng nổi bật về mặt hình thức.',
      },
      {
        idea: 'Câu hỏi từ vựng trong bài đọc phải trả lời theo ngữ cảnh, không theo nghĩa từ điển.',
        explain:
          'Đề chọn từ đa nghĩa và hỏi nghĩa của nó TRONG CÂU ĐÓ. Cách làm chắc chắn là thay lần lượt bốn phương án vào chính câu đó và xem câu nào vẫn xuôi.',
        check: 'Cách kiểm tra chắc chắn nhất cho câu hỏi từ vựng là gì?',
        checkAnswer: 'Thay từng phương án vào đúng câu trong bài và đọc lại.',
      },
    ],
    examples: [
      {
        id: 'ex.ere.detail',
        patternId: 'ere.detail',
        title: 'Định vị câu trả lời cho câu hỏi chi tiết',
        problem:
          'Bài đọc về lịch sử cà phê có câu: "Coffee was first cultivated in Ethiopia in the 9th century, but it did not reach Europe until the 17th century." Câu hỏi: When did coffee arrive in Europe?',
        steps: [
          {
            do: 'Gạch chân từ khóa trong câu hỏi.',
            why: 'Từ khóa là thứ để quét bài; không có từ khóa thì phải đọc lại toàn bộ, rất tốn thời gian.',
            result: 'Từ khóa: "arrive" và "Europe"',
          },
          {
            do: 'Quét bài tìm từ khóa hoặc từ đồng nghĩa với nó.',
            why: 'Bài đọc hiếm khi lặp nguyên từ trong câu hỏi; nó thường dùng một từ đồng nghĩa.',
            result: '"Europe" xuất hiện cùng cụm "reach Europe" — đồng nghĩa với "arrive"',
          },
          {
            do: 'Đọc kỹ trọn câu chứa từ khóa, chú ý các từ nối.',
            why: 'Từ "but" và "not… until" đảo hẳn nghĩa; đọc lướt sẽ lấy nhầm mốc thế kỷ 9.',
            result: '"did not reach Europe until the 17th century" ⟹ tới châu Âu ở thế kỷ 17',
          },
          {
            do: 'Kiểm tra mốc còn lại trong câu để chắc không lẫn.',
            why: 'Câu chứa hai mốc thời gian, và một trong hai chắc chắn là phương án nhiễu.',
            result: 'Thế kỷ 9 là mốc trồng ở Ethiopia, không phải mốc tới châu Âu',
          },
        ],
        answer: 'Cà phê đến châu Âu vào thế kỷ 17.',
        takeaway:
          'Câu chứa hai mốc thời gian với một từ nối tương phản là mô hình bẫy phổ biến nhất của câu hỏi chi tiết. Đọc trọn câu chứ không dừng ở cụm chứa từ khóa.',
      },
      {
        id: 'ex.ere.vocab',
        patternId: 'ere.vocab',
        title: 'Đoán nghĩa từ theo ngữ cảnh',
        problem:
          'Trong câu "The company decided to curtail its spending after the financial crisis", từ "curtail" gần nghĩa nhất với từ nào: A. increase, B. reduce, C. maintain, D. analyze?',
        steps: [
          {
            do: 'Đọc trọn câu và tìm manh mối ngữ cảnh.',
            why: 'Nghĩa của từ lạ được xác định bởi các từ xung quanh, nên phải đọc cả câu chứ không nhìn riêng từ đó.',
            result: 'Manh mối: "after the financial crisis" — bối cảnh khó khăn tài chính',
          },
          {
            do: 'Suy ra hành động hợp lý trong bối cảnh đó.',
            why: 'Ngữ cảnh thu hẹp không gian nghĩa; sau khủng hoảng thì hành động hợp lý với chi tiêu là cắt giảm.',
            result: 'Sau khủng hoảng, công ty nhiều khả năng giảm chi tiêu',
          },
          {
            do: 'Thay lần lượt từng phương án vào chính câu đó.',
            why: 'Đây là phép kiểm tra chắc chắn nhất, thay cho việc đoán dựa trên cảm giác.',
            result:
              '"increase spending after a crisis" nghe vô lý · "maintain" và "analyze" không khớp với "decided to" trong bối cảnh này · "reduce" xuôi hoàn toàn',
          },
        ],
        answer: 'Đáp án B — reduce.',
        takeaway:
          'Không cần biết trước nghĩa của "curtail" vẫn làm đúng câu này. Kỹ thuật thay phương án vào câu là công cụ gỡ điểm cho mọi câu từ vựng gặp từ lạ.',
      },
    ],
    wrongTurn: {
      problem:
        'Bài đọc viết: "Although solar panels are expensive to install, they save money in the long run." Câu hỏi: What does the author say about solar panels?',
      attempt: [
        'Bài nói tấm pin mặt trời đắt tiền khi lắp đặt.',
        'Vậy tác giả cho rằng tấm pin mặt trời tốn kém và không đáng đầu tư.',
        'Chọn phương án nói rằng tấm pin mặt trời quá đắt.',
      ],
      brokeAtStep: 2,
      diagnosis:
        'Bước 2 chỉ đọc vế đầu của câu và bỏ qua từ nối "Although". Từ này báo rằng vế đầu là ý nhượng bộ, còn ý chính nằm ở vế sau: về lâu dài chúng tiết kiệm tiền. Đề dạng này luôn để sẵn một phương án khớp với vế nhượng bộ, vì đó chính là bẫy dành cho người đọc lướt. Quy tắc chung: trong câu có "although", "however", "despite", ý thật luôn nằm ở vế KHÔNG có từ nối.',
      fix: 'Từ bước 2: đọc trọn câu và xác định ý chính nằm ở vế sau. Tác giả cho rằng tấm pin mặt trời tuy đắt lúc lắp đặt nhưng tiết kiệm tiền về lâu dài — một đánh giá tích cực, không tiêu cực.',
    },
  },
];

export const LESSON_BY_TOPIC = new Map(LESSONS.map((l) => [l.topicId, l]));

export function lessonFor(topicId: string): Lesson | undefined {
  return LESSON_BY_TOPIC.get(topicId);
}

/** Tong so vi du mau giai tung buoc trong ca he bai giang. */
export function countWorkedExamples(): number {
  return LESSONS.reduce((n, lesson) => n + lesson.examples.length, 0);
}
