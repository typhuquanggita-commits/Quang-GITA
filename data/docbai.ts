/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/* ==========================================================================
   ĐOẠN ĐỌC — VIẾT GỐC

   VÌ SAO PHẢI VIẾT GỐC CHỨ KHÔNG CHÉP
     Mọi đoạn đọc trong sách luyện thi thương mại đều có bản quyền. Chép về
     là vừa phạm luật vừa khiến hệ thống không phát hành được — và đó là
     một nửa lý do mười bốn chuyên đề còn lại chưa có câu trắc nghiệm.

     Viết gốc thì chậm hơn nhưng dứt điểm: đoạn văn thuộc về hệ thống, sửa
     được, và không ai đòi lại.

   HAI CHUYÊN ĐỀ, HAI LOẠI ĐỘ DÀI
     · quét theo từ khoá — đoạn 220–280 từ, có nhiều mốc số và tên riêng
       rải khắp bài, vì đó chính là thứ phải quét
     · đọc bài dài bấm giờ — đoạn 420–520 từ, có ví dụ phụ dài để luyện
       đúng kỹ năng bỏ qua ví dụ mà vẫn giữ mạch

   CHỦ ĐỀ CHỌN THEO NGUYÊN TẮC
     Khoa học thường thức và đời sống học đường: đủ trung tính để không ai
     phải đồng ý hay phản đối, và đủ cụ thể để có số liệu mà hỏi.
   ========================================================================== */

export const DOCBAI_CREED = {
  name: 'ĐOẠN ĐỌC GỐC',
  claim:
    'Bốn đoạn đọc viết gốc cho hai chuyên đề đọc, có số liệu và tên riêng rải khắp bài để quét, và ví dụ phụ dài để luyện kỹ năng bỏ qua.',
  khongChep:
    'Không chép đoạn đọc của bất kỳ sách luyện thi nào. Đoạn thương mại có bản quyền, và đó chính là một nửa lý do phần đọc bài dài từng không có câu trắc nghiệm.',
  doDaiThat:
    'Số từ của mỗi đoạn tính bằng mã chứ không ước lượng, và bài kiểm đối chiếu độ dài với loại chuyên đề — đoạn quét phải ngắn, đoạn bấm giờ phải dài.',
};

export interface DoanDoc {
  id: string;
  chuyenDeId: string;
  ten: string;
  /** Nội dung tiếng Anh, viết gốc. */
  loi: string;
  /** Phút gợi ý để đọc xong, dùng cho bài bấm giờ. */
  phutGoiY: number;
}

export const soTuDoan = (loi: string): number => loi.trim().split(/\s+/).length;

export const DOAN_DOC: DoanDoc[] = [
  /* ------------------- d-r01 · Quét theo từ khoá ------------------- */
  {
    id: 'dd-r01-a',
    chuyenDeId: 'd-r01',
    ten: 'Thư viện thành phố Ashford',
    phutGoiY: 3,
    loi: `Ashford Central Library opened in 1962 and now holds just over 340,000 items across four floors. The ground floor contains the lending collection and the children's section, which was refurbished in 2019 at a cost of 84,000 pounds. The first floor houses reference works and the local history archive, founded by the historian Margaret Ellis in 1974.

Borrowing is free for anyone living in the county. Visitors from outside the county pay an annual fee of 12 pounds. Standard loans run for three weeks and may be renewed twice, unless another reader has reserved the item. Overdue items are charged at 15 pence per day, to a maximum of 6 pounds per item.

The second floor is reserved for study. It contains 96 desks, 40 of which have power sockets, and eight small rooms that groups may book for up to two hours a day. Booking opens at nine each morning and must be done in person at the desk on that floor; telephone bookings are not accepted.

The top floor holds the newspaper collection, including bound volumes of the Ashford Herald from 1871 onwards. These volumes may not leave the building. Readers who need copies may use the scanner beside the window, which is free for the first twenty pages.

The library closes at eight on weekdays, six on Saturdays, and does not open on Sundays. During August the building closes an hour earlier each day while the heating system is serviced.`,
  },
  {
    id: 'dd-r01-b',
    chuyenDeId: 'd-r01',
    ten: 'Chương trình trao đổi Northfield',
    phutGoiY: 3,
    loi: `The Northfield exchange programme began in 1998 with twelve students and one partner school in Kyoto. It now sends around ninety students each year to six countries. Applications open on the first of October and close six weeks later; late applications are considered only if places remain.

Students must be at least fifteen years old on the date of departure and must have studied the host language for a minimum of two years. There is one exception: applicants to the Helsinki placement may apply after one year, because teaching there is conducted in English.

The programme costs 2,400 pounds, which covers flights, insurance and a contribution to the host family. It does not cover visa fees, which vary between 40 and 180 pounds depending on the country. Twenty bursaries of 800 pounds each are available; the deadline for bursary applications is two weeks earlier than the main deadline.

Placements last either four weeks in July or a full term from September. The four-week option is more popular, taking about seventy of the ninety places. Students on the term-long option sit their host school's examinations, and the results are recorded on the Northfield transcript but do not count towards the final grade.

Every applicant attends two preparation sessions in May, led by Dr Alan Whitcombe, who has coordinated the programme since 2011. Missing either session withdraws the offer.`,
  },

  /* ---------------- d-r08 · Đọc bài dài bấm giờ ---------------- */
  {
    id: 'dd-r08-a',
    chuyenDeId: 'd-r08',
    ten: 'Vì sao ong mật nhảy múa',
    phutGoiY: 6,
    loi: `For most of human history, the behaviour of honeybees inside the hive was invisible. The hive was a dark box; bees went in and came out, and what happened between those two events was a matter for speculation. That changed in the middle of the twentieth century, when researchers built hives with glass walls and watched what the insects actually did.

What they saw was a dance. A bee returning from a good source of food would walk in a figure of eight across the vertical face of the comb, waggling her body along the straight central run. Other bees crowded around her, touching her with their antennae. After a time, some of them left the hive and flew, apparently, to the place she had come from.

The obvious question was whether the dance carried information or was simply an expression of excitement. The answer turned out to be the former, and the details were remarkably precise. The angle of the straight run, measured against vertical, corresponded to the angle between the sun and the food source. If the run pointed straight up, the food lay in the direction of the sun; if it pointed thirty degrees to the left of vertical, the food lay thirty degrees to the left of the sun. The duration of the run corresponded to distance, with roughly one second of waggling for every kilometre.

This is a considerable feat. The bee must remember the position of the sun at the moment she found the food, and she must correct for the fact that the sun moves. A bee dancing an hour after her return will adjust the angle of her run to account for the sun's movement during that hour, even though she has been inside a dark hive throughout and cannot see it.

Not every question was settled by these observations. For many years it was unclear how much of the information the watching bees actually used, since a returning forager also carries the scent of the flowers she visited, and scent alone might be enough to guide others to a nearby patch. Experiments with artificial scent-free feeders eventually showed that recruits could find a source they had never smelled, using the dance alone, though they searched a wider area than bees given both dance and scent.

There is a further complication that is easy to overlook. The dance is performed on a vertical surface in the dark, and its meaning depends on gravity supplying a reference direction. Bees of some related species dance on a horizontal surface in the open, where they point directly at the food rather than translating the direction into an angle from vertical. The vertical dance, in other words, is a translation, and it requires the dancer and the audience to share the same convention.

None of this makes the honeybee unusually intelligent in any general sense. The dance is a narrow and inflexible system: it conveys direction and distance and very little else. But within that narrow range it is exact, and it is a reminder that a small nervous system can carry out a computation that took human observers several decades to describe.`,
  },
  {
    id: 'dd-r08-b',
    chuyenDeId: 'd-r08',
    ten: 'Đồng hồ và sự ra đời của giờ chuẩn',
    phutGoiY: 6,
    loi: `Before the railways, every town kept its own time. Noon was the moment the sun stood highest over that particular place, and since the sun reaches its highest point a few minutes later as one travels west, the clock in one town differed from the clock in the next. In Britain the difference between the east coast and the west was about half an hour. For most purposes this mattered very little. A traveller on horseback took long enough to cross the country that a twenty-minute discrepancy was invisible.

The railway destroyed that tolerance. A train timetable is a promise about simultaneity: it says that a particular carriage will be at a particular platform at a particular moment. If the platform clock at one end of the line disagrees with the platform clock at the other, the promise cannot be kept, and in the worst case two trains may be given permission to occupy the same stretch of track. The problem was not philosophical but mechanical, and it had to be solved quickly.

The solution was to abandon local time in favour of a single standard, distributed from one place. In Britain that place was the Royal Observatory at Greenwich, and the distribution was at first physical: a clerk carried a watch set to Greenwich time along the line, resetting station clocks as he went. Later the telegraph made distribution instantaneous, and by the 1850s most British railway companies ran on Greenwich time regardless of where their trains happened to be.

Adoption outside the railway was slower and less willing. A town whose church clock had marked local noon for centuries did not necessarily welcome an instruction from London to be wrong by eight minutes. For some years certain public clocks carried two minute hands, one for local time and one for railway time, which is an elegant compromise and also a good illustration of how strange the new arrangement seemed. Legal recognition came only in 1880, decades after the practical change.

The same argument played out on a larger scale later in the century, when the difficulty was no longer within countries but between them. Delegates meeting in Washington in 1884 agreed to divide the world into zones, each an hour apart, measured from a single meridian. The choice of Greenwich as that meridian was not a matter of natural fact; it followed from the fact that a large share of the world's shipping already used charts based on it.

It is worth noticing what was given up. Local time was not an error to be corrected. It was an accurate description of the sun's position at a particular place, and standard time replaced it with something that is, strictly speaking, wrong nearly everywhere. What made the exchange worthwhile was not accuracy but coordination: it is more useful for many people to share one slightly wrong clock than for each to keep a perfectly correct one of their own.`,
  },
];

export const doanCuaChuyenDe = (chuyenDeId: string): DoanDoc[] =>
  DOAN_DOC.filter((d) => d.chuyenDeId === chuyenDeId);

export const DOCBAI_SO = {
  soDoan: DOAN_DOC.length,
  soChuyenDe: new Set(DOAN_DOC.map((d) => d.chuyenDeId)).size,
  tongTu: DOAN_DOC.reduce((s, d) => s + soTuDoan(d.loi), 0),
  tuNganNhat: Math.min(...DOAN_DOC.map((d) => soTuDoan(d.loi))),
  tuDaiNhat: Math.max(...DOAN_DOC.map((d) => soTuDoan(d.loi))),
};
