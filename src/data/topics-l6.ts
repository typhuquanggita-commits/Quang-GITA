import type { Topic } from '@/types';

/**
 * Cây chuyên đề Luồng 4 — Toán thi vào lớp 6 trường chất lượng cao.
 *
 * Toàn bộ nội dung nằm trong chương trình tiểu học. Điểm khác biệt của đề đánh
 * giá năng lực không nằm ở kiến thức mới mà ở cách hỏi: dữ kiện gài trong lời
 * văn, nhiều bước, và thời gian rất chặt. Vì vậy mỗi chuyên đề ở đây đều gắn
 * một công cụ tư duy cụ thể (sơ đồ đoạn thẳng, bảng suy luận, tính ngược) chứ
 * không chỉ là một nhóm công thức.
 *
 * `frequency` là ước lượng tần suất xuất hiện (%) trong các đề đánh giá năng
 * lực vào lớp 6 của nhóm trường chất lượng cao Hà Nội — dùng để xếp thứ tự ưu
 * tiên ôn tập, không phải số liệu chính thức của bất kỳ trường nào.
 */
export const TOPICS_L6: Topic[] = [
  {
    id: 'l6-phan-so-thap-phan',
    name: 'Phân số, số thập phân & bốn phép tính',
    strand: 'so-hoc',
    tracks: ['lop6'],
    grade: 5,
    level: 1,
    frequency: 100,
    hours: 8,
    summary:
      'Nền của mọi câu còn lại. Một lỗi cộng phân số ở bước 2 sẽ kéo sai cả câu dù cách làm đúng hoàn toàn.',
    outcomes: [
      'Cộng, trừ, nhân, chia phân số và số thập phân chính xác, không cần máy tính.',
      'Chuyển qua lại giữa phân số, số thập phân và tỉ số phần trăm.',
      'Tính nhanh biểu thức bằng cách nhóm hợp lý thay vì tính tuần tự.',
    ],
    techniques: [
      'Quy đồng bằng bội chung nhỏ nhất thay vì nhân chéo hai mẫu — số nhỏ hơn, ít sai hơn.',
      'Rút gọn trước khi nhân: gạch chéo tử với mẫu để tránh số lớn.',
      'Nhóm các số có tổng tròn chục, tròn trăm khi tính nhanh.',
      'Đổi số thập phân sang phân số khi trong biểu thức đã có phân số, và ngược lại.',
    ],
    pitfalls: [
      'Cộng phân số bằng cách cộng tử với tử, mẫu với mẫu.',
      'Quên rút gọn kết quả cuối, mất điểm trình bày.',
      'Nhầm thứ tự thực hiện phép tính khi có ngoặc lồng nhau.',
      'Chia phân số nhưng chỉ đảo ngược số bị chia thay vì số chia.',
    ],
    prerequisites: [],
    keyFormulas: [
      'a/b + c/d = (a·d + c·b)/(b·d), rồi rút gọn',
      'a/b : c/d = a/b × d/c',
      'Thứ tự: ngoặc → nhân chia → cộng trừ, trái sang phải',
    ],
    questionIds: [],
  },
  {
    id: 'l6-ti-so-phan-tram',
    name: 'Tỉ số & tỉ số phần trăm',
    strand: 'so-hoc',
    tracks: ['lop6'],
    grade: 5,
    level: 2,
    frequency: 90,
    hours: 7,
    summary:
      'Dạng gần như chắc chắn có mặt, thường gắn với tình huống mua bán, tăng giảm giá, lãi lỗ.',
    outcomes: [
      'Tìm tỉ số phần trăm của hai số và tìm một số khi biết giá trị phần trăm của nó.',
      'Xử lý tăng rồi giảm liên tiếp mà không cộng trừ phần trăm một cách máy móc.',
      'Đọc được bài toán lãi – lỗ theo giá vốn hay theo giá bán.',
    ],
    techniques: [
      'Luôn xác định “phần trăm của cái gì” trước khi tính — đây là bước quyết định.',
      'Coi số gốc là 100% rồi lập bảng: giá trị ↔ phần trăm.',
      'Tăng a% rồi giảm b% thì nhân liên tiếp, không cộng trừ phần trăm.',
      'Với bài lãi – lỗ, quy về giá vốn nếu đề không nói rõ.',
    ],
    pitfalls: [
      'Tăng 20% rồi giảm 20% mà kết luận là về như cũ.',
      'Lấy phần trăm của số mới trong khi đề hỏi phần trăm của số cũ.',
      'Nhầm “nhiều hơn 25%” với “bằng 25%”.',
      'Làm tròn giữa chừng khiến kết quả lệch.',
    ],
    prerequisites: ['l6-phan-so-thap-phan'],
    keyFormulas: [
      'Tỉ số phần trăm của a so với b: a : b × 100%',
      'Tìm a biết p% của a bằng m: a = m : p × 100',
      'Tăng a% rồi giảm b%: giá trị cuối = gốc × (1 + a/100) × (1 − b/100)',
    ],
    questionIds: [],
  },
  {
    id: 'l6-toan-chuyen-dong',
    name: 'Toán chuyển động',
    strand: 'thuc-te',
    tracks: ['lop6'],
    grade: 5,
    level: 2,
    frequency: 85,
    hours: 9,
    summary:
      'Dạng “đinh” của đề vào 6. Ba mô hình chuẩn — gặp nhau, đuổi kịp, dòng nước — phủ gần hết các câu chuyển động trong đề.',
    outcomes: [
      'Nhận ra ngay đề thuộc mô hình nào trong ba mô hình chuẩn.',
      'Vẽ được sơ đồ đoạn thẳng cho mọi bài chuyển động.',
      'Đổi đơn vị thời gian và vận tốc chính xác.',
    ],
    techniques: [
      'Ngược chiều thì cộng vận tốc, cùng chiều thì trừ vận tốc — vẽ sơ đồ để không nhớ nhầm.',
      'Vận tốc xuôi dòng = vận tốc thực + vận tốc dòng; ngược dòng thì trừ.',
      'Đổi mọi đơn vị về cùng một hệ ngay ở dòng đầu tiên.',
      'Với bài xuất phát lệch giờ, tính trước quãng đường đi được của người đi sớm.',
    ],
    pitfalls: [
      'Cộng vận tốc khi hai xe đi cùng chiều.',
      'Để lẫn phút với giờ trong cùng một phép chia.',
      'Quên trừ thời gian nghỉ dọc đường khi đề có nói.',
      'Trả lời thời gian gặp nhau trong khi đề hỏi thời điểm gặp nhau.',
    ],
    prerequisites: ['l6-phan-so-thap-phan'],
    keyFormulas: [
      's = v × t;  v = s : t;  t = s : v',
      'Ngược chiều: t gặp nhau = s : (v₁ + v₂)',
      'Cùng chiều: t đuổi kịp = khoảng cách đầu : (v₁ − v₂)',
      'v xuôi − v ngược = 2 × v dòng nước',
    ],
    questionIds: [],
  },
  {
    id: 'l6-toan-tinh-nguoc',
    name: 'Toán tính ngược & sơ đồ đoạn thẳng',
    strand: 'dai-so',
    tracks: ['lop6'],
    grade: 5,
    level: 2,
    frequency: 75,
    hours: 7,
    summary:
      'Công cụ thay cho “giải phương trình” ở bậc tiểu học. Rất nhiều câu tưởng khó sẽ tan ra khi vẽ đúng sơ đồ.',
    outcomes: [
      'Giải bài toán cho biết kết quả cuối, hỏi giá trị ban đầu.',
      'Vẽ sơ đồ đoạn thẳng cho bài tổng – hiệu, tổng – tỉ, hiệu – tỉ.',
      'Trình bày lời giải bằng lời văn đúng chuẩn tiểu học.',
    ],
    techniques: [
      'Đi ngược từ kết quả về đầu, mỗi bước làm phép tính ngược lại phép tính trong đề.',
      'Chia thành phần bằng nhau trên sơ đồ để đọc ra giá trị một phần.',
      'Đặt phần nhỏ nhất làm một đơn vị rồi biểu diễn mọi đại lượng khác theo nó.',
      'Với bài “còn lại một nửa rồi thêm 3”, luôn xử lý phép cuối cùng trước.',
    ],
    pitfalls: [
      'Đi ngược nhưng vẫn làm đúng phép tính trong đề thay vì phép ngược.',
      'Vẽ sơ đồ sai tỉ lệ khiến đọc ra số phần sai.',
      'Quên rằng “gấp 3 lần” khác “nhiều hơn 3 lần”.',
      'Không thử lại bằng cách đi xuôi để kiểm tra.',
    ],
    prerequisites: ['l6-phan-so-thap-phan'],
    keyFormulas: [
      'Tổng – hiệu: số lớn = (tổng + hiệu) : 2',
      'Tổng – tỉ: giá trị một phần = tổng : (số phần lớn + số phần bé)',
      'Hiệu – tỉ: giá trị một phần = hiệu : (số phần lớn − số phần bé)',
    ],
    questionIds: [],
  },
  {
    id: 'l6-hinh-hoc-tieu-hoc',
    name: 'Hình học tiểu học & hình ghép',
    strand: 'hinh-hoc',
    tracks: ['lop6'],
    grade: 5,
    level: 2,
    frequency: 80,
    hours: 8,
    summary:
      'Phần dễ lấy điểm nhất nếu chịu vẽ hình, và dễ mất điểm nhất nếu chỉ nhớ công thức mà không nhìn hình.',
    outcomes: [
      'Tính chu vi, diện tích các hình cơ bản và hình ghép từ chúng.',
      'Tính diện tích xung quanh, toàn phần và thể tích hình hộp chữ nhật, hình lập phương.',
      'Xử lý bài thay đổi kích thước: tăng cạnh thì diện tích thay đổi thế nào.',
    ],
    techniques: [
      'Chia hình ghép thành các hình cơ bản, hoặc lấy hình lớn trừ đi phần thừa — chọn cách ít bước hơn.',
      'Đánh dấu mọi độ dài đã biết lên hình trước khi tính.',
      'Với bài quét sơn, lát gạch: xác định rõ có tính mặt trên, mặt dưới hay không.',
      'Nhân đôi cạnh thì diện tích gấp 4, thể tích gấp 8 — nhớ theo số chiều.',
    ],
    pitfalls: [
      'Quên chia đôi khi tính diện tích tam giác hoặc hình thang.',
      'Lẫn đơn vị: cm với cm², m² với dm².',
      'Tính cả nắp cho bể không nắp.',
      'Dùng chiều cao của hình này cho hình kia trong hình ghép.',
    ],
    prerequisites: ['l6-phan-so-thap-phan'],
    keyFormulas: [
      'S tam giác = a × h : 2',
      'S hình thang = (a + b) × h : 2',
      'S hình tròn = r × r × 3,14;  C = d × 3,14',
      'V hình hộp chữ nhật = a × b × c;  S xq = chu vi đáy × chiều cao',
    ],
    questionIds: [],
  },
  {
    id: 'l6-suy-luan-logic',
    name: 'Suy luận logic & bài toán bảng',
    strand: 'to-hop',
    tracks: ['lop6'],
    grade: 5,
    level: 3,
    frequency: 70,
    hours: 7,
    summary:
      'Câu phân hoá thật của đề đánh giá năng lực: không cần công thức nào, chỉ cần một cách nghĩ có hệ thống.',
    outcomes: [
      'Lập bảng đúng/sai để xử lý bài toán ghép người – vật – thuộc tính.',
      'Dùng phép loại trừ có ghi chép thay vì đoán.',
      'Giải bài cân đĩa và bài chia nhóm ở mức cơ bản.',
    ],
    techniques: [
      'Kẻ bảng, mỗi dữ kiện đánh một dấu ✗ hoặc ✓, không giữ trong đầu.',
      'Bắt đầu từ dữ kiện chắc chắn nhất, không bắt đầu từ dữ kiện đầu tiên.',
      'Khi một hàng chỉ còn một ô trống chưa loại, ô đó là đáp án — rồi loại tiếp cả cột.',
      'Với bài cân đĩa, mỗi lần cân chia số khả năng thành ba phần gần bằng nhau.',
    ],
    pitfalls: [
      'Đọc dữ kiện phủ định thành khẳng định: “A không ngồi cạnh B” thành “A ngồi cạnh B”.',
      'Suy luận trong đầu rồi quên mất một nhánh đã xét.',
      'Dừng lại khi tìm được một lời giải mà không kiểm tra đã dùng hết dữ kiện chưa.',
      'Tốn quá nhiều thời gian cho một câu, ảnh hưởng phần còn lại của đề.',
    ],
    prerequisites: [],
    keyFormulas: [
      'Nguyên tắc bảng: mỗi hàng và mỗi cột chỉ có đúng một dấu ✓',
      'Cân đĩa: n lần cân phân biệt được tối đa 3ⁿ trường hợp',
    ],
    questionIds: [],
  },
  {
    id: 'l6-day-so-quy-luat',
    name: 'Dãy số theo quy luật & đếm hình',
    strand: 'to-hop',
    tracks: ['lop6'],
    grade: 5,
    level: 3,
    frequency: 65,
    hours: 6,
    summary:
      'Dạng nhìn thì lạ nhưng chỉ xoay quanh vài quy luật quen. Nhận ra quy luật là xong tám phần mười câu.',
    outcomes: [
      'Tìm số hạng thứ n và tính tổng của dãy cách đều.',
      'Nhận ra quy luật cộng, nhân, và quy luật hai tầng.',
      'Đếm số hình tam giác, hình chữ nhật trong một hình chia lưới.',
    ],
    techniques: [
      'Viết hiệu giữa các số hạng liên tiếp thành một dãy mới — nếu dãy mới đều thì đã tìm ra quy luật.',
      'Số hạng thứ n của dãy cách đều: số đầu + (n − 1) × khoảng cách.',
      'Tổng dãy cách đều = (số đầu + số cuối) × số số hạng : 2.',
      'Đếm hình theo nhóm kích thước, không đếm tràn lan.',
    ],
    pitfalls: [
      'Quên trừ 1 trong công thức số hạng thứ n.',
      'Đếm số số hạng bằng cách lấy hiệu chia khoảng cách mà quên cộng 1.',
      'Đếm sót hình ghép từ nhiều ô nhỏ.',
      'Kết luận quy luật chỉ sau khi nhìn hai số hạng đầu.',
    ],
    prerequisites: ['l6-phan-so-thap-phan'],
    keyFormulas: [
      'Số số hạng = (số cuối − số đầu) : khoảng cách + 1',
      'Số hạng thứ n = số đầu + (n − 1) × khoảng cách',
      'Tổng = (số đầu + số cuối) × số số hạng : 2',
      'Số hình chữ nhật trong lưới m × n ô: (số cách chọn 2 đường dọc) × (số cách chọn 2 đường ngang)',
    ],
    questionIds: [],
  },
  {
    id: 'l6-doc-hieu-du-lieu',
    name: 'Đọc hiểu bảng biểu & toán có lời văn nhiều bước',
    strand: 'thuc-te',
    tracks: ['lop6'],
    grade: 5,
    level: 3,
    frequency: 60,
    hours: 6,
    summary:
      'Đề đánh giá năng lực ngày càng nhiều câu đọc dữ liệu rồi mới tính. Sai ở đây không phải sai Toán mà là sai đọc.',
    outcomes: [
      'Đọc đúng số liệu từ bảng, biểu đồ cột và biểu đồ tranh.',
      'Tách một bài toán dài thành các bước nhỏ có thứ tự.',
      'Trả lời đúng thứ đề hỏi, kèm đơn vị.',
    ],
    techniques: [
      'Đọc câu hỏi trước, đọc bảng sau — biết cần tìm gì thì đọc nhanh hơn nhiều.',
      'Gạch chân dữ kiện số và khoanh tròn từ khoá “nhiều hơn”, “gấp”, “còn lại”.',
      'Viết ra sơ đồ các bước trước khi tính bước nào.',
      'Sau khi ra kết quả, đọc lại câu hỏi một lần nữa rồi mới ghi đáp số.',
    ],
    pitfalls: [
      'Lấy nhầm dòng hoặc nhầm cột trong bảng.',
      'Bỏ sót một dữ kiện nằm ở câu cuối của đoạn văn.',
      'Tính đúng nhưng trả lời sai đại lượng — lỗi mất điểm phổ biến nhất của dạng này.',
      'Quên đơn vị ở đáp số.',
    ],
    prerequisites: ['l6-phan-so-thap-phan', 'l6-ti-so-phan-tram'],
    keyFormulas: [
      'Quy trình 4 bước: đọc câu hỏi → lấy dữ kiện → lập sơ đồ bước → tính và soát',
    ],
    questionIds: [],
  },
];
