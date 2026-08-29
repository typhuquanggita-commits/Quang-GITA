import { TOPICS } from '@/data/topics';
import { MISSIONS, MISSION_KIND_META } from '@/data/catalog';
import { ALL_FORMULAS, normalize } from '@/data/formulas';
import { EXAM_PAPERS, paperItems } from '@/data/papers';
import { QUESTIONS } from '@/data/questions';
import { TIPS, HABITS, METHODS } from '@/data/playbook';
import { BLUEPRINTS } from '@/data/blueprints';
import { SCHOOLS, strandById } from '@/data/schools';
import { LIBRARY_TREE } from '@/data/library-tree';
import { PILLARS, TIERS, PRO_LEVELS, TRAITS } from '@/data/gita';
import { ROLES } from '@/data/roles';
import { SHEET_TYPES } from '@/data/sheets';
import { LESSON_PLANS, TEACHING_MOVES, FEEDBACK_SCRIPTS } from '@/data/academy';
import { RESOURCES } from '@/data/resources';
import type { Folder } from '@/data/library-tree';
import type { TrackId } from '@/types';

/**
 * Tìm kiếm toàn hệ thống.
 *
 * Toàn bộ nội dung của MATH365 nằm sẵn trong bộ nhớ, nên chỉ số tìm kiếm được
 * dựng một lần khi tải trang và tra cứu tức thời, không cần máy chủ.
 *
 * Xếp hạng dựa trên: khớp ở tiêu đề nặng hơn khớp ở phần mô tả; khớp nguyên
 * cụm nặng hơn khớp rời rạc; và mỗi loại nội dung có một trọng số nền phản ánh
 * mức hữu ích trung bình của nó với người học.
 */

export type SearchKind =
  | 'chuyen-de'
  | 'nhiem-vu'
  | 'cong-thuc'
  | 'de-mau'
  | 'cau-hoi'
  | 'bi-kip'
  | 'thoi-quen'
  | 'phuong-phap'
  | 'ky-thi'
  | 'tai-lieu'
  | 'thu-muc'
  | 'gita'
  | 'phan-quyen'
  | 'loai-phieu'
  | 'hoc-vien';

export const KIND_META: Record<SearchKind, { label: string; color: string; page: string }> = {
  'chuyen-de': { label: 'Chuyên đề', color: '#1B4F9C', page: 'Cây chuyên đề' },
  'nhiem-vu': { label: 'Nhiệm vụ', color: '#2E6FBF', page: 'Nhiệm vụ & Phiếu luyện' },
  'cong-thuc': { label: 'Công thức', color: '#0F766E', page: 'Sổ tay công thức' },
  'de-mau': { label: 'Đề mẫu', color: '#E01B24', page: 'Đề mẫu & Bộ giải đề' },
  'cau-hoi': { label: 'Bài mẫu', color: '#7C3AED', page: 'Cây chuyên đề' },
  'bi-kip': { label: 'Bí kíp', color: '#F0A21B', page: 'Bí kíp & Thói quen' },
  'thoi-quen': { label: 'Thói quen', color: '#0F766E', page: 'Bí kíp & Thói quen' },
  'phuong-phap': { label: 'Phương pháp học', color: '#0891B2', page: 'Bí kíp & Thói quen' },
  'ky-thi': { label: 'Kỳ thi', color: '#143C78', page: 'Kỳ thi & Cấu trúc đề' },
  'tai-lieu': { label: 'Tài liệu', color: '#475569', page: 'Kỳ thi & Cấu trúc đề' },
  'thu-muc': { label: 'Thư mục', color: '#64748B', page: 'Kiến trúc tài liệu' },
  gita: { label: 'Mô thức GITA', color: '#E01B24', page: 'Mô thức GITA' },
  'phan-quyen': { label: 'Phân quyền', color: '#94A3B8', page: 'Phân quyền' },
  'loai-phieu': { label: 'Loại phiếu', color: '#7C3AED', page: 'Nhiệm vụ & Phiếu luyện' },
  'hoc-vien': { label: 'Học viện', color: '#B45309', page: 'Học viện giáo viên' },
};

export interface SearchDoc {
  id: string;
  kind: SearchKind;
  title: string;
  subtitle: string;
  body: string;
  route: string;
  tracks?: TrackId[];
  /** Trọng số nền của loại nội dung. */
  weight: number;
  /** Chuỗi đã chuẩn hoá để so khớp, dựng sẵn một lần. */
  hayTitle: string;
  hayAll: string;
}

const doc = (
  d: Omit<SearchDoc, 'hayTitle' | 'hayAll'>,
): SearchDoc => ({
  ...d,
  hayTitle: normalize(d.title),
  hayAll: normalize(`${d.title} ${d.subtitle} ${d.body}`),
});

function flattenFolders(nodes: Folder[], trail: string[] = []): { f: Folder; trail: string[] }[] {
  return nodes.flatMap((f) => [
    { f, trail },
    ...(f.children ? flattenFolders(f.children, [...trail, f.name]) : []),
  ]);
}

let INDEX: SearchDoc[] | null = null;

/** Dựng chỉ số một lần, dùng lại cho mọi lượt tìm. */
export function searchIndex(): SearchDoc[] {
  if (INDEX) return INDEX;
  const docs: SearchDoc[] = [];

  for (const t of TOPICS) {
    docs.push(
      doc({
        id: `t-${t.id}`,
        kind: 'chuyen-de',
        title: t.name,
        subtitle: `${strandById(t.strand)?.name ?? ''} · mức ${t.level}/5 · tần suất ${t.frequency}%`,
        body: `${t.summary} ${t.outcomes.join(' ')} ${t.techniques.join(' ')} ${t.pitfalls.join(' ')} ${(t.keyFormulas ?? []).join(' ')}`,
        route: `/topics/${t.id}`,
        tracks: t.tracks,
        weight: 10,
      }),
    );
  }

  for (const m of MISSIONS) {
    docs.push(
      doc({
        id: `m-${m.id}`,
        kind: 'nhiem-vu',
        title: m.title,
        subtitle: `${MISSION_KIND_META[m.kind].label} · mức ${m.level}/5 · KPI ${m.kpiTarget}%`,
        body: m.objective,
        route: `/mission/${m.id}`,
        tracks: [m.track],
        weight: 4,
      }),
    );
  }

  for (const f of ALL_FORMULAS) {
    docs.push(
      doc({
        id: `f-${f.groupId}-${f.name}`,
        kind: 'cong-thuc',
        title: f.name,
        subtitle: `${f.expr}${f.condition ? ` · ${f.condition}` : ''}`,
        body: `${f.use} ${f.trap ?? ''} ${f.groupName}`,
        route: '/formulas',
        tracks: f.tracks,
        weight: 9,
      }),
    );
  }

  for (const p of EXAM_PAPERS) {
    docs.push(
      doc({
        id: `p-${p.id}`,
        kind: 'de-mau',
        title: p.title,
        subtitle: `${p.code} · ${p.minutes} phút · thang ${p.totalPoints}`,
        body: `${p.subtitle} ${p.fidelity.join(' ')}`,
        route: `/paper/${p.id}`,
        tracks: [p.track],
        weight: 9,
      }),
    );
    for (const it of paperItems(p)) {
      docs.push(
        doc({
          id: `pi-${it.id}`,
          kind: 'de-mau',
          title: `${p.code} · ${it.label} — ${it.analysis.dang}`,
          subtitle: `${p.title} · ${it.points} điểm`,
          body: `${it.statement} ${it.analysis.docVi.join(' ')} ${it.analysis.method.join(' ')} ${it.analysis.traps.join(' ')} ${it.analysis.tips.join(' ')}`,
          route: `/paper/${p.id}`,
          tracks: [p.track],
          weight: 7,
        }),
      );
    }
  }

  for (const q of QUESTIONS) {
    docs.push(
      doc({
        id: `q-${q.id}`,
        kind: 'cau-hoi',
        title: q.statement.slice(0, 90),
        subtitle: `${q.source} · độ khó ${q.difficulty}/5`,
        body: `${q.hint} ${q.solution.join(' ')} ${q.answer}`,
        route: `/topics/${q.topicId}`,
        tracks: [q.track],
        weight: 6,
      }),
    );
  }

  for (const t of TIPS) {
    docs.push(
      doc({
        id: `tip-${t.id}`,
        kind: 'bi-kip',
        title: t.title,
        subtitle: 'Bí kíp',
        body: `${t.body} ${t.example ?? ''}`,
        route: '/playbook',
        tracks: t.tracks,
        weight: 8,
      }),
    );
  }
  for (const h of HABITS) {
    docs.push(
      doc({
        id: `hb-${h.id}`,
        kind: 'thoi-quen',
        title: h.name,
        subtitle: `${h.cadence} · ${h.minutes} phút`,
        body: `${h.why} ${h.how.join(' ')}`,
        route: '/playbook',
        tracks: h.tracks,
        weight: 8,
      }),
    );
  }
  for (const m of METHODS) {
    docs.push(
      doc({
        id: `me-${m.id}`,
        kind: 'phuong-phap',
        title: m.name,
        subtitle: 'Phương pháp học',
        body: `${m.principle} ${m.apply.join(' ')}`,
        route: '/playbook',
        weight: 8,
      }),
    );
  }

  for (const b of BLUEPRINTS) {
    docs.push(
      doc({
        id: `bp-${b.id}`,
        kind: 'ky-thi',
        title: b.title,
        subtitle: `${b.format} · ${b.minutes} phút`,
        body: `${b.updatedNote} ${b.parts.map((p) => `${p.label} ${p.content} ${p.requirements.join(' ')} ${p.tips.join(' ')}`).join(' ')}`,
        route: '/exams',
        weight: 9,
      }),
    );
  }
  for (const s of SCHOOLS) {
    docs.push(
      doc({
        id: `sc-${s.id}`,
        kind: 'ky-thi',
        title: s.name,
        subtitle: `${s.org} · ${s.benchmark}`,
        body: `${s.admissionNote} ${s.rounds.join(' ')} ${s.styleTags.join(' ')} ${s.signature.join(' ')}`,
        route: '/exams',
        tracks: [s.track],
        weight: 8,
      }),
    );
  }
  for (const r of RESOURCES) {
    docs.push(
      doc({
        id: `rs-${r.id}`,
        kind: 'tai-lieu',
        title: r.title,
        subtitle: `${r.author ? r.author + ' · ' : ''}mức ${r.level}/5`,
        body: `${r.description} ${r.usage}`,
        route: '/exams',
        tracks: r.tracks,
        weight: 5,
      }),
    );
  }

  for (const { f, trail } of flattenFolders(LIBRARY_TREE)) {
    docs.push(
      doc({
        id: `fo-${f.code}`,
        kind: 'thu-muc',
        title: `${f.code} · ${f.name}`,
        subtitle: trail.length ? trail.join(' › ') : 'Thư mục gốc',
        body: `${f.purpose} ${f.owner} ${f.artifacts.join(' ')}`,
        route: '/library',
        weight: 4,
      }),
    );
  }

  for (const p of PILLARS) {
    docs.push(
      doc({
        id: `gi-${p.id}`,
        kind: 'gita',
        title: p.name,
        subtitle: `Trụ cột ${p.letter} · ${p.nameEn}`,
        body: `${p.question} ${p.principle} ${p.actions.map((a) => a.items.join(' ')).join(' ')} ${p.kpi.join(' ')}`,
        route: '/gita',
        weight: 8,
      }),
    );
  }
  for (const t of TIERS) {
    docs.push(
      doc({
        id: `ti-${t.id}`,
        kind: 'gita',
        title: t.name,
        subtitle: 'Tầng hấp thu của khách hàng',
        body: `${t.descriptor} ${t.evidence.join(' ')} ${t.materials.join(' ')} ${t.teacherMove} ${t.exitCriteria}`,
        route: '/gita',
        weight: 7,
      }),
    );
  }
  for (const p of PRO_LEVELS) {
    docs.push(
      doc({
        id: `pl-${p.id}`,
        kind: 'gita',
        title: p.name,
        subtitle: p.roleHint,
        body: `${p.scope} ${p.competencies.join(' ')} ${p.canDeliver.join(' ')} ${p.certification.join(' ')}`,
        route: '/gita',
        weight: 7,
      }),
    );
  }
  for (const t of TRAITS) {
    docs.push(
      doc({
        id: `tr-${t.name}`,
        kind: 'gita',
        title: t.name,
        subtitle: 'Phẩm chất rèn qua học tập',
        body: `${t.builtBy} ${t.evidence}`,
        route: '/gita',
        weight: 6,
      }),
    );
  }

  for (const r of ROLES) {
    docs.push(
      doc({
        id: `ro-${r.id}`,
        kind: 'phan-quyen',
        title: r.name,
        subtitle: `${r.group} · ${r.shortName}`,
        body: `${r.description} ${r.criteria.join(' ')} ${r.limits.map((l) => `${l.label} ${l.value}`).join(' ')}`,
        route: '/roles',
        weight: 5,
      }),
    );
  }

  for (const s of SHEET_TYPES) {
    docs.push(
      doc({
        id: `sh-${s.id}`,
        kind: 'loai-phieu',
        title: s.name,
        subtitle: `Mã ${s.code} · ${s.minutes} phút · KPI ${s.kpiTarget}%`,
        body: `${s.purpose} ${s.outcome} ${s.hint}`,
        route: '/missions',
        weight: 7,
      }),
    );
  }

  for (const p of LESSON_PLANS) {
    docs.push(
      doc({
        id: `lp-${p.id}`,
        kind: 'hoc-vien',
        title: p.name,
        subtitle: `Giáo án ${p.minutes} phút`,
        body: `${p.goal} ${p.blocks.map((b) => `${b.name} ${b.purpose} ${b.teacher.join(' ')} ${b.pitfall}`).join(' ')}`,
        route: '/academy',
        tracks: p.tracks,
        weight: 7,
      }),
    );
  }
  for (const m of TEACHING_MOVES) {
    docs.push(
      doc({
        id: `tm-${m.name}`,
        kind: 'hoc-vien',
        title: m.name,
        subtitle: 'Nước đi sư phạm',
        body: `${m.when} ${m.how.join(' ')} ${m.why} ${m.avoid}`,
        route: '/academy',
        weight: 6,
      }),
    );
  }
  for (const f of FEEDBACK_SCRIPTS) {
    docs.push(
      doc({
        id: `fs-${f.situation}`,
        kind: 'hoc-vien',
        title: f.situation,
        subtitle: 'Kịch bản nhận xét',
        body: `${f.signal} ${f.say} ${f.then} ${f.never}`,
        route: '/academy',
        weight: 6,
      }),
    );
  }

  INDEX = docs;
  return docs;
}

export interface SearchHit extends SearchDoc {
  score: number;
}

export interface SearchOutcome {
  total: number;
  hits: SearchHit[];
  /** Số kết quả theo từng loại, để dựng bộ lọc. */
  byKind: { kind: SearchKind; count: number }[];
}

/**
 * Tìm kiếm không dấu, không phân biệt hoa thường.
 * @param track lọc theo luồng; bỏ trống thì tìm toàn bộ.
 */
export function searchAll(
  query: string,
  opts: { track?: TrackId; kind?: SearchKind; limit?: number } = {},
): SearchOutcome {
  const q = normalize(query.trim());
  if (q.length < 2) return { total: 0, hits: [], byKind: [] };
  const words = q.split(/\s+/).filter(Boolean);
  const { track, kind, limit = 60 } = opts;

  const scored: SearchHit[] = [];
  for (const d of searchIndex()) {
    if (track && d.tracks && !d.tracks.includes(track)) continue;

    let score = 0;
    if (d.hayTitle.includes(q)) score += 60;
    else if (d.hayAll.includes(q)) score += 25;

    let matchedWords = 0;
    for (const w of words) {
      if (d.hayTitle.includes(w)) {
        score += 12;
        matchedWords++;
      } else if (d.hayAll.includes(w)) {
        score += 4;
        matchedWords++;
      }
    }
    // Phải khớp mọi từ khoá thì mới nhận — tránh kết quả nhiễu.
    if (matchedWords < words.length) continue;
    if (score === 0) continue;

    // Khớp ngay đầu tiêu đề thì đáng tin hơn.
    if (d.hayTitle.startsWith(q)) score += 20;
    score += d.weight;

    scored.push({ ...d, score });
  }

  scored.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

  const counts = new Map<SearchKind, number>();
  for (const s of scored) counts.set(s.kind, (counts.get(s.kind) ?? 0) + 1);

  const filtered = kind ? scored.filter((s) => s.kind === kind) : scored;

  return {
    total: scored.length,
    hits: filtered.slice(0, limit),
    byKind: [...counts.entries()]
      .map(([k, count]) => ({ kind: k, count }))
      .sort((a, b) => b.count - a.count),
  };
}

export const indexStats = () => {
  const idx = searchIndex();
  const byKind = new Map<SearchKind, number>();
  for (const d of idx) byKind.set(d.kind, (byKind.get(d.kind) ?? 0) + 1);
  return { total: idx.length, byKind: [...byKind.entries()].sort((a, b) => b[1] - a[1]) };
};
