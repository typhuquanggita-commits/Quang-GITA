/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {CauHoi} from '../types';

/* ==========================================================================
   XOAY VỊ TRÍ ĐÁP ÁN — DÙNG CHUNG CHO MỌI NGÂN HÀNG CÂU HỎI

   VÌ SAO PHẢI XOAY
     Người soạn đề luôn có thói quen viết đáp án đúng ra trước rồi mới nghĩ
     ba phương án nhiễu. Hệ quả là đáp án dồn vào ô A và ô B. Bản đầu của
     ngân hàng câu hỏi có 74 trên 120 câu đúng ở ô B — đoán bừa ô B trúng
     62%, tức là bài kiểm đo thói quen của người soạn chứ không đo học viên.

     Xoay ở đây là phép xoay TẤT ĐỊNH theo số thứ tự câu, không ngẫu nhiên:
     cùng một dữ liệu luôn cho cùng một đề, nên đáp án in ra hôm nay và hôm
     sau vẫn khớp nhau. Nhận xét đi theo lựa chọn khi xoay, nếu không thì
     lời nhận xét sẽ dán vào nhầm phương án.

   KHI NÀO PHẢI GIỮ NGUYÊN THỨ TỰ
     Một số câu có bốn lựa chọn mang thứ tự tự thân — "âm tiết một / hai /
     ba / bốn", hay các mốc tăng dần. Xoay chúng thì bốn lựa chọn hoá vô
     nghĩa. Những câu đó liệt kê trong tập giữ thứ tự của từng ngân hàng.
   ========================================================================== */

export function taoXoay(giuThuTu: Set<string>) {
  return function xoayCho(
    id: string, no: number,
    luaChon: [string, string, string, string], dapAn: number,
    nhanXet: [string, string, string, string],
  ) {
    const dich = giuThuTu.has(id) ? 0 : (((no - 1) % 4) - dapAn + 4) % 4;
    const lay = <T,>(a: T[]): [T, T, T, T] =>
      [a[(0 - dich + 4) % 4], a[(1 - dich + 4) % 4], a[(2 - dich + 4) % 4], a[(3 - dich + 4) % 4]];
    return {luaChon: lay(luaChon), dapAn: (dapAn + dich) % 4, nhanXet: lay(nhanXet)};
  };
}

/**
 * Bộ dựng câu hỏi. Người soạn luôn viết đáp án đúng ở vị trí tự nhiên của
 * mình, rồi phép xoay lo phần rải đều — nên không ai phải tự nhớ "câu này
 * đến lượt ô C".
 */
export function taoC(giuThuTu: Set<string>) {
  const xoay = taoXoay(giuThuTu);
  return function C(
    chuyenDeId: string, loaiMa: string, no: number, deBai: string,
    luaChon: [string, string, string, string], dapAn: number,
    giaiThich: string, nhanXet: [string, string, string, string],
    diemKienThuc: string, bayNo?: number, kichBanId?: string,
  ): CauHoi {
    const id = `q-${chuyenDeId.slice(2)}-${loaiMa}-${String(no).padStart(2, '0')}`;
    return {
      id, chuyenDeId, loaiMa, no, deBai, giaiThich, diemKienThuc,
      ...xoay(id, no, luaChon, dapAn, nhanXet),
      ...(bayNo === undefined ? {} : {bayNo}),
      ...(kichBanId === undefined ? {} : {kichBanId}),
    };
  };
}
