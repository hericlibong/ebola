import type { Event } from './types';
import { escapeHtml } from './html';
import { PHASES, phaseColor } from './phases';

interface TimelineOptions {
  container: HTMLElement;
  events: Event[];
  activeEventId: string;
  activePhase: string | null;
  onSelect: (event: Event) => void;
  onPhaseToggle: (phase: string) => void;
}

// Espacement minimal (en jours) entre deux jalons annotes, pour ne pas
// surcharger la zone dense de fin mai.
const ANNOT_MIN_GAP_DAYS = 5;

const MONTHS_FR = [
  'janv.', 'fevr.', 'mars', 'avr.', 'mai', 'juin',
  'juil.', 'aout', 'sept.', 'oct.', 'nov.', 'dec.',
];

// '2026-04-24' -> '24 avr.'
function shortDateFr(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const day = Number(match[3]);
  const month = MONTHS_FR[Number(match[2]) - 1] ?? '';
  return `${day} ${month}`;
}

// '2026-04-24' -> nombre de jours depuis l'epoque (UTC, sans piege de fuseau).
function toDay(iso: string): number {
  return Math.floor(Date.parse(`${iso}T00:00:00Z`) / 86_400_000);
}

// Ancre horizontale d'un libelle selon sa position, pour eviter les
// debordements aux extremites de l'axe.
function anchorClass(left: number): string {
  if (left < 12) return 'is-start';
  if (left > 88) return 'is-end';
  return '';
}

// Axe temporel sobre : dates, points colores par phase, annotations des
// jalons importants. Volontairement depouille (pas d'infobulle ni de libelle
// de phase repete) : le nom de phase vit dans la legende, le detail dans le
// panneau recit. Chaque element a une fonction distincte.
function appendTimeAxis(
  container: HTMLElement,
  events: Event[],
  activeEventId: string,
  activePhase: string | null,
  onSelect: (event: Event) => void,
): void {
  if (events.length === 0) return;

  const minDay = Math.min(...events.map((event) => toDay(event.date)));
  const maxDay = Math.max(...events.map((event) => toDay(event.date_end || event.date)));
  const span = Math.max(1, maxDay - minDay);
  const pct = (iso: string): number => ((toDay(iso) - minDay) / span) * 100;
  const dimmed = (event: Event): boolean => activePhase !== null && event.timeline_group !== activePhase;

  const axis = document.createElement('div');
  axis.className = 'timeline-axis';

  const track = document.createElement('div');
  track.className = 'axis-track';

  // --- Annotations des jalons primary, espaces de ANNOT_MIN_GAP_DAYS ---
  // Niveaux alternes (tier 0/1) pour eviter tout chevauchement quand deux
  // jalons restent proches, quelle que soit la largeur de l'axe.
  let lastAnnotDay = Number.NEGATIVE_INFINITY;
  let annotTier = 0;
  events.forEach((event) => {
    if (event.display_tier !== 'primary') return;
    const day = toDay(event.date);
    if (day - lastAnnotDay < ANNOT_MIN_GAP_DAYS) return;
    lastAnnotDay = day;

    const left = pct(event.date);
    const annot = document.createElement('div');
    annot.className = `axis-annot tier-${annotTier % 2} ${anchorClass(left)} ${dimmed(event) ? 'is-dimmed' : ''}`;
    annotTier += 1;
    annot.style.left = `${left}%`;
    annot.style.setProperty('--phase-color', phaseColor(event.timeline_group));
    annot.innerHTML = `
      <span class="axis-annot-text">
        <span class="axis-annot-date">${escapeHtml(shortDateFr(event.date))}</span>
        ${escapeHtml(event.headline)}
      </span>
    `;
    track.appendChild(annot);
  });

  // --- Graduations hebdomadaires + extremite ---
  const ticks = new Set<number>();
  for (let day = minDay; day <= maxDay; day += 7) ticks.add(day);
  ticks.add(maxDay);
  ticks.forEach((day) => {
    const left = ((day - minDay) / span) * 100;
    const iso = new Date(day * 86_400_000).toISOString().slice(0, 10);
    const tick = document.createElement('span');
    tick.className = 'axis-tick';
    tick.style.left = `${left}%`;
    tick.innerHTML = `<span class="axis-tick-label">${escapeHtml(shortDateFr(iso))}</span>`;
    track.appendChild(tick);
  });

  // --- Points, colores par phase, empiles par jour ---
  const rowByDate = new Map<string, number>();
  events.forEach((event) => {
    const row = rowByDate.get(event.date) ?? 0;
    rowByDate.set(event.date, row + 1);

    const dot = document.createElement('button');
    dot.type = 'button';
    const isActive = event.event_id === activeEventId;
    dot.className = `axis-dot is-${event.display_tier} ${isActive ? 'is-active' : ''} ${dimmed(event) ? 'is-dimmed' : ''}`;
    dot.style.left = `${pct(event.date)}%`;
    dot.style.setProperty('--row', String(row));
    dot.style.setProperty('--phase-color', phaseColor(event.timeline_group));
    dot.setAttribute('aria-label', `${shortDateFr(event.date)} : ${event.headline}`);
    dot.title = `${shortDateFr(event.date)} - ${event.headline}`;
    dot.addEventListener('click', () => onSelect(event));
    track.appendChild(dot);
  });

  axis.appendChild(track);
  container.appendChild(axis);
}

// Legende des phases, sous l'axe : couleur -> phase, en boutons.
// Cliquer une phase concentre la carte et la timeline sur cette phase.
function appendPhaseLegend(
  container: HTMLElement,
  events: Event[],
  activePhase: string | null,
  onPhaseToggle: (phase: string) => void,
): void {
  const present = PHASES.filter((phase) =>
    events.some((event) => event.timeline_group === phase.key),
  );
  if (present.length === 0) return;

  const legend = document.createElement('div');
  legend.className = 'timeline-legend';
  legend.setAttribute('role', 'group');
  legend.setAttribute('aria-label', 'Filtrer par phase');

  present.forEach((phase) => {
    const button = document.createElement('button');
    button.type = 'button';
    const isOn = activePhase === phase.key;
    button.className = `legend-phase ${isOn ? 'is-on' : ''}`;
    button.style.setProperty('--phase-color', phase.color);
    button.setAttribute('aria-pressed', String(isOn));
    button.innerHTML = `<span class="legend-swatch"></span>${escapeHtml(phase.label)}`;
    button.addEventListener('click', () => onPhaseToggle(phase.key));
    legend.appendChild(button);
  });

  container.appendChild(legend);
}

export function renderTimeline({
  container,
  events,
  activeEventId,
  activePhase,
  onSelect,
  onPhaseToggle,
}: TimelineOptions): void {
  container.innerHTML = '';
  appendTimeAxis(container, events, activeEventId, activePhase, onSelect);
  appendPhaseLegend(container, events, activePhase, onPhaseToggle);
}
