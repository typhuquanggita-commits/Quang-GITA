/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {SkillId, LanLam, PhanTichHoSo, ViecCaNhan, Phieu, KetQuaPhieu} from '../types';
import {phieuLuyen, NGUONG_DAT, PHIEU_TOI_THIEU, KHUNG} from './phieu';
import {GIAI_BY_DANG} from './giaide';
import {LEVELS} from './levels';

/* ==========================================================================
   HỒ SƠ HỌC VIÊN

   Mỗi lần làm phiếu để lại một bản ghi. Bản ghi tích luỹ thành hồ sơ, và hồ
   sơ sinh ra lộ trình cá nhân hoá — bằng phép tính trên số liệu thật, không
   bằng lời khuyên chung chung.

   BA ĐIỀU QUYẾT ĐỊNH THIẾT KẾ

   1. Hồ sơ nằm trên MÁY CỦA NGƯỜI HỌC, không gửi đi đâu. Bản máy tính lưu
      trong két đã mã hoá; bản web lưu trong bộ nhớ trình duyệt. Đổi máy là
      mất hồ sơ, và điều đó được nói rõ chứ không giấu.

   2. Phân tích chỉ nói khi ĐỦ DỮ LIỆU. Dưới ba lần làm thì không kết luận xu
      hướng — đoán xu hướng từ hai điểm là việc mà con số không cho phép.

   3. Lộ trình cá nhân hoá luôn kèm BẰNG CHỨNG. Mỗi việc được đề nghị đều dẫn
      ra con số đã dẫn tới đề nghị đó. Lời khuyên không có bằng chứng thì
      người học không có cách nào kiểm, và cũng không có lý do gì để tin.
   ========================================================================== */

export const HOSO_CREED = {
  name: 'HỒ SƠ HỌC VIÊN',
  claim:
    'Mỗi lần làm phiếu để lại một bản ghi. Bản ghi tích luỹ thành hồ sơ, và hồ sơ sinh ra lộ trình cá nhân hoá bằng phép tính trên số liệu thật.',
  oDau:
    'Hồ sơ nằm trên máy của người học, không gửi đi đâu. Bản máy tính lưu trong két đã mã hoá; bản web lưu trong bộ nhớ trình duyệt. Đổi máy hoặc xoá dữ liệu trình duyệt là mất hồ sơ.',
  duDuLieu:
    'Phân tích chỉ kết luận xu hướng khi có từ ba lần làm trở lên. Đoán xu hướng từ hai điểm là việc con số không cho phép, và hệ thống nói thẳng là chưa đủ dữ liệu thay vì đoán bừa.',
  bangChung:
    'Mỗi việc trong lộ trình cá nhân hoá đều dẫn ra con số đã dẫn tới nó. Lời khuyên không có bằng chứng thì người học không có cách nào kiểm.',
};

/* ------------------------------ LƯU TRỮ --------------------------------- */

export const HOSO_KEY = 'engwin365.hoso.v1';
export const HOSO_TOI_DA = 500;

/** Đọc hồ sơ. Trả mảng rỗng khi chưa có gì hoặc khi dữ liệu hỏng. */
export function docHoSo(): LanLam[] {
  try {
    const raw = localStorage.getItem(HOSO_KEY);
    if (!raw) return [];
    const ds = JSON.parse(raw);
    return Array.isArray(ds) ? ds : [];
  } catch {
    // Dữ liệu hỏng thì coi như chưa có, không làm sập giao diện.
    return [];
  }
}

/**
 * Ghi thêm một lần làm.
 *
 * Giữ tối đa HOSO_TOI_DA bản ghi gần nhất. Không giữ vô hạn: bộ nhớ trình
 * duyệt có hạn, và phân tích chỉ cần lịch sử gần.
 */
export function luuLanLam(p: Phieu, kq: KetQuaPhieu, luc = new Date().toISOString()): LanLam[] {
  const ban: LanLam = {
    id: `${p.id}@${luc}`,
    phieuId: p.id,
    luc,
    dungTungPhan: kq.tungPhan.map((x) => x.dung),
    tiLe: kq.tiLe,
    datKpi: kq.datKpi,
    phanYeuNhat: kq.phanYeuNhat,
    skill: p.skill,
    levelId: p.levelId,
  };
  const ds = [...docHoSo(), ban].slice(-HOSO_TOI_DA);
  try {
    localStorage.setItem(HOSO_KEY, JSON.stringify(ds));
  } catch {
    // Hết chỗ hoặc bị chặn thì vẫn trả về danh sách trong bộ nhớ, không sập.
  }
  return ds;
}

export function xoaHoSo(): void {
  try {
    localStorage.removeItem(HOSO_KEY);
  } catch {
    /* không có gì để làm thêm */
  }
}

/* ----------------------------- PHÂN TÍCH -------------------------------- */

export const DU_DE_KET_LUAN = 3;

const tb = (xs: number[]): number =>
  xs.length ? Number((xs.reduce((s, x) => s + x, 0) / xs.length).toFixed(1)) : 0;

/**
 * Phân tích toàn bộ hồ sơ. Hàm thuần: đưa vào danh sách, trả ra kết luận.
 *
 * Xu hướng so trung bình nửa sau với nửa đầu. Chênh dưới ba điểm phần trăm
 * thì gọi là đi ngang — dao động tự nhiên giữa các lần làm lớn hơn mức đó,
 * nên gọi là lên hay xuống ở dưới ngưỡng ấy là đọc nhiễu thành tín hiệu.
 */
export function phanTichHoSo(ds: LanLam[]): PhanTichHoSo {
  const soLan = ds.length;
  const diem = ds.map((x) => x.tiLe);
  const trungBinh = tb(diem);
  const soDat = ds.filter((x) => x.datKpi).length;

  let xuHuong: PhanTichHoSo['xuHuong'] = 'chưa đủ dữ liệu';
  if (soLan >= DU_DE_KET_LUAN) {
    const nua = Math.floor(soLan / 2);
    const chenh = tb(diem.slice(nua)) - tb(diem.slice(0, nua || 1));
    xuHuong = chenh > 3 ? 'đang lên' : chenh < -3 ? 'đang xuống' : 'đi ngang';
  }

  const kys = [...new Set(ds.map((x) => x.skill))];
  const theoKyNang = kys
    .map((skill) => {
      const con = ds.filter((x) => x.skill === skill);
      return {skill, soLan: con.length, trungBinh: tb(con.map((x) => x.tiLe))};
    })
    .sort((a, b) => a.trungBinh - b.trungBinh);

  const theoPhan = KHUNG.map((k, i) => ({
    ma: k.ma,
    trungBinh: tb(ds.map((x) => ((x.dungTungPhan[i] ?? 0) / k.soCau) * 100)),
  })).sort((a, b) => a.trungBinh - b.trungBinh);

  const canhBao: string[] = [];
  if (soLan > 0 && soLan < PHIEU_TOI_THIEU)
    canhBao.push(`Mới ${soLan} lần làm. Cần tối thiểu ${PHIEU_TOI_THIEU} phiếu ở một cấp mới xét nâng.`);
  if (xuHuong === 'đang xuống')
    canhBao.push('Điểm đang xuống qua các lần gần đây. Kiểm giấc ngủ và khối lượng trước khi kết luận là do năng lực.');
  if (soLan >= DU_DE_KET_LUAN && new Set(ds.map((x) => x.skill)).size === 1)
    canhBao.push('Chỉ luyện đúng một kỹ năng. Chênh lệch giữa các kỹ năng sẽ kéo tổng điểm xuống.');
  if (soLan >= DU_DE_KET_LUAN && theoPhan[0].trungBinh < 60)
    canhBao.push(
      `Phần ${KHUNG.find((k) => k.ma === theoPhan[0].ma)?.ten ?? theoPhan[0].ma} dưới 60% qua nhiều lần — đây là lỗ hổng thật, không phải cẩu thả.`,
    );

  // Chuỗi ngày: đếm số ngày khác nhau có ít nhất một lần làm, tính lùi từ
  // ngày gần nhất và dừng ngay khi gặp một ngày trống.
  const ngay = [...new Set(ds.map((x) => x.luc.slice(0, 10)))].sort().reverse();
  let chuoi = 0;
  if (ngay.length) {
    const moc = new Date(ngay[0]);
    for (let i = 0; ; i++) {
      const d = new Date(moc);
      d.setDate(d.getDate() - i);
      if (ngay.includes(d.toISOString().slice(0, 10))) chuoi++;
      else break;
    }
  }

  return {
    soLan,
    soPhieuKhac: new Set(ds.map((x) => x.phieuId)).size,
    trungBinh,
    tiLeDat: soLan ? Number(((soDat / soLan) * 100).toFixed(1)) : 0,
    xuHuong,
    theoKyNang,
    theoPhan,
    manhNhat: theoKyNang.length ? theoKyNang[theoKyNang.length - 1].skill : '',
    yeuNhat: theoKyNang.length ? theoKyNang[0].skill : '',
    chuoiNgay: chuoi,
    canhBao,
  };
}

/* ----------------------- LỘ TRÌNH CÁ NHÂN HOÁ --------------------------- */

const TEN_KY: Record<string, string> = {
  listening: 'Nghe', speaking: 'Nói', reading: 'Đọc', writing: 'Viết',
  vocabulary: 'Từ vựng', grammar: 'Ngữ pháp', pronunciation: 'Phát âm', mindset: 'Tư duy',
};

const TEN_PHAN: Record<string, string> = {
  KHOI: 'KHỞI', MAU: 'MẪU', DAN: 'DẪN', TU: 'TỰ', CHUOI: 'CHUỖI',
};

/**
 * Sinh lộ trình cá nhân hoá từ phân tích.
 *
 * Tối đa ba việc, đúng theo luật của kho giải pháp: kê nhiều hơn ba là cách
 * chắc chắn để không việc nào được làm đủ liều.
 */
export function loTrinhCaNhan(pt: PhanTichHoSo, ds: LanLam[]): ViecCaNhan[] {
  if (!pt.soLan) return [];
  const ra: ViecCaNhan[] = [];
  const P = phieuLuyen();
  const capHienTai = ds.length ? ds[ds.length - 1].levelId : LEVELS[0].id;

  // 1. Kỹ năng yếu nhất — ưu tiên cao nhất khi đã đủ dữ liệu.
  if (pt.theoKyNang.length && pt.soLan >= DU_DE_KET_LUAN) {
    const y = pt.theoKyNang[0];
    const goi = P.find((p) => p.skill === y.skill && p.levelId === capHienTai);
    const giai = goi ? GIAI_BY_DANG[goi.dangId] : undefined;
    ra.push({
      uuTien: 1,
      viec: `Dồn hai tuần vào kỹ năng ${TEN_KY[y.skill] ?? y.skill}.`,
      viSao: 'Đây là kỹ năng thấp nhất trong hồ sơ, và chênh lệch giữa các kỹ năng kéo tổng điểm xuống mạnh hơn người ta tưởng.',
      bangChung: `${TEN_KY[y.skill] ?? y.skill} trung bình ${y.trungBinh}% qua ${y.soLan} lần, thấp nhất trong ${pt.theoKyNang.length} kỹ năng đã làm.`,
      phieuGoiY: goi?.id ?? '',
      baiGiangGoiY: giai?.baiGiangIds[0] ?? '',
      tuan: 2,
    });
  }

  // 2. Phần yếu nhất trong cấu trúc phiếu — nói lên chỗ đứt của quy trình.
  if (pt.theoPhan.length && pt.soLan >= DU_DE_KET_LUAN) {
    const f = pt.theoPhan[0];
    const ten = TEN_PHAN[f.ma] ?? f.ma;
    const viSao: Record<string, string> = {
      KHOI: 'Sai ở phần KHỞI nghĩa là kiến thức cũ chưa vững, không phải bài mới khó.',
      MAU: 'Sai ở phần MẪU khi có mẫu trước mặt nghĩa là chưa đọc kỹ mẫu, không phải chưa biết.',
      DAN: 'Sai ở phần DẪN khi còn giàn giáo nghĩa là đang phụ thuộc mẫu nhiều hơn mình tưởng.',
      TU: 'Phần TỰ là phần đo thật. Thấp ở đây là chỗ cần chữa trước mọi chỗ khác.',
      CHUOI: 'Cao ở bốn phần đầu mà thấp ở CHUỖI nghĩa là biết từng mảnh nhưng chưa ghép được.',
    };
    ra.push({
      uuTien: 2,
      viec: `Luyện riêng phần ${ten} trong ba tuần, chọn phiếu có phần đó nặng.`,
      viSao: viSao[f.ma] ?? 'Đây là phần thấp nhất trong cấu trúc phiếu.',
      bangChung: `Phần ${ten} trung bình ${f.trungBinh}% qua ${pt.soLan} lần làm, thấp nhất trong năm phần.`,
      phieuGoiY: '',
      baiGiangGoiY: '',
      tuan: 3,
    });
  }

  // 3. Nhịp — chỉ nói khi có căn cứ, và nói đúng một trong ba tình huống.
  if (pt.chuoiNgay <= 1 && pt.soLan >= 2) {
    ra.push({
      uuTien: 3,
      viec: 'Đặt mức sàn mười phút cho ngày tệ nhất và giữ chuỗi bảy ngày.',
      viSao: 'Chuỗi ngày đứt thì mọi kỹ thuật bên dưới đều không kịp cộng dồn.',
      bangChung: `Chuỗi ngày hiện tại là ${pt.chuoiNgay}. Hồ sơ có ${pt.soLan} lần làm nhưng không liên tiếp.`,
      phieuGoiY: P.find((p) => p.dangId === 'd-m01' && p.levelId === capHienTai)?.id ?? '',
      baiGiangGoiY: 'td02',
      tuan: 1,
    });
  } else if (pt.xuHuong === 'đang xuống') {
    ra.push({
      uuTien: 3,
      viec: 'Giảm khối lượng một phần ba trong hai tuần và ghi giờ ngủ mỗi ngày.',
      viSao: 'Điểm đi xuống trong khi vẫn làm đều thường là dấu hiệu quá tải, không phải dấu hiệu mất năng lực.',
      bangChung: `Trung bình nửa sau thấp hơn nửa đầu qua ${pt.soLan} lần làm.`,
      phieuGoiY: P.find((p) => p.dangId === 'd-m06' && p.levelId === capHienTai)?.id ?? '',
      baiGiangGoiY: 'td07',
      tuan: 2,
    });
  } else if (pt.tiLeDat >= NGUONG_DAT && pt.soLan >= PHIEU_TOI_THIEU) {
    ra.push({
      uuTien: 3,
      viec: 'Xin xét nâng cấp độ với cố vấn.',
      viSao: 'Đã đủ số phiếu và đủ tỉ lệ đạt. Hệ thống không tự nâng — nâng cấp là quyết định của người, và cần một bài thi cấp độ.',
      bangChung: `${pt.soLan} lần làm, tỉ lệ đạt ${pt.tiLeDat}%, trung bình ${pt.trungBinh}%.`,
      phieuGoiY: '',
      baiGiangGoiY: '',
      tuan: 1,
    });
  }

  return ra.slice(0, 3);
}

export const HOSO_SO = {
  toiDa: HOSO_TOI_DA,
  duDeKetLuan: DU_DE_KET_LUAN,
  soViecToiDa: 3,
};
