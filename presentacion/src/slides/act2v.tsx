// Composiciones variadas del Acto 2 (cada período con su propia estructura visual).
import type { ReactNode } from 'react';
import { Box, Concepts, Eyebrow, Kpi, Num, Panel, Source, Thread, Title, lin } from '../components/ui';
import { dec } from '../data';

const M = 'Geist Mono';
const d = (n: number) => ({ ['--d' as string]: n });
const upper = { textTransform: 'uppercase' as const, letterSpacing: '.12em' };

function Row({ cells, head, w }: { cells: ReactNode[]; head?: boolean; w: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: w, gap: 18, padding: head ? '0 0 10px' : '13px 0', borderBottom: head ? '2px solid currentColor' : '1px solid var(--line)', alignItems: 'baseline' }}>
      {cells.map((c, i) => <div key={i} className={head ? 'lbl' : ''} style={head ? { fontSize: 14, ...upper, letterSpacing: '.08em' } : { fontSize: 20, lineHeight: 1.3 }}>{c}</div>)}
    </div>
  );
}

/** Apertura de período: panel a sangre con número gigante y la pregunta del período.
 *  Las cinco aperturas comparten estructura y cada período tiene su color. */
function Opening({ num, label, q, a, bg, numColor, fg = '#F3F0E8', children, w = 700 }: { num: string; label: string; q: string; a: string; bg: string; numColor: string; fg?: string; children?: ReactNode; w?: number }) {
  return (
    <Panel w={w} bg={bg} color={fg}>
      <div className="eyebrow" style={{ color: fg }}>
        <span style={{ color: numColor }}>{num} </span><span style={{ opacity: 0.7 }}>· {label}</span>
      </div>
      <Box x={110} y={150} className="rv" d={1}><div className="big" style={{ fontSize: 250, color: numColor, letterSpacing: '-.06em' }}>{num}</div></Box>
      <Box x={120} y={430} w={w - 200} className="rv" d={2}>
        <div style={{ fontSize: 46, fontWeight: 500, lineHeight: 1.1, letterSpacing: '-.025em' }}>{q}</div>
        <div className="mono" style={{ fontSize: 18, marginTop: 26, color: numColor, ...upper }}>→ {a}</div>
      </Box>
      {children}
    </Panel>
  );
}

/* 5 · P1 decisión — apertura partida */
export function P1Decision() {
  const alts: [string, string, string][] = [
    ['Descartada', 'Mercado nuevo ya', 'TP al 99% y PE al 95,7%: no había producto libre.'],
    ['Postergada', 'Fábrica nueva', 'Dónde vender define dónde producir: compramos informes ($70.000).'],
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
      <Opening num="01" label="Período 1 · 2026" q="¿Salir a otro mercado o rentabilizar el que ya teníamos?" a="Rentabilizar Japón" bg="#0A0F1E" numColor="#F2602F">
        <Box x={120} y={760} w={500} className="rv" d={3}>
          {alts.map(([t, h, x]) => (
            <div key={t} style={{ borderTop: '1px solid rgba(243,240,232,.16)', padding: '12px 0' }}>
              <span className="mono" style={{ fontSize: 13, color: '#8C93A6', ...upper }}>{t} · </span>
              <b style={{ fontSize: 18 }}>{h}</b>
              <div style={{ fontSize: 16, color: '#B9BECB', marginTop: 4 }}>{x}</div>
            </div>
          ))}
        </Box>
      </Opening>
      <Source>Plan 1 §1–§9 · Informe 1 §2</Source>
      <Box x={800} y={150} w={1000} className="rv" d={2}>
        <div style={{ fontSize: 52, fontWeight: 500, letterSpacing: '-.03em', lineHeight: 1.06 }}>Cinco palancas, <span className="muted">sin construir nada.</span></div>
      </Box>
      <Box x={800} y={300} w={1000} className="rv" d={3}>
        <Row head w="230px 330px 1fr" cells={['Palanca', 'Antes → después', 'Por qué']} />
        {lev.map((l) => <Row key={l[0]} w="230px 330px 1fr" cells={[<b key="a">{l[0]}</b>, <span key="b" className="mono" style={{ fontSize: 18 }}>{l[1]}</span>, <span key="c" style={{ color: '#3D3C38', fontSize: 19 }}>{l[2]}</span>]} />)}
        <div className="lbl" style={{ marginTop: 20 }}><span className="dec">Plan ≠ ejecución:</span> el plan proponía bajar los dividendos a 50%; se mantuvieron en 80%.</div>
      </Box>
      <Concepts left={800} items={['Capacidad instalada', 'Precio según demanda', 'Costo unitario', 'Planificación']} />
      <Thread now={1} left={800} />
    </>
  );
}

/* 6 · P1 resultado — número protagonista */
export function P1Resultado() {
  const lines: [string, number, string][] = [['TecnoPersonal', 62, '≈38.000'], ['Pequeño Electrodoméstico', 74, '≈72.000'], ['DomoHogar', 86, '≈6.000']];
  const W = 380;
  return (
    <>
      <Eyebrow num="01" rest="Período 1 · Resultados" />
      <Source>Informe 1 §3a, §3b, §3c, §3g, §4e</Source>
      <Title w={1100} size={46}>Crecimos sin construir nada, <span className="sub">y llegamos al techo de capacidad.</span></Title>
      <Box x={120} y={300} w={1000} className="rv" d={1}>
        <div className="lbl" style={upper}>Valor de la compañía</div>
        <div className="big hl" style={{ fontSize: 230, letterSpacing: '-.06em', marginTop: 8 }}>+<Num v={10.98} fmt={(x) => dec(x, 2)} />%</div>
        <div style={{ fontSize: 24, marginTop: 18, color: '#3D3C38' }}>3.139 → 3.483 · 2° del sector, a 30 puntos de Beta · objetivo del manual: 8%</div>
      </Box>
      <Box x={120} y={700} w={980} className="rv" d={4}>
        <div className="lbl" style={upper}>Demanda propia cubierta · 2026</div>
        <svg width="980" height="170" style={{ marginTop: 14 }}>
          {lines.map(([n, v, u], i) => (
            <g key={n} transform={`translate(0 ${i * 50})`}>
              <text x="0" y="22" fontSize="18" fill="#0E1424">{n}</text>
              <rect x="250" y="6" width={W} height="20" fill="#D9D4C7" />
              <rect className="growx" style={d(5 + i)} x="250" y="6" width={(W * v) / 100} height="20" fill="#2F5BFF" />
              <text x={250 + W + 14} y="22" fontSize="16" fontFamily={M} fill="#0E1424">{v}% · {u} u. sin atender</text>
            </g>
          ))}
        </svg>
      </Box>
      <Box x={1200} y={300} w={600}>
        {[
          ['Resultado después de impuestos', '+38,5%', '$3,20M → $4,43M'],
          ['Valor de marca', '55 → 79', 'la más alta del sector'],
          ['Costo unitario (tecnología 7 → 8)', '−5,0% a −6,3%', 'ahorro ≈ $1,6M por $0,5M invertidos'],
        ].map(([l, v, n], i) => (
          <div key={l} className="rv" style={{ ...d(2 + i), borderTop: '2px solid #0E1424', padding: '14px 0 20px' }}>
            <div className="lbl">{l}</div>
            <div className="big" style={{ fontSize: 50, marginTop: 8 }}>{v}</div>
            <div className="lbl" style={{ marginTop: 6 }}>{n}</div>
          </div>
        ))}
        <div className="rv" style={{ ...d(6), borderTop: '2px solid var(--decision)', paddingTop: 14, fontSize: 19, lineHeight: 1.4 }}>
          <b className="dec">≈116.000 unidades sin atender.</b> Proyectamos un resultado parecido a 2025 y creció 38,5%: quedarse en Japón ya no alcanzaba.
        </div>
      </Box>
      <Thread now={1} />
    </>
  );
}

/* 7 · P2 selección — apertura partida en ámbar */
export function P2Seleccion() {
  const rows: [string, string, string, string][] = [
    ['Renta per cápita', '40.400', '28.100', '28.570'],
    ['Innovadores + Conservadores', '55%', '44%', '43%'],
    ['Penetración del sector', '61% – 64%', '65% – 82%', '69% – 85%'],
    ['Sin atender TP/PE/DH (miles)', '34,7 / 118,4 / 17,7', '26,8 / 127,4 / 7,3', '57,4 / 96,4 / 11,9'],
    ['Flete desde Japón', 'Categoría 3', 'Categoría 5', 'Categoría 1'],
    ['Competidores', '1 (Gama)', '2', '2 (Omega, Delta)'],
    ['Precio de referencia', '200 / 60 / 650', '215 / 60 / 630', '260 / 70 / 720'],
  ];
  const fab: [string, string, string, boolean?][] = [
    ['HighTechnology · USA', '$31,46M', 'produce donde vende · flete cat. 1', true],
    ['HighTechnology · Japón', '$32,83M', 'más cara; se llenaría con demanda japonesa'],
    ['Allin One · México', '$16,54M', 'tecnología 0 · impuesto 16%'],
  ];
  const W = '260px 230px 210px 1fr';
  return (
    <>
      <Opening num="02" label="Período 2 · 2027" q="¿Dónde crecer y dónde producir?" a="USA y Canadá, con fábrica propia" bg="#F2602F" numColor="#FFFFFF" fg="#FFFFFF">
        <Box x={120} y={720} w={500} className="rv" d={3}>
          <div className="mono" style={{ fontSize: 14, opacity: 0.8, ...upper }}>Dónde construir · inversión</div>
          {fab.map(([n, v, x, ok]) => (
            <div key={n} style={{ borderTop: '1px solid rgba(255,255,255,.35)', padding: '10px 0', marginTop: 4, opacity: ok ? 1 : 0.72 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 19 }}><b>{n}{ok ? ' ✓' : ''}</b><span className="mono">{v}</span></div>
              <div style={{ fontSize: 15, marginTop: 3 }}>{x}</div>
            </div>
          ))}
        </Box>
      </Opening>
      <Source>Plan 1 §1.2 · Plan 2 §1.1–§1.3</Source>
      <Box x={800} y={150} w={1000} className="rv" d={2}>
        <div style={{ fontSize: 46, fontWeight: 500, letterSpacing: '-.03em', lineHeight: 1.08 }}>El mercado que mejor paga la diferenciación, <span className="muted">con la fábrica en destino.</span></div>
      </Box>
      <Box x={800} y={350} w={1000} className="rv" d={3}>
        <div style={{ position: 'relative' }}>
          <div className="abs" style={{ left: 268, top: -8, width: 246, bottom: 0, background: 'rgba(242,96,47,.1)', borderTop: '3px solid var(--decision)' }} />
          <div style={{ position: 'relative' }}>
            <Row head w={W} cells={['Criterio', 'USA y Canadá', 'UE Occidental', 'Japón (actual)']} />
            {rows.map((r) => <Row key={r[0]} w={W} cells={[r[0], <b key="u">{r[1]}</b>, r[2], r[3]].map((c, i) => i ? <span key={i} className="mono" style={{ fontSize: 17 }}>{c}</span> : c)} />)}
          </div>
        </div>
        <div className="lbl" style={{ marginTop: 18 }}>Fábrica y mercado en el mismo período: la planta abastece USA desde el primer día.</div>
      </Box>
      <Concepts left={800} items={['Segmentación', 'Análisis de demanda', 'Costos logísticos', 'Inversión']} />
      <Thread now={2} left={800} />
    </>
  );
}

/* 10 · P3 — apertura partida en azul */
export function P3() {
  const k3: [string, string, string, string?][] = [
    ['Innovación (parámetro)', '498 → 604', '+106 pts · PE y DH de 5 a 6'],
    ['Tecnología industrial', '9 → 10', 'el máximo de la escala'],
    ['Ventas en USA', '+36,2%', 'marca 26 → 41'],
    ['Costo DomoHogar USA', '$431 → $377', 'al cargar la planta 10k → 17k'],
    ['Endeudamiento', '0,61 → 0,52', 'sin préstamos · caja $23,7M'],
    ['Valor de la compañía', '3.769 · 1°', 'Beta penalizada (×0,95)', 'var(--decision)'],
  ];
  const mv: [string, string, string][] = [['Promoción', '6,90 → 6,40', '−0,50'], ['Innovación', '1,85 → 2,20', '+0,35'], ['Tecnología', '0,85 → 1,00', '+0,15']];
  return (
    <>
      <Opening num="03" label="Período 3 · 2028" q="¿Cómo seguir creciendo sin gastar más?" a="Mismo presupuesto, mejor repartido" bg="#2F5BFF" numColor="#FFFFFF">
        <Box x={120} y={720} w={500} className="rv" d={3}>
          <div className="mono" style={{ fontSize: 14, color: 'rgba(255,255,255,.7)', ...upper }}>Presupuesto estratégico · $M · total 9,6</div>
          {mv.map(([a, b, c]) => (
            <div key={a} style={{ display: 'grid', gridTemplateColumns: '170px 1fr 90px', borderTop: '1px solid rgba(255,255,255,.25)', padding: '12px 0', marginTop: 6, fontSize: 20, alignItems: 'baseline' }}>
              <b>{a}</b><span className="mono" style={{ fontSize: 17, opacity: 0.8 }}>{b}</span><span className="mono" style={{ fontSize: 22, textAlign: 'right' }}>{c}</span>
            </div>
          ))}
        </Box>
      </Opening>
      <Source>Plan 3 §1–§8 · Informe 3 §2, §3</Source>
      <Box x={800} y={150} w={1000} className="rv" d={2}>
        <div style={{ fontSize: 52, fontWeight: 500, letterSpacing: '-.03em', lineHeight: 1.06 }}>Sacamos promoción donde la marca estaba saturada <span className="muted">y la pusimos en innovación.</span></div>
      </Box>
      <Box x={800} y={350} w={1000}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 50, rowGap: 30 }}>
          {k3.map((r, i) => <Kpi key={r[0]} d={3 + i} label={r[0]} value={r[1]} note={r[2]} size={50} color={r[3]} />)}
        </div>
      </Box>
      <Box x={800} y={850} w={1000} className="rv small" d={10} style={{ fontSize: 18, color: '#3D3C38' }}>
        La marca en Japón llegó a 100 en las tres líneas con $600.000 menos de promoción. <b>Pendiente:</b> precios sin cambios con la demanda 60% por encima de la capacidad.
      </Box>
      <Thread now={3} left={800} />
    </>
  );
}

/* 11 · P4 decisión — apertura partida en grafito + burbujas */
export function P4Decision() {
  const prod: [string, number, number, number][] = [['TecnoPersonal', 52.9, 120, 11.2], ['Pequeño Electrodoméstico', 61.8, 43, 13.5], ['DomoHogar', 43.8, 295, 17.9]];
  const X0 = 900, X1 = 1560, Y0 = 860, Y1 = 400;
  const sx = lin(40, 66, X0, X1); const sy = lin(0, 340, Y0, Y1);
  const r = (m: number) => Math.sqrt(m) * 16;
  const dec4: [string, string][] = [
    ['Precios Japón', 'TP 238→250 · DH 685→705'],
    ['Precios USA', '195→205 · 59→61 · 640→660'],
    ['Tecnología', '$1,0M → $0,4M (nivel 10)'],
    ['Promoción', 'Japón −$0,7M · USA +$0,6M'],
    ['Innovación', 'PE y DH de 6 a 7'],
    ['Producción', 'DomoHogar completo: 63.000'],
    ['Dividendos', '50% → 30%'],
  ];
  return (
    <>
      <Opening num="04" label="Período 4 · 2029" q="¿Qué producto deja más plata?" a="Subir precios y llenar las tres líneas" bg="#141B2D" numColor="#35D0E8">
        <Box x={120} y={690} w={500} className="rv" d={3}>
          {dec4.map(([k, v]) => (
            <div key={k} style={{ display: 'grid', gridTemplateColumns: '150px 1fr', borderTop: '1px solid rgba(243,240,232,.14)', padding: '8px 0', fontSize: 16 }}>
              <b>{k}</b><span style={{ color: '#B9BECB' }}>{v}</span>
            </div>
          ))}
        </Box>
      </Opening>
      <Source>Plan 4 §1–§9 · sin Informe 4 (error de la simulación)</Source>
      <Box x={800} y={150} w={1000} className="rv" d={2}>
        <div style={{ fontSize: 46, fontWeight: 500, letterSpacing: '-.03em', lineHeight: 1.08 }}>El producto con más margen porcentual <span className="muted">no es el que más dinero deja.</span></div>
      </Box>
      <svg width="1920" height="1080" className="abs" style={{ inset: 0 }} role="img" aria-label="Margen porcentual frente a margen por unidad, por producto">
        {[0, 100, 200, 300].map((v) => (
          <g key={v}><line x1={X0} x2={X1} y1={sy(v)} y2={sy(v)} stroke="#0E1424" strokeOpacity={v ? 0.08 : 0.5} />
            <text x={X0 - 14} y={sy(v) + 5} fontSize="15" fontFamily={M} fill="#77746C" textAnchor="end">${v}</text></g>
        ))}
        {[40, 45, 50, 55, 60, 65].map((v) => <text key={v} x={sx(v)} y={Y0 + 28} fontSize="15" fontFamily={M} fill="#77746C" textAnchor="middle">{v}%</text>)}
        <text x={X1} y={Y0 + 54} fontSize="14" fontFamily={M} fill="#77746C" textAnchor="end">MARGEN % (2028) →</text>
        <text x={X0 - 60} y={Y1 - 26} fontSize="14" fontFamily={M} fill="#77746C">↑ MARGEN POR UNIDAD · TAMAÑO = MARGEN BRUTO TOTAL</text>
        {prod.map(([n, p, u, m], i) => {
          const left = p > 60;
          const tx = left ? sx(p) - r(m) - 14 : sx(p) + r(m) + 14;
          return (
            <g key={n} className="rv" style={d(3 + i)}>
              <circle cx={sx(p)} cy={sy(u)} r={r(m)} fill={u > 200 ? '#F2602F' : p > 60 ? '#0E1424' : '#B9B3A6'} fillOpacity={0.9} />
              <text x={tx} y={sy(u) - 4} fontSize="21" fontWeight="600" fill="#0E1424" textAnchor={left ? 'end' : 'start'}>{n}</text>
              <text x={tx} y={sy(u) + 22} fontSize="15" fontFamily={M} fill="#3D3C38" textAnchor={left ? 'end' : 'start'}>{dec(p, 1)}% · ≈${u}/u · bruto ≈${dec(m, 1)}M</text>
            </g>
          );
        })}
      </svg>
      <Box x={800} y={930} w={1000} className="lbl rv" d={7} style={{ fontSize: 15 }}>Cada planta tiene capacidad separada por producto: producir menos PE no libera capacidad para DH.</Box>
      <Thread now={4} left={800} />
    </>
  );
}

/* 12 · P4 resultado — cara a cara con Beta */
export function P4Resultado() {
  return (
    <>
      <Eyebrow num="04" rest="Período 4 · Resultados" />
      <Source>Plan 5 §0, §4 · Informe 5 §3 (columna 2029) · planilla D4</Source>
      <Title w={1560} size={46}>Ganamos margen sin perder ventas <span className="sub">y quedamos a 5 puntos del primer puesto.</span></Title>
      <Box x={120} y={290} w={700} className="rv" d={1}>
        <div className="mono" style={{ fontSize: 20, ...upper, color: 'var(--omega)' }}>Omega · 2°</div>
        <div className="big hl" style={{ fontSize: 190, letterSpacing: '-.055em' }}><Num v={3829} fmt={(x) => Math.round(x).toLocaleString('es-AR')} /></div>
      </Box>
      <Box x={760} y={350} w={400} className="rv" d={3} style={{ textAlign: 'center' }}>
        <div className="big dec" style={{ fontSize: 120 }}>5</div>
        <div className="mono" style={{ fontSize: 17, ...upper, color: 'var(--decision)', marginTop: 6 }}>puntos de diferencia</div>
      </Box>
      <Box x={1100} y={290} w={700} className="rv" d={2} style={{ textAlign: 'right' }}>
        <div className="mono" style={{ fontSize: 20, ...upper, color: '#9C9588' }}>Beta · 1°</div>
        <div className="big" style={{ fontSize: 190, letterSpacing: '-.055em', color: '#9C9588' }}>3.834</div>
      </Box>
      <Box x={120} y={540} w={1680} className="rv lbl" d={4} style={{ textAlign: 'center', fontSize: 18 }}>
        Lo que nos separó: Endeudamiento y Solvencia, 68 puntos detrás de Beta (Plan 5 §0)
      </Box>
      <Box x={120} y={630} w={1680} className="hair">{null}</Box>
      <Box x={120} y={660} w={1000}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 30 }}>
          <Kpi d={5} size={42} label="Margen" value="48% → 50%" color="var(--omega)" />
          <Kpi d={6} size={42} label="Resultado neto" value="+20,3%" note="$12,98M" />
          <Kpi d={7} size={42} label="Endeudamiento" value="0,52 → 0,42" />
          <Kpi d={8} size={42} label="Caja" value="$39,4M" note="sin préstamos" />
        </div>
        <div className="lbl rv" style={{ ...d(9), marginTop: 26, fontSize: 16 }}>Plan 4 vs. real: resultado antes de impuestos ≈ +$3,3M → +$2,96M · margen ≈ 49% → 50% · endeudamiento ≈ 0,42 → 0,42 · unidades +0,4%</div>
      </Box>
      <Box x={1220} y={660} w={580} className="rv" d={8} style={{ borderLeft: '3px solid var(--risk)', paddingLeft: 26 }}>
        <div className="lbl" style={{ ...upper, color: 'var(--risk)' }}>Efecto no buscado</div>
        <div className="big" style={{ fontSize: 52, marginTop: 8 }}>−14,9%</div>
        <div style={{ fontSize: 18, lineHeight: 1.4, marginTop: 8, color: '#3D3C38' }}>Pequeño Electrodoméstico en Japón (234.824 → 199.736 u.): a 74 quedó más caro que Delta (72). Se corrigió en el P5.</div>
      </Box>
      <Thread now={4} />
    </>
  );
}

/* 13 · P5 decisión — apertura invertida (papel sobre oscuro) */
export function P5Decision() {
  const g: [string, number, number][] = [['TP', 36000, 30000], ['PE', 134000, 100000], ['DH', 23000, 20000]];
  const sy = lin(0, 140000, 0, 230);
  const sb = lin(0, 100, 0, 300);
  const bal: [string, number, number, string][] = [['2029', 29.4, 69.5, '0,42'], ['2030', 30.4, 85.7, '0,35']];
  return (
    <>
      <Opening num="05" label="Período 5 · 2030" q="¿Invertir en el último período? ¿Con qué fondos?" a="Segunda planta en USA, con caja propia" bg="#F3F0E8" numColor="#2F5BFF" fg="#0E1424">
        <Box x={120} y={720} w={500} className="rv" d={3} style={{ fontSize: 18, lineHeight: 1.45, color: '#3D3C38' }}>
          <div style={{ borderTop: '1px solid #D9D4C7', paddingTop: 12 }}>Caja disponible <b style={{ color: '#0E1424' }}>$39,4M</b> · inversión <b style={{ color: '#0E1424' }}>$31,46M</b> + implantación estimada $0,73M.</div>
          <div style={{ borderTop: '1px solid #D9D4C7', paddingTop: 12, marginTop: 12 }}><b style={{ color: '#0E1424' }}>Descartado:</b> mercado nuevo (marca cero en el último período, flete cat. 4–5) y préstamo.</div>
        </Box>
      </Opening>
      <Source>Plan 5 §0–§9 · Informe 5 §2, §3f</Source>
      <Box x={800} y={150} w={1000} className="rv" d={2}>
        <div style={{ fontSize: 46, fontWeight: 500, letterSpacing: '-.03em', lineHeight: 1.08 }}>Faltaba capacidad y sobraba caja: <span className="muted">invertir sin endeudarse.</span></div>
      </Box>
      <Box x={800} y={340} w={470} className="rv" d={3}>
        <div className="lbl" style={upper}>Sin atender vs. una planta nueva</div>
        <svg width="470" height="290" style={{ marginTop: 12 }}>
          <line x1="0" x2="470" y1="250" y2="250" stroke="#F3F0E8" strokeOpacity=".25" />
          {g.map(([n, a, b], i) => (
            <g key={n} transform={`translate(${10 + i * 155} 0)`}>
              <rect className="grow" style={d(3 + i)} x="0" y={250 - sy(a)} width="58" height={sy(a)} fill="#8C93A6" />
              <rect className="grow" style={d(4 + i)} x="64" y={250 - sy(b)} width="58" height={sy(b)} fill="#5B82FF" />
              <text x="29" y={242 - sy(a)} fontSize="15" fontFamily={M} fill="#F3F0E8" textAnchor="middle">{(a / 1000).toLocaleString('es-AR')}k</text>
              <text x="93" y={242 - sy(b)} fontSize="15" fontFamily={M} fill="#F3F0E8" textAnchor="middle">{(b / 1000).toLocaleString('es-AR')}k</text>
              <text x="61" y="276" fontSize="16" fontFamily={M} fill="#8C93A6" textAnchor="middle">{n}</text>
            </g>
          ))}
        </svg>
        <div className="lbl" style={{ fontSize: 15 }}><span style={{ color: '#8C93A6' }}>■</span> sin atender (72% / 70% / 73% cubierto) <span style={{ color: '#5B82FF' }}>■</span> una HighTechnology</div>
      </Box>
      <Box x={1330} y={340} w={470} className="rv" d={5}>
        <div className="lbl" style={{ ...upper, color: 'var(--decision)' }}>Pasivo ÷ patrimonio</div>
        <svg width="470" height="290" style={{ marginTop: 12 }}>
          {bal.map(([y, pas, pat, rr], i) => (
            <g key={y} transform={`translate(0 ${i * 135 + 6})`}>
              <text x="0" y="22" fontSize="22" fontWeight="600" fill="#F3F0E8">{y}</text>
              <text x="0" y="46" fontSize="14" fontFamily={M} fill="#8C93A6">ratio {rr}</text>
              <rect className="growx" style={d(6 + i)} x="90" y="4" width={sb(pas)} height="30" fill="#D9363E" />
              <text x={98 + sb(pas)} y="25" fontSize="14" fontFamily={M} fill="#F3F0E8">pasivo ${dec(pas, 1)}M</text>
              <rect className="growx" style={d(7 + i)} x="90" y="42" width={sb(pat)} height="30" fill="#35D0E8" />
              <text x="98" y="104" fontSize="14" fontFamily={M} fill="#8C93A6">{i ? '' : '≈'}patrimonio ${dec(pat, 1)}M</text>
            </g>
          ))}
        </svg>
        <div style={{ fontSize: 17, lineHeight: 1.42, color: '#C8CCD6' }}>Con caja el pasivo casi no cambió y el patrimonio creció: el ratio bajó.</div>
      </Box>
      <Box x={800} y={790} w={1000} className="rv" d={8} style={{ fontSize: 19, lineHeight: 1.45, color: '#C8CCD6', borderTop: '1px solid rgba(243,240,232,.16)', paddingTop: 16 }}>
        Con préstamo hubiéramos empeorado el único parámetro donde Beta nos sacaba ventaja clara (68 puntos). Además: innovación 7 → 8 en las tres líneas y delegación comercial en USA.
      </Box>
      <Concepts left={800} items={['Inversión', 'Financiamiento propio', 'Estructura de capital']} />
      <Thread now={5} left={800} />
    </>
  );
}

/* 14 · P5 resultado — pantalla partida Japón / USA */
export function P5Resultado() {
  return (
    <>
      <Panel y={470} h={490} w={960} bg="#0A0F1E" />
      <Panel y={470} h={490} x={960} w={960} bg="#E9E5DA" color="#0E1424" />
      <Eyebrow num="05" rest="Período 5 · Resultados" />
      <Source>Informe 5 §3b, §3c, §3e, §4a</Source>
      <Title w={1560} size={46}>El mejor año de OMEGA, <span className="sub">aunque la producción nueva se vendió en Japón y no en USA.</span></Title>
      <Box x={120} y={300} w={1680} className="rv" d={1}>
        <div style={{ display: 'flex', gap: 70, alignItems: 'baseline' }}>
          {[['Ingresos', '$113,7M', '+30,4%'], ['Resultado después de imp.', '$18,78M', '+44,7% · plan ≈ +35%'], ['Unidades', '613.882', '+31,3%'], ['Endeudamiento', '0,35', 'sin deuda nueva']].map(([l, v, n]) => (
            <div key={l}><div className="lbl">{l}</div><div className="big" style={{ fontSize: 46, marginTop: 6 }}>{v} <span className="mono hl" style={{ fontSize: 17, letterSpacing: 0 }}>{n}</span></div></div>
          ))}
        </div>
      </Box>
      <Box x={120} y={520} w={760} className="rv" d={2} style={{ color: '#F3F0E8' }}>
        <div className="mono" style={{ fontSize: 18, color: '#35D0E8', ...upper }}>Japón y Corea</div>
        <div className="big" style={{ fontSize: 130, marginTop: 10 }}><Num v={446785} fmt={(x) => Math.round(x).toLocaleString('es-AR')} /></div>
        <div className="mono" style={{ fontSize: 20, color: '#35D0E8', marginTop: 6 }}>unidades · +40,8%</div>
        <div style={{ fontSize: 20, lineHeight: 1.5, marginTop: 22, color: '#B9BECB' }}>Ingresos $94,1M (+42,2%) · marca 100 · 49% del mercado. Vendió ≈30.000 TP, 72.000 PE y 29.000 DH por encima de su capacidad: salieron de USA.</div>
      </Box>
      <Box x={1060} y={520} w={740} className="rv" d={3}>
        <div className="mono" style={{ fontSize: 18, color: 'var(--decision)', ...upper }}>USA y Canadá</div>
        <div className="big" style={{ fontSize: 130, marginTop: 10 }}><Num v={167097} fmt={(x) => Math.round(x).toLocaleString('es-AR')} delay={600} /></div>
        <div className="mono" style={{ fontSize: 20, color: 'var(--decision)', marginTop: 6 }}>unidades · +11,1%</div>
        <div style={{ fontSize: 20, lineHeight: 1.5, marginTop: 22, color: '#3D3C38' }}>Ingresos $19,6M (−6,9%) · DomoHogar −38,6% con la marca subiendo de 60 a 87. Logística total +78,4% y margen 50% → 49%.</div>
      </Box>
      <Thread now={5} />
    </>
  );
}
