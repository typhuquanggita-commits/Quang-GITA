/**
 * Turning a syllabus into a timetable.
 *
 * `src/data/curriculum.ts` says what a course teaches and why in that order.
 * This file says what happens in each session, and it derives that rather
 * than storing it.
 *
 * The reason is a failure mode specific to syllabus documents. A dead
 * reference in code throws; a dead reference in a syllabus produces a session
 * with nothing in it, and nothing complains. A course plan naming sixty
 * sessions against seven sheet references each would be quietly wrong within a
 * month of the first content change, and the first person to find out would be
 * a teacher standing in front of a class. So a unit names its skills, the
 * lesson and topic data supplies everything else, and `check:bank` refuses a
 * skill that does not exist.
 *
 * Objectives are derived the same way, from the lesson's own `idea` and the
 * topic's question types. That is not laziness: an objective written
 * separately from the lesson drifts from it, and then the syllabus promises
 * one thing while the material teaches another.
 */

import type { SectionId, SkillId } from '../types.ts';
import type { Course, CourseId, Unit } from '../data/curriculum.ts';
import { COURSES, COURSE_BY_ID } from '../data/curriculum.ts';
import { lessonFor, topicFor } from '../data/lesson-index.ts';
import { PAPERS } from '../data/papers.ts';
import { SHEET_ORDER, type SheetKind } from './packets.ts';

export interface SessionObjective {
  /** Behavioural: what the learner can do afterwards that they could not before. */
  text: string;
  textVi: string;
  skill: SkillId;
}

export interface SessionMaterial {
  skill: SkillId;
  /** The lesson to read, when the session introduces the skill. */
  lesson: boolean;
  classSheets: SheetKind[];
  homeworkSheets: SheetKind[];
}

export interface Session {
  /** 1-based index within the whole course. */
  index: number;
  unitId: string;
  title: string;
  titleVi: string;
  minutes: number;
  homeworkMinutes: number;
  objectives: SessionObjective[];
  materials: SessionMaterial[];
  /** Present on the last session of a unit. */
  checkpoint: Unit['checkpoint'] | null;
}

export interface CoursePlan {
  course: Course;
  sessions: Session[];
  totalSessions: number;
  classHours: number;
  homeworkHours: number;
  weeks: number;
  /** Every skill the course teaches, in first-taught order. */
  skills: SkillId[];
  sections: SectionId[];
}

/*
 * Homework is estimated from the sheets set rather than asserted, because a
 * course that claims two hours a week and sets five is a course learners stop
 * doing the homework for. These are the packet's own sheet minutes.
 */
const SHEET_MINUTES: Record<SheetKind, number> = {
  theory: 15,
  recognition: 20,
  method: 20,
  advanced: 30,
  revision: 25,
  exam: 35,
  consolidation: 20,
};

function sheetMinutes(kinds: readonly SheetKind[]): number {
  return kinds.reduce((sum, kind) => sum + SHEET_MINUTES[kind], 0);
}

/**
 * The objective for a skill, taken from the material that teaches it.
 *
 * A lesson's `idea` is already written as the one thing that changes how the
 * question type is read, which is exactly what an objective should promise.
 * The topic's question types supply the recognition half.
 */
function objectiveFor(skill: SkillId): SessionObjective | null {
  const lesson = lessonFor(skill);
  const topic = topicFor(skill);
  if (!lesson) return null;

  const types = topic?.types.length ?? 0;
  const recognition =
    types > 0
      ? ` and tell its ${types} question types apart on sight`
      : '';
  const recognitionVi =
    types > 0
      ? ` và phân biệt được ${types} dạng câu hỏi của nó ngay khi nhìn`
      : '';

  return {
    skill,
    text: `Use the idea that ${lowerFirst(lesson.idea)}${recognition}.`,
    textVi: `Vận dụng được ý cốt lõi: ${lowerFirst(lesson.ideaVi)}${recognitionVi}.`,
  };
}

function lowerFirst(text: string): string {
  const trimmed = text.trim().replace(/\.$/, '');
  return trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
}

/**
 * Skills for a unit, grouped into sessions.
 *
 * A pair named in `paired` shares one session; everything else gets its own.
 * Pairing is authored rather than computed because whether two skills are
 * close enough to teach together is a judgement about the material, not a
 * property of it.
 */
function groupIntoSessions(unit: Unit): SkillId[][] {
  const pairedFlat = new Set((unit.paired ?? []).flat());
  const groups: SkillId[][] = [];

  for (const [a, b] of unit.paired ?? []) groups.push([a, b]);
  for (const skill of unit.skills) {
    if (pairedFlat.has(skill)) continue;
    groups.push([skill]);
  }

  // Keep the authored teaching order: a group sorts by its earliest member.
  const rank = (skill: SkillId) => unit.skills.indexOf(skill);
  return groups.sort((x, y) => Math.min(...x.map(rank)) - Math.min(...y.map(rank)));
}

export function buildCoursePlan(courseId: CourseId): CoursePlan | null {
  const course = COURSE_BY_ID.get(courseId);
  if (!course) return null;

  const sessions: Session[] = [];
  const skills: SkillId[] = [];
  const sections = new Set<SectionId>();

  for (const unit of course.units) {
    const groups = groupIntoSessions(unit);

    groups.forEach((group, groupIndex) => {
      const objectives = group
        .map(objectiveFor)
        .filter((o): o is SessionObjective => o !== null);

      const materials: SessionMaterial[] = group.map((skill) => ({
        skill,
        // The lesson is read the first time a course meets the skill, not
        // every time it revisits it.
        lesson: !skills.includes(skill),
        classSheets: unit.classSheets,
        homeworkSheets: unit.homeworkSheets,
      }));

      for (const skill of group) {
        if (!skills.includes(skill)) skills.push(skill);
        const lesson = lessonFor(skill);
        if (lesson) sections.add(lesson.section);
      }

      const last = groupIndex === groups.length - 1;

      sessions.push({
        index: sessions.length + 1,
        unitId: unit.id,
        title: unit.title,
        titleVi: unit.titleVi,
        minutes: course.sessionMinutes,
        homeworkMinutes: group.length * sheetMinutes(unit.homeworkSheets),
        objectives,
        materials,
        checkpoint: last ? unit.checkpoint : null,
      });
    });
  }

  const homeworkMinutes = sessions.reduce((sum, s) => sum + s.homeworkMinutes, 0);

  return {
    course,
    sessions,
    totalSessions: sessions.length,
    classHours: Math.round((sessions.length * course.sessionMinutes) / 6) / 10,
    homeworkHours: Math.round(homeworkMinutes / 6) / 10,
    weeks: Math.ceil(sessions.length / course.sessionsPerWeek),
    skills,
    sections: [...sections],
  };
}

export function allCoursePlans(): CoursePlan[] {
  return COURSES.map((course) => buildCoursePlan(course.id)).filter(
    (plan): plan is CoursePlan => plan !== null,
  );
}

/* ------------------------------------------------------------------ */
/* Coverage                                                            */
/* ------------------------------------------------------------------ */

export interface CoverageReport {
  /** Skills taught by at least one course. */
  taught: SkillId[];
  /** Measurable skills no course teaches. This must be empty. */
  untaught: SkillId[];
  /** How many courses teach each skill. */
  byCourse: Record<CourseId, SkillId[]>;
}

/**
 * Which measurable skills the curriculum actually teaches.
 *
 * The invariant that makes a syllabus a syllabus rather than a brochure: a
 * platform that can tell a learner Transitions is their weakest skill, and
 * whose course plan never teaches Transitions, has sold them a diagnosis with
 * no treatment. `check:bank` fails on a non-empty `untaught`.
 */
export function coverage(measurable: readonly SkillId[]): CoverageReport {
  const byCourse = {} as Record<CourseId, SkillId[]>;
  const taught = new Set<SkillId>();

  for (const plan of allCoursePlans()) {
    byCourse[plan.course.id] = plan.skills;
    for (const skill of plan.skills) taught.add(skill);
  }

  return {
    taught: [...taught],
    untaught: measurable.filter((skill) => !taught.has(skill)),
    byCourse,
  };
}

/* ------------------------------------------------------------------ */
/* Placement                                                           */
/* ------------------------------------------------------------------ */

export interface Placement {
  course: Course | null;
  reason: string;
  reasonVi: string;
}

/**
 * Which course a diagnostic total places a learner into.
 *
 * Returns no course rather than a guess when there is no diagnostic. Placing
 * an unmeasured learner by impression is how a 1400 learner ends up in a
 * foundation class being taught what they can already do, and the platform's
 * standing rule — nothing unmeasured is scored as anything — applies to
 * placement as much as to ability.
 */
export function placeByDiagnostic(total: number | null, daysToTest: number | null): Placement {
  if (daysToTest !== null && daysToTest <= 28) {
    return {
      course: COURSE_BY_ID.get('sprint') ?? null,
      reason: 'Fewer than four weeks to the test date. New instruction cannot be rehearsed in the time left, so the sprint replaces it.',
      reasonVi: 'Còn dưới bốn tuần tới ngày thi. Nội dung mới không kịp thành phản xạ, nên khoá nước rút thay thế cho việc dạy thêm.',
    };
  }

  if (total === null) {
    return {
      course: null,
      reason: 'No diagnostic on record. Placement waits for one rather than being guessed — a learner placed by impression is placed wrongly about a third of the time.',
      reasonVi: 'Chưa có bài kiểm tra đầu vào. Việc xếp lớp chờ bài kiểm tra chứ không đoán — xếp theo cảm nhận thì sai khoảng một phần ba số trường hợp.',
    };
  }

  const course = COURSES.find(
    (c) =>
      c.id !== 'sprint' &&
      (c.entry.minScore === null || total >= c.entry.minScore) &&
      (c.entry.maxScore === null || total <= c.entry.maxScore),
  );

  return {
    course: course ?? null,
    reason: course
      ? `A diagnostic total of ${total} falls in this course's entry range.`
      : `A diagnostic total of ${total} falls outside every course's entry range, which should not be possible and is worth reporting.`,
    reasonVi: course
      ? `Điểm đầu vào ${total} nằm trong khoảng tuyển của khoá này.`
      : `Điểm đầu vào ${total} nằm ngoài mọi khoảng tuyển — điều này lẽ ra không xảy ra được và cần báo lại.`,
  };
}

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

/**
 * Problems that would make a course undeliverable. Used by `check:bank`, so a
 * syllabus that references material which no longer exists fails the build
 * rather than reaching a classroom.
 */
export function curriculumProblems(measurable: readonly SkillId[]): string[] {
  const problems: string[] = [];
  const measurableSet = new Set(measurable);
  const paperIds = new Set(PAPERS.map((p) => p.id));
  const sheetSet = new Set<SheetKind>(SHEET_ORDER);

  for (const course of COURSES) {
    const where = `curriculum ${course.id}`;
    if (course.units.length === 0) problems.push(`${where}: no units`);

    const seenUnit = new Set<string>();
    for (const unit of course.units) {
      const uw = `${where}/${unit.id}`;
      if (seenUnit.has(unit.id)) problems.push(`${uw}: duplicate unit id`);
      seenUnit.add(unit.id);

      if (unit.skills.length === 0) problems.push(`${uw}: teaches nothing`);
      if (unit.rationale.trim().length < 40) problems.push(`${uw}: no rationale for its position in the sequence`);
      if (unit.rationaleVi.trim().length < 30) problems.push(`${uw}: rationale is not bilingual`);
      if (unit.purpose.trim().length < 40) problems.push(`${uw}: purpose too thin`);
      if (unit.purposeVi.trim().length < 30) problems.push(`${uw}: purpose is not bilingual`);

      for (const skill of unit.skills) {
        if (!measurableSet.has(skill)) problems.push(`${uw}: unknown skill "${skill}"`);
        if (!lessonFor(skill)) problems.push(`${uw}: no lesson teaches "${skill}"`);
        if (!topicFor(skill)) problems.push(`${uw}: no topic data for "${skill}"`);
      }

      for (const [a, b] of unit.paired ?? []) {
        if (!unit.skills.includes(a) || !unit.skills.includes(b)) {
          problems.push(`${uw}: pairs skills the unit does not teach`);
        }
      }

      for (const kind of [...unit.classSheets, ...unit.homeworkSheets]) {
        if (!sheetSet.has(kind)) problems.push(`${uw}: unknown sheet "${kind}"`);
      }
      if (unit.classSheets.length === 0) problems.push(`${uw}: no sheets worked in class`);

      const cp = unit.checkpoint;
      if (cp.passAccuracy <= 0 || cp.passAccuracy > 1) problems.push(`${uw}: checkpoint bar out of range`);
      if (cp.note.trim().length < 40) problems.push(`${uw}: checkpoint says nothing about what it is for`);
      if (cp.noteVi.trim().length < 30) problems.push(`${uw}: checkpoint note is not bilingual`);
      if (cp.kind === 'paper') {
        if (!cp.paperId) problems.push(`${uw}: paper checkpoint names no paper`);
        else if (!paperIds.has(cp.paperId)) problems.push(`${uw}: checkpoint names unknown paper "${cp.paperId}"`);
      }
    }
  }

  /*
   * A skill the platform can diagnose and no course can teach is the one
   * failure that makes the whole library dishonest: the learner is told what
   * is wrong and sent nowhere.
   */
  for (const skill of coverage(measurable).untaught) {
    problems.push(`curriculum: no course teaches "${skill}", which the platform measures`);
  }

  return problems;
}
