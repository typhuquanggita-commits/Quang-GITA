/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kiểm ba hệ thống tài liệu: đề cương, test chuyên sâu, cẩm nang điểm 10.
 * Chạy: npx tsx tools/kiem-tai-lieu.ts
 *
 * Ba hệ này dễ rỗng ruột theo ba kiểu khác nhau, nên mỗi hệ có nhóm phép
 * kiểm riêng:
 *   · đề cương  — đầu ra viết chung chung, không ai kiểm được
 *   · test      — năm bậc mà bốn bài giống hệt nhau
 *   · cẩm nang  — hứa điểm 10 mà không nói được giá của từng lỗi
 */
import {deCuong, DECUONG_SO, DECUONG_CREED, deCuongCuaTuyen} from '../data/decuong';
import {testChuyenSau, BAITEST_SO, BAITEST_CREED, chanDoan, testCuaTru} from '../data/baitest';
import {camNang, CAMNANG_SO, CAMNANG_CREED, camNangCuaPhan} from '../data/camnang';
import {PYRAMID} from '../data/academy';
import {TRU} from '../data/giangsau';
import {EXAM_PARTS, EXAM_SPEC} from '../data/chuyenanh';
import {TUYEN} from '../data/tuyen';

let bad = 0;
const fail = (m: string, x = '') => { bad++; console.log(`  ✗ ${m}${x ? ` — ${x}` : ''}`); };
const ok = (m: string) => console.log(`  ✓ ${m}`);

console.log('\n  KIỂM BA HỆ THỐNG TÀI LIỆU\n');

/* ============================== ĐỀ CƯƠNG ================================ */
const dc = deCuong();
dc.length === PYRAMID.length * TUYEN.length
  ? ok(`${dc.length} đề cương = ${PYRAMID.length} tầng × ${TUYEN.length} tuyến`)
  : fail(`${dc.length} đề cương, không khớp ${PYRAMID.length} × ${TUYEN.length}`);
new Set(dc.map((d) => d.id)).size === dc.length ? ok('mọi mã đề cương duy nhất') : fail('mã đề cương trùng');

/*
 * ĐẦU RA PHẢI QUAN SÁT ĐƯỢC. Đây là phép kiểm quan trọng nhất của hệ này:
 * "hiểu được thì quá khứ" không kiểm được nên không phải đầu ra. Dấu hiệu
 * của một đầu ra kiểm được là nó chứa CON SỐ hoặc một điều kiện đo được.
 */
const dauRaMoHo = dc.flatMap((d) =>
  d.dauRa.filter((x) => !/\d/.test(x) && !/không cần ai nhắc|đúng số phút/.test(x)),
);
dauRaMoHo.length === 0
  ? ok(`${DECUONG_SO.soDauRa} đầu ra, cái nào cũng có con số hoặc điều kiện đo được`)
  : fail(`${dauRaMoHo.length} đầu ra không kiểm được`, dauRaMoHo.slice(0, 2).join(' | '));

dc.every((d) => d.khongDay.length >= 3)
  ? ok(`${DECUONG_SO.soRanhGioi} ranh giới "KHÔNG dạy gì", mỗi đề cương ít nhất ba`)
  : fail('có đề cương không ghi đủ ranh giới');
dc.every((d) => d.tuan.length >= 4 && d.tuan.every((t) => /\d/.test(t.doBang)))
  ? ok(`${DECUONG_SO.soTuan} tuần, tuần nào cũng có phép đo bằng số`)
  : fail('có tuần không có phép đo bằng số');
dc.every((d) => d.tuan.every((t) => t.chuaDung.length > 20))
  ? ok('mỗi tuần nói rõ chưa đụng tới cái gì')
  : fail('có tuần không nói rõ phạm vi');
dc.every((d) => d.danhGia.reduce((s, g) => s + g.trongSo, 0) === 100)
  ? ok('trọng số đánh giá của mọi đề cương cộng đúng 100')
  : fail('có đề cương trọng số không cộng thành 100');
dc.every((d) => d.gita.length === 4 && d.gita.every((g) => g.viec.length > 25))
  ? ok(`${DECUONG_SO.soViecGita} việc GITA, mỗi chữ một việc cụ thể chứ không phải khẩu hiệu`)
  : fail('có việc GITA viết như khẩu hiệu');

/*
 * ĐỀ CƯƠNG PHẢI VỪA NGÂN SÁCH THỜI GIAN THẬT CỦA TUYẾN.
 * Tuyến IELTS có 1.095 ngày (≈156 tuần); tuyến chuyên có 22 tháng (≈95
 * tuần). Tổng số tuần của các đề cương vượt ngân sách thì cả lộ trình là
 * bất khả thi, và đó là loại sai không ai thấy nếu không cộng lại.
 */
const NGAN_SACH: Record<string, number> = {ielts: 156, chuyen: 95};
for (const t of TUYEN) {
  const tong = deCuongCuaTuyen(t.id).reduce((s, d) => s + d.soTuan, 0);
  const tran = NGAN_SACH[t.id];
  tong > 0 && tong <= tran
    ? ok(`tuyến ${t.id}: ${tong} tuần đề cương, vừa trong ngân sách ${tran} tuần`)
    : fail(`tuyến ${t.id}: ${tong} tuần vượt ngân sách ${tran} tuần`, 'lộ trình bất khả thi');
}
/* Tuyến chuyên phải NHANH hơn: ít tuần hơn và nhiều phút mỗi ngày hơn. */
const tongIelts = deCuongCuaTuyen('ielts').reduce((s, d) => s + d.soTuan, 0);
const tongChuyen = deCuongCuaTuyen('chuyen').reduce((s, d) => s + d.soTuan, 0);
tongChuyen < tongIelts && deCuongCuaTuyen('chuyen')[0].phutMoiNgay > deCuongCuaTuyen('ielts')[0].phutMoiNgay
  ? ok('tuyến chuyên ít tuần hơn và nhiều phút mỗi ngày hơn — đúng với ràng buộc 22 tháng')
  : fail('hai tuyến không phản ánh ràng buộc thời gian khác nhau');

/* Mười đề cương phải khác nhau thật, không phải một bản nhân mười. */
const van = dc.map((d) => JSON.stringify([d.dauRa, d.khongDay, d.tuan, d.gita]));
new Set(van).size === dc.length
  ? ok('cả mười đề cương khác nhau về nội dung')
  : fail(`chỉ có ${new Set(van).size} đề cương khác nhau trên ${dc.length}`);

/* ========================= TEST CHUYÊN SÂU ============================== */
const bt = testChuyenSau();
bt.length === TRU.length
  ? ok(`${bt.length} bài test, đúng một bài cho mỗi trụ`)
  : fail(`${bt.length} bài test cho ${TRU.length} trụ`);
bt.every((t) => t.bac.length === 5)
  ? ok(`${BAITEST_SO.soCauHoi} câu hỏi, đúng năm bậc mỗi bài`)
  : fail('có bài không đủ năm bậc');
bt.every((t) => t.bac.every((b, i) => b.bac === i + 1))
  ? ok('số thứ tự bậc liên tục 1..5 trong mọi bài')
  : fail('có bài đánh số bậc nhảy cóc');
/*
 * CÂU HỎI PHẢI KHÁC NHAU GIỮA CÁC TRỤ. Bốn bài cùng một thang là chủ ý —
 * người dạy đọc bài nào cũng hiểu ngay. Nhưng bốn bài cùng CÂU HỎI thì đó
 * là một bài nhân bốn lần, và con số bốn là khai khống.
 */
const moiHoi = bt.flatMap((t) => t.bac.map((b) => b.hoi));
new Set(moiHoi).size === moiHoi.length
  ? ok(`${moiHoi.length} câu hỏi khác nhau — bốn trụ hỏi bốn thứ khác nhau`)
  : fail('có câu hỏi lặp giữa các trụ', 'bốn bài đang là một bài nhân bốn');
bt.every((t) => t.bac.every((b) => b.neuGay.length > 40 && /\d|Quay lại|viết|ghi|dạy|nói/.test(b.neuGay)))
  ? ok(`${BAITEST_SO.soDonThuoc} đơn thuốc, mỗi bậc một việc cụ thể chứ không phải "học chăm hơn"`)
  : fail('có bậc không có đơn thuốc cụ thể');
bt.every((t) => t.docKetQua.length >= 3)
  ? ok(`${BAITEST_SO.soCachDoc} cách đọc kết quả, mỗi bài ít nhất ba`)
  : fail('có bài thiếu cách đọc kết quả');
bt.every((t) => t.dungSaiCach.length > 60)
  ? ok('mỗi bài nói rõ cách dùng SAI của chính nó')
  : fail('có bài không nói cách dùng sai');
/* Chẩn đoán phải trả đúng bậc gãy, kể cả ở hai đầu thang. */
const c0 = chanDoan('kien-thuc', 0);
const c2 = chanDoan('kien-thuc', 2);
const c5 = chanDoan('kien-thuc', 5);
c0?.bacDung === 1 && c2?.bacDung === 3 && c5?.daHet === true
  ? ok('chẩn đoán trả đúng bậc gãy ở cả hai đầu thang')
  : fail('chẩn đoán sai bậc', JSON.stringify([c0?.bacDung, c2?.bacDung, c5?.daHet]));
chanDoan('khong-co-that', 2) === null
  ? ok('chẩn đoán trụ không có thật trả về rỗng, không sập')
  : fail('chẩn đoán trụ sai không trả về rỗng');
testCuaTru('kien-thuc') !== undefined && testCuaTru('bịa') === undefined
  ? ok('tra bài test theo trụ chỉ trả về trụ có thật')
  : fail('tra bài test không neo vào trụ có thật');

/* ============================== CẨM NANG ================================ */
const cn = camNang();
cn.length === EXAM_PARTS.length
  ? ok(`${cn.length} cẩm nang, đúng một bản cho mỗi phần của đề`)
  : fail(`${cn.length} cẩm nang cho ${EXAM_PARTS.length} phần`);
cn.every((c) => c.muc.length >= 3)
  ? ok(`${CAMNANG_SO.soMuc} mục, mỗi phần ít nhất ba`)
  : fail('có phần dưới ba mục');
/*
 * MỖI MỤC PHẢI CÓ GIÁ BẰNG ĐIỂM. Không có giá thì người học không biết dồn
 * sức vào đâu trước, và cẩm nang trở thành một danh sách lời khuyên.
 */
cn.every((c) => c.muc.every((m) => /\d/.test(m.giaCuaLoi) && m.giaCuaLoi.includes('điểm')))
  ? ok('mọi mục ghi rõ lỗi đó đáng bao nhiêu điểm theo barem thật')
  : fail('có mục không nói giá của lỗi');
cn.every((c) => c.muc.every((m) => m.chinLaChoNay.includes('9') && m.chinLaChoNay.includes('10')))
  ? ok('mọi mục nói rõ người được 9 làm gì và người được 10 làm gì')
  : fail('có mục không tách được 9 với 10');
cn.every((c) => c.muc.every((m) => m.cachChan.length === 3))
  ? ok(`${CAMNANG_SO.soCachChan} cách chặn, đúng ba cách mỗi mục`)
  : fail('có mục không đủ ba cách chặn');
cn.every((c) => c.muc.every((m) => m.tuKiem.length > 30))
  ? ok('mọi mục có cách tự kiểm, không phải chờ người khác chấm')
  : fail('có mục thiếu cách tự kiểm');
/* Con số phải suy ra từ EXAM_SPEC, không gõ tay. */
cn.every((c) => {
  const p = EXAM_PARTS.find((x) => x.name === c.phanTen);
  return !!p && c.soCau === p.items && c.trongSo === p.weight && c.phut === p.minutes;
})
  ? ok('số câu, trọng số và số phút của mọi cẩm nang lấy thẳng từ EXAM_SPEC')
  : fail('có cẩm nang gõ tay con số thay vì lấy từ EXAM_SPEC');
cn.reduce((s, c) => s + c.soCau, 0) === EXAM_PARTS.reduce((s, p) => s + p.items, 0)
  ? ok(`tổng ${CAMNANG_SO.tongCau} câu khớp tổng số câu của đề thật`)
  : fail('tổng số câu không khớp đề thật');
cn.every((c) => c.chiaGio.length === 4 && c.bayNgayCuoi.length === 3)
  ? ok('mọi cẩm nang có cách chia giờ và ba việc của bảy ngày cuối')
  : fail('có cẩm nang thiếu phần chia giờ hoặc bảy ngày cuối');
camNangCuaPhan('không có phần này') === undefined
  ? ok('tra cẩm nang theo phần không có thật trả về rỗng')
  : fail('tra cẩm nang không neo vào phần có thật');

/* ========================= LỜI TỰ NHẬN ================================== */
/KHÔNG kiểm được|không kiểm được/.test(DECUONG_CREED.dauRaQuanSatDuoc)
  ? ok('đề cương nói rõ đầu ra thế nào là không kiểm được')
  : fail('đề cương không nói chuẩn của đầu ra');
/dụng cụ chẩn đoán|không phải thước xếp hạng/.test(BAITEST_CREED.khongPhaiXepHang)
  ? ok('bài test nói thẳng nó không phải thước xếp hạng')
  : fail('bài test không nói rõ giới hạn');
/Không cẩm nang nào làm cho một người được điểm 10/.test(CAMNANG_CREED.khongHuaLieu)
  ? ok('cẩm nang nói thẳng: không cẩm nang nào làm cho một người được điểm 10')
  : fail('cẩm nang hứa liều');
/không nâng trần|thôi kéo em xuống/.test(CAMNANG_CREED.khongHuaLieu)
  ? ok('cẩm nang nói rõ nó gỡ chỗ mất điểm tránh được, không nâng trần')
  : fail('cẩm nang không phân biệt gỡ lỗi với nâng trần');
/đối chiếu lại|thay đổi theo năm/.test(CAMNANG_CREED.doiChieuLai)
  ? ok('cẩm nang nhắc phải đối chiếu cấu trúc đề trước mỗi mùa')
  : fail('cẩm nang không nhắc đối chiếu');

DECUONG_SO.soDeCuong === dc.length && BAITEST_SO.soBai === bt.length && CAMNANG_SO.soPhan === cn.length
  ? ok('mọi con số công bố suy ra từ dữ liệu, không gõ tay')
  : fail('con số công bố lệch với dữ liệu');

console.log(
  `\n  Đề cương ${DECUONG_SO.soDeCuong} (${DECUONG_SO.tongTuanHoc} tuần · ${DECUONG_SO.soDauRa} đầu ra) · ` +
    `Test ${BAITEST_SO.soBai} × ${BAITEST_SO.soBac} bậc · Cẩm nang ${CAMNANG_SO.soPhan} phần · ${CAMNANG_SO.soMuc} mục`,
);
console.log(bad === 0 ? '  ĐẠT — ba hệ thống tài liệu không lỗi\n' : `  HỎNG — ${bad} lỗi\n`);
process.exit(bad === 0 ? 0 : 1);
