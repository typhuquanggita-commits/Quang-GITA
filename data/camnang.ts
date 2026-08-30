/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {CamNang, MucCamNang} from '../types';
import {EXAM_PARTS, EXAM_SPEC} from './chuyenanh';

/* ==========================================================================
   CẨM NANG ÔN LUYỆN ĐIỂM 10

   NÓI THẲNG NGAY TỪ ĐẦU, VÌ ĐÂY LÀ CHỖ DỄ HỨA LIỀU NHẤT
     Không cẩm nang nào làm cho một người được điểm 10. Điểm 10 nghĩa là
     KHÔNG SAI CÂU NÀO — và không sai câu nào thì phụ thuộc vào nền đã dựng
     trong nhiều tháng, vào đề năm đó, và vào cả việc hôm ấy có ngủ đủ không.

     Cái cẩm nang này làm được, và làm được thật, là gỡ những chỗ mất điểm
     TRÁNH ĐƯỢC. Đó là loại mất điểm mà học viên đã đủ trình để làm đúng
     nhưng vẫn sai vì một thói quen làm bài, một bước bỏ sót, hoặc một hiểu
     nhầm về barem. Chỗ mất điểm ấy chiếm phần lớn khoảng cách giữa 9 và 10,
     và nó gỡ được trong vài tuần chứ không cần vài tháng.

     Nói cách khác: cẩm nang này không nâng trần của em. Nó thôi kéo em
     xuống dưới trần.

   MỖI MỤC PHẢI TRẢ LỜI ĐƯỢC BỐN CÂU
     1. Người được 9 làm gì, người được 10 làm gì — khác nhau ở ĐÚNG chỗ nào
     2. Mất điểm vì cái gì, nói cụ thể
     3. Chặn bằng cách nào, viết thành việc làm được
     4. GIÁ của lỗi này bằng bao nhiêu điểm, theo barem thật của phần đó
     Mục nào không trả lời được câu thứ tư thì bị loại, vì không có giá thì
     người học không biết nên dồn sức vào đâu trước.

   CẢNH BÁO PHẢI ĐỌC
     Cấu trúc đề và công thức điểm thay đổi theo từng năm và từng trường.
     Số câu và trọng số dưới đây lấy từ EXAM_SPEC của hệ thống; trước mỗi
     mùa thi phải đối chiếu lại với đề án tuyển sinh chính thức rồi sửa lại
     ở đó — cẩm nang tự cập nhật theo, không phải sửa ở đây.
   ========================================================================== */

export const CAMNANG_CREED = {
  name: 'CẨM NANG ÔN LUYỆN ĐIỂM 10',
  claim:
    'Gỡ những chỗ mất điểm TRÁNH ĐƯỢC — loại mất điểm mà học viên đã đủ trình để làm đúng nhưng vẫn sai vì một thói quen làm bài hoặc một hiểu nhầm về barem.',
  khongHuaLieu:
    'Không cẩm nang nào làm cho một người được điểm 10. Điểm 10 là không sai câu nào, và điều đó phụ thuộc vào nền đã dựng nhiều tháng, vào đề năm đó, và vào cả việc hôm ấy có ngủ đủ không. Cẩm nang này không nâng trần của em; nó thôi kéo em xuống dưới trần.',
  moiMucCoGia:
    'Mỗi mục ghi rõ lỗi đó đáng bao nhiêu điểm theo barem thật. Không có giá thì người học không biết dồn sức vào đâu trước.',
  doiChieuLai:
    'Cấu trúc đề thay đổi theo năm và theo trường. Số câu và trọng số lấy từ EXAM_SPEC; sửa ở đó thì cẩm nang tự cập nhật.',
};

/* ---------------- CHỖ MẤT ĐIỂM TRÁNH ĐƯỢC, THEO TỪNG PHẦN --------------- */

const MUC: Record<string, Omit<MucCamNang, 'no' | 'giaCuaLoi'>[]> = {
  NGHE: [
    {
      ten: 'Đọc câu hỏi trước khi băng chạy',
      chinLaChoNay: 'Người được 9 nghe rồi mới tìm câu trả lời. Người được 10 đã biết mình cần nghe cái gì trước khi băng bắt đầu.',
      matDiemVi: 'Nghe lần đầu để hiểu chung, lần hai mới tìm chi tiết — nhưng nhiều đề chỉ phát hai lần và tốc độ không đợi.',
      cachChan: [
        'Dùng trọn thời gian đọc đề để gạch chân từ khoá của từng câu hỏi.',
        'Với câu điền, đoán trước loại thông tin cần điền: số, tên riêng, hay danh từ.',
        'Với câu trắc nghiệm, khoanh chỗ khác nhau giữa bốn lựa chọn — đó là chỗ băng sẽ nói.',
      ],
      tuKiem: 'Trước khi băng chạy, nói được mình đang chờ nghe cái gì ở mỗi câu. Không nói được là chưa đọc kỹ.',
    },
    {
      ten: 'Nghe hết câu trước khi ghi',
      chinLaChoNay: 'Người được 9 ghi ngay khi nghe thấy con số. Người được 10 đợi hết câu, vì người nói hay sửa lại ngay sau đó.',
      matDiemVi: 'Băng nói "fourteen — sorry, forty" và thí sinh đã ghi xong 14 rồi chuyển sang câu khác.',
      cachChan: [
        'Ghi bằng bút chì và chỉ chốt khi câu đã kết thúc.',
        'Nghe kỹ các từ báo sửa: sorry, actually, I mean, in fact.',
        'Với dãy số, ghi cả hai rồi chọn sau, đừng xoá ngay.',
      ],
      tuKiem: 'Đếm số lần trong một bài luyện mình phải sửa lại đáp án đã ghi. Không lần nào là đáng ngờ, không phải đáng mừng.',
    },
    {
      ten: 'Phân biệt câu hỏi ý chính với câu hỏi chi tiết',
      chinLaChoNay: 'Người được 9 nghe kỹ đều. Người được 10 biết câu nào cần bắt chi tiết và câu nào phải bỏ qua chi tiết để nghe ý.',
      matDiemVi: 'Bám vào một con số nghe rõ trong khi câu hỏi hỏi mục đích chính của người nói.',
      cachChan: [
        'Câu có "mainly", "chủ yếu", "mục đích chính" thì bỏ qua mọi con số.',
        'Câu có số, tên riêng, đơn vị đo thì ngược lại: chỉ bắt đúng chỗ đó.',
        'Đánh dấu hai loại câu bằng hai ký hiệu khác nhau ngay khi đọc đề.',
      ],
      tuKiem: 'Với mỗi câu sai, ghi lại nó thuộc loại nào. Sai lệch về một loại là dấu hiệu rõ.',
    },
  ],
  'NGỮ ÂM': [
    {
      ten: 'Học luật hậu tố thay vì học từng từ',
      chinLaChoNay: 'Người được 9 nhớ trọng âm của những từ đã gặp. Người được 10 suy ra được trọng âm của từ chưa gặp bao giờ.',
      matDiemVi: 'Đề cố tình ra từ ít gặp, và trí nhớ từng từ thì hết ở đúng chỗ đó.',
      cachChan: [
        'Thuộc ba nhóm hậu tố: nhóm kéo trọng âm, nhóm trung tính, nhóm tự mang trọng âm.',
        'Với mỗi từ mới trong sổ, ghi luôn hậu tố và nhóm của nó.',
        'Gặp từ lạ trong đề thì tìm hậu tố trước, đừng tìm trí nhớ.',
      ],
      tuKiem: 'Cho một từ chưa từng học, nói đúng trọng âm và nói được vì sao. Không nói được vì sao là đang đoán.',
    },
    {
      ten: 'Đọc âm cuối theo ÂM, không theo CHỮ',
      chinLaChoNay: 'Người được 9 nhớ mẹo "-ed sau t và d thì đọc /ɪd/". Người được 10 hỏi âm cuối của gốc là hữu thanh hay vô thanh.',
      matDiemVi: 'Mẹo theo mặt chữ gãy ở những từ như "laughed" — chữ cuối là h nhưng âm cuối là /f/.',
      cachChan: [
        'Đặt tay lên cổ họng: rung là hữu thanh, không rung là vô thanh.',
        'Với mỗi động từ mới, ghi âm cuối của gốc chứ không ghi chữ cuối.',
        'Luyện riêng nhóm từ mà chữ cuối và âm cuối khác nhau.',
      ],
      tuKiem: 'Nói được âm cuối của gốc trước khi nói cách đọc đuôi. Nói ngược thứ tự là đang dùng mẹo mặt chữ.',
    },
    {
      ten: 'Không bỏ phần này vì nó chỉ có năm câu',
      chinLaChoNay: 'Người được 9 dành ít giờ cho phần ngắn nhất. Người được 10 biết năm câu này là năm câu ăn chắc nhất cả đề.',
      matDiemVi: 'Phần này thuần luật nên đúng được cả năm, nhưng học ít nên mất một hai câu — và một câu ở đây đắt ngang một câu ở phần 25 câu.',
      cachChan: [
        'Luyện 10 phút mỗi ngày trong ba tuần là đủ để đúng cả năm câu.',
        'Làm phần này đầu tiên trong đề, khi đầu còn tỉnh.',
        'Không dành quá 5 phút cho cả phần — phân vân ở đây thường dẫn tới chọn sai.',
      ],
      tuKiem: 'Ba bài luyện liên tiếp đúng cả năm câu thì mới coi là chắc.',
    },
  ],
  'TỪ VỰNG – NGỮ PHÁP': [
    {
      ten: 'Học CỤM, không học từ đơn',
      chinLaChoNay: 'Người được 9 biết nghĩa từng từ. Người được 10 biết từ nào đi với từ nào.',
      matDiemVi: 'Đề hỏi "dependent ___ " và cả bốn giới từ đều quen mặt. Biết nghĩa "dependent" không giúp gì.',
      cachChan: [
        'Mọi từ vào sổ đều phải kèm ít nhất một cụm và một câu thật.',
        'Với động từ, ghi luôn giới từ đi kèm; với danh từ, ghi động từ hay đi cùng.',
        'Kiểm cụm bằng chứng cứ dùng thật, không kiểm bằng cảm giác xuôi tai.',
      ],
      tuKiem: 'Với mỗi từ trong sổ, nói được một cụm chứa nó. Không nói được là chưa học xong từ đó.',
    },
    {
      ten: 'Đọc hết câu trước khi nhìn bốn lựa chọn',
      chinLaChoNay: 'Người được 9 nhìn chỗ trống rồi nhìn đáp án. Người được 10 đọc hết câu, vì manh mối quyết định thường nằm ở vế sau.',
      matDiemVi: 'Chọn một từ đúng ngữ pháp nhưng ngược nghĩa với vế sau — bẫy dựng sẵn và rất hay ra.',
      cachChan: [
        'Đọc trọn câu, kể cả phần sau dấu phẩy, trước khi nhìn xuống đáp án.',
        'Gạch chân từ nối trong câu: but, however, because, so — chúng quyết định hướng nghĩa.',
        'Thử đáp án đã chọn bằng cách đọc lại cả câu, không đọc mỗi chỗ trống.',
      ],
      tuKiem: 'Với mỗi câu, chỉ ra được từ nào trong câu quyết định đáp án. Không chỉ được là đang đoán.',
    },
    {
      ten: 'Nhận ra dạng câu hỏi trước khi làm',
      chinLaChoNay: 'Người được 9 làm từng câu như một câu mới. Người được 10 đọc vị được dạng trong ba giây rồi áp quy trình có sẵn.',
      matDiemVi: 'Mỗi câu mất gấp đôi thời gian, và hết giờ ở phần Đọc phía sau.',
      cachChan: [
        'Bốn lựa chọn cùng gốc khác đuôi thì đề hỏi dạng từ — xét chức năng trong câu.',
        'Bốn lựa chọn cùng loại từ thì đề hỏi nghĩa hoặc cụm.',
        'Có mốc thời gian thì đề hỏi thì; có dấu phẩy trước chỗ trống thì nhiều khả năng là mệnh đề quan hệ.',
      ],
      tuKiem: 'Đọc 10 câu và chỉ gọi tên dạng, không làm. Đúng 8 trên 10 là đã đọc vị được.',
    },
    {
      ten: 'Sửa lỗi theo nhóm, không theo từng câu',
      chinLaChoNay: 'Người được 9 xem lại từng câu sai. Người được 10 gom các câu sai thành nhóm và chữa cả nhóm một lần.',
      matDiemVi: 'Hai mươi câu sai có thể chỉ là ba nhóm lỗi; chữa lẻ từng câu thì tốn giờ gấp bảy lần mà vẫn sót nhóm.',
      cachChan: [
        'Sau mỗi đề, phân mọi câu sai vào nhóm trước khi xem lời giải.',
        'Nhóm nào chiếm nhiều nhất thì dành trọn một tuần cho nhóm đó.',
        'Ghi nhóm lặp lại vào sổ lỗi và đọc trước mỗi buổi luyện.',
      ],
      tuKiem: 'Số nhóm lỗi còn lặp lại giảm dần theo tháng. Không giảm là đang chữa lẻ.',
    },
  ],
  'ĐỌC': [
    {
      ten: 'Quét theo từ khoá, không đọc tuần tự',
      chinLaChoNay: 'Người được 9 đọc bài từ đầu tới cuối rồi mới làm. Người được 10 đọc câu hỏi trước rồi quét thẳng tới đoạn chứa câu trả lời.',
      matDiemVi: 'Bài đọc đề chuyên dài tới nhiều trang; đọc tuần tự là hết giờ trước khi tới câu cuối.',
      cachChan: [
        'Đọc câu đầu và câu cuối mỗi đoạn trước để dựng bản đồ ý trong hai phút.',
        'Đọc câu hỏi, gạch chân từ khoá, rồi mới quét vào đúng đoạn.',
        'Câu hỏi chỉ đích danh dòng thì nhảy thẳng tới dòng đó, đừng đọc lại từ đầu.',
      ],
      tuKiem: 'Đo số phút cho phần Đọc trong mỗi bài luyện. Vượt định mức là chưa quét được.',
    },
    {
      ten: 'Đáp án đúng gần như không bao giờ dùng nguyên văn',
      chinLaChoNay: 'Người được 9 tìm câu trong bài trùng chữ với đáp án. Người được 10 tìm ý được diễn đạt lại.',
      matDiemVi: 'Đề dựng bẫy bằng cách đặt nguyên văn từ trong bài vào một đáp án SAI.',
      cachChan: [
        'Thấy đáp án trùng nguyên văn thì nghi ngờ trước, đừng chọn ngay.',
        'Luyện diễn đạt lại: lấy một câu trong bài, viết ba phiên bản khác.',
        'Với mỗi đáp án đã chọn, chỉ ra câu trong bài mà nó diễn đạt lại.',
      ],
      tuKiem: 'Chỉ được câu làm chỗ tựa cho mọi đáp án đã chọn. Không chỉ được là đang đoán.',
    },
    {
      ten: 'Câu NOT và EXCEPT phải đọc ngược',
      chinLaChoNay: 'Người được 9 đọc lướt qua chữ NOT. Người được 10 khoanh tròn nó ngay và đổi cách làm.',
      matDiemVi: 'Ba đáp án đúng và một sai; chọn theo phản xạ thường thì trúng ngay một trong ba đáp án đúng — tức là sai.',
      cachChan: [
        'Khoanh tròn NOT, EXCEPT, LEAST ngay khi đọc câu hỏi.',
        'Đánh dấu Đ hoặc S cho từng lựa chọn thay vì tìm đáp án đúng.',
        'Đáp án là lựa chọn duy nhất được đánh S.',
      ],
      tuKiem: 'Đếm số câu dạng này làm sai. Sai từ hai câu trở lên là chưa thành phản xạ khoanh tròn.',
    },
    {
      ten: 'Câu suy luận chỉ được bắc một bước',
      chinLaChoNay: 'Người được 9 chọn đáp án nghe hợp lý nhất. Người được 10 chọn đáp án cần ít bước bắc cầu nhất từ chữ trong bài.',
      matDiemVi: 'Đáp án nhiễu thường đúng ngoài đời nhưng cần ba bước suy mới nối được với bài.',
      cachChan: [
        'Với mỗi đáp án, đếm số bước suy từ câu trong bài tới đáp án đó.',
        'Loại ngay đáp án chứa always, never, all, proves — từ tuyệt đối hiếm khi đúng.',
        'Không thêm kiến thức ngoài bài, dù kiến thức đó đúng.',
      ],
      tuKiem: 'Chỉ ra được câu trong bài dẫn tới đáp án. Phải chỉ được đúng một câu, không phải một đoạn.',
    },
  ],
  'VIẾT': [
    {
      ten: 'Làm phần biến đổi câu TRƯỚC đoạn luận',
      chinLaChoNay: 'Người được 9 viết đoạn luận trước cho chắc ý. Người được 10 làm phần cho điểm chắc trước, vì đoạn luận kéo dài bao lâu cũng được.',
      matDiemVi: 'Bỏ trắng ba câu biến đổi vì hết giờ — đó là ba câu ăn chắc nếu thuộc mẫu.',
      cachChan: [
        'Đặt giờ cứng cho phần biến đổi câu và chuyển sang đoạn luận đúng khi hết giờ.',
        'Thuộc mẫu cho các cấu trúc hay ra: SINCE, WISH, BUT FOR, BELIEVED, HAVE.',
        'Không quay lại sửa câu biến đổi sau khi đã sang đoạn luận.',
      ],
      tuKiem: 'Trong ba bài luyện gần nhất, không bài nào bỏ trắng câu biến đổi.',
    },
    {
      ten: 'Dùng đúng từ gợi ý, kể cả khi có cách khác hay hơn',
      chinLaChoNay: 'Người được 9 viết câu đúng nghĩa. Người được 10 kiểm lại đã dùng từ gợi ý chưa trước khi chuyển câu.',
      matDiemVi: 'Câu đúng hoàn toàn nhưng không chứa từ gợi ý thì được 0 điểm — barem không cho điểm một phần ở chỗ này.',
      cachChan: [
        'Gạch chân từ gợi ý trước khi viết, không phải sau.',
        'Viết xong, đọc lại và tìm đúng từ đó trong câu của mình.',
        'Kiểm số từ nếu đề có giới hạn — vượt một từ cũng không tính.',
      ],
      tuKiem: 'Ba bước kiểm: có từ gợi ý chưa, có đổi nghĩa không, có trong giới hạn từ không.',
    },
    {
      ten: 'Hai lý do phải TÁCH BẠCH',
      chinLaChoNay: 'Người được 9 viết đủ hai đoạn thân bài. Người được 10 kiểm hai lý do đó có thật sự khác nhau không.',
      matDiemVi: 'Một lý do nói hai lần thì bài trông đủ ý nhưng người chấm thấy ngay và trừ ở tiêu chí phát triển ý.',
      cachChan: [
        'Viết hai lý do ra dàn ý trước, đọc lại và hỏi: bỏ một cái đi thì có mất gì không.',
        'Mỗi lý do phải có một ví dụ riêng, không dùng chung ví dụ.',
        'Nếu hai ví dụ giống nhau thì hai lý do chưa tách bạch.',
      ],
      tuKiem: 'Đọc hai câu chủ đề của hai đoạn thân bài liền nhau. Nghe như một câu nói hai lần là chưa đạt.',
    },
    {
      ten: 'Chừa năm phút cuối để soát ba lượt',
      chinLaChoNay: 'Người được 9 viết tới hết giờ. Người được 10 dừng sớm và soát ba lượt, mỗi lượt một loại lỗi.',
      matDiemVi: 'Lỗi chia động từ và lỗi số nhiều nằm rải khắp bài; đọc một lượt tìm mọi thứ thì bỏ sót phần lớn.',
      cachChan: [
        'Lượt một tìm lỗi gãy nghĩa: thiếu chủ ngữ, câu cụt, câu dính.',
        'Lượt hai tìm đúng những nhóm lỗi trong sổ lỗi của chính mình.',
        'Lượt ba tìm chính tả và dấu câu — rẻ nhất nên để cuối.',
      ],
      tuKiem: 'Đếm số lỗi tự bắt được so với số lỗi người chấm tìm ra. Tỉ lệ này phải tăng theo tháng.',
    },
  ],
};

/* ---------------------- GIÁ CỦA LỖI, TÍNH TỪ BAREM ---------------------- */
/*
 * Giá tính từ trọng số thật của phần và số câu thật của phần đó, lấy từ
 * EXAM_SPEC. Không gõ tay con số nào: đề đổi cấu trúc thì sửa ở EXAM_SPEC,
 * và mọi con số ở đây tự đổi theo.
 */
function giaCuaMuc(tenPhan: string, soMuc: number): string[] {
  const p = EXAM_PARTS.find((x) => x.name === tenPhan);
  if (!p) throw new Error(`Cẩm nang trỏ vào phần không có thật: ${tenPhan}`);
  const diemPhan = p.weight;
  const diemMotCau = diemPhan / p.items;
  return Array.from({length: soMuc}, () => '').map(() => {
    // Một chỗ mất điểm tránh được thường ăn từ một tới ba câu của phần đó.
    const it = diemMotCau.toFixed(2);
    const nhieu = (diemMotCau * 3).toFixed(2);
    return `Mỗi câu của phần này đáng ${it} điểm trên thang ${EXAM_SPEC.chuyen.maxScore}. Lỗi loại này thường ăn một tới ba câu, tức khoảng ${it}–${nhieu} điểm.`;
  });
}

let cache: CamNang[] | null = null;

export function camNang(): CamNang[] {
  if (cache) return cache;
  cache = EXAM_PARTS.map((p) => {
    const ds = MUC[p.name];
    if (!ds) throw new Error(`Cẩm nang thiếu nội dung cho phần ${p.name}`);
    const gia = giaCuaMuc(p.name, ds.length);
    return {
      id: `cn-${p.no}`,
      phanTen: p.name,
      soCau: p.items,
      trongSo: p.weight,
      phut: p.minutes,
      dieuKienCan: `Đúng cả ${p.items} câu. Phần này chiếm ${p.weight} điểm trên thang ${EXAM_SPEC.chuyen.maxScore}, và mất một câu là mất ${(p.weight / p.items).toFixed(2)} điểm không lấy lại được ở phần khác.`,
      muc: ds.map((m, i) => ({...m, no: i + 1, giaCuaLoi: gia[i]})),
      chiaGio: [
        `${p.minutes} phút cho ${p.items} câu, tức trung bình ${(p.minutes / p.items).toFixed(1)} phút một câu.`,
        `Vòng một dùng ${Math.round(p.minutes * 0.7)} phút, làm hết một lượt và đánh dấu câu ngờ.`,
        `Vòng hai dùng ${Math.round(p.minutes * 0.2)} phút, chỉ quay lại câu đã đánh dấu.`,
        `Chừa ${Math.round(p.minutes * 0.1)} phút cuối để soát, không dùng để làm thêm câu mới.`,
      ],
      bayNgayCuoi: [
        `Làm hai đề đủ phần ${p.name} đúng giờ quy định, không làm nửa chừng.`,
        'Đọc lại sổ lỗi và chỉ luyện đúng nhóm lỗi còn lặp lại.',
        'Ngày cuối không học thêm gì mới — chỉ đọc lại cẩm nang này và ngủ đủ.',
      ],
    };
  });
  return cache;
}

export const camNangCuaPhan = (ten: string): CamNang | undefined =>
  camNang().find((c) => c.phanTen === ten);

export const CAMNANG_SO = {
  soPhan: camNang().length,
  soMuc: camNang().reduce((s, c) => s + c.muc.length, 0),
  soCachChan: camNang().reduce((s, c) => s + c.muc.reduce((t, m) => t + m.cachChan.length, 0), 0),
  soTuKiem: camNang().reduce((s, c) => s + c.muc.length, 0),
  tongCau: camNang().reduce((s, c) => s + c.soCau, 0),
  tongPhut: camNang().reduce((s, c) => s + c.phut, 0),
};
