/**
 * Built-in graphing calculator.
 *
 * The Digital SAT supplies a graphing calculator throughout the Math section,
 * so a practice platform that omits one trains the wrong workflow. This is a
 * working plotter: expressions are parsed by the project's own parser (never
 * `eval`), plotted over a pan-and-zoom viewport, and evaluated numerically
 * when they contain no free variable.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { compile, stripAssignment, type Compiled } from '../../lib/expr.ts';
import { Button } from '../../components/ui/primitives.tsx';
import { IconX, IconRefresh } from '../../components/ui/icons.tsx';
import { seriesColor } from '../../components/charts/charts.tsx';

interface ExprRow {
  id: string;
  raw: string;
}

interface Viewport {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

const DEFAULT_VIEW: Viewport = { xMin: -10, xMax: 10, yMin: -10, yMax: 10 };
const PLOT_W = 380;
const PLOT_H = 300;

const KEYPAD = ['7', '8', '9', '/', '(', '4', '5', '6', '*', ')', '1', '2', '3', '-', '^', '0', '.', 'x', '+', 'π'];

export function Calculator({ onClose }: { onClose(): void }): React.ReactElement {
  const [rows, setRows] = useState<ExprRow[]>([{ id: 'e1', raw: '' }]);
  const [view, setView] = useState<Viewport>(DEFAULT_VIEW);
  const [position, setPosition] = useState({ x: 24, y: 92 });
  const dragRef = useRef<{ dx: number; dy: number } | null>(null);
  const panRef = useRef<{ x: number; y: number; view: Viewport } | null>(null);
  const focusedInput = useRef<HTMLInputElement | null>(null);

  /* ---- panel dragging ---- */
  useEffect(() => {
    function onMove(event: MouseEvent) {
      if (!dragRef.current) return;
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 240, event.clientX - dragRef.current.dx)),
        y: Math.max(0, Math.min(window.innerHeight - 80, event.clientY - dragRef.current.dy)),
      });
    }
    function onUp() {
      dragRef.current = null;
      panRef.current = null;
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  const compiled = useMemo(
    () =>
      rows.map((row) => {
        const source = stripAssignment(row.raw).trim();
        if (!source) return { row, fn: null as Compiled | null, error: null as string | null, value: null as number | null };
        try {
          const fn = compile(source);
          const free = fn.variables.filter((v) => v !== 'x');
          if (free.length > 0) {
            return { row, fn: null, error: `Unknown variable: ${free[0]}`, value: null };
          }
          if (fn.variables.length === 0) {
            const value = fn.evaluate({});
            return { row, fn: null, error: null, value: Number.isFinite(value) ? value : null };
          }
          return { row, fn, error: null, value: null };
        } catch (error) {
          return { row, fn: null, error: (error as Error).message, value: null };
        }
      }),
    [rows],
  );

  const sx = useCallback(
    (x: number) => ((x - view.xMin) / (view.xMax - view.xMin)) * PLOT_W,
    [view],
  );
  const sy = useCallback(
    (y: number) => PLOT_H - ((y - view.yMin) / (view.yMax - view.yMin)) * PLOT_H,
    [view],
  );

  /**
   * Samples one point per pixel and breaks the path wherever the function is
   * undefined or jumps a vertical asymptote, so `1/x` and `tan(x)` render as
   * separate branches rather than as spurious near-vertical lines.
   */
  const paths = useMemo(() => {
    return compiled.map((entry) => {
      if (!entry.fn) return { id: entry.row.id, segments: [] as string[] };
      const segments: string[] = [];
      let current: string[] = [];
      let previousY: number | null = null;
      const step = (view.xMax - view.xMin) / PLOT_W;

      for (let px = 0; px <= PLOT_W; px += 1) {
        const x = view.xMin + px * step;
        let y: number;
        try {
          y = entry.fn.evaluate({ x });
        } catch {
          y = NaN;
        }

        const inRange = Number.isFinite(y);
        const jumped =
          previousY !== null &&
          inRange &&
          Math.abs(y - previousY) > (view.yMax - view.yMin) * 1.5;

        if (!inRange || jumped) {
          if (current.length > 1) segments.push(current.join(' '));
          current = [];
          previousY = inRange ? y : null;
          if (!inRange) continue;
        }

        const py = sy(y);
        // Clamp far off-screen values so the path stays a manageable size.
        const clamped = Math.max(-PLOT_H, Math.min(PLOT_H * 2, py));
        current.push(`${current.length === 0 ? 'M' : 'L'}${px},${clamped.toFixed(1)}`);
        previousY = y;
      }
      if (current.length > 1) segments.push(current.join(' '));
      return { id: entry.row.id, segments };
    });
  }, [compiled, view, sy]);

  const gridStep = useMemo(() => {
    const span = view.xMax - view.xMin;
    const magnitude = Math.pow(10, Math.floor(Math.log10(span / 8)));
    const normalised = span / 8 / magnitude;
    return (normalised >= 5 ? 5 : normalised >= 2 ? 2 : 1) * magnitude;
  }, [view]);

  const zoom = useCallback((factor: number) => {
    setView((v) => {
      const cx = (v.xMin + v.xMax) / 2;
      const cy = (v.yMin + v.yMax) / 2;
      const hw = ((v.xMax - v.xMin) / 2) * factor;
      const hh = ((v.yMax - v.yMin) / 2) * factor;
      return { xMin: cx - hw, xMax: cx + hw, yMin: cy - hh, yMax: cy + hh };
    });
  }, []);

  const insert = useCallback((token: string) => {
    const input = focusedInput.current;
    const text = token === 'π' ? 'pi' : token;
    if (!input) {
      setRows((current) => current.map((r, i) => (i === 0 ? { ...r, raw: r.raw + text } : r)));
      return;
    }
    const id = input.dataset.rowId;
    setRows((current) => current.map((r) => (r.id === id ? { ...r, raw: r.raw + text } : r)));
    input.focus();
  }, []);

  return (
    <div
      className="tool-panel"
      style={{ left: position.x, top: position.y }}
      role="dialog"
      aria-label="Graphing calculator"
    >
      <div
        className="tool-head"
        onMouseDown={(event) => {
          const rect = (event.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
          dragRef.current = { dx: event.clientX - rect.left, dy: event.clientY - rect.top };
        }}
      >
        <span>Máy tính đồ thị</span>
        <div className="row gap-1">
          <Button variant="ghost" size="sm" iconOnly aria-label="Reset view" onClick={() => setView(DEFAULT_VIEW)}>
            <IconRefresh size={15} />
          </Button>
          <Button variant="ghost" size="sm" iconOnly aria-label="Close calculator" onClick={onClose}>
            <IconX size={15} />
          </Button>
        </div>
      </div>

      <div className="tool-body stack gap-3">
        <div className="calc-exprs">
          {rows.map((row, index) => {
            const entry = compiled[index];
            return (
              <div key={row.id} className="stack gap-1">
                <div className="calc-expr">
                  <span className="calc-swatch" style={{ background: seriesColor(index) }} />
                  <input
                    className="input calc-input"
                    data-row-id={row.id}
                    placeholder={index === 0 ? 'y = 2x + 1' : 'expression'}
                    value={row.raw}
                    aria-label={`Expression ${index + 1}`}
                    onFocus={(event) => {
                      focusedInput.current = event.currentTarget;
                    }}
                    onChange={(event) => {
                      const raw = event.target.value;
                      setRows((current) => {
                        const next = current.map((r) => (r.id === row.id ? { ...r, raw } : r));
                        // Keep exactly one trailing blank row available.
                        if (index === current.length - 1 && raw.trim() !== '' && current.length < 6) {
                          next.push({ id: `e${Date.now()}`, raw: '' });
                        }
                        return next;
                      });
                    }}
                  />
                  {rows.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      iconOnly
                      aria-label={`Remove expression ${index + 1}`}
                      onClick={() => setRows((current) => current.filter((r) => r.id !== row.id))}
                    >
                      <IconX size={14} />
                    </Button>
                  )}
                </div>
                {entry?.error && <span className="calc-error">{entry.error}</span>}
                {entry?.value !== null && entry?.value !== undefined && (
                  <span className="calc-value">= {formatNumber(entry.value)}</span>
                )}
              </div>
            );
          })}
        </div>

        <svg
          className="calc-plot"
          width="100%"
          viewBox={`0 0 ${PLOT_W} ${PLOT_H}`}
          role="img"
          aria-label={`Graph from x = ${view.xMin.toFixed(1)} to ${view.xMax.toFixed(1)}`}
          onMouseDown={(event) => {
            panRef.current = { x: event.clientX, y: event.clientY, view };
          }}
          onMouseMove={(event) => {
            const pan = panRef.current;
            if (!pan) return;
            const dx = ((event.clientX - pan.x) / PLOT_W) * (pan.view.xMax - pan.view.xMin);
            const dy = ((event.clientY - pan.y) / PLOT_H) * (pan.view.yMax - pan.view.yMin);
            setView({
              xMin: pan.view.xMin - dx,
              xMax: pan.view.xMax - dx,
              yMin: pan.view.yMin + dy,
              yMax: pan.view.yMax + dy,
            });
          }}
          onMouseUp={() => {
            panRef.current = null;
          }}
          onMouseLeave={() => {
            panRef.current = null;
          }}
          onWheel={(event) => {
            event.preventDefault();
            zoom(event.deltaY > 0 ? 1.12 : 0.89);
          }}
        >
          {gridLines(view, gridStep, sx, sy)}
          <line className="axis" x1={0} x2={PLOT_W} y1={sy(0)} y2={sy(0)} />
          <line className="axis" x1={sx(0)} x2={sx(0)} y1={0} y2={PLOT_H} />
          {paths.map((path, index) =>
            path.segments.map((d, i) => (
              <path
                key={`${path.id}-${i}`}
                d={d}
                fill="none"
                stroke={seriesColor(index)}
                strokeWidth={2}
                strokeLinecap="round"
              />
            )),
          )}
        </svg>

        <div className="row gap-2">
          <Button size="sm" onClick={() => zoom(0.7)} aria-label="Zoom in">+</Button>
          <Button size="sm" onClick={() => zoom(1.4)} aria-label="Zoom out">−</Button>
          <span className="text-xs muted grow">Kéo để di chuyển · lăn chuột để phóng to</span>
        </div>

        <div className="calc-keys">
          {KEYPAD.map((key) => (
            <button key={key} type="button" className="calc-key" onClick={() => insert(key)}>
              {key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function gridLines(
  view: Viewport,
  step: number,
  sx: (x: number) => number,
  sy: (y: number) => number,
): React.ReactElement[] {
  const lines: React.ReactElement[] = [];
  const startX = Math.ceil(view.xMin / step) * step;
  for (let x = startX; x <= view.xMax; x += step) {
    lines.push(
      <line
        key={`x${x.toFixed(4)}`}
        className={Math.abs(x) < step / 100 ? 'grid-major' : 'grid-minor'}
        x1={sx(x)}
        x2={sx(x)}
        y1={0}
        y2={PLOT_H}
        strokeWidth={1}
      />,
    );
  }
  const startY = Math.ceil(view.yMin / step) * step;
  for (let y = startY; y <= view.yMax; y += step) {
    lines.push(
      <line
        key={`y${y.toFixed(4)}`}
        className={Math.abs(y) < step / 100 ? 'grid-major' : 'grid-minor'}
        x1={0}
        x2={PLOT_W}
        y1={sy(y)}
        y2={sy(y)}
        strokeWidth={1}
      />,
    );
  }
  return lines;
}

function formatNumber(value: number): string {
  if (Number.isInteger(value)) return String(value);
  const rounded = Number(value.toFixed(6));
  return Math.abs(rounded) < 1e-4 || Math.abs(rounded) > 1e9 ? rounded.toExponential(4) : String(rounded);
}
