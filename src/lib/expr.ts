/**
 * A small, safe expression evaluator for the built-in graphing calculator.
 *
 * Deliberately hand-written rather than delegating to `eval` or `Function`:
 * the calculator evaluates strings the learner types, and a parser that only
 * knows about numbers and a fixed function table cannot be turned into an
 * arbitrary-code sink.
 *
 * Grammar (precedence climbing):
 *   expr    := term (('+' | '-') term)*
 *   term    := unary (('*' | '/' | '%' | implicit) unary)*
 *   unary   := ('-' | '+')* power
 *   power   := atom ('^' unary)?        -- right associative
 *   atom    := number | ident | ident '(' args ')' | '(' expr ')' | '|' expr '|'
 */

export type Token =
  | { kind: 'number'; value: number }
  | { kind: 'ident'; value: string }
  | { kind: 'op'; value: string }
  | { kind: 'lparen' }
  | { kind: 'rparen' }
  | { kind: 'comma' }
  | { kind: 'bar' };

export class ExprError extends Error {}

const FUNCTIONS: Record<string, { arity: number | 'variadic'; fn: (...args: number[]) => number }> = {
  sin: { arity: 1, fn: Math.sin },
  cos: { arity: 1, fn: Math.cos },
  tan: { arity: 1, fn: Math.tan },
  asin: { arity: 1, fn: Math.asin },
  acos: { arity: 1, fn: Math.acos },
  atan: { arity: 1, fn: Math.atan },
  sinh: { arity: 1, fn: Math.sinh },
  cosh: { arity: 1, fn: Math.cosh },
  tanh: { arity: 1, fn: Math.tanh },
  ln: { arity: 1, fn: Math.log },
  log: { arity: 1, fn: Math.log10 },
  log2: { arity: 1, fn: Math.log2 },
  sqrt: { arity: 1, fn: Math.sqrt },
  cbrt: { arity: 1, fn: Math.cbrt },
  abs: { arity: 1, fn: Math.abs },
  exp: { arity: 1, fn: Math.exp },
  floor: { arity: 1, fn: Math.floor },
  ceil: { arity: 1, fn: Math.ceil },
  round: { arity: 1, fn: Math.round },
  sign: { arity: 1, fn: Math.sign },
  min: { arity: 'variadic', fn: (...a) => Math.min(...a) },
  max: { arity: 'variadic', fn: (...a) => Math.max(...a) },
  nthroot: { arity: 2, fn: (x, n) => (x < 0 && n % 2 === 1 ? -Math.pow(-x, 1 / n) : Math.pow(x, 1 / n)) },
  hypot: { arity: 'variadic', fn: (...a) => Math.hypot(...a) },
};

const CONSTANTS: Record<string, number> = {
  pi: Math.PI,
  e: Math.E,
  tau: Math.PI * 2,
};

export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const text = input.replace(/\s+/g, '');

  while (i < text.length) {
    const ch = text[i];

    if (/[0-9.]/.test(ch)) {
      let j = i;
      while (j < text.length && /[0-9.]/.test(text[j])) j += 1;
      const raw = text.slice(i, j);
      const value = Number(raw);
      if (!Number.isFinite(value)) throw new ExprError(`Invalid number: ${raw}`);
      tokens.push({ kind: 'number', value });
      i = j;
      continue;
    }

    if (/[a-zA-Z_]/.test(ch)) {
      let j = i;
      while (j < text.length && /[a-zA-Z_0-9]/.test(text[j])) j += 1;
      tokens.push({ kind: 'ident', value: text.slice(i, j) });
      i = j;
      continue;
    }

    if ('+-*/^%'.includes(ch)) {
      tokens.push({ kind: 'op', value: ch });
      i += 1;
      continue;
    }

    if (ch === '(' || ch === '[' || ch === '{') { tokens.push({ kind: 'lparen' }); i += 1; continue; }
    if (ch === ')' || ch === ']' || ch === '}') { tokens.push({ kind: 'rparen' }); i += 1; continue; }
    if (ch === ',') { tokens.push({ kind: 'comma' }); i += 1; continue; }
    if (ch === '|') { tokens.push({ kind: 'bar' }); i += 1; continue; }

    throw new ExprError(`Unexpected character: ${ch}`);
  }

  return tokens;
}

/** A parsed expression, reusable across many evaluations (one per plot pixel). */
export interface Compiled {
  evaluate(scope: Record<string, number>): number;
  /** Free variables referenced, e.g. ['x']. */
  variables: string[];
}

interface Node {
  eval(scope: Record<string, number>): number;
}

export function compile(input: string): Compiled {
  const tokens = tokenize(input);
  let pos = 0;
  let barDepth = 0;
  const variables = new Set<string>();

  const peek = (): Token | undefined => tokens[pos];
  const next = (): Token => {
    const token = tokens[pos];
    if (!token) throw new ExprError('Unexpected end of expression');
    pos += 1;
    return token;
  };
  const isOp = (value: string): boolean => {
    const token = peek();
    return token?.kind === 'op' && token.value === value;
  };

  function parseExpr(): Node {
    let left = parseTerm();
    for (;;) {
      if (isOp('+')) {
        next();
        const right = parseTerm();
        const l = left;
        left = { eval: (s) => l.eval(s) + right.eval(s) };
      } else if (isOp('-')) {
        next();
        const right = parseTerm();
        const l = left;
        left = { eval: (s) => l.eval(s) - right.eval(s) };
      } else break;
    }
    return left;
  }

  /**
   * Whether the next token can begin an atom, which is how implicit
   * multiplication (`2x`, `3(x+1)`) is detected. A `|` only starts an atom
   * when no absolute-value group is open — otherwise `|x-7|` would read the
   * closing bar as the start of a second factor.
   */
  function startsAtom(): boolean {
    const token = peek();
    if (!token) return false;
    if (token.kind === 'bar') return barDepth === 0;
    return token.kind === 'number' || token.kind === 'ident' || token.kind === 'lparen';
  }

  function parseTerm(): Node {
    let left = parseUnary();
    for (;;) {
      if (isOp('*')) {
        next();
        const right = parseUnary();
        const l = left;
        left = { eval: (s) => l.eval(s) * right.eval(s) };
      } else if (isOp('/')) {
        next();
        const right = parseUnary();
        const l = left;
        left = { eval: (s) => l.eval(s) / right.eval(s) };
      } else if (isOp('%')) {
        next();
        const right = parseUnary();
        const l = left;
        left = { eval: (s) => l.eval(s) % right.eval(s) };
      } else if (startsAtom()) {
        // Implicit multiplication: 2x, 3(x+1), 2sin(x).
        const right = parseUnary();
        const l = left;
        left = { eval: (s) => l.eval(s) * right.eval(s) };
      } else break;
    }
    return left;
  }

  function parseUnary(): Node {
    if (isOp('-')) {
      next();
      const operand = parseUnary();
      return { eval: (s) => -operand.eval(s) };
    }
    if (isOp('+')) {
      next();
      return parseUnary();
    }
    return parsePower();
  }

  function parsePower(): Node {
    const base = parseAtom();
    if (isOp('^')) {
      next();
      const exponent = parseUnary(); // right associative
      return { eval: (s) => Math.pow(base.eval(s), exponent.eval(s)) };
    }
    return base;
  }

  function parseAtom(): Node {
    const token = next();

    if (token.kind === 'number') {
      const value = token.value;
      return { eval: () => value };
    }

    if (token.kind === 'lparen') {
      const inner = parseExpr();
      const closing = next();
      if (closing.kind !== 'rparen') throw new ExprError('Expected closing parenthesis');
      return inner;
    }

    if (token.kind === 'bar') {
      barDepth += 1;
      const inner = parseExpr();
      barDepth -= 1;
      const closing = next();
      if (closing.kind !== 'bar') throw new ExprError('Expected closing |');
      return { eval: (s) => Math.abs(inner.eval(s)) };
    }

    if (token.kind === 'ident') {
      const name = token.value.toLowerCase();

      if (peek()?.kind === 'lparen') {
        next(); // consume '('
        const args: Node[] = [];
        if (peek()?.kind !== 'rparen') {
          args.push(parseExpr());
          while (peek()?.kind === 'comma') {
            next();
            args.push(parseExpr());
          }
        }
        const closing = next();
        if (closing.kind !== 'rparen') throw new ExprError('Expected closing parenthesis');

        const spec = FUNCTIONS[name];
        if (!spec) throw new ExprError(`Unknown function: ${name}`);
        if (spec.arity !== 'variadic' && spec.arity !== args.length) {
          throw new ExprError(`${name} expects ${spec.arity} argument(s)`);
        }
        return { eval: (s) => spec.fn(...args.map((a) => a.eval(s))) };
      }

      if (name in CONSTANTS) {
        const value = CONSTANTS[name];
        return { eval: () => value };
      }

      variables.add(name);
      return {
        eval: (s) => {
          const value = s[name];
          if (value === undefined) throw new ExprError(`Unknown variable: ${name}`);
          return value;
        },
      };
    }

    throw new ExprError('Unexpected token');
  }

  const root = parseExpr();
  if (pos < tokens.length) throw new ExprError('Unexpected trailing input');

  return {
    evaluate: (scope) => root.eval(scope),
    variables: [...variables],
  };
}

/**
 * Convenience for one-off evaluation. Returns null instead of throwing so
 * callers rendering a live input field can simply show nothing while the
 * learner is mid-keystroke.
 */
export function evaluate(input: string, scope: Record<string, number> = {}): number | null {
  try {
    const value = compile(input).evaluate(scope);
    return Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}

/**
 * Splits `y = 2x + 1` or `f(x) = ...` into the right-hand side, so the plotter
 * accepts the forms a student naturally types.
 */
export function stripAssignment(input: string): string {
  const match = /^\s*(?:y|f\s*\(\s*[a-z]\s*\))\s*=\s*(.+)$/i.exec(input);
  return match ? match[1] : input;
}
