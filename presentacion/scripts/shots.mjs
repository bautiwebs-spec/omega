// Captura cada diapositiva (modo ?print) y detecta elementos que se salen del lienzo.
// Uso: node scripts/shots.mjs <carpeta_salida> [lista,de,numeros]
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import path from 'node:path';

const out = process.argv[2];
const only = process.argv[3];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
const errs = [];
p.on('pageerror', (e) => errs.push(e.message));
p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
await p.goto('file://' + path.resolve('dist/index.html') + '?print');
await p.waitForTimeout(1200);
const secs = await p.$$('section.slide');
for (let i = 0; i < secs.length; i++) {
  if (only && !only.split(',').includes(String(i + 1))) continue;
  await secs[i].screenshot({ path: `${out}/s${String(i + 1).padStart(2, '0')}.png` });
}
const over = await p.evaluate(() => {
  const r = [];
  document.querySelectorAll('section.slide').forEach((s, i) => {
    const sb = s.getBoundingClientRect();
    s.querySelectorAll('div, span, b, li, h1, h2, table, text').forEach((el) => {
      const bb = el.getBoundingClientRect();
      if (bb.width && (bb.right > sb.right - 60 || bb.bottom > sb.bottom - 20 || bb.left < sb.left + 60)) {
        r.push(`${i + 1}: <${el.tagName}> r=${Math.round(bb.right - sb.left)} b=${Math.round(bb.bottom - sb.top)} ${(el.textContent || '').slice(0, 40)}`);
      }
    });
  });
  return r.slice(0, 60);
});
console.log('slides', secs.length, 'errors', JSON.stringify(errs));
console.log('near-edge/overflow:\n' + over.join('\n'));
await b.close();
