// Genera el documento de apoyo para el examen oral (Markdown → DOCX con pandoc).
import { writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { NOTAS, TRAZABILIDAD, CONTRADICCIONES } from '../src/notes';
import { SLIDES } from '../src/slides/index';
import { TEAM } from '../src/data';

const outDocx = path.resolve(process.argv[2] ?? '../entregables/OMEGA_Notas_de_exposicion.docx');
const outMd = outDocx.replace(/\.docx$/, '.md');
const esc = (s: string) => s.replace(/\|/g, '\\|');

const L: string[] = [];
L.push('---', 'title: "OMEGA · Cinco decisiones. Una estrategia."', 'subtitle: "Notas de exposición para el examen final oral"', `author: "${TEAM.join(', ')}"`, 'lang: es', 'toc-title: "Índice"', '---', '');
L.push('# Cómo usar este documento', '');
L.push('La presentación tiene 22 diapositivas principales y un anexo de 8 tablas (tecla **A** en la versión web). Las diapositivas muestran solo lo esencial; la explicación está acá.');
L.push('');
L.push('Para cada diapositiva: **objetivo**, **qué decir**, **datos para recordar**, **conceptos teóricos** y **preguntas probables con respuesta y fuente**. Al final: matriz de trazabilidad y registro de contradicciones entre documentos.');
L.push('');
L.push('**Fuente del Período 4:** no hay Informe 4 por un error de la simulación. Las decisiones salen del Plan 4; los resultados de 2029, del punto de partida del Plan 5 y de las columnas 2029 del Informe 5.');
L.push('');
L.push('**Convención de resultados:** "resultado después de impuestos" es el resultado neto del estado de resultados de OMEGA. En las comparaciones con la competencia, los informes llaman "resultado neto" al resultado *antes* de impuestos.');
L.push('');
L.push('## Guion en una página', '');
L.push('| # | Diapositiva | Idea en una frase |', '|---|---|---|');
const main = SLIDES.filter((s) => !s.annex);
main.forEach((s, i) => {
  const nt = NOTAS.find((x) => x.id === s.id);
  L.push(`| ${i + 1} | ${esc(s.name)} | ${esc(nt?.objetivo ?? '')} |`);
});
L.push('');

main.forEach((s, i) => {
  const nt = NOTAS.find((x) => x.id === s.id);
  if (!nt) return;
  L.push(`# ${i + 1}. ${s.name}`, '');
  L.push(`*${s.act}*`, '');
  L.push(`**Objetivo.** ${nt.objetivo}`, '');
  L.push('**Qué explicar oralmente**', '');
  nt.decir.forEach((d) => L.push(`- ${d}`));
  L.push('', '**Datos para recordar**', '');
  nt.datos.forEach((d) => L.push(`- ${d}`));
  L.push('', `**Conceptos teóricos relacionados.** ${nt.conceptos.join(' · ')}`, '');
  L.push('**Preguntas que podría hacer la profesora**', '');
  nt.preguntas.forEach((q) => { L.push(`> **P:** ${q.q}`, '>', `> **R:** ${q.a}`, ''); });
});

L.push('# Anexo de la presentación', '');
SLIDES.filter((s) => s.annex).forEach((s) => L.push(`- **${s.name}**`));
L.push('');
L.push('# Matriz de trazabilidad', '');
L.push('| Dato | Valor | Archivo y sección / celda |', '|---|---|---|');
TRAZABILIDAD.forEach((t) => L.push(`| ${esc(t.dato)} | ${esc(t.valor)} | ${esc(t.fuente)} |`));
L.push('');
L.push('Abreviaturas: "Informe N" = Informe_N_Omega.docx · "Plan N" = Plan_Decisiones_Omega_PeriodoN.docx · "planilla D3/D4/D5" = CASH_FLOW_OMEGA_DESPUES_DE_DECISION_3/4/5.xlsx, hoja *Cash Flow Detallado* (columnas C=2026 … G=2030).');
L.push('');
L.push('# Registro de contradicciones y criterio usado', '');
L.push('| Tema | Qué dicen los documentos | Criterio en la presentación |', '|---|---|---|');
CONTRADICCIONES.forEach((c) => L.push(`| ${esc(c.tema)} | ${esc(c.detalle)} | ${esc(c.criterio)} |`));
L.push('');

writeFileSync(outMd, L.join('\n'));
const ref = path.resolve('scripts/reference.docx');
execFileSync('pandoc', [outMd, '-o', outDocx, '--toc', '--toc-depth=1', `--reference-doc=${ref}`]);
console.log('DOCX:', outDocx);
