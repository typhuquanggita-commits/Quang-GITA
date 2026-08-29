/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Suy ra nhịp học từ tổng giờ và số tuần.
 *
 * Vì sao phải suy ra thay vì viết tay: tám khoá trong hệ thống từng ghi
 * "45 phút mỗi ngày" cho mọi khoá, bất kể khoá dài 10 giờ hay 37 giờ. Với khoá
 * 10 giờ trong 6 tuần, con số đó ngụ ý 31 giờ — gấp ba lần nội dung thật. Số
 * viết tay luôn trôi khỏi số thật; số suy ra thì không thể.
 *
 * Quy ước: học 5 ngày mỗi tuần, chừa hai ngày cho việc ngấm và cho đời sống.
 */
export const NGAY_MOI_TUAN = 5;

export function nhipHoc(tongGio: number, soTuan: number): string {
  const phutMoiNgay = Math.round((tongGio * 60) / (soTuan * NGAY_MOI_TUAN) / 5) * 5;
  return `${soTuan} tuần · ${phutMoiNgay} phút mỗi ngày · ${NGAY_MOI_TUAN} ngày mỗi tuần`;
}
