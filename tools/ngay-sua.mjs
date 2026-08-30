/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Ngày sửa thật của từng trang, lấy từ lịch sử git.
 *
 * VÌ SAO KHÔNG DÙNG new Date() CHO CẢ SITEMAP
 *   Cách làm phổ biến là ghi ngày hôm nay vào lastmod của mọi địa chỉ mỗi
 *   lần đóng gói. Làm thế là nói dối: trang không đổi mà vẫn báo vừa đổi.
 *   Google đối chiếu lastmod với nội dung nó tải về, và khi thấy sai nhiều
 *   lần thì nó BỎ QUA lastmod của cả tên miền. Lúc đó trang sửa thật cũng
 *   không được thu thập lại sớm nữa — mất đúng thứ mà lastmod sinh ra để
 *   làm.
 *
 * CÁCH TÍNH Ở ĐÂY
 *   Một trang đổi khi mã dựng nó đổi, HOẶC khi dữ liệu nó đọc đổi. Nên:
 *     1. tra thẻ nào dựng bằng thành phần nào (đọc bảng NAV trong App.tsx)
 *     2. đọc các tên nhập từ kho dữ liệu trong thành phần đó
 *     3. tra mỗi tên được khai báo ở tệp dữ liệu nào
 *     4. lấy ngày commit MUỘN NHẤT trong số các tệp đó
 *
 *   Kết quả là ngày sửa thật của riêng trang đó, không phải ngày đóng gói.
 */
import {readFileSync, readdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';

const ngayCuaTep = (tep) => {
  try {
    const r = execFileSync('git', ['log', '-1', '--format=%cI', '--', tep], {
      encoding: 'utf8',
    }).trim();
    return r || null;
  } catch {
    return null;
  }
};

/** Bảng: tên xuất khẩu → tệp dữ liệu khai báo nó. */
function bangKhaiBao() {
  const b = new Map();
  for (const t of readdirSync('data').filter((f) => f.endsWith('.ts'))) {
    const n = readFileSync(`data/${t}`, 'utf8');
    for (const m of n.matchAll(
      /^export (?:const|function|type|interface|class) ([A-Za-z0-9_]+)/gm,
    )) {
      if (!b.has(m[1])) b.set(m[1], `data/${t}`);
    }
  }
  return b;
}

/** Bảng: mã thẻ → tệp thành phần dựng nó, đọc từ NAV trong App.tsx. */
export function thanhPhanCuaTab() {
  const s = readFileSync('App.tsx', 'utf8');
  const i = s.indexOf('const NAV: Nav[] = [');
  const blk = s.slice(i, i + s.slice(i).indexOf('\n];'));
  const ra = {};
  for (const p of blk.split('\n  {\n').slice(1)) {
    const id = /id: '([a-z0-9-]+)'/.exec(p);
    const cp = /render: \([a-z]*\) => <([A-Za-z0-9_]+)/.exec(p);
    if (id && cp) ra[id[1]] = `components/engwin/${cp[1]}.tsx`;
  }
  return ra;
}

export function ngaySuaTheoTab() {
  const khai = bangKhaiBao();
  const tp = thanhPhanCuaTab();
  const nhoNgay = new Map();
  const ngay = (f) => {
    if (!nhoNgay.has(f)) nhoNgay.set(f, ngayCuaTep(f));
    return nhoNgay.get(f);
  };
  const ra = {};
  for (const [tab, tep] of Object.entries(tp)) {
    let src = '';
    try {
      src = readFileSync(tep, 'utf8');
    } catch {
      continue;
    }
    const phuThuoc = new Set([tep]);
    // Chỉ đọc các khối nhập từ kho dữ liệu; nhập từ React hay từ ./ui
    // không phải là nội dung nên không tính vào ngày sửa nội dung.
    for (const m of src.matchAll(/import\s*{([^}]+)}\s*from\s*'\.\.\/\.\.\/data'/g)) {
      for (const ten of m[1].split(',')) {
        const t = ten.trim().replace(/^type\s+/, '').split(/\s+as\s+/)[0].trim();
        const f = khai.get(t);
        if (f) phuThuoc.add(f);
      }
    }
    const ngays = [...phuThuoc].map(ngay).filter(Boolean).sort();
    ra[tab] = {
      ngay: ngays.length ? ngays[ngays.length - 1] : null,
      soTepPhuThuoc: phuThuoc.size,
    };
  }
  return ra;
}
