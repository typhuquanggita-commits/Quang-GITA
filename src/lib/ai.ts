import type { Question } from '../types';
import { DIFFICULTY_LABEL } from '../config';
import { topicName } from '../data/topics';

/**
 * Lop bao quanh Gemini cho tinh nang "Gia su AI".
 *
 * Ba quy tac thiet ke:
 *  1. TUY CHON. Khong co khoa thi moi tinh nang con lai van chay day du —
 *     AI la phan thuong, khong phai dieu kien.
 *  2. KHONG BAO GIO LA NGUON DUNG SAI. Loi giai chinh thuc lay tu ngan hang
 *     cau hoi; AI chi giang lai theo cach khac, goi y, hoac ra them bai.
 *  3. MOI CAU TRA LOI DEU CO THE SAI. Giao dien luon hien canh bao doi chieu.
 *
 * Canh bao bao mat: khoa API do nguoi dung nhap duoc luu trong trinh duyet cua
 * chinh ho va goi truc tiep den Google. Khi trien khai cho nhieu nguoi dung,
 * hay dat mot may chu trung gian giu khoa thay vi de o phia client.
 */

export type AiStatus = 'unavailable' | 'ready';

const MODEL = 'gemini-2.5-flash';

export function resolveApiKey(userKey: string): string {
  const envKey = (import.meta.env.VITE_GEMINI_API_KEY as string | undefined) ?? '';
  return userKey.trim() || envKey.trim();
}

export function aiStatus(userKey: string): AiStatus {
  return resolveApiKey(userKey) ? 'ready' : 'unavailable';
}

export class AiUnavailableError extends Error {
  constructor() {
    super('Chưa có khóa Gemini API. Thêm khóa trong Cài đặt để bật Gia sư AI.');
    this.name = 'AiUnavailableError';
  }
}

interface GenerateOptions {
  apiKey: string;
  prompt: string;
  system: string;
  signal?: AbortSignal;
}

async function generate({ apiKey, prompt, system, signal }: GenerateOptions): Promise<string> {
  if (!apiKey) throw new AiUnavailableError();

  // Nap dong: nguoi khong dung AI khong phai tai goi thu vien nay.
  const { GoogleGenAI } = await import('@google/genai');
  const client = new GoogleGenAI({ apiKey });

  const response = await client.models.generateContent({
    model: MODEL,
    contents: prompt,
    config: {
      systemInstruction: system,
      temperature: 0.4,
      maxOutputTokens: 1200,
      ...(signal ? { abortSignal: signal } : {}),
    },
  });

  const text = response.text;
  if (!text) throw new Error('Gia sư AI không trả về nội dung. Hãy thử lại.');
  return text.trim();
}

const TUTOR_SYSTEM = [
  'Bạn là gia sư luyện thi Đánh giá năng lực HSA của Đại học Quốc gia Hà Nội.',
  'Luôn trả lời bằng tiếng Việt, ngắn gọn, đi thẳng vào bản chất.',
  'Trình bày theo các bước đánh số. Mỗi bước nêu rõ lý do chọn phép biến đổi đó.',
  'Nếu bài toán có mẹo làm nhanh phù hợp với áp lực thời gian phòng thi, hãy nêu ở cuối.',
  'Không bịa dữ kiện không có trong đề. Nếu đề thiếu dữ kiện, hãy nói rõ điều đó.',
].join(' ');

function describe(question: Question): string {
  const choices = question.choices
    ? question.choices.map((c) => `${c.id}. ${c.text}`).join('\n')
    : '(Câu điền đáp án, không có phương án lựa chọn.)';
  return [
    `Chuyên đề: ${topicName(question.topicId)}`,
    `Mức độ: ${DIFFICULTY_LABEL[question.difficulty] ?? question.difficulty}`,
    `Đề bài: ${question.stem}`,
    choices,
    `Đáp án đúng: ${question.answer}`,
  ].join('\n');
}

/** Giảng lại một câu theo cách khác, bám vào lỗi cụ thể người học mắc phải. */
export function explainQuestion(
  apiKey: string,
  question: Question,
  userAnswer: string | null,
  signal?: AbortSignal,
): Promise<string> {
  const wrong = userAnswer && userAnswer !== question.answer;
  const options: GenerateOptions = {
    apiKey,
    system: TUTOR_SYSTEM,
    prompt: [
      describe(question),
      `Lời giải chính thức: ${question.explanation}`,
      wrong
        ? `Học sinh đã chọn "${userAnswer}". Hãy chỉ ra chính xác bước suy luận nào dẫn tới lựa chọn đó và vì sao nó sai, trước khi trình bày lời giải đúng.`
        : 'Hãy giảng lại lời giải theo một cách tiếp cận khác với lời giải chính thức, để học sinh hiểu sâu hơn.',
      'Kết thúc bằng một câu ngắn: dấu hiệu nào trong đề giúp nhận ra ngay dạng bài này.',
    ].join('\n\n'),
  };
  if (signal) options.signal = signal;
  return generate(options);
}

/** Gợi ý mở đường mà tuyệt đối không lộ đáp án. */
export function hintQuestion(
  apiKey: string,
  question: Question,
  signal?: AbortSignal,
): Promise<string> {
  const options: GenerateOptions = {
    apiKey,
    system: TUTOR_SYSTEM,
    prompt: [
      describe(question),
      'Hãy đưa đúng MỘT gợi ý mở đường, tối đa 2 câu.',
      'Tuyệt đối không nêu đáp án, không nêu kết quả trung gian có thể suy ngược ra đáp án.',
      'Gợi ý nên chỉ ra bước đầu tiên nên làm hoặc công thức nên nhớ lại.',
    ].join('\n\n'),
  };
  if (signal) options.signal = signal;
  return generate(options);
}

/** Sinh một câu tương tự để luyện thêm ngay khi vừa hiểu bài. */
export function similarQuestion(
  apiKey: string,
  question: Question,
  signal?: AbortSignal,
): Promise<string> {
  const options: GenerateOptions = {
    apiKey,
    system: TUTOR_SYSTEM,
    prompt: [
      describe(question),
      'Hãy soạn MỘT câu hỏi mới cùng dạng, cùng mức độ, nhưng khác số liệu và khác ngữ cảnh.',
      'Trình bày theo đúng thứ tự: đề bài, bốn phương án A–D, rồi dòng "Đáp án:" và lời giải ngắn gọn.',
      'Kiểm tra lại phép tính trước khi đưa ra đáp án.',
    ].join('\n\n'),
  };
  if (signal) options.signal = signal;
  return generate(options);
}

export interface CoachContext {
  projected: number;
  target: number;
  daysLeft: number | null;
  weakTopics: string[];
  overdueCards: number;
  streak: number;
}

/** Tư vấn lộ trình dựa trên số liệu thật của người học. */
export function coachAdvice(
  apiKey: string,
  context: CoachContext,
  signal?: AbortSignal,
): Promise<string> {
  const options: GenerateOptions = {
    apiKey,
    system: [
      TUTOR_SYSTEM,
      'Bạn đang đóng vai người cố vấn lộ trình. Đưa lời khuyên cụ thể, có thể làm ngay trong tuần này.',
      'Không nói chung chung kiểu "hãy cố gắng". Mỗi ý phải kèm số câu hoặc số phút cụ thể.',
    ].join(' '),
    prompt: [
      `Điểm dự báo hiện tại: ${context.projected.toFixed(1)}/150. Mục tiêu: ${context.target}/150.`,
      context.daysLeft === null
        ? 'Chưa đặt ngày thi.'
        : `Còn ${context.daysLeft} ngày đến ngày thi.`,
      `Chuyên đề yếu nhất: ${context.weakTopics.join(', ') || 'chưa đủ dữ liệu'}.`,
      `Số câu ôn tập quá hạn: ${context.overdueCards}. Chuỗi ngày học liên tiếp: ${context.streak}.`,
      'Hãy đưa ra kế hoạch cho 7 ngày tới, mỗi ngày một dòng, tối đa 120 từ tổng cộng.',
    ].join('\n'),
  };
  if (signal) options.signal = signal;
  return generate(options);
}
