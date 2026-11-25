import { Box, Concepts, Eyebrow, Source, Title, lin } from '../components/ui';
import { TEAM, serie, SHORT } from '../data';

/* 1 · Portada */
export function Portada() {
  const x = lin(0, 5, 1040, 1770);
  const y = lin(3100, 3900, 790, 500);
  const pts = serie.valor.map((v, i) => `${x(i)},${y(v)}`).join(' ');
  return (
    <>
      <svg width="1920" height="1080" className="abs" style={{ inset: 0 }} aria-hidden>
        <line x1="1040" x2="1770" y1="860" y2="860" stroke="#F3F0E8" strokeOpacity=".12" />
        <polyline className="draw" pathLength={1} fill="none" stroke="#5B82FF" strokeWidth="3" points={pts} style={{ ['--d' as string]: 4 }} />
        {serie.valor.map((v, i) => (
          <circle key={i} cx={x(i)} cy={y(v)} r={i === 5 ? 11 : 7} fill={i === 5 ? '#F2602F' : '#5B82FF'} className="rv" style={{ ['--d' as string]: 6 + i }} />
        ))}
        <text x={x(0)} y={y(3139) + 46} fill="#8C93A6" fontFamily="Geist Mono" fontSize="20" textAnchor="middle">3.139</text>
        <text x={x(5)} y={y(3847) - 30} fill="#F3F0E8" fontFamily="Geist Mono" fontSize="20" textAnchor="middle">3.847</text>
        <g fontFamily="Geist Mono" fontSize="16" fill="#8C93A6" textAnchor="middle">
          {SHORT.map((s, i) => <text key={s} x={x(i)} y="890">{s}</text>)}
        </g>
        <text x="1040" y="935" fontFamily="Geist Mono" fontSize="16" fill="#8C93A6">Valor de la compañía, en puntos</text>
      </svg>
      <div className="eyebrow"><span className="acc">Simulación Empresarial</span><span className="rest"> · Examen final · Compañía OMEGA</span></div>
      <div className="eyebrow" style={{ left: 'auto', right: 120 }}><span className="rest">2025 — 2030</span></div>
      <Box x={112} y={250} className="rv" d={1}><div style={{ fontWeight: 600, fontSize: 300, lineHeight: 0.8, letterSpacing: '-.06em' }}>Ω</div></Box>
      <Box x={120} y={520} w={940} className="rv" d={2}>
        <h1 style={{ fontWeight: 500, fontSize: 104, lineHeight: 1, letterSpacing: '-.035em' }}>Cinco decisiones.<br /><span style={{ color: '#8C93A6' }}>Una estrategia.</span></h1>
      </Box>
      <Box x={120} y={940} className="rv" d={3}><div style={{ fontSize: 24, color: '#C8CCD6' }}>{TEAM.join(' · ')}</div></Box>
    </>
  );
}

/* 2 · La empresa que recibimos */
const fichas: { v: string; l: string; tone?: 'lead' | 'risk' }[] = [
  { v: '1', l: 'mercado: Japón y Corea, el 100% de los ingresos', tone: 'risk' },
  { v: '2', l: 'fábricas HighTechnology, las dos en Japón' },
  { v: '13,0%', l: 'de las unidades del sector: la más chica de las cinco', tone: 'risk' },
  { v: '$48,3M', l: 'de ingresos · margen 45%, el 2° del sector' },
  { v: '55', l: 'valor de marca: la más alta del sector', tone: 'lead' },
  { v: '7', l: 'tecnología industrial: la más alta del sector', tone: 'lead' },
  { v: '0,22', l: 'endeudamiento: el más bajo del sector', tone: 'lead' },
  { v: '3.139', l: 'valor de la compañía: igual para las cinco', },
];

function OccBar({ name, v, y }: { name: string; v: number; y: number }) {
  const w = 300;
  return (
    <g transform={`translate(0 ${y})`}>
      <text x="0" y="16" fontFamily="Geist Mono" fontSize="16" fill="#77746C">{name}</text>
      <rect x="210" y="2" width={w} height="16" fill="#D9D4C7" />
      <rect className="growx" x="210" y="2" width={(w * v) / 100} height="16" fill={v > 95 ? '#0E1424' : '#2F5BFF'} />
      <text x={210 + w + 14} y="16" fontFamily="Geist Mono" fontSize="16" fill="#0E1424">{v.toLocaleString('es-AR')}%</text>
    </g>
  );
}

export function EmpresaRecibida() {
  return (
    <>
      <Eyebrow acc="Acto 1" rest="El punto de partida · 2025" />
      <Source>Diagnóstico §1, §4, §5 · Plan 1 §0</Source>
      <Title w={1500}>Recibimos la marca y la tecnología más altas del sector, <span className="sub">en la compañía más chica y con un solo mercado.</span></Title>
      <Box x={120} y={370} w={980}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', columnGap: 28, rowGap: 46 }}>
          {fichas.map((f, i) => (
            <div key={i} className="rv" style={{ ['--d' as string]: 1 + i, borderTop: '2px solid #0E1424', paddingTop: 18 }}>
              <div className="big" style={{ fontSize: 66, color: f.tone === 'lead' ? 'var(--omega)' : f.tone === 'risk' ? 'var(--risk)' : undefined }}>{f.v}</div>
              <div className="small" style={{ marginTop: 14, color: '#3D3C38', fontSize: 19 }}>{f.l}</div>
            </div>
          ))}
        </div>
        <div className="lbl rv" style={{ marginTop: 40, ['--d' as string]: 9 }}>
          <span style={{ color: 'var(--omega)' }}>■</span> fortaleza que lidera el sector &nbsp;&nbsp; <span style={{ color: 'var(--risk)' }}>■</span> brecha que había que cerrar
        </div>
      </Box>

      <Box x={1200} y={362} w={600}>
        <div className="lbl rv" style={{ textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--decision)' }}>Qué necesitábamos cambiar</div>
        <div className="rv" style={{ marginTop: 22, ['--d' as string]: 2 }}>
          <div style={{ fontSize: 26, fontWeight: 600 }}><span className="mono dec" style={{ fontSize: 18 }}>01 </span>Capacidad desbalanceada</div>
          <svg width="600" height="96" style={{ marginTop: 12 }}>
            <OccBar name="TecnoPersonal" v={99} y={0} />
            <OccBar name="Pequeño Electr." v={95.7} y={30} />
            <OccBar name="DomoHogar" v={66.7} y={60} />
          </svg>
          <div className="small" style={{ color: '#3D3C38', fontSize: 19 }}>Ocupación por línea. TecnoPersonal cubría solo el <b>54%</b> de su demanda: ≈53.000 unidades sin atender.</div>
        </div>
        <div className="rv" style={{ marginTop: 30, ['--d' as string]: 3 }}>
          <div style={{ fontSize: 26, fontWeight: 600 }}><span className="mono dec" style={{ fontSize: 18 }}>02 </span>Innovación estancada</div>
          <div className="small" style={{ color: '#3D3C38', fontSize: 19, marginTop: 8 }}>Pequeño Electrodoméstico y DomoHogar en nivel <b>4</b>, bajo la referencia de Japón (5), con presupuestos debajo del mínimo del manual.</div>
        </div>
        <div className="rv" style={{ marginTop: 30, ['--d' as string]: 4 }}>
          <div style={{ fontSize: 26, fontWeight: 600 }}><span className="mono dec" style={{ fontSize: 18 }}>03 </span>Un solo mercado, y perdiendo terreno</div>
          <div className="small" style={{ color: '#3D3C38', fontSize: 19, marginTop: 8 }}>Participación en Japón de <b>49% a 43%</b>: el mercado creció 19,5% y nuestros ingresos 7,3%. El freno fue la capacidad.</div>
        </div>
      </Box>
      <Concepts items={['Análisis interno', 'Capacidad instalada', 'Participación de mercado', 'Indicadores de gestión']} bottom={70} />
    </>
  );
}

/* 3 · Diagnóstico */
const quad = [
  { t: 'Fortalezas', c: 'var(--omega)', i: ['Marca 55: la más alta del sector', 'Tecnología 7, dos fábricas HighTechnology', 'Endeudamiento 0,22: el más bajo', 'Resultado antes de impuestos +153% en 2025'] },
  { t: 'Oportunidades', c: 'var(--omega)', i: ['Japón: el sector cubrió solo el 85,2% de la demanda', 'USA y Canadá: renta 40.400 y 24% sin cubrir', 'Innovadores + Conservadores: 43% en Japón', 'Capacidad ociosa en DomoHogar (≈13.700 u.)'] },
  { t: 'Debilidades', c: 'var(--risk)', i: ['100% de los ingresos en Japón y Corea', '13,0% de las unidades: la más chica', 'TecnoPersonal al 99%, DomoHogar al 66,7%', 'Innovación 5,0 sin crecer; capacidades 7,7 → 7,1'] },
  { t: 'Amenazas', c: 'var(--risk)', i: ['Delta más barata (224 / 68 / 680) y margen 49%', 'Beta vende 2,6 veces más unidades', 'Flete caro desde Japón: UE cat. 5, USA cat. 3', 'Referencia de innovación TP ya en 7'] },
];
const fuerzas: [string, string, number][] = [
  ['Rivalidad entre competidores', 'Alta', 4], ['Poder de los proveedores', 'Media-alta', 3], ['Poder de los compradores', 'Media', 2],
  ['Productos sustitutos', 'Baja-media', 2], ['Nuevos competidores', 'Baja', 1],
];
const pestel: [string, string][] = [
  ['Político', 'Toda la operación en Japón: expuesta al proteccionismo'], ['Económico', 'Alto poder adquisitivo, pero dependencia del 100%'],
  ['Social', 'Más tecnología en los hogares; 43% valora la marca'], ['Tecnológico', 'IA, IoT y domótica: exige invertir en innovación'],
  ['Ecológico', 'Eficiencia energética: favorece a las HighTechnology'], ['Legal', 'Regulación e impuestos de cada país donde se produce'],
];

export function Diagnostico() {
  return (
    <>
      <Eyebrow acc="Acto 1" rest="Diagnóstico estratégico" />
      <Source>Diagnóstico §1 (PESTEL, FODA), §3 (Porter), §6 (5 fuerzas)</Source>
      <Title w={1560}>Estrategia de diferenciación: <span className="sub">competir con marca, tecnología e innovación, no con precio.</span></Title>
      <Box x={120} y={318} w={1240}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
          {quad.map((q, i) => (
            <div key={q.t} className="rv" style={{ ['--d' as string]: 1 + i, background: '#F3F0E8', padding: '22px 26px 20px', borderTop: `4px solid ${q.c}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontSize: 27, fontWeight: 600 }}>{q.t}</div>
                <div className="lbl" style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '.1em' }}>{i % 2 === 0 ? 'interno' : 'externo'}</div>
              </div>
              <ul style={{ listStyle: 'none', marginTop: 12 }}>
                {q.i.map((t) => <li key={t} style={{ fontSize: 19, lineHeight: 1.32, padding: '5px 0', borderTop: '1px solid #E2DDD0' }}>{t}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Box>
      <Box x={1420} y={318} w={380} className="rv" d={5}>
        <div style={{ fontSize: 27, fontWeight: 600 }}>Cinco fuerzas</div>
        <div className="lbl" style={{ marginTop: 6 }}>Intensidad para OMEGA en Japón</div>
        {fuerzas.map(([f, l, k]) => (
          <div key={f} style={{ marginTop: 20 }}>
            <div style={{ fontSize: 19 }}>{f}</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 8, alignItems: 'center' }}>
              {[1, 2, 3, 4].map((s) => <span key={s} style={{ width: 44, height: 8, background: s <= k ? '#0E1424' : '#CFC9BA' }} />)}
              <span className="lbl" style={{ marginLeft: 10, fontSize: 15 }}>{l}</span>
            </div>
          </div>
        ))}
        <div className="small" style={{ marginTop: 28, fontSize: 18, color: '#3D3C38', borderTop: '2px solid #0E1424', paddingTop: 14 }}>
          Competir por precio contra Delta, con mejores costos, era perder la ventaja de la marca.
        </div>
      </Box>
      <Box x={120} y={884} w={1680} className="rv" d={7}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 20, borderTop: '2px solid #0E1424', paddingTop: 14 }}>
          {pestel.map(([k, v]) => (
            <div key={k}>
              <div className="mono" style={{ fontSize: 14, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--omega)' }}>{k}</div>
              <div style={{ fontSize: 16, lineHeight: 1.3, marginTop: 6, color: '#3D3C38' }}>{v}</div>
            </div>
          ))}
        </div>
      </Box>
    </>
  );
}

/* 4 · Cinco decisiones */
const caps = [
  { y: '2026', t: 'Optimizar antes de expandir', d: 'Precio, innovación y tecnología en Japón; usar la capacidad ociosa de DomoHogar.', v: '3.483', r: '2°', f: 2, e: '0,22' },
  { y: '2027', t: 'La expansión', d: 'Fábrica HighTechnology en USA y entrada a USA y Canadá, con un préstamo de $20M.', v: '3.560', r: '2°', f: 3, e: '0,61', risk: true },
  { y: '2028', t: 'Consolidar y corregir', d: 'El mismo gasto, reasignado de promoción a innovación y tecnología.', v: '3.769', r: '1°', f: 3, e: '0,52' },
  { y: '2029', t: 'Rentabilidad y eficiencia', d: 'Precios +3% a 5%, tecnología a mantenimiento, más utilidades retenidas.', v: '3.829', r: '2°', f: 3, e: '0,42' },
  { y: '2030', t: 'La decisión final', d: 'Segunda planta en USA pagada con caja propia, sin deuda nueva.', v: '3.847', r: '2°', f: 4, e: '0,35' },
];
export function CincoDecisiones() {
  const colW = 336;
  return (
    <>
      <Eyebrow acc="Acto 2" rest="Cinco períodos, cinco decisiones" />
      <Source>Informes 1, 2, 3, 5 §3 · Plan 5 §0</Source>
      <Title w={1560}>En cada período la demanda superó a nuestra capacidad. <span className="sub">Cada decisión fue una forma distinta de resolverlo.</span></Title>
      <Box x={120} y={352} className="lbl rv" d={1}>Punto de partida 2025 · valor 3.139 · 2 fábricas · endeudamiento 0,22</Box>
      <svg className="abs" style={{ left: 0, top: 0 }} width="1920" height="1080" aria-hidden>
        <line className="draw" pathLength={1} x1="120" x2="1800" y1="420" y2="420" stroke="#5B82FF" strokeWidth="2" />
        {caps.map((_, i) => <circle key={i} cx={120 + i * colW + 8} cy="420" r="8" fill={i === 1 ? '#F2602F' : '#5B82FF'} className="rv" style={{ ['--d' as string]: 2 + i }} />)}
      </svg>
      {caps.map((c, i) => (
        <Box key={c.y} x={120 + i * colW} y={452} w={colW - 36} className="rv" d={2 + i}>
          <div className="mono" style={{ fontSize: 18, letterSpacing: '.1em' }}><span className="dec">0{i + 1}</span> <span className="muted">· {c.y}</span></div>
          <div style={{ fontSize: 31, fontWeight: 600, letterSpacing: '-.02em', marginTop: 14, lineHeight: 1.1, minHeight: 70 }}>{c.t}</div>
          <div style={{ fontSize: 20, lineHeight: 1.38, marginTop: 14, color: '#B9BECB', minHeight: 140 }}>{c.d}</div>
          <div style={{ borderTop: '1px solid rgba(243,240,232,.16)', marginTop: 14, paddingTop: 18 }}>
            <div className="lbl">Valor · puesto</div>
            <div className="big" style={{ fontSize: 58, marginTop: 8 }}>{c.v} <span style={{ fontSize: 30, color: c.r === '1°' ? 'var(--decision)' : '#8C93A6', letterSpacing: 0 }}>{c.r}</span></div>
            <div className="lbl" style={{ marginTop: 18 }}>Fábricas {c.f} · Deuda <span style={{ color: c.risk ? 'var(--risk)' : undefined }}>{c.e}</span></div>
          </div>
        </Box>
      ))}
    </>
  );
}
