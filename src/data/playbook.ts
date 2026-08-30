/**
 * KHO BI KIP
 *
 * Tang sau nhat cua he tai lieu. Bo kien thuc (knowledge.ts) tra loi "phai on
 * lai cai gi"; kho bi kip tra loi ba cau hoi kho hon nhieu:
 *
 *   1. DOC VI  — nhin vao dau la biet ngay day la dang nao?
 *   2. PHUONG PHAP — dang nay giai bang duong loi gi, va vi sao la duong do?
 *   3. BUOC GIAI — cu the lam gi truoc, lam gi sau, moi buoc de LAM GI?
 *
 * Vi sao tach ra thanh mot tang rieng:
 *
 * Loi giai cua MOT cau chi day duoc cau do. Nguoi hoc doc xong gat gu "a,
 * hieu roi", gap cau tuong tu hom sau van tac — vi thu ho thieu khong phai
 * phep bien doi ma la CAI NHIN dau tien: de nay thuoc dang gi. Do la thu ma
 * giao vien gioi co sau vai nghin de, va gan nhu khong bao gio duoc viet ra.
 *
 * Kho bi kip viet no ra. Va vi ca 2000 phieu deu soan bo giai de tu day, viet
 * mot lan la 2000 phieu cung sau — thay vi vai phieu duoc viet tay ky luong
 * con lai thi so sai.
 *
 * QUY UOC BIEN SOAN:
 *  - `tell` la dau hieu NHIN THAY DUOC tren de, khong phai mo ta truu tuong.
 *    "Co tham so m trong he so" la dau hieu; "bai kho ve tham so" thi khong.
 *  - Moi buoc giai deu phai noi duoc `why`. Mot buoc khong giai thich duoc
 *    muc dich la mot buoc hoc thuoc — va hoc thuoc thi quen ngay trong phong thi.
 *  - `trick` chi ghi meo THAT SU rut ngan duoc thoi gian, khong ghi meo cho co.
 */

export interface SolveStep {
  /** Lam gi. */
  action: string;
  /** De lam gi — buoc khong noi duoc muc dich la buoc hoc thuoc. */
  why: string;
}

export interface PatternPlaybook {
  id: string;
  name: string;
  /** Doc vi: dau hieu nhin thay duoc tren de bai. */
  tell: readonly string[];
  /** Duong loi tong quat, kem ly do vi sao la duong nay. */
  method: string;
  steps: readonly SolveStep[];
  /** Meo rut ngan thoi gian. Chi ghi khi that su rut ngan duoc. */
  trick?: string;
  /** Sai lam dac trung cua rieng dang nay. */
  pitfall?: string;
}

export interface Secret {
  title: string;
  body: string;
  /** Dung khi nao — mot bi kip khong noi ro luc dung se bi dung sai cho. */
  when: string;
}

export interface TopicPlaybook {
  topicId: string;
  /** Cau hoi lon ma ca chuyen de nay tra loi. */
  bigQuestion: string;
  patterns: readonly PatternPlaybook[];
  secrets: readonly Secret[];
}

export const PLAYBOOKS: readonly TopicPlaybook[] = [
  /* ══ TOÁN HỌC ══════════════════════════════════════════════════════ */
  {
    topicId: 'quantitative.arithmetic',
    bigQuestion: 'Đại lượng này thay đổi so với cái gì, và thay đổi bao nhiêu phần của cái đó?',
    patterns: [
      {
        id: 'ari.chain',
        name: 'Thay đổi liên tiếp nhiều lần',
        tell: [
          'Đề có từ "rồi lại", "sau đó", "tiếp tục" giữa hai lần tăng/giảm',
          'Lần thay đổi thứ hai được mô tả là tính trên giá trị đã đổi',
          'Hỏi "so với ban đầu" chứ không hỏi từng bước',
        ],
        method:
          'Không cộng phần trăm — nhân hệ số. Mỗi lần thay đổi a% là một phép nhân với (1 ± a/100); nhiều lần liên tiếp là tích các hệ số. Lý do: phần trăm lần sau tính trên một mẫu số khác lần đầu, mà chỉ hệ số nhân mới mang được thông tin "mẫu số đã đổi".',
        steps: [
          { action: 'Đặt giá trị ban đầu bằng 100 (hoặc bằng 1).', why: 'Câu hỏi chỉ hỏi tỉ lệ, nên một con số tròn làm mọi phép tính nhẩm được.' },
          { action: 'Viết mỗi lần thay đổi thành một hệ số: tăng a% → (1 + a/100), giảm a% → (1 − a/100).', why: 'Đưa mọi lần thay đổi về cùng một dạng thì mới nhân được với nhau.' },
          { action: 'Nhân toàn bộ hệ số lại.', why: 'Tích của chúng chính là tỉ lệ cuối so với ban đầu.' },
          { action: 'Trừ 1 rồi đổi ra phần trăm.', why: 'Đề hỏi mức thay đổi, không hỏi giá trị cuối.' },
        ],
        trick:
          'Tăng a% rồi giảm a% luôn cho kết quả NHỎ HƠN ban đầu đúng a²/100 phần trăm. Tăng 20% rồi giảm 20% là mất 4%. Nhớ con số này thì loại được ngay phương án "không đổi" — phương án nhiễu phổ biến nhất của dạng này.',
        pitfall: 'Cộng gộp hai lần thay đổi. Giảm 10% rồi giảm 20% không phải giảm 30% mà là giảm 28%.',
      },
      {
        id: 'ari.rate',
        name: 'Năng suất — công việc chung',
        tell: [
          'Hai hoặc nhiều người/máy/vòi cùng làm một công việc',
          'Đề cho thời gian làm riêng, hỏi thời gian làm chung (hoặc ngược lại)',
          'Có từ "cùng làm", "cùng chảy", "làm chung rồi một người nghỉ"',
        ],
        method:
          'Quy về năng suất: coi cả công việc là 1, thì người làm xong trong t giờ có năng suất 1/t công việc mỗi giờ. Lý do phải quy về năng suất: thời gian KHÔNG cộng được (làm chung không phải cộng thời gian), nhưng năng suất thì cộng được — mỗi giờ mỗi người đóng góp phần của mình.',
        steps: [
          { action: 'Đặt cả công việc bằng 1.', why: 'Bỏ được đơn vị, mọi năng suất thành phân số đơn giản.' },
          { action: 'Viết năng suất từng người: 1/t₁, 1/t₂, …', why: 'Đây là đại lượng duy nhất cộng được trong bài toán này.' },
          { action: 'Cộng năng suất của những người đang cùng làm.', why: 'Năng suất chung là tổng các năng suất riêng.' },
          { action: 'Thời gian chung = 1 chia cho năng suất chung.', why: 'Nghịch đảo đưa từ "phần việc mỗi giờ" về "số giờ".' },
          { action: 'Nếu có người nghỉ giữa chừng: tính phần việc đã xong trước khi nghỉ, phần còn lại chia cho năng suất mới.', why: 'Bài toán tách thành hai giai đoạn có năng suất khác nhau.' },
        ],
        trick:
          'Hai người làm riêng hết a và b giờ thì làm chung hết ab/(a+b) giờ. Thuộc công thức này thì dạng cơ bản xong trong 20 giây. Kiểm tra nhanh: kết quả phải nhỏ hơn cả a lẫn b.',
        pitfall: 'Lấy trung bình cộng thời gian. Hai người làm 6 giờ và 3 giờ thì làm chung 2 giờ, không phải 4,5 giờ.',
      },
      {
        id: 'ari.mix',
        name: 'Pha trộn — nồng độ',
        tell: [
          'Có dung dịch, hợp kim, hoặc trộn hai loại có giá/nồng độ khác nhau',
          'Đề cho nồng độ trước và sau khi thêm chất',
          'Xuất hiện cụm "thêm vào", "pha thêm nước", "trộn lẫn"',
        ],
        method:
          'Bám vào đại lượng KHÔNG ĐỔI. Thêm dung môi thì lượng chất tan không đổi; thêm chất tan thì lượng dung môi không đổi; trộn hai dung dịch thì tổng chất tan bằng tổng hai phần. Lý do: nồng độ là tỉ số, mà tỉ số thì không cộng được — chỉ khối lượng mới cộng được.',
        steps: [
          { action: 'Xác định đại lượng nào giữ nguyên khi thêm/trộn.', why: 'Đó là chiếc neo để lập phương trình; chọn sai neo thì phương trình sai từ dòng đầu.' },
          { action: 'Tính khối lượng chất tan ban đầu = nồng độ × khối lượng dung dịch.', why: 'Chuyển từ tỉ lệ sang khối lượng để cộng được.' },
          { action: 'Viết phương trình cho trạng thái sau, nhớ cả tử và mẫu đều có thể thay đổi.', why: 'Thêm chất tan thì khối lượng dung dịch cũng tăng — quên điều này là lỗi số một của dạng này.' },
          { action: 'Giải và đối chiếu: nồng độ mới phải nằm giữa hai nồng độ đầu (nếu trộn).', why: 'Một phép kiểm tra 3 giây loại được đáp án vô lý.' },
        ],
        trick:
          'Quy tắc đường chéo: trộn nồng độ a% với b% ra c% thì tỉ lệ khối lượng hai phần là |b − c| : |c − a|. Dạng "trộn để được nồng độ cho trước" giải trong đầu bằng quy tắc này.',
        pitfall: 'Thêm 20g chất tan vào 100g dung dịch mà vẫn lấy mẫu số 100. Mẫu số mới là 120.',
      },
    ],
    secrets: [
      {
        title: 'Mẫu số là câu hỏi thật',
        body: 'Mọi câu phần trăm sai đều sai ở mẫu số, gần như không bao giờ sai ở phép chia. Trước khi tính, hãy đọc to trong đầu: "phần trăm CỦA cái gì". Nếu không trả lời được câu đó trong 3 giây thì đọc lại đề — đừng tính.',
        when: 'Trước khi đặt bút với mọi câu có dấu %.',
      },
      {
        title: 'Đặt 100 thay vì đặt x',
        body: 'Khi đề chỉ hỏi tỉ lệ mà không cho một con số tuyệt đối nào, đặt giá trị ban đầu bằng 100. Toàn bộ bài trở thành số học nhẩm được, thay vì đại số phải rút gọn x.',
        when: 'Đề không cho giá trị cụ thể nào, chỉ toàn phần trăm.',
      },
      {
        title: 'Ước lượng trước, tính sau',
        body: 'Với đề trắc nghiệm, hãy ước lượng thô đáp án trước khi tính chính xác. Phần lớn câu số học có bốn phương án cách nhau xa, và một ước lượng trong 10 giây đã loại được hai phương án — nếu kết quả tính ra rơi vào phương án đã bị loại thì bạn biết ngay là mình tính sai.',
        when: 'Mọi câu trắc nghiệm số học, đặc biệt khi đang bị áp lực thời gian.',
      },
    ],
  },
  {
    topicId: 'quantitative.algebra',
    bigQuestion: 'Phương trình này có nghiệm không, có bao nhiêu, và nghiệm ấy thỏa điều kiện gì?',
    patterns: [
      {
        id: 'alg.param',
        name: 'Tìm tham số để nghiệm thỏa điều kiện',
        tell: [
          'Có chữ m (hoặc a, k) nằm trong hệ số, không phải trong biến',
          'Câu hỏi bắt đầu bằng "Tìm m để…"',
          'Điều kiện nói về nghiệm: hai nghiệm phân biệt, hai nghiệm dương, nghiệm này gấp đôi nghiệm kia',
        ],
        method:
          'Ba tầng điều kiện, luôn theo thứ tự: (1) tồn tại nghiệm — dấu của Δ; (2) quan hệ giữa các nghiệm — định lý Viète; (3) điều kiện riêng của đề. Lý do phải theo thứ tự: Viète chỉ có nghĩa khi nghiệm đã tồn tại. Bỏ tầng 1 là lỗi phổ biến nhất, và nó cho ra một tập m rộng hơn đáp án đúng.',
        steps: [
          { action: 'Kiểm tra hệ số bậc hai có chứa m không. Nếu có, xét riêng trường hợp nó bằng 0.', why: 'Khi hệ số bậc hai bằng 0 thì phương trình thành bậc nhất — một trường hợp hoàn toàn khác mà đề hay giấu ở đây.' },
          { action: 'Viết điều kiện Δ theo yêu cầu về số nghiệm.', why: 'Đây là cửa vào: không qua được thì mọi tính toán sau đều vô nghĩa.' },
          { action: 'Dùng Viète đưa điều kiện của đề về tổng và tích nghiệm.', why: 'Tránh phải giải nghiệm tường minh — nghiệm chứa căn của m thì gần như không xử lý nổi.' },
          { action: 'Giải hệ điều kiện, rồi GIAO với điều kiện Δ.', why: 'Bước giao là bước hay bị quên nhất; thiếu nó thì đáp án thừa nghiệm.' },
        ],
        trick:
          'Hai nghiệm cùng dương ⟺ Δ ≥ 0 và S > 0 và P > 0. Hai nghiệm trái dấu ⟺ P < 0 (không cần xét Δ, vì P < 0 đã kéo theo Δ > 0). Nhớ mẹo thứ hai tiết kiệm được một dòng và tránh được lỗi.',
        pitfall: 'Quên xét trường hợp hệ số bậc hai bằng 0 khi hệ số đó chứa m.',
      },
      {
        id: 'alg.sym',
        name: 'Biểu thức đối xứng của hai nghiệm',
        tell: [
          'Đề hỏi x₁² + x₂², 1/x₁ + 1/x₂, |x₁ − x₂|, x₁³ + x₂³',
          'Không hỏi từng nghiệm riêng lẻ',
          'Phương trình có nghiệm xấu hoặc chứa tham số',
        ],
        method:
          'Không giải phương trình. Mọi biểu thức đối xứng đều biểu diễn được qua S = x₁ + x₂ và P = x₁x₂ — hai đại lượng lấy thẳng từ hệ số bằng Viète. Lý do: giải ra nghiệm chứa căn rồi thay vào là con đường dài gấp năm và dễ sai dấu.',
        steps: [
          { action: 'Viết S = −b/a và P = c/a.', why: 'Lấy trực tiếp từ hệ số, không cần Δ.' },
          { action: 'Biến đổi biểu thức cần tính về dạng chỉ chứa S và P.', why: 'Đây là toàn bộ kỹ thuật của dạng này; thuộc vài hằng đẳng thức là đủ.' },
          { action: 'Thay số và tính.', why: 'Đến bước này chỉ còn số học.' },
          { action: 'Nếu có căn hoặc mẫu: kiểm tra điều kiện tồn tại (Δ ≥ 0, P ≠ 0).', why: 'Biểu thức có thể tính ra số đẹp mà nghiệm lại không tồn tại.' },
        ],
        trick:
          'Thuộc ba hằng đẳng thức là đủ cho 90% câu: x₁² + x₂² = S² − 2P; (x₁ − x₂)² = S² − 4P; x₁³ + x₂³ = S³ − 3PS.',
        pitfall: 'Tính |x₁ − x₂| bằng cách lấy căn của S² − 4P mà quên rằng biểu thức này phải không âm — tức là quên điều kiện Δ ≥ 0.',
      },
      {
        id: 'alg.radical',
        name: 'Phương trình và bất phương trình vô tỉ',
        tell: [
          'Có dấu căn bậc chẵn mà biểu thức dưới căn chứa biến x',
          'Câu hỏi về số nghiệm hoặc tập nghiệm của phương trình, bất phương trình',
        ],
        method:
          'Đặt điều kiện trước, bình phương sau. Với bất phương trình, bắt buộc chia trường hợp theo dấu của vế không chứa căn — vì bình phương chỉ bảo toàn chiều bất đẳng thức khi cả hai vế cùng không âm.',
        steps: [
          { action: 'Đặt điều kiện xác định: mọi biểu thức dưới căn bậc chẵn ≥ 0.', why: 'Tập xác định thu hẹp trước sẽ loại sẵn nghiệm ngoại lai.' },
          { action: 'Cô lập căn về một vế.', why: 'Bình phương chỉ khử được căn khi nó đứng một mình.' },
          { action: 'Với bất phương trình: xét dấu vế còn lại, chia hai trường hợp.', why: 'Vế phải âm thì bất phương trình hoặc luôn đúng hoặc luôn sai, không cần bình phương.' },
          { action: 'Bình phương, giải, rồi THỬ LẠI nghiệm vào phương trình gốc.', why: 'Bình phương là phép biến đổi không tương đương — nó sinh nghiệm ngoại lai.' },
        ],
        trick:
          'Với phương trình dạng √A = √B, chỉ cần A = B kèm một trong hai điều kiện A ≥ 0 (không cần cả hai — chúng tương đương khi A = B).',
        pitfall: 'Bình phương ngay khi vế phải còn chứa dấu âm chưa xét. Đây là nguồn của gần như mọi nghiệm ngoại lai.',
      },
    ],
    secrets: [
      {
        title: 'Δ là cửa, Viète là phòng',
        body: 'Không bao giờ bước vào Viète trước khi qua Δ. Định lý Viète phát biểu về hai nghiệm — nếu chúng không tồn tại thì mọi hệ thức về chúng đều vô nghĩa, dù tính ra vẫn có số.',
        when: 'Mọi câu có tham số trong phương trình bậc hai.',
      },
      {
        title: 'Thử đáp án ngược',
        body: 'Với câu trắc nghiệm tìm m, thay thẳng từng giá trị m trong bốn phương án vào và kiểm tra. Với đề bốn phương án, cách này thường nhanh hơn giải xuôi, và không bao giờ sai vì không có phép biến đổi nào để sai.',
        when: 'Bốn phương án là bốn giá trị cụ thể, không phải bốn khoảng.',
      },
      {
        title: 'Nhìn dấu trước khi giải',
        body: 'Với câu hỏi về dấu của nghiệm, hãy nhìn dấu của P = c/a trước tiên. P < 0 là kết luận ngay lập tức "hai nghiệm trái dấu", không cần tính Δ, không cần S.',
        when: 'Đề hỏi hai nghiệm cùng dấu hay trái dấu.',
      },
    ],
  },
  {
    topicId: 'quantitative.sequence',
    bigQuestion: 'Quy luật nối số hạng này với số hạng kia là gì, và nó dẫn tới đâu khi n lớn?',
    patterns: [
      {
        id: 'seq.identify',
        name: 'Nhận dạng cấp số cộng hay cấp số nhân',
        tell: [
          'Đề cho vài số hạng đầu và hỏi số hạng thứ n hoặc tổng',
          'Có cụm "mỗi năm tăng thêm… đơn vị" (cộng) hoặc "mỗi năm tăng… phần trăm" (nhân)',
          'Cho hệ thức truy hồi dạng uₙ₊₁ = uₙ + d hoặc uₙ₊₁ = q·uₙ',
        ],
        method:
          'Lấy hiệu hai số hạng liên tiếp và lấy thương hai số hạng liên tiếp. Cái nào hằng số thì đó là loại cấp số. Lý do phải thử cả hai: bài toán thực tế thường mô tả bằng lời, và "tăng thêm 5 triệu" với "tăng thêm 5%" chỉ khác nhau một ký tự nhưng dẫn tới hai công thức hoàn toàn khác.',
        steps: [
          { action: 'Tính u₂ − u₁ và u₃ − u₂. Nếu bằng nhau → cấp số cộng, d là hiệu đó.', why: 'Kiểm tra hai lần chứ không một lần: hai số bất kỳ luôn có một hiệu, ba số mới xác nhận được quy luật.' },
          { action: 'Nếu hiệu không bằng nhau, tính u₂/u₁ và u₃/u₂.', why: 'Thương bằng nhau thì là cấp số nhân với công bội q.' },
          { action: 'Viết công thức số hạng tổng quát: uₙ = u₁ + (n−1)d hoặc uₙ = u₁·qⁿ⁻¹.', why: 'Chỉ số n−1 là chỗ sai nhiều nhất — số hạng đầu ứng với 0 lần cộng/nhân, không phải 1 lần.' },
          { action: 'Áp công thức tổng nếu đề hỏi tổng.', why: 'Cộng tay n số hạng vừa lâu vừa dễ sót.' },
        ],
        trick:
          'Kiểm tra công thức vừa lập bằng cách thay n = 1: phải ra đúng u₁. Phép thử 3 giây này bắt được toàn bộ lỗi lệch chỉ số.',
        pitfall: 'Dùng uₙ = u₁ + n·d thay vì (n−1)·d. Lỗi lệch một số hạng, và đề luôn có sẵn phương án nhiễu cho đúng lỗi này.',
      },
      {
        id: 'seq.growth',
        name: 'Bài toán tăng trưởng thực tế',
        tell: [
          'Dân số, lãi kép, khấu hao, vi khuẩn sinh sôi',
          'Có mốc "sau bao nhiêu năm/kỳ"',
          'Tỉ lệ tăng cho bằng phần trăm',
        ],
        method:
          'Mô hình cấp số nhân với công bội q = 1 + r. Nếu hỏi "sau bao lâu thì đạt…", lấy logarit hai vế — đây là công cụ duy nhất kéo n từ trên số mũ xuống.',
        steps: [
          { action: 'Xác định giá trị ban đầu và tỉ lệ r mỗi kỳ.', why: 'Sai đơn vị kỳ (năm/quý/tháng) là lỗi nặng nhất và không thể sửa ở bước sau.' },
          { action: 'Viết A = A₀(1 + r)ⁿ.', why: 'Mọi bài tăng trưởng đều là một biến thể của công thức này.' },
          { action: 'Nếu tìm A: thay số. Nếu tìm n: lấy log hai vế, n = log(A/A₀)/log(1+r).', why: 'Logarit là phép toán duy nhất đưa số mũ xuống làm hệ số.' },
          { action: 'Làm tròn n LÊN nếu câu hỏi là "ít nhất bao nhiêu kỳ".', why: 'Làm tròn xuống cho ra một mốc chưa đạt yêu cầu — đây là bẫy cố ý của dạng này.' },
        ],
        trick:
          'Quy tắc 70: số kỳ để một đại lượng tăng gấp đôi ≈ 70/r (r tính theo phần trăm). Lãi 7%/năm thì gấp đôi sau khoảng 10 năm. Dùng để loại phương án trong 5 giây.',
        pitfall: 'Nhầm lãi đơn với lãi kép. Lãi đơn là cấp số cộng, lãi kép là cấp số nhân.',
      },
      {
        id: 'seq.limit',
        name: 'Giới hạn của dãy',
        tell: [
          'Có ký hiệu lim hoặc câu hỏi "khi n tiến ra vô cùng"',
          'Biểu thức là phân thức của n, hoặc chứa qⁿ',
        ],
        method:
          'Chia cả tử và mẫu cho lũy thừa bậc cao nhất. Với dãy chứa qⁿ, nhớ rằng qⁿ → 0 khi |q| < 1 — đây là chiếc chìa khóa duy nhất của nhóm này.',
        steps: [
          { action: 'Tìm bậc cao nhất của n có mặt trong biểu thức.', why: 'Nó quyết định mọi thứ; các bậc thấp hơn đều tiến về 0 tương đối.' },
          { action: 'Chia tử và mẫu cho nⁿ bậc đó.', why: 'Biến các số hạng bậc thấp thành 1/n, 1/n², … đều tiến về 0.' },
          { action: 'Cho mọi 1/nᵏ về 0 rồi đọc kết quả.', why: 'Còn lại là tỉ số hai hệ số bậc cao nhất.' },
        ],
        trick:
          'So bậc là xong: tử bậc cao hơn → giới hạn vô cùng; mẫu bậc cao hơn → giới hạn 0; bằng bậc → tỉ số hai hệ số đầu. Ba trường hợp này trả lời được hầu hết câu trắc nghiệm mà không cần biến đổi.',
        pitfall: 'Với qⁿ, quên xét |q| > 1 (dãy phân kỳ) hay q = −1 (dãy không có giới hạn).',
      },
    ],
    secrets: [
      {
        title: 'Viết ra ba số hạng đầu',
        body: 'Khi đề cho hệ thức truy hồi rối rắm, đừng biến đổi ngay — hãy tính u₁, u₂, u₃ bằng số. Quy luật thường lộ ra ngay ở số hạng thứ ba, và bạn tiết kiệm được cả một trang biến đổi.',
        when: 'Đề cho công thức truy hồi thay vì công thức tổng quát.',
      },
      {
        title: 'Chỉ số là kẻ thù',
        body: 'Gần như mọi lỗi trong chuyên đề dãy số là lỗi lệch một chỉ số. Thói quen duy nhất cần rèn: mỗi khi viết xong một công thức tổng quát, thay n = 1 để kiểm tra trước khi dùng.',
        when: 'Mọi lần lập công thức số hạng tổng quát hoặc công thức tổng.',
      },
      {
        title: 'Đọc kỹ "sau n năm" hay "vào năm thứ n"',
        body: 'Hai cách nói này lệch nhau đúng một kỳ. "Sau 5 năm" là A₀(1+r)⁵; "vào năm thứ 5" thường là A₀(1+r)⁴. Đề thi khai thác đúng chỗ này.',
        when: 'Bài toán tăng trưởng có mốc thời gian mô tả bằng lời.',
      },
    ],
  },
  {
    topicId: 'quantitative.geometry',
    bigQuestion: 'Hình này có quan hệ gì với hình kia — bằng nhau, đồng dạng, hay chỉ chung một đại lượng?',
    patterns: [
      {
        id: 'geo.similar',
        name: 'Tam giác đồng dạng — tỉ số',
        tell: [
          'Có hai đường thẳng song song cắt hai cạnh của một tam giác',
          'Đề cho tỉ số các đoạn thẳng và hỏi tỉ số đoạn khác',
          'Xuất hiện đường trung bình, đường phân giác, hoặc điểm chia cạnh theo tỉ lệ',
        ],
        method:
          'Tìm cặp tam giác đồng dạng rồi lập tỉ số các cạnh tương ứng. Nhớ: tỉ số diện tích bằng BÌNH PHƯƠNG tỉ số đồng dạng, tỉ số thể tích bằng LẬP PHƯƠNG. Đây là chỗ đề thi cài bẫy nhiều nhất.',
        steps: [
          { action: 'Chỉ ra hai tam giác đồng dạng và nêu rõ trường hợp (g-g, c-g-c, c-c-c).', why: 'Viết sai thứ tự đỉnh là viết sai toàn bộ tỉ số ở bước sau.' },
          { action: 'Viết tỉ số các cạnh TƯƠNG ỨNG theo đúng thứ tự đỉnh.', why: 'Thứ tự đỉnh quyết định cạnh nào ghép với cạnh nào.' },
          { action: 'Nếu hỏi diện tích: bình phương tỉ số. Nếu hỏi thể tích: lập phương.', why: 'Diện tích là đại lượng hai chiều, thể tích ba chiều.' },
          { action: 'Đối chiếu kết quả với hình vẽ xem có hợp lý về độ lớn không.', why: 'Một tỉ số lớn hơn 1 khi hình nhỏ hơn là dấu hiệu đã lật ngược phân số.' },
        ],
        trick:
          'Tỉ số đồng dạng k thì diện tích gấp k², thể tích gấp k³. Đề rất hay cho k = 1/2 rồi hỏi diện tích: đáp án là 1/4 chứ không phải 1/2 — và 1/2 luôn có mặt trong bốn phương án.',
        pitfall: 'Viết tỉ số theo thứ tự đỉnh sai, dẫn tới ghép nhầm cạnh dài với cạnh ngắn.',
      },
      {
        id: 'geo.solid',
        name: 'Thể tích và diện tích khối',
        tell: [
          'Đề nói về khối chóp, lăng trụ, nón, trụ, cầu',
          'Hỏi thể tích, diện tích xung quanh, hoặc tỉ số thể tích',
        ],
        method:
          'Xác định rõ đâu là đáy và đâu là chiều cao trước khi thay công thức. Với khối chóp, chiều cao là khoảng cách từ đỉnh tới MẶT PHẲNG đáy, không phải độ dài cạnh bên.',
        steps: [
          { action: 'Vẽ lại hình và đánh dấu đáy, chiều cao.', why: 'Phần lớn lỗi của dạng này là lấy nhầm cạnh bên làm chiều cao.' },
          { action: 'Tính diện tích đáy bằng công thức hình phẳng phù hợp.', why: 'Bài không gian luôn quy về một bài hình phẳng ở đáy.' },
          { action: 'Tìm chiều cao, thường qua tam giác vuông chứa nó.', why: 'Chiều cao hiếm khi được cho trực tiếp; nó nằm trong một tam giác vuông cần Pytago.' },
          { action: 'Thay vào công thức, chú ý hệ số 1/3 của khối chóp và khối nón.', why: 'Quên 1/3 là lỗi cho ra đáp án gấp ba — và phương án gấp ba luôn có sẵn.' },
        ],
        trick:
          'Tỉ số thể tích hai khối chóp chung đỉnh và đáy nằm trên cùng một mặt phẳng bằng đúng tỉ số diện tích hai đáy. Dùng được để bỏ hẳn bước tính chiều cao.',
        pitfall: 'Nhầm đường sinh của hình nón với chiều cao. Chúng liên hệ bởi l² = h² + r².',
      },
      {
        id: 'geo.circle',
        name: 'Đường tròn — góc và tiếp tuyến',
        tell: [
          'Có đường tròn, dây cung, tiếp tuyến, hoặc tứ giác nội tiếp',
          'Đề hỏi số đo góc, hoặc hỏi chứng minh một tứ giác nội tiếp được',
        ],
        method:
          'Quy mọi góc về cung bị chắn. Góc ở tâm bằng số đo cung; góc nội tiếp bằng nửa cung; góc tạo bởi tiếp tuyến và dây cũng bằng nửa cung. Một khi đã quy về cung thì mọi góc so sánh được với nhau.',
        steps: [
          { action: 'Đánh dấu tất cả các cung bị chắn trên hình.', why: 'Cung là đơn vị chung để so mọi loại góc.' },
          { action: 'Phân loại từng góc: ở tâm, nội tiếp, hay tạo bởi tiếp tuyến và dây.', why: 'Mỗi loại có hệ số riêng với cung.' },
          { action: 'Dùng tổng các cung bằng 360° để lập phương trình.', why: 'Đây thường là phương trình duy nhất cần thiết.' },
          { action: 'Nếu có tứ giác nội tiếp: dùng ngay tổng hai góc đối bằng 180°.', why: 'Rút ngắn được rất nhiều so với đi qua cung.' },
        ],
        trick:
          'Thấy tứ giác nội tiếp là nghĩ ngay "hai góc đối bù nhau". Thấy tiếp tuyến là nghĩ ngay "vuông góc với bán kính tại tiếp điểm". Hai phản xạ này giải được phần lớn câu về đường tròn.',
        pitfall: 'Áp dụng góc nội tiếp cho góc có đỉnh không nằm trên đường tròn.',
      },
    ],
    secrets: [
      {
        title: 'Vẽ lại hình, đừng nhìn hình đề',
        body: 'Hình trong đề thường vẽ để gây nhiễu — một tam giác trông như cân mà đề không nói cân. Vẽ lại theo đúng dữ kiện và cố tình vẽ "xấu" (không cân, không đều) sẽ ngăn bạn giả định những thứ đề chưa cho.',
        when: 'Mọi câu hình học có hình vẽ kèm theo.',
      },
      {
        title: 'Đặt ẩn cho cạnh chưa biết',
        body: 'Khi bí, đặt cạnh chưa biết bằng x và viết mọi đại lượng khác theo x. Bài hình học thường sập thành một phương trình bậc nhất hoặc bậc hai ngay sau đó.',
        when: 'Không nhìn ra quan hệ trực tiếp giữa dữ kiện và câu hỏi.',
      },
      {
        title: 'Nhớ ba bộ ba Pytago',
        body: '(3,4,5), (5,12,13), (8,15,17) và các bội của chúng xuất hiện trong phần lớn đề. Nhận ra ngay thì tiết kiệm được một phép khai căn và tránh sai số.',
        when: 'Gặp tam giác vuông có hai cạnh là số nguyên đẹp.',
      },
    ],
  },
  {
    topicId: 'quantitative.coordinate',
    bigQuestion: 'Điều kiện hình học này viết thành phương trình đại số nào?',
    patterns: [
      {
        id: 'coo.line',
        name: 'Viết phương trình đường thẳng',
        tell: [
          'Đề cho một điểm và một điều kiện về phương (song song, vuông góc, hệ số góc)',
          'Hoặc cho hai điểm mà đường thẳng đi qua',
          'Câu hỏi bắt đầu bằng "Viết phương trình đường thẳng…"',
        ],
        method:
          'Mọi đường thẳng chỉ cần hai thứ: một điểm nó đi qua và một vectơ chỉ phương (hoặc pháp tuyến). Đọc đề để nhặt đúng hai thứ đó rồi thay vào dạng chuẩn. Lý do phải nghĩ theo cặp "điểm + phương": nó biến mọi biến thể của đề về cùng một quy trình.',
        steps: [
          { action: 'Nhặt điểm đi qua từ đề.', why: 'Không có điểm thì có vô số đường cùng phương.' },
          { action: 'Nhặt phương: song song thì lấy cùng vectơ chỉ phương; vuông góc thì đổi vai trò và đổi dấu một thành phần.', why: 'Từ (a; b) sang vectơ vuông góc là (−b; a) — một phép biến đổi máy móc, không cần suy nghĩ.' },
          { action: 'Thay vào phương trình tổng quát a(x − x₀) + b(y − y₀) = 0.', why: 'Dạng này dùng được cho cả đường thẳng đứng, khác với dạng y = kx + m.' },
          { action: 'Rút gọn và kiểm tra bằng cách thay lại tọa độ điểm đã cho.', why: 'Phép thử 5 giây bắt được mọi lỗi dấu.' },
        ],
        trick:
          'Đường thẳng qua hai điểm A, B: lấy vectơ AB làm chỉ phương. Đường thẳng vuông góc với ax + by + c = 0 có vectơ chỉ phương (a; b) — chính là pháp tuyến của đường ban đầu.',
        pitfall: 'Dùng y = kx + m cho đường thẳng đứng x = 3. Dạng này không biểu diễn được đường thẳng đứng.',
      },
      {
        id: 'coo.circle',
        name: 'Đường tròn và vị trí tương đối',
        tell: [
          'Phương trình có x² + y² với hệ số bằng nhau',
          'Đề hỏi tâm, bán kính, hoặc đường thẳng cắt/tiếp xúc/không cắt đường tròn',
        ],
        method:
          'Đưa về dạng chuẩn (x − a)² + (y − b)² = R² bằng cách hoàn thành bình phương. Mọi câu hỏi về vị trí tương đối đều quy về so sánh khoảng cách từ tâm tới đường thẳng với bán kính.',
        steps: [
          { action: 'Hoàn thành bình phương để tìm tâm I(a; b) và R.', why: 'Không có tâm và bán kính thì không so sánh được gì.' },
          { action: 'Kiểm tra R² > 0.', why: 'Phương trình dạng đường tròn vẫn có thể vô nghiệm hoặc chỉ là một điểm — đề rất hay hỏi chỗ này.' },
          { action: 'Tính d(I, Δ) bằng công thức khoảng cách từ điểm tới đường thẳng.', why: 'Đây là đại lượng duy nhất cần để kết luận.' },
          { action: 'So sánh: d < R cắt tại hai điểm, d = R tiếp xúc, d > R không cắt.', why: 'Ba trường hợp bao trọn mọi khả năng.' },
        ],
        trick:
          'Từ x² + y² − 2ax − 2by + c = 0, tâm là (a; b) — lấy nửa hệ số bậc nhất và ĐỔI DẤU — còn R = √(a² + b² − c). Nhớ dạng này thì không cần hoàn thành bình phương.',
        pitfall: 'Quên đổi dấu khi đọc tâm từ dạng khai triển.',
      },
      {
        id: 'coo.space',
        name: 'Hình học tọa độ trong không gian',
        tell: [
          'Có tọa độ ba thành phần (x; y; z)',
          'Đề nói về mặt phẳng, đường thẳng trong không gian, hoặc mặt cầu',
        ],
        method:
          'Tích có hướng là công cụ trung tâm: nó cho ngay một vectơ vuông góc với hai vectơ đã có. Phần lớn bài mặt phẳng đều là "tìm pháp tuyến rồi thay vào".',
        steps: [
          { action: 'Chuyển mọi dữ kiện thành vectơ.', why: 'Hình học không gian bằng tọa độ là đại số vectơ, không phải hình học trực quan.' },
          { action: 'Tìm pháp tuyến: nếu có hai vectơ nằm trong mặt phẳng thì lấy tích có hướng của chúng.', why: 'Tích có hướng luôn vuông góc với cả hai — đúng định nghĩa pháp tuyến.' },
          { action: 'Viết phương trình mặt phẳng qua một điểm với pháp tuyến vừa tìm.', why: 'Điểm cộng pháp tuyến xác định duy nhất một mặt phẳng.' },
          { action: 'Kiểm tra bằng cách thay tọa độ các điểm đã cho.', why: 'Mọi điểm thuộc mặt phẳng phải thỏa mãn phương trình.' },
        ],
        trick:
          'Khoảng cách từ điểm tới mặt phẳng: |ax₀+by₀+cz₀+d| / √(a²+b²+c²). Đây là công thức được dùng nhiều nhất trong toàn bộ hình tọa độ không gian — thuộc lòng nó tiết kiệm rất nhiều thời gian.',
        pitfall: 'Quên chuẩn hóa mẫu số khi tính khoảng cách, hoặc quên dấu giá trị tuyệt đối ở tử.',
      },
    ],
    secrets: [
      {
        title: 'Dịch đề sang vectơ ngay dòng đầu',
        body: '"Vuông góc" là tích vô hướng bằng 0. "Song song" là hai vectơ tỉ lệ. "Thẳng hàng" là ba điểm cho hai vectơ tỉ lệ. Dịch xong thì bài hình học biến thành một hệ phương trình, và bạn không còn phải tưởng tượng hình nữa.',
        when: 'Ngay khi đọc xong đề tọa độ.',
      },
      {
        title: 'Thay lại để kiểm tra',
        body: 'Mọi kết quả trong hình tọa độ đều kiểm tra được bằng cách thay số. Viết xong phương trình thì thay điểm đã cho; tìm xong giao điểm thì thay vào cả hai phương trình. Đây là chuyên đề duy nhất mà bạn có thể tự chấm bài của mình trong 10 giây.',
        when: 'Trước khi tô đáp án cho mọi câu tọa độ.',
      },
      {
        title: 'Vẽ phác trên trục',
        body: 'Với bài phẳng, một hình phác thô trên giấy nháp cho biết ngay đáp án nằm ở góc phần tư nào, dấu ra sao. Nó không giải bài hộ bạn nhưng loại được phương án sai dấu.',
        when: 'Bài tọa độ phẳng có yếu tố vị trí.',
      },
    ],
  },
  {
    topicId: 'quantitative.calculus',
    bigQuestion: 'Hàm số này tăng hay giảm ở đâu, và giá trị lớn nhất nhỏ nhất của nó nằm chỗ nào?',
    patterns: [
      {
        id: 'cal.mono',
        name: 'Xét tính đơn điệu và cực trị',
        tell: [
          'Đề hỏi khoảng đồng biến, nghịch biến, hoặc số điểm cực trị',
          'Cho hàm số hoặc cho bảng biến thiên',
          'Có tham số m và hỏi "để hàm số đồng biến trên…"',
        ],
        method:
          'Dấu của đạo hàm quyết định tất cả: y′ > 0 thì hàm tăng, y′ < 0 thì hàm giảm, và điểm cực trị là nơi y′ ĐỔI DẤU. Nhấn mạnh "đổi dấu": y′ = 0 chưa đủ để có cực trị.',
        steps: [
          { action: 'Tính y′ và tìm tập xác định.', why: 'Tập xác định giới hạn phạm vi xét; bỏ qua nó cho ra khoảng đơn điệu sai.' },
          { action: 'Giải y′ = 0 và tìm các điểm y′ không xác định.', why: 'Cả hai loại điểm này đều chia trục số thành các khoảng.' },
          { action: 'Lập bảng xét dấu y′.', why: 'Bảng là cách duy nhất thấy được y′ có đổi dấu hay không.' },
          { action: 'Đọc kết luận từ bảng, chú ý cực trị chỉ có tại nơi y′ đổi dấu.', why: 'y = x³ có y′(0) = 0 nhưng không có cực trị — đây là câu hỏi kinh điển.' },
        ],
        trick:
          'Hàm bậc ba y = ax³ + bx² + cx + d có hai cực trị ⟺ y′ = 0 có hai nghiệm phân biệt ⟺ Δ_{y′} > 0. Không có cực trị ⟺ Δ_{y′} ≤ 0. Hai kết luận này trả lời trực tiếp rất nhiều câu về tham số.',
        pitfall: 'Kết luận có cực trị chỉ vì y′ = 0 có nghiệm, mà không kiểm tra y′ có đổi dấu qua nghiệm đó không.',
      },
      {
        id: 'cal.extreme',
        name: 'Giá trị lớn nhất — nhỏ nhất trên đoạn',
        tell: [
          'Đề nói rõ "trên đoạn [a; b]"',
          'Hỏi max, min, hoặc bài toán tối ưu thực tế (làm hộp, rào vườn, chi phí)',
        ],
        method:
          'Trên một đoạn kín, giá trị lớn nhất và nhỏ nhất chỉ có thể nằm ở điểm tới hạn hoặc ở hai đầu mút. Vì vậy chỉ cần so sánh một danh sách hữu hạn giá trị — không cần vẽ đồ thị.',
        steps: [
          { action: 'Tính y′ và giải y′ = 0, GIỮ LẠI chỉ các nghiệm thuộc [a; b].', why: 'Nghiệm nằm ngoài đoạn không liên quan; giữ lại chúng là nguồn sai phổ biến.' },
          { action: 'Tính giá trị hàm tại các nghiệm đó và tại a, b.', why: 'Đây là toàn bộ tập ứng viên.' },
          { action: 'So sánh danh sách, chọn số lớn nhất và nhỏ nhất.', why: 'Không cần bảng biến thiên khi đoạn đã đóng.' },
          { action: 'Với bài thực tế: kiểm tra nghiệm có nghĩa vật lý (độ dài dương, số lượng nguyên).', why: 'Nghiệm toán học đẹp vẫn có thể vô nghĩa trong bối cảnh đề.' },
        ],
        trick:
          'Với bài tối ưu thực tế, hãy lập hàm theo MỘT biến trước khi đạo hàm; điều kiện ràng buộc luôn cho phép khử bớt một biến. Bỏ qua bước này là phải xử lý hai biến và bế tắc.',
        pitfall: 'Quên tính giá trị tại hai đầu mút. Cực trị địa phương không nhất thiết là max/min trên đoạn.',
      },
      {
        id: 'cal.integral',
        name: 'Tích phân và ứng dụng diện tích',
        tell: [
          'Có ký hiệu tích phân kèm cận trên và cận dưới',
          'Hỏi diện tích hình phẳng giới hạn bởi các đường',
          'Hỏi thể tích khối tròn xoay',
        ],
        method:
          'Diện tích là tích phân của |hàm trên − hàm dưới|. Chữ "trên − dưới" quan trọng hơn công thức: phải xác định đường nào nằm trên trước khi lấy tích phân, nếu không sẽ ra diện tích âm.',
        steps: [
          { action: 'Tìm cận bằng cách giải phương trình hoành độ giao điểm.', why: 'Cận chính là nơi hai đường gặp nhau.' },
          { action: 'Xác định trên mỗi khoảng, đường nào nằm trên.', why: 'Nếu hai đường đổi vị trí giữa chừng thì phải tách thành nhiều tích phân.' },
          { action: 'Lấy tích phân hiệu (trên − dưới) trên từng khoảng.', why: 'Đảm bảo mọi phần đều dương.' },
          { action: 'Cộng lại và kiểm tra kết quả dương.', why: 'Diện tích âm là dấu hiệu đã đảo thứ tự trên/dưới.' },
        ],
        trick:
          'Thay vì xét dấu, có thể lấy ∫|f − g|dx bằng cách tính từng đoạn rồi lấy trị tuyệt đối từng phần. Nhưng đừng lấy trị tuyệt đối của TỔNG — các phần dương và âm sẽ triệt tiêu nhau.',
        pitfall: 'Lấy tích phân một mạch qua điểm giao khiến hai phần diện tích trừ nhau, cho kết quả nhỏ hơn thực tế.',
      },
    ],
    secrets: [
      {
        title: 'Bảng biến thiên trả lời được nhiều câu hơn bạn nghĩ',
        body: 'Số nghiệm phương trình f(x) = m, số điểm cực trị, khoảng đơn điệu, giá trị lớn nhất — tất cả đều đọc được từ MỘT bảng biến thiên. Nếu đề cho sẵn bảng, đừng đi tìm công thức hàm số.',
        when: 'Đề cho bảng biến thiên hoặc đồ thị thay vì công thức.',
      },
      {
        title: 'Số nghiệm là số giao điểm',
        body: 'Câu hỏi "phương trình f(x) = m có bao nhiêu nghiệm" chính là "đường thẳng nằm ngang y = m cắt đồ thị ở mấy điểm". Chuyển câu hỏi đại số thành câu hỏi hình học rồi đọc từ bảng biến thiên là xong.',
        when: 'Mọi câu biện luận số nghiệm theo tham số.',
      },
      {
        title: 'Kiểm tra bằng một điểm',
        body: 'Sau khi lập bảng xét dấu y′, thay một giá trị cụ thể ở mỗi khoảng vào y′ để xác nhận dấu. Mất 15 giây và loại bỏ toàn bộ rủi ro sai dấu — nguồn lỗi lớn nhất của chuyên đề này.',
        when: 'Mọi lần lập bảng xét dấu.',
      },
    ],
  },
  {
    topicId: 'quantitative.exponential',
    bigQuestion: 'Ẩn số đang nằm trên số mũ hay dưới dấu log, và làm sao kéo nó xuống?',
    patterns: [
      {
        id: 'exp.samebase',
        name: 'Đưa về cùng cơ số',
        tell: [
          'Hai vế đều là lũy thừa, và các cơ số là lũy thừa của cùng một số (2 và 4 và 8; 3 và 9 và 27)',
          'Phương trình mũ đơn giản, không có tổng của hai lũy thừa',
        ],
        method:
          'Viết mọi cơ số về cùng một cơ số gốc rồi đồng nhất số mũ. Lý do làm được: hàm mũ đơn điệu, nên aᵘ = aᵛ ⟺ u = v với a > 0, a ≠ 1 — một tương đương chứ không phải suy ra một chiều.',
        steps: [
          { action: 'Phân tích mọi cơ số thành lũy thừa của một số nguyên tố.', why: '4 = 2², 8 = 2³ — sau bước này hai vế cùng cơ số.' },
          { action: 'Dùng (aᵐ)ⁿ = aᵐⁿ để gom số mũ.', why: 'Đưa mỗi vế về đúng một lũy thừa.' },
          { action: 'Cho hai số mũ bằng nhau.', why: 'Hàm mũ đơn ánh nên bước này là tương đương, không sinh nghiệm lạ.' },
          { action: 'Giải phương trình còn lại theo x.', why: 'Thường chỉ còn bậc nhất hoặc bậc hai.' },
        ],
        trick:
          'Nếu cơ số không cùng gốc (ví dụ 2 và 3), thử chia hai vế cho một lũy thừa để tạo ra (2/3)ˣ — đưa về một ẩn duy nhất.',
        pitfall: 'Áp dụng aᵘ = aᵛ ⟹ u = v khi a = 1. Với a = 1 thì mọi số mũ đều cho kết quả 1, phương trình có vô số nghiệm.',
      },
      {
        id: 'exp.substitute',
        name: 'Đặt ẩn phụ',
        tell: [
          'Xuất hiện aˣ và a²ˣ (hoặc a²ˣ viết dưới dạng (aˣ)²)',
          'Có 4ˣ và 2ˣ cùng lúc, hoặc 9ˣ và 3ˣ',
          'Với logarit: có log²x và log x',
        ],
        method:
          'Đặt t = aˣ (hoặc t = log x) để đưa phương trình về bậc hai theo t. Điều kiện t > 0 với ẩn phụ mũ là bắt buộc và là chỗ đề cài bẫy nhiều nhất.',
        steps: [
          { action: 'Nhận ra a²ˣ = (aˣ)² rồi đặt t = aˣ, kèm điều kiện t > 0.', why: 'Hàm mũ luôn dương — điều kiện này loại nghiệm âm ở bước cuối.' },
          { action: 'Viết lại phương trình theo t.', why: 'Thường thành bậc hai quen thuộc.' },
          { action: 'Giải, LOẠI nghiệm t ≤ 0.', why: 'Nghiệm âm của t không cho ra x nào cả; giữ lại là thừa nghiệm.' },
          { action: 'Quay về x bằng cách giải aˣ = t.', why: 'Đề hỏi x chứ không hỏi t; dừng ở ẩn phụ là bỏ dở nửa bài và mất trọn điểm.' },
        ],
        trick:
          'Với dạng có 6ˣ = 2ˣ·3ˣ, chia cả hai vế cho 4ˣ hoặc 9ˣ để tạo ra một ẩn phụ duy nhất (3/2)ˣ. Đây là mẹo mở khóa cả một nhóm câu khó.',
        pitfall: 'Quên điều kiện t > 0 và nhận cả nghiệm âm, rồi báo hai nghiệm x trong khi thực tế chỉ có một.',
      },
      {
        id: 'exp.log',
        name: 'Phương trình và bất phương trình logarit',
        tell: [
          'Có ký hiệu log hoặc ln chứa biến',
          'Đề hỏi tập nghiệm hoặc số nghiệm nguyên',
        ],
        method:
          'Điều kiện xác định TRƯỚC, biến đổi SAU. Với bất phương trình logarit, chiều bất đẳng thức phụ thuộc cơ số: cơ số > 1 giữ nguyên chiều, cơ số trong (0; 1) ĐẢO chiều. Đây là quy tắc bị quên nhiều nhất trong toàn chuyên đề.',
        steps: [
          { action: 'Đặt điều kiện: mọi biểu thức dưới log phải dương, cơ số dương và khác 1.', why: 'Tập xác định thu hẹp trước sẽ tự loại nghiệm ngoại lai.' },
          { action: 'Gộp các log cùng cơ số bằng công thức tổng/hiệu.', why: 'Đưa về dạng log A = log B hoặc log A = số.' },
          { action: 'Bỏ log, nhớ đảo chiều nếu cơ số nhỏ hơn 1 và đang xử lý bất phương trình.', why: 'Hàm log cơ số nhỏ hơn 1 là hàm nghịch biến.' },
          { action: 'Giao nghiệm với điều kiện xác định.', why: 'Bước bắt buộc; bỏ qua là nguồn sai của gần như mọi câu logarit.' },
        ],
        trick:
          'Đề hỏi "số nghiệm nguyên" thì sau khi ra khoảng nghiệm, đếm số nguyên trong khoảng đó — đừng liệt kê. Số nguyên trong (a; b) là ⌊b⌋ − ⌈a⌉ + 1 nếu hai đầu không nguyên.',
        pitfall: 'Giữ nguyên chiều bất đẳng thức khi cơ số nằm giữa 0 và 1.',
      },
    ],
    secrets: [
      {
        title: 'Điều kiện viết trước, luôn luôn',
        body: 'Trong chuyên đề mũ – logarit, điều kiện xác định không phải bước phụ mà là một nửa lời giải. Thói quen: dòng đầu tiên của mọi bài log là dòng điều kiện, trước cả khi đọc kỹ vế phải.',
        when: 'Mọi câu có dấu log hoặc căn bậc chẵn.',
      },
      {
        title: 'Cơ số nhỏ hơn 1 là bẫy có chủ ý',
        body: 'Khi thấy cơ số 0,5 hay 1/3, hãy dừng lại. Đề dùng cơ số đó chính vì muốn bắt lỗi không đảo chiều. Không có lý do nào khác để chọn một cơ số xấu như vậy.',
        when: 'Bất phương trình mũ hoặc logarit có cơ số giữa 0 và 1.',
      },
      {
        title: 'Ba công thức đủ cho phần lớn đề',
        body: 'log(ab) = log a + log b; log(a/b) = log a − log b; log aⁿ = n·log a. Cộng thêm công thức đổi cơ số log_a b = log b / log a là đủ cho gần như mọi câu trong đề HSA.',
        when: 'Khi gặp biểu thức log rối và không biết bắt đầu từ đâu.',
      },
    ],
  },
  {
    topicId: 'quantitative.combinatorics',
    bigQuestion: 'Thứ tự có quan trọng không, và các phần tử có được lặp lại không?',
    patterns: [
      {
        id: 'com.choose',
        name: 'Phân biệt chỉnh hợp và tổ hợp',
        tell: [
          'Đề hỏi "có bao nhiêu cách"',
          'Có từ "chọn ra", "lập thành", "xếp"',
          'Cho một tập hợp và một số lượng cần lấy',
        ],
        method:
          'Hỏi đúng một câu: đổi chỗ hai phần tử đã chọn thì có ra kết quả khác không? Có → chỉnh hợp (thứ tự quan trọng). Không → tổ hợp. Đây là toàn bộ chuyên đề gói trong một câu hỏi, và trả lời sai câu này thì mọi tính toán sau đều vô nghĩa.',
        steps: [
          { action: 'Đọc đề và tự hỏi: hoán đổi hai phần tử có tạo ra phương án khác không?', why: 'Đây là ranh giới duy nhất giữa hai công thức.' },
          { action: 'Xác định có lặp hay không: một phần tử được chọn nhiều lần chứ?', why: 'Có lặp thì dùng quy tắc nhân, không dùng C hay A.' },
          { action: 'Chọn công thức: Cₙᵏ nếu không thứ tự, Aₙᵏ nếu có thứ tự, nᵏ nếu có lặp và có thứ tự.', why: 'Ba trường hợp bao trọn phần lớn đề.' },
          { action: 'Nếu đề có điều kiện ràng buộc: xử lý ràng buộc TRƯỚC rồi mới đếm phần còn lại.', why: 'Đếm trước rồi trừ dễ sót trường hợp hơn nhiều.' },
        ],
        trick:
          '"Chọn ban cán sự gồm lớp trưởng và lớp phó" là có thứ tự (hai vai trò khác nhau). "Chọn 2 bạn đi thi" là không thứ tự. Câu chữ của đề luôn tiết lộ điều này — hãy tìm xem các vị trí có phân biệt không.',
        pitfall: 'Dùng tổ hợp cho bài xếp chỗ ngồi. Xếp chỗ luôn có thứ tự.',
      },
      {
        id: 'com.complement',
        name: 'Đếm phần bù',
        tell: [
          'Đề có từ "ít nhất một", "không quá", "có ít nhất hai"',
          'Đếm trực tiếp phải chia rất nhiều trường hợp',
        ],
        method:
          'Đếm cái ngược lại rồi lấy tổng trừ đi. Lý do: "ít nhất một" phải chia thành đúng một, đúng hai, đúng ba… trong khi phần bù của nó — "không có cái nào" — chỉ là một trường hợp duy nhất.',
        steps: [
          { action: 'Nhận ra từ khóa "ít nhất".', why: 'Đây là tín hiệu gần như chắc chắn cho phần bù.' },
          { action: 'Tính tổng số cách không ràng buộc.', why: 'Đây là mẫu số hoặc tổng thể để trừ.' },
          { action: 'Tính số cách của biến cố đối (thường là "không có cái nào").', why: 'Chỉ một trường hợp, tính rất nhanh.' },
          { action: 'Lấy tổng trừ đi số cách của biến cố đối.', why: 'Hiệu chính là số cách thỏa điều kiện "ít nhất một" mà không phải chia trường hợp.' },
        ],
        trick:
          '"Ít nhất một" gần như luôn nên dùng phần bù. Nếu bạn thấy mình đang chia hơn ba trường hợp, hãy dừng lại và thử phần bù.',
        pitfall: 'Tính phần bù của "ít nhất hai" thành "không có cái nào" — thực ra phần bù là "không có cái nào HOẶC đúng một cái".',
      },
      {
        id: 'com.prob',
        name: 'Xác suất cổ điển',
        tell: [
          'Đề hỏi xác suất của một biến cố',
          'Không gian mẫu hữu hạn và các kết quả đồng khả năng (rút thẻ, tung xúc xắc, chọn ngẫu nhiên)',
        ],
        method:
          'Xác suất = số kết quả thuận lợi chia số kết quả có thể. Điều kiện sống còn: hai con số phải đếm theo CÙNG MỘT cách — cùng có thứ tự hoặc cùng không thứ tự. Trộn lẫn hai cách đếm là lỗi nghiêm trọng và rất khó phát hiện vì kết quả vẫn ra một số đẹp.',
        steps: [
          { action: 'Mô tả rõ không gian mẫu và đếm nó.', why: 'Đây là mẫu số; sai mẫu số thì mọi thứ sai.' },
          { action: 'Đếm số kết quả thuận lợi theo ĐÚNG cách đã dùng cho mẫu số.', why: 'Nhất quán là điều kiện để phép chia có nghĩa.' },
          { action: 'Rút gọn phân số.', why: 'Đáp án trắc nghiệm thường ở dạng tối giản.' },
          { action: 'Kiểm tra kết quả nằm trong [0; 1].', why: 'Một phép kiểm tra 2 giây bắt được lỗi đảo tử mẫu.' },
        ],
        trick:
          'Với các biến cố độc lập, xác suất của "cả hai cùng xảy ra" là tích. Với biến cố xung khắc, xác suất "một trong hai" là tổng. Xác định đúng hai từ "độc lập" và "xung khắc" là xong nửa bài.',
        pitfall: 'Đếm tử số có thứ tự trong khi mẫu số không thứ tự (hoặc ngược lại).',
      },
    ],
    secrets: [
      {
        title: 'Đếm thử với số nhỏ',
        body: 'Khi phân vân giữa hai công thức, hãy thay bài toán bằng phiên bản nhỏ (chọn 2 trong 3) rồi liệt kê tay. Kết quả liệt kê sẽ cho biết công thức nào đúng. Mất 30 giây và chắc chắn hơn mọi lập luận.',
        when: 'Không chắc thứ tự có quan trọng hay không.',
      },
      {
        title: 'Ràng buộc xử lý trước',
        body: 'Nếu đề nói "chữ số đầu khác 0" hay "nam đứng đầu hàng", hãy đặt phần tử bị ràng buộc vào chỗ của nó TRƯỚC rồi mới đếm phần còn lại tự do. Đếm hết rồi trừ đi luôn dài hơn và dễ sót.',
        when: 'Bài đếm có điều kiện về vị trí hoặc thành phần.',
      },
      {
        title: 'Cẩn thận với "hoặc"',
        body: 'Trong tiếng Việt, "hoặc" thường là hoặc bao hàm (có thể cả hai). Đếm A + B mà quên trừ phần chung là lỗi cổ điển. Luôn hỏi: hai trường hợp này có giao nhau không?',
        when: 'Đề mô tả biến cố bằng từ "hoặc".',
      },
    ],
  },
  {
    topicId: 'quantitative.statistics',
    bigQuestion: 'Bảng số liệu này nói gì mà mắt thường không thấy, và nó KHÔNG nói gì?',
    patterns: [
      {
        id: 'sta.center',
        name: 'Số đo xu thế trung tâm',
        tell: [
          'Đề cho một dãy số liệu hoặc bảng tần số',
          'Hỏi trung bình, trung vị, mốt',
        ],
        method:
          'Ba số đo trả lời ba câu hỏi khác nhau: trung bình là "chia đều thì mỗi phần bao nhiêu", trung vị là "giá trị đứng giữa", mốt là "giá trị xuất hiện nhiều nhất". Đề thường hỏi cái nào PHÙ HỢP hơn, và câu trả lời phụ thuộc vào việc dữ liệu có giá trị bất thường hay không.',
        steps: [
          { action: 'Sắp xếp dữ liệu tăng dần.', why: 'Bắt buộc cho trung vị; và cũng để lộ ra giá trị bất thường.' },
          { action: 'Trung bình = tổng chia số phần tử; với bảng tần số thì nhân giá trị với tần số trước.', why: 'Quên nhân tần số là lỗi số một khi đọc bảng.' },
          { action: 'Trung vị: phần tử giữa nếu n lẻ, trung bình hai phần tử giữa nếu n chẵn.', why: 'Hai công thức khác nhau, đề hay cho n chẵn để bắt lỗi.' },
          { action: 'So sánh trung bình với trung vị để nhận diện độ lệch.', why: 'Trung bình lớn hơn hẳn trung vị nghĩa là có vài giá trị rất lớn kéo lên.' },
        ],
        trick:
          'Khi dữ liệu có một giá trị cực đoan (thu nhập của một người rất giàu trong nhóm), TRUNG VỊ mới là số đo đại diện đúng. Câu hỏi "nên dùng số đo nào" gần như luôn có đáp án là trung vị khi đề cố tình cài một giá trị lạc loài.',
        pitfall: 'Tính trung vị mà quên sắp xếp dữ liệu trước.',
      },
      {
        id: 'sta.spread',
        name: 'Độ phân tán',
        tell: [
          'Đề hỏi phương sai, độ lệch chuẩn, khoảng biến thiên',
          'So sánh hai nhóm có cùng trung bình',
        ],
        method:
          'Trung bình cho biết nhóm nằm ở đâu; độ phân tán cho biết nhóm có đồng đều hay không. Hai nhóm cùng trung bình vẫn có thể khác nhau hoàn toàn — và đề thi thích khai thác đúng điểm này.',
        steps: [
          { action: 'Tính trung bình trước.', why: 'Mọi số đo phân tán đều đo khoảng cách tới trung bình.' },
          { action: 'Tính phương sai: trung bình của bình phương các độ lệch.', why: 'Bình phương để độ lệch âm và dương không triệt tiêu nhau.' },
          { action: 'Độ lệch chuẩn là căn bậc hai của phương sai.', why: 'Đưa về cùng đơn vị với dữ liệu gốc để so sánh được.' },
          { action: 'Kết luận: độ lệch chuẩn nhỏ hơn nghĩa là đồng đều hơn.', why: 'Đây là câu hỏi thực chất của mọi bài so sánh hai nhóm.' },
        ],
        trick:
          'Nếu chỉ cần SO SÁNH hai nhóm chứ không cần con số chính xác, hãy nhìn khoảng biến thiên (max − min) trước. Rất nhiều câu trắc nghiệm giải xong trong 10 giây bằng cách này.',
        pitfall: 'Kết luận nhóm có trung bình cao hơn là "tốt hơn" mà không nhìn độ phân tán.',
      },
      {
        id: 'sta.read',
        name: 'Đọc biểu đồ và bảng',
        tell: [
          'Đề đính kèm biểu đồ cột, tròn, đường, hoặc bảng nhiều dòng',
          'Câu hỏi bắt đầu bằng "Theo biểu đồ trên…"',
        ],
        method:
          'Đọc nhãn trục và đơn vị TRƯỚC khi nhìn hình dạng. Phần lớn bẫy của dạng này nằm ở đơn vị (nghìn hay triệu), ở trục tung không bắt đầu từ 0, hoặc ở việc nhầm tỉ trọng với giá trị tuyệt đối.',
        steps: [
          { action: 'Đọc tiêu đề, nhãn hai trục và đơn vị.', why: 'Ba thứ này quyết định mọi con số bạn sẽ đọc ra.' },
          { action: 'Kiểm tra trục tung có bắt đầu từ 0 không.', why: 'Trục cắt cụt làm chênh lệch nhỏ trông như chênh lệch lớn.' },
          { action: 'Xác định câu hỏi đang hỏi giá trị tuyệt đối hay tỉ trọng.', why: 'Tỉ trọng giảm mà giá trị vẫn tăng là chuyện hoàn toàn bình thường.' },
          { action: 'Đọc số liệu cần thiết, tính toán, đối chiếu với thứ tự độ lớn trên hình.', why: 'Kết quả phải khớp với cảm nhận thị giác; lệch hẳn là dấu hiệu đọc nhầm dòng.' },
        ],
        trick:
          'Với biểu đồ tròn, 1% ứng với 3,6°. Với câu hỏi "phần nào lớn hơn một phần tư", chỉ cần so với góc vuông — không cần tính.',
        pitfall: 'Kết luận "ngành A suy giảm" khi thấy tỉ trọng của nó giảm, trong khi giá trị tuyệt đối vẫn tăng.',
      },
    ],
    secrets: [
      {
        title: 'Số liệu tuyệt đối và tương đối là hai câu chuyện',
        body: 'Một ngành có thể tăng giá trị mà vẫn giảm tỉ trọng, nếu các ngành khác tăng nhanh hơn. Đây là dấu hiệu của công nghiệp hóa chứ không phải suy thoái. Đề thi hỏi câu này rất nhiều vì nó phân loại rất tốt.',
        when: 'Mọi câu có cả bảng giá trị và bảng cơ cấu.',
      },
      {
        title: 'Đọc câu hỏi trước khi đọc bảng',
        body: 'Bảng số liệu trong đề thường thừa dữ liệu có chủ ý. Đọc câu hỏi trước rồi mới quay lại bảng, bạn chỉ cần nhặt đúng hai hoặc ba ô — thay vì cố hiểu cả bảng.',
        when: 'Đề có bảng số liệu lớn.',
      },
      {
        title: 'Ước lượng trước khi bấm máy',
        body: 'Trước khi tính chính xác, hãy làm tròn thô và ước lượng. Nếu kết quả chính xác lệch xa ước lượng, gần như chắc chắn bạn đã đọc nhầm một ô hoặc sai đơn vị.',
        when: 'Mọi phép tính trên bảng số liệu.',
      },
    ],
  },
  /* ══ NGỮ VĂN — NGÔN NGỮ ════════════════════════════════════════════ */
  {
    topicId: 'qualitative.reading',
    bigQuestion: 'Văn bản này nói gì, nói bằng cách nào, và chỗ nào là ý của tác giả chứ không phải ý của tôi?',
    patterns: [
      {
        id: 'rea.main',
        name: 'Xác định ý chính, chủ đề',
        tell: [
          'Câu hỏi có cụm "ý chính", "chủ đề", "nội dung bao trùm", "nhan đề phù hợp nhất"',
          'Bốn phương án đều đúng với một phần văn bản',
        ],
        method:
          'Ý chính phải phủ TOÀN BỘ văn bản, không chỉ một đoạn. Kỹ thuật: tóm mỗi đoạn thành một cụm từ, rồi tìm phương án chứa được tất cả các cụm ấy. Lý do phương án nhiễu khó loại: chúng đều đúng — nhưng đúng với một đoạn, không đúng với cả bài.',
        steps: [
          { action: 'Đọc lướt, ghi bên lề mỗi đoạn một cụm 3–5 chữ.', why: 'Bộ khung này cho thấy mạch bài mà đọc kỹ từng câu không thấy được.' },
          { action: 'Xác định đoạn nào là luận điểm, đoạn nào là dẫn chứng.', why: 'Ý chính nằm ở luận điểm; chọn nhầm dẫn chứng làm ý chính là bẫy phổ biến nhất.' },
          { action: 'Loại phương án chỉ đúng với một đoạn.', why: 'Đúng nhưng hẹp vẫn là sai với câu hỏi này.' },
          { action: 'Loại phương án rộng hơn văn bản.', why: 'Một nhan đề quá khái quát cũng không phải ý chính của bài này.' },
        ],
        trick:
          'Câu chủ đề thường nằm ở đầu hoặc cuối đoạn, và ở đoạn đầu hoặc đoạn cuối bài. Với văn nghị luận Việt Nam, câu cuối bài rất hay là câu chốt ý — đọc nó trước khi chọn.',
        pitfall: 'Chọn phương án nhắc lại một chi tiết ấn tượng trong bài. Ấn tượng không đồng nghĩa với bao trùm.',
      },
      {
        id: 'rea.infer',
        name: 'Suy luận từ văn bản',
        tell: [
          'Câu hỏi có "có thể suy ra", "tác giả ngụ ý", "theo đoạn trích, điều nào sau đây đúng"',
          'Đáp án không xuất hiện nguyên văn trong bài',
        ],
        method:
          'Suy luận hợp lệ là suy luận mà văn bản BẢO ĐẢM, không phải suy luận mà văn bản gợi ý. Thử nghiệm: nếu có thể tưởng tượng một tình huống trong đó văn bản vẫn đúng nhưng phương án lại sai, thì phương án đó không hợp lệ.',
        steps: [
          { action: 'Tìm câu trong văn bản liên quan trực tiếp tới phương án.', why: 'Mọi suy luận hợp lệ đều có gốc ở một câu cụ thể.' },
          { action: 'Hỏi: từ câu đó, phương án này có BẮT BUỘC đúng không?', why: 'Phân biệt "bảo đảm" với "có vẻ hợp lý".' },
          { action: 'Loại phương án đi quá xa: thêm nguyên nhân, thêm mức độ, thêm phạm vi.', why: 'Đây là ba cách phổ biến nhất mà phương án nhiễu vượt quá văn bản.' },
          { action: 'Chọn phương án gần văn bản nhất mà vẫn trả lời được câu hỏi.', why: 'Trong đọc hiểu, phương án dè dặt thường đúng hơn phương án mạnh mẽ.' },
        ],
        trick:
          'Cảnh giác với các từ tuyệt đối trong phương án: "tất cả", "duy nhất", "không bao giờ", "hoàn toàn". Văn bản nghị luận hiếm khi bảo đảm được những khẳng định mạnh như vậy.',
        pitfall: 'Dùng kiến thức nền của bản thân để chọn. Câu hỏi hỏi văn bản nói gì, không hỏi thực tế thế nào.',
      },
      {
        id: 'rea.attitude',
        name: 'Thái độ và giọng điệu của tác giả',
        tell: [
          'Câu hỏi có "thái độ", "giọng điệu", "tình cảm của tác giả"',
          'Phương án là các tính từ: trân trọng, phê phán, hoài nghi, khách quan',
        ],
        method:
          'Thái độ lộ ra ở TỪ NGỮ ĐÁNH GIÁ chứ không ở nội dung. Tìm các tính từ, trạng từ, và từ tình thái mà tác giả dùng — chúng là dấu vân tay của thái độ.',
        steps: [
          { action: 'Gạch chân mọi từ mang sắc thái đánh giá trong bài.', why: 'Đây là bằng chứng duy nhất về thái độ.' },
          { action: 'Xem chúng nghiêng về khen, chê, hay trung tính.', why: 'Đếm hướng nghiêng cho ra kết luận nhanh.' },
          { action: 'Chú ý các từ nhượng bộ: "tuy nhiên", "cũng có phần đúng", "nhưng".', why: 'Chúng báo hiệu thái độ phức tạp, không phải khen thuần hay chê thuần.' },
          { action: 'Chọn phương án khớp với sắc thái tổng thể, ưu tiên phương án có mức độ vừa phải.', why: 'Tác giả nghị luận hiếm khi cực đoan.' },
        ],
        trick:
          'Nếu bài có cả khen và chê, đáp án thường là một thái độ pha: "trân trọng nhưng vẫn băn khoăn", "đồng tình có chừng mực". Phương án một chiều thường là bẫy.',
        pitfall: 'Nhầm thái độ của tác giả với thái độ của nhân vật hoặc của người được trích dẫn trong bài.',
      },
    ],
    secrets: [
      {
        title: 'Đọc câu hỏi trước, đọc bài sau',
        body: 'Với văn bản dài, hãy lướt qua các câu hỏi trước. Bạn sẽ đọc bài với một mục đích cụ thể thay vì cố nhớ mọi thứ, và tiết kiệm được một lượt đọc lại.',
        when: 'Chùm câu hỏi dùng chung một ngữ liệu dài.',
      },
      {
        title: 'Đáp án nằm trong bài, không nằm trong đầu bạn',
        body: 'Mọi phương án đúng của đọc hiểu đều có gốc ở một câu cụ thể trong văn bản. Nếu không chỉ được ra câu đó, bạn đang đoán chứ không đang trả lời.',
        when: 'Trước khi tô mọi câu đọc hiểu.',
      },
      {
        title: 'Từ nối là bản đồ',
        body: '"Nhưng", "tuy nhiên", "vì vậy", "trái lại" cho biết mạch lập luận rẽ ở đâu. Câu đứng sau chữ "nhưng" gần như luôn quan trọng hơn câu đứng trước nó.',
        when: 'Khi cần tìm nhanh luận điểm chính trong đoạn.',
      },
    ],
  },
  {
    topicId: 'qualitative.literature',
    bigQuestion: 'Tác phẩm này thuộc thời nào, dùng thủ pháp gì, và điều đó thay đổi cách hiểu ra sao?',
    patterns: [
      {
        id: 'lit.context',
        name: 'Gắn tác phẩm với giai đoạn văn học',
        tell: [
          'Đề hỏi tác giả, thời kỳ, trào lưu',
          'Trích một đoạn quen thuộc và hỏi nó thuộc tác phẩm nào',
        ],
        method:
          'Nhận diện qua ba dấu: đề tài, giọng điệu, và ngôn ngữ. Văn học 1930–1945 nói về số phận con người trong xã hội cũ; văn học 1945–1975 nói về kháng chiến và tập thể; văn học sau 1975 quay lại với cá nhân và đời thường.',
        steps: [
          { action: 'Đọc đoạn trích, nhận diện đề tài.', why: 'Đề tài là dấu hiệu mạnh nhất về giai đoạn.' },
          { action: 'Nghe giọng: bi thương, hào hùng, hay trầm tư đời thường?', why: 'Mỗi giai đoạn có một âm sắc chủ đạo.' },
          { action: 'Nhìn lớp từ: từ Hán Việt trang trọng, từ khẩu ngữ, hay từ hiện đại?', why: 'Ngôn ngữ phản ánh thời đại rất trung thực.' },
          { action: 'Đối chiếu với các tác phẩm đã học trong cùng chùm dấu hiệu.', why: 'Đề HSA hỏi trong phạm vi chương trình phổ thông.' },
        ],
        trick:
          'Học theo CỤM chứ đừng học rời: nhóm các tác phẩm cùng giai đoạn, cùng đề tài lại với nhau. Khi gặp một đoạn lạ, bạn định vị được nó vào cụm nào thay vì phải nhớ chính xác từng bài.',
        pitfall: 'Nhớ nhầm tác giả giữa các tác phẩm cùng đề tài trong một giai đoạn.',
      },
      {
        id: 'lit.device',
        name: 'Nhận diện và phân tích thủ pháp',
        tell: [
          'Câu hỏi có "biện pháp nghệ thuật", "thủ pháp", "hình ảnh", "chi tiết nghệ thuật"',
          'Trích một câu thơ hoặc một chi tiết truyện',
        ],
        method:
          'Gọi tên thủ pháp là bước một; nói được TÁC DỤNG mới là câu trả lời. Công thức ba phần: thủ pháp gì → làm nổi bật điều gì → gợi cảm xúc gì ở người đọc.',
        steps: [
          { action: 'Gọi đúng tên thủ pháp.', why: 'Sai tên thì mọi phân tích sau đều lệch.' },
          { action: 'Chỉ ra nó tác động lên đối tượng nào trong câu.', why: 'Thủ pháp luôn phục vụ một hình ảnh cụ thể.' },
          { action: 'Nêu hiệu quả: cụ thể hóa, nhấn mạnh, tạo nhịp, hay gợi liên tưởng.', why: 'Đây mới là phần đề chấm điểm.' },
          { action: 'Nối với chủ đề chung của tác phẩm.', why: 'Một thủ pháp hay luôn phục vụ tư tưởng của bài, không đứng riêng.' },
        ],
        trick:
          'Bốn thủ pháp xuất hiện nhiều nhất trong đề: so sánh, ẩn dụ, nhân hóa, điệp. Nắm chắc cách phân biệt ẩn dụ với so sánh (so sánh có từ so sánh, ẩn dụ thì không) là đã xử lý được phần lớn câu.',
        pitfall: 'Chỉ gọi tên mà không nêu tác dụng. Câu hỏi hầu như luôn hỏi "nhằm mục đích gì".',
      },
      {
        id: 'lit.character',
        name: 'Phân tích nhân vật và chi tiết',
        tell: [
          'Đề hỏi về tính cách, số phận, hoặc ý nghĩa một chi tiết',
          'Trích một đoạn miêu tả hoặc đối thoại',
        ],
        method:
          'Tính cách nhân vật được bộc lộ qua bốn kênh: hành động, lời nói, suy nghĩ, và cách người khác nhìn họ. Đọc đoạn trích để xem kênh nào đang được dùng, rồi rút kết luận từ đúng kênh đó.',
        steps: [
          { action: 'Xác định đoạn trích đang miêu tả qua kênh nào.', why: 'Mỗi kênh cho một loại thông tin khác nhau về nhân vật.' },
          { action: 'Nhặt các chi tiết cụ thể, không kết luận vội.', why: 'Chi tiết là bằng chứng; thiếu nó thì nhận xét thành cảm tính.' },
          { action: 'Rút ra nét tính cách và nói được nó thể hiện ở chi tiết nào.', why: 'Kết luận phải truy ngược được về bằng chứng.' },
          { action: 'Đặt nhân vật vào bối cảnh xã hội của tác phẩm.', why: 'Số phận nhân vật trong văn học hiện thực luôn là số phận của một tầng lớp.' },
        ],
        trick:
          'Một chi tiết được nhắc lại nhiều lần trong tác phẩm gần như chắc chắn là chi tiết nghệ thuật quan trọng. Sự lặp lại là cách nhà văn ra hiệu.',
        pitfall: 'Áp đạo đức hiện đại lên nhân vật của một thời đại khác, thay vì đọc họ trong bối cảnh của họ.',
      },
    ],
    secrets: [
      {
        title: 'Học theo cụm, không học theo bài',
        body: 'Nhóm tác phẩm theo giai đoạn và đề tài. Khi gặp một đoạn trích lạ, bạn chỉ cần định vị nó vào cụm — thay vì phải thuộc lòng từng bài. Cách này bền hơn nhiều dưới áp lực phòng thi.',
        when: 'Khi ôn tập cả chuyên đề văn học.',
      },
      {
        title: 'Thuộc vài câu then chốt',
        body: 'Mỗi tác phẩm chỉ cần thuộc hai đến ba câu tiêu biểu. Chúng vừa là dấu nhận diện tác phẩm, vừa là dẫn chứng dùng được cho nhiều câu hỏi khác nhau.',
        when: 'Ôn tập trước kỳ thi, khi thời gian còn hạn chế.',
      },
      {
        title: 'Đề hỏi tác dụng, không hỏi tên gọi',
        body: 'Rất nhiều thí sinh gọi đúng tên biện pháp rồi dừng lại, và mất điểm. Phần đáng giá luôn là câu trả lời cho "để làm gì".',
        when: 'Mọi câu hỏi về biện pháp nghệ thuật.',
      },
    ],
  },
  {
    topicId: 'qualitative.grammar',
    bigQuestion: 'Câu này sai ở chỗ nào, và sửa thế nào cho đúng mà vẫn giữ ý?',
    patterns: [
      {
        id: 'gra.structure',
        name: 'Câu thiếu thành phần',
        tell: [
          'Câu bắt đầu bằng "Qua…", "Với…", "Bằng…" rồi đi thẳng vào vị ngữ',
          'Đọc lên thấy lửng, không biết ai làm gì',
        ],
        method:
          'Tìm chủ ngữ và vị ngữ. Nếu phần đầu câu là một cụm giới từ chỉ phương tiện hay phạm vi, nó KHÔNG phải chủ ngữ — và câu đang thiếu chủ ngữ thật.',
        steps: [
          { action: 'Đặt câu hỏi "Ai?" hoặc "Cái gì?" cho động từ chính.', why: 'Không trả lời được nghĩa là thiếu chủ ngữ.' },
          { action: 'Kiểm tra phần đầu câu có phải cụm giới từ không.', why: '"Qua tác phẩm cho thấy…" là lỗi kinh điển: cụm giới từ bị dùng làm chủ ngữ.' },
          { action: 'Sửa bằng một trong hai cách: bỏ giới từ đầu câu, hoặc thêm chủ ngữ.', why: 'Cả hai đều hợp lệ; chọn cách giữ được ý gốc.' },
          { action: 'Đọc lại to trong đầu.', why: 'Tai bắt lỗi cấu trúc nhanh hơn mắt.' },
        ],
        trick:
          '"Qua… cho thấy…" và "Với… đã chứng minh…" là hai khuôn sai gặp nhiều nhất trong đề. Nhìn thấy chúng là gần như chắc chắn tìm được đáp án.',
        pitfall: 'Tưởng cụm danh từ sau giới từ là chủ ngữ.',
      },
      {
        id: 'gra.logic',
        name: 'Lỗi logic trong câu',
        tell: [
          'Câu có cặp quan hệ từ: vì… nên, tuy… nhưng, không những… mà còn',
          'Có phép liệt kê các thành phần không cùng loại',
        ],
        method:
          'Kiểm tra hai điều: cặp quan hệ từ có dùng đúng cặp không, và quan hệ ý nghĩa giữa hai vế có khớp với cặp từ đó không. "Tuy… nhưng" đòi hỏi hai vế TRÁI chiều; dùng nó cho hai vế cùng chiều là lỗi logic dù ngữ pháp vẫn trơn.',
        steps: [
          { action: 'Nhận diện cặp quan hệ từ trong câu.', why: 'Chúng tuyên bố một quan hệ cụ thể giữa hai vế.' },
          { action: 'Đọc quan hệ thực giữa hai vế: nhân quả, tương phản, hay tăng tiến?', why: 'So sánh với quan hệ mà cặp từ tuyên bố.' },
          { action: 'Nếu là câu liệt kê: kiểm tra các thành phần có cùng cấp bậc khái niệm không.', why: '"Tôi thích hoa hồng, hoa cúc và các loài hoa" là lỗi bao hàm chéo.' },
          { action: 'Sửa bằng cách đổi quan hệ từ hoặc điều chỉnh vế cho khớp.', why: 'Giữ nguyên ý người viết, chỉ chỉnh cấu trúc.' },
        ],
        trick:
          'Trong câu liệt kê, hãy kiểm tra xem có phần tử nào BAO HÀM phần tử khác không. Đó là lỗi logic phổ biến nhất và cũng dễ bị bỏ qua nhất.',
        pitfall: 'Chỉ nhìn ngữ pháp mà bỏ qua quan hệ ý nghĩa. Một câu có thể đúng ngữ pháp mà sai logic.',
      },
      {
        id: 'gra.reference',
        name: 'Lỗi quy chiếu và dùng từ',
        tell: [
          'Có đại từ "nó", "họ", "điều này" mà không rõ chỉ ai',
          'Có từ Hán Việt bị dùng thừa hoặc sai nghĩa',
        ],
        method:
          'Mỗi đại từ phải có đúng một đối tượng để chỉ. Nếu trong câu có hai danh từ mà đại từ có thể chỉ cả hai, đó là lỗi quy chiếu mơ hồ — dù người đọc vẫn đoán được.',
        steps: [
          { action: 'Với mỗi đại từ, tìm danh từ nó thay thế.', why: 'Không tìm được hoặc tìm được nhiều hơn một là có lỗi.' },
          { action: 'Kiểm tra từ Hán Việt có bị lặp nghĩa với từ thuần Việt bên cạnh không.', why: '"Ngày sinh nhật" hay "cây cổ thụ" là lỗi thừa nghĩa quen thuộc.' },
          { action: 'Kiểm tra từ có đúng sắc thái với văn cảnh không.', why: 'Từ trang trọng trong văn cảnh suồng sã là lỗi phong cách.' },
          { action: 'Sửa bằng cách thay đại từ bằng danh từ cụ thể.', why: 'Rõ ràng luôn ưu tiên hơn ngắn gọn.' },
        ],
        trick:
          'Các lỗi thừa nghĩa hay gặp trong đề: "ngày sinh nhật", "cây cổ thụ", "tái lập lại", "đường quốc lộ", "nữ nhà văn nữ". Thuộc danh sách này là nhận ra ngay.',
        pitfall: 'Bỏ qua lỗi quy chiếu vì vẫn hiểu được câu. Hiểu được không có nghĩa là đúng chuẩn.',
      },
    ],
    secrets: [
      {
        title: 'Rút gọn câu về nòng cốt',
        body: 'Khi câu dài và rối, hãy xóa hết thành phần phụ để chỉ còn chủ ngữ và vị ngữ. Lỗi cấu trúc lộ ra ngay khi câu trơ khung.',
        when: 'Câu dài hơn hai dòng và không rõ sai ở đâu.',
      },
      {
        title: 'Đọc to trong đầu',
        body: 'Tai của người bản ngữ bắt lỗi ngữ pháp nhanh hơn mắt rất nhiều. Đọc thầm nhưng có nhịp, chỗ nào vấp là chỗ đó cần xem lại.',
        when: 'Câu hỏi phát hiện lỗi sai.',
      },
      {
        title: 'Sửa ít nhất có thể',
        body: 'Phương án đúng thường là phương án sửa tối thiểu mà vẫn hết lỗi. Phương án viết lại cả câu thường thay đổi ý gốc — và đó là dấu hiệu nó sai.',
        when: 'Câu hỏi chọn cách sửa lỗi.',
      },
    ],
  },
  {
    topicId: 'qualitative.vocabulary',
    bigQuestion: 'Từ này mang nghĩa gì trong CHÍNH câu này, và sắc thái của nó có hợp văn cảnh không?',
    patterns: [
      {
        id: 'voc.context',
        name: 'Nghĩa của từ trong ngữ cảnh',
        tell: [
          'Đề gạch chân một từ trong câu và hỏi nghĩa',
          'Từ đó là từ nhiều nghĩa quen thuộc',
        ],
        method:
          'Che từ đó đi, đọc lại câu, rồi tự điền một từ của mình vào chỗ trống. Từ bạn nghĩ ra chính là nghĩa cần tìm — sau đó chọn phương án gần nó nhất. Lý do hiệu quả: nó ngăn bạn chọn theo nghĩa gốc quen thuộc thay vì nghĩa đang dùng.',
        steps: [
          { action: 'Che từ được hỏi, đọc lại cả câu.', why: 'Buộc não làm việc với văn cảnh chứ không với ký ức về từ.' },
          { action: 'Tự nghĩ một từ thay thế phù hợp.', why: 'Đây là dự đoán độc lập, chưa bị bốn phương án dẫn dắt.' },
          { action: 'So bốn phương án với từ mình vừa nghĩ.', why: 'Phương án nào gần nhất thường là đáp án.' },
          { action: 'Thay phương án đã chọn vào câu và đọc lại.', why: 'Kiểm tra cuối: câu phải mượt và giữ nguyên ý.' },
        ],
        trick:
          'Từ Hán Việt thường có nghĩa hẹp và trang trọng hơn từ thuần Việt tương đương. Khi phân vân giữa hai phương án gần nghĩa, hãy chọn theo sắc thái của văn cảnh chứ không theo định nghĩa từ điển.',
        pitfall: 'Chọn nghĩa gốc, nghĩa thông dụng nhất của từ, trong khi câu đang dùng nghĩa chuyển.',
      },
      {
        id: 'voc.pair',
        name: 'Đồng nghĩa, trái nghĩa, gần nghĩa',
        tell: [
          'Đề hỏi từ đồng nghĩa hoặc trái nghĩa với một từ cho trước',
          'Bốn phương án đều liên quan tới cùng một trường nghĩa',
        ],
        method:
          'Không có hai từ hoàn toàn đồng nghĩa. Phân biệt bằng ba trục: mức độ (nhỏ – bé – tí), sắc thái (chết – mất – hi sinh), và phạm vi dùng (ăn – xơi – dùng bữa).',
        steps: [
          { action: 'Xác định trường nghĩa chung của cả bốn phương án.', why: 'Chúng luôn cùng trường; khác biệt nằm ở sắc thái.' },
          { action: 'Đặt từng phương án vào câu gốc.', why: 'Đây là phép thử trực tiếp nhất.' },
          { action: 'Loại phương án lệch sắc thái với văn cảnh.', why: 'Từ trang trọng trong câu suồng sã, hoặc ngược lại, đều sai.' },
          { action: 'Với câu hỏi trái nghĩa, kiểm tra cặp có đối xứng không.', why: 'Trái nghĩa thật phải cùng trục: cao – thấp, không phải cao – nhỏ.' },
        ],
        trick:
          'Bẫy phổ biến nhất của câu trái nghĩa là để lẫn một từ ĐỒNG nghĩa vào bốn phương án. Đọc kỹ đề xem đang hỏi đồng hay trái trước khi nhìn phương án.',
        pitfall: 'Nhầm gần nghĩa với đồng nghĩa. "Buồn" và "chán" gần nghĩa nhưng không thay thế nhau được ở mọi câu.',
      },
      {
        id: 'voc.idiom',
        name: 'Thành ngữ, tục ngữ, từ láy',
        tell: [
          'Đề trích một thành ngữ và hỏi nghĩa hoặc hỏi trường hợp dùng',
          'Hỏi phân biệt từ láy với từ ghép',
        ],
        method:
          'Thành ngữ có nghĩa bóng không suy ra được từ nghĩa các từ thành phần. Với từ láy, kiểm tra hai tiếng có lặp âm đầu hoặc vần không, VÀ có ít nhất một tiếng không có nghĩa độc lập.',
        steps: [
          { action: 'Với thành ngữ: nhớ nghĩa bóng, đừng ghép nghĩa đen.', why: '"Nước đổ lá khoai" không nói về nước hay khoai.' },
          { action: 'Xác định thành ngữ đó dùng để khen, chê, hay mô tả.', why: 'Phần lớn câu hỏi thực chất hỏi sắc thái.' },
          { action: 'Với từ láy: kiểm tra lặp âm và kiểm tra nghĩa của từng tiếng.', why: '"Xinh xắn" là láy; "xinh đẹp" là ghép vì cả hai tiếng đều có nghĩa.' },
          { action: 'Đặt vào câu để xác nhận.', why: 'Phép thử cuối cùng luôn là văn cảnh.' },
        ],
        trick:
          'Từ ghép: cả hai tiếng đều có nghĩa và bổ sung nghĩa cho nhau. Từ láy: ít nhất một tiếng mất nghĩa khi đứng riêng, và hai tiếng có quan hệ về âm. Đây là ranh giới rõ nhất.',
        pitfall: 'Coi mọi cặp từ có âm giống nhau là từ láy. "Học hành", "đất đai" là từ ghép có quan hệ âm ngẫu nhiên.',
      },
    ],
    secrets: [
      {
        title: 'Che từ, tự điền',
        body: 'Kỹ thuật mạnh nhất của toàn chuyên đề từ vựng: che từ được hỏi, tự nghĩ một từ thay thế, rồi mới nhìn phương án. Nó ngăn bốn phương án dẫn dắt suy nghĩ của bạn.',
        when: 'Mọi câu hỏi nghĩa của từ trong ngữ cảnh.',
      },
      {
        title: 'Sắc thái quan trọng hơn định nghĩa',
        body: 'Trong tiếng Việt, hai từ cùng nghĩa từ điển vẫn có thể không thay thế nhau được. "Hi sinh" và "chết" cùng chỉ một sự việc nhưng không dùng lẫn. Câu hỏi từ vựng của đề HSA phân loại chính ở chỗ này.',
        when: 'Phân vân giữa hai phương án đều đúng nghĩa.',
      },
      {
        title: 'Đọc để tích lũy, không học thuộc danh sách',
        body: 'Vốn từ không xây bằng cách học thuộc bảng đồng nghĩa. Nó xây bằng việc đọc văn bản đủ dài và đủ khó. Mỗi ngày một bài đọc tử tế bền hơn một tuần học vẹt.',
        when: 'Khi lập kế hoạch ôn dài hạn cho phần Ngôn ngữ.',
      },
    ],
  },
  {
    topicId: 'qualitative.rhetoric',
    bigQuestion: 'Cách viết này tạo ra hiệu quả gì mà cách viết thường không tạo ra được?',
    patterns: [
      {
        id: 'rhe.identify',
        name: 'Gọi tên biện pháp tu từ',
        tell: [
          'Đề trích một câu văn, câu thơ và hỏi biện pháp',
          'Câu trích có hình ảnh lạ hoặc cấu trúc lặp',
        ],
        method:
          'Kiểm tra theo thứ tự bốn nhóm: có từ so sánh không (như, tựa, là) → so sánh; có gán vật thành người không → nhân hóa; có gọi vật này bằng tên vật kia không → ẩn dụ hoặc hoán dụ; có lặp không → điệp.',
        steps: [
          { action: 'Tìm từ so sánh trước tiên.', why: 'Đây là dấu hiệu hiển ngôn duy nhất; có nó thì gần như chắc chắn là so sánh.' },
          { action: 'Nếu không có, xét xem có sự thay thế tên gọi không.', why: 'Ẩn dụ và hoán dụ đều là thay tên, khác nhau ở quan hệ.' },
          { action: 'Phân biệt ẩn dụ (quan hệ tương đồng) với hoán dụ (quan hệ gần gũi, bộ phận – toàn thể).', why: '"Thuyền" chỉ người đi xa là ẩn dụ; "áo nâu" chỉ nông dân là hoán dụ.' },
          { action: 'Kiểm tra có lặp từ, lặp cấu trúc, hay tăng tiến không.', why: 'Điệp và liệt kê thường đi cùng các biện pháp khác trong một câu.' },
        ],
        trick:
          'Một câu có thể mang nhiều biện pháp cùng lúc. Nếu bốn phương án đều có vẻ đúng, hãy chọn biện pháp NỔI BẬT nhất — thường là biện pháp tạo ra hình ảnh trung tâm của câu.',
        pitfall: 'Nhầm ẩn dụ với hoán dụ. Hỏi "giống nhau ở điểm nào" — trả lời được là ẩn dụ; không giống mà chỉ đi liền nhau là hoán dụ.',
      },
      {
        id: 'rhe.effect',
        name: 'Phân tích tác dụng',
        tell: [
          'Câu hỏi có "nhằm mục đích gì", "tác dụng của biện pháp", "hiệu quả nghệ thuật"',
          'Đề đã nêu sẵn tên biện pháp và chỉ hỏi phần tác dụng',
          'Bốn phương án đều là các cụm nhận xét, không phải tên biện pháp',
        ],
        method:
          'Công thức ba tầng: cụ thể hóa cái trừu tượng → nhấn mạnh một phẩm chất → gợi cảm xúc ở người đọc. Hầu như mọi tác dụng của mọi biện pháp đều rơi vào một trong ba tầng này, và một câu trả lời tốt chạm được cả ba.',
        steps: [
          { action: 'Nói biện pháp làm hình ảnh nào trở nên cụ thể, sinh động.', why: 'Đây là tác dụng trực tiếp, dễ thấy nhất.' },
          { action: 'Nói nó nhấn mạnh phẩm chất gì của đối tượng.', why: 'Nhà văn chọn biện pháp để làm nổi một nét cụ thể.' },
          { action: 'Nói cảm xúc mà nó gợi ra ở người đọc.', why: 'Phần này phân biệt bài viết hay với bài viết đúng.' },
          { action: 'Nối với tư tưởng chung của đoạn.', why: 'Biện pháp phục vụ chủ đề, không tồn tại độc lập.' },
        ],
        trick:
          'Điệp ngữ luôn có ít nhất hai tác dụng: tạo nhịp và nhấn mạnh. Nêu cả hai thì câu trả lời đầy đủ hơn hẳn.',
        pitfall: 'Trả lời chung chung "làm câu văn hay hơn, sinh động hơn" mà không chỉ ra hay ở chỗ nào, sinh động ra sao.',
      },
      {
        id: 'rhe.style',
        name: 'Phong cách ngôn ngữ và phương thức biểu đạt',
        tell: [
          'Đề hỏi văn bản thuộc phong cách nào, dùng phương thức biểu đạt gì',
          'Trích một đoạn báo chí, khoa học, hành chính, hoặc nghệ thuật',
        ],
        method:
          'Nhận diện qua mục đích của văn bản: thông tin sự kiện (báo chí), trình bày tri thức (khoa học), điều hành (hành chính), bộc lộ và gợi cảm (nghệ thuật), trao đổi hằng ngày (sinh hoạt), thuyết phục (chính luận).',
        steps: [
          { action: 'Hỏi: văn bản này viết ra để làm gì?', why: 'Mục đích quyết định phong cách, không phải đề tài.' },
          { action: 'Nhìn lớp từ: thuật ngữ, khuôn mẫu hành chính, hay từ giàu hình ảnh?', why: 'Ngôn ngữ là bằng chứng cụ thể nhất.' },
          { action: 'Nhìn cấu trúc: có đề mục, số hiệu, hay chảy tự do?', why: 'Hành chính và khoa học có cấu trúc rất đặc trưng.' },
          { action: 'Với phương thức biểu đạt, xác định hành động chính: kể, tả, biểu cảm, nghị luận, thuyết minh hay hành chính.', why: 'Một văn bản có thể pha nhiều phương thức; chọn cái chủ đạo.' },
        ],
        trick:
          'Phong cách và phương thức là hai câu hỏi khác nhau. Một bài báo (phong cách báo chí) có thể dùng phương thức tự sự. Đọc kỹ đề hỏi cái nào.',
        pitfall: 'Nhầm phong cách nghệ thuật với mọi văn bản có hình ảnh đẹp. Một bài báo hay vẫn là phong cách báo chí.',
      },
    ],
    secrets: [
      {
        title: 'Hình ảnh lạ là dấu hiệu',
        body: 'Chỗ nào ngôn ngữ đi chệch khỏi cách nói thông thường, chỗ đó có biện pháp tu từ. Đọc câu và tìm chỗ "lệch" là cách nhanh nhất định vị biện pháp.',
        when: 'Câu hỏi yêu cầu tìm biện pháp mà không chỉ rõ ở đâu.',
      },
      {
        title: 'Ba tầng tác dụng',
        body: 'Cụ thể hóa — nhấn mạnh — gợi cảm xúc. Ba tầng này là khung trả lời cho mọi câu hỏi về tác dụng, và dùng được cho mọi biện pháp. Thuộc khung thì không bao giờ bí.',
        when: 'Mọi câu hỏi về hiệu quả nghệ thuật.',
      },
      {
        title: 'Đừng gọi tên rồi dừng',
        body: 'Gọi đúng tên biện pháp chỉ là điều kiện cần. Phần điểm nằm ở câu trả lời cho "để làm gì" — và đó cũng là phần phân loại thí sinh.',
        when: 'Mọi câu hỏi về biện pháp tu từ, kể cả khi đề chỉ hỏi ngắn gọn là biện pháp gì.',
      },
    ],
  },
  {
    topicId: 'qualitative.logic',
    bigQuestion: 'Kết luận này có THỰC SỰ theo sau các tiền đề không, hay chỉ nghe có vẻ hợp lý?',
    patterns: [
      {
        id: 'log.valid',
        name: 'Kiểm tra tính hợp lệ của suy luận',
        tell: [
          'Đề cho vài mệnh đề rồi hỏi kết luận nào rút ra được',
          'Có cấu trúc "Mọi A đều là B. C là A. Vậy…"',
        ],
        method:
          'Tách rõ tiền đề và kết luận, rồi hỏi: có tình huống nào mà mọi tiền đề đều đúng NHƯNG kết luận sai không? Tìm được một tình huống như vậy là suy luận không hợp lệ. Đây là phép thử duy nhất cần thiết.',
        steps: [
          { action: 'Đánh số các tiền đề, khoanh tròn kết luận.', why: 'Đề thường trộn chúng lẫn nhau để gây rối.' },
          { action: 'Vẽ sơ đồ tập hợp cho các mệnh đề "mọi", "một số", "không".', why: 'Vòng tròn Venn biến logic trừu tượng thành hình ảnh kiểm tra được.' },
          { action: 'Thử tìm phản ví dụ: một cách vẽ mà tiền đề đúng, kết luận sai.', why: 'Một phản ví dụ đủ để bác bỏ.' },
          { action: 'Không tìm được phản ví dụ sau vài lần thử → suy luận hợp lệ.', why: 'Với đề trắc nghiệm, mức chắc chắn này là đủ.' },
        ],
        trick:
          '"Một số A là B" KHÔNG suy ra "một số A không là B". Và "mọi A là B" không suy ra "mọi B là A". Hai lỗi đảo ngược này chiếm phần lớn phương án nhiễu.',
        pitfall: 'Đánh giá suy luận theo việc kết luận có đúng trong thực tế hay không. Logic hỏi kết luận có THEO SAU tiền đề không, độc lập với sự thật.',
      },
      {
        id: 'log.arrange',
        name: 'Bài toán sắp xếp, xác định vị trí',
        tell: [
          'Đề cho một nhóm người/vật và các điều kiện về vị trí, thứ tự',
          'Hỏi ai ngồi đâu, ai đứng thứ mấy',
        ],
        method:
          'Lập bảng và điền dần từ điều kiện CHẮC CHẮN nhất. Điều kiện dạng "A ở vị trí thứ 3" mạnh hơn "A đứng cạnh B" — bắt đầu từ cái mạnh sẽ thu hẹp không gian nhanh nhất.',
        steps: [
          { action: 'Vẽ bảng hoặc dãy ô trống theo số vị trí.', why: 'Không có khung thì không giữ nổi các ràng buộc trong đầu.' },
          { action: 'Xếp các điều kiện theo độ mạnh, làm cái mạnh trước.', why: 'Mỗi ô được cố định làm giảm mạnh số khả năng còn lại.' },
          { action: 'Đánh dấu cả điều kiện phủ định (X không ngồi ô này).', why: 'Loại trừ cũng có sức mạnh ngang khẳng định.' },
          { action: 'Khi bí, giả sử một khả năng rồi suy tiếp cho tới khi mâu thuẫn.', why: 'Mâu thuẫn chứng minh giả sử sai, và bạn còn đúng một khả năng.' },
        ],
        trick:
          'Với câu hỏi trắc nghiệm dạng này, đôi khi thử thẳng bốn phương án nhanh hơn suy luận xuôi — mỗi phương án chỉ cần kiểm tra có vi phạm điều kiện nào không.',
        pitfall: 'Bỏ sót một điều kiện. Trước khi chốt, hãy rà lại toàn bộ danh sách điều kiện một lượt.',
      },
      {
        id: 'log.number',
        name: 'Suy luận số học và quy luật dãy',
        tell: [
          'Đề cho một dãy số hoặc hình và hỏi số/hình tiếp theo',
          'Có bảng số cần điền ô trống',
        ],
        method:
          'Thử theo thứ tự: hiệu liên tiếp → thương liên tiếp → hiệu của hiệu → quy luật xen kẽ hai dãy con. Bốn phép thử này bao trọn gần như mọi dãy trong đề thi.',
        steps: [
          { action: 'Tính dãy hiệu giữa các số liên tiếp.', why: 'Quy luật cộng lộ ra ngay ở bước này.' },
          { action: 'Nếu hiệu không đều, tính hiệu của dãy hiệu.', why: 'Dãy bậc hai có hiệu cấp hai không đổi.' },
          { action: 'Thử thương nếu các số tăng nhanh.', why: 'Tăng theo cấp số nhân thì hiệu vô nghĩa nhưng thương thì đều.' },
          { action: 'Nếu vẫn không ra, tách dãy thành hai dãy con vị trí chẵn và lẻ.', why: 'Dãy xen kẽ là dạng khó phổ biến trong đề HSA.' },
        ],
        trick:
          'Nếu dãy có cả số tăng và số giảm xen nhau, gần như chắc chắn đó là hai dãy con đan xen. Tách ngay thay vì tìm một quy luật chung.',
        pitfall: 'Cố tìm một quy luật phức tạp trong khi dãy chỉ đơn giản là hai dãy con.',
      },
    ],
    secrets: [
      {
        title: 'Vẽ ra giấy, đừng giữ trong đầu',
        body: 'Trí nhớ làm việc chỉ giữ được khoảng bốn thông tin cùng lúc. Bài logic thường có sáu đến tám ràng buộc. Vẽ bảng không phải là chậm — nó là điều kiện để làm đúng.',
        when: 'Mọi bài sắp xếp có từ bốn ràng buộc trở lên.',
      },
      {
        title: 'Phản ví dụ mạnh hơn lập luận',
        body: 'Để bác bỏ một suy luận, không cần giải thích dài — chỉ cần một tình huống cụ thể trong đó tiền đề đúng mà kết luận sai. Một phản ví dụ kết thúc mọi tranh cãi.',
        when: 'Câu hỏi "suy luận nào sau đây không hợp lệ".',
      },
      {
        title: 'Cẩn thận với "một số"',
        body: 'Trong logic, "một số" nghĩa là "ít nhất một", và nó KHÔNG loại trừ "tất cả". "Một số học sinh giỏi toán" vẫn đúng khi tất cả đều giỏi toán. Đề khai thác chỗ này rất nhiều.',
        when: 'Suy luận có lượng từ "một số", "có những".',
      },
    ],
  },
  /* ══ KHOA HỌC — VẬT LÝ ═════════════════════════════════════════════ */
  {
    topicId: 'science.physics.mechanics',
    bigQuestion: 'Vật này chịu những lực nào, và tổng của chúng làm nó chuyển động ra sao?',
    patterns: [
      {
        id: 'phy.kinematic',
        name: 'Chuyển động thẳng biến đổi đều',
        tell: [
          'Đề cho gia tốc, hoặc cho vận tốc đầu và cuối cùng thời gian',
          'Có cụm "từ trạng thái nghỉ", "hãm phanh", "rơi tự do"',
        ],
        method:
          'Liệt kê năm đại lượng v₀, v, a, t, s rồi tìm công thức chứa đúng bốn đại lượng bạn có. Lý do: bốn công thức động học mỗi cái thiếu một đại lượng, nên chọn đúng công thức là bỏ được hoàn toàn bước trung gian.',
        steps: [
          { action: 'Viết ra năm đại lượng, đánh dấu cái nào đã biết, cái nào cần tìm.', why: 'Bức tranh này chỉ thẳng ra công thức phải dùng.' },
          { action: 'Chọn chiều dương và giữ nhất quán suốt bài.', why: 'Gia tốc hãm phanh mang dấu âm — sai dấu là sai toàn bộ.' },
          { action: 'Chọn công thức không chứa đại lượng bạn thiếu.', why: 'Tránh phải giải hệ hai phương trình.' },
          { action: 'Thay số với đơn vị chuẩn SI rồi kiểm tra thứ nguyên.', why: 'km/h phải đổi ra m/s trước khi dùng với a tính bằng m/s².' },
        ],
        trick:
          'Công thức v² − v₀² = 2as không chứa thời gian — dùng nó mỗi khi đề không cho và không hỏi t. Đây là công thức tiết kiệm thời gian nhất trong nhóm.',
        pitfall: 'Quên đổi km/h sang m/s. Chia cho 3,6 là phản xạ phải có.',
      },
      {
        id: 'phy.newton',
        name: 'Định luật Newton và lực',
        tell: [
          'Có nhiều lực tác dụng: kéo, ma sát, trọng lực, phản lực',
          'Vật trên mặt phẳng nghiêng hoặc hệ hai vật nối bằng dây',
        ],
        method:
          'Vẽ hình biểu diễn lực cho TỪNG vật riêng, chọn hệ trục, chiếu lên hai trục rồi viết ΣF = ma cho mỗi trục. Với hệ nhiều vật, mỗi vật một phương trình và lực căng dây là ẩn chung.',
        steps: [
          { action: 'Vẽ riêng từng vật với đầy đủ lực tác dụng lên nó.', why: 'Trộn lực của hai vật vào một hình là nguồn sai lớn nhất.' },
          { action: 'Chọn trục Ox theo hướng chuyển động.', why: 'Làm cho gia tốc chỉ có một thành phần, đơn giản hóa phương trình.' },
          { action: 'Chiếu mọi lực lên hai trục, viết ΣF = ma cho từng trục.', why: 'Trục vuông góc với chuyển động cho phương trình về phản lực N.' },
          { action: 'Giải hệ, chú ý lực ma sát F = μN với N lấy từ phương trình trục vuông góc.', why: 'N không phải lúc nào cũng bằng P — trên mặt nghiêng thì N = P·cos α.' },
        ],
        trick:
          'Trên mặt phẳng nghiêng góc α: thành phần trọng lực dọc mặt là P·sin α, vuông góc mặt là P·cos α. Nhớ "sin đi cùng chuyển động" là không bao giờ lẫn.',
        pitfall: 'Lấy N = P trên mặt phẳng nghiêng. N = P·cos α, nhỏ hơn P.',
      },
      {
        id: 'phy.energy',
        name: 'Công, năng lượng, bảo toàn',
        tell: [
          'Đề hỏi vận tốc tại một vị trí mà không hỏi thời gian',
          'Có độ cao, lò xo, hoặc cụm "bỏ qua ma sát"',
        ],
        method:
          'Dùng bảo toàn cơ năng thay vì động lực học. Lý do: bảo toàn năng lượng chỉ quan tâm trạng thái đầu và cuối, bỏ qua toàn bộ quá trình ở giữa — nên nó ngắn hơn nhiều khi đường đi phức tạp.',
        steps: [
          { action: 'Chọn mốc thế năng, thường ở vị trí thấp nhất.', why: 'Mốc tự do chọn; chọn khéo thì một số hạng bằng 0.' },
          { action: 'Viết cơ năng tại trạng thái đầu và trạng thái cuối.', why: 'Chỉ cần hai trạng thái, không cần quá trình.' },
          { action: 'Cho hai cơ năng bằng nhau nếu bỏ qua ma sát.', why: 'Đó chính là nội dung định luật bảo toàn.' },
          { action: 'Nếu có ma sát: hiệu cơ năng bằng công của lực ma sát.', why: 'Năng lượng không mất đi, nó chuyển thành nhiệt.' },
        ],
        trick:
          'Đề hỏi vận tốc mà không nhắc tới thời gian là dấu hiệu gần như chắc chắn phải dùng năng lượng chứ không dùng động lực học.',
        pitfall: 'Dùng bảo toàn cơ năng khi đề có ma sát mà không nói bỏ qua.',
      },
    ],
    secrets: [
      {
        title: 'Đơn vị SI trước mọi phép tính',
        body: 'Đổi hết về mét, kilôgam, giây trước khi thay số. Phần lớn lỗi sai một bậc mười trong đề vật lý là lỗi đơn vị, không phải lỗi công thức.',
        when: 'Ngay sau khi đọc xong đề, trước khi chọn công thức.',
      },
      {
        title: 'Kiểm tra thứ nguyên',
        body: 'Sau khi ra kết quả, kiểm tra đơn vị của biểu thức có khớp với đại lượng cần tìm không. Một công thức sai gần như luôn cho ra đơn vị sai — đây là bộ lọc rẻ nhất.',
        when: 'Trước khi tô đáp án cho mọi câu tính toán.',
      },
      {
        title: 'Hình vẽ lực là một nửa lời giải',
        body: 'Vẽ đủ và đúng lực tác dụng lên vật thì phương trình gần như tự viết ra. Ngược lại, thiếu một lực thì mọi biến đổi sau đều sai mà không có cách nào phát hiện.',
        when: 'Mọi bài động lực học.',
      },
    ],
  },
  {
    topicId: 'science.physics.oscillation',
    bigQuestion: 'Dao động này có chu kỳ bao nhiêu, và ở li độ đó thì năng lượng phân bố thế nào?',
    patterns: [
      {
        id: 'osc.period',
        name: 'Chu kỳ và tần số',
        tell: [
          'Có con lắc lò xo hoặc con lắc đơn',
          'Đề hỏi chu kỳ, tần số, hoặc hỏi chu kỳ thay đổi ra sao khi đổi khối lượng, chiều dài',
        ],
        method:
          'Hai công thức gốc: con lắc lò xo T = 2π√(m/k), con lắc đơn T = 2π√(l/g). Điều quan trọng hơn công thức là biết đại lượng nào KHÔNG ảnh hưởng: chu kỳ con lắc lò xo không phụ thuộc biên độ, chu kỳ con lắc đơn không phụ thuộc khối lượng.',
        steps: [
          { action: 'Xác định loại con lắc.', why: 'Hai công thức khác nhau hoàn toàn về đại lượng tham gia.' },
          { action: 'Liệt kê đại lượng đề cho và đại lượng đề hỏi.', why: 'Nhiều câu hỏi chỉ về tỉ lệ, không cần tính số cụ thể.' },
          { action: 'Với câu hỏi tỉ lệ: lập tỉ số hai chu kỳ để triệt tiêu hằng số.', why: 'Ngắn hơn nhiều so với tính từng chu kỳ.' },
          { action: 'Chú ý căn bậc hai: tăng chiều dài gấp 4 thì chu kỳ chỉ gấp 2.', why: 'Quan hệ căn là chỗ đề cài bẫy.' },
        ],
        trick:
          'Chu kỳ tỉ lệ với căn bậc hai. Muốn chu kỳ gấp đôi phải tăng khối lượng (hoặc chiều dài) gấp bốn. Phương án "gấp đôi" luôn có mặt và luôn sai.',
        pitfall: 'Cho rằng biên độ ảnh hưởng chu kỳ. Với dao động điều hòa, nó không ảnh hưởng.',
      },
      {
        id: 'osc.energy',
        name: 'Năng lượng trong dao động',
        tell: [
          'Đề hỏi động năng, thế năng tại một li độ',
          'Có cụm "tại vị trí có li độ bằng nửa biên độ"',
        ],
        method:
          'Cơ năng W = ½kA² không đổi. Tại li độ x, thế năng W_t = ½kx², động năng là phần còn lại. Mọi câu hỏi loại này chỉ là phép trừ, không cần công thức riêng.',
        steps: [
          { action: 'Viết cơ năng toàn phần theo biên độ.', why: 'Đây là hằng số của bài toán.' },
          { action: 'Viết thế năng tại li độ đang xét.', why: 'Thế năng tỉ lệ với bình phương li độ.' },
          { action: 'Động năng bằng cơ năng trừ thế năng.', why: 'Bảo toàn năng lượng, không cần công thức mới.' },
          { action: 'Lập tỉ số nếu đề hỏi tỉ lệ.', why: 'Triệt tiêu k và A, còn lại quan hệ thuần giữa x và A.' },
        ],
        trick:
          'Tại x = A/2, thế năng bằng 1/4 cơ năng và động năng bằng 3/4. Tại x = A/√2, hai loại năng lượng bằng nhau. Hai mốc này xuất hiện rất nhiều trong đề.',
        pitfall: 'Cho rằng tại x = A/2 thì động năng bằng nửa cơ năng. Quan hệ là bình phương, không phải tuyến tính.',
      },
      {
        id: 'osc.wave',
        name: 'Sóng cơ và giao thoa',
        tell: [
          'Đề nói về bước sóng, tốc độ truyền sóng, hai nguồn kết hợp',
          'Hỏi số điểm cực đại, cực tiểu',
        ],
        method:
          'Mọi bài sóng quy về hiệu đường đi. Cực đại khi hiệu đường đi bằng số nguyên lần bước sóng; cực tiểu khi bằng số bán nguyên lần. Đây là toàn bộ lý thuyết giao thoa gói trong một câu.',
        steps: [
          { action: 'Tính bước sóng λ = v/f.', why: 'Mọi điều kiện giao thoa đều biểu diễn qua λ.' },
          { action: 'Viết hiệu đường đi d₂ − d₁ tại điểm đang xét.', why: 'Đây là đại lượng quyết định điểm đó dao động mạnh hay yếu.' },
          { action: 'Áp điều kiện: cực đại d₂ − d₁ = kλ; cực tiểu = (k + 0,5)λ.', why: 'Hai công thức này bao trọn mọi câu hỏi giao thoa.' },
          { action: 'Với câu đếm số điểm: giới hạn k bằng độ dài đoạn cần xét.', why: 'Số điểm là số giá trị nguyên k thỏa mãn bất phương trình.' },
        ],
        trick:
          'Số cực đại trên đoạn nối hai nguồn cách nhau L là số giá trị nguyên k thỏa −L/λ < k < L/λ. Đếm số nguyên trong khoảng là xong, không cần vẽ hình.',
        pitfall: 'Nhầm hai nguồn cùng pha với ngược pha — điều kiện cực đại và cực tiểu đổi chỗ cho nhau.',
      },
    ],
    secrets: [
      {
        title: 'Vẽ vòng tròn lượng giác',
        body: 'Mọi bài dao động điều hòa đều là một chuyển động tròn đều chiếu xuống trục. Vẽ vòng tròn và đánh dấu vị trí là cách nhanh nhất trả lời câu hỏi về thời gian và pha.',
        when: 'Câu hỏi về thời gian ngắn nhất đi từ vị trí này tới vị trí kia.',
      },
      {
        title: 'Lập tỉ số thay vì tính số',
        body: 'Rất nhiều câu chỉ hỏi "gấp mấy lần". Lập tỉ số hai biểu thức làm mọi hằng số triệt tiêu, và bạn không cần biết giá trị k, m, hay g.',
        when: 'Đề hỏi quan hệ tỉ lệ chứ không hỏi giá trị.',
      },
      {
        title: 'Nhớ ba mốc đặc biệt',
        body: 'x = 0 (động năng cực đại), x = A (thế năng cực đại), x = A/√2 (hai năng lượng bằng nhau). Ba mốc này trả lời phần lớn câu hỏi năng lượng mà không cần tính.',
        when: 'Câu hỏi năng lượng ở các vị trí đặc biệt.',
      },
    ],
  },
  {
    topicId: 'science.physics.electricity',
    bigQuestion: 'Dòng điện đi theo đường nào, và ở mỗi đoạn thì hiệu điện thế rơi bao nhiêu?',
    patterns: [
      {
        id: 'ele.circuit',
        name: 'Mạch điện một chiều',
        tell: [
          'Có sơ đồ mạch với các điện trở nối tiếp hoặc song song',
          'Đề hỏi cường độ dòng điện, hiệu điện thế, công suất',
        ],
        method:
          'Rút gọn mạch về một điện trở tương đương, tính dòng chính, rồi đi ngược trở lại phân phối dòng và hiệu điện thế cho từng nhánh. Nối tiếp thì dòng chung, song song thì hiệu điện thế chung — hai câu này quyết định mọi bước.',
        steps: [
          { action: 'Nhận diện các cụm nối tiếp và song song.', why: 'Rút gọn sai cấu trúc thì mọi số sau đều sai.' },
          { action: 'Tính điện trở tương đương từ trong ra ngoài.', why: 'Cụm sâu nhất phải gộp trước.' },
          { action: 'Tính dòng chính bằng định luật Ohm cho toàn mạch.', why: 'Đây là điểm xuất phát để phân phối ngược.' },
          { action: 'Đi ngược lại: nối tiếp giữ nguyên dòng, song song giữ nguyên hiệu điện thế.', why: 'Hai quy tắc này đủ để tìm mọi đại lượng còn lại.' },
        ],
        trick:
          'Hai điện trở song song: R = R₁R₂/(R₁+R₂), luôn NHỎ HƠN cả hai. Kiểm tra nhanh này bắt được lỗi nhầm nối tiếp với song song ngay lập tức.',
        pitfall: 'Cộng điện trở song song như nối tiếp. Kết quả lớn hơn cả hai là dấu hiệu sai chắc chắn.',
      },
      {
        id: 'ele.power',
        name: 'Công suất và điện năng tiêu thụ',
        tell: [
          'Đề hỏi công suất, nhiệt lượng tỏa ra, hoặc tiền điện',
          'Có thiết bị ghi 220V — 1000W',
        ],
        method:
          'Ba dạng của cùng một công thức: P = UI = I²R = U²/R. Chọn dạng chứa hai đại lượng bạn đã biết. Với bài nhiệt lượng, nhớ Q = Pt và đổi giờ ra giây.',
        steps: [
          { action: 'Xác định hai đại lượng đã biết trong ba đại lượng U, I, R.', why: 'Chúng chỉ thẳng ra công thức nào dùng được.' },
          { action: 'Chọn dạng công thức tương ứng.', why: 'Tránh phải tính thêm một đại lượng trung gian.' },
          { action: 'Với điện năng: A = Pt, đổi kWh nếu đề hỏi tiền điện.', why: '1 kWh = 1000W trong 1 giờ; đơn vị này là của hóa đơn, không phải của SI.' },
          { action: 'Kiểm tra thiết bị có hoạt động đúng hiệu điện thế định mức không.', why: 'Nếu không, công suất thực khác công suất ghi trên nhãn.' },
        ],
        trick:
          'Số ghi trên thiết bị là công suất ĐỊNH MỨC, chỉ đạt khi dùng đúng hiệu điện thế định mức. Đề rất hay cho bóng 220V mắc vào nguồn 110V rồi hỏi công suất thực.',
        pitfall: 'Lấy thẳng công suất ghi trên nhãn khi hiệu điện thế thực khác định mức.',
      },
      {
        id: 'ele.magnetic',
        name: 'Từ trường và cảm ứng điện từ',
        tell: [
          'Có nam châm, khung dây, hoặc dây dẫn mang dòng điện',
          'Đề hỏi chiều dòng điện cảm ứng hoặc lực từ',
        ],
        method:
          'Định luật Lenz: dòng cảm ứng luôn chống lại nguyên nhân sinh ra nó. Xác định từ thông đang tăng hay giảm, rồi suy ra chiều dòng cảm ứng theo hướng chống lại sự thay đổi đó.',
        steps: [
          { action: 'Xác định chiều từ trường ban đầu qua khung.', why: 'Đây là mốc để nói tăng hay giảm.' },
          { action: 'Xác định từ thông đang tăng hay giảm.', why: 'Chỉ sự THAY ĐỔI mới sinh ra dòng cảm ứng.' },
          { action: 'Áp định luật Lenz: nếu từ thông tăng, dòng cảm ứng sinh từ trường ngược lại và ngược lại.', why: 'Đây là toàn bộ nội dung định luật.' },
          { action: 'Dùng quy tắc nắm tay phải để chuyển từ chiều từ trường sang chiều dòng điện.', why: 'Chiều từ trường đã biết, nhưng đề hỏi chiều dòng điện — quy tắc này là cầu nối máy móc giữa hai thứ đó.' },
        ],
        trick:
          'Định luật Lenz chỉ là bảo toàn năng lượng: nếu dòng cảm ứng hỗ trợ thay đổi thay vì chống lại, ta sẽ có chuyển động vĩnh cửu. Hiểu vậy thì không bao giờ nhớ nhầm chiều.',
        pitfall: 'Nghĩ rằng từ trường mạnh sinh ra dòng cảm ứng. Từ trường KHÔNG ĐỔI, dù mạnh đến đâu, cũng không sinh dòng.',
      },
    ],
    secrets: [
      {
        title: 'Vẽ lại mạch cho gọn',
        body: 'Sơ đồ trong đề thường vẽ rối để giấu cấu trúc. Vẽ lại theo cách của mình, kéo các điểm cùng điện thế về một chỗ, thì nối tiếp và song song lộ ra ngay.',
        when: 'Mạch có nhiều hơn ba điện trở.',
      },
      {
        title: 'Kiểm tra bằng độ lớn',
        body: 'Điện trở tương đương của mạch song song phải nhỏ hơn điện trở nhỏ nhất; của mạch nối tiếp phải lớn hơn điện trở lớn nhất. Hai phép kiểm tra này bắt được gần như mọi lỗi rút gọn.',
        when: 'Sau mỗi bước rút gọn mạch.',
      },
      {
        title: 'Đọc kỹ "định mức"',
        body: 'Mọi con số ghi trên thiết bị điện đều là giá trị định mức. Chúng chỉ đúng khi thiết bị hoạt động đúng điều kiện định mức. Đề khai thác chỗ này liên tục.',
        when: 'Bài có thiết bị ghi thông số.',
      },
    ],
  },
  {
    topicId: 'science.physics.modern',
    bigQuestion: 'Hiện tượng này giải thích được bằng sóng hay bắt buộc phải dùng hạt?',
    patterns: [
      {
        id: 'mod.photon',
        name: 'Lượng tử ánh sáng và hiện tượng quang điện',
        tell: [
          'Đề nói về photon, công thoát, giới hạn quang điện',
          'Chiếu ánh sáng vào kim loại',
        ],
        method:
          'Năng lượng photon ε = hf = hc/λ. Hiện tượng quang điện xảy ra khi và chỉ khi ε ≥ A (công thoát), tức λ ≤ λ₀. Cường độ sáng KHÔNG quyết định có xảy ra hay không — nó chỉ quyết định số electron bật ra.',
        steps: [
          { action: 'Tính năng lượng photon từ bước sóng.', why: 'Đây là đại lượng quyết định duy nhất.' },
          { action: 'So sánh với công thoát của kim loại.', why: 'Nhỏ hơn thì không có hiện tượng, dù chiếu mạnh đến đâu.' },
          { action: 'Nếu có hiện tượng: động năng cực đại = ε − A.', why: 'Phần năng lượng dư sau khi thắng lực liên kết.' },
          { action: 'Đổi eV sang J nếu cần (1 eV = 1,6·10⁻¹⁹ J).', why: 'Công thoát thường cho bằng eV, còn công thức dùng J.' },
        ],
        trick:
          'Tăng cường độ sáng làm tăng SỐ electron bật ra nhưng không đổi động năng cực đại. Tăng tần số mới làm tăng động năng. Đây là điểm mấu chốt phân biệt thuyết sóng với thuyết hạt, và đề hỏi rất nhiều.',
        pitfall: 'Cho rằng chiếu đủ lâu hoặc đủ mạnh thì kim loại nào cũng bật electron.',
      },
      {
        id: 'mod.atom',
        name: 'Mẫu nguyên tử Bo và quang phổ',
        tell: [
          'Đề nói về mức năng lượng, quỹ đạo dừng, vạch quang phổ',
          'Hỏi bước sóng của bức xạ phát ra',
        ],
        method:
          'Nguyên tử chỉ tồn tại ở các mức năng lượng rời rạc. Khi chuyển từ mức cao xuống mức thấp, nó phát ra một photon có năng lượng đúng bằng hiệu hai mức: hf = E_cao − E_thấp.',
        steps: [
          { action: 'Xác định mức đầu và mức cuối của bước chuyển.', why: 'Hiệu của chúng là toàn bộ năng lượng photon.' },
          { action: 'Tính hiệu năng lượng.', why: 'Chú ý dấu: phát xạ khi chuyển xuống, hấp thụ khi chuyển lên.' },
          { action: 'Đổi sang bước sóng bằng λ = hc/ΔE.', why: 'Đề thường hỏi bước sóng chứ không hỏi năng lượng.' },
          { action: 'Kiểm tra bước sóng nằm trong vùng nào của quang phổ.', why: 'Nhiều câu hỏi thực chất hỏi vạch đó nhìn thấy được hay không.' },
        ],
        trick:
          'Số vạch tối đa khi nguyên tử từ mức n về mức cơ bản là n(n−1)/2 — chính là số cặp mức. Công thức tổ hợp này trả lời trực tiếp một dạng câu quen thuộc.',
        pitfall: 'Nhầm chiều: chuyển lên mức cao là HẤP THỤ photon, chuyển xuống mới là phát xạ.',
      },
      {
        id: 'mod.nuclear',
        name: 'Hạt nhân và phóng xạ',
        tell: [
          'Có ký hiệu hạt nhân dạng ᴬZX',
          'Đề nói về chu kỳ bán rã, phản ứng hạt nhân, năng lượng liên kết',
        ],
        method:
          'Mọi phản ứng hạt nhân bảo toàn số khối A và số proton Z. Với phóng xạ, số hạt còn lại N = N₀·2^(−t/T) — một cấp số nhân với công bội 1/2 mỗi chu kỳ bán rã.',
        steps: [
          { action: 'Với phản ứng: cân bằng tổng A và tổng Z ở hai vế.', why: 'Hai định luật bảo toàn này xác định hạt còn thiếu.' },
          { action: 'Với phóng xạ: đếm số chu kỳ bán rã đã trôi qua.', why: 'Mỗi chu kỳ chia đôi một lần — đếm rồi chia là xong.' },
          { action: 'Với năng lượng: tính độ hụt khối rồi nhân c².', why: 'Năng lượng liên kết đến từ phần khối lượng bị hụt.' },
          { action: 'Chú ý năng lượng liên kết RIÊNG là chia cho số nuclon.', why: 'Đại lượng này mới dùng để so sánh độ bền giữa các hạt nhân.' },
        ],
        trick:
          'Sau n chu kỳ bán rã còn 1/2ⁿ. Sau 1 chu kỳ còn 50%, sau 2 còn 25%, sau 3 còn 12,5%. Thuộc ba mốc này thì phần lớn câu phóng xạ giải trong đầu.',
        pitfall: 'Nhầm năng lượng liên kết với năng lượng liên kết riêng khi so sánh độ bền vững của hạt nhân.',
      },
    ],
    secrets: [
      {
        title: 'Nhớ hai hằng số',
        body: 'h = 6,625·10⁻³⁴ J·s và c = 3·10⁸ m/s. Tích hc ≈ 1,9875·10⁻²⁵ J·m, hay khoảng 1,24 eV·μm. Con số 1,24 tiết kiệm rất nhiều thời gian đổi đơn vị.',
        when: 'Mọi bài tính năng lượng photon.',
      },
      {
        title: 'Bảo toàn A và Z là chìa khóa',
        body: 'Mọi câu về phản ứng hạt nhân đều giải được bằng hai phương trình bảo toàn. Không cần nhớ loại phản ứng — chỉ cần cân bằng hai con số.',
        when: 'Câu hỏi xác định hạt còn thiếu trong phản ứng.',
      },
      {
        title: 'Cường độ và tần số là hai chuyện',
        body: 'Đây là ranh giới giữa vật lý cổ điển và vật lý lượng tử, và đề luôn hỏi. Cường độ quyết định SỐ photon; tần số quyết định NĂNG LƯỢNG mỗi photon.',
        when: 'Mọi câu về hiện tượng quang điện.',
      },
    ],
  },
  /* ══ KHOA HỌC — HÓA HỌC ════════════════════════════════════════════ */
  {
    topicId: 'science.chemistry.general',
    bigQuestion: 'Có bao nhiêu mol chất tham gia, và tỉ lệ phản ứng nói gì về chất nào hết trước?',
    patterns: [
      {
        id: 'che.mole',
        name: 'Tính theo phương trình hóa học',
        tell: [
          'Đề cho khối lượng hoặc thể tích chất tham gia, hỏi sản phẩm',
          'Có phương trình phản ứng hoặc yêu cầu viết phương trình',
        ],
        method:
          'Mol là đơn vị duy nhất nói chuyện được với phương trình hóa học. Quy trình bất biến: đổi mọi thứ ra mol → dùng tỉ lệ hệ số → đổi ngược ra đại lượng đề hỏi. Không bao giờ tính trực tiếp trên khối lượng.',
        steps: [
          { action: 'Viết và cân bằng phương trình.', why: 'Hệ số cân bằng chính là tỉ lệ mol; sai cân bằng thì sai mọi thứ.' },
          { action: 'Đổi dữ kiện ra mol: n = m/M hoặc n = V/22,4 (khí ở đktc) hoặc n = C·V (dung dịch).', why: 'Ba công thức này bao trọn mọi cách đề cho dữ kiện.' },
          { action: 'So sánh tỉ lệ mol thực với tỉ lệ hệ số để tìm chất hết trước.', why: 'Chất hết trước quyết định lượng sản phẩm; đây là bước bị bỏ qua nhiều nhất.' },
          { action: 'Tính mol sản phẩm theo chất hết trước, rồi đổi ra đại lượng đề hỏi.', why: 'Chất dư không tham gia quyết định gì.' },
        ],
        trick:
          'Tìm chất hết trước: chia số mol mỗi chất cho hệ số của nó trong phương trình; thương nhỏ nhất là chất hết trước. Quy tắc này nhanh và không bao giờ sai.',
        pitfall: 'Cho rằng cả hai chất đều phản ứng hết. Đề cố tình cho dư một chất để kiểm tra bước này.',
      },
      {
        id: 'che.solution',
        name: 'Dung dịch và nồng độ',
        tell: [
          'Đề cho nồng độ mol, nồng độ phần trăm, hoặc khối lượng riêng',
          'Có pha loãng, trộn dung dịch',
        ],
        method:
          'Bám vào số mol chất tan — đại lượng duy nhất không đổi khi pha loãng. Nồng độ và thể tích đều đổi, nhưng tích của chúng thì giữ nguyên.',
        steps: [
          { action: 'Tính số mol chất tan ban đầu.', why: 'Đây là chiếc neo của cả bài.' },
          { action: 'Với pha loãng: dùng C₁V₁ = C₂V₂.', why: 'Chính là phát biểu "số mol không đổi".' },
          { action: 'Với trộn: cộng số mol và cộng thể tích, rồi chia.', why: 'Nồng độ không cộng được, chỉ mol và thể tích cộng được.' },
          { action: 'Chú ý chuyển đổi giữa C% và C_M cần khối lượng riêng.', why: 'Hai loại nồng độ có mẫu số khác nhau: khối lượng và thể tích.' },
        ],
        trick:
          'C_M = 10·D·C% / M. Thuộc công thức chuyển đổi này thì không phải đi vòng qua khối lượng dung dịch mỗi lần.',
        pitfall: 'Cộng nồng độ khi trộn hai dung dịch. Nồng độ là tỉ số, không cộng được.',
      },
      {
        id: 'che.balance',
        name: 'Cân bằng phản ứng oxi hóa khử',
        tell: [
          'Có sự thay đổi số oxi hóa',
          'Phản ứng có kim loại với axit mạnh, hoặc có KMnO₄, K₂Cr₂O₇',
        ],
        method:
          'Phương pháp thăng bằng electron: chất khử nhường bao nhiêu electron thì chất oxi hóa nhận đúng bấy nhiêu. Toàn bộ việc cân bằng quy về một phép tìm bội chung.',
        steps: [
          { action: 'Xác định số oxi hóa của mọi nguyên tố trước và sau phản ứng.', why: 'Chỉ nguyên tố đổi số oxi hóa mới tham gia quá trình cho nhận electron.' },
          { action: 'Viết hai quá trình: cho electron và nhận electron.', why: 'Tách riêng làm rõ số electron mỗi bên.' },
          { action: 'Nhân hệ số để số electron cho bằng số electron nhận.', why: 'Đây là nội dung của định luật bảo toàn electron.' },
          { action: 'Đưa hệ số vào phương trình, cân bằng nốt các nguyên tố còn lại và kiểm tra điện tích.', why: 'Kiểm tra cuối bắt được lỗi sót.' },
        ],
        trick:
          'Bảo toàn electron cho phép bỏ qua hoàn toàn việc viết phương trình khi bài chỉ hỏi số mol: tổng electron nhường = tổng electron nhận. Đây là mẹo mạnh nhất của chuyên đề.',
        pitfall: 'Quên cân bằng điện tích trong phản ứng ion, chỉ cân bằng nguyên tố.',
      },
    ],
    secrets: [
      {
        title: 'Ba định luật bảo toàn thay được cả trang tính',
        body: 'Bảo toàn khối lượng, bảo toàn nguyên tố, bảo toàn electron. Rất nhiều bài hóa dài giải trong ba dòng nếu chọn đúng định luật, thay vì viết ra toàn bộ chuỗi phản ứng.',
        when: 'Bài có nhiều phản ứng nối tiếp mà chỉ hỏi lượng đầu và cuối.',
      },
      {
        title: 'Đổi ra mol ngay dòng đầu',
        body: 'Mọi dữ kiện — gam, lít, nồng độ — đều đổi ra mol trước khi làm bất cứ việc gì. Đây là thói quen ngăn được phần lớn lỗi của toàn phần Hóa.',
        when: 'Ngay sau khi đọc đề.',
      },
      {
        title: 'Kiểm tra chất hết trước, luôn luôn',
        body: 'Nếu đề cho lượng của hai chất tham gia, gần như chắc chắn có một chất dư. Bỏ qua bước so sánh này là lỗi mất điểm phổ biến nhất trong phần Hóa.',
        when: 'Đề cho số liệu của từ hai chất tham gia trở lên.',
      },
    ],
  },
  {
    topicId: 'science.chemistry.inorganic',
    bigQuestion: 'Chất này thuộc nhóm nào, và nhóm đó phản ứng với những gì?',
    patterns: [
      {
        id: 'ino.metal',
        name: 'Kim loại tác dụng với axit và muối',
        tell: [
          'Có kim loại và dung dịch axit hoặc dung dịch muối',
          'Đề hỏi khí thoát ra, khối lượng chất rắn sau phản ứng',
        ],
        method:
          'Dãy hoạt động hóa học quyết định tất cả: kim loại đứng trước đẩy được kim loại đứng sau ra khỏi muối; kim loại trước H đẩy được H₂ ra khỏi axit loãng. Thuộc dãy là giải được phần lớn câu.',
        steps: [
          { action: 'Định vị các kim loại trên dãy hoạt động.', why: 'Vị trí tương đối quyết định phản ứng có xảy ra không.' },
          { action: 'Với axit loãng: chỉ kim loại trước H mới cho H₂.', why: 'Cu, Ag đứng sau H nên không tan trong HCl loãng.' },
          { action: 'Với HNO₃ hoặc H₂SO₄ đặc: sản phẩm khí khác và hầu hết kim loại đều tan.', why: 'Đây là phản ứng oxi hóa khử bởi gốc axit, không phải bởi H⁺.' },
          { action: 'Với muối: kim loại mạnh hơn đẩy kim loại yếu hơn, khối lượng chất rắn thay đổi theo hiệu khối lượng mol.', why: 'Bài toán "tăng giảm khối lượng" xây trên đúng nguyên tắc này.' },
        ],
        trick:
          'Bài toán tăng giảm khối lượng: chênh lệch khối lượng thanh kim loại chia cho hiệu khối lượng mol của hai kim loại chính là số mol phản ứng. Một dòng thay cho cả hệ phương trình.',
        pitfall: 'Cho rằng Cu không tan trong mọi axit. Cu tan trong HNO₃ và H₂SO₄ đặc nóng.',
      },
      {
        id: 'ino.oxide',
        name: 'Oxit, axit, bazơ, muối — phản ứng trao đổi',
        tell: [
          'Đề cho hai dung dịch và hỏi có phản ứng không',
          'Có kết tủa hoặc khí bay ra',
        ],
        method:
          'Phản ứng trao đổi chỉ xảy ra khi tạo ra ít nhất một trong ba thứ: kết tủa, chất khí, hoặc chất điện li yếu (nước). Không có một trong ba thì không có phản ứng, dù trộn bao lâu.',
        steps: [
          { action: 'Viết các ion có trong hai dung dịch.', why: 'Phản ứng thực chất xảy ra giữa các ion, không giữa các phân tử.' },
          { action: 'Ghép chéo các ion để tìm sản phẩm khả dĩ.', why: 'Bốn ion cho hai cặp ghép mới.' },
          { action: 'Kiểm tra sản phẩm có kết tủa, khí, hay nước không.', why: 'Đây là điều kiện duy nhất để phản ứng xảy ra.' },
          { action: 'Viết phương trình ion rút gọn nếu đề yêu cầu.', why: 'Chỉ giữ các ion thực sự tham gia.' },
        ],
        trick:
          'Bảng tính tan chỉ cần nhớ vài quy tắc: muối nitrat và muối kali, natri, amoni luôn tan; muối clorua tan trừ AgCl và PbCl₂; muối sunfat tan trừ BaSO₄, PbSO₄, CaSO₄ ít tan.',
        pitfall: 'Viết phản ứng trao đổi mà không kiểm tra sản phẩm có kết tủa hay khí. Nhiều cặp dung dịch trộn vào nhau không xảy ra gì cả.',
      },
      {
        id: 'ino.identify',
        name: 'Nhận biết và tách chất',
        tell: [
          'Đề cho vài dung dịch mất nhãn và yêu cầu nhận biết',
          'Hỏi thuốc thử phân biệt',
        ],
        method:
          'Tìm một thuốc thử cho hiện tượng KHÁC NHAU với từng chất. Chiến lược: dùng một thuốc thử chia nhóm lớn trước, rồi thuốc thử thứ hai phân biệt trong nhóm.',
        steps: [
          { action: 'Liệt kê đặc điểm riêng của từng chất.', why: 'Tìm ra chất nào có dấu hiệu độc nhất để nhận trước.' },
          { action: 'Chọn thuốc thử chia được tập hợp thành các nhóm nhỏ.', why: 'Chia đôi hiệu quả hơn thử từng cái.' },
          { action: 'Mô tả rõ hiện tượng: kết tủa màu gì, khí mùi gì, có tan lại không.', why: 'Đề chấm hiện tượng chứ không chấm tên thuốc thử.' },
          { action: 'Dùng chính chất đã nhận được làm thuốc thử cho các chất còn lại nếu có thể.', why: 'Nhiều đề yêu cầu không dùng thuốc thử ngoài.' },
        ],
        trick:
          'Ghi nhớ vài màu kết tủa then chốt: AgCl trắng, BaSO₄ trắng không tan trong axit, Cu(OH)₂ xanh lam, Fe(OH)₃ nâu đỏ, Fe(OH)₂ trắng xanh. Màu sắc là câu trả lời của phần lớn câu nhận biết.',
        pitfall: 'Chọn thuốc thử cho hiện tượng giống nhau ở hai chất — không phân biệt được gì.',
      },
    ],
    secrets: [
      {
        title: 'Dãy hoạt động là xương sống',
        body: 'K Na Ca Mg Al Zn Fe Ni Sn Pb H Cu Hg Ag Pt Au. Thuộc dãy này giải được phần lớn câu hóa vô cơ mà không cần nhớ từng phản ứng riêng lẻ.',
        when: 'Mọi câu về kim loại.',
      },
      {
        title: 'Ba điều kiện của phản ứng trao đổi',
        body: 'Kết tủa, chất khí, chất điện li yếu. Không có một trong ba thì không có phản ứng. Quy tắc này loại được rất nhiều phương án chỉ bằng một cái nhìn.',
        when: 'Câu hỏi hai dung dịch có phản ứng với nhau không.',
      },
      {
        title: 'Đặc và loãng là hai chất khác nhau',
        body: 'HNO₃ loãng và HNO₃ đặc cho sản phẩm khử khác nhau; H₂SO₄ loãng và đặc nóng cũng vậy. Đề luôn ghi rõ, và nếu bạn bỏ qua chữ đó thì cả bài sai.',
        when: 'Bài có axit HNO₃ hoặc H₂SO₄.',
      },
    ],
  },
  {
    topicId: 'science.chemistry.organic',
    bigQuestion: 'Phân tử này có nhóm chức gì, và nhóm chức đó quyết định nó phản ứng thế nào?',
    patterns: [
      {
        id: 'org.group',
        name: 'Nhận diện nhóm chức và tính chất',
        tell: [
          'Đề cho công thức cấu tạo hoặc tên gọi hợp chất hữu cơ',
          'Hỏi chất đó phản ứng được với gì',
        ],
        method:
          'Nhóm chức quyết định tính chất, mạch cacbon chỉ quyết định mức độ. Nhận ra nhóm chức là biết ngay chất đó phản ứng với những gì — không cần nhớ từng chất một.',
        steps: [
          { action: 'Tìm nhóm chức trong công thức: −OH, −CHO, −COOH, −NH₂, −COO−.', why: 'Đây là trung tâm phản ứng của phân tử.' },
          { action: 'Nhớ tính chất đặc trưng của nhóm đó.', why: 'Ancol tác dụng Na; anđehit tráng bạc; axit tác dụng bazơ và kim loại.' },
          { action: 'Kiểm tra có liên kết bội trong mạch không.', why: 'Liên kết đôi, ba cho thêm phản ứng cộng và làm mất màu brom.' },
          { action: 'Kết luận về tập hợp phản ứng chất đó tham gia.', why: 'Câu hỏi thường ở dạng "chất nào tác dụng được với cả A và B".' },
        ],
        trick:
          'Ba thuốc thử phân biệt nhanh: Na (ancol và axit sủi bọt), NaHCO₃ (chỉ axit sủi bọt), AgNO₃/NH₃ (chỉ anđehit tráng bạc). Ba thuốc thử này tách được hầu hết các nhóm chức trong chương trình.',
        pitfall: 'Cho rằng ancol tác dụng được với NaOH. Ancol không có tính axit đủ mạnh; chỉ phenol mới tác dụng với NaOH.',
      },
      {
        id: 'org.formula',
        name: 'Xác định công thức phân tử',
        tell: [
          'Đề cho khối lượng CO₂ và H₂O sau khi đốt cháy',
          'Cho phần trăm khối lượng các nguyên tố',
        ],
        method:
          'Bảo toàn nguyên tố: mọi cacbon trong chất ban đầu đi vào CO₂, mọi hiđro đi vào H₂O. Từ số mol CO₂ và H₂O suy ra tỉ lệ C:H, rồi dùng khối lượng mol để chốt công thức phân tử.',
        steps: [
          { action: 'Tính n(CO₂) và n(H₂O).', why: 'n(C) = n(CO₂) và n(H) = 2·n(H₂O).' },
          { action: 'Tính khối lượng C và H, so với khối lượng chất ban đầu để biết có oxi không.', why: 'Phần khối lượng còn thiếu chính là oxi.' },
          { action: 'Lập tỉ lệ mol C:H:O rồi rút gọn ra công thức đơn giản nhất.', why: 'Công thức phân tử là bội của công thức đơn giản nhất.' },
          { action: 'Dùng M để tìm hệ số nhân.', why: 'Không có M thì chỉ ra được công thức đơn giản nhất, chưa ra công thức phân tử.' },
        ],
        trick:
          'So sánh n(CO₂) với n(H₂O): bằng nhau thì chất có một liên kết pi hoặc một vòng (anken, xicloankan); n(H₂O) lớn hơn thì là ankan. Nhận xét này định hướng ngay loại chất.',
        pitfall: 'Quên kiểm tra chất có chứa oxi không, mặc định luôn là hiđrocacbon.',
      },
      {
        id: 'org.ester',
        name: 'Este, chất béo và phản ứng xà phòng hóa',
        tell: [
          'Có nhóm −COO− trong công thức',
          'Đề nói về xà phòng hóa, thủy phân trong NaOH',
        ],
        method:
          'Este + NaOH cho muối và ancol theo tỉ lệ 1:1 (với este đơn chức). Bảo toàn khối lượng cho phép tìm khối lượng ancol mà không cần biết nó là chất gì.',
        steps: [
          { action: 'Xác định este đơn chức hay đa chức từ số nhóm −COO−.', why: 'Số nhóm quyết định tỉ lệ mol với NaOH.' },
          { action: 'Viết phản ứng thủy phân trong môi trường kiềm.', why: 'Sản phẩm là muối của axit và ancol.' },
          { action: 'Dùng bảo toàn khối lượng: m_este + m_NaOH = m_muối + m_ancol.', why: 'Tránh phải xác định cấu tạo cụ thể của từng sản phẩm.' },
          { action: 'Với chất béo: nhớ tỉ lệ 1 mol chất béo cần 3 mol NaOH và cho 1 mol glixerol.', why: 'Chất béo là trieste của glixerol — luôn ba nhóm chức.' },
        ],
        trick:
          'Chất béo luôn cho glixerol khi thủy phân, và tỉ lệ mol chất béo : NaOH : glixerol là 1 : 3 : 1. Ba con số này giải được gần như mọi bài chất béo.',
        pitfall: 'Dùng tỉ lệ 1:1 cho chất béo. Chất béo là trieste, cần 3 mol NaOH.',
      },
    ],
    secrets: [
      {
        title: 'Nhóm chức là tất cả',
        body: 'Đừng học thuộc tính chất của từng chất hữu cơ. Học tính chất của từng NHÓM CHỨC, rồi mọi chất mang nhóm đó đều suy ra được. Số nhóm chức trong chương trình chỉ khoảng bảy.',
        when: 'Khi ôn tập cả chuyên đề hữu cơ.',
      },
      {
        title: 'Bảo toàn khối lượng cứu bài dài',
        body: 'Bài hữu cơ nhiều bước thường không cần biết cấu tạo cụ thể. Bảo toàn khối lượng giữa đầu và cuối cho ra đáp án trong hai dòng, trong khi đi theo từng phản ứng mất cả trang.',
        when: 'Bài cho tổng khối lượng và hỏi tổng khối lượng.',
      },
      {
        title: 'Đếm độ bất bão hòa',
        body: 'k = (2C + 2 + N − H)/2 cho biết phân tử có bao nhiêu liên kết pi và vòng. Với k = 0 là ankan no; k = 1 có một liên kết đôi hoặc một vòng; k = 4 thường là vòng benzen. Con số này định hướng cấu tạo rất nhanh.',
        when: 'Bài xác định công thức cấu tạo từ công thức phân tử.',
      },
    ],
  },
  /* ══ KHOA HỌC — SINH HỌC ═══════════════════════════════════════════ */
  {
    topicId: 'science.biology.cell',
    bigQuestion: 'Cấu trúc này làm được việc gì, và bộ nhiễm sắc thể thay đổi ra sao qua mỗi lần phân bào?',
    patterns: [
      {
        id: 'bio.transport',
        name: 'Vận chuyển qua màng và thẩm thấu',
        tell: [
          'Đề đặt tế bào vào dung dịch ưu trương, nhược trương hoặc đẳng trương',
          'Đề hỏi chất đi vào tế bào theo cách nào, có tốn năng lượng hay không',
        ],
        method:
          'Mọi câu vận chuyển qua màng chỉ có hai biến: chiều đi so với gradien nồng độ, và có tiêu tốn ATP hay không. Xác định hai biến đó là ra ngay loại vận chuyển, không cần nhớ danh sách ví dụ. Với thẩm thấu thì nước luôn đi từ nơi thế nước cao sang nơi thế nước thấp, tức từ nhược trương sang ưu trương.',
        steps: [
          {
            action: 'Xác định nồng độ chất tan bên trong so với bên ngoài tế bào.',
            why: 'Đây là dữ kiện quyết định chiều đi của nước; mọi kết luận sau đều treo vào bước này.',
          },
          {
            action: 'Xác định chiều di chuyển: xuôi gradien là thụ động, ngược gradien là chủ động.',
            why: 'Đi ngược gradien không thể tự xảy ra, nên bắt buộc phải có bơm tiêu tốn ATP.',
          },
          {
            action: 'Với tế bào thực vật, nhớ có thành xenlulôzơ nên chỉ co nguyên sinh chứ không vỡ.',
            why: 'Thành tế bào giữ hình dạng ngoài, đó là điểm khác biệt then chốt so với tế bào động vật.',
          },
          {
            action: 'Đối chiếu kết luận với phương án, loại các phương án nhầm giữa hai loại tế bào.',
            why: 'Đề thường trộn hiện tượng của tế bào động vật vào câu hỏi về tế bào thực vật để bẫy.',
          },
        ],
        trick:
          'Nhớ một câu duy nhất: "nước chạy về phía mặn". Nước luôn đi về phía dung dịch đặc hơn, nên chỉ cần biết bên nào đặc là biết ngay chiều đi.',
        pitfall:
          'Lấy "có prôtêin màng tham gia" làm dấu hiệu của vận chuyển chủ động. Khuếch tán tăng cường cũng dùng prôtêin kênh nhưng vẫn là thụ động.',
      },
      {
        id: 'bio.mitosis',
        name: 'Đếm nhiễm sắc thể và tính nguyên liệu phân bào',
        tell: [
          'Đề cho bộ nhiễm sắc thể 2n và nêu rõ một kì cụ thể của phân bào',
          'Đề cho số lần nguyên phân liên tiếp và hỏi nguyên liệu môi trường cung cấp',
        ],
        method:
          'Bài đếm nhiễm sắc thể không cần thuộc bảng, chỉ cần bám hai mốc: ADN nhân đôi ở kì trung gian, và tâm động tách ở kì sau. Trước khi tâm động tách thì mỗi nhiễm sắc thể là kép gồm hai crômatit; sau khi tách thì thành hai nhiễm sắc thể đơn. Mọi con số suy ra từ hai mốc này.',
        steps: [
          {
            action: 'Ghi rõ tế bào đang ở kì nào và ADN đã nhân đôi chưa.',
            why: 'Toàn bộ phép đếm phụ thuộc câu trả lời của bước này, nên viết ra thay vì nhẩm.',
          },
          {
            action: 'Xác định nhiễm sắc thể đang ở dạng kép hay đơn dựa vào việc tâm động đã tách chưa.',
            why: 'Số crômatit chỉ khác 0 khi nhiễm sắc thể còn ở dạng kép, đây là chỗ sai nhiều nhất.',
          },
          {
            action: 'Với bài tính nguyên liệu, dùng công thức (2^k − 1) × 2n cho nhiễm sắc thể đơn.',
            why: 'Bộ nhiễm sắc thể của tế bào mẹ ban đầu không do môi trường cấp, nên phải trừ đi một bộ.',
          },
          {
            action: 'Kiểm tra lại đơn vị đề hỏi: nhiễm sắc thể đơn, nhiễm sắc thể kép hay crômatit.',
            why: 'Ba đơn vị này khác nhau và đề luôn cài sẵn phương án cho cả ba để bắt lỗi đọc đề.',
          },
        ],
        trick:
          'Số crômatit ở kì đầu và kì giữa luôn bằng 2 lần số nhiễm sắc thể, và bằng 0 từ kì sau trở đi. Nhớ hai mốc này thì không cần vẽ lại sơ đồ.',
        pitfall:
          'Dùng 2^k thay cho (2^k − 1) khi tính nguyên liệu môi trường. Đây là lỗi cho ra đúng một phương án nhiễu đã được đề chuẩn bị sẵn.',
      },
      {
        id: 'bio.energy',
        name: 'Chuyển hóa năng lượng: hô hấp và quang hợp',
        tell: [
          'Đề hỏi giai đoạn nào tạo ra nhiều ATP nhất hoặc sản phẩm của từng pha',
          'Đề nhắc tới điều kiện thiếu oxi, lên men, hoặc so sánh hiệu suất năng lượng',
        ],
        method:
          'Hai quá trình này soi gương nhau: quang hợp nạp năng lượng vào chất hữu cơ, hô hấp rút năng lượng đó ra. Chỉ cần nhớ đầu vào và đầu ra của từng pha, cộng một sự thật xuyên suốt là phần lớn ATP đến từ chuỗi chuyền electron chứ không phải từ các phản ứng trực tiếp.',
        steps: [
          {
            action: 'Xác định đề đang hỏi quang hợp hay hô hấp, và pha nào của quá trình đó.',
            why: 'Hai quá trình đều có chuỗi chuyền electron nên gọi tên nhầm là chọn nhầm bào quan.',
          },
          {
            action: 'Viết ra đầu vào và đầu ra của pha đó.',
            why: 'Hầu hết câu hỏi lí thuyết chỉ là kiểm tra đúng cặp đầu vào — đầu ra này.',
          },
          {
            action: 'Với câu về lượng ATP, kiểm tra có oxi hay không trước khi tính.',
            why: 'Không có oxi thì chuỗi chuyền electron tắc, chỉ còn 2 ATP của đường phân.',
          },
          {
            action: 'Đối chiếu với bào quan tương ứng: ti thể cho hô hấp, lục lạp cho quang hợp.',
            why: 'Câu hỏi thường kết thúc bằng việc chỉ ra nơi diễn ra, nên bước này chốt đáp án.',
          },
        ],
        trick:
          'Nhớ cặp "ATP và NADPH" là sản phẩm pha sáng được pha tối dùng, còn O₂ chỉ là chất thải. Riêng cặp từ này giải được phần lớn câu quang hợp lí thuyết.',
        pitfall:
          'Cho rằng lên men không phân giải glucôzơ. Glucôzơ vẫn qua đường phân, chỉ là không phân giải hoàn toàn nên thu rất ít năng lượng.',
      },
    ],
    secrets: [
      {
        title: 'Đọc tên bào quan là đọc được chức năng',
        body: 'Hầu hết câu hỏi bào quan chỉ kiểm tra một cặp tên — chức năng. Lập bảng sáu dòng: ti thể hô hấp, lục lạp quang hợp, ribôxôm tổng hợp prôtêin, lizôxôm phân giải, Gôngi đóng gói, lưới nội chất vận chuyển. Thuộc bảng này là lấy trọn nhóm câu dễ của chuyên đề.',
        when: 'Dùng ngay khi đề hỏi "nơi diễn ra", "bào quan nào" — nhóm câu chiếm tỉ lệ lớn nhất ở mức nhận biết.',
      },
      {
        title: 'Hai mốc quyết định mọi phép đếm phân bào',
        body: 'Chỉ có hai thời điểm làm số liệu thay đổi: ADN nhân đôi ở kì trung gian và tâm động tách ở kì sau. Trước mốc hai thì nhiễm sắc thể kép, sau mốc hai thì đơn và số nhiễm sắc thể tăng gấp đôi. Không cần thuộc bảng bốn kì, chỉ cần định vị câu hỏi nằm trước hay sau hai mốc đó.',
        when: 'Dùng cho mọi câu đếm nhiễm sắc thể, crômatit hay số ADN ở một kì cụ thể.',
      },
      {
        title: 'Enzim không cho năng lượng, chỉ hạ rào cản',
        body: 'Ba phương án nhiễu quen thuộc của câu enzim là "cung cấp năng lượng", "làm đổi chiều phản ứng" và "làm tăng nhiệt độ". Cả ba đều sai vì enzim chỉ hạ năng lượng hoạt hóa. Khi mất phương hướng ở câu enzim, loại thẳng mọi phương án nói enzim tạo ra hay đổi hướng năng lượng.',
        when: 'Dùng khi gặp câu về cơ chế enzim, đặc biệt là câu hỏi vì sao enzim mất hoạt tính.',
      },
    ],
  },
  {
    topicId: 'science.biology.genetics',
    bigQuestion: 'Bố mẹ cho những loại giao tử nào, và các giao tử đó tổ hợp lại ra tỉ lệ kiểu hình bao nhiêu?',
    patterns: [
      {
        id: 'bio.dna',
        name: 'Tính toán trên phân tử ADN',
        tell: [
          'Đề cho tổng số nuclêôtit của gen kèm tỉ lệ phần trăm một loại',
          'Đề hỏi số liên kết hiđrô, số chu kì xoắn hoặc chiều dài của gen',
        ],
        method:
          'Toàn bộ bài tính ADN đứng trên đúng hai đẳng thức của nguyên tắc bổ sung: A = T, G = X, và do đó %A + %G = 50%. Từ một dữ kiện phần trăm bất kì, suy ra được cả bốn loại nuclêôtit, rồi mọi đại lượng khác chỉ là thay số vào công thức.',
        steps: [
          {
            action: 'Viết ra hai đẳng thức A = T, G = X trước khi làm bất cứ phép tính nào.',
            why: 'Hai đẳng thức này biến bốn ẩn thành hai ẩn, và đó là điều làm bài toán giải được.',
          },
          {
            action: 'Dùng %A + %G = 50% để tìm phần trăm loại còn lại.',
            why: 'Đề hầu như luôn chỉ cho một tỉ lệ và bắt thí sinh tự suy ra tỉ lệ kia qua quan hệ này.',
          },
          {
            action: 'Đổi phần trăm ra số nuclêôtit tuyệt đối bằng cách nhân với tổng số nuclêôtit.',
            why: 'Các công thức về liên kết hiđrô và chiều dài đều cần số tuyệt đối, không dùng phần trăm.',
          },
          {
            action: 'Thay vào công thức đề hỏi, ví dụ H = 2A + 3G cho tổng liên kết hiđrô.',
            why: 'Đến bước này bài toán chỉ còn là số học, mọi rủi ro sai đã nằm ở ba bước trên.',
          },
        ],
        trick:
          'Nhớ %A + %G = 50% chứ không phải 100%. Một nửa số nuclêôtit đã bị A và T chiếm, nên phần trăm của A và G cộng lại chỉ bằng nửa tổng.',
        pitfall:
          'Lấy phần trăm của một loại nhân với tổng rồi coi đó là kết quả của loại khác. Luôn kiểm tra tên loại nuclêôtit ở câu hỏi trước khi ghi đáp án.',
      },
      {
        id: 'bio.cross',
        name: 'Bài lai và tỉ lệ kiểu hình đời con',
        tell: [
          'Đề cho kiểu gen hoặc kiểu hình bố mẹ và hỏi tỉ lệ đời con',
          'Đề nhắc "trội hoàn toàn", "phân li độc lập" hoặc cho phép lai phân tích',
        ],
        method:
          'Đi theo đúng một chiều: kiểu gen bố mẹ cho giao tử nào, giao tử tổ hợp ra kiểu gen nào, kiểu gen biểu hiện thành kiểu hình nào. Với nhiều cặp gen phân li độc lập thì tính riêng từng cặp rồi nhân xác suất, nhanh hơn và ít sai hơn kẻ bảng lớn.',
        steps: [
          {
            action: 'Quy ước gen và viết kiểu gen bố mẹ ra giấy nháp.',
            why: 'Quy ước rõ ràng ngăn việc nhầm alen trội với alen lặn ở các bước sau.',
          },
          {
            action: 'Liệt kê các loại giao tử mỗi bên tạo ra và tỉ lệ của chúng.',
            why: 'Giao tử là cầu nối duy nhất giữa hai thế hệ; sai ở đây thì mọi tỉ lệ sau đều sai.',
          },
          {
            action: 'Tách từng cặp gen, tính tỉ lệ riêng rồi nhân các kết quả với nhau.',
            why: 'Phân li độc lập nghĩa là các cặp không ảnh hưởng nhau, nên xác suất nhân được.',
          },
          {
            action: 'Chuyển tỉ lệ kiểu gen sang kiểu hình theo quan hệ trội lặn của đề.',
            why: 'Đề hỏi kiểu hình chứ không hỏi kiểu gen, và trội hoàn toàn gộp AA với Aa làm một.',
          },
        ],
        trick:
          'Với n cặp gen dị hợp tự thụ và trội hoàn toàn, tỉ lệ kiểu hình luôn là (3 : 1)^n. Hai cặp cho 9 : 3 : 3 : 1 mà không cần kẻ bảng 16 ô.',
        pitfall:
          'Cộng tỉ lệ của hai cặp gen thay vì nhân. Xác suất của các sự kiện độc lập được nhân, và đây là lỗi làm hỏng cả bài hai cặp tính trạng.',
      },
      {
        id: 'bio.population',
        name: 'Cân bằng di truyền quần thể',
        tell: [
          'Đề nói quần thể đang ở trạng thái cân bằng di truyền hoặc cân bằng Hacđi – Vanbec',
          'Đề cho tỉ lệ phần trăm cá thể mang kiểu hình lặn trong quần thể',
        ],
        method:
          'Cấu trúc bài luôn là: từ kiểu hình lặn tính ra tần số alen, rồi từ tần số alen tính mọi thứ còn lại. Lý do bắt đầu từ kiểu hình lặn là vì chỉ kiểu gen đồng hợp lặn mới biểu hiện ra một kiểu hình riêng, còn hai kiểu gen trội trông giống hệt nhau.',
        steps: [
          {
            action: 'Đặt q là tần số alen lặn và nhận ra tỉ lệ kiểu hình lặn chính là q².',
            why: 'Chỉ kiểu gen aa cho kiểu hình lặn, nên số liệu đề cho tương ứng trực tiếp với q².',
          },
          {
            action: 'Lấy căn bậc hai để có q, rồi tính p = 1 − q.',
            why: 'Hai alen chiếm trọn vốn gen của locut nên tần số của chúng luôn cộng lại bằng 1.',
          },
          {
            action: 'Tính các tỉ lệ kiểu gen: AA là p², Aa là 2pq, aa là q².',
            why: 'Đây là toàn bộ nội dung công thức Hacđi – Vanbec, mọi câu hỏi đều rơi vào ba số này.',
          },
          {
            action: 'Kiểm tra tổng ba tỉ lệ có bằng 1 hay không trước khi chọn đáp án.',
            why: 'Phép kiểm tra một dòng này bắt được gần như mọi lỗi số học của cả bài.',
          },
        ],
        trick:
          'Hệ số 2 trong 2pq rất hay bị quên. Có hai cách tạo thể dị hợp — alen trội từ bố hoặc từ mẹ — nên xác suất phải nhân đôi.',
        pitfall:
          'Lấy thẳng tỉ lệ kiểu hình lặn làm tần số alen lặn. Tỉ lệ đó là q², phải khai căn mới ra q, và bỏ qua bước này thì sai toàn bộ các câu sau.',
      },
    ],
    secrets: [
      {
        title: 'Sơ đồ lai viết ra giấy, không nhẩm trong đầu',
        body: 'Bài lai có bốn tầng: kiểu gen bố mẹ, giao tử, kiểu gen đời con, kiểu hình đời con. Nhẩm trong đầu thì hầu như luôn nhảy mất một tầng, mà tầng nào mất cũng cho ra một tỉ lệ trông rất hợp lý và hoàn toàn sai. Viết bốn dòng tốn 20 giây và loại bỏ gần hết rủi ro.',
        when: 'Dùng cho mọi câu lai từ hai cặp gen trở lên, kể cả khi cảm thấy bài dễ.',
      },
      {
        title: 'Chia đôi khi gặp tần số hoán vị',
        body: 'Tần số hoán vị f là tổng của hai loại giao tử hoán vị, nên mỗi loại chỉ chiếm f/2, còn mỗi loại giao tử liên kết chiếm (1 − f)/2. Đề luôn để sẵn phương án bằng đúng f để bắt người quên chia đôi. Kiểm tra nhanh: bốn loại giao tử phải cộng lại bằng 100%.',
        when: 'Dùng ngay khi đề viết kiểu gen dạng AB/ab kèm một tần số hoán vị.',
      },
      {
        title: 'Đọc số nhóm kiểu hình để đoán quy luật',
        body: 'Tỉ lệ 9 : 3 : 3 : 1 là phân li độc lập, 9 : 7 hoặc 9 : 6 : 1 là tương tác gen, 1 : 2 : 1 là trội không hoàn toàn, 3 : 1 phân bố lệch theo giới là liên kết giới tính. Đếm số nhóm kiểu hình trước, rồi mới chọn công cụ giải — làm ngược lại sẽ dùng nhầm quy luật.',
        when: 'Dùng khi đề cho sẵn tỉ lệ đời con và hỏi ngược lại về quy luật di truyền hoặc kiểu gen bố mẹ.',
      },
    ],
  },
  {
    topicId: 'science.biology.organism',
    bigQuestion: 'Cơ thể giữ ổn định bằng cách nào, và đặc điểm này giúp sinh vật sống sót trước sức ép nào?',
    patterns: [
      {
        id: 'bio.homeostasis',
        name: 'Cân bằng nội môi và điều hòa bằng hoocmôn',
        tell: [
          'Đề cho một chỉ số của máu tăng hoặc giảm và hỏi cơ thể phản ứng thế nào',
          'Đề nhắc tên một hoocmôn cụ thể như insulin, glucagôn, ADH hay ađrênalin',
        ],
        method:
          'Mọi cơ chế điều hòa nội môi đều là một vòng ngược âm tính: bộ phận tiếp nhận phát hiện sai lệch, bộ phận điều khiển phát tín hiệu, bộ phận thực hiện kéo chỉ số về mức chuẩn. Xác định chỉ số đang lệch theo hướng nào là suy ra ngay chiều của mọi phản ứng còn lại.',
        steps: [
          {
            action: 'Ghi rõ chỉ số nào đang lệch và lệch theo hướng tăng hay giảm.',
            why: 'Toàn bộ chuỗi phản ứng của cơ thể chỉ nhằm đảo ngược đúng hướng lệch này.',
          },
          {
            action: 'Xác định hoocmôn được tiết ra để kéo chỉ số ngược trở lại.',
            why: 'Các hoocmôn đi thành cặp đối lập, nên chọn đúng một cái là loại được cái kia.',
          },
          {
            action: 'Truy ra cơ quan đích và tác động cụ thể của hoocmôn đó.',
            why: 'Phương án nhiễu thường đúng tên hoocmôn nhưng sai cơ quan đích hoặc sai tác động.',
          },
          {
            action: 'Kiểm tra kết quả cuối có đưa chỉ số về mức chuẩn hay không.',
            why: 'Nếu kết luận làm chỉ số lệch thêm thì chắc chắn đã chọn nhầm chiều điều hòa.',
          },
        ],
        trick:
          'Thuộc bốn cặp đối lập là đủ cho hầu hết câu: insulin – glucagôn cho đường huyết, ADH – bài niệu cho nước, canxitônin – parathoocmôn cho canxi, giãn – co mạch cho huyết áp.',
        pitfall:
          'Đảo vai insulin và glucagôn. Insulin hạ đường huyết còn glucagôn nâng lên; đây là cặp bị nhầm nhiều nhất trong toàn chuyên đề.',
      },
      {
        id: 'bio.evolution',
        name: 'Nhân tố tiến hóa và hình thành loài',
        tell: [
          'Đề hỏi nhân tố nào định hướng tiến hóa hoặc cung cấp nguyên liệu cho tiến hóa',
          'Đề nhắc tới cách li địa lí, cách li sinh sản hoặc quần thể có kích thước nhỏ',
        ],
        method:
          'Phân vai rành mạch là giải được: đột biến và biến dị tổ hợp cung cấp nguyên liệu nhưng vô hướng; chọn lọc tự nhiên là nhân tố duy nhất có hướng; di – nhập gen và các yếu tố ngẫu nhiên làm thay đổi tần số alen nhưng cũng vô hướng. Câu hỏi thường chỉ kiểm tra xem thí sinh có trộn lẫn các vai này không.',
        steps: [
          {
            action: 'Đọc kỹ đề đang hỏi vai trò nào: định hướng, nguyên liệu hay làm thay đổi tần số.',
            why: 'Ba vai này khác nhau và mỗi vai chỉ có một nhóm nhân tố đảm nhiệm.',
          },
          {
            action: 'Loại ngay các nhân tố vô hướng nếu đề hỏi về sự định hướng.',
            why: 'Chỉ chọn lọc tự nhiên có hướng, nên bước loại này thường để lại đúng một phương án.',
          },
          {
            action: 'Với câu hình thành loài, kiểm tra đã có cách li sinh sản hay chưa.',
            why: 'Cách li sinh sản là mốc xác nhận loài mới; thiếu nó thì mới chỉ là phân hóa trong loài.',
          },
          {
            action: 'Với quần thể nhỏ, ưu tiên xét vai trò của các yếu tố ngẫu nhiên.',
            why: 'Kích thước quần thể càng nhỏ thì biến động ngẫu nhiên càng lấn át chọn lọc.',
          },
        ],
        trick:
          'Gặp cụm từ "quần thể có kích thước nhỏ" thì gần như chắc chắn đề đang nói về các yếu tố ngẫu nhiên. Đây là tín hiệu ổn định nhất của cả chuyên đề tiến hóa.',
        pitfall:
          'Coi đột biến là nhân tố định hướng vì nó tạo ra cái mới. Tạo nguyên liệu và định hướng là hai vai khác nhau, và đột biến xảy ra hoàn toàn vô hướng.',
      },
      {
        id: 'bio.ecosystem',
        name: 'Dòng năng lượng và quan hệ trong hệ sinh thái',
        tell: [
          'Đề cho năng lượng của một bậc dinh dưỡng kèm hiệu suất sinh thái',
          'Đề mô tả hai loài sống cùng nhau và hỏi đó là kiểu quan hệ nào',
        ],
        method:
          'Với dòng năng lượng, quy tắc duy nhất là mỗi bậc chỉ nhận khoảng 10% của bậc liền trước, và sinh vật sản xuất đã là bậc 1. Với quan hệ sinh thái, chỉ cần xác định mỗi bên được lợi, bị hại hay trung tính, rồi tra vào bảng tên gọi.',
        steps: [
          {
            action: 'Đánh số bậc dinh dưỡng, bắt đầu từ sinh vật sản xuất là bậc 1.',
            why: 'Đếm nhầm bậc đầu tiên làm lệch kết quả đúng một lần nhân 10%, và đề có sẵn phương án cho lỗi đó.',
          },
          {
            action: 'Đếm số lần chuyển bậc, tức số bậc đích trừ đi 1.',
            why: 'Số lần nhân hiệu suất bằng số lần chuyển bậc chứ không bằng số thứ tự của bậc.',
          },
          {
            action: 'Nhân năng lượng ban đầu với hiệu suất đúng số lần vừa đếm.',
            why: 'Đến đây bài chỉ còn phép nhân, mọi rủi ro đã nằm ở hai bước đếm phía trên.',
          },
          {
            action: 'Với câu quan hệ sinh thái, ghi dấu lợi, hại hoặc trung tính cho từng bên rồi mới gọi tên.',
            why: 'Tên gọi chỉ là nhãn dán lên cặp dấu đó, nên xác định dấu trước thì không thể nhầm tên.',
          },
        ],
        trick:
          'Bảng dấu cho quan hệ sinh thái: cộng sinh là lợi – lợi và bắt buộc, hợp tác là lợi – lợi nhưng không bắt buộc, hội sinh là lợi – trung tính, kí sinh và ăn thịt là lợi – hại, cạnh tranh là hại – hại.',
        pitfall:
          'Đếm sinh vật sản xuất là bậc 0. Sai lệch một bậc làm kết quả lệch đúng một bậc mười, và phương án đó luôn có sẵn trong đề.',
      },
    ],
    secrets: [
      {
        title: 'Hỏi "để làm gì" là ra đáp án câu tiến hóa',
        body: 'Mọi đặc điểm thích nghi đều trả lời một sức ép cụ thể của môi trường. Túi khí của chim để bay cần nhiều oxi; con đường C₄ để giữ năng suất khi trời nóng khô; lá biến thành gai để giảm mất nước. Thay vì học thuộc từng ví dụ, hãy hỏi đặc điểm này giải quyết vấn đề gì — phương án đúng luôn là phương án nêu được vấn đề đó.',
        when: 'Dùng cho các câu hỏi vì sao một nhóm sinh vật có cấu tạo hay cơ chế đặc biệt.',
      },
      {
        title: 'Vòng ngược âm tính giải được mọi câu nội môi',
        body: 'Cơ thể luôn phản ứng theo hướng ngược lại với sai lệch: đường huyết cao thì hạ xuống, mất nước thì giữ nước lại, nhiệt độ tăng thì tỏa nhiệt. Chỉ cần đọc ra hướng lệch rồi chọn phương án đi ngược hướng đó là gần như chắc đúng, kể cả khi không nhớ chính xác tên hoocmôn.',
        when: 'Dùng khi gặp câu điều hòa nội môi mà không nhớ rõ cơ chế chi tiết.',
      },
      {
        title: 'Quy tắc 10% và cái bẫy đếm bậc',
        body: 'Năng lượng giảm mười lần qua mỗi bậc dinh dưỡng, nên chuỗi thức ăn hiếm khi dài quá năm bậc. Điều bị sai nhiều hơn cả công thức là việc đếm bậc: sinh vật sản xuất là bậc 1, nên tới bậc 3 chỉ nhân 10% đúng hai lần. Đếm bậc trên đầu ngón tay trước khi bấm máy.',
        when: 'Dùng cho mọi câu tính năng lượng hoặc sinh khối qua các bậc dinh dưỡng.',
      },
    ],
  },

  /* ══ KHOA HỌC — LỊCH SỬ ════════════════════════════════════════════ */
  {
    topicId: 'science.history.vietnam',
    bigQuestion: 'Sự kiện này xảy ra vì điều gì trước nó, và nó mở ra điều gì sau nó?',
    patterns: [
      {
        id: 'his.cause',
        name: 'Phân biệt nguyên nhân sâu xa và duyên cớ',
        tell: [
          'Câu hỏi có "nguyên nhân sâu xa", "nguyên nhân trực tiếp", "nguyên cớ"',
          'Bốn phương án đều là sự kiện có thật liên quan',
        ],
        method:
          'Nguyên nhân sâu xa là mâu thuẫn tích tụ lâu dài, tồn tại độc lập với sự kiện châm ngòi. Duyên cớ là cái cớ xảy ra ngay trước, có thể thay bằng cái khác mà kết cục không đổi. Phép thử: bỏ nó đi thì sự kiện có xảy ra không? Vẫn xảy ra → đó là duyên cớ.',
        steps: [
          { action: 'Xác định câu hỏi đang hỏi loại nguyên nhân nào.', why: 'Bốn phương án thường chứa cả hai loại.' },
          { action: 'Loại các phương án là hệ quả chứ không phải nguyên nhân.', why: 'Phương án nhiễu hay đảo ngược quan hệ thời gian.' },
          { action: 'Với nguyên nhân sâu xa: tìm mâu thuẫn cơ bản, kéo dài.', why: 'Nó thường là mâu thuẫn kinh tế hoặc mâu thuẫn giai cấp, dân tộc.' },
          { action: 'Với duyên cớ: tìm sự kiện đơn lẻ, xảy ra sát thời điểm.', why: 'Duyên cớ luôn cụ thể và gần về thời gian.' },
        ],
        trick:
          'Nguyên nhân sâu xa gần như luôn là một MÂU THUẪN; duyên cớ gần như luôn là một SỰ KIỆN. Nhìn dạng ngữ pháp của phương án là đoán được loại.',
        pitfall: 'Chọn sự kiện gần nhất về thời gian làm nguyên nhân sâu xa.',
      },
      {
        id: 'his.meaning',
        name: 'Đánh giá ý nghĩa lịch sử',
        tell: [
          'Câu hỏi có "ý nghĩa quan trọng nhất", "ý nghĩa quốc tế", "bài học"',
          'Phương án là các nhận định khái quát',
        ],
        method:
          'Phân tầng ý nghĩa: với dân tộc, với khu vực, với thế giới. Câu hỏi "quan trọng nhất" luôn có một tiêu chí ẩn — thường là tầng rộng nhất mà sự kiện thực sự chạm tới.',
        steps: [
          { action: 'Xác định phạm vi câu hỏi: trong nước hay quốc tế.', why: 'Đáp án đúng phải cùng phạm vi với câu hỏi.' },
          { action: 'Loại phương án đúng nhưng thuộc phạm vi khác.', why: 'Đây là bẫy chính của dạng này.' },
          { action: 'Loại phương án nói về sự kiện khác hoặc thời kỳ khác.', why: 'Đề hay trộn các mốc gần nhau.' },
          { action: 'Chọn phương án nêu được tính chất ĐẦU TIÊN hoặc BƯỚC NGOẶT.', why: 'Ý nghĩa lịch sử lớn thường nằm ở tính tiên phong hoặc tính chuyển hướng.' },
        ],
        trick:
          'Từ "lần đầu tiên" trong một phương án là dấu hiệu mạnh. Ý nghĩa lịch sử quan trọng nhất thường gắn với cái gì đó xảy ra lần đầu.',
        pitfall: 'Chọn ý nghĩa đúng nhưng thuộc phạm vi hẹp hơn câu hỏi (trả lời ý nghĩa dân tộc cho câu hỏi ý nghĩa quốc tế).',
      },
      {
        id: 'his.timeline',
        name: 'Sắp xếp và đối chiếu mốc thời gian',
        tell: [
          'Đề cho vài sự kiện và yêu cầu sắp xếp theo thứ tự',
          'Hỏi sự kiện nào diễn ra trước hoặc sau một sự kiện khác',
        ],
        method:
          'Neo vào các mốc lớn đã thuộc chắc rồi định vị các sự kiện nhỏ quanh chúng. Học mốc theo CHÙM sự kiện chứ không theo từng năm rời rạc — trí nhớ giữ chùm tốt hơn giữ danh sách.',
        steps: [
          { action: 'Xác định các mốc lớn trong khoảng thời gian đề hỏi.', why: 'Chúng là khung để treo các sự kiện nhỏ.' },
          { action: 'Định vị từng sự kiện là trước hay sau mốc lớn gần nhất.', why: 'Dễ hơn nhiều so với nhớ chính xác từng năm.' },
          { action: 'Dùng quan hệ nhân quả để kiểm tra thứ tự.', why: 'Kết quả không thể đứng trước nguyên nhân.' },
          { action: 'Đối chiếu với các phương án.', why: 'Thường chỉ cần xác định đúng hai sự kiện là loại được ba phương án.' },
        ],
        trick:
          'Khi không nhớ năm chính xác, hãy dùng logic nhân quả: Đảng ra đời trước rồi mới có phong trào do Đảng lãnh đạo; hiệp định ký sau khi chiến dịch kết thúc. Logic cứu được rất nhiều câu.',
        pitfall: 'Nhớ nhầm các sự kiện có năm gần nhau trong cùng một giai đoạn.',
      },
    ],
    secrets: [
      {
        title: 'Học theo chùm nhân quả',
        body: 'Đừng học từng mốc rời. Học theo chuỗi: bối cảnh → sự kiện → kết quả → hệ quả tiếp theo. Chuỗi này vừa dễ nhớ hơn, vừa trả lời được câu hỏi nguyên nhân và ý nghĩa — hai dạng chiếm phần lớn đề.',
        when: 'Ôn tập cả một giai đoạn lịch sử.',
      },
      {
        title: 'Đọc kỹ từ định lượng trong câu hỏi',
        body: '"Quan trọng nhất", "chủ yếu", "trực tiếp", "sâu xa", "quyết định" — mỗi từ này chọn ra một phương án khác nhau trong cùng bốn lựa chọn. Đề dùng chúng có chủ ý.',
        when: 'Mọi câu hỏi lịch sử có tính từ so sánh nhất.',
      },
      {
        title: 'Bốn phương án đều đúng là dấu hiệu',
        body: 'Khi cả bốn phương án đều là sự thật lịch sử, câu hỏi không hỏi đúng sai mà hỏi MỨC ĐỘ hoặc PHẠM VI. Quay lại đọc kỹ từ khóa của câu hỏi.',
        when: 'Không loại được phương án nào bằng kiến thức sự kiện.',
      },
    ],
  },
  {
    topicId: 'science.history.world',
    bigQuestion: 'Thay đổi này ở một nơi đã kéo theo thay đổi gì ở nơi khác?',
    patterns: [
      {
        id: 'wor.revolution',
        name: 'Các cuộc cách mạng và bước chuyển thời đại',
        tell: [
          'Đề nói về cách mạng tư sản, cách mạng công nghiệp, cách mạng tháng Mười',
          'Hỏi tính chất, đặc điểm, hoặc kết quả',
        ],
        method:
          'Xác định ba yếu tố: ai lãnh đạo, lật đổ cái gì, thiết lập cái gì. Ba câu trả lời này quyết định tính chất của cuộc cách mạng và phân biệt nó với các cuộc khác.',
        steps: [
          { action: 'Xác định giai cấp lãnh đạo.', why: 'Tính chất cách mạng do giai cấp lãnh đạo quyết định.' },
          { action: 'Xác định chế độ bị lật đổ.', why: 'Nó cho biết cách mạng giải quyết mâu thuẫn nào.' },
          { action: 'Xác định chế độ được thiết lập.', why: 'Đây là kết quả và cũng là tiêu chí đánh giá tính triệt để.' },
          { action: 'So sánh với các cuộc cách mạng cùng loại để thấy nét riêng.', why: 'Đề hay hỏi "khác biệt cơ bản giữa A và B".' },
        ],
        trick:
          'Cách mạng tư sản Pháp được coi là triệt để nhất vì nó xóa bỏ hoàn toàn chế độ phong kiến và giải quyết vấn đề ruộng đất cho nông dân — hai tiêu chí này là câu trả lời cho rất nhiều câu hỏi so sánh.',
        pitfall: 'Nhầm cách mạng tư sản với cách mạng vô sản khi cả hai đều lật đổ một chế độ cũ.',
      },
      {
        id: 'wor.order',
        name: 'Trật tự thế giới và quan hệ quốc tế',
        tell: [
          'Đề nói về hội nghị I-an-ta, Chiến tranh lạnh, trật tự hai cực',
          'Hỏi đặc điểm quan hệ quốc tế một giai đoạn',
        ],
        method:
          'Mỗi trật tự thế giới xác định bởi: ai là cực, dựa trên sức mạnh gì, và các nước nhỏ đứng ở đâu. Chuyển từ trật tự này sang trật tự khác luôn gắn với một biến cố lớn.',
        steps: [
          { action: 'Xác định giai đoạn và trật tự tương ứng.', why: 'Hai cực sau 1945; đa cực sau 1991.' },
          { action: 'Xác định nội dung đối đầu: quân sự, ý thức hệ, hay kinh tế.', why: 'Chiến tranh lạnh là đối đầu ý thức hệ không tiếng súng trực tiếp giữa hai siêu cường.' },
          { action: 'Liên hệ tác động tới các nước thuộc địa và đang phát triển.', why: 'Đây là góc mà đề Việt Nam quan tâm nhất.' },
          { action: 'Xác định biến cố kết thúc giai đoạn.', why: 'Liên Xô tan rã năm 1991 khép lại trật tự hai cực.' },
        ],
        trick:
          'Chiến tranh lạnh là đối đầu KHÔNG có xung đột quân sự trực tiếp giữa Mỹ và Liên Xô, nhưng có rất nhiều cuộc chiến ủy nhiệm. Phân biệt được điều này là trả lời được phần lớn câu.',
        pitfall: 'Cho rằng Chiến tranh lạnh là một cuộc chiến tranh theo nghĩa quân sự.',
      },
      {
        id: 'wor.trend',
        name: 'Xu thế toàn cầu hóa và hội nhập',
        tell: [
          'Đề nói về toàn cầu hóa, cách mạng khoa học công nghệ, các tổ chức khu vực',
          'Hỏi cơ hội và thách thức',
        ],
        method:
          'Mọi xu thế đều có hai mặt, và đề luôn hỏi mặt phù hợp với vị thế của nước đang phát triển. Khung trả lời: cơ hội về vốn, công nghệ, thị trường; thách thức về cạnh tranh, phụ thuộc, bản sắc.',
        steps: [
          { action: 'Xác định đề hỏi cơ hội hay thách thức.', why: 'Bốn phương án thường trộn cả hai.' },
          { action: 'Đặt mình vào vị thế nước đang phát triển.', why: 'Đề Việt Nam luôn nhìn từ góc này.' },
          { action: 'Loại phương án cực đoan: "mất hoàn toàn", "không còn khả năng".', why: 'Toàn cầu hóa không tước bỏ chủ quyền hay khả năng tiếp cận.' },
          { action: 'Chọn phương án nêu được tính hai mặt hoặc điều kiện đi kèm.', why: 'Nhận định cân bằng thường là nhận định đúng.' },
        ],
        trick:
          'Thách thức lớn nhất của toàn cầu hóa với nước đang phát triển luôn là NGUY CƠ TỤT HẬU nếu không nâng được nội lực. Đây là đáp án của rất nhiều câu, diễn đạt theo nhiều cách khác nhau.',
        pitfall: 'Chọn phương án phủ nhận hoàn toàn mặt tích cực của toàn cầu hóa.',
      },
    ],
    secrets: [
      {
        title: 'Nối lịch sử thế giới với lịch sử Việt Nam',
        body: 'Đề HSA rất hay hỏi tác động của một sự kiện thế giới tới Việt Nam. Học hai mảng này song song, luôn hỏi "lúc đó ở Việt Nam đang xảy ra gì", sẽ trả lời được cả một nhóm câu khó.',
        when: 'Ôn tập lịch sử thế giới hiện đại.',
      },
      {
        title: 'Loại phương án cực đoan',
        body: 'Trong lịch sử, các nhận định tuyệt đối gần như luôn sai. "Hoàn toàn", "duy nhất", "không bao giờ", "tất cả" là dấu hiệu của phương án nhiễu.',
        when: 'Câu hỏi đánh giá, nhận định.',
      },
      {
        title: 'Mốc lớn làm neo',
        body: '1789, 1917, 1945, 1947, 1991. Năm mốc này chia lịch sử thế giới cận hiện đại thành các giai đoạn rõ ràng. Thuộc chắc chúng thì mọi sự kiện khác đều định vị được.',
        when: 'Câu hỏi sắp xếp thời gian.',
      },
    ],
  },
  /* ══ KHOA HỌC — ĐỊA LÝ ═════════════════════════════════════════════ */
  {
    topicId: 'science.geography.nature',
    bigQuestion: 'Đặc điểm tự nhiên này do nhân tố nào quyết định, và nó kéo theo hệ quả gì?',
    patterns: [
      {
        id: 'nat.position',
        name: 'Vị trí địa lý và hệ quả',
        tell: [
          'Đề hỏi về vị trí, giới hạn lãnh thổ, hoặc hệ quả của vị trí',
          'Có cụm "do nằm trong vùng nội chí tuyến", "tiếp giáp Biển Đông"',
        ],
        method:
          'Vị trí quyết định ba thứ theo chuỗi: vĩ độ → nền nhiệt; tiếp giáp biển → độ ẩm; nằm trong khu vực gió mùa → tính phân mùa. Mọi đặc điểm tự nhiên của Việt Nam đều truy được về một trong ba nhánh này.',
        steps: [
          { action: 'Xác định đặc điểm đề hỏi thuộc nhánh nào: nhiệt, ẩm, hay phân mùa.', why: 'Mỗi nhánh có một nguyên nhân gốc khác nhau.' },
          { action: 'Truy ngược về yếu tố vị trí tương ứng.', why: 'Đây chính là câu trả lời cho câu hỏi "vì sao".' },
          { action: 'Loại phương án nêu nhân tố không liên quan tới nhánh đó.', why: 'Đề hay trộn nhân tố địa hình vào câu hỏi về nhiệt độ.' },
          { action: 'Kiểm tra phương án có mô tả đúng đặc điểm Việt Nam không.', why: 'Một số phương án đúng về lý thuyết nhưng sai về thực tế nước ta.' },
        ],
        trick:
          'Việt Nam nằm hoàn toàn trong vùng nội chí tuyến bán cầu Bắc, nên MỌI nơi đều có hai lần Mặt Trời lên thiên đỉnh mỗi năm. Đây là hệ quả bị hỏi nhiều nhất và cũng bị nhầm nhiều nhất.',
        pitfall: 'Quy đặc điểm phân hóa Bắc – Nam cho địa hình, trong khi nguyên nhân chính là vĩ độ và gió mùa Đông Bắc.',
      },
      {
        id: 'nat.monsoon',
        name: 'Gió mùa và phân mùa khí hậu',
        tell: [
          'Đề nói về gió mùa Đông Bắc, gió mùa Tây Nam, gió phơn',
          'Hỏi thời tiết một mùa ở một vùng cụ thể',
        ],
        method:
          'Mỗi loại gió có ba thuộc tính cần nhớ: nguồn gốc, đường đi, và tính chất khi tới nơi. Tính chất luôn phụ thuộc đường đi — qua biển thì ẩm, qua lục địa thì khô, vượt núi thì khô nóng ở sườn khuất gió.',
        steps: [
          { action: 'Xác định gió gì, thổi vào mùa nào.', why: 'Gió mùa Đông Bắc từ tháng 11 đến tháng 4; Tây Nam từ tháng 5 đến tháng 10.' },
          { action: 'Truy đường đi của khối khí.', why: 'Đường đi quyết định độ ẩm nhiều hơn nguồn gốc.' },
          { action: 'Xác định vùng đang xét nằm ở sườn đón gió hay khuất gió.', why: 'Cùng một khối khí cho hai kiểu thời tiết hoàn toàn khác ở hai sườn.' },
          { action: 'Kết luận về nhiệt và ẩm.', why: 'Đây là hai đại lượng đề hỏi.' },
        ],
        trick:
          'Nửa đầu mùa đông lạnh KHÔ (khối khí qua lục địa), nửa sau lạnh ẨM có mưa phùn (khối khí lệch ra biển, được tăng ẩm). Phân biệt hai nửa mùa đông là mấu chốt của rất nhiều câu.',
        pitfall: 'Cho rằng gió mùa Tây Nam gây mưa cho cả nước. Ở Bắc Trung Bộ nó vượt Trường Sơn và gây khô nóng.',
      },
      {
        id: 'nat.explain',
        name: 'Giải thích hiện tượng tự nhiên',
        tell: [
          'Câu hỏi bắt đầu bằng "Vì sao", "Nguyên nhân chủ yếu"',
          'Về xâm nhập mặn, lũ quét, sạt lở, khô hạn',
        ],
        method:
          'Tìm chuỗi nhân quả từ đặc điểm tự nhiên tới hiện tượng, thường qua hai đến ba mắt xích. Nguyên nhân "chủ yếu" là mắt xích gần nhất và có tác động mạnh nhất, không phải mắt xích xa nhất.',
        steps: [
          { action: 'Mô tả hiện tượng cần giải thích cho chính xác.', why: 'Xâm nhập mặn khác với ngập lụt, và có nguyên nhân khác.' },
          { action: 'Liệt kê đặc điểm tự nhiên của vùng liên quan.', why: 'Địa hình, khí hậu, thủy văn là ba nguồn nguyên nhân chính.' },
          { action: 'Nối chúng thành chuỗi nhân quả tới hiện tượng.', why: 'Chuỗi giúp phân biệt nguyên nhân trực tiếp với nguyên nhân nền.' },
          { action: 'Chọn mắt xích mạnh nhất nếu đề hỏi nguyên nhân chủ yếu.', why: 'Nhiều phương án đều là nguyên nhân, khác nhau ở mức độ.' },
        ],
        trick:
          'Đồng bằng sông Cửu Long bị xâm nhập mặn nặng vì địa hình rất thấp và nhiều cửa sông — hai đặc điểm này giải thích được gần như mọi hiện tượng thủy văn của vùng.',
        pitfall: 'Chọn nguyên nhân đúng nhưng là nguyên nhân nền, trong khi đề hỏi nguyên nhân chủ yếu hoặc trực tiếp.',
      },
    ],
    secrets: [
      {
        title: 'Ba nhân tố quyết định tất cả',
        body: 'Vĩ độ, biển, và địa hình. Gần như mọi câu hỏi giải thích trong địa lý tự nhiên Việt Nam đều truy về một hoặc hai trong ba nhân tố này. Nắm chuỗi nhân quả từ ba nhân tố ấy là đủ.',
        when: 'Mọi câu hỏi "vì sao" trong địa lý tự nhiên.',
      },
      {
        title: 'Sườn đón gió và sườn khuất gió',
        body: 'Cùng một khối khí cho hai kiểu thời tiết trái ngược ở hai sườn núi. Đây là cơ chế giải thích gió Lào, mưa Huế, và khô hạn Ninh Thuận — ba hiện tượng đề hỏi rất nhiều.',
        when: 'Câu hỏi về sự khác biệt khí hậu giữa hai vùng gần nhau.',
      },
      {
        title: 'Phân hóa Bắc–Nam khác phân hóa theo đai cao',
        body: 'Bắc–Nam là do vĩ độ và gió mùa; đai cao là do độ cao địa hình. Hai loại phân hóa này bị trộn trong phương án nhiễu rất thường xuyên.',
        when: 'Câu hỏi về phân hóa thiên nhiên.',
      },
    ],
  },
  {
    topicId: 'science.geography.economy',
    bigQuestion: 'Vùng này mạnh ở đâu, yếu ở đâu, và vì sao lại như vậy?',
    patterns: [
      {
        id: 'eco.strength',
        name: 'Thế mạnh và hạn chế của vùng',
        tell: [
          'Đề hỏi thế mạnh nổi bật, khó khăn lớn nhất của một vùng',
          'Có tên một trong bảy vùng kinh tế',
        ],
        method:
          'Phân hai nhóm nhân tố: tự nhiên (đất, khí hậu, khoáng sản, nước) và kinh tế – xã hội (lao động, hạ tầng, vốn, thị trường). Thế mạnh của một vùng luôn là sự gặp nhau của một vài nhân tố cụ thể, không phải một danh sách chung chung.',
        steps: [
          { action: 'Nhớ đặc điểm tự nhiên nổi bật nhất của vùng.', why: 'Đây thường là gốc của thế mạnh nông nghiệp và công nghiệp khai thác.' },
          { action: 'Nhớ đặc điểm kinh tế – xã hội nổi bật.', why: 'Đây là gốc của thế mạnh công nghiệp chế biến và dịch vụ.' },
          { action: 'Với câu hỏi "quyết định nhất", chọn nhóm phù hợp với ngành đang xét.', why: 'Công nghiệp Đông Nam Bộ mạnh nhờ nhân tố kinh tế – xã hội, không phải nhờ tài nguyên.' },
          { action: 'Loại phương án mô tả đặc điểm của vùng khác.', why: 'Đề trộn đặc điểm giữa các vùng rất thường xuyên.' },
        ],
        trick:
          'Nhớ theo cặp "vùng – thế mạnh độc quyền": Trung du miền núi Bắc Bộ – khoáng sản và thủy điện; Tây Nguyên – cây công nghiệp lâu năm trên đất badan; Đồng bằng sông Cửu Long – lương thực và thủy sản; Đông Nam Bộ – công nghiệp và dịch vụ.',
        pitfall: 'Quy thế mạnh công nghiệp của Đông Nam Bộ cho tài nguyên khoáng sản. Than đá ở Quảng Ninh, thuộc vùng khác.',
      },
      {
        id: 'eco.shift',
        name: 'Chuyển dịch cơ cấu kinh tế',
        tell: [
          'Đề nói về cơ cấu ngành, cơ cấu lãnh thổ, cơ cấu thành phần kinh tế',
          'Có bảng số liệu tỉ trọng qua các năm',
        ],
        method:
          'Hướng chuyển dịch chuẩn của công nghiệp hóa: khu vực I giảm tỉ trọng, khu vực II và III tăng. Nhưng phải phân biệt rõ tỉ trọng giảm với giá trị giảm — chúng hoàn toàn khác nhau.',
        steps: [
          { action: 'Đọc bảng: đang là giá trị tuyệt đối hay tỉ trọng?', why: 'Hai loại bảng cho hai kết luận khác nhau.' },
          { action: 'Tính hoặc đọc xu hướng của từng khu vực.', why: 'Xu hướng quan trọng hơn con số từng năm.' },
          { action: 'Nếu tỉ trọng giảm mà giá trị tăng: kết luận là tăng chậm hơn các khu vực khác.', why: 'Đây là dấu hiệu công nghiệp hóa, không phải suy thoái.' },
          { action: 'Đối chiếu với hướng chuyển dịch chuẩn để đánh giá.', why: 'Đề thường hỏi chuyển dịch có tích cực hay không.' },
        ],
        trick:
          'Tổng tỉ trọng ba khu vực luôn bằng 100%, nên không thể cả ba cùng tăng hoặc cùng giảm. Nhận xét này loại được ngay một phương án nhiễu quen thuộc.',
        pitfall: 'Kết luận nông nghiệp suy giảm khi thấy tỉ trọng giảm.',
      },
      {
        id: 'eco.population',
        name: 'Dân cư, lao động, đô thị hóa',
        tell: [
          'Đề nói về cơ cấu dân số, phân bố dân cư, tỉ lệ dân thành thị',
          'Hỏi thuận lợi và khó khăn của nguồn lao động',
        ],
        method:
          'Mọi đặc điểm dân cư đều có hai mặt, và đề luôn hỏi mặt phù hợp với ngữ cảnh. Dân số đông là thị trường lớn nhưng cũng là sức ép việc làm; cơ cấu vàng là cơ hội nhưng chỉ trong một giai đoạn.',
        steps: [
          { action: 'Xác định đặc điểm dân cư đang được hỏi.', why: 'Cơ cấu tuổi, phân bố, hay chất lượng lao động là ba chuyện khác nhau.' },
          { action: 'Nêu mặt thuận lợi và mặt khó khăn của đặc điểm đó.', why: 'Đề gần như luôn hỏi một trong hai.' },
          { action: 'Gắn với hệ quả cụ thể: việc làm, thu nhập, hạ tầng đô thị.', why: 'Phương án đúng thường nêu hệ quả cụ thể chứ không nêu đặc điểm.' },
          { action: 'Chú ý phân bố không đều là đặc điểm nổi bật nhất của dân cư nước ta.', why: 'Nó là gốc của cả sức ép ở đồng bằng lẫn thiếu lao động ở miền núi.' },
        ],
        trick:
          'Đồng bằng chiếm khoảng 1/4 diện tích nhưng tập trung khoảng 3/4 dân số. Hai phân số này giải thích được cả sức ép việc làm lẫn tình trạng thiếu lao động ở trung du miền núi.',
        pitfall: 'Cho rằng cơ cấu dân số vàng là trạng thái lâu dài. Nó chỉ kéo dài một giai đoạn rồi chuyển sang già hóa.',
      },
    ],
    secrets: [
      {
        title: 'Học theo vùng, không học theo ngành',
        body: 'Với mỗi vùng, nắm một đặc điểm tự nhiên nổi bật và một thế mạnh kinh tế đi kèm. Bảy cặp là đủ cho phần lớn câu hỏi, và bền hơn nhiều so với học danh sách ngành.',
        when: 'Ôn tập địa lý kinh tế – xã hội.',
      },
      {
        title: 'Tự nhiên hay kinh tế – xã hội',
        body: 'Câu hỏi "nhân tố quyết định nhất" luôn phân biệt hai nhóm này. Công nghiệp chế biến và dịch vụ do nhân tố kinh tế – xã hội quyết định; nông nghiệp và khai khoáng do nhân tố tự nhiên.',
        when: 'Câu hỏi về nhân tố phát triển của một ngành.',
      },
      {
        title: 'Đọc kỹ "chủ yếu" và "quyết định"',
        body: 'Nhiều phương án đều là nhân tố có thật. Từ định lượng trong câu hỏi mới chọn ra đúng một phương án. Đây là chỗ phân loại của phần Địa lý.',
        when: 'Bốn phương án đều đúng về mặt sự kiện.',
      },
    ],
  },
  {
    topicId: 'science.geography.data',
    bigQuestion: 'Bảng số liệu này phù hợp với dạng biểu đồ nào, và nó cho phép kết luận gì?',
    patterns: [
      {
        id: 'dat.chart',
        name: 'Chọn dạng biểu đồ',
        tell: [
          'Đề cho bảng số liệu và hỏi "biểu đồ nào thích hợp nhất"',
          'Có yêu cầu thể hiện cơ cấu, tốc độ tăng trưởng, hoặc quy mô',
        ],
        method:
          'Đọc TỪ KHÓA của yêu cầu, rồi đếm số mốc thời gian. Hai thông tin này xác định duy nhất một dạng biểu đồ — không cần suy nghĩ thêm.',
        steps: [
          { action: 'Tìm từ khóa: cơ cấu, tốc độ tăng trưởng, quy mô, hay so sánh.', why: 'Từ khóa quyết định nhóm biểu đồ.' },
          { action: 'Đếm số mốc thời gian trong bảng.', why: 'Cơ cấu với ≤3 mốc là tròn; ≥4 mốc là miền.' },
          { action: 'Đếm số đơn vị khác nhau trong bảng.', why: 'Hai đơn vị khác nhau bắt buộc dùng biểu đồ kết hợp.' },
          { action: 'Chốt dạng biểu đồ và kiểm tra lại với yêu cầu.', why: 'Một phép đối chiếu cuối tránh chọn nhầm.' },
        ],
        trick:
          'Bảng quy đổi cố định: cơ cấu ≤3 năm → tròn; cơ cấu ≥4 năm → miền; tốc độ tăng trưởng → đường; so sánh quy mô → cột; hai đơn vị → kết hợp cột và đường. Thuộc bảng này là làm đúng 100% dạng câu.',
        pitfall: 'Chọn biểu đồ tròn cho bảng có 5 mốc thời gian. Sẽ phải vẽ 5 hình tròn, không so sánh được xu hướng.',
      },
      {
        id: 'dat.calc',
        name: 'Xử lý số liệu',
        tell: [
          'Đề yêu cầu tính tỉ trọng, tốc độ tăng trưởng, bình quân đầu người, mật độ',
          'Câu hỏi có "bao nhiêu phần trăm", "bao nhiêu kg/người"',
        ],
        method:
          'Bốn công thức bao trọn dạng này: tỉ trọng = bộ phận/tổng ×100; tốc độ tăng trưởng = năm sau/năm gốc ×100; bình quân = tổng/số dân; mật độ = dân số/diện tích. Khó không nằm ở công thức mà ở ĐƠN VỊ.',
        steps: [
          { action: 'Xác định công thức cần dùng từ câu hỏi.', why: 'Bốn công thức, mỗi câu chỉ dùng một.' },
          { action: 'Đổi mọi số liệu về cùng hệ đơn vị trước khi tính.', why: 'Triệu tấn và nghìn người là nguồn sai lớn nhất.' },
          { action: 'Tính và làm tròn theo yêu cầu.', why: 'Đáp án trắc nghiệm thường đã làm tròn.' },
          { action: 'Kiểm tra kết quả có hợp lý về độ lớn không.', why: 'Bình quân lương thực 0,5 kg/người là dấu hiệu quên đổi tấn ra kilôgam.' },
        ],
        trick:
          'Tốc độ tăng trưởng lấy năm gốc = 100%. Nếu đề hỏi "tăng bao nhiêu phần trăm" thì phải TRỪ 100 khỏi kết quả. Hai câu hỏi này chỉ khác một chữ và cho hai đáp án khác nhau.',
        pitfall: 'Quên đổi đơn vị. Đây là nguyên nhân của gần như mọi đáp án lệch một bậc mười.',
      },
      {
        id: 'dat.read',
        name: 'Nhận xét bảng số liệu và Atlat',
        tell: [
          'Câu hỏi "Nhận xét nào sau đây đúng"',
          'Có yêu cầu đọc Atlat trang cụ thể',
        ],
        method:
          'Với nhận xét: kiểm tra từng phương án bằng số liệu, không đọc lướt. Với Atlat: đọc chú giải TRƯỚC, vì mọi thông tin của bản đồ chuyên đề đều mã hóa trong đó.',
        steps: [
          { action: 'Đọc kỹ từng phương án, xác định nó khẳng định điều gì.', why: 'Phương án nhiễu thường đúng một nửa.' },
          { action: 'Tìm đúng ô số liệu cần thiết và kiểm tra.', why: 'Không đoán; bảng đã có đủ dữ kiện.' },
          { action: 'Chú ý các phương án so sánh xu hướng chứ không so sánh giá trị.', why: '"Tăng liên tục" đòi hỏi kiểm tra mọi cặp năm liên tiếp.' },
          { action: 'Với Atlat: đọc chú giải, xác định thang màu và ký hiệu rồi mới đọc bản đồ.', why: 'Bỏ qua chú giải là đọc sai thang màu.' },
        ],
        trick:
          'Phương án chứa từ "liên tục", "luôn luôn", "cao nhất" đòi hỏi kiểm tra TOÀN BỘ dãy số liệu. Một năm ngoại lệ đủ để loại phương án đó.',
        pitfall: 'Nhận xét theo cảm nhận thị giác từ biểu đồ mà không kiểm tra số liệu.',
      },
    ],
    secrets: [
      {
        title: 'Thuộc bảng quy đổi biểu đồ',
        body: 'Cơ cấu ≤3 năm → tròn. Cơ cấu ≥4 năm → miền. Tốc độ tăng trưởng → đường. So sánh quy mô → cột. Hai đơn vị → kết hợp. Năm dòng này làm đúng toàn bộ dạng câu chọn biểu đồ, không cần suy luận.',
        when: 'Mọi câu hỏi chọn dạng biểu đồ.',
      },
      {
        title: 'Đơn vị là nơi mất điểm',
        body: 'Công thức của chuyên đề này rất đơn giản; điểm mất gần như hoàn toàn vì đơn vị. Viết rõ đơn vị ở mỗi bước và kiểm tra độ lớn kết quả trước khi tô.',
        when: 'Mọi câu tính toán trên bảng số liệu.',
      },
      {
        title: 'Đọc câu hỏi trước, đọc bảng sau',
        body: 'Bảng số liệu trong đề luôn thừa dữ liệu có chủ ý. Đọc câu hỏi trước rồi chỉ nhặt hai hoặc ba ô cần thiết, thay vì cố hiểu cả bảng.',
        when: 'Bảng có nhiều hơn ba dòng hoặc ba cột.',
      },
    ],
  },
  /* ══ KHOA HỌC — TIẾNG ANH ══════════════════════════════════════════ */
  {
    topicId: 'science.english.grammar',
    bigQuestion: 'Cấu trúc nào đang được kiểm tra ở đây, và dấu hiệu nào trong câu chỉ ra nó?',
    patterns: [
      {
        id: 'egr.tense',
        name: 'Thì và sự phối hợp thì',
        tell: [
          'Có trạng ngữ thời gian: by the time, since, for, already, yesterday',
          'Câu có hai mệnh đề với hai hành động ở hai thời điểm',
        ],
        method:
          'Tìm mốc thời gian trước, chọn thì sau. Mọi câu hỏi về thì đều có một dấu hiệu thời gian, hiển ngôn hoặc qua thì của mệnh đề còn lại. Đừng chọn theo cảm giác âm thanh.',
        steps: [
          { action: 'Gạch chân trạng ngữ thời gian hoặc thì của mệnh đề kia.', why: 'Đây là dữ kiện duy nhất quyết định đáp án.' },
          { action: 'Xác định hành động xảy ra trước hay sau mốc đó.', why: 'Trước một mốc quá khứ thì dùng quá khứ hoàn thành.' },
          { action: 'Kiểm tra chủ ngữ chủ động hay bị động.', why: 'Câu hỏi thường kiểm tra cả thì lẫn thể trong một chỗ trống.' },
          { action: 'Chọn phương án khớp cả thì và thể.', why: 'Ba phương án nhiễu thường đúng một trong hai.' },
        ],
        trick:
          'by the time + quá khứ đơn → mệnh đề chính dùng quá khứ hoàn thành. since/for → hiện tại hoàn thành. Hai cặp này chiếm phần lớn câu hỏi về thì.',
        pitfall: 'Dùng hiện tại hoàn thành với một mốc thời gian quá khứ xác định (yesterday, in 2010).',
      },
      {
        id: 'egr.clause',
        name: 'Mệnh đề quan hệ, điều kiện, rút gọn',
        tell: [
          'Có who, which, that, whose, hoặc dấu phẩy trước đại từ quan hệ',
          'Có if, unless, hoặc câu đảo ngữ Had/Were/Should',
        ],
        method:
          'Với mệnh đề quan hệ: xác định danh từ đứng trước và vai trò của nó trong mệnh đề. Với câu điều kiện: xác định thời điểm của giả thiết và thời điểm của kết quả — chúng có thể khác nhau (điều kiện hỗn hợp).',
        steps: [
          { action: 'Với mệnh đề quan hệ: tìm danh từ được thay thế.', why: 'Người dùng who, vật dùng which, sở hữu dùng whose cho cả hai.' },
          { action: 'Kiểm tra có dấu phẩy không.', why: 'Có dấu phẩy là mệnh đề không xác định — không dùng that.' },
          { action: 'Với câu điều kiện: xác định loại theo thì.', why: 'Loại 2 giả định hiện tại, loại 3 giả định quá khứ.' },
          { action: 'Kiểm tra điều kiện hỗn hợp: giả thiết quá khứ nhưng kết quả hiện tại.', why: 'Đây là dạng khó nhất và xuất hiện nhiều trong đề nâng cao.' },
        ],
        trick:
          'Đảo ngữ câu điều kiện: If I had known → Had I known; If I were → Were I; If you should → Should you. Ba khuôn này nhận ra ngay là biết loại câu điều kiện.',
        pitfall: 'Dùng that trong mệnh đề quan hệ không xác định (sau dấu phẩy). Cấu trúc này không tồn tại.',
      },
      {
        id: 'egr.error',
        name: 'Tìm lỗi sai trong câu',
        tell: [
          'Bốn phần của câu được gạch chân và đánh dấu (A), (B), (C), (D)',
          'Câu hỏi yêu cầu chọn phần cần sửa',
        ],
        method:
          'Kiểm tra theo danh sách cố định, theo thứ tự tần suất: hòa hợp chủ ngữ – động từ, thì, dạng từ, giới từ, song song. Kiểm tra có hệ thống nhanh hơn đọc cảm tính.',
        steps: [
          { action: 'Tìm chủ ngữ thật và động từ chính, kiểm tra hòa hợp số.', why: 'Đây là lỗi phổ biến nhất trong dạng này.' },
          { action: 'Kiểm tra thì có nhất quán với trạng ngữ thời gian không.', why: 'Lỗi phổ biến thứ hai sau hòa hợp chủ ngữ; trạng ngữ thời gian là bằng chứng duy nhất về thì đúng.' },
          { action: 'Kiểm tra dạng từ: chỗ cần danh từ có phải danh từ không, chỗ cần trạng từ có phải trạng từ không.', why: 'Tính từ bổ nghĩa tính từ là lỗi hay gặp.' },
          { action: 'Kiểm tra cấu trúc song song trong câu có liệt kê.', why: 'Các thành phần nối bằng and phải cùng dạng.' },
        ],
        trick:
          'The number of + danh từ số nhiều luôn đi với động từ SỐ ÍT. A number of + danh từ số nhiều đi với động từ SỐ NHIỀU. Cặp này xuất hiện gần như trong mọi đề.',
        pitfall: 'Bị đánh lừa bởi cụm từ dài xen giữa chủ ngữ và động từ. Xóa cụm đó đi thì lỗi hòa hợp lộ ra ngay.',
      },
    ],
    secrets: [
      {
        title: 'Đọc cả câu trước khi nhìn phương án',
        body: 'Bốn phương án được thiết kế để nghe đều xuôi tai. Đọc trọn câu và tự nghĩ đáp án trước khi nhìn xuống là cách duy nhất không bị chúng dẫn dắt.',
        when: 'Mọi câu chọn đáp án điền vào chỗ trống.',
      },
      {
        title: 'Dấu hiệu ngữ pháp luôn nằm ngoài chỗ trống',
        body: 'Chỗ trống không tự nói nó cần gì. Thông tin nằm ở trạng ngữ thời gian, ở thì của mệnh đề kia, ở dấu phẩy, ở giới từ đứng trước. Tìm dấu hiệu trước, chọn sau.',
        when: 'Bí giữa hai phương án.',
      },
      {
        title: 'Danh sách kiểm tra cố định cho câu tìm lỗi',
        body: 'Hòa hợp chủ ngữ – động từ, thì, dạng từ, giới từ, song song. Chạy qua năm mục này theo thứ tự nhanh hơn nhiều so với đọc lại câu vài lần.',
        when: 'Dạng câu tìm lỗi sai.',
      },
    ],
  },
  {
    topicId: 'science.english.vocabulary',
    bigQuestion: 'Từ nào đi với từ nào, và sắc thái nào hợp với câu này?',
    patterns: [
      {
        id: 'evo.collocation',
        name: 'Kết hợp từ cố định',
        tell: [
          'Bốn phương án đều đúng nghĩa nhưng chỉ một đi được với từ bên cạnh',
          'Có cụm động từ + danh từ, hoặc tính từ + giới từ',
        ],
        method:
          'Kết hợp từ là quy ước, không phải logic. Không suy ra được từ nghĩa — phải tích lũy qua đọc. Khi phân vân, đọc thầm cả cụm và chọn cụm nghe quen nhất.',
        steps: [
          { action: 'Xác định từ cố định trong câu (từ không phải chỗ trống).', why: 'Nó là từ ràng buộc chỗ trống.' },
          { action: 'Ghép lần lượt bốn phương án với từ đó.', why: 'Chỉ một cụm là kết hợp chuẩn.' },
          { action: 'Loại các cụm đúng nghĩa nhưng không tồn tại trong tiếng Anh.', why: '"Make a mistake" đúng, "do a mistake" sai dù nghĩa như nhau.' },
          { action: 'Kiểm tra giới từ đi kèm nếu có.', why: 'Nhiều câu thực chất kiểm tra giới từ chứ không kiểm tra từ chính.' },
        ],
        trick:
          'Nhóm collocation theo động từ: make (a decision, a mistake, progress), do (homework, research, business), take (a break, responsibility, place). Ba động từ này chiếm phần lớn câu hỏi kết hợp từ.',
        pitfall: 'Dịch từ tiếng Việt sang. "Học bài" không phải "study lesson"; kết hợp từ không dịch được.',
      },
      {
        id: 'evo.wordform',
        name: 'Dạng từ',
        tell: [
          'Bốn phương án là bốn dạng của cùng một gốc từ: care, careful, carefully, carelessness',
          'Chỗ trống nằm giữa các thành phần rõ ràng',
        ],
        method:
          'Nhìn vị trí ngữ pháp của chỗ trống, không nhìn nghĩa. Sau mạo từ hoặc tính từ → danh từ; trước danh từ → tính từ; bổ nghĩa cho động từ hoặc tính từ → trạng từ.',
        steps: [
          { action: 'Xác định từ đứng ngay trước và ngay sau chỗ trống.', why: 'Hai từ này quyết định loại từ cần điền.' },
          { action: 'Suy ra loại từ cần thiết.', why: 'Đây là bài toán vị trí, không phải bài toán nghĩa.' },
          { action: 'Chọn phương án đúng loại từ.', why: 'Thường chỉ còn một phương án sau bước này.' },
          { action: 'Nếu còn hai phương án cùng loại: xét nghĩa tích cực hay tiêu cực.', why: 'careless và careful đều là tính từ nhưng trái nghĩa.' },
        ],
        trick:
          'Đuôi từ tiết lộ loại từ: -tion, -ment, -ness, -ity → danh từ; -ful, -less, -ous, -ive → tính từ; -ly → trạng từ; -ise, -ify, -en → động từ. Nhận ra đuôi là xong nửa câu.',
        pitfall: 'Chọn theo nghĩa mà bỏ qua vị trí ngữ pháp. Vị trí quyết định trước, nghĩa quyết định sau.',
      },
      {
        id: 'evo.synonym',
        name: 'Đồng nghĩa và trái nghĩa trong ngữ cảnh',
        tell: [
          'Đề in đậm hoặc gạch chân một từ và hỏi CLOSEST hoặc OPPOSITE in meaning',
          'Bốn phương án là bốn từ đơn cùng loại từ với từ được hỏi',
        ],
        method:
          'Đọc cả câu để lấy ngữ cảnh, đoán nghĩa từ đó, rồi mới nhìn phương án. Cảnh giác: câu hỏi OPPOSITE luôn có ít nhất một phương án ĐỒNG nghĩa làm bẫy.',
        steps: [
          { action: 'Đọc kỹ đề: đang hỏi closest hay opposite?', why: 'Đọc nhầm là mất điểm dù hiểu đúng từ.' },
          { action: 'Đoán nghĩa từ được hỏi dựa vào ngữ cảnh.', why: 'Ngữ cảnh thường đủ để đoán ngay cả khi chưa biết từ.' },
          { action: 'Thay từng phương án vào câu.', why: 'Phép thử trực tiếp nhất: từ đúng phải giữ nguyên nghĩa của cả câu, không chỉ hợp nghĩa rời.' },
          { action: 'Với câu opposite: loại ngay phương án đồng nghĩa.', why: 'Nó luôn có mặt và luôn là bẫy.' },
        ],
        trick:
          'Tiền tố phủ định là manh mối mạnh cho câu trái nghĩa: un-, in-, im-, dis-, mis-. Nếu một phương án có tiền tố phủ định của chính từ được hỏi, khả năng cao đó là đáp án.',
        pitfall: 'Đọc lướt qua chữ OPPOSITE và chọn từ đồng nghĩa.',
      },
    ],
    secrets: [
      {
        title: 'Học từ theo cụm, không theo từ đơn',
        body: 'Ghi "make a decision" chứ đừng ghi riêng "decision". Từ vựng tiếng Anh sống trong cụm, và đề kiểm tra chính cụm chứ không kiểm tra từ rời.',
        when: 'Khi xây vốn từ dài hạn.',
      },
      {
        title: 'Đuôi từ là bản đồ',
        body: 'Nhận ra đuôi từ là biết loại từ, và biết loại từ là giải được toàn bộ dạng câu word form mà không cần biết nghĩa. Đây là nhóm câu dễ ăn điểm nhất trong phần tiếng Anh.',
        when: 'Bốn phương án là bốn dạng của cùng một gốc.',
      },
      {
        title: 'Đọc đề hai lần cho câu synonym',
        body: 'Closest và opposite chỉ khác một từ trong đề, nhưng cho hai đáp án ngược nhau. Rất nhiều điểm mất ở đây không phải vì không biết từ.',
        when: 'Mọi câu hỏi về từ đồng nghĩa, trái nghĩa.',
      },
    ],
  },
  {
    topicId: 'science.english.reading',
    bigQuestion: 'Đoạn văn khẳng định điều gì, và câu hỏi đang hỏi về đoạn nào?',
    patterns: [
      {
        id: 'ere.detail',
        name: 'Câu hỏi chi tiết',
        tell: [
          'Câu hỏi có "According to paragraph…", "The author states that…"',
          'Đáp án có thể tìm nguyên văn hoặc diễn đạt lại từ bài',
        ],
        method:
          'Định vị đoạn bằng từ khóa của câu hỏi, đọc kỹ hai đến ba câu quanh đó, rồi so với phương án. Đừng dựa vào trí nhớ sau khi đọc lướt — luôn quay lại bài.',
        steps: [
          { action: 'Nhặt từ khóa trong câu hỏi: tên riêng, số, thuật ngữ.', why: 'Từ khóa dễ định vị vì chúng hiếm khi bị diễn đạt lại.' },
          { action: 'Quét bài tìm từ khóa đó.', why: 'Nhanh hơn nhiều so với đọc lại từ đầu.' },
          { action: 'Đọc kỹ câu chứa từ khóa và một câu trước, một câu sau.', why: 'Thông tin cần thiết gần như luôn nằm trong ba câu này.' },
          { action: 'So với bốn phương án, chọn phương án diễn đạt lại đúng ý đó.', why: 'Đáp án hiếm khi trùng nguyên văn.' },
        ],
        trick:
          'Phương án đúng thường là bản DIỄN ĐẠT LẠI của câu trong bài. Phương án dùng nguyên văn từ trong bài nhưng ghép lại theo cách khác thường là bẫy.',
        pitfall: 'Chọn phương án vì thấy các từ quen thuộc từ bài, mà không kiểm tra chúng có được ghép đúng ý không.',
      },
      {
        id: 'ere.inference',
        name: 'Câu hỏi suy luận và mục đích',
        tell: [
          'Có "can be inferred", "implies", "the purpose of paragraph 2 is"',
          'Đáp án không xuất hiện trực tiếp trong bài',
        ],
        method:
          'Suy luận hợp lệ là suy luận mà văn bản bảo đảm. Với câu hỏi mục đích, hỏi: đoạn này làm gì cho lập luận chung — nêu vấn đề, đưa ví dụ, phản bác, hay kết luận?',
        steps: [
          { action: 'Xác định đoạn liên quan và vai trò của nó trong bài.', why: 'Mục đích của một đoạn chỉ hiểu được trong mạch chung.' },
          { action: 'Với câu suy luận: tìm câu trong bài làm căn cứ.', why: 'Không có căn cứ thì đó là đoán, không phải suy luận.' },
          { action: 'Loại phương án đi quá xa: thêm nguyên nhân, thêm mức độ, khái quát hóa.', why: 'Ba cách này là cách phương án nhiễu vượt quá văn bản.' },
          { action: 'Chọn phương án dè dặt nhất mà vẫn trả lời được câu hỏi.', why: 'Trong đọc hiểu, khẳng định mạnh thường sai.' },
        ],
        trick:
          'Cảnh giác với các từ tuyệt đối trong phương án: always, never, all, only, must. Văn bản học thuật hiếm khi bảo đảm được những khẳng định như vậy.',
        pitfall: 'Dùng kiến thức nền để chọn. Câu hỏi hỏi bài viết gì, không hỏi thực tế thế nào.',
      },
      {
        id: 'ere.vocab',
        name: 'Từ vựng trong bài đọc',
        tell: [
          'Câu hỏi in đậm một từ trong đoạn và hỏi nghĩa gần nhất',
          'Câu hỏi có chỉ rõ từ đó nằm ở dòng nào hoặc đoạn nào của bài',
        ],
        method:
          'Đây là câu hỏi ngữ cảnh, không phải câu hỏi từ điển. Che từ đó, đọc lại câu, tự điền một từ của mình, rồi chọn phương án gần nhất. Kỹ thuật này hiệu quả ngay cả khi bạn chưa từng gặp từ đó.',
        steps: [
          { action: 'Đọc trọn câu chứa từ, và câu trước nếu cần.', why: 'Ngữ cảnh là nguồn thông tin duy nhất khi chưa biết từ.' },
          { action: 'Tìm dấu hiệu: từ nối, dấu phẩy giải thích, ví dụ đi kèm.', why: 'Bài học thuật thường tự giải nghĩa từ khó ngay sau đó.' },
          { action: 'Tự nghĩ một từ thay thế.', why: 'Dự đoán độc lập trước khi bị bốn phương án dẫn dắt.' },
          { action: 'Thay phương án đã chọn vào câu và đọc lại.', why: 'Câu phải mượt và giữ nguyên ý.' },
        ],
        trick:
          'Từ nối chỉ ra quan hệ nghĩa: "but", "however" báo hiệu từ đó trái nghĩa với ý trước; "in other words", "that is" báo hiệu câu sau giải thích chính từ đó.',
        pitfall: 'Chọn nghĩa thông dụng nhất của từ mà bỏ qua ngữ cảnh đang dùng nghĩa chuyên ngành.',
      },
    ],
    secrets: [
      {
        title: 'Đọc câu hỏi trước khi đọc bài',
        body: 'Với bài đọc dài, lướt câu hỏi trước rồi mới đọc. Bạn sẽ đọc có mục đích và không phải đọc lại lần hai — tiết kiệm nhiều phút trong phòng thi.',
        when: 'Bài đọc dài hơn ba đoạn.',
      },
      {
        title: 'Đáp án là bản diễn đạt lại',
        body: 'Phương án đúng gần như không bao giờ trùng nguyên văn với bài. Ngược lại, phương án dùng lại nhiều từ của bài mà ghép khác ý là bẫy quen thuộc nhất.',
        when: 'Mọi câu hỏi chi tiết.',
      },
      {
        title: 'Từ tuyệt đối là dấu hiệu sai',
        body: 'always, never, all, none, only, must. Văn bản học thuật viết dè dặt, nên phương án khẳng định tuyệt đối thường vượt quá điều bài viết bảo đảm.',
        when: 'Câu hỏi suy luận, khi phân vân giữa hai phương án.',
      },
    ],
  },
];

export const PLAYBOOK_BY_TOPIC = new Map(PLAYBOOKS.map((p) => [p.topicId, p]));

/** Tra cuu mot dang bai cu the trong toan bo kho. */
export function patternOf(topicId: string, patternId: string): PatternPlaybook | undefined {
  return PLAYBOOK_BY_TOPIC.get(topicId)?.patterns.find((p) => p.id === patternId);
}
