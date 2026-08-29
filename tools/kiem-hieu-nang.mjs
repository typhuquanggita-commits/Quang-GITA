/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kiểm hiệu năng của bản dựng.
 * Chạy: npm run build && node tools/kiem-hieu-nang.mjs
 *
 * VÌ SAO CẦN BÀI NÀY
 *   Thêm dữ liệu là việc dễ và không có gì đỏ lên. Nhưng nếu mô-đun mới bị
 *   tái xuất trong data/index.ts thì MỌI thẻ đều phải tải nó, kể cả thẻ
 *   không liên quan — và người dùng ở mạng chậm trả giá cho thứ họ không mở.
 *
 *   Ngân hàng câu hỏi từng nằm trong thùng chung: 451 KB nguồn nạp cho cả
 *   39 thẻ. Gỡ nó ra làm gói tải lần đầu giảm từ 1.217 kB xuống 687 kB,
 *   trong khi số câu tăng gấp năm. Bài kiểm này giữ điều đó.
 */
import {readdirSync, statSync, readFileSync} from 'node:fs';
import {join} from 'node:path';

let bad = 0;
const fail = (m, x = '') => { bad++; console.log(`  ✗ ${m}${x ? ` — ${x}` : ''}`); };
const ok = (m) => console.log(`  ✓ ${m}`);
const kb = (n) => `${Math.round(n / 1024)} kB`;

console.log('\n  KIỂM HIỆU NĂNG BẢN DỰNG\n');

const thuMuc = 'dist/assets';
let tep;
try {
  tep = readdirSync(thuMuc).filter((f) => f.endsWith('.js'));
} catch {
  console.log('  ✗ chưa có bản dựng — chạy `npm run build` trước\n');
  process.exit(1);
}

const kichThuoc = Object.fromEntries(tep.map((f) => [f, statSync(join(thuMuc, f)).size]));
const tong = Object.values(kichThuoc).reduce((a, b) => a + b, 0);
const tenDau = tep.find((f) => f.startsWith('index-'));
const goiDau = kichThuoc[tenDau] ?? 0;

/*
 * TRẦN CỦA GÓI TẢI LẦN ĐẦU
 * Đây là thứ mọi người dùng phải tải trước khi thấy được bất cứ gì. Trần
 * đặt ở 800 kB: cao hơn mức hiện tại đủ để còn chỗ thêm tính năng, nhưng
 * thấp hơn hẳn mức 1.217 kB của bản trước để không lặng lẽ tụt lại.
 */
const TRAN_GOI_DAU = 800 * 1024;
goiDau > 0 && goiDau <= TRAN_GOI_DAU
  ? ok(`gói tải lần đầu ${kb(goiDau)} — dưới trần ${kb(TRAN_GOI_DAU)}`)
  : fail(`gói tải lần đầu ${kb(goiDau)} vượt trần ${kb(TRAN_GOI_DAU)}`,
         'nhiều khả năng có mô-đun nặng vừa bị tái xuất trong data/index.ts');

/*
 * DỮ LIỆU NẶNG PHẢI NẰM Ở CHUNK RIÊNG, KHÔNG NẰM Ở GÓI ĐẦU.
 * Ngân hàng câu hỏi là mô-đun lớn nhất kho này, nên nó là chỉ báo tốt nhất.
 */
const chunkLamBai = tep.find((f) => f.startsWith('LamBai-'));
chunkLamBai
  ? ok(`ngân hàng câu hỏi nằm ở chunk riêng (${kb(kichThuoc[chunkLamBai])}), chỉ tải khi mở thẻ Làm bài`)
  : fail('không thấy chunk riêng cho thẻ Làm bài', 'ngân hàng đang nằm trong gói tải lần đầu');
if (chunkLamBai) {
  kichThuoc[chunkLamBai] > 200 * 1024
    ? ok('chunk Làm bài đủ lớn để chắc chắn ngân hàng nằm trong đó, không nằm ở gói đầu')
    : fail('chunk Làm bài quá nhỏ', 'ngân hàng có thể đã lọt vào gói tải lần đầu');
}

/* Số chunk phải đủ nhiều — một chunk khổng lồ nghĩa là tách mã đã hỏng. */
tep.length >= 30
  ? ok(`${tep.length} chunk — mã được tách theo thẻ`)
  : fail(`chỉ có ${tep.length} chunk`, 'tách mã theo thẻ có thể đã hỏng');

/* Gói đầu không được chiếm quá nửa tổng dung lượng. */
const tyLe = goiDau / tong;
tyLe <= 0.5
  ? ok(`gói đầu chiếm ${Math.round(tyLe * 100)}% tổng dung lượng — phần lớn tải theo nhu cầu`)
  : fail(`gói đầu chiếm ${Math.round(tyLe * 100)}% tổng dung lượng`, 'quá nhiều thứ tải sẵn');

/*
 * data/index.ts KHÔNG được tái xuất bốn mô-đun nặng. Đây là kiểm ở tầng
 * nguồn, bắt được lỗi ngay cả khi chưa dựng lại.
 */
const barrel = readFileSync('data/index.ts', 'utf8');
const nang = ['nganhang', 'dethi', 'bode', 'giangsau', 'production'];
const lot = nang.filter((m) => new RegExp(`export \\* from '\\./${m}';`).test(barrel));
lot.length === 0
  ? ok(`${nang.length} mô-đun nặng đều không nằm trong thùng chung`)
  : fail('có mô-đun nặng bị tái xuất trong data/index.ts', lot.join(', '));
/ĐÚNG MỘT thẻ dùng tới/.test(barrel)
  ? ok('thùng chung ghi rõ vì sao bốn mô-đun kia nằm ngoài')
  : fail('thùng chung không giải thích vì sao thiếu mấy mô-đun');

console.log(
  `\n  Gói đầu ${kb(goiDau)} · Tổng ${kb(tong)} · ${tep.length} chunk · ` +
    `tải theo nhu cầu ${Math.round((1 - tyLe) * 100)}%`,
);
console.log(bad === 0 ? '  ĐẠT — hiệu năng bản dựng không tụt\n' : `  HỎNG — ${bad} lỗi\n`);
process.exit(bad === 0 ? 0 : 1);
