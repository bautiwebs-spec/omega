// Notas de exposición por diapositiva (se usan en el PPTX como notas del orador y en el documento de estudio).
export interface Nota {
  id: string;
  objetivo: string;
  decir: string[];
  datos: string[];
  conceptos: string[];
  preguntas: { q: string; a: string }[];
}

export const NOTAS: Nota[] = [
  {
    id: 'portada',
    objetivo: 'Presentar al equipo y la tesis de la exposición en una frase.',
    decir: [
      'Somos el equipo que administró OMEGA durante cinco períodos de simulación (2026 a 2030), partiendo de la situación de 2025.',
      'La tesis: cada período tomamos una decisión central, y las cinco responden a una misma estrategia de diferenciación, condicionada siempre por la capacidad.',
      'La línea de la derecha es el valor de la compañía: de 3.139 a 3.847 puntos.',
    ],
    datos: ['Valor inicial 3.139 (igual para las cinco compañías)', 'Valor final 3.847 (2° del sector)', 'Integrantes: Violeta Behar, Joaquín Malti, Jeronimo Paterson, Bautista Sequeira'],
    conceptos: ['Planificación estratégica', 'Toma de decisiones'],
    preguntas: [
      { q: '¿Por qué "una estrategia"?', a: 'Porque desde el diagnóstico elegimos diferenciación (marca, tecnología, innovación) y nunca competimos por precio bajo: todas las decisiones de precio, promoción, innovación e inversión se explican desde ahí.' },
    ],
  },
  {
    id: 'empresa',
    objetivo: 'Mostrar qué empresa recibimos: líder en intangibles, rezagada en tamaño y concentrada en un mercado.',
    decir: [
      'OMEGA vendía solo en Japón y Corea, con dos fábricas HighTechnology en Japón y tres líneas: TecnoPersonal, Pequeño Electrodoméstico y DomoHogar.',
      'Tenía la marca más alta (55), la tecnología más alta (7) y el endeudamiento más bajo (0,22), pero era la más chica en unidades (13,0%).',
      'Tres brechas: capacidad desbalanceada (TP al 99% y cubriendo 54% de su demanda; DH al 66,7%), innovación estancada (PE y DH en 4, bajo la referencia), y dependencia de un solo mercado donde veníamos perdiendo participación (49% a 43%).',
      'El freno no era la demanda sino la capacidad: Japón creció 19,5% y nosotros 7,3%.',
    ],
    datos: ['Ingresos 2025: $48.303.235 (+7,3%)', 'Resultado después de impuestos 2025: $3.199.016 (+153%)', 'Margen 45% (2° del sector)', 'Ocupación: TP 99% · PE 95,7% · DH 66,7%', 'Delta vendía más barato: 224 / 68 / 680 contra 228 / 74 / 685', 'Caja $2.568.633; Crédito Extraordinario cancelado'],
    conceptos: ['Análisis interno', 'Capacidad instalada', 'Participación de mercado', 'Indicadores de gestión'],
    preguntas: [
      { q: '¿Por qué decían que el problema era la capacidad y no la demanda?', a: 'Porque TecnoPersonal trabajaba al 99% y aun así cubría solo el 54% de su demanda estimada (≈53.000 unidades sin atender). El mercado japonés creció 19,5% y nosotros no podíamos producir más (Diagnóstico §4).' },
      { q: '¿Qué indicadores eligieron para medir la gestión?', a: 'Valor de la compañía, marca, unidades, participación, margen, resultado neto, innovación, endeudamiento, inventario sobre ventas y ocupación de fábricas (Diagnóstico §2).' },
    ],
  },
  {
    id: 'diagnostico',
    objetivo: 'Sintetizar FODA, PESTEL y 5 fuerzas y justificar la estrategia genérica.',
    decir: [
      'El FODA cruza lo interno (marca, tecnología, deuda baja vs. dependencia y capacidad) con lo externo (demanda sin cubrir y mercados de alta renta vs. Delta, Beta y el flete).',
      'De las 5 fuerzas, la rivalidad es alta y va a crecer; las barreras de entrada son altas.',
      'Conclusión: estrategia de diferenciación de Porter. Competir por precio contra Delta, que tiene mejores costos y el mejor margen (49%), era perder la ventaja de la marca.',
      'Además, Japón tiene 43% de Innovadores + Conservadores, segmentos que valoran marca y tecnología.',
    ],
    datos: ['USA y Canadá: renta 40.400 y 24% de demanda sin cubrir', 'UE Occidental: renta 28.100 y 34% sin cubrir, flete cat. 5', 'Beta vendía 2,6 veces más unidades (763.465)', 'Costo unitario 2025: 124 / 30 / 426'],
    conceptos: ['FODA', 'PESTEL', '5 fuerzas de Porter', 'Estrategia genérica: diferenciación', 'Segmentación'],
    preguntas: [
      { q: '¿Por qué no liderazgo en costos?', a: 'Delta ya vendía más barato y con mejor margen; Beta tenía escala (2,6 veces nuestras unidades). Nuestra ventaja estaba en marca y tecnología, y los segmentos Innovadores y Conservadores pesaban 43% en Japón (Diagnóstico §3 y §6).' },
      { q: '¿Qué fuerza era la más peligrosa?', a: 'La rivalidad: cinco compañías con fábricas cerca del límite (87% a 93% de ocupación), que iban a salir a buscar mercados nuevos, y Delta como único rival en Japón con precios más bajos.' },
    ],
  },
  {
    id: 'decisiones',
    objetivo: 'Dar el mapa del Acto 2: cinco decisiones con su resultado en valor.',
    decir: [
      'El hilo de toda la historia: en cada período la demanda superó a nuestra capacidad.',
      'P1 optimizamos sin construir; P2 expandimos con fábrica y mercado; P3 consolidamos con el mismo gasto; P4 buscamos rentabilidad por precio; P5 invertimos con caja propia.',
      'Fíjense en la fila de endeudamiento: el salto a 0,61 en P2 es el costo de la expansión, y explica buena parte del final.',
    ],
    datos: ['Valor: 3.483 · 3.560 · 3.769 · 3.829 · 3.847', 'Puesto: 2° · 2° · 1° · 2° · 2°', 'Endeudamiento: 0,22 · 0,61 · 0,52 · 0,42 · 0,35'],
    conceptos: ['Planificación por períodos', 'Toma de decisiones secuencial'],
    preguntas: [
      { q: '¿Cuál fue la decisión más importante?', a: 'La del P2 (fábrica en USA + entrada al mercado en el mismo período): transformó la empresa (de 2 a 3 fábricas, de 1 a 2 mercados, resultado +99,5%), aunque también trajo el endeudamiento que nos frenó después.' },
    ],
  },
  {
    id: 'p1-decision',
    objetivo: 'Justificar por qué en P1 no salimos a otro mercado y qué palancas usamos.',
    decir: [
      'La profesora planteó la pregunta: salir a un mercado nuevo, que era "jugado", o rentabilizar lo que teníamos.',
      'No había producto libre: TP al 99% y PE al 95,7%. Abrir un mercado repartía la misma producción.',
      'Postergamos la fábrica porque dónde vender define dónde producir, y compramos los informes de USA y UE para decidir con datos.',
      'Cinco palancas: subir el precio de TP (la demanda doblaba la producción), corregir la innovación de PE y DH (estaban debajo del mínimo del manual), subir tecnología de 7 a 8, reforzar la promoción en las marcas más bajas y producir más DomoHogar.',
      'Diferencia plan/ejecución: el plan bajaba los dividendos a 50%, pero quedaron en 80%.',
    ],
    datos: ['Precio TP 228 → 238 (+4,4%), 8% debajo de la referencia (260)', 'Innovación $1,16M → $1,85M (PE 600k, DH 850k)', 'Tecnología $250k → $750k', 'Promoción $3,715M → $4,6M', 'DH 25.000 → 32.000 unidades', 'Segmentos 7/7/7 → 7/6/8', 'Informes $70.000'],
    conceptos: ['Capacidad instalada', 'Precio según demanda', 'Costo unitario y tecnología', 'Planificación estratégica', 'Marketing mix'],
    preguntas: [
      { q: '¿Por qué subieron el precio si querían ganar participación?', a: 'Solo en TecnoPersonal, donde la demanda era casi el doble de la producción: las unidades no podían crecer, así que subir precio aumentaba el margen sin perder ventas (Plan 1 §3). Se vendió prácticamente lo mismo (61.753 vs 62.044).' },
      { q: '¿Por qué no bajaron el precio de DomoHogar para venderlo?', a: 'Porque era la línea de menor margen (37,8%). La demanda se buscó con innovación y promoción (Plan 1 §3).' },
      { q: '¿Por qué no se bajaron los dividendos?', a: 'El plan lo proponía para proteger la caja, pero finalmente quedó en 80% (Informe 1 §2g). No tuvo impacto negativo: la caja llegó a $10,1M.' },
    ],
  },
  {
    id: 'p1-resultado',
    objetivo: 'Mostrar que P1 funcionó y que dejó en evidencia el límite de capacidad.',
    decir: [
      'El valor creció 10,98%, por encima del 8% del manual; quedamos segundos a 30 puntos de Beta.',
      'El resultado creció 38,5%, la marca saltó de 55 a 79 y la tecnología bajó el costo unitario 5% a 6,3%.',
      'Pero el informe de demanda mostró que dejábamos sin atender unas 116.000 unidades: eso abre el P2.',
      'Proyectamos un resultado parecido a 2025 y salió mucho mejor: fuimos conservadores.',
    ],
    datos: ['Ingresos $54.277.510 (+12,4%)', 'Resultado después de impuestos $4.429.045 (+38,5%)', 'Margen 47%', 'DomoHogar +28,1% (35.574 u.), ocupación 86,5%', 'Ahorro por tecnología ≈ $1,6M vs. +$0,5M de presupuesto', 'Participación en Japón 42,9% → 44,5%', 'Caja $10.116.118'],
    conceptos: ['Economías de escala / eficiencia', 'Rentabilidad', 'Análisis de indicadores', 'Desvío plan vs. real'],
    preguntas: [
      { q: '¿Por qué el parámetro de Tecnología quedó último si tenían el nivel más alto?', a: 'El informe interpretó que el parámetro no mide el nivel sino la mejora relativa del período; Beta, con nivel 2, obtuvo el mejor puntaje (Informe 1 §3a).' },
      { q: '¿Cómo se calcula el ahorro de $1,6M?', a: 'Aplicando la baja del costo unitario (TP 124,2→116,4; PE 30,3→28,8; DH 426,4→405,1) a las unidades producidas (Informe 1 §4d).' },
    ],
  },
  {
    id: 'p2-seleccion',
    objetivo: 'Defender la elección de USA y de una fábrica HighTechnology en USA.',
    decir: [
      'Con los informes comprados comparamos USA, UE Occidental y Japón.',
      'USA tenía la renta más alta, 55% de Innovadores + Conservadores (el mercado que mejor paga la diferenciación), la penetración más baja (61%-64%) y un solo competidor (Gama).',
      'Para la fábrica: la HT en Japón era más cara y se habría llenado con demanda japonesa, mandando producto a USA con flete cat. 3. La Allin One de México costaba la mitad pero no teníamos esa tecnología (nivel 0), pagaba 16% de impuestos y su capacidad superaba la demanda libre.',
      'Elegimos HighTechnology en USA: produce donde vende, con flete local.',
      'Y la clave: fábrica y mercado en el mismo período, para que la planta no quedara ociosa, que era el riesgo que marcó la profesora.',
    ],
    datos: ['Sin atender en USA: 34.700 TP / 118.400 PE / 17.700 DH (≈$25,5M a precio de referencia)', 'HT USA $31.455.000 · HT Japón $32.833.202 · Allin One México $16.537.500', 'Precio de entrada USA 195 / 59 / 640 (entre Gama 190/58/630 y la referencia 200/60/650)'],
    conceptos: ['Segmentación y selección de mercado', 'Análisis de demanda', 'Costos logísticos', 'Inversión', 'Posicionamiento'],
    preguntas: [
      { q: '¿Por qué no UE Occidental si tenía más demanda sin cubrir en PE?', a: 'Tenía el flete más caro desde Japón (categoría 5), dos competidores y menos peso de Innovadores + Conservadores (44% vs. 55%) (Plan 1 §1.2, Plan 2 §1.1).' },
      { q: '¿El descuento de 50% por construir donde ya operan no hacía más barata a Japón?', a: 'No: ese descuento aplica al costo de implantación, no a la inversión. La planta en Japón igual costaba más ($32,8M vs $31,5M) (Plan 2 §1.2).' },
      { q: '¿Por qué entrar con precio debajo de la referencia si eran diferenciados?', a: 'Porque entrábamos con marca cero. El aprendizaje de Delta en UE fue que entrar a la referencia obligó a bajar precio después. Entramos entre Gama y la referencia, apoyados en mejor innovación (Plan 2 §3).' },
    ],
  },
  {
    id: 'p2-mapa',
    objetivo: 'El momento visual de la expansión: qué pasó en cada mercado.',
    decir: [
      'La planta de USA produjo desde el primer día y abasteció los dos mercados.',
      'En USA vendimos 85.769 unidades el primer año (18,5% de los ingresos).',
      'Y Japón creció 20,3% porque la planta de USA liberó capacidad: unas 10.000 unidades de TP y 41.000 de PE se enviaron a Japón, que paga precios más altos.',
      'Resultado después de impuestos +99,5%, unidades +48,6%, ocupación 96,9% (la más alta del sector).',
    ],
    datos: ['Japón 364.432 u. (+20,3%), 48,9% del mercado japonés', 'USA: TP 18.665 · PE 55.420 · DH 11.684', 'Marca USA 26-27 puntos en el primer año', 'Logística 1,7% de los ingresos', 'Ingresos $77.792.570 (+43,3%)'],
    conceptos: ['Capacidad productiva', 'Logística', 'Expansión geográfica', 'Utilización de la capacidad'],
    preguntas: [
      { q: '¿No era ineficiente mandar producto de USA a Japón con flete cat. 5?', a: 'Era un uso transitorio previsto en el plan: en Japón esas unidades se venden más caras (238/74 vs 195/59) y la logística total fue solo 1,7% de los ingresos (Plan 2 §2, Informe 2 §3e).' },
      { q: '¿Cómo verificaron que la fábrica produciría ese mismo período?', a: 'Con un orden de carga: primero se compró la fábrica, se verificó que aparecieran sus filas de producción y recién después se tildó el mercado nuevo (Plan 2 §11.1).' },
    ],
  },
  {
    id: 'p2-costo',
    objetivo: 'Explicar honestamente por qué el valor creció poco y qué aprendimos.',
    decir: [
      'El resultado se duplicó pero el valor creció solo 2,19%, por debajo del 8%.',
      'Dos parámetros: Innovación cayó 61 puntos porque sostuvimos los niveles (el parámetro premia la mejora, no el nivel) y Endeudamiento cayó 30 por el préstamo.',
      'Financiamos la fábrica con un préstamo de largo plazo de $20M al 6,3% a 12 años, nunca con Crédito Extraordinario, y bajamos dividendos a 50%.',
      'Error de dimensionamiento: cerramos con $12,1M de caja cuando estimábamos $5,5M; con $13M-14M alcanzaba y el ratio habría quedado cerca de 0,5.',
      'En defensa: había incertidumbre real (planta en país nuevo, mercado sin historia, costo de implantación desconocido).',
    ],
    datos: ['Parámetros: Resultados +99, Participación +27, Marca +19, Tecnología +10, Endeudamiento −30, Innovación −61', 'Endeudamiento 0,22 → 0,61 (el más alto; Delta 0,41, Alfa 0,27, Beta y Gama 0,19)', 'Gastos financieros $256.840 → $867.421', 'Préstamo LP $4.000.804 → $23.756.679'],
    conceptos: ['Financiamiento', 'Apalancamiento y riesgo financiero', 'Estructura de capital', 'Costo de oportunidad'],
    preguntas: [
      { q: '¿Por qué no financiaron todo con caja?', a: 'La caja era $10,1M y la fábrica $31,5M; después de dividendos quedaban ≈$7,9M (Plan 2 §8.1).' },
      { q: '¿Fue un error el préstamo?', a: 'Fue correcto en tipo (largo plazo y no Crédito Extraordinario: los intereses subieron $610.581 frente a un resultado que creció $5,95M), pero grande en monto: bastaban $13M-14M (Informe 2 §3f y §4f).' },
      { q: '¿Por qué bajó Innovación si mantuvieron los niveles?', a: 'Porque el parámetro premia la mejora del período: Beta, con nivel 3, obtuvo el máximo (601). Lo confirmamos en P3, cuando subir un grado sumó 106 puntos (Informe 2 §3a, Informe 3 §3a).' },
    ],
  },
  {
    id: 'p3',
    objetivo: 'Mostrar la consolidación: mismo gasto, reasignado, y la corrección del error de innovación.',
    decir: [
      'La profesora pidió no abrir mercados ni fábricas, no pedir préstamos y no elevar el gasto.',
      'Mantuvimos el total en $9,6M pero lo reasignamos: bajamos $500.000 de promoción en Japón, donde TP ya tenía marca 100, y los pusimos en innovación (+$350.000) y tecnología (+$150.000).',
      'Resultados: PE y DH subieron de 5 a 6, el parámetro de Innovación recuperó 106 puntos; tecnología llegó a 10; USA creció 36,2% y la marca allí pasó de 26 a 41; cargar más DH en USA bajó su costo de $431 a $377.',
      'Endeudamiento 0,61 → 0,52 sin préstamos y caja $23,7M. OMEGA quedó primera en valor, aunque Beta estaba penalizada (×0,95).',
      'Lo pendiente: mantuvimos precios con la demanda 60% por encima de la capacidad, y quedamos cuartos en margen.',
    ],
    datos: ['Valor 3.769 (+5,87%), 1° · Beta 3.732 penalizada (≈3.928 sin penalización)', 'Resultado después de impuestos $10.787.827 (+22,1%)', 'Ingresos $83.944.565 (+7,9%)', 'Resultado operativo sobre ingresos 19,1%', 'Marca Japón 100 / 100 / 100', 'Delegación USA planificada pero no instalada'],
    conceptos: ['Eficiencia en la asignación de recursos', 'Productividad', 'Costos fijos y escala (DH USA)', 'Rentabilidad', 'Rendimientos decrecientes de la promoción'],
    preguntas: [
      { q: '¿Merecían el primer puesto?', a: 'El avance fue real (resultado +22,1%, deuda abajo, innovación recuperada), pero Beta fue penalizada por no tomar todas sus decisiones; sin la penalización habría quedado arriba (≈3.732/0,95 = 3.928). Lo decimos así en el Informe 3 §1.' },
      { q: '¿Por qué recortar promoción no bajó la marca?', a: 'Porque estaba saturada: TP en 100 con $2,1M. Con $1,6M la marca de las tres líneas llegó igual a 100 (Informe 3 §3c).' },
      { q: '¿Por qué bajó el costo de DomoHogar en USA?', a: 'Al cargar la planta de 10.000 a 17.000 unidades, los costos fijos de la línea se repartieron entre más unidades (de $431 a $377).' },
    ],
  },
  {
    id: 'p4-decision',
    objetivo: 'Explicar la lógica de rentabilidad: margen por unidad, precio y retorno marginal.',
    decir: [
      'Aclaración de fuente: del Período 4 no hay informe por un error de la simulación. Las decisiones salen del Plan 4 y los resultados, del Plan 5 y de la columna 2029 del Informe 5.',
      'La profesora preguntó qué producto deja más plata. PE tiene el mayor margen porcentual (61,8%) pero apenas ≈$43 por unidad; DomoHogar tiene 43,8% pero ≈$295 por unidad y es el que más margen bruto total aporta.',
      'No conviene producir menos de uno para producir más de otro: cada planta tiene capacidad separada por producto.',
      'Como la demanda superaba la capacidad en 60%, subimos precios 3% a 5%, sin pasar al competidor más caro.',
      'Tecnología ya estaba en el máximo: bajamos de $1,0M a $0,4M de mantenimiento porque su retorno marginal era casi nulo.',
      'Equiparamos la promoción por retorno: menos en Japón (marca 100) y más en USA (marca 40). Dividendos 30% para bajar el endeudamiento.',
    ],
    datos: ['Margen por unidad 2028: TP ≈$120 · PE ≈$43 · DH ≈$295', 'Margen bruto total: ≈$11,2M · $13,5M · $17,9M', 'Precios Japón 250 / 74 / 705 · USA 205 / 61 / 660', 'Gasto estratégico $9,6M → $9,25M'],
    conceptos: ['Margen de contribución unitario', 'Estrategia de precios', 'Elasticidad y demanda insatisfecha', 'Retorno marginal', 'Eficiencia operativa'],
    preguntas: [
      { q: '¿No era riesgoso subir precios?', a: 'La demanda estimada superaba la capacidad en 60% en TP y PE; con más compradores que producto, la suba no debía costar unidades. Y las unidades se sostuvieron (+0,4%) (Plan 4 §3, Informe 5 2029).' },
      { q: '¿Por qué no llevaron la tecnología a cero?', a: 'Se dejó un mantenimiento de $400.000 por si el simulador desgastaba el nivel sin inversión; la tecnología se mantuvo en 10 (Plan 4 §6).' },
      { q: '¿Por qué no hay Informe 4?', a: 'Hubo un error en la simulación en ese período. Los datos de 2029 están en el punto de partida del Plan 5 y en la columna 2029 del Informe 5.' },
    ],
  },
  {
    id: 'p4-resultado',
    objetivo: 'Mostrar el efecto del precio en el margen y el resultado, y el efecto no buscado.',
    decir: [
      'El margen pasó de 48% a 50%, el resultado creció 20,3% y el endeudamiento bajó a 0,42, como estaba previsto.',
      'El valor quedó en 3.829, a solo 5 puntos de Beta.',
      'Proyectamos +$3,3M de resultado antes de impuestos y logramos +$2,96M: cerca de lo previsto.',
      'Efecto no buscado: PE en Japón a 74, más caro que Delta (72), perdió 14,9% de unidades. Lo corregimos en P5.',
    ],
    datos: ['Resultado antes de impuestos $17.534.966 · después $12.975.875', 'Ingresos $87.202.235 (+3,9%)', 'Unidades 467.700', 'Caja $39.417.991', 'Logística $1.216.968 (−27%)', 'Marca Japón 99-100 · USA 58-60', 'Innovación 7,0 (las tres líneas en 7)'],
    conceptos: ['Rentabilidad', 'Elasticidad precio', 'Control de gestión (plan vs. real)'],
    preguntas: [
      { q: '¿Por qué perdieron ventas de PE en Japón si subió la demanda en general?', a: 'PE quedó a 74 contra 72 de Delta: en la línea más sensible al precio, la diferencia pesó. Las unidades bajaron de 234.824 a 199.736 (Plan 5 §4).' },
      { q: '¿Qué dejó a OMEGA a 5 puntos de Beta?', a: 'Principalmente Endeudamiento y Solvencia: 68 puntos detrás de Beta (Plan 5 §0).' },
    ],
  },
  {
    id: 'p5-decision',
    objetivo: 'Defender la segunda planta en USA pagada con caja propia en el último período.',
    decir: [
      'Dos datos definían el cierre: faltaba capacidad (cubríamos 72%/70%/73% de la demanda) y sobraba caja ($39,4M).',
      'La demanda sin atender (36.000 / 134.000 / 23.000) superaba lo que produce una planta HT (30.000 / 100.000 / 20.000): la producción nueva ya tenía compradores.',
      'Al ser el último período, la inversión tenía que rendir en el mismo año; ya sabíamos por P2 que una planta produce desde el período en que se compra.',
      'La pagamos con caja: el ratio es pasivo sobre patrimonio, así que con caja el pasivo no sube. Con préstamo hubiéramos empeorado justo el parámetro donde perdíamos con Beta.',
      'Descartamos un mercado nuevo: marca cero en el último período y flete caro; la demanda propia alcanzaba.',
    ],
    datos: ['Inversión $31.455.000 + implantación estimada $733.125 = $32.188.125', 'Capacidad total 126.000 / 420.000 / 84.000', 'Promoción $7,0M (USA $3,7M) + delegación USA $294.157', 'Innovación $3,15M para pasar las tres líneas a 8', 'Dividendos 20% (pagó $2.595.175)', 'PE Japón 74 → 72'],
    conceptos: ['Evaluación de inversiones', 'Fuentes de financiamiento (propio vs. ajeno)', 'Estructura de capital', 'Capacidad vs. demanda'],
    preguntas: [
      { q: '¿No era arriesgado invertir $32M en el último período?', a: 'La demanda insatisfecha superaba la capacidad de la planta y ya habíamos comprobado en P2 que produce el mismo período. El resultado creció 44,7%, por encima del 35% estimado (Informe 5 §4a).' },
      { q: '¿El manual no limitaba a tres fábricas?', a: 'El límite se refiere a fábricas compradas: OMEGA había comprado una sola (USA 2027) y Beta ya tenía cuatro (Plan 5 §1.1).' },
      { q: '¿Cómo cierra el cash flow?', a: 'En la planilla de la cátedra el saldo 2030 queda en $417.768 (proyectábamos entre −$2M y +$1M), porque el modelo descuenta depreciación. La caja real del balance cerró en $31,3M (Plan 5 §9, Informe 5 §3f).' },
    ],
  },
  {
    id: 'p5-resultado',
    objetivo: 'Mostrar el mejor año económico y explicar honestamente qué no salió como se planeó.',
    decir: [
      'Fue el mejor año: ingresos +30,4%, resultado +44,7%, unidades +31,3%, endeudamiento 0,35, innovación 8 y marca 96.',
      'Pero la producción nueva se vendió en Japón, no en USA: Japón creció 40,8% en unidades y USA solo 11,1%; DomoHogar en USA cayó 38,6% aunque su marca subió de 60 a 87.',
      'El simulador asignó el producto a Japón, donde los precios son más altos y la marca está en 100. Mejoró el ingreso por unidad pero subió la logística 78,4%, y el margen bajó de 50% a 49%.',
    ],
    datos: ['Ingresos $113.665.720 · resultado después de impuestos $18.777.387', 'Japón 446.785 u. ($94,1M) · USA 167.097 u. ($19,6M, −6,9%)', 'Cobertura de demanda 76% / 80% / 95%', 'Costo unitario 107,4 / 27,6 / 389,6 (subió levemente)', 'ROE 21,9%', '11 de 13 objetivos cumplidos'],
    conceptos: ['Distribución y logística', 'Análisis de resultados', 'Plan vs. real'],
    preguntas: [
      { q: '¿Por qué subió el costo unitario?', a: 'La tecnología ya estaba en el máximo y la planta nueva sumó depreciación, que entra en el costo de fabricación (Informe 5 §3e y §3g).' },
      { q: '¿Qué harían distinto en P5?', a: 'Reforzar antes la presencia comercial en USA (la delegación se instaló recién en P5) para que la producción local se vendiera localmente y evitar el flete a Japón.' },
    ],
  },
  {
    id: 'valor',
    objetivo: 'Integrar la evolución del valor de las cinco compañías.',
    decir: [
      'OMEGA creció 22,6%; Beta 24,0%. Fuimos la única compañía que nunca bajó de valor en los cinco períodos.',
      'P1 fue el mayor salto (+10,98%); P2 y P5 los menores, por endeudamiento y por la naturaleza relativa del parámetro de resultados.',
      'El primer puesto de 2028 hay que leerlo con la penalización de Beta.',
    ],
    datos: ['Omega 3.139 → 3.483 → 3.560 → 3.769 → 3.829 → 3.847', 'Beta 3.139 → 3.513 → 3.767 → 3.732 → 3.834 → 3.891', 'Delta 3.606 · Gama 3.359 · Alfa 3.055 al cierre', 'Alfa cayó a 2.993 en 2029 (no explicado en los documentos)'],
    conceptos: ['Creación de valor', 'Posicionamiento competitivo', 'Análisis comparativo'],
    preguntas: [
      { q: '¿Cumplieron el 8% por período?', a: 'Solo en P1 (+10,98%). En el total de la etapa el valor creció 22,6%, con P2 +2,19%, P3 +5,87%, P4 +1,59% y P5 +0,45%.' },
    ],
  },
  {
    id: 'ingresos',
    objetivo: 'Mostrar que la rentabilidad creció más que el tamaño.',
    decir: [
      'Los ingresos se multiplicaron por 2,35 y el resultado después de impuestos por casi 6.',
      'El resultado operativo pasó de 9,5% a 23,4% de los ingresos: la estructura de gastos creció menos que las ventas (apalancamiento operativo).',
      'Cada salto se explica por una decisión: tecnología y precio en P1, la planta en P2, el precio en P4 y la segunda planta en P5.',
    ],
    datos: ['Ingresos $48,3M → $113,7M', 'Resultado después de impuestos $3,2M → $18,8M', 'Margen 45% → 49% (pico 50% en 2029)', 'ROE 7,1% → 21,9%', 'Impuesto efectivo ≈26% en todos los años'],
    conceptos: ['Rentabilidad', 'Apalancamiento operativo', 'Costos fijos y variables', 'ROE'],
    preguntas: [
      { q: '¿Qué es el "margen sobre ingresos" del simulador?', a: 'Es el indicador de margen que informa el simulador para cada compañía (45% en 2025, 49% en 2030). Para el resultado usamos las cifras del estado de resultados de cada informe.' },
    ],
  },
  {
    id: 'comercial',
    objetivo: 'Integrar mercados, participación, marca, innovación y precio.',
    decir: [
      'Pasamos de un mercado a dos; USA llegó a representar hasta 24% de los ingresos (2029) [D: 21,07/87,2].',
      'La participación en unidades subió de 13,0% a 15,8% y en ingresos de 18,3% a 23,2%: vendemos más caro que el promedio, coherente con la diferenciación.',
      'Marca 55 → 96, innovación 5,0 → 8,0 y tecnología 7 → 10: los tres activos intangibles terminaron primeros o empatados en el primer lugar.',
    ],
    datos: ['Unidades Japón 294.412 → 446.785 · USA 0 → 167.097', 'Marca USA 26 → 87 (DH)', 'Segmentos 7/6/8 desde P1 en ambos mercados'],
    conceptos: ['Marketing mix', 'Posicionamiento', 'Valor de marca', 'Segmentación'],
    preguntas: [
      { q: '¿Por qué la participación en ingresos es mayor que en unidades?', a: 'Porque nuestros precios medios son mayores que los del sector: es lo esperable en una estrategia de diferenciación.' },
    ],
  },
  {
    id: 'operativa',
    objetivo: 'Integrar capacidad, ocupación, demanda insatisfecha y costos.',
    decir: [
      'La capacidad pasó de 309.000 a 630.000 unidades y la ocupación se mantuvo entre 97% y 99% desde 2026.',
      'Aun así nunca cubrimos toda la demanda propia: siempre fuimos un negocio limitado por la oferta.',
      'El costo unitario bajó hasta 2028 gracias a la tecnología; en 2029-2030 dejó de bajar porque llegamos al nivel máximo y se sumó depreciación.',
    ],
    datos: ['Fábricas 2 → 2 → 3 → 3 → 3 → 4', 'Cobertura TP 54% → 76%; DH 86% → 95%', 'Costo TP 124,2 → 106,6 (2028) → 107,4', 'Inventario siempre ≈5% de las ventas'],
    conceptos: ['Capacidad instalada', 'Productividad', 'Economías de escala', 'Demanda insatisfecha'],
    preguntas: [
      { q: '¿Por qué la cobertura de TP bajó en 2028?', a: 'Porque la marca y la innovación generaron más demanda que la capacidad disponible, que no creció ese año (Informe 3 §4b).' },
    ],
  },
  {
    id: 'financiera',
    objetivo: 'Integrar caja, deuda, dividendos y rentabilidad.',
    decir: [
      'El préstamo de 2027 subió el endeudamiento a 0,61. No tomamos más deuda: el ratio bajó por amortización y por utilidades retenidas (dividendos de 80% a 20%).',
      'La caja creció hasta $39,4M en 2029 y financió la segunda planta sin deuda.',
      'Aun así terminamos con el ratio más alto del sector (0,35 vs 0,08 de Beta).',
      'La planilla de cash flow de la cátedra es un modelo contable: por eso su saldo difiere de la caja del balance.',
    ],
    datos: ['Caja 2,6M → 10,1 → 12,1 → 23,7 → 39,4 → 31,3M', 'Préstamo LP 4,2M → 23,8M (2027) → 18,2M (2030)', 'Patrimonio $46,8M (2026) → $85,7M (2030)', 'Dividendos 80/80/50/50/30/20%', 'Gastos financieros máximos en 2028: $1.416.798'],
    conceptos: ['Flujo de caja', 'Liquidez', 'Endeudamiento', 'Política de dividendos', 'Autofinanciamiento'],
    preguntas: [
      { q: '¿Por qué no cancelaron el préstamo antes con la caja?', a: 'El simulador no tiene opción para cancelar el préstamo por adelantado; solo baja por amortización (Plan 4 §9.1).' },
      { q: '¿Por qué difiere la planilla de cash flow de la caja?', a: 'La planilla registra gastos de fabricación que incluyen depreciación (no es salida de dinero) y la implantación estimada; la caja del balance refleja los movimientos reales (Plan 5 §9).' },
    ],
  },
  {
    id: 'ganar-valer',
    objetivo: 'Responder por qué maximizar resultados no siempre maximiza el valor.',
    decir: [
      'En la misma escala: el resultado creció mucho más que el valor en todos los períodos.',
      'Tres razones con evidencia: el parámetro de Resultados Económicos es relativo al sector (en P5 bajó 19 puntos con +44,7% de resultado); el Endeudamiento castigó el préstamo; e Innovación premia la mejora del período.',
      'Lección: el valor de una empresa no es solo su resultado; incluye riesgo financiero, posición frente a la competencia y capacidad de mejorar.',
    ],
    datos: ['P2: resultado +99,5% vs. valor +2,19%', 'P5: +44,7% vs. +0,45%', 'Pesos: Resultados 41% · Participación, Marca, Innovación 13% c/u · Endeudamiento y Tecnología 10% c/u', 'Endeudamiento 2030: Omega 335 vs Beta 394'],
    conceptos: ['Creación de valor', 'Riesgo financiero', 'Evaluación relativa', 'Indicadores'],
    preguntas: [
      { q: '¿Entonces les convenía ganar menos?', a: 'No: el resultado es el parámetro que más pesa (41%). Lo que faltó fue combinarlo con menos deuda: el préstamo de 2027 sobredimensionado fue el costo que arrastramos.' },
    ],
  },
  {
    id: 'balance',
    objetivo: 'Autocrítica con evidencia y aprendizajes por área.',
    decir: [
      'Funcionó: tecnología (bajó costos), fábrica y mercado juntos, reasignar el gasto en P3 y pagar la segunda planta con caja.',
      'Nos costó: sostener la innovación en P2, el tamaño del préstamo, precios quietos en P2-P3, PE a 74 en P4 y la producción 2030 en Japón.',
      'Cambiaríamos: dimensionar la deuda, subir precios antes, delegación en USA desde la entrada y entender antes cómo se mide cada parámetro.',
      'La cadena: marketing e innovación crean demanda, producción la convierte en ventas si hay capacidad, finanzas paga la capacidad, y todo termina en el valor.',
    ],
    datos: ['Objetivos cumplidos: P1 10/10 · P2 8/10 · P3 8/10 · P5 11/13'],
    conceptos: ['Interdependencia funcional', 'Aprendizaje organizacional', 'Control de gestión'],
    preguntas: [
      { q: '¿Qué aprendieron de marketing?', a: 'Que la promoción tiene rendimientos decrecientes: al saturar la marca (100) conviene moverla a donde todavía rinde (USA) o a innovación.' },
      { q: '¿Y de producción?', a: 'Que hay que producir donde se vende y cargar las plantas según la demanda real: la planta ociosa sube el costo unitario (DH USA $431) y la cargada lo baja ($377).' },
      { q: '¿Y de finanzas?', a: 'Que la deuda se paga en valor durante varios períodos y que el monto debe ajustarse a la necesidad real; la caja propia financia sin empeorar la solvencia.' },
    ],
  },
  {
    id: 'cierre',
    objetivo: 'Cerrar con la comparación 2025-2030 y el aprendizaje principal.',
    decir: [
      'Recibimos una empresa chica, de un mercado y dos fábricas; entregamos una de dos mercados y cuatro fábricas, con 2,35 veces los ingresos y casi 6 veces el resultado.',
      'El aprendizaje principal: ninguna decisión es de un área sola. La marca crea demanda, la demanda pide capacidad, la capacidad pide financiamiento, y el financiamiento se paga en valor.',
      'Cerramos segundos, a 44 puntos de Beta; lo que nos separó del primer puesto fue la deuda de la expansión.',
    ],
    datos: ['Valor +22,6%', 'Unidades 294.412 → 613.882', 'Endeudamiento 0,22 → 0,35 (pico 0,61)'],
    conceptos: ['Gestión integral', 'Estrategia'],
    preguntas: [
      { q: 'Si empezaran de nuevo, ¿qué cambiarían primero?', a: 'El tamaño del préstamo de 2027 (con $13M-14M alcanzaba) y subir precios desde P2, cuando la demanda ya superaba la capacidad.' },
    ],
  },
];

export const TRAZABILIDAD: { dato: string; valor: string; fuente: string }[] = [
  { dato: 'Valor inicial de las cinco compañías', valor: '3.139', fuente: 'Diagnóstico §2; Informe 1 §3a (tabla Valor)' },
  { dato: 'Ingresos 2025 / resultado después de impuestos 2025', valor: '$48.303.235 / $3.199.016', fuente: 'Diagnóstico §4 (Estado de resultados)' },
  { dato: 'Ocupación 2025 TP / PE / DH', valor: '99% / 95,7% / 66,7%', fuente: 'Diagnóstico §1 (FODA) y §4' },
  { dato: 'Cobertura demanda TP 2025', valor: '54% (≈53.000 u.)', fuente: 'Diagnóstico §1 FODA; §7 Capacidad' },
  { dato: 'Participación en Japón 2024 → 2025', valor: '49% → 43%', fuente: 'Diagnóstico §4; Plan 1 §0' },
  { dato: 'Precio TP P1', valor: '228 → 238', fuente: 'Plan 1 §3; Informe 1 §2b' },
  { dato: 'Innovación / tecnología P1', valor: '$1.850.000 / $750.000', fuente: 'Plan 1 §5–§6; Informe 1 §2d' },
  { dato: 'Dividendos P1 (plan vs. real)', valor: '50% plan · 80% real', fuente: 'Plan 1 §8.2; Informe 1 §2g; planilla D5 celda C21 = 2.559.213' },
  { dato: 'Valor P1 / variación', valor: '3.483 / +10,98%', fuente: 'Informe 1 §3a' },
  { dato: 'Ahorro por tecnología P1', valor: '≈ $1,6M', fuente: 'Informe 1 §4d' },
  { dato: 'Demanda cubierta P1', valor: '62% / 74% / 86%', fuente: 'Informe 1 §4e' },
  { dato: 'Comparación de mercados (renta, segmentos, flete)', valor: 'USA 40.400 / 55% / cat. 3', fuente: 'Plan 1 §1.2 (tabla)' },
  { dato: 'Penetración y unidades sin atender', valor: 'USA 61–64%; 34.700 / 118.400 / 17.700', fuente: 'Plan 2 §1.1 (tabla)' },
  { dato: 'Alternativas de fábrica', valor: '$31.455.000 / $32.833.202 / $16.537.500', fuente: 'Plan 2 §1.2 (tabla)' },
  { dato: 'Préstamo LP P2', valor: '$20.000.000 al 6,3% a 12 años', fuente: 'Plan 2 §8.1; Informe 2 §2g; planilla D5 celda D39' },
  { dato: 'Resultados P2 (unidades, ingresos, resultado)', valor: '450.201 / $77.792.570 / $8.833.897', fuente: 'Informe 2 §3b' },
  { dato: 'Unidades por mercado P2', valor: 'Japón 364.432 · USA 85.769', fuente: 'Informe 2 §3c' },
  { dato: 'Cambio de parámetros P2', valor: 'Innovación −61, Endeudamiento −30', fuente: 'Informe 2 §3a' },
  { dato: 'Caja P2 vs. estimada', valor: '$12.056.880 vs ≈$5,5M', fuente: 'Informe 2 §3f; Plan 2 §8.1' },
  { dato: 'Reasignación P3', valor: 'Promoción 6,9→6,4M; Innovación 1,85→2,2M; Tecnología 0,85→1,0M', fuente: 'Plan 3 §10; Informe 3 §2' },
  { dato: 'Valor P3 y penalización de Beta', valor: '3.769 (1°); Beta 3.732 ×0,95', fuente: 'Informe 3 §1, §3a' },
  { dato: 'Innovación parámetro P3', valor: '498 → 604', fuente: 'Informe 3 §3a' },
  { dato: 'Costo DH USA', valor: '$431 → $377', fuente: 'Informe 2 §3g; Informe 3 §3g' },
  { dato: 'Margen por unidad 2028', valor: 'TP ≈$120 · PE ≈$43 · DH ≈$295', fuente: 'Plan 4 §1 (tabla)' },
  { dato: 'Precios P4', valor: 'Japón 250/74/705 · USA 205/61/660', fuente: 'Plan 4 §3; confirmados como "precio actual" en Plan 5 §4' },
  { dato: 'Resultados 2029 (P4)', valor: 'Valor 3.829; resultado $12.975.875; margen 50%; deuda 0,42', fuente: 'Plan 5 §0; Informe 5 §3a–§3b (columna 2029)' },
  { dato: 'Caja 2029', valor: '$39.417.991', fuente: 'Plan 5 §0; Informe 5 §3f' },
  { dato: 'PE Japón 2028 → 2029', valor: '234.824 → 199.736', fuente: 'Informe 3 §3c; Informe 5 §3c' },
  { dato: 'Demanda sin atender al cierre de P4', valor: '36.000 / 134.000 / 23.000', fuente: 'Plan 5 §0' },
  { dato: 'Inversión P5', valor: '$31.455.000 (+ $733.125 implantación estimada)', fuente: 'Plan 5 §1.2; Informe 5 §2a; planilla D5 celda G13' },
  { dato: 'Resultados P5', valor: 'Ingresos $113.665.720; resultado $18.777.387; deuda 0,35', fuente: 'Informe 5 §3b' },
  { dato: 'Unidades por mercado P5', valor: 'Japón 446.785 · USA 167.097', fuente: 'Informe 5 §3c' },
  { dato: 'Parámetros 2029 y 2030, Beta 2030', valor: 'ver Anexo A8', fuente: 'Informe 5 §3a (tabla de parámetros)' },
  { dato: 'Competencia 2030', valor: 'Beta $40.495.148 antes de impuestos; deuda 0,08', fuente: 'Informe 5 §3d' },
  { dato: 'Saldo planilla de cash flow 2030', valor: '$417.768', fuente: 'CASH_FLOW…DECISION_5.xlsx, Cash Flow Detallado, celda G40' },
  { dato: 'Flujo del año 2027 / 2030 (planilla)', valor: '−$24.312.875 / −$16.268.697', fuente: 'Planilla D5, celdas D33 y G33' },
  { dato: 'Préstamo 2029 [derivado]', valor: '≈ $19.924.420', fuente: '$21.580.856 (Informe 3 §3f) − $1.656.436 (planilla D4/D5 celda F20)' },
  { dato: 'Totales de la etapa', valor: 'Valor +22,6%; ingresos ×2,35; resultado ×5,87', fuente: 'Informe 5 §7; cálculo propio' },
  { dato: 'Variación del valor P4 [derivado]', valor: '+1,59%', fuente: '3.829 / 3.769 − 1 (Plan 5 §0; Informe 3 §3a)' },
  { dato: 'Fondos propios en la fábrica 2027 [derivado]', valor: '≈ $11.455.000', fuente: '$31.455.000 − préstamo $20.000.000 (Plan 2 §1.2, §8.1)' },
  { dato: 'Beta sin penalización 2028 [derivado]', valor: '≈ 3.928', fuente: '3.732 / 0,95 (Informe 3 §1, §3a)' },
  { dato: 'Crecimiento del valor de Beta 2025–2030 [derivado]', valor: '+24,0%', fuente: '3.891 / 3.139 − 1 (Informe 5 §3a)' },
  { dato: 'Suma de parámetros 2030 [derivado]', valor: '3.822 (vs. valor 3.847)', fuente: 'Informe 5 §3a (tabla de parámetros)' },
  { dato: 'Capacidad total 2027–2029 [derivado]', valor: '472.500', fuente: '94.500 + 315.000 + 63.000 (Plan 3 §1, §2)' },
];

export const CONTRADICCIONES: { tema: string; detalle: string; criterio: string }[] = [
  { tema: 'Informe 4 inexistente', detalle: 'No hay informe del Período 4 por un error de la simulación.', criterio: 'Decisiones desde el Plan 4; resultados desde Plan 5 §0 e Informe 5 (columna 2029). La planilla D4 y los "precios actuales" del Plan 5 confirman que las decisiones del Plan 4 se aplicaron.' },
  { tema: '"Resultado neto" en comparaciones sectoriales', detalle: 'Los informes llaman "resultado neto" a una cifra que es el resultado antes de impuestos (5.985.196 × 0,74 = 4.429.045).', criterio: 'Se rotula siempre "antes" o "después de impuestos".' },
  { tema: 'Dividendos P1', detalle: 'Plan 1: bajar a 50%. Informe 1: se mantuvo en 80%.', criterio: 'Se usa lo realizado (80%), confirmado por la planilla (C21).' },
  { tema: 'Delegación comercial USA', detalle: 'Planificada en P2 (condicional) y P3; no se instaló hasta P5.', criterio: 'Se informa como no instalada hasta P5.' },
  { tema: 'Caja: planilla vs. balance', detalle: 'La planilla de la cátedra cierra 2030 en $417.768; el balance en $31.287.506.', criterio: 'Gráficos con caja del balance; planilla en el anexo con la explicación (depreciación e implantación).' },
  { tema: 'Implantación P5', detalle: 'La planilla usa $733.125 (valor 2027); el Plan 5 indica que podía ser hasta 50% menor; el Informe 5 no informa el monto.', criterio: 'Se presenta como estimación.' },
  { tema: 'Costo unitario 2029', detalle: 'El Informe 5 dice que subió en 2029, pero TP bajó (106,6 → 105,9); PE y DH subieron.', criterio: 'Se muestra el dato por línea.' },
  { tema: 'Flete Japón → USA', detalle: 'La profesora mencionó categoría 4; el manual (pág. 11) indica categoría 3.', criterio: 'Se usa categoría 3 (Plan 2 §1.4).' },
  { tema: 'Tasa de impuesto', detalle: 'El Diagnóstico y el Plan 2 mencionan que Japón tributa 10%, pero los estados de resultados muestran una carga efectiva de ≈26% (después = antes × 0,74).', criterio: 'Se usan las cifras de los estados de resultados; no se cita una tasa en las diapositivas.' },
  { tema: 'Parámetros vs. valor total', detalle: 'La suma de los seis parámetros no coincide exactamente con el valor (2030: 3.822 vs 3.847).', criterio: 'Se presentan como componentes, sin afirmar que sumen el valor.' },
  { tema: 'Promoción heredada 2025', detalle: 'Plan 1: promoción $3.715.000; Diagnóstico: gasto de marketing $4.005.000.', criterio: 'Para promoción se usa $3.715.000 (el marketing incluye otros conceptos).' },
  { tema: 'Precio PE de competidores USA 2029', detalle: 'Plan 4 muestra 59/70; Plan 5 muestra 56/70.', criterio: 'Se citan con su documento de origen.' },
  { tema: 'Endeudamiento "último del sector"', detalle: 'Los informes 2, 3 y 5 dicen que OMEGA fue última en el parámetro; para 2029 solo consta que estaba 68 puntos detrás de Beta.', criterio: 'Se afirma "el ratio más alto del sector desde 2027" (Informe 5 §7).' },
];
