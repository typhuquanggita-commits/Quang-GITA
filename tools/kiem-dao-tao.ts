/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kiểm tầng đào tạo: kèm cặp 1-1, thang coach, khoá nâng cao, lộ trình xuất sắc.
 * Chạy: npx tsx tools/kiem-dao-tao.ts
 */
import {
  MENTOR_SESSION, MENTOR_STAGES, MENTOR_RULES, MENTOR_CREED,
  COACH_LADDER, ADVANCED_COURSES,
  EXCELLENCE_SHIFTS, EXCELLENCE_GATES, EXCELLENCE_EXITS, EXCELLENCE_CREED,
} from '../data/training';
import {TRAINING_COURSES} from '../data/exams';
import {nhipHoc} from '../data/nhip';

let bad = 0;
const fail = (m: string) => { bad++; console.log('  ✗ ' + m); };
const ok = (m: string) => console.log('  ✓ ' + m);

console.log('\n  KIỂM TẦNG ĐÀO TẠO\n');

/* --- Buổi kèm 1-1 phải khớp với chính lời hứa của nó --- */
const phut = MENTOR_SESSION.reduce((s, b) => s + b.minutes, 0);
phut === 60 ? ok(`buổi kèm cộng đúng ${phut} phút`)
            : fail(`buổi kèm cộng ${phut} phút, không phải 60`);

const hv = MENTOR_SESSION.filter(b => b.who === 'học viên nói').reduce((s, b) => s + b.minutes, 0);
const cv = MENTOR_SESSION.filter(b => b.who === 'cố vấn nói').reduce((s, b) => s + b.minutes, 0);
hv > cv ? ok(`học viên nói ${hv}′ > cố vấn nói ${cv}′ — khớp lời hứa đã tuyên bố`)
        : fail(`học viên ${hv}′ không nhiều hơn cố vấn ${cv}′ — mâu thuẫn với chính lời hứa`);

/*
 * Lời hứa viết số bằng CHỮ ("ba mươi lăm phút") theo lối văn xuôi của cả hệ
 * thống, nên phải dò chữ chứ không dò chữ số. Bản đầu của phép kiểm này tìm
 * "35" và báo hỏng ngay cả khi hai con số bằng nhau.
 */
const SO_CHU: Record<number, string> = {
  30: 'ba mươi', 35: 'ba mươi lăm', 40: 'bốn mươi', 45: 'bốn mươi lăm',
};
SO_CHU[hv] && MENTOR_CREED.claim.includes(SO_CHU[hv])
  ? ok(`lời hứa ghi "${SO_CHU[hv]} phút", khớp với bảng khối thời gian`)
  : fail(`bảng cộng ra ${hv} phút nhưng lời hứa không nhắc con số đó`);

MENTOR_STAGES.every((s, i) => s.no === i + 1)
  ? ok(`${MENTOR_STAGES.length} chặng kèm đánh số liên tục`) : fail('chặng kèm đánh số sai');
MENTOR_RULES.length >= 6 ? ok(`${MENTOR_RULES.length} luật kèm cặp`) : fail('quá ít luật kèm cặp');

/* --- Thang coach ---
 * Giờ giám sát KHÔNG giảm đơn điệu, và điều đó đúng: bậc 1 chỉ ngồi xem nên
 * cần ít giám sát hơn bậc 2 là bậc bắt đầu tự dẫn buổi. Bất biến thật là:
 * giám sát tăng rồi giảm về 0, còn giờ tự đứng thì tăng đơn điệu.
 */
COACH_LADDER.every((r, i) => r.no === i + 1)
  ? ok(`${COACH_LADDER.length} bậc coach đánh số liên tục`) : fail('bậc coach đánh số sai');

const gs = COACH_LADDER.map(r => r.supervisedHours);
const dinh = gs.indexOf(Math.max(...gs));
const tangRoiGiam =
  gs.slice(0, dinh + 1).every((v, i, a) => i === 0 || v >= a[i - 1]) &&
  gs.slice(dinh).every((v, i, a) => i === 0 || v <= a[i - 1]);
tangRoiGiam && gs[gs.length - 1] === 0
  ? ok(`giờ giám sát tăng tới bậc ${dinh + 1} rồi giảm về 0 — đúng hình dạng của một nghề`)
  : fail(`giờ giám sát sai hình dạng: ${gs.join(' → ')}`);

COACH_LADDER.every((r, i, a) => i === 0 || r.soloHours >= a[i - 1].soloHours)
  ? ok('giờ tự đứng tăng dần theo bậc') : fail('giờ tự đứng không tăng đơn điệu');

for (const r of COACH_LADDER) {
  if (r.mustShow.length < 3) fail(`bậc ${r.name} chỉ có ${r.mustShow.length} yêu cầu`);
  if (!r.gate || !r.cannotYet) fail(`bậc ${r.name} thiếu cổng hoặc thiếu giới hạn`);
}
ok('mọi bậc coach đều có cổng và ghi rõ điều chưa được làm');

/* --- Khoá học: mọi con số phải tự khớp --- */
const moiKhoa = [...TRAINING_COURSES, ...ADVANCED_COURSES];
for (const c of moiKhoa) {
  const gio = c.modules.reduce((s, m) => s + m.minutes, 0) / 60;
  if (Math.abs(gio - c.totalHours) > 0.5)
    fail(`${c.name}: mô-đun cộng ${gio.toFixed(1)}h nhưng khai ${c.totalHours}h`);
  if (c.modules.some((m, i) => m.no !== i + 1))
    fail(`${c.name}: mô-đun đánh số không liên tục`);
  if (c.cadence !== nhipHoc(c.totalHours, c.weeks))
    fail(`${c.name}: nhịp học không khớp với giờ và tuần`);
  if (c.modules.some(m => !m.gate || !m.outcome))
    fail(`${c.name}: có mô-đun thiếu cổng hoặc kết quả`);
}
ok(`${moiKhoa.length} khoá học: giờ khớp mô-đun, nhịp suy ra đúng, mọi mô-đun có cổng`);

const vaoMon = new Set(TRAINING_COURSES.map(c => c.role));
[...new Set(ADVANCED_COURSES.map(c => c.role))].every(v => vaoMon.has(v))
  ? ok('mọi khoá nâng cao đều nối tiếp một khoá nhập môn có thật')
  : fail('có khoá nâng cao không có khoá nhập môn tương ứng');
ADVANCED_COURSES.every(c => c.entry && c.capstone)
  ? ok('mọi khoá nâng cao có điều kiện vào và bài tốt nghiệp') : fail('thiếu điều kiện vào hoặc bài tốt nghiệp');

/* --- Lộ trình xuất sắc phải giữ đúng lời nó tự nói --- */
EXCELLENCE_SHIFTS.every((s, i) => s.no === i + 1)
  ? ok(`${EXCELLENCE_SHIFTS.length} khác biệt đánh số liên tục`) : fail('khác biệt đánh số sai');
EXCELLENCE_SHIFTS.every(s => s.cost)
  ? ok('mọi khác biệt đều nêu rõ cái giá phải trả') : fail('có khác biệt không nêu cái giá');

// Tuyên bố: "không có khác biệt nào là học nhiều giờ hơn". Kiểm đúng điều đó.
const viPham = EXCELLENCE_SHIFTS.filter(s =>
  /nhiều giờ hơn|tăng thời lượng|học nhiều hơn|gấp đôi thời gian/i.test(s.excellence));
viPham.length === 0
  ? ok('không khác biệt nào là "học nhiều giờ hơn" — đúng như đã tuyên bố')
  : fail(`${viPham.length} khác biệt vi phạm chính tuyên bố của mình: ${viPham[0].dimension}`);

EXCELLENCE_GATES.length >= 4 ? ok(`${EXCELLENCE_GATES.length} điều kiện vào`) : fail('quá ít điều kiện vào');
EXCELLENCE_EXITS.length >= 3
  ? ok(`${EXCELLENCE_EXITS.length} lối ra — có đường lùi rõ ràng`) : fail('thiếu lối ra');
EXCELLENCE_CREED.honestCost ? ok('lộ trình xuất sắc nói rõ cái giá của nó') : fail('không nêu cái giá');

console.log(`\n  ${bad === 0 ? 'ĐẠT — tầng đào tạo không lỗi' : `HỎNG — ${bad} lỗi`}\n`);
process.exit(bad ? 1 : 0);
