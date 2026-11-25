import type { ReactNode } from 'react';
import { Box, Concepts, Eyebrow, Kpi, Num, Source, Thread, Title, lin } from '../components/ui';
import { dec } from '../data';

const M = 'Geist Mono';
const d = (n: number) => ({ ['--d' as string]: n });

function Row({ cells, head, hi, w }: { cells: ReactNode[]; head?: boolean; hi?: boolean; w: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: w, gap: 18, padding: head ? '0 0 10px' : '13px 0', borderBottom: head ? '2px solid currentColor' : '1px solid var(--line)', background: hi ? 'rgba(242,96,47,.08)' : undefined, alignItems: 'baseline' }}>
      {cells.map((c, i) => <div key={i} className={head ? 'lbl' : ''} style={head ? { fontSize: 14, textTransform: 'uppercase', letterSpacing: '.08em' } : { fontSize: 20, lineHeight: 1.3 }}>{c}</div>)}
    </div>
  );
}

/* 7 · P2 por qué USA y dónde */
export function P2Seleccion() {
  const rows: [string, string, string, string][] = [
    ['Renta per cápita', '40.400', '28.100', '28.570'],
    ['Innovadores + Conservadores', '55%', '44%', '43%'],
    ['Penetración del sector', '61% – 64%', '65% – 82%', '69% – 85%'],
    ['Sin atender TP / PE / DH (miles)', '34,7 / 118,4 / 17,7', '26,8 / 127,4 / 7,3', '57,4 / 96,4 / 11,9'],
    ['Flete desde Japón', 'Categoría 3', 'Categoría 5', 'Categoría 1'],
    ['Competidores', '1 (Gama)', '2', '2 (Omega, Delta)'],
    ['Precio de referencia', '200 / 60 / 650', '215 / 60 / 630', '260 / 70 / 720'],
  ];
  const fab = [
    { n: 'HighTechnology · USA', v: 31.455, x: 'Produce donde vende: flete categoría 1. El tipo de planta que ya operamos.', ok: true },
    { n: 'HighTechnology · Japón', v: 32.833, x: 'Más cara y se llenaría con demanda japonesa; a USA, flete categoría 3.' },
    { n: 'Allin One · México', v: 16.538, x: 'Mitad de precio, pero tecnología 0, impuesto 16% y capacidad mayor a la demanda libre.' },
  ];
  const s = lin(0, 35, 0, 400);
  return (
    <>
      <Eyebrow num="02" rest="Período 2 · 2027 · La expansión" />
      <Source>Plan 1 §1.2 · Plan 2 §1.1–§1.3 (informes de mercado comprados en P1)</Source>
      <Title w={1560}>USA y Canadá: el mercado que mejor paga la diferenciación, <span className="sub">con la fábrica en destino.</span></Title>
      <Box x={120} y={340} w={1000} className="rv" d={1}>
        <div className="lbl" style={{ textTransform: 'uppercase', letterSpacing: '.12em' }}>Selección del mercado</div>
        <div style={{ position: 'relative', marginTop: 16 }}>
          <div className="abs" style={{ left: 290, top: -8, width: 246, bottom: 0, background: 'rgba(47,91,255,.09)', borderTop: '3px solid var(--omega)' }} />
          <div style={{ position: 'relative' }}>
            <Row head w="280px 230px 220px 1fr" cells={['Criterio', 'USA y Canadá', 'UE Occidental', 'Japón (actual)']} />
            {rows.map((r) => <Row key={r[0]} w="280px 230px 220px 1fr" cells={[r[0], <b key="u">{r[1]}</b>, r[2], r[3]].map((c, i) => i ? <span key={i} className="mono" style={{ fontSize: 17 }}>{c}</span> : c)} />)}
          </div>
        </div>
      </Box>
      <Box x={1200} y={340} w={600} className="rv" d={3}>
        <div className="lbl" style={{ textTransform: 'uppercase', letterSpacing: '.12em' }}>Dónde construir · inversión</div>
        {fab.map((f, i) => (
          <div key={f.n} style={{ marginTop: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{ fontSize: 22, fontWeight: 600 }}>{f.n}</div>
              {f.ok && <span className="chip dec">Elegida</span>}
            </div>
            <svg width="600" height="34" style={{ marginTop: 8 }}>
              <rect className="growx" style={d(4 + i)} x="0" y="6" width={s(f.v)} height="22" fill={f.ok ? '#F2602F' : '#B9B3A6'} />
              <text x={s(f.v) + 12} y="23" fontFamily={M} fontSize="17" fill="#0E1424">${dec(f.v, 2)}M</text>
            </svg>
            <div style={{ fontSize: 18, lineHeight: 1.34, color: '#3D3C38' }}>{f.x}</div>
          </div>
        ))}
      </Box>
      <Concepts items={['Segmentación', 'Análisis de demanda', 'Costos logísticos', 'Inversión']} />
      <Thread now={2} />
    </>
  );
}

/* 8 · P2 mapa de la expansión */
export function P2Mapa() {
  return (
    <>
      <Eyebrow num="02" rest="Período 2 · La expansión en marcha" />
      <Title w={1150}>Fábrica y mercado en el <span className="hl">mismo período</span>: la planta de USA produjo desde el primer día.</Title>
      <svg width="1920" height="1080" className="abs" style={{ inset: 0 }} aria-hidden>
        <path d="M 330 700 C 700 470, 1100 470, 1440 700" fill="none" stroke="#0E1424" strokeOpacity=".2" strokeWidth="2" strokeDasharray="4 8" />
        <path className="draw" pathLength={1} style={d(3)} d="M 1440 700 C 1100 560, 700 560, 330 700" fill="none" stroke="#2F5BFF" strokeWidth="3" />
        <text x="885" y="585" textAnchor="middle" fontFamily={M} fontSize="19" fill="#2F5BFF">USA → Japón · ≈10.000 TP + 41.000 PE</text>
        <text x="885" y="515" textAnchor="middle" fontFamily={M} fontSize="17" fill="#77746C">Japón → USA: flete cat. 3 · producir en destino: cat. 1</text>
        <g transform="translate(330 700)">
          <rect x="-70" y="-26" width="52" height="52" fill="#0E1424" /><rect x="-10" y="-26" width="52" height="52" fill="#0E1424" />
        </g>
        <g transform="translate(1440 700)"><g className="rv" style={d(4)}>
          <rect x="-26" y="-26" width="52" height="52" fill="#F2602F" />
        </g></g>
      </svg>
      <Box x={260} y={750} w={560} className="rv" d={2}>
        <div style={{ fontSize: 30, fontWeight: 600 }}>Japón y Corea</div>
        <div className="lbl" style={{ marginTop: 4 }}>2 plantas HighTechnology</div>
        <div className="big" style={{ fontSize: 66, marginTop: 22 }}><Num v={364432} fmt={(x) => Math.round(x).toLocaleString('es-AR')} /></div>
        <div className="lbl" style={{ marginTop: 8 }}>unidades · +20,3% · 48,9% del mercado</div>
      </Box>
      <Box x={1414} y={750} w={420} className="rv" d={5}>
        <div style={{ fontSize: 30, fontWeight: 600 }}>USA y Canadá</div>
        <div className="lbl" style={{ marginTop: 4 }}>planta nueva · $31.455.000</div>
        <div className="big dec" style={{ fontSize: 66, marginTop: 22 }}><Num v={85769} fmt={(x) => Math.round(x).toLocaleString('es-AR')} delay={700} /></div>
        <div className="lbl" style={{ marginTop: 8 }}>unidades en el primer año<br />18,5% de los ingresos</div>
      </Box>
      <Box x={1380} y={118} w={420} className="rv" d={1} style={{ borderLeft: '2px solid #0E1424', paddingLeft: 30 }}>
        <div className="lbl">Fuente: Informe 2 §3b, §3c, §3f</div>
        <div className="lbl" style={{ marginTop: 22 }}>Resultado después de impuestos</div>
        <div className="big" style={{ fontSize: 80, marginTop: 6 }}>+99,5%</div>
        <div className="lbl" style={{ marginTop: 18 }}>Unidades · ocupación</div>
        <div className="big" style={{ fontSize: 46, marginTop: 6 }}>+48,6% · 96,9%</div>
        <div className="lbl" style={{ marginTop: 18 }}>Endeudamiento</div>
        <div className="big" style={{ fontSize: 46, marginTop: 6 }}>0,22 <span className="risk">→ 0,61</span></div>
      </Box>
      <Thread now={2} />
    </>
  );
}

/* 9 · P2 el costo */
export function P2Costo() {
  const par: [string, number][] = [['Resultados Económicos', 99], ['Participación de Mercado', 27], ['Valor de Marca', 19], ['Tecnología Industrial', 10], ['Endeudamiento y Solvencia', -30], ['Innovación de Producto', -61]];
  const x = lin(-70, 110, 0, 480);
  const z = x(0);
  return (
    <>
      <Eyebrow num="02" rest="Período 2 · El costo de crecer" />
      <Source>Informes 1 y 2 §3a, §3f · Plan 2 §8</Source>
      <Title w={1600}>El resultado se duplicó, pero el valor subió solo 2,19%. <span className="sub">Dos parámetros explican la diferencia.</span></Title>
      <Box x={120} y={350} w={860} className="rv" d={1}>
        <div className="lbl" style={{ textTransform: 'uppercase', letterSpacing: '.12em' }}>Cambio de puntos por parámetro del valor, 2026 → 2027</div>
        <svg width="860" height="430" style={{ marginTop: 24 }}>
          <line x1={300 + z} x2={300 + z} y1="0" y2="400" stroke="#F3F0E8" strokeOpacity=".3" />
          {par.map(([n, v], i) => {
            const y0 = i * 66 + 10;
            const neg = v < 0;
            return (
              <g key={n}>
                <text x="0" y={y0 + 24} fontSize="20" fill="#F3F0E8">{n}</text>
                <rect className="growx" style={{ ...d(2 + i), transformOrigin: neg ? 'right' : 'left' }} x={300 + Math.min(z, x(v))} y={y0} width={Math.abs(x(v) - z)} height="34" fill={neg ? '#D9363E' : '#5B82FF'} />
                <text x={neg ? 300 + x(v) - 10 : 300 + x(v) + 10} y={y0 + 24} fontSize="19" fontFamily={M} fill="#F3F0E8" textAnchor={neg ? 'end' : 'start'}>{v > 0 ? '+' : '−'}{Math.abs(v)}</text>
              </g>
            );
          })}
        </svg>
      </Box>
      <Box x={1100} y={350} w={700} className="rv" d={3}>
        <div className="lbl" style={{ textTransform: 'uppercase', letterSpacing: '.12em' }}>Cómo se pagó la fábrica ($31,46M)</div>
        <svg width="700" height="70" style={{ marginTop: 20 }}>
          <rect x="0" y="0" width={700 * (20 / 31.455)} height="44" fill="#D9363E" />
          <rect x={700 * (20 / 31.455) + 3} y="0" width={700 * (11.455 / 31.455) - 3} height="44" fill="#5B82FF" />
          <text x="14" y="29" fontSize="18" fontFamily={M} fill="#fff">Préstamo LP $20M · 64%</text>
          <text x={700 * (20 / 31.455) + 16} y="29" fontSize="18" fontFamily={M} fill="#fff">Propios ≈$11,5M*</text>
        </svg>
        <div style={{ fontSize: 20, color: '#B9BECB', lineHeight: 1.4 }}>Préstamo al 6,3% a 12 años · dividendos 80% → 50% · <span className="risk">endeudamiento 0,61, el más alto del sector</span></div>
        <div className="lbl" style={{ fontSize: 14, marginTop: 6 }}>* derivado: inversión − préstamo</div>
        <div style={{ marginTop: 40, borderTop: '1px solid rgba(243,240,232,.16)', paddingTop: 20 }}>
          <div className="lbl" style={{ textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--decision)' }}>Lo que aprendimos</div>
          <div style={{ fontSize: 22, lineHeight: 1.4, marginTop: 14 }}><b>Innovación premia la mejora, no el nivel.</b> <span style={{ color: '#B9BECB' }}>Sostener 7 / 5 / 5 costó 61 puntos.</span></div>
          <div style={{ fontSize: 22, lineHeight: 1.4, marginTop: 16 }}><b>El préstamo fue más grande de lo necesario.</b> <span style={{ color: '#B9BECB' }}>Cerramos con $12,1M de caja (estimábamos ≈$5,5M): con $13M a $14M alcanzaba.</span></div>
        </div>
      </Box>
      <Concepts items={['Financiamiento', 'Riesgo financiero', 'Apalancamiento', 'Indicadores']} />
      <Thread now={2} />
    </>
  );
}

