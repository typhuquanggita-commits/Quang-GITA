/**
 * Expert worked solutions — Mathematics.
 *
 * The same four fields as the Reading and Writing set, and the same reason for
 * them: at the top of the scale the method is already known, and what
 * separates candidates is the decision the method does not make.
 *
 * Two things are specific to this section.
 *
 * The wrong turn in Maths is usually not an arithmetic slip. It is a correct
 * procedure applied to a question that did not ask for it — solving for x when
 * the question wanted 3x, finding the vertex when the question wanted the
 * intercept, or answering the quantity the working naturally produces rather
 * than the one the sentence named. The wrong options are built from those,
 * which is why a candidate can do every line correctly and still lose the
 * item.
 *
 * And the fastest route is frequently not the taught one. Where testing a
 * value beats solving, or where reading a form beats expanding it, the
 * solution says so and gives the timing, because a correct method that takes
 * three minutes is a wrong answer somewhere else on the paper.
 */

import type { ExpertSolution } from './solutions.ts';

export const SOLUTIONS_MATH: ExpertSolution[] = [
  {
    id: 'sol_lin1_1', skill: 'linear-equations-1var', section: 'math', band: 'hard', seconds: 60,
    prompt: 'If 4(3x − 7) + 9 = 5(2x + 1) − 4x, what is the value of 6x + 5?',
    choices: [
      { id: 'A', text: '17' },
      { id: 'B', text: '29' },
      { id: 'C', text: '2' },
      { id: 'D', text: '11' },
    ],
    answer: 'B',
    read: 'The question asks for 6x + 5, not for x. Underline that before touching the algebra — the whole item is built on candidates who solve correctly and then answer the wrong quantity.',
    readVi: 'Câu hỏi yêu cầu 6x + 5, KHÔNG phải x. Gạch chân điều đó trước khi động vào phép biến đổi — cả câu này được dựng trên những thí sinh giải đúng rồi trả lời nhầm đại lượng.',
    steps: [
      {
        act: 'Expand both sides once, carefully: 12x − 28 + 9 = 10x + 5 − 4x, so 12x − 19 = 6x + 5.',
        actVi: 'Khai triển hai vế một lần, cẩn thận: 12x − 28 + 9 = 10x + 5 − 4x, tức là 12x − 19 = 6x + 5.',
        why: 'Expanding fully before collecting avoids the sign error that arises when a negative is distributed in the head.',
        whyVi: 'Khai triển hết rồi mới gộp sẽ tránh được lỗi dấu vốn hay xảy ra khi nhân phân phối một số âm trong đầu.',
      },
      {
        act: 'Stop and look at what you have written. The right-hand side is already 6x + 5 — the quantity the question asked for.',
        actVi: 'Dừng lại nhìn thứ mình vừa viết. Vế phải ĐÃ LÀ 6x + 5 — chính đại lượng mà câu hỏi cần.',
        why: 'So 6x + 5 = 12x − 19 and the answer follows from x alone: solving 6x = 24 gives x = 4, and 6(4) + 5 = 29. The item was designed so that the wanted expression appears mid-working, which is a signal, not a coincidence.',
        whyVi: 'Vậy 6x + 5 = 12x − 19, và đáp án suy ra từ x: giải 6x = 24 được x = 4, rồi 6(4) + 5 = 29. Đề được thiết kế để biểu thức cần tìm XUẤT HIỆN GIỮA CHỪNG lời giải — đó là tín hiệu, không phải trùng hợp.',
      },
    ],
    wrongTurn: {
      path: 'C is x itself. A candidate expands, collects, finds 6x = 24, divides, gets 4 — and then sees no 4 among the options, so re-reads and takes the nearest plausible number. Under time pressure many take C because 2 "looks like a solved value".',
      pathVi: 'C chính là giá trị x. Thí sinh khai triển, gộp, ra 6x = 24, chia, được 4 — rồi không thấy số 4 trong các phương án nên đọc lại và chọn con số nghe hợp lý nhất. Dưới áp lực thời gian, nhiều người chọn C vì số 2 "trông giống một giá trị đã giải ra".',
      breaks: 'The failure is not arithmetic; it is that the question was read once, at the start, and never again. The Digital SAT asks for a compound expression rather than for x in a large fraction of linear items precisely because that habit is so reliable. Re-reading the question after the working is a two-second act that recovers the whole item.',
      breaksVi: 'Lỗi ở đây không phải số học; lỗi là câu hỏi chỉ được đọc MỘT LẦN, lúc đầu, và không bao giờ đọc lại. Digital SAT hỏi một biểu thức tổ hợp thay vì hỏi x ở rất nhiều câu tuyến tính chính vì thói quen đó quá đáng tin cậy. Đọc lại câu hỏi sau khi làm xong chỉ tốn hai giây và cứu được cả câu.',
    },
    transfer: 'Before solving any linear equation, circle the quantity asked for. If it is not x, write it at the top of your working. Roughly one linear item per module asks for something other than x.',
    transferVi: 'Trước khi giải bất kỳ phương trình bậc nhất nào, hãy khoanh ĐẠI LƯỢNG được hỏi. Nếu đó không phải x, viết nó lên đầu bài làm. Trung bình mỗi module có khoảng một câu tuyến tính hỏi thứ khác ngoài x.',
  },
  {
    id: 'sol_lin2_1', skill: 'linear-equations-2var', section: 'math', band: 'hard', seconds: 70,
    prompt:
      'A line in the xy-plane passes through (−2, 7) and is perpendicular to the line 3x + 4y = 12. Which equation represents the line?',
    choices: [
      { id: 'A', text: 'y = (4/3)x + 29/3' },
      { id: 'B', text: 'y = −(3/4)x + 11/2' },
      { id: 'C', text: 'y = (3/4)x + 17/2' },
      { id: 'D', text: 'y = −(4/3)x + 13/3' },
    ],
    answer: 'A',
    read: 'Two facts to satisfy: a slope condition and a point. Options can usually be cut on slope alone in about ten seconds, which leaves one arithmetic check rather than four.',
    readVi: 'Hai điều kiện phải thoả: hệ số góc và một điểm đi qua. Thường có thể loại bớt phương án chỉ bằng hệ số góc trong khoảng mười giây, còn lại đúng một phép kiểm số học thay vì bốn.',
    steps: [
      {
        act: 'Get the given slope without rearranging: for Ax + By = C the slope is −A/B, so −3/4.',
        actVi: 'Lấy hệ số góc của đường đã cho mà không cần biến đổi: với Ax + By = C thì hệ số góc là −A/B, tức −3/4.',
        why: 'Rearranging to y = mx + b costs twenty seconds and introduces a sign error opportunity. The −A/B form is worth memorising for exactly this.',
        whyVi: 'Biến đổi về dạng y = mx + b tốn hai mươi giây và tạo thêm một cơ hội sai dấu. Công thức −A/B đáng thuộc lòng đúng vì việc này.',
      },
      {
        act: 'Perpendicular slope is the negative reciprocal: +4/3. Two options remain.',
        actVi: 'Hệ số góc vuông góc là nghịch đảo và đổi dấu: +4/3. Chỉ còn hai phương án.',
        why: 'Both the sign and the reciprocal must flip. Flipping only one is the error the distractors are built from.',
        whyVi: 'Phải đổi CẢ dấu LẪN nghịch đảo. Chỉ đổi một trong hai chính là lỗi mà các phương án nhiễu được dựng lên từ đó.',
      },
      {
        act: 'Substitute the point rather than deriving the intercept: 7 = (4/3)(−2) + b gives b = 7 + 8/3 = 29/3.',
        actVi: 'Thay điểm vào thay vì đi tìm tung độ gốc: 7 = (4/3)(−2) + b, được b = 7 + 8/3 = 29/3.',
        why: 'With one option left on slope, substitution is a confirmation and not a derivation — faster, and it catches a mis-copied coordinate.',
        whyVi: 'Khi chỉ còn một phương án theo hệ số góc, việc thay số là XÁC NHẬN chứ không phải suy ra — nhanh hơn, và nó bắt được lỗi chép nhầm toạ độ.',
      },
    ],
    wrongTurn: {
      path: 'D has slope −4/3. The candidate correctly takes the reciprocal of −3/4 and gets −4/3, which feels like the whole operation because the fraction has visibly inverted.',
      pathVi: 'D có hệ số góc −4/3. Thí sinh lấy đúng nghịch đảo của −3/4 và ra −4/3, và cảm giác như đã làm xong vì phân số rõ ràng đã bị lật.',
      breaks: 'Negative reciprocal is two operations, and the visible one is the reciprocal. The sign change leaves no trace on the page, so nothing prompts a check. Saying "flip and negate" aloud, as two words, is what keeps both.',
      breaksVi: '"Nghịch đảo âm" là HAI thao tác, mà thao tác nhìn thấy được chỉ là nghịch đảo. Việc đổi dấu không để lại dấu vết nào trên giấy nên chẳng có gì nhắc phải kiểm. Đọc thành tiếng "lật rồi đổi dấu" như hai chữ tách rời là cách giữ được cả hai.',
    },
    transfer: 'Perpendicular means flip and negate — count it as two operations, not one. And read slope straight off Ax + By = C as −A/B rather than rearranging.',
    transferVi: 'Vuông góc nghĩa là LẬT rồi ĐỔI DẤU — hãy đếm là hai thao tác, không phải một. Và đọc thẳng hệ số góc từ Ax + By = C là −A/B thay vì đi biến đổi.',
  },
  {
    id: 'sol_linf_1', skill: 'linear-functions', section: 'math', band: 'hard', seconds: 65,
    prompt:
      'A machine’s value V, in millions of dong, is modelled by V(t) = 480 − 36t, where t is the number of years since purchase. Which statement is the best interpretation of the number 36 in this context?',
    choices: [
      { id: 'A', text: 'The machine loses 36 million dong of value each year.' },
      { id: 'B', text: 'The machine was worth 36 million dong when purchased.' },
      { id: 'C', text: 'The machine will be worthless after 36 years.' },
      { id: 'D', text: 'The machine loses 36% of its value each year.' },
    ],
    answer: 'A',
    read: 'An interpretation item. The answer is fixed before you read the options by naming the units of the coefficient: 36 sits beside t, so its units are millions of dong per year — a rate.',
    readVi: 'Câu hỏi diễn giải. Đáp án được chốt trước khi đọc phương án, bằng cách gọi tên ĐƠN VỊ của hệ số: 36 đứng cạnh t, nên đơn vị của nó là triệu đồng trên năm — một TỐC ĐỘ.',
    steps: [
      {
        act: 'Attach units to the coefficient. V is in millions of dong, t in years, so 36 is millions of dong per year.',
        actVi: 'Gắn đơn vị cho hệ số. V tính bằng triệu đồng, t tính bằng năm, nên 36 là triệu đồng mỗi năm.',
        why: 'Units settle interpretation items with no interpretation required. A quantity in dong-per-year cannot be a starting value, a duration, or a percentage.',
        whyVi: 'Đơn vị giải quyết câu diễn giải mà không cần diễn giải gì cả. Một đại lượng đo bằng đồng-trên-năm thì không thể là giá trị ban đầu, không thể là khoảng thời gian, cũng không thể là phần trăm.',
      },
      {
        act: 'Note the minus sign in the model, and carry it into the wording: decreasing, not increasing.',
        actVi: 'Ghi nhận dấu trừ trong mô hình, và mang nó vào cách diễn đạt: GIẢM chứ không tăng.',
        why: 'The coefficient is 36 but the term is −36t. An option describing a gain would be wrong on direction alone.',
        whyVi: 'Hệ số là 36 nhưng số hạng là −36t. Một phương án mô tả sự TĂNG sẽ sai ngay ở chiều.',
      },
    ],
    wrongTurn: {
      path: 'D is the most-chosen wrong answer at this band. Depreciation in the real world is usually a percentage, most textbook depreciation problems are exponential, and a reader supplies that background without noticing.',
      pathVi: 'D là đáp án sai bị chọn nhiều nhất ở band này. Khấu hao ngoài đời thường tính theo phần trăm, phần lớn bài khấu hao trong sách là hàm mũ, và người đọc tự cấp cái nền đó vào mà không hay biết.',
      breaks: 'A percentage loss would make the model exponential — V(t) = 480(0.64)^t — and the model given is linear. The distractor works by importing a fact about the world into a question about an equation. What the equation says overrides what depreciation usually does.',
      breaksVi: 'Mất theo phần trăm sẽ khiến mô hình thành hàm mũ — V(t) = 480(0,64)^t — trong khi mô hình đã cho là TUYẾN TÍNH. Phương án nhiễu hoạt động bằng cách nhập một kiến thức về thế giới thực vào một câu hỏi về PHƯƠNG TRÌNH. Phương trình nói gì thì thắng, bất kể khấu hao ngoài đời thường ra sao.',
    },
    transfer: 'On any interpretation item, write the units of the number before reading the options. Units answer the question; intuition about the scenario is what the distractors are made of.',
    transferVi: 'Với mọi câu diễn giải, hãy viết ĐƠN VỊ của con số trước khi đọc phương án. Đơn vị trả lời câu hỏi; còn trực giác về tình huống chính là chất liệu làm nên các phương án nhiễu.',
  },
  {
    id: 'sol_lsys_1', skill: 'linear-systems', section: 'math', band: 'hard', seconds: 60,
    prompt:
      'The system 6x + ky = 18 and 9x + 12y = 27 has infinitely many solutions. What is the value of k?',
    choices: [
      { id: 'A', text: '8' },
      { id: 'B', text: '18' },
      { id: 'C', text: '6' },
      { id: 'D', text: '9' },
    ],
    answer: 'A',
    read: 'Infinitely many solutions means the two equations are the same line, so every coefficient scales by one factor. Find the factor from the pair you can see and apply it to the pair you cannot.',
    readVi: 'Vô số nghiệm nghĩa là hai phương trình cùng một đường thẳng, nên MỌI hệ số đều nhân với cùng một tỉ số. Tìm tỉ số từ cặp nhìn thấy được rồi áp cho cặp chưa biết.',
    steps: [
      {
        act: 'Take the ratio from the x terms and the constants: 6/9 = 2/3, and 18/27 = 2/3. Consistent.',
        actVi: 'Lấy tỉ số từ hệ số của x và từ hằng số: 6/9 = 2/3, và 18/27 = 2/3. Nhất quán.',
        why: 'Checking two ratios before using them confirms the system really is proportional. If they disagreed, the answer would be "no such k" and the item would be a different one.',
        whyVi: 'Kiểm hai tỉ số trước khi dùng để xác nhận hệ thực sự tỉ lệ. Nếu chúng lệch nhau thì đáp án sẽ là "không tồn tại k" và đề đã là một câu khác.',
      },
      {
        act: 'Apply the same ratio to the y terms: k/12 = 2/3, so k = 8.',
        actVi: 'Áp đúng tỉ số đó cho hệ số của y: k/12 = 2/3, nên k = 8.',
        why: 'One equation, one unknown, no system to solve. Recognising the structure removes the algebra entirely.',
        whyVi: 'Một phương trình, một ẩn, không phải giải hệ nào cả. Nhận ra cấu trúc là xoá sạch phần đại số.',
      },
    ],
    wrongTurn: {
      path: 'B comes from setting the ratio the other way up: 12/k = 2/3 gives k = 18. The candidate has the right idea, the right ratio, and inverts one fraction.',
      pathVi: 'B đến từ việc lập tỉ số ngược: 12/k = 2/3 cho k = 18. Thí sinh có đúng ý tưởng, đúng tỉ số, và chỉ lật ngược một phân số.',
      breaks: 'Direction is fixed by which equation is on top elsewhere. The x ratio was taken as first-over-second (6/9), so the y ratio must be first-over-second too (k/12). Writing the two ratios one under the other, in the same order, makes the inversion impossible — and takes no extra time.',
      breaksVi: 'Chiều của tỉ số bị ràng buộc bởi việc ở chỗ khác bạn đã đặt phương trình nào lên trên. Tỉ số của x lấy là "trên chia dưới" (6/9), nên tỉ số của y cũng phải là "trên chia dưới" (k/12). Viết hai tỉ số ngay dưới nhau, cùng thứ tự, thì không thể lật nhầm — và không tốn thêm giây nào.',
    },
    transfer: 'Infinitely many solutions means every ratio equal; no solution means the coefficient ratios equal but the constant ratio different. Write the ratios in a fixed order and both cases become one look.',
    transferVi: 'Vô số nghiệm nghĩa là MỌI tỉ số bằng nhau; vô nghiệm nghĩa là tỉ số các hệ số bằng nhau nhưng tỉ số hằng số thì khác. Viết các tỉ số theo một thứ tự cố định thì cả hai trường hợp chỉ còn là một cái nhìn.',
  },
  {
    id: 'sol_lineq_1', skill: 'linear-inequalities', section: 'math', band: 'hard', seconds: 70,
    prompt:
      'A delivery van can carry no more than 900 kg. It is loaded with x crates of 40 kg and y crates of 25 kg, and the driver must carry at least 30 crates in total. Which system represents the situation?',
    choices: [
      { id: 'A', text: '40x + 25y ≤ 900 and x + y ≥ 30' },
      { id: 'B', text: '40x + 25y ≥ 900 and x + y ≤ 30' },
      { id: 'C', text: '40x + 25y ≤ 900 and 40x + 25y ≥ 30' },
      { id: 'D', text: '65(x + y) ≤ 900 and x + y ≥ 30' },
    ],
    answer: 'A',
    read: 'Two constraints in two different units. Weight is in kilograms and count is in crates, so the two inequalities cannot share a left-hand side — checking units alone eliminates two options.',
    readVi: 'Hai ràng buộc ở hai ĐƠN VỊ khác nhau. Khối lượng tính bằng kilôgam, số lượng tính bằng thùng, nên hai bất phương trình không thể dùng chung một vế trái — chỉ riêng việc kiểm đơn vị đã loại được hai phương án.',
    steps: [
      {
        act: 'Translate each phrase separately. "No more than 900 kg" is ≤ 900 on a weight expression; "at least 30 crates" is ≥ 30 on a count.',
        actVi: 'Dịch từng cụm riêng ra. "Không quá 900 kg" là ≤ 900 áp lên biểu thức KHỐI LƯỢNG; "ít nhất 30 thùng" là ≥ 30 áp lên SỐ LƯỢNG.',
        why: '"No more than" is ≤ and "at least" is ≥, and these are the two phrases the section reuses constantly. Translating them one at a time prevents the pair being swapped.',
        whyVi: '"Không quá" là ≤ và "ít nhất" là ≥ — hai cụm mà phần thi dùng đi dùng lại liên tục. Dịch từng cụm một sẽ tránh việc hoán đổi cặp này.',
      },
      {
        act: 'Check the units of each left-hand side against the number on the right.',
        actVi: 'Kiểm ĐƠN VỊ của mỗi vế trái so với con số ở vế phải.',
        why: '40x + 25y is kilograms; comparing it to 30 crates is meaningless, which removes C without any thought about the scenario.',
        whyVi: '40x + 25y là kilôgam; đem so với 30 thùng là vô nghĩa, và điều đó loại C mà không cần suy nghĩ gì về tình huống.',
      },
    ],
    wrongTurn: {
      path: 'D is chosen by candidates who notice that 40 and 25 average to about 32 and reach for a single combined coefficient. 65 is 40 + 25, and grouping (x + y) looks like a tidy simplification.',
      pathVi: 'D được chọn bởi thí sinh thấy 40 và 25 trung bình khoảng 32 nên với lấy một hệ số gộp. 65 chính là 40 + 25, và việc gom (x + y) trông như một phép rút gọn gọn gàng.',
      breaks: '65(x + y) charges 65 kg for every crate of either kind. The simplification is only valid if x and y are equal, which nothing states — and if they were, the problem would need one variable, not two. Combining unlike coefficients is the single most common modelling error in this skill, and it always looks like tidying up.',
      breaksVi: '65(x + y) tính 65 kg cho MỖI thùng thuộc bất kỳ loại nào. Phép rút gọn đó chỉ đúng nếu x bằng y, mà không có gì nói vậy — và nếu chúng bằng nhau thì bài đã chỉ cần một biến chứ không phải hai. Gộp các hệ số khác nhau là lỗi mô hình hoá phổ biến nhất của kỹ năng này, và nó luôn trông như đang dọn dẹp cho gọn.',
    },
    transfer: 'Write the units under every expression you build. A modelling item is nearly always decided by units before it is decided by algebra, and units also catch the "tidy" simplification that is not one.',
    transferVi: 'Viết đơn vị ngay dưới mọi biểu thức bạn dựng lên. Câu mô hình hoá gần như luôn được quyết bởi ĐƠN VỊ trước khi được quyết bởi đại số, và đơn vị cũng bắt được kiểu rút gọn "cho gọn" mà thực ra không hợp lệ.',
  },
  {
    id: 'sol_eq_1', skill: 'equivalent-expressions', section: 'math', band: 'hard', seconds: 65,
    prompt: 'Which expression is equivalent to (2x² + 7x − 15) / (x + 5) for x ≠ −5?',
    choices: [
      { id: 'A', text: '2x − 3' },
      { id: 'B', text: '2x + 3' },
      { id: 'C', text: '2x − 15' },
      { id: 'D', text: 'x − 3' },
    ],
    answer: 'A',
    read: 'The exclusion x ≠ −5 tells you the denominator divides exactly — otherwise the exclusion would be pointless. So the numerator factors with (x + 5) as one factor, and the answer is the other factor.',
    readVi: 'Điều kiện x ≠ −5 cho biết mẫu chia HẾT — nếu không thì điều kiện ấy chẳng để làm gì. Vậy tử số phân tích được với (x + 5) là một nhân tử, và đáp án chính là nhân tử còn lại.',
    steps: [
      {
        act: 'Read the other factor off the ends rather than factoring fully: the leading term must give 2x², so it starts 2x; the constants must multiply to −15 with 5, so it ends −3.',
        actVi: 'Đọc nhân tử còn lại từ HAI ĐẦU thay vì phân tích đầy đủ: số hạng bậc cao phải cho 2x² nên bắt đầu bằng 2x; hằng số nhân với 5 phải ra −15 nên kết thúc bằng −3.',
        why: 'Two multiplications instead of a full factorisation. The first and last terms determine the answer, and checking the middle afterwards is one more multiplication rather than a search.',
        whyVi: 'Hai phép nhân thay vì một lần phân tích đầy đủ. Số hạng đầu và số hạng cuối đã quyết định đáp án, còn kiểm số hạng giữa chỉ thêm một phép nhân chứ không phải một cuộc dò tìm.',
      },
      {
        act: 'Confirm the middle term: 2x(5) + (−3)(x) = 10x − 3x = 7x. Matches.',
        actVi: 'Kiểm số hạng giữa: 2x(5) + (−3)(x) = 10x − 3x = 7x. Khớp.',
        why: 'The middle term is where a sign error would show, and it is the only check worth spending time on.',
        whyVi: 'Số hạng giữa là chỗ lỗi dấu sẽ lộ ra, và đó là phép kiểm duy nhất đáng bỏ thời gian.',
      },
    ],
    wrongTurn: {
      path: 'B is the sign flip, and it survives a fast check of the leading term and the constant magnitude — 2x is right and 3 is right. Only the sign is wrong, and signs leave no visual trace.',
      pathVi: 'B là bản lật dấu, và nó sống sót qua một lần kiểm nhanh số hạng đầu và độ lớn hằng số — 2x đúng và 3 đúng. Chỉ có DẤU là sai, mà dấu thì không để lại dấu vết nào để mắt bắt được.',
      breaks: 'The constants must multiply to −15. With +5 in the divisor, the other constant must be negative. Testing x = 0 settles it in three seconds: the original gives −15/5 = −3, and 2(0) + 3 = 3. Substituting a value is faster than checking a factorisation and catches exactly this class of error.',
      breaksVi: 'Hai hằng số phải nhân ra −15. Với +5 ở mẫu, hằng số còn lại buộc phải ÂM. Thử x = 0 là xong trong ba giây: biểu thức gốc cho −15/5 = −3, còn 2(0) + 3 = 3. Thay một giá trị nhanh hơn kiểm lại phép phân tích và bắt đúng loại lỗi này.',
    },
    transfer: 'When an expression question excludes a value, that value is telling you the factor. And when two options differ only in a sign, substitute x = 0 — three seconds, and sign errors are invisible to inspection.',
    transferVi: 'Khi câu hỏi loại trừ một giá trị, chính giá trị đó đang chỉ cho bạn nhân tử. Và khi hai phương án chỉ khác nhau ở dấu, hãy thay x = 0 — ba giây, vì lỗi dấu thì nhìn bằng mắt không thấy.',
  },
  {
    id: 'sol_nleq_1', skill: 'nonlinear-equations', section: 'math', band: 'hard', seconds: 75,
    prompt:
      'The equation x² + bx + 36 = 0 has exactly one real solution, and b is positive. What is the value of b?',
    choices: [
      { id: 'A', text: '12' },
      { id: 'B', text: '6' },
      { id: 'C', text: '36' },
      { id: 'D', text: '18' },
    ],
    answer: 'A',
    read: '"Exactly one real solution" is discriminant zero, and nothing else. Recognising the phrase converts the item into a single equation before any work begins.',
    readVi: '"Đúng một nghiệm thực" nghĩa là biệt thức bằng 0, không có nghĩa nào khác. Nhận ra cụm từ đó là biến cả câu thành một phương trình duy nhất trước khi bắt tay làm gì.',
    steps: [
      {
        act: 'Set b² − 4ac = 0 with a = 1 and c = 36: b² = 144, so b = ±12, and the condition gives b = 12.',
        actVi: 'Đặt b² − 4ac = 0 với a = 1 và c = 36: b² = 144, nên b = ±12, và điều kiện cho b = 12.',
        why: 'The stated condition "b is positive" exists to pick between the two roots, so it must be used rather than ignored.',
        whyVi: 'Điều kiện "b dương" được nêu ra để CHỌN giữa hai nghiệm, nên phải dùng chứ không được bỏ qua.',
      },
      {
        act: 'Sanity-check by factoring: x² + 12x + 36 = (x + 6)², a perfect square, one root at x = −6.',
        actVi: 'Kiểm lại bằng phân tích: x² + 12x + 36 = (x + 6)², một bình phương đúng, một nghiệm kép tại x = −6.',
        why: 'Exactly one solution means a perfect square. Seeing the square confirms the discriminant work in five seconds.',
        whyVi: 'Đúng một nghiệm nghĩa là một BÌNH PHƯƠNG ĐÚNG. Nhìn thấy bình phương đó là xác nhận được phần biệt thức trong năm giây.',
      },
    ],
    wrongTurn: {
      path: 'B is the square root of 36, and 36 is the number staring out of the equation. A candidate who remembers that one solution means a perfect square, and that (x + 6)² has a 6 in it, takes 6.',
      pathVi: 'B là căn bậc hai của 36, mà 36 lại là con số đập vào mắt trong phương trình. Thí sinh nhớ rằng một nghiệm nghĩa là bình phương đúng, và rằng (x + 6)² có số 6 trong đó, sẽ chọn 6.',
      breaks: 'The 6 is inside the bracket; the coefficient b is twice it. (x + 6)² = x² + 12x + 36, and the middle coefficient is 2 × 6. The distractor is the number you would write down while working, which is why it is chosen — it is a real intermediate value, not a random wrong answer.',
      breaksVi: 'Số 6 nằm TRONG ngoặc; hệ số b bằng GẤP ĐÔI nó. (x + 6)² = x² + 12x + 36, và hệ số giữa là 2 × 6. Phương án nhiễu chính là con số bạn viết ra giữa chừng khi làm bài — đó là lý do nó bị chọn: nó là một giá trị trung gian có thật, không phải một đáp án sai ngẫu nhiên.',
    },
    transfer: 'Distractors in nonlinear items are almost always intermediate values from the correct working. When your answer matches a number you wrote two lines ago, check whether the question wanted that line or the next one.',
    transferVi: 'Phương án nhiễu ở câu phi tuyến gần như luôn là GIÁ TRỊ TRUNG GIAN trong chính lời giải đúng. Khi đáp án của bạn trùng với con số bạn viết cách đó hai dòng, hãy kiểm xem đề hỏi dòng đó hay dòng tiếp theo.',
  },
  {
    id: 'sol_nlf_1', skill: 'nonlinear-functions', section: 'math', band: 'hard', seconds: 75,
    prompt:
      'The function f(x) = −2(x − 3)² + 50 models the height, in metres, of a ball t seconds after release, where x = t. What is the maximum height, and at what time does it occur?',
    choices: [
      { id: 'A', text: '50 metres at 3 seconds' },
      { id: 'B', text: '3 metres at 50 seconds' },
      { id: 'C', text: '48 metres at 3 seconds' },
      { id: 'D', text: '50 metres at −3 seconds' },
    ],
    answer: 'A',
    read: 'Vertex form, handed over ready to read. a(x − h)² + k has its vertex at (h, k), and the negative leading coefficient makes it a maximum. No calculation is required at all.',
    readVi: 'Dạng đỉnh, đã dọn sẵn để đọc. a(x − h)² + k có đỉnh tại (h, k), và hệ số âm phía trước khiến đó là GIÁ TRỊ LỚN NHẤT. Không cần tính toán gì cả.',
    steps: [
      {
        act: 'Read h from inside the bracket, with its sign flipped: (x − 3) gives h = 3.',
        actVi: 'Đọc h từ trong ngoặc, ĐỔI DẤU: (x − 3) cho h = 3.',
        why: 'The sign inside the bracket is the opposite of the coordinate. This is the single most frequent slip with vertex form and it takes deliberate attention every time.',
        whyVi: 'Dấu bên trong ngoặc NGƯỢC với toạ độ. Đây là lỗi hay gặp nhất với dạng đỉnh và lần nào cũng cần chú ý có chủ đích.',
      },
      {
        act: 'Read k straight off: +50, no sign change, because it is outside the bracket.',
        actVi: 'Đọc k trực tiếp: +50, không đổi dấu, vì nó nằm NGOÀI ngoặc.',
        why: 'Inside flips, outside does not. Stating the rule that way is what stops the two being confused.',
        whyVi: 'Trong ngoặc thì đổi dấu, ngoài ngoặc thì không. Phát biểu quy tắc theo cách đó là thứ giữ cho hai bên không lẫn vào nhau.',
      },
    ],
    wrongTurn: {
      path: 'C is chosen by candidates who expand. −2(x − 3)² + 50 becomes −2x² + 12x + 32 if the −18 is mishandled, and 32 does not appear, so the nearest number wins. More often, the candidate expands correctly, then computes f(1) or f(2) instead of f(3) and lands near 48.',
      pathVi: 'C bị chọn bởi thí sinh đi KHAI TRIỂN. −2(x − 3)² + 50 thành −2x² + 12x + 32 nếu xử lý nhầm số −18, mà 32 không có trong đáp án nên con số gần nhất thắng. Thường gặp hơn: thí sinh khai triển đúng, rồi tính f(1) hoặc f(2) thay vì f(3) và ra quanh 48.',
      breaks: 'The error is not in the expansion; it is in expanding at all. Vertex form is the answer already written down, and converting it to standard form throws away the information the question asks for and adds three chances to slip. When a form is handed to you, the question is testing whether you can read it.',
      breaksVi: 'Lỗi không nằm ở phép khai triển; lỗi là ở việc KHAI TRIỂN LÀM GÌ. Dạng đỉnh chính là đáp án đã viết sẵn, và đổi nó về dạng chuẩn là vứt đi đúng thông tin đề hỏi và thêm ba cơ hội để sai. Khi đề trao cho bạn một DẠNG, nó đang kiểm tra xem bạn có ĐỌC được dạng đó không.',
    },
    transfer: 'Before doing anything to a quadratic, name its form. Vertex form gives the maximum, factored form gives the roots, standard form gives the y-intercept. The form you are handed is the question’s hint about what it wants.',
    transferVi: 'Trước khi làm bất cứ gì với một tam thức bậc hai, hãy GỌI TÊN dạng của nó. Dạng đỉnh cho giá trị lớn nhất, dạng nhân tử cho nghiệm, dạng chuẩn cho giao điểm với trục tung. Dạng mà đề trao cho bạn chính là gợi ý về điều nó muốn.',
  },
  {
    id: 'sol_rr_1', skill: 'ratios-rates-units', section: 'math', band: 'hard', seconds: 70,
    prompt:
      'A printer produces 18 pages per minute. Ink costs 240 dong per page. Running continuously, what is the ink cost per hour, in millions of dong?',
    choices: [
      { id: 'A', text: '0.2592' },
      { id: 'B', text: '4.32' },
      { id: 'C', text: '259.2' },
      { id: 'D', text: '0.00432' },
    ],
    answer: 'A',
    read: 'Three unit conversions chained: pages per minute to pages per hour, pages to dong, dong to millions. Write them as a single chain of fractions and let the units cancel, rather than doing three separate multiplications and tracking magnitude in your head.',
    readVi: 'Ba lần đổi đơn vị nối tiếp: trang/phút sang trang/giờ, trang sang đồng, đồng sang triệu đồng. Hãy viết thành MỘT chuỗi phân số và để đơn vị tự triệt tiêu, thay vì làm ba phép nhân rời rồi nhẩm độ lớn trong đầu.',
    steps: [
      {
        act: 'Chain it: 18 pages/min × 60 min/hour × 240 dong/page = 259 200 dong/hour.',
        actVi: 'Nối chuỗi: 18 trang/phút × 60 phút/giờ × 240 đồng/trang = 259 200 đồng/giờ.',
        why: 'Written this way, "min" cancels against "min" and "pages" against "pages", leaving dong per hour. The cancellation is the check — if the surviving units are wrong, the arithmetic does not matter.',
        whyVi: 'Viết như vậy thì "phút" triệt với "phút", "trang" triệt với "trang", còn lại đồng trên giờ. Chính việc TRIỆT TIÊU là phép kiểm — nếu đơn vị còn lại sai thì số học không còn ý nghĩa gì.',
      },
      {
        act: 'Convert to the unit asked for last, not first: 259 200 ÷ 1 000 000 = 0.2592 million dong.',
        actVi: 'Đổi sang đơn vị đề hỏi ở BƯỚC CUỐI, không phải bước đầu: 259 200 ÷ 1 000 000 = 0,2592 triệu đồng.',
        why: 'Converting early means carrying decimals through the whole calculation, which is where factor-of-ten errors are introduced.',
        whyVi: 'Đổi sớm nghĩa là phải mang số thập phân qua suốt phép tính — đúng chỗ mà lỗi sai bậc mười xuất hiện.',
      },
    ],
    wrongTurn: {
      path: 'B, 4.32, is 18 × 240 ÷ 1000 — the per-minute cost, converted to thousands and read as millions. Every number in it comes from the question and the arithmetic is correct.',
      pathVi: 'B, 4,32, là 18 × 240 ÷ 1000 — chi phí MỖI PHÚT, đổi sang nghìn rồi đọc nhầm thành triệu. Mọi con số trong đó đều lấy từ đề và phép tính hoàn toàn đúng.',
      breaks: 'The minute-to-hour step is missing, and nothing in the arithmetic announces its absence — a rate is still a rate afterwards. Only the units notice. This is why the chain is written with units attached: a missing conversion is invisible in the numbers and obvious in the labels.',
      breaksVi: 'Thiếu mất bước đổi phút sang giờ, và không có gì trong phép tính báo hiệu sự thiếu đó — sau khi tính xong thì một tốc độ vẫn là một tốc độ. Chỉ có ĐƠN VỊ nhận ra. Đó chính là lý do phải viết chuỗi kèm đơn vị: một bước đổi bị thiếu thì vô hình trong các con số nhưng lộ rõ trong nhãn đơn vị.',
    },
    transfer: 'Write every rate as a fraction with its units, and multiply the chain in one line. A missing conversion cannot hide when the units are on the page, and it always hides when they are not.',
    transferVi: 'Viết mọi tốc độ thành một phân số kèm đơn vị, rồi nhân cả chuỗi trên MỘT dòng. Một bước đổi bị thiếu không thể ẩn khi đơn vị có mặt trên giấy, và luôn ẩn được khi chúng vắng mặt.',
  },
  {
    id: 'sol_pct_1', skill: 'percentages', section: 'math', band: 'hard', seconds: 65,
    prompt:
      'A price is increased by 25% and the new price is then reduced by 20%. The final price is what percent of the original?',
    choices: [
      { id: 'A', text: '100%' },
      { id: 'B', text: '105%' },
      { id: 'C', text: '95%' },
      { id: 'D', text: '5% more' },
    ],
    answer: 'A',
    read: 'Successive percentage changes multiply; they do not add. Use multipliers, not additions, and pick a starting value of 100 so the arithmetic is trivial.',
    readVi: 'Các thay đổi phần trăm liên tiếp thì NHÂN với nhau, không cộng. Dùng hệ số nhân thay vì phép cộng, và chọn giá gốc là 100 để phép tính thành hiển nhiên.',
    steps: [
      {
        act: 'Convert each change to a multiplier: +25% is ×1.25, −20% is ×0.80.',
        actVi: 'Đổi mỗi thay đổi thành hệ số nhân: +25% là ×1,25, −20% là ×0,80.',
        why: 'A multiplier carries the base with it. An addition does not, and the second percentage is taken on a different base from the first.',
        whyVi: 'Hệ số nhân mang theo cả GỐC. Phép cộng thì không, mà phần trăm thứ hai lại được tính trên một gốc khác với phần trăm thứ nhất.',
      },
      {
        act: 'Multiply: 1.25 × 0.80 = 1.00. The final price equals the original.',
        actVi: 'Nhân: 1,25 × 0,80 = 1,00. Giá cuối bằng đúng giá gốc.',
        why: 'The two happen to be exact inverses — 1/0.8 = 1.25 — which is why the item chose these numbers. Noticing that is faster than multiplying.',
        whyVi: 'Hai hệ số này tình cờ là nghịch đảo chính xác của nhau — 1/0,8 = 1,25 — và đó là lý do đề chọn đúng hai con số này. Nhận ra điều đó còn nhanh hơn nhân.',
      },
    ],
    wrongTurn: {
      path: 'B comes from adding: +25 then −20 gives +5, so 105%. It is the intuitive reading and it is wrong for a reason that feels like a technicality.',
      pathVi: 'B đến từ phép cộng: +25 rồi −20 ra +5, tức 105%. Đó là cách hiểu theo trực giác, và nó sai vì một lý do nghe như tiểu tiết.',
      breaks: 'It is not a technicality. The 20% is taken off 125, not off 100 — that is 25 rather than 20, and the extra 5 is exactly what closes the gap. Percentages of different bases are different quantities, and adding them adds things that are not the same kind of thing.',
      breaksVi: 'Đó không phải tiểu tiết. 20% được trừ trên 125, không phải trên 100 — tức là 25 chứ không phải 20, và đúng 5 phần chênh đó khép lại khoảng cách. Phần trăm trên hai GỐC khác nhau là hai đại lượng khác nhau, và cộng chúng lại là cộng hai thứ không cùng loại.',
    },
    transfer: 'Never add successive percentages. Convert to multipliers and multiply — and start from 100, because a concrete number costs nothing and removes every base-confusion the item is built on.',
    transferVi: 'Không bao giờ CỘNG các phần trăm liên tiếp. Đổi sang hệ số nhân rồi nhân — và bắt đầu từ 100, vì một con số cụ thể chẳng tốn gì mà xoá sạch mọi nhầm lẫn về gốc mà câu hỏi được dựng trên đó.',
  },
  {
    id: 'sol_1var_1', skill: 'one-variable-data', section: 'math', band: 'hard', seconds: 70,
    prompt:
      'A data set of 9 values has a mean of 20 and a median of 14. One value, 92, is removed. Which statement about the new data set must be true?',
    choices: [
      { id: 'A', text: 'The mean decreases and the median increases or stays the same.' },
      { id: 'B', text: 'Both the mean and the median decrease.' },
      { id: 'C', text: 'The mean decreases and the median is unchanged.' },
      { id: 'D', text: 'The mean is unchanged and the median decreases.' },
    ],
    answer: 'A',
    read: 'The gap between mean 20 and median 14 says the data is right-skewed and 92 is the outlier doing it. The question says "must be true", so each option has to survive every arrangement of the remaining values, not just a typical one.',
    readVi: 'Khoảng cách giữa trung bình 20 và trung vị 14 cho biết dữ liệu lệch phải và 92 chính là giá trị ngoại lai gây ra điều đó. Đề nói "CHẮC CHẮN đúng", nên mỗi phương án phải sống sót với MỌI cách sắp xếp các giá trị còn lại, không chỉ một trường hợp điển hình.',
    steps: [
      {
        act: 'Handle the mean first, since it is determined: the total was 180, removing 92 leaves 88 over 8 values, so the new mean is 11.',
        actVi: 'Xử lý trung bình trước vì nó xác định được: tổng cũ là 180, bỏ 92 còn 88 chia cho 8 giá trị, nên trung bình mới là 11.',
        why: 'The mean is fully determined by the totals; the median is not determined at all. Separating the determined part from the undetermined part is the whole method here.',
        whyVi: 'Trung bình được xác định hoàn toàn bởi tổng; trung vị thì không xác định được chút nào. Tách phần XÁC ĐỊNH khỏi phần KHÔNG XÁC ĐỊNH chính là toàn bộ phương pháp ở đây.',
      },
      {
        act: 'For the median, reason positionally. With 9 values the median is the 5th; with 8 it is the average of the 4th and 5th. Removing the largest value shifts the window one place towards the top.',
        actVi: 'Với trung vị, hãy lập luận theo VỊ TRÍ. Với 9 giá trị, trung vị là giá trị thứ 5; với 8 giá trị, trung vị là trung bình của thứ 4 và thứ 5. Bỏ đi giá trị lớn nhất làm cửa sổ trung vị dịch lên trên một bậc.',
        why: 'Removing a value above the median can never pull the median down. It either stays or rises, and both are possible depending on the values — which is exactly what option A allows for.',
        whyVi: 'Bỏ một giá trị NẰM TRÊN trung vị thì không bao giờ kéo trung vị xuống được. Nó hoặc giữ nguyên hoặc tăng, và cả hai đều có thể xảy ra tuỳ giá trị cụ thể — đúng bằng phạm vi mà phương án A cho phép.',
      },
    ],
    wrongTurn: {
      path: 'C is chosen because "the median is resistant to outliers" is a true and heavily taught fact, and 92 is plainly an outlier. The reasoning is sound and the conclusion does not follow.',
      pathVi: 'C bị chọn vì "trung vị ít bị ảnh hưởng bởi giá trị ngoại lai" là một sự thật đúng và được dạy rất nhiều, mà 92 rõ ràng là ngoại lai. Lập luận thì hợp lý còn kết luận thì không suy ra được.',
      breaks: 'Resistant does not mean unchanged. Removing a value changes the count from 9 to 8, and the median of 8 values is a different statistic — the average of two — computed at a different position. Try {1,2,3,4,14,15,16,17,92}: the median moves from 14 to 14.5. C claims certainty about a quantity that can move, and "must be true" is exactly the wording that punishes it.',
      breaksVi: '"Ít bị ảnh hưởng" không có nghĩa là "không đổi". Bỏ một giá trị làm số phần tử từ 9 xuống 8, mà trung vị của 8 giá trị là một thống kê KHÁC — trung bình của hai số — tính ở một vị trí khác. Thử {1,2,3,4,14,15,16,17,92}: trung vị chuyển từ 14 sang 14,5. Phương án C khẳng định chắc chắn về một đại lượng CÓ THỂ đổi, và chữ "chắc chắn đúng" trong đề chính là thứ trừng phạt điều đó.',
    },
    transfer: 'On a "must be true" statistics item, look for the option with the widest true range rather than the most specific claim. And remember that removing a value changes the count, so the median is computed at a new position.',
    transferVi: 'Với câu thống kê hỏi "chắc chắn đúng", hãy tìm phương án có PHẠM VI ĐÚNG RỘNG NHẤT chứ không phải phương án khẳng định cụ thể nhất. Và nhớ rằng bỏ một giá trị làm đổi SỐ PHẦN TỬ, nên trung vị được tính ở một vị trí mới.',
  },
  {
    id: 'sol_2var_1', skill: 'two-variable-data', section: 'math', band: 'hard', seconds: 70,
    prompt:
      'A scatterplot of study hours against test score for 40 students has a line of best fit with equation y = 42 + 6.5x. Which is the best interpretation of the slope in this context?',
    choices: [
      { id: 'A', text: 'On average, each additional hour of study is associated with a 6.5-point higher score.' },
      { id: 'B', text: 'Each additional hour of study causes a 6.5-point increase in score.' },
      { id: 'C', text: 'A student who studies for one hour is predicted to score 6.5.' },
      { id: 'D', text: 'The average score of the 40 students is 6.5 points above 42.' },
    ],
    answer: 'A',
    read: 'A slope interpretation with a causal option present. Observational data supports association only, so the answer is decided by the verb before any arithmetic is considered.',
    readVi: 'Câu diễn giải hệ số góc, có kèm một phương án mang nghĩa NHÂN QUẢ. Dữ liệu quan sát chỉ chống đỡ được LIÊN HỆ, nên đáp án được quyết định bởi ĐỘNG TỪ trước khi nghĩ tới bất kỳ phép tính nào.',
    steps: [
      {
        act: 'Check the design before the numbers: students chose their own study hours; nobody was assigned an amount.',
        actVi: 'Kiểm THIẾT KẾ trước khi xét số liệu: học sinh tự chọn số giờ học; không ai bị PHÂN NGẪU NHIÊN vào một mức nào cả.',
        why: 'Without random assignment, any confounder — motivation, prior attainment, sleep — could produce the same line. That rules out causal language regardless of how strong the fit is.',
        whyVi: 'Không có phân ngẫu nhiên thì bất kỳ yếu tố gây nhiễu nào — động lực, nền tảng sẵn có, giấc ngủ — cũng có thể tạo ra đúng đường thẳng đó. Điều này loại bỏ mọi cách nói nhân quả, bất kể đường khớp có đẹp đến đâu.',
      },
      {
        act: 'Then check the arithmetic role: 6.5 multiplies x, so it is a rate of change, not a predicted value.',
        actVi: 'Sau đó kiểm VAI TRÒ số học: 6,5 nhân với x, nên nó là tốc độ thay đổi, không phải một giá trị dự đoán.',
        why: 'Two of the four options misplace the number rather than misdescribe the design, and the units — points per hour — settle them.',
        whyVi: 'Hai trong bốn phương án đặt SAI CHỖ con số chứ không phải mô tả sai thiết kế, và đơn vị — điểm trên giờ — giải quyết chúng.',
      },
    ],
    wrongTurn: {
      path: 'B is the most attractive wrong answer on the whole section. It is arithmetically identical to A, it reads more decisively, and the relationship it describes is one most people believe is genuinely causal.',
      pathVi: 'B là đáp án sai hấp dẫn nhất của cả phần thi. Nó GIỐNG HỆT A về số học, đọc lên dứt khoát hơn, và mối quan hệ nó mô tả là thứ mà phần lớn mọi người tin là nhân quả thật.',
      breaks: 'Believing the causal story is not evidence for it. The data cannot distinguish "study raises scores" from "students who were going to score well study more", and the line is identical either way. This single distinction — association against cause — is worth more marks across the Digital SAT than any formula, and it appears in both sections.',
      breaksVi: 'Tin vào câu chuyện nhân quả không phải là bằng chứng cho nó. Dữ liệu không phân biệt được "học nhiều làm điểm tăng" với "những học sinh vốn sẽ điểm cao thì học nhiều hơn", và đường thẳng thì y hệt nhau ở cả hai trường hợp. Riêng phân biệt này — LIÊN HỆ với NHÂN QUẢ — đáng giá nhiều điểm hơn bất kỳ công thức nào trên Digital SAT, và nó xuất hiện ở cả hai phần thi.',
    },
    transfer: 'Scan slope-interpretation options for causal verbs — causes, leads to, results in, raises — and eliminate them unless the passage describes random assignment. Then use units to place the number.',
    transferVi: 'Quét các phương án diễn giải hệ số góc để tìm ĐỘNG TỪ NHÂN QUẢ — gây ra, dẫn tới, làm cho, khiến tăng — và loại chúng trừ khi bài mô tả có phân ngẫu nhiên. Sau đó dùng đơn vị để đặt đúng chỗ con số.',
  },
  {
    id: 'sol_prob_1', skill: 'probability', section: 'math', band: 'hard', seconds: 75,
    prompt:
      'In a group of 200 students, 120 study Japanese, 90 study Korean, and 40 study both. One student is chosen at random from those who study Japanese. What is the probability that the student also studies Korean?',
    choices: [
      { id: 'A', text: '1/3' },
      { id: 'B', text: '1/5' },
      { id: 'C', text: '4/9' },
      { id: 'D', text: '17/20' },
    ],
    answer: 'A',
    read: '"Chosen at random from those who study Japanese" is a conditional probability, and the phrase names the denominator. The population of 200 is not the denominator, and it is in the question so that it can be.',
    readVi: '"Chọn ngẫu nhiên TRONG SỐ những em học tiếng Nhật" là xác suất có điều kiện, và chính cụm đó nêu ra MẪU SỐ. Con số 200 không phải mẫu số, và nó có mặt trong đề chính là để bị dùng nhầm làm mẫu số.',
    steps: [
      {
        act: 'Identify the restricted group named by the question: the 120 Japanese students. That is the denominator.',
        actVi: 'Xác định nhóm bị GIỚI HẠN mà đề nêu ra: 120 em học tiếng Nhật. Đó là mẫu số.',
        why: 'A conditional probability is a probability inside a smaller world. The phrase after "from" defines that world, and reading it is the whole item.',
        whyVi: 'Xác suất có điều kiện là xác suất bên trong một thế giới NHỎ HƠN. Cụm từ sau chữ "trong số" định nghĩa cái thế giới đó, và đọc được nó là xong cả câu.',
      },
      {
        act: 'Count the favourable cases inside that group: of the 120, exactly 40 also study Korean. So 40/120 = 1/3.',
        actVi: 'Đếm trường hợp thuận lợi BÊN TRONG nhóm đó: trong 120 em, đúng 40 em cũng học tiếng Hàn. Vậy 40/120 = 1/3.',
        why: 'The 40 who study both are already a subset of the 120, so no inclusion–exclusion is needed. Recognising that saves the step most candidates add.',
        whyVi: '40 em học cả hai vốn đã nằm TRONG 120 em, nên không cần dùng công thức bao hàm–loại trừ. Nhận ra điều đó là bỏ được đúng cái bước mà phần lớn thí sinh thêm vào.',
      },
    ],
    wrongTurn: {
      path: 'B is 40/200. The candidate computes the probability that a randomly chosen student studies both, which is a perfectly sensible quantity and the one the numbers most naturally suggest.',
      pathVi: 'B là 40/200. Thí sinh tính xác suất một học sinh chọn ngẫu nhiên học CẢ HAI thứ tiếng — một đại lượng hoàn toàn hợp lý và cũng là thứ mà các con số gợi ra tự nhiên nhất.',
      breaks: 'It answers a different question. "From those who study Japanese" has already narrowed the sample space before any student is chosen, and 200 is no longer the world. Every conditional item supplies the unconditional total as a distractor, and it is the most-selected wrong answer in this skill.',
      breaksVi: 'Nó trả lời một câu hỏi KHÁC. Cụm "trong số những em học tiếng Nhật" đã thu hẹp không gian mẫu TRƯỚC KHI chọn bất kỳ ai, và 200 không còn là cái thế giới đó nữa. Mọi câu xác suất có điều kiện đều cài sẵn tổng thể không điều kiện làm phương án nhiễu, và đó là đáp án sai bị chọn nhiều nhất trong kỹ năng này.',
    },
    transfer: 'Underline the phrase that begins "given", "from those who", or "among". It is the denominator, and the larger total in the question is there to be chosen by mistake.',
    transferVi: 'Gạch chân cụm bắt đầu bằng "biết rằng", "trong số những em", hay "trong nhóm". Đó là MẪU SỐ, còn con số tổng lớn hơn trong đề có mặt để bị chọn nhầm.',
  },
  {
    id: 'sol_infstat_1', skill: 'inference-statistics', section: 'math', band: 'hard', seconds: 70,
    prompt:
      'A survey of 300 randomly selected residents of a city found that 62% support a new bus route, with a margin of error of 4 percentage points at 95% confidence. Which conclusion is best supported?',
    choices: [
      { id: 'A', text: 'It is plausible that between 58% and 66% of the city’s residents support the route.' },
      { id: 'B', text: 'Exactly 62% of the city’s residents support the route.' },
      { id: 'C', text: 'Between 58% and 66% of the 300 residents surveyed support the route.' },
      { id: 'D', text: 'If the survey were repeated, 95% of respondents would give the same answer.' },
    ],
    answer: 'A',
    read: 'A confidence interval is a statement about the population, made from a sample, with a stated level of uncertainty. Three of these options move it somewhere it does not belong: onto the sample, onto certainty, or onto individual respondents.',
    readVi: 'Khoảng tin cậy là một phát biểu về TỔNG THỂ, rút ra từ một MẪU, kèm một mức bất định đã nêu. Ba trong bốn phương án dời nó sang chỗ nó không thuộc về: sang mẫu, sang sự chắc chắn, hoặc sang từng người trả lời.',
    steps: [
      {
        act: 'Build the interval mechanically: 62 ± 4 gives 58% to 66%.',
        actVi: 'Dựng khoảng một cách máy móc: 62 ± 4 cho 58% đến 66%.',
        why: 'The arithmetic is the easy half and two options contain the right interval. The item is decided by what the interval is about, not by its endpoints.',
        whyVi: 'Phần số học là nửa dễ và có hai phương án chứa đúng khoảng đó. Câu này được quyết bởi khoảng ấy nói VỀ CÁI GÌ, không phải bởi hai đầu mút.',
      },
      {
        act: 'Ask what the interval is about. It estimates the population proportion, and the sample proportion is already known exactly — it is 62%.',
        actVi: 'Hỏi khoảng đó nói về cái gì. Nó ƯỚC LƯỢNG tỉ lệ của TỔNG THỂ, còn tỉ lệ của mẫu thì đã biết chính xác rồi — đúng 62%.',
        why: 'A margin of error exists because the sample might not represent the population. Applying it to the sample itself is applying uncertainty to something that was counted.',
        whyVi: 'Sai số tồn tại vì mẫu có thể không đại diện cho tổng thể. Áp nó lên chính cái mẫu là áp sự bất định lên một thứ đã được ĐẾM.',
      },
    ],
    wrongTurn: {
      path: 'C is the sophisticated error. It has the correct interval, it is cautious in tone, and it avoids the over-claim in B. A candidate who has learned to distrust confident statements finds it attractive.',
      pathVi: 'C là lỗi "cao tay". Nó có đúng khoảng, giọng điệu thận trọng, và tránh được sự khẳng định quá đà của B. Thí sinh đã học được cách nghi ngờ những phát biểu chắc nịch sẽ thấy nó hấp dẫn.',
      breaks: 'The 300 people surveyed were counted, not estimated: 186 of them said yes and there is no uncertainty about that number at all. The margin of error describes the step from those 300 to the city. C applies the uncertainty in the wrong direction, which is a deeper misunderstanding than the over-claim in B even though it reads as more careful.',
      breaksVi: '300 người được khảo sát đã được ĐẾM chứ không phải ước lượng: 186 người nói có, và về con số đó không có chút bất định nào. Sai số mô tả bước đi TỪ 300 người ĐÓ RA cả thành phố. Phương án C áp sự bất định NGƯỢC CHIỀU, và đó là hiểu sai sâu hơn cả sự khẳng định quá đà của B, dù nó đọc lên có vẻ cẩn trọng hơn.',
    },
    transfer: 'A margin of error always points from the sample towards the population, never back at the sample. And "plausible" or "estimated" beats "exactly" every time — a confidence interval never establishes a value.',
    transferVi: 'Sai số luôn chỉ TỪ mẫu HƯỚNG RA tổng thể, không bao giờ quay ngược vào mẫu. Và "có thể", "ước lượng" luôn thắng "chính xác là" — khoảng tin cậy không bao giờ xác lập một giá trị.',
  },
  {
    id: 'sol_claims_1', skill: 'statistical-claims', section: 'math', band: 'hard', seconds: 70,
    prompt:
      'Researchers recruited volunteers from a gym and found that those who took a supplement had 15% better endurance than those who did not. Which is the most serious limitation of the study as a basis for recommending the supplement?',
    choices: [
      { id: 'A', text: 'Participants chose whether to take the supplement, so the two groups may differ in other ways.' },
      { id: 'B', text: 'The sample was drawn from a single gym, so it may not represent the wider population.' },
      { id: 'C', text: 'A 15% difference is not large enough to be practically meaningful.' },
      { id: 'D', text: 'The study did not report the number of participants.' },
    ],
    answer: 'A',
    read: 'The question asks for the *most serious* limitation, so several options will be real problems and only one is fatal to the specific conclusion being drawn — that the supplement works.',
    readVi: 'Đề hỏi hạn chế NGHIÊM TRỌNG NHẤT, nên sẽ có vài phương án đều là vấn đề thật và chỉ một cái là CHÍ MẠNG với đúng kết luận đang được rút ra — rằng thực phẩm bổ sung đó có tác dụng.',
    steps: [
      {
        act: 'Name the conclusion precisely: the supplement improves endurance. That is a causal claim.',
        actVi: 'Gọi tên chính xác kết luận: thực phẩm bổ sung LÀM TĂNG sức bền. Đó là một khẳng định NHÂN QUẢ.',
        why: 'A limitation is only serious relative to a conclusion. Different conclusions have different fatal flaws, and the question is about recommending the supplement.',
        whyVi: 'Một hạn chế chỉ nghiêm trọng KHI ĐỐI CHIẾU với một kết luận. Kết luận khác nhau thì lỗ hổng chí mạng cũng khác nhau, và câu hỏi ở đây là về việc KHUYẾN NGHỊ dùng.',
      },
      {
        act: 'Separate the two classic threats: self-selection breaks causation; a narrow sample breaks generalisation.',
        actVi: 'Tách hai mối đe doạ kinh điển: TỰ CHỌN NHÓM phá vỡ tính nhân quả; MẪU HẸP phá vỡ tính khái quát.',
        why: 'The conclusion here is causal, so the self-selection threat is the one that removes the basis for it entirely.',
        whyVi: 'Kết luận ở đây là nhân quả, nên mối đe doạ tự chọn nhóm mới là thứ xoá bỏ hoàn toàn cơ sở của nó.',
      },
    ],
    wrongTurn: {
      path: 'B is a genuine limitation and is often taught as the first thing to look for. Gym-goers are not the general population, and the finding may well not generalise.',
      pathVi: 'B là một hạn chế có thật và thường được dạy như thứ đầu tiên cần tìm. Người đi phòng gym không đại diện cho dân số chung, và kết quả rất có thể không khái quát được.',
      breaks: 'B limits *who* the result applies to; A questions whether there is a result at all. If the supplement-takers were already fitter or more disciplined, the 15% may have nothing to do with the supplement — in which case it does not apply to gym-goers either. A threat to internal validity always outranks a threat to external validity, because generalising a finding requires first having one.',
      breaksVi: 'B giới hạn kết quả áp dụng cho AI; còn A đặt câu hỏi liệu có kết quả nào KHÔNG. Nếu nhóm dùng thực phẩm bổ sung vốn đã khoẻ hơn hoặc kỷ luật hơn thì 15% kia có thể chẳng liên quan gì tới sản phẩm — và khi đó nó cũng không áp dụng được cho cả người đi gym. Đe doạ tới GIÁ TRỊ NỘI TẠI luôn xếp trên đe doạ tới giá trị ngoại suy, vì muốn khái quát một kết quả thì trước hết phải CÓ một kết quả.',
    },
    transfer: 'Rank threats: no random assignment beats a narrow sample beats a small sample. Ask whether the study establishes a result before asking who the result applies to.',
    transferVi: 'Xếp hạng các mối đe doạ: KHÔNG phân ngẫu nhiên nặng hơn mẫu hẹp, mẫu hẹp nặng hơn mẫu nhỏ. Hãy hỏi nghiên cứu có XÁC LẬP được kết quả không, trước khi hỏi kết quả đó áp dụng cho ai.',
  },
  {
    id: 'sol_av_1', skill: 'area-volume', section: 'math', band: 'hard', seconds: 70,
    prompt:
      'A cylindrical tank has radius 3 m and height 8 m. A second cylindrical tank has twice the radius and half the height. The volume of the second tank is how many times the volume of the first?',
    choices: [
      { id: 'A', text: '2' },
      { id: 'B', text: '1' },
      { id: 'C', text: '4' },
      { id: 'D', text: '8' },
    ],
    answer: 'A',
    read: 'A scaling question. Do not compute either volume — track how each factor in V = πr²h responds to its change, because the numbers are there to consume time.',
    readVi: 'Câu hỏi về TỈ LỆ. Đừng tính thể tích nào cả — hãy theo dõi từng thừa số trong V = πr²h phản ứng ra sao với thay đổi của nó, vì các con số có mặt để làm bạn tốn thời gian.',
    steps: [
      {
        act: 'Note that r is squared and h is not. Doubling r multiplies volume by 4; halving h multiplies it by 1/2.',
        actVi: 'Ghi nhận r được BÌNH PHƯƠNG còn h thì không. Gấp đôi r làm thể tích nhân 4; giảm nửa h làm thể tích nhân 1/2.',
        why: 'The exponent is the entire question. A change to a squared quantity has twice the leverage of the same change to a linear one.',
        whyVi: 'Số MŨ chính là toàn bộ câu hỏi. Một thay đổi lên đại lượng bình phương có sức nặng gấp đôi cùng thay đổi đó lên đại lượng bậc nhất.',
      },
      {
        act: 'Multiply the factors: 4 × 1/2 = 2.',
        actVi: 'Nhân các thừa số: 4 × 1/2 = 2.',
        why: 'Three seconds, and no arithmetic with π or with 3 and 8 at all. Computing both volumes takes forty seconds and offers four chances to slip.',
        whyVi: 'Ba giây, và không cần đụng tới π hay tới 3 và 8. Tính cả hai thể tích mất bốn mươi giây và mở ra bốn cơ hội sai.',
      },
    ],
    wrongTurn: {
      path: 'B, unchanged, comes from treating the two changes as cancelling: radius doubles, height halves, so it evens out. It is a genuinely appealing symmetry.',
      pathVi: 'B — không đổi — đến từ việc coi hai thay đổi là TRIỆT TIÊU nhau: bán kính gấp đôi, chiều cao giảm nửa, vậy là hoà. Đó là một sự đối xứng thật sự có sức hút.',
      breaks: 'The symmetry is false because the two variables do not enter the formula the same way. Doubling a squared term is a factor of 4, not 2, so the changes cannot cancel. Any time a question changes two quantities in opposite directions, check the exponents before assuming they offset — the item exists because they usually do not.',
      breaksVi: 'Sự đối xứng đó là GIẢ vì hai biến không vào công thức theo cùng một cách. Gấp đôi một số hạng bình phương cho hệ số 4 chứ không phải 2, nên hai thay đổi không thể triệt tiêu. Hễ đề thay đổi hai đại lượng theo hai chiều ngược nhau, hãy kiểm SỐ MŨ trước khi cho rằng chúng bù trừ — câu hỏi tồn tại chính vì thường thì chúng không bù trừ.',
    },
    transfer: 'For any scaling question, write the formula and mark the exponent above each variable that changes. Scale factors multiply, and a squared variable contributes the square of its factor.',
    transferVi: 'Với mọi câu về tỉ lệ, hãy viết công thức và ghi SỐ MŨ phía trên mỗi biến bị thay đổi. Các hệ số tỉ lệ NHÂN với nhau, và biến bình phương đóng góp BÌNH PHƯƠNG hệ số của nó.',
  },
  {
    id: 'sol_lat_1', skill: 'lines-angles-triangles', section: 'math', band: 'hard', seconds: 70,
    prompt:
      'In triangle ABC, the measure of angle A is 3x + 10 degrees, angle B is 2x − 5 degrees, and the exterior angle at C measures 6x − 15 degrees. What is the value of x?',
    choices: [
      { id: 'A', text: '20' },
      { id: 'B', text: '30' },
      { id: 'C', text: '38' },
      { id: 'D', text: '15' },
    ],
    answer: 'A',
    read: 'The word "exterior" is the item. The exterior angle at C equals the sum of the two remote interior angles, which turns the problem into one equation with no need for the third interior angle at all.',
    readVi: 'Chữ "NGOÀI" chính là toàn bộ câu hỏi. Góc ngoài tại C bằng TỔNG hai góc trong không kề, và điều đó biến bài toán thành một phương trình duy nhất, không cần tới góc trong thứ ba.',
    steps: [
      {
        act: 'Apply the exterior angle theorem directly: (3x + 10) + (2x − 5) = 6x − 15.',
        actVi: 'Áp dụng thẳng định lý góc ngoài: (3x + 10) + (2x − 5) = 6x − 15.',
        why: 'One equation, one unknown. The alternative — find angle C from 180, then use the linear pair — is three steps with two chances to slip.',
        whyVi: 'Một phương trình, một ẩn. Cách kia — tìm góc C từ 180, rồi dùng cặp góc kề bù — là ba bước với hai cơ hội sai.',
      },
      {
        act: 'Solve: 5x + 5 = 6x − 15, so x = 20.',
        actVi: 'Giải: 5x + 5 = 6x − 15, nên x = 20.',
        why: 'Then sanity-check the geometry: A = 70, B = 35, exterior at C = 105 = 70 + 35, and interior C = 75 with 70 + 35 + 75 = 180. Consistent.',
        whyVi: 'Rồi kiểm lại hình học: A = 70, B = 35, góc ngoài tại C = 105 = 70 + 35, và góc trong C = 75 với 70 + 35 + 75 = 180. Nhất quán.',
      },
    ],
    wrongTurn: {
      path: 'C comes from summing all three expressions to 180, as though the exterior angle were the third interior angle: (3x + 10) + (2x − 5) + (6x − 15) = 180 gives 11x = 190, and a candidate rounds to 38 from x ≈ 17.3 or mis-solves to it.',
      pathVi: 'C đến từ việc cộng cả ba biểu thức bằng 180, như thể góc ngoài là góc trong thứ ba: (3x + 10) + (2x − 5) + (6x − 15) = 180 cho 11x = 190, rồi thí sinh làm tròn thành 38 từ x ≈ 17,3 hoặc giải nhầm ra con số đó.',
      breaks: 'The angle sum applies to interior angles only. One word in the question — "exterior" — changes which theorem is in play, and it is a word that carries no visual weight in a sentence full of algebra. Circling the geometric vocabulary before starting is what protects against it.',
      breaksVi: 'Tổng ba góc bằng 180 chỉ áp dụng cho góc TRONG. Một chữ trong đề — "ngoài" — thay đổi hẳn định lý phải dùng, mà đó lại là chữ chẳng có sức nặng thị giác nào trong một câu đầy ký hiệu đại số. Khoanh vào các TỪ HÌNH HỌC trước khi bắt đầu là cách phòng đúng lỗi này.',
    },
    transfer: 'Before setting up any geometry equation, circle every geometric word — exterior, isosceles, perpendicular, tangent. Each selects a different theorem, and each is easy to read past when the rest of the sentence is algebra.',
    transferVi: 'Trước khi lập bất kỳ phương trình hình học nào, hãy khoanh MỌI TỪ HÌNH HỌC — góc ngoài, cân, vuông góc, tiếp tuyến. Mỗi từ chọn ra một định lý khác nhau, và mỗi từ đều dễ bị đọc lướt qua khi phần còn lại của câu toàn là đại số.',
  },
  {
    id: 'sol_trig_1', skill: 'right-triangles-trig', section: 'math', band: 'hard', seconds: 65,
    prompt: 'In a right triangle, sin(A) = 3/5 where A is an acute angle. What is the value of cos(90° − A)?',
    choices: [
      { id: 'A', text: '3/5' },
      { id: 'B', text: '4/5' },
      { id: 'C', text: '5/3' },
      { id: 'D', text: '5/4' },
    ],
    answer: 'A',
    read: 'The cofunction identity: cos(90° − A) = sin(A), always. The question can be answered with no triangle, no Pythagoras, and no computation whatsoever.',
    readVi: 'Đồng nhất thức hàm bù: cos(90° − A) = sin(A), luôn luôn đúng. Câu này trả lời được mà không cần vẽ tam giác, không cần Pythagoras, và không cần tính gì cả.',
    steps: [
      {
        act: 'Recognise the identity and stop. cos(90° − A) = sin(A) = 3/5.',
        actVi: 'Nhận ra đồng nhất thức và DỪNG. cos(90° − A) = sin(A) = 3/5.',
        why: 'Five seconds. Every other route builds the triangle, finds the third side, and then computes a ratio that the identity already gave.',
        whyVi: 'Năm giây. Mọi lối đi khác đều phải dựng tam giác, tìm cạnh thứ ba, rồi tính một tỉ số mà đồng nhất thức đã cho sẵn.',
      },
      {
        act: 'If the identity does not come to mind, reason from the triangle: in a right triangle the two acute angles sum to 90°, so 90° − A is the other acute angle, and its adjacent side is A’s opposite side.',
        actVi: 'Nếu chưa nhớ ra đồng nhất thức, hãy suy từ tam giác: trong tam giác vuông hai góc nhọn cộng lại bằng 90°, nên 90° − A chính là góc nhọn còn lại, và cạnh KỀ của nó chính là cạnh ĐỐI của A.',
        why: 'The identity is not a formula to memorise but a restatement of that fact, and reconstructing it takes fifteen seconds rather than fifty.',
        whyVi: 'Đồng nhất thức đó không phải công thức phải học thuộc mà là cách phát biểu lại chính sự kiện trên, và dựng lại nó mất mười lăm giây chứ không phải năm mươi.',
      },
    ],
    wrongTurn: {
      path: 'B, 4/5, is cos(A). The candidate builds the 3-4-5 triangle — correctly — and then reads off the cosine of A, because the question contains "cos" and A. It is the answer to a question that was not asked.',
      pathVi: 'B, 4/5, chính là cos(A). Thí sinh dựng tam giác 3-4-5 — hoàn toàn đúng — rồi đọc ra cosin của A, vì trong đề có chữ "cos" và có A. Đó là đáp án cho một câu hỏi KHÔNG được hỏi.',
      breaks: 'The argument of the cosine is 90° − A, not A. Once the triangle is drawn the candidate is working with sides rather than with the expression, and the (90° − A) has dropped out of attention. Doing the extra work is what causes the error: the shortcut is also the safeguard.',
      breaksVi: 'Đối số của cosin là 90° − A, không phải A. Khi tam giác đã vẽ ra, thí sinh làm việc với các CẠNH thay vì với BIỂU THỨC, và cụm (90° − A) rơi khỏi sự chú ý. Chính việc làm thêm gây ra lỗi: lối tắt ở đây đồng thời là lớp bảo vệ.',
    },
    transfer: 'sin(A) = cos(90° − A) and cos(A) = sin(90° − A). Look for the identity before drawing anything — and note that here the shortcut is safer than the long route, which is not usually the case.',
    transferVi: 'sin(A) = cos(90° − A) và cos(A) = sin(90° − A). Hãy tìm đồng nhất thức TRƯỚC khi vẽ gì — và lưu ý rằng ở đây lối tắt lại AN TOÀN hơn lối dài, điều không phải lúc nào cũng đúng.',
  },
  {
    id: 'sol_circ_1', skill: 'circles', section: 'math', band: 'hard', seconds: 80,
    prompt:
      'The equation x² + y² − 6x + 8y = 11 describes a circle in the xy-plane. What is the radius?',
    choices: [
      { id: 'A', text: '6' },
      { id: 'B', text: '11' },
      { id: 'C', text: '36' },
      { id: 'D', text: '√11' },
    ],
    answer: 'A',
    read: 'General form, so completing the square is required. The two constants added to the left must be added to the right as well, and that step is where the item is decided.',
    readVi: 'Dạng tổng quát, nên bắt buộc phải hoàn thành bình phương. Hai hằng số cộng vào vế trái PHẢI cộng cả vào vế phải, và chính bước đó quyết định câu này.',
    steps: [
      {
        act: 'Group and complete both squares: (x² − 6x + 9) + (y² + 8y + 16) = 11 + 9 + 16.',
        actVi: 'Nhóm lại và hoàn thành cả hai bình phương: (x² − 6x + 9) + (y² + 8y + 16) = 11 + 9 + 16.',
        why: 'Writing the additions on both sides in the same line makes the balance visible. Doing it in two stages is where a term gets added on one side only.',
        whyVi: 'Viết phần cộng thêm ở CẢ HAI vế trên cùng một dòng làm cho sự cân bằng nhìn thấy được. Làm tách thành hai lượt chính là chỗ một số hạng bị cộng vào có một bên.',
      },
      {
        act: 'Read the result: (x − 3)² + (y + 4)² = 36, so r² = 36 and r = 6.',
        actVi: 'Đọc kết quả: (x − 3)² + (y + 4)² = 36, nên r² = 36 và r = 6.',
        why: 'The final square root is a separate act. The form gives r², and the question asked for r.',
        whyVi: 'Phép căn cuối cùng là một THAO TÁC RIÊNG. Dạng phương trình cho r², còn đề hỏi r.',
      },
    ],
    wrongTurn: {
      path: 'C, 36, is r² — the number the completed form displays, and the last thing written before the answer. The whole method has been executed correctly.',
      pathVi: 'C, 36, chính là r² — con số mà dạng đã hoàn thành hiển thị ra, và là thứ cuối cùng được viết trước khi trả lời. Toàn bộ phương pháp đã làm đúng.',
      breaks: 'Standard circle form ends in r², and the mind stops at the number the algebra produces rather than at the quantity the sentence requested. Writing "r = ?" at the top of the working, before starting, is what makes the last step happen — the same discipline that protects against being asked for 6x + 5 instead of x.',
      breaksVi: 'Dạng chuẩn của đường tròn kết thúc bằng r², và đầu óc dừng lại ở con số mà phép đại số sinh ra chứ không ở đại lượng mà câu văn yêu cầu. Viết "r = ?" lên đầu bài làm TRƯỚC khi bắt đầu là thứ khiến bước cuối được thực hiện — cùng một kỷ luật bảo vệ bạn khỏi việc bị hỏi 6x + 5 thay vì x.',
    },
    transfer: 'Completing the square adds to both sides; standard circle form gives r² not r. Both are single steps that the working does not prompt you to take, so write the target quantity down before you start.',
    transferVi: 'Hoàn thành bình phương thì cộng vào CẢ HAI vế; dạng chuẩn đường tròn cho r² chứ không phải r. Cả hai đều là bước lẻ mà quá trình làm bài không tự nhắc bạn thực hiện — nên hãy viết ĐẠI LƯỢNG CẦN TÌM ra trước khi bắt đầu.',
  },
];
