/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kiểm bốn đề thi mẫu trọn vẹn.
 * Chạy: npx tsx tools/kiem-dethi.ts
 *
 * Đề thi là chỗ một lỗi nhỏ gây hại lớn nhất trong cả hệ thống: học viên
 * làm đúng mà bị chấm sai thì mất niềm tin vào cả bộ tài liệu. Bài kiểm
 * soi đúng những chỗ dễ sai khi soạn tay — đáp án trỏ vào ô không tồn tại,
 * điểm các phần cộng không ra thang 10, lời giải chép lại đề bài.
 */
import {DE_THI_MAU, DETHI_SO, DETHI_CREED, moiCauCuaDe, deTheoMa} from '../data/dethi';
import {DANG_BAI} from '../data/phieu';
import {GIAI_BY_DANG} from '../data/giaide';

let bad = 0;
const fail = (m: string, x = '') => { bad++; console.log(`  ✗ ${m}${x ? ` — ${x}` : ''}`); };
const ok = (m: string) => console.log(`  ✓ ${m}`);

console.log('\n  KIỂM ĐỀ THI MẪU\n');

const moiCau = DE_THI_MAU.flatMap((d) => d.phan.flatMap((p) => p.cau));

/* --------------------------- ĐÁP ÁN CÓ THẬT ----------------------------- */
/*
 * Với câu trắc nghiệm, đáp án ghi bằng chữ cái. Chữ cái phải nằm trong tầm
 * số lựa chọn — ghi 'E' cho câu bốn lựa chọn là lỗi chết người mà mắt người
 * soát rất dễ bỏ qua.
 */
const tracNghiem = moiCau.filter((c) => c.luaChon);
const tuLuan = moiCau.filter((c) => !c.luaChon);
const lac = tracNghiem.filter((c) => !['A', 'B', 'C', 'D'].includes(c.dapAn));
lac.length === 0
  ? ok(`${tracNghiem.length} câu trắc nghiệm, mọi đáp án đều là A/B/C/D`)
  : fail(`${lac.length} câu có đáp án ngoài bốn ô`, lac.map((c) => `câu ${c.no}: ${c.dapAn}`).join(', '));

tracNghiem.every((c) => c.luaChon!.length === 4)
  ? ok('mọi câu trắc nghiệm có đúng bốn lựa chọn')
  : fail('có câu không đủ bốn lựa chọn');
tracNghiem.every((c) => new Set(c.luaChon!.map((x) => x.trim())).size === 4)
  ? ok('bốn lựa chọn của mỗi câu đều khác nhau')
  : fail('có câu trùng lựa chọn');

/* Câu tự luận phải có đáp án viết ra, không bỏ trống. */
tuLuan.every((c) => c.dapAn.trim().length > 1)
  ? ok(`${tuLuan.length} câu tự luận, mọi câu có đáp án viết ra`)
  : fail('có câu tự luận bỏ trống đáp án');

/* Đáp án rải đều — dồn vào một ô là thí sinh đoán trúng mà không hiểu. */
const dem: Record<string, number> = {A: 0, B: 0, C: 0, D: 0};
for (const c of tracNghiem) if (dem[c.dapAn] !== undefined) dem[c.dapAn]++;
const lechNhat = Math.max(...Object.values(dem)) / tracNghiem.length;
lechNhat <= 0.4
  ? ok(`đáp án rải đều (A${dem.A} B${dem.B} C${dem.C} D${dem.D}), đoán theo vị trí không ăn`)
  : fail(`đáp án dồn vào một ô: A${dem.A} B${dem.B} C${dem.C} D${dem.D}`,
         `đoán theo vị trí trúng ${Math.round(lechNhat * 100)}%`);

/* ------------------------------ LỜI GIẢI -------------------------------- */
moiCau.every((c) => c.loiGiai.trim().length > 40)
  ? ok(`cả ${moiCau.length} câu có lời giải viết đủ`)
  : fail('có câu lời giải quá cụt', moiCau.filter((c) => c.loiGiai.length <= 40).map((c) => c.no).join(', '));
DETHI_SO.soLoiGiai === moiCau.length
  ? ok('số lời giải công bố khớp số câu')
  : fail(`công bố ${DETHI_SO.soLoiGiai} lời giải cho ${moiCau.length} câu`);

/* Lời giải phải DẠY, không chỉ nhắc lại đáp án. */
const chepLai = moiCau.filter((c) => c.loiGiai.trim() === c.dapAn.trim());
chepLai.length === 0 ? ok('không lời giải nào chỉ chép lại đáp án') : fail(`${chepLai.length} lời giải chép lại đáp án`);

/* Lời giải phải khác nhau — chép một lời giải cho nhiều câu là rỗng ruột. */
new Set(moiCau.map((c) => c.loiGiai)).size === moiCau.length
  ? ok('mọi lời giải khác nhau, không chép chung')
  : fail('có lời giải bị chép lại cho nhiều câu');

/* --------------------------------- ĐIỂM --------------------------------- */
for (const d of DE_THI_MAU) {
  const tongPhan = Number(d.phan.reduce((s, p) => s + p.diem, 0).toFixed(2));
  const tongCau = Number(
    d.phan.reduce((s, p) => s + p.cau.reduce((t, c) => t + c.diem, 0), 0).toFixed(2),
  );
  tongPhan === tongCau
    ? ok(`${d.id}: điểm các phần khớp tổng điểm các câu (${tongCau})`)
    : fail(`${d.id}: điểm phần ${tongPhan} lệch điểm câu ${tongCau}`);
  d.soCau === d.phan.reduce((s, p) => s + p.cau.length, 0)
    ? ok(`${d.id}: số câu công bố khớp số câu thật (${d.soCau})`)
    : fail(`${d.id}: công bố ${d.soCau} câu`, `đếm được ${d.phan.reduce((s, p) => s + p.cau.length, 0)}`);
  d.phut === d.phan.reduce((s, p) => s + p.phut, 0) || d.phan.length === 1
    ? ok(`${d.id}: thời gian các phần cộng đúng ${d.phut} phút`)
    : fail(`${d.id}: các phần cộng ${d.phan.reduce((s, p) => s + p.phut, 0)} phút, đề ghi ${d.phut}`);
  moiCau.filter((c) => d.phan.some((p) => p.cau.includes(c))).every((c) => c.diem > 0)
    ? ok(`${d.id}: không câu nào 0 điểm`)
    : fail(`${d.id}: có câu 0 điểm`);
}

/* Số thứ tự câu trong một đề phải liên tục, không nhảy cóc. */
for (const d of DE_THI_MAU) {
  const nos = moiCauCuaDe(d.id).map((c) => c.no);
  nos.every((n, i) => n === i + 1)
    ? ok(`${d.id}: số thứ tự câu liên tục 1..${nos.length}`)
    : fail(`${d.id}: số thứ tự câu nhảy cóc`, nos.join(','));
}

/* -------------------------------- BAREM --------------------------------- */
DE_THI_MAU.every((d) => d.phan.every((p) => p.barem.length > 50))
  ? ok(`${DETHI_SO.soPhan} phần, mỗi phần có barem viết đủ`)
  : fail('có phần thiếu barem');
/*
 * Phần viết là chỗ chấm dễ tuỳ tiện nhất, nên barem của nó phải nêu tiêu
 * chí VÀ chỗ trừ điểm. Barem chỉ nói "cho điểm theo nội dung" là barem giả.
 */
const phanViet = DE_THI_MAU.flatMap((d) => d.phan).filter((p) => /VIẾT|BIẾN ĐỔI/.test(p.ten));
phanViet.length > 0
  ? ok(`${phanViet.length} phần viết có barem riêng`)
  : fail('không có phần viết nào');
phanViet.every((p) => /TRỪ ĐIỂM/.test(p.barem))
  ? ok('mọi barem phần viết nói rõ TRỪ ĐIỂM ở đâu')
  : fail('có barem phần viết không nói chỗ trừ điểm');
phanViet.every((p) => (p.barem.match(/·/g) ?? []).length >= 2)
  ? ok('barem phần viết chia theo tiêu chí, không chấm bằng cảm tính')
  : fail('barem phần viết không chia tiêu chí');

/* --------------------------- NEO VÀO HỆ THỐNG --------------------------- */
const coDang = moiCau.filter((c) => c.dangId);
const dangLac = coDang.filter((c) => !DANG_BAI.some((d) => d.id === c.dangId));
dangLac.length === 0
  ? ok(`${coDang.length}/${moiCau.length} câu neo về một dạng bài có thật`)
  : fail('có câu neo vào dạng bài không tồn tại', [...new Set(dangLac.map((c) => c.dangId))].join(', '));
coDang.length === moiCau.length
  ? ok('mọi câu đều tra được về bộ giải đề của dạng mình thuộc')
  : fail(`${moiCau.length - coDang.length} câu chưa neo dạng bài`,
         'học viên sai câu đó thì không biết đọc bộ giải nào');
coDang.every((c) => GIAI_BY_DANG[c.dangId!])
  ? ok('mọi dạng bài được neo đều có bộ giải đề')
  : fail('có dạng bài được neo mà không có bộ giải');

/* Bốn đề phải phủ nhiều kỹ năng, không dồn hết vào ngữ pháp. */
const kyNang = new Set(coDang.map((c) => DANG_BAI.find((d) => d.id === c.dangId)!.skill));
kyNang.size >= 5
  ? ok(`bốn đề phủ ${kyNang.size} kỹ năng: ${[...kyNang].join(', ')}`)
  : fail(`chỉ phủ ${kyNang.size} kỹ năng`, 'đề mẫu lệch, không đại diện cho đề thật');

/* ----------------------- HƯỚNG DẪN LÀM BÀI ------------------------------ */
DE_THI_MAU.every((d) => d.thuTuLam.length > 80 && d.chiaThoiGian.length >= 3)
  ? ok('mọi đề có thứ tự làm bài khuyến nghị và cách chia giờ cụ thể')
  : fail('có đề thiếu hướng dẫn phân bổ thời gian');
DE_THI_MAU.every((d) => d.canhBao.length > 60)
  ? ok('mọi đề có cảnh báo riêng cho kỳ thi đó')
  : fail('có đề thiếu cảnh báo');
/*
 * Ngữ liệu đọc phải đủ dài để câu hỏi có chỗ tựa. Bài đọc trăm chữ mà hỏi
 * năm câu suy luận là đề giả.
 */
const coNguLieu = DE_THI_MAU.flatMap((d) => d.phan).filter((p) => p.nguLieu);
coNguLieu.every((p) => p.nguLieu!.split(/\s+/).length >= 120)
  ? ok(`${coNguLieu.length} bài đọc, bài nào cũng đủ dài để câu hỏi có chỗ tựa`)
  : fail('có bài đọc quá ngắn so với số câu hỏi');

/* ---------------------------- LỜI TỰ NHẬN ------------------------------- */
/KHÔNG phải để đoán đề/.test(DETHI_CREED.khongDoanDe)
  ? ok('nói thẳng: đề mẫu KHÔNG phải để đoán đề')
  : fail('không nói rõ giới hạn của đề mẫu');
/thay đổi theo năm|đối chiếu lại/.test(DETHI_CREED.khongDoanDe)
  ? ok('nhắc phải đối chiếu lại cấu trúc trước mỗi mùa thi')
  : fail('không nhắc đối chiếu cấu trúc');
DE_THI_MAU.every((d) => /PHẢI đối chiếu|đối chiếu lại/.test(d.theoCauTruc))
  ? ok('mỗi đề tự ghi rõ nó dựng theo cấu trúc nào và phải đối chiếu lại')
  : fail('có đề không ghi nguồn cấu trúc');
DE_THI_MAU.every((d) => /rút gọn|Đề mẫu này/i.test(d.theoCauTruc))
  ? ok('mỗi đề nói rõ nó là bản rút gọn, không giấu số câu thật')
  : fail('có đề không nói rõ mình là bản rút gọn');

DETHI_SO.soCau === moiCau.length && DETHI_SO.soDe === DE_THI_MAU.length
  ? ok('mọi con số công bố suy ra từ dữ liệu')
  : fail('con số công bố lệch');
deTheoMa('khong-co-that') === undefined
  ? ok('tra mã đề không có thật thì trả về rỗng, không sập')
  : fail('tra mã sai không trả về rỗng');

console.log(
  `\n  Đề ${DETHI_SO.soDe} · Câu ${DETHI_SO.soCau} · Phần ${DETHI_SO.soPhan} · ` +
    `Lời giải ${DETHI_SO.soLoiGiai} · Ngữ liệu ${DETHI_SO.soNguLieu} · ${DETHI_SO.tongPhut} phút`,
);
console.log(bad === 0 ? '  ĐẠT — đề thi mẫu không lỗi\n' : `  HỎNG — ${bad} lỗi\n`);
process.exit(bad === 0 ? 0 : 1);
