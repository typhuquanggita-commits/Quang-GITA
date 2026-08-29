/**
 * Kho bí kíp — the tactics treasury.
 *
 * A lesson teaches one skill. A topic packet works one chuyên đề. This file
 * holds the layer above both: the moves that transfer, the ones a strong test
 * taker reaches for without being told which skill they are in.
 *
 * ## Why a tactic needs three things, not one
 *
 * Most "SAT tips" lists give the move and stop. That is the reason they do not
 * work. A move without a trigger is a move a student cannot find under time
 * pressure, and a move without its failure case is a move they will apply
 * where it costs them.
 *
 * So every entry carries:
 *
 *   trigger  — what in the question tells you to reach for this, stated as
 *              something visible on the page rather than as a feeling.
 *   move     — the steps, short enough to hold in working memory.
 *   demo     — one worked instance, so the move is shown rather than asserted.
 *   costs    — when it is slower than the direct route, or wrong outright.
 *              This is the field that separates a tactic from a slogan, and
 *              it is required.
 *
 * A tactic whose `costs` field is empty has not been thought through, and
 * `check:bank` refuses it.
 */

import type { SectionId, SkillId } from '../types.ts';

export type TacticFamily =
  /** Work backwards from the options rather than forwards from the stem. */
  | 'from-the-options'
  /** Replace the abstract with a concrete instance. */
  | 'make-it-concrete'
  /** Reshape the question before answering it. */
  | 'reframe'
  /** Decide what to do with the clock. */
  | 'triage'
  /** Guard against a specific, named way of being wrong. */
  | 'error-guard';

export interface Tactic {
  id: string;
  family: TacticFamily;
  name: string;
  nameVi: string;
  /** Sections it applies to. Most are single-section; a few work in both. */
  sections: SectionId[];
  /** Skills where it pays best. Empty means it is general to the section. */
  skills: SkillId[];
  trigger: string;
  triggerVi: string;
  move: string[];
  moveVi: string[];
  demo: { setup: string; setupVi: string; working: string[]; workingVi: string[] };
  /** When not to use it. Required — a tactic without this is a slogan. */
  costs: string;
  costsVi: string;
}

export const TACTICS: Tactic[] = [
  /* ================= From the options ================= */
  {
    id: 'backsolve',
    family: 'from-the-options',
    name: 'Backsolve from the answers',
    nameVi: 'Thử ngược từ đáp án',
    sections: ['math'],
    skills: ['linear-equations-1var', 'nonlinear-equations', 'linear-systems'],
    trigger: 'The four options are plain numbers and the question asks for a value of the variable.',
    triggerVi: 'Bốn phương án là các số đơn giản và đề hỏi giá trị của ẩn.',
    move: [
      'Order the options by size if they are not already ordered.',
      'Test the middle one by substituting it into the original equation.',
      'If it is too large, the answer is below it; if too small, above. Test one more.',
    ],
    moveVi: [
      'Sắp phương án theo độ lớn nếu chưa được sắp.',
      'Thử phương án ở giữa bằng cách thế vào phương trình gốc.',
      'Nếu ra lớn quá thì đáp án nằm bên dưới; nhỏ quá thì bên trên. Thử thêm một lần.',
    ],
    demo: {
      setup: 'If 3(x − 4) = 2x + 1, what is x? Options: 9, 11, 13, 15.',
      setupVi: 'Nếu 3(x − 4) = 2x + 1, x bằng bao nhiêu? Phương án: 9, 11, 13, 15.',
      working: [
        'Test 13: 3(13 − 4) = 27 and 2(13) + 1 = 27. They match, so x = 13.',
        'Two options tested at most, and no algebra was rearranged.',
      ],
      workingVi: [
        'Thử 13: 3(13 − 4) = 27 và 2(13) + 1 = 27. Khớp, nên x = 13.',
        'Nhiều nhất thử hai phương án, và không phải biến đổi đại số gì.',
      ],
    },
    costs:
      'Slower than solving directly when the algebra is two clean steps, and unusable when the options are expressions rather than numbers. It also cannot be used on a grid-in, where there are no options to work back from.',
    costsVi:
      'Chậm hơn giải trực tiếp khi phần đại số chỉ hai bước gọn, và không dùng được khi phương án là biểu thức chứ không phải số. Cũng không dùng được cho câu điền đáp án, vì ở đó không có phương án nào để thử ngược.',
  },
  {
    id: 'cover-the-options',
    family: 'from-the-options',
    name: 'Cover the options and answer first',
    nameVi: 'Che phương án, tự trả lời trước',
    sections: ['rw'],
    skills: ['words-in-context', 'central-ideas', 'transitions', 'inferences'],
    trigger: 'Any Reading and Writing question where the four options are complete alternatives rather than quotations.',
    triggerVi: 'Bất kỳ câu Đọc–Viết nào mà bốn phương án là các lựa chọn hoàn chỉnh chứ không phải trích dẫn.',
    move: [
      'Read the stem and the relevant text with the options physically covered.',
      'Say your own answer aloud in your head, in your own words.',
      'Uncover, and find the option closest to what you said. Reject anything that adds to it.',
    ],
    moveVi: [
      'Đọc đề và phần văn bản liên quan trong khi che kín các phương án.',
      'Tự nói đáp án của mình trong đầu, bằng lời của mình.',
      'Bỏ che, tìm phương án gần nhất với điều bạn vừa nói. Loại mọi phương án nói thêm điều gì đó.',
    ],
    demo: {
      setup: 'A blank in a sentence about a scientist who ignored her critics and continued the work.',
      setupVi: 'Một chỗ trống trong câu về một nhà khoa học bỏ ngoài tai lời chỉ trích và tiếp tục công việc.',
      working: [
        'Covered, the sentence wants something like "stubborn" or "undeterred".',
        'Uncovered, three options are negative and one is "undeterred". The work was done before any option was read.',
      ],
      workingVi: [
        'Khi che, câu văn cần một từ kiểu "cứng đầu" hoặc "không nao núng".',
        'Bỏ che, ba phương án mang nghĩa tiêu cực và một phương án là "undeterred". Việc suy nghĩ đã xong trước khi đọc phương án nào.',
      ],
    },
    costs:
      'Costs a few seconds on questions where the options are quotations to be tested against a claim, because there is nothing to pre-empt — on those, read the claim twice instead.',
    costsVi:
      'Tốn vài giây ở những câu mà phương án là trích dẫn cần đối chiếu với một luận điểm, vì ở đó không có gì để đoán trước — với dạng đó, hãy đọc luận điểm hai lần thay vì che.',
  },
  {
    id: 'extremes-first',
    family: 'from-the-options',
    name: 'Eliminate the absolutes',
    nameVi: 'Loại các phương án tuyệt đối hoá',
    sections: ['rw'],
    skills: ['inferences', 'command-evidence-textual', 'command-evidence-quantitative'],
    trigger: 'An option contains always, never, every, only, must, or the most.',
    triggerVi: 'Phương án chứa các từ always, never, every, only, must, hoặc dạng so sánh nhất.',
    move: [
      'Underline the absolute word.',
      'Ask what the passage would have to say for it to be true — usually far more than it does say.',
      'Keep it only if the passage states that strength explicitly.',
    ],
    moveVi: [
      'Gạch chân từ mang tính tuyệt đối.',
      'Hỏi: văn bản phải nói gì thì điều đó mới đúng — thường là nhiều hơn hẳn những gì nó đã nói.',
      'Chỉ giữ lại nếu văn bản nêu rõ mức độ mạnh đó.',
    ],
    demo: {
      setup: 'A passage says a technique "is rarely successful in cold conditions".',
      setupVi: 'Một đoạn văn nói một kỹ thuật "hiếm khi thành công trong điều kiện lạnh".',
      working: [
        'An option reading "never works in cold conditions" overstates "rarely" into "never".',
        'The passage licenses "usually fails"; it does not license "never".',
      ],
      workingVi: [
        'Phương án "không bao giờ hoạt động trong điều kiện lạnh" đã đẩy "hiếm khi" thành "không bao giờ".',
        'Văn bản cho phép nói "thường thất bại"; nó không cho phép nói "không bao giờ".',
      ],
    },
    costs:
      'An absolute is not automatically wrong. Passages about mathematics, definitions, and physical law state absolutes correctly, and treating the word as a disqualifier costs the answer on exactly those questions.',
    costsVi:
      'Một phương án tuyệt đối không đương nhiên sai. Các đoạn về toán học, định nghĩa và quy luật vật lý nêu điều tuyệt đối một cách đúng đắn, và coi từ đó là dấu hiệu loại trừ sẽ làm mất điểm ở đúng những câu ấy.',
  },

  /* ================= Make it concrete ================= */
  {
    id: 'plug-in-numbers',
    family: 'make-it-concrete',
    name: 'Plug in a number for the variable',
    nameVi: 'Thế một số cụ thể vào ẩn',
    sections: ['math'],
    skills: ['equivalent-expressions', 'linear-functions', 'nonlinear-functions', 'percentages'],
    trigger: 'Both the question and every option are expressions in the same variable, with no numbers to solve for.',
    triggerVi: 'Cả đề lẫn mọi phương án đều là biểu thức theo cùng một ẩn, không có số nào để giải ra.',
    move: [
      'Choose a small number that is not 0 or 1 — those make too many expressions agree.',
      'Compute the value the stem describes.',
      'Evaluate every option at the same number and keep the one that matches.',
    ],
    moveVi: [
      'Chọn một số nhỏ, tránh 0 và 1 — hai số đó làm quá nhiều biểu thức trùng nhau.',
      'Tính giá trị mà đề mô tả.',
      'Thay cùng số đó vào mọi phương án và giữ phương án khớp.',
    ],
    demo: {
      setup: 'Which expression equals (x + 3)(x − 3)? Options include x² − 9 and x² + 9.',
      setupVi: 'Biểu thức nào bằng (x + 3)(x − 3)? Trong các phương án có x² − 9 và x² + 9.',
      working: [
        'Let x = 2. Then (2 + 3)(2 − 3) = 5 × (−1) = −5.',
        'x² − 9 gives 4 − 9 = −5; x² + 9 gives 13. Only the first matches.',
      ],
      workingVi: [
        'Cho x = 2. Khi đó (2 + 3)(2 − 3) = 5 × (−1) = −5.',
        'x² − 9 cho 4 − 9 = −5; x² + 9 cho 13. Chỉ phương án đầu khớp.',
      ],
    },
    costs:
      'If two options agree at the number chosen, the work has to be repeated with a second number — so choosing badly costs the whole saving. It is also slower than expanding when the expansion is a single line.',
    costsVi:
      'Nếu hai phương án cùng khớp ở số đã chọn thì phải làm lại với số thứ hai — chọn tệ là mất toàn bộ phần tiết kiệm. Nó cũng chậm hơn khai triển trực tiếp khi phép khai triển chỉ một dòng.',
  },
  {
    id: 'pick-100',
    family: 'make-it-concrete',
    name: 'Let the unknown total be 100',
    nameVi: 'Cho tổng chưa biết bằng 100',
    sections: ['math'],
    skills: ['percentages', 'ratios-rates-units'],
    trigger: 'A percentage question with no starting amount given anywhere.',
    triggerVi: 'Câu hỏi phần trăm mà không cho lượng ban đầu ở bất kỳ đâu.',
    move: [
      'Set the unstated starting quantity to 100.',
      'Apply each change in order, multiplying rather than adding.',
      'Read the final number as a percentage of the original directly.',
    ],
    moveVi: [
      'Đặt lượng ban đầu chưa nêu bằng 100.',
      'Áp dụng từng thay đổi theo thứ tự, nhân chứ không cộng.',
      'Đọc con số cuối cùng thẳng thành phần trăm so với ban đầu.',
    ],
    demo: {
      setup: 'A price rises 20% then falls 20%. What is the net change?',
      setupVi: 'Một mức giá tăng 20% rồi giảm 20%. Thay đổi ròng là bao nhiêu?',
      working: [
        'Start at 100. After the rise: 120. After the fall: 120 × 0.8 = 96.',
        'The net change reads straight off: a fall of 4%.',
      ],
      workingVi: [
        'Bắt đầu từ 100. Sau khi tăng: 120. Sau khi giảm: 120 × 0,8 = 96.',
        'Thay đổi ròng đọc được ngay: giảm 4%.',
      ],
    },
    costs:
      'Useless when a real starting amount is given — using 100 instead of the stated figure answers a different question. Also unhelpful where the answer must be an absolute quantity rather than a percentage.',
    costsVi:
      'Vô dụng khi đề đã cho lượng ban đầu thật — dùng 100 thay cho con số đã nêu là trả lời một câu hỏi khác. Cũng không giúp gì khi đáp án phải là một lượng tuyệt đối chứ không phải phần trăm.',
  },

  /* ================= Reframe ================= */
  {
    id: 'negate-the-claim',
    family: 'reframe',
    name: 'Negate the claim before hunting',
    nameVi: 'Phủ định luận điểm trước khi đi tìm',
    sections: ['rw'],
    skills: ['command-evidence-textual', 'command-evidence-quantitative'],
    trigger: 'The stem contains weaken, undermine, challenge, or call into question.',
    triggerVi: 'Đề chứa weaken, undermine, challenge, hoặc call into question.',
    move: [
      'Write the claim as a sentence.',
      'Write its negation — what would have to be true for the claim to fail.',
      'Now look for the option that supports the negation. Do not look for a "weakening" option directly.',
    ],
    moveVi: [
      'Viết luận điểm thành một câu.',
      'Viết mệnh đề phủ định của nó — điều gì phải đúng thì luận điểm mới sai.',
      'Giờ tìm phương án ủng hộ mệnh đề phủ định. Đừng đi tìm thẳng phương án "làm suy yếu".',
    ],
    demo: {
      setup: 'Claim: the decline was caused by loss of winter stubble rather than by spring pesticide.',
      setupVi: 'Luận điểm: sự suy giảm là do mất gốc rạ mùa đông chứ không phải do thuốc trừ sâu mùa xuân.',
      working: [
        'Negation: the decline happened even where stubble remained.',
        'So look for a finding about farms that kept their stubble. That option is the answer, and it is easy to miss when hunting for "something negative".',
      ],
      workingVi: [
        'Phủ định: sự suy giảm vẫn xảy ra ngay cả ở nơi còn gốc rạ.',
        'Vậy hãy tìm dữ liệu về những trang trại vẫn giữ gốc rạ. Phương án đó chính là đáp án, và rất dễ bỏ sót nếu chỉ đi tìm "điều gì tiêu cực".',
      ],
    },
    costs:
      'Adds ten seconds of writing to a question that is already slow. It is worth it only on weaken questions, and applying it to a support question wastes the step entirely.',
    costsVi:
      'Thêm khoảng mười giây viết vào một câu vốn đã chậm. Chỉ đáng làm ở câu weaken; áp dụng cho câu support là lãng phí hoàn toàn bước này.',
  },
  {
    id: 'name-the-verb',
    family: 'reframe',
    name: 'Answer purpose with a verb',
    nameVi: 'Trả lời mục đích bằng một động từ',
    sections: ['rw'],
    skills: ['text-structure-purpose', 'rhetorical-synthesis'],
    trigger: 'The stem asks for the main purpose, or what a sentence does.',
    triggerVi: 'Đề hỏi mục đích chính, hoặc một câu có vai trò gì.',
    move: [
      'Before reading the options, finish the sentence "This text exists to ___" with one verb.',
      'Common verbs: correct, argue, describe, introduce, qualify, illustrate, resolve.',
      'Match on the verb first, and only then on what follows it.',
    ],
    moveVi: [
      'Trước khi đọc phương án, hoàn thành câu "Văn bản này tồn tại để ___" bằng một động từ.',
      'Các động từ thường gặp: đính chính, lập luận, mô tả, giới thiệu, giới hạn, minh hoạ, giải quyết.',
      'Khớp động từ trước, rồi mới khớp phần đứng sau nó.',
    ],
    demo: {
      setup: 'A passage states a repeated claim, denies its evidential basis, and gives what the sources say.',
      setupVi: 'Một đoạn nêu một tuyên bố được lặp lại, phủ nhận cơ sở bằng chứng của nó, rồi đưa ra điều các nguồn thực sự nói.',
      working: [
        'The verb is "to correct". Three options begin "to describe" and one begins "to correct".',
        'The topic in each option is nearly identical, so the verb is what decides.',
      ],
      workingVi: [
        'Động từ là "đính chính". Ba phương án bắt đầu bằng "mô tả" và một phương án bắt đầu bằng "đính chính".',
        'Chủ đề trong các phương án gần như giống hệt nhau, nên động từ mới là thứ quyết định.',
      ],
    },
    costs:
      'Not applicable to main-idea questions, which ask what a text says rather than what it does. Using it there produces an answer about function when the question wanted content.',
    costsVi:
      'Không áp dụng cho câu hỏi ý chính, vốn hỏi văn bản nói gì chứ không phải làm gì. Dùng ở đó sẽ cho ra câu trả lời về vai trò trong khi đề hỏi nội dung.',
  },
  {
    id: 'read-the-axis',
    family: 'reframe',
    name: 'Read the labels before the data',
    nameVi: 'Đọc nhãn trước khi đọc dữ liệu',
    sections: ['rw', 'math'],
    skills: ['command-evidence-quantitative', 'two-variable-data', 'one-variable-data'],
    trigger: 'Any question carrying a table, a chart, or a plot.',
    triggerVi: 'Bất kỳ câu nào có kèm bảng, biểu đồ hoặc đồ thị.',
    move: [
      'Read both axis labels and their units, or every column header, before looking at a single value.',
      'Say what one point or one row means, in a full sentence.',
      'Only then return to the question.',
    ],
    moveVi: [
      'Đọc nhãn cả hai trục cùng đơn vị, hoặc mọi tiêu đề cột, trước khi nhìn bất kỳ giá trị nào.',
      'Nói xem một điểm hoặc một hàng có nghĩa gì, bằng một câu hoàn chỉnh.',
      'Sau đó mới quay lại câu hỏi.',
    ],
    demo: {
      setup: 'A table reports recycling rates with a column headed "Basis".',
      setupVi: 'Một bảng báo cáo tỉ lệ tái chế, có một cột tiêu đề "Cơ sở tính".',
      working: [
        'Reading the header first reveals that two districts measure what was collected and one measures what was reprocessed.',
        'The numbers are therefore not comparable — which is the whole question, and is invisible to anyone who read the percentages first.',
      ],
      workingVi: [
        'Đọc tiêu đề trước cho thấy hai quận đo lượng thu gom còn một quận đo lượng thực sự tái chế được.',
        'Vậy các con số không so sánh được với nhau — đó chính là toàn bộ câu hỏi, và nó vô hình với người đọc phần trăm trước.',
      ],
    },
    costs:
      'Five seconds that are wasted on a figure with one obvious axis and one obvious unit. Those exist, and on a tight clock the habit can be relaxed for a plainly labelled bar chart.',
    costsVi:
      'Năm giây bị lãng phí với một hình chỉ có một trục và một đơn vị hiển nhiên. Loại hình đó có tồn tại, và khi gấp thì có thể nới lỏng thói quen này với biểu đồ cột ghi nhãn rõ ràng.',
  },

  /* ================= Triage ================= */
  {
    id: 'two-pass',
    family: 'triage',
    name: 'Two passes, never one',
    nameVi: 'Làm hai lượt, không bao giờ một lượt',
    sections: ['rw', 'math'],
    skills: [],
    trigger: 'Any timed module. Apply from the first question, not when time runs short.',
    triggerVi: 'Bất kỳ phần thi có bấm giờ nào. Áp dụng từ câu đầu tiên, không phải khi sắp hết giờ.',
    move: [
      'First pass: answer everything you can do in under about ninety seconds. Flag the rest and move on immediately.',
      'Do not linger. The cost of a hard question is not its own mark, it is the easy marks after it.',
      'Second pass: return to the flagged questions with the remaining time.',
    ],
    moveVi: [
      'Lượt một: làm hết những câu bạn xử lý được dưới khoảng chín mươi giây. Đánh dấu phần còn lại và đi tiếp ngay.',
      'Đừng nấn ná. Cái giá của một câu khó không phải là điểm của chính nó, mà là những điểm dễ nằm phía sau nó.',
      'Lượt hai: quay lại các câu đã đánh dấu với thời gian còn lại.',
    ],
    demo: {
      setup: 'A module of 27 questions in 32 minutes, with a hard item at number 6.',
      setupVi: 'Một phần thi 27 câu trong 32 phút, có một câu khó ở vị trí số 6.',
      working: [
        'Four minutes spent on question 6 leaves 28 minutes for 26 questions — about 65 seconds each.',
        'Flagging it after 90 seconds leaves 30 minutes for 26, and question 6 is still available at the end.',
      ],
      workingVi: [
        'Bỏ bốn phút cho câu 6 thì còn 28 phút cho 26 câu — khoảng 65 giây mỗi câu.',
        'Đánh dấu nó sau 90 giây thì còn 30 phút cho 26 câu, và câu 6 vẫn còn đó ở cuối giờ.',
      ],
    },
    costs:
      'Costs the few seconds of re-reading a flagged question a second time. That is a real cost, and it is smaller than the cost of the questions never reached.',
    costsVi:
      'Tốn vài giây đọc lại câu đã đánh dấu lần thứ hai. Đó là chi phí thật, và nó nhỏ hơn cái giá của những câu không bao giờ được nhìn tới.',
  },
  {
    id: 'never-blank',
    family: 'triage',
    name: 'Never leave a multiple-choice blank',
    nameVi: 'Không bao giờ bỏ trống câu trắc nghiệm',
    sections: ['rw', 'math'],
    skills: [],
    trigger: 'Two minutes remain and questions are unanswered.',
    triggerVi: 'Còn hai phút và vẫn còn câu chưa trả lời.',
    move: [
      'There is no penalty for a wrong answer, so a blank scores exactly zero and a guess scores one in four.',
      'Eliminate whatever you can, then choose from what remains.',
      'Answer every remaining question before the clock stops, even at one second each.',
    ],
    moveVi: [
      'Không bị trừ điểm khi sai, nên bỏ trống chắc chắn được 0 còn đoán được một phần tư.',
      'Loại được phương án nào thì loại, rồi chọn trong số còn lại.',
      'Trả lời hết mọi câu còn lại trước khi hết giờ, dù mỗi câu chỉ một giây.',
    ],
    demo: {
      setup: 'Five questions unanswered with ninety seconds left.',
      setupVi: 'Còn năm câu chưa trả lời và chín mươi giây.',
      working: [
        'Guessing all five returns about 1.25 marks on average; leaving them returns 0.',
        'Eliminating one option on each raises the expectation to about 1.7.',
      ],
      workingVi: [
        'Đoán cả năm câu trung bình được khoảng 1,25 điểm; bỏ trống được 0.',
        'Loại được một phương án ở mỗi câu thì kỳ vọng lên khoảng 1,7.',
      ],
    },
    costs:
      'None on multiple choice. It does not transfer to grid-in questions, where a wrong entry and a blank both score zero and the guess is worth nothing.',
    costsVi:
      'Không có chi phí gì với câu trắc nghiệm. Nó không áp dụng cho câu điền đáp án, ở đó điền sai và bỏ trống đều được 0 nên việc đoán không đem lại gì.',
  },

  /* ================= Error guards ================= */
  {
    id: 'underline-the-ask',
    family: 'error-guard',
    name: 'Underline what is actually asked',
    nameVi: 'Gạch chân điều thực sự được hỏi',
    sections: ['math'],
    skills: ['linear-equations-1var', 'linear-systems', 'nonlinear-equations'],
    trigger: 'The question asks for an expression rather than the variable — 2x, x + y, the difference.',
    triggerVi: 'Đề hỏi một biểu thức chứ không phải chính ẩn — 2x, x + y, hiệu số.',
    move: [
      'Before solving, underline the quantity the question wants.',
      'Solve as normal.',
      'Read the underline again before choosing. This is the whole tactic.',
    ],
    moveVi: [
      'Trước khi giải, gạch chân đại lượng mà đề muốn.',
      'Giải bình thường.',
      'Đọc lại phần gạch chân trước khi chọn. Toàn bộ bí kíp nằm ở đây.',
    ],
    demo: {
      setup: 'Solve the system, then report x + y. The options include 4, 3, and 7.',
      setupVi: 'Giải hệ, rồi cho biết x + y. Các phương án có 4, 3, và 7.',
      working: [
        'The solution is x = 4, y = 3, and both appear as options.',
        'The answer is 7. Both 4 and 3 are there precisely because a correct solve reaches them.',
      ],
      workingVi: [
        'Nghiệm là x = 4, y = 3, và cả hai đều xuất hiện trong phương án.',
        'Đáp án là 7. Cả 4 và 3 có mặt chính vì một phép giải đúng sẽ đi qua chúng.',
      ],
    },
    costs:
      'Two seconds, and no situation where it is wrong. The reason it is still worth stating is that it is skipped most often on the questions a student finds easy, which is exactly where the trap is set.',
    costsVi:
      'Hai giây, và không có tình huống nào nó sai. Lý do vẫn phải nêu ra là vì nó hay bị bỏ qua nhất ở những câu học sinh thấy dễ — mà đó chính là chỗ cái bẫy được đặt.',
  },
  {
    id: 'flip-on-negative',
    family: 'error-guard',
    name: 'Mark the flip when dividing by a negative',
    nameVi: 'Đánh dấu chỗ đổi chiều khi chia cho số âm',
    sections: ['math'],
    skills: ['linear-inequalities'],
    trigger: 'An inequality where the variable ends up with a negative coefficient.',
    triggerVi: 'Một bất phương trình mà ẩn có hệ số âm.',
    move: [
      'When you divide or multiply both sides by a negative number, stop and write the reversed sign first.',
      'Then perform the arithmetic.',
      'Check by testing one value from the solution set in the original inequality.',
    ],
    moveVi: [
      'Khi chia hoặc nhân hai vế cho một số âm, dừng lại và viết dấu đã đổi chiều trước.',
      'Rồi mới làm phép tính.',
      'Kiểm tra bằng cách thử một giá trị trong tập nghiệm vào bất phương trình gốc.',
    ],
    demo: {
      setup: '−3x + 14 ≤ −7.',
      setupVi: '−3x + 14 ≤ −7.',
      working: [
        'Subtract 14: −3x ≤ −21. Dividing by −3 reverses the sign: x ≥ 7.',
        'Test x = 8: −24 + 14 = −10, which is ≤ −7. Confirmed.',
      ],
      workingVi: [
        'Trừ 14: −3x ≤ −21. Chia cho −3 thì đổi chiều: x ≥ 7.',
        'Thử x = 8: −24 + 14 = −10, thoả ≤ −7. Xác nhận đúng.',
      ],
    },
    costs:
      'None. The forgotten flip produces an answer that is exactly wrong rather than obviously wrong, and it is always among the options.',
    costsVi:
      'Không có. Quên đổi chiều cho ra đáp án sai chính xác chứ không sai lộ liễu, và nó luôn nằm trong các phương án.',
  },
  {
    id: 'strike-the-middle',
    family: 'error-guard',
    name: 'Strike out what sits between subject and verb',
    nameVi: 'Gạch bỏ phần chen giữa chủ ngữ và động từ',
    sections: ['rw'],
    skills: ['form-structure-sense'],
    trigger: 'A long phrase separates the subject from the verb, and the options differ in verb number.',
    triggerVi: 'Một cụm dài ngăn cách chủ ngữ với động từ, và các phương án khác nhau ở số của động từ.',
    move: [
      'Cross out everything between the subject and the verb, including any prepositional phrase.',
      'Read the subject and verb together, aloud in your head.',
      'Choose the form that fits the bare pair.',
    ],
    moveVi: [
      'Gạch bỏ mọi thứ nằm giữa chủ ngữ và động từ, kể cả các cụm giới từ.',
      'Đọc chủ ngữ và động từ liền nhau, đọc thầm thành tiếng trong đầu.',
      'Chọn dạng phù hợp với cặp trần trụi đó.',
    ],
    demo: {
      setup: 'The collection of manuscripts held in three separate archives ___ rarely been catalogued.',
      setupVi: 'The collection of manuscripts held in three separate archives ___ rarely been catalogued.',
      working: [
        'Strike "of manuscripts held in three separate archives".',
        'What remains is "The collection ___ rarely been catalogued", so the verb is "has". The plural nouns were placed there to pull the ear the other way.',
      ],
      workingVi: [
        'Gạch bỏ "of manuscripts held in three separate archives".',
        'Còn lại "The collection ___ rarely been catalogued", nên động từ là "has". Các danh từ số nhiều được đặt ở đó để kéo tai người đọc đi hướng khác.',
      ],
    },
    costs:
      'None on agreement questions. It does not help with tense, which is decided by time markers in the surrounding sentences rather than by the bare subject–verb pair.',
    costsVi:
      'Không có chi phí với câu hỏi về sự hoà hợp. Nó không giúp gì cho câu hỏi về thì, vốn được quyết định bởi mốc thời gian ở các câu xung quanh chứ không phải bởi cặp chủ ngữ – động từ trần trụi.',
  },
  {
    id: 'clause-test',
    family: 'error-guard',
    name: 'Test each half for independence',
    nameVi: 'Kiểm tra từng vế có độc lập không',
    sections: ['rw'],
    skills: ['boundaries'],
    trigger: 'Options differ only in punctuation: comma, semicolon, full stop, colon, dash.',
    triggerVi: 'Các phương án chỉ khác nhau ở dấu câu: phẩy, chấm phẩy, chấm, hai chấm, gạch ngang.',
    move: [
      'Cover the punctuation. Read the left half — could it stand alone as a sentence?',
      'Read the right half and ask the same.',
      'Two independent halves need a full stop, a semicolon, or a comma plus a coordinating conjunction. A comma alone is never enough.',
    ],
    moveVi: [
      'Che dấu câu lại. Đọc vế trái — nó có đứng riêng thành câu được không?',
      'Đọc vế phải và hỏi y như vậy.',
      'Hai vế độc lập cần dấu chấm, chấm phẩy, hoặc phẩy kèm liên từ đẳng lập. Chỉ dấu phẩy thì không bao giờ đủ.',
    ],
    demo: {
      setup: 'The storm passed quickly ___ the damage took months to repair.',
      setupVi: 'The storm passed quickly ___ the damage took months to repair.',
      working: [
        'Both halves stand alone, so a bare comma is out however natural it sounds aloud.',
        'A semicolon, a full stop, or ", but" all work; the options will contain exactly one of them.',
      ],
      workingVi: [
        'Cả hai vế đều đứng riêng được, nên chỉ một dấu phẩy là loại, dù đọc lên nghe tự nhiên đến đâu.',
        'Chấm phẩy, dấu chấm, hoặc ", but" đều được; trong các phương án sẽ có đúng một trong số đó.',
      ],
    },
    costs:
      'None, and it is specifically a replacement for judging by ear. A comma splice sounds fine spoken, which is why the ear cannot be trusted on this question type.',
    costsVi:
      'Không có, và nó chính là thứ thay thế cho việc phán đoán bằng tai. Nối câu bằng dấu phẩy đọc lên nghe vẫn ổn, và đó là lý do không thể tin vào tai ở dạng câu này.',
  },
];

/** Tactics that apply to a section, for building a section-specific sheet. */
export function tacticsForSection(section: SectionId): Tactic[] {
  return TACTICS.filter((t) => t.sections.includes(section));
}

/** Tactics that pay best on a given skill, most specific first. */
export function tacticsForSkill(skill: SkillId, section: SectionId): Tactic[] {
  const specific = TACTICS.filter((t) => t.skills.includes(skill));
  const general = TACTICS.filter((t) => t.skills.length === 0 && t.sections.includes(section));
  return [...specific, ...general];
}

export const TACTIC_FAMILY_LABEL: Record<TacticFamily, { en: string; vi: string }> = {
  'from-the-options': { en: 'Work from the options', vi: 'Xuất phát từ phương án' },
  'make-it-concrete': { en: 'Make it concrete', vi: 'Biến trừu tượng thành cụ thể' },
  reframe: { en: 'Reframe the question', vi: 'Định khung lại câu hỏi' },
  triage: { en: 'Manage the clock', vi: 'Quản lý đồng hồ' },
  'error-guard': { en: 'Guard against an error', vi: 'Chặn một lỗi cụ thể' },
};
