import type { ProblemType } from '@/types';

/* MATHGITA — DẠNG BÀI BỔ SUNG CHO KHỐI 7 */

export const EXTRA_TYPES_G7: Record<string, ProblemType[]> = {
  'g7-t1': [
    {
      id: 'g7-t1-d5', name: 'Dạng 5. So sánh hai lũy thừa lớn', level: 'VD',
      method: [
        'Đưa hai lũy thừa về **cùng cơ số** rồi so sánh số mũ.',
        'Hoặc đưa về **cùng số mũ** rồi so sánh cơ số.',
        'Nếu không đưa được, dùng một lũy thừa trung gian để chặn giữa.',
      ],
      skills: ['Tách số mũ theo ước chung', 'Chặn bằng số trung gian'],
      pitfalls: ['So sánh trực tiếp cơ số và số mũ mà chưa đưa về cùng dạng.'],
      worked: [{
        prompt: 'So sánh $3^{40}$ và $5^{20}$.',
        thinking: [
          'Ước chung lớn nhất của hai số mũ 40 và 20 là 20 → đưa về cùng số mũ 20.',
          '$3^{40}=(3^{2})^{20}=9^{20}$.',
        ],
        solution: [
          '$3^{40}=(3^{2})^{20}=9^{20}$.',
          'Vì $9>5$ nên $9^{20}>5^{20}$.',
          'Vậy $3^{40}>5^{20}$.',
        ],
      }],
    },
    {
      id: 'g7-t1-d6', name: 'Dạng 6. Tìm x trong biểu thức chứa lũy thừa', level: 'VD',
      method: [
        'Đưa hai vế về lũy thừa **cùng cơ số**, sau đó cho hai số mũ bằng nhau.',
        'Hoặc đưa về cùng số mũ rồi cho hai cơ số bằng nhau (chú ý số mũ chẵn sinh hai nghiệm).',
        'Nếu có nhiều lớp phép tính thì gỡ từ ngoài vào trong trước.',
      ],
      pitfalls: ['Với số mũ chẵn, quên nghiệm âm.'],
      worked: [{
        prompt: 'Tìm $x$, biết $2^{x+1}+2^{x}=48$.',
        thinking: [
          'Hai hạng tử cùng cơ số 2 nhưng khác số mũ → đặt $2^{x}$ làm nhân tử chung.',
          '$2^{x+1}=2\\cdot2^{x}$.',
        ],
        solution: [
          '$2^{x+1}+2^{x}=2\\cdot2^{x}+2^{x}=3\\cdot2^{x}$.',
          '$3\\cdot2^{x}=48\\Rightarrow2^{x}=16=2^{4}$.',
          'Vậy $x=4$.',
          'Thử lại: $2^{5}+2^{4}=32+16=48$ ✓',
        ],
        remark: 'Kỹ thuật “đặt lũy thừa nhỏ nhất làm nhân tử chung” dùng được cho mọi bài dạng $a^{x+k}\\pm a^{x}=b$.',
      }],
    },
  ],

  'g7-t2': [
    {
      id: 'g7-t2-d5', name: 'Dạng 5. Chia tỉ lệ nhiều tầng (bài toán chia phần thưởng)', level: 'VDC',
      method: [
        'Khi đề cho tỉ lệ theo cặp (ví dụ $a:b=2:3$ và $b:c=4:5$), phải **nối** hai tỉ lệ qua đại lượng chung.',
        'Quy đồng phần chung: nhân cả hai tỉ lệ để phần của $b$ bằng nhau.',
        'Sau khi có tỉ lệ ba số, áp dụng tính chất dãy tỉ số bằng nhau như bình thường.',
      ],
      skills: ['Nối hai tỉ lệ', 'Quy đồng phần chung'],
      pitfalls: ['Ghép thẳng $2:3:5$ mà không quy đồng phần của $b$ — sai hoàn toàn.'],
      worked: [{
        prompt: 'Ba lớp 7A, 7B, 7C góp sách. Số sách của 7A và 7B tỉ lệ với $2:3$; số sách của 7B và 7C tỉ lệ với $4:5$. Biết cả ba lớp góp được 350 quyển. Tính số sách mỗi lớp.',
        thinking: [
          'Đại lượng chung của hai tỉ lệ là số sách lớp 7B.',
          'Ở tỉ lệ thứ nhất 7B ứng với 3 phần; ở tỉ lệ thứ hai 7B ứng với 4 phần → quy đồng về 12 phần.',
        ],
        solution: [
          'Gọi số sách ba lớp lần lượt là $a$, $b$, $c$ ($a,b,c\\in\\Nstar$).',
          '$a:b=2:3=8:12$ (nhân cả hai vế với 4).',
          '$b:c=4:5=12:15$ (nhân cả hai vế với 3).',
          'Nối lại: $a:b:c=8:12:15$, tức $\\f{a}{8}=\\f{b}{12}=\\f{c}{15}$.',
          'Áp dụng tính chất dãy tỉ số bằng nhau: $\\f{a}{8}=\\f{b}{12}=\\f{c}{15}=\\f{a+b+c}{8+12+15}=\\f{350}{35}=10$.',
          '$a=80$; $b=120$; $c=150$ (quyển).',
          'Kiểm tra: $80+120+150=350$ ✓ và $80:120=2:3$ ✓, $120:150=4:5$ ✓',
        ],
        remark: 'Bước quy đồng phần chung là điểm phân loại của dạng này — làm sai ở đây thì mọi bước sau đều sai.',
      }],
    },
  ],

  'g7-t3': [
    {
      id: 'g7-t3-d5', name: 'Dạng 5. Chứng minh đa thức không có nghiệm', level: 'VD',
      method: [
        'Biến đổi đa thức về dạng tổng của một bình phương và một số dương.',
        'Chỉ ra biểu thức luôn lớn hơn 0 (hoặc luôn nhỏ hơn 0) với mọi giá trị của biến.',
        'Kết luận đa thức không có nghiệm.',
      ],
      skills: ['Hoàn thành bình phương', 'Lập luận chặn'],
      pitfalls: ['Chỉ thử vài giá trị rồi kết luận — đó không phải chứng minh.'],
      worked: [{
        prompt: 'Chứng minh đa thức $P(x)=x^{2}+4x+7$ không có nghiệm.',
        thinking: [
          'Muốn chứng minh không có nghiệm, ta chứng minh $P(x)>0$ với mọi $x$.',
          'Hoàn thành bình phương: nửa hệ số của $x$ là 2, bình phương là 4.',
        ],
        solution: [
          '$P(x)=x^{2}+4x+4+3=(x+2)^{2}+3$.',
          'Vì $(x+2)^{2}\\ge0$ với mọi $x$ nên $P(x)\\ge3>0$ với mọi $x$.',
          'Do đó không tồn tại giá trị nào của $x$ để $P(x)=0$.',
          'Vậy đa thức $P(x)$ không có nghiệm.',
        ],
      }],
    },
  ],

  'g7-t5': [
    {
      id: 'g7-t5-d5', name: 'Dạng 5. Chứng minh ba điểm thẳng hàng, hai đường vuông góc', level: 'VDC',
      method: [
        'Ba điểm thẳng hàng: chứng minh hai góc kề bù (tổng bằng $180\\deg$), hoặc chứng minh cùng thuộc một đường đặc biệt (trung trực, phân giác).',
        'Hai đường vuông góc: chứng minh góc tạo thành bằng $90\\deg$, hoặc dùng tính chất tam giác cân (đường trung tuyến đồng thời là đường cao).',
        'Thường phải chứng minh hai tam giác bằng nhau trước để có các góc/cạnh cần dùng.',
      ],
      skills: ['Ghép nhiều bước chứng minh', 'Khai thác tính chất tam giác cân'],
      pitfalls: ['Kết luận thẳng hàng chỉ vì “nhìn hình thấy thẳng”.'],
      worked: [{
        prompt: 'Cho tam giác $ABC$ cân tại $A$. Gọi $M$ là trung điểm $BC$, $H$ là trung điểm $AM$. Chứng minh $AM$ là đường trung trực của $BC$.',
        thinking: [
          'Đường trung trực của $BC$ là đường vuông góc với $BC$ tại trung điểm của $BC$.',
          'Ta đã có $M$ là trung điểm $BC$, chỉ cần chứng minh $AM\\perp BC$.',
        ],
        solution: [
          'Xét $\\tri ABM$ và $\\tri ACM$ có: $AB=AC$ (gt); $MB=MC$ ($M$ là trung điểm $BC$); $AM$ chung.',
          'Do đó $\\tri ABM=\\tri ACM$ (c.c.c), suy ra $\\angle AMB=\\angle AMC$.',
          'Mà $\\angle AMB+\\angle AMC=180\\deg$ (hai góc kề bù) nên $\\angle AMB=\\angle AMC=90\\deg$.',
          'Vậy $AM\\perp BC$ tại trung điểm $M$ của $BC$, tức $AM$ là đường trung trực của đoạn thẳng $BC$.',
          '(Hệ quả: mọi điểm trên $AM$, trong đó có $H$, đều cách đều $B$ và $C$.)',
        ],
        remark: 'Trong tam giác cân, đường trung tuyến ứng với cạnh đáy đồng thời là đường cao, đường phân giác và đường trung trực — một giả thiết cho bốn kết luận.',
      }],
    },
  ],
};
