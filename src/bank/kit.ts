import type { Rng } from '@/types';
import { mcOptions } from '@/lib/rng';

/* =====================================================================
   MATHGITA — BỘ DỰNG CÂU HỎI TỪ NGÂN HÀNG MỆNH ĐỀ
   Thay vì mỗi khuôn chỉ sinh ra một kiểu câu hỏi, các khuôn dùng bộ dựng
   này rút ngẫu nhiên từ một *pool* mệnh đề đã biên soạn sẵn. Nhờ vậy một
   khuôn có thể cho hàng chục câu hỏi khác nhau về nội dung, giúp 100 mã
   đề mỗi khối thực sự khác nhau chứ không chỉ khác con số.
   ===================================================================== */

/** Một mệnh đề đúng/sai kèm lời giải thích ngắn. */
export interface Claim {
  /** Nội dung khẳng định (hỗ trợ cú pháp toán $...$). */
  t: string;
  /** Khẳng định này đúng hay sai. */
  ok: boolean;
  /** Vì sao đúng / sai — hiển thị trong lời giải. */
  why: string;
}

/** Một câu trắc nghiệm bốn phương án. */
export interface McItem {
  /** Câu hỏi. */
  q: string;
  /** Phương án đúng. */
  a: string;
  /** Ba phương án nhiễu. */
  w: [string, string, string];
  /** Giải thích vì sao phương án đúng là đúng. */
  why: string;
  /** Bẫy riêng của câu này (nếu có). */
  trap?: string;
}

const ABCD = ['a', 'b', 'c', 'd'];

/**
 * Dựng một câu Đúng/Sai 4 ý từ pool mệnh đề.
 * Luôn lấy ít nhất một ý đúng và một ý sai để câu hỏi có giá trị phân loại.
 */
export function tfFrom(
  r: Rng,
  pool: Claim[],
  opts: { stem?: string; thinking: string[]; pitfall?: string },
): {
  stem: string;
  options: string[];
  answer: boolean[];
  thinking: string[];
  solution: string[];
  pitfall?: string;
} {
  // Loại các mệnh đề trùng nội dung để bốn ý luôn khác nhau.
  const seen = new Set<string>();
  const uniq = pool.filter((c) => (seen.has(c.t) ? false : (seen.add(c.t), true)));
  const dung = uniq.filter((c) => c.ok);
  const sai = uniq.filter((c) => !c.ok);
  // Số ý đúng từ 1 đến 3 — bảo đảm câu hỏi không toàn đúng hoặc toàn sai.
  const soDung = Math.min(dung.length, Math.max(1, Math.min(3, r.int(1, 3))));
  const soSai = Math.min(sai.length, 4 - soDung);
  const chon = r.shuffle([
    ...r.shuffle(dung).slice(0, soDung),
    ...r.shuffle(sai).slice(0, soSai),
  ]);
  // Nếu pool thiếu, bù thêm cho đủ 4 ý.
  while (chon.length < 4) {
    const con = uniq.filter((c) => !chon.includes(c));
    if (con.length === 0) break;
    chon.push(r.pick(con));
  }
  const bon = chon.slice(0, 4);
  return {
    stem: opts.stem ?? 'Xét tính đúng – sai của mỗi khẳng định sau:',
    options: bon.map((c) => c.t),
    answer: bon.map((c) => c.ok),
    thinking: opts.thinking,
    solution: bon.map((c, i) => `${ABCD[i]}) **${c.ok ? 'Đúng' : 'Sai'}** — ${c.why}`),
    pitfall: opts.pitfall,
  };
}

/** Dựng một câu trắc nghiệm 4 phương án từ pool câu hỏi. */
export function mcFrom(
  r: Rng,
  pool: readonly McItem[],
  opts: { thinking: string[]; pitfall?: string },
): {
  stem: string;
  options: string[];
  answer: number;
  thinking: string[];
  solution: string[];
  pitfall?: string;
} {
  const it = r.pick(pool);
  const [options, answer] = mcOptions(r, it.a, [...it.w]);
  return {
    stem: it.q,
    options,
    answer,
    thinking: opts.thinking,
    solution: [`Đáp án đúng: ${it.a}.`, it.why],
    pitfall: it.trap ?? opts.pitfall,
  };
}
