import type { ProblemType } from '@/types';

/* =====================================================================
   MATHGITA — DẠNG BÀI & VÍ DỤ MẪU BỔ SUNG CHO CÁC CHUYÊN ĐỀ CÒN MỎNG
   Rà soát toàn kho cho thấy 14 chuyên đề (chủ yếu hình học trực quan,
   thống kê – xác suất và bất đẳng thức) có dưới 4 ví dụ mẫu, trong khi
   chuẩn biên soạn GITA yêu cầu mỗi chuyên đề phải đủ cả bốn mức độ
   NB – TH – VD – VDC. File này bổ sung phần còn thiếu, mỗi ví dụ đều có
   phân tích tư duy trước lời giải.
   ===================================================================== */

export const EXTRA_TYPES_MONG: Record<string, ProblemType[]> = {
  /* ============================== KHỐI 6 ============================== */
  'g6-t6': [
    {
      id: 'g6-t6-d5', name: 'Dạng 5. Diện tích hình ghép — cộng và trừ phần', level: 'VD',
      method: [
        'Bước 1: chia hình đã cho thành các **hình cơ bản** (chữ nhật, tam giác, hình thang, hình thoi).',
        'Bước 2: đánh dấu phần nào **cộng vào**, phần nào **trừ đi** (phần khoét rỗng).',
        'Bước 3: tính từng phần rồi tổng hợp; luôn ghi đơn vị diện tích.',
      ],
      skills: ['Chia hình hợp lí', 'Suy ra kích thước còn thiếu từ dữ kiện đã cho'],
      pitfalls: ['Chia hình chồng lấn khiến một phần bị tính hai lần.', 'Quên trừ phần khoét rỗng.'],
      worked: [{
        prompt: 'Một mảnh vườn hình chữ nhật dài $18$ m, rộng $12$ m. Người ta đào một cái ao hình vuông cạnh $5$ m ở giữa vườn. Tính diện tích phần đất còn lại.',
        thinking: [
          'Hình có một phần bị "khoét" nên đây là bài **trừ diện tích**, không phải chia nhỏ rồi cộng.',
          'Diện tích còn lại $=$ diện tích cả vườn $-$ diện tích ao.',
          'Vị trí cái ao "ở giữa" không ảnh hưởng tới kết quả — chỉ diện tích của nó mới quan trọng.',
        ],
        solution: [
          'Diện tích cả mảnh vườn: $18\\times12=216\\;(m^{2})$.',
          'Diện tích cái ao: $5\\times5=25\\;(m^{2})$.',
          'Diện tích phần đất còn lại: $216-25=191\\;(m^{2})$.',
        ],
        remark: 'Dữ kiện "ở giữa vườn" là thông tin thừa được cài vào để thử xem học sinh có bị rối không.',
      }],
    },
    {
      id: 'g6-t6-d6', name: 'Dạng 6. Bài toán chi phí từ đại lượng hình học', level: 'VD',
      method: [
        'Bước 1: đọc kỹ xem đề dùng **chu vi** (hàng rào, viền, nẹp) hay **diện tích** (lát gạch, sơn, trồng cây).',
        'Bước 2: đổi tất cả về cùng một đơn vị.',
        'Bước 3: tính đại lượng hình học, rồi **nhân đơn giá** ở một bước riêng.',
      ],
      skills: ['Phân biệt chu vi và diện tích trong ngữ cảnh thực tế', 'Đổi đơn vị diện tích'],
      pitfalls: ['Dùng chu vi cho bài lát gạch (hoặc ngược lại).', 'Quên đổi $m^{2}$ sang $cm^{2}$ khi kích thước viên gạch cho bằng cm.'],
      worked: [{
        prompt: 'Nền một căn phòng hình chữ nhật dài $6$ m, rộng $4{,}5$ m. Người ta lát nền bằng gạch vuông cạnh $50$ cm, giá mỗi viên $85\\,000$ đồng. Tính số tiền mua gạch.',
        thinking: [
          '"Lát nền" là phủ kín bề mặt nên phải dùng **diện tích**.',
          'Kích thước phòng cho bằng mét, gạch cho bằng xăng-ti-mét → phải đổi về cùng đơn vị trước.',
          'Đổi $50$ cm $=0{,}5$ m sẽ gọn hơn là đổi phòng sang cm.',
        ],
        solution: [
          'Diện tích nền phòng: $6\\times4{,}5=27\\;(m^{2})$.',
          'Đổi cạnh viên gạch: $50\\;cm=0{,}5\\;m$; diện tích mỗi viên: $0{,}5\\times0{,}5=0{,}25\\;(m^{2})$.',
          'Số viên gạch cần dùng: $27:0{,}25=108$ (viên).',
          'Số tiền mua gạch: $108\\times85\\,000=9\\,180\\,000$ (đồng).',
        ],
        remark: 'Luôn tách riêng bước "tính đại lượng hình học" và bước "nhân đơn giá" — trình bày rõ, chấm điểm cũng dễ.',
      }],
    },
  ],
  'g6-t7': [
    {
      id: 'g6-t7-d5', name: 'Dạng 5. Đếm hình từ điểm và tia', level: 'TH',
      method: [
        'Với $n$ điểm phân biệt trên một đường thẳng: số đoạn thẳng $=\\f{n(n-1)}{2}$.',
        'Với $n$ tia chung gốc (không có tia nào trùng nhau): số góc $=\\f{n(n-1)}{2}$.',
        'Cách hiểu chung: mỗi hình ứng với một cách **chọn 2** trong $n$ đối tượng.',
      ],
      skills: ['Nhận ra mô hình "chọn 2 trong n"', 'Đếm không trùng, không sót'],
      pitfalls: ['Quên chia $2$ (mỗi hình bị đếm hai lần).', 'Đếm cả trường hợp hai đầu trùng nhau.'],
      worked: [{
        prompt: 'Trên đường thẳng $d$ lấy $8$ điểm phân biệt. Hỏi có tất cả bao nhiêu đoạn thẳng được tạo thành?',
        thinking: [
          'Mỗi đoạn thẳng được xác định bởi **hai đầu mút** — vậy đếm số cách chọn $2$ điểm trong $8$.',
          'Cách đếm trực tiếp: mỗi điểm nối được với $7$ điểm còn lại, cho $8\\times7$ lượt.',
          'Nhưng đoạn $AB$ và $BA$ là **một**, nên phải chia đôi.',
        ],
        solution: [
          'Mỗi điểm nối với $7$ điểm còn lại, tạo ra $8\\times7=56$ lượt nối.',
          'Mỗi đoạn thẳng bị đếm hai lần (một lần từ mỗi đầu).',
          'Số đoạn thẳng $=\\f{8\\times7}{2}=28$ (đoạn thẳng).',
        ],
        remark: 'Cùng một công thức dùng cho: đếm đoạn thẳng, đếm góc từ tia chung gốc, đếm giao điểm của các đường thẳng.',
      }],
    },
    {
      id: 'g6-t7-d6', name: 'Dạng 6. Tính độ dài dựa vào quan hệ "nằm giữa"', level: 'VD',
      method: [
        'Bước 1: vẽ hình theo đúng thứ tự các điểm mà đề mô tả.',
        'Bước 2: điểm $M$ nằm giữa $A$ và $B$ thì viết $AM+MB=AB$.',
        'Bước 3: $M$ là trung điểm thì thêm $MA=MB=\\f{AB}{2}$.',
        'Bước 4: lập phương trình theo đoạn cần tìm.',
      ],
      skills: ['Vẽ hình đúng thứ tự điểm', 'Chuyển quan hệ hình học thành đẳng thức'],
      pitfalls: ['Vẽ sai thứ tự điểm dẫn tới cộng nhầm thành trừ.', 'Kết luận "nằm giữa" khi chưa chứng minh.'],
      worked: [{
        prompt: 'Trên tia $Ox$ lấy hai điểm $A$ và $B$ sao cho $OA=3$ cm, $OB=7$ cm. Tính $AB$ và cho biết $A$ có phải trung điểm của $OB$ không.',
        thinking: [
          'Hai điểm cùng nằm trên tia $Ox$, mà $OA<OB$ nên $A$ **nằm giữa** $O$ và $B$.',
          'Có quan hệ nằm giữa là viết được ngay $OA+AB=OB$.',
          'Muốn $A$ là trung điểm thì cần đồng thời $A$ nằm giữa **và** $OA=AB$ — phải kiểm tra cả hai.',
        ],
        solution: [
          'Vì $A$, $B$ cùng thuộc tia $Ox$ và $OA=3<7=OB$ nên $A$ nằm giữa $O$ và $B$.',
          'Do đó $OA+AB=OB\\Rightarrow 3+AB=7\\Rightarrow AB=4$ (cm).',
          'Xét điều kiện trung điểm: $A$ nằm giữa $O$ và $B$ ✓, nhưng $OA=3\\ne4=AB$.',
          'Vậy $A$ **không** phải là trung điểm của đoạn $OB$.',
        ],
        remark: 'Trung điểm cần **hai** điều kiện: nằm giữa và cách đều. Thiếu một trong hai là kết luận sai.',
      }],
    },
  ],
  'g6-t8': [
    {
      id: 'g6-t8-d4', name: 'Dạng 4. Đọc biểu đồ và tính số lượng thực tế', level: 'TH',
      method: [
        'Bước 1: xác định **tổng** của toàn bộ dữ liệu (đề thường cho sẵn).',
        'Bước 2: đọc tỉ lệ phần trăm của phần cần tính từ biểu đồ.',
        'Bước 3: số lượng thực tế $=$ tổng $\\times$ tỉ lệ.',
      ],
      skills: ['Đọc biểu đồ cột và biểu đồ quạt tròn', 'Đổi qua lại giữa phần trăm và số lượng'],
      pitfalls: ['Lấy tỉ lệ nhân với một phần thay vì nhân với tổng.', 'Cộng các tỉ lệ ra khác $100\\%$ mà không kiểm tra lại.'],
      worked: [{
        prompt: 'Khối 6 của một trường có $240$ học sinh. Biểu đồ cho biết $20\\%$ thích môn Toán, $25\\%$ thích môn Văn, số còn lại thích môn Tiếng Anh. Tính số học sinh thích môn Tiếng Anh.',
        thinking: [
          'Tổng luôn là $100\\%$, nên tỉ lệ thích Tiếng Anh $=100\\%-20\\%-25\\%$.',
          'Có tỉ lệ rồi thì nhân với **tổng $240$** để ra số học sinh.',
          'Có thể kiểm tra chéo: cộng ba số lượng phải đúng bằng $240$.',
        ],
        solution: [
          'Tỉ lệ học sinh thích Tiếng Anh: $100\\%-20\\%-25\\%=55\\%$.',
          'Số học sinh thích Tiếng Anh: $240\\times55\\%=240\\times0{,}55=132$ (học sinh).',
          'Kiểm tra: Toán $240\\times20\\%=48$; Văn $240\\times25\\%=60$; tổng $48+60+132=240$ ✓',
        ],
        remark: 'Luôn cộng lại để kiểm tra — bước này mất 10 giây nhưng bắt được hầu hết lỗi tính toán.',
      }],
    },
    {
      id: 'g6-t8-d5', name: 'Dạng 5. Xác suất thực nghiệm', level: 'VD',
      method: [
        'Bước 1: đếm số lần biến cố xảy ra (số kết quả thuận lợi trong thực nghiệm).',
        'Bước 2: đếm tổng số lần thực hiện phép thử.',
        'Bước 3: lập tỉ số và rút gọn; có thể đổi sang phần trăm.',
      ],
      skills: ['Đếm đúng theo điều kiện của biến cố', 'Rút gọn phân số kết quả'],
      pitfalls: ['Nhầm "số lần xảy ra" với "số lần thực hiện".', 'Quên rút gọn phân số.'],
      worked: [{
        prompt: 'Tung một đồng xu $50$ lần thì có $28$ lần xuất hiện mặt ngửa. Tính xác suất thực nghiệm của biến cố "xuất hiện mặt ngửa" và so sánh với xác suất lí thuyết.',
        thinking: [
          'Xác suất thực nghiệm chỉ là **tỉ số đếm được** từ thí nghiệm thật.',
          'Xác suất lí thuyết của mặt ngửa là $\\f{1}{2}$ vì đồng xu có hai mặt đồng khả năng.',
          'Hai giá trị này thường **không bằng nhau**, nhưng càng tung nhiều lần thì càng gần nhau.',
        ],
        solution: [
          'Xác suất thực nghiệm: $\\f{28}{50}=\\f{14}{25}=0{,}56=56\\%$.',
          'Xác suất lí thuyết: $\\f{1}{2}=0{,}5=50\\%$.',
          'Xác suất thực nghiệm ($56\\%$) lớn hơn xác suất lí thuyết ($50\\%$) một chút.',
          'Điều này là bình thường; nếu tung càng nhiều lần thì tỉ số thực nghiệm sẽ càng tiến gần $50\\%$.',
        ],
        remark: 'Đề rất hay hỏi "vì sao hai giá trị khác nhau" — câu trả lời là do số lần thử còn ít.',
      }],
    },
  ],

  /* ============================== KHỐI 7 ============================== */
  'g7-t4': [
    {
      id: 'g7-t4-d5', name: 'Dạng 5. Kẻ đường phụ song song để tính góc', level: 'VD',
      method: [
        'Bước 1: nhận ra hai đường song song đã cho và một điểm nằm "kẹp" giữa chúng.',
        'Bước 2: qua điểm đó **kẻ một tia song song** với hai đường ấy.',
        'Bước 3: đường phụ tách góc lớn thành hai góc con, mỗi góc tính được bằng so le trong.',
        'Bước 4: cộng hai góc con để ra góc cần tìm.',
      ],
      skills: ['Nhận biết thời điểm cần kẻ đường phụ', 'Vận dụng góc so le trong hai lần liên tiếp'],
      pitfalls: ['Kẻ đường phụ không song song với hai đường đã cho.', 'Cộng nhầm thành trừ khi điểm nằm ngoài dải giữa hai đường.'],
      worked: [{
        prompt: 'Cho $Ax\\para By$. Điểm $C$ nằm giữa hai đường thẳng đó, biết $\\angle xAC=40\\deg$ và $\\angle yBC=35\\deg$. Tính $\\angle ACB$.',
        thinking: [
          'Góc $\\angle ACB$ không nằm trong cấu hình hai đường song song nào cả — không tính trực tiếp được.',
          'Mẹo chuẩn: qua $C$ kẻ tia $Cz\\para Ax$; khi đó $Cz$ cũng song song $By$ (cùng song song với $Ax$).',
          'Tia $Cz$ chia $\\angle ACB$ thành hai góc, mỗi góc so le trong với một góc đã biết.',
        ],
        solution: [
          'Qua $C$ kẻ tia $Cz\\para Ax$ (nằm trong góc $ACB$).',
          'Vì $Ax\\para By$ và $Cz\\para Ax$ nên $Cz\\para By$.',
          '$\\angle ACz=\\angle xAC=40\\deg$ (hai góc so le trong, $Cz\\para Ax$).',
          '$\\angle zCB=\\angle yBC=35\\deg$ (hai góc so le trong, $Cz\\para By$).',
          'Vì tia $Cz$ nằm giữa hai tia $CA$ và $CB$ nên:',
          '$\\angle ACB=\\angle ACz+\\angle zCB=40\\deg+35\\deg=75\\deg$.',
        ],
        remark: 'Hễ thấy một điểm "kẹp" giữa hai đường song song và cần tính góc tại điểm đó — kẻ đường phụ song song ngay.',
      }],
    },
    {
      id: 'g7-t4-d6', name: 'Dạng 6. Chứng minh hai đường thẳng song song', level: 'TH',
      method: [
        'Cách 1: chỉ ra một cặp góc **so le trong** hoặc **đồng vị** bằng nhau.',
        'Cách 2: chỉ ra một cặp góc **trong cùng phía** bù nhau.',
        'Cách 3: hai đường cùng vuông góc (hoặc cùng song song) với đường thứ ba.',
      ],
      skills: ['Xác định đúng vị trí tương đối của cặp góc', 'Chọn cát tuyến phù hợp'],
      pitfalls: ['Gọi tên sai cặp góc (nhầm so le trong với trong cùng phía).', 'Dùng góc ở hai cát tuyến khác nhau.'],
      worked: [{
        prompt: 'Cho hình vẽ có $\\angle A_1=65\\deg$ và $\\angle B_1=115\\deg$ là hai góc **trong cùng phía** đối với hai đường thẳng $a$, $b$ và cát tuyến $c$. Chứng minh $a\\para b$.',
        thinking: [
          'Đề đã nói rõ hai góc ở vị trí **trong cùng phía** — vậy dùng dấu hiệu "bù nhau".',
          'Chỉ cần kiểm tra tổng hai góc có bằng $180\\deg$ hay không.',
          'Nếu bằng thì kết luận song song theo dấu hiệu nhận biết.',
        ],
        solution: [
          'Ta có $\\angle A_1+\\angle B_1=65\\deg+115\\deg=180\\deg$.',
          '$\\angle A_1$ và $\\angle B_1$ là hai góc trong cùng phía đối với hai đường thẳng $a$, $b$ và cát tuyến $c$.',
          'Hai góc trong cùng phía bù nhau nên $a\\para b$ (dấu hiệu nhận biết hai đường thẳng song song).',
        ],
        remark: 'Ba dấu hiệu song song đều quy về một câu: so le trong và đồng vị thì **bằng**, trong cùng phía thì **bù**.',
      }],
    },
  ],
  'g7-t6': [
    {
      id: 'g7-t6-d4', name: 'Dạng 4. Diện tích xung quanh và toàn phần của lăng trụ đứng', level: 'TH',
      method: [
        '$S_{xq}=C_{\\text{đáy}}\\times h$ (chu vi đáy nhân chiều cao).',
        '$S_{tp}=S_{xq}+2S_{\\text{đáy}}$.',
        'Nếu vật thể **không có nắp** thì chỉ cộng **một** mặt đáy.',
      ],
      skills: ['Tính chu vi và diện tích của đa giác đáy', 'Đọc đề để biết có nắp hay không'],
      pitfalls: ['Dùng diện tích đáy thay cho chu vi đáy khi tính $S_{xq}$.', 'Quên yêu cầu "không nắp" của bài thực tế.'],
      worked: [{
        prompt: 'Một chiếc hộp không nắp có dạng hình hộp chữ nhật, đáy là hình chữ nhật dài $30$ cm, rộng $20$ cm, chiều cao $15$ cm. Tính diện tích bìa cần dùng (bỏ qua mép dán).',
        thinking: [
          '"Bìa cần dùng" chính là diện tích toàn bộ các mặt của hộp.',
          'Hộp **không nắp** nên chỉ có một mặt đáy, cộng bốn mặt xung quanh.',
          'Bốn mặt xung quanh gộp lại chính là $S_{xq}=$ chu vi đáy $\\times$ chiều cao.',
        ],
        solution: [
          'Chu vi đáy: $C=2\\times(30+20)=100$ (cm).',
          'Diện tích xung quanh: $S_{xq}=100\\times15=1500\\;(cm^{2})$.',
          'Diện tích một mặt đáy: $S_{\\text{đáy}}=30\\times20=600\\;(cm^{2})$.',
          'Hộp không nắp nên diện tích bìa cần dùng: $1500+600=2100\\;(cm^{2})$.',
        ],
        remark: 'Nếu hộp **có nắp** thì phải cộng $2\\times600$, kết quả là $2700\\;cm^{2}$ — chênh nhau đúng một mặt đáy.',
      }],
    },
    {
      id: 'g7-t6-d5', name: 'Dạng 5. Bài toán thể tích với đơn vị lít', level: 'VD',
      method: [
        'Bước 1: tính thể tích theo công thức $V=S_{\\text{đáy}}\\times h$.',
        'Bước 2: đổi đơn vị — $1\\;dm^{3}=1$ lít, $1\\;m^{3}=1000$ lít.',
        'Bước 3: nếu bài hỏi mực nước, hãy lập phương trình $V_{\\text{nước}}=S_{\\text{đáy}}\\times h_{\\text{nước}}$.',
      ],
      skills: ['Đổi đơn vị thể tích', 'Giải ngược từ thể tích ra chiều cao'],
      pitfalls: ['Đổi sai: $1\\;m^{3}=1000\\;dm^{3}$ chứ không phải $100$.', 'Quên rằng nước chỉ chiếm một phần chiều cao bể.'],
      worked: [{
        prompt: 'Một bể nước dạng hình hộp chữ nhật có đáy là hình chữ nhật $2$ m $\\times$ $1{,}5$ m. Người ta đổ vào bể $4\\,500$ lít nước. Hỏi mực nước trong bể cao bao nhiêu mét?',
        thinking: [
          'Đề cho thể tích nước và diện tích đáy, hỏi chiều cao — đây là bài **giải ngược** công thức thể tích.',
          'Thể tích cho bằng lít, kích thước cho bằng mét → phải đổi lít sang $m^{3}$ trước.',
          '$1\\;m^{3}=1000$ lít nên $4\\,500$ lít $=4{,}5\\;m^{3}$.',
        ],
        solution: [
          'Đổi thể tích nước: $4\\,500$ lít $=4{,}5\\;(m^{3})$.',
          'Diện tích đáy bể: $S=2\\times1{,}5=3\\;(m^{2})$.',
          'Từ $V=S\\times h$ suy ra $h=\\f{V}{S}=\\f{4{,}5}{3}=1{,}5$ (m).',
          'Vậy mực nước trong bể cao $1{,}5$ m.',
        ],
        remark: 'Chiều cao của **bể** và chiều cao của **mực nước** là hai đại lượng khác nhau — đọc kỹ đề hỏi cái nào.',
      }],
    },
  ],
  'g7-t7': [
    {
      id: 'g7-t7-d4', name: 'Dạng 4. Vẽ và đọc biểu đồ hình quạt tròn', level: 'TH',
      method: [
        'Bước 1: tính tổng tất cả số liệu.',
        'Bước 2: tỉ lệ mỗi phần $=\\f{\\text{số liệu}}{\\text{tổng}}\\times100\\%$.',
        'Bước 3: góc ở tâm mỗi phần $=\\f{\\text{số liệu}}{\\text{tổng}}\\times360\\deg$.',
        'Bước 4: kiểm tra tổng các tỉ lệ bằng $100\\%$ và tổng các góc bằng $360\\deg$.',
      ],
      skills: ['Chuyển số liệu thành tỉ lệ và góc ở tâm', 'Kiểm tra chéo bằng tổng'],
      pitfalls: ['Nhân với $100$ khi cần góc, hoặc nhân $360$ khi cần phần trăm.', 'Quên kiểm tra tổng.'],
      worked: [{
        prompt: 'Doanh số bốn mặt hàng của một cửa hàng lần lượt là: Tivi $60$, Laptop $90$, Máy giặt $45$, Tủ lạnh $30$ (triệu đồng). Tính góc ở tâm của hình quạt biểu diễn Laptop.',
        thinking: [
          'Cả hình tròn ($360\\deg$) ứng với **tổng** doanh số của cả bốn mặt hàng.',
          'Vậy trước hết phải cộng bốn số để có tổng.',
          'Góc của Laptop tỉ lệ với doanh số Laptop trên tổng đó.',
        ],
        solution: [
          'Tổng doanh số: $60+90+45+30=225$ (triệu đồng).',
          'Tỉ lệ của Laptop: $\\f{90}{225}=\\f{2}{5}=40\\%$.',
          'Góc ở tâm của Laptop: $\\f{90}{225}\\times360\\deg=\\f{2}{5}\\times360\\deg=144\\deg$.',
          '(Kiểm tra: Tivi $96\\deg$, Máy giặt $72\\deg$, Tủ lạnh $48\\deg$; tổng $96+144+72+48=360\\deg$ ✓)',
        ],
        remark: 'Bước kiểm tra tổng bằng $360\\deg$ giúp phát hiện ngay nếu tính sai một phần nào đó.',
      }],
    },
    {
      id: 'g7-t7-d5', name: 'Dạng 5. Xác suất của biến cố đồng khả năng', level: 'VD',
      method: [
        'Bước 1: liệt kê (hoặc đếm) **tổng số kết quả có thể** — đây là mẫu số.',
        'Bước 2: đếm số kết quả **thuận lợi** cho biến cố — đây là tử số.',
        'Bước 3: lập tỉ số và rút gọn.',
        'Lưu ý: công thức này chỉ đúng khi các kết quả **đồng khả năng**.',
      ],
      skills: ['Liệt kê không gian mẫu', 'Đếm theo điều kiện của biến cố'],
      pitfalls: ['Đếm sót kết quả thuận lợi.', 'Áp dụng công thức khi các kết quả không đồng khả năng.'],
      worked: [{
        prompt: 'Một hộp có $30$ tấm thẻ đánh số từ $1$ đến $30$. Rút ngẫu nhiên một thẻ. Tính xác suất của biến cố $A$: "Rút được thẻ ghi số là ước của $30$".',
        thinking: [
          'Rút ngẫu nhiên nên $30$ thẻ **đồng khả năng** — dùng được công thức xác suất lí thuyết.',
          'Mẫu số là $30$ (tổng số thẻ).',
          'Tử số là số các ước dương của $30$ — phải liệt kê cẩn thận, đừng sót $1$ và $30$.',
        ],
        solution: [
          'Tổng số kết quả có thể: $30$ (mỗi thẻ là một kết quả, đồng khả năng).',
          'Các ước dương của $30$ là: $1;\\;2;\\;3;\\;5;\\;6;\\;10;\\;15;\\;30$ — có $8$ số.',
          'Vậy có $8$ kết quả thuận lợi cho biến cố $A$.',
          '$P(A)=\\f{8}{30}=\\f{4}{15}$.',
        ],
        remark: 'Mẹo đếm ước không sót: ghép cặp $1\\cdot30$, $2\\cdot15$, $3\\cdot10$, $5\\cdot6$ — bốn cặp cho $8$ ước.',
      }],
    },
  ],

  /* ============================== KHỐI 8 ============================== */
  'g8-t4': [
    {
      id: 'g8-t4-d4', name: 'Dạng 4. Xác định hàm số bậc nhất theo điều kiện', level: 'VD',
      method: [
        'Hệ số góc cho trước → biết ngay $a$; chỉ còn tìm $b$ bằng cách thay toạ độ một điểm.',
        'Đi qua hai điểm → thay cả hai điểm, được hệ hai phương trình hai ẩn $a$, $b$.',
        'Song song với $y=a_0x+b_0$ → $a=a_0$ và $b\\ne b_0$.',
      ],
      skills: ['Chuyển điều kiện hình học thành phương trình', 'Giải hệ hai ẩn'],
      pitfalls: ['Quên điều kiện $a\\ne0$ để hàm số là bậc nhất.', 'Quên $b\\ne b_0$ ở bài song song (nếu bằng thì hai đường **trùng** nhau).'],
      worked: [{
        prompt: 'Xác định hàm số $y=ax+b$ biết đồ thị của nó song song với đường thẳng $y=-2x+5$ và đi qua điểm $M(1;3)$.',
        thinking: [
          'Song song thì **cùng hệ số góc**: $a=-2$, và phải khác tung độ gốc: $b\\ne5$.',
          'Còn một ẩn $b$, mà đề cho một điểm — thay toạ độ điểm vào là ra.',
          'Cuối cùng nhớ đối chiếu $b\\ne5$ để bảo đảm hai đường **song song** chứ không trùng.',
        ],
        solution: [
          'Vì đồ thị song song với $y=-2x+5$ nên $a=-2$ và $b\\ne5$.',
          'Hàm số có dạng $y=-2x+b$.',
          'Đồ thị đi qua $M(1;3)$ nên $3=-2\\cdot1+b\\Rightarrow b=5$... nhưng $b=5$ vi phạm điều kiện $b\\ne5$.',
          'Xem lại: $3=-2+b\\Rightarrow b=5$. Vì $b=5$ trùng với đường đã cho nên **không tồn tại** hàm số thoả mãn.',
          'Kết luận: điểm $M(1;3)$ nằm ngay trên đường thẳng $y=-2x+5$, nên không có đường thẳng nào vừa song song với nó vừa đi qua $M$.',
        ],
        remark: 'Đây là bẫy kinh điển: luôn kiểm tra $b\\ne b_0$ ở cuối. Nếu $b=b_0$ thì hai đường trùng nhau, không song song.',
      }],
    },
    {
      id: 'g8-t4-d5', name: 'Dạng 5. Bài toán thực tế với hàm số bậc nhất', level: 'VD',
      method: [
        'Bước 1: xác định đại lượng nào là biến $x$, đại lượng nào là hàm $y$.',
        'Bước 2: hệ số góc $a$ là **mức thay đổi trên mỗi đơn vị**; hằng số $b$ là **giá trị ban đầu**.',
        'Bước 3: lập công thức $y=ax+b$ rồi thay số để trả lời câu hỏi.',
      ],
      skills: ['Dịch tình huống thực tế thành hàm số', 'Giải ngược để tìm $x$ từ $y$'],
      pitfalls: ['Nhầm giá trị ban đầu với mức thay đổi.', 'Quên điều kiện thực tế của biến (thời gian, số lượng phải không âm).'],
      worked: [{
        prompt: 'Một cửa hàng cho thuê xe đạp với giá thuê cố định $20\\,000$ đồng, cộng thêm $8\\,000$ đồng cho mỗi giờ sử dụng. Lập công thức tính số tiền $y$ (đồng) phải trả khi thuê xe $x$ giờ. Hỏi với $150\\,000$ đồng thì thuê được tối đa bao nhiêu giờ?',
        thinking: [
          '"Cố định $20\\,000$" là khoản trả ngay cả khi $x=0$ → đó là $b$.',
          '"Thêm $8\\,000$ mỗi giờ" là mức tăng trên mỗi đơn vị thời gian → đó là hệ số góc $a$.',
          'Câu hỏi thứ hai cho $y$ và hỏi $x$ — giải ngược, và vì là số giờ nguyên nên phải **làm tròn xuống**.',
        ],
        solution: [
          'Giá trị ban đầu $b=20\\,000$; mức tăng mỗi giờ $a=8\\,000$.',
          'Công thức: $y=8\\,000x+20\\,000$ (đồng), với $x\\ge0$.',
          'Với $y=150\\,000$: $8\\,000x+20\\,000=150\\,000\\Rightarrow 8\\,000x=130\\,000\\Rightarrow x=16{,}25$.',
          'Vì số giờ thuê phải là số nguyên và không vượt quá số tiền có, ta lấy $x=16$ giờ.',
          '(Kiểm tra: $16$ giờ hết $8\\,000\\cdot16+20\\,000=148\\,000$ đồng $\\le150\\,000$ ✓; $17$ giờ hết $156\\,000$ đồng — vượt quá.)',
        ],
        remark: 'Bài thực tế luôn phải **đối chiếu điều kiện** ở cuối: số giờ, số người, số sản phẩm đều phải nguyên và không âm.',
      }],
    },
  ],
  'g8-t5': [
    {
      id: 'g8-t5-d5', name: 'Dạng 5. Chứng minh tứ giác là hình đặc biệt', level: 'VD',
      method: [
        'Bước 1: chứng minh trước là **hình bình hành** (thường qua hai đường chéo cắt nhau tại trung điểm mỗi đường).',
        'Bước 2: thêm **một** điều kiện để lên hình riêng: một góc vuông (hoặc hai đường chéo bằng nhau) → hình chữ nhật; hai cạnh kề bằng nhau (hoặc hai đường chéo vuông góc) → hình thoi.',
        'Bước 3: có **cả hai** điều kiện trên → hình vuông.',
      ],
      skills: ['Đi theo sơ đồ nhận biết từ hình chung tới hình riêng', 'Chọn dấu hiệu ít việc nhất'],
      pitfalls: ['Nhảy thẳng lên hình vuông mà bỏ qua bước hình bình hành.', 'Dùng dấu hiệu chưa được chứng minh.'],
      worked: [{
        prompt: 'Cho tam giác $ABC$ vuông tại $A$. Gọi $M$ là trung điểm của $BC$. Trên tia đối của tia $MA$ lấy điểm $D$ sao cho $MD=MA$. Chứng minh tứ giác $ABDC$ là hình chữ nhật.',
        thinking: [
          'Cấu hình "trung điểm + kéo dài gấp đôi" cho ngay **hai đường chéo cắt nhau tại trung điểm mỗi đường**.',
          'Đó chính là dấu hiệu của hình bình hành — bước 1 xong.',
          'Đề đã cho sẵn $\\angle BAC=90\\deg$, đúng một điều kiện cần thêm để lên hình chữ nhật.',
        ],
        solution: [
          'Xét tứ giác $ABDC$ có hai đường chéo là $AD$ và $BC$.',
          '$M$ là trung điểm của $BC$ (giả thiết) và $M$ là trung điểm của $AD$ (vì $MD=MA$ và $D$ thuộc tia đối của tia $MA$).',
          'Hai đường chéo cắt nhau tại trung điểm mỗi đường nên $ABDC$ là **hình bình hành**.',
          'Mà $\\angle BAC=90\\deg$ (tam giác $ABC$ vuông tại $A$).',
          'Hình bình hành có một góc vuông là hình chữ nhật. Vậy $ABDC$ là **hình chữ nhật**. (điều phải chứng minh)',
        ],
        remark: 'Hệ quả rất hay dùng: từ đây suy ra $AD=BC$, tức $AM=\\f{BC}{2}$ — trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền.',
      }],
    },
    {
      id: 'g8-t5-d6', name: 'Dạng 6. Đường trung bình của tam giác và hình thang', level: 'TH',
      method: [
        'Đường trung bình của **tam giác**: nối trung điểm hai cạnh, song song cạnh thứ ba và bằng **nửa** cạnh ấy.',
        'Đường trung bình của **hình thang**: nối trung điểm hai cạnh bên, song song hai đáy và bằng **nửa tổng** hai đáy.',
        'Dấu hiệu dùng: hễ trong hình có hai trung điểm là nghĩ ngay tới đường trung bình.',
      ],
      skills: ['Phát hiện cặp trung điểm', 'Dùng đường trung bình để tạo quan hệ song song'],
      pitfalls: ['Nhầm công thức tam giác (nửa cạnh) với hình thang (nửa tổng hai đáy).', 'Dùng khi mới chỉ có một trung điểm.'],
      worked: [{
        prompt: 'Cho hình thang $ABCD$ ($AB\\para CD$) có $AB=8$ cm, $CD=14$ cm. Gọi $M$, $N$ lần lượt là trung điểm của $AD$ và $BC$. Tính $MN$.',
        thinking: [
          '$M$, $N$ là trung điểm của **hai cạnh bên** → $MN$ là đường trung bình của hình thang.',
          'Công thức của hình thang là **nửa tổng hai đáy**, khác với tam giác.',
          'Hai đáy ở đây là $AB$ và $CD$.',
        ],
        solution: [
          'Vì $M$, $N$ lần lượt là trung điểm của hai cạnh bên $AD$ và $BC$ nên $MN$ là đường trung bình của hình thang $ABCD$.',
          'Do đó $MN\\para AB\\para CD$ và $MN=\\f{AB+CD}{2}$.',
          '$MN=\\f{8+14}{2}=\\f{22}{2}=11$ (cm).',
        ],
        remark: 'Nhớ theo cách này: tam giác có "một đáy" nên lấy nửa đáy; hình thang có "hai đáy" nên lấy nửa tổng.',
      }],
    },
  ],
  'g8-t7': [
    {
      id: 'g8-t7-d4', name: 'Dạng 4. Định lí Pythagore thuận và đảo', level: 'TH',
      method: [
        'Thuận: tam giác vuông → $a^{2}=b^{2}+c^{2}$ với $a$ là cạnh huyền. Dùng để **tính cạnh**.',
        'Đảo: nếu $a^{2}=b^{2}+c^{2}$ (với $a$ lớn nhất) → tam giác vuông. Dùng để **nhận biết**.',
        'Bộ ba Pythagore hay gặp: $(3;4;5)$, $(6;8;10)$, $(5;12;13)$, $(8;15;17)$, $(9;12;15)$.',
      ],
      skills: ['Xác định đúng cạnh huyền', 'Thuộc các bộ ba Pythagore để tính nhẩm'],
      pitfalls: ['Lấy nhầm cạnh góc vuông làm cạnh huyền.', 'Dùng định lí thuận khi chưa biết tam giác có vuông hay không.'],
      worked: [{
        prompt: 'Một chiếc thang dài $5$ m dựa vào tường, chân thang cách chân tường $3$ m. Hỏi thang chạm tường ở độ cao bao nhiêu mét?',
        thinking: [
          'Thang, tường và mặt đất tạo thành một **tam giác vuông** (tường vuông góc mặt đất).',
          'Chiếc thang là cạnh dài nhất, đối diện góc vuông → thang chính là **cạnh huyền**.',
          'Biết cạnh huyền và một cạnh góc vuông, tìm cạnh góc vuông còn lại.',
        ],
        solution: [
          'Gọi $h$ là độ cao thang chạm tường. Tam giác tạo bởi thang, tường và mặt đất vuông tại chân tường.',
          'Cạnh huyền là chiếc thang: $5$ m; một cạnh góc vuông là khoảng cách chân thang tới tường: $3$ m.',
          'Theo định lí Pythagore: $5^{2}=3^{2}+h^{2}\\Rightarrow 25=9+h^{2}\\Rightarrow h^{2}=16$.',
          'Vì $h>0$ nên $h=4$ (m). Vậy thang chạm tường ở độ cao $4$ m.',
        ],
        remark: 'Đây chính là bộ ba $(3;4;5)$ — nhận ra ngay thì không cần tính, chỉ cần kiểm tra lại.',
      }],
    },
    {
      id: 'g8-t7-d5', name: 'Dạng 5. Hình chóp đều — diện tích và thể tích', level: 'VD',
      method: [
        '$S_{xq}=\\f{1}{2}\\times C_{\\text{đáy}}\\times d$ với $d$ là **trung đoạn** (đường cao của mặt bên).',
        '$S_{tp}=S_{xq}+S_{\\text{đáy}}$ (hình chóp chỉ có **một** đáy).',
        '$V=\\f{1}{3}\\times S_{\\text{đáy}}\\times h$ với $h$ là **chiều cao** hình chóp.',
      ],
      skills: ['Phân biệt trung đoạn với chiều cao', 'Tính diện tích đa giác đáy'],
      pitfalls: ['Dùng chiều cao thay cho trung đoạn khi tính $S_{xq}$.', 'Quên hệ số $\\f{1}{3}$ khi tính thể tích.'],
      worked: [{
        prompt: 'Một hình chóp tứ giác đều có đáy là hình vuông cạnh $6$ cm, trung đoạn $5$ cm và chiều cao $4$ cm. Tính diện tích xung quanh và thể tích của hình chóp.',
        thinking: [
          'Đề cho **cả** trung đoạn lẫn chiều cao — đây là cách kiểm tra xem học sinh có phân biệt được hai đại lượng không.',
          'Diện tích xung quanh dùng **trung đoạn** ($5$ cm), vì mỗi mặt bên là tam giác cân có đường cao là trung đoạn.',
          'Thể tích dùng **chiều cao** ($4$ cm), là khoảng cách từ đỉnh tới mặt đáy.',
        ],
        solution: [
          'Chu vi đáy: $C=4\\times6=24$ (cm). Diện tích đáy: $S_{\\text{đáy}}=6\\times6=36\\;(cm^{2})$.',
          'Diện tích xung quanh: $S_{xq}=\\f{1}{2}\\times24\\times5=60\\;(cm^{2})$.',
          'Thể tích: $V=\\f{1}{3}\\times36\\times4=48\\;(cm^{3})$.',
        ],
        remark: 'Ghi nhớ theo vai trò: trung đoạn nằm **trên mặt bên** (cho diện tích), chiều cao nằm **bên trong** hình chóp (cho thể tích).',
      }],
    },
  ],
  'g8-t8': [
    {
      id: 'g8-t8-d5', name: 'Dạng 5. Ước lượng số lần xảy ra từ xác suất', level: 'VD',
      method: [
        'Bước 1: tính xác suất (lí thuyết hoặc thực nghiệm) của biến cố.',
        'Bước 2: nhân xác suất với số lần dự định thực hiện.',
        'Bước 3: làm tròn về số nguyên vì số lần phải là số đếm được.',
      ],
      skills: ['Chuyển xác suất thành số lần dự đoán', 'Hiểu tính chất ước lượng của kết quả'],
      pitfalls: ['Coi kết quả ước lượng là con số chính xác tuyệt đối.', 'Quên làm tròn về số nguyên.'],
      worked: [{
        prompt: 'Trong một túi có bi đen và bi đỏ. Nam lấy ngẫu nhiên một viên, xem màu rồi trả lại túi; làm như vậy $30$ lần thì có $13$ lần được bi đỏ. Nếu Nam thực hiện $50$ lần thì dự đoán có khoảng bao nhiêu lần lấy được bi **đen**?',
        thinking: [
          'Không biết số bi thật trong túi, nên phải dùng **xác suất thực nghiệm** từ $30$ lần đã làm.',
          'Đề hỏi bi **đen**, mà số liệu cho bi **đỏ** — phải lấy phần bù trước.',
          'Có xác suất rồi thì nhân với $50$ để ra số lần dự đoán.',
        ],
        solution: [
          'Số lần lấy được bi đen trong $30$ lần: $30-13=17$ (lần).',
          'Xác suất thực nghiệm của biến cố "lấy được bi đen": $\\f{17}{30}$.',
          'Dự đoán số lần lấy được bi đen trong $50$ lần: $50\\times\\f{17}{30}=\\f{850}{30}\\approx28{,}3$.',
          'Vậy dự đoán có khoảng $28$ lần lấy được bi đen.',
        ],
        remark: 'Kết quả chỉ là **dự đoán**; thực tế có thể lệch, và càng thực hiện nhiều lần thì càng sát.',
      }],
    },
    {
      id: 'g8-t8-d3', name: 'Dạng 3. Xác suất thực nghiệm từ bảng thống kê', level: 'TH',
      method: [
        'Bước 1: xác định tổng số lần thực hiện $N$ (thường ghi ở cuối bảng).',
        'Bước 2: cộng các tần số thoả mãn điều kiện của biến cố.',
        'Bước 3: lập tỉ số rồi rút gọn.',
      ],
      skills: ['Đọc bảng tần số', 'Xử lý chính xác từ khoá về ranh giới'],
      pitfalls: ['Nhầm "dưới 5" (không gồm 5) với "không quá 5" (có gồm 5).', 'Quên cộng nhóm "trên n" ở cuối bảng.'],
      worked: [{
        prompt: 'Một cửa hàng thống kê số xe bán ra mỗi ngày trong $32$ ngày: bán $2$ chiếc có $3$ ngày, $3$ chiếc có $5$ ngày, $4$ chiếc có $2$ ngày, $5$ chiếc có $6$ ngày, $6$ chiếc có $7$ ngày, $7$ chiếc có $5$ ngày, trên $7$ chiếc có $4$ ngày. Tính xác suất thực nghiệm của biến cố "ngày bán được **dưới 5** chiếc xe".',
        thinking: [
          '"Dưới 5" nghĩa là $2$, $3$, $4$ chiếc — **không** bao gồm $5$ chiếc.',
          'Cộng tần số của đúng ba nhóm đó làm tử số.',
          'Mẫu số là tổng $N=32$ ngày, đề đã cho sẵn.',
        ],
        solution: [
          'Các ngày bán dưới $5$ chiếc là các ngày bán $2$, $3$ hoặc $4$ chiếc.',
          'Số ngày tương ứng: $3+5+2=10$ (ngày).',
          'Tổng số ngày thống kê: $N=32$.',
          'Xác suất thực nghiệm: $\\f{10}{32}=\\f{5}{16}=0{,}3125$.',
        ],
        remark: 'Gạch chân từ khoá ranh giới ("dưới", "trên", "ít nhất", "không quá") ngay khi đọc đề — đó là chỗ ra đề cài bẫy.',
      }],
    },
    {
      id: 'g8-t8-d4', name: 'Dạng 4. Xác suất lí thuyết của phép thử', level: 'VD',
      method: [
        'Bước 1: xác định không gian mẫu — tổng số kết quả **đồng khả năng**.',
        'Bước 2: đếm số kết quả thuận lợi cho biến cố.',
        'Bước 3: $P=\\f{\\text{thuận lợi}}{\\text{tổng}}$.',
        'Với biến cố "ít nhất một...", nên tính qua **biến cố đối**.',
      ],
      skills: ['Liệt kê không gian mẫu bằng bảng hoặc sơ đồ cây', 'Dùng biến cố đối để rút ngắn'],
      pitfalls: ['Đếm thiếu không gian mẫu ở phép thử hai giai đoạn.', 'Quên lấy $1$ trừ khi dùng biến cố đối.'],
      worked: [{
        prompt: 'Trong một phòng có $15$ học sinh lớp 8H (gồm $9$ nam, $6$ nữ) và $15$ học sinh lớp 8G (gồm $12$ nam, $3$ nữ). Chọn ngẫu nhiên một học sinh. Tính xác suất của biến cố "chọn được một học sinh nam".',
        thinking: [
          'Chọn một học sinh trong **toàn bộ** phòng, nên không gian mẫu là cả $30$ học sinh.',
          'Đây là bẫy: nhiều bạn chỉ lấy $15$ của một lớp làm mẫu số.',
          'Số nam là tổng nam của cả hai lớp.',
        ],
        solution: [
          'Tổng số học sinh trong phòng: $15+15=30$ — đây là số kết quả đồng khả năng.',
          'Tổng số học sinh nam: $9+12=21$.',
          'Xác suất chọn được học sinh nam: $P=\\f{21}{30}=\\f{7}{10}=0{,}7$.',
        ],
        remark: 'Luôn hỏi "chọn trong phạm vi nào?" trước khi đặt mẫu số — phạm vi sai thì mọi phép tính sau đều vô nghĩa.',
      }],
    },
  ],

  /* ============================== KHỐI 9 ============================== */
  'g9-t4': [
    {
      id: 'g9-t4-d5', name: 'Dạng 5. Bất đẳng thức Cô-si và điểm rơi', level: 'VDC',
      method: [
        'Bước 1: **dự đoán điểm rơi** — với bài đối xứng thường là các biến bằng nhau.',
        'Bước 2: thay điểm rơi vào để biết giá trị cực trị cần hướng tới.',
        'Bước 3: chọn cách tách hạng tử sao cho dấu bằng của Cô-si xảy ra đúng tại điểm rơi.',
        'Bước 4: kết luận kèm giá trị của biến.',
      ],
      skills: ['Dự đoán điểm rơi trước khi biến đổi', 'Tách hệ số cho khớp điểm rơi'],
      pitfalls: ['Áp Cô-si tuỳ tiện khiến dấu bằng không xảy ra được.', 'Quên điều kiện các số phải không âm.'],
      worked: [{
        prompt: 'Cho $x>0$. Tìm giá trị nhỏ nhất của biểu thức $A=x+\\f{9}{x}$.',
        thinking: [
          'Hai hạng tử đều dương và **tích của chúng là hằng số** ($x\\cdot\\f{9}{x}=9$) — đúng mô hình áp Cô-si.',
          'Dự đoán điểm rơi: dấu bằng của Cô-si xảy ra khi hai hạng tử bằng nhau, tức $x=\\f{9}{x}$.',
          'Giải ra $x^{2}=9$, mà $x>0$ nên $x=3$ — điểm rơi nằm trong miền cho phép, vậy cách làm này đi đúng hướng.',
        ],
        solution: [
          'Vì $x>0$ nên $\\f{9}{x}>0$. Áp dụng bất đẳng thức Cô-si cho hai số dương:',
          '$A=x+\\f{9}{x}\\ge2\\s{x\\cdot\\f{9}{x}}=2\\s{9}=6$.',
          'Dấu "$=$" xảy ra khi $x=\\f{9}{x}\\Leftrightarrow x^{2}=9\\Leftrightarrow x=3$ (vì $x>0$).',
          'Vậy $A_{\\min}=6$ khi $x=3$.',
        ],
        remark: 'Điều kiện $x>0$ là bắt buộc: nếu $x<0$ thì $A$ có thể nhỏ tuỳ ý, không tồn tại giá trị nhỏ nhất.',
      }],
    },
    {
      id: 'g9-t4-d3', name: 'Dạng 3. Giải bất phương trình bậc nhất một ẩn', level: 'TH',
      method: [
        'Bước 1: khử mẫu (nếu có) bằng cách nhân với BCNN — nếu nhân số **dương** thì giữ chiều.',
        'Bước 2: chuyển vế các hạng tử chứa ẩn về một bên (nhớ đổi dấu).',
        'Bước 3: chia hai vế cho hệ số của ẩn — nếu hệ số **âm** thì **đổi chiều** bất đẳng thức.',
        'Bước 4: biểu diễn tập nghiệm trên trục số.',
      ],
      skills: ['Xử lý chiều bất đẳng thức', 'Biểu diễn tập nghiệm'],
      pitfalls: ['Quên đổi chiều khi chia cho số âm — lỗi nghiêm trọng nhất của chuyên đề.', 'Biểu diễn nhầm dấu ngoặc mở/đóng trên trục số.'],
      worked: [{
        prompt: 'Giải bất phương trình $\\f{2x-1}{3}-\\f{x+2}{2}>1$ và biểu diễn tập nghiệm trên trục số.',
        thinking: [
          'Có mẫu số nên bước đầu là nhân hai vế với BCNN$(3;2)=6$ — số **dương** nên giữ nguyên chiều.',
          'Sau khi khử mẫu, cẩn thận dấu trừ trước ngoặc thứ hai.',
          'Cuối cùng nếu hệ số của $x$ ra số âm thì phải đổi chiều khi chia.',
        ],
        solution: [
          'Nhân hai vế với $6>0$ (giữ nguyên chiều): $2(2x-1)-3(x+2)>6$.',
          '$\\Leftrightarrow 4x-2-3x-6>6\\Leftrightarrow x-8>6\\Leftrightarrow x>14$.',
          'Tập nghiệm: $S=\\{x\\;|\\;x>14\\}$.',
          'Trên trục số: đánh dấu điểm $14$ bằng dấu ngoặc **mở** (vì $x=14$ không thoả), gạch bỏ phần bên trái.',
        ],
        remark: 'Dấu $>$ hay $<$ dùng ngoặc mở; dấu $\\ge$ hay $\\le$ mới tô đặc điểm mút.',
      }],
    },
    {
      id: 'g9-t4-d4', name: 'Dạng 4. Chứng minh bất đẳng thức bằng tổng bình phương', level: 'VD',
      method: [
        'Bước 1: chuyển toàn bộ về một vế: cần chứng minh $A-B\\ge0$.',
        'Bước 2: biến đổi $A-B$ thành **tổng các bình phương** (có thể phải nhân $2$ trước khi nhóm).',
        'Bước 3: kết luận vì bình phương luôn không âm.',
        'Bước 4: chỉ rõ **điều kiện dấu bằng**.',
      ],
      skills: ['Ghép bình phương từ các hạng tử rời rạc', 'Nhận ra khi nào cần nhân hệ số'],
      pitfalls: ['Quên nêu điều kiện dấu bằng — mất điểm dù chứng minh đúng.', 'Dùng Cô-si khi đề không cho điều kiện các biến dương.'],
      worked: [{
        prompt: 'Chứng minh rằng với mọi số thực $x$, $y$ ta có $x^{2}+y^{2}+1\\ge xy+x+y$.',
        thinking: [
          'Đề không cho $x$, $y$ dương nên **không dùng được Cô-si** — phải đi bằng tổng bình phương.',
          'Chuyển hết về một vế, ta cần chứng minh $x^{2}+y^{2}+1-xy-x-y\\ge0$.',
          'Có ba tích chéo $xy$, $x$, $y$ — muốn ghép thành ba bình phương thì phải **nhân $2$** để mỗi biến đủ dùng hai lần.',
        ],
        solution: [
          'Bất đẳng thức tương đương với $x^{2}+y^{2}+1-xy-x-y\\ge0$.',
          'Nhân hai vế với $2>0$: $2x^{2}+2y^{2}+2-2xy-2x-2y\\ge0$.',
          'Nhóm lại: $\\left(x^{2}-2xy+y^{2}\\right)+\\left(x^{2}-2x+1\\right)+\\left(y^{2}-2y+1\\right)\\ge0$',
          '$\\Leftrightarrow (x-y)^{2}+(x-1)^{2}+(y-1)^{2}\\ge0$.',
          'Bất đẳng thức cuối luôn đúng vì là tổng ba bình phương.',
          'Dấu "$=$" xảy ra khi $x-y=0$, $x-1=0$ và $y-1=0$, tức $x=y=1$. (điều phải chứng minh)',
        ],
        remark: 'Đếm số tích chéo để biết cần nhân mấy: có $3$ tích chéo thì nhân $2$, mỗi biến bình phương sẽ đủ chia cho hai nhóm.',
      }],
    },
  ],
  'g9-t5': [
    {
      id: 'g9-t5-d5', name: 'Dạng 5. Giải tam giác vuông', level: 'VD',
      method: [
        'Bước 1: vẽ hình, ghi rõ cạnh huyền và hai cạnh góc vuông.',
        'Bước 2: với mỗi góc nhọn, xác định đâu là cạnh **đối**, đâu là cạnh **kề**.',
        'Bước 3: chọn tỉ số lượng giác nối **đại lượng đã biết** với **đại lượng cần tìm**.',
        'Bước 4: nếu biết hai cạnh, dùng Pythagore sẽ nhanh hơn tỉ số lượng giác.',
      ],
      skills: ['Chọn đúng tỉ số lượng giác', 'Kết hợp Pythagore với tỉ số lượng giác'],
      pitfalls: ['Nhầm cạnh đối với cạnh kề khi đổi góc tham chiếu.', 'Dùng $\\sin$ với cạnh góc vuông thay vì cạnh huyền.'],
      worked: [{
        prompt: 'Cho tam giác $ABC$ vuông tại $A$, biết $AB=6$ cm và $\\angle B=60\\deg$. Tính $AC$ và $BC$.',
        thinking: [
          'Xét theo góc $B$: cạnh $AB$ là cạnh **kề**, cạnh $AC$ là cạnh **đối**, cạnh $BC$ là cạnh **huyền**.',
          'Muốn tìm $AC$ (đối) từ $AB$ (kề) → dùng $\\tan$ vì $\\tan=\\f{\\text{đối}}{\\text{kề}}$.',
          'Muốn tìm $BC$ (huyền) từ $AB$ (kề) → dùng $\\cos$ vì $\\cos=\\f{\\text{kề}}{\\text{huyền}}$.',
        ],
        solution: [
          'Xét tam giác $ABC$ vuông tại $A$ với góc nhọn $B=60\\deg$:',
          '$\\tan B=\\f{AC}{AB}\\Rightarrow AC=AB\\cdot\\tan60\\deg=6\\s{3}$ (cm) $\\approx10{,}39$ cm.',
          '$\\cos B=\\f{AB}{BC}\\Rightarrow BC=\\f{AB}{\\cos60\\deg}=\\f{6}{\\f{1}{2}}=12$ (cm).',
          'Kiểm tra bằng Pythagore: $AB^{2}+AC^{2}=36+108=144=12^{2}=BC^{2}$ ✓',
        ],
        remark: 'Luôn kiểm tra chéo bằng Pythagore ở cuối — bước này bắt được mọi lỗi chọn nhầm tỉ số lượng giác.',
      }],
    },
    {
      id: 'g9-t5-d6', name: 'Dạng 6. Ứng dụng thực tế của tỉ số lượng giác', level: 'VD',
      method: [
        'Bước 1: vẽ mô hình tam giác vuông từ tình huống thực tế.',
        'Bước 2: đánh dấu góc nâng (nhìn lên) hoặc góc hạ (nhìn xuống) — đều đo so với **phương ngang**.',
        'Bước 3: chọn tỉ số lượng giác phù hợp rồi tính.',
        'Bước 4: nếu điểm quan sát ở độ cao nào đó, nhớ **cộng thêm** độ cao ấy vào kết quả.',
      ],
      skills: ['Mô hình hoá tình huống thực tế', 'Xử lý chiều cao của người quan sát'],
      pitfalls: ['Quên cộng chiều cao mắt người quan sát.', 'Nhầm góc nâng với góc ở đỉnh của tam giác.'],
      worked: [{
        prompt: 'Một người đứng cách chân cột cờ $20$ m, nhìn đỉnh cột cờ dưới góc nâng $35\\deg$. Biết khoảng cách từ mắt người đó tới mặt đất là $1{,}6$ m. Tính chiều cao cột cờ (làm tròn đến chữ số thập phân thứ nhất).',
        thinking: [
          'Vẽ tam giác vuông có đỉnh là mắt người, cạnh ngang $20$ m, góc nâng $35\\deg$.',
          'Tam giác này chỉ cho phần cột cờ **cao hơn tầm mắt**, chứ không phải toàn bộ cột cờ.',
          'Vậy kết quả cuối phải **cộng thêm** $1{,}6$ m chiều cao mắt.',
        ],
        solution: [
          'Gọi $h$ là phần cột cờ cao hơn tầm mắt người quan sát.',
          'Trong tam giác vuông có cạnh kề $20$ m và góc $35\\deg$: $\\tan35\\deg=\\f{h}{20}$.',
          '$h=20\\cdot\\tan35\\deg\\approx20\\times0{,}7002\\approx14{,}0$ (m).',
          'Chiều cao cột cờ $=h+1{,}6\\approx14{,}0+1{,}6=15{,}6$ (m).',
        ],
        remark: 'Quên cộng chiều cao mắt là lỗi phổ biến nhất của dạng thực tế này — hãy vẽ hình có ghi rõ mực mắt.',
      }],
    },
  ],
  'g9-t7': [
    {
      id: 'g9-t7-d5', name: 'Dạng 5. Hình cầu và mặt cầu', level: 'TH',
      method: [
        'Diện tích mặt cầu: $S=4\\pi R^{2}$.',
        'Thể tích hình cầu: $V=\\f{4}{3}\\pi R^{3}$.',
        'Đề cho **đường kính** thì phải chia đôi để lấy bán kính trước khi thay vào công thức.',
      ],
      skills: ['Phân biệt diện tích mặt cầu với thể tích hình cầu', 'Chuyển đổi đường kính — bán kính'],
      pitfalls: ['Nhầm $4\\pi R^{2}$ (diện tích) với $\\f{4}{3}\\pi R^{3}$ (thể tích).', 'Thay thẳng đường kính vào công thức.'],
      worked: [{
        prompt: 'Một quả bóng có dạng hình cầu với đường kính $22$ cm. Tính diện tích mặt ngoài và thể tích của quả bóng (lấy $\\pi\\approx3{,}14$, làm tròn đến hàng đơn vị).',
        thinking: [
          'Đề cho **đường kính** $22$ cm nên bán kính là $R=11$ cm — bước này bỏ qua là sai toàn bài.',
          '"Diện tích mặt ngoài" chính là diện tích mặt cầu, dùng $S=4\\pi R^{2}$.',
          'Thể tích dùng công thức có $R^{3}$ và hệ số $\\f{4}{3}$.',
        ],
        solution: [
          'Bán kính quả bóng: $R=\\f{22}{2}=11$ (cm).',
          'Diện tích mặt cầu: $S=4\\pi R^{2}\\approx4\\times3{,}14\\times121\\approx1\\,520\\;(cm^{2})$.',
          'Thể tích hình cầu: $V=\\f{4}{3}\\pi R^{3}\\approx\\f{4}{3}\\times3{,}14\\times1\\,331\\approx5\\,572\\;(cm^{3})$.',
        ],
        remark: 'Mẹo nhớ hệ số: diện tích có số mũ $2$ đi với hệ số $4$; thể tích có số mũ $3$ đi với hệ số $\\f{4}{3}$.',
      }],
    },
    {
      id: 'g9-t7-d3', name: 'Dạng 3. Hình nón — quan hệ giữa bán kính, chiều cao và đường sinh', level: 'VD',
      method: [
        'Ba đại lượng $r$, $h$, $l$ tạo thành tam giác vuông: $l^{2}=r^{2}+h^{2}$.',
        '$S_{xq}=\\pi rl$ (dùng **đường sinh**), $S_{tp}=\\pi rl+\\pi r^{2}$.',
        '$V=\\f{1}{3}\\pi r^{2}h$ (dùng **chiều cao**).',
        'Quay tam giác vuông quanh một cạnh góc vuông: cạnh quay là $h$, cạnh kia là $r$, cạnh huyền là $l$.',
      ],
      skills: ['Chuyển đổi giữa $r$, $h$, $l$ bằng Pythagore', 'Phân biệt công thức diện tích và thể tích'],
      pitfalls: ['Dùng $h$ thay cho $l$ trong công thức $S_{xq}$.', 'Quên hệ số $\\f{1}{3}$ ở thể tích hình nón.'],
      worked: [{
        prompt: 'Một hình nón có bán kính đáy $r=6$ cm và chiều cao $h=8$ cm. Tính diện tích xung quanh và thể tích của hình nón đó.',
        thinking: [
          'Diện tích xung quanh cần **đường sinh** $l$, mà đề chỉ cho $r$ và $h$ → phải tính $l$ trước bằng Pythagore.',
          '$r=6$, $h=8$ gợi ngay bộ ba $(6;8;10)$ nên $l=10$.',
          'Thể tích thì dùng thẳng $h$, không cần $l$.',
        ],
        solution: [
          'Đường sinh: $l=\\s{r^{2}+h^{2}}=\\s{6^{2}+8^{2}}=\\s{100}=10$ (cm).',
          'Diện tích xung quanh: $S_{xq}=\\pi rl=\\pi\\cdot6\\cdot10=60\\pi\\;(cm^{2})\\approx188{,}5\\;cm^{2}$.',
          'Thể tích: $V=\\f{1}{3}\\pi r^{2}h=\\f{1}{3}\\pi\\cdot36\\cdot8=96\\pi\\;(cm^{3})\\approx301{,}6\\;cm^{3}$.',
        ],
        remark: 'Mẹo nhớ: diện tích **xung quanh** thì "đi vòng theo mặt bên" nên dùng đường sinh; thể tích thì "đo bề dày" nên dùng chiều cao.',
      }],
    },
    {
      id: 'g9-t7-d4', name: 'Dạng 4. Bài toán thực tế với khối tròn xoay', level: 'VD',
      method: [
        'Bước 1: nhận dạng khối — trụ, nón, cầu, hay khối ghép.',
        'Bước 2: với khối ghép, tách thành các khối cơ bản rồi **cộng** (ghép vào) hoặc **trừ** (khoét đi).',
        'Bước 3: thống nhất đơn vị, nhớ $1\\;dm^{3}=1$ lít.',
      ],
      skills: ['Nhận dạng khối từ mô tả thực tế', 'Cộng trừ thể tích khối ghép'],
      pitfalls: ['Nhầm bán kính với đường kính (đề thường cho đường kính).', 'Quên đổi đơn vị sang lít.'],
      worked: [{
        prompt: 'Một bồn chứa nước có dạng hình trụ với đường kính đáy $1{,}2$ m và chiều cao $1{,}5$ m. Hỏi bồn chứa được tối đa bao nhiêu lít nước? (Lấy $\\pi\\approx3{,}14$, làm tròn đến hàng đơn vị.)',
        thinking: [
          'Đề cho **đường kính** $1{,}2$ m, mà công thức cần **bán kính** → phải chia đôi trước.',
          'Tính thể tích ra $m^{3}$, rồi đổi sang lít với $1\\;m^{3}=1000$ lít.',
          'Đây là hai bẫy được cài liên tiếp trong cùng một câu.',
        ],
        solution: [
          'Bán kính đáy: $r=\\f{1{,}2}{2}=0{,}6$ (m).',
          'Thể tích bồn: $V=\\pi r^{2}h\\approx3{,}14\\times0{,}6^{2}\\times1{,}5=3{,}14\\times0{,}36\\times1{,}5\\approx1{,}6956\\;(m^{3})$.',
          'Đổi sang lít: $1{,}6956\\;m^{3}\\approx1\\,695{,}6$ lít $\\approx1\\,696$ lít.',
          'Vậy bồn chứa được tối đa khoảng $1\\,696$ lít nước.',
        ],
        remark: 'Gạch chân ngay chữ "đường kính" khi đọc đề — đây là bẫy xuất hiện ở hơn một nửa số bài thực tế về hình trụ.',
      }],
    },
  ],
  'g9-t8': [
    {
      id: 'g9-t8-d5', name: 'Dạng 5. Tần số tương đối và biểu đồ', level: 'TH',
      method: [
        'Tần số tương đối của một giá trị $=\\f{\\text{tần số}}{N}\\times100\\%$.',
        'Tổng tất cả tần số tương đối luôn bằng $100\\%$ — dùng để kiểm tra lại.',
        'Biểu đồ quạt tròn: góc ở tâm $=$ tần số tương đối $\\times360\\deg$.',
      ],
      skills: ['Lập bảng tần số tương đối', 'Kiểm tra chéo bằng tổng'],
      pitfalls: ['Chia cho tần số của một nhóm thay vì tổng $N$.', 'Quên nhân $100\\%$ khi đề hỏi phần trăm.'],
      worked: [{
        prompt: 'Khảo sát môn thể thao yêu thích của $200$ học sinh: Bóng đá $80$ em, Cầu lông $50$ em, Bơi lội $40$ em, môn khác $30$ em. Lập bảng tần số tương đối và tính góc ở tâm của hình quạt biểu diễn Cầu lông.',
        thinking: [
          'Tần số tương đối của mỗi môn lấy tần số chia cho tổng $N=200$ rồi nhân $100\\%$.',
          'Góc ở tâm thì nhân tỉ lệ với $360\\deg$ chứ không phải $100$.',
          'Cuối cùng cộng lại để kiểm tra: tổng phần trăm phải bằng $100\\%$.',
        ],
        solution: [
          'Bóng đá: $\\f{80}{200}=40\\%$ · Cầu lông: $\\f{50}{200}=25\\%$ · Bơi lội: $\\f{40}{200}=20\\%$ · Khác: $\\f{30}{200}=15\\%$.',
          'Kiểm tra: $40\\%+25\\%+20\\%+15\\%=100\\%$ ✓',
          'Góc ở tâm của Cầu lông: $\\f{50}{200}\\times360\\deg=25\\%\\times360\\deg=90\\deg$.',
        ],
        remark: 'Tần số tương đối cho phép so sánh giữa hai bộ dữ liệu có cỡ khác nhau — điều mà tần số thô không làm được.',
      }],
    },
    {
      id: 'g9-t8-d3', name: 'Dạng 3. Bảng tần số ghép nhóm', level: 'TH',
      method: [
        'Bước 1: xác định **giá trị đại diện** của mỗi nhóm — chính là trung điểm của nhóm đó.',
        'Bước 2: tính như bảng tần số thường, dùng giá trị đại diện thay cho số liệu gốc.',
        'Bước 3: tần số tương đối $=\\f{\\text{tần số}}{N}\\times100\\%$.',
      ],
      skills: ['Tính giá trị đại diện của nhóm', 'Tính số trung bình từ bảng ghép nhóm'],
      pitfalls: ['Lấy đầu mút nhóm thay vì trung điểm.', 'Quên nhân tần số khi tính trung bình.'],
      worked: [{
        prompt: 'Điểm kiểm tra của $40$ học sinh được ghép nhóm: $[0;4)$ có $4$ em, $[4;6)$ có $10$ em, $[6;8)$ có $18$ em, $[8;10]$ có $8$ em. Tính điểm trung bình của lớp (làm tròn đến chữ số thập phân thứ hai).',
        thinking: [
          'Ghép nhóm làm mất số liệu gốc, nên phải thay mỗi nhóm bằng **trung điểm** của nó.',
          'Trung điểm các nhóm lần lượt là $2$, $5$, $7$, $9$.',
          'Trung bình $=\\f{\\text{tổng của (đại diện} \\times \\text{tần số)}}{N}$.',
        ],
        solution: [
          'Giá trị đại diện các nhóm: $[0;4)\\to2$ · $[4;6)\\to5$ · $[6;8)\\to7$ · $[8;10]\\to9$.',
          'Tổng điểm ước lượng: $2\\times4+5\\times10+7\\times18+9\\times8=8+50+126+72=256$.',
          'Điểm trung bình: $\\f{256}{40}=6{,}4$.',
          'Vậy điểm trung bình của lớp khoảng $6{,}40$.',
        ],
        remark: 'Kết quả chỉ là **ước lượng** vì đã thay số liệu thật bằng đại diện — đề thường yêu cầu ghi rõ điều này.',
      }],
    },
    {
      id: 'g9-t8-d4', name: 'Dạng 4. Xác suất của phép thử hai giai đoạn', level: 'VD',
      method: [
        'Bước 1: lập **sơ đồ hình cây** hoặc bảng để liệt kê đủ không gian mẫu.',
        'Bước 2: đếm số kết quả thuận lợi.',
        'Bước 3: với biến cố "ít nhất một...", tính qua **biến cố đối** rồi lấy $1$ trừ đi.',
        'Lưu ý: chọn **không hoàn lại** thì tổng số giảm dần qua từng giai đoạn.',
      ],
      skills: ['Vẽ sơ đồ cây', 'Dùng biến cố đối'],
      pitfalls: ['Liệt kê sót trường hợp khi đếm nhẩm.', 'Quên rằng không gian mẫu thay đổi khi không hoàn lại.'],
      worked: [{
        prompt: 'Tung một đồng xu cân đối hai lần. Tính xác suất của biến cố $A$: "Có ít nhất một lần xuất hiện mặt ngửa".',
        thinking: [
          'Mỗi lần tung có $2$ kết quả, tung hai lần cho $2\\times2=4$ kết quả đồng khả năng.',
          '"Ít nhất một lần ngửa" gồm nhiều trường hợp — đếm biến cố **đối** sẽ nhanh hơn.',
          'Biến cố đối là "không có lần nào ngửa", tức cả hai lần đều sấp — chỉ đúng **một** trường hợp.',
        ],
        solution: [
          'Ký hiệu $N$ là mặt ngửa, $S$ là mặt sấp. Không gian mẫu: $\\{NN;\\;NS;\\;SN;\\;SS\\}$ — có $4$ kết quả đồng khả năng.',
          'Biến cố đối $\\ov{A}$: "không lần nào xuất hiện mặt ngửa", tức kết quả $SS$ — có $1$ kết quả.',
          '$P(\\ov{A})=\\f{1}{4}$.',
          '$P(A)=1-P(\\ov{A})=1-\\f{1}{4}=\\f{3}{4}$.',
        ],
        remark: 'Hễ thấy "ít nhất một" là nghĩ ngay tới biến cố đối — thường chỉ có đúng một trường hợp, đếm cực nhanh.',
      }],
    },
  ],
};
