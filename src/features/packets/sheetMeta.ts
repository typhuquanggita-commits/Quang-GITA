/**
 * What each sheet is for, in the learner's own words.
 *
 * Kept beside the packet feature rather than in the engine, because these are
 * interface strings and the engine has no business holding them. Each carries
 * a `purpose` as well as a name: a learner handed seven sheets needs to know
 * why there are seven, or they will work the ones that look like practice and
 * skip the two that decide whether the practice lands.
 */

import type { SheetKind } from '../../engine/packets.ts';

export interface SheetMeta {
  vi: string;
  en: string;
  purposeVi: string;
  purpose: string;
}

export const SHEET_META: Record<SheetKind, SheetMeta> = {
  theory: {
    vi: 'Phiếu lý thuyết',
    en: 'Theory sheet',
    purposeVi: 'Điều cốt lõi phải hiểu trước khi làm bất kỳ câu nào của chuyên đề này.',
    purpose: 'The one thing that has to be understood before any question in this topic makes sense.',
  },
  recognition: {
    vi: 'Phiếu dạng bài và đọc vị',
    en: 'Question types and cues',
    purposeVi:
      'Các dạng câu hỏi của chuyên đề và dấu hiệu nhận ra từng dạng. Đây là bước hầu hết chương trình luyện thi bỏ qua: biết mọi phương pháp mà không nhận ra đang gặp dạng nào thì sẽ chọn nhầm phương pháp một cách nhanh chóng và tự tin.',
    purpose:
      'The forms this topic’s questions take and the signal that identifies each. This is the step most preparation skips: knowing every method and not recognising the question means picking the wrong method quickly and confidently.',
  },
  method: {
    vi: 'Phiếu kỹ năng và phương pháp',
    en: 'Skills and method',
    purposeVi: 'Các bước theo thứ tự, một ví dụ giải mẫu bằng chính các bước đó, và những bẫy đã được dựng sẵn.',
    purpose: 'The steps in order, one example solved by those very steps, and the traps the topic is built on.',
  },
  advanced: {
    vi: 'Phiếu luyện nâng cao',
    en: 'Advanced practice',
    purposeVi: 'Câu khó trước. Phiếu này để tìm ra giới hạn của bạn, không phải để trấn an bạn.',
    purpose: 'Hard items first. This sheet exists to find your edge, not to reassure you.',
  },
  revision: {
    vi: 'Phiếu ôn thi',
    en: 'Revision',
    purposeVi: 'Trộn độ khó, không bấm giờ. Ôn tập là để gọi lại kiến thức, mà đồng hồ thì bóp nghẹt việc gọi lại.',
    purpose: 'Mixed difficulty, no clock. Revision is for retrieval, and a clock suppresses retrieval.',
  },
  exam: {
    vi: 'Phiếu thi',
    en: 'Exam sheet',
    purposeVi: 'Đúng điều kiện thi thật: cùng tỉ lệ độ khó và cùng nhịp thời gian.',
    purpose: 'Test conditions: the same difficulty mix and the same pace as the real thing.',
  },
  consolidation: {
    vi: 'Phiếu hướng dẫn ôn chắc chuyên đề',
    en: 'Consolidation guide',
    purposeVi:
      'Điều gì phải đúng thì mới coi là ôn chắc chuyên đề — phát biểu bằng hành vi quan sát được, vì "em hiểu rồi" là điều không ai kiểm chứng được, kể cả chính em.',
    purpose:
      'What has to be true before the topic can be called finished — stated as observable behaviour, because "I understand it" is not a claim anyone can check, including the person making it.',
  },
};
