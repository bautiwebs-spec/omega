import type { ReactNode } from 'react';
import { Box, Eyebrow, Source } from '../components/ui';
import {
  SHORT, YEARS, capacidad, cashflow, competencia2030, costoUnitario, dec, margenProducto, marcaLinea, money, n, nivelesInnov,
  parametros, precios, presupuestos, produccionCargada, referencia, serie, unidadesMercado, valorCompetencia,
} from '../data';

function A({ code, title, src, children, note }: { code: string; title: string; src: string; children: ReactNode; note?: ReactNode }) {
  return (
    <>
      <Eyebrow acc={`Anexo ${code}`} rest="Respaldo técnico" />
      <Source>{src}</Source>
      <h2 className="title" style={{ fontSize: 46, top: 140, width: 1500 }}>{title}</h2>
      <Box x={120} y={240} w={1680}>{children}</Box>
      {note && <Box x={120} y={990} w={1680} className="lbl" style={{ fontSize: 15 }}>{note}</Box>}
    </>
  );
}
const H = ({ cols }: { cols: string[] }) => <thead><tr>{cols.map((c, i) => <th key={i}>{c}</th>)}</tr></thead>;

export const A1 = () => (
  <A code="A1" title="Precios por producto y mercado (TP / PE / DH)" src="Diagnóstico · Planes 1–5 §3–§4 · Informes 1–3, 5 §3d" note={`Referencia Japón ${referencia.japon} · referencia USA ${referencia.usa}. En P3–P5 USA tiene más de un competidor; se listan los precios informados.`}>
    <table className="t" style={{ fontSize: 20 }}>
      <H cols={['Período', 'OMEGA Japón', 'Delta Japón', 'OMEGA USA', 'Competencia USA']} />
      <tbody>{precios.map((p) => <tr key={p.p}><td>{p.p}</td><td><b>{p.jp}</b></td><td>{p.delta}</td><td><b>{p.usa}</b></td><td>{p.compUsa}</td></tr>)}</tbody>
    </table>
    <div className="small" style={{ marginTop: 28, maxWidth: 1500, color: '#3D3C38' }}>
      Cambios de precio: P1 TP Japón +4,4% (228 → 238). P2 entrada a USA entre Gama y la referencia. P4 subas de 3% a 5% (TP 250, DH 705; USA 205 / 61 / 660). P5 PE Japón 74 → 72 para igualar a Delta.
    </div>
  </A>
);

export const A2 = () => (
  <A code="A2" title="Presupuestos de promoción, innovación, tecnología y capacitación" src="Planes 1–5 §4–§7, §10 · Informes 1, 2, 3, 5 §2" note="Montos en miles de $. Promoción TP / PE / DH. Segmentos = prioridad Innovadores / Ahorradores / Conservadores. Delegación comercial USA: instalada solo en P5 ($294.157).">
    <table className="t" style={{ fontSize: 19 }}>
      <H cols={['Período', 'Promoción Japón', 'Promoción USA', 'Promoción total', 'Innovación TP/PE/DH', 'Innov. total', 'Niveles innov.', 'Tecnología', 'Capacitación', 'Segmentos']} />
      <tbody>{presupuestos.map((p, i) => (
        <tr key={p.p}><td>{p.p}</td><td>{p.promoJp}</td><td>{p.promoUsa}</td><td><b>{n(p.promo)}</b></td><td>{p.innov}</td><td><b>{n(p.innovT)}</b></td><td>{nivelesInnov[i]}</td><td>{n(p.tec)}</td><td>{n(p.capac)}</td><td>{p.seg}</td></tr>
      ))}</tbody>
    </table>
    <div className="small" style={{ marginTop: 28, color: '#3D3C38' }}>
      Mínimos del manual citados en Plan 1: innovación TP 392.000 · PE 546.250 · DH 780.000 (con adicional); tecnología 525.000 (630.000 con adicional). Techo de gasto P1 $9.660.647 · P2 $10.855.502.
    </div>
  </A>
);

export const A3 = () => (
  <A code="A3" title="Producción, capacidad instalada y cobertura de la demanda" src="Planes 1–5 (Producción) · Informes 1–5 §3b, §4e" note="Cobertura = ventas / demanda estimada propia (informe interno Análisis Demanda Estimada vs Ventas). 2025: solo se informa TP.">
    <table className="t" style={{ fontSize: 19 }}>
      <H cols={['Período', 'Fábricas', 'Capacidad TP / PE / DH', 'Cargado TP', 'Cargado PE', 'Cargado DH', 'Ocupación', 'Cobertura TP / PE / DH', 'Nota']} />
      <tbody>{produccionCargada.map((p, i) => (
        <tr key={p.p}>
          <td>{p.p}</td><td>{serie.fabricas[i]}</td><td>{n(capacidad.TP[i])} / {n(capacidad.PE[i])} / {n(capacidad.DH[i])}</td>
          <td>{p.TP}</td><td>{p.PE}</td><td>{p.DH}</td><td>{dec(serie.ocupacion[i], 1)}%</td>
          <td>{(['TP', 'PE', 'DH'] as const).map((k) => capacidad.cobertura[k][i] ?? '—').join(' / ')}</td>
          <td style={{ whiteSpace: 'normal', textAlign: 'left', fontSize: 16 }}>{p.nota}</td>
        </tr>
      ))}</tbody>
    </table>
  </A>
);

export const A4 = () => (
  <A code="A4" title="Unidades, ingresos y marca por mercado" src="Diagnóstico · Informes 1, 2, 3, 5 §3c" note="Marca por línea TP / PE / DH. Participación de OMEGA en unidades de Japón: 42,9% (2025) · 44,5% · 48,9% · 46,8% · 40% · 49% (2030).">
    <table className="t" style={{ fontSize: 19 }}>
      <H cols={['', ...SHORT]} />
      <tbody>
        {(['TP', 'PE', 'DH'] as const).map((k) => <tr key={'j' + k}><td>Japón · {k}</td>{unidadesMercado.japon[k].map((v, i) => <td key={i}>{n(v)}</td>)}</tr>)}
        <tr className="tot"><td>Japón · total</td>{unidadesMercado.japonTotal.map((v, i) => <td key={i}>{n(v)}</td>)}</tr>
        {(['TP', 'PE', 'DH'] as const).map((k) => <tr key={'u' + k}><td>USA · {k}</td>{unidadesMercado.usa[k].map((v, i) => <td key={i}>{v ? n(v) : '—'}</td>)}</tr>)}
        <tr className="tot"><td>USA · total</td>{unidadesMercado.usaTotal.map((v, i) => <td key={i}>{v ? n(v) : '—'}</td>)}</tr>
        <tr><td>Ingresos Japón</td>{unidadesMercado.ingresosJapon.map((v, i) => <td key={i}>{money(v)}</td>)}</tr>
        <tr><td>Ingresos USA</td>{unidadesMercado.ingresosUSA.map((v, i) => <td key={i}>{v ? money(v) : '—'}</td>)}</tr>
        <tr><td>Marca Japón</td>{marcaLinea.japon.map((v, i) => <td key={i}>{v}</td>)}</tr>
        <tr><td>Marca USA</td>{marcaLinea.usa.map((v, i) => <td key={i}>{v}</td>)}</tr>
      </tbody>
    </table>
  </A>
);

export const A5 = () => (
  <A code="A5" title="Resultados económicos, costo unitario y margen por producto" src="Diagnóstico §4 · Informes 1–5 §3b, §3e, §3g · Plan 5 §0" note="Impuesto efectivo ≈26%: resultado después = antes × 0,74 (verificado en los seis años). En las comparaciones del sector, los informes llaman 'resultado neto' al resultado antes de impuestos.">
    <table className="t" style={{ fontSize: 18 }}>
      <H cols={['', ...SHORT]} />
      <tbody>
        <tr><td>Ingresos</td>{serie.ingresos.map((v, i) => <td key={i}>{money(v)}</td>)}</tr>
        <tr><td>Resultado operativo</td>{serie.resOperativo.map((v, i) => <td key={i}>{money(v)}</td>)}</tr>
        <tr><td>Resultado antes de impuestos</td>{serie.resAntesImp.map((v, i) => <td key={i}>{money(v)}</td>)}</tr>
        <tr className="tot"><td>Resultado después de impuestos</td>{serie.resNeto.map((v, i) => <td key={i}>{money(v)}</td>)}</tr>
        <tr><td>Margen sobre ingresos</td>{serie.margen.map((v, i) => <td key={i}>{v}%</td>)}</tr>
        <tr><td>Rentabilidad s/ patrimonio</td>{serie.roe.map((v, i) => <td key={i}>{dec(v, 1)}%</td>)}</tr>
        <tr><td>Costo unitario TP / PE / DH</td>{SHORT.map((_, i) => <td key={i}>{dec(costoUnitario.TP[i + 1], 1)} / {dec(costoUnitario.PE[i + 1], 1)} / {dec(costoUnitario.DH[i + 1], 1)}</td>)}</tr>
        <tr><td>Margen TP / PE / DH</td>{SHORT.map((_, i) => <td key={i}>{dec(margenProducto.TP[i], 1)} / {dec(margenProducto.PE[i], 1)} / {dec(margenProducto.DH[i], 1)}</td>)}</tr>
      </tbody>
    </table>
    <div className="small" style={{ marginTop: 22, color: '#3D3C38' }}>Margen por unidad 2028 (Plan 4 §1): TP ≈ $120 · PE ≈ $43 · DH ≈ $295. DomoHogar 2030: $56.053.455 (49% de los ingresos). Costo unitario 2024: 131,1 / 32,0 / 450,3.</div>
  </A>
);

export const A6 = () => (
  <A code="A6" title="Cash flow (planilla de la cátedra) y caja del balance" src="CASH_FLOW_OMEGA_DESPUES_DE_DECISION_5.xlsx, hoja Cash Flow Detallado, columnas C–G · Informes §3f" note="La planilla es un modelo contable: descuenta la depreciación dentro de fabricación (no es salida de dinero) y la implantación estimada de $733.125. Por eso difiere de la caja real del balance.">
    <table className="t" style={{ fontSize: 17 }}>
      <H cols={['Concepto', ...cashflow.anios]} />
      <tbody>
        {cashflow.filas.map((f) => <tr key={f.k}><td>{f.k}</td>{f.v.map((v, i) => <td key={i}>{v ? n(v) : '—'}</td>)}</tr>)}
        <tr className="tot"><td>Flujo del año (33)</td>{cashflow.flujo.map((v, i) => <td key={i} className={v < 0 ? 'neg' : ''}>{n(v)}</td>)}</tr>
        <tr><td>Préstamo largo plazo (39)</td>{cashflow.prestamo.map((v, i) => <td key={i}>{v ? n(v) : '—'}</td>)}</tr>
        <tr><td>Saldo final planilla (40)</td>{cashflow.saldoFinal.map((v, i) => <td key={i}>{n(v)}</td>)}</tr>
        <tr className="hi"><td><b>Caja real del balance</b></td>{cashflow.cajaBalance.map((v, i) => <td key={i}><b>{n(v)}</b></td>)}</tr>
      </tbody>
    </table>
  </A>
);

export const A7 = () => (
  <A code="A7" title="Endeudamiento, inversiones, financiamiento y dividendos" src="Informes 1–5 §3f · Plan 2 §1.2, §8 · Plan 5 §1, §8 · planillas" note="Patrimonio 2029 y préstamo 2029 derivados (≈): préstamo 2028 − amortización 2029 ($1.656.436, celda F20); patrimonio 2030 / 1,233.">
    <table className="t" style={{ fontSize: 19 }}>
      <H cols={['', ...SHORT]} />
      <tbody>
        <tr className="hi"><td><b>Ratio de endeudamiento</b></td>{serie.endeudamiento.map((v, i) => <td key={i}><b>{dec(v, 2)}</b></td>)}</tr>
        <tr><td>Caja (balance)</td>{serie.caja.map((v, i) => <td key={i}>{money(v)}</td>)}</tr>
        <tr><td>Préstamo largo plazo</td>{serie.prestamoLP.map((v, i) => <td key={i}>{i === 4 ? '≈' : ''}{money(v)}</td>)}</tr>
        <tr><td>Patrimonio neto</td>{serie.patrimonio.map((v, i) => <td key={i}>{v == null ? '—' : (i === 4 ? '≈$69,5M' : money(v))}</td>)}</tr>
        <tr><td>Gastos financieros</td>{serie.gastosFin.map((v, i) => <td key={i}>{money(v)}</td>)}</tr>
        <tr><td>Dividendos (% s/ resultado previo)</td>{serie.dividendos.map((v, i) => <td key={i}>{v}%</td>)}</tr>
      </tbody>
    </table>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, marginTop: 30, fontSize: 19, lineHeight: 1.45 }}>
      <div><b>Inversión P2 (2027):</b> HighTechnology USA $31.455.000 (Planta y Equipos 80.666.404 → 112.121.404). Préstamo LP $20.000.000 al 6,3% a 12 años (tope del banco $25M). Alternativas: HT Japón $32.833.202 · Allin One México $16.537.500.</div>
      <div><b>Inversión P5 (2030):</b> segunda HighTechnology USA $31.455.000 (→ 143.576.404), pagada con caja propia. Implantación estimada $733.125 (podía ser hasta 50% menor). Dividendos 30% → 20%.</div>
    </div>
  </A>
);

export const A8 = () => (
  <A code="A8" title="Competencia y parámetros del Valor de la Compañía" src="Informes 1, 2, 3, 5 §3a, §3d · Plan 5 §0" note="Beta penalizada en 2028 (×0,95) y en 2030 (×0,99). La suma simple de los parámetros no coincide exactamente con el valor informado, por eso se muestran como componentes.">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
      <div>
        <div className="lbl" style={{ marginBottom: 10 }}>VALOR DE LA COMPAÑÍA</div>
        <table className="t" style={{ fontSize: 18 }}>
          <H cols={['', ...SHORT]} />
          <tbody>{Object.entries(valorCompetencia).map(([c, v]) => <tr key={c} className={c === 'Omega' ? 'hi' : ''}><td>{c}</td>{v.map((x, i) => <td key={i}>{n(x)}</td>)}</tr>)}</tbody>
        </table>
        <div className="lbl" style={{ margin: '28px 0 10px' }}>SECTOR 2030 (RESULTADO ANTES DE IMPUESTOS)</div>
        <table className="t" style={{ fontSize: 18 }}>
          <H cols={['', 'Ingresos', 'Resultado', 'Margen', 'Deuda']} />
          <tbody>{competencia2030.map((c) => <tr key={c.cia} className={c.cia === 'Omega' ? 'hi' : ''}><td>{c.cia}</td><td>{money(c.ingresos)}</td><td>{money(c.resultado)}</td><td>{c.margen == null ? '—' : c.margen + '%'}</td><td>{dec(c.deuda, 2)}</td></tr>)}</tbody>
        </table>
      </div>
      <div>
        <div className="lbl" style={{ marginBottom: 10 }}>PARÁMETROS DE OMEGA (PUNTOS)</div>
        <table className="t" style={{ fontSize: 18 }}>
          <H cols={['Parámetro (peso)', 'P1', 'P2', 'P3', 'P4', 'P5', 'Beta P5']} />
          <tbody>{parametros.map((p) => <tr key={p.nombre}><td>{p.nombre} ({p.peso}%)</td>{p.omega.map((v, i) => <td key={i}>{n(v)}</td>)}<td>{n(p.beta2030)}</td></tr>)}</tbody>
        </table>
        <div className="small" style={{ marginTop: 22, color: '#3D3C38', fontSize: 18 }}>Indicadores de gestión del diagnóstico: valor, marca, unidades, participación, margen, resultado neto, innovación, endeudamiento (pasivo / patrimonio), inventario sobre ventas y ocupación de fábricas.</div>
      </div>
    </div>
  </A>
);

export const ANNEX_YEARS = YEARS;
