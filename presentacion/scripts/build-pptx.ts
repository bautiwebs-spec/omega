// Genera la versión editable en PowerPoint con formas, tablas y gráficos nativos.
// Las coordenadas se escriben en px del lienzo 1920×1080 y se convierten a pulgadas (÷144).
import PptxGenJS from 'pptxgenjs';
import path from 'node:path';
import {
  SHORT, TEAM, capacidad, cashflow, competencia2030, costoUnitario, margenProducto, marcaLinea, n, money, dec,
  nivelesInnov, parametros, precios, presupuestos, produccionCargada, referencia, serie, unidadesMercado, valorCompetencia,
} from '../src/data';
import { NOTAS } from '../src/notes';

const C = {
  night: '0A0F1E', graphite: '141B2D', paper: 'F3F0E8', paper2: 'E9E5DA', ink: '0E1424', ink2: '3D3C38',
  mute: '77746C', muteD: '8C93A6', line: 'D9D4C7', omega: '2F5BFF', omegaD: '5B82FF', cyan: '35D0E8',
  dec: 'F2602F', beta: 'B5AE9F', others: 'C9C4B9', risk: 'D9363E', white: 'F3F0E8',
};
const F = 'Arial';
const p = (v: number) => v / 144; // px → in
const pt = (px: number) => Math.round(px * 0.5 * 10) / 10; // px (lienzo 1920) → pt

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = TEAM.join(', ');
pptx.title = 'OMEGA · Cinco decisiones. Una estrategia.';

type S = PptxGenJS.Slide;
type Theme = 'light' | 'dark' | 'paper2' | 'graphite';
const isDark = (t: Theme) => t === 'dark' || t === 'graphite';
const bg = (t: Theme) => ({ light: C.paper, paper2: C.paper2, dark: C.night, graphite: C.graphite })[t];

function txt(s: S, text: string | PptxGenJS.TextProps[], x: number, y: number, w: number, h: number, o: PptxGenJS.TextPropsOptions = {}) {
  s.addText(text as any, { x: p(x), y: p(y), w: p(w), h: p(h), fontFace: F, margin: 0, valign: 'top', ...o });
}
function rect(s: S, x: number, y: number, w: number, h: number, color: string, line?: string) {
  s.addShape(pptx.ShapeType.rect, { x: p(x), y: p(y), w: p(Math.max(w, 1)), h: p(Math.max(h, 1)), fill: { color }, line: line ? { color: line, width: 1 } : { type: 'none' } as any });
}
function hline(s: S, x: number, y: number, w: number, color: string, wpt = 1) {
  s.addShape(pptx.ShapeType.line, { x: p(x), y: p(y), w: p(w), h: 0, line: { color, width: wpt } });
}

function base(t: Theme, eyebrow: { num?: string; acc?: string; rest: string }, source?: string) {
  const s = pptx.addSlide();
  s.background = { color: bg(t) };
  const dk = isDark(t);
  const runs: PptxGenJS.TextProps[] = [];
  if (eyebrow.num) runs.push({ text: eyebrow.num + '  ', options: { color: C.dec, bold: true } });
  if (eyebrow.acc) runs.push({ text: eyebrow.acc + '  ', options: { color: dk ? C.cyan : C.omega, bold: true } });
  runs.push({ text: '·  ' + eyebrow.rest.toUpperCase(), options: { color: dk ? C.muteD : C.mute } });
  txt(s, runs, 120, 84, 1100, 30, { fontSize: 10, charSpacing: 3 });
  if (source) txt(s, 'Fuente: ' + source, 1180, 86, 620, 40, { fontSize: 7.5, color: dk ? C.muteD : C.mute, align: 'right' });
  return s;
}
function title(s: S, t: Theme, main: string, sub = '', w = 1560, size = 60) {
  const dk = isDark(t);
  txt(s, [
    { text: main + (sub ? ' ' : ''), options: { color: dk ? C.white : C.ink } },
    ...(sub ? [{ text: sub, options: { color: dk ? C.muteD : C.mute } }] : []),
  ], 120, 140, w, 150, { fontSize: pt(size), bold: false, lineSpacingMultiple: 0.95 });
}
function thread(s: S, t: Theme, now: number) {
  const dk = isDark(t);
  const x0 = 120, w = 1680, y = 994;
  hline(s, x0, y, w, dk ? '3A4156' : 'CFC9BA', 1.5);
  hline(s, x0, y, (w * now) / 5, C.omega, 1.5);
  SHORT.forEach((lab, i) => {
    const cx = x0 + (w * i) / 5;
    const col = i === now ? C.dec : i < now ? C.omega : bg(t);
    s.addShape(pptx.ShapeType.ellipse, { x: p(cx - 8), y: p(y - 8), w: p(16), h: p(16), fill: { color: col }, line: { color: i <= now ? col : (dk ? '5A6176' : 'B9B3A6'), width: 1.25 } });
    txt(s, lab, cx - 40, y + 16, 80, 20, { fontSize: 7, align: 'center', color: i === now ? C.dec : dk ? C.muteD : C.mute, bold: i === now });
  });
}
function concepts(s: S, t: Theme, items: string[], y = 952) {
  txt(s, [{ text: 'CONCEPTOS  ·  ', options: { color: isDark(t) ? C.muteD : C.mute } }, { text: items.join('  ·  ').toUpperCase(), options: { color: isDark(t) ? C.white : C.ink, bold: true } }], 120, y, 1600, 22, { fontSize: 7.5, charSpacing: 1.5 });
}
function kpi(s: S, t: Theme, x: number, y: number, w: number, label: string, value: string, note = '', color?: string, size = 64) {
  const dk = isDark(t);
  txt(s, label, x, y, w, 24, { fontSize: 8.5, color: dk ? C.muteD : C.mute });
  txt(s, value, x, y + 28, w, size * 1.15, { fontSize: pt(size), bold: true, color: color ?? (dk ? C.white : C.ink) });
  if (note) txt(s, note, x, y + 34 + size * 1.15, w, 40, { fontSize: 8.5, color: dk ? C.muteD : C.mute });
}
function notes(s: S, id: string) {
  const nt = NOTAS.find((x) => x.id === id);
  if (!nt) return;
  const lines = [
    'OBJETIVO: ' + nt.objetivo, '', 'QUÉ DECIR:', ...nt.decir.map((d) => '• ' + d), '',
    'DATOS CLAVE: ' + nt.datos.join(' · '), '', 'CONCEPTOS: ' + nt.conceptos.join(', '), '',
    'PREGUNTAS PROBABLES:', ...nt.preguntas.flatMap((q) => ['P: ' + q.q, 'R: ' + q.a]),
  ];
  s.addNotes(lines.join('\n'));
}
function tableRows(s: S, t: Theme, rows: (string | number)[][], x: number, y: number, colW: number[], o: { fontSize?: number; hiRow?: number; hiCol?: number; boldCol0?: boolean; rowH?: number; left?: boolean } = {}) {
  const dk = isDark(t);
  const fs = o.fontSize ?? 10;
  const data: PptxGenJS.TableRow[] = rows.map((r, ri) => r.map((c, ci) => ({
    text: String(c),
    options: {
      fontFace: F, fontSize: ri === 0 ? fs - 2.5 : fs, color: ri === 0 ? (dk ? C.muteD : C.mute) : (dk ? C.white : C.ink),
      bold: ri === o.hiRow || (ci === o.hiCol && ri > 0) || (o.boldCol0 && ci === 0 && ri > 0),
      align: ci === 0 || o.left ? 'left' : 'right', valign: 'middle',
      fill: { color: ri === o.hiRow ? (dk ? '1D2640' : 'E4E5EC') : ci === o.hiCol && ri > 0 ? (dk ? '1D2640' : 'E2E6F5') : bg(t) },
      border: [{ type: 'none' }, { type: 'none' }, { pt: ri === 0 ? 1.5 : 0.5, color: ri === 0 ? (dk ? C.white : C.ink) : (dk ? '2A3248' : C.line) }, { type: 'none' }] as any,
      margin: [0.04, 0.06, 0.04, 0.06],
    },
  })));
  s.addTable(data, { x: p(x), y: p(y), colW: colW.map(p), rowH: p(o.rowH ?? 40) });
}
const axisTxt = (dk: boolean) => ({ catAxisLabelColor: dk ? C.muteD : C.mute, valAxisLabelColor: dk ? C.muteD : C.mute, catAxisLabelFontFace: F, valAxisLabelFontFace: F, catAxisLabelFontSize: 9, valAxisLabelFontSize: 8, catAxisLineShow: true, catAxisLineColor: dk ? '3A4156' : 'B9B3A6', valGridLine: { color: dk ? '232B40' : 'E2DDD0', size: 0.5 }, valAxisLineShow: false } as any);

/* ================= SLIDES ================= */

// 1 Portada
{
  const t: Theme = 'dark';
  const s = base(t, { acc: 'Simulación Empresarial', rest: 'Examen final · Compañía OMEGA' });
  txt(s, '2025 — 2030', 1500, 84, 300, 30, { fontSize: 10, color: C.muteD, align: 'right', charSpacing: 3 });
  txt(s, 'Ω', 112, 230, 400, 300, { fontSize: 150, bold: true, color: C.white });
  txt(s, [{ text: 'Cinco decisiones.\n', options: { color: C.white } }, { text: 'Una estrategia.', options: { color: C.muteD } }], 120, 520, 960, 260, { fontSize: 52, lineSpacingMultiple: 0.95 });
  txt(s, TEAM.join(' · '), 120, 940, 1000, 30, { fontSize: 12, color: 'C8CCD6' });
  s.addChart(pptx.ChartType.line, [{ name: 'Valor OMEGA', labels: [...SHORT], values: serie.valor }], {
    x: p(1000), y: p(440), w: p(820), h: p(500), lineSize: 2.5, chartColors: [C.omegaD], lineDataSymbol: 'circle', lineDataSymbolSize: 7,
    showValue: false, valAxisMinVal: 3000, valAxisMaxVal: 3900, valAxisHidden: true, ...axisTxt(true), valGridLine: { style: 'none' } as any,
    showTitle: false, showLegend: false,
  });
  txt(s, 'Valor de la compañía: 3.139 → 3.847 puntos', 1010, 950, 800, 24, { fontSize: 8.5, color: C.muteD });
  notes(s, 'portada');
}

// 2 Empresa recibida
{
  const t: Theme = 'light';
  const s = base(t, { acc: 'Acto 1', rest: 'El punto de partida · 2025' }, 'Diagnóstico §1, §4, §5 · Plan 1 §0');
  title(s, t, 'Recibimos la marca y la tecnología más altas del sector,', 'en la compañía más chica y con un solo mercado.');
  const f: [string, string, string?][] = [
    ['1', 'mercado: Japón y Corea, el 100% de los ingresos', C.risk], ['2', 'fábricas HighTechnology, las dos en Japón'],
    ['13,0%', 'de las unidades del sector: la más chica', C.risk], ['$48,3M', 'de ingresos · margen 45%, el 2° del sector'],
    ['55', 'valor de marca: la más alta del sector', C.omega], ['7', 'tecnología industrial: la más alta del sector', C.omega],
    ['0,22', 'endeudamiento: el más bajo del sector', C.omega], ['3.139', 'valor de la compañía: igual para las cinco'],
  ];
  f.forEach(([v, l, c], i) => {
    const x = 120 + (i % 4) * 250, y = 370 + Math.floor(i / 4) * 230;
    hline(s, x, y, 222, C.ink, 1.5);
    txt(s, v, x, y + 16, 240, 80, { fontSize: 32, bold: true, color: c ?? C.ink });
    txt(s, l, x, y + 100, 222, 80, { fontSize: 10, color: C.ink2 });
  });
  txt(s, 'QUÉ NECESITÁBAMOS CAMBIAR', 1200, 362, 600, 24, { fontSize: 9, color: C.dec, charSpacing: 2.5 });
  const g: [string, string][] = [
    ['01  Capacidad desbalanceada', 'Ocupación TP 99% · PE 95,7% · DH 66,7%. TecnoPersonal cubría solo el 54% de su demanda: ≈53.000 unidades sin atender.'],
    ['02  Innovación estancada', 'Pequeño Electrodoméstico y DomoHogar en nivel 4, bajo la referencia de Japón (5), con presupuestos debajo del mínimo del manual.'],
    ['03  Un solo mercado, y perdiendo terreno', 'Participación en Japón de 49% a 43%: el mercado creció 19,5% y nuestros ingresos 7,3%. El freno fue la capacidad.'],
  ];
  g.forEach(([h, b], i) => {
    txt(s, h, 1200, 410 + i * 175, 600, 34, { fontSize: 13, bold: true, color: C.ink });
    txt(s, b, 1200, 452 + i * 175, 600, 110, { fontSize: 10, color: C.ink2 });
  });
  concepts(s, t, ['Análisis interno', 'Capacidad instalada', 'Participación de mercado', 'Indicadores de gestión'], 990);
  notes(s, 'empresa');
}

// 3 Diagnóstico
{
  const t: Theme = 'paper2';
  const s = base(t, { acc: 'Acto 1', rest: 'Diagnóstico estratégico' }, 'Diagnóstico §1 (PESTEL, FODA), §3 (Porter), §6 (5 fuerzas)');
  title(s, t, 'Estrategia de diferenciación:', 'competir con marca, tecnología e innovación, no con precio.');
  const q: [string, string, string[]][] = [
    ['Fortalezas', C.omega, ['Marca 55: la más alta del sector', 'Tecnología 7, dos fábricas HighTechnology', 'Endeudamiento 0,22: el más bajo', 'Resultado antes de impuestos +153% en 2025']],
    ['Oportunidades', C.omega, ['Japón: el sector cubrió solo el 85,2% de la demanda', 'USA y Canadá: renta 40.400 y 24% sin cubrir', 'Innovadores + Conservadores: 43% en Japón', 'Capacidad ociosa en DomoHogar (≈13.700 u.)']],
    ['Debilidades', C.risk, ['100% de los ingresos en Japón y Corea', '13,0% de las unidades: la más chica', 'TecnoPersonal al 99%, DomoHogar al 66,7%', 'Innovación 5,0 sin crecer; capacidades 7,7 → 7,1']],
    ['Amenazas', C.risk, ['Delta más barata (224 / 68 / 680) y margen 49%', 'Beta vende 2,6 veces más unidades', 'Flete caro desde Japón: UE cat. 5, USA cat. 3', 'Referencia de innovación TP ya en 7']],
  ];
  q.forEach(([h, c, it], i) => {
    const x = 120 + (i % 2) * 630, y = 318 + Math.floor(i / 2) * 258;
    rect(s, x, y, 610, 236, C.paper);
    rect(s, x, y, 610, 5, c);
    txt(s, h, x + 24, y + 22, 400, 34, { fontSize: 13.5, bold: true, color: C.ink });
    txt(s, i % 2 ? 'EXTERNO' : 'INTERNO', x + 440, y + 26, 146, 20, { fontSize: 7, color: C.mute, align: 'right', charSpacing: 2 });
    txt(s, it.map((x) => ({ text: x, options: { breakLine: true } })), x + 24, y + 70, 570, 160, { fontSize: 10, color: C.ink, paraSpaceAfter: 5 });
  });
  txt(s, 'Cinco fuerzas', 1420, 318, 380, 34, { fontSize: 13.5, bold: true, color: C.ink });
  const fz: [string, string][] = [['Rivalidad entre competidores', 'Alta'], ['Poder de los proveedores', 'Media-alta'], ['Poder de los compradores', 'Media'], ['Productos sustitutos', 'Baja-media'], ['Nuevos competidores', 'Baja']];
  fz.forEach(([a, b], i) => txt(s, [{ text: a + '\n', options: { color: C.ink } }, { text: b, options: { color: C.omega, bold: true } }], 1420, 372 + i * 76, 380, 64, { fontSize: 10 }));
  txt(s, 'Competir por precio contra Delta, con mejores costos, era perder la ventaja de la marca.', 1420, 760, 380, 90, { fontSize: 9.5, color: C.ink2 });
  const pe: [string, string][] = [['POLÍTICO', 'Toda la operación en Japón: expuesta al proteccionismo'], ['ECONÓMICO', 'Alto poder adquisitivo, pero dependencia del 100%'], ['SOCIAL', 'Más tecnología en los hogares; 43% valora la marca'], ['TECNOLÓGICO', 'IA, IoT y domótica: exige invertir en innovación'], ['ECOLÓGICO', 'Eficiencia energética: favorece a las HighTechnology'], ['LEGAL', 'Regulación e impuestos de cada país donde se produce']];
  hline(s, 120, 886, 1680, C.ink, 1.5);
  pe.forEach(([a, b], i) => txt(s, [{ text: a + '\n', options: { color: C.omega, fontSize: 7.5, charSpacing: 2 } }, { text: b, options: { color: C.ink2, fontSize: 8.5 } }], 120 + i * 283, 900, 265, 90, {}));
  notes(s, 'diagnostico');
}

// 4 Cinco decisiones
{
  const t: Theme = 'dark';
  const s = base(t, { acc: 'Acto 2', rest: 'Cinco períodos, cinco decisiones' }, 'Informes 1, 2, 3, 5 §3 · Plan 5 §0');
  title(s, t, 'En cada período la demanda superó a nuestra capacidad.', 'Cada decisión fue una forma distinta de resolverlo.');
  txt(s, 'Punto de partida 2025 · valor 3.139 · 2 fábricas · endeudamiento 0,22', 120, 350, 1200, 24, { fontSize: 9, color: C.muteD });
  hline(s, 120, 420, 1680, C.omegaD, 1.5);
  const cp = [
    ['2026', 'Optimizar antes de expandir', 'Precio, innovación y tecnología en Japón; usar la capacidad ociosa de DomoHogar.', '3.483', '2°', '2', '0,22'],
    ['2027', 'La expansión', 'Fábrica HighTechnology en USA y entrada a USA y Canadá, con un préstamo de $20M.', '3.560', '2°', '3', '0,61'],
    ['2028', 'Consolidar y corregir', 'El mismo gasto, reasignado de promoción a innovación y tecnología.', '3.769', '1°', '3', '0,52'],
    ['2029', 'Rentabilidad y eficiencia', 'Precios +3% a 5%, tecnología a mantenimiento, más utilidades retenidas.', '3.829', '2°', '3', '0,42'],
    ['2030', 'La decisión final', 'Segunda planta en USA pagada con caja propia, sin deuda nueva.', '3.847', '2°', '4', '0,35'],
  ];
  cp.forEach(([y, h, d, v, r, f, e], i) => {
    const x = 120 + i * 336;
    s.addShape(pptx.ShapeType.ellipse, { x: p(x), y: p(412), w: p(16), h: p(16), fill: { color: i === 1 ? C.dec : C.omegaD }, line: { type: 'none' } as any });
    txt(s, [{ text: `0${i + 1}`, options: { color: C.dec, bold: true } }, { text: '  ·  ' + y, options: { color: C.muteD } }], x, 452, 300, 24, { fontSize: 9 });
    txt(s, h, x, 486, 300, 80, { fontSize: 15.5, bold: true, color: C.white });
    txt(s, d, x, 576, 300, 130, { fontSize: 10, color: 'B9BECB' });
    hline(s, x, 724, 300, '2A3248', 0.75);
    txt(s, 'Valor · puesto', x, 744, 300, 20, { fontSize: 8.5, color: C.muteD });
    txt(s, [{ text: v + ' ', options: { color: C.white, fontSize: 29, bold: true } }, { text: r, options: { color: r === '1°' ? C.dec : C.muteD, fontSize: 15, bold: true } }], x, 770, 320, 70, {});
    txt(s, [{ text: `Fábricas ${f} · Deuda `, options: { color: C.muteD } }, { text: e, options: { color: e === '0,61' ? C.risk : C.muteD } }], x, 856, 300, 24, { fontSize: 8.5 });
  });
  notes(s, 'decisiones');
}

// 5 P1 decisión
{
  const t: Theme = 'light';
  const s = base(t, { num: '01', rest: 'Período 1 · 2026 · Optimizar antes de expandir' }, 'Plan 1 §1–§9 · Informe 1 §2');
  title(s, t, 'Antes de salir, rentabilizar lo que teníamos:', 'no había producto libre para abastecer otro mercado.');
  txt(s, 'ALTERNATIVAS EVALUADAS', 120, 340, 560, 22, { fontSize: 8.5, color: C.mute, charSpacing: 2.5 });
  const al: [string, string, string, boolean][] = [
    ['DESCARTADA', 'Entrar ya a un mercado nuevo', 'TecnoPersonal al 99% y Pequeño Electrodoméstico al 95,7%: repartiríamos la misma producción. Sin datos propios era "jugado".', false],
    ['POSTERGADA', 'Construir una fábrica', 'Dónde vender define dónde producir. Compramos los informes de USA y UE ($70.000) para decidir en el P2.', false],
    ['ELEGIDA', 'Rentabilizar Japón', 'Ganar margen donde sobra demanda y llenar la capacidad ociosa de DomoHogar.', true],
  ];
  al.forEach(([tag, h, b, ok], i) => {
    const y = 382 + i * 185;
    hline(s, 120, y, 560, ok ? C.dec : C.line, ok ? 2.5 : 0.75);
    txt(s, tag, 120, y + 14, 140, 24, { fontSize: 7.5, bold: true, color: ok ? 'FFFFFF' : C.mute, fill: { color: ok ? C.dec : C.paper }, align: 'center', valign: 'middle' });
    txt(s, h, 120, y + 50, 560, 30, { fontSize: 12.5, bold: true, color: C.ink });
    txt(s, b, 120, y + 86, 560, 90, { fontSize: 9.5, color: C.ink2 });
  });
  txt(s, 'CINCO PALANCAS, SIN CONSTRUIR NADA', 780, 340, 1000, 22, { fontSize: 8.5, color: C.mute, charSpacing: 2.5 });
  tableRows(s, t, [
    ['PALANCA', 'ANTES → DESPUÉS', 'POR QUÉ'],
    ['Precio TecnoPersonal', '228 → 238', 'Demanda ≈ 2 veces la producción: se sube sin perder unidades'],
    ['Innovación PE / DH', '$430k / $350k → $600k / $850k', 'Superar el mínimo del manual para pasar de nivel 4 a 5'],
    ['Tecnología industrial', '$250k → $750k', 'Nivel 7 → 8 para bajar el costo unitario'],
    ['Promoción', '$3,72M → $4,60M', 'Reforzar las marcas más bajas: PE (52) y DH (55)'],
    ['Producción DomoHogar', '25.000 → 32.000 u.', 'Usar la planta que trabajaba al 66,7%'],
  ], 780, 376, [240, 330, 450], { fontSize: 10, boldCol0: true, rowH: 62, left: true });
  txt(s, [{ text: 'Plan ≠ ejecución: ', options: { color: C.dec, bold: true } }, { text: 'el plan proponía bajar los dividendos a 50%; se mantuvieron en 80%.', options: { color: C.mute } }], 780, 790, 1020, 26, { fontSize: 9 });
  concepts(s, t, ['Capacidad instalada', 'Precio según demanda', 'Costo unitario', 'Planificación estratégica']);
  thread(s, t, 1);
  notes(s, 'p1-decision');
}

// 6 P1 resultado
{
  const t: Theme = 'light';
  const s = base(t, { num: '01', rest: 'Período 1 · Resultados' }, 'Informe 1 §3a, §3b, §3c, §3g, §4e');
  title(s, t, '+10,98% de valor sin construir nada,', 'y llegamos al techo de capacidad.');
  kpi(s, t, 120, 330, 400, 'Valor de la compañía', '3.483', '+10,98% · 2°, a 30 puntos de Beta');
  kpi(s, t, 550, 330, 400, 'Resultado después de impuestos', '+38,5%', '$3,20M → $4,43M');
  kpi(s, t, 980, 330, 400, 'Valor de marca', '55 → 79', 'la más alta del sector', C.omega);
  kpi(s, t, 1410, 330, 400, 'Costo unitario (tecnología 7 → 8)', '−5,0% a −6,3%', 'ahorro ≈ $1,6M por $0,5M invertidos', undefined, 52);
  txt(s, 'DEMANDA PROPIA CUBIERTA POR LÍNEA, 2026 (%)', 120, 600, 900, 22, { fontSize: 8.5, color: C.mute, charSpacing: 2.5 });
  s.addChart(pptx.ChartType.bar, [{ name: 'Cubierta', labels: ['TecnoPersonal (≈38.000 sin atender)', 'Pequeño Electr. (≈72.000)', 'DomoHogar (≈6.000)'], values: [62, 74, 86] }], {
    x: p(110), y: p(630), w: p(920), h: p(220), barDir: 'bar', chartColors: [C.omega], valAxisMaxVal: 100, valAxisMinVal: 0, showValue: true, dataLabelFormatCode: '0"%"',
    dataLabelColor: C.ink, dataLabelFontSize: 9, ...axisTxt(false), catAxisOrientation: 'maxMin', showLegend: false, barGapWidthPct: 60,
  });
  txt(s, [{ text: '≈116.000 unidades sin atender: ', options: { color: C.dec, bold: true } }, { text: 'quedarse en Japón ya no alcanzaba para crecer.', options: { color: C.ink } }], 120, 866, 960, 30, { fontSize: 11 });
  txt(s, 'PROYECTADO VS. REALIZADO', 1140, 600, 660, 22, { fontSize: 8.5, color: C.mute, charSpacing: 2.5 });
  tableRows(s, t, [['', 'PLAN', 'RESULTADO'], ['Resultado', 'similar a 2025', '+38,5%'], ['DomoHogar', '32.000 u.', '35.574 u. (+28,1%)'], ['Caja', 'ajustada', '$2,6M → $10,1M'], ['Dividendos', '50%', '80% (sin cambio)']], 1140, 636, [190, 210, 260], { fontSize: 10, hiCol: 2, rowH: 50 });
  thread(s, t, 1);
  notes(s, 'p1-resultado');
}

// 7 P2 selección
{
  const t: Theme = 'light';
  const s = base(t, { num: '02', rest: 'Período 2 · 2027 · La expansión' }, 'Plan 1 §1.2 · Plan 2 §1.1–§1.3');
  title(s, t, 'USA y Canadá: el mercado que mejor paga la diferenciación,', 'con la fábrica en destino.');
  txt(s, 'SELECCIÓN DEL MERCADO', 120, 340, 600, 22, { fontSize: 8.5, color: C.mute, charSpacing: 2.5 });
  tableRows(s, t, [
    ['CRITERIO', 'USA Y CANADÁ', 'UE OCCIDENTAL', 'JAPÓN (ACTUAL)'],
    ['Renta per cápita', '40.400', '28.100', '28.570'],
    ['Innovadores + Conservadores', '55%', '44%', '43%'],
    ['Penetración del sector', '61% – 64%', '65% – 82%', '69% – 85%'],
    ['Sin atender TP / PE / DH (miles)', '34,7 / 118,4 / 17,7', '26,8 / 127,4 / 7,3', '57,4 / 96,4 / 11,9'],
    ['Flete desde Japón', 'Categoría 3', 'Categoría 5', 'Categoría 1'],
    ['Competidores', '1 (Gama)', '2', '2 (Omega, Delta)'],
    ['Precio de referencia', '200 / 60 / 650', '215 / 60 / 630', '260 / 70 / 720'],
  ], 120, 376, [330, 230, 210, 230], { fontSize: 10, hiCol: 1, rowH: 54 });
  txt(s, 'DÓNDE CONSTRUIR · INVERSIÓN ($M)', 1200, 340, 600, 22, { fontSize: 8.5, color: C.mute, charSpacing: 2.5 });
  s.addChart(pptx.ChartType.bar, [{ name: 'Inversión', labels: ['HighTechnology · USA', 'HighTechnology · Japón', 'Allin One · México'], values: [31.455, 32.833, 16.538] }], {
    x: p(1190), y: p(370), w: p(610), h: p(240), barDir: 'bar', chartColors: [C.dec, 'B9B3A6', 'B9B3A6'], showValue: true, dataLabelFormatCode: '"$"0.00"M"', dataLabelFontSize: 9, dataLabelColor: C.ink,
    valAxisHidden: true, valAxisMinVal: 0, valAxisMaxVal: 40, ...axisTxt(false), valGridLine: { style: 'none' } as any, catAxisOrientation: 'maxMin', showLegend: false, barGapWidthPct: 50,
  } as any);
  txt(s, [
    { text: 'Elegida: HighTechnology en USA. ', options: { bold: true, color: C.dec, breakLine: true } },
    { text: 'Produce donde vende (flete cat. 1). Japón: más cara y se llenaría con demanda japonesa. México: tecnología 0, impuesto 16% y capacidad mayor a la demanda libre.', options: { color: C.ink2 } },
  ], 1200, 630, 600, 200, { fontSize: 10 });
  concepts(s, t, ['Segmentación', 'Análisis de demanda', 'Costos logísticos', 'Inversión']);
  thread(s, t, 2);
  notes(s, 'p2-seleccion');
}

// 8 P2 mapa
{
  const t: Theme = 'light';
  const s = base(t, { num: '02', rest: 'Período 2 · La expansión en marcha' });
  title(s, t, 'Fábrica y mercado en el mismo período:', 'la planta de USA produjo desde el primer día.', 1150);
  s.addShape(pptx.ShapeType.line, { x: p(390), y: p(700), w: p(1010), h: 0, line: { color: C.omega, width: 2.5, beginArrowType: 'triangle' } } as any);
  txt(s, 'USA → Japón · ≈10.000 TP + 41.000 PE', 600, 660, 600, 26, { fontSize: 9.5, color: C.omega, align: 'center' });
  txt(s, 'Japón → USA: flete cat. 3 · producir en destino: cat. 1', 560, 610, 680, 26, { fontSize: 8.5, color: C.mute, align: 'center' });
  rect(s, 260, 674, 52, 52, C.ink); rect(s, 320, 674, 52, 52, C.ink); rect(s, 1414, 674, 52, 52, C.dec);
  txt(s, [{ text: 'Japón y Corea\n', options: { bold: true, fontSize: 15, color: C.ink } }, { text: '2 plantas HighTechnology\n', options: { fontSize: 9, color: C.mute } }, { text: '364.432\n', options: { bold: true, fontSize: 33, color: C.ink } }, { text: 'unidades · +20,3% · 48,9% del mercado', options: { fontSize: 9, color: C.mute } }], 260, 750, 600, 220, {});
  txt(s, [{ text: 'USA y Canadá\n', options: { bold: true, fontSize: 15, color: C.ink } }, { text: 'planta nueva · $31.455.000\n', options: { fontSize: 9, color: C.mute } }, { text: '85.769\n', options: { bold: true, fontSize: 33, color: C.dec } }, { text: 'unidades en el primer año · 18,5% de los ingresos', options: { fontSize: 9, color: C.mute } }], 1414, 750, 420, 220, {});
  s.addShape(pptx.ShapeType.line, { x: p(1380), y: p(118), w: 0, h: p(330), line: { color: C.ink, width: 1.5 } });
  txt(s, 'Fuente: Informe 2 §3b, §3c, §3f', 1410, 118, 400, 20, { fontSize: 7.5, color: C.mute });
  kpi(s, t, 1410, 150, 400, 'Resultado después de impuestos', '+99,5%', '', undefined, 72);
  txt(s, [{ text: 'Unidades +48,6% · ocupación 96,9%\n', options: { color: C.ink } }, { text: 'Endeudamiento 0,22 → ', options: { color: C.ink } }, { text: '0,61', options: { color: C.risk, bold: true } }], 1410, 300, 440, 120, { fontSize: 12 });
  thread(s, t, 2);
  notes(s, 'p2-mapa');
}

// 9 P2 costo
{
  const t: Theme = 'dark';
  const s = base(t, { num: '02', rest: 'Período 2 · El costo de crecer' }, 'Informes 1 y 2 §3a, §3f · Plan 2 §8');
  title(s, t, 'El resultado se duplicó, pero el valor subió solo 2,19%.', 'Dos parámetros explican la diferencia.');
  txt(s, 'CAMBIO DE PUNTOS POR PARÁMETRO DEL VALOR, 2026 → 2027', 120, 340, 900, 22, { fontSize: 8.5, color: C.muteD, charSpacing: 2.5 });
  s.addChart(pptx.ChartType.bar, [{ name: 'Puntos', labels: ['Resultados Económicos', 'Participación de Mercado', 'Valor de Marca', 'Tecnología Industrial', 'Endeudamiento y Solvencia', 'Innovación de Producto'], values: [99, 27, 19, 10, -30, -61] }], {
    x: p(110), y: p(370), w: p(900), h: p(470), barDir: 'bar', chartColors: [C.omegaD], invertIfNegative: false, showValue: true, dataLabelColor: C.white, dataLabelFontSize: 9,
    ...axisTxt(true), catAxisLabelPos: 'low', catAxisOrientation: 'maxMin', valAxisHidden: true, valGridLine: { style: 'none' } as any, showLegend: false, barGapWidthPct: 45,
  } as any);
  txt(s, 'CÓMO SE PAGÓ LA FÁBRICA ($31,46M)', 1100, 340, 700, 22, { fontSize: 8.5, color: C.muteD, charSpacing: 2.5 });
  rect(s, 1100, 378, 445, 44, C.risk); rect(s, 1548, 378, 252, 44, C.omegaD);
  txt(s, 'Préstamo LP $20M · 64%', 1114, 378, 430, 44, { fontSize: 9.5, color: 'FFFFFF', valign: 'middle' });
  txt(s, 'Propios ≈$11,5M*', 1560, 378, 240, 44, { fontSize: 9.5, color: 'FFFFFF', valign: 'middle' });
  txt(s, [{ text: 'Préstamo al 6,3% a 12 años · dividendos 80% → 50% · ', options: { color: 'B9BECB' } }, { text: 'endeudamiento 0,61, el más alto del sector', options: { color: C.risk } }], 1100, 440, 700, 60, { fontSize: 10 });
  txt(s, '* derivado: inversión − préstamo', 1100, 506, 600, 20, { fontSize: 7.5, color: C.muteD });
  txt(s, 'LO QUE APRENDIMOS', 1100, 580, 700, 22, { fontSize: 8.5, color: C.dec, charSpacing: 2.5 });
  txt(s, [
    { text: 'Innovación premia la mejora, no el nivel. ', options: { bold: true, color: C.white } }, { text: 'Sostener 7 / 5 / 5 costó 61 puntos.', options: { color: 'B9BECB', breakLine: true } },
    { text: ' ', options: { breakLine: true } },
    { text: 'El préstamo fue más grande de lo necesario. ', options: { bold: true, color: C.white } }, { text: 'Cerramos con $12,1M de caja (estimábamos ≈$5,5M): con $13M a $14M alcanzaba.', options: { color: 'B9BECB' } },
  ], 1100, 616, 700, 260, { fontSize: 11 });
  concepts(s, t, ['Financiamiento', 'Riesgo financiero', 'Apalancamiento', 'Indicadores']);
  thread(s, t, 2);
  notes(s, 'p2-costo');
}

// 10 P3
{
  const t: Theme = 'light';
  const s = base(t, { num: '03', rest: 'Período 3 · 2028 · Consolidar y corregir' }, 'Plan 3 §1–§8 · Informe 3 §2, §3');
  title(s, t, 'Mismo gasto, mejor repartido:', 'sacamos promoción donde la marca estaba saturada y la pusimos en innovación.');
  txt(s, 'PRESUPUESTO ESTRATÉGICO · $M · TOTAL 9,6 EN AMBOS', 120, 328, 760, 22, { fontSize: 8.5, color: C.mute, charSpacing: 2.5 });
  s.addChart(pptx.ChartType.bar, [
    { name: 'Promoción', labels: ['P2 · 2027', 'P3 · 2028'], values: [6.9, 6.4] },
    { name: 'Innovación', labels: ['P2 · 2027', 'P3 · 2028'], values: [1.85, 2.2] },
    { name: 'Tecnología', labels: ['P2 · 2027', 'P3 · 2028'], values: [0.85, 1.0] },
  ], { x: p(110), y: p(360), w: p(720), h: p(520), barDir: 'col', barGrouping: 'stacked', chartColors: [C.ink, C.omega, C.cyan], showValue: true, dataLabelFormatCode: '0.0#', dataLabelColor: 'FFFFFF', dataLabelFontSize: 9, ...axisTxt(false), valAxisHidden: true, valGridLine: { style: 'none' } as any, showLegend: true, legendPos: 'r', legendFontFace: F, legendFontSize: 9, legendColor: C.ink, barGapWidthPct: 70 } as any);
  const k: [string, string, string, string?][] = [
    ['Innovación (parámetro)', '498 → 604', '+106 pts · PE y DH de 5 a 6'], ['Tecnología industrial', '9 → 10', 'el máximo de la escala'],
    ['Ventas en USA', '+36,2%', 'marca 26 → 41'], ['Costo DomoHogar USA', '$431 → $377', 'al cargar la planta 10k → 17k'],
    ['Endeudamiento', '0,61 → 0,52', 'sin préstamos · caja $23,7M'], ['Valor de la compañía', '3.769 · 1°', 'Beta penalizada (×0,95)', C.dec],
  ];
  k.forEach(([a, b, c, col], i) => kpi(s, t, 880 + (i % 2) * 480, 340 + Math.floor(i / 2) * 150, 460, a, b, c, col, 46));
  txt(s, [{ text: 'La marca en Japón llegó a 100 en las tres líneas aun con $600.000 menos de promoción. ', options: { color: C.ink2 } }, { text: 'Pendiente: ', options: { bold: true, color: C.ink } }, { text: 'precios sin cambios con la demanda 60% por encima de la capacidad (margen 48%, 4° del sector).', options: { color: C.ink2 } }], 880, 830, 920, 80, { fontSize: 9.5 });
  thread(s, t, 3);
  notes(s, 'p3');
}

// 11 P4 decisión
{
  const t: Theme = 'light';
  const s = base(t, { num: '04', rest: 'Período 4 · 2029 · Rentabilidad y eficiencia' }, 'Plan 4 §1–§9 · sin Informe 4 (error de la simulación)');
  title(s, t, 'El producto con más margen porcentual', 'no es el que más dinero deja.');
  txt(s, 'MARGEN % (2028)', 120, 330, 380, 22, { fontSize: 8.5, color: C.mute, charSpacing: 2.5 });
  s.addChart(pptx.ChartType.bar, [{ name: 'Margen %', labels: ['TecnoPersonal', 'Pequeño Electr.', 'DomoHogar'], values: [52.9, 61.8, 43.8] }], {
    x: p(110), y: p(360), w: p(410), h: p(300), barDir: 'bar', chartColors: ['B9B3A6', C.ink, 'B9B3A6'], showValue: true, dataLabelFormatCode: '0.0"%"', dataLabelFontSize: 9, valAxisHidden: true, valAxisMaxVal: 80, valAxisMinVal: 0, ...axisTxt(false), valGridLine: { style: 'none' } as any, catAxisOrientation: 'maxMin', showLegend: false,
  } as any);
  txt(s, 'MARGEN POR UNIDAD ($)', 540, 330, 380, 22, { fontSize: 8.5, color: C.mute, charSpacing: 2.5 });
  s.addChart(pptx.ChartType.bar, [{ name: '$ por unidad', labels: ['TecnoPersonal', 'Pequeño Electr.', 'DomoHogar'], values: [120, 43, 295] }], {
    x: p(530), y: p(360), w: p(380), h: p(300), barDir: 'bar', chartColors: ['B9B3A6', 'B9B3A6', C.dec], showValue: true, dataLabelFormatCode: '"≈$"0', dataLabelFontSize: 9, valAxisHidden: true, valAxisMaxVal: 360, valAxisMinVal: 0, ...axisTxt(false), catAxisLabelColor: bg(t), valGridLine: { style: 'none' } as any, catAxisOrientation: 'maxMin', showLegend: false,
  } as any);
  txt(s, 'Margen bruto total: TP ≈$11,2M · PE ≈$13,5M · DH ≈$17,9M. Cada planta tiene capacidad separada por producto: producir menos PE no libera capacidad para DH. Se decidió llenar las tres líneas y subir el precio.', 120, 690, 790, 140, { fontSize: 10, color: C.ink2 });
  txt(s, 'DECISIONES DEL PERÍODO', 980, 330, 820, 22, { fontSize: 8.5, color: C.mute, charSpacing: 2.5 });
  tableRows(s, t, [
    ['', ''], ['Precios Japón', 'TP 238 → 250 · DH 685 → 705 · PE 74 sin cambio'], ['Precios USA', '195 → 205 · 59 → 61 · 640 → 660'],
    ['Tecnología', '$1,0M → $0,4M: nivel 10, retorno marginal ≈ 0'], ['Promoción', 'Japón $4,0M → $3,3M · USA $2,4M → $3,0M'],
    ['Innovación', 'PE y DH de 6 a 7 ($2,2M → $2,55M)'], ['Producción', 'DomoHogar a capacidad completa: 63.000'], ['Dividendos', '50% → 30% para bajar el endeudamiento'],
  ].map((r) => r.map(String)), 980, 352, [190, 630], { fontSize: 10, boldCol0: true, rowH: 52, left: true });
  txt(s, 'Subas de 3% a 5%: todos los precios quedan iguales o debajo del competidor más caro.', 980, 790, 820, 40, { fontSize: 9, color: C.mute });
  concepts(s, t, ['Margen de contribución', 'Estrategia de precios', 'Retorno marginal', 'Eficiencia']);
  thread(s, t, 4);
  notes(s, 'p4-decision');
}

// 12 P4 resultado
{
  const t: Theme = 'paper2';
  const s = base(t, { num: '04', rest: 'Período 4 · Resultados' }, 'Plan 5 §0, §4 · Informe 5 §3 (columna 2029) · planilla D4');
  title(s, t, 'Ganamos margen sin perder ventas', 'y quedamos a 5 puntos del primer puesto.');
  kpi(s, t, 120, 330, 400, 'Margen sobre ingresos', '48% → 50%', '', C.omega, 56);
  kpi(s, t, 550, 330, 400, 'Resultado después de impuestos', '+20,3%', '$10,79M → $12,98M', undefined, 56);
  kpi(s, t, 980, 330, 400, 'Endeudamiento', '0,52 → 0,42', 'caja $39,4M sin préstamos', undefined, 56);
  kpi(s, t, 1410, 330, 400, 'Valor de la compañía', '3.829 · 2°', 'Beta 3.834 (+5 puntos)', undefined, 56);
  txt(s, 'PROYECTADO VS. REALIZADO', 120, 600, 900, 22, { fontSize: 8.5, color: C.mute, charSpacing: 2.5 });
  tableRows(s, t, [['', 'PLAN 4', 'RESULTADO'], ['Resultado antes de impuestos', '≈ +$3,3M (+23%)', '+$2,96M (+20,3%)'], ['Margen sobre ingresos', '≈ 49%', '50%'], ['Endeudamiento', '≈ 0,42', '0,42'], ['Unidades', 'sostenerlas', '467.700 (+0,4%)']], 120, 636, [380, 260, 260], { fontSize: 10, hiCol: 2, rowH: 52 });
  hline(s, 1140, 610, 660, C.risk, 2.5);
  txt(s, 'EFECTO NO BUSCADO', 1140, 630, 660, 22, { fontSize: 8.5, color: C.risk, charSpacing: 2.5 });
  txt(s, '−14,9%', 1140, 664, 660, 70, { fontSize: 30, bold: true, color: C.ink });
  txt(s, 'Pequeño Electrodoméstico en Japón: 234.824 → 199.736 unidades. A 74 quedó más caro que Delta (72). Se corrigió en el P5 bajando a 72.', 1140, 750, 660, 120, { fontSize: 10, color: C.ink2 });
  thread(s, t, 4);
  notes(s, 'p4-resultado');
}

// 13 P5 decisión
{
  const t: Theme = 'dark';
  const s = base(t, { num: '05', rest: 'Período 5 · 2030 · La decisión final' }, 'Plan 5 §0–§9 · Informe 5 §2');
  title(s, t, 'Faltaba capacidad y sobraba caja:', 'una segunda planta en USA, pagada con fondos propios.');
  txt(s, 'DEMANDA SIN ATENDER VS. UNA PLANTA NUEVA (UNIDADES)', 120, 340, 800, 22, { fontSize: 8.5, color: C.muteD, charSpacing: 2.5 });
  s.addChart(pptx.ChartType.bar, [
    { name: 'Sin atender (cobertura 72% / 70% / 73%)', labels: ['TP', 'PE', 'DH'], values: [36000, 134000, 23000] },
    { name: 'Capacidad de una HighTechnology', labels: ['TP', 'PE', 'DH'], values: [30000, 100000, 20000] },
  ], { x: p(110), y: p(370), w: p(800), h: p(400), barDir: 'col', chartColors: [C.muteD, C.omegaD], showValue: true, dataLabelFormatCode: '#,##0', dataLabelColor: C.white, dataLabelFontSize: 8, ...axisTxt(true), valAxisHidden: true, valGridLine: { style: 'none' } as any, showLegend: true, legendPos: 'b', legendColor: C.muteD, legendFontFace: F, legendFontSize: 8 } as any);
  rect(s, 120, 810, 760 * 39.4 / 40, 38, C.cyan); txt(s, 'Caja $39,4M', 134, 810, 600, 38, { fontSize: 9, color: C.night, valign: 'middle' });
  rect(s, 120, 856, 760 * 32.19 / 40, 38, C.dec); txt(s, 'Fábrica $31,46M + implantación est. $0,73M', 134, 856, 700, 38, { fontSize: 9, color: 'FFFFFF', valign: 'middle' });
  txt(s, 'POR QUÉ CON CAJA Y NO CON PRÉSTAMO', 1000, 340, 800, 22, { fontSize: 8.5, color: C.dec, charSpacing: 2.5 });
  txt(s, 'Endeudamiento = Pasivo ÷ Patrimonio', 1000, 380, 800, 50, { fontSize: 18, color: C.white });
  txt(s, 'Con caja baja el disponible, sube el activo fijo y el pasivo no cambia. Con préstamo empeoraba el único parámetro donde Beta nos sacaba ventaja clara (68 puntos).', 1000, 446, 800, 110, { fontSize: 10.5, color: 'C8CCD6' });
  txt(s, [{ text: 'DESCARTADO\n', options: { color: C.muteD, fontSize: 8.5, charSpacing: 2.5 } }, { text: 'Mercado nuevo (UE Occidental): ', options: { bold: true, color: C.white } }, { text: 'marca cero en el último período y flete cat. 4–5. La demanda propia ya superaba la planta nueva.', options: { color: 'C8CCD6' } }], 1000, 590, 800, 130, { fontSize: 10 });
  txt(s, [{ text: 'ADEMÁS\n', options: { color: C.muteD, fontSize: 8.5, charSpacing: 2.5 } }, { text: 'Innovación 7 → 8 en las tres líneas · promoción USA $3,0M → $3,7M + delegación comercial · PE Japón 74 → 72 · dividendos 30% → 20%.', options: { color: 'C8CCD6' } }], 1000, 740, 800, 130, { fontSize: 10 });
  concepts(s, t, ['Inversión', 'Fuentes de financiamiento', 'Estructura de capital', 'Capacidad']);
  thread(s, t, 5);
  notes(s, 'p5-decision');
}

// 14 P5 resultado
{
  const t: Theme = 'light';
  const s = base(t, { num: '05', rest: 'Período 5 · Resultados' }, 'Informe 5 §3b, §3c, §3e, §4a');
  title(s, t, 'El mejor año de OMEGA,', 'aunque la producción nueva se vendió en Japón y no en USA.');
  kpi(s, t, 120, 330, 400, 'Ingresos', '$113,7M', '+30,4%', undefined, 60);
  kpi(s, t, 550, 330, 400, 'Resultado después de impuestos', '+44,7%', '$18,78M · plan ≈ +35%', C.omega, 60);
  kpi(s, t, 980, 330, 400, 'Unidades', '613.882', '+31,3% · ocupación 98,7%', undefined, 60);
  kpi(s, t, 1410, 330, 400, 'Endeudamiento', '0,42 → 0,35', 'sin deuda nueva', undefined, 60);
  txt(s, 'UNIDADES VENDIDAS POR MERCADO · 2029 → 2030', 120, 600, 900, 22, { fontSize: 8.5, color: C.mute, charSpacing: 2.5 });
  s.addChart(pptx.ChartType.bar, [
    { name: '2029', labels: ['Japón y Corea (+40,8%)', 'USA y Canadá (+11,1%)'], values: [317269, 150431] },
    { name: '2030', labels: ['Japón y Corea (+40,8%)', 'USA y Canadá (+11,1%)'], values: [446785, 167097] },
  ], { x: p(110), y: p(630), w: p(940), h: p(300), barDir: 'bar', chartColors: ['CFC9BA', C.dec], showValue: true, dataLabelFormatCode: '#,##0', dataLabelFontSize: 8.5, ...axisTxt(false), valAxisHidden: true, valGridLine: { style: 'none' } as any, catAxisOrientation: 'maxMin', showLegend: true, legendPos: 'b', legendFontFace: F, legendFontSize: 8 } as any);
  txt(s, 'POR QUÉ IMPORTA', 1160, 600, 640, 22, { fontSize: 8.5, color: C.dec, charSpacing: 2.5 });
  txt(s, ['Japón vendió ≈30.000 TP, 72.000 PE y 29.000 DH por encima de su capacidad: salieron de USA.', 'Logística +78,4% ($1,22M → $2,17M) y margen 50% → 49%.', 'DomoHogar en USA −38,6% con la marca subiendo de 60 a 87.', 'Demanda propia cubierta: 76% / 80% / 95%.'].map((x) => ({ text: x, options: { breakLine: true, bullet: { indent: 12 } } })), 1160, 636, 640, 300, { fontSize: 10, color: C.ink, paraSpaceAfter: 8 });
  thread(s, t, 5);
  notes(s, 'p5-resultado');
}

// 15 Valor
{
  const t: Theme = 'graphite';
  const s = base(t, { acc: 'Acto 3', rest: 'La evolución global · Valor de la compañía' }, 'Informes 1, 2, 3, 5 §3a · Plan 5 §0');
  title(s, t, 'De 3.139 a 3.847 puntos: +22,6%.', 'Primeros en 2028, segundos al cierre, a 44 puntos de Beta.');
  const order = ['Omega', 'Beta', 'Delta', 'Gama', 'Alfa'];
  s.addChart(pptx.ChartType.line, order.map((c) => ({ name: `${c} ${valorCompetencia[c][5].toLocaleString('es-AR')}`, labels: [...SHORT], values: valorCompetencia[c] })), {
    x: p(110), y: p(360), w: p(1700), h: p(640), chartColors: [C.omegaD, C.beta, '5A6176', '4A5168', '3E4559'], lineSize: 2, lineDataSymbol: 'circle', lineDataSymbolSize: 5,
    valAxisMinVal: 2900, valAxisMaxVal: 4000, valAxisMajorUnit: 300, valAxisLabelFormatCode: '#,##0', ...axisTxt(true), showLegend: true, legendPos: 'r', legendColor: C.white, legendFontFace: F, legendFontSize: 10,
    valAxisTitle: 'puntos', showValAxisTitle: true, valAxisTitleColor: C.muteD, valAxisTitleFontSize: 8,
  } as any);
  txt(s, 'P3: 1° con 3.769 (Beta penalizada ×0,95) · variaciones: +10,98% · +2,19% · +5,87% · +1,59% · +0,45%', 120, 1010, 1600, 24, { fontSize: 9, color: C.dec });
  notes(s, 'valor');
}

// 16 Ingresos y resultados
{
  const t: Theme = 'light';
  const s = base(t, { acc: 'Acto 3', rest: 'Ingresos, resultados y márgenes' }, 'Diagnóstico §4 · Informes 1–5 §3b, §3e · Plan 5 §0');
  title(s, t, 'Ingresos ×2,35 y resultado ×5,87:', 'crecimos más en rentabilidad que en tamaño.');
  s.addChart(pptx.ChartType.bar, [
    { name: 'Ingresos ($M)', labels: [...SHORT], values: serie.ingresos.map((v) => +(v / 1e6).toFixed(1)) },
    { name: 'Resultado después de impuestos ($M)', labels: [...SHORT], values: serie.resNeto.map((v) => +(v / 1e6).toFixed(1)) },
  ], { x: p(110), y: p(340), w: p(1220), h: p(540), barDir: 'col', chartColors: [C.others, C.omega], showValue: true, dataLabelFormatCode: '"$"0.0"M"', dataLabelFontSize: 8, ...axisTxt(false), valAxisLabelFormatCode: '"$"0"M"', showLegend: true, legendPos: 't', legendFontFace: F, legendFontSize: 9, barGapWidthPct: 40 } as any);
  tableRows(s, t, [['', ...SHORT], ['Margen', ...serie.margen.map((v) => v + '%')], ['Res. op. / ingresos', ...serie.resOperativo.map((r, i) => dec((r / serie.ingresos[i]) * 100, 1) + '%')], ['ROE', ...serie.roe.map((v) => dec(v, 1) + '%')]], 120, 890, [220, ...Array(6).fill(180)], { fontSize: 9, rowH: 30 });
  txt(s, ['P1 · Precio, tecnología y DomoHogar: resultado +38,5% con 12,4% más de ingresos.', 'P2 · La planta de USA: ingresos +43,3% y resultado +99,5%.', 'P4 · Precio: margen 50%, el más alto de la etapa.', 'P5 · Segunda planta: ingresos +30,4% y resultado +44,7%.'].map((x) => ({ text: x, options: { breakLine: true } })), 1400, 400, 400, 460, { fontSize: 10, color: C.ink, paraSpaceAfter: 14 });
  notes(s, 'ingresos');
}

// 17 Comercial
{
  const t: Theme = 'light';
  const s = base(t, { acc: 'Acto 3', rest: 'Evolución comercial' }, 'Informes 1–5 §3b, §3c · Plan 5 §0 · Diagnóstico');
  title(s, t, 'De un mercado a dos,', 'con la marca y la innovación más altas del sector al cierre.');
  s.addChart(pptx.ChartType.bar, [
    { name: 'Japón y Corea', labels: [...SHORT], values: unidadesMercado.japonTotal },
    { name: 'USA y Canadá', labels: [...SHORT], values: unidadesMercado.usaTotal },
  ], { x: p(110), y: p(340), w: p(1000), h: p(540), barDir: 'col', barGrouping: 'stacked', chartColors: [C.ink, C.dec], ...axisTxt(false), valAxisLabelFormatCode: '#,##0', showLegend: true, legendPos: 't', legendFontFace: F, legendFontSize: 9, barGapWidthPct: 45 } as any);
  tableRows(s, t, [['', ...SHORT], ['Part. unidades', ...serie.partUnidades.map((v) => dec(v, 1) + '%')], ['Part. ingresos', ...serie.partIngresos.map((v) => dec(v, 1) + '%')]], 120, 890, [190, ...Array(6).fill(140)], { fontSize: 9, rowH: 30 });
  const sm: [string, number[], string][] = [['Valor de marca', serie.marca, '55 → 96 · empate 1°'], ['Innovación de producto', serie.innovacion, '5,0 → 8,0 · 1° del sector'], ['Tecnología industrial', serie.tecnologia, '7 → 10 · 1° · máximo']];
  sm.forEach(([nm, v, l], i) => {
    const y = 360 + i * 170;
    hline(s, 1180, y, 620, C.ink, 1.5);
    txt(s, [{ text: nm + '\n', options: { bold: true, fontSize: 11 } }, { text: l, options: { fontSize: 15, bold: true, color: C.omega } }], 1180, y + 14, 300, 120, { color: C.ink });
    s.addChart(pptx.ChartType.line, [{ name: nm, labels: [...SHORT], values: v }], { x: p(1470), y: p(y + 6), w: p(330), h: p(150), chartColors: [C.omega], lineSize: 2, lineDataSymbol: 'none', catAxisHidden: true, valAxisHidden: true, valGridLine: { style: 'none' } as any, catAxisLineShow: false, showLegend: false, valAxisMinVal: Math.min(...v) * 0.9 } as any);
  });
  txt(s, 'Precio: TecnoPersonal Japón 228 → 250; entrada a USA debajo de la referencia (195 / 59 / 640) y suba a 205 / 61 / 660 en P4.', 1180, 880, 620, 80, { fontSize: 9.5, color: C.ink2 });
  notes(s, 'comercial');
}

// 18 Operativa
{
  const t: Theme = 'paper2';
  const s = base(t, { acc: 'Acto 3', rest: 'Evolución operativa' }, 'Planes 1–5 (capacidad) · Informes 1–5 (unidades, ocupación, costo)');
  title(s, t, 'Duplicamos la capacidad', 'y aun así la demanda fue siempre mayor.');
  s.addChart(pptx.ChartType.bar, [
    { name: 'Capacidad instalada', labels: [...SHORT], values: capacidad.total },
    { name: 'Unidades vendidas', labels: [...SHORT], values: serie.unidades },
  ], { x: p(110), y: p(340), w: p(1000), h: p(540), barDir: 'col', chartColors: ['B9B3A6', C.omega], ...axisTxt(false), valAxisLabelFormatCode: '#,##0', showLegend: true, legendPos: 't', legendFontFace: F, legendFontSize: 9, barGapWidthPct: 40, barOverlapPct: -10 } as any);
  tableRows(s, t, [['', ...SHORT], ['Fábricas', ...serie.fabricas.map(String)], ['Ocupación', ...serie.ocupacion.map((v) => dec(v, 1) + '%')]], 120, 890, [190, ...Array(6).fill(140)], { fontSize: 9, rowH: 30 });
  txt(s, 'DEMANDA PROPIA CUBIERTA', 1180, 340, 620, 22, { fontSize: 8.5, color: C.mute, charSpacing: 2.5 });
  tableRows(s, t, [['', ...SHORT], ...(['TP', 'PE', 'DH'] as const).map((k) => [k, ...capacidad.cobertura[k].map((v) => (v == null ? '—' : v + '%'))])], 1180, 372, [80, ...Array(6).fill(90)], { fontSize: 9.5, boldCol0: true, rowH: 38 });
  txt(s, 'COSTO UNITARIO DE FABRICACIÓN', 1180, 560, 620, 22, { fontSize: 8.5, color: C.mute, charSpacing: 2.5 });
  tableRows(s, t, [['', '2025', '2028 (mín.)', '2030'], ...(['TP', 'PE', 'DH'] as const).map((k) => [k, dec(costoUnitario[k][1], 1), dec(costoUnitario[k][4], 1), dec(costoUnitario[k][6], 1)])], 1180, 592, [80, 180, 180, 180], { fontSize: 9.5, boldCol0: true, hiCol: 2, rowH: 38 });
  txt(s, 'La tecnología (7 → 10) bajó el costo hasta 2028. Con la escala en el máximo, desde 2029 ya no baja.', 1180, 770, 620, 80, { fontSize: 9.5, color: C.ink2 });
  notes(s, 'operativa');
}

// 19 Financiera
{
  const t: Theme = 'dark';
  const s = base(t, { acc: 'Acto 3', rest: 'Evolución financiera' }, 'Informes 1–5 §3f · Plan 5 §0 · planillas de cash flow');
  title(s, t, 'El préstamo de 2027 financió la expansión;', 'lo licuamos con utilidades retenidas, sin pedir más deuda.');
  s.addChart(pptx.ChartType.bar, [
    { name: 'Caja (balance) $M', labels: [...SHORT], values: serie.caja.map((v) => +(v / 1e6).toFixed(1)) },
    { name: 'Préstamo LP $M', labels: [...SHORT], values: serie.prestamoLP.map((v) => +(v / 1e6).toFixed(1)) },
  ], { x: p(110), y: p(340), w: p(1060), h: p(380), barDir: 'col', chartColors: [C.cyan, C.risk], showValue: true, dataLabelFormatCode: '0.0', dataLabelColor: C.white, dataLabelFontSize: 8, ...axisTxt(true), valAxisHidden: true, valGridLine: { style: 'none' } as any, showLegend: true, legendPos: 't', legendColor: C.muteD, legendFontFace: F, legendFontSize: 9 } as any);
  s.addChart(pptx.ChartType.line, [{ name: 'Endeudamiento (pasivo / patrimonio) · el más alto del sector desde 2027', labels: [...SHORT], values: serie.endeudamiento }], { x: p(110), y: p(740), w: p(1060), h: p(250), chartColors: [C.risk], lineSize: 2.5, lineDataSymbol: 'circle', showValue: true, dataLabelFormatCode: '0.00', dataLabelColor: C.white, dataLabelFontSize: 8, dataLabelPosition: 't', ...axisTxt(true), valAxisHidden: true, valGridLine: { style: 'none' } as any, valAxisMinVal: 0, valAxisMaxVal: 0.8, showLegend: true, legendPos: 't', legendColor: C.muteD, legendFontFace: F, legendFontSize: 9 } as any);
  txt(s, 'ENDEUDAMIENTO 2030', 1260, 340, 540, 22, { fontSize: 8.5, color: C.muteD, charSpacing: 2.5 });
  s.addChart(pptx.ChartType.bar, [{ name: 'Ratio', labels: ['Omega', 'Delta', 'Gama', 'Alfa', 'Beta'], values: [0.35, 0.2, 0.15, 0.1, 0.08] }], { x: p(1250), y: p(370), w: p(550), h: p(240), barDir: 'bar', chartColors: [C.risk, '4A5168', '4A5168', '4A5168', '4A5168'], showValue: true, dataLabelFormatCode: '0.00', dataLabelColor: C.white, dataLabelFontSize: 8.5, ...axisTxt(true), valAxisHidden: true, valGridLine: { style: 'none' } as any, catAxisOrientation: 'maxMin', showLegend: false } as any);
  txt(s, [{ text: 'Dividendos (% del resultado anterior)\n', options: { color: C.muteD, fontSize: 8.5 } }, { text: '80 · 50 · 50 · 30 · 20\n\n', options: { color: C.white, fontSize: 12 } }, { text: 'Rentabilidad sobre patrimonio (ROE)\n', options: { color: C.muteD, fontSize: 8.5 } }, { text: '7,1% → 21,9%', options: { color: C.cyan, fontSize: 22, bold: true } }], 1260, 640, 540, 200, {});
  txt(s, 'La planilla de cash flow cierra 2030 en $417.768, pero la caja del balance es de $31,3M: el modelo descuenta la depreciación, que no es salida de dinero.', 1260, 860, 540, 110, { fontSize: 9, color: 'B9BECB' });
  notes(s, 'financiera');
}

// 20 Ganar vs valer
{
  const t: Theme = 'light';
  const s = base(t, { acc: 'Acto 4', rest: 'Balance estratégico' }, 'Informes 1, 2, 3, 5 §3a, §3b · Plan 5 §0');
  title(s, t, 'Ganar más no es lo mismo', 'que valer más.');
  txt(s, 'CRECIMIENTO POR PERÍODO · MISMA ESCALA (%) · OBJETIVO DEL MANUAL PARA EL VALOR: 8%', 120, 300, 900, 22, { fontSize: 8.5, color: C.mute, charSpacing: 2 });
  s.addChart(pptx.ChartType.bar, [
    { name: 'Resultado después de impuestos', labels: ['P1', 'P2', 'P3', 'P4', 'P5'], values: [38.5, 99.5, 22.1, 20.3, 44.7] },
    { name: 'Valor de la compañía', labels: ['P1', 'P2', 'P3', 'P4', 'P5'], values: [10.98, 2.19, 5.87, 1.59, 0.45] },
  ], { x: p(110), y: p(330), w: p(860), h: p(650), barDir: 'bar', chartColors: [C.others, C.omega], showValue: true, dataLabelFormatCode: '"+"0.0#"%"', dataLabelFontSize: 8.5, ...axisTxt(false), valAxisMinVal: 0, valAxisMaxVal: 110, valAxisLabelFormatCode: '0"%"', catAxisOrientation: 'maxMin', showLegend: true, legendPos: 't', legendFontFace: F, legendFontSize: 9, barGapWidthPct: 50 } as any);
  const r: [string, string, string][] = [
    ['01', 'Resultados Económicos (41%) es relativo.', 'En P5 el resultado creció 44,7% y el parámetro bajó 19 puntos: Beta ganó $40,5M antes de impuestos; nosotros $25,4M.'],
    ['02', 'Endeudamiento y Solvencia (10%) castigó el préstamo durante cuatro períodos.', 'Desde 2027 tuvimos el ratio más alto del sector. En 2030: 335 puntos contra 394 de Beta, la mayor diferencia.'],
    ['03', 'Innovación de Producto (13%) premia la mejora del período.', 'Sostener los niveles en P2 costó 61 puntos; subir un grado en P3 sumó 106.'],
  ];
  r.forEach(([nn, h, b], i) => {
    const y = 330 + i * 190;
    hline(s, 1040, y, 760, C.ink, 1.5);
    txt(s, [{ text: nn + '  ', options: { color: C.dec, bold: true } }, { text: h, options: { color: C.ink, bold: true } }], 1040, y + 16, 760, 70, { fontSize: 12.5 });
    txt(s, b, 1040, y + 90, 760, 90, { fontSize: 10, color: C.ink2 });
  });
  txt(s, 'El valor se compone de seis parámetros ponderados, medidos contra el resto del sector.', 1040, 910, 760, 40, { fontSize: 9, color: C.mute });
  notes(s, 'ganar-valer');
}

// 21 Balance
{
  const t: Theme = 'light';
  const s = base(t, { acc: 'Acto 4', rest: 'Qué aprendimos' }, 'Informes 1–5 §4–§7 · Plan 5');
  title(s, t, 'Lo que haríamos igual', 'y lo que cambiaríamos.');
  const cols: [string, string, [string, string][]][] = [
    ['Funcionó', C.omega, [['Tecnología 7 → 10', 'costo TP 124,2 → 106,6 hasta 2028'], ['Fábrica y mercado juntos', 'ocupación 96,9% el primer año'], ['Reasignar el gasto en P3', '+106 puntos de innovación sin gastar más'], ['Pagar la 2ª planta con caja', 'resultado +44,7% y deuda 0,42 → 0,35']]],
    ['Nos costó', C.risk, [['Sostener la innovación en P2', '−61 puntos en el parámetro'], ['Préstamo de $20M', 'bastaban $13M a $14M; el ratio más alto del sector'], ['Precios quietos en P2 y P3', 'con la demanda 60% mayor: 4° en margen'], ['Producción 2030 vendida en Japón', 'logística +78,4%']]],
    ['Cambiaríamos', C.dec, [['Dimensionar la deuda', 'a la necesidad real, usando primero la caja'], ['Subir precios desde P2', 'mientras la demanda superaba la capacidad'], ['Delegación en USA desde la entrada', 'se instaló recién en P5'], ['Leer antes los parámetros', 'qué mide y cómo se calcula cada uno']]],
  ];
  cols.forEach(([h, c, it], i) => {
    const x = 120 + i * 575;
    rect(s, x, 300, 530, 5, c);
    txt(s, h, x, 318, 530, 36, { fontSize: 13, bold: true, color: C.ink });
    it.forEach(([a, b], j) => txt(s, [{ text: a + '\n', options: { bold: true, color: C.ink, fontSize: 10.5 } }, { text: b, options: { color: C.ink2, fontSize: 9 } }], x, 372 + j * 76, 530, 70, {}));
  });
  const ch: [string, string][] = [['01 · MARKETING →', 'Promoción e innovación crean demanda. La promoción rinde hasta saturar la marca; después conviene moverla.'], ['02 · PRODUCCIÓN →', 'La demanda pide capacidad. Producir donde se vende y cargar las plantas según la demanda real.'], ['03 · FINANZAS →', 'La capacidad pide inversión. La deuda se paga en valor durante varios períodos; la caja propia no.']];
  rect(s, 120, 740, 1420, 140, C.ink); rect(s, 1540, 740, 260, 140, C.omega);
  ch.forEach(([a, b], i) => txt(s, [{ text: a + '\n', options: { color: C.cyan, fontSize: 8, charSpacing: 2 } }, { text: b, options: { color: 'D6D9E0', fontSize: 9 } }], 146 + i * 473, 758, 430, 120, {}));
  txt(s, [{ text: '= VALOR\n', options: { color: 'FFFFFF', fontSize: 8, charSpacing: 2 } }, { text: 'Cada área decide sobre las demás.', options: { color: 'FFFFFF', fontSize: 9 } }], 1566, 758, 220, 120, {});
  notes(s, 'balance');
}

// 22 Cierre
{
  const t: Theme = 'dark';
  const s = base(t, { acc: 'Cierre', rest: '2025 → 2030' });
  tableRows(s, t, [
    ['', 'RECIBIMOS', 'ENTREGAMOS'], ['Valor de la compañía', '3.139', '3.847'], ['Mercados', '1', '2'], ['Fábricas', '2', '4'], ['Unidades', '294.412', '613.882'],
    ['Ingresos', '$48,3M', '$113,7M'], ['Resultado después de impuestos', '$3,2M', '$18,8M'], ['Valor de marca', '55', '96'], ['Innovación', '5,0', '8,0'], ['Endeudamiento', '0,22', '0,35'],
  ], 120, 170, [520, 170, 190], { fontSize: 13, hiCol: 2, rowH: 70 });
  txt(s, 'Fuente: Diagnóstico · Informe 5 §3b, §7', 120, 900, 600, 20, { fontSize: 7.5, color: C.muteD });
  txt(s, 'Ω', 1120, 150, 300, 160, { fontSize: 75, bold: true, color: C.omegaD });
  txt(s, 'Administrar OMEGA fue aprender que ninguna decisión es de un área sola.', 1120, 340, 680, 200, { fontSize: 22, color: C.white });
  txt(s, 'La marca crea demanda, la demanda pide capacidad, la capacidad pide financiamiento, y el financiamiento se paga en valor. Crecimos 2,35 veces en ingresos y casi 6 veces en resultado; la deuda de la expansión fue lo que nos separó del primer puesto.', 1120, 560, 680, 260, { fontSize: 12, color: 'B9BECB' });
  txt(s, TEAM.join(' · '), 1120, 960, 680, 30, { fontSize: 10, color: C.muteD });
  notes(s, 'cierre');
}

/* ================= ANEXO ================= */
function annex(code: string, ttl: string, src: string, note = '') {
  const t: Theme = 'light';
  const s = base(t, { acc: 'Anexo ' + code, rest: 'Respaldo técnico' }, src);
  txt(s, ttl, 120, 136, 1500, 70, { fontSize: 23, color: C.ink });
  if (note) txt(s, note, 120, 985, 1680, 50, { fontSize: 7.5, color: C.mute });
  return s;
}
{
  const s = annex('A1', 'Precios por producto y mercado (TP / PE / DH)', 'Diagnóstico · Planes 1–5 · Informes 1–3, 5', `Referencia Japón ${referencia.japon} · referencia USA ${referencia.usa}.`);
  tableRows(s, 'light', [['PERÍODO', 'OMEGA JAPÓN', 'DELTA JAPÓN', 'OMEGA USA', 'COMPETENCIA USA'], ...precios.map((x) => [x.p, x.jp, x.delta, x.usa, x.compUsa])], 120, 240, [240, 300, 300, 300, 540], { fontSize: 10.5, rowH: 56, left: true });
  txt(s, 'Cambios: P1 TP Japón +4,4% (228 → 238). P2 entrada a USA entre Gama y la referencia. P4 subas de 3% a 5% (TP 250, DH 705; USA 205 / 61 / 660). P5 PE Japón 74 → 72 para igualar a Delta.', 120, 660, 1600, 80, { fontSize: 10.5, color: C.ink2 });
}
{
  const s = annex('A2', 'Presupuestos de promoción, innovación, tecnología y capacitación', 'Planes 1–5 · Informes 1, 2, 3, 5 §2', 'Montos en miles de $. Promoción TP / PE / DH. Segmentos = Innovadores / Ahorradores / Conservadores. Delegación USA: solo en P5 ($294.157).');
  tableRows(s, 'light', [['PERÍODO', 'PROMO JAPÓN', 'PROMO USA', 'PROMO TOTAL', 'INNOVACIÓN', 'INNOV. TOTAL', 'NIVELES', 'TECNOLOGÍA', 'CAPACIT.', 'SEGMENTOS'], ...presupuestos.map((x, i) => [x.p, x.promoJp, x.promoUsa, n(x.promo), x.innov, n(x.innovT), nivelesInnov[i], n(x.tec), n(x.capac), x.seg])], 120, 240, [90, 220, 210, 140, 220, 140, 130, 140, 140, 150], { fontSize: 9.5, rowH: 52 });
  txt(s, 'Mínimos del manual (Plan 1): innovación TP 392.000 · PE 546.250 · DH 780.000; tecnología 525.000 (630.000 con adicional). Techo de gasto P1 $9.660.647 · P2 $10.855.502.', 120, 640, 1600, 60, { fontSize: 10, color: C.ink2 });
}
{
  const s = annex('A3', 'Producción, capacidad instalada y cobertura de la demanda', 'Planes 1–5 · Informes 1–5', 'Cobertura = ventas / demanda estimada propia. 2025: solo se informa TP.');
  tableRows(s, 'light', [['PERÍODO', 'FÁB.', 'CAPACIDAD TP / PE / DH', 'CARGADO TP', 'CARGADO PE', 'CARGADO DH', 'OCUP.', 'COBERTURA', 'NOTA'], ...produccionCargada.map((x, i) => [x.p, String(serie.fabricas[i]), `${n(capacidad.TP[i])} / ${n(capacidad.PE[i])} / ${n(capacidad.DH[i])}`, x.TP, x.PE, x.DH, dec(serie.ocupacion[i], 1) + '%', (['TP', 'PE', 'DH'] as const).map((k) => capacidad.cobertura[k][i] ?? '—').join(' / '), x.nota])], 120, 240, [170, 60, 270, 170, 200, 170, 100, 150, 390], { fontSize: 9, rowH: 52 });
}
{
  const s = annex('A4', 'Unidades, ingresos y marca por mercado', 'Diagnóstico · Informes 1, 2, 3, 5 §3c', 'Marca TP / PE / DH. Participación de OMEGA en unidades de Japón: 42,9% · 44,5% · 48,9% · 46,8% · 40% · 49%.');
  const rows: string[][] = [['', ...SHORT]];
  (['TP', 'PE', 'DH'] as const).forEach((k) => rows.push(['Japón · ' + k, ...unidadesMercado.japon[k].map(n)]));
  rows.push(['Japón · total', ...unidadesMercado.japonTotal.map(n)]);
  (['TP', 'PE', 'DH'] as const).forEach((k) => rows.push(['USA · ' + k, ...unidadesMercado.usa[k].map((v) => (v ? n(v) : '—'))]));
  rows.push(['USA · total', ...unidadesMercado.usaTotal.map((v) => (v ? n(v) : '—'))]);
  rows.push(['Ingresos Japón', ...unidadesMercado.ingresosJapon.map(money)]);
  rows.push(['Ingresos USA', ...unidadesMercado.ingresosUSA.map((v) => (v ? money(v) : '—'))]);
  rows.push(['Marca Japón', ...marcaLinea.japon]);
  rows.push(['Marca USA', ...marcaLinea.usa]);
  tableRows(s, 'light', rows, 120, 230, [300, ...Array(6).fill(230)], { fontSize: 9.5, rowH: 52 });
}
{
  const s = annex('A5', 'Resultados económicos, costo unitario y margen por producto', 'Diagnóstico §4 · Informes 1–5 §3 · Plan 5 §0', 'Resultado después = antes × 0,74 en los seis años. Los informes llaman "resultado neto" al resultado antes de impuestos en las comparaciones del sector.');
  tableRows(s, 'light', [['', ...SHORT], ['Ingresos', ...serie.ingresos.map(money)], ['Resultado operativo', ...serie.resOperativo.map(money)], ['Resultado antes de impuestos', ...serie.resAntesImp.map(money)], ['Resultado después de impuestos', ...serie.resNeto.map(money)], ['Margen sobre ingresos', ...serie.margen.map((v) => v + '%')], ['ROE', ...serie.roe.map((v) => dec(v, 1) + '%')], ['Costo unitario TP / PE / DH', ...SHORT.map((_, i) => `${dec(costoUnitario.TP[i + 1], 1)} / ${dec(costoUnitario.PE[i + 1], 1)} / ${dec(costoUnitario.DH[i + 1], 1)}`)], ['Margen TP / PE / DH (%)', ...SHORT.map((_, i) => `${dec(margenProducto.TP[i], 1)} / ${dec(margenProducto.PE[i], 1)} / ${dec(margenProducto.DH[i], 1)}`)]], 120, 230, [380, ...Array(6).fill(216)], { fontSize: 9.5, rowH: 54 });
  txt(s, 'Margen por unidad 2028 (Plan 4 §1): TP ≈ $120 · PE ≈ $43 · DH ≈ $295. DomoHogar 2030: $56.053.455 (49% de los ingresos).', 120, 760, 1600, 50, { fontSize: 10, color: C.ink2 });
}
{
  const s = annex('A6', 'Cash flow (planilla de la cátedra) y caja del balance', 'CASH_FLOW_OMEGA_DESPUES_DE_DECISION_5.xlsx · hoja Cash Flow Detallado · columnas C–G', 'La planilla es un modelo contable: descuenta la depreciación dentro de fabricación y la implantación estimada ($733.125). Por eso difiere de la caja real del balance.');
  tableRows(s, 'light', [['CONCEPTO', ...cashflow.anios], ...cashflow.filas.map((f) => [f.k, ...f.v.map((v) => (v ? n(v) : '—'))]), ['Flujo del año (33)', ...cashflow.flujo.map(n)], ['Préstamo largo plazo (39)', ...cashflow.prestamo.map((v) => (v ? n(v) : '—'))], ['Saldo final planilla (40)', ...cashflow.saldoFinal.map(n)], ['Caja real del balance', ...cashflow.cajaBalance.map(n)]], 120, 220, [560, ...Array(5).fill(224)], { fontSize: 9, rowH: 46, hiRow: 15 });
}
{
  const s = annex('A7', 'Endeudamiento, inversiones, financiamiento y dividendos', 'Informes 1–5 §3f · Plan 2 §1.2, §8 · Plan 5 §1, §8', 'Préstamo y patrimonio 2029 derivados (≈): préstamo 2028 − amortización 2029 ($1.656.436, planilla F20); patrimonio 2030 / 1,233.');
  tableRows(s, 'light', [['', ...SHORT], ['Ratio de endeudamiento', ...serie.endeudamiento.map((v) => dec(v, 2))], ['Caja (balance)', ...serie.caja.map(money)], ['Préstamo largo plazo', ...serie.prestamoLP.map((v, i) => (i === 4 ? '≈' : '') + money(v))], ['Patrimonio neto', ...serie.patrimonio.map((v, i) => (v == null ? '—' : i === 4 ? '≈$69,5M' : money(v)))], ['Gastos financieros', ...serie.gastosFin.map(money)], ['Dividendos (% s/ resultado previo)', ...serie.dividendos.map((v) => v + '%')]], 120, 230, [380, ...Array(6).fill(216)], { fontSize: 10, rowH: 52, hiRow: 1 });
  txt(s, 'Inversión P2 (2027): HighTechnology USA $31.455.000 (Planta y Equipos 80.666.404 → 112.121.404). Préstamo LP $20.000.000 al 6,3% a 12 años (tope $25M). Alternativas: HT Japón $32.833.202 · Allin One México $16.537.500.\nInversión P5 (2030): segunda HT USA $31.455.000 (→ 143.576.404) con caja propia. Implantación estimada $733.125. Dividendos 30% → 20%.', 120, 640, 1680, 160, { fontSize: 10, color: C.ink2 });
}
{
  const s = annex('A8', 'Competencia y parámetros del Valor de la Compañía', 'Informes 1, 2, 3, 5 §3a, §3d · Plan 5 §0', 'Beta penalizada en 2028 (×0,95) y 2030 (×0,99). La suma simple de los parámetros no coincide exactamente con el valor informado.');
  tableRows(s, 'light', [['VALOR', ...SHORT], ...Object.entries(valorCompetencia).map(([c, v]) => [c, ...v.map(n)])], 120, 230, [150, ...Array(6).fill(110)], { fontSize: 9.5, rowH: 44, hiRow: 1 });
  tableRows(s, 'light', [['SECTOR 2030', 'INGRESOS', 'RES. ANTES IMP.', 'MARGEN', 'DEUDA'], ...competencia2030.map((c) => [c.cia, money(c.ingresos), money(c.resultado), c.margen == null ? '—' : c.margen + '%', dec(c.deuda, 2)])], 120, 540, [150, 230, 230, 110, 90], { fontSize: 9.5, rowH: 44 });
  tableRows(s, 'light', [['PARÁMETRO (PESO)', 'P1', 'P2', 'P3', 'P4', 'P5', 'BETA P5'], ...parametros.map((x) => [`${x.nombre} (${x.peso}%)`, ...x.omega.map(n), n(x.beta2030)])], 990, 230, [330, 75, 75, 75, 75, 75, 105], { fontSize: 9.5, rowH: 44 });
}

const out = path.resolve(process.argv[2] ?? '../entregables/OMEGA_Cinco_decisiones.pptx');
await pptx.writeFile({ fileName: out });
console.log('PPTX:', out);
