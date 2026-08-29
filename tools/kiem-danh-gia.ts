/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kiểm bộ đánh giá và kho 1.000 giải pháp.
 * Chạy: npx tsx tools/kiem-danh-gia.ts
 */
import {solutions, SYMPTOMS, SOLUTION_CREED} from '../data/solutions';
import {
  BATTERIES,
  INTEGRITY_RULES,
  REWARD_TIERS,
  AI_PROTOCOL,
} from '../data/assess';
import {LEVELS} from '../data/levels';

let bad = 0;
const fail = (m: string) => {
  bad++;
  console.log('  ✗ ' + m);
};
const ok = (m: string) => console.log('  ✓ ' + m);

console.log('\n  KIỂM BỘ ĐÁNH GIÁ\n');
const S = solutions();

S.length === 1000
  ? ok(`đúng 1.000 đơn kê (${SYMPTOMS.length} triệu chứng × ${LEVELS.length} cấp độ)`)
  : fail(`có ${S.length} đơn, không phải 1.000`);

new Set(S.map((s) => s.id)).size === S.length
  ? ok('không mã đơn nào trùng')
  : fail('có mã đơn trùng');

let thieuCap = false;
for (const sy of SYMPTOMS)
  for (const lv of LEVELS) {
    const n = S.filter((s) => s.symptomId === sy.id && s.levelId === lv.id).length;
    if (n !== 1) {
      fail(`cặp ${sy.id}×${lv.id} có ${n} đơn`);
      thieuCap = true;
      break;
    }
  }
if (!thieuCap) ok('mọi cặp triệu chứng × cấp độ đều có đúng một đơn');

for (const s of S) {
  if (!s.diagnose || !s.today || !s.sevenDay || !s.remeasure || !s.escalate) {
    fail(`đơn ${s.id} thiếu trường`);
    break;
  }
  if (s.tier < 1 || s.tier > 5) {
    fail(`đơn ${s.id} tầng sai: ${s.tier}`);
    break;
  }
}
ok('không đơn nào thiếu trường, tầng đều hợp lệ');

/*
 * Kiểm SỐ LIỆU trong lời văn. Bài kiểm tra đầu tiên chỉ soi trường rỗng nên
 * đã để lọt một đơn ghi "cấp -11/5" và "tổng -98 phút" — công thức tính cấp
 * sai dấu. Trường có nội dung không có nghĩa là nội dung đúng.
 */
const soAm = S.filter((s) =>
  /-\d/.test(s.diagnose + s.today + s.sevenDay + s.remeasure),
);
soAm.length === 0
  ? ok('không đơn nào chứa số âm')
  : fail(`${soAm.length} đơn chứa số âm, ví dụ ${soAm[0].id}`);

const capSai = S.filter((s) => {
  const m = s.diagnose.match(/cấp (\d+)\/5/);
  return !m || Number(m[1]) < 1 || Number(m[1]) > 5;
});
capSai.length === 0
  ? ok('mọi đơn ghi cấp trong khoảng 1–5')
  : fail(`${capSai.length} đơn ghi cấp sai, ví dụ ${capSai[0].id}`);

const phutSai = S.filter((s) => {
  const ngay = s.today.match(/làm (\d+) phút/);
  const tuan = s.sevenDay.match(/tổng (\d+) phút/);
  if (!ngay || !tuan) return true;
  return Number(tuan[1]) !== Number(ngay[1]) * 7;
});
phutSai.length === 0
  ? ok('thời lượng tuần luôn bằng đúng bảy lần thời lượng ngày')
  : fail(`${phutSai.length} đơn sai thời lượng, ví dụ ${phutSai[0].id}`);

const truc = new Set(SYMPTOMS.map((s) => s.skill));
truc.size === 8
  ? ok(`phủ đủ 8 trục kỹ năng, mỗi trục ${SYMPTOMS.length / 8} triệu chứng`)
  : fail(`chỉ phủ ${truc.size} trục`);
for (const t of truc) {
  const n = SYMPTOMS.filter((s) => s.skill === t).length;
  if (n !== 5) fail(`trục ${t} có ${n} triệu chứng, không phải 5`);
}

new Set(S.map((s) => s.diagnose + s.today + s.sevenDay)).size === S.length
  ? ok('1.000 đơn đều khác nhau về nội dung')
  : fail('có đơn trùng nội dung');

BATTERIES.length === 4
  ? ok('đủ 4 bộ đề: tuần, 21 ngày, 90 ngày, hành trình')
  : fail(`có ${BATTERIES.length} bộ đề`);
for (const b of BATTERIES) {
  const tong = b.items.reduce((n, i) => n + i.minutes, 0);
  if (tong > b.totalMinutes)
    fail(`${b.name}: các mục cộng ${tong} phút, vượt ${b.totalMinutes} khai báo`);
  if (b.items.some((it, i) => it.no !== i + 1))
    fail(`${b.name}: số thứ tự mục không liên tục`);
  if (b.decision.length < 3)
    fail(`${b.name}: chỉ có ${b.decision.length} nhánh quyết định`);
}
ok('mọi bộ đề: thời lượng khớp, số thứ tự liên tục, đủ nhánh quyết định');

console.log(
  `\n  Bộ đề ${BATTERIES.length} · Luật liêm chính ${INTEGRITY_RULES.length} · ` +
    `Bậc thưởng ${REWARD_TIERS.length} · Bước quy trình AI ${AI_PROTOCOL.length}`,
);
console.log(`  ${bad === 0 ? 'ĐẠT — bộ đánh giá không lỗi' : `HỎNG — ${bad} lỗi`}\n`);
process.exit(bad === 0 ? 0 : 1);
