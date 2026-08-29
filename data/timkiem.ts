/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import * as D from './index';

/* ==========================================================================
   TÌM KIẾM TOÀN HỆ THỐNG

   Hệ thống có 29 mục và khoảng hai nghìn ba trăm mẩu nội dung. Trước tệp này
   không có ô tìm kiếm nào — muốn xem lại một bài luyện, một triệu chứng hay
   một ngày trong hồ sơ thì phải nhớ nó nằm ở mục nào. Ai không nhớ thì không
   tìm ra, và nội dung có cũng như không.

   HAI QUYẾT ĐỊNH ĐÁNG NÓI

   1. Bỏ dấu khi so khớp. Người Việt gõ nhanh thường không bỏ dấu, và bàn phím
      điện thoại lại hay bỏ dấu sai. Gõ "phat am" phải ra "phát âm"; gõ "de
      chuyen" phải ra "đề chuyên". Chữ đ cũng phải quy về d, vì bàn phím không
      dấu không gõ được đ.

   2. Dựng chỉ mục lúc mở ô tìm chứ không lúc mở app. Chỉ mục kéo theo cả kho
      1.000 đơn kê, 365 ngày hồ sơ và 300 bài định hướng. Dựng sẵn thì mọi
      người học đều trả giá cho một tính năng chỉ một phần trong số họ dùng.
   ========================================================================== */

export interface MucTim {
  /** Mã mục trên thanh điều hướng — bấm vào kết quả thì nhảy tới đây. */
  tab: string;
  nhom: string;
  tieuDe: string;
  phu: string;
  /** Chuỗi đã bỏ dấu và hạ chữ thường, dùng để so khớp. */
  khoa: string;
}

/**
 * Bỏ dấu, hạ chữ thường, quy đ về d.
 *
 * Dùng chuẩn hoá NFD để tách dấu thành ký tự tổ hợp riêng rồi loại chúng đi;
 * cách này đúng cho cả năm dấu thanh lẫn dấu phụ của â ă ê ô ơ ư.
 */
export function boDau(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

const chuoi = (...phan: unknown[]): string =>
  phan
    .filter((p) => typeof p === 'string' || typeof p === 'number')
    .join(' · ');

/** Cắt cho vừa một dòng kết quả, không cắt giữa từ. */
const gon = (s: string, n = 120): string => {
  if (!s) return '';
  const t = s.replace(/\s+/g, ' ').trim();
  if (t.length <= n) return t;
  const c = t.slice(0, n);
  return c.slice(0, c.lastIndexOf(' ')) + '…';
};

let cache: MucTim[] | null = null;

/**
 * Dựng chỉ mục. Gọi lần đầu mới tính, các lần sau trả lại bản đã có.
 */
export function xayIndex(): MucTim[] {
  if (cache) return cache;
  const ra: MucTim[] = [];

  const them = <T>(
    tab: string,
    nhom: string,
    ds: readonly T[],
    tieuDe: (x: T) => string,
    phu: (x: T) => string,
    them2?: (x: T) => string,
  ) => {
    for (const x of ds) {
      const t = tieuDe(x);
      if (!t) continue;
      const p = phu(x) || '';
      ra.push({
        tab,
        nhom,
        tieuDe: t,
        phu: gon(p),
        // Tên nhóm cũng phải tìm được: gõ "đề chuyên" phải ra các phần của đề
        // chuyên, dù tiêu đề từng phần chỉ ghi "Phần 5 · VIẾT".
        khoa: boDau([t, p, nhom, them2 ? them2(x) : ''].join(' ')),
      });
    }
  };

  them('roadmap', 'Cột mốc', D.MILESTONES, (m) => `${m.codename} — ${m.months}`,
    (m) => m.tagline, (m) => `${m.id} ${m.bigIdea} ${m.focus.join(' ')}`);
  them('methods', 'Phương pháp', D.METHODS, (m) => m.vnName || m.name,
    (m) => m.what, (m) => `${m.id} ${m.name} ${m.origin} ${m.bestFor}`);
  them('drills', 'Bài luyện', D.DRILLS, (d) => d.name,
    (d) => d.goal, (d) => `${d.id} ${d.skill} ${d.steps.join(' ')}`);
  them('resources', 'Tài liệu', D.RESOURCES, (r) => r.name,
    (r) => r.why, (r) => `${r.id} ${r.kind} ${r.author ?? ''} ${r.howToUse}`);
  them('playbooks', 'Bí kíp', D.PLAYBOOKS, (p) => p.title,
    (p) => p.secret, (p) => `${p.id} ${p.skill} ${p.moves.join(' ')}`);
  them('habits', 'Thói quen', D.HABITS, (h) => h.name,
    (h) => h.routine, (h) => `${h.id} ${h.cue} ${h.identity}`);
  them('habits', 'Nghi thức', D.RITUALS, (r) => r.name,
    (r) => r.why, (r) => `${r.id} ${r.when} ${r.steps.join(' ')}`);
  them('mindset', 'Tư duy', D.MINDSET_MODULES, (m) => m.name,
    (m) => m.principle, (m) => `${m.id} ${m.oldStory} ${m.newStory}`);
  them('clubs', 'Câu lạc bộ', D.CLUBS, (c) => c.name,
    (c) => c.outcome, (c) => `${c.id} ${c.format} ${c.rules.join(' ')}`);
  them('levels', 'Cấp độ', D.LEVELS, (l) => `${l.name} — ${l.epithet}`,
    (l) => l.mission, (l) => `${l.id} ${l.entry} ${l.challenge}`);
  them('grading', 'Lỗi hay gặp', D.ERROR_REMEDIES, (e) => `${e.code} — ${e.error}`,
    (e) => e.strategy, (e) => `${e.id} ${e.skill} ${e.example} ${e.rootCause}`);
  them('exams', 'Đề tốt nghiệp', D.GRADUATION_EXAMS, (e) => e.name,
    (e) => e.when, (e) => `${e.id} ${e.scope} ${e.ifFail}`);
  them('training', 'Khoá đào tạo', D.TRAINING_COURSES, (c) => c.name,
    (c) => c.promise, (c) => `${c.id} ${c.role} ${c.cadence}`);
  them('assistant', 'Trợ lý AI', D.DIALOGUE_ACTS, (a) => a.name,
    (a) => a.does, (a) => `${a.id} ${a.trigger} ${a.guardrail}`);
  them('assistant', 'Gói học', D.PACKAGES, (p) => p.name,
    (p) => p.who, (p) => `${p.id} ${p.aiScope} ${p.aiCannot}`);
  them('certify', 'Trục năng lực', D.AXES, (a) => a.name,
    (a) => a.what, (a) => `${a.id} ${a.measuredBy} ${a.failLooks}`);
  them('podcast', 'Podcast', D.PODCAST_EPISODES, (e) => e.title,
    (e) => e.takeaway, (e) => `${e.id} ${e.task}`);
  them('casting', 'Giọng', D.VOICE_ROSTER, (v) => v.stageName,
    (v) => v.character, (v) => `${v.id} ${v.accent} ${v.bestFor}`);

  them('gita', 'Hành trình GITA', D.GITA_JOURNEY, (s) => `Bước ${s.no} · ${s.name}`,
    (s) => s.englishRole, (s) => `${s.phase} ${s.shortName} ${s.months}`);
  them('gita', 'Bài định hướng', D.lessons300(), (l) => l.title,
    (l) => l.why, (l) => `${l.phase} ${l.theme} ${l.rungName} ${l.months}`);

  them('chuyen', 'Phần đề chuyên', D.EXAM_PARTS, (p) => `Phần ${p.no} · ${p.name}`,
    (p) => p.whatItTests, (p) => p.commonLoss);
  them('chuyen', 'Giai đoạn chuyên', D.CHUYEN_PHASES, (p) => `Giai đoạn ${p.no} · ${p.name}`,
    (p) => p.goal, (p) => `${p.grade} ${p.months} ${p.exitGate}`);
  them('chuyen', 'Cấp chuyên', D.CHUYEN_LEVELS, (l) => `Cấp ${l.no} · ${l.name}`,
    (l) => l.target, (l) => `${l.criteria.join(' ')} ${l.ifStuck}`);
  them('chuyen', 'Phác đồ nâng cấp', D.UPGRADE_PLANS, (u) => `${u.part} — ${u.symptom}`,
    (u) => u.drill, (u) => `${u.rootCause} ${u.gain}`);
  them('chuyen', 'Bậc đầu vào', D.BANDS, (b) => b.name,
    (b) => b.feasible, (b) => `${b.id} ${b.focus.join(' ')} ${b.honestNote}`);

  them('tuyen', 'Hai tuyến', D.TUYEN, (t) => t.ten, (t) => t.dich,
    (t) => `${t.id} ${t.doiTuong} ${t.heDo} ${t.kyThi}`);
  them('tuyen', 'Trục phân kỳ', D.PHAN_KY, (p) => `Phân kỳ · ${p.truc}`,
    (p) => p.heQua, (p) => `${p.ielts} ${p.chuyen}`);
  them('tuyen', 'Lõi dùng chung', D.LOI_CHUNG, (l) => `Lõi ${l.no} · ${l.ten}`,
    (l) => l.vi, (l) => l.drillIds.join(' '));
  them('tuyen', 'Lẫn tuyến', D.NHAM_LAN, (n) => n.sai, (n) => n.gia, (n) => n.dung);

  for (const s of D.LECTURE_SERIES)
    them('lectures', `Bài giảng · ${s.name}`, s.lessons,
      (l) => `Bài ${l.no} · ${l.title}`,
      (l) => l.outcome,
      (l) => `${s.id} ${l.drillId ?? ''} ${l.trap ?? ''}`);

  them('dossier', 'Hồ sơ 365 ngày', D.dossierYear(),
    (d) => `Ngày ${d.day} · ${d.title}`,
    (d) => d.focus, (d) => `${d.kind} ${d.weekday} ${d.targets}`);

  // Chỉ mục 40 TRIỆU CHỨNG chứ không phải 1.000 đơn kê. Mỗi triệu chứng sinh
  // ra 25 đơn, một cho mỗi cấp độ, và cả 25 đơn ấy dùng chung một mô tả gốc.
  // Đưa hết vào thì một câu hỏi trả về hai mươi lăm dòng gần như y hệt nhau,
  // đẩy mọi thứ khác ra khỏi màn hình. Người học tìm theo triệu chứng — "nghe
  // hụt âm cuối" — rồi mới chọn cấp của mình trong tab Đánh giá.
  them('assess', 'Triệu chứng', D.SYMPTOMS, (s) => s.name,
    (s) => s.saidAs, (s) => `${s.id} ${s.skill} ${s.rootCause}`);

  cache = ra;
  return ra;
}

export interface KetQua extends MucTim {
  diem: number;
}

/** Số kết quả tối đa lấy từ một nhóm, để không nhóm nào chiếm hết màn hình. */
export const MOI_NHOM = 4;

/**
 * Tìm và xếp hạng.
 *
 * Khớp ở tiêu đề đáng giá hơn khớp ở phần mô tả, và khớp ở đầu chuỗi đáng giá
 * hơn khớp ở giữa. Mọi từ trong câu hỏi đều phải có mặt, nếu không thì gõ hai
 * từ lại ra nhiều kết quả hơn gõ một từ.
 */
export function tim(cau: string, chiMuc: MucTim[], gioiHan = 40): KetQua[] {
  const q = boDau(cau).trim();
  if (q.length < 2) return [];
  const tu = q.split(/\s+/).filter(Boolean);
  const ra: KetQua[] = [];

  for (const m of chiMuc) {
    const td = boDau(m.tieuDe);
    if (!tu.every((t) => m.khoa.includes(t))) continue;

    let diem = 0;
    const viTri = td.indexOf(q);
    if (viTri === 0) diem = 120;
    else if (viTri > 0) diem = 100 - Math.min(40, viTri);
    else if (tu.every((t) => td.includes(t))) diem = 70;
    else if (boDau(m.phu).includes(q)) diem = 50;
    else if (boDau(m.nhom).includes(q)) diem = 40;
    else diem = 20;

    // Tiêu đề ngắn mà khớp thì sát ý hơn tiêu đề dài mà khớp.
    diem += Math.max(0, 20 - Math.floor(td.length / 8));
    ra.push({...m, diem});
  }

  ra.sort((a, b) => b.diem - a.diem || a.tieuDe.localeCompare(b.tieuDe));

  // Chặn một nhóm chiếm hết màn hình. Hồ sơ 365 ngày và bộ 300 bài định hướng
  // đông gấp mười lần các nhóm khác, nên nếu không chặn thì một câu hỏi chung
  // chung chỉ trả về ngày và bài — người học không biết là còn nhóm khác.
  const dem: Record<string, number> = {};
  const loc: KetQua[] = [];
  for (const x of ra) {
    dem[x.nhom] = (dem[x.nhom] ?? 0) + 1;
    if (dem[x.nhom] <= MOI_NHOM) loc.push(x);
    if (loc.length >= gioiHan) break;
  }
  return loc;
}
