import { STAGES } from './curriculum';
import type { GitaPillarId, SectionId, WorksheetKind } from '../types';

/**
 * DE CUONG TRON MUA THI
 *
 * He thong da co 2000 phieu, kho bi kip, de mau va lo trinh sinh theo ngay.
 * Nhung mot nguoi hoc mo ung dung lan dau van hoi mot cau ma khong man hinh
 * nao tra loi duoc: "TU GIO DEN NGAY THI, TOI SE DI QUA NHUNG GI?"
 *
 * Lo trinh theo ngay tra loi "hom nay lam gi". De cuong tra loi cau khac han:
 * ca chang duong trong duoc nhu the nao. Hai cau nay phuc vu hai nhu cau khac
 * nhau, va thieu cau thu hai thi nguoi hoc song trong mot chuoi viec vat khong
 * co hinh dang — trang thai khien nguoi ta bo cuoc du van dang tien bo.
 *
 * Ngoai ra de cuong con la thu GIA DINH doc duoc. Mot phu huynh khong doc noi
 * bang nang luc Rasch nhung doc duoc mot bang 32 tuan, va do la thu ho can de
 * tin rang co mot ke hoach that.
 *
 * CAU TRUC: 32 tuan (8 thang), chia ba giai doan khop voi STAGES da co. Moi
 * tuan la mot don vi tron ven co muc tieu, viec hoc, viec luyen va cach tu
 * kiem — chu khong phai mot o lich trong de dien bai vao.
 */

export const SEASON_WEEKS = 32;

export interface SyllabusWeek {
  week: number;
  /** Giai doan 1..3, khop voi STAGES. */
  stage: number;
  title: string;
  /** Muc tieu cua tuan, viet o dang KET QUA quan sat duoc. */
  goal: string;
  /** Phan thi duoc uu tien trong tuan. */
  focus: readonly SectionId[];
  /** Loai phieu chiem trong tam tuan nay. */
  kinds: readonly WorksheetKind[];
  /** Tru cot GITA duoc ren trong tuan. */
  pillar: GitaPillarId;
  /** Cach tu kiem cuoi tuan — luon la mot viec lam duoc, khong phai cam giac. */
  checkpoint: string;
  /** Cot moc lon, chi co o mot so tuan. */
  milestone?: string;
}

export interface SyllabusPhase {
  stage: number;
  name: string;
  weeks: readonly [number, number];
  purpose: string;
  /** Sai lam dac trung cua giai doan nay. */
  trap: string;
  /** Dau hieu cho thay da san sang sang giai doan sau. */
  exit: string;
}

export const SYLLABUS_PHASES: readonly SyllabusPhase[] = [
  {
    stage: 1,
    name: 'Nền tảng',
    weeks: [1, 12],
    purpose:
      'Phủ kín kiến thức và bịt lỗ hổng. Mục tiêu của ba tháng này không phải điểm cao, mà là không còn chuyên đề nào bạn thấy hoàn toàn xa lạ.',
    trap: 'Nôn nóng luyện đề khi nền chưa đủ. Làm đề khi chưa có nền cho ra một chuỗi điểm thấp lặp lại, và điều đó bào mòn động lực nhanh hơn bất cứ thứ gì.',
    exit: 'Mọi tuyến chuyên đề đã lên ít nhất cấp 2, và bạn đọc một đề bất kỳ mà không gặp dạng nào chưa từng thấy.',
  },
  {
    stage: 2,
    name: 'Tăng tốc',
    weeks: [13, 24],
    purpose:
      'Chuyển từ "biết cách làm" sang "làm được trong thời gian cho phép". Đây là giai đoạn dài nhất và cũng là nơi điểm số tăng nhanh nhất.',
    trap: 'Chỉ luyện phần mình mạnh vì nó cho cảm giác dễ chịu. Điểm tổng bị kéo xuống bởi phần yếu nhất, không phải bởi phần mạnh nhất.',
    exit: 'KPI giai đoạn đạt từ 85%, và tốc độ làm bài đã bám sát thời gian mục tiêu của từng câu.',
  },
  {
    stage: 3,
    name: 'Bứt phá',
    weeks: [25, 32],
    purpose:
      'Mô phỏng phòng thi và giữ phong độ. Tám tuần cuối không còn là học thêm kiến thức mới, mà là làm cho những gì đã có hoạt động dưới áp lực.',
    trap: 'Học kiến thức mới vào tuần cuối. Kiến thức nạp trong hai tuần cuối gần như không kịp chuyển thành kỹ năng, trong khi nó lấy mất thời gian của việc ôn lại thứ đã gần thành thạo.',
    exit: 'Ba đề mô phỏng liên tiếp dao động dưới 8 điểm — dấu hiệu phong độ đã ổn định, không còn may rủi.',
  },
];

/**
 * Ba mươi hai tuan.
 *
 * Sinh tu dac ta thay vi go tay 32 muc, cung ly do voi 2000 phieu: khi doi
 * cau truc mua thi (vi du rut con 24 tuan), toan bo de cuong tu dieu chinh
 * thay vi phai sua tay 32 cho va chac chan bo sot.
 *
 * Nhung phan NOI DUNG cua tung tuan — muc tieu, cach tu kiem, cot moc — thi
 * duoc viet tay, vi do la phan mang y nghia su pham va khong sinh may moc duoc.
 */
interface WeekSpec {
  from: number;
  to: number;
  stage: number;
  title: string;
  goal: string;
  focus: readonly SectionId[];
  kinds: readonly WorksheetKind[];
  pillar: GitaPillarId;
  checkpoint: string;
}

const SPECS: readonly WeekSpec[] = [
  {
    from: 1, to: 2, stage: 1,
    title: 'Định vị và dựng nhịp',
    goal: 'Biết chính xác mình đang ở đâu trên cả 30 chuyên đề, và có một khung giờ học cố định trong ngày.',
    focus: ['quantitative', 'qualitative', 'science'],
    kinds: ['theory'],
    pillar: 'goal',
    checkpoint: 'Hoàn thành bài định vị đầu vào và học đủ 5 ngày trong tuần, dù buổi ngắn.',
  },
  {
    from: 3, to: 6, stage: 1,
    title: 'Phủ kiến thức phần Toán',
    goal: 'Không còn chuyên đề Toán nào bạn thấy hoàn toàn xa lạ khi đọc đề.',
    focus: ['quantitative'],
    kinds: ['theory', 'patterns'],
    pillar: 'talent',
    checkpoint: 'Đọc một đề Toán bất kỳ và gọi tên được dạng bài của ít nhất 8 trong 10 câu.',
  },
  {
    from: 7, to: 9, stage: 1,
    title: 'Phủ kiến thức phần Ngôn ngữ',
    goal: 'Nắm được cách đọc một văn bản nghị luận và nhận diện được các biện pháp tu từ thường gặp.',
    focus: ['qualitative'],
    kinds: ['theory', 'patterns'],
    pillar: 'talent',
    checkpoint: 'Làm một chùm đọc hiểu 5 câu và chỉ được ra câu trong bài làm căn cứ cho từng đáp án.',
  },
  {
    from: 10, to: 12, stage: 1,
    title: 'Phủ kiến thức phần Khoa học',
    goal: 'Hoàn thành vòng phủ kiến thức cho môn tự chọn đã đăng ký.',
    focus: ['science'],
    kinds: ['theory', 'patterns'],
    pillar: 'talent',
    checkpoint: 'Mọi tuyến chuyên đề của môn tự chọn đã lên ít nhất cấp 2.',
  },
  {
    from: 13, to: 16, stage: 2,
    title: 'Phương pháp và quy trình',
    goal: 'Làm đúng quy trình thay vì làm theo cảm giác. Mỗi dạng bài có một đường lối rõ ràng.',
    focus: ['quantitative', 'qualitative'],
    kinds: ['method'],
    pillar: 'action',
    checkpoint: 'Với mỗi dạng bài đã học, nói được ba bước đầu tiên mà không cần nhìn phiếu.',
  },
  {
    from: 17, to: 20, stage: 2,
    title: 'Luyện tốc độ',
    goal: 'Thời gian làm mỗi câu bám sát thời gian mục tiêu. Đây là lúc kiến thức chuyển thành kỹ năng.',
    focus: ['quantitative', 'qualitative', 'science'],
    kinds: ['method', 'advanced'],
    pillar: 'action',
    checkpoint: 'Trên phiếu ôn thi, thời gian trung bình mỗi câu không vượt quá 120% thời gian mục tiêu.',
  },
  {
    from: 21, to: 24, stage: 2,
    title: 'Dồn sức vào vùng 20/80',
    goal: 'Toàn bộ công sức rơi vào nhóm chuyên đề lấy lại được nhiều điểm nhất.',
    focus: ['quantitative', 'qualitative', 'science'],
    kinds: ['advanced'],
    pillar: 'goal',
    checkpoint: 'Chỉ số "đúng trọng tâm" trong 14 ngày gần nhất đạt từ 60% trở lên.',
  },
  {
    from: 25, to: 28, stage: 3,
    title: 'Mô phỏng phòng thi',
    goal: 'Làm đề đủ 150 câu trong đúng 195 phút, đúng thứ tự phần, không dừng giữa chừng.',
    focus: ['quantitative', 'qualitative', 'science'],
    kinds: ['revision', 'test'],
    pillar: 'inspirits',
    checkpoint: 'Hoàn thành trọn một đề mẫu 150 câu mà không dừng đồng hồ.',
  },
  {
    from: 29, to: 31, stage: 3,
    title: 'Ổn định phong độ',
    goal: 'Ba đề liên tiếp cho kết quả gần nhau. Ổn định quan trọng hơn một lần đạt đỉnh.',
    focus: ['quantitative', 'qualitative', 'science'],
    kinds: ['revision', 'test'],
    pillar: 'inspirits',
    checkpoint: 'Ba đề mô phỏng gần nhất dao động dưới 8 điểm.',
  },
  {
    from: 32, to: 32, stage: 3,
    title: 'Tuần cuối — giữ, không nạp',
    goal: 'Không học kiến thức mới. Ôn lại thứ đã gần thành thạo, ngủ đủ, và giữ nhịp sinh hoạt.',
    focus: ['quantitative', 'qualitative', 'science'],
    kinds: ['revision'],
    pillar: 'inspirits',
    checkpoint: 'Dọn sạch sổ tay lỗi sai và ngủ đủ giấc bảy ngày liên tiếp.',
  },
];

/** Cot moc lon, gan vao tuan cu the. */
const MILESTONES: Readonly<Record<number, string>> = {
  1: 'Bài kiểm tra định vị đầu vào — ra cấp độ khởi điểm cho cả 30 chuyên đề',
  12: 'Sát hạch cuối giai đoạn Nền tảng — xét chuyển sang Tăng tốc',
  18: 'Đề mô phỏng lần 1 — lấy mốc giữa mùa',
  24: 'Sát hạch cuối giai đoạn Tăng tốc — xét chuyển sang Bứt phá',
  26: 'Đề mô phỏng lần 2',
  29: 'Kỳ thi cấp chứng chỉ HSA365 — lấy bằng chứng năng lực trước kỳ thi thật',
  31: 'Đề mô phỏng lần 3 — kiểm tra độ ổn định',
};

export const SYLLABUS: readonly SyllabusWeek[] = SPECS.flatMap((spec) => {
  const weeks: SyllabusWeek[] = [];
  for (let week = spec.from; week <= spec.to; week += 1) {
    const milestone = MILESTONES[week];
    weeks.push({
      week,
      stage: spec.stage,
      title: spec.title,
      goal: spec.goal,
      focus: spec.focus,
      kinds: spec.kinds,
      pillar: spec.pillar,
      checkpoint: spec.checkpoint,
      ...(milestone ? { milestone } : {}),
    });
  }
  return weeks;
});

export const SYLLABUS_BY_WEEK = new Map(SYLLABUS.map((w) => [w.week, w]));

/** Cac tuan cua mot giai doan. */
export function weeksOfStage(stage: number): SyllabusWeek[] {
  return SYLLABUS.filter((w) => w.stage === stage);
}

/**
 * Tuan hien tai, suy tu so ngay con lai toi ky thi.
 *
 * Tra ve `null` khi chua dat ngay thi — va do la mot cau tra loi that: khong
 * co ngay thi thi khong co tuan thu bao nhieu, va viec dau tien nen lam la dat
 * ngay thi chu khong phai doan mot con so.
 */
export function currentWeek(daysLeft: number | null): number | null {
  if (daysLeft === null) return null;
  const weeksLeft = Math.ceil(daysLeft / 7);
  return Math.min(SEASON_WEEKS, Math.max(1, SEASON_WEEKS - weeksLeft + 1));
}

/** Ten giai doan theo so, dung STAGES da co lam nguon. */
export function stageName(stage: number): string {
  return STAGES.find((s) => s.stage === stage)?.name ?? `Giai đoạn ${stage}`;
}
