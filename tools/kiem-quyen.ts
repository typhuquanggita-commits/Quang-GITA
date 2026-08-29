/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kiểm hệ phân quyền. Chạy: npx tsx tools/kiem-quyen.ts
 */
import {
  QUYEN, QUYEN_BY_ID, BAC_QUYEN, BAC_BY_ID, quyenCua, co, aiCoQuyen,
  LUAT_QUYEN, VIEC_HAI_NGUOI, VIEC_GHI_NHAT_KY, QUYEN_SO, QUYEN_CREED,
} from '../data/phanquyen';
import {COACH_LADDER} from '../data/training';
import {LEVELS} from '../data/levels';

let bad = 0;
const fail = (m: string) => { bad++; console.log('  ✗ ' + m); };
const ok = (m: string) => console.log('  ✓ ' + m);

console.log('\n  KIỂM HỆ PHÂN QUYỀN\n');

/* --- Toàn vẹn --- */
new Set(QUYEN.map((q) => q.id)).size === QUYEN.length ? ok(`${QUYEN.length} quyền, không mã nào trùng`) : fail('mã quyền trùng');
new Set(BAC_QUYEN.map((b) => b.id)).size === BAC_QUYEN.length ? ok(`${BAC_QUYEN.length} bậc, không mã nào trùng`) : fail('mã bậc trùng');
const maLa = BAC_QUYEN.flatMap((b) => b.themQuyen).filter((q) => !QUYEN_BY_ID[q]);
maLa.length === 0 ? ok('mọi quyền được gán đều có thật') : fail(`gán quyền không tồn tại: ${[...new Set(maLa)].join(', ')}`);
const keLa = BAC_QUYEN.filter((b) => b.keThua && !BAC_BY_ID[b.keThua]);
keLa.length === 0 ? ok('mọi liên kết thừa kế trỏ tới bậc có thật') : fail(`thừa kế hỏng: ${keLa.map((b) => b.id).join(', ')}`);

/* --- Quyền không dùng tới là quyền thừa --- */
const khongAiCo = QUYEN.filter((q) => aiCoQuyen(q.id).length === 0).map((q) => q.id);
khongAiCo.length === 0 ? ok('không quyền nào bị bỏ rơi — mọi quyền đều thuộc về ít nhất một bậc') : fail(`không bậc nào có: ${khongAiCo.join(', ')}`);

/* --- Thừa kế phải đơn điệu: bậc trên không được thiếu quyền của bậc dưới --- */
let lechThuaKe = 0;
for (const b of BAC_QUYEN) {
  if (!b.keThua) continue;
  const tren = new Set(quyenCua(b.id));
  for (const q of quyenCua(b.keThua)) if (!tren.has(q)) { lechThuaKe++; fail(`${b.id} thiếu quyền ${q} mà bậc dưới ${b.keThua} có`); }
}
lechThuaKe === 0 ? ok('trong mỗi thang, bậc trên luôn có đủ mọi quyền của bậc dưới') : null;

/* --- Số quyền phải tăng thật, không đứng yên --- */
for (const thang of ['học viên', 'giảng dạy'] as const) {
  const ds = BAC_QUYEN.filter((b) => b.thang === thang).sort((a, b) => a.no - b.no);
  const so = ds.map((b) => quyenCua(b.id).length);
  so.every((v, i) => i === 0 || v > so[i - 1])
    ? ok(`thang ${thang}: số quyền tăng thật qua từng nấc — ${so.join(' → ')}`)
    : fail(`thang ${thang} có nấc không mở thêm quyền nào: ${so.join(' → ')}`);
}

/* --- Hai thang phải khớp đúng dữ liệu gốc, không tự bịa số nấc --- */
BAC_QUYEN.filter((b) => b.thang === 'giảng dạy').length === COACH_LADDER.length
  ? ok(`thang nghề đúng ${COACH_LADDER.length} nấc, lấy thẳng từ thang coach có sẵn`)
  : fail('số nấc nghề không khớp thang coach');
BAC_QUYEN.filter((b) => b.thang === 'học viên').length === new Set(LEVELS.map((l) => l.tierId)).size
  ? ok(`thang học viên đúng ${new Set(LEVELS.map((l) => l.tierId)).size} bậc, khớp số tầng của thang 25 cấp độ`)
  : fail('số bậc học viên không khớp số tầng');

/* --- Tách bạch trách nhiệm: đây là phần dễ làm sai nhất --- */
const kiem: [string, string, boolean, string][] = [
  ['qt-2', 'q-cham-chinh-thuc', false, 'quản trị hệ thống KHÔNG được chấm bài lấy điểm'],
  ['qt-2', 'q-nang-cap-do', false, 'quản trị hệ thống KHÔNG được nâng cấp độ học viên'],
  ['qt-2', 'q-cap-chung-nhan', false, 'quản trị hệ thống KHÔNG được cấp chứng nhận'],
  ['qt-2', 'q-gan-quyen', true, 'quản trị hệ thống mới được gán quyền'],
  ['gv-5', 'q-gan-quyen', false, 'chủ nhiệm chuyên môn KHÔNG được gán quyền hệ thống'],
  ['gv-5', 'q-kiem-dinh-nguoi-day', true, 'chủ nhiệm chuyên môn mới được kiểm định người dạy'],
  ['gv-1', 'q-cham-chinh-thuc', false, 'trợ giảng chưa được chấm bài lấy điểm'],
  ['gv-3', 'q-nang-cap-do', true, 'từ nấc COACH mới được nâng cấp độ học viên'],
  ['hv-5', 'q-nang-cap-do', false, 'học viên giỏi nhất vẫn KHÔNG được nâng cấp độ cho ai'],
  ['hv-5', 'q-xem-ho-so-lop', false, 'học viên KHÔNG xem được hồ sơ người khác'],
  ['hv-1', 'q-cham-ban', false, 'học viên tầng 1 chưa được chấm chéo'],
  ['hv-3', 'q-cham-ban', true, 'từ tầng 3 mới được chấm chéo'],
  ['ph-1', 'q-cham-chinh-thuc', false, 'phụ huynh KHÔNG chấm bài'],
  ['ph-1', 'q-xem-ho-so-con', true, 'phụ huynh xem được hồ sơ con mình'],
  ['ph-1', 'q-xem-ho-so-lop', false, 'phụ huynh KHÔNG xem được hồ sơ học viên khác'],
  ['kd-1', 'q-nang-cap-do', false, 'tư vấn KHÔNG quyết định chuyên môn'],
  ['qt-1', 'q-sua-noi-dung-chuan', false, 'quản trị học vụ KHÔNG sửa nội dung chuẩn'],
];
let lechVai = 0;
for (const [b, q, mong, noi] of kiem) {
  if (co(b, q) === mong) ok(noi);
  else { lechVai++; fail(`${noi} — nhưng ma trận cho kết quả ngược`); }
}

/* --- Quyền nguy hiểm phải hiếm --- */
aiCoQuyen('q-gan-quyen').length === 1 ? ok('đúng một bậc được gán quyền — quyền lớn nhất phải hẹp nhất') : fail(`${aiCoQuyen('q-gan-quyen').length} bậc gán được quyền`);
aiCoQuyen('q-xoa-ho-so').length === 1 ? ok('đúng một bậc xoá được hồ sơ') : fail('quá nhiều bậc xoá được hồ sơ');
aiCoQuyen('q-sua-noi-dung-chuan').length === 1 ? ok('đúng một bậc sửa được nội dung chuẩn') : fail('quá nhiều bậc sửa được nội dung chuẩn');

/* --- Việc không đảo ngược phải cần hai người và phải ghi nhật ký --- */
const phaiHaiNguoi = ['q-xoa-ho-so', 'q-cap-chung-nhan', 'q-thu-hoi-chung-nhan', 'q-sua-diem-da-chot', 'q-sua-noi-dung-chuan', 'q-xuat-du-lieu', 'q-doi-cau-hinh-he-thong', 'q-gan-quyen'];
const thieuHai = phaiHaiNguoi.filter((q) => !VIEC_HAI_NGUOI.includes(q));
thieuHai.length === 0 ? ok(`${VIEC_HAI_NGUOI.length} việc không đảo ngược đều cần hai người ký`) : fail(`thiếu yêu cầu hai người: ${thieuHai.join(', ')}`);
QUYEN.filter((q) => q.haiNguoi && !q.ghiNhatKy).length === 0
  ? ok('mọi việc cần hai người đều đồng thời phải ghi nhật ký')
  : fail('có việc cần hai người mà không ghi nhật ký');
VIEC_GHI_NHAT_KY.length >= VIEC_HAI_NGUOI.length
  ? ok(`${VIEC_GHI_NHAT_KY.length} việc phải ghi nhật ký`)
  : fail('số việc ghi nhật ký ít hơn số việc cần hai người');

/* --- Không chỗ nào rỗng ruột, và phải nói thật về giới hạn --- */
QUYEN.every((q) => q.lam.length > 25 && q.viSaoChan.length > 30)
  ? ok('mọi quyền nêu rõ làm được gì và vì sao bị chặn')
  : fail('có quyền thiếu mô tả hoặc thiếu lý do chặn');
BAC_QUYEN.every((b) => b.ai.length > 20 && b.vao.length > 20 && b.chuaDuoc.length > 40)
  ? ok('mọi bậc nêu rõ ai thuộc bậc đó, vào bằng cách nào, và CHƯA được làm gì')
  : fail('có bậc thiếu điều kiện vào hoặc thiếu phần chưa được làm');
LUAT_QUYEN.every((l, i) => l.no === i + 1 && l.noiDung.length > 80)
  ? ok(`${LUAT_QUYEN.length} luật vận hành, đánh số liên tục và viết đủ`)
  : fail('luật vận hành thiếu hoặc đánh số sai');
QUYEN_CREED.thatThe.includes('KHÔNG phải bảo mật')
  ? ok('nói thẳng: phân quyền ở giao diện KHÔNG phải bảo mật, hiệu lực thật cần máy chủ')
  : fail('thiếu lời cảnh báo về giới hạn của phân quyền phía trình duyệt');

/* --- Số công bố phải khớp số đếm được --- */
QUYEN_SO.soQuyen === QUYEN.length && QUYEN_SO.soBac === BAC_QUYEN.length &&
QUYEN_SO.soHaiNguoi === VIEC_HAI_NGUOI.length && QUYEN_SO.soGhiNhatKy === VIEC_GHI_NHAT_KY.length
  ? ok('mọi con số công bố khớp với số đếm được từ dữ liệu')
  : fail('số công bố lệch số thật');

console.log(
  `\n  Quyền ${QUYEN_SO.soQuyen} · Bậc ${QUYEN_SO.soBac} · Thang ${QUYEN_SO.soThang} · ` +
    `Hai người ${QUYEN_SO.soHaiNguoi} · Ghi nhật ký ${QUYEN_SO.soGhiNhatKy} · Luật ${QUYEN_SO.soLuat}`,
);
console.log(bad === 0 ? '  ĐẠT — hệ phân quyền không lỗi\n' : `  HỎNG — ${bad} lỗi\n`);
process.exit(bad === 0 ? 0 : 1);
