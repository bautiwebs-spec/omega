// Fuente única de datos de OMEGA. Cada bloque indica su documento de origen.
// Convención: [D] = derivado por cálculo a partir de cifras de los documentos.

export const YEARS = ['2025', 'P1 · 2026', 'P2 · 2027', 'P3 · 2028', 'P4 · 2029', 'P5 · 2030'] as const;
export const SHORT = ['2025', 'P1', 'P2', 'P3', 'P4', 'P5'] as const;

export const TEAM = ['Violeta Behar', 'Joaquín Malti', 'Jeronimo Paterson', 'Bautista Sequeira'];

// Serie maestra (Diagnóstico §4; Informe 1/2/3 §3b; Plan 5 §0; Informe 5 §3b)
export const serie = {
  valor: [3139, 3483, 3560, 3769, 3829, 3847],
  puesto: [null, 2, 2, 1, 2, 2] as (number | null)[],
  ingresos: [48303235, 54277510, 77792570, 83944565, 87202235, 113665720],
  resOperativo: [4591088, 6242036, 12805119, 15994942, 18832006, 26565037],
  resAntesImp: [4322995, 5985196, 11937698, 14578144, 17534966, 25374847],
  resNeto: [3199016, 4429045, 8833897, 10787827, 12975875, 18777387],
  margen: [45, 47, 48, 48, 50, 49],
  unidades: [294412, 302896, 450201, 465920, 467700, 613882],
  partUnidades: [13.0, 13.3, 16.3, 15.3, 13.7, 15.8],
  partIngresos: [18.3, 19.2, 22.6, 21.4, 20.2, 23.2],
  endeudamiento: [0.22, 0.22, 0.61, 0.52, 0.42, 0.35],
  caja: [2568633, 10116118, 12056880, 23686921, 39417991, 31287506],
  prestamoLP: [4218075, 4000804, 23756679, 21580856, 19924420, 18161635], // 2029 [D]
  patrimonio: [null, 46754445, 53373820, 59744698, 69480000, 85666437] as (number | null)[], // 2029 ≈ [D]
  roe: [7.1, 9.5, 16.6, 18.1, 18.7, 21.9],
  fabricas: [2, 2, 3, 3, 3, 4],
  ocupacion: [92.5, 97.3, 96.9, 98.7, 99.0, 98.7],
  inventario: [4.9, 5.0, 5.1, 5.0, 5.0, 5.1],
  marca: [55, 79, 78, 85, 87, 96],
  innovacion: [5.0, 5.7, 5.7, 6.3, 7.0, 8.0],
  tecnologia: [7, 8, 9, 10, 10, 10],
  capacidades: [7.1, 7.5, 8.4, 8.1, 8.1, 7.7],
  dividendos: [80, 80, 50, 50, 30, 20],
  gastosFin: [268093, 256840, 867421, 1416798, 1297040, 1190189],
};

// Valor de la compañía, competidores (Informes 1, 2, 3, 5 §3a)
export const valorCompetencia: Record<string, number[]> = {
  Omega: [3139, 3483, 3560, 3769, 3829, 3847],
  Beta: [3139, 3513, 3767, 3732, 3834, 3891],
  Delta: [3139, 3393, 3336, 3560, 3698, 3606],
  Gama: [3139, 3207, 3203, 3442, 3476, 3359],
  Alfa: [3139, 3454, 3444, 3654, 2993, 3055],
};

// Parámetros del valor (Informe 1, 2, 3, 5 §3a). Índices: 2026..2030
export const parametros = [
  { nombre: 'Resultados Económicos', peso: 41, omega: [1248, 1347, 1441, 1455, 1436], beta2030: 1459 },
  { nombre: 'Participación de Mercado', peso: 13, omega: [316, 343, 340, 348, 361], beta2030: 361 },
  { nombre: 'Valor de Marca', peso: 13, omega: [637, 656, 661, 673, 676], beta2030: 677 },
  { nombre: 'Innovación de Producto', peso: 13, omega: [559, 498, 604, 617, 621], beta2030: 621 },
  { nombre: 'Endeudamiento y Solvencia', peso: 10, omega: [342, 312, 314, 323, 335], beta2030: 394 },
  { nombre: 'Tecnología Industrial', peso: 10, omega: [380, 390, 393, 392, 393], beta2030: 393 },
];

// Competencia al cierre (Informe 5 §3d). "Resultado" = antes de impuestos.
export const competencia2030 = [
  { cia: 'Beta', ingresos: 120016140, resultado: 40495148, margen: 58, deuda: 0.08, unidades: 1506560 },
  { cia: 'Omega', ingresos: 113665720, resultado: 25374847, margen: 49, deuda: 0.35, unidades: 613882 },
  { cia: 'Delta', ingresos: 105365676, resultado: 25184429, margen: 58, deuda: 0.20, unidades: 697198 },
  { cia: 'Alfa', ingresos: 97282736, resultado: 23414253, margen: 50, deuda: 0.10, unidades: 686466 },
  { cia: 'Gama', ingresos: 53527010, resultado: 4139237, margen: null as number | null, deuda: 0.15, unidades: null as number | null },
];

// Unidades por mercado (Diagnóstico; Informes 1, 2, 3, 5 §3c)
export const unidadesMercado = {
  japon: { TP: [62044, 61753, 73315, 68079, 69240, 93543], PE: [204607, 205569, 251160, 234824, 199736, 281779], DH: [27761, 35574, 39957, 46242, 48293, 71463] },
  usa: { TP: [0, 0, 18665, 25464, 24305, 29651], PE: [0, 0, 55420, 76963, 112121, 128852], DH: [0, 0, 11684, 14348, 14005, 8594] },
  japonTotal: [294412, 302896, 364432, 349145, 317269, 446785],
  usaTotal: [0, 0, 85769, 116775, 150431, 167097],
  ingresosJapon: [48303235, 54277510, 63405355, 65255548, 66137029, 94055253],
  ingresosUSA: [0, 0, 14387215, 18689017, 21065206, 19610467],
};

// Capacidad y cobertura de la demanda propia (Planes 1–5; Informes 1, 3, 5)
export const capacidad = {
  TP: [61800, 62400, 94500, 94500, 94500, 126000],
  PE: [206000, 208000, 315000, 315000, 315000, 420000],
  DH: [41200, 41600, 63000, 63000, 63000, 84000],
  total: [309000, 312000, 472500, 472500, 472500, 630000],
  cobertura: { TP: [54, 62, 70, 62, 72, 76], PE: [null, 74, 85, 62, 70, 80], DH: [null, 86, 88, 78, 73, 95] } as Record<string, (number | null)[]>,
};

// Producción cargada (Planes 1–5)
export const produccionCargada = [
  { p: '2025 (heredado)', TP: '59.000', PE: '190.000', DH: '25.000', nota: 'DH al 66,7% de ocupación' },
  { p: 'P1 · 2026', TP: '61.800', PE: '206.000', DH: '32.000', nota: 'DH real 35.994 por flexibilidad' },
  { p: 'P2 · 2027', TP: '63.000 + 30.000', PE: '210.000 + 100.000', DH: '41.000 + 10.000', nota: 'Japón + USA; DH USA a media carga' },
  { p: 'P3 · 2028', TP: '63.000 + 31.500', PE: '210.000 + 105.000', DH: '42.000 + 17.000', nota: 'DH real 61.028' },
  { p: 'P4 · 2029', TP: '63.000 + 31.500', PE: '210.000 + 105.000', DH: '42.000 + 21.000', nota: 'todo a capacidad' },
  { p: 'P5 · 2030', TP: '63.000 + 63.000', PE: '210.000 + 210.000', DH: '42.000 + 42.000', nota: 'cuarta planta (2ª en USA)' },
];

// Costo unitario y margen por producto (Diagnóstico; Informes 1, 2, 3, 5 §3g)
export const costoUnitario = {
  anios: ['2024', '2025', '2026', '2027', '2028', '2029', '2030'],
  TP: [131.1, 124.2, 116.4, 111.6, 106.6, 105.9, 107.4],
  PE: [32.0, 30.3, 28.8, 27.6, 26.9, 27.2, 27.6],
  DH: [450.3, 426.4, 405.1, 390.5, 379.2, 383.3, 389.6],
};
export const margenProducto = {
  TP: [45.5, 51.1, 51.3, 52.9, 55.6, 55.1],
  PE: [59.0, 61.0, 61.3, 61.8, 60.8, 59.8],
  DH: [37.8, 40.9, 42.1, 43.8, 44.8, 44.4],
};

// Precios (Diagnóstico; Planes 1–5; Informes 1–3, 5)
export const precios = [
  { p: '2025', jp: '228 / 74 / 685', delta: '224 / 68 / 680', usa: '—', compUsa: 'Gama 190 / 58 / 630' },
  { p: 'P1 · 2026', jp: '238 / 74 / 685', delta: '242 / 70 / 710', usa: '—', compUsa: '—' },
  { p: 'P2 · 2027', jp: '238 / 74 / 685', delta: '250 / 72 / 710', usa: '195 / 59 / 640', compUsa: 'Gama 200 / 60 / 650' },
  { p: 'P3 · 2028', jp: '238 / 74 / 685', delta: '250 / 72 / 710', usa: '195 / 59 / 640', compUsa: '198 / 59 / 645 · 220 / 70 / 700' },
  { p: 'P4 · 2029', jp: '250 / 74 / 705', delta: '250 / 72 / 710', usa: '205 / 61 / 660', compUsa: '198–220 / 56–70 / 645–690' },
  { p: 'P5 · 2030', jp: '250 / 72 / 705', delta: '258 / 73 / 720', usa: '205 / 61 / 660', compUsa: '200/60/650 · 200/56/660 · 210/60/670' },
];
export const referencia = { japon: '260 / 70 / 720', usa: '200 / 60 / 650' };

// Presupuestos (Planes 1–5; Informes 1, 2, 3, 5 §2)
export const presupuestos = [
  { p: '2025', promoJp: '2.100 / 1.050 / 565', promoUsa: '—', promo: 3715, innov: '380 / 430 / 350', innovT: 1160, tec: 250, capac: 580, seg: '7 / 7 / 7' },
  { p: 'P1', promoJp: '2.100 / 1.500 / 1.000', promoUsa: '—', promo: 4600, innov: '400 / 600 / 850', innovT: 1850, tec: 750, capac: 700, seg: '7 / 6 / 8' },
  { p: 'P2', promoJp: '2.100 / 1.500 / 1.000', promoUsa: '700 / 900 / 700', promo: 6900, innov: '400 / 600 / 850', innovT: 1850, tec: 850, capac: 900, seg: '7 / 6 / 8' },
  { p: 'P3', promoJp: '1.600 / 1.500 / 900', promoUsa: '750 / 950 / 700', promo: 6400, innov: '400 / 750 / 1.050', innovT: 2200, tec: 1000, capac: 900, seg: '7 / 6 / 8' },
  { p: 'P4', promoJp: '1.300 / 1.200 / 800', promoUsa: '900 / 1.100 / 1.000', promo: 6300, innov: '400 / 900 / 1.250', innovT: 2550, tec: 400, capac: 900, seg: '7 / 6 / 8' },
  { p: 'P5', promoJp: '1.300 / 1.200 / 800', promoUsa: '1.000 / 1.400 / 1.300', promo: 7000, innov: '650 / 1.050 / 1.450', innovT: 3150, tec: 500, capac: 900, seg: '7 / 6 / 8' },
];
export const nivelesInnov = ['7 / 4 / 4', '7 / 5 / 5', '7 / 5 / 5', '7 / 6 / 6', '7 / 7 / 7', '8 / 8 / 8'];

export const marcaLinea = {
  japon: ['64 / 52 / 55', '89 / 76 / 81', '100 / 87 / 95', '100 / 100 / 100', '99 / 100 / 100', '100 / 100 / 100'],
  usa: ['—', '—', '26 / 27 / 26', '41 / 41 / 40', '60 / 58 / 60', '82 / 84 / 87'],
};

// Cash flow (planillas CASH_FLOW_OMEGA_DESPUES_DE_DECISION_3/4/5.xlsx, hoja "Cash Flow Detallado", columnas C–G)
export const cashflow = {
  anios: ['2026', '2027', '2028', '2029', '2030'],
  filas: [
    { k: 'Ingresos por ventas (fila 7)', v: [54277510, 77792570, 83944565, 87202235, 113665720] },
    { k: 'Compra nueva fábrica (13)', v: [0, 32188125, 0, 0, 32188125] },
    { k: 'Fabricación (14)', v: [27597497, 38961213, 41397497, 42250876, 55720300] },
    { k: 'Logística (15)', v: [712954, 1287485, 1674093, 1216968, 2171586] },
    { k: 'Marketing (16)', v: [4670000, 6900000, 6475000, 6350000, 7294157] },
    { k: 'Personal (17)', v: [4307060, 4615272, 4726730, 4861532, 4980378] },
    { k: 'I+D (18)', v: [2600000, 2700000, 3200000, 2950000, 3650000] },
    { k: 'Generales (19)', v: [6442201, 8873249, 8815565, 9076179, 11559820] },
    { k: 'Otros: calidad, impuestos, amortización (20)', v: [1979184, 3498157, 6126878, 6380201, 8584687] },
    { k: 'Dividendos (21)', v: [2559213, 2214523, 4416949, 3236348, 2595175] },
    { k: 'Gastos financieros (22)', v: [256840, 867421, 1416798, 1297040, 1190189] },
  ],
  flujo: [3152561, -24312875, 5695055, 9583091, -16268697],
  prestamo: [0, 20000000, 0, 0, 0],
  saldoInicial: [2568633, 5721194, 1408319, 7103374, 16686465],
  saldoFinal: [5721194, 1408319, 7103374, 16686465, 417768],
  cajaBalance: [10116118, 12056880, 23686921, 39417991, 31287506],
};

// ---------- formato ----------
const nf = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 });
export const n = (v: number) => nf.format(v);
export const money = (v: number) => '$' + nf.format(v);
export const mill = (v: number, d = 1) => '$' + (v / 1e6).toLocaleString('es-AR', { minimumFractionDigits: d, maximumFractionDigits: d }) + 'M';
export const pct = (v: number, d = 1) => v.toLocaleString('es-AR', { minimumFractionDigits: d, maximumFractionDigits: d }) + '%';
export const dec = (v: number, d = 2) => v.toLocaleString('es-AR', { minimumFractionDigits: d, maximumFractionDigits: d });
export const growth = (a: number, b: number) => (b / a - 1) * 100;
