import type { StrandId, TrackId } from '@/types';
import { Rng, hashSeed } from '@/lib/rng';
import { GENERATORS, generateItem, generatorById, type GenItem, type ItemGenerator } from './generators';

/* ============================================================
   GIAI ĐOẠN (STAGE) — khung tiến trình của mỗi luồng
   ============================================================ */

export interface Stage {
  id: string;
  track: TrackId;
  order: number;
  name: string;
  goal: string;
  levels: (1 | 2 | 3 | 4 | 5)[];
  kpi: number; // % KPI cần đạt để được xét lên giai đoạn sau
  duration: string;
  description: string;
}

export const STAGES: Stage[] = [
  {
    id: 'T1',
    track: 'thpt',
    order: 1,
    name: 'GĐ 1 · Xây nền',
    goal: 'Không còn mất điểm ở Bài I – II – III vì lỗi nền tảng.',
    levels: [1, 1, 2],
    kpi: 90,
    duration: '4 – 6 tuần',
    description:
      'Căn thức, phương trình – hệ phương trình, công thức hình không gian, xác suất – thống kê cơ bản. Mục tiêu là độ chính xác, chưa cần tốc độ.',
  },
  {
    id: 'T2',
    track: 'thpt',
    order: 2,
    name: 'GĐ 2 · Thành thạo dạng chuẩn',
    goal: 'Làm trọn 6,0 điểm đầu tiên của đề trong 45 phút.',
    levels: [2, 2, 3],
    kpi: 90,
    duration: '5 – 7 tuần',
    description:
      'Viète, tương giao parabol, bài toán lập phương trình, hệ thức lượng và góc với đường tròn. Bắt đầu tính giờ.',
  },
  {
    id: 'T3',
    track: 'thpt',
    order: 3,
    name: 'GĐ 3 · Phân hoá 8 → 9',
    goal: 'Trọn vẹn Bài IV ý 1–2 và xử lý được ý 3 quen thuộc.',
    levels: [3, 3, 4],
    kpi: 90,
    duration: '5 – 7 tuần',
    description:
      'Hình học đường tròn nâng cao, phương trình vô tỉ, bài toán tham số, bất đẳng thức cơ bản.',
  },
  {
    id: 'T4',
    track: 'thpt',
    order: 4,
    name: 'GĐ 4 · Chinh phục 9 → 10',
    goal: 'Ăn trọn Bài V và ý cuối Bài IV; sai số tối đa 1 ý nhỏ mỗi đề.',
    levels: [4, 4, 5],
    kpi: 90,
    duration: '4 – 6 tuần',
    description:
      'Cực trị, điểm cố định, bất đẳng thức có điều kiện, kỹ thuật chọn điểm rơi. Đây là vùng quyết định điểm 10.',
  },
  {
    id: 'T5',
    track: 'thpt',
    order: 5,
    name: 'GĐ 5 · Tổng duyệt phòng thi',
    goal: 'Ổn định 9,0+ ở mọi đề, đúng nhịp 90 phút.',
    levels: [3, 4, 5],
    kpi: 90,
    duration: '4 tuần cuối',
    description:
      'Phiếu tổng hợp trộn đủ 5 bài của đề Hà Nội, luyện tốc độ, quy trình soát bài và tâm lý phòng thi.',
  },
  {
    id: 'C1',
    track: 'chuyen',
    order: 1,
    name: 'GĐ 1 · Nhập môn chuyên',
    goal: 'Chuyển từ tư duy “làm bài” sang tư duy “chứng minh”.',
    levels: [2, 2, 3],
    kpi: 90,
    duration: '5 – 6 tuần',
    description:
      'Chia hết, ƯCLN – BCNN, chữ số tận cùng, phương trình vô tỉ, hệ nâng cao. Song song giữ nhịp đề chung.',
  },
  {
    id: 'C2',
    track: 'chuyen',
    order: 2,
    name: 'GĐ 2 · Số học & Tổ hợp nền',
    goal: 'Ăn trọn bài Số học 2,0 điểm của đề chuyên.',
    levels: [3, 3, 4],
    kpi: 90,
    duration: '6 – 8 tuần',
    description:
      'Đồng dư, số chính phương, phương trình nghiệm nguyên, Dirichlet, đếm. Đây là mạch “đinh” của đề KHTN.',
  },
  {
    id: 'C3',
    track: 'chuyen',
    order: 3,
    name: 'GĐ 3 · Hình học chuyên',
    goal: 'Làm trọn 2 ý đầu bài hình 3,0 điểm.',
    levels: [3, 4, 4],
    kpi: 90,
    duration: '6 – 8 tuần',
    description:
      'Phương tích, trục đẳng phương, mô hình chuẩn, tỉ số – thẳng hàng – đồng quy.',
  },
  {
    id: 'C4',
    track: 'chuyen',
    order: 4,
    name: 'GĐ 4 · Bài chốt & BĐT nâng cao',
    goal: 'Có điểm ở bài tổ hợp / bất đẳng thức cuối đề.',
    levels: [4, 4, 5],
    kpi: 90,
    duration: '5 – 6 tuần',
    description:
      'Bất biến, cực hạn, SOS, dồn biến, chọn điểm rơi. Mục tiêu: không bỏ trắng bài chốt.',
  },
  {
    id: 'C5',
    track: 'chuyen',
    order: 5,
    name: 'GĐ 5 · Tổng duyệt đề chuyên',
    goal: 'Ổn định 7,0+ đề chuyên trong 150 phút.',
    levels: [3, 4, 5],
    kpi: 90,
    duration: '4 tuần cuối',
    description:
      'Phiếu tổng hợp mô phỏng đề KHTN / Ams, luyện trình bày chặt và phân bổ thời gian.',
  },
  {
    id: 'Q1',
    track: 'thpt-qg',
    order: 1,
    name: 'GĐ 1 · Lớp 10 – Nền tảng',
    goal: 'Không nợ kiến thức lớp 10; điểm tổng kết lớp 10 từ 9,0 trở lên.',
    levels: [1, 2, 2],
    kpi: 90,
    duration: 'Suốt năm lớp 10',
    description:
      'Mệnh đề – tập hợp, bất phương trình và dấu tam thức, hàm số bậc hai, hệ thức lượng, vectơ, toạ độ phẳng, tổ hợp. Đây là móng nhà của cả ba năm.',
  },
  {
    id: 'Q2',
    track: 'thpt-qg',
    order: 2,
    name: 'GĐ 2 · Lớp 11 – Cốt lõi',
    goal: 'Làm chủ đạo hàm và mũ – logarit; tổng kết lớp 11 từ 9,0 trở lên.',
    levels: [2, 3, 3],
    kpi: 90,
    duration: 'Suốt năm lớp 11',
    description:
      'Lượng giác, dãy số – cấp số, giới hạn, mũ – logarit, đạo hàm, hình không gian, xác suất. Học tốt lớp 11 thì lớp 12 nhẹ đi một nửa.',
  },
  {
    id: 'Q3',
    track: 'thpt-qg',
    order: 3,
    name: 'GĐ 3 · Lớp 12 – Trọng tâm',
    goal: 'Phủ kín chương trình lớp 12 và đạt 8,0+ ở các đề thi thử đầu tiên.',
    levels: [3, 3, 4],
    kpi: 90,
    duration: 'Học kỳ I lớp 12',
    description:
      'Ứng dụng đạo hàm, nguyên hàm – tích phân, toạ độ Oxyz, thống kê và xác suất có điều kiện — bốn mạch chiếm phần lớn số câu của đề thi tốt nghiệp.',
  },
  {
    id: 'Q4',
    track: 'thpt-qg',
    order: 4,
    name: 'GĐ 4 · Luyện dạng phân hoá 9+',
    goal: 'Xử lý gọn nhóm câu vận dụng cao — vùng quyết định điểm 9 và 10.',
    levels: [4, 4, 5],
    kpi: 90,
    duration: 'Học kỳ II lớp 12',
    description:
      'Bài toán tham số, cực trị hàm hợp, tích phân nâng cao, cực trị trong Oxyz, xác suất có điều kiện phức hợp, bài toán thực tế mô hình hoá.',
  },
  {
    id: 'Q5',
    track: 'thpt-qg',
    order: 5,
    name: 'GĐ 5 · Tổng duyệt & thi thử',
    goal: 'Ổn định 9,0+ theo đúng định dạng đề 3 phần trong 90 phút.',
    levels: [3, 4, 5],
    kpi: 90,
    duration: '8 tuần cuối',
    description:
      'Đề tổng hợp mô phỏng định dạng thi tốt nghiệp, luyện chiến thuật Phần II (đúng/sai) và Phần III (trả lời ngắn), kiểm soát rủi ro tính toán.',
  },
];

export const stageById = (id: string) => STAGES.find((s) => s.id === id)!;
export const stagesByTrack = (track: TrackId) =>
  STAGES.filter((s) => s.track === track).sort((a, b) => a.order - b.order);

/* ============================================================
   PHIẾU LUYỆN (2000 phiếu)
   ============================================================ */

export interface WorksheetMeta {
  id: string;
  index: number;
  track: TrackId;
  stageId: string;
  level: 1 | 2 | 3 | 4 | 5;
  generatorId: string;
  topicId: string;
  strand: StrandId;
  title: string;
  minutes: number;
  totalItems: number;
  seed: number;
}

export interface WorksheetPart {
  order: number;
  name: string;
  purpose: string;
  items: GenItem[];
}

export interface Worksheet extends WorksheetMeta {
  parts: WorksheetPart[];
}

/** Phân bổ 2000 phiếu cho ba luồng. */
const TRACK_QUOTA: Record<TrackId, number> = {
  thpt: 600,
  chuyen: 600,
  'thpt-qg': 800,
};
export const TOTAL_WORKSHEETS = Object.values(TRACK_QUOTA).reduce((a, b) => a + b, 0);

const pad = (n: number, w: number) => String(n).padStart(w, '0');

/** Các dạng bài khả dụng cho một luồng ở một mức độ (nới biên khi thiếu). */
function poolFor(track: TrackId, level: number): ItemGenerator[] {
  const exact = GENERATORS.filter((g) => g.tracks.includes(track) && g.level === level);
  if (exact.length >= 2) return exact;
  const near = GENERATORS.filter(
    (g) => g.tracks.includes(track) && Math.abs(g.level - level) <= 1,
  );
  return near.length ? near : GENERATORS.filter((g) => g.tracks.includes(track));
}

function buildCatalog(): WorksheetMeta[] {
  const out: WorksheetMeta[] = [];
  let counter = 0;

  for (const track of ['thpt', 'chuyen', 'thpt-qg'] as TrackId[]) {
    const stages = stagesByTrack(track);
    const total = TRACK_QUOTA[track];
    const perStage = Math.floor(total / stages.length);

    stages.forEach((stage, si) => {
      const count = si === stages.length - 1 ? total - perStage * (stages.length - 1) : perStage;
      for (let i = 0; i < count; i++) {
        counter += 1;
        const level = stage.levels[i % stage.levels.length];
        const pool = poolFor(track, level);
        const primary = pool[i % pool.length];
        const id = `PL-${pad(counter, 4)}`;
        out.push({
          id,
          index: counter,
          track,
          stageId: stage.id,
          level,
          generatorId: primary.id,
          topicId: primary.topicId,
          strand: primary.strand,
          title: `${primary.name} — Phiếu ${pad(Math.floor(i / pool.length) + 1, 2)}`,
          minutes: 18 + level * 4,
          totalItems: 8,
          seed: hashSeed(`${id}:${primary.id}:${level}`),
        });
      }
    });
  }
  return out;
}

export const WORKSHEETS: WorksheetMeta[] = buildCatalog();
export const worksheetById = (id: string) => WORKSHEETS.find((w) => w.id === id);

const PART_SPECS = [
  { name: 'Phần 1 · Khởi động', purpose: 'Làm nóng kỹ năng nền, bảo đảm không sai bước cơ bản.', count: 3, dl: -1 },
  { name: 'Phần 2 · Luyện chuẩn', purpose: 'Đúng dạng trọng tâm của phiếu, đúng mức độ mục tiêu.', count: 3, dl: 0 },
  { name: 'Phần 3 · Thử thách', purpose: 'Nâng một bậc để kiểm tra khả năng bứt phá.', count: 2, dl: 1 },
];

/** Sinh nội dung đầy đủ của một phiếu từ metadata (luôn tái lập được từ seed). */
export function buildWorksheet(meta: WorksheetMeta, variant = 0): Worksheet {
  const r = new Rng(meta.seed + variant * 7919);
  const primary = generatorById(meta.generatorId)!;

  // Không để hai câu trùng đề trong cùng một phiếu
  const usedPrompts = new Set<string>();
  const pushUnique = (items: GenItem[], gen: ItemGenerator, pool: ItemGenerator[]) => {
    // Thử sinh lại cùng dạng trước; nếu vẫn trùng thì đổi sang dạng khác cùng mức.
    const candidates = [gen, ...pool.filter((g) => g.id !== gen.id)];
    for (const candidate of candidates) {
      for (let attempt = 0; attempt < 20; attempt++) {
        const item = generateItem(candidate, r);
        if (!usedPrompts.has(item.prompt)) {
          usedPrompts.add(item.prompt);
          items.push(item);
          return;
        }
      }
    }
    items.push(generateItem(gen, r));
  };

  const parts: WorksheetPart[] = PART_SPECS.map((spec, pi) => {
    const targetLevel = Math.min(5, Math.max(1, meta.level + spec.dl));
    const pool = poolFor(meta.track, targetLevel);
    const items: GenItem[] = [];
    for (let i = 0; i < spec.count; i++) {
      // Phần 2 bám sát dạng chính; các phần khác lấy từ pool cùng mức
      const gen = pi === 1 ? primary : pool[r.int(0, pool.length - 1)];
      pushUnique(items, gen, pool);
    }
    return { order: pi + 1, name: spec.name, purpose: spec.purpose, items };
  });

  return { ...meta, parts };
}

/* ============================================================
   NHIỆM VỤ (2000 nhiệm vụ) — mỗi nhiệm vụ giao đúng một phiếu
   ============================================================ */

export type MissionKind = 'khoi-dong' | 'ren-luyen' | 'kiem-tra' | 'thu-thach' | 'tong-duyet';

export interface Mission {
  id: string;
  order: number;
  worksheetId: string;
  track: TrackId;
  stageId: string;
  level: 1 | 2 | 3 | 4 | 5;
  topicId: string;
  strand: StrandId;
  kind: MissionKind;
  title: string;
  objective: string;
  kpiTarget: number;
  xp: number;
  /** Nhiệm vụ liền trước trong cùng giai đoạn — dùng cho quy tắc mở khoá tuần tự. */
  previousId?: string;
}

export const MISSION_KIND_META: Record<MissionKind, { label: string; color: string; hint: string }> = {
  'khoi-dong': {
    label: 'Khởi động',
    color: '#0891b2',
    hint: 'Làm nóng kỹ năng, ưu tiên độ chính xác hơn tốc độ.',
  },
  'ren-luyen': {
    label: 'Rèn luyện',
    color: '#4f46e5',
    hint: 'Lặp lại dạng trọng tâm đến khi thành phản xạ.',
  },
  'kiem-tra': {
    label: 'Kiểm tra',
    color: '#b45309',
    hint: 'Làm trong thời gian quy định, không xem gợi ý.',
  },
  'thu-thach': {
    label: 'Thử thách',
    color: '#be123c',
    hint: 'Cao hơn mức hiện tại một bậc — sai cũng có giá trị.',
  },
  'tong-duyet': {
    label: 'Tổng duyệt',
    color: '#047857',
    hint: 'Mô phỏng điều kiện phòng thi, chấm theo barem.',
  },
};

const KIND_CYCLE: MissionKind[] = ['khoi-dong', 'ren-luyen', 'ren-luyen', 'kiem-tra', 'thu-thach'];

function buildMissions(): Mission[] {
  const byStage = new Map<string, number>();
  return WORKSHEETS.map((w, i) => {
    const seq = (byStage.get(w.stageId) ?? 0) + 1;
    byStage.set(w.stageId, seq);
    const stage = stageById(w.stageId);
    const kind: MissionKind = stage.order === 5 ? 'tong-duyet' : KIND_CYCLE[(seq - 1) % KIND_CYCLE.length];
    const id = `NV-${pad(i + 1, 4)}`;
    return {
      id,
      order: seq,
      worksheetId: w.id,
      track: w.track,
      stageId: w.stageId,
      level: w.level,
      topicId: w.topicId,
      strand: w.strand,
      kind,
      title: `${stage.name.split('·')[0].trim()} · NV${pad(seq, 3)} — ${w.title.split('—')[0].trim()}`,
      objective: buildObjective(kind, w.level, w.title),
      kpiTarget: kind === 'thu-thach' ? 75 : 90,
      xp: 40 + w.level * 15 + (kind === 'kiem-tra' ? 20 : 0) + (kind === 'tong-duyet' ? 40 : 0),
      previousId: seq > 1 ? `NV-${pad(i, 4)}` : undefined,
    };
  });
}

function buildObjective(kind: MissionKind, level: number, title: string): string {
  const topic = title.split('—')[0].trim();
  switch (kind) {
    case 'khoi-dong':
      return `Làm chủ lại các bước cơ bản của dạng “${topic}”. Yêu cầu: đúng ≥ 90% và không mắc lỗi điều kiện.`;
    case 'ren-luyen':
      return `Luyện phản xạ với dạng “${topic}” ở mức độ ${level}. Yêu cầu: đúng ≥ 90%, hoàn thành trong thời gian quy định.`;
    case 'kiem-tra':
      return `Kiểm tra độ vững của dạng “${topic}”: làm liên tục, không xem gợi ý, đạt KPI ≥ 90% để được xét nâng mức.`;
    case 'thu-thach':
      return `Thử thách vượt mức: các câu ở phần 3 cao hơn mức hiện tại một bậc. Đạt ≥ 75% là tín hiệu sẵn sàng lên Level ${Math.min(5, level + 1)}.`;
    default:
      return `Tổng duyệt: phiếu trộn nhiều dạng theo đúng cấu trúc đề thi. Yêu cầu KPI ≥ 90% và đúng nhịp thời gian.`;
  }
}

export const MISSIONS: Mission[] = buildMissions();
export const TOTAL_MISSIONS = MISSIONS.length;

export const missionById = (id: string) => MISSIONS.find((m) => m.id === id);
export const missionByWorksheet = (wid: string) => MISSIONS.find((m) => m.worksheetId === wid);
export const missionsByStage = (stageId: string) => MISSIONS.filter((m) => m.stageId === stageId);
export const missionsByTrack = (track: TrackId) => MISSIONS.filter((m) => m.track === track);

export function missionsFiltered(opts: {
  track: TrackId;
  stageId?: string;
  level?: number;
  strand?: StrandId;
  kind?: MissionKind;
  search?: string;
}): Mission[] {
  const q = opts.search?.trim().toLowerCase();
  return MISSIONS.filter((m) => {
    if (m.track !== opts.track) return false;
    if (opts.stageId && m.stageId !== opts.stageId) return false;
    if (opts.level && m.level !== opts.level) return false;
    if (opts.strand && m.strand !== opts.strand) return false;
    if (opts.kind && m.kind !== opts.kind) return false;
    if (q && !(`${m.id} ${m.title} ${m.worksheetId}`.toLowerCase().includes(q))) return false;
    return true;
  });
}

/** Thống kê catalog để hiển thị trên trang chủ. */
export function catalogStats() {
  const byTrack = (t: TrackId) => WORKSHEETS.filter((w) => w.track === t).length;
  const byStage = STAGES.map((s) => ({
    stage: s,
    worksheets: WORKSHEETS.filter((w) => w.stageId === s.id).length,
    missions: MISSIONS.filter((m) => m.stageId === s.id).length,
  }));
  return {
    worksheets: WORKSHEETS.length,
    missions: MISSIONS.length,
    items: WORKSHEETS.length * 8,
    thpt: byTrack('thpt'),
    chuyen: byTrack('chuyen'),
    quocGia: byTrack('thpt-qg'),
    generators: GENERATORS.length,
    byStage,
  };
}
