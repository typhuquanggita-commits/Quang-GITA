/**
 * Topic data: how to recognise a question, and when a topic is secure.
 *
 * The lesson library teaches a skill. This file adds the two things a learner
 * needs around a lesson to work through a topic properly rather than merely
 * read about it.
 *
 * `types` is the đọc-vị sheet: the forms a question of this skill actually
 * takes, and the signal in the stem that identifies each one. Recognition is
 * the step most preparation skips. A student who knows every method and cannot
 * tell which question is in front of them will pick the wrong method quickly
 * and confidently, which is worse than picking slowly.
 *
 * `secure` is the consolidation checklist: what has to be true before a topic
 * can be called finished. Stated as observable behaviour rather than feeling,
 * because "I understand transitions" is not a claim anyone can check —
 * including the person making it. Each criterion is something a learner can
 * verify about themselves today.
 *
 * `regression` names how the topic decays once it is left alone, so a learner
 * revisiting it knows what to look for instead of re-reading from the start.
 */

import type { SkillId } from '../types.ts';

export interface QuestionType {
  /** What this form of the question is called, in plain terms. */
  name: string;
  nameVi: string;
  /** The signal in the stem that identifies it. This is the đọc-vị. */
  cue: string;
  cueVi: string;
  /** What to do the moment it is recognised. */
  move: string;
  moveVi: string;
}

export interface Topic {
  skill: SkillId;
  /** The forms this skill's questions take. */
  types: QuestionType[];
  /** Observable criteria for calling the topic secure. */
  secure: string[];
  secureVi: string[];
  /** How the topic decays when it is left alone. */
  regression: string;
  regressionVi: string;
}

/* ================================================================== */
/* Reading and Writing                                                 */
/* ================================================================== */

export const RW_TOPICS: Topic[] = [
  {
    skill: 'central-ideas',
    types: [
      {
        name: 'Main idea of the whole text',
        nameVi: 'Ý chính của toàn đoạn',
        cue: '"Which choice best states the main idea of the text?"',
        cueVi: '"Which choice best states the main idea of the text?"',
        move: 'Find the sentence the rest of the passage exists to support, then pick the choice that paraphrases it without adding anything.',
        moveVi: 'Tìm câu mà cả đoạn tồn tại để chống đỡ, rồi chọn phương án diễn đạt lại đúng câu đó mà không thêm gì.',
      },
      {
        name: 'Function of a specific detail',
        nameVi: 'Vai trò của một chi tiết cụ thể',
        cue: 'The stem quotes or points to one sentence and asks what it does.',
        cueVi: 'Đề trích hoặc chỉ vào một câu và hỏi câu đó làm gì.',
        move: 'Answer the relationship, not the content: the detail illustrates, qualifies, contradicts, or introduces. Name the verb first.',
        moveVi: 'Trả lời quan hệ chứ không phải nội dung: chi tiết đó minh hoạ, giới hạn, phản bác, hay giới thiệu. Gọi tên động từ trước.',
      },
      {
        name: 'Summary that must not overreach',
        nameVi: 'Tóm tắt không được nói quá',
        cue: 'Every option is true of the text; only one covers all of it.',
        cueVi: 'Mọi phương án đều đúng với văn bản; chỉ một phương án bao được toàn bộ.',
        move: 'Eliminate anything that is true of one sentence only. A main idea has to survive the whole passage.',
        moveVi: 'Loại mọi phương án chỉ đúng với một câu. Ý chính phải sống sót qua cả đoạn.',
      },
    ],
    secure: [
      'You can state the main idea of any passage in one sentence before looking at the options.',
      'You can tell a true detail from the main idea without hesitating.',
      'You never choose an option because it contains words from the passage.',
      'On a text you find dull or unfamiliar, your accuracy does not drop.',
    ],
    secureVi: [
      'Bạn nêu được ý chính của bất kỳ đoạn nào trong một câu, trước khi nhìn phương án.',
      'Bạn phân biệt được chi tiết đúng và ý chính mà không phải lưỡng lự.',
      'Bạn không bao giờ chọn phương án chỉ vì nó chứa từ có trong đoạn.',
      'Với đoạn văn khô khan hoặc xa lạ, độ chính xác của bạn không tụt.',
    ],
    regression:
      'The first thing to go is the discipline of forming your own answer before reading the options. Once you start reading options first, word-matching returns immediately.',
    regressionVi:
      'Thứ mất trước tiên là kỷ luật tự trả lời trước khi đọc phương án. Vừa bắt đầu đọc phương án trước, thói quen khớp từ quay lại ngay.',
  },

  {
    skill: 'command-evidence-textual',
    types: [
      {
        name: 'Which quotation supports the claim',
        nameVi: 'Trích dẫn nào ủng hộ luận điểm',
        cue: 'A claim is stated, and the four options are quotations from the text.',
        cueVi: 'Một luận điểm được nêu, và bốn phương án là các trích dẫn từ văn bản.',
        move: 'Read the claim twice and name exactly what would have to be true. Then test each quotation against that, not against the topic.',
        moveVi: 'Đọc luận điểm hai lần và gọi tên chính xác điều gì phải đúng. Rồi thử từng trích dẫn với điều đó, không phải với chủ đề.',
      },
      {
        name: 'Evidence that would weaken or undermine',
        nameVi: 'Bằng chứng làm suy yếu',
        cue: 'The word "weaken", "undermine", or "challenge" appears in the stem.',
        cueVi: 'Trong đề xuất hiện "weaken", "undermine", hoặc "challenge".',
        move: 'Negate the claim first, then look for the option that supports the negation. Hunting directly for a "weakening" option is how the reversed answer gets chosen.',
        moveVi: 'Phủ định luận điểm trước, rồi tìm phương án ủng hộ mệnh đề phủ định. Đi thẳng vào tìm phương án "làm suy yếu" chính là cách chọn nhầm phương án ngược.',
      },
      {
        name: 'Completing a hypothesis or finding',
        nameVi: 'Hoàn thành giả thuyết hoặc kết luận',
        cue: 'The text sets up an experiment or argument and the stem asks what most logically completes it.',
        cueVi: 'Văn bản dựng lên một thí nghiệm hoặc lập luận và đề hỏi điều gì hoàn thành nó hợp logic nhất.',
        move: 'Write the missing sentence yourself in your own words before reading a single option.',
        moveVi: 'Tự viết câu còn thiếu bằng lời của mình trước khi đọc bất kỳ phương án nào.',
      },
    ],
    secure: [
      'You state what the claim requires before you look at any quotation.',
      'On a "weaken" question you negate the claim first, every time, without being reminded.',
      'You reject a quotation that is about the right topic but does not bear on the claim.',
      'You are not slowed down by a quotation written in difficult prose.',
    ],
    secureVi: [
      'Bạn nêu được luận điểm đòi hỏi điều gì trước khi nhìn vào bất kỳ trích dẫn nào.',
      'Với câu "weaken", lần nào bạn cũng phủ định luận điểm trước mà không cần ai nhắc.',
      'Bạn loại được trích dẫn đúng chủ đề nhưng không liên quan tới luận điểm.',
      'Bạn không bị chậm lại vì một trích dẫn viết bằng văn phong khó.',
    ],
    regression:
      'Under time pressure the negation step is the one that gets dropped, and "weaken" questions start reading as "support" questions.',
    regressionVi:
      'Dưới áp lực thời gian, bước phủ định là bước bị bỏ đầu tiên, và câu "weaken" bắt đầu bị đọc thành câu "support".',
  },

  {
    skill: 'command-evidence-quantitative',
    types: [
      {
        name: 'Reading a value off the figure',
        nameVi: 'Đọc một giá trị trên hình',
        cue: 'The stem asks which choice is supported by the graph or table.',
        cueVi: 'Đề hỏi phương án nào được biểu đồ hoặc bảng ủng hộ.',
        move: 'Read the axis labels and units before the data. Most wrong answers here are right numbers under the wrong label.',
        moveVi: 'Đọc nhãn trục và đơn vị trước khi đọc dữ liệu. Phần lớn đáp án sai ở đây là số đúng dưới nhãn sai.',
      },
      {
        name: 'Completing a claim from data',
        nameVi: 'Hoàn thành một nhận định từ dữ liệu',
        cue: 'A sentence in the text trails off and the data must finish it.',
        cueVi: 'Một câu trong văn bản bỏ lửng và dữ liệu phải hoàn thành nó.',
        move: 'Find the comparison the sentence is making, then locate exactly those two values. Do not compute anything else.',
        moveVi: 'Tìm phép so sánh mà câu đó đang thực hiện, rồi định vị đúng hai giá trị đó. Không tính gì thêm.',
      },
      {
        name: 'The choice that goes beyond the data',
        nameVi: 'Phương án vượt quá dữ liệu',
        cue: 'One option states a cause, a prediction, or a trend the figure cannot show.',
        cueVi: 'Một phương án nêu nguyên nhân, dự báo, hoặc xu hướng mà hình không thể cho thấy.',
        move: 'A figure supports only what it plots. If the option needs information not on the axes, it is wrong however sensible it sounds.',
        moveVi: 'Một hình chỉ ủng hộ đúng thứ nó vẽ. Nếu phương án cần thông tin không có trên trục, nó sai dù nghe hợp lý đến đâu.',
      },
    ],
    secure: [
      'You read every axis label and unit before reading a single data point.',
      'You can say what a figure cannot show, not only what it shows.',
      'You reject causal language on a figure that only shows association.',
      'You finish these questions faster than the section average, because there is nothing to interpret.',
    ],
    secureVi: [
      'Bạn đọc hết nhãn trục và đơn vị trước khi đọc bất kỳ điểm dữ liệu nào.',
      'Bạn nói được hình đó không thể cho thấy điều gì, chứ không chỉ nó cho thấy gì.',
      'Bạn loại ngôn ngữ nhân quả trên một hình chỉ thể hiện tương quan.',
      'Bạn làm nhóm câu này nhanh hơn mức trung bình của phần, vì không có gì để diễn giải.',
    ],
    regression:
      'Skipping the axis labels is the failure that comes back first, and it produces confident wrong answers rather than hesitation.',
    regressionVi:
      'Bỏ qua nhãn trục là lỗi quay lại sớm nhất, và nó tạo ra đáp án sai một cách tự tin chứ không phải lưỡng lự.',
  },

  {
    skill: 'inferences',
    types: [
      {
        name: 'Completing the text logically',
        nameVi: 'Hoàn thành văn bản một cách hợp logic',
        cue: 'The passage ends mid-thought and the stem asks what most logically completes it.',
        cueVi: 'Đoạn văn dừng giữa chừng và đề hỏi điều gì hoàn thành nó hợp logic nhất.',
        move: 'Identify the logical direction the last sentence sets up — contrast, consequence, or extension — before reading the options.',
        moveVi: 'Xác định hướng logic mà câu cuối dựng lên — tương phản, hệ quả, hay mở rộng — trước khi đọc phương án.',
      },
      {
        name: 'What must be true',
        nameVi: 'Điều gì buộc phải đúng',
        cue: 'The stem contains "must" or "can most reasonably be inferred".',
        cueVi: 'Đề chứa "must" hoặc "can most reasonably be inferred".',
        move: 'An inference is forced by the text, never merely consistent with it. Ask: could this be false while the passage stays true?',
        moveVi: 'Một suy luận bị văn bản ép ra, chứ không chỉ tương thích với văn bản. Hãy hỏi: điều này có thể sai trong khi đoạn văn vẫn đúng không?',
      },
    ],
    secure: [
      'You can distinguish "forced by the text" from "reasonable given the text" without pausing.',
      'You reject an option that requires outside knowledge, however true that knowledge is.',
      'You name the logical direction of the missing sentence before reading options.',
      'You do not choose the most interesting option; you choose the smallest one that is guaranteed.',
    ],
    secureVi: [
      'Bạn phân biệt được "bị văn bản ép ra" và "hợp lý với văn bản" mà không phải dừng lại.',
      'Bạn loại phương án cần kiến thức bên ngoài, dù kiến thức đó đúng đến đâu.',
      'Bạn gọi tên hướng logic của câu còn thiếu trước khi đọc phương án.',
      'Bạn không chọn phương án thú vị nhất; bạn chọn phương án nhỏ nhất mà chắc chắn đúng.',
    ],
    regression:
      'The gap between "must be true" and "sounds right" narrows first, and the tempting overreach starts winning again.',
    regressionVi:
      'Khoảng cách giữa "buộc phải đúng" và "nghe hợp lý" bị thu hẹp trước, và phương án nói quá hấp dẫn bắt đầu thắng trở lại.',
  },

  {
    skill: 'words-in-context',
    types: [
      {
        name: 'Fill the blank in the sentence',
        nameVi: 'Điền vào chỗ trống trong câu',
        cue: 'A blank appears in the passage and the four options are single words.',
        cueVi: 'Một chỗ trống xuất hiện trong đoạn và bốn phương án là các từ đơn.',
        move: 'Cover the options. Write your own word in the blank from the sentence alone, then match.',
        moveVi: 'Che phương án lại. Tự viết từ của mình vào chỗ trống chỉ dựa trên câu văn, rồi mới đối chiếu.',
      },
      {
        name: 'Meaning of a word as used',
        nameVi: 'Nghĩa của một từ trong cách dùng cụ thể',
        cue: 'The stem quotes a word and asks what it most nearly means "as used in the text".',
        cueVi: 'Đề trích một từ và hỏi nó gần nghĩa nhất với gì "as used in the text".',
        move: 'Ignore the word’s most common meaning entirely. Substitute each option into the sentence and read it aloud in your head.',
        moveVi: 'Bỏ qua hoàn toàn nghĩa phổ biến nhất của từ. Thay từng phương án vào câu và đọc thầm lên.',
      },
    ],
    secure: [
      'You form your own word before looking at the options, every time.',
      'A word you know in one sense does not stop you from reading its sense here.',
      'You use the sentence structure — the contrast, the parallel, the list — rather than the topic.',
      'You are not slowed by an unfamiliar option word; you eliminate on the ones you know.',
    ],
    secureVi: [
      'Lần nào bạn cũng tự nghĩ ra từ của mình trước khi nhìn phương án.',
      'Một từ bạn đã biết theo một nghĩa không cản bạn đọc nghĩa của nó ở đây.',
      'Bạn dùng cấu trúc câu — phép tương phản, phép song song, danh sách — chứ không dùng chủ đề.',
      'Bạn không bị chậm vì một phương án lạ; bạn loại dựa trên những từ mình biết.',
    ],
    regression:
      'The habit of forming your own word decays first, and the most common dictionary meaning starts winning over the contextual one.',
    regressionVi:
      'Thói quen tự nghĩ ra từ suy giảm trước, và nghĩa từ điển phổ biến nhất bắt đầu thắng nghĩa theo ngữ cảnh.',
  },

  {
    skill: 'text-structure-purpose',
    types: [
      {
        name: 'Overall structure of the text',
        nameVi: 'Cấu trúc tổng thể của văn bản',
        cue: 'The stem asks about "the overall structure" or "the organisation".',
        cueVi: 'Đề hỏi về "the overall structure" hoặc cách tổ chức.',
        move: 'Label each sentence in one word — claim, example, objection, resolution — then read your labels as a sequence.',
        moveVi: 'Gán cho mỗi câu một nhãn một từ — luận điểm, ví dụ, phản bác, giải quyết — rồi đọc dãy nhãn đó như một chuỗi.',
      },
      {
        name: 'Main purpose of the text',
        nameVi: 'Mục đích chính của văn bản',
        cue: 'The stem asks "the main purpose".',
        cueVi: 'Đề hỏi "the main purpose".',
        move: 'Purpose is a verb: to argue, to describe, to correct, to introduce. Choose the verb before you choose the object.',
        moveVi: 'Mục đích là một động từ: để lập luận, để mô tả, để đính chính, để giới thiệu. Chọn động từ trước khi chọn tân ngữ.',
      },
      {
        name: 'Function of an underlined sentence',
        nameVi: 'Vai trò của một câu được gạch chân',
        cue: 'One sentence is marked and the question asks what it does in the text as a whole.',
        cueVi: 'Một câu được đánh dấu và câu hỏi là câu đó làm gì trong toàn văn bản.',
        move: 'Read the sentence before it and the sentence after it. A function is a relationship to neighbours, not a summary.',
        moveVi: 'Đọc câu trước và câu sau nó. Vai trò là quan hệ với các câu lân cận, không phải một bản tóm tắt.',
      },
    ],
    secure: [
      'You describe a passage’s structure in four or five one-word labels without re-reading.',
      'You state a purpose as a verb, not as a topic.',
      'For a marked sentence you look at its neighbours first, automatically.',
      'You reject an option that accurately summarises content when the question asked about function.',
    ],
    secureVi: [
      'Bạn mô tả được cấu trúc một đoạn bằng bốn năm nhãn một từ mà không phải đọc lại.',
      'Bạn nêu mục đích bằng một động từ, không phải bằng một chủ đề.',
      'Với câu được đánh dấu, bạn tự động nhìn các câu lân cận trước.',
      'Bạn loại phương án tóm tắt nội dung chính xác khi câu hỏi đang hỏi về vai trò.',
    ],
    regression:
      'Function questions start being answered with content summaries again — the option is true, and that is exactly why it is chosen.',
    regressionVi:
      'Câu hỏi về vai trò lại bắt đầu được trả lời bằng tóm tắt nội dung — phương án đó đúng, và đó chính là lý do nó bị chọn.',
  },

  {
    skill: 'cross-text-connections',
    types: [
      {
        name: 'How the second author would respond',
        nameVi: 'Tác giả thứ hai sẽ phản hồi thế nào',
        cue: 'Two texts are given and the stem asks how one author would view the other’s claim.',
        cueVi: 'Hai văn bản được đưa ra và đề hỏi tác giả này nhìn nhận luận điểm của tác giả kia ra sao.',
        move: 'Write each author’s position in one sentence before comparing. Comparing two positions you have not stated is guessing.',
        moveVi: 'Viết lập trường của mỗi tác giả trong một câu trước khi so sánh. So sánh hai lập trường chưa được phát biểu là đoán.',
      },
      {
        name: 'What both texts agree on',
        nameVi: 'Điều cả hai văn bản đồng ý',
        cue: 'The stem asks what both authors would agree with.',
        cueVi: 'Đề hỏi cả hai tác giả sẽ đồng ý với điều gì.',
        move: 'The answer is usually smaller and duller than the disagreement. Look for the shared premise, not the shared topic.',
        moveVi: 'Đáp án thường nhỏ hơn và nhạt hơn phần bất đồng. Tìm tiền đề chung, không phải chủ đề chung.',
      },
    ],
    secure: [
      'You state each author’s position in one sentence before you compare anything.',
      'You can name the precise point of disagreement, not just that they disagree.',
      'You do not assume the second text opposes the first; sometimes it extends it.',
      'You finish a two-text question without re-reading either passage.',
    ],
    secureVi: [
      'Bạn phát biểu lập trường mỗi tác giả trong một câu trước khi so sánh bất cứ gì.',
      'Bạn gọi tên được điểm bất đồng chính xác, không chỉ là "họ bất đồng".',
      'Bạn không mặc định văn bản thứ hai phản đối văn bản thứ nhất; đôi khi nó mở rộng.',
      'Bạn hoàn thành câu hai văn bản mà không phải đọc lại đoạn nào.',
    ],
    regression:
      'The habit of writing both positions down is the first casualty of time pressure, and after that the two texts blur into one.',
    regressionVi:
      'Thói quen viết ra cả hai lập trường là nạn nhân đầu tiên của áp lực thời gian, và sau đó hai văn bản nhoè thành một.',
  },

  {
    skill: 'rhetorical-synthesis',
    types: [
      {
        name: 'Which notes achieve the stated goal',
        nameVi: 'Ghi chú nào đạt được mục tiêu đã nêu',
        cue: 'A bulleted set of notes, then "The student wants to…".',
        cueVi: 'Một danh sách ghi chú, rồi "The student wants to…".',
        move: 'Read the goal sentence first and underline the verb. The notes exist only to serve that verb.',
        moveVi: 'Đọc câu mục tiêu trước và gạch chân động từ. Các ghi chú tồn tại chỉ để phục vụ động từ đó.',
      },
      {
        name: 'Emphasis on one particular thing',
        nameVi: 'Nhấn mạnh vào một điều cụ thể',
        cue: 'The goal names something to emphasise, contrast, or introduce.',
        cueVi: 'Mục tiêu nêu rõ điều cần nhấn mạnh, tương phản, hoặc giới thiệu.',
        move: 'A correct option does the named job. Three others will be accurate sentences that do a different job.',
        moveVi: 'Phương án đúng làm đúng việc được nêu tên. Ba phương án còn lại là những câu chính xác nhưng làm việc khác.',
      },
    ],
    secure: [
      'You read the goal before the notes, always.',
      'You reject accurate sentences that serve a different purpose than the one stated.',
      'You can name the rhetorical job — emphasise, contrast, introduce, generalise — in one word.',
      'You are not tempted by the option that uses the most notes.',
    ],
    secureVi: [
      'Bạn luôn đọc mục tiêu trước khi đọc ghi chú.',
      'Bạn loại những câu chính xác nhưng phục vụ mục đích khác với mục đích đã nêu.',
      'Bạn gọi tên được nhiệm vụ tu từ — nhấn mạnh, tương phản, giới thiệu, khái quát — bằng một từ.',
      'Bạn không bị hấp dẫn bởi phương án dùng nhiều ghi chú nhất.',
    ],
    regression:
      'Reading the notes before the goal comes back first, and then every option looks defensible because every option is true.',
    regressionVi:
      'Thói quen đọc ghi chú trước mục tiêu quay lại trước, và rồi mọi phương án đều có vẻ bảo vệ được vì mọi phương án đều đúng.',
  },

  {
    skill: 'transitions',
    types: [
      {
        name: 'Contrast versus continuation',
        nameVi: 'Tương phản hay tiếp nối',
        cue: 'Options include however / moreover / therefore in some combination.',
        cueVi: 'Phương án có however / moreover / therefore theo một tổ hợp nào đó.',
        move: 'Cover the blank. State the relationship between the two sentences in your own words first, then pick the word for it.',
        moveVi: 'Che chỗ trống. Nêu quan hệ giữa hai câu bằng lời của mình trước, rồi mới chọn từ diễn đạt quan hệ đó.',
      },
      {
        name: 'Cause and consequence',
        nameVi: 'Nguyên nhân và hệ quả',
        cue: 'The second sentence states a result of the first.',
        cueVi: 'Câu thứ hai nêu kết quả của câu thứ nhất.',
        move: 'Check the direction. "Therefore" and "because" point opposite ways, and a reversed direction is the most common wrong answer.',
        moveVi: 'Kiểm tra chiều. "Therefore" và "because" chỉ hai chiều ngược nhau, và đảo chiều là đáp án sai phổ biến nhất.',
      },
      {
        name: 'Example or restatement',
        nameVi: 'Ví dụ hay diễn đạt lại',
        cue: 'The second sentence narrows or rephrases the first rather than adding to it.',
        cueVi: 'Câu thứ hai thu hẹp hoặc diễn đạt lại câu thứ nhất chứ không bổ sung.',
        move: 'A narrowing needs "for example"; a rephrasing needs "in other words". They are not interchangeable.',
        moveVi: 'Thu hẹp thì cần "for example"; diễn đạt lại thì cần "in other words". Hai cái không thay nhau được.',
      },
    ],
    secure: [
      'You state the relationship in your own words before reading any option.',
      'You check the direction of a causal transition rather than its plausibility.',
      'You read the whole sentence after the blank, not just the beginning.',
      'You are not swayed by a transition that sounds sophisticated.',
    ],
    secureVi: [
      'Bạn nêu quan hệ bằng lời của mình trước khi đọc phương án nào.',
      'Bạn kiểm tra chiều của từ nối nhân quả chứ không kiểm tra độ hợp lý của nó.',
      'Bạn đọc hết câu sau chỗ trống, không chỉ đọc phần đầu.',
      'Bạn không bị lung lay bởi một từ nối nghe có vẻ sang trọng.',
    ],
    regression:
      'Direction-checking goes first. The reversed causal transition is the single most common way this topic decays.',
    regressionVi:
      'Việc kiểm tra chiều mất trước tiên. Từ nối nhân quả ngược chiều là cách chuyên đề này suy giảm phổ biến nhất.',
  },

  {
    skill: 'boundaries',
    types: [
      {
        name: 'Joining two independent clauses',
        nameVi: 'Nối hai mệnh đề độc lập',
        cue: 'Both halves could stand alone as sentences.',
        cueVi: 'Cả hai vế đều có thể đứng riêng thành câu.',
        move: 'Two independent clauses need a full stop, a semicolon, or a comma plus a coordinating conjunction. A comma alone is never enough.',
        moveVi: 'Hai mệnh đề độc lập cần dấu chấm, dấu chấm phẩy, hoặc dấu phẩy kèm liên từ đẳng lập. Chỉ dấu phẩy thì không bao giờ đủ.',
      },
      {
        name: 'Setting off non-essential information',
        nameVi: 'Tách phần thông tin không thiết yếu',
        cue: 'A phrase could be removed and the sentence would still be complete and true.',
        cueVi: 'Một cụm có thể bỏ đi mà câu vẫn đầy đủ và vẫn đúng.',
        move: 'Punctuation must match at both ends: comma–comma, dash–dash, or nothing–nothing. A mismatched pair is always wrong.',
        moveVi: 'Dấu câu phải khớp ở cả hai đầu: phẩy–phẩy, gạch–gạch, hoặc không–không. Một cặp lệch luôn sai.',
      },
      {
        name: 'Introducing a list or explanation',
        nameVi: 'Dẫn vào một danh sách hoặc lời giải thích',
        cue: 'The second half explains, specifies, or lists what the first half announced.',
        cueVi: 'Vế sau giải thích, nói rõ, hoặc liệt kê điều vế trước vừa nêu.',
        move: 'A colon needs a complete sentence in front of it. Test that first; the rest of the choice does not matter if it fails.',
        moveVi: 'Dấu hai chấm cần một câu hoàn chỉnh đứng trước. Kiểm tra điều đó trước; nếu hỏng thì phần còn lại không quan trọng.',
      },
    ],
    secure: [
      'You test whether each half is an independent clause before considering any punctuation.',
      'You never accept a comma splice, however natural the sentence sounds aloud.',
      'You check that a pair of commas or dashes matches at both ends.',
      'You verify that a colon has a complete sentence before it, every time.',
    ],
    secureVi: [
      'Bạn kiểm tra từng vế có phải mệnh đề độc lập không, trước khi xét bất kỳ dấu câu nào.',
      'Bạn không bao giờ chấp nhận nối câu bằng dấu phẩy, dù câu đọc lên nghe tự nhiên đến mấy.',
      'Bạn kiểm tra cặp dấu phẩy hoặc gạch ngang có khớp ở cả hai đầu không.',
      'Lần nào bạn cũng xác minh trước dấu hai chấm là một câu hoàn chỉnh.',
    ],
    regression:
      'Judging by ear returns first. A comma splice sounds fine spoken, which is exactly why this topic decays without the clause test.',
    regressionVi:
      'Thói quen phán đoán bằng tai quay lại trước. Nối câu bằng dấu phẩy đọc lên nghe ổn, và đó chính là lý do chuyên đề này suy giảm khi bỏ bước kiểm tra mệnh đề.',
  },

  {
    skill: 'form-structure-sense',
    types: [
      {
        name: 'Subject–verb agreement across a gap',
        nameVi: 'Hoà hợp chủ ngữ – động từ qua một khoảng chen',
        cue: 'A long phrase sits between the subject and the verb.',
        cueVi: 'Một cụm dài nằm giữa chủ ngữ và động từ.',
        move: 'Cross out everything between them and read subject and verb together. The intervening noun is placed there to mislead.',
        moveVi: 'Gạch bỏ mọi thứ ở giữa và đọc chủ ngữ với động từ liền nhau. Danh từ chen giữa được đặt ở đó để đánh lạc hướng.',
      },
      {
        name: 'Verb tense and sequence',
        nameVi: 'Thì và trình tự của động từ',
        cue: 'The passage establishes a time frame that the blank must respect.',
        cueVi: 'Đoạn văn thiết lập một khung thời gian mà chỗ trống phải tôn trọng.',
        move: 'Find the nearest time marker in the surrounding sentences, not in the sentence with the blank.',
        moveVi: 'Tìm mốc thời gian gần nhất ở các câu xung quanh, chứ không phải ở câu chứa chỗ trống.',
      },
      {
        name: 'Modifier placement',
        nameVi: 'Vị trí của thành phần bổ nghĩa',
        cue: 'The sentence opens with a descriptive phrase followed by a comma.',
        cueVi: 'Câu mở đầu bằng một cụm mô tả theo sau là dấu phẩy.',
        move: 'Whatever the phrase describes must be the first noun after the comma. Check that before anything else.',
        moveVi: 'Thứ mà cụm đó mô tả phải là danh từ đầu tiên sau dấu phẩy. Kiểm tra điều này trước mọi thứ khác.',
      },
      {
        name: 'Pronoun and possessive form',
        nameVi: 'Đại từ và hình thức sở hữu',
        cue: 'Options differ only in its/it’s, their/there, or whose/who’s.',
        cueVi: 'Các phương án chỉ khác nhau ở its/it’s, their/there, hoặc whose/who’s.',
        move: 'Expand the contraction and read it aloud. "It is" either fits or it does not; there is no judgement involved.',
        moveVi: 'Khai triển dạng rút gọn và đọc lên. "It is" hoặc là hợp hoặc là không; ở đây không có chỗ cho cảm tính.',
      },
    ],
    secure: [
      'You strike out intervening phrases before judging agreement, automatically.',
      'You look outside the sentence for the time frame before choosing a tense.',
      'On an opening modifier you check the first noun after the comma without being prompted.',
      'You expand every contraction rather than deciding by feel.',
    ],
    secureVi: [
      'Bạn tự động gạch bỏ cụm chen giữa trước khi xét sự hoà hợp.',
      'Bạn tìm khung thời gian ở ngoài câu trước khi chọn thì.',
      'Với cụm bổ nghĩa mở đầu, bạn kiểm tra danh từ đầu tiên sau dấu phẩy mà không cần nhắc.',
      'Bạn khai triển mọi dạng rút gọn thay vì quyết định theo cảm giác.',
    ],
    regression:
      'The intervening-phrase strike-out is the first mechanical step to be dropped, and agreement errors return immediately after it.',
    regressionVi:
      'Bước gạch bỏ cụm chen giữa là thao tác cơ học bị bỏ đầu tiên, và lỗi hoà hợp quay lại ngay sau đó.',
  },
];
