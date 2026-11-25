// Imprime todas las diapositivas (modo ?print) a un PDF 1920×1080 por página.
import { createRequire } from 'node:module';
import path from 'node:path';
const { chromium } = createRequire(import.meta.url)('playwright');

const out = path.resolve(process.argv[2] ?? '../entregables/OMEGA_Cinco_decisiones.pdf');
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await p.goto('file://' + path.resolve('dist/index.html') + '?print');
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(800);
await p.addStyleTag({ content: '@page { size: 1920px 1080px; margin: 0 } html, body { margin: 0 }' });
await p.pdf({ path: out, width: '1920px', height: '1080px', printBackground: true, preferCSSPageSize: true });
await b.close();
console.log('PDF:', out);
