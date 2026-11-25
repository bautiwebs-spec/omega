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

/* 5 · P1 decisión */
export function P1Decision() {
  const alts = [
    { tag: 'Descartada', cls: 'no', t: 'Entrar ya a un mercado nuevo', x: 'TecnoPersonal al 99% y Pequeño Electrodoméstico al 95,7%: repartiríamos la misma producción. Sin datos propios era "jugado".' },
    { tag: 'Postergada', cls: 'no', t: 'Construir una fábrica', x: 'Dónde vender define dónde producir. Compramos los informes de USA y UE ($70.000) para decidir en el P2.' },
    { tag: 'Elegida', cls: 'dec', t: 'Rentabilizar Japón', x: 'Ganar margen donde sobra demanda y llenar la capacidad ociosa de DomoHogar.' },
  ];
  const lev: [string, string, string][] = [
    ['Precio TecnoPersonal', '228 → 238', 'Demanda ≈ 2 veces la producción: se sube sin perder unidades'],
    ['Innovación PE / DH', '$430k / $350k → $600k / $850k', 'Superar el mínimo del manual para pasar de nivel 4 a 5'],
    ['Tecnología industrial', '$250k → $750k', 'Nivel 7 → 8 para bajar el costo unitario'],
    ['Promoción', '$3,72M → $4,60M', 'Reforzar las marcas más bajas: PE (52) y DH (55)'],
    ['Producción DomoHogar', '25.000 → 32.000 u.', 'Usar la planta que trabajaba al 66,7%'],
  ];
  return (
    <>
      <Eyebrow num="01" rest="Período 1 · 2026 · Optimizar antes de expandir" />
      <Source>Plan 1 §1–§9 · Informe 1 §2</Source>
      <Title w={1560}>Antes de salir, rentabilizar lo que teníamos: <span className="sub">no había producto libre para abastecer otro mercado.</span></Title>
      <Box x={120} y={340} w={560}>
        <div className="lbl rv" style={{ textTransform: 'uppercase', letterSpacing: '.12em' }}>Alternativas evaluadas</div>
        {alts.map((a, i) => (
          <div key={a.t} className="rv" style={{ ...d(1 + i), marginTop: 20, paddingTop: 16, borderTop: i === 2 ? '3px solid var(--decision)' : '1px solid var(--line)' }}>
            <span className={'chip ' + a.cls}>{a.tag}</span>
            <div style={{ fontSize: 25, fontWeight: 600, marginTop: 12 }}>{a.t}</div>
            <div style={{ fontSize: 19, lineHeight: 1.36, color: '#3D3C38', marginTop: 6 }}>{a.x}</div>
          </div>
        ))}
      </Box>
      <Box x={780} y={340} w={1020}>
        <div className="lbl rv" style={{ textTransform: 'uppercase', letterSpacing: '.12em' }}>Cinco palancas, sin construir nada</div>
        <div className="rv" style={{ ...d(2), marginTop: 18 }}>
          <Row head w="240px 350px 1fr" cells={['Palanca', 'Antes → después', 'Por qué']} />
          {lev.map((l) => <Row key={l[0]} w="240px 350px 1fr" cells={[<b key="a">{l[0]}</b>, <span key="b" className="mono" style={{ fontSize: 18 }}>{l[1]}</span>, <span key="c" style={{ color: '#3D3C38', fontSize: 19 }}>{l[2]}</span>]} />)}
        </div>
        <div className="rv lbl" style={{ ...d(4), marginTop: 18 }}><span className="dec">Plan ≠ ejecución:</span> el plan proponía bajar los dividendos a 50%; se mantuvieron en 80%.</div>
      </Box>
      <Concepts items={['Capacidad instalada', 'Precio según demanda', 'Costo unitario', 'Planificación estratégica']} />
      <Thread now={1} />
    </>
  );
}

/* 6 · P1 resultado */
export function P1Resultado() {
  const lines: [string, number, string][] = [['TecnoPersonal', 62, '≈38.000'], ['Pequeño Electrodoméstico', 74, '≈72.000'], ['DomoHogar', 86, '≈6.000']];
  const W = 640;
  return (
    <>
      <Eyebrow num="01" rest="Período 1 · Resultados" />
      <Source>Informe 1 §3a, §3b, §3c, §3g, §4e</Source>
      <Title w={1560}>+10,98% de valor sin construir nada, <span className="sub">y llegamos al techo de capacidad.</span></Title>
      <Box x={120} y={330} w={1680}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}>
          <Kpi d={1} label="Valor de la compañía" value={<Num v={3483} fmt={(x) => Math.round(x).toLocaleString('es-AR')} />} note="+10,98% · 2°, a 30 puntos de Beta" />
          <Kpi d={2} label="Resultado después de impuestos" value={<>+<Num v={38.5} fmt={(x) => dec(x, 1)} />%</>} note="$3,20M → $4,43M" />
          <Kpi d={3} label="Valor de marca" value="55 → 79" note="la más alta del sector" color="var(--omega)" />
          <Kpi d={4} size={56} label="Costo unitario (tecnología 7 → 8)" value="−5,0% a −6,3%" note="ahorro ≈ $1,6M por $0,5M invertidos" />
        </div>
      </Box>
      <Box x={120} y={600} w={900} className="rv" d={5}>
        <div className="lbl" style={{ textTransform: 'uppercase', letterSpacing: '.12em' }}>Demanda propia cubierta por línea, 2026</div>
        <svg width="900" height="200" style={{ marginTop: 18 }}>
          {lines.map(([n, v, u], i) => (
            <g key={n} transform={`translate(0 ${i * 62})`}>
              <text x="0" y="22" fontSize="19" fontFamily="Geist Sans" fill="#0E1424">{n}</text>
              <rect x="250" y="6" width={W * 0.6} height="22" fill="#D9D4C7" />
              <rect className="growx" style={d(6 + i)} x="250" y="6" width={(W * 0.6 * v) / 100} height="22" fill="#2F5BFF" />
              <text x={250 + (W * 0.6 * v) / 100 - 10} y="23" fontSize="16" fontFamily={M} fill="#fff" textAnchor="end">{v}%</text>
              <text x={250 + W * 0.6 + 16} y="23" fontSize="16" fontFamily={M} fill="#77746C">{u} u. sin atender</text>
            </g>
          ))}
        </svg>
        <div style={{ fontSize: 22, marginTop: 4 }}><b className="dec">≈116.000 unidades sin atender:</b> quedarse en Japón ya no alcanzaba para crecer.</div>
      </Box>
      <Box x={1140} y={600} w={660} className="rv" d={7}>
        <div className="lbl" style={{ textTransform: 'uppercase', letterSpacing: '.12em' }}>Proyectado vs. realizado</div>
        <div style={{ marginTop: 16 }}>
          <Row head w="190px 1fr 1fr" cells={['', 'Plan', 'Resultado']} />
          <Row w="190px 1fr 1fr" cells={['Resultado', 'similar a 2025', <b key="r">+38,5%</b>]} />
          <Row w="190px 1fr 1fr" cells={['DomoHogar', '32.000 u.', <b key="r">35.574 u. (+28,1%)</b>]} />
          <Row w="190px 1fr 1fr" cells={['Caja', 'ajustada', <b key="r">$2,6M → $10,1M</b>]} />
          <Row w="190px 1fr 1fr" cells={['Dividendos', '50%', <b key="r" className="dec">80% (sin cambio)</b>]} />
        </div>
      </Box>
      <Thread now={1} />
    </>
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

/* 10 · P3 */
export function P3() {
  const P2 = [6.9, 1.85, 0.85];
  const P3v = [6.4, 2.2, 1.0];
  const names = ['Promoción', 'Innovación', 'Tecnología'];
  const cols = ['#0E1424', '#2F5BFF', '#35D0E8'];
  const H = 440; const k = H / 9.6;
  const bar = (vals: number[], x: number, lab: string, dd: number) => {
    let y = 360 + H;
    return (
      <g>
        {vals.map((v, i) => { y -= v * k; return (
          <g key={i}>
            <rect className="grow" style={d(dd + i)} x={x} y={y} width="150" height={v * k - 3} fill={cols[i]} />
            <text x={x + 75} y={y + (v * k) / 2 + 7} fontSize="18" fontFamily={M} fill={i === 2 ? '#0E1424' : '#fff'} textAnchor="middle">{dec(v, v < 2 ? 2 : 1)}</text>
          </g>); })}
        <text x={x + 75} y={360 + H + 32} fontSize="17" fontFamily={M} fill="#77746C" textAnchor="middle">{lab}</text>
      </g>
    );
  };
  const k3 = [
    ['Innovación (parámetro)', '498 → 604', '+106 pts · PE y DH de 5 a 6'],
    ['Tecnología industrial', '9 → 10', 'el máximo de la escala'],
    ['Ventas en USA', '+36,2%', 'marca 26 → 41'],
    ['Costo DomoHogar USA', '$431 → $377', 'al cargar la planta 10k → 17k'],
    ['Endeudamiento', '0,61 → 0,52', 'sin préstamos · caja $23,7M'],
    ['Valor de la compañía', '3.769 · 1°', 'Beta penalizada (×0,95)'],
  ];
  return (
    <>
      <Eyebrow num="03" rest="Período 3 · 2028 · Consolidar y corregir" />
      <Source>Plan 3 §1–§8 · Informe 3 §2, §3</Source>
      <Title w={1600}>Mismo gasto, mejor repartido: <span className="sub">sacamos promoción donde la marca estaba saturada y la pusimos en innovación.</span></Title>
      <svg width="1920" height="1080" className="abs" style={{ inset: 0 }} aria-hidden>
        <text x="120" y="340" fontSize="17" fontFamily={M} fill="#77746C" letterSpacing="2">PRESUPUESTO ESTRATÉGICO · $M · TOTAL 9,6 EN AMBOS</text>
        {bar(P2, 150, 'P2 · 2027', 1)}
        {bar(P3v, 420, 'P3 · 2028', 4)}
        {names.map((nm, i) => (
          <g key={nm} transform={`translate(600 ${430 + i * 120})`}><g className="rv" style={d(6 + i)}>
            <rect width="16" height="16" fill={cols[i]} />
            <text x="28" y="15" fontSize="20" fill="#0E1424">{nm}</text>
            <text x="28" y="44" fontSize="18" fontFamily={M} fill={i ? '#2F5BFF' : '#D9363E'}>{['−0,50', '+0,35', '+0,15'][i]}M</text>
          </g></g>
        ))}
      </svg>
      <Box x={880} y={340} w={920}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 40, rowGap: 34 }}>
          {k3.map((r, i) => <Kpi key={r[0]} d={3 + i} label={r[0]} value={r[1]} note={r[2]} size={50} color={i === 5 ? 'var(--decision)' : undefined} />)}
        </div>
      </Box>
      <Box x={880} y={836} w={920} className="rv small" d={10} style={{ fontSize: 19, color: '#3D3C38' }}>
        La marca en Japón llegó a 100 en las tres líneas aun con $600.000 menos de promoción. <b>Pendiente:</b> precios sin cambios con la demanda 60% por encima de la capacidad (margen 48%, 4° del sector).
      </Box>
      <Thread now={3} />
    </>
  );
}

/* 11 · P4 decisión */
export function P4Decision() {
  const prod: [string, number, number, string][] = [['TecnoPersonal', 52.9, 120, '≈$11,2M'], ['Pequeño Electrodoméstico', 61.8, 43, '≈$13,5M'], ['DomoHogar', 43.8, 295, '≈$17,9M']];
  const sp = lin(0, 70, 0, 175); const su = lin(0, 300, 0, 185);
  const dec4: [string, string][] = [
    ['Precios Japón', 'TP 238 → 250 · DH 685 → 705 · PE 74 sin cambio'],
    ['Precios USA', '195 → 205 · 59 → 61 · 640 → 660'],
    ['Tecnología', '$1,0M → $0,4M: nivel 10, retorno marginal ≈ 0'],
    ['Promoción', 'Japón $4,0M → $3,3M · USA $2,4M → $3,0M'],
    ['Innovación', 'PE y DH de 6 a 7 ($2,2M → $2,55M)'],
    ['Producción', 'DomoHogar a capacidad completa: 63.000'],
    ['Dividendos', '50% → 30% para bajar el endeudamiento'],
  ];
  return (
    <>
      <Eyebrow num="04" rest="Período 4 · 2029 · Rentabilidad y eficiencia" />
      <Source>Plan 4 §1–§9 · sin Informe 4 (error de la simulación)</Source>
      <Title w={1560}>El producto con más margen porcentual <span className="sub">no es el que más dinero deja.</span></Title>
      <Box x={120} y={330} w={760} className="rv" d={1}>
        <div style={{ display: 'grid', gridTemplateColumns: '230px 260px 260px', columnGap: 0 }}>
          <div /><div className="lbl" style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '.08em' }}>Margen % (2028)</div><div className="lbl" style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '.08em' }}>Margen por unidad</div>
        </div>
        <svg width="760" height="330" style={{ marginTop: 12 }}>
          {prod.map(([n, p, u, tot], i) => (
            <g key={n} transform={`translate(0 ${i * 108})`}>
              <text x="0" y="28" fontSize="21" fontWeight="600" fill="#0E1424">{n.split(' ')[0]}</text>
              {n.includes(' ') && <text x="0" y="52" fontSize="21" fontWeight="600" fill="#0E1424">{n.split(' ').slice(1).join(' ')}</text>}
              <text x="0" y={n.includes(' ') ? 78 : 54} fontSize="15" fontFamily={M} fill="#77746C">margen bruto {tot}</text>
              <rect className="growx" style={d(2 + i)} x="230" y="8" width={sp(p)} height="30" fill={p > 60 ? '#0E1424' : '#B9B3A6'} />
              <text x={230 + sp(p) + 8} y="30" fontSize="17" fontFamily={M} fill="#0E1424">{dec(p, 1)}%</text>
              <rect className="growx" style={d(5 + i)} x="490" y="8" width={su(u)} height="30" fill={u > 200 ? '#F2602F' : '#B9B3A6'} />
              <text x={490 + su(u) + 8} y="30" fontSize="17" fontFamily={M} fill="#0E1424">≈${u}</text>
            </g>
          ))}
        </svg>
        <div style={{ fontSize: 19, lineHeight: 1.38, color: '#3D3C38' }}>Cada planta tiene capacidad separada por producto: producir menos Pequeño Electrodoméstico <b>no libera capacidad</b> para DomoHogar. Se decidió llenar las tres líneas y subir el precio.</div>
      </Box>
      <Box x={980} y={330} w={820} className="rv" d={3}>
        <div className="lbl" style={{ textTransform: 'uppercase', letterSpacing: '.12em' }}>Decisiones del período</div>
        <div style={{ marginTop: 12 }}>
          {dec4.map(([k, v]) => <Row key={k} w="190px 1fr" cells={[<b key="k">{k}</b>, <span key="v" style={{ fontSize: 19 }}>{v}</span>]} />)}
        </div>
        <div className="lbl" style={{ marginTop: 16 }}>Subas de 3% a 5%: todos los precios quedan iguales o debajo del competidor más caro.</div>
      </Box>
      <Concepts items={['Margen de contribución', 'Estrategia de precios', 'Retorno marginal', 'Eficiencia']} />
      <Thread now={4} />
    </>
  );
}

/* 12 · P4 resultado */
export function P4Resultado() {
  return (
    <>
      <Eyebrow num="04" rest="Período 4 · Resultados" />
      <Source>Plan 5 §0, §4 · Informe 5 §3 (columna 2029) · planilla D4</Source>
      <Title w={1560}>Ganamos margen sin perder ventas <span className="sub">y quedamos a 5 puntos del primer puesto.</span></Title>
      <Box x={120} y={330} w={1680}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}>
          <Kpi d={1} size={60} label="Margen sobre ingresos" value="48% → 50%" color="var(--omega)" />
          <Kpi d={2} size={60} label="Resultado después de impuestos" value={<>+<Num v={20.3} fmt={(x) => dec(x, 1)} />%</>} note="$10,79M → $12,98M" />
          <Kpi d={3} size={60} label="Endeudamiento" value="0,52 → 0,42" note="caja $39,4M sin préstamos" />
          <Kpi d={4} size={60} label="Valor de la compañía" value="3.829 · 2°" note="Beta 3.834 (+5 puntos)" />
        </div>
      </Box>
      <Box x={120} y={610} w={900} className="rv" d={5}>
        <div className="lbl" style={{ textTransform: 'uppercase', letterSpacing: '.12em' }}>Proyectado vs. realizado</div>
        <div style={{ marginTop: 14 }}>
          <Row head w="380px 1fr 1fr" cells={['', 'Plan 4', 'Resultado']} />
          <Row w="380px 1fr 1fr" cells={['Resultado antes de impuestos', '≈ +$3,3M (+23%)', <b key="r">+$2,96M (+20,3%)</b>]} />
          <Row w="380px 1fr 1fr" cells={['Margen sobre ingresos', '≈ 49%', <b key="r">50%</b>]} />
          <Row w="380px 1fr 1fr" cells={['Endeudamiento', '≈ 0,42', <b key="r">0,42</b>]} />
          <Row w="380px 1fr 1fr" cells={['Unidades', 'sostenerlas', <b key="r">467.700 (+0,4%)</b>]} />
        </div>
      </Box>
      <Box x={1140} y={610} w={660} className="rv" d={6} style={{ borderTop: '3px solid var(--risk)', paddingTop: 18 }}>
        <div className="lbl" style={{ textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--risk)' }}>Efecto no buscado</div>
        <div className="big" style={{ fontSize: 58, marginTop: 14 }}>−14,9%</div>
        <div style={{ fontSize: 20, lineHeight: 1.4, marginTop: 12, color: '#3D3C38' }}>Pequeño Electrodoméstico en Japón: 234.824 → 199.736 unidades. A 74 quedó más caro que Delta (72). Se corrigió en el P5 bajando a 72.</div>
      </Box>
      <Thread now={4} />
    </>
  );
}

/* 13 · P5 decisión */
export function P5Decision() {
  const g: [string, number, number][] = [['TP', 36000, 30000], ['PE', 134000, 100000], ['DH', 23000, 20000]];
  const sy = lin(0, 140000, 0, 250);
  return (
    <>
      <Eyebrow num="05" rest="Período 5 · 2030 · La decisión final" />
      <Source>Plan 5 §0–§9 · Informe 5 §2</Source>
      <Title w={1560}>Faltaba capacidad y sobraba caja: <span className="sub">una segunda planta en USA, pagada con fondos propios.</span></Title>
      <Box x={120} y={340} w={760} className="rv" d={1}>
        <div className="lbl" style={{ textTransform: 'uppercase', letterSpacing: '.12em' }}>Demanda sin atender vs. una planta nueva (unidades)</div>
        <svg width="760" height="320" style={{ marginTop: 14 }}>
          <line x1="0" x2="760" y1="270" y2="270" stroke="#F3F0E8" strokeOpacity=".25" />
          {g.map(([n, a, b], i) => (
            <g key={n} transform={`translate(${30 + i * 250} 0)`}>
              <rect className="grow" style={d(2 + i)} x="0" y={270 - sy(a)} width="80" height={sy(a)} fill="#8C93A6" />
              <rect className="grow" style={d(3 + i)} x="90" y={270 - sy(b)} width="80" height={sy(b)} fill="#5B82FF" />
              <text x="40" y={262 - sy(a)} fontSize="16" fontFamily={M} fill="#F3F0E8" textAnchor="middle">{(a / 1000).toLocaleString('es-AR')}k</text>
              <text x="130" y={262 - sy(b)} fontSize="16" fontFamily={M} fill="#F3F0E8" textAnchor="middle">{(b / 1000).toLocaleString('es-AR')}k</text>
              <text x="85" y="300" fontSize="17" fontFamily={M} fill="#8C93A6" textAnchor="middle">{n}</text>
            </g>
          ))}
        </svg>
        <div className="lbl"><span style={{ color: '#8C93A6' }}>■</span> sin atender (cobertura 72% / 70% / 73%) &nbsp; <span style={{ color: '#5B82FF' }}>■</span> capacidad de una HighTechnology</div>
        <div style={{ marginTop: 34 }}>
          <div className="lbl">Caja disponible vs. inversión</div>
          <svg width="760" height="96" style={{ marginTop: 10 }}>
            <rect className="growx" style={d(6)} x="0" y="0" width={760 * 39.4 / 40} height="38" fill="#35D0E8" />
            <text x="14" y="26" fontSize="17" fontFamily={M} fill="#0A0F1E">Caja $39,4M</text>
            <rect className="growx" style={d(7)} x="0" y="50" width={760 * 32.19 / 40} height="38" fill="#F2602F" />
            <text x="14" y="76" fontSize="17" fontFamily={M} fill="#fff">Fábrica $31,46M + implantación est. $0,73M</text>
          </svg>
        </div>
      </Box>
      <Box x={1000} y={340} w={800} className="rv" d={4}>
        <div className="lbl" style={{ textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--decision)' }}>Por qué con caja y no con préstamo</div>
        <div className="mono" style={{ fontSize: 34, marginTop: 18 }}>Endeudamiento = Pasivo ÷ Patrimonio</div>
        <div style={{ fontSize: 21, lineHeight: 1.42, marginTop: 16, color: '#C8CCD6' }}>Con caja baja el disponible, sube el activo fijo y <b style={{ color: '#F3F0E8' }}>el pasivo no cambia</b>. Con préstamo empeoraba el único parámetro donde Beta nos sacaba ventaja clara (68 puntos).</div>
        <div style={{ marginTop: 30, borderTop: '1px solid rgba(243,240,232,.16)', paddingTop: 18 }}>
          <div className="lbl" style={{ textTransform: 'uppercase', letterSpacing: '.12em' }}>Descartado</div>
          <div style={{ fontSize: 20, lineHeight: 1.42, marginTop: 10, color: '#C8CCD6' }}><b style={{ color: '#F3F0E8' }}>Mercado nuevo (UE Occidental):</b> marca cero en el último período y flete cat. 4–5. La demanda propia ya superaba la planta nueva.</div>
        </div>
        <div style={{ marginTop: 22, borderTop: '1px solid rgba(243,240,232,.16)', paddingTop: 18 }}>
          <div className="lbl" style={{ textTransform: 'uppercase', letterSpacing: '.12em' }}>Además</div>
          <div style={{ fontSize: 20, lineHeight: 1.42, marginTop: 10, color: '#C8CCD6' }}>Innovación 7 → 8 en las tres líneas · promoción USA $3,0M → $3,7M + delegación comercial · PE Japón 74 → 72 · dividendos 30% → 20%.</div>
        </div>
      </Box>
      <Concepts items={['Inversión', 'Fuentes de financiamiento', 'Estructura de capital', 'Capacidad']} />
      <Thread now={5} />
    </>
  );
}

/* 14 · P5 resultado */
export function P5Resultado() {
  const sx = lin(0, 460000, 0, 500);
  const m: [string, number, number, string][] = [['Japón y Corea', 317269, 446785, '+40,8%'], ['USA y Canadá', 150431, 167097, '+11,1%']];
  return (
    <>
      <Eyebrow num="05" rest="Período 5 · Resultados" />
      <Source>Informe 5 §3b, §3c, §3e, §4a</Source>
      <Title w={1560}>El mejor año de OMEGA, <span className="sub">aunque la producción nueva se vendió en Japón y no en USA.</span></Title>
      <Box x={120} y={330} w={1680}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}>
          <Kpi d={1} label="Ingresos" value={<>$<Num v={113.7} fmt={(x) => dec(x, 1)} />M</>} note="+30,4%" />
          <Kpi d={2} label="Resultado después de impuestos" value="+44,7%" note="$18,78M · plan ≈ +35%" color="var(--omega)" />
          <Kpi d={3} label="Unidades" value="613.882" note="+31,3% · ocupación 98,7%" />
          <Kpi d={4} size={60} label="Endeudamiento" value="0,42 → 0,35" note="sin deuda nueva" />
        </div>
      </Box>
      <Box x={120} y={610} w={940} className="rv" d={5}>
        <div className="lbl" style={{ textTransform: 'uppercase', letterSpacing: '.12em' }}>Unidades vendidas por mercado · 2029 → 2030</div>
        <svg width="940" height="230" style={{ marginTop: 18 }}>
          {m.map(([n, a, b, g], i) => (
            <g key={n} transform={`translate(0 ${i * 110})`}>
              <text x="0" y="24" fontSize="21" fontWeight="600" fill="#0E1424">{n}</text>
              <rect x="210" y="0" width={sx(a)} height="28" fill="#CFC9BA" />
              <text x={210 + sx(a) + 10} y="21" fontSize="16" fontFamily={M} fill="#77746C">{a.toLocaleString('es-AR')}</text>
              <rect className="growx" style={d(6 + i)} x="210" y="36" width={sx(b)} height="28" fill={i ? '#2F5BFF' : '#F2602F'} />
              <text x={210 + sx(b) + 10} y="57" fontSize="17" fontFamily={M} fill="#0E1424">{b.toLocaleString('es-AR')} · {g}</text>
            </g>
          ))}
        </svg>
      </Box>
      <Box x={1160} y={610} w={640} className="rv" d={7}>
        <div className="lbl" style={{ textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--decision)' }}>Por qué importa</div>
        <ul style={{ listStyle: 'none', marginTop: 10 }}>
          {['Japón vendió ≈30.000 TP, 72.000 PE y 29.000 DH por encima de su capacidad: salieron de USA.', 'Logística +78,4% ($1,22M → $2,17M) y margen 50% → 49%.', 'DomoHogar en USA −38,6% con la marca subiendo de 60 a 87.', 'Demanda propia cubierta: 76% / 80% / 95%.'].map((t) => (
            <li key={t} style={{ fontSize: 20, lineHeight: 1.38, padding: '9px 0', borderTop: '1px solid var(--line)' }}>{t}</li>
          ))}
        </ul>
      </Box>
      <Thread now={5} />
    </>
  );
}
