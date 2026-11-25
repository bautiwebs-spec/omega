import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { SLIDES, MAIN_COUNT, type Curtain } from './slides';
import { SlideCtx } from './components/ui';

// Todo acceso a APIs del navegador va protegido: la presentación puede abrirse dentro de
// visores aislados (iframes con sandbox, vistas previas de apps) donde fallan.
const safe = <T,>(fn: () => T, fallback: T): T => { try { return fn(); } catch { return fallback; } };

const params = safe(() => new URLSearchParams(location.search), new URLSearchParams());
const PRINT = params.has('print');
const STILL = params.has('still') || PRINT;

const fromHash = () => {
  const h = safe(() => location.hash, '');
  const m = h.match(/^#\/?(\d+)/);
  const i = m ? parseInt(m[1], 10) - 1 : 0;
  return Math.min(Math.max(i, 0), SLIDES.length - 1);
};
const writeHash = (k: number) => safe(() => { history.replaceState(null, '', `#/${k + 1}`); return true; }, false);

const fsElement = () => safe(() => document.fullscreenElement ?? (document as any).webkitFullscreenElement ?? null, null);
const canFullscreen = () => safe(() => !!(document.documentElement.requestFullscreen || (document.documentElement as any).webkitRequestFullscreen) && document.fullscreenEnabled !== false, false);
function toggleFullscreen() {
  safe(() => {
    const el = document.documentElement as any;
    if (fsElement()) (document.exitFullscreen ?? (document as any).webkitExitFullscreen)?.call(document)?.catch?.(() => {});
    else (el.requestFullscreen ?? el.webkitRequestFullscreen)?.call(el)?.catch?.(() => {});
    return null;
  }, null);
}

const reducedMotion = () => safe(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, false);

function SlideView({ i, active, still, base = 0 }: { i: number; active: boolean; still: boolean; base?: number }) {
  const s = SLIDES[i];
  return (
    <SlideCtx.Provider value={{ active, still, base }}>
      <section style={base ? ({ ['--base' as string]: `${base}ms` }) : undefined}
        className={`slide ${s.theme} ${active ? 'active' : ''} ${still ? 'static' : 'slide-in'} ${s.chapter ? 'chapter' : ''}`}
        aria-roledescription="diapositiva" aria-label={`${i + 1}. ${s.name}`}
      >
        <s.C />
      </section>
    </SlideCtx.Provider>
  );
}

export function App() {
  if (PRINT) {
    document.body.classList.add('print');
    return <div>{SLIDES.map((_, i) => <SlideView key={i} i={i} active still />)}</div>;
  }
  return <Deck />;
}

const NEXT_KEYS = ['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Spacebar', 'Enter', 'Right', 'Down'];
const PREV_KEYS = ['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace', 'Left', 'Up'];
const NEXT_CODES = [39, 40, 34, 32, 13];
const PREV_CODES = [37, 38, 33, 8];

function Deck() {
  const [idx, setIdx] = useState(fromHash);
  const [grid, setGrid] = useState(false);
  const [scale, setScale] = useState(1);
  const [chrome, setChrome] = useState(true);
  const lastMain = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<number>();
  const touch = useRef<{ x: number; y: number; t: number } | null>(null);
  const swiped = useRef(false);
  const cur = useRef(idx);
  const [curtain, setCurtain] = useState<{ key: number; c: Curtain } | null>(null);

  const go = useCallback((n: number) => {
    const k = Math.min(Math.max(n, 0), SLIDES.length - 1);
    if (k === cur.current) return;
    // Al entrar a un capítulo nuevo (avanzando), una cortina de su color marca el cambio.
    const c = SLIDES[k].curtain;
    setCurtain(c && k > cur.current && !STILL && !reducedMotion() ? { key: Date.now(), c } : null);
    cur.current = k;
    setIdx(k);
    writeHash(k);
  }, []);

  // Muestra los controles en pantalla y los oculta tras unos segundos sin actividad.
  const poke = useCallback(() => {
    setChrome(true);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setChrome(false), 3500);
  }, []);

  useLayoutEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080));
    fit();
    window.addEventListener('resize', fit);
    window.addEventListener('orientationchange', fit);
    return () => { window.removeEventListener('resize', fit); window.removeEventListener('orientationchange', fit); };
  }, []);

  useEffect(() => {
    poke();
    const h = () => { const k = fromHash(); cur.current = k; setIdx(k); };
    window.addEventListener('hashchange', h);
    return () => { window.removeEventListener('hashchange', h); window.clearTimeout(hideTimer.current); };
  }, [poke]);

  useEffect(() => {
    if (!SLIDES[idx].annex) lastMain.current = idx;
    safe(() => { document.title = `${idx + 1} · ${SLIDES[idx].name} · OMEGA`; return null; }, null);
  }, [idx]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key; const c = e.keyCode;
      if (grid) {
        if (k === 'Escape' || k === 'Esc' || k === 'g' || k === 'G') { e.preventDefault(); setGrid(false); }
        return;
      }
      if (NEXT_KEYS.includes(k) || (!k && NEXT_CODES.includes(c))) { e.preventDefault(); go(idx + 1); }
      else if (PREV_KEYS.includes(k) || (!k && PREV_CODES.includes(c))) { e.preventDefault(); go(idx - 1); }
      else if (k === 'Home') { e.preventDefault(); go(0); }
      else if (k === 'End') { e.preventDefault(); go(MAIN_COUNT - 1); }
      else if (k === 'f' || k === 'F') toggleFullscreen();
      else if (k === 'g' || k === 'G') setGrid(true);
      else if (k === 'a' || k === 'A') go(SLIDES[idx].annex ? lastMain.current : MAIN_COUNT);
      else if ((k === 'Escape' || k === 'Esc') && SLIDES[idx].annex) go(lastMain.current);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [idx, grid, go]);

  // Gestos táctiles: deslizar a la izquierda = siguiente, a la derecha = anterior.
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) { touch.current = null; return; }
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY, t: Date.now() };
    swiped.current = false;
    poke();
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const s = touch.current; touch.current = null;
    if (!s) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - s.x; const dy = t.clientY - s.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3 && Date.now() - s.t < 900) {
      swiped.current = true;
      go(idx + (dx < 0 ? 1 : -1));
    }
  };
  const onStageClick = (e: React.MouseEvent) => {
    safe(() => { rootRef.current?.focus({ preventScroll: true }); return null; }, null);
    poke();
    if (swiped.current) { swiped.current = false; return; }
    if (e.button !== 0) return;
    go(idx + (e.clientX < window.innerWidth * 0.3 ? -1 : 1));
  };

  const s = SLIDES[idx];
  const progress = s.annex ? 100 : ((idx + 1) / MAIN_COUNT) * 100;
  const stop = (fn: () => void) => (e: React.MouseEvent) => { e.stopPropagation(); poke(); fn(); };
  return (
    <div ref={rootRef} tabIndex={-1} className="deck" onMouseMove={poke} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="stage" onClick={onStageClick}>
        <div className="canvas" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
          <SlideView key={idx} i={idx} active still={STILL} base={curtain ? 700 : 0} />
        </div>
      </div>
      {curtain && (
        <div key={curtain.key} className="curtain" style={{ background: curtain.c.bg, color: curtain.c.fg }} onAnimationEnd={(e) => { if (e.target === e.currentTarget) setCurtain(null); }} aria-hidden>
          <div className="curtain-in">
            <div className="curtain-num" style={{ color: curtain.c.accent }}>{curtain.c.num}</div>
            <div className="curtain-title">{curtain.c.title}</div>
          </div>
        </div>
      )}
      <div className="progress" style={{ width: `${progress}%`, background: s.annex ? '#8C93A6' : undefined }} />
      <nav className={'controls' + (chrome ? ' on' : '')} aria-label="Navegación">
        <button type="button" onClick={stop(() => go(idx - 1))} disabled={idx === 0} aria-label="Diapositiva anterior">‹</button>
        <span className="pos" aria-live="polite">{s.annex ? `Anexo · ${s.name.split(' · ')[0]}` : `${String(idx + 1).padStart(2, '0')} / ${MAIN_COUNT}`}</span>
        <button type="button" onClick={stop(() => go(idx + 1))} disabled={idx === SLIDES.length - 1} aria-label="Diapositiva siguiente">›</button>
        <span className="sep" />
        <button type="button" className="txt" onClick={stop(() => setGrid(true))} aria-label="Ver todas las diapositivas">Índice</button>
        <button type="button" className="txt" onClick={stop(() => go(s.annex ? lastMain.current : MAIN_COUNT))}>{s.annex ? 'Volver' : 'Anexo'}</button>
        {canFullscreen() && <button type="button" className="txt" onClick={stop(toggleFullscreen)} aria-label="Pantalla completa">⤢</button>}
      </nav>
      <div className="counter">{s.annex ? `ANEXO · ${s.name}` : `${String(idx + 1).padStart(2, '0')} / ${MAIN_COUNT}`}</div>
      {grid && <Grid idx={idx} onPick={(i) => { go(i); setGrid(false); }} onClose={() => setGrid(false)} />}
    </div>
  );
}

function Grid({ idx, onPick, onClose }: { idx: number; onPick: (i: number) => void; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(300);
  useLayoutEffect(() => {
    const el = ref.current?.querySelector('.thumb');
    if (el) setW(el.clientWidth);
    (ref.current?.querySelectorAll('.grid-item')[idx] as HTMLButtonElement | undefined)?.focus({ preventScroll: false });
  }, [idx]);
  let lastAct = '';
  return (
    <div className="grid" ref={ref} role="dialog" aria-label="Todas las diapositivas">
      <button type="button" className="grid-close" onClick={onClose} aria-label="Cerrar índice">Cerrar ✕</button>
      {SLIDES.map((s, i) => {
        const head = s.act !== lastAct ? (lastAct = s.act) : null;
        return (
          <div key={s.id} style={{ display: 'contents' }}>
            {head && <div className="sect">{head}</div>}
            <button type="button" className="grid-item" onClick={() => onPick(i)}>
              <div className="thumb"><div style={{ transform: `scale(${w / 1920})` }}><SlideView i={i} active={false} still /></div></div>
              <div className="cap">{s.annex ? '' : String(i + 1).padStart(2, '0') + ' · '}{s.name}</div>
            </button>
          </div>
        );
      })}
    </div>
  );
}
