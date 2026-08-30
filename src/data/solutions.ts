/**
 * Expert worked solutions.
 *
 * The lesson library gives one worked example per skill, at the band where the
 * method is clearest. That is the right shape for learning a method and the
 * wrong shape for the last two hundred points, because at the top the method
 * is already known and what separates candidates is the decision the method
 * does not make for them.
 *
 * So each solution here carries four things a normal worked example does not.
 *
 * **The read.** What an expert notices before looking at the options. Most
 * published solutions begin after this step, which is exactly the step a
 * learner cannot reconstruct — they see a confident first move and no account
 * of why that move and not another.
 *
 * **Reasoning, not operations.** Every step says what to do *and why that*.
 * A step whose justification is "because that is the method" has not been
 * explained; it has been asserted.
 *
 * **The wrong turn.** The plausible path an able student takes, followed far
 * enough to show exactly where it breaks. This is the field that matters most
 * and the one almost no published solution contains. A student who is told
 * only the right path learns a route; a student shown the attractive wrong
 * path and its failure learns to recognise the fork. On hard items the fork is
 * the item.
 *
 * **Transfer.** What generalises. Without it, ninety solutions are ninety
 * facts.
 *
 * Timing is stated in seconds because a correct solution that takes three
 * minutes is a wrong answer somewhere else on the paper.
 */

import type { SectionId, SkillId } from '../types.ts';

export interface SolutionStep {
  /** The action. */
  act: string;
  actVi: string;
  /** Why this action and not another. Never "because that is the method". */
  why: string;
  whyVi: string;
}

export interface WrongTurn {
  /** The path an able student takes, stated sympathetically. */
  path: string;
  pathVi: string;
  /** Where it breaks, precisely. */
  breaks: string;
  breaksVi: string;
}

export interface ExpertSolution {
  id: string;
  skill: SkillId;
  section: SectionId;
  band: 'medium' | 'hard';
  stimulus?: string;
  prompt: string;
  choices?: Array<{ id: string; text: string }>;
  answer: string;
  /** Seconds an expert takes. The target a learner works towards. */
  seconds: number;
  read: string;
  readVi: string;
  steps: SolutionStep[];
  wrongTurn: WrongTurn;
  transfer: string;
  transferVi: string;
}

/* ================================================================== */
/* Information and Ideas                                               */
/* ================================================================== */

export const SOLUTIONS_RW: ExpertSolution[] = [
  {
    id: 'sol_ci_1', skill: 'central-ideas', section: 'rw', band: 'medium', seconds: 60,
    stimulus:
      'Archaeologists have long treated the absence of grave goods in a burial as evidence of low status. Working at a cemetery in northern Jutland, Ingrid Halvorsen found that the richest textiles in the excavation came from graves with no metalwork at all — and that textiles survive only where the soil chemistry is unusual. She argues that what the standard reading measures is not status but preservation.',
    prompt: 'Which choice best states the main idea of the text?',
    choices: [
      { id: 'A', text: 'Halvorsen’s excavation shows that textiles were more valuable than metalwork in northern Jutland.' },
      { id: 'B', text: 'A conventional indicator of status may instead be recording which materials happened to survive.' },
      { id: 'C', text: 'Soil chemistry varies more across cemeteries than archaeologists have recognised.' },
      { id: 'D', text: 'Graves without metalwork have been systematically undervalued by archaeologists.' },
    ],
    answer: 'B',
    read: 'Three sentences: a standard practice, a finding that cuts against it, and a claim about what the practice actually measures. The last sentence is doing the arguing, and in an argument paragraph the main idea is the claim, not the evidence for it.',
    readVi: 'Ba câu: một thông lệ, một phát hiện đi ngược lại nó, và một khẳng định về việc thông lệ đó THỰC RA đo cái gì. Câu cuối mới là câu lập luận, và trong một đoạn lập luận thì ý chính là KHẲNG ĐỊNH, không phải bằng chứng cho nó.',
    steps: [
      {
        act: 'Say the claim in your own words before reading any option: "the usual measure of status might be measuring survival instead".',
        actVi: 'Nói lại khẳng định bằng lời của mình TRƯỚC khi đọc phương án nào: "thước đo địa vị quen dùng có thể thực ra đang đo khả năng bảo quản".',
        why: 'An option is judged against your sentence, not the other way round. A reader who reads the options first ends up choosing whichever one sounds most like the passage — and the wrong options are built to sound like the passage.',
        whyVi: 'Phương án được đối chiếu với CÂU CỦA BẠN, không phải ngược lại. Người đọc phương án trước sẽ chọn cái nào "nghe giống bài nhất" — mà các phương án sai được dựng ra chính để nghe giống bài.',
      },
      {
        act: 'Check each option against that sentence for scope, not for vocabulary overlap.',
        actVi: 'Đối chiếu từng phương án với câu đó theo PHẠM VI, không theo việc trùng từ.',
        why: 'Every wrong option here reuses words from the text. Scope is what separates them: two are about a detail, one over-claims.',
        whyVi: 'Mọi phương án sai ở đây đều dùng lại từ trong bài. Chính PHẠM VI mới tách được chúng: hai phương án nói về chi tiết, một phương án khẳng định quá tay.',
      },
    ],
    wrongTurn: {
      path: 'D is the natural choice. The text does concern graves without metalwork, it does say they have been misread, and "undervalued" is a fair description of what happened to them.',
      pathVi: 'D là lựa chọn tự nhiên. Bài đúng là nói về những ngôi mộ không có đồ kim loại, đúng là nói chúng bị đọc sai, và "bị đánh giá thấp" mô tả không sai điều đã xảy ra với chúng.',
      breaks: 'It breaks on what the argument is *about*. Halvorsen’s claim is about the indicator — that grave goods measure preservation rather than status — and applies to every cemetery where soil chemistry varies. D shrinks a claim about method into a claim about one group of graves, which is a smaller and different statement.',
      breaksVi: 'Nó hỏng ở chỗ lập luận đang nói VỀ CÁI GÌ. Khẳng định của Halvorsen là về chính THƯỚC ĐO — rằng đồ tuỳ táng đo khả năng bảo quản chứ không đo địa vị — và áp dụng cho mọi nghĩa địa có thổ nhưỡng khác nhau. Phương án D co một khẳng định về PHƯƠNG PHÁP thành một khẳng định về MỘT NHÓM MỘ, tức là một phát biểu nhỏ hơn và khác hẳn.',
    },
    transfer: 'When a paragraph names a practice, then undercuts it, the main idea is almost always about the practice. Options that describe the evidence are the standard decoys, and they are attractive precisely because they are true.',
    transferVi: 'Khi một đoạn nêu ra một thông lệ rồi phản lại nó, ý chính hầu như luôn nói về CHÍNH THÔNG LỆ ĐÓ. Những phương án mô tả bằng chứng là mồi nhử tiêu chuẩn, và chúng hấp dẫn chính vì chúng ĐÚNG.',
  },
  {
    id: 'sol_ci_2', skill: 'central-ideas', section: 'rw', band: 'hard', seconds: 75,
    stimulus:
      'In the decade after 1958, four separate laboratories reported the same anomalous line in the spectrum of a common laboratory solvent, and each attributed it to a different impurity. None of the four cited the others. The line was eventually traced to the glass of the cuvettes, which every laboratory bought from the same supplier. Historian of science Wen Li notes that the episode is usually told as a story about careless chemistry, and argues that it is better read as a story about what shared equipment does to independent replication.',
    prompt: 'Which choice best states the main idea of the text?',
    choices: [
      { id: 'A', text: 'Four laboratories failed to detect a contaminant because they did not read one another’s published work.' },
      { id: 'B', text: 'An episode normally read as individual carelessness is better understood as a limit on what independent replication can establish.' },
      { id: 'C', text: 'Glassware from a single supplier introduced a systematic error into spectroscopic measurements after 1958.' },
      { id: 'D', text: 'Li argues that historians of science have paid too little attention to laboratory equipment.' },
    ],
    answer: 'B',
    read: 'The whole passage is setup until the last clause. "Is usually told as X, and is better read as Y" is a reframing structure, and in a reframing the main idea is always Y — the reading being argued for, not the events being reread.',
    readVi: 'Cả đoạn chỉ là dàn cảnh cho tới mệnh đề cuối. "Thường được kể như X, nhưng nên đọc như Y" là cấu trúc TÁI DIỄN GIẢI, và trong tái diễn giải thì ý chính luôn là Y — cách đọc đang được bảo vệ, không phải chuỗi sự kiện được đọc lại.',
    steps: [
      {
        act: 'Locate the reframing signal — "is usually told as … better read as" — and mark what sits on each side of it.',
        actVi: 'Tìm dấu hiệu tái diễn giải — "thường được kể như … nên đọc như" — và đánh dấu cái nằm mỗi bên.',
        why: 'The old reading and the new one are both in the text, and three of the four options are versions of the old one. Knowing which side you are on removes them at once.',
        whyVi: 'Cách đọc cũ và cách đọc mới đều nằm trong bài, và ba trong bốn phương án là biến thể của cách đọc CŨ. Biết mình đang đứng ở bên nào là loại được chúng ngay.',
      },
      {
        act: 'State Y at the level of generality Li states it: not "these four labs shared cuvettes" but "shared equipment limits what replication proves".',
        actVi: 'Phát biểu Y ở đúng mức khái quát mà Li phát biểu: không phải "bốn phòng thí nghiệm này dùng chung cuvette" mà "dùng chung thiết bị làm giới hạn điều mà việc lặp lại chứng minh được".',
        why: 'A reframing claims something general; if it did not, there would be nothing to reframe. An option pitched at the level of the anecdote is by construction too narrow.',
        whyVi: 'Một tái diễn giải bao giờ cũng khẳng định điều gì đó có tính khái quát; nếu không thì chẳng có gì để diễn giải lại. Phương án đặt ở mức của giai thoại thì tự nó đã quá hẹp.',
      },
    ],
    wrongTurn: {
      path: 'C is factually impeccable. The glass did introduce a systematic error, it was from one supplier, and the dating is right. A reader checking options against the text finds nothing wrong with it.',
      pathVi: 'C hoàn toàn đúng sự thật. Thuỷ tinh đúng là gây ra sai số hệ thống, đúng là từ một nhà cung cấp, và mốc thời gian cũng chuẩn. Người đọc đối chiếu phương án với bài sẽ không tìm thấy chỗ nào sai.',
      breaks: 'It breaks because "nothing wrong with it" is not the test. C is the *old* reading with the cause corrected — it is what the four laboratories eventually concluded. Li’s point begins after that: the interesting fact is not what the contaminant was, but that four independent confirmations were not independent. Checking options for truth rather than for role is the single most expensive habit at this band.',
      breaksVi: 'Nó hỏng vì "không sai chỗ nào" KHÔNG PHẢI tiêu chí. C chính là cách đọc CŨ đã sửa lại nguyên nhân — đó là kết luận mà bốn phòng thí nghiệm cuối cùng rút ra. Luận điểm của Li bắt đầu SAU đó: điều đáng nói không phải chất bẩn là gì, mà là bốn lần xác nhận độc lập hoá ra không hề độc lập. Kiểm phương án theo ĐÚNG–SAI thay vì theo VAI TRÒ là thói quen tốn kém nhất ở band này.',
    },
    transfer: 'On a reframing passage, sort the options into "the old reading" and "the new one" before judging any of them. Truth is not the criterion; position in the argument is.',
    transferVi: 'Với đoạn tái diễn giải, hãy xếp các phương án vào hai nhóm "cách đọc cũ" và "cách đọc mới" TRƯỚC khi đánh giá bất kỳ phương án nào. Tiêu chí không phải là đúng hay sai, mà là VỊ TRÍ trong lập luận.',
  },
  {
    id: 'sol_inf_1', skill: 'inferences', section: 'rw', band: 'hard', seconds: 70,
    stimulus:
      'Among the reef fish surveyed, species that clean parasites from larger fish were found at every site where the larger species were present, and at no site where they were absent. Cleaner species were also absent from three sites where the larger species were present but where the water was too turbid for the cleaners’ signalling displays to be visible. Therefore the presence of host species ______',
    prompt: 'Which choice most logically completes the text?',
    choices: [
      { id: 'A', text: 'is necessary but not sufficient for cleaner species to be established.' },
      { id: 'B', text: 'is sufficient but not necessary for cleaner species to be established.' },
      { id: 'C', text: 'has no bearing on whether cleaner species become established.' },
      { id: 'D', text: 'determines the turbidity of the water at a given site.' },
    ],
    answer: 'A',
    read: 'Two facts and a "therefore". The first sentence gives a perfect correlation; the second gives three exceptions in one direction only. Exceptions that run in one direction are what distinguish necessary from sufficient, and the options are written in exactly that vocabulary — which is the test telling you what it is testing.',
    readVi: 'Hai dữ kiện và một chữ "vì vậy". Câu đầu cho một tương quan hoàn hảo; câu sau cho ba ngoại lệ, và chỉ lệch về MỘT PHÍA. Ngoại lệ lệch một phía chính là thứ phân biệt "điều kiện cần" với "điều kiện đủ", và các phương án viết đúng bằng từ vựng đó — tức là đề đang tự nói ra nó kiểm tra cái gì.',
    steps: [
      {
        act: 'Take the two directions separately. No hosts → no cleaners, always. Hosts present → cleaners, except at three sites.',
        actVi: 'Tách hai chiều ra. Không có cá chủ → không có cá dọn, luôn luôn. Có cá chủ → có cá dọn, TRỪ ba điểm.',
        why: 'Necessary and sufficient are claims about different directions, and a single sentence mixing them is unreadable. Separating them turns the question into arithmetic.',
        whyVi: '"Cần" và "đủ" là hai khẳng định về hai CHIỀU khác nhau, và một câu trộn cả hai thì không đọc nổi. Tách ra là biến câu hỏi thành phép tính.',
      },
      {
        act: 'Name each direction. "No hosts, never cleaners" makes hosts necessary. "Hosts present, sometimes no cleaners" makes hosts not sufficient.',
        actVi: 'Gọi tên từng chiều. "Không cá chủ thì không bao giờ có cá dọn" → cá chủ là điều kiện CẦN. "Có cá chủ mà đôi khi vẫn không có cá dọn" → cá chủ KHÔNG PHẢI điều kiện ĐỦ.',
        why: 'Once both are named, only one option can be right, and the turbidity sentence is revealed as the thing that supplies the second half.',
        whyVi: 'Khi đã gọi tên được cả hai, chỉ còn đúng một phương án khớp, và câu về độ đục lộ ra chính là thứ cung cấp nửa sau.',
      },
    ],
    wrongTurn: {
      path: 'B is chosen by readers who register the first sentence and treat the second as a detail. The correlation in sentence one is perfect, and a perfect correlation feels like sufficiency: hosts there, cleaners there.',
      pathVi: 'B được chọn bởi người đọc chỉ ghi nhận câu đầu và coi câu sau là chi tiết phụ. Tương quan ở câu một là hoàn hảo, mà tương quan hoàn hảo thì rất giống "điều kiện đủ": có cá chủ ở đâu là có cá dọn ở đó.',
      breaks: 'The three turbid sites are the entire question. They are sites where hosts were present and cleaners were not, which is precisely a counterexample to sufficiency. The passage puts them in a separate sentence because a reader who skims will read that sentence as extra colour, and the item is built on exactly that habit.',
      breaksVi: 'Ba điểm nước đục CHÍNH LÀ toàn bộ câu hỏi. Đó là những nơi có cá chủ mà không có cá dọn — đúng nghĩa một phản ví dụ cho "điều kiện đủ". Bài đặt chúng vào một câu riêng vì người đọc lướt sẽ coi câu đó là chi tiết tô điểm, và câu hỏi được dựng đúng trên thói quen ấy.',
    },
    transfer: 'When options use "necessary" and "sufficient", the passage will contain a one-directional exception somewhere and it will not be in the sentence that states the pattern. Find it before choosing.',
    transferVi: 'Khi phương án dùng chữ "cần" và "đủ", trong bài chắc chắn có một ngoại lệ lệch một chiều ở đâu đó, và nó KHÔNG nằm trong câu phát biểu quy luật. Tìm ra nó rồi hãy chọn.',
  },
  {
    id: 'sol_cet_1', skill: 'command-evidence-textual', section: 'rw', band: 'hard', seconds: 80,
    stimulus:
      'A researcher claims that the anonymous 1719 pamphlet was written by Mary Astell, on the grounds that its argument closely follows Astell’s known positions. A colleague objects that following someone’s positions is what a follower does, and proposes a test: Astell’s undisputed works use the semicolon at roughly four times the rate of her contemporaries, a habit her imitators did not share.',
    prompt: 'Which finding, if true, would most directly support the researcher’s claim?',
    choices: [
      { id: 'A', text: 'The pamphlet’s argument is closer to Astell’s than to that of any other writer of the period.' },
      { id: 'B', text: 'The pamphlet uses the semicolon at approximately the rate found in Astell’s undisputed works.' },
      { id: 'C', text: 'Several writers of the period are known to have imitated Astell’s style deliberately.' },
      { id: 'D', text: 'The pamphlet was printed by the firm that printed two of Astell’s acknowledged works.' },
    ],
    answer: 'B',
    read: 'The colleague has already told you what a good test looks like, and the item is asking whether you noticed. The objection is not "the claim is wrong" but "this evidence cannot distinguish Astell from an imitator" — so the supporting finding must be one an imitator would fail.',
    readVi: 'Người đồng nghiệp đã nói sẵn thế nào là một phép thử tốt, và câu hỏi đang kiểm tra xem bạn có để ý không. Phản bác không phải "khẳng định này sai" mà là "bằng chứng này không phân biệt được Astell với người bắt chước" — nên phát hiện có sức ủng hộ phải là thứ mà người bắt chước KHÔNG làm được.',
    steps: [
      {
        act: 'Write down what the objection actually says: the evidence so far cannot separate Astell from a follower.',
        actVi: 'Viết ra đúng điều phản bác nói: bằng chứng hiện có không tách được Astell với một người theo trường phái bà.',
        why: 'A support question after an objection is asking you to answer the objection, not to add weight to the original claim. Adding more of the same evidence supports nothing, because the objection was about the kind of evidence.',
        whyVi: 'Câu hỏi "ủng hộ" đặt SAU một phản bác là yêu cầu bạn TRẢ LỜI phản bác đó, không phải chất thêm cho khẳng định ban đầu. Thêm bằng chứng cùng loại thì không ủng hộ được gì, vì phản bác nhắm vào LOẠI bằng chứng.',
      },
      {
        act: 'Ask of each option: could an imitator produce this? If yes, it cannot support.',
        actVi: 'Hỏi từng phương án: một người bắt chước có thể tạo ra điều này không? Nếu CÓ, phương án đó không ủng hộ được.',
        why: 'The colleague supplied the discriminating trait explicitly — a punctuation habit imitators did not share. The test is whether the finding turns on something imitable.',
        whyVi: 'Người đồng nghiệp đã nêu thẳng đặc điểm phân biệt — một thói quen dấu câu mà người bắt chước không có. Tiêu chí là phát hiện đó có dựa trên thứ BẮT CHƯỚC ĐƯỢC hay không.',
      },
    ],
    wrongTurn: {
      path: 'A looks like a strengthened version of the researcher’s own argument, and strengthening the argument is what a support question usually asks for. It also sounds more rigorous than the original — "closer than any other writer" is a real comparative claim.',
      pathVi: 'A trông như bản mạnh hơn của chính lập luận nhà nghiên cứu, mà "làm mạnh thêm lập luận" thường đúng là điều câu hỏi ủng hộ yêu cầu. Nó cũng nghe chặt chẽ hơn bản gốc — "gần hơn bất kỳ tác giả nào khác" là một so sánh có thật.',
      breaks: 'A is the objection’s own target, made larger. A devoted imitator would produce exactly this result — closeness of argument is precisely what imitation reproduces. Strengthening evidence that has already been shown not to discriminate leaves the claim exactly where it was, and the item counts on the reflex to strengthen rather than to answer.',
      breaksVi: 'A chính là thứ phản bác đang nhắm tới, chỉ phóng to lên. Một người bắt chước tận tuỵ sẽ tạo ra đúng kết quả này — sự gần gũi về lập luận chính là thứ mà việc bắt chước tái tạo. Làm mạnh thêm một loại bằng chứng vốn đã bị chỉ ra là không phân biệt được thì khẳng định vẫn đứng nguyên chỗ cũ, và câu hỏi trông cậy vào phản xạ "làm mạnh thêm" thay vì "trả lời phản bác".',
    },
    transfer: 'Whenever a passage contains an objection, the evidence question is about the objection. Read the objection as a specification for the answer: it tells you what the right finding must be able to rule out.',
    transferVi: 'Hễ trong bài có một phản bác thì câu hỏi bằng chứng là về CHÍNH PHẢN BÁC ĐÓ. Hãy đọc phản bác như bản đặc tả cho đáp án: nó cho biết phát hiện đúng phải LOẠI TRỪ được điều gì.',
  },
  {
    id: 'sol_ceq_1', skill: 'command-evidence-quantitative', section: 'rw', band: 'hard', seconds: 85,
    stimulus:
      'A survey of four districts recorded the share of households with a piped water connection in 2010 and again in 2020. District A rose from 22% to 44%; District B from 61% to 72%; District C from 8% to 24%; District D from 80% to 84%. A report states that the programme was most effective where it was most needed.',
    prompt: 'Which choice best uses data from the survey to support the report’s statement?',
    choices: [
      { id: 'A', text: 'District D, which began with the highest coverage, gained the fewest percentage points.' },
      { id: 'B', text: 'District C, which began with the lowest coverage, tripled its coverage, while District D, which began with the highest, rose by one twentieth.' },
      { id: 'C', text: 'District A doubled its coverage, the largest proportional gain of the four districts.' },
      { id: 'D', text: 'Districts A and C together account for more than half of the total percentage-point increase.' },
    ],
    answer: 'B',
    read: 'The claim has two halves — "most effective" and "where most needed" — and a supporting choice has to carry both. Need is where coverage was low; effectiveness at very different starting points is a proportional question, not a percentage-point one. So the answer will compare the lowest-start district with the highest-start district, in proportions.',
    readVi: 'Khẳng định có HAI nửa — "hiệu quả nhất" và "ở nơi cần nhất" — nên phương án ủng hộ phải gánh được cả hai. "Cần" là nơi độ phủ thấp; còn "hiệu quả" khi điểm xuất phát chênh nhau rất xa là câu chuyện TỈ LỆ, không phải điểm phần trăm. Vậy đáp án sẽ so sánh quận xuất phát thấp nhất với quận xuất phát cao nhất, theo tỉ lệ.',
    steps: [
      {
        act: 'Convert to proportional change before comparing anything: C ×3, A ×2, B ×1.18, D ×1.05.',
        actVi: 'Đổi sang mức thay đổi theo TỈ LỆ trước khi so sánh bất cứ gì: C ×3, A ×2, B ×1,18, D ×1,05.',
        why: 'Twenty-two points added to 22% and twenty-two points added to 80% are not the same achievement, and a percentage-point comparison silently treats them as one.',
        whyVi: 'Cộng 22 điểm vào mức 22% và cộng 22 điểm vào mức 80% không phải là cùng một thành tựu, mà so sánh theo điểm phần trăm thì lặng lẽ coi hai việc đó như nhau.',
      },
      {
        act: 'Require the option to pair the neediest district with a contrast, not to report one district alone.',
        actVi: 'Yêu cầu phương án phải GHÉP quận cần nhất với một đối chứng, chứ không nêu một quận đơn lẻ.',
        why: '"Most effective where most needed" is a comparison between need levels. One district on its own establishes a rise, not a relationship between need and effect.',
        whyVi: '"Hiệu quả nhất ở nơi cần nhất" là một SO SÁNH giữa các mức độ cần. Một quận đứng một mình chỉ chứng minh có tăng, không chứng minh được quan hệ giữa mức cần và hiệu quả.',
      },
    ],
    wrongTurn: {
      path: 'C is arithmetically true and sounds like the right kind of statement — it uses a proportional measure, which is the sophisticated move, and District A did double.',
      pathVi: 'C đúng về số học và nghe đúng kiểu — nó dùng thước đo tỉ lệ, tức là nước đi "cao tay", và quận A đúng là tăng gấp đôi.',
      breaks: 'It breaks on the superlative. A doubled; C tripled. "The largest proportional gain of the four" is simply false, and it is false in a way that survives a quick check because a reader who has just done the proportional conversion feels rewarded for it and stops. The option is built for a candidate who does the right analysis and then does not finish it.',
      breaksVi: 'Nó hỏng ở chữ "nhất". A gấp đôi; C gấp ba. "Mức tăng theo tỉ lệ lớn nhất trong bốn quận" đơn giản là SAI, và cái sai đó sống sót qua một lần kiểm nhanh vì người đọc vừa đổi sang tỉ lệ xong thấy mình làm đúng hướng nên dừng lại luôn. Phương án này dựng riêng cho thí sinh phân tích đúng nhưng KHÔNG LÀM NỐT.',
    },
    transfer: 'Every superlative in a data option is a claim you must check against all four rows, not against the one you were looking at. And when starting points differ widely, convert to proportions before you compare — then finish the comparison.',
    transferVi: 'Mọi từ so sánh nhất trong phương án dữ liệu là một khẳng định phải kiểm với CẢ BỐN dòng, không phải với dòng bạn đang nhìn. Và khi các điểm xuất phát chênh nhau nhiều, hãy đổi sang tỉ lệ trước khi so sánh — rồi SO SÁNH CHO HẾT.',
  },
  {
    id: 'sol_wc_1', skill: 'words-in-context', section: 'rw', band: 'hard', seconds: 55,
    stimulus:
      'The committee’s report is careful to the point of opacity. Where the evidence supports a conclusion it says so; where it does not, the report does not say the opposite but instead ______ the claim until what remains is a sentence nobody could disagree with and nobody could act on.',
    prompt: 'Which choice completes the text with the most logical and precise word?',
    choices: [
      { id: 'A', text: 'qualifies' },
      { id: 'B', text: 'refutes' },
      { id: 'C', text: 'reiterates' },
      { id: 'D', text: 'obscures' },
    ],
    answer: 'A',
    read: 'The sentence supplies its own definition: "does not say the opposite but instead ___ until what remains is undisputable and useless". That is a description of narrowing a claim by adding conditions — and the clause "does not say the opposite" has already excluded contradiction before you reach the options.',
    readVi: 'Câu văn tự cung cấp định nghĩa của nó: "không nói ngược lại mà thay vào đó ___ cho tới khi phần còn lại không ai phản đối được và cũng không ai làm gì được". Đó là mô tả việc THU HẸP một khẳng định bằng cách thêm điều kiện — và mệnh đề "không nói ngược lại" đã loại bỏ nghĩa phủ định TRƯỚC KHI bạn tới các phương án.',
    steps: [
      {
        act: 'Extract the constraint before reading the options: the word must weaken without contradicting, and must leave something behind.',
        actVi: 'Rút ra ràng buộc trước khi đọc phương án: từ cần tìm phải LÀM YẾU mà KHÔNG phủ định, và phải CÒN LẠI thứ gì đó.',
        why: 'Reading the options first turns the item into a vocabulary quiz. Reading the constraint first turns it into a matching problem with one solution.',
        whyVi: 'Đọc phương án trước biến câu này thành bài kiểm tra từ vựng. Rút ràng buộc trước biến nó thành bài ghép có đúng một lời giải.',
      },
      {
        act: 'Test each candidate against both halves of the constraint, not against the general feel of the sentence.',
        actVi: 'Thử từng phương án với CẢ HAI nửa của ràng buộc, không phải với cảm giác chung của câu.',
        why: 'Two options weaken and two do not; of the two that weaken, only one leaves a residue that could be described as a sentence.',
        whyVi: 'Hai phương án làm yếu và hai thì không; trong hai cái làm yếu, chỉ một cái để lại phần dư có thể gọi là "một câu văn".',
      },
    ],
    wrongTurn: {
      path: 'D is chosen because the paragraph opens with "careful to the point of opacity", and obscure is the adjective form of that noun. The echo is deliberate and it feels like the text pointing at its own answer.',
      pathVi: 'D được chọn vì đoạn mở đầu bằng "cẩn trọng đến mức tối nghĩa", và "obscure" chính là dạng tính từ của danh từ đó. Sự cộng hưởng ấy là cố ý và nó tạo cảm giác bài đang tự chỉ ra đáp án.',
      breaks: 'Obscuring hides a claim; the sentence describes a claim still visible and now merely toothless — "a sentence nobody could disagree with" is a claim you can read perfectly well. The echo is the trap: the item places a related word in the previous sentence precisely so that a reader matching by association stops there. Association is not the constraint.',
      breaksVi: '"Obscure" là che khuất một khẳng định; còn câu này mô tả một khẳng định VẪN NHÌN THẤY, chỉ là đã cùn hết răng — "một câu không ai phản đối được" là một câu bạn đọc hiểu hoàn toàn. Chính sự cộng hưởng là cái bẫy: đề cố tình đặt một từ cùng họ ở câu trước để người đọc ghép theo liên tưởng sẽ dừng ngay tại đó. Liên tưởng KHÔNG PHẢI ràng buộc.',
    },
    transfer: 'When a word earlier in the passage shares a root with one of the options, treat that option as under suspicion rather than as confirmed. The test builds that echo on purpose.',
    transferVi: 'Khi một từ ở phía trước bài có cùng gốc với một phương án, hãy coi phương án đó là ĐÁNG NGHI chứ không phải đã được xác nhận. Đề dựng sự cộng hưởng đó một cách có chủ ý.',
  },
  {
    id: 'sol_tsp_1', skill: 'text-structure-purpose', section: 'rw', band: 'hard', seconds: 65,
    stimulus:
      'Nguyen begins by setting out the standard account of the 1873 collapse in three paragraphs of unusual sympathy, reconstructing the reasoning of the bankers involved and conceding that on the information available their decisions were defensible. Only in the fourth paragraph does she introduce the correspondence showing that the information available to them included the warning they later said they never received.',
    prompt: 'Which choice best describes the function of the first three paragraphs in the text as a whole?',
    choices: [
      { id: 'A', text: 'They provide historical background that the fourth paragraph then extends.' },
      { id: 'B', text: 'They present the position as strongly as possible so that the evidence introduced afterwards cannot be dismissed as a straw man.' },
      { id: 'C', text: 'They establish Nguyen’s sympathy with the bankers before she criticises their conduct.' },
      { id: 'D', text: 'They summarise the sources on which the standard account of the collapse depends.' },
    ],
    answer: 'B',
    read: 'The passage tells you the sympathy is "unusual" and that the reversal is withheld until the fourth paragraph. Both are structural signals: an author who steel-mans a position and then delays her evidence is doing it for a reason, and function questions ask for the reason rather than the description.',
    readVi: 'Bài nói thẳng rằng sự cảm thông đó là "bất thường" và rằng cú lật được GIỮ LẠI tới tận đoạn bốn. Cả hai đều là tín hiệu cấu trúc: tác giả dựng đối phương ở dạng mạnh nhất rồi mới hoãn bằng chứng lại là làm VÌ MỘT LÝ DO, và câu hỏi chức năng hỏi cái lý do đó chứ không hỏi mô tả.',
    steps: [
      {
        act: 'Ask what would be lost if the first three paragraphs were cut and the correspondence presented straight away.',
        actVi: 'Hỏi: nếu cắt ba đoạn đầu và đưa thẳng phần thư từ ra thì MẤT gì?',
        why: 'Function is what a part does for the whole, and the fastest way to find that is to remove the part. Here what is lost is the reader’s inability to say "she never took the other side seriously".',
        whyVi: 'Chức năng là việc một phần LÀM ĐƯỢC GÌ cho toàn thể, và cách nhanh nhất để thấy điều đó là BỎ phần ấy đi. Ở đây, cái mất đi là việc người đọc không còn nói được câu "bà ấy có bao giờ xem trọng phía kia đâu".',
      },
      {
        act: 'Distinguish description from purpose: every option describes the paragraphs accurately; only one says what they are for.',
        actVi: 'Phân biệt MÔ TẢ với MỤC ĐÍCH: mọi phương án đều mô tả ba đoạn đó chính xác; chỉ một phương án nói chúng ĐỂ LÀM GÌ.',
        why: 'Function questions are lost by choosing the truest description rather than the operative one. All four are true; only one is a function.',
        whyVi: 'Câu hỏi chức năng bị mất điểm vì người ta chọn phương án MÔ TẢ ĐÚNG NHẤT thay vì phương án nói đúng VAI TRÒ. Cả bốn đều đúng; chỉ một là chức năng.',
      },
    ],
    wrongTurn: {
      path: 'C is very nearly right and is the most common answer. The paragraphs do establish sympathy, the sympathy is real, and the criticism does follow.',
      pathVi: 'C gần đúng đến mức đáng ngại và là đáp án bị chọn nhiều nhất. Ba đoạn đó đúng là thiết lập sự cảm thông, sự cảm thông đó là thật, và phần phê phán đúng là theo sau.',
      breaks: 'C describes the sequence and stops. It says what happens, not what the arrangement achieves — and what it achieves is argumentative: having granted the bankers their best case, Nguyen makes the correspondence impossible to wave away. C would be equally true of an author who was simply being polite before turning nasty, which is a different structure with a different purpose.',
      breaksVi: 'C mô tả TRÌNH TỰ rồi dừng lại. Nó nói chuyện gì xảy ra, chứ không nói cách sắp xếp đó ĐẠT ĐƯỢC GÌ — mà cái đạt được ở đây thuộc về lập luận: khi đã nhường cho phía ngân hàng lập luận tốt nhất của họ, Nguyen khiến phần thư từ không thể bị gạt đi. C cũng đúng y như vậy với một tác giả chỉ đơn giản là lịch sự trước khi trở mặt — một cấu trúc khác với một mục đích khác.',
    },
    transfer: 'On a function question, the correct option almost always contains a word of purpose — "so that", "in order to", "which allows". A description with no such word is usually the decoy, however accurate it is.',
    transferVi: 'Ở câu hỏi chức năng, phương án đúng gần như luôn chứa một từ chỉ MỤC ĐÍCH — "để", "nhằm", "khiến cho". Một phương án mô tả mà không có từ như vậy thường là mồi nhử, dù nó chính xác đến đâu.',
  },
  {
    id: 'sol_ctc_1', skill: 'cross-text-connections', section: 'rw', band: 'hard', seconds: 80,
    stimulus:
      'Text 1: Economist Duong argues that the minimum-wage rise had no measurable effect on employment, citing a study of fast-food outlets either side of a provincial border in which employment moved identically on both sides.\n\nText 2: Economist Bakare accepts the border study and its result. He notes, however, that outlets on both sides drew staff from the same labour market and that the chains operating them set staffing centrally for the whole region. A comparison, he writes, requires that the two sides could in principle have differed.',
    prompt: 'Based on the texts, how would Bakare most likely respond to Duong’s conclusion?',
    choices: [
      { id: 'A', text: 'By disputing the employment figures the border study reports.' },
      { id: 'B', text: 'By arguing that the study’s two sides were not independent enough for the comparison to detect an effect had one existed.' },
      { id: 'C', text: 'By agreeing that the minimum-wage rise had no effect on employment in that province.' },
      { id: 'D', text: 'By pointing out that both economists are concerned with the effects of wage regulation.' },
    ],
    answer: 'B',
    read: 'Bakare opens by conceding the result, which means his objection is not to the number. The last sentence is a definition of what a comparison requires, and an author who supplies a definition is about to say the case in front of him fails it.',
    readVi: 'Bakare mở đầu bằng việc THỪA NHẬN kết quả, nghĩa là ông không phản đối con số. Câu cuối là một định nghĩa về điều kiện để có một phép so sánh, và tác giả nào đưa ra một định nghĩa thì sắp nói rằng trường hợp trước mặt KHÔNG ĐẠT định nghĩa đó.',
    steps: [
      {
        act: 'Separate what Bakare grants from what he objects to. He grants the study and the number; he objects to the inference.',
        actVi: 'Tách cái Bakare CHẤP NHẬN khỏi cái ông PHẢN ĐỐI. Ông chấp nhận nghiên cứu và con số; ông phản đối SUY LUẬN rút ra từ đó.',
        why: 'Cross-text items are decided by locating the exact point of disagreement, and an author who concedes generously has narrowed it for you.',
        whyVi: 'Câu hỏi liên văn bản được quyết định bằng việc định vị ĐÚNG điểm bất đồng, và tác giả nào nhượng bộ rộng rãi là đã thu hẹp nó sẵn cho bạn.',
      },
      {
        act: 'Restate his objection as a property of the design: if the two sides could not have differed, finding no difference tells you nothing.',
        actVi: 'Phát biểu lại phản bác của ông như một đặc tính của THIẾT KẾ: nếu hai bên vốn không thể khác nhau, thì việc không tìm ra khác biệt chẳng nói lên điều gì.',
        why: 'That restatement is the answer, and it also explains why "no effect found" and "no effect exists" are different claims — which is the distinction the item is built on.',
        whyVi: 'Chính cách phát biểu lại đó là đáp án, và nó cũng giải thích vì sao "không tìm thấy tác động" và "không có tác động" là hai khẳng định khác nhau — đúng cái phân biệt mà câu hỏi được dựng trên.',
      },
    ],
    wrongTurn: {
      path: 'C is chosen because Bakare genuinely does accept the study and its result, and the text says so in its second sentence. Accepting the result looks like agreeing with the conclusion drawn from it.',
      pathVi: 'C được chọn vì Bakare thật sự chấp nhận nghiên cứu và kết quả của nó, và bài nói thẳng điều đó ở câu thứ hai. Chấp nhận KẾT QUẢ trông rất giống đồng tình với KẾT LUẬN rút ra từ nó.',
      breaks: 'Accepting a finding and accepting the conclusion drawn from it are different acts, and the whole of Text 2 exists to separate them. Bakare’s position is that the study could not have detected an effect even if one were there — which is compatible with an effect existing. C converts "the test was uninformative" into "the answer is no", which is the same error as reading an inconclusive trial as a negative one.',
      breaksVi: 'Chấp nhận một PHÁT HIỆN và chấp nhận KẾT LUẬN rút ra từ nó là hai việc khác nhau, và toàn bộ Văn bản 2 tồn tại để tách hai việc đó. Quan điểm của Bakare là nghiên cứu ấy KHÔNG THỂ phát hiện ra tác động dù tác động có tồn tại — điều này hoàn toàn tương thích với việc tác động CÓ tồn tại. Phương án C biến "phép thử không cho biết gì" thành "câu trả lời là không", đúng kiểu sai lầm khi đọc một thử nghiệm chưa ngã ngũ thành một kết quả âm tính.',
    },
    transfer: 'An author who concedes the data and objects to the design is never agreeing with the conclusion. "No effect found" and "no effect" are separate claims, and the gap between them is where most cross-text hard items live.',
    transferVi: 'Tác giả nào nhượng bộ về DỮ LIỆU và phản đối về THIẾT KẾ thì không bao giờ đồng tình với kết luận. "Không tìm thấy tác động" và "không có tác động" là hai khẳng định riêng, và khoảng cách giữa chúng là nơi phần lớn câu liên văn bản band khó ẩn mình.',
  },
  {
    id: 'sol_rs_1', skill: 'rhetorical-synthesis', section: 'rw', band: 'hard', seconds: 70,
    stimulus:
      'Notes:\n• The Cham tower at Po Klong Garai was built of fired brick without visible mortar.\n• Analysis found a plant resin in the joints.\n• The resin comes from the Dipterocarpus tree, common in the region.\n• Modern restorations using cement mortar have cracked within two decades.\n• Restorations using a reconstructed resin binder have held for thirty years.\n\nThe student wants to explain why the original building method has proved more durable than modern repairs.',
    prompt: 'Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    choices: [
      { id: 'A', text: 'The tower at Po Klong Garai was built of fired brick with joints bound by a resin from the locally common Dipterocarpus tree.' },
      { id: 'B', text: 'Restorations of the tower using cement mortar cracked within twenty years, whereas those using a reconstructed Dipterocarpus resin binder have lasted thirty.' },
      { id: 'C', text: 'Because the original builders bound the brick with Dipterocarpus resin rather than cement, their joints have outlasted modern cement repairs by decades.' },
      { id: 'D', text: 'Although the tower appears to have been built without mortar, analysis of the joints found a plant resin.' },
    ],
    answer: 'C',
    read: 'The goal contains the word "why". Every option here is faithful to the notes — that is the format — so the only question is which one performs an explanation rather than a report. An explanation needs both terms and a link between them.',
    readVi: 'Mục tiêu chứa chữ "VÌ SAO". Mọi phương án ở đây đều trung thành với ghi chú — đó là đặc trưng của dạng bài — nên câu hỏi duy nhất là phương án nào THỰC HIỆN một lời giải thích thay vì một bản tường thuật. Giải thích cần cả hai vế và một MỐI NỐI giữa chúng.',
    steps: [
      {
        act: 'Read the goal as a specification and write down what it demands: cause, effect, and a connective.',
        actVi: 'Đọc mục tiêu như một bản đặc tả và viết ra nó đòi hỏi gì: NGUYÊN NHÂN, KẾT QUẢ, và một TỪ NỐI.',
        why: 'Synthesis items are lost by evaluating the sentences and won by evaluating the goal. Once the goal is a checklist, three options fail it visibly.',
        whyVi: 'Câu tổng hợp bị mất điểm vì người ta đi đánh giá các CÂU, và được điểm khi đánh giá cái MỤC TIÊU. Khi mục tiêu đã thành một danh sách kiểm, ba phương án rớt ngay trước mắt.',
      },
      {
        act: 'Mark which notes each option uses. The goal is comparative, so a single-side option cannot satisfy it however accurate.',
        actVi: 'Đánh dấu mỗi phương án dùng những ghi chú nào. Mục tiêu mang tính SO SÁNH, nên phương án chỉ nói một phía thì không đáp ứng được, dù chính xác đến mấy.',
        why: 'Two options describe only the original construction and one describes only the restorations. Only one holds both and states the relation.',
        whyVi: 'Hai phương án chỉ tả cách xây gốc, một phương án chỉ tả các lần trùng tu. Chỉ một phương án giữ được cả hai và phát biểu MỐI QUAN HỆ.',
      },
    ],
    wrongTurn: {
      path: 'B is the strongest decoy because it does contain both sides and both numbers. It reads as a careful, evidence-based sentence, and it is one.',
      pathVi: 'B là mồi nhử mạnh nhất vì nó có CẢ HAI phía và cả hai con số. Nó đọc lên như một câu cẩn trọng, có bằng chứng — và đúng là như vậy.',
      breaks: 'B reports the contrast and never explains it. It says cement cracked and resin held; it does not say that the resin is what the original builders used, so nothing in it addresses "the original building method". A reader who checks only that both sides are present accepts it. The goal asked why the original method is more durable, and B leaves the original method out.',
      breaksVi: 'B TƯỜNG THUẬT sự tương phản mà không hề giải thích nó. Nó nói xi măng nứt và nhựa cây bền; nó không nói rằng nhựa cây chính là thứ những người thợ xưa đã dùng, nên trong đó chẳng có gì chạm tới "phương pháp xây dựng gốc". Người đọc chỉ kiểm xem có đủ hai phía hay không sẽ chấp nhận nó. Mục tiêu hỏi VÌ SAO phương pháp gốc bền hơn, mà B lại bỏ mất phương pháp gốc.',
    },
    transfer: 'Circle the verb in the goal. "Explain why" needs a because; "compare" needs a whereas; "emphasise" needs the emphasised thing in the main clause. The verb tells you the grammatical shape of the answer before you read a single option.',
    transferVi: 'Khoanh vào ĐỘNG TỪ trong câu mục tiêu. "Giải thích vì sao" cần một chữ "vì"; "so sánh" cần một chữ "trong khi"; "nhấn mạnh" cần thứ được nhấn nằm ở mệnh đề chính. Động từ cho biết HÌNH DẠNG NGỮ PHÁP của đáp án trước khi bạn đọc bất kỳ phương án nào.',
  },
  {
    id: 'sol_tr_1', skill: 'transitions', section: 'rw', band: 'hard', seconds: 55,
    stimulus:
      'The survey found that households in the highest income quintile reported the fewest hours of unpaid domestic work, and the finding has been read as evidence that wealth buys time. ______ the survey counted only work done by household members, and the highest quintile is also the quintile most likely to employ someone from outside the household.',
    prompt: 'Which choice completes the text with the most logical transition?',
    choices: [
      { id: 'A', text: 'However,' },
      { id: 'B', text: 'Therefore,' },
      { id: 'C', text: 'Similarly,' },
      { id: 'D', text: 'Indeed,' },
    ],
    answer: 'A',
    read: 'The first sentence offers an interpretation; the second supplies a measurement artefact that would produce the same number without the interpretation being true. That is a counter-move, whatever it looks like.',
    readVi: 'Câu đầu đưa ra một cách diễn giải; câu sau cung cấp một hiện tượng giả do cách đo, đủ sức tạo ra chính con số ấy mà cách diễn giải kia vẫn không đúng. Đó là một nước đi PHẢN BÁC, dù nó trông thế nào đi nữa.',
    steps: [
      {
        act: 'Name the relation in your own words before looking: "here is why that reading may be wrong".',
        actVi: 'Gọi tên quan hệ bằng lời của mình trước khi nhìn phương án: "đây là lý do cách đọc kia có thể sai".',
        why: 'Transitions are chosen correctly by naming the relation and incorrectly by reading the gap aloud and picking what sounds smooth. Both wrong options here sound smooth.',
        whyVi: 'Từ nối được chọn ĐÚNG bằng cách gọi tên quan hệ, và chọn SAI bằng cách đọc to chỗ trống rồi lấy cái nào nghe trôi. Cả hai phương án sai ở đây đều nghe rất trôi.',
      },
      {
        act: 'Check the direction: does the second sentence support the reading or undermine it?',
        actVi: 'Kiểm CHIỀU: câu sau ỦNG HỘ cách đọc kia hay LÀM YẾU nó?',
        why: 'The second sentence explains the number without wealth buying anything, which is the definition of undermining an interpretation.',
        whyVi: 'Câu sau giải thích được con số mà không cần "tiền mua được thời gian" — đó chính là định nghĩa của việc làm yếu một cách diễn giải.',
      },
    ],
    wrongTurn: {
      path: 'D is chosen because the second sentence adds a fact that sits comfortably beside the first — richer households do employ outside help, and that feels like elaboration. "Indeed" reads perfectly in the gap.',
      pathVi: 'D được chọn vì câu sau bổ sung một dữ kiện nằm rất êm cạnh câu đầu — hộ giàu đúng là hay thuê người ngoài, và điều đó có cảm giác như đang khai triển thêm. Đặt "Indeed" vào chỗ trống đọc lên rất mượt.',
      breaks: '"Indeed" intensifies the previous claim. Here the second sentence does the opposite: it explains why the previous claim might not hold. The test consistently supplies a fact that is compatible with the first sentence and hostile to its interpretation, because compatibility is what makes the wrong transition feel right. Direction, not comfort, decides.',
      breaksVi: '"Indeed" là LÀM MẠNH THÊM khẳng định trước. Ở đây câu sau làm điều ngược lại: nó giải thích vì sao khẳng định trước có thể không đứng vững. Đề luôn cung cấp một dữ kiện TƯƠNG THÍCH với câu đầu nhưng THÙ ĐỊCH với cách diễn giải của nó, vì chính sự tương thích khiến từ nối sai có cảm giác đúng. Quyết định bằng CHIỀU, không phải bằng độ êm tai.',
    },
    transfer: 'A sentence that supplies an alternative explanation for the same number is always a contrast, never an intensification — even when every fact in it agrees with what came before.',
    transferVi: 'Một câu cung cấp CÁCH GIẢI THÍCH KHÁC cho cùng một con số thì luôn là tương phản, không bao giờ là nhấn mạnh — kể cả khi mọi dữ kiện trong nó đều thuận với câu trước.',
  },
  {
    id: 'sol_bd_1', skill: 'boundaries', section: 'rw', band: 'hard', seconds: 45,
    prompt:
      'Which choice completes the text so that it conforms to the conventions of Standard English?\n\nThe argument that a language with no written tradition cannot sustain a legal system ______ been contradicted by every field study conducted since the 1960s.',
    choices: [
      { id: 'A', text: 'has' },
      { id: 'B', text: ', has' },
      { id: 'C', text: '; has' },
      { id: 'D', text: ' — has' },
    ],
    answer: 'A',
    read: 'Strip the sentence to its skeleton before anything else: "The argument … has been contradicted". Subject, verb. Everything between them is the content of the argument, not a supplement to it.',
    readVi: 'Rút câu về bộ xương trước đã: "Lập luận … đã bị bác bỏ". Chủ ngữ, động từ. Toàn bộ phần ở giữa là NỘI DUNG của lập luận, không phải phần chú thêm cho nó.',
    steps: [
      {
        act: 'Test whether the middle can be removed. "The argument has been contradicted" is grammatical but no longer says which argument.',
        actVi: 'Thử xem phần giữa có bỏ được không. "Lập luận đã bị bác bỏ" đúng ngữ pháp nhưng không còn cho biết LẬP LUẬN NÀO.',
        why: 'A supplement can be lifted out and leave the sentence intact in meaning. A that-clause naming the content of a noun cannot, which is what makes it essential and unpunctuated.',
        whyVi: 'Phần chú thêm nhấc ra được mà câu vẫn nguyên nghĩa. Còn mệnh đề "that" nêu NỘI DUNG của một danh từ thì không — chính vì thế nó là thành phần thiết yếu và không được ngăn bằng dấu.',
      },
      {
        act: 'Confirm that nothing at all may stand between a subject and its verb.',
        actVi: 'Xác nhận: không có gì được phép đứng chen giữa chủ ngữ và động từ của nó.',
        why: 'Once the middle is essential, all three punctuated options fall together — they differ only in which mark commits the error.',
        whyVi: 'Khi phần giữa đã là thiết yếu thì cả ba phương án có dấu cùng rớt một lượt — chúng chỉ khác nhau ở chỗ dùng dấu nào để phạm cùng một lỗi.',
      },
    ],
    wrongTurn: {
      path: 'B is chosen by ear. The subject runs to fourteen words and a reader saying it aloud wants to breathe before the verb, exactly where the comma sits.',
      pathVi: 'B được chọn bằng TAI. Chủ ngữ dài tới mười bốn chữ, và người đọc thầm thành tiếng sẽ muốn lấy hơi trước động từ — đúng ngay chỗ dấu phẩy đứng.',
      breaks: 'A comma is not a pause; it is a structural mark. The urge to breathe is the item’s mechanism, not a signal — hard boundary items are built by making the subject long enough that a reader stops. Length never licenses a comma between a subject and its verb.',
      breaksVi: 'Dấu phẩy KHÔNG PHẢI chỗ nghỉ hơi; nó là một dấu hiệu cấu trúc. Cảm giác muốn lấy hơi chính là CƠ CHẾ của câu hỏi, không phải tín hiệu — câu boundaries band khó được dựng bằng cách kéo chủ ngữ dài ra đủ để người đọc phải dừng. Độ dài không bao giờ cho phép đặt dấu phẩy giữa chủ ngữ và động từ.',
    },
    transfer: 'On every boundaries item, delete the middle and read the skeleton. If the remainder still names what the sentence is about, the middle was a supplement; if it does not, the middle is essential and takes no punctuation.',
    transferVi: 'Với mọi câu boundaries, hãy XOÁ phần giữa và đọc bộ xương. Nếu phần còn lại vẫn nêu được câu đang nói về cái gì thì phần giữa là chú thêm; nếu không thì phần giữa là thiết yếu và không dùng dấu.',
  },
  {
    id: 'sol_fs_1', skill: 'form-structure-sense', section: 'rw', band: 'hard', seconds: 50,
    prompt:
      'Which choice completes the text so that it conforms to the conventions of Standard English?\n\nThe usefulness of the technique depends less on the sensitivity of the detector than on ______ the sample at a temperature the reaction cannot reach on its own.',
    choices: [
      { id: 'A', text: 'holding' },
      { id: 'B', text: 'to hold' },
      { id: 'C', text: 'it holds' },
      { id: 'D', text: 'held' },
    ],
    answer: 'A',
    read: 'The construction is "depends less on X than on Y". Both X and Y are objects of the same preposition, so whatever fills the blank must be the same kind of thing as "the sensitivity of the detector" — a noun phrase.',
    readVi: 'Cấu trúc là "phụ thuộc ít vào X hơn là vào Y". Cả X và Y đều là tân ngữ của CÙNG một giới từ, nên thứ điền vào chỗ trống phải cùng LOẠI với "độ nhạy của đầu dò" — tức là một cụm danh từ.',
    steps: [
      {
        act: 'Find the first half of the comparison and name its grammatical type: "the sensitivity of the detector" is a noun phrase after "on".',
        actVi: 'Tìm nửa đầu của phép so sánh và gọi tên loại ngữ pháp của nó: "độ nhạy của đầu dò" là một cụm danh từ đứng sau "on".',
        why: 'A comparison sets a template. The second half is not being chosen freely; it is being matched, and the match is grammatical before it is anything else.',
        whyVi: 'Một phép so sánh đặt ra một KHUÔN. Nửa sau không được chọn tự do; nó phải KHỚP, và trước hết là khớp về ngữ pháp.',
      },
      {
        act: 'Test each option as the object of "on". Only a gerund survives.',
        actVi: 'Thử từng phương án ở vị trí tân ngữ của "on". Chỉ danh động từ sống sót.',
        why: 'An infinitive cannot be a prepositional object here; a finite clause cannot follow "on" in this construction; a bare participle has no subject to attach to.',
        whyVi: 'Động từ nguyên mẫu không làm tân ngữ giới từ ở đây; một mệnh đề có ngôi không đi sau "on" trong cấu trúc này; còn phân từ trần thì không có chủ thể để bám vào.',
      },
    ],
    wrongTurn: {
      path: 'B is chosen because "to hold" reads as the purpose of the technique, and purpose is what the sentence seems to be about — the technique exists in order to hold the sample at that temperature.',
      pathVi: 'B được chọn vì "to hold" đọc lên như MỤC ĐÍCH của kỹ thuật, mà câu này có vẻ đúng là đang nói về mục đích — kỹ thuật tồn tại để giữ mẫu ở nhiệt độ đó.',
      breaks: 'The blank is not in a purpose slot; it is in the second arm of "less on … than on". The preposition governs it, and prepositions take noun phrases. Reading for meaning rather than for structure is what makes B attractive, and hard form-structure items are built by supplying a meaning that pulls one way while the syntax requires the other.',
      breaksVi: 'Chỗ trống KHÔNG nằm ở vị trí chỉ mục đích; nó nằm ở vế thứ hai của "ít vào … hơn là vào". Giới từ chi phối nó, mà giới từ thì đi với cụm danh từ. Đọc theo NGHĨA thay vì theo CẤU TRÚC là điều khiến B hấp dẫn, và câu form-structure band khó được dựng bằng cách đưa ra một tầng nghĩa kéo về một phía trong khi cú pháp đòi phía kia.',
    },
    transfer: 'In any "less X than Y" or "not X but Y" frame, find X and match its grammatical type. The comparison, not the meaning, chooses the form.',
    transferVi: 'Trong mọi khung "ít X hơn Y" hay "không phải X mà là Y", hãy tìm X và KHỚP loại ngữ pháp của nó. Chính phép so sánh, chứ không phải nghĩa, quyết định hình thức của từ.',
  },
];
