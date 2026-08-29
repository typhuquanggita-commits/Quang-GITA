/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kiểm tầng hai tuyến. Chạy: npx tsx tools/kiem-tuyen.ts
 *
 * Việc của tệp này là bắt ba loại lỗi:
 *   1. Bản đồ tab lệch với thanh điều hướng thật trong App.tsx.
 *   2. Con số viết trong văn xuôi lệch với con số tính được từ dữ liệu.
 *   3. Chỗ rỗng ruột — mục có tiêu đề mà không có nội dung.
 */
import {readFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  TUYEN, TUYEN_BY_ID, TAB_TUYEN, tabsCuaTuyen, LOI_CHUNG, PHAN_KY, NHAM_LAN,
  TINH_TUY, TUYEN_SO, TUYEN_CREED, CANH_BAO_QUY_DOI, tinhTuy, tongPhut,
  loiNgayChuyen, donBayChuyen, xuongSongIelts, thangCuoiChuyen, CO_DINH_PHUT,
} from '../data/tuyen';
import {BANDS, UPGRADE_PLANS, EXAM_PARTS, EXAM_SPEC} from '../data/chuyenanh';
import {MILESTONES} from '../data/roadmap';
import {DRILLS} from '../data/drills';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
let bad = 0;
const fail = (m: string) => { bad++; console.log('  ✗ ' + m); };
const ok = (m: string) => console.log('  ✓ ' + m);

console.log('\n  KIỂM TẦNG HAI TUYẾN\n');

/* ---- 1. Bản đồ tab phải khớp đúng thanh điều hướng thật ---- */

const app = readFileSync(path.join(ROOT, 'App.tsx'), 'utf8');

/* Chỉ đọc trong đúng mảng NAV. Quét cả tệp thì dính cả mảng bộ lọc tuyến,
   và công cụ sẽ báo lỗi ma. */
const moNav = app.indexOf('const NAV: Nav[] = [');
const dongNav = app.indexOf('\n];', moNav);
if (moNav < 0 || dongNav < 0) {
  fail('không tìm thấy mảng NAV trong App.tsx — biểu thức tìm kiếm đã lỗi thời');
}
const khoiNav = app.slice(moNav, dongNav);
const navIds = [...khoiNav.matchAll(/^\s{4}id: '([a-z0-9-]+)',$/gm)].map((m) => m[1]);
const mapIds = Object.keys(TAB_TUYEN);

navIds.length > 0
  ? ok(`đọc được ${navIds.length} mục từ thanh điều hướng`)
  : fail('không đọc được mục nào từ App.tsx — biểu thức tìm kiếm đã lỗi thời');

const thieu = navIds.filter((i) => !mapIds.includes(i));
thieu.length === 0
  ? ok('mọi mục trên thanh điều hướng đều có trong bản đồ tuyến')
  : fail(`bản đồ tuyến thiếu: ${thieu.join(', ')}`);

const thua = mapIds.filter((i) => !navIds.includes(i));
thua.length === 0
  ? ok('bản đồ tuyến không có khoá thừa')
  : fail(`bản đồ tuyến có khoá không còn tồn tại: ${thua.join(', ')}`);

/* Mục dành cho học viên phải phục vụ ít nhất một tuyến, nếu không thì học
   viên chọn tuyến nào cũng không thấy nó — tức là mục chết. */
const nhomHocVien = [...khoiNav.matchAll(/id: '([a-z0-9-]+)',[\s\S]{0,300}?group: '(learner|academy)'/g)]
  .map((m) => ({id: m[1], group: m[2]}));
const mucChet = nhomHocVien
  .filter((n) => n.group === 'learner' && (TAB_TUYEN[n.id] ?? []).length === 0)
  .map((n) => n.id);
mucChet.length === 0
  ? ok('không mục học viên nào bị bỏ ngoài cả hai tuyến')
  : fail(`mục học viên không thuộc tuyến nào (chọn tuyến nào cũng bị ẩn): ${mucChet.join(', ')}`);

const opsSaiCho = nhomHocVien
  .filter((n) => n.group === 'academy' && (TAB_TUYEN[n.id] ?? []).length > 0)
  .map((n) => n.id);
opsSaiCho.length === 0
  ? ok('mục vận hành học viện không bị gán vào tuyến học viên')
  : fail(`mục vận hành bị gán tuyến: ${opsSaiCho.join(', ')}`);

for (const t of TUYEN) {
  const n = tabsCuaTuyen(t.id).length;
  n >= 10
    ? ok(`tuyến ${t.id}: ${n} mục phục vụ`)
    : fail(`tuyến ${t.id} chỉ có ${n} mục — quá ít để đi hết lộ trình`);
}

/* ---- 2. Mọi mã bài luyện được nhắc tới phải có thật ---- */

const coDrill = new Set(DRILLS.map((d) => d.id));
const nhac: {o: string; id: string}[] = [];
for (const l of LOI_CHUNG) for (const d of l.drillIds) nhac.push({o: `LOI_CHUNG[${l.no}]`, id: d});
for (const tt of TINH_TUY)
  for (const k of tt.loiNgay) if (k.drillId) nhac.push({o: `TINH_TUY.${tt.tuyen}`, id: k.drillId});
const hong = nhac.filter((n) => !coDrill.has(n.id));
hong.length === 0
  ? ok(`${nhac.length} tham chiếu bài luyện đều có thật`)
  : fail(`bài luyện không tồn tại: ${hong.map((h) => `${h.id} (${h.o})`).join(', ')}`);

/* ---- 3. Số trong văn xuôi phải khớp số tính được ---- */

TUYEN_SO.soThangIelts === MILESTONES.length * 3
  ? ok(`tuyến IELTS ${TUYEN_SO.soThangIelts} tháng = ${MILESTONES.length} mùa × 3`)
  : fail('số tháng tuyến IELTS không khớp số cột mốc');

TUYEN_SO.soThangChuyen === thangCuoiChuyen()
  ? ok(`tuyến chuyên ${TUYEN_SO.soThangChuyen} tháng, đọc từ giai đoạn cuối`)
  : fail('số tháng tuyến chuyên không khớp giai đoạn cuối');

TUYEN_BY_ID.ielts.soThang === TUYEN_SO.soThangIelts &&
TUYEN_BY_ID.chuyen.soThang === TUYEN_SO.soThangChuyen
  ? ok('thẻ hai tuyến ghi đúng số tháng')
  : fail('thẻ tuyến ghi số tháng khác với số tính được');

TUYEN_SO.soCauDeChuyen === EXAM_PARTS.reduce((s, p) => s + p.items, 0)
  ? ok(`đề chuyên ${TUYEN_SO.soCauDeChuyen} câu, cộng từ ${EXAM_PARTS.length} phần`)
  : fail('số câu đề chuyên không khớp');

/* Những con số nêu thẳng trong bảng phân kỳ và phần lẫn tuyến. */
const nguPhap = EXAM_PARTS.find((p) => p.name.includes('NGỮ PHÁP'))!;
const viet = EXAM_PARTS.find((p) => p.name === 'VIẾT')!;
const nguAm = EXAM_PARTS.find((p) => p.name === 'NGỮ ÂM')!;
const bangPhanKy = PHAN_KY.map((p) => `${p.ielts} ${p.chuyen} ${p.heQua}`).join(' ');
const loiVanXuoi = [PHAN_KY, NHAM_LAN, TINH_TUY].map((x) => JSON.stringify(x)).join(' ');

const soPhaiCo: [string, boolean, string][] = [
  [`khối ngữ pháp ${nguPhap.items} câu`, bangPhanKy.includes(`${nguPhap.items} câu`), 'bảng phân kỳ'],
  [`trọng số ngữ pháp ${nguPhap.weight}`, bangPhanKy.includes(String(nguPhap.weight).replace('.', ',')), 'bảng phân kỳ'],
  [`phần viết ${viet.items} câu biến đổi`, loiVanXuoi.includes(`${viet.items} câu biến đổi câu`), 'phần lẫn tuyến'],
  [`phần viết ${viet.minutes} phút`, loiVanXuoi.includes(`${viet.minutes} phút`), 'phần lẫn tuyến'],
  [`ngữ âm ${nguAm.items} câu`, loiVanXuoi.includes(`${nguAm.items} câu`), 'văn xuôi'],
];
for (const [ten, dung, o] of soPhaiCo)
  dung ? ok(`${ten} — khớp dữ liệu đề (${o})`) : fail(`${ten} không thấy trong ${o}, có thể đã lệch`);

/* Tiếng Anh chiếm 30 trên 50 điểm xét tuyển: ngoại ngữ 10 + chuyên 10×2. */
const diemAnh = EXAM_SPEC.chuyen.maxScore * 2 + EXAM_SPEC.common.maxScore;
diemAnh === 30 && EXAM_SPEC.formula.max === 50 && bangPhanKy.includes('30 trên 50')
  ? ok('tiếng Anh chiếm 30 trên 50 điểm xét tuyển — khớp công thức')
  : fail(`tính ra ${diemAnh}/${EXAM_SPEC.formula.max}, văn xuôi ghi khác`);

/* ---- 4. Lõi ngày tuyến chuyên phải cộng đúng nhịp của từng bậc ---- */

for (const b of BANDS) {
  const t = tongPhut(loiNgayChuyen(b.id));
  t === b.dailyMinutes
    ? ok(`${b.name}: lõi ngày cộng đúng ${t} phút`)
    : fail(`${b.name}: lõi cộng ${t} phút, bậc khai ${b.dailyMinutes}`);
  const theoPha = loiNgayChuyen(b.id)[2].phut;
  theoPha > 0
    ? ok(`${b.name}: khối theo giai đoạn còn ${theoPha} phút`)
    : fail(`${b.name}: khối theo giai đoạn còn ${theoPha} phút — phần cố định ${CO_DINH_PHUT} phút đã ăn hết nhịp`);
}

const loiIelts = tongPhut(tinhTuy('ielts').loiNgay);
const sanIelts = Math.min(...MILESTONES.map((m) => m.dailyMinutes[0]));
loiIelts <= Math.max(...MILESTONES.map((m) => m.dailyMinutes[1]))
  ? ok(`lõi ngày tuyến IELTS ${loiIelts} phút, nằm trong dải nhịp của lộ trình`)
  : fail(`lõi ngày IELTS ${loiIelts} phút vượt nhịp cao nhất của lộ trình`);
loiIelts >= sanIelts
  ? ok(`lõi ngày IELTS ${loiIelts} phút, không thấp hơn sàn ${sanIelts} phút của quý đầu`)
  : fail(`lõi ${loiIelts} phút thấp hơn sàn ${sanIelts} phút — lõi phải là mức tối thiểu thật`);

/* ---- 5. Đòn bẩy tuyến chuyên phải lấy đủ và sắp đúng ---- */

const db = donBayChuyen();
db.length === UPGRADE_PLANS.length
  ? ok(`lấy đủ ${db.length} phác đồ nâng cấp làm đòn bẩy`)
  : fail(`lấy ${db.length} trên ${UPGRADE_PLANS.length} phác đồ`);
db.every((d, i) => i === 0 || db[i - 1].tuan <= d.tuan)
  ? ok('đòn bẩy sắp đúng theo số tuần tăng dần')
  : fail('đòn bẩy không sắp theo số tuần');
tinhTuy('chuyen').donBay.length === UPGRADE_PLANS.length
  ? ok('bản tinh tuý tuyến chuyên mang đủ đòn bẩy')
  : fail('bản tinh tuý tuyến chuyên thiếu đòn bẩy');

const xs = xuongSongIelts();
xs.length > 0 && xs[0].soMua === Math.max(...xs.map((x) => x.soMua))
  ? ok(`xương sống tuyến IELTS: ${xs[0].drillId} có mặt ở ${xs[0].soMua} trên ${MILESTONES.length} mùa`)
  : fail('xương sống tuyến IELTS không sắp đúng');
xs.every((x) => coDrill.has(x.drillId))
  ? ok('mọi bài luyện trong xương sống đều có thật')
  : fail('xương sống chứa mã bài luyện không tồn tại');

/* ---- 6. Không chỗ nào rỗng ruột ---- */

TUYEN.length === 2 ? ok('đúng hai tuyến') : fail(`có ${TUYEN.length} tuyến`);
TUYEN.every((t) => t.kieuDo === 'tuyệt đối' || t.kieuDo === 'tương đối')
  ? ok('mỗi tuyến ghi rõ đo tuyệt đối hay tương đối')
  : fail('có tuyến không ghi cách đo');
new Set(TUYEN.map((t) => t.kieuDo)).size === 2
  ? ok('hai tuyến đo khác kiểu nhau — đây là khác biệt sâu nhất')
  : fail('hai tuyến ghi cùng một kiểu đo');

new Set(PHAN_KY.map((p) => p.truc)).size === PHAN_KY.length
  ? ok(`${PHAN_KY.length} trục phân kỳ, không trục nào trùng`)
  : fail('có trục phân kỳ trùng tên');
PHAN_KY.every((p) => p.ielts.length > 20 && p.chuyen.length > 20 && p.heQua.length > 30)
  ? ok('mọi trục phân kỳ đều nói đủ cả hai bên và nêu hệ quả')
  : fail('có trục phân kỳ bỏ trống một bên');

NHAM_LAN.every((n) => TUYEN_BY_ID[n.ai])
  ? ok(`${NHAM_LAN.length} kiểu lẫn tuyến đều gắn đúng tuyến`)
  : fail('có kiểu lẫn tuyến gắn tuyến không tồn tại');
NHAM_LAN.every((n) => n.gia.length > 40 && n.dung.length > 30)
  ? ok('mỗi kiểu lẫn tuyến đều nêu cái giá và cách làm đúng')
  : fail('có kiểu lẫn tuyến thiếu cái giá hoặc cách làm đúng');
new Set(NHAM_LAN.map((n) => n.ai)).size === 2
  ? ok('cảnh báo lẫn tuyến phủ cả hai chiều, không thiên vị tuyến nào')
  : fail('cảnh báo lẫn tuyến chỉ nhắm một tuyến');

for (const tt of TINH_TUY) {
  const t = tt.tuyen;
  tt.motTrang.length > 150 ? ok(`${t}: bản một trang đủ dài để dùng được`) : fail(`${t}: bản một trang quá ngắn`);
  tt.loiNgay.length >= 3 ? ok(`${t}: lõi ngày có ${tt.loiNgay.length} khối`) : fail(`${t}: lõi ngày dưới 3 khối`);
  tt.loiNgay.every((k) => k.phut > 0 && k.lam.length > 30)
    ? ok(`${t}: mọi khối trong lõi có số phút và việc cụ thể`)
    : fail(`${t}: có khối thiếu số phút hoặc thiếu việc`);
  tt.donBay.length >= 5 ? ok(`${t}: ${tt.donBay.length} đòn bẩy`) : fail(`${t}: dưới 5 đòn bẩy`);
  tt.donBay.every((d) => d.tuan > 0 && d.duoc.length > 15 && d.bo.length > 15)
    ? ok(`${t}: mọi đòn bẩy nêu rõ được gì và bỏ thì mất gì`)
    : fail(`${t}: có đòn bẩy thiếu phần được hoặc phần mất`);
  tt.catBo.length >= 4 ? ok(`${t}: ${tt.catBo.length} việc phải cắt`) : fail(`${t}: dưới 4 việc phải cắt`);
  tt.chanDuong.length >= 4 ? ok(`${t}: ${tt.chanDuong.length} chặn đường`) : fail(`${t}: dưới 4 chặn đường`);
  tt.chanDuong.every((c) => c.khi && c.hoi.includes('?') && c.neuKhong.length > 30)
    ? ok(`${t}: mọi chặn đường có mốc, có câu hỏi thật và có đường xử lý`)
    : fail(`${t}: có chặn đường thiếu câu hỏi hoặc thiếu đường xử lý`);
}

LOI_CHUNG.every((l, i) => l.no === i + 1)
  ? ok(`${LOI_CHUNG.length} phần lõi dùng chung đánh số liên tục`)
  : fail('phần lõi dùng chung đánh số không liên tục');
LOI_CHUNG.every((l) => l.vi.length > 80 && l.drillIds.length > 0)
  ? ok('mỗi phần lõi nêu rõ vì sao hai tuyến làm giống nhau, và bằng bài luyện nào')
  : fail('có phần lõi thiếu lý do hoặc thiếu bài luyện');

CANH_BAO_QUY_DOI.body.includes('THAY ĐỔI') && CANH_BAO_QUY_DOI.them.includes('quy đổi')
  ? ok('có cảnh báo phải đọc lại đề án tuyển sinh và chính sách quy đổi từng năm')
  : fail('thiếu cảnh báo về chính sách thay đổi theo năm');
TUYEN_CREED.reversible.includes('không mất')
  ? ok('nói rõ đổi tuyến giữa chừng không mất phần đã học')
  : fail('không nói rõ hệ quả của việc đổi tuyến');

console.log(
  `\n  Tuyến ${TUYEN.length} · Lõi chung ${LOI_CHUNG.length} · ` +
    `Phân kỳ ${PHAN_KY.length} · Lẫn tuyến ${NHAM_LAN.length} · ` +
    `Đòn bẩy ${TINH_TUY.map((t) => t.donBay.length).join('+')}`,
);
console.log(bad === 0 ? '  ĐẠT — tầng hai tuyến không lỗi\n' : `  HỎNG — ${bad} lỗi\n`);
process.exit(bad === 0 ? 0 : 1);
