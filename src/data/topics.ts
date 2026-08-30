import type { Topic } from '../types';

/**
 * Danh muc chu de. Quy uoc id: `<section>.<slug>` hoac
 * `science.<subject>.<slug>` — lib/analytics.ts dua vao tien to nay.
 *
 * `weight` = ti trong xuat hien uoc luong trong de that, tong = 1 trong moi
 * nhom (mot section, hoac mot mon tu chon cua phan 3). Nho trong so nay, phan
 * tich diem yeu duoc xep hang theo "mat bao nhieu diem" chu khong phai
 * "sai bao nhieu cau".
 */
export const TOPICS: readonly Topic[] = [
  // ── Phần 1: Toán học và xử lý số liệu ────────────────────────────────
  { id: 'quantitative.arithmetic', section: 'quantitative', name: 'Số học & tỉ lệ phần trăm', weight: 0.10 },
  { id: 'quantitative.algebra', section: 'quantitative', name: 'Hàm số, phương trình & bất phương trình', weight: 0.16 },
  { id: 'quantitative.sequence', section: 'quantitative', name: 'Dãy số, cấp số cộng & cấp số nhân', weight: 0.06, prerequisites: ['quantitative.algebra'] },
  { id: 'quantitative.geometry', section: 'quantitative', name: 'Hình học phẳng & không gian', weight: 0.14 },
  { id: 'quantitative.coordinate', section: 'quantitative', name: 'Hình học tọa độ', weight: 0.08, prerequisites: ['quantitative.geometry'] },
  { id: 'quantitative.calculus', section: 'quantitative', name: 'Đạo hàm, tích phân & khảo sát hàm số', weight: 0.14, prerequisites: ['quantitative.algebra'] },
  { id: 'quantitative.exponential', section: 'quantitative', name: 'Mũ & logarit', weight: 0.08, prerequisites: ['quantitative.algebra'] },
  { id: 'quantitative.combinatorics', section: 'quantitative', name: 'Tổ hợp & xác suất', weight: 0.10 },
  { id: 'quantitative.statistics', section: 'quantitative', name: 'Thống kê & xử lý số liệu', weight: 0.14 },

  // ── Phần 2: Ngôn ngữ — Văn học ───────────────────────────────────────
  { id: 'qualitative.reading', section: 'qualitative', name: 'Đọc hiểu văn bản', weight: 0.28 },
  { id: 'qualitative.literature', section: 'qualitative', name: 'Tác giả, tác phẩm & giai đoạn văn học', weight: 0.18 },
  { id: 'qualitative.grammar', section: 'qualitative', name: 'Ngữ pháp & lỗi sai trong câu', weight: 0.16 },
  { id: 'qualitative.vocabulary', section: 'qualitative', name: 'Từ vựng & nghĩa của từ', weight: 0.14 },
  { id: 'qualitative.rhetoric', section: 'qualitative', name: 'Biện pháp tu từ & phong cách', weight: 0.12 },
  { id: 'qualitative.logic', section: 'qualitative', name: 'Suy luận ngôn ngữ & liên kết ý', weight: 0.12 },

  // ── Phần 3: Vật lý ───────────────────────────────────────────────────
  { id: 'science.physics.mechanics', section: 'science', subject: 'physics', name: 'Cơ học', weight: 0.3 },
  { id: 'science.physics.oscillation', section: 'science', subject: 'physics', name: 'Dao động & sóng', weight: 0.28 },
  { id: 'science.physics.electricity', section: 'science', subject: 'physics', name: 'Điện & từ', weight: 0.27 },
  { id: 'science.physics.modern', section: 'science', subject: 'physics', name: 'Lượng tử & hạt nhân', weight: 0.15 },

  // ── Phần 3: Hóa học ──────────────────────────────────────────────────
  { id: 'science.chemistry.general', section: 'science', subject: 'chemistry', name: 'Hóa đại cương', weight: 0.3 },
  { id: 'science.chemistry.inorganic', section: 'science', subject: 'chemistry', name: 'Hóa vô cơ', weight: 0.32 },
  { id: 'science.chemistry.organic', section: 'science', subject: 'chemistry', name: 'Hóa hữu cơ', weight: 0.38 },

  // ── Phần 3: Sinh học ─────────────────────────────────────────────────
  { id: 'science.biology.cell', section: 'science', subject: 'biology', name: 'Sinh học tế bào', weight: 0.3 },
  { id: 'science.biology.genetics', section: 'science', subject: 'biology', name: 'Di truyền học', weight: 0.4 },
  { id: 'science.biology.organism', section: 'science', subject: 'biology', name: 'Sinh học cơ thể & tiến hóa', weight: 0.3 },

  // ── Phần 3: Lịch sử ──────────────────────────────────────────────────
  { id: 'science.history.vietnam', section: 'science', subject: 'history', name: 'Lịch sử Việt Nam', weight: 0.62 },
  { id: 'science.history.world', section: 'science', subject: 'history', name: 'Lịch sử thế giới', weight: 0.38 },

  // ── Phần 3: Địa lý ───────────────────────────────────────────────────
  { id: 'science.geography.nature', section: 'science', subject: 'geography', name: 'Địa lý tự nhiên', weight: 0.34 },
  { id: 'science.geography.economy', section: 'science', subject: 'geography', name: 'Địa lý kinh tế — xã hội', weight: 0.4 },
  { id: 'science.geography.data', section: 'science', subject: 'geography', name: 'Bảng số liệu, biểu đồ & Atlat', weight: 0.26 },

  // ── Phần 3: Tiếng Anh ────────────────────────────────────────────────
  { id: 'science.english.grammar', section: 'science', subject: 'english', name: 'Grammar & Structure', weight: 0.34 },
  { id: 'science.english.vocabulary', section: 'science', subject: 'english', name: 'Vocabulary & Collocation', weight: 0.3 },
  { id: 'science.english.reading', section: 'science', subject: 'english', name: 'Reading Comprehension', weight: 0.36 },
];

export const TOPIC_BY_ID = new Map(TOPICS.map((t) => [t.id, t]));

export function topicName(id: string): string {
  return TOPIC_BY_ID.get(id)?.name ?? id;
}
