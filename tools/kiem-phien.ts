/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kiểm tầng THI HÀNH phân quyền.
 * Chạy: npx tsx tools/kiem-phien.ts
 *
 * tools/kiem-quyen.ts kiểm bảng quyền có hợp lý không. Bài này kiểm việc
 * BẬT nó lên: thẻ nào neo vào quyền nào, vai nào mở được gì, và những chỗ
 * dễ hỏng nhất khi thêm thẻ mới — quên khai báo quyền cho thẻ, hoặc gõ
 * nhầm tên quyền rồi khoá một thẻ với tất cả mọi người mà không ai biết.
 */
import {
  TAB_QUYEN, tabDuocXem, tabCuaVai, viSaoChan, phamViVai,
  PHIEN_SO, PHIEN_CREED, VAI_MAC_DINH, VAI_HOP_LE, docVai,
} from '../data/phien';
import {BAC_QUYEN, QUYEN_BY_ID, quyenCua} from '../data/phanquyen';
import {readFileSync} from 'node:fs';

let bad = 0;
const fail = (m: string, x = '') => { bad++; console.log(`  ✗ ${m}${x ? ` — ${x}` : ''}`); };
const ok = (m: string) => console.log(`  ✓ ${m}`);

console.log('\n  KIỂM THI HÀNH PHÂN QUYỀN\n');

/* ------------------- THẺ TRONG APP KHỚP VỚI BẢNG NEO -------------------- */
/*
 * Nguồn sự thật về danh sách thẻ nằm trong App.tsx. Nếu bảng neo ở đây
 * thiếu một thẻ thì thẻ đó bị khoá với MỌI vai (xem tabDuocXem: thẻ chưa
 * khai báo quyền thì trả về false). Đó là hỏng, và phải đỏ lên ở đây chứ
 * không phải để người dùng phát hiện.
 */
const app = readFileSync('App.tsx', 'utf8');
const tabTrongApp = [...app.matchAll(/^\s{4}id: '([a-z]+)',$/gm)].map((m) => m[1]);
const tabKhaiBao = Object.keys(TAB_QUYEN);

tabTrongApp.length >= 30
  ? ok(`đọc được ${tabTrongApp.length} thẻ từ App.tsx`)
  : fail(`chỉ đọc được ${tabTrongApp.length} thẻ từ App.tsx`, 'biểu thức tìm đã lỗi thời');

const thieuNeo = tabTrongApp.filter((t) => !TAB_QUYEN[t]);
thieuNeo.length === 0
  ? ok('mọi thẻ trong App đều được neo vào một quyền')
  : fail(`${thieuNeo.length} thẻ chưa neo quyền — chúng đang bị khoá với MỌI vai`, thieuNeo.join(', '));

const neoThua = tabKhaiBao.filter((t) => !tabTrongApp.includes(t));
neoThua.length === 0
  ? ok('không neo thừa cho thẻ không tồn tại')
  : fail('neo quyền cho thẻ không có trong App', neoThua.join(', '));

/* Tên quyền phải có thật, nếu không thì thẻ khoá vĩnh viễn. */
const quyenLac = [...new Set(Object.values(TAB_QUYEN))].filter((q) => !QUYEN_BY_ID[q]);
quyenLac.length === 0
  ? ok(`${PHIEN_SO.soQuyenDungLamCong} quyền dùng làm cổng, tất cả đều có thật`)
  : fail('neo vào quyền không tồn tại', quyenLac.join(', '));

/* -------------------------- MỌI VAI ĐỀU DÙNG ĐƯỢC ----------------------- */
const vaiChet = BAC_QUYEN.filter((b) => tabCuaVai(b.id).length === 0);
vaiChet.length === 0
  ? ok(`cả ${BAC_QUYEN.length} vai đều mở được ít nhất một thẻ`)
  : fail('có vai không mở được thẻ nào', vaiChet.map((b) => b.id).join(', '));

VAI_HOP_LE(VAI_MAC_DINH)
  ? ok(`vai mặc định ${VAI_MAC_DINH} là một bậc có thật`)
  : fail('vai mặc định không tồn tại');

/*
 * PHÂN QUYỀN PHẢI THẬT SỰ CHẶN CÁI GÌ ĐÓ.
 * Nếu mọi vai đều mở được mọi thẻ thì tầng này chỉ là trang trí.
 */
const soTabMoi = BAC_QUYEN.map((b) => tabCuaVai(b.id).length);
Math.min(...soTabMoi) < Math.max(...soTabMoi)
  ? ok(`phạm vi chênh nhau thật: hẹp nhất ${Math.min(...soTabMoi)} thẻ, rộng nhất ${Math.max(...soTabMoi)} thẻ`)
  : fail('mọi vai mở được như nhau', 'phân quyền đang không chặn gì');

phamViVai(VAI_MAC_DINH, tabTrongApp).soTabAn > 0
  ? ok('vai mặc định vẫn bị ẩn một số thẻ — bật thật, không phải bật hình thức')
  : fail('vai mặc định mở hết mọi thẻ', 'người dùng sẽ không bao giờ thấy phân quyền có tác dụng');

/* ---------------------- LUẬT KHÔNG ĐƯỢC PHÉP VỠ ------------------------- */
/*
 * Bậc kỹ thuật cao nhất KHÔNG được mở màn hình chuyên môn. Đây là luật
 * quan trọng nhất của cả bảng, nên nó được kiểm ở cả tầng quyền lẫn tầng
 * thi hành — một luật chỉ được kiểm ở một chỗ là một luật dễ vỡ.
 */
const camChuyenMon: [string, string, string][] = [
  ['qt-3', 'grading', 'SUPER ADMIN KHÔNG mở được màn hình chấm bài'],
  ['qt-3', 'lambai', 'SUPER ADMIN KHÔNG mở được màn hình làm bài'],
  ['qt-2', 'grading', 'ADMIN HỆ THỐNG KHÔNG mở được màn hình chấm bài'],
  ['dh-1', 'grading', 'GIÁM ĐỐC ĐIỀU HÀNH KHÔNG mở được màn hình chấm bài'],
  ['kd-1', 'phieu', 'CỘNG TÁC VIÊN KHÔNG mở được bộ phiếu luyện'],
  ['kd-1', 'hoso', 'CỘNG TÁC VIÊN KHÔNG mở được hồ sơ'],
  ['ph-1', 'grading', 'PHỤ HUYNH KHÔNG mở được màn hình chấm bài'],
  ['hv-1', 'assess', 'HỌC VIÊN TẦNG 1 chưa tự tra kho giải pháp'],
  ['hv-5', 'grading', 'HỌC VIÊN GIỎI NHẤT vẫn KHÔNG chấm bài'],
];
for (const [vai, tab, noi] of camChuyenMon) {
  tabDuocXem(vai, tab) ? fail(`${noi} — nhưng đang mở được`) : ok(noi);
}

const phaiMo: [string, string, string][] = [
  ['hv-1', 'phieu', 'HỌC VIÊN TẦNG 1 làm được phiếu'],
  ['hv-3', 'assess', 'HỌC VIÊN TẦNG 3 tra được kho giải pháp'],
  ['gv-1', 'phieu', 'TRỢ GIẢNG làm được chính bộ phiếu mình sẽ giao'],
  ['gv-2', 'grading', 'COACH TẬP SỰ chấm được bài'],
  ['gv-5', 'studio', 'CHỦ NHIỆM CHUYÊN MÔN mở được xưởng học liệu'],
  ['sp-1', 'studio', 'ADMIN SẢN PHẨM mở được xưởng học liệu'],
  /*
   * Thẻ "Hồ sơ của tôi" là hồ sơ CỦA CHÍNH NGƯỜI ĐANG DÙNG, không phải hồ
   * sơ học viên. Admin sản phẩm mở được thẻ này là đúng — điều bị cấm là
   * q-xem-ho-so-toan-truong, và tools/kiem-quyen.ts giữ điều đó. Ghi rõ ở
   * đây vì hai thứ dễ lẫn tên với nhau.
   */
  ['sp-1', 'hoso', 'ADMIN SẢN PHẨM mở được hồ sơ của chính mình'],
  ['qt-3', 'quyen', 'SUPER ADMIN đọc được bảng phân quyền'],
  ['ph-1', 'quyen', 'PHỤ HUYNH đọc được bảng phân quyền ràng buộc con mình'],
];
for (const [vai, tab, noi] of phaiMo) {
  tabDuocXem(vai, tab) ? ok(noi) : fail(`${noi} — nhưng đang bị chặn`);
}

/* Thừa kế: bậc trên trong cùng thang không được mở ít thẻ hơn bậc dưới. */
let lechThuaKe = 0;
for (const b of BAC_QUYEN) {
  if (!b.keThua) continue;
  const tren = new Set(tabCuaVai(b.id));
  const thieu = tabCuaVai(b.keThua).filter((t) => !tren.has(t));
  if (thieu.length) { lechThuaKe++; fail(`${b.id} thiếu thẻ mà ${b.keThua} có`, thieu.join(', ')); }
}
lechThuaKe === 0 ? ok('bậc trên luôn mở được đủ mọi thẻ của bậc dưới cùng thang') : void 0;

/* ------------------------ GIẢI THÍCH KHI BỊ CHẶN ------------------------ */
/*
 * Thẻ bị chặn phải nói được vì sao và ai mở được. Chặn mà không giải thích
 * là chỗ người dùng nghĩ phần mềm hỏng.
 */
let thieuGiaiThich = 0;
for (const b of BAC_QUYEN) {
  for (const t of tabTrongApp) {
    if (tabDuocXem(b.id, t)) continue;
    const v = viSaoChan(b.id, t);
    if (!v || !v.viSao || v.viSao.length < 20 || v.aiMoDuoc.length === 0) {
      thieuGiaiThich++;
      if (thieuGiaiThich <= 3) fail(`${b.id} bị chặn ở ${t} mà không giải thích được`);
    }
  }
}
thieuGiaiThich === 0
  ? ok('mọi lần bị chặn đều nói được vì sao và vai nào mở được')
  : void 0;

viSaoChan(VAI_MAC_DINH, tabCuaVai(VAI_MAC_DINH)[0]) === null
  ? ok('thẻ đã mở được thì không sinh ra lời giải thích thừa')
  : fail('sinh lời giải thích cho thẻ vốn đã mở');

/* --------------------------- LỜI TỰ NHẬN ------------------------------- */
/[Kk]HÔNG phải bảo mật/.test(PHIEN_CREED.thatThe)
  ? ok('nói thẳng: chặn ở giao diện KHÔNG phải bảo mật')
  : fail('không nói rõ giới hạn của tầng này');
/công cụ nhà phát triển/.test(PHIEN_CREED.thatThe)
  ? ok('nói rõ ai mở công cụ nhà phát triển cũng đổi được vai')
  : fail('giấu cách vượt qua tầng chặn này');
/két đã mã hoá|mã khoá/.test(PHIEN_CREED.manhHon)
  ? ok('nói rõ chỗ DUY NHẤT mạnh hơn: vai trong két của bản máy tính')
  : fail('không nói chỗ nào mạnh hơn');

PHIEN_SO.soTabKhaiBao === tabTrongApp.length
  ? ok(`con số công bố khớp: ${PHIEN_SO.soTabKhaiBao} thẻ`)
  : fail('con số công bố lệch với số thẻ thật', `${PHIEN_SO.soTabKhaiBao} vs ${tabTrongApp.length}`);

console.log(
  `\n  Thẻ ${PHIEN_SO.soTabKhaiBao} · Vai ${PHIEN_SO.soVai} · Cổng ${PHIEN_SO.soQuyenDungLamCong} quyền · ` +
    `Mặc định ${VAI_MAC_DINH} mở ${tabCuaVai(VAI_MAC_DINH).length}`,
);
console.log(bad === 0 ? '  ĐẠT — tầng thi hành phân quyền không lỗi\n' : `  HỎNG — ${bad} lỗi\n`);
process.exit(bad === 0 ? 0 : 1);
