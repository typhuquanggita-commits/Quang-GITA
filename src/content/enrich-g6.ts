import type { ProblemType } from '@/types';

/* MATHGITA — DẠNG BÀI BỔ SUNG CHO KHỐI 6 */

export const EXTRA_TYPES_G6: Record<string, ProblemType[]> = {
  'g6-t2': [
    {
      id: 'g6-t2-d7', name: 'Dạng 7. Chứng minh một số là hợp số / số nguyên tố', level: 'VDC',
      method: [
        'Muốn chứng minh **hợp số**: chỉ ra một ước khác 1 và chính nó (thường bằng cách phân tích thành tích).',
        'Muốn chứng minh **số nguyên tố**: kiểm tra không chia hết cho mọi số nguyên tố nhỏ hơn hoặc bằng căn của nó.',
        'Với biểu thức chứa $n$: xét các trường hợp theo số dư của $n$.',
      ],
      skills: ['Phân tích thành tích', 'Xét theo số dư'],
      pitfalls: ['Thử vài giá trị của $n$ rồi kết luận cho mọi $n$.'],
      worked: [{
        prompt: 'Chứng minh rằng $A=3^{2020}+3^{2021}+3^{2022}$ chia hết cho 39.',
        thinking: [
          'Ba hạng tử cùng cơ số 3, số mũ liên tiếp → đặt lũy thừa nhỏ nhất làm nhân tử chung.',
          '$39=3\\cdot13$, nên cần chỉ ra $A$ chia hết cho cả 3 và 13.',
        ],
        solution: [
          '$A=3^{2020}(1+3+3^{2})=3^{2020}\\cdot13$.',
          '$3^{2020}=3\\cdot3^{2019}$ nên $A=3\\cdot13\\cdot3^{2019}=39\\cdot3^{2019}$.',
          'Vậy $A$ chia hết cho 39.',
        ],
        remark: 'Kỹ thuật “nhóm ba lũy thừa liên tiếp cùng cơ số” cho ngay thừa số $1+a+a^{2}$ — nhớ để dùng lại.',
      }],
    },
  ],
  'g6-t5': [
    {
      id: 'g6-t5-d4', name: 'Dạng 4. Bài toán lãi suất và thuế', level: 'VDC',
      method: [
        'Viết hệ số nhân cho mỗi kỳ: tăng $m\\percent$ ứng với nhân $(1+\\f{m}{100})$.',
        'Nhiều kỳ liên tiếp thì nhân liên tiếp các hệ số.',
        'Với thuế VAT: giá phải trả $=$ giá chưa thuế $\\times(1+\\f{VAT}{100})$.',
      ],
      skills: ['Mô hình hoá bằng hệ số nhân', 'Phân biệt giá trước và sau thuế'],
      pitfalls: ['Tính thuế trên giá đã có thuế.', 'Cộng dồn lãi suất của các kỳ.'],
      worked: [{
        prompt: 'Một người gửi tiết kiệm 50 000 000 đồng với lãi suất 6%/năm, lãi nhập gốc hằng năm. Hỏi sau 2 năm người đó nhận được cả gốc lẫn lãi bao nhiêu tiền?',
        thinking: [
          '“Lãi nhập gốc” nghĩa là năm sau tính lãi trên cả gốc lẫn lãi của năm trước → nhân liên tiếp hai hệ số.',
        ],
        solution: [
          'Sau năm thứ nhất: $50\\,000\\,000\\cdot(1+0{,}06)=53\\,000\\,000$ (đồng).',
          'Sau năm thứ hai: $53\\,000\\,000\\cdot(1+0{,}06)=56\\,180\\,000$ (đồng).',
          'Vậy sau 2 năm người đó nhận được **56 180 000 đồng**.',
          'Lưu ý: nếu cộng dồn $6\\percent+6\\percent=12\\percent$ sẽ ra $56\\,000\\,000$ — thiếu 180 000 đồng, đó chính là “lãi của lãi”.',
        ],
      }],
    },
  ],
  'g6-t8': [
    {
      id: 'g6-t8-d3', name: 'Dạng 3. Phân tích và nhận xét bảng số liệu', level: 'VD',
      method: [
        'Đọc kỹ tiêu đề và đơn vị của bảng.',
        'Tính tổng, giá trị lớn nhất, nhỏ nhất, trung bình khi cần.',
        'Chuyển sang tỉ số phần trăm để so sánh giữa các nhóm.',
        'Viết nhận xét bằng câu hoàn chỉnh, có số liệu dẫn chứng.',
      ],
      skills: ['Đọc bảng số liệu', 'Viết nhận xét có dẫn chứng'],
      pitfalls: ['Nhận xét chung chung, không kèm số liệu.'],
      worked: [{
        prompt: 'Bảng thống kê số học sinh đạt điểm 9–10 môn Toán của bốn lớp: 6A: 12; 6B: 8; 6C: 15; 6D: 5. Tính tổng số, cho biết lớp nào cao nhất và lớp đó chiếm bao nhiêu phần trăm tổng số.',
        thinking: ['Tính tổng trước, sau đó tìm giá trị lớn nhất rồi lập tỉ số phần trăm.'],
        solution: [
          'Tổng số: $12+8+15+5=40$ (học sinh).',
          'Lớp có nhiều nhất là **6C** với 15 học sinh.',
          'Tỉ lệ: $\\f{15}{40}\\cdot100\\percent=37{,}5\\percent$.',
          'Nhận xét: lớp 6C dẫn đầu với 15 học sinh, chiếm $37{,}5\\percent$ tổng số; lớp 6D thấp nhất với 5 học sinh, chỉ chiếm $12{,}5\\percent$.',
        ],
      }],
    },
  ],
};
