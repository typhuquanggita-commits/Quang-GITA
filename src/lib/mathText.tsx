import React from 'react';

/* =====================================================================
   MATHGITA — TRÌNH KẾT XUẤT CÔNG THỨC TOÁN
   Cú pháp rút gọn dùng thống nhất cho toàn bộ học liệu GITA.
   Đặt công thức giữa hai dấu $ ... $
     \f{a}{b}   phân số            \s{x}     căn bậc hai
     \cb{x}     căn bậc ba         ^{...}    số mũ / lũy thừa
     _{...}     chỉ số dưới        \ov{AB}   gạch ngang trên (số/đoạn thẳng)
     \vec{AB}   vectơ              \abs{x}   giá trị tuyệt đối
   Ký hiệu: \pm \mp \ne \le \ge \approx \sim \cong \to \Rightarrow \Leftrightarrow
            \in \notin \subset \cap \cup \emptyset \infty \times \div \cdot \deg
            \angle \tri \para \perp \dots \sqrtsign \pi \alpha \beta \gamma \delta \Delta \omega
   ===================================================================== */

const SYMBOLS: Record<string, string> = {
  pm: '±', mp: '∓', ne: '≠', le: '≤', ge: '≥', approx: '≈', sim: '∼', cong: '≅',
  to: '→', Rightarrow: '⇒', Leftrightarrow: '⇔', mapsto: '↦',
  in: '∈', notin: '∉', subset: '⊂', subseteq: '⊆', supset: '⊃',
  cap: '∩', cup: '∪', emptyset: '∅', infty: '∞', forall: '∀', exists: '∃',
  times: '×', div: ':', cdot: '·', deg: '°', percent: '%',
  angle: '∠', tri: '△', para: '∥', perp: '⊥', dots: '…', vdots: '⋮',
  pi: 'π', alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', Delta: 'Δ',
  omega: 'ω', theta: 'θ', lambda: 'λ', mu: 'μ', sigma: 'σ', Sigma: 'Σ',
  N: 'ℕ', Z: 'ℤ', Q: 'ℚ', R: 'ℝ', Nstar: 'ℕ*',
  sqrtsign: '√', prime: '′', circ: '∘', ldots: '...', quad: ' ',
};

interface Cursor { i: number }

function readGroup(src: string, c: Cursor): string {
  // Bỏ qua khoảng trắng rồi đọc { ... } cân bằng, hoặc 1 ký tự.
  while (c.i < src.length && src[c.i] === ' ') c.i++;
  if (src[c.i] !== '{') { const ch = src[c.i] ?? ''; c.i++; return ch; }
  c.i++;
  let depth = 1, out = '';
  while (c.i < src.length && depth > 0) {
    const ch = src[c.i];
    if (ch === '{') depth++;
    else if (ch === '}') { depth--; if (depth === 0) { c.i++; break; } }
    out += ch;
    c.i++;
  }
  return out;
}

function parse(src: string, keyPrefix: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const c: Cursor = { i: 0 };
  let buf = '';
  let n = 0;
  const flush = () => { if (buf) { out.push(<React.Fragment key={`${keyPrefix}t${n++}`}>{buf}</React.Fragment>); buf = ''; } };

  while (c.i < src.length) {
    const ch = src[c.i];

    if (ch === '\\') {
      c.i++;
      let cmd = '';
      while (c.i < src.length && /[A-Za-z]/.test(src[c.i])) { cmd += src[c.i]; c.i++; }
      if (cmd === '') {
        // Ký tự được thoát: \{  \}  \$  \%  \_  \&  \#  hoặc \; \, \! (khoảng trắng mảnh)
        const ch2 = src[c.i] ?? '';
        c.i++;
        buf += ';,!'.includes(ch2) ? '\u2009' : ch2;
        continue;
      }
      if (cmd === 'left' || cmd === 'right' || cmd === 'displaystyle') continue;
      flush();
      const k = `${keyPrefix}c${n++}`;
      if (cmd === 'f') {
        const a = readGroup(src, c), b = readGroup(src, c);
        out.push(
          <span className="frac" key={k}>
            <span className="num">{parse(a, k + 'a')}</span>
            <span className="den">{parse(b, k + 'b')}</span>
          </span>
        );
      } else if (cmd === 's' || cmd === 'cb') {
        const a = readGroup(src, c);
        out.push(
          <span className="rad" key={k}>
            <span className="sign">{cmd === 'cb' ? <><span className="sup">3</span>√</> : '√'}</span>
            <span className="body">{parse(a, k + 'r')}</span>
          </span>
        );
      } else if (cmd === 'ov') {
        const a = readGroup(src, c);
        out.push(<span key={k} style={{ textDecoration: 'overline' }}>{parse(a, k + 'o')}</span>);
      } else if (cmd === 'vec') {
        const a = readGroup(src, c);
        out.push(<span key={k} style={{ textDecoration: 'overline' }}>{parse(a, k + 'v')}</span>);
      } else if (cmd === 'abs') {
        const a = readGroup(src, c);
        out.push(<span key={k}>|{parse(a, k + 'x')}|</span>);
      } else if (cmd === 'sys') {
        // Hệ phương trình: \sys{dòng 1\\dòng 2\\...}
        const rows = readGroup(src, c).split('\\\\');
        out.push(
          <span className="sys" key={k}>
            <span className="sys-brace">{'{'}</span>
            <span className="sys-rows">
              {rows.map((row, ri) => <span key={`${k}s${ri}`}>{parse(row, `${k}s${ri}_`)}</span>)}
            </span>
          </span>
        );
      } else if (cmd === 'underbrace') {
        const a = readGroup(src, c);
        out.push(<span key={k} style={{ borderBottom: '1.5px solid currentColor' }}>{parse(a, k + 'u')}</span>);
      } else if (cmd === 'text') {
        const a = readGroup(src, c);
        out.push(<span key={k} style={{ fontFamily: 'var(--font-sans)' }}>{a}</span>);
      } else if (SYMBOLS[cmd]) {
        out.push(<React.Fragment key={k}>{SYMBOLS[cmd]}</React.Fragment>);
      } else {
        out.push(<React.Fragment key={k}>{cmd}</React.Fragment>);
      }
      continue;
    }

    if (ch === '^' || ch === '_') {
      c.i++;
      const a = readGroup(src, c);
      flush();
      out.push(
        <span className={ch === '^' ? 'sup' : 'sub'} key={`${keyPrefix}p${n++}`}>{parse(a, `${keyPrefix}p${n}`)}</span>
      );
      continue;
    }

    buf += ch;
    c.i++;
  }
  flush();
  return out;
}

/** Kết xuất một chuỗi có lẫn văn bản và công thức $...$ */
const LOOKS_LIKE_MATH = /\\[a-zA-Z]|[\^_]\{/;

export function renderMath(text: string, keyPrefix = 'm'): React.ReactNode[] {
  const src = String(text ?? '');
  // Chuỗi không có dấu $ nhưng chứa lệnh toán (ví dụ phương án trắc nghiệm
  // sinh tự động) thì coi toàn bộ là công thức.
  if (!src.includes('$') && LOOKS_LIKE_MATH.test(src)) {
    return [<span className="mq" key={`${keyPrefix}auto`}>{parse(src, `${keyPrefix}a_`)}</span>];
  }
  const parts = src.split('$');
  return parts.map((p, i) =>
    i % 2 === 1
      ? <span className="mq" key={`${keyPrefix}${i}`}>{parse(p, `${keyPrefix}${i}_`)}</span>
      : <React.Fragment key={`${keyPrefix}${i}`}>{renderInlineMarkup(p, `${keyPrefix}${i}_`)}</React.Fragment>
  );
}

/** Hỗ trợ **đậm** và *nghiêng* trong phần văn bản. */
function renderInlineMarkup(text: string, key: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0, m: RegExpExecArray | null, n = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(<React.Fragment key={`${key}${n++}`}>{text.slice(last, m.index)}</React.Fragment>);
    if (m[1]) out.push(<strong key={`${key}${n++}`}>{m[1]}</strong>);
    else out.push(<em key={`${key}${n++}`}>{m[2]}</em>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(<React.Fragment key={`${key}${n++}`}>{text.slice(last)}</React.Fragment>);
  return out;
}

/** Component tiện dụng: <M>Tính $\f{1}{2}+\f{1}{3}$</M> */
export const M: React.FC<{ children: string; block?: boolean; className?: string }> = ({ children, block, className }) => {
  const nodes = renderMath(children);
  return block ? <div className={className}>{nodes}</div> : <span className={className}>{nodes}</span>;
};

/** Chuyển công thức về dạng văn bản thuần (dùng khi so khớp đáp án, in ấn). */
export function plainMath(text: string): string {
  return String(text ?? '')
    .replace(/\\f\{([^{}]*)\}\{([^{}]*)\}/g, '$1/$2')
    .replace(/\\s\{([^{}]*)\}/g, '√($1)')
    .replace(/\\cb\{([^{}]*)\}/g, '∛($1)')
    .replace(/\\sys\{(.*?)\}/g, (_, g: string) => `{${g.split('\\\\').join('; ')}}`)
    .replace(/\\(ov|vec|text|abs|underbrace)\{([^{}]*)\}/g, '$2')
    .replace(/\\(left|right|displaystyle)/g, '')
    .replace(/\\([A-Za-z]+)/g, (_, c: string) => SYMBOLS[c] ?? c)
    .replace(/[\^_]\{([^{}]*)\}/g, '$1')
    .replace(/\$/g, '');
}
