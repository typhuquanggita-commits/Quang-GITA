/**
 * Xuat bo tai lieu chuong trinh ra tep de in, chia se hoac nhap vao he thong khac.
 *
 *   npm run catalogue
 *
 * Sinh ra ba tep trong thu muc `catalogue/`:
 *   - phieu-luyen.csv                2000 phieu luyen, day du dac ta
 *   - nhiem-vu.csv                   2000 nhiem vu tuong ung
 *   - phieu-huong-dan-on-chac.csv    30 phieu huong dan on chac chuyen de
 *   - kho-bi-kip.csv                 90 dang bai: doc vi, phuong phap, buoc giai, meo
 *   - de-mau.csv                     750 dong: 5 de mau x 150 cau, kem dap an va barem
 *   - de-mau-ma-tran.csv             ma tran cua tung de mau
 *   - chuong-trinh.json              khung chuong trinh day du (may doc)
 *
 * Vi bo phieu duoc SINH RA tu dac ta chu khong go tay, tep xuat ra luon dong bo
 * voi ma nguon: khong bao gio co chuyen tai lieu noi mot dang, phan mem chay
 * mot neo.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  KINDS,
  LEVELS,
  MASTERED_TO_LEVEL_UP,
  STAGES,
  STAGE_PROMOTION_KPI,
} from '../src/data/curriculum';
import { getMissions } from '../src/data/missions';
import { findQuestion } from '../src/data/questions';
import { topicName } from '../src/data/topics';
import { bankCoverage, getWorksheets, guideCodeOf } from '../src/data/worksheets';
import { buildTopicGuide } from '../src/lib/topicGuide';
import { knowledgeFor } from '../src/data/knowledge';
import { TOPICS } from '../src/data/topics';
import { PLAYBOOKS } from '../src/data/playbook';
import { MOCK_EXAMS, buildPaper } from '../src/data/mockExams';
import { createInitialState } from '../src/lib/storage';
import { SECTION_BY_ID, SUBJECT_NAME } from '../src/config';

const OUT = 'catalogue';
mkdirSync(OUT, { recursive: true });

/** Boc mot o CSV: nhan doi dau nhay va boc trong dau nhay khi can. */
function cell(value: unknown): string {
  const text = String(value ?? '');
  return /[",\n;]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function toCsv(head: readonly string[], rows: ReadonlyArray<readonly unknown[]>): string {
  // BOM de Excel tren Windows mo dung tieng Viet UTF-8.
  return '﻿' + [head, ...rows].map((row) => row.map(cell).join(',')).join('\r\n') + '\r\n';
}

const sheets = getWorksheets();
const missions = getMissions();

writeFileSync(
  join(OUT, 'phieu-luyen.csv'),
  toCsv(
    [
      'Mã phiếu', 'Loại phiếu', 'Mã loại', 'Phiếu lời giải', 'Phiếu hướng dẫn ôn chắc',
      'Tiêu đề', 'Phần thi', 'Môn tự chọn', 'Chuyên đề', 'Giai đoạn', 'Cấp độ',
      'Số câu', 'Thời gian (phút)', 'Ngưỡng hoàn thành', 'Ngưỡng thành thạo',
      'Điểm KN', 'Phiếu tiên quyết',
      'Chặng 1', 'Chặng 1 (số câu)', 'Chặng 2', 'Chặng 2 (số câu)', 'Chặng 3', 'Chặng 3 (số câu)',
      'Mã câu hỏi', 'Mục tiêu', 'Đạt khi',
    ],
    sheets.map((s) => [
      s.code,
      KINDS.find((k) => k.kind === s.kind)?.name ?? s.kind,
      s.kindCode,
      s.solutionCode,
      s.guideCode,
      s.title,
      SECTION_BY_ID[s.section].shortName,
      s.subject ? SUBJECT_NAME[s.subject] : '',
      topicName(s.topicId),
      s.stage,
      s.level,
      s.questionCount,
      Math.max(1, Math.round(s.seconds / 60)),
      `${Math.round(s.passRatio * 100)}%`,
      `${Math.round(s.masteryRatio * 100)}%`,
      s.xp,
      s.requires ?? '',
      s.parts[0]?.name ?? '',
      s.parts[0]?.questionIds.length ?? 0,
      s.parts[1]?.name ?? '',
      s.parts[1]?.questionIds.length ?? 0,
      s.parts[2]?.name ?? '',
      s.parts[2]?.questionIds.length ?? 0,
      s.parts.flatMap((p) => p.questionIds).join(' | '),
      s.objective,
      KINDS.find((k) => k.kind === s.kind)?.masteryCue ?? '',
    ]),
  ),
  'utf8',
);

writeFileSync(
  join(OUT, 'nhiem-vu.csv'),
  toCsv(
    [
      'Mã nhiệm vụ', 'Phiếu luyện', 'Tiêu đề', 'Phần thi', 'Chuyên đề', 'Giai đoạn', 'Cấp độ',
      'Dạng', 'Điểm KN', 'Lời giao việc', 'Ràng buộc',
    ],
    missions.map((m) => [
      m.code,
      m.worksheetId,
      m.title,
      SECTION_BY_ID[m.section].shortName,
      topicName(m.topicId),
      m.stage,
      m.level,
      KINDS.find((k) => k.kind === m.kind)?.name ?? m.kind,
      m.xp,
      m.brief,
      m.constraint,
    ]),
  ),
  'utf8',
);

/* Phieu huong dan on chac chuyen de — mot phieu cho moi chuyen de. */
const blankState = createInitialState();
writeFileSync(
  join(OUT, 'phieu-huong-dan-on-chac.csv'),
  toCsv(
    [
      'Mã phiếu', 'Chuyên đề', 'Phần thi', 'Tỉ trọng trong phần', 'Số câu trong ngân hàng',
      'Ý lõi phải hiểu', 'Công thức phải thuộc', 'Dạng bài & dấu hiệu đọc vị', 'Bẫy hay mắc',
      'Chiến thuật thời gian', 'Tiêu chí ôn chắc',
    ],
    TOPICS.map((topic) => {
      const guide = buildTopicGuide(blankState, topic.id);
      const k = knowledgeFor(topic.id);
      return [
        guideCodeOf(topic.id),
        topic.name,
        SECTION_BY_ID[topic.section].shortName,
        `${Math.round(topic.weight * 100)}%`,
        guide?.questionCount ?? 0,
        (k?.coreIdeas ?? []).join(' | '),
        (k?.formulas ?? []).join(' | '),
        (k?.patterns ?? []).map((p) => `${p.name}: ${p.cue}`).join(' | '),
        (k?.traps ?? []).map((t) => `${t.trap} → ${t.fix}`).join(' | '),
        k?.timing ?? '',
        (guide?.criteria ?? []).map((c) => c.label).join(' | '),
      ];
    }),
  ),
  'utf8',
);

/* Kho bi kip — mot dong cho moi DANG BAI, khong phai moi chuyen de. Day la
   tang ma bo giai de cua ca 2000 phieu deu soan tu do. */
writeFileSync(
  join(OUT, 'kho-bi-kip.csv'),
  toCsv(
    [
      'Chuyên đề', 'Câu hỏi lớn của chuyên đề', 'Mã dạng', 'Dạng bài',
      'Đọc vị — dấu hiệu trên đề', 'Phương pháp', 'Bước giải (việc → mục đích)',
      'Mẹo xử lý', 'Sai lầm đặc trưng',
    ],
    PLAYBOOKS.flatMap((book) => {
      const topic = TOPICS.find((t) => t.id === book.topicId);
      return book.patterns.map((pattern) => [
        topic?.name ?? book.topicId,
        book.bigQuestion,
        pattern.id,
        pattern.name,
        pattern.tell.join(' | '),
        pattern.method,
        pattern.steps.map((st, i) => `${i + 1}. ${st.action} → ${st.why}`).join(' | '),
        pattern.trick ?? '',
        pattern.pitfall ?? '',
      ]);
    }),
  ),
  'utf8',
);

/* Bi kip cap chuyen de — nhung thu chi biet duoc sau nhieu de. */
writeFileSync(
  join(OUT, 'bi-kip-chuyen-de.csv'),
  toCsv(
    ['Chuyên đề', 'Bí kíp', 'Nội dung', 'Dùng khi'],
    PLAYBOOKS.flatMap((book) => {
      const topic = TOPICS.find((t) => t.id === book.topicId);
      return book.secrets.map((secret) => [
        topic?.name ?? book.topicId,
        secret.title,
        secret.body,
        secret.when,
      ]);
    }),
  ),
  'utf8',
);

/* De mau tron ven — moi dong la mot cau trong mot de, kem dap an va barem. */
writeFileSync(
  join(OUT, 'de-mau.csv'),
  toCsv(
    [
      'Mã đề', 'Tên đề', 'Câu số', 'Phần thi', 'Câu trong phần', 'Chuyên đề',
      'Mức độ', 'Dạng câu', 'Đề bài', 'Phương án', 'Đáp án', 'Điểm',
      'Thời gian mục tiêu (giây)', 'Lời giải',
    ],
    MOCK_EXAMS.flatMap((exam) => {
      const paper = buildPaper(exam.code);
      return (paper?.items ?? []).map((item) => [
        exam.code,
        exam.name,
        item.number,
        SECTION_BY_ID[item.section].shortName,
        item.numberInSection,
        item.topicName,
        item.question.difficulty,
        item.question.format === 'mcq' ? 'Trắc nghiệm' : 'Điền đáp án',
        item.question.stem,
        (item.question.choices ?? []).map((c) => `${c.id}. ${c.text}`).join(' | '),
        item.question.answer,
        item.points,
        item.question.estimatedSeconds,
        item.question.explanation,
      ]);
    }),
  ),
  'utf8',
);

/* Ma tran cua tung de mau: so cau moi chuyen de theo tung muc do kho. */
writeFileSync(
  join(OUT, 'de-mau-ma-tran.csv'),
  toCsv(
    ['Mã đề', 'Phần thi', 'Chuyên đề', 'Mức 1', 'Mức 2', 'Mức 3', 'Mức 4', 'Mức 5', 'Tổng'],
    MOCK_EXAMS.flatMap((exam) => {
      const paper = buildPaper(exam.code);
      return (paper?.matrix ?? []).map((row) => [
        exam.code,
        SECTION_BY_ID[row.section].shortName,
        row.topicName,
        row.byDifficulty[1], row.byDifficulty[2], row.byDifficulty[3],
        row.byDifficulty[4], row.byDifficulty[5],
        row.total,
      ]);
    }),
  ),
  'utf8',
);

writeFileSync(
  join(OUT, 'chuong-trinh.json'),
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      rules: {
        passRatio: sheets[0]?.passRatio,
        masteredToLevelUp: MASTERED_TO_LEVEL_UP,
        stagePromotionKpi: STAGE_PROMOTION_KPI,
      },
      stages: STAGES,
      levels: LEVELS,
      kinds: KINDS,
      totals: { worksheets: sheets.length, missions: missions.length },
      bankCoverage: bankCoverage().map((c) => ({ ...c, topic: topicName(c.topicId) })),
      worksheets: sheets,
      missions,
    },
    null,
    2,
  ),
  'utf8',
);

const missingQuestions = sheets
  .flatMap((s) => s.parts.flatMap((p) => p.questionIds))
  .filter((id) => !findQuestion(id));

console.log(
  `Đã xuất ${sheets.length} phiếu luyện, ${missions.length} nhiệm vụ và ${TOPICS.length} phiếu hướng dẫn ôn chắc vào thư mục ${OUT}/`,
);
if (missingQuestions.length > 0) {
  console.error(`CẢNH BÁO: ${missingQuestions.length} mã câu hỏi không tồn tại trong ngân hàng.`);
  process.exitCode = 1;
}
