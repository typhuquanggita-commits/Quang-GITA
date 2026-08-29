/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kiểm bộ 2.000 phiếu luyện và 2.000 nhiệm vụ. Chạy: npx tsx tools/kiem-phieu.ts
 */
import {
  DANG_BAI, KHUNG, phieuLuyen, nhiemVuChiaSe, chamPhieu, xetNangCap,
  PHIEU_SO, LUONG_LAM, NGUONG_DAT, NGUONG_LAM_LAI, PHIEU_TOI_THIEU, SO_CAU_MOI_PHIEU,
} from '../data/phieu';
import {LEVELS} from '../data/levels';
import {DRILLS} from '../data/drills';

let bad = 0;
const fail = (m: string) => { bad++; console.log('  ✗ ' + m); };
const ok = (m: string) => console.log('  ✓ ' + m);

console.log('\n  KIỂM BỘ PHIẾU LUYỆN\n');

const P = phieuLuyen();
const N = nhiemVuChiaSe();

/* --- Số lượng phải đúng bằng phép nhân đã tuyên bố --- */
P.length === DANG_BAI.length * LEVELS.length
  ? ok(`${P.length} phiếu = ${DANG_BAI.length} dạng bài × ${LEVELS.length} cấp độ`)
  : fail(`có ${P.length} phiếu, phép nhân ra ${DANG_BAI.length * LEVELS.length}`);
N.length === P.length ? ok(`${N.length} nhiệm vụ, mỗi phiếu đúng một`) : fail('số nhiệm vụ khác số phiếu');
P.length === 2000 ? ok('đúng 2.000 phiếu như đã hứa') : fail(`hứa 2.000, có ${P.length}`);

/* --- Không trùng mã, không hụt liên kết --- */
new Set(P.map((p) => p.id)).size === P.length ? ok('không mã phiếu nào trùng') : fail('có mã phiếu trùng');
new Set(N.map((n) => n.id)).size === N.length ? ok('không mã nhiệm vụ nào trùng') : fail('có mã nhiệm vụ trùng');
const mapN = new Map(N.map((n) => [n.id, n]));
P.every((p) => mapN.get(p.nhiemVuId)?.phieuId === p.id)
  ? ok('mọi phiếu nối đúng nhiệm vụ của nó, và ngược lại')
  : fail('có phiếu nối sang nhiệm vụ sai');

/* --- Phủ đủ tổ hợp --- */
const oDay = new Set(P.map((p) => `${p.dangId}|${p.levelId}`));
oDay.size === DANG_BAI.length * LEVELS.length
  ? ok('mọi cặp dạng bài × cấp độ đều có đúng một phiếu')
  : fail(`chỉ phủ ${oDay.size} cặp`);
const theoKy: Record<string, number> = {};
for (const p of P) theoKy[p.skill] = (theoKy[p.skill] ?? 0) + 1;
Object.keys(theoKy).length === 8 && Object.values(theoKy).every((v) => v === 250)
  ? ok('tám kỹ năng, mỗi kỹ năng đúng 250 phiếu')
  : fail(`phân bố kỹ năng lệch: ${JSON.stringify(theoKy)}`);

/* --- Cấu trúc năm phần --- */
const maChuan = KHUNG.map((k) => k.ma).join(',');
P.every((p) => p.phan.map((x) => x.ma).join(',') === maChuan)
  ? ok('mọi phiếu đủ năm phần, đúng thứ tự KHỞI · MẪU · DẪN · TỰ · CHUỖI')
  : fail('có phiếu sai thứ tự phần');
P.every((p) => p.phan.reduce((s, x) => s + x.soCau, 0) === SO_CAU_MOI_PHIEU && p.tongCau === SO_CAU_MOI_PHIEU)
  ? ok(`mỗi phiếu đúng ${SO_CAU_MOI_PHIEU} câu, tổng ${PHIEU_SO.tongCau.toLocaleString('vi-VN')} câu`)
  : fail('có phiếu cộng sai số câu');
KHUNG.reduce((s, k) => s + k.trong, 0) === 100
  ? ok('trọng số năm phần cộng đúng 100')
  : fail(`trọng số cộng ${KHUNG.reduce((s, k) => s + k.trong, 0)}`);
P.every((p) => p.tongPhut === p.phan.reduce((s, x) => s + x.phut, 0))
  ? ok('thời lượng phiếu bằng đúng tổng thời lượng các phần')
  : fail('có phiếu cộng sai thời lượng');

/* --- Thời lượng phải tăng theo tầng, vì học liệu nặng dần --- */
const phutTheoTang = [1, 2, 3, 4, 5].map(
  (t) => P.filter((p) => p.tier === t).reduce((s, p) => s + p.tongPhut, 0) / P.filter((p) => p.tier === t).length,
);
phutTheoTang.every((v, i) => i === 0 || v >= phutTheoTang[i - 1])
  ? ok(`thời lượng tăng dần theo tầng: ${phutTheoTang.map((v) => Math.round(v)).join(' → ')} phút`)
  : fail(`thời lượng không tăng đều: ${phutTheoTang.map((v) => Math.round(v)).join(' → ')}`);

/* --- Không chỗ nào rỗng ruột --- */
P.every((p) => p.mucTieu.length > 25 && p.hocLieu.length > 25 && p.bayHayMac.length > 40)
  ? ok('mọi phiếu nêu rõ mục tiêu, học liệu và bẫy hay mắc')
  : fail('có phiếu thiếu mục tiêu, học liệu hoặc bẫy');
P.every((p) => p.phan.every((x) => x.lam.length > 25 && x.chuan.length > 15))
  ? ok('mọi phần có câu lệnh cụ thể và chuẩn đạt rõ ràng')
  : fail('có phần thiếu câu lệnh hoặc chuẩn đạt');
N.every((n) => n.viec.length > 30 && n.chiaSe.length > 30 && n.bangChung.length > 20)
  ? ok('mọi nhiệm vụ nêu rõ việc, phần chia sẻ và bằng chứng')
  : fail('có nhiệm vụ thiếu nội dung');
const soDangTrung = DANG_BAI.length - new Set(DANG_BAI.map((d) => d.ten)).size;
soDangTrung === 0 ? ok(`${DANG_BAI.length} dạng bài, không dạng nào trùng tên`) : fail(`${soDangTrung} dạng trùng tên`);
new Set(DANG_BAI.map((d) => d.bay)).size === DANG_BAI.length
  ? ok('tám mươi bẫy đều khác nhau — không chép lại một câu cho mọi dạng')
  : fail('có bẫy bị lặp giữa các dạng bài');

/* --- Mã bài luyện phải có thật --- */
const coDrill = new Set(DRILLS.map((d) => d.id));
const hong = [...new Set(DANG_BAI.map((d) => d.drillId))].filter((x) => !coDrill.has(x));
hong.length === 0 ? ok('mọi dạng bài nối tới một bài luyện có thật') : fail(`bài luyện không tồn tại: ${hong.join(', ')}`);

/* --- Luồng làm --- */
LUONG_LAM.every((b, i) => b.no === i + 1) ? ok(`luồng ${LUONG_LAM.length} bước, đánh số liên tục`) : fail('luồng đánh số sai');
LUONG_LAM.every((b) => b.lam.length > 30 && b.raGi.length > 20 && b.chanNeu.length > 10)
  ? ok('mỗi bước nêu rõ làm gì, ra cái gì, và chặn khi nào')
  : fail('có bước thiếu nội dung');
['nhan', 'lam-phan', 'noi-chuoi', 'cham', 'bao', 'nhan-xet', 'giai-phap', 'dinh-huong', 'chia-se', 'nang-cap']
  .every((m, i) => LUONG_LAM[i].ma === m)
  ? ok('luồng đúng thứ tự đã thiết kế: làm → chấm → báo → nhận xét → giải pháp → định hướng → nâng cấp')
  : fail('luồng sai thứ tự');

/* --- Chấm điểm: kiểm bằng số, không bằng cảm tính --- */
const p0 = P[0];
const tron = chamPhieu(p0, p0.phan.map((x) => x.soCau));
tron.tiLe === 100 && tron.datKpi && tron.dinhHuong === 'nâng cấp độ'
  ? ok('đúng hết thì 100%, đạt KPI, và được sang cấp')
  : fail(`đúng hết ra ${tron.tiLe}%`);
const khong = chamPhieu(p0, [0, 0, 0, 0, 0]);
khong.tiLe === 0 && !khong.datKpi && khong.dinhHuong === 'làm lại'
  ? ok('sai hết thì 0%, không đạt, và phải làm lại')
  : fail(`sai hết ra ${khong.tiLe}%`);
!tron.nhanXet.includes('yếu nhất') && !tron.nhanXet.includes('mỏng nhất')
  ? ok('đúng trọn vẹn thì KHÔNG bịa ra một "phần yếu nhất" không tồn tại')
  : fail('vẫn nêu phần yếu nhất khi mọi phần đều trọn vẹn');

let loiCham = 0;
for (const p of P.slice(0, 200)) {
  for (const bo of [[2, 3, 5, 8, 2], [2, 3, 4, 6, 1], [1, 1, 2, 3, 0], [0, 3, 5, 8, 2]]) {
    const r = chamPhieu(p, bo);
    if (r.tiLe < 0 || r.tiLe > 100) loiCham++;
    if (r.datKpi !== r.tiLe >= NGUONG_DAT) loiCham++;
    if (r.tungPhan.some((x) => x.dung > x.soCau || x.dung < 0)) loiCham++;
    if (!r.nhanXet || !r.giaiPhap || !r.buocKe) loiCham++;
    const mong = r.tiLe < NGUONG_LAM_LAI ? 'làm lại' : r.tiLe < NGUONG_DAT ? 'thử thách tiếp' : 'nâng cấp độ';
    if (r.dinhHuong !== mong) loiCham++;
  }
}
loiCham === 0 ? ok('800 lượt chấm thử: điểm trong khoảng, định hướng khớp ngưỡng, không lượt nào thiếu lời') : fail(`${loiCham} lỗi khi chấm thử`);

/* --- Vượt số câu thì bị kẹp lại, không cho điểm ảo --- */
chamPhieu(p0, [99, 99, 99, 99, 99]).tiLe === 100
  ? ok('khai số câu đúng vượt quá số câu có thì bị kẹp lại, không tạo điểm trên 100')
  : fail('số câu vượt quá tạo được điểm ảo');

/* --- KPI nâng giai đoạn --- */
const duoi = xetNangCap([95, 92, 90, 91, 88, 94, 96, 93]);
!duoi.duDieuKien && duoi.trungBinh > NGUONG_DAT
  ? ok('trung bình 92,4% nhưng chỉ 87,5% số phiếu đạt → CHƯA đủ điều kiện, đúng như thiết kế chống lấy trung bình che phiếu tệ')
  : fail('lấy trung bình che được phiếu tệ');
!xetNangCap([95, 95]).duDieuKien
  ? ok(`làm dưới ${PHIEU_TOI_THIEU} phiếu thì chưa xét, dù điểm cao`)
  : fail('làm ít phiếu vẫn được xét');
xetNangCap(new Array(10).fill(95)).duDieuKien
  ? ok('đủ phiếu và đủ tỉ lệ thì đủ điều kiện xét')
  : fail('đủ điều kiện mà vẫn báo chưa');
xetNangCap([]).soPhieu === 0 && !xetNangCap([]).duDieuKien
  ? ok('chưa làm phiếu nào thì không chia cho không, và không đủ điều kiện')
  : fail('mảng rỗng gây lỗi');

console.log(
  `\n  Dạng bài ${PHIEU_SO.soDangBai} · Phiếu ${PHIEU_SO.soPhieu.toLocaleString('vi-VN')} · ` +
    `Nhiệm vụ ${PHIEU_SO.soNhiemVu.toLocaleString('vi-VN')} · Câu ${PHIEU_SO.tongCau.toLocaleString('vi-VN')} · ` +
    `Bước luồng ${PHIEU_SO.soBuoc}`,
);
console.log(bad === 0 ? '  ĐẠT — bộ phiếu không lỗi\n' : `  HỎNG — ${bad} lỗi\n`);
process.exit(bad === 0 ? 0 : 1);
