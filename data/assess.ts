/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  AssessBattery,
  IntegrityRule,
  RewardTier,
  AiStep,
} from '../types';

/* ==========================================================================
   BỘ ĐÁNH GIÁ ĐỊNH KỲ
   Ba nhịp lồng nhau: tuần đo NỖ LỰC, 21 ngày đo KỸ NĂNG HẸP, 90 ngày đo
   NĂNG LỰC ĐỔI BẬC. Trên cùng là bài đo cả hành trình.
   ========================================================================== */

export const ASSESS_CREED = {
  name: 'ĐO ĐỂ HỌC THẬT',
  claim:
    'Ba nhịp đo lồng nhau, mỗi nhịp trả lời một câu hỏi khác nhau, và không nhịp nào đo được bằng cách tự khai.',
  why:
    'Hệ thống nào cũng bị chơi theo cách nó được đo. Nếu đo bằng số buổi điểm danh thì học viên sẽ điểm danh; nếu đo bằng số bài nộp thì sẽ có bài nộp cho có. Vì vậy mọi chỉ số ở đây đều gắn với một BẰNG CHỨNG khó làm giả hơn là làm thật.',
  threeQuestions: [
    'Tuần: tuần này bạn có thật sự bỏ công không? — đo NỖ LỰC.',
    'Hai mươi mốt ngày: kỹ năng hẹp của vòng đã tự động chưa? — đo TỰ ĐỘNG HOÁ.',
    'Chín mươi ngày: năng lực đã đổi bậc chưa? — đo NĂNG LỰC.',
  ],
  hardTruth:
    'Một người có thể qua bài tuần mà vẫn trượt bài 21 ngày, và qua bài 21 ngày mà vẫn trượt bài 90 ngày. Đó không phải lỗi hệ thống — đó chính là lý do phải có ba nhịp. Nỗ lực không tự thành kỹ năng, và kỹ năng hẹp không tự thành năng lực.',
  noSelfReport:
    'Không có ô nào để học viên tự chấm mình. Tự đánh giá là công cụ tốt để phản tỉnh, nhưng là dữ liệu tồi để ra quyết định — người yếu nhất thường tự chấm cao nhất.',
};

/* ------------------------------ BỐN BỘ ĐỀ ------------------------------- */

export const BATTERIES: AssessBattery[] = [
  {
    id: 'b-week',
    cadence: 'tuần',
    name: 'BÀI TUẦN — ĐO NỖ LỰC THẬT',
    when: 'Chủ Nhật, trong ngày đối chiếu. Cố định giờ.',
    totalMinutes: 15,
    purpose:
      'Không đo bạn giỏi tới đâu. Đo tuần này bạn có thật sự bỏ công không, và công đó có rơi đúng chỗ không.',
    items: [
      {
        no: 1,
        name: 'Chuỗi ngày có bằng chứng',
        minutes: 1,
        what: 'Đếm số ngày trong tuần có nộp bằng chứng của khối NHIỆM VỤ.',
        scoredBy: 'máy',
        evidence: 'Ảnh, bản ghi âm hoặc ảnh chụp màn hình đã nộp theo ngày.',
        passMark: 'Tối thiểu 5/7 ngày. Dưới 4 là đứt chuỗi.',
      },
      {
        no: 2,
        name: 'Độ trễ phản xạ',
        minutes: 4,
        what: 'Hai mươi tình huống bốc thăm, trả lời to. App đo độ trễ từng câu.',
        scoredBy: 'máy',
        evidence: 'Bản ghi âm 20 câu kèm số đo độ trễ.',
        passMark: 'Độ trễ trung bình phải thấp hơn tuần trước, hoặc đã dưới mốc của vòng.',
      },
      {
        no: 3,
        name: 'Chép chính tả 45 giây',
        minutes: 5,
        what: 'Một đoạn CHƯA TỪNG NGHE, đúng mức của vòng hiện tại.',
        scoredBy: 'máy',
        evidence: 'Bản chép và bản gốc, chấm tự động theo tỉ lệ từ đúng.',
        passMark: 'Không thấp hơn tuần trước quá 5 điểm phần trăm.',
      },
      {
        no: 4,
        name: 'Nói 90 giây không chuẩn bị',
        minutes: 3,
        what: 'Một chủ đề bốc thăm ngay lúc đó. Không có thời gian nghĩ trước.',
        scoredBy: 'máy + người',
        evidence: 'Bản ghi âm. Máy đếm từ đệm và khoảng dừng; người nghe chấm nội dung.',
        passMark: 'Dưới 5 từ đệm mỗi phút, không dừng quá 4 giây.',
      },
      {
        no: 5,
        name: 'Ba dòng sổ lỗi',
        minutes: 2,
        what: 'Ba lỗi lặp lại nhiều nhất tuần này, kèm mã lỗi.',
        scoredBy: 'người',
        evidence: 'Ba dòng viết, có mã lỗi thuộc bảng 20 phác đồ.',
        passMark:
          'Ba lỗi phải CỤ THỂ. "Phát âm chưa tốt" không tính; "rụng âm cuối /t/ ở các từ kết thúc bằng -ed" mới tính.',
      },
    ],
    decision: [
      {
        band: '5/5 mục đạt',
        verdict: 'Tuần vững.',
        action: 'Giữ nguyên cường độ. Không thưởng gì thêm — đây là mức bình thường.',
      },
      {
        band: '3–4/5 đạt',
        verdict: 'Có chỗ hụt nhưng chưa đáng lo.',
        action:
          'Trợ lý AI kê một đơn cho đúng mục hụt, làm trong 7 ngày tới. Không đổi lộ trình.',
      },
      {
        band: '1–2/5 đạt',
        verdict: 'Tuần hỏng. Nguyên nhân thường không nằm ở tiếng Anh.',
        action:
          'Cố vấn gọi trong 48 giờ. Câu hỏi đầu tiên là về lịch sinh hoạt, không về bài vở.',
      },
      {
        band: '0/5 hai tuần liên tiếp',
        verdict: 'Nguy cơ bỏ cuộc.',
        action:
          'Hạ mục tiêu ngày xuống mức tối thiểu 10 phút và giữ nguyên trong 14 ngày. Cứu chuỗi ngày trước, cứu tiến độ sau.',
      },
    ],
  },
  {
    id: 'b-21',
    cadence: '21 ngày',
    name: 'BÀI RA VÒNG — ĐO TỰ ĐỘNG HOÁ',
    when: 'Ngày 21 của mỗi vòng. Không dời, không thi lại trong cùng ngày.',
    totalMinutes: 45,
    purpose:
      'Kỹ năng hẹp của vòng này đã chuyển từ PHẢI NGHĨ sang TỰ ĐỘNG chưa. Dấu hiệu đo được là độ trễ và độ ổn định dưới áp lực.',
    items: [
      {
        no: 1,
        name: 'Bài ra vòng theo đúng đề của vòng',
        minutes: 25,
        what: 'Đề riêng của từng vòng, đã ghi sẵn trong hồ sơ 365 ngày.',
        scoredBy: 'máy + người',
        evidence: 'Bài làm có số liệu, lưu vào hồ sơ quý.',
        passMark: 'Đúng ngưỡng ghi trong exitTest của vòng đó.',
      },
      {
        no: 2,
        name: 'Cùng đề với ngày 1 của vòng',
        minutes: 10,
        what: 'Làm lại ĐÚNG bài đã làm ngày đầu vòng, để so hai cột.',
        scoredBy: 'máy',
        evidence: 'Hai bộ số liệu cạnh nhau, cùng một đề.',
        passMark:
          'Phải tiến bộ đo được. Không tiến bộ nghĩa là vòng này chưa xong, dù bài chính có đạt.',
      },
      {
        no: 3,
        name: 'Chuyển giao sang bối cảnh lạ',
        minutes: 7,
        what:
          'Cùng kỹ năng nhưng đặt vào tình huống chưa từng luyện. Đây là mục dễ trượt nhất.',
        scoredBy: 'người',
        evidence: 'Bản ghi hoặc bài viết trong bối cảnh mới.',
        passMark:
          'Làm được ở mức thấp hơn bối cảnh quen không quá một bậc. Chênh quá một bậc nghĩa là học thuộc, chưa thành kỹ năng.',
      },
      {
        no: 4,
        name: 'Giảng lại trong 3 phút',
        minutes: 3,
        what: 'Dạy kỹ năng của vòng cho một người chưa biết gì. Không dùng thuật ngữ.',
        scoredBy: 'người',
        evidence: 'Bản ghi 3 phút.',
        passMark:
          'Người nghe làm lại được sau khi nghe. Đây là phép thử khắt khe nhất và cũng thật nhất.',
      },
    ],
    decision: [
      {
        band: 'Đạt cả 4 mục',
        verdict: 'Vòng hoàn tất.',
        action: 'Nhận thưởng vòng. Sang vòng kế. Chọn kỹ năng hẹp mới.',
      },
      {
        band: 'Trượt mục 3 hoặc 4',
        verdict: 'Học thuộc, chưa thành kỹ năng.',
        action:
          'Không sang vòng mới. Kéo dài 7 ngày, chỉ luyện trong bối cảnh lạ. Đây là tình huống phổ biến nhất.',
      },
      {
        band: 'Trượt mục 2',
        verdict: 'Có làm nhưng không tiến bộ.',
        action:
          'Đổi phương pháp chứ không tăng thời lượng. Trợ lý AI rà lại đơn kê 21 ngày qua và đổi cách tiếp cận.',
      },
      {
        band: 'Trượt mục 1',
        verdict: 'Chưa đạt ngưỡng vòng.',
        action: 'Lặp lại vòng. Không tính là thất bại — tính là vòng dài hơn 21 ngày.',
      },
    ],
  },
  {
    id: 'b-90',
    cadence: '90 ngày',
    name: 'THI TẦNG — ĐO NĂNG LỰC ĐỔI BẬC',
    when: 'Ngày 87 của quý, trong điều kiện thi thật. Có giám thị.',
    totalMinutes: 150,
    purpose:
      'Năng lực đã đổi bậc chưa, hay chỉ quen bài. Đo bằng đề chuẩn, chấm bởi người không dạy bạn.',
    items: [
      {
        no: 1,
        name: 'Bốn kỹ năng theo đề chuẩn',
        minutes: 105,
        what: 'Nghe, đọc, viết, nói theo định dạng đề quốc tế đúng mức của tầng.',
        scoredBy: 'người',
        evidence: 'Bài thi đầy đủ, chấm bởi người chưa từng dạy học viên này.',
        passMark: 'Đạt mức CEFR mục tiêu của tầng trên cả bốn kỹ năng, không kỹ năng nào hụt quá một bậc.',
      },
      {
        no: 2,
        name: 'Đối chiếu với ngày đầu quý',
        minutes: 15,
        what: 'Đúng đề đã làm ngày 1 của quý, làm lại.',
        scoredBy: 'máy + người',
        evidence: 'Hai cột số liệu trên cùng một đề, cách nhau 90 ngày.',
        passMark: 'Tiến bộ tối thiểu một bậc trên ít nhất ba trong bốn kỹ năng.',
      },
      {
        no: 3,
        name: 'Hồ sơ bằng chứng 90 ngày',
        minutes: 20,
        what:
          'Trình bày 90 bằng chứng đã nộp. Giám khảo bốc ngẫu nhiên 5 cái và hỏi sâu.',
        scoredBy: 'người',
        evidence: 'Kho bằng chứng của quý.',
        passMark:
          'Tối thiểu 75/90 ngày có bằng chứng, và 5 cái bốc ngẫu nhiên đều trả lời được chi tiết.',
      },
      {
        no: 4,
        name: 'Phỏng vấn ngược',
        minutes: 10,
        what:
          'Học viên tự chỉ ra điểm yếu lớn nhất của mình và kế hoạch xử lý quý sau.',
        scoredBy: 'người',
        evidence: 'Bản ghi phỏng vấn.',
        passMark:
          'Điểm yếu nêu ra phải khớp với dữ liệu hệ thống ghi nhận. Nêu sai chỗ yếu là dấu hiệu chưa hiểu chính mình.',
      },
    ],
    decision: [
      {
        band: 'Đạt cả 4 mục',
        verdict: 'Lên tầng.',
        action: 'Nhận huy hiệu tầng, mở khoá quyền lợi tầng mới, chọn kỹ năng hẹp cho quý sau.',
      },
      {
        band: 'Đạt mục 1 nhưng trượt mục 3',
        verdict: 'Giỏi nhưng không có bằng chứng quá trình.',
        action:
          'Lên tầng có điều kiện: quý sau phải đạt 85/90 ngày có bằng chứng, nếu không thì hạ lại.',
      },
      {
        band: 'Trượt mục 1, đạt mục 2',
        verdict: 'Có tiến bộ thật nhưng chưa tới bậc.',
        action:
          'Ở lại tầng, kéo dài 30 ngày, thi lại. Tiến bộ đã đo được nên không đổi phương pháp.',
      },
      {
        band: 'Trượt cả mục 1 và mục 2',
        verdict: 'Chín mươi ngày không đổi được gì.',
        action:
          'Dừng lộ trình, làm lại bảng chẩn đoán từ đầu với cố vấn. Nguyên nhân hầu như luôn nằm ngoài phương pháp.',
      },
    ],
  },
  {
    id: 'b-journey',
    cadence: 'hành trình',
    name: 'BÀI ĐO CẢ HÀNH TRÌNH',
    when: 'Ngày 1, ngày 180, ngày 365, rồi mỗi 180 ngày tới hết 1.095 ngày.',
    totalMinutes: 240,
    purpose:
      'Trả lời câu hỏi duy nhất đáng hỏi sau ba năm: người này có dùng được tiếng Anh trong đời thật không.',
    items: [
      {
        no: 1,
        name: 'Đề thi quốc tế đầy đủ',
        minutes: 170,
        what: 'Một đề IELTS hoàn chỉnh trong đúng điều kiện phòng thi.',
        scoredBy: 'người',
        evidence: 'Phiếu điểm bốn kỹ năng.',
        passMark: 'Đạt band mục tiêu của mốc.',
      },
      {
        no: 2,
        name: 'Nhiệm vụ đời thật có hệ quả',
        minutes: 30,
        what:
          'Một việc thật bằng tiếng Anh, có người thật ở đầu kia và có hệ quả thật: phỏng vấn, thuyết trình, đàm phán, hoặc dạy một buổi.',
        scoredBy: 'người',
        evidence: 'Bản ghi và xác nhận của người ở đầu kia.',
        passMark:
          'Việc đó hoàn thành được. Đây là mục quan trọng nhất và cũng là mục không có đáp án mẫu.',
      },
      {
        no: 3,
        name: 'Đối chiếu ngày 1',
        minutes: 20,
        what: 'Làm lại bản ghi âm và bài viết của ngày 1.',
        scoredBy: 'máy + người',
        evidence: 'Hai bản cách nhau hàng trăm ngày, đặt cạnh nhau.',
        passMark:
          'Không có ngưỡng. Mục này không để chấm — để học viên nhìn thấy chính mình đã đi bao xa.',
      },
      {
        no: 4,
        name: 'Bàn giao cho người đi sau',
        minutes: 20,
        what: 'Viết và trình bày những gì mình đã học được về CÁCH HỌC, cho người sắp bắt đầu.',
        scoredBy: 'người',
        evidence: 'Tài liệu bàn giao, đưa vào thư viện của học viện.',
        passMark: 'Người đi sau dùng được. Đây là bằng chứng cao nhất của việc đã thật sự hiểu.',
      },
    ],
    decision: [
      {
        band: 'Đạt band mục tiêu và làm được mục 2',
        verdict: 'Về đích mốc này.',
        action: 'Chúc mừng, nhận thưởng lớn, đặt mốc kế tiếp.',
      },
      {
        band: 'Đạt band nhưng trượt mục 2',
        verdict: 'Điểm cao mà chưa dùng được.',
        action:
          'Sáu mươi ngày kế chuyển toàn bộ trọng tâm sang nhiệm vụ đời thật, không luyện đề.',
      },
      {
        band: 'Trượt band nhưng làm được mục 2',
        verdict: 'Dùng được nhưng chưa quen định dạng thi.',
        action: 'Ba mươi ngày luyện định dạng. Đây là tình huống dễ xử lý nhất.',
      },
      {
        band: 'Trượt cả hai',
        verdict: 'Mốc chưa đạt.',
        action:
          'Không hạ mục tiêu và không kéo dài vô hạn. Ngồi lại với cố vấn, chọn một trong hai: dời mốc có ngày cụ thể, hoặc đổi mục tiêu cho đúng với đời sống hiện tại.',
      },
    ],
  },
];

/* ------------------- CHỐNG HỌC GIẢ, TIẾN BỘ GIẢ ------------------------- */

export const INTEGRITY_RULES: IntegrityRule[] = [
  {
    id: 'i-copy',
    risk: 'Nộp bài viết do máy dịch hoặc do người khác viết.',
    signal:
      'Trình độ bài viết cao hơn hẳn trình độ nói đo được cùng tuần. Khoảng cách giữa hai kỹ năng có giới hạn tự nhiên.',
    check:
      'Bốc một câu bất kỳ trong bài, yêu cầu nói lại ý đó bằng lời trong 30 giây.',
    response:
      'Không phạt. Ghi nhận là dấu hiệu học viên đang sợ bị đánh giá. Cố vấn nói chuyện về nỗi sợ đó trước khi nói về bài.',
  },
  {
    id: 'i-replay',
    risk: 'Nộp lại bản ghi âm cũ cho ngày mới.',
    signal:
      'Vân âm thanh trùng khớp với bản đã nộp trước đó: cùng độ dài, cùng phổ, cùng vị trí ngắt.',
    check: 'So khớp tự động với kho bản ghi của chính học viên.',
    response: 'Ngày đó không tính vào chuỗi. Báo cho học viên biết lý do cụ thể.',
  },
  {
    id: 'i-batch',
    risk: 'Dồn bảy ngày làm một buổi rồi nộp lùi ngày.',
    signal:
      'Bảy bằng chứng có dấu thời gian nằm trong cùng một khung 90 phút.',
    check: 'Dấu thời gian ghi tại thời điểm nộp, không sửa được từ phía học viên.',
    response:
      'Tính là MỘT ngày, không phải bảy. Cách học này không tạo ra tự động hoá — giãn cách mới tạo.',
  },
  {
    id: 'i-familiar',
    risk: 'Làm bài kiểm tra bằng chính đoạn đã luyện nhiều lần.',
    signal: 'Điểm bài kiểm tra cao bất thường so với bài chuyển giao bối cảnh lạ.',
    check:
      'Mọi bài kiểm tra dùng nội dung CHƯA TỪNG XUẤT HIỆN trong lộ trình của học viên đó.',
    response: 'Không cần xử lý — thiết kế đề đã chặn sẵn.',
  },
  {
    id: 'i-selfscore',
    risk: 'Tự chấm cao để giữ chuỗi.',
    signal: 'Không áp dụng.',
    check:
      'Hệ thống không có ô tự chấm nào ảnh hưởng tới quyết định. Tự phản tỉnh được ghi lại nhưng không tính điểm.',
    response: 'Chặn từ thiết kế, không cần phát hiện.',
  },
  {
    id: 'i-ghost',
    risk: 'Nhờ người khác thi hộ bài 90 ngày.',
    signal: 'Giọng trong bài thi khác với kho bản ghi 90 ngày của học viên.',
    check:
      'Đối chiếu đặc trưng giọng nói với các bản ghi đã nộp trong quý, bằng công cụ khớp giọng của hệ thống.',
    response:
      'Huỷ kết quả, thi lại có giám thị trực tiếp. Đây là vi phạm nặng nhất vì nó phá giá trị của mọi tấm bằng khác.',
  },
  {
    id: 'i-effort',
    risk: 'Bỏ công thật nhưng bỏ sai chỗ — cày số giờ mà không tiến bộ.',
    signal:
      'Số giờ cao, chuỗi ngày dài, nhưng chỉ số ở bài 21 ngày đứng yên qua hai vòng.',
    check: 'Đối chiếu thời lượng với đường tiến bộ, không chỉ nhìn thời lượng.',
    response:
      'Đây KHÔNG phải gian lận mà là bi kịch phổ biến nhất. Đổi phương pháp, không tăng giờ. Trợ lý AI kê lại đơn từ đầu.',
  },
  {
    id: 'i-reward',
    risk: 'Học vì phần thưởng, hết thưởng thì dừng.',
    signal: 'Chuỗi ngày tụt ngay sau mỗi lần nhận thưởng.',
    check: 'Theo dõi chuỗi ngày trong 14 ngày sau mỗi mốc thưởng.',
    response:
      'Chuyển phần thưởng từ vật chất sang quyền: quyền dẫn buổi, quyền chọn nội dung, quyền kèm người mới. Quyền thì phải giữ mới còn.',
  },
];

/* ------------------------------ PHẦN THƯỞNG ----------------------------- */

export const REWARD_TIERS: RewardTier[] = [
  {
    id: 'r-week',
    trigger: 'Bốn tuần liên tiếp đạt 5/5 mục bài tuần.',
    reward: 'Một buổi kèm riêng 30 phút với cố vấn, chủ đề do học viên chọn.',
    why: 'Thưởng bằng sự chú ý của người thật, không bằng huy hiệu ảo.',
    cannotFake:
      'Bốn tuần liên tiếp không dồn được vào một buổi — dấu thời gian không cho phép.',
  },
  {
    id: 'r-cycle',
    trigger: 'Qua bài ra vòng đủ cả 4 mục, gồm cả mục chuyển giao bối cảnh lạ.',
    reward: 'Huy hiệu vòng, và quyền chọn kỹ năng hẹp cho vòng kế tiếp.',
    why:
      'Quyền tự chọn là phần thưởng mạnh hơn quà, vì nó nói rằng bạn đã đủ hiểu mình.',
    cannotFake:
      'Mục giảng lại 3 phút đòi hỏi người nghe làm lại được — không diễn được.',
  },
  {
    id: 'r-tier',
    trigger: 'Qua thi tầng, gồm cả hồ sơ 75/90 ngày có bằng chứng.',
    reward:
      'Huy hiệu tầng, mở khoá học liệu tầng trên, và quyền dẫn một buổi câu lạc bộ.',
    why:
      'Được đứng trước người khác là phần thưởng và cũng là bài kiểm tra tiếp theo.',
    cannotFake:
      'Bảy mươi lăm bằng chứng rải trên 90 ngày, có dấu thời gian, không dựng lại được.',
  },
  {
    id: 'r-teach',
    trigger: 'Dạy lại thành công cho một người mới, đo bằng tiến bộ của người đó.',
    reward: 'Danh hiệu Người Đi Trước, và một suất học bổng tặng cho người mình chọn.',
    why:
      'Phần thưởng lớn nhất là quyền cho đi. Nó cũng khoá chặt kiến thức của chính người dạy.',
    cannotFake: 'Tiến bộ của người khác không giả được bằng nỗ lực của mình.',
  },
  {
    id: 'r-recover',
    trigger: 'Đứt chuỗi rồi quay lại và giữ được 14 ngày liên tiếp.',
    reward: 'Huy hiệu QUAY LẠI — huy hiệu hiếm nhất hệ thống.',
    why:
      'Người chưa từng đứt chuỗi không nhận được huy hiệu này. Nó tôn vinh việc quay lại, vì đó mới là kỹ năng quyết định ai đi hết 1.095 ngày.',
    cannotFake: 'Phải đứt thật rồi quay lại thật.',
  },
  {
    id: 'r-journey',
    trigger: 'Đạt mốc hành trình, gồm cả nhiệm vụ đời thật có hệ quả.',
    reward:
      'Lễ công nhận có mặt người thân, và tên vào bảng những người đã đi hết chặng.',
    why:
      'Mốc ba năm cần một nghi thức có người chứng kiến. Một dòng thông báo trong app không đủ sức nặng cho một việc mất ba năm.',
    cannotFake:
      'Nhiệm vụ đời thật có người thật ở đầu kia và có hệ quả thật.',
  },
];

/* --------------------- QUY TRÌNH TRỢ LÝ AI CÁ NHÂN HOÁ ------------------- */

export const AI_PROTOCOL: AiStep[] = [
  {
    no: 1,
    name: 'THU',
    input:
      'Bằng chứng hằng ngày, số đo độ trễ, bài chép chính tả, bản ghi âm, kết quả bài tuần.',
    does:
      'Gom mọi thứ về một dòng thời gian duy nhất của học viên. Không diễn giải gì ở bước này.',
    output: 'Một hồ sơ dữ liệu thô, có dấu thời gian, không có nhận xét.',
    humanGate: 'Không cần người.',
    limit:
      'Không suy đoán từ dữ liệu thiếu. Ngày không có bằng chứng là ngày trống, không phải ngày kém.',
  },
  {
    no: 2,
    name: 'ĐO',
    input: 'Hồ sơ dữ liệu thô.',
    does:
      'Tính các chỉ số đã định nghĩa sẵn: độ trễ, độ chính xác, từ đệm mỗi phút, chuỗi ngày, độ dốc tiến bộ.',
    output: 'Bảng chỉ số có xu hướng, so với chính học viên tuần trước.',
    humanGate: 'Không cần người.',
    limit:
      'Chỉ so học viên với CHÍNH HỌ trước đó, không xếp hạng giữa các học viên. Xếp hạng làm hỏng động lực của người ở nửa dưới.',
  },
  {
    no: 3,
    name: 'CHẨN',
    input: 'Bảng chỉ số, kèm sổ lỗi của học viên.',
    does:
      'Khớp mẫu chỉ số với bảng 40 triệu chứng, chọn ra tối đa BA triệu chứng nổi nhất.',
    output: 'Ba triệu chứng, xếp theo mức ảnh hưởng, kèm bằng chứng dẫn tới kết luận.',
    humanGate:
      'Cố vấn duyệt danh sách triệu chứng trước khi kê đơn, nếu học viên đang ở tình trạng nguy cơ bỏ cuộc.',
    limit:
      'Không bao giờ chẩn quá ba triệu chứng một lúc. Kê nhiều thứ cùng lúc là cách chắc chắn để không thứ nào được làm.',
  },
  {
    no: 4,
    name: 'KÊ',
    input: 'Ba triệu chứng, cấp độ hiện tại của học viên.',
    does:
      'Tra kho giải pháp theo cặp (triệu chứng × cấp độ), lấy ra đơn kê đúng cấp: việc làm hôm nay, bài luyện 7 ngày, cách đo lại.',
    output: 'Một đơn kê duy nhất cho 7 ngày tới, không quá ba việc.',
    humanGate:
      'Học viên phải bấm nhận đơn. Đơn không được tự áp vào lộ trình.',
    limit:
      'Không tự đổi lộ trình dài hạn, không tự hạ mục tiêu, không tự cho qua bài kiểm tra. Đó là quyền của cố vấn.',
  },
  {
    no: 5,
    name: 'THEO',
    input: 'Dữ liệu 7 ngày sau khi nhận đơn.',
    does: 'Đo lại đúng chỉ số đã nêu trong đơn, không đo thứ khác.',
    output:
      'Một trong ba kết luận: đơn có tác dụng, đơn không tác dụng, hoặc chưa đủ dữ liệu.',
    humanGate: 'Không cần người nếu đơn có tác dụng.',
    limit:
      'Không kê đơn mới khi chưa đo xong đơn cũ. Đổi liên tục thì không bao giờ biết cái nào hiệu quả.',
  },
  {
    no: 6,
    name: 'CHUYỂN',
    input: 'Kết luận sau 7 ngày.',
    does:
      'Đơn có tác dụng thì kéo dài. Không tác dụng hai lần liên tiếp thì chuyển hồ sơ cho cố vấn người thật, kèm toàn bộ dữ liệu và những gì đã thử.',
    output: 'Đơn kéo dài, hoặc một hồ sơ bàn giao cho người.',
    humanGate:
      'Đây là cửa bắt buộc: hai đơn liên tiếp không tác dụng thì AI DỪNG kê và giao cho người.',
    limit:
      'Trợ lý AI không được thử đơn thứ ba. Khi hai lần đều trượt, vấn đề gần như luôn nằm ngoài phạm vi nó nhìn thấy được: sức khoẻ, công việc, gia đình, hoặc động lực.',
  },
];
