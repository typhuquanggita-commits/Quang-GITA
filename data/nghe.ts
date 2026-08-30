/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/* ==========================================================================
   KỊCH BẢN NGHE — VIẾT GỐC, SINH ÂM BẰNG MÁY

   VÌ SAO TRƯỚC ĐÂY MƯỜI CHUYÊN ĐỀ NGHE KHÔNG CÓ CÂU HỎI
     Lý do ghi trong ngân hàng câu hỏi là "cần audio và đoạn văn có bản
     quyền". Nửa sau vẫn đúng — không được chép đoạn nghe của Cambridge hay
     của bất kỳ bộ đề nào. Nhưng nửa đầu thì SAI, và sai trong nhiều tháng:
     hệ thống đã có sẵn bốn giọng tiếng Anh của Piper trong máy. Giới hạn
     "máy đọc không có thanh điệu" là giới hạn của giọng TIẾNG VIỆT, và nó
     bị hiểu nhầm thành giới hạn của cả khâu sinh âm.

     Nên lối ra là: VIẾT GỐC kịch bản, rồi sinh âm bằng máy. Không chép của
     ai, và có audio thật để hỏi.

   GIỚI HẠN CỦA GIỌNG MÁY — NÓI TRƯỚC, KHÔNG GIẤU
     Giọng máy đọc rõ hơn người thật. Nó không nuốt âm như người bản ngữ
     nói nhanh, không có tiếng ồn nền tự nhiên, và ngữ điệu đều hơn. Nghĩa
     là:
       · luyện được: bắt số, bắt tên riêng, bắt chi tiết, dựng bản đồ ý,
         nghe theo tốc độ, chép chính tả
       · luyện KHÔNG đủ: đoán thái độ qua giọng, và nghe người bản ngữ nói
         nhanh trong đời thật
     Hai chuyên đề thuộc nhóm sau vẫn có câu hỏi, nhưng chúng hỏi vào chỗ
     TỪ NGỮ báo hiệu thái độ chứ không hỏi vào chỗ giọng lên xuống — vì
     giọng máy không dựng được tín hiệu đó một cách đáng tin.

   BA NÚM ĐIỀU CHỈNH ĐỘ KHÓ, VÀ CẢ BA ĐỀU THẬT
     · nhịp nói: khai bằng SỐ TỪ MỖI PHÚT mong muốn, và bộ sinh âm chạy
       hai lượt để chạm đúng con số đó trên từng giọng
     · giọng: Mỹ hay Anh-Anh, nam hay nữ
     · nhiễu: trộn tạp âm trắng ở tỉ số tín hiệu trên nhiễu cho trước
   ========================================================================== */

export const NGHE_CREED = {
  name: 'KỊCH BẢN NGHE',
  claim:
    'Kịch bản viết gốc, sinh âm bằng bốn giọng tiếng Anh có sẵn trong máy, ba núm điều chỉnh độ khó đều thật: tốc độ, giọng và nhiễu nền.',
  khongChep:
    'Không chép đoạn nghe của bất kỳ bộ đề nào. Đoạn nghe thương mại có bản quyền, và chép về là vừa phạm luật vừa khiến hệ thống không phát hành được.',
  gioiHanGiongMay:
    'Giọng máy đọc rõ hơn người thật: không nuốt âm, không ồn nền tự nhiên, ngữ điệu đều hơn. Luyện tốt phần bắt thông tin; KHÔNG thay được người thật ở phần đoán thái độ qua giọng.',
  loiCu:
    'Lý do cũ "chưa có audio" là sai — bốn giọng tiếng Anh đã nằm sẵn trong máy nhiều tháng. Giới hạn thanh điệu là của giọng tiếng Việt, và nó bị hiểu nhầm thành giới hạn của cả khâu sinh âm.',
};

export type GiongNghe = 'my-nu' | 'my-nam' | 'anh-nu' | 'anh-nam';

/** Bốn giọng, ánh xạ sang đúng tệp model đã cài trong máy. */
export const GIONG: Record<GiongNghe, {tep: string; ten: string}> = {
  'my-nu': {tep: 'en-us-lessac-medium', ten: 'Mỹ · nữ'},
  'my-nam': {tep: 'en-us-libritts-high', ten: 'Mỹ · nam'},
  'anh-nu': {tep: 'en-gb-southern_english_female-low', ten: 'Anh-Anh · nữ'},
  'anh-nam': {tep: 'en-gb-alan-low', ten: 'Anh-Anh · nam'},
};

export interface KichBanNghe {
  id: string;
  chuyenDeId: string;
  ten: string;
  /** Lời thoại tiếng Anh, viết gốc. */
  loi: string;
  giong: GiongNghe;
  /**
   * Nhịp nói MONG MUỐN, tính bằng từ mỗi phút.
   *
   * KHÔNG phải hệ số dài âm của Piper. Bản đầu khai hệ số, và nó nói dối:
   * giọng anh-nam đọc 154 từ/phút ở hệ số 1.0 còn my-nam đọc 248, nên cùng
   * một hệ số cho ra hai tốc độ khác hẳn. Kịch bản khai "nhanh" ở hệ số
   * 0.78 đo ra 200 từ/phút — đúng bằng một kịch bản khai tốc độ thường.
   *
   * Nay trường này khai ĐÍCH, và tools/sinh-am-nghe.py chạy hai lượt: lượt
   * một sinh thử rồi đo nhịp thật, lượt hai tính lại hệ số dài âm để chạm
   * đúng đích. Bài kiểm đo lại tệp đã sinh và bắt sai lệch quá 8%.
   */
  nhipTu: number;
  /** Tỉ số tín hiệu trên nhiễu, tính bằng dB. Bỏ trống là không trộn nhiễu. */
  nhieuDb?: number;
}

/* Đếm từ để biết độ dài thật của mỗi kịch bản, không ước lượng bằng mắt. */
export const soTu = (loi: string): number => loi.trim().split(/\s+/).length;

/** Đường dẫn tệp âm của một kịch bản. */
export const tepAm = (id: string): string => `audio/nghe/${id}.mp3`;

/* ==========================================================================
   BA MƯƠI KỊCH BẢN — BA CHO MỖI CHUYÊN ĐỀ NGHE

   Nội dung đặt trong bối cảnh đời thường và học đường, không dùng chủ đề
   nhạy cảm. Độ dài giữ trong khoảng 35–95 từ: đủ để hỏi bốn câu, đủ ngắn
   để nghe lại nhiều lần mà không nản.
   ========================================================================== */

export const KICH_BAN: KichBanNghe[] = [
  /* ---------------- d-l01 · Chép chính tả câu ngắn ---------------- */
  {
    id: 'kb-l01-a', chuyenDeId: 'd-l01', ten: 'Nhắn lại lịch học', giong: 'my-nu', nhipTu: 130,
    loi: 'The class on Thursday starts at four fifteen, not four thirty. Please bring the blue workbook and a pencil. If you cannot come, send a message before Wednesday evening.',
  },
  {
    id: 'kb-l01-b', chuyenDeId: 'd-l01', ten: 'Dặn trước buổi thi thử', giong: 'anh-nu', nhipTu: 130,
    loi: 'The practice test will last ninety minutes. You may use a pen or a pencil, but not a dictionary. Write your name at the top of every page, and hand in all three sheets together.',
  },
  {
    id: 'kb-l01-c', chuyenDeId: 'd-l01', ten: 'Thông báo đổi phòng', giong: 'my-nam', nhipTu: 130,
    loi: 'Because of the repair work, tomorrow we will meet in room twelve on the second floor. The lift is closed, so please use the stairs at the back of the building.',
  },

  /* ---------------- d-l02 · Bắt số và tên riêng ---------------- */
  {
    id: 'kb-l02-a', chuyenDeId: 'd-l02', ten: 'Đặt chỗ ở thư viện', giong: 'anh-nu', nhipTu: 150,
    loi: 'Your booking is confirmed for the fourteenth of March. The room number is B two zero seven. The reference is K as in kilo, L as in lima, four, nine, two. Please arrive ten minutes early.',
  },
  {
    id: 'kb-l02-b', chuyenDeId: 'd-l02', ten: 'Thông báo ở ga', giong: 'anh-nam', nhipTu: 150,
    loi: 'The nine forty service to Manchester will now leave from platform four, not platform seven. Passengers for Leeds should change at Sheffield. The next train to Leeds departs at ten oh five.',
  },
  {
    id: 'kb-l02-c', chuyenDeId: 'd-l02', ten: 'Gọi xác nhận đơn hàng', giong: 'my-nu', nhipTu: 150,
    loi: 'I am calling about order number three three eight one. The delivery address is fifty two Hanover Street, spelled H A N O V E R. The total is forty five pounds and sixty pence.',
  },

  /* ---------------- d-l03 · Bắt ý chính ---------------- */
  {
    id: 'kb-l03-a', chuyenDeId: 'd-l03', ten: 'Vì sao ghi chép tay', giong: 'my-nu', nhipTu: 165,
    loi: 'Many students type their notes because typing is faster. But being faster is exactly the problem. When you type, you can copy the words without deciding what matters. When you write by hand, you are too slow to copy everything, so you are forced to choose. That choosing is the part that helps you remember.',
  },
  {
    id: 'kb-l03-b', chuyenDeId: 'd-l03', ten: 'Ngủ và trí nhớ', giong: 'anh-nam', nhipTu: 165,
    loi: 'People often treat sleep as the time left over after studying. That is the wrong way round. Most of the work of turning today into memory happens while you sleep. Cutting sleep to study longer removes the very step that makes the studying count.',
  },
  {
    id: 'kb-l03-c', chuyenDeId: 'd-l03', ten: 'Học nhóm có ích không', giong: 'anh-nu', nhipTu: 165,
    loi: 'Study groups get a mixed reputation, and both sides are right about something. A group is poor for first contact with new material, because everyone is confused at once. A group is very good for testing what you think you already know, because someone will ask the question you avoided.',
  },

  /* ---------------- d-l04 · Bắt chi tiết theo câu hỏi ---------------- */
  {
    id: 'kb-l04-a', chuyenDeId: 'd-l04', ten: 'Hướng dẫn nhập học', giong: 'my-nam', nhipTu: 165,
    loi: 'New students should collect their card from the main office between nine and eleven on Monday. Bring one photograph and a form of identification. The library opens on Tuesday, but you cannot borrow books until your card is active, which takes one working day.',
  },
  {
    id: 'kb-l04-b', chuyenDeId: 'd-l04', ten: 'Quy định phòng thí nghiệm', giong: 'anh-nu', nhipTu: 165,
    loi: 'Coats and bags go in the lockers outside, not under the benches. Safety glasses must be worn at all times, even when you are only watching. Food and drink are never allowed inside. If you break something, tell the technician immediately and do not try to clear it up yourself.',
  },
  {
    id: 'kb-l04-c', chuyenDeId: 'd-l04', ten: 'Đổi lịch chuyến đi', giong: 'my-nu', nhipTu: 165,
    loi: 'The museum visit has moved from Friday to the following Tuesday. The coach now leaves at eight, half an hour earlier than before. Lunch is not provided, so bring your own. The cost stays the same, but anyone who cannot make the new date can have a full refund.',
  },

  /* ---------------- d-l05 · Đoán thái độ người nói ---------------- */
  {
    id: 'kb-l05-a', chuyenDeId: 'd-l05', ten: 'Nhận xét về một ứng dụng học', giong: 'anh-nu', nhipTu: 165,
    loi: 'The app is well made, I will give it that. The design is clear and it never crashed on me. Whether it actually teaches anything is another matter entirely. I finished a hundred lessons and I am not sure I could hold a conversation.',
  },
  {
    id: 'kb-l05-b', chuyenDeId: 'd-l05', ten: 'Ý kiến về lớp học buổi tối', giong: 'my-nam', nhipTu: 165,
    loi: 'I had my doubts about evening classes, I admit. I assumed everyone would be too tired to learn. In fact it has worked rather better than I expected, though I would not want to do it four nights a week.',
  },
  {
    id: 'kb-l05-c', chuyenDeId: 'd-l05', ten: 'Về một quyển sách luyện thi', giong: 'anh-nam', nhipTu: 165,
    loi: 'It is thorough, certainly. Perhaps a little too thorough. There are eight hundred pages here, and a student with three months left simply cannot read eight hundred pages. As a reference it is excellent. As a study plan it is almost useless.',
  },

  /* ---------------- d-l06 · Nghe nối âm ---------------- */
  {
    id: 'kb-l06-a', chuyenDeId: 'd-l06', ten: 'Nối phụ âm gặp nguyên âm', giong: 'my-nu', nhipTu: 155,
    loi: 'Pick it up and put it on the top shelf. I ran out of time again. She looked at it for a moment, then made up her mind and turned it off.',
  },
  {
    id: 'kb-l06-b', chuyenDeId: 'd-l06', ten: 'Mất âm và đồng hoá', giong: 'anh-nam', nhipTu: 155,
    loi: 'Last time I asked him, he said he had to go. Next week we will send them the first draft. I must be there by eight, and I can not stay past ten.',
  },
  {
    id: 'kb-l06-c', chuyenDeId: 'd-l06', ten: 'Dạng yếu của từ chức năng', giong: 'anh-nu', nhipTu: 155,
    loi: 'A cup of tea and a bit of cake for the two of them. I was going to call you, but I had to finish the report. He can swim, but he can not drive.',
  },

  /* ---------------- d-l07 · Nghe kèm việc phải làm ---------------- */
  {
    id: 'kb-l07-a', chuyenDeId: 'd-l07', ten: 'Ba bước nộp bài', giong: 'my-nam', nhipTu: 160,
    loi: 'First, save the file with your student number as the name. Second, upload it to the folder marked Week Six, not the general folder. Third, and this is the step people forget, click submit at the bottom. An uploaded file that is not submitted is not marked.',
  },
  {
    id: 'kb-l07-b', chuyenDeId: 'd-l07', ten: 'Chuẩn bị cho buổi nói', giong: 'anh-nu', nhipTu: 160,
    loi: 'Before Thursday, choose your topic and write six sentences about it. Do not memorise them. Read them aloud twice, then put the paper away and say the same ideas in your own words. Bring only the six sentences on Thursday, not a full script.',
  },
  {
    id: 'kb-l07-c', chuyenDeId: 'd-l07', ten: 'Dặn trước khi rời phòng', giong: 'my-nu', nhipTu: 160,
    loi: 'When you leave, close the windows but leave the door open. Take your own cup to the kitchen. If you are the last one out, turn off the projector at the wall, not just with the remote, or it stays warm all night.',
  },

  /* ---------------- d-l08 · Dựng bản đồ ý ---------------- */
  {
    id: 'kb-l08-a', chuyenDeId: 'd-l08', ten: 'Ba nguyên nhân của quên', giong: 'anh-nam', nhipTu: 170,
    loi: 'There are three reasons we forget. The first is simple decay: without review, the trace fades. The second is interference, where new material pushes out the old. The third, and the one people underestimate, is that the memory was never properly formed in the first place. Only the third one is fixed by studying differently rather than studying more.',
  },
  {
    id: 'kb-l08-b', chuyenDeId: 'd-l08', ten: 'Hai cách tiếp cận từ vựng', giong: 'my-nu', nhipTu: 170,
    loi: 'Broadly, there are two approaches. The first is breadth: meet as many words as possible and accept shallow knowledge of each. The second is depth: take fewer words and learn how each one behaves in a sentence. Breadth helps reading. Depth helps writing and speaking. Most learners do the first and then wonder why the second never improves.',
  },
  {
    id: 'kb-l08-c', chuyenDeId: 'd-l08', ten: 'Cấu trúc một buổi tự học', giong: 'anh-nu', nhipTu: 170,
    loi: 'A good session has four parts. It opens with five minutes of review of yesterday. Then comes the new material, which should be the hardest thing you do. Then practice, where you use the new material without looking. It closes by writing down one sentence about what was difficult, which becomes the review for tomorrow.',
  },

  /* ---------------- d-l09 · Nghe tốc độ nhanh ---------------- */
  {
    id: 'kb-l09-a', chuyenDeId: 'd-l09', ten: 'Thông báo nhanh ở sân bay', giong: 'my-nu', nhipTu: 230,
    loi: 'This is the final call for passengers travelling to Dublin on flight six one four. The gate closes in ten minutes. Passengers who have not yet boarded should proceed to gate twenty two immediately. Any remaining baggage will be removed from the aircraft.',
  },
  {
    id: 'kb-l09-b', chuyenDeId: 'd-l09', ten: 'Tóm tắt cuộc họp nhanh', giong: 'anh-nam', nhipTu: 230,
    loi: 'Right, quickly then. Numbers are up on last month but costs are up further, so we are slightly behind. Marketing want another two weeks before deciding. I have said yes to one week, not two. Anything you need from me, ask before Friday because I am away all next week.',
  },
  {
    id: 'kb-l09-c', chuyenDeId: 'd-l09', ten: 'Hướng dẫn nhanh trước bài thi', giong: 'anh-nu', nhipTu: 230,
    loi: 'Phones off, not silent, and into the box at the front. Question papers face down until I say start. You have one hour, and I will call out the time at thirty minutes and again at ten. If you finish early, stay seated and check your answers.',
  },

  /* ---------------- d-l10 · Nghe trong điều kiện nhiễu ---------------- */
  {
    id: 'kb-l10-a', chuyenDeId: 'd-l10', ten: 'Hỏi đường ngoài phố', giong: 'anh-nam', nhipTu: 170, nhieuDb: 12,
    loi: 'Go straight past the bank, then take the second turning on the left. It is opposite a small park. If you reach the bridge, you have gone too far. It should take you about seven minutes on foot.',
  },
  {
    id: 'kb-l10-b', chuyenDeId: 'd-l10', ten: 'Gọi điện đường truyền kém', giong: 'my-nu', nhipTu: 170, nhieuDb: 10,
    loi: 'Sorry, the line is not very good. I said the meeting has moved to Wednesday at two, not Tuesday. The room is the same as last time. Can you tell the others, because I could not reach them this morning.',
  },
  {
    id: 'kb-l10-c', chuyenDeId: 'd-l10', ten: 'Thông báo trong nhà ăn đông', giong: 'anh-nu', nhipTu: 170, nhieuDb: 8,
    loi: 'Could I have your attention for a moment. The hot food counter will close at half past one today instead of two, because of staff training. Sandwiches and drinks will still be available until three as usual.',
  },
];

export const kichBanCuaChuyenDe = (chuyenDeId: string): KichBanNghe[] =>
  KICH_BAN.filter((k) => k.chuyenDeId === chuyenDeId);

export const NGHE_SO = {
  soKichBan: KICH_BAN.length,
  soChuyenDe: new Set(KICH_BAN.map((k) => k.chuyenDeId)).size,
  soGiong: Object.keys(GIONG).length,
  tongTu: KICH_BAN.reduce((s, k) => s + soTu(k.loi), 0),
  soCoNhieu: KICH_BAN.filter((k) => k.nhieuDb !== undefined).length,
  nhipNhanhNhat: Math.max(...KICH_BAN.map((k) => k.nhipTu)),
  nhipChamNhat: Math.min(...KICH_BAN.map((k) => k.nhipTu)),
};
