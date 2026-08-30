/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kiểm tầng IELTS 9.0. Chạy: npx tsx tools/kiem-ielts9.ts
 *
 * PHẦN ĐÁNG KIỂM NHẤT Ở ĐÂY LÀ SỐ HỌC
 *   Cả tầng dựng trên một khẳng định: không cần 9.0 cả bốn kỹ năng để có
 *   9.0 tổng. Khẳng định đó hoặc đúng hoặc sai, và luật làm tròn quyết
 *   định. Nên bài kiểm này không "xem có hợp lý không" — nó CHẠY luật làm
 *   tròn trên mọi tổ hợp và đối chiếu với từng câu chữ đã viết ra.
 */
import {
  diemTong, toHopDat, SO_HOC_9, NGHE_DOC_9, TIEU_CHI_9, tieuChiCua,
  DUONG_SAI, IELTS9_SO, IELTS9_CREED,
} from '../data/ielts9';

let loi = 0;
const dat = (m: string) => console.log(`  ✓ ${m}`);
const hong = (m: string) => {
  loi++;
  console.log(`  ✗ ${m}`);
};

console.log('\n  KIỂM TẦNG IELTS 9.0\n');

/* ------------------------- 1. LUẬT LÀM TRÒN ---------------------------- */
{
  const casi: [number[], number][] = [
    [[9, 9, 9, 9], 9],
    [[9, 9, 9, 8], 9],      // trung bình 8.75 → làm tròn lên 9.0
    [[9, 9, 8.5, 8.5], 9],  // trung bình 8.75
    [[9, 9, 9, 7.5], 8.5],  // trung bình 8.625 → 8.5, KHÔNG lên 9
    [[9, 8.5, 8.5, 8.5], 8.5],
    [[6, 6, 6, 6], 6],
    [[7, 7, 7, 6.5], 7],    // trung bình 6.875 → 7.0
  ];
  let sai = 0;
  for (const [v, mong] of casi) {
    const ra = diemTong(v);
    if (ra !== mong) {
      hong(`làm tròn sai: ${v.join('/')} ra ${ra}, phải ra ${mong}`);
      sai++;
    }
  }
  sai || dat(`luật làm tròn chạy đúng trên ${casi.length} trường hợp mốc, kể cả .75 làm tròn lên`);

  try {
    diemTong([9, 9, 9]);
    hong('diemTong nhận ba kỹ năng mà không báo lỗi');
  } catch {
    dat('diemTong từ chối đầu vào không đủ bốn kỹ năng');
  }
}

/* ------------- 2. MỌI TỔ HỢP SINH RA PHẢI THẬT SỰ ĐẠT 9.0 -------------- */
{
  const th = toHopDat(9, 7);
  const saiTong = th.filter((t) => diemTong(t) !== 9);
  saiTong.length
    ? hong(`${saiTong.length} tổ hợp trong danh sách KHÔNG thật sự đạt 9.0`)
    : dat(`cả ${th.length} tổ hợp đều đạt đúng 9.0 khi chạy lại luật làm tròn`);

  // Khẳng định trong tài liệu: sàn thật của kỹ năng yếu nhất là 8.0.
  const thapNhat = Math.min(...th.map((t) => Math.min(...t)));
  thapNhat === 8
    ? dat('sàn thật của kỹ năng yếu nhất đúng bằng 8.0 — khớp lời khai trong tầng')
    : hong(`sàn thật là ${thapNhat}, không phải 8.0 như tài liệu nói`);

  // Không được bỏ sót tổ hợp nào: quét toàn bộ không gian từ 0 lên.
  const dayDu = toHopDat(9, 0);
  dayDu.length === th.length
    ? dat('quét từ sàn 0 không tìm thêm tổ hợp nào — danh sách đã đầy đủ')
    : hong(`quét từ sàn 0 ra ${dayDu.length} tổ hợp, nhiều hơn ${th.length} tổ hợp đã liệt kê`);

  const tongMin = Math.min(...th.map((t) => t.reduce((s, x) => s + x, 0)));
  tongMin === SO_HOC_9.nguongTong
    ? dat(`tổng tối thiểu tính ra đúng ${tongMin}, khớp ngưỡng đã khai`)
    : hong(`tổng tối thiểu tính ra ${tongMin} nhưng tài liệu khai ${SO_HOC_9.nguongTong}`);

  IELTS9_SO.soToHopDat9 === th.length
    ? dat(`con số ${IELTS9_SO.soToHopDat9} tổ hợp trong bảng số khớp kết quả tính`)
    : hong('bảng số khai sai số tổ hợp');

  SO_HOC_9.nguongTrungBinh * 4 === SO_HOC_9.nguongTong
    ? dat(`trung bình ${SO_HOC_9.nguongTrungBinh} × 4 = ${SO_HOC_9.nguongTong}, hai con số nhất quán`)
    : hong('ngưỡng trung bình và ngưỡng tổng mâu thuẫn nhau');
}

/* --------------------- 3. NGHE VÀ ĐỌC — BIÊN LỖI ----------------------- */
{
  IELTS9_SO.bienLoi === 40 - IELTS9_SO.soCauDungNghe
    ? dat(`biên lỗi ${IELTS9_SO.bienLoi} câu suy ra đúng từ ${IELTS9_SO.soCauDungNghe}/40`)
    : hong('biên lỗi không khớp số câu đúng cần đạt');

  NGHE_DOC_9.khongCongBoDayDu.includes('KHÔNG công bố')
    ? dat('có nói rõ IELTS không công bố bảng quy đổi đầy đủ')
    : hong('thiếu cảnh báo về giới hạn của bảng quy đổi — đây là chỗ dễ khai khống nhất');

  NGHE_DOC_9.doiChienThuat.length >= 4
    ? dat(`${NGHE_DOC_9.doiChienThuat.length} thay đổi chiến thuật so với mức 8.0`)
    : hong('quá ít thay đổi chiến thuật để gọi là một tầng riêng');
}

/* ------------- 4. TIÊU CHÍ PHẢI PHÂN BIỆT ĐƯỢC 8 VỚI 9 ----------------- */
{
  let mong = 0;
  for (const t of TIEU_CHI_9) {
    if (t.band8.trim() === t.band9.trim()) hong(`tiêu chí "${t.ten}" mô tả band 8 và band 9 giống hệt nhau`), mong++;
    for (const [ten, v] of [['band 8', t.band8], ['band 9', t.band9], ['đổi gì', t.doiGi], ['tự kiểm', t.tuKiem]] as const)
      if (v.trim().length < 40) hong(`tiêu chí "${t.ten}" có ${ten} quá ngắn (${v.trim().length} ký tự)`), mong++;
  }
  mong || dat(`cả ${TIEU_CHI_9.length} tiêu chí phân biệt rõ band 8 với band 9 và có cách tự kiểm`);

  tieuChiCua('viet').length === 4 && tieuChiCua('noi').length === 2
    ? dat('đủ 4 tiêu chí Viết; Nói có 2 tiêu chí đặc thù nhất của đoạn 8→9')
    : hong(`số tiêu chí lệch: viết ${tieuChiCua('viet').length}, nói ${tieuChiCua('noi').length}`);
}

/* --------------- 5. ĐƯỜNG SAI PHẢI KÈM THỨ THAY THẾ -------------------- */
{
  let thieu = 0;
  for (const d of DUONG_SAI) {
    if (d.thayBang.trim().length < 30) hong(`đường sai "${d.sai}" không nói rõ thay bằng gì`), thieu++;
    if (d.viSao.trim().length < 50) hong(`đường sai "${d.sai}" không giải thích đủ vì sao sai`), thieu++;
  }
  thieu || dat(`cả ${DUONG_SAI.length} đường sai đều kèm lý do và thứ thay thế`);

  IELTS9_CREED.khongPhaiTuKho.includes('TỤT')
    ? dat('tuyên ngôn nói thẳng nhồi từ khó làm tụt điểm chứ không tăng')
    : hong('tuyên ngôn không nói rõ hệ quả của việc nhồi từ khó');

  IELTS9_CREED.daiDuoc.includes('7.5')
    ? dat('tuyên ngôn nói thẳng phần lớn mục đích thực tế không cần tới 9.0')
    : hong('tuyên ngôn thiếu phần nói thẳng về việc ai thật sự cần 9.0');
}

console.log(
  `\n  ${loi === 0 ? `ĐẠT — tầng IELTS 9.0 nhất quán (${IELTS9_SO.soToHopDat9} tổ hợp, ${TIEU_CHI_9.length} tiêu chí, ${DUONG_SAI.length} đường sai)` : `HỎNG — ${loi} lỗi`}\n`,
);
process.exit(loi === 0 ? 0 : 1);
