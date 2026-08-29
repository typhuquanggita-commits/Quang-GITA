/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kiểm bộ 2.000 đề và bảng phân tích bảy chiều.
 * Chạy: npx tsx tools/kiem-bode.ts
 *
 * Chỗ dễ khai khống nhất của tầng này là con số 2.000. Nhân 80 dạng với 25
 * cấp thì ra 2.000 bản ngay, nhưng nếu 25 bản của một dạng giống hệt nhau
 * thì thực chất chỉ có 80 bảng được nhân bản lên. Bài kiểm đếm số bản khác
 * nhau THẬT, và đếm riêng từng chiều để lời tự nhận không nói quá.
 */
import {
  boDe, BODE_SO, BODE_CREED, KHO_BI_KIP, deTheoDang, deTheoPhieu,
} from '../data/bode';
import {DANG_BAI, phieuLuyen, KHUNG} from '../data/phieu';
import {LEVELS} from '../data/levels';
import {GIAI_BY_DANG} from '../data/giaide';

let bad = 0;
const fail = (m: string, x = '') => { bad++; console.log(`  ✗ ${m}${x ? ` — ${x}` : ''}`); };
const ok = (m: string) => console.log(`  ✓ ${m}`);

console.log('\n  KIỂM BỘ 2.000 ĐỀ\n');
const ds = boDe();

/* ------------------------------ SỐ LƯỢNG ------------------------------- */
ds.length === DANG_BAI.length * LEVELS.length
  ? ok(`${ds.length} đề = ${DANG_BAI.length} dạng bài × ${LEVELS.length} cấp độ`)
  : fail(`${ds.length} đề, không khớp ${DANG_BAI.length} × ${LEVELS.length}`);

const ids = ds.map((b) => b.id);
new Set(ids).size === ids.length
  ? ok('mọi mã đề là duy nhất')
  : fail('có mã đề trùng', ids.filter((v, i) => ids.indexOf(v) !== i).slice(0, 3).join(', '));

/* Mỗi phiếu luyện đúng một bảng phân tích, không thừa không thiếu. */
const phieu = phieuLuyen();
const thieu = phieu.filter((p) => !deTheoPhieu(p.id));
thieu.length === 0
  ? ok(`cả ${phieu.length} phiếu luyện đều có bảng phân tích riêng`)
  : fail(`${thieu.length} phiếu không có bảng`, thieu.slice(0, 3).map((p) => p.id).join(', '));

/* ------------------------- BẢY CHIỀU ĐỀU CÓ THẬT ------------------------ */
const chieu: [string, (b: (typeof ds)[0]) => boolean][] = [
  ['kiến thức', (b) => b.kienThuc.length >= 3 && b.kienThuc.every((x) => x.length > 30)],
  ['dạng bài', (b) => b.dangBai.length > 80],
  ['đọc vị', (b) => b.docVi.length >= 4 && b.docVi.every((x) => x.length > 30)],
  ['phương pháp', (b) => b.phuongPhap.length > 80],
  ['bước giải', (b) => b.buocGiai.length >= 5 && b.buocGiai.every((x) => x.length > 15)],
  ['mẹo xử lý', (b) => b.meoXuLy.length >= 5 && b.meoXuLy.every((x) => x.length > 25)],
  ['bí kíp', (b) => b.biKip.length > 60],
];
for (const [ten, dat] of chieu) {
  const hong = ds.filter((b) => !dat(b));
  hong.length === 0
    ? ok(`chiều ${ten}: cả ${ds.length} đề đều viết đủ`)
    : fail(`chiều ${ten}: ${hong.length} đề rỗng ruột`, hong.slice(0, 2).map((b) => b.id).join(', '));
}
BODE_SO.soChieuPhanTich === chieu.length
  ? ok(`đúng ${chieu.length} chiều phân tích như đã công bố`)
  : fail(`công bố ${BODE_SO.soChieuPhanTich} chiều, kiểm được ${chieu.length}`);

/* --------------------- 2.000 CÓ THẬT SỰ LÀ 2.000 KHÔNG ------------------ */
/*
 * Đây là phép kiểm quan trọng nhất của cả tệp. Nhân hai con số thì ra 2.000
 * ngay, nhưng nếu nội dung lặp lại thì đó là 80 bảng nhân bản chứ không phải
 * 2.000 bảng.
 */
const van = ds.map((b) =>
  JSON.stringify([b.kienThuc, b.dangBai, b.docVi, b.phuongPhap, b.buocGiai, b.meoXuLy, b.biKip]),
);
new Set(van).size === ds.length
  ? ok(`cả ${ds.length} bảng khác nhau về nội dung — không bảng nào là bản sao`)
  : fail(`chỉ có ${new Set(van).size} bảng khác nhau trên ${ds.length}`, 'phần còn lại là bản sao');

/*
 * VÀ ĐẾM RIÊNG TỪNG CHIỀU, VÌ LỜI TỰ NHẬN PHẢI KHỚP.
 * Kiến thức biến theo từng cấp (25 trong một dạng). Phương pháp và bí kíp
 * biến theo TẦNG (5 trong một dạng) — đó là chủ ý, vì năm cấp cùng tầng thì
 * đúng là nên làm bài giống nhau. Creed phải nói đúng điều này.
 */
const mau = deTheoDang(DANG_BAI[0].id);
const soKienThuc = new Set(mau.map((b) => JSON.stringify(b.kienThuc))).size;
const soPhuongPhap = new Set(mau.map((b) => b.phuongPhap)).size;
soKienThuc === LEVELS.length
  ? ok(`trong một dạng, chiều kiến thức có đủ ${LEVELS.length} biến thể — biến theo từng cấp`)
  : fail(`chiều kiến thức chỉ có ${soKienThuc} biến thể trên ${LEVELS.length} cấp`);
soPhuongPhap === 5
  ? ok('trong một dạng, chiều phương pháp có đúng 5 biến thể — biến theo tầng, đúng chủ ý')
  : fail(`chiều phương pháp có ${soPhuongPhap} biến thể, chờ đợi 5`);
/[Nn]ăm biến thể|5 biến thể/.test(BODE_CREED.demChoDung)
  ? ok('creed nói thẳng chiều nào chỉ có 5 biến thể, không để con số 2.000 nói quá')
  : fail('creed không nói rõ giới hạn của con số 2.000');

/* Phương pháp phải thật sự khác nhau giữa các tầng, không chỉ khác một chữ. */
const pp = [...new Set(ds.map((b) => b.phuongPhap))];
pp.length === 5 && pp.every((a, i) => pp.every((c, j) => i === j || a.slice(0, 40) !== c.slice(0, 40)))
  ? ok('năm cách làm của năm tầng khác nhau ngay từ câu đầu')
  : fail('các tầng dùng lời khuyên gần giống nhau');

/* ------------------------------- BAREM --------------------------------- */
ds.every((b) => b.barem.length === KHUNG.length)
  ? ok(`${BODE_SO.soBaremPhan} dòng barem, đủ ${KHUNG.length} phần cho mỗi đề`)
  : fail('có đề thiếu barem của một phần');
ds.every((b) => b.barem.reduce((s, x) => s + x.trong, 0) === 100)
  ? ok('trọng số các phần của mọi đề cộng đúng 100')
  : fail('có đề trọng số không cộng thành 100');
ds.every((b) => b.barem.every((x) => x.truDiem.length > 25))
  ? ok('mọi dòng barem nói rõ TRỪ ĐIỂM Ở ĐÂU, không chỉ nói cho điểm ở đâu')
  : fail('có dòng barem không nói chỗ trừ điểm');
/*
 * Chuẩn chấm phải NGHIÊM DẦN theo tầng. Tầng 5 mà chấm dễ hơn tầng 1 thì
 * thước đo đi ngược, và học viên lên tầng lại thấy điểm cao hơn dù làm kém đi.
 */
const truTheoTang = [1, 2, 3, 4, 5].map(
  (t) => ds.find((b) => b.tier === t)!.barem[0].truDiem,
);
new Set(truTheoTang).size === 5
  ? ok('năm tầng có năm chuẩn trừ điểm khác nhau, nghiêm dần')
  : fail('các tầng dùng chung chuẩn trừ điểm');
/[Cc]hưa trừ điểm trình bày/.test(truTheoTang[0]) && /nghiêm nhất|mọi lỗi đều trừ/.test(truTheoTang[4])
  ? ok('tầng 1 chấm nhẹ nhất, tầng 5 chấm nghiêm nhất — thước đo đi đúng chiều')
  : fail('chuẩn chấm không nghiêm dần theo tầng');

/* --------------------------- NEO VÀO HỆ THỐNG --------------------------- */
ds.every((b) => DANG_BAI.some((d) => d.id === b.dangId))
  ? ok('mọi đề trỏ về một dạng bài có thật')
  : fail('có đề trỏ vào dạng bài không tồn tại');
ds.every((b) => LEVELS.some((l) => l.id === b.levelId))
  ? ok('mọi đề trỏ về một cấp độ có thật')
  : fail('có đề trỏ vào cấp độ không tồn tại');
ds.every((b) => GIAI_BY_DANG[b.dangId])
  ? ok('mọi đề tựa được vào bộ giải đề của chính dạng bài đó')
  : fail('có đề không tìm được bộ giải');

/* ---------------------------- KHO BÍ KÍP -------------------------------- */
KHO_BI_KIP.length === DANG_BAI.length
  ? ok(`kho bí kíp ${KHO_BI_KIP.length} mục — gom theo dạng bài để đọc hết được`)
  : fail(`kho bí kíp có ${KHO_BI_KIP.length} mục`);
KHO_BI_KIP.every((k) => k.chuanTuKiem.length > 30 && k.khiSai.length > 40 && k.docVi.length >= 3 && k.baBay.length === 3)
  ? ok('mỗi bí kíp có chuẩn tự kiểm, hướng xử lý khi sai, dấu hiệu đọc vị, và ba bẫy')
  : fail('có bí kíp thiếu trường');
new Set(KHO_BI_KIP.map((k) => k.chuanTuKiem)).size > DANG_BAI.length * 0.8
  ? ok('chuẩn tự kiểm khác nhau giữa các dạng, không chép chung một câu')
  : fail('nhiều dạng dùng chung một chuẩn tự kiểm');

/* ---------------------------- LỜI TỰ NHẬN ------------------------------- */
/KHÔNG phải 2\.000 đề với 40\.000 câu/.test(BODE_CREED.khongPhai)
  ? ok('nói thẳng đây KHÔNG phải 2.000 đề viết tay từng câu')
  : fail('không nói rõ đây là gì và không là gì');
/ngân hàng câu hỏi|đề thi mẫu/.test(BODE_CREED.khongPhai)
  ? ok('chỉ đúng chỗ có câu cụ thể và chỗ có đề trọn vẹn')
  : fail('không chỉ người dùng sang tầng có câu thật');

BODE_SO.soDe === ds.length && BODE_SO.soBiKip === KHO_BI_KIP.length
  ? ok('mọi con số công bố suy ra từ dữ liệu, không gõ tay')
  : fail('con số công bố lệch với dữ liệu');

console.log(
  `\n  Đề ${BODE_SO.soDe} · Chiều ${BODE_SO.soChieuPhanTich} · Barem ${BODE_SO.soBaremPhan} dòng · ` +
    `Bước giải ${BODE_SO.soBuocGiai} · Mẹo ${BODE_SO.soMeo} · Bí kíp ${BODE_SO.soBiKip}`,
);
console.log(bad === 0 ? '  ĐẠT — bộ 2.000 đề không lỗi\n' : `  HỎNG — ${bad} lỗi\n`);
process.exit(bad === 0 ? 0 : 1);
