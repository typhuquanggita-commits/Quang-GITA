/**
 * The course syllabus — bộ đề cương.
 *
 * The platform had a lesson for every skill, a seven-sheet packet for every
 * topic, five published papers and two thousand items, and no document saying
 * in what order any of it should be met. A teacher opening it for the first
 * time had a library, not a course. That gap is what this file closes.
 *
 * ## Authored where judgement lives, derived where it does not
 *
 * The teaching judgement in a syllabus is the *order* and the *reason*: why
 * Boundaries comes before Transitions, why the first full paper is sat in week
 * three rather than week one, what a unit is supposed to change about how a
 * learner reads. That is authored here, by hand, in prose.
 *
 * Everything mechanical is derived instead — which lesson, which sheets, how
 * many minutes, which objectives. A syllabus that hard-coded sixty sessions
 * against seven sheet references each would be wrong within a month of the
 * first content change, and wrong silently: a dead reference in a syllabus
 * produces a session with nothing in it, not an error. So a unit names its
 * skills, and `src/engine/curriculum.ts` builds the sessions from the lesson
 * and topic data that already exists. Rename a skill and the build fails.
 *
 * ## Why four courses and not one
 *
 * A learner at 950 and a learner at 1400 do not need the same course in
 * different amounts; they need different courses. At 950 the binding
 * constraint is usually that half the question types have never been
 * recognised at all, and the fix is coverage. At 1400 coverage is complete and
 * the binding constraint is the last hard item in each module plus the clock,
 * and the fix is precision under time. A single course stretched across both
 * bores one and drowns the other.
 *
 * Entry is stated as a score condition rather than as a level name, so nobody
 * is placed by impression.
 */

import type { SectionId, SkillId } from '../types.ts';
import type { SheetKind } from '../engine/packets.ts';

export type CourseId = 'foundation' | 'core' | 'advance' | 'sprint';

export interface UnitCheckpoint {
  /** What the checkpoint is made of. */
  kind: 'sheet' | 'paper' | 'certification';
  /** For a paper checkpoint, the published paper to sit. */
  paperId?: string;
  /** Accuracy on the unit's own skills below which the unit is not finished. */
  passAccuracy: number;
  note: string;
  noteVi: string;
}

export interface Unit {
  id: string;
  title: string;
  titleVi: string;
  /** What this unit is meant to change about how the learner works. */
  purpose: string;
  purposeVi: string;
  /**
   * Why the unit sits here in the sequence rather than somewhere else. The
   * field exists because an order without a reason is an arbitrary order, and
   * an arbitrary order cannot be argued with or improved.
   */
  rationale: string;
  rationaleVi: string;
  section: SectionId | 'both';
  /** Skills taught, in teaching order. One session per skill unless doubled. */
  skills: SkillId[];
  /**
   * Skills taught two-to-a-session because they are close enough that the
   * second is mostly a variation on the first.
   */
  paired?: Array<[SkillId, SkillId]>;
  /** Sheets worked in class for each skill in this unit. */
  classSheets: SheetKind[];
  /** Sheets set as homework. */
  homeworkSheets: SheetKind[];
  checkpoint: UnitCheckpoint;
}

export interface Course {
  id: CourseId;
  name: string;
  nameVi: string;
  /** One sentence a parent can read. */
  summary: string;
  summaryVi: string;
  entry: {
    /** Diagnostic total at or above which this course is the right one. */
    minScore: number | null;
    maxScore: number | null;
    note: string;
    noteVi: string;
  };
  exit: {
    targetScore: number;
    note: string;
    noteVi: string;
  };
  sessionMinutes: number;
  sessionsPerWeek: number;
  units: Unit[];
}

/* ================================================================== */
/* Shared checkpoint language                                          */
/* ================================================================== */

const SHEET_CHECK = (accuracy: number): UnitCheckpoint => ({
  kind: 'sheet',
  passAccuracy: accuracy,
  note: `The unit is finished when the exam sheet for each of its topics is worked at ${Math.round(accuracy * 100)}% or better. A unit worked but not passed is repeated, not carried forward — the next unit assumes this one.`,
  noteVi: `Đơn vị chỉ coi là xong khi phiếu thi của từng chuyên đề đạt từ ${Math.round(accuracy * 100)}% trở lên. Đơn vị đã học mà chưa đạt thì học lại, không đẩy tiếp — đơn vị sau mặc định đơn vị này đã vững.`,
});

/* ================================================================== */
/* Foundation — dưới 1100                                              */
/* ================================================================== */

const FOUNDATION_UNITS: Unit[] = [
  {
    id: 'f1',
    title: 'Reading a sentence for what it commits to',
    titleVi: 'Đọc một câu theo đúng điều nó cam kết',
    section: 'rw',
    purpose:
      'Before any question type, the habit of reading a sentence for its claim rather than its topic. A learner who reads for topic can answer every question about what a passage is *about* and none about what it *says*.',
    purposeVi:
      'Trước mọi dạng bài là thói quen đọc một câu theo KHẲNG ĐỊNH của nó chứ không theo CHỦ ĐỀ. Người đọc theo chủ đề trả lời được mọi câu hỏi "bài này nói về cái gì" và không trả lời được câu nào về "bài này khẳng định điều gì".',
    rationale:
      'First, because every later unit assumes it. Central Ideas and Inferences are the two skills where the topic-reading habit is most visibly fatal, so they are where it is cheapest to break.',
    rationaleVi:
      'Đặt đầu tiên vì mọi đơn vị sau đều mặc định có nó. Central Ideas và Inferences là hai kỹ năng mà thói quen đọc theo chủ đề lộ ra rõ nhất, nên đây là chỗ sửa rẻ nhất.',
    skills: ['central-ideas', 'inferences', 'text-structure-purpose'],
    classSheets: ['theory', 'recognition', 'method'],
    homeworkSheets: ['advanced', 'revision'],
    checkpoint: SHEET_CHECK(0.6),
  },
  {
    id: 'f2',
    title: 'The conventions that are decided by structure',
    titleVi: 'Những quy tắc do cấu trúc quyết định',
    section: 'rw',
    purpose:
      'Boundaries and Form/Structure/Sense are the only R&W skills with a right answer that can be derived rather than judged. They are worth an early unit because they convert study time into points at a rate nothing else in the section matches.',
    purposeVi:
      'Boundaries và Form/Structure/Sense là hai kỹ năng Đọc–Viết duy nhất có đáp án SUY RA được chứ không phải cân nhắc. Xứng đáng đặt sớm vì tỷ lệ đổi thời gian học thành điểm cao hơn mọi phần khác của section.',
    rationale:
      'Early, and immediately after the reading habit, because these two are where a low scorer gains fastest — and because a visible early gain is what keeps a sixteen-session course alive to session six.',
    rationaleVi:
      'Đặt sớm, ngay sau đơn vị thói quen đọc, vì đây là chỗ học sinh điểm thấp lên nhanh nhất — và vì một mức tăng thấy được từ sớm là thứ giữ cho khoá 16 buổi sống đến buổi thứ sáu.',
    skills: ['boundaries', 'form-structure-sense'],
    classSheets: ['theory', 'recognition', 'method', 'advanced'],
    homeworkSheets: ['revision', 'exam'],
    checkpoint: SHEET_CHECK(0.7),
  },
  {
    id: 'f3',
    title: 'Linear algebra, until it is automatic',
    titleVi: 'Đại số tuyến tính, cho tới khi thành phản xạ',
    section: 'math',
    purpose:
      'Roughly a third of the Math section is linear. At this level the loss is not conceptual but procedural: the method is known and executed too slowly to finish, or executed with a sign error.',
    purposeVi:
      'Khoảng một phần ba phần Toán là tuyến tính. Ở mức điểm này, mất điểm không phải do không hiểu mà do thao tác: biết cách làm nhưng làm chậm không kịp giờ, hoặc sai dấu.',
    rationale:
      'The largest single block of the Math section, and the one where automaticity — not insight — is what raises the score. It comes before anything nonlinear because every nonlinear method reduces to a linear step somewhere.',
    rationaleVi:
      'Khối lớn nhất của phần Toán, và là chỗ mà PHẢN XẠ chứ không phải sự thông minh mới nâng được điểm. Đặt trước mọi phần phi tuyến vì mọi phương pháp phi tuyến đều quy về một bước tuyến tính ở đâu đó.',
    skills: [
      'linear-equations-1var',
      'linear-equations-2var',
      'linear-functions',
      'linear-systems',
      'linear-inequalities',
    ],
    classSheets: ['theory', 'method'],
    homeworkSheets: ['advanced', 'revision', 'exam'],
    checkpoint: SHEET_CHECK(0.7),
  },
  {
    id: 'f4',
    title: 'Proportional reasoning and the units it hides in',
    titleVi: 'Tư duy tỉ lệ và những đơn vị nó ẩn mình',
    section: 'math',
    purpose:
      'Ratios, rates, units and percentages are one idea wearing four costumes. Taught separately they are four things to remember; taught together they are one, and the unit is where a learner stops converting by guesswork.',
    purposeVi:
      'Tỉ lệ, tốc độ, đơn vị và phần trăm là MỘT ý tưởng khoác bốn bộ áo. Dạy rời ra thì thành bốn thứ phải nhớ; dạy chung thì chỉ còn một — và đây là chỗ học sinh thôi đổi đơn vị theo cảm tính.',
    rationale:
      'After linear work, because a rate problem is a linear function with the units left in. Placing it earlier means teaching the same manipulation twice.',
    rationaleVi:
      'Sau phần tuyến tính, vì một bài tốc độ chính là hàm bậc nhất còn giữ nguyên đơn vị. Đặt sớm hơn thì phải dạy cùng một thao tác hai lần.',
    skills: ['ratios-rates-units', 'percentages'],
    classSheets: ['theory', 'recognition', 'method'],
    homeworkSheets: ['advanced', 'revision', 'exam'],
    checkpoint: SHEET_CHECK(0.7),
  },
  {
    id: 'f5',
    title: 'Evidence, in words and in figures',
    titleVi: 'Bằng chứng, bằng chữ và bằng số',
    section: 'rw',
    purpose:
      'The two Command-of-Evidence skills, taught together because they are the same act performed on two kinds of material: find the claim, then find the one thing that would settle it.',
    purposeVi:
      'Hai kỹ năng Command of Evidence, dạy chung vì chúng là CÙNG một hành động thực hiện trên hai loại chất liệu: tìm ra khẳng định, rồi tìm thứ duy nhất có thể phân định nó.',
    rationale:
      'After the reading habit is fixed, because these questions are unanswerable until a learner can state the claim in their own words. Teaching them earlier teaches option-elimination instead.',
    rationaleVi:
      'Sau khi thói quen đọc đã sửa, vì dạng này không thể làm được nếu học sinh chưa nói lại được khẳng định bằng lời của mình. Dạy sớm hơn là dạy mẹo loại đáp án.',
    skills: ['command-evidence-textual', 'command-evidence-quantitative'],
    classSheets: ['theory', 'recognition', 'method', 'advanced'],
    homeworkSheets: ['revision', 'exam'],
    checkpoint: {
      kind: 'paper',
      paperId: 'sat365-p1',
      passAccuracy: 0.55,
      note: 'The first full-length sitting, in week eight rather than week one. Sat at the start it measures nothing a learner can act on; sat here it measures whether the first half of the course transferred to a timed paper, which is a different question from whether the sheets were passed.',
      noteVi: 'Lần thi full-length đầu tiên, đặt ở tuần thứ tám chứ không phải tuần đầu. Thi ngay từ đầu thì đo được thứ học sinh không làm gì được; thi ở đây thì đo xem nửa đầu khoá có chuyển được sang một đề bấm giờ hay không — đó là câu hỏi khác hẳn với "phiếu có đạt không".',
    },
  },
  {
    id: 'f6',
    title: 'Data, and the claims people make from it',
    titleVi: 'Dữ liệu, và những khẳng định người ta rút ra từ nó',
    section: 'math',
    purpose:
      'Reading a figure is not the skill; deciding what a figure licenses is. This unit is where a learner stops answering "what does the graph show" and starts answering "what does the graph rule out".',
    purposeVi:
      'Đọc được biểu đồ chưa phải là kỹ năng; biết biểu đồ CHO PHÉP kết luận gì mới là. Đây là chỗ học sinh thôi trả lời "biểu đồ cho thấy gì" và bắt đầu trả lời "biểu đồ loại trừ được gì".',
    rationale:
      'Late in the foundation course, because it shares its whole logic with quantitative evidence in R&W. Taught after that unit, half of it is already done.',
    rationaleVi:
      'Đặt cuối khoá nền tảng vì nó dùng chung toàn bộ logic với Command of Evidence dạng số ở Đọc–Viết. Dạy sau đơn vị đó thì một nửa đã xong sẵn.',
    skills: ['one-variable-data', 'two-variable-data', 'probability'],
    classSheets: ['theory', 'recognition', 'method'],
    homeworkSheets: ['advanced', 'revision', 'exam'],
    checkpoint: SHEET_CHECK(0.7),
  },
];

/* ================================================================== */
/* Core — 1100 đến 1350                                                */
/* ================================================================== */

const CORE_UNITS: Unit[] = [
  {
    id: 'c1',
    title: 'The four skills that separate 1200 from 1350',
    titleVi: 'Bốn kỹ năng ngăn cách 1200 với 1350',
    section: 'rw',
    purpose:
      'Words in Context, Transitions, Rhetorical Synthesis and Cross-Text Connections. At this level the reading is sound and the losses cluster in exactly these four, because each is decided by a distinction rather than by comprehension.',
    purposeVi:
      'Words in Context, Transitions, Rhetorical Synthesis và Cross-Text Connections. Ở mức này khả năng đọc đã ổn, điểm mất tập trung đúng vào bốn kỹ năng này — vì mỗi kỹ năng được quyết bởi một PHÂN BIỆT chứ không phải bởi việc hiểu bài.',
    rationale:
      'First in the core course because they are where the learner already is. A course that opens by revisiting Central Ideas with a 1250 learner has spent its first three sessions confirming what they can already do.',
    rationaleVi:
      'Đặt đầu khoá Chuẩn vì đây đúng là chỗ học viên đang đứng. Khoá học mở đầu bằng ôn lại Central Ideas cho học sinh 1250 là đã tiêu ba buổi đầu để xác nhận điều em ấy vốn đã làm được.',
    skills: ['words-in-context', 'transitions', 'rhetorical-synthesis', 'cross-text-connections'],
    classSheets: ['recognition', 'method', 'advanced'],
    homeworkSheets: ['revision', 'exam'],
    checkpoint: SHEET_CHECK(0.75),
  },
  {
    id: 'c2',
    title: 'Nonlinear work, and knowing which form to reach for',
    titleVi: 'Phần phi tuyến, và biết với lấy dạng nào',
    section: 'math',
    purpose:
      'Equivalent expressions, nonlinear equations and nonlinear functions. The competence being built is not manipulation — most learners here can factor — but choosing the form that makes the question trivial before starting to write.',
    purposeVi:
      'Biểu thức tương đương, phương trình và hàm phi tuyến. Năng lực cần dựng không phải là biến đổi — phần lớn học viên ở mức này phân tích được đa thức — mà là CHỌN ĐÚNG DẠNG khiến câu hỏi thành dễ, trước khi đặt bút.',
    rationale:
      'Immediately after the R&W unit so the two sections stay in step; a course that finishes one section before starting the other leaves the second cold on test day.',
    rationaleVi:
      'Ngay sau đơn vị Đọc–Viết để hai phần đi song song; khoá học dạy xong hẳn một section rồi mới sang section kia sẽ để phần sau nguội lạnh đúng vào ngày thi.',
    skills: ['equivalent-expressions', 'nonlinear-equations', 'nonlinear-functions'],
    classSheets: ['theory', 'method', 'advanced'],
    homeworkSheets: ['revision', 'exam'],
    checkpoint: SHEET_CHECK(0.75),
  },
  {
    id: 'c3',
    title: 'Geometry and trigonometry, on a small number of facts',
    titleVi: 'Hình học và lượng giác, dựa trên một số ít sự kiện',
    section: 'math',
    purpose:
      'The section rewards a short list of facts applied confidently far more than a long list half-remembered. This unit fixes the short list and drills the recognition that decides which fact applies.',
    purposeVi:
      'Phần thi thưởng cho một danh sách NGẮN các sự kiện được dùng chắc tay, hơn hẳn một danh sách dài nhớ lơ mơ. Đơn vị này chốt danh sách ngắn đó và luyện khả năng nhận ra sự kiện nào áp dụng được.',
    rationale:
      'Placed after the nonlinear unit because right-triangle trigonometry and circle equations both lean on it. Placed before the statistics unit because it is the more mechanical of the two and settles faster.',
    rationaleVi:
      'Đặt sau đơn vị phi tuyến vì lượng giác tam giác vuông và phương trình đường tròn đều dựa vào đó. Đặt trước đơn vị thống kê vì đây là phần cơ học hơn, ổn định nhanh hơn.',
    skills: ['area-volume', 'lines-angles-triangles', 'right-triangles-trig', 'circles'],
    classSheets: ['theory', 'recognition', 'method'],
    homeworkSheets: ['advanced', 'revision', 'exam'],
    checkpoint: {
      kind: 'paper',
      paperId: 'sat365-p2',
      passAccuracy: 0.65,
      note: 'A second full-length paper, at least four weeks after the first. Sat sooner it measures memory of the first paper rather than movement.',
      noteVi: 'Đề full-length thứ hai, cách đề đầu ít nhất bốn tuần. Thi sớm hơn thì đo trí nhớ về đề trước chứ không đo tiến bộ.',
    },
  },
  {
    id: 'c4',
    title: 'Statistical claims, and what a sample can support',
    titleVi: 'Khẳng định thống kê, và những gì một mẫu chống đỡ được',
    section: 'math',
    purpose:
      'Inference from samples, margins of error, and the difference between a result and the claim someone makes from it. Consistently the least-taught part of the section and one of the most reliably tested.',
    purposeVi:
      'Suy luận từ mẫu, sai số, và khoảng cách giữa MỘT KẾT QUẢ với KHẲNG ĐỊNH mà người ta rút ra từ nó. Đây là phần ít được dạy nhất và lại nằm trong đề đều đặn nhất.',
    rationale:
      'Late, because it is the one Math unit whose content genuinely helps the Reading section too: the same distinction between association and cause carries both.',
    rationaleVi:
      'Đặt muộn, vì đây là đơn vị Toán duy nhất mà nội dung của nó giúp thật sự cho phần Đọc: cùng một phân biệt giữa "có liên hệ" và "là nguyên nhân" dùng được cho cả hai.',
    skills: ['inference-statistics', 'statistical-claims'],
    classSheets: ['theory', 'recognition', 'method', 'advanced'],
    homeworkSheets: ['revision', 'exam'],
    checkpoint: SHEET_CHECK(0.75),
  },
];

/* ================================================================== */
/* Advance — trên 1350                                                 */
/* ================================================================== */

const ADVANCE_UNITS: Unit[] = [
  {
    id: 'a1',
    title: 'The hard half of Reading and Writing',
    titleVi: 'Nửa khó của Đọc–Viết',
    section: 'rw',
    purpose:
      'At this level coverage is complete and the remaining losses are three or four items per module, all in the hard band. The unit works only the hard sheets, on the skills where a hard item is genuinely different in kind rather than merely longer.',
    purposeVi:
      'Ở mức này độ phủ đã đủ, phần mất còn lại chỉ ba bốn câu mỗi module và đều nằm ở band khó. Đơn vị này chỉ làm phiếu nâng cao, trên đúng những kỹ năng mà câu khó khác hẳn về BẢN CHẤT chứ không chỉ dài hơn.',
    rationale:
      'First, because it is the largest remaining pool of recoverable points and because it is the slowest to move — starting it late leaves no time for the second attempt these items usually need.',
    rationaleVi:
      'Đặt đầu vì đây là kho điểm lấy lại được lớn nhất còn sót, và cũng là phần chuyển chậm nhất — bắt đầu muộn thì không còn thời gian cho lần thử thứ hai mà dạng câu này thường cần.',
    skills: ['cross-text-connections', 'rhetorical-synthesis', 'text-structure-purpose', 'inferences'],
    classSheets: ['advanced'],
    homeworkSheets: ['revision', 'exam'],
    checkpoint: SHEET_CHECK(0.8),
  },
  {
    id: 'a2',
    title: 'The hard half of Math',
    titleVi: 'Nửa khó của Toán',
    section: 'math',
    purpose:
      'Nonlinear functions, circles, and statistical claims carry almost all of the hard-band Math loss at this level. Worked at the hard sheet only, with the clock running.',
    purposeVi:
      'Hàm phi tuyến, đường tròn và khẳng định thống kê gánh gần như toàn bộ phần mất điểm ở band khó của Toán tại mức này. Chỉ làm phiếu nâng cao, có bấm giờ.',
    rationale:
      'Paired with the R&W unit rather than following it, so both sections stay warm across the whole course.',
    rationaleVi:
      'Đi song song với đơn vị Đọc–Viết chứ không nối tiếp, để cả hai phần đều "ấm" suốt khoá.',
    skills: ['nonlinear-functions', 'circles', 'statistical-claims', 'right-triangles-trig'],
    classSheets: ['advanced'],
    homeworkSheets: ['revision', 'exam'],
    checkpoint: SHEET_CHECK(0.8),
  },
  {
    id: 'a3',
    title: 'The clock as the binding constraint',
    titleVi: 'Đồng hồ là ràng buộc quyết định',
    section: 'both',
    purpose:
      'At this level a learner who had unlimited time would already score near their target. The unit trains the two decisions that recover the most: which item to leave, and when to stop checking one that is already right.',
    purposeVi:
      'Ở mức này, nếu không giới hạn thời gian thì học viên đã gần đạt mục tiêu. Đơn vị này luyện hai quyết định lấy lại nhiều điểm nhất: bỏ câu nào, và dừng kiểm tra lúc nào với câu vốn đã đúng.',
    rationale:
      'Last, because it is a skill practised on material already mastered. Training triage on content the learner cannot do teaches avoidance rather than judgement.',
    rationaleVi:
      'Đặt cuối, vì đây là kỹ năng luyện trên phần nội dung đã nắm vững. Luyện chọn bỏ câu trên nội dung chưa làm được là dạy né tránh chứ không phải dạy phán đoán.',
    skills: ['linear-systems', 'nonlinear-equations', 'words-in-context', 'transitions'],
    classSheets: ['exam'],
    homeworkSheets: ['exam'],
    checkpoint: {
      kind: 'certification',
      passAccuracy: 0.8,
      note: 'The course ends at the certification sitting rather than at a lesson, so the last thing the learner does under this teacher is the thing they will do alone in the exam hall.',
      noteVi: 'Khoá kết thúc bằng buổi thi cấp chứng chỉ chứ không phải bằng một bài giảng, để việc cuối cùng học viên làm dưới sự hướng dẫn của giáo viên chính là việc em ấy sẽ làm một mình trong phòng thi.',
    },
  },
];

/* ================================================================== */
/* Sprint — bốn tuần cuối                                              */
/* ================================================================== */

const SPRINT_UNITS: Unit[] = [
  {
    id: 's1',
    title: 'Recognition under time, across every question type',
    titleVi: 'Đọc vị dưới áp lực thời gian, khắp mọi dạng bài',
    section: 'both',
    purpose:
      'Four weeks out, nothing new should be taught. This unit works the recognition sheet for the widest possible set of types, because the failure that costs most in the last month is not ignorance but hesitation.',
    purposeVi:
      'Còn bốn tuần thì không nên dạy thêm cái gì mới. Đơn vị này chạy phiếu đọc vị trên tập dạng bài rộng nhất có thể, vì thứ làm mất điểm nhiều nhất trong tháng cuối không phải là không biết mà là chần chừ.',
    rationale:
      'First and only teaching unit of the sprint. Anything else displaces rehearsal, and in the last four weeks rehearsal is worth more than instruction.',
    rationaleVi:
      'Là đơn vị dạy duy nhất của khoá nước rút. Thêm bất cứ gì khác cũng lấn vào thời gian tổng duyệt, mà trong bốn tuần cuối thì tổng duyệt đáng giá hơn giảng bài.',
    skills: [
      'central-ideas',
      'command-evidence-textual',
      'transitions',
      'boundaries',
      'linear-functions',
      'nonlinear-functions',
      'ratios-rates-units',
      'two-variable-data',
    ],
    classSheets: ['recognition'],
    homeworkSheets: ['revision'],
    checkpoint: SHEET_CHECK(0.75),
  },
  {
    id: 's2',
    title: 'Full-length rehearsal, under exam conditions',
    titleVi: 'Tổng duyệt full-length, đúng điều kiện phòng thi',
    section: 'both',
    purpose:
      'Two complete papers with the real clock, the real break, and no interruption. The purpose is not measurement — that has already happened — but making the fourth hour of concentration familiar.',
    purposeVi:
      'Hai đề trọn vẹn với đồng hồ thật, giờ nghỉ thật, không gián đoạn. Mục đích không phải để đo — việc đó đã làm rồi — mà để giờ tập trung thứ tư trở nên quen thuộc.',
    rationale:
      'Last, and deliberately not followed by new teaching. A learner who meets a new method in the final week carries an unrehearsed method into the exam.',
    rationaleVi:
      'Đặt cuối, và cố ý không dạy thêm gì sau đó. Học viên gặp một phương pháp mới trong tuần cuối sẽ mang vào phòng thi một phương pháp chưa kịp thành phản xạ.',
    skills: ['inference-statistics', 'cross-text-connections'],
    classSheets: ['exam'],
    homeworkSheets: ['exam'],
    checkpoint: {
      kind: 'paper',
      paperId: 'sat365-p3',
      passAccuracy: 0.7,
      note: 'The final rehearsal, sat no later than seven days before the real test. Closer than that and a poor result has no time to be repaired, so it damages confidence without buying information.',
      noteVi: 'Buổi tổng duyệt cuối, thi chậm nhất là bảy ngày trước ngày thi thật. Sát hơn nữa thì một kết quả kém không còn thời gian để sửa — chỉ làm mất tự tin mà không đổi lại được thông tin gì.',
    },
  },
];

/* ================================================================== */

export const COURSES: Course[] = [
  {
    id: 'foundation',
    name: 'SAT365 Foundation',
    nameVi: 'SAT365 Nền tảng',
    summary:
      'For a learner who has not yet met every question type. Builds coverage first, because a type never recognised cannot be improved.',
    summaryVi:
      'Dành cho học viên chưa gặp đủ mọi dạng bài. Dựng độ phủ trước, vì một dạng chưa từng nhận ra được thì không thể cải thiện.',
    entry: {
      minScore: null,
      maxScore: 1090,
      note: 'A diagnostic total below 1100, or no diagnostic yet. Placement is by the diagnostic, never by school year.',
      noteVi: 'Điểm bài kiểm tra đầu vào dưới 1100, hoặc chưa làm bài đầu vào. Xếp lớp theo bài kiểm tra, không xếp theo lớp ở trường.',
    },
    exit: {
      targetScore: 1200,
      note: 'Every question type met at least once, and the exam sheet passed on every foundation topic.',
      noteVi: 'Đã gặp mọi dạng bài ít nhất một lần, và phiếu thi đạt trên toàn bộ chuyên đề nền tảng.',
    },
    sessionMinutes: 120,
    sessionsPerWeek: 2,
    units: FOUNDATION_UNITS,
  },
  {
    id: 'core',
    name: 'SAT365 Core',
    nameVi: 'SAT365 Chuẩn',
    summary:
      'For a learner whose reading is sound and whose losses have become specific. Works the four skills and three Math strands that separate the middle from the upper band.',
    summaryVi:
      'Dành cho học viên đã đọc tốt và điểm mất đã trở nên cụ thể. Làm bốn kỹ năng và ba mảng Toán ngăn cách nhóm giữa với nhóm trên.',
    entry: {
      minScore: 1100,
      maxScore: 1340,
      note: 'A diagnostic total between 1100 and 1340, with no domain below 40% accuracy.',
      noteVi: 'Điểm đầu vào từ 1100 đến 1340, và không lĩnh vực nào dưới 40% độ chính xác.',
    },
    exit: {
      targetScore: 1400,
      note: 'Two full-length papers sat at least four weeks apart, with the second above 1350.',
      noteVi: 'Đã thi hai đề full-length cách nhau ít nhất bốn tuần, đề thứ hai trên 1350.',
    },
    sessionMinutes: 120,
    sessionsPerWeek: 2,
    units: CORE_UNITS,
  },
  {
    id: 'advance',
    name: 'SAT365 Advance',
    nameVi: 'SAT365 Tăng tốc',
    summary:
      'For a learner losing three or four items per module, all hard. Works only the hard sheets, and ends at the certification sitting.',
    summaryVi:
      'Dành cho học viên chỉ còn mất ba bốn câu mỗi module, toàn ở band khó. Chỉ làm phiếu nâng cao, và kết thúc bằng buổi thi cấp chứng chỉ.',
    entry: {
      minScore: 1350,
      maxScore: null,
      note: 'A diagnostic total at or above 1350 on a full-length paper, not on a section paper.',
      noteVi: 'Điểm đầu vào từ 1350 trở lên trên một đề full-length, không tính đề lẻ một section.',
    },
    exit: {
      targetScore: 1520,
      note: 'The certification sitting passed at Distinction, with the measurement error stated on the certificate.',
      noteVi: 'Đạt bậc Xuất sắc ở kỳ thi cấp chứng chỉ, với sai số đo ghi rõ trên chứng chỉ.',
    },
    sessionMinutes: 120,
    sessionsPerWeek: 2,
    units: ADVANCE_UNITS,
  },
  {
    id: 'sprint',
    name: 'SAT365 Sprint',
    nameVi: 'SAT365 Nước rút',
    summary:
      'The last four weeks. Teaches nothing new on purpose: recognition under time, then two full rehearsals.',
    summaryVi:
      'Bốn tuần cuối. Cố ý không dạy gì mới: đọc vị dưới áp lực thời gian, rồi hai buổi tổng duyệt trọn vẹn.',
    entry: {
      minScore: null,
      maxScore: null,
      note: 'Any learner within four weeks of a booked test date who has already completed a full course. Taken instead of new instruction, never alongside it.',
      noteVi: 'Bất kỳ học viên nào còn dưới bốn tuần tới ngày thi đã đăng ký và đã học xong một khoá đầy đủ. Học THAY CHO việc dạy thêm nội dung mới, không học song song.',
    },
    exit: {
      targetScore: 0,
      note: 'No target score: the sprint is not intended to raise the score but to make the score already earned survive a four-hour morning.',
      noteVi: 'Không đặt mục tiêu điểm: khoá nước rút không nhằm nâng điểm mà để giữ cho mức điểm đã có sống sót qua một buổi sáng bốn tiếng.',
    },
    sessionMinutes: 180,
    sessionsPerWeek: 2,
    units: SPRINT_UNITS,
  },
];

export const COURSE_BY_ID = new Map<CourseId, Course>(COURSES.map((c) => [c.id, c]));
