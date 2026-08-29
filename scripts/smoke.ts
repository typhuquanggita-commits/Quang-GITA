/** Kiểm tra nhanh toàn bộ catalog: sinh mọi phiếu và xác nhận dữ liệu hợp lệ. */
import { WORKSHEETS, MISSIONS, buildWorksheet, packedTopics, catalogStats } from '../src/data/catalog';
import { GENERATORS } from '../src/data/generators';
import { SHEET_TYPES } from '../src/data/sheets';
import { DRILL_ANALYSIS } from '../src/data/analysis';
import { EXAM_PAPERS, paperItems, paperStats } from '../src/data/papers';
import { BLUEPRINTS } from '../src/data/blueprints';
import { TOPICS } from '../src/data/topics';

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

console.log('problems:', bad);
process.exit(bad ? 1 : 0);
