import { TOPICS } from '@/data/topics';
import { EXAM_PAPERS, paperStats } from '@/data/papers';
const t = TOPICS.map((x) => `  { id: '${x.id}', name: ${JSON.stringify(x.name)}, tracks: ${JSON.stringify(x.tracks)} },`).join('\n');
const p = EXAM_PAPERS.map((x) => `  { id: '${x.id}', title: ${JSON.stringify(x.title)} },`).join('\n');
const cards = EXAM_PAPERS.map((x) => {
  const s = paperStats(x);
  return `  { id: '${x.id}', code: '${x.code}', title: ${JSON.stringify(x.title)}, track: '${x.track}', minutes: ${x.minutes}, totalPoints: ${x.totalPoints}, items: ${s.items}, claims: ${s.claims} },`;
}).join('\n');
console.log(`import type { TrackId } from '@/types';

/**
 * DANH MỤC RÚT GỌN CỦA CHUYÊN ĐỀ VÀ ĐỀ MẪU
 *
 * Bản đồ đường dẫn và trang chủ cần tên của mọi chuyên đề, mọi đề mẫu ngay ở
 * lần tải đầu tiên. Nếu nhập trực tiếp từ kho nội dung đầy đủ thì toàn bộ lời
 * giải, bảng phân tích và bộ sinh đề sẽ bị kéo vào gói mã khởi động của mọi
 * trang, làm chậm thời gian hiển thị nội dung chính — một chỉ số xếp hạng thật.
 *
 * Danh mục dưới đây chỉ giữ phần tối thiểu. \`npm run smoke\` đối chiếu từng
 * trường với kho nội dung thật và chặn bản dựng nếu lệch, nên không thể sai âm thầm.
 *
 * Tệp này được sinh lại bằng \`npm run gen:index\` mỗi khi thêm chuyên đề hoặc đề mẫu.
 */

export const TOPIC_INDEX: { id: string; name: string; tracks: TrackId[] }[] = [
${t}
];

export const PAPER_INDEX: { id: string; title: string }[] = [
${p}
];

export interface PaperCard {
  id: string;
  code: string;
  title: string;
  track: TrackId;
  minutes: number;
  totalPoints: number;
  items: number;
  claims: number;
}

export const PAPER_CARDS: PaperCard[] = [
${cards}
];`);
