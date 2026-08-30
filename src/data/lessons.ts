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
];

export const LESSON_BY_TOPIC = new Map(LESSONS.map((l) => [l.topicId, l]));

export function lessonFor(topicId: string): Lesson | undefined {
  return LESSON_BY_TOPIC.get(topicId);
}

/** Tong so vi du mau giai tung buoc trong ca he bai giang. */
export function countWorkedExamples(): number {
  return LESSONS.reduce((n, lesson) => n + lesson.examples.length, 0);
}
