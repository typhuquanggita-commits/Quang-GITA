/**
 * The lesson library.
 *
 * Until now the platform measured a learner and drilled them, but never
 * taught them anything: a student told that Transitions is their weakest
 * skill had nowhere to go except more Transitions questions. Practice
 * without instruction is how someone repeats the same misconception a
 * hundred times and calls it studying.
 *
 * Each lesson is deliberately short and structured the same way, because the
 * shape is what makes it usable at the moment of need:
 *
 *   idea    — the one thing that, once understood, changes how the question
 *             type is read. Not a summary of the topic.
 *   method  — the steps, in order, that a student can actually follow under
 *             time pressure. If a step needs judgement they do not yet have,
 *             it is not a step.
 *   worked  — one example, solved the way the method says to solve it, so
 *             the method is demonstrated rather than merely asserted.
 *   traps   — the specific errors this question type is built to catch, each
 *             with why it is tempting. A trap without its "why" is just a
 *             warning, and warnings do not transfer.
 */

import type { SectionId, SkillId } from '../types.ts';

export interface WorkedExample {
  prompt: string;
  promptVi: string;
  /** The steps of the solution, in the order the method prescribes. */
  steps: string[];
  stepsVi: string[];
  answer: string;
  answerVi: string;
}

export interface Trap {
  name: string;
  nameVi: string;
  /** Why a reasonable student falls for it. */
  why: string;
  whyVi: string;
}

export interface Lesson {
  skill: SkillId;
  section: SectionId;
  title: string;
  titleVi: string;
  /** Minutes to read and absorb. */
  minutes: number;
  idea: string;
  ideaVi: string;
  method: string[];
  methodVi: string[];
  worked: WorkedExample;
  traps: Trap[];
}

/* ================================================================== */
/* Reading and Writing                                                 */
/* ================================================================== */

export const RW_LESSONS: Lesson[] = [
  {
    skill: 'central-ideas',
    section: 'rw',
    title: 'Central Ideas and Details',
    titleVi: 'Ý chính và chi tiết',
    minutes: 6,
    idea:
      'The main idea is not the most interesting sentence and it is not the first one. It is the claim every other sentence exists to serve. If a sentence could be deleted without damaging the passage, it is a detail.',
    ideaVi:
      'Ý chính không phải câu hay nhất, cũng không phải câu đầu tiên. Nó là luận điểm mà mọi câu còn lại tồn tại để phục vụ. Nếu xoá một câu đi mà đoạn văn không hỏng, câu đó là chi tiết.',
    method: [
      'Read the passage once without stopping. Do not annotate on the first pass.',
      'Ask: what job is each sentence doing? Setting up, supporting, qualifying, concluding?',
      'Find the sentence the others serve. It is usually last in a short SAT passage, not first.',
      'State that claim to yourself in your own words before looking at the options.',
      'Eliminate any option that is true of the passage but does not cover its whole shape — especially a contrast, if one is present.',
    ],
    methodVi: [
      'Đọc hết đoạn một lần, không dừng. Lần đầu đừng gạch chân gì cả.',
      'Tự hỏi: mỗi câu đang làm nhiệm vụ gì? Dẫn nhập, chứng minh, giới hạn, hay kết luận?',
      'Tìm câu mà các câu khác phục vụ. Trong đoạn ngắn của SAT nó thường ở cuối, không phải đầu.',
      'Diễn đạt lại luận điểm đó bằng lời của mình trước khi nhìn các phương án.',
      'Loại mọi phương án đúng về đoạn văn nhưng không bao được toàn bộ hình dạng của nó — nhất là khi đoạn có sự tương phản.',
    ],
    worked: {
      prompt:
        '"Researchers assumed the tool marks were made by stone. Analysis of the residue found traces of bronze — a metal not thought to have reached the region for another four centuries."',
      promptVi:
        '"Các nhà nghiên cứu cho rằng vết công cụ do đá tạo ra. Phân tích cặn lại tìm thấy dấu vết đồng thau — kim loại được cho là phải bốn thế kỷ sau mới tới vùng này."',
      steps: [
        'Sentence one states an assumption. Sentence two contradicts it with evidence.',
        'The shape is: belief, then evidence that overturns it.',
        'A main-idea answer must carry both halves. "Bronze was found" is only the second.',
      ],
      stepsVi: [
        'Câu một nêu một giả định. Câu hai bác bỏ nó bằng bằng chứng.',
        'Hình dạng là: một niềm tin, rồi bằng chứng lật ngược nó.',
        'Phương án đúng phải mang cả hai vế. "Tìm thấy đồng thau" mới chỉ là vế thứ hai.',
      ],
      answer: 'Residue analysis overturned the assumption about which material made the marks.',
      answerVi: 'Phân tích cặn đã lật ngược giả định về vật liệu tạo ra các vết công cụ.',
    },
    traps: [
      {
        name: 'The true detail',
        nameVi: 'Chi tiết đúng',
        why: 'It is verifiably in the passage, so it feels safe. But a detail cannot be the main idea, and the test relies on the relief of finding something you can confirm.',
        whyVi: 'Nó có thật trong đoạn văn nên cho cảm giác an toàn. Nhưng chi tiết không thể là ý chính, và đề thi lợi dụng đúng cảm giác nhẹ nhõm khi bạn xác nhận được một điều gì đó.',
      },
      {
        name: 'Half the contrast',
        nameVi: 'Một nửa của tương phản',
        why: 'When a passage sets up a belief and then overturns it, an option naming only the belief or only the overturning reads as correct until you check the other half.',
        whyVi: 'Khi đoạn văn dựng lên một niềm tin rồi lật ngược nó, phương án chỉ nêu một trong hai vế đọc lên vẫn thấy đúng, cho tới khi bạn kiểm tra vế còn lại.',
      },
      {
        name: 'The bigger truth',
        nameVi: 'Chân lý lớn hơn',
        why: 'A statement broader than the passage sounds more important. Main idea means the idea of this passage, not the field it belongs to.',
        whyVi: 'Một phát biểu rộng hơn đoạn văn nghe có vẻ quan trọng hơn. Ý chính là ý của đoạn này, không phải của cả lĩnh vực mà nó thuộc về.',
      },
    ],
  },

  {
    skill: 'command-evidence-textual',
    section: 'rw',
    title: 'Command of Evidence: Textual',
    titleVi: 'Bằng chứng văn bản',
    minutes: 7,
    idea:
      'You are not looking for the option that is most related to the claim. You are looking for the one that would change a sceptic\'s mind. Before reading the options, decide what evidence would have to exist for the claim to be true — then find the option closest to it.',
    ideaVi:
      'Bạn không tìm phương án liên quan nhất tới luận điểm. Bạn tìm phương án đủ sức làm một người hoài nghi đổi ý. Trước khi đọc phương án, hãy quyết định bằng chứng nào phải tồn tại để luận điểm đúng — rồi tìm phương án gần nó nhất.',
    method: [
      'Read the claim and identify exactly what is being asserted, including its scope.',
      'Ask what the rival explanation is. Almost every evidence question has one, stated or implied.',
      'Predict: what finding would rule out the rival while leaving the claim standing?',
      'Only now read the options, and test each against your prediction.',
      'Reject anything consistent with the rival explanation, however impressive it sounds.',
    ],
    methodVi: [
      'Đọc luận điểm và xác định chính xác điều gì đang được khẳng định, kể cả phạm vi của nó.',
      'Hỏi: cách giải thích đối thủ là gì? Gần như mọi câu về bằng chứng đều có một, nêu rõ hoặc ngầm ẩn.',
      'Dự đoán: phát hiện nào sẽ loại được cách giải thích đối thủ mà vẫn giữ luận điểm đứng vững?',
      'Đến lúc này mới đọc phương án, và đối chiếu từng cái với dự đoán của mình.',
      'Loại mọi phương án vẫn tương thích với cách giải thích đối thủ, dù nghe ấn tượng đến đâu.',
    ],
    worked: {
      prompt:
        'Claim: trees transfer carbon to each other through fungal networks, and do so preferentially to their own species. What finding would support this?',
      promptVi:
        'Luận điểm: cây chuyển carbon cho nhau qua mạng nấm, và ưu tiên cây cùng loài. Phát hiện nào sẽ ủng hộ điều này?',
      steps: [
        'The rival explanation is incidental diffusion: carbon simply spreading down a concentration gradient.',
        'Diffusion does not discriminate between recipients. Directed transfer does.',
        'So the evidence must hold distance constant and vary only species.',
      ],
      stepsVi: [
        'Cách giải thích đối thủ là khuếch tán ngẫu nhiên: carbon chỉ lan theo chênh lệch nồng độ.',
        'Khuếch tán không phân biệt người nhận. Chuyển giao có định hướng thì có.',
        'Vậy bằng chứng phải giữ nguyên khoảng cách và chỉ thay đổi loài.',
      ],
      answer:
        'Labelled carbon reaches same-species seedlings at higher rates than equally close seedlings of other species.',
      answerVi:
        'Carbon đánh dấu đến cây con cùng loài với tỉ lệ cao hơn cây con khác loài ở cùng khoảng cách.',
    },
    traps: [
      {
        name: 'Evidence for the rival',
        nameVi: 'Bằng chứng cho phía đối thủ',
        why: 'An option describing a concentration gradient supports diffusion, not direction. It mentions the right nouns, which is enough to feel right under time pressure.',
        whyVi: 'Phương án mô tả chênh lệch nồng độ ủng hộ khuếch tán, không phải định hướng. Nó nhắc đúng các danh từ, và dưới áp lực thời gian thế là đủ để thấy đúng.',
      },
      {
        name: 'True but silent',
        nameVi: 'Đúng nhưng không nói gì',
        why: '"Fungal networks exist in every forest surveyed" is true and relevant to the topic, yet it says nothing about whether transfer through them is targeted.',
        whyVi: '"Mạng nấm có ở mọi khu rừng đã khảo sát" là đúng và liên quan tới chủ đề, nhưng không nói gì về việc chuyển giao qua nó có định hướng hay không.',
      },
      {
        name: 'Confounded evidence',
        nameVi: 'Bằng chứng bị nhiễu',
        why: 'A finding with several possible causes cannot single out one. Seedlings near mature trees grow taller for shelter, water, and soil reasons too.',
        whyVi: 'Một phát hiện có nhiều nguyên nhân khả dĩ thì không chỉ ra được nguyên nhân nào. Cây con gần cây lớn cao hơn còn vì che chắn, nước và đất.',
      },
    ],
  },

  {
    skill: 'command-evidence-quantitative',
    section: 'rw',
    title: 'Command of Evidence: Quantitative',
    titleVi: 'Bằng chứng định lượng',
    minutes: 6,
    idea:
      'The conclusion usually has two parts joined by "but" or "although". A single number can only support one part. Count the parts of the conclusion first, then find the option that covers all of them.',
    ideaVi:
      'Kết luận thường có hai vế nối bằng "nhưng" hoặc "tuy nhiên". Một con số đơn lẻ chỉ chống đỡ được một vế. Hãy đếm số vế của kết luận trước, rồi tìm phương án bao được tất cả.',
    method: [
      'Read the conclusion and split it at its conjunction. Note how many claims it makes.',
      'For each claim, decide which comparison in the table or graph would demonstrate it.',
      'Read the options as comparisons, not as facts. A single value proves nothing about a trend.',
      'Choose the option that makes every comparison the conclusion needs.',
    ],
    methodVi: [
      'Đọc kết luận và tách nó ở liên từ. Ghi nhận nó đưa ra bao nhiêu khẳng định.',
      'Với mỗi khẳng định, xác định phép so sánh nào trong bảng hoặc biểu đồ sẽ chứng minh nó.',
      'Đọc các phương án như những phép so sánh, không phải như những sự kiện. Một giá trị đơn lẻ không chứng minh được gì về xu hướng.',
      'Chọn phương án thực hiện đủ mọi phép so sánh mà kết luận cần.',
    ],
    worked: {
      prompt:
        'Conclusion: adding silica improved durability, but the benefit levelled off past a moderate concentration. Data: 0% → 71%, 5% → 84%, 10% → 91%, 20% → 92%.',
      promptVi:
        'Kết luận: thêm silica cải thiện độ bền, nhưng lợi ích chững lại sau một nồng độ vừa phải. Dữ liệu: 0% → 71%, 5% → 84%, 10% → 91%, 20% → 92%.',
      steps: [
        'Two claims: silica helps, and the help levels off.',
        'Claim one needs a large rise: 71 to 91 across 0 to 10%.',
        'Claim two needs a negligible rise where the input doubled: 91 to 92 from 10 to 20%.',
        'One option must contain both comparisons.',
      ],
      stepsVi: [
        'Hai khẳng định: silica có ích, và lợi ích chững lại.',
        'Khẳng định một cần một mức tăng lớn: 71 lên 91 khi đi từ 0 tới 10%.',
        'Khẳng định hai cần một mức tăng không đáng kể khi đầu vào tăng gấp đôi: 91 lên 92 từ 10 tới 20%.',
        'Một phương án phải chứa cả hai phép so sánh.',
      ],
      answer: 'Retention rose from 71% to 91% at 10% silica, but only to 92% when silica was doubled to 20%.',
      answerVi: 'Độ bền tăng từ 71% lên 91% ở mức silica 10%, nhưng chỉ lên 92% khi silica tăng gấp đôi thành 20%.',
    },
    traps: [
      {
        name: 'The maximum',
        nameVi: 'Giá trị lớn nhất',
        why: 'Reporting the highest value feels like reporting the finding. It is a single point, and a single point cannot show a shape.',
        whyVi: 'Nêu giá trị cao nhất có cảm giác như đang nêu phát hiện. Nó chỉ là một điểm, và một điểm không thể cho thấy hình dạng.',
      },
      {
        name: 'The baseline alone',
        nameVi: 'Chỉ mốc nền',
        why: 'The starting value is genuinely part of the evidence, so it reads as supporting. Without a second value there is no comparison at all.',
        whyVi: 'Giá trị khởi điểm thật sự là một phần bằng chứng nên đọc lên thấy có tính chống đỡ. Nhưng thiếu giá trị thứ hai thì không có phép so sánh nào.',
      },
      {
        name: 'A floor instead of a trend',
        nameVi: 'Một cận dưới thay vì một xu hướng',
        why: '"Every coating exceeded 80%" is true and sounds like a summary. It establishes a minimum, not the shape of the relationship.',
        whyVi: '"Mọi lớp phủ đều vượt 80%" là đúng và nghe như một tóm tắt. Nó xác lập một mức tối thiểu, không phải hình dạng của mối quan hệ.',
      },
    ],
  },

  {
    skill: 'inferences',
    section: 'rw',
    title: 'Inferences',
    titleVi: 'Suy luận',
    minutes: 6,
    idea:
      'An SAT inference is not a leap. It is the sentence that must be true given what the passage said — usually the one that resolves a tension the passage has just set up. If you need outside knowledge, it is the wrong answer.',
    ideaVi:
      'Suy luận trong SAT không phải một bước nhảy. Nó là câu buộc phải đúng dựa trên những gì đoạn văn đã nói — thường là câu hoá giải một mâu thuẫn mà đoạn văn vừa dựng lên. Nếu bạn cần kiến thức bên ngoài, đó là phương án sai.',
    method: [
      'Identify the tension: two facts that sit uneasily together, or a puzzle just stated.',
      'Ask what would have to be true for both facts to hold at once.',
      'Say that in your own words before reading the options.',
      'Test each option by asking: does the passage force this, or merely allow it? Only forced is correct.',
    ],
    methodVi: [
      'Xác định mâu thuẫn: hai sự kiện đặt cạnh nhau thấy khó chịu, hoặc một câu đố vừa được nêu.',
      'Hỏi: điều gì phải đúng để cả hai sự kiện cùng đứng vững?',
      'Nói điều đó bằng lời của mình trước khi đọc phương án.',
      'Kiểm tra từng phương án bằng câu hỏi: đoạn văn có buộc điều này phải đúng, hay chỉ cho phép nó? Chỉ "buộc" mới là đáp án.',
    ],
    worked: {
      prompt:
        '"Bees adjust the angle of their dance to account for how far the sun has moved while they waited inside the hive. This implies the dancing bee ______"',
      promptVi:
        '"Ong điều chỉnh góc điệu múa để bù cho quãng đường mặt trời đã dịch chuyển trong lúc chúng chờ trong tổ. Điều này hàm ý con ong đang múa ______"',
      steps: [
        'The tension: the bee corrects for the sun\'s movement, but it is inside and cannot see the sun.',
        'To correct for movement over an interval, it must know how long the interval was.',
        'The forced conclusion is about timekeeping, not about vision.',
      ],
      stepsVi: [
        'Mâu thuẫn: con ong bù cho chuyển động của mặt trời, nhưng nó ở trong tổ và không nhìn thấy mặt trời.',
        'Muốn bù cho chuyển động trong một khoảng thời gian, nó phải biết khoảng đó dài bao nhiêu.',
        'Kết luận bị buộc phải rút ra là về việc đo thời gian, không phải về thị giác.',
      ],
      answer: 'tracks the passage of time while inside the hive.',
      answerVi: 'theo dõi được thời gian trôi qua trong lúc ở trong tổ.',
    },
    traps: [
      {
        name: 'The dissolved tension',
        nameVi: 'Mâu thuẫn bị hoà tan',
        why: 'An option like "can see the sun from inside" resolves the puzzle by denying it. If the bee could see the sun, no correction would be needed and the passage would be pointless.',
        whyVi: 'Phương án kiểu "nhìn thấy mặt trời từ trong tổ" hoá giải câu đố bằng cách phủ nhận nó. Nếu ong nhìn được mặt trời thì đâu cần bù, và cả đoạn văn trở nên vô nghĩa.',
      },
      {
        name: 'Merely allowed',
        nameVi: 'Chỉ được cho phép',
        why: 'An option the passage does not contradict feels safe. Inference asks what must follow, not what could also be true.',
        whyVi: 'Phương án mà đoạn văn không phản bác cho cảm giác an toàn. Câu suy luận hỏi điều gì buộc phải theo sau, không phải điều gì cũng có thể đúng.',
      },
      {
        name: 'Imported mechanism',
        nameVi: 'Cơ chế nhập từ ngoài',
        why: 'A plausible scientific explanation the passage never mentions rewards knowledge instead of reading, which is exactly what the question is designed to avoid.',
        whyVi: 'Một lời giải khoa học hợp lý nhưng đoạn văn không hề nhắc tới sẽ thưởng cho kiến thức thay vì cho việc đọc — đúng thứ mà câu hỏi được thiết kế để tránh.',
      },
    ],
  },

  {
    skill: 'words-in-context',
    section: 'rw',
    title: 'Words in Context',
    titleVi: 'Từ trong ngữ cảnh',
    minutes: 5,
    idea:
      'The sentence almost always defines the word for you, usually right after a colon, a dash, or a semicolon. Cover the options, read the definition the sentence gives, and supply your own word first. Then find the option closest to yours.',
    ideaVi:
      'Câu văn hầu như luôn định nghĩa sẵn từ cần điền cho bạn, thường ngay sau dấu hai chấm, gạch ngang hoặc chấm phẩy. Che các phương án đi, đọc định nghĩa mà câu đưa ra, và tự nghĩ một từ trước. Rồi tìm phương án gần từ của bạn nhất.',
    method: [
      'Find the punctuation that introduces the explanation: a colon, a dash, a semicolon, or "because".',
      'Read what follows it. That is the definition.',
      'Cover the options and write your own word in the blank.',
      'Match. If two options are close, check which one the sentence\'s tone supports — positive, negative, or neutral.',
    ],
    methodVi: [
      'Tìm dấu câu dẫn vào phần giải thích: hai chấm, gạch ngang, chấm phẩy, hoặc chữ "vì".',
      'Đọc phần theo sau nó. Đó chính là định nghĩa.',
      'Che các phương án và tự viết một từ vào chỗ trống.',
      'Đối chiếu. Nếu hai phương án gần nhau, xét sắc thái mà câu ủng hộ — tích cực, tiêu cực, hay trung tính.',
    ],
    worked: {
      prompt:
        '"The treaty\'s language is strikingly ______: each party has read the same clause as guaranteeing exactly the access the other believes it prohibits."',
      promptVi:
        '"Ngôn ngữ của hiệp ước ______ một cách đáng chú ý: mỗi bên đọc cùng một điều khoản như đang bảo đảm đúng cái quyền tiếp cận mà bên kia tin là nó cấm."',
      steps: [
        'The colon introduces the definition: two opposite readings both survive.',
        'Own word: "ambiguous" — it genuinely bears more than one meaning.',
        'Match to the option nearest that.',
      ],
      stepsVi: [
        'Dấu hai chấm dẫn vào định nghĩa: hai cách hiểu trái ngược cùng đứng vững.',
        'Từ tự nghĩ: "mơ hồ" — nó thật sự mang nhiều hơn một nghĩa.',
        'Ghép với phương án gần nhất.',
      ],
      answer: 'equivocal',
      answerVi: 'equivocal (nước đôi, đa nghĩa)',
    },
    traps: [
      {
        name: 'The common meaning',
        nameVi: 'Nghĩa thông dụng',
        why: 'Many tested words have a everyday sense and a precise one. The test uses the precise one, and the everyday sense is placed as a distractor because it is the first thing recall offers.',
        whyVi: 'Nhiều từ được hỏi có một nghĩa đời thường và một nghĩa chính xác. Đề dùng nghĩa chính xác, còn nghĩa đời thường được đặt làm phương án nhiễu vì đó là thứ trí nhớ đưa ra đầu tiên.',
      },
      {
        name: 'Right tone, wrong meaning',
        nameVi: 'Đúng sắc thái, sai nghĩa',
        why: 'An option with the correct positive or negative charge feels close enough. Tone narrows the field; it does not choose within it.',
        whyVi: 'Phương án đúng sắc thái tích cực hay tiêu cực cho cảm giác đã đủ gần. Sắc thái chỉ thu hẹp phạm vi, không chọn giúp bạn bên trong phạm vi đó.',
      },
      {
        name: 'The harder word',
        nameVi: 'Từ khó hơn',
        why: 'On a hard question the unfamiliar word feels like the intended answer. Difficulty is not evidence; the sentence is.',
        whyVi: 'Ở câu khó, từ lạ hoắc cho cảm giác là đáp án được nhắm tới. Độ khó không phải bằng chứng; câu văn mới là.',
      },
    ],
  },

  {
    skill: 'text-structure-purpose',
    section: 'rw',
    title: 'Text Structure and Purpose',
    titleVi: 'Cấu trúc và mục đích',
    minutes: 6,
    idea:
      'Describe what each sentence does, not what it says. A structure answer is a sequence of moves — claim, concession, counter-evidence, narrowed restatement — and the right option is the one whose sequence matches.',
    ideaVi:
      'Hãy mô tả mỗi câu *làm gì*, không phải nó *nói gì*. Phương án về cấu trúc là một chuỗi động tác — nêu luận điểm, nhượng bộ, phản chứng, phát biểu lại hẹp hơn — và đáp án đúng là phương án có chuỗi động tác khớp.',
    method: [
      'Label each sentence with a verb: states, concedes, complicates, illustrates, concludes.',
      'Write the sequence of labels in order.',
      'Read the options as sequences too, and compare them to yours position by position.',
      'A single wrong move makes the whole option wrong, even if the rest fits.',
    ],
    methodVi: [
      'Gán cho mỗi câu một động từ: nêu, nhượng bộ, làm phức tạp, minh hoạ, kết luận.',
      'Viết chuỗi các nhãn đó theo thứ tự.',
      'Đọc các phương án cũng như những chuỗi, và so sánh với chuỗi của bạn theo từng vị trí.',
      'Chỉ một động tác sai là cả phương án sai, dù phần còn lại khớp.',
    ],
    worked: {
      prompt:
        '"It is often said the printing press caused the Reformation. The claim has an obvious appeal... But presses had operated for sixty years before 1517 without upheaval... The press was the channel. It was not the current."',
      promptVi:
        '"Người ta thường nói máy in gây ra cuộc Cải cách. Luận điểm này có sức hấp dẫn rõ ràng... Nhưng máy in đã hoạt động sáu mươi năm trước 1517 mà không có biến động nào... Máy in là kênh dẫn. Nó không phải dòng chảy."',
      steps: [
        'Sentence 1: states a widely held claim.',
        'Sentence 2: concedes its appeal.',
        'Sentence 3: supplies evidence limiting it.',
        'Sentence 4: restates the claim in narrower terms.',
        'Sequence: claim, concession, counter-evidence, narrowed restatement.',
      ],
      stepsVi: [
        'Câu 1: nêu một luận điểm phổ biến.',
        'Câu 2: thừa nhận sức hấp dẫn của nó.',
        'Câu 3: đưa bằng chứng giới hạn nó.',
        'Câu 4: phát biểu lại luận điểm theo cách hẹp hơn.',
        'Chuỗi: luận điểm, nhượng bộ, phản chứng, phát biểu lại hẹp hơn.',
      ],
      answer: 'It presents a claim, concedes its appeal, limits it with evidence, then restates it narrowly.',
      answerVi: 'Nó nêu một luận điểm, thừa nhận sức hấp dẫn, giới hạn nó bằng bằng chứng, rồi phát biểu lại hẹp hơn.',
    },
    traps: [
      {
        name: 'Content instead of function',
        nameVi: 'Nội dung thay vì chức năng',
        why: 'An option that accurately summarises what the passage is about will feel right. The question asks how it is built, which is a different question.',
        whyVi: 'Phương án tóm tắt chính xác đoạn văn nói về cái gì sẽ cho cảm giác đúng. Câu hỏi lại hỏi nó được dựng lên thế nào — một câu hỏi khác.',
      },
      {
        name: 'One move too many',
        nameVi: 'Thừa một động tác',
        why: 'An option describing four moves when the passage makes three is right about most of it, and most is not enough.',
        whyVi: 'Phương án mô tả bốn động tác trong khi đoạn văn chỉ có ba thì đúng ở phần lớn, và phần lớn thì chưa đủ.',
      },
      {
        name: 'Reversed order',
        nameVi: 'Đảo thứ tự',
        why: 'The same moves in the wrong sequence describe a different argument entirely, but the vocabulary matches so closely that the error is easy to skim past.',
        whyVi: 'Cùng những động tác đó nhưng sai thứ tự thì mô tả một lập luận hoàn toàn khác, chỉ có điều từ ngữ khớp quá sát nên rất dễ đọc lướt qua.',
      },
    ],
  },

  {
    skill: 'cross-text-connections',
    section: 'rw',
    title: 'Cross-Text Connections',
    titleVi: 'Liên kết đa văn bản',
    minutes: 7,
    idea:
      'Most paired texts do not disagree about the facts. They agree about the data and disagree about what it means. Find the layer of the disagreement before you look at the options: data, cause, interpretation, or recommendation.',
    ideaVi:
      'Phần lớn các cặp văn bản không bất đồng về sự kiện. Họ đồng ý về dữ liệu và bất đồng về ý nghĩa của nó. Hãy xác định tầng của bất đồng trước khi nhìn phương án: dữ liệu, nguyên nhân, cách diễn giải, hay khuyến nghị.',
    method: [
      'Summarise Text 1 in one sentence: what does it claim?',
      'Read Text 2 looking for the phrase where it concedes. "The figures are not in dispute", "the advantage is real" — this is where the shared ground is marked.',
      'Whatever Text 2 concedes is not the disagreement. What it objects to immediately after is.',
      'Name the layer, then pick the option that names the same layer.',
    ],
    methodVi: [
      'Tóm tắt Văn bản 1 trong một câu: nó khẳng định điều gì?',
      'Đọc Văn bản 2 và tìm chỗ nó nhượng bộ. "Các con số không phải điều tranh cãi", "lợi thế đó là có thật" — đây là chỗ đánh dấu phần đất chung.',
      'Điều Văn bản 2 nhượng bộ không phải là bất đồng. Điều nó phản đối ngay sau đó mới là.',
      'Gọi tên tầng bất đồng, rồi chọn phương án gọi tên đúng tầng đó.',
    ],
    worked: {
      prompt:
        'Text 1: longhand note-taking improves retention because writing is slower and forces summarising. Text 2: the advantage is real, but when laptop users are told to summarise, they match it. The medium is not what matters.',
      promptVi:
        'Văn bản 1: ghi chép tay cải thiện khả năng nhớ vì viết chậm hơn nên buộc phải tóm tắt. Văn bản 2: lợi thế đó là có thật, nhưng khi người dùng laptop được yêu cầu tóm tắt thì họ cũng đạt tương đương. Phương tiện không phải điều quyết định.',
      steps: [
        'Text 2 concedes the effect: "the advantage is real".',
        'So the disagreement is not about data.',
        'It relocates the cause from the medium to whether the note-taker processes the material.',
        'Layer: cause.',
      ],
      stepsVi: [
        'Văn bản 2 nhượng bộ về hiệu ứng: "lợi thế đó là có thật".',
        'Vậy bất đồng không nằm ở dữ liệu.',
        'Nó dời nguyên nhân từ phương tiện sang việc người ghi có xử lý nội dung hay không.',
        'Tầng: nguyên nhân.',
      ],
      answer: 'Text 2 accepts the finding but rejects the explanation Text 1 gives for it.',
      answerVi: 'Văn bản 2 chấp nhận phát hiện nhưng bác bỏ lời giải thích mà Văn bản 1 đưa ra cho nó.',
    },
    traps: [
      {
        name: 'Manufactured data dispute',
        nameVi: 'Bịa ra bất đồng về dữ liệu',
        why: 'Options claiming Text 2 questions the measurements are common and almost always wrong. Reading past the concession sentence is what causes it.',
        whyVi: 'Phương án nói Văn bản 2 nghi ngờ số liệu rất phổ biến và gần như luôn sai. Nguyên nhân là đọc lướt qua câu nhượng bộ.',
      },
      {
        name: 'Total opposition',
        nameVi: 'Đối lập toàn phần',
        why: 'It is tidier to imagine the texts disagree about everything. Paired SAT texts almost never do, and the tidy reading is the one the distractor offers.',
        whyVi: 'Hình dung hai văn bản bất đồng về mọi thứ thì gọn gàng hơn. Cặp văn bản SAT gần như không bao giờ như vậy, và cách đọc gọn gàng đó chính là thứ phương án nhiễu chào mời.',
      },
      {
        name: 'An unstated recommendation',
        nameVi: 'Khuyến nghị không hề được nêu',
        why: 'An option saying Text 2 proposes an alternative sounds like a natural next step, but a text that diagnoses a cause has not thereby prescribed anything.',
        whyVi: 'Phương án nói Văn bản 2 đề xuất một giải pháp thay thế nghe như bước tiếp theo tự nhiên, nhưng một văn bản chẩn đoán nguyên nhân thì chưa vì thế mà kê đơn gì cả.',
      },
    ],
  },

  {
    skill: 'transitions',
    section: 'rw',
    title: 'Transitions',
    titleVi: 'Từ nối',
    minutes: 5,
    idea:
      'Cover the transition and read the two sentences as bare statements. Ask one question: does the second sentence go the same way as the first, the opposite way, or does it follow from it? Three relationships cover almost every transition question.',
    ideaVi:
      'Che từ nối đi và đọc hai câu như hai phát biểu trần trụi. Hỏi một câu duy nhất: câu hai đi cùng chiều với câu một, ngược chiều, hay là hệ quả của nó? Ba mối quan hệ này bao gần hết mọi câu về từ nối.',
    method: [
      'Cover the blank. Read sentence one, then sentence two.',
      'Choose the relationship: same direction (also, moreover), opposite (however, still, that said), or consequence (thus, therefore, accordingly).',
      'Only then look at the options, and group them by relationship.',
      'If two options share your relationship, choose on strength: "however" is a harder turn than "that said".',
    ],
    methodVi: [
      'Che chỗ trống. Đọc câu một, rồi câu hai.',
      'Chọn mối quan hệ: cùng chiều (also, moreover), ngược chiều (however, still, that said), hoặc hệ quả (thus, therefore, accordingly).',
      'Đến lúc đó mới nhìn phương án, và nhóm chúng theo mối quan hệ.',
      'Nếu hai phương án cùng mối quan hệ của bạn, chọn theo cường độ: "however" là cú rẽ gắt hơn "that said".',
    ],
    worked: {
      prompt:
        '"Experimental work found people discount future rewards inconsistently. ______ the constant-rate models remain in wide use, because their mathematics is tractable."',
      promptVi:
        '"Nghiên cứu thực nghiệm cho thấy người ta chiết khấu phần thưởng tương lai một cách không nhất quán. ______ các mô hình tỉ lệ cố định vẫn được dùng rộng rãi, vì phần toán của chúng dễ xử lý."',
      steps: [
        'Sentence one: the evidence undercuts the models.',
        'Sentence two: the models are still used.',
        'That runs against what sentence one leads you to expect. Opposite direction.',
        'Among the opposites, this is a concession rather than a hard reversal.',
      ],
      stepsVi: [
        'Câu một: bằng chứng làm suy yếu các mô hình.',
        'Câu hai: các mô hình vẫn được dùng.',
        'Điều đó đi ngược lại kỳ vọng mà câu một tạo ra. Ngược chiều.',
        'Trong nhóm ngược chiều, đây là một sự nhượng bộ chứ không phải cú đảo gắt.',
      ],
      answer: 'Still,',
      answerVi: 'Still, (Dù vậy,)',
    },
    traps: [
      {
        name: 'Reversed causation',
        nameVi: 'Đảo chiều nhân quả',
        why: '"Consequently" fits the rhythm of an argument and is easy to accept without checking which sentence causes which.',
        whyVi: '"Consequently" hợp với nhịp của một lập luận nên dễ được chấp nhận mà không kiểm tra câu nào gây ra câu nào.',
      },
      {
        name: 'Restating instead of adding',
        nameVi: 'Nhắc lại thay vì bổ sung',
        why: '"In other words" is chosen when the two sentences are on the same topic. Same topic is not the same thing as same content.',
        whyVi: '"In other words" bị chọn khi hai câu cùng chủ đề. Cùng chủ đề không đồng nghĩa với cùng nội dung.',
      },
      {
        name: 'Right direction, wrong force',
        nameVi: 'Đúng chiều, sai cường độ',
        why: 'Several options may all signal contrast. Skipping the strength check is the most common way a well-understood question is still lost.',
        whyVi: 'Có thể nhiều phương án cùng báo hiệu tương phản. Bỏ qua bước xét cường độ là cách phổ biến nhất khiến một câu đã hiểu rõ vẫn bị mất điểm.',
      },
    ],
  },

  {
    skill: 'rhetorical-synthesis',
    section: 'rw',
    title: 'Rhetorical Synthesis',
    titleVi: 'Tổng hợp tu từ',
    minutes: 6,
    idea:
      'The goal statement is the whole question. Read it before the notes, underline the verb, and accept only the option that does exactly that verb. Accuracy is not the test — every option is usually accurate.',
    ideaVi:
      'Câu nêu mục đích chính là toàn bộ câu hỏi. Đọc nó trước khi đọc ghi chú, gạch chân động từ, và chỉ chấp nhận phương án làm đúng động từ đó. Đề không kiểm tra tính chính xác — thường thì phương án nào cũng chính xác.',
    method: [
      'Read the goal first. Underline its verb: explain, emphasise, compare, illustrate, introduce.',
      'Note which specific bullets could serve that verb. Usually one or two.',
      'Read the options and reject every one that uses the wrong bullets, however true it is.',
      'Among survivors, prefer the one whose grammar performs the verb — a contrast needs both terms in one sentence.',
    ],
    methodVi: [
      'Đọc mục đích trước. Gạch chân động từ: giải thích, nhấn mạnh, so sánh, minh hoạ, giới thiệu.',
      'Ghi nhận những gạch đầu dòng nào phục vụ được động từ đó. Thường là một hoặc hai.',
      'Đọc các phương án và loại mọi phương án dùng sai gạch đầu dòng, dù nó đúng đến đâu.',
      'Trong số còn lại, ưu tiên phương án mà ngữ pháp của nó *thực hiện* động từ — một phép so sánh cần cả hai vế trong một câu.',
    ],
    worked: {
      prompt:
        'Goal: emphasise a contrast between terra preta and the surrounding soil. Notes include: terra preta is dark and fertile; ordinary Amazonian soil is thin and low in nutrients; terra preta retains nutrients far longer.',
      promptVi:
        'Mục đích: nhấn mạnh sự tương phản giữa terra preta và đất xung quanh. Ghi chú gồm: terra preta sẫm màu và màu mỡ; đất Amazon thông thường mỏng và nghèo dinh dưỡng; terra preta giữ dinh dưỡng lâu hơn nhiều.',
      steps: [
        'Verb: emphasise a contrast. A contrast needs two things compared on the same property.',
        'Relevant bullets: the two soils and their fertility and retention.',
        'The option must place both soils in one sentence, on the same properties.',
      ],
      stepsVi: [
        'Động từ: nhấn mạnh một tương phản. Tương phản cần hai đối tượng được so trên cùng một thuộc tính.',
        'Gạch đầu dòng liên quan: hai loại đất, và độ màu mỡ cùng khả năng giữ dinh dưỡng.',
        'Phương án phải đặt cả hai loại đất trong một câu, trên cùng thuộc tính.',
      ],
      answer: 'Terra preta, unlike the thin and nutrient-poor soil around it, is dark, fertile, and holds nutrients far longer.',
      answerVi: 'Terra preta, khác với lớp đất mỏng và nghèo dinh dưỡng quanh nó, sẫm màu, màu mỡ và giữ dinh dưỡng lâu hơn nhiều.',
    },
    traps: [
      {
        name: 'Accurate but off-goal',
        nameVi: 'Chính xác nhưng lệch mục đích',
        why: 'Every option is drawn from the notes and is therefore true. Verifying accuracy feels like doing the work, and it eliminates nothing.',
        whyVi: 'Mọi phương án đều lấy từ ghi chú nên đều đúng. Việc xác minh tính chính xác cho cảm giác đang làm việc, mà thực ra không loại được phương án nào.',
      },
      {
        name: 'One term of a comparison',
        nameVi: 'Chỉ một vế của phép so sánh',
        why: 'Describing only terra preta satisfies the topic but not the verb. A comparison with one term is not a comparison.',
        whyVi: 'Chỉ mô tả terra preta thì thoả mãn chủ đề nhưng không thoả mãn động từ. Một phép so sánh chỉ có một vế thì không phải phép so sánh.',
      },
      {
        name: 'Invented linkage',
        nameVi: 'Bịa ra mối liên hệ',
        why: 'Joining two bullets with "because" produces a fluent sentence and a causal claim the notes never made.',
        whyVi: 'Nối hai gạch đầu dòng bằng chữ "vì" tạo ra một câu trôi chảy và một khẳng định nhân quả mà ghi chú chưa từng đưa ra.',
      },
    ],
  },

  {
    skill: 'boundaries',
    section: 'rw',
    title: 'Boundaries',
    titleVi: 'Ranh giới câu',
    minutes: 6,
    idea:
      'Almost every boundaries question reduces to one test: is each side of the punctuation an independent clause? Answer that first and most options eliminate themselves. Punctuation is grammar, not rhythm — never choose by where you would pause.',
    ideaVi:
      'Gần như mọi câu về ranh giới đều quy về một phép thử: mỗi bên của dấu câu có phải một mệnh đề độc lập không? Trả lời câu đó trước là phần lớn phương án tự loại. Dấu câu là ngữ pháp, không phải nhịp điệu — đừng bao giờ chọn theo chỗ bạn muốn ngắt hơi.',
    method: [
      'Cover the blank. Ask: is the left side a complete sentence? Is the right side?',
      'Both complete → period or semicolon. Comma alone is a splice; a comma plus a coordinating conjunction is also correct.',
      'Left complete, right explains or lists → colon.',
      'One side incomplete → no period, no semicolon, no colon. Usually a comma or nothing.',
      'A nonessential phrase opened with a comma must be closed with one.',
    ],
    methodVi: [
      'Che chỗ trống. Hỏi: vế trái có phải một câu hoàn chỉnh không? Vế phải thì sao?',
      'Cả hai hoàn chỉnh → dấu chấm hoặc chấm phẩy. Chỉ dấu phẩy là lỗi nối câu; dấu phẩy kèm liên từ đẳng lập cũng đúng.',
      'Vế trái hoàn chỉnh, vế phải giải thích hoặc liệt kê → dấu hai chấm.',
      'Một vế không hoàn chỉnh → không dấu chấm, không chấm phẩy, không hai chấm. Thường là dấu phẩy hoặc không gì cả.',
      'Cụm không thiết yếu đã mở bằng dấu phẩy thì phải đóng bằng dấu phẩy.',
    ],
    worked: {
      prompt:
        '"The expedition carried three chronometers rather than one for a practical ______ if a single instrument drifted, there would be no way to know which reading to trust."',
      promptVi:
        '"Đoàn thám hiểm mang ba chiếc chronometer thay vì một vì một lý do thực tế ______ nếu chỉ một thiết bị bị lệch, sẽ không có cách nào biết nên tin số đọc nào."',
      steps: [
        'Left side: "The expedition carried three chronometers... for a practical reason." Complete.',
        'Right side explains what that reason is.',
        'Complete clause followed by an explanation → colon.',
      ],
      stepsVi: [
        'Vế trái: "Đoàn thám hiểm mang ba chiếc chronometer... vì một lý do thực tế." Hoàn chỉnh.',
        'Vế phải giải thích lý do đó là gì.',
        'Mệnh đề hoàn chỉnh theo sau bởi một lời giải thích → dấu hai chấm.',
      ],
      answer: 'reason:',
      answerVi: 'reason: (dấu hai chấm)',
    },
    traps: [
      {
        name: 'The comma splice',
        nameVi: 'Lỗi nối câu bằng dấu phẩy',
        why: 'A comma matches where the voice pauses, so it feels natural between two complete sentences. Naturalness is exactly the wrong criterion here.',
        whyVi: 'Dấu phẩy trùng với chỗ giọng đọc ngắt hơi nên đặt giữa hai câu hoàn chỉnh thấy tự nhiên. Mà "tự nhiên" chính là tiêu chí sai ở đây.',
      },
      {
        name: 'The unclosed modifier',
        nameVi: 'Cụm bổ nghĩa không đóng',
        why: 'The opening comma appears earlier in the sentence, so by the blank it has been forgotten. Scan back to check whether one is already open.',
        whyVi: 'Dấu phẩy mở nằm ở phần trước của câu nên tới chỗ trống thì đã quên mất. Hãy quét ngược lại xem đã có dấu phẩy nào đang mở chưa.',
      },
      {
        name: 'Semicolon after a fragment',
        nameVi: 'Chấm phẩy sau một mệnh đề cụt',
        why: 'A semicolon looks formal and therefore safe. It has exactly one rule: an independent clause on both sides.',
        whyVi: 'Chấm phẩy trông trang trọng nên có cảm giác an toàn. Nó chỉ có đúng một quy tắc: mệnh đề độc lập ở cả hai bên.',
      },
    ],
  },

  {
    skill: 'form-structure-sense',
    section: 'rw',
    title: 'Form, Structure, and Sense',
    titleVi: 'Hình thức và ngữ pháp',
    minutes: 7,
    idea:
      'The test hides the subject behind a phrase and then checks whether you agreed the verb with the phrase instead. Cross out every prepositional phrase and every clause between the subject and the verb, and the answer usually becomes obvious.',
    ideaVi:
      'Đề thi giấu chủ ngữ sau một cụm từ rồi kiểm tra xem bạn có chia động từ theo cụm đó thay vì theo chủ ngữ không. Hãy gạch bỏ mọi cụm giới từ và mọi mệnh đề nằm giữa chủ ngữ và động từ, đáp án thường lộ ra ngay.',
    method: [
      'Cross out anything between the subject and the verb: "of the samples", "along with the notebook", "which she wrote".',
      'Read what remains. Agree the verb with that.',
      'For "neither…nor" and "either…or", agree with the nearer subject.',
      'For a leading participial phrase, the noun right after the comma must be what the phrase describes.',
      'For tense, find the sentence\'s reference point. An action completed before a past moment takes the past perfect.',
      'For a comparison, check both sides are the same kind of thing — results with results, not results with a survey.',
    ],
    methodVi: [
      'Gạch bỏ mọi thứ giữa chủ ngữ và động từ: "của các mẫu", "cùng với cuốn sổ", "mà cô ấy viết".',
      'Đọc phần còn lại. Chia động từ theo phần đó.',
      'Với "neither…nor" và "either…or", chia theo chủ ngữ gần hơn.',
      'Với cụm phân từ mở đầu, danh từ ngay sau dấu phẩy phải là thứ mà cụm đó mô tả.',
      'Với thì, tìm mốc thời gian tham chiếu của câu. Hành động hoàn tất trước một mốc quá khứ dùng quá khứ hoàn thành.',
      'Với phép so sánh, kiểm tra hai vế cùng loại — kết quả so với kết quả, không phải kết quả so với một cuộc khảo sát.',
    ],
    worked: {
      prompt: '"The samples, along with the field notebook, ______ been sent to the laboratory."',
      promptVi: '"Các mẫu vật, cùng với cuốn sổ thực địa, ______ được gửi tới phòng thí nghiệm."',
      steps: [
        'Cross out "along with the field notebook" — it is parenthetical, not part of the subject.',
        'What remains: "The samples ______ been sent."',
        '"Samples" is plural.',
      ],
      stepsVi: [
        'Gạch bỏ "cùng với cuốn sổ thực địa" — đó là phần chèn thêm, không thuộc chủ ngữ.',
        'Phần còn lại: "Các mẫu vật ______ được gửi."',
        '"Mẫu vật" là số nhiều.',
      ],
      answer: 'have',
      answerVi: 'have (số nhiều)',
    },
    traps: [
      {
        name: 'The nearest noun',
        nameVi: 'Danh từ gần nhất',
        why: 'The noun just before the verb is the one your ear hears. The test places a singular noun there when the subject is plural, precisely for that reason.',
        whyVi: 'Danh từ ngay trước động từ là danh từ tai bạn nghe thấy. Đề đặt một danh từ số ít vào đúng chỗ đó khi chủ ngữ số nhiều, chính vì lý do đó.',
      },
      {
        name: 'The dangling modifier',
        nameVi: 'Cụm bổ nghĩa lơ lửng',
        why: 'The sentence is comprehensible either way, so nothing sounds wrong. Only checking who the opening phrase describes catches it.',
        whyVi: 'Câu vẫn hiểu được theo cả hai cách nên nghe không thấy sai ở đâu. Chỉ có kiểm tra xem cụm mở đầu mô tả ai mới bắt được lỗi này.',
      },
      {
        name: 'Comparing unlike things',
        nameVi: 'So sánh hai thứ khác loại',
        why: '"The results of 2019 were better than the 2015 survey" reads smoothly, and the mismatch between a result and a survey only appears when you name both sides.',
        whyVi: '"Kết quả năm 2019 tốt hơn cuộc khảo sát 2015" đọc rất trôi, và sự lệch loại giữa một kết quả và một cuộc khảo sát chỉ lộ ra khi bạn gọi tên cả hai vế.',
      },
    ],
  },
];
