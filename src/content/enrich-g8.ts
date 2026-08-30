import type { ProblemType } from '@/types';

/* MATHGITA — DẠNG BÀI BỔ SUNG CHO KHỐI 8 */

export const EXTRA_TYPES_G8: Record<string, ProblemType[]> = {
  'g8-t1': [
    {
      id: 'g8-t1-d5', name: 'Dạng 5. Phân tích nhân tử bằng thêm bớt hạng tử', level: 'VDC',
      method: [
        'Khi bốn phương pháp cơ bản đều bí, hãy nghĩ tới **thêm và bớt** cùng một hạng tử.',
        'Mục tiêu: tạo ra một hằng đẳng thức (thường là bình phương của một tổng), phần bớt đi trở thành bình phương khác.',
        'Kết quả thu được có dạng $A^{2}-B^{2}$ rồi phân tích tiếp.',
      ],
      skills: ['Nhận dạng bình phương còn thiếu', 'Bù trừ hạng tử'],
      pitfalls: ['Thêm mà quên bớt (làm thay đổi biểu thức).', 'Thêm hạng tử không tạo được hằng đẳng thức.'],
      worked: [{
        prompt: 'Phân tích $A=x^{4}+4$ thành nhân tử.',
        thinking: [
          '$x^{4}+4$ không phải hiệu hai bình phương, không có nhân tử chung, chỉ có hai hạng tử.',
          'Ta muốn có $(x^{2}+2)^{2}=x^{4}+4x^{2}+4$ — so với đề thì thừa $4x^{2}$.',
          'Vậy thêm $4x^{2}$ rồi bớt $4x^{2}$.',
        ],
        solution: [
          '$A=x^{4}+4x^{2}+4-4x^{2}$',
          '$A=(x^{2}+2)^{2}-(2x)^{2}$',
          '$A=(x^{2}-2x+2)(x^{2}+2x+2)$.',
        ],
        remark: 'Đây là hằng đẳng thức Sophie Germain — một “bảo bối” của đề học sinh giỏi lớp 8.',
      }],
    },
    {
      id: 'g8-t1-d6', name: 'Dạng 6. Tách hạng tử cho tam thức có hệ số bậc hai khác 1', level: 'VD',
      method: [
        'Với $ax^{2}+bx+c$: tìm hai số có **tích bằng $ac$** và **tổng bằng $b$**.',
        'Tách $bx$ thành hai hạng tử tương ứng.',
        'Nhóm 2–2 rồi đặt nhân tử chung.',
      ],
      skills: ['Tìm cặp số theo tổng – tích', 'Nhóm hạng tử'],
      pitfalls: ['Tìm cặp số có tích bằng $c$ thay vì $ac$ — sai khi $a\\ne1$.'],
      worked: [{
        prompt: 'Phân tích $B=6x^{2}+7x-3$ thành nhân tử.',
        thinking: [
          '$a=6$, $b=7$, $c=-3$ nên $ac=-18$.',
          'Tìm hai số có tích $-18$ và tổng $7$: đó là $9$ và $-2$.',
        ],
        solution: [
          '$B=6x^{2}+9x-2x-3$',
          '$B=3x(2x+3)-(2x+3)$',
          '$B=(2x+3)(3x-1)$.',
          'Kiểm tra bằng cách nhân ngược: $(2x+3)(3x-1)=6x^{2}-2x+9x-3=6x^{2}+7x-3$ ✓',
        ],
      }],
    },
  ],

  'g8-t2': [
    {
      id: 'g8-t2-d4', name: 'Dạng 4. Rút gọn biểu thức tổng hợp nhiều tầng', level: 'VDC',
      method: [
        'Bước 1: đặt điều kiện xác định cho **tất cả** các mẫu.',
        'Bước 2: phân tích mọi mẫu thành nhân tử.',
        'Bước 3: xử lý trong ngoặc trước, mỗi ngoặc rút gọn thành một phân thức duy nhất.',
        'Bước 4: thực hiện phép nhân/chia giữa các ngoặc (chia là nhân với nghịch đảo).',
        'Bước 5: rút gọn triệt để và đối chiếu điều kiện.',
      ],
      skills: ['Quy trình 5 bước', 'Quản lý điều kiện xác định'],
      pitfalls: [
        'Rút gọn giữa chừng khi chưa quy đồng xong.',
        'Quên điều kiện phát sinh từ phép chia (biểu thức chia phải khác 0).',
      ],
      worked: [{
        prompt: 'Rút gọn $P=\\left(\\f{1}{x-1}-\\f{1}{x+1}\\right):\\f{2}{x^{2}-1}$ với $x\\ne\\pm1$.',
        thinking: [
          'Xử lý ngoặc trước: mẫu chung của hai phân thức trong ngoặc là $(x-1)(x+1)=x^{2}-1$.',
          'Sau đó chia hai phân thức = nhân với nghịch đảo.',
        ],
        solution: [
          'Điều kiện: $x\\ne1$, $x\\ne-1$.',
          'Trong ngoặc: $\\f{1}{x-1}-\\f{1}{x+1}=\\f{(x+1)-(x-1)}{x^{2}-1}=\\f{2}{x^{2}-1}$.',
          '$P=\\f{2}{x^{2}-1}:\\f{2}{x^{2}-1}=\\f{2}{x^{2}-1}\\cdot\\f{x^{2}-1}{2}=1$.',
          'Vậy $P=1$ với mọi $x$ thoả điều kiện xác định.',
        ],
        remark: 'Khi kết quả rút gọn ra hằng số, hãy kiểm tra lại bằng cách thay một giá trị cụ thể — cách kiểm tra nhanh và đáng tin.',
      }],
    },
  ],

  'g8-t3': [
    {
      id: 'g8-t3-d4', name: 'Dạng 4. Phương trình chứa ẩn ở mẫu', level: 'VD',
      method: [
        'Bước 1: tìm điều kiện xác định (mẫu khác 0).',
        'Bước 2: quy đồng và khử mẫu.',
        'Bước 3: giải phương trình thu được.',
        'Bước 4: **đối chiếu điều kiện**, loại nghiệm không thoả rồi mới kết luận.',
      ],
      skills: ['Quản lý điều kiện xác định', 'Khử mẫu đúng cách'],
      pitfalls: ['Quên đặt điều kiện.', 'Nhận nghiệm trùng với giá trị làm mẫu bằng 0.'],
      worked: [{
        prompt: 'Giải phương trình $\\f{x+2}{x-2}-\\f{1}{x}=\\f{2}{x(x-2)}$.',
        thinking: [
          'Mẫu có $x-2$ và $x$ nên điều kiện là $x\\ne0$ và $x\\ne2$.',
          'Mẫu chung là $x(x-2)$.',
        ],
        solution: [
          'Điều kiện: $x\\ne0$ và $x\\ne2$.',
          'Quy đồng và khử mẫu: $x(x+2)-(x-2)=2$.',
          '$x^{2}+2x-x+2=2\\Leftrightarrow x^{2}+x=0\\Leftrightarrow x(x+1)=0$.',
          '$x=0$ hoặc $x=-1$.',
          'Đối chiếu điều kiện: **loại $x=0$**; nhận $x=-1$.',
          'Vậy phương trình có nghiệm duy nhất $x=-1$.',
        ],
        remark: 'Bước loại nghiệm ngoại lai chính là chỗ mất điểm phổ biến nhất của dạng này.',
      }],
    },
    {
      id: 'g8-t3-d5', name: 'Dạng 5. Bài toán phần trăm — tăng giảm sản lượng', level: 'VD',
      method: [
        'Gọi ẩn là đại lượng ban đầu (số ban đầu, giá gốc, sản lượng kế hoạch).',
        'Viết đại lượng sau khi tăng/giảm dưới dạng $x(1\\pm\\f{m}{100})$.',
        'Lập phương trình theo dữ kiện tổng hoặc chênh lệch.',
      ],
      pitfalls: ['Cộng dồn phần trăm của hai lần thay đổi liên tiếp.', 'Nhầm mốc so sánh (tăng so với ban đầu hay so với lần trước).'],
      worked: [{
        prompt: 'Trong tháng đầu, hai tổ sản xuất được 800 sản phẩm. Sang tháng thứ hai, tổ I vượt mức 15%, tổ II vượt mức 20%, nên cả hai tổ làm được 945 sản phẩm. Tính số sản phẩm mỗi tổ làm được trong tháng đầu.',
        thinking: [
          'Hai đại lượng chưa biết nhưng ta có thể dùng một ẩn: gọi số sản phẩm tổ I là $x$ thì tổ II là $800-x$.',
          'Tháng hai: tổ I làm $1{,}15x$, tổ II làm $1{,}2(800-x)$.',
        ],
        solution: [
          'Gọi số sản phẩm tổ I làm trong tháng đầu là $x$ (sản phẩm; $0<x<800$).',
          'Khi đó tổ II làm được $800-x$ sản phẩm.',
          'Tháng thứ hai: tổ I làm $1{,}15x$; tổ II làm $1{,}2(800-x)$.',
          'Theo đề: $1{,}15x+1{,}2(800-x)=945$.',
          '$1{,}15x+960-1{,}2x=945\\Leftrightarrow -0{,}05x=-15\\Leftrightarrow x=300$.',
          '$x=300$ thoả điều kiện $0<x<800$.',
          'Vậy tháng đầu tổ I làm được **300 sản phẩm**, tổ II làm được **500 sản phẩm**.',
        ],
        remark: 'Khi tổng của hai đại lượng đã biết, dùng **một ẩn** ($x$ và $800-x$) gọn hơn lập hệ hai ẩn.',
      }],
    },
  ],

  'g8-t5': [
    {
      id: 'g8-t5-d3', name: 'Dạng 3. Tìm điều kiện để tứ giác là hình đặc biệt', level: 'VDC',
      method: [
        'Trước hết chứng minh tứ giác đó là hình bình hành (bước này gần như luôn có).',
        'Muốn thành hình chữ nhật: thêm một góc vuông hoặc hai đường chéo bằng nhau.',
        'Muốn thành hình thoi: thêm hai cạnh kề bằng nhau hoặc hai đường chéo vuông góc.',
        'Muốn thành hình vuông: cần đồng thời cả hai điều kiện trên.',
        'Cuối cùng dịch điều kiện hình học đó về điều kiện của tam giác ban đầu.',
      ],
      skills: ['Chiến thuật leo thang', 'Dịch điều kiện về tam giác gốc'],
      pitfalls: ['Nhảy thẳng lên hình vuông mà bỏ qua bước hình bình hành.'],
      worked: [{
        prompt: 'Cho tam giác $ABC$, $M$ là trung điểm $BC$. Gọi $D$, $E$ lần lượt là trung điểm $AB$, $AC$. Tứ giác $ADME$ là hình gì? Tam giác $ABC$ cần điều kiện gì để $ADME$ là hình thoi? Là hình vuông?',
        thinking: [
          '$D$, $M$ là trung điểm hai cạnh nên $DM$ là đường trung bình → $DM\\para AC$ và $DM=\\f{AC}{2}=AE$.',
          'Một cặp cạnh đối vừa song song vừa bằng nhau → hình bình hành.',
        ],
        solution: [
          'Trong tam giác $ABC$: $D$ là trung điểm $AB$, $M$ là trung điểm $BC$ nên $DM$ là đường trung bình.',
          'Suy ra $DM\\para AC$ và $DM=\\f{1}{2}AC$. Mà $E$ là trung điểm $AC$ nên $AE=\\f{1}{2}AC$.',
          'Do đó $DM\\para AE$ và $DM=AE$, nên tứ giác $ADME$ là **hình bình hành**.',
          '$ADME$ là **hình thoi** $\\Leftrightarrow$ hai cạnh kề bằng nhau $\\Leftrightarrow AD=AE\\Leftrightarrow\\f{AB}{2}=\\f{AC}{2}\\Leftrightarrow AB=AC$.',
          'Vậy tam giác $ABC$ cân tại $A$ thì $ADME$ là hình thoi.',
          '$ADME$ là **hình vuông** $\\Leftrightarrow$ vừa là hình thoi vừa có một góc vuông $\\Leftrightarrow AB=AC$ và $\\angle A=90\\deg$.',
          'Vậy tam giác $ABC$ vuông cân tại $A$ thì $ADME$ là hình vuông.',
        ],
      }],
    },
  ],

  'g8-t6': [
    {
      id: 'g8-t6-d4', name: 'Dạng 4. Chứng minh hệ thức tích bằng đồng dạng', level: 'VDC',
      method: [
        'Viết hệ thức cần chứng minh dưới dạng **tỉ lệ**: $AB\\cdot CD=EF\\cdot GH\\Leftrightarrow\\f{AB}{EF}=\\f{GH}{CD}$.',
        'Đọc tỉ lệ để đoán hai tam giác: mỗi vế của tỉ lệ gợi một tam giác.',
        'Tìm hai cặp góc bằng nhau (thường có một góc chung hoặc một cặp góc đối đỉnh).',
        'Kết luận đồng dạng theo g.g rồi suy ra tỉ lệ, cuối cùng nhân chéo.',
      ],
      skills: ['Truy ngược từ kết luận', 'Nhận diện cặp tam giác từ tỉ lệ'],
      pitfalls: ['Viết sai thứ tự đỉnh khi ký hiệu đồng dạng, dẫn tới tỉ lệ sai.'],
      worked: [{
        prompt: 'Cho tam giác $ABC$ vuông tại $A$, đường cao $AH$. Chứng minh $AH^{2}=BH\\cdot CH$.',
        thinking: [
          'Đưa về tỉ lệ: $AH^{2}=BH\\cdot CH\\Leftrightarrow\\f{AH}{BH}=\\f{CH}{AH}$.',
          'Tỉ lệ này gợi hai tam giác $AHB$ và $CHA$.',
          'Cả hai đều vuông tại $H$; cần thêm một cặp góc nhọn bằng nhau.',
        ],
        solution: [
          'Xét $\\tri AHB$ và $\\tri CHA$ có: $\\angle AHB=\\angle CHA=90\\deg$.',
          '$\\angle BAH=\\angle ACH$ (cùng phụ với $\\angle ABH$).',
          'Do đó $\\tri AHB\\sim\\tri CHA$ (g.g).',
          'Suy ra $\\f{AH}{CH}=\\f{BH}{AH}$, tức $AH^{2}=BH\\cdot CH$.',
        ],
        remark: 'Cặp góc “cùng phụ với một góc” là công cụ tạo góc bằng nhau rất hay dùng trong tam giác vuông có đường cao.',
      }],
    },
  ],
};
