/**
 * The pages themselves, generated from the platform's own authored data.
 *
 * A page here exists because a person searches for what it answers. The
 * Vietnamese queries this set is built around are the ordinary ones — what
 * the Digital SAT is, how long preparation takes, whether a wrong answer is
 * penalised, what score a university wants — and each is answered with a
 * specific figure and a stated limit rather than with reassurance.
 *
 * That is not a style choice. A page that answers "how long does SAT prep
 * take" with "it depends on the learner" gives a reader nothing and is
 * outranked by any page that gives a number. A page that gives a number and
 * says what it assumes is useful and defensible, and it happens to be what
 * search guidance rewards.
 */

import { COURSES } from '../data/curriculum.ts';
import { LESSONS, TOPICS } from '../data/lesson-index.ts';
import { PAPERS } from '../data/papers.ts';
import { TACTICS } from '../data/tactics.ts';
import { vocabStats, vocabWithSecondSense } from '../data/vocabulary.ts';
import { SAT365_SCHEME } from '../engine/certification.ts';
import { PRICING, feeLabel, formatVnd, quote } from '../data/pricing.ts';
import {
  ADMINISTRATIONS,
  VERIFY_NOTE,
  VIETNAM_DEADLINE_NOTE,
  registerBy,
} from '../data/testDates.ts';
import { RESOURCES, RESOURCE_PREAMBLE } from '../data/resources.ts';
import { TOP_SCORE_CONDITIONS, TOP_SCORE_DISCLAIMER, hoursToReach } from '../engine/roadmap.ts';
import { buildCoursePlan } from '../engine/curriculum.ts';
import { bankStats } from '../data/bank.ts';
import { skillLabel } from '../data/blueprint.ts';
import { SITE, organisationSchema, type Block, type SitePage } from './model.ts';

const HOME = { href: '/', label: 'SAT365' };

/**
 * A title that survives a search result.
 *
 * Google truncates around 60–70 characters, and a truncated title loses the
 * brand suffix first — which is fine — but a truncated *subject* reads as a
 * broken page. So the suffix is dropped rather than the subject, and the
 * subject itself is trimmed at a word boundary if it is still too long.
 */
function fitTitle(core: string, suffix = ' | SAT365', max = 68): string {
  if (core.length + suffix.length <= max) return core + suffix;
  if (core.length <= max) return core;
  const cut = core.slice(0, max - 1);
  const space = cut.lastIndexOf(' ');
  return `${space > max * 0.6 ? cut.slice(0, space) : cut}…`;
}

/**
 * A description in the range a result actually renders.
 *
 * Too short wastes the space; too long is cut mid-sentence. Where the source
 * text is thin, context is appended rather than the field being left short —
 * a description is the only sentence most searchers read before deciding.
 */
function fitDescription(core: string, context: string, min = 115, max = 158): string {
  let text = core.trim().replace(/\s+/g, ' ');
  if (text.length < min) text = `${text.replace(/\.$/, '')}. ${context}`;
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const stop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf(' '));
  return `${cut.slice(0, stop > max * 0.6 ? stop : cut.length).trim()}…`;
}



function slug(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

function homePage(): SitePage {
  const bank = bankStats();
  const vocab = vocabStats();
  const plans = COURSES.map((c) => buildCoursePlan(c.id)!);

  return {
    path: '/',
    title: 'SAT365 — Luyện thi Digital SAT theo chuẩn đo lường',
    description:
      'Đề thích ứng hai giai đoạn, chấm điểm IRT thang 400–1600 kèm sai số đo, 2020 câu hỏi có lời giải và bảng phân tích, bốn khoá học có đề cương công khai.',
    trail: [],
    h1: 'Luyện thi Digital SAT, đo bằng thứ đo được',
    priority: 1,
    changefreq: 'weekly',
    blocks: [
      {
        kind: 'lead',
        text: 'SAT365 là nền tảng luyện thi Digital SAT dựng theo đúng cách một kỳ thi chuẩn hoá vận hành: đề thích ứng hai giai đoạn, điểm quy về thang 400–1600 bằng mô hình đáp ứng câu hỏi, và mọi con số đều đi kèm sai số đo của nó.',
      },
      {
        kind: 'p',
        text: 'Điều khiến nền tảng này khác không nằm ở số lượng câu hỏi. Nó nằm ở chỗ chúng tôi nói rõ những gì hệ thống KHÔNG biết: tham số độ khó là ước lượng của người soạn chứ chưa hiệu chuẩn trên quần thể thi thật, một chênh lệch điểm nhỏ hơn sai số đo thì không được gọi là tiến bộ, và một kỹ năng chưa luyện đủ thì được ghi là "chưa đủ dữ liệu" chứ không bị xếp là yếu.',
      },
      { kind: 'h2', text: 'Hệ thống gồm những gì', id: 'he-thong' },
      {
        kind: 'table',
        caption: 'Toàn bộ nội dung đã biên soạn, tính đến ' + SITE.updated,
        head: ['Thành phần', 'Quy mô', 'Điểm đáng chú ý'],
        rows: [
          [
            'Ngân hàng câu hỏi',
            `${bank.total} câu (${bank.bySection.rw} Đọc–Viết, ${bank.bySection.math} Toán)`,
            'Mỗi câu có lời giải và ghi chú vì sao từng phương án nhiễu lại hấp dẫn',
          ],
          [
            'Bài giảng',
            `${LESSONS.length} bài, phủ ${LESSONS.length} kỹ năng`,
            'Ý cốt lõi – phương pháp – ví dụ mẫu – bẫy, không phải bản tóm tắt lý thuyết',
          ],
          [
            'Bộ phiếu chuyên đề',
            `${TOPICS.length} chuyên đề × 7 loại phiếu`,
            'Lý thuyết, đọc vị, phương pháp, nâng cao, ôn thi, phiếu thi, ôn chắc',
          ],
          [
            'Đề cương khoá học',
            `${COURSES.length} khoá, ${plans.reduce((n, p) => n + p.totalSessions, 0)} buổi`,
            'Mỗi đơn vị nêu rõ vì sao nó đứng ở vị trí đó trong trình tự',
          ],
          [
            'Kho từ vựng',
            `${vocab.total} từ`,
            `${vocab.withSecondSense} từ quen mang nghĩa thứ hai — bẫy thật của Digital SAT`,
          ],
          ['Đề luyện trọn vẹn', `${PAPERS.length} đề`, 'Kèm barem quy đổi điểm thô sang thang 200–800'],
          ['Kho bí kíp', `${TACTICS.length} kỹ thuật`, 'Mỗi kỹ thuật ghi rõ CÁI GIÁ phải trả khi dùng'],
        ],
      },
      { kind: 'h2', text: 'Bốn khoá, chọn theo điểm chứ không theo cảm nhận', id: 'khoa-hoc' },
      {
        kind: 'p',
        text: 'Học viên 950 điểm và học viên 1400 điểm không cần cùng một khoá học với liều lượng khác nhau — họ cần hai khoá khác nhau. Ở 950, ràng buộc thường là một nửa số dạng bài chưa từng được nhận diện, và cách chữa là phủ hết. Ở 1400, độ phủ đã đủ, ràng buộc là vài câu khó cuối mỗi module cộng với đồng hồ, và cách chữa là độ chính xác dưới áp lực thời gian.',
      },
      {
        kind: 'links',
        title: 'Xem đề cương từng khoá',
        items: COURSES.map((course) => {
          const plan = buildCoursePlan(course.id)!;
          return {
            href: `/khoa-hoc/${course.id}/`,
            label: course.nameVi,
            note: `${plan.totalSessions} buổi · ${plan.classHours} giờ tại lớp · ${course.entry.noteVi}`,
          };
        }),
      },
      { kind: 'h2', text: 'Chúng tôi nói trước những gì hệ thống không làm được', id: 'gioi-han' },
      {
        kind: 'ul',
        items: [
          'Tham số độ khó của câu hỏi là ước lượng của người soạn, chưa hiệu chuẩn trên dữ liệu thi thật. Điểm ở đây phản ánh tốt CHIỀU tiến bộ và chỉ áng chừng MỨC.',
          'Đây không phải điểm SAT chính thức và không trường đại học nào chấp nhận nó. Chứng nhận của SAT365 là chuẩn nội bộ, và trên phôi chứng nhận có ghi đúng câu này.',
          'Ngân hàng câu hỏi nhỏ so với một kỳ thi vận hành thật, nên không kiểm soát được mức độ lộ đề như một chương trình thi quốc gia.',
          'Phân quyền chạy phía trình duyệt. Đây là công cụ học tập cá nhân, không phải hệ thống thi cử chính thức.',
        ],
      },
      {
        kind: 'note',
        title: 'Vì sao chúng tôi công bố những điều này',
        text: 'Một nền tảng giấu giới hạn của nó thì người dùng vẫn phát hiện ra — chỉ là vào ngày thi thật, và lúc đó thì đã muộn. Nêu trước là cách duy nhất để con số chúng tôi đưa ra có nghĩa.',
      },
      {
        kind: 'cta',
        href: '/app/#/today',
        label: 'Mở nền tảng',
        note: 'Chạy hoàn toàn trong trình duyệt. Dữ liệu bài làm nằm trên máy của bạn và không gửi đi đâu.',
      },
    ],
    jsonLd: [organisationSchema(SITE)],
  };
}

/* ------------------------------------------------------------------ */
/* Courses                                                             */
/* ------------------------------------------------------------------ */

function courseIndexPage(): SitePage {
  return {
    path: '/khoa-hoc/',
    title: 'Bốn khoá luyện SAT — đề cương công khai | SAT365',
    description:
      'Nền tảng, Chuẩn, Tăng tốc, Nước rút. Xếp lớp theo điểm bài kiểm tra đầu vào, không theo cảm nhận. Toàn bộ đề cương, số buổi và mốc kiểm tra đều công khai.',
    trail: [HOME],
    h1: 'Bốn khoá học, và cách chọn đúng khoá',
    priority: 0.9,
    changefreq: 'monthly',
    blocks: [
      {
        kind: 'lead',
        text: 'Điều kiện vào mỗi khoá được nêu bằng một khoảng điểm, không phải bằng tên trình độ. Xếp lớp theo cảm nhận thì sai khoảng một phần ba số trường hợp, và sai theo hướng tệ nhất: học viên khá bị đưa vào lớp dạy lại thứ em ấy vốn đã làm được.',
      },
      {
        kind: 'table',
        head: ['Khoá', 'Điều kiện vào', 'Số buổi', 'Giờ tại lớp', 'Đầu ra'],
        rows: COURSES.map((course) => {
          const plan = buildCoursePlan(course.id)!;
          return [
            course.nameVi,
            course.entry.noteVi,
            String(plan.totalSessions),
            String(plan.classHours),
            course.exit.noteVi,
          ];
        }),
      },
      {
        kind: 'note',
        title: 'Khoá Nước rút cố ý không dạy gì mới',
        text: 'Trong bốn tuần cuối, một phương pháp mới gặp lần đầu sẽ được mang vào phòng thi khi chưa kịp thành phản xạ. Khoá này chỉ luyện đọc vị dưới áp lực thời gian rồi tổng duyệt hai đề trọn vẹn.',
      },
      {
        kind: 'links',
        title: 'Đề cương chi tiết',
        items: COURSES.map((course) => ({
          href: `/khoa-hoc/${course.id}/`,
          label: course.nameVi,
          note: course.summaryVi,
        })),
      },
    ],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Khoá luyện thi SAT365',
        itemListElement: COURSES.map((course, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE.origin}/khoa-hoc/${course.id}/`,
          name: course.nameVi,
        })),
      },
    ],
  };
}

function coursePage(courseId: (typeof COURSES)[number]['id']): SitePage {
  const course = COURSES.find((c) => c.id === courseId)!;
  const plan = buildCoursePlan(courseId)!;

  const blocks: Block[] = [
    { kind: 'lead', text: course.summaryVi },
    {
      kind: 'table',
      head: ['Chỉ số', 'Giá trị'],
      rows: [
        ['Số buổi', String(plan.totalSessions)],
        ['Thời lượng', `${plan.weeks} tuần, ${course.sessionsPerWeek} buổi/tuần`],
        ['Giờ tại lớp', `${plan.classHours} giờ`],
        ['Giờ bài về nhà (ước từ chính các phiếu được giao)', `${plan.homeworkHours} giờ`],
        ['Số kỹ năng được dạy', String(plan.skills.length)],
        ['Điều kiện vào', course.entry.noteVi],
        ['Điều kiện ra', course.exit.noteVi],
      ],
    },
    { kind: 'h2', text: 'Các đơn vị, và vì sao theo thứ tự này', id: 'don-vi' },
  ];

  course.units.forEach((unit, i) => {
    blocks.push({ kind: 'h3', text: `Đơn vị ${i + 1} — ${unit.titleVi}` });
    blocks.push({ kind: 'p', text: unit.purposeVi });
    blocks.push({ kind: 'note', title: 'Vì sao đặt ở đây', text: unit.rationaleVi });
    blocks.push({
      kind: 'ul',
      items: [
        `Kỹ năng: ${unit.skills.map((s) => skillLabel(s, 'vi')).join(', ')}`,
        `Mốc kiểm tra: đạt từ ${Math.round(unit.checkpoint.passAccuracy * 100)}% — ${unit.checkpoint.noteVi}`,
      ],
    });
  });

  blocks.push({
    kind: 'cta',
    href: '/app/#/curriculum',
    label: 'Mở đề cương đầy đủ trong nền tảng',
    note: 'Bản trong nền tảng có từng buổi, học liệu kèm theo và liên kết trực tiếp tới bài giảng và bộ phiếu.',
  });

  return {
    path: `/khoa-hoc/${course.id}/`,
    title: fitTitle(`${course.nameVi} — đề cương ${plan.totalSessions} buổi`),
    description: fitDescription(
      `${course.summaryVi} ${plan.totalSessions} buổi, ${plan.classHours} giờ tại lớp.`,
      `Điều kiện vào: ${course.entry.noteVi}`,
    ),
    trail: [HOME, { href: '/khoa-hoc/', label: 'Khoá học' }],
    h1: course.nameVi,
    priority: 0.8,
    changefreq: 'monthly',
    blocks,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: course.nameVi,
        description: course.summaryVi,
        inLanguage: 'vi',
        provider: { '@id': `${SITE.origin}/#organisation` },
        educationalLevel: course.entry.noteVi,
        teaches: plan.skills.map((s) => skillLabel(s, 'vi')),
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'blended',
          courseWorkload: `PT${Math.round(plan.classHours)}H`,
        },
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Lessons                                                             */
/* ------------------------------------------------------------------ */

function lessonIndexPage(): SitePage {
  return {
    path: '/bai-giang/',
    title: `${LESSONS.length} bài giảng SAT theo từng kỹ năng | SAT365`,
    description:
      'Mỗi kỹ năng một bài giảng: ý cốt lõi, các bước làm được dưới áp lực thời gian, một ví dụ giải mẫu, và những bẫy dạng bài này được dựng ra để bắt.',
    trail: [HOME],
    h1: 'Thư viện bài giảng theo kỹ năng',
    priority: 0.9,
    changefreq: 'monthly',
    blocks: [
      {
        kind: 'lead',
        text: 'Một bài giảng ở đây không phải bản tóm tắt lý thuyết. Nó gồm bốn phần cố định, và hình dạng đó chính là thứ khiến bài giảng dùng được ngay lúc cần.',
      },
      {
        kind: 'ol',
        items: [
          'Ý cốt lõi — điều duy nhất mà hiểu ra rồi thì cách đọc dạng bài này thay đổi hẳn.',
          'Phương pháp — các bước theo thứ tự, làm theo được khi đang bị đồng hồ ép. Bước nào cần một phán đoán học sinh chưa có thì không phải là một bước.',
          'Ví dụ mẫu — một bài, giải đúng theo cách phương pháp vừa nêu, để phương pháp được CHỨNG MINH chứ không phải chỉ được khẳng định.',
          'Bẫy — những lỗi cụ thể mà dạng bài này được dựng ra để bắt, mỗi lỗi kèm lý do vì sao một học sinh tỉnh táo vẫn mắc.',
        ],
      },
      {
        kind: 'links',
        title: 'Toàn bộ bài giảng',
        items: LESSONS.map((lesson) => ({
          href: `/bai-giang/${slug(lesson.titleVi)}/`,
          label: lesson.titleVi,
          note: lesson.ideaVi.slice(0, 120),
        })),
      },
    ],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Bài giảng SAT365',
        numberOfItems: LESSONS.length,
        itemListElement: LESSONS.map((lesson, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE.origin}/bai-giang/${slug(lesson.titleVi)}/`,
          name: lesson.titleVi,
        })),
      },
    ],
  };
}

function lessonPage(lesson: (typeof LESSONS)[number]): SitePage {
  const topic = TOPICS.find((t) => t.skill === lesson.skill);
  const blocks: Block[] = [
    { kind: 'lead', text: lesson.ideaVi },
    { kind: 'h2', text: 'Các bước làm', id: 'phuong-phap' },
    { kind: 'ol', items: lesson.methodVi },
  ];

  if (topic && topic.types.length > 0) {
    blocks.push({ kind: 'h2', text: 'Đọc vị dạng bài', id: 'doc-vi' });
    blocks.push({
      kind: 'table',
      head: ['Dạng', 'Dấu hiệu nhận ra', 'Nước đi'],
      rows: topic.types.map((type) => [type.nameVi, type.cueVi, type.moveVi]),
    });
  }

  blocks.push({ kind: 'h2', text: 'Ví dụ giải mẫu', id: 'vi-du' });
  blocks.push({ kind: 'p', text: lesson.worked.promptVi });
  blocks.push({ kind: 'ol', items: lesson.worked.stepsVi });
  blocks.push({ kind: 'note', title: 'Đáp án', text: lesson.worked.answerVi });

  blocks.push({ kind: 'h2', text: 'Những bẫy của dạng bài này', id: 'bay' });
  for (const trap of lesson.traps) {
    blocks.push({ kind: 'h3', text: trap.nameVi });
    blocks.push({ kind: 'p', text: trap.whyVi });
  }

  blocks.push({
    kind: 'cta',
    href: `/app/#/lesson/${lesson.skill}`,
    label: 'Luyện kỹ năng này trong nền tảng',
    note: 'Bộ phiếu bảy loại cho chuyên đề này, kèm lời giải và bảng phân tích từng câu.',
  });

  /*
   * A bare skill name is a weak heading: "Suy luận" tells a searcher nothing
   * about whether this page answers their question. The heading names the
   * subject and what the page gives them about it.
   */
  const heading = `${lesson.titleVi} trong SAT: phương pháp và bẫy`;

  return {
    path: `/bai-giang/${slug(lesson.titleVi)}/`,
    title: fitTitle(`${lesson.titleVi} — phương pháp và bẫy`),
    description: fitDescription(
      lesson.ideaVi,
      `Bài giảng ${lesson.minutes} phút: ý cốt lõi, các bước làm, ví dụ giải mẫu và những bẫy của dạng bài này.`,
    ),
    trail: [HOME, { href: '/bai-giang/', label: 'Bài giảng' }],
    h1: heading,
    priority: 0.7,
    changefreq: 'monthly',
    blocks,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'LearningResource',
        name: lesson.titleVi,
        description: lesson.ideaVi,
        inLanguage: 'vi',
        learningResourceType: 'Lesson',
        educationalLevel: 'Trung học phổ thông',
        timeRequired: `PT${lesson.minutes}M`,
        teaches: skillLabel(lesson.skill, 'vi'),
        provider: { '@id': `${SITE.origin}/#organisation` },
        isAccessibleForFree: true,
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Vocabulary                                                          */
/* ------------------------------------------------------------------ */

function vocabPage(): SitePage {
  const stats = vocabStats();
  const senses = vocabWithSecondSense().slice(0, 40);

  return {
    path: '/tu-vung-sat/',
    title: 'Từ vựng Digital SAT: nghĩa thứ hai mới là bẫy thật | SAT365',
    description: `${stats.total} từ, trong đó ${stats.withSecondSense} từ quen thuộc mang nghĩa học thuật khác hẳn nghĩa thường ngày — dạng bẫy khiến học sinh trả lời tự tin và vẫn sai.`,
    trail: [HOME],
    h1: 'Từ vựng Digital SAT, và bẫy mà danh sách dịch nghĩa không dạy được',
    priority: 0.85,
    changefreq: 'monthly',
    blocks: [
      {
        kind: 'lead',
        text: 'Digital SAT đã bỏ dạng câu khiến các danh sách từ hiếm trở nên có ích. Cái thay thế nó khó hơn: đề lấy một từ học sinh đã biết rồi dùng ở nghĩa học thuật.',
      },
      {
        kind: 'p',
        text: 'Kiểu sai này không có triệu chứng. Câu văn vẫn đọc xuôi nên học sinh không dừng lại, trả lời tự tin, và sau đó không nói được sai ở đâu. Ôn lại cũng không bắt được, vì em ấy ĐÃ biết từ đó.',
      },
      { kind: 'h2', text: 'Ví dụ: những từ đổi nghĩa trong đề', id: 'nghia-thu-hai' },
      {
        kind: 'table',
        caption: `${senses.length} trong số ${stats.withSecondSense} từ mang nghĩa thứ hai`,
        head: ['Từ', 'Nghĩa thường ngày', 'Nghĩa đề dùng'],
        rows: senses.map((word) => [word.word, word.definitionVi, word.satSense!.glossVi]),
      },
      { kind: 'h2', text: 'Hai từ mang chính nghĩa ngược của nó', id: 'trai-nghia' },
      {
        kind: 'ul',
        items: [
          'sanction — làm động từ thường là "chuẩn thuận, cho phép"; làm danh từ số nhiều lại là "lệnh trừng phạt". Chỉ câu văn mới quyết định được.',
          'table — trong tiếng Anh Mỹ nghĩa là "hoãn thảo luận một đề xuất"; trong tiếng Anh Anh lại là "đưa ra thảo luận". Trên đề Mỹ thì là hoãn.',
        ],
      },
      { kind: 'h2', text: 'Bẫy riêng của người học tiếng Việt', id: 'bay-tieng-viet' },
      {
        kind: 'ul',
        items: [
          'disinterested KHÔNG phải "không quan tâm" — nó nghĩa là vô tư, không có lợi ích riêng nên phán xét công bằng được.',
          'bemused KHÔNG phải "thấy buồn cười" — nó nghĩa là bối rối, ngơ ngác không hiểu.',
          'exploit trong đoạn khoa học hoàn toàn không mang ý chê — nó nghĩa là "khai thác, tận dụng", trung tính.',
          'qualify trên đề gần như luôn làm YẾU đi một khẳng định, không phải "đủ điều kiện".',
        ],
      },
      {
        kind: 'cta',
        href: '/app/#/vocab',
        label: 'Học bộ từ trong nền tảng',
        note: `Toàn bộ ${stats.total} từ, có lịch ôn giãn cách và ${stats.withTrap} mục ghi rõ chỗ dễ nhầm với từ gần nghĩa.`,
      },
    ],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'LearningResource',
        name: 'Kho từ vựng Digital SAT SAT365',
        description: `${stats.total} từ với ${stats.withSecondSense} mục nghĩa thứ hai và ${stats.withTrap} mục ghi rõ bẫy.`,
        inLanguage: ['vi', 'en'],
        learningResourceType: 'Vocabulary list',
        provider: { '@id': `${SITE.origin}/#organisation` },
        isAccessibleForFree: true,
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Method, certification, FAQ                                          */
/* ------------------------------------------------------------------ */

function methodPage(): SitePage {
  return {
    path: '/phuong-phap-cham-diem/',
    title: 'SAT365 chấm điểm thế nào, và sai số bao nhiêu | SAT365',
    description:
      'Đề thích ứng hai giai đoạn, ước lượng năng lực bằng IRT 2 tham số, quy về thang 400–1600 kèm sai số đo. Kèm những giới hạn chúng tôi nêu trước.',
    trail: [HOME],
    h1: 'Điểm được tạo ra như thế nào — và sai số của nó là bao nhiêu',
    priority: 0.8,
    changefreq: 'yearly',
    blocks: [
      {
        kind: 'lead',
        text: 'Một điểm số không kèm sai số đo là một con số giả vờ chính xác hơn thực tế. Trang này nói rõ điểm SAT365 được tạo ra bằng cách nào và được phép tin tới đâu.',
      },
      { kind: 'h2', text: 'Đề thích ứng hai giai đoạn', id: 'thich-ung' },
      {
        kind: 'p',
        text: 'Giống Digital SAT thật: mỗi phần thi gồm hai module. Module đầu có độ khó trộn đều cho mọi thí sinh. Kết quả module đầu quyết định module thứ hai là nhánh dễ hơn hay khó hơn. Điểm cuối phụ thuộc cả vào số câu đúng lẫn vào độ khó của những câu đã làm — nên hai người cùng số câu đúng ở hai nhánh khác nhau sẽ không cùng điểm.',
      },
      { kind: 'h2', text: 'Ước lượng năng lực bằng IRT', id: 'irt' },
      {
        kind: 'ol',
        items: [
          'Mỗi câu hỏi có hai tham số: độ phân biệt (a) và độ khó (b).',
          'Từ chuỗi đúng/sai, hệ thống ước lượng năng lực θ theo phương pháp kỳ vọng hậu nghiệm (EAP) trên tiên nghiệm chuẩn.',
          'θ được quy tuyến tính về thang 200–800 cho mỗi phần, cộng lại thành 400–1600.',
          'Sai số chuẩn của phép đo (SEM) được tính cùng lúc và luôn hiển thị kèm điểm.',
        ],
      },
      {
        kind: 'note',
        title: 'Vì sao sai số quan trọng hơn người ta tưởng',
        text: 'Hai lần thi chênh nhau 20 điểm trên một bài có sai số 30 thì chưa chứng minh được điều gì cả. SAT365 từ chối gọi mức chênh đó là tiến bộ — trong phiếu báo phụ huynh và trong xét cấp chứng nhận đều vậy. Sai số cộng gộp của hai lần thi tính bằng căn tổng bình phương, không phải phép cộng.',
      },
      { kind: 'h2', text: 'Những giới hạn chúng tôi nêu trước', id: 'gioi-han' },
      {
        kind: 'ul',
        items: [
          'Tham số a và b là ước lượng của người soạn đề, chưa hiệu chuẩn trên dữ liệu thi thật quy mô lớn. Hệ thống có sẵn quy trình hiệu chuẩn MMLE-EM, nhưng nó cần dữ liệu phản hồi thật để chạy.',
          'Độ tin cậy biên của một đề được tính và hiển thị. Đề nào không đủ tin cậy để ra quyết định cho cá nhân thì hệ thống nói thẳng như vậy, và từ chối cấp chứng nhận dựa trên nó.',
          'Thang điểm dùng cùng khoảng 400–1600 với SAT thật, nhưng đây không phải điểm College Board và không trường đại học nào chấp nhận.',
        ],
      },
      {
        kind: 'cta',
        href: '/app/#/tests',
        label: 'Làm một đề đầy đủ',
        note: 'Đề trọn vẹn theo cấu trúc Digital SAT, có bấm giờ và giờ nghỉ giữa hai phần.',
      },
    ],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: 'SAT365 chấm điểm thế nào, và sai số bao nhiêu',
        inLanguage: 'vi',
        author: { '@id': `${SITE.origin}/#organisation` },
        publisher: { '@id': `${SITE.origin}/#organisation` },
        dateModified: SITE.updated,
      },
    ],
  };
}

function certificationPage(): SitePage {
  const scheme = SAT365_SCHEME;
  return {
    path: '/chung-nhan/',
    title: 'Chứng nhận năng lực SAT365 — điều kiện và bậc | SAT365',
    description:
      'Chuẩn nội bộ theo bậc năng lực, không theo thứ hạng. Bậc chỉ được cấp khi khoảng sai số của điểm nằm trọn trên mốc — không phải khi điểm chạm mốc.',
    trail: [HOME],
    h1: 'Chứng nhận năng lực, và vì sao nó khó đạt hơn một con số',
    priority: 0.75,
    changefreq: 'yearly',
    blocks: [
      {
        kind: 'lead',
        text: 'Một học viên luyện sáu tháng có một tập điểm số và không có cách nào nói mình LÀM ĐƯỢC gì. Chứng nhận biến điều đó thành một câu có thể đứng ra bảo đảm — và toàn bộ giá trị của nó nằm ở chỗ đủ khó để câu đó là thật.',
      },
      { kind: 'h2', text: 'Bốn bậc, mô tả theo việc làm được', id: 'bac' },
      {
        kind: 'p',
        text: 'Không có phần trăm, không có thứ hạng. Một lớp cùng tiến bộ thì cùng lên bậc — thứ hạng không diễn đạt được điều đó. Và thứ hạng cấp trong nội bộ một trung tâm chỉ xếp học viên với những ai tình cờ cùng ghi danh.',
      },
      {
        kind: 'table',
        head: ['Bậc', 'Từ điểm', 'Chứng nhận rằng người cầm'],
        rows: scheme.bands.map((band) => [band.nameVi, String(band.minScore), band.descriptors[0].vi]),
      },
      { kind: 'h2', text: 'Quy tắc khiến chứng nhận này đáng có', id: 'quy-tac' },
      {
        kind: 'note',
        title: 'Bậc chỉ được cấp khi khoảng sai số nằm trọn trên mốc',
        text: 'Thí sinh được 1215 với sai số ±30 thì bằng chứng vẫn tương thích với 1185 — chưa chứng minh được chuẩn 1200. Bậc được cấp là bậc thấp hơn, kèm con số mà một lượt thi nữa cần vượt qua. Quy tắc này làm mất đi một số lượt cấp, và đó là lý do nó đáng tin: không có nó thì thi đủ nhiều lần, ai rồi cũng được nhiễu đẩy qua mốc.',
      },
      {
        kind: 'ul',
        items: [
          'Phải là một lượt thi trọn vẹn. Đề lẻ một phần chỉ đo được một nửa chuẩn.',
          `Đề đã phát phải có độ tin cậy từ ${scheme.minReliability.toFixed(2)} trở lên. Đề không đủ chính xác để ra quyết định cá nhân thì không được dùng để cấp — và đó là lỗi của bộ đề, không phải của thí sinh.`,
          `Nhật ký giám sát không có khoảng vắng mặt quá ${scheme.maxAwaySeconds} giây. Kết quả vẫn giữ; chỉ chứng nhận là tạm giữ.`,
        ],
      },
      { kind: 'h2', text: 'Đây không phải điểm College Board', id: 'khong-phai-sat' },
      { kind: 'p', text: scheme.disclaimerVi },
      {
        kind: 'cta',
        href: '/app/#/certificate',
        label: 'Xem chuẩn và tình trạng xét cấp',
        note: 'Toàn bộ quy tắc xét cấp hiển thị ngay trên trang, đọc được trước khi thi và kiểm được sau khi thi.',
      },
    ],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'EducationalOccupationalCredential',
        name: scheme.nameVi,
        description: scheme.disclaimerVi,
        credentialCategory: 'certificate',
        recognizedBy: { '@id': `${SITE.origin}/#organisation` },
        validFor: `P${scheme.validMonths}M`,
        inLanguage: 'vi',
      },
    ],
  };
}

interface Qa {
  q: string;
  a: string;
}

const FAQ: Qa[] = [
  {
    q: 'Digital SAT khác gì SAT trên giấy?',
    a: 'Ngắn hơn và thích ứng. Bài thi còn khoảng 2 giờ 14 phút thay vì 3 tiếng, mỗi phần chia hai module, và độ khó của module thứ hai phụ thuộc kết quả module đầu. Đoạn đọc ngắn hơn nhiều — mỗi câu hỏi một đoạn riêng — và được dùng máy tính cho toàn bộ phần Toán.',
  },
  {
    q: 'SAT có trừ điểm khi trả lời sai không?',
    a: 'Không. Từ năm 2016 SAT bỏ hoàn toàn việc trừ điểm câu sai. Vì vậy bỏ trống luôn thiệt hơn đoán, và không có tình huống nào để trống là lựa chọn tốt hơn.',
  },
  {
    q: 'Luyện SAT mất bao lâu?',
    a: 'Với người xuất phát dưới 1100, một khoá nền tảng 13 buổi trải 7 tuần cộng khoảng 2–3 giờ bài về nhà mỗi tuần là mức thiết kế thực tế. Từ 1100 đến 1350, khoá chuẩn khoảng 12 buổi. Con số này là thiết kế, không phải cam kết: đơn vị nào chưa đạt mốc kiểm tra thì học lại, và khoá sẽ dài hơn.',
  },
  {
    q: 'Bao nhiêu điểm SAT là đủ?',
    a: 'Phụ thuộc trường bạn nộp, và đây là câu chỉ trường mới trả lời được. Điều nền tảng này làm được là cho bạn biết mình đang ở đâu KÈM sai số đo, để bạn không nhầm một dao động ngẫu nhiên thành tiến bộ hay thụt lùi.',
  },
  {
    q: 'Nên bắt đầu luyện SAT từ lớp mấy?',
    a: 'Thời điểm hợp lý nhất là khi bạn đã có đủ nền tiếng Anh để đọc một đoạn học thuật mà không phải tra từ liên tục. Xếp lớp ở đây dựa trên bài kiểm tra đầu vào chứ không dựa trên khối lớp — hai học sinh cùng lớp 11 có thể cần hai khoá hoàn toàn khác nhau.',
  },
  {
    q: 'Học SAT ở nhà một mình có được không?',
    a: 'Được, nếu có ba thứ: một đề cương nói rõ học gì theo thứ tự nào, lời giải giải thích vì sao phương án sai lại hấp dẫn, và một cách đo tiến bộ trung thực. SAT365 công khai cả ba. Thứ tự học không phải chuyện nhỏ — đề cương của chúng tôi ghi rõ vì sao từng đơn vị đứng ở vị trí của nó.',
  },
  {
    q: 'Adaptive hai giai đoạn nghĩa là gì và ảnh hưởng thế nào tới điểm?',
    a: 'Module đầu quyết định bạn vào nhánh dễ hơn hay khó hơn ở module thứ hai. Vì điểm phụ thuộc cả độ khó của câu đã làm, hai thí sinh cùng số câu đúng ở hai nhánh khác nhau sẽ không cùng điểm. Hệ quả thực tế: module đầu quan trọng hơn cảm giác của nó.',
  },
  {
    q: 'Từ vựng SAT nên học thế nào?',
    a: 'Không phải học danh sách từ hiếm. Digital SAT lấy từ bạn đã biết rồi dùng ở nghĩa học thuật — qualify là "giới hạn lại" chứ không phải "đủ điều kiện", sound là "vững chắc" chứ không phải "âm thanh". Đó mới là chỗ mất điểm, và nó không có triệu chứng vì câu văn vẫn đọc xuôi.',
  },
  {
    q: 'Chứng nhận của SAT365 có được trường đại học chấp nhận không?',
    a: 'Không. Đây là chuẩn nội bộ do một đơn vị giảng dạy cấp, và câu này được in ngay trên phôi chứng nhận. Nó dùng để một học viên biết mình đã đạt một chuẩn đã công bố, vào một ngày cụ thể, trong điều kiện cụ thể — và không hàm ý gì hơn thế.',
  },
  {
    q: 'Dữ liệu bài làm của tôi được lưu ở đâu?',
    a: 'Trên chính trình duyệt của bạn. Không có máy chủ nào nhận dữ liệu bài làm. Điều đó cũng có nghĩa là xoá dữ liệu trình duyệt sẽ mất bài, nên nền tảng có chức năng xuất và nhập bản sao lưu.',
  },
];

function faqPage(): SitePage {
  return {
    path: '/cau-hoi-thuong-gap/',
    title: 'Câu hỏi thường gặp về Digital SAT | SAT365',
    description:
      'SAT có trừ điểm sai không, luyện bao lâu, adaptive hai giai đoạn là gì, từ vựng nên học thế nào — trả lời bằng con số cụ thể và nêu rõ điều còn chưa chắc.',
    trail: [HOME],
    h1: 'Câu hỏi thường gặp về Digital SAT',
    priority: 0.85,
    changefreq: 'monthly',
    blocks: [
      {
        kind: 'lead',
        text: 'Mỗi câu trả lời ở đây cố gắng đưa một con số cụ thể, và nói rõ con số đó giả định điều gì. Câu trả lời kiểu "tuỳ vào từng bạn" thì không giúp được ai quyết định điều gì.',
      },
      ...FAQ.map((qa): Block => ({ kind: 'qa', question: qa.q, answer: qa.a })),
    ],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ.map((qa) => ({
          '@type': 'Question',
          name: qa.q,
          acceptedAnswer: { '@type': 'Answer', text: qa.a },
        })),
      },
    ],
  };
}

function papersPage(): SitePage {
  return {
    path: '/de-thi-thu/',
    title: `${PAPERS.length} đề thi thử SAT kèm barem quy đổi | SAT365`,
    description:
      'Đề tuyến tính in được, mọi thí sinh cùng một bộ câu hỏi, kèm bảng quy đổi điểm thô sang thang 200–800 dựng từ chính đường đặc trưng của đề đó.',
    trail: [HOME],
    h1: 'Đề thi thử và barem quy đổi',
    priority: 0.8,
    changefreq: 'monthly',
    blocks: [
      {
        kind: 'lead',
        text: 'Đề trên nền tảng là đề thích ứng. Đề ở đây là đề tuyến tính: mọi thí sinh nhận cùng một bộ câu hỏi, nên in ra và chấm tay được. Nó đo kém chính xác hơn một chút so với bản thích ứng — đó là cái giá để đề có thể in ra, và chúng tôi ghi rõ điều đó trên đề.',
      },
      {
        kind: 'table',
        head: ['Đề', 'Phạm vi', 'Dùng để làm gì'],
        rows: PAPERS.map((paper) => [
          paper.nameVi,
          paper.scope === 'full' ? 'Trọn vẹn hai phần' : paper.scope === 'rw' ? 'Chỉ Đọc–Viết' : 'Chỉ Toán',
          paper.purposeVi,
        ]),
      },
      {
        kind: 'note',
        title: 'Barem được tính, không phải được gán',
        text: 'Bảng quy đổi điểm thô sang thang 200–800 của mỗi đề được dựng bằng cách nghịch đảo đường đặc trưng của chính đề đó. Vì vậy barem thuộc về riêng một đề và không dùng cho đề khác — hai đề khác nhau về độ khó thì cùng một số câu đúng không thể cho cùng một điểm.',
      },
      {
        kind: 'cta',
        href: '/app/#/papers',
        label: 'Mở kệ đề trong nền tảng',
        note: 'Xem đề đầy đủ, lời giải và barem; in được theo khổ A4.',
      },
    ],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Đề thi thử SAT365',
        numberOfItems: PAPERS.length,
        itemListElement: PAPERS.map((paper, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: paper.nameVi,
        })),
      },
    ],
  };
}


function feesPage(): SitePage {
  const label = feeLabel();
  const rows = COURSES.flatMap((course) => {
    const plan = buildCoursePlan(course.id)!;
    return PRICING.deliveries
      .filter((d) => d.id !== 'self')
      .map((d) => ({ course, plan, d, q: quote(course.id, d.id, plan.totalSessions, course.sessionMinutes) }))
      .filter((row) => row.q.available);
  });

  return {
    path: '/hoc-phi/',
    title: fitTitle('Học phí luyện SAT — mức tham khảo theo từng khoá'),
    description: fitDescription(
      'Học phí luyện thi SAT theo lớp nhóm, nhóm nhỏ và kèm 1–1, tính theo số buổi trong đề cương công khai.',
      'Kèm đơn giá quy ra giờ và điều khoản học lại khi chưa đạt mốc kiểm tra.',
    ),
    trail: [HOME],
    h1: 'Học phí luyện SAT, tính theo đề cương chứ không theo cảm tính',
    priority: 0.85,
    changefreq: 'monthly',
    blocks: [
      { kind: 'note', title: 'Đọc trước khi xem số', text: label.vi },
      {
        kind: 'lead',
        text: 'Mỗi gói gắn với một đề cương đã công bố: bạn biết trước bao nhiêu buổi, học gì theo thứ tự nào, và mốc kiểm tra nằm ở đâu. Tổng học phí bằng đơn giá buổi nhân số buổi trong đề cương — không có khoản nào không giải thích được.',
      },
      { kind: 'h2', text: 'Ba hình thức học, và ai hợp với hình thức nào', id: 'hinh-thuc' },
      {
        kind: 'table',
        head: ['Hình thức', 'Sĩ số', 'Đơn giá buổi (tham khảo)', 'Hợp với ai'],
        rows: PRICING.deliveries
          .filter((d) => d.id !== 'self')
          .map((d) => [d.nameVi, d.sizeVi ?? '—', formatVnd(d.amountPerSession), d.suitsVi]),
      },
      {
        kind: 'note',
        title: 'Kèm 1–1 không mặc nhiên tốt hơn',
        text: 'Với phần lớn học viên thì không. Nhóm nhỏ có thứ mà kèm riêng không có: bạn nghe được cách người khác sai, và đó là một trong những cách học nhanh nhất. Kèm 1–1 hợp khi gấp về thời gian hoặc hồ sơ đặc biệt tới mức không nhóm nào khớp.',
      },
      { kind: 'h2', text: 'Học phí theo khoá', id: 'theo-khoa' },
      {
        kind: 'table',
        caption: 'Tổng = đơn giá buổi × số buổi trong đề cương. Cột quy ra giờ để một mức giá không thể ẩn sau một buổi dài hơn.',
        head: ['Khoá', 'Hình thức', 'Số buổi', 'Quy ra giờ', 'Tổng khoá'],
        rows: rows.map((row) => [
          row.course.nameVi,
          row.d.nameVi,
          String(row.q.sessions),
          formatVnd(row.q.perHour),
          formatVnd(row.q.listTotal),
        ]),
      },
      { kind: 'h2', text: 'Điều khoản', id: 'dieu-khoan' },
      { kind: 'ul', items: PRICING.terms.map((t) => t.vi) },
      {
        kind: 'note',
        title: 'Không cam kết điểm số',
        text: 'Trung tâm này không cam kết điểm, và không trung tâm nào trung thực cam kết được. Thứ cam kết được là đề cương, số buổi, và một bản báo cáo sẽ không gọi mức chênh nhỏ hơn sai số đo là tiến bộ.',
      },
      {
        kind: 'cta',
        href: '/khoa-hoc/',
        label: 'Xem đề cương từng khoá trước khi quyết định',
        note: 'Toàn bộ đề cương công khai: từng đơn vị, từng mốc kiểm tra, và vì sao thứ tự lại như vậy.',
      },
    ],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Chương trình luyện thi SAT365',
        itemListElement: PRICING.deliveries
          .filter((d) => d.id !== 'self')
          .map((d, i) => ({ '@type': 'ListItem', position: i + 1, name: d.nameVi })),
      },
    ],
  };
}


function datesPage(): SitePage {
  const d = (iso: string) => {
    const [y, m, day] = iso.split('-');
    return `${day}/${m}/${y}`;
  };

  return {
    path: '/lich-thi-sat/',
    title: fitTitle('Lịch thi SAT 2026–2027 và hạn đăng ký'),
    description: fitDescription(
      'Ngày thi, hạn đăng ký thường và muộn, ngày trả điểm cho từng kỳ SAT 2026–2027.',
      'Kèm bẫy múi giờ khiến thí sinh Việt Nam hay lỡ hạn, và ghi rõ mốc nào là suy ra.',
    ),
    trail: [HOME],
    h1: 'Lịch thi SAT 2026–2027, hạn đăng ký và ngày trả điểm',
    priority: 0.95,
    changefreq: 'weekly',
    blocks: [
      {
        kind: 'note',
        title: 'Bẫy múi giờ — đọc trước khi làm gì khác',
        text: VIETNAM_DEADLINE_NOTE.vi,
      },
      {
        kind: 'lead',
        text: 'Thí sinh quốc tế thi cùng ngày với thí sinh Mỹ, có thêm phụ phí khu vực. Bảng dưới ghi rõ mốc nào lấy từ nguồn và mốc nào được suy ra từ quy luật — vì lỡ một hạn đăng ký vì phần mềm sai một cách tự tin là lỗi không cứu được.',
      },
      {
        kind: 'table',
        caption: 'Cột "Nên đăng ký trước" sớm hơn hạn chính thức 5 tuần: điểm thi ở Hà Nội và TP.HCM kín chỗ từ rất lâu trước hạn.',
        head: ['Ngày thi', 'Nên đăng ký trước', 'Hạn thường', 'Hạn muộn', 'Trả điểm', 'Nguồn'],
        rows: ADMINISTRATIONS.map((a) => [
          d(a.testDate),
          d(registerBy(a)),
          d(a.registrationDeadline),
          d(a.lateRegistrationDeadline),
          d(a.scoreRelease),
          a.provenance.registrationDeadline === 'confirmed' ? 'đã kiểm chứng' : 'suy ra',
        ]),
      },
      { kind: 'h2', text: 'Vì sao có cột "nguồn"', id: 'nguon' },
      { kind: 'p', text: VERIFY_NOTE.vi },
      {
        kind: 'p',
        text: 'Quy luật được dùng để suy ra: hạn thường là trước ngày thi 15 ngày, hạn muộn trước 11 ngày, trả điểm sau 13 ngày. Quy luật này khớp CHÍNH XÁC tới từng ngày với hai kỳ thi mà mọi mốc đều được công bố độc lập (22/08/2026 và 12/09/2026) — đó là lý do việc suy ra các kỳ còn lại có căn cứ chứ không phải đoán mò.',
      },
      { kind: 'h2', text: 'Chọn kỳ thi nào', id: 'chon-ky' },
      {
        kind: 'ul',
        items: [
          'Đừng dồn tất cả vào một lượt cuối. Một buổi sáng xấu là mất cả kỳ, và không còn đường lùi.',
          'Cũng đừng thi ba lượt liên tiếp ba tháng. Giữa hai lượt mà không có một giai đoạn học thì bạn đang đo cùng một năng lực nhiều lần.',
          'Hai lượt cách nhau ít nhất tám tuần, có một giai đoạn học ở giữa, là hình dạng tạo ra điểm cao trên thực tế.',
          'Lượt đầu tiên có một việc không liên quan tới điểm: làm cho phòng thi trở nên bình thường. Thí sinh mà phòng thi đầu tiên trong đời lại đúng là buổi tính điểm sẽ mất điểm vì cái phòng thi chứ không phải vì đề.',
        ],
      },
      {
        kind: 'cta',
        href: '/lo-trinh-1600/',
        label: 'Xem lộ trình 6–12 tháng ứng với từng kỳ thi',
        note: 'Từ điểm đầu vào tới kỳ thi lấy điểm: đi qua khoá nào, trong bao lâu, thi mấy lượt.',
      },
    ],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Lịch thi SAT 2026–2027',
        numberOfItems: ADMINISTRATIONS.length,
        itemListElement: ADMINISTRATIONS.map((a, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: `Kỳ thi SAT ${d(a.testDate)}`,
        })),
      },
    ],
  };
}

function roadmapPage(): SitePage {
  const paths = [
    { from: 900, to: 1300 },
    { from: 1100, to: 1400 },
    { from: 1250, to: 1500 },
    { from: 1400, to: 1550 },
  ];

  return {
    path: '/lo-trinh-1600/',
    title: fitTitle('Lộ trình luyện SAT 6–12 tháng, tính theo điểm đầu vào'),
    description: fitDescription(
      'Từ điểm đầu vào tới kỳ thi lấy điểm: đi qua khoá nào, trong bao lâu, thi mấy lượt, và cần bao nhiêu giờ cho từng mức điểm.',
      'Kèm điều kiện thực tế của một điểm đỉnh 1550–1600.',
    ),
    trail: [HOME],
    h1: 'Lộ trình luyện SAT 6–12 tháng, dựng từ điểm đầu vào',
    priority: 0.95,
    changefreq: 'monthly',
    blocks: [
      {
        kind: 'lead',
        text: 'Một lộ trình cần điểm xuất phát. Không có bài kiểm tra đầu vào full-length thì mọi độ dài giai đoạn và mọi mức điểm dự kiến đều là bịa — và kế hoạch dựng trên một điểm xuất phát bịa thì sai ở mọi con số nó chứa.',
      },
      { kind: 'h2', text: 'Bốn giai đoạn, nối theo điểm đầu vào', id: 'giai-doan' },
      {
        kind: 'ol',
        items: [
          'Nền tảng — cho người chưa gặp đủ mọi dạng bài. Dựng độ phủ trước, vì một dạng chưa từng nhận ra được thì không thể cải thiện.',
          'Chuẩn — cho người đọc đã tốt và điểm mất đã cụ thể. Làm bốn kỹ năng Đọc–Viết và ba mảng Toán ngăn cách nhóm giữa với nhóm trên.',
          'Tăng tốc — cho người chỉ còn mất ba bốn câu mỗi module, toàn band khó. Chỉ làm phiếu nâng cao.',
          'Nước rút — bốn tuần cuối, cố ý không dạy gì mới. Một phương pháp gặp lần đầu trong tuần cuối sẽ được mang vào phòng thi khi chưa kịp thành phản xạ.',
        ],
      },
      {
        kind: 'p',
        text: 'Học viên bắt đầu ở 1400 không đi qua khoá Nền tảng. Xếp giai đoạn căn cứ bài kiểm tra đầu vào chứ không căn cứ mong muốn — xếp theo cảm nhận thì sai khoảng một phần ba số trường hợp, và sai theo hướng tệ nhất.',
      },
      { kind: 'h2', text: 'Cần bao nhiêu giờ, theo từng mức xuất phát', id: 'so-gio' },
      {
        kind: 'p',
        text: 'Mức tăng điểm NÉN LẠI khi điểm càng cao: một trăm điểm ở mức 1400 tốn hơn gấp nhiều lần một trăm điểm ở mức 1000. Bảng dưới tính bằng cách cộng dồn qua từng bậc nén, không phải áp một hệ số duy nhất — cách sau làm một lộ trình dài trông khả thi hơn thực tế tới hơn 40%.',
      },
      {
        kind: 'table',
        caption: 'Giờ học có chất lượng, theo mô hình thận trọng của hệ thống. Đây là ĐỘ LỚN của việc phải làm, không phải lời hứa.',
        head: ['Từ', 'Tới', 'Số giờ ước tính', '6 tháng cần mỗi tuần', '12 tháng cần mỗi tuần'],
        rows: paths.map((p) => {
          const hours = hoursToReach(p.from, p.to);
          return [
            String(p.from),
            String(p.to),
            `${hours} giờ`,
            `${(hours / 26).toFixed(1)} giờ`,
            `${(hours / 52).toFixed(1)} giờ`,
          ];
        }),
      },
      { kind: 'h2', text: 'Về mục tiêu 1600', id: 'muc-tieu-1600' },
      { kind: 'note', title: 'Không ai hứa được 1600', text: TOP_SCORE_DISCLAIMER.vi },
      { kind: 'h3', text: 'Điều kiện thực tế của một điểm đỉnh' },
      { kind: 'ul', items: TOP_SCORE_CONDITIONS.map((c) => c.vi) },
      {
        kind: 'p',
        text: 'Hệ quả thực tế: trên khoảng 1550, học thêm không còn là đòn bẩy chính nữa — THI THÊM LƯỢT mới là. Chiến lược tạo ra điểm đỉnh trên thực tế là luyện tới bậc cao nhất mà bạn giữ được ổn định, rồi vào phòng thi hai lần.',
      },
      {
        kind: 'cta',
        href: '/lich-thi-sat/',
        label: 'Chọn kỳ thi và tính ngược lịch học',
        note: 'Lịch thi 2026–2027 với hạn đăng ký, ngày trả điểm và mốc nên đăng ký trước.',
      },
    ],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'Lộ trình luyện thi SAT 6–12 tháng',
        inLanguage: 'vi',
        step: [
          { '@type': 'HowToStep', name: 'Làm đề đầu vào full-length', text: 'Xác lập điểm xuất phát bằng một đề trọn vẹn hai phần, không phải đề lẻ.' },
          { '@type': 'HowToStep', name: 'Xếp giai đoạn theo điểm', text: 'Bắt đầu ở khoá tương ứng khoảng điểm đầu vào, không đi qua khoá thấp hơn năng lực.' },
          { '@type': 'HowToStep', name: 'Chọn hai kỳ thi cách nhau ít nhất tám tuần', text: 'Lượt đầu để làm quen phòng thi, lượt sau để lấy điểm.' },
          { '@type': 'HowToStep', name: 'Kết thúc bằng khoá nước rút', text: 'Bốn tuần cuối không dạy nội dung mới, chỉ đọc vị dưới áp lực thời gian và tổng duyệt.' },
        ],
      },
    ],
  };
}

function resourcesPage(): SitePage {
  return {
    path: '/tai-lieu-chinh-thuc/',
    title: fitTitle('Tài liệu SAT chính thức và SAT365 bổ trợ chỗ nào'),
    description: fitDescription(
      'Bluebook, đề luyện chính thức, Khan Academy — nguồn nào miễn phí, dùng để làm gì, và SAT365 KHÔNG thay thế được chỗ nào.',
      'Danh mục dẫn link, không sao chép nội dung của ai.',
    ),
    trail: [HOME],
    h1: 'Tài liệu SAT chính thức, và chỗ SAT365 không thay thế được',
    priority: 0.8,
    changefreq: 'yearly',
    blocks: [
      { kind: 'lead', text: RESOURCE_PREAMBLE.vi },
      ...RESOURCES.flatMap((resource): Block[] => [
        { kind: 'h2', text: `${resource.name} — ${resource.publisher}` },
        { kind: 'p', text: resource.what.vi },
        { kind: 'ul', items: [
          `Chi phí: ${resource.cost.vi}`,
          `SAT365 bổ trợ: ${resource.complements.vi}`,
          ...(resource.doesNotReplace ? [`SAT365 KHÔNG thay thế: ${resource.doesNotReplace.vi}`] : []),
        ] },
        { kind: 'links', title: `Mở ${resource.name}`, items: [{ href: resource.url, label: resource.url }] },
      ]),
    ],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Tài liệu SAT chính thức',
        itemListElement: RESOURCES.map((r, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: `${r.name} — ${r.publisher}`,
          url: r.url,
        })),
      },
    ],
  };
}

/* ------------------------------------------------------------------ */

export function buildPages(): SitePage[] {
  return [
    homePage(),
    courseIndexPage(),
    ...COURSES.map((course) => coursePage(course.id)),
    lessonIndexPage(),
    ...LESSONS.map(lessonPage),
    vocabPage(),
    methodPage(),
    certificationPage(),
    papersPage(),
    feesPage(),
    datesPage(),
    roadmapPage(),
    resourcesPage(),
    faqPage(),
  ];
}
