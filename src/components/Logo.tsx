/**
 * Logo GITA dựng lại bằng SVG theo bản gốc:
 * — Vành ê-líp nghiêng (swoosh) hai cung: cung xanh và cung đỏ, gợi quỹ đạo và chuyển động đi lên.
 * — Chữ GITA đặt trong lòng ê-líp.
 * — Chùm sao xanh – đỏ ở góc trên phải, lấy cảm hứng từ tinh thần chuẩn quốc tế.
 */

export const GITA_BLUE = '#1B4F9C';
export const GITA_BLUE_LIGHT = '#2E6FBF';
export const GITA_RED = '#E01B24';

function Star({ x, y, r, fill, rot = 0 }: { x: number; y: number; r: number; fill: string; rot?: number }) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? r : r * 0.42;
    const a = (Math.PI / 5) * i - Math.PI / 2 + (rot * Math.PI) / 180;
    pts.push(`${(x + rad * Math.cos(a)).toFixed(2)},${(y + rad * Math.sin(a)).toFixed(2)}`);
  }
  return <polygon points={pts.join(' ')} fill={fill} />;
}

export interface LogoProps {
  /** Chiều cao logo tính bằng px. */
  size?: number;
  /** 'full' = ê-líp + chữ + sao; 'mark' = chỉ dấu hiệu (ê-líp + sao), dùng cho favicon, con dấu phiếu. */
  variant?: 'full' | 'mark';
  /** Bản một màu để in đen trắng hoặc đặt trên nền màu. */
  mono?: string;
  className?: string;
  title?: string;
}

export function GitaLogo({ size = 44, variant = 'full', mono, className, title = 'GITA' }: LogoProps) {
  const blue = mono ?? GITA_BLUE;
  const blueLight = mono ?? GITA_BLUE_LIGHT;
  const red = mono ?? GITA_RED;
  const vb = variant === 'full' ? '0 0 260 120' : '0 0 130 120';
  const w = variant === 'full' ? (size * 260) / 120 : (size * 130) / 120;

  return (
    <svg
      width={w}
      height={size}
      viewBox={vb}
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <g transform={variant === 'full' ? 'translate(0,0)' : 'translate(-38,0)'}>
        {/* Vành ê-líp nghiêng: cung xanh phía trên, cung đỏ phía dưới */}
        <g transform="rotate(-24 104 62)">
          <path
            d="M104 20 a72 34 0 0 1 0 84"
            fill="none"
            stroke={blueLight}
            strokeWidth="11"
            strokeLinecap="round"
          />
          <path
            d="M104 104 a72 34 0 0 1 0 -84"
            fill="none"
            stroke={red}
            strokeWidth="11"
            strokeLinecap="round"
          />
        </g>

        {/* Chùm sao */}
        <Star x={196} y={26} r={13} fill={blue} />
        <Star x={222} y={45} r={9} fill={red} />
        <Star x={172} y={14} r={7} fill={red} />
        <Star x={206} y={54} r={6} fill={blueLight} />

        {variant === 'full' && (
          <text
            x="46"
            y="82"
            fill={blue}
            fontFamily="'Be Vietnam Pro', ui-sans-serif, system-ui, sans-serif"
            fontSize="52"
            fontWeight="800"
            letterSpacing="1.5"
          >
            GITA
          </text>
        )}
        {variant === 'mark' && (
          <text
            x="82"
            y="80"
            fill={blue}
            textAnchor="middle"
            fontFamily="'Be Vietnam Pro', ui-sans-serif, system-ui, sans-serif"
            fontSize="46"
            fontWeight="800"
          >
            G
          </text>
        )}
      </g>
    </svg>
  );
}

/** Khoá logo dùng trong đầu trang phiếu: dấu hiệu GITA + tên sản phẩm MATH365. */
export function BrandLockup({ size = 34, subtitle = 'MATH365' }: { size?: number; subtitle?: string }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <GitaLogo size={size} variant="mark" />
      <span className="leading-tight">
        <span className="block text-[15px] font-extrabold tracking-tight text-brand-800">{subtitle}</span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          GITA365
        </span>
      </span>
    </span>
  );
}
