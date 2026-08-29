/**
 * The GITA mark, and the SAT365 lockup built on it.
 *
 * Drawn as SVG rather than shipped as an image, for the reason the rest of this
 * codebase draws its figures: an SVG scales to a print header without
 * artefacts, carries a real accessible name, and can answer to the theme. A
 * raster logo on a dark background is a white rectangle, and a raster logo at
 * 300 dpi is a 40-kilobyte download for something that is four arcs and seven
 * stars.
 *
 * ## What this is, and what it is not
 *
 * This is a rebuild in vector form of the supplied mark, matched by eye: two
 * blue arcs, a red arc, a rising group of stars, and the wordmark. It is
 * faithful enough for the screen and for an office printer, and it is **not**
 * the original artwork. For anything that will be printed commercially, or
 * where the mark appears at large size, the original vector file should
 * replace `GitaMark` wholesale — the component boundary exists so that swap is
 * one file.
 *
 * The wordmark is set as text in a serif stack rather than traced into paths.
 * Traced glyphs look right until the day someone needs to change the word, and
 * text remains selectable, searchable, and readable by a screen reader.
 */

import React from 'react';
import { BRAND } from './tokens.ts';

export interface MarkProps {
  /** Rendered height in pixels. The mark keeps its aspect ratio. */
  height?: number;
  /**
   * Monochrome rendering for a single-colour context — a fax header, an
   * embossed cover, a document printed on a machine with no colour cartridge.
   * A brand that only survives in full colour is a brand with one context.
   */
  mono?: boolean;
  /** Accessible name. Pass an empty string only when a neighbouring text label already names it. */
  title?: string;
  className?: string;
}

export function GitaMark({
  height = 40,
  mono = false,
  title = 'GITA',
  className,
}: MarkProps): React.ReactElement {
  const blue = mono ? 'currentColor' : BRAND.blue.hex;
  const sky = mono ? 'currentColor' : BRAND.sky.hex;
  const red = mono ? 'currentColor' : BRAND.red.hex;

  return (
    <svg
      className={className}
      viewBox="0 0 470 250"
      height={height}
      width={(height * 470) / 250}
      role={title ? 'img' : 'presentation'}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {/*
        The orbit: three arcs sweeping from lower left to upper right, opening
        toward the stars. Drawn as strokes rather than filled crescents so the
        weights stay even at any size.
      */}
      <g fill="none" strokeLinecap="round" opacity={mono ? 0.55 : 1}>
        <path d="M18 128 C 40 44, 150 6, 268 18" stroke={sky} strokeWidth="19" />
        <path d="M26 150 C 58 232, 210 250, 330 214" stroke={blue} strokeWidth="21" />
        <path d="M74 120 C 104 56, 196 30, 300 44" stroke={red} strokeWidth="17" />
      </g>

      {/* The rising stars: seven, ascending, the smallest leading. */}
      <g fill={mono ? 'currentColor' : BRAND.blue.hex}>
        {[
          { x: 322, y: 62, r: 9 },
          { x: 352, y: 50, r: 10 },
          { x: 384, y: 41, r: 11 },
          { x: 416, y: 34, r: 12 },
          { x: 449, y: 29, r: 13 },
          { x: 372, y: 14, r: 9 },
          { x: 412, y: 8, r: 10 },
        ].map((star, i) => (
          <Star key={i} cx={star.x} cy={star.y} r={star.r} />
        ))}
      </g>

      {/*
        The wordmark. Set in text so it stays selectable and editable; the
        stack ends in a generic serif so it degrades predictably.
      */}
      <text
        x="168"
        y="176"
        fill={mono ? 'currentColor' : BRAND.blue.hex}
        fontFamily="'Bookman Old Style', 'Georgia', 'Times New Roman', serif"
        fontSize="96"
        fontWeight="700"
        letterSpacing="2"
      >
        GITA
      </text>
    </svg>
  );
}

/** A five-pointed star, computed rather than hand-plotted so the radius scales cleanly. */
function Star({ cx, cy, r }: { cx: number; cy: number; r: number }): React.ReactElement {
  const points: string[] = [];
  for (let i = 0; i < 10; i += 1) {
    const radius = i % 2 === 0 ? r : r * 0.4;
    // Start at the top point: −90° in radians, stepping by 36°.
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    points.push(`${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`);
  }
  return <polygon points={points.join(' ')} />;
}

/**
 * The document lockup: the mark, a rule, and the platform name.
 *
 * SAT365 is a programme *inside* GITA, and the lockup says so in its
 * arrangement — the mark leads, a hairline separates, and the programme name
 * follows in the interface typeface rather than the wordmark's serif. Setting
 * both in the same face would read as one brand with a long name; setting them
 * apart reads as a programme carrying an institution's mark, which is what it
 * is.
 */
export function SatLockup({
  height = 34,
  mono = false,
  tagline = true,
}: {
  height?: number;
  mono?: boolean;
  tagline?: boolean;
}): React.ReactElement {
  return (
    <span className="lockup" aria-label="GITA SAT365">
      <GitaMark height={height} mono={mono} title="" />
      <span className="lockup-rule" aria-hidden="true" />
      <span className="lockup-text">
        <span className="lockup-name">SAT365</span>
        {tagline && <span className="lockup-tagline">Lộ trình 1600 · GITA</span>}
      </span>
    </span>
  );
}
