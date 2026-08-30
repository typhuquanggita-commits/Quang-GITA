/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kiểm bộ chấm bài thi thử. Chạy: npx tsx tools/kiem-chamthi.ts
 *
 * BỘ CHẤM LÀ CHỖ MỘT LỖI GÂY HẠI NHIỀU NHẤT
 *   Học viên làm đúng mà bị chấm sai thì mất niềm tin vào cả bộ đề, và
 *   niềm tin mất không lấy lại được bằng một bản vá. Nên bài kiểm này soi
 *   kỹ nhất đúng một chỗ: máy có bao giờ kết luận SAI cho một câu tự luận
 *   hay không. Câu trả lời phải là không, trong mọi trường hợp.
 */
import {DE_THI_MAU} from '../data/dethi';
import {
  chamCauThi, chamDeThi, chuanHoa, cacDapAnNhan, chamMayDuoc,
  docKetQua, giayConLai, CHAMTHI_SO, CHAMTHI_CREED,
} from '../data/chamthi';
import type {CauDeThi} from '../types';

let bad = 0;
const fail = (m: string, x = '') => { bad++; console.log(`  ✗ ${m}${x ? ` — ${x}` : ''}`); };
const ok = (m: string) => console.log(`  ✓ ${m}`);

console.log('\n  KIỂM BỘ CHẤM BÀI THI THỬ\n');

const moiCau = DE_THI_MAU.flatMap((d) => d.phan.flatMap((p) => p.cau));

/* --------------------------- 1. CHUẨN HOÁ ------------------------------- */
{
  const casi: [string, string][] = [
    ['  Despite of  ->  Despite. ', 'despite of > despite'],
    ['have → has', 'have > has'],
    ['have => has', 'have > has'],
    ['"abundant"', 'abundant'],
    ['For', 'for'],
    ['7  giờ', '7 giờ'],
  ];
  let sai = 0;
  for (const [vao, mong] of casi)
    if (chuanHoa(vao) !== mong) { fail(`chuẩn hoá sai: ${JSON.stringify(vao)} → ${JSON.stringify(chuanHoa(vao))}, mong ${JSON.stringify(mong)}`); sai++; }
  sai || ok(`chuẩn hoá gộp đúng ${casi.length} kiểu khác biệt vô nghĩa: hoa thường, mũi tên, nháy, khoảng trắng`);

  const bt = cacDapAnNhan('Despite of → Despite (hoặc In spite of)');
  bt.includes('despite of > in spite of') && bt.includes('in spite of')
    ? ok('biến thể trong ngoặc được nhận, kể cả khi ghép lại thành phép sửa đầy đủ')
    : fail('không tách được biến thể trong ngoặc', JSON.stringify(bt));
}

/* --------------- 2. MÁY KHÔNG BAO GIỜ BÁO SAI CHO TỰ LUẬN --------------- */
/*
 * Đây là mục quan trọng nhất của cả bài kiểm. Quét MỌI câu tự luận trong
 * bốn đề với một câu trả lời rác, và không câu nào được ra trạng thái 'sai'.
 */
{
  const tuLuan = moiCau.filter((c) => !c.luaChon);
  const baoSai = tuLuan.filter((c) => chamCauThi(c, 'xyz hoàn toàn không liên quan') === 'sai');
  baoSai.length === 0
    ? ok(`quét ${tuLuan.length} câu tự luận với câu trả lời rác — không câu nào bị máy kết luận SAI`)
    : fail(`${baoSai.length} câu tự luận bị máy kết luận sai`, baoSai.slice(0, 3).map((c) => `câu ${c.no}`).join(', '));

  const raTuCham = tuLuan.filter((c) => chamCauThi(c, 'xyz hoàn toàn không liên quan') === 'tu-cham');
  raTuCham.length === tuLuan.length
    ? ok('mọi câu tự luận không khớp đều chuyển sang tự chấm, kèm đáp án mẫu để đối chiếu')
    : fail('có câu tự luận không khớp mà không chuyển sang tự chấm');
}

/* ------------------ 3. BỐN TRẠNG THÁI CHẠY ĐÚNG ------------------------- */
{
  const tn = moiCau.find((c) => c.luaChon)!;
  const tl = moiCau.find((c) => !c.luaChon && chamMayDuoc(c))!;
  const bl = moiCau.find((c) => !chamMayDuoc(c));

  const casi: [string, string | undefined, string][] = [
    ['trắc nghiệm chọn đúng ô', tn.dapAn, 'dung'],
    ['trắc nghiệm chọn sai ô', 'ABCD'.split('').find((x) => x !== tn.dapAn), 'sai'],
    ['trắc nghiệm bỏ trống', '', 'chua-lam'],
    ['trắc nghiệm chỉ có khoảng trắng', '   ', 'chua-lam'],
    ['tự luận viết đúng đáp án', tl.dapAn, 'dung'],
    ['tự luận viết hoa thường khác', tl.dapAn.toUpperCase(), 'dung'],
    ['tự luận bỏ trống', '', 'chua-lam'],
  ];
  let sai = 0;
  for (const [ten, traLoi, mong] of casi) {
    const c = ten.startsWith('trắc nghiệm') ? tn : tl;
    const ra = chamCauThi(c, traLoi);
    if (ra !== mong) { fail(`${ten}: ra "${ra}", mong "${mong}"`); sai++; }
  }
  sai || ok(`bốn trạng thái chạy đúng trên ${casi.length} trường hợp mốc`);

  if (bl) {
    chamCauThi(bl, 'một bài luận rất hay') === 'tu-cham'
      ? ok('câu không có đáp án duy nhất LUÔN chuyển sang tự chấm, kể cả khi viết dài')
      : fail('câu không có đáp án duy nhất bị máy tự kết luận');
  }
}

/* --------------- 4. BÀI LÀM HOÀN HẢO PHẢI CỘNG ĐÚNG THANG --------------- */
/*
 * Bất biến mạnh nhất: điền đúng đáp án mẫu cho mọi câu thì điểm đã chấm
 * cộng với điểm chờ tự chấm phải bằng ĐÚNG thang điểm của đề. Lệch một chút
 * nghĩa là có câu rơi mất điểm ở đâu đó — loại lỗi người dùng phát hiện ra
 * trước bài kiểm.
 */
for (const d of DE_THI_MAU) {
  const hoanHao: Record<number, string> = {};
  for (const p of d.phan) for (const c of p.cau) hoanHao[c.no] = c.dapAn;
  const kq = chamDeThi(d, hoanHao);
  const cong = Number((kq.diemDat + kq.diemChoTuCham).toFixed(2));
  Math.abs(cong - d.tongDiem) < 0.01
    ? ok(`${d.id}: bài làm hoàn hảo cộng đúng ${d.tongDiem} điểm (${kq.diemDat} chấm được + ${kq.diemChoTuCham} chờ tự chấm)`)
    : fail(`${d.id}: bài hoàn hảo chỉ cộng được ${cong}/${d.tongDiem} điểm`);
  kq.soSai === 0
    ? ok(`${d.id}: bài hoàn hảo không có câu nào bị tính sai`)
    : fail(`${d.id}: bài hoàn hảo vẫn có ${kq.soSai} câu bị tính sai`);
}

/* ------------------- 5. BÀI BỎ TRẮNG VÀ BÀI SAI HẾT --------------------- */
{
  const d = DE_THI_MAU[0];
  const trong = chamDeThi(d, {});
  trong.diemDat === 0 && trong.diemChoTuCham === 0
    ? ok('bài bỏ trắng hoàn toàn ra 0 điểm và không có câu nào chờ tự chấm')
    : fail('bài bỏ trắng không ra 0 điểm');
  trong.soChuaLam === d.phan.reduce((s, p) => s + p.cau.length, 0)
    ? ok('bài bỏ trắng đếm đúng toàn bộ câu là chưa làm')
    : fail('bài bỏ trắng đếm sai số câu chưa làm');

  const saiHet: Record<number, string> = {};
  for (const p of d.phan) for (const c of p.cau)
    saiHet[c.no] = c.luaChon ? ('ABCD'.split('').find((x) => x !== c.dapAn) as string) : 'sai hoàn toàn';
  const kqs = chamDeThi(d, saiHet);
  kqs.diemDat === 0
    ? ok('bài sai hết ra 0 điểm chấm được')
    : fail(`bài sai hết vẫn được ${kqs.diemDat} điểm`);
  kqs.soDung === 0
    ? ok('bài sai hết không có câu nào tính đúng')
    : fail(`bài sai hết vẫn có ${kqs.soDung} câu tính đúng`);
}

/* -------------------- 6. ĐIỂM TỪNG PHẦN CỘNG ĐÚNG ----------------------- */
for (const d of DE_THI_MAU) {
  const nua: Record<number, string> = {};
  let i = 0;
  for (const p of d.phan) for (const c of p.cau) if (i++ % 2 === 0) nua[c.no] = c.dapAn;
  const kq = chamDeThi(d, nua);
  const congPhan = Number(kq.phan.reduce((s, p) => s + p.diemDat, 0).toFixed(3));
  Math.abs(congPhan - kq.diemDat) < 0.001
    ? ok(`${d.id}: điểm các phần cộng đúng bằng tổng điểm đã chấm`)
    : fail(`${d.id}: điểm phần cộng ${congPhan} nhưng tổng ghi ${kq.diemDat}`);
  const congCau = kq.cau.length === d.phan.reduce((s, p) => s + p.cau.length, 0);
  congCau ? ok(`${d.id}: kết quả trả về đủ ${kq.cau.length} câu`) : fail(`${d.id}: thiếu câu trong kết quả`);
}

/* --------------------------- 7. ĐỒNG HỒ --------------------------------- */
{
  const d = DE_THI_MAU[0];
  const batDau = 1_000_000;
  giayConLai(d, batDau, batDau) === d.phut * 60
    ? ok(`đồng hồ bắt đầu đúng ${d.phut * 60} giây`)
    : fail('đồng hồ không bắt đầu đúng số giây của đề');
  giayConLai(d, batDau, batDau + d.phut * 60 * 1000) === 0
    ? ok('hết giờ thì đồng hồ về đúng 0, không âm')
    : fail('đồng hồ không về 0 khi hết giờ');
  giayConLai(d, batDau, batDau + d.phut * 60 * 1000 * 5) === 0
    ? ok('quá giờ rất lâu thì đồng hồ vẫn là 0, không đi âm')
    : fail('đồng hồ đi âm khi quá giờ');
}

/* ------------------------ 8. LỜI ĐỌC KẾT QUẢ ---------------------------- */
{
  const d = DE_THI_MAU[0];
  const kq = chamDeThi(d, {});
  const loi = docKetQua(kq);
  loi.length >= 2 ? ok(`lời đọc kết quả có ${loi.length} ý, không chỉ đưa một con số`) : fail('lời đọc kết quả quá mỏng');
  loi.every((x) => x.length > 40) ? ok('mọi ý trong lời đọc kết quả đều viết đủ') : fail('có ý trong lời đọc kết quả bị cụt');
  loi.some((x) => /bỏ trống/.test(x))
    ? ok('bài bỏ trắng được nhắc thẳng là bỏ trống luôn tệ hơn đoán')
    : fail('không nhắc chuyện bỏ trống');
  // Không được hứa hẹn gì về kỳ thi thật.
  loi.every((x) => !/chắc chắn (đỗ|đạt)|bảo đảm|sẽ được \d/.test(x))
    ? ok('lời đọc kết quả không hứa hẹn gì về kỳ thi thật')
    : fail('lời đọc kết quả có câu hứa hẹn');
}

/* ------------------------ 9. LỜI TỰ NHẬN ĐÚNG --------------------------- */
{
  CHAMTHI_CREED.khongBaoSaiOan.includes('không kết luận SAI')
    ? ok('lời tự nhận nói thẳng máy không kết luận sai cho câu tự luận')
    : fail('lời tự nhận thiếu điều quan trọng nhất về cách chấm tự luận');
  CHAMTHI_CREED.khongGopDiem.includes('hai con số')
    ? ok('lời tự nhận nói rõ kết quả là hai con số, không gộp thành một')
    : fail('lời tự nhận không nói rõ chuyện hai con số');
  CHAMTHI_SO.soCauChamMayDuoc + CHAMTHI_SO.soCauPhaiTuCham === moiCau.length
    ? ok(`${CHAMTHI_SO.soCauChamMayDuoc} câu máy chấm được + ${CHAMTHI_SO.soCauPhaiTuCham} câu phải tự chấm = ${moiCau.length} câu`)
    : fail('bảng số không cộng đúng tổng số câu');
}

console.log(
  `\n  ${bad === 0 ? `ĐẠT — bộ chấm không lỗi (${DE_THI_MAU.length} đề, ${moiCau.length} câu, 4 trạng thái)` : `HỎNG — ${bad} lỗi`}\n`,
);
process.exit(bad === 0 ? 0 : 1);
