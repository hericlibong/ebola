// Phases narratives (timeline_group), source unique de verite pour l'ordre,
// les libelles FR et les couleurs. Ordre phase1 -> phase5 de labels.csv.
// Libelles sans accent pour rester coherent avec le socle de donnees.
export interface Phase {
  key: string;
  label: string;
  color: string;
}

export const PHASES: Phase[] = [
  { key: 'silent_spread', label: 'Circulation silencieuse', color: '#8a96a3' },
  { key: 'detection_confirmation', label: 'Detection et confirmation', color: '#5b7fa6' },
  { key: 'regional_spread', label: 'Extension regionale', color: '#c89b3c' },
  { key: 'response_breakdown', label: 'Riposte debordee', color: '#b1542f' },
  { key: 'cross_border_control', label: 'Controle transfrontalier', color: '#6d5a8a' },
];

export const phaseColor = (key: string): string =>
  PHASES.find((phase) => phase.key === key)?.color ?? '#8a96a3';

export const phaseLabel = (key: string): string =>
  PHASES.find((phase) => phase.key === key)?.label ?? key.replaceAll('_', ' ');
