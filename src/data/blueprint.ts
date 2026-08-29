/**
 * The Digital SAT test blueprint.
 *
 * Section structure, timing, and domain weights follow the College Board's
 * published assessment specifications for the digital test. Skill labels use
 * the official knowledge-and-skills testing-point names so authored content
 * maps one-to-one onto the operational framework.
 */

import type { Domain, DomainId, SectionId, SkillId } from '../types.ts';

export interface SectionSpec {
  id: SectionId;
  label: string;
  labelVi: string;
  /** Operational + pretest items per module. */
  questionsPerModule: number;
  /** Unscored field-test items per module. */
  pretestPerModule: number;
  /** Standard-time allotment per module, in seconds. */
  moduleSeconds: number;
}

export const SECTION_SPEC: Record<SectionId, SectionSpec> = {
  rw: {
    id: 'rw',
    label: 'Reading and Writing',
    labelVi: 'Đọc và Viết',
    questionsPerModule: 27,
    pretestPerModule: 2,
    moduleSeconds: 32 * 60,
  },
  math: {
    id: 'math',
    label: 'Math',
    labelVi: 'Toán',
    questionsPerModule: 22,
    pretestPerModule: 2,
    moduleSeconds: 35 * 60,
  },
};

/** Break between the Reading and Writing and Math sections. */
export const BREAK_SECONDS = 10 * 60;

/** Total delivered length of a standard full-length test, in seconds. */
export const FULL_TEST_SECONDS =
  2 * SECTION_SPEC.rw.moduleSeconds + 2 * SECTION_SPEC.math.moduleSeconds + BREAK_SECONDS;

export const DOMAINS: Domain[] = [
  {
    id: 'information-ideas',
    section: 'rw',
    label: 'Information and Ideas',
    labelVi: 'Thông tin và Ý tưởng',
    weight: 0.26,
    skills: [
      { id: 'central-ideas', domain: 'information-ideas', label: 'Central Ideas and Details', labelVi: 'Ý chính và chi tiết' },
      { id: 'command-evidence-textual', domain: 'information-ideas', label: 'Command of Evidence: Textual', labelVi: 'Bằng chứng văn bản' },
      { id: 'command-evidence-quantitative', domain: 'information-ideas', label: 'Command of Evidence: Quantitative', labelVi: 'Bằng chứng định lượng' },
      { id: 'inferences', domain: 'information-ideas', label: 'Inferences', labelVi: 'Suy luận' },
    ],
  },
  {
    id: 'craft-structure',
    section: 'rw',
    label: 'Craft and Structure',
    labelVi: 'Kỹ thuật và Cấu trúc',
    weight: 0.28,
    skills: [
      { id: 'words-in-context', domain: 'craft-structure', label: 'Words in Context', labelVi: 'Từ trong ngữ cảnh' },
      { id: 'text-structure-purpose', domain: 'craft-structure', label: 'Text Structure and Purpose', labelVi: 'Cấu trúc và mục đích' },
      { id: 'cross-text-connections', domain: 'craft-structure', label: 'Cross-Text Connections', labelVi: 'Liên kết đa văn bản' },
    ],
  },
  {
    id: 'expression-of-ideas',
    section: 'rw',
    label: 'Expression of Ideas',
    labelVi: 'Diễn đạt Ý tưởng',
    weight: 0.2,
    skills: [
      { id: 'rhetorical-synthesis', domain: 'expression-of-ideas', label: 'Rhetorical Synthesis', labelVi: 'Tổng hợp tu từ' },
      { id: 'transitions', domain: 'expression-of-ideas', label: 'Transitions', labelVi: 'Từ nối' },
    ],
  },
  {
    id: 'standard-english-conventions',
    section: 'rw',
    label: 'Standard English Conventions',
    labelVi: 'Quy tắc Tiếng Anh chuẩn',
    weight: 0.26,
    skills: [
      { id: 'boundaries', domain: 'standard-english-conventions', label: 'Boundaries', labelVi: 'Ranh giới câu' },
      { id: 'form-structure-sense', domain: 'standard-english-conventions', label: 'Form, Structure, and Sense', labelVi: 'Hình thức và ngữ pháp' },
    ],
  },
  {
    id: 'algebra',
    section: 'math',
    label: 'Algebra',
    labelVi: 'Đại số',
    weight: 0.35,
    skills: [
      { id: 'linear-equations-1var', domain: 'algebra', label: 'Linear equations in one variable', labelVi: 'Phương trình bậc nhất một ẩn' },
      { id: 'linear-equations-2var', domain: 'algebra', label: 'Linear equations in two variables', labelVi: 'Phương trình bậc nhất hai ẩn' },
      { id: 'linear-functions', domain: 'algebra', label: 'Linear functions', labelVi: 'Hàm số bậc nhất' },
      { id: 'linear-systems', domain: 'algebra', label: 'Systems of two linear equations', labelVi: 'Hệ phương trình bậc nhất' },
      { id: 'linear-inequalities', domain: 'algebra', label: 'Linear inequalities', labelVi: 'Bất phương trình bậc nhất' },
    ],
  },
  {
    id: 'advanced-math',
    section: 'math',
    label: 'Advanced Math',
    labelVi: 'Toán nâng cao',
    weight: 0.35,
    skills: [
      { id: 'equivalent-expressions', domain: 'advanced-math', label: 'Equivalent expressions', labelVi: 'Biểu thức tương đương' },
      { id: 'nonlinear-equations', domain: 'advanced-math', label: 'Nonlinear equations and systems', labelVi: 'Phương trình phi tuyến' },
      { id: 'nonlinear-functions', domain: 'advanced-math', label: 'Nonlinear functions', labelVi: 'Hàm số phi tuyến' },
    ],
  },
  {
    id: 'problem-solving-data',
    section: 'math',
    label: 'Problem-Solving and Data Analysis',
    labelVi: 'Giải quyết vấn đề và Phân tích dữ liệu',
    weight: 0.15,
    skills: [
      { id: 'ratios-rates-units', domain: 'problem-solving-data', label: 'Ratios, rates, proportions, and units', labelVi: 'Tỉ lệ, tốc độ và đơn vị' },
      { id: 'percentages', domain: 'problem-solving-data', label: 'Percentages', labelVi: 'Phần trăm' },
      { id: 'one-variable-data', domain: 'problem-solving-data', label: 'One-variable data: distributions and measures', labelVi: 'Dữ liệu một biến' },
      { id: 'two-variable-data', domain: 'problem-solving-data', label: 'Two-variable data: models and scatterplots', labelVi: 'Dữ liệu hai biến' },
      { id: 'probability', domain: 'problem-solving-data', label: 'Probability and conditional probability', labelVi: 'Xác suất' },
      { id: 'inference-statistics', domain: 'problem-solving-data', label: 'Inference from sample statistics', labelVi: 'Suy luận thống kê' },
      { id: 'statistical-claims', domain: 'problem-solving-data', label: 'Evaluating statistical claims', labelVi: 'Đánh giá tuyên bố thống kê' },
    ],
  },
  {
    id: 'geometry-trigonometry',
    section: 'math',
    label: 'Geometry and Trigonometry',
    labelVi: 'Hình học và Lượng giác',
    weight: 0.15,
    skills: [
      { id: 'area-volume', domain: 'geometry-trigonometry', label: 'Area and volume', labelVi: 'Diện tích và thể tích' },
      { id: 'lines-angles-triangles', domain: 'geometry-trigonometry', label: 'Lines, angles, and triangles', labelVi: 'Đường thẳng, góc, tam giác' },
      { id: 'right-triangles-trig', domain: 'geometry-trigonometry', label: 'Right triangles and trigonometry', labelVi: 'Tam giác vuông và lượng giác' },
      { id: 'circles', domain: 'geometry-trigonometry', label: 'Circles', labelVi: 'Đường tròn' },
    ],
  },
];

export const DOMAIN_BY_ID = new Map<DomainId, Domain>(DOMAINS.map((d) => [d.id, d]));

export const ALL_SKILLS = DOMAINS.flatMap((d) => d.skills);
export const SKILL_BY_ID = new Map<SkillId, (typeof ALL_SKILLS)[number]>(
  ALL_SKILLS.map((s) => [s.id, s]),
);

export function domainsForSection(section: SectionId): Domain[] {
  return DOMAINS.filter((d) => d.section === section);
}

export function skillLabel(id: SkillId, locale: 'vi' | 'en'): string {
  const skill = SKILL_BY_ID.get(id);
  if (!skill) return id;
  return locale === 'vi' ? skill.labelVi : skill.label;
}

export function domainLabel(id: DomainId, locale: 'vi' | 'en'): string {
  const domain = DOMAIN_BY_ID.get(id);
  if (!domain) return id;
  return locale === 'vi' ? domain.labelVi : domain.label;
}

export function sectionLabel(id: SectionId, locale: 'vi' | 'en'): string {
  return locale === 'vi' ? SECTION_SPEC[id].labelVi : SECTION_SPEC[id].label;
}

/**
 * Share of Math items delivered as student-produced responses. The rest are
 * four-option multiple choice.
 */
export const SPR_SHARE = 0.25;
