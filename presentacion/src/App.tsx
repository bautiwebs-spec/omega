import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { SLIDES, MAIN_COUNT } from './slides';
import { SlideCtx } from './components/ui';

const params = new URLSearchParams(location.search);
const PRINT = params.has('print');
const STILL = params.has('still') || PRINT;

const fromHash = () => {
  const m = location.hash.match(/^#\/?(\d+)/);
  const i = m ? parseInt(m[1], 10) - 1 : 0;
  return Math.min(Math.max(i, 0), SLIDES.length - 1);
};

function SlideView({ i, active, still }: { i: number; active: boolean; still: boolean }) {
  const s = SLIDES[i];
  return (
    <SlideCtx.Provider value={{ active, still }}>
      <section
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

function Deck() {
  const [idx, setIdx] = useState(fromHash);
  const [grid, setGrid] = useState(false);
  const [scale, setScale] = useState(1);
  const lastMain = useRef(0);
  const [hint, setHint] = useState(true);

  const go = useCallback((n: number) => {
    const k = Math.min(Math.max(n, 0), SLIDES.length - 1);
    setIdx(k);
    history.replaceState(null, '', `#/${k + 1}`);
  }, []);

  useLayoutEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080));
    fit(); window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  useEffect(() => { const t = setTimeout(() => setHint(false), 5000); return () => clearTimeout(t); }, []);
  useEffect(() => { const h = () => setIdx(fromHash()); window.addEventListener('hashchange', h); return () => window.removeEventListener('hashchange', h); }, []);
  useEffect(() => { if (!SLIDES[idx].annex) lastMain.current = idx; document.title = `${idx + 1} · ${SLIDES[idx].name} · OMEGA`; }, [idx]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;
      if (grid) {
        if (k === 'Escape' || k === 'g' || k === 'G') { e.preventDefault(); setGrid(false); }
        return;
      }
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter'].includes(k)) { e.preventDefault(); go(idx + 1); }
      else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(k)) { e.preventDefault(); go(idx - 1); }
      else if (k === 'Home') go(0);
      else if (k === 'End') go(MAIN_COUNT - 1);
      else if (k === 'f' || k === 'F') {
        if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen?.();
      } else if (k === 'g' || k === 'G') setGrid(true);
      else if (k === 'a' || k === 'A') go(SLIDES[idx].annex ? lastMain.current : MAIN_COUNT);
      else if (k === 'Escape' && SLIDES[idx].annex) go(lastMain.current);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [idx, grid, go]);

  const s = SLIDES[idx];
  const progress = s.annex ? 100 : ((idx + 1) / MAIN_COUNT) * 100;
  return (
    <>
      <div className="stage" onClick={(e) => { if (e.button === 0) go(idx + (e.clientX < window.innerWidth * 0.25 ? -1 : 1)); }}>
        <div className="canvas" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
          <SlideView key={idx} i={idx} active still={STILL} />
        </div>
      </div>
      <div className="progress" style={{ width: `${progress}%`, background: s.annex ? '#8C93A6' : undefined }} />
      <div className="counter" aria-live="polite">{s.annex ? `ANEXO · ${s.name}` : `${String(idx + 1).padStart(2, '0')} / ${MAIN_COUNT}`}</div>
      <div className="help" style={{ opacity: hint ? 1 : 0 }}>← → navegar · F pantalla completa · G grilla · A anexo</div>
      {grid && <Grid idx={idx} onPick={(i) => { go(i); setGrid(false); }} />}
    </>
  );
}

function Grid({ idx, onPick }: { idx: number; onPick: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(300);
  useLayoutEffect(() => {
    const el = ref.current?.querySelector('.thumb');
    if (el) setW(el.clientWidth);
    (ref.current?.querySelectorAll('button')[idx] as HTMLButtonElement | undefined)?.focus();
  }, [idx]);
  let lastAct = '';
  return (
    <div className="grid" ref={ref} role="dialog" aria-label="Todas las diapositivas">
      {SLIDES.map((s, i) => {
        const head = s.act !== lastAct ? (lastAct = s.act) : null;
        return (
          <div key={s.id} style={{ display: 'contents' }}>
            {head && <div className="sect">{head}</div>}
            <button onClick={() => onPick(i)}>
              <div className="thumb"><div style={{ transform: `scale(${w / 1920})` }}><SlideView i={i} active={false} still /></div></div>
              <div className="cap">{s.annex ? '' : String(i + 1).padStart(2, '0') + ' · '}{s.name}</div>
            </button>
          </div>
        );
      })}
    </div>
  );
}
