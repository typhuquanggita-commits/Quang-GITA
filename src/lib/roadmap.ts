import { MAX_SECTION_SCORE, MAX_TOTAL_SCORE, SECTIONS } from '../config';
import { STAGES } from '../data/curriculum';
import { TOPICS } from '../data/topics';
import type { PersistedState, SectionId, Topic } from '../types';
import { expectedAccuracy } from './ability';
import { masteryToAbility } from './analytics';
import { daysUntil } from './format';
import { topicsInScope } from './section3';

/**
 * LO TRINH CA NHAN HOA
 *
 * Cau hoi ma tep nay tra loi: "Toi dang o dau, muc tieu cua toi co dat duoc
 * trong quy thoi gian nay khong, va gio hoc tiep theo nen dat vao dau?"
 *
 * Ba nguyen tac lam nen su khac biet so voi mot 'lo trinh' viet tay:
 *
 *  1. MOI CON SO DEU TRUY NGUOC DUOC. Diem du bao di qua dung mot chuoi:
 *     do thanh thao → nang luc theta → ti le dung ky vong tren phan bo do kho
 *     chuan → diem tren thang 50 moi phan. Khong co he so tuy y nao duoc them
 *     vao giua chuoi do.
 *
 *  2. PHAN BO GIO THEO LOI ICH BIEN, KHONG THEO CAM TINH. Moi gio hoc duoc
 *     dat vao chuyen de dang cho ra NHIEU DIEM NHAT CHO GIO DO. Vi hoc tap co
 *     loi ich giam dan, chuyen de yeu nhat khong phai luc nao cung la cho dang
 *     dau tu nhat — chuyen de co trong so lon trong de va con nhieu du dia moi
 *     la. Thuat toan tham lam theo loi ich bien tra loi dung cau hoi do.
 *
 *  3. NOI THAT KHI MUC TIEU KHONG KHA THI. Neu voi nhip hoc hien tai, quy thoi
 *     gian con lai khong du de cham muc tieu, he thong noi thang dieu do va
 *     dua ra hai lua chon co that: tang nhip len bao nhieu, hoac ha muc tieu
 *     xuong muc nao. Mot lo trinh hua hen dieu khong xay ra la mot lo trinh co
 *     hai — nguoi hoc chi phat hien ra su that vao dung ngay thi.
 */

/**
 * Muc thanh thao tran.
 *
 * Khong ai dung 100% o moi muc do kho, ke ca thu khoa. 0,96 tuong ung diem
 * tiem can khoang 143/150 khi moi chuyen de deu cham tran — cao hon moi ket
 * qua tung ghi nhan, nen tran nay khong phai la thu chan nguoi hoc lai.
 */
export const MASTERY_CEILING = 0.96;

/**
 * Nguong "muc tieu cao hon pho diem thuc te".
 *
 * Diem cao nhat cua HSA cac mua gan day nam trong khoang 125–135 tren thang
 * 150. Dat muc tieu tren nguong nay khong bi cam, nhung phai duoc noi ro la
 * cao hon nhom dan dau — de nguoi hoc chon co y thuc chu khong chon nham.
 */
export const AMBITIOUS_TARGET = 135;

/**
 * Hang so thoi gian cua duong hoc tap, tinh bang gio moi chuyen de.
 *
 * Sau `LEARNING_TAU` gio dau tu vao mot chuyen de, khoang cach toi tran duoc
 * thu hep khoang 63%. Con so nay duoc chon de mot chuyen de di tu muc trung
 * binh len muc kha can khoang 10–12 gio — dung voi nhip thuc te cua nguoi hoc
 * lop 12 hoc mot chuyen de tu con so 0 den lam duoc de.
 */
export const LEARNING_TAU = 11;

/** Cac quy thoi gian on thi ma he thong ho tro. */
export interface HorizonSpec {
  id: '6m' | '8m' | '12m';
  weeks: number;
  name: string;
  note: string;
}

export const HORIZONS: readonly HorizonSpec[] = [
  {
    id: '6m',
    weeks: 26,
    name: '6 tháng',
    note: 'Nhịp gấp. Phù hợp khi nền đã khá và cần dồn sức cho kỹ năng làm đề.',
  },
  {
    id: '8m',
    weeks: 32,
    name: '8 tháng',
    note: 'Nhịp chuẩn của một mùa thi. Đủ chỗ cho cả xây nền lẫn luyện đề.',
  },
  {
    id: '12m',
    weeks: 52,
    name: '12 tháng',
    note: 'Nhịp thong thả. Phù hợp khi bắt đầu từ lớp 11 hoặc nền còn mỏng.',
  },
];

export const HORIZON_BY_ID = new Map(HORIZONS.map((h) => [h.id, h]));

/** Quy thoi gian suy tu ngay thi; chua dat ngay thi thi lay nhip chuan. */
export function horizonFor(daysLeft: number | null): HorizonSpec {
  const fallback = HORIZON_BY_ID.get('8m') as HorizonSpec;
  if (daysLeft === null) return fallback;
  const weeksLeft = Math.max(1, Math.ceil(daysLeft / 7));
  // Chon quy gan nhat tu tren xuong: con 20 tuan thi van la nhip 6 thang.
  const sorted = [...HORIZONS].sort((a, b) => a.weeks - b.weeks);
  return sorted.find((h) => weeksLeft <= h.weeks) ?? (sorted[sorted.length - 1] as HorizonSpec);
}

/**
 * Do thanh thao dat duoc sau `hours` gio dau tu, xuat phat tu `from`.
 *
 * Duong cong bao hoa: tien bo nhanh o dau va cham dan khi tien gan tran. Day
 * la hinh dang duoc quan sat o hau het viec hoc ky nang, va no la ly do vi sao
 * dau tu dan deu nhieu chuyen de yeu cho nhieu diem hon la don het vao mot.
 */
export function masteryAfterHours(from: number, hours: number): number {
  const start = Math.min(MASTERY_CEILING, Math.max(0, from));
  return MASTERY_CEILING - (MASTERY_CEILING - start) * Math.exp(-Math.max(0, hours) / LEARNING_TAU);
}

/** Diem cua mot phan tu do thanh thao trung binh co trong so cua phan do. */
export function sectionScore(weightedMastery: number): number {
  return expectedAccuracy(masteryToAbility(weightedMastery)) * MAX_SECTION_SCORE;
}

interface TopicState {
  topic: Topic;
  /** Trong so cua chuyen de trong phan cua no (tong = 1 moi phan). */
  weight: number;
  mastery: number;
  hours: number;
}

/** Diem toan bai suy tu trang thai tung chuyen de. */
function totalScore(states: readonly TopicState[]): number {
  let total = 0;
  for (const spec of SECTIONS) {
    const mine = states.filter((s) => s.topic.section === spec.id);
    const weight = mine.reduce((n, s) => n + s.weight, 0);
    if (weight <= 0) continue;
    const weighted = mine.reduce((n, s) => n + s.mastery * s.weight, 0) / weight;
    total += sectionScore(weighted);
  }
  return total;
}

export interface RoadmapAllocation {
  topicId: string;
  topicName: string;
  section: SectionId;
  /** Gio dau tu duoc phan bo cho ca quy thoi gian. */
  hours: number;
  masteryNow: number;
  masteryAfter: number;
  /** So diem toan bai tang them nho phan gio nay. */
  gainPoints: number;
  /** Thu tu uu tien: 1 la chuyen de nen dat gio vao truoc nhat. */
  priority: number;
}

export interface RoadmapCheckpoint {
  week: number;
  label: string;
  /** Diem ky vong tai moc nay neu di dung nhip. */
  expectedScore: number;
  /** Viec phai lam de xac nhan dang dung nhip — luon la mot viec do duoc. */
  verify: string;
}

export interface RoadmapPhase {
  stage: number;
  name: string;
  purpose: string;
  weeks: readonly [number, number];
  /** Ti le quy gio cua ca mua danh cho giai doan nay. */
  hoursShare: number;
  hours: number;
}

export interface Roadmap {
  horizon: HorizonSpec;
  /** Gio hoc moi tuan lay tu nhip nguoi hoc dat trong Cai dat. */
  weeklyHours: number;
  totalHours: number;
  targetScore: number;
  scoreNow: number;
  /** Diem du bao khi hoan thanh lo trinh voi nhip hien tai. */
  scoreProjected: number;
  /** Muc tieu co dat duoc voi nhip hien tai khong. */
  feasible: boolean;
  /** Gio moi tuan CAN CO de cham muc tieu. Null khi muc tieu ngoai tam voi. */
  requiredWeeklyHours: number | null;
  /** Diem cao nhat co the cham trong quy thoi gian nay, du hoc het suc. */
  ceilingScore: number;
  allocations: readonly RoadmapAllocation[];
  phases: readonly RoadmapPhase[];
  checkpoints: readonly RoadmapCheckpoint[];
}

/**
 * Ti le quy gio cho tung giai doan.
 *
 * Giai doan Nen tang nhan nhieu gio nhat vi day la luc kien thuc con thung.
 * Giai doan But pha nhan it gio hon nhung gio o do dat hon — chu yeu la de
 * tong hop, nen so gio it khong co nghia la nhe.
 */
const PHASE_SHARE: Readonly<Record<number, number>> = { 1: 0.4, 2: 0.35, 3: 0.25 };

/** Buoc phan bo: moi lan dat mot gio vao chuyen de dang loi nhat. */
const ALLOCATION_STEP = 1;

/**
 * Nhip hoc cao nhat con ben vung duoc: 3 gio moi ngay.
 *
 * Cao hon muc nay thi hoc sinh dang di hoc chinh khoa khong giu duoc qua vai
 * tuan, nen lay no lam tran de tinh "diem cao nhat quy thoi gian nay cho
 * phep". Neu nguoi hoc tu dat nhip cao hon thi lay chinh nhip cua ho.
 */
export const MAX_SUSTAINABLE_WEEKLY_HOURS = 21;

export interface RoadmapInput {
  state: PersistedState;
  now?: Date;
  /** Gio hoc moi tuan; mac dinh suy tu nhip hang ngay trong Cai dat. */
  weeklyHours?: number;
  /** Ep mot quy thoi gian cu the thay vi suy tu ngay thi. */
  horizonId?: HorizonSpec['id'];
}

/**
 * Nhip hoc moi tuan suy tu muc tieu so cau moi ngay.
 *
 * Quy doi: moi cau tren de that duoc cap 78 giay (195 phut / 150 cau), va moi
 * cau lam xong con can chung ay thoi gian nua de chua va ghi lai. He so 2 nay
 * la phan bi bo qua nhieu nhat khi nguoi hoc uoc luong thoi gian cua minh.
 */
export function weeklyHoursFromGoal(dailyQuestions: number): number {
  const secondsPerQuestion = (195 * 60) / 150;
  const minutesPerDay = (dailyQuestions * secondsPerQuestion * 2) / 60;
  return Math.round(((minutesPerDay * 7) / 60) * 10) / 10;
}

export function buildRoadmap(input: RoadmapInput): Roadmap {
  const { state } = input;
  const now = input.now ?? new Date();
  const horizon =
    (input.horizonId ? HORIZON_BY_ID.get(input.horizonId) : undefined) ??
    horizonFor(state.settings.examDate ? daysUntil(state.settings.examDate, now) : null);

  const weeklyHours = input.weeklyHours ?? weeklyHoursFromGoal(state.settings.dailyGoal);
  const totalHours = Math.round(weeklyHours * horizon.weeks);

  const relevant = topicsInScope(state.settings.section3, TOPICS);
  const states: TopicState[] = relevant.map((topic) => ({
    topic,
    weight: topic.weight,
    mastery: state.mastery[topic.id]?.mastery ?? 0.5,
    hours: 0,
  }));

  const scoreNow = totalScore(states);

  /*
   * MOT LAN CHAY, TRA LOI DUOC CA BA CAU HOI
   *
   * Phan bo tham lam theo loi ich bien: moi vong lap dat mot gio vao chuyen de
   * dang cho nhieu diem nhat cho chinh gio do.
   *
   * Hai toi uu lam ham nay dung duoc voi quy gio lon:
   *
   *  1. Loi ich bien tinh trong thoi gian hang so. Diem cua mot phan chi phu
   *     thuoc do thanh thao TRUNG BINH CO TRONG SO cua phan do, nen chi can
   *     cap nhat mot tong thay vi dung lai ca bang diem cho tung ung vien.
   *
   *  2. Chay MOT LAN toi tran roi ghi lai duong diem theo so gio. Nho duong
   *     nay ma ba cau hoi — diem voi nhip hien tai, diem toi da cua quy, va
   *     nhip toi thieu de cham muc tieu — deu tra loi duoc bang tra cuu, thay
   *     vi chay lai phep phan bo hai chuc lan.
   *
   * Ba con so vi vay luon nhat quan voi nhau: chung den tu cung mot lan chay.
   */
  const ceilingWeeklyHours = Math.max(MAX_SUSTAINABLE_WEEKLY_HOURS, weeklyHours);
  const ceilingHours = Math.round(ceilingWeeklyHours * horizon.weeks);
  const budget = Math.max(totalHours, ceilingHours);

  const working = states.map((entry) => ({ ...entry }));
  const weighted = new Map<SectionId, number>();
  const weights = new Map<SectionId, number>();
  for (const entry of working) {
    weighted.set(entry.topic.section, (weighted.get(entry.topic.section) ?? 0) + entry.mastery * entry.weight);
    weights.set(entry.topic.section, (weights.get(entry.topic.section) ?? 0) + entry.weight);
  }
  const scoreOf = (section: SectionId, sum: number): number => {
    const weight = weights.get(section) ?? 0;
    return weight > 0 ? sectionScore(sum / weight) : 0;
  };

  // curve[h] = diem toan bai sau khi da dat h gio. curve[0] la diem hien tai.
  const curve: number[] = [scoreNow];
  let current = scoreNow;
  let planned: TopicState[] = working.map((entry) => ({ ...entry }));

  for (let spent = 0; spent < budget; spent += ALLOCATION_STEP) {
    let best = -1;
    let bestGain = 0;
    let bestMastery = 0;

    for (const [i, entry] of working.entries()) {
      const section = entry.topic.section;
      const sum = weighted.get(section) ?? 0;
      const next = masteryAfterHours(entry.mastery, ALLOCATION_STEP);
      const gain = scoreOf(section, sum + (next - entry.mastery) * entry.weight) - scoreOf(section, sum);
      if (gain > bestGain) {
        bestGain = gain;
        best = i;
        bestMastery = next;
      }
    }
    // Khong con chuyen de nao cho them diem: dung lai thay vi dot gio.
    if (best < 0) break;

    const entry = working[best] as TopicState;
    const section = entry.topic.section;
    weighted.set(section, (weighted.get(section) ?? 0) + (bestMastery - entry.mastery) * entry.weight);
    entry.mastery = bestMastery;
    entry.hours += ALLOCATION_STEP;
    current += bestGain;
    curve.push(current);
    if (curve.length - 1 === totalHours) planned = working.map((e) => ({ ...e }));
  }

  const scoreAt = (hours: number): number =>
    curve[Math.min(curve.length - 1, Math.max(0, Math.round(hours)))] ?? scoreNow;

  const scoreProjected = scoreAt(totalHours);
  const ceilingScore = scoreAt(ceilingHours);
  const targetScore = Math.min(MAX_TOTAL_SCORE, state.settings.targetScore);
  const feasible = scoreProjected >= targetScore;

  /*
   * Nhip moi tuan toi thieu de cham muc tieu.
   *
   * Tra ve `null` khi muc tieu nam ngoai tran cua quy thoi gian — day la mot
   * cau tra loi that va can duoc noi ra, khong duoc lam tron thanh mot con so
   * de nghe hon.
   */
  const hoursNeeded = curve.findIndex((score) => score >= targetScore);
  const requiredWeeklyHours =
    targetScore > ceilingScore || hoursNeeded < 0
      ? null
      : Math.round((hoursNeeded / horizon.weeks) * 10) / 10;

  const allocations: RoadmapAllocation[] = planned
    .map((entry, i) => {
      const base = states[i] as TopicState;
      return {
        topicId: entry.topic.id,
        topicName: entry.topic.name,
        section: entry.topic.section,
        hours: entry.hours,
        masteryNow: base.mastery,
        masteryAfter: entry.mastery,
        gainPoints: gainOf(states, i, entry.hours),
        priority: 0,
      };
    })
    .filter((a) => a.hours > 0)
    .sort((a, b) => b.gainPoints - a.gainPoints)
    .map((a, i) => ({ ...a, priority: i + 1 }));

  return {
    horizon,
    weeklyHours,
    totalHours,
    targetScore,
    scoreNow,
    scoreProjected,
    feasible,
    requiredWeeklyHours,
    ceilingScore,
    allocations,
    phases: buildPhases(horizon, totalHours),
    checkpoints: buildCheckpoints(horizon, scoreNow, scoreProjected),
  };
}

/** Diem tang them neu chi rieng chuyen de thu `index` duoc dau tu `hours` gio. */
function gainOf(states: readonly TopicState[], index: number, hours: number): number {
  const before = totalScore(states);
  const after = totalScore(
    states.map((s, j) => (j === index ? { ...s, mastery: masteryAfterHours(s.mastery, hours) } : s)),
  );
  return after - before;
}

function buildPhases(horizon: HorizonSpec, totalHours: number): RoadmapPhase[] {
  const phases: RoadmapPhase[] = [];
  let cursor = 1;
  for (const [i, stage] of STAGES.entries()) {
    const share = PHASE_SHARE[stage.stage] ?? 1 / STAGES.length;
    const last = i === STAGES.length - 1;
    const length = last ? horizon.weeks - cursor + 1 : Math.round(horizon.weeks * share);
    const to = last ? horizon.weeks : cursor + length - 1;
    phases.push({
      stage: stage.stage,
      name: stage.name,
      purpose: stage.purpose,
      weeks: [cursor, to],
      hoursShare: share,
      hours: Math.round(totalHours * share),
    });
    cursor = to + 1;
  }
  return phases;
}

/**
 * Cac moc kiem tra giua duong.
 *
 * Y nghia cua moc khong phai la de chuc mung, ma de PHAT HIEN LECH NHIP SOM.
 * Moi moc kem mot diem ky vong: den tuan do ma diem thap hon dang ke thi van
 * con thoi gian de sua, con phat hien vao tuan cuoi thi khong.
 */
function buildCheckpoints(horizon: HorizonSpec, scoreNow: number, scoreEnd: number): RoadmapCheckpoint[] {
  const marks: ReadonlyArray<{ at: number; label: string; verify: string }> = [
    {
      at: 0,
      label: 'Định vị đầu vào',
      verify: 'Làm bài định vị 36 câu để có cấp độ khởi điểm cho từng chuyên đề.',
    },
    {
      at: 0.25,
      label: 'Chốt nền tảng',
      verify: 'Mọi chuyên đề đạt tối thiểu cấp 2; không còn chuyên đề nào chưa từng luyện.',
    },
    {
      at: 0.5,
      label: 'Đề mô phỏng lần 1',
      verify: 'Làm trọn một đề mẫu 150 câu đúng giờ, đối chiếu điểm với mốc kỳ vọng.',
    },
    {
      at: 0.75,
      label: 'Đề mô phỏng lần 2',
      verify: 'Điểm không thấp hơn lần 1, và số câu bỏ trống bằng 0.',
    },
    {
      at: 0.92,
      label: 'Sát hạch chứng chỉ HSA365',
      verify: 'Đạt bậc chứng chỉ tương ứng mục tiêu, đủ cả điểm tổng lẫn điểm từng phần.',
    },
    {
      at: 1,
      label: 'Tuần trước ngày thi',
      verify: 'Giữ nhịp nhẹ, chỉ ôn sổ tay lỗi sai và ngủ đủ. Không học kiến thức mới.',
    },
  ];

  return marks.map((mark) => ({
    week: Math.max(1, Math.round(horizon.weeks * mark.at)),
    label: mark.label,
    // Diem ky vong noi suy tuyen tinh theo tien do — du chinh xac de phat hien
    // lech nhip, va khong gia vo chinh xac hon the.
    expectedScore: scoreNow + (scoreEnd - scoreNow) * mark.at,
    verify: mark.verify,
  }));
}
