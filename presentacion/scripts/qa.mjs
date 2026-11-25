// Auditoría funcional de la presentación web (dist/index.html).
import { createRequire } from 'node:module';
import path from 'node:path';
const { chromium } = createRequire(import.meta.url)('playwright');

const url = 'file://' + path.resolve('dist/index.html');
const b = await chromium.launch();
const res = [];
const ok = (name, cond, extra = '') => res.push(`${cond ? 'OK  ' : 'FAIL'} ${name}${extra ? ' — ' + extra : ''}`);

// 1. Navegación por teclado
const ctx = await b.newContext({ viewport: { width: 1920, height: 1080 } });
const p = await ctx.newPage();
const errs = [];
p.on('pageerror', (e) => errs.push(e.message));
await p.goto(url);
await p.waitForTimeout(500);
const counter = () => p.textContent('.counter');
ok('arranca en 01 / 22', (await counter()).trim() === '01 / 22', await counter());
await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight');
ok('flecha derecha avanza', (await counter()).trim() === '03 / 22' && p.url().endsWith('#/3'), p.url());
await p.keyboard.press('ArrowLeft');
ok('flecha izquierda retrocede', (await counter()).trim() === '02 / 22');
await p.keyboard.press('PageDown'); await p.keyboard.press('Space');
ok('PageDown y espacio (presentador)', (await counter()).trim() === '04 / 22');
await p.keyboard.press('End');
ok('Fin va a la última principal', (await counter()).trim() === '22 / 22');
await p.keyboard.press('ArrowRight');
ok('después del cierre entra al anexo', (await counter()).includes('ANEXO'));
await p.keyboard.press('Home'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight');
await p.keyboard.press('a');
ok('A abre el anexo', (await counter()).includes('A1'), await counter());
await p.keyboard.press('a');
ok('A de nuevo vuelve a la diapositiva', (await counter()).trim() === '05 / 22', await counter());
await p.keyboard.press('g');
ok('G abre la grilla', await p.isVisible('.grid'));
const thumbs = await p.$$('.grid .grid-item');
ok('grilla con 30 miniaturas', thumbs.length === 30, String(thumbs.length));
await thumbs[14].click();
ok('clic en miniatura navega', (await counter()).trim() === '15 / 22' && !(await p.isVisible('.grid')));
await p.goto(url + '#/9'); await p.reload(); await p.waitForTimeout(300);
ok('enlace directo #/9', (await counter()).trim() === '09 / 22');

// 2. Cifras animadas terminan en el valor exacto
await p.goto(url + '#/6'); await p.reload(); await p.waitForTimeout(2600);
const big = await p.$$eval('.slide .big', (els) => els.map((e) => e.textContent));
ok('contador de valor termina en 3.483', big.includes('3.483'), big.slice(0, 4).join(' | '));
ok('contador termina en +38,5%', big.some((t) => t.includes('38,5')));

// 3. Escalado a distintas pantallas (el lienzo entra completo, sin scroll)
for (const [w, h] of [[1280, 720], [1366, 768], [1440, 900], [2560, 1440], [1024, 768]]) {
  await p.setViewportSize({ width: w, height: h });
  await p.waitForTimeout(150);
  const r = await p.$eval('.canvas', (e) => { const b = e.getBoundingClientRect(); return [b.left, b.top, b.right, b.bottom]; });
  const scroll = await p.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.scrollHeight]);
  ok(`escala ${w}×${h}`, r[0] >= -0.5 && r[1] >= -0.5 && r[2] <= w + 0.5 && r[3] <= h + 0.5 && scroll[0] <= w && scroll[1] <= h, r.map(Math.round).join(','));
}

// 4. Movimiento reducido: todo visible al instante
const ctx2 = await b.newContext({ viewport: { width: 1920, height: 1080 }, reducedMotion: 'reduce' });
const p2 = await ctx2.newPage();
await p2.goto(url + '#/10'); await p2.waitForTimeout(150);
const op = await p2.$$eval('.slide .rv', (els) => els.map((e) => getComputedStyle(e).opacity));
ok('reduced-motion: elementos visibles sin animar', op.length > 0 && op.every((o) => o === '1'), `${op.length} elementos`);
const big2 = await p2.$$eval('.slide .big', (els) => els.map((e) => e.textContent));
await p2.goto(url + '#/6'); await p2.reload(); await p2.waitForTimeout(150);
const big3 = await p2.$$eval('.slide .big', (els) => els.map((e) => e.textContent));
ok('reduced-motion: cifras finales sin conteo', big3.includes('3.483'), big3.slice(0, 2).join(' | '));

// 5. Sin recursos externos (funciona offline)
const ctx3 = await b.newContext({ viewport: { width: 1920, height: 1080 }, offline: true });
const p3 = await ctx3.newPage();
const reqs = [];
p3.on('request', (r) => { if (!r.url().startsWith('file:') && !r.url().startsWith('data:')) reqs.push(r.url()); });
await p3.goto(url); await p3.waitForTimeout(800);
const fontOk = await p3.evaluate(() => document.fonts.check('600 40px "Geist Sans"') && document.fonts.check('400 20px "Geist Mono"'));
ok('offline: sin pedidos externos', reqs.length === 0, reqs.join(' '));
ok('offline: tipografías embebidas cargadas', fontOk);

ok('sin errores de JavaScript', errs.length === 0, errs.join(' | '));
console.log(res.join('\n'));
await b.close();
