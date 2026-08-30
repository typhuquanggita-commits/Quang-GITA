import type { ItemGenerator } from './generators';
import { gcd } from '@/lib/rng';

/**
 * BỘ SINH ĐỀ — LUỒNG 4 · TOÁN THI VÀO LỚP 6 TRƯỜNG CHẤT LƯỢNG CAO
 *
 * Toàn bộ số liệu được chọn để kết quả luôn "đẹp": không có số thập phân vô
 * hạn, không có số âm, không có phép chia không hết — đúng như đề tiểu học.
 * Ba phương án sai của mỗi câu đều là lỗi có thật của học sinh chứ không phải
 * số ngẫu nhiên, để phần chữa bài nói được đúng nguyên nhân.
 */

/** Ghép ba phương án sai khác nhau và khác đáp án đúng. */
const wrongsOf = (correct: string, cands: string[], fallback: (i: number) => string): string[] => {
  const seen = new Set([correct]);
  const out: string[] = [];
  for (const c of cands) {
    if (out.length === 3) break;
    if (!seen.has(c)) {
      seen.add(c);
      out.push(c);
    }
  }
  for (let i = 0; out.length < 3 && i < 80; i++) {
    const f = fallback(i);
    if (!seen.has(f)) {
      seen.add(f);
      out.push(f);
    }
  }
  return out;
};

/** Phân số đã rút gọn, viết gọn thành số nguyên khi mẫu bằng 1. */
const frac = (p: number, q: number): string => {
  const g = gcd(p, q) || 1;
  const a = p / g;
  const b = q / g;
  return b === 1 ? String(a) : `${a}/${b}`;
};

/** Số thập phân kiểu Việt Nam: dấu phẩy, bỏ số 0 thừa. */
const dec = (x: number): string => {
  const r = Math.round(x * 100) / 100;
  return String(r).replace('.', ',');
};

/** Số tiền có dấu chấm phân nhóm nghìn. */
const money = (n: number): string => {
  const s = String(Math.round(n));
  let out = '';
  for (let i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 === 0) out += '.';
    out += s[i];
  }
  return out;
};

const NAMES = ['An', 'Bình', 'Chi', 'Dũng', 'Hà', 'Khôi', 'Linh', 'Minh'];
const HOBBIES = ['bóng đá', 'cờ vua', 'vẽ tranh', 'bơi lội', 'đàn piano', 'cầu lông'];

export const GENERATORS_L6: ItemGenerator[] = [
  /* ============ PHÂN SỐ, SỐ THẬP PHÂN & BỐN PHÉP TÍNH ============ */
  {
    id: 'g-l6-cong-phan-so',
    name: 'Cộng hai phân số khác mẫu',
    topicId: 'l6-phan-so-thap-phan',
    strand: 'so-hoc',
    tracks: ['lop6'],
    level: 1,
    skill: 'Quy đồng rồi cộng, sau đó rút gọn',
    build: (r) => {
      const b = r.pick([3, 4, 5, 6, 8]);
      const d = r.pick([2, 3, 4, 5, 6, 7].filter((x) => x !== b));
      const a = r.int(1, b - 1);
      const c = r.int(1, d - 1);
      const correct = frac(a * d + c * b, b * d);
      return {
        prompt: `Tính ${a}/${b} + ${c}/${d}, kết quả viết dưới dạng phân số tối giản.`,
        correct,
        wrongs: wrongsOf(
          correct,
          [frac(a + c, b + d), frac(a + c, b * d), frac(a * c, b * d)],
          (i) => frac(a * d + c * b + (i + 1), b * d),
        ),
        steps: [
          `Mẫu chung của ${b} và ${d} là ${b * d}.`,
          `${a}/${b} = ${a * d}/${b * d} và ${c}/${d} = ${c * b}/${b * d}.`,
          `Cộng hai tử số: ${a * d} + ${c * b} = ${a * d + c * b}, được ${a * d + c * b}/${b * d}.`,
          `Rút gọn: ${a * d + c * b}/${b * d} = ${correct}.`,
          'Nhớ: cộng phân số là cộng tử sau khi đã quy đồng, tuyệt đối không cộng mẫu với mẫu.',
        ],
      };
    },
  },
  {
    id: 'g-l6-tinh-nhanh',
    name: 'Tính nhanh bằng cách nhóm hợp lý',
    topicId: 'l6-phan-so-thap-phan',
    strand: 'so-hoc',
    tracks: ['lop6'],
    level: 2,
    skill: 'Đặt thừa số chung để tránh tính từng phép',
    build: (r) => {
      const m = r.pick([2.5, 4.5, 7.5, 12.5, 25]);
      const x = r.pick([27, 36, 41, 58, 63, 72]);
      const y = 100 - x;
      const val = m * 100;
      const correct = dec(val);
      return {
        prompt: `Tính nhanh: ${dec(m)} × ${x} + ${dec(m)} × ${y}.`,
        correct,
        wrongs: wrongsOf(
          correct,
          [dec(m * 10), dec(m * 1000), dec(val - m)],
          (i) => dec(val + (i + 1) * 5),
        ),
        steps: [
          `Hai tích có chung thừa số ${dec(m)}, nên đặt thừa số chung ra ngoài.`,
          `${dec(m)} × ${x} + ${dec(m)} × ${y} = ${dec(m)} × (${x} + ${y}).`,
          `${x} + ${y} = 100, một số tròn trăm — đây chính là lý do đề chọn hai số này.`,
          `Vậy kết quả là ${dec(m)} × 100 = ${correct}.`,
          'Mẹo nhận dạng: thấy hai số hạng có cùng một thừa số thì đừng nhân ra, hãy nhóm lại.',
        ],
      };
    },
  },

  /* ============ TỈ SỐ & TỈ SỐ PHẦN TRĂM ============ */
  {
    id: 'g-l6-phan-tram-co-ban',
    name: 'Tìm giá trị phần trăm của một số',
    topicId: 'l6-ti-so-phan-tram',
    strand: 'so-hoc',
    tracks: ['lop6'],
    level: 1,
    skill: 'Xác định phần trăm của cái gì rồi mới tính',
    build: (r) => {
      const total = r.pick([120, 150, 200, 240, 300, 360]);
      const p = r.pick([15, 20, 25, 30, 40, 60]);
      const sold = (total * p) / 100;
      const left = total - sold;
      const correct = `${dec(left)} kg`;
      return {
        prompt: `Một cửa hàng có ${total} kg gạo, ngày đầu bán được ${p}% số gạo đó. Hỏi cửa hàng còn lại bao nhiêu ki-lô-gam gạo?`,
        correct,
        wrongs: wrongsOf(
          correct,
          [`${dec(sold)} kg`, `${dec(total - p)} kg`, `${dec((total * p) / 10)} kg`],
          (i) => `${dec(left + (i + 1) * 3)} kg`,
        ),
        steps: [
          `Xác định phần trăm của cái gì: ${p}% ở đây là ${p}% của tổng số gạo ban đầu, tức của ${total} kg.`,
          `Số gạo đã bán: ${total} × ${p} : 100 = ${dec(sold)} kg.`,
          `Số gạo còn lại: ${total} − ${dec(sold)} = ${dec(left)} kg.`,
          'Đọc lại câu hỏi trước khi ghi đáp số: đề hỏi số còn lại, không hỏi số đã bán.',
        ],
      };
    },
  },
  {
    id: 'g-l6-tang-giam-lien-tiep',
    name: 'Tăng rồi giảm phần trăm liên tiếp',
    topicId: 'l6-ti-so-phan-tram',
    strand: 'so-hoc',
    tracks: ['lop6'],
    level: 3,
    skill: 'Hiểu mốc 100% thay đổi sau mỗi bước',
    build: (r) => {
      const base = r.pick([200000, 240000, 300000, 400000, 500000]);
      const up = r.pick([10, 20, 25]);
      const down = r.pick([10, 20, 50].filter((x) => x !== up));
      const afterUp = (base * (100 + up)) / 100;
      const final = (afterUp * (100 - down)) / 100;
      const correct = `${money(final)} đồng`;
      return {
        prompt: `Một món hàng giá ${money(base)} đồng. Cửa hàng tăng giá ${up}%, sau đó giảm ${down}% so với giá mới. Hỏi giá cuối cùng của món hàng là bao nhiêu?`,
        correct,
        wrongs: wrongsOf(
          correct,
          [
            `${money((base * (100 + up - down)) / 100)} đồng`,
            `${money(base)} đồng`,
            `${money(afterUp)} đồng`,
          ],
          (i) => `${money(final + (i + 1) * 5000)} đồng`,
        ),
        steps: [
          `Bước 1 — tăng ${up}%: giá mới = ${money(base)} × ${100 + up} : 100 = ${money(afterUp)} đồng.`,
          `Bước 2 — giảm ${down}%, nhưng là giảm so với giá mới chứ không phải giá gốc.`,
          `Giá cuối = ${money(afterUp)} × ${100 - down} : 100 = ${money(final)} đồng.`,
          `Vì sao không lấy ${up}% − ${down}%: sau bước 1, mốc 100% đã đổi từ ${money(base)} sang ${money(afterUp)} đồng, nên hai phần trăm này tính trên hai số khác nhau, không cộng trừ trực tiếp được.`,
        ],
      };
    },
  },

  /* ============ TOÁN CHUYỂN ĐỘNG ============ */
  {
    id: 'g-l6-gap-nhau',
    name: 'Hai xe đi ngược chiều gặp nhau',
    topicId: 'l6-toan-chuyen-dong',
    strand: 'thuc-te',
    tracks: ['lop6'],
    level: 2,
    skill: 'Ngược chiều thì cộng vận tốc',
    build: (r) => {
      const v1 = r.pick([30, 35, 40, 45]);
      const v2 = r.pick([50, 55, 60, 65]);
      const t = r.int(2, 5);
      const s = (v1 + v2) * t;
      const correct = `${t} giờ`;
      return {
        prompt: `Hai thành phố A và B cách nhau ${s} km. Cùng một lúc, một xe máy đi từ A với vận tốc ${v1} km/giờ và một ô tô đi từ B với vận tốc ${v2} km/giờ, hai xe đi ngược chiều để gặp nhau. Hỏi sau bao lâu hai xe gặp nhau?`,
        correct,
        wrongs: wrongsOf(
          correct,
          [
            `${dec(s / (v2 - v1))} giờ`,
            `${dec(s / v2)} giờ`,
            `${dec(s / v1)} giờ`,
          ],
          (i) => `${t + i + 1} giờ`,
        ),
        steps: [
          'Vẽ sơ đồ đoạn thẳng: A ở đầu này, B ở đầu kia, hai mũi tên hướng vào nhau.',
          `Vì đi ngược chiều nên mỗi giờ khoảng cách giữa hai xe giảm đi ${v1} + ${v2} = ${v1 + v2} km.`,
          `Thời gian gặp nhau = quãng đường : tổng vận tốc = ${s} : ${v1 + v2} = ${t} giờ.`,
          `Kiểm tra lại: xe máy đi ${v1} × ${t} = ${v1 * t} km, ô tô đi ${v2} × ${t} = ${v2 * t} km, cộng lại đúng bằng ${s} km ✓.`,
        ],
      };
    },
  },
  {
    id: 'g-l6-duoi-kip',
    name: 'Chuyển động cùng chiều đuổi kịp',
    topicId: 'l6-toan-chuyen-dong',
    strand: 'thuc-te',
    tracks: ['lop6'],
    level: 3,
    skill: 'Cùng chiều thì trừ vận tốc',
    build: (r) => {
      const v1 = r.pick([30, 35, 40]);
      const gap = r.pick([10, 15, 20]);
      const v2 = v1 + gap;
      const t = r.int(2, 5);
      const d = gap * t;
      const correct = `${t} giờ`;
      return {
        prompt: `Một xe máy đi với vận tốc ${v1} km/giờ. Khi xe máy đã đi được ${d} km thì một ô tô xuất phát từ cùng điểm, đi cùng chiều với vận tốc ${v2} km/giờ. Hỏi sau bao lâu ô tô đuổi kịp xe máy?`,
        correct,
        wrongs: wrongsOf(
          correct,
          [
            `${dec(d / (v1 + v2))} giờ`,
            `${dec(d / v2)} giờ`,
            `${dec(d / v1)} giờ`,
          ],
          (i) => `${t + i + 1} giờ`,
        ),
        steps: [
          'Vẽ sơ đồ: hai mũi tên cùng hướng, ô tô ở phía sau xe máy một đoạn.',
          `Khoảng cách ban đầu giữa hai xe là ${d} km.`,
          `Vì đi cùng chiều nên mỗi giờ ô tô rút ngắn được ${v2} − ${v1} = ${gap} km.`,
          `Thời gian đuổi kịp = khoảng cách : hiệu vận tốc = ${d} : ${gap} = ${t} giờ.`,
          'Phân biệt: gặp nhau thì cộng vận tốc, đuổi kịp thì trừ vận tốc. Sơ đồ mũi tên là cách nhớ chắc nhất.',
        ],
      };
    },
  },
  {
    id: 'g-l6-dong-nuoc',
    name: 'Chuyển động trên dòng nước',
    topicId: 'l6-toan-chuyen-dong',
    strand: 'thuc-te',
    tracks: ['lop6'],
    level: 3,
    skill: 'Tách vận tốc thực và vận tốc dòng nước',
    build: (r) => {
      const real = r.pick([18, 20, 22, 24, 26]);
      const flow = r.pick([2, 3, 4, 5]);
      const down = real + flow;
      const up = real - flow;
      const correct = `${flow} km/giờ`;
      return {
        prompt: `Một ca nô đi xuôi dòng với vận tốc ${down} km/giờ và đi ngược dòng với vận tốc ${up} km/giờ. Tính vận tốc của dòng nước.`,
        correct,
        wrongs: wrongsOf(
          correct,
          [`${real} km/giờ`, `${down - up} km/giờ`, `${dec((down + up) / 4)} km/giờ`],
          (i) => `${flow + i + 1} km/giờ`,
        ),
        steps: [
          'Vận tốc xuôi dòng = vận tốc thực + vận tốc dòng nước.',
          'Vận tốc ngược dòng = vận tốc thực − vận tốc dòng nước.',
          `Lấy hiệu hai vận tốc: ${down} − ${up} = ${down - up}, và hiệu này bằng 2 lần vận tốc dòng nước.`,
          `Vậy vận tốc dòng nước = ${down - up} : 2 = ${flow} km/giờ.`,
          `Nếu lấy tổng rồi chia đôi thì được vận tốc thực của ca nô: (${down} + ${up}) : 2 = ${real} km/giờ — hai kết quả này rất hay bị lẫn với nhau.`,
        ],
      };
    },
  },

  /* ============ TOÁN TÍNH NGƯỢC & SƠ ĐỒ ĐOẠN THẲNG ============ */
  {
    id: 'g-l6-tinh-nguoc',
    name: 'Tìm số ban đầu bằng cách tính ngược',
    topicId: 'l6-toan-tinh-nguoc',
    strand: 'dai-so',
    tracks: ['lop6'],
    level: 2,
    skill: 'Đi ngược từ kết quả, mỗi bước làm phép tính ngược lại',
    build: (r) => {
      const x = r.int(4, 15);
      const k = r.pick([2, 3, 4]);
      const n = r.pick([2, 3]);
      const y = k * x;
      const res = r.int(1, Math.max(1, Math.floor((y - 1) / n)));
      const m = y - n * res;
      const z = n * res;
      const correct = String(x);
      return {
        prompt: `Một số đem nhân với ${k}, rồi trừ đi ${m}, sau đó chia cho ${n} thì được kết quả ${res}. Tìm số đó.`,
        correct,
        wrongs: wrongsOf(
          correct,
          [String(y), String(z), String(res * n + m)],
          (i) => String(x + i + 1),
        ),
        steps: [
          'Đi ngược từ kết quả về đầu, mỗi bước làm phép tính ngược lại với phép tính trong đề.',
          `Đề chia cho ${n} được ${res}, nên trước khi chia số đó là ${res} × ${n} = ${z}.`,
          `Đề trừ đi ${m} được ${z}, nên trước khi trừ số đó là ${z} + ${m} = ${y}.`,
          `Đề nhân với ${k} được ${y}, nên số ban đầu là ${y} : ${k} = ${x}.`,
          `Thử lại theo chiều xuôi: ${x} × ${k} = ${y}; ${y} − ${m} = ${z}; ${z} : ${n} = ${res} ✓.`,
        ],
      };
    },
  },
  {
    id: 'g-l6-tong-ti',
    name: 'Bài toán tổng và tỉ số',
    topicId: 'l6-toan-tinh-nguoc',
    strand: 'dai-so',
    tracks: ['lop6'],
    level: 2,
    skill: 'Vẽ sơ đồ đoạn thẳng rồi đọc giá trị một phần',
    build: (r) => {
      const small = r.pick([2, 3, 4]);
      const big = r.pick([5, 7, 9].filter((x) => x !== small));
      const unit = r.pick([6, 8, 12, 15, 20]);
      const total = (small + big) * unit;
      const bigVal = big * unit;
      const smallVal = small * unit;
      const correct = `${bigVal} quyển`;
      return {
        prompt: `Hai lớp góp được tất cả ${total} quyển vở tặng bạn vùng lũ. Số vở của lớp 5A bằng ${small}/${big} số vở của lớp 5B. Hỏi lớp 5B góp bao nhiêu quyển vở?`,
        correct,
        wrongs: wrongsOf(
          correct,
          [`${smallVal} quyển`, `${unit} quyển`, `${total} quyển`],
          (i) => `${bigVal + (i + 1) * unit} quyển`,
        ),
        steps: [
          `Vẽ sơ đồ: lớp 5A là ${small} phần bằng nhau, lớp 5B là ${big} phần như thế.`,
          `Tổng số phần: ${small} + ${big} = ${small + big} phần.`,
          `Giá trị một phần: ${total} : ${small + big} = ${unit} quyển.`,
          `Lớp 5B có ${big} phần nên góp ${unit} × ${big} = ${bigVal} quyển.`,
          `Thử lại: lớp 5A góp ${smallVal} quyển, cộng lại được ${total} quyển ✓.`,
        ],
      };
    },
  },

  /* ============ HÌNH HỌC TIỂU HỌC ============ */
  {
    id: 'g-l6-dien-tich-ghep',
    name: 'Diện tích hình ghép',
    topicId: 'l6-hinh-hoc-tieu-hoc',
    strand: 'hinh-hoc',
    tracks: ['lop6'],
    level: 2,
    skill: 'Lấy hình lớn trừ đi phần bị cắt',
    build: (r) => {
      const a = r.pick([12, 15, 18, 20, 24]);
      const b = r.pick([8, 9, 10, 14]);
      const c = r.int(3, Math.min(a, b) - 2);
      const area = a * b - c * c;
      const correct = `${area} cm²`;
      return {
        prompt: `Một tấm bìa hình chữ nhật có chiều dài ${a} cm, chiều rộng ${b} cm. Người ta cắt bỏ ở một góc một hình vuông cạnh ${c} cm. Tính diện tích phần bìa còn lại.`,
        correct,
        wrongs: wrongsOf(
          correct,
          [`${a * b} cm²`, `${a * b - c} cm²`, `${a * b + c * c} cm²`],
          (i) => `${area + (i + 1) * 2} cm²`,
        ),
        steps: [
          'Vẽ hình và ghi mọi số đo đã biết lên hình trước khi tính.',
          `Diện tích tấm bìa ban đầu: ${a} × ${b} = ${a * b} cm².`,
          `Diện tích hình vuông bị cắt: ${c} × ${c} = ${c * c} cm².`,
          `Diện tích phần còn lại: ${a * b} − ${c * c} = ${area} cm².`,
          'Với hình ghép, luôn chọn cách ít bước hơn: hoặc chia nhỏ để cộng, hoặc lấy hình lớn trừ phần thừa.',
        ],
      };
    },
  },
  {
    id: 'g-l6-hinh-hop',
    name: 'Diện tích quét sơn bể không nắp',
    topicId: 'l6-hinh-hoc-tieu-hoc',
    strand: 'hinh-hoc',
    tracks: ['lop6'],
    level: 3,
    skill: 'Đếm đúng số mặt phải tính',
    build: (r) => {
      const a = r.pick([12, 15, 20, 25]);
      const b = r.pick([8, 10, 14]);
      const h = r.pick([5, 6, 8, 10]);
      const xq = 2 * (a + b) * h;
      const day = a * b;
      const total = xq + day;
      const correct = `${total} dm²`;
      return {
        prompt: `Một bể nước dạng hình hộp chữ nhật không nắp có chiều dài ${a} dm, chiều rộng ${b} dm và chiều cao ${h} dm. Người ta quét sơn toàn bộ mặt trong của bể. Tính diện tích cần quét sơn.`,
        correct,
        wrongs: wrongsOf(
          correct,
          [`${xq + 2 * day} dm²`, `${xq} dm²`, `${a * b * h} dm²`],
          (i) => `${total + (i + 1) * 10} dm²`,
        ),
        steps: [
          `Bể không nắp nên chỉ quét bốn mặt xung quanh và một mặt đáy — đây là chi tiết quyết định của đề.`,
          `Chu vi đáy: (${a} + ${b}) × 2 = ${2 * (a + b)} dm.`,
          `Diện tích xung quanh: ${2 * (a + b)} × ${h} = ${xq} dm².`,
          `Diện tích đáy: ${a} × ${b} = ${day} dm².`,
          `Diện tích cần quét sơn: ${xq} + ${day} = ${total} dm².`,
          `Nếu tính cả nắp sẽ ra ${xq + 2 * day} dm² — sai vì bể không có nắp.`,
        ],
      };
    },
  },

  /* ============ SUY LUẬN LOGIC ============ */
  {
    id: 'g-l6-bang-dung-sai',
    name: 'Suy luận bằng bảng đúng/sai',
    topicId: 'l6-suy-luan-logic',
    strand: 'to-hop',
    tracks: ['lop6'],
    level: 3,
    skill: 'Lập bảng và loại trừ có ghi chép',
    build: (r) => {
      const names = r.sample(NAMES, 4);
      const hobbies = r.sample(HOBBIES, 4);
      const perm = r.shuffle([0, 1, 2, 3]);
      const correct = hobbies[perm[0]];
      return {
        prompt:
          `Bốn bạn ${names.join(', ')} mỗi bạn thích đúng một môn khác nhau trong bốn môn: ${hobbies.join(', ')}. ` +
          `Biết rằng: ${names[1]} thích ${hobbies[perm[1]]}; ${names[2]} thích ${hobbies[perm[2]]}; ` +
          `${names[0]} không thích ${hobbies[perm[3]]}. Hỏi ${names[0]} thích môn nào?`,
        correct,
        wrongs: wrongsOf(
          correct,
          [hobbies[perm[3]], hobbies[perm[1]], hobbies[perm[2]]],
          (i) => `${hobbies[i % hobbies.length]} (không xác định được)`,
        ),
        steps: [
          'Kẻ bảng 4 hàng (bốn bạn) × 4 cột (bốn môn), đánh dấu bằng bút chì thay vì nhớ trong đầu.',
          `Dữ kiện chắc chắn nhất trước: ${names[1]} thích ${hobbies[perm[1]]} và ${names[2]} thích ${hobbies[perm[2]]} — đánh ✓ vào hai ô này rồi loại cả hàng và cả cột tương ứng.`,
          `Sau bước đó, ${names[0]} chỉ còn hai khả năng: ${hobbies[perm[0]]} hoặc ${hobbies[perm[3]]}.`,
          `Dữ kiện cuối nói ${names[0]} không thích ${hobbies[perm[3]]}, nên loại nốt khả năng này.`,
          `Vậy ${names[0]} thích ${correct}, và bạn còn lại là ${names[3]} thích ${hobbies[perm[3]]}.`,
          'Nguyên tắc bảng: mỗi hàng và mỗi cột chỉ có đúng một dấu ✓.',
        ],
      };
    },
  },
  {
    id: 'g-l6-can-dia',
    name: 'Bài toán cân đĩa tìm vật nhẹ hơn',
    topicId: 'l6-suy-luan-logic',
    strand: 'to-hop',
    tracks: ['lop6'],
    level: 4,
    skill: 'Chia thành ba nhóm thay vì hai',
    build: (r) => {
      const cases: { n: number; k: number }[] = [
        { n: 3, k: 1 },
        { n: 8, k: 2 },
        { n: 9, k: 2 },
        { n: 12, k: 3 },
        { n: 27, k: 3 },
      ];
      const { n, k } = r.pick(cases);
      const correct = `${k} lần`;
      return {
        prompt: `Có ${n} đồng xu giống hệt nhau, trong đó có đúng một đồng nhẹ hơn các đồng còn lại. Với một chiếc cân thăng bằng hai đĩa (không dùng quả cân), cần cân ít nhất bao nhiêu lần để chắc chắn tìm ra đồng xu nhẹ?`,
        correct,
        wrongs: wrongsOf(
          correct,
          [`${k + 1} lần`, `${k + 2} lần`, `${Math.max(1, n - 1)} lần`],
          (i) => `${k + i + 3} lần`,
        ),
        steps: [
          'Mỗi lần cân cho ba kết quả: đĩa trái nhẹ hơn, đĩa phải nhẹ hơn, hoặc hai đĩa bằng nhau. Vì vậy hãy chia thành ba nhóm, không phải hai.',
          'Chia số đồng xu thành ba nhóm gần bằng nhau, đặt hai nhóm lên hai đĩa.',
          'Nếu cân thăng bằng thì đồng nhẹ nằm ở nhóm thứ ba; nếu lệch thì nằm ở đĩa nhẹ hơn.',
          `Sau mỗi lần cân, số khả năng còn lại giảm khoảng ba lần. Với ${n} đồng xu, cần ${k} lần cân.`,
          'Ghi nhớ: một lần cân phân biệt được tối đa 3 trường hợp, hai lần là 9, ba lần là 27.',
        ],
      };
    },
  },

  /* ============ DÃY SỐ QUY LUẬT & ĐẾM HÌNH ============ */
  {
    id: 'g-l6-day-cach-deu',
    name: 'Số hạng thứ n của dãy cách đều',
    topicId: 'l6-day-so-quy-luat',
    strand: 'to-hop',
    tracks: ['lop6'],
    level: 2,
    skill: 'Nhớ trừ 1 trong công thức số hạng',
    build: (r) => {
      const a = r.pick([2, 3, 5, 7, 11]);
      const d = r.pick([3, 4, 5, 6, 7]);
      const n = r.int(12, 40);
      const val = a + (n - 1) * d;
      const correct = String(val);
      const sum = ((a + val) * n) / 2;
      return {
        prompt: `Cho dãy số ${a}; ${a + d}; ${a + 2 * d}; ${a + 3 * d}; … Hỏi số hạng thứ ${n} của dãy là số nào?`,
        correct,
        wrongs: wrongsOf(
          correct,
          [String(a + n * d), String(a + (n - 2) * d), String(n * d)],
          (i) => String(val + (i + 1) * d),
        ),
        steps: [
          `Tìm quy luật: mỗi số hơn số liền trước ${d} đơn vị, nên đây là dãy cách đều với khoảng cách ${d}.`,
          `Từ số hạng thứ nhất đến số hạng thứ ${n} phải cộng thêm ${d} tất cả ${n} − 1 = ${n - 1} lần.`,
          `Số hạng thứ ${n} = ${a} + ${n - 1} × ${d} = ${a} + ${(n - 1) * d} = ${val}.`,
          `Lỗi hay gặp nhất là quên trừ 1, tính thành ${a} + ${n} × ${d} = ${a + n * d}.`,
          `Nếu đề hỏi tổng ${n} số hạng đầu: (${a} + ${val}) × ${n} : 2 = ${sum}.`,
        ],
      };
    },
  },
  {
    id: 'g-l6-dem-hinh',
    name: 'Đếm số hình chữ nhật trong lưới ô vuông',
    topicId: 'l6-day-so-quy-luat',
    strand: 'to-hop',
    tracks: ['lop6'],
    level: 4,
    skill: 'Đếm theo cách chọn đường thẳng thay vì đếm tay',
    build: (r) => {
      const m = r.int(2, 4);
      const n = r.int(2, 5);
      const cm = ((m + 1) * m) / 2;
      const cn = ((n + 1) * n) / 2;
      const total = cm * cn;
      const correct = `${total} hình`;
      return {
        prompt: `Một hình chữ nhật lớn được chia thành lưới ${m} × ${n} ô vuông nhỏ bằng nhau. Hỏi trong hình có tất cả bao nhiêu hình chữ nhật (kể cả hình vuông và kể cả hình chữ nhật lớn)?`,
        correct,
        wrongs: wrongsOf(
          correct,
          [`${m * n} hình`, `${(m + 1) * (n + 1)} hình`, `${2 * m * n} hình`],
          (i) => `${total + (i + 1) * 3} hình`,
        ),
        steps: [
          `Lưới ${m} × ${n} ô được tạo bởi ${m + 1} đường kẻ ngang và ${n + 1} đường kẻ dọc.`,
          'Mỗi hình chữ nhật được xác định bởi đúng 2 đường ngang và 2 đường dọc, nên chỉ cần đếm số cách chọn.',
          `Số cách chọn 2 trong ${m + 1} đường ngang: ${m + 1} × ${m} : 2 = ${cm}.`,
          `Số cách chọn 2 trong ${n + 1} đường dọc: ${n + 1} × ${n} : 2 = ${cn}.`,
          `Tổng số hình chữ nhật: ${cm} × ${cn} = ${total} hình.`,
          `Đếm tay dễ sót các hình ghép từ nhiều ô; ${m * n} chỉ là số ô nhỏ, không phải đáp án.`,
        ],
      };
    },
  },

  /* ============ ĐỌC HIỂU DỮ LIỆU & TOÁN NHIỀU BƯỚC ============ */
  {
    id: 'g-l6-doc-bang',
    name: 'Đọc bảng số liệu rồi tính trung bình',
    topicId: 'l6-doc-hieu-du-lieu',
    strand: 'thuc-te',
    tracks: ['lop6'],
    level: 2,
    skill: 'Đọc câu hỏi trước, đọc bảng sau',
    build: (r) => {
      const base = r.int(20, 60);
      const d = [0, r.int(2, 10), r.int(4, 12), 0];
      const v1 = base;
      const v2 = base + d[1];
      const v3 = base + d[2];
      const sum4 = (base + 6) * 4;
      const v4 = sum4 - v1 - v2 - v3;
      const total = v1 + v2 + v3 + v4;
      const avg = total / 4;
      const correct = `${dec(avg)} vé`;
      return {
        prompt: `Bảng dưới đây ghi số vé xem phim bán được trong 4 ngày: Thứ Hai ${v1} vé, Thứ Ba ${v2} vé, Thứ Tư ${v3} vé, Thứ Năm ${v4} vé. Hỏi trung bình mỗi ngày rạp bán được bao nhiêu vé?`,
        correct,
        wrongs: wrongsOf(
          correct,
          [
            `${total} vé`,
            `${dec(total / 3)} vé`,
            `${Math.max(v1, v2, v3, v4) - Math.min(v1, v2, v3, v4)} vé`,
          ],
          (i) => `${dec(avg + i + 1)} vé`,
        ),
        steps: [
          'Đọc câu hỏi trước: đề hỏi trung bình mỗi ngày, nghĩa là cần tổng rồi chia cho số ngày.',
          `Tổng số vé 4 ngày: ${v1} + ${v2} + ${v3} + ${v4} = ${total} vé.`,
          `Số ngày là 4, nên trung bình mỗi ngày: ${total} : 4 = ${dec(avg)} vé.`,
          'Kiểm tra hợp lý: giá trị trung bình phải nằm giữa số nhỏ nhất và số lớn nhất của bảng.',
          'Lỗi hay gặp: chia cho 3 vì đếm sót một cột, hoặc trả lời luôn tổng số vé.',
        ],
      };
    },
  },
  {
    id: 'g-l6-nhieu-buoc',
    name: 'Toán có lời văn nhiều bước với phân số',
    topicId: 'l6-doc-hieu-du-lieu',
    strand: 'thuc-te',
    tracks: ['lop6'],
    level: 3,
    skill: 'Xác định phân số của số nào ở mỗi bước',
    build: (r) => {
      const total = r.pick([150, 180, 240, 300, 360]);
      const after1 = (total * 3) / 5;
      const after2 = (after1 * 2) / 3;
      const correct = `${dec(after2)} kg`;
      return {
        prompt: `Một cửa hàng có ${total} kg gạo. Ngày đầu bán được 2/5 số gạo, ngày thứ hai bán được 1/3 số gạo còn lại sau ngày đầu. Hỏi sau hai ngày cửa hàng còn lại bao nhiêu ki-lô-gam gạo?`,
        correct,
        wrongs: wrongsOf(
          correct,
          [
            `${dec(after1)} kg`,
            `${dec((total * 4) / 15)} kg`,
            `${dec(total / 3)} kg`,
          ],
          (i) => `${dec(after2 + (i + 1) * 5)} kg`,
        ),
        steps: [
          `Bước 1: ngày đầu bán 2/5 của ${total} kg, tức ${dec((total * 2) / 5)} kg.`,
          `Sau ngày đầu còn lại: ${total} − ${dec((total * 2) / 5)} = ${dec(after1)} kg.`,
          `Bước 2: đề nói 1/3 số gạo CÒN LẠI, nên lấy 1/3 của ${dec(after1)} kg, được ${dec(after1 / 3)} kg — không phải 1/3 của ${total} kg.`,
          `Sau hai ngày còn lại: ${dec(after1)} − ${dec(after1 / 3)} = ${dec(after2)} kg.`,
          `Nếu cộng thẳng 2/5 + 1/3 rồi trừ một lần sẽ ra ${dec((total * 4) / 15)} kg — sai, vì hai phân số này tính trên hai số khác nhau.`,
        ],
      };
    },
  },
];
