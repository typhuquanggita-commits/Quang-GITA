/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {TestChuyenSau, BacSau, SkillId} from '../types';
import {TRU} from './giangsau';

/* ==========================================================================
   HỆ THỐNG BÀI TEST CHUYÊN SÂU

   KHÁC BÀI CHẤM ĐIỂM Ở CHỖ NÀO
     Bài chấm điểm trả lời câu hỏi "được bao nhiêu". Bài test chuyên sâu trả
     lời câu hỏi khác hẳn: "GÃY Ở ĐÂU".

     Hai học viên cùng được 6 trên 10 có thể gãy ở hai chỗ hoàn toàn khác
     nhau — một em chưa có kiến thức, một em có kiến thức nhưng không áp
     được vào câu lạ. Cùng một con số, hai đơn thuốc ngược nhau. Bài chấm
     điểm không phân biệt được hai em đó; bài này thì có.

   CÁCH LÀM: THANG BẬC, KHÔNG PHẢI BỘ CÂU
     Mỗi bài test là một thang năm bậc, mỗi bậc sâu hơn bậc trước ĐÚNG MỘT
     nấc. Học viên đi lên tới khi dừng. Bậc dừng lại chính là chẩn đoán —
     không cần tính điểm, không cần trung bình.

     Vì thang có thứ tự nên nó cho biết nhiều hơn một con số: dừng ở bậc 2
     nghĩa là nhớ được mà chưa hiểu; dừng ở bậc 4 nghĩa là hiểu và áp được
     nhưng chưa chuyển sang tình huống lạ. Hai chỗ dừng ấy cần hai cách chữa
     khác nhau, và mỗi bậc ghi sẵn cách chữa của nó.

   NĂM BẬC LẤY TỪ ĐÂU
     Thang này theo chuẩn Bloom đã được đối chiếu trong bảng 16 chuẩn quốc
     tế của hệ thống: nhận biết → thông hiểu → vận dụng → phân tích →
     chuyển giao. Không bịa ra thang mới khi đã có một thang được dùng rộng
     rãi và kiểm chứng lâu.

   ĐIỀU BÀI TEST NÀY KHÔNG LÀM ĐƯỢC
     Nó không cho điểm để xếp hạng, và không thay được bài thi. Nó là dụng
     cụ chẩn đoán — dùng nó để xếp hạng học viên là dùng sai, và phần
     `dungSaiCach` của mỗi bài nói thẳng điều đó.
   ========================================================================== */

export const BAITEST_CREED = {
  name: 'HỆ THỐNG BÀI TEST CHUYÊN SÂU',
  claim:
    'Mỗi bài là một thang năm bậc theo chuẩn Bloom. Học viên đi lên tới khi dừng, và bậc dừng chính là chẩn đoán — không cần tính điểm.',
  khacBaiCham:
    'Hai học viên cùng được 6 trên 10 có thể gãy ở hai chỗ ngược nhau: một em thiếu kiến thức, một em có kiến thức mà không áp được. Cùng một con số, hai đơn thuốc khác nhau. Bài chấm điểm không phân biệt được; bài này thì có.',
  khongPhaiXepHang:
    'Đây là dụng cụ chẩn đoán, không phải thước xếp hạng. Dùng nó để so học viên với nhau là dùng sai, và mỗi bài ghi rõ cách dùng sai của nó.',
  moiBacMotDonThuoc:
    'Dừng ở bậc nào thì có cách chữa của bậc đó. Không có "học chăm hơn" — mỗi bậc một việc cụ thể.',
};

/* --------------------------- NĂM BẬC CHUNG ------------------------------ */
/*
 * Tên và ý nghĩa của năm bậc giữ nguyên cho mọi bài; chỉ CÂU HỎI ở mỗi bậc
 * là thay theo trụ. Giữ nguyên thang là chủ ý: người dạy đọc kết quả của
 * bất kỳ bài nào cũng hiểu ngay, không phải học lại một thang mới.
 */
const BAC_CHUNG = [
  {
    bac: 1,
    ten: 'NHẬN BIẾT',
    ngiaLa: 'Nhớ ra được khi nhìn thấy. Đây là mức thấp nhất và cũng là mức dễ nhầm là "đã biết" nhất.',
    neuGay: 'Chưa gặp đủ số lần. Quay lại phiếu lý thuyết của chuyên đề và làm phiếu dạng bài, mỗi ngày 15 phút trong 7 ngày.',
    phut: 3,
  },
  {
    bac: 2,
    ten: 'THÔNG HIỂU',
    ngiaLa: 'Nói lại được bằng lời của mình. Nhớ mà không nói lại được là nhớ mặt chữ, chưa phải hiểu.',
    neuGay: 'Đang học thuộc thay vì hiểu. Với mỗi điểm kiến thức, viết một câu giải thích của chính mình rồi so với phiếu giải.',
    phut: 4,
  },
  {
    bac: 3,
    ten: 'VẬN DỤNG',
    ngiaLa: 'Áp được vào một câu quen dạng. Đây là mức phần lớn bài luyện dừng lại.',
    neuGay: 'Hiểu mà chưa thành quy trình. Học thuộc bốn bước nghĩ trong bộ giải đề và làm 8 câu mỗi ngày, nói to lý do chọn.',
    phut: 5,
  },
  {
    bac: 4,
    ten: 'PHÂN TÍCH',
    ngiaLa: 'Chỉ ra được vì sao ba đáp án kia sai, không chỉ vì sao đáp án đúng là đúng.',
    neuGay: 'Đang chọn theo cảm giác đúng. Với mỗi câu làm xong, viết lý do loại từng đáp án sai — bốn dòng, không phải một.',
    phut: 6,
  },
  {
    bac: 5,
    ten: 'CHUYỂN GIAO',
    ngiaLa: 'Áp được vào tình huống chưa từng gặp, và giải thích được cho người khác hiểu.',
    neuGay: 'Kiến thức còn dính vào dạng bài đã luyện. Dạy lại cho một người tầng dưới và ghi lại chỗ mình giải thích chưa được.',
    phut: 7,
  },
];

/* ------------------ CÂU HỎI CỦA TỪNG BẬC, THEO TRỤ ---------------------- */
/*
 * Bốn trụ của hệ thống bài giảng: tư duy, kiến thức, kỹ năng, phương pháp.
 * Cùng một thang năm bậc, nhưng câu hỏi ở mỗi bậc phải hỏi đúng thứ trụ đó
 * kiểm. Hỏi giống nhau cho cả bốn trụ thì bốn bài test chỉ là một bài nhân
 * bốn lần.
 */
const HOI_THEO_TRU: Record<string, string[]> = {
  'tu-duy': [
    'Kể tên ba nhóm lỗi hay lặp lại nhất của chính em trong tháng qua.',
    'Giải thích vì sao chuỗi ngày lại quan trọng hơn số giờ học của một buổi.',
    'Cho một tuần bị vỡ kế hoạch, hãy viết lại kế hoạch bảy ngày tới theo đúng khối lượng em làm được ở ngày bận nhất.',
    'Đọc hai kế hoạch học của hai bạn và chỉ ra kế hoạch nào sẽ đứt trước, kèm lý do nằm ở đâu.',
    'Thiết kế một cách tự kiểm cho một thói quen học mà hệ thống chưa có sẵn phép đo.',
  ],
  'kien-thuc': [
    'Chọn đáp án đúng cho 5 câu về điểm kiến thức vừa học.',
    'Nói lại quy tắc đó bằng lời của em, không dùng chữ trong sách.',
    'Áp quy tắc vào 5 câu mới cùng dạng, nói to lý do chọn từng câu.',
    'Với một câu làm sai, chỉ ra ba đáp án kia sai ở đâu — mỗi đáp án một lý do riêng.',
    'Gặp một câu trộn hai điểm kiến thức chưa từng đứng chung, tách ra và xử lý từng phần.',
  ],
  'ky-nang': [
    'Làm đúng thao tác khi được nhắc từng bước.',
    'Nói ra được bốn bước của thao tác đó mà không nhìn hướng dẫn.',
    'Làm trọn thao tác trong đúng số phút định mức, không cần nhắc.',
    'Nghe lại bản ghi của chính mình và chỉ ra ba chỗ làm chưa đúng bước.',
    'Làm thao tác đó trong điều kiện nhiễu: thiếu giờ, học liệu lạ, hoặc mệt.',
  ],
  'phuong-phap': [
    'Chỉ ra phương pháp nào hệ thống đề nghị cho tình huống này.',
    'Giải thích phương pháp đó chữa được cái gì, và không chữa được cái gì.',
    'Dùng phương pháp đó cho một buổi học thật và ghi lại số liệu.',
    'So hai phương pháp cho cùng một vấn đề và chỉ ra cái nào hợp với hoàn cảnh của em, kèm lý do.',
    'Sửa lại một phương pháp cho hợp với ràng buộc riêng của em, và nói được mình đã đánh đổi cái gì.',
  ],
};

/* ---------------------- CÁCH ĐỌC KẾT QUẢ, THEO TRỤ ---------------------- */
const DOC_KET_QUA: Record<string, string[]> = {
  'tu-duy': [
    'Dừng ở bậc 1–2: em chưa có thói quen nhìn lại chính mình. Bắt đầu từ sổ lỗi lặp, chưa cần đổi cách học.',
    'Dừng ở bậc 3: em biết cách nhưng chưa dựng được hệ thống cho riêng mình. Làm WOOP cho một mục tiêu bảy ngày.',
    'Dừng ở bậc 4–5: tư duy học tập đã vững. Chuyển giờ sang trụ đang yếu nhất.',
  ],
  'kien-thuc': [
    'Dừng ở bậc 1: chưa gặp đủ số lần. Vấn đề nằm ở lượng tiếp xúc, không ở khả năng.',
    'Dừng ở bậc 2–3: đang học thuộc thay vì hiểu. Đây là chỗ dừng phổ biến nhất và cũng là chỗ tốn giờ nhất nếu không nhận ra.',
    'Dừng ở bậc 4: hiểu nhưng chọn theo cảm giác. Bắt buộc viết lý do loại từng đáp án sai.',
    'Dừng ở bậc 5: kiến thức còn dính vào dạng bài đã luyện. Luyện câu trộn dạng.',
  ],
  'ky-nang': [
    'Dừng ở bậc 1–2: chưa thuộc quy trình. Học bốn bước trước, chưa cần bấm giờ.',
    'Dừng ở bậc 3: thuộc quy trình nhưng chưa đủ nhanh. Bấm giờ chặt dần 10% mỗi tuần.',
    'Dừng ở bậc 4: làm được nhưng chưa tự nghe ra lỗi. Ghi âm và soát riêng một lượt mỗi loại lỗi.',
    'Dừng ở bậc 5: kỹ năng chưa chịu được áp lực. Luyện trong điều kiện thiếu giờ và khi mệt.',
  ],
  'phuong-phap': [
    'Dừng ở bậc 1–2: biết tên phương pháp mà chưa biết nó chữa cái gì. Đọc lại phần "chặn khi nào" của phương pháp đó.',
    'Dừng ở bậc 3: đã dùng nhưng chưa đo. Ghi số liệu trong bảy ngày rồi mới kết luận.',
    'Dừng ở bậc 4–5: đủ sức tự chọn và tự sửa phương pháp. Đây là mức của tầng 5.',
  ],
};

/*
 * Mỗi trụ neo vào một trục kỹ năng để hồ sơ đọc được cùng một ngôn ngữ với
 * phần còn lại của hệ thống. Tư duy và phương pháp không thuộc một kỹ năng
 * ngôn ngữ nào, nên cả hai neo vào 'mindset' — đó là chỗ hệ thống đã đặt
 * cho những thứ không phải nghe nói đọc viết.
 */
const SKILL_TRU: Record<string, SkillId> = {
  'tu-duy': 'mindset',
  'kien-thuc': 'grammar',
  'ky-nang': 'speaking',
  'phuong-phap': 'mindset',
};

const DUNG_SAI: Record<string, string> = {
  'tu-duy':
    'Dùng bài này để đánh giá "học viên có chăm không". Nó không đo được sự chăm chỉ; nó đo khả năng nhìn lại chính mình, và hai thứ đó khác nhau.',
  'kien-thuc':
    'Dùng bậc dừng làm điểm để xếp hạng lớp. Bậc dừng phụ thuộc vào chuyên đề đang test, nên hai học viên test hai chuyên đề khác nhau thì không so được.',
  'ky-nang':
    'Bỏ qua bậc thấp vì thấy học viên "chắc làm được". Bỏ bậc là mất chính thông tin bài test sinh ra — phải đi từ bậc 1.',
  'phuong-phap':
    'Bắt học viên đạt bậc 5 ở mọi phương pháp. Bậc 5 là tự sửa được phương pháp, và điều đó chỉ hợp lý ở tầng 4–5.',
};

/* ------------------------------ SINH RA --------------------------------- */

let cache: TestChuyenSau[] | null = null;

export function testChuyenSau(): TestChuyenSau[] {
  if (cache) return cache;
  cache = TRU.map((t) => {
    const hoi = HOI_THEO_TRU[t.id];
    const doc = DOC_KET_QUA[t.id];
    const sai = DUNG_SAI[t.id];
    if (!hoi || !doc || !sai) throw new Error(`Bài test thiếu nội dung cho trụ ${t.id}`);
    const bac: BacSau[] = BAC_CHUNG.map((b, i) => ({...b, hoi: hoi[i]}));
    return {
      id: `bt-${t.id}`,
      truId: t.id,
      truTen: t.ten,
      skill: SKILL_TRU[t.id],
      ten: `Test chuyên sâu — ${t.ten}`,
      timRa: `Chỗ gãy trong ${t.ten.toLowerCase()}: học viên dừng ở bậc nào thì thiếu đúng thứ của bậc đó, không phải thiếu chung chung.`,
      bac,
      tongPhut: bac.reduce((s, x) => s + x.phut, 0),
      docKetQua: doc,
      dungSaiCach: sai,
    };
  });
  return cache;
}

export const testCuaTru = (truId: string): TestChuyenSau | undefined =>
  testChuyenSau().find((t) => t.truId === truId);

/** Chẩn đoán từ bậc dừng. Hàm thuần. */
export function chanDoan(truId: string, bacDatDuoc: number): {
  bacDung: number;
  ten: string;
  ngiaLa: string;
  chuaBang: string;
  daHet: boolean;
} | null {
  const t = testCuaTru(truId);
  if (!t) return null;
  if (bacDatDuoc >= t.bac.length) {
    const cuoi = t.bac[t.bac.length - 1];
    return {
      bacDung: t.bac.length,
      ten: cuoi.ten,
      ngiaLa: cuoi.ngiaLa,
      chuaBang: 'Đã lên hết thang của trụ này. Chuyển giờ sang trụ đang yếu nhất, đừng luyện tiếp chỗ đã chắc.',
      daHet: true,
    };
  }
  // Bậc GÃY là bậc ngay sau bậc cuối cùng làm được.
  const gay = t.bac[Math.max(0, Math.min(bacDatDuoc, t.bac.length - 1))];
  return {
    bacDung: gay.bac,
    ten: gay.ten,
    ngiaLa: gay.ngiaLa,
    chuaBang: gay.neuGay,
    daHet: false,
  };
}

export const BAITEST_SO = {
  soBai: testChuyenSau().length,
  soBac: BAC_CHUNG.length,
  soCauHoi: testChuyenSau().reduce((s, t) => s + t.bac.length, 0),
  soDonThuoc: testChuyenSau().reduce((s, t) => s + t.bac.length, 0),
  soCachDoc: testChuyenSau().reduce((s, t) => s + t.docKetQua.length, 0),
  tongPhut: testChuyenSau().reduce((s, t) => s + t.tongPhut, 0),
};
