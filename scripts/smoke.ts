/** Kiểm tra nhanh toàn bộ catalog: sinh mọi phiếu và xác nhận dữ liệu hợp lệ. */
import { WORKSHEETS, MISSIONS, buildWorksheet, packedTopics, catalogStats } from '../src/data/catalog';
import { GENERATORS } from '../src/data/generators';
import { SHEET_TYPES } from '../src/data/sheets';
import { DRILL_ANALYSIS } from '../src/data/analysis';
import { EXAM_PAPERS, paperItems, paperStats } from '../src/data/papers';
import { BLUEPRINTS } from '../src/data/blueprints';
import { TOPICS } from '../src/data/topics';
import { FORMULA_GROUPS, ALL_FORMULAS, searchFormulas, formulaStats } from '../src/data/formulas';
import { LESSON_PLANS, TEACHING_MOVES, FEEDBACK_SCRIPTS, CLASS_RITUALS, OBSERVATION_RUBRIC } from '../src/data/academy';
import { searchIndex, searchAll, indexStats, KIND_META } from '../src/lib/search';
import { buildTodayPlan, buildReviewQueue, studyStreak, examCountdown, dayKey } from '../src/lib/review';
import { buildWeeklyReport } from '../src/lib/report';
import { emptyState } from '../src/lib/storage';
import type { AppState } from '../src/types';
import { SCALE } from '../src/data/scale';
import { TOPIC_INDEX, PAPER_INDEX, PAPER_CARDS } from '../src/data/catalog-index';
import { PAGES, allIndexablePaths, matchRoute, legacyRedirect, href, topicSlug, paperSlug, topicIdFromSlug, paperIdFromSlug } from '../src/lib/routes';
import { seoFor, auditPage, SITE } from '../src/lib/seo';
import { KEYWORDS, keywordStats } from '../src/data/keywords';
import { FAQS } from '../src/data/faq';
import { formulaStats } from '../src/data/formulas';
import { countFolders, countArtifacts } from '../src/data/library-tree';
import { LIBRARY_TREE } from '../src/data/library-tree';

let items = 0;
let bad = 0;
const seenPrompts = new Set<string>();

let dupInSheet = 0;
for (const meta of WORKSHEETS) {
  const ws = buildWorksheet(meta);
  const local = new Set<string>();
  for (const part of ws.parts) for (const it of part.items) {
    if (local.has(it.prompt)) dupInSheet++;
    local.add(it.prompt);
  }
  for (const part of ws.parts) {
    for (const it of part.items) {
      items++;
      seenPrompts.add(it.prompt);
      if (it.choices.length !== 4) { console.error('BAD choices', meta.id, it.prompt); bad++; }
      if (it.correct < 0 || it.correct > 3) { console.error('BAD correct index', meta.id, it.prompt); bad++; }
      if (new Set(it.choices).size !== 4) { console.error('DUP choices', meta.id, it.prompt, it.choices); bad++; }
      if (!it.steps.length) { console.error('NO steps', meta.id, it.prompt); bad++; }
      if (/undefined|NaN|Infinity/.test(it.prompt + it.choices.join('') + it.steps.join(''))) {
        console.error('BAD token', meta.id, it.prompt, it.choices); bad++;
      }
    }
  }
}
const missingAnalysis = GENERATORS.filter((g) => !DRILL_ANALYSIS[g.id]).map((g) => g.id);
const st = catalogStats();
console.log('generators:', GENERATORS.length, '| có bảng phân tích:', GENERATORS.length - missingAnalysis.length);
if (missingAnalysis.length) { console.error('THIẾU phân tích:', missingAnalysis.join(', ')); bad++; }
console.log('loại phiếu:', SHEET_TYPES.length, '| chuyên đề có bộ phiếu:',
  packedTopics('thpt').length + packedTopics('chuyen').length + packedTopics('thpt-qg').length);
console.log('phiếu/luồng: thpt', st.thpt, '| chuyên', st.chuyen, '| THPT 10-12', st.quocGia);
console.log('worksheets:', WORKSHEETS.length, '| missions:', MISSIONS.length);
console.log('items generated:', items, '| distinct prompts:', seenPrompts.size);
console.log('duplicate prompts inside a single sheet:', dupInSheet);
/* ---------- Đề mẫu trọn vẹn: đối chiếu với ma trận đề ---------- */
const topicIds = new Set(TOPICS.map((t) => t.id));
let paperItemCount = 0;
let paperClaims = 0;
for (const paper of EXAM_PAPERS) {
  const bp = BLUEPRINTS.find((b) => b.id === paper.blueprintId);
  if (!bp) { console.error('ĐỀ không khớp ma trận nào:', paper.id); bad++; continue; }
  const st2 = paperStats(paper);
  paperItemCount += st2.items;
  paperClaims += st2.claims;
  if (Math.abs(st2.points - paper.totalPoints) > 1e-9) {
    console.error('TỔNG ĐIỂM lệch', paper.id, st2.points, '≠', paper.totalPoints); bad++;
  }
  if (Math.abs(bp.totalPoints - paper.totalPoints) > 1e-9) {
    console.error('THANG ĐIỂM lệch ma trận', paper.id, paper.totalPoints, '≠', bp.totalPoints); bad++;
  }
  if (bp.minutes !== paper.minutes) {
    console.error('THỜI GIAN lệch ma trận', paper.id, paper.minutes, '≠', bp.minutes); bad++;
  }
  if (st2.minutes > paper.minutes) {
    console.error('TỔNG PHÚT các câu vượt thời gian đề', paper.id, st2.minutes, '>', paper.minutes); bad++;
  }
  if (paper.parts.length !== bp.parts.length) {
    console.error('SỐ PHẦN lệch ma trận', paper.id, paper.parts.length, '≠', bp.parts.length); bad++;
  } else {
    paper.parts.forEach((part, i) => {
      const declared = part.items.reduce((s, it) => s + it.points, 0);
      if (Math.abs(declared - part.points) > 1e-9) {
        console.error('ĐIỂM PHẦN lệch', paper.id, part.label, declared, '≠', part.points); bad++;
      }
      if (Math.abs(part.points - bp.parts[i].points) > 1e-9) {
        console.error('ĐIỂM PHẦN lệch ma trận', paper.id, part.label, part.points, '≠', bp.parts[i].points); bad++;
      }
    });
  }
  for (const it of paperItems(paper)) {
    if (!it.statement.trim()) { console.error('THIẾU đề bài', it.id); bad++; }
    if (!it.solution.length) { console.error('THIẾU lời giải', it.id); bad++; }
    if (!it.barem.length) { console.error('THIẾU barem', it.id); bad++; }
    if (!it.answer.trim()) { console.error('THIẾU đáp án', it.id); bad++; }
    const a = it.analysis;
    if (!a.dang || !a.knowledge.length || !a.docVi.length || !a.method.length || !a.traps.length || !a.tips.length || !a.transfer) {
      console.error('BẢNG PHÂN TÍCH thiếu mục', it.id); bad++;
    }
    for (const t of it.topicIds) {
      if (!topicIds.has(t)) { console.error('TOPIC không tồn tại', it.id, t); bad++; }
    }
    if (it.format === 'trac-nghiem') {
      if (!it.choices || it.choices.length !== 4) { console.error('TRẮC NGHIỆM không đủ 4 phương án', it.id); bad++; }
      else if (new Set(it.choices).size !== 4) { console.error('TRẮC NGHIỆM trùng phương án', it.id); bad++; }
      if (it.correctIndex === undefined || it.correctIndex < 0 || it.correctIndex > 3) {
        console.error('TRẮC NGHIỆM sai chỉ số đáp án', it.id); bad++;
      } else if (it.choices && it.answer.trim() !== it.choices[it.correctIndex].trim()) {
        console.error('ĐÁP ÁN không khớp phương án đúng', it.id, it.answer, '≠', it.choices[it.correctIndex]); bad++;
      }
    }
    if (it.format === 'dung-sai') {
      if (!it.claims || it.claims.length !== 4) { console.error('ĐÚNG/SAI không đủ 4 ý', it.id); bad++; }
      else if (it.claims.some((c) => !c.why.trim())) { console.error('ĐÚNG/SAI thiếu giải thích', it.id); bad++; }
      const baremPts = it.barem.map((b) => b.point).join(',');
      if (baremPts !== '0.1,0.25,0.5,1') { console.error('BAREM luỹ tiến sai', it.id, baremPts); bad++; }
    }
    if (it.format !== 'dung-sai') {
      const sum = it.barem.reduce((s, b) => s + b.point, 0);
      if (Math.abs(sum - it.points) > 1e-9) {
        console.error('BAREM không cộng đủ điểm câu', it.id, sum, '≠', it.points); bad++;
      }
    }
  }
}
console.log('đề mẫu trọn vẹn:', EXAM_PAPERS.length, '| câu hỏi:', paperItemCount, '| mệnh đề đúng/sai:', paperClaims);
console.log('ma trận đề:', BLUEPRINTS.length, '| ma trận đã có đề mẫu:',
  new Set(EXAM_PAPERS.map((p) => p.blueprintId)).size);

/* ---------- Sổ tay công thức ---------- */
{
  const topicIds = new Set(TOPICS.map((t) => t.id));
  for (const g of FORMULA_GROUPS) {
    if (!g.items.length) { console.error('NHÓM công thức rỗng', g.id); bad++; }
    if (!g.intro.trim()) { console.error('NHÓM thiếu phần dẫn', g.id); bad++; }
    for (const t of g.topicIds) {
      if (!topicIds.has(t)) { console.error('CÔNG THỨC trỏ tới chuyên đề không tồn tại', g.id, t); bad++; }
    }
    const names = g.items.map((i) => i.name);
    if (new Set(names).size !== names.length) { console.error('CÔNG THỨC trùng tên trong nhóm', g.id); bad++; }
    for (const it of g.items) {
      if (!it.expr.trim()) { console.error('CÔNG THỨC thiếu biểu thức', g.id, it.name); bad++; }
      if (!it.use.trim()) { console.error('CÔNG THỨC thiếu phần “dùng khi nào”', g.id, it.name); bad++; }
    }
  }
  if (!searchFormulas('dinh li cosin').length) { console.error('TÌM KIẾM không dấu của sổ tay hỏng'); bad++; }
  const fs = formulaStats();
  console.log('sổ tay công thức:', fs.items, 'công thức /', fs.groups, 'nhóm | phải thuộc:', fs.starred, '| có cảnh báo bẫy:', fs.withTrap);
}

/* ---------- Tài liệu học viện ---------- */
{
  for (const p of LESSON_PLANS) {
    const sum = p.blocks.reduce((s, b) => s + b.minutes, 0);
    if (sum > p.minutes) { console.error('GIÁO ÁN vượt thời lượng', p.id, sum, '>', p.minutes); bad++; }
    if (sum < p.minutes * 0.9) { console.error('GIÁO ÁN hụt quá nhiều thời lượng', p.id, sum, '<', p.minutes); bad++; }
    for (const b of p.blocks) {
      if (!b.success.trim() || !b.pitfall.trim()) { console.error('KHỐI giáo án thiếu dấu hiệu đạt hoặc lỗi hay mắc', p.id, b.name); bad++; }
      if (!b.teacher.length || !b.student.length) { console.error('KHỐI giáo án thiếu việc của giáo viên hoặc học sinh', p.id, b.name); bad++; }
    }
    if (!p.homework.length || !p.evidence.length) { console.error('GIÁO ÁN thiếu phần giao việc hoặc phần đo hiệu quả', p.id); bad++; }
  }
  for (const m of TEACHING_MOVES) {
    if (!m.how.length || !m.why.trim() || !m.avoid.trim()) { console.error('NƯỚC ĐI thiếu mục', m.name); bad++; }
  }
  for (const f of FEEDBACK_SCRIPTS) {
    if (!f.say.trim() || !f.then.trim() || !f.never.trim()) { console.error('KỊCH BẢN nhận xét thiếu mục', f.situation); bad++; }
  }
  for (const r of OBSERVATION_RUBRIC) {
    if (r.levels.length !== 4) { console.error('BẢNG dự giờ không đủ 4 mức', r.area); bad++; }
  }
  const w = OBSERVATION_RUBRIC.reduce((s, r) => s + r.weight, 0);
  if (w !== 100) { console.error('TRỌNG SỐ bảng dự giờ không cộng đủ 100', w); bad++; }
  console.log('học viện:', LESSON_PLANS.length, 'giáo án /', LESSON_PLANS.reduce((s, p) => s + p.blocks.length, 0),
    'khối |', TEACHING_MOVES.length, 'nước đi |', FEEDBACK_SCRIPTS.length, 'kịch bản |', CLASS_RITUALS.length, 'nghi thức');
}

/* ---------- Chỉ số tìm kiếm ---------- */
{
  const idx = searchIndex();
  const ids = new Set<string>();
  let dupIds = 0;
  for (const d of idx) {
    if (ids.has(d.id)) dupIds++;
    ids.add(d.id);
    if (!d.route.startsWith('/')) { console.error('TÌM KIẾM có đường dẫn sai', d.id, d.route); bad++; }
    if (!KIND_META[d.kind]) { console.error('TÌM KIẾM có loại không khai báo', d.kind); bad++; }
    if (!d.title.trim()) { console.error('TÌM KIẾM có mục thiếu tiêu đề', d.id); bad++; }
  }
  if (dupIds) { console.error('TÌM KIẾM trùng id:', dupIds); bad++; }
  for (const q of ['viete', 'tiep tuyen', 'dirichlet', 'tich phan', 'truc dang phuong']) {
    if (!searchAll(q).total) { console.error('TÌM KIẾM không ra kết quả cho', q); bad++; }
  }
  if (searchAll('a').total) { console.error('TÌM KIẾM nhận truy vấn quá ngắn'); bad++; }
  console.log('chỉ số tìm kiếm:', indexStats().total, 'mục | trùng id:', dupIds);
}

/* ---------- Nhịp học và báo cáo ---------- */
{
  const DAY = 86400000;
  const day = (o: number) => new Date(Date.now() - o * DAY).toISOString();
  const dk = (o: number) => dayKey(new Date(Date.now() - o * DAY));
  const missions = MISSIONS.filter((m) => m.track === 'thpt').slice(0, 3);
  const st: AppState = {
    ...emptyState(),
    profile: {
      name: 'Kiểm thử', grade: '9', track: 'thpt', targetSchool: 'hanoi-chung', groupId: 'but-pha',
      examDate: dayKey(new Date(Date.now() + 40 * DAY)), hoursPerWeek: 10, createdAt: day(30),
    },
    levelUnlocked: { thpt: 2, chuyen: 1, 'thpt-qg': 1 },
    studyLog: Object.fromEntries([0, 1, 2, 5, 8].map((o) => [dk(o), 30])),
    attempts: missions.flatMap((m, i) =>
      [9, 3].slice(0, i + 1).map((o, k) => ({
        id: `a${m.id}${k}`, missionId: m.id, worksheetId: m.worksheetId, variant: k,
        correct: 9, total: 12, kpi: 75 + i * 5, seconds: 900, at: day(o),
        level: 1, stageId: 'T1', wrongSkills: ['x'], wrongTopics: [m.topicId], passed: false,
      })),
    ),
    mistakes: [0, 1, 2].map((i) => ({
      id: `mk${i}`, at: day(2), missionId: missions[0].id, worksheetId: missions[0].worksheetId,
      partOrder: 1, itemIndex: i, generatorId: 'g', topicId: missions[0].topicId, strand: missions[0].strand,
      skill: 's', prompt: 'p', choices: ['a', 'b', 'c', 'd'], correct: 0, chosen: 1, steps: ['b1'], resolved: false,
    })),
  };
  const streak = studyStreak(st);
  if (streak.current !== 3) { console.error('CHUỖI ngày học tính sai:', streak.current, '≠ 3'); bad++; }
  const q = buildReviewQueue(st, 'thpt');
  if (!q.due.length) { console.error('HÀNG ĐỢI ôn lại rỗng dù đã có lượt làm quá hạn'); bad++; }
  for (const c of q.due.concat(q.upcoming)) {
    if (!c.route.startsWith('/')) { console.error('THẺ ôn lại có đường dẫn sai', c.id); bad++; }
    if (c.minutes <= 0) { console.error('THẺ ôn lại thiếu thời lượng', c.id); bad++; }
  }
  const cd = examCountdown(st);
  if (!cd || cd.daysLeft < 39 || cd.daysLeft > 41) { console.error('ĐẾM NGƯỢC kỳ thi sai:', cd?.daysLeft); bad++; }
  const plan = buildTodayPlan(st, 'thpt');
  if (!plan.tasks.length) { console.error('KẾ HOẠCH Hôm nay rỗng'); bad++; }
  if (!plan.keystone) { console.error('KẾ HOẠCH Hôm nay thiếu việc chốt'); bad++; }
  const taskIds = plan.tasks.map((t) => t.id);
  if (new Set(taskIds).size !== taskIds.length) { console.error('KẾ HOẠCH Hôm nay có việc trùng'); bad++; }
  const rp = buildWeeklyReport(st, 'thpt');
  if (!rp.summary.length) { console.error('BÁO CÁO tuần thiếu nhận xét'); bad++; }
  if (!rp.familyActions.length || !rp.limits.length) { console.error('BÁO CÁO tuần thiếu phần gia đình hoặc phần giới hạn'); bad++; }
  console.log('nhịp học: chuỗi', streak.current, 'ngày | ôn lại đến hạn', q.due.length,
    '| việc hôm nay', plan.tasks.length, '| báo cáo', rp.summary.length, 'nhận xét');
}

/* ---------- Con số quy mô dùng trong phần đầu tài liệu ---------- */
{
  const live: Record<string, number> = {
    worksheets: st.worksheets,
    missions: st.missions,
    chuyen: st.chuyen,
    thpt: st.thpt,
    quocGia: st.quocGia,
    items: st.items,
    generators: st.generators,
    packedTopics: st.packedTopics,
    topics: TOPICS.length,
    formulas: formulaStats().items,
    formulaGroups: formulaStats().groups,
    formulasStarred: formulaStats().starred,
    papers: EXAM_PAPERS.length,
    paperItems: EXAM_PAPERS.reduce((s2, p2) => s2 + paperItems(p2).length, 0),
    libraryFolders: countFolders(LIBRARY_TREE),
    libraryArtifacts: countArtifacts(LIBRARY_TREE),
  };
  let scaleBad = 0;
  for (const [k, v] of Object.entries(live)) {
    const declared = (SCALE as unknown as Record<string, number>)[k];
    if (declared !== v) {
      console.error(`SCALE.${k} lệch với giá trị thật:`, declared, '≠', v);
      scaleBad++;
      bad++;
    }
  }
  console.log('con số quy mô:', Object.keys(live).length, 'trường | lệch:', scaleBad);
}

/* ---------- Danh mục rút gọn phải khớp kho nội dung thật ---------- */
{
  let idxBad = 0;
  if (TOPIC_INDEX.length !== TOPICS.length) { console.error('TOPIC_INDEX thiếu chuyên đề'); idxBad++; }
  for (const t of TOPICS) {
    const row = TOPIC_INDEX.find((x) => x.id === t.id);
    if (!row) { console.error('TOPIC_INDEX thiếu', t.id); idxBad++; continue; }
    if (row.name !== t.name) { console.error('TOPIC_INDEX lệch tên', t.id); idxBad++; }
    if (row.tracks.join(',') !== t.tracks.join(',')) { console.error('TOPIC_INDEX lệch luồng', t.id); idxBad++; }
  }
  if (PAPER_INDEX.length !== EXAM_PAPERS.length) { console.error('PAPER_INDEX thiếu đề'); idxBad++; }
  for (const p2 of EXAM_PAPERS) {
    const row = PAPER_INDEX.find((x) => x.id === p2.id);
    const card = PAPER_CARDS.find((x) => x.id === p2.id);
    if (!row || row.title !== p2.title) { console.error('PAPER_INDEX lệch', p2.id); idxBad++; }
    if (!card) { console.error('PAPER_CARDS thiếu', p2.id); idxBad++; continue; }
    const n = paperItems(p2).length;
    if (card.minutes !== p2.minutes || card.totalPoints !== p2.totalPoints || card.items !== n || card.code !== p2.code || card.track !== p2.track) {
      console.error('PAPER_CARDS lệch số liệu', p2.id); idxBad++;
    }
  }
  bad += idxBad;
  console.log('danh mục rút gọn:', TOPIC_INDEX.length, 'chuyên đề /', PAPER_INDEX.length, 'đề | lệch:', idxBad);
}

/* ---------- Đường dẫn và chuyển hướng ---------- */
{
  let routeBad = 0;
  const paths = allIndexablePaths();
  if (new Set(paths.map((x) => x.path)).size !== paths.length) { console.error('ĐƯỜNG DẪN bị trùng'); routeBad++; }
  for (const x of paths) {
    if (!x.path.startsWith('/')) { console.error('ĐƯỜNG DẪN không hợp lệ', x.path); routeBad++; }
    if (/[A-Z_]/.test(x.path)) { console.error('ĐƯỜNG DẪN có chữ hoa hoặc gạch dưới', x.path); routeBad++; }
    const m = matchRoute(x.path);
    if (m.id !== x.page.id) { console.error('ĐƯỜNG DẪN không khớp lại đúng trang', x.path, m.id, '≠', x.page.id); routeBad++; }
  }
  /* Mọi liên kết hash cũ phải chuyển hướng về một địa chỉ khớp được. */
  const legacy = ['/topics/ds-can-thuc', '/paper/dm-hanoi-01', '/formulas', '/exams', '/papers', '/playbook',
    '/gita', '/library', '/brand', '/roles', '/classes', '/academy', '/today', '/dashboard', '/roadmap',
    '/missions', '/portfolio', '/report', '/onboarding', '/search', '/guide/ds-can-thuc'];
  for (const old of legacy) {
    const to = legacyRedirect(old);
    if (!to) { console.error('CHUYỂN HƯỚNG thiếu cho', old); routeBad++; continue; }
    if (matchRoute(to).id === 'home' && to !== '/') { console.error('CHUYỂN HƯỚNG trỏ tới địa chỉ không khớp', old, '→', to); routeBad++; }
  }
  /* Slug phải giải ngược được về đúng mã. */
  for (const t of TOPICS) if (topicIdFromSlug(topicSlug(t.id)) !== t.id) { console.error('SLUG chuyên đề không giải ngược được', t.id); routeBad++; }
  for (const p2 of EXAM_PAPERS) if (paperIdFromSlug(paperSlug(p2.id)) !== p2.id) { console.error('SLUG đề không giải ngược được', p2.id); routeBad++; }
  bad += routeBad;
  console.log('đường dẫn lập chỉ mục:', paths.length, '| lỗi:', routeBad);
}

/* ---------- Phần đầu tài liệu của mọi trang ---------- */
{
  let seoBad = 0;
  const seen = new Map<string, string>();
  const targets: { id: (typeof PAGES)[number]['id']; params: Record<string, string> }[] = [];
  for (const page of PAGES) {
    if (page.id === 'chuyen-de-detail' || page.id === 'huong-dan-on') {
      for (const t of TOPICS) targets.push({ id: page.id, params: { slug: topicSlug(t.id) } });
    } else if (page.id === 'de-thi-detail') {
      for (const p2 of EXAM_PAPERS) targets.push({ id: page.id, params: { slug: paperSlug(p2.id) } });
    } else {
      targets.push({ id: page.id, params: {} });
    }
  }
  for (const t of targets) {
    const m = seoFor(t.id, t.params);
    const a = auditPage(t.id, t.params);
    if (!m.noindex) {
      if (a.issues.length) { console.error('SEO cảnh báo', a.path, '→', a.issues.join(' | ')); seoBad++; }
      if (m.title.endsWith('…')) { console.error('TIÊU ĐỀ bị cắt giữa chừng', a.path); seoBad++; }
      /* Tiêu đề trùng nhau khiến hai trang tự cạnh tranh trên cùng một truy vấn. */
      const prev = seen.get(m.title);
      if (prev) { console.error('TIÊU ĐỀ trùng giữa', prev, 'và', a.path); seoBad++; }
      seen.set(m.title, a.path);
      if (!m.canonical.startsWith(SITE.origin)) { console.error('ĐỊA CHỈ CHUẨN sai gốc', a.path); seoBad++; }
      if (!m.breadcrumbs.length) { console.error('THIẾU đường dẫn phân cấp', a.path); seoBad++; }
      const types = m.jsonLd.map((j) => String(j['@type']));
      for (const need of ['EducationalOrganization', 'WebPage', 'BreadcrumbList']) {
        if (!types.includes(need)) { console.error('THIẾU dữ liệu có cấu trúc', need, 'ở', a.path); seoBad++; }
      }
      /* Không được phát sinh dữ liệu đánh giá sao khi chưa có đánh giá thật. */
      const raw = JSON.stringify(m.jsonLd);
      if (/AggregateRating|"Review"/.test(raw)) { console.error('CÓ dữ liệu đánh giá sao nhưng chưa có đánh giá thật', a.path); seoBad++; }
    }
  }
  bad += seoBad;
  console.log('phần đầu tài liệu:', targets.length, 'trang | lỗi:', seoBad);
}

/* ---------- Bản đồ từ khoá và câu hỏi thường gặp ---------- */
{
  let kwBad = 0;
  const ks = keywordStats();
  if (ks.duplicates) { console.error('TỪ KHOÁ bị gán cho nhiều trang:', ks.duplicates); kwBad++; }
  const pageIds = new Set(PAGES.map((x) => x.id));
  for (const k of KEYWORDS) {
    if (!pageIds.has(k.page)) { console.error('TỪ KHOÁ trỏ tới trang không tồn tại', k.keyword); kwBad++; }
    const def = PAGES.find((x) => x.id === k.page)!;
    if (!def.indexable) { console.error('TỪ KHOÁ gán cho trang không lập chỉ mục', k.keyword); kwBad++; }
  }
  for (const f of FAQS) {
    if (!pageIds.has(f.page)) { console.error('CÂU HỎI trỏ tới trang không tồn tại', f.q); kwBad++; }
    if (f.a.length < 80) { console.error('CÂU TRẢ LỜI quá ngắn để đứng độc lập', f.q); kwBad++; }
    if (/cam kết đỗ|chắc chắn đỗ|đảm bảo đỗ/i.test(f.a)) {
      /* Cho phép câu phủ định lời hứa, chặn câu khẳng định. */
      if (!/không cam kết|không ai|thận trọng/i.test(f.a)) { console.error('CÂU TRẢ LỜI chứa lời hứa không kiểm chứng được', f.q); kwBad++; }
    }
  }
  const qs = FAQS.map((f) => f.q);
  if (new Set(qs).size !== qs.length) { console.error('CÂU HỎI thường gặp bị trùng'); kwBad++; }
  bad += kwBad;
  console.log('từ khoá:', ks.total, '| câu hỏi thường gặp:', FAQS.length, '| lỗi:', kwBad);
}

console.log('problems:', bad);
process.exit(bad ? 1 : 0);
