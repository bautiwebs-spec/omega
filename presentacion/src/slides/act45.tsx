import { Box, Eyebrow, Source, Title, lin } from '../components/ui';
import { TEAM } from '../data';

const M = 'Geist Mono';
const d = (n: number) => ({ ['--d' as string]: n });

/* 20 · Ganar más no es valer más — azul pleno */
export function GanarVsValer() {
  const rows: [string, number, number][] = [['P1', 38.5, 10.98], ['P2', 99.5, 2.19], ['P3', 22.1, 5.87], ['P4', 20.3, 1.59], ['P5', 44.7, 0.45]];
  const sx = lin(0, 100, 0, 560);
  const X = 200;
  return (
    <>
      <Eyebrow acc="Acto 4" rest="Balance estratégico" />
      <Source>Informes 1, 2, 3, 5 §3a, §3b · Plan 5 §0</Source>
      <h2 className="title rv" style={{ fontSize: 96, top: 140, width: 1600, letterSpacing: '-.04em', lineHeight: 1 }}>Ganar más no es lo mismo <span className="sub">que valer más.</span></h2>
      <svg width="1920" height="1080" className="abs" style={{ inset: 0 }} role="img" aria-label="Crecimiento del resultado frente al crecimiento del valor por período">
        <g transform="translate(120 370)" fontSize="16" fontFamily={M}>
          <rect width="14" height="14" fill="rgba(255,255,255,.4)" /><text x="22" y="13" fill="rgba(255,255,255,.8)">Resultado después de impuestos</text>
          <rect x="330" width="14" height="14" fill="#fff" /><text x="352" y="13" fill="rgba(255,255,255,.8)">Valor de la compañía</text>
        </g>
        <line x1={X + sx(8)} x2={X + sx(8)} y1="405" y2="935" stroke="#fff" strokeOpacity=".7" strokeDasharray="4 5" />
        <text x={X + sx(8) + 8} y="955" fontSize="14" fontFamily={M} fill="rgba(255,255,255,.85)">8%: objetivo del manual para el valor · misma escala</text>
        {rows.map(([p, r, v], i) => {
          const y = 415 + i * 104;
          return (
            <g key={p}>
              <text x="120" y={y + 40} fontSize="22" fontFamily={M} fill="#fff">{p}</text>
              <rect className="growx" style={d(i)} x={X} y={y} width={sx(r)} height="34" fill="rgba(255,255,255,.4)" />
              <text x={X + sx(r) + 10} y={y + 24} fontSize="17" fontFamily={M} fill="rgba(255,255,255,.85)">+{r.toLocaleString('es-AR')}%</text>
              <rect className="growx" style={d(3 + i)} x={X} y={y + 40} width={Math.max(3, sx(v))} height="34" fill="#fff" />
              <text x={X + Math.max(sx(8), sx(v)) + 12} y={y + 64} fontSize="17" fontFamily={M} fontWeight="600" fill="#fff">+{v.toLocaleString('es-AR')}%</text>
            </g>
          );
        })}
      </svg>
      <Box x={1040} y={380} w={760}>
        {[
          ['01', 'Resultados Económicos (41%) es relativo.', 'En P5 el resultado creció 44,7% y el parámetro bajó 19 puntos: Beta ganó $40,5M antes de impuestos; nosotros $25,4M.'],
          ['02', 'Endeudamiento y Solvencia (10%) castigó el préstamo durante cuatro períodos.', 'Desde 2027 tuvimos el ratio más alto del sector. En 2030: 335 puntos contra 394 de Beta, la mayor diferencia.'],
          ['03', 'Innovación de Producto (13%) premia la mejora del período.', 'Sostener los niveles en P2 costó 61 puntos; subir un grado en P3 sumó 106.'],
        ].map(([n, t, x], i) => (
          <div key={n} className="rv" style={{ ...d(5 + i), borderTop: '2px solid rgba(255,255,255,.5)', padding: '16px 0 22px' }}>
            <div style={{ fontSize: 24, fontWeight: 600, lineHeight: 1.22 }}><span className="mono" style={{ fontSize: 18, opacity: 0.7 }}>{n} </span>{t}</div>
            <div style={{ fontSize: 19, lineHeight: 1.4, marginTop: 8, color: 'rgba(255,255,255,.82)' }}>{x}</div>
          </div>
        ))}
      </Box>
    </>
  );
}

/* 21 · Balance */
export function Balance() {
  const cols = [
    { t: 'Funcionó', c: 'var(--omega)', i: [
      ['Tecnología 7 → 10', 'costo TP 124,2 → 106,6 hasta 2028'],
      ['Fábrica y mercado juntos', 'ocupación 96,9% el primer año'],
      ['Reasignar el gasto en P3', '+106 puntos de innovación sin gastar más'],
      ['Pagar la 2ª planta con caja', 'resultado +44,7% y deuda 0,42 → 0,35'],
    ] },
    { t: 'Nos costó', c: 'var(--risk)', i: [
      ['Sostener la innovación en P2', '−61 puntos en el parámetro'],
      ['Préstamo de $20M', 'bastaban $13M a $14M; el ratio más alto del sector'],
      ['Precios quietos en P2 y P3', 'con la demanda 60% mayor: 4° en margen'],
      ['Producción 2030 vendida en Japón', 'logística +78,4%'],
    ] },
    { t: 'Cambiaríamos', c: 'var(--decision)', i: [
      ['Dimensionar la deuda', 'a la necesidad real, usando primero la caja'],
      ['Subir precios desde P2', 'mientras la demanda superaba la capacidad'],
      ['Delegación en USA desde la entrada', 'se instaló recién en P5'],
      ['Leer antes los parámetros', 'qué mide y cómo se calcula cada uno'],
    ] },
  ];
  const chain = [
    ['Marketing', 'Promoción e innovación crean demanda. La promoción rinde hasta saturar la marca; después conviene moverla.'],
    ['Producción', 'La demanda pide capacidad. Producir donde se vende y cargar las plantas según la demanda real.'],
    ['Finanzas', 'La capacidad pide inversión. La deuda se paga en valor durante varios períodos; la caja propia no.'],
  ];
  return (
    <>
      <Eyebrow acc="Acto 4" rest="Qué aprendimos" />
      <Source>Informes 1–5 §4–§7 · Plan 5</Source>
      <Title w={1500}>Lo que haríamos igual <span className="sub">y lo que cambiaríamos.</span></Title>
      <Box x={120} y={300} w={1680}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 44 }}>
          {cols.map((c, ci) => (
            <div key={c.t} className="rv" style={{ ...d(1 + ci), borderTop: `4px solid ${c.c}`, paddingTop: 14 }}>
              <div style={{ fontSize: 26, fontWeight: 600 }}>{c.t}</div>
              {c.i.map(([a, b]) => (
                <div key={a} style={{ borderTop: '1px solid var(--line)', marginTop: 12, paddingTop: 10 }}>
                  <div style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.25 }}>{a}</div>
                  <div style={{ fontSize: 17, lineHeight: 1.35, color: '#3D3C38', marginTop: 3 }}>{b}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Box>
      <Box x={120} y={740} w={1680} className="rv" d={5}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) 260px', gap: 0, background: '#0E1424', color: '#F3F0E8' }}>
          {chain.map(([k, v], i) => (
            <div key={k} style={{ padding: '18px 26px', borderRight: '1px solid rgba(243,240,232,.15)', position: 'relative' }}>
              <div className="mono" style={{ fontSize: 15, letterSpacing: '.12em', textTransform: 'uppercase', color: '#35D0E8' }}>0{i + 1} · {k} →</div>
              <div style={{ fontSize: 17, lineHeight: 1.36, marginTop: 8, color: '#D6D9E0' }}>{v}</div>
            </div>
          ))}
          <div style={{ padding: '18px 26px', background: '#2F5BFF' }}>
            <div className="mono" style={{ fontSize: 15, letterSpacing: '.12em', textTransform: 'uppercase' }}>= Valor</div>
            <div style={{ fontSize: 17, lineHeight: 1.36, marginTop: 8 }}>Cada área decide sobre las demás.</div>
          </div>
        </div>
      </Box>
    </>
  );
}

/* 22 · Cierre — pantalla partida 2025 / 2030 */
export function Cierre() {
  const rows: [string, string, string, boolean?][] = [
    ['Valor de la compañía', '3.139', '3.847'],
    ['Mercados', '1', '2'],
    ['Fábricas', '2', '4'],
    ['Unidades', '294.412', '613.882'],
    ['Ingresos', '$48,3M', '$113,7M'],
    ['Resultado después de impuestos', '$3,2M', '$18,8M'],
    ['Valor de marca', '55', '96'],
    ['Innovación', '5,0', '8,0'],
    ['Endeudamiento', '0,22', '0,35', true],
  ];
  const y0 = 250, step = 64;
  return (
    <>
      <div className="abs" style={{ left: 960, top: 0, width: 960, height: 1080, background: '#0A0F1E' }} />
      <Eyebrow acc="Cierre" rest="2025 → 2030" />
      <Box x={120} y={170} className="mono rv" style={{ fontSize: 18, letterSpacing: '.12em', color: '#77746C' }}>2025 · LO QUE RECIBIMOS</Box>
      <Box x={1060} y={170} className="mono rv" style={{ fontSize: 18, letterSpacing: '.12em', color: '#35D0E8' }}>2030 · LO QUE ENTREGAMOS</Box>
      {rows.map(([k, a, b, r], i) => (
        <div key={k}>
          <Box x={120} y={y0 + i * step} w={780} className="rv" d={1 + i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #D9D4C7', paddingBottom: 12 }}>
            <span style={{ fontSize: 22, color: '#3D3C38' }}>{k}</span>
            <span className="mono" style={{ fontSize: 28, color: '#77746C' }}>{a}</span>
          </Box>
          <Box x={1060} y={y0 + i * step - 8} w={740} className="rv" d={2 + i} style={{ borderBottom: '1px solid rgba(243,240,232,.12)', paddingBottom: 6 }}>
            <span className="big" style={{ fontSize: 44, color: r ? 'var(--risk)' : '#F3F0E8' }}>{b}</span>
          </Box>
        </div>
      ))}
      <Box x={1060} y={860} w={740} className="rv" d={11} style={{ color: '#F3F0E8' }}>
        <div style={{ fontSize: 36, lineHeight: 1.15, letterSpacing: '-.02em', fontWeight: 500 }}><span style={{ color: '#5B82FF' }}>Ω</span> Ninguna decisión es de un área sola.</div>
        <div style={{ fontSize: 18, color: '#8C93A6', marginTop: 14 }}>La deuda de la expansión fue lo que nos separó del primer puesto.</div>
      </Box>
      <Box x={120} y={880} w={780} className="rv" d={12}>
        <div style={{ fontSize: 20, color: '#3D3C38' }}>{TEAM.join(' · ')}</div>
        <div className="lbl" style={{ marginTop: 10, fontSize: 14 }}>Fuente: Diagnóstico · Informe 5 §3b, §7</div>
      </Box>
    </>
  );
}
