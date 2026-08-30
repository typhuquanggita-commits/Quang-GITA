import { buildQuestions, type QuestionDraft } from './helpers';

/**
 * Ngan hang cau hoi Tieng Anh — bo bo sung de mon nay du 50 cau cho de mau.
 */

const drafts: QuestionDraft[] = [
  {
    id: 'e.gra.16',
    topicId: 'science.english.grammar',
    difficulty: 2,
    stem: 'Choose the best option: "The manager, along with two assistants, ______ attending the conference."',
    choices: ['is', 'are', 'were', 'have been'],
    answer: 'A',
    explanation:
      'Các cụm "along with", "as well as", "together with" không làm chủ ngữ thành số nhiều. Chủ ngữ vẫn là "The manager" (số ít), nên động từ chia số ít.',
    traps: { B: 'Cụm chen giữa hai dấu phẩy không phải là một phần của chủ ngữ ngữ pháp.' },
    skills: ['subject-verb agreement'],
  },
  {
    id: 'e.gra.17',
    topicId: 'science.english.grammar',
    difficulty: 3,
    stem: 'Choose the best option: "No sooner ______ the door than the phone rang."',
    choices: ['had he opened', 'he had opened', 'did he open', 'he opened'],
    answer: 'A',
    explanation:
      'Cấu trúc "No sooner + quá khứ hoàn thành đảo ngữ + than + quá khứ đơn" diễn tả hai hành động nối tiếp rất nhanh. "No sooner" đứng đầu câu bắt buộc đảo trợ động từ lên trước chủ ngữ.',
    traps: { C: '"did he open" là đảo ngữ của quá khứ đơn, không dùng được với cấu trúc "no sooner … than".' },
    skills: ['inversion', 'tense sequence'],
  },
  {
    id: 'e.voc.16',
    topicId: 'science.english.vocabulary',
    difficulty: 2,
    stem: 'Choose the best option: "The company had to ______ its plans when funding was cut."',
    choices: ['revise', 'revive', 'reverse', 'review'],
    answer: 'A',
    explanation:
      '"revise" nghĩa là sửa đổi cho phù hợp với hoàn cảnh mới, hợp với việc kinh phí bị cắt. "revive" là hồi sinh, "reverse" là đảo ngược, "review" là xem xét lại mà không nhất thiết thay đổi.',
    traps: { D: '"review" chỉ là xem lại; đề nói kinh phí bị cắt nên kế hoạch phải được sửa đổi thật sự.' },
    skills: ['word choice', 'confusable words'],
  },
  {
    id: 'e.voc.17',
    topicId: 'science.english.vocabulary',
    difficulty: 3,
    stem: 'Choose the word closest in meaning to "ubiquitous" in: "Mobile phones are now ubiquitous in classrooms."',
    choices: ['found everywhere', 'strictly banned', 'rarely used', 'newly invented'],
    answer: 'A',
    explanation:
      '"ubiquitous" nghĩa là có mặt ở khắp mọi nơi. Ngữ cảnh "now … in classrooms" củng cố nghĩa này: điện thoại đã trở nên phổ biến tới mức ở đâu cũng thấy.',
    traps: { C: '"rarely used" là nghĩa ngược lại; đây là bẫy quen thuộc khi thí sinh đoán theo cảm giác.' },
    skills: ['synonym', 'context clue'],
  },
  {
    id: 'e.rea.16',
    topicId: 'science.english.reading',
    difficulty: 3,
    passageId: 'p.english.1',
    stem: 'According to the passage, what may ultimately determine whether the night-train revival lasts?',
    choices: [
      'Whether rail operators in different countries can agree on selling a single cross-border ticket',
      'Whether passengers continue to care about carbon emissions',
      'Whether governments keep taxing short-haul flights',
      'Whether new sleeper carriages can be built quickly enough',
    ],
    answer: 'A',
    explanation:
      'Câu cuối bài nói rõ tương lai của tàu đêm phụ thuộc vào "something far less romantic": việc các nhà khai thác đường sắt ở các nước có thống nhất được cách bán một vé duy nhất xuyên biên giới hay không.',
    traps: { B: 'Bài có nhắc tới yếu tố môi trường, nhưng đó là lý do hồi sinh chứ không phải điều quyết định nó có bền hay không.' },
    skills: ['detail', 'inference'],
  },
];

export const englishQuestions3 = buildQuestions('science', 'english', drafts);
