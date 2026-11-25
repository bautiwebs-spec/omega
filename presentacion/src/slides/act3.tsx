import { Box, Eyebrow, Source, Title, lin } from '../components/ui';
import { SHORT, capacidad, costoUnitario, dec, serie, unidadesMercado, valorCompetencia } from '../data';

const M = 'Geist Mono';
const d = (n: number) => ({ ['--d' as string]: n });
const fmtM = (v: number) => '$' + (v / 1e6).toLocaleString('es-AR', { maximumFractionDigits: 1, minimumFractionDigits: 1 }) + 'M';

/* 15 · Valor de la compañía */
export function EvolucionValor() {
  const x = lin(0, 5, 220, 1520);
  const y = lin(2900, 4000, 990, 420);
  const order = ['Alfa', 'Gama', 'Delta', 'Beta', 'Omega'];
  const lab: Record<string, number> = { Beta: 3891, Omega: 3847, Delta: 3606, Gama: 3359, Alfa: 3055 };
  const labY: Record<string, number> = { Beta: y(3891) - 4, Omega: y(3847) + 22, Delta: y(3606) + 6, Gama: y(3359) + 6, Alfa: y(3055) + 6 };
  const ann: [number, string][] = [[1, '+10,98%'], [2, '+2,19%'], [3, '+5,87%'], [4, '+1,59%'], [5, '+0,45%']];
  return (
    <>
      <Eyebrow acc="Acto 3" rest="La evolución global · Valor de la compañía" />
      <Source>Informes 1, 2, 3, 5 §3a · Plan 5 §0</Source>
      <Title w={1500}>De 3.139 a 3.847 puntos: <span className="hl">+22,6%</span>. <span className="sub">Primeros en 2028, segundos al cierre, a 44 puntos de Beta.</span></Title>
      <svg width="1920" height="1080" className="abs" style={{ inset: 0 }} role="img" aria-label="Evolución del valor de las cinco compañías">
        {[3100, 3400, 3700, 4000].map((v) => (
          <g key={v}>
            <line x1="220" x2="1520" y1={y(v)} y2={y(v)} stroke="#F3F0E8" strokeOpacity=".08" />
            <text x="200" y={y(v) + 5} fill="#8C93A6" fontSize="16" fontFamily={M} textAnchor="end">{v.toLocaleString('es-AR')}</text>
          </g>
        ))}
        <text x="120" y="400" fill="#8C93A6" fontSize="15" fontFamily={M}>puntos</text>
        {order.map((c, ci) => {
          const pts = valorCompetencia[c].map((v, i) => `${x(i)},${y(v)}`).join(' ');
          const om = c === 'Omega'; const be = c === 'Beta';
          return <polyline key={c} className="draw" pathLength={1} style={d(om ? 6 : ci)} fill="none" stroke={om ? '#5B82FF' : be ? '#B5AE9F' : '#C9C4B9'} strokeOpacity={om || be ? 1 : 0.3} strokeWidth={om ? 5 : be ? 3 : 2} points={pts} />;
        })}
        {valorCompetencia.Omega.map((v, i) => <circle key={i} className="rv" style={d(8 + i)} cx={x(i)} cy={y(v)} r={i === 3 ? 12 : 7} fill={i === 3 ? '#F2602F' : '#5B82FF'} />)}
        {ann.map(([i, t]) => <text key={i} className="rv" style={d(9 + i)} x={i === 3 ? x(i) : i === 5 ? x(i) - 16 : x(i) + 14} y={y(valorCompetencia.Omega[i]) + (i === 3 ? -44 : i === 1 ? 36 : i === 5 ? 40 : 34)} fill={i === 3 ? '#F2602F' : '#8DA8FF'} fontSize="17" fontFamily={M} textAnchor={i === 3 ? 'middle' : i === 5 ? 'end' : 'start'}>{i === 3 ? '1° · +5,87%' : t}</text>)}
        <text x={x(3)} y={y(3769) - 22} className="rv" style={d(12)} fill="#B5AE9F" fontSize="14" fontFamily={M} textAnchor="middle">Beta penalizada ×0,95</text>
        {order.map((c) => (
          <text key={c} x="1550" y={labY[c]} fill={c === 'Omega' ? '#8DA8FF' : c === 'Beta' ? '#D3CCBD' : '#8C93A6'} fontSize={c === 'Omega' || c === 'Beta' ? 20 : 17} fontFamily={M}>{c} {lab[c].toLocaleString('es-AR')}</text>
        ))}
        {SHORT.map((s, i) => <text key={s} x={x(i)} y="1030" fill="#8C93A6" fontSize="16" fontFamily={M} textAnchor="middle">{s}</text>)}
      </svg>
    </>
  );
}

/* 16 · Ingresos y resultados — título en columna lateral */
export function IngresosResultados() {
  const x0 = 760, bw = 118, gap = 50;
  const sy = lin(0, 120e6, 0, 430);
  const base = 830;
  const opm = serie.resOperativo.map((r, i) => (r / serie.ingresos[i]) * 100);
  return (
    <>
      <div className="abs" style={{ left: 680, top: 0, width: 1240, height: 1080, background: '#E9E5DA' }} />
      <Eyebrow acc="Acto 3" rest="Ingresos y resultados" />
      <Source>Diagnóstico §4 · Informes 1–5 §3b, §3e · Plan 5 §0</Source>
      <Box x={120} y={150} w={500} className="rv">
        <h2 style={{ fontWeight: 500, fontSize: 54, lineHeight: 1.06, letterSpacing: '-.03em' }}>Ingresos ×2,35 y resultado ×5,87: <span className="muted">crecimos más en rentabilidad que en tamaño.</span></h2>
      </Box>
      <Box x={120} y={540} w={480} className="rv" d={6}>
        {[
          ['P1', 'Precio, tecnología y DomoHogar: resultado +38,5% con 12,4% más de ingresos.'],
          ['P2', 'La planta de USA: ingresos +43,3% y resultado +99,5%.'],
          ['P4', 'Precio: margen 50%, el más alto de la etapa.'],
          ['P5', 'Segunda planta: ingresos +30,4% y resultado +44,7%.'],
        ].map(([p, t]) => (
          <div key={p} style={{ borderTop: '1px solid var(--line)', padding: '12px 0', display: 'grid', gridTemplateColumns: '46px 1fr' }}>
            <span className="mono dec" style={{ fontSize: 16 }}>{p}</span>
            <div style={{ fontSize: 18, lineHeight: 1.36 }}>{t}</div>
          </div>
        ))}
      </Box>
      <svg width="1920" height="1080" className="abs" style={{ inset: 0 }} role="img" aria-label="Ingresos y resultado después de impuestos por año">
        {[0, 40e6, 80e6, 120e6].map((v) => (
          <g key={v}>
            <line x1={x0 - 20} x2={x0 + 6 * (bw + gap)} y1={base - sy(v)} y2={base - sy(v)} stroke="#0E1424" strokeOpacity={v ? 0.08 : 0.5} />
            <text x={x0 - 30} y={base - sy(v) + 5} fontSize="15" fontFamily={M} fill="#77746C" textAnchor="end">{v ? `$${v / 1e6}M` : '0'}</text>
          </g>
        ))}
        {serie.ingresos.map((v, i) => {
          const bx = x0 + i * (bw + gap);
          const r = serie.resNeto[i];
          return (
            <g key={i}>
              <rect className="grow" style={d(i)} x={bx} y={base - sy(v)} width={bw} height={sy(v)} fill="#C9C4B9" />
              <rect className="grow" style={d(4 + i)} x={bx} y={base - sy(r)} width={bw} height={sy(r)} fill="#2F5BFF" />
              <text x={bx + bw / 2} y={base - sy(v) - 12} fontSize="17" fontFamily={M} fill="#0E1424" textAnchor="middle">{fmtM(v)}</text>
              <text x={bx + bw / 2} y={base - sy(r) - 10} fontSize="16" fontFamily={M} fill="#2F5BFF" textAnchor="middle">{fmtM(r)}</text>
              <text x={bx + bw / 2} y={base + 30} fontSize="16" fontFamily={M} fill="#77746C" textAnchor="middle">{SHORT[i]}</text>
              <text x={bx + bw / 2} y={base + 64} fontSize="17" fontFamily={M} fill="#0E1424" textAnchor="middle">{serie.margen[i]}%</text>
              <text x={bx + bw / 2} y={base + 92} fontSize="17" fontFamily={M} fill="#0E1424" textAnchor="middle">{dec(opm[i], 1)}%</text>
              <text x={bx + bw / 2} y={base + 120} fontSize="17" fontFamily={M} fill="#0E1424" textAnchor="middle">{dec(serie.roe[i], 1)}%</text>
            </g>
          );
        })}
        <g fontSize="13" fontFamily={M} fill="#77746C" textAnchor="end">
          <text x={x0 - 24} y={base + 64}>MARGEN</text><text x={x0 - 24} y={base + 92}>RES.OP./ING.</text><text x={x0 - 24} y={base + 120}>ROE</text>
        </g>
        <g transform={`translate(${x0} 320)`} fontSize="16" fontFamily={M}>
          <rect width="14" height="14" fill="#C9C4B9" /><text x="22" y="13" fill="#77746C">Ingresos</text>
          <rect x="130" width="14" height="14" fill="#2F5BFF" /><text x="152" y="13" fill="#77746C">Resultado después de impuestos</text>
        </g>
      </svg>
    </>
  );
}

/* 17 · Evolución comercial */
export function Comercial() {
  const x0 = 200, bw = 104, gap = 46, base = 860;
  const sy = lin(0, 640000, 0, 430);
  const spark = (vals: number[], min: number, max: number, w = 330, h = 70) => {
    const sx = lin(0, vals.length - 1, 0, w); const s = lin(min, max, h, 0);
    return vals.map((v, i) => `${sx(i)},${s(v)}`).join(' ');
  };
  const sm: { n: string; v: number[]; min: number; max: number; f: (x: number) => string; note: string }[] = [
    { n: 'Valor de marca', v: serie.marca, min: 50, max: 100, f: (x) => String(x), note: 'empate 1° (Beta, Gama)' },
    { n: 'Innovación de producto', v: serie.innovacion, min: 4.5, max: 8.5, f: (x) => dec(x, 1), note: '1° del sector' },
    { n: 'Tecnología industrial', v: serie.tecnologia, min: 6.5, max: 10.5, f: (x) => String(x), note: '1° · máximo de la escala' },
  ];
  return (
    <>
      <Eyebrow acc="Acto 3" rest="Evolución comercial" />
      <Source>Informes 1–5 §3b, §3c · Plan 5 §0 · Diagnóstico</Source>
      <Title w={1560}>De un mercado a dos, <span className="sub">con la marca y la innovación más altas del sector al cierre.</span></Title>
      <svg width="1920" height="1080" className="abs" style={{ inset: 0 }} role="img" aria-label="Unidades vendidas por mercado">
        <text x="120" y="388" fontSize="16" fontFamily={M} fill="#77746C" letterSpacing="2">UNIDADES VENDIDAS POR MERCADO</text>
        {serie.unidades.map((tot, i) => {
          const jp = unidadesMercado.japonTotal[i]; const us = unidadesMercado.usaTotal[i];
          const bx = x0 + i * (bw + gap);
          return (
            <g key={i}>
              <rect className="grow" style={d(i)} x={bx} y={base - sy(jp)} width={bw} height={sy(jp)} fill="#0E1424" />
              {us > 0 && <rect className="grow" style={d(3 + i)} x={bx} y={base - sy(tot)} width={bw} height={sy(us) - 2} fill="#F2602F" />}
              <text x={bx + bw / 2} y={base - sy(tot) - 12} fontSize="16" fontFamily={M} fill="#0E1424" textAnchor="middle">{Math.round(tot / 1000)}k</text>
              <text x={bx + bw / 2} y={base + 30} fontSize="16" fontFamily={M} fill="#77746C" textAnchor="middle">{SHORT[i]}</text>
              <text x={bx + bw / 2} y={base + 62} fontSize="17" fontFamily={M} fill="#0E1424" textAnchor="middle">{dec(serie.partUnidades[i], 1)}%</text>
              <text x={bx + bw / 2} y={base + 90} fontSize="17" fontFamily={M} fill="#2F5BFF" textAnchor="middle">{dec(serie.partIngresos[i], 1)}%</text>
            </g>
          );
        })}
        <line x1={x0 - 10} x2={x0 + 6 * (bw + gap) - gap + 10} y1={base} y2={base} stroke="#0E1424" />
        <g fontSize="13" fontFamily={M} fill="#77746C" textAnchor="end"><text x={x0 - 16} y={base + 62}>PART. UNID.</text><text x={x0 - 16} y={base + 90}>PART. ING.</text></g>
        <g transform="translate(200 410)" fontSize="16" fontFamily={M}>
          <rect width="14" height="14" fill="#0E1424" /><text x="22" y="13" fill="#77746C">Japón y Corea</text>
          <rect x="170" width="14" height="14" fill="#F2602F" /><text x="192" y="13" fill="#77746C">USA y Canadá</text>
        </g>
      </svg>
      <Box x={1150} y={370} w={650}>
        {sm.map((s, i) => (
          <div key={s.n} className="rv" style={{ ...d(5 + i), borderTop: '2px solid #0E1424', padding: '14px 0 18px', display: 'grid', gridTemplateColumns: '250px 1fr', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 600 }}>{s.n}</div>
              <div className="big" style={{ fontSize: 44, marginTop: 6 }}>{s.f(s.v[0])} <span className="muted" style={{ fontSize: 26 }}>→</span> <span className="hl">{s.f(s.v[5])}</span></div>
              <div className="lbl" style={{ fontSize: 14, marginTop: 4 }}>{s.note}</div>
            </div>
            <svg width="360" height="80" style={{ overflow: 'visible' }}>
              <polyline className="draw" pathLength={1} style={d(6 + i)} points={spark(s.v, s.min, s.max)} fill="none" stroke="#2F5BFF" strokeWidth="3" transform="translate(10 5)" />
            </svg>
          </div>
        ))}
        <div className="rv" style={{ ...d(9), borderTop: '2px solid #0E1424', paddingTop: 14, fontSize: 19, lineHeight: 1.4 }}>
          <b>Precio:</b> TecnoPersonal Japón 228 → 250; entrada a USA debajo de la referencia (195 / 59 / 640) y suba a 205 / 61 / 660 en P4.
        </div>
      </Box>
    </>
  );
}

/* 18 · Evolución operativa */
export function Operativa() {
  const x0 = 200, bw = 104, gap = 46, base = 860;
  const sy = lin(0, 660000, 0, 430);
  const cov = capacidad.cobertura;
  const cell = (v: number | null) => v == null ? '—' : `${v}%`;
  const shade = (v: number | null) => v == null ? 'transparent' : `rgba(47,91,255,${0.12 + ((v - 50) / 50) * 0.75})`;
  return (
    <>
      <Eyebrow acc="Acto 3" rest="Evolución operativa" />
      <Source>Planes 1–5 (capacidad) · Informes 1–5 (unidades, ocupación, costo unitario)</Source>
      <Title w={1560}>Duplicamos la capacidad <span className="sub">y aun así la demanda fue siempre mayor.</span></Title>
      <svg width="1920" height="1080" className="abs" style={{ inset: 0 }} role="img" aria-label="Capacidad instalada y unidades vendidas">
        <text x="120" y="388" fontSize="16" fontFamily={M} fill="#77746C" letterSpacing="2">CAPACIDAD INSTALADA VS. UNIDADES VENDIDAS</text>
        {capacidad.total.map((c, i) => {
          const bx = x0 + i * (bw + gap); const u = serie.unidades[i];
          return (
            <g key={i}>
              <rect className="grow" style={d(i)} x={bx} y={base - sy(c)} width={bw} height={sy(c)} fill="none" stroke="#0E1424" strokeWidth="2" strokeDasharray="5 4" />
              <rect className="grow" style={d(3 + i)} x={bx + 10} y={base - sy(u)} width={bw - 20} height={sy(u)} fill="#2F5BFF" />
              <text x={bx + bw / 2} y={base - sy(c) - 12} fontSize="16" fontFamily={M} fill="#0E1424" textAnchor="middle">{Math.round(c / 1000)}k</text>
              <text x={bx + bw / 2} y={base + 30} fontSize="16" fontFamily={M} fill="#77746C" textAnchor="middle">{SHORT[i]}</text>
              <text x={bx + bw / 2} y={base + 62} fontSize="17" fontFamily={M} fill="#0E1424" textAnchor="middle">{serie.fabricas[i]}</text>
              <text x={bx + bw / 2} y={base + 90} fontSize="17" fontFamily={M} fill="#0E1424" textAnchor="middle">{dec(serie.ocupacion[i], 1)}%</text>
            </g>
          );
        })}
        <line x1={x0 - 10} x2={x0 + 6 * (bw + gap) - gap + 10} y1={base} y2={base} stroke="#0E1424" />
        <g fontSize="13" fontFamily={M} fill="#77746C" textAnchor="end"><text x={x0 - 16} y={base + 62}>FÁBRICAS</text><text x={x0 - 16} y={base + 90}>OCUPACIÓN</text></g>
        <g transform="translate(200 410)" fontSize="16" fontFamily={M}>
          <rect width="14" height="14" fill="none" stroke="#0E1424" strokeDasharray="3 2" /><text x="22" y="13" fill="#77746C">Capacidad</text>
          <rect x="150" width="14" height="14" fill="#2F5BFF" /><text x="172" y="13" fill="#77746C">Unidades vendidas</text>
        </g>
      </svg>
      <Box x={1150} y={370} w={650} className="rv" d={6}>
        <div className="lbl" style={{ textTransform: 'uppercase', letterSpacing: '.12em' }}>Demanda propia cubierta</div>
        <table className="t" style={{ marginTop: 14, fontSize: 18 }}>
          <thead><tr><th></th>{SHORT.map((s) => <th key={s} style={{ textAlign: 'center' }}>{s}</th>)}</tr></thead>
          <tbody>
            {(['TP', 'PE', 'DH'] as const).map((k) => (
              <tr key={k}><td style={{ fontWeight: 600 }}>{k}</td>{cov[k].map((v, i) => <td key={i} style={{ textAlign: 'center', background: shade(v), color: v != null && v > 85 ? '#fff' : undefined }}>{cell(v)}</td>)}</tr>
            ))}
          </tbody>
        </table>
        <div className="lbl" style={{ marginTop: 34, textTransform: 'uppercase', letterSpacing: '.12em' }}>Costo unitario de fabricación</div>
        <table className="t" style={{ marginTop: 14, fontSize: 18 }}>
          <thead><tr><th></th><th>2025</th><th>2028 (mín.)</th><th>2030</th></tr></thead>
          <tbody>
            {(['TP', 'PE', 'DH'] as const).map((k) => (
              <tr key={k}><td style={{ fontWeight: 600 }}>{k}</td><td>{dec(costoUnitario[k][1], 1)}</td><td style={{ color: 'var(--omega)', fontWeight: 600 }}>{dec(costoUnitario[k][4], 1)}</td><td>{dec(costoUnitario[k][6], 1)}</td></tr>
            ))}
          </tbody>
        </table>
        <div style={{ fontSize: 18, lineHeight: 1.38, marginTop: 14, color: '#3D3C38' }}>La tecnología (7 → 10) bajó el costo hasta 2028. Con la escala en el máximo, desde 2029 ya no baja.</div>
      </Box>
    </>
  );
}

/* 19 · Evolución financiera */
export function Financiera() {
  const x0 = 210, gw = 120, gap = 34, base = 690;
  const sy = lin(0, 40e6, 0, 280);
  const ey = lin(0, 0.7, 0, 130);
  const comp: [string, number][] = [['Omega', 0.35], ['Delta', 0.20], ['Gama', 0.15], ['Alfa', 0.10], ['Beta', 0.08]];
  return (
    <>
      <Eyebrow acc="Acto 3" rest="Evolución financiera" />
      <Source>Informes 1–5 §3f · Plan 5 §0 · planillas de cash flow (D3, D4, D5)</Source>
      <Title w={1560}>El préstamo de 2027 financió la expansión; <span className="sub">lo licuamos con utilidades retenidas, sin pedir más deuda.</span></Title>
      <svg width="1920" height="1080" className="abs" style={{ inset: 0 }} role="img" aria-label="Caja, préstamo y endeudamiento">
        <text x="120" y="378" fontSize="16" fontFamily={M} fill="#8C93A6" letterSpacing="2">CAJA (BALANCE) Y PRÉSTAMO A LARGO PLAZO · $M</text>
        <g transform="translate(120 396)" fontSize="15" fontFamily={M}>
          <rect width="14" height="14" fill="#35D0E8" /><text x="22" y="13" fill="#8C93A6">Caja</text>
          <rect x="90" width="14" height="14" fill="#D9363E" /><text x="112" y="13" fill="#8C93A6">Préstamo LP</text>
        </g>
        {serie.caja.map((c, i) => {
          const l = serie.prestamoLP[i]; const gx = x0 + i * (gw + gap);
          return (
            <g key={i}>
              <rect className="grow" style={d(i)} x={gx} y={base - sy(c)} width="56" height={sy(c)} fill="#35D0E8" />
              <rect className="grow" style={d(2 + i)} x={gx + 60} y={base - sy(l)} width="56" height={sy(l)} fill="#D9363E" />
              <text x={gx + 28} y={base - sy(c) - 8} fontSize="14" fontFamily={M} fill="#F3F0E8" textAnchor="middle">{dec(c / 1e6, 1)}</text>
              <text x={gx + 88} y={base - sy(l) - 8} fontSize="14" fontFamily={M} fill="#F3F0E8" textAnchor="middle">{dec(l / 1e6, 1)}</text>
              <text x={gx + 58} y={base + 26} fontSize="15" fontFamily={M} fill="#8C93A6" textAnchor="middle">{SHORT[i]}</text>
            </g>
          );
        })}
        <line x1={x0 - 10} x2={x0 + 6 * (gw + gap)} y1={base} y2={base} stroke="#F3F0E8" strokeOpacity=".4" />
        <text x="120" y="770" fontSize="16" fontFamily={M} fill="#8C93A6" letterSpacing="2">ENDEUDAMIENTO (PASIVO / PATRIMONIO) · EL MÁS ALTO DEL SECTOR DESDE 2027</text>
        <polyline className="draw" pathLength={1} style={d(6)} fill="none" stroke="#D9363E" strokeWidth="4" points={serie.endeudamiento.map((v, i) => `${x0 + 58 + i * (gw + gap)},${930 - ey(v)}`).join(' ')} />
        {serie.endeudamiento.map((v, i) => (
          <g key={i}>
            <circle cx={x0 + 58 + i * (gw + gap)} cy={930 - ey(v)} r="6" fill="#D9363E" />
            <text x={x0 + 58 + i * (gw + gap)} y={930 - ey(v) - 14} fontSize="16" fontFamily={M} fill="#F3F0E8" textAnchor="middle">{dec(v, 2)}</text>
          </g>
        ))}
              </svg>
      <Box x={1320} y={360} w={480} className="rv" d={7}>
        <div className="lbl" style={{ textTransform: 'uppercase', letterSpacing: '.12em' }}>Endeudamiento 2030</div>
        <svg width="480" height="200" style={{ marginTop: 14 }}>
          {comp.map(([c, v], i) => (
            <g key={c} transform={`translate(0 ${i * 38})`}>
              <text x="0" y="20" fontSize="17" fontFamily={M} fill={c === 'Omega' ? '#F3F0E8' : '#8C93A6'}>{c}</text>
              <rect className="growx" style={d(8 + i)} x="90" y="5" width={v * 800} height="22" fill={c === 'Omega' ? '#D9363E' : '#4A5168'} />
              <text x={100 + v * 800} y="22" fontSize="16" fontFamily={M} fill="#F3F0E8">{dec(v, 2)}</text>
            </g>
          ))}
        </svg>
        <div style={{ borderTop: '1px solid rgba(243,240,232,.16)', marginTop: 16, paddingTop: 16 }}>
          <div className="lbl">Dividendos (% del resultado anterior)</div>
          <div className="mono" style={{ fontSize: 22, marginTop: 8 }}>80 · 50 · 50 · 30 · 20</div>
          <div className="lbl" style={{ marginTop: 18 }}>Rentabilidad sobre patrimonio (ROE)</div>
          <div className="big" style={{ fontSize: 44, marginTop: 8 }}>7,1% <span className="muted" style={{ fontSize: 26 }}>→</span> <span style={{ color: '#35D0E8' }}>21,9%</span></div>
        </div>
        <div style={{ borderTop: '1px solid rgba(243,240,232,.16)', marginTop: 18, paddingTop: 14, fontSize: 17, lineHeight: 1.4, color: '#B9BECB' }}>
          La planilla de cash flow cierra 2030 en $417.768, pero la caja del balance es de $31,3M: el modelo descuenta la depreciación, que no es salida de dinero.
        </div>
      </Box>
    </>
  );
}
