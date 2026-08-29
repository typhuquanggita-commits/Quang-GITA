/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kiểm bộ giải đề, bộ phiếu chuyên đề, và hồ sơ học viên.
 * Chạy: npx tsx tools/kiem-giai-hoso.ts
 */
import {GIAI_DE, GIAI_BY_DANG, GIAI_SO, GIAI_CREED, giaiTheoPhan} from '../data/giaide';
import {LOAI_PHIEU, phieuChuyenDe, phieuGiai, boCuaChuyenDe, giaiCuaPhieu, CHUYENDE_SO, CHUYENDE_CREED} from '../data/chuyende';
import {phanTichHoSo, loTrinhCaNhan, DU_DE_KET_LUAN, HOSO_CREED, HOSO_SO} from '../data/hoso';
import {DANG_BAI, phieuLuyen, KHUNG, NGUONG_DAT} from '../data/phieu';
import {DRILLS} from '../data/drills';
import {CHU_DE} from '../data/giangsau';
import type {LanLam} from '../types';

let bad = 0;
const fail = (m: string) => { bad++; console.log('  ✗ ' + m); };
const ok = (m: string) => console.log('  ✓ ' + m);

console.log('\n  KIỂM BỘ GIẢI · CHUYÊN ĐỀ · HỒ SƠ\n');

/* --------------------------- BỘ GIẢI ĐỀ --------------------------------- */
GIAI_DE.length === DANG_BAI.length
  ? ok(`${GIAI_DE.length} bộ giải, đúng một bộ cho mỗi dạng bài`)
  : fail(`${GIAI_DE.length} bộ giải cho ${DANG_BAI.length} dạng bài`);
DANG_BAI.every((d) => GIAI_BY_DANG[d.id])
  ? ok('không dạng bài nào thiếu bộ giải')
  : fail(`thiếu bộ giải: ${DANG_BAI.filter((d) => !GIAI_BY_DANG[d.id]).map((d) => d.id).join(', ')}`);
GIAI_DE.every((g) => g.diemKienThuc.length >= 3)
  ? ok(`${GIAI_SO.soDiemKienThuc} điểm kiến thức, mỗi bộ ít nhất ba`)
  : fail('có bộ giải dưới ba điểm kiến thức');
GIAI_DE.every((g) => g.cachNghi.length >= 4)
  ? ok(`${GIAI_SO.soBuocNghi} bước nghĩ, mỗi bộ ít nhất bốn`)
  : fail('có bộ giải dưới bốn bước nghĩ');
GIAI_DE.every((g) => g.bay.length === 3)
  ? ok(`${GIAI_SO.soBay} bẫy, đúng ba bẫy mỗi bộ`)
  : fail('có bộ giải không đủ ba bẫy');
/*
 * Ba trường của một bẫy chịu ba ngưỡng khác nhau, vì chúng làm ba việc khác
 * nhau — dùng chung một ngưỡng là đo sai.
 *   chon        phải mô tả được lựa chọn sai, nên cần một mệnh đề.
 *   viSaoHapDan chỉ cần GỌI TÊN cái thôi thúc: "Tiếc một câu.", "Ngại." đã
 *               đủ và đúng. Ép nó dài ra chỉ tạo ra chữ đệm.
 *   saiODau     là chỗ dạy được, nên đây mới là trường phải viết kỹ.
 */
GIAI_DE.every((g) => g.bay.every((b) => b.chon.length > 12))
  ? ok('mọi bẫy mô tả rõ lựa chọn sai')
  : fail('có bẫy không mô tả rõ lựa chọn sai');
GIAI_DE.every((g) => g.bay.every((b) => b.viSaoHapDan.trim().length >= 5))
  ? ok('mọi bẫy gọi tên được cái thôi thúc dẫn tới lựa chọn đó')
  : fail('có bẫy bỏ trống phần vì sao hấp dẫn');
GIAI_DE.every((g) => g.bay.every((b) => b.saiODau.length > 40))
  ? ok('mọi bẫy viết kỹ phần SAI Ở ĐÂU — đó mới là phần dạy được')
  : fail('có bẫy thiếu phần sai ở đâu');
GIAI_DE.every((g) => g.tuKiemDapAn.length > 30 && g.neuSai.length > 40)
  ? ok('mọi bộ giải có cách tự kiểm và hướng xử lý khi sai')
  : fail('có bộ giải thiếu tự kiểm hoặc thiếu hướng xử lý');

/* Bẫy phải khác nhau — chép một bẫy cho nhiều dạng là rỗng ruột trá hình. */
const moiBay = GIAI_DE.flatMap((g) => g.bay.map((b) => b.saiODau));
new Set(moiBay).size === moiBay.length
  ? ok(`${moiBay.length} lời giải thích "sai ở đâu" đều khác nhau`)
  : fail(`có ${moiBay.length - new Set(moiBay).size} lời giải thích bị chép lại`);
new Set(GIAI_DE.flatMap((g) => g.diemKienThuc)).size >= GIAI_SO.soDiemKienThuc * 0.8
  ? ok('điểm kiến thức phần lớn khác nhau giữa các dạng')
  : fail('quá nhiều điểm kiến thức trùng nhau giữa các dạng');

/* Liên kết phải có thật. */
const coDrill = new Set(DRILLS.map((d) => d.id));
GIAI_DE.every((g) => coDrill.has(g.drillId)) ? ok('mọi bộ giải nối tới bài luyện có thật') : fail('có bộ giải nối tới bài luyện không tồn tại');
const coBai = new Set(CHU_DE.map((c) => c.id));
const hongBai = [...new Set(GIAI_DE.flatMap((g) => g.baiGiangIds))].filter((x) => !coBai.has(x));
hongBai.length === 0
  ? ok('mọi bộ giải nối tới bài giảng chuyên sâu có thật')
  : fail(`bài giảng không tồn tại: ${hongBai.join(', ')}`);
GIAI_DE.every((g) => g.baiGiangIds.length >= 2) ? ok('mỗi bộ giải dẫn ít nhất hai bài giảng') : fail('có bộ giải dẫn dưới hai bài giảng');

/* Hướng dẫn theo phần phải khác nhau giữa năm phần. */
const p0 = phieuLuyen()[0];
const huong = p0.phan.map((f) => giaiTheoPhan(p0.dangId, f).huong);
new Set(huong).size === KHUNG.length
  ? ok('năm phần có năm hướng dẫn khác nhau, không dùng chung một câu')
  : fail('hướng dẫn theo phần bị lặp giữa các phần');
GIAI_CREED.luatXemDapAn.includes('SAU khi đã nộp')
  ? ok('có luật: chỉ mở đáp án sau khi đã nộp')
  : fail('thiếu luật mở đáp án');

/* ------------------------ PHIẾU CHUYÊN ĐỀ ------------------------------- */
const PC = phieuChuyenDe();
const PG = phieuGiai();
PC.length === DANG_BAI.length * LOAI_PHIEU.length
  ? ok(`${PC.length} phiếu chuyên đề = ${DANG_BAI.length} chuyên đề × ${LOAI_PHIEU.length} loại`)
  : fail(`có ${PC.length} phiếu chuyên đề`);
PG.length === PC.length ? ok(`${PG.length} phiếu giải, đúng một phiếu giải cho mỗi phiếu`) : fail('số phiếu giải khác số phiếu');
CHUYENDE_SO.tongPhieu === 1120 ? ok(`tổng ${CHUYENDE_SO.tongPhieu} phiếu trong tầng chuyên đề`) : fail(`tổng ${CHUYENDE_SO.tongPhieu} phiếu`);
new Set(PC.map((p) => p.id)).size === PC.length ? ok('không mã phiếu chuyên đề nào trùng') : fail('có mã phiếu trùng');
PC.every((p) => giaiCuaPhieu(p.id)?.phieuId === p.id)
  ? ok('mọi phiếu nối đúng phiếu giải của nó')
  : fail('có phiếu nối sai phiếu giải');

LOAI_PHIEU.every((l, i) => l.no === i + 1) ? ok(`bảy loại phiếu đánh số liên tục`) : fail('bảy loại đánh số sai');
['LT', 'DB', 'KN', 'NC', 'OT', 'TH', 'OC'].every((m, i) => LOAI_PHIEU[i].ma === m)
  ? ok('đúng thứ tự: lý thuyết → dạng bài → kỹ năng → nâng cao → ôn thi → thi → ôn chắc')
  : fail('bảy loại sai thứ tự');
LOAI_PHIEU.every((l) => l.cauTruc.length >= 4 && l.giaiCo.length >= 3)
  ? ok('mỗi loại phiếu nêu ít nhất bốn phần cấu trúc và ba thứ trong phiếu giải')
  : fail('có loại phiếu thiếu cấu trúc hoặc thiếu nội dung phiếu giải');
LOAI_PHIEU.every((l) => l.mucDich.length > 40 && l.khiNaoLam.length > 20 && l.raGi.length > 25 && l.chanNeu.length > 15)
  ? ok('mỗi loại nêu rõ mục đích, khi nào làm, ra cái gì, và chặn khi nào')
  : fail('có loại phiếu thiếu nội dung');
new Set(LOAI_PHIEU.map((l) => l.mucDich)).size === LOAI_PHIEU.length
  ? ok('bảy mục đích khác nhau — bảy loại thật sự làm bảy việc khác nhau')
  : fail('có loại phiếu trùng mục đích');

const bo = boCuaChuyenDe(DANG_BAI[0].id);
bo.length === 7 && bo.every((p, i) => p.loaiNo === i + 1)
  ? ok('bộ của một chuyên đề trả về đúng bảy phiếu, đúng thứ tự')
  : fail('bộ chuyên đề trả về sai');
PG.every((g) => g.bangPhanTich.length >= 3 && g.bangPhanTich.every((r) => r.diem && r.banChat && r.hayNhamVoi))
  ? ok('mọi phiếu giải có bảng phân tích đủ ba dòng, mỗi dòng có bản chất và chỗ hay nhầm')
  : fail('có phiếu giải thiếu bảng phân tích');
PG.every((g) => g.moKhiNao.includes('sau khi'))
  ? ok('mọi phiếu giải ghi rõ chỉ mở SAU khi làm xong phiếu chính')
  : fail('có phiếu giải không ghi điều kiện mở');
PG.filter((g) => g.id.endsWith('-TH')).every((g) => g.moKhiNao.includes('hồ sơ'))
  ? ok('phiếu giải của phiếu thi nói rõ điểm đã ghi vào hồ sơ thì không sửa được')
  : fail('phiếu giải của phiếu thi thiếu lời về hồ sơ');
CHUYENDE_CREED.thuTu.includes('không đảo được')
  ? ok('nói rõ bảy phiếu không đảo thứ tự được, và vì sao')
  : fail('thiếu lời về thứ tự bảy phiếu');
CHUYENDE_CREED.giaiKhongChiLaDapAn.includes('VÌ ĐÂU')
  ? ok('nói rõ phiếu giải cho biết sai VÌ ĐÂU, không chỉ cho biết sai')
  : fail('thiếu lời phân biệt đáp án và phân tích');

/* ---------------------------- HỒ SƠ ------------------------------------- */
const mk = (i: number, tiLe: number, skill: any, ngay: string, phan: number[]): LanLam => ({
  id: 'x' + i, phieuId: 'pl-l01-L1-1', luc: ngay + 'T08:00:00Z', dungTungPhan: phan,
  tiLe, datKpi: tiLe >= NGUONG_DAT, phanYeuNhat: 'TỰ', skill, levelId: 'L1-1',
});

const rong = phanTichHoSo([]);
rong.soLan === 0 && rong.xuHuong === 'chưa đủ dữ liệu' && rong.trungBinh === 0
  ? ok('hồ sơ rỗng: không chia cho không, không đoán xu hướng')
  : fail('hồ sơ rỗng gây lỗi hoặc đoán bừa');
loTrinhCaNhan(rong, []).length === 0 ? ok('hồ sơ rỗng thì không đề nghị việc gì') : fail('hồ sơ rỗng vẫn đề nghị việc');

const hai = phanTichHoSo([mk(1, 60, 'listening', '2026-08-20', [2, 3, 4, 5, 1]), mk(2, 95, 'listening', '2026-08-21', [2, 3, 5, 8, 2])]);
hai.xuHuong === 'chưa đủ dữ liệu'
  ? ok(`dưới ${DU_DE_KET_LUAN} lần thì KHÔNG kết luận xu hướng, dù hai điểm chênh nhau rất xa`)
  : fail('kết luận xu hướng từ hai điểm');

const len = phanTichHoSo([
  mk(1, 60, 'listening', '2026-08-20', [2, 2, 3, 4, 1]),
  mk(2, 65, 'listening', '2026-08-21', [2, 2, 4, 4, 1]),
  mk(3, 85, 'listening', '2026-08-22', [2, 3, 5, 7, 2]),
  mk(4, 90, 'listening', '2026-08-23', [2, 3, 5, 8, 2]),
]);
len.xuHuong === 'đang lên' ? ok('bốn lần tăng đều thì kết luận đang lên') : fail(`bốn lần tăng đều ra "${len.xuHuong}"`);
const xuong = phanTichHoSo([
  mk(1, 92, 'listening', '2026-08-20', [2, 3, 5, 8, 2]),
  mk(2, 90, 'listening', '2026-08-21', [2, 3, 5, 8, 2]),
  mk(3, 70, 'listening', '2026-08-22', [2, 2, 4, 5, 1]),
  mk(4, 65, 'listening', '2026-08-23', [2, 2, 3, 5, 1]),
]);
xuong.xuHuong === 'đang xuống' ? ok('bốn lần giảm đều thì kết luận đang xuống') : fail(`bốn lần giảm ra "${xuong.xuHuong}"`);
const ngang = phanTichHoSo([
  mk(1, 80, 'listening', '2026-08-20', [2, 3, 4, 6, 2]),
  mk(2, 82, 'listening', '2026-08-21', [2, 3, 4, 6, 2]),
  mk(3, 79, 'listening', '2026-08-22', [2, 3, 4, 6, 2]),
  mk(4, 81, 'listening', '2026-08-23', [2, 3, 4, 6, 2]),
]);
ngang.xuHuong === 'đi ngang'
  ? ok('dao động nhỏ thì gọi là đi ngang, không đọc nhiễu thành tín hiệu')
  : fail(`dao động nhỏ ra "${ngang.xuHuong}"`);

len.chuoiNgay === 4 ? ok('chuỗi ngày đếm đúng khi làm bốn ngày liên tiếp') : fail(`chuỗi ngày ra ${len.chuoiNgay}`);
const dut = phanTichHoSo([
  mk(1, 80, 'listening', '2026-08-20', [2, 3, 4, 6, 2]),
  mk(2, 80, 'listening', '2026-08-24', [2, 3, 4, 6, 2]),
  mk(3, 80, 'listening', '2026-08-25', [2, 3, 4, 6, 2]),
]);
dut.chuoiNgay === 2 ? ok('chuỗi ngày dừng đúng ở chỗ đứt, không đếm gộp') : fail(`chuỗi có đứt ra ${dut.chuoiNgay}`);

const ds5 = [
  mk(1, 72, 'listening', '2026-08-20', [2, 3, 4, 5, 1]),
  mk(2, 68, 'listening', '2026-08-21', [2, 2, 4, 5, 1]),
  mk(3, 80, 'writing', '2026-08-22', [2, 3, 5, 6, 2]),
  mk(4, 88, 'listening', '2026-08-23', [2, 3, 5, 7, 2]),
  mk(5, 92, 'writing', '2026-08-24', [2, 3, 5, 8, 2]),
];
const pt5 = phanTichHoSo(ds5);
pt5.yeuNhat === 'listening' && pt5.manhNhat === 'writing'
  ? ok('nhận đúng kỹ năng mạnh nhất và yếu nhất')
  : fail(`mạnh/yếu ra ${pt5.manhNhat}/${pt5.yeuNhat}`);
pt5.theoPhan[0].ma === 'TU' ? ok('nhận đúng phần yếu nhất trong năm phần') : fail(`phần yếu nhất ra ${pt5.theoPhan[0].ma}`);

const lt = loTrinhCaNhan(pt5, ds5);
lt.length > 0 && lt.length <= HOSO_SO.soViecToiDa
  ? ok(`lộ trình cá nhân hoá tối đa ${HOSO_SO.soViecToiDa} việc — đúng luật kê tối đa ba đơn`)
  : fail(`lộ trình trả về ${lt.length} việc`);
lt.every((v) => v.bangChung.length > 25 && /\d/.test(v.bangChung))
  ? ok('mọi việc đề nghị đều dẫn ra CON SỐ làm bằng chứng')
  : fail('có việc đề nghị không có bằng chứng bằng số');
lt.every((v, i) => i === 0 || v.uuTien >= lt[i - 1].uuTien)
  ? ok('lộ trình sắp theo ưu tiên tăng dần') : fail('lộ trình sai thứ tự ưu tiên');
lt.some((v) => v.viec.includes('Nghe'))
  ? ok('lộ trình chỉ đúng kỹ năng yếu nhất trong hồ sơ mẫu')
  : fail('lộ trình không nhắm vào kỹ năng yếu nhất');

const ngheo = loTrinhCaNhan(phanTichHoSo([mk(1, 80, 'listening', '2026-08-20', [2, 3, 4, 6, 2]), mk(2, 80, 'listening', '2026-08-25', [2, 3, 4, 6, 2])]), []);
ngheo.every((v) => v.bangChung)
  ? ok('kể cả khi ít dữ liệu, mọi đề nghị vẫn kèm bằng chứng')
  : fail('có đề nghị không bằng chứng khi ít dữ liệu');

HOSO_CREED.oDau.includes('không gửi đi đâu')
  ? ok('nói rõ hồ sơ nằm trên máy người học, không gửi đi đâu')
  : fail('thiếu lời về nơi lưu hồ sơ');
HOSO_CREED.duDuLieu.includes('chưa đủ dữ liệu')
  ? ok('nói rõ hệ thống báo chưa đủ dữ liệu thay vì đoán bừa')
  : fail('thiếu lời về ngưỡng dữ liệu');

console.log(
  `\n  Bộ giải ${GIAI_SO.soBoGiai} · Bẫy ${GIAI_SO.soBay} · Chuyên đề ${CHUYENDE_SO.soChuyenDe} × ${CHUYENDE_SO.soLoai} loại · ` +
    `Phiếu ${CHUYENDE_SO.soPhieu} + giải ${CHUYENDE_SO.soPhieuGiai} = ${CHUYENDE_SO.tongPhieu}`,
);
console.log(bad === 0 ? '  ĐẠT — tầng giải đề và hồ sơ không lỗi\n' : `  HỎNG — ${bad} lỗi\n`);
process.exit(bad === 0 ? 0 : 1);
