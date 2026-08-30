/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {DeThiMau, CauDeThi} from '../types';
import {DE_THI_MAU} from './dethi';

/* ==========================================================================
   BỘ CHẤM BÀI THI THỬ

   NGUYÊN TẮC GỐC: MÁY CHỈ KHẲNG ĐỊNH THỨ NÓ CHỨNG MINH ĐƯỢC
     Câu trắc nghiệm thì máy chấm chắc chắn: chọn đúng ô là đúng, hết
     chuyện. Câu tự luận thì không — người học viết "In spite of the rain"
     trong khi đáp án mẫu ghi "Despite the rain" là ĐÚNG, mà không phép so
     chuỗi nào bắt được mọi biến thể như thế.

     Nên bộ chấm này chia ba trạng thái chứ không hai:
       · ĐÚNG      — khớp đáp án sau khi chuẩn hoá, máy dám khẳng định
       · CHƯA LÀM  — bỏ trống, không cần ai chấm
       · TỰ CHẤM   — có viết nhưng không khớp chuỗi; máy KHÔNG kết luận sai

     Chỗ quan trọng nhất: một câu tự luận không khớp KHÔNG bị gọi là sai.
     Máy đưa đáp án mẫu ra và để người học tự đối chiếu. Báo sai cho một
     câu có thể đúng là cách nhanh nhất làm học viên mất niềm tin vào cả bộ
     đề — và niềm tin mất thì không lấy lại được bằng một bản vá.

   HỆ QUẢ: KẾT QUẢ LUÔN LÀ HAI CON SỐ, KHÔNG PHẢI MỘT
     "Điểm đã chấm được" là phần máy chứng minh được. "Điểm chờ tự chấm" là
     phần còn treo. Gộp hai số đó thành một con số duy nhất là bịa ra độ
     chính xác không có thật, nên bộ chấm này không bao giờ làm thế.
   ========================================================================== */

export const CHAMTHI_CREED = {
  name: 'BỘ CHẤM BÀI THI THỬ',
  claim:
    'Trắc nghiệm chấm tự động và chắc chắn. Tự luận chỉ được khẳng định ĐÚNG khi khớp đáp án; không khớp thì chuyển sang tự chấm chứ không bị gọi là sai.',
  khongGopDiem:
    'Kết quả luôn là hai con số: điểm đã chấm được, và điểm còn chờ tự chấm. Gộp thành một số duy nhất là bịa ra độ chính xác không có thật.',
  khongBaoSaiOan:
    'Máy không kết luận SAI cho câu tự luận. Người học viết "In spite of" trong khi mẫu ghi "Despite" là đúng, mà không phép so chuỗi nào bắt được mọi biến thể.',
};

/* ------------------------------ CHUẨN HOÁ ------------------------------- */
/*
 * Chuẩn hoá để so, KHÔNG để sửa bài của người học. Mọi phép ở đây đều là
 * phép bỏ qua khác biệt vô nghĩa: hoa thường, khoảng trắng thừa, dấu nháy,
 * dấu chấm cuối, và ba kiểu viết mũi tên khác nhau.
 */
export const chuanHoa = (s: string): string =>
  s
    .toLowerCase()
    .replace(/[→⇒]|->|=>/g, '>')     // ba kiểu mũi tên về một
    .replace(/["'“”‘’]/g, '')          // bỏ mọi loại nháy
    .replace(/[.,;!?]+\s*$/, '')       // bỏ dấu câu ở cuối
    .replace(/\s*>\s*/g, ' > ')        // chuẩn khoảng trắng quanh mũi tên
    .replace(/\s+/g, ' ')
    .trim();

/**
 * Tách các đáp án được chấp nhận từ một chuỗi đáp án mẫu.
 *
 * Đáp án mẫu có thể ghi kèm biến thể: "Despite of → Despite (hoặc In spite
 * of)". Bỏ qua phần trong ngoặc thì học viên viết biến thể đúng vẫn bị coi
 * là không khớp — nên phải tách ra thành nhiều đáp án được chấp nhận.
 */
export function cacDapAnNhan(dapAn: string): string[] {
  const ra: string[] = [];
  const ngoac = /\((?:hoặc|hay)\s+([^)]+)\)/gi;
  const chinh = dapAn.replace(ngoac, '').trim();
  ra.push(chinh);
  for (const m of dapAn.matchAll(ngoac)) {
    ra.push(m[1].trim());
    /*
     * Biến thể thường chỉ nêu VẾ SAU của một phép sửa lỗi: "Despite of →
     * Despite (hoặc In spite of)". Nên ghép biến thể vào vế trước để nhận
     * cả dạng đầy đủ mà người học hay viết.
     */
    const mui = chinh.split(/\s*(?:→|⇒|->|=>)\s*/);
    if (mui.length === 2) ra.push(`${mui[0]} → ${m[1].trim()}`);
  }
  return ra.map(chuanHoa).filter((x) => x.length > 0);
}

/** Câu này có đáp án duy nhất để máy chấm được không. */
export const chamMayDuoc = (c: CauDeThi): boolean =>
  !!c.luaChon || !/xem barem/i.test(c.dapAn);

/* ------------------------------ KẾT QUẢ --------------------------------- */

export type TrangThaiCau = 'dung' | 'sai' | 'chua-lam' | 'tu-cham';

export interface KetQuaCau {
  no: number;
  phanNo: number;
  trangThai: TrangThaiCau;
  daTraLoi: string;
  diemDat: number;
  diemToiDa: number;
}

export interface KetQuaPhanThi {
  no: number;
  ten: string;
  diemDat: number;
  diemChoTuCham: number;
  diemToiDa: number;
  soDung: number;
  soSai: number;
  soChuaLam: number;
  soTuCham: number;
}

export interface KetQuaDeThi {
  deId: string;
  /** Điểm máy chứng minh được. */
  diemDat: number;
  /** Điểm còn treo, chờ người học tự đối chiếu với đáp án mẫu. */
  diemChoTuCham: number;
  tongDiem: number;
  cau: KetQuaCau[];
  phan: KetQuaPhanThi[];
  soDung: number;
  soSai: number;
  soChuaLam: number;
  soTuCham: number;
  /** Giây đã dùng, do giao diện truyền vào. */
  giayDaDung: number;
}

const lam = (n: number) => Number(n.toFixed(3));

/** Chấm một câu. Hàm thuần — không đọc trạng thái nào ngoài hai tham số. */
export function chamCauThi(c: CauDeThi, traLoi: string | undefined): TrangThaiCau {
  const dap = (traLoi ?? '').trim();
  if (dap === '') return 'chua-lam';
  if (c.luaChon) return dap === c.dapAn ? 'dung' : 'sai';
  // Câu không có đáp án duy nhất thì luôn để người học tự chấm.
  if (!chamMayDuoc(c)) return 'tu-cham';
  return cacDapAnNhan(c.dapAn).includes(chuanHoa(dap)) ? 'dung' : 'tu-cham';
}

/**
 * Chấm cả đề.
 *
 * `baiLam` là bảng tra từ số thứ tự câu sang câu trả lời. Dùng số thứ tự
 * chứ không dùng chỉ số mảng, vì số thứ tự là thứ hiện trên màn hình và là
 * thứ người học nói tới khi hỏi bài.
 */
export function chamDeThi(
  de: DeThiMau,
  baiLam: Record<number, string>,
  giayDaDung = 0,
): KetQuaDeThi {
  const cau: KetQuaCau[] = [];
  const phan: KetQuaPhanThi[] = [];

  for (const p of de.phan) {
    let dat = 0;
    let treo = 0;
    let toiDa = 0;
    let dung = 0;
    let sai = 0;
    let chua = 0;
    let tu = 0;
    for (const c of p.cau) {
      const tt = chamCauThi(c, baiLam[c.no]);
      toiDa += c.diem;
      if (tt === 'dung') {
        dat += c.diem;
        dung++;
      } else if (tt === 'sai') {
        sai++;
      } else if (tt === 'chua-lam') {
        chua++;
      } else {
        treo += c.diem;
        tu++;
      }
      cau.push({
        no: c.no,
        phanNo: p.no,
        trangThai: tt,
        daTraLoi: (baiLam[c.no] ?? '').trim(),
        diemDat: tt === 'dung' ? lam(c.diem) : 0,
        diemToiDa: lam(c.diem),
      });
    }
    phan.push({
      no: p.no,
      ten: p.ten,
      diemDat: lam(dat),
      diemChoTuCham: lam(treo),
      diemToiDa: lam(toiDa),
      soDung: dung,
      soSai: sai,
      soChuaLam: chua,
      soTuCham: tu,
    });
  }

  return {
    deId: de.id,
    diemDat: lam(phan.reduce((s, p) => s + p.diemDat, 0)),
    diemChoTuCham: lam(phan.reduce((s, p) => s + p.diemChoTuCham, 0)),
    tongDiem: de.tongDiem,
    cau,
    phan,
    soDung: phan.reduce((s, p) => s + p.soDung, 0),
    soSai: phan.reduce((s, p) => s + p.soSai, 0),
    soChuaLam: phan.reduce((s, p) => s + p.soChuaLam, 0),
    soTuCham: phan.reduce((s, p) => s + p.soTuCham, 0),
    giayDaDung,
  };
}

/* --------------------------- ĐỌC KẾT QUẢ -------------------------------- */
/*
 * Một con số không tự nói lên điều gì. Ba câu dưới đây nói cho người học
 * biết con số đó nghĩa là gì và việc tiếp theo là gì — và chúng KHÔNG hứa
 * hẹn gì về kỳ thi thật.
 */
export function docKetQua(kq: KetQuaDeThi): string[] {
  const ra: string[] = [];
  const tyLe = kq.tongDiem > 0 ? kq.diemDat / kq.tongDiem : 0;

  if (kq.soTuCham > 0) {
    ra.push(
      `Còn ${kq.soTuCham} câu chờ tự chấm, đáng ${kq.diemChoTuCham} điểm. Máy không kết luận đúng sai cho chúng vì một câu tự luận có nhiều cách viết đúng — hãy đối chiếu với đáp án mẫu rồi tự cộng vào.`,
    );
  }
  if (kq.soChuaLam > 0) {
    ra.push(
      `Bỏ trống ${kq.soChuaLam} câu. Đề này không trừ điểm câu sai, nên bỏ trống luôn tệ hơn đoán — lần sau còn một phút thì điền hết.`,
    );
  }

  if (tyLe >= 0.8) {
    ra.push(
      'Phần chấm được đã trên 80%. Việc đáng làm tiếp không phải làm thêm đề mà là soi lại đúng những câu sai: ở mức này, lỗi bất cẩn thường nhiều hơn lỗi kiến thức.',
    );
  } else if (tyLe >= 0.5) {
    ra.push(
      'Phần chấm được nằm trong khoảng 50–80%. Xem bảng theo phần bên dưới: nếu một phần tụt hẳn so với các phần còn lại thì dồn giờ vào đúng phần đó, đừng luyện đều tay.',
    );
  } else {
    ra.push(
      'Phần chấm được dưới 50%. Ở mức này, làm thêm đề chưa giúp được nhiều — quay lại phiếu chuyên đề của những dạng bài đang sai để vá nền trước.',
    );
  }

  const yeu = [...kq.phan].sort(
    (a, b) => a.diemDat / (a.diemToiDa || 1) - b.diemDat / (b.diemToiDa || 1),
  )[0];
  if (yeu && kq.phan.length > 1) {
    ra.push(
      `Phần yếu nhất là "${yeu.ten}": ${yeu.diemDat}/${yeu.diemToiDa} điểm, sai ${yeu.soSai} câu và bỏ trống ${yeu.soChuaLam} câu.`,
    );
  }
  return ra;
}

/* ------------------------------ LƯU TRỮ --------------------------------- */

export const BAITHI_KEY = 'engwin365.baithi.v1';
export const BAITHI_TOI_DA = 50;

export interface LanThi {
  id: string;
  deId: string;
  luc: string;
  diemDat: number;
  diemChoTuCham: number;
  tongDiem: number;
  soDung: number;
  soSai: number;
  soChuaLam: number;
  soTuCham: number;
  giayDaDung: number;
}

export function docLichSuThi(): LanThi[] {
  try {
    const raw = localStorage.getItem(BAITHI_KEY);
    if (!raw) return [];
    const ds = JSON.parse(raw);
    return Array.isArray(ds) ? ds : [];
  } catch {
    // Dữ liệu hỏng thì coi như chưa có, không làm sập giao diện.
    return [];
  }
}

export function luuLanThi(kq: KetQuaDeThi, luc = new Date().toISOString()): LanThi[] {
  const ban: LanThi = {
    id: `${kq.deId}@${luc}`,
    deId: kq.deId,
    luc,
    diemDat: kq.diemDat,
    diemChoTuCham: kq.diemChoTuCham,
    tongDiem: kq.tongDiem,
    soDung: kq.soDung,
    soSai: kq.soSai,
    soChuaLam: kq.soChuaLam,
    soTuCham: kq.soTuCham,
    giayDaDung: kq.giayDaDung,
  };
  const ds = [...docLichSuThi(), ban].slice(-BAITHI_TOI_DA);
  try {
    localStorage.setItem(BAITHI_KEY, JSON.stringify(ds));
  } catch {
    // Hết chỗ hoặc bị chặn thì vẫn trả về danh sách trong bộ nhớ, không sập.
  }
  return ds;
}

export function xoaLichSuThi(): void {
  try {
    localStorage.removeItem(BAITHI_KEY);
  } catch {
    /* không có gì để làm thêm */
  }
}

/* ------------------------- BÀI ĐANG LÀM DỞ ------------------------------ */
/*
 * Người học nạp lại trang giữa lúc đang thi — vì lỡ tay, vì mất mạng, vì
 * máy hết pin. Mất sạch bài đang làm ở phút thứ tám mươi là chỗ khiến người
 * ta bỏ hẳn công cụ, nên bài dở được ghi lại sau mỗi lần trả lời.
 *
 * Ghi cả MỐC BẮT ĐẦU chứ không ghi số giây còn lại: đồng hồ phải chạy tiếp
 * đúng theo thời gian thật, kể cả khi trang đóng. Ghi số giây còn lại thì
 * đóng trang là đồng hồ dừng, và bài thi thử mất hết ý nghĩa về giờ giấc.
 */
export const DANG_THI_KEY = 'engwin365.dangthi.v1';

export interface BaiDangLam {
  deId: string;
  batDauLuc: number;
  baiLam: Record<number, string>;
}

export function docBaiDangLam(): BaiDangLam | null {
  try {
    const raw = localStorage.getItem(DANG_THI_KEY);
    if (!raw) return null;
    const o = JSON.parse(raw);
    if (!o || typeof o.deId !== 'string' || typeof o.batDauLuc !== 'number') return null;
    return {deId: o.deId, batDauLuc: o.batDauLuc, baiLam: o.baiLam ?? {}};
  } catch {
    return null;
  }
}

export function luuBaiDangLam(b: BaiDangLam): void {
  try {
    localStorage.setItem(DANG_THI_KEY, JSON.stringify(b));
  } catch {
    /* hết chỗ thì vẫn thi được, chỉ mất khả năng khôi phục */
  }
}

export function xoaBaiDangLam(): void {
  try {
    localStorage.removeItem(DANG_THI_KEY);
  } catch {
    /* không có gì để làm thêm */
  }
}

/** Số giây còn lại của một bài đang làm, tính từ mốc bắt đầu thật. */
export function giayConLai(de: DeThiMau, batDauLuc: number, bayGio = Date.now()): number {
  return Math.max(0, de.phut * 60 - Math.floor((bayGio - batDauLuc) / 1000));
}

export const CHAMTHI_SO = {
  soDe: DE_THI_MAU.length,
  soCauChamMayDuoc: DE_THI_MAU.flatMap((d) => d.phan.flatMap((p) => p.cau)).filter(chamMayDuoc).length,
  soCauPhaiTuCham: DE_THI_MAU.flatMap((d) => d.phan.flatMap((p) => p.cau)).filter((c) => !chamMayDuoc(c)).length,
  soTrangThai: 4,
};
