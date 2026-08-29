/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kiểm lộ trình chuyên Anh. Chạy: npx tsx tools/kiem-chuyen.ts
 */
import {
  EXAM_SPEC, EXAM_PARTS, BANDS, CHUYEN_PHASES, CHUYEN_LEVELS,
  UPGRADE_PLANS, FINISH_LINE, ENTRY_TEST, tinhNguoc, diemXetTuyen,
} from '../data/chuyenanh';

let bad = 0;
const fail = (m: string) => { bad++; console.log('  ✗ ' + m); };
const ok = (m: string) => console.log('  ✓ ' + m);

console.log('\n  KIỂM LỘ TRÌNH CHUYÊN ANH\n');

/* --- Cấu trúc đề phải tự khớp --- */
const soCau = EXAM_PARTS.reduce((s, p) => s + p.items, 0);
soCau === 86 ? ok(`đề chuyên cộng đúng ${soCau} câu`) : fail(`cộng ${soCau} câu`);

const soPhut = EXAM_PARTS.reduce((s, p) => s + p.minutes, 0);
soPhut <= EXAM_SPEC.chuyen.minutes
  ? ok(`các phần cộng ${soPhut} phút, vừa trong ${EXAM_SPEC.chuyen.minutes} phút`)
  : fail(`các phần cộng ${soPhut} phút, vượt ${EXAM_SPEC.chuyen.minutes}`);

const tongTrong = EXAM_PARTS.reduce((s, p) => s + p.weight, 0);
Math.abs(tongTrong - 10) < 0.01
  ? ok(`trọng số các phần cộng đúng ${tongTrong.toFixed(1)} điểm`)
  : fail(`trọng số cộng ${tongTrong.toFixed(2)}, không phải 10`);

EXAM_PARTS.every((p, i) => p.no === i + 1) ? ok('các phần đánh số liên tục') : fail('đánh số sai');
EXAM_PARTS.every(p => p.commonLoss && p.whatItTests)
  ? ok('mỗi phần nêu rõ đo gì và mất điểm ở đâu') : fail('có phần thiếu nội dung');

EXAM_SPEC.common.items * EXAM_SPEC.common.perItem === EXAM_SPEC.common.maxScore
  ? ok(`đề chung: ${EXAM_SPEC.common.items} câu × ${EXAM_SPEC.common.perItem} = ${EXAM_SPEC.common.maxScore} điểm`)
  : fail('đề chung: số câu nhân điểm mỗi câu không ra điểm tối đa');

EXAM_SPEC.verifyFirst.includes('THAY ĐỔI')
  ? ok('có cảnh báo phải đối chiếu đề án tuyển sinh từng năm')
  : fail('thiếu cảnh báo về việc cấu trúc đề đổi theo năm');

/* --- Công thức điểm --- */
diemXetTuyen(10, 10, 10, 10) === EXAM_SPEC.formula.max
  ? ok(`công thức điểm cho tối đa đúng ${EXAM_SPEC.formula.max}`)
  : fail(`tối đa ra ${diemXetTuyen(10, 10, 10, 10)}, khai ${EXAM_SPEC.formula.max}`);
diemXetTuyen(8, 7, 9, 7) === 38
  ? ok('ví dụ tính điểm đúng: 8+7+9+7×2 = 38') : fail('công thức tính sai');

/* --- Tính ngược từ đích --- */
for (const muc of [5, 6, 7, 8, 9, 10]) {
  const r = tinhNguoc(muc);
  if (r.some(x => x.needCorrect > x.items)) fail(`mục tiêu ${muc}: số câu cần đúng vượt số câu có`);
  if (r.some(x => x.needCorrect < 0)) fail(`mục tiêu ${muc}: số câu cần đúng âm`);
  const tong = r.reduce((s, x) => s + x.pointsFromPart, 0);
  if (Math.abs(tong - muc) > 0.1) fail(`mục tiêu ${muc}: điểm các phần cộng ra ${tong.toFixed(2)}`);
}
ok('tính ngược đúng ở mọi mức mục tiêu từ 5 tới 10');

const bay = tinhNguoc(7);
bay.every((x, i) => x.part === EXAM_PARTS[i].name)
  ? ok('tính ngược trả về đủ và đúng thứ tự năm phần') : fail('tính ngược lệch phần');

/* --- Phân bậc --- */
BANDS.length >= 4 ? ok(`${BANDS.length} bậc năng lực`) : fail('quá ít bậc');
BANDS.every(b => b.honestNote && b.feasible)
  ? ok('mỗi bậc nói thẳng mức khả thi và rủi ro riêng') : fail('có bậc thiếu đánh giá thật');
BANDS.some(b => /không khuyến nghị/i.test(b.feasible))
  ? ok('có bậc được khuyên KHÔNG nhắm chuyên — hệ thống dám từ chối')
  : fail('không bậc nào dám nói không, đó là dấu hiệu bán hàng chứ không phải tư vấn');
BANDS.every((b, i, a) => i === 0 || b.dailyMinutes >= a[i - 1].dailyMinutes || b.id === 'b-d')
  ? ok('bậc yếu hơn cần nhiều thời gian hơn mỗi ngày') : fail('thời lượng theo bậc không hợp lý');

/* --- Hai mươi hai tháng --- */
CHUYEN_PHASES.length === 5 ? ok('năm giai đoạn') : fail(`có ${CHUYEN_PHASES.length} giai đoạn`);
CHUYEN_PHASES.every((p, i) => p.no === i + 1) ? ok('giai đoạn đánh số liên tục') : fail('đánh số sai');

// Các mốc tháng phải liền mạch và phủ đúng 22 tháng.
let moc = 1;
for (const p of CHUYEN_PHASES) {
  const m = /Tháng (\d+)–(\d+)/.exec(p.months);
  if (!m) { fail(`giai đoạn ${p.no} không đọc được mốc tháng`); break; }
  if (Number(m[1]) !== moc) fail(`giai đoạn ${p.no} bắt đầu tháng ${m[1]}, mong ${moc}`);
  moc = Number(m[2]) + 1;
}
moc - 1 === 22
  ? ok('năm giai đoạn phủ liền mạch đúng 22 tháng, không hở không chồng')
  : fail(`phủ tới tháng ${moc - 1}, không phải 22`);

for (const p of CHUYEN_PHASES) {
  const gio = p.weekly.reduce((s, w) => s + w.sessions * w.minutes, 0) / 60;
  if (gio < 4 || gio > 20) fail(`giai đoạn ${p.no}: ${gio.toFixed(1)} giờ mỗi tuần, ngoài khoảng hợp lý`);
  if (!p.exitGate || !p.mock) fail(`giai đoạn ${p.no} thiếu cổng ra hoặc lịch thi thử`);
}
ok('mọi giai đoạn: thời lượng tuần hợp lý, có cổng ra và lịch thi thử');

/* --- Cấp độ --- */
CHUYEN_LEVELS.length === 7 ? ok('bảy cấp phải vượt') : fail(`có ${CHUYEN_LEVELS.length} cấp`);
CHUYEN_LEVELS.every((l, i) => l.no === i + 1) ? ok('cấp đánh số liên tục') : fail('cấp đánh số sai');
CHUYEN_LEVELS.every(l => l.ifStuck && l.criteria.length >= 3)
  ? ok('mỗi cấp có tiêu chí và lối gỡ khi tắc') : fail('có cấp thiếu lối gỡ');

/* --- Giải pháp nâng cấp --- */
const tenPhan = new Set(EXAM_PARTS.map(p => p.name));
UPGRADE_PLANS.every(u => tenPhan.has(u.part))
  ? ok(`${UPGRADE_PLANS.length} phác đồ nâng cấp, mọi phác đồ trỏ tới một phần có thật`)
  : fail(`phác đồ trỏ tới phần lạ: ${UPGRADE_PLANS.filter(u => !tenPhan.has(u.part)).map(u => u.part)}`);
for (const p of EXAM_PARTS) {
  if (!UPGRADE_PLANS.some(u => u.part === p.name)) fail(`phần ${p.name} không có phác đồ nâng cấp nào`);
}
ok('mọi phần của đề đều có ít nhất một phác đồ nâng cấp');
UPGRADE_PLANS.every(u => u.rootCause && u.gain && u.weeks > 0)
  ? ok('mỗi phác đồ có nguyên nhân gốc, số tuần, và mức lên dự kiến') : fail('có phác đồ thiếu trường');

/* --- Test đầu vào và về đích --- */
ENTRY_TEST.shape.length >= 4 ? ok(`test đầu vào có ${ENTRY_TEST.shape.length} phần`) : fail('test đầu vào quá mỏng');
ENTRY_TEST.whyParentSeparate ? ok('phỏng vấn phụ huynh riêng, có nêu lý do') : fail('thiếu phần phụ huynh');
FINISH_LINE.checklist.length >= 4 ? ok(`danh mục về đích ${FINISH_LINE.checklist.length} mục`) : fail('danh mục quá ngắn');
FINISH_LINE.ifShort ? ok('có kịch bản khi còn cách đích') : fail('thiếu kịch bản dự phòng');

console.log(`\n  ${bad === 0 ? 'ĐẠT — lộ trình chuyên Anh không lỗi' : `HỎNG — ${bad} lỗi`}\n`);
process.exit(bad ? 1 : 0);
