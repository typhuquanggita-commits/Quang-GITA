import type { Rng } from '@/lib/rng';
import { DRILL_ANALYSIS } from './analysis';
import { generateItem, type GenItem, type ItemGenerator } from './generators';

/**
 * Các câu hỏi "đọc vị" và "kỹ năng – phương pháp" được dựng trực tiếp từ
 * BẢNG PHÂN TÍCH DẠNG BÀI, nên phương án nhiễu luôn là mô tả thật của một dạng
 * bài khác — chứ không phải phương án bịa.
 */

function shuffleWithAnswer(r: Rng, correct: string, wrongs: string[]) {
  const seen = new Set([correct]);
  const opts: string[] = [];
  for (const w of wrongs) {
    if (!seen.has(w) && opts.length < 3) {
      seen.add(w);
      opts.push(w);
    }
  }
  let i = 1;
  while (opts.length < 3) {
    const filler = `Không có mô tả nào ở trên phù hợp (${i})`;
    if (!seen.has(filler)) {
      seen.add(filler);
      opts.push(filler);
    }
    i++;
  }
  const all = r.shuffle([correct, ...opts]);
  return { choices: all, correct: all.indexOf(correct) };
}

const others = (gen: ItemGenerator, pool: ItemGenerator[]) =>
  pool.filter((g) => g.id !== gen.id && DRILL_ANALYSIS[g.id]);

/** Câu "đọc vị": cho đề bài thật, hỏi dấu hiệu nhận dạng hoặc hướng đi đầu tiên. */
export function buildRecognitionItem(gen: ItemGenerator, pool: ItemGenerator[], r: Rng): GenItem {
  const a = DRILL_ANALYSIS[gen.id];
  const sample = gen.build(r);
  const rest = r.shuffle(others(gen, pool));
  const askRecognize = r.bool() || !a;

  if (!a) {
    // Không có hồ sơ phân tích thì trả về câu tính toán bình thường
    return generateItem(gen, r);
  }

  const correct = askRecognize ? a.recognize : a.method[0];
  const wrongs = rest
    .slice(0, 5)
    .map((g) => (askRecognize ? DRILL_ANALYSIS[g.id].recognize : DRILL_ANALYSIS[g.id].method[0]));

  const { choices, correct: idx } = shuffleWithAnswer(r, correct, wrongs);

  return {
    generatorId: gen.id,
    name: gen.name,
    topicId: gen.topicId,
    strand: gen.strand,
    skill: askRecognize ? 'Đọc vị đề — nhận dạng bài toán' : 'Đọc vị đề — chọn hướng đi đầu tiên',
    prompt: askRecognize
      ? `Đọc đề sau và cho biết dấu hiệu nhận dạng ĐÚNG của bài toán này (chưa cần giải):\n\n“${sample.prompt}”`
      : `Với bài toán sau, bước đi ĐẦU TIÊN đúng đắn nhất là gì?\n\n“${sample.prompt}”`,
    choices,
    correct: idx,
    steps: [
      `Dạng bài: ${gen.name}.`,
      `Dấu hiệu nhận dạng: ${a.recognize}`,
      `Quy trình giải chuẩn của dạng này: ${a.method.map((m, i) => `(${i + 1}) ${m}`).join(' ')}`,
      `Vì sao đọc vị quan trọng: nhận đúng dạng ngay từ đầu giúp bạn tiết kiệm phần lớn thời gian trong phòng thi. ${a.transfer}`,
    ],
  };
}

/** Câu "kỹ năng – phương pháp": hỏi thứ tự bước, bước bắt buộc, hoặc bẫy hay mắc. */
export function buildMethodItem(gen: ItemGenerator, pool: ItemGenerator[], r: Rng): GenItem {
  const a = DRILL_ANALYSIS[gen.id];
  if (!a) return generateItem(gen, r);
  const rest = r.shuffle(others(gen, pool));
  const kind = r.int(0, 2);

  // (0) Bước tiếp theo trong quy trình
  if (kind === 0 && a.method.length >= 2) {
    const k = r.int(0, a.method.length - 2);
    const correct = a.method[k + 1];
    const wrongs = [
      ...(k + 2 < a.method.length ? [a.method[k + 2]] : []),
      ...(k > 0 ? [a.method[k - 1]] : []),
      ...rest.slice(0, 4).map((g) => DRILL_ANALYSIS[g.id].method[0]),
    ];
    const { choices, correct: idx } = shuffleWithAnswer(r, correct, wrongs);
    return {
      generatorId: gen.id,
      name: gen.name,
      topicId: gen.topicId,
      strand: gen.strand,
      skill: 'Nắm đúng thứ tự các bước của quy trình chuẩn',
      prompt: `Trong quy trình giải chuẩn của dạng “${gen.name}”, ngay sau bước “${a.method[k]}” thì bước tiếp theo là gì?`,
      choices,
      correct: idx,
      steps: [
        `Quy trình giải chuẩn đầy đủ của dạng “${gen.name}”:`,
        ...a.method.map((m, i) => `Bước ${i + 1}. ${m}`),
        'Nhảy bước hoặc đảo thứ tự là nguyên nhân chính khiến lời giải bị hổng và mất điểm trình bày.',
      ],
    };
  }

  // (1) Bẫy hay mắc
  if (kind === 1 && a.traps.length) {
    const correct = a.traps[r.int(0, a.traps.length - 1)];
    const wrongs = rest.slice(0, 5).map((g) => {
      const ta = DRILL_ANALYSIS[g.id].traps;
      return ta[0];
    });
    const { choices, correct: idx } = shuffleWithAnswer(r, correct, wrongs);
    return {
      generatorId: gen.id,
      name: gen.name,
      topicId: gen.topicId,
      strand: gen.strand,
      skill: 'Nhận diện bẫy của dạng bài',
      prompt: `Khi làm dạng “${gen.name}”, lỗi nào dưới đây là lỗi thường mắc CỦA CHÍNH dạng này?`,
      choices,
      correct: idx,
      steps: [
        `Các bẫy đặc trưng của dạng “${gen.name}”:`,
        ...a.traps.map((t) => `• ${t}`),
        `Dấu hiệu cho thấy bạn đã vượt qua các bẫy này: ${a.mastery}`,
      ],
    };
  }

  // (2) Dấu hiệu đã thành thạo
  const correct = a.mastery;
  const wrongs = rest.slice(0, 5).map((g) => DRILL_ANALYSIS[g.id].mastery);
  const { choices, correct: idx } = shuffleWithAnswer(r, correct, wrongs);
  return {
    generatorId: gen.id,
    name: gen.name,
    topicId: gen.topicId,
    strand: gen.strand,
    skill: 'Tự đánh giá mức độ thành thạo',
    prompt: `Đâu là dấu hiệu cho thấy bạn đã thực sự làm chủ dạng “${gen.name}”?`,
    choices,
    correct: idx,
    steps: [
      `Với dạng “${gen.name}”, tiêu chí thành thạo là: ${a.mastery}`,
      `Quy trình cần thực hiện trôi chảy: ${a.method.map((m, i) => `(${i + 1}) ${m}`).join(' ')}`,
      `Liên hệ đề thi: ${a.transfer}`,
    ],
  };
}
