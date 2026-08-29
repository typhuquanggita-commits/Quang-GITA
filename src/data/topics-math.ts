/**
 * Topic data for Math: recognition and consolidation.
 *
 * The đọc-vị work is different in Math from Reading and Writing. In RW the
 * question type is usually announced by the stem. In Math it is disguised: a
 * question about linear systems arrives as a story about tickets, and the
 * whole difficulty is seeing which machinery applies before spending three
 * minutes on the wrong one.
 *
 * So the cues here are mostly structural — what is given, what is asked, what
 * shape the unknowns take — rather than verbal.
 *
 * See `topics.ts` for the shape and the reasoning behind it.
 */

import type { Topic } from './topics.ts';

export const MATH_TOPICS: Topic[] = [
  {
    skill: 'linear-equations-1var',
    types: [
      {
        name: 'Solve for the variable',
        nameVi: 'Giải tìm ẩn',
        cue: 'One unknown, first power only, an equals sign.',
        cueVi: 'Một ẩn, chỉ bậc nhất, có dấu bằng.',
        move: 'Clear fractions and parentheses first, then collect the variable on one side. Do not distribute a negative in your head.',
        moveVi: 'Khử phân số và ngoặc trước, rồi gom ẩn về một vế. Đừng phân phối dấu trừ trong đầu.',
      },
      {
        name: 'Solve for something other than x',
        nameVi: 'Tìm một biểu thức khác, không phải x',
        cue: 'The question asks for 2x, x + 3, or the value of an expression.',
        cueVi: 'Đề hỏi 2x, x + 3, hoặc giá trị của một biểu thức.',
        move: 'Underline what is actually asked before solving. Solving correctly and answering the wrong quantity is the trap this type is built on.',
        moveVi: 'Gạch chân điều thực sự được hỏi trước khi giải. Giải đúng rồi trả lời sai đại lượng chính là cái bẫy dạng này dựng lên.',
      },
      {
        name: 'No solution or infinitely many',
        nameVi: 'Vô nghiệm hoặc vô số nghiệm',
        cue: 'A coefficient is left as a letter, and the question asks for what value there is no solution.',
        cueVi: 'Một hệ số để dưới dạng chữ, và đề hỏi với giá trị nào thì phương trình vô nghiệm.',
        move: 'No solution means identical variable coefficients with different constants. Infinitely many means both match.',
        moveVi: 'Vô nghiệm nghĩa là hệ số của ẩn giống nhau nhưng hằng số khác nhau. Vô số nghiệm nghĩa là cả hai đều khớp.',
      },
    ],
    secure: [
      'You underline the quantity asked for before you start solving.',
      'You never distribute a negative sign mentally.',
      'You can state the condition for no solution without deriving it each time.',
      'You check your answer by substitution when time allows, and you know when it does not.',
    ],
    secureVi: [
      'Bạn gạch chân đại lượng được hỏi trước khi bắt đầu giải.',
      'Bạn không bao giờ phân phối dấu trừ trong đầu.',
      'Bạn nêu được điều kiện vô nghiệm mà không phải suy lại từ đầu mỗi lần.',
      'Bạn thử lại bằng cách thế khi còn thời gian, và biết khi nào thì không còn.',
    ],
    regression:
      'Answering the wrong quantity returns first, and it returns fastest on questions you find easy — because those are the ones you stop reading carefully.',
    regressionVi:
      'Lỗi trả lời sai đại lượng quay lại trước, và quay lại nhanh nhất ở những câu bạn thấy dễ — vì đó chính là những câu bạn thôi đọc kỹ.',
  },

  {
    skill: 'linear-equations-2var',
    types: [
      {
        name: 'Interpret slope or intercept in context',
        nameVi: 'Diễn giải hệ số góc hoặc tung độ gốc trong ngữ cảnh',
        cue: 'An equation models a real situation and the question asks what a number means.',
        cueVi: 'Một phương trình mô hình hoá tình huống thực và đề hỏi một con số nghĩa là gì.',
        move: 'Slope is a rate: units of y per one unit of x. Intercept is the value when x is zero. Say both in the story’s own units.',
        moveVi: 'Hệ số góc là một tốc độ: đơn vị của y trên mỗi đơn vị x. Tung độ gốc là giá trị khi x bằng 0. Nói cả hai bằng chính đơn vị của bài toán.',
      },
      {
        name: 'Write the equation from a description',
        nameVi: 'Viết phương trình từ một mô tả',
        cue: 'A situation is described in words and the options are equations.',
        cueVi: 'Một tình huống được mô tả bằng lời và các phương án là phương trình.',
        move: 'Identify the starting amount and the per-unit change before writing anything. Those are the intercept and the slope.',
        moveVi: 'Xác định lượng ban đầu và mức thay đổi trên mỗi đơn vị trước khi viết gì. Đó chính là tung độ gốc và hệ số góc.',
      },
      {
        name: 'Find a point on the line',
        nameVi: 'Tìm một điểm trên đường thẳng',
        cue: 'A pair of coordinates, or a value of one variable, is given.',
        cueVi: 'Cho một cặp toạ độ, hoặc giá trị của một biến.',
        move: 'Substitute; do not rearrange. Rearranging first is slower and adds a step where a sign can be lost.',
        moveVi: 'Thế vào; đừng biến đổi. Biến đổi trước thì chậm hơn và thêm một bước có thể mất dấu.',
      },
    ],
    secure: [
      'You state slope as a rate with units, not as "the number in front of x".',
      'You identify the starting value and the rate before writing an equation.',
      'You substitute rather than rearrange when a coordinate is given.',
      'You can move between equation, table, and graph without re-deriving.',
    ],
    secureVi: [
      'Bạn phát biểu hệ số góc như một tốc độ có đơn vị, không phải "số đứng trước x".',
      'Bạn xác định giá trị ban đầu và tốc độ trước khi viết phương trình.',
      'Bạn thế vào thay vì biến đổi khi đã cho một toạ độ.',
      'Bạn chuyển qua lại giữa phương trình, bảng và đồ thị mà không phải suy lại.',
    ],
    regression:
      'Units drop out of the interpretation first, and then slope becomes "the number in front of x" — which is right until the equation is not in that form.',
    regressionVi:
      'Đơn vị rơi khỏi phần diễn giải trước, rồi hệ số góc thành "số đứng trước x" — đúng cho đến khi phương trình không ở dạng đó.',
  },

  {
    skill: 'linear-functions',
    types: [
      {
        name: 'Evaluate or interpret f(x)',
        nameVi: 'Tính hoặc diễn giải f(x)',
        cue: 'Function notation appears with a specific input.',
        cueVi: 'Ký hiệu hàm số xuất hiện cùng một giá trị đầu vào cụ thể.',
        move: 'f(3) means substitute 3 for every x. It is not multiplication, and it is not a new variable.',
        moveVi: 'f(3) nghĩa là thay 3 vào mọi chỗ có x. Đó không phải phép nhân, cũng không phải một biến mới.',
      },
      {
        name: 'Build the function from two points',
        nameVi: 'Lập hàm số từ hai điểm',
        cue: 'Two input–output pairs are given in a table or in words.',
        cueVi: 'Cho hai cặp vào–ra trong bảng hoặc bằng lời.',
        move: 'Rate first from the two pairs, then back-substitute one pair for the constant.',
        moveVi: 'Tính tốc độ trước từ hai cặp, rồi thế ngược một cặp để tìm hằng số.',
      },
    ],
    secure: [
      'Function notation never reads as multiplication to you, even under time pressure.',
      'You compute the rate before the constant, always in that order.',
      'You can read a linear function off a table without writing the equation.',
      'You interpret f(0) as the starting value automatically.',
    ],
    secureVi: [
      'Ký hiệu hàm số không bao giờ bị bạn đọc thành phép nhân, kể cả khi gấp.',
      'Bạn luôn tính tốc độ trước rồi mới tới hằng số, đúng thứ tự đó.',
      'Bạn đọc được một hàm bậc nhất từ bảng mà không cần viết phương trình.',
      'Bạn tự động hiểu f(0) là giá trị ban đầu.',
    ],
    regression:
      'Under pressure f(x) starts reading as f times x again, and the error is silent because the arithmetic still works out to a listed option.',
    regressionVi:
      'Khi gấp, f(x) lại bắt đầu bị đọc thành f nhân x, và lỗi này im lặng vì phép tính vẫn ra một phương án có sẵn.',
  },

  {
    skill: 'linear-systems',
    types: [
      {
        name: 'Solve the system',
        nameVi: 'Giải hệ',
        cue: 'Two equations, two unknowns.',
        cueVi: 'Hai phương trình, hai ẩn.',
        move: 'Choose elimination when a coefficient already matches or is easy to match; substitution only when one variable is already isolated.',
        moveVi: 'Chọn phương pháp cộng đại số khi một hệ số đã khớp hoặc dễ khớp; chỉ dùng thế khi một ẩn đã được cô lập sẵn.',
      },
      {
        name: 'A word problem hiding a system',
        nameVi: 'Bài toán lời văn giấu một hệ',
        cue: 'Two quantities, two facts relating them — usually a total count and a total value.',
        cueVi: 'Hai đại lượng, hai dữ kiện liên hệ chúng — thường là tổng số lượng và tổng giá trị.',
        move: 'Define both variables in writing with units before setting up. Undefined variables is where these go wrong, not the algebra.',
        moveVi: 'Định nghĩa cả hai ẩn bằng chữ kèm đơn vị trước khi lập hệ. Chỗ hỏng của dạng này là ẩn không được định nghĩa, không phải phần đại số.',
      },
      {
        name: 'Number of solutions',
        nameVi: 'Số nghiệm của hệ',
        cue: 'The question asks how many solutions, or for what value of a constant there are none.',
        cueVi: 'Đề hỏi hệ có bao nhiêu nghiệm, hoặc với giá trị nào của hằng số thì vô nghiệm.',
        move: 'Compare slopes, not solutions. Same slope with different intercepts means parallel and no solution.',
        moveVi: 'So sánh hệ số góc, không phải nghiệm. Cùng hệ số góc nhưng khác tung độ gốc nghĩa là song song và vô nghiệm.',
      },
    ],
    secure: [
      'You write down what each variable stands for, with units, before setting up.',
      'You pick elimination or substitution by looking at the coefficients, not by habit.',
      'You answer the quantity asked, which is often the sum or difference rather than either variable.',
      'You can decide the number of solutions by comparing slopes without solving.',
    ],
    secureVi: [
      'Bạn viết ra mỗi ẩn đại diện cho gì, kèm đơn vị, trước khi lập hệ.',
      'Bạn chọn cộng đại số hay thế bằng cách nhìn hệ số, không phải theo thói quen.',
      'Bạn trả lời đúng đại lượng được hỏi — thường là tổng hoặc hiệu chứ không phải một ẩn.',
      'Bạn xác định được số nghiệm bằng cách so hệ số góc mà không cần giải.',
    ],
    regression:
      'Skipping the variable definitions comes back first, and after that a correct solve answers the wrong question.',
    regressionVi:
      'Bỏ bước định nghĩa ẩn quay lại trước, và sau đó một phép giải đúng lại trả lời sai câu hỏi.',
  },

  {
    skill: 'linear-inequalities',
    types: [
      {
        name: 'Solve and report the range',
        nameVi: 'Giải và nêu khoảng nghiệm',
        cue: 'An inequality sign instead of an equals sign.',
        cueVi: 'Dấu bất đẳng thức thay cho dấu bằng.',
        move: 'Solve exactly as an equation, except that multiplying or dividing by a negative flips the sign. Mark that step when it happens.',
        moveVi: 'Giải y hệt phương trình, chỉ khác là nhân hoặc chia cho số âm thì đổi chiều. Đánh dấu bước đó khi nó xảy ra.',
      },
      {
        name: 'System of inequalities and its region',
        nameVi: 'Hệ bất phương trình và miền nghiệm',
        cue: 'Two or more inequalities, often with a graph or a "which point satisfies" question.',
        cueVi: 'Hai bất phương trình trở lên, thường kèm đồ thị hoặc câu hỏi "điểm nào thoả mãn".',
        move: 'Test the candidate points rather than shading. Substitution is faster and cannot be misdrawn.',
        moveVi: 'Thử các điểm cho sẵn thay vì tô miền. Thế vào nhanh hơn và không thể vẽ sai.',
      },
      {
        name: 'Constraint from a story',
        nameVi: 'Ràng buộc từ một tình huống',
        cue: 'Words like "at least", "no more than", "at most".',
        cueVi: 'Những từ như "at least", "no more than", "at most".',
        move: 'Translate the phrase before doing anything: "at least" is ≥, "no more than" is ≤. Get this wrong and the algebra cannot save you.',
        moveVi: 'Dịch cụm từ trước khi làm gì khác: "at least" là ≥, "no more than" là ≤. Sai chỗ này thì phần đại số không cứu được.',
      },
    ],
    secure: [
      'You mark the sign flip explicitly whenever you divide by a negative.',
      'You translate "at least" and "no more than" without pausing to think.',
      'You test points rather than shading regions.',
      'You check whether the endpoint is included before choosing between < and ≤.',
    ],
    secureVi: [
      'Bạn đánh dấu rõ bước đổi chiều mỗi khi chia cho số âm.',
      'Bạn dịch "at least" và "no more than" mà không phải dừng lại nghĩ.',
      'Bạn thử điểm thay vì tô miền.',
      'Bạn kiểm tra điểm biên có được tính hay không trước khi chọn giữa < và ≤.',
    ],
    regression:
      'The forgotten sign flip is the classic decay, and it produces an answer that is exactly wrong rather than obviously wrong.',
    regressionVi:
      'Quên đổi chiều là kiểu suy giảm kinh điển, và nó cho ra đáp án sai chính xác chứ không phải sai lộ liễu.',
  },

  {
    skill: 'equivalent-expressions',
    types: [
      {
        name: 'Factor or expand',
        nameVi: 'Phân tích hoặc khai triển',
        cue: 'Options are the same expression written differently.',
        cueVi: 'Các phương án là cùng một biểu thức viết khác đi.',
        move: 'Work toward whatever form the question needs, not toward "simplest". Sometimes the factored form is the answer.',
        moveVi: 'Biến đổi về đúng dạng câu hỏi cần, không phải về dạng "gọn nhất". Đôi khi dạng phân tích mới là đáp án.',
      },
      {
        name: 'Exponent and radical rules',
        nameVi: 'Quy tắc luỹ thừa và căn',
        cue: 'Fractional or negative exponents, or a radical to be rewritten.',
        cueVi: 'Số mũ phân số hoặc âm, hoặc một căn thức cần viết lại.',
        move: 'Convert every radical to a fractional exponent first. One notation means one set of rules.',
        moveVi: 'Chuyển mọi căn thức về số mũ phân số trước. Một hệ ký hiệu thì chỉ một bộ quy tắc.',
      },
      {
        name: 'Rational expression',
        nameVi: 'Biểu thức hữu tỉ',
        cue: 'A fraction with variables in the denominator.',
        cueVi: 'Một phân thức có biến ở mẫu.',
        move: 'Factor both parts fully before cancelling anything. Cancelling across a sum is the error this type exists to catch.',
        moveVi: 'Phân tích đầy đủ cả tử và mẫu trước khi rút gọn gì. Rút gọn qua một tổng chính là lỗi mà dạng này sinh ra để bắt.',
      },
    ],
    secure: [
      'You never cancel a term across a sum.',
      'You convert radicals to fractional exponents rather than mixing notations.',
      'You aim at the form the question needs, not at "simplest".',
      'You can verify an equivalence by substituting a convenient number when unsure.',
    ],
    secureVi: [
      'Bạn không bao giờ rút gọn một hạng tử qua dấu cộng.',
      'Bạn chuyển căn thành số mũ phân số thay vì trộn hai hệ ký hiệu.',
      'Bạn nhắm tới dạng câu hỏi cần, không phải dạng "gọn nhất".',
      'Bạn kiểm chứng được một đẳng thức bằng cách thế một số tiện khi chưa chắc.',
    ],
    regression:
      'Cancelling across a sum returns whenever you start working faster than you write, because the step happens in your head.',
    regressionVi:
      'Rút gọn qua dấu cộng quay lại mỗi khi bạn làm nhanh hơn tốc độ viết, vì bước đó xảy ra trong đầu.',
  },

  {
    skill: 'nonlinear-equations',
    types: [
      {
        name: 'Solve a quadratic',
        nameVi: 'Giải phương trình bậc hai',
        cue: 'A squared variable and an equals sign.',
        cueVi: 'Có biến bình phương và dấu bằng.',
        move: 'Try factoring for about fifteen seconds; if it does not fall out, go to the formula. Deciding fast is worth more than factoring elegantly.',
        moveVi: 'Thử phân tích khoảng mười lăm giây; nếu không ra thì dùng công thức. Quyết định nhanh có giá hơn phân tích đẹp.',
      },
      {
        name: 'Number of real solutions',
        nameVi: 'Số nghiệm thực',
        cue: 'The question asks how many solutions, or for a value of a constant that gives exactly one.',
        cueVi: 'Đề hỏi có bao nhiêu nghiệm, hoặc giá trị nào của hằng số cho đúng một nghiệm.',
        move: 'Use the discriminant. Do not solve — the question did not ask for the solutions.',
        moveVi: 'Dùng biệt thức. Đừng giải — đề không hỏi nghiệm.',
      },
      {
        name: 'Nonlinear system',
        nameVi: 'Hệ phi tuyến',
        cue: 'One linear and one quadratic equation.',
        cueVi: 'Một phương trình bậc nhất và một phương trình bậc hai.',
        move: 'Substitute the linear into the nonlinear, always in that direction. The other way produces an equation nobody can solve quickly.',
        moveVi: 'Thế phương trình bậc nhất vào phương trình bậc hai, luôn theo chiều đó. Chiều ngược lại tạo ra phương trình không ai giải nhanh được.',
      },
    ],
    secure: [
      'You give factoring a fixed, short budget before switching to the formula.',
      'You reach for the discriminant when the question asks about the number of solutions.',
      'You substitute linear into nonlinear without thinking about the direction.',
      'You check for extraneous solutions after squaring both sides.',
    ],
    secureVi: [
      'Bạn cho việc phân tích một hạn mức thời gian ngắn và cố định trước khi chuyển sang công thức.',
      'Bạn nghĩ ngay tới biệt thức khi đề hỏi về số nghiệm.',
      'Bạn thế bậc nhất vào bậc hai mà không phải nghĩ về chiều.',
      'Bạn kiểm tra nghiệm ngoại lai sau khi bình phương hai vế.',
    ],
    regression:
      'Time lost to stubborn factoring is the decay here, not wrong answers. The error shows up as a missing question at the end of the module.',
    regressionVi:
      'Kiểu suy giảm ở đây là mất thời gian vì cố phân tích, không phải đáp án sai. Lỗi hiện ra thành một câu bỏ dở ở cuối phần thi.',
  },

  {
    skill: 'nonlinear-functions',
    types: [
      {
        name: 'Vertex, intercepts, or axis of symmetry',
        nameVi: 'Đỉnh, giao điểm, hoặc trục đối xứng',
        cue: 'A parabola is given and a specific feature is asked for.',
        cueVi: 'Cho một parabol và hỏi một đặc trưng cụ thể.',
        move: 'Match the form to the feature: factored form gives the x-intercepts, vertex form gives the vertex, standard form gives the y-intercept.',
        moveVi: 'Khớp dạng với đặc trưng: dạng phân tích cho giao điểm với trục hoành, dạng đỉnh cho toạ độ đỉnh, dạng chuẩn cho giao điểm với trục tung.',
      },
      {
        name: 'Exponential growth or decay',
        nameVi: 'Tăng trưởng hoặc suy giảm mũ',
        cue: 'The variable is in the exponent, or the story says "each year" with a percentage.',
        cueVi: 'Biến nằm ở số mũ, hoặc bài toán nói "mỗi năm" kèm phần trăm.',
        move: 'The base is 1 + rate for growth and 1 − rate for decay. Read the base and you have read the story.',
        moveVi: 'Cơ số là 1 + tỉ lệ nếu tăng và 1 − tỉ lệ nếu giảm. Đọc được cơ số là đọc được cả bài toán.',
      },
      {
        name: 'Reading a graph of a nonlinear function',
        nameVi: 'Đọc đồ thị hàm phi tuyến',
        cue: 'A curve is drawn and a value or behaviour is asked for.',
        cueVi: 'Một đường cong được vẽ và đề hỏi một giá trị hoặc một tính chất.',
        move: 'Read the scale on both axes before reading the curve. A parabola drawn on an unequal scale does not look like one.',
        moveVi: 'Đọc tỉ lệ trên cả hai trục trước khi đọc đường cong. Một parabol vẽ trên tỉ lệ không đều thì trông không giống parabol.',
      },
    ],
    secure: [
      'You choose the algebraic form by which feature is asked for, not by habit.',
      'You read an exponential base as a growth or decay rate immediately.',
      'You check the axis scales before interpreting any curve.',
      'You can move between a graph, a table, and an equation of the same function.',
    ],
    secureVi: [
      'Bạn chọn dạng đại số theo đặc trưng được hỏi, không theo thói quen.',
      'Bạn đọc cơ số của hàm mũ ra tỉ lệ tăng hay giảm ngay lập tức.',
      'Bạn kiểm tra tỉ lệ trục trước khi diễn giải bất kỳ đường cong nào.',
      'Bạn chuyển được qua lại giữa đồ thị, bảng và phương trình của cùng một hàm.',
    ],
    regression:
      'Converting to the wrong form and then working hard in it is the decay: the algebra is correct and takes three times as long.',
    regressionVi:
      'Kiểu suy giảm là chuyển sai dạng rồi vất vả làm trong dạng đó: phần đại số vẫn đúng và mất gấp ba lần thời gian.',
  },

  {
    skill: 'ratios-rates-units',
    types: [
      {
        name: 'Direct proportion',
        nameVi: 'Tỉ lệ thuận',
        cue: 'Three quantities given, one asked, and doubling one doubles the other.',
        cueVi: 'Cho ba đại lượng, hỏi một, và gấp đôi cái này thì gấp đôi cái kia.',
        move: 'Set up the proportion with matching units across the equals sign, then cross-multiply once.',
        moveVi: 'Lập tỉ lệ với đơn vị khớp nhau qua dấu bằng, rồi nhân chéo một lần.',
      },
      {
        name: 'Unit conversion chain',
        nameVi: 'Chuỗi đổi đơn vị',
        cue: 'The answer is in different units from the data.',
        cueVi: 'Đáp án ở đơn vị khác với dữ liệu.',
        move: 'Write each conversion as a fraction and cancel units on paper. Units that do not cancel mean the setup is wrong, before any arithmetic.',
        moveVi: 'Viết mỗi phép đổi thành một phân số và triệt tiêu đơn vị trên giấy. Đơn vị không triệt tiêu nghĩa là lập sai, trước cả khi tính.',
      },
      {
        name: 'Rate as a comparison',
        nameVi: 'Tốc độ như một phép so sánh',
        cue: 'Speed, density, price per unit, or "per" anywhere in the stem.',
        cueVi: 'Vận tốc, mật độ, đơn giá, hoặc chữ "per" ở bất kỳ đâu trong đề.',
        move: 'A rate is a division. Decide what is being divided by what before touching the numbers.',
        moveVi: 'Một tốc độ là một phép chia. Quyết định cái gì chia cho cái gì trước khi chạm vào các con số.',
      },
    ],
    secure: [
      'You cancel units on paper rather than tracking them mentally.',
      'You notice when an answer is in the wrong units before choosing it.',
      'You set up a proportion with matching units on both sides, automatically.',
      'You can tell a rate question from a total question by the word "per".',
    ],
    secureVi: [
      'Bạn triệt tiêu đơn vị trên giấy thay vì theo dõi trong đầu.',
      'Bạn nhận ra đáp án sai đơn vị trước khi chọn nó.',
      'Bạn tự động lập tỉ lệ với đơn vị khớp ở cả hai vế.',
      'Bạn phân biệt được câu hỏi về tốc độ và câu hỏi về tổng nhờ chữ "per".',
    ],
    regression:
      'Unit cancellation stops being written down first. The arithmetic stays right and the answer stops being.',
    regressionVi:
      'Việc viết ra phép triệt tiêu đơn vị bị bỏ trước tiên. Phép tính vẫn đúng còn đáp án thì thôi đúng.',
  },

  {
    skill: 'percentages',
    types: [
      {
        name: 'Percent of a quantity',
        nameVi: 'Phần trăm của một lượng',
        cue: 'A single percentage applied once.',
        cueVi: 'Một phần trăm áp dụng một lần.',
        move: 'Convert to a decimal and multiply. "Of" is multiplication, every time.',
        moveVi: 'Đổi sang số thập phân rồi nhân. "Of" luôn là phép nhân.',
      },
      {
        name: 'Percent increase or decrease',
        nameVi: 'Tăng hoặc giảm phần trăm',
        cue: 'The stem asks by what percent something changed.',
        cueVi: 'Đề hỏi một đại lượng đã thay đổi bao nhiêu phần trăm.',
        move: 'Divide the change by the original value, never by the new one. Which value is "original" is the whole question.',
        moveVi: 'Lấy phần thay đổi chia cho giá trị ban đầu, không bao giờ chia cho giá trị mới. Giá trị nào là "ban đầu" chính là toàn bộ câu hỏi.',
      },
      {
        name: 'Successive percentage changes',
        nameVi: 'Nhiều lần thay đổi phần trăm liên tiếp',
        cue: 'Two changes applied one after the other.',
        cueVi: 'Hai lần thay đổi áp dụng nối tiếp nhau.',
        move: 'Multiply the factors: a 20% rise then a 20% fall is 1.2 × 0.8 = 0.96, not zero change.',
        moveVi: 'Nhân các hệ số: tăng 20% rồi giảm 20% là 1,2 × 0,8 = 0,96, không phải không đổi.',
      },
    ],
    secure: [
      'You divide by the original value without having to think about which it is.',
      'You multiply factors for successive changes rather than adding percentages.',
      'You convert to decimals immediately instead of working in percent.',
      'You notice when an answer implies a change of more than 100% and check it.',
    ],
    secureVi: [
      'Bạn chia cho giá trị ban đầu mà không phải nghĩ xem cái nào là ban đầu.',
      'Bạn nhân các hệ số cho nhiều lần thay đổi thay vì cộng phần trăm.',
      'Bạn đổi sang số thập phân ngay thay vì làm việc với phần trăm.',
      'Bạn nhận ra khi đáp án hàm ý thay đổi hơn 100% và kiểm tra lại.',
    ],
    regression:
      'Adding successive percentages returns first, because it is faster and gives an answer that appears in the options.',
    regressionVi:
      'Cộng phần trăm liên tiếp quay lại trước, vì nó nhanh hơn và cho ra một đáp án có sẵn trong các phương án.',
  },

  {
    skill: 'one-variable-data',
    types: [
      {
        name: 'Mean, median, or mode',
        nameVi: 'Trung bình, trung vị, hoặc yếu vị',
        cue: 'A list or frequency table with a measure of centre asked for.',
        cueVi: 'Một danh sách hoặc bảng tần số và hỏi một số đo trung tâm.',
        move: 'Check for outliers first. If there is one, the question is almost certainly about the difference between mean and median.',
        moveVi: 'Kiểm tra giá trị ngoại lai trước. Nếu có, câu hỏi gần như chắc chắn về sự khác nhau giữa trung bình và trung vị.',
      },
      {
        name: 'Effect of adding or removing a value',
        nameVi: 'Ảnh hưởng khi thêm hoặc bớt một giá trị',
        cue: 'The stem describes a change to the data set.',
        cueVi: 'Đề mô tả một thay đổi trong tập dữ liệu.',
        move: 'Reason about direction, not recomputation: a value above the mean pulls the mean up and may not move the median at all.',
        moveVi: 'Suy luận theo chiều, đừng tính lại: một giá trị trên trung bình kéo trung bình lên và có thể không làm trung vị nhúc nhích.',
      },
      {
        name: 'Spread and standard deviation',
        nameVi: 'Độ phân tán và độ lệch chuẩn',
        cue: 'Two data sets are compared for variability.',
        cueVi: 'So sánh độ biến thiên của hai tập dữ liệu.',
        move: 'Never compute a standard deviation on the SAT. Compare how tightly the values cluster around the centre.',
        moveVi: 'Đừng bao giờ tính độ lệch chuẩn trong bài SAT. Hãy so sánh mức độ các giá trị bám sát quanh tâm.',
      },
    ],
    secure: [
      'You scan for outliers before computing any measure of centre.',
      'You reason about the direction of a change rather than recomputing.',
      'You compare standard deviations by inspection, never by calculation.',
      'You know that the median resists outliers and the mean does not, without deriving it.',
    ],
    secureVi: [
      'Bạn quét tìm giá trị ngoại lai trước khi tính bất kỳ số đo trung tâm nào.',
      'Bạn suy luận theo chiều thay đổi thay vì tính lại.',
      'Bạn so sánh độ lệch chuẩn bằng quan sát, không bao giờ bằng tính toán.',
      'Bạn biết trung vị kháng ngoại lai còn trung bình thì không, mà không phải suy lại.',
    ],
    regression:
      'Recomputing from scratch instead of reasoning about direction — correct, and slow enough to cost the questions after it.',
    regressionVi:
      'Tính lại từ đầu thay vì suy luận theo chiều — vẫn đúng, và đủ chậm để mất những câu phía sau.',
  },

  {
    skill: 'two-variable-data',
    types: [
      {
        name: 'Line of best fit',
        nameVi: 'Đường hồi quy',
        cue: 'A scatterplot with a line drawn through it.',
        cueVi: 'Một biểu đồ phân tán có một đường vẽ xuyên qua.',
        move: 'Read the line, not the points. The question about the model is not a question about any individual observation.',
        moveVi: 'Đọc đường, không đọc các điểm. Câu hỏi về mô hình không phải câu hỏi về một quan sát riêng lẻ.',
      },
      {
        name: 'Predicting from the model',
        nameVi: 'Dự đoán từ mô hình',
        cue: 'A value is given and a prediction asked for.',
        cueVi: 'Cho một giá trị và hỏi một dự đoán.',
        move: 'Check whether the input is inside the plotted range. Predicting outside it is extrapolation, and some questions test exactly that.',
        moveVi: 'Kiểm tra giá trị đầu vào có nằm trong khoảng đã vẽ không. Dự đoán ngoài khoảng đó là ngoại suy, và có câu hỏi kiểm tra đúng điều này.',
      },
      {
        name: 'Association versus causation',
        nameVi: 'Tương quan và nhân quả',
        cue: 'An option uses "causes", "leads to", or "results in".',
        cueVi: 'Một phương án dùng "causes", "leads to", hoặc "results in".',
        move: 'A scatterplot from observational data never establishes cause. This eliminates an option outright.',
        moveVi: 'Biểu đồ phân tán từ dữ liệu quan sát không bao giờ thiết lập được nhân quả. Điều này loại thẳng một phương án.',
      },
    ],
    secure: [
      'You read the fitted line rather than individual points when asked about the model.',
      'You check whether a prediction is interpolation or extrapolation.',
      'Causal language on observational data eliminates an option immediately for you.',
      'You can describe a residual as the vertical gap between a point and the line.',
    ],
    secureVi: [
      'Bạn đọc đường hồi quy chứ không đọc từng điểm khi được hỏi về mô hình.',
      'Bạn kiểm tra một dự đoán là nội suy hay ngoại suy.',
      'Ngôn ngữ nhân quả trên dữ liệu quan sát khiến bạn loại phương án đó ngay.',
      'Bạn mô tả được phần dư là khoảng cách thẳng đứng từ điểm tới đường.',
    ],
    regression:
      'Reading the nearest data point instead of the line comes back first, and it gives an answer close enough to look right.',
    regressionVi:
      'Đọc điểm dữ liệu gần nhất thay vì đọc đường quay lại trước, và nó cho ra đáp án đủ gần để trông có vẻ đúng.',
  },

  {
    skill: 'probability',
    types: [
      {
        name: 'Probability from a two-way table',
        nameVi: 'Xác suất từ bảng hai chiều',
        cue: 'A table with row and column totals.',
        cueVi: 'Một bảng có tổng hàng và tổng cột.',
        move: 'Find the denominator first — that is what the question actually determines. The numerator is then obvious.',
        moveVi: 'Tìm mẫu số trước — đó mới là thứ câu hỏi thực sự quyết định. Tử số sau đó thì hiển nhiên.',
      },
      {
        name: 'Conditional probability',
        nameVi: 'Xác suất có điều kiện',
        cue: 'The words "given that" or "among those who".',
        cueVi: 'Cụm "given that" hoặc "among those who".',
        move: 'The condition sets the denominator to that subgroup, not to the whole table. Circle the row or column before computing.',
        moveVi: 'Điều kiện đặt mẫu số về đúng nhóm con đó, không phải cả bảng. Khoanh hàng hoặc cột đó trước khi tính.',
      },
    ],
    secure: [
      'You identify the denominator before the numerator, always.',
      'The phrase "given that" makes you narrow the denominator automatically.',
      'You can express a probability as a fraction of the correct subgroup without re-reading the table.',
      'You notice when a probability comes out above 1 and know you took the wrong denominator.',
    ],
    secureVi: [
      'Bạn luôn xác định mẫu số trước tử số.',
      'Cụm "given that" khiến bạn tự động thu hẹp mẫu số.',
      'Bạn biểu diễn được xác suất theo đúng nhóm con mà không phải đọc lại bảng.',
      'Bạn nhận ra khi xác suất ra lớn hơn 1 và biết mình đã lấy sai mẫu số.',
    ],
    regression:
      'The whole-table denominator creeps back on conditional questions, and the resulting answer is always one of the options.',
    regressionVi:
      'Mẫu số cả bảng lẻn lại vào câu hỏi có điều kiện, và đáp án ra được luôn nằm trong các phương án.',
  },

  {
    skill: 'inference-statistics',
    types: [
      {
        name: 'What a sample supports',
        nameVi: 'Một mẫu ủng hộ được điều gì',
        cue: 'A study is described and the stem asks what conclusion is appropriate.',
        cueVi: 'Mô tả một nghiên cứu và đề hỏi kết luận nào là phù hợp.',
        move: 'The conclusion can extend only to the population that was actually sampled. Find that population in the text first.',
        moveVi: 'Kết luận chỉ mở rộng được tới đúng quần thể đã được lấy mẫu. Tìm quần thể đó trong văn bản trước.',
      },
      {
        name: 'Margin of error',
        nameVi: 'Biên sai số',
        cue: 'An estimate is given with a plus-or-minus figure.',
        cueVi: 'Một ước lượng được cho kèm một khoảng cộng trừ.',
        move: 'The interval is the estimate; the point value is not. A larger sample narrows the interval and nothing else.',
        moveVi: 'Khoảng mới là ước lượng; giá trị điểm thì không. Mẫu lớn hơn làm hẹp khoảng, và không thay đổi gì khác.',
      },
    ],
    secure: [
      'You locate the sampled population before evaluating any conclusion.',
      'You reject a conclusion extended beyond the group that was sampled.',
      'You read a margin of error as an interval rather than a caveat.',
      'You know that a larger sample narrows the interval without changing the estimate’s centre.',
    ],
    secureVi: [
      'Bạn định vị quần thể được lấy mẫu trước khi đánh giá bất kỳ kết luận nào.',
      'Bạn loại kết luận mở rộng ra ngoài nhóm đã được lấy mẫu.',
      'Bạn đọc biên sai số như một khoảng chứ không như một lời rào đón.',
      'Bạn biết mẫu lớn hơn làm hẹp khoảng chứ không dời tâm của ước lượng.',
    ],
    regression:
      'Generalising past the sampled population is the failure, and it is invisible because the conclusion is usually true in the world.',
    regressionVi:
      'Khái quát vượt quá quần thể đã lấy mẫu là chỗ hỏng, và nó vô hình vì kết luận đó thường vẫn đúng ngoài đời.',
  },

  {
    skill: 'statistical-claims',
    types: [
      {
        name: 'Was the sample random',
        nameVi: 'Mẫu có ngẫu nhiên không',
        cue: 'The study describes how participants were selected.',
        cueVi: 'Nghiên cứu mô tả cách chọn người tham gia.',
        move: 'Non-random selection blocks generalisation, whatever the sample size. Read the selection method before the results.',
        moveVi: 'Chọn mẫu không ngẫu nhiên chặn khả năng khái quát, bất kể cỡ mẫu. Đọc cách chọn mẫu trước khi đọc kết quả.',
      },
      {
        name: 'Was there random assignment',
        nameVi: 'Có phân nhóm ngẫu nhiên không',
        cue: 'The stem asks whether a cause-and-effect conclusion is justified.',
        cueVi: 'Đề hỏi kết luận nhân quả có chính đáng không.',
        move: 'Random assignment licenses causal claims; random selection licenses generalisation. They are different, and questions exploit the confusion.',
        moveVi: 'Phân nhóm ngẫu nhiên cho phép kết luận nhân quả; chọn mẫu ngẫu nhiên cho phép khái quát. Hai thứ khác nhau, và câu hỏi khai thác đúng sự nhầm lẫn này.',
      },
    ],
    secure: [
      'You distinguish random selection from random assignment without hesitating.',
      'You read the study design before the findings.',
      'You reject a causal claim from an observational study however large the sample.',
      'You can say which one of the two conditions a given study satisfies.',
    ],
    secureVi: [
      'Bạn phân biệt chọn mẫu ngẫu nhiên và phân nhóm ngẫu nhiên mà không phải lưỡng lự.',
      'Bạn đọc thiết kế nghiên cứu trước khi đọc kết quả.',
      'Bạn loại kết luận nhân quả từ nghiên cứu quan sát dù cỡ mẫu lớn đến đâu.',
      'Bạn nói được một nghiên cứu cho trước thoả điều kiện nào trong hai điều kiện đó.',
    ],
    regression:
      'The two randomisations blur back into one "the study was random", and after that both kinds of claim look justified.',
    regressionVi:
      'Hai loại ngẫu nhiên nhoè lại thành một câu "nghiên cứu có ngẫu nhiên", và sau đó cả hai loại kết luận đều trông chính đáng.',
  },

  {
    skill: 'area-volume',
    types: [
      {
        name: 'Direct formula application',
        nameVi: 'Áp dụng công thức trực tiếp',
        cue: 'A named solid or figure with its dimensions given.',
        cueVi: 'Cho một hình khối hoặc hình phẳng có tên kèm kích thước.',
        move: 'Take the formula from the reference sheet rather than from memory. It is provided; using it costs five seconds and removes a whole class of error.',
        moveVi: 'Lấy công thức từ bảng tra chứ không lấy từ trí nhớ. Bảng có sẵn; dùng nó mất năm giây và loại bỏ cả một nhóm lỗi.',
      },
      {
        name: 'Scaling a dimension',
        nameVi: 'Thay đổi tỉ lệ một kích thước',
        cue: 'A dimension is doubled, tripled, or halved and the effect is asked for.',
        cueVi: 'Một kích thước được gấp đôi, gấp ba, hoặc giảm nửa và hỏi ảnh hưởng.',
        move: 'Area scales with the square of the factor, volume with the cube. Doubling a radius quadruples an area.',
        moveVi: 'Diện tích tỉ lệ theo bình phương hệ số, thể tích theo lập phương. Gấp đôi bán kính thì diện tích gấp bốn.',
      },
      {
        name: 'Composite or remaining region',
        nameVi: 'Hình ghép hoặc phần còn lại',
        cue: 'One shape is cut out of another, or two are joined.',
        cueVi: 'Một hình bị khoét khỏi hình khác, hoặc hai hình được ghép.',
        move: 'Compute each piece separately and write both numbers down before combining. Combining in your head is where the sign goes.',
        moveVi: 'Tính từng phần riêng và viết ra cả hai số trước khi kết hợp. Kết hợp trong đầu chính là chỗ mất dấu.',
      },
    ],
    secure: [
      'You open the reference sheet rather than recalling a formula.',
      'You apply square and cube scaling without deriving it.',
      'You write down each piece of a composite figure before combining.',
      'You check that your answer’s units are area or volume as asked.',
    ],
    secureVi: [
      'Bạn mở bảng công thức thay vì cố nhớ lại.',
      'Bạn áp dụng tỉ lệ bình phương và lập phương mà không phải suy lại.',
      'Bạn viết ra từng phần của hình ghép trước khi kết hợp.',
      'Bạn kiểm tra đơn vị của đáp án là diện tích hay thể tích đúng như đề hỏi.',
    ],
    regression:
      'Recalling formulas from memory returns first, and a misremembered formula produces a confident, clean, wrong number.',
    regressionVi:
      'Thói quen nhớ công thức trong đầu quay lại trước, và một công thức nhớ nhầm cho ra một con số sai sạch sẽ và tự tin.',
  },

  {
    skill: 'lines-angles-triangles',
    types: [
      {
        name: 'Angles on parallel lines',
        nameVi: 'Góc trên hai đường song song',
        cue: 'Two parallel lines cut by a transversal.',
        cueVi: 'Hai đường song song bị một đường cắt.',
        move: 'Mark every angle you can name on the figure before answering. The relationships are what the question is made of.',
        moveVi: 'Đánh dấu mọi góc bạn gọi tên được lên hình trước khi trả lời. Các quan hệ đó chính là chất liệu của câu hỏi.',
      },
      {
        name: 'Similar triangles',
        nameVi: 'Tam giác đồng dạng',
        cue: 'Two triangles share an angle, or a line is parallel to a side.',
        cueVi: 'Hai tam giác chung một góc, hoặc một đường song song với một cạnh.',
        move: 'Write the correspondence explicitly — which vertex maps to which — before writing a ratio. A mismatched ratio is the usual error.',
        moveVi: 'Viết rõ phép tương ứng — đỉnh nào ứng đỉnh nào — trước khi viết tỉ số. Tỉ số lệch cặp là lỗi thường gặp.',
      },
      {
        name: 'Triangle angle and side relationships',
        nameVi: 'Quan hệ góc và cạnh trong tam giác',
        cue: 'A triangle with some angles or sides given.',
        cueVi: 'Một tam giác cho sẵn một số góc hoặc cạnh.',
        move: 'Angles sum to 180°; the largest angle faces the longest side. Both facts answer more questions than they appear to.',
        moveVi: 'Tổng ba góc bằng 180°; góc lớn nhất đối diện cạnh dài nhất. Hai sự kiện này trả lời được nhiều câu hơn vẻ ngoài của chúng.',
      },
    ],
    secure: [
      'You annotate the figure before reasoning about it.',
      'You write the vertex correspondence before any similarity ratio.',
      'You do not assume a figure is drawn to scale unless it says so.',
      'You use the angle sum as a check on your answer, not only as a step.',
    ],
    secureVi: [
      'Bạn ghi chú lên hình trước khi suy luận trên hình đó.',
      'Bạn viết phép tương ứng đỉnh trước mọi tỉ số đồng dạng.',
      'Bạn không mặc định hình vẽ đúng tỉ lệ trừ khi đề nói vậy.',
      'Bạn dùng tổng ba góc để kiểm tra đáp án, không chỉ như một bước giải.',
    ],
    regression:
      'Trusting the drawing returns first. A figure not drawn to scale rewards exactly that trust with a wrong answer.',
    regressionVi:
      'Tin vào hình vẽ quay lại trước. Một hình không đúng tỉ lệ thưởng cho đúng niềm tin đó bằng một đáp án sai.',
  },

  {
    skill: 'right-triangles-trig',
    types: [
      {
        name: 'Special right triangles',
        nameVi: 'Tam giác vuông đặc biệt',
        cue: 'Angles of 30–60–90 or 45–45–90, or sides in ratio 3:4:5.',
        cueVi: 'Góc 30–60–90 hoặc 45–45–90, hoặc cạnh theo tỉ lệ 3:4:5.',
        move: 'Recognise the ratio and read the answer off it. Applying the Pythagorean theorem here is correct and wastes half a minute.',
        moveVi: 'Nhận ra tỉ lệ và đọc đáp án từ đó. Dùng định lý Pythagoras ở đây vẫn đúng và tốn nửa phút.',
      },
      {
        name: 'SOH-CAH-TOA',
        nameVi: 'SOH-CAH-TOA',
        cue: 'One angle and one side, with another side asked for.',
        cueVi: 'Cho một góc và một cạnh, hỏi một cạnh khác.',
        move: 'Label opposite, adjacent, and hypotenuse relative to the given angle before choosing a ratio.',
        moveVi: 'Gán nhãn cạnh đối, cạnh kề, cạnh huyền theo đúng góc đã cho trước khi chọn tỉ số.',
      },
      {
        name: 'Complementary angle identity',
        nameVi: 'Đẳng thức góc phụ',
        cue: 'The question involves sin x° and cos(90 − x)°.',
        cueVi: 'Câu hỏi có sin x° và cos(90 − x)°.',
        move: 'They are equal. The question is testing whether you know that, not whether you can compute either.',
        moveVi: 'Chúng bằng nhau. Câu hỏi đang kiểm tra bạn có biết điều đó không, chứ không phải bạn có tính được không.',
      },
    ],
    secure: [
      'You recognise the special triangles on sight rather than deriving them.',
      'You label the three sides relative to the given angle before choosing a ratio.',
      'The complementary identity is instant, not derived.',
      'You check that a hypotenuse came out longer than both legs.',
    ],
    secureVi: [
      'Bạn nhận ra tam giác đặc biệt ngay khi nhìn thấy chứ không phải suy ra.',
      'Bạn gán nhãn ba cạnh theo góc đã cho trước khi chọn tỉ số.',
      'Đẳng thức góc phụ là tức thời với bạn, không phải suy ra.',
      'Bạn kiểm tra cạnh huyền ra dài hơn cả hai cạnh góc vuông.',
    ],
    regression:
      'Labelling relative to the wrong angle is the decay — the trig is correct and applied to the wrong side.',
    regressionVi:
      'Gán nhãn theo sai góc là kiểu suy giảm ở đây — phần lượng giác vẫn đúng và được áp vào sai cạnh.',
  },

  {
    skill: 'circles',
    types: [
      {
        name: 'Equation of a circle',
        nameVi: 'Phương trình đường tròn',
        cue: 'x² and y² both appear with the same coefficient.',
        cueVi: 'x² và y² cùng xuất hiện với cùng hệ số.',
        move: 'Complete the square to reach centre–radius form. The centre signs are opposite to what appears in the equation.',
        moveVi: 'Hoàn thành bình phương để về dạng tâm–bán kính. Dấu của tâm ngược với dấu xuất hiện trong phương trình.',
      },
      {
        name: 'Arc length and sector area',
        nameVi: 'Độ dài cung và diện tích hình quạt',
        cue: 'A central angle with an arc or a sector.',
        cueVi: 'Một góc ở tâm kèm một cung hoặc một hình quạt.',
        move: 'Both are fractions of the whole: the angle over 360°, times the circumference or the area.',
        moveVi: 'Cả hai đều là phần của toàn bộ: góc chia 360°, nhân với chu vi hoặc diện tích.',
      },
      {
        name: 'Radians and degrees',
        nameVi: 'Radian và độ',
        cue: 'π appears in an angle measure.',
        cueVi: 'π xuất hiện trong số đo góc.',
        move: 'π radians is 180°. Convert once at the start rather than carrying both units through the working.',
        moveVi: 'π radian là 180°. Đổi một lần ở đầu bài thay vì mang hai đơn vị suốt bài giải.',
      },
    ],
    secure: [
      'You flip the sign when reading a centre out of the equation, without checking yourself.',
      'You treat arc and sector as fractions of the whole rather than separate formulas.',
      'You convert to one angle unit at the start of the problem.',
      'You can complete the square on both variables without writing intermediate steps twice.',
    ],
    secureVi: [
      'Bạn đổi dấu khi đọc tâm từ phương trình mà không phải kiểm tra lại mình.',
      'Bạn xem cung và hình quạt là phần của toàn bộ chứ không phải hai công thức riêng.',
      'Bạn đổi về một đơn vị góc ngay từ đầu bài.',
      'Bạn hoàn thành bình phương cho cả hai biến mà không phải viết lại bước trung gian hai lần.',
    ],
    regression:
      'The centre sign is the first thing to go, and reading (x − 3)² as centre −3 gives an answer that is always among the options.',
    regressionVi:
      'Dấu của tâm là thứ mất trước tiên, và đọc (x − 3)² thành tâm −3 cho ra đáp án luôn nằm trong các phương án.',
  },
];
