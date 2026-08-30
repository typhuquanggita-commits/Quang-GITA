/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kiểm tầng SAT. Chạy: npx tsx tools/kiem-sat.ts
 *
 * BÀI KIỂM NÀY CHỦ YẾU KIỂM SỰ NHẤT QUÁN NỘI TẠI, VÀ ĐÓ LÀ CÓ CHỦ Ý
 *   Không bài kiểm nào chạy trên máy này xác minh được lịch thi của
 *   College Board là đúng — muốn thế phải mở trang chính thức, và đó là
 *   việc của người, hằng năm. Cái mã KIỂM ĐƯỢC là: các con số trong tài
 *   liệu có mâu thuẫn nhau không.
 *
 *   Mâu thuẫn nội tại là loại lỗi hay gặp nhất khi chép số từ ngoài vào:
 *   tỉ lệ bốn miền cộng lại 1,02; số câu mỗi mô-đun nhân lên không ra tổng
 *   đã ghi; một ngày thi rơi vào thứ Ba. Cả ba đều bắt được ở đây.
 */
import {
  SAT_SPEC, MODUN, MIEN, DANG_SAT, LICH_SAT, LE_PHI, LO_TRINH_SAT,
  MUC_TIEU_SAT, NHIP_LAM_BAI, soCauCuaMien, mienCuaPhan, dangCuaMien,
  kyThiKeTiep, SAT_SO, SAT_NGUON, SAT_CREED, THICH_UNG, BA_TUYEN,
} from '../data/sat';

let loi = 0;
const dat = (m: string) => console.log(`  ✓ ${m}`);
const hong = (m: string) => {
  loi++;
  console.log(`  ✗ ${m}`);
};

console.log('\n  KIỂM TẦNG SAT\n');

/* ---------------------- 1. TỔNG KHỚP VỚI BẢNG MÔ-ĐUN -------------------- */
{
  const dv = MODUN.filter((m) => m.phan === 'doc-viet');
  const t = MODUN.filter((m) => m.phan === 'toan');
  dv.length === 2 && t.length === 2
    ? dat('đúng hai mô-đun cho mỗi phần')
    : hong(`số mô-đun sai: đọc-viết ${dv.length}, toán ${t.length}`);

  SAT_SPEC.tongCau === 98
    ? dat(`tổng ${SAT_SPEC.tongCau} câu, khớp cấu trúc công bố`)
    : hong(`tổng câu ra ${SAT_SPEC.tongCau}, cấu trúc công bố là 98`);

  SAT_SPEC.tongPhutLamBai === 134
    ? dat(`tổng ${SAT_SPEC.tongPhutLamBai} phút làm bài, đúng 2 giờ 14 phút`)
    : hong(`tổng phút ra ${SAT_SPEC.tongPhutLamBai}, cấu trúc công bố là 134`);

  // Hai mô-đun của cùng một phần phải giống nhau về số câu và số phút —
  // đó là điều kiện để cơ chế thích ứng so sánh được hai nhánh.
  for (const p of ['doc-viet', 'toan'] as const) {
    const [a, b] = MODUN.filter((m) => m.phan === p);
    a.soCau === b.soCau && a.phut === b.phut
      ? dat(`hai mô-đun phần ${p} cân nhau: ${a.soCau} câu / ${a.phut} phút`)
      : hong(`hai mô-đun phần ${p} lệch nhau`);
  }
}

/* ------------------- 2. TỈ LỆ MIỀN CỘNG LẠI PHẢI BẰNG 1 ----------------- */
for (const p of ['doc-viet', 'toan'] as const) {
  const ms = mienCuaPhan(p);
  const tong = ms.reduce((s, m) => s + m.tyLe, 0);
  // So bằng số nguyên phần trăm để không dính sai số dấu phẩy động.
  const phanTram = ms.reduce((s, m) => s + Math.round(m.tyLe * 100), 0);
  phanTram === 100
    ? dat(`bốn miền phần ${p} cộng đúng 100% (${ms.map((m) => Math.round(m.tyLe * 100) + '%').join(' + ')})`)
    : hong(`bốn miền phần ${p} cộng lại ${phanTram}%, phải bằng 100% (tổng thực ${tong})`);

  const soCau = ms.reduce((s, m) => s + soCauCuaMien(m), 0);
  const canCo = p === 'doc-viet' ? SAT_SPEC.soCauDocViet : SAT_SPEC.soCauToan;
  soCau === canCo
    ? dat(`số câu suy ra từ tỉ lệ phần ${p} cộng đúng ${canCo} câu`)
    : hong(`số câu suy ra phần ${p} là ${soCau}, phải bằng ${canCo} — tỉ lệ và số câu đang mâu thuẫn`);
}

/* ----------------------- 3. MỌI MIỀN ĐỀU CÓ DẠNG BÀI -------------------- */
{
  const trong = MIEN.filter((m) => dangCuaMien(m.id).length === 0);
  trong.length
    ? hong(`${trong.length} miền không có dạng bài nào: ${trong.map((m) => m.ten).join(', ')}`)
    : dat(`cả ${MIEN.length} miền đều có dạng bài, tổng ${DANG_SAT.length} dạng`);

  const laId = new Set(MIEN.map((m) => m.id));
  for (const d of DANG_SAT) if (!laId.has(d.mienId)) hong(`dạng "${d.ten}" trỏ tới miền không có: ${d.mienId}`);

  const trung = DANG_SAT.map((d) => d.id).filter((x, i, a) => a.indexOf(x) !== i);
  trung.length ? hong(`mã dạng bị trùng: ${trung.join(', ')}`) : dat('mã dạng không trùng nhau');
}

/* --------------- 4. DẠNG BÀI PHẢI CÓ RUỘT, KHÔNG ĐƯỢC RỖNG ------------- */
{
  let mong = 0;
  for (const d of DANG_SAT) {
    if (d.buocGiai.length < 3) hong(`dạng "${d.ten}" chỉ có ${d.buocGiai.length} bước giải, cần ít nhất 3`) , mong++;
    for (const b of d.buocGiai)
      if (b.trim().length < 25) hong(`dạng "${d.ten}" có bước rỗng ruột: "${b}"`) , mong++;
    for (const [ten, v] of [['đọc vị', d.docVi], ['phương pháp', d.phuongPhap], ['bẫy', d.bay], ['bí kíp', d.biKip]] as const)
      if (v.trim().length < 40) hong(`dạng "${d.ten}" có ${ten} quá ngắn (${v.trim().length} ký tự)`) , mong++;
  }
  mong || dat(`cả ${DANG_SAT.length} dạng đều đủ bảy chiều và không chiều nào rỗng ruột`);
}

/* ------------- 5. NGƯỠNG GIÂY PHẢI DÙNG ĐƯỢC TRONG NHỊP THI ------------ */
/*
 * Một ngưỡng lớn hơn hai lần nhịp trung bình của phần là ngưỡng vô dụng:
 * làm theo nó thì hết giờ trước khi hết bài. Đây là chỗ lời khuyên nghe
 * hợp lý nhưng không chạy được trong phòng thi.
 */
{
  let qua = 0;
  for (const d of DANG_SAT) {
    const m = MIEN.find((x) => x.id === d.mienId)!;
    const nhip = NHIP_LAM_BAI.find((n) => n.phan === m.phan)!.giayMoiCau;
    if (d.nguongGiay > nhip * 2) {
      hong(`dạng "${d.ten}" đặt ngưỡng ${d.nguongGiay}s, quá gấp đôi nhịp ${nhip}s của phần — làm theo là hết giờ`);
      qua++;
    }
    if (d.nguongGiay < 20) hong(`dạng "${d.ten}" đặt ngưỡng ${d.nguongGiay}s, quá ngắn để làm được gì`) , qua++;
  }
  qua || dat('mọi ngưỡng giây đều nằm trong nhịp làm bài thật của phần tương ứng');

  // Trung bình ngưỡng của một phần không được vượt nhịp của phần đó, nếu
  // không thì làm đúng mọi ngưỡng vẫn vỡ giờ.
  for (const p of ['doc-viet', 'toan'] as const) {
    const ds = DANG_SAT.filter((d) => MIEN.find((m) => m.id === d.mienId)!.phan === p);
    const tb = ds.reduce((s, d) => s + d.nguongGiay, 0) / ds.length;
    const nhip = NHIP_LAM_BAI.find((n) => n.phan === p)!.giayMoiCau;
    tb <= nhip
      ? dat(`ngưỡng trung bình phần ${p} là ${Math.round(tb)}s, nằm trong nhịp ${nhip}s`)
      : hong(`ngưỡng trung bình phần ${p} là ${Math.round(tb)}s, vượt nhịp ${nhip}s — làm đúng mọi ngưỡng vẫn vỡ giờ`);
  }
}

/* ----------------------------- 6. LỊCH THI ----------------------------- */
{
  const THU = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  let saiThu = 0;
  for (const k of LICH_SAT) {
    // SAT luôn thi thứ Bảy. Ngày rơi vào thứ khác gần như chắc chắn là lỗi chép.
    const thu = new Date(k.ngayThi + 'T00:00:00Z').getUTCDay();
    if (thu !== 6) {
      hong(`ngày thi ${k.ngayThi} rơi vào ${THU[thu]} — SAT luôn thi thứ Bảy, nhiều khả năng chép sai`);
      saiThu++;
    }
    if (!(k.hanDangKy < k.ngayThi)) hong(`kỳ ${k.ngayThi} có hạn đăng ký ${k.hanDangKy} không nằm trước ngày thi`);
    const cach = (Date.parse(k.ngayThi) - Date.parse(k.hanDangKy)) / 86_400_000;
    if (cach < 7 || cach > 35)
      hong(`kỳ ${k.ngayThi} cách hạn đăng ký ${cach} ngày — ngoài khoảng hợp lý 7–35 ngày`);
  }
  saiThu || dat(`cả ${LICH_SAT.length} ngày thi đều rơi vào thứ Bảy`);

  const theoThuTu = LICH_SAT.every((k, i) => i === 0 || LICH_SAT[i - 1].ngayThi < k.ngayThi);
  theoThuTu ? dat('lịch thi xếp đúng thứ tự thời gian') : hong('lịch thi không xếp theo thứ tự thời gian');

  const k = kyThiKeTiep('2026-08-30');
  k && k.hanDangKy >= '2026-08-30'
    ? dat(`tra kỳ kế tiếp chạy đúng: từ 30/08/2026 ra kỳ thi ${k.ngayThi}`)
    : hong('hàm tra kỳ kế tiếp không trả về kỳ còn hạn');

  LE_PHI.tongNgoaiMy === LE_PHI.coBan + LE_PHI.phuThuNgoaiMy
    ? dat(`lệ phí ngoài Mỹ ${LE_PHI.tongNgoaiMy} ${LE_PHI.tienTe} cộng đúng từ hai phần`)
    : hong('lệ phí tổng không khớp hai phần cộng lại');
}

/* ------------------------- 7. LỘ TRÌNH VÀ MỤC TIÊU --------------------- */
{
  for (const c of LO_TRINH_SAT) {
    if (c.tuan <= 0) hong(`chặng "${c.ten}" có số tuần không dương`);
    if (c.lam.length < 3) hong(`chặng "${c.ten}" chỉ có ${c.lam.length} việc, quá mỏng để theo`);
    if (c.raKhiNao.trim().length < 30) hong(`chặng "${c.ten}" không nói rõ điều kiện ra chặng`);
  }
  const tang = LO_TRINH_SAT.map((c) => c.tang);
  tang.every((t, i) => i === 0 || t > tang[i - 1])
    ? dat(`lộ trình ${LO_TRINH_SAT.length} chặng tăng dần theo tầng, tổng ${SAT_SO.tongTuan} tuần`)
    : hong('các chặng lộ trình không tăng dần theo tầng');

  const diem = MUC_TIEU_SAT.map((m) => m.diem);
  diem.every((d) => d >= SAT_SPEC.diemTong.min && d <= SAT_SPEC.diemTong.max)
    ? dat(`cả ${diem.length} mốc điểm nằm trong thang ${SAT_SPEC.diemTong.min}–${SAT_SPEC.diemTong.max}`)
    : hong('có mốc điểm nằm ngoài thang điểm của bài thi');
  diem.every((d, i) => i === 0 || d > diem[i - 1])
    ? dat('các mốc điểm tăng dần')
    : hong('các mốc điểm không tăng dần');
}

/* ------------------ 8. LỜI KHAI PHẢI CÓ CHỖ ĐỠ TRONG DỮ LIỆU ----------- */
/*
 * Đây là mục chống khai khống: mọi câu khẳng định trong phần tuyên ngôn
 * đều phải có một con số hoặc một trường dữ liệu đỡ nó. Không có thì hoặc
 * bỏ câu đó đi, hoặc làm cho nó thành sự thật.
 */
{
  SAT_NGUON.canhBao.includes('collegeboard')
    ? dat('cảnh báo nguồn có chỉ đúng nơi phải đối chiếu lại')
    : hong('cảnh báo nguồn không chỉ ra nơi đối chiếu');

  SAT_CREED.nuaToan.includes('một nửa') && SAT_SPEC.diemMoiPhan.max * 2 === SAT_SPEC.diemTong.max
    ? dat('lời khai "toán chiếm một nửa điểm" khớp thang điểm: 800 × 2 = 1600')
    : hong('lời khai về nửa điểm toán không khớp thang điểm khai báo');

  THICH_UNG.hauQua.includes('TRẦN ĐIỂM') && THICH_UNG.daoNguoc.length > 60
    ? dat('cơ chế thích ứng nói rõ cả hậu quả lẫn hệ quả chiến thuật')
    : hong('mô tả cơ chế thích ứng thiếu hậu quả hoặc hệ quả chiến thuật');

  const coToan = BA_TUYEN.filter((t) => t.coToan);
  coToan.length === 1 && coToan[0].tuyen === 'SAT'
    ? dat('bảng ba tuyến chỉ ra đúng một tuyến có toán, và đó là SAT')
    : hong('bảng ba tuyến khai sai về tuyến nào có toán');
}

console.log(
  `\n  ${loi === 0 ? `ĐẠT — tầng SAT không mâu thuẫn nội tại (${SAT_SO.soDang} dạng, ${SAT_SO.soMien} miền, ${SAT_SO.soKyThi} kỳ thi)` : `HỎNG — ${loi} lỗi`}\n`,
);
process.exit(loi === 0 ? 0 : 1);
