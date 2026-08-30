/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {BAC_QUYEN, BAC_BY_ID, quyenCua, QUYEN_BY_ID} from './phanquyen';
import type {BacQuyen} from '../types';

/* ==========================================================================
   PHIÊN LÀM VIỆC — BẬT PHÂN QUYỀN THẬT SỰ

   data/phanquyen.ts MÔ TẢ ai được làm gì. Tệp này THI HÀNH điều đó: nó
   quyết định thẻ nào dựng lên và thẻ nào không, theo đúng vai đang dùng.

   NÓI TRƯỚC, VÌ KHÔNG NÓI THÌ LÀ LỪA NGƯỜI DÙNG
   Đây là phân quyền ở GIAO DIỆN. Nó ngăn nhầm lẫn — người tư vấn không mở
   nhầm màn hình chấm bài, học viên tầng 1 không lạc vào nội dung tầng 5.
   Nó KHÔNG ngăn được người cố ý: ai mở công cụ nhà phát triển cũng đổi được
   vai của mình. Muốn có hiệu lực thật thì phải có máy chủ, vai gắn với
   phiên đăng nhập, và MỌI thao tác đọc ghi đều kiểm lại vai ở phía máy chủ.

   Một chỗ ở đây mạnh hơn thế, và chỉ đúng một chỗ: trên BẢN MÁY TÍNH, vai
   được cất trong két đã mã hoá cùng với hồ sơ. Đổi vai ở đó phải mở được
   két, tức là phải có mã khoá. Trên bản web thì vai nằm trong bộ nhớ trình
   duyệt và đổi được bằng tay — điều đó được ghi thẳng ra màn hình.

   KHÔNG THẺ NÀO BIẾN MẤT LẶNG LẼ
   Thẻ bị ẩn thì hệ thống nói rõ có bao nhiêu thẻ đang ẩn, vai nào mở được
   chúng, và vì sao vai hiện tại chưa mở. Ẩn mà không nói là cách chắc chắn
   để người dùng tưởng phần mềm hỏng.
   ========================================================================== */

export const PHIEN_CREED = {
  name: 'PHIÊN LÀM VIỆC',
  claim:
    'Vai đang dùng quyết định thẻ nào dựng lên. Thẻ không thuộc quyền của vai thì không được dựng, chứ không phải dựng rồi che đi.',
  thatThe:
    'Phân quyền ở giao diện KHÔNG phải bảo mật. Trên bản web, ai mở công cụ nhà phát triển cũng đổi được vai. Hiệu lực thật chỉ có khi máy chủ kiểm lại vai ở từng thao tác.',
  manhHon:
    'Trên bản máy tính, vai nằm trong két đã mã hoá cùng hồ sơ. Đổi vai phải mở được két, tức là phải có mã khoá.',
  khongLangLe:
    'Thẻ bị ẩn luôn được đếm và nói rõ vai nào mở được. Ẩn mà không nói là cách chắc chắn để người dùng tưởng phần mềm hỏng.',
};

/* ------------------------- THẺ CẦN QUYỀN NÀO ---------------------------- */
/*
 * Mỗi thẻ neo vào ĐÚNG MỘT quyền có thật trong data/phanquyen.ts. Có bài
 * kiểm bắt buộc điều đó, nên không thể gõ nhầm tên quyền rồi khoá luôn một
 * thẻ với tất cả mọi người mà không ai biết.
 */
export const TAB_QUYEN: Record<string, string> = {
  /* Lộ trình, triết lý, tài liệu — nền chung, mọi vai đều thấy. */
  tuyen: 'q-xem-lo-trinh',
  chugita: 'q-xem-lo-trinh',
  gita: 'q-xem-lo-trinh',
  charter: 'q-xem-lo-trinh',
  myplan: 'q-xem-lo-trinh',
  sprint: 'q-xem-lo-trinh',
  dossier: 'q-xem-lo-trinh',
  assistant: 'q-xem-lo-trinh',
  overview: 'q-xem-lo-trinh',
  roadmap: 'q-xem-lo-trinh',
  chuyen: 'q-xem-lo-trinh',
  exams: 'q-xem-lo-trinh',
  methods: 'q-xem-lo-trinh',
  drills: 'q-xem-lo-trinh',
  lectures: 'q-xem-lo-trinh',
  giangsau: 'q-xem-lo-trinh',
  playbooks: 'q-xem-lo-trinh',
  habits: 'q-xem-lo-trinh',
  mindset: 'q-xem-lo-trinh',
  clubs: 'q-xem-lo-trinh',
  resources: 'q-xem-lo-trinh',
  chuan: 'q-xem-lo-trinh',
  academy: 'q-xem-lo-trinh',
  levels: 'q-xem-lo-trinh',
  brand: 'q-xem-lo-trinh',
  /* Hệ tài liệu và hai tuyến thi quốc tế — nền chung, mọi vai đều thấy. */
  decuong: 'q-xem-lo-trinh',
  baitest: 'q-xem-lo-trinh',
  camnang: 'q-xem-lo-trinh',
  sat: 'q-xem-lo-trinh',
  ielts9: 'q-xem-lo-trinh',
  /* Bảng phân quyền: ai cũng phải đọc được luật ràng buộc chính mình. */
  quyen: 'q-xem-lo-trinh',

  /* Làm bài — cần quyền làm phiếu. Cộng tác viên không có. */
  phieu: 'q-lam-phieu',
  chuyende: 'q-lam-phieu',
  lambai: 'q-lam-phieu',
  bode: 'q-lam-phieu',
  dethi: 'q-lam-phieu',

  /* Hồ sơ cá nhân — cần quyền xem hồ sơ của chính mình. */
  hoso: 'q-xem-ho-so-minh',

  /* Kho giải pháp: tầng 1–2 chưa tự tra, xem ghi chú ở q-mo-kho-giai-phap. */
  assess: 'q-mo-kho-giai-phap',

  /* Vận hành học viện. */
  grading: 'q-cham-chinh-thuc',
  certify: 'q-de-xuat-chung-nhan',
  training: 'q-xem-ho-so-lop',
  podcast: 'q-quan-ly-kho-giong',
  casting: 'q-quan-ly-kho-giong',
  studio: 'q-quan-ly-kho-giong',
};

/* --------------------------- VAI ĐANG DÙNG ------------------------------ */

export const PHIEN_KEY = 'engwin365.vai.v1';

/*
 * Vì sao mặc định là tầng 3 chứ không phải tầng 1 hay tầng 5.
 *
 * Tầng 1 thì người mở phần mềm lần đầu thấy quá ít thẻ và tưởng bản cài
 * hỏng. Tầng 5 thì phân quyền coi như không bật. Tầng 3 là tầng đông nhất
 * thật sự, và nó đủ để thấy ngay là có phân quyền — thẻ Kho giải pháp mở ở
 * đúng tầng này, còn các thẻ vận hành thì chưa.
 */
export const VAI_MAC_DINH = 'hv-3';

export const VAI_HOP_LE = (id: string): boolean => !!BAC_BY_ID[id];

export function docVai(): string {
  try {
    const v = localStorage.getItem(PHIEN_KEY);
    return v && VAI_HOP_LE(v) ? v : VAI_MAC_DINH;
  } catch {
    return VAI_MAC_DINH;
  }
}

export function luuVai(bacId: string): string {
  if (!VAI_HOP_LE(bacId)) return docVai();
  try {
    localStorage.setItem(PHIEN_KEY, bacId);
  } catch {
    /* chặn ghi thì vai chỉ sống trong phiên này, không sập giao diện */
  }
  return bacId;
}

/* ------------------- VAI TRONG KÉT CỦA BẢN MÁY TÍNH ---------------------- */
/*
 * Trên bản web, vai nằm trong bộ nhớ trình duyệt và ai cũng sửa được bằng
 * tay. Trên bản máy tính thì có chỗ tốt hơn: chính cái két đã mã hoá đang
 * giữ hồ sơ. Vai cất trong đó thì muốn đổi phải mở được két, tức là phải có
 * mã khoá — đây là chỗ DUY NHẤT trong cả hệ thống mà phân quyền có một hàng
 * rào thật, và nó chỉ tồn tại vì bản máy tính có két.
 *
 * localStorage vẫn được ghi song song, vì hai lý do: nó là bộ nhớ đệm đồng
 * bộ để lần dựng đầu tiên không nháy màn hình, và nó là chỗ duy nhất bản
 * web có. Két là nguồn sự thật; localStorage chỉ là bản sao.
 */

const KHOA_TRONG_KET = 'vai';

export const laBanMayTinh = (): boolean => typeof window !== 'undefined' && !!window.engwin;

/** Đọc vai từ két. Trả null khi không phải bản máy tính hoặc két đang khoá. */
export async function docVaiTuKet(): Promise<string | null> {
  const cau = typeof window !== 'undefined' ? window.engwin : undefined;
  if (!cau) return null;
  try {
    const r = await cau.vault.read();
    if (!r.ok || !r.data || typeof r.data !== 'object') return null;
    const v = (r.data as Record<string, unknown>)[KHOA_TRONG_KET];
    return typeof v === 'string' && VAI_HOP_LE(v) ? v : null;
  } catch {
    return null;
  }
}

/**
 * Ghi vai vào két, giữ nguyên mọi thứ khác đang nằm trong đó.
 *
 * Đọc rồi ghi đè cả object là cách chắc chắn để xoá mất hồ sơ khi hai chỗ
 * cùng ghi. Ở đây trải object cũ ra trước rồi mới đặt khoá vai lên trên.
 */
export async function luuVaiVaoKet(bacId: string): Promise<boolean> {
  const cau = typeof window !== 'undefined' ? window.engwin : undefined;
  if (!cau || !VAI_HOP_LE(bacId)) return false;
  try {
    const r = await cau.vault.read();
    if (!r.ok) return false;
    const cu = r.data && typeof r.data === 'object' ? (r.data as Record<string, unknown>) : {};
    const w = await cau.vault.write({...cu, [KHOA_TRONG_KET]: bacId});
    return w.ok;
  } catch {
    return false;
  }
}

/* ------------------------------ THI HÀNH -------------------------------- */

/** Vai này có mở được thẻ đó không. Hàm thuần. */
export function tabDuocXem(bacId: string, tabId: string): boolean {
  const can = TAB_QUYEN[tabId];
  // Thẻ chưa khai báo quyền thì KHÔNG mặc định mở. Quên khai báo phải là
  // lỗi thấy được ngay, không phải một lỗ hổng im lặng.
  if (!can) return false;
  return quyenCua(bacId).includes(can);
}

export const tabCuaVai = (bacId: string): string[] =>
  Object.keys(TAB_QUYEN).filter((t) => tabDuocXem(bacId, t));

/**
 * Vì sao vai này chưa mở được thẻ đó, và vai nào mở được.
 * Trả về null khi vai đã mở được thẻ — không có gì để giải thích.
 */
export function viSaoChan(
  bacId: string,
  tabId: string,
): {quyenId: string; tenQuyen: string; viSao: string; aiMoDuoc: BacQuyen[]} | null {
  if (tabDuocXem(bacId, tabId)) return null;
  const quyenId = TAB_QUYEN[tabId];
  const q = QUYEN_BY_ID[quyenId];
  return {
    quyenId,
    tenQuyen: q?.ten ?? quyenId,
    viSao: q?.viSaoChan ?? 'Thẻ này chưa được khai báo quyền, nên tạm khoá với mọi vai.',
    aiMoDuoc: BAC_QUYEN.filter((b) => quyenCua(b.id).includes(quyenId)),
  };
}

/** Tóm tắt phạm vi của một vai — dùng cho dải thông báo trên đầu màn hình. */
export function phamViVai(bacId: string, tatCaTab: string[]): {
  bac: BacQuyen | undefined;
  soQuyen: number;
  soTabMo: number;
  soTabAn: number;
  tabAn: string[];
} {
  const mo = tatCaTab.filter((t) => tabDuocXem(bacId, t));
  return {
    bac: BAC_BY_ID[bacId],
    soQuyen: quyenCua(bacId).length,
    soTabMo: mo.length,
    soTabAn: tatCaTab.length - mo.length,
    tabAn: tatCaTab.filter((t) => !tabDuocXem(bacId, t)),
  };
}

export const PHIEN_SO = {
  soTabKhaiBao: Object.keys(TAB_QUYEN).length,
  soVai: BAC_QUYEN.length,
  soQuyenDungLamCong: new Set(Object.values(TAB_QUYEN)).size,
  vaiMacDinh: VAI_MAC_DINH,
};
