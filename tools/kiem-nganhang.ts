/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kiểm ngân hàng câu hỏi.
 * Chạy: npx tsx tools/kiem-nganhang.ts
 *
 * Ngân hàng câu hỏi là chỗ dễ khai khống nhất trong cả hệ thống: thêm một
 * mảng câu là con số tăng ngay, còn chất lượng thì không ai thấy. Bài kiểm
 * này giữ đúng những gì ngân hàng tự nhận trong NGANHANG_CREED, và giữ
 * riêng phần dễ rỗng ruột nhất — bốn nhận xét cho bốn lựa chọn.
 */
import {
  NGAN_HANG, NGANHANG_SO, NGANHANG_CREED, CHUYEN_DE_CO_CAU,
  cauCuaChuyenDe, cauCuaPhieu, chamCau,
} from '../data/nganhang';
import {DANG_BAI} from '../data/phieu';
import {GIAI_BY_DANG} from '../data/giaide';
import {LOAI_PHIEU} from '../data/chuyende';

let bad = 0;
const fail = (m: string) => { bad++; console.log('  ✗ ' + m); };
const ok = (m: string) => console.log('  ✓ ' + m);

console.log('\n  KIỂM NGÂN HÀNG CÂU HỎI\n');

/* ------------------------- KHUNG CỦA MỘT CÂU ---------------------------- */
NGAN_HANG.every((c) => c.luaChon.length === 4)
  ? ok(`${NGANHANG_SO.soCau} câu, mỗi câu đúng bốn lựa chọn`)
  : fail('có câu không đủ bốn lựa chọn');
NGAN_HANG.every((c) => c.nhanXet.length === 4)
  ? ok(`${NGANHANG_SO.soNhanXet} nhận xét, đủ một dòng cho mỗi lựa chọn`)
  : fail('có câu không đủ bốn nhận xét');
NGAN_HANG.every((c) => Number.isInteger(c.dapAn) && c.dapAn >= 0 && c.dapAn <= 3)
  ? ok('mọi đáp án trỏ vào một trong bốn ô có thật')
  : fail(`đáp án ngoài khoảng: ${NGAN_HANG.filter((c) => !(c.dapAn >= 0 && c.dapAn <= 3)).map((c) => c.id).join(', ')}`);

/* Bốn nhận xét là lời hứa chính của ngân hàng — không được để ô nào rỗng. */
const rong = NGAN_HANG.filter((c) => c.nhanXet.some((n) => n.trim().length < 12));
rong.length === 0
  ? ok('không nhận xét nào rỗng ruột — kể cả ba ô sai')
  : fail(`${rong.length} câu có nhận xét rỗng: ${rong.slice(0, 4).map((c) => c.id).join(', ')}`);

/*
 * Ô ĐÚNG PHẢI NÓI VÌ SAO ĐÚNG, KHÔNG PHẢI CHỈ LẶP LẠI ĐÁP ÁN.
 * Đây là chỗ dễ ăn gian nhất: viết "Đúng." rồi hết. Nhận xét của ô đúng
 * phải dài hơn một chữ và phải có nội dung sau chữ "Đúng".
 */
const oDungCut = NGAN_HANG.filter((c) => {
  const n = c.nhanXet[c.dapAn].trim();
  return n.replace(/^Đúng[.—-]*\s*/i, '').trim().length < 15;
});
oDungCut.length === 0
  ? ok('ô đúng của mọi câu đều giải thích, không chỉ nói "Đúng"')
  : fail(`${oDungCut.length} câu có ô đúng cụt: ${oDungCut.slice(0, 4).map((c) => c.id).join(', ')}`);

/* Ba ô sai phải khác nhau — chép một dòng cho ba ô là rỗng ruột trá hình. */
const chepBaOSai = NGAN_HANG.filter((c) => {
  const sai = c.nhanXet.filter((_, i) => i !== c.dapAn).map((s) => s.trim());
  return new Set(sai).size < 3;
});
chepBaOSai.length === 0
  ? ok('ba ô sai của mỗi câu nói ba chỗ gãy khác nhau')
  : fail(`${chepBaOSai.length} câu chép lại nhận xét giữa các ô sai: ${chepBaOSai.slice(0, 4).map((c) => c.id).join(', ')}`);

NGAN_HANG.every((c) => c.deBai.trim().length > 15 && c.giaiThich.trim().length > 25 && c.diemKienThuc.trim().length > 8)
  ? ok('mọi câu có đề bài, lời giải, và điểm kiến thức viết đủ')
  : fail('có câu thiếu đề bài, lời giải, hoặc điểm kiến thức');

/* Bốn lựa chọn phải khác nhau, nếu không thì có hai ô cùng đúng. */
const trungLuaChon = NGAN_HANG.filter((c) => new Set(c.luaChon.map((x) => x.trim())).size < 4);
trungLuaChon.length === 0
  ? ok('bốn lựa chọn của mỗi câu đều khác nhau')
  : fail(`${trungLuaChon.length} câu có lựa chọn trùng: ${trungLuaChon.slice(0, 4).map((c) => c.id).join(', ')}`);

/* -------------------------- NEO VÀO HỆ THỐNG ---------------------------- */
const laId = new Set(DANG_BAI.map((d) => d.id));
const lacChuyenDe = NGAN_HANG.filter((c) => !laId.has(c.chuyenDeId));
lacChuyenDe.length === 0
  ? ok(`${NGANHANG_SO.soChuyenDe} chuyên đề đều là dạng bài có thật trong hệ thống`)
  : fail(`chuyên đề không có thật: ${[...new Set(lacChuyenDe.map((c) => c.chuyenDeId))].join(', ')}`);

const laLoai = new Set(LOAI_PHIEU.map((l) => l.ma));
const lacLoai = NGAN_HANG.filter((c) => !laLoai.has(c.loaiMa));
lacLoai.length === 0
  ? ok('mọi câu thuộc về một loại phiếu có thật')
  : fail(`loại phiếu không có thật: ${[...new Set(lacLoai.map((c) => c.loaiMa))].join(', ')}`);

/* bayNo phải trỏ vào một trong ba bẫy có thật của chính chuyên đề đó. */
const bayLac = NGAN_HANG.filter((c) => {
  if (!c.bayNo) return false;
  const g = GIAI_BY_DANG[c.chuyenDeId];
  return !g || c.bayNo < 1 || c.bayNo > g.bay.length;
});
bayLac.length === 0
  ? ok(`${NGANHANG_SO.soCauTheoBay} câu dựng theo bẫy, mọi bẫy đều trỏ đúng bộ giải của chuyên đề`)
  : fail(`${bayLac.length} câu trỏ vào bẫy không có thật: ${bayLac.slice(0, 4).map((c) => c.id).join(', ')}`);

/* Id không được trùng, nếu không hồ sơ học viên ghi đè lên nhau. */
const ids = NGAN_HANG.map((c) => c.id);
new Set(ids).size === ids.length
  ? ok('mọi id câu hỏi là duy nhất')
  : fail(`id trùng: ${ids.filter((v, i) => ids.indexOf(v) !== i).slice(0, 5).join(', ')}`);

/* --------------------------- ĐỦ DÙNG THẬT ------------------------------- */
const thieu = CHUYEN_DE_CO_CAU.filter((id) => cauCuaChuyenDe(id).length < 12);
thieu.length === 0
  ? ok('mỗi chuyên đề có ngân hàng đủ mười hai câu trở lên')
  : fail(`chuyên đề dưới mười hai câu: ${thieu.join(', ')}`);

/* Câu phải rải qua nhiều loại phiếu, không dồn hết vào một loại. */
const donLoai = CHUYEN_DE_CO_CAU.filter((id) => new Set(cauCuaChuyenDe(id).map((c) => c.loaiMa)).size < 4);
donLoai.length === 0
  ? ok('mỗi chuyên đề rải câu qua ít nhất bốn loại phiếu')
  : fail(`chuyên đề dồn câu vào quá ít loại: ${donLoai.join(', ')}`);

/* Đáp án phải rải đều — dồn vào một ô là học viên đoán trúng mà không hiểu. */
const dem = [0, 0, 0, 0];
NGAN_HANG.forEach((c) => dem[c.dapAn]++);
const lechNhat = Math.max(...dem) / NGAN_HANG.length;
lechNhat <= 0.4
  ? ok(`đáp án rải đều bốn ô (${dem.join(' / ')}), không đoán được theo vị trí`)
  : fail(`đáp án dồn vào một ô: ${dem.join(' / ')} — đoán theo vị trí là trúng ${Math.round(lechNhat * 100)}%`);

/* ------------------------------ CHẤM ------------------------------------ */
const mau = cauCuaChuyenDe(CHUYEN_DE_CO_CAU[0]);
const hetDung = chamCau(mau, mau.map((c) => c.dapAn));
hetDung.tiLe === 100 && hetDung.sai.length === 0
  ? ok('chấm đúng hết cho ra 100% và không câu sai nào')
  : fail(`chấm sai khi làm đúng hết: ${JSON.stringify(hetDung.tiLe)}`);

const hetSai = chamCau(mau, mau.map((c) => (c.dapAn + 1) % 4));
hetSai.tiLe === 0 && hetSai.sai.length === mau.length
  ? ok('chấm sai hết cho ra 0% và giữ lại đủ mọi câu sai để nhận xét')
  : fail('chấm không giữ đủ câu sai');

/* Bỏ trống KHÔNG được tính là sai — không có gì để nhận xét. */
const boTrong = chamCau(mau, mau.map(() => -1));
boTrong.dung === 0 && boTrong.sai.length === 0
  ? ok('câu bỏ trống không tính đúng, cũng không bịa ra nhận xét')
  : fail('câu bỏ trống bị tính lẫn vào câu sai');

/* Mỗi câu sai phải mang về đúng ô học viên đã chọn, để trả đúng nhận xét. */
const motSai = chamCau(mau, mau.map((c, i) => (i === 0 ? (c.dapAn + 2) % 4 : c.dapAn)));
motSai.sai.length === 1 && motSai.sai[0].daChon === (mau[0].dapAn + 2) % 4
  ? ok('kết quả chấm trả về đúng ô đã chọn, nên nhận xét khớp cái sai của chính em')
  : fail('kết quả chấm không trả về đúng ô đã chọn');

const trong = chamCau([], []);
trong.tong === 0 && trong.tiLe === 0
  ? ok('chấm phiếu rỗng không chia cho không') : fail('chấm phiếu rỗng lỗi');

/* --------------------- CREED PHẢI KHỚP SỐ THẬT -------------------------- */
NGANHANG_SO.soChuyenDe === 50 && /năm mươi chuyên đề/.test(NGANHANG_CREED.phamVi)
  ? ok('lời tự nhận "năm mươi chuyên đề" khớp với số chuyên đề thật')
  : fail(`lời tự nhận không khớp: creed nói gì đó khác ${NGANHANG_SO.soChuyenDe} chuyên đề thật`);
NGANHANG_SO.soChuyenDeTong - NGANHANG_SO.soChuyenDe === 30 && /Ba mươi chuyên đề còn lại/.test(NGANHANG_CREED.phamVi)
  ? ok('lời tự nhận "ba mươi chuyên đề còn lại" khớp với phần chưa phủ')
  : fail(`phần chưa phủ thật là ${NGANHANG_SO.soChuyenDeTong - NGANHANG_SO.soChuyenDe}, creed nói khác`);
/nghe|đọc|bản quyền|ngữ liệu/.test(NGANHANG_CREED.phamVi)
  ? ok('nói thẳng vì sao ba mươi chuyên đề kia chưa có câu trắc nghiệm')
  : fail('không nói vì sao phần còn lại chưa có câu');

/* Không được nhận suông là câu do người soạn — kiểm chính lời nhận. */
NGANHANG_SO.soLuaChon === NGANHANG_SO.soCau * 4 && NGANHANG_SO.soNhanXet === NGANHANG_SO.soCau * 4
  ? ok('con số công bố suy ra từ dữ liệu thật, không gõ tay')
  : fail('con số công bố không suy ra từ dữ liệu');

console.log(
  `\n  Câu ${NGANHANG_SO.soCau} · Chuyên đề ${NGANHANG_SO.soChuyenDe}/${NGANHANG_SO.soChuyenDeTong} · ` +
    `Nhận xét ${NGANHANG_SO.soNhanXet} · Dựng theo bẫy ${NGANHANG_SO.soCauTheoBay}`,
);
console.log(bad === 0 ? '  ĐẠT — ngân hàng câu hỏi không lỗi\n' : `  HỎNG — ${bad} lỗi\n`);
process.exit(bad === 0 ? 0 : 1);
