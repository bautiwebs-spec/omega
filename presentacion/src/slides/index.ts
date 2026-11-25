import type { ComponentType } from 'react';
import { Portada, EmpresaRecibida, Diagnostico, CincoDecisiones } from './act1';
import { P2Seleccion, P2Mapa, P2Costo } from './act2';
import { P1Decision, P1Resultado, P3, P4Decision, P4Resultado, P5Decision, P5Resultado } from './act2v';
import { EvolucionValor, IngresosResultados, Comercial, Operativa, Financiera } from './act3';
import { GanarVsValer, Balance, Cierre } from './act45';
import { A1, A2, A3, A4, A5, A6, A7, A8 } from './annex';

export type Theme = 'light' | 'dark' | 'graphite' | 'paper2' | 'blue';
export interface SlideDef { id: string; name: string; theme: Theme; C: ComponentType; chapter?: boolean; annex?: boolean; act: string }

export const SLIDES: SlideDef[] = [
  { id: 'portada', name: 'Portada', theme: 'dark', C: Portada, chapter: true, act: 'Acto 1 · El punto de partida' },
  { id: 'empresa', name: 'La empresa que recibimos', theme: 'light', C: EmpresaRecibida, act: 'Acto 1 · El punto de partida' },
  { id: 'diagnostico', name: 'Diagnóstico estratégico', theme: 'paper2', C: Diagnostico, act: 'Acto 1 · El punto de partida' },
  { id: 'decisiones', name: 'Cinco decisiones', theme: 'dark', C: CincoDecisiones, chapter: true, act: 'Acto 2 · Cinco períodos' },
  { id: 'p1-decision', name: 'P1 · Optimizar antes de expandir', theme: 'light', C: P1Decision, chapter: true, act: 'Acto 2 · Cinco períodos' },
  { id: 'p1-resultado', name: 'P1 · Resultados', theme: 'light', C: P1Resultado, act: 'Acto 2 · Cinco períodos' },
  { id: 'p2-seleccion', name: 'P2 · Por qué USA', theme: 'light', C: P2Seleccion, chapter: true, act: 'Acto 2 · Cinco períodos' },
  { id: 'p2-mapa', name: 'P2 · La expansión', theme: 'light', C: P2Mapa, act: 'Acto 2 · Cinco períodos' },
  { id: 'p2-costo', name: 'P2 · El costo de crecer', theme: 'dark', C: P2Costo, act: 'Acto 2 · Cinco períodos' },
  { id: 'p3', name: 'P3 · Consolidar y corregir', theme: 'light', C: P3, chapter: true, act: 'Acto 2 · Cinco períodos' },
  { id: 'p4-decision', name: 'P4 · Rentabilidad y eficiencia', theme: 'light', C: P4Decision, chapter: true, act: 'Acto 2 · Cinco períodos' },
  { id: 'p4-resultado', name: 'P4 · Resultados', theme: 'paper2', C: P4Resultado, act: 'Acto 2 · Cinco períodos' },
  { id: 'p5-decision', name: 'P5 · La decisión final', theme: 'dark', C: P5Decision, chapter: true, act: 'Acto 2 · Cinco períodos' },
  { id: 'p5-resultado', name: 'P5 · Resultados', theme: 'light', C: P5Resultado, act: 'Acto 2 · Cinco períodos' },
  { id: 'valor', name: 'Evolución del valor', theme: 'graphite', C: EvolucionValor, chapter: true, act: 'Acto 3 · La evolución global' },
  { id: 'ingresos', name: 'Ingresos y resultados', theme: 'light', C: IngresosResultados, act: 'Acto 3 · La evolución global' },
  { id: 'comercial', name: 'Evolución comercial', theme: 'light', C: Comercial, act: 'Acto 3 · La evolución global' },
  { id: 'operativa', name: 'Evolución operativa', theme: 'paper2', C: Operativa, act: 'Acto 3 · La evolución global' },
  { id: 'financiera', name: 'Evolución financiera', theme: 'dark', C: Financiera, act: 'Acto 3 · La evolución global' },
  { id: 'ganar-valer', name: 'Ganar más no es valer más', theme: 'blue', C: GanarVsValer, chapter: true, act: 'Acto 4 · Balance estratégico' },
  { id: 'balance', name: 'Qué aprendimos', theme: 'light', C: Balance, act: 'Acto 4 · Balance estratégico' },
  { id: 'cierre', name: 'Cierre', theme: 'light', C: Cierre, chapter: true, act: 'Acto 5 · Cierre' },
  { id: 'a1', name: 'A1 · Precios', theme: 'light', C: A1, annex: true, act: 'Anexo' },
  { id: 'a2', name: 'A2 · Presupuestos', theme: 'light', C: A2, annex: true, act: 'Anexo' },
  { id: 'a3', name: 'A3 · Producción y capacidad', theme: 'light', C: A3, annex: true, act: 'Anexo' },
  { id: 'a4', name: 'A4 · Mercados y marca', theme: 'light', C: A4, annex: true, act: 'Anexo' },
  { id: 'a5', name: 'A5 · Resultados y márgenes', theme: 'light', C: A5, annex: true, act: 'Anexo' },
  { id: 'a6', name: 'A6 · Cash flow', theme: 'light', C: A6, annex: true, act: 'Anexo' },
  { id: 'a7', name: 'A7 · Endeudamiento e inversiones', theme: 'light', C: A7, annex: true, act: 'Anexo' },
  { id: 'a8', name: 'A8 · Competencia y parámetros', theme: 'light', C: A8, annex: true, act: 'Anexo' },
];
export const MAIN_COUNT = SLIDES.filter((s) => !s.annex).length;
