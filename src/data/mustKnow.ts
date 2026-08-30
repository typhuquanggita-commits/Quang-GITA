/**
 * What the exam does not give you.
 *
 * The Digital SAT hands every candidate a reference sheet with six geometry
 * formulas on it. Everything else must already be in the candidate's head, and
 * that asymmetry is the whole point of this file — because the difference
 * between a learner at 1400 and one at 1550 is very rarely that the second
 * knows more mathematics. It is that the second does not spend twenty seconds
 * reconstructing the slope formula, and so has those twenty seconds for the
 * item they actually find hard.
 *
 * ## Automatic, not derivable
 *
 * Every entry here is something that must be recalled rather than worked out.
 * The distinction matters and it is not about difficulty: the sum of the roots
 * of a quadratic is easy to derive and derivable-in-forty-seconds is the same
 * as not known when the module has seventy seconds an item. So each fact
 * carries `cost` — the seconds lost by deriving instead of recalling — and
 * that number, not the difficulty of the fact, is what earns it a place.
 *
 * ## The `given` flag
 *
 * A small number of entries are on the official reference sheet, and they are
 * marked. They are included anyway, because looking a formula up during the
 * exam costs ten seconds and a page turn, and a candidate who reaches for the
 * sheet has already lost more than the formula is worth.
 *
 * Everything else is unmarked, and the count of unmarked entries is the
 * honest answer to "how much must I memorise for the SAT" — a question
 * Vietnamese learners ask constantly and which most resources answer with a
 * list of every formula in secondary mathematics.
 *
 * ## The drill
 *
 * Every fact carries a prompt and an answer so it can be self-tested. A fact a
 * learner has read is not a fact a learner has; the only evidence is recall
 * without the page in front of them.
 */

import type { SectionId, SkillId } from '../types.ts';

export type KnowledgeArea =
  | 'algebra'
  | 'functions'
  | 'geometry'
  | 'trigonometry'
  | 'data'
  | 'punctuation'
  | 'grammar';

/** How often a candidate meets this in a full sitting. */
export type Frequency = 'every-module' | 'most-modules' | 'occasional';

export interface MustKnowFact {
  id: string;
  section: SectionId;
  area: KnowledgeArea;
  /** The fact itself, stated in the form it should be recalled. */
  fact: string;
  factVi: string;
  /** Why recall rather than derivation. Never "because it is on the test". */
  why: string;
  whyVi: string;
  /** Seconds lost by deriving this mid-exam instead of recalling it. */
  cost: number;
  frequency: Frequency;
  /** True when the official reference sheet supplies it. */
  given: boolean;
  drill: { prompt: string; promptVi: string; answer: string };
  /**
   * The skills whose items call on this fact.
   *
   * Authored, not inferred. The platform uses this to answer one question
   * after a test — "the items you missed needed these; check whether you had
   * them" — and that question is only worth asking if the mapping is a claim
   * someone is prepared to defend. A derived mapping would be a guess wearing
   * the clothes of evidence.
   *
   * It is a list of what the item *needed*, never a diagnosis of why an answer
   * was wrong. Nothing here can distinguish a learner who could not recall the
   * discriminant from one who recalled it perfectly and misread the question.
   * That distinction is the learner's to make, and `src/engine/recall.ts` asks
   * them for it rather than assuming it.
   */
  invokedBy: SkillId[];
}

/* ================================================================== */
/* Algebra                                                             */
/* ================================================================== */

export const MUST_KNOW: MustKnowFact[] = [
  {
    id: 'mk_slope_pts', section: 'math', area: 'algebra', cost: 15, frequency: 'every-module', given: false,
    fact: 'Slope between two points: m = (y₂ − y₁) / (x₂ − x₁).',
    factVi: 'Hệ số góc qua hai điểm: m = (y₂ − y₁) / (x₂ − x₁).',
    why: 'Reconstructing it from "rise over run" is reliable but slow, and the reconstruction is where the subtraction gets reversed in one coordinate but not the other.',
    whyVi: 'Dựng lại từ "tăng chia chạy" thì chắc nhưng chậm, và chính lúc dựng lại là lúc phép trừ bị đảo ở một toạ độ mà không đảo ở toạ độ kia.',
    drill: { prompt: 'Slope through (−3, 5) and (1, −7)?', promptVi: 'Hệ số góc qua (−3, 5) và (1, −7)?', answer: '−3' },
    invokedBy: ['linear-equations-2var', 'linear-functions', 'two-variable-data'],
  },
  {
    id: 'mk_slope_std', section: 'math', area: 'algebra', cost: 20, frequency: 'most-modules', given: false,
    fact: 'For Ax + By = C the slope is −A/B and the y-intercept is C/B.',
    factVi: 'Với Ax + By = C thì hệ số góc là −A/B và tung độ gốc là C/B.',
    why: 'The alternative is rearranging to y = mx + b, which costs twenty seconds and creates one sign-error opportunity every time.',
    whyVi: 'Cách còn lại là biến đổi về y = mx + b, tốn hai mươi giây và mỗi lần lại tạo thêm một cơ hội sai dấu.',
    drill: { prompt: 'Slope of 5x − 2y = 9?', promptVi: 'Hệ số góc của 5x − 2y = 9?', answer: '5/2' },
    invokedBy: ['linear-equations-2var', 'linear-functions'],
  },
  {
    id: 'mk_perp', section: 'math', area: 'algebra', cost: 10, frequency: 'most-modules', given: false,
    fact: 'Perpendicular slopes are negative reciprocals: flip and negate. Parallel slopes are equal.',
    factVi: 'Hai đường vuông góc có hệ số góc nghịch đảo và trái dấu: LẬT rồi ĐỔI DẤU. Hai đường song song có hệ số góc bằng nhau.',
    why: 'Say it as two words — flip, negate — because the flip is visible on the page and the sign change is not, so only the flip gets checked.',
    whyVi: 'Hãy đọc thành hai chữ tách rời — LẬT, ĐỔI DẤU — vì phép lật hiện ra trên giấy còn việc đổi dấu thì không, nên chỉ phép lật được kiểm lại.',
    drill: { prompt: 'Perpendicular to slope −2/5?', promptVi: 'Vuông góc với hệ số góc −2/5?', answer: '5/2' },
    invokedBy: ['linear-functions', 'lines-angles-triangles'],
  },
  {
    id: 'mk_quadratic', section: 'math', area: 'algebra', cost: 25, frequency: 'most-modules', given: false,
    fact: 'x = (−b ± √(b² − 4ac)) / 2a.',
    factVi: 'x = (−b ± √(b² − 4ac)) / 2a.',
    why: 'A half-remembered quadratic formula is worse than none: the common corruptions put the 2a under only part of the numerator, and the error is invisible.',
    whyVi: 'Nhớ lơ mơ công thức nghiệm còn tệ hơn không nhớ: kiểu sai phổ biến là đặt 2a chỉ dưới một phần của tử số, và cái sai đó nhìn không ra.',
    drill: { prompt: 'Roots of x² − 5x + 6 = 0?', promptVi: 'Nghiệm của x² − 5x + 6 = 0?', answer: '2 and 3' },
    invokedBy: ['nonlinear-equations', 'nonlinear-functions'],
  },
  {
    id: 'mk_discriminant', section: 'math', area: 'algebra', cost: 20, frequency: 'most-modules', given: false,
    fact: 'b² − 4ac: positive means two real roots, zero means exactly one, negative means none.',
    factVi: 'b² − 4ac: dương thì hai nghiệm thực, bằng 0 thì đúng một nghiệm, âm thì vô nghiệm thực.',
    why: 'Every item phrased "exactly one solution", "no real solution" or "two distinct solutions" is this fact and nothing else. Recognising the phrasing converts the item into one equation.',
    whyVi: 'Mọi câu diễn đạt bằng "đúng một nghiệm", "vô nghiệm thực" hay "hai nghiệm phân biệt" đều chỉ là sự kiện này, không có gì khác. Nhận ra cách diễn đạt là biến cả câu thành một phương trình.',
    drill: { prompt: 'For what k does x² + kx + 9 = 0 have one solution, k > 0?', promptVi: 'Với k nào thì x² + kx + 9 = 0 có một nghiệm, k > 0?', answer: 'k = 6' },
    invokedBy: ['nonlinear-equations', 'nonlinear-functions'],
  },
  {
    id: 'mk_vieta', section: 'math', area: 'algebra', cost: 35, frequency: 'occasional', given: false,
    fact: 'For ax² + bx + c = 0 the roots sum to −b/a and multiply to c/a.',
    factVi: 'Với ax² + bx + c = 0 thì tổng hai nghiệm là −b/a và tích hai nghiệm là c/a.',
    why: 'Any item asking for the sum or product of solutions is answered without solving. Deriving it instead means finding both roots, which is thirty-five seconds when the answer needed no roots at all.',
    whyVi: 'Câu nào hỏi tổng hoặc tích các nghiệm đều trả lời được mà không cần giải. Không nhớ thì phải tìm cả hai nghiệm — ba mươi lăm giây cho một đáp án vốn không cần nghiệm nào.',
    drill: { prompt: 'Sum of the roots of 2x² − 7x + 3 = 0?', promptVi: 'Tổng các nghiệm của 2x² − 7x + 3 = 0?', answer: '7/2' },
    invokedBy: ['nonlinear-equations', 'equivalent-expressions'],
  },
  {
    id: 'mk_diff_squares', section: 'math', area: 'algebra', cost: 20, frequency: 'most-modules', given: false,
    fact: 'a² − b² = (a + b)(a − b). Also a² ± 2ab + b² = (a ± b)².',
    factVi: 'a² − b² = (a + b)(a − b). Và a² ± 2ab + b² = (a ± b)².',
    why: 'These are pattern recognition, not algebra. A candidate who sees the pattern factors in two seconds; one who does not starts a general factorisation that may not terminate quickly.',
    whyVi: 'Đây là NHẬN DẠNG mẫu, không phải đại số. Người thấy được mẫu thì phân tích trong hai giây; người không thấy sẽ bắt đầu một phép phân tích tổng quát có thể rất lâu mới xong.',
    drill: { prompt: 'Factor 49x² − 16.', promptVi: 'Phân tích 49x² − 16.', answer: '(7x + 4)(7x − 4)' },
    invokedBy: ['equivalent-expressions', 'nonlinear-equations'],
  },
  {
    id: 'mk_exponents', section: 'math', area: 'algebra', cost: 15, frequency: 'every-module', given: false,
    fact: 'xᵃ·xᵇ = xᵃ⁺ᵇ; xᵃ/xᵇ = xᵃ⁻ᵇ; (xᵃ)ᵇ = xᵃᵇ; x⁻ᵃ = 1/xᵃ; x⁰ = 1.',
    factVi: 'xᵃ·xᵇ = xᵃ⁺ᵇ; xᵃ/xᵇ = xᵃ⁻ᵇ; (xᵃ)ᵇ = xᵃᵇ; x⁻ᵃ = 1/xᵃ; x⁰ = 1.',
    why: 'The two that get confused are multiply-add and power-multiply. Testing them on 2² and 2³ takes five seconds and settles it, but only if you remember to test.',
    whyVi: 'Hai quy tắc hay lẫn nhau là "nhân thì cộng mũ" và "luỹ thừa của luỹ thừa thì nhân mũ". Thử với 2² và 2³ mất năm giây là xong, nhưng chỉ khi bạn nhớ ra phải thử.',
    drill: { prompt: 'Simplify (2x³)⁴ / (4x⁵).', promptVi: 'Rút gọn (2x³)⁴ / (4x⁵).', answer: '4x⁷' },
    invokedBy: ['equivalent-expressions', 'nonlinear-functions'],
  },
  {
    id: 'mk_radicals', section: 'math', area: 'algebra', cost: 20, frequency: 'most-modules', given: false,
    fact: 'x^(a/b) = ᵇ√(xᵃ). A fractional exponent is a root: the denominator is the root, the numerator is the power.',
    factVi: 'x^(a/b) = ᶜăn bậc b của xᵃ. Số mũ phân số chính là căn: MẪU là bậc căn, TỬ là số mũ.',
    why: 'Items switch between radical and exponent form specifically to test this. Without the conversion, half the expression is unreadable.',
    whyVi: 'Đề chuyển qua lại giữa dạng căn và dạng mũ chính là để kiểm tra điều này. Không đổi được thì một nửa biểu thức trở nên không đọc nổi.',
    drill: { prompt: 'Write ⁴√(x³) with a fractional exponent.', promptVi: 'Viết căn bậc 4 của x³ dưới dạng mũ phân số.', answer: 'x^(3/4)' },
    invokedBy: ['equivalent-expressions', 'nonlinear-equations'],
  },
  {
    id: 'mk_system_cases', section: 'math', area: 'algebra', cost: 30, frequency: 'most-modules', given: false,
    fact: 'A 2×2 system has infinitely many solutions when every ratio matches (a₁/a₂ = b₁/b₂ = c₁/c₂), and none when the coefficient ratios match but the constant ratio does not.',
    factVi: 'Hệ 2×2 có vô số nghiệm khi MỌI tỉ số bằng nhau (a₁/a₂ = b₁/b₂ = c₁/c₂), và vô nghiệm khi tỉ số các hệ số bằng nhau nhưng tỉ số hằng số thì khác.',
    why: 'These items look like systems to solve and are actually one proportion. Attempting to solve a system with an unknown coefficient wastes half a minute before the structure becomes visible.',
    whyVi: 'Những câu này trông như hệ phải giải nhưng thực ra chỉ là một tỉ lệ. Cố giải một hệ có hệ số chưa biết sẽ mất nửa phút trước khi nhìn ra cấu trúc.',
    drill: { prompt: '3x + ky = 12 and 6x + 10y = 24 has infinitely many solutions. k?', promptVi: '3x + ky = 12 và 6x + 10y = 24 có vô số nghiệm. k bằng?', answer: '5' },
    invokedBy: ['linear-systems', 'linear-equations-2var'],
  },
  {
    id: 'mk_abs', section: 'math', area: 'algebra', cost: 20, frequency: 'occasional', given: false,
    fact: '|x| = a gives x = a or x = −a. |x| < a gives −a < x < a. |x| > a gives x < −a or x > a.',
    factVi: '|x| = a cho x = a hoặc x = −a. |x| < a cho −a < x < a. |x| > a cho x < −a hoặc x > a.',
    why: 'The inequality directions are what get lost: "less than" gives one interval, "greater than" gives two. Recalling which is which beats re-reasoning it under a clock.',
    whyVi: 'Thứ hay bị quên là chiều của bất phương trình: "nhỏ hơn" cho MỘT khoảng, "lớn hơn" cho HAI khoảng. Nhớ sẵn cái nào ra cái nào tốt hơn ngồi suy lại khi đang bị bấm giờ.',
    drill: { prompt: 'Solve |2x − 6| < 4.', promptVi: 'Giải |2x − 6| < 4.', answer: '1 < x < 5' },
    invokedBy: ['linear-equations-1var', 'linear-inequalities'],
  },

  /* ---------------- Functions ---------------- */
  {
    id: 'mk_vertex', section: 'math', area: 'functions', cost: 30, frequency: 'most-modules', given: false,
    fact: 'a(x − h)² + k has vertex (h, k). The sign inside the bracket flips; the constant outside does not.',
    factVi: 'a(x − h)² + k có đỉnh (h, k). Dấu BÊN TRONG ngoặc thì đảo; hằng số BÊN NGOÀI thì không.',
    why: 'The vertex is the maximum or minimum, so any item about a highest point, lowest cost or optimal value is answered by reading, not by calculating.',
    whyVi: 'Đỉnh chính là giá trị lớn nhất hoặc nhỏ nhất, nên mọi câu hỏi về điểm cao nhất, chi phí thấp nhất hay giá trị tối ưu đều trả lời bằng cách ĐỌC, không phải bằng tính.',
    drill: { prompt: 'Vertex of y = −3(x + 4)² + 7?', promptVi: 'Đỉnh của y = −3(x + 4)² + 7?', answer: '(−4, 7)' },
    invokedBy: ['nonlinear-functions', 'equivalent-expressions'],
  },
  {
    id: 'mk_axis', section: 'math', area: 'functions', cost: 25, frequency: 'most-modules', given: false,
    fact: 'For y = ax² + bx + c the axis of symmetry is x = −b/2a, and the vertex sits on it.',
    factVi: 'Với y = ax² + bx + c thì trục đối xứng là x = −b/2a, và đỉnh nằm trên đó.',
    why: 'It converts standard form to vertex information without completing the square, which is the slowest routine in the section.',
    whyVi: 'Nó cho thông tin về đỉnh từ dạng chuẩn mà không cần hoàn thành bình phương — thao tác chậm nhất của phần thi này.',
    drill: { prompt: 'Axis of symmetry of y = 2x² − 12x + 5?', promptVi: 'Trục đối xứng của y = 2x² − 12x + 5?', answer: 'x = 3' },
    invokedBy: ['nonlinear-functions'],
  },
  {
    id: 'mk_forms', section: 'math', area: 'functions', cost: 25, frequency: 'most-modules', given: false,
    fact: 'Each quadratic form reveals one thing: standard gives the y-intercept, factored gives the roots, vertex gives the maximum or minimum.',
    factVi: 'Mỗi dạng của hàm bậc hai để lộ một thứ: dạng chuẩn cho giao điểm trục tung, dạng nhân tử cho nghiệm, dạng đỉnh cho giá trị lớn nhất hoặc nhỏ nhất.',
    why: 'The form the question hands you is a hint about what it wants. Converting between forms is usually the sign that the hint was missed.',
    whyVi: 'DẠNG mà đề trao cho bạn chính là gợi ý về điều nó muốn. Việc phải đổi dạng thường là dấu hiệu bạn đã bỏ lỡ gợi ý đó.',
    drill: { prompt: 'Which form shows the roots immediately?', promptVi: 'Dạng nào cho thấy nghiệm ngay lập tức?', answer: 'Factored form' },
    invokedBy: ['nonlinear-functions', 'equivalent-expressions'],
  },
  {
    id: 'mk_transform', section: 'math', area: 'functions', cost: 25, frequency: 'most-modules', given: false,
    fact: 'f(x − h) shifts right by h; f(x) + k shifts up by k; −f(x) reflects in the x-axis; f(−x) in the y-axis; af(x) stretches vertically.',
    factVi: 'f(x − h) dịch SANG PHẢI h đơn vị; f(x) + k dịch LÊN k đơn vị; −f(x) đối xứng qua trục hoành; f(−x) đối xứng qua trục tung; af(x) co giãn theo phương đứng.',
    why: 'The inside-the-bracket shift runs opposite to intuition and is the most common transformation error. Recall beats reasoning here because the reasoning is counter-intuitive every time.',
    whyVi: 'Phép dịch BÊN TRONG ngoặc chạy NGƯỢC với trực giác và là lỗi biến đổi phổ biến nhất. Ở đây nhớ sẵn thắng suy luận, vì lần nào suy luận cũng đi ngược trực giác.',
    drill: { prompt: 'How does y = f(x + 3) − 2 move the graph?', promptVi: 'y = f(x + 3) − 2 dịch đồ thị thế nào?', answer: 'Left 3, down 2' },
    invokedBy: ['nonlinear-functions', 'linear-functions'],
  },
  {
    id: 'mk_exp_growth', section: 'math', area: 'functions', cost: 30, frequency: 'most-modules', given: false,
    fact: 'Exponential change is y = a·bˣ. Growth of r% gives b = 1 + r/100; decay gives b = 1 − r/100; a is the starting value.',
    factVi: 'Thay đổi theo hàm mũ là y = a·bˣ. Tăng r% cho b = 1 + r/100; giảm cho b = 1 − r/100; a là giá trị ban đầu.',
    why: 'The distinction that decides these items is linear against exponential: a fixed amount per period is linear, a fixed percentage is exponential. Reading the wrong one models the wrong situation.',
    whyVi: 'Phân biệt quyết định các câu này là TUYẾN TÍNH hay HÀM MŨ: cố định một LƯỢNG mỗi kỳ là tuyến tính, cố định một PHẦN TRĂM là hàm mũ. Đọc nhầm là mô hình hoá nhầm cả tình huống.',
    drill: { prompt: 'A population of 800 falls 15% a year. Model?', promptVi: 'Dân số 800 giảm 15% mỗi năm. Mô hình?', answer: 'y = 800(0.85)ˣ' },
    invokedBy: ['nonlinear-functions', 'percentages'],
  },
  {
    id: 'mk_function_notation', section: 'math', area: 'functions', cost: 15, frequency: 'every-module', given: false,
    fact: 'f(3) = 7 means the point (3, 7) is on the graph. Solving f(x) = 7 asks for the x that produces 7.',
    factVi: 'f(3) = 7 nghĩa là điểm (3, 7) nằm trên đồ thị. Giải f(x) = 7 là tìm x nào cho ra 7.',
    why: 'Input and output get swapped constantly, and the swap produces a plausible wrong number rather than an obvious error.',
    whyVi: 'Đầu vào và đầu ra bị hoán đổi liên tục, mà sự hoán đổi đó cho ra một con số sai NGHE HỢP LÝ chứ không phải một lỗi lộ liễu.',
    drill: { prompt: 'If f(x) = 2x + 1, what is x when f(x) = 11?', promptVi: 'Nếu f(x) = 2x + 1, x bằng bao nhiêu khi f(x) = 11?', answer: '5' },
    invokedBy: ['nonlinear-functions', 'linear-functions'],
  },

  /* ---------------- Geometry ---------------- */
  {
    id: 'mk_special_tri', section: 'math', area: 'geometry', cost: 12, frequency: 'most-modules', given: true,
    fact: '30-60-90 sides are x, x√3, 2x. 45-45-90 sides are x, x, x√2.',
    factVi: 'Tam giác 30-60-90 có các cạnh x, x√3, 2x. Tam giác 45-45-90 có các cạnh x, x, x√2.',
    why: 'It is on the reference sheet, and reaching for the sheet costs ten seconds plus the cost of losing your place. Known cold, these items become arithmetic.',
    whyVi: 'Nó CÓ trên tờ công thức, nhưng với tay lấy tờ đó mất mười giây cộng với cái giá của việc mất mạch làm bài. Thuộc lòng thì những câu này chỉ còn là phép tính.',
    drill: { prompt: 'Hypotenuse of a 30-60-90 with short leg 5?', promptVi: 'Cạnh huyền của tam giác 30-60-90 có cạnh góc vuông ngắn bằng 5?', answer: '10' },
    invokedBy: ['right-triangles-trig', 'lines-angles-triangles', 'area-volume'],
  },
  {
    id: 'mk_similar', section: 'math', area: 'geometry', cost: 25, frequency: 'most-modules', given: false,
    fact: 'In similar figures, lengths scale by k, areas by k², volumes by k³.',
    factVi: 'Với các hình đồng dạng, độ dài nhân k, diện tích nhân k², thể tích nhân k³.',
    why: 'Scaling items are answered in three seconds with this and in forty without it. The squared and cubed factors are also where the intuitive answer is wrong.',
    whyVi: 'Câu về tỉ lệ trả lời trong ba giây nếu nhớ, và bốn mươi giây nếu không. Chính hệ số bình phương và lập phương là chỗ đáp án theo trực giác bị sai.',
    drill: { prompt: 'Two similar solids have lengths 2:5. Volume ratio?', promptVi: 'Hai khối đồng dạng có tỉ lệ độ dài 2:5. Tỉ lệ thể tích?', answer: '8:125' },
    invokedBy: ['lines-angles-triangles', 'right-triangles-trig'],
  },
  {
    id: 'mk_circle_eq', section: 'math', area: 'geometry', cost: 30, frequency: 'most-modules', given: false,
    fact: '(x − h)² + (y − k)² = r² has centre (h, k) and radius r. The form gives r², not r.',
    factVi: '(x − h)² + (y − k)² = r² có tâm (h, k) và bán kính r. Dạng này cho r², KHÔNG phải r.',
    why: 'The final square root is a step the working does not prompt, and r² is the number sitting on the page when the item asks for r.',
    whyVi: 'Phép căn cuối cùng là bước mà quá trình làm bài không tự nhắc, còn r² lại chính là con số đang nằm trên giấy khi đề hỏi r.',
    drill: { prompt: 'Radius of (x − 2)² + (y + 5)² = 49?', promptVi: 'Bán kính của (x − 2)² + (y + 5)² = 49?', answer: '7' },
    invokedBy: ['circles'],
  },
  {
    id: 'mk_arc', section: 'math', area: 'geometry', cost: 30, frequency: 'occasional', given: false,
    fact: 'Arc length = (θ/360)·2πr. Sector area = (θ/360)·πr². In radians, arc = rθ and sector = ½r²θ.',
    factVi: 'Độ dài cung = (θ/360)·2πr. Diện tích hình quạt = (θ/360)·πr². Theo radian: cung = rθ và quạt = ½r²θ.',
    why: 'Both are the whole circle scaled by the fraction of the turn. Holding it that way means one fact rather than four formulas.',
    whyVi: 'Cả hai đều là cả đường tròn nhân với PHẦN của vòng quay. Nhớ theo cách đó thì chỉ còn MỘT sự kiện thay vì bốn công thức.',
    drill: { prompt: 'Arc length for 60° on a circle of radius 12?', promptVi: 'Độ dài cung 60° trên đường tròn bán kính 12?', answer: '4π' },
    invokedBy: ['circles'],
  },
  {
    id: 'mk_inscribed', section: 'math', area: 'geometry', cost: 30, frequency: 'occasional', given: false,
    fact: 'An inscribed angle is half the central angle on the same arc. An angle inscribed in a semicircle is 90°.',
    factVi: 'Góc nội tiếp bằng NỬA góc ở tâm cùng chắn một cung. Góc nội tiếp chắn nửa đường tròn bằng 90°.',
    why: 'Without it a circle item has no way in at all — there is nothing to derive from, only a fact to know or not know.',
    whyVi: 'Không nhớ thì một câu về đường tròn hoàn toàn không có lối vào — chẳng có gì để suy ra, chỉ có một sự kiện biết hoặc không biết.',
    drill: { prompt: 'Central angle 80°. Inscribed angle on the same arc?', promptVi: 'Góc ở tâm 80°. Góc nội tiếp cùng chắn cung đó?', answer: '40°' },
    invokedBy: ['circles'],
  },
  {
    id: 'mk_polygon', section: 'math', area: 'geometry', cost: 25, frequency: 'occasional', given: false,
    fact: 'Interior angles of an n-sided polygon sum to (n − 2)·180°. Exterior angles always sum to 360°.',
    factVi: 'Tổng các góc trong của đa giác n cạnh là (n − 2)·180°. Tổng các góc ngoài LUÔN bằng 360°.',
    why: 'The exterior fact is the more useful of the two and the more often forgotten, because 360 for every polygon feels too simple to be right.',
    whyVi: 'Sự kiện về góc ngoài hữu ích hơn và cũng hay bị quên hơn, vì con số 360 cho MỌI đa giác nghe đơn giản đến mức khó tin là đúng.',
    drill: { prompt: 'Each interior angle of a regular hexagon?', promptVi: 'Mỗi góc trong của lục giác đều?', answer: '120°' },
    invokedBy: ['lines-angles-triangles'],
  },
  {
    id: 'mk_distance', section: 'math', area: 'geometry', cost: 15, frequency: 'most-modules', given: false,
    fact: 'Distance = √((x₂ − x₁)² + (y₂ − y₁)²). Midpoint = ((x₁ + x₂)/2, (y₁ + y₂)/2).',
    factVi: 'Khoảng cách = √((x₂ − x₁)² + (y₂ − y₁)²). Trung điểm = ((x₁ + x₂)/2, (y₁ + y₂)/2).',
    why: 'Distance is Pythagoras in coordinates, so it is derivable — but the derivation costs fifteen seconds an item and the items come in pairs.',
    whyVi: 'Công thức khoảng cách chính là Pythagoras trên toạ độ, nên suy ra được — nhưng việc suy ra tốn mười lăm giây mỗi câu, mà loại câu này thường đi thành cặp.',
    drill: { prompt: 'Distance from (1, 2) to (4, 6)?', promptVi: 'Khoảng cách từ (1, 2) tới (4, 6)?', answer: '5' },
    invokedBy: ['circles', 'lines-angles-triangles', 'linear-equations-2var'],
  },

  /* ---------------- Trigonometry ---------------- */
  {
    id: 'mk_sohcahtoa', section: 'math', area: 'trigonometry', cost: 15, frequency: 'most-modules', given: false,
    fact: 'sin = opposite/hypotenuse, cos = adjacent/hypotenuse, tan = opposite/adjacent.',
    factVi: 'sin = đối/huyền, cos = kề/huyền, tan = đối/kề.',
    why: 'Not knowing it makes a trigonometry item unanswerable rather than slow — there is no route in without it.',
    whyVi: 'Không nhớ thì một câu lượng giác không phải là chậm mà là KHÔNG LÀM ĐƯỢC — không có lối vào nào khác.',
    drill: { prompt: 'Opposite 7, hypotenuse 25. sin?', promptVi: 'Cạnh đối 7, cạnh huyền 25. sin bằng?', answer: '7/25' },
    invokedBy: ['right-triangles-trig'],
  },
  {
    id: 'mk_cofunction', section: 'math', area: 'trigonometry', cost: 40, frequency: 'occasional', given: false,
    fact: 'sin(A) = cos(90° − A) and cos(A) = sin(90° − A).',
    factVi: 'sin(A) = cos(90° − A) và cos(A) = sin(90° − A).',
    why: 'It turns a forty-second triangle construction into a five-second reading, and the construction is where the argument 90° − A gets forgotten.',
    whyVi: 'Nó biến việc dựng tam giác mất bốn mươi giây thành một cái đọc năm giây, mà chính lúc dựng tam giác là lúc đối số 90° − A bị quên mất.',
    drill: { prompt: 'sin(A) = 0.6. What is cos(90° − A)?', promptVi: 'sin(A) = 0,6. cos(90° − A) bằng?', answer: '0.6' },
    invokedBy: ['right-triangles-trig'],
  },
  {
    id: 'mk_pythag_id', section: 'math', area: 'trigonometry', cost: 30, frequency: 'occasional', given: false,
    fact: 'sin²θ + cos²θ = 1, so either ratio gives the other.',
    factVi: 'sin²θ + cos²θ = 1, nên biết tỉ số này là suy ra được tỉ số kia.',
    why: 'It gives one ratio from the other without building a triangle, which is the only fast route when the item supplies a decimal rather than side lengths.',
    whyVi: 'Nó cho tỉ số này từ tỉ số kia mà không cần dựng tam giác — lối đi nhanh duy nhất khi đề cho một số thập phân thay vì độ dài các cạnh.',
    drill: { prompt: 'cos θ = 0.8 and θ is acute. sin θ?', promptVi: 'cos θ = 0,8 và θ nhọn. sin θ bằng?', answer: '0.6' },
    invokedBy: ['right-triangles-trig'],
  },
  {
    id: 'mk_radians', section: 'math', area: 'trigonometry', cost: 20, frequency: 'occasional', given: true,
    fact: 'π radians = 180°. To convert, multiply by 180/π or by π/180.',
    factVi: 'π radian = 180°. Đổi qua lại bằng cách nhân với 180/π hoặc π/180.',
    why: 'The reference sheet gives 2π for a full circle, which is the same fact — but under time pressure the direction of the conversion is what gets inverted.',
    whyVi: 'Tờ công thức cho 2π cho cả vòng tròn, tức cùng một sự kiện — nhưng dưới áp lực thời gian, thứ bị đảo là CHIỀU của phép đổi.',
    drill: { prompt: 'Convert 5π/6 radians to degrees.', promptVi: 'Đổi 5π/6 radian sang độ.', answer: '150°' },
    invokedBy: ['right-triangles-trig', 'circles'],
  },

  /* ---------------- Data ---------------- */
  {
    id: 'mk_mean_sum', section: 'math', area: 'data', cost: 25, frequency: 'most-modules', given: false,
    fact: 'Sum = mean × count. Almost every mean item is solved by returning to the total.',
    factVi: 'Tổng = trung bình × số phần tử. Gần như mọi câu về trung bình đều giải được bằng cách quay về TỔNG.',
    why: 'Items that add, remove or change a value are unworkable in terms of the mean and trivial in terms of the total.',
    whyVi: 'Những câu thêm, bớt hoặc đổi một giá trị thì không xử lý được nếu nghĩ theo trung bình, mà lại hiển nhiên nếu nghĩ theo tổng.',
    drill: { prompt: '5 values average 12. A sixth value 30 is added. New mean?', promptVi: '5 giá trị có trung bình 12. Thêm giá trị thứ sáu là 30. Trung bình mới?', answer: '15' },
    invokedBy: ['one-variable-data'],
  },
  {
    id: 'mk_median_outlier', section: 'math', area: 'data', cost: 20, frequency: 'most-modules', given: false,
    fact: 'An outlier moves the mean and barely moves the median. Skew pulls the mean towards the tail.',
    factVi: 'Một giá trị ngoại lai kéo TRUNG BÌNH và gần như không kéo TRUNG VỊ. Độ lệch kéo trung bình về phía đuôi.',
    why: 'A gap between mean and median is the test telling you the data is skewed, and which way. Reading it saves examining the whole distribution.',
    whyVi: 'Khoảng cách giữa trung bình và trung vị chính là đề đang nói cho bạn biết dữ liệu bị lệch, và lệch về phía nào. Đọc được điều đó thì khỏi phải soi cả phân phối.',
    drill: { prompt: 'Mean 40, median 25. Which way is the data skewed?', promptVi: 'Trung bình 40, trung vị 25. Dữ liệu lệch về phía nào?', answer: 'Right (positively) skewed' },
    invokedBy: ['one-variable-data'],
  },
  {
    id: 'mk_sd', section: 'math', area: 'data', cost: 20, frequency: 'occasional', given: false,
    fact: 'Standard deviation measures spread, not centre. Two sets can share a mean and differ entirely in deviation.',
    factVi: 'Độ lệch chuẩn đo ĐỘ PHÂN TÁN, không đo tâm. Hai tập có thể cùng trung bình mà độ lệch khác hẳn nhau.',
    why: 'The SAT never asks you to compute it, only to compare two sets by eye. Knowing that means never starting a calculation the item did not want.',
    whyVi: 'SAT không bao giờ bắt tính nó, chỉ bắt so sánh hai tập bằng mắt. Biết điều đó là không bao giờ bắt đầu một phép tính mà đề không hề muốn.',
    drill: { prompt: '{10,10,10} versus {5,10,15}. Same mean — which has greater SD?', promptVi: '{10,10,10} so với {5,10,15}. Cùng trung bình — tập nào có độ lệch chuẩn lớn hơn?', answer: 'The second' },
    invokedBy: ['one-variable-data', 'statistical-claims'],
  },
  {
    id: 'mk_moe', section: 'math', area: 'data', cost: 25, frequency: 'most-modules', given: false,
    fact: 'A margin of error describes the step from the sample to the population, never back to the sample. A larger sample narrows it.',
    factVi: 'Sai số mô tả bước đi TỪ mẫu RA tổng thể, không bao giờ quay ngược vào mẫu. Mẫu lớn hơn thì sai số hẹp lại.',
    why: 'The sample was counted, so it carries no uncertainty. Applying the interval to it is the most common conceptual error in the whole data domain.',
    whyVi: 'Cái mẫu đã được ĐẾM nên không mang chút bất định nào. Áp khoảng sai số lên chính nó là lỗi khái niệm phổ biến nhất của cả mảng dữ liệu.',
    drill: { prompt: '62% ± 4 in a survey of 300. What does the interval describe?', promptVi: '62% ± 4 trong khảo sát 300 người. Khoảng đó mô tả cái gì?', answer: 'The population proportion' },
    invokedBy: ['inference-statistics', 'statistical-claims'],
  },
  {
    id: 'mk_causation', section: 'math', area: 'data', cost: 20, frequency: 'every-module', given: false,
    fact: 'Only random assignment supports a causal claim. Random selection supports generalisation. They are different words and different guarantees.',
    factVi: 'Chỉ có PHÂN NGẪU NHIÊN mới chống đỡ được khẳng định nhân quả. CHỌN ngẫu nhiên chống đỡ tính khái quát. Hai chữ khác nhau, hai bảo đảm khác nhau.',
    why: 'This single distinction decides more items across both sections than any formula, and both words appear in almost every study description.',
    whyVi: 'Riêng phân biệt này quyết định nhiều câu hơn bất kỳ công thức nào trên cả hai phần thi, và cả hai chữ đều xuất hiện trong gần như mọi đoạn mô tả nghiên cứu.',
    drill: { prompt: 'Volunteers chose their own group. Can the study show cause?', promptVi: 'Người tham gia tự chọn nhóm. Nghiên cứu có chỉ ra được nhân quả không?', answer: 'No' },
    invokedBy: ['statistical-claims', 'inference-statistics'],
  },
  {
    id: 'mk_prob_cond', section: 'math', area: 'data', cost: 25, frequency: 'most-modules', given: false,
    fact: 'A conditional probability narrows the denominator. "Given", "among" and "from those who" all name the new total.',
    factVi: 'Xác suất có điều kiện làm HẸP MẪU SỐ lại. "Biết rằng", "trong số" và "trong nhóm những người" đều nêu ra cái tổng mới.',
    why: 'Every conditional item supplies the unconditional total as a distractor, and it is the most-selected wrong answer in the skill.',
    whyVi: 'Mọi câu có điều kiện đều cài sẵn tổng thể không điều kiện làm phương án nhiễu, và đó là đáp án sai bị chọn nhiều nhất của kỹ năng này.',
    drill: { prompt: '120 study French, 40 of them also German. P(German | French)?', promptVi: '120 em học tiếng Pháp, 40 trong số đó học cả tiếng Đức. P(Đức | Pháp)?', answer: '1/3' },
    invokedBy: ['probability'],
  },
  {
    id: 'mk_pct_multiplier', section: 'math', area: 'data', cost: 25, frequency: 'every-module', given: false,
    fact: 'Percentage changes multiply. Up 25% then down 20% is ×1.25 × 0.80 = ×1.00, not +5%.',
    factVi: 'Các thay đổi phần trăm thì NHÂN với nhau. Tăng 25% rồi giảm 20% là ×1,25 × 0,80 = ×1,00, không phải +5%.',
    why: 'The second percentage is taken on a different base from the first, so adding them adds quantities that are not the same kind of thing.',
    whyVi: 'Phần trăm thứ hai được tính trên một GỐC khác với phần trăm thứ nhất, nên cộng chúng lại là cộng hai đại lượng không cùng loại.',
    drill: { prompt: 'A price rises 10% then falls 10%. Final versus original?', promptVi: 'Một mức giá tăng 10% rồi giảm 10%. So với ban đầu?', answer: '99% — lower' },
    invokedBy: ['percentages', 'ratios-rates-units'],
  },

  /* ---------------- Punctuation ---------------- */
  {
    id: 'mk_comma_uses', section: 'rw', area: 'punctuation', cost: 20, frequency: 'every-module', given: false,
    fact: 'A comma has four jobs: closing an introductory element, joining two clauses with a conjunction, separating list items, and enclosing a supplement — in a pair.',
    factVi: 'Dấu phẩy có bốn nhiệm vụ: đóng thành phần mở đầu, nối hai mệnh đề CÙNG một liên từ, ngăn cách các mục trong liệt kê, và ĐÓNG KHUNG một thành phần chú thêm — theo CẶP.',
    why: 'A comma is never a pause. Every conventions item is decided by whether the comma is doing one of these four jobs, and a comma doing none of them is wrong however natural it sounds.',
    whyVi: 'Dấu phẩy KHÔNG BAO GIỜ là chỗ nghỉ hơi. Mọi câu quy tắc đều được quyết bởi việc dấu phẩy có đang làm một trong bốn việc đó không, và dấu phẩy không làm việc nào thì SAI, dù đọc lên tự nhiên đến đâu.',
    drill: { prompt: 'May a comma separate a subject from its verb?', promptVi: 'Dấu phẩy có được tách chủ ngữ khỏi động từ không?', answer: 'Never' },
    invokedBy: ['boundaries', 'form-structure-sense'],
  },
  {
    id: 'mk_semicolon', section: 'rw', area: 'punctuation', cost: 15, frequency: 'every-module', given: false,
    fact: 'A semicolon needs an independent clause on both sides. So does a full stop. They are interchangeable on the test.',
    factVi: 'Dấu chấm phẩy cần một mệnh đề ĐỘC LẬP ở CẢ HAI bên. Dấu chấm cũng vậy. Trên đề, hai dấu này thay thế được cho nhau.',
    why: 'Knowing they are interchangeable means an option offering both is offering the same answer twice — which is itself the signal that neither is right.',
    whyVi: 'Biết chúng thay thế được cho nhau nghĩa là khi đề đưa ra cả hai thì nó đang đưa CÙNG một đáp án hai lần — và chính điều đó báo hiệu rằng cả hai đều sai.',
    drill: { prompt: 'Two options give a semicolon and a full stop in the same slot. What follows?', promptVi: 'Hai phương án cho dấu chấm phẩy và dấu chấm ở cùng một chỗ. Suy ra điều gì?', answer: 'Both are wrong' },
    invokedBy: ['boundaries'],
  },
  {
    id: 'mk_colon', section: 'rw', area: 'punctuation', cost: 15, frequency: 'most-modules', given: false,
    fact: 'A colon must follow a complete clause. What comes after it may be a list, an explanation or a single word.',
    factVi: 'Dấu hai chấm phải đứng SAU một mệnh đề hoàn chỉnh. Thứ đứng sau nó có thể là một danh sách, một lời giải thích, hay chỉ một từ.',
    why: 'The rule is entirely about what precedes the colon. Candidates check what follows it, which is the half that is unconstrained.',
    whyVi: 'Quy tắc này hoàn toàn nói về thứ đứng TRƯỚC dấu hai chấm. Thí sinh lại đi kiểm thứ đứng SAU — đúng cái nửa không bị ràng buộc gì.',
    drill: { prompt: '"The kit contains, including: a mirror." Correct?', promptVi: '"The kit contains, including: a mirror." Đúng không?', answer: 'No — a colon never follows "including"' },
    invokedBy: ['boundaries'],
  },
  {
    id: 'mk_dash_pair', section: 'rw', area: 'punctuation', cost: 15, frequency: 'most-modules', given: false,
    fact: 'Marks that enclose a supplement must match: comma with comma, dash with dash, bracket with bracket.',
    factVi: 'Các dấu ĐÓNG KHUNG một thành phần chú thêm phải KHỚP CẶP: phẩy với phẩy, gạch ngang với gạch ngang, ngoặc với ngoặc.',
    why: 'Half the boundaries items at the hard band are decided by looking at the mark on the other side of the supplement, which most candidates never look at.',
    whyVi: 'Một nửa số câu boundaries ở band khó được quyết bằng việc nhìn cái dấu ở PHÍA BÊN KIA của thành phần chú thêm — thứ mà phần lớn thí sinh không hề nhìn tới.',
    drill: { prompt: 'A supplement opens with a dash. What must close it?', promptVi: 'Một thành phần chú thêm mở bằng gạch ngang. Phải đóng bằng gì?', answer: 'A dash' },
    invokedBy: ['boundaries'],
  },
  {
    id: 'mk_apostrophe', section: 'rw', area: 'punctuation', cost: 15, frequency: 'most-modules', given: false,
    fact: 'Singular possessive adds ’s; plural possessive already ending in s adds only ’. Its is possessive; it’s means it is.',
    factVi: 'Sở hữu số ít thêm ’s; sở hữu số nhiều đã có sẵn s thì chỉ thêm ’. "Its" là sở hữu; "it’s" là "it is".',
    why: 'These four forms are a closed set and they recur every module. Deciding them by ear fails because all four sound identical.',
    whyVi: 'Bốn dạng này là một tập ĐÓNG và lặp lại ở mọi module. Quyết bằng tai thì sai, vì cả bốn phát âm giống hệt nhau.',
    drill: { prompt: 'The notebooks of three naturalists — how is it written?', promptVi: 'Sổ tay của ba nhà tự nhiên học — viết thế nào?', answer: 'the naturalists’ notebooks' },
    invokedBy: ['form-structure-sense'],
  },

  /* ---------------- Grammar ---------------- */
  {
    id: 'mk_sv_agreement', section: 'rw', area: 'grammar', cost: 15, frequency: 'every-module', given: false,
    fact: 'A verb agrees with its subject, never with a noun inside a prepositional phrase or relative clause between them.',
    factVi: 'Động từ hợp với CHỦ NGỮ, không bao giờ hợp với danh từ nằm trong cụm giới từ hay mệnh đề quan hệ chen giữa.',
    why: 'The interrupting noun is placed there deliberately and it is always the wrong number. Deleting the middle and reading the skeleton settles every one of these.',
    whyVi: 'Danh từ chen giữa được đặt ở đó có chủ ý và LUÔN sai số. Xoá phần giữa rồi đọc bộ xương là giải quyết được mọi câu loại này.',
    drill: { prompt: '"The archive of letters ___ been digitised." has or have?', promptVi: '"The archive of letters ___ been digitised." dùng has hay have?', answer: 'has' },
    invokedBy: ['form-structure-sense'],
  },
  {
    id: 'mk_neither_nor', section: 'rw', area: 'grammar', cost: 15, frequency: 'most-modules', given: false,
    fact: 'With neither…nor and either…or, the verb agrees with the nearer subject. "Along with" and "as well as" do not make a subject compound.',
    factVi: 'Với "neither…nor" và "either…or", động từ hợp với chủ ngữ GẦN NHẤT. "Along with" và "as well as" KHÔNG làm chủ ngữ thành số nhiều.',
    why: 'Both are traps built on the same instinct — that anything joining two nouns must make them plural — and only "and" actually does.',
    whyVi: 'Cả hai đều là bẫy dựng trên cùng một bản năng — rằng cái gì nối hai danh từ cũng làm chúng thành số nhiều — trong khi chỉ có "and" mới thật sự làm vậy.',
    drill: { prompt: '"The committee, along with the subcommittees, ___ meeting." is or are?', promptVi: '"The committee, along with the subcommittees, ___ meeting." dùng is hay are?', answer: 'is' },
    invokedBy: ['form-structure-sense'],
  },
  {
    id: 'mk_modifier', section: 'rw', area: 'grammar', cost: 20, frequency: 'most-modules', given: false,
    fact: 'An opening participial phrase modifies whatever noun follows the comma. Nothing else.',
    factVi: 'Cụm phân từ mở đầu bổ nghĩa cho danh từ NGAY SAU dấu phẩy. Không cho thứ gì khác.',
    why: 'It is a mechanical rule with no exceptions, so the item is decided by reading two words — the ones just after the comma — rather than the whole option.',
    whyVi: 'Đây là quy tắc máy móc không có ngoại lệ, nên câu hỏi được quyết bằng cách đọc HAI CHỮ — hai chữ ngay sau dấu phẩy — chứ không phải đọc cả phương án.',
    drill: { prompt: '"Trained as a botanist, ___" What must follow?', promptVi: '"Trained as a botanist, ___" phải theo sau là gì?', answer: 'A person' },
    invokedBy: ['form-structure-sense'],
  },
  {
    id: 'mk_parallel', section: 'rw', area: 'grammar', cost: 20, frequency: 'most-modules', given: false,
    fact: 'Items in a series and both arms of a comparison must share a grammatical form. Find the first arm and match it.',
    factVi: 'Các mục trong một liệt kê và cả hai vế của một phép so sánh phải cùng HÌNH THỨC ngữ pháp. Tìm vế thứ nhất rồi khớp theo nó.',
    why: 'In "less on X than on Y" the preposition governs both, so the form of Y is fixed by X before meaning is considered at all.',
    whyVi: 'Trong "less on X than on Y", giới từ chi phối cả hai, nên hình thức của Y bị X quy định TRƯỚC khi xét tới nghĩa.',
    drill: { prompt: '"depends less on the sensitivity than on ___ the sample" — which form?', promptVi: '"depends less on the sensitivity than on ___ the sample" — dùng dạng nào?', answer: 'A gerund: holding' },
    invokedBy: ['form-structure-sense', 'rhetorical-synthesis'],
  },
  {
    id: 'mk_tense_frame', section: 'rw', area: 'grammar', cost: 20, frequency: 'most-modules', given: false,
    fact: 'An action completed before a past reference point takes the past perfect. A fixed past date takes the simple past, never the present perfect.',
    factVi: 'Hành động hoàn tất TRƯỚC một mốc quá khứ thì dùng quá khứ hoàn thành. Một mốc thời gian quá khứ xác định thì dùng quá khứ đơn, KHÔNG dùng hiện tại hoàn thành.',
    why: 'The passage always supplies the reference point — "by the time", "when they arrived", "in 1887" — so the tense is chosen from the sentence rather than from feel.',
    whyVi: 'Bài luôn cung cấp sẵn mốc quy chiếu — "by the time", "when they arrived", "in 1887" — nên thì được chọn TỪ CÂU VĂN chứ không phải theo cảm giác.',
    drill: { prompt: '"By 1931 the bank ___ the same collateral four times." Which tense?', promptVi: '"By 1931 the bank ___ the same collateral four times." Dùng thì nào?', answer: 'Past perfect: had pledged' },
    invokedBy: ['form-structure-sense'],
  },
  {
    id: 'mk_transition_families', section: 'rw', area: 'grammar', cost: 25, frequency: 'every-module', given: false,
    fact: 'Transitions come in five families: result, contrast, addition, example, sequence. Name the relation before reading the options.',
    factVi: 'Từ nối chia làm năm họ: KẾT QUẢ, TƯƠNG PHẢN, BỔ SUNG, VÍ DỤ, TRÌNH TỰ. Hãy gọi tên quan hệ TRƯỚC khi đọc phương án.',
    why: 'Every wrong transition reads smoothly in the gap — that is how it was chosen as a distractor. Naming the relation first is the only method that is not defeated by smoothness.',
    whyVi: 'Mọi từ nối SAI đều đọc lên rất trôi ở chỗ trống — nó được chọn làm nhiễu chính vì thế. Gọi tên quan hệ trước là phương pháp DUY NHẤT không bị sự trôi chảy đánh bại.',
    drill: { prompt: 'A sentence offering an alternative explanation for the same number — which family?', promptVi: 'Một câu đưa ra cách giải thích khác cho cùng con số — thuộc họ nào?', answer: 'Contrast' },
    invokedBy: ['transitions'],
  },
];

/* ------------------------------------------------------------------ */

export interface MustKnowStats {
  total: number;
  /** Entries the official reference sheet supplies. */
  given: number;
  /** Entries the candidate must carry in their head. */
  mustCarry: number;
  /** Seconds a full sitting would lose, deriving instead of recalling. */
  costIfDerived: number;
  byArea: Record<KnowledgeArea, number>;
}

export function mustKnowStats(): MustKnowStats {
  const byArea = {} as Record<KnowledgeArea, number>;
  for (const fact of MUST_KNOW) byArea[fact.area] = (byArea[fact.area] ?? 0) + 1;

  return {
    total: MUST_KNOW.length,
    given: MUST_KNOW.filter((f) => f.given).length,
    mustCarry: MUST_KNOW.filter((f) => !f.given).length,
    // Only what recurs every module is counted: a fact met once a sitting is
    // not where a candidate's time actually goes.
    costIfDerived: MUST_KNOW.filter((f) => f.frequency === 'every-module').reduce(
      (n, f) => n + f.cost,
      0,
    ),
    byArea,
  };
}

export function mustKnowFor(area: KnowledgeArea): MustKnowFact[] {
  return MUST_KNOW.filter((f) => f.area === area);
}

/** Highest-cost facts first — where memorising pays back fastest. */
export function byPayback(): MustKnowFact[] {
  const weight: Record<Frequency, number> = { 'every-module': 3, 'most-modules': 2, occasional: 1 };
  return [...MUST_KNOW].sort((a, b) => b.cost * weight[b.frequency] - a.cost * weight[a.frequency]);
}
