import { DIFFICULTY_MIX, SECTIONS } from '../config';
import { questionsOf } from './questions';
import { TOPICS } from './topics';
import type { Difficulty, Question, Section3Choice, SectionId } from '../types';
import { hashSeed, mulberry32 } from '../lib/rng';
import { subjectsOf, topicsInScope } from '../lib/section3';

/**
 * DE MAU TRON VEN
 *
 * He thong da sinh duoc de thi thu tu ma tran, nhung MA TRAN khong phai DE.
 * Mot ma tran noi "35 cau trac nghiem, 15 cau dien, do kho phan bo the nay";
 * mot de mau la mot van ban cu the, co ma so, co thu tu cau co dinh, co dap
 * an va co barem — thu ma giao vien phat cho ca lop, phu huynh cam ve nha, va
 * hai nguoi khac nhau doc thi thay dung mot noi dung.
 *
 * Tep nay dung DE MAU CHINH THUC cua HSA365: moi mon tu chon cua phan 3 mot
 * de, tong nam de, moi de 150 cau / 195 phut / thang 150 diem.
 *
 * TAI SAO VAN SINH TU DAC TA CHU KHONG GO TAY 750 CAU:
 * Cung mot ly do voi 2000 phieu luyen. Go tay thi khong kiem tra duoc tinh
 * nhat quan voi ma tran, va lech ngay khi cau truc de that thay doi. O day
 * viec sinh dung mot HAT GIONG CO DINH theo ma de, nen:
 *   - cung mot ma de luon cho ra dung mot de, tren moi may, moi lan mo;
 *   - de van kiem duoc bang test la no khop ma tran that;
 *   - them cau vao ngan hang khong lam xao tron de da phat (hat giong khong doi).
 *
 * Va co mot bai test canh giu dieu quan trong nhat: KHONG CAU NAO LAP LAI
 * trong cung mot de.
 */

export interface MockExamSpec {
  code: string;
  name: string;
  /** Lua chon phan 3 cua de: ba chu de khoa hoc, hoac Tieng Anh. */
  section3: Section3Choice;
  section3Name: string;
  /** Mo ta ngan in tren trang bia. */
  intro: string;
}

/**
 * Nam de mau, phu cac to hop phan 3 pho bien nhat.
 *
 * Tu 2026 phan 3 khong con la "mot mon tu chon" ma la MOT TO HOP ba chu de,
 * nen de mau cung phai di theo to hop chu khong theo mon. Bon to hop khoa hoc
 * duoi day bam sat cac khoi nganh hoc sinh thuong nham toi, cong mot de Tieng
 * Anh cho duong thi con lai.
 */
export const MOCK_EXAMS: readonly MockExamSpec[] = [
  {
    code: 'DM-HSA-01-LHS',
    name: 'Đề mẫu HSA365 số 01 — Lý · Hóa · Sinh',
    section3: { mode: 'science', subjects: ['physics', 'chemistry', 'biology'] },
    section3Name: 'Vật lý · Hóa học · Sinh học',
    intro:
      'Đề mô phỏng đầy đủ cấu trúc HSA của ĐHQGHN. Phần 3 chọn tổ hợp Lý — Hóa — Sinh, hướng khối ngành y dược và khoa học sự sống.',
  },
  {
    code: 'DM-HSA-02-LHD',
    name: 'Đề mẫu HSA365 số 02 — Lý · Hóa · Địa',
    section3: { mode: 'science', subjects: ['physics', 'chemistry', 'geography'] },
    section3Name: 'Vật lý · Hóa học · Địa lý',
    intro:
      'Đề mô phỏng đầy đủ cấu trúc HSA của ĐHQGHN. Phần 3 chọn tổ hợp Lý — Hóa — Địa, hướng khối ngành kỹ thuật và tài nguyên môi trường.',
  },
  {
    code: 'DM-HSA-03-SSD',
    name: 'Đề mẫu HSA365 số 03 — Sinh · Sử · Địa',
    section3: { mode: 'science', subjects: ['biology', 'history', 'geography'] },
    section3Name: 'Sinh học · Lịch sử · Địa lý',
    intro:
      'Đề mô phỏng đầy đủ cấu trúc HSA của ĐHQGHN. Phần 3 chọn tổ hợp Sinh — Sử — Địa, tổ hợp ít tính toán nhất trong bốn tổ hợp khoa học.',
  },
  {
    code: 'DM-HSA-04-LSD',
    name: 'Đề mẫu HSA365 số 04 — Lý · Sử · Địa',
    section3: { mode: 'science', subjects: ['physics', 'history', 'geography'] },
    section3Name: 'Vật lý · Lịch sử · Địa lý',
    intro:
      'Đề mô phỏng đầy đủ cấu trúc HSA của ĐHQGHN. Phần 3 chọn tổ hợp Lý — Sử — Địa, hướng khối ngành kinh tế và khoa học xã hội có định lượng.',
  },
  {
    code: 'DM-HSA-05-TA',
    name: 'Đề mẫu HSA365 số 05 — Tiếng Anh',
    section3: { mode: 'english' },
    section3Name: 'Tiếng Anh',
    intro:
      'Đề mô phỏng đầy đủ cấu trúc HSA của ĐHQGHN. Phần 3 chọn đường Tiếng Anh thay cho ba chủ đề khoa học.',
  },
];

export const MOCK_EXAM_BY_CODE = new Map(MOCK_EXAMS.map((e) => [e.code, e]));

/**
 * SO DE TRONG MOI BO
 *
 * Con so nay khong tuy y. Giao thuc diem tuyet doi dat KPI do chinh xac thuc
 * thi tren "10 de gan nhat" — neu he thong chi cap mot de cho moi to hop thi
 * no dang doi mot thu chinh no khong cung cap duoc.
 */
export const PAPERS_PER_SERIES = 10;

/** Ma de day du: ma bo cong so thu tu, vi du DM-HSA-01-LHS-03. */
export function paperCode(seriesCode: string, index: number): string {
  return `${seriesCode}-${String(index).padStart(2, '0')}`;
}

/**
 * Tach ma de day du thanh bo va so thu tu.
 *
 * Chap nhan ca ma khong co so thu tu de cac duong dan cu van mo duoc de so 1
 * thay vi bao khong tim thay.
 */
export function parsePaperCode(code: string): { series: MockExamSpec; index: number } | null {
  const direct = MOCK_EXAM_BY_CODE.get(code);
  if (direct) return { series: direct, index: 1 };

  const match = /^(.*)-(\d{2})$/.exec(code);
  if (!match) return null;
  const series = MOCK_EXAM_BY_CODE.get(match[1] ?? '');
  const index = Number(match[2]);
  if (!series || index < 1 || index > PAPERS_PER_SERIES) return null;
  return { series, index };
}

/** Toan bo ma de cua he thong: 5 to hop x 10 de. */
export function allPaperCodes(): string[] {
  return MOCK_EXAMS.flatMap((series) =>
    Array.from({ length: PAPERS_PER_SERIES }, (_, i) => paperCode(series.code, i + 1)),
  );
}

/** Mot cau trong de mau, da danh so va da biet barem cua no. */
export interface PaperItem {
  /** So thu tu trong CA de, tu 1 den 150. */
  number: number;
  /** So thu tu trong phan thi, tu 1 den 50. */
  numberInSection: number;
  section: SectionId;
  question: Question;
  topicName: string;
  /** Diem cua cau nay. HSA cham deu 1 diem moi cau. */
  points: number;
}

export interface PaperSection {
  section: SectionId;
  name: string;
  officialName: string;
  minutes: number;
  items: readonly PaperItem[];
  /** Tong diem toi da cua phan. */
  maxScore: number;
}

export interface MatrixRow {
  topicId: string;
  topicName: string;
  section: SectionId;
  /** So cau theo tung muc do kho 1..5. */
  byDifficulty: Readonly<Record<Difficulty, number>>;
  total: number;
}

export interface Paper {
  spec: MockExamSpec;
  sections: readonly PaperSection[];
  items: readonly PaperItem[];
  matrix: readonly MatrixRow[];
  totalQuestions: number;
  maxScore: number;
  totalMinutes: number;
}

/**
 * Chon cau cho mot phan thi.
 *
 * Ba rang buoc, theo dung thu tu uu tien:
 *  1. DUNG DINH DANG. Phan Toan phai dung 35 trac nghiem va 15 cau dien —
 *     day la rang buoc cung, khong duoc pham.
 *  2. DUNG TI TRONG CHUYEN DE. So cau moi chuyen de ti le voi trong so cua no
 *     trong de that, de thoi gian on di dung cho.
 *  3. DUNG PHAN BO DO KHO. Bam theo DIFFICULTY_MIX cua de chuan.
 *
 * Khi ba rang buoc mau thuan nhau, dinh dang thang truoc, roi den ti trong,
 * cuoi cung moi den do kho — vi mot de sai so cau dien la sai cau truc, con
 * mot de lech nhe ve do kho van la mot de dung cau truc.
 */
function pickForSection(
  section: SectionId,
  section3: Section3Choice,
  seed: number,
  /** So thu tu de trong bo, tinh tu 0. Quyet dinh cua so cau duoc lay. */
  offset: number,
): Question[] {
  const spec = SECTIONS.find((s) => s.id === section);
  if (!spec) return [];

  const pool = questionsOf(section, subjectsOf(section3));
  const topics = topicsInScope(section3, TOPICS).filter((t) => t.section === section);
  const random = mulberry32(seed);

  // Chi tieu so cau moi chuyen de theo ti trong, dung phuong phap so du lon nhat.
  const quotas = apportionByWeight(
    topics.map((t) => t.weight),
    spec.questionCount,
  );

  const chosen: Question[] = [];
  const used = new Set<string>();

  /*
   * HAN NGACH CAU DIEN
   *
   * O phan 3, quy che rang buoc theo CHU DE chu khong theo ca phan: moi chu de
   * Ly, Hoa, Sinh phai co it nhat mot cau dien. Vi vay han ngach o day duoc
   * chia theo tung nhom, va mot chu de da du cau dien thi khong nhan them —
   * neu dem tong thi ba cau dien co the don het vao mot chu de.
   *
   * Han ngach con bi cat theo so cau dien ngan hang thuc su co: giu cho nhieu
   * hon so cau ton tai (duong Tieng Anh khong co cau dien nao) se de lai cac
   * cho trong khong bao gio lap day duoc, va de bi thieu cau ma khong bao loi.
   */
  const fillQuota = new Map<string, number>();
  const fillTaken = new Map<string, number>();
  const groupOf = (question: Question): string => question.subject ?? section;

  if (section === 'science') {
    for (const subject of FILL_REQUIRED_SUBJECTS) {
      if (!subjectsOf(section3).includes(subject)) continue;
      const available = pool.filter((q) => q.subject === subject && q.format === 'fill').length;
      if (available > 0) fillQuota.set(subject, 1);
    }
  } else {
    const available = pool.filter((q) => q.format === 'fill').length;
    fillQuota.set(section, Math.min(spec.fillCount, available));
  }

  const needFill = [...fillQuota.values()].reduce((n, v) => n + v, 0);
  const takenFillCount = (): number => [...fillTaken.values()].reduce((n, v) => n + v, 0);
  const canTakeFill = (question: Question): boolean =>
    (fillTaken.get(groupOf(question)) ?? 0) < (fillQuota.get(groupOf(question)) ?? 0);
  const noteFill = (question: Question): void => {
    const key = groupOf(question);
    fillTaken.set(key, (fillTaken.get(key) ?? 0) + 1);
  };

  for (const [i, topic] of topics.entries()) {
    const quota = quotas[i] ?? 0;
    const ranked = pool
      .filter((q) => q.topicId === topic.id && !used.has(q.id))
      .sort((a, b) => orderKey(a, random) - orderKey(b, random));

    /*
     * CHIA BAI, KHONG BOC LAI TU DAU
     *
     * Neu moi de deu boc doc lap tu dau danh sach thi mot bo 10 de se lap lai
     * gan het cau — nguoi hoc lam de thu 5 da thuoc dap an, va con so "10 de
     * gan nhat" mat het y nghia. Thay vao do cac de CHIA NHAU ngan hang: moi
     * de bat dau tu mot vi tri khac nhau tren danh sach da xep hang.
     */
    const candidates = dealOrder(ranked, offset, quota, `${section}:${topic.id}`);

    for (const question of candidates) {
      if (chosen.filter((q) => q.topicId === topic.id).length >= quota) break;
      // Giu du cho cho cau dien: khong lay them trac nghiem khi so cho trac
      // nghiem con lai vua du cho phan cau dien chua lay.
      const remaining = spec.questionCount - chosen.length;
      const fillStillNeeded = needFill - takenFillCount();
      if (question.format === 'mcq' && remaining <= fillStillNeeded) continue;
      if (question.format === 'fill' && !canTakeFill(question)) continue;

      chosen.push(question);
      used.add(question.id);
      if (question.format === 'fill') noteFill(question);
    }
  }

  // Bu cho du so cau neu chi tieu chuyen de khong lap day (ngan hang lech).
  if (chosen.length < spec.questionCount) {
    const rest = pool
      .filter((q) => !used.has(q.id))
      .sort((a, b) => orderKey(a, random) - orderKey(b, random));
    for (const question of rest) {
      if (chosen.length >= spec.questionCount) break;
      const fillStillNeeded = needFill - takenFillCount();
      const remaining = spec.questionCount - chosen.length;
      if (question.format === 'mcq' && remaining <= fillStillNeeded) continue;
      if (question.format === 'fill' && !canTakeFill(question)) continue;
      chosen.push(question);
      used.add(question.id);
      if (question.format === 'fill') noteFill(question);
    }
  }

  // Quy che doi moi chu de Ly, Hoa, Sinh phai co it nhat mot cau dien. Han
  // ngach theo chuyen de o tren khong bao dam duoc dieu do, nen phai sua lai
  // o day: chu de nao thieu cau dien thi doi mot cau trac nghiem cua chinh no.
  for (const subject of FILL_REQUIRED_SUBJECTS) {
    if (!subjectsOf(section3).includes(subject)) continue;
    if (chosen.some((q) => q.subject === subject && q.format === 'fill')) continue;

    const replacement = pool.find((q) => q.subject === subject && q.format === 'fill' && !used.has(q.id));
    if (!replacement) continue;
    // Bo cau trac nghiem KHO NHAT cua chu de do: giu lai cac cau de de thi sinh
    // van vao nhip duoc, va cau dien vua them thuong da o muc van dung.
    const dropIndex = chosen.reduce(
      (best, q, i) =>
        q.subject === subject && q.format === 'mcq' && (best < 0 || q.difficulty > (chosen[best]?.difficulty ?? 0))
          ? i
          : best,
      -1,
    );
    if (dropIndex < 0) continue;
    used.delete(chosen[dropIndex]?.id ?? '');
    chosen[dropIndex] = replacement;
    used.add(replacement.id);
    noteFill(replacement);
  }

  // Thu tu trinh bay: de truoc, kho sau. Thi sinh gap cau de o dau de vao nhip,
  // va khong mat thoi gian quy o cau kho khi con nhieu cau de chua lam.
  return chosen.sort((a, b) => a.difficulty - b.difficulty || a.id.localeCompare(b.id));
}

/**
 * Cac chu de bat buoc co cau dien theo quy che.
 *
 * Duong Tieng Anh khong nam trong danh sach nay: ca phan la trac nghiem.
 */
export const FILL_REQUIRED_SUBJECTS = ['physics', 'chemistry', 'biology'] as const;

/**
 * So cau dien cua mot phan trong mot de cu the.
 *
 * Phan 3 khong co mot con so co dinh: no phu thuoc to hop thi sinh chon. Chon
 * Ly — Hoa — Sinh thi co ba cau dien; chon Sinh — Su — Dia thi chi mot; chon
 * Tieng Anh thi khong cau nao. Dung `spec.fillCount` cho moi de la sai.
 */
export function fillQuotaOf(section: SectionId, section3: Section3Choice): number {
  const spec = SECTIONS.find((s) => s.id === section);
  if (!spec) return 0;
  if (section !== 'science') return spec.fillCount;
  return FILL_REQUIRED_SUBJECTS.filter((s) => subjectsOf(section3).includes(s)).length;
}

/**
 * Thu tu uu tien cua ngan hang mot chuyen de cho de thu `offset` trong bo.
 *
 * Hai cach hien nhien deu that bai khi ngan hang nho hon nhieu so voi tong
 * nhu cau cua ca bo, va ca hai deu da duoc do bang so:
 *
 *  - CAT KHOI (de thu n lay doan bat dau tu n x han ngach): cac khoi phai
 *    cuon vong nhieu lan nen co cap de chong nhau toi 94%.
 *  - DAN XEN THEO CAP SO CONG: hai de co hieu chi so bang mot buoc nhay se
 *    lech nhau dung mot vi tri, cung cho ket qua chong nhau tren 90%.
 *
 * Cach dung o day la CHIA THEO MUC DA DUNG. Ca muoi de duoc chia cung mot
 * luc: den luot de nao, no lay cac cau DANG DUOC DUNG IT NHAT. Nho vay so
 * lan tai su dung duoc san deu tren toan ngan hang, va phan chung giua hai
 * de bat ky tien ve muc thap nhat ma kich thuoc ngan hang cho phep.
 *
 * Khi hai cau co cung so lan da dung, thu tu duoc pha the bang mot khoa bam
 * theo tung de. Neu pha the bang chinh thu hang cua cau thi cac de lai gom
 * thanh tung khoi lien tiep va bai toan quay ve diem xuat phat.
 */
export function dealOrder<T extends { id: string }>(
  ranked: readonly T[],
  offset: number,
  quota: number,
  seriesKey: string,
): T[] {
  if (ranked.length === 0 || quota <= 0) return [...ranked];

  const usage = new Array<number>(ranked.length).fill(0);
  let result: T[] = [...ranked];

  for (let paper = 0; paper < PAPERS_PER_SERIES; paper += 1) {
    const order = ranked
      .map((item, index) => ({ item, index }))
      .sort((a, b) => {
        const byUsage = (usage[a.index] ?? 0) - (usage[b.index] ?? 0);
        if (byUsage !== 0) return byUsage;
        // Pha the on dinh nhung khac nhau giua cac de, de chung khong gom
        // thanh tung khoi lien tiep tren ngan hang.
        return (
          hashSeed(`${seriesKey}:${paper}:${a.item.id}`) - hashSeed(`${seriesKey}:${paper}:${b.item.id}`)
        );
      });

    for (let i = 0; i < Math.min(quota, order.length); i += 1) {
      const entry = order[i];
      if (entry) usage[entry.index] = (usage[entry.index] ?? 0) + 1;
    }
    if (paper === offset) result = order.map((entry) => entry.item);
  }

  return result;
}

/** Khoa sap xep on dinh: uu tien do kho gan phan bo chuan, pha the bang hat giong. */
function orderKey(question: Question, random: () => number): number {
  const target = DIFFICULTY_MIX[question.difficulty] ?? 0;
  return -target + random() * 0.001;
}

/** Phan bo theo trong so bang phuong phap so du lon nhat (Hare). */
export function apportionByWeight(weights: readonly number[], total: number): number[] {
  const sum = weights.reduce((n, w) => n + w, 0);
  if (sum <= 0 || weights.length === 0) return weights.map(() => 0);

  const exact = weights.map((w) => (w / sum) * total);
  const base = exact.map((x) => Math.floor(x));
  let left = total - base.reduce((n, x) => n + x, 0);

  const order = exact
    .map((x, i) => ({ i, frac: x - Math.floor(x) }))
    .sort((a, b) => b.frac - a.frac || a.i - b.i);

  for (const entry of order) {
    if (left <= 0) break;
    base[entry.i] = (base[entry.i] ?? 0) + 1;
    left -= 1;
  }
  return base;
}

const CACHE = new Map<string, Paper>();

/** Dung de mau tu ma de. Ket qua duoc nho lai — cung ma luon cho cung de. */
export function buildPaper(code: string): Paper | null {
  const cached = CACHE.get(code);
  if (cached) return cached;

  const parsed = parsePaperCode(code);
  if (!parsed) return null;
  const { series: spec, index } = parsed;

  const sections: PaperSection[] = [];
  const items: PaperItem[] = [];
  let number = 0;

  for (const sectionSpec of SECTIONS) {
    // Hat giong bam theo BO chu khong theo tung de: nho vay thu tu xep hang
    // cua ngan hang giu nguyen giua cac de, va viec chia bai moi tach duoc
    // chung ra. Doi hat giong theo tung de se lam cac cua so trung lap lai.
    const seed = hashSeed(`${spec.code}:${sectionSpec.id}`);
    const questions = pickForSection(sectionSpec.id, spec.section3, seed, index - 1);

    const sectionItems: PaperItem[] = questions.map((question, i) => {
      number += 1;
      return {
        number,
        numberInSection: i + 1,
        section: sectionSpec.id,
        question,
        topicName: TOPICS.find((t) => t.id === question.topicId)?.name ?? question.topicId,
        points: 1,
      };
    });

    items.push(...sectionItems);
    sections.push({
      section: sectionSpec.id,
      name: sectionSpec.name,
      officialName: sectionSpec.officialName,
      minutes: sectionSpec.minutes,
      items: sectionItems,
      maxScore: sectionItems.reduce((n, it) => n + it.points, 0),
    });
  }

  const paper: Paper = {
    spec,
    sections,
    items,
    matrix: buildMatrix(items),
    totalQuestions: items.length,
    maxScore: items.reduce((n, it) => n + it.points, 0),
    totalMinutes: SECTIONS.reduce((n, s) => n + s.minutes, 0),
  };

  CACHE.set(code, paper);
  return paper;
}

/** Ma tran de: so cau moi chuyen de theo tung muc do kho. */
export function buildMatrix(items: readonly PaperItem[]): MatrixRow[] {
  const rows = new Map<string, MatrixRow>();

  for (const item of items) {
    const key = item.question.topicId;
    let row = rows.get(key);
    if (!row) {
      row = {
        topicId: key,
        topicName: item.topicName,
        section: item.section,
        byDifficulty: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        total: 0,
      };
      rows.set(key, row);
    }
    const counts = row.byDifficulty as Record<Difficulty, number>;
    counts[item.question.difficulty] += 1;
    row.total += 1;
  }

  const order = SECTIONS.map((s) => s.id);
  return [...rows.values()].sort(
    (a, b) => order.indexOf(a.section) - order.indexOf(b.section) || b.total - a.total,
  );
}

/* ── Barem ─────────────────────────────────────────────────────────────── */

export interface ScoreBand {
  min: number;
  label: string;
  note: string;
}

/**
 * Thang xep loai theo diem tong.
 *
 * Cac moc lay theo pho diem thuc te cua ky thi HSA: phan lon thi sinh nam
 * trong khoang 75–100, va moc 100 la nguong xet tuyen cua nhieu truong.
 */
export const SCORE_BANDS: readonly ScoreBand[] = [
  { min: 120, label: 'Xuất sắc', note: 'Đủ sức cạnh tranh ở các ngành và trường lấy điểm cao nhất.' },
  { min: 100, label: 'Giỏi', note: 'Vượt ngưỡng xét tuyển của phần lớn trường dùng kết quả HSA.' },
  { min: 85, label: 'Khá', note: 'Còn dư địa rõ ràng: tập trung vào phần yếu nhất sẽ lên nhanh.' },
  { min: 70, label: 'Trung bình', note: 'Cần củng cố nền ở ít nhất một phần thi trước khi luyện tốc độ.' },
  { min: 0, label: 'Cần xây lại nền', note: 'Ưu tiên phiếu lý thuyết và phiếu dạng bài, chưa vội luyện đề.' },
];

export function bandOf(score: number): ScoreBand {
  return SCORE_BANDS.find((b) => score >= b.min) ?? (SCORE_BANDS.at(-1) as ScoreBand);
}

export interface BaremRule {
  rule: string;
  detail: string;
}

/**
 * Barem cham cua ca de.
 *
 * HSA cham deu MOI CAU 1 DIEM va khong tru diem cau sai. Dieu nay co hai he
 * qua ma barem phai noi ro, vi chung doi nguoc lai chien thuat lam bai so voi
 * cac ky thi co tru diem:
 *   - Bo trong khong bao gio loi hon doan.
 *   - Mot cau kho va mot cau de dang gia nhu nhau, nen quy o cau kho la lo.
 */
export const BAREM_RULES: readonly BaremRule[] = [
  {
    rule: 'Mỗi câu đúng được 1 điểm. Tổng 150 câu tương ứng thang 150 điểm.',
    detail:
      'Không có câu nào nặng điểm hơn câu nào, kể cả câu khó nhất. Hệ quả trực tiếp: quỳ ở một câu khó để mất thời gian của ba câu dễ là lỗ nặng.',
  },
  {
    rule: 'Câu sai và câu bỏ trống đều 0 điểm. Không trừ điểm.',
    detail:
      'Vì không bị trừ, bỏ trống không bao giờ lợi hơn đoán. Nguyên tắc trong phòng thi: không được để trống bất kỳ câu nào khi hết giờ.',
  },
  {
    rule: 'Câu điền đáp án chấm theo dạng chuẩn hóa, chấp nhận các biến thể tương đương.',
    detail:
      'Ví dụ 0,5 và 0.5 và 1/2 được tính như nhau. Nhưng sai đơn vị hoặc thừa chữ thì vẫn sai — hãy điền đúng dạng đề yêu cầu.',
  },
  {
    rule: 'Ba phần thi chấm độc lập, mỗi phần tối đa 50 điểm.',
    detail:
      'Điểm thành phần cho biết nên đổ công sức vào đâu chính xác hơn điểm tổng rất nhiều. Hai thí sinh cùng 100 điểm có thể cần hai lộ trình hoàn toàn khác nhau.',
  },
  {
    rule: 'Thời gian tính riêng cho từng phần: 75 — 60 — 60 phút, không cộng dồn.',
    detail:
      'Làm nhanh phần Toán không cho thêm phút nào cho phần Văn. Vì vậy phải phân bổ thời gian trong nội bộ từng phần chứ không phân bổ cho cả bài.',
  },
];
