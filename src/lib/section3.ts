import { SCIENCE_PICK, SCIENCE_SUBJECTS } from '../types';
import type { ScienceSubject, ScienceTopicSubject, Section3Choice, Topic } from '../types';

/**
 * PHAN 3 — LUA CHON CUA THI SINH
 *
 * Theo dang thuc chinh thuc ap dung tu 2026, phan 3 cho chon KHOA HOC hoac
 * TIENG ANH. Chon Khoa hoc thi phai chon DUNG BA trong nam chu de: Vat ly, Hoa
 * hoc, Sinh hoc, Lich su, Dia ly — moi chu de 16–17 cau.
 *
 * Truoc day he thong luu MOT mon duy nhat cho phan 3. Do la mo hinh sai so voi
 * de that, va moi thu dung tren no — sinh phieu luyen, dung de mau, bai dinh
 * vi, bang lop — deu lech theo. Tep nay la cho duy nhat dich tu "lua chon cua
 * thi sinh" sang "danh sach chu de", nen khong noi nao con phai tu suy luan.
 */

/** Lua chon mac dinh cho nguoi chua chon: ba chu de pho bien nhat. */
export const DEFAULT_SECTION3: Section3Choice = {
  mode: 'science',
  subjects: ['physics', 'chemistry', 'biology'],
};

/** Cac chu de duoc tinh diem theo lua chon. */
export function subjectsOf(choice: Section3Choice): ScienceSubject[] {
  return choice.mode === 'english' ? ['english'] : [...choice.subjects];
}

/** Mot chu de co nam trong lua chon khong. */
export function includesSubject(choice: Section3Choice, subject: ScienceSubject): boolean {
  return subjectsOf(choice).includes(subject);
}

/**
 * So cau moi chu de khi chon Khoa hoc.
 *
 * 50 cau chia cho ba chu de khong chia het, nen de that ra 16–17 cau moi chu
 * de. Ham nay tra ve dung phan bo do: hai chu de 17 cau va mot chu de 16 cau.
 */
export function questionsPerSubject(total: number, pick: number = SCIENCE_PICK): number[] {
  const base = Math.floor(total / pick);
  const extra = total - base * pick;
  return Array.from({ length: pick }, (_, i) => base + (i < extra ? 1 : 0));
}

/**
 * Chuan hoa lua chon doc tu tep hoac tu phien ban cu.
 *
 * Bat buoc dung ba chu de va khong trung — mot lua chon hai chu de hoac bon
 * chu de se lam moi phep chia cau ben duoi sai, va sai o day thi ca de mau lan
 * bai dinh vi deu lech ma khong bao loi.
 */
export function sanitizeSection3(value: unknown): Section3Choice {
  if (typeof value !== 'object' || value === null) return DEFAULT_SECTION3;
  const raw = value as Record<string, unknown>;

  if (raw['mode'] === 'english') return { mode: 'english' };

  const wanted = Array.isArray(raw['subjects']) ? raw['subjects'] : [];
  const picked: ScienceTopicSubject[] = [];
  for (const item of wanted) {
    const subject = SCIENCE_SUBJECTS.find((s) => s === item);
    if (subject && !picked.includes(subject)) picked.push(subject);
  }

  // Thieu thi bu tu danh sach chuan de luon du ba; thua thi cat.
  for (const subject of SCIENCE_SUBJECTS) {
    if (picked.length >= SCIENCE_PICK) break;
    if (!picked.includes(subject)) picked.push(subject);
  }

  return { mode: 'science', subjects: picked.slice(0, SCIENCE_PICK) };
}

/**
 * Chu de nay co nam trong chuong trinh cua nguoi hoc khong.
 *
 * Hai phan dau ai cung thi nen luon tinh; rieng phan 3 chi tinh cac chu de da
 * chon. Dung mot cho duy nhat de moi man hinh dem cung mot tap chu de.
 */
export function topicInScope(choice: Section3Choice, topic: Topic): boolean {
  if (topic.section !== 'science') return true;
  return topic.subject !== undefined && includesSubject(choice, topic.subject);
}

/** Loc danh sach chu de theo chuong trinh cua nguoi hoc. */
export function topicsInScope<T extends Topic>(choice: Section3Choice, topics: readonly T[]): T[] {
  return topics.filter((topic) => topicInScope(choice, topic));
}

/** Mo ta ngan de hien tren giao dien. */
export function describeSection3(choice: Section3Choice, nameOf: (s: ScienceSubject) => string): string {
  return choice.mode === 'english'
    ? 'Tiếng Anh'
    : choice.subjects.map(nameOf).join(' · ');
}
