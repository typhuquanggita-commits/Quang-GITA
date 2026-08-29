/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {LoaiPhieu, PhieuChuyenDe, PhieuGiai, SkillId} from '../types';
import {DANG_BAI} from './phieu';
import {GIAI_BY_DANG} from './giaide';

/* ==========================================================================
   BỘ PHIẾU THEO CHUYÊN ĐỀ

   Tám mươi chuyên đề. Mỗi chuyên đề một BỘ BẢY phiếu đi theo đúng thứ tự học
   một chuyên đề từ đầu tới lúc thi được:

     1. LÝ THUYẾT        — hiểu bản chất trước, chưa làm bài
     2. DẠNG BÀI + ĐỌC VỊ — nhận ra đề đang hỏi gì trong ba giây
     3. KỸ NĂNG PHƯƠNG PHÁP — quy trình làm, thành thói quen tay
     4. LUYỆN NÂNG CAO   — câu khó và câu bẫy
     5. ÔN THI           — trộn dạng, bấm giờ
     6. THI              — đúng điều kiện phòng thi
     7. ÔN CHẮC          — chốt lại để không rơi rụng sau ba tháng

   VÀ MỖI PHIẾU CÓ MỘT PHIẾU GIẢI RIÊNG ĐI KÈM
   Phiếu giải không chỉ có đáp án. Nó có BẢNG PHÂN TÍCH CHUYÊN SÂU: mỗi điểm
   kiến thức được nói rõ bản chất là gì và hay bị nhầm với cái gì. Đáp án cho
   biết mình sai; bảng phân tích cho biết mình sai VÌ ĐÂU — và chỉ cái thứ hai
   mới sửa được cho lần sau.

   THỨ TỰ KHÔNG ĐẢO ĐƯỢC
   Nhảy thẳng vào phiếu 5 và 6 là cách học phổ biến nhất và cũng kém hiệu quả
   nhất: học sinh luyện đề khi chưa đọc vị được dạng bài, nên mỗi câu là một
   câu mới và không có gì tích luỹ. Bộ bảy phiếu này chặn đúng chỗ đó.

   VÌ SAO TÁM MƯƠI CHUYÊN ĐỀ CHỨ KHÔNG PHẢI CON SỐ KHÁC
   Chuyên đề ở đây LẤY THẲNG tám mươi dạng bài đã có, không dựng danh sách
   mới. Một chuyên đề là một thứ luyện được và đo được — nếu tách nhỏ hơn thì
   không đủ một buổi học, gộp to hơn thì không đo được đã chắc hay chưa.
   ========================================================================== */

export const CHUYENDE_CREED = {
  name: 'BỘ PHIẾU THEO CHUYÊN ĐỀ',
  claim:
    'Tám mươi chuyên đề, mỗi chuyên đề bảy phiếu theo đúng thứ tự học, và mỗi phiếu một phiếu giải riêng kèm bảng phân tích chuyên sâu.',
  thuTu:
    'Bảy phiếu đi theo thứ tự và không đảo được. Nhảy thẳng vào phiếu ôn thi là cách học phổ biến nhất và kém hiệu quả nhất: luyện đề khi chưa đọc vị được dạng bài thì mỗi câu là một câu mới, không có gì tích luỹ.',
  giaiKhongChiLaDapAn:
    'Phiếu giải có bảng phân tích chuyên sâu, không chỉ có đáp án. Đáp án cho biết mình sai; bảng phân tích cho biết mình sai VÌ ĐÂU — và chỉ cái thứ hai mới sửa được cho lần sau.',
  moKhiNao:
    'Phiếu giải chỉ mở sau khi đã nộp phiếu chính. Mở trước thì học sinh đọc lời giải rồi tưởng mình đã hiểu, và đó là cảm giác quen thuộc chứ không phải năng lực.',
};

/* --------------------------- BẢY LOẠI PHIẾU ----------------------------- */

export const LOAI_PHIEU: LoaiPhieu[] = [
  {
    no: 1, ma: 'LT', ten: 'PHIẾU LÝ THUYẾT',
    mucDich: 'Hiểu bản chất của chuyên đề trước khi chạm vào bất kỳ câu hỏi nào.',
    cauTruc: [
      'Câu hỏi lõi mà cả chuyên đề tồn tại để trả lời',
      'Bản chất: điều gì thật sự đang diễn ra ở đây',
      'Ba tới năm điểm kiến thức, mỗi điểm một ví dụ tối thiểu',
      'Chỗ tiếng Việt và tiếng Anh khác nhau — nguồn của phần lớn lỗi',
      'Năm câu tự kiểm hiểu, không chấm điểm',
    ],
    phut: 25,
    khiNaoLam: 'Buổi đầu tiên của chuyên đề. Chưa làm bài tập nào trước đó.',
    raGi: 'Nói lại được bản chất chuyên đề trong ba câu, không nhìn tài liệu.',
    giaiCo: [
      'Đáp án năm câu tự kiểm',
      'Bảng phân tích: mỗi điểm kiến thức nói rõ bản chất và hay bị nhầm với cái gì',
      'Ba hiểu nhầm phổ biến nhất về chuyên đề này',
    ],
    chanNeu: 'Không chặn. Đây là phiếu vào cửa.',
  },
  {
    no: 2, ma: 'DB', ten: 'PHIẾU DẠNG BÀI VÀ ĐỌC VỊ',
    mucDich: 'Nhìn một câu là biết ngay nó thuộc dạng nào và đang hỏi cái gì.',
    cauTruc: [
      'Bảng nhận dạng: dấu hiệu nào cho biết câu thuộc dạng này',
      'Mười câu chỉ để ĐỌC VỊ, không giải — nói câu này hỏi gì',
      'Ba dạng gần giống dễ nhầm, và cách phân biệt',
      'Từ khoá trong đề bài báo hiệu dạng',
      'Năm câu vừa đọc vị vừa giải',
    ],
    phut: 30,
    khiNaoLam: 'Ngay sau phiếu lý thuyết, cùng tuần.',
    raGi: 'Đọc vị đúng dạng của mười câu trong dưới ba giây mỗi câu.',
    giaiCo: [
      'Đáp án đọc vị từng câu, kèm dấu hiệu đã dùng để nhận ra',
      'Bảng phân tích: vì sao ba dạng gần giống dễ nhầm, và ranh giới thật nằm ở đâu',
      'Lời giải năm câu cuối',
    ],
    chanNeu: 'Chưa qua phiếu lý thuyết thì đọc vị chỉ là đoán theo hình dạng câu.',
  },
  {
    no: 3, ma: 'KN', ten: 'PHIẾU KỸ NĂNG VÀ PHƯƠNG PHÁP',
    mucDich: 'Biến quy trình làm bài thành thói quen tay, không phải kiến thức nhớ được.',
    cauTruc: [
      'Quy trình bốn bước, viết ra để dán lên bàn',
      'Mỗi bước một câu làm mẫu có lời dẫn từng thao tác',
      'Mười câu làm theo đúng quy trình, ghi lại thời gian từng câu',
      'Ba chỗ hay bỏ bước, và hậu quả của việc bỏ',
      'Bảng theo dõi thời gian trung bình mỗi câu qua bảy ngày',
    ],
    phut: 35,
    khiNaoLam: 'Tuần thứ hai của chuyên đề, sau khi đã đọc vị được.',
    raGi: 'Làm mười câu theo đúng quy trình mà không cần nhìn bảng quy trình.',
    giaiCo: [
      'Lời giải mười câu theo đúng bốn bước, để đối chiếu từng bước',
      'Bảng phân tích: bỏ bước nào thì hỏng ở đâu',
      'Thời gian tham chiếu mỗi câu ở từng mức',
    ],
    chanNeu: 'Chưa đọc vị được dạng thì quy trình không có chỗ áp vào.',
  },
  {
    no: 4, ma: 'NC', ten: 'PHIẾU LUYỆN NÂNG CAO',
    mucDich: 'Gặp câu khó và câu bẫy trong điều kiện an toàn, trước khi gặp chúng ở phòng thi.',
    cauTruc: [
      'Năm câu khó có yếu tố gây nhiễu',
      'Năm câu bẫy dựng theo đúng ba bẫy của chuyên đề',
      'Ba câu kết hợp chuyên đề này với một chuyên đề đã học trước',
      'Hai câu không thuộc dạng — để luyện việc nhận ra và bỏ qua',
      'Ô ghi lại câu nào mình mất trên hai phút',
    ],
    phut: 40,
    khiNaoLam: 'Tuần thứ ba, khi quy trình đã thành phản xạ.',
    raGi: 'Đúng ít nhất tám trên mười lăm câu, và nhận ra được hai câu không thuộc dạng.',
    giaiCo: [
      'Lời giải từng câu khó, chỉ rõ yếu tố gây nhiễu nằm ở đâu',
      'Với câu bẫy: bẫy này là bẫy nào trong ba bẫy của chuyên đề',
      'Bảng phân tích: vì sao câu kết hợp khó hơn tổng hai câu riêng lẻ',
    ],
    chanNeu: 'Chưa làm chắc phiếu kỹ năng thì câu bẫy chỉ gây nản, không dạy được gì.',
  },
  {
    no: 5, ma: 'OT', ten: 'PHIẾU ÔN THI',
    mucDich: 'Trộn dạng và bấm giờ — mô phỏng điều kiện đề thật nhưng chưa tính điểm.',
    cauTruc: [
      'Hai mươi câu trộn dạng, không nhóm theo loại',
      'Bấm giờ theo định mức của đề thật',
      'Ô ghi thời gian còn lại sau mỗi năm câu',
      'Phần cuối: ba câu của chuyên đề khác đã học, để kiểm việc chuyển dạng',
      'Ô tự chấm và ô ghi câu bỏ trống',
    ],
    phut: 30,
    khiNaoLam: 'Tuần thứ tư, hoặc bất kỳ lúc nào cần ôn lại chuyên đề cũ.',
    raGi: 'Đúng từ mười sáu trên hai mươi trong đúng định mức thời gian.',
    giaiCo: [
      'Đáp án nhanh dạng bảng để tự chấm trong hai phút',
      'Lời giải đầy đủ cho câu sai',
      'Bảng phân tích theo dạng: sai nhiều nhất ở dạng nào',
      'Phân tích nhịp thời gian: chậm ở đoạn nào của phiếu',
    ],
    chanNeu: 'Chưa qua phiếu nâng cao thì đây chỉ là làm đề sớm, và điểm thấp gây nản mà không chỉ ra được gì.',
  },
  {
    no: 6, ma: 'TH', ten: 'PHIẾU THI',
    mucDich: 'Đo thật, trong đúng điều kiện phòng thi, có tính điểm vào hồ sơ.',
    cauTruc: [
      'Đúng cấu trúc và đúng định mức thời gian của đề thật',
      'Không được dừng, không được tra, không được làm lại',
      'Làm trong điều kiện gây nhiễu nhẹ nếu đã ở tầng ba trở lên',
      'Nộp xong mới được mở phiếu giải',
      'Điểm ghi vào hồ sơ học viên',
    ],
    phut: 30,
    khiNaoLam: 'Cuối chuyên đề, và lặp lại sau ba tháng để kiểm độ bền.',
    raGi: 'Một con số vào hồ sơ, dùng để xét chuyên đề đã chắc hay chưa.',
    giaiCo: [
      'Đáp án đầy đủ kèm lời giải từng câu',
      'Bảng phân tích chuyên sâu theo điểm kiến thức, không theo câu',
      'Đối chiếu với lần thi trước của chính chuyên đề này',
      'Kết luận: chuyên đề đã chắc, cần ôn lại, hay cần học lại từ phiếu nào',
    ],
    chanNeu: 'Chưa đạt phiếu ôn thi thì thi chỉ tạo ra một con số thấp trong hồ sơ mà không dạy thêm gì.',
  },
  {
    no: 7, ma: 'OC', ten: 'PHIẾU HƯỚNG DẪN ÔN CHẮC CHUYÊN ĐỀ',
    mucDich: 'Chốt chuyên đề lại để nó không rơi rụng sau ba tháng không đụng tới.',
    cauTruc: [
      'Một trang tóm: bản chất, quy trình bốn bước, ba bẫy',
      'Lịch ôn lại theo giãn cách: sau 7, 21 và 90 ngày',
      'Năm câu mốc — làm lại đúng năm câu này ở mỗi lần ôn',
      'Bảng ghi điểm năm câu mốc qua các lần ôn',
      'Dấu hiệu chuyên đề đang rơi rụng, và làm gì khi thấy dấu hiệu đó',
    ],
    phut: 15,
    khiNaoLam: 'Ngay sau phiếu thi, rồi lặp lại ở mốc 7, 21 và 90 ngày.',
    raGi: 'Năm câu mốc giữ được điểm qua ba lần ôn cách nhau — đó mới là chắc.',
    giaiCo: [
      'Đáp án năm câu mốc',
      'Bảng phân tích: điểm nào rơi trước nếu không ôn, và vì sao đúng điểm đó',
      'Ngưỡng cảnh báo: tụt bao nhiêu thì phải quay lại phiếu nào',
    ],
    chanNeu: 'Không chặn, nhưng làm phiếu này trước khi thi thì không có gì để chốt.',
  },
];

/* ------------------------ SINH BỘ PHIẾU CHUYÊN ĐỀ ----------------------- */

let cachePhieu: PhieuChuyenDe[] | null = null;
let cacheGiai: PhieuGiai[] | null = null;

function sinh(): {phieu: PhieuChuyenDe[]; giai: PhieuGiai[]} {
  const phieu: PhieuChuyenDe[] = [];
  const giai: PhieuGiai[] = [];

  for (const d of DANG_BAI) {
    const g = GIAI_BY_DANG[d.id];
    for (const l of LOAI_PHIEU) {
      const pid = `cd-${d.id.slice(2)}-${l.ma}`;
      const gid = `cdg-${d.id.slice(2)}-${l.ma}`;
      phieu.push({
        id: pid,
        chuyenDeId: d.id,
        chuyenDeTen: d.ten,
        skill: d.skill as SkillId,
        loaiNo: l.no,
        loaiMa: l.ma,
        loaiTen: l.ten,
        ten: `${d.ten} — ${l.ten.replace('PHIẾU ', '')}`,
        mucDich: l.mucDich,
        cauTruc: l.cauTruc,
        phut: l.phut,
        khiNaoLam: l.khiNaoLam,
        raGi: l.raGi,
        chanNeu: l.chanNeu,
        giaiId: gid,
      });

      giai.push({
        id: gid,
        phieuId: pid,
        chuyenDeId: d.id,
        ten: `Lời giải và phân tích — ${d.ten} · ${l.ten.replace('PHIẾU ', '')}`,
        // Bảng phân tích chuyên sâu: mỗi điểm kiến thức của chuyên đề được
        // nói rõ bản chất, và nói rõ nó hay bị nhầm với cái gì. Phần "hay
        // nhầm với" lấy từ chính ba bẫy của chuyên đề, nên nó không phải
        // suy đoán mà là thứ đã quan sát được ở người học.
        bangPhanTich: g.diemKienThuc.map((diem, i) => ({
          diem,
          banChat: g.cachNghi[Math.min(i, g.cachNghi.length - 1)],
          hayNhamVoi: g.bay[Math.min(i, g.bay.length - 1)].chon,
        })),
        cachNghi: g.cachNghi,
        bay: [...g.bay],
        tuKiem: g.tuKiemDapAn,
        neuSai: l.no >= 5 ? g.neuSai : 'Làm lại đúng phiếu này rồi mới đi tiếp, chưa cần đổi kế hoạch.',
        moKhiNao:
          l.no === 6
            ? 'Chỉ mở sau khi đã nộp phiếu thi. Điểm đã ghi vào hồ sơ thì không sửa được.'
            : 'Chỉ mở sau khi đã làm xong phiếu chính. Mở trước là đọc lời giải rồi tưởng mình hiểu.',
      });
    }
  }
  return {phieu, giai};
}

export function phieuChuyenDe(): PhieuChuyenDe[] {
  if (!cachePhieu) {
    const r = sinh();
    cachePhieu = r.phieu;
    cacheGiai = r.giai;
  }
  return cachePhieu;
}

export function phieuGiai(): PhieuGiai[] {
  if (!cacheGiai) phieuChuyenDe();
  return cacheGiai!;
}

/** Bộ bảy phiếu của một chuyên đề, đúng thứ tự. */
export const boCuaChuyenDe = (dangId: string): PhieuChuyenDe[] =>
  phieuChuyenDe().filter((p) => p.chuyenDeId === dangId).sort((a, b) => a.loaiNo - b.loaiNo);

export const giaiCuaPhieu = (phieuId: string): PhieuGiai | undefined =>
  phieuGiai().find((g) => g.phieuId === phieuId);

export const CHUYENDE_SO = {
  soChuyenDe: DANG_BAI.length,
  soLoai: LOAI_PHIEU.length,
  soPhieu: DANG_BAI.length * LOAI_PHIEU.length,
  soPhieuGiai: DANG_BAI.length * LOAI_PHIEU.length,
  tongPhieu: DANG_BAI.length * LOAI_PHIEU.length * 2,
  tongPhut: DANG_BAI.length * LOAI_PHIEU.reduce((s, l) => s + l.phut, 0),
};
