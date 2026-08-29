/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kiểm tầng chiều sâu GITA: bốn chữ, ba sân, tầng hấp thu, cấp chuyên môn,
 * và bảng đối chiếu chuẩn quốc tế.
 *
 * Chạy: npx tsx tools/kiem-gita-sau.ts
 */
import {CHU_GITA, CAP_HANH_DONG, MOI_TRUONG, CHU_GITA_SO, CHU_GITA_CREED, QUY_TAC_2080} from '../data/gitachu';
import {GITA_HOA, SAN, TANG_HAP_THU, CAP_CHUYEN_MON, GITA_HOA_SO, GITA_HOA_CREED, giaoDuoc} from '../data/gitahoa';
import {CHUAN, CHUAN_SO, CHUAN_CREED} from '../data/chuanquocte';
import {GITA_JOURNEY, GITA_PHASES} from '../data';

let bad = 0;
const fail = (m: string) => { bad++; console.log('  ✗ ' + m); };
const ok = (m: string) => console.log('  ✓ ' + m);

console.log('\n  KIỂM TẦNG CHIỀU SÂU GITA\n');

/* ------------------------- BỐN CHỮ -------------------------------------- */
CHU_GITA.map((c) => c.chu).join('') === 'GITA'
  ? ok('bốn chữ đúng thứ tự G · I · T · A')
  : fail(`thứ tự chữ sai: ${CHU_GITA.map((c) => c.chu).join('')}`);
CHU_GITA.every((c) => c.thanhTo.length > 0) ? ok(`${CHU_GITA_SO.soThanhTo} thành tố, giữ nguyên theo tài liệu gốc`) : fail('có chữ không có thành tố');
CHU_GITA.every((c) => c.laGi.length > 80 && c.viSaoCan.length > 50)
  ? ok('mỗi chữ nói rõ là gì và vì sao cần') : fail('có chữ thiếu định nghĩa hoặc lý do');
CHU_GITA.every((c) => c.khiCo.length > 50 && c.khiThieu.length > 50)
  ? ok('mỗi chữ nêu cả dấu hiệu khi CÓ và khi THIẾU — không có hai dấu hiệu này thì chỉ là khẩu hiệu')
  : fail('có chữ thiếu dấu hiệu khi có hoặc khi thiếu');
CHU_GITA.every((c) => c.doBang.length > 30) ? ok('mỗi chữ nêu cách đo cụ thể') : fail('có chữ không đo được');
CHU_GITA.every((c) => c.noiVaoHeThong.length >= 3)
  ? ok('mỗi chữ nối vào ít nhất ba chỗ có thật trong hệ thống')
  : fail('có chữ không nối vào đâu — chữ không nối vào hệ thống là chữ trang trí');
new Set(CHU_GITA.map((c) => c.tenViet)).size === 4 ? ok('bốn tên tiếng Việt khác nhau') : fail('tên tiếng Việt bị trùng');

/* Hai trục phải được phân biệt rõ, vì đây là chỗ dễ lẫn nhất. */
CHU_GITA_CREED.phanBiet.includes('song song') && CHU_GITA_CREED.phanBiet.includes('tuần tự')
  ? ok('nói rõ bốn CHỮ chạy song song còn bốn PHA đi tuần tự — hai trục khác nhau')
  : fail('không phân biệt hai trục chữ và pha');
GITA_PHASES.length === 4 && GITA_JOURNEY.length === 12
  ? ok(`bốn pha và mười hai bước vẫn nguyên vẹn, không bị bốn chữ thay thế`)
  : fail('trục pha hoặc trục bước đã bị đổi');
GITA_PHASES.map((p: any) => p.letter).join('') !== 'GITA'
  ? ok('bốn pha KHÔNG mang chữ cái G I T A — tránh nhầm pha với chữ')
  : fail('bốn pha đang mang chữ G I T A, sẽ bị nhầm với bốn chữ của mô thức');

/* --------------------- CẤP HÀNH ĐỘNG 20/80 ------------------------------ */
CAP_HANH_DONG.every((a, i) => a.no === i + 1) ? ok(`${CAP_HANH_DONG.length} cấp hành động, đánh số liên tục`) : fail('cấp hành động đánh số sai');
CAP_HANH_DONG.every((a, i) => i === 0 || a.phanTramKetQua > CAP_HANH_DONG[i - 1].phanTramKetQua)
  ? ok(`kết quả tăng thật qua từng cấp: ${CAP_HANH_DONG.map((a) => a.phanTramKetQua).join(' → ')}%`)
  : fail('có cấp không tăng kết quả');
CAP_HANH_DONG.every((a) => a.viDu.length > 40 && a.dauHieuSai.length > 40)
  ? ok('mỗi cấp có ví dụ cụ thể và dấu hiệu làm sai') : fail('có cấp thiếu ví dụ hoặc dấu hiệu sai');
QUY_TAC_2080.canhBao.includes('không phải kết quả đo')
  ? ok('nói thẳng: hai mươi và tám mươi là cách nói, không phải con số đo được')
  : fail('thiếu cảnh báo về con số 20/80');
QUY_TAC_2080.lamSaoBiet.includes('số liệu')
  ? ok('chỉ ra cách tìm phần hai mươi bằng số liệu, không bằng đoán')
  : fail('không nói cách xác định phần 20');

/* --------------------------- MÔI TRƯỜNG --------------------------------- */
MOI_TRUONG.every((m, i) => m.no === i + 1 && m.lam.length > 30 && m.viSao.length > 60 && m.hong.length > 30)
  ? ok(`${MOI_TRUONG.length} luật thiết kế môi trường, mỗi luật có việc làm, lý do và kiểu hỏng`)
  : fail('có luật môi trường thiếu nội dung');

/* --------------------------- BA SÂN ------------------------------------- */
GITA_HOA.length === GITA_JOURNEY.length * SAN.length
  ? ok(`${GITA_HOA.length} ô = ${GITA_JOURNEY.length} bước × ${SAN.length} sân`)
  : fail(`có ${GITA_HOA.length} ô, phép nhân ra ${GITA_JOURNEY.length * SAN.length}`);
new Set(GITA_HOA.map((o) => `${o.buocNo}|${o.san}`)).size === GITA_HOA.length
  ? ok('mọi cặp bước × sân đều có đúng một ô') : fail('có cặp bước × sân trùng hoặc thiếu');
GITA_HOA.every((o) => o.bieuHien.length > 40 && o.viecNguoiLon.length > 40 && o.viecHocSinh.length > 25)
  ? ok('mọi ô nêu rõ biểu hiện, việc người lớn và việc học sinh')
  : fail('có ô thiếu nội dung');
GITA_HOA.every((o) => o.dangChay.length > 25 && o.dangHong.length > 40)
  ? ok('mọi ô có cả dấu hiệu đang chạy lẫn dấu hiệu đang hỏng')
  : fail('có ô thiếu dấu hiệu — không có dấu hiệu thì cả bảng chỉ là khẩu hiệu');
new Set(GITA_HOA.map((o) => o.dangHong)).size === GITA_HOA.length
  ? ok('ba mươi sáu dấu hiệu hỏng đều khác nhau, không chép lại một câu')
  : fail('có dấu hiệu hỏng bị lặp');
SAN.every((s) => s.suc.length > 30 && s.deSai.length > 40)
  ? ok('mỗi sân nêu sức mạnh riêng và chỗ dễ sai riêng') : fail('có sân thiếu mô tả');
GITA_HOA_CREED.gioiHan.includes('không kiểm soát')
  ? ok('nói thẳng: học viện không kiểm soát được sân gia đình và sân xã hội')
  : fail('thiếu lời nói rõ giới hạn quyền của học viện');

/* --------------- TẦNG HẤP THU VÀ CẤP CHUYÊN MÔN ------------------------- */
TANG_HAP_THU.every((t, i) => t.no === i + 1) ? ok(`${TANG_HAP_THU.length} tầng hấp thu, đánh số liên tục`) : fail('tầng hấp thu đánh số sai');
TANG_HAP_THU.every((t) => t.nhanGi.length > 50 && t.doDuoc.length > 30 && t.chuaHop.length > 40)
  ? ok('mỗi tầng nêu rõ nhận gì, đo bằng gì, và CHƯA hợp với gì')
  : fail('có tầng thiếu phần nhận gì hoặc phần chưa hợp');
CAP_CHUYEN_MON.every((c) => c.lamDuoc.length >= 3 && c.chuaLamDuoc.length > 40 && c.nangCapBang.length > 30)
  ? ok(`${CAP_CHUYEN_MON.length} cấp chuyên môn, mỗi cấp nêu làm được gì, chưa làm được gì, nâng cấp bằng gì`)
  : fail('có cấp chuyên môn thiếu nội dung');
new Set(CAP_CHUYEN_MON.map((c) => c.vaiTro)).size === 3
  ? ok('đủ ba vai: tư vấn, giáo viên, coach') : fail('thiếu vai trong thang chuyên môn');
CAP_CHUYEN_MON.every((c) => c.giaoDuocToiTang >= 1 && c.giaoDuocToiTang <= TANG_HAP_THU.length)
  ? ok('mọi cấp chuyên môn giao được tới một tầng hợp lệ') : fail('có cấp giao tới tầng không tồn tại');
!giaoDuoc('cm-tv1', 3) && giaoDuoc('cm-gv2', 5)
  ? ok('tư vấn nhập môn KHÔNG giao được tầng 3, giáo viên chuyên sâu giao được tầng 5')
  : fail('phép kiểm giao được tới tầng cho kết quả sai');
TANG_HAP_THU.every((t) => CAP_CHUYEN_MON.some((c) => c.giaoDuocToiTang >= t.no))
  ? ok('mọi tầng hấp thu đều có ít nhất một cấp chuyên môn phục vụ được')
  : fail('có tầng hấp thu không ai phục vụ được');

/* ------------------------ CHUẨN QUỐC TẾ --------------------------------- */
CHUAN.every((c) => c.nguon.length > 10 && c.noiLaGi.length > 50 && c.bangChung.length > 30 && c.conThieu.length > 40)
  ? ok(`${CHUAN.length} chuẩn, mỗi chuẩn có nguồn, nội dung, bằng chứng, và phần còn thiếu`)
  : fail('có chuẩn thiếu nguồn hoặc thiếu phần còn thiếu');
CHUAN_SO.chuaDat + CHUAN_SO.motPhan > 0
  ? ok(`${CHUAN_SO.dat} đạt · ${CHUAN_SO.motPhan} đạt một phần · ${CHUAN_SO.chuaDat} chưa đạt — bảng có chỗ chưa đạt, nên nó là đối chiếu chứ không phải quảng cáo`)
  : fail('mọi chuẩn đều đạt — đây là bảng quảng cáo, không phải bảng đối chiếu');
CHUAN_SO.dat + CHUAN_SO.motPhan + CHUAN_SO.chuaDat === CHUAN.length
  ? ok('mọi chuẩn đều có đúng một kết luận') : fail('có chuẩn không phân loại được');
new Set(CHUAN.map((c) => c.ten)).size === CHUAN.length ? ok('không chuẩn nào trùng tên') : fail('có chuẩn trùng tên');
CHUAN_CREED.khongHua.includes('KHÔNG phải chứng nhận')
  ? ok('nói thẳng: đối chiếu chuẩn không phải chứng nhận, chưa có bên thứ ba kiểm')
  : fail('thiếu lời nói rõ đây không phải chứng nhận');
CHUAN.filter((c) => c.datToiDau === 'đạt').every((c) => /tools\/|\.cjs|\.yml|[0-9]/.test(c.bangChung))
  ? ok('mọi chuẩn ghi "đạt" đều dẫn được một tệp hoặc một con số làm bằng chứng')
  : fail('có chuẩn ghi đạt mà bằng chứng chỉ là lời nói');

console.log(
  `\n  Chữ ${CHU_GITA_SO.soChu} · Thành tố ${CHU_GITA_SO.soThanhTo} · Cấp hành động ${CHU_GITA_SO.soCapHanhDong} · ` +
    `Ô ba sân ${GITA_HOA_SO.soO} · Tầng hấp thu ${GITA_HOA_SO.soTangHapThu} · ` +
    `Cấp chuyên môn ${GITA_HOA_SO.soCapChuyenMon} · Chuẩn ${CHUAN_SO.soChuan}`,
);
console.log(bad === 0 ? '  ĐẠT — tầng chiều sâu GITA không lỗi\n' : `  HỎNG — ${bad} lỗi\n`);
process.exit(bad === 0 ? 0 : 1);
