/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kiểm tầng nghe: kịch bản, tệp âm, và câu hỏi gắn với tiếng.
 * Chạy: npx tsx tools/kiem-nghe.ts
 *
 * KIỂM CẢ TỆP ÂM THẬT, KHÔNG CHỈ KIỂM DỮ LIỆU
 *   Một câu hỏi nghe mà tệp âm không tồn tại thì không trả lời được — và
 *   đó là loại hỏng người dùng gặp trước bài kiểm. Nên bài kiểm này mở
 *   từng tệp, đo độ dài thật, rồi đối chiếu nhịp nói với con số đã khai.
 */
import {existsSync, statSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {KICH_BAN, GIONG, NGHE_SO, NGHE_CREED, soTu, tepAm, kichBanCuaChuyenDe} from '../data/nghe';
import {NGAN_HANG_NGHE, NGHE_BANK_SO} from '../data/nganhang-nghe';

let loi = 0;
const dat = (m: string) => console.log(`  ✓ ${m}`);
const hong = (m: string) => {
  loi++;
  console.log(`  ✗ ${m}`);
};

console.log('\n  KIỂM TẦNG NGHE\n');

/* ---------------------- 1. KỊCH BẢN CÓ RUỘT ---------------------------- */
{
  const ids = KICH_BAN.map((k) => k.id);
  ids.length === new Set(ids).size ? dat(`${ids.length} mã kịch bản đều duy nhất`) : hong('có mã kịch bản trùng');

  let xau = 0;
  for (const k of KICH_BAN) {
    const n = soTu(k.loi);
    if (n < 25) hong(`kịch bản ${k.id} chỉ ${n} từ, quá ngắn để hỏi bốn câu`), xau++;
    if (n > 120) hong(`kịch bản ${k.id} tới ${n} từ, quá dài để nghe lại nhiều lần`), xau++;
    if (!GIONG[k.giong]) hong(`kịch bản ${k.id} khai giọng không có: ${k.giong}`), xau++;
    if (k.nhipTu < 100 || k.nhipTu > 260) hong(`kịch bản ${k.id} khai nhịp ${k.nhipTu} từ/phút, ngoài khoảng nói được`), xau++;
    // Lời phải là tiếng Anh: không được lẫn dấu tiếng Việt vào bản ghi âm.
    if (/[àáảãạăâđêôơưèéẻẽẹìíỉĩịòóỏõọùúủũụỳýỷỹỵ]/i.test(k.loi))
      hong(`kịch bản ${k.id} có ký tự tiếng Việt trong lời thoại tiếng Anh`), xau++;
  }
  xau || dat(`cả ${KICH_BAN.length} kịch bản đủ dài, đúng giọng có thật, và thuần tiếng Anh`);

  const theoChuyenDe = new Map<string, number>();
  for (const k of KICH_BAN) theoChuyenDe.set(k.chuyenDeId, (theoChuyenDe.get(k.chuyenDeId) ?? 0) + 1);
  const it = [...theoChuyenDe].filter(([, n]) => n < 3);
  it.length
    ? hong(`chuyên đề dưới ba kịch bản: ${it.map(([c, n]) => `${c}(${n})`).join(', ')}`)
    : dat(`cả ${theoChuyenDe.size} chuyên đề nghe đều có ít nhất ba kịch bản`);
}

/* ------------------- 2. BỐN GIỌNG ĐỀU ĐƯỢC DÙNG ------------------------ */
{
  const dung = new Set(KICH_BAN.map((k) => k.giong));
  dung.size === Object.keys(GIONG).length
    ? dat(`cả ${dung.size} giọng đều được dùng — không giọng nào khai mà bỏ không`)
    : hong(`chỉ ${dung.size}/${Object.keys(GIONG).length} giọng được dùng thật`);
}

/* -------------- 3. TỆP ÂM TỒN TẠI VÀ ĐÚNG NHỊP ĐÃ KHAI ----------------- */
{
  const doGiay = (f: string): number | null => {
    try {
      return parseFloat(
        execFileSync('ffprobe', ['-v', 'quiet', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], {
          encoding: 'utf8',
        }).trim(),
      );
    } catch {
      return null;
    }
  };

  let thieu = 0;
  let lechNhieu = 0;
  let tong = 0;
  const nhipDo: {id: string; khai: number; that: number}[] = [];
  for (const k of KICH_BAN) {
    const f = tepAm(k.id);
    if (!existsSync(f)) {
      hong(`không có tệp âm ${f} — chạy python3 tools/sinh-am-nghe.py`);
      thieu++;
      continue;
    }
    tong += statSync(f).size;
    const giay = doGiay(f);
    if (giay === null || giay <= 0) {
      hong(`tệp âm ${f} không đọc được độ dài`);
      continue;
    }
    const that = (soTu(k.loi) / giay) * 60;
    nhipDo.push({id: k.id, khai: k.nhipTu, that});
    const lech = Math.abs(that - k.nhipTu) / k.nhipTu;
    if (lech > 0.08) {
      hong(`${k.id} khai ${k.nhipTu} từ/phút nhưng tệp âm đo ra ${that.toFixed(0)} (lệch ${(lech * 100).toFixed(0)}%)`);
      lechNhieu++;
    }
  }
  if (!thieu && !lechNhieu)
    dat(`cả ${KICH_BAN.length} tệp âm tồn tại và đo đúng nhịp đã khai trong sai số 8% — tổng ${(tong / 1024 / 1024).toFixed(1)} MB`);

  /*
   * Chuyên đề "nghe tốc độ nhanh" phải NHANH HƠN THẬT so với mọi chuyên đề
   * khác. Bản đầu khai nhanh bằng hệ số dài âm và đo ra bằng đúng tốc độ
   * thường — nhãn nói dối mà không ai biết. Mục này chặn lại điều đó.
   */
  const nhanh = nhipDo.filter((n) => n.id.startsWith('kb-l09')).map((n) => n.that);
  const thuong = nhipDo.filter((n) => !n.id.startsWith('kb-l09')).map((n) => n.that);
  if (nhanh.length && thuong.length) {
    const chamNhatCuaNhanh = Math.min(...nhanh);
    const nhanhNhatCuaThuong = Math.max(...thuong);
    chamNhatCuaNhanh > nhanhNhatCuaThuong
      ? dat(`chuyên đề nghe nhanh thật sự nhanh hơn: chậm nhất ${chamNhatCuaNhanh.toFixed(0)} > nhanh nhất của nhóm còn lại ${nhanhNhatCuaThuong.toFixed(0)} từ/phút`)
      : hong(`nhãn "nghe nhanh" nói dối: bài chậm nhất của nhóm nhanh (${chamNhatCuaNhanh.toFixed(0)}) không nhanh hơn bài nhanh nhất của nhóm thường (${nhanhNhatCuaThuong.toFixed(0)})`);
  }
}

/* ---------- 4. CÂU HỎI TRỎ ĐÚNG KỊCH BẢN, VÀ ĐÚNG CHUYÊN ĐỀ ------------ */
{
  const laKb = new Map(KICH_BAN.map((k) => [k.id, k]));
  let lac = 0;
  for (const c of NGAN_HANG_NGHE) {
    if (!c.kichBanId) continue;
    const kb = laKb.get(c.kichBanId);
    if (!kb) {
      hong(`câu ${c.id} trỏ vào kịch bản không có: ${c.kichBanId}`);
      lac++;
      continue;
    }
    /*
     * Câu ĐƯỢC PHÉP trỏ sang kịch bản của chuyên đề khác — vài câu tổng kết
     * cố ý hỏi lại bài đã nghe ở chuyên đề trước. Nhưng phải là kịch bản có
     * thật, và bài kiểm đếm số lần chéo để con số đó không âm thầm phình.
     */
  }
  lac || dat('mọi câu có tiếng đều trỏ vào một kịch bản có thật');

  const cheo = NGAN_HANG_NGHE.filter(
    (c) => c.kichBanId && laKb.get(c.kichBanId)!.chuyenDeId !== c.chuyenDeId,
  );
  cheo.length <= 6
    ? dat(`${cheo.length} câu cố ý hỏi lại kịch bản của chuyên đề khác — trong ngưỡng cho phép`)
    : hong(`${cheo.length} câu trỏ sang chuyên đề khác, vượt ngưỡng 6 — nhiều khả năng gán nhầm`);

  NGHE_BANK_SO.soCauCoTieng + NGHE_BANK_SO.soCauLyThuyet === NGHE_BANK_SO.soCau
    ? dat(`${NGHE_BANK_SO.soCauCoTieng} câu có tiếng + ${NGHE_BANK_SO.soCauLyThuyet} câu lý thuyết = ${NGHE_BANK_SO.soCau} câu`)
    : hong('số câu có tiếng cộng câu lý thuyết không bằng tổng số câu');

  // Mỗi chuyên đề phải có phần lớn câu gắn tiếng, nếu không thì nó là
  // chuyên đề lý thuyết đội lốt chuyên đề nghe.
  const theo = new Map<string, {co: number; tong: number}>();
  for (const c of NGAN_HANG_NGHE) {
    const t = theo.get(c.chuyenDeId) ?? {co: 0, tong: 0};
    t.tong++;
    if (c.kichBanId) t.co++;
    theo.set(c.chuyenDeId, t);
  }
  const yeu = [...theo].filter(([, t]) => t.co < t.tong * 0.6);
  yeu.length
    ? hong(`chuyên đề có dưới 60% câu gắn tiếng: ${yeu.map(([c, t]) => `${c} ${t.co}/${t.tong}`).join(', ')}`)
    : dat('mọi chuyên đề nghe đều có ít nhất 60% số câu gắn với tiếng thật');

  // Mỗi kịch bản phải được ít nhất một câu dùng tới; kịch bản không ai hỏi
  // là công sinh âm bỏ đi.
  const duocDung = new Set(NGAN_HANG_NGHE.map((c) => c.kichBanId).filter(Boolean));
  const boKhong = KICH_BAN.filter((k) => !duocDung.has(k.id));
  boKhong.length
    ? hong(`${boKhong.length} kịch bản không câu nào hỏi tới: ${boKhong.map((k) => k.id).join(', ')}`)
    : dat(`cả ${KICH_BAN.length} kịch bản đều có câu hỏi dùng tới`);
}

/* ------------------- 5. LỜI TỰ NHẬN PHẢI ĐÚNG -------------------------- */
{
  NGHE_CREED.gioiHanGiongMay.includes('KHÔNG thay được')
    ? dat('nói thẳng giọng máy không thay được người thật ở phần đoán thái độ')
    : hong('không nói rõ giới hạn của giọng máy');
  NGHE_CREED.khongChep.includes('bản quyền')
    ? dat('nói rõ không chép ngữ liệu có bản quyền')
    : hong('không nói rõ lập trường về bản quyền ngữ liệu');
  /sai/i.test(NGHE_CREED.loiCu)
    ? dat('ghi thẳng lý do cũ "chưa có audio" là sai, không lặng lẽ sửa')
    : hong('không ghi lại lý do cũ đã sai ở đâu');
  /*
   * Bản đầu của mục này là một phép tính vòng vo tự triệt tiêu, nên nó
   * LUÔN đúng — một bài kiểm giả. Nay so từng con số của bảng với dữ liệu
   * tính lại độc lập.
   */
  const dungSo =
    NGHE_SO.soKichBan === KICH_BAN.length &&
    NGHE_SO.soChuyenDe === new Set(KICH_BAN.map((k) => k.chuyenDeId)).size &&
    NGHE_SO.soGiong === Object.keys(GIONG).length &&
    NGHE_SO.tongTu === KICH_BAN.reduce((s, k) => s + soTu(k.loi), 0) &&
    NGHE_SO.soCoNhieu === KICH_BAN.filter((k) => k.nhieuDb !== undefined).length &&
    NGHE_SO.nhipNhanhNhat === Math.max(...KICH_BAN.map((k) => k.nhipTu)) &&
    NGHE_SO.nhipChamNhat === Math.min(...KICH_BAN.map((k) => k.nhipTu));
  dungSo
    ? dat('cả bảy con số trong bảng đều tính lại được từ dữ liệu, không gõ tay')
    : hong('có con số trong bảng không khớp khi tính lại từ dữ liệu');

  kichBanCuaChuyenDe('d-l01').length === 3
    ? dat('hàm tra kịch bản theo chuyên đề trả về đúng số bản')
    : hong('hàm tra kịch bản theo chuyên đề trả sai');
}

console.log(
  `\n  ${loi === 0 ? `ĐẠT — ${KICH_BAN.length} kịch bản, ${NGHE_BANK_SO.soCau} câu (${NGHE_BANK_SO.soCauCoTieng} có tiếng), ${Object.keys(GIONG).length} giọng` : `HỎNG — ${loi} lỗi`}\n`,
);
process.exit(loi === 0 ? 0 : 1);
