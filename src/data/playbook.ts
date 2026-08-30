import type { TrackId } from '@/types';

/* ============================================================
   KHO BÍ KÍP — mẹo và kỹ thuật rút ra từ thực chiến phòng thi
   ============================================================ */

export type TipCategory = 'tinh-nhanh' | 'may-tinh' | 'trinh-bay' | 'phong-thi' | 'ghi-nho' | 'tu-duy';

export const TIP_CATEGORY: Record<TipCategory, { label: string; color: string; desc: string }> = {
  'tinh-nhanh': { label: 'Tính nhanh', color: '#4338ca', desc: 'Rút ngắn thời gian tính toán mà không mất độ chính xác.' },
  'may-tinh': { label: 'Máy tính cầm tay', color: '#0891b2', desc: 'Khai thác đúng cách — công cụ kiểm tra, không phải công cụ thay thế tư duy.' },
  'trinh-bay': { label: 'Trình bày', color: '#b45309', desc: 'Ăn trọn điểm barem với cùng một lời giải.' },
  'phong-thi': { label: 'Phòng thi', color: '#be123c', desc: 'Chiến thuật thời gian và kiểm soát tâm lý.' },
  'ghi-nho': { label: 'Ghi nhớ', color: '#0f766e', desc: 'Nhớ lâu công thức mà không cần học vẹt.' },
  'tu-duy': { label: 'Tư duy', color: '#7c3aed', desc: 'Cách nghĩ khi gặp bài chưa từng thấy.' },
};

export interface Tip {
  id: string;
  category: TipCategory;
  tracks: TrackId[];
  title: string;
  body: string;
  example?: string;
}

export const TIPS: Tip[] = [
  {
    id: 'tip-01',
    category: 'tinh-nhanh',
    tracks: ['thpt', 'chuyen', 'thpt-qg'],
    title: 'Nhẩm nghiệm bằng Viète trước khi tính Δ',
    body: 'Với phương trình bậc hai hệ số nguyên nhỏ, hãy thử tìm hai số có tổng bằng −b/a và tích bằng c/a trước. Nhanh hơn tính Δ và ít sai dấu hơn.',
    example: 'x² − 7x + 12 = 0: hai số có tổng 7, tích 12 là 3 và 4 ⇒ nghiệm x = 3, x = 4.',
  },
  {
    id: 'tip-02',
    category: 'tinh-nhanh',
    tracks: ['thpt', 'chuyen'],
    title: 'Bình phương thay vì xét dấu với |x₁ − x₂|',
    body: 'Gặp biểu thức chứa trị tuyệt đối của hiệu hai nghiệm, đừng chia trường hợp. Bình phương ngay: (x₁ − x₂)² = S² − 4P.',
  },
  {
    id: 'tip-03',
    category: 'tinh-nhanh',
    tracks: ['thpt-qg'],
    title: 'Đổi biến là đổi luôn cận',
    body: 'Khi tính tích phân bằng phương pháp đổi biến, hãy viết cận mới ngay bên cạnh phép đặt. Quên đổi cận là lỗi mất điểm phổ biến nhất của chương tích phân.',
  },
  {
    id: 'tip-04',
    category: 'tinh-nhanh',
    tracks: ['chuyen'],
    title: 'Nhân 4 rồi hoàn thành bình phương',
    body: 'Với bài chia hết dạng n² + bn + c ⋮ p (p lẻ), hãy nhân cả biểu thức với 4 để được (2n + b)² + (4c − b²). Bài toán lập tức gọn lại.',
    example: 'n² + 3n + 5 ⋮ 11 ⇔ (2n + 3)² + 11 ⋮ 11 ⇔ 2n + 3 ⋮ 11.',
  },
  {
    id: 'tip-05',
    category: 'tinh-nhanh',
    tracks: ['thpt', 'chuyen', 'thpt-qg'],
    title: 'Tách phần nguyên để xét tính nguyên',
    body: 'Biểu thức dạng (ax + b)/(cx + d) nên tách thành hằng số cộng với phân số có tử là hằng. Khi đó bài toán “tìm x nguyên” quy về xét ước.',
  },
  {
    id: 'tip-06',
    category: 'may-tinh',
    tracks: ['thpt-qg'],
    title: 'Dùng TABLE để đoán nghiệm và đoán dáng đồ thị',
    body: 'Chức năng TABLE cho phép xem hàng loạt giá trị của hàm số. Rất hữu ích để khoanh vùng nghiệm hoặc kiểm tra nhanh số cực trị trước khi làm chính xác.',
  },
  {
    id: 'tip-07',
    category: 'may-tinh',
    tracks: ['thpt-qg'],
    title: 'Kiểm tra đáp số Phần III bằng cách thứ hai',
    body: 'Phần trả lời ngắn không có phương án để loại trừ, nên mọi sai sót đều mất trọn điểm. Hãy tính lại bằng một con đường khác (thay số, dùng máy tính, ước lượng) trước khi điền.',
  },
  {
    id: 'tip-08',
    category: 'may-tinh',
    tracks: ['thpt-qg'],
    title: 'CALC để thử đáp án trắc nghiệm',
    body: 'Với câu hỏi “giá trị nào thoả mãn”, thay trực tiếp từng phương án bằng CALC thường nhanh hơn giải trọn vẹn. Nhưng chỉ dùng khi bí — làm quen kiểu này sẽ hỏng nền tự luận.',
  },
  {
    id: 'tip-09',
    category: 'trinh-bay',
    tracks: ['thpt', 'chuyen'],
    title: 'Mỗi ý bắt đầu bằng câu dẫn',
    body: '“Ta có…”, “Xét tam giác … và tam giác …”, “Theo định lí …”. Giám khảo tìm điểm theo từ khoá; câu dẫn giúp họ tìm thấy ngay.',
  },
  {
    id: 'tip-10',
    category: 'trinh-bay',
    tracks: ['thpt', 'chuyen'],
    title: 'ĐKXĐ viết ngay dòng đầu',
    body: 'Không bao giờ để phần điều kiện xuống cuối bài. Viết ngay từ đầu vừa được điểm barem vừa tránh nhận nghiệm ngoại lai.',
  },
  {
    id: 'tip-11',
    category: 'trinh-bay',
    tracks: ['thpt', 'chuyen'],
    title: 'Kết luận bằng một câu hoàn chỉnh',
    body: 'Barem thường có 0,25 điểm cho phần kết luận, đặc biệt ở bài giải toán bằng cách lập phương trình. Một dòng “Vậy vận tốc lúc đi là 40 km/h” là 0,25 điểm.',
  },
  {
    id: 'tip-12',
    category: 'trinh-bay',
    tracks: ['chuyen'],
    title: 'Tách bổ đề ra riêng',
    body: 'Ở bài hình khó, nếu phải dùng một kết quả trung gian, hãy phát biểu nó thành “Bổ đề” và chứng minh riêng. Lời giải sáng sủa hơn và dễ chấm điểm thành phần hơn.',
  },
  {
    id: 'tip-13',
    category: 'trinh-bay',
    tracks: ['thpt', 'chuyen'],
    title: 'Vẽ hình bằng bút chì trước',
    body: 'Vẽ nhạt bằng bút chì, kiểm tra quan hệ vuông góc và vị trí tương đối, rồi mới tô lại bằng bút mực. Hình sai thì cả bài sai, không cứu được.',
  },
  {
    id: 'tip-14',
    category: 'phong-thi',
    tracks: ['thpt', 'chuyen', 'thpt-qg'],
    title: 'Quy tắc ba vòng',
    body: 'Vòng 1 làm mọi ý chắc chắn. Vòng 2 quay lại các ý cần suy nghĩ. Vòng 3 dành cho ý khó nhất. Không bao giờ làm tuần tự cứng nhắc từ đầu đến cuối.',
  },
  {
    id: 'tip-15',
    category: 'phong-thi',
    tracks: ['thpt', 'chuyen', 'thpt-qg'],
    title: 'Đặt trần thời gian cho mỗi bài',
    body: 'Chạm trần mà chưa xong thì chuyển bài và đánh dấu. Sa lầy 20 phút vào một ý 0,5 điểm là cách mất điểm đắt nhất trong phòng thi.',
  },
  {
    id: 'tip-16',
    category: 'phong-thi',
    tracks: ['thpt-qg'],
    title: 'Phần II: cố thêm một ý là gấp đôi điểm',
    body: 'Cơ chế luỹ tiến khiến bước từ 3 ý lên 4 ý đáng 0,50 điểm, trong khi bước từ 2 lên 3 chỉ đáng 0,25. Câu nào đã chắc 3 ý, hãy dồn sức xử lý nốt ý còn lại.',
  },
  {
    id: 'tip-17',
    category: 'phong-thi',
    tracks: ['thpt-qg'],
    title: 'Không bỏ trống ý nào ở Phần II',
    body: 'Mỗi ý là một mệnh đề đúng/sai độc lập. Bỏ trống chắc chắn không có điểm; chọn có cân nhắc thì vẫn còn cơ hội.',
  },
  {
    id: 'tip-18',
    category: 'phong-thi',
    tracks: ['thpt', 'chuyen', 'thpt-qg'],
    title: 'Năm phút cuối luôn dành để soát',
    body: 'Gần như lần nào soát cũng tìm ra ít nhất một lỗi. Soát theo thứ tự: điều kiện — đối chiếu nghiệm — đơn vị — kết luận.',
  },
  {
    id: 'tip-19',
    category: 'phong-thi',
    tracks: ['thpt', 'chuyen', 'thpt-qg'],
    title: 'Bí thì chuyển bài, đừng đọc lại đề',
    body: 'Đọc lại đề khi đang bí thường chỉ củng cố lối mòn tư duy. Chuyển sang bài khác 5 phút rồi quay lại, não sẽ tiếp cận theo hướng mới.',
  },
  {
    id: 'tip-20',
    category: 'ghi-nho',
    tracks: ['thpt', 'chuyen', 'thpt-qg'],
    title: 'Sổ công thức viết tay của riêng mình',
    body: 'Tự viết tay công thức khi kết thúc mỗi chương. Việc viết tay tạo trí nhớ vận động; một quyển sổ tự viết có giá trị hơn mười tài liệu tải về.',
  },
  {
    id: 'tip-21',
    category: 'ghi-nho',
    tracks: ['thpt-qg'],
    title: 'Nhớ công thức bằng cách suy lại',
    body: 'Thay vì học thuộc, hãy tập suy ra công thức từ một công thức gốc. Ví dụ mọi công thức lượng giác đều suy được từ công thức cộng.',
  },
  {
    id: 'tip-22',
    category: 'ghi-nho',
    tracks: ['thpt', 'chuyen', 'thpt-qg'],
    title: 'Ôn ngắt quãng: 1 – 3 – 7 – 21',
    body: 'Ôn lại kiến thức sau 1 ngày, 3 ngày, 7 ngày và 21 ngày. Cùng một lượng thời gian nhưng hiệu quả ghi nhớ cao hơn nhiều so với ôn dồn.',
  },
  {
    id: 'tip-23',
    category: 'tu-duy',
    tracks: ['chuyen'],
    title: 'Thử trường hợp nhỏ trước',
    body: 'Gặp bài tổ hợp hoặc số học tổng quát theo n, hãy thử n = 1, 2, 3. Quy luật thường hiện ra, và đôi khi chính cách làm trường hợp nhỏ là cách làm tổng quát.',
  },
  {
    id: 'tip-24',
    category: 'tu-duy',
    tracks: ['chuyen'],
    title: '“Tồn tại” thì nghĩ tới Dirichlet',
    body: 'Đề yêu cầu chứng minh tồn tại một đối tượng có tính chất nào đó — hãy nghĩ ngay tới nguyên lí chuồng bồ câu. Việc khó là thiết kế “chuồng”, không phải áp dụng.',
  },
  {
    id: 'tip-25',
    category: 'tu-duy',
    tracks: ['chuyen'],
    title: '“Không thể” thì tìm bất biến',
    body: 'Đề yêu cầu chứng minh không thể đạt được trạng thái nào đó — hãy tìm một đại lượng không đổi qua mỗi phép biến đổi, thường là tính chẵn lẻ hoặc tổng theo modulo.',
  },
  {
    id: 'tip-26',
    category: 'tu-duy',
    tracks: ['thpt', 'chuyen'],
    title: 'Dự đoán rồi mới chứng minh',
    body: 'Với bài điểm cố định, hãy cho điểm chạy về hai vị trí đặc biệt và tìm giao. Kết quả dự đoán được sẽ chỉ đường cho phần chứng minh.',
  },
  {
    id: 'tip-27',
    category: 'tu-duy',
    tracks: ['thpt', 'chuyen'],
    title: 'Ý trước là chìa khoá cho ý sau',
    body: 'Trong bài hình nhiều ý, ý (a) gần như luôn là công cụ để làm ý (b). Nếu đang bí ở ý sau, hãy đọc lại kết quả ý trước — người ra đề đã đặt sẵn ở đó.',
  },
  {
    id: 'tip-28',
    category: 'tu-duy',
    tracks: ['thpt', 'chuyen', 'thpt-qg'],
    title: 'Dò điểm rơi trước khi chọn kỹ thuật',
    body: 'Với bất đẳng thức, hãy đoán dấu bằng xảy ra ở đâu trước. Điểm rơi đối xứng thì dùng AM–GM thẳng; điểm rơi lệch thì phải thêm bớt hệ số.',
  },
  {
    id: 'tip-29',
    category: 'tu-duy',
    tracks: ['thpt-qg'],
    title: 'Đọc đồ thị thay vì giải phương trình',
    body: 'Bài toán số nghiệm của f(x) = m thực chất là đếm giao điểm của đồ thị với một đường nằm ngang. Vẽ bảng biến thiên rồi đếm — nhanh và ít sai.',
  },
  {
    id: 'tip-30',
    category: 'tu-duy',
    tracks: ['thpt-qg'],
    title: 'Sơ đồ cây cho mọi bài xác suất nhiều giai đoạn',
    body: 'Vẽ cây, nhân dọc theo nhánh, cộng ngang các nhánh thoả mãn. Đây là cách ít sai nhất cho xác suất toàn phần và Bayes.',
  },
  /* ============ LUỒNG 4 · TOÁN VÀO LỚP 6 ============ */
  {
    id: 'tip-l6-01',
    category: 'tu-duy',
    tracks: ['lop6'],
    title: 'Đọc đề bằng bút chì, không đọc bằng mắt',
    body: 'Gạch chân mọi số liệu, khoanh tròn câu hỏi cuối cùng, đánh dấu các từ khoá "còn lại", "nhiều hơn", "gấp". Phần lớn câu sai của đề vào 6 là sai vì đọc, không phải vì tính.',
    example: 'Đề "bán 1/3 số gạo còn lại" — khoanh tròn hai chữ "còn lại" là đủ để không lấy nhầm 1/3 của tổng.',
  },
  {
    id: 'tip-l6-02',
    category: 'tu-duy',
    tracks: ['lop6'],
    title: 'Vẽ sơ đồ đoạn thẳng trước khi tính',
    body: 'Mọi bài tổng – tỉ, hiệu – tỉ, tổng – hiệu và mọi bài chuyển động đều trở nên hiển nhiên khi có sơ đồ. Mất 15 giây vẽ, tiết kiệm vài phút loay hoay.',
    example: 'Tổng 96, số bé bằng 1/3 số lớn: vẽ 1 phần và 3 phần, thấy ngay tổng là 4 phần.',
  },
  {
    id: 'tip-l6-03',
    category: 'ghi-nho',
    tracks: ['lop6'],
    title: 'Mũi tên hướng vào nhau thì cộng, cùng hướng thì trừ',
    body: 'Đừng học thuộc hai công thức chuyển động. Vẽ hai mũi tên rồi tự hỏi: khoảng cách giữa hai xe đang giảm nhanh bằng cách nào. Cách nhớ này không bao giờ lẫn.',
  },
  {
    id: 'tip-l6-04',
    category: 'ghi-nho',
    tracks: ['lop6'],
    title: 'Dòng nước: hiệu cho dòng, tổng cho ca nô',
    body: 'Lấy hiệu hai vận tốc rồi chia đôi thì được vận tốc dòng nước; lấy tổng rồi chia đôi thì được vận tốc thực của ca nô. Đây là hai kết quả bị lẫn nhiều nhất.',
  },
  {
    id: 'tip-l6-05',
    category: 'tinh-nhanh',
    tracks: ['lop6'],
    title: 'Tìm cặp số cộng lại tròn trăm',
    body: 'Trong bài "tính nhanh", đề luôn cài sẵn một cặp số cộng lại thành 10, 100 hoặc 1000. Tìm cặp đó trước khi đặt bút tính bất kỳ phép nào.',
    example: '12,5 × 37 + 12,5 × 63 = 12,5 × 100 = 1250.',
  },
  {
    id: 'tip-l6-06',
    category: 'tinh-nhanh',
    tracks: ['lop6'],
    title: 'Giảm p% thì nhân thẳng với (100 − p)%',
    body: 'Thay vì tính phần giảm rồi trừ, hãy nhân thẳng giá gốc với phần còn lại. Một phép tính thay vì hai, và không còn nguy cơ trả lời nhầm phần đã giảm.',
    example: 'Giảm 20% của 350 000: lấy 350 000 × 80 : 100 = 280 000 đồng.',
  },
  {
    id: 'tip-l6-07',
    category: 'tu-duy',
    tracks: ['lop6'],
    title: 'Kẻ bảng cho mọi bài suy luận',
    body: 'Bài toán ghép người với thuộc tính luôn giải được bằng bảng đúng/sai. Kẻ bảng, bắt đầu từ dữ kiện chắc chắn nhất (không nhất thiết là dữ kiện đầu tiên), mỗi ✓ thì loại cả hàng lẫn cột.',
  },
  {
    id: 'tip-l6-08',
    category: 'tu-duy',
    tracks: ['lop6'],
    title: 'Cân đĩa thì chia ba, không chia đôi',
    body: 'Mỗi lần cân cho ba kết quả: trái nhẹ, phải nhẹ, hoặc bằng nhau. Vì thế chia ba nhóm mới là tối ưu. Ghi nhớ mốc: 1 lần cân cho 3, 2 lần cho 9, 3 lần cho 27.',
  },
  {
    id: 'tip-l6-09',
    category: 'ghi-nho',
    tracks: ['lop6'],
    title: 'Dãy cách đều: một cộng, một trừ, một chia',
    body: 'Ba công thức của dãy cách đều đều có một con số 1 hoặc 2 dễ quên. Số số hạng thì CỘNG 1, số hạng thứ n thì TRỪ 1, tổng thì CHIA 2. Đọc câu này ba lần là nhớ.',
  },
  {
    id: 'tip-l6-10',
    category: 'trinh-bay',
    tracks: ['lop6'],
    title: 'Mỗi phép tính một câu lời giải',
    body: 'Ở phần tự luận tiểu học, barem chấm cả câu lời giải chứ không chỉ chấm phép tính. Viết "Số gạo bán ngày đầu là:" trước mỗi phép tính là cách chắc chắn nhất để không mất 0,25 điểm trình bày.',
  },
  {
    id: 'tip-l6-11',
    category: 'trinh-bay',
    tracks: ['lop6'],
    title: 'Đáp số phải có đơn vị',
    body: 'Ở phần trả lời ngắn, đáp số thiếu đơn vị thường bị tính là sai vì không có lời giải để bù. Viết đơn vị ngay khi viết số, đừng để lát nữa quay lại thêm.',
  },
  {
    id: 'tip-l6-12',
    category: 'phong-thi',
    tracks: ['lop6'],
    title: 'Quy tắc 2 phút và dấu khoanh tròn',
    body: 'Đề 45 phút với 15 câu nghĩa là trung bình dưới 3 phút một câu. Câu nào quá 2 phút mà chưa thấy hướng thì khoanh tròn số thứ tự và bỏ qua, quay lại ở 5 phút cuối. Ngồi lì một câu là cách mất điểm nhanh nhất.',
  },
  {
    id: 'tip-l6-13',
    category: 'phong-thi',
    tracks: ['lop6'],
    title: 'Soát bài bằng cách đọc lại câu hỏi, không đọc lại bài giải',
    body: 'Đọc lại bài giải của chính mình thì mắt sẽ lướt qua đúng chỗ sai. Thay vào đó, hãy đọc lại câu hỏi rồi nhìn đáp số: mình đã trả lời đúng thứ đề hỏi chưa, đúng đơn vị chưa, số có hợp lý không.',
  },
  {
    id: 'tip-l6-14',
    category: 'tinh-nhanh',
    tracks: ['lop6'],
    title: 'Ước lượng để loại phương án',
    body: 'Ở phần trắc nghiệm, nhiều câu loại được ba phương án chỉ bằng ước lượng thô. Giảm 20% thì kết quả phải còn khoảng bốn phần năm; trung bình cộng phải nằm giữa số nhỏ nhất và số lớn nhất.',
  },
];

export const tipsFor = (track: TrackId) => TIPS.filter((t) => t.tracks.includes(track));

/* ============================================================
   THÓI QUEN LUYỆN — hệ thống nhịp học
   ============================================================ */

export interface Habit {
  id: string;
  name: string;
  cadence: 'hằng ngày' | 'hằng tuần' | 'hằng tháng';
  minutes: number;
  why: string;
  how: string[];
  tracks: TrackId[];
}

export const HABITS: Habit[] = [
  {
    id: 'h-48h',
    name: 'Ôn trong 48 giờ',
    cadence: 'hằng ngày',
    minutes: 20,
    why: 'Ôn lại trong vòng 48 giờ sau buổi học tốn ít thời gian hơn nhiều so với ôn lại sau một tuần, vì kiến thức chưa kịp phai.',
    how: [
      'Mở vở ghi buổi học gần nhất, đọc lại trong 5 phút.',
      'Gấp vở, tự viết lại ý chính ra giấy nháp.',
      'Làm 2 bài tập cùng dạng để kiểm chứng.',
    ],
    tracks: ['thpt', 'chuyen', 'thpt-qg'],
  },
  {
    id: 'h-phieu-ngay',
    name: 'Một phiếu luyện mỗi ngày',
    cadence: 'hằng ngày',
    minutes: 30,
    why: 'Nhịp đều đặn tạo phản xạ. Một phiếu mỗi ngày trong 100 ngày hơn hẳn 10 phiếu dồn vào cuối tuần.',
    how: [
      'Chọn nhiệm vụ kế tiếp trong lộ trình, không tự chọn bài mình thích.',
      'Làm liền mạch, bấm giờ, không tra cứu giữa chừng.',
      'Đọc nhận xét và giải pháp ngay sau khi nộp.',
    ],
    tracks: ['thpt', 'chuyen', 'thpt-qg'],
  },
  {
    id: 'h-so-loi',
    name: 'Sổ tay lỗi sai',
    cadence: 'hằng ngày',
    minutes: 10,
    why: 'Cùng một lỗi lặp lại nhiều lần là nguyên nhân mất điểm lớn nhất. Ghi lại là bước đầu tiên để dừng vòng lặp đó.',
    how: [
      'Mỗi lỗi ghi đúng ba dòng: sai ở đâu — vì sao — làm sao để không lặp lại.',
      'Sau 3 ngày, làm lại đúng dạng đã sai.',
      'Trước mỗi kỳ thi thử, đọc lại toàn bộ sổ trong 15 phút.',
    ],
    tracks: ['thpt', 'chuyen', 'thpt-qg'],
  },
  {
    id: 'h-cong-thuc',
    name: 'Năm phút công thức',
    cadence: 'hằng ngày',
    minutes: 5,
    why: 'Công thức cần được gợi lại thường xuyên, không phải học một lần rồi thôi.',
    how: [
      'Mở sổ công thức tự viết, đọc lướt một chương.',
      'Gấp sổ, viết lại 3 công thức bất kỳ từ trí nhớ.',
      'Kiểm tra và đánh dấu công thức nào còn quên.',
    ],
    tracks: ['thpt', 'chuyen', 'thpt-qg'],
  },
  {
    id: 'h-de-tuan',
    name: 'Đề tính giờ cuối tuần',
    cadence: 'hằng tuần',
    minutes: 90,
    why: 'Năng lực và điểm số phòng thi là hai chuyện khác nhau. Chỉ có luyện trong điều kiện thi mới rút ngắn khoảng cách đó.',
    how: [
      'Làm đúng thời gian quy định, không dừng giữa chừng, không dùng tài liệu.',
      'Chấm theo barem và ghi lại điểm từng bài.',
      'Phân tích: mất điểm ở đâu, mất thời gian ở đâu.',
    ],
    tracks: ['thpt', 'chuyen', 'thpt-qg'],
  },
  {
    id: 'h-review-tuan',
    name: 'Tổng kết tuần 20 phút',
    cadence: 'hằng tuần',
    minutes: 20,
    why: 'Không đo thì không cải thiện được. Mỗi tuần cần biết mình đang ở đâu so với lộ trình.',
    how: [
      'Xem lại KPI trung bình tuần và số nhiệm vụ đã đạt chuẩn.',
      'Xác định một mạch kiến thức yếu nhất để ưu tiên tuần sau.',
      'Điều chỉnh lịch nếu đang chậm so với lộ trình.',
    ],
    tracks: ['thpt', 'chuyen', 'thpt-qg'],
  },
  {
    id: 'h-truoc-kiem-tra',
    name: 'Quy trình trước bài kiểm tra trên lớp',
    cadence: 'hằng tháng',
    minutes: 60,
    why: 'Điểm tổng kết là tổng của nhiều bài kiểm tra nhỏ. Chuẩn bị có quy trình sẽ loại bỏ yếu tố may rủi.',
    how: [
      'Làm lại toàn bộ bài tập giáo viên đã chữa trên lớp — đề kiểm tra thường xoay quanh chúng.',
      'Rà lại sổ lỗi sai của chương đang kiểm tra.',
      'Làm một phiếu Kiểm tra cùng mức độ để đo trước.',
    ],
    tracks: ['thpt-qg'],
  },
  {
    id: 'h-day-lai',
    name: 'Giảng lại cho người khác',
    cadence: 'hằng tuần',
    minutes: 15,
    why: 'Giảng được cho người khác là bằng chứng đáng tin cậy nhất rằng bạn thực sự hiểu.',
    how: [
      'Chọn một dạng bài vừa học, giảng cho bạn cùng lớp hoặc giảng cho chính mình trước gương.',
      'Chỗ nào ấp úng chính là chỗ chưa hiểu — quay lại học lại đúng chỗ đó.',
    ],
    tracks: ['thpt', 'chuyen', 'thpt-qg'],
  },
  {
    id: 'h-l6-nham',
    name: 'Mười phút tính nhẩm mỗi ngày',
    cadence: 'hằng ngày',
    minutes: 10,
    why: 'Đề vào 6 rất chặt thời gian. Tính nhẩm nhanh không phải năng khiếu mà là kết quả của việc lặp lại ngắn, đều, mỗi ngày.',
    how: [
      'Mười phép tính phân số và mười phép tính phần trăm, bấm giờ.',
      'Ghi lại thời gian mỗi ngày để thấy mình nhanh dần.',
      'Chỉ dùng nháp khi thật cần, còn lại nhẩm trong đầu.',
    ],
    tracks: ['lop6'],
  },
  {
    id: 'h-l6-so-loi',
    name: 'Sổ tay lỗi viết bằng lời của con',
    cadence: 'hằng tuần',
    minutes: 20,
    why: 'Trẻ tiểu học nhớ lỗi của mình lâu hơn nhiều khi tự viết ra bằng ngôn ngữ của chính mình, thay vì được người lớn giải thích.',
    how: [
      'Mỗi câu sai ghi ba dòng: đề hỏi gì, mình đã làm gì, đúng ra phải làm gì.',
      'Không chép lời giải mẫu — phải viết bằng lời của con.',
      'Cuối tuần đọc lại sổ, chọn hai lỗi hay lặp nhất để luyện riêng.',
    ],
    tracks: ['lop6'],
  },
  {
    id: 'h-l6-de-tinh-gio',
    name: 'Một đề tính giờ mỗi tuần',
    cadence: 'hằng tuần',
    minutes: 45,
    why: 'Kỹ năng làm bài dưới áp lực thời gian là một kỹ năng riêng, không tự có từ việc làm đúng nhiều bài lẻ.',
    how: [
      'Đúng 45 phút, đồng hồ đặt trên bàn, không gián đoạn.',
      'Chấm theo barem thật, không nới tay.',
      'Dành 30 phút chữa kỹ — chữa một đề tốt hơn làm ba đề qua loa.',
    ],
    tracks: ['lop6'],
  },
];

/* ============================================================
   PHƯƠNG PHÁP HỌC — nền tảng cho toàn bộ hệ thống
   ============================================================ */

export interface Method {
  id: string;
  name: string;
  principle: string;
  apply: string[];
}

export const METHODS: Method[] = [
  {
    id: 'm-deliberate',
    name: 'Luyện tập có chủ đích',
    principle:
      'Tiến bộ đến từ việc luyện đúng vùng vừa quá sức mình một chút, kèm phản hồi ngay lập tức — không phải từ việc lặp lại điều đã làm tốt.',
    apply: [
      'Luôn luyện ở mức độ mà bạn đúng khoảng 70–85%, không phải mức bạn đúng 100%.',
      'Đọc nhận xét ngay sau khi nộp, đừng để đến hôm sau.',
      'Khi KPI đạt 90% hai lần liên tiếp, hệ thống nâng mức — đó chính là cơ chế giữ bạn ở vùng luyện hiệu quả.',
    ],
  },
  {
    id: 'm-retrieval',
    name: 'Gợi nhớ chủ động',
    principle:
      'Tự nhớ lại khó hơn đọc lại, nhưng chính cái khó đó tạo ra trí nhớ bền. Đọc lại nhiều lần cho cảm giác quen thuộc chứ không tạo ra khả năng làm bài.',
    apply: [
      'Gấp sách lại và tự viết ra công thức trước khi kiểm tra.',
      'Làm bài trước, xem lời giải sau — không bao giờ ngược lại.',
      'Tự đặt câu hỏi cho chính mình sau mỗi chuyên đề.',
    ],
  },
  {
    id: 'm-spaced',
    name: 'Ôn ngắt quãng',
    principle:
      'Cùng một tổng thời gian, chia nhỏ và giãn cách sẽ ghi nhớ tốt hơn nhiều so với học dồn một lần.',
    apply: [
      'Lịch ôn 1 – 3 – 7 – 21 ngày cho mỗi chuyên đề mới.',
      'Mỗi tuần dành một buổi ôn lại chuyên đề của các tuần trước, không chỉ học cái mới.',
    ],
  },
  {
    id: 'm-interleaving',
    name: 'Trộn dạng bài',
    principle:
      'Luyện liên tiếp 20 bài cùng dạng tạo cảm giác giỏi, nhưng khi vào đề trộn nhiều dạng thì lại lúng túng vì thiếu kỹ năng nhận dạng.',
    apply: [
      'Sau khi thành thạo một dạng, hãy luyện phiếu trộn nhiều dạng.',
      'Các phiếu Tổng duyệt trong hệ thống được thiết kế theo nguyên tắc này.',
    ],
  },
  {
    id: 'm-error-log',
    name: 'Quản trị lỗi sai',
    principle:
      'Mỗi lỗi sai là một chỉ dẫn cụ thể về việc cần làm tiếp theo. Bỏ qua lỗi sai là bỏ qua thông tin giá trị nhất mà bài luyện tạo ra.',
    apply: [
      'Phân loại lỗi: không biết hướng / sai tính toán / thiếu trường hợp / trình bày / hết giờ.',
      'Mỗi loại lỗi có cách sửa khác nhau — sai tính toán thì luyện tốc độ chậm lại, không biết hướng thì học lại lý thuyết.',
      'Lỗi lặp lại lần thứ ba là tín hiệu phải quay lại học lại chuyên đề gốc.',
    ],
  },
  {
    id: 'm-feynman',
    name: 'Kỹ thuật Feynman',
    principle:
      'Nếu không giảng được cho một người chưa biết gì bằng ngôn ngữ đơn giản, nghĩa là bạn chưa thực sự hiểu.',
    apply: [
      'Viết lại lời giải bằng ngôn ngữ của mình, không chép nguyên.',
      'Chỗ nào phải dùng thuật ngữ mà không giải thích được — đó là lỗ hổng.',
    ],
  },
  {
    id: 'm-kpi',
    name: 'Quản trị bằng KPI',
    principle:
      'Mục tiêu mơ hồ tạo nỗ lực mơ hồ. KPI 90% biến “học chăm hơn” thành một tiêu chí kiểm chứng được sau mỗi phiếu.',
    apply: [
      'Mỗi nhiệm vụ có ngưỡng KPI rõ ràng; chưa đạt thì làm lại với đề mới.',
      'Đạt 90% hai lần liên tiếp thì lên Level; đạt 15 nhiệm vụ chuẩn thì xét lên Giai đoạn.',
      'Nhìn KPI trung bình 5 lượt gần nhất, đừng bị dao động bởi một lượt đơn lẻ.',
    ],
  },
  {
    id: 'm-consistency',
    name: 'Nhịp đều thắng cường độ',
    principle:
      'Ba năm THPT là đường dài. Học 45 phút mỗi ngày trong 300 ngày hiệu quả hơn nhiều so với những đợt học 6 tiếng rồi bỏ bẵng.',
    apply: [
      'Đặt một khung giờ cố định trong ngày cho môn Toán.',
      'Ngày bận thì giảm khối lượng, nhưng không bỏ hẳn — giữ chuỗi ngày liên tục.',
    ],
  },
  {
    id: 'm-l6-tuoi-nho',
    name: 'Giữ hứng thú là ưu tiên số một ở tuổi tiểu học',
    principle:
      'Với học sinh lớp 4 – 5, mất hứng thú với môn Toán là tổn thất lớn hơn nhiều so với việc chậm mất vài tuần. Một đứa trẻ còn thích Toán sẽ đuổi kịp; một đứa trẻ sợ Toán thì không.',
    apply: [
      'Mỗi buổi học không quá 45 – 60 phút, có nghỉ giữa giờ.',
      'Khen quá trình ("con đã vẽ sơ đồ trước khi tính") thay vì khen kết quả ("con giỏi quá").',
      'Không so sánh với bạn khác, và không lấy tỉ lệ chọi ra để tạo áp lực.',
      'Nếu con làm sai, hỏi "con nghĩ thế nào" trước khi giải thích.',
    ],
  },
  {
    id: 'm-l6-du-phong',
    name: 'Luôn có phương án dự phòng',
    principle:
      'Tỉ lệ chọi vào các trường THCS chất lượng cao rất cao, và kết quả phụ thuộc nhiều yếu tố ngoài năng lực. Chuẩn bị sẵn phương án thứ hai là cách bảo vệ đứa trẻ, không phải cách hạ thấp mục tiêu.',
    apply: [
      'Chọn trước một trường nguyện vọng hai mà gia đình thực sự hài lòng.',
      'Nói rõ với con từ đầu rằng không đỗ không phải là thất bại.',
      'Nhấn mạnh phần kiến thức học được sẽ dùng tiếp ở lớp 6 dù học trường nào.',
    ],
  },
];
