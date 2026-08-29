/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kiểm bộ 2.000 bài giảng chuyên sâu. Chạy: npx tsx tools/kiem-giang-sau.ts
 */
import {
  CHU_DE, TRU, baiGiangSau, thuTuHoc, baiTruongKho, TRUONG_KHO,
  GIANG_SAU_SO, GIANG_SAU_CREED,
} from '../data/giangsau';
import {LEVELS} from '../data/levels';
import {DRILLS} from '../data/drills';
import {DANG_BAI} from '../data/phieu';

let bad = 0;
const fail = (m: string) => { bad++; console.log('  ✗ ' + m); };
const ok = (m: string) => console.log('  ✓ ' + m);

console.log('\n  KIỂM BỘ BÀI GIẢNG CHUYÊN SÂU\n');

const B = baiGiangSau();

/* --- Số lượng --- */
B.length === CHU_DE.length * LEVELS.length
  ? ok(`${B.length.toLocaleString('vi-VN')} bài = ${CHU_DE.length} chủ đề × ${LEVELS.length} cấp độ`)
  : fail(`có ${B.length} bài, phép nhân ra ${CHU_DE.length * LEVELS.length}`);
B.length === 2000 ? ok('đúng 2.000 bài như đã hứa') : fail(`hứa 2.000, có ${B.length}`);
new Set(B.map((b) => b.id)).size === B.length ? ok('không mã bài nào trùng') : fail('có mã bài trùng');

/* --- Bốn trụ chia đều --- */
const theoTru: Record<string, number> = {};
for (const b of B) theoTru[b.truId] = (theoTru[b.truId] ?? 0) + 1;
Object.keys(theoTru).length === 4 && Object.values(theoTru).every((v) => v === 500)
  ? ok('bốn trụ chia đều, mỗi trụ đúng 500 bài')
  : fail(`phân bố trụ lệch: ${JSON.stringify(theoTru)}`);
TRU.every((t) => CHU_DE.filter((c) => c.tru === t.id).length === 20)
  ? ok('mỗi trụ đúng 20 chủ đề')
  : fail('có trụ không đủ 20 chủ đề');
TRU.every((t) => t.vaiTro.length > 25 && t.thieuThiSao.length > 40)
  ? ok('mỗi trụ nêu rõ vai trò và hệ quả khi thiếu nó')
  : fail('có trụ thiếu mô tả');

/* --- Phủ đủ tổ hợp --- */
new Set(B.map((b) => `${b.chuDeId}|${b.levelId}`)).size === CHU_DE.length * LEVELS.length
  ? ok('mọi cặp chủ đề × cấp độ đều có đúng một bài')
  : fail('có cặp bị thiếu hoặc trùng');

/* --- Không rỗng ruột --- */
new Set(CHU_DE.map((c) => c.ten)).size === CHU_DE.length ? ok('80 chủ đề, không tên nào trùng') : fail('có chủ đề trùng tên');
new Set(CHU_DE.map((c) => c.cauHoiLoi)).size === CHU_DE.length
  ? ok('80 câu hỏi lõi đều khác nhau — không chép một câu cho nhiều bài')
  : fail('có câu hỏi lõi bị lặp');
new Set(CHU_DE.map((c) => c.bay)).size === CHU_DE.length ? ok('80 bẫy đều khác nhau') : fail('có bẫy bị lặp');
CHU_DE.every((c) => c.cauHoiLoi.includes('?')) ? ok('mọi câu hỏi lõi đều thật sự là một câu hỏi') : fail('có câu hỏi lõi không có dấu hỏi');
CHU_DE.every((c) => c.loi.length > 120) ? ok('phần lõi của mọi chủ đề đều viết đủ dài để dạy được') : fail('có phần lõi quá ngắn');
CHU_DE.every((c) => c.viDu.length > 60) ? ok('mọi chủ đề có ví dụ cụ thể') : fail('có chủ đề thiếu ví dụ');
CHU_DE.every((c) => c.viec.length > 40 && c.tuKiem.length > 25 && c.bay.length > 40)
  ? ok('mọi chủ đề nêu rõ việc phải làm, cách tự kiểm, và bẫy hay mắc')
  : fail('có chủ đề thiếu việc làm, tự kiểm hoặc bẫy');
B.every((b) => b.viecSauBai.length > 60 && b.hocLieu.length > 25 && b.phut > 0)
  ? ok('mọi bài có việc sau bài, học liệu và thời lượng')
  : fail('có bài thiếu việc sau bài hoặc học liệu');

/* --- Độ sâu phải tăng theo tầng, nếu không thì 25 cấp là trang trí --- */
const phutTheoTang = [1, 2, 3, 4, 5].map((t) => {
  const ds = B.filter((b) => b.tier === t);
  return ds.reduce((s, b) => s + b.phut, 0) / ds.length;
});
phutTheoTang.every((v, i) => i === 0 || v > phutTheoTang[i - 1])
  ? ok(`độ sâu tăng thật theo tầng: ${phutTheoTang.map((v) => Math.round(v)).join(' → ')} phút`)
  : fail(`thời lượng không tăng theo tầng: ${phutTheoTang.map(Math.round).join(' → ')}`);
new Set(B.filter((b) => b.chuDeId === CHU_DE[0].id).map((b) => b.ten)).size === 5
  ? ok('cùng một chủ đề cho ra 5 mức khác nhau, không phải 25 bản sao')
  : fail('các cấp của cùng chủ đề không khác nhau');

/* --- Liên kết phải có thật --- */
const coDrill = new Set(DRILLS.map((d) => d.id));
const hongDrill = [...new Set(CHU_DE.map((c) => c.drillId))].filter((x) => !coDrill.has(x));
hongDrill.length === 0 ? ok('mọi chủ đề nối tới một bài luyện có thật') : fail(`bài luyện không tồn tại: ${hongDrill.join(', ')}`);
const coDang = new Set(DANG_BAI.map((d) => d.id));
const hongDang = [...new Set(B.map((b) => b.phieuDangId))].filter((x) => !coDang.has(x));
hongDang.length === 0
  ? ok('mọi bài giảng nối tới một dạng phiếu luyện có thật — không có bài nào chỉ để nghe')
  : fail(`dạng phiếu không tồn tại: ${hongDang.join(', ')}`);

/* --- Hai tuyến --- */
CHU_DE.every((c) => c.tuyen.length > 0) ? ok('mọi chủ đề gắn ít nhất một tuyến') : fail('có chủ đề không thuộc tuyến nào');
GIANG_SAU_SO.soBaiIelts > 0 && GIANG_SAU_SO.soBaiChuyen > 0
  ? ok(`tuyến IELTS ${GIANG_SAU_SO.soBaiIelts.toLocaleString('vi-VN')} bài · tuyến chuyên ${GIANG_SAU_SO.soBaiChuyen.toLocaleString('vi-VN')} bài`)
  : fail('một tuyến không có bài nào');
const chiIelts = CHU_DE.filter((c) => c.tuyen.length === 1 && c.tuyen[0] === 'ielts').length;
const chiChuyen = CHU_DE.filter((c) => c.tuyen.length === 1 && c.tuyen[0] === 'chuyen').length;
chiIelts > 0 && chiChuyen > 0
  ? ok(`${chiIelts} chủ đề chỉ dành cho IELTS, ${chiChuyen} chỉ dành cho chuyên — hai tuyến thật sự khác nhau`)
  : fail('không tuyến nào có chủ đề riêng — vậy thì tách tuyến là vô nghĩa');

/* --- Ưu tiên cho hai trường khó --- */
const ut = baiTruongKho();
ut.length > 0 ? ok(`${ut.length} bài trọng yếu cho hai trường khó nhất`) : fail('không bài nào được đánh ưu tiên 2');
ut.every((b) => b.tuyen.includes('chuyen')) ? ok('mọi bài ưu tiên 2 đều thuộc tuyến chuyên') : fail('có bài ưu tiên 2 không thuộc tuyến chuyên');
const dauChuyen = thuTuHoc('chuyen', 'L1-1');
dauChuyen.length > 0 && dauChuyen[0].uuTien === 2
  ? ok('thứ tự học tuyến chuyên đặt bài ưu tiên 2 lên trước')
  : fail('thứ tự tuyến chuyên không ưu tiên đúng');
dauChuyen.every((b, i) => i === 0 || dauChuyen[i - 1].uuTien >= b.uuTien)
  ? ok('trong một cấp, thứ tự chuyên giảm dần theo ưu tiên, không nhảy cóc')
  : fail('thứ tự ưu tiên bị đảo');
const dauIelts = thuTuHoc('ielts');
dauIelts.every((b, i) => i === 0 || dauIelts[i - 1].tier <= b.tier)
  ? ok('thứ tự học tuyến IELTS đi từ tầng thấp lên cao')
  : fail('thứ tự IELTS không theo tầng');
TRUONG_KHO.khacOChoNao.length >= 4 && TRUONG_KHO.langNghe.length > 80 && TRUONG_KHO.kiemLai.includes('đổi theo năm')
  ? ok('phần hai trường khó nêu rõ khác ở chỗ nào, nói thẳng về xác suất, và bắt kiểm lại đề án từng năm')
  : fail('phần hai trường khó thiếu nội dung hoặc thiếu cảnh báo');
GIANG_SAU_CREED.canhBao.includes('THAY ĐỔI')
  ? ok('có cảnh báo cấu trúc đề và điểm chuẩn đổi theo năm')
  : fail('thiếu cảnh báo về việc đề đổi theo năm');
GIANG_SAU_CREED.rule.includes('phiếu')
  ? ok('nêu rõ luật: bài giảng không có phiếu đi kèm là bài giảng chỉ để nghe cho sướng tai')
  : fail('thiếu luật nối bài giảng với phiếu');

/* --- Số công bố khớp số đếm --- */
GIANG_SAU_SO.soBai === B.length &&
GIANG_SAU_SO.soChuDe === CHU_DE.length &&
GIANG_SAU_SO.tongPhut === B.reduce((s, b) => s + b.phut, 0)
  ? ok('mọi con số công bố khớp số đếm được từ dữ liệu')
  : fail('số công bố lệch số thật');

console.log(
  `\n  Trụ ${GIANG_SAU_SO.soTru} · Chủ đề ${GIANG_SAU_SO.soChuDe} · Bài ${GIANG_SAU_SO.soBai.toLocaleString('vi-VN')} · ` +
    `Ưu tiên 2: ${GIANG_SAU_SO.soBaiUuTien2} · Tổng ${Math.round(GIANG_SAU_SO.tongPhut / 60).toLocaleString('vi-VN')} giờ`,
);
console.log(bad === 0 ? '  ĐẠT — bộ bài giảng không lỗi\n' : `  HỎNG — ${bad} lỗi\n`);
process.exit(bad === 0 ? 0 : 1);
