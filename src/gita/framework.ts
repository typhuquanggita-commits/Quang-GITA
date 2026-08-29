/**
 * The GITA training model.
 *
 * SAT365 measures what a student can do on a test. GITA is the layer that
 * decides what they become while getting there — and it is the reason the
 * platform is not simply another question bank.
 *
 * Four pillars, each with named sub-dimensions so a coach can point at
 * something specific rather than at a mood:
 *
 *   G — Goal      the destination: an objective system, standards of
 *                 excellence, and what "done well" concretely means
 *   I — Inspirits the fuel: drive, desire, inner strength, belief, nerve
 *   T — Talent    the edge: strengths, excellent thinking, speed, focus
 *   A — Action    the road: decisive, persistent, creative, careful,
 *                 optimised work, built as habits under the 20/80 rule and
 *                 sustained by an environment of peers
 *
 * The pillars are deliberately not weighted equally in every context. A
 * student with a strong Goal and no Inspirits stalls in week three; one with
 * Talent and no Action never converts it. The profile engine in
 * `assessment.ts` reads all four together for exactly that reason.
 */

/* ------------------------------------------------------------------ */
/* Pillars                                                             */
/* ------------------------------------------------------------------ */

export type PillarId = 'goal' | 'inspirits' | 'talent' | 'action';

export const PILLAR_ORDER: PillarId[] = ['goal', 'inspirits', 'talent', 'action'];

export interface Dimension {
  id: string;
  pillar: PillarId;
  label: string;
  labelVi: string;
  /** What a coach observes when this dimension is strong. */
  evidence: string;
  evidenceVi: string;
  /** The single question that surfaces this dimension in a conversation. */
  probe: string;
  probeVi: string;
}

export interface Pillar {
  id: PillarId;
  letter: string;
  label: string;
  labelVi: string;
  /** One line a student can repeat back. */
  essence: string;
  essenceVi: string;
  /** What failure looks like when this pillar is the weak one. */
  failureMode: string;
  failureModeVi: string;
  color: string;
  dimensions: Dimension[];
}

export const PILLARS: Record<PillarId, Pillar> = {
  goal: {
    id: 'goal',
    letter: 'G',
    label: 'Goal',
    labelVi: 'Mục tiêu',
    essence: 'A destination precise enough that today has an obvious first move.',
    essenceVi: 'Đích đến đủ rõ để hôm nay biết ngay phải làm gì đầu tiên.',
    failureMode: 'Effort scatters. Work happens, but nothing compounds toward anything.',
    failureModeVi: 'Nỗ lực tản mát. Vẫn học, nhưng không có gì tích luỹ về một đích.',
    color: 'var(--primary)',
    dimensions: [
      {
        id: 'goal-clarity',
        pillar: 'goal',
        label: 'Clarity of the target',
        labelVi: 'Độ rõ của đích đến',
        evidence: 'States the target score, the date, and the gap without hesitating.',
        evidenceVi: 'Nói được điểm mục tiêu, ngày thi và khoảng cách còn lại, không ngập ngừng.',
        probe: 'What score, by what date, and how far away are you right now?',
        probeVi: 'Bao nhiêu điểm, vào ngày nào, và hiện bạn còn cách bao xa?',
      },
      {
        id: 'goal-standard',
        pillar: 'goal',
        label: 'Standard of excellence',
        labelVi: 'Chuẩn mực xuất sắc',
        evidence: 'Has a definition of "done well" that is stricter than "finished".',
        evidenceVi: 'Có định nghĩa "làm tốt" khắt khe hơn "làm xong".',
        probe: 'What would make you unwilling to submit a piece of work?',
        probeVi: 'Điều gì khiến bạn không chấp nhận nộp một bài làm?',
      },
      {
        id: 'goal-decomposition',
        pillar: 'goal',
        label: 'Decomposition',
        labelVi: 'Chia nhỏ mục tiêu',
        evidence: 'Can name this week’s sub-goal and why it was chosen over others.',
        evidenceVi: 'Nói được mục tiêu tuần này và vì sao chọn nó thay vì việc khác.',
        probe: 'Which single skill, if it improved this week, moves the score most?',
        probeVi: 'Kỹ năng nào nếu tiến bộ trong tuần này sẽ đẩy điểm nhiều nhất?',
      },
      {
        id: 'goal-commitment',
        pillar: 'goal',
        label: 'Commitment',
        labelVi: 'Cam kết',
        evidence: 'The goal survives a bad week rather than being quietly revised down.',
        evidenceVi: 'Mục tiêu vẫn đứng vững qua một tuần tệ, không âm thầm bị hạ xuống.',
        probe: 'What have you already given up in order to protect this goal?',
        probeVi: 'Bạn đã bỏ điều gì để bảo vệ mục tiêu này?',
      },
    ],
  },

  inspirits: {
    id: 'inspirits',
    letter: 'I',
    label: 'Inspirits',
    labelVi: 'Nội lực',
    essence: 'The fuel that keeps working on the days no one is watching.',
    essenceVi: 'Nguồn lực bên trong giúp vẫn học vào những ngày không ai nhìn.',
    failureMode: 'A strong start, then silence by week three. Plans exist; nothing runs them.',
    failureModeVi: 'Khởi đầu mạnh rồi im bặt ở tuần thứ ba. Kế hoạch có, nhưng không ai vận hành.',
    color: 'var(--accent)',
    dimensions: [
      {
        id: 'inspirits-desire',
        pillar: 'inspirits',
        label: 'Desire and drive',
        labelVi: 'Khát khao và động lực',
        evidence: 'Talks about the goal in the first person, unprompted, with specifics.',
        evidenceVi: 'Tự nói về mục tiêu ở ngôi thứ nhất, có chi tiết, không cần ai gợi.',
        probe: 'What does reaching this open up that matters to you?',
        probeVi: 'Đạt được điều này sẽ mở ra điều gì thật sự quan trọng với bạn?',
      },
      {
        id: 'inspirits-belief',
        pillar: 'inspirits',
        label: 'Belief',
        labelVi: 'Niềm tin',
        evidence: 'Treats a low score as information about method, not about worth.',
        evidenceVi: 'Coi điểm thấp là thông tin về phương pháp, không phải về giá trị bản thân.',
        probe: 'When a score disappoints you, what is the first thing you change?',
        probeVi: 'Khi điểm không như ý, điều đầu tiên bạn thay đổi là gì?',
      },
      {
        id: 'inspirits-resilience',
        pillar: 'inspirits',
        label: 'Nerve under pressure',
        labelVi: 'Bản lĩnh dưới áp lực',
        evidence: 'Timed conditions do not degrade accuracy relative to untimed work.',
        evidenceVi: 'Làm có bấm giờ không kém chính xác hơn khi làm thong thả.',
        probe: 'What happens to your thinking in the last five minutes of a module?',
        probeVi: 'Năm phút cuối của một module, đầu bạn hoạt động thế nào?',
      },
      {
        id: 'inspirits-identity',
        pillar: 'inspirits',
        label: 'Distinctiveness',
        labelVi: 'Sự khác biệt',
        evidence: 'Knows what they bring that a peer with the same score does not.',
        evidenceVi: 'Biết mình có gì mà một bạn cùng điểm số không có.',
        probe: 'What kind of student are you becoming, regardless of the score?',
        probeVi: 'Bỏ điểm số sang một bên, bạn đang trở thành người học như thế nào?',
      },
    ],
  },

  talent: {
    id: 'talent',
    letter: 'T',
    label: 'Talent',
    labelVi: 'Tài năng',
    essence: 'The edge you already have, found and then deliberately sharpened.',
    essenceVi: 'Thế mạnh sẵn có, được tìm ra rồi mài sắc có chủ đích.',
    failureMode: 'Time spread evenly across everything, so nothing ever becomes excellent.',
    failureModeVi: 'Thời gian chia đều cho mọi thứ, nên không có gì trở nên xuất sắc.',
    color: 'var(--rw)',
    dimensions: [
      {
        id: 'talent-strengths',
        pillar: 'talent',
        label: 'Known strengths',
        labelVi: 'Điểm mạnh đã nhận diện',
        evidence: 'Can name the two skills where they beat their own average, with data.',
        evidenceVi: 'Nêu được hai kỹ năng mình vượt trung bình của chính mình, có số liệu.',
        probe: 'Which question type do you want to see on test day?',
        probeVi: 'Dạng câu nào bạn mong gặp trong ngày thi?',
      },
      {
        id: 'talent-thinking',
        pillar: 'talent',
        label: 'Quality of thinking',
        labelVi: 'Chất lượng tư duy',
        evidence: 'Explains why a distractor is wrong, not only why the key is right.',
        evidenceVi: 'Giải thích được vì sao phương án nhiễu sai, không chỉ vì sao đáp án đúng.',
        probe: 'Talk me through why B fails on that question.',
        probeVi: 'Hãy nói vì sao phương án B sai ở câu đó.',
      },
      {
        id: 'talent-speed',
        pillar: 'talent',
        label: 'Speed and focus',
        labelVi: 'Tốc độ và tập trung',
        evidence: 'Median time per item sits at or under target without losing accuracy.',
        evidenceVi: 'Thời gian trung vị mỗi câu bằng hoặc dưới mốc mà độ chính xác không giảm.',
        probe: 'Where do you lose the most time, and is it thinking or re-reading?',
        probeVi: 'Bạn mất nhiều thời gian nhất ở đâu — do suy nghĩ hay do đọc lại?',
      },
      {
        id: 'talent-leverage',
        pillar: 'talent',
        label: 'Leverage awareness',
        labelVi: 'Nhận biết đòn bẩy',
        evidence: 'Spends most study time on the few skills that carry the most score.',
        evidenceVi: 'Dành phần lớn thời gian cho số ít kỹ năng mang lại nhiều điểm nhất.',
        probe: 'If you had four hours left in total, what would you spend them on?',
        probeVi: 'Nếu chỉ còn bốn tiếng, bạn sẽ dùng cho việc gì?',
      },
    ],
  },

  action: {
    id: 'action',
    letter: 'A',
    label: 'Action',
    labelVi: 'Hành động',
    essence: 'Habits that run whether or not you feel like it today.',
    essenceVi: 'Thói quen tự chạy dù hôm nay bạn có thấy muốn hay không.',
    failureMode: 'Understanding without accumulation. Everything is known; nothing is fluent.',
    failureModeVi: 'Hiểu mà không tích luỹ. Biết hết, nhưng không thành thục thứ gì.',
    color: 'var(--math)',
    dimensions: [
      {
        id: 'action-consistency',
        pillar: 'action',
        label: 'Consistency',
        labelVi: 'Đều đặn',
        evidence: 'Sessions happen on scheduled days without a reminder or a negotiation.',
        evidenceVi: 'Đúng ngày là ngồi vào học, không cần nhắc và không mặc cả.',
        probe: 'What time of day do you study, and what triggers you to start?',
        probeVi: 'Bạn học vào khung giờ nào, và điều gì khiến bạn bắt đầu?',
      },
      {
        id: 'action-deliberate',
        pillar: 'action',
        label: 'Deliberate practice',
        labelVi: 'Luyện tập có chủ đích',
        evidence: 'Works at the edge of ability rather than repeating what is already easy.',
        evidenceVi: 'Luyện ở ngưỡng khó của mình thay vì lặp lại thứ đã dễ.',
        probe: 'Was your last session comfortable? If so, it was probably wasted.',
        probeVi: 'Buổi học vừa rồi có thoải mái không? Nếu có, nhiều khả năng đã phí.',
      },
      {
        id: 'action-review',
        pillar: 'action',
        label: 'Closing the loop',
        labelVi: 'Đóng vòng lặp',
        evidence: 'Every wrong answer is understood and re-met later, not just read once.',
        evidenceVi: 'Mọi câu sai đều được hiểu và gặp lại về sau, không chỉ đọc qua một lần.',
        probe: 'What did you get wrong last week, and have you seen it again since?',
        probeVi: 'Tuần trước bạn sai gì, và từ đó đã gặp lại nó chưa?',
      },
      {
        id: 'action-environment',
        pillar: 'action',
        label: 'Environment and team',
        labelVi: 'Môi trường và đồng đội',
        evidence: 'Studies where starting is easy and quitting is visible to someone.',
        evidenceVi: 'Học ở nơi dễ bắt đầu và việc bỏ cuộc có người nhìn thấy.',
        probe: 'Who notices if you skip three days?',
        probeVi: 'Ai sẽ biết nếu bạn nghỉ ba ngày liền?',
      },
    ],
  },
};

export const ALL_DIMENSIONS: Dimension[] = PILLAR_ORDER.flatMap((id) => PILLARS[id].dimensions);

export const DIMENSION_BY_ID = new Map<string, Dimension>(ALL_DIMENSIONS.map((d) => [d.id, d]));

export function pillarLabel(id: PillarId, locale: 'vi' | 'en'): string {
  return locale === 'vi' ? PILLARS[id].labelVi : PILLARS[id].label;
}

export function dimensionLabel(id: string, locale: 'vi' | 'en'): string {
  const dimension = DIMENSION_BY_ID.get(id);
  if (!dimension) return id;
  return locale === 'vi' ? dimension.labelVi : dimension.label;
}

/* ------------------------------------------------------------------ */
/* Absorption tiers                                                    */
/* ------------------------------------------------------------------ */

/**
 * How much of the model a person can take on right now.
 *
 * This is not a ranking of people and it must never be presented as one. It
 * answers a delivery question: give someone tier-5 material at tier 1 and
 * they abandon the whole thing, so the platform meets them where they are and
 * opens the next tier when the evidence says they are ready.
 */
export type AbsorptionTier = 1 | 2 | 3 | 4 | 5;

export interface TierSpec {
  tier: AbsorptionTier;
  label: string;
  labelVi: string;
  /** The one thing this tier is trying to install. */
  focus: string;
  focusVi: string;
  /** What the learner does at this tier. */
  practices: string[];
  practicesVi: string[];
  /** What must be true before the next tier opens. */
  gate: string;
  gateVi: string;
  /** Minutes of committed practice a day this tier assumes. */
  dailyMinutes: number;
  /** Habits, by id, that belong to this tier. */
  habitIds: string[];
}

export const TIERS: Record<AbsorptionTier, TierSpec> = {
  1: {
    tier: 1,
    label: 'Contact',
    labelVi: 'Tiếp xúc',
    focus: 'Show up at all. Nothing else matters until attendance is real.',
    focusVi: 'Trước hết là có mặt. Chưa cần gì khác cho tới khi việc ngồi vào bàn là thật.',
    practices: [
      'One short session on a fixed day and time',
      'Name the target score out loud once',
      'Log the session, even a bad one',
    ],
    practicesVi: [
      'Một buổi ngắn vào ngày và giờ cố định',
      'Nói to điểm mục tiêu một lần',
      'Ghi nhận buổi học, kể cả buổi tệ',
    ],
    gate: 'Four sessions in two weeks, unprompted.',
    gateVi: 'Bốn buổi trong hai tuần, không cần ai nhắc.',
    dailyMinutes: 15,
    habitIds: ['h-fixed-slot', 'h-log-session'],
  },
  2: {
    tier: 2,
    label: 'Rhythm',
    labelVi: 'Nhịp điệu',
    focus: 'Make the habit survive a bad week without a coach holding it up.',
    focusVi: 'Giữ thói quen sống sót qua một tuần tệ mà không cần coach đỡ.',
    practices: [
      'A fixed weekly volume, not a fixed mood',
      'Review every wrong answer the same day',
      'One diagnostic to replace opinion with data',
    ],
    practicesVi: [
      'Khối lượng tuần cố định, không phụ thuộc tâm trạng',
      'Ôn mọi câu sai ngay trong ngày',
      'Một bài chẩn đoán để thay cảm tính bằng dữ liệu',
    ],
    gate: 'Three consecutive weeks at target volume, and a baseline score on record.',
    gateVi: 'Ba tuần liên tiếp đủ khối lượng, và đã có điểm nền.',
    dailyMinutes: 30,
    habitIds: ['h-fixed-slot', 'h-same-day-review', 'h-weekly-volume'],
  },
  3: {
    tier: 3,
    label: 'Method',
    labelVi: 'Phương pháp',
    focus: 'Stop working hard on the wrong things. Aim effort by evidence.',
    focusVi: 'Thôi chăm chỉ sai chỗ. Nhắm nỗ lực theo bằng chứng.',
    practices: [
      'Weekly review of the skill map before choosing what to drill',
      'Deliberate practice at the edge, not in the comfortable middle',
      'Separate careless errors from concept gaps and treat them differently',
    ],
    practicesVi: [
      'Xem bản đồ kỹ năng mỗi tuần trước khi chọn luyện gì',
      'Luyện ở ngưỡng khó, không quanh quẩn vùng dễ chịu',
      'Tách lỗi bất cẩn khỏi lỗi hổng kiến thức và xử lý khác nhau',
    ],
    gate: 'Two weeks where the drilled skills are the ones the data named.',
    gateVi: 'Hai tuần liền kỹ năng đem ra luyện đúng là kỹ năng dữ liệu chỉ ra.',
    dailyMinutes: 45,
    habitIds: ['h-weekly-review', 'h-edge-practice', 'h-error-triage', 'h-same-day-review'],
  },
  4: {
    tier: 4,
    label: 'Transfer',
    labelVi: 'Chuyển giao',
    focus: 'Carry the method out of the study room into family, school, and life.',
    focusVi: 'Mang phương pháp ra khỏi bàn học, vào gia đình, trường lớp và đời sống.',
    practices: [
      'Apply one GITA habit to a non-SAT commitment and track it',
      'Teach one concept to someone else each week',
      'Run a full-length rehearsal under real conditions',
    ],
    practicesVi: [
      'Áp dụng một thói quen GITA vào một cam kết ngoài SAT và theo dõi nó',
      'Mỗi tuần dạy lại một khái niệm cho người khác',
      'Chạy một buổi thi thử full-length trong điều kiện thật',
    ],
    gate: 'A habit sustained for a month in an arena outside study.',
    gateVi: 'Một thói quen duy trì trọn một tháng ở lĩnh vực ngoài việc học.',
    dailyMinutes: 60,
    habitIds: ['h-teach-back', 'h-transfer-habit', 'h-full-rehearsal', 'h-weekly-review'],
  },
  5: {
    tier: 5,
    label: 'Autonomy',
    labelVi: 'Tự chủ',
    focus: 'Run the whole system yourself, and raise the standard for others.',
    focusVi: 'Tự vận hành toàn bộ hệ thống, và nâng chuẩn cho người khác.',
    practices: [
      'Set and revise your own weekly plan from your own data',
      'Mentor a peer at a lower tier',
      'Hold a standard higher than what is being asked of you',
    ],
    practicesVi: [
      'Tự đặt và tự điều chỉnh kế hoạch tuần từ dữ liệu của mình',
      'Kèm một bạn ở tầng thấp hơn',
      'Giữ chuẩn cao hơn mức người khác yêu cầu ở mình',
    ],
    gate: 'This tier has no gate. It is the point of the model.',
    gateVi: 'Tầng này không có cổng. Đây chính là đích của mô thức.',
    dailyMinutes: 75,
    habitIds: ['h-self-plan', 'h-mentor-peer', 'h-edge-practice', 'h-transfer-habit'],
  },
};

export const TIER_ORDER: AbsorptionTier[] = [1, 2, 3, 4, 5];

export function tierLabel(tier: AbsorptionTier, locale: 'vi' | 'en'): string {
  return locale === 'vi' ? TIERS[tier].labelVi : TIERS[tier].label;
}

/* ------------------------------------------------------------------ */
/* Practitioner ladder                                                 */
/* ------------------------------------------------------------------ */

/**
 * Professional depth of the person delivering the model.
 *
 * Kept separate from the platform's `TeacherRank`, which governs data access.
 * This one governs *what someone is qualified to deliver* — a distinction that
 * matters, because a new teacher with wide data access is still not ready to
 * run a family intervention.
 */
export type PractitionerLevel = 'advisor' | 'instructor' | 'coach' | 'master-coach';

export interface PractitionerSpec {
  id: PractitionerLevel;
  label: string;
  labelVi: string;
  /** Which absorption tiers this level is certified to deliver. */
  deliversTiers: AbsorptionTier[];
  /** Which arenas they may work in. */
  arenas: Array<'study' | 'family' | 'school' | 'society'>;
  /** What they are accountable for. */
  mandate: string;
  mandateVi: string;
  /** What they must escalate rather than handle. */
  escalates: string;
  escalatesVi: string;
  /** Hours of supervised delivery before the next level. */
  supervisedHours: number;
}

export const PRACTITIONERS: Record<PractitionerLevel, PractitionerSpec> = {
  advisor: {
    id: 'advisor',
    label: 'Advisor',
    labelVi: 'Tư vấn viên',
    deliversTiers: [1, 2],
    arenas: ['study'],
    mandate: 'Get a learner started and keep attendance alive. Explain the model plainly.',
    mandateVi: 'Giúp người học bắt đầu và giữ được việc đi học đều. Giải thích mô thức một cách dễ hiểu.',
    escalates: 'Anything about method or diagnosis — an advisor holds rhythm, not strategy.',
    escalatesVi: 'Mọi vấn đề về phương pháp hay chẩn đoán — tư vấn viên giữ nhịp, không định chiến lược.',
    supervisedHours: 20,
  },
  instructor: {
    id: 'instructor',
    label: 'Instructor',
    labelVi: 'Giáo viên',
    deliversTiers: [1, 2, 3],
    arenas: ['study', 'school'],
    mandate: 'Teach content, read the skill map, and aim practice at what the data names.',
    mandateVi: 'Dạy nội dung, đọc bản đồ kỹ năng, và nhắm luyện tập vào đúng chỗ dữ liệu chỉ ra.',
    escalates: 'Motivation that has stopped responding to method, and anything inside the family.',
    escalatesVi: 'Vấn đề động lực đã không còn đáp ứng bằng phương pháp, và mọi việc thuộc về gia đình.',
    supervisedHours: 60,
  },
  coach: {
    id: 'coach',
    label: 'Coach',
    labelVi: 'Huấn luyện viên',
    deliversTiers: [1, 2, 3, 4],
    arenas: ['study', 'school', 'family'],
    mandate: 'Work all four pillars, including Inspirits. Run transfer into family and school.',
    mandateVi: 'Làm việc trên cả bốn trụ, gồm cả Nội lực. Dẫn dắt chuyển giao vào gia đình và trường học.',
    escalates: 'Signs of distress beyond a study problem, to a qualified professional, immediately.',
    escalatesVi: 'Dấu hiệu khủng hoảng vượt phạm vi việc học — chuyển ngay tới chuyên gia phù hợp.',
    supervisedHours: 150,
  },
  'master-coach': {
    id: 'master-coach',
    label: 'Master coach',
    labelVi: 'Huấn luyện viên trưởng',
    deliversTiers: [1, 2, 3, 4, 5],
    arenas: ['study', 'school', 'family', 'society'],
    mandate: 'Certify practitioners, own programme quality, and adapt the model to new contexts.',
    mandateVi: 'Cấp chứng nhận cho đội ngũ, chịu trách nhiệm chất lượng chương trình, và điều chỉnh mô thức cho bối cảnh mới.',
    escalates: 'Nothing within the model; a master coach is where escalation ends.',
    escalatesVi: 'Không còn cấp nào trong mô thức; đây là điểm dừng của chuỗi chuyển tiếp.',
    supervisedHours: 400,
  },
};

export const PRACTITIONER_ORDER: PractitionerLevel[] = ['advisor', 'instructor', 'coach', 'master-coach'];

export function practitionerLabel(id: PractitionerLevel, locale: 'vi' | 'en'): string {
  return locale === 'vi' ? PRACTITIONERS[id].labelVi : PRACTITIONERS[id].label;
}

/** Whether a practitioner is certified to deliver a given absorption tier. */
export function canDeliverTier(level: PractitionerLevel, tier: AbsorptionTier): boolean {
  return PRACTITIONERS[level].deliversTiers.includes(tier);
}

export function canWorkArena(
  level: PractitionerLevel,
  arena: 'study' | 'family' | 'school' | 'society',
): boolean {
  return PRACTITIONERS[level].arenas.includes(arena);
}
