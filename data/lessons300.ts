/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {Lesson300} from '../types';
import {GITA_JOURNEY} from './gita';

/* ==========================================================================
   BA TRĂM BÀI ĐỊNH HƯỚNG — THEO MÔ THỨC GITA
   12 bước hành trình × 5 chủ đề × 5 nấc = 300.

   Vì sao chia như vậy: 12 bước là hành trình gốc của học viện, không phải con
   số tôi nghĩ ra. Năm chủ đề là năm mặt mà mọi bước đều phải chạm — nếu thiếu
   một mặt thì bước đó chỉ xong trên giấy. Năm nấc là mức thấm, mượn đúng thang
   đã dùng cho 25 cấp độ: biết → hiểu → làm được → thành thói quen → dạy lại.

   Bài định hướng KHÁC bài học. Bài học dạy kiến thức; bài định hướng chỉnh
   hướng đi. Mỗi bài chỉ 20 phút và luôn kết thúc bằng một việc làm được ngay,
   không phải một điều để suy ngẫm.
   ========================================================================== */

export const LESSON300_CREED = {
  name: 'BA TRĂM BÀI ĐỊNH HƯỚNG',
  claim:
    'Ba trăm buổi hai mươi phút, chia đều cho mười hai bước của hành trình GITA, đi cùng học viên suốt ba năm.',
  notLessons:
    'Đây không phải 300 bài dạy tiếng Anh — hệ thống đã có 268 bài giảng cho việc đó. Đây là 300 buổi CHỈNH HƯỚNG: vì sao đang làm việc này, đang ở đâu, và bước kế tiếp là gì.',
  rhythm:
    'Trung bình một bài mỗi bốn ngày trong 36 tháng. Không dồn, không bỏ — bài định hướng bỏ thì học viên vẫn học được, nhưng sẽ dần không biết mình đang đi đâu.',
  fiveThemes:
    'Năm chủ đề chạy xuyên suốt mọi bước: Nhận thức, Niềm tin, Thói quen, Hành động, Kết nối. Bước nào thiếu một trong năm mặt thì bước đó chỉ xong trên giấy.',
  honest:
    'Ba trăm bài này được SINH RA từ cấu trúc, không phải viết tay 300 lần. Mỗi chủ đề trong mỗi bước được viết kỹ một lần, rồi đặt vào năm nấc thấm — nấc quyết định độ sâu và việc phải làm. Viết tay 300 bài rời rạc sẽ cho ra 300 bài na ná nhau và không ai kiểm được.',
};

/* ------------------------- NĂM CHỦ ĐỀ XUYÊN SUỐT ------------------------- */

interface Theme {
  id: string;
  name: string;
  question: string;
  filter: string;
  work: string;
}

export const THEMES: Theme[] = [
  {
    id: 't-nhanthuc',
    name: 'NHẬN THỨC',
    question: 'Tôi đang thật sự ở đâu, và tôi có đang nhìn đúng không?',
    filter: 'NGÔN NGỮ',
    work: 'Gọi đúng tên thứ đang xảy ra, bằng số liệu chứ không bằng cảm giác.',
  },
  {
    id: 't-niemtin',
    name: 'NIỀM TIN',
    question: 'Tôi tin gì về khả năng của mình, và niềm tin đó dựa trên đâu?',
    filter: 'NIỀM TIN',
    work: 'Đặt bằng chứng tự thân cạnh niềm tin cũ và để bằng chứng làm việc của nó.',
  },
  {
    id: 't-thoiquen',
    name: 'THÓI QUEN',
    question: 'Ngày của tôi có chỗ cho việc này chưa, hay tôi đang trông vào ý chí?',
    filter: 'TRẢI NGHIỆM',
    work: 'Neo việc vào một mốc cố định trong ngày, và hạ ngưỡng cho ngày xấu.',
  },
  {
    id: 't-hanhdong',
    name: 'HÀNH ĐỘNG',
    question: 'Việc nhỏ nhất tôi làm được trong 24 giờ tới là gì?',
    filter: 'TRẢI NGHIỆM',
    work: 'Chuyển ý định thành một việc có thời điểm, có công cụ, có bằng chứng.',
  },
  {
    id: 't-ketnoi',
    name: 'KẾT NỐI',
    question: 'Ai đang đi cùng tôi, và tôi đang cho đi điều gì?',
    filter: 'KÝ ỨC',
    work: 'Givers Gain — cho đi trước. Người đi một mình dừng ở tháng thứ tư.',
  },
];

/* ---------------------------- NĂM NẤC THẤM ------------------------------ */

interface Rung {
  no: number;
  name: string;
  depth: string;
  task: string;
  measure: string;
}

const RUNGS: Rung[] = [
  {
    no: 1,
    name: 'BIẾT',
    depth: 'Nghe tên và nhận ra nó khi gặp lại.',
    task: 'Viết ba dòng bằng lời của mình về điều vừa nghe.',
    measure: 'Ba dòng đó không dùng lại chữ của tài liệu.',
  },
  {
    no: 2,
    name: 'HIỂU',
    depth: 'Giải thích được cho người chưa biết, không dùng thuật ngữ.',
    task: 'Giải thích trong 90 giây cho một người ngoài, có ghi âm.',
    measure: 'Người nghe kể lại đúng ý chính.',
  },
  {
    no: 3,
    name: 'LÀM ĐƯỢC',
    depth: 'Làm đúng khi có người nhắc, trong điều kiện thuận lợi.',
    task: 'Thực hiện một lần trọn vẹn, có bằng chứng nộp lại.',
    measure: 'Hoàn thành không cần hỏi lại quá hai lần.',
  },
  {
    no: 4,
    name: 'THÀNH THÓI QUEN',
    depth: 'Làm mà không cần nhớ là phải làm, kể cả ngày xấu.',
    task: 'Bảy ngày liên tiếp, kể cả ngày bận nhất, ít nhất bản tối thiểu.',
    measure: 'Chuỗi 7/7 ngày có dấu thời gian.',
  },
  {
    no: 5,
    name: 'DẠY LẠI',
    depth: 'Người mình dạy làm được. Đây là mức duy nhất không diễn được.',
    task: 'Kèm một người mới qua đúng điều này, theo tới khi họ làm được.',
    measure: 'Người được kèm hoàn thành, đo bằng bằng chứng của họ.',
  },
];

/* ------------------------------ SINH 300 BÀI ---------------------------- */

/** Ba trăm bài, sinh từ 12 bước × 5 chủ đề × 5 nấc. Hàm thuần. */
export function buildLessons(): Lesson300[] {
  const out: Lesson300[] = [];
  let no = 0;

  for (const step of GITA_JOURNEY) {
    for (const theme of THEMES) {
      for (const rung of RUNGS) {
        no++;
        const tieuDiem = step.points[(rung.no - 1) % step.points.length];

        out.push({
          no,
          step: step.no,
          phase: step.phase,
          theme: theme.name,
          rung: rung.no,
          rungName: rung.name,
          months: step.months,
          title: `Bước ${String(step.no).padStart(2, '0')} · ${step.shortName} — ${theme.name} ở mức ${rung.name}`,
          why:
            `Bước ${step.no} của hành trình hỏi: ${theme.question} ` +
            `Ở mức ${rung.name}, câu trả lời phải đạt tới: ${rung.depth}`,
          filter: theme.filter,
          blocks: [
            {
              slot: 'ĐỊNH VỊ',
              minutes: 4,
              what: `Nhìn lại số liệu của chính mình liên quan tới: ${tieuDiem}. Không bình luận, chỉ đọc số.`,
            },
            {
              slot: 'SOI PHỄU',
              minutes: 4,
              what: `Phễu lọc ${theme.filter} đang làm méo điều gì ở đây? ${theme.work}`,
            },
            {
              slot: 'LÀM THỬ',
              minutes: 8,
              what: rung.task,
            },
            {
              slot: 'CHỐT',
              minutes: 4,
              what:
                'Nói lại bằng lời của mình: việc cần làm là gì, khi nào làm, đo bằng gì. Cố vấn không nói thay.',
            },
          ],
          deliverable: rung.task,
          measure: rung.measure,
        });
      }
    }
  }
  return out;
}

let _bo: Lesson300[] | null = null;

/** Dựng bộ 300 bài ở lần gọi đầu rồi giữ lại. */
export function lessons300(): Lesson300[] {
  if (_bo === null) _bo = buildLessons();
  return _bo;
}
