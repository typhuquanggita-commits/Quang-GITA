import type { StrandId, TrackId } from '@/types';
import { Rng, hashSeed } from '@/lib/rng';
import { GENERATORS, generateItem, generatorById, type GenItem, type ItemGenerator } from './generators';
import { buildMethodItem, buildRecognitionItem } from './recognition';
import { SHEET_TYPES, sheetSpec, type SheetType } from './sheets';
import { TOPICS, topicById } from './topics';
import { STAGES, stagesByTrack, stageById, type Stage } from '@/data/stages';

export { STAGES, stagesByTrack, stageById };
export type { Stage };

/* ============================================================
   GIAI ĐOẠN (STAGE) — khung tiến trình của mỗi luồng
   ============================================================ */





/* ============================================================
   BỘ PHIẾU THEO CHUYÊN ĐỀ — 3000 phiếu luyện
   ============================================================ */

export interface WorksheetMeta {
  id: string;
  index: number;
  track: TrackId;
  stageId: string;
  level: 1 | 2 | 3 | 4 | 5;
  sheetType: SheetType;
  /** Đợt thứ mấy của bộ phiếu chuyên đề này. */
  pack: number;
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

export interface ReadingBlock {
  title: string;
  lines: string[];
}

export interface Worksheet extends WorksheetMeta {
  parts: WorksheetPart[];
  /** Phần đọc tóm tắt, chỉ có ở phiếu Lý thuyết nền. */
  reading?: ReadingBlock[];
}

/** Phân bổ 3000 phiếu cho năm luồng. */
const TRACK_QUOTA: Record<TrackId, number> = {
  thpt: 600,
  chuyen: 600,
  'thpt-qg': 800,
  lop6: 400,
  'chinh-khoa': 600,
};
export const TOTAL_WORKSHEETS = Object.values(TRACK_QUOTA).reduce((a, b) => a + b, 0);

const pad = (n: number, w: number) => String(n).padStart(w, '0');

/** Chuyên đề có ít nhất một bộ sinh đề thì mới dựng được bộ phiếu luyện. */
export function generatorsOfTopic(track: TrackId, topicId: string): ItemGenerator[] {
  return GENERATORS.filter((g) => g.tracks.includes(track) && g.topicId === topicId);
}

function generatorsOfStrand(track: TrackId, strand: StrandId, level: number): ItemGenerator[] {
  const exact = GENERATORS.filter(
    (g) => g.tracks.includes(track) && g.strand === strand && Math.abs(g.level - level) <= 1,
  );
  if (exact.length) return exact;
  const any = GENERATORS.filter((g) => g.tracks.includes(track) && g.strand === strand);
  return any.length ? any : GENERATORS.filter((g) => g.tracks.includes(track));
}

/** Chuyên đề thuộc giai đoạn nào của luồng — chọn giai đoạn có mức độ gần nhất. */
export function stageForTopic(track: TrackId, level: number, grade?: number): Stage {
  const stages = stagesByTrack(track);
  if (track === 'thpt-qg' && grade) {
    const byGrade: Record<number, string> = { 10: 'Q1', 11: 'Q2', 12: 'Q3' };
    const found = stages.find((s) => s.id === byGrade[grade]);
    if (found) return found;
  }
  const exact = stages.find((s) => s.levels.includes(level as 1 | 2 | 3 | 4 | 5));
  if (exact) return exact;
  return stages.reduce((best, s) => {
    const avg = s.levels.reduce((a, b) => a + b, 0) / s.levels.length;
    const bestAvg = best.levels.reduce((a, b) => a + b, 0) / best.levels.length;
    return Math.abs(avg - level) < Math.abs(bestAvg - level) ? s : best;
  }, stages[0]);
}

/** Các chuyên đề có bộ phiếu luyện của một luồng, giữ nguyên thứ tự sư phạm. */
export function packedTopics(track: TrackId) {
  return TOPICS.filter(
    (t) => t.tracks.includes(track) && generatorsOfTopic(track, t.id).length > 0,
  ).sort((a, b) => (a.grade ?? 9) - (b.grade ?? 9) || a.level - b.level || b.frequency - a.frequency);
}

function buildCatalog(): WorksheetMeta[] {
  const out: WorksheetMeta[] = [];
  let counter = 0;

  for (const track of ['thpt', 'chuyen', 'thpt-qg', 'lop6', 'chinh-khoa'] as TrackId[]) {
    const quota = TRACK_QUOTA[track];
    const topics = packedTopics(track);
    let made = 0;
    let pack = 1;

    while (made < quota) {
      for (const topic of topics) {
        if (made >= quota) break;
        const primary = generatorsOfTopic(track, topic.id)[0];
        const stage = stageForTopic(track, topic.level, topic.grade);

        for (const spec of SHEET_TYPES) {
          if (made >= quota) break;
          counter += 1;
          made += 1;
          const level = Math.min(5, Math.max(1, topic.level + spec.levelDelta)) as 1 | 2 | 3 | 4 | 5;
          const id = `PL-${pad(counter, 4)}`;
          out.push({
            id,
            index: counter,
            track,
            stageId: stage.id,
            level,
            sheetType: spec.id,
            pack,
            generatorId: primary.id,
            topicId: topic.id,
            strand: topic.strand,
            title: `${topic.name} — ${spec.short}${pack > 1 ? ` (đợt ${pack})` : ''}`,
            minutes: spec.minutes,
            totalItems: spec.items,
            seed: hashSeed(`${id}:${topic.id}:${spec.id}:${pack}`),
          });
        }
      }
      pack += 1;
      if (pack > 60) break; // chốt chặn an toàn
    }
  }
  return out;
}

export const WORKSHEETS: WorksheetMeta[] = buildCatalog();
export const worksheetById = (id: string) => WORKSHEETS.find((w) => w.id === id);

/** Toàn bộ phiếu của một chuyên đề, nhóm theo đợt. */
export function sheetsOfTopic(track: TrackId, topicId: string) {
  const all = WORKSHEETS.filter((w) => w.track === track && w.topicId === topicId);
  const packs = [...new Set(all.map((w) => w.pack))].sort((a, b) => a - b);
  return packs.map((p) => ({
    pack: p,
    sheets: SHEET_TYPES.map((spec) => all.find((w) => w.pack === p && w.sheetType === spec.id)).filter(
      (w): w is WorksheetMeta => !!w,
    ),
  }));
}

/* ---------------- Sinh nội dung của một phiếu ---------------- */

interface PartPlan {
  name: string;
  purpose: string;
  count: number;
  mode: 'compute' | 'recognize' | 'method';
  levelDelta: number;
  mixed: boolean;
}

function planParts(sheetType: SheetType, items: number): PartPlan[] {
  const half = Math.ceil(items / 2);
  const rest = items - half;
  switch (sheetType) {
    case 'ly-thuyet':
      return [
        { name: 'Phần 1 · Nhớ công thức & điều kiện', purpose: 'Kiểm tra bạn đã thuộc phần nền chưa.', count: half, mode: 'compute', levelDelta: -1, mixed: false },
        { name: 'Phần 2 · Áp dụng trực tiếp', purpose: 'Dùng ngay công thức vừa đọc, chưa cần biến đổi phức tạp.', count: rest, mode: 'compute', levelDelta: -1, mixed: false },
      ];
    case 'dang-bai':
      return [
        { name: 'Phần 1 · Đọc vị đề', purpose: 'Nhìn đề và nhận ra dạng bài, chưa cần tính tới đáp số.', count: half, mode: 'recognize', levelDelta: 0, mixed: false },
        { name: 'Phần 2 · Kiểm chứng bằng bài tính', purpose: 'Giải thật để xác nhận bạn đã nhận dạng đúng.', count: rest, mode: 'compute', levelDelta: 0, mixed: false },
      ];
    case 'ky-nang':
      return [
        { name: 'Phần 1 · Quy trình chuẩn', purpose: 'Nắm đúng thứ tự các bước và các bẫy của dạng bài.', count: half, mode: 'method', levelDelta: 0, mixed: false },
        { name: 'Phần 2 · Thực hành quy trình', purpose: 'Áp dụng đúng quy trình vừa ôn vào bài cụ thể.', count: rest, mode: 'compute', levelDelta: 0, mixed: false },
      ];
    case 'nang-cao':
      return [
        { name: 'Phần 1 · Nâng một bậc', purpose: 'Cùng dạng nhưng mức độ cao hơn.', count: half, mode: 'compute', levelDelta: 1, mixed: false },
        { name: 'Phần 2 · Biến thể lạ', purpose: 'Dạng liên quan cùng mạch, kiểm tra bạn hiểu bản chất hay chỉ nhớ khuôn.', count: rest, mode: 'compute', levelDelta: 1, mixed: true },
      ];
    case 'on-thi':
      return [
        { name: 'Phần 1 · Trọng tâm chuyên đề', purpose: 'Giữ chắc phần lõi trước khi trộn dạng.', count: half, mode: 'compute', levelDelta: 0, mixed: false },
        { name: 'Phần 2 · Trộn cùng mạch', purpose: 'Các dạng xuất hiện xen kẽ, không báo trước — giống đề thi thật.', count: rest, mode: 'compute', levelDelta: 0, mixed: true },
      ];
    default:
      return [
        { name: 'Phần 1 · Đề thi — phần cơ bản', purpose: 'Nhóm câu bắt buộc phải lấy trọn.', count: half, mode: 'compute', levelDelta: 0, mixed: true },
        { name: 'Phần 2 · Đề thi — phần phân hoá', purpose: 'Nhóm câu quyết định thứ hạng.', count: rest, mode: 'compute', levelDelta: 1, mixed: true },
      ];
  }
}

function readingFor(topicId: string): ReadingBlock[] | undefined {
  const t = topicById(topicId);
  if (!t) return undefined;
  const blocks: ReadingBlock[] = [
    { title: 'Chuyên đề này nói về gì', lines: [t.summary] },
    { title: 'Chuẩn đầu ra', lines: t.outcomes },
    { title: 'Kỹ thuật cốt lõi', lines: t.techniques },
  ];
  if (t.keyFormulas?.length) blocks.push({ title: 'Công thức cần thuộc', lines: t.keyFormulas });
  blocks.push({ title: 'Lỗi thường gặp', lines: t.pitfalls });
  return blocks;
}

/** Sinh nội dung đầy đủ của một phiếu từ metadata (luôn tái lập được từ seed). */
export function buildWorksheet(meta: WorksheetMeta, variant = 0): Worksheet {
  const r = new Rng(meta.seed + variant * 7919);
  const primary = generatorById(meta.generatorId)!;
  const topicPool = generatorsOfTopic(meta.track, meta.topicId);
  const spec = sheetSpec(meta.sheetType);

  const usedPrompts = new Set<string>();

  const makeItem = (gen: ItemGenerator, mode: PartPlan['mode'], analysisPool: ItemGenerator[]) =>
    mode === 'recognize'
      ? buildRecognitionItem(gen, analysisPool, r)
      : mode === 'method'
        ? buildMethodItem(gen, analysisPool, r)
        : generateItem(gen, r);

  /**
   * Không để hai câu trùng đề trong cùng một phiếu. Thử sinh lại với dạng ưu tiên
   * trước; nếu không gian tham số của dạng đó đã cạn thì chuyển sang dạng khác
   * cùng mạch — vẫn đúng trọng tâm nhưng đủ đa dạng.
   */
  const pushUnique = (
    items: GenItem[],
    candidates: ItemGenerator[],
    mode: PartPlan['mode'],
    analysisPool: ItemGenerator[],
  ) => {
    for (const gen of candidates) {
      for (let attempt = 0; attempt < 16; attempt++) {
        const item = makeItem(gen, mode, analysisPool);
        if (!usedPrompts.has(item.prompt)) {
          usedPrompts.add(item.prompt);
          items.push(item);
          return;
        }
      }
    }
    items.push(makeItem(candidates[0] ?? primary, mode, analysisPool));
  };

  const trackPool = GENERATORS.filter((g) => g.tracks.includes(meta.track));

  const parts: WorksheetPart[] = planParts(meta.sheetType, meta.totalItems).map((plan, pi) => {
    const level = Math.min(5, Math.max(1, meta.level + plan.levelDelta));
    const strandPool = generatorsOfStrand(meta.track, meta.strand, level);
    const base = plan.mixed ? strandPool : topicPool.length ? topicPool : strandPool;

    const items: GenItem[] = [];
    for (let i = 0; i < plan.count; i++) {
      const preferred = plan.mixed
        ? base[r.int(0, base.length - 1)]
        : (base[i % base.length] ?? primary);
      // Ưu tiên dạng chính → các dạng còn lại cùng chuyên đề → cùng mạch → cùng luồng
      const seen = new Set([preferred.id]);
      const candidates: ItemGenerator[] = [preferred];
      for (const g of [...base, ...strandPool, ...trackPool]) {
        if (!seen.has(g.id)) {
          seen.add(g.id);
          candidates.push(g);
        }
      }
      pushUnique(items, candidates, plan.mode, strandPool);
    }
    return { order: pi + 1, name: plan.name, purpose: plan.purpose, items };
  });

  return {
    ...meta,
    parts,
    reading: spec.id === 'ly-thuyet' ? readingFor(meta.topicId) : undefined,
  };
}

/* ============================================================
   NHIỆM VỤ — mỗi nhiệm vụ giao đúng một phiếu
   ============================================================ */

export type MissionKind = SheetType;

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
  pack: number;
  title: string;
  objective: string;
  kpiTarget: number;
  xp: number;
  previousId?: string;
}

export const MISSION_KIND_META: Record<MissionKind, { label: string; color: string; hint: string }> =
  Object.fromEntries(
    SHEET_TYPES.map((s) => [s.id, { label: s.short, color: s.color, hint: s.hint }]),
  ) as Record<MissionKind, { label: string; color: string; hint: string }>;

function buildObjective(spec: (typeof SHEET_TYPES)[number], topicName: string, level: number): string {
  return `${spec.purpose} Chuyên đề: “${topicName}”, mức độ ${level}. Yêu cầu đạt KPI ≥ ${spec.kpiTarget}%. Kết quả mong đợi: ${spec.outcome}`;
}

function buildMissions(): Mission[] {
  const byStage = new Map<string, number>();
  return WORKSHEETS.map((w, i) => {
    const seq = (byStage.get(w.stageId) ?? 0) + 1;
    byStage.set(w.stageId, seq);
    const spec = sheetSpec(w.sheetType);
    const topicName = topicById(w.topicId)?.name ?? w.topicId;
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
      kind: w.sheetType,
      pack: w.pack,
      title: `${topicName} — ${spec.name}${w.pack > 1 ? ` (đợt ${w.pack})` : ''}`,
      objective: buildObjective(spec, topicName, w.level),
      kpiTarget: spec.kpiTarget,
      xp: 30 + w.level * 12 + spec.order * 6,
      previousId: seq > 1 ? `NV-${pad(i, 4)}` : undefined,
    };
  });
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
  topicId?: string;
  pack?: number;
  search?: string;
}): Mission[] {
  const q = opts.search?.trim().toLowerCase();
  return MISSIONS.filter((m) => {
    if (m.track !== opts.track) return false;
    if (opts.stageId && m.stageId !== opts.stageId) return false;
    if (opts.level && m.level !== opts.level) return false;
    if (opts.strand && m.strand !== opts.strand) return false;
    if (opts.kind && m.kind !== opts.kind) return false;
    if (opts.topicId && m.topicId !== opts.topicId) return false;
    if (opts.pack && m.pack !== opts.pack) return false;
    if (q && !`${m.id} ${m.title} ${m.worksheetId}`.toLowerCase().includes(q)) return false;
    return true;
  });
}

/** Thống kê catalog để hiển thị trên trang chủ. */
export function catalogStats() {
  const byTrack = (t: TrackId) => WORKSHEETS.filter((w) => w.track === t).length;
  const items = WORKSHEETS.reduce((s, w) => s + w.totalItems, 0);
  const byStage = STAGES.map((s) => ({
    stage: s,
    worksheets: WORKSHEETS.filter((w) => w.stageId === s.id).length,
    missions: MISSIONS.filter((m) => m.stageId === s.id).length,
  }));
  const packedTopicCount =
    packedTopics('thpt').length +
    packedTopics('chuyen').length +
    packedTopics('thpt-qg').length +
    packedTopics('lop6').length +
    packedTopics('chinh-khoa').length;
  return {
    worksheets: WORKSHEETS.length,
    missions: MISSIONS.length,
    items,
    thpt: byTrack('thpt'),
    chuyen: byTrack('chuyen'),
    quocGia: byTrack('thpt-qg'),
    lop6: byTrack('lop6'),
    chinhKhoa: byTrack('chinh-khoa'),
    generators: GENERATORS.length,
    sheetTypes: SHEET_TYPES.length,
    packedTopics: packedTopicCount,
    byStage,
  };
}
