# OMEGA · Cinco decisiones. Una estrategia.

Presentación para el examen final oral de Simulación Empresarial: la evolución de la compañía OMEGA en cinco períodos (2025 → 2030).

## Entregables (`entregables/`)

| Archivo | Para qué |
|---|---|
| `OMEGA_presentacion.html` | **Presentación principal.** Un solo archivo: se abre con doble clic en Chrome, Edge o Safari y funciona sin internet. |
| `OMEGA_Cinco_decisiones.pptx` | Versión editable en PowerPoint con gráficos nativos y notas del orador en cada diapositiva. |
| `OMEGA_Cinco_decisiones.pdf` | Respaldo idéntico a la versión web (30 páginas: 22 principales + 8 de anexo). |
| `OMEGA_Notas_de_exposicion.docx` | Guía de estudio: por diapositiva, qué decir, datos, conceptos y preguntas probables con respuesta. Al final, la matriz de trazabilidad y el registro de contradicciones. |

### Teclas de la versión web

| Tecla | Acción |
|---|---|
| → · espacio · PageDown · Enter | siguiente (compatible con presentadores inalámbricos) |
| ← · PageUp | anterior |
| F | pantalla completa |
| G | grilla con todas las diapositivas |
| A | ir al anexo / volver a la diapositiva donde estabas |
| Inicio · Fin | primera / última diapositiva principal |

**En tablet o celular (iPad, Android, iPhone):** deslizar el dedo hacia la izquierda avanza y hacia la derecha retrocede. Tocar el borde izquierdo de la pantalla retrocede y el resto avanza. Al tocar o mover el mouse aparece una barra con ‹ ›, Índice, Anexo y pantalla completa; se oculta sola a los pocos segundos.
**Teclado externo en iPad:** tocá la diapositiva una vez para que la página tenga el foco; después las flechas funcionan.
La URL guarda el número de diapositiva (`#/12`) cuando el navegador lo permite.
Con "reducir movimiento" activado en el sistema, todo aparece sin animaciones.

### Sobre el PowerPoint

Usa Arial para verse igual en cualquier computadora. La versión web y el PDF usan la tipografía Geist (embebida).

## Estructura (22 diapositivas + anexo)

1. **Acto 1 · Punto de partida:** portada, la empresa que recibimos, diagnóstico (FODA, PESTEL, 5 fuerzas).
2. **Acto 2 · Cinco decisiones:** mapa de los cinco períodos; P1 (2), P2 (3), P3 (1), P4 (2), P5 (2).
3. **Acto 3 · Evolución global:** valor, ingresos y resultados, comercial, operativa, financiera.
4. **Acto 4 · Balance:** "ganar más no es valer más", qué funcionó / qué costó / qué cambiaríamos.
5. **Acto 5 · Cierre:** 2025 vs. 2030.
6. **Anexo A1–A8:** precios, presupuestos, producción y capacidad, mercados y marca, resultados y márgenes, cash flow, endeudamiento e inversiones, competencia y parámetros.

**Período 4:** no hay Informe 4 por un error de la simulación. Las decisiones salen del Plan 4; los resultados 2029, del Plan 5 (§0) y de las columnas 2029 del Informe 5.

## Fuentes y control de datos

- `docs/01_investigacion_omega.md` — reconstrucción completa de la etapa, proyectado vs. realizado y registro de contradicciones.
- `presentacion/src/data.ts` — fuente única de cifras (web, PPTX y anexo); cada bloque indica su documento de origen.
- `presentacion/src/notes.ts` — notas de exposición, matriz de trazabilidad y contradicciones.

## Regenerar los entregables

```bash
cd presentacion
npm install
npm run all          # web (dist/index.html) + PDF + PPTX + notas en ../entregables
node scripts/qa.mjs  # auditoría de navegación, escalado, offline y movimiento reducido
npm run dev          # servidor local para editar
```
