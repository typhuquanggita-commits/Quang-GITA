/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Nối 268 bài giảng với bài luyện và bẫy thường gặp.
 *
 * VÌ SAO CẦN: đo ra 268 bài giảng trung bình chỉ 15 chữ (tiêu đề + kết quả), và
 * chỉ 33/268 bài có nối bài luyện — tức 235 bài học xong người học không biết
 * phải LÀM gì. Đó là chỗ rỗng ruột lớn nhất của hệ thống tính theo khối lượng.
 *
 * CÁCH LÀM: khớp từ khoá trong tiêu đề bài với kho 31 bài luyện và 20 phác đồ
 * lỗi. Khớp được thì gắn bài luyện đúng chủ đề; không khớp thì rơi về bài luyện
 * mặc định của chuỗi, chọn theo trục kỹ năng của chuỗi đó. Không gán bừa: mỗi
 * luật khớp dưới đây đều nêu rõ nó nhắm vào chủ đề nào.
 *
 * Chạy: npx tsx tools/noi-bai-giang.ts   (ghi thẳng vào data/lectures.ts)
 */
import {readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {LECTURE_SERIES} from '../data/lectures';
import {DRILLS} from '../data/drills';
import {ERROR_REMEDIES} from '../data/feedback';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

/** [từ khoá trong tiêu đề, mã bài luyện, bẫy thường gặp, mã phác đồ lỗi] */
const LUAT: [RegExp, string, string, string?][] = [
  [/IPA|nguyên âm|phụ âm|bảng âm/i, 'd-phonics',
   'Học thuộc ký hiệu mà không phát ra được. Ký hiệu chỉ có nghĩa khi miệng làm đúng động tác.', 'PA-02'],
  [/âm cuối|đuôi -s|đuôi -ed|nuốt âm/i, 'd-pronunciation-drill',
   'Bỏ âm cuối vì tiếng Việt không có phụ âm bật ở cuối âm tiết. Phải cố ý bật quá tay rồi mới về mức thường.', 'PA-01'],
  [/nối âm|đồng hoá|linking/i, 'd-chorus',
   'Nối âm làm mất luôn âm cuối. Phải chắc âm cuối trước rồi mới luyện nối.', 'PA-01'],
  [/trọng âm|ngữ điệu|nhịp/i, 'd-shadow',
   'Nhấn ba bốn từ trong một câu thành ra kịch. Mỗi câu chọn trước ĐÚNG MỘT từ để nhấn.', 'PA-02'],
  [/shadowing|đọc đuổi/i, 'd-shadow',
   'Đuổi theo tốc độ mà bỏ mất âm. Chậm lại tới khi âm đúng, rồi mới tăng tốc.', 'PA-02'],
  [/chép chính tả|dictation/i, 'd-dictation',
   'Chép xong không phân loại lỗi. Phải tách rõ: không biết từ, biết mà không nhận ra âm, hay bị nối âm.', 'LS-01'],
  [/nghe mở rộng|nghe nhiều|input/i, 'd-extensive-listen',
   'Nghe thụ động không nhiệm vụ thì não không có lý do giữ chú ý. Luôn gắn một việc phải làm sau khi nghe.', 'LS-02'],
  [/Listening|dự đoán|bám dấu hiệu|bẫy/i, 'd-listening-map',
   'Không đọc câu hỏi trước nên không biết cần bắt gì. Sáu mươi giây đọc trước là chỗ rẻ nhất để lấy điểm.', 'LS-02'],
  [/Anki|ghi nhớ|ôn tập|giãn cách/i, 'd-anki',
   'Nhồi một lần rồi không gặp lại. Trí nhớ cần gặp lại đúng lúc sắp quên, không cần gặp nhiều lần liền nhau.', 'VO-01'],
  [/collocation|cụm từ|đi với/i, 'd-collocation',
   'Học từ đơn lẻ rồi ghép sai. Từ trong tiếng Anh đi theo cụm cố định — ghi cả cụm, không ghi từ một mình.', 'VO-02'],
  [/sentence mining|đãi câu|câu mẫu/i, 'd-mine',
   'Lấy câu quá dài. Câu đãi về phải đủ ngắn để dùng lại được ngay trong ngày.', 'VO-02'],
  [/thì |quá khứ|hiện tại|tương lai|hoàn thành/i, 'd-grammar-notice',
   'Thuộc bảng chia thì mà nói vẫn sai, vì tiếng Việt không đánh dấu thì trên động từ. Phải luyện tới mức phản xạ.', 'GR-01'],
  [/mạo từ|a\/an|the /i, 'd-errorreview',
   'Lỗi tồn tại lâu nhất, kể cả ở người trình độ cao. Dưới 3 lỗi trên 100 từ đã là tốt.', 'GR-02'],
  [/mệnh đề|bị động|đảo ngữ|câu điều kiện|cấu trúc/i, 'd-grammar-notice',
   'Học cấu trúc LÀ GÌ mà không học nó DÙNG ĐỂ LÀM GÌ, nên không bao giờ tự nghĩ ra để dùng.', 'GR-03'],
  [/sổ lỗi|sửa lỗi|lỗi lặp/i, 'd-errorreview',
   'Sửa từng bài chứ không sửa quy tắc. Mỗi lỗi phải kèm 10 câu tự đặt ngay trong ngày.', 'GR-04'],
  [/đọc mở rộng|truyện|graded/i, 'd-graded',
   'Dừng lại tra mọi từ lạ. Đọc một mạch tới hết rồi mới tra — hiểu không đòi hỏi biết hết từ.', 'RD-01'],
  [/skim|scan|tốc độ đọc|chiến thuật đọc/i, 'd-reading-skim',
   'Đọc tuần tự từ đầu rồi hết giờ. Đọc câu hỏi trước, gạch từ khoá, rồi mới quét bài.', 'RD-02'],
  [/báo|học thuật|academic/i, 'd-news',
   'Nhảy thẳng vào bài học thuật khi nền còn yếu. Qua bài phổ thông khoa học trước.', 'RD-01'],
  [/tóm tắt|summar/i, 'd-summary',
   'Tóm tắt bằng cách cắt câu của tác giả. Phải nén bằng lời của mình thì mới là hiểu.', 'WR-01'],
  [/Task 1|biểu đồ|số liệu/i, 'd-task1',
   'Kể lại mọi con số. Chỉ chọn xu hướng chính và những điểm bất thường.', 'WR-02'],
  [/Task 2|luận|essay|lập luận/i, 'd-task2',
   'Viết thẳng không dàn ý. Bốn dòng dàn ý trước tiết kiệm nhiều hơn số phút bỏ ra.', 'WR-03'],
  [/bài mẫu|mổ xẻ|Franklin/i, 'd-model-deconstruct',
   'Chép bài mẫu thay vì mổ xẻ nó. Phải viết lại từ dàn ý rồi mới so với bản gốc.', 'WR-04'],
  [/nhật ký|journal|viết tự do/i, 'd-freewrite',
   'Sửa trong lúc viết nên cả hai đều chậm. Viết một mạch, hết giờ mới đọc lại.', 'WR-01'],
  [/Part 2|cue card/i, 'd-part2',
   'Dùng hết một phút chuẩn bị để nghĩ ý hay. Chỉ cần ba gạch đầu dòng rồi nói.', 'SP-02'],
  [/Part 3|thảo luận/i, 'd-part3',
   'Trả lời quá ngắn. Phần này đo khả năng khai triển, mỗi câu tối thiểu 40 giây.', 'SP-03'],
  [/tranh biện|debate|phản biện/i, 'd-debate',
   'Bảo vệ quan điểm mà không có bằng chứng cụ thể. Mỗi luận điểm phải có ít nhất một ví dụ thật.', 'SP-03'],
  [/4\/3\/2|trôi chảy|ngập ngừng|từ đệm/i, 'd-432',
   'Cấm từ đệm mà không tăng tốc truy xuất thì chỉ đổi thành im lặng lúng túng. Thay bằng khoảng lặng có chủ ý.', 'SP-01'],
  [/kể lại|retell|60 giây/i, 'd-retell',
   'Kể lại bằng cách dịch từ tiếng Việt. Phải bắt đầu từ khung câu tiếng Anh có sẵn.', 'SP-01'],
  [/Feynman|giảng lại|dạy lại/i, 'd-feynman',
   'Dùng thuật ngữ để che chỗ chưa hiểu. Giảng cho người ngoài ngành mới lộ ra chỗ hổng.', 'SP-04'],
  [/tự nói|self.?talk|độc thoại/i, 'd-selftalk',
   'Chỉ nghĩ trong đầu, không phát ra tiếng. Phải nói to thì cơ miệng mới học được.', 'SP-01'],
  [/gia sư|1-1|một kèm một/i, 'd-tutor',
   'Để gia sư nói nhiều hơn mình. Buổi một kèm một mà mình nói dưới một nửa là buổi giảng bài trá hình.', 'SP-04'],
  [/thi thử|mock|đề đầy đủ/i, 'd-mock',
   'Làm đề rồi không chữa. Chữa đề tốn thời gian hơn làm đề, và đó mới là chỗ lên điểm.', 'LS-02'],
  [/club|sinh hoạt|cộng đồng/i, 'd-club',
   'Đi cho có mặt mà không phát biểu. Mỗi buổi phải nói ít nhất hai lần.', 'SP-04'],
];

/*
 * Bài luyện và bẫy mặc định theo chuỗi, khi không luật từ khoá nào khớp.
 *
 * Ba biến thể theo CHẶNG, không phải một. Cùng một lỗi gốc biểu hiện khác nhau
 * ở đầu, giữa và cuối chuỗi: đầu chuỗi người học vội, giữa chuỗi họ chững lại,
 * cuối chuỗi họ tưởng đã xong. Một bẫy duy nhất cho cả chuỗi dài ba mươi bài
 * là bẫy không ai đọc tới bài thứ mười.
 */
const MAC_DINH: Record<string, {drill: string; traps: [string, string, string]}> = {
  'ls-foundation': {drill: 'd-extensive-listen', traps: [
    'Vào bài mới khi bài cũ chưa thành phản xạ. Nền móng vội là nền móng phải xây lại.',
    'Hiểu bài trên lớp rồi bỏ luyện ở nhà. Hiểu và làm được là hai việc khác nhau, cách nhau đúng phần luyện.',
    'Tưởng xong nền móng vì đã đi hết bài. Nền xong khi làm được không cần nghĩ, không phải khi đã nghe giảng.']},
  'ls-sound': {drill: 'd-shadow', traps: [
    'Luyện âm bằng mắt qua ký hiệu thay vì bằng tai và miệng. Âm phải nghe ra trước khi nói đúng.',
    'Đúng âm khi đọc chậm từng từ, sai lại khi nói cả câu. Phải luyện âm TRONG câu, không tách rời.',
    'Âm đã chuẩn trong phòng luyện nhưng hỏng khi nói với người thật. Thiếu bước chuyển sang bối cảnh có áp lực.']},
  'ls-grammar': {drill: 'd-grammar-notice', traps: [
    'Học quy tắc mà không gặp nó trong ngữ cảnh thật, nên biết luật mà vẫn nói sai.',
    'Làm đúng bài tập điền khuyết nhưng nói ra vẫn sai. Bài tập cho thời gian nghĩ, lời nói thì không.',
    'Cấu trúc khó đã đúng nhưng cấu trúc dễ lại sai trở lại. Ôn cái cũ trong lúc học cái mới.']},
  'ls-fluency': {drill: 'd-432', traps: [
    'Chờ tới khi nói đúng mới nói. Trôi chảy sinh ra từ số lần mở miệng, không từ số lần nghĩ.',
    'Nói được rồi nhưng chỉ nói được câu ngắn. Thiếu khung câu sẵn nên mỗi câu phải xây lại từ đầu.',
    'Nói dài được nhưng lặp đi lặp lại vài cấu trúc quen. Ép mình dùng cấu trúc mới dù nói chậm hơn.']},
  'ls-lexis': {drill: 'd-collocation', traps: [
    'Đếm số từ đã học thay vì đếm số từ dùng được. Vốn từ bị động không nói ra được.',
    'Sổ từ dày lên nhưng không ôn theo lịch. Từ không gặp lại đúng lúc sắp quên thì coi như chưa học.',
    'Biết nhiều cụm nhưng vẫn dùng đúng vài cụm quen. Mỗi tuần ép dùng bảy cụm mới trong bài nói.']},
  'ls-academic': {drill: 'd-news', traps: [
    'Đọc học thuật bằng vốn từ đời thường rồi nản. Phải đổi hệ vốn từ trước.',
    'Hiểu từng câu nhưng không nắm được mạch lập luận của cả bài. Đọc để tìm cấu trúc, không chỉ tìm nghĩa.',
    'Đọc được học thuật nhưng viết vẫn giọng đời thường. Đọc và viết là hai hệ khác nhau, phải luyện riêng.']},
  'ls-ielts-writing': {drill: 'd-task2', traps: [
    'Học thuộc bài mẫu. Giám khảo nhận ra bài học thuộc nhanh hơn thí sinh tưởng.',
    'Đủ ý nhưng bị chấm thấp vì thiếu xương sống đoạn. Bốn dòng dàn ý trước khi viết.',
    'Viết hay nhưng không kịp giờ. Tách hẳn hai chế độ: viết một mạch, hết giờ mới sửa.']},
  'ls-ielts-speaking': {drill: 'd-part2', traps: [
    'Chuẩn bị sẵn câu trả lời cho mọi đề. Đề bốc thăm luôn lệch khỏi thứ đã chuẩn bị.',
    'Trả lời đúng nhưng quá ngắn. Phần thi đo khả năng khai triển, không đo độ chính xác.',
    'Nói trôi nhưng phát âm tụt lại vì dồn sức cho ý. Giữ âm là việc phải làm song song, không làm sau.']},
  'ls-ielts-lr': {drill: 'd-listening-map', traps: [
    'Luyện đề mà không phân loại lỗi theo dạng câu. Không phân loại thì không biết sửa gì.',
    'Điểm lên rồi chững lại. Đó là lúc phải đổi từ luyện khối lượng sang luyện đúng dạng đang sai.',
    'Điểm cao ở nhà nhưng tụt trong phòng thi. Luyện trong điều kiện gây nhiễu, không luyện trong điều kiện lý tưởng.']},
  'ls-mindset': {drill: 'd-journal', traps: [
    'Đọc để thấy đúng rồi không đổi gì. Mô-đun tư duy chỉ có giá trị khi viết ra được một hành vi sẽ đổi.',
    'Đổi được vài ngày rồi về như cũ. Hành vi mới cần một mốc neo trong ngày, không cần thêm quyết tâm.',
    'Giữ được thói quen nhưng quên mất vì sao mình bắt đầu. Đọc lại trang viết của chính mình ở bài đầu chuỗi.']},
};

const drillIds = new Set(DRILLS.map((d) => d.id));
const codes = new Set((ERROR_REMEDIES as any[]).map((r) => r.code));

// Kiểm bảng luật trước khi dùng: luật trỏ sai thì hỏng cả 268 bài.
for (const [re, drill, , code] of LUAT) {
  if (!drillIds.has(drill)) throw new Error(`Luật ${re} trỏ tới bài luyện không có: ${drill}`);
  if (code && !codes.has(code)) throw new Error(`Luật ${re} trỏ tới mã lỗi không có: ${code}`);
}
for (const [sid, m] of Object.entries(MAC_DINH))
  if (!drillIds.has(m.drill)) throw new Error(`Mặc định của ${sid} trỏ tới bài luyện không có: ${m.drill}`);

const src = path.join(ROOT, 'data', 'lectures.ts');
let text = readFileSync(src, 'utf8');
let noi = 0;
let macDinh = 0;

for (const s of LECTURE_SERIES) {
  for (const l of s.lessons) {
    const hit = LUAT.find(([re]) => re.test(l.title) || re.test(l.outcome));
    // Chặng trong chuỗi: đầu, giữa, cuối — quyết định biến thể bẫy nào hợp.
    const chang = Math.min(2, Math.floor(((l.no - 1) / s.lessons.length) * 3));
    let [drill, trap, code]: [string, string, string | undefined] = hit
      ? [hit[1], hit[2], hit[3]]
      : [MAC_DINH[s.id].drill, MAC_DINH[s.id].traps[chang], undefined];
    if (!hit) macDinh++;

    // Chuỗi IELTS Listening & Reading gộp hai kỹ năng, nên một mặc định duy
    // nhất sẽ gán sai một nửa số bài. Tách theo kỹ năng nêu trong tiêu đề.
    if (!hit && s.id === 'ls-ielts-lr' && /reading|đọc/i.test(l.title + l.outcome)) {
      drill = 'd-reading-skim';
      trap = 'Đọc tuần tự từ đầu rồi hết giờ. Đọc câu hỏi trước, gạch từ khoá, rồi mới quét bài.';
      code = 'RD-02';
    }
    // Chuỗi Từ vựng có nhánh viết để dùng lại cụm vừa học.
    if (!hit && s.id === 'ls-lexis' && /viết|write|dùng lại/i.test(l.title + l.outcome)) {
      drill = 'd-freewrite';
      trap = 'Học cụm rồi để đó. Cụm chỉ thành của mình khi đã dùng trong câu của chính mình.';
      code = 'VO-02';
    }

    // Tìm đúng khối bài này trong tệp nguồn rồi bổ sung trường còn thiếu.
    const dau = `{no: ${l.no}, title: '${l.title.replace(/'/g, "\\'")}'`;
    const i = text.indexOf(dau);
    if (i < 0) {
      console.error(`  ! không tìm thấy bài ${s.id}#${l.no} trong nguồn`);
      continue;
    }
    const j = text.indexOf('}', i);
    let khoi = text.slice(i, j);
    if (!khoi.includes('drillId:')) khoi += `, drillId: '${drill}'`;
    if (!khoi.includes('trap:')) khoi += `, trap: ${JSON.stringify(trap)}`;
    if (code && !khoi.includes('remedyCode:')) khoi += `, remedyCode: '${code}'`;
    text = text.slice(0, i) + khoi + text.slice(j);
    noi++;
  }
}

writeFileSync(src, text, 'utf8');
console.log(
  `\n  Đã nối ${noi} bài giảng.\n` +
    `  Khớp theo từ khoá chủ đề: ${noi - macDinh}\n` +
    `  Rơi về mặc định của chuỗi: ${macDinh}\n`,
);
