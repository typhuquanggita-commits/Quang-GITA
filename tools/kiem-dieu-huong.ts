/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Thanh điều hướng — ép mọi thẻ phải TÌM RA ĐƯỢC.
 *
 * VÌ SAO BÀI NÀY TỒN TẠI
 *   Thẻ "Thi thử bấm giờ" được nối vào ứng dụng đúng cách: có quyền, có
 *   tuyến, có trang SEO, có bài kiểm trình duyệt chạy qua nó. Mọi bài kiểm
 *   đều xanh. Nhưng người dùng vẫn báo là KHÔNG THẤY nó ở đâu — vì nó là
 *   mục thứ hai mươi mốt trong một cột dọc ba mươi tư dòng dưới đúng một
 *   tiêu đề. Không bài kiểm nào bắt được ca đó, vì mọi bài kiểm đều hỏi
 *   "thẻ có tồn tại không", không bài nào hỏi "thẻ có tìm ra được không".
 *
 *   Bài này hỏi câu thứ hai.
 *
 * Chạy: npx tsx tools/kiem-dieu-huong.ts
 */
import {readFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {VAI_MAC_DINH, tabDuocXem} from '../data/phien';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const app = readFileSync(path.join(ROOT, 'App.tsx'), 'utf8');

let hong = 0;
const ok = (ten: string, dieu: boolean, them = '') => {
  if (dieu) console.log(`  ✓ ${ten}`);
  else {
    hong++;
    console.log(`  ✗ ${ten}${them ? ' — ' + them : ''}`);
  }
};

console.log('\n  THANH ĐIỀU HƯỚNG — MỌI THẺ PHẢI TÌM RA ĐƯỢC\n');

/* ---- Đọc thẳng App.tsx, không nhập khẩu (App.tsx kéo theo cả giao diện) ---- */
const the = [
  ...app.matchAll(
    /\{\s*\n\s*id: '([^']+)',\s*\n\s*icon: '[^']*',\s*\n\s*label: '([^']+)',\s*\n\s*hint: '[^']*',\s*\n\s*group: '([^']+)'/g,
  ),
].map((m) => ({id: m[1], label: m[2], nhom: m[3]}));
const hocVien = the.filter((t) => t.nhom === 'learner');
ok('đọc được danh sách thẻ từ App.tsx', the.length > 0, `${the.length} thẻ`);

/* ---- Bảng khối ---- */
const khoiKhoi = app.match(/const KHOI: \{id: KhoiId; label: string\}\[\] = \[([\s\S]*?)\n\];/);
const dsKhoi = [...(khoiKhoi?.[1] ?? '').matchAll(/id: '([^']+)', label: '([^']+)'/g)].map((m) => ({
  id: m[1],
  label: m[2],
}));
const bangKhoi = app.match(/const KHOI_CUA_TAB: Record<string, KhoiId> = \{([\s\S]*?)\n\};/);
const gan = new Map<string, string>();
for (const m of (bangKhoi?.[1] ?? '').matchAll(/(\w+): '(\w+)'/g)) gan.set(m[1], m[2]);

ok('có ít nhất ba khối, không dồn hết vào một tiêu đề', dsKhoi.length >= 3, `${dsKhoi.length} khối`);

/*
 * LUẬT MẠNH NHẤT: mọi thẻ học viên phải có khối. Thiếu bảng này thì thẻ mới
 * biến mất khỏi thanh điều hướng mà không ai báo — đúng lỗi đã xảy ra.
 */
const thieu = hocVien.filter((t) => !gan.has(t.id));
ok(
  `cả ${hocVien.length} thẻ học viên đều được xếp vào một khối`,
  thieu.length === 0,
  thieu.map((t) => `${t.id} (${t.label})`).join(', '),
);

/* Chiều ngược lại: bảng không được nhắc thẻ đã xoá. */
const idThat = new Set(the.map((t) => t.id));
const thua = [...gan.keys()].filter((id) => !idThat.has(id));
ok('bảng khối không nhắc thẻ nào đã bị xoá', thua.length === 0, thua.join(', '));

/* Mọi khối được nhắc phải có thật trong danh sách khối. */
const idKhoi = new Set(dsKhoi.map((k) => k.id));
const laKhoi = [...new Set(gan.values())].filter((k) => !idKhoi.has(k));
ok('mọi khối được gán đều có tên trong danh sách khối', laKhoi.length === 0, laKhoi.join(', '));

/* Không khối nào được rỗng — khối rỗng là tiêu đề vô nghĩa. */
const rong = dsKhoi.filter((k) => ![...gan.values()].includes(k.id));
ok('không khối nào rỗng', rong.length === 0, rong.map((k) => k.label).join(', '));

/*
 * Không khối nào được phình quá nửa số thẻ. Cắt ba mươi tư mục thành hai
 * khối mười bảy vẫn là danh sách không cuộn nổi — luật này chặn đúng chỗ đó.
 */
const dem = new Map<string, number>();
for (const t of hocVien) {
  const k = gan.get(t.id);
  if (k) dem.set(k, (dem.get(k) ?? 0) + 1);
}
const to = [...dem.entries()].filter(([, n]) => n > hocVien.length / 2);
ok(
  'không khối nào ôm quá nửa số thẻ học viên',
  to.length === 0,
  to.map(([k, n]) => `${k} có ${n}/${hocVien.length}`).join(', '),
);

/* ---- Khối làm bài phải đứng đầu ---- */
ok(
  'khối đầu tiên là khối làm bài, không phải khối lý thuyết',
  /làm bài/i.test(dsKhoi[0]?.label ?? ''),
  dsKhoi[0]?.label,
);

/* ---- Lối vào bày sẵn ---- */
const moNhanh = app.match(/const MO_NHANH: [\s\S]*?\n\];/)?.[0] ?? '';
const idNhanh = [...moNhanh.matchAll(/id: '([^']+)'/g)].map((m) => m[1]);
ok('có lối vào bày sẵn trên đầu thanh điều hướng', idNhanh.length >= 2, `${idNhanh.length} lối`);
ok('mọi lối vào bày sẵn đều trỏ tới thẻ có thật', idNhanh.every((id) => idThat.has(id)),
   idNhanh.filter((id) => !idThat.has(id)).join(', '));
ok('thi thử bấm giờ nằm trong lối vào bày sẵn', idNhanh.includes('thithu'));

/*
 * Lối vào bày sẵn vô nghĩa nếu vai mặc định không được xem thẻ đó — nút sẽ
 * biến mất đúng với người cần nó nhất.
 */
const khongXem = idNhanh.filter((id) => !tabDuocXem(VAI_MAC_DINH, id));
ok(
  `vai mặc định (${VAI_MAC_DINH}) xem được cả ${idNhanh.length} lối vào bày sẵn`,
  khongXem.length === 0,
  khongXem.join(', '),
);

/* Thẻ thi thử phải mở được với vai mặc định — không thì học viên không làm bài được. */
ok('vai mặc định mở được thẻ thi thử bấm giờ', tabDuocXem(VAI_MAC_DINH, 'thithu'));
ok('vai mặc định mở được thẻ làm bài', tabDuocXem(VAI_MAC_DINH, 'lambai'));

console.log(`\n  Thẻ ${the.length} · Học viên ${hocVien.length} · Khối ${dsKhoi.length} · Lối vào nhanh ${idNhanh.length}`);
console.log(`  ${hong === 0 ? 'ĐẠT — không thẻ nào bị chôn trong danh sách' : `HỎNG — ${hong} lỗi`}\n`);
process.exit(hong ? 1 : 0);
