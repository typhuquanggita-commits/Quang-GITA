/**
 * Math lessons.
 *
 * Same structure as the Reading and Writing set, with one difference in
 * emphasis: most Math errors on this test are not gaps in mathematics. They
 * are answering a different question than the one asked, or applying a
 * correct operation to the wrong base. The traps sections say so explicitly,
 * because a student who thinks they are bad at algebra will study the wrong
 * thing for weeks.
 */

import type { Lesson } from './lessons.ts';

export const MATH_LESSONS: Lesson[] = [
  {
    skill: 'linear-equations-1var',
    section: 'math',
    title: 'Linear equations in one variable',
    titleVi: 'Phương trình bậc nhất một ẩn',
    minutes: 5,
    idea:
      'Every one of these is the same problem: undo what was done to x, in reverse order. The difficulty is never the algebra — it is distributing carefully and noticing when the question asks for something other than x.',
    ideaVi:
      'Mọi bài dạng này đều là một bài toán: gỡ ngược lại những gì đã làm với x, theo thứ tự đảo. Cái khó không bao giờ nằm ở đại số — nó nằm ở việc phân phối cho cẩn thận và ở việc nhận ra khi đề hỏi thứ khác chứ không phải x.',
    method: [
      'Distribute across every parenthesis before anything else. Write the expanded line out.',
      'Collect variable terms on one side, constants on the other.',
      'Divide once, at the end.',
      'Re-read the question. If it asks for 2x, or x + 3, or the sum of the solutions, answer that.',
      'Substitute your value back into the original equation. This takes ten seconds and catches most sign errors.',
    ],
    methodVi: [
      'Phân phối qua mọi dấu ngoặc trước khi làm bất cứ gì khác. Viết hẳn dòng đã khai triển ra.',
      'Gom các hạng tử chứa biến về một vế, hằng số về vế kia.',
      'Chia một lần duy nhất, ở bước cuối.',
      'Đọc lại câu hỏi. Nếu đề hỏi 2x, hay x + 3, hay tổng các nghiệm, thì trả lời cái đó.',
      'Thay giá trị vừa tìm vào phương trình gốc. Việc này mất mười giây và bắt được phần lớn lỗi dấu.',
    ],
    worked: {
      prompt: 'If 5(x − 3) = 2x + 9, what is the value of x?',
      promptVi: 'Nếu 5(x − 3) = 2x + 9, giá trị của x là bao nhiêu?',
      steps: [
        'Distribute: 5x − 15 = 2x + 9.',
        'Subtract 2x: 3x − 15 = 9.',
        'Add 15: 3x = 24.',
        'Divide: x = 8.',
        'Check: 5(8 − 3) = 25 and 2(8) + 9 = 25.',
      ],
      stepsVi: [
        'Phân phối: 5x − 15 = 2x + 9.',
        'Trừ 2x: 3x − 15 = 9.',
        'Cộng 15: 3x = 24.',
        'Chia: x = 8.',
        'Kiểm tra: 5(8 − 3) = 25 và 2(8) + 9 = 25.',
      ],
      answer: 'x = 8',
      answerVi: 'x = 8',
    },
    traps: [
      {
        name: 'Partial distribution',
        nameVi: 'Phân phối thiếu',
        why: 'Multiplying the first term inside the parenthesis and forgetting the second is the single most common Math error on this test, and the resulting value is always among the options.',
        whyVi: 'Nhân hạng tử đầu trong ngoặc rồi quên hạng tử thứ hai là lỗi Toán phổ biến nhất trong kỳ thi này, và giá trị sai đó luôn nằm trong các phương án.',
      },
      {
        name: 'Answering for x',
        nameVi: 'Trả lời x khi đề không hỏi x',
        why: 'Solving is the hard part, so finishing it feels like finishing the question. When the prompt asks for x + y or 2x, the value of x alone is placed as a distractor.',
        whyVi: 'Giải là phần khó, nên giải xong có cảm giác đã xong câu hỏi. Khi đề hỏi x + y hay 2x, riêng giá trị của x được đặt sẵn làm phương án nhiễu.',
      },
      {
        name: 'Dividing too early',
        nameVi: 'Chia quá sớm',
        why: 'Dividing before collecting terms means dividing only part of a side, and the arithmetic that follows looks perfectly reasonable.',
        whyVi: 'Chia trước khi gom hạng tử nghĩa là chỉ chia một phần của một vế, và phần tính toán sau đó trông vẫn hoàn toàn hợp lý.',
      },
    ],
  },

  {
    skill: 'linear-equations-2var',
    section: 'math',
    title: 'Linear equations in two variables',
    titleVi: 'Phương trình bậc nhất hai ẩn',
    minutes: 6,
    idea:
      'Slope is a rate: how much y changes for each unit of x. Once you read it as a rate rather than as a formula, word problems and graphs become the same question, and the y-intercept is simply the value when x is zero.',
    ideaVi:
      'Hệ số góc là một tốc độ: y thay đổi bao nhiêu cho mỗi đơn vị của x. Khi bạn đọc nó như một tốc độ chứ không phải một công thức, bài toán chữ và bài toán đồ thị trở thành cùng một câu hỏi, còn giao điểm với trục y đơn giản là giá trị khi x bằng không.',
    method: [
      'Slope = (change in y) ÷ (change in x). Subtract in the same order on top and bottom.',
      'From a table, take any two rows. From a word problem, find the per-unit rate.',
      'To get the intercept, extrapolate back to x = 0 — do not assume the first row of a table is the intercept.',
      'Parallel means the same slope. Perpendicular means the negative reciprocal: flip it and change its sign.',
    ],
    methodVi: [
      'Hệ số góc = (biến thiên y) ÷ (biến thiên x). Trừ theo cùng một thứ tự ở tử và mẫu.',
      'Từ bảng, lấy hai dòng bất kỳ. Từ bài toán chữ, tìm tốc độ trên mỗi đơn vị.',
      'Để có giao điểm trục y, ngoại suy ngược về x = 0 — đừng mặc định dòng đầu của bảng là giao điểm.',
      'Song song nghĩa là cùng hệ số góc. Vuông góc nghĩa là nghịch đảo đối dấu: lật ngược rồi đổi dấu.',
    ],
    worked: {
      prompt: 'A reservoir drains at a constant rate: 186 thousand litres at t = 2 hours, 150 at t = 5. Write V(t).',
      promptVi: 'Một hồ chứa rút nước với tốc độ không đổi: 186 nghìn lít ở t = 2 giờ, 150 ở t = 5. Viết V(t).',
      steps: [
        'Rate: (150 − 186) ÷ (5 − 2) = −36 ÷ 3 = −12 per hour.',
        'The volume is falling, so the slope is negative.',
        'Extrapolate to t = 0: at t = 2 it was 186, so at t = 0 it was 186 + 2(12) = 210.',
        'V(t) = 210 − 12t. Check t = 5: 210 − 60 = 150.',
      ],
      stepsVi: [
        'Tốc độ: (150 − 186) ÷ (5 − 2) = −36 ÷ 3 = −12 mỗi giờ.',
        'Thể tích đang giảm nên hệ số góc âm.',
        'Ngoại suy về t = 0: ở t = 2 là 186, nên ở t = 0 là 186 + 2(12) = 210.',
        'V(t) = 210 − 12t. Kiểm tra t = 5: 210 − 60 = 150.',
      ],
      answer: 'V(t) = 210 − 12t',
      answerVi: 'V(t) = 210 − 12t',
    },
    traps: [
      {
        name: 'The first row as intercept',
        nameVi: 'Lấy dòng đầu làm giao điểm',
        why: 'A table rarely starts at zero, but the first value looks like a starting value. Extrapolating back is an extra step that is easy to skip.',
        whyVi: 'Bảng hiếm khi bắt đầu từ không, nhưng giá trị đầu tiên trông như giá trị khởi điểm. Ngoại suy ngược là một bước phụ rất dễ bị bỏ qua.',
      },
      {
        name: 'Total change as rate',
        nameVi: 'Lấy tổng biến thiên làm tốc độ',
        why: 'The numerator is the change you computed, so it feels like the answer. It becomes a rate only after dividing by the interval.',
        whyVi: 'Tử số là biến thiên bạn vừa tính nên nó có cảm giác chính là đáp án. Nó chỉ trở thành tốc độ sau khi chia cho khoảng biến thiên.',
      },
      {
        name: 'Reciprocal without the sign',
        nameVi: 'Nghịch đảo mà quên đổi dấu',
        why: 'Perpendicular has two operations and the flip is the memorable one, so the sign change is what gets dropped.',
        whyVi: 'Vuông góc gồm hai thao tác và việc lật ngược là thao tác dễ nhớ hơn, nên đổi dấu là thứ bị bỏ quên.',
      },
    ],
  },

  {
    skill: 'linear-functions',
    section: 'math',
    title: 'Linear functions',
    titleVi: 'Hàm số bậc nhất',
    minutes: 5,
    idea:
      'When a question asks what the slope or the intercept "means", answer in the units of the problem. Slope carries the units of y per unit of x; the intercept carries the units of y. Getting the units right answers most of these questions on its own.',
    ideaVi:
      'Khi đề hỏi hệ số góc hay giao điểm "có ý nghĩa gì", hãy trả lời bằng đơn vị của bài toán. Hệ số góc mang đơn vị của y trên mỗi đơn vị x; giao điểm mang đơn vị của y. Chỉ cần đúng đơn vị là đã trả lời được phần lớn những câu này.',
    method: [
      'Write down the units of the vertical axis and the horizontal axis.',
      'Slope is "vertical units per horizontal unit". Say it out loud in those words.',
      'The intercept is the vertical value when the horizontal is zero — often "at the start".',
      'Check the option against your sentence, not against your intuition about the situation.',
    ],
    methodVi: [
      'Ghi ra đơn vị của trục dọc và trục ngang.',
      'Hệ số góc là "đơn vị trục dọc trên mỗi đơn vị trục ngang". Hãy nói câu đó thành lời.',
      'Giao điểm là giá trị trục dọc khi trục ngang bằng không — thường là "lúc bắt đầu".',
      'Đối chiếu phương án với câu bạn vừa nói, không phải với cảm giác của bạn về tình huống.',
    ],
    worked: {
      prompt: 'A scatterplot of seedling mass (grams) against days since germination has a line of best fit with slope 0.6. What does the slope mean?',
      promptVi: 'Biểu đồ phân tán khối lượng cây con (gam) theo số ngày từ khi nảy mầm có đường hồi quy với hệ số góc 0,6. Hệ số góc có ý nghĩa gì?',
      steps: [
        'Vertical units: grams. Horizontal units: days.',
        'Slope units: grams per day.',
        'So 0.6 means the seedling gains about 0.6 grams each day.',
      ],
      stepsVi: [
        'Đơn vị trục dọc: gam. Đơn vị trục ngang: ngày.',
        'Đơn vị hệ số góc: gam mỗi ngày.',
        'Vậy 0,6 nghĩa là cây con tăng khoảng 0,6 gam mỗi ngày.',
      ],
      answer: 'The seedling gained about 0.6 grams per day.',
      answerVi: 'Cây con tăng khoảng 0,6 gam mỗi ngày.',
    },
    traps: [
      {
        name: 'Slope described as a total',
        nameVi: 'Mô tả hệ số góc như một tổng',
        why: '"The seedling reached 0.6 grams" uses the right number in the right units and drops the "per day". Dropping the rate is what makes it wrong.',
        whyVi: '"Cây con đạt 0,6 gam" dùng đúng con số, đúng đơn vị, và đánh rơi chữ "mỗi ngày". Chính việc đánh rơi tính tốc độ làm nó sai.',
      },
      {
        name: 'Swapping slope and intercept',
        nameVi: 'Đổi chỗ hệ số góc và giao điểm',
        why: 'Both are numbers attached to the same line, and under time pressure the question of which is which is answered by whichever value you looked at last.',
        whyVi: 'Cả hai đều là con số gắn với cùng một đường thẳng, và dưới áp lực thời gian, câu hỏi "cái nào là cái nào" được trả lời bằng giá trị bạn vừa nhìn sau cùng.',
      },
    ],
  },

  {
    skill: 'linear-systems',
    section: 'math',
    title: 'Systems of two linear equations',
    titleVi: 'Hệ hai phương trình bậc nhất',
    minutes: 6,
    idea:
      'Before solving, look at what is asked. If the question wants x + y, adding the two equations often produces it in one step without ever finding x or y separately.',
    ideaVi:
      'Trước khi giải, hãy nhìn xem đề hỏi gì. Nếu đề muốn x + y, cộng hai phương trình lại thường cho ra ngay trong một bước mà không cần tìm riêng x hay y.',
    method: [
      'Read the question first. Note exactly what expression is wanted.',
      'If the wanted expression is a sum or difference, try adding or subtracting the equations before solving.',
      'Otherwise: eliminate by scaling one equation so a variable cancels, or substitute if one variable is already isolated.',
      'For "infinitely many solutions", the equations are multiples of each other — scale one until the x and y coefficients match, then read off the constant.',
      'For "no solution", the coefficients match but the constants do not.',
    ],
    methodVi: [
      'Đọc câu hỏi trước. Ghi rõ đề muốn biểu thức nào.',
      'Nếu biểu thức cần tìm là một tổng hoặc hiệu, thử cộng hoặc trừ hai phương trình trước khi giải.',
      'Nếu không: khử bằng cách nhân một phương trình sao cho một biến triệt tiêu, hoặc thế nếu một biến đã được tách sẵn.',
      'Với "vô số nghiệm", hai phương trình là bội của nhau — nhân một cái lên cho tới khi hệ số x và y khớp, rồi đọc ra hằng số.',
      'Với "vô nghiệm", hệ số khớp nhưng hằng số thì không.',
    ],
    worked: {
      prompt: 'The system 2x + ky = 8 and 6x + 15y = 24 has infinitely many solutions. Find k.',
      promptVi: 'Hệ 2x + ky = 8 và 6x + 15y = 24 có vô số nghiệm. Tìm k.',
      steps: [
        'Infinitely many solutions means one equation is a multiple of the other.',
        'Divide the second by 3: 2x + 5y = 8.',
        'Compare with 2x + ky = 8. The x coefficients and constants already match.',
        'So k = 5.',
      ],
      stepsVi: [
        'Vô số nghiệm nghĩa là một phương trình là bội của phương trình kia.',
        'Chia phương trình thứ hai cho 3: 2x + 5y = 8.',
        'So với 2x + ky = 8. Hệ số của x và hằng số đã khớp sẵn.',
        'Vậy k = 5.',
      ],
      answer: 'k = 5',
      answerVi: 'k = 5',
    },
    traps: [
      {
        name: 'Reporting the scale factor',
        nameVi: 'Trả lời hệ số nhân',
        why: 'Dividing by 3 is the step that makes the problem work, so 3 is the number you were just thinking about when you looked at the options.',
        whyVi: 'Chia cho 3 là bước làm bài toán chạy được, nên 3 là con số bạn vừa nghĩ tới ngay lúc nhìn vào các phương án.',
      },
      {
        name: 'Copying the unscaled coefficient',
        nameVi: 'Chép hệ số chưa quy đổi',
        why: 'Fifteen appears in the problem and is a coefficient of y, which is what was asked for. It is the right kind of thing on the wrong scale.',
        whyVi: 'Số 15 xuất hiện trong đề và là hệ số của y — đúng thứ được hỏi. Nó đúng loại nhưng sai thang.',
      },
      {
        name: 'Solving when you did not need to',
        nameVi: 'Giải trong khi không cần giải',
        why: 'Full elimination always works, so it is what training produces. It costs a minute on a question that adding the equations answers in ten seconds.',
        whyVi: 'Khử hoàn toàn luôn cho ra kết quả nên đó là thứ việc luyện tập tạo ra. Nó tốn một phút cho câu mà chỉ cần cộng hai phương trình là xong trong mười giây.',
      },
    ],
  },

  {
    skill: 'linear-inequalities',
    section: 'math',
    title: 'Linear inequalities',
    titleVi: 'Bất phương trình bậc nhất',
    minutes: 5,
    idea:
      'Inequalities behave exactly like equations with one exception, and the whole question type is built around that exception: multiplying or dividing by a negative flips the direction.',
    ideaVi:
      'Bất phương trình hành xử y hệt phương trình, trừ đúng một ngoại lệ, và cả dạng câu hỏi này được dựng lên quanh ngoại lệ đó: nhân hoặc chia cho một số âm sẽ đảo chiều dấu.',
    method: [
      'Solve exactly as you would an equation.',
      'Every time you multiply or divide by a negative number, flip the sign. Mark it on the page.',
      'For "at most" or "no more than", the boundary value is allowed. For "fewer than", it is not.',
      'In a word problem, subtract the fixed load first, then divide by the per-unit amount, then take the floor.',
    ],
    methodVi: [
      'Giải y như giải một phương trình.',
      'Mỗi lần nhân hoặc chia cho số âm, hãy đảo dấu. Đánh dấu ngay trên giấy.',
      'Với "nhiều nhất" hoặc "không quá", giá trị biên được phép. Với "ít hơn", thì không.',
      'Trong bài toán chữ, trừ phần tải cố định trước, rồi chia cho lượng trên mỗi đơn vị, rồi lấy phần nguyên dưới.',
    ],
    worked: {
      prompt: 'Solve −3(x − 4) > 2x + 7.',
      promptVi: 'Giải −3(x − 4) > 2x + 7.',
      steps: [
        'Distribute: −3x + 12 > 2x + 7.',
        'Subtract 2x: −5x + 12 > 7.',
        'Subtract 12: −5x > −5.',
        'Divide by −5 and flip: x < 1.',
      ],
      stepsVi: [
        'Phân phối: −3x + 12 > 2x + 7.',
        'Trừ 2x: −5x + 12 > 7.',
        'Trừ 12: −5x > −5.',
        'Chia cho −5 và đảo dấu: x < 1.',
      ],
      answer: 'x < 1',
      answerVi: 'x < 1',
    },
    traps: [
      {
        name: 'Forgetting the flip',
        nameVi: 'Quên đảo dấu',
        why: 'Every arithmetic step was correct, so the work looks right on review. The resulting answer is always among the options, with the sign the other way.',
        whyVi: 'Mọi bước tính đều đúng nên khi soát lại bài trông vẫn ổn. Kết quả sai đó luôn nằm trong các phương án, chỉ khác chiều dấu.',
      },
      {
        name: 'Excluding an allowed boundary',
        nameVi: 'Loại mất giá trị biên được phép',
        why: '"At most 900 kg" includes exactly 900. When the division comes out even, the correct count and the count below it are both offered.',
        whyVi: '"Nhiều nhất 900 kg" bao gồm cả đúng 900. Khi phép chia ra số chẵn, cả đáp án đúng lẫn đáp án nhỏ hơn một đơn vị đều được đưa ra.',
      },
    ],
  },

  {
    skill: 'equivalent-expressions',
    section: 'math',
    title: 'Equivalent expressions',
    titleVi: 'Biểu thức tương đương',
    minutes: 5,
    idea:
      'Factor before you expand. A rational expression that looks hard almost always has a common factor waiting, and expanding first turns a two-line problem into a five-line one.',
    ideaVi:
      'Hãy phân tích thành nhân tử trước khi khai triển. Một biểu thức hữu tỉ trông khó thì gần như luôn có sẵn một nhân tử chung, và khai triển trước sẽ biến bài hai dòng thành bài năm dòng.',
    method: [
      'Look for a difference of squares (a² − b²), a perfect square (a² ± 2ab + b²), or a common factor.',
      'Factor the numerator and the denominator completely.',
      'Cancel only whole factors, never individual terms.',
      'If nothing factors, expand carefully and combine like terms, watching the signs.',
      'To find an unknown coefficient, expand and match the coefficient of each power separately.',
    ],
    methodVi: [
      'Tìm hiệu hai bình phương (a² − b²), bình phương của một tổng/hiệu (a² ± 2ab + b²), hoặc nhân tử chung.',
      'Phân tích tử và mẫu thành nhân tử một cách triệt để.',
      'Chỉ rút gọn cả nhân tử, không bao giờ rút gọn từng hạng tử riêng lẻ.',
      'Nếu không phân tích được, hãy khai triển cẩn thận và gom hạng tử đồng dạng, chú ý dấu.',
      'Để tìm hệ số chưa biết, khai triển rồi đồng nhất hệ số của từng bậc riêng.',
    ],
    worked: {
      prompt: 'For x ≠ ±2, simplify (x² − 4) ÷ (x² + 4x + 4).',
      promptVi: 'Với x ≠ ±2, rút gọn (x² − 4) ÷ (x² + 4x + 4).',
      steps: [
        'Numerator is a difference of squares: (x − 2)(x + 2).',
        'Denominator is a perfect square: (x + 2)².',
        'Cancel one factor of (x + 2).',
      ],
      stepsVi: [
        'Tử là hiệu hai bình phương: (x − 2)(x + 2).',
        'Mẫu là bình phương của một tổng: (x + 2)².',
        'Rút gọn một nhân tử (x + 2).',
      ],
      answer: '(x − 2)/(x + 2)',
      answerVi: '(x − 2)/(x + 2)',
    },
    traps: [
      {
        name: 'Cancelling terms, not factors',
        nameVi: 'Rút gọn hạng tử thay vì nhân tử',
        why: 'Crossing out matching symbols on the top and bottom looks like the same operation as cancelling a factor. It is not, and it produces an option that is offered.',
        whyVi: 'Gạch bỏ các ký hiệu giống nhau ở tử và mẫu trông giống hệt thao tác rút gọn nhân tử. Nhưng không phải, và nó cho ra đúng một phương án được đề đặt sẵn.',
      },
      {
        name: 'Sign error on the middle term',
        nameVi: 'Sai dấu ở hạng tử giữa',
        why: 'Combining −6x and +5x mentally is where the error happens. Writing the four products on separate lines costs five seconds and removes it.',
        whyVi: 'Gom −6x và +5x trong đầu chính là chỗ sinh lỗi. Viết bốn tích ra bốn dòng riêng tốn năm giây và loại bỏ lỗi đó.',
      },
    ],
  },

  {
    skill: 'nonlinear-equations',
    section: 'math',
    title: 'Nonlinear equations and systems',
    titleVi: 'Phương trình và hệ phi tuyến',
    minutes: 6,
    idea:
      'You often do not need the roots. For ax² + bx + c = 0, the sum of the solutions is −b/a and the product is c/a. And "exactly one real solution" always means the discriminant is zero.',
    ideaVi:
      'Nhiều khi bạn không cần tìm nghiệm. Với ax² + bx + c = 0, tổng các nghiệm là −b/a và tích là c/a. Còn "có đúng một nghiệm thực" luôn nghĩa là biệt thức bằng không.',
    method: [
      'Read what is asked: a root, the sum, the product, or a condition on a constant.',
      'For a sum or a product, use −b/a and c/a. Do not solve.',
      'For "exactly one solution", set b² − 4ac = 0 and solve for the unknown.',
      'For "no real solutions", set b² − 4ac < 0. For "two", set it greater than zero.',
      'If you do need the roots, try factoring first; use the formula only when factoring fails.',
    ],
    methodVi: [
      'Đọc xem đề hỏi gì: một nghiệm, tổng, tích, hay một điều kiện lên hằng số.',
      'Với tổng hoặc tích, dùng −b/a và c/a. Đừng giải.',
      'Với "đúng một nghiệm", đặt b² − 4ac = 0 và giải theo ẩn cần tìm.',
      'Với "vô nghiệm thực", đặt b² − 4ac < 0. Với "hai nghiệm", đặt lớn hơn không.',
      'Nếu thật sự cần nghiệm, thử phân tích nhân tử trước; chỉ dùng công thức khi không phân tích được.',
    ],
    worked: {
      prompt: '2x² + 12x + c = 0 has exactly one real solution. Find c.',
      promptVi: '2x² + 12x + c = 0 có đúng một nghiệm thực. Tìm c.',
      steps: [
        'Exactly one real solution means b² − 4ac = 0.',
        'Here a = 2, b = 12.',
        '12² − 4(2)c = 0, so 144 = 8c.',
        'c = 18.',
      ],
      stepsVi: [
        'Đúng một nghiệm thực nghĩa là b² − 4ac = 0.',
        'Ở đây a = 2, b = 12.',
        '12² − 4(2)c = 0, vậy 144 = 8c.',
        'c = 18.',
      ],
      answer: 'c = 18',
      answerVi: 'c = 18',
    },
    traps: [
      {
        name: 'Treating a as 1',
        nameVi: 'Coi a bằng 1',
        why: 'Most practice quadratics are monic, so 144 ÷ 4 = 36 comes out automatically. The leading coefficient is the thing this question is testing.',
        whyVi: 'Phần lớn phương trình bậc hai khi luyện có hệ số bậc hai bằng 1, nên 144 ÷ 4 = 36 bật ra theo phản xạ. Hệ số bậc cao nhất chính là thứ câu này đang kiểm tra.',
      },
      {
        name: 'Sum instead of product',
        nameVi: 'Nhầm tổng với tích',
        why: 'Both are one-step results from the same coefficients, and there is nothing in the arithmetic to signal which you computed.',
        whyVi: 'Cả hai đều là kết quả một bước từ cùng bộ hệ số, và trong phép tính không có gì báo cho bạn biết mình vừa tính cái nào.',
      },
      {
        name: 'Reporting one root',
        nameVi: 'Trả lời một nghiệm',
        why: 'Factoring gives you two numbers and the question asks for one number. Whichever root you wrote down last is offered as an option.',
        whyVi: 'Phân tích nhân tử cho bạn hai con số còn đề hỏi một con số. Nghiệm bạn viết ra sau cùng luôn có mặt trong phương án.',
      },
    ],
  },

  {
    skill: 'nonlinear-functions',
    section: 'math',
    title: 'Nonlinear functions',
    titleVi: 'Hàm số phi tuyến',
    minutes: 6,
    idea:
      'In vertex form a(x − h)² + k, the vertex is (h, k) and k is the maximum when a is negative, the minimum when a is positive. For exponential growth, the exponent counts how many doubling periods have passed — so it is t divided by the period, not multiplied.',
    ideaVi:
      'Ở dạng đỉnh a(x − h)² + k, đỉnh là (h, k), và k là giá trị lớn nhất khi a âm, nhỏ nhất khi a dương. Với tăng trưởng mũ, số mũ đếm số chu kỳ nhân đôi đã trôi qua — nên nó là t *chia* cho chu kỳ, không phải nhân.',
    method: [
      'For a quadratic in vertex form, read h and k directly. Watch the sign: (x − 3) gives h = +3.',
      'The squared term is never negative, so a negative a makes k the maximum.',
      'For exponential growth, write N(t) = N₀ · (factor)^(t ÷ period).',
      'Always test your exponential at t = one period. It must multiply the start by exactly the factor.',
    ],
    methodVi: [
      'Với hàm bậc hai ở dạng đỉnh, đọc h và k trực tiếp. Chú ý dấu: (x − 3) cho h = +3.',
      'Bình phương không bao giờ âm, nên a âm làm cho k là giá trị lớn nhất.',
      'Với tăng trưởng mũ, viết N(t) = N₀ · (hệ số)^(t ÷ chu kỳ).',
      'Luôn thử hàm mũ của bạn ở t = một chu kỳ. Nó phải nhân giá trị đầu lên đúng bằng hệ số.',
    ],
    worked: {
      prompt: 'A culture doubles every 4 hours starting from 500 cells. Write N(t).',
      promptVi: 'Một mẻ vi khuẩn nhân đôi mỗi 4 giờ, bắt đầu từ 500 tế bào. Viết N(t).',
      steps: [
        'The factor is 2, the period is 4 hours.',
        'In t hours there are t ÷ 4 periods.',
        'N(t) = 500 · 2^(t/4).',
        'Test at t = 4: 500 · 2¹ = 1000. Correct — it doubled once.',
      ],
      stepsVi: [
        'Hệ số là 2, chu kỳ là 4 giờ.',
        'Trong t giờ có t ÷ 4 chu kỳ.',
        'N(t) = 500 · 2^(t/4).',
        'Thử t = 4: 500 · 2¹ = 1000. Đúng — đã nhân đôi một lần.',
      ],
      answer: 'N(t) = 500 · 2^(t/4)',
      answerVi: 'N(t) = 500 · 2^(t/4)',
    },
    traps: [
      {
        name: 'Multiplying by the period',
        nameVi: 'Nhân với chu kỳ',
        why: '2^(4t) reads as "doubles, four hours" and the numbers are all present. Testing at one period exposes it instantly, and the test is the step most often skipped.',
        whyVi: '2^(4t) đọc lên nghe như "nhân đôi, bốn giờ" và các con số đều có mặt. Thử ở một chu kỳ là lộ ngay, mà bước thử lại là bước hay bị bỏ nhất.',
      },
      {
        name: 'Vertex x-coordinate as the maximum',
        nameVi: 'Lấy hoành độ đỉnh làm giá trị lớn nhất',
        why: 'Both h and k are visible in the same expression. The question asks for the maximum value of the function, which is k.',
        whyVi: 'Cả h và k đều nhìn thấy trong cùng một biểu thức. Đề hỏi giá trị lớn nhất của hàm số, tức là k.',
      },
      {
        name: 'Sign of h',
        nameVi: 'Dấu của h',
        why: 'The form contains a minus sign, so (x − 3)² looks like it should give −3. Substituting x = 3 to make the bracket zero settles it.',
        whyVi: 'Trong công thức có dấu trừ nên (x − 3)² trông như phải cho ra −3. Thay x = 3 để ngoặc bằng không là giải quyết xong.',
      },
    ],
  },

  {
    skill: 'ratios-rates-units',
    section: 'math',
    title: 'Ratios, rates, proportions, and units',
    titleVi: 'Tỉ lệ, tốc độ và đơn vị',
    minutes: 5,
    idea:
      'Convert units before doing anything else, and write the units next to every number. Most errors in this topic are not arithmetic — they are multiplying a per-minute rate by a number of hours.',
    ideaVi:
      'Hãy đổi đơn vị trước khi làm bất cứ gì, và viết đơn vị ngay cạnh mỗi con số. Phần lớn lỗi ở chủ đề này không phải lỗi tính — mà là nhân một tốc độ trên phút với một số giờ.',
    method: [
      'Write every quantity with its unit.',
      'Convert so that the rate\'s unit and the time\'s unit match.',
      'Find the per-one-unit rate, then multiply.',
      'Check the units of your answer against the units the question asks for.',
    ],
    methodVi: [
      'Viết mọi đại lượng kèm đơn vị của nó.',
      'Đổi đơn vị sao cho đơn vị của tốc độ khớp với đơn vị của thời gian.',
      'Tìm tốc độ trên một đơn vị, rồi nhân.',
      'Kiểm tra đơn vị của kết quả so với đơn vị mà đề hỏi.',
    ],
    worked: {
      prompt: 'A pipeline moves 45 cubic metres per minute. How much does it move in 2.5 hours?',
      promptVi: 'Một đường ống chuyển 45 mét khối mỗi phút. Nó chuyển được bao nhiêu trong 2,5 giờ?',
      steps: [
        'The rate is per minute; the time is in hours. Convert first.',
        '2.5 hours = 150 minutes.',
        '45 m³/min × 150 min = 6,750 m³. The minutes cancel, leaving cubic metres.',
      ],
      stepsVi: [
        'Tốc độ tính theo phút; thời gian tính theo giờ. Đổi đơn vị trước.',
        '2,5 giờ = 150 phút.',
        '45 m³/phút × 150 phút = 6.750 m³. Đơn vị phút triệt tiêu, còn lại mét khối.',
      ],
      answer: '6,750 cubic metres',
      answerVi: '6.750 mét khối',
    },
    traps: [
      {
        name: 'Mismatched units',
        nameVi: 'Đơn vị không khớp',
        why: '45 × 2.5 is a clean number and the arithmetic is correct. Nothing about the result signals that the units never matched.',
        whyVi: '45 × 2,5 ra một số đẹp và phép tính hoàn toàn đúng. Không có gì trong kết quả báo cho bạn biết đơn vị chưa từng khớp.',
      },
      {
        name: 'Multiplying instead of dividing to find a rate',
        nameVi: 'Nhân thay vì chia khi tìm tốc độ',
        why: 'Given "1,400 pages in 8 minutes", both operations produce a plausible number, and only the units distinguish them.',
        whyVi: 'Với "1.400 trang trong 8 phút", cả hai phép tính đều cho ra con số nghe hợp lý, và chỉ đơn vị mới phân biệt được.',
      },
    ],
  },

  {
    skill: 'percentages',
    section: 'math',
    title: 'Percentages',
    titleVi: 'Phần trăm',
    minutes: 5,
    idea:
      'Every percentage question turns on one thing: what is the base? A percent increase is computed on the original value, so reversing it means dividing by (1 + rate), never subtracting the same percentage from the new figure.',
    ideaVi:
      'Mọi câu về phần trăm đều xoay quanh một điều: gốc là cái nào? Phần trăm tăng được tính trên giá trị ban đầu, nên muốn đảo ngược thì phải *chia* cho (1 + tỉ lệ), chứ không bao giờ là trừ đúng tỉ lệ đó khỏi giá trị mới.',
    method: [
      'Identify the base — the value the percentage is taken of.',
      'Increase of r% → multiply by (1 + r/100). Decrease → multiply by (1 − r/100).',
      'To reverse an increase, divide by the same factor.',
      'Successive percentage changes multiply. They never add.',
      'Sanity check: reversing a 25% increase should give a number smaller than the new value by less than 25%.',
    ],
    methodVi: [
      'Xác định gốc — giá trị mà phần trăm được tính trên đó.',
      'Tăng r% → nhân với (1 + r/100). Giảm → nhân với (1 − r/100).',
      'Muốn đảo ngược một mức tăng, hãy chia cho đúng hệ số đó.',
      'Các mức thay đổi phần trăm liên tiếp thì *nhân* với nhau. Không bao giờ cộng.',
      'Kiểm tra nhanh: đảo ngược mức tăng 25% phải cho con số nhỏ hơn giá trị mới nhưng ít hơn 25%.',
    ],
    worked: {
      prompt: 'After a 25% increase, a population is 8,750. What was it before?',
      promptVi: 'Sau khi tăng 25%, dân số là 8.750. Trước đó là bao nhiêu?',
      steps: [
        'The new value is 1.25 times the old.',
        'So the old value is 8,750 ÷ 1.25 = 7,000.',
        'Check: 7,000 × 1.25 = 8,750.',
      ],
      stepsVi: [
        'Giá trị mới bằng 1,25 lần giá trị cũ.',
        'Vậy giá trị cũ là 8.750 ÷ 1,25 = 7.000.',
        'Kiểm tra: 7.000 × 1,25 = 8.750.',
      ],
      answer: '7,000',
      answerVi: '7.000',
    },
    traps: [
      {
        name: 'Subtracting the same percentage',
        nameVi: 'Trừ đúng tỉ lệ đó đi',
        why: '8,750 × 0.75 = 6,562.5 uses the right rate on the wrong base. It is the most common percentage error and it is always among the options.',
        whyVi: '8.750 × 0,75 = 6.562,5 dùng đúng tỉ lệ nhưng sai gốc. Đây là lỗi phần trăm phổ biến nhất và luôn có mặt trong các phương án.',
      },
      {
        name: 'Adding successive changes',
        nameVi: 'Cộng các mức thay đổi liên tiếp',
        why: '20% off then 15% off feels like 35% off. It is 0.80 × 0.85 = 0.68, so 32% off — and 65% is offered as the distractor.',
        whyVi: 'Giảm 20% rồi giảm tiếp 15% cho cảm giác là giảm 35%. Thực tế là 0,80 × 0,85 = 0,68, tức giảm 32% — và 65% được đặt sẵn làm phương án nhiễu.',
      },
    ],
  },

  {
    skill: 'one-variable-data',
    section: 'math',
    title: 'One-variable data: distributions and measures',
    titleVi: 'Dữ liệu một biến: phân phối và số đo',
    minutes: 6,
    idea:
      'One extreme value moves the mean and leaves the median almost untouched. That single fact answers most questions in this topic, including every question about which measure to prefer.',
    ideaVi:
      'Một giá trị cực đoan sẽ kéo trung bình đi và gần như không đụng tới trung vị. Riêng điều đó trả lời được phần lớn câu hỏi trong chủ đề này, kể cả mọi câu hỏi về nên dùng số đo nào.',
    method: [
      'Sort the values. The median is the middle one, or the average of the middle two.',
      'Scan for an outlier. If there is one, the mean is pulled toward it and the median is not.',
      'A high outlier means mean > median. A low outlier means mean < median.',
      'Standard deviation measures spread about the mean and says nothing about the mean itself, or about sample size.',
    ],
    methodVi: [
      'Sắp xếp các giá trị. Trung vị là giá trị ở giữa, hoặc trung bình hai giá trị giữa.',
      'Quét tìm giá trị ngoại lai. Nếu có, trung bình bị kéo về phía nó còn trung vị thì không.',
      'Ngoại lai lớn → trung bình > trung vị. Ngoại lai nhỏ → trung bình < trung vị.',
      'Độ lệch chuẩn đo mức phân tán quanh trung bình, và không nói gì về bản thân trung bình, cũng không nói gì về cỡ mẫu.',
    ],
    worked: {
      prompt: 'For the list 3, 4, 4, 5, 6, 7, 8, 9, 26 — is the mean above or below the median?',
      promptVi: 'Với dãy 3, 4, 4, 5, 6, 7, 8, 9, 26 — trung bình lớn hơn hay nhỏ hơn trung vị?',
      steps: [
        'Nine values, already sorted. The median is the fifth: 6.',
        'The sum is 72, so the mean is 8.',
        'The 26 is a high outlier, so it pulls the mean up. Mean 8 > median 6.',
      ],
      stepsVi: [
        'Chín giá trị, đã sắp xếp sẵn. Trung vị là giá trị thứ năm: 6.',
        'Tổng là 72, nên trung bình là 8.',
        'Số 26 là ngoại lai lớn nên kéo trung bình lên. Trung bình 8 > trung vị 6.',
      ],
      answer: 'The mean is greater than the median.',
      answerVi: 'Trung bình lớn hơn trung vị.',
    },
    traps: [
      {
        name: 'Reading standard deviation as performance',
        nameVi: 'Đọc độ lệch chuẩn như thành tích',
        why: 'A larger number feels like a worse or better result. It is neither — two classes with identical means can have very different spreads.',
        whyVi: 'Con số lớn hơn cho cảm giác kết quả tệ hơn hoặc tốt hơn. Nó không phải cả hai — hai lớp có trung bình y hệt nhau vẫn có thể phân tán rất khác nhau.',
      },
      {
        name: 'Assuming mean equals median',
        nameVi: 'Mặc định trung bình bằng trung vị',
        why: 'They coincide in a symmetric distribution, which is what most textbook examples are. Real data on this test almost always has a tail.',
        whyVi: 'Chúng trùng nhau trong phân phối đối xứng, mà phần lớn ví dụ trong sách là như vậy. Dữ liệu thật trong kỳ thi này hầu như luôn có đuôi lệch.',
      },
    ],
  },

  {
    skill: 'two-variable-data',
    section: 'math',
    title: 'Two-variable data: models and scatterplots',
    titleVi: 'Dữ liệu hai biến: mô hình và biểu đồ phân tán',
    minutes: 5,
    idea:
      'Read a line of best fit the same way you read any line: the slope is a rate in the units of the axes, and the intercept is the value at zero. Interpolating inside the data is safe; extrapolating far outside it is not.',
    ideaVi:
      'Hãy đọc đường hồi quy y như đọc bất kỳ đường thẳng nào: hệ số góc là một tốc độ theo đơn vị của hai trục, và giao điểm là giá trị tại không. Nội suy trong vùng dữ liệu thì an toàn; ngoại suy ra xa ngoài vùng đó thì không.',
    method: [
      'Name the units of both axes before reading any number.',
      'To predict, read the line — not the nearest data point.',
      'For "how many points lie above the line", count, do not estimate.',
      'A strong correlation does not establish a cause. Look for whether the question slipped from "associated with" to "causes".',
    ],
    methodVi: [
      'Gọi tên đơn vị của cả hai trục trước khi đọc bất kỳ con số nào.',
      'Muốn dự đoán thì đọc trên đường thẳng — không đọc điểm dữ liệu gần nhất.',
      'Với câu "bao nhiêu điểm nằm trên đường", hãy đếm, đừng ước lượng.',
      'Tương quan mạnh không xác lập quan hệ nhân quả. Hãy để ý xem câu hỏi có lén chuyển từ "liên quan tới" thành "gây ra" không.',
    ],
    worked: {
      prompt: 'A line of best fit for mass against days has slope 0.6 and intercept 2. Predict the mass at day 15.',
      promptVi: 'Đường hồi quy khối lượng theo số ngày có hệ số góc 0,6 và giao điểm 2. Dự đoán khối lượng ở ngày 15.',
      steps: [
        'The model is mass = 0.6 × days + 2.',
        'At day 15: 0.6 × 15 + 2 = 9 + 2 = 11 grams.',
        'Day 15 is inside the observed range, so this is interpolation and is sound.',
      ],
      stepsVi: [
        'Mô hình là khối lượng = 0,6 × số ngày + 2.',
        'Ở ngày 15: 0,6 × 15 + 2 = 9 + 2 = 11 gam.',
        'Ngày 15 nằm trong vùng dữ liệu đã quan sát, nên đây là nội suy và đáng tin.',
      ],
      answer: '11 grams',
      answerVi: '11 gam',
    },
    traps: [
      {
        name: 'Reading a data point instead of the line',
        nameVi: 'Đọc điểm dữ liệu thay vì đọc đường',
        why: 'The dot is what your eye lands on. The line is the model, and the question asks what the model predicts.',
        whyVi: 'Chấm dữ liệu là thứ mắt bạn bắt gặp trước. Đường thẳng mới là mô hình, và câu hỏi hỏi mô hình dự đoán gì.',
      },
      {
        name: 'Correlation read as cause',
        nameVi: 'Đọc tương quan thành nhân quả',
        why: 'A tight fit feels like proof of a mechanism. The option that names a cause is always the most satisfying one on offer.',
        whyVi: 'Một đường khớp sát cho cảm giác đã chứng minh được cơ chế. Phương án gọi tên nguyên nhân luôn là phương án thoả mãn nhất trong số được đưa ra.',
      },
    ],
  },

  {
    skill: 'probability',
    section: 'math',
    title: 'Probability and conditional probability',
    titleVi: 'Xác suất và xác suất có điều kiện',
    minutes: 5,
    idea:
      'The whole question is the denominator. "Selected at random from those who used the service" means the total is the users, not everyone surveyed. Underline the conditioning phrase before you touch the table.',
    ideaVi:
      'Toàn bộ câu hỏi nằm ở mẫu số. "Chọn ngẫu nhiên trong số những người đã dùng dịch vụ" nghĩa là tổng là số người dùng, không phải tất cả người được khảo sát. Hãy gạch chân cụm điều kiện trước khi động vào bảng.',
    method: [
      'Underline the phrase beginning "from those who" or "given that". That names the denominator.',
      'Find that total in the table — usually a row or column total, not the grand total.',
      'The numerator is the cell where the condition and the asked-for category meet.',
      'Check: your denominator should be smaller than the grand total whenever the question conditions on anything.',
    ],
    methodVi: [
      'Gạch chân cụm bắt đầu bằng "trong số những người" hoặc "biết rằng". Cụm đó gọi tên mẫu số.',
      'Tìm tổng đó trong bảng — thường là tổng dòng hoặc tổng cột, không phải tổng chung.',
      'Tử số là ô giao giữa điều kiện và nhóm mà đề hỏi.',
      'Kiểm tra: mẫu số của bạn phải nhỏ hơn tổng chung bất cứ khi nào câu hỏi có điều kiện.',
    ],
    worked: {
      prompt:
        'Of 200 commuters, 98 used the service; 54 of those are under 30. Selected at random from service users, what is the probability of being under 30?',
      promptVi:
        'Trong 200 người đi làm, 98 người đã dùng dịch vụ; 54 trong số đó dưới 30 tuổi. Chọn ngẫu nhiên trong số người dùng dịch vụ, xác suất người đó dưới 30 là bao nhiêu?',
      steps: [
        'The conditioning phrase is "from service users". Denominator = 98.',
        'Numerator: users who are also under 30 = 54.',
        '54/98.',
      ],
      stepsVi: [
        'Cụm điều kiện là "trong số người dùng dịch vụ". Mẫu số = 98.',
        'Tử số: người dùng đồng thời dưới 30 = 54.',
        '54/98.',
      ],
      answer: '54/98',
      answerVi: '54/98',
    },
    traps: [
      {
        name: 'The grand total',
        nameVi: 'Tổng chung',
        why: '54/200 uses the same numerator and the most visible total in the table. It answers a question that was not asked.',
        whyVi: '54/200 dùng đúng tử số và dùng cái tổng dễ thấy nhất trong bảng. Nó trả lời một câu hỏi không được hỏi.',
      },
      {
        name: 'Conditioning on the wrong variable',
        nameVi: 'Điều kiện theo biến sai',
        why: '54/90 conditions on age instead of on service use. Both are row totals and both look like a legitimate denominator.',
        whyVi: '54/90 lấy điều kiện theo độ tuổi thay vì theo việc dùng dịch vụ. Cả hai đều là tổng dòng và đều trông như một mẫu số hợp lệ.',
      },
    ],
  },

  {
    skill: 'inference-statistics',
    section: 'math',
    title: 'Inference from sample statistics',
    titleVi: 'Suy luận từ thống kê mẫu',
    minutes: 6,
    idea:
      'A confidence interval is a statement about a population mean, never about individuals. "$142 ± $6" says the average is plausibly in that range. It says nothing about what any one person spends.',
    ideaVi:
      'Khoảng tin cậy là một phát biểu về trung bình tổng thể, không bao giờ về từng cá nhân. "142$ ± 6$" nói rằng giá trị trung bình có khả năng nằm trong khoảng đó. Nó không nói gì về mức chi tiêu của bất kỳ một người nào.',
    method: [
      'Read the option and ask: is it about a mean, or about individuals? If individuals, reject it.',
      'Check the population it claims to describe. A random sample of one city licenses claims about that city only.',
      'A larger sample narrows the interval. It does not move the estimate in a predictable direction.',
      'The confidence level is not the proportion of individuals inside the interval.',
    ],
    methodVi: [
      'Đọc phương án và hỏi: nó nói về trung bình hay về từng cá nhân? Nếu về cá nhân thì loại.',
      'Kiểm tra tổng thể mà nó tuyên bố mô tả. Mẫu ngẫu nhiên của một thành phố chỉ cho phép kết luận về thành phố đó.',
      'Mẫu lớn hơn làm hẹp khoảng. Nó không đẩy ước lượng theo một chiều dự đoán được.',
      'Mức tin cậy không phải là tỉ lệ cá nhân nằm trong khoảng.',
    ],
    worked: {
      prompt: 'A random sample of 400 city residents spends a mean of $142 weekly, margin of error $6 at 95% confidence. What follows?',
      promptVi: 'Mẫu ngẫu nhiên 400 cư dân chi trung bình 142$ mỗi tuần, sai số biên 6$ ở mức tin cậy 95%. Kết luận nào đúng?',
      steps: [
        'The interval is $136 to $148.',
        'It describes the population mean, not any individual.',
        'The population is residents of this city, because that is who was sampled.',
      ],
      stepsVi: [
        'Khoảng là từ 136$ tới 148$.',
        'Nó mô tả trung bình của tổng thể, không phải bất kỳ cá nhân nào.',
        'Tổng thể là cư dân thành phố này, vì đó là nhóm được lấy mẫu.',
      ],
      answer: 'It is plausible that the mean weekly spend of all residents is between $136 and $148.',
      answerVi: 'Có cơ sở để cho rằng mức chi trung bình mỗi tuần của toàn bộ cư dân nằm trong khoảng 136$ đến 148$.',
    },
    traps: [
      {
        name: 'Applying the interval to individuals',
        nameVi: 'Áp khoảng cho từng cá nhân',
        why: '"Every resident spends between $136 and $148" uses the right numbers and is a far stronger claim than the data supports.',
        whyVi: '"Mọi cư dân đều chi từ 136$ đến 148$" dùng đúng các con số nhưng là một khẳng định mạnh hơn nhiều so với những gì dữ liệu cho phép.',
      },
      {
        name: 'The confidence level as a proportion',
        nameVi: 'Coi mức tin cậy là một tỉ lệ',
        why: '"Exactly 95% of residents spend in this range" reuses the 95 in a way that sounds technical and means something entirely different.',
        whyVi: '"Đúng 95% cư dân chi trong khoảng này" tái sử dụng con số 95 theo cách nghe rất chuyên môn nhưng mang nghĩa hoàn toàn khác.',
      },
    ],
  },

  {
    skill: 'statistical-claims',
    section: 'math',
    title: 'Evaluating statistical claims',
    titleVi: 'Đánh giá tuyên bố thống kê',
    minutes: 6,
    idea:
      'Two separate questions, always asked together and easily confused. Random *assignment* licenses a causal claim. Random *selection* licenses generalisation. A study can have one without the other.',
    ideaVi:
      'Hai câu hỏi tách biệt, luôn được hỏi cùng lúc và rất dễ nhầm. *Phân nhóm* ngẫu nhiên cho phép kết luận nhân quả. *Chọn mẫu* ngẫu nhiên cho phép khái quát hoá. Một nghiên cứu có thể có cái này mà không có cái kia.',
    method: [
      'Ask: were participants randomly assigned to groups? If yes, a causal claim is allowed.',
      'Ask: were participants randomly selected from a population? If yes, generalisation to that population is allowed.',
      'Volunteers from a club: causal claim allowed, generalisation limited to people like them.',
      'An observational survey: generalisation allowed, causal claim not.',
      'Reject any option that goes further than the study\'s design permits, even if it is probably true.',
    ],
    methodVi: [
      'Hỏi: người tham gia có được phân nhóm ngẫu nhiên không? Nếu có, được phép kết luận nhân quả.',
      'Hỏi: người tham gia có được chọn ngẫu nhiên từ một tổng thể không? Nếu có, được phép khái quát cho tổng thể đó.',
      'Tình nguyện viên từ một câu lạc bộ: được kết luận nhân quả, nhưng khái quát chỉ giới hạn ở nhóm tương tự.',
      'Khảo sát quan sát: được khái quát, nhưng không được kết luận nhân quả.',
      'Loại mọi phương án đi xa hơn những gì thiết kế nghiên cứu cho phép, kể cả khi nó nhiều khả năng là đúng.',
    ],
    worked: {
      prompt:
        'Volunteers from a running club were randomly assigned to a new programme or their usual routine. The programme group ran significantly faster after twelve weeks. What follows?',
      promptVi:
        'Tình nguyện viên từ một câu lạc bộ chạy bộ được phân ngẫu nhiên vào chương trình mới hoặc lịch tập cũ. Sau mười hai tuần, nhóm theo chương trình chạy nhanh hơn đáng kể. Kết luận nào đúng?',
      steps: [
        'Random assignment is present, so causation is licensed.',
        'Random selection is absent — they volunteered, and from one club.',
        'So: causal claim yes, generalisation limited to similar club runners.',
      ],
      stepsVi: [
        'Có phân nhóm ngẫu nhiên, nên được phép kết luận nhân quả.',
        'Không có chọn mẫu ngẫu nhiên — họ tự nguyện, và từ một câu lạc bộ.',
        'Vậy: kết luận nhân quả thì được, nhưng khái quát chỉ giới hạn ở người chạy bộ trong câu lạc bộ tương tự.',
      ],
      answer: 'The programme likely causes faster times among runners like these.',
      answerVi: 'Chương trình nhiều khả năng giúp chạy nhanh hơn ở những người chạy bộ tương tự nhóm này.',
    },
    traps: [
      {
        name: 'Generalising to everyone',
        nameVi: 'Khái quát cho tất cả mọi người',
        why: 'The causal finding is real, which makes the broader claim feel like a natural extension of it. Selection, not assignment, is what limits reach.',
        whyVi: 'Kết luận nhân quả là có thật, khiến khẳng định rộng hơn có cảm giác như phần mở rộng tự nhiên của nó. Nhưng thứ giới hạn phạm vi là cách chọn mẫu, không phải cách phân nhóm.',
      },
      {
        name: 'Refusing causation entirely',
        nameVi: 'Từ chối nhân quả hoàn toàn',
        why: 'Volunteer recruitment is a real weakness, and "you cannot conclude causation" is a habit reinforced by every other statistics question. Random assignment overrides it here.',
        whyVi: 'Tuyển tình nguyện viên đúng là một điểm yếu, và "không thể kết luận nhân quả" là phản xạ được củng cố bởi mọi câu thống kê khác. Nhưng ở đây phân nhóm ngẫu nhiên vượt lên trên điều đó.',
      },
    ],
  },

  {
    skill: 'area-volume',
    section: 'math',
    title: 'Area and volume',
    titleVi: 'Diện tích và thể tích',
    minutes: 5,
    idea:
      'The formulas are given to you on the reference sheet, so this topic never tests memory. It tests whether you substituted into the right one and squared the right quantity.',
    ideaVi:
      'Công thức đã có sẵn trong bảng tham chiếu, nên chủ đề này không bao giờ kiểm tra trí nhớ. Nó kiểm tra xem bạn có thay số vào đúng công thức và bình phương đúng đại lượng hay không.',
    method: [
      'Open the reference sheet. Do not work from memory.',
      'Write the formula, then substitute, then compute — three separate lines.',
      'Check which quantity is squared or cubed. In πr²h only the radius is squared.',
      'Check the units: area is squared units, volume is cubed.',
      'When solving for a missing dimension, substitute the known volume and divide once.',
    ],
    methodVi: [
      'Mở bảng công thức. Đừng làm theo trí nhớ.',
      'Viết công thức, rồi thay số, rồi tính — ba dòng riêng biệt.',
      'Kiểm tra đại lượng nào được bình phương hay lập phương. Trong πr²h chỉ có bán kính được bình phương.',
      'Kiểm tra đơn vị: diện tích là đơn vị bình phương, thể tích là đơn vị lập phương.',
      'Khi tìm một kích thước còn thiếu, thay thể tích đã biết vào rồi chia một lần.',
    ],
    worked: {
      prompt: 'A cylinder has radius 3 m and height 10 m. Find its volume.',
      promptVi: 'Một hình trụ có bán kính 3 m và chiều cao 10 m. Tính thể tích.',
      steps: [
        'Formula: V = πr²h.',
        'Substitute: V = π(3²)(10).',
        'Compute: π(9)(10) = 90π cubic metres.',
      ],
      stepsVi: [
        'Công thức: V = πr²h.',
        'Thay số: V = π(3²)(10).',
        'Tính: π(9)(10) = 90π mét khối.',
      ],
      answer: '90π cubic metres',
      answerVi: '90π mét khối',
    },
    traps: [
      {
        name: 'Squaring the wrong quantity',
        nameVi: 'Bình phương nhầm đại lượng',
        why: 'Squaring the height as well gives 900π, which looks like a properly worked answer. Writing the substitution on its own line prevents it.',
        whyVi: 'Bình phương luôn cả chiều cao cho ra 900π, trông như một đáp án đã tính đàng hoàng. Viết bước thay số ra một dòng riêng sẽ ngăn được lỗi này.',
      },
      {
        name: 'Circumference instead of area',
        nameVi: 'Dùng chu vi thay cho diện tích',
        why: '2πr and πr² are adjacent on the reference sheet and both describe a circle. The base of a cylinder is its area.',
        whyVi: '2πr và πr² nằm cạnh nhau trong bảng công thức và cùng mô tả một đường tròn. Đáy hình trụ là diện tích, không phải chu vi.',
      },
    ],
  },

  {
    skill: 'lines-angles-triangles',
    section: 'math',
    title: 'Lines, angles, and triangles',
    titleVi: 'Đường thẳng, góc và tam giác',
    minutes: 5,
    idea:
      'Two facts carry most of this topic: angles in a triangle sum to 180°, and similar triangles scale lengths by k but areas by k². The second is where the difficulty is.',
    ideaVi:
      'Hai sự kiện gánh phần lớn chủ đề này: tổng ba góc trong tam giác là 180°, và tam giác đồng dạng thì độ dài nhân k nhưng diện tích nhân k². Cái khó nằm ở điều thứ hai.',
    method: [
      'For missing angles, use 180° in a triangle and 180° on a straight line.',
      'For similar figures, find the linear scale factor k from a pair of corresponding sides.',
      'Lengths scale by k. Areas scale by k². Volumes scale by k³.',
      'Say which one the question asks for before computing.',
    ],
    methodVi: [
      'Với góc còn thiếu, dùng 180° trong tam giác và 180° trên đường thẳng.',
      'Với hình đồng dạng, tìm hệ số tỉ lệ độ dài k từ một cặp cạnh tương ứng.',
      'Độ dài nhân k. Diện tích nhân k². Thể tích nhân k³.',
      'Xác định đề hỏi cái nào trước khi tính.',
    ],
    worked: {
      prompt: 'Triangle ABC ~ DEF with AB = 6 and DE = 15. The area of ABC is 20. Find the area of DEF.',
      promptVi: 'Tam giác ABC ~ DEF với AB = 6 và DE = 15. Diện tích ABC là 20. Tính diện tích DEF.',
      steps: [
        'Linear scale factor: k = 15 ÷ 6 = 5/2.',
        'Areas scale by k² = 25/4.',
        '20 × 25/4 = 125.',
      ],
      stepsVi: [
        'Hệ số tỉ lệ độ dài: k = 15 ÷ 6 = 5/2.',
        'Diện tích nhân k² = 25/4.',
        '20 × 25/4 = 125.',
      ],
      answer: '125',
      answerVi: '125',
    },
    traps: [
      {
        name: 'Scaling area by k',
        nameVi: 'Nhân diện tích với k',
        why: '20 × 5/2 = 50 uses the correct scale factor in the wrong power. The factor was computed correctly, which is what makes it feel finished.',
        whyVi: '20 × 5/2 = 50 dùng đúng hệ số tỉ lệ nhưng sai luỹ thừa. Hệ số đã tính đúng, và chính điều đó tạo cảm giác bài đã xong.',
      },
      {
        name: 'Summing two angles instead of subtracting',
        nameVi: 'Cộng hai góc thay vì trừ',
        why: '42 + 71 = 113 is a plausible angle and appears among the options. The third angle is 180 minus that sum.',
        whyVi: '42 + 71 = 113 là một số đo góc nghe hợp lý và có mặt trong các phương án. Góc thứ ba là 180 trừ đi tổng đó.',
      },
    ],
  },

  {
    skill: 'right-triangles-trig',
    section: 'math',
    title: 'Right triangles and trigonometry',
    titleVi: 'Tam giác vuông và lượng giác',
    minutes: 5,
    idea:
      'Label the three sides relative to the angle in question — opposite, adjacent, hypotenuse — before writing any ratio. Most errors here are labelling errors, not trigonometry errors.',
    ideaVi:
      'Hãy gán nhãn ba cạnh theo góc đang xét — đối, kề, huyền — trước khi viết bất kỳ tỉ số nào. Phần lớn lỗi ở đây là lỗi gán nhãn, không phải lỗi lượng giác.',
    method: [
      'Mark the angle in question. Label the side across from it "opposite" and the non-hypotenuse side touching it "adjacent".',
      'Find any missing side with a² + b² = c², or recognise a triple: 3-4-5, 5-12-13, 8-15-17, 7-24-25.',
      'Write the ratio: sin = opp/hyp, cos = adj/hyp, tan = opp/adj.',
      'Reduce the fraction only at the end.',
    ],
    methodVi: [
      'Đánh dấu góc đang xét. Gán cạnh đối diện nó là "đối", và cạnh kề nó (không phải huyền) là "kề".',
      'Tìm cạnh còn thiếu bằng a² + b² = c², hoặc nhận ra bộ ba: 3-4-5, 5-12-13, 8-15-17, 7-24-25.',
      'Viết tỉ số: sin = đối/huyền, cos = kề/huyền, tan = đối/kề.',
      'Chỉ rút gọn phân số ở bước cuối.',
    ],
    worked: {
      prompt: 'In a right triangle, the leg adjacent to θ is 9 and the hypotenuse is 15. Find sin θ.',
      promptVi: 'Trong một tam giác vuông, cạnh kề góc θ bằng 9 và cạnh huyền bằng 15. Tính sin θ.',
      steps: [
        'The missing leg is opposite θ: √(15² − 9²) = √144 = 12.',
        '(Or recognise 9-12-15 as 3-4-5 scaled by 3.)',
        'sin θ = opposite ÷ hypotenuse = 12/15 = 4/5.',
      ],
      stepsVi: [
        'Cạnh còn thiếu là cạnh đối θ: √(15² − 9²) = √144 = 12.',
        '(Hoặc nhận ra 9-12-15 là 3-4-5 nhân 3.)',
        'sin θ = đối ÷ huyền = 12/15 = 4/5.',
      ],
      answer: '4/5',
      answerVi: '4/5',
    },
    traps: [
      {
        name: 'Giving cosine when sine was asked',
        nameVi: 'Cho cosin khi đề hỏi sin',
        why: '9/15 = 3/5 uses the two lengths the question handed you, so it requires no extra work. That is exactly why it is offered.',
        whyVi: '9/15 = 3/5 dùng đúng hai độ dài mà đề đã cho sẵn, nên không cần làm thêm bước nào. Chính vì thế nó được đặt sẵn làm phương án.',
      },
      {
        name: 'Subtracting inside the wrong operation',
        nameVi: 'Trừ nhầm trong công thức',
        why: 'When finding a leg you subtract; when finding the hypotenuse you add. Both feel like "using Pythagoras" and the arithmetic gives a clean number either way.',
        whyVi: 'Tìm cạnh góc vuông thì trừ; tìm cạnh huyền thì cộng. Cả hai đều cho cảm giác "đang dùng Pythagoras" và đều ra số đẹp.',
      },
    ],
  },

  {
    skill: 'circles',
    section: 'math',
    title: 'Circles',
    titleVi: 'Đường tròn',
    minutes: 6,
    idea:
      'A circle equation in expanded form is asking you to complete the square. Once it is in (x − h)² + (y − k)² = r², the centre and radius are simply read off — and the right-hand side is r², not r.',
    ideaVi:
      'Phương trình đường tròn ở dạng khai triển chính là yêu cầu bạn hoàn thành bình phương. Khi đã về dạng (x − h)² + (y − k)² = r², tâm và bán kính chỉ việc đọc ra — và vế phải là r², không phải r.',
    method: [
      'Group the x terms and the y terms; move the constant to the right.',
      'For each group, halve the coefficient of the linear term and square it. Add that to both sides.',
      'Write each group as a squared bracket.',
      'The centre is (h, k) with the signs flipped from the brackets. The radius is the square root of the right side.',
      'For arcs and sectors, take the fraction of the circle: angle ÷ 360.',
    ],
    methodVi: [
      'Gom các hạng tử x và các hạng tử y; chuyển hằng số sang vế phải.',
      'Với mỗi nhóm, lấy nửa hệ số của hạng tử bậc nhất rồi bình phương. Cộng số đó vào cả hai vế.',
      'Viết mỗi nhóm thành một bình phương trong ngoặc.',
      'Tâm là (h, k) với dấu ngược lại so với trong ngoặc. Bán kính là căn bậc hai của vế phải.',
      'Với cung và hình quạt, lấy phần của cả đường tròn: góc ÷ 360.',
    ],
    worked: {
      prompt: 'x² + y² − 6x + 8y = 0 defines a circle. Find its radius.',
      promptVi: 'x² + y² − 6x + 8y = 0 xác định một đường tròn. Tìm bán kính.',
      steps: [
        'Group: (x² − 6x) + (y² + 8y) = 0.',
        'Half of −6 is −3; squared is 9. Half of 8 is 4; squared is 16.',
        'Add both to each side: (x² − 6x + 9) + (y² + 8y + 16) = 25.',
        '(x − 3)² + (y + 4)² = 25, so r = √25 = 5.',
      ],
      stepsVi: [
        'Gom nhóm: (x² − 6x) + (y² + 8y) = 0.',
        'Nửa của −6 là −3; bình phương là 9. Nửa của 8 là 4; bình phương là 16.',
        'Cộng cả hai vào hai vế: (x² − 6x + 9) + (y² + 8y + 16) = 25.',
        '(x − 3)² + (y + 4)² = 25, vậy r = √25 = 5.',
      ],
      answer: 'r = 5',
      answerVi: 'r = 5',
    },
    traps: [
      {
        name: 'Reporting r² as r',
        nameVi: 'Trả lời r² thay vì r',
        why: '25 is the number sitting on the right-hand side when the work is finished, so it feels like the result of the work.',
        whyVi: '25 là con số nằm ở vế phải khi bài đã làm xong, nên nó cho cảm giác chính là kết quả của bài.',
      },
      {
        name: 'Forgetting to add to both sides',
        nameVi: 'Quên cộng vào cả hai vế',
        why: 'Completing the square on the left is the visible step; adding the same amount on the right is bookkeeping, and bookkeeping is what gets dropped.',
        whyVi: 'Hoàn thành bình phương ở vế trái là bước nhìn thấy được; cộng đúng lượng đó sang vế phải chỉ là ghi sổ, mà ghi sổ chính là thứ hay bị bỏ quên.',
      },
      {
        name: 'Sign of the centre',
        nameVi: 'Dấu của tâm',
        why: '(y + 4)² means k = −4. The bracket shows a plus and the coordinate is a minus, every time.',
        whyVi: '(y + 4)² nghĩa là k = −4. Trong ngoặc là dấu cộng còn toạ độ là dấu trừ, lần nào cũng vậy.',
      },
    ],
  },
];
