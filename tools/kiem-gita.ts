/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kiểm mô thức GITA và bộ 300 bài định hướng.
 * Chạy: npx tsx tools/kiem-gita.ts
 */
import {
  GITA_JOURNEY, GITA_CREED, THINKING_LANES, FILTERS, FILTER_NOTE,
  STRATEGIC_THREADS, SUCCESS_PATH,
} from '../data/gita';
import {lessons300, THEMES} from '../data/lessons300';
import {GITA_PHASES} from '../data/academy';

let bad = 0;
const fail = (m: string) => { bad++; console.log('  ✗ ' + m); };
const ok = (m: string) => console.log('  ✓ ' + m);

console.log('\n  KIỂM MÔ THỨC GITA VÀ 300 BÀI ĐỊNH HƯỚNG\n');

/* --- Hành trình 12 bước phải khớp tài liệu gốc --- */
GITA_JOURNEY.length === 12
  ? ok('đủ 12 bước hành trình') : fail(`có ${GITA_JOURNEY.length} bước`);
GITA_JOURNEY.every((s, i) => s.no === i + 1)
  ? ok('12 bước đánh số liên tục') : fail('bước đánh số sai');

const PHA = ['HIỂU MÌNH', 'RÈN MÌNH', 'BỨT PHÁ', 'TRƯỞNG THÀNH'];
const phaTrongHanhTrinh = [...new Set(GITA_JOURNEY.map(s => s.phase))];
JSON.stringify(phaTrongHanhTrinh) === JSON.stringify(PHA)
  ? ok('bốn pha xuất hiện đúng thứ tự HIỂU MÌNH → RÈN MÌNH → BỨT PHÁ → TRƯỞNG THÀNH')
  : fail(`thứ tự pha sai: ${phaTrongHanhTrinh.join(' → ')}`);

// Bốn pha trong academy.ts phải trùng bốn pha của hành trình — trước đây
// chúng là bốn pha G-I-T-A bịa, và phép kiểm này tồn tại để điều đó không lặp.
JSON.stringify(GITA_PHASES.map(p => p.code)) === JSON.stringify(PHA)
  ? ok('GITA_PHASES khớp đúng bốn pha của tài liệu gốc')
  : fail(`GITA_PHASES lệch: ${GITA_PHASES.map(p => p.code).join(', ')}`);

GITA_JOURNEY.every(s => s.points.length >= 3 && s.englishRole && s.months)
  ? ok('mọi bước có đủ điểm chính, mốc tháng, và vai trò của tiếng Anh')
  : fail('có bước thiếu trường');

/* --- Sơ đồ tư duy --- */
THINKING_LANES.length === 3
  ? ok('ba luồng của bàn đạp: thói quen, hành động, trải nghiệm')
  : fail(`có ${THINKING_LANES.length} luồng`);
THINKING_LANES.every(l => l.chain.length >= 3)
  ? ok('mỗi luồng có chuỗi đủ dài') : fail('có luồng quá ngắn');
SUCCESS_PATH.sixRoles.length === 6
  ? ok('sáu vai trò của cố vấn') : fail(`có ${SUCCESS_PATH.sixRoles.length} vai`);
SUCCESS_PATH.threeOutcomes.length === 3
  ? ok('ba kết quả đầu ra') : fail('số kết quả sai');

/* --- Phễu lọc: chỗ tài liệu gốc mơ hồ, phải ghi nhận chứ không giấu --- */
FILTERS.length === 4
  ? ok('bốn phễu lọc, đúng như tiêu đề tài liệu gốc') : fail(`có ${FILTERS.length} phễu`);
FILTER_NOTE.ambiguity && FILTER_NOTE.alsoUnclear
  ? ok('hai chỗ mơ hồ trong tài liệu gốc được ghi nhận công khai, không đoán bừa')
  : fail('thiếu ghi chú về chỗ mơ hồ');
FILTERS.every(f => f.distorts && f.coachMove)
  ? ok('mỗi phễu nêu rõ nó làm méo gì và cố vấn phải làm gì')
  : fail('có phễu thiếu nội dung');

/* --- Năm lối chiến lược từ BNI --- */
STRATEGIC_THREADS.length === 5
  ? ok('năm lối chiến lược chuyển từ BNI') : fail(`có ${STRATEGIC_THREADS.length} lối`);
STRATEGIC_THREADS.every(t => t.bni && t.gita && t.fails)
  ? ok('mỗi lối ghi rõ gốc BNI, bản học viện, và cách nó hỏng')
  : fail('có lối thiếu trường');

/* --- Bộ 300 bài --- */
const L = lessons300();
L.length === 300
  ? ok(`đúng 300 bài (12 bước × ${THEMES.length} chủ đề × 5 nấc)`)
  : fail(`có ${L.length} bài`);
L.every((l, i) => l.no === i + 1) ? ok('300 bài đánh số liên tục') : fail('đánh số sai');
new Set(L.map(l => l.title)).size === 300
  ? ok('300 tiêu đề đều khác nhau') : fail('có tiêu đề trùng');

const sai = L.filter(l => l.blocks.reduce((s, b) => s + b.minutes, 0) !== 20);
sai.length === 0
  ? ok('mọi bài đúng 20 phút') : fail(`${sai.length} bài không đủ 20 phút`);

L.every(l => l.deliverable && l.measure && l.why && l.filter)
  ? ok('mọi bài có việc phải làm, thước đo, lý do và phễu lọc')
  : fail('có bài thiếu trường');

// Mỗi bước phải có đủ 25 bài, mỗi chủ đề đủ 60, mỗi nấc đủ 60.
for (let s = 1; s <= 12; s++) {
  const n = L.filter(l => l.step === s).length;
  if (n !== 25) fail(`bước ${s} có ${n} bài, không phải 25`);
}
for (const t of THEMES) {
  const n = L.filter(l => l.theme === t.name).length;
  if (n !== 60) fail(`chủ đề ${t.name} có ${n} bài, không phải 60`);
}
for (let r = 1; r <= 5; r++) {
  const n = L.filter(l => l.rung === r).length;
  if (n !== 60) fail(`nấc ${r} có ${n} bài, không phải 60`);
}
ok('phân bố đều: 25 bài mỗi bước, 60 bài mỗi chủ đề, 60 bài mỗi nấc');

// Mọi bài phải trỏ tới một phễu lọc có thật.
const tenPhe = new Set(FILTERS.map(f => f.name));
L.every(l => tenPhe.has(l.filter))
  ? ok('mọi bài trỏ tới một phễu lọc có thật')
  : fail(`bài trỏ tới phễu không tồn tại: ${[...new Set(L.map(l => l.filter))].filter(x => !tenPhe.has(x))}`);

// Mọi bài phải thuộc một pha có thật.
L.every(l => (PHA as string[]).includes(l.phase))
  ? ok('mọi bài thuộc một trong bốn pha') : fail('có bài thuộc pha lạ');

GITA_CREED.fourPhases.length === 4 ? ok('bốn pha có mô tả đầy đủ') : fail('thiếu mô tả pha');

console.log(`\n  ${bad === 0 ? 'ĐẠT — mô thức GITA và 300 bài không lỗi' : `HỎNG — ${bad} lỗi`}\n`);
process.exit(bad ? 1 : 0);
