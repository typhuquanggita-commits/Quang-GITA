import type { AttemptReview, ImprovementStep, Level, QuestionResult, SkillScore } from '@/types';
import { band } from '@/lib/grading';

/* =====================================================================
   MATHGITA — ENGINE ĐÁNH GIÁ CHẤT LƯỢNG & ĐỊNH HƯỚNG CẢI THIỆN
   Không chỉ trả về điểm số: hệ thống chỉ ra học sinh hổng ở mạch nào,
   dạng bài nào, do đọc đề hay do kỹ thuật tính, rồi kê "đơn thuốc"
   luyện tập theo thứ tự ưu tiên để tiến tới mốc 9+.
   ===================================================================== */

export const LEVEL_LABEL: Record<Level, string> = {
  NB: 'Nhận biết',
  TH: 'Thông hiểu',
  VD: 'Vận dụng',
  VDC: 'Vận dụng cao',
};

export const LEVEL_ORDER: Level[] = ['NB', 'TH', 'VD', 'VDC'];

function group(results: QuestionResult[], keyOf: (r: QuestionResult) => string, labelOf: (k: string) => string): SkillScore[] {
  const map = new Map<string, { c: number; t: number }>();
  for (const r of results) {
    const k = keyOf(r);
    const cur = map.get(k) ?? { c: 0, t: 0 };
    cur.c += r.partial;
    cur.t += 1;
    map.set(k, cur);
  }
  return Array.from(map.entries()).map(([k, v]) => ({
    key: k,
    label: labelOf(k),
    correct: Math.round(v.c * 10) / 10,
    total: v.t,
    rate: v.t ? v.c / v.t : 0,
  }));
}

export interface ReviewLookup {
  topicName: (id: string) => string;
  tagName: (tag: string) => string;
  /** Gợi ý luyện tập gắn với một dạng bài */
  drillHint?: (tag: string) => string | undefined;
}

export function buildReview(
  results: QuestionResult[],
  score10: number,
  durationSec: number,
  allowedMinutes: number,
  look: ReviewLookup
): AttemptReview {
  const byLevel = group(results, (r) => r.level, (k) => LEVEL_LABEL[k as Level] ?? k)
    .sort((a, b) => LEVEL_ORDER.indexOf(a.key as Level) - LEVEL_ORDER.indexOf(b.key as Level));
  const byTopic = group(results, (r) => r.topicId, look.topicName).sort((a, b) => a.rate - b.rate);
  const byTag = group(results, (r) => r.tag, look.tagName).sort((a, b) => a.rate - b.rate);

  const b = band(score10);

  /* ---------------- Điểm mạnh ---------------- */
  const strengths: string[] = [];
  byTag.filter((t) => t.rate >= 0.85 && t.total >= 2).slice(-4).reverse()
    .forEach((t) => strengths.push(`Vững dạng "${t.label}" (${Math.round(t.rate * 100)}%).`));
  const nb = byLevel.find((l) => l.key === 'NB');
  const th = byLevel.find((l) => l.key === 'TH');
  if (nb && th && nb.rate >= 0.9 && th.rate >= 0.85) strengths.push('Nền tảng Nhận biết – Thông hiểu chắc, đủ điều kiện tăng tốc sang phần Vận dụng.');
  const vdc = byLevel.find((l) => l.key === 'VDC');
  if (vdc && vdc.total > 0 && vdc.rate >= 0.6) strengths.push('Có tư duy xử lý câu Vận dụng cao — nên duy trì mỗi ngày 1 câu VDC.');
  if (!strengths.length) strengths.push('Đã hoàn thành trọn vẹn bài kiểm tra — đây là mốc dữ liệu đầu tiên để hệ thống thiết kế lộ trình cho em.');

  /* ---------------- Điểm yếu ---------------- */
  const weaknesses: string[] = [];
  byLevel.forEach((l) => {
    if (l.total > 0 && l.rate < 0.7) {
      weaknesses.push(`Mức ${l.label}: đúng ${Math.round(l.rate * 100)}% (${l.correct}/${l.total} câu) — chưa đạt ngưỡng an toàn 70%.`);
    }
  });
  byTag.filter((t) => t.rate < 0.6).slice(0, 4)
    .forEach((t) => weaknesses.push(`Dạng "${t.label}" mới đúng ${Math.round(t.rate * 100)}% — cần luyện lại từ ví dụ mẫu.`));
  const blank = results.filter((r) => r.given === null || r.given === '').length;
  if (blank > 0) weaknesses.push(`Bỏ trống ${blank} câu — nguyên nhân thường là thiếu thời gian hoặc chưa "đọc vị" được dạng bài.`);
  const fastWrong = results.filter((r) => !r.correct && r.seconds > 0 && r.seconds < 25 && r.level !== 'NB').length;
  if (fastWrong >= 2) weaknesses.push(`${fastWrong} câu sai trong chưa đầy 25 giây — dấu hiệu đọc đề vội, cần rèn thói quen gạch chân dữ kiện.`);
  if (!weaknesses.length) weaknesses.push('Không phát hiện lỗ hổng đáng kể. Hãy nâng độ khó để giữ nhịp tiến bộ.');

  /* ---------------- Nhịp độ làm bài ---------------- */
  const usedMin = durationSec / 60;
  const ratio = allowedMinutes > 0 ? usedMin / allowedMinutes : 0;
  let paceNote: string;
  if (ratio > 0.98) paceNote = `Dùng hết ${Math.round(usedMin)}/${allowedMinutes} phút. Cần rút ngắn thời gian ở nhóm câu Nhận biết (mục tiêu ≤ 1 phút/câu) để dành thời gian cho câu khó.`;
  else if (ratio < 0.55) paceNote = `Chỉ dùng ${Math.round(usedMin)}/${allowedMinutes} phút. Còn dư nhiều thời gian — hãy dùng để soát lại câu Vận dụng thay vì nộp sớm.`;
  else paceNote = `Dùng ${Math.round(usedMin)}/${allowedMinutes} phút — nhịp độ hợp lý. Giữ thói quen chừa 10 phút cuối để soát bài.`;

  /* ---------------- Kế hoạch cải thiện ---------------- */
  const plan: ImprovementStep[] = [];
  const weakTags = byTag.filter((t) => t.rate < 0.7);
  const weakTopics = byTopic.filter((t) => t.rate < 0.7);

  const lowLevel = LEVEL_ORDER.find((lv) => {
    const s = byLevel.find((x) => x.key === lv);
    return s && s.total > 0 && s.rate < 0.75;
  });

  if (lowLevel === 'NB' || lowLevel === 'TH') {
    plan.push({
      priority: 1,
      title: `Vá nền tảng mức ${LEVEL_LABEL[lowLevel]} trước khi làm đề mới`,
      why: 'Mất điểm ở mức nền tảng khiến trần điểm bị chặn ở khoảng 6–7. Đây là phần lấy lại điểm nhanh nhất.',
      actions: [
        'Đọc lại phần Lý thuyết và Cẩm nang công thức của các chuyên đề bị sai.',
        'Làm 20 câu Nhận biết – Thông hiểu cùng chuyên đề, yêu cầu đúng ≥ 18/20 mới chuyển bước.',
        'Chép lại mỗi công thức sai vào Sổ tay lỗi sai, kèm một ví dụ tự đặt.',
      ],
      topicId: weakTopics[0]?.key,
    });
  }

  weakTags.slice(0, 3).forEach((t, i) => {
    plan.push({
      priority: (i === 0 ? 1 : 2) as 1 | 2,
      title: `Luyện chuyên sâu dạng "${t.label}"`,
      why: `Tỉ lệ đúng hiện tại ${Math.round(t.rate * 100)}% trên ${t.total} câu — đây là dạng đang kéo điểm xuống.`,
      actions: [
        look.drillHint?.(t.key) ?? 'Xem lại Sơ đồ đọc vị bài của dạng này: dấu hiệu nào trong đề → dùng công cụ nào.',
        'Làm lại 2 ví dụ mẫu có phân tích tư duy, che lời giải và tự trình bày.',
        'Luyện 10 câu cùng dạng ở chế độ Luyện tập (được xem lời giải ngay sau mỗi câu).',
        'Sau 24 giờ, làm lại 5 câu để kiểm tra độ bền kiến thức.',
      ],
      targetTag: t.key,
    });
  });

  if (blank > 0 || ratio > 0.98) {
    plan.push({
      priority: 2,
      title: 'Rèn chiến thuật phân bổ thời gian',
      why: 'Điểm mất do hết giờ là loại mất điểm "oan" nhất — kiến thức có nhưng không kịp thể hiện.',
      actions: [
        'Quét đề 2 phút đầu, đánh dấu câu dễ làm trước, câu khó để sau.',
        'Đặt mốc: 50% thời gian phải xong 70% số câu.',
        'Câu nào quá 3 phút chưa có hướng thì bỏ qua, quay lại ở vòng 2.',
      ],
    });
  }

  if (fastWrong >= 2) {
    plan.push({
      priority: 2,
      title: 'Sửa lỗi đọc đề vội',
      why: `Có ${fastWrong} câu sai rất nhanh — hầu hết do bỏ sót điều kiện hoặc nhầm yêu cầu của đề.`,
      actions: [
        'Bắt buộc gạch chân: đại lượng đã cho, đại lượng phải tìm, điều kiện ràng buộc.',
        'Viết lại yêu cầu đề bằng lời của mình trước khi đặt bút tính.',
        'Thử lại đáp số vào đề trước khi chọn phương án.',
      ],
    });
  }

  if (score10 >= 8.5) {
    plan.push({
      priority: 3,
      title: 'Tăng tốc lên nhóm 9+ và ôn thi học sinh giỏi',
      why: 'Nền tảng đã tốt; khoảng cách tới 9+ nằm ở câu Vận dụng cao và độ chắc khi trình bày.',
      actions: [
        'Mỗi ngày 1 câu Vận dụng cao, trình bày đủ bước như bài thi.',
        'Học Sơ đồ tư duy tổng hợp chuyên đề để nối kiến thức giữa các chương.',
        'Làm 1 đề đầy đủ mỗi tuần, bấm giờ nghiêm túc.',
      ],
    });
  } else {
    plan.push({
      priority: 3,
      title: 'Duy trì nhịp luyện đều',
      why: 'Tiến bộ trong Toán đến từ tần suất, không đến từ khối lượng dồn một buổi.',
      actions: [
        'Mỗi ngày 25–30 phút, tối thiểu 5 buổi/tuần.',
        'Mỗi tuần 1 đề tổng hợp có bấm giờ.',
        'Cuối tuần đọc lại Sổ tay lỗi sai và làm lại đúng những câu đã sai.',
      ],
    });
  }

  const gapTo9 = Math.max(0, Math.round((9 - score10) * 100) / 100);
  const headline =
    score10 >= 9 ? 'Đạt mục tiêu 9+ của MATHGITA. Nhiệm vụ tiếp theo là giữ vững và mở rộng sang Vận dụng cao.'
    : score10 >= 8 ? `Rất tốt — chỉ còn ${gapTo9} điểm nữa là chạm mốc 9+. Trọng tâm: bịt các dạng bài đang mất điểm.`
    : score10 >= 6.5 ? `Nền tảng khá — cần thêm ${gapTo9} điểm để đạt mục tiêu. Hãy xử lý dứt điểm nhóm dạng bài yếu nhất trước.`
    : score10 >= 5 ? 'Kiến thức đã có nhưng chưa ổn định. Ưu tiên củng cố mức Nhận biết – Thông hiểu trước khi luyện đề tiếp.'
    : 'Cần quay lại học kỹ lý thuyết và dạng bài cơ bản. Hệ thống đã xếp sẵn lộ trình vá nền tảng ở bên dưới.';

  plan.sort((a, b) => a.priority - b.priority);

  return { band: b, headline, byLevel, byTopic, byTag, strengths, weaknesses, plan, paceNote, gapTo9 };
}
