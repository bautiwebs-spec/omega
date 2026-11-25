import { createContext, useContext, useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { SHORT } from '../data';

export const SlideCtx = createContext<{ active: boolean; still: boolean }>({ active: true, still: true });

const reduced = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Número que cuenta hasta su valor una sola vez, cuando la diapositiva se activa. */
export function Num({ v, fmt, delay = 300 }: { v: number; fmt: (x: number) => string; delay?: number }) {
  const { active, still } = useContext(SlideCtx);
  const instant = still || reduced();
  const [x, setX] = useState(instant ? v : 0);
  useEffect(() => {
    if (instant) { setX(v); return; }
    if (!active) { setX(0); return; }
    let raf = 0; let t0 = 0;
    const dur = 1100;
    const tick = (t: number) => {
      if (!t0) t0 = t;
      const k = Math.min(1, Math.max(0, (t - t0 - delay) / dur));
      const e = 1 - Math.pow(1 - k, 3);
      setX(v * e);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, instant, v, delay]);
  return <span style={{ fontVariantNumeric: 'tabular-nums' }}>{fmt(x)}</span>;
}

export const Eyebrow = ({ num, acc, rest }: { num?: string; acc?: string; rest: string }) => (
  <div className="eyebrow">
    {num && <span className="num">{num} </span>}
    {acc && <span className="acc">{acc} </span>}
    <span className="rest">· {rest}</span>
  </div>
);

export const Source = ({ children }: { children: ReactNode }) => <div className="source">Fuente: {children}</div>;

export const Title = ({ children, w = 1280, top, size }: { children: ReactNode; w?: number; top?: number; size?: number }) => (
  <h2 className="title rv" style={{ width: w, top, fontSize: size }}>{children}</h2>
);

/** Hilo de la línea de tiempo: 2025 + cinco períodos. `now` = índice 1..5 */
export function Thread({ now }: { now: number }) {
  const pos = (i: number) => `${(i / 5) * 100}%`;
  return (
    <div className="thread" aria-hidden>
      <div className="rail" />
      <div className="fill" style={{ width: pos(now) }} />
      {SHORT.map((s, i) => (
        <div key={s}>
          <div className={'n ' + (i === now ? 'now' : i < now ? 'on' : '')} style={{ left: pos(i) }} />
          <div className={'t ' + (i === now ? 'now' : '')} style={{ left: pos(i) }}>{s}</div>
        </div>
      ))}
    </div>
  );
}

export const Box = ({ x, y, w, h, children, style, className = '', d }: { x: number; y: number; w?: number; h?: number; children: ReactNode; style?: CSSProperties; className?: string; d?: number }) => (
  <div className={'abs ' + className} style={{ left: x, top: y, width: w, height: h, ['--d' as string]: d, ...style }}>{children}</div>
);

export function Kpi({ label, value, note, size = 76, color, d }: { label: string; value: ReactNode; note?: ReactNode; size?: number; color?: string; d?: number }) {
  return (
    <div className="rv" style={{ ['--d' as string]: d }}>
      <div className="lbl">{label}</div>
      <div className="big" style={{ fontSize: size, color, marginTop: 10 }}>{value}</div>
      {note && <div className="lbl" style={{ marginTop: 10 }}>{note}</div>}
    </div>
  );
}

export const Concepts = ({ items, bottom }: { items: string[]; bottom?: number }) => (
  <div className="concepts" style={{ bottom }}>
    Conceptos · {items.map((c, i) => <b key={c}>{c}{i < items.length - 1 ? ' · ' : ''}</b>)}
  </div>
);

/** Escala lineal */
export const lin = (d0: number, d1: number, r0: number, r1: number) => (v: number) => r0 + ((v - d0) / (d1 - d0)) * (r1 - r0);
